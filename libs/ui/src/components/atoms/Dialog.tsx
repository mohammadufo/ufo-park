import {
  Dialog as HeadlessUIDialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react'
import { IconX } from '@tabler/icons-react'
import { Dispatch, Fragment, ReactNode, SetStateAction } from 'react'

interface IMyDialogProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  children: ReactNode
  title: string
  className?: string
  widthClassName?: string
}

export const Dialog = ({
  open,
  setOpen,
  children,
  title,
  widthClassName = 'max-w-md',
}: IMyDialogProps) => {
  return (
    <Transition appear show={open} as={Fragment}>
      <HeadlessUIDialog
        as="div"
        className="relative z-50"
        onClose={() => setOpen(false)}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-3 sm:p-6">
            <TransitionChild
              as={Fragment}
              enter="ease-[cubic-bezier(0.22,1,0.36,1)] duration-300"
              enterFrom="opacity-0 translate-y-4 scale-[0.98]"
              enterTo="opacity-100 translate-y-0 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-[0.98]"
            >
              <DialogPanel
                className={`relative w-full overflow-hidden border border-line-strong bg-surface text-left align-middle text-fg shadow-panel ${widthClassName}`}
              >
                <div className="h-0.5 bg-primary" />
                <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3.5">
                  <DialogTitle
                    as="h3"
                    className="font-display text-lg font-extrabold leading-6"
                  >
                    {title}
                  </DialogTitle>
                  <button
                    type="button"
                    className="-mr-2 flex h-9 w-9 items-center justify-center text-fg-muted transition-colors hover:bg-fg/5 hover:text-fg"
                    onClick={() => setOpen(false)}
                    aria-label="Close"
                  >
                    <IconX className="h-5 w-5" />
                  </button>
                </div>
                <div className="p-5">{children}</div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </HeadlessUIDialog>
    </Transition>
  )
}
