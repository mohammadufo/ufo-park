import { ReactNode } from 'react'

export interface IAlertSectionProps {
  title?: ReactNode
  children: ReactNode
}

export const AlertSection = ({ title, children }: IAlertSectionProps) => {
  return (
    <div className="bg-blueprint flex min-h-[18rem] flex-col items-center justify-center gap-4 border border-line bg-surface/50 px-6 py-12 text-center">
      {title ? (
        <div className="font-display text-xl font-extrabold">{title}</div>
      ) : null}
      <div className="flex flex-col items-center gap-3 text-sm text-fg-muted">
        {children}
      </div>
    </div>
  )
}
