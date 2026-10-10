import { ReactNode } from 'react'

/** An empty parking bay: nothing parked here yet. */
export const NoResults = ({
  title = 'Nothing here yet',
  children,
}: {
  title?: ReactNode
  children?: ReactNode
}) => {
  return (
    <div className="bg-blueprint flex flex-col items-center justify-center gap-4 border border-line bg-surface/50 px-6 py-14 text-center">
      <div className="flex h-16 w-11 items-center justify-center border-2 border-b-0 border-dashed border-fg-subtle font-display text-xl font-extrabold text-fg-subtle">
        P
      </div>
      <div className="font-display text-lg font-extrabold">{title}</div>
      {children ? (
        <div className="max-w-sm text-sm text-fg-muted">{children}</div>
      ) : null}
    </div>
  )
}
