'use client'

import { useState, useMemo, useEffect, useCallback } from 'react'
import { Search, Heart, ArrowRight, X, ChevronDown, MapPin, Star, Clock, Users, Filter, Eye, Zap, Compass, TrendingUp, Plane, Mic, Map, BarChart3, Share2, CheckSquare, AlertCircle, Activity, Timer, Globe, Award, Shield, TrendingDown, Volume2, Headphones } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

// Enhanced fallback data with trust signals and live data
const fallbackTours = [
  {
    id: 1,
    title: 'ทัวร์ญี่ปุ่น โตเกียว สกายทรี 5 วัน 3 คืน',
    location: 'ญี่ปุ่น',
    duration: '5 วัน',
    days: 5,
    nights: 4,
    price: 29900,
    originalPrice: 35900,
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
    rating: 4.8,
    reviews: 234,
    highlights: 'สัมผัสความตื่นตาตื่นใจที่โตเกียวสกายทรี ชมวิวสุดอลังการจากความสูง 634 เมตร',
    // Trust & Social Proof
    availableSeats: 3,
    totalTravelers: 1847,
    satisfaction: 96,
    lastBooking: '15 นาทีที่แล้ว',
    viewsToday: 47,
    currentViewers: 8,
    badges: ['ได้รับการรับรอง', 'ยอดนิยม', 'รีวิวดีเยี่ยม'],
    isVerified: true,
    gallery: [
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1542640244-7e672d6cef4e?w=800&h=600&fit=crop'
    ]
  },
  {
    id: 2,
    title: 'ทัวร์เกาหลี โซล เมืองหลวง 4 วัน 3 คืน',
    location: 'เกาหลีใต้',
    duration: '4 วัน',
    days: 4,
    nights: 3,
    price: 25900,
    originalPrice: 30900,
    image: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?w=800&h=600&fit=crop',
    rating: 4.6,
    reviews: 156,
    highlights: 'สัมผัสวัฒนธรรมเกาหลีที่พระราชวังเคียงบกกุง สถานที่สำคัญทางประวัติศาสตร์ของโซล',
    availableSeats: 12,
    totalTravelers: 892,
    satisfaction: 94,
    lastBooking: '2 ชั่วโมงที่แล้ว',
    viewsToday: 23,
    currentViewers: 4,
    badges: ['ราคาดี', 'วัฒนธรรม'],
    isVerified: true,
    gallery: [
      'https://images.unsplash.com/photo-1538485399081-7191377e8241?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800&h=600&fit=crop'
    ]
  },
  {
    id: 3,
    title: 'ทัวร์ไต้หวัน ไทเป 101 อาลิซาน 5 วัน 3 คืน',
    location: 'ไต้หวัน',
    duration: '5 วัน',
    days: 5,
    nights: 3,
    price: 24900,
    image: 'https://images.unsplash.com/photo-1508248467877-aec1b08de376?w=800&h=600&fit=crop',
    rating: 4.7,
    reviews: 189,
    highlights: 'ชมพระอาทิตย์ขึ้นที่อาลิซาน และสัมผัสความสูงของไทเป 101',
    availableSeats: 8,
    totalTravelers: 1205,
    satisfaction: 95,
    lastBooking: '45 นาทีที่แล้ว',
    viewsToday: 31,
    currentViewers: 6,
    badges: ['ธรรมชาติ', 'วิวสวย'],
    isVerified: true,
    gallery: [
      'https://images.unsplash.com/photo-1508248467877-aec1b08de376?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&h=600&fit=crop'
    ]
  }
]

let toursData = fallbackTours
try {
  const { toursData: importedTours } = require('@/lib/tour-data-consolidated')
  if (importedTours && importedTours.length > 0) {
    toursData = importedTours
  }
} catch (error) {
  console.warn('Failed to import tour data, using fallback:', error)
}

