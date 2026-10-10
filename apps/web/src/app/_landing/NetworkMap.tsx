import Link from 'next/link'
import {
  IconBike,
  IconCar,
  IconMotorbike,
  IconTruck,
} from '@tabler/icons-react'
import { buttonStyles } from '@ufopark/ui/src/components/atoms/Button'
import type { NetworkGarage, NetworkStats } from './network'
import { wrap } from './shared'

const TYPES = [
  { id: 'CAR', label: 'Car', Icon: IconCar },
  { id: 'HEAVY', label: 'Heavy', Icon: IconTruck },
  { id: 'BIKE', label: 'Bike', Icon: IconMotorbike },
  { id: 'BICYCLE', label: 'Bicycle', Icon: IconBike },
]

/** NYC borough from the ZIP code, otherwise the town in the address. */
const areaOf = (address: string) => {
  const zip = address.match(/\b(\d{5})\b/)?.[1]
  const prefix = zip?.slice(0, 3)
  if (prefix && ['100', '101', '102'].includes(prefix)) return 'Manhattan'
  if (prefix === '112') return 'Brooklyn'
  if (prefix === '104') return 'Bronx'
  if (prefix === '103') return 'Staten Island'
  if (prefix && ['110', '111', '113', '114', '116'].includes(prefix))
    return 'Queens'
  return address.split(',')[1]?.trim() || 'Other'
}

const W = 640
const H = 520
const PAD = 56

/** Equirectangular projection, longitudes squeezed by cos(latitude). */
const project = (garages: NetworkGarage[]) => {
  const lats = garages.map((g) => g.lat)
  const lngs = garages.map((g) => g.lng)
  const midLat = (Math.min(...lats) + Math.max(...lats)) / 2
  const k = Math.cos((midLat * Math.PI) / 180)
  const xs = lngs.map((lng) => lng * k)
  const [minX, maxX] = [Math.min(...xs), Math.max(...xs)]
  const [minY, maxY] = [Math.min(...lats), Math.max(...lats)]
  const spanX = Math.max(maxX - minX, 1e-6)
  const spanY = Math.max(maxY - minY, 1e-6)
  const scale = Math.min((W - PAD * 2) / spanX, (H - PAD * 2) / spanY)
  const offsetX = (W - spanX * scale) / 2
  const offsetY = (H - spanY * scale) / 2
  return garages.map((g, i) => ({
    ...g,
    x: offsetX + (xs[i] - minX) * scale,
    y: offsetY + (maxY - g.lat) * scale,
  }))
}

