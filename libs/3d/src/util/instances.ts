import { RefObject, useLayoutEffect } from 'react'
import * as THREE from 'three'

export type InstanceItem = {
  position: THREE.Vector3
  scale: THREE.Vector3
  color?: THREE.Color
}

const matrix = new THREE.Matrix4()
const identity = new THREE.Quaternion()

/** Writes static transforms (and optional colors) into an InstancedMesh. */
export const useStaticInstances = (
  ref: RefObject<THREE.InstancedMesh>,
  items: InstanceItem[],
) => {
  useLayoutEffect(() => {
    const mesh = ref.current
    if (!mesh) return
    items.forEach(({ position, scale, color }, i) => {
      mesh.setMatrixAt(i, matrix.compose(position, identity, scale))
      if (color) mesh.setColorAt(i, color)
    })
    mesh.instanceMatrix.needsUpdate = true
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
    mesh.computeBoundingSphere()
  }, [ref, items])
}
