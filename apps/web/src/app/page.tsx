import { Metadata } from 'next'
import { SiteFooter } from '@ufopark/ui/src/components/organisms/SiteFooter'
import { Hero } from './_landing/Hero'
import { HowItWorks } from './_landing/HowItWorks'
import { Features } from './_landing/Features'
import { BookingJourney } from './_landing/BookingJourney'
import { Partners } from './_landing/Partners'
import { FinalCta } from './_landing/FinalCta'

export const metadata: Metadata = {
  title: { absolute: 'UFO Park — Book parking before you get there' },
}

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <BookingJourney />
        <Partners />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  )
}
