'use client'

import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Users, 
  Calendar, 
  Star, 
  Heart, 
  Share2, 
  Phone, 
  MessageCircle,
  CheckCircle,
  Info,
  ChevronDown,
  ChevronUp,
  Shield,
  Award,
  Camera,
  ChevronRight,
  Loader2,
  X,
  MessageSquare,
  RefreshCw,
  ChevronLeft,
  Home,
  Facebook,
  Twitter,
  Copy
} from 'lucide-react'
import { allTours } from '@/data/tours-data'

export default function TourDetail() {
  const params = useParams()
  const tourId = parseInt(params.id as string)
  const tour = allTours.find(t => t.id === tourId)
  
  const [isFavorited, setIsFavorited] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)
  const [showAllHighlights, setShowAllHighlights] = useState(false)
  const [expandedSection, setExpandedSection] = useState<string>('')
  const [selectedPackage, setSelectedPackage] = useState('standard')
  const [showShareModal, setShowShareModal] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showQuickContact, setShowQuickContact] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [showCalendar, setShowCalendar] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)
  const [scrollY, setScrollY] = useState(0)
  const galleryRef = useRef<HTMLDivElement>(null)

  // Generate additional tour details for comprehensive experience (should be moved to server-side or context)
  const tourDetails = useMemo(() => ({
    gallery: [
      tour?.image,
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop'
    ].filter(Boolean),
    packages: [
      {
        id: 'standard',
        name: 'แพ็คเกจมาตรฐาน',
        description: 'เหมาะสำหรับนักท่องเที่ยวทั่วไป',
        price: tour?.price || 0,
        originalPrice: tour?.originalPrice,
        includes: ['ที่พัก 3-4 ดาว', 'อาหารเช้า', 'รถโค้ชปรับอากาศ', 'ไกด์ท้องถิน']
      },
      {
        id: 'premium',
        name: 'แพ็คเกจพรีเมี่ยม',
        description: 'สำหรับผู้ที่ต้องการความสะดวกสบายระดับสูง',
        price: (tour?.price || 0) + 15000,
        originalPrice: (tour?.originalPrice || tour?.price || 0) + 15000,
        includes: ['ที่พัก 4-5 ดาว', 'อาหาร 3 มื้อ', 'รถ VIP', 'ไกด์ส่วนตัว', 'ประกันครอบคลุม']
      }
    ],
    itinerary: [
      { day: 1, title: 'วันเดินทางไป', activities: ['เดินทางจากไทย', 'เช็คอินโรงแรม', 'พักผ่อน'] },
      { day: 2, title: 'สำรวจเมืองหลัก', activities: ['เยี่ยมชมสถานที่สำคัญ', 'ชิมอาหารท้องถิ่น', 'ช้อปปิ้ง'] },
      { day: 3, title: 'ทัศนศึกษาธรรมชาติ', activities: ['เที่ยวชมธรรมชาติ', 'ถ่ายภาพ', 'กิจกรรมกลางแจ้ง'] }
    ],
    inclusions: [
      'ตั๋วเครื่องบินไป-กลับ',
      'ที่พักตามโปรแกรม',
      'อาหารตามระบุ',
      'รถโค้ชปรับอากาศ',
      'ค่าเข้าชมสถานที่ต่างๆ',
      'ไกด์ท้องถิ่น',
      'ประกันการเดินทาง'
    ],
    exclusions: [
      'ค่าวีซ่า',
      'อาหารและเครื่องดื่มนอกโปรแกรม',
      'ค่าใช้จ่ายส่วนตัว',
      'ทิปไกด์และคนขับ',
      'ค่าประกันเพิ่มเติม'
    ],
    policies: [
      'ราคานี้รวมภาษีและค่าบริการแล้ว',
      'สามารถยกเลิกได้ก่อนเดินทาง 30 วัน',
      'การชำระเงิน: มัดจำ 50% เมื่อจอง',
      'ราคาอาจปรับเปลี่ยนตามอัตราแลกเปลี่ยน'
    ]
  }), [tour])

  // Touch gesture handlers for image gallery
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && selectedImage < tourDetails.gallery.length - 1) {
      setSelectedImage(selectedImage + 1)
    }
    if (isRightSwipe && selectedImage > 0) {
      setSelectedImage(selectedImage - 1)
    }
  }

  // Pull to refresh
  useEffect(() => {
    let startY = 0
    let pullDistance = 0

    const handleTouchStart = (e: TouchEvent) => {
      if (window.scrollY === 0) {
        startY = e.touches[0].clientY
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (startY > 0) {
        pullDistance = e.touches[0].clientY - startY
        if (pullDistance > 0 && window.scrollY === 0) {
          e.preventDefault()
          if (pullDistance > 100) {
            setIsRefreshing(true)
            setTimeout(() => {
              setIsRefreshing(false)
              window.location.reload()
            }, 1500)
          }
        }
      }
    }

    const handleTouchEnd = () => {
      startY = 0
      pullDistance = 0
    }

    document.addEventListener('touchstart', handleTouchStart, { passive: false })
    document.addEventListener('touchmove', handleTouchMove, { passive: false })
    document.addEventListener('touchend', handleTouchEnd)

    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])

  // Smooth scroll observer
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('th-TH', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    })
  }

  // Loading skeleton
  if (!tour) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="animate-pulse">
          <div className="h-64 bg-gray-200"></div>
          <div className="p-4 space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-20 bg-gray-200 rounded"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (false) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">ไม่พบทัวร์ที่คุณค้นหา</h1>
          <p className="text-gray-600 mb-4">กรุณาตรวจสอบลิงก์หรือกลับไปหน้าค้นหา</p>
          <Link href="/tour-search-12" className="text-blue-600 hover:text-blue-800">
            กลับไปหน้าค้นหา
          </Link>
        </div>
      </div>
    )
  }

  const formatPrice = (price: number) => price.toLocaleString('th-TH')
  const discountAmount = tour.originalPrice ? tour.originalPrice - tour.price : 0
  const discountPercent = tour.originalPrice ? Math.round((discountAmount / tour.originalPrice) * 100) : 0

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? '' : section)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Enhanced Pull to Refresh Indicator */}
      {isRefreshing && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 text-white py-4 text-center animate-slide-down shadow-2xl">
          <div className="flex items-center justify-center gap-3">
            <div className="relative">
              <RefreshCw className="w-5 h-5 animate-spin" />
              <div className="absolute inset-0 bg-white/20 rounded-full animate-ping"></div>
            </div>
            <span className="font-bold text-lg">กำลังรีเฟรชข้อมูล...</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30">
            <div className="h-full bg-white animate-pulse" style={{width: '60%'}}></div>
          </div>
        </div>
      )}
      {/* Sticky Header Bar - Mobile First */}
      <div className="sticky top-0 z-50 bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/tour-search-12" className="flex items-center gap-2 text-blue-600">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">กลับ</span>
            </Link>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsFavorited(!isFavorited)}
                className="p-2.5 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
              </button>
              <button 
                onClick={() => setShowShareModal(true)}
                className="p-2.5 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Image Gallery with Touch Support */}
      <div 
        ref={galleryRef}
        className="relative touch-pan-y group"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="aspect-[4/3] sm:aspect-[16/9] relative overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
          {/* Progressive Image Loading with Skeleton */}
          {imageLoading && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
            </div>
          )}
          <Image
            src={tourDetails.gallery[selectedImage] || tour.image}
            alt={tour.title}
            fill
            className={`object-cover transition-all duration-500 hover:scale-105 ${imageLoading ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}`}
            priority
            onLoadingComplete={() => setImageLoading(false)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 opacity-60"></div>
          
          {/* Discount Badge */}
          {discountPercent > 0 && (
            <div className="absolute top-6 left-6 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-2xl font-bold text-sm shadow-lg border-2 border-white/20 backdrop-blur-sm">
                <div className="flex items-center gap-1">
                  <span className="text-xs">🔥</span>
                  <span>-{discountPercent}%</span>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Arrows for Desktop */}
          <div className="hidden md:block">
            <button 
              onClick={() => selectedImage > 0 && setSelectedImage(selectedImage - 1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0"
              disabled={selectedImage === 0}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={() => selectedImage < tourDetails.gallery.length - 1 && setSelectedImage(selectedImage + 1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0"
              disabled={selectedImage === tourDetails.gallery.length - 1}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        {/* Modern Gallery Indicators */}
        {tourDetails.gallery.length > 1 && (
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
            <div className="flex gap-2 bg-black/30 backdrop-blur-md rounded-full px-4 py-2 border border-white/10">
              {tourDetails.gallery.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`h-2 rounded-full transition-all duration-300 hover:scale-125 ${
                    selectedImage === index 
                      ? 'bg-white w-8 shadow-lg' 
                      : 'bg-white/50 w-2 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Enhanced Photo Count Button */}
        <button className="absolute bottom-6 right-6 bg-black/30 backdrop-blur-md text-white px-4 py-2 rounded-2xl text-sm font-medium flex items-center gap-2 border border-white/10 hover:bg-black/40 transition-all duration-200 hover:scale-105 group/btn">
          <Camera className="w-4 h-4 group-hover/btn:rotate-12 transition-transform duration-200" />
          <span className="hidden sm:inline">ดูภาพทั้งหมด</span>
          <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">{tourDetails.gallery.length}</span>
        </button>

        {/* Modern Swipe Indicator for Mobile */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 md:hidden">
          <div className="text-white/80 text-xs flex items-center gap-2 bg-black/20 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/10">
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-white/60 rounded-full animate-pulse"></div>
              <div className="w-1 h-1 bg-white/40 rounded-full animate-pulse" style={{animationDelay: '0.1s'}}></div>
              <div className="w-1 h-1 bg-white/60 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
            </div>
            <span>เลื่อนดูภาพ</span>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-2 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <Home className="w-4 h-4" />
          <span>หน้าแรก</span>
          <ChevronRight className="w-3 h-3" />
          <span>ค้นหาทัวร์</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-900 font-medium truncate">{tour.title}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Left Column - Tour Info */}
          <div className="lg:col-span-2">
            {/* Tour Header */}
            <div className="mb-8">
              <div className="mb-4">
                <div className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-4 py-2 rounded-full text-sm font-bold mb-3 animate-float">
                  🎆 ทัวร์พิเศษ
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4 leading-tight tracking-tight bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                {tour.title}
              </h1>
              
              {/* Quick Info */}
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">{tour.destinations.join(' • ')}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{tour.rating}</span>
                  <span className="text-sm text-gray-500">({tour.reviews} รีวิว)</span>
                </div>
              </div>

              {/* Enhanced Tour Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-gradient-to-br from-white to-blue-50/30 rounded-2xl border border-blue-100/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-center group cursor-pointer">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-200 shadow-lg">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wider">ระยะเวลา</div>
                  <div className="font-bold text-gray-900">{tour.duration}</div>
                </div>
                
                <div className="text-center group cursor-pointer">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-200 shadow-lg">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wider">จำนวนคน</div>
                  <div className="font-bold text-gray-900">{tour.groupSize}</div>
                </div>
                
                <button 
                  onClick={() => setShowCalendar(true)}
                  className="text-center group hover:bg-gradient-to-br hover:from-orange-50 hover:to-amber-50 rounded-2xl transition-all duration-200 p-3 relative overflow-hidden"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-200 shadow-lg group-hover:shadow-xl">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wider">วันเดินทาง</div>
                  <div className="font-bold text-gray-900 group-hover:text-orange-600">{selectedDate ? formatDate(selectedDate) : 'เลือกวัน'}</div>
                  {!selectedDate && (
                    <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  )}
                </button>
                
                <div className="text-center group cursor-pointer">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-200 shadow-lg">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wider">รับรอง</div>
                  <div className="font-bold text-gray-900">มาตรฐาน</div>
                </div>
              </div>
            </div>

            {/* Enhanced Highlights */}
            <div className="mb-8">
              <h2 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-600 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                ไฮไลท์ของทัวร์
              </h2>
              <div className="bg-gradient-to-br from-white to-green-50/30 rounded-2xl p-6 border border-green-100/50 shadow-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(showAllHighlights ? tour.highlights : tour.highlights.slice(0, 4)).map((highlight, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 bg-white/70 rounded-xl hover:bg-white/90 transition-all duration-200 group border border-white/50 hover:border-green-200 hover:shadow-md">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-md">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-gray-800 font-medium group-hover:text-green-700 transition-colors duration-200">{highlight}</span>
                    </div>
                  ))}
                </div>
                {tour.highlights.length > 4 && (
                  <button
                    onClick={() => setShowAllHighlights(!showAllHighlights)}
                    className="mt-4 w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-6 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center gap-2"
                  >
                    <span>{showAllHighlights ? 'ดูน้อยลง' : `ดูเพิ่มเติม (+${tour.highlights.length - 4} รายการ)`}</span>
                    {showAllHighlights ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                )}
              </div>
            </div>

            {/* Enhanced Expandable Sections */}
            <div className="space-y-6">
              {/* Enhanced Itinerary */}
              <div className="bg-gradient-to-br from-white to-indigo-50/30 rounded-2xl border border-indigo-100/50 shadow-lg overflow-hidden">
                <button
                  onClick={() => toggleSection('itinerary')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-indigo-50/30 transition-colors duration-200 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-lg">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-700 transition-colors duration-200">โปรแกรมการเดินทาง</h3>
                      <p className="text-sm text-gray-500">แผนการเดินทางแต่ละวัน</p>
                    </div>
                  </div>
                  <div className={`transform transition-all duration-200 ${expandedSection === 'itinerary' ? 'rotate-180' : 'rotate-0'}`}>
                    <ChevronDown className="w-6 h-6 text-gray-400 group-hover:text-indigo-500" />
                  </div>
                </button>
                {expandedSection === 'itinerary' && (
                  <div className="px-4 pb-4 border-t border-gray-100">
                    <div className="space-y-4 pt-4">
                      {tourDetails.itinerary.map((day, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                            {day.day}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 mb-1">{day.title}</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {day.activities.map((activity, idx) => (
                                <li key={idx}>• {activity}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Enhanced Inclusions */}
              <div className="bg-gradient-to-br from-white to-green-50/30 rounded-2xl border border-green-100/50 shadow-lg overflow-hidden">
                <button
                  onClick={() => toggleSection('inclusions')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-green-50/30 transition-colors duration-200 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-lg">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-700 transition-colors duration-200">ราคารวม</h3>
                      <p className="text-sm text-gray-500">รายละเอียดสิ่งที่คุณได้รับ</p>
                    </div>
                  </div>
                  <div className={`transform transition-all duration-200 ${expandedSection === 'inclusions' ? 'rotate-180' : 'rotate-0'}`}>
                    <ChevronDown className="w-6 h-6 text-gray-400 group-hover:text-green-500" />
                  </div>
                </button>
                {expandedSection === 'inclusions' && (
                  <div className="px-4 pb-4 border-t border-gray-100">
                    <div className="grid sm:grid-cols-2 gap-6 pt-4">
                      <div>
                        <h4 className="font-medium text-green-600 mb-3 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4" />
                          รวมในราคา
                        </h4>
                        <ul className="text-sm text-gray-600 space-y-2">
                          {tourDetails.inclusions.map((item, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-red-600 mb-3 flex items-center gap-2">
                          <Info className="w-4 h-4" />
                          ไม่รวมในราคา
                        </h4>
                        <ul className="text-sm text-gray-600 space-y-2">
                          {tourDetails.exclusions.map((item, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="w-4 h-4 border border-red-300 rounded-full flex-shrink-0 mt-0.5" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Enhanced Policies */}
              <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-2xl border border-blue-100/50 shadow-lg overflow-hidden">
                <button
                  onClick={() => toggleSection('policies')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-blue-50/30 transition-colors duration-200 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-lg">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-200">เงื่อนไขการจอง</h3>
                      <p className="text-sm text-gray-500">ข้อตกลงและนโยบายสำคัญ</p>
                    </div>
                  </div>
                  <div className={`transform transition-all duration-200 ${expandedSection === 'policies' ? 'rotate-180' : 'rotate-0'}`}>
                    <ChevronDown className="w-6 h-6 text-gray-400 group-hover:text-blue-500" />
                  </div>
                </button>
                {expandedSection === 'policies' && (
                  <div className="px-4 pb-4 border-t border-gray-100">
                    <ul className="text-sm text-gray-600 space-y-2 pt-4">
                      {tourDetails.policies.map((policy, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Shield className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                          {policy}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Section */}
          <div className="lg:col-span-1 mt-8 lg:mt-0">
            <div className="sticky top-24 space-y-4">
              {/* Package Selection */}
              <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">เลือกแพ็คเกจ</h3>
                <div className="space-y-3">
                  {tourDetails.packages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        selectedPackage === pkg.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedPackage(pkg.id)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900">{pkg.name}</h4>
                          <p className="text-xs text-gray-500">{pkg.description}</p>
                        </div>
                        <div className="flex-shrink-0 text-right">
                          {pkg.originalPrice && pkg.originalPrice > pkg.price && (
                            <div className="text-xs text-gray-400 line-through">
                              ฿{formatPrice(pkg.originalPrice)}
                            </div>
                          )}
                          <div className="font-bold text-gray-900">
                            ฿{formatPrice(pkg.price)}
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-600">
                        {pkg.includes.slice(0, 2).join(' • ')}
                        {pkg.includes.length > 2 && ` และอื่นๆ`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Summary */}
              <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                <div className="space-y-3">
                  {/* Selected Package Price */}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">ราคาต่อคน</span>
                    <span className="font-medium">
                      ฿{formatPrice(tourDetails.packages.find(p => p.id === selectedPackage)?.price || tour.price)}
                    </span>
                  </div>
                  
                  {/* Discount */}
                  {discountAmount > 0 && (
                    <div className="flex justify-between items-center text-green-600">
                      <span>ส่วนลด</span>
                      <span>-฿{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  
                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">ราคารวม</span>
                      <span className="text-xl font-bold text-blue-600">
                        ฿{formatPrice(tourDetails.packages.find(p => p.id === selectedPackage)?.price || tour.price)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">ต่อคน (รวมภาษีแล้ว)</p>
                  </div>
                </div>

                {/* Action Buttons with Haptic Feedback */}
                <div className="mt-6 space-y-3">
                  <button 
                    onClick={() => {
                      // Trigger haptic feedback on mobile
                      if ('vibrate' in navigator) {
                        navigator.vibrate(10)
                      }
                      setIsLoading(true)
                      setTimeout(() => setIsLoading(false), 2000)
                    }}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:shadow-lg hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2 focus:ring-4 focus:ring-blue-300 active:scale-95"
                    aria-label={`จองทัวร์ ${tour.title} ทันที`}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        กำลังดำเนินการ...
                      </>
                    ) : (
                      <>
                        จองทันที
                        <ChevronRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => {
                        if ('vibrate' in navigator) navigator.vibrate(5)
                        window.location.href = 'tel:026741500'
                      }}
                      className="flex items-center justify-center gap-2 py-3 px-4 border border-blue-600 text-blue-600 rounded-xl font-medium hover:bg-blue-50 transition-colors active:scale-95">
                      <Phone className="w-4 h-4" />
                      โทรสอบถาม
                    </button>
                    <button 
                      onClick={() => {
                        if ('vibrate' in navigator) navigator.vibrate(5)
                        setShowQuickContact(true)
                      }}
                      className="flex items-center justify-center gap-2 py-3 px-4 border border-green-600 text-green-600 rounded-xl font-medium hover:bg-green-50 transition-colors active:scale-95">
                      <MessageCircle className="w-4 h-4" />
                      แชท
                    </button>
                  </div>
                </div>

                {/* Trust Indicators */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span>การันตีความปลอดภัย 100%</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    <span>ยกเลิกฟรีก่อนเดินทาง 30 วัน</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Customer Reviews Section */}
        <div className="mt-12">
          <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-3xl p-8 border border-blue-100/50 shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                    <Star className="w-5 h-5 text-white fill-current" />
                  </div>
                  รีวิวจากลูกค้า
                </h2>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 text-yellow-500 fill-current" />
                      ))}
                    </div>
                    <span className="font-bold text-lg text-gray-900">{tour.rating}</span>
                  </div>
                  <span className="text-gray-500">จาก {tour.reviews} รีวิว</span>
                </div>
              </div>
            </div>
            
            {/* Reviews */}
            <div className="space-y-6">
              {[
                { name: 'คุณสมหญิง', rating: 5, text: 'ทัวร์นี้ดีเกินคาดมาก! ไกด์น่ารัก พูดเก่ง อาหารอร่อยทุกมื้อ ที่พักสะอาด วิวสวย คุ้มค่าสุดๆ แนะนำเลยค่ะ 🥰', time: '2 สัปดาห์ที่แล้ว', verified: true },
                { name: 'คุณธนา', rating: 5, text: 'บริการดีเยี่ยม รถใหม่สะอาด กิจกรรมครบครัน ได้ความรู้เยอะมาก ครั้งหน้าจะมาอีกแน่นอน ขอบคุณทีม TourWow ครับ', time: '1 สัปดาห์ที่แล้ว', verified: true },
                { name: 'คุณมาลี', rating: 4, text: 'โดยรวมดีมากค่ะ เวลาพอดี ไม่รีบร้อน ช่างภาพเก่งมาก ได้รูปสวยเยอะ เด็กๆ สนุกมาก ประทับใจค่ะ', time: '3 วันที่แล้ว', verified: false }
              ].map((review, index) => (
                <div key={index} className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-white/50 hover:bg-white/90 transition-all duration-300 group">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:scale-110 transition-transform">
                      {review.name.charAt(2)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-bold text-gray-900">{review.name}</span>
                        {review.verified && (
                          <div className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            ยืนยันแล้ว
                          </div>
                        )}
                        <div className="flex items-center ml-auto">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-500 fill-current' : 'text-gray-200'}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700 mb-3 leading-relaxed">
                        {review.text}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400 font-medium">{review.time}</span>
                        <button className="text-xs text-blue-500 hover:text-blue-600 font-medium">
                          ถูกใจ · ตอบกลับ
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* View All Button */}
            <button className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-4 px-6 rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center gap-2">
              <span>ดูรีวิวทั้งหมด ({tour.reviews} รีวิว)</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Related Tours */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">ทัวร์ที่คุณอาจสนใจ</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allTours.filter(t => t.id !== tour.id).slice(0, 3).map((relatedTour) => (
              <div key={relatedTour.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-[4/3] relative">
                  <Image
                    src={relatedTour.image}
                    alt={relatedTour.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{relatedTour.title}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-600">{relatedTour.rating} ({relatedTour.reviews})</span>
                  </div>
                  <div className="text-lg font-bold text-blue-600">฿{formatPrice(relatedTour.price)}</div>
                  <button className="w-full mt-3 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                    ดูรายละเอียด
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modern Sticky Bottom CTA Bar - Mobile Only */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden z-40">
        {/* Glassmorphism Background */}
        <div className="bg-white/80 backdrop-blur-xl border-t border-white/20 shadow-2xl">
          <div className="px-4 pt-4 pb-safe" style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 16px)' }}>
            {/* Price Info */}
            <div className="flex items-center justify-between mb-3 px-2">
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wide font-medium">เริ่มต้น</div>
                <div className="text-2xl font-bold text-gray-900">฿{formatPrice(tourDetails.packages.find(p => p.id === selectedPackage)?.price || tour.price)}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500">ต่อคน</div>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{tour.rating}</span>
                </div>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex gap-3">
              <button 
                onClick={() => setShowQuickContact(true)}
                className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 px-4 rounded-2xl font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 border border-white/20"
              >
                <MessageSquare className="w-5 h-5" />
                <span className="font-semibold">สอบถาม</span>
              </button>
              <button 
                onClick={() => setIsLoading(true)}
                disabled={isLoading}
                className="flex-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-4 px-6 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 disabled:opacity-70 border border-white/20 relative overflow-hidden"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>กำลังดำเนินการ...</span>
                  </>
                ) : (
                  <>
                    <span className="text-lg font-black">จองทันที</span>
                    <div className="bg-white/20 px-2 py-0.5 rounded-lg text-xs font-medium">
                      เหลือ {Math.floor(Math.random() * 5) + 3} ที่นั่ง
                    </div>
                  </>
                )}
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shimmer"></div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Quick Contact FAB */}
      <div className="fixed bottom-32 right-4 lg:bottom-6 z-30">
        <div className="relative">
          <button
            onClick={() => setShowQuickContact(true)}
            className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-600 text-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center hover:scale-110 active:scale-95 border border-white/20 backdrop-blur-sm relative overflow-hidden group"
          >
            <MessageCircle className="w-7 h-7 relative z-10 group-hover:scale-110 transition-transform duration-200" />
            {/* Pulse effect */}
            <div className="absolute inset-0 bg-emerald-400 rounded-2xl animate-ping opacity-20"></div>
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer"></div>
          </button>
          
          {/* Notification badge */}
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-bounce border-2 border-white">
            !
          </div>
          
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
            ติดต่อเรา
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        </div>
      </div>

      {/* Modern Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 w-full max-w-sm shadow-2xl border border-white/20 animate-slide-up">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">แชร์ทัวร์นี้</h3>
                <p className="text-sm text-gray-500 mt-1">ให้เพื่อนๆ ได้เห็นด้วย</p>
              </div>
              <button 
                onClick={() => setShowShareModal(false)}
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            
            {/* Share Options */}
            <div className="space-y-3">
              <button className="w-full flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-600 rounded-2xl hover:from-blue-100 hover:to-blue-200 transition-all duration-200 group">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <Facebook className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">Facebook</div>
                  <div className="text-xs text-blue-500">แชร์กับเพื่อนๆ</div>
                </div>
                <ChevronRight className="w-5 h-5 ml-auto text-blue-400" />
              </button>
              
              <button className="w-full flex items-center gap-4 p-4 bg-gradient-to-r from-sky-50 to-sky-100 text-sky-600 rounded-2xl hover:from-sky-100 hover:to-sky-200 transition-all duration-200 group">
                <div className="w-12 h-12 bg-sky-500 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <Twitter className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">Twitter</div>
                  <div className="text-xs text-sky-500">ทวีตให้โลกรู้</div>
                </div>
                <ChevronRight className="w-5 h-5 ml-auto text-sky-400" />
              </button>
              
              <button className="w-full flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-600 rounded-2xl hover:from-gray-100 hover:to-gray-200 transition-all duration-200 group">
                <div className="w-12 h-12 bg-gray-500 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <Copy className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">คัดลอกลิงก์</div>
                  <div className="text-xs text-gray-500">แชร์ทางอื่น</div>
                </div>
                <ChevronRight className="w-5 h-5 ml-auto text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modern Contact Modal */}
      {showQuickContact && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4 animate-fade-in">
          <div className="bg-white/95 backdrop-blur-xl rounded-t-3xl sm:rounded-3xl p-6 w-full max-w-md shadow-2xl border border-white/20 animate-slide-up">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-white" />
                  </div>
                  ติดต่อเรา
                </h3>
                <p className="text-sm text-gray-500 mt-1">พร้อมให้คำปรึกษาทุกเวลา</p>
              </div>
              <button 
                onClick={() => setShowQuickContact(false)}
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            
            {/* Contact Options */}
            <div className="space-y-4">
              <button className="w-full flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-100 text-green-600 rounded-2xl hover:from-green-100 hover:to-emerald-200 transition-all duration-200 group">
                <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-lg">
                  <MessageCircle className="w-7 h-7" />
                </div>
                <div className="text-left flex-1">
                  <div className="font-bold text-lg">แชท LINE</div>
                  <div className="text-sm text-green-500 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    ออนไลน์ • ตอบกลับเร็วที่สุด
                  </div>
                </div>
                <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  เร็ว
                </div>
              </button>
              
              <button className="w-full flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-100 text-blue-600 rounded-2xl hover:from-blue-100 hover:to-indigo-200 transition-all duration-200 group">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-lg">
                  <Phone className="w-7 h-7" />
                </div>
                <div className="text-left flex-1">
                  <div className="font-bold text-lg">โทรเลย</div>
                  <div className="text-xl font-bold text-blue-600">02-674-1500</div>
                  <div className="text-sm text-blue-500">จันทร์-ศุกร์ 9:00-18:00</div>
                </div>
                <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  ฟรี
                </div>
              </button>

              {/* Quick FAQ */}
              <div className="mt-6 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="text-sm font-medium text-gray-700 mb-2">คำถามที่พบบ่อย</div>
                <div className="space-y-2">
                  <div className="text-xs text-gray-600">• สามารถยกเลิกทัวร์ได้หรือไม่?</div>
                  <div className="text-xs text-gray-600">• มีประกันการเดินทางรวมไหม?</div>
                  <div className="text-xs text-gray-600">• ชำระเงินอย่างไร?</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modern Calendar Modal */}
      {showCalendar && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center animate-fade-in">
          <div className="bg-white/95 backdrop-blur-xl rounded-t-3xl sm:rounded-3xl p-8 w-full sm:max-w-lg shadow-2xl border border-white/20 animate-slide-up">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  เลือกวันเดินทาง
                </h3>
                <p className="text-sm text-gray-500 mt-2">วันที่มีสีเขียว = มีที่ว่าง</p>
              </div>
              <button 
                onClick={() => setShowCalendar(false)}
                className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            
            {/* Month Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold text-gray-700">{new Date().toLocaleDateString('th-TH', { month: 'long', year: 'numeric' })}</h4>
                <div className="flex gap-2">
                  <button className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-200 transition-colors">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-200 transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-2 text-center mb-4">
                {['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัส', 'ศุกร์', 'เสาร์'].map((day, index) => (
                  <div key={day} className={`font-semibold text-xs py-2 ${index === 0 || index === 6 ? 'text-red-500' : 'text-gray-500'}`}>
                    {day}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2 mb-8">
              {Array.from({ length: 35 }, (_, i) => {
                const date = new Date()
                date.setDate(date.getDate() + i - 7)
                const isCurrentMonth = date.getMonth() === new Date().getMonth()
                const isAvailable = i % 4 !== 1 && isCurrentMonth
                const isToday = date.toDateString() === new Date().toDateString()
                const isWeekend = date.getDay() === 0 || date.getDay() === 6
                const hasPromo = i % 7 === 2 && isAvailable
                
                return (
                  <button
                    key={i}
                    onClick={() => {
                      if (isAvailable) {
                        setSelectedDate(date)
                        setShowCalendar(false)
                        if ('vibrate' in navigator) navigator.vibrate(10)
                      }
                    }}
                    disabled={!isAvailable || !isCurrentMonth}
                    className={`
                      aspect-square rounded-xl text-sm font-medium transition-all duration-200 relative overflow-hidden
                      ${isCurrentMonth 
                        ? isAvailable 
                          ? 'hover:scale-110 hover:shadow-lg active:scale-95' 
                          : 'text-gray-300 cursor-not-allowed bg-gray-50'
                        : 'text-gray-200 cursor-not-allowed'
                      }
                      ${selectedDate?.toDateString() === date.toDateString() 
                        ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg scale-105' 
                        : isAvailable && isCurrentMonth
                          ? isToday 
                            ? 'bg-gradient-to-br from-orange-400 to-pink-500 text-white'
                            : 'bg-white hover:bg-blue-50 border-2 border-transparent hover:border-blue-200'
                          : ''
                      }
                      ${isWeekend && isCurrentMonth && isAvailable ? 'text-red-500' : ''}
                    `}
                  >
                    <span className="relative z-10">{date.getDate()}</span>
                    
                    {/* Special indicators */}
                    {hasPromo && (
                      <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    )}
                    {isToday && selectedDate?.toDateString() !== date.toDateString() && (
                      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
                    )}
                  </button>
                )
              })}
            </div>
            
            {/* Legend */}
            <div className="flex items-center justify-center gap-6 mb-6 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full"></div>
                <span className="text-gray-600">เลือกแล้ว</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full"></div>
                <span className="text-gray-600">วันนี้</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                <span className="text-gray-600">ไม่ว่าง</span>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-4">
              <button 
                onClick={() => setShowCalendar(false)}
                className="flex-1 py-4 border-2 border-gray-200 text-gray-600 rounded-2xl font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
              >
                ยกเลิก
              </button>
              <button 
                onClick={() => {
                  setShowCalendar(false)
                  if ('vibrate' in navigator) navigator.vibrate(10)
                }}
                className="flex-2 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              >
                ยืนยัน
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Add CSS for animations
// Enhanced animations and styles are now in globals.css