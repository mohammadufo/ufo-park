'use client'

import { add } from '@ufopark/sample-lib'
import { useQuery } from '@apollo/client'
import { CompaniesDocument } from '@ufopark/network/src/gql/generated'

export default function Home() {
  const { data, loading } = useQuery(CompaniesDocument)

  return (
    <main className="bg-primary">
      I love Alaa 💕
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
