import { Metadata } from 'next'
import Link from 'next/link'
import { buttonStyles } from '@ufopark/ui/src/components/atoms/Button'
import { SiteFooter } from '@ufopark/ui/src/components/organisms/SiteFooter'

export const metadata: Metadata = { title: 'Booking not completed' }

export default function Page() {
  return (
    <>
      <main className="bg-blueprint relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden">
        <div aria-hidden className="bg-lamp absolute inset-0" />
        <div className="container relative mx-auto px-4 py-20 sm:px-2">
          <div className="max-w-xl animate-fade-up">
            <div className="flex h-20 w-14 items-center justify-center border-2 border-b-0 border-dashed border-primary font-display text-3xl font-black text-primary">
              P
            </div>
            <h1 className="mt-8 font-display text-4xl font-black tracking-tight sm:text-5xl">
              Your booking wasn’t completed
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-fg-muted">
              The checkout was cancelled or the payment didn’t go through, so
              the slot wasn’t reserved. You can pick it again from the map.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/search" className={buttonStyles({ size: 'lg' })}>
                Back to the map
              </Link>
              <Link
                href="/bookings"
                className={buttonStyles({
                  size: 'lg',
                  variant: 'outlined',
                  color: 'black',
                })}
              >
                See my bookings
              </Link>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
