import { useEffect, useLayoutEffect, useRef } from 'react'
import * as THREE from 'three'
import { MathUtils } from 'three'
import { PerspectiveCamera } from '@react-three/drei'
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
  /** How strongly the camera follows the pointer. 0 disables it. */
  parallax?: number
  /** Ease closer to the road as the page scrolls. */
  scrollZoom?: boolean
}

/**
 * A cinematic, non-interactive camera: slow drift, pointer parallax and a
 * gentle push-in on scroll. It never captures wheel or touch events, so the
 * page scrolls normally over the canvas.
 */
export const HeroCamera = ({
  target = [0, 0, 4],
  distance = 160,
  polar = 27,
  azimuth = 42,
  fov = 40,
  focusX = 0.17,
  focusY = 0.14,
  parallax = 1,
  scrollZoom = true,
}: HeroCameraProps) => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null)
  const size = useThree((state) => state.size)
  const pointer = useRef({ x: 0, y: 0 })
  const scroll = useRef(0)
  const current = useRef({ polar, azimuth, distance })
  const settled = useRef(false)
  const lookAt = useRef(new THREE.Vector3(...target))

  useEffect(() => {
    const onPointer = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1
    }
    const onScroll = () => {
      scroll.current = MathUtils.clamp(
        window.scrollY / window.innerHeight,
        0,
        1,
      )
    }
    onScroll()
    window.addEventListener('pointermove', onPointer, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

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

  useFrame((state, delta) => {
    const camera = cameraRef.current
    if (!camera) return

    const t = state.clock.elapsedTime
    const portrait = size.width < size.height
    const goal = {
      azimuth:
        azimuth + Math.sin(t * 0.06) * 6 + pointer.current.x * 7 * parallax,
      polar:
        polar +
        Math.sin(t * 0.045) * 2 +
        pointer.current.y * 3 * parallax -
        scroll.current * 8,
      distance:
        distance *
        (portrait ? 1.3 : 1) *
        (scrollZoom ? 1 - scroll.current * 0.22 : 1),
    }

    // Snap on the first frame so a single (reduced-motion) frame is framed right.
    const step = settled.current ? Math.min(delta, 0.1) : 100
    settled.current = true
    const c = current.current
    c.azimuth = MathUtils.damp(c.azimuth, goal.azimuth, 2.2, step)
    c.polar = MathUtils.damp(c.polar, goal.polar, 2.2, step)
    c.distance = MathUtils.damp(c.distance, goal.distance, 2.2, step)

    const p = radians(c.polar)
    const a = radians(c.azimuth)
    const target = lookAt.current
    camera.position.set(
      target.x + Math.sin(p) * Math.cos(a) * c.distance,
      target.y + Math.cos(p) * c.distance,
      target.z + Math.sin(p) * Math.sin(a) * c.distance,
    )
    camera.lookAt(target)
  })

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      fov={fov}
      near={1}
      far={1200}
      position={[60, 165, 60]}
    />
  )
}
