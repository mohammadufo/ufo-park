import Link from 'next/link'
import { buttonStyles } from '@ufopark/ui/src/components/atoms/Button'

export default function NotFound() {
  return (
    <main className="bg-blueprint relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden">
      <div aria-hidden className="bg-lamp absolute inset-0" />
      <div className="container relative mx-auto px-4 py-20 sm:px-2">
        <p className="font-display text-8xl font-black leading-none text-primary sm:text-9xl">
          404
        </p>
        <h1 className="mt-6 font-display text-4xl font-black tracking-tight">
          Wrong turn
        </h1>
        <p className="mt-3 max-w-md text-lg text-fg-muted">
          There’s no page at this address. Let’s get you back on the road.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className={buttonStyles({ size: 'lg' })}>
            Go home
          </Link>
          <Link
            href="/search"
            className={buttonStyles({
              size: 'lg',
              variant: 'outlined',
              color: 'black',
            })}
          >
            Search parking
          </Link>
        </div>
      </div>
    </main>
  )
}
