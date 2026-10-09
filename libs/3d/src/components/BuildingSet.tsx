import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { MathUtils } from 'three'
import { BUILDING_SETS } from '../util/buildingSets'
import { randExp } from '../util'
import { FLOOR_HEIGHT, yellowColor } from '../util/constants'
import { getUnitBox, getUnitPlane } from '../util/assets'
import { InstanceItem, useStaticInstances } from '../util/instances'

interface BuildingSetProps {
  minHeight?: number
  maxHeight?: number
  /** Chance that one building of the block is a UFO Park partner garage. */
  garageChance?: number
}

const BAR = 0.2
const SCALE = 2
const WHITE = new THREE.Color('#f4f4f5')
const YELLOW = new THREE.Color(yellowColor)
const ROOF = new THREE.Color('#000000')
const GARAGE_ROOF = new THREE.Color('hsl(52, 100%, 7%)')

type Bar = InstanceItem

// Shared across all blocks: one material for the outlines, one for the roofs.
let barMaterial: THREE.MeshBasicMaterial | null = null
let roofMaterial: THREE.MeshBasicMaterial | null = null
const getMaterials = () => {
  if (!barMaterial || !roofMaterial) {
    barMaterial = new THREE.MeshBasicMaterial({ toneMapped: false })
    roofMaterial = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0.72,
      depthWrite: false,
    })
  }
  return { barMaterial, roofMaterial }
}

/**
 * A city block: a few wireframe towers drawn as floor outlines.
 *
 * Every bar of every floor is one instance of a single InstancedMesh, so a
 * whole block costs two draw calls instead of several hundred meshes.
 */
export const BuildingSet = ({
  minHeight = 2,
  maxHeight = 20,
  garageChance = 0.22,
}: BuildingSetProps) => {
  const { bars, roofs } = useMemo(() => {
    const set = BUILDING_SETS[MathUtils.randInt(0, BUILDING_SETS.length - 1)]
    const garageIndex =
      Math.random() < garageChance ? MathUtils.randInt(0, set.length - 1) : -1

    const bars: Bar[] = []
    const roofs: Bar[] = []

    set.forEach(({ position, width, length }, i) => {
      const floors = Math.max(1, Math.floor(randExp(minHeight, maxHeight, 7)))
      const isGarage = i === garageIndex
      const cx = position[0] * SCALE
      const cz = position[2] * SCALE
      const w = width * SCALE
      const l = length * SCALE
      const top = FLOOR_HEIGHT * (floors - 1)

      for (let floor = 0; floor < floors; floor++) {
        const y = floor * FLOOR_HEIGHT
        // Lower floors are dimmer, which reads as depth from above.
        const shade = 0.28 + 0.72 * ((floor + 1) / floors) ** 1.5
        const color = (isGarage ? YELLOW : WHITE).clone().multiplyScalar(shade)
        const add = (x: number, z: number, sx: number, sz: number) =>
          bars.push({
            position: new THREE.Vector3(x, y - BAR / 2, z),
            scale: new THREE.Vector3(sx, BAR, sz),
            color,
          })
        add(cx, cz + l / 2 - BAR / 2, w, BAR)
        add(cx, cz - l / 2 + BAR / 2, w, BAR)
        add(cx - w / 2 + BAR / 2, cz, BAR, l - 2 * BAR)
        add(cx + w / 2 - BAR / 2, cz, BAR, l - 2 * BAR)
      }

      // Corner pillars
      if (top > 0) {
        const pillarColor = (isGarage ? YELLOW : WHITE)
          .clone()
          .multiplyScalar(0.3)
        for (const sx of [-1, 1]) {
          for (const sz of [-1, 1]) {
            bars.push({
              position: new THREE.Vector3(
                cx + sx * (w / 2 - BAR / 2),
                0,
                cz + sz * (l / 2 - BAR / 2),
              ),
              scale: new THREE.Vector3(BAR, top, BAR),
              color: pillarColor,
            })
          }
        }
      }

      // Rooftop parking deck on partner garages: two rows of slot lines.
      if (isGarage) {
        const slot = 3.2
        const count = Math.floor((w - 4) / slot)
        const depth = Math.min(6, l / 3)
        for (let s = 0; s <= count; s++) {
          const x = cx - (count * slot) / 2 + s * slot
          for (const side of [-1, 1]) {
            bars.push({
              position: new THREE.Vector3(
                x,
                top + 0.05,
                cz + side * (l / 2 - 1 - depth / 2),
              ),
              scale: new THREE.Vector3(0.18, 0.05, depth),
              color: YELLOW,
            })
          }
        }
      }

      roofs.push({
        position: new THREE.Vector3(cx, top - 0.05, cz),
        scale: new THREE.Vector3(w - BAR, 1, l - BAR),
        color: isGarage ? GARAGE_ROOF : ROOF,
      })
    })

    return { bars, roofs }
    // A block is randomised once, when it is spawned.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { barMaterial, roofMaterial } = getMaterials()
  const barsRef = useRef<THREE.InstancedMesh>(null)
  const roofsRef = useRef<THREE.InstancedMesh>(null)

  useStaticInstances(barsRef, bars)
  useStaticInstances(roofsRef, roofs)

  return (
    <group>
      <instancedMesh
        ref={barsRef}
        args={[getUnitBox(), barMaterial, bars.length]}
      />
      <instancedMesh
        ref={roofsRef}
        args={[getUnitPlane(), roofMaterial, roofs.length]}
      />
    </group>
  )
}
