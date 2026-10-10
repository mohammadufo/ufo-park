import { ReactNode } from 'react'

export interface IPageHeaderProps {
  title: ReactNode
  description?: ReactNode
  children?: ReactNode
}

/** Title band at the top of content pages, lit from above like a garage entrance. */
export const PageHeader = ({
  title,
  description,
  children,
}: IPageHeaderProps) => (
  <header className="relative overflow-hidden border-b border-line">
    <div aria-hidden className="bg-lamp absolute inset-0" />
    <div aria-hidden className="bg-blueprint absolute inset-0 opacity-60" />
    <div className="container relative mx-auto flex flex-col gap-6 px-4 pb-10 pt-14 sm:px-2 md:flex-row md:items-end md:justify-between lg:pt-20">
      <div className="max-w-2xl animate-fade-up">
        <h1 className="font-display text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-fg-muted">
            {description}
          </p>
        ) : null}
      </div>
      {children}
    </div>
  </header>
)