// Unique search categories for this page only
const SEARCH_INSPIRATIONS = [
  { title: 'วันหยุดยาว', desc: 'ทัวร์ 7-10 วัน', icon: '🏖️', filter: 'long' },
  { title: 'ใกล้บ้าน', desc: 'เอเชียใกล้เคียง', icon: '✈️', filter: 'nearby' },
  { title: 'พรีเมี่ยม', desc: 'ทัวร์หรู 5 ดาว', icon: '⭐', filter: 'premium' },
  { title: 'ประหยัด', desc: 'งบไม่เกิน 30K', icon: '💰', filter: 'budget' }
]

const TRENDING_DESTINATIONS = [
  { name: 'ญี่ปุ่น', tag: 'ใบไม้เปลี่ยนสี', trend: '+25%' },
  { name: 'เกาหลี', tag: 'K-Culture', trend: '+18%' },
  { name: 'ไต้หวัน', tag: 'อาหารดึก', trend: '+12%' },
  { name: 'สิงคโปร์', tag: 'Family Trip', trend: '+8%' }
]

export default function TourSearch14() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('')
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 100000])
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false)
  const [wishlist, setWishlist] = useState<number[]>([])
  const [viewCount, setViewCount] = useState(12)
  const [sortBy, setSortBy] = useState('popular')
  
  // New enhanced states
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid')
  const [isVoiceSearchActive, setIsVoiceSearchActive] = useState(false)
  const [compareList, setCompareList] = useState<number[]>([])
  const [showQuickView, setShowQuickView] = useState<number | null>(null)
  const [selectedTourImages, setSelectedTourImages] = useState<{[key: number]: number}>({})
  const [isSearching, setIsSearching] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  
  // Initialize wishlist
  useEffect(() => {
    const saved = localStorage.getItem('tourwow-wishlist-14')
    if (saved) {
      try {
        setWishlist(JSON.parse(saved))
      } catch (e) {
        console.error('Error loading wishlist')
      }
    }
  }, [])

  // Save wishlist
  const toggleWishlist = useCallback((tourId: number) => {
    setWishlist(prev => {
      const newWishlist = prev.includes(tourId) 
        ? prev.filter(id => id !== tourId)
        : [...prev, tourId]
      localStorage.setItem('tourwow-wishlist-14', JSON.stringify(newWishlist))
      return newWishlist
    })
  }, [])

  // Enhanced functions
  const toggleCompare = useCallback((tourId: number) => {
    setCompareList(prev => {
      if (prev.includes(tourId)) {
        return prev.filter(id => id !== tourId)
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), tourId] // Keep only last 3
      }
      return [...prev, tourId]
    })
  }, [])

  const handleSearch = useCallback((query: string) => {
    if (query.trim()) {
      setIsSearching(true)
      setSearchQuery(query)
      
      // Add to recent searches
      setRecentSearches(prev => {
        const newSearches = [query, ...prev.filter(s => s !== query)].slice(0, 5)
        localStorage.setItem('recent-searches-14', JSON.stringify(newSearches))
        return newSearches
      })
      
      // Simulate search delay
      setTimeout(() => setIsSearching(false), 800)
    }
  }, [])

  const nextImage = useCallback((tourId: number, galleryLength: number) => {
    setSelectedTourImages(prev => ({
      ...prev,
      [tourId]: ((prev[tourId] || 0) + 1) % galleryLength
    }))
  }, [])

  // Filter tours
  const filteredTours = useMemo(() => {
    let filtered = toursData.filter(tour => {
      // Search query
      const searchMatch = !searchQuery || 
        tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.location.toLowerCase().includes(searchQuery.toLowerCase())
      
      // Country filter
      const countryMatch = selectedCountries.length === 0 || 
        selectedCountries.some(country => tour.location.includes(country))
      
      // Price filter
      const priceMatch = tour.price >= priceRange[0] && tour.price <= priceRange[1]
      
      // Active filter
      if (activeFilter === 'long') return tour.days >= 7 && searchMatch && countryMatch && priceMatch
      if (activeFilter === 'nearby') return ['ญี่ปุ่น', 'เกาหลีใต้', 'ไต้หวัน', 'สิงคโปร์'].some(c => tour.location.includes(c)) && searchMatch && countryMatch && priceMatch
      if (activeFilter === 'premium') return tour.price >= 50000 && searchMatch && countryMatch && priceMatch
      if (activeFilter === 'budget') return tour.price <= 30000 && searchMatch && countryMatch && priceMatch
      
      return searchMatch && countryMatch && priceMatch
    })

    // Sort
    if (sortBy === 'price-low') return filtered.sort((a, b) => a.price - b.price)
    if (sortBy === 'price-high') return filtered.sort((a, b) => b.price - a.price)
    if (sortBy === 'rating') return filtered.sort((a, b) => b.rating - a.rating)
    
    return filtered.sort((a, b) => b.reviews - a.reviews) // popular
  }, [searchQuery, selectedCountries, priceRange, activeFilter, sortBy])

  const displayedTours = filteredTours.slice(0, viewCount)
  const hasMore = filteredTours.length > viewCount

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-50">
      {/* Hero Search Section - Different from other pages */}
      <div className="relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>
        
        <div className="relative px-4 pt-6 pb-8">
          {/* Main Search Interface */}
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-3">
                ค้นหาทริปในฝัน
              </h1>
              <p className="text-slate-600 text-lg">
                จาก <span className="font-semibold text-blue-600">{toursData.length}</span> ทัวร์พรีเมี่ยม
              </p>
            </div>

            {/* Search Bar with Suggestions */}
            <div className="relative mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 flex items-center justify-center" />
                <input
                  type="text"
                  placeholder="ค้นหาจุดหมาย, ประเทศ, หรือกิจกรรม..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                  className="w-full pl-12 pr-24 py-4 bg-white border-0 rounded-2xl shadow-xl text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:shadow-2xl transition-all"
                />
                
                {/* Search Progress Bar */}
                {isSearching && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-100 rounded-b-2xl overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"></div>
                  </div>
                )}
                
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                  {/* Voice Search Button */}
                  <button
                    onClick={() => setIsVoiceSearchActive(!isVoiceSearchActive)}
                    className={`p-2 rounded-lg transition-colors ${
                      isVoiceSearchActive 
                        ? 'bg-red-500 text-white animate-pulse' 
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                    title="Voice Search"
                  >
                    <Mic className="w-4 h-4 flex items-center justify-center mx-auto" />
                  </button>
                  
                  <button
                    onClick={() => setShowAdvancedSearch(true)}
                    className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    title="Advanced Search"
                  >
                    <Filter className="w-4 h-4 flex items-center justify-center mx-auto" />
                  </button>
                </div>
              </div>
              
              {/* Quick Search Tags */}
              {searchQuery.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-slate-200 p-3 z-10">
                  <div className="space-y-1">
                    {TRENDING_DESTINATIONS.filter(dest => 
                      dest.name.toLowerCase().includes(searchQuery.toLowerCase())
                    ).slice(0, 3).map((dest, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSearchQuery(dest.name)}
                        className="flex items-center justify-between w-full p-2 hover:bg-slate-50 rounded-lg text-left transition-colors"
                      >
                        <span className="text-slate-800 font-medium">{dest.name}</span>
                        <span className="text-xs text-slate-500">{dest.tag}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Search Inspirations - Unique to this page */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {SEARCH_INSPIRATIONS.map((inspiration, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveFilter(activeFilter === inspiration.filter ? '' : inspiration.filter)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    activeFilter === inspiration.filter
                      ? 'border-blue-500 bg-blue-50 shadow-lg scale-105'
                      : 'border-slate-200 bg-white hover:border-blue-300 hover:shadow-md'
                  }`}
                >
                  <div className="text-2xl mb-2">{inspiration.icon}</div>
                  <div className="text-sm font-bold text-slate-800">{inspiration.title}</div>
                  <div className="text-xs text-slate-600">{inspiration.desc}</div>
                </button>
              ))}
            </div>

            {/* Trending Destinations Bar */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-white/50">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-orange-500 flex items-center justify-center" />
                <span className="text-sm font-semibold text-slate-700">ปลายทางฮิตติดอันดับ</span>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {TRENDING_DESTINATIONS.map((dest, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSearchQuery(dest.name)}
                    className="flex-shrink-0 group"
                  >
                    <div className="bg-white rounded-xl p-3 border border-slate-200 hover:border-orange-300 hover:shadow-md transition-all">
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="font-semibold text-slate-800 text-sm">{dest.name}</div>
                          <div className="text-xs text-slate-600">{dest.tag}</div>
                        </div>
                        <div className="text-xs font-bold text-orange-500 bg-orange-100 px-2 py-1 rounded-full">
                          {dest.trend}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Results Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4 flex-wrap">
              <h2 className="text-xl font-bold text-slate-800">
                ผลการค้นหา ({filteredTours.length})
              </h2>
              {activeFilter && (
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  {SEARCH_INSPIRATIONS.find(s => s.filter === activeFilter)?.title}
                </span>
              )}
              
              {/* Active Filters */}
              {(selectedCountries.length > 0 || priceRange[1] < 100000) && (
                <div className="flex flex-wrap gap-2">
                  {selectedCountries.map(country => (
                    <span key={country} className="flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">
                      {country}
                      <button onClick={() => setSelectedCountries(prev => prev.filter(c => c !== country))}>
                        <X className="w-3 h-3 flex items-center justify-center mx-auto" />
                      </button>
                    </span>
                  ))}
                  {priceRange[1] < 100000 && (
                    <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                      ≤฿{(priceRange[1]/1000)}K
                      <button onClick={() => setPriceRange([0, 100000])}>
                        <X className="w-3 h-3 flex items-center justify-center mx-auto" />
                      </button>
                    </span>
                  )}
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              {/* Compare Counter */}
              {compareList.length > 0 && (
                <div className="flex items-center gap-2 px-3 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm">
                  <CheckSquare className="w-4 h-4 flex items-center justify-center mx-auto" />
                  <span>เปรียบเทียบ ({compareList.length}/3)</span>
                </div>
              )}
              
              {/* View Mode Toggle */}
              <div className="flex bg-white border border-slate-200 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <BarChart3 className="w-4 h-4 flex items-center justify-center mx-auto" />
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'map' ? 'bg-blue-500 text-white' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Map className="w-4 h-4 flex items-center justify-center mx-auto" />
                </button>
              </div>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="popular">ยอดนิยม</option>
                <option value="price-low">ราคาต่ำ-สูง</option>
                <option value="price-high">ราคาสูง-ต่ำ</option>
                <option value="rating">คะแนนสูงสุด</option>
              </select>
            </div>
          </div>

          {/* Map View Placeholder */}
          {viewMode === 'map' && (
            <div className="bg-slate-100 rounded-2xl h-96 mb-6 flex items-center justify-center border-2 border-dashed border-slate-300">
              <div className="text-center">
                <Map className="w-12 h-12 text-slate-400 mx-auto mb-3 flex items-center justify-center" />
                <p className="text-slate-600 font-semibold">Map View</p>
                <p className="text-slate-500 text-sm">แสดงตำแหน่งทัวร์บนแผนที่</p>
              </div>
            </div>
          )}

          {/* Tours Grid - Masonry-like layout */}
          {filteredTours.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-6 bg-slate-100 rounded-full flex items-center justify-center">
                <Compass className="w-8 h-8 text-slate-400 flex items-center justify-center mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">ไม่พบทัวร์ที่ตรงกับเงื่อนไข</h3>
              <p className="text-slate-600 mb-6">ลองปรับเงื่อนไขการค้นหาหรือเลือกหมวดหมู่อื่น</p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setActiveFilter('')
                  setSelectedCountries([])
                }}
                className="px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors"
              >
                ล้างการค้นหา
              </button>
            </div>
          ) : (
            <>
              {/* Enhanced Tour Cards with Unique Layout */}
              {viewMode === 'grid' && (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {displayedTours.map((tour, index) => (
                    <EnhancedTourCard
                      key={tour.id}
                      tour={tour}
                      isWishlisted={wishlist.includes(tour.id)}
                      isCompared={compareList.includes(tour.id)}
                      onToggleWishlist={() => toggleWishlist(tour.id)}
                      onToggleCompare={() => toggleCompare(tour.id)}
                      onQuickView={() => setShowQuickView(tour.id)}
                      onNextImage={() => nextImage(tour.id, tour.gallery?.length || 1)}
                      selectedImageIndex={selectedTourImages[tour.id] || 0}
                      index={index}
                    />
                  ))}
                </div>
              )}

              {/* Load More */}
              {hasMore && (
                <div className="text-center mt-10">
                  <button
                    onClick={() => setViewCount(prev => prev + 12)}
                    className="px-8 py-3 bg-white border-2 border-blue-500 text-blue-500 rounded-xl font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    ดูทัวร์เพิ่มเติม ({filteredTours.length - viewCount} ทัวร์)
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Advanced Search Modal */}
      {showAdvancedSearch && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-800">ค้นหาขั้นสูง</h3>
                <button
                  onClick={() => setShowAdvancedSearch(false)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 flex items-center justify-center mx-auto" />
                </button>
              </div>

              <div className="space-y-6 max-h-96 overflow-y-auto">
                {/* Countries */}
                <div>
                  <h4 className="font-semibold text-slate-800 mb-3">ประเทศ</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {['ญี่ปุ่น', 'เกาหลีใต้', 'ไต้หวัน', 'สิงคโปร์', 'ไทย', 'มาเลเซีย'].map(country => (
                      <button
                        key={country}
                        onClick={() => {
                          setSelectedCountries(prev =>
                            prev.includes(country)
                              ? prev.filter(c => c !== country)
                              : [...prev, country]
                          )
                        }}
                        className={`p-3 rounded-xl border-2 text-left transition-all ${
                          selectedCountries.includes(country)
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-slate-200 hover:border-blue-300'
                        }`}
                      >
                        <span className="text-sm font-medium">{country}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h4 className="font-semibold text-slate-800 mb-3">
                    ช่วงราคา: ฿{priceRange[0].toLocaleString()} - ฿{priceRange[1].toLocaleString()}
                  </h4>
                  <input
                    type="range"
                    min="0"
                    max="100000"
                    step="5000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="grid grid-cols-4 gap-2 mt-3">
                    {[20000, 40000, 60000, 100000].map(price => (
                      <button
                        key={price}
                        onClick={() => setPriceRange([0, price])}
                        className={`p-2 rounded-lg border text-xs ${
                          priceRange[1] === price
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-slate-200 hover:border-blue-300'
                        }`}
                      >
                        ≤{(price/1000)}K
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setSelectedCountries([])
                    setPriceRange([0, 100000])
                  }}
                  className="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-colors"
                >
                  รีเซ็ต
                </button>
                <button
                  onClick={() => setShowAdvancedSearch(false)}
                  className="flex-1 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors"
                >
                  ใช้ตัวกรอง
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      {showQuickView && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl">
            <div className="relative h-64">
              {(() => {
                const quickTour = toursData.find(t => t.id === showQuickView)
                if (!quickTour) return null
                
                return (
                  <>
                    <Image
                      src={quickTour.image}
                      alt={quickTour.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <button
                      onClick={() => setShowQuickView(null)}
                      className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                    >
                      <X className="w-5 h-5 flex items-center justify-center mx-auto" />
                    </button>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold mb-2">{quickTour.title}</h3>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 flex items-center justify-center" />
                          <span>{quickTour.rating}</span>
                        </div>
                        <span>{quickTour.duration}</span>
                        <span className="text-2xl font-bold">฿{quickTour.price.toLocaleString()}</span>
                      </div>
                    </div>
                  </>
                )
              })()}
            </div>
            <div className="p-6">
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <Users className="w-5 h-5 text-blue-500 mx-auto mb-1 flex items-center justify-center" />
                  <p className="text-xs text-slate-600">เดินทางแล้ว</p>
                  <p className="font-bold">{toursData.find(t => t.id === showQuickView)?.totalTravelers?.toLocaleString() || 'N/A'}</p>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <Shield className="w-5 h-5 text-green-500 mx-auto mb-1 flex items-center justify-center" />
                  <p className="text-xs text-slate-600">ความพึงพอใจ</p>
                  <p className="font-bold">{toursData.find(t => t.id === showQuickView)?.satisfaction || 'N/A'}%</p>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-orange-500 mx-auto mb-1 flex items-center justify-center" />
                  <p className="text-xs text-slate-600">ที่นั่งคงเหลือ</p>
                  <p className="font-bold">{toursData.find(t => t.id === showQuickView)?.availableSeats || 'N/A'}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Link
                  href={`/tour-search-14/${showQuickView}`}
                  className="flex-1 bg-blue-500 text-white text-center py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
                  onClick={() => setShowQuickView(null)}
                >
                  ดูรายละเอียดเต็ม
                </Link>
                <button
                  onClick={() => setShowQuickView(null)}
                  className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-colors"
                >
                  ปิด
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Filters Bottom Sheet */}
      {showMobileFilters && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-lg max-h-[80vh] overflow-hidden">
            <div className="p-4 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-800">ตัวกรอง</h3>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 flex items-center justify-center mx-auto" />
                </button>
              </div>
            </div>
            <div className="p-4 max-h-96 overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-3">หมวดหมู่</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {SEARCH_INSPIRATIONS.map((inspiration, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setActiveFilter(activeFilter === inspiration.filter ? '' : inspiration.filter)
                          setShowMobileFilters(false)
                        }}
                        className={`p-3 rounded-xl border-2 transition-all ${
                          activeFilter === inspiration.filter
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-slate-200'
                        }`}
                      >
                        <div className="text-lg mb-1">{inspiration.icon}</div>
                        <div className="text-sm font-bold">{inspiration.title}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button for Mobile */}
      <div className="fixed bottom-6 right-6 sm:hidden z-40">
        <button
          onClick={() => setShowMobileFilters(true)}
          className="p-4 bg-blue-500 text-white rounded-full shadow-xl hover:bg-blue-600 transition-all hover:scale-110"
        >
          <Filter className="w-6 h-6 flex items-center justify-center mx-auto" />
        </button>
      </div>
    </div>
  )
}

// Enhanced Tour Card Component with Trust Signals and Interactive Elements
function EnhancedTourCard({ 
  tour, 
  isWishlisted, 
  isCompared,
  onToggleWishlist, 
  onToggleCompare,
  onQuickView,
  onNextImage,
  selectedImageIndex,
  index 
}: { 
  tour: any
  isWishlisted: boolean
  isCompared: boolean
  onToggleWishlist: () => void
  onToggleCompare: () => void
  onQuickView: () => void
  onNextImage: () => void
  selectedImageIndex: number
  index: number
}) {
  const currentImage = tour.gallery?.[selectedImageIndex] || tour.image
  const urgency = tour.availableSeats && tour.availableSeats <= 5
  
  return (
    <div className={`group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-3 hover:scale-[1.02] ${
      index % 3 === 1 ? 'sm:mt-8' : ''
    } ${isCompared ? 'ring-4 ring-purple-300' : ''} relative`}>
      
      {/* Live Activity Indicator */}
      {tour.currentViewers && tour.currentViewers > 0 && (
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
          <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
          <span>{tour.currentViewers} คนกำลังดู</span>
        </div>
      )}

      {/* Image Gallery with Navigation */}
      <div className="relative h-56 overflow-hidden group/image">
        <Image
          src={currentImage}
          alt={tour.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        
        {/* Gallery Navigation Dots */}
        {tour.gallery && tour.gallery.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10 justify-center items-center">
            {tour.gallery.map((_, idx) => (
              <button
                key={idx}
                onClick={onNextImage}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === selectedImageIndex ? 'bg-white scale-125' : 'bg-white/60 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        )}
        
        {/* Image Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Top Action Bar */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
          <button
            onClick={onToggleWishlist}
            className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all shadow-lg hover:scale-110"
          >
            <Heart className={`w-4 h-4 flex items-center justify-center mx-auto ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-slate-600'}`} />
          </button>
          
          <button
            onClick={onToggleCompare}
            className={`p-2.5 backdrop-blur-sm rounded-full hover:scale-110 transition-all shadow-lg ${
              isCompared ? 'bg-purple-500 text-white' : 'bg-white/90 hover:bg-white text-slate-600'
            }`}
          >
            <CheckSquare className="w-4 h-4 flex items-center justify-center mx-auto" />
          </button>
          
          <button
            onClick={onQuickView}
            className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all shadow-lg hover:scale-110"
          >
            <Eye className="w-4 h-4 text-slate-600 flex items-center justify-center mx-auto" />
          </button>
        </div>

        {/* Tour Info Overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex justify-between items-end text-white">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 flex-wrap">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold">
                  {tour.duration}
                </span>
                {tour.originalPrice && (
                  <span className="px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full text-xs font-bold animate-pulse">
                    ลด {Math.round(((tour.originalPrice - tour.price) / tour.originalPrice) * 100)}%
                  </span>
                )}
                {urgency && (
                  <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full text-xs font-bold">
                    🔥 เหลือ {tour.availableSeats} ที่นั่ง
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 flex items-center justify-center" />
                  <span className="text-sm font-bold">{tour.rating}</span>
                  <span className="text-xs opacity-80">({tour.reviews})</span>
                </div>
                
                <div className="flex items-center gap-1 text-xs">
                  <MapPin className="w-3 h-3 flex items-center justify-center" />
                  <span>{tour.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Content Section */}
      <div className="p-6">
        {/* Trust Signals */}
        <div className="flex items-center gap-2 mb-4">
          {tour.isVerified && (
            <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
              <Shield className="w-3 h-3 flex items-center justify-center" />
              <span>ได้รับการรับรอง</span>
            </div>
          )}
          {tour.satisfaction && (
            <div className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
              <Award className="w-3 h-3 flex items-center justify-center" />
              <span>ความพึงพอใจ {tour.satisfaction}%</span>
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="font-bold text-slate-800 text-lg mb-3 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
          {tour.title}
        </h3>
        
        {/* Highlights */}
        <p className="text-sm text-slate-600 mb-4 line-clamp-2">
          {tour.highlights}
        </p>

        {/* Trust Badges */}
        {tour.badges && tour.badges.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {tour.badges.slice(0, 2).map((badge, idx) => (
              <span key={idx} className="px-2 py-1 bg-slate-100 text-slate-700 rounded-full text-xs">
                {badge}
              </span>
            ))}
          </div>
        )}

        {/* Social Proof */}
        <div className="flex items-center justify-between mb-4 text-xs text-slate-500">
          <div className="flex items-center gap-4">
            {tour.totalTravelers && (
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3 flex items-center justify-center" />
                {tour.totalTravelers.toLocaleString()} คนเดินทางแล้ว
              </span>
            )}
            {tour.lastBooking && (
              <span className="flex items-center gap-1">
                <Timer className="w-3 h-3 flex items-center justify-center" />
                จองล่าสุด {tour.lastBooking}
              </span>
            )}
          </div>
        </div>

        {/* Price & Action */}
        <div className="flex items-end justify-between">
          <div className="flex-1">
            {tour.originalPrice && (
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sm text-slate-400 line-through">
                  ฿{tour.originalPrice.toLocaleString()}
                </p>
                <span className="px-2 py-1 bg-red-100 text-red-600 rounded text-xs font-bold">
                  ประหยัด ฿{(tour.originalPrice - tour.price).toLocaleString()}
                </span>
              </div>
            )}
            <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ฿{tour.price.toLocaleString()}
            </p>
            <p className="text-xs text-slate-500">ต่อคน รวมทุกอย่าง</p>
          </div>
          
          <div className="flex flex-col gap-2">
            <Link 
              href={`/tour-search-14/${tour.id}`}
              className="group/btn flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white rounded-xl font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              <Eye className="w-4 h-4 flex items-center justify-center" />
              <span className="text-sm">ดูรายละเอียด</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform flex items-center justify-center" />
            </Link>
            
            <button className="flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition-colors">
              <Share2 className="w-3 h-3 flex items-center justify-center" />
              <span>แชร์</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}