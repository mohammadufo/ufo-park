'use client'
import { IconMenu2 } from '@tabler/icons-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useDialogState } from '@ufopark/util/hooks/dialog'
import { MenuItem } from '@ufopark/util/types'
import { Sidebar } from './Sidebar'
import { LogoutButton } from '../molecules/LogoutButton'
import { UserInfo } from '../molecules/UserInfo'
import { Menus } from './Menus'

export interface INavSidebarProps {
  menuItems: MenuItem[]
}

export const NavSidebar = ({ menuItems }: INavSidebarProps) => {
  const [open, setOpen] = useDialogState()
  const { data } = useSession()
  const name = data?.user?.name || ''
  const image = data?.user?.image

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((state) => !state)}
        className="group flex items-center gap-2 border border-line-strong py-1 pl-1 pr-2 transition-colors hover:border-primary"
        aria-label="Open account menu"
      >
        {image ? (
          <Image
            src={image}
            alt=""
            width={56}
            height={56}
            className="h-7 w-7 object-cover"
          />
        ) : (
          <span className="flex h-7 w-7 items-center justify-center bg-primary font-display text-sm font-extrabold uppercase text-black">
            {name.slice(0, 1) || 'U'}
          </span>
        )}
        <IconMenu2 className="h-4 w-4 text-fg-muted transition-colors group-hover:text-fg" />
      </button>
      <Sidebar open={open} setOpen={setOpen} title="Account">
        <UserInfo className="mb-6" />
        <nav aria-label="Main" className="-mx-4 flex flex-col">
          <Menus
            vertical
            menuItems={menuItems}
            onNavigate={() => setOpen(false)}
          />
        </nav>
        <div className="mt-auto pt-6">
          <LogoutButton />
        </div>
      </Sidebar>
    </>
  )
}
