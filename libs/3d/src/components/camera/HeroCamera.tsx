import {
  MutableRefObject,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import * as THREE from 'three'
import { MathUtils } from 'three'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { radians } from '../../util'

export interface HeroCameraProps {
  /** Point the camera orbits around and looks at. */
  target?: [number, number, number]
  distance?: number
  /** Tilt from straight down, in degrees. */
  polar?: number
  /** Heading around the target, in degrees. */
  azimuth?: number
  fov?: number
  /**
   * Shifts the picture horizontally on wide screens (fraction of the width),
   * so the focal point sits beside the page copy instead of under it.
   */
  focusX?: number
  /** Same idea vertically on narrow screens. */
  focusY?: number
  /**
   * Drag to orbit, Ctrl/⌘ + wheel or pinch to zoom, slow auto-orbit when idle.
   * When false the camera drifts on its own and follows the pointer, which
   * suits touch screens where a drag must scroll the page.
   */
  interactive?: boolean
  /** Receives zoom in/out/reset functions for on-screen buttons. */
  apiRef?: MutableRefObject<HeroCameraApi | null>
  /** Turns off auto-orbit and drift, e.g. for prefers-reduced-motion. */
  still?: boolean
}

/** How long after the last drag the auto-orbit picks up again. */
const AUTO_ROTATE_RESUME_MS = 3500

const spherical = (
  target: THREE.Vector3,
  polar: number,
  azimuth: number,
  distance: number,
  out = new THREE.Vector3(),
) => {
  const p = radians(polar)
  const a = radians(azimuth)
  return out.set(
    target.x + Math.sin(p) * Math.cos(a) * distance,
    target.y + Math.cos(p) * distance,
    target.z + Math.sin(p) * Math.sin(a) * distance,
  )
}

export const HeroCamera = ({
  target = [0, 0, 4],
  distance = 160,
  polar = 27,
  azimuth = 42,
  fov = 40,
  focusX = 0.17,
  focusY = 0.14,
  interactive = true,
  apiRef,
  still = false,
}: HeroCameraProps) => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null)
  const size = useThree((state) => state.size)
  const portrait = size.width < size.height
  const startDistance = distance * (portrait ? 1.3 : 1)
  const lookAt = useRef(new THREE.Vector3(...target))
  // Only the first framing: after that the rig (or the visitor) owns the camera.
  const initialPosition = useMemo(
    () => spherical(lookAt.current, polar, azimuth, startDistance),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  // Frame the focal point beside the copy (wide) or below it (narrow).
  useLayoutEffect(() => {
    const camera = cameraRef.current
    if (!camera) return
    const { width, height } = size
    if (width >= 1024) {
      camera.setViewOffset(width, height, -width * focusX, 0, width, height)
    } else {
      camera.setViewOffset(width, height, 0, -height * focusY, width, height)
    }
    camera.updateProjectionMatrix()
  }, [size, focusX, focusY])

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        fov={fov}
        near={1}
        far={1200}
        position={initialPosition}
      />
      {interactive ? (
        <InteractiveRig
          target={lookAt.current}
          distance={startDistance}
          apiRef={apiRef}
          still={still}
        />
      ) : (
        <CinematicRig
          target={lookAt.current}
          polar={polar}
          azimuth={azimuth}
          distance={startDistance}
          still={still}
        />
      )}
    </>
  )
}

/** Imperative handle for on-screen camera buttons. */
export interface HeroCameraApi {
  zoomIn: () => void
  zoomOut: () => void
  reset: () => void
}

const MIN_DISTANCE = 45
const MAX_DISTANCE = 280
const BUTTON_ZOOM = 1.35

/**
 * OrbitControls tuned for a hero that sits above more page content.
 *
 * - Dragging orbits the city.
 * - A plain mouse wheel is never captured, so the page always scrolls.
 * - Zoom happens with Ctrl/⌘ + wheel, a trackpad pinch (browsers report it
 *   as a wheel event with ctrlKey) or the on-screen buttons via `apiRef`.
 */
