'use client'
import { BaseComponent, MenuItem, Role } from '@ufopark/util/types'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Brand } from '../atoms/Brand'
import { Container } from '../atoms/Container'
import { buttonStyles } from '../atoms/Button'
import { NavSidebar } from './NavSidebar'
import { Menus } from './Menus'

export type IHeaderProps = {
  type?: Role
  menuItems: MenuItem[]
} & BaseComponent

export const Header = ({ type, menuItems }: IHeaderProps) => {
  const { data, status } = useSession()
  const uid = data?.user?.uid

  return (
    <header>
      <nav className="glass fixed inset-x-0 top-0 z-40 border-x-0 border-t-0">
        <Container className="flex h-16 items-center justify-between gap-6 px-4">
          <Link href="/" aria-label="UFO Park home" className="shrink-0">
            <Brand type={type} className="hidden sm:flex" />
            <Brand type={type} shortForm className="sm:hidden" />
          </Link>

          {uid ? (
            <div className="flex items-center gap-3">
              <div className="hidden items-center md:flex">
                <Menus menuItems={menuItems} />
              </div>
              <NavSidebar menuItems={menuItems} />
            </div>
          ) : status === 'loading' ? (
            <div aria-hidden className="skeleton h-9 w-36" />
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/register"
                className={`${buttonStyles({
                  variant: 'text',
                  color: 'black',
                  size: 'sm',
                })} hidden sm:inline-flex`}
              >
                Create account
              </Link>
              <Link href="/login" className={buttonStyles({ size: 'sm' })}>
                Log in
              </Link>
            </div>
          )}
        </Container>
      </nav>
      <div className="h-16" />
    </header>
  )
}
