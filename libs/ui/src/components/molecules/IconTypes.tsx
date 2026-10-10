import { SlotType } from '@ufopark/network/src/gql/generated'
import {
  IconBike,
  IconMotorbike,
  IconCar,
  IconTir,
  IconMoonStars,
  IconSunset,
  IconSun,
  IconSunrise,
} from '@tabler/icons-react'

export const IconTypes = {
  [SlotType.Bicycle]: <IconBike className="w-6 h-6 " />,
  [SlotType.Bike]: <IconMotorbike className="w-6 h-6 " />,
  [SlotType.Car]: <IconCar className="w-6 h-6 " />,
  [SlotType.Heavy]: <IconTir className="w-6 h-6 " />,
}

export const IconType = ({
  time,
  className,
}: {
  time: string
  className?: string
}) => {
  const hour = new Date(time).getHours() // local hour
  const cls = `h-5 w-5 ${className ?? ''}`

  if (hour >= 4 && hour < 10) return <IconSunrise className={cls} />
  if (hour >= 10 && hour < 16) return <IconSun className={cls} />
  if (hour >= 16 && hour < 20) return <IconSunset className={cls} />
  return <IconMoonStars className={cls} />
}
