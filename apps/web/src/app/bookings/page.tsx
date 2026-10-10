import { Metadata } from 'next'
import Link from 'next/link'
import { IconSearch } from '@tabler/icons-react'
import { ListCustomerBookings } from '@ufopark/ui/src/components/templates/ListCustomerBookings'
import { IsLoggedIn } from '@ufopark/ui/src/components/organisms/IsLoggedIn'
import { PageHeader } from '@ufopark/ui/src/components/organisms/PageHeader'
import { SiteFooter } from '@ufopark/ui/src/components/organisms/SiteFooter'
import { buttonStyles } from '@ufopark/ui/src/components/atoms/Button'

export const metadata: Metadata = { title: 'Your bookings' }

export default function Page() {
  return (
    <>
      <main className="min-h-[calc(100svh-4rem)]">
        <PageHeader
          title="Your bookings"
          description="Upcoming and past parking, with the passcode and live status of each car."
        >
          <Link href="/search" className={buttonStyles({ size: 'lg' })}>
            <IconSearch size={20} stroke={2.25} /> Book another slot
          </Link>
        </PageHeader>
        <div className="container mx-auto px-4 py-10 sm:px-2">
          <IsLoggedIn>
            <ListCustomerBookings />
          </IsLoggedIn>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
