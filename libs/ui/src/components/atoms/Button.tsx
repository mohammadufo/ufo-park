import { IconRotateClockwise2 } from '@tabler/icons-react'

type ButtonSizes = 'none' | 'sm' | 'md' | 'lg' | 'xl'
type ButtonVariant = 'contained' | 'outlined' | 'text'
type ButtonColor = 'primary' | 'success' | 'error' | 'white' | 'black'

export type IButtonProps = {
  size?: ButtonSizes
  variant?: ButtonVariant
  color?: ButtonColor
  fullWidth?: boolean
  loading?: boolean
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

// "black" means "high contrast": black on light pages, white on dark ones.
const variantColor: Record<ButtonVariant, Record<ButtonColor, string>> = {
  contained: {
    primary:
      'bg-primary text-black enabled:hover:bg-primary-300 enabled:hover:shadow-glow-sm [&:not(button)]:hover:bg-primary-300 [&:not(button)]:hover:shadow-glow-sm',
    white: 'bg-white text-black enabled:hover:bg-gray-25',
    black:
      'bg-fg text-canvas enabled:hover:bg-fg/85 [&:not(button)]:hover:bg-fg/85',
    success: 'bg-success text-white enabled:hover:brightness-110',
    error: 'bg-danger text-white enabled:hover:brightness-110',
  },
  outlined: {
    primary:
      'border border-primary text-fg enabled:hover:bg-primary/10 [&:not(button)]:hover:bg-primary/10',
    white:
      'border border-white/40 text-white enabled:hover:border-white enabled:hover:bg-white/10 [&:not(button)]:hover:border-white',
    black:
      'border border-line-strong text-fg enabled:hover:border-fg/50 enabled:hover:bg-fg/5 [&:not(button)]:hover:border-fg/50 [&:not(button)]:hover:bg-fg/5',
    success: 'border border-success text-success enabled:hover:bg-success/10',
    error: 'border border-danger text-danger enabled:hover:bg-danger/10',
  },
  text: {
    primary: 'text-fg enabled:hover:bg-fg/5',
    white: 'text-white enabled:hover:bg-white/10',
    black: 'text-fg enabled:hover:bg-fg/5',
    success: 'text-success enabled:hover:bg-success/10',
    error: 'text-danger enabled:hover:bg-danger/10',
  },
}

const sizes: Record<ButtonSizes, string> = {
  none: 'text-xs',
  sm: 'h-8 px-3 text-xs',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-5 text-base',
  xl: 'h-14 px-7 text-lg',
}

/** Button look for things that are not <button>, e.g. a Next.js <Link>. */
export const buttonStyles = ({
  size = 'md',
  variant = 'contained',
  color = 'primary',
  fullWidth = false,
}: {
  size?: ButtonSizes
  variant?: ButtonVariant
  color?: ButtonColor
  fullWidth?: boolean
} = {}) =>
  [
    'relative inline-flex select-none items-center justify-center gap-2 rounded-none font-semibold transition-[background-color,border-color,color,box-shadow,filter] duration-200 active:translate-y-px',
    sizes[size],
    variantColor[variant][color],
    fullWidth ? 'w-full' : '',
  ].join(' ')

export const Button = ({
  size = 'md',
  variant = 'contained',
  color = 'primary',
  fullWidth = false,
  disabled = false,
  children,
  className = '',
  loading = false,
  type = 'button',
  ...props
}: IButtonProps) => {
  const disabledCls =
    disabled || loading
      ? 'cursor-not-allowed opacity-50 active:translate-y-0'
      : ''

  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={`${buttonStyles({ size, variant, color, fullWidth })} ${disabledCls} ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <span className="absolute inset-0 flex items-center justify-center">
            <IconRotateClockwise2 className="h-5 w-5 animate-spin" />
          </span>
          <span className="invisible inline-flex items-center gap-2">
            {children}
          </span>
        </>
      ) : (
        children
      )}
    </button>
  )
}
