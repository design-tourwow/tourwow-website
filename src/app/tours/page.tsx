'use client'

import { tours } from '@/lib/tour-data'
import Link from 'next/link'
import { useState, useMemo, useEffect, Suspense } from 'react'
import { useSearchParams, useParams, useRouter } from 'next/navigation'
import { Search, Star, MapPin, Clock, Users, Filter, X, Grid, LayoutGrid } from 'lucide-react'
import Image from 'next/image'
import { LoadingProvider } from '@/components/LoadingProvider'
import TourFilterSidebar from '@/components/TourFilterSidebar'
import { Button } from '@/components/ui/Button'
import StarRating from '@/components/StarRating'
import LoadingScreen from '@/components/LoadingScreen'
import InlineLoadingSpinner from '@/components/InlineLoadingSpinner'

function ToursPageContent() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด')
  const [priceRange, setPriceRange] = useState('ทั้งหมด')
  const [selectedCountry, setSelectedCountry] = useState('ทั้งหมด')
  const [sortBy, setSortBy] = useState('ยอดนิยม')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [displayedTours, setDisplayedTours] = useState(20)
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'compact'>('grid')
  const [isLoading, setIsLoading] = useState(false)
  const toursPerLoad = 20

  useEffect(() => {
    const searchFromUrl = searchParams.get('search')
    if (searchFromUrl) {
      setSearchTerm(searchFromUrl)
    }
  }, [searchParams])

  useEffect(() => {
    if (params && params.country) {
      let countryParam = params.country;
      if (Array.isArray(countryParam)) countryParam = countryParam[0];
      const countryName = countryParam.replace(/-/g, ' ');
      setSelectedCountry(countryName.charAt(0).toUpperCase() + countryName.slice(1));
    }
  }, [params])

  const categories = useMemo(() => ['ทั้งหมด', ...Array.from(new Set(tours.map(t => t.category)))], [])
  const priceRanges = [
    { name: 'ทั้งหมด', count: 0 },
    { name: 'ต่ำกว่า 15,000', count: 0 },
    { name: '15,000 - 25,000', count: 0 },
    { name: '25,000 - 35,000', count: 0 },
    { name: '35,000 - 50,000', count: 0 },
    { name: '50,000+', count: 0 }
  ]
  const countries = useMemo(() => {
    const countryCount = tours.reduce((acc, tour) => {
      acc[tour.country] = (acc[tour.country] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return [{ name: 'ทั้งหมด', count: tours.length }, ...Object.entries(countryCount)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([name, count]) => ({ name, count }))]
      .filter(country => country.name !== 'ทั้งหมด' || country.count > 0);
  }, [])
  const sortOptions = ['ยอดนิยม', 'ราคาต่ำ-สูง', 'ราคาสูง-ต่ำ', 'คะแนนรีวิว']

  const filteredAndSortedTours = useMemo(() => {
    let filtered = Array.isArray(tours) ? tours.filter(tour => {
      const matchesSearch = tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tour.location.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesCategory = selectedCategory === 'ทั้งหมด' || tour.category === selectedCategory
      
      const matchesCountry = selectedCountry === 'ทั้งหมด' || tour.country === selectedCountry
      
      const matchesPrice = priceRange === 'ทั้งหมด' || 
        (priceRange === 'ต่ำกว่า 15,000' && tour.price < 15000) ||
        (priceRange === '15,000 - 25,000' && tour.price >= 15000 && tour.price <= 25000) ||
        (priceRange === '25,000 - 35,000' && tour.price >= 25000 && tour.price <= 35000) ||
        (priceRange === '35,000 - 50,000' && tour.price >= 35000 && tour.price <= 50000) ||
        (priceRange === '50,000+' && tour.price >= 50000)
      
      return matchesSearch && matchesCategory && matchesCountry && matchesPrice
    }) : [];

    const sorted = [...filtered]

    switch (sortBy) {
      case 'ราคาต่ำ-สูง':
        sorted.sort((a, b) => a.price - b.price)
        break
      case 'ราคาสูง-ต่ำ':
        sorted.sort((a, b) => b.price - a.price)
        break
      case 'คะแนนรีวิว':
        sorted.sort((a, b) => b.rating - a.rating)
        break
      default: // ยอดนิยม
        sorted.sort((a, b) => (b.reviews || 0) - (a.reviews || 0))
    }

    return sorted
  }, [searchTerm, selectedCategory, selectedCountry, priceRange, sortBy])

  const displayedToursData = useMemo(() => {
    return filteredAndSortedTours.slice(0, displayedTours)
  }, [filteredAndSortedTours, displayedTours])

  const hasMoreTours = displayedTours < filteredAndSortedTours.length

  const loadMoreTours = () => {
    setIsLoading(true)
    setTimeout(() => {
      setDisplayedTours(prev => prev + toursPerLoad)
      setIsLoading(false)
    }, 1000)
  }

  // Reset displayed tours when filters change
  useEffect(() => {
    setDisplayedTours(toursPerLoad)
  }, [searchTerm, selectedCategory, selectedCountry, priceRange, sortBy, toursPerLoad])

  // Infinite scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1000) {
        if (hasMoreTours && !isLoading) {
          loadMoreTours()
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [hasMoreTours, isLoading])
  
  const handleClearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('ทั้งหมด')
    setPriceRange('ทั้งหมด')
    setSelectedCountry('ทั้งหมด')
    setSortBy('ยอดนิยม')
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        {/* Enhanced Header Section */}
        <div className="text-center mb-10 lg:mb-16">
          <div className="inline-flex items-center justify-center px-4 py-2 mb-6 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 rounded-full border border-blue-200/50 backdrop-blur-sm">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mr-3 animate-pulse"></div>
            <span className="text-sm font-semibold text-blue-700 tracking-wide uppercase">Premium Tours Collection</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-slate-800 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-4 leading-tight">
            แพ็คเกจทัวร์ทั้งหมด
          </h1>
          <p className="text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-light">
            ค้นพบและสำรวจประสบการณ์การเดินทางที่พิเศษ<br className="hidden sm:block" />
            จากทัวร์คุณภาพระดับพรีเมียมที่เราคัดสรรมาเป็นพิเศษ
          </p>
          <div className="flex items-center justify-center mt-6 space-x-6 text-sm text-slate-500">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              <span className="font-medium">{filteredAndSortedTours.length}+ โปรแกรมทัวร์</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span className="font-medium">รีวิวจริง</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
              <span className="font-medium">รับประกันคุณภาพ</span>
            </div>
          </div>
        </div>
        
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Sidebar */}
          <aside className={`lg:col-span-1 lg:block ${isSidebarOpen ? 'block' : 'hidden'} mb-8 lg:mb-0`}>
            <TourFilterSidebar
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              priceRanges={priceRanges}
              selectedPriceRange={priceRange}
              onPriceChange={setPriceRange}
              countries={countries}
              selectedCountry={selectedCountry}
              onCountryChange={setSelectedCountry}

              onClearFilters={handleClearFilters}
            />
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Enhanced Search and Filter Section */}
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 p-6 mb-8 transition-all duration-300 hover:shadow-xl hover:bg-white/90">
              <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
                <div className="relative flex-grow">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center shadow-sm">
                      <Search className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <input
                    type="text"
                    placeholder="ค้นหาทัวร์ ประเทศ หรือเมืองที่ต้องการ..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-6 py-4 border-2 border-gray-200/60 rounded-xl bg-gray-50/50 backdrop-blur-sm transition-all duration-300 text-slate-800 placeholder-slate-500 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/60 focus:bg-white focus:shadow-lg font-medium"
                  />
                </div>
                
                <div className="flex items-center gap-3">
                  {/* View Mode Toggle */}
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <Button 
                      variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className={viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}
                    >
                      <Grid className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant={viewMode === 'list' ? 'primary' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className={viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}
                    >
                      <LayoutGrid className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <Button 
                    variant="outline"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="lg:hidden border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    {isSidebarOpen ? 'ซ่อนตัวกรอง' : 'ตัวกรอง'}
                  </Button>
                  
                  <div className="hidden lg:flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200/50">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                    <span className="text-sm font-semibold text-blue-700">
                      {filteredAndSortedTours.length} โปรแกรม
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tours Grid */}
            {filteredAndSortedTours.length > 0 ? (
              <>
                <div className={`grid gap-6 lg:gap-8 ${
                  viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' :
                  viewMode === 'list' ? 'grid-cols-1 lg:grid-cols-2' :
                  'grid-cols-1'
                }`}>
                  {displayedToursData.map(tour => {
                    if (tour.availability === 'เต็ม') {
                      return (
                        <div key={tour.id} className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/60 shadow-lg transition-all duration-300 overflow-hidden flex flex-col opacity-60 cursor-not-allowed relative">
                          <div className="relative h-56">
                            <Image
                              src={tour.image || "/plane.svg"}
                              alt={tour.title || "Tour Image"}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/40 to-transparent flex items-center justify-center">
                              <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl border border-red-500/30 backdrop-blur-sm">
                                <div className="flex items-center gap-3">
                                  <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                                  <span>เต็มแล้ว</span>
                                </div>
                              </div>
                            </div>
                            <div className="absolute top-4 right-4 text-white px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-gray-500 to-gray-600 shadow-lg backdrop-blur-sm border border-white/20">
                              {tour.category}
                            </div>
                          </div>
                          <div className="p-6 flex-1 flex flex-col">
                            <h2 className="text-xl font-bold text-gray-500 mb-3 line-clamp-2 leading-tight">{tour.title}</h2>
                            <div className="flex items-center text-slate-500 mb-4 text-sm font-medium">
                              <div className="w-5 h-5 mr-3 text-gray-400 flex-shrink-0 rounded-full bg-gray-50 flex items-center justify-center">
                                <MapPin className="w-3 h-3" />
                              </div>
                              <span>{tour.location}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm text-slate-500 mb-5 border-t border-b border-gray-100/60 py-4">
                              <div className="flex items-center font-medium">
                                <div className="w-5 h-5 mr-2 text-gray-400 flex-shrink-0 rounded-full bg-gray-50 flex items-center justify-center">
                                  <Clock className="w-3 h-3" />
                                </div>
                                <span>{tour.duration}</span>
                              </div>
                              <div className="flex items-center font-medium">
                                <div className="w-5 h-5 mr-2 text-gray-400 flex-shrink-0 rounded-full bg-gray-50 flex items-center justify-center">
                                  <Users className="w-3 h-3" />
                                </div>
                                <span>เต็มแล้ว</span>
                              </div>
                            </div>
                            <div className="flex items-center mb-5">
                              <StarRating rating={tour.rating} size="md" />
                              <span className="text-sm text-slate-500 ml-3 font-semibold bg-slate-50 px-3 py-1 rounded-full border border-slate-200/50">
                                {tour.rating.toFixed(1)} ({tour.reviews} รีวิว)
                              </span>
                            </div>
                            <div className="mt-auto">
                              <div className="text-right mb-5">
                                {tour.originalPrice && (
                                  <div className="mb-2">
                                    <span className="text-slate-400 line-through text-base font-medium bg-slate-50 px-2 py-1 rounded">฿{tour.originalPrice.toLocaleString()}</span>
                                  </div>
                                )}
                                <div className="text-2xl lg:text-3xl font-bold text-slate-400">
                                  ฿{tour.price.toLocaleString()} 
                                  <span className="text-sm font-normal text-slate-400 block mt-1">/ต่อท่าน</span>
                                </div>
                              </div>
                              <Button variant="outline" size="lg" className="w-full opacity-60 cursor-not-allowed bg-gradient-to-r from-gray-100 to-gray-200 text-gray-500 border-gray-300 font-semibold" disabled>
                                <div className="flex items-center justify-center gap-2">
                                  <span>เต็มแล้ว</span>
                                </div>
                              </Button>
                            </div>
                          </div>
                        </div>
                      )
                    } else {
                      // เฉพาะ 'เหลือน้อย' เท่านั้นที่ใช้กรอบแดง
                      const cardClasses = tour.availability === 'เหลือน้อย'
                        ? 'bg-gradient-to-br from-white via-red-50/30 to-orange-50/20 border-2 border-red-400/60 hover:border-red-500 hover:shadow-2xl hover:shadow-red-500/10 transform hover:-translate-y-1'
                        : 'bg-white/90 backdrop-blur-sm border border-gray-200/60 hover:border-blue-400/60 hover:shadow-2xl hover:shadow-blue-500/10 transform hover:-translate-y-1';
                      return (
                        <Link key={tour.id} href={`/tours/${tour.id}`} className={`${cardClasses} rounded-2xl shadow-lg transition-all duration-500 overflow-hidden flex flex-col cursor-pointer group relative`}>
                          <div className="relative h-56">
                            <Image
                              src={tour.image || "/plane.svg"}
                              alt={tour.title || "Tour Image"}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            {tour.availability === 'เหลือน้อย' && (
                              <div className="absolute top-4 left-4 z-10">
                                <div className="relative">
                                  <div className="bg-gradient-to-r from-red-600 via-orange-500 to-red-700 text-white px-4 py-2 rounded-full text-sm font-bold shadow-2xl backdrop-blur-sm border border-red-400/30 animate-pulse">
                                    <div className="flex items-center gap-2">
                                      <span className="text-yellow-300 text-lg animate-bounce">🔥</span>
                                      <span>เหลือน้อย! จองด่วน</span>
                                    </div>
                                  </div>
                                  <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-20"></div>
                                  <div className="absolute inset-0 bg-orange-500 rounded-full animate-ping opacity-10 animation-delay-150"></div>
                                </div>
                              </div>
                            )}
                            <div className="absolute top-4 right-4 text-white px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 shadow-lg backdrop-blur-sm border border-white/20">
                              {tour.category}
                            </div>
                          </div>
                          <div className="p-6 flex-1 flex flex-col">
                            <h2 className="text-xl lg:text-2xl font-bold text-slate-800 mb-3 line-clamp-2 leading-tight group-hover:text-blue-900 transition-colors duration-300">{tour.title}</h2>
                            {tour.availability === 'เหลือน้อย' && (
                              <div className="mb-3 text-xs text-red-700 font-bold bg-gradient-to-r from-red-100 via-orange-50 to-red-100 px-3 py-2 rounded-full inline-block border border-red-200/50 shadow-sm animate-pulse">
                                <div className="flex items-center gap-2">
                                  <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                                  เหลือที่นั่งเพียง {tour.availableSlots} ที่! รีบจองก่อนหมด
                                </div>
                              </div>
                            )}
                            {tour.availability === 'ว่าง' && tour.originalPrice && (
                              <div className="mb-3 text-xs text-emerald-700 font-bold bg-gradient-to-r from-emerald-100 via-green-50 to-emerald-100 px-3 py-2 rounded-full inline-block border border-emerald-200/50 shadow-sm">
                                <div className="flex items-center gap-2">
                                  <span className="text-emerald-500">✨</span>
                                  โปรโมชั่นพิเศษ! ประหยัดสูงสุด {Math.round(((tour.originalPrice - tour.price) / tour.originalPrice) * 100)}%
                                </div>
                              </div>
                            )}
                            <div className="flex items-center text-slate-600 mb-4 text-sm font-medium">
                              <div className="w-5 h-5 mr-3 text-blue-500 flex-shrink-0 rounded-full bg-blue-50 flex items-center justify-center">
                                <MapPin className="w-3 h-3" />
                              </div>
                              <span className="group-hover:text-blue-700 transition-colors duration-300">{tour.location}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm text-slate-600 mb-5 border-t border-b border-gray-100/60 py-4">
                              <div className="flex items-center font-medium">
                                <div className="w-5 h-5 mr-2 text-blue-500 flex-shrink-0 rounded-full bg-blue-50 flex items-center justify-center">
                                  <Clock className="w-3 h-3" />
                                </div>
                                <span className="group-hover:text-blue-700 transition-colors duration-300">{tour.duration}</span>
                              </div>
                              <div className="flex items-center font-medium">
                                <div className="w-5 h-5 mr-2 text-blue-500 flex-shrink-0 rounded-full bg-blue-50 flex items-center justify-center">
                                  <Users className="w-3 h-3" />
                                </div>
                                <span className="group-hover:text-blue-700 transition-colors duration-300">{tour.availableSlots ? `ว่าง ${tour.availableSlots} ที่นั่ง` : tour.groupSize}</span>
                              </div>
                            </div>
                            <div className="flex items-center mb-5">
                              <StarRating rating={tour.rating} size="md" />
                              <span className="text-sm text-slate-700 ml-3 font-semibold bg-slate-50 px-3 py-1 rounded-full border border-slate-200/50 group-hover:bg-blue-50 group-hover:text-blue-800 transition-all duration-300">
                                {tour.rating.toFixed(1)} ({tour.reviews} รีวิว)
                              </span>
                            </div>
                            <div className="mt-auto">
                              <div className="text-right mb-5">
                                {tour.originalPrice && (
                                  <div className="mb-2">
                                    <span className="text-slate-400 line-through text-base font-medium bg-slate-50 px-2 py-1 rounded">฿{tour.originalPrice.toLocaleString()}</span>
                                  </div>
                                )}
                                <div className="text-2xl lg:text-3xl font-bold text-slate-800 group-hover:text-blue-900 transition-colors duration-300">
                                  ฿{tour.price.toLocaleString()} 
                                  <span className="text-sm font-normal text-slate-500 block mt-1">/ต่อท่าน</span>
                                </div>
                              </div>
                              <Button
                                variant={tour.availability === 'เหลือน้อย' ? undefined : 'primary'}
                                size="lg"
                                className={
                                  tour.availability === 'เหลือน้อย'
                                    ? 'w-full bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white font-bold text-base shadow-2xl hover:from-red-700 hover:via-red-800 hover:to-red-900 active:scale-95 transition-all duration-300 border-2 border-red-500/30 hover:shadow-red-500/25 backdrop-blur-sm'
                                    : 'w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white font-semibold shadow-lg hover:from-blue-700 hover:via-indigo-700 hover:to-blue-800 hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 active:scale-95'
                                }
                              >
                                {tour.availability === 'เหลือน้อย' ? (
                                  <div className="flex items-center justify-center gap-2">
                                    <span className="text-yellow-300 animate-bounce">🔥</span>
                                    <span>จองด่วน! เหลือน้อย</span>
                                  </div>
                                ) : (
                                  <div className="flex items-center justify-center gap-2">
                                    <span>ดูรายละเอียด</span>
                                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                  </div>
                                )}
                              </Button>
                            </div>
                          </div>
                        </Link>
                      )
                    }
                  })}
                </div>
                
                                 {/* Infinite Scroll Loading Indicator */}
                {isLoading && (
                  <InlineLoadingSpinner message="กำลังโหลดทัวร์เพิ่มเติม..." color="blue" />
                )}
                 
                 {/* Load More Button (Backup) */}
                {hasMoreTours && !isLoading && (
                   <div className="flex justify-center mt-8">
                     <Button
                       variant="outline"
                      onClick={loadMoreTours}
                       size="lg"
                       className="px-8 py-3 text-blue-600 hover:bg-blue-50"
                     >
                       โหลดเพิ่มเติม (คลิกหากไม่โหลดอัตโนมัติ)
                     </Button>
                   </div>
                 )}
              </>
            ) : (
              <div className="text-center py-20 bg-gradient-to-br from-white via-slate-50 to-blue-50/30 rounded-2xl shadow-lg border border-gray-200/50">
                <div className="mx-auto bg-gradient-to-br from-blue-100 via-indigo-100 to-blue-200 rounded-full h-24 w-24 flex items-center justify-center shadow-lg mb-6">
                  <Search className="w-12 h-12 text-blue-600" />
                </div>
                <h3 className="text-3xl font-bold text-slate-800 mb-4">ไม่พบโปรแกรมทัวร์</h3>
                <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto leading-relaxed">ขออภัย เราไม่พบทัวร์ที่ตรงกับเงื่อนไขการค้นหาของคุณ<br />ลองปรับเงื่อนไขการค้นหาใหม่</p>
                <Button
                  variant="outline"
                  onClick={handleClearFilters}
                  className="px-8 py-3 bg-white hover:bg-blue-50 border-2 border-blue-300 hover:border-blue-500 text-blue-700 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <div className="flex items-center gap-2">
                    <X className="w-4 h-4" />
                    <span>ล้างตัวกรองทั้งหมด</span>
                  </div>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default function ToursPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen">กำลังโหลดข้อมูลทัวร์...</div>}>
      <ToursPageContent />
    </Suspense>
  )
}