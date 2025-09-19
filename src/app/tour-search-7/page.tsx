'use client'

export const dynamic = 'force-dynamic'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  X, Star, MapPin, Clock, TrendingUp, Sparkles, CheckCircle, Plane, Globe, Crown, ChevronUp, ChevronDown, Filter, Calendar, Users, Hotel, Shield
} from 'lucide-react'

// Import tours data from consolidated file
import { toursData } from '@/lib/tour-data-consolidated'

// Use tours data from the consolidated file
const tours = toursData

// Popular destinations by continent - Updated to show 18 countries for swipe testing
const popularDestinationsByContinent = {
  'เอเชีย': [
    { id: 1, name: 'ญี่ปุ่น', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 3 },
    { id: 2, name: 'เกาหลีใต้', image: 'https://images.unsplash.com/photo-1538485399081-7c8ce013b933?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 2 },
    { id: 3, name: 'จีน', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 2 },
    { id: 4, name: 'สิงคโปร์', image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 1 },
    { id: 5, name: 'มาเลเซีย', image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f11?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 1 },
    { id: 6, name: 'เวียดนาม', image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 1 },
    { id: 13, name: 'ไทย', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 2 },
    { id: 14, name: 'อินโดนีเซีย', image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 1 },
    { id: 15, name: 'ฟิลิปปินส์', image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 1 },
    { id: 19, name: 'อินเดีย', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 2 },
    { id: 20, name: 'ศรีลังกา', image: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 1 },
    { id: 21, name: 'เนปาล', image: 'https://images.unsplash.com/photo-1544735716-392fe248dcec?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 1 },
    { id: 22, name: 'ภูฏาน', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 1 },
    { id: 23, name: 'กัมพูชา', image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 1 },
    { id: 24, name: 'ลาว', image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 1 },
    { id: 25, name: 'พม่า', image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 1 },
    { id: 26, name: 'บรูไน', image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 1 },
    { id: 27, name: 'ติมอร์ตะวันออก', image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 1 }
  ],
  'ยุโรป': [
    { id: 7, name: 'ฝรั่งเศส', image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 2 },
    { id: 8, name: 'อิตาลี', image: 'https://images.unsplash.com/photo-1555992336-03a23c7b20ee?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 2 },
    { id: 9, name: 'สเปน', image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 1 },
    { id: 10, name: 'สวิตเซอร์แลนด์', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 1 },
    { id: 11, name: 'เนเธอร์แลนด์', image: 'https://images.unsplash.com/photo-1512470876302-972faa02aa51?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 1 },
    { id: 12, name: 'เยอรมนี', image: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 1 },
    { id: 16, name: 'อังกฤษ', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 2 },
    { id: 17, name: 'กรีซ', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 1 },
    { id: 18, name: 'ออสเตรีย', image: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 1 },
    { id: 28, name: 'เบลเยียม', image: 'https://images.unsplash.com/photo-1512470876302-972faa02aa51?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 1 },
    { id: 29, name: 'โปรตุเกส', image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 1 },
    { id: 30, name: 'ไอร์แลนด์', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 1 },
    { id: 31, name: 'เดนมาร์ก', image: 'https://images.unsplash.com/photo-1512470876302-972faa02aa51?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 1 },
    { id: 32, name: 'นอร์เวย์', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 1 },
    { id: 33, name: 'สวีเดน', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 1 },
    { id: 34, name: 'ฟินแลนด์', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 1 },
    { id: 35, name: 'โปแลนด์', image: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 1 },
    { id: 36, name: 'เช็ก', image: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 1 }
  ]
}

export default function TourSearch7Page() {
  const [isClient, setIsClient] = useState(false)
  const [selectedContinent, setSelectedContinent] = useState<'เอเชีย' | 'ยุโรป'>('เอเชีย')
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [hasScrolledToResults, setHasScrolledToResults] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  
  // Filter & Sorting States
  const [priceRange, setPriceRange] = useState<string>('')
  const [duration, setDuration] = useState<string>('')
  const [rating, setRating] = useState<string>('')
  const [sortBy, setSortBy] = useState<string>('popular')
  
  // Client-side detection for hydration
  React.useEffect(() => {
    setIsClient(true)
  }, [])
  
  // All available months
  const allMonths = ['ส.ค. 68', 'ก.ย. 68', 'ต.ค. 68', 'พ.ย. 68', 'ธ.ค. 68', 'ม.ค. 69', 'ก.พ. 69']
  
  // Dynamic tour count calculation
  const getTourCountForCountry = (countryName: string) => {
    return tours.filter(tour => tour.location.includes(countryName)).length
  }

  // Filter tours based on selected country
  const filteredTours = (() => {
    if (!hasScrolledToResults) return tours
    
    if (selectedCountry) {
      return tours.filter(tour => tour.location.includes(selectedCountry))
    }
    return tours
  })()

  // Get current destinations based on selected continent with dynamic tour counts
  const currentDestinations = (() => {
    const continentCountries = popularDestinationsByContinent[selectedContinent] || []
    return continentCountries.map(country => ({
      ...country,
      tours: getTourCountForCountry(country.name)
    }))
  })()
  
  // Handle country selection
  const handleCountrySelect = (countryName: string | null) => {
    setSelectedCountry(countryName)
    setHasScrolledToResults(false)
  }

  // Handle swipe page change
  const handlePageChange = (pageIndex: number) => {
    setCurrentPage(pageIndex)
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
        {/* Hero Section */}
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
            </div>
          </div>
        </div>

        {/* Country Destinations Section */}
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
            
            {/* Tab Selector - Reduced button size */}
            <div className="flex justify-center mb-12">
              <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl p-1.5 flex max-w-full overflow-x-auto scrollbar-hide shadow-lg border border-gray-300">
                <button
                  onClick={() => {
                    setSelectedContinent('เอเชีย')
                    setSelectedCountry(null)
                    setHasScrolledToResults(false)
                  }}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap flex items-center gap-2 ${
                    selectedContinent === 'เอเชีย'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg transform scale-105'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-white/80 hover:shadow-md'
                  }`}
                >
                  <Globe className="w-5 h-5" />
                  <span className="text-base">ทัวร์เอเชีย</span>
                </button>
                <button
                  onClick={() => {
                    setSelectedContinent('ยุโรป')
                    setSelectedCountry(null)
                    setHasScrolledToResults(false)
                  }}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap flex items-center gap-2 ${
                    selectedContinent === 'ยุโรป'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg transform scale-105'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-white/80 hover:shadow-md'
                  }`}
                >
                  <Crown className="w-5 h-5" />
                  <span className="text-base">ทัวร์ยุโรป</span>
                </button>
              </div>
            </div>

            {/* Desktop Grid - 3x3 with Swipe */}
            <div className="hidden md:block">
              <div className="relative">
                <div 
                  className="flex overflow-x-auto scrollbar-hide gap-6 pb-4 snap-x snap-mandatory"
                  onScroll={(e) => {
                    const target = e.target as HTMLElement
                    const scrollLeft = target.scrollLeft
                    const width = target.clientWidth
                    const pageIndex = Math.round(scrollLeft / width)
                    if (pageIndex !== currentPage) {
                      handlePageChange(pageIndex)
                    }
                  }}
                >
                  {/* First Set - 3x3 Grid */}
                  <div className="grid grid-cols-3 gap-6 min-w-full snap-start">
                    {currentDestinations.slice(0, 9).map(item => (
                      <button
                        key={item.id}
                        onClick={() => handleCountrySelect(item.name)}
                        className={`group relative overflow-hidden rounded-2xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 ${
                          selectedCountry === item.name
                            ? 'ring-4 ring-blue-400 shadow-2xl scale-105 bg-blue-50/20' 
                            : 'ring-2 ring-transparent hover:ring-blue-300'
                        }`}
                      >
                        <div className="relative h-56">
                          {item.image && (
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover group-hover:scale-125 transition-transform duration-700 ease-out"
                              sizes="(max-width: 768px) 50vw, 33vw"
                              priority={item.id <= 9}
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                          
                          <div className="absolute inset-0 flex flex-col items-center justify-end p-4">
                            <h3 className="text-white font-bold text-xl mb-2 text-center drop-shadow-lg">{item.name}</h3>
                            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
                              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                              <span className="text-white font-bold text-base">{item.tours}</span>
                              <span className="text-white/90 text-sm">ทัวร์</span>
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Second Set - Remaining countries */}
                  {currentDestinations.length > 9 && (
                    <div className="grid grid-cols-3 gap-6 min-w-full snap-start">
                      {currentDestinations.slice(9).map(item => (
                        <button
                          key={item.id}
                          onClick={() => handleCountrySelect(item.name)}
                          className={`group relative overflow-hidden rounded-2xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 ${
                            selectedCountry === item.name
                              ? 'ring-4 ring-blue-400 shadow-2xl scale-105 bg-blue-50/20' 
                              : 'ring-2 ring-transparent hover:ring-blue-300'
                          }`}
                        >
                          <div className="relative h-56">
                            {item.image && (
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover group-hover:scale-125 transition-transform duration-700 ease-out"
                                sizes="(max-width: 768px) 50vw, 33vw"
                              />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                            
                            <div className="absolute inset-0 flex flex-col items-center justify-end p-4">
                              <h3 className="text-white font-bold text-xl mb-2 text-center drop-shadow-lg">{item.name}</h3>
                              <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span className="text-white font-bold text-base">{item.tours}</span>
                                <span className="text-white/90 text-sm">ทัวร์</span>
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Swipe Indicator */}
                {currentDestinations.length > 9 && (
                  <div className="flex justify-center mt-6">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${currentPage === 0 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                      <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${currentPage === 1 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Grid - 3x3 with Swipe */}
            <div className="md:hidden">
              <div className="relative">
                <div 
                  className="flex overflow-x-auto scrollbar-hide gap-3 pb-4 snap-x snap-mandatory"
                  onScroll={(e) => {
                    const target = e.target as HTMLElement
                    const scrollLeft = target.scrollLeft
                    const width = target.clientWidth
                    const pageIndex = Math.round(scrollLeft / width)
                    if (pageIndex !== currentPage) {
                      handlePageChange(pageIndex)
                    }
                  }}
                >
                  {/* First Set - 3x3 Grid */}
                  <div className="grid grid-cols-3 gap-3 min-w-full snap-start">
                    {currentDestinations.slice(0, 9).map(item => (
                      <button
                        key={item.id}
                        onClick={() => handleCountrySelect(item.name)}
                        className={`group relative overflow-hidden rounded-xl transition-all duration-300 active:scale-95 ${
                          selectedCountry === item.name
                            ? 'shadow-xl scale-102 ring-4 ring-blue-400 bg-blue-50/20' 
                            : 'shadow-lg hover:shadow-xl active:shadow-xl'
                        }`}
                      >
                        <div className="relative h-32">
                          {item.image && (
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover group-active:scale-110 transition-transform duration-500"
                              sizes="(max-width: 768px) 33vw, 50vw"
                              priority={item.id <= 9}
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                          <div className="absolute inset-0 flex flex-col items-center justify-end p-2">
                            <h3 className="text-white font-bold text-sm mb-1 text-center leading-tight drop-shadow-lg">{item.name}</h3>
                            <div className="flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full border border-white/30">
                              <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
                              <span className="text-white font-bold text-xs">{item.tours}</span>
                              <span className="text-white/90 text-xs">ทัวร์</span>
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Second Set - Remaining countries */}
                  {currentDestinations.length > 9 && (
                    <div className="grid grid-cols-3 gap-3 min-w-full snap-start">
                      {currentDestinations.slice(9).map(item => (
                        <button
                          key={item.id}
                          onClick={() => handleCountrySelect(item.name)}
                          className={`group relative overflow-hidden rounded-xl transition-all duration-300 active:scale-95 ${
                            selectedCountry === item.name
                              ? 'shadow-xl scale-102 ring-4 ring-blue-400 bg-blue-50/20' 
                              : 'shadow-lg hover:shadow-xl active:shadow-xl'
                          }`}
                        >
                          <div className="relative h-32">
                            {item.image && (
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover group-active:scale-110 transition-transform duration-500"
                                sizes="(max-width: 768px) 33vw, 50vw"
                              />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                            <div className="absolute inset-0 flex flex-col items-center justify-end p-2">
                              <h3 className="text-white font-bold text-sm mb-1 text-center leading-tight drop-shadow-lg">{item.name}</h3>
                              <div className="flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full border border-white/30">
                                <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
                                <span className="text-white font-bold text-xs">{item.tours}</span>
                                <span className="text-white/90 text-xs">ทัวร์</span>
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Swipe Indicator for Mobile */}
                {currentDestinations.length > 9 && (
                  <div className="flex justify-center mt-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${currentPage === 0 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                      <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${currentPage === 1 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Filter & Sorting Toggle Button */}
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

        {/* Collapsible Filter & Sorting Section */}
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
            </div>
          </div>
        )}

        {/* Main Content */}
        <div id="results-section" className="max-w-7xl mx-auto px-4 py-12">
          {/* Results Count - Improved UX/UI */}
          <div className="sticky top-16 bg-white/95 backdrop-blur-sm border-b border-gray-200 py-4 md:py-6 mb-8 z-40 -mx-4 px-4 md:mx-0 md:px-0 rounded-b-2xl shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    {selectedCountry 
                      ? `ทัวร์${selectedCountry}` 
                      : `ทัวร์${selectedContinent}`
                    }
                  </h2>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
                      {filteredTours.length} ทัวร์
                    </span>
                  </div>
                </div>
              </div>
              {selectedCountry && (
                <button
                  onClick={() => {
                    handleCountrySelect(null)
                    setHasScrolledToResults(false)
                  }}
                  className="text-sm text-gray-500 hover:text-red-500 transition-colors duration-200 flex items-center gap-2 bg-gray-100 hover:bg-red-50 px-3 py-2 rounded-lg"
                >
                  <X className="w-4 h-4" />
                  <span>ล้างตัวกรอง</span>
                </button>
              )}
            </div>
          </div>

          {/* Tours Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredTours.map(tour => (
              <Link 
                href={`/tour-search-7/${tour.id}`} 
                key={tour.id}
                className="group block bg-white/95 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 active:scale-95 touch-manipulation border border-white/20"
              >
                {/* Image */}
                <div className="relative h-56 sm:h-60 md:h-64 overflow-hidden">
                  <Image
                    src={tour.image}
                    alt={tour.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Price Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-3 rounded-2xl shadow-2xl text-right border border-red-400">
                      {tour.originalPrice && (
                        <p className="text-sm text-red-200 line-through leading-tight">
                          ฿{isClient ? tour.originalPrice.toLocaleString() : tour.originalPrice.toString()}
                        </p>
                      )}
                      <p className="text-lg font-bold leading-tight">
                        ฿{isClient ? tour.price.toLocaleString() : tour.price.toString()}
                      </p>
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="bg-black/60 backdrop-blur-sm text-white px-3 py-2 rounded-xl border border-white/20">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span className="font-semibold text-sm">{tour.durationCode}</span>
                      </div>
                    </div>
                  </div>

                  {/* Departure Dates Badge */}
                  <div className="absolute bottom-4 left-4">
                    <div className="bg-blue-600/90 backdrop-blur-sm text-white px-3 py-2 rounded-xl border border-white/20">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span className="font-semibold text-sm">{tour.travelSeason}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  <h3 className="font-bold text-xl md:text-2xl mb-4 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
                    {tour.title}
                  </h3>
                  
                  {/* Location */}
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="w-5 h-5 text-blue-500" />
                    <span className="font-semibold ml-2 text-lg">{tour.location}</span>
                  </div>

                  {/* Airline Info */}
                  <div className="text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Plane className="w-5 h-5 text-blue-500 mr-2" />
                      <span className="font-medium">{tour.airlineName} ({tour.airline})</span>
                    </div>
                  </div>

                  {/* Reviews & Rating */}
                  <div className="flex items-center justify-between text-gray-600 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">({tour.reviews} รีวิว)</span>
                      <span className="text-gray-400">•</span>
                      <div className="flex items-center gap-1">
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map((starNumber) => {
                            const filled = tour.rating >= starNumber;
                            return (
                              <Star 
                                key={starNumber}
                                className={`w-4 h-4 ${filled ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`} 
                              />
                            );
                          })}
                        </div>
                        <span className="font-bold ml-1">{tour.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-blue-500" />
                      <span>{tour.groupSize} คน</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed text-sm">
                    {tour.highlights}
                  </p>

                  {/* View Details Button */}
                  <div className="mt-6">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center py-4 rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 shadow-lg hover:shadow-xl transform group-hover:scale-105">
                      ดูรายละเอียด
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
} 