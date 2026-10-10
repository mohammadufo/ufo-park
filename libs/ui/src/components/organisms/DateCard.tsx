import { differenceInTime, getTimeUnits } from '@ufopark/util/date'
import { format } from 'date-fns'

export interface IDateCardProps {
  startTime: string
  endTime: string
}

export const StartEndDateCard = ({ startTime, endTime }: IDateCardProps) => {
  const duration = getTimeUnits(
    differenceInTime({ startTime, endTime, unit: 'seconds' }),
  ).timeString
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 border border-line bg-surface-sunken px-4 py-3">
      <DateCard dateTime={startTime} />
      <div className="flex flex-col items-center gap-1">
        <div className="lane lane-primary w-10" />
        <div className="whitespace-nowrap text-xs font-semibold text-fg-muted">
          {duration}
        </div>
      </div>
      <DateCard dateTime={endTime} justify="right" />
    </div>
  )
}

export const DateCard = ({
  dateTime,
  justify = 'left',
}: {
  dateTime: string
  justify?: 'left' | 'right'
}) => (
  <div
    className={`flex flex-col ${justify === 'left' ? 'items-start' : 'items-end'}`}
  >
    <div className="font-display text-xl font-extrabold leading-none">
      {format(new Date(dateTime), 'HH:mm')}
    </div>
    <div className="mt-1 text-xs text-fg-muted">
      {format(new Date(dateTime), 'd MMM yyyy')}
    </div>
  </div>
)
