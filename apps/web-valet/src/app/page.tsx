'use client'
import { IsLoggedIn } from '@ufopark/ui/src/components/organisms/IsLoggedIn'
import { IsValet } from '@ufopark/ui/src/components/organisms/IsValet'

export default function Home() {
  return (
    <main>
      <IsLoggedIn>
        {(uid) => <IsValet uid={uid}>Hello valet.</IsValet>}
      </IsLoggedIn>
    </main>
  )
}
