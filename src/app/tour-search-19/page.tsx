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
import './mobile-atf.css'

function TourSearch19Content() {
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

  // Mobile filter sheet state
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false)

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
    
    router.replace(`/tour-search-19?${params.toString()}`, { scroll: false })
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

  // Mobile filter sheet functions
  const openFilterSheet = () => {
    setIsFilterSheetOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeFilterSheet = () => {
    setIsFilterSheetOpen(false)
    document.body.style.overflow = ''
  }

  const applyMobileFilters = () => {
    // Apply the filters from the sheet
    closeFilterSheet()
    // Trigger search with current query
    handleSearch(searchQuery)
  }

  // Handle mobile interactions and advanced filter events
  useEffect(() => {
    const isMobile = () => window.matchMedia('(max-width: 767px)').matches
    
    const handleMobileButtonClick = (e) => {
      const button = e.target.closest('.search-btn-secondary')
      if (button && isMobile()) {
        e.preventDefault()
        openFilterSheet()
      }
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isFilterSheetOpen) {
        closeFilterSheet()
      }
    }


    // Adapt button text based on screen size
    const adaptMobileLabels = () => {
      const secondaryBtn = document.querySelector('.search-btn-secondary')
      if (secondaryBtn && isMobile()) {
        secondaryBtn.textContent = 'ฟิลเตอร์เพิ่มเติม'
      } else if (secondaryBtn) {
        secondaryBtn.textContent = 'รีเซ็ต'
      }
    }

    // Add event listeners
    document.addEventListener('click', handleMobileButtonClick)
    document.addEventListener('keydown', handleKeyDown)
    window.addEventListener('resize', adaptMobileLabels)
    
    // Initial setup
    adaptMobileLabels()

    return () => {
      document.removeEventListener('click', handleMobileButtonClick)
      document.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', adaptMobileLabels)
    }
  }, [isFilterSheetOpen])

  return (
    <div className="tour-search-page">
      <style jsx global>{`
        :root {
          /* Design tokens per specification */
          --c-primary: #0B1F3B;
          --c-accent: #FFB400;
          --c-text: #1A1D29;
          --c-muted: #586077;
          --c-border: #E5EAF0;
          --c-bg: #fff;
          --c-soft: #F7F9FC;
          
          /* Legacy compatibility */
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
          
          /* Font sizes */
          --fs-sm: 12px;
          --fs-base: 16px;
          --fs-lg: 18px;
          
          /* Spacing */
          --s-1: 8px;
          --s-2: 12px;
          --s-3: 16px;
          --s-4: 24px;
          
          /* Radius */
          --r-2: 8px;
          --r-3: 12px;
          
          /* Shadows */
          --shadow-1: 0 2px 10px rgba(0,0,0,.06);
          
          /* Legacy spacing for compatibility */
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
          --shadow-2: 0 8px 24px rgba(0,0,0,.12);

          /* Mobile ATF control variables */
          --search-max-h-mobile: clamp(90px, 22dvh, 150px);
          --search-max-h-tablet: clamp(140px, 24dvh, 200px);
          --search-max-h-desktop: clamp(120px, 20dvh, 180px);

          /* Filter bar height */
          --bar-h-mobile: 48px;
          --bar-h-desktop: 56px;
        }
        
        .tour-search-page {
          min-height: 100vh;
          background: var(--color-bg);
        }

        /* Bottom Sheet Styles */
        .filter-sheet[hidden] { 
          display: none; 
        }
        .filter-sheet__backdrop {
          position: fixed; 
          inset: 0; 
          background: rgba(0,0,0,.4);
          z-index: 100;
        }
        .filter-sheet__panel {
          position: fixed; 
          left: 0; 
          right: 0; 
          bottom: 0;
          background: #fff; 
          border-radius: 16px 16px 0 0;
          box-shadow: var(--shadow-2);
          padding: 16px; 
          max-height: 75dvh; 
          overflow: auto;
          z-index: 101;
        }
        .filter-sheet__header { 
          display: flex; 
          justify-content: space-between; 
          align-items: center; 
          margin-bottom: 12px; 
        }
        .filter-sheet__close {
          background: none;
          border: none;
          font-size: 18px;
          cursor: pointer;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: background-color 150ms ease;
        }
        .filter-sheet__close:hover {
          background: var(--c-bg-soft);
        }
        .filter-sheet__footer { 
          display: flex; 
          justify-content: flex-end; 
          margin-top: 12px; 
        }
        .apply-btn { 
          background: var(--c-accent); 
          color: #1A1D29; 
          border: none; 
          border-radius: 10px; 
          height: 40px; 
          padding: 0 16px; 
          font-weight: 600; 
          cursor: pointer;
          transition: filter 150ms ease;
        }
        .apply-btn:hover {
          filter: brightness(0.98);
        }
        .sheet-field {
          margin-bottom: 16px;
        }
        .sheet-field:last-child {
          margin-bottom: 0;
        }
        .search-label {
          display: block;
          font-size: var(--fs-sm);
          color: var(--c-muted);
          margin: 0 0 4px;
          line-height: 1.3;
        }
        .search-input {
          width: 100%;
          height: 40px;
          padding: 8px 12px;
          border: 1px solid var(--c-border);
          border-radius: var(--r-2);
          font-size: var(--fs-base);
          line-height: 1.3;
          background: var(--c-bg);
        }
        .travelers-controls {
          background: var(--c-bg);
          border: 1px solid var(--c-border);
          border-radius: var(--r-2);
          padding: 12px;
        }
        .traveler-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        .traveler-row:last-child {
          margin-bottom: 0;
        }
        .counter-controls {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .counter-btn {
          width: 32px;
          height: 32px;
          border: 1px solid var(--c-border);
          border-radius: 50%;
          background: var(--c-bg);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 150ms ease;
        }
        .counter-btn:hover {
          background: var(--c-bg-soft);
          border-color: var(--color-primary);
        }
        .counter-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .counter-display {
          min-width: 24px;
          text-align: center;
          font-weight: 500;
        }
      `}</style>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <HeroSearch 
          initialQuery={searchQuery}
          onSearch={handleSearch}
          onFilterToggle={() => setIsFilterOpen(true)}
          loading={loading}
        />
        
        <FilterSortBar
          totalResults={totalResults}
          sortBy={sortBy}
          viewMode={viewMode}
          filters={filters}
          onSortChange={setSortBy}
          onViewChange={setViewMode}
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

      {/* Mobile Filter Sheet */}
      <div className="filter-sheet" style={{ display: isFilterSheetOpen ? 'block' : 'none' }}>
        <div className="filter-sheet__backdrop" onClick={closeFilterSheet}></div>
        <div className="filter-sheet__panel" role="dialog" aria-modal="true" aria-label="ฟิลเตอร์เพิ่มเติม">
          <div className="filter-sheet__header">
            <strong>ฟิลเตอร์เพิ่มเติม</strong>
            <button className="filter-sheet__close" aria-label="ปิด" onClick={closeFilterSheet}>✕</button>
          </div>
          <div className="filter-sheet__body">
            <div className="sheet-field">
              <label className="search-label">ระยะเวลา</label>
              <select className="search-input" value={searchQuery.duration} onChange={(e) => setSearchQuery(prev => ({ ...prev, duration: e.target.value }))}>
                <option value="">เลือกระยะเวลา</option>
                <option value="3D2N">3 วัน 2 คืน</option>
                <option value="4D3N">4 วัน 3 คืน</option>
                <option value="5D4N">5 วัน 4 คืน</option>
                <option value="6D5N">6 วัน 5 คืน</option>
                <option value="7D6N">7 วัน 6 คืน</option>
                <option value="8D7N">8 วัน 7 คืน</option>
              </select>
            </div>
            <div className="sheet-field">
              <label className="search-label">ช่วงราคา (บาท)</label>
              <input
                type="text"
                className="search-input"
                placeholder="เช่น 30000-50000"
                value={searchQuery.priceRange}
                onChange={(e) => setSearchQuery(prev => ({ ...prev, priceRange: e.target.value }))}
              />
            </div>
            <div className="sheet-field">
              <label className="search-label">จำนวนผู้เดินทาง</label>
              <div className="travelers-controls">
                <div className="traveler-row">
                  <span>ผู้ใหญ่</span>
                  <div className="counter-controls">
                    <button className="counter-btn" onClick={() => {
                      const [adults, children] = searchQuery.travelers.split('-').map(Number)
                      setSearchQuery(prev => ({ ...prev, travelers: `${Math.max(0, adults - 1)}-${children}` }))
                    }}>-</button>
                    <span className="counter-display">{searchQuery.travelers.split('-')[0]}</span>
                    <button className="counter-btn" onClick={() => {
                      const [adults, children] = searchQuery.travelers.split('-').map(Number)
                      setSearchQuery(prev => ({ ...prev, travelers: `${adults + 1}-${children}` }))
                    }}>+</button>
                  </div>
                </div>
                <div className="traveler-row">
                  <span>เด็ก</span>
                  <div className="counter-controls">
                    <button className="counter-btn" onClick={() => {
                      const [adults, children] = searchQuery.travelers.split('-').map(Number)
                      setSearchQuery(prev => ({ ...prev, travelers: `${adults}-${Math.max(0, children - 1)}` }))
                    }}>-</button>
                    <span className="counter-display">{searchQuery.travelers.split('-')[1]}</span>
                    <button className="counter-btn" onClick={() => {
                      const [adults, children] = searchQuery.travelers.split('-').map(Number)
                      setSearchQuery(prev => ({ ...prev, travelers: `${adults}-${children + 1}` }))
                    }}>+</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="filter-sheet__footer">
            <button className="apply-btn" onClick={applyMobileFilters}>ใช้ฟิลเตอร์</button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Enhanced mock data generator with new fields
function generateMockTours() {
  const specialOfferTypes = ['early-bird', 'last-minute', 'limited-time', null]
  const urgencyMessages = [
    'เหลือที่ว่างเพียง 2 ที่!',
    'โปรโมชั่นสิ้นสุด 15 ม.ค.',
    'มีคนจอง 247 คนในสัปดาห์นี้',
    null
  ]
  
  // Beautiful destination photos - using reliable sources
  const localImages = [
    'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=240&fit=crop', // Japan - Mount Fuji
    'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=240&fit=crop', // Japan - Traditional village
    'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=400&h=240&fit=crop', // Japan - Fushimi Inari
    'https://images.unsplash.com/photo-1551818014-7c8ace9c6043?w=400&h=240&fit=crop', // Japan - Winter
    'https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?w=400&h=240&fit=crop', // Japan - Rural
    'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=240&fit=crop', // Korea - Seoul
    'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=240&fit=crop', // Taiwan - Taipei 101
    'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=400&h=240&fit=crop', // China - Great Wall
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=240&fit=crop', // Europe - Swiss Alps
    'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400&h=240&fit=crop', // Australia - Sydney
    'https://images.unsplash.com/photo-1503614472-8c93d56cd51c?w=400&h=240&fit=crop', // Canada - Rockies
    'https://images.unsplash.com/photo-1469521669194-babb32047d6d?w=400&h=240&fit=crop'  // New Zealand - Mountains
  ]
  
  const tourTitles = [
    'เที่ยวญี่ปุ่น โตเกียว-เกียวโต-โอซาก้า',
    'เที่ยวญี่ปุ่น โตเกียว ดิสนีย์แลนด์',
    'เที่ยวญี่ปุ่น โอซาก้า-เกียวโต-นารา',
    'เที่ยวญี่ปุ่น โฮกไกโด-ซัปโปโร',
    'เที่ยวญี่ปุ่น ทาคายาม่า-ชิราคาวาโกะ',
    'เที่ยวเกาหลีใต้ โซล-ปูซาน-เชจู',
    'เที่ยวไต้หวัน ไทเป-อาลีซาน',
    'เที่ยวจีน ปักกิ่ง-เซียงไฮ้',
    'เที่ยวยุโรป ฝรั่งเศส-อิตาลี-สวิส',
    'เที่ยวออสเตรเลีย ซิดนีย์-เมลเบิร์น',
    'เที่ยวแคนาดา แวนคูเวอร์-แคลการี',
    'เที่ยวนิวซีแลนด์ ออคแลนด์-ควีนส์ทาวน์'
  ]
  
  const destinations = [
    'ญี่ปุ่น', 'ญี่ปุ่น', 'ญี่ปุ่น', 'ญี่ปุ่น', 'ญี่ปุ่น',
    'เกาหลีใต้', 'ไต้หวัน', 'จีน', 'ยุโรป', 'ออสเตรเลีย', 'แคนาดา', 'นิวซีแลนด์'
  ]
  
  return Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: tourTitles[i] + ` ${i + 3} วัน ${i + 2} คืน`,
    destination: destinations[i],
    city: 'โตเกียว-โอซาก้า',
    duration: `${i + 3}D${i + 2}N`,
    price: 39900 + (i * 5000),
    originalPrice: i % 3 === 0 ? 45900 + (i * 5000) : null,
    discount: i % 3 === 0 ? 15 + (i % 2 * 10) : null,
    rating: 4.2 + (Math.random() * 0.8),
    reviewCount: 120 + (i * 15),
    image: localImages[i], // Use local SVG banners
    highlights: ['วัดทองคำ', 'ภูเขาไฟฟูจิ', 'ดูซากุระ'],
    airline: 'Thai Airways',
    departureMonths: ['มี.ค.', 'เม.ย.', 'พ.ค.'],
    status: i === 2 ? 'sold-out' : i === 5 || i === 8 ? 'limited' : 'available',
    badges: i % 4 === 0 ? ['ยอดนิยม'] : i % 3 === 0 ? ['ลดราคา'] : [],
    // New enhanced fields
    availableSeats: i === 5 ? 3 : i === 8 ? 2 : i === 11 ? 1 : Math.floor(Math.random() * 10) + 5,
    totalBookings: Math.floor(Math.random() * 200) + 50,
    specialOffers: i % 2 === 0 ? [specialOfferTypes[i % 4]].filter(Boolean) : [],
    urgencyMessage: i % 3 === 0 ? urgencyMessages[i % 4] : null
  }))
}

export default function TourSearch19() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">กำลังโหลด...</p>
        </div>
      </div>
    }>
      <TourSearch19Content />
    </Suspense>
  )
}