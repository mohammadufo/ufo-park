'use client'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

// three.js is ~600 kB: load it after the page is interactive, never on the server.
const HeroCanvas = dynamic(() => import('./HeroCanvas'), { ssr: false })

const useIsNarrow = () => {
  const [narrow, setNarrow] = useState(false)
  useEffect(() => {
    const query = window.matchMedia('(max-width: 767px)')
    const onChange = () => setNarrow(query.matches)
    onChange()
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])
  return narrow
}

export const HeroScene = () => {
  const [ready, setReady] = useState(false)
  const narrow = useIsNarrow()

  return (
    <div
      aria-hidden
      className={`absolute inset-0 transition-opacity duration-[1400ms] ease-out ${
        ready ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <HeroCanvas hideComments={narrow} onReady={() => setReady(true)} />
    </div>
  )
}
