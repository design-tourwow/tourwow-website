import { Plane } from 'lucide-react'

interface LoadingScreenProps {
  title?: string
  subtitle?: string
  className?: string
}

export default function LoadingScreen({ 
  title = "กำลังโหลด...", 
  subtitle = "โปรดรอสักครู่... กำลังดึงข้อมูลล่าสุด",
  className = ""
}: LoadingScreenProps) {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 ${className}`}>
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <Plane className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-blue-600 animate-pulse" />
          </div>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-blue-900 mb-3">{title}</h2>
            <p className="text-blue-600 text-lg">{subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  )
}