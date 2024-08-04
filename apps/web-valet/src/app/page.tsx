'use client'
import { IsLoggedIn } from '@ufopark/ui/src/components/organisms/IsLoggedIn'
import { IsValet } from '@ufopark/ui/src/components/organisms/IsValet'
import { ValetHome } from '@ufopark/ui/src/components/templates/ValetHome'

export default function Home() {
  return (
    <main>
      <IsLoggedIn>
        {(uid) => (
          <IsValet uid={uid}>
            <ValetHome />
          </IsValet>
        )}
      </IsLoggedIn>
    </main>
  )
}
