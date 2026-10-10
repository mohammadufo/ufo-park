import { LocationInfo, ViewState } from '@ufopark/util/types'
import { useMap } from 'react-map-gl'
import { Autocomplete } from '../../atoms/Autocomplete'
import { useSearchLocation } from '@ufopark/util/hooks/location'
import { majorCitiesLocationInfo } from '@ufopark/util/constants'

export const SearchPlaceBox = ({
  onLocationChange,
}: {
  onLocationChange?: (location: ViewState) => void
}) => {
  const { current: map } = useMap()
  const { loading, locationInfo, searchText, setLoading, setSearchText } =
    useSearchLocation()

  return (
    <Autocomplete<LocationInfo>
      options={locationInfo?.length ? locationInfo : majorCitiesLocationInfo}
      isOptionEqualToValue={(option, value) =>
        option.placeName === value.placeName
      }
      placeholder="Where are you going?"
      noOptionsText={
        searchText ? 'No places match that.' : 'Type an address or a place.'
      }
      getOptionLabel={(x) => x.placeName}
      onInputChange={(_, v) => {
        setLoading(true)
        setSearchText(v)
      }}
      loading={loading}
      onChange={async (_, v) => {
        if (v) {
          const { latLng, placeName } = v
          await map?.flyTo({
            center: { lat: latLng[0], lng: latLng[1] },
            zoom: 12,
            // essential: true,
          })
          if (onLocationChange) {
            onLocationChange({ latitude: latLng[0], longitude: latLng[1] })
          }
        }
      }}
    />
  )
}
