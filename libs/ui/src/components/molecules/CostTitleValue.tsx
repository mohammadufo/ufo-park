import { ReactNode } from 'react'

export const CostTitleValue = ({
  title,
  price,
}: {
  title: string
  price: ReactNode
}) => {
  if (!price) return null
  return (
    <div className="flex justify-between text-fg-muted">
      <dt>{title}</dt>
      <dd className="font-display font-semibold tabular-nums text-fg">
        ${typeof price === 'number' ? price.toFixed(2) : price}
      </dd>
    </div>
  )
}
