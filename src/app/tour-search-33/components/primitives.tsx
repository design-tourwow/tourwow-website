'use client'

// TS33 UI Primitives - Complete isolated component library
// All states, accessibility, and mobile-first design

import React, { forwardRef, ButtonHTMLAttributes, InputHTMLAttributes, ReactNode, useState, useEffect, useId } from 'react'
import { TS33_DESIGN_TOKENS, ts33 } from '../lib/design-tokens'

// ======================
// Button Component
// ======================

interface TS33ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  children: ReactNode
}

export const TS33Button = forwardRef<HTMLButtonElement, TS33ButtonProps>(
  ({ variant = 'primary', size = 'md', loading = false, leftIcon, rightIcon, children, className = '', disabled, ...props }, ref) => {
    const baseStyles = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: ts33.space(2),
      fontWeight: TS33_DESIGN_TOKENS.typography.weights.medium,
      borderRadius: ts33.radius('md'),
      border: 'none',
      cursor: disabled || loading ? 'not-allowed' : 'pointer',
      transition: `all ${TS33_DESIGN_TOKENS.motion.durations.fast} ${TS33_DESIGN_TOKENS.motion.easings.default}`,
      outline: 'none',
      fontSize: size === 'sm' ? TS33_DESIGN_TOKENS.typography.sizes.sm : 
                size === 'lg' ? TS33_DESIGN_TOKENS.typography.sizes.lg : 
                TS33_DESIGN_TOKENS.typography.sizes.base,
      height: TS33_DESIGN_TOKENS.components.button.height[size],
      padding: TS33_DESIGN_TOKENS.components.button.padding[size],
      minHeight: '44px', // Touch target
      minWidth: '44px',
      opacity: disabled || loading ? 0.6 : 1
    }

    const variantStyles = {
      primary: {
        backgroundColor: ts33.color('primary.500'),
        color: ts33.color('text.inverse'),
        '&:hover:not(:disabled)': {
          backgroundColor: ts33.color('primary.600'),
          transform: 'translateY(-1px)',
          boxShadow: ts33.shadow('md')
        },
        '&:active:not(:disabled)': {
          transform: 'translateY(0)',
          backgroundColor: ts33.color('primary.700')
        },
        '&:focusVisible': {
          boxShadow: `0 0 0 3px ${ts33.color('primary.200')}`
        }
      },
      secondary: {
        backgroundColor: ts33.color('secondary.500'),
        color: ts33.color('text.inverse'),
        '&:hover:not(:disabled)': {
          backgroundColor: ts33.color('secondary.600'),
          transform: 'translateY(-1px)'
        }
      },
      outline: {
        backgroundColor: 'transparent',
        color: ts33.color('primary.500'),
        border: `2px solid ${ts33.color('primary.500')}`,
        '&:hover:not(:disabled)': {
          backgroundColor: ts33.color('primary.50'),
          borderColor: ts33.color('primary.600')
        }
      },
      ghost: {
        backgroundColor: 'transparent',
        color: ts33.color('text.primary'),
        '&:hover:not(:disabled)': {
          backgroundColor: ts33.color('surface.tertiary')
        }
      },
      danger: {
        backgroundColor: ts33.color('status.error'),
        color: ts33.color('text.inverse'),
        '&:hover:not(:disabled)': {
          backgroundColor: '#dc2626'
        }
      }
    }

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`ts33-button ts33-button--${variant} ts33-button--${size} ${className}`}
        style={{
          ...baseStyles,
          ...variantStyles[variant]
        }}
        aria-disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <div 
            className="ts33-spinner"
            style={{
              width: '16px',
              height: '16px',
              border: '2px solid currentColor',
              borderTop: '2px solid transparent',
              borderRadius: '50%',
              animation: 'ts33-spin 1s linear infinite'
            }}
            aria-hidden="true"
          />
        )}
        {!loading && leftIcon && <span aria-hidden="true">{leftIcon}</span>}
        {children}
        {!loading && rightIcon && <span aria-hidden="true">{rightIcon}</span>}
      </button>
    )
  }
)

TS33Button.displayName = 'TS33Button'

// ======================
// Input Component
// ======================

interface TS33InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'sm' | 'md' | 'lg'
  error?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  label?: string
  helperText?: string
}

