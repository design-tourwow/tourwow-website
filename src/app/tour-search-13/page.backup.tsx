'use client'

import { useState, useMemo, useEffect } from 'react'
import { Search, MapPin, Calendar, Star, Heart, Clock, Users, ArrowRight, Filter, X, ChevronDown, Grid, List, Bookmark, TrendingUp } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { allTours } from '@/lib/tour-data-consolidated'

type SortOption = 'recommended' | 'price-low' | 'price-high' | 'rating' | 'duration' | 'popularity'

// ประเทศทั้งหมดพร้อมธงชาติ - เรียงตามตัวอักษร ก-ฮ
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

export default function TourSearch13() {
  // State management
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilters, setSelectedFilters] = useState({
    region: '',
    duration: '',
    priceRange: [0, 200000] as [number, number],
    rating: 0
  })
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedBudget, setSelectedBudget] = useState('')
  const [selectedDuration, setSelectedDuration] = useState('')
  const [countrySearchQuery, setCountrySearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('recommended')
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card')
  const [showFilters, setShowFilters] = useState(false)
  const [wishlist, setWishlist] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSearching, setIsSearching] = useState(false)
  
  // Load wishlist from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('tourwow-wishlist')
    if (saved) setWishlist(JSON.parse(saved))
    setIsLoading(false)
  }, [])

  // Save wishlist to localStorage
  const toggleWishlist = (tourId: number) => {
    const newWishlist = wishlist.includes(tourId) 
      ? wishlist.filter(id => id !== tourId)
      : [...wishlist, tourId]
    setWishlist(newWishlist)
    localStorage.setItem('tourwow-wishlist', JSON.stringify(newWishlist))
  }

  // Get unique regions from tours
  const regions = useMemo(() => {
    const uniqueRegions = [...new Set(allTours.map(tour => tour.region))]
    return uniqueRegions.map(region => ({
      value: region,
      label: region === 'asia' ? 'เอเชีย' : 
             region === 'europe' ? 'ยุโรป' :
             region === 'oceania' ? 'โอเซียเนีย' :
             region === 'america' ? 'อเมริกา' : region
    }))
  }, [])

  // Filter and sort tours
  const filteredTours = useMemo(() => {
    let filtered = allTours.filter(tour => {
      // Search filter
      const searchMatch = !searchTerm || 
        tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tour.destinations.some(dest => dest.toLowerCase().includes(searchTerm.toLowerCase()))
      
      // Country filter (new)
      const countryMatch = !selectedCountry || 
        tour.destinations.some(dest => dest.includes(selectedCountry)) ||
        tour.title.includes(selectedCountry)
      
      // Budget filter (new)
      const budgetMatch = !selectedBudget || (
        selectedBudget === '30000' ? tour.price <= 30000 :
        selectedBudget === '50000' ? tour.price <= 50000 :
        selectedBudget === '100000' ? tour.price <= 100000 :
        selectedBudget === 'promotion' ? tour.originalPrice && tour.originalPrice > tour.price :
        true
      )
      
      // Duration filter (new logic)
      const durationMatch = !selectedDuration || (
        selectedDuration === 'short' ? tour.duration.includes('3') || tour.duration.includes('4') || tour.duration.includes('5') :
        selectedDuration === 'medium' ? tour.duration.includes('6') || tour.duration.includes('7') || tour.duration.includes('8') :
        selectedDuration === 'long' ? tour.duration.includes('9') || tour.duration.includes('10') || tour.duration.includes('11') || tour.duration.includes('12') :
        selectedDuration === 'extended' ? tour.duration.includes('13') || tour.duration.includes('14') || tour.duration.includes('15') :
        true
      )
      
      // Region filter (legacy)
      const regionMatch = !selectedFilters.region || tour.region === selectedFilters.region
      
      // Price filter (legacy)
      const priceMatch = tour.price >= selectedFilters.priceRange[0] && 
                        tour.price <= selectedFilters.priceRange[1]
      
      // Rating filter (legacy)
      const ratingMatch = tour.rating >= selectedFilters.rating

      return searchMatch && countryMatch && budgetMatch && durationMatch && regionMatch && priceMatch && ratingMatch
    })

    // Sort tours
    switch (sortBy) {
      case 'price-low':
        return filtered.sort((a, b) => a.price - b.price)
      case 'price-high':
        return filtered.sort((a, b) => b.price - a.price)
      case 'rating':
        return filtered.sort((a, b) => b.rating - a.rating)
      case 'duration':
        return filtered.sort((a, b) => parseInt(a.duration) - parseInt(b.duration))
      case 'popularity':
        return filtered.sort((a, b) => b.reviews - a.reviews)
      default: // recommended
        return filtered.sort((a, b) => (b.rating * b.reviews) - (a.rating * a.reviews))
    }
  }, [searchTerm, selectedFilters, sortBy, selectedCountry, selectedBudget, selectedDuration])

  const clearFilters = () => {
    setSelectedFilters({
      region: '',
      duration: '',
      priceRange: [0, 200000],
      rating: 0
    })
    setSearchTerm('')
    setSelectedCountry('')
    setSelectedBudget('')
    setSelectedDuration('')
    setCountrySearchQuery('')
  }

  const activeFiltersCount = Object.values(selectedFilters).filter(value => 
    Array.isArray(value) ? value[0] > 0 || value[1] < 200000 : Boolean(value)
  ).length + (selectedCountry ? 1 : 0) + (selectedBudget ? 1 : 0) + (selectedDuration ? 1 : 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-16">
      {/* Modern Hero Search Section */}
      <div className="relative h-[45vh] min-h-[400px] max-h-[500px] flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Beautiful travel destinations around the world"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 text-center">
          
          {/* Search Container */}
          <div className="max-w-2xl mx-auto">
            {/* Main Search Bar */}
            <div className="relative">
              <div className="flex bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="relative flex-1">
                  <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="จุดหมาย, ประเทศ, เมือง หรือชื่อทัวร์..."
                    className="w-full pl-16 pr-6 py-5 text-gray-900 placeholder-gray-500 focus:outline-none text-base sm:text-lg"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value)
                      setIsSearching(true)
                      setTimeout(() => setIsSearching(false), 300)
                    }}
                  />
                  {isSearching && (
                    <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent"></div>
                    </div>
                  )}
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-5 transition-colors duration-200 font-semibold text-base sm:text-lg">
                  ค้นหา
                </button>
              </div>
              
              {/* Advanced Search Link - positioned absolute */}
              <div className="absolute -bottom-12 right-0 text-sm">
                <button
                  onClick={() => setShowFilters(true)}
                  className="text-white/90 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="border-b border-white/40 group-hover:border-white">ค้นหาขั้นสูง</span>
                  {activeFiltersCount > 0 && (
                    <span className="bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-bold">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* Filters & Controls Bar */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            {/* View Toggle - Left */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('card')}
                className={`p-2 rounded-md transition-all duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center ${
                  viewMode === 'card' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-all duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center ${
                  viewMode === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-3">
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-3 min-h-[44px] focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="recommended">แนะนำ</option>
                <option value="price-low">ราคาต่ำ-สูง</option>
                <option value="price-high">ราคาสูง-ต่ำ</option>
                <option value="rating">คะแนนสูงสุด</option>
                <option value="popularity">ความนิยม</option>
                <option value="duration">ระยะเวลา</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Filter Modal */}
      {showFilters && (
        <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm lg:hidden">
          <div className="absolute inset-0 bg-white animate-in slide-in-from-top duration-300">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex-1 overflow-y-auto p-4 pb-2 space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">🌍 ประเทศทั้งหมด</h3>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="group p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 hover:text-gray-800 transition-all duration-200"
                    >
                      <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
                    </button>
                  </div>

                  {/* Country Search */}
                  <div className="mb-4">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="ค้นหาประเทศ..."
                        value={countrySearchQuery}
                        onChange={(e) => setCountrySearchQuery(e.target.value)}
                        className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-sm"
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="w-4 h-4 text-gray-400" />
                      </div>
                      {countrySearchQuery && (
                        <button
                          onClick={() => setCountrySearchQuery('')}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Countries Grid */}
                  <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                    {allCountries.filter(country => {
                      if (countrySearchQuery.length < 2) return true;
                      return country.name.toLowerCase().includes(countrySearchQuery.toLowerCase());
                    }).map((country, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedCountry(country.name === selectedCountry ? '' : country.name)}
                        className={`p-3 rounded-lg border transition-all duration-200 text-left ${
                          selectedCountry === country.name
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-[18px] h-[18px] rounded-full border border-gray-200 overflow-hidden flex-shrink-0">
                            <Image 
                              src={`/icons/destinations/flag-icons-main/flags/1x1/${country.flagCode}.svg`}
                              alt={`${country.name} flag`}
                              width={18}
                              height={18}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="text-sm font-medium truncate">{country.name}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget Filter */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">💰 งบประมาณ</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'ไม่เกิน 30,000', value: '30000' },
                      { label: 'ไม่เกิน 50,000', value: '50000' },
                      { label: 'ไม่เกิน 100,000', value: '100000' },
                      { label: 'โปรโมชั่น', value: 'promotion' }
                    ].map((budget, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedBudget(budget.value === selectedBudget ? '' : budget.value)}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                          selectedBudget === budget.value
                            ? 'border-green-500 bg-green-50 text-green-700'
                            : 'border-gray-200 bg-white hover:border-green-300 hover:bg-green-50'
                        }`}
                      >
                        <div className="text-sm font-medium">{budget.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Duration Filter */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">⏰ ระยะเวลา</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: '3-5 วัน', value: 'short' },
                      { label: '6-8 วัน', value: 'medium' },
                      { label: '9-12 วัน', value: 'long' },
                      { label: 'มากกว่า 2 สัปดาห์', value: 'extended' }
                    ].map((duration, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedDuration(duration.value === selectedDuration ? '' : duration.value)}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                          selectedDuration === duration.value
                            ? 'border-purple-500 bg-purple-50 text-purple-700'
                            : 'border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50'
                        }`}
                      >
                        <div className="text-sm font-medium">{duration.label}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Fixed Bottom Buttons */}
              <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 space-y-3">
                <button
                  onClick={() => setShowFilters(false)}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  ค้นหาทัวร์ ({filteredTours.length} ผลลัพธ์)
                </button>
                <button
                  onClick={clearFilters}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-medium transition-colors"
                >
                  ล้างตัวกรอง
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tours Content */}
      <div className="px-4 py-4 sm:py-6">
        {filteredTours.length === 0 ? (
          <div className="text-center py-16 animate-fade-in">
            <div className="w-20 sm:w-24 h-20 sm:h-24 mx-auto mb-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full flex items-center justify-center animate-zoom-in">
              <Search className="w-6 sm:w-8 h-6 sm:h-8 text-blue-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">ไม่พบทัวร์ที่ตรงกับเงื่อนไข</h3>
            <p className="text-gray-600 mb-6 sm:mb-8 max-w-sm mx-auto leading-relaxed text-sm sm:text-base">ลองเปลี่ยนเงื่อนไขการค้นหาหรือตัวกรองเพื่อค้นหาทัวร์ที่เหมาะกับคุณ</p>
            <button
              onClick={clearFilters}
              className="px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 min-h-[44px]"
            >
              ล้างตัวกรองทั้งหมด
            </button>
          </div>
        ) : isLoading ? (
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
                <div className="h-48 sm:h-52 md:h-56 bg-gray-200"></div>
                <div className="p-4 sm:p-5">
                  <div className="h-4 bg-gray-200 rounded mb-3"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="flex justify-between items-end">
                    <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-10 bg-gray-200 rounded w-20"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={viewMode === 'list' ? 'space-y-4' : 'grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}>
            {filteredTours.map((tour) => (
              <TourCard 
                key={tour.id} 
                tour={tour} 
                viewMode={viewMode}
                isWishlisted={wishlist.includes(tour.id)}
                onToggleWishlist={() => toggleWishlist(tour.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// Tour Card Component
function TourCard({ 
  tour, 
  viewMode, 
  isWishlisted, 
  onToggleWishlist 
}: { 
  tour: any
  viewMode: 'card' | 'list'
  isWishlisted: boolean
  onToggleWishlist: () => void
}) {
  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
        <div className="flex">
          {/* Image */}
          <div className="relative w-28 sm:w-32 h-28 sm:h-32 flex-shrink-0 rounded-lg overflow-hidden">
            <Image
              src={tour.image}
              alt={tour.title}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
            {tour.discount > 0 && (
              <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
                -{tour.discount}%
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 p-3 sm:p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base line-clamp-2 flex-1 mr-2">
                {tour.title}
              </h3>
              <button
                onClick={onToggleWishlist}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'
                  }`}
                />
              </button>
            </div>

            {/* Rating & Info */}
            <div className="flex items-center gap-3 mb-3 text-xs text-gray-600">
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{tour.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{tour.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>{tour.destinations[0]}</span>
              </div>
            </div>

            {/* Price & CTA */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-bold text-blue-600">
                  ฿{tour.price.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">ต่อคน</p>
              </div>
              <Link
                href={`/tours/${tour.id}`}
                className="px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg text-sm font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl min-h-[44px] flex items-center justify-center"
              >
                จองเลย
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Image Section */}
      <div className="relative h-48 sm:h-52 md:h-56 overflow-hidden">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
        />
        
        {/* Overlays */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          {tour.discount > 0 && (
            <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
              ลด {tour.discount}%
            </div>
          )}
          <button
            onClick={onToggleWishlist}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <Heart
              className={`w-5 h-5 ${
                isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'
              }`}
            />
          </button>
        </div>

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* Duration Badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-sm font-medium">
          <Clock className="w-4 h-4 text-blue-600" />
          <span>{tour.duration}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-5">
        {/* Title */}
        <h3 className="font-semibold text-gray-900 text-base sm:text-lg mb-3 line-clamp-2 leading-tight">
          {tour.title}
        </h3>

        {/* Rating & Reviews */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-sm">{tour.rating}</span>
          </div>
          <span className="text-gray-500 text-sm">({tour.reviews} รีวิว)</span>
        </div>

        {/* Key Info Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-500" />
            <span className="truncate">{tour.destinations.slice(0, 2).join(', ')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-green-500" />
            <span>{tour.groupSize}</span>
          </div>
          <div className="flex items-center gap-2 col-span-2">
            <Calendar className="w-4 h-4 text-purple-500" />
            <span>{tour.departureDate}</span>
          </div>
        </div>

        {/* Highlights */}
        <div className="mb-5">
          <div className="flex flex-wrap gap-2">
            {tour.highlights.slice(0, 3).map((highlight: string, index: number) => (
              <span
                key={index}
                className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full font-medium"
              >
                {highlight}
              </span>
            ))}
            {tour.highlights.length > 3 && (
              <span className="text-xs text-gray-500 px-2 py-1">
                +{tour.highlights.length - 3} อื่นๆ
              </span>
            )}
          </div>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            {tour.originalPrice && tour.originalPrice > tour.price && (
              <p className="text-sm text-gray-500 line-through">
                ฿{tour.originalPrice.toLocaleString()}
              </p>
            )}
            <p className="text-2xl font-bold text-blue-600">
              ฿{tour.price.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500">ต่อคน</p>
          </div>
          
          <Link 
            href={`/tours/${tour.id}`}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 sm:px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 min-h-[44px] text-sm sm:text-base"
          >
            จองเลย
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}