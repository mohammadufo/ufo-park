'use client'
import { MenuItem } from '@ufopark/util/types'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export interface IMenuItemProps {
  menuItems: MenuItem[]
  /** Stacked, larger links for the side sheet. */
  vertical?: boolean
  onNavigate?: () => void
}

const isActive = (pathname: string, href: string) =>
  href === '/' ? pathname === '/' : pathname.startsWith(href)

export const Menus = ({ menuItems, vertical, onNavigate }: IMenuItemProps) => {
  const pathname = usePathname() || '/'

  return (
    <>
      {menuItems.map(({ label, href }) => {
        const active = isActive(pathname, href)
        return (
          <Link
            key={label}
            href={href}
            onClick={onNavigate}
            aria-current={active ? 'page' : undefined}
            className={
              vertical
                ? `flex w-full items-center justify-between border-l-2 px-4 py-3 font-display text-lg font-bold transition-colors ${
                    active
                      ? 'border-primary bg-primary/10 text-fg'
                      : 'border-transparent text-fg-muted hover:border-line-strong hover:text-fg'
                  }`
                : `relative px-3 py-2 text-sm font-medium transition-colors after:absolute after:inset-x-3 after:-bottom-[13px] after:h-[3px] after:bg-primary after:transition-transform after:duration-300 ${
                    active
                      ? 'text-fg after:scale-x-100'
                      : 'text-fg-muted after:scale-x-0 hover:text-fg'
                  }`
            }
          >
            {label}
          </Link>
        )
      })}
    </>
  )
}
