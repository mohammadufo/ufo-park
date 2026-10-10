import {
  IconBike,
  IconCar,
  IconCheck,
  IconLock,
  IconSearch,
  IconShieldCheck,
  IconTruck,
} from '@tabler/icons-react'
import { ReactNode } from 'react'

/**
 * Illustrations of the real app screens, drawn in HTML so they stay crisp
 * and on-brand. Prices and names are examples.
 */

const StatusBar = () => (
  <div className="flex items-center justify-between px-5 pb-2 pt-3 text-[10px] font-semibold text-fg-muted">
    <span>9:41</span>
    <span className="h-1.5 w-16 rounded-full bg-fg/15" />
    <span>5G</span>
  </div>
)

const Pin = ({
  price,
  className,
  active,
}: {
  price: string
  className: string
  active?: boolean
}) => (
  <div className={`absolute flex flex-col items-center ${className}`}>
    <div
      className={`flex items-center gap-1 p-0.5 text-[10px] font-bold leading-none ${
        active
          ? 'bg-black text-primary ring-2 ring-primary'
          : 'bg-primary text-black'
      }`}
    >
      <span
        className={`flex h-4 w-4 items-center justify-center font-display text-[10px] font-black ${
          active ? 'bg-primary text-black' : 'bg-black text-primary'
        }`}
      >
        P
      </span>
      <span className="pr-0.5">{price}</span>
    </div>
    <span className={`h-1.5 w-0.5 ${active ? 'bg-primary' : 'bg-black/70'}`} />
  </div>
)

const SearchScreen = () => (
  <div className="flex h-full flex-col">
    <div className="space-y-2 px-4">
      <div className="flex items-center gap-2 border border-line-strong bg-surface-sunken px-3 py-2 text-xs">
        <IconSearch size={14} className="text-fg-subtle" />
        Union Square, New York
      </div>
      <div className="grid grid-cols-2 gap-2 text-[11px]">
        {[
          ['Arrive', 'Today 09:00'],
          ['Leave', 'Today 13:30'],
        ].map(([label, value]) => (
          <div key={label} className="border border-line-strong px-2.5 py-1.5">
            <div className="text-fg-subtle">{label}</div>
            <div className="font-semibold">{value}</div>
          </div>
        ))}
      </div>
    </div>
    <div className="bg-blueprint relative mt-3 flex-1 overflow-hidden border-y border-line">
      <div className="absolute inset-x-0 top-[40%] h-4 bg-fg/[0.07]" />
      <div className="absolute inset-y-0 left-[35%] w-4 bg-fg/[0.07]" />
      <div className="absolute inset-y-0 left-[72%] w-2.5 bg-fg/[0.05]" />
      <Pin price="$18" className="left-[10%] top-[16%]" />
      <Pin price="$24" className="left-[54%] top-[10%]" />
      <Pin price="$15" className="left-[42%] top-[50%]" active />
      <Pin price="$21" className="left-[76%] top-[60%]" />
      <span className="absolute left-[24%] top-[66%] flex h-3 w-3">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/50 motion-reduce:hidden" />
        <span className="relative h-3 w-3 rounded-full border-2 border-canvas bg-primary" />
      </span>
    </div>
    <div className="m-4 flex items-center gap-2 border border-line-strong bg-surface-raised px-3 py-2 text-[11px] text-fg-muted">
      <span className="bg-primary px-1 font-display font-black text-black">
        4
      </span>
      garages with free slots in view
    </div>
  </div>
)

