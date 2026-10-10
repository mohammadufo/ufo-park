import { AlertSection } from '../molecules/AlertSection'
import { LoaderPanel } from '../molecules/Loader'
import { NoResults } from '../molecules/NoResults'
import { Pagination } from '@mui/material'

interface ShowDataProps {
  error?: string
  loading?: boolean
  pagination: {
    setSkip: (skip: number) => void
    setTake: (take: number) => void
    skip: number
    take: number
    resultCount?: number
    totalCount?: number
  }
  title?: React.ReactNode
  children: React.ReactNode
  childrenClassName?: string
}

export const ShowData = ({
  error,
  loading,
  pagination,
  title,
  children,
  childrenClassName = 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4',
}: ShowDataProps) => {
  const { setSkip, setTake, skip, take, resultCount, totalCount } = pagination

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number,
  ) => {
    setSkip((page - 1) * take)
  }

  const totalPages = Math.ceil((totalCount || 0) / take)

  return (
    <div className="mt-6">
      {title ? (
        <h2 className="mb-4 font-display text-xl font-extrabold">{title}</h2>
      ) : null}
      {loading && <LoaderPanel />}
      {!loading && !error && resultCount === 0 && <NoResults />}

      {error && (
        <AlertSection title="This list didn’t load">
          <span>Check your connection and reload the page.</span>
          <span className="text-xs text-fg-subtle">{error}</span>
        </AlertSection>
      )}

      <div className={childrenClassName}>{children}</div>
      {totalPages > 1 ? (
        <div className="mt-10 flex justify-center">
          <Pagination
            count={totalPages}
            showFirstButton
            showLastButton
            page={skip / take + 1}
            onChange={handlePageChange}
          />
        </div>
      ) : null}
    </div>
  )
}
