import { useEffect, useState } from 'react'

import {
  differenceInTime,
  formatDate,
  formatTime,
  getTimeUnits,
} from '@ufopark/util/date'

export interface IDateRangeBookingInfoProps {
  startTime?: string
  endTime?: string
}

export const DateRangeBookingInfo = ({
  startTime,
  endTime,
}: IDateRangeBookingInfoProps) => {
  const [duration, setDuration] = useState<string | null>(null)

  useEffect(() => {
    if (!startTime || !endTime) return
    const differenceInMilliseconds = differenceInTime({
      startTime,
      endTime,
    })

    if (differenceInMilliseconds < 0) {
      setDuration('Invalid date range')
      return
    }

    setDuration(getTimeUnits(differenceInMilliseconds).timeString)
  }, [startTime, endTime])

  if (!startTime || !endTime) return null

  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 border border-line bg-surface-sunken p-4">
      <div>
        <div className="text-xs text-fg-subtle">Arrive</div>
        <div className="mt-1 font-display text-2xl font-extrabold leading-none">
          {formatTime(startTime)}
        </div>
        <div className="mt-1 text-xs text-fg-muted">
          {formatDate(startTime)}
        </div>
      </div>
      <div className="flex flex-col items-center gap-1.5">
        <div className="lane lane-primary w-12" />
        <div className="whitespace-nowrap text-xs font-semibold text-fg-muted">
          {duration ? duration : 'Select dates'}
        </div>
      </div>
      <div className="text-right">
        <div className="text-xs text-fg-subtle">Leave</div>
        <div className="mt-1 font-display text-2xl font-extrabold leading-none">
          {formatTime(endTime)}
        </div>
        <div className="mt-1 text-xs text-fg-muted">{formatDate(endTime)}</div>
      </div>
    </div>
  )
}