const PickScreen = () => (
  <div className="flex h-full flex-col px-4">
    <div className="bg-blueprint -mx-4 h-24 border-b border-line" />
    <div className="-mt-6 border border-line-strong bg-surface-raised p-3 shadow-panel">
      <div className="flex items-start justify-between gap-2">
        <div className="font-display text-sm font-extrabold">
          14th Street Garage
        </div>
        <span className="flex items-center gap-0.5 bg-success/15 px-1 py-0.5 text-[9px] font-bold text-success">
          <IconShieldCheck size={10} /> Verified
        </span>
      </div>
      <div className="mt-1 text-[10px] text-fg-muted">
        Union Square, New York
      </div>
      <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-2 border border-line bg-surface-sunken p-2">
        <div>
          <div className="font-display text-base font-extrabold leading-none">
            09:00
          </div>
          <div className="text-[9px] text-fg-subtle">Arrive</div>
        </div>
        <div className="text-center text-[9px] font-semibold text-fg-muted">
          <div className="lane lane-primary mx-auto mb-1 w-8" />4 h 30 min
        </div>
        <div className="text-right">
          <div className="font-display text-base font-extrabold leading-none">
            13:30
          </div>
          <div className="text-[9px] text-fg-subtle">Leave</div>
        </div>
      </div>
    </div>
    <div className="mt-4 text-[11px] font-semibold text-fg-muted">
      Slot type
    </div>
    <div className="mt-2 grid grid-cols-2 gap-2">
      {[
        { Icon: IconCar, price: '$18', open: '6 open', active: true },
        { Icon: IconBike, price: '$4', open: '3 open' },
        { Icon: IconTruck, price: '$34', open: '2 open' },
      ].map(({ Icon, price, open, active }) => (
        <div
          key={price}
          className={`flex items-center gap-2 border p-2 ${
            active
              ? 'border-primary bg-primary/10 shadow-glow-sm'
              : 'border-line-strong'
          }`}
        >
          <Icon
            size={18}
            className={active ? 'text-primary' : 'text-fg-muted'}
          />
          <div>
            <div className="font-display text-sm font-extrabold leading-none">
              {price}
              <span className="text-[9px] text-fg-muted">/hr</span>
            </div>
            <div className="text-[9px] text-fg-subtle">{open}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
)

const PayScreen = () => (
  <div className="flex h-full flex-col px-4 pt-2">
    <div className="font-display text-lg font-extrabold">Your total</div>
    <div className="mt-1 text-[11px] text-fg-muted">
      Car slot, 4 h 30 min, with a valet
    </div>
    <dl className="mt-5 space-y-2 border border-line bg-surface-sunken p-3 text-xs">
      {[
        ['Parking', '$81.00'],
        ['Valet pickup', '$6.00'],
        ['Valet drop-off', '$6.00'],
      ].map(([label, value]) => (
        <div key={label} className="flex justify-between text-fg-muted">
          <dt>{label}</dt>
          <dd className="font-display font-semibold text-fg">{value}</dd>
        </div>
      ))}
      <div className="flex items-baseline justify-between border-t border-dashed border-line-strong pt-2">
        <dt className="font-semibold">Total</dt>
        <dd className="font-display text-2xl font-black text-primary">
          $93.00
        </dd>
      </div>
    </dl>
    <div className="mt-4 flex h-10 items-center justify-center gap-2 bg-primary text-xs font-bold text-black shadow-glow-sm">
      <IconLock size={14} /> Book and pay
    </div>
    <div className="mt-2 text-center text-[10px] text-fg-subtle">
      Secure checkout by Stripe
    </div>
    <div className="mt-auto mb-5 flex items-center gap-2 border border-success/40 bg-success/10 p-2.5 text-[11px] text-success">
      <span className="flex h-5 w-5 items-center justify-center bg-success text-black">
        <IconCheck size={14} />
      </span>
      Payment received. The slot is yours.
    </div>
  </div>
)

const ParkScreen = () => (
  <div className="flex h-full flex-col px-4 pt-2">
    <div className="text-[11px] text-fg-muted">Passcode</div>
    <div className="mt-2 flex gap-1.5">
      {'482193'.split('').map((digit, i) => (
        <span
          key={i}
          className="flex h-11 flex-1 items-center justify-center border border-primary bg-primary/10 font-display text-xl font-black"
        >
          {digit}
        </span>
      ))}
    </div>
    <div className="mt-6 text-[11px] text-fg-muted">Timeline</div>
    <ol className="relative ml-1.5 mt-3 space-y-4 border-l border-dashed border-line-strong pl-5 text-xs">
      {[
        ['Booked', '08:12', true],
        ['Valet assigned', '08:40', true],
        ['Picked up', '08:52', true],
        ['Checked in', '09:06', 'now'],
        ['Returned to you', 'later', false],
      ].map(([label, time, state]) => (
        <li key={label as string} className="relative">
          <span
            className={`absolute -left-[25px] top-0.5 h-2 w-2 ${
              state === 'now'
                ? 'bg-primary shadow-glow-sm'
                : state
                  ? 'bg-primary/60'
                  : 'border border-line-strong bg-canvas'
            }`}
          />
          <div
            className={`flex justify-between ${
              state ? 'text-fg' : 'text-fg-subtle'
            } ${state === 'now' ? 'font-semibold' : ''}`}
          >
            <span>{label}</span>
            <span className="text-fg-subtle">{time}</span>
          </div>
        </li>
      ))}
    </ol>
  </div>
)

export const SCREENS: Array<() => ReactNode> = [
  SearchScreen,
  PickScreen,
  PayScreen,
  ParkScreen,
]

export const Phone = ({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) => (
  <div
    className={`relative h-[600px] w-[290px] shrink-0 rounded-[2.6rem] border border-line-strong bg-black p-2.5 shadow-[0_40px_120px_-40px_rgb(var(--primary-rgb)/0.35)] ${className}`}
  >
    <div className="relative flex h-full flex-col overflow-hidden rounded-[2.1rem] bg-canvas text-fg">
      <StatusBar />
      <div className="relative flex-1">{children}</div>
    </div>
  </div>
)
