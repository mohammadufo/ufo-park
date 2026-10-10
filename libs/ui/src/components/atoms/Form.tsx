import React, { FormHTMLAttributes } from 'react'

type FormProps = FormHTMLAttributes<HTMLFormElement>

export const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({ className = '', ...props }, ref) => (
    <form
      ref={ref}
      className={`flex w-full flex-col gap-4 ${className}`}
      {...props}
    >
      {props.children}
    </form>
  ),
)
Form.displayName = 'Form'
