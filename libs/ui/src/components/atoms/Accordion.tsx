import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'
import { IconChevronDown } from '@tabler/icons-react'
import { ReactNode } from 'react'

export interface IAccordionProps {
  title: ReactNode
  children: ReactNode
  className?: string
  defaultOpen?: boolean
}

export const Accordion = ({
  title,
  children,
  className = '',
  defaultOpen = false,
}: IAccordionProps) => (
  <Disclosure defaultOpen={defaultOpen}>
    {({ open }) => (
      <>
        <DisclosureButton
          className={`flex w-full items-center justify-between gap-3 py-3 text-left ${className}`}
        >
          <span className="min-w-0 flex-1">{title}</span>
          <IconChevronDown
            className={`h-5 w-5 shrink-0 text-fg-subtle transition-transform duration-200 ${
              open ? 'rotate-180 text-fg' : ''
            }`}
          />
        </DisclosureButton>
        <DisclosurePanel className="w-full pb-4 text-sm text-fg-muted">
          {children}
        </DisclosurePanel>
      </>
    )}
  </Disclosure>
)
