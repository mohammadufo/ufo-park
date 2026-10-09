import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { yellowColor } from '../util/constants'
import { getUnitPlane } from '../util/assets'
import { Square, SquareProps } from './Square'

interface BlinkingParkingSlotProps extends SquareProps {
  /** Length of one full pulse, in milliseconds. */
  blinkDuration?: number
  /** Adds a soft translucent fill inside the frame. */
  filled?: boolean
}

/** A parking-slot frame that pulses smoothly instead of popping on and off. */
export const BlinkingParkingSlot = ({
  borderColor = yellowColor,
  blinkDuration = 1600,
  filled = true,
  size = [5, 3],
  position,
  ...props
}: BlinkingParkingSlotProps) => {
  const frameMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: borderColor,
        transparent: true,
        toneMapped: false,
      }),
    [borderColor],
  )
  const fillMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: borderColor,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        toneMapped: false,
      }),
    [borderColor],
  )
  const phase = useRef(Math.random() * Math.PI * 2)

  useEffect(
    () => () => {
      frameMaterial.dispose()
      fillMaterial.dispose()
    },
    [frameMaterial, fillMaterial],
  )

  useFrame(({ clock }) => {
    const wave =
      0.5 +
      0.5 *
        Math.sin(
          (clock.elapsedTime * Math.PI * 2 * 1000) / blinkDuration +
            phase.current,
        )
    frameMaterial.opacity = 0.35 + 0.65 * wave
    fillMaterial.opacity = 0.04 + 0.14 * wave
  })

  return (
    <>
      <Square
        {...props}
        position={position}
        size={size}
        material={frameMaterial}
      />
      {filled ? (
        <mesh
          geometry={getUnitPlane()}
          material={fillMaterial}
          position={[position[0], position[1] - 0.25, position[2]]}
          scale={[size[0], 1, size[1]]}
        />
      ) : null}
    </>
  )
}
