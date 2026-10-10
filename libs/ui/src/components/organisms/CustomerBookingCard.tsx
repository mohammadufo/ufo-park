import {
  BookingStatus,
  BookingsForCustomerQuery,
} from '@ufopark/network/src/gql/generated'
import { format } from 'date-fns'
import { IconExternalLink } from '@tabler/icons-react'
import { StartEndDateCard } from './DateCard'
import { MapLink } from '../molecules/MapLink'
import { StaticMapSimple } from './map/StaticMapSimple'
import { Reveal } from '../molecules/Reveal'
import { Accordion } from '../atoms/Accordion'
import { Badge, IBadgeProps } from '../atoms/Badge'

export interface IBookingCardProps {
  booking: NonNullable<BookingsForCustomerQuery['bookingsForCustomer']>[number]
}

export const statusLabel = (status: string) => {
  const text = status.split('_').join(' ').toLowerCase()
  return text.charAt(0).toUpperCase() + text.slice(1)
}

const statusVariant: Record<string, IBadgeProps['variant']> = {
  [BookingStatus.Booked]: 'primary',
  [BookingStatus.ValetAssignedForCheckIn]: 'yellow',
  [BookingStatus.ValetPickedUp]: 'yellow',
  [BookingStatus.CheckedIn]: 'green',
  [BookingStatus.ValetAssignedForCheckOut]: 'yellow',
  [BookingStatus.CheckedOut]: 'gray',
  [BookingStatus.ValetReturned]: 'gray',
}

export const CustomerBookingCard = ({ booking }: IBookingCardProps) => {
  const lat = booking.slot.garage.address?.lat || 0
  const lng = booking.slot.garage.address?.lng || 0

  return (
    <article className="flex flex-col border border-line bg-surface transition-colors duration-300 hover:border-primary/40">
      <MapLink
        waypoints={[{ lat, lng }]}
        className="group relative block overflow-hidden border-b border-line"
      >
        <StaticMapSimple
          variant="dark"
          position={{ lat, lng }}
          className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute left-3 top-3">
          <Badge variant={statusVariant[booking.status] || 'gray'}>
            {statusLabel(booking.status)}
          </Badge>
        </span>
        <span className="glass absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 text-xs text-fg-muted opacity-0 transition-opacity group-hover:opacity-100">
          Directions <IconExternalLink className="h-3.5 w-3.5" />
        </span>
      </MapLink>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <h3 className="font-display text-lg font-extrabold leading-tight">
            {booking.slot.displayName || 'Parking slot'}
          </h3>
          <p className="mt-1 text-sm text-fg-muted">
            {booking.slot.garage.address?.address}
          </p>
        </div>

        <StartEndDateCard
          startTime={booking.startTime}
          endTime={booking.endTime}
        />

        <dl className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-xs text-fg-subtle">Vehicle</dt>
            <dd className="mt-1.5 inline-block border border-line-strong px-2 py-1 font-display font-bold uppercase tracking-wider">
              {booking.vehicleNumber}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-fg-subtle">Passcode</dt>
            <dd className="mt-1.5">
              <Reveal secret={booking.passcode || ''} showIntruction />
            </dd>
          </div>
        </dl>

        <div className="mt-auto border-t border-line">
          <Accordion
            title={<span className="text-sm font-semibold">Timeline</span>}
          >
            <ol className="relative ml-1.5 space-y-4 border-l border-dashed border-line-strong pl-5">
              {booking.bookingTimeline.map((timeline) => (
                <li key={timeline.timestamp} className="relative">
                  <span className="absolute -left-[25px] top-1 h-2 w-2 bg-primary" />
                  <div className="font-medium text-fg">
                    {statusLabel(timeline.status)}
                  </div>
                  <div className="text-xs text-fg-subtle">
                    {format(new Date(timeline.timestamp), 'PPp')}
                  </div>
                </li>
              ))}
            </ol>
          </Accordion>
        </div>
      </div>
    </article>
  )
}
