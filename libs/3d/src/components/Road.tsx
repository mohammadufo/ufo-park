import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import {
  PARKING_DEPTH,
  ROAD_HALF_WIDTH,
  WORLD_SPEED,
  groundColor,
  roadColor,
  sidewalkColor,
  yellowColor,
} from '../util/constants'
import { getBasicMaterial, getUnitBox, getUnitPlane } from '../util/assets'
import { InstanceItem, useStaticInstances } from '../util/instances'

const ROAD_LENGTH = 1100
const DASH = 3
const DASH_PERIOD = 9
const LANE_LINES = [-8, -4, 4, 8]

/**
 * Ground, asphalt and paint. The lane dashes scroll with the city so the road
 * reads as moving under the cars.
 */
export const Road = ({ animate = true }: { animate?: boolean }) => {
  const plane = getUnitPlane()
  const box = getUnitBox()
  const sidewalkZ = ROAD_HALF_WIDTH + PARKING_DEPTH + 1.5

  const dashes = useMemo(() => {
    const items: InstanceItem[] = []
    const count = Math.ceil(ROAD_LENGTH / DASH_PERIOD)
    for (const z of LANE_LINES) {
      for (let i = 0; i < count; i++) {
        items.push({
          position: new THREE.Vector3(
            -ROAD_LENGTH / 2 + i * DASH_PERIOD,
            -0.16,
            z,
          ),
          scale: new THREE.Vector3(DASH, 0.02, 0.18),
        })
      }
    }
    return items
  }, [])

  const dashesRef = useRef<THREE.InstancedMesh>(null)
  const scroll = useRef<THREE.Group>(null)
  const offset = useRef(0)
  useStaticInstances(dashesRef, dashes)

  useFrame((_, delta) => {
    if (!animate || !scroll.current) return
    offset.current =
      (offset.current + Math.min(delta, 0.1) * WORLD_SPEED) % DASH_PERIOD
    scroll.current.position.x = offset.current
  })

  return (
    <group>
      {/* Ground */}
      <mesh
        geometry={plane}
        material={getBasicMaterial(groundColor)}
        position={[0, -0.32, 0]}
        scale={[1600, 1, 900]}
      />
      {/* Sidewalks */}
      {[-1, 1].map((side) => (
        <mesh
          key={side}
          geometry={plane}
          material={getBasicMaterial(sidewalkColor)}
          position={[0, -0.26, side * sidewalkZ]}
          scale={[ROAD_LENGTH, 1, 3]}
        />
      ))}
      {/* Asphalt, including the parking bays */}
      <mesh
        geometry={plane}
        material={getBasicMaterial(roadColor)}
        position={[0, -0.2, 0]}
        scale={[ROAD_LENGTH, 1, (ROAD_HALF_WIDTH + PARKING_DEPTH) * 2]}
      />
      {/* Double yellow center line */}
      {[-0.3, 0.3].map((z) => (
        <mesh
          key={z}
          geometry={box}
          material={getBasicMaterial(yellowColor)}
          position={[0, -0.17, z]}
          scale={[ROAD_LENGTH, 0.02, 0.16]}
        />
      ))}
      {/* Road edges, between the lanes and the parking bays */}
      {[-1, 1].map((side) => (
        <mesh
          key={side}
          geometry={box}
          material={getBasicMaterial('#5b5b62')}
          position={[0, -0.17, side * ROAD_HALF_WIDTH]}
          scale={[ROAD_LENGTH, 0.02, 0.16]}
        />
      ))}
      <group ref={scroll}>
        <instancedMesh
          ref={dashesRef}
          args={[box, getBasicMaterial('#6b6b72'), dashes.length]}
        />
      </group>
    </group>
  )
}
