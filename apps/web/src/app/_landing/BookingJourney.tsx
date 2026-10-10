import { JourneyTrack } from './JourneyTrack'
import { wrap } from './shared'

export const BookingJourney = () => (
  <section className="relative overflow-hidden border-t border-line bg-canvas py-24 lg:py-32">
    <div aria-hidden className="bg-lamp absolute inset-0" />
    <div className={`${wrap} relative`}>
      <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
        <h2 className="max-w-lg font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
          Follow your car from booking to return
        </h2>
        <p className="max-w-md text-lg leading-relaxed text-fg-muted lg:justify-self-end">
          Each booking keeps its own timeline. Garage staff and valets update it
          as your car moves, so you always know who has it and where.
        </p>
      </div>
      <JourneyTrack />
    </div>
  </section>
)
