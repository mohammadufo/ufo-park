'use client'
import { ReactNode, useState } from 'react'
export interface IRevealProps {
  secret: ReactNode
  showIntruction?: boolean
  className?: string
}

export const Reveal = ({
  secret,
  showIntruction = false,
  className,
}: IRevealProps) => {
  const [revealed, setRevealed] = useState(false)

  return (
    <button
      type="button"
      aria-pressed={revealed}
      className={`flex flex-col items-start gap-1.5 ${className ?? ''}`}
      onClick={() => setRevealed((state) => !state)}
    >
      <span
        className={`w-full border px-2 py-1 font-display text-lg font-extrabold tracking-[0.2em] transition-colors duration-300 ${
          revealed
            ? 'border-primary bg-primary/10 text-fg'
            : 'bg-checker border-line-strong text-transparent opacity-50'
        }`}
      >
        {secret}
      </span>
      {showIntruction ? (
        <span className="text-xs text-fg-subtle">
          {revealed ? 'Hide' : 'Tap to reveal'}
        </span>
      ) : null}
    </button>
  )
}
