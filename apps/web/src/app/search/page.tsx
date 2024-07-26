'use client'
import { SearchPage } from '@ufopark/ui/src/components/templates/SearchPage'
import { FormProviderSearchGarage } from '@ufopark/forms/src/searchGarages'

export default function Page() {
  return (
    <FormProviderSearchGarage>
      <SearchPage />
    </FormProviderSearchGarage>
  )
}
