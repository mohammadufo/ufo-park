import { Inter } from 'next/font/google'
import { ApolloProvider } from '@ufopark/network/src/config/apollo'
import '@ufopark/ui/src/app/globals.css'
import { SessionProvider } from '@ufopark/ui/src/components/molecules/SessionProvider'
import { Header } from '@ufopark/ui/src/components/organisms/Header'
import { MenuItem } from '@ufopark/util/types'
import { ToastContainer } from '@ufopark/ui/src/components/molecules/Toast'
import { Metadata, Viewport } from 'next'
import { Container } from '@ufopark/ui/src/components/atoms/Container'

const inter = Inter({ subsets: ['latin'] })

const description =
  'Find a garage near where you’re going, book a slot by the hour and drive straight in — or let a valet pick up and return your car.'

export const metadata: Metadata = {
  title: { default: 'UFO Park', template: '%s | UFO Park' },
  description,
  applicationName: 'UFO Park',
  openGraph: {
    type: 'website',
    siteName: 'UFO Park',
    title: 'UFO Park — Book parking before you get there',
    description,
  },
  twitter: {
    card: 'summary',
    title: 'UFO Park — Book parking before you get there',
    description,
  },
}

export const viewport: Viewport = {
  themeColor: '#ffdd00',
}

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
    <html lang="en" className="motion-safe:scroll-smooth">
      <SessionProvider>
        <ApolloProvider>
          <body className={`${inter.className} bg-gray-25 overflow-x-clip`}>
            <Header menuItems={MENUITEMS} />
            <Container>{children}</Container>
            <ToastContainer />
          </body>
        </ApolloProvider>
      </SessionProvider>
    </html>
  )
}
