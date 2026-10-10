import React, { HTMLProps } from 'react'
import { FormError } from './FormError'

export type HtmlLabelProps = HTMLProps<HTMLLabelElement> & {
  error?: string | undefined
  optional?: boolean
}

export const HtmlLabel = React.forwardRef<HTMLLabelElement, HtmlLabelProps>(
  ({ children, title, optional, error, className = '' }, ref) => (
    <label ref={ref} className={`block select-none text-sm ${className}`}>
      <div className="mb-1.5 flex items-baseline justify-between gap-2">
        <span className="font-semibold text-fg-muted first-letter:uppercase">
          {title}
        </span>
        {optional ? (
          <span className="text-xs text-fg-subtle">Optional</span>
        ) : null}
      </div>
      {children}
      <FormError error={error} />
    </label>
  ),
)

HtmlLabel.displayName = 'HtmlLabel'
