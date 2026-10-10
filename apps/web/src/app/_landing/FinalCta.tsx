import Link from 'next/link'
import { IconSearch } from '@tabler/icons-react'
import { wrap } from './shared'

export const FinalCta = () => (
  <section className="relative overflow-hidden bg-primary py-20 text-black lg:py-28">
    {/* Hatched curb paint along the top edge */}
    <div
      aria-hidden
      className="absolute inset-x-0 top-0 h-2 bg-[repeating-linear-gradient(135deg,#000_0_12px,transparent_12px_24px)] opacity-80"
    />
    <div
      className={`${wrap} flex flex-col items-start gap-10 md:flex-row md:items-end md:justify-between`}
    >
      <h2 className="flex flex-col items-start gap-2 font-display text-5xl font-black leading-[0.95] tracking-tight text-primary sm:text-6xl">
        <span className="bg-black px-3 pb-1.5 pt-2.5">Stop circling.</span>
        <span className="bg-black px-3 pb-1.5 pt-2.5">Start parking.</span>
      </h2>
      <Link
        href="/search"
        className="inline-flex h-14 items-center gap-2 bg-black px-7 text-lg font-semibold text-white transition-colors hover:bg-gray-700 focus-visible:outline-black"
      >
        <IconSearch size={22} stroke={2.25} />
        Search parking
      </Link>
    </div>
  </section>
)
