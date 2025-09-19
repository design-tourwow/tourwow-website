'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import HeroSearch from './components/HeroSearch'
import FilterSortBar from './components/FilterSortBar'
import FilterDrawer from './components/FilterDrawer'
import ResultsArea from './components/ResultsArea'
import CompareBar from './components/CompareBar'
import CompareSheet from './components/CompareSheet'
import QuickView from './components/QuickView'

function TourSearch18Content() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  // Search state
  const [searchQuery, setSearchQuery] = useState({
    destination: searchParams.get('destination') || '',
    dateRange: searchParams.get('dates') || '',
    duration: searchParams.get('duration') || '',
    priceRange: searchParams.get('price') || '',
    travelers: searchParams.get('travelers') || '2-0'
  })

  // Filter and sort state
  const [filters, setFilters] = useState({
    countries: [],
    months: [],
    tourTypes: [],
    airlines: [],
    features: []
  })
  
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'recommended')
  const [viewMode, setViewMode] = useState(searchParams.get('view') || 'grid')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  
  // Results state
  const [tours, setTours] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalResults, setTotalResults] = useState(0)
  
  // Compare and Quick View state
  const [compareList, setCompareList] = useState([])
  const [isCompareSheetOpen, setIsCompareSheetOpen] = useState(false)
  const [quickViewTour, setQuickViewTour] = useState(null)

  // Initialize with mock data on first load
  useEffect(() => {
    setTours(generateMockTours())
    setTotalResults(48)
  }, [])

  // Update URL when state changes
  useEffect(() => {
    const params = new URLSearchParams()
    if (searchQuery.destination) params.set('destination', searchQuery.destination)
    if (searchQuery.dateRange) params.set('dates', searchQuery.dateRange)
    if (searchQuery.duration) params.set('duration', searchQuery.duration)
    if (searchQuery.priceRange) params.set('price', searchQuery.priceRange)
    if (searchQuery.travelers) params.set('travelers', searchQuery.travelers)
    if (sortBy !== 'recommended') params.set('sort', sortBy)
    if (viewMode !== 'grid') params.set('view', viewMode)
    
    router.replace(`/tour-search-18?${params.toString()}`, { scroll: false })
  }, [searchQuery, sortBy, viewMode, router])

  const handleSearch = async (query) => {
    setSearchQuery(query)
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setTours(generateMockTours())
      setTotalResults(48)
      setLoading(false)
    }, 1000)
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
    // Apply filters to results
  }

  const handleCompareToggle = (tour) => {
    setCompareList(prev => {
      const exists = prev.find(t => t.id === tour.id)
      if (exists) {
        return prev.filter(t => t.id !== tour.id)
      } else if (prev.length < 4) {
        return [...prev, tour]
      }
      return prev
    })
  }

  return (
    <div className="tour-search-page">
      <style jsx global>{`
        :root {
          --color-primary: #0B1F3B;
          --color-accent: #FFB400;
          --color-success: #2E7D32;
          --color-error: #D32F2F;
          --color-info: #1976D2;
          --color-bg: #FFFFFF;
          --color-bg-soft: #F7F9FC;
          --color-border: #E5EAF0;
          --color-text: #1A1D29;
          --color-text-muted: #586077;
          --spacing-xs: 8px;
          --spacing-sm: 12px;
          --spacing-md: 16px;
          --spacing-lg: 24px;
          --spacing-xl: 32px;
          --spacing-2xl: 48px;
          --spacing-3xl: 64px;
          --radius-sm: 8px;
          --radius-md: 12px;
          --shadow-sm: 0 2px 10px rgba(0,0,0,.06);
          --shadow-md: 0 8px 24px rgba(0,0,0,.12);
        }
        
        .tour-search-page {
          min-height: 100vh;
          background: var(--color-bg);
        }
      `}</style>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <HeroSearch 
          initialQuery={searchQuery}
          onSearch={handleSearch}
          loading={loading}
        />
        
        <FilterSortBar
          totalResults={totalResults}
          sortBy={sortBy}
          viewMode={viewMode}
          filters={filters}
          onSortChange={setSortBy}
          onViewChange={setViewMode}
          onFilterToggle={() => setIsFilterOpen(true)}
          onFilterClear={() => setFilters({})}
        />
        
        <div className="flex gap-6">
          <ResultsArea
            tours={tours}
            loading={loading}
            viewMode={viewMode}
            compareList={compareList}
            onCompareToggle={handleCompareToggle}
            onQuickView={setQuickViewTour}
          />
        </div>
      </main>

      {/* Filter Drawer */}
      <FilterDrawer
        isOpen={isFilterOpen}
        filters={filters}
        onClose={() => setIsFilterOpen(false)}
        onApply={handleFilterChange}
      />

      {/* Compare Bar */}
      {compareList.length > 0 && (
        <CompareBar
          compareList={compareList}
          onCompare={() => setIsCompareSheetOpen(true)}
          onClear={() => setCompareList([])}
        />
      )}

      {/* Compare Sheet */}
      <CompareSheet
        isOpen={isCompareSheetOpen}
        tours={compareList}
        onClose={() => setIsCompareSheetOpen(false)}
      />

      {/* Quick View Modal */}
      {quickViewTour && (
        <QuickView
          tour={quickViewTour}
          onClose={() => setQuickViewTour(null)}
        />
      )}
    </div>
  )
}

export default function TourSearch18() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">กำลังโหลด...</p>
        </div>
      </div>
    }>
      <TourSearch18Content />
    </Suspense>
  )
}

// Mock data generator
function generateMockTours() {
  return Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `เที่ยวญี่ปุ่น ${i + 3} วัน ${i + 2} คืน`,
    destination: 'ญี่ปุ่น',
    city: 'โตเกียว-โอซาก้า',
    duration: `${i + 3}D${i + 2}N`,
    price: 39900 + (i * 5000),
    originalPrice: i % 3 === 0 ? 45900 + (i * 5000) : null,
    discount: i % 3 === 0 ? 15 : null,
    rating: 4.5 + (Math.random() * 0.5),
    reviewCount: 120 + (i * 10),
    image: `https://picsum.photos/400/240?random=${i}`,
    highlights: ['วัดทองคำ', 'ภูเขาไฟฟูจิ', 'ดูซากุระ'],
    airline: 'Thai Airways',
    departureMonths: ['มี.ค.', 'เม.ย.', 'พ.ค.'],
    status: i === 2 ? 'sold-out' : i === 5 ? 'limited' : 'available',
    badges: i % 4 === 0 ? ['ยอดนิยม'] : i % 3 === 0 ? ['ลดราคา'] : []
  }))
}