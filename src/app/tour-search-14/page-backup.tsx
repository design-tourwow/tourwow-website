'use client'

import { useState, useMemo, useEffect, useCallback } from 'react'
import { Search, Heart, ArrowRight, X, ChevronDown, MapPin, Star, Clock, Users, Filter, Eye, Zap, Compass, TrendingUp, Plane } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

// Fallback data in case of import issues
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
    highlights: 'สัมผัสความตื่นตาตื่นใจที่โตเกียวสกายทรี ชมวิวสุดอลังการจากความสูง 634 เมตร'
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
    highlights: 'สัมผัสวัฒนธรรมเกาหลีที่พระราชวังเคียงบกกุง สถานที่สำคัญทางประวัติศาสตร์ของโซล'
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
    highlights: 'ชมพระอาทิตย์ขึ้นที่อาลิซาน และสัมผัสความสูงของไทเป 101'
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
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="ค้นหาจุดหมาย, ประเทศ, หรือกิจกรรม..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-16 py-4 bg-white border-0 rounded-2xl shadow-xl text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:shadow-2xl transition-all"
                />
                <button
                  onClick={() => setShowAdvancedSearch(true)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
                >
                  <Filter className="w-4 h-4" />
                </button>
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
                <TrendingUp className="w-4 h-4 text-orange-500" />
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
          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-bold text-slate-800">
                ผลการค้นหา ({filteredTours.length})
              </h2>
              {activeFilter && (
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  {SEARCH_INSPIRATIONS.find(s => s.filter === activeFilter)?.title}
                </span>
              )}
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

          {/* Tours Grid - Masonry-like layout */}
          {filteredTours.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-6 bg-slate-100 rounded-full flex items-center justify-center">
                <Compass className="w-8 h-8 text-slate-400" />
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
              {/* Tour Cards with Unique Layout */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {displayedTours.map((tour, index) => (
                  <TourCard
                    key={tour.id}
                    tour={tour}
                    isWishlisted={wishlist.includes(tour.id)}
                    onToggleWishlist={() => toggleWishlist(tour.id)}
                    index={index}
                  />
                ))}
              </div>

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
                  <X className="w-5 h-5" />
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
    </div>
  )
}

// Unique Tour Card Component
function TourCard({ 
  tour, 
  isWishlisted, 
  onToggleWishlist, 
  index 
}: { 
  tour: any
  isWishlisted: boolean
  onToggleWishlist: () => void
  index: number
}) {
  return (
    <div className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
      index % 3 === 1 ? 'sm:mt-6' : ''
    }`}>
      {/* Image with Overlay Info */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        {/* Top Info Bar */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          <div className="flex gap-2">
            <span className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-slate-800">
              {tour.duration}
            </span>
            {tour.originalPrice && (
              <span className="px-2 py-1 bg-red-500 text-white rounded-full text-xs font-bold">
                ลด {Math.round(((tour.originalPrice - tour.price) / tour.originalPrice) * 100)}%
              </span>
            )}
          </div>
          <button
            onClick={onToggleWishlist}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-slate-600'}`} />
          </button>
        </div>

        {/* Bottom Info */}
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-bold">{tour.rating}</span>
              </div>
              <span className="text-xs opacity-80">({tour.reviews} รีวิว)</span>
            </div>
            <div className="flex items-center gap-1 text-xs opacity-80">
              <MapPin className="w-3 h-3" />
              <span>{tour.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-slate-800 text-lg mb-3 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
          {tour.title}
        </h3>
        
        <p className="text-sm text-slate-600 mb-4 line-clamp-3">
          {tour.highlights}
        </p>

        {/* Price & Action */}
        <div className="flex items-center justify-between">
          <div>
            {tour.originalPrice && (
              <p className="text-sm text-slate-400 line-through">
                ฿{tour.originalPrice.toLocaleString()}
              </p>
            )}
            <p className="text-2xl font-bold text-blue-600">
              ฿{tour.price.toLocaleString()}
            </p>
            <p className="text-xs text-slate-500">ต่อคน</p>
          </div>
          
          <Link 
            href={`/tour-search-14/${tour.id}`}
            className="group/btn flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Eye className="w-4 h-4" />
            <span className="text-sm">ดูรายละเอียด</span>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  )
}