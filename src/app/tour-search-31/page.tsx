'use client'

export const dynamic = 'force-dynamic'

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  buildSearchIndex, 
  searchTours, 
  sortTours,
  type NormalizedTour,
  type SearchIndex 
} from './data-adapter'
import {
  Button,
  Input,
  Select,
  Card,
  Badge,
  Modal,
  Tabs,
  Skeleton,
  Toast,
  Spinner,
  EmptyState,
  Icon
} from './components'
import './styles.css'

// Lead capture form data
interface LeadFormData {
  name: string
  phone: string
  email: string
  tourId: string
  tourTitle: string
  preferredMonth: string
  message: string
  consent: boolean
}

export default function TourSearch31Page() {
  // Core state
  const [searchIndex, setSearchIndex] = useState<SearchIndex | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<'recommended' | 'price-low' | 'price-high' | 'rating' | 'discount'>('recommended')
  
  // Filter state
  const [filters, setFilters] = useState({
    destination: '',
    priceMin: 0,
    priceMax: 200000,
    durationDays: 0,
    minRating: 0,
    themes: [] as string[],
    availability: true
  })
  
  // UI state
  const [showFilters, setShowFilters] = useState(false)
  const [showLeadModal, setShowLeadModal] = useState(false)
  const [selectedTour, setSelectedTour] = useState<NormalizedTour | null>(null)
  const [toastMessage, setToastMessage] = useState<{message: string, type: 'success' | 'error'} | null>(null)
  
  // Lead form state
  const [leadForm, setLeadForm] = useState<LeadFormData>({
    name: '',
    phone: '',
    email: '',
    tourId: '',
    tourTitle: '',
    preferredMonth: '',
    message: '',
    consent: false
  })
  
  // Initialize search index
  useEffect(() => {
    const initializeData = async () => {
      setIsLoading(true)
      try {
        // Simulate async data loading
        await new Promise(resolve => setTimeout(resolve, 1000))
        const index = buildSearchIndex()
        setSearchIndex(index)
      } catch (error) {
        console.error('Failed to initialize search index:', error)
        setToastMessage({ message: 'เกิดข้อผิดพลาดในการโหลดข้อมูล', type: 'error' })
      } finally {
        setIsLoading(false)
      }
    }
    
    initializeData()
  }, [])
  
  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return filters.destination !== '' ||
           filters.priceMin > 0 ||
           filters.priceMax < 200000 ||
           filters.durationDays > 0 ||
           filters.minRating > 0 ||
           filters.themes.length > 0
  }, [filters])

  // Handle country selection
  const handleCountrySelect = useCallback((countryName: string) => {
    setSearchQuery(countryName)
    // Analytics event
    if (typeof gtag !== 'undefined') {
      gtag('event', 'select_popular_country', {
        country_name: countryName,
        page_title: 'Tour Search 31'
      })
    }
  }, [])

  // Handle tour search from popular sections
  const handleTourSearch = useCallback((searchTerm: string) => {
    setSearchQuery(searchTerm)
    // Analytics event
    if (typeof gtag !== 'undefined') {
      gtag('event', 'select_popular_tour', {
        search_term: searchTerm,
        page_title: 'Tour Search 31'
      })
    }
  }, [])

  // Search and filter tours
  const filteredTours = useMemo(() => {
    if (!searchIndex) return []
    
    const searchResults = searchTours(searchIndex, searchQuery, {
      destination: filters.destination || undefined,
      priceMin: filters.priceMin || undefined,
      priceMax: filters.priceMax || undefined,
      durationDays: filters.durationDays || undefined,
      minRating: filters.minRating || undefined,
      themes: filters.themes.length > 0 ? filters.themes : undefined,
      availability: filters.availability
    })
    
    return sortTours(searchResults, sortBy)
  }, [searchIndex, searchQuery, filters, sortBy])
  
  // Handle lead form submission
  const handleLeadSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!leadForm.consent) {
      setToastMessage({ message: 'กรุณายอมรับเงื่อนไขการใช้งาน', type: 'error' })
      return
    }
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Track analytics event
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'submit_lead', {
          event_category: 'engagement',
          event_label: leadForm.tourId,
          value: 1
        })
      }
      
      setToastMessage({ message: 'ส่งข้อมูลสำเร็จ! ทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง', type: 'success' })
      setShowLeadModal(false)
      
      // Reset form
      setLeadForm({
        name: '',
        phone: '',
        email: '',
        tourId: '',
        tourTitle: '',
        preferredMonth: '',
        message: '',
        consent: false
      })
    } catch (error) {
      setToastMessage({ message: 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง', type: 'error' })
    }
  }, [leadForm])
  
  // Handle quick booking
  const handleQuickBook = useCallback((tour: NormalizedTour) => {
    setSelectedTour(tour)
    setLeadForm(prev => ({
      ...prev,
      tourId: tour.id,
      tourTitle: tour.title
    }))
    setShowLeadModal(true)
    
    // Track analytics event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'open_lead_drawer', {
        event_category: 'engagement',
        event_label: tour.id,
        value: 1
      })
    }
  }, [])
  
  // Loading state
  if (isLoading) {
    return (
      <div className="ts31-container min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Skeleton height="60px" className="mb-6" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} height="300px" />
            ))}
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="ts31-container min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Skip to content link for accessibility - Hidden but accessible */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-teal-600 focus:text-white focus:rounded-lg focus:shadow-lg">
        ข้ามไปยังเนื้อหาหลัก
      </a>
      
      {/* Header with search */}
      <header className="ts31-header sticky top-0 z-30 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col gap-4">
            {/* Search bar */}
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  type="search"
                  placeholder="ค้นหาประเทศ, เมือง, ชื่อทัวร์..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  icon="search"
                  aria-label="ค้นหาทัวร์"
                />
              </div>
              <Button
                variant="secondary"
                onClick={() => setShowFilters(true)}
                icon="filter"
                aria-label="เปิดตัวกรอง"
                className="relative min-w-[44px]"
              >
                <span className="hidden sm:inline">ตัวกรอง</span>
                {hasActiveFilters && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                )}
              </Button>
            </div>
            
            {/* Controls bar - Mobile optimized */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-medium text-gray-600">
                  พบ <strong className="text-gray-900">{filteredTours.length}</strong> ทัวร์
                </span>
              </div>
              
              <div className="flex items-center gap-1 sm:gap-2">
                {/* Sort dropdown */}
                <Select
                  options={[
                    { value: 'recommended', label: 'แนะนำ' },
                    { value: 'price-low', label: 'ราคาต่ำ-สูง' },
                    { value: 'price-high', label: 'ราคาสูง-ต่ำ' },
                    { value: 'rating', label: 'คะแนนสูงสุด' },
                    { value: 'discount', label: 'ส่วนลดมาก' }
                  ]}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  aria-label="เรียงลำดับ"
                  className="w-28 sm:w-32 text-base sm:text-lg"
                />
                
                {/* View mode toggle - Hidden on mobile, shown on tablet+ */}
                <div className="hidden sm:flex bg-gray-100 rounded-lg p-0.5">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                    aria-label="มุมมองตาราง"
                  >
                    <Icon name="grid" size={20} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                    aria-label="มุมมองรายการ"
                  >
                    <Icon name="list" size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main content - Add padding for mobile sticky CTA */}
      <main id="main-content" className="max-w-7xl mx-auto px-4 py-4 sm:py-6 pb-24 sm:pb-6">
        {/* Inspiration Sections - Only show when no search query or filters */}
        {(!searchQuery && !hasActiveFilters) && (
          <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
            {/* Popular Countries Section */}
            <PopularCountriesSection onCountrySelect={handleCountrySelect} />
            
            {/* Popular Tours Quick Filters */}
            
            {/* Popular Tours Card Section */}
            <PopularToursCardSection onTourSearch={handleTourSearch} />
          </div>
        )}

        {filteredTours.length === 0 ? (
          <EmptyState
            icon="search"
            title="ไม่พบทัวร์ที่ตรงกับการค้นหา"
            description="ลองปรับเงื่อนไขการค้นหาหรือล้างตัวกรองเพื่อดูทัวร์ทั้งหมด"
            action={{
              label: 'ล้างตัวกรอง',
              onClick: () => {
                setSearchQuery('')
                setFilters({
                  destination: '',
                  priceMin: 0,
                  priceMax: 200000,
                  durationDays: 0,
                  minRating: 0,
                  themes: [],
                  availability: true
                })
              }
            }}
          />
        ) : (
          <div className={viewMode === 'grid' 
            ? 'grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'space-y-3 sm:space-y-4'
          }>
            {filteredTours.map(tour => (
              <TourCard
                key={tour.id}
                tour={tour}
                viewMode={viewMode}
                onQuickBook={() => handleQuickBook(tour)}
              />
            ))}
          </div>
        )}
      </main>
      
      {/* Filter Modal */}
      <Modal
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        title="ตัวกรองการค้นหา"
        size="md"
        position="bottom"
      >
        <div className="space-y-6">
          {/* All Countries section */}
          <AllCountriesFilter 
            selectedCountry={filters.destination}
            onCountrySelect={(country) => setFilters(prev => ({ ...prev, destination: country }))}
          />
          
          {/* Price range */}
          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">
              ช่วงราคา: ฿{filters.priceMin.toLocaleString()} - ฿{filters.priceMax.toLocaleString()}
            </label>
            <input
              type="range"
              min="0"
              max="200000"
              step="5000"
              value={filters.priceMax}
              onChange={(e) => setFilters(prev => ({ ...prev, priceMax: parseInt(e.target.value) }))}
              className="w-full"
            />
          </div>
          
          {/* Duration filter */}
          <Select
            label="ระยะเวลา"
            options={[
              { value: 0, label: 'ทั้งหมด' },
              ...(searchIndex?.facets.durations.map(d => ({
                value: d.days,
                label: d.label
              })) || [])
            ]}
            value={filters.durationDays}
            onChange={(e) => setFilters(prev => ({ ...prev, durationDays: parseInt(e.target.value) }))}
          />
          
          {/* Rating filter */}
          <Select
            label="คะแนนขั้นต่ำ"
            options={[
              { value: 0, label: 'ทั้งหมด' },
              { value: 3.5, label: '3.5 ดาวขึ้นไป' },
              { value: 4.0, label: '4.0 ดาวขึ้นไป' },
              { value: 4.5, label: '4.5 ดาวขึ้นไป' }
            ]}
            value={filters.minRating}
            onChange={(e) => setFilters(prev => ({ ...prev, minRating: parseFloat(e.target.value) }))}
          />
          
          {/* Theme filter */}
          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">ธีม</label>
            <div className="flex flex-wrap gap-2">
              {searchIndex?.facets.themes.map(theme => (
                <button
                  key={theme.name}
                  onClick={() => {
                    setFilters(prev => ({
                      ...prev,
                      themes: prev.themes.includes(theme.name)
                        ? prev.themes.filter(t => t !== theme.name)
                        : [...prev.themes, theme.name]
                    }))
                  }}
                  className={`px-3 py-1 rounded-full text-base font-medium transition-colors ${
                    filters.themes.includes(theme.name)
                      ? 'bg-teal-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {theme.name} ({theme.count})
                </button>
              ))}
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex gap-2 pt-4 border-t">
            <Button
              variant="ghost"
              onClick={() => {
                setFilters({
                  destination: '',
                  priceMin: 0,
                  priceMax: 200000,
                  durationDays: 0,
                  minRating: 0,
                  themes: [],
                  availability: true
                })
              }}
              className="flex-1"
            >
              ล้างตัวกรอง
            </Button>
            <Button
              variant="primary"
              onClick={() => setShowFilters(false)}
              className="flex-1"
            >
              ค้นหา ({filteredTours.length} ทัวร์)
            </Button>
          </div>
        </div>
      </Modal>
      
      {/* Lead Capture Modal */}
      <Modal
        isOpen={showLeadModal}
        onClose={() => setShowLeadModal(false)}
        title="จองทัวร์ด่วน"
        size="md"
        position="bottom"
      >
        <form onSubmit={handleLeadSubmit} className="space-y-4">
          {selectedTour && (
            <div className="bg-teal-50 p-3 rounded-lg mb-4">
              <p className="text-base font-medium text-teal-800">ทัวร์ที่สนใจ:</p>
              <p className="text-lg font-semibold text-teal-900">{selectedTour.title}</p>
              <p className="text-base text-teal-700">฿{selectedTour.priceFrom.toLocaleString()} ต่อคน</p>
            </div>
          )}
          
          <Input
            label="ชื่อ-นามสกุล"
            type="text"
            required
            value={leadForm.name}
            onChange={(e) => setLeadForm(prev => ({ ...prev, name: e.target.value }))}
          />
          
          <Input
            label="เบอร์โทรศัพท์"
            type="tel"
            required
            pattern="[0-9]{10}"
            value={leadForm.phone}
            onChange={(e) => setLeadForm(prev => ({ ...prev, phone: e.target.value }))}
          />
          
          <Input
            label="อีเมล"
            type="email"
            required
            value={leadForm.email}
            onChange={(e) => setLeadForm(prev => ({ ...prev, email: e.target.value }))}
          />
          
          <Select
            label="เดือนที่ต้องการเดินทาง"
            options={[
              { value: '', label: 'เลือกเดือน' },
              { value: 'มีนาคม 2025', label: 'มีนาคม 2025' },
              { value: 'เมษายน 2025', label: 'เมษายน 2025' },
              { value: 'พฤษภาคม 2025', label: 'พฤษภาคม 2025' },
              { value: 'มิถุนายน 2025', label: 'มิถุนายน 2025' }
            ]}
            value={leadForm.preferredMonth}
            onChange={(e) => setLeadForm(prev => ({ ...prev, preferredMonth: e.target.value }))}
          />
          
          <div>
            <label className="block text-base font-medium text-gray-700 mb-1">
              ข้อความเพิ่มเติม (ถ้ามี)
            </label>
            <textarea
              className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none"
              rows={3}
              value={leadForm.message}
              onChange={(e) => setLeadForm(prev => ({ ...prev, message: e.target.value }))}
            />
          </div>
          
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="consent"
              required
              checked={leadForm.consent}
              onChange={(e) => setLeadForm(prev => ({ ...prev, consent: e.target.checked }))}
              className="mt-1"
            />
            <label htmlFor="consent" className="text-base text-gray-600">
              ยินยอมให้ติดต่อกลับและรับข้อมูลข่าวสารเกี่ยวกับทัวร์
            </label>
          </div>
          
          <Button type="submit" variant="primary" className="w-full">
            ส่งข้อมูล
          </Button>
          
          <p className="text-xs text-gray-500 text-center">
            ทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง
          </p>
        </form>
      </Modal>
      
      {/* Toast notification */}
      {toastMessage && (
        <Toast
          message={toastMessage.message}
          type={toastMessage.type}
          onClose={() => setToastMessage(null)}
        />
      )}
      
      {/* Sticky bottom CTA for mobile - with safe area */}
      <div className="ts31-sticky-cta fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 pb-safe md:hidden z-20 shadow-lg">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <span className="text-base font-semibold text-gray-700">
              {filteredTours.length} ทัวร์
            </span>
            {hasActiveFilters && (
              <Badge variant="primary" className="text-xs">
                กรองแล้ว
              </Badge>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              icon={viewMode === 'grid' ? 'list' : 'grid'}
              className="px-3"
              aria-label={`เปลี่ยนเป็น${viewMode === 'grid' ? 'รายการ' : 'ตาราง'}`}
            />
            <Button
              variant="primary"
              size="sm"
              onClick={() => setShowFilters(true)}
              icon="filter"
              className="relative"
            >
              ตัวกรอง
              {hasActiveFilters && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Tour Card Component
interface TourCardProps {
  tour: NormalizedTour
  viewMode: 'grid' | 'list'
  onQuickBook: () => void
}

function TourCard({ tour, viewMode, onQuickBook }: TourCardProps) {
  if (viewMode === 'list') {
    return (
      <Card className="ts31-tour-card-list hover:shadow-lg transition-shadow" interactive>
        <div className="flex gap-3 sm:gap-4 p-3 sm:p-4">
          <div className="relative w-24 sm:w-32 h-20 sm:h-24 flex-shrink-0 rounded-lg overflow-hidden">
            <Image
              src={tour.imageUrl}
              alt={tour.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 96px, 128px"
              loading="lazy"
            />
            {tour.discountPercent && tour.discountPercent > 0 && (
              <Badge variant="error" className="absolute top-2 left-2">
                -{tour.discountPercent}%
              </Badge>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base sm:text-lg text-gray-900 line-clamp-1 mb-2">
              {tour.title}
            </h3>
            
            <div className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg text-gray-600 mb-3">
              <span className="flex items-center gap-1">
                <Icon name="star" size={14} />
                {tour.rating}
              </span>
              <span className="flex items-center gap-1">
                <Icon name="clock" size={14} />
                {tour.durationText}
              </span>
              <span className="flex items-center gap-1">
                <Icon name="users" size={14} />
                {tour.availableSeats} ที่
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                {tour.priceOriginal && (
                  <span className="text-base text-gray-500 line-through mr-2">
                    ฿{tour.priceOriginal.toLocaleString()}
                  </span>
                )}
                <span className="text-lg font-bold text-teal-600">
                  ฿{tour.priceFrom.toLocaleString()}
                </span>
              </div>
              
              <div className="flex gap-2">
                <Link
                  href={`${tour.canonicalUrl}?src=search31`}
                  target="_blank"
                  className="hidden sm:inline-block text-base text-teal-600 hover:text-teal-700 font-medium"
                >
                  ดูรายละเอียด
                </Link>
                <Button size="sm" onClick={onQuickBook} className="min-w-[80px]">
                  จองด่วน
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    )
  }
  
  return (
    <Card className="ts31-tour-card-grid hover:shadow-xl transition-all duration-300" interactive>
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={tour.imageUrl}
          alt={tour.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 1024px) calc(50vw - 24px), calc(33vw - 24px)"
          loading="lazy"
        />
        {tour.discountPercent && tour.discountPercent > 0 && (
          <Badge variant="error" className="absolute top-3 left-3">
            -{tour.discountPercent}%
          </Badge>
        )}
        {tour.availableSeats <= 5 && tour.availableSeats > 0 && (
          <Badge variant="warning" className="absolute top-3 right-3">
            เหลือ {tour.availableSeats} ที่
          </Badge>
        )}
      </div>
      
      <div className="p-3 sm:p-4">
        <h3 className="font-semibold text-base sm:text-lg text-gray-900 line-clamp-2 mb-2">
          {tour.title}
        </h3>
        
        <div className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg text-gray-600 mb-3">
          <span className="flex items-center gap-1">
            <Icon name="star" size={14} />
            {tour.rating}
          </span>
          <span className="flex items-center gap-1">
            <Icon name="clock" size={14} />
            {tour.durationText}
          </span>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-2 sm:mb-3">
          {tour.highlights.slice(0, 2).map((highlight, idx) => (
            <Badge key={idx} variant="default" className="text-base px-2 py-1">
              {highlight}
            </Badge>
          ))}
          {tour.highlights.length > 2 && (
            <Badge variant="default" className="text-base px-2 py-1">
              +{tour.highlights.length - 2}
            </Badge>
          )}
        </div>
        
        <div className="border-t pt-2 sm:pt-3">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <div>
              {tour.priceOriginal && (
                <span className="text-base sm:text-lg text-gray-500 line-through block">
                  ฿{tour.priceOriginal.toLocaleString()}
                </span>
              )}
              <span className="text-xl sm:text-2xl font-bold text-teal-600">
                ฿{tour.priceFrom.toLocaleString()}
              </span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Link
              href={`${tour.canonicalUrl}?src=search31`}
              target="_blank"
              className="hidden sm:block flex-1"
            >
              <Button variant="secondary" size="sm" className="w-full text-base sm:text-lg">
                ดูรายละเอียด
              </Button>
            </Link>
            <Button variant="primary" size="sm" onClick={onQuickBook} className="flex-1 text-base sm:text-lg w-full">
              จองด่วน
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}

// Popular Countries Section Component
function PopularCountriesSection({ onCountrySelect }: { onCountrySelect: (country: string) => void }) {
  const popularCountries = [
    { 
      name: 'ญี่ปุ่น',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=400&fit=crop',
      flagCode: 'jp',
      highlight: 'สวรรค์ของดอกซากุระและวัฒนธรรมอันงดงาม'
    },
    { 
      name: 'เกาหลีใต้',
      image: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?w=400&h=400&fit=crop',
      flagCode: 'kr',
      highlight: 'ถิ่นกำเนิด K-POP และอาหารเกาหลีสุดอร่อย'
    },
    { 
      name: 'ไต้หวัน',
      image: 'https://images.unsplash.com/photo-1508248467877-aec1b08de376?w=400&h=400&fit=crop',
      flagCode: 'tw',
      highlight: 'สวรรค์อาหารริมถนนและชานมไข่มุกแท้'
    },
    { 
      name: 'อิตาลี',
      image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=400&h=400&fit=crop',
      flagCode: 'it',
      highlight: 'ดินแดนแห่งประวัติศาสตร์และพิซซ่าแสนอร่อย'
    },
    { 
      name: 'สวิตเซอร์แลนด์',
      image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=400&h=400&fit=crop',
      flagCode: 'ch',
      highlight: 'ธรรมชาติสุดงามท่ามกลางเทือกเขาแอลป์'
    },
    { 
      name: 'ไอซ์แลนด์',
      image: 'https://images.unsplash.com/photo-1520769669658-f07657f5a307?w=400&h=400&fit=crop',
      flagCode: 'is',
      highlight: 'ดินแดนแสงเหนือและธรรมชาติแปลกตา'
    }
  ]

  return (
    <div className="ts31-popular-countries">
      <div className="flex items-center gap-2 mb-4">
        <Icon name="globe" className="text-primary-500" size={20} />
        <h2 className="text-lg sm:text-xl font-bold text-neutral-800">ประเทศยอดนิยม</h2>
      </div>
      
      {/* Mobile First: List Layout, then Grid on larger screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
        {popularCountries.map((country, index) => (
          <button
            key={index}
            onClick={() => onCountrySelect(country.name)}
            className="ts31-country-card-mobile sm:ts31-country-card group relative w-full sm:aspect-square rounded-lg sm:rounded-xl overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary-400"
          >
            {/* Mobile Layout */}
            <div className="sm:hidden p-4 bg-white border border-neutral-200">
              <div className="flex items-center gap-3">
                {/* Flag */}
                <div className="w-8 h-8 rounded-full border border-neutral-200 overflow-hidden flex-shrink-0">
                  <Image 
                    src={`/icons/destinations/flag-icons-main/flags/1x1/${country.flagCode}.svg`}
                    alt={`${country.name} flag`}
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Content */}
                <div className="flex-1 text-left">
                  <h3 className="font-semibold text-base text-neutral-800">ทัวร์{country.name}</h3>
                  <p className="text-sm text-neutral-600">{country.highlight}</p>
                </div>
                
                {/* Arrow */}
                <Icon name="chevronRight" className="text-neutral-400" size={20} />
              </div>
            </div>

            {/* Tablet+ Card Layout */}
            <div className="hidden sm:block absolute inset-0">
              <Image 
                src={country.image}
                alt={country.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-neutral-900/20 to-transparent"></div>
              
              {/* Flag */}
              <div className="absolute top-2 right-2 w-5 h-5 rounded-full border border-white/60 overflow-hidden shadow-lg">
                <Image 
                  src={`/icons/destinations/flag-icons-main/flags/1x1/${country.flagCode}.svg`}
                  alt={`${country.name} flag`}
                  width={20}
                  height={20}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Tour count badge */}
              <div className="absolute top-2 left-2 bg-primary-500 text-white text-xs px-1.5 py-0.5 rounded-full font-medium shadow-lg">
                {country.tours}
              </div>
              
              {/* Country name */}
              <div className="absolute inset-0 flex items-end justify-center p-2">
                <h3 className="text-white font-bold text-base drop-shadow-lg">
                  {country.name}
                </h3>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}


// Popular Tours Card Section
function PopularToursCardSection({ onTourSearch }: { onTourSearch: (searchTerm: string) => void }) {
  const featuredTours = [
    {
      title: 'ญี่ปุ่น ซากุระ',
      subtitle: 'โตเกียว • เกียวโต',
      image: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800&h=600&fit=crop',
      price: '฿25,900',
      duration: '5 วัน 4 คืน',
      rating: 4.8,
      badge: 'ซากุรา',
      badgeColor: 'bg-pink-500',
      search: 'ญี่ปุ่น ซากุระ'
    },
    {
      title: 'เกาหลี K-POP',
      subtitle: 'โซล • บุซาน',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop',
      price: '฿15,900',
      duration: '4 วัน 3 คืน',
      rating: 4.7,
      badge: 'K-POP',
      badgeColor: 'bg-purple-500',
      search: 'เกาหลี'
    },
    {
      title: 'ไต้หวัน กินเที่ยว',
      subtitle: 'ไทเป • เถาหยวน',
      image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&h=600&fit=crop',
      price: '฿12,900',
      duration: '4 วัน 3 คืน',
      rating: 4.6,
      badge: 'อาหาร',
      badgeColor: 'bg-orange-500',
      search: 'ไต้หวัน'
    },
    {
      title: 'ยุโรป คลาสสิก',
      subtitle: 'ปารีส • โรม • ลอนดอน',
      image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&h=600&fit=crop',
      price: '฿89,900',
      duration: '10 วัน 8 คืน',
      rating: 4.9,
      badge: 'PREMIUM',
      badgeColor: 'bg-indigo-500',
      search: 'ยุโรป'
    }
  ]

  return (
    <div className="ts31-popular-tours-cards">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon name="heart" className="text-secondary-500" size="sm" />
          <h2 className="text-xl font-bold text-neutral-800">ทัวร์แนะนำ</h2>
        </div>
        <Badge variant="outline" className="text-neutral-600 text-xs">อัพเดทล่าสุด</Badge>
      </div>
      
      {/* Mobile First: List on mobile, Cards on larger screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {featuredTours.map((tour, index) => (
          <button
            key={index}
            onClick={() => onTourSearch(tour.search)}
            className="ts31-featured-tour-mobile sm:ts31-featured-tour group relative overflow-hidden rounded-lg sm:rounded-xl bg-white sm:bg-transparent border border-neutral-200 sm:border-none transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-400"
          >
            {/* Mobile Layout: Horizontal Card */}
            <div className="sm:hidden p-4">
              <div className="flex items-center gap-4">
                {/* Image */}
                <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <Image 
                    src={tour.image}
                    alt={tour.title}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                
                {/* Content */}
                <div className="flex-1 text-left min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-neutral-800 text-base truncate pr-2">{tour.title}</h3>
                    <span className={`${tour.badgeColor} text-white text-base px-2 py-1 rounded-full font-bold flex-shrink-0`}>
                      {tour.badge}
                    </span>
                  </div>
                  <p className="text-base text-neutral-600 mb-2">{tour.subtitle}</p>
                  <div className="flex items-center justify-between text-base">
                    <div className="flex items-center gap-2">
                      <span className="text-neutral-600">{tour.duration}</span>
                      <div className="flex items-center gap-1">
                        <Icon name="star" size={12} className="text-yellow-400" />
                        <span className="font-medium text-neutral-800">{tour.rating}</span>
                      </div>
                    </div>
                    <span className="font-bold text-primary-600 text-base">{tour.price}</span>
                  </div>
                </div>
                
                {/* Arrow */}
                <Icon name="chevronRight" className="text-neutral-400" size={20} />
              </div>
            </div>

            {/* Tablet+ Layout: Card with Image Background */}
            <div className="hidden sm:block h-40 lg:h-48">
              <div className="absolute inset-0">
                <Image 
                  src={tour.image}
                  alt={tour.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/40 to-transparent"></div>
              </div>
              
              {/* Content */}
              <div className="relative h-full p-3 lg:p-4 flex flex-col justify-between text-left">
                {/* Top badges */}
                <div className="flex items-start justify-between">
                  <span className={`${tour.badgeColor} text-white text-xs px-1.5 py-0.5 rounded-full font-bold shadow-lg`}>
                    {tour.badge}
                  </span>
                  <span className="bg-white/95 text-neutral-800 text-xs px-1.5 py-0.5 rounded-full font-bold shadow-md">
                    {tour.price}
                  </span>
                </div>
                
                {/* Bottom info */}
                <div className="space-y-1">
                  <div>
                    <h3 className="font-bold text-white text-base lg:text-lg drop-shadow-lg leading-tight">
                      {tour.title}
                    </h3>
                    <p className="text-white/90 text-sm lg:text-base drop-shadow-md leading-tight">{tour.subtitle}</p>
                  </div>
                  <div className="flex items-center justify-between text-sm lg:text-base text-white/90">
                    <span className="font-medium">{tour.duration}</span>
                    <div className="flex items-center gap-1">
                      <Icon name="star" size={12} className="text-yellow-400" />
                      <span className="font-bold">{tour.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

// All Countries Filter Component - Memoized for performance
const AllCountriesFilter = React.memo(function AllCountriesFilter({ 
  selectedCountry, 
  onCountrySelect 
}: { 
  selectedCountry: string
  onCountrySelect: (country: string) => void 
}) {
  const [searchQuery, setSearchQuery] = useState('')

  // Complete list of 98 countries with flags (from route 13)
  const allCountries = [
    { name: "กรีซ", flagCode: "gr" },
    { name: "กรีนแลนด์", flagCode: "gl" },
    { name: "กัมพูชา", flagCode: "kh" },
    { name: "เกาหลีใต้", flagCode: "kr" },
    { name: "คาซัคสถาน", flagCode: "kz" },
    { name: "แคนาดา", flagCode: "ca" },
    { name: "จอร์เจีย", flagCode: "ge" },
    { name: "จอร์แดน", flagCode: "jo" },
    { name: "จีน", flagCode: "cn" },
    { name: "ชิลี", flagCode: "cl" },
    { name: "เช็ก", flagCode: "cz" },
    { name: "เซเชลส์", flagCode: "sc" },
    { name: "เซอร์เบีย", flagCode: "rs" },
    { name: "ไซปรัส", flagCode: "cy" },
    { name: "ญี่ปุ่น", flagCode: "jp" },
    { name: "เดนมาร์ก", flagCode: "dk" },
    { name: "ตุรกี", flagCode: "tr" },
    { name: "ตูนีเซีย", flagCode: "tn" },
    { name: "ไต้หวัน", flagCode: "tw" },
    { name: "ไทย", flagCode: "th" },
    { name: "นอร์เวย์", flagCode: "no" },
    { name: "นิวซีแลนด์", flagCode: "nz" },
    { name: "เนเธอร์แลนด์", flagCode: "nl" },
    { name: "เนปาล", flagCode: "np" },
    { name: "บราซิล", flagCode: "br" },
    { name: "บรูไน", flagCode: "bn" },
    { name: "บัลแกเรีย", flagCode: "bg" },
    { name: "บาห์เรน", flagCode: "bh" },
    { name: "เบลเยียม", flagCode: "be" },
    { name: "ปานามา", flagCode: "pa" },
    { name: "เปรู", flagCode: "pe" },
    { name: "โปรตุเกส", flagCode: "pt" },
    { name: "โปแลนด์", flagCode: "pl" },
    { name: "ฝรั่งเศส", flagCode: "fr" },
    { name: "พม่า", flagCode: "mm" },
    { name: "ฟินแลนด์", flagCode: "fi" },
    { name: "ฟิลิปปินส์", flagCode: "ph" },
    { name: "ภูฏาน", flagCode: "bt" },
    { name: "มองโกเลีย", flagCode: "mn" },
    { name: "มอนเตเนโกร", flagCode: "me" },
    { name: "มัลดีฟส์", flagCode: "mv" },
    { name: "มาเก๊า", flagCode: "mo" },
    { name: "มาเลเซีย", flagCode: "my" },
    { name: "โมร็อคโค", flagCode: "ma" },
    { name: "ยุโรป", flagCode: "eu" },
    { name: "ยูกันดา", flagCode: "ug" },
    { name: "เยอรมัน", flagCode: "de" },
    { name: "รวันดา", flagCode: "rw" },
    { name: "รัสเซีย", flagCode: "ru" },
    { name: "โรมาเนีย", flagCode: "ro" },
    { name: "ลัตเวีย", flagCode: "lv" },
    { name: "ลาว", flagCode: "la" },
    { name: "ลิทัวเนีย", flagCode: "lt" },
    { name: "วานูอาตู", flagCode: "vu" },
    { name: "เวลส์", flagCode: "gb-wls" },
    { name: "เวียดนาม", flagCode: "vn" },
    { name: "ศรีลังกา", flagCode: "lk" },
    { name: "สกอตแลนด์", flagCode: "gb-sct" },
    { name: "สเปน", flagCode: "es" },
    { name: "สโลวาเกีย", flagCode: "sk" },
    { name: "สโลวีเนีย", flagCode: "si" },
    { name: "สวิตเซอร์แลนด์", flagCode: "ch" },
    { name: "สวีเดน", flagCode: "se" },
    { name: "สหรัฐอเมริกา", flagCode: "us" },
    { name: "สหรัฐอาหรับเอมิเรตส์", flagCode: "ae" },
    { name: "สาธารณรัฐโครเอเชีย", flagCode: "hr" },
    { name: "สิงคโปร์", flagCode: "sg" },
    { name: "ออสเตรเลีย", flagCode: "au" },
    { name: "ออสเตรีย", flagCode: "at" },
    { name: "อังกฤษ", flagCode: "gb-eng" },
    { name: "อาเซอร์ไบจาน", flagCode: "az" },
    { name: "อาร์เจนตินา", flagCode: "ar" },
    { name: "อิตาลี", flagCode: "it" },
    { name: "อินเดีย", flagCode: "in" },
    { name: "อินโดนีเซีย", flagCode: "id" },
    { name: "อิสราเอล", flagCode: "il" },
    { name: "อิหร่าน", flagCode: "ir" },
    { name: "อียิปต์", flagCode: "eg" },
    { name: "เอกวาดอร์", flagCode: "ec" },
    { name: "เอสโตเนีย", flagCode: "ee" },
    { name: "แอฟริกาใต้", flagCode: "za" },
    { name: "แอลจีเรีย", flagCode: "dz" },
    { name: "ไอซ์แลนด์", flagCode: "is" },
    { name: "ไอร์แลนด์", flagCode: "ie" },
    { name: "ฮ่องกง", flagCode: "hk" },
    { name: "ฮังการี", flagCode: "hu" }
  ].sort((a, b) => a.name.localeCompare(b.name, 'th'))

  // Filter countries based on search
  const filteredCountries = allCountries.filter(country =>
    searchQuery.length < 2 || country.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="ts31-all-countries">
      <div className="flex items-center gap-2 mb-4">
        <Icon name="globe" className="text-primary-500" size="sm" />
        <h3 className="text-lg font-bold text-neutral-800">ประเทศทั้งหมด</h3>
        <Badge variant="outline" className="text-xs">{allCountries.length} ประเทศ</Badge>
      </div>
      
      {/* Search input */}
      <div className="mb-4">
        <Input
          placeholder="ค้นหาประเทศ..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          icon="search"
        />
        {searchQuery.length >= 2 && (
          <div className="mt-2 text-sm sm:text-base text-neutral-600 font-medium">
            พบ <strong>{filteredCountries.length}</strong> ประเทศ
          </div>
        )}
      </div>

      {/* Clear selection button */}
      {selectedCountry && (
        <div className="mb-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onCountrySelect('')}
            className="text-neutral-600"
          >
            ล้างการเลือก ({selectedCountry})
          </Button>
        </div>
      )}

      {/* Countries grid - Mobile optimized */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 max-h-64 overflow-y-auto overscroll-contain scrollbar-thin">
        {filteredCountries.map((country, index) => (
          <button
            key={index}
            onClick={() => onCountrySelect(
              country.name === selectedCountry ? '' : country.name
            )}
            className={`ts31-country-filter-item p-3 rounded-lg border-2 transition-all duration-200 text-left min-h-[48px] touch-manipulation ${
              selectedCountry === country.name
                ? 'border-primary-500 bg-primary-50 shadow-md'
                : 'border-neutral-200 bg-white hover:border-primary-300 hover:bg-primary-50'
            }`}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-sm border border-neutral-200 overflow-hidden flex-shrink-0">
                <Image 
                  src={`/icons/destinations/flag-icons-main/flags/1x1/${country.flagCode}.svg`}
                  alt={`${country.name} flag`}
                  width={20}
                  height={20}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className={`text-sm sm:text-base font-medium truncate leading-tight ${
                selectedCountry === country.name 
                  ? 'text-primary-700' 
                  : 'text-neutral-700'
              }`}>
                {country.name}
              </div>
            </div>
          </button>
        ))}
      </div>

      {searchQuery.length >= 2 && filteredCountries.length === 0 && (
        <div className="text-center py-8 text-neutral-500">
          <Icon name="search" className="mx-auto mb-2 opacity-50" size={32} />
          <div className="text-base font-medium">ไม่พบประเทศที่ค้นหา</div>
          <div className="text-sm mt-1">ลองค้นหาคำอื่น</div>
        </div>
      )}
    </div>
  )
})