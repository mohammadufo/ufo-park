'use client'
import { useEffect, useRef, useState } from 'react'

/** Mirrors the BookingStatus values a booking moves through. */
const STOPS = [
  { label: 'Booked', valet: false },
  { label: 'Valet assigned', valet: true },
  { label: 'Picked up', valet: true },
  { label: 'Checked in', valet: false },
  { label: 'Valet assigned', valet: true },
  { label: 'Checked out', valet: false },
  { label: 'Returned to you', valet: true },
]

const STEP_MS = 260

const Marker = ({ valet, lit }: { valet: boolean; lit: boolean }) => (
  <span
    className={`relative z-10 block h-4 w-4 shrink-0 border-2 transition-all duration-500 ${
      lit ? 'border-primary' : 'border-line-strong'
    } ${valet ? 'bg-canvas' : lit ? 'bg-primary shadow-glow-sm' : 'bg-canvas'}`}
  />
)

/**
 * The stops light up one after another the first time the track scrolls
 * into view: the one orchestrated animation below the hero.
 */
export const JourneyTrack = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [lit, setLit] = useState(0)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setLit(STOPS.length)
      return
    }
    let timer: ReturnType<typeof setInterval> | undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        timer = setInterval(() => {
          setLit((count) => {
            if (count >= STOPS.length) clearInterval(timer)
            return Math.min(count + 1, STOPS.length)
          })
        }, STEP_MS)
      },
      { threshold: 0.4 },
    )
    observer.observe(element)
    return () => {
      observer.disconnect()
      clearInterval(timer)
    }
  }, [])

  const progress = Math.max(0, lit - 1) / (STOPS.length - 1)

  return (
    <div ref={ref}>
      <div className="relative mt-16">
        {/* Lane, then the yellow progress painted over it */}
        <span
          aria-hidden
          className="absolute bottom-2 left-[7px] top-2 border-l-2 border-dashed border-fg/20 lg:bottom-auto lg:left-0 lg:right-[calc(100%/7-1rem)] lg:top-[7px] lg:border-l-0 lg:border-t-2"
        />
        <span
          aria-hidden
          className="absolute left-[7px] top-2 w-0.5 bg-primary transition-[height] ease-linear lg:hidden"
          style={{
            height: `calc((100% - 1rem) * ${progress})`,
            transitionDuration: `${STEP_MS}ms`,
          }}
        />
        <span
          aria-hidden
          className="absolute left-0 top-[7px] hidden h-0.5 bg-primary transition-[width] ease-linear lg:block"
          style={{
            width: `calc((100% - 100% / 7) * ${progress})`,
            transitionDuration: `${STEP_MS}ms`,
          }}
        />
        <ol className="relative grid gap-6 lg:grid-cols-7 lg:gap-0">
          {STOPS.map(({ label, valet }, i) => (
            <li
              key={i}
              className="flex items-center gap-4 lg:flex-col lg:items-start lg:gap-5 lg:pr-4"
            >
              <Marker valet={valet} lit={i < lit} />
              <span
                className={`text-sm font-medium transition-colors duration-500 ${
                  i < lit
                    ? valet
                      ? 'text-fg-muted'
                      : 'text-fg'
                    : 'text-fg-subtle'
                }`}
              >
                {label}
              </span>
            </li>
          ))}
        </ol>
      </div>

      <ul className="mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-6 text-sm text-fg-muted">
        <li className="flex items-center gap-3">
          <Marker valet={false} lit /> Every booking
        </li>
        <li className="flex items-center gap-3">
          <Marker valet lit /> Only when you add a valet
        </li>
      </ul>
    </div>
  )
}
