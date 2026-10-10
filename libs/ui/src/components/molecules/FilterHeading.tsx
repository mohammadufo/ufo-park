export const FilterHeading = ({
  title,
  dirty = true,
}: {
  title: string
  dirty: boolean
}) => (
  <div className="mb-1 flex items-center gap-2 font-display font-bold">
    {title}
    {dirty ? (
      <span className="h-1.5 w-1.5 bg-primary" aria-label="changed" />
    ) : null}
  </div>
)
