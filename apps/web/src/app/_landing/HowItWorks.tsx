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
  <section id="how-it-works" className="scroll-mt-16 bg-white py-24 lg:py-32">
    <div className={wrap}>
      <h2 className="max-w-xl text-4xl font-black leading-tight tracking-tight sm:text-5xl">
        From address to parked in three steps
      </h2>

      {/* Laid out like a row of parking bays along a curb */}
      <ol className="mt-14 grid border-t-4 border-black md:grid-cols-3">
        {STEPS.map(({ title, body }, i) => (
          <li
            key={title}
            className="border-gray-50 pt-8 pb-10 md:border-l-2 md:px-8 md:first:border-l-0 md:first:pl-0"
          >
            <span className="flex h-12 w-12 items-center justify-center bg-black text-xl font-black text-primary">
              {i + 1}
            </span>
            <h3 className="mt-6 text-xl font-bold tracking-tight">{title}</h3>
            <p className="mt-3 max-w-sm leading-relaxed text-gray-600">
              {body}
            </p>
          </li>
        ))}
      </ol>
    </div>
  </section>
)
