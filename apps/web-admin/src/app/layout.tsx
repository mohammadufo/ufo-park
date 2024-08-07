import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@ufopark/ui/src/app/globals.css'
import { MenuItem } from '@ufopark/util/types'
import { ApolloProvider } from '@ufopark/network/src/config/apollo'
import { SessionProvider } from '@ufopark/ui/src/components/molecules/SessionProvider'
import { ToastContainer } from '@ufopark/ui/src/components/molecules/Toast'
import { Container } from '@ufopark/ui/src/components/atoms/Container'
import { Header } from '@ufopark/ui/src/components/organisms/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'UFO PARK',
  description: 'Generated by create next app',
}

const MENUITEMS: MenuItem[] = [
  { label: 'Garages', href: '/' },
  { label: 'Admins', href: '/manageAdmins' },
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-25`}>
        <SessionProvider>
          <ApolloProvider>
            <Header menuItems={MENUITEMS} />
            <Container>{children}</Container>
          </ApolloProvider>
        </SessionProvider>
        <ToastContainer />
      </body>
    </html>
  )
}
