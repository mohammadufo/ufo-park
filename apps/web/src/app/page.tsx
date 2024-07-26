'use client'

import { add } from '@ufopark/sample-lib'
import { useQuery } from '@apollo/client'
import {
  CompaniesDocument,
  SearchGaragesDocument,
} from '@ufopark/network/src/gql/generated'
import { BrandIcon } from '@ufopark/ui/src/components/atoms/BrandIcon'
import { Button } from '@ufopark/ui/src/components/atoms/Button'
import { useSession } from 'next-auth/react'

export default function Home() {
  const { data, loading } = useQuery(CompaniesDocument)

  const { data: sessionData, status } = useSession()

  const { data: garages } = useQuery(SearchGaragesDocument, {
    variables: {
      dateFilter: { end: '2-2-2020', start: '2-2-2020' },
      locationFilter: {
        ne_lat: 1,
        ne_lng: 1,
        sw_lat: -1,
        sw_lng: -1,
      },
    },
  })

  return (
    <main className="">
      <BrandIcon />
      <Button variant="outlined">I love Alaa 💕</Button>

      <div>
        <span>compony list</span>
        {data?.companies.map((company) => (
          <div className="p-4 bg-gray-100 rounded" key={company.id}>
            <span className="text-black">{company.displayName}</span>
            <span className="text-black">{company.description}</span>
          </div>
        ))}
      </div>

      <div>
        <span>garages</span>
        {garages?.searchGarages.map((garage) => (
          <pre key={garage.id}>{JSON.stringify(garage, null, 2)}</pre>
        ))}
      </div>
    </main>
  )
}
