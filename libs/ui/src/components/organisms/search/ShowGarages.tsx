import { useLazyQuery } from '@apollo/client'
import { SearchGaragesDocument } from '@ufopark/network/src/gql/generated'
import { useEffect } from 'react'
import { IconAlertTriangle, IconMapSearch } from '@tabler/icons-react'
import { useConvertSearchFormToVariables } from '@ufopark/forms/src/adapters/searchFormAdapter'
import { GarageMarker } from './GarageMarker'
import { Panel } from '../map/Panel'
import { Loader } from '../../molecules/Loader'

const StatusPill = ({ children }: { children: React.ReactNode }) => (
  <div className="glass flex w-max max-w-[calc(100vw-1.5rem)] items-center gap-3 px-4 py-3 text-left text-sm shadow-panel">
    {children}
  </div>
)

export const ShowGarages = () => {
  const { variables, debouncing } = useConvertSearchFormToVariables()

  const [
    searchGarages,
    { loading: garagesLoading, data, previousData, error },
  ] = useLazyQuery(SearchGaragesDocument)

  useEffect(() => {
    if (variables) {
      searchGarages({ variables })
    }
  }, [variables, searchGarages])

  const garages = data?.searchGarages || previousData?.searchGarages || []
  const loading = debouncing || garagesLoading

  return (
    <>
      <Panel position="center-bottom" className="p-3 pb-8 sm:p-4 sm:pb-10">
        {error ? (
          <StatusPill>
            <IconAlertTriangle className="h-5 w-5 shrink-0 text-danger" />
            <span>
              Garages didn’t load.{' '}
              <span className="text-fg-muted">{error.message}</span>
            </span>
          </StatusPill>
        ) : loading ? (
          <StatusPill>
            <Loader className="w-10" />
            <span className="text-fg-muted">Looking for free slots…</span>
          </StatusPill>
        ) : garages.length === 0 ? (
          <StatusPill>
            <IconMapSearch className="h-5 w-5 shrink-0 text-primary" />
            <span>
              No free slots here for those times.{' '}
              <span className="text-fg-muted">
                Move the map or change your times.
              </span>
            </span>
          </StatusPill>
        ) : (
          <StatusPill>
            <span className="flex h-5 min-w-[1.25rem] items-center justify-center bg-primary px-1 font-display text-xs font-black text-black">
              {garages.length}
            </span>
            <span className="text-fg-muted">
              {garages.length === 1 ? 'garage' : 'garages'} with free slots in
              view. Tap a sign to book.
            </span>
          </StatusPill>
        )}
      </Panel>
      {garages.map((garage) => (
        <GarageMarker key={garage.id} marker={garage} />
      ))}
    </>
  )
}
