import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-4 disabled:pointer-events-none disabled:opacity-50 select-none touch-manipulation active:scale-95',
  {
    variants: {
      variant: {
        primary: 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 focus:ring-blue-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5',
        secondary: 'bg-white text-blue-600 border border-blue-200 hover:bg-blue-50 focus:ring-blue-300 shadow-md hover:shadow-lg hover:border-blue-300',
        outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-300 hover:shadow-lg',
        ghost: 'text-blue-600 hover:bg-blue-50 focus:ring-blue-300 hover:shadow-sm',
        danger: 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 focus:ring-red-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5',
        success: 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 focus:ring-green-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5',
        warning: 'bg-gradient-to-r from-yellow-600 to-yellow-700 text-white hover:from-yellow-700 hover:to-yellow-800 focus:ring-yellow-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5',
        info: 'bg-gradient-to-r from-cyan-600 to-cyan-700 text-white hover:from-cyan-700 hover:to-cyan-800 focus:ring-cyan-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5',
      },
      size: {
        xs: 'px-2 py-1 text-xs min-h-[28px]',
        sm: 'px-3 py-1.5 text-sm min-h-[32px]',
        default: 'px-6 py-3 text-base min-h-[44px]',
        lg: 'px-8 py-4 text-lg min-h-[52px]',
        xl: 'px-10 py-5 text-xl min-h-[60px]',
        icon: 'h-10 w-10',
      },
      loading: {
        true: 'cursor-not-allowed',
        false: '',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
      loading: false,
      fullWidth: false,
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  loadingText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    loading = false,
    loadingText,
    leftIcon,
    rightIcon,
    fullWidth = false,
    disabled,
    children,
    asChild = false, 
    ...props 
  }, ref) => {
    const isDisabled = disabled || loading

    return (
      <button
        className={cn(buttonVariants({ variant, size, loading, fullWidth, className }))}
        disabled={isDisabled}
        ref={ref}
        {...props}
      >
        {/* Left Icon or Loading Spinner */}
        {loading ? (
          <Loader2 className={cn(
            "animate-spin",
            size === 'xs' ? "h-3 w-3" : 
            size === 'sm' ? "h-4 w-4" :
            size === 'lg' ? "h-6 w-6" :
            size === 'xl' ? "h-7 w-7" :
            "h-5 w-5",
            children || loadingText ? "mr-2" : ""
          )} />
        ) : leftIcon ? (
          <span className={cn(
            size === 'xs' ? "mr-1" :
            size === 'sm' ? "mr-2" :
            "mr-2"
          )}>
            {leftIcon}
          </span>
        ) : null}

        {/* Button Text */}
        {loading && loadingText ? (
          <span className="truncate">{loadingText}</span>
        ) : children ? (
          <span className="truncate">{children}</span>
        ) : null}

        {/* Right Icon */}
        {!loading && rightIcon && (
          <span className={cn(
            size === 'xs' ? "ml-1" :
            size === 'sm' ? "ml-2" :
            "ml-2"
          )}>
            {rightIcon}
          </span>
        )}
      </button>
    )
  }
)
Button.displayName = 'Button'

// Specialized Button Components
export const LoadingButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => <Button {...props} ref={ref} />
)
LoadingButton.displayName = 'LoadingButton'

export const IconButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ size = 'icon', ...props }, ref) => <Button size={size} {...props} ref={ref} />
)
IconButton.displayName = 'IconButton'

export { Button, buttonVariants }