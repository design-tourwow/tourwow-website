'use client'

import { useState, useEffect, useMemo, Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search, MapPin, Calendar, Users, Star, Clock, Plane, Tag, Filter, ArrowRight, Phone, Download, FileText, Briefcase, Utensils, Hotel, BadgeCheck, Grid, LayoutGrid, X } from 'lucide-react'
import { LoadingProvider } from '@/components/LoadingProvider'
import TourFilterSidebar from '@/components/TourFilterSidebar'
import { Button } from '@/components/ui/Button'
import StarRating from '@/components/StarRating'

interface TTNTour {
  id: string
  name: string
  code: string
  price: number
  image: string
  location: string
  days: number
  nights: number
  airline: string
  airlineName: string
  hotelStar: number
  meals: number
  highlights: string[]
  tags: string[]
  periods: Array<{
    id: string
    dates: string
    datesEn: string
    startDate: string
    endDate: string
    price: number
    available: number
    status: string
  }>
  itinerary: Array<{
    day: number
    description: string
  }>
  pdfUrl?: string
  wordUrl?: string
}

function ApiToursPageContent() {
  const [tours, setTours] = useState<TTNTour[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
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

  const API_URL = "https://www.zegoapi.com/v1.5/programtours";
  const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjhmMmViYjEyYjE0NzIyZDQxZDRmODQiLCJpYXQiOjE2NzA4NDI2NTB9.OqjXzyitMLH2Q2int7pfAvZ1Fel-7eZSnmak0k9g3pk";

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(API_URL, {
      headers: { "auth-token": AUTH_TOKEN }
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("API error: " + res.status);
        const data = await res.json();
        setTours(Array.isArray(data) ? data : data.data || []);
      })
      .catch((e) => setError(e.message || "เกิดข้อผิดพลาด"))
      .finally(() => setLoading(false));
  }, []);

  // Convert TTN tours to tour format for compatibility
  const convertedTours = useMemo(() => {
    return (Array.isArray(tours) ? tours : []).map(tour => {
      const seat = tour?.periods?.[0]?.available ?? 0;
      const days = tour?.days || 0;
      const nights = tour?.nights || (days > 0 ? days - 1 : 0);
      return {
        id: tour?.id || '',
        title: tour?.name || '-',
        price: typeof tour?.price === 'number' ? tour.price : (tour?.periods?.[0]?.price || 0),
        originalPrice: (typeof tour?.price === 'number' ? tour.price : (tour?.periods?.[0]?.price || 0)) > 50000 ? Math.round((typeof tour?.price === 'number' ? tour.price : (tour?.periods?.[0]?.price || 0)) * 1.2) : null,
        image: tour?.image || '/plane.svg',
        location: tour?.location || '-',
        country: tour?.location?.split(',')[0] || '-',
        duration: `${days} วัน ${nights} คืน`,
        category: Array.isArray(tour?.tags) && tour.tags.length > 0 ? tour.tags[0] : 'ทัวร์ทั่วไป',
        rating: 4.5,
        reviews: Math.floor(Math.random() * 50) + 10,
        availability: seat > 5 ? 'ว่าง' : seat > 0 ? 'เหลือน้อย' : 'เต็ม',
        availableSlots: seat,
        groupSize: `กลุ่ม ${Math.floor(Math.random() * 20) + 10}-${Math.floor(Math.random() * 20) + 30} ท่าน`,
        highlights: Array.isArray(tour?.highlights) ? tour.highlights : [],
        tags: Array.isArray(tour?.tags) ? tour.tags : [],
        periods: Array.isArray(tour?.periods) ? tour.periods : [],
        itinerary: Array.isArray(tour?.itinerary) ? tour.itinerary : [],
        pdfUrl: tour?.pdfUrl || '',
        wordUrl: tour?.wordUrl || '',
        airline: tour?.airline || '',
        airlineName: tour?.airlineName || '',
        hotelStar: tour?.hotelStar || 3,
        meals: tour?.meals || 0,
        code: tour?.code || ''
      }
    })
  }, [tours])

  const categories = useMemo(() => ['ทั้งหมด', ...Array.from(new Set(convertedTours.map(t => t.category)))], [convertedTours])
  const priceRanges = [
    { name: 'ต่ำกว่า 10,000', count: 0 },
    { name: '10,000-20,000', count: 0 },
    { name: '20,000-30,000', count: 0 },
    { name: '30,000-50,000', count: 0 },
    { name: '50,000 ขึ้นไป', count: 0 },
  ];
  const countries = useMemo(() => {
    const countryCount = convertedTours.reduce((acc, tour) => {
      acc[tour.country] = (acc[tour.country] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return [{ name: 'ทั้งหมด', count: convertedTours.length }, ...Object.entries(countryCount)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([name, count]) => ({ name, count }))]
      .filter(country => country.name !== 'ทั้งหมด' || country.count > 0);
  }, [convertedTours])
  const sortOptions = ['ยอดนิยม', 'ราคาต่ำ-สูง', 'ราคาสูง-ต่ำ', 'คะแนนรีวิว']

  const filteredAndSortedTours = useMemo(() => {
    let filtered = Array.isArray(convertedTours) ? convertedTours.filter(tour => {
      const matchesSearch = tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tour.location.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesCategory = selectedCategory === 'ทั้งหมด' || tour.category === selectedCategory
      
      const matchesCountry = selectedCountry === 'ทั้งหมด' || tour.country === selectedCountry
      
      const matchesPrice = priceRange === 'ทั้งหมด' || 
        (priceRange === 'ต่ำกว่า 25,000' && tour.price < 25000) ||
        (priceRange === '25,000-35,000' && tour.price >= 25000 && tour.price <= 35000) ||
        (priceRange === '35,000-50,000' && tour.price >= 35000 && tour.price <= 50000) ||
        (priceRange === 'มากกว่า 50,000' && tour.price >= 50000)
      
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
  }, [searchTerm, selectedCategory, selectedCountry, priceRange, sortBy, convertedTours])

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4 py-20">
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <Plane className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-blue-600 animate-pulse" />
            </div>
            <div className="text-center">
              <h2 className="text-3xl font-bold text-blue-900 mb-3">กำลังโหลดทัวร์จาก TTN API</h2>
              <p className="text-blue-600 text-lg">โปรดรอสักครู่... กำลังดึงข้อมูลล่าสุดจาก API</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-lg mx-auto text-center">
            <div className="bg-white rounded-3xl shadow-2xl p-10">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">⚠️</span>
              </div>
              <h2 className="text-3xl font-bold text-red-900 mb-6">เกิดข้อผิดพลาด</h2>
              <p className="text-red-700 mb-8 text-lg">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="bg-red-600 text-white px-8 py-4 rounded-2xl hover:bg-red-700 transition-colors font-semibold text-lg"
              >
                ลองใหม่อีกครั้ง
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <main className="bg-blue-50/30">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-2">ทัวร์พิเศษจาก TTN API</h1>
          <p className="text-lg text-blue-700">ค้นพบทัวร์สุดพิเศษจาก TTN Connect API ด้วยข้อมูลอัปเดตแบบเรียลไทม์</p>
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
            {/* Search and Mobile Filter Toggle */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex flex-col sm:flex-row gap-4 items-center">
              <div className="relative flex-grow w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="ค้นหาทัวร์ตามชื่อหรือสถานที่..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-blue-900"
                />
              </div>
              
              {/* View Mode Toggle */}
              <div className="flex gap-2">
                <Button 
                  variant={viewMode === 'grid' ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button 
                  variant={viewMode === 'list' ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <LayoutGrid className="w-4 h-4" />
                </Button>
              </div>
              
              <Button 
                variant="secondary"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden w-full sm:w-auto"
              >
                <Filter className="w-4 h-4 mr-2" />
                {isSidebarOpen ? 'ซ่อนตัวกรอง' : 'แสดงตัวกรอง'}
              </Button>
              <div className="hidden sm:block text-sm text-blue-700 whitespace-nowrap">
                พบ {filteredAndSortedTours.length} โปรแกรม
              </div>
            </div>

            {/* Tours Grid */}
            {filteredAndSortedTours.length > 0 ? (
              <>
                <div className={`grid gap-8 ${
                  viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' :
                  viewMode === 'list' ? 'grid-cols-1 md:grid-cols-2' :
                  'grid-cols-1'
                }`}>
                  {displayedToursData.map(tour => {
                    if (tour.availability === 'เต็ม') {
                      return (
                        <div key={tour.id} className="bg-white rounded-2xl border-2 border-blue-200 shadow-lg group-hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col hover:border-blue-500/80 focus-within:border-blue-600 opacity-50 cursor-not-allowed">
                          <div className="relative h-64">
                            <Image
                              src={tour.image || "/plane.svg"}
                              alt={tour.title || "Tour Image"}
                              fill
                              className="object-scale-down group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
                              <div className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold text-lg">
                                เต็มแล้ว
                              </div>
                            </div>
                            <div className="absolute top-0 right-0 text-white px-3 py-1.5 rounded-bl-lg text-sm font-semibold bg-gray-400">
                              {tour.category}
                            </div>
                          </div>
                          <div className="p-5 flex-1 flex flex-col">
                            <h2 className="text-xl font-bold text-blue-900 mb-2 line-clamp-2">{tour.title}</h2>
                            <div className="flex items-center text-gray-500 mb-3 text-sm">
                              <MapPin className="w-4 h-4 mr-1.5 text-blue-500 flex-shrink-0" />
                              <span>{tour.location}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm text-gray-600 mb-4 border-t border-b border-gray-100 py-3">
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1.5 text-blue-500" />
                                <span>{tour.duration}</span>
                              </div>
                              <div className="flex items-center">
                                <Users className="w-4 h-4 mr-1.5 text-blue-500" />
                                <span>เต็มแล้ว</span>
                              </div>
                            </div>
                            <div className="flex items-center mb-4">
                              <StarRating rating={tour.rating} size="md" />
                              <span className="text-sm text-blue-800 ml-2 font-semibold">{tour.rating.toFixed(1)} ({tour.reviews} รีวิว)</span>
                            </div>
                            <div className="mt-auto">
                              <div className="text-right mb-4">
                                {tour.originalPrice && (
                                  <div className="mb-1">
                                    <span className="text-gray-400 line-through text-sm mr-2">฿{tour.originalPrice.toLocaleString()}</span>
                                  </div>
                                )}
                                <div className="text-2xl font-bold text-gray-400">
                                  ฿{tour.price.toLocaleString()} <span className="text-sm font-normal text-gray-500">/ต่อท่าน</span>
                                </div>
                              </div>
                              <Button variant="outline" size="default" className="w-full opacity-50 cursor-not-allowed bg-gray-100 text-gray-400 border-gray-300" disabled>
                                เต็มแล้ว
                              </Button>
                            </div>
                          </div>
                        </div>
                      )
                    } else {
                      // เฉพาะ 'เหลือน้อย' เท่านั้นที่ใช้กรอบแดง
                      const borderClass = tour.availability === 'เหลือน้อย'
                        ? 'border-2 border-red-500 hover:border-red-600 focus-within:border-red-700'
                        : 'border-2 border-blue-200 hover:border-blue-500/80 focus-within:border-blue-600';
                      return (
                        <Link key={tour.id} href={`/tours/${tour.id}`} className={`bg-white rounded-2xl ${borderClass} shadow-lg group-hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col cursor-pointer`}>
                          <div className="relative h-64">
                            <Image
                              src={tour.image || "/plane.svg"}
                              alt={tour.title || "Tour Image"}
                              fill
                              className="object-scale-down group-hover:scale-105 transition-transform duration-300"
                            />
                            {tour.availability === 'เหลือน้อย' && (
                              <div className="absolute top-2 left-2 z-10">
                                <div className="bg-gradient-to-r from-red-600 via-yellow-400 to-orange-500 text-white px-3 py-1.5 rounded-full text-sm font-bold animate-pulse shadow-lg">
                                  🔥 เหลือน้อย! จองด่วน
                                </div>
                                <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-30"></div>
                              </div>
                            )}
                            <div className="absolute top-0 right-0 text-white px-3 py-1.5 rounded-bl-lg text-sm font-semibold bg-gradient-to-r from-blue-600 to-cyan-500">
                              {tour.category}
                            </div>
                          </div>
                          <div className="p-5 flex-1 flex flex-col">
                            <h2 className="text-xl font-bold text-blue-900 mb-2 line-clamp-2">{tour.title}</h2>
                            {tour.availability === 'เหลือน้อย' && (
                              <div className="mb-2 text-xs text-red-600 font-semibold bg-red-50 px-2 py-1 rounded-full inline-block animate-pulse">
                                เหลือที่นั่งเพียง {tour.availableSlots} ที่! รีบจองก่อนหมด
                              </div>
                            )}
                            {tour.availability === 'ว่าง' && tour.originalPrice && (
                              <div className="mb-2 text-xs text-green-600 font-semibold bg-green-50 px-2 py-1 rounded-full inline-block">
                                โปรโมชั่นพิเศษ! ประหยัดสูงสุด {Math.round(((tour.originalPrice - tour.price) / tour.originalPrice) * 100)}%
                              </div>
                            )}
                            <div className="flex items-center text-gray-500 mb-3 text-sm">
                              <MapPin className="w-4 h-4 mr-1.5 text-blue-500 flex-shrink-0" />
                              <span>{tour.location}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm text-gray-600 mb-4 border-t border-b border-gray-100 py-3">
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1.5 text-blue-500" />
                                <span>{tour.duration}</span>
                              </div>
                              <div className="flex items-center">
                                <Users className="w-4 h-4 mr-1.5 text-blue-500" />
                                <span>{tour.availableSlots ? `ว่าง ${tour.availableSlots} ที่นั่ง` : tour.groupSize}</span>
                              </div>
                            </div>
                            <div className="flex items-center mb-4">
                              <StarRating rating={tour.rating} size="md" />
                              <span className="text-sm text-blue-800 ml-2 font-semibold">{tour.rating.toFixed(1)} ({tour.reviews} รีวิว)</span>
                            </div>
                            <div className="mt-auto">
                              <div className="text-right mb-4">
                                {tour.originalPrice && (
                                  <div className="mb-1">
                                    <span className="text-gray-400 line-through text-sm mr-2">฿{tour.originalPrice.toLocaleString()}</span>
                                  </div>
                                )}
                                <div className="text-2xl font-bold text-gray-400">
                                  ฿{tour.price.toLocaleString()} <span className="text-sm font-normal text-gray-500">/ต่อท่าน</span>
                                </div>
                              </div>
                              <Button
                                variant={tour.availability === 'เหลือน้อย' ? undefined : 'primary'}
                                size="default"
                                className={
                                  tour.availability === 'เหลือน้อย'
                                    ? 'w-full bg-red-600 text-white font-bold text-lg shadow-lg hover:bg-red-700 active:scale-95 transition-all duration-150 border-2 border-red-600 hover:shadow-xl'
                                    : 'w-full'
                                }
                              >
                                {tour.availability === 'เหลือน้อย' ? '🔥 จองด่วน! เหลือน้อย' : 'ดูรายละเอียด'}
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
                   <div className="flex justify-center items-center py-12">
                     <div className="flex items-center space-x-3 text-blue-600">
                       <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                       <span className="font-medium">กำลังโหลดทัวร์เพิ่มเติม...</span>
                     </div>
                   </div>
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
              <div className="text-center py-16 bg-white rounded-lg shadow-md">
                <div className="mx-auto bg-blue-100 rounded-full h-20 w-20 flex items-center justify-center">
                  <Search className="w-10 h-10 text-blue-500" />
                </div>
                <h3 className="text-2xl font-semibold text-blue-900 mt-6 mb-2">ไม่พบโปรแกรมทัวร์</h3>
                <p className="text-blue-700 mb-6">ขออภัย เราไม่พบทัวร์ที่ตรงกับเงื่อนไขของคุณ</p>
                <Button
                  variant="outline"
                  onClick={handleClearFilters}
                >
                  ล้างตัวกรองทั้งหมด
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default function ApiToursPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen">กำลังโหลดข้อมูลทัวร์...</div>}>
      <ApiToursPageContent />
    </Suspense>
  )
}