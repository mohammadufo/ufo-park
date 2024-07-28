'use client'
import { IsLoggedIn } from '@ufopark/ui/src/components/organisms/IsLoggedIn'
import { IsManager } from '@ufopark/ui/src/components/organisms/IsManager'

export default function Home() {
  return (
    <IsLoggedIn>
      <IsManager>Hello Manager</IsManager>
    </IsLoggedIn>
  )
}
