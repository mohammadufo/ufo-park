import { ReactNode } from 'react'

export type Role = 'admin' | 'manager' | 'valet'

export type BaseComponent = {
  children?: ReactNode
  className?: string
}

export type MenuItem = { label: string; href: string }

export type ViewState = {
  latitude: number
  longitude: number
  zoom?: number
}
