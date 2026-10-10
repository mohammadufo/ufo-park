import { wrap } from './shared'

const STEPS = [
  {
    title: 'Search where you’re going',
    body: 'Enter an address and the times you’ll arrive and leave. The map only shows garages with a slot free for that whole window.',
  },
  {
    title: 'Book the slot that fits',
    body: 'Filter by vehicle type, price per hour and slot size. You see the total before you pay, and checkout runs through Stripe.',
  },
  {
    title: 'Drive in, or hand over the keys',
    body: 'Show your booking’s passcode at the garage. Or add a valet who picks your car up and brings it back where you choose.',
  },
]

export const HowItWorks = () => (
  <section id="how-it-works" className="scroll-mt-16 bg-canvas py-24 lg:py-32">
    <div className={wrap}>
      <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
        <h2 className="max-w-xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
          From address to parked in three steps
        </h2>
        <p className="max-w-md text-lg leading-relaxed text-fg-muted lg:justify-self-end">
          You can do all of it from the couch, before you pick up your keys.
        </p>
      </div>

      {/* Painted like a row of parking bays along a curb */}
      <ol className="mt-16 grid border-t-2 border-fg/20 md:grid-cols-3">
        {STEPS.map(({ title, body }, i) => (
          <li
            key={title}
            className="group relative border-l-2 border-fg/15 px-6 pb-12 pt-10 md:last:border-r-2"
          >
            <div
              aria-hidden
              className="bg-lamp pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
            <span className="relative block font-display text-7xl font-black leading-none text-primary">
              {i + 1}
            </span>
            <h3 className="relative mt-8 font-display text-xl font-bold tracking-tight">
              {title}
            </h3>
            <p className="relative mt-3 max-w-sm leading-relaxed text-fg-muted">
              {body}
            </p>
          </li>
        ))}
      </ol>
    </div>
  </section>
)
