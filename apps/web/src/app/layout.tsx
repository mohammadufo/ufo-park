// 'use client'
import { Inter } from 'next/font/google'
import { ApolloProvider } from '@ufopark/network/src/config/apollo'
import '@ufopark/ui/src/app/globals.css'
import { SessionProvider } from '@ufopark/ui/src/components/molecules/SessionProvider'
import { Header } from '@ufopark/ui/src/components/organisms/Header'
import { MenuItem } from '@ufopark/util/types'
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }

const MENUITEMS: MenuItem[] = [
  { label: 'Search', href: '/search' },
  { label: 'Bookings', href: '/bookings' },
  { label: 'About', href: '/about' },
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <SessionProvider>
        <ApolloProvider>
          <body className={inter.className}>
            <Header menuItems={MENUITEMS} />
            {children}
          </body>
        </ApolloProvider>
      </SessionProvider>
    </html>
  )
}
