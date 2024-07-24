'use client'

import { add } from '@ufopark/sample-lib'
import { useQuery } from '@apollo/client'
import { CompaniesDocument } from '@ufopark/network/src/gql/generated'
import { BrandIcon } from '@ufopark/ui/src/components/atoms/BrandIcon'
import { Button } from '@ufopark/ui/src/components/atoms/Button'
import { Sidebar } from '@ufopark/ui/src/components/organisms/Sidebar'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'

export default function Home() {
  const { data, loading } = useQuery(CompaniesDocument)

  const { data: sessionData, status } = useSession()

  return (
    <main className="">
      <BrandIcon />
      <Button variant="outlined">I love Alaa 💕</Button>

      <div>
        {sessionData?.user?.uid ? (
          <Button onClick={() => signOut()}>Signout</Button>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </div>
      <div className="p-12">
        <Sidebar>Children...</Sidebar>
      </div>
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
