import Link from 'next/link'
import { IconPlus } from '@tabler/icons-react'
import { VALET_CHARGE_PER_METER } from '@ufopark/util/constants'
import { wrap } from './shared'

const perKm = (VALET_CHARGE_PER_METER * 1000).toFixed(0)

const QUESTIONS = [
  {
    q: 'Do I need an account to book?',
    a: 'Yes. Your bookings, passcodes and timelines live in your account, so you can find them on any device. You can sign up with an email and password, or continue with Google.',
  },
  {
    q: 'How is the price worked out?',
    a: `The slot’s hourly price times the hours you book, rounded down to the dollar. If you add a valet, each trip, pickup and drop-off, costs $${perKm} per km of driving between the garage and your point. You see the full total before you pay.`,
  },
  {
    q: 'How do I get into the garage?',
    a: 'Every booking gets a private six-digit passcode. Open My bookings, tap to reveal it and show it at the garage.',
  },
  {
    q: 'What does the valet actually do?',
    a: 'You drop a pin where the valet should collect your car and, if you like, a different pin for where to bring it back. A valet picks it up, parks it in your slot and returns it. Each step shows up on the booking’s timeline.',
  },
  {
    q: 'Which vehicles can I park?',
    a: 'Cars, heavy vehicles, motorbikes and bicycles. Slots also list their width, height and length, so you can filter out spaces your vehicle won’t fit.',
  },
  {
    q: 'Is paying safe?',
    a: 'Payment happens on Stripe’s hosted checkout. Your card details go to Stripe, not to UFO Park.',
  },
  {
    q: 'Where can I park with UFO Park?',
    a: 'Wherever garages are listed. Today the map is filled with garages around New York, and any garage owner can add theirs from the manager app.',
  },
  {
    q: 'I run a garage. How do I list it?',
    a: 'Sign in to the manager app, create your company, then add the garage with its address and photos. Slots can be added in bulk with their type, size and hourly price.',
  },
]

export const Faq = () => (
  <section className="border-t border-line bg-canvas py-24 lg:py-32">
    <div className={`${wrap} grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20`}>
      <div className="lg:sticky lg:top-28 lg:self-start">
        <h2 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
          Questions, answered
        </h2>
        <p className="mt-5 max-w-sm text-lg leading-relaxed text-fg-muted">
          The short version of how booking, paying and parking work.
        </p>
        <Link
          href="/about"
          className="mt-6 inline-block font-semibold underline decoration-primary decoration-2 underline-offset-8 transition-colors hover:text-primary"
        >
          More about UFO Park
        </Link>
      </div>

      <div className="border-t border-line">
        {QUESTIONS.map(({ q, a }) => (
          <details
            key={q}
            className="group border-b border-line [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-display text-lg font-bold transition-colors hover:text-primary sm:text-xl">
              {q}
              <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-line-strong transition-all duration-300 group-open:rotate-45 group-open:border-primary group-open:bg-primary group-open:text-black">
                <IconPlus size={16} stroke={2.25} />
              </span>
            </summary>
            <p className="max-w-2xl pb-7 pr-12 leading-relaxed text-fg-muted">
              {a}
            </p>
          </details>
        ))}
      </div>
    </div>
  </section>
)
