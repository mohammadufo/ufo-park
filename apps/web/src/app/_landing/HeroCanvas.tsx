'use client'
import { CarScene } from '@ufopark/3d/src/scenes/CarScene'
import { HeroCamera } from '@ufopark/3d/src/components/camera/HeroCamera'

export interface HeroCanvasProps {
  hideComments?: boolean
  interactive?: boolean
  still?: boolean
  onReady?: () => void
  onZoomArmedChange?: (armed: boolean) => void
}

export default function HeroCanvas({
  hideComments,
  interactive,
  still,
  onReady,
  onZoomArmedChange,
}: HeroCanvasProps) {
  return (
    <CarScene
      orbitControls={false}
      camera={
        <HeroCamera
          interactive={interactive}
          still={still}
          onZoomArmedChange={onZoomArmedChange}
        />
      }
      hideAllComments={hideComments}
      onReady={onReady}
    />
  )
}
