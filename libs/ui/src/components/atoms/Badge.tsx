import { ReactNode } from 'react'

export interface IBadgeProps {
  children: ReactNode
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'gray' | 'red' | 'yellow' | 'green'
  className?: string
}

const sizeCls = {
  sm: 'px-1.5 py-0.5 text-[11px]',
  md: 'px-2 py-1 text-xs',
  lg: 'px-2.5 py-1 text-sm',
}

const variantCls = {
  primary: 'bg-primary text-black',
  yellow: 'bg-primary/15 text-fg ring-1 ring-inset ring-primary/40',
  gray: 'bg-fg/10 text-fg-muted',
  red: 'bg-danger/15 text-danger',
  green: 'bg-success/15 text-success',
}

/** A small square plate, like the tag on a parking sign. */
export const Badge = ({
  children,
  size = 'md',
  variant = 'gray',
  className = '',
}: IBadgeProps) => (
  <span
    className={`inline-flex items-center gap-1 whitespace-nowrap font-semibold leading-none ${sizeCls[size]} ${variantCls[variant]} ${className}`}
  >
    {children}
  </span>
)
