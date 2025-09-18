import React from 'react'

interface SkeletonProps {
  className?: string
  width?: string | number
  height?: string | number
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'
  animation?: 'pulse' | 'wave' | 'shimmer' | 'none'
  variant?: 'default' | 'text' | 'circular' | 'card'
}

export function Skeleton({ 
  className = '', 
  width, 
  height, 
  rounded = 'md',
  animation = 'pulse',
  variant = 'default'
}: SkeletonProps) {
  const roundedClasses = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
    full: 'rounded-full'
  }

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-shimmer',
    shimmer: 'animate-shimmer bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]',
    none: ''
  }

  const variantClasses = {
    default: 'bg-gray-200',
    text: 'bg-gray-200 h-4',
    circular: 'bg-gray-200 rounded-full',
    card: 'bg-white shadow-lg'
  }

  const style: React.CSSProperties = {}
  if (width) style.width = typeof width === 'number' ? `${width}px` : width
  if (height) style.height = typeof height === 'number' ? `${height}px` : height

  return (
    <div
      className={`
        ${animation === 'shimmer' ? animationClasses.shimmer : `${variantClasses[variant]} ${animationClasses[animation]}`}
        ${variant !== 'circular' ? roundedClasses[rounded] : 'rounded-full'}
        ${className}
      `}
      style={style}
    />
  )
}

// Enhanced Skeleton Text Component
export function SkeletonText({ 
  lines = 1, 
  className = "",
  lastLineWidth = "75%",
  lineHeight = "h-4",
  gap = "space-y-2"
}: { 
  lines?: number
  className?: string
  lastLineWidth?: string
  lineHeight?: string
  gap?: string
}) {
  return (
    <div className={`${gap} ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          variant="text"
          className={`
            ${lineHeight} 
            ${index === lines - 1 && lines > 1 ? 'w-3/4' : 'w-full'}
          `}
          style={index === lines - 1 && lines > 1 ? { width: lastLineWidth } : undefined}
        />
      ))}
    </div>
  )
}

export function TourCardSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-white rounded-3xl shadow-xl overflow-hidden ${className}`}>
      {/* Image with badges */}
      <div className="relative h-64">
        <Skeleton className="h-full w-full" animation="shimmer" />
        
        {/* Duration badge */}
        <div className="absolute top-4 left-4">
          <Skeleton className="h-10 w-20" rounded="xl" />
        </div>
        
        {/* Price badge */}
        <div className="absolute top-4 right-4">
          <Skeleton className="h-16 w-24" rounded="2xl" />
        </div>
        
        {/* Availability badge */}
        <div className="absolute bottom-4 left-4">
          <Skeleton className="h-6 w-20" rounded="full" />
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6 md:p-8 space-y-4">
        {/* Title */}
        <div className="space-y-2">
          <Skeleton className="h-7 w-full" />
          <Skeleton className="h-6 w-3/4" />
        </div>
        
        {/* Location & Airline */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Skeleton variant="circular" className="h-5 w-5" />
            <Skeleton className="h-5 w-32" />
          </div>
          
          <div className="flex items-center space-x-2">
            <Skeleton variant="circular" className="h-5 w-5" />
            <Skeleton className="h-5 w-40" />
          </div>
        </div>
        
        {/* Rating */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-4 w-20" />
            <div className="flex space-x-1">
              {[1,2,3,4,5].map(i => (
                <Skeleton key={i} variant="circular" className="h-4 w-4" />
              ))}
            </div>
            <Skeleton className="h-4 w-8" />
          </div>
          <div className="flex items-center space-x-2">
            <Skeleton variant="circular" className="h-4 w-4" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
        
        {/* Description */}
        <SkeletonText lines={3} gap="space-y-2" />
        
        {/* Travel dates section */}
        <div className="pt-4 border-t border-gray-100 space-y-3">
          <div className="flex items-center space-x-2">
            <Skeleton variant="circular" className="h-4 w-4" />
            <Skeleton className="h-5 w-32" />
          </div>
          
          {/* Month tabs */}
          <div className="flex gap-2 overflow-hidden">
            {[1,2,3,4].map(i => (
              <Skeleton key={i} className="h-10 w-20" rounded="xl" />
            ))}
          </div>
          
          {/* Date periods */}
          <div className="space-y-2 max-h-32">
            {[1,2,3].map(i => (
              <div key={i} className="flex justify-between items-center">
                <Skeleton className="h-8 w-40" rounded="xl" />
                <Skeleton className="h-6 w-20" />
              </div>
            ))}
          </div>
        </div>
        
        {/* CTA Button */}
        <div className="mt-6">
          <Skeleton className="h-14 w-full" rounded="2xl" animation="shimmer" />
        </div>
      </div>
    </div>
  )
}

export function HeroSkeleton() {
  return (
    <div className="relative h-screen flex items-center justify-center">
      <Skeleton className="absolute inset-0" />
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <Skeleton className="h-16 w-96 mx-auto mb-6" />
        <Skeleton className="h-8 w-2/3 mx-auto mb-8" />
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Skeleton className="h-12 w-32" />
          <Skeleton className="h-12 w-32" />
        </div>
      </div>
    </div>
  )
}

export function TourDetailSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <Skeleton className="h-96 w-full mb-4" />
          <div className="grid grid-cols-3 gap-2">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
        <div>
          <Skeleton className="h-8 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-6" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-2/3 mb-6" />
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    </div>
  )
} 