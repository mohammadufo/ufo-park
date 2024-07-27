import { SearchGaragesQuery } from '@ufopark/network/src/gql/generated'
import { useKeypress } from '@ufopark/util/hooks/keys'
import { useState } from 'react'
import { Marker } from '../map/MapMarker'
import { Dialog } from '../../atoms/Dialog'
import { ParkingIcon } from '../../atoms/ParkingIcon'
import { FormProviderBookSlot } from '@ufopark/forms/src/bookSlot'
import { useWatch } from 'react-hook-form'
import { FormTypeSearchGarage } from '@ufopark/forms/src/searchGarages'
import { BookSlotPopup } from '../BookSlotPopup'
// import { BookSlotPopup } from '../BookSlotPopup'

export const GarageMarker = ({
  marker,
}: {
  marker: SearchGaragesQuery['searchGarages'][number]
}) => {
  const [showPopup, setShowPopup] = useState(false)
  useKeypress(['Escape'], () => setShowPopup(false))

  const { endTime, startTime } = useWatch<FormTypeSearchGarage>()

  if (!marker.address?.lat || !marker.address.lng) {
    return null
  }

  return (
    <>
      <Dialog
        title="Booking"
        widthClassName="max-w-3xl"
        open={showPopup}
        setOpen={setShowPopup}
      >
        <FormProviderBookSlot defaultValues={{ endTime, startTime }}>
          <BookSlotPopup garage={marker} />
        </FormProviderBookSlot>
      </Dialog>

      <Marker
        latitude={marker.address.lat}
        longitude={marker.address.lng}
        onClick={(e) => {
          e.originalEvent.stopPropagation()
          setShowPopup((state) => !state)
        }}
      >
        <ParkingIcon />
      </Marker>
    </>
  )
}
