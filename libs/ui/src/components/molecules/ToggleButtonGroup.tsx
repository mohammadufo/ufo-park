import ToggleButtonMui, { ToggleButtonProps } from '@mui/material/ToggleButton'
import ToggleButtonGroupMui, {
  ToggleButtonGroupProps,
} from '@mui/material/ToggleButtonGroup'
import { forwardRef } from 'react'

export const ToggleButtonGroup = forwardRef<
  JSX.Element,
  ToggleButtonGroupProps
>((props, ref) => (
  <ToggleButtonGroupMui
    classes={{ root: 'mt-3 grid w-full grid-cols-4' }}
    ref={ref}
    {...props}
  />
))

ToggleButtonGroup.displayName = 'ToggleButtonGroup'

export const ToggleButton = (props: ToggleButtonProps) => (
  <ToggleButtonMui
    classes={{ root: 'h-12 transition-colors' }}
    disableRipple
    disableTouchRipple
    disableFocusRipple
    {...props}
  />
)
