'use client'
import { MutableRefObject } from 'react'
import { CarScene } from '@ufopark/3d/src/scenes/CarScene'
import {
  HeroCamera,
  HeroCameraApi,
} from '@ufopark/3d/src/components/camera/HeroCamera'

export interface HeroCanvasProps {
  hideComments?: boolean
  interactive?: boolean
  still?: boolean
  onReady?: () => void
  apiRef?: MutableRefObject<HeroCameraApi | null>
}

export default function HeroCanvas({
  hideComments,
  interactive,
  still,
  onReady,
  apiRef,
}: HeroCanvasProps) {
  return (
    <CarScene
      orbitControls={false}
      camera={
        <HeroCamera interactive={interactive} still={still} apiRef={apiRef} />
      }
      hideAllComments={hideComments}
      onReady={onReady}
    />
  )
}
