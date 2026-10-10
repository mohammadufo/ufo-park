'use client'
import { useState } from 'react'

const DIGITS = ['4', '8', '2', '1', '9', '3']

/** Tap to reveal, the same way the real passcode works on a booking. */
export const PasscodeDemo = () => {
  const [revealed, setRevealed] = useState(false)

  return (
    <div className="flex items-center justify-between gap-4 border-t border-line px-6 py-6 sm:px-7">
      <button
        type="button"
        onClick={() => setRevealed((value) => !value)}
        aria-pressed={revealed}
        className="flex gap-1.5"
        aria-label={
          revealed ? 'Hide example passcode' : 'Reveal example passcode'
        }
      >
        {DIGITS.map((digit, i) => (
          <span
            key={i}
            className={`flex h-12 w-9 items-center justify-center border font-display text-2xl font-black transition-all duration-300 ${
              revealed
                ? 'border-primary bg-primary/10 text-fg'
                : 'bg-checker border-line-strong text-transparent opacity-40'
            }`}
            style={{ transitionDelay: `${i * 45}ms` }}
          >
            {digit}
          </span>
        ))}
      </button>
      <span className="text-xs text-fg-subtle">
        {revealed ? 'Example code' : 'Tap to reveal'}
      </span>
    </div>
  )
}
