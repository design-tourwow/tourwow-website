'use client'

import { tours } from '@/lib/tour-data'
import Link from 'next/link'
import { useState, useMemo, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, Star, MapPin, Clock, Users, Filter, X, Grid, LayoutGrid, Zap } from 'lucide-react'
import Image from 'next/image'
import { LoadingProvider } from '@/components/LoadingProvider'
import TourFilterSidebar from '@/components/TourFilterSidebar'
import { Button } from '@/components/ui/Button'
import StarRating from '@/components/StarRating'
import InlineLoadingSpinner from '@/components/InlineLoadingSpinner'

function FlashSalePageContent() {
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด')
  const [priceRange, setPriceRange] = useState('ทั้งหมด')
  const [selectedCountry, setSelectedCountry] = useState('ทั้งหมด')
  const [sortBy, setSortBy] = useState('ส่วนลดสูงสุด')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [displayedTours, setDisplayedTours] = useState(20)
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'compact'>('grid')
  const [isLoading, setIsLoading] = useState(false)
  const toursPerLoad = 20

  // Filter tours with 40%+ discount
  const flashSaleTours = useMemo(() => {
    return tours.filter(tour => {
      if (tour.originalPrice && tour.price) {
        const discount = ((tour.originalPrice - tour.price) / tour.originalPrice) * 100
        return discount >= 40
      }
      return false
    })
  }, [])

  useEffect(() => {
    const searchFromUrl = searchParams.get('search')
    if (searchFromUrl) {
      setSearchTerm(searchFromUrl)
    }
  }, [searchParams])

  const categories = useMemo(() => ['ทั้งหมด', ...Array.from(new Set(flashSaleTours.map(t => t.category)))], [flashSaleTours])
  const priceRanges = ['ทั้งหมด', 'ต่ำกว่า 15,000', '15,000 - 25,000', '25,000 - 35,000', '35,000 - 50,000', '50,000+']
  const countries = useMemo(() => {
    const countryCount = flashSaleTours.reduce((acc, tour) => {
      acc[tour.country] = (acc[tour.country] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return [{ name: 'ทั้งหมด', count: flashSaleTours.length }, ...Object.entries(countryCount)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([name, count]) => ({ name, count }))]
      .filter(country => country.name !== 'ทั้งหมด' || country.count > 0);
  }, [flashSaleTours])
  const sortOptions = ['ส่วนลดสูงสุด', 'ยอดนิยม', 'ราคาต่ำ-สูง', 'ราคาสูง-ต่ำ', 'คะแนนรีวิว']

  const filteredAndSortedTours = useMemo(() => {
    let filtered = Array.isArray(flashSaleTours) ? flashSaleTours.filter(tour => {
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
      case 'ส่วนลดสูงสุด':
        sorted.sort((a, b) => {
          const discountA = a.originalPrice ? ((a.originalPrice - a.price) / a.originalPrice) * 100 : 0
          const discountB = b.originalPrice ? ((b.originalPrice - b.price) / b.originalPrice) * 100 : 0
          return discountB - discountA
        })
        break
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
  }, [flashSaleTours, searchTerm, selectedCategory, selectedCountry, priceRange, sortBy])

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
    setSortBy('ส่วนลดสูงสุด')
  }

  return (
    <main className="bg-gradient-to-br from-red-50 to-orange-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center animate-pulse">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-red-600 mb-2">ทัวร์ไฟไหม้</h1>
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center animate-pulse">
              <span className="text-2xl">🔥</span>
            </div>
          </div>
          <p className="text-lg text-red-700 mb-4">โอกาสทองที่ไม่ควรพลาด! ทัวร์คุณภาพลดราคาสูงสุด 50%</p>
          <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-full inline-flex items-center space-x-2 font-bold animate-pulse">
            <span>⏰ เวลาจำกัด!</span>
            <span>รีบจองก่อนหมด</span>
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
              sortOptions={sortOptions}
              selectedSortBy={sortBy}
              onSortByChange={setSortBy}
              onClearFilters={handleClearFilters}
            />
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Mobile Filter Toggle */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex flex-col sm:flex-row gap-4 items-center border-2 border-red-200">
              <div className="relative flex-grow w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="ค้นหาทัวร์ไฟไหม้..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent text-red-900"
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
              <div className="hidden sm:block text-sm text-red-700 whitespace-nowrap font-semibold">
                🔥 พบ {filteredAndSortedTours.length} ทัวร์ไฟไหม้
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
                    const discountPercent = tour.originalPrice ? Math.round(((tour.originalPrice - tour.price) / tour.originalPrice) * 100) : 0
                    return (
                      <div key={tour.id} className="bg-white rounded-xl shadow-lg transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer hover:shadow-2xl hover:scale-[1.02] transform border-2 border-red-200 hover:border-red-300">
                        <div className="relative h-56">
                          <Image
                            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                            alt={tour.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-2 left-2 z-10">
                            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 rounded-full text-sm font-bold animate-pulse shadow-lg">
                              🔥 ลดเหลือ {discountPercent}%
                            </div>
                            <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-30"></div>
                          </div>
                          <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-3 py-1.5 rounded-bl-lg text-sm font-semibold">
                            {tour.category}
                          </div>
                          <div className="absolute bottom-2 right-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-2 py-1 rounded-md text-sm font-semibold animate-pulse shadow-md">
                            ประหยัด ฿{tour.originalPrice ? (tour.originalPrice - tour.price).toLocaleString() : '0'}
                          </div>
                        </div>
                        <div className="p-5 flex-1 flex flex-col">
                          <h2 className="text-xl font-bold text-red-600 mb-2 line-clamp-2">{tour.title}</h2>
                          <div className="mb-2 text-xs text-red-600 font-semibold bg-red-50 px-2 py-1 rounded-full inline-block animate-pulse">
                            🔥 โปรโมชั่นพิเศษ! ลดสูงสุด {discountPercent}%
                          </div>
                          <div className="flex items-center text-gray-500 mb-3 text-sm">
                            <MapPin className="w-4 h-4 mr-1.5 text-red-500 flex-shrink-0" />
                            <span>{tour.location}</span>
                          </div>
                          
                          <div className="flex items-center justify-between text-sm text-gray-600 mb-4 border-t border-b border-gray-100 py-3">
                              <div className="flex items-center">
                                  <Clock className="w-4 h-4 mr-1.5 text-red-500" />
                                  <span>{tour.duration}</span>
                              </div>
                               <div className="flex items-center">
                                  <Users className="w-4 h-4 mr-1.5 text-red-500" />
                                  <span>{tour.groupSize}</span>
                              </div>
                          </div>

                          <div className="flex items-center mb-4">
                            <StarRating rating={tour.rating} size="md" />
                            <span className="text-sm text-red-800 ml-2 font-semibold">{tour.rating.toFixed(1)} ({tour.reviews} รีวิว)</span>
                          </div>
                          
                          <div className="mt-auto">
                            <div className="text-right mb-4">
                              <div className="mb-1">
                                <span className="text-gray-400 line-through text-sm mr-2">฿{tour.originalPrice?.toLocaleString()}</span>
                                <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full font-semibold">
                                  ลด {discountPercent}%
                                </span>
                              </div>
                              <div className="text-2xl font-bold text-red-600">
                                ฿{tour.price.toLocaleString()} <span className="text-sm font-normal text-gray-500">/ต่อท่าน</span>
                              </div>
                              <div className="mt-1 text-xs text-green-600 font-semibold">
                                ประหยัด ฿{tour.originalPrice ? (tour.originalPrice - tour.price).toLocaleString() : '0'}
                              </div>
                            </div>
                            <Link href={`/tours/${tour.id}`}>
                              <Button size="default" className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold animate-pulse shadow-lg">
                                🔥 จองด่วน! ลดสูงสุด {discountPercent}%
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
                
                {/* Infinite Scroll Loading Indicator */}
                {isLoading && (
                  <InlineLoadingSpinner message="กำลังโหลดทัวร์ไฟไหม้เพิ่มเติม..." color="red" />
                )}
                
                {/* Load More Button (Backup) */}
                {hasMoreTours && !isLoading && (
                  <div className="flex justify-center mt-8">
                    <Button
                      variant="outline"
                      onClick={loadMoreTours}
                      size="lg"
                      className="px-8 py-3 text-red-600 hover:bg-red-50 border-red-300"
                    >
                      โหลดเพิ่มเติม (คลิกหากไม่โหลดอัตโนมัติ)
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16 bg-white rounded-lg shadow-md border-2 border-red-200">
                <div className="mx-auto bg-red-100 rounded-full h-20 w-20 flex items-center justify-center">
                  <Zap className="w-10 h-10 text-red-500" />
                </div>
                <h3 className="text-2xl font-semibold text-red-600 mt-6 mb-2">ไม่พบทัวร์ไฟไหม้</h3>
                <p className="text-red-700 mb-6">ขออภัย เราไม่พบทัวร์ไฟไหม้ที่ตรงกับเงื่อนไขของคุณ</p>
                <Button
                  variant="outline"
                  onClick={handleClearFilters}
                  className="border-red-300 text-red-600 hover:bg-red-50"
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

export default function FlashSalePage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen">กำลังโหลดทัวร์ไฟไหม้...</div>}>
      <FlashSalePageContent />
    </Suspense>
  )
}