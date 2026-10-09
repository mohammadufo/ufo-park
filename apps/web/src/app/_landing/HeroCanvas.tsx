'use client'
import { CarScene } from '@ufopark/3d/src/scenes/CarScene'
import { HeroCamera } from '@ufopark/3d/src/components/camera/HeroCamera'

export interface HeroCanvasProps {
  hideComments?: boolean
  onReady?: () => void
}

export default function HeroCanvas({ hideComments, onReady }: HeroCanvasProps) {
  return (
    <CarScene
      orbitControls={false}
      camera={<HeroCamera />}
      hideAllComments={hideComments}
      onReady={onReady}
    />
  )
}
