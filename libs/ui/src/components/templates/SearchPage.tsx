'use client'
import { useCallback } from 'react'
import { ViewStateChangeEvent } from 'react-map-gl'
import { useFormContext } from 'react-hook-form'
import { initialViewState } from '@ufopark/util/constants'
import { toLocalISOString } from '@ufopark/util/date'
import { FormTypeSearchGarage } from '@ufopark/forms/src/searchGarages'
import { Map } from '../organisms/map/Map'
import { Panel } from '../organisms/map/Panel'
import { DefaultZoomControls } from '../organisms/map/ZoomControls'
import { SearchPlaceBox } from '../organisms/map/SearchPlacesBox'
import { IconType } from '../molecules/IconTypes'
import { HtmlInput } from '../atoms/HtmlInput'
import { FormError } from '../atoms/FormError'
import { ShowGarages } from '../organisms/search/ShowGarages'
import { FilterSidebar } from '../organisms/search/FilterSidebar'

export const SearchPage = () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
    trigger,
  } = useFormContext<FormTypeSearchGarage>()
  const formData = watch()
  const now = toLocalISOString(new Date()).slice(0, 16)

  const handleMapChange = useCallback(
    (target: ViewStateChangeEvent['target']) => {
      const bounds = target.getBounds()
      const locationFilter = {
        ne_lat: bounds?.getNorthEast().lat || 0,
        ne_lng: bounds?.getNorthEast().lng || 0,
        sw_lat: bounds?.getSouthWest().lat || 0,
        sw_lng: bounds?.getSouthWest().lng || 0,
      }
      setValue('locationFilter', locationFilter)
    },
    [setValue],
  )

  const errorMessages = Object.entries(errors)
    .map(([, value]) => value?.message)
    .filter(Boolean) as string[]

  return (
    <Map
      onLoad={(e) => handleMapChange(e.target)}
      onDragEnd={(e) => handleMapChange(e.target)}
      onZoomEnd={(e) => handleMapChange(e.target)}
      initialViewState={initialViewState}
    >
      <ShowGarages />

      <Panel position="left-top" className="p-3 sm:p-4">
        <div className="glass w-[min(23rem,calc(100vw-1.5rem))] animate-fade-up text-left shadow-panel">
          <div className="h-0.5 bg-primary" />
          <div className="space-y-3 p-4">
            <div className="flex items-center justify-between gap-3">
              <h1 className="font-display text-lg font-extrabold">
                Find parking
              </h1>
              <FilterSidebar />
            </div>

            <SearchPlaceBox />

            <div className="divide-y divide-line-strong border border-line-strong bg-surface-sunken">
              {(
                [
                  { name: 'startTime', label: 'Arrive' },
                  { name: 'endTime', label: 'Leave' },
                ] as const
              ).map(({ name, label }) => (
                <label key={name} className="flex items-center gap-3 pl-3">
                  <IconType
                    time={formData[name]}
                    className="shrink-0 text-primary"
                  />
                  <span className="w-12 shrink-0 text-xs font-semibold text-fg-muted">
                    {label}
                  </span>
                  <HtmlInput
                    type="datetime-local"
                    className="border-0 bg-transparent px-0 hover:border-0 focus:ring-0"
                    min={now}
                    {...register(name, {
                      onChange() {
                        trigger('startTime')
                        trigger('endTime')
                      },
                    })}
                  />
                </label>
              ))}
            </div>

            {errorMessages.map((message) => (
              <FormError key={message} error={message} />
            ))}
          </div>
        </div>
      </Panel>

      <Panel position="right-center" className="p-3 sm:p-4">
        <DefaultZoomControls />
      </Panel>
    </Map>
  )
}