const InteractiveRig = ({
  target,
  distance,
  apiRef,
  still,
}: {
  target: THREE.Vector3
  distance: number
  apiRef?: MutableRefObject<HeroCameraApi | null>
  still: boolean
}) => {
  // OrbitControls listens (and captures the pointer) on R3F's event source.
  const surface = useThree(
    (state) =>
      (state.events.connected as HTMLElement | undefined) ??
      state.gl.domElement,
  )
  const camera = useThree((state) => state.camera)
  const invalidate = useThree((state) => state.invalidate)
  const [autoRotate, setAutoRotate] = useState(!still)
  const resumeTimer = useRef<ReturnType<typeof setTimeout>>()
  const home = useMemo(() => camera.position.clone(), [camera])
  const goal = useRef<{ distance?: number; position?: THREE.Vector3 }>({})
  const offset = useMemo(() => new THREE.Vector3(), [])

  useEffect(() => setAutoRotate(!still), [still])

  useEffect(() => {
    const currentDistance = () => camera.position.distanceTo(target)
    const zoomBy = (factor: number) => {
      const from = goal.current.distance ?? currentDistance()
      goal.current = {
        distance: MathUtils.clamp(from * factor, MIN_DISTANCE, MAX_DISTANCE),
      }
      invalidate()
    }
    if (apiRef) {
      apiRef.current = {
        zoomIn: () => zoomBy(1 / BUTTON_ZOOM),
        zoomOut: () => zoomBy(BUTTON_ZOOM),
        reset: () => {
          goal.current = { position: home.clone() }
          invalidate()
        },
      }
    }

    const onWheel = (event: WheelEvent) => {
      if (!event.ctrlKey && !event.metaKey) return // let the page scroll
      event.preventDefault()
      const lines = event.deltaMode === 1 ? 16 : 1
      const delta = MathUtils.clamp(event.deltaY * lines, -120, 120)
      zoomBy(Math.exp(delta * 0.004))
    }
    // Safari reports trackpad pinches as gesture events instead.
    let lastScale = 1
    const onGestureStart = (event: Event) => {
      event.preventDefault()
      lastScale = 1
    }
    const onGestureChange = (event: Event) => {
      event.preventDefault()
      const scale = (event as Event & { scale?: number }).scale ?? 1
      zoomBy(lastScale / scale)
      lastScale = scale
    }
    surface.addEventListener('wheel', onWheel, { passive: false })
    surface.addEventListener('gesturestart', onGestureStart)
    surface.addEventListener('gesturechange', onGestureChange)
    return () => {
      surface.removeEventListener('wheel', onWheel)
      surface.removeEventListener('gesturestart', onGestureStart)
      surface.removeEventListener('gesturechange', onGestureChange)
      clearTimeout(resumeTimer.current)
      if (apiRef) apiRef.current = null
    }
  }, [surface, camera, target, home, apiRef, invalidate])

  // Ease towards the requested zoom or the reset position.
  useFrame((_, delta) => {
    const step = Math.min(delta, 0.1)
    const { distance: toDistance, position: toPosition } = goal.current
    if (toPosition) {
      camera.position.x = MathUtils.damp(
        camera.position.x,
        toPosition.x,
        5,
        step,
      )
      camera.position.y = MathUtils.damp(
        camera.position.y,
        toPosition.y,
        5,
        step,
      )
      camera.position.z = MathUtils.damp(
        camera.position.z,
        toPosition.z,
        5,
        step,
      )
      if (camera.position.distanceTo(toPosition) < 0.2) goal.current = {}
      invalidate()
    } else if (toDistance !== undefined) {
      offset.copy(camera.position).sub(target)
      const next = MathUtils.damp(offset.length(), toDistance, 7, step)
      camera.position.copy(target).add(offset.setLength(next))
      if (Math.abs(next - toDistance) < 0.05) goal.current = {}
      invalidate()
    }
  })

  return (
    <OrbitControls
      makeDefault
      target={target}
      enablePan={false}
      enableZoom={false}
      enableDamping
      dampingFactor={0.08}
      rotateSpeed={0.6}
      minDistance={Math.min(MIN_DISTANCE, distance)}
      maxDistance={Math.max(MAX_DISTANCE, distance)}
      minPolarAngle={0}
      maxPolarAngle={radians(62)}
      autoRotate={autoRotate}
      autoRotateSpeed={0.35}
      onStart={() => {
        clearTimeout(resumeTimer.current)
        goal.current = {}
        setAutoRotate(false)
      }}
      onEnd={() => {
        if (still) return
        resumeTimer.current = setTimeout(
          () => setAutoRotate(true),
          AUTO_ROTATE_RESUME_MS,
        )
      }}
    />
  )
}

/** Hands-off camera: slow drift and a little pointer parallax. */
const CinematicRig = ({
  target,
  polar,
  azimuth,
  distance,
  still,
}: {
  target: THREE.Vector3
  polar: number
  azimuth: number
  distance: number
  still: boolean
}) => {
  const camera = useThree((state) => state.camera)
  const pointer = useRef({ x: 0, y: 0 })
  const current = useRef({ polar, azimuth })

  useEffect(() => {
    const onPointer = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onPointer, { passive: true })
    return () => window.removeEventListener('pointermove', onPointer)
  }, [])

  useFrame((state, delta) => {
    const t = still ? 0 : state.clock.elapsedTime
    const step = Math.min(delta, 0.1)
    const c = current.current
    c.azimuth = MathUtils.damp(
      c.azimuth,
      azimuth + Math.sin(t * 0.06) * 8 + pointer.current.x * 7,
      2.2,
      step,
    )
    c.polar = MathUtils.damp(
      c.polar,
      polar + Math.sin(t * 0.045) * 3 + pointer.current.y * 3,
      2.2,
      step,
    )
    spherical(target, c.polar, c.azimuth, distance, camera.position)
    camera.lookAt(target)
  })

  return null
}
