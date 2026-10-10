'use client'
import { ReactNode } from 'react'
import { useSession } from 'next-auth/react'
import { LoaderPanel } from '../molecules/Loader'
import { AlertSection } from '../molecules/AlertSection'
import Link from 'next/link'
import { buttonStyles } from '../atoms/Button'

type RenderPropChild = (uid: string) => ReactNode

export const IsLoggedIn = ({
  children,
  notLoggedIn,
}: {
  children: RenderPropChild | ReactNode
  notLoggedIn?: ReactNode
}) => {
  const { status, data } = useSession()

  if (status === 'loading') {
    return <LoaderPanel />
  }

  if (!data?.user?.uid) {
    if (notLoggedIn) {
      return <>{notLoggedIn}</>
    } else {
      return (
        <AlertSection title="Log in to continue">
          <span>This page needs your account.</span>
          <div className="mt-2 flex gap-2">
            <Link href="/login" className={buttonStyles()}>
              Log in
            </Link>
            <Link
              href="/register"
              className={buttonStyles({ variant: 'outlined', color: 'black' })}
            >
              Create an account
            </Link>
          </div>
        </AlertSection>
      )
    }
  }

  return (
    <>
      {typeof children === 'function'
        ? (children as RenderPropChild)(data.user.uid)
        : children}
    </>
  )
}