export const TS33Input = forwardRef<HTMLInputElement, TS33InputProps>(
  ({ size = 'md', error, leftIcon, rightIcon, label, helperText, className = '', id, ...props }, ref) => {
    // Use React's useId for consistent ID generation between server and client
    const generatedId = useId()
    const inputId = id || `ts33-input-${generatedId}`
    const hasError = Boolean(error)

    const containerStyles = {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: ts33.space(2)
    }

    const inputWrapperStyles = {
      position: 'relative' as const,
      display: 'flex',
      alignItems: 'center'
    }

    const inputStyles = {
      width: '100%',
      height: TS33_DESIGN_TOKENS.components.input.height[size],
      padding: leftIcon || rightIcon ? 
        `0 ${leftIcon && rightIcon ? '3rem' : '2.5rem'} 0 ${leftIcon ? '2.5rem' : '1rem'}` :
        `0 ${ts33.space(4)}`,
      border: `1px solid ${hasError ? ts33.color('status.error') : ts33.color('border.primary')}`,
      borderRadius: ts33.radius('md'),
      fontSize: TS33_DESIGN_TOKENS.typography.sizes.base,
      backgroundColor: ts33.color('surface.primary'),
      color: ts33.color('text.primary'),
      outline: 'none',
      transition: `all ${TS33_DESIGN_TOKENS.motion.durations.fast}`,
      '&:focus': {
        borderColor: hasError ? ts33.color('status.error') : ts33.color('border.focus'),
        boxShadow: `0 0 0 3px ${hasError ? 'rgba(239, 68, 68, 0.1)' : 'rgba(59, 130, 246, 0.1)'}`
      },
      '&:disabled': {
        backgroundColor: ts33.color('surface.tertiary'),
        color: ts33.color('text.muted'),
        cursor: 'not-allowed'
      },
      '&::placeholder': {
        color: ts33.color('text.tertiary')
      }
    }

    const iconStyles = {
      position: 'absolute' as const,
      top: '50%',
      transform: 'translateY(-50%)',
      color: ts33.color('text.tertiary'),
      zIndex: 1,
      width: '16px',
      height: '16px'
    }

    return (
      <div style={containerStyles} className={className}>
        {label && (
          <label 
            htmlFor={inputId}
            style={{
              fontSize: TS33_DESIGN_TOKENS.typography.sizes.sm,
              fontWeight: TS33_DESIGN_TOKENS.typography.weights.medium,
              color: ts33.color('text.primary')
            }}
          >
            {label}
          </label>
        )}
        
        <div style={inputWrapperStyles}>
          {leftIcon && (
            <span style={{ ...iconStyles, left: ts33.space(3) }} aria-hidden="true">
              {leftIcon}
            </span>
          )}
          
          <input
            ref={ref}
            id={inputId}
            style={inputStyles}
            aria-invalid={hasError}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            {...props}
          />
          
          {rightIcon && (
            <span style={{ ...iconStyles, right: ts33.space(3) }} aria-hidden="true">
              {rightIcon}
            </span>
          )}
        </div>
        
        {error && (
          <span 
            id={`${inputId}-error`}
            role="alert"
            style={{
              fontSize: TS33_DESIGN_TOKENS.typography.sizes.sm,
              color: ts33.color('status.error')
            }}
          >
            {error}
          </span>
        )}
        
        {helperText && !error && (
          <span 
            id={`${inputId}-helper`}
            style={{
              fontSize: TS33_DESIGN_TOKENS.typography.sizes.sm,
              color: ts33.color('text.tertiary')
            }}
          >
            {helperText}
          </span>
        )}
      </div>
    )
  }
)

TS33Input.displayName = 'TS33Input'

// ======================
// Card Component
// ======================

interface TS33CardProps {
  children: ReactNode
  variant?: 'default' | 'elevated' | 'outlined'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
  hover?: boolean
}

