import { ReactNode } from 'react'

export interface IBrandIconProps {
  children?: ReactNode
  className?: string
}

/** A parking bay with a little car easing into it. */
export const BrandIcon = ({
  children = <div className="h-4 w-2 bg-fg animate-park-car" />,
  className = '',
}: IBrandIconProps) => {
  return (
    <div className={`inline-block shrink-0 overflow-hidden ${className}`}>
      <div className="flex h-6 w-4 items-center justify-center border-2 border-primary">
        {children}
      </div>
    </div>
  )
}
