import * as THREE from 'three'
import { ReactNode, useCallback, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { WORLD_DURATION } from '../util/constants'

interface SpawnerProps {
  startPosition: THREE.Vector3
  endPosition: THREE.Vector3
  duration?: number
  spawnInterval: number
  /** Shifts the spawn schedule (in seconds) so twin spawners don't line up. */
  offset?: number
  /** Start with the path already populated instead of an empty world. */
  prewarm?: boolean
  children: ReactNode
}

/** Frames longer than this (tab switch, paused loop) don't teleport the world. */
const MAX_DELTA = 0.1

/**
 * Spawns a copy of `children` every `spawnInterval` seconds and moves it from
 * `startPosition` to `endPosition` in `duration` seconds.
 *
 * Spawns follow a fixed schedule (element k is born at k * spawnInterval), so
 * the spacing between elements is exact and consecutive city blocks line up.
 * Positions are written straight to the groups every frame; React only
 * re-renders when an element is born or removed.
 */
export const Spawner = ({
  spawnInterval,
  startPosition,
  endPosition,
  children,
  duration = WORLD_DURATION,
  offset = 0,
  prewarm = true,
}: SpawnerProps) => {
  const time = useRef((prewarm ? duration : 0) + offset)

  const rangeAt = (t: number): [number, number] => [
    Math.floor((t - duration) / spawnInterval) + 1,
    Math.floor(t / spawnInterval),
  ]

  const [range, setRange] = useState<[number, number]>(() =>
    rangeAt(time.current),
  )
  const rangeRef = useRef(range)
  const groups = useRef(new Map<number, THREE.Group>())

  const place = useCallback(
    (group: THREE.Group, index: number) => {
      const progress = (time.current - index * spawnInterval) / duration
      group.position.lerpVectors(startPosition, endPosition, progress)
    },
    [spawnInterval, duration, startPosition, endPosition],
  )

  useFrame((_, delta) => {
    time.current += Math.min(delta, MAX_DELTA)

    const next = rangeAt(time.current)
    if (next[0] !== rangeRef.current[0] || next[1] !== rangeRef.current[1]) {
      rangeRef.current = next
      setRange(next)
    }

    groups.current.forEach(place)
  })

  const elements: number[] = []
  for (let index = range[0]; index <= range[1]; index++) elements.push(index)

  return (
    <>
      {elements.map((index) => (
        <group
          key={index}
          ref={(group) => {
            if (group) {
              groups.current.set(index, group)
              place(group, index)
            } else {
              groups.current.delete(index)
            }
          }}
        >
          {children}
        </group>
      ))}
    </>
  )
}
