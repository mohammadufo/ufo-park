'use client'
import { useEffect, useState } from 'react'

/**
 * Tells visitors the page continues below the 3D city, and takes them there.
 * Fades away once they start scrolling.
 */
export const ScrollCue = ({ targetId }: { targetId: string }) => {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const onScroll = () => setHidden(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <a
      href={`#${targetId}`}
      aria-label="Scroll to how it works"
      className={`group absolute bottom-20 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-xs font-medium text-fg-muted transition-[opacity,transform] duration-500 hover:text-fg md:bottom-6 ${
        hidden ? 'pointer-events-none translate-y-2 opacity-0' : 'opacity-100'
      }`}
    >
      <span className="flex h-10 w-6 justify-center border-2 border-fg/40 pt-2 transition-colors group-hover:border-primary">
        <span className="h-2 w-[3px] animate-scroll-cue bg-primary" />
      </span>
      Scroll
    </a>
  )
}
