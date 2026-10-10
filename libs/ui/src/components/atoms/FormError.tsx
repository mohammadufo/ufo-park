import { IconAlertTriangle } from '@tabler/icons-react'

export const FormError = ({ error }: { error?: string | undefined }) => {
  if (!error) return null
  return (
    <div
      role="alert"
      className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-danger"
    >
      <IconAlertTriangle className="h-3.5 w-3.5 shrink-0" />
      {error}
    </div>
  )
}
