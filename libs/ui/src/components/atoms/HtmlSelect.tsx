import React, { InputHTMLAttributes } from 'react'
import { fieldStyles } from './fieldStyles'

export const HtmlSelect = React.forwardRef<
  HTMLSelectElement,
  InputHTMLAttributes<HTMLSelectElement>
>(
  (
    {
      children,
      className = '',
      ...props
    }: InputHTMLAttributes<HTMLSelectElement>,
    ref,
  ) => (
    <select
      {...props}
      ref={ref}
      className={`${fieldStyles} bg-[length:16px] bg-[right_0.75rem_center] bg-no-repeat pr-9 ${className}`}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
        ...props.style,
      }}
    >
      {children}
    </select>
  ),
)

HtmlSelect.displayName = 'HtmlSelect'
