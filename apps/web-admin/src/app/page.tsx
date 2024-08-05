import { IsAdmin } from '@ufopark/ui/src/components/organisms/IsAdmin'
import { AdminHome } from '@ufopark/ui/src/components/templates/AdminHome'

export default function Home() {
  return (
    <main>
      <IsAdmin>
        <AdminHome />
      </IsAdmin>
    </main>
  )
}
