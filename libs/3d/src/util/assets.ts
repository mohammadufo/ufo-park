import * as THREE from 'three'
import { headlightColor, taillightColor } from './constants'

/**
 * Geometries, materials and textures shared by every instance in the scene.
 *
 * They are created lazily (the module is safe to import during SSR) and live
 * for the lifetime of the page, so hundreds of cars and buildings reuse a
 * handful of GPU resources instead of allocating their own.
 */

let unitBox: THREE.BoxGeometry | null = null
let unitPlane: THREE.PlaneGeometry | null = null
let beamTexture: THREE.CanvasTexture | null = null
let glowTexture: THREE.CanvasTexture | null = null
const basicMaterials = new Map<string, THREE.MeshBasicMaterial>()

/** 1×1×1 box with its base at y = 0, scale it to the size you need. */
export const getUnitBox = () => {
  if (!unitBox) {
    unitBox = new THREE.BoxGeometry(1, 1, 1)
    unitBox.translate(0, 0.5, 0)
  }
  return unitBox
}

/** 1×1 plane lying flat on the ground (facing +y). */
export const getUnitPlane = () => {
  if (!unitPlane) {
    unitPlane = new THREE.PlaneGeometry(1, 1)
    unitPlane.rotateX(-Math.PI / 2)
  }
  return unitPlane
}

/** Opaque flat-colored material, cached per color. */
export const getBasicMaterial = (color: string) => {
  let material = basicMaterials.get(color)
  if (!material) {
    material = new THREE.MeshBasicMaterial({ color })
    basicMaterials.set(color, material)
  }
  return material
}

const createCanvasTexture = (
  width: number,
  height: number,
  draw: (ctx: CanvasRenderingContext2D) => void,
) => {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (ctx) draw(ctx)
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

/** A soft cone of light, bright on the left (u = 0) and fading to the right. */
export const getBeamTexture = () => {
  if (!beamTexture) {
    beamTexture = createCanvasTexture(256, 128, (ctx) => {
      const gradient = ctx.createLinearGradient(0, 0, 256, 0)
      gradient.addColorStop(0, 'rgba(255,255,255,0.95)')
      gradient.addColorStop(0.35, 'rgba(255,255,255,0.45)')
      gradient.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.filter = 'blur(10px)'
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.moveTo(12, 46)
      ctx.lineTo(244, 14)
      ctx.lineTo(244, 114)
      ctx.lineTo(12, 82)
      ctx.closePath()
      ctx.fill()
    })
  }
  return beamTexture
}

/** A round radial glow. */
export const getGlowTexture = () => {
  if (!glowTexture) {
    glowTexture = createCanvasTexture(64, 64, (ctx) => {
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
      gradient.addColorStop(0, 'rgba(255,255,255,1)')
      gradient.addColorStop(0.4, 'rgba(255,255,255,0.35)')
      gradient.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, 64, 64)
    })
  }
  return glowTexture
}

const additive = (
  color: THREE.ColorRepresentation,
  map: THREE.Texture,
  opacity: number,
) =>
  new THREE.MeshBasicMaterial({
    color,
    map,
    opacity,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    toneMapped: false,
  })

let headlightBeamMaterial: THREE.MeshBasicMaterial | null = null
let taillightGlowMaterial: THREE.MeshBasicMaterial | null = null

export const getHeadlightBeamMaterial = () => {
  if (!headlightBeamMaterial) {
    headlightBeamMaterial = additive(headlightColor, getBeamTexture(), 0.3)
  }
  return headlightBeamMaterial
}

export const getTaillightGlowMaterial = () => {
  if (!taillightGlowMaterial) {
    taillightGlowMaterial = additive(taillightColor, getGlowTexture(), 0.55)
  }
  return taillightGlowMaterial
}
