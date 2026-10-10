import { Switch as HUISwitch, Field, Label } from '@headlessui/react'
import { ReactNode } from 'react'

export interface Switch2Props {
  label: ReactNode
  children?: ReactNode
  checked: boolean
  onChange: (checked: boolean) => void
  className?: string
}

export const Switch = ({
  label,
  children,
  checked,
  onChange,
  className = '',
}: Switch2Props) => {
  return (
    <Field className={`flex items-center justify-between gap-4 ${className}`}>
      <Label className="cursor-pointer text-sm font-medium">{label}</Label>
      <HUISwitch
        checked={checked}
        onChange={onChange}
        className={`relative inline-flex h-6 w-11 shrink-0 items-center border transition-colors duration-200 ${
          checked
            ? 'border-primary bg-primary'
            : 'border-line-strong bg-surface-sunken'
        }`}
      >
        <span
          className={`inline-flex h-4 w-4 items-center justify-center transition-transform duration-200 ${
            checked
              ? 'translate-x-[22px] bg-black'
              : 'translate-x-1 bg-fg-subtle'
          }`}
        >
          {children}
        </span>
      </HUISwitch>
    </Field>
  )
}
