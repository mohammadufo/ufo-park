'use client'
import dynamic from 'next/dynamic'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  IconFocusCentered,
  IconMinus,
  IconPlus,
  IconRotate360,
} from '@tabler/icons-react'
import type { HeroCameraApi } from '@ufopark/3d/src/components/camera/HeroCamera'

// three.js is ~600 kB: load it after the page is interactive, never on the server.
const HeroCanvas = dynamic(() => import('./HeroCanvas'), { ssr: false })

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false)
  useEffect(() => {
    const list = window.matchMedia(query)
    const onChange = () => setMatches(list.matches)
    onChange()
    list.addEventListener('change', onChange)
    return () => list.removeEventListener('change', onChange)
  }, [query])
  return matches
}

const ControlButton = ({
  label,
  onClick,
  children,
}: {
  label: string
  onClick: () => void
  children: React.ReactNode
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label}
    title={label}
    className="flex h-9 w-9 items-center justify-center text-fg-muted transition-colors hover:bg-primary hover:text-black"
  >
    {children}
  </button>
)

export const HeroScene = () => {
  const [ready, setReady] = useState(false)
  const narrow = useMediaQuery('(max-width: 767px)')
  // Orbit with a mouse; on touch screens a drag has to keep scrolling the page.
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)')
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const onReady = useCallback(() => setReady(true), [])
  const camera = useRef<HeroCameraApi | null>(null)
  const [modifier, setModifier] = useState('Ctrl')

  useEffect(() => {
    if (/Mac|iPhone|iPad/.test(navigator.platform)) setModifier('⌘')
  }, [])

  return (
    <>
      <div
        aria-hidden
        className={`absolute inset-0 transition-opacity duration-[1400ms] ease-out ${
          ready ? 'opacity-100' : 'opacity-0'
        } ${finePointer ? 'cursor-grab active:cursor-grabbing' : ''}`}
      >
        <HeroCanvas
          hideComments={narrow}
          interactive={finePointer}
          still={reducedMotion}
          onReady={onReady}
          apiRef={camera}
        />
      </div>

      {finePointer && ready ? (
        <div className="absolute bottom-6 right-4 z-20 hidden animate-fade-up items-end gap-3 sm:right-6 md:flex">
          <p className="glass pointer-events-none hidden items-center gap-2 px-3 py-2 text-xs text-fg-muted xl:flex">
            <IconRotate360 size={16} className="text-primary" />
            Drag to look around.
            <span className="text-fg-subtle">
              Zoom with{' '}
              <kbd className="border border-line-strong px-1 font-sans text-[11px] text-fg">
                {modifier}
              </kbd>{' '}
              + scroll or pinch.
            </span>
          </p>
          <div
            role="group"
            aria-label="Camera"
            className="glass flex flex-col divide-y divide-line-strong"
          >
            <ControlButton
              label="Zoom in"
              onClick={() => camera.current?.zoomIn()}
            >
              <IconPlus size={18} />
            </ControlButton>
            <ControlButton
              label="Zoom out"
              onClick={() => camera.current?.zoomOut()}
            >
              <IconMinus size={18} />
            </ControlButton>
            <ControlButton
              label="Reset view"
              onClick={() => camera.current?.reset()}
            >
              <IconFocusCentered size={18} />
            </ControlButton>
          </div>
        </div>
      ) : null}
    </>
  )
}
