'use client'

interface LoadingSpinnerProps {
  message?: string
  size?: 'sm' | 'md' | 'lg'
  fullScreen?: boolean
}

export default function LoadingSpinner({ 
  message = "กำลังเตรียมการเดินทาง...", 
  size = 'md',
  fullScreen = false 
}: LoadingSpinnerProps) {
  const spinnerSizes = {
    sm: "w-8 h-8",
    md: "w-12 h-12", 
    lg: "w-16 h-16"
  }

  const textSizes = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-xl"
  }

  const LoadingContent = () => (
    <div className="flex flex-col items-center space-y-4">
      {/* Simple Spinning Circle */}
      <div className={`${spinnerSizes[size]} border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin`}></div>
      
      {/* Loading Text */}
      <p className={`font-medium text-white ${textSizes[size]}`}>
        {message}
      </p>
      
      {/* Animated Dots */}
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100"></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200"></div>
      </div>
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <LoadingContent />
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center p-8">
      <LoadingContent />
    </div>
  )
}

// Quick Loading for Buttons
export function ButtonLoading({ size = 'sm' }: { size?: 'sm' | 'md' }) {
  return (
    <div className="flex items-center space-x-2">
      <div className={`${size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'} border-2 border-transparent border-t-current rounded-full animate-spin`}></div>
      <span>กำลังโหลด...</span>
    </div>
  )
}