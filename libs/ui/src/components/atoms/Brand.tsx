import { Role } from '@ufopark/util/types'
import { BrandIcon } from './BrandIcon'

export interface IBrandProps {
  className?: string
  shortForm?: boolean
  type?: Role
}

export const Brand = ({
  shortForm = false,
  className = '',
  type = undefined,
}: IBrandProps) => {
  return (
    <div className={`z-50 flex items-center gap-2.5 ${className}`}>
      <BrandIcon />
      <span className="font-display text-lg font-extrabold leading-none tracking-tight text-fg">
        {shortForm ? 'UFO' : 'UFO Park'}
      </span>
      {type ? (
        <span className="bg-primary px-1.5 py-0.5 text-[10px] font-bold capitalize leading-none text-black">
          {type}
        </span>
      ) : null}
    </div>
  )
}
