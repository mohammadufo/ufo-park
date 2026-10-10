'use client'
import { CarScene } from '@ufopark/3d/src/scenes/CarScene'
import { RotatingCamera } from '@ufopark/3d/src/components/camera/Rotating'
import { IconArrowLeft } from '@tabler/icons-react'
import Link from 'next/link'
import { ReactNode } from 'react'
import { BrandIcon } from '../atoms/BrandIcon'
import { GoogleButton } from './GoogleButton'

export interface IAuthLayoutProps {
  children: ReactNode
  title: string
  subtitle?: ReactNode
}

export const AuthLayout = ({ title, subtitle, children }: IAuthLayoutProps) => {
  return (
    <div className="relative isolate min-h-[calc(100svh-4rem)] overflow-hidden bg-black">
      <div aria-hidden className="absolute inset-0">
        <CarScene
          orbitControls={false}
          camera={<RotatingCamera />}
          hideAllComments
        />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30 md:bg-gradient-to-r md:from-black/85 md:via-black/40 md:to-transparent"
      />

      <div className="container relative z-10 mx-auto flex min-h-[calc(100svh-4rem)] items-center px-4 py-10 sm:px-2">
        <div className="glass w-full max-w-md animate-fade-up shadow-panel">
          <div className="h-0.5 bg-primary" />
          <div className="p-6 sm:p-8">
            <BrandIcon />
            <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight">
              {title}
            </h1>
            {subtitle ? (
              <p className="mt-1.5 text-sm text-fg-muted">{subtitle}</p>
            ) : null}

            <div className="mt-7">{children}</div>

            <div className="my-6 flex items-center gap-3 text-xs text-fg-subtle">
              <span className="h-px flex-1 bg-line-strong" />
              or
              <span className="h-px flex-1 bg-line-strong" />
            </div>
            <GoogleButton />
          </div>
          <div className="border-t border-line px-6 py-4 sm:px-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
            >
              <IconArrowLeft className="h-4 w-4" /> Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
