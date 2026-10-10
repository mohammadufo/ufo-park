import React, { InputHTMLAttributes } from 'react'
import { fieldStyles } from './fieldStyles'

export type HtmlInputProps = InputHTMLAttributes<HTMLInputElement>

export const HtmlInput = React.forwardRef<HTMLInputElement, HtmlInputProps>(
  ({ className = '', ...props }, ref) => (
    <input ref={ref} className={`${fieldStyles} ${className}`} {...props} />
  ),
)
HtmlInput.displayName = 'Input'