export const TS33Card: React.FC<TS33CardProps> = ({ 
  children, 
  variant = 'default', 
  padding = 'md',
  className = '',
  onClick,
  hover = false
}) => {
  const baseStyles = {
    borderRadius: ts33.radius('lg'),
    backgroundColor: ts33.color('surface.primary'),
    transition: `all ${TS33_DESIGN_TOKENS.motion.durations.normal}`,
    cursor: onClick ? 'pointer' : 'default'
  }

  const variantStyles = {
    default: {
      border: `1px solid ${ts33.color('border.primary')}`
    },
    elevated: {
      boxShadow: ts33.shadow('md'),
      border: 'none'
    },
    outlined: {
      border: `2px solid ${ts33.color('border.secondary')}`
    }
  }

  const paddingStyles = {
    none: {},
    sm: { padding: ts33.space(3) },  // 12px (ลดจาก 16px)
    md: { padding: ts33.space(4) },  // 16px (ลดจาก 24px)
    lg: { padding: ts33.space(5) }   // 20px (ลดจาก 32px)
  }

  const hoverStyles = hover || onClick ? {
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: variant === 'elevated' ? ts33.shadow('lg') : ts33.shadow('md')
    }
  } : {}

  return (
    <div
      className={`ts33-card ts33-card--${variant} ${className}`}
      style={{
        ...baseStyles,
        ...variantStyles[variant],
        ...paddingStyles[padding],
        ...hoverStyles
      }}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      } : undefined}
    >
      {children}
    </div>
  )
}

// ======================
// Badge Component
// ======================

interface TS33BadgeProps {
  children: ReactNode
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'promotion'
  size?: 'sm' | 'md'
  className?: string
}

export const TS33Badge: React.FC<TS33BadgeProps> = ({ 
  children, 
  variant = 'default', 
  size = 'md',
  className = ''
}) => {
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    paddingLeft: size === 'sm' ? ts33.space(2) : ts33.space(3),
    paddingRight: size === 'sm' ? ts33.space(2) : ts33.space(3),
    paddingTop: size === 'sm' ? ts33.space(1) : ts33.space(2),
    paddingBottom: size === 'sm' ? ts33.space(1) : ts33.space(2),
    borderRadius: ts33.radius('full'),
    fontSize: size === 'sm' ? TS33_DESIGN_TOKENS.typography.sizes.xs : TS33_DESIGN_TOKENS.typography.sizes.sm,
    fontWeight: TS33_DESIGN_TOKENS.typography.weights.medium,
    lineHeight: TS33_DESIGN_TOKENS.typography.lineHeights.tight
  }

  const variantStyles = {
    default: {
      backgroundColor: ts33.color('surface.tertiary'),
      color: ts33.color('text.secondary')
    },
    primary: {
      backgroundColor: ts33.color('primary.100'),
      color: ts33.color('primary.700')
    },
    success: {
      backgroundColor: ts33.color('secondary.100'),
      color: ts33.color('secondary.700')
    },
    warning: {
      backgroundColor: '#fef3c7',
      color: '#92400e'
    },
    error: {
      backgroundColor: '#fee2e2',
      color: '#dc2626'
    },
    promotion: {
      backgroundColor: ts33.color('feature.promotion'),
      color: ts33.color('text.inverse')
    }
  }

  return (
    <span
      className={`ts33-badge ts33-badge--${variant} ts33-badge--${size} ${className}`}
      style={{
        ...baseStyles,
        ...variantStyles[variant]
      }}
    >
      {children}
    </span>
  )
}

// ======================
// Skeleton Component
// ======================

interface TS33SkeletonProps {
  width?: string | number
  height?: string | number
  className?: string
  shimmer?: boolean
}

export const TS33Skeleton: React.FC<TS33SkeletonProps> = ({ 
  width = '100%', 
  height = '1rem',
  className = '',
  shimmer = true
}) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const baseStyles = {
    display: 'block',
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    backgroundColor: ts33.color('surface.tertiary'),
    borderRadius: ts33.radius('sm'),
    position: 'relative' as const,
    overflow: 'hidden'
  }

  const shimmerStyles = shimmer && mounted ? {
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
      animation: 'ts33-shimmer 1.5s infinite'
    }
  } : {}

  return (
    <div
      className={`ts33-skeleton ${className}`}
      style={{
        ...baseStyles,
        ...shimmerStyles
      }}
      aria-hidden="true"
    />
  )
}

// ======================
// Modal Component
// ======================

interface TS33ModalProps {
  open: boolean
  onClose: () => void
  children: ReactNode
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  closeOnOverlayClick?: boolean
}

