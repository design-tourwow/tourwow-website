'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { 
  ArrowLeft, Calendar, Users, Star, Clock, MapPin, Plane, Hotel, 
  Shield, CreditCard, Share2, Phone, MessageCircle, CheckCircle,
  Globe, Wifi, Navigation, Sparkles, Utensils, Bed, Menu, X, Plus,
  Loader2, AlertCircle, Heart, Eye
} from 'lucide-react'
import { getTourById } from '@/lib/tour-data-consolidated'

export default function TourSearch7DetailPage() {
  const params = useParams()
  const router = useRouter()
  const tourId = parseInt(params.id as string)
  
  // Loading and error states
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tour, setTour] = useState<any>(null)
  
  // State for sticky navigation
  const [isSticky, setIsSticky] = useState(false)
  const [activeSection, setActiveSection] = useState('overview')
  
  // Refs for sections
  const overviewRef = useRef<HTMLDivElement>(null)
  const itineraryRef = useRef<HTMLDivElement>(null)
  const accommodationRef = useRef<HTMLDivElement>(null)
  const pricingRef = useRef<HTMLDivElement>(null)
  const reviewsRef = useRef<HTMLDivElement>(null)
  
  // State for mobile menu
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  
  // State for departure dates
  const [selectedMonth, setSelectedMonth] = useState('ม.ค.')
  const [showAllDates, setShowAllDates] = useState(false)
  
  // State for booking
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')
  const [travelers, setTravelers] = useState(2)
  
  // State for image loading
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  
  // All available months
  const allMonths = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.']
  
  // Load tour data
  useEffect(() => {
    const loadTour = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        const tourData = getTourById(tourId)
        if (!tourData) {
          throw new Error('ไม่พบข้อมูลทัวร์')
        }
        
        setTour(tourData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการโหลดข้อมูล')
      } finally {
        setIsLoading(false)
      }
    }
    
    loadTour()
  }, [tourId])
  
  // Scroll detection for sticky navigation
  const handleScroll = () => {
    const scrollTop = window.scrollY
    setIsSticky(scrollTop > 100)
    
    // Update active section based on scroll position
    const sections = [
      { ref: overviewRef, id: 'overview' },
      { ref: itineraryRef, id: 'itinerary' },
      { ref: accommodationRef, id: 'accommodation' },
      { ref: pricingRef, id: 'pricing' },
      { ref: reviewsRef, id: 'reviews' }
    ]
    
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i]
      if (section.ref.current) {
        const rect = section.ref.current.getBoundingClientRect()
        if (rect.top <= 150) {
          setActiveSection(section.id)
          break
        }
      }
    }
  }
  
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto" />
          <h2 className="text-xl font-semibold text-gray-800">กำลังโหลดข้อมูลทัวร์...</h2>
          <p className="text-gray-600">กรุณารอสักครู่</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error || !tour) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md mx-auto px-4">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">ไม่พบข้อมูลทัวร์</h1>
          <p className="text-gray-600 mb-6">{error || 'ไม่พบข้อมูลทัวร์ที่ต้องการ'}</p>
          <div className="space-y-3">
            <Link 
              href="/tour-search-7" 
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              กลับไปหน้าค้นหาทัวร์
            </Link>
            <button
              onClick={() => window.location.reload()}
              className="block w-full text-gray-600 hover:text-gray-800 transition-colors"
            >
              ลองใหม่อีกครั้ง
            </button>
          </div>
        </div>
      </div>
    )
  }

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
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Hero Section - Enhanced with loading states */}
        <div className="relative h-[70vh] w-full overflow-hidden">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
              <Loader2 className="w-12 h-12 text-gray-400 animate-spin" />
            </div>
          )}
          
          <Image
            src={tour.image}
            alt={tour.title}
            fill
            className={`object-cover transition-opacity duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            priority
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageError(true)
              setImageLoaded(true)
            }}
          />
          
          {imageError && (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center">
              <div className="text-center text-white">
                <Globe className="w-16 h-16 mx-auto mb-4" />
                <h2 className="text-2xl font-bold">{tour.title}</h2>
              </div>
            </div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
          
          {/* Back Button */}
          <div className="absolute top-6 left-6 z-20">
            <button
              onClick={() => router.back()}
              className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-2xl hover:bg-white/30 transition-all duration-300 border border-white/30 hover:scale-105"
              aria-label="กลับไปหน้าค้นหา"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          </div>
          
          {/* Action Buttons */}
          <div className="absolute top-6 right-6 z-20 flex gap-3">
            <button 
              className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-2xl hover:bg-white/30 transition-all duration-300 border border-white/30 hover:scale-105"
              aria-label="เพิ่มรายการโปรด"
            >
              <Heart className="w-6 h-6" />
            </button>
            <button 
              className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-2xl hover:bg-white/30 transition-all duration-300 border border-white/30 hover:scale-105"
              aria-label="แชร์ทัวร์"
            >
              <Share2 className="w-6 h-6" />
            </button>
          </div>
          
          {/* Hero Content */}
          <div className="absolute inset-0 flex items-end">
            <div className="w-full p-6 md:p-12">
              <div className="max-w-4xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm p-6 md:p-8 rounded-3xl border border-white/20 fade-in">
                  <div className="flex items-center gap-3 mb-4 flex-wrap">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                      {tour.durationCode}
                    </div>
                    <div className={`px-4 py-2 rounded-full text-sm font-bold ${
                      tour.availableSeats >= 15 
                        ? 'bg-green-500 text-white' 
                        : tour.availableSeats >= 8 
                        ? 'bg-yellow-500 text-white'
                        : 'bg-red-500 text-white'
                    }`}>
                      {tour.availableSeats >= 15 
                        ? `${tour.availableSeats} ที่ว่าง` 
                        : tour.availableSeats >= 8 
                        ? `เหลือ ${tour.availableSeats} ที่`
                        : `ใกล้เต็ม ${tour.availableSeats} ที่`
                      }
                    </div>
                    <div className="bg-yellow-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1">
                      <Star className="w-4 h-4 fill-current" />
                      {tour.rating}
                    </div>
                  </div>
                  
                  <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                    {tour.title}
                  </h1>
                  
                  <div className="flex items-center gap-6 text-white/90 mb-6 flex-wrap">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      <span className="font-semibold">{tour.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Plane className="w-5 h-5" />
                      <span>{tour.airlineName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      <span>{tour.groupSize} คน</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="text-white">
                      <p className="text-sm opacity-80">เริ่มต้นที่</p>
                      <div className="flex items-baseline gap-2">
                        {tour.originalPrice && (
                          <span className="text-lg line-through opacity-60">
                            ฿{tour.originalPrice.toLocaleString()}
                          </span>
                        )}
                        <span className="text-3xl md:text-4xl font-bold">
                          ฿{tour.price.toLocaleString()}
                        </span>
                        <span className="text-sm opacity-80">/ คน</span>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => setShowBookingModal(true)}
                      className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 transform hover:scale-105 shadow-xl"
                    >
                      จองทัวร์
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Navigation - Enhanced */}
        <div className={`sticky top-0 z-50 transition-all duration-300 ${
          isSticky ? 'bg-white/95 backdrop-blur-sm shadow-xl border-b border-gray-200' : 'bg-transparent'
        }`}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center gap-8 overflow-x-auto scrollbar-hide">
                <button
                  onClick={() => scrollToSection(overviewRef)}
                  className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 whitespace-nowrap ${
                    activeSection === 'overview'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                  }`}
                >
                  ภาพรวม
                </button>
                <button
                  onClick={() => scrollToSection(itineraryRef)}
                  className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 whitespace-nowrap ${
                    activeSection === 'itinerary'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                  }`}
                >
                  กำหนดการ
                </button>
                <button
                  onClick={() => scrollToSection(accommodationRef)}
                  className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 whitespace-nowrap ${
                    activeSection === 'accommodation'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                  }`}
                >
                  ที่พัก
                </button>
                <button
                  onClick={() => scrollToSection(pricingRef)}
                  className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 whitespace-nowrap ${
                    activeSection === 'pricing'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                  }`}
                >
                  ราคา
                </button>
                <button
                  onClick={() => scrollToSection(reviewsRef)}
                  className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 whitespace-nowrap ${
                    activeSection === 'reviews'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                  }`}
                >
                  รีวิว
                </button>
              </div>
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden bg-gray-100 p-2 rounded-xl hover:bg-gray-200 transition-colors"
                aria-label="เมนู"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
            
            {/* Mobile Menu */}
            {showMobileMenu && (
              <div className="md:hidden bg-white rounded-2xl shadow-xl p-4 mb-4 border border-gray-200 fade-in">
                <div className="flex flex-col gap-2">
                  {[
                    { id: 'overview', label: 'ภาพรวม', ref: overviewRef },
                    { id: 'itinerary', label: 'กำหนดการ', ref: itineraryRef },
                    { id: 'accommodation', label: 'ที่พัก', ref: accommodationRef },
                    { id: 'pricing', label: 'ราคา', ref: pricingRef },
                    { id: 'reviews', label: 'รีวิว', ref: reviewsRef }
                  ].map((section) => (
                    <button
                      key={section.id}
                      onClick={() => {
                        scrollToSection(section.ref)
                        setShowMobileMenu(false)
                      }}
                      className={`px-4 py-3 rounded-xl font-semibold text-left transition-all duration-200 ${
                        activeSection === section.id
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white'
                          : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                      }`}
                    >
                      {section.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Overview Section */}
              <div ref={overviewRef} className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 fade-in">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <Globe className="w-8 h-8 text-blue-600" />
                  ภาพรวมทัวร์
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <Clock className="w-6 h-6 text-blue-600" />
                      <h3 className="font-bold text-gray-800">ระยะเวลา</h3>
                    </div>
                    <p className="text-2xl font-bold text-blue-600">{tour.duration}</p>
                    <p className="text-gray-600">{tour.days} วัน {tour.nights} คืน</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <Users className="w-6 h-6 text-green-600" />
                      <h3 className="font-bold text-gray-800">ขนาดกลุ่ม</h3>
                    </div>
                    <p className="text-2xl font-bold text-green-600">{tour.groupSize}</p>
                    <p className="text-gray-600">คนต่อกลุ่ม</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-200 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <Hotel className="w-6 h-6 text-purple-600" />
                      <h3 className="font-bold text-gray-800">ระดับโรงแรม</h3>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(tour.hotelStar)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-600">{tour.hotelStar} ดาว</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-2xl border border-orange-200 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <Plane className="w-6 h-6 text-orange-600" />
                      <h3 className="font-bold text-gray-800">สายการบิน</h3>
                    </div>
                    <p className="text-xl font-bold text-orange-600">{tour.airlineName}</p>
                    <p className="text-gray-600">รหัส: {tour.airline}</p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-2xl border border-gray-200">
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-blue-600" />
                    ไฮไลท์ของทัวร์
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{tour.highlights}</p>
                </div>
              </div>

              {/* Itinerary Section */}
              <div ref={itineraryRef} className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 fade-in">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                  <Calendar className="w-8 h-8 text-blue-600" />
                  กำหนดการเดินทาง
                </h2>
                
                <div className="space-y-6">
                  {tour.detailedItinerary?.map((day: any, index: number) => (
                    <div key={day.day} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200 hover:shadow-lg transition-shadow">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg">
                          {day.day}
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">{day.title}</h3>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                            <Navigation className="w-5 h-5 text-blue-600" />
                            กิจกรรม
                          </h4>
                          <ul className="space-y-2">
                            {day.activities?.map((activity: string, i: number) => (
                              <li key={i} className="flex items-start gap-3 text-gray-700">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-sm leading-relaxed">{activity}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                            <Utensils className="w-5 h-5 text-green-600" />
                            อาหาร
                          </h4>
                          <div className="space-y-3">
                            {day.meals && Object.entries(day.meals).map(([mealType, mealData]: [string, any]) => (
                              <div key={mealType} className="bg-white/80 rounded-xl p-3">
                                <p className="font-medium text-gray-800 capitalize">
                                  {mealType === 'breakfast' ? 'อาหารเช้า' : 
                                   mealType === 'lunch' ? 'อาหารกลางวัน' : 'อาหารเย็น'}
                                </p>
                                <p className="text-sm text-gray-600">{mealData.location} - {mealData.type}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Accommodation Section */}
              <div ref={accommodationRef} className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 fade-in">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                  <Bed className="w-8 h-8 text-blue-600" />
                  ที่พัก
                </h2>
                
                <div className="space-y-6">
                  {tour.accommodation?.map((hotel: any, index: number) => (
                    <div key={index} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200 hover:shadow-lg transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="bg-gradient-to-r from-purple-600 to-pink-700 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold">
                            {hotel.day}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-800">{hotel.hotel}</h3>
                            <p className="text-gray-600">{hotel.location}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(hotel.star)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-white/80 rounded-xl p-4">
                        <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                          <Wifi className="w-5 h-5 text-green-600" />
                          สิ่งอำนวยความสะดวก
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {hotel.facilities?.map((facility: string, i: number) => (
                            <span key={i} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                              {facility}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing Section */}
              <div ref={pricingRef} className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 fade-in">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                  <CreditCard className="w-8 h-8 text-blue-600" />
                  ราคาและเงื่อนไข
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200">
                    <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      รวมในราคา
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        ตั๋วเครื่องบินไป-กลับ
                      </li>
                      <li className="flex items-center gap-2 text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        ที่พักตามที่ระบุ
                      </li>
                      <li className="flex items-center gap-2 text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        อาหารตามโปรแกรม
                      </li>
                      <li className="flex items-center gap-2 text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        รถรับส่งและไกด์
                      </li>
                      <li className="flex items-center gap-2 text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        ประกันการเดินทาง
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-br from-red-50 to-pink-50 p-6 rounded-2xl border border-red-200">
                    <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <X className="w-5 h-5 text-red-600" />
                      ไม่รวมในราคา
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-gray-700">
                        <X className="w-4 h-4 text-red-500" />
                        อาหารนอกโปรแกรม
                      </li>
                      <li className="flex items-center gap-2 text-gray-700">
                        <X className="w-4 h-4 text-red-500" />
                        ค่าใช้จ่ายส่วนตัว
                      </li>
                      <li className="flex items-center gap-2 text-gray-700">
                        <X className="w-4 h-4 text-red-500" />
                        ทิปไกด์และคนขับรถ
                      </li>
                      <li className="flex items-center gap-2 text-gray-700">
                        <X className="w-4 h-4 text-red-500" />
                        ค่าธรรมเนียมสนามบิน
                      </li>
                      <li className="flex items-center gap-2 text-gray-700">
                        <X className="w-4 h-4 text-red-500" />
                        กิจกรรมเสริม
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Reviews Section */}
              <div ref={reviewsRef} className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 fade-in">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                  <Star className="w-8 h-8 text-yellow-500" />
                  รีวิวจากลูกค้า
                </h2>
                
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-2xl border border-yellow-200 mb-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-yellow-600">{tour.rating}</div>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-5 h-5 ${i < Math.floor(tour.rating) ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-300 text-gray-300'}`} />
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-800">คะแนนเฉลี่ย</p>
                      <p className="text-gray-600">จาก {tour.reviews} รีวิว</p>
                    </div>
                  </div>
                </div>
                
                {/* Mock Reviews */}
                <div className="space-y-6">
                  {[
                    { name: 'คุณสมชาย', rating: 5, comment: 'ทัวร์ดีมาก ไกด์ใจดี อาหารอร่อย ที่พักสะอาด ราคาคุ้มค่า' },
                    { name: 'คุณสมหญิง', rating: 5, comment: 'ประสบการณ์ดีเยี่ยม ได้เห็นสถานที่สวยๆ มากมาย อยากไปอีก' },
                    { name: 'คุณสมศักดิ์', rating: 4, comment: 'ทัวร์สนุก อาหารดี แต่ที่พักคืนแรกเล็กไปหน่อย' }
                  ].map((review, index) => (
                    <div key={index} className="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-800">{review.name}</h4>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-300 text-gray-300'}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Booking Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20 fade-in">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">จองทัวร์</h3>
                  
                  {/* Price Display */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-2xl border border-blue-200 mb-6">
                    <p className="text-sm text-gray-600 mb-1">ราคาต่อคน</p>
                    <div className="flex items-baseline gap-2">
                      {tour.originalPrice && (
                        <span className="text-lg line-through text-gray-500">
                          ฿{tour.originalPrice.toLocaleString()}
                        </span>
                      )}
                      <span className="text-3xl font-bold text-blue-600">
                        ฿{tour.price.toLocaleString()}
                      </span>
                    </div>
                    {tour.originalPrice && (
                      <p className="text-sm text-green-600 font-semibold mt-1">
                        ประหยัด ฿{(tour.originalPrice - tour.price).toLocaleString()}
                      </p>
                    )}
                  </div>
                  
                  {/* Departure Dates */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3">วันที่เดินทาง</h4>
                    <div className="overflow-x-auto scrollbar-hide">
                      <div className="flex gap-2 w-max pb-2">
                        {allMonths.map(month => (
                          <button
                            key={month}
                            onClick={() => setSelectedMonth(month)}
                            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                              selectedMonth === month
                                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            {month}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2 mt-3">
                      {tour.departureDates?.[selectedMonth]?.slice(0, showAllDates ? undefined : 3).map((date: string, index: number) => (
                        <button
                          key={index}
                          onClick={() => setSelectedDate(date)}
                          className={`w-full p-3 rounded-xl text-left transition-all duration-200 ${
                            selectedDate === date
                              ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          <div className="font-semibold">{date}</div>
                          <div className="text-sm opacity-80">เหลือ {tour.availableSeats} ที่</div>
                        </button>
                      ))}
                    </div>
                    
                    {tour.departureDates?.[selectedMonth]?.length > 3 && (
                      <button
                        onClick={() => setShowAllDates(!showAllDates)}
                        className="w-full mt-2 text-blue-600 hover:text-blue-800 text-sm font-semibold"
                      >
                        {showAllDates ? 'แสดงน้อยลง' : `แสดงเพิ่มเติม (${tour.departureDates[selectedMonth].length - 3} วันที่)`}
                      </button>
                    )}
                  </div>
                  
                  {/* Travelers */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3">จำนวนผู้เดินทาง</h4>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setTravelers(Math.max(1, travelers - 1))}
                        className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                        aria-label="ลดจำนวนผู้เดินทาง"
                      >
                        <X className="w-5 h-5" />
                      </button>
                      <span className="text-2xl font-bold text-gray-800 min-w-[3rem] text-center">{travelers}</span>
                      <button
                        onClick={() => setTravelers(travelers + 1)}
                        className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                        aria-label="เพิ่มจำนวนผู้เดินทาง"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Total Price */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-2xl border border-green-200 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-800">ราคารวม</span>
                      <span className="text-2xl font-bold text-green-600">
                        ฿{(tour.price * travelers).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  
                  {/* Book Button */}
                  <button
                    onClick={() => setShowBookingModal(true)}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 transform hover:scale-105 shadow-xl"
                  >
                    จองทัวร์เลย
                  </button>
                  
                  {/* Contact Info */}
                  <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600 mb-2">มีคำถาม? ติดต่อเรา</p>
                    <div className="flex items-center justify-center gap-4">
                      <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors">
                        <Phone className="w-4 h-4" />
                        <span className="text-sm">โทร</span>
                      </button>
                      <button className="flex items-center gap-2 text-green-600 hover:text-green-800 transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-sm">แชท</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Modal */}
        {showBookingModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">จองทัวร์</h3>
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label="ปิด"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">วันที่เดินทาง</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">เลือกวันที่</option>
                    {tour.departureDates?.[selectedMonth]?.map((date: string, index: number) => (
                      <option key={index} value={date}>{date}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">จำนวนผู้เดินทาง</label>
                  <div className="flex items-center gap-4">
                    <button 
                      className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                      onClick={() => setTravelers(Math.max(1, travelers - 1))}
                    >
                      <X className="w-5 h-5" />
                    </button>
                    <span className="text-2xl font-bold text-gray-800 min-w-[3rem] text-center">{travelers}</span>
                    <button 
                      className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                      onClick={() => setTravelers(travelers + 1)}
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-2xl border border-green-200">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-800">ราคารวม</span>
                    <span className="text-2xl font-bold text-green-600">
                      ฿{(tour.price * travelers).toLocaleString()}
                    </span>
                  </div>
                </div>
                
                <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-300">
                  ดำเนินการจอง
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
} 