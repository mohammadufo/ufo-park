import { ListCustomerBookings } from '@ufopark/ui/src/components/templates/ListCustomerBookings'
import { IsLoggedIn } from '@ufopark/ui/src/components/organisms/IsLoggedIn'

function page() {
  return (
    <IsLoggedIn>
      <ListCustomerBookings />
    </IsLoggedIn>
  )
}

export default page