export const TS33Modal: React.FC<TS33ModalProps> = ({
  open,
  onClose,
  children,
  title,
  size = 'md',
  closeOnOverlayClick = true
}) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [open])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [open, onClose])

  if (!open) return null

  const sizeStyles = {
    sm: { maxWidth: '24rem' },
    md: { maxWidth: '32rem' },
    lg: { maxWidth: '48rem' },
    xl: { maxWidth: '64rem' }
  }

  const overlayStyles = {
    position: 'fixed' as const,
    inset: 0,
    backgroundColor: ts33.color('surface.overlay'),
    backdropFilter: TS33_DESIGN_TOKENS.components.modal.backdropBlur,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: ts33.space(4),
    zIndex: TS33_DESIGN_TOKENS.zIndex.modal
  }

  const contentStyles = {
    backgroundColor: ts33.color('surface.primary'),
    borderRadius: ts33.radius('xl'),
    boxShadow: ts33.shadow('xl'),
    width: '100%',
    maxHeight: '90vh',
    overflow: 'auto',
    ...sizeStyles[size]
  }

  return (
    <div
      style={overlayStyles}
      onClick={closeOnOverlayClick ? onClose : undefined}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'ts33-modal-title' : undefined}
    >
      <div
        style={contentStyles}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div style={{ 
            padding: `${ts33.space(6)} ${ts33.space(6)} ${ts33.space(4)}`,
            borderBottom: `1px solid ${ts33.color('border.primary')}`
          }}>
            <h2 
              id="ts33-modal-title"
              style={{
                margin: 0,
                fontSize: TS33_DESIGN_TOKENS.typography.sizes.xl,
                fontWeight: TS33_DESIGN_TOKENS.typography.weights.semibold,
                color: ts33.color('text.primary')
              }}
            >
              {title}
            </h2>
          </div>
        )}
        <div style={{ padding: ts33.space(6) }}>
          {children}
        </div>
      </div>
    </div>
  )
}

// ======================
// Toast Component
// ======================

interface TS33ToastProps {
  message: string
  type?: 'success' | 'error' | 'warning' | 'info'
  duration?: number
  onClose?: () => void
}

export const TS33Toast: React.FC<TS33ToastProps> = ({
  message,
  type = 'info',
  duration = 5000,
  onClose
}) => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      setTimeout(() => onClose?.(), 300)
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const typeStyles = {
    success: {
      backgroundColor: ts33.color('secondary.500'),
      color: ts33.color('text.inverse')
    },
    error: {
      backgroundColor: ts33.color('status.error'),
      color: ts33.color('text.inverse')
    },
    warning: {
      backgroundColor: ts33.color('status.warning'),
      color: ts33.color('text.inverse')
    },
    info: {
      backgroundColor: ts33.color('primary.500'),
      color: ts33.color('text.inverse')
    }
  }

  const toastStyles = {
    position: 'fixed' as const,
    bottom: ts33.space(6),
    right: ts33.space(6),
    padding: `${ts33.space(4)} ${ts33.space(6)}`,
    borderRadius: ts33.radius('lg'),
    boxShadow: ts33.shadow('lg'),
    fontSize: TS33_DESIGN_TOKENS.typography.sizes.sm,
    fontWeight: TS33_DESIGN_TOKENS.typography.weights.medium,
    zIndex: TS33_DESIGN_TOKENS.zIndex.tooltip,
    transform: visible ? 'translateY(0)' : 'translateY(100%)',
    opacity: visible ? 1 : 0,
    transition: `all ${TS33_DESIGN_TOKENS.motion.durations.normal}`,
    ...typeStyles[type]
  }

  return (
    <div
      style={toastStyles}
      role="alert"
      aria-live="polite"
    >
      {message}
    </div>
  )
}

// Global CSS for animations
export const TS33GlobalStyles = `
  @keyframes ts33-spin {
    to {
      transform: rotate(360deg);
    }
  }
  
  @keyframes ts33-shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
  
  .ts33-component {
    font-family: ${TS33_DESIGN_TOKENS.typography.fonts.sans.join(', ')};
  }
  
  /* Focus visible styles */
  .ts33-button:focus-visible,
  .ts33-card[role="button"]:focus-visible {
    outline: 2px solid ${ts33.color('primary.500')};
    outline-offset: 2px;
  }
  
  /* Smooth scrolling for mobile */
  .ts33-scroll-container {
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  
  .ts33-scroll-container::-webkit-scrollbar {
    display: none;
  }
`