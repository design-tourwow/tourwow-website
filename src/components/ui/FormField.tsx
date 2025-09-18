'use client'

import React, { forwardRef, useState } from 'react'
import { Eye, EyeOff, AlertCircle, CheckCircle, Info, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  success?: string
  hint?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  validation?: 'none' | 'error' | 'success' | 'warning'
  showPasswordToggle?: boolean
  optional?: boolean
  clearable?: boolean
  onClear?: () => void
  loading?: boolean
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(({
  className,
  type = 'text',
  label,
  error,
  success,
  hint,
  leftIcon,
  rightIcon,
  validation = 'none',
  showPasswordToggle = false,
  optional = false,
  clearable = false,
  onClear,
  loading = false,
  value,
  disabled,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  
  const hasError = validation === 'error' || !!error
  const hasSuccess = validation === 'success' || !!success
  const hasWarning = validation === 'warning'
  
  const inputType = showPasswordToggle && type === 'password' 
    ? (showPassword ? 'text' : 'password')
    : type

  const getValidationClasses = () => {
    if (hasError) {
      return 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
    }
    if (hasSuccess) {
      return 'border-green-300 focus:border-green-500 focus:ring-green-500/20'
    }
    if (hasWarning) {
      return 'border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500/20'
    }
    return 'border-gray-300 focus:border-blue-500 focus:ring-blue-500/20'
  }

  const getValidationIcon = () => {
    if (loading) {
      return <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent" />
    }
    if (hasError) {
      return <AlertCircle className="h-4 w-4 text-red-500" />
    }
    if (hasSuccess) {
      return <CheckCircle className="h-4 w-4 text-green-500" />
    }
    if (hasWarning) {
      return <Info className="h-4 w-4 text-yellow-500" />
    }
    return null
  }

  const shouldShowClearButton = clearable && value && !disabled && !loading

  return (
    <div className="space-y-2">
      {/* Label */}
      {label && (
        <label 
          htmlFor={props.id}
          className={cn(
            "block text-sm font-medium transition-colors",
            hasError ? "text-red-700" : 
            hasSuccess ? "text-green-700" :
            hasWarning ? "text-yellow-700" :
            "text-gray-700"
          )}
        >
          {label}
          {optional && (
            <span className="text-gray-500 font-normal ml-1">(ไม่บังคับ)</span>
          )}
        </label>
      )}

      {/* Input Container */}
      <div className="relative">
        {/* Left Icon */}
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className={cn(
              "text-gray-400 transition-colors",
              isFocused && "text-blue-500",
              hasError && "text-red-400",
              hasSuccess && "text-green-400"
            )}>
              {leftIcon}
            </span>
          </div>
        )}

        {/* Input Field */}
        <input
          ref={ref}
          type={inputType}
          value={value}
          disabled={disabled || loading}
          className={cn(
            // Base styles
            "w-full px-3 py-2.5 text-sm rounded-xl border transition-all duration-200",
            "placeholder:text-gray-400 focus:outline-none focus:ring-4",
            "disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed",
            
            // Spacing adjustments
            leftIcon && "pl-10",
            (rightIcon || showPasswordToggle || shouldShowClearButton || getValidationIcon()) && "pr-10",
            
            // Validation styles
            getValidationClasses(),
            
            // Focus styles
            isFocused && "ring-4",
            
            // Size adjustments
            "min-h-[44px]", // Mobile-friendly touch target
            
            className
          )}
          onFocus={(e) => {
            setIsFocused(true)
            props.onFocus?.(e)
          }}
          onBlur={(e) => {
            setIsFocused(false)
            props.onBlur?.(e)
          }}
          {...props}
        />

        {/* Right Icons Container */}
        {(rightIcon || showPasswordToggle || shouldShowClearButton || getValidationIcon()) && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 space-x-1">
            {/* Custom Right Icon */}
            {rightIcon && !showPasswordToggle && !shouldShowClearButton && (
              <span className="text-gray-400">
                {rightIcon}
              </span>
            )}

            {/* Clear Button */}
            {shouldShowClearButton && (
              <button
                type="button"
                onClick={onClear}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-md hover:bg-gray-100"
                tabIndex={-1}
              >
                <X className="h-4 w-4" />
              </button>
            )}

            {/* Password Toggle */}
            {showPasswordToggle && type === 'password' && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-md hover:bg-gray-100"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            )}

            {/* Validation Icon */}
            {getValidationIcon() && (
              <span>
                {getValidationIcon()}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Helper Text */}
      {(error || success || hint) && (
        <div className="space-y-1">
          {error && (
            <p className="text-sm text-red-600 flex items-center animate-in slide-in-from-top-1 duration-200">
              <AlertCircle className="h-4 w-4 mr-1 flex-shrink-0" />
              {error}
            </p>
          )}
          
          {success && !error && (
            <p className="text-sm text-green-600 flex items-center animate-in slide-in-from-top-1 duration-200">
              <CheckCircle className="h-4 w-4 mr-1 flex-shrink-0" />
              {success}
            </p>
          )}
          
          {hint && !error && !success && (
            <p className="text-sm text-gray-500">
              {hint}
            </p>
          )}
        </div>
      )}
    </div>
  )
})

FormField.displayName = 'FormField'

// Specialized Form Components
export const EmailField = forwardRef<HTMLInputElement, Omit<FormFieldProps, 'type' | 'leftIcon'>>(
  (props, ref) => (
    <FormField
      ref={ref}
      type="email"
      leftIcon={<span className="text-sm">@</span>}
      {...props}
    />
  )
)
EmailField.displayName = 'EmailField'

export const PasswordField = forwardRef<HTMLInputElement, Omit<FormFieldProps, 'type' | 'showPasswordToggle'>>(
  (props, ref) => (
    <FormField
      ref={ref}
      type="password"
      showPasswordToggle
      {...props}
    />
  )
)
PasswordField.displayName = 'PasswordField'

export const SearchField = forwardRef<HTMLInputElement, Omit<FormFieldProps, 'type' | 'leftIcon'>>(
  ({ clearable = true, ...props }, ref) => (
    <FormField
      ref={ref}
      type="search"
      leftIcon={<span className="text-lg">🔍</span>}
      clearable={clearable}
      {...props}
    />
  )
)
SearchField.displayName = 'SearchField'

// Textarea Component
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  success?: string
  hint?: string
  validation?: 'none' | 'error' | 'success' | 'warning'
  optional?: boolean
  showCharCount?: boolean
  maxLength?: number
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  className,
  label,
  error,
  success,
  hint,
  validation = 'none',
  optional = false,
  showCharCount = false,
  maxLength,
  value,
  ...props
}, ref) => {
  const hasError = validation === 'error' || !!error
  const hasSuccess = validation === 'success' || !!success
  const hasWarning = validation === 'warning'
  
  const currentLength = String(value || '').length
  const isNearLimit = maxLength && currentLength > maxLength * 0.8

  const getValidationClasses = () => {
    if (hasError) {
      return 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
    }
    if (hasSuccess) {
      return 'border-green-300 focus:border-green-500 focus:ring-green-500/20'
    }
    if (hasWarning) {
      return 'border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500/20'
    }
    return 'border-gray-300 focus:border-blue-500 focus:ring-blue-500/20'
  }

  return (
    <div className="space-y-2">
      {/* Label */}
      {label && (
        <label 
          htmlFor={props.id}
          className={cn(
            "block text-sm font-medium transition-colors",
            hasError ? "text-red-700" : 
            hasSuccess ? "text-green-700" :
            hasWarning ? "text-yellow-700" :
            "text-gray-700"
          )}
        >
          {label}
          {optional && (
            <span className="text-gray-500 font-normal ml-1">(ไม่บังคับ)</span>
          )}
        </label>
      )}

      {/* Textarea */}
      <textarea
        ref={ref}
        value={value}
        maxLength={maxLength}
        className={cn(
          // Base styles
          "w-full px-3 py-2.5 text-sm rounded-xl border transition-all duration-200",
          "placeholder:text-gray-400 focus:outline-none focus:ring-4 resize-y",
          "disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed",
          "min-h-[100px]",
          
          // Validation styles
          getValidationClasses(),
          
          className
        )}
        {...props}
      />

      {/* Character Count */}
      {showCharCount && maxLength && (
        <div className="flex justify-end">
          <span className={cn(
            "text-xs transition-colors",
            isNearLimit ? "text-yellow-600" : "text-gray-500",
            currentLength >= maxLength ? "text-red-600" : ""
          )}>
            {currentLength}/{maxLength}
          </span>
        </div>
      )}

      {/* Helper Text */}
      {(error || success || hint) && (
        <div className="space-y-1">
          {error && (
            <p className="text-sm text-red-600 flex items-center animate-in slide-in-from-top-1 duration-200">
              <AlertCircle className="h-4 w-4 mr-1 flex-shrink-0" />
              {error}
            </p>
          )}
          
          {success && !error && (
            <p className="text-sm text-green-600 flex items-center animate-in slide-in-from-top-1 duration-200">
              <CheckCircle className="h-4 w-4 mr-1 flex-shrink-0" />
              {success}
            </p>
          )}
          
          {hint && !error && !success && (
            <p className="text-sm text-gray-500">
              {hint}
            </p>
          )}
        </div>
      )}
    </div>
  )
})

Textarea.displayName = 'Textarea'

export default FormField