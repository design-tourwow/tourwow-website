interface InlineLoadingSpinnerProps {
  message?: string
  color?: 'blue' | 'red' | 'green' | 'purple' | 'indigo'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function InlineLoadingSpinner({ 
  message = "กำลังโหลด...", 
  color = 'blue',
  size = 'md',
  className = ""
}: InlineLoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6', 
    lg: 'w-8 h-8'
  }

  const colorClasses = {
    blue: `border-${color}-600 border-t-transparent text-${color}-600`,
    red: `border-${color}-600 border-t-transparent text-${color}-600`,
    green: `border-${color}-600 border-t-transparent text-${color}-600`,
    purple: `border-${color}-600 border-t-transparent text-${color}-600`,
    indigo: `border-${color}-600 border-t-transparent text-${color}-600`
  }

  return (
    <div className={`flex justify-center items-center py-12 ${className}`}>
      <div className={`flex items-center space-x-3 text-${color}-600`}>
        <div className={`${sizeClasses[size]} border-2 ${colorClasses[color]} rounded-full animate-spin`}></div>
        <span className="font-medium">{message}</span>
      </div>
    </div>
  )
}