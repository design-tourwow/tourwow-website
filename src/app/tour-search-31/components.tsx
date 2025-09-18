/**
 * UI Components for Tour Search 31
 * Built with new design system, mobile-first, accessible
 */

'use client'

import React, { useState, useRef, useEffect } from 'react'
import { designSystem as ds } from './design-system'

// Icon Component
interface IconProps {
  name: keyof typeof ds.icons
  size?: number | 'xs' | 'sm' | 'lg'
  className?: string
}

export const Icon: React.FC<IconProps> = ({ name, size = 20, className = '' }) => {
  // Support responsive sizes
  const sizeValue = typeof size === 'string' ? 
    (size === 'xs' ? 12 : size === 'sm' ? 16 : size === 'lg' ? 24 : 20) : 
    size;
  const path = ds.icons[name]
  
  return (
    <svg
      width={sizeValue}
      height={sizeValue}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`ts31-icon ${className}`}
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  )
}

// Button Component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  icon?: keyof typeof ds.icons
  iconPosition?: 'left' | 'right'
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = `
    ts31-btn
    inline-flex items-center justify-center gap-2
    font-semibold rounded-lg
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    touch-manipulation
    min-h-[48px] min-w-[48px]
    relative
    -webkit-tap-highlight-color: transparent
    select-none
  `
  
  const variantStyles = {
    primary: 'bg-teal-600 text-white hover:bg-teal-700 active:bg-teal-800 focus:ring-teal-500',
    secondary: 'bg-white text-teal-600 border-2 border-teal-600 hover:bg-teal-50 active:bg-teal-100 focus:ring-teal-500',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 active:bg-gray-200 focus:ring-gray-500'
  }
  
  const sizeStyles = {
    sm: 'px-3 py-2 text-sm sm:text-base',
    md: 'px-4 py-2.5 text-base sm:text-lg',
    lg: 'px-6 py-3 text-lg sm:text-xl'
  }
  
  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="ts31-spinner animate-spin">
          <Icon name="loading" size={16} />
        </span>
      )}
      {!loading && icon && iconPosition === 'left' && <Icon name={icon} size={16} />}
      {children}
      {!loading && icon && iconPosition === 'right' && <Icon name={icon} size={16} />}
    </button>
  )
}

// Input Component
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: keyof typeof ds.icons
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || `ts31-input-${Math.random().toString(36).substr(2, 9)}`
  
  return (
    <div className="ts31-input-wrapper">
      {label && (
        <label htmlFor={inputId} className="block text-base font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Icon name={icon} size={20} />
          </div>
        )}
        <input
          id={inputId}
          className={`
            ts31-input
            w-full px-4 py-3
            ${icon ? 'pl-10' : ''}
            bg-white border rounded-lg
            text-gray-900 placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent
            disabled:bg-gray-50 disabled:text-gray-500
            min-h-[48px]
            text-base sm:text-base
            -webkit-appearance: none
            ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-base text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

// Select Component
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: Array<{ value: string | number; label: string }>
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  options,
  className = '',
  id,
  ...props
}) => {
  const selectId = id || `ts31-select-${Math.random().toString(36).substr(2, 9)}`
  
  return (
    <div className="ts31-select-wrapper">
      {label && (
        <label htmlFor={selectId} className="block text-base font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          className={`
            ts31-select
            w-full px-4 py-3 pr-10
            bg-white border rounded-lg
            text-gray-900
            focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent
            disabled:bg-gray-50 disabled:text-gray-500
            appearance-none
            min-h-[48px]
            text-base sm:text-base
            -webkit-appearance: none
            ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}
            ${className}
          `}
          {...props}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
          <Icon name="chevronDown" size={20} />
        </div>
      </div>
      {error && (
        <p className="mt-1 text-base text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

// Card Component
interface CardProps {
  children: React.ReactNode
  className?: string
  interactive?: boolean
  onClick?: () => void
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  interactive = false,
  onClick
}) => {
  return (
    <div
      className={`
        ts31-card
        bg-white rounded-xl
        border border-gray-200
        overflow-hidden
        transition-all duration-200
        ${interactive ? 'cursor-pointer touch-manipulation' : ''}
        ${className}
      `}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  )
}

// Badge Component
interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'outline'
  className?: string
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  className = ''
}) => {
  const variantStyles = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-teal-100 text-teal-800',
    secondary: 'bg-pink-100 text-pink-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    outline: 'bg-transparent border border-gray-300 text-gray-700'
  }
  
  return (
    <span
      className={`
        ts31-badge
        inline-flex items-center
        px-2.5 py-1
        rounded-full
        text-xs font-semibold
        whitespace-nowrap
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  )
}

