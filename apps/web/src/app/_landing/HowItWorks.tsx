'use client'
import { useEffect, useRef, useState } from 'react'
import { Phone, SCREENS } from './PhoneScreens'
import { wrap } from './shared'

const STEPS = [
  {
    title: 'Search where you’re going',
    body: 'Type an address or move the map, then set when you’ll arrive and leave. Only garages with a slot free for that whole window show up, each with its hourly price on the pin.',
  },
  {
    title: 'Pick the slot that fits',
    body: 'Compare slot types, prices and sizes side by side. A van never gets sent to a space built for a hatchback.',
  },
  {
    title: 'Pay once, before you leave',
    body: 'See the full total, valet trips included, then pay on Stripe’s secure checkout. The moment it goes through, the slot is yours.',
  },
  {
    title: 'Drive in, or hand over the keys',
    body: 'Show your six-digit passcode at the garage. Or let a valet collect the car and bring it back, and watch every handover land on the booking’s timeline.',
  },
]

/**
 * Scroll-told walkthrough: the steps scroll past on the left while a phone
 * stays pinned on the right and swaps to the screen for the step in view.
 */
export const HowItWorks = () => {
  const [active, setActive] = useState(0)
  const steps = useRef<Array<HTMLLIElement | null>>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.step))
          }
        }
      },
      // A thin band across the middle of the viewport decides the step.
      { rootMargin: '-45% 0px -45% 0px' },
    )
    steps.current.forEach((step) => step && observer.observe(step))
    return () => observer.disconnect()
  }, [])

  const Screen = SCREENS[active]

  return (
    <section
      id="how-it-works"
      className="scroll-mt-16 overflow-x-clip bg-canvas py-24 lg:py-32"
    >
      <div className={wrap}>
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
          <h2 className="max-w-xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
            From address to parked in four steps
          </h2>
          <p className="max-w-md text-lg leading-relaxed text-fg-muted lg:justify-self-end">
            All of it happens on your phone, before you pick up your keys.
          </p>
        </div>

        <div className="mt-16 grid gap-16 lg:grid-cols-[1fr_auto] lg:gap-24">
          <ol className="relative">
            {/* Progress rail */}
            <span
              aria-hidden
              className="absolute bottom-0 left-[1.4rem] top-0 hidden w-0.5 bg-line lg:block"
            />
            <span
              aria-hidden
              className="absolute left-[1.4rem] top-0 hidden w-0.5 bg-primary transition-[height] duration-500 ease-out lg:block"
              style={{ height: `${((active + 1) / STEPS.length) * 100}%` }}
            />
            {STEPS.map(({ title, body }, i) => {
              const StepScreen = SCREENS[i]
              const current = i === active
              return (
                <li
                  key={title}
                  data-step={i}
                  ref={(element) => {
                    steps.current[i] = element
                  }}
                  className="relative flex flex-col gap-8 pb-16 lg:min-h-[70vh] lg:justify-center lg:pb-0 lg:pl-20"
                >
                  <div className="flex items-start gap-5 lg:block">
                    <span
                      className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center font-display text-xl font-black transition-all duration-500 lg:absolute lg:left-0 lg:top-1/2 lg:-translate-y-1/2 ${
                        current
                          ? 'bg-primary text-black shadow-glow'
                          : 'border-2 border-line-strong bg-canvas text-fg-subtle'
                      }`}
                    >
                      {i + 1}
                    </span>
                    <div
                      className={`max-w-md transition-opacity duration-500 ${
                        current ? 'lg:opacity-100' : 'lg:opacity-35'
                      }`}
                    >
                      <h3 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
                        {title}
                      </h3>
                      <p className="mt-3 text-lg leading-relaxed text-fg-muted">
                        {body}
                      </p>
                    </div>
                  </div>
                  {/* Small screens: each step brings its own phone */}
                  <div className="flex justify-center lg:hidden">
                    <Phone className="scale-[0.88] origin-top -mb-16">
                      <StepScreen />
                    </Phone>
                  </div>
                </li>
              )
            })}
          </ol>

          <div className="hidden lg:block">
            <div className="sticky top-[calc(50vh-300px+2rem)]">
              <div
                aria-hidden
                className="bg-lamp absolute -inset-24 -z-10 opacity-80"
              />
              <Phone>
                <div key={active} className="h-full animate-screen-in">
                  <Screen />
                </div>
              </Phone>
              <div className="mt-6 flex justify-center gap-2" aria-hidden>
                {STEPS.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1 transition-all duration-500 ${
                      i === active ? 'w-8 bg-primary' : 'w-3 bg-line-strong'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
