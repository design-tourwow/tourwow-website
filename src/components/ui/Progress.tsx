'use client'

import React from 'react'
import { CheckCircle, Circle, Clock, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

// Linear Progress Bar
interface ProgressBarProps {
  value: number // 0-100
  max?: number
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'success' | 'warning' | 'error'
  showLabel?: boolean
  label?: string
  animated?: boolean
  striped?: boolean
  className?: string
}

export function ProgressBar({
  value,
  max = 100,
  size = 'md',
  variant = 'default',
  showLabel = false,
  label,
  animated = true,
  striped = false,
  className
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'h-2'
      case 'lg': return 'h-4'
      default: return 'h-3'
    }
  }

  const getVariantClasses = () => {
    switch (variant) {
      case 'success': return 'bg-green-500'
      case 'warning': return 'bg-yellow-500'
      case 'error': return 'bg-red-500'
      default: return 'bg-blue-500'
    }
  }

  return (
    <div className={cn("w-full", className)}>
      {/* Label */}
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            {label || 'ความคืบหน้า'}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round(percentage)}%
          </span>
        </div>
      )}

      {/* Progress Track */}
      <div className={cn(
        "w-full bg-gray-200 rounded-full overflow-hidden",
        getSizeClasses()
      )}>
        {/* Progress Fill */}
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            getVariantClasses(),
            animated && "transition-all duration-500",
            striped && "bg-stripes animate-stripes"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

// Circular Progress
interface CircularProgressProps {
  value: number // 0-100
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'success' | 'warning' | 'error'
  showLabel?: boolean
  label?: string
  thickness?: number
  className?: string
}

