import React, { HTMLProps } from 'react'
import { fieldStyles } from './fieldStyles'

export const HtmlTextArea = React.forwardRef<
  HTMLTextAreaElement,
  HTMLProps<HTMLTextAreaElement>
>(({ className = '', ...props }, ref) => (
  <textarea
    ref={ref}
    {...props}
    className={`${fieldStyles} min-h-[6rem] ${className}`}
  />
))
HtmlTextArea.displayName = 'TextArea'
