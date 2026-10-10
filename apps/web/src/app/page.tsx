import { Metadata } from 'next'
import { SiteFooter } from '@ufopark/ui/src/components/organisms/SiteFooter'
import { Hero } from './_landing/Hero'
import { CirclingMarquee } from './_landing/CirclingMarquee'
import { HowItWorks } from './_landing/HowItWorks'
import { Features } from './_landing/Features'
import { PriceSimulator } from './_landing/PriceSimulator'
import { BookingJourney } from './_landing/BookingJourney'
import { NetworkMap } from './_landing/NetworkMap'
import { Partners } from './_landing/Partners'
import { Faq } from './_landing/Faq'
import { FinalCta } from './_landing/FinalCta'
import { getNetworkStats } from './_landing/network'

export const metadata: Metadata = {
  title: { absolute: 'UFO Park — Book parking before you get there' },
}

// Live garage numbers are refreshed in the background every half hour.
export const revalidate = 1800

export default async function Home() {
  const stats = await getNetworkStats()

  return (
    <>
      <main>
        <Hero stats={stats} />
        <CirclingMarquee />
        <HowItWorks />
        <Features />
        <PriceSimulator />
        <BookingJourney />
        {stats ? <NetworkMap stats={stats} /> : null}
        <Partners />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  )
}
