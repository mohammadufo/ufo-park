import {
  IconBike,
  IconCar,
  IconMotorbike,
  IconTruck,
} from '@tabler/icons-react'
import { ReactNode } from 'react'
import { PasscodeDemo } from './PasscodeDemo'
import { wrap } from './shared'

const Tile = ({
  title,
  body,
  className = '',
  children,
  fill = false,
}: {
  title: string
  body: string
  className?: string
  children?: ReactNode
  /** Let the illustration grow to fill a tall tile. */
  fill?: boolean
}) => (
  <article
    className={`group relative flex flex-col overflow-hidden border border-line bg-surface transition-colors duration-300 hover:border-primary/40 ${className}`}
  >
    <div className="p-6 sm:p-7">
      <h3 className="font-display text-xl font-bold tracking-tight">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-fg-muted">
        {body}
      </p>
    </div>
    {children ? (
      <div className={`relative mt-auto ${fill ? 'flex flex-1 flex-col' : ''}`}>
        {children}
      </div>
    ) : null}
  </article>
)

/** A sign-shaped price tag, like the markers on the search map. */
const Pin = ({
  price,
  className = '',
  active = false,
}: {
  price: string
  className?: string
  active?: boolean
}) => (
  <div className={`absolute flex flex-col items-center ${className}`}>
    <div
      className={`flex items-center gap-1 px-1.5 py-1 text-xs font-bold leading-none ${
        active
          ? 'bg-primary text-black shadow-glow'
          : 'border border-line-strong bg-surface-raised text-fg'
      }`}
    >
      <span
        className={`flex h-4 w-4 items-center justify-center font-display text-[11px] font-black ${
          active ? 'bg-black text-primary' : 'bg-primary text-black'
        }`}
      >
        P
      </span>
      {price}
    </div>
    <span className={`h-2 w-0.5 ${active ? 'bg-primary' : 'bg-line-strong'}`} />
  </div>
)

const MapIllustration = () => (
  <div
    aria-hidden
    className="bg-blueprint relative min-h-[16rem] flex-1 border-t border-line"
  >
    {/* Streets */}
    <div className="absolute inset-x-0 top-[46%] h-5 bg-fg/[0.06]" />
    <div className="absolute inset-y-0 left-[38%] w-5 bg-fg/[0.06]" />
    <div className="absolute inset-y-0 left-[74%] w-3 bg-fg/[0.04]" />
    <div className="lane absolute inset-x-0 top-[calc(46%+9px)] opacity-60" />
    <Pin price="$4/h" className="left-[12%] top-[18%]" />
    <Pin price="$6/h" className="left-[52%] top-[14%]" />
    <Pin price="$3/h" className="left-[44%] top-[58%]" active />
    <Pin price="$5/h" className="left-[80%] top-[62%]" />
    {/* You are here */}
    <span className="absolute left-[30%] top-[66%] flex h-4 w-4 items-center justify-center">
      <span className="absolute h-8 w-8 animate-ping rounded-full bg-primary/25 motion-reduce:hidden" />
      <span className="h-3 w-3 rounded-full border-2 border-canvas bg-primary" />
    </span>
  </div>
)

const VEHICLES = [
  { label: 'Car', Icon: IconCar },
  { label: 'Heavy', Icon: IconTruck },
  { label: 'Bike', Icon: IconMotorbike },
  { label: 'Bicycle', Icon: IconBike },
]

const Vehicles = () => (
  <ul className="grid grid-cols-4 border-t border-line">
    {VEHICLES.map(({ label, Icon }) => (
      <li
        key={label}
        className="flex flex-col items-center gap-2 border-l border-line py-5 text-xs font-medium text-fg-muted first:border-l-0"
      >
        <Icon size={26} stroke={1.5} className="text-fg" />
        {label}
      </li>
    ))}
  </ul>
)

const Receipt = () => (
  <div className="border-t border-line px-6 pb-6 pt-5 sm:px-7">
    <div className="text-xs text-fg-subtle">Example booking, 3 hours</div>
    <dl className="mt-3 space-y-2 text-sm">
      {[
        ['Parking', '$12.00'],
        ['Valet pickup', '$4.50'],
        ['Valet drop-off', '$4.50'],
      ].map(([label, value]) => (
        <div key={label} className="flex justify-between text-fg-muted">
          <dt>{label}</dt>
          <dd className="font-display tabular-nums">{value}</dd>
        </div>
      ))}
      <div className="flex justify-between border-t border-dashed border-line-strong pt-2 font-semibold">
        <dt>Total</dt>
        <dd className="font-display text-lg tabular-nums text-primary">
          $21.00
        </dd>
      </div>
    </dl>
  </div>
)

const Route = () => (
  <div
    aria-hidden
    className="relative flex h-28 items-center justify-between border-t border-line px-8"
  >
    <div className="absolute inset-x-12 top-1/2 h-0.5 -translate-y-1/2">
      <div className="lane lane-primary h-0.5 w-full animate-lane-flow" />
    </div>
    {[
      { label: 'Pickup', mark: 'A' },
      { label: 'Garage', mark: 'P', garage: true },
      { label: 'Drop-off', mark: 'B' },
    ].map(({ label, mark, garage }) => (
      <div key={label} className="relative flex flex-col items-center gap-2">
        <span
          className={`flex h-9 w-9 items-center justify-center font-display text-sm font-black ${
            garage
              ? 'bg-primary text-black shadow-glow-sm'
              : 'border-2 border-primary bg-canvas text-primary'
          }`}
        >
          {mark}
        </span>
        <span className="text-xs text-fg-muted">{label}</span>
      </div>
    ))}
  </div>
)

export const Features = () => (
  <section className="relative border-t border-line bg-surface-sunken py-24 lg:py-32">
    <div className={wrap}>
      <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
        <h2 className="max-w-lg font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
          Made for the way you actually park
        </h2>
        <p className="max-w-md text-lg leading-relaxed text-fg-muted lg:justify-self-end">
          Everything between leaving home and walking away from your car, in one
          booking.
        </p>
      </div>

      <div className="mt-14 grid gap-4 lg:grid-cols-6">
        <Tile
          className="lg:col-span-4 lg:row-span-2"
          fill
          title="Availability on a live map"
          body="Search around any address and move the map freely. Garages show up with their hourly price for the times you picked, so the cheapest free slot stands out."
        >
          <MapIllustration />
        </Tile>
        <Tile
          className="lg:col-span-2"
          title="A slot for whatever you drive"
          body="Slots are listed by vehicle type and size, so a van never gets sent to a space built for a hatchback."
        >
          <Vehicles />
        </Tile>
        <Tile
          className="lg:col-span-2"
          title="Clear prices, secure checkout"
          body="You see the total before you pay. Payments are processed by Stripe."
        >
          <Receipt />
        </Tile>
        <Tile
          className="lg:col-span-3"
          title="Valet pickup and drop-off"
          body="Pick where the valet collects your car and where to bring it back. They deal with the garage; you keep your day."
        >
          <Route />
        </Tile>
        <Tile
          className="lg:col-span-3"
          title="Check in with a passcode"
          body="Every booking comes with a private passcode. Reveal it when you reach the garage; nobody else sees it."
        >
          <PasscodeDemo />
        </Tile>
      </div>
    </div>
  </section>
)
