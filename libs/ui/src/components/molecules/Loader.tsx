import { AlertSection } from './AlertSection'

/** Lane dashes sliding past, like the road under a moving car. */
export const Loader = ({ className = '' }: { className?: string }) => (
  <span
    role="status"
    aria-label="Loading"
    className={`lane lane-primary block h-[3px] w-16 animate-lane-flow ${className}`}
  />
)

export const LoaderPanel = ({ text }: { text?: string }) => (
  <AlertSection title={text}>
    <Loader />
  </AlertSection>
)
