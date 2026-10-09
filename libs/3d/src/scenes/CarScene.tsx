import { useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import {
  OrbitControls,
  PerformanceMonitor,
  PerspectiveCamera,
} from '@react-three/drei'
import * as THREE from 'three'
import { radians } from '../util'
import {
  BLOCK_INTERVAL,
  WORLD_DURATION,
  WORLD_END,
  WORLD_START,
  fogColor,
  yellowColor,
} from '../util/constants'
import {
  useInView,
  usePageVisible,
  usePrefersReducedMotion,
} from '../util/hooks'
import { Spawner } from '../components/Spawner'
import { Car } from '../components/Car'
import { BuildingSet } from '../components/BuildingSet'
import { ParkingStrip } from '../components/ParkingStrip'
import { Road } from '../components/Road'
import { ScannerRing } from '../components/ScannerRing'

export interface CarSceneProps {
  camera?: React.ReactNode
  children?: React.ReactNode
  /** Classes for the wrapper; the canvas fills it. */
  className?: string
  orbitControls?: boolean
  hideAllComments?: boolean
  /** Curbside parking bays with highlighted free spots. */
  showParking?: boolean
  /** Called once the WebGL context is ready, e.g. to fade the scene in. */
  onReady?: () => void
}

const v = (x: number, z: number) => new THREE.Vector3(x, 0, z)
const BUILDINGS_Z = 76

/** Lanes: negative z drives towards +x, positive z towards -x. */
const TRAFFIC = [
  { z: -10, interval: 8.2, duration: WORLD_DURATION - 6, searching: true },
  { z: -6, interval: 4.3, duration: WORLD_DURATION - 12 },
  { z: -2, interval: 7.4, duration: WORLD_DURATION - 18 },
  { z: 2, interval: 9.8, duration: WORLD_DURATION - 18, forward: true },
  { z: 6, interval: 7, duration: WORLD_DURATION - 12, forward: true },
]

export const CarScene = ({
  children,
  camera,
  className,
  orbitControls = true,
  hideAllComments = false,
  showParking = true,
  onReady,
}: CarSceneProps) => {
  const wrapper = useRef<HTMLDivElement>(null)
  const inView = useInView(wrapper)
  const pageVisible = usePageVisible()
  const reducedMotion = usePrefersReducedMotion()
  const [dpr, setDpr] = useState(1.5)

  // Don't burn GPU when nobody can see the scene; render a still frame for
  // people who asked their OS to reduce motion.
  const frameloop = reducedMotion
    ? 'demand'
    : inView && pageVisible
      ? 'always'
      : 'never'

  return (
    <div
      ref={wrapper}
      className={`relative h-full w-full overflow-hidden ${className ?? ''}`}
      style={{
        background:
          'radial-gradient(120% 90% at 65% 40%, hsl(52, 4%, 12%), hsl(240, 4%, 5%))',
      }}
    >
      <Canvas
        frameloop={frameloop}
        dpr={[1, dpr]}
        flat
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ position: 'absolute', inset: 0 }}
        fallback={null}
        onCreated={() => onReady?.()}
      >
        <fog attach="fog" args={[fogColor, 170, 430]} />
        <PerformanceMonitor
          onDecline={() => setDpr(1)}
          onIncline={() => setDpr(1.5)}
        />

        {camera || (
          <PerspectiveCamera
            makeDefault
            fov={45}
            near={1}
            far={1000}
            position={[40, 200, 40]}
            rotation={[radians(60), 0, 0]}
          />
        )}
        {children}

        {orbitControls ? (
          <OrbitControls
            minPolarAngle={radians(0)}
            maxPolarAngle={radians(30)}
            minDistance={30}
            maxDistance={180}
          />
        ) : null}

        <Road animate={!reducedMotion} />

        {/* Curbside parking */}
        {showParking
          ? ([1, -1] as const).map((side) => (
              <Spawner
                key={side}
                spawnInterval={BLOCK_INTERVAL}
                duration={WORLD_DURATION}
                offset={side === 1 ? 0.7 : 2.3}
                startPosition={v(WORLD_START, 0)}
                endPosition={v(WORLD_END, 0)}
              >
                <ParkingStrip side={side} />
              </Spawner>
            ))
          : null}

        {/* Traffic */}
        {TRAFFIC.map(({ z, interval, duration, forward, searching }) => (
          <Spawner
            key={z}
            spawnInterval={interval}
            duration={duration}
            offset={interval * 0.37}
            startPosition={forward ? v(WORLD_END, z) : v(WORLD_START, z)}
            endPosition={forward ? v(WORLD_START, z) : v(WORLD_END, z)}
          >
            <Car
              forward={!!forward}
              searching={searching}
              comment={searching && !hideAllComments}
            />
          </Spawner>
        ))}

        {/* My car: hunting for a spot along the curb */}
        <group position={[0, 0, 10]}>
          <Car
            color={yellowColor}
            size={[2.3, 0, 5.4]}
            searching
            comment={!hideAllComments}
          />
          <ScannerRing />
        </group>

        {/* City blocks */}
        {[1, -1].map((side) => (
          <Spawner
            key={side}
            spawnInterval={BLOCK_INTERVAL}
            duration={WORLD_DURATION}
            offset={side === 1 ? 0 : BLOCK_INTERVAL / 2}
            startPosition={v(WORLD_START, side * BUILDINGS_Z)}
            endPosition={v(WORLD_END, side * BUILDINGS_Z)}
          >
            <BuildingSet />
          </Spawner>
        ))}
      </Canvas>
    </div>
  )
}
