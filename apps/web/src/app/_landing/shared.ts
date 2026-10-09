/** Same horizontal rhythm as the header's Container, plus a mobile gutter. */
export const wrap = 'container mx-auto px-4 sm:px-2'

export const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'

/** Optional links to the partner apps, set per environment. */
export const MANAGER_APP_URL = process.env.NEXT_PUBLIC_MANAGER_APP_URL
export const VALET_APP_URL = process.env.NEXT_PUBLIC_VALET_APP_URL
