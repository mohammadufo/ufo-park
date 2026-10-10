'use client'
import Link from 'next/link'
import { useId, useState } from 'react'
import {
  IconBike,
  IconCar,
  IconMotorbike,
  IconSearch,
  IconTruck,
} from '@tabler/icons-react'
import { VALET_CHARGE_PER_METER } from '@ufopark/util/constants'
import { buttonStyles } from '@ufopark/ui/src/components/atoms/Button'
import { wrap } from './shared'

// Example hourly prices, inside the ranges the demo garages use.
const VEHICLES = [
  { id: 'CAR', label: 'Car', Icon: IconCar, rate: 18 },
  { id: 'HEAVY', label: 'Heavy', Icon: IconTruck, rate: 36 },
  { id: 'BIKE', label: 'Bike', Icon: IconMotorbike, rate: 7 },
  { id: 'BICYCLE', label: 'Bicycle', Icon: IconBike, rate: 3 },
]

const formatHours = (hours: number) => {
  const whole = Math.floor(hours)
  const minutes = Math.round((hours - whole) * 60)
  return minutes ? `${whole} h ${minutes} min` : `${whole} h`
}

const money = (value: number) => `$${value.toFixed(2)}`

const Slider = ({
  label,
  value,
  min,
  max,
  step,
  onChange,
  display,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (value: number) => void
  display: string
}) => {
  const id = useId()
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label htmlFor={id} className="text-sm font-semibold text-fg-muted">
          {label}
        </label>
        <span className="font-display text-lg font-extrabold">{display}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-3 w-full cursor-pointer accent-primary"
      />
    </div>
  )
}

/**
 * Same arithmetic as the booking form: hourly price times hours, rounded
 * down, plus valet trips charged per metre driven.
 */
