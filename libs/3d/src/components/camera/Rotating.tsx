import { useRef } from 'react'
import * as THREE from 'three'
import { MathUtils } from 'three'
import { PerspectiveCamera } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

/** Slowly circles above the road while gently breathing its field of view. */
export const RotatingCamera = ({
  speed = 0.18,
  minFov = 30,
  maxFov = 60,
  radius = 80,
}) => {
  const angle = useRef(MathUtils.randFloat(0, Math.PI * 2))
  const cameraRef = useRef<THREE.PerspectiveCamera>(null)

  useFrame((state, delta) => {
    const camera = cameraRef.current
    if (!camera) return

    angle.current =
      (angle.current + speed * Math.min(delta, 0.1)) % (Math.PI * 2)
    camera.position.set(
      radius * Math.sin(angle.current),
      200,
      radius * Math.cos(angle.current),
    )
    camera.lookAt(1, 0, 1)

    const amplitude = (maxFov - minFov) / 2
    camera.fov =
      minFov + amplitude + Math.sin(state.clock.elapsedTime * 0.05) * amplitude
    camera.updateProjectionMatrix()
  })

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      fov={(minFov + maxFov) / 2}
      near={1}
      far={1000}
      position={[0, 200, radius]}
    />
  )
}
