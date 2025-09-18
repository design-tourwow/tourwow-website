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
  const [selectedMonths, setSelectedMonths] = useState<string[]>([])
  const [selectedPeople, setSelectedPeople] = useState('')
  const [selectedRating, setSelectedRating] = useState('')
  const [selectedTourType, setSelectedTourType] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('recommended')
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card')
  const [showFilters, setShowFilters] = useState(false)
  const [wishlist, setWishlist] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSearching, setIsSearching] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [showHeader, setShowHeader] = useState(true)
  
  // Load wishlist from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('tourwow-wishlist')
    if (saved) setWishlist(JSON.parse(saved))
    setIsLoading(false)
  }, [])

  // Handle scroll to show/hide header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & passed threshold
        setShowHeader(false)
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setShowHeader(true)
      }
      
      setLastScrollY(currentScrollY)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

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
    setSelectedMonths([])
    setSelectedPeople('')
    setSelectedRating('')
    setSelectedTourType('')
    setCountrySearchQuery('')
  }

  const activeFiltersCount = Object.values(selectedFilters).filter(value => 
    Array.isArray(value) ? value[0] > 0 || value[1] < 200000 : Boolean(value)
  ).length + (selectedCountry ? 1 : 0) + (selectedBudget ? 1 : 0) + (selectedDuration ? 1 : 0) + (selectedMonths.length > 0 ? 1 : 0) + (selectedPeople ? 1 : 0) + (selectedRating ? 1 : 0) + (selectedTourType ? 1 : 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Search Bar Section - Right after Header */}
      <div 
        className="sticky top-16 z-40 bg-white border-b border-gray-200 transition-transform duration-300 ease-in-out"
        style={{
          transform: showHeader ? 'translateY(0)' : 'translateY(-100%)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-1">
          <div className="max-w-5xl mx-auto">
            {/* Main Search Bar */}
            <div className="relative">
              {/* Search Input - Full Width */}
              <div className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                <div className="relative">
                  <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="พิมพ์ชื่อทัวร์, จุดหมาย, ประเทศ..."
                    className="w-full pl-16 pr-6 py-3 text-gray-900 placeholder-gray-500 focus:outline-none text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value)
                      if (e.target.value.length >= 3) {
                        setIsSearching(true)
                        setTimeout(() => setIsSearching(false), 300)
                      }
                    }}
                  />
                  {isSearching && (
                    <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent"></div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Advanced Search Link - Bottom Right */}
              <div className="text-right mt-2">
                <button
                  onClick={() => setShowFilters(true)}
                  className="text-blue-600 hover:text-blue-700 transition-colors duration-200 text-sm font-medium leading-none p-0 m-0 border-0 bg-transparent group"
                  style={{ lineHeight: '1', height: 'auto', minHeight: 'auto' }}
                >
                  <span className="border-b border-blue-300 group-hover:border-blue-700">ค้นหาขั้นสูง</span>
                  {activeFiltersCount > 0 && (
                    <span className="bg-blue-600 text-white px-2 py-0.5 rounded-full text-xs font-bold ml-1">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Inspiration Section */}
      <div className="relative overflow-hidden">
        
        {/* Hero Content */}
        <div className="relative z-10 py-4">
          <div className="max-w-7xl mx-auto px-4 w-full">
            {/* Popular Countries */}
            <div className="mb-4 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm">
              <h2 className="text-gray-900 text-xl font-bold mb-3">ประเทศยอดนิยม</h2>
              
              {/* 3 columns x 2 rows = 6 countries with scenic images */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {[
                  { 
                    name: 'ญี่ปุ่น',
                    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=400&fit=crop',
                    flagCode: 'jp'
                  },
                  { 
                    name: 'เกาหลีใต้',
                    image: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?w=400&h=400&fit=crop',
                    flagCode: 'kr'
                  },
                  { 
                    name: 'ไต้หวัน',
                    image: 'https://images.unsplash.com/photo-1508248467877-aec1b08de376?w=400&h=400&fit=crop',
                    flagCode: 'tw'
                  },
                  { 
                    name: 'อิตาลี',
                    image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=400&h=400&fit=crop',
                    flagCode: 'it'
                  },
                  { 
                    name: 'สวิส',
                    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=400&h=400&fit=crop',
                    flagCode: 'ch'
                  },
                  { 
                    name: 'ไอซ์แลนด์',
                    image: 'https://images.unsplash.com/photo-1520769669658-f07657f5a307?w=400&h=400&fit=crop',
                    flagCode: 'is'
                  }
                ].map((dest, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSearchTerm(dest.name)}
                    className="group relative aspect-square rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <Image 
                        src={dest.image}
                        alt={dest.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 33vw, 16vw"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/60 transition-colors duration-300"></div>
                    </div>
                    
                    {/* Flag */}
                    <div className="absolute top-2 right-2">
                      <div className="w-6 h-6 rounded-full border border-white/50 overflow-hidden shadow-lg">
                        <Image 
                          src={`/icons/destinations/flag-icons-main/flags/1x1/${dest.flagCode}.svg`}
                          alt={`${dest.name} flag`}
                          width={24}
                          height={24}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    
                    {/* Country Name */}
                    <div className="absolute inset-0 flex items-end justify-center p-3">
                      <h3 className="text-white font-bold text-base sm:text-sm group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">
                        ทัวร์{dest.name}
                      </h3>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Quick Filters - Clean Design (สูงสุด 3 แถว) */}
            <div className="mb-4 p-4 bg-slate-50 rounded-lg shadow-md">
              <div>
                <span className="text-gray-900 text-xl font-bold mb-3 block">ทัวร์ยอดนิยม</span>
                <div className="grid grid-cols-2 gap-3">
                  {/* 1. ทัวร์ญี่ปุ่น - Volume สูงสุด */}
                  <button className="group relative px-3 py-2 bg-white hover:bg-slate-50 text-gray-900 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg border border-gray-200 hover:border-gray-300 flex items-center gap-2 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-slate-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <svg className="w-4 h-4 text-gray-600 group-hover:text-gray-800 group-hover:rotate-12 transition-all duration-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 100 4v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2a2 2 0 100-4V6z" clipRule="evenodd" />
                    </svg>
                    <span className="truncate relative z-10 group-hover:font-bold group-hover:translate-x-0.5 transition-all duration-300">ทัวร์ญี่ปุ่น ใบไม้เปลี่ยนสี</span>
                  </button>
                  
                  {/* 2. ทัวร์ต่างประเทศ - Volume สูง */}
                  <button className="group relative px-3 py-2 bg-white hover:bg-slate-50 text-gray-900 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg border border-gray-200 hover:border-gray-300 flex items-center gap-2 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-slate-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <svg className="w-4 h-4 text-gray-600 group-hover:text-gray-800 group-hover:rotate-12 transition-all duration-300" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                    <span className="truncate relative z-10 group-hover:font-bold group-hover:translate-x-0.5 transition-all duration-300">ทัวร์ต่างประเทศ 9K</span>
                  </button>
                  
                  {/* 3. ทัวร์ยุโรป - Volume ปานกลาง */}
                  <button className="group relative px-3 py-2 bg-white hover:bg-slate-50 text-gray-900 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg border border-gray-200 hover:border-gray-300 flex items-center gap-2 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-slate-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <svg className="w-4 h-4 text-gray-600 group-hover:text-gray-800 group-hover:rotate-12 transition-all duration-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="truncate relative z-10 group-hover:font-bold group-hover:translate-x-0.5 transition-all duration-300">ทัวร์ยุโรป ราคาถูก</span>
                  </button>
                  
                  {/* 4. ทัวร์โตเกียว - Volume ปานกลาง */}
                  <button className="group relative px-3 py-2 bg-white hover:bg-slate-50 text-gray-900 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg border border-gray-200 hover:border-gray-300 flex items-center gap-2 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    <svg className="w-5 h-5 text-blue-700 group-hover:rotate-12 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                    <span className="truncate">ทัวร์โตเกียว ดิスนีย์แลนด์</span>
                  </button>
                  
                  {/* 5. ทัวร์งบประมาณ - Volume ต่ำ */}
                  <button className="px-3 py-2 bg-white hover:bg-gray-50 text-gray-900 rounded-lg font-medium text-sm transition-all duration-200 hover:scale-105 hover:shadow-lg flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0 v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                    </svg>
                    <span className="truncate">ทัวร์ญี่ปุ่น งบ 20K</span>
                  </button>
                  
                  {/* 6. ทัวร์โปรโมชั่น - Volume ต่ำ */}
                  <button className="px-3 py-2 bg-white hover:bg-gray-50 text-gray-900 rounded-lg font-medium text-sm transition-all duration-200 hover:scale-105 hover:shadow-lg flex items-center gap-2">
                    <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                    </svg>
                    <span className="truncate">ทัวร์ไฟไหม้ 50%</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Controls Bar */}
      <div className="bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="px-4 py-2">
          <div className="flex items-center justify-between gap-3">
            {/* View Toggle - Left */}
            <div className="flex bg-gray-100 rounded-lg p-0.5">
              <button
                onClick={() => setViewMode('card')}
                className={`p-1.5 rounded-md transition-all duration-200 min-h-[36px] min-w-[36px] flex items-center justify-center ${
                  viewMode === 'card' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md transition-all duration-200 min-h-[36px] min-w-[36px] flex items-center justify-center ${
                  viewMode === 'list' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'
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
                className="text-sm bg-gray-50 border border-gray-200 rounded-lg px-2 py-2 min-h-[36px] focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
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
                    <h3 className="text-base font-semibold text-gray-900">🌍 ประเทศทั้งหมด</h3>
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

                {/* Travel Date Filter - Redesigned Compact Version */}
                <div className="bg-white p-4 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <h3 className="text-base font-semibold text-gray-900">วันเดินทาง</h3>
                    <span className="text-xs text-gray-500">(2568)</span>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                    {[
                      { name: 'มกราคม', short: 'ม.ค.', value: '01', isPast: true, hasTours: true },
                      { name: 'กุมภาพันธ์', short: 'ก.พ.', value: '02', isPast: true, hasTours: true },
                      { name: 'มีนาคม', short: 'มี.ค.', value: '03', isPast: true, hasTours: true },
                      { name: 'เมษายน', short: 'เม.ย.', value: '04', isPast: false, hasTours: true },
                      { name: 'พฤษภาคม', short: 'พ.ค.', value: '05', isPast: false, hasTours: true },
                      { name: 'มิถุนายน', short: 'มิ.ย.', value: '06', isPast: false, hasTours: true },
                      { name: 'กรกฎาคม', short: 'ก.ค.', value: '07', isPast: false, hasTours: true },
                      { name: 'สิงหาคม', short: 'ส.ค.', value: '08', isPast: false, hasTours: false },
                      { name: 'กันยายน', short: 'ก.ย.', value: '09', isPast: false, hasTours: true },
                      { name: 'ตุลาคม', short: 'ต.ค.', value: '10', isPast: false, hasTours: true },
                      { name: 'พฤศจิกายน', short: 'พ.ย.', value: '11', isPast: false, hasTours: true },
                      { name: 'ธันวาคม', short: 'ธ.ค.', value: '12', isPast: false, hasTours: true }
                    ].map((month, index) => {
                      const isDisabled = month.isPast || !month.hasTours
                      const isSelected = selectedMonths.includes(month.value)
                      
                      return (
                        <button
                          key={index}
                          disabled={isDisabled}
                          onClick={() => {
                            if (isDisabled) return
                            setSelectedMonths(prev => 
                              isSelected 
                                ? prev.filter(m => m !== month.value)
                                : [...prev, month.value]
                            )
                          }}
                          className={`relative py-2 px-3 rounded-lg border text-sm font-medium transition-all ${
                            isDisabled
                              ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed opacity-50'
                              : isSelected
                              ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm'
                              : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50/50'
                          }`}
                        >
                          <div className="text-xs font-bold">{month.short}</div>
                          {isSelected && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"></div>
                          )}
                        </button>
                      )
                    })}
                  </div>
                  
                  {selectedMonths.length > 0 && (
                    <div className="mt-6 p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-white/50">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="flex items-center gap-1 text-blue-600">
                          <Calendar className="w-4 h-4" />
                          <span className="font-medium">เดือนที่เลือก:</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {selectedMonths.map(monthValue => {
                            const monthData = [
                              { name: 'มกราคม', short: 'ม.ค.', value: '01' },
                              { name: 'กุมภาพันธ์', short: 'ก.พ.', value: '02' },
                              { name: 'มีนาคม', short: 'มี.ค.', value: '03' },
                              { name: 'เมษายน', short: 'เม.ย.', value: '04' },
                              { name: 'พฤษภาคม', short: 'พ.ค.', value: '05' },
                              { name: 'มิถุนายน', short: 'มิ.ย.', value: '06' },
                              { name: 'กรกฎาคม', short: 'ก.ค.', value: '07' },
                              { name: 'สิงหาคม', short: 'ส.ค.', value: '08' },
                              { name: 'กันยายน', short: 'ก.ย.', value: '09' },
                              { name: 'ตุลาคม', short: 'ต.ค.', value: '10' },
                              { name: 'พฤศจิกายน', short: 'พ.ย.', value: '11' },
                              { name: 'ธันวาคม', short: 'ธ.ค.', value: '12' }
                            ].find(m => m.value === monthValue)
                            return (
                              <span key={monthValue} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium">
                                {monthData?.short}
                              </span>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Number of People Filter */}
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-3">👥 จำนวนผู้เดินทาง</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: '1 คน', value: '1' },
                      { label: '2 คน', value: '2' },
                      { label: '3-4 คน', value: '3-4' },
                      { label: '5+ คน', value: '5+' }
                    ].map((people, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedPeople(people.value === selectedPeople ? '' : people.value)}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                          selectedPeople === people.value
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
                        }`}
                      >
                        <div className="text-sm font-medium">{people.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-3">⭐ คะแนนรีวิว</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: '4+ ดาว', value: '4+' },
                      { label: '3+ ดาว', value: '3+' },
                      { label: 'ทุกคะแนน', value: 'all' },
                      { label: 'รีวิวเยอะ', value: 'popular' }
                    ].map((rating, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedRating(rating.value === selectedRating ? '' : rating.value)}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                          selectedRating === rating.value
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
                        }`}
                      >
                        <div className="text-sm font-medium">{rating.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tour Type Filter */}
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-3">🏷️ ประเภททัวร์</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: '🌿 ธรรมชาติ', value: 'nature' },
                      { label: '🏛️ วัฒนธรรม', value: 'culture' },
                      { label: '🛍️ ช้อปปิ้ง', value: 'shopping' },
                      { label: '🏔️ ผจญภัย', value: 'adventure' }
                    ].map((type, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedTourType(type.value === selectedTourType ? '' : type.value)}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                          selectedTourType === type.value
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
                        }`}
                      >
                        <div className="text-sm font-medium">{type.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget Filter */}
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-3">💰 งบประมาณ</h3>
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
                  <h3 className="text-base font-semibold text-gray-900 mb-3">⏰ ระยะเวลา</h3>
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
                href={`/tour-search-13/${tour.id}`}
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
            href={`/tour-search-13/${tour.id}`}
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