export const PriceSimulator = () => {
  const [vehicle, setVehicle] = useState(VEHICLES[0])
  const [hours, setHours] = useState(4.5)
  const [valet, setValet] = useState(true)
  const [km, setKm] = useState(1.2)

  const parking = Math.floor(vehicle.rate * hours)
  const trip = valet ? Math.floor(km * 1000 * VALET_CHARGE_PER_METER) : 0
  const total = parking + trip * 2

  return (
    <section className="relative overflow-hidden border-t border-line bg-surface-sunken py-24 lg:py-32">
      <div className={wrap}>
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
          <h2 className="max-w-lg font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
            Run the numbers before you book
          </h2>
          <p className="max-w-md text-lg leading-relaxed text-fg-muted lg:justify-self-end">
            Play with a booking and watch the total add up the same way it does
            at checkout. Rates here are examples; every garage sets its own.
          </p>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-[1fr_1.1fr]">
          {/* Controls */}
          <div className="space-y-9 border border-line bg-surface p-6 sm:p-8">
            <fieldset>
              <legend className="text-sm font-semibold text-fg-muted">
                What are you parking?
              </legend>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {VEHICLES.map((option) => {
                  const selected = option.id === vehicle.id
                  return (
                    <button
                      key={option.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setVehicle(option)}
                      className={`flex flex-col items-center gap-1.5 border px-2 py-3 transition-all duration-200 ${
                        selected
                          ? 'border-primary bg-primary/10 shadow-glow-sm'
                          : 'border-line-strong hover:border-fg-subtle'
                      }`}
                    >
                      <option.Icon
                        size={26}
                        stroke={1.6}
                        className={selected ? 'text-primary' : 'text-fg-muted'}
                      />
                      <span className="text-sm font-semibold">
                        {option.label}
                      </span>
                      <span className="text-xs text-fg-subtle">
                        ${option.rate}/hr
                      </span>
                    </button>
                  )
                })}
              </div>
            </fieldset>

            <Slider
              label="How long?"
              value={hours}
              min={1}
              max={12}
              step={0.5}
              onChange={setHours}
              display={formatHours(hours)}
            />

            <div className="space-y-5 border-t border-line pt-7">
              <button
                type="button"
                role="switch"
                aria-checked={valet}
                onClick={() => setValet((on) => !on)}
                className="flex w-full items-center justify-between gap-4 text-left"
              >
                <span>
                  <span className="block font-semibold">Add a valet</span>
                  <span className="block text-sm text-fg-muted">
                    They collect the car and bring it back.
                  </span>
                </span>
                <span
                  className={`relative inline-flex h-6 w-11 shrink-0 items-center border transition-colors ${
                    valet
                      ? 'border-primary bg-primary'
                      : 'border-line-strong bg-surface-sunken'
                  }`}
                >
                  <span
                    className={`h-4 w-4 transition-transform ${
                      valet
                        ? 'translate-x-[22px] bg-black'
                        : 'translate-x-1 bg-fg-subtle'
                    }`}
                  />
                </span>
              </button>
              {valet ? (
                <Slider
                  label="Distance from you to the garage"
                  value={km}
                  min={0.2}
                  max={10}
                  step={0.1}
                  onChange={setKm}
                  display={`${km.toFixed(1)} km`}
                />
              ) : null}
            </div>
          </div>

          {/* Result */}
          <div className="flex flex-col border border-line bg-surface">
            {/* A row of bays: one is free, and your vehicle takes it */}
            <div
              aria-hidden
              className="bg-blueprint grid grid-cols-6 gap-0 border-b border-line px-6 pt-8"
            >
              {Array.from({ length: 6 }, (_, i) => (
                <div
                  key={i}
                  className={`flex h-24 items-end justify-center border-x border-t-2 border-fg/15 pb-3 ${
                    i === 3 ? 'border-t-primary bg-primary/[0.06]' : ''
                  }`}
                >
                  {i === 3 ? (
                    <vehicle.Icon
                      key={vehicle.id}
                      size={30}
                      stroke={1.6}
                      className="animate-screen-in text-primary"
                    />
                  ) : (
                    <span
                      className={`block w-6 bg-fg/15 ${
                        i % 2 ? 'h-10' : 'h-12'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            <dl className="flex-1 space-y-3 p-6 text-sm sm:p-8">
              <div className="flex justify-between text-fg-muted">
                <dt>
                  Parking, {formatHours(hours)} at ${vehicle.rate}/hr
                </dt>
                <dd className="font-display font-semibold tabular-nums text-fg">
                  {money(parking)}
                </dd>
              </div>
              <div
                className={`flex justify-between transition-opacity ${
                  valet ? 'text-fg-muted' : 'text-fg-subtle opacity-50'
                }`}
              >
                <dt>Valet pickup</dt>
                <dd className="font-display font-semibold tabular-nums">
                  {money(trip)}
                </dd>
              </div>
              <div
                className={`flex justify-between transition-opacity ${
                  valet ? 'text-fg-muted' : 'text-fg-subtle opacity-50'
                }`}
              >
                <dt>Valet drop-off</dt>
                <dd className="font-display font-semibold tabular-nums">
                  {money(trip)}
                </dd>
              </div>
              <div className="flex items-end justify-between border-t border-dashed border-line-strong pt-5">
                <dt className="pb-2 font-semibold">Total</dt>
                <dd
                  className="font-display text-6xl font-black leading-none tabular-nums text-primary"
                  aria-live="polite"
                >
                  {money(total)}
                </dd>
              </div>
            </dl>

            <div className="flex flex-col gap-4 border-t border-line p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <p className="max-w-xs text-xs leading-relaxed text-fg-subtle">
                Parking is the hourly rate times your hours, rounded down to the
                dollar. Each valet trip costs $
                {(VALET_CHARGE_PER_METER * 1000).toFixed(0)} per km driven.
              </p>
              <Link href="/search" className={buttonStyles({ size: 'lg' })}>
                <IconSearch size={20} stroke={2.25} />
                Find a real slot
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
