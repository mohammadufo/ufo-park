import { MeshProps } from '@react-three/fiber'
import { Material } from 'three'
import { yellowColor } from '../util/constants'
import { getBasicMaterial, getUnitBox } from '../util/assets'

export interface SquareProps extends MeshProps {
  position: [number, number, number]
  size?: [number, number]
  borderColor?: string
  /** Overrides `borderColor`, e.g. to animate the frame's opacity. */
  material?: Material
  thickness?: number
}

/** A rectangular outline made of four thin bars. */
export const Square: React.FC<SquareProps> = ({
  position,
  size = [5, 3],
  borderColor = yellowColor,
  material,
  thickness = 0.2,
  ...props
}) => {
  const [x, y, z] = position
  const halfWidth = size[0] / 2
  const halfLength = size[1] / 2
  const geometry = getUnitBox()
  const mat = material ?? getBasicMaterial(borderColor)

  const bars: Array<[number, number, number, number, number]> = [
    // x, z, scaleX, scaleZ — top, bottom, left, right
    [x, z + halfLength - thickness / 2, size[0], thickness, 0],
    [x, z - halfLength + thickness / 2, size[0], thickness, 1],
    [x - halfWidth + thickness / 2, z, thickness, size[1] - 2 * thickness, 2],
    [x + halfWidth - thickness / 2, z, thickness, size[1] - 2 * thickness, 3],
  ]

  return (
    <>
      {bars.map(([bx, bz, sx, sz, key]) => (
        <mesh
          key={key}
          geometry={geometry}
          material={mat}
          position={[bx, y - thickness / 2, bz]}
          scale={[sx, thickness, sz]}
          {...props}
        />
      ))}
    </>
  )
}