// Modal/Drawer Component (Mobile-first)
interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'full'
  position?: 'center' | 'bottom' | 'right'
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  position = 'bottom' // Mobile-first: drawer from bottom
}) => {
  const modalRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])
  
  if (!isOpen) return null
  
  const sizeStyles = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    full: 'max-w-full'
  }
  
  const positionStyles = {
    center: 'items-center justify-center',
    bottom: 'items-end',
    right: 'items-center justify-end'
  }
  
  const contentPositionStyles = {
    center: 'rounded-xl',
    bottom: 'rounded-t-xl sm:rounded-xl',
    right: 'rounded-l-xl h-full'
  }
  
  return (
    <div className="ts31-modal fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal Content */}
      <div className={`relative flex min-h-full ${positionStyles[position]}`}>
        <div
          ref={modalRef}
          className={`
            ts31-modal-content
            bg-white
            ${contentPositionStyles[position]}
            ${sizeStyles[size]}
            w-full
            ${position === 'bottom' ? 'max-h-[85vh] sm:max-h-[90vh]' : 'max-h-[90vh]'}
            overflow-hidden
            shadow-xl
            transform transition-all
            ${position === 'bottom' ? 'animate-slide-up' : ''}
            will-change-transform
          `}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'ts31-modal-title' : undefined}
        >
          {/* Header */}
          {title && (
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 id="ts31-modal-title" className="text-lg font-semibold text-gray-900">
                {title}
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Close modal"
              >
                <Icon name="close" size={20} />
              </button>
            </div>
          )}
          
          {/* Body */}
          <div className="overflow-y-auto flex-1 p-4 overscroll-contain">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

// Tabs Component
interface TabsProps {
  tabs: Array<{ id: string; label: string; icon?: keyof typeof ds.icons }>
  activeTab: string
  onChange: (tabId: string) => void
  className?: string
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  className = ''
}) => {
  return (
    <div className={`ts31-tabs ${className}`} role="tablist">
      <div className="flex overflow-x-auto scrollbar-hide border-b border-gray-200">
        {tabs.map(tab => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`ts31-tabpanel-${tab.id}`}
            className={`
              flex items-center gap-2
              px-4 py-3
              text-base font-medium
              whitespace-nowrap
              transition-all duration-200
              border-b-2
              ${activeTab === tab.id
                ? 'text-teal-600 border-teal-600'
                : 'text-gray-600 border-transparent hover:text-gray-800 hover:border-gray-300'
              }
            `}
            onClick={() => onChange(tab.id)}
          >
            {tab.icon && <Icon name={tab.icon} size={16} />}
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}

// Skeleton Loader Component
interface SkeletonProps {
  width?: string
  height?: string
  className?: string
  variant?: 'text' | 'rect' | 'circle'
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = '20px',
  className = '',
  variant = 'rect'
}) => {
  const variantStyles = {
    text: 'rounded',
    rect: 'rounded-lg',
    circle: 'rounded-full'
  }
  
  return (
    <div
      className={`
        ts31-skeleton
        bg-gray-200
        animate-pulse
        ${variantStyles[variant]}
        ${className}
      `}
      style={{ width, height }}
      aria-hidden="true"
    />
  )
}

// Toast Component
interface ToastProps {
  message: string
  type?: 'info' | 'success' | 'warning' | 'error'
  duration?: number
  onClose: () => void
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  duration = 3000,
  onClose
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])
  
  const typeStyles = {
    info: 'bg-blue-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500'
  }
  
  const icons = {
    info: 'info',
    success: 'success',
    warning: 'warning',
    error: 'error'
  }
  
  return (
    <div
      className={`
        ts31-toast
        fixed bottom-4 right-4 z-50
        flex items-center gap-3
        px-4 py-3
        rounded-lg
        text-white
        shadow-lg
        ${typeStyles[type]}
        animate-slide-up
        max-w-sm
        text-base sm:text-lg
      `}
      role="alert"
    >
      <Icon name={icons[type] as keyof typeof ds.icons} size={20} />
      <span className="text-base font-medium">{message}</span>
      <button
        onClick={onClose}
        className="ml-2 hover:opacity-80 transition-opacity"
        aria-label="Close notification"
      >
        <Icon name="close" size={16} />
      </button>
    </div>
  )
}

// Loading Spinner Component
interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  className = ''
}) => {
  const sizeStyles = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }
  
  return (
    <div
      className={`
        ts31-spinner
        ${sizeStyles[size]}
        border-2 border-gray-200
        border-t-teal-600
        rounded-full
        animate-spin
        ${className}
      `}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}

// Empty State Component
interface EmptyStateProps {
  icon?: keyof typeof ds.icons
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'info',
  title,
  description,
  action
}) => {
  return (
    <div className="ts31-empty-state flex flex-col items-center justify-center py-8 sm:py-12 px-4 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <Icon name={icon} size={32} className="text-gray-400" />
      </div>
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      {description && (
        <p className="text-base text-gray-600 text-center max-w-sm mb-4 leading-relaxed">{description}</p>
      )}
      {action && (
        <Button onClick={action.onClick} variant="primary" size="md">
          {action.label}
        </Button>
      )}
    </div>
  )
}