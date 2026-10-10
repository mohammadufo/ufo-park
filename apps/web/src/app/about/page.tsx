import { Metadata } from 'next'
import Link from 'next/link'
import {
  IconBuildingWarehouse,
  IconCar,
  IconSteeringWheel,
} from '@tabler/icons-react'
import { PageHeader } from '@ufopark/ui/src/components/organisms/PageHeader'
import { SiteFooter } from '@ufopark/ui/src/components/organisms/SiteFooter'
import { buttonStyles } from '@ufopark/ui/src/components/atoms/Button'

export const metadata: Metadata = {
  title: 'About',
  description:
    'UFO Park connects drivers with garages that have free slots, and with valets who can park the car for them.',
}

const SIDES = [
  {
    Icon: IconCar,
    title: 'Drivers',
    body: 'Search a map for garages with a free slot for the hours you need, book it, and pay before you leave home. Add a valet if you’d rather not park yourself.',
  },
  {
    Icon: IconBuildingWarehouse,
    title: 'Garage owners',
    body: 'List a garage, add its slots with their size, vehicle type and hourly price, and run check-ins and check-outs from the manager app.',
  },
  {
    Icon: IconSteeringWheel,
    title: 'Valets',
    body: 'Pick up trips from the valet app, get directions to each car, and update the booking at every handover.',
  },
]

const STACK = [
  ['Web apps', 'Next.js and React, styled with Tailwind CSS'],
  ['API', 'NestJS with GraphQL'],
  ['Data', 'PostgreSQL through Prisma'],
  ['Maps and routes', 'Mapbox'],
  ['Payments', 'Stripe Checkout'],
  ['The 3D city', 'three.js with React Three Fiber'],
]

export default function Page() {
  return (
    <>
      <main>
        <PageHeader
          title="Parking that’s sorted before you set off"
          description="UFO Park connects drivers with garages that have free slots, and with valets who can park the car for them."
        />

        <section className="container mx-auto px-4 py-16 sm:px-2 lg:py-24">
          <h2 className="font-display text-3xl font-extrabold tracking-tight">
            One booking, three sides
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {SIDES.map(({ Icon, title, body }) => (
              <div key={title} className="border border-line bg-surface p-7">
                <span className="flex h-11 w-11 items-center justify-center bg-primary text-black">
                  <Icon size={24} stroke={1.75} />
                </span>
                <h3 className="mt-5 font-display text-xl font-bold">{title}</h3>
                <p className="mt-2 leading-relaxed text-fg-muted">{body}</p>
              </div>
            ))}
          </div>
        </section>

        <div aria-hidden className="lane" />

        <section className="container mx-auto grid gap-10 px-4 py-16 sm:px-2 lg:grid-cols-[1fr_1.4fr] lg:py-24">
          <div>
            <h2 className="font-display text-3xl font-extrabold tracking-tight">
              How it’s built
            </h2>
            <p className="mt-4 max-w-md leading-relaxed text-fg-muted">
              UFO Park is a monorepo with four web apps (drivers, garage
              managers, valets and admins) sharing one component library and one
              API.
            </p>
          </div>
          <dl className="divide-y divide-line border-y border-line">
            {STACK.map(([label, value]) => (
              <div
                key={label}
                className="grid grid-cols-[10rem_1fr] gap-4 py-4 text-sm sm:grid-cols-[12rem_1fr]"
              >
                <dt className="font-semibold">{label}</dt>
                <dd className="text-fg-muted">{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="border-t border-line bg-surface-sunken">
          <div className="container mx-auto flex flex-col items-start justify-between gap-6 px-4 py-14 sm:px-2 md:flex-row md:items-center">
            <h2 className="font-display text-3xl font-extrabold tracking-tight">
              Ready to find a spot?
            </h2>
            <Link href="/search" className={buttonStyles({ size: 'lg' })}>
              Search parking
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
