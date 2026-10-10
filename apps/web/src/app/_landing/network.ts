export type NetworkGarage = {
  id: number
  name: string
  address: string
  lat: number
  lng: number
  slots: number
  types: string[]
}

export type NetworkStats = {
  garages: NetworkGarage[]
  totalSlots: number
  slotsByType: Record<string, number>
}

const QUERY = /* GraphQL */ `
  query LandingNetwork {
    garages {
      id
      displayName
      address {
        address
        lat
        lng
      }
      slotCounts {
        type
        count
      }
    }
  }
`

type Response = {
  data?: {
    garages: Array<{
      id: number
      displayName?: string | null
      address?: { address: string; lat: number; lng: number } | null
      slotCounts: Array<{ type: string; count?: number | null }>
    }>
  }
}

/**
 * Real numbers for the landing page, straight from the API. Cached for half
 * an hour; if the API is asleep or unreachable the sections that need it are
 * simply left out instead of breaking the page.
 */
export const getNetworkStats = async (): Promise<NetworkStats | null> => {
  const api = process.env.NEXT_PUBLIC_API_URL
  if (!api) return null

  try {
    const response = await fetch(`${api}/graphql`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ query: QUERY }),
      next: { revalidate: 1800 },
      signal: AbortSignal.timeout(8000),
    })
    if (!response.ok) return null
    const { data } = (await response.json()) as Response
    if (!data?.garages?.length) return null

    const slotsByType: Record<string, number> = {}
    const garages: NetworkGarage[] = []

    for (const garage of data.garages) {
      if (!garage.address) continue
      let slots = 0
      for (const { type, count } of garage.slotCounts) {
        slots += count || 0
        slotsByType[type] = (slotsByType[type] || 0) + (count || 0)
      }
      garages.push({
        id: garage.id,
        name: garage.displayName || 'Garage',
        address: garage.address.address,
        lat: garage.address.lat,
        lng: garage.address.lng,
        slots,
        types: garage.slotCounts.map(({ type }) => type),
      })
    }
    if (!garages.length) return null

    return {
      garages,
      totalSlots: Object.values(slotsByType).reduce((a, b) => a + b, 0),
      slotsByType,
    }
  } catch {
    return null
  }
}
