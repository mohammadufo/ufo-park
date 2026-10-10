import Link from 'next/link'
import { Brand } from '../atoms/Brand'

const COLUMNS = [
  {
    title: 'Park',
    links: [
      { label: 'Search parking', href: '/search' },
      { label: 'My bookings', href: '/bookings' },
    ],
  },
  {
    title: 'Account',
    links: [
      { label: 'Log in', href: '/login' },
      { label: 'Create an account', href: '/register' },
    ],
  },
  {
    title: 'UFO Park',
    links: [{ label: 'About', href: '/about' }],
  },
]

export const SiteFooter = () => (
  <footer className="border-t border-line bg-surface-sunken">
    <div aria-hidden className="lane" />
    <div className="container mx-auto grid gap-10 px-4 py-14 sm:px-2 md:grid-cols-[1.4fr_repeat(3,1fr)]">
      <div className="max-w-xs">
        <Brand />
        <p className="mt-4 text-sm leading-relaxed text-fg-muted">
          Garage parking you book before you leave, with valets when you want
          them.
        </p>
      </div>
      {COLUMNS.map(({ title, links }) => (
        <nav key={title} aria-label={title}>
          <h2 className="font-display text-sm font-bold text-fg">{title}</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {links.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-fg-muted transition-colors hover:text-primary"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ))}
    </div>
    <div className="border-t border-line">
      <div className="container mx-auto flex flex-col gap-2 px-4 py-5 text-xs text-fg-subtle sm:flex-row sm:justify-between sm:px-2">
        <span>© {new Date().getFullYear()} UFO Park</span>
        <span>Built by Muhammad UFO</span>
      </div>
    </div>
  </footer>
)
