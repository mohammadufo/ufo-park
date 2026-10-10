import { SearchGaragesQuery } from '@ufopark/network/src/gql/generated'
import { useKeypress } from '@ufopark/util/hooks/keys'
import { useState } from 'react'
import { useWatch } from 'react-hook-form'
import { FormProviderBookSlot } from '@ufopark/forms/src/bookSlot'
import { FormTypeSearchGarage } from '@ufopark/forms/src/searchGarages'
import { Marker } from '../map/MapMarker'
import { Dialog } from '../../atoms/Dialog'
import { ParkingIcon } from '../../atoms/ParkingIcon'
import { BookSlotPopup } from '../BookSlotPopup'

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

  const prices = marker.availableSlots
    .map((slot) => slot.pricePerHour)
    .filter((price): price is number => typeof price === 'number')
  const lowestPrice = prices.length ? Math.min(...prices) : null

  return (
    <>
      <Dialog
        title={marker.displayName || 'Book a slot'}
        widthClassName="max-w-4xl"
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
        anchor="bottom"
        onClick={(e) => {
          e.originalEvent.stopPropagation()
          setShowPopup((state) => !state)
        }}
      >
        <ParkingIcon price={lowestPrice} active={showPopup} />
      </Marker>
    </>
  )
}
