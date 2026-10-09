import { Color } from '@react-three/fiber'
import * as THREE from 'three'
import { MathUtils, Vector3 } from 'three'
import { useEffect, useMemo, useState } from 'react'
import { Html } from '@react-three/drei'
import { getRamdomComment } from '../util/comments'
import { headlightColor, taillightColor } from '../util/constants'
import {
  getBasicMaterial,
  getHeadlightBeamMaterial,
  getTaillightGlowMaterial,
  getUnitBox,
  getUnitPlane,
} from '../util/assets'
import { BlinkingParkingSlot } from './BlinkingParkingSlot'

interface CarProps {
  color?: Color
  position?: Vector3
  /** [width, height, length] — height is ignored, kept for compatibility. */
  size?: [number, number, number]
  searching?: boolean
  comment?: boolean
  /** Headlight beam in front and a taillight glow behind. */
  trail?: boolean
  /** Forward cars drive towards -x, the others towards +x. */
  forward?: boolean
}

const CAR_COLORS = ['#f4f4f5', '#e4e4e7', '#d4d4d8', '#a1a1aa', '#c8c8cc']
const GLASS_COLOR = '#1f1f23'
const BODY_HEIGHT = 0.9
const BEAM_LENGTH = 16

const toColorKey = (color: Color) =>
  typeof color === 'string'
    ? color
    : `#${new THREE.Color(color as THREE.ColorRepresentation).getHexString()}`

export const Car: React.FC<CarProps> = ({
  color,
  position,
  forward = true,
  trail = true,
  searching = false,
  comment = false,
  size,
}) => {
  const [width, , length] = useMemo<[number, number, number]>(
    () =>
      size || [MathUtils.randFloat(1.9, 2.3), 0, MathUtils.randFloat(4, 5.4)],
    [size],
  )
  const bodyColor = useMemo(
    () =>
      color
        ? toColorKey(color)
        : CAR_COLORS[MathUtils.randInt(0, CAR_COLORS.length - 1)],
    [color],
  )

  const box = getUnitBox()
  const plane = getUnitPlane()
  const body = getBasicMaterial(bodyColor)
  const glass = getBasicMaterial(GLASS_COLOR)
  const headlight = getBasicMaterial(headlightColor)
  const taillight = getBasicMaterial(taillightColor)

  // The model is built facing -x; reversed cars are rotated half a turn.
  return (
    <group position={position}>
      <group rotation={[0, forward ? 0 : Math.PI, 0]}>
        <mesh
          geometry={box}
          material={body}
          scale={[length, BODY_HEIGHT, width]}
        />
        <mesh
          geometry={box}
          material={glass}
          position={[length * 0.05, BODY_HEIGHT, 0]}
          scale={[length * 0.54, 0.45, width * 0.86]}
        />
        <mesh
          geometry={box}
          material={body}
          position={[length * 0.08, BODY_HEIGHT, 0]}
          scale={[length * 0.32, 0.52, width * 0.8]}
        />
        {[-1, 1].map((side) => (
          <group key={side}>
            <mesh
              geometry={box}
              material={headlight}
              position={[-length / 2 - 0.05, 0.35, side * width * 0.3]}
              scale={[0.2, 0.3, width * 0.24]}
            />
            <mesh
              geometry={box}
              material={taillight}
              position={[length / 2 + 0.05, 0.35, side * width * 0.32]}
              scale={[0.2, 0.3, width * 0.2]}
            />
          </group>
        ))}
        {trail ? (
          <>
            <mesh
              geometry={plane}
              material={getHeadlightBeamMaterial()}
              position={[-length / 2 - BEAM_LENGTH / 2 + 0.4, 0.04, 0]}
              rotation={[0, Math.PI, 0]}
              scale={[BEAM_LENGTH, 1, width * 2.6]}
            />
            <mesh
              geometry={plane}
              material={getTaillightGlowMaterial()}
              position={[length / 2 + 1, 0.05, 0]}
              scale={[3.4, 1, width * 1.5]}
            />
          </>
        ) : null}
      </group>

      {searching ? (
        <BlinkingParkingSlot
          position={[0, 2.4, 0]}
          size={[length + 1.6, width + 1.4]}
        />
      ) : null}

      {comment ? <CarComment /> : null}
    </group>
  )
}

const CarComment = () => {
  const [text, setText] = useState(() => getRamdomComment())

  useEffect(() => {
    const interval = setInterval(() => setText(getRamdomComment()), 16000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Html
      position={[0, 1.5, 0]}
      zIndexRange={[10, 0]}
      style={{ pointerEvents: 'none' }}
    >
      {/* Sits up and to the right of the car, tied to it by a short leader. */}
      <div
        style={{
          position: 'absolute',
          left: 6,
          bottom: 6,
          width: 22,
          height: 22,
          borderLeft: '1px solid hsla(52, 100%, 50%, 0.6)',
          transform: 'skewX(45deg)',
          transformOrigin: 'bottom left',
        }}
      />
      <div
        key={text}
        style={{
          position: 'absolute',
          left: 28,
          bottom: 28,
          whiteSpace: 'pre',
          userSelect: 'none',
          color: '#e4e4e7',
          fontSize: '0.75rem',
          lineHeight: 1.45,
          fontWeight: 500,
          padding: '0.4rem 0.65rem',
          background: 'rgba(12, 12, 14, 0.72)',
          borderLeft: `2px solid hsl(52, 100%, 50%)`,
          backdropFilter: 'blur(4px)',
          boxShadow: '0 6px 20px rgba(0,0,0,0.35)',
          animation: 'ufo-comment-in 600ms ease-out both',
        }}
      >
        {text}
      </div>
    </Html>
  )
}
