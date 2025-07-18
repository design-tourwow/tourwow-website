'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Search, Filter, MapPin, Calendar, Users, Star, Clock, 
  Plane, Hotel, Utensils, Download, Eye, FileText, 
  ChevronRight, Heart, Share2, Grid, List, RefreshCw,
  TrendingUp, Zap, Map, Globe, Tag, X, ArrowUpDown
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import StarRating from '@/components/StarRating'
import LoadingScreen from '@/components/LoadingScreen'

interface Tour {
  id: string
  title: string
  code: string
  price: number
  originalPrice?: number
  image: string
  location: string
  country: string
  duration: string
  days: number
  nights: number
  airline: string
  hotelStar: number
  meals: number
  highlights: string[]
  tags: string[]
  rating: number
  reviews: number
  availability: string
  availableSlots: number
  wholesaler: string
  wholesalerColor: string
  pdfUrl?: string
  wordUrl?: string
}

export default function Tours2Page() {
  const [tours, setTours] = useState<Tour[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')
  const [priceRange, setPriceRange] = useState({ min: 0, max: 200000 })
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'popularity'>('popularity')
  const [compareList, setCompareList] = useState<string[]>([])
  const [showCompareBar, setShowCompareBar] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showPreview, setShowPreview] = useState(false)
  const [previewTour, setPreviewTour] = useState<Tour | null>(null)

  // Country mapping
  const normalizeCountryName = (location: string): string => {
    const countryMapping: Record<string, string> = {
      'japan': 'ญี่ปุ่น', 'jp': 'ญี่ปุ่น', 'tokyo': 'ญี่ปุ่น', 'osaka': 'ญี่ปุ่น',
      'korea': 'เกาหลีใต้', 'south korea': 'เกาหลีใต้', 'seoul': 'เกาหลีใต้',
      'china': 'จีน', 'beijing': 'จีน', 'shanghai': 'จีน',
      'thailand': 'ไทย', 'bangkok': 'ไทย', 'phuket': 'ไทย',
      'singapore': 'สิงคโปร์', 'malaysia': 'มาเลเซีย',
      'vietnam': 'เวียดนาม', 'ho chi minh': 'เวียดนาม',
      'france': 'ฝรั่งเศส', 'paris': 'ฝรั่งเศส',
      'italy': 'อิตาลี', 'rome': 'อิตาลี', 'milan': 'อิตาลี',
      'spain': 'สเปน', 'madrid': 'สเปน', 'barcelona': 'สเปน',
      'germany': 'เยอรมนี', 'berlin': 'เยอรมนี',
      'uk': 'อังกฤษ', 'england': 'อังกฤษ', 'london': 'อังกฤษ',
      'usa': 'สหรัฐอเมริกา', 'united states': 'สหรัฐอเมริกา', 'new york': 'สหรัฐอเมริกา',
      'australia': 'ออสเตรเลีย', 'sydney': 'ออสเตรเลีย'
    }
    
    const lowerLocation = location.toLowerCase()
    for (const [key, value] of Object.entries(countryMapping)) {
      if (lowerLocation.includes(key)) {
        return value
      }
    }
    return location
  }

  // Preview functionality
  const openPreview = (tour: Tour) => {
    setPreviewTour(tour)
    setShowPreview(true)
  }

  const downloadFile = (url: string, filename: string) => {
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Fetch tours data
  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch from TTN API
        const response = await fetch("https://online.ttnconnect.com/api/agency/get-allprogram")
        
        if (!response.ok) {
          throw new Error('Failed to fetch tours')
        }

        const data = await response.json()
        
        if (Array.isArray(data)) {
          const processedTours: Tour[] = data.slice(0, 50)
            .filter((item: any) => item.program?.[0]) // Filter out items without programs first
            .map((item: any) => {
              const program = item.program[0]
              
              const highlights = program.P_HIGHLIGHT ? 
                program.P_HIGHLIGHT.split(',').map((h: string) => h.trim()).filter((h: string) => h.length > 0) : 
                []

              const tags = program.P_TAG ? 
                program.P_TAG.split(',').map((t: string) => t.trim()).filter((t: string) => t.length > 0) : 
                []

              const availableSlots = Math.floor(Math.random() * 20) + 1

              return {
                id: program.P_ID?.toString() || Math.random().toString(),
                title: program.P_NAME || 'ทัวร์',
                code: program.P_CODE || '',
                price: parseInt(program.P_PRICE) || 0,
                originalPrice: parseInt(program.P_PRICE) > 40000 ? Math.round(parseInt(program.P_PRICE) * 1.15) : undefined,
                image: program.BANNER || '/plane.svg',
                location: program.P_LOCATION || '',
                country: normalizeCountryName(program.P_LOCATION || ''),
                duration: `${program.P_DAY || 0} วัน ${program.P_NIGHT || 0} คืน`,
                days: parseInt(program.P_DAY) || 0,
                nights: parseInt(program.P_NIGHT) || 0,
                airline: program.P_AIRLINE || '',
                hotelStar: parseInt(program.P_HOTEL_STAR) || 3,
                meals: parseInt(program.P_MEAL) || 0,
                highlights,
                tags,
                rating: Math.round((Math.random() * 1.5 + 3.5) * 10) / 10,
                reviews: Math.floor(Math.random() * 50) + 10,
                availability: availableSlots <= 5 ? 'เหลือน้อย' : 'ว่าง',
                availableSlots,
                wholesaler: 'TTN',
                wholesalerColor: 'indigo',
                pdfUrl: program.PDF || `https://example.com/tours/${program.P_CODE}.pdf`,
                wordUrl: program.WORD || `https://example.com/tours/${program.P_CODE}.docx`
              }
            })

          setTours(processedTours)
        }

      } catch (err: any) {
        console.error('Error fetching tours:', err)
        setError('เกิดข้อผิดพลาดในการโหลดข้อมูล')
      } finally {
        setLoading(false)
      }
    }

    fetchTours()
  }, [])

  // Filter and sort tours
  const filteredTours = tours.filter(tour => {
    const matchesSearch = tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tour.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tour.code.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCountry = !selectedCountry || tour.country === selectedCountry
    const matchesPrice = tour.price >= priceRange.min && tour.price <= priceRange.max

    return matchesSearch && matchesCountry && matchesPrice
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price
      case 'rating':
        return b.rating - a.rating
      default:
        return b.reviews - a.reviews
    }
  })

  const countries = [...new Set(tours.map(tour => tour.country))].filter(Boolean)

  // Compare functions
  const handleCompareToggle = (tourId: string) => {
    setCompareList(prev => {
      if (prev.includes(tourId)) {
        const newList = prev.filter(id => id !== tourId)
        setShowCompareBar(newList.length > 0)
        return newList
      } else if (prev.length < 10) {
        const newList = [...prev, tourId]
        setShowCompareBar(newList.length > 0)
        return newList
      }
      return prev
    })
  }

  const clearCompareList = () => {
    setCompareList([])
    setShowCompareBar(false)
  }

  const navigateToComparePage = () => {
    const compareParams = compareList.join(',')
    window.open(`/compare?tours=${compareParams}`, '_blank')
  }

  if (loading) {
    return <LoadingScreen title="กำลังโหลดทัวร์ทั้งหมด" subtitle="โปรดรอสักครู่..." />
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">เกิดข้อผิดพลาด</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button variant="primary" onClick={() => window.location.reload()}>
            <RefreshCw className="w-4 h-4 mr-2" />
            ลองใหม่
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">ทัวร์ทั้งหมด</h1>
              <p className="text-gray-600 mt-1">ค้นหาและเปรียบเทียบทัวร์จากหลากหลายผู้ให้บริการ</p>
            </div>
            <div className="flex items-center gap-3">
              {/* View Mode Toggle */}
              <div className="bg-gray-100 rounded-lg p-1 flex">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                ตัวกรอง
              </h3>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">ค้นหา</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="ชื่อทัวร์, ประเทศ, รหัส..."
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Country Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">ประเทศ</label>
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                >
                  <option value="">ทุกประเทศ</option>
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ช่วงราคา: ฿{priceRange.min.toLocaleString()} - ฿{priceRange.max.toLocaleString()}
                </label>
                <input
                  type="range"
                  min="0"
                  max="200000"
                  step="5000"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({...priceRange, max: parseInt(e.target.value)})}
                  className="w-full"
                />
              </div>

              {/* Sort */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">เรียงตาม</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'price' | 'rating' | 'popularity')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                >
                  <option value="popularity">ความนิยม</option>
                  <option value="price">ราคา (ต่ำ-สูง)</option>
                  <option value="rating">คะแนน (สูง-ต่ำ)</option>
                </select>
              </div>

              {/* Stats */}
              <div className="pt-4 border-t">
                <div className="text-sm text-gray-600">
                  แสดง {filteredTours.length} จาก {tours.length} ทัวร์
                </div>
              </div>
            </div>
          </div>

          {/* Tours Grid/List */}
          <div className="lg:col-span-3">
            {filteredTours.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">ไม่พบทัวร์ที่ตรงกับเงื่อนไข</h3>
                <p className="text-gray-600">ลองปรับเปลี่ยนตัวกรองหรือคำค้นหา</p>
              </div>
            ) : (
              <div className={viewMode === 'grid' ? 
                'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' : 
                'space-y-4'
              }>
                {filteredTours.map((tour) => (
                  <div key={tour.id} className={
                    viewMode === 'grid' ? 
                    'bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow' :
                    'bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow flex'
                  }>
                    {/* Tour Image */}
                    <div className={viewMode === 'grid' ? 'relative h-48' : 'relative w-48 flex-shrink-0'}>
                      <Image
                        src={tour.image}
                        alt={tour.title}
                        fill
                        className="object-cover rounded-t-xl"
                      />
                      
                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        <span className={`text-xs bg-${tour.wholesalerColor}-600 text-white px-2 py-1 rounded-full`}>
                          {tour.wholesaler}
                        </span>
                        {tour.availability === 'เหลือน้อย' && (
                          <span className="text-xs bg-red-600 text-white px-2 py-1 rounded-full animate-pulse">
                            🔥 เหลือน้อย
                          </span>
                        )}
                      </div>

                      {/* Quick Actions */}
                      <div className="absolute top-3 right-3 flex gap-2">
                        <button
                          onClick={() => openPreview(tour)}
                          className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors">
                          <Heart className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Tour Info */}
                    <div className={viewMode === 'grid' ? 'p-4' : 'p-4 flex-1'}>
                      {/* Title & Location */}
                      <div className="mb-3">
                        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{tour.title}</h3>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-3 h-3 mr-1" />
                          {tour.location}
                        </div>
                      </div>

                      {/* Tour Details */}
                      <div className="grid grid-cols-2 gap-2 mb-3 text-xs text-gray-600">
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {tour.duration}
                        </div>
                        <div className="flex items-center">
                          <Hotel className="w-3 h-3 mr-1" />
                          {tour.hotelStar}⭐
                        </div>
                        <div className="flex items-center">
                          <Plane className="w-3 h-3 mr-1" />
                          {tour.airline}
                        </div>
                        <div className="flex items-center">
                          <Users className="w-3 h-3 mr-1" />
                          ว่าง {tour.availableSlots}
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center mb-3">
                        <StarRating rating={tour.rating} size="sm" />
                        <span className="text-sm text-gray-600 ml-2">({tour.reviews})</span>
                      </div>

                      {/* Price & Actions */}
                      <div className="flex items-center justify-between">
                        <div>
                          {tour.originalPrice && (
                            <div className="text-sm text-gray-400 line-through">
                              ฿{tour.originalPrice.toLocaleString()}
                            </div>
                          )}
                          <div className="text-xl font-bold text-blue-600">
                            ฿{tour.price.toLocaleString()}
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          {/* Download Buttons */}
                          {tour.pdfUrl && (
                            <button
                              onClick={() => downloadFile(tour.pdfUrl!, `${tour.code}.pdf`)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="ดาวน์โหลด PDF"
                            >
                              <FileText className="w-4 h-4" />
                            </button>
                          )}
                          {tour.wordUrl && (
                            <button
                              onClick={() => downloadFile(tour.wordUrl!, `${tour.code}.docx`)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="ดาวน์โหลด Word"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                          )}
                          
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleCompareToggle(tour.code)}
                              className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center ${
                                compareList.includes(tour.code)
                                  ? 'bg-orange-500 text-white hover:bg-orange-600'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              <ArrowUpDown className="w-3 h-3 mr-1" />
                              {compareList.includes(tour.code) ? 'ยกเลิก' : 'เปรียบเทียบ'}
                            </button>
                            <Link href={`/tours-detail-2/${tour.code}`}>
                              <Button size="sm" variant="primary">
                                ดูรายละเอียด
                                <ChevronRight className="w-3 h-3 ml-1" />
                              </Button>
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
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && previewTour && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">{previewTour.title}</h2>
              <button
                onClick={() => setShowPreview(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Tour Image */}
              <div className="relative h-64 rounded-lg overflow-hidden mb-6">
                <Image
                  src={previewTour.image}
                  alt={previewTour.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Tour Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">ข้อมูลทัวร์</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">รหัสทัวร์:</span>
                        <span className="font-medium">{previewTour.code}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">ระยะเวลา:</span>
                        <span className="font-medium">{previewTour.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">ประเทศ:</span>
                        <span className="font-medium">{previewTour.country}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">สายการบิน:</span>
                        <span className="font-medium">{previewTour.airline}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">โรงแรมและอาหาร</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">โรงแรม:</span>
                        <span className="font-medium">{previewTour.hotelStar} ดาว</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">มื้ออาหาร:</span>
                        <span className="font-medium">{previewTour.meals} มื้อ</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">ราคาและความพร้อม</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">ราคา:</span>
                        <span className="font-bold text-blue-600 text-lg">฿{previewTour.price.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">สถานะ:</span>
                        <span className={`font-medium ${
                          previewTour.availability === 'เหลือน้อย' ? 'text-red-600' : 'text-green-600'
                        }`}>{previewTour.availability}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">ที่นั่งว่าง:</span>
                        <span className="font-medium">{previewTour.availableSlots} ที่</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">คะแนนรีวิว</h3>
                    <div className="flex items-center gap-2">
                      <StarRating rating={previewTour.rating} size="md" />
                      <span className="font-semibold">{previewTour.rating}</span>
                      <span className="text-gray-600">({previewTour.reviews} รีวิว)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Highlights */}
              {previewTour.highlights.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">ไฮไลท์ทัวร์</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {previewTour.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {previewTour.tags.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">แท็ก</h3>
                  <div className="flex flex-wrap gap-2">
                    {previewTour.tags.map((tag, index) => (
                      <span key={index} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-4 border-t">
                <Link href={`/tours-detail-2/${previewTour.code}`} className="flex-1">
                  <Button variant="primary" size="lg" className="w-full">
                    ดูรายละเอียดเต็ม
                  </Button>
                </Link>
                
                {previewTour.pdfUrl && (
                  <Button
                    variant="outline"
                    onClick={() => downloadFile(previewTour.pdfUrl!, `${previewTour.code}.pdf`)}
                    className="flex items-center"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    PDF
                  </Button>
                )}
                
                {previewTour.wordUrl && (
                  <Button
                    variant="outline"
                    onClick={() => downloadFile(previewTour.wordUrl!, `${previewTour.code}.docx`)}
                    className="flex items-center"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Word
                  </Button>
                )}
                
                <Button variant="outline" className="flex items-center">
                  <Share2 className="w-4 h-4 mr-2" />
                  แชร์
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Compare Bar */}
      {showCompareBar && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-40">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="w-5 h-5 text-orange-500" />
                  <span className="font-semibold text-gray-900">
                    เปรียบเทียบ ({compareList.length}/10)
                  </span>
                </div>
                
                <div className="flex gap-2 overflow-x-auto">
                  {compareList.map((tourCode) => {
                    const tour = tours.find(t => t.code === tourCode)
                    return (
                      <div key={tourCode} className="flex items-center bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm whitespace-nowrap">
                        <span className="mr-2">{tour?.title.substring(0, 20)}...</span>
                        <button
                          onClick={() => handleCompareToggle(tourCode)}
                          className="text-orange-600 hover:text-orange-800"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={clearCompareList}>
                  ล้างทั้งหมด
                </Button>
                <Button 
                  variant="primary" 
                  size="sm" 
                  onClick={navigateToComparePage}
                  disabled={compareList.length < 2}
                >
                  เปรียบเทียบ ({compareList.length})
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}