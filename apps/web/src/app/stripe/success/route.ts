import { NextRequest, NextResponse } from 'next/server'

/**
 * Stripe's success URL must hit the API, which verifies the payment and
 * creates the booking. If STRIPE_SUCCESS_URL was set to the web app instead,
 * forward the visitor (and the session id) to the API rather than a 404.
 */
export function GET(request: NextRequest) {
  const api = process.env.NEXT_PUBLIC_API_URL
  if (!api) {
    return NextResponse.redirect(new URL('/booking-failed', request.url))
  }
  return NextResponse.redirect(`${api}/stripe/success${request.nextUrl.search}`)
}

export const dynamic = 'force-dynamic'
