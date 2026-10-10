'use client'
import { ReactNode } from 'react'

/**
 * Tracks the pointer over any child marked `data-spotlight` and exposes its
 * position as --spot-x / --spot-y, so the tile can light up under the cursor.
 */
export const SpotlightGroup = ({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) => (
  <div
    className={className}
    onPointerMove={(event) => {
      const tile = (event.target as HTMLElement).closest<HTMLElement>(
        '[data-spotlight]',
      )
      if (!tile) return
      const rect = tile.getBoundingClientRect()
      tile.style.setProperty('--spot-x', `${event.clientX - rect.left}px`)
      tile.style.setProperty('--spot-y', `${event.clientY - rect.top}px`)
    }}
  >
    {children}
  </div>
)

/** The light itself; place it as the first child of a `group` tile. */
export const SpotlightGlow = () => (
  <div
    aria-hidden
    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
    style={{
      background:
        'radial-gradient(420px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgb(var(--primary-rgb) / 0.10), transparent 65%)',
    }}
  />
)
