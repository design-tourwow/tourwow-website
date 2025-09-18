'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { Search, MapPin, Calendar, Star, Heart, Clock, Users, Filter, ChevronDown, ChevronUp, TrendingUp, ArrowRight, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { allTours } from '@/data/tours-data'

export default function TourSearch12() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('ทั้งหมด')
  const [sortBy, setSortBy] = useState('recommended')
  const [priceFilter, setPriceFilter] = useState('all')
  const [durationFilter, setDurationFilter] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [favorites, setFavorites] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [isClient, setIsClient] = useState(false)
  
  const toursPerPage = 20

  const countries = [
    { value: 'ทั้งหมด', label: 'ทุกประเทศ', continent: '' },
    // Asia
    { value: 'ญี่ปุ่น', label: 'ญี่ปุ่น', continent: 'เอเชีย' },
    { value: 'เกาหลีใต้', label: 'เกาหลีใต้', continent: 'เอเชีย' },
    { value: 'ไต้หวัน', label: 'ไต้หวัน', continent: 'เอเชีย' },
    { value: 'จีน', label: 'จีน', continent: 'เอเชีย' },
    { value: 'สิงคโปร์', label: 'สิงคโปร์', continent: 'เอเชีย' },
    { value: 'มาเลเซีย', label: 'มาเลเซีย', continent: 'เอเชีย' },
    { value: 'เวียดนาม', label: 'เวียดนาม', continent: 'เอเชีย' },
    { value: 'อินเดีย', label: 'อินเดีย', continent: 'เอเชีย' },
    { value: 'ไทย', label: 'ไทย', continent: 'เอเชีย' },
    // Europe
    { value: 'อิตาลี', label: 'อิตาลี', continent: 'ยุโรป' },
    { value: 'ฝรั่งเศส', label: 'ฝรั่งเศส', continent: 'ยุโรป' },
    { value: 'เยอรมนี', label: 'เยอรมนี', continent: 'ยุโรป' },
    { value: 'สเปน', label: 'สเปน', continent: 'ยุโรป' },
    { value: 'อังกฤษ', label: 'อังกฤษ', continent: 'ยุโรป' },
    { value: 'กรีซ', label: 'กรีซ', continent: 'ยุโรป' },
    { value: 'ตุรกี', label: 'ตุรกี', continent: 'ยุโรป' },
    // America
    { value: 'อเมริกา', label: 'สหรัฐอเมริกา', continent: 'อเมริกา' },
    { value: 'แคนาดา', label: 'แคนาดา', continent: 'อเมริกา' },
    { value: 'บราซิล', label: 'บราซิล', continent: 'อเมริกา' },
    { value: 'อาร์เจนตินา', label: 'อาร์เจนตินา', continent: 'อเมริกา' },
    // Oceania
    { value: 'ออสเตรเลีย', label: 'ออสเตรเลีย', continent: 'โอเชียเนีย' },
    { value: 'นิวซีแลนด์', label: 'นิวซีแลนด์', continent: 'โอเชียเนีย' },
    // Africa
    { value: 'อียิปต์', label: 'อียิปต์', continent: 'แอฟริกา' },
    { value: 'เคนยา', label: 'เคนยา', continent: 'แอฟริกา' }
  ]
  
  const groupedCountries = countries.reduce((acc, country) => {
    if (country.continent) {
      if (!acc[country.continent]) acc[country.continent] = []
      acc[country.continent].push(country)
    }
    return acc
  }, {} as Record<string, typeof countries>)
  
  const priceRanges = [
    { value: 'all', label: 'ทุกช่วงราคา' },
    { value: 'under30k', label: 'ต่ำกว่า 30,000' },
    { value: '30k-60k', label: '30,000 - 60,000' },
    { value: '60k-100k', label: '60,000 - 100,000' },
    { value: 'over100k', label: 'มากกว่า 100,000' }
  ]

  const durations = [
    { value: 'all', label: 'ทุกระยะเวลา' },
    { value: 'short', label: '1-4 วัน' },
    { value: 'medium', label: '5-8 วัน' },
    { value: 'long', label: '9+ วัน' }
  ]

  // Client-side hydration check
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Handle loading state for filters
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => setIsLoading(false), 300)
    return () => clearTimeout(timer)
  }, [searchQuery, selectedCountry, sortBy, priceFilter, durationFilter])

  const filteredTours = useMemo(() => {
    let filtered = allTours.filter(tour => {
      const matchesSearch = tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           tour.destinations.some(dest => dest.toLowerCase().includes(searchQuery.toLowerCase()))
      
      const matchesCountry = selectedCountry === 'ทั้งหมด' || 
                           tour.title.includes(selectedCountry) ||
                           tour.destinations.some(dest => dest.includes(selectedCountry))

      const matchesPrice = priceFilter === 'all' ||
                          (priceFilter === 'under30k' && tour.price < 30000) ||
                          (priceFilter === '30k-60k' && tour.price >= 30000 && tour.price < 60000) ||
                          (priceFilter === '60k-100k' && tour.price >= 60000 && tour.price < 100000) ||
                          (priceFilter === 'over100k' && tour.price >= 100000)

      const days = parseInt(tour.duration.split(' ')[0])
      const matchesDuration = durationFilter === 'all' ||
                             (durationFilter === 'short' && days <= 4) ||
                             (durationFilter === 'medium' && days >= 5 && days <= 8) ||
                             (durationFilter === 'long' && days >= 9)

      return matchesSearch && matchesCountry && matchesPrice && matchesDuration
    })

    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating)
    } else if (sortBy === 'discount') {
      filtered.sort((a, b) => (b.discount || 0) - (a.discount || 0))
    }

    return filtered
  }, [searchQuery, selectedCountry, sortBy, priceFilter, durationFilter])

  // Calculate pages count inline - no reference to any variable named totalPages
  const pagesCount = Math.ceil(filteredTours.length / toursPerPage)
  
  const paginatedTours = useMemo(() => {
    const endIndex = currentPage * toursPerPage
    return filteredTours.slice(0, endIndex) // Show all tours from page 1 to current page
  }, [filteredTours, currentPage, toursPerPage])

  const loadMoreTours = useCallback(() => {
    if (!isLoadingMore && !isLoading) {
      setIsLoadingMore(true)
      // Simulate loading time
      setTimeout(() => {
        setCurrentPage(prev => prev + 1)
        setIsLoadingMore(false)
      }, 500)
    }
  }, [isLoadingMore, isLoading])

  // Handle scroll for mobile optimizations and infinite scroll
  useEffect(() => {
    if (!isClient) return // Prevent hydration issues

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setShowScrollTop(currentScrollY > 400)
      
      // Infinite scroll detection
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
        // Load more when 1000px from bottom - use pagesCount
        if (currentPage < pagesCount && !isLoadingMore && !isLoading) {
          loadMoreTours()
        }
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isClient, currentPage, pagesCount, isLoadingMore, isLoading, loadMoreTours])

  const toggleFavorite = useCallback((tourId: number) => {
    setFavorites(prev => 
      prev.includes(tourId) 
        ? prev.filter(id => id !== tourId)
        : [...prev, tourId]
    )
    // Haptic feedback for mobile - only on client
    if (isClient && typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(50)
    }
  }, [isClient])

  const clearAllFilters = () => {
    setSearchQuery('')
    setSelectedCountry('ทั้งหมด')
    setSortBy('recommended')
    setPriceFilter('all')
    setDurationFilter('all')
    setShowFilters(false)
    setIsFilterDrawerOpen(false)
    setCurrentPage(1)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const hasActiveFilters = searchQuery !== '' || selectedCountry !== 'ทั้งหมด' || priceFilter !== 'all' || durationFilter !== 'all' || sortBy !== 'recommended'

  const formatPrice = (price: number) => {
    return price.toLocaleString('th-TH')
  }

  const getDiscountedPrice = (originalPrice: number, discount: number) => {
    return originalPrice - (originalPrice * discount / 100)
  }

  // Prevent hydration mismatch
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">กำลังโหลด...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 touch-manipulation">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          {/* Mobile Search */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="ค้นหาปลายทางที่ต้องการไป..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 text-base"
                aria-label="ค้นหาทัวร์"
                autoComplete="off"
                inputMode="search"
              />
            </div>
          </div>

          {/* Compact Filter Interface */}
          <div className="bg-white rounded-lg border border-gray-200 p-2 mb-3">
            {/* First Row - Country and Sort */}
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div className="relative">
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  aria-label="เลือกประเทศ"
                  className={`w-full appearance-none px-3 py-2 pr-8 rounded-md border focus:outline-none transition-colors text-sm ${
                    selectedCountry !== 'ทั้งหมด' 
                      ? 'bg-blue-50 text-blue-700 border-blue-300' 
                      : 'bg-white text-gray-900 border-gray-300'
                  }`}
                >
                  <option value="ทั้งหมด">🌍 ทุกประเทศ</option>
                  {Object.entries(groupedCountries).map(([continent, countryList]) => (
                    <optgroup key={continent} label={continent}>
                      {countryList.map(country => (
                        <option key={country.value} value={country.value}>
                          {country.label}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none text-gray-400" />
              </div>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  aria-label="เรียงตาม"
                  className={`w-full appearance-none px-3 py-2 pr-8 rounded-md border focus:outline-none transition-colors text-sm ${
                    sortBy !== 'recommended' 
                      ? 'bg-blue-50 text-blue-700 border-blue-300' 
                      : 'bg-white text-gray-900 border-gray-300'
                  }`}
                >
                  <option value="recommended">⭐ แนะนำ</option>
                  <option value="price-low">💰 ราคาต่ำ</option>
                  <option value="price-high">💎 ราคาสูง</option>
                  <option value="rating">🏆 คะแนนสูง</option>
                  <option value="discount">🔥 ส่วนลดสูง</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none text-gray-400" />
              </div>
            </div>

            {/* Second Row - Advanced Filters Button */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center gap-1.5 ${
                  hasActiveFilters
                    ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Filter className="w-3.5 h-3.5" />
                ตัวกรองเพิ่มเติม
                {hasActiveFilters && <span className="bg-blue-600 text-white rounded-full w-2 h-2"></span>}
              </button>
              
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-gray-500 hover:text-red-600 underline"
                >
                  ล้างทั้งหมด
                </button>
              )}
            </div>
          </div>

          {/* Mobile Filter Drawer */}
          {isFilterDrawerOpen && (
            <div className="fixed inset-0 z-50 md:hidden">
              {/* Backdrop */}
              <div 
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={() => setIsFilterDrawerOpen(false)}
              />
              
              {/* Drawer */}
              <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">ตัวกรอง</h3>
                  <button
                    onClick={() => setIsFilterDrawerOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  {/* Price Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ช่วงราคา</label>
                    <select
                      value={priceFilter}
                      onChange={(e) => setPriceFilter(e.target.value)}
                      className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                    >
                      <option value="all">ทุกช่วงราคา</option>
                      <option value="under30k">ต่ำกว่า 30,000</option>
                      <option value="30k-60k">30,000 - 60,000</option>
                      <option value="60k-100k">60,000 - 100,000</option>
                      <option value="over100k">มากกว่า 100,000</option>
                    </select>
                  </div>

                  {/* Duration Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ระยะเวลา</label>
                    <select
                      value={durationFilter}
                      onChange={(e) => setDurationFilter(e.target.value)}
                      className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                    >
                      <option value="all">ทุกระยะเวลา</option>
                      <option value="short">1-4 วัน</option>
                      <option value="medium">5-8 วัน</option>
                      <option value="long">9+ วัน</option>
                    </select>
                  </div>
                  
                  {/* Apply Button */}
                  <div className="pt-4 border-t">
                    <button
                      onClick={() => setIsFilterDrawerOpen(false)}
                      className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      ใช้ตัวกรอง
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Desktop Advanced Filters Panel */}
          {showFilters && (
            <div className="hidden md:block bg-gray-50 rounded-lg border border-gray-200 p-3 mb-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Price Filter */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">ช่วงราคา</label>
                  <div className="relative">
                    <select
                      value={priceFilter}
                      onChange={(e) => setPriceFilter(e.target.value)}
                      className={`w-full appearance-none px-2.5 py-2 pr-7 rounded-md border focus:outline-none transition-colors min-h-[38px] text-sm ${
                        priceFilter !== 'all' 
                          ? 'bg-blue-50 text-blue-700 border-blue-300' 
                          : 'bg-white text-gray-900 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200'
                      }`}
                    >
                      <option value="all" className="bg-white text-gray-900">ทุกช่วงราคา</option>
                      <option value="under30k" className="bg-white text-gray-900">ต่ำกว่า 30,000</option>
                      <option value="30k-60k" className="bg-white text-gray-900">30,000 - 60,000</option>
                      <option value="60k-100k" className="bg-white text-gray-900">60,000 - 100,000</option>
                      <option value="over100k" className="bg-white text-gray-900">มากกว่า 100,000</option>
                    </select>
                    <ChevronDown className={`absolute right-2 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 pointer-events-none ${
                      priceFilter !== 'all' ? 'text-blue-600' : 'text-gray-400'
                    }`} />
                  </div>
                </div>

                {/* Duration Filter */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">ระยะเวลา</label>
                  <div className="relative">
                    <select
                      value={durationFilter}
                      onChange={(e) => setDurationFilter(e.target.value)}
                      className={`w-full appearance-none px-2.5 py-2 pr-7 rounded-md border focus:outline-none transition-colors min-h-[38px] text-sm ${
                        durationFilter !== 'all' 
                          ? 'bg-blue-50 text-blue-700 border-blue-300' 
                          : 'bg-white text-gray-900 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200'
                      }`}
                    >
                      <option value="all" className="bg-white text-gray-900">ทุกระยะเวลา</option>
                      <option value="short" className="bg-white text-gray-900">1-4 วัน</option>
                      <option value="medium" className="bg-white text-gray-900">5-8 วัน</option>
                      <option value="long" className="bg-white text-gray-900">9+ วัน</option>
                    </select>
                    <ChevronDown className={`absolute right-2 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 pointer-events-none ${
                      durationFilter !== 'all' ? 'text-blue-600' : 'text-gray-400'
                    }`} />
                  </div>
                </div>
              </div>

              {/* Active Advanced Filters */}
              {(priceFilter !== 'all' || durationFilter !== 'all') && (
                <div className="mt-4 pt-4 border-t border-gray-300">
                  <div className="flex flex-wrap gap-2">
                    <span className="text-sm font-medium text-gray-600">ตัวกรองเพิ่มเติม:</span>
                    {priceFilter !== 'all' && (
                      <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-800 rounded-md text-sm font-medium">
                        {priceRanges.find(r => r.value === priceFilter)?.label}
                        <button
                          onClick={() => setPriceFilter('all')}
                          className="ml-1 hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {durationFilter !== 'all' && (
                      <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-800 rounded-md text-sm font-medium">
                        {durations.find(d => d.value === durationFilter)?.label}
                        <button
                          onClick={() => setDurationFilter('all')}
                          className="ml-1 hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Results Count & Quick Stats */}
          <div className="flex items-center justify-between text-sm text-gray-600 mt-3">
            <span className="font-medium">พบ {filteredTours.length} ทัวร์</span>
            {filteredTours.length > 0 && (
              <div className="flex items-center gap-1 text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span>มีให้เลือกมากมาย</span>
              </div>
            )}
          </div>
          
          {/* Quick Price Stats */}
          {filteredTours.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2 text-xs">
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                ราคาต่ำสุด: ฿{Math.min(...filteredTours.map(t => t.price)).toLocaleString('th-TH')}
              </span>
              <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full">
                คะแนนเฉลี่ย: {(filteredTours.reduce((sum, t) => sum + t.rating, 0) / filteredTours.length).toFixed(1)}⭐
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Tour Grid */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {isLoading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">กำลังโหลดข้อมูล...</p>
          </div>
        ) : filteredTours.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">ไม่พบทัวร์ที่ตรงกับการค้นหา</h3>
            <p className="text-gray-600">ลองปรับเปลี่ยนเงื่อนไขการค้นหาหรือตัวกรอง</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedTours.map((tour) => (
              <div key={tour.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg active:shadow-md transition-all duration-300 overflow-hidden group border border-gray-100">
                {/* Tour Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={tour.image}
                    alt={tour.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Discount Badge */}
                  {tour.discount && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      -{tour.discount}%
                    </div>
                  )}
                  {/* Favorite Button */}
                  <button
                    onClick={() => toggleFavorite(tour.id)}
                    aria-label={favorites.includes(tour.id) ? 'ลบออกจากรายการโปรด' : 'เพิ่มในรายการโปรด'}
                    className="absolute top-3 right-3 p-2.5 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white active:scale-90 transition-all duration-200 touch-manipulation"
                  >
                    <Heart 
                      className={`w-5 h-5 ${favorites.includes(tour.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
                    />
                  </button>
                </div>

                {/* Tour Content */}
                <div className="p-5">
                  {/* Title */}
                  <h3 className="font-bold text-lg text-gray-900 mb-2 leading-tight" style={{display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>
                    {tour.title}
                  </h3>

                  {/* Destinations */}
                  <div className="flex items-start gap-1 text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span className="text-sm leading-relaxed">{tour.destinations.join(' • ')}</span>
                  </div>

                  {/* Tour Details Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span className="text-gray-700">{tour.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">{tour.groupSize}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-orange-500" />
                      <span className="text-gray-700">{tour.departureDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-gray-700">{tour.rating} ({tour.reviews})</span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {tour.highlights.slice(0, 3).map((highlight, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
                        >
                          {highlight}
                        </span>
                      ))}
                      {tour.highlights.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                          +{tour.highlights.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Price Section */}
                  <div className="border-t pt-4">
                    <div className="flex items-end justify-between">
                      <div>
                        {tour.originalPrice && tour.originalPrice > tour.price ? (
                          <>
                            <span className="text-sm text-gray-500 line-through">
                              ฿{formatPrice(tour.originalPrice)}
                            </span>
                            <div className="text-xl font-bold text-red-600">
                              ฿{formatPrice(tour.price)}
                            </div>
                          </>
                        ) : (
                          <div className="text-xl font-bold text-gray-900">
                            ฿{formatPrice(tour.price)}
                          </div>
                        )}
                        <span className="text-xs text-gray-500">ต่อคน</span>
                      </div>
                      
                      {/* Action Buttons - Mobile Optimized */}
                      <div className="flex flex-col gap-2">
                        <Link href={`/tour-search-12/${tour.id}`} className="w-full">
                          <button 
                            className="w-full bg-gray-100 text-gray-700 px-4 py-3 rounded-lg text-sm font-medium hover:bg-gray-200 active:bg-gray-300 transition-colors touch-manipulation"
                            aria-label={`ดูรายละเอียด ${tour.title}`}
                          >
                            ดูรายละเอียด
                          </button>
                        </Link>
                        <Link href={`/tour-search-12/${tour.id}`} className="w-full">
                          <button 
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3.5 rounded-lg font-medium hover:shadow-lg active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 touch-manipulation"
                            aria-label={`จองทัวร์ ${tour.title}`}
                          >
                            จองเลย
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Load More Button for Mobile / Pagination & Infinite Scroll Loading */}
      {filteredTours.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 py-8">
          {isLoadingMore && (
            <div className="text-center mb-6">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <p className="text-gray-600 text-sm">กำลังโหลดทัวร์เพิ่มเติม...</p>
            </div>
          )}
          
          {currentPage < pagesCount ? (
            <div className="text-center">
              <button
                onClick={loadMoreTours}
                disabled={isLoadingMore}
                className={`px-8 py-3 rounded-lg font-medium transition-all duration-200 mb-4 touch-manipulation ${
                  isLoadingMore 
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
                }`}
              >
                {isLoadingMore ? 'กำลังโหลด...' : `โหลดเพิ่มเติม (${paginatedTours.length} จาก ${filteredTours.length})`}
              </button>
              <p className="text-gray-600 text-sm">
                แสดง {paginatedTours.length} จาก {filteredTours.length} รายการ
              </p>
              <p className="text-gray-500 text-xs mt-1">
                💡 เลื่อนลงเพื่อโหลดทัวร์เพิ่มเติมอัตโนมัติ
              </p>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-gray-600">แสดงทัวร์ทั้งหมด {filteredTours.length} รายการแล้ว</p>
              <p className="text-green-600 text-sm mt-1">🎉 คุณดูครบทุกทัวร์แล้ว</p>
            </div>
          )}
        </div>
      )}
      
      {/* Floating Action Button - Scroll to Top */}
      {isClient && showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 active:scale-90 transition-all duration-200 touch-manipulation"
          aria-label="กลับขึ้นด้านบน"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}

      {/* Floating Status Bar for Mobile */}
      <div className="fixed bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md border border-gray-200 rounded-full px-4 py-2 md:hidden z-30 shadow-lg">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-700">
            <span className="font-medium text-blue-600">{filteredTours.length}</span> ทัวร์
          </span>
          {favorites.length > 0 && (
            <span className="text-gray-700">
              ❤️ <span className="font-medium text-red-500">{favorites.length}</span>
            </span>
          )}
          <div className="text-xs text-gray-500">
            {currentPage < pagesCount ? `หน้า ${currentPage}/${pagesCount}` : 'ทั้งหมด'}
          </div>
        </div>
      </div>

      {/* Add bottom padding for mobile floating bar */}
      <div className="h-16 md:hidden" />
    </div>
  )
}