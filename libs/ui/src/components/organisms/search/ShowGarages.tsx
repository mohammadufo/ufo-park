import { useLazyQuery } from '@apollo/client'
import { SearchGaragesDocument } from '@ufopark/network/src/gql/generated'
import { useEffect } from 'react'
import { GarageMarker } from './GarageMarker'
import { useConvertSearchFormToVariables } from '@ufopark/forms/src/adapters/searchFormAdapter'
import { useFormContext } from 'react-hook-form'
import { Panel } from '../map/Panel'
import { Loader } from '../../molecules/Loader'
import { IconInfoCircle } from '@tabler/icons-react'

export const ShowGarages = () => {
  const [searchGarages, { loading, data }] = useLazyQuery(SearchGaragesDocument)

  const { variables } = useConvertSearchFormToVariables()

  useEffect(() => {
    if (variables) {
      searchGarages({ variables })
    }
  }, [variables])

  if (data?.searchGarages.length === 0) {
    return (
      <Panel
        position="center-center"
        className="bg-white/50 shadow border-white border backdrop-blur-sm"
      >
        <div className="flex items-center justify-center gap-2 ">
          <IconInfoCircle /> <div>No parking slots found in this area.</div>
        </div>
      </Panel>
    )
  }

  return (
    <>
      {loading ? (
        <Panel position="center-bottom">
          <Loader />
        </Panel>
      ) : null}
      {data?.searchGarages.map((garage) => (
        <GarageMarker key={garage.id} marker={garage} />
      ))}
    </>
  )
}
