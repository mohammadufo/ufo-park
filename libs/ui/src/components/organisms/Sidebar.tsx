import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react'
import { Fragment, ReactNode } from 'react'
import { IconX } from '@tabler/icons-react'

export interface ISidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
  children: ReactNode
  blur?: boolean
  title?: ReactNode
}

/** A sheet that slides in from the right edge. */
export const Sidebar = ({
  open,
  setOpen,
  children,
  blur = true,
  title,
}: ISidebarProps) => {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-hidden"
        onClose={() => setOpen(false)}
      >
        <TransitionChild
          as={Fragment}
          enter="transition-opacity ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className={`absolute inset-0 ${
              blur ? 'bg-black/50 backdrop-blur-sm' : 'bg-black/20'
            }`}
          />
        </TransitionChild>

        <div className="fixed inset-y-0 right-0 flex max-w-full">
          <TransitionChild
            as={Fragment}
            enter="transform transition ease-[cubic-bezier(0.22,1,0.36,1)] duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <DialogPanel className="flex w-screen max-w-sm flex-col overflow-y-auto border-l border-line-strong bg-surface text-fg shadow-panel">
              <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-4">
                <DialogTitle className="font-display text-lg font-extrabold">
                  {title}
                </DialogTitle>
                <button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center text-fg-muted transition-colors hover:bg-fg/5 hover:text-fg"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                >
                  <IconX className="h-5 w-5" />
                </button>
              </div>
              <div className="flex flex-1 flex-col p-4">{children}</div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  )
}
