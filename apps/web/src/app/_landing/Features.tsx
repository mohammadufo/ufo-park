import {
  IconBike,
  IconCar,
  IconCreditCard,
  IconKey,
  IconMapSearch,
  IconMotorbike,
  IconParking,
  IconSteeringWheel,
  IconTruck,
} from '@tabler/icons-react'
import { ReactNode } from 'react'
import { wrap } from './shared'

const VEHICLES = [
  { label: 'Car', Icon: IconCar },
  { label: 'Heavy', Icon: IconTruck },
  { label: 'Bike', Icon: IconMotorbike },
  { label: 'Bicycle', Icon: IconBike },
]

const FEATURES: Array<{
  Icon: typeof IconCar
  title: string
  body: string
  extra?: ReactNode
}> = [
  {
    Icon: IconMapSearch,
    title: 'Availability on a live map',
    body: 'Search around any address and move the map freely. Garages show up with their slots and hourly prices for the times you picked.',
  },
  {
    Icon: IconParking,
    title: 'A slot for whatever you drive',
    body: 'Slots are listed by vehicle type and size, so a van never gets sent to a space built for a hatchback.',
    extra: (
      <ul className="mt-4 flex flex-wrap gap-2">
        {VEHICLES.map(({ label, Icon }) => (
          <li
            key={label}
            className="flex items-center gap-1.5 border border-gray-100 bg-white px-2.5 py-1 text-sm font-medium"
          >
            <Icon size={16} stroke={1.75} />
            {label}
          </li>
        ))}
      </ul>
    ),
  },
  {
    Icon: IconCreditCard,
    title: 'Clear prices, secure checkout',
    body: 'The total — hours booked plus any valet charges — is shown before you pay. Payments are processed by Stripe.',
  },
  {
    Icon: IconSteeringWheel,
    title: 'Valet pickup and drop-off',
    body: 'Pick where the valet should collect your car and where to bring it back. They handle the garage; you keep your day.',
  },
  {
    Icon: IconKey,
    title: 'Check in with a passcode',
    body: 'Every booking comes with a private passcode. Tap to reveal it when you reach the garage, and nobody else sees it.',
  },
]

export const Features = () => (
  <section className="bg-gray-25 py-24 lg:py-32">
    <div className={`${wrap} grid gap-12 lg:grid-cols-[2fr_3fr] lg:gap-20`}>
      <div className="lg:sticky lg:top-28 lg:self-start">
        <h2 className="max-w-md text-4xl font-black leading-tight tracking-tight sm:text-5xl">
          Made for the way you actually park
        </h2>
        <p className="mt-5 max-w-sm text-lg leading-relaxed text-gray-600">
          Everything between leaving home and walking away from your car, in one
          booking.
        </p>
      </div>

      <dl className="divide-y divide-gray-50 border-y border-gray-50">
        {FEATURES.map(({ Icon, title, body, extra }) => (
          <div key={title} className="grid grid-cols-[auto_1fr] gap-5 py-8">
            <dt className="contents">
              <span className="flex h-11 w-11 items-center justify-center border-2 border-black bg-primary">
                <Icon size={22} stroke={1.75} />
              </span>
              <span className="self-center text-xl font-bold tracking-tight">
                {title}
              </span>
            </dt>
            <dd className="col-start-2 -mt-2 max-w-lg leading-relaxed text-gray-600">
              {body}
              {extra}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  </section>
)
