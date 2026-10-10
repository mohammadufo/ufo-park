import { SearchGaragesQuery } from '@ufopark/network/src/gql/generated'
import { useState } from 'react'
import { toast } from '../molecules/Toast'
import { useFormContext, useWatch } from 'react-hook-form'
import { FormTypeBookSlot } from '@ufopark/forms/src/bookSlot'
import { Switch } from '../atoms/Switch'
import { Marker } from './map/MapMarker'
import { Map } from './map/Map'
import { ParkingIcon } from '../atoms/ParkingIcon'
import { IconSteeringWheel, IconUser } from '@tabler/icons-react'
import { Directions } from './Directions'
import { Panel } from './map/Panel'
import { DefaultZoomControls } from './map/ZoomControls'

export const ManageValets = ({
  garage,
}: {
  garage: SearchGaragesQuery['searchGarages'][number]
}) => {
  const [showValet, setShowValet] = useState(false)

  const { setValue } = useFormContext<FormTypeBookSlot>()
  const { valet } = useWatch<FormTypeBookSlot>()

  const lat = garage.address?.lat
  const lng = garage.address?.lng
  if (!lat || !lng) {
    toast('Garage location not set.')
    return <div>Something went wrong.</div>
  }

  return (
    <div className="space-y-3 border border-line bg-surface-sunken p-4">
      <div className="flex items-center gap-2 font-display text-lg font-extrabold">
        <IconSteeringWheel className="h-5 w-5 text-primary" /> Valet
      </div>
      <p className="text-sm text-fg-muted">
        A valet collects your car where you are, parks it, and brings it back
        when you’re ready.
      </p>

      <Switch
        checked={showValet}
        onChange={(e) => {
          setShowValet(e)

          if (!e) {
            setValue('valet', undefined, {
              shouldValidate: true,
            })
            setValue('valet.differentLocations', false)
          } else {
            setValue('valet.pickupInfo', {
              lat,
              lng,
            })
            setValue('valet.dropoffInfo', {
              lat,
              lng,
            })
          }
        }}
        label={'Add a valet'}
      />

      {showValet ? (
        <div>
          <div className="mb-4 space-y-3">
            <p className="text-sm text-fg-muted">
              Drag the markers to set where the valet picks your car up and
              where they bring it back.
            </p>
            <Switch
              checked={valet?.differentLocations || false}
              onChange={(e) => {
                setValue('valet.differentLocations', e)
                if (!e) {
                  setValue('valet.dropoffInfo', {
                    lat: valet?.pickupInfo?.lat || lat,
                    lng: valet?.pickupInfo?.lng || lng,
                  })
                } else {
                  setValue('valet.dropoffInfo', {
                    lat,
                    lng,
                  })
                }
              }}
              label={'Return it somewhere else'}
            />
          </div>
          <Map
            initialViewState={{
              latitude: lat,
              longitude: lng,
              zoom: 13,
            }}
            height="20rem"
          >
            <Panel position="right-center">
              <DefaultZoomControls />
            </Panel>
            <Marker latitude={lat} longitude={lng} anchor="bottom">
              <ParkingIcon active />
            </Marker>
            {valet?.pickupInfo?.lng && valet?.pickupInfo?.lat ? (
              <>
                <Marker
                  pitchAlignment="auto"
                  anchor="bottom"
                  longitude={valet?.pickupInfo?.lng}
                  latitude={valet?.pickupInfo?.lat}
                  draggable
                  onDragEnd={({ lngLat }) => {
                    const { lat, lng } = lngLat
                    setValue('valet.pickupInfo.lat', lat || 0)
                    setValue('valet.pickupInfo.lng', lng || 0)
                    if (!valet.differentLocations) {
                      setValue('valet.dropoffInfo.lat', lat || 0)
                      setValue('valet.dropoffInfo.lng', lng || 0)
                    }
                  }}
                >
                  <div className="flex cursor-grab flex-col items-center">
                    <span className="flex items-center gap-1 bg-black px-1.5 py-1 text-xs font-bold text-primary ring-1 ring-primary">
                      <IconUser className="h-3.5 w-3.5" />
                      {valet.differentLocations ? 'Pickup' : 'Pickup & return'}
                    </span>
                    <span className="h-2 w-0.5 bg-primary" />
                  </div>
                </Marker>
                <Directions
                  sourceId={'pickup_route'}
                  origin={{ lat, lng }}
                  destination={{
                    lat: valet.pickupInfo.lat,
                    lng: valet.pickupInfo.lng,
                  }}
                  setDistance={(distance) => {
                    setValue('valet.pickupInfo.distance', distance)
                  }}
                />
              </>
            ) : null}

            {valet?.differentLocations &&
            valet?.dropoffInfo?.lng &&
            valet?.dropoffInfo?.lat ? (
              <>
                <Marker
                  pitchAlignment="auto"
                  anchor="bottom"
                  longitude={valet.dropoffInfo.lng}
                  latitude={valet.dropoffInfo.lat}
                  draggable
                  onDragEnd={({ lngLat }) => {
                    const { lat, lng } = lngLat
                    setValue('valet.dropoffInfo.lat', lat || 0)
                    setValue('valet.dropoffInfo.lng', lng || 0)
                  }}
                >
                  <div className="flex cursor-grab flex-col items-center">
                    <span className="flex items-center gap-1 bg-black px-1.5 py-1 text-xs font-bold text-primary ring-1 ring-primary">
                      <IconUser className="h-3.5 w-3.5" />
                      Return
                    </span>
                    <span className="h-2 w-0.5 bg-primary" />
                  </div>
                </Marker>
                <Directions
                  sourceId={'dropoff_route'}
                  origin={{ lat, lng }}
                  destination={{
                    lat: valet.dropoffInfo.lat,
                    lng: valet.dropoffInfo.lng,
                  }}
                  setDistance={(distance) => {
                    setValue('valet.dropoffInfo.distance', distance)
                  }}
                />
              </>
            ) : null}
          </Map>
        </div>
      ) : null}
    </div>
  )
}