export const NetworkMap = ({ stats }: { stats: NetworkStats }) => {
  const points = project(stats.garages)

  const areas = new Map<string, { count: number; x: number; y: number }>()
  for (const point of points) {
    const name = areaOf(point.address)
    const area = areas.get(name) || { count: 0, x: 0, y: 0 }
    area.count += 1
    area.x += point.x
    area.y += point.y
    areas.set(name, area)
  }
  const areaList = Array.from(areas.entries())
    .map(([name, { count, x, y }]) => ({
      name,
      count,
      x: x / count,
      y: y / count,
    }))
    .sort((a, b) => b.count - a.count)

  const maxType = Math.max(...Object.values(stats.slotsByType), 1)

  return (
    <section className="relative overflow-hidden border-t border-line bg-canvas py-24 lg:py-32">
      <div className={wrap}>
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
          <h2 className="max-w-lg font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
            Parking you can book right now
          </h2>
          <p className="max-w-md text-lg leading-relaxed text-fg-muted lg:justify-self-end">
            Every garage listed on UFO Park at the moment, plotted where it
            stands. The numbers come straight from the live API.
          </p>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-[1.5fr_1fr]">
          <figure className="relative overflow-hidden border border-line bg-surface">
            <div aria-hidden className="bg-blueprint absolute inset-0" />
            <div aria-hidden className="bg-lamp absolute inset-0 opacity-70" />
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="relative block h-auto w-full"
              role="img"
              aria-label={`Map of ${points.length} garages`}
            >
              {areaList.map((area) => (
                <text
                  key={area.name}
                  x={area.x}
                  y={area.y - 26}
                  textAnchor="middle"
                  paintOrder="stroke"
                  strokeWidth={5}
                  strokeLinejoin="round"
                  className="fill-fg-muted stroke-surface font-display text-[13px] font-bold"
                >
                  {area.name}
                </text>
              ))}
              {points.map((point, i) => (
                <g key={point.id} className="group cursor-default">
                  <title>
                    {`${point.name}: ${point.slots} slots. ${point.address}`}
                  </title>
                  {/* Bigger invisible hit area than the dot itself */}
                  <circle cx={point.x} cy={point.y} r={16} fill="transparent" />
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={12}
                    className="animate-ping-slow fill-primary/25 motion-reduce:hidden"
                    style={{
                      animationDelay: `${(i * 370) % 2400}ms`,
                      transformOrigin: `${point.x}px ${point.y}px`,
                      transformBox: 'view-box',
                    }}
                  />
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={6}
                    className="fill-primary stroke-canvas transition-[r] duration-200 group-hover:[r:9]"
                    strokeWidth={2}
                  />
                  <g className="pointer-events-none opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                    <rect
                      x={point.x - (point.name.length * 7 + 24) / 2}
                      y={point.y - 50}
                      width={point.name.length * 7 + 24}
                      height={34}
                      className="fill-surface-raised stroke-line-strong"
                    />
                    <text
                      x={point.x}
                      y={point.y - 37}
                      textAnchor="middle"
                      className="fill-fg text-[12px] font-semibold"
                    >
                      {point.name}
                    </text>
                    <text
                      x={point.x}
                      y={point.y - 23}
                      textAnchor="middle"
                      className="fill-fg-muted text-[10px]"
                    >
                      {point.slots} slots
                    </text>
                  </g>
                </g>
              ))}
            </svg>
            <figcaption className="relative flex items-center gap-2 border-t border-line px-5 py-3 text-xs text-fg-muted">
              <span className="h-2.5 w-2.5 rounded-full bg-primary" /> One
              garage. Hover a dot for its name and slot count.
            </figcaption>
          </figure>

          <div className="flex flex-col gap-4">
            <dl className="grid grid-cols-2 gap-4">
              {[
                ['Garages', stats.garages.length],
                ['Parking slots', stats.totalSlots],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex flex-col-reverse border border-line bg-surface p-6"
                >
                  <dt className="mt-2 text-sm text-fg-muted">{label}</dt>
                  <dd className="font-display text-5xl font-black leading-none text-primary">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="border border-line bg-surface p-6">
              <h3 className="font-display text-lg font-bold">
                Slots by vehicle
              </h3>
              <ul className="mt-4 space-y-3">
                {TYPES.map(({ id, label, Icon }) => {
                  const count = stats.slotsByType[id] || 0
                  return (
                    <li
                      key={id}
                      className="grid grid-cols-[1.5rem_4.5rem_1fr_2.5rem] items-center gap-3 text-sm"
                    >
                      <Icon size={18} stroke={1.6} className="text-fg-muted" />
                      <span>{label}</span>
                      <span className="h-2 bg-line">
                        <span
                          className="block h-full bg-primary"
                          style={{ width: `${(count / maxType) * 100}%` }}
                        />
                      </span>
                      <span className="text-right font-display font-semibold tabular-nums">
                        {count}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="flex flex-1 flex-col border border-line bg-surface p-6">
              <h3 className="font-display text-lg font-bold">By area</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {areaList.map(({ name, count }) => (
                  <li
                    key={name}
                    className="flex items-center gap-2 border border-line-strong px-2.5 py-1.5 text-sm"
                  >
                    {name}
                    <span className="bg-primary px-1 font-display text-xs font-black text-black">
                      {count}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                href="/search"
                className={`${buttonStyles({ variant: 'outlined', color: 'black' })} mt-6 self-start`}
              >
                Open the map
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
