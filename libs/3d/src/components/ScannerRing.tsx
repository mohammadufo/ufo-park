import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { yellowColor } from '../util/constants'

interface ScannerRingProps {
  color?: string
  /** Radius the pulses grow to. */
  radius?: number
  /** Seconds per pulse. */
  period?: number
  rings?: number
}

/** Radar-like pulses spreading on the ground around the car looking for a spot. */
export const ScannerRing = ({
  color = yellowColor,
  radius = 16,
  period = 2.6,
  rings = 2,
}: ScannerRingProps) => {
  const geometry = useMemo(() => {
    const ring = new THREE.RingGeometry(0.92, 1, 64)
    ring.rotateX(-Math.PI / 2)
    return ring
  }, [])
  const materials = useMemo(
    () =>
      Array.from(
        { length: rings },
        () =>
          new THREE.MeshBasicMaterial({
            color,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            toneMapped: false,
          }),
      ),
    [color, rings],
  )
  const meshes = useRef<Array<THREE.Mesh | null>>([])

  useEffect(
    () => () => {
      geometry.dispose()
      materials.forEach((material) => material.dispose())
    },
    [geometry, materials],
  )

  useFrame(({ clock }) => {
    meshes.current.forEach((mesh, i) => {
      if (!mesh) return
      const t = (clock.elapsedTime / period + i / rings) % 1
      const eased = 1 - (1 - t) ** 3
      mesh.scale.setScalar(2 + eased * (radius - 2))
      materials[i].opacity = 0.55 * (1 - t) ** 1.6
    })
  })

  return (
    <group position={[0, 0.06, 0]}>
      {materials.map((material, i) => (
        <mesh
          key={i}
          ref={(mesh) => {
            meshes.current[i] = mesh
          }}
          geometry={geometry}
          material={material}
        />
      ))}
    </group>
  )
}
