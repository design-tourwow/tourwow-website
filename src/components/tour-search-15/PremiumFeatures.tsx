'use client'

import { Suspense, lazy } from 'react'
import { CheckSquare, Eye, Share2, Bookmark, BarChart3, Flame } from 'lucide-react'

// Lazy load heavy features
const CompareModal = lazy(() => import('./CompareModal').then(module => ({ default: module.CompareModal })))
const QuickViewModal = lazy(() => import('./QuickViewModal').then(module => ({ default: module.QuickViewModal })))
const AdvancedFilters = lazy(() => import('./AdvancedFilters').then(module => ({ default: module.AdvancedFilters })))

interface PremiumFeaturesProps {
  showQuickView: number | null
  setShowQuickView: (id: number | null) => void
  showFilters: boolean
  setShowFilters: (show: boolean) => void
  tours: any[]
  filteredTours: any[]
  onApplyFilters?: (filters: any) => void
  children?: React.ReactNode
}

// Loading skeleton for premium features
function PremiumFeaturesSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-10 bg-slate-200 rounded-lg w-32 mb-4"></div>
      <div className="space-y-3">
        <div className="h-4 bg-slate-200 rounded w-3/4"></div>
        <div className="h-4 bg-slate-200 rounded w-1/2"></div>
        <div className="h-4 bg-slate-200 rounded w-2/3"></div>
      </div>
    </div>
  )
}

export function PremiumFeatures({
  showQuickView,
  setShowQuickView,
  showFilters,
  setShowFilters,
  tours,
  filteredTours,
  onApplyFilters,
  children
}: PremiumFeaturesProps) {
  
  return (
    <div className="premium-features">
      {/* Main content */}
      {children}
      
      {/* Lazy-loaded modals and features */}
      <Suspense fallback={<PremiumFeaturesSkeleton />}>
        {showQuickView && (
          <QuickViewModal
            tourId={showQuickView}
            tours={tours}
            onClose={() => setShowQuickView(null)}
          />
        )}
      </Suspense>

      <Suspense fallback={<PremiumFeaturesSkeleton />}>
        {showFilters && (
          <AdvancedFilters
            onClose={() => setShowFilters(false)}
            tours={tours}
            filteredTours={filteredTours}
            onApplyFilters={onApplyFilters}
          />
        )}
      </Suspense>
    </div>
  )
}

// Premium floating action buttons
interface FloatingActionsProps {
  compareCount: number
  onOpenCompare: () => void
  hasFlashSales: boolean
  onShowFlashSales: () => void
}

export function FloatingActions({ 
  compareCount, 
  onOpenCompare, 
  hasFlashSales, 
  onShowFlashSales 
}: FloatingActionsProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Flash Sales Button */}
      {hasFlashSales && (
        <button
          onClick={onShowFlashSales}
          className="group p-4 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full shadow-2xl hover:shadow-red-500/25 transition-all duration-300 hover:scale-110"
        >
          <div className="relative">
            <Flame className="w-6 h-6" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
            </div>
          </div>
        </button>
      )}

      {/* Compare Button */}
      {compareCount > 0 && (
        <button
          onClick={onOpenCompare}
          className="group relative p-4 bg-purple-500 text-white rounded-full shadow-xl hover:bg-purple-600 transition-all duration-300 hover:scale-110"
        >
          <CheckSquare className="w-6 h-6" />
          <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
            {compareCount}
          </div>
        </button>
      )}
    </div>
  )
}

// Premium stats display
interface PremiumStatsProps {
  totalTours: number
  flashSaleCount: number
  averageRating: number
  totalTravelers: number
}

export function PremiumStats({ 
  totalTours, 
  flashSaleCount, 
  averageRating, 
  totalTravelers 
}: PremiumStatsProps) {
  const stats = [
    { label: 'ทัวร์พรีเมี่ยม', value: totalTours, icon: BarChart3, color: 'blue' },
    { label: 'Flash Sales', value: flashSaleCount, icon: Flame, color: 'red' },
    { label: 'คะแนนเฉลี่ย', value: averageRating.toFixed(1), icon: Eye, color: 'yellow' },
    { label: 'นักเดินทาง', value: `${Math.round(totalTravelers / 1000)}K+`, icon: Bookmark, color: 'green' }
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-2xl p-4 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${
              stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
              stat.color === 'red' ? 'bg-red-100 text-red-600' :
              stat.color === 'yellow' ? 'bg-yellow-100 text-yellow-600' :
              'bg-green-100 text-green-600'
            }`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-xs text-slate-600">{stat.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}