export function CircularProgress({
  value,
  size = 'md',
  variant = 'default',
  showLabel = false,
  label,
  thickness,
  className
}: CircularProgressProps) {
  const percentage = Math.min(Math.max(value, 0), 100)

  const getSizeValue = () => {
    switch (size) {
      case 'sm': return 40
      case 'lg': return 80
      case 'xl': return 120
      default: return 60
    }
  }

  const sizeValue = getSizeValue()
  const strokeWidth = thickness || (sizeValue > 60 ? 6 : 4)
  const radius = (sizeValue - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  const getVariantClasses = () => {
    switch (variant) {
      case 'success': return 'text-green-500'
      case 'warning': return 'text-yellow-500'
      case 'error': return 'text-red-500'
      default: return 'text-blue-500'
    }
  }

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg
        width={sizeValue}
        height={sizeValue}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={sizeValue / 2}
          cy={sizeValue / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-gray-200"
        />
        {/* Progress circle */}
        <circle
          cx={sizeValue / 2}
          cy={sizeValue / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={cn(
            "transition-all duration-500 ease-out",
            getVariantClasses()
          )}
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center">
        {showLabel ? (
          <div className="text-center">
            <div className={cn(
              "font-bold",
              size === 'sm' ? "text-xs" :
              size === 'lg' ? "text-lg" :
              size === 'xl' ? "text-xl" :
              "text-sm"
            )}>
              {Math.round(percentage)}%
            </div>
            {label && (
              <div className={cn(
                "text-gray-600",
                size === 'sm' ? "text-xs" :
                size === 'xl' ? "text-sm" :
                "text-xs"
              )}>
                {label}
              </div>
            )}
          </div>
        ) : (
          <span className={cn(
            "font-bold",
            size === 'sm' ? "text-xs" :
            size === 'lg' ? "text-lg" :
            size === 'xl' ? "text-xl" :
            "text-sm"
          )}>
            {Math.round(percentage)}%
          </span>
        )}
      </div>
    </div>
  )
}

// Step Progress
export interface Step {
  id: string
  title: string
  description?: string
  status: 'pending' | 'current' | 'completed' | 'error'
}

interface StepProgressProps {
  steps: Step[]
  currentStep: number
  orientation?: 'horizontal' | 'vertical'
  size?: 'sm' | 'md' | 'lg'
  showConnector?: boolean
  className?: string
}

export function StepProgress({
  steps,
  currentStep,
  orientation = 'horizontal',
  size = 'md',
  showConnector = true,
  className
}: StepProgressProps) {
  const getStepIcon = (step: Step, index: number) => {
    const isActive = index === currentStep
    const isCompleted = step.status === 'completed' || index < currentStep
    const hasError = step.status === 'error'
    
    const iconSize = size === 'sm' ? 'w-6 h-6' : size === 'lg' ? 'w-10 h-10' : 'w-8 h-8'
    const iconClasses = cn(
      'rounded-full flex items-center justify-center border-2 transition-all duration-200',
      iconSize
    )

    if (hasError) {
      return (
        <div className={cn(iconClasses, 'bg-red-500 border-red-500 text-white')}>
          <AlertCircle className={size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />
        </div>
      )
    }

    if (isCompleted) {
      return (
        <div className={cn(iconClasses, 'bg-green-500 border-green-500 text-white')}>
          <CheckCircle className={size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />
        </div>
      )
    }

    if (isActive) {
      return (
        <div className={cn(iconClasses, 'bg-blue-500 border-blue-500 text-white')}>
          <Clock className={size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />
        </div>
      )
    }

    return (
      <div className={cn(iconClasses, 'bg-gray-200 border-gray-300 text-gray-500')}>
        <Circle className={size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />
      </div>
    )
  }

  const getConnectorClasses = (index: number) => {
    const isCompleted = index < currentStep
    return cn(
      'transition-colors duration-200',
      orientation === 'horizontal' ? 'h-0.5 flex-1' : 'w-0.5 h-8',
      isCompleted ? 'bg-green-500' : 'bg-gray-300'
    )
  }

  if (orientation === 'vertical') {
    return (
      <div className={cn("space-y-4", className)}>
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-start space-x-4">
            {/* Step Icon */}
            <div className="flex-shrink-0 flex flex-col items-center">
              {getStepIcon(step, index)}
              {showConnector && index < steps.length - 1 && (
                <div className={cn("mt-4", getConnectorClasses(index))} />
              )}
            </div>

            {/* Step Content */}
            <div className="flex-1 min-w-0">
              <h3 className={cn(
                "font-medium",
                size === 'sm' ? "text-sm" : size === 'lg' ? "text-lg" : "text-base",
                index === currentStep ? "text-blue-900" :
                index < currentStep ? "text-green-900" :
                step.status === 'error' ? "text-red-900" :
                "text-gray-900"
              )}>
                {step.title}
              </h3>
              {step.description && (
                <p className={cn(
                  "mt-1 text-gray-600",
                  size === 'sm' ? "text-xs" : size === 'lg' ? "text-base" : "text-sm"
                )}>
                  {step.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={cn("flex items-center", className)}>
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          {/* Step */}
          <div className="flex flex-col items-center space-y-2">
            {getStepIcon(step, index)}
            <div className="text-center">
              <h3 className={cn(
                "font-medium",
                size === 'sm' ? "text-xs" : size === 'lg' ? "text-base" : "text-sm",
                index === currentStep ? "text-blue-900" :
                index < currentStep ? "text-green-900" :
                step.status === 'error' ? "text-red-900" :
                "text-gray-900"
              )}>
                {step.title}
              </h3>
              {step.description && (
                <p className={cn(
                  "text-gray-600",
                  size === 'sm' ? "text-xs" : "text-sm"
                )}>
                  {step.description}
                </p>
              )}
            </div>
          </div>

          {/* Connector */}
          {showConnector && index < steps.length - 1 && (
            <div className={cn("mx-4", getConnectorClasses(index))} />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

// Loading Progress (Indeterminate)
interface LoadingProgressProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'success' | 'warning' | 'error'
  label?: string
  className?: string
}

export function LoadingProgress({
  size = 'md',
  variant = 'default',
  label,
  className
}: LoadingProgressProps) {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'h-2'
      case 'lg': return 'h-4'
      default: return 'h-3'
    }
  }

  const getVariantClasses = () => {
    switch (variant) {
      case 'success': return 'bg-green-500'
      case 'warning': return 'bg-yellow-500'
      case 'error': return 'bg-red-500'
      default: return 'bg-blue-500'
    }
  }

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <div className="mb-2">
          <span className="text-sm font-medium text-gray-700">{label}</span>
        </div>
      )}
      
      <div className={cn(
        "w-full bg-gray-200 rounded-full overflow-hidden",
        getSizeClasses()
      )}>
        <div
          className={cn(
            "h-full rounded-full animate-pulse",
            getVariantClasses(),
            "animate-loading-progress"
          )}
          style={{
            width: '30%',
            animation: 'loading-progress 2s ease-in-out infinite'
          }}
        />
      </div>
    </div>
  )
}

export default ProgressBar