'use client'

import { add } from '@ufopark/sample-lib'
import { useQuery } from '@apollo/client'
import { CompaniesDocument } from '@ufopark/network/src/gql/generated'
import { BrandIcon } from '@ufopark/ui/src/components/atoms/BrandIcon'
import { Button } from '@ufopark/ui/src/components/atoms/Button'

export default function Home() {
  const { data, loading } = useQuery(CompaniesDocument)

  return (
    <main className="">
      <BrandIcon />
      <Button variant="outlined" loading>
        I love Alaa 💕
      </Button>
      <span>{add(2, 6)}</span>
      <div>
        <span>compony list</span>
        {data?.companies.map((company) => (
          <div className="p-4 bg-gray-100 rounded" key={company.id}>
            <div>{company.displayName}</div>
            <div>{company.description}</div>
          </div>
        ))}
      </div>
    </main>
  )
}
