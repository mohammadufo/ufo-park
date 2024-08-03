import { ManageValets } from '@ufopark/ui/src/components/templates/ManageValets'
import { IsLoggedIn } from '@ufopark/ui/src/components/organisms/IsLoggedIn'

export default function Page() {
  return (
    <IsLoggedIn>
      <ManageValets />
    </IsLoggedIn>
  )
}
