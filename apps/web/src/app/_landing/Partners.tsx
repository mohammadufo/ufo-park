import { IconBuildingWarehouse, IconSteeringWheel } from '@tabler/icons-react'
import { MANAGER_APP_URL, VALET_APP_URL, wrap } from './shared'

const AUDIENCES = [
  {
    Icon: IconBuildingWarehouse,
    title: 'For garage owners',
    body: 'Turn empty bays into bookings.',
    points: [
      'List your garage with its photos, address and a description.',
      'Add slots in bulk with their size, vehicle type and hourly price.',
      'Check cars in and out and see every booking in one place.',
    ],
    href: MANAGER_APP_URL,
    cta: 'Open the manager app',
  },
  {
    Icon: IconSteeringWheel,
    title: 'For valets',
    body: 'Pick up trips when it suits you.',
    points: [
      'See pickup and drop-off trips waiting near you.',
      'Take the trips that suit you and get directions to each car.',
      'Mark each handover so the customer’s timeline stays current.',
    ],
    href: VALET_APP_URL,
    cta: 'Open the valet app',
  },
]

export const Partners = () => (
  <section className="border-t border-line bg-surface-sunken py-24 lg:py-32">
    <div className={wrap}>
      <h2 className="max-w-2xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
        Have spaces to fill, or time to drive?
      </h2>

      <div className="mt-14 grid gap-4 md:grid-cols-2">
        {AUDIENCES.map(({ Icon, title, body, points, href, cta }) => (
          <div
            key={title}
            className="group relative border border-line bg-surface p-7 transition-colors duration-300 hover:border-primary/40 sm:p-9"
          >
            <span className="flex h-12 w-12 items-center justify-center bg-primary text-black">
              <Icon size={26} stroke={1.75} />
            </span>
            <h3 className="mt-6 font-display text-2xl font-bold tracking-tight">
              {title}
            </h3>
            <p className="mt-1 text-fg-muted">{body}</p>
            <ul className="mt-6 space-y-3 border-t border-line pt-6 leading-relaxed text-fg-muted">
              {points.map((point) => (
                <li key={point} className="flex gap-3">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-primary" />
                  {point}
                </li>
              ))}
            </ul>
            {href ? (
              <a
                href={href}
                className="mt-7 inline-block font-semibold underline decoration-primary decoration-2 underline-offset-8 transition-colors hover:text-primary"
              >
                {cta}
              </a>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  </section>
)
