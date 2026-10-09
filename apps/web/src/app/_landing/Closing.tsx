import Link from 'next/link'
import { IconSearch } from '@tabler/icons-react'
import { BrandIcon } from '@ufopark/ui/src/components/atoms/BrandIcon'
import { focusRing, wrap } from './shared'

export const FinalCta = () => (
  <section className="bg-primary py-20 lg:py-28">
    <div
      className={`${wrap} flex flex-col items-start gap-10 md:flex-row md:items-end md:justify-between`}
    >
      <h2 className="flex flex-col items-start gap-2 text-5xl font-black leading-none tracking-tight text-primary sm:text-6xl">
        <span className="bg-black px-3 pb-2 pt-1">Stop circling.</span>
        <span className="bg-black px-3 pb-2 pt-1">Start parking.</span>
      </h2>
      <Link
        href="/search"
        className={`inline-flex items-center gap-2 bg-black px-6 py-4 text-lg font-semibold text-white transition-colors hover:bg-gray-700 focus-visible:outline-black ${focusRing}`}
      >
        <IconSearch size={22} stroke={2.25} />
        Search parking
      </Link>
    </div>
  </section>
)

const LINKS = [
  { label: 'Search parking', href: '/search' },
  { label: 'My bookings', href: '/bookings' },
  { label: 'About', href: '/about' },
  { label: 'Log in', href: '/login' },
  { label: 'Create an account', href: '/register' },
]

export const Footer = () => (
  <footer className="bg-black py-12 text-gray-200">
    <div
      className={`${wrap} flex flex-col gap-8 md:flex-row md:items-center md:justify-between`}
    >
      <div className="flex items-center gap-3 text-white">
        <BrandIcon />
        <span className="text-lg font-semibold tracking-tight">UFO Park</span>
      </div>
      <nav aria-label="Footer">
        <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
          {LINKS.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className={`hover:text-white hover:underline underline-offset-4 focus-visible:outline-primary ${focusRing}`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <p className="text-xs text-gray-400">
        © {new Date().getFullYear()} UFO Park
      </p>
    </div>
  </footer>
)
