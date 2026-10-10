'use client'
import dynamic from 'next/dynamic'
import { useCallback, useEffect, useState } from 'react'
import { IconRotate360, IconZoomIn } from '@tabler/icons-react'

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

export const HeroScene = () => {
  const [ready, setReady] = useState(false)
  const [zoomArmed, setZoomArmed] = useState(false)
  const narrow = useMediaQuery('(max-width: 767px)')
  // Orbit with a mouse; on touch screens a drag has to keep scrolling the page.
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)')
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const onReady = useCallback(() => setReady(true), [])

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
          onZoomArmedChange={setZoomArmed}
        />
      </div>

      {finePointer && ready ? (
        <p
          aria-hidden
          className="pointer-events-none absolute bottom-6 right-4 z-20 hidden items-center gap-4 text-xs text-gray-100 sm:right-6 md:flex"
        >
          {zoomArmed ? (
            <span className="flex items-center gap-1.5 bg-black/60 px-2.5 py-1.5 backdrop-blur-sm">
              <IconZoomIn size={16} className="text-primary" />
              Scroll to zoom. Move off the city to scroll the page.
            </span>
          ) : (
            <span className="flex items-center gap-1.5 bg-black/60 px-2.5 py-1.5 backdrop-blur-sm">
              <IconRotate360 size={16} className="text-primary" />
              Drag to look around, click and scroll to zoom
            </span>
          )}
        </p>
      ) : null}
    </>
  )
}
