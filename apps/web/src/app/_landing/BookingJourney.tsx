import { wrap } from './shared'

/** Mirrors the BookingStatus values a booking moves through. */
const STOPS = [
  { label: 'Booked', valet: false },
  { label: 'Valet assigned', valet: true },
  { label: 'Picked up', valet: true },
  { label: 'Checked in', valet: false },
  { label: 'Valet assigned', valet: true },
  { label: 'Checked out', valet: false },
  { label: 'Returned to you', valet: true },
]

const Marker = ({ valet }: { valet: boolean }) => (
  <span
    className={`relative z-10 block h-4 w-4 shrink-0 border-2 border-primary ${
      valet ? 'bg-gray-900' : 'bg-primary'
    }`}
  />
)

export const BookingJourney = () => (
  <section className="bg-gray-900 py-24 text-white lg:py-32">
    <div className={wrap}>
      <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
        <h2 className="max-w-lg text-4xl font-black leading-tight tracking-tight sm:text-5xl">
          Follow your car from booking to return
        </h2>
        <p className="max-w-md leading-relaxed text-gray-200 lg:justify-self-end">
          Each booking keeps its own timeline. Garage staff and valets update it
          as your car moves, so you always know who has it and where.
        </p>
      </div>

      {/* A lane with a stop for every status */}
      <div className="relative mt-16">
        <span
          aria-hidden
          className="absolute left-[7px] top-2 bottom-2 border-l-2 border-dashed border-white/25 lg:left-0 lg:right-0 lg:top-[7px] lg:bottom-auto lg:border-l-0 lg:border-t-2"
        />
        <ol className="relative grid gap-6 lg:grid-cols-7 lg:gap-0">
          {STOPS.map(({ label, valet }, i) => (
            <li
              key={i}
              className="flex items-center gap-4 lg:flex-col lg:items-start lg:gap-5 lg:pr-4"
            >
              <Marker valet={valet} />
              <span
                className={`text-sm font-medium ${
                  valet ? 'text-gray-200' : 'text-white'
                }`}
              >
                {label}
              </span>
            </li>
          ))}
        </ol>
      </div>

      <ul className="mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-6 text-sm text-gray-200">
        <li className="flex items-center gap-3">
          <Marker valet={false} /> Every booking
        </li>
        <li className="flex items-center gap-3">
          <Marker valet /> Only when you add a valet
        </li>
      </ul>
    </div>
  </section>
)
