import { BaseComponent } from '@ufopark/util/types'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

export const UserInfo = ({ children, className = '' }: BaseComponent) => {
  const session = useSession()
  const image = session.data?.user?.image
  const name = session.data?.user?.name
  const uid = session.data?.user?.uid
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {image ? (
        <Image
          src={image}
          alt=""
          width={112}
          height={112}
          className="h-14 w-14 border border-line-strong object-cover"
        />
      ) : (
        <span className="flex h-14 w-14 shrink-0 items-center justify-center bg-primary font-display text-2xl font-extrabold uppercase text-black">
          {name?.slice(0, 1) || 'U'}
        </span>
      )}
      <div className="min-w-0">
        <div className="truncate font-semibold">{name || 'Signed in'}</div>
        <div className="truncate text-xs text-fg-subtle">{uid}</div>
      </div>
      {children}
    </div>
  )
}
