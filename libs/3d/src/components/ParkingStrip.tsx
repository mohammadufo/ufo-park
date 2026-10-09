import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { MathUtils } from 'three'
import { BLOCK_LENGTH, PARKING_DEPTH, ROAD_HALF_WIDTH } from '../util/constants'
import { getBasicMaterial, getUnitBox } from '../util/assets'
import { InstanceItem, useStaticInstances } from '../util/instances'
import { BlinkingParkingSlot } from './BlinkingParkingSlot'

interface ParkingStripProps {
  /** 1 for the bays along +z, -1 for the bays along -z. */
  side?: 1 | -1
  slots?: number
  /** Share of slots that are taken. */
  occupancy?: number
  /** Chance that one of the empty slots is highlighted as available. */
  highlightChance?: number
}

const PARKED_COLORS = ['#5b5b63', '#71717a', '#8b8b93', '#a1a1aa', '#4a4a52']
const LINE = 0.15

/**
 * One block's worth of curbside parking bays. Most are taken; now and then a
 * free one lights up in brand yellow — the spot UFO Park found for you.
 */
export const ParkingStrip = ({
  side = 1,
  slots = 18,
  occupancy = 0.78,
  highlightChance = 0.75,
}: ParkingStripProps) => {
  const slotLength = BLOCK_LENGTH / slots
  const centerZ = side * (ROAD_HALF_WIDTH + PARKING_DEPTH / 2)

  const { lines, bodies, cabins, highlight } = useMemo(() => {
    const lines: InstanceItem[] = []
    const bodies: InstanceItem[] = []
    const cabins: InstanceItem[] = []
    const empty: number[] = []

    for (let i = 0; i < slots; i++) {
      const x0 = -BLOCK_LENGTH / 2 + i * slotLength
      lines.push({
        position: new THREE.Vector3(x0, 0, centerZ),
        scale: new THREE.Vector3(LINE, 0.04, PARKING_DEPTH),
      })

      if (Math.random() > occupancy) {
        empty.push(i)
        continue
      }
      const length = MathUtils.randFloat(4, 5)
      const width = MathUtils.randFloat(1.8, 2.1)
      const x = x0 + slotLength / 2 + MathUtils.randFloat(-0.3, 0.3)
      const color = new THREE.Color(
        PARKED_COLORS[MathUtils.randInt(0, PARKED_COLORS.length - 1)],
      )
      bodies.push({
        position: new THREE.Vector3(x, 0, centerZ),
        scale: new THREE.Vector3(length, 0.85, width),
        color,
      })
      cabins.push({
        position: new THREE.Vector3(x, 0.85, centerZ),
        scale: new THREE.Vector3(length * 0.5, 0.45, width * 0.84),
      })
    }

    // Curb line along the outer edge of the bays.
    lines.push({
      position: new THREE.Vector3(
        0,
        0,
        side * (ROAD_HALF_WIDTH + PARKING_DEPTH - LINE / 2),
      ),
      scale: new THREE.Vector3(BLOCK_LENGTH, 0.04, LINE),
    })

    const highlight =
      empty.length && Math.random() < highlightChance
        ? -BLOCK_LENGTH / 2 +
          (empty[MathUtils.randInt(0, empty.length - 1)] + 0.5) * slotLength
        : null

    return { lines, bodies, cabins, highlight }
    // A strip is randomised once, when it is spawned.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const linesRef = useRef<THREE.InstancedMesh>(null)
  const bodiesRef = useRef<THREE.InstancedMesh>(null)
  const cabinsRef = useRef<THREE.InstancedMesh>(null)
  useStaticInstances(linesRef, lines)
  useStaticInstances(bodiesRef, bodies)
  useStaticInstances(cabinsRef, cabins)

  const box = getUnitBox()

  return (
    <group>
      <instancedMesh
        ref={linesRef}
        args={[box, getBasicMaterial('#4a4a50'), lines.length]}
      />
      {bodies.length ? (
        <instancedMesh
          ref={bodiesRef}
          args={[box, getBasicMaterial('#ffffff'), bodies.length]}
        />
      ) : null}
      {cabins.length ? (
        <instancedMesh
          ref={cabinsRef}
          args={[box, getBasicMaterial('#18181b'), cabins.length]}
        />
      ) : null}
      {highlight !== null ? (
        <BlinkingParkingSlot
          position={[highlight, 0.25, centerZ]}
          size={[slotLength - 0.9, PARKING_DEPTH - 0.5]}
          thickness={0.25}
          blinkDuration={1400}
        />
      ) : null}
    </group>
  )
}
