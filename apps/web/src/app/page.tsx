import { Metadata } from 'next'
import { Hero } from './_landing/Hero'
import { HowItWorks } from './_landing/HowItWorks'
import { Features } from './_landing/Features'
import { BookingJourney } from './_landing/BookingJourney'
import { Partners } from './_landing/Partners'
import { FinalCta, Footer } from './_landing/Closing'

export const metadata: Metadata = {
  title: { absolute: 'UFO Park — Book parking before you get there' },
}

export default function Home() {
  return (
    // The root layout wraps pages in a Container; the landing page runs edge to edge.
    <main style={{ marginInline: 'calc(50% - 50vw)' }}>
      <Hero />
      <HowItWorks />
      <Features />
      <BookingJourney />
      <Partners />
      <FinalCta />
      <Footer />
    </main>
  )
}
