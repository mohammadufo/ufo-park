import { IconBuildingWarehouse, IconRoute } from '@tabler/icons-react'
import { MANAGER_APP_URL, VALET_APP_URL, focusRing, wrap } from './shared'

const AUDIENCES = [
  {
    Icon: IconBuildingWarehouse,
    title: 'For garage owners',
    points: [
      'List your garage with its photos, address and a description.',
      'Add slots in bulk with their size, vehicle type and hourly price.',
      'Check cars in and out and see every booking in one place.',
    ],
    href: MANAGER_APP_URL,
    cta: 'Open the manager app',
  },
  {
    Icon: IconRoute,
    title: 'For valets',
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
  <section className="bg-white py-24 lg:py-32">
    <div className={wrap}>
      <h2 className="max-w-2xl text-4xl font-black leading-tight tracking-tight sm:text-5xl">
        Have spaces to fill, or time to drive?
      </h2>

      <div className="mt-14 grid gap-12 md:grid-cols-2 md:gap-16">
        {AUDIENCES.map(({ Icon, title, points, href, cta }) => (
          <div key={title} className="border-l-4 border-primary pl-6">
            <Icon size={28} stroke={1.5} />
            <h3 className="mt-4 text-2xl font-bold tracking-tight">{title}</h3>
            <ul className="mt-5 space-y-3 leading-relaxed text-gray-600">
              {points.map((point) => (
                <li key={point} className="flex gap-3">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-black" />
                  {point}
                </li>
              ))}
            </ul>
            {href ? (
              <a
                href={href}
                className={`mt-6 inline-block font-semibold underline decoration-primary decoration-4 underline-offset-8 hover:decoration-black ${focusRing}`}
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
