import Link from 'next/link'
import { IconSearch } from '@tabler/icons-react'
import { HeroScene } from './HeroScene'
import { focusRing, wrap } from './shared'

export const Hero = () => (
  <section className="relative isolate h-[calc(100svh-4rem)] min-h-[36rem] overflow-hidden bg-gray-900 text-white">
    <HeroScene />

    {/* Keeps the copy readable over the moving city */}
    <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/80 via-black/20 to-black/70 lg:bg-gradient-to-r lg:from-black/80 lg:via-black/30 lg:to-transparent" />

    <div
      // Lets drags on empty space and on the copy reach the 3D scene below.
      className={`${wrap} pointer-events-none relative z-20 flex h-full flex-col justify-start pt-12 md:justify-center md:pt-0`}
    >
      <h1 className="flex flex-col items-start gap-2 text-6xl font-black leading-none tracking-tight text-black sm:text-7xl lg:text-8xl">
        <span className="bg-primary px-3 pb-2 pt-1">Need</span>
        <span className="bg-primary px-3 pb-2 pt-1">parking?</span>
      </h1>

      <p className="mt-6 max-w-md text-lg leading-relaxed text-gray-50">
        Book a garage slot near where you&apos;re going, for exactly the hours
        you need. Drive straight in, or have a valet park it for you.
      </p>

      <div className="pointer-events-auto mt-8 flex flex-wrap items-center gap-3 self-start">
        <Link
          href="/search"
          className={`inline-flex items-center gap-2 bg-primary px-5 py-3 font-semibold text-black transition-colors hover:bg-primary-300 focus-visible:outline-primary ${focusRing}`}
        >
          <IconSearch size={20} stroke={2.25} />
          Search parking
        </Link>
        <a
          href="#how-it-works"
          className={`border-2 border-white/30 px-5 py-2.5 font-medium text-white transition-colors hover:border-white focus-visible:outline-white ${focusRing}`}
        >
          How it works
        </a>
      </div>
    </div>

    {/* Legend for the scene behind the copy */}
    <div
      className={`${wrap} pointer-events-none absolute inset-x-0 bottom-0 z-20 pb-6`}
    >
      <ul className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-100">
        <li className="flex items-center gap-2">
          <span className="h-2.5 w-5 bg-primary" />
          Your car, looking for a spot
        </li>
        <li className="flex items-center gap-2">
          <span className="h-2.5 w-5 border-2 border-primary" />A free spot,
          found for you
        </li>
        <li className="hidden items-center gap-2 sm:flex">
          <span className="h-2.5 w-5 border border-primary-700 bg-primary-900" />
          Partner garage
        </li>
      </ul>
    </div>
  </section>
)
