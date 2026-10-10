import Link from 'next/link'
import { IconSearch } from '@tabler/icons-react'
import { buttonStyles } from '@ufopark/ui/src/components/atoms/Button'
import { HeroScene } from './HeroScene'
import { ScrollCue } from './ScrollCue'
import { wrap } from './shared'
import type { NetworkStats } from './network'

export const Hero = ({ stats }: { stats?: NetworkStats | null }) => (
  <section className="relative isolate h-[calc(100svh-4rem)] min-h-[38rem] overflow-hidden bg-canvas">
    <HeroScene />

    {/* Keeps the copy readable over the moving city */}
    <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-canvas/90 via-canvas/20 to-canvas/80 lg:bg-gradient-to-r lg:from-canvas/90 lg:via-canvas/30 lg:to-transparent" />
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-t from-canvas to-transparent" />

    <div
      // Lets drags on empty space and on the copy reach the 3D scene below.
      className={`${wrap} pointer-events-none relative z-20 flex h-full flex-col justify-start pt-12 md:justify-center md:pt-0`}
    >
      {stats ? (
        <p className="glass mb-6 inline-flex animate-fade-up items-center gap-2.5 self-start px-3 py-1.5 text-xs font-medium text-fg-muted">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75 motion-reduce:hidden" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
          </span>
          <span>
            <span className="font-semibold text-fg">
              {stats.garages.length} garages
            </span>{' '}
            and{' '}
            <span className="font-semibold text-fg">
              {stats.totalSlots} slots
            </span>{' '}
            bookable right now
          </span>
        </p>
      ) : null}
      <h1 className="flex animate-fade-up flex-col items-start gap-2 font-display text-6xl font-black leading-[0.95] tracking-tight text-black sm:text-7xl lg:text-8xl">
        <span className="bg-primary px-3 pb-1.5 pt-2.5 shadow-glow">Need</span>
        <span className="bg-primary px-3 pb-1.5 pt-2.5 shadow-glow">
          parking?
        </span>
      </h1>

      <p className="mt-7 max-w-md animate-fade-up text-lg leading-relaxed text-fg-muted [animation-delay:120ms]">
        Book a garage slot near where you&apos;re going, for exactly the hours
        you need. Drive straight in, or have a valet park it for you.
      </p>

      <div className="pointer-events-auto mt-9 flex animate-fade-up flex-wrap items-center gap-3 self-start [animation-delay:220ms]">
        <Link href="/search" className={buttonStyles({ size: 'lg' })}>
          <IconSearch size={20} stroke={2.25} />
          Search parking
        </Link>
        <a
          href="#how-it-works"
          className={buttonStyles({
            size: 'lg',
            variant: 'outlined',
            color: 'black',
          })}
        >
          How it works
        </a>
      </div>
    </div>

    <ScrollCue targetId="how-it-works" />

    {/* Legend for the scene behind the copy */}
    <div
      className={`${wrap} pointer-events-none absolute inset-x-0 bottom-0 z-20 pb-6 md:hidden lg:block`}
    >
      <ul className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-fg-muted">
        <li className="flex items-center gap-2">
          <span className="h-2.5 w-5 bg-primary" />
          Your car, looking for a spot
        </li>
        <li className="flex items-center gap-2">
          <span className="h-2.5 w-5 border-2 border-primary" />A free spot,
          found for you
        </li>
        <li className="hidden items-center gap-2 xl:flex">
          <span className="h-2.5 w-5 border border-primary-700 bg-primary-900" />
          Partner garage
        </li>
      </ul>
    </div>
  </section>
)
