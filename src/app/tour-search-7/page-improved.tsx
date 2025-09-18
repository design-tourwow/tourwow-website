'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { 
  X, Star, MapPin, Clock, TrendingUp, Sparkles, CheckCircle, Plane, Globe, Crown, ChevronUp, ChevronDown, Filter, Calendar, Users, Hotel, Shield
} from 'lucide-react'
import { toursData, getToursByCountry, getToursByContinent } from '@/lib/tour-data-consolidated'
import TourCard from '@/components/TourCard'

// Popular destinations by continent
const popularDestinationsByContinent = {
  'เอเชีย': [
    { id: 1, name: 'ญี่ปุ่น', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 3 },
    { id: 2, name: 'เกาหลีใต้', image: 'https://images.unsplash.com/photo-1538485399081-7c8ce013b933?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 1 },
    { id: 3, name: 'ไต้หวัน', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 1 },
    { id: 4, name: 'ฮ่องกง', image: 'https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 1 },
    { id: 5, name: 'สิงคโปร์', image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 1 },
    { id: 6, name: 'มาเลเซีย', image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f11?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 1 }
  ],
  'ยุโรป': [
    { id: 7, name: 'ฝรั่งเศส', image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 2 },
    { id: 8, name: 'อิตาลี', image: 'https://images.unsplash.com/photo-1555992336-03a23c7b20ee?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 2 },
    { id: 9, name: 'สวิตเซอร์แลนด์', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 1 },
    { id: 10, name: 'เนเธอร์แลนด์', image: 'https://images.unsplash.com/photo-1512470876302-972faa02aa51?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 1 },
    { id: 11, name: 'เบลเยียม', image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 1 },
    { id: 12, name: 'เยอรมนี', image: 'https://images.unsplash.com/photo-1555992336-03a23c7b20ee?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 1 }
  ]
}

export default function TourSearch7PageImproved() {
  const [selectedContinent, setSelectedContinent] = useState<'เอเชีย' | 'ยุโรป'>('เอเชีย')
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [hasScrolledToResults, setHasScrolledToResults] = useState(false)
  const [selectedMonths, setSelectedMonths] = useState<{[tourId: number]: string}>({})
  
  // Filter & Sorting States
  const [priceRange, setPriceRange] = useState<string>('')
  const [duration, setDuration] = useState<string>('')
  const [rating, setRating] = useState<string>('')
  const [sortBy, setSortBy] = useState<string>('popular')
  
  // All available months in order
  const allMonths = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.']
  
  // Auto-select first month for all tours on component mount
  React.useEffect(() => {
    const initialSelections: {[tourId: number]: string} = {}
    toursData.forEach(tour => {
      initialSelections[tour.id] = allMonths[0] // Default to first month
    })
    setSelectedMonths(initialSelections)
  }, [])
  
  const handleMonthSelect = (tourId: number, month: string) => {
    setSelectedMonths(prev => ({ ...prev, [tourId]: month }))
  }

  // Dynamic tour count calculation
  const getTourCountForCountry = (countryName: string) => {
    return getToursByCountry(countryName).length
  }

  // Filter tours based on selected country
  const filteredTours = (() => {
    if (!hasScrolledToResults) return toursData // Don't filter until user scrolls
    
    if (selectedCountry) {
      // Filter by country if selected
      return getToursByCountry(selectedCountry)
    }
    return getToursByContinent(selectedContinent)
  })()

  // Get current destinations based on selected continent with dynamic tour counts
  const currentDestinations = (() => {
    const continentCountries = popularDestinationsByContinent[selectedContinent] || []
    return continentCountries.map(country => ({
      ...country,
      tours: getTourCountForCountry(country.name)
    }))
  })()
  
  // All destinations with "ทั้งหมด" button at the end (only if there are destinations)
  const allDestinations = currentDestinations.length > 0 ? [
    ...currentDestinations,
    { id: 999, name: 'ทั้งหมด', image: null, tours: toursData.length }
  ] : []
  
  // Handle country selection
  const handleCountrySelect = (countryName: string | null) => {
    setSelectedCountry(countryName)
    setHasScrolledToResults(false)
  }

  // Scroll detection
  const handleScroll = () => {
    const resultsSection = document.getElementById('results-section')
    if (resultsSection) {
      const rect = resultsSection.getBoundingClientRect()
      if (rect.top <= window.innerHeight && !hasScrolledToResults) {
        setHasScrolledToResults(true)
      }
    }
  }

  // Add scroll listener
  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [hasScrolledToResults])

  return (
    <>
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Hero Section - Enhanced */}
        <div className="relative h-[500px] w-full overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600"
            alt="Beautiful Mountain Landscape"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <Sparkles className="w-5 h-5 text-yellow-300" />
                <span className="text-white/90 text-sm font-medium">ค้นพบประสบการณ์ใหม่</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 text-center drop-shadow-2xl leading-tight">
                ค้นพบโลกใบใหม่
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200">
                  ไปกับเรา
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 text-center drop-shadow-lg max-w-3xl leading-relaxed">
                เลือกจุดหมายปลายทางในฝันของคุณ พร้อมแพ็คเกจทัวร์คุณภาพระดับพรีเมียม
              </p>
              <div className="flex items-center justify-center gap-8 text-white/80 text-sm">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  <span>รับประกันคุณภาพ</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>50,000+ ลูกค้า</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-300" />
                  <span>4.8/5 คะแนน</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Country Destinations Section - Redesigned */}
        <div className="max-w-7xl mx-auto px-4 -mt-24 relative z-10">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
                เลือกจุดหมายปลายทางของคุณ
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                สำรวจแพ็คเกจทัวร์ยอดนิยมจากทั่วโลก พร้อมประสบการณ์การเดินทางที่ไม่มีวันลืม
              </p>
            </div>
            
            {/* Tab Selector - Enhanced */}
            <div className="flex justify-center mb-12">
              <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl p-2 flex max-w-full overflow-x-auto scrollbar-hide shadow-lg border border-gray-300">
                <button
                  onClick={() => {
                    setSelectedContinent('เอเชีย')
                    setSelectedCountry(null)
                    setHasScrolledToResults(false)
                  }}
                  className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap flex items-center gap-3 relative overflow-hidden ${
                    selectedContinent === 'เอเชีย'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-xl transform scale-105'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-white/80 hover:shadow-md'
                  }`}
                >
                  {selectedContinent === 'เอเชีย' && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 animate-pulse rounded-xl"></div>
                  )}
                  <Globe className={`w-6 h-6 relative z-10 ${selectedContinent === 'เอเชีย' ? 'animate-bounce' : ''}`} />
                  <span className="relative z-10 text-lg">ทัวร์เอเชีย</span>
                </button>
                <button
                  onClick={() => {
                    setSelectedContinent('ยุโรป')
                    setSelectedCountry(null)
                    setHasScrolledToResults(false)
                  }}
                  className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap flex items-center gap-3 relative overflow-hidden ${
                    selectedContinent === 'ยุโรป'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-xl transform scale-105'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-white/80 hover:shadow-md'
                  }`}
                >
                  {selectedContinent === 'ยุโรป' && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 animate-pulse rounded-xl"></div>
                  )}
                  <Crown className={`w-6 h-6 relative z-10 ${selectedContinent === 'ยุโรป' ? 'animate-bounce' : ''}`} />
                  <span className="relative z-10 text-lg">ทัวร์ยุโรป</span>
                </button>
              </div>
            </div>

            {/* Desktop Grid - Enhanced */}
            <div className="hidden md:grid grid-cols-3 gap-8">
              {currentDestinations.slice(0, 6).map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    handleCountrySelect(item.name)
                  }}
                  className={`group relative overflow-hidden rounded-2xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 ${
                    selectedCountry === item.name
                      ? 'ring-4 ring-blue-400 shadow-2xl scale-105 bg-blue-50/20' 
                      : 'ring-2 ring-transparent hover:ring-blue-300'
                  }`}
                >
                  <div className="relative h-72">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-125 transition-transform duration-700 ease-out"
                        sizes="(max-width: 768px) 33vw, (max-width: 1200px) 20vw, 16vw"
                        priority={item.id <= 5}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://via.placeholder.com/400x300/3B82F6/FFFFFF?text=${encodeURIComponent(item.name)}`;
                        }}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    
                    {/* Selected state highlight */}
                    {selectedCountry === item.name && (
                      <div className="absolute inset-0 bg-blue-500/20 border-4 border-blue-400 rounded-2xl animate-pulse"></div>
                    )}
                    
                    <div className="absolute inset-0 flex flex-col items-center justify-end p-6">
                      <h3 className="text-white font-bold text-2xl mb-3 text-center drop-shadow-lg">{item.name}</h3>
                      <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-white font-bold text-lg">{item.tours}</span>
                        <span className="text-white/90 text-sm">ทัวร์</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Mobile Grid - Enhanced */}
            <div className="md:hidden">
              <div className="grid grid-cols-2 gap-4">
                {currentDestinations.slice(0, 6).map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      handleCountrySelect(item.name)
                    }}
                    className={`group relative overflow-hidden rounded-2xl transition-all duration-300 active:scale-95 ${
                      selectedCountry === item.name
                        ? 'shadow-xl scale-102 ring-4 ring-blue-400 bg-blue-50/20' 
                        : 'shadow-lg hover:shadow-xl active:shadow-xl'
                    }`}
                    style={{ touchAction: 'manipulation' }}
                  >
                    <div className="relative h-48">
                      {item.image && (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover group-active:scale-110 transition-transform duration-500"
                          sizes="(max-width: 768px) 50vw, 50vw"
                          priority={item.id <= 3}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = `https://via.placeholder.com/400x400/3B82F6/FFFFFF?text=${encodeURIComponent(item.name)}`;
                          }}
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                      <div className="absolute inset-0 flex flex-col items-center justify-end p-4">
                        <h3 className="text-white font-bold text-lg mb-2 text-center leading-tight drop-shadow-lg">{item.name}</h3>
                        <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/30">
                          <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-white font-bold text-sm">{item.tours}</span>
                          <span className="text-white/90 text-xs">ทัวร์</span>
                        </div>
                      </div>
                      
                      {/* Selected state highlight for mobile */}
                      {selectedCountry === item.name && (
                        <div className="absolute inset-0 border-3 border-blue-500 rounded-2xl bg-blue-500/10">
                          <div className="absolute top-3 right-3">
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                              <CheckCircle className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Filter & Sorting Toggle Button - Enhanced */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-end">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0 group"
            >
              <Filter className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" />
              <span className="font-semibold">ตัวกรองและเรียงลำดับ</span>
              {showFilters ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Collapsible Filter & Sorting Section - Enhanced */}
        {showFilters && (
          <div className="max-w-7xl mx-auto px-4 pb-8">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Filter Section */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-gray-800">
                    <Filter className="w-6 h-6 text-blue-600" />
                    ตัวกรอง
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Price Range */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">ช่วงราคา</label>
                      <select 
                        value={priceRange}
                        onChange={(e) => setPriceRange(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
                      >
                        <option value="">ทั้งหมด</option>
                        <option value="0-10000">ต่ำกว่า 10,000 บาท</option>
                        <option value="10000-30000">10,000 - 30,000 บาท</option>
                        <option value="30000-50000">30,000 - 50,000 บาท</option>
                        <option value="50000+">มากกว่า 50,000 บาท</option>
                      </select>
                    </div>
                    
                    {/* Duration */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">ระยะเวลา</label>
                      <select 
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
                      >
                        <option value="">ทั้งหมด</option>
                        <option value="1-3">1-3 วัน</option>
                        <option value="4-7">4-7 วัน</option>
                        <option value="8-14">8-14 วัน</option>
                        <option value="15+">15+ วัน</option>
                      </select>
                    </div>
                    
                    {/* Rating */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">คะแนนรีวิว</label>
                      <select 
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
                      >
                        <option value="">ทั้งหมด</option>
                        <option value="4.5+">4.5+ ดาว</option>
                        <option value="4.0+">4.0+ ดาว</option>
                        <option value="3.5+">3.5+ ดาว</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                {/* Sorting Section */}
                <div className="lg:w-80">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-gray-800">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                    เรียงลำดับ
                  </h3>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
                  >
                    <option value="popular">ยอดนิยม</option>
                    <option value="price-low">ราคาต่ำ-สูง</option>
                    <option value="price-high">ราคาสูง-ต่ำ</option>
                    <option value="rating">คะแนนรีวิว</option>
                    <option value="duration">ระยะเวลา</option>
                  </select>
                </div>
              </div>
              
              {/* Active Filters - Enhanced */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-sm font-semibold text-gray-700">ตัวกรองที่ใช้งาน:</span>
                  <div className="flex gap-3 flex-wrap">
                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-300">
                      ทัวร์{selectedContinent}
                      <button 
                        onClick={() => setSelectedContinent('เอเชีย')}
                        className="ml-2 text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                    {selectedCountry && (
                      <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300">
                        {selectedCountry}
                        <button 
                          onClick={() => setSelectedCountry(null)}
                          className="ml-2 text-green-600 hover:text-green-800 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </span>
                    )}
                    {priceRange && (
                      <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 border border-purple-300">
                        ราคา: {priceRange}
                        <button 
                          onClick={() => setPriceRange('')}
                          className="ml-2 text-purple-600 hover:text-purple-800 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </span>
                    )}
                    {duration && (
                      <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800 border border-orange-300">
                        ระยะเวลา: {duration}
                        <button 
                          onClick={() => setDuration('')}
                          className="ml-2 text-orange-600 hover:text-orange-800 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </span>
                    )}
                    {rating && (
                      <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border border-yellow-300">
                        คะแนน: {rating}
                        <button 
                          onClick={() => setRating('')}
                          className="ml-2 text-yellow-600 hover:text-yellow-800 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content - Enhanced */}
        <div id="results-section" className="max-w-7xl mx-auto px-4 py-12">
          {/* Results Count - Sticky Header */}
          <div className="sticky top-16 bg-white/95 backdrop-blur-sm border-b border-gray-200 py-4 md:py-6 mb-8 z-40 -mx-4 px-4 md:mx-0 md:px-0 rounded-b-2xl shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  {selectedCountry 
                    ? `ทัวร์${selectedCountry}` 
                    : `ทัวร์${selectedContinent}`
                  }
                </h2>
                <span className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  {filteredTours.length} ทัวร์
                </span>
              </div>
              {selectedCountry && (
                <button
                  onClick={() => {
                    handleCountrySelect(null)
                    setHasScrolledToResults(false)
                  }}
                  className="text-sm text-gray-500 hover:text-red-500 transition-colors duration-200 flex items-center gap-2 bg-gray-100 hover:bg-red-50 px-3 py-2 rounded-lg"
                  style={{ touchAction: 'manipulation' }}
                >
                  <X className="w-4 h-4" />
                  <span>ล้างตัวกรอง</span>
                </button>
              )}
            </div>
          </div>
          
          {/* Additional Info - Non-sticky */}
          <div className="mb-8 -mt-6">
            {selectedCountry && (
              <p className="text-gray-600 mt-2 text-base md:text-lg">กำลังแสดงเฉพาะทัวร์ที่ไป{selectedCountry}</p>
            )}
            {!hasScrolledToResults && selectedCountry && (
              <div className="flex items-center gap-2 text-blue-600 mt-2 text-sm bg-blue-50 px-4 py-2 rounded-lg border border-blue-200">
                <Sparkles className="w-4 h-4" />
                <span>💡 เลื่อนลงเพื่อดูผลการค้นหาที่กรองแล้ว</span>
              </div>
            )}
          </div>

          {/* Tours Grid - Enhanced */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredTours.map(tour => (
              <TourCard
                key={tour.id}
                tour={tour}
                selectedMonths={selectedMonths}
                onMonthSelect={handleMonthSelect}
                allMonths={allMonths}
              />
            ))}
          </div>
        </div>

        {/* Newsletter Section - Enhanced */}
        <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 py-20 mt-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 mb-6">
              <Sparkles className="w-6 h-6 text-yellow-300" />
              <span className="text-white/90 font-medium">รับข้อเสนอพิเศษ</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">ไม่พลาดโปรโมชั่นเด็ด</h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              สมัครรับข่าวสารเพื่อรับโปรโมชั่นและข้อเสนอพิเศษก่อนใคร พร้อมสิทธิ์พิเศษสำหรับสมาชิก
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="กรอกอีเมลของคุณ"
                className="flex-1 px-6 py-4 rounded-2xl border-0 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg shadow-lg"
              />
              <button className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 rounded-2xl hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl font-bold text-lg">
                สมัครรับข่าวสาร
              </button>
            </div>
          </div>
        </div>

        {/* Trust Section - Enhanced */}
        <div className="py-20 bg-gradient-to-br from-white to-gray-50">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">ทำไมต้องเลือกเรา</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="group">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">50k+</h3>
                <p className="text-gray-600 font-medium">ลูกค้าพึงพอใจ</p>
              </div>
              <div className="group">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110">
                  <Globe className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">500+</h3>
                <p className="text-gray-600 font-medium">แพ็คเกจทัวร์</p>
              </div>
              <div className="group">
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110">
                  <MapPin className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">100+</h3>
                <p className="text-gray-600 font-medium">จุดหมายปลายทาง</p>
              </div>
              <div className="group">
                <div className="bg-gradient-to-br from-yellow-500 to-orange-600 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110">
                  <Star className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">4.8</h3>
                <p className="text-gray-600 font-medium">คะแนนความพึงพอใจ</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 