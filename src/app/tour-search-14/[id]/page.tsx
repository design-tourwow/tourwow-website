'use client'

import { useState, useEffect } from 'react'
import { 
  ArrowLeft, Star, Clock, Users, MapPin, Calendar, Share2, Heart, CheckCircle2, 
  Camera, Plane, Utensils, Car, Bed, Shield, ChevronDown, ChevronUp, MessageCircle,
  AlertCircle, Phone, MessageSquare, Check, X, Wifi, Coffee, Luggage, Globe,
  CreditCard, Award, TrendingUp, Info, Play, Hotel, Sparkles, Gift, 
  ThermometerSun, Shirt, HelpCircle, ChevronRight, Eye, Building2, DollarSign,
  ArrowRight, Plus, Minus, Zap, ShoppingCart, Flame, Timer, Crown, Percent,
  Bookmark, Navigation, Compass, Volume2, Headphones, Activity, Bell,
  ChevronsUp, ExternalLink, Download, TrendingDown, BarChart3, Target
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// Enhanced fallback data matching tour-search-14 theme
const fallbackTours = [
  // === FLASH SALE TOURS (2 random) ===
  {
    id: 1,
    title: 'ทัวร์ญี่ปุ่น โตเกียว สกายทรี 5 วัน 3 คืน',
    location: 'ญี่ปุ่น',
    duration: '5 วัน',
    days: 5,
    nights: 4,
    price: 29900,
    originalPrice: 59900,
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
    rating: 4.8,
    reviews: 234,
    highlights: 'สัมผัสความตื่นตาตื่นใจที่โตเกียวสกายทรี ชมวิวสุดอลังการจากความสูง 634 เมตร เยี่ยมชมวัดเซ็นโซจิอันศักดิ์สิทธิ์ในย่านอาซากุสะ',
    availableSeats: 3,
    totalTravelers: 1847,
    satisfaction: 96,
    lastBooking: '15 นาทีที่แล้ว',
    viewsToday: 47,
    currentViewers: 8,
    badges: ['ได้รับการรับรอง', 'ยอดนิยม', 'รีวิวดีเยี่ยม'],
    isVerified: true,
    gallery: [
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1542640244-7e672d6cef4e?w=800&h=600&fit=crop'
    ],
    saleType: 'flash',
    saleEndTime: new Date(Date.now() + 12 * 60 * 60 * 1000),
    soldPercentage: 78,
    dealTags: ['Flash 50% OFF', 'วันนี้เท่านั้น!'],
    specialOffers: ['ฟรี! WiFi Pocket', 'ฟรี! ประกันการเดินทาง', 'ฟรี! อาหารเช้าทุกวัน'],
    groupDiscount: 5,
    maxGroupSize: 10,
    uiStyle: 'premium',
    detailedDescription: 'เดินทางสู่ดินแดนแห่งซากุระกับทัวร์ญี่ปุ่นสุดพิเศษ ชมความสวยงามของโตเกียวสกายทรีจากความสูง 634 เมตร เยี่ยมชมวัดเซ็นโซจิอันศักดิ์สิทธิ์ในย่านอาซากุสะ และสัมผัสวัฒนธรรมญี่ปุ่นแท้ๆ ตั่งแต่การชิมอาหารในตลาดซึกิจิ ไปจนถึงการเดินชมสวนอิมพีเรียลแพลเลส',
    included: [
      'ตั้วเครื่องบินไป-กลับ',
      'ที่พักโรงแรม 4 ดาว',
      'อาหารเช้า ตามโปรแกรม',
      'รถโค้ชปรับอากาศ',
      'ค่าเข้าชมสถานที่ต่างๆ',
      'ไกด์ท้องถิ่น',
      'ประกันการเดินทาง'
    ],
    itinerary: [
      {
        day: 1,
        title: 'วันที่ 1: เดินทางสู่โตเกียว',
        activities: ['ออกเดินทางจากสนามบินสุวรรณภูมิ', 'เดินทางถึงโตเกียว', 'Check-in โรงแรม', 'เดินเล่นย่านชินจุกุ']
      },
      {
        day: 2,
        title: 'วันที่ 2: ชมโตเกียวสกายทรี',
        activities: ['ชมวิวจากโตเกียวสกายทรี', 'เยี่ยมชมวัดเซ็นโซจิ', 'ช้อปปิ้งที่ย่านอาซากุสะ', 'ล่องเรือแม่น้ำสุมิดะ']
      },
      {
        day: 3,
        title: 'วันที่ 3: วัฒนธรรมญี่ปุ่น',
        activities: ['เยี่ยมชมสวนอิมพีเรียลแพลเลส', 'ตลาดซึกิจิ', 'พิพิธภัณฑ์แห่งชาติ', 'ย่านฮาราจุกุ']
      },
      {
        day: 4,
        title: 'วันที่ 4: ช้อปปิ้งและอิสระ',
        activities: ['ย่านชิบุยะ', 'ศูนย์การค้าโอไดบะ', 'เวลาอิสระ', 'อาหารค่ำพิเศษ']
      },
      {
        day: 5,
        title: 'วันที่ 5: เดินทางกลับ',
        activities: ['ช้อปปิ้งของฝาก', 'เดินทางสู่สนามบิน', 'เดินทางกลับกรุงเทพฯ']
      }
    ]
  },
  {
    id: 7,
    title: 'ทัวร์ฝรั่งเศส ปารีส 6 วัน 4 คืน',
    location: 'ฝรั่งเศส',
    duration: '6 วัน',
    days: 6,
    nights: 4,
    price: 49900,
    originalPrice: 89900,
    image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop',
    rating: 4.8,
    reviews: 89,
    highlights: 'ชมหอไอเฟล พิพิธภัณฑ์ลูฟร์ และล่องเรือแม่น้ำแซน ในเมืองแห่งความรักและแสงไฟ',
    availableSeats: 2,
    totalTravelers: 234,
    satisfaction: 97,
    lastBooking: '3 นาทีที่แล้ว',
    viewsToday: 128,
    currentViewers: 23,
    badges: ['โรแมนติก', 'ศิลปะ', 'Flash Sale'],
    isVerified: true,
    gallery: [
      'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1431274172761-fca41d930114?w=800&h=600&fit=crop'
    ],
    saleType: 'flash',
    saleEndTime: new Date(Date.now() + 6 * 60 * 60 * 1000),
    soldPercentage: 92,
    dealTags: ['เหลือแค่ 2 ที่!', 'ลด 44%'],
    specialOffers: ['ฟรี! รถรับส่งสนามบิน', 'ฟรี! Dinner Cruise', 'ฟรี! พิพิธภัณฑ์ Louvre'],
    groupDiscount: 8,
    maxGroupSize: 12,
    uiStyle: 'elegant'
  },

  // === REGULAR TOURS WITH DIFFERENT UI STYLES ===
  {
    id: 2,
    title: 'ทัวร์ญี่ปุ่น โอซาก้า ปราสาท 4 วัน 3 คืน',
    location: 'ญี่ปุ่น',
    duration: '4 วัน',
    days: 4,
    nights: 3,
    price: 26900,
    image: 'https://images.unsplash.com/photo-1590559899731-a382839e5549?w=800&h=600&fit=crop',
    rating: 4.7,
    reviews: 189,
    highlights: 'เดินทางสู่ปราสาทโอซาก้าอันงดงาม สัญลักษณ์แห่งความยิ่งใหญ่ของเมืองโอซาก้า สำรวจวัดคิโยมิซุเดระในเกียวโต',
    availableSeats: 5,
    totalTravelers: 923,
    satisfaction: 97,
    lastBooking: '8 นาทีที่แล้ว',
    viewsToday: 52,
    currentViewers: 12,
    badges: ['สถาปัตยกรรม', 'วัฒนธรรม'],
    isVerified: true,
    gallery: [
      'https://images.unsplash.com/photo-1590559899731-a382839e5549?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&h=600&fit=crop'
    ],
    uiStyle: 'modern'
  }
]

// Use fallback tours
let toursData = fallbackTours

// Enhanced tour interface for tour-search-14
interface EnhancedTourData {
  id: number
  title: string
  location: string
  duration: string
  days: number
  nights: number
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  highlights: string
  availableSeats: number
  totalTravelers: number
  satisfaction: number
  lastBooking: string
  viewsToday: number
  currentViewers?: number
  badges: string[]
  isVerified: boolean
  gallery?: string[]
  saleType?: string
  saleEndTime?: Date
  soldPercentage?: number
  dealTags?: string[]
  specialOffers?: string[]
  groupDiscount?: number
  maxGroupSize?: number
  uiStyle?: string
  detailedDescription?: string
  included?: string[]
  itinerary?: Array<{
    day: number
    title: string
    activities: string[]
  }>

  // Additional fields for enhanced functionality
  airline?: string
  flightDetails?: {
    departure: string
    return: string
    baggageAllowance: string
  }
  hotels?: Array<{
    name: string
    rating: number
    location: string
    nights: number
    roomType: string
  }>
  meals?: {
    breakfast: number
    lunch: number
    dinner: number
    specialMeals: string[]
  }
  minGroupSize?: number
  bookingDeadline?: string
  excluded?: string[]
  requirements?: string[]
  cancellationPolicy?: string
  paymentOptions?: string[]
  destinations?: string[]
  groupSize?: string
  departureDate?: string
}

export default function TourDetailPage() {
  const params = useParams()
  const tourId = parseInt(params?.id as string)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isClient, setIsClient] = useState(false)
  const [timeLeft, setTimeLeft] = useState('')
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')
  const [guestCount, setGuestCount] = useState(2)
  const [activeTab, setActiveTab] = useState<'overview' | 'dates' | 'itinerary' | 'hotels' | 'reviews' | 'faq'>('overview')
  const [expandedDay, setExpandedDay] = useState<number | null>(null)
  const [showAllIncluded, setShowAllIncluded] = useState(false)
  const [showBookingModal, setShowBookingModal] = useState(false)

  // Find the tour by ID and enhance it with mock data
  const baseTour = toursData.find(t => t.id === tourId)
  
  // Enhanced tour data with mock additional fields
  const tour: EnhancedTourData | null = baseTour ? {
    ...baseTour,
    airline: 'Thai Airways',
    flightDetails: {
      departure: '09:00 AM',
      return: '06:00 PM', 
      baggageAllowance: '30kg'
    },
    hotels: [
      { name: 'Grand Hotel', rating: 4, location: 'City Center', nights: 3, roomType: 'Superior Room' },
      { name: 'Beach Resort', rating: 5, location: 'Beachfront', nights: 2, roomType: 'Ocean View' }
    ],
    meals: {
      breakfast: baseTour.days - 1,
      lunch: Math.floor(baseTour.days / 2),
      dinner: Math.floor(baseTour.days / 2),
      specialMeals: ['Welcome Dinner', 'Local Cuisine Experience']
    },
    minGroupSize: 10,
    bookingDeadline: '7 วันก่อนเดินทาง',
    excluded: ['ค่าวีซ่า', 'ประกันเพิ่มเติม', 'ค่าใช้จ่ายส่วนตัว'],
    requirements: ['หนังสือเดินทางอายุไม่เกิน 6 เดือน', 'วีซ่าถ้าจำเป็น'],
    cancellationPolicy: 'ยกเลิกฟรี 14 วันก่อนเดินทาง',
    paymentOptions: ['บัตรเครดิต', 'โอนธนาคาร', 'ผ่อนชำระ 0%'],
    destinations: [baseTour.location, 'จุดหมายหลัก', 'สถานที่น่าสนใจ'],
    groupSize: '10-25 คน',
    departureDate: '2025-01-15'
  } : null

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Countdown timer for flash sales - only run on client
  useEffect(() => {
    if (!isClient || !tour?.saleEndTime) return
    
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const endTime = new Date(tour.saleEndTime).getTime()
      const difference = endTime - now
      
      if (difference > 0) {
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)
        setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`)
      } else {
        setTimeLeft('หมดเวลา')
      }
    }, 1000)
    
    return () => clearInterval(timer)
  }, [isClient, tour?.saleEndTime])

  // Mock departure dates
  const departureDates = [
    { date: '15 ม.ค. 2025', available: 8, price: tour?.price || 0 },
    { date: '22 ม.ค. 2025', available: 12, price: tour?.price || 0 },
    { date: '29 ม.ค. 2025', available: 3, price: (tour?.price || 0) + 2000 },
  ]

  const savings = tour?.originalPrice ? tour.originalPrice - tour.price : 0

  if (!tour) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
            <AlertCircle className="w-10 h-10 text-gray-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-4">ไม่พบข้อมูลทัวร์</h1>
          <p className="text-slate-600 mb-6">ขออภัย ไม่สามารถค้นหาทัวร์ที่คุณต้องการได้</p>
          <Link 
            href="/tour-search-14"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <ArrowLeft className="w-4 h-4" />
            กลับไปหน้าค้นหา
          </Link>
        </div>
      </div>
    )
  }

  const discount = tour.originalPrice ? Math.round(((tour.originalPrice - tour.price) / tour.originalPrice) * 100) : 0

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile-First Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <Link 
              href="/tour-search-14"
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-all duration-300"
            >
              <div className="p-2 hover:bg-gray-100 rounded-full">
                <ArrowLeft className="w-4 h-4" />
              </div>
              <span className="hidden sm:block font-medium">กลับไปค้นหา</span>
            </Link>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="p-2 hover:bg-gray-100 rounded-full transition-all duration-300"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'text-red-500 fill-red-500' : 'text-gray-600'}`} />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-all duration-300">
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-all duration-300">
                <Bookmark className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Main Content */}
      <div className="px-4 py-6 space-y-6">
        {/* Tablet & Desktop Layout */}
        <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Left Column - Tour Details (Desktop: 8 cols, Mobile: full width) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Hero Image Gallery */}
            <div className="relative -mx-4 sm:mx-0">
            <div className="relative h-64 sm:h-80 md:h-96 lg:h-[32rem] sm:rounded-2xl overflow-hidden">
              <Image
                src={tour.gallery?.[selectedImageIndex] || tour.image}
                alt={tour.title}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

              {/* Mobile Sale Badge */}
              {tour.saleType && (
                <div className="absolute top-4 left-4">
                  {tour.saleType === 'flash' && (
                    <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-2 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-2xl border border-white/20">
                      <Flame className="w-4 h-4 animate-pulse" />
                      <span>FLASH</span>
                      {timeLeft && isClient && (
                        <div className="bg-white/20 px-2 py-1 rounded-lg font-mono text-xs">
                          {timeLeft}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Mobile Quick Actions Overlay */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button className="p-2 bg-black/30 backdrop-blur-sm text-white rounded-full">
                  <Camera className="w-4 h-4" />
                </button>
                <button className="p-2 bg-black/30 backdrop-blur-sm text-white rounded-full">
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              {/* Mobile Tour Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-white/80" />
                  <span className="text-white/90 font-medium text-sm">{tour.location}</span>
                  {tour.isVerified && (
                    <Shield className="w-4 h-4 text-green-400" />
                  )}
                </div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight">{tour.title}</h1>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-orange-500 text-orange-500" />
                    <span className="font-semibold text-sm">{tour.rating}</span>
                    <span className="text-white/70 text-sm">({tour.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-white/70">
                    <Users className="w-4 h-4" />
                    <span>{tour.totalTravelers?.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Thumbnail Gallery */}
            {tour.gallery && tour.gallery.length > 1 && (
              <div className="flex gap-2 mt-3 px-4 sm:px-0 overflow-x-auto scrollbar-hide">
                {tour.gallery.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index ? 'border-white shadow-lg scale-105' : 'border-white/30'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${tour.title} ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

            {/* Tour Info Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              {/* Price Section - Hide on desktop (moved to sidebar) */}
              <div className="mb-6 lg:hidden">
                {tour.originalPrice && (
                  <div className="flex items-center gap-3 mb-2">
                    <p className="text-lg text-slate-400 line-through">
                      ฿{tour.originalPrice.toLocaleString()}
                    </p>
                    <span className="px-3 py-1 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full text-sm font-bold animate-pulse">
                      -{discount}%
                    </span>
                  </div>
                )}
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                      ฿{tour.price.toLocaleString()}
                    </p>
                    <p className="text-slate-600 text-sm">ต่อคน รวมทุกอย่าง</p>
                  </div>
                  {tour.originalPrice && (
                    <div className="text-right">
                      <p className="text-green-600 font-bold text-lg">
                        ประหยัด
                      </p>
                      <p className="text-green-700 font-bold">
                        ฿{(tour.originalPrice - tour.price).toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Trust Signals */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              <div className="bg-white border border-gray-200 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Star className="w-4 h-4 fill-orange-500 text-orange-500" />
                  <span className="font-bold text-slate-800">{tour.rating}</span>
                </div>
                <p className="text-xs text-slate-600">{tour.reviews} รีวิว</p>
              </div>
                <div className="bg-white border border-gray-200 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Shield className="w-4 h-4 text-gray-600" />
                    <span className="font-bold text-slate-800">รับรอง</span>
                  </div>
                  <p className="text-xs text-green-700">ได้มาตรฐาน</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-3 hidden md:block">
                  <div className="flex items-center gap-2 mb-1">
                    <Award className="w-4 h-4 text-gray-600" />
                    <span className="font-bold text-slate-800">{tour.satisfaction}%</span>
                  </div>
                  <p className="text-xs text-blue-700">ความพอใจ</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-3 hidden md:block">
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="w-4 h-4 text-gray-600" />
                    <span className="font-bold text-slate-800">{tour.totalTravelers?.toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-purple-700">คนไปแล้ว</p>
                </div>
              </div>

              {/* Key Stats - Only show on mobile/tablet */}
              <div className="grid grid-cols-3 gap-2 mb-6 lg:hidden">
              <div className="text-center p-3 bg-gray-50 border border-gray-200 rounded-xl">
                <Calendar className="w-5 h-5 text-gray-600 mx-auto mb-1" />
                <p className="font-bold text-slate-800 text-sm">{tour.duration}</p>
                <p className="text-xs text-slate-600">{tour.days}วัน {tour.nights}คืน</p>
              </div>
              <div className="text-center p-3 bg-gray-50 border border-gray-200 rounded-xl">
                <Users className="w-5 h-5 text-gray-600 mx-auto mb-1" />
                <p className="font-bold text-slate-800 text-sm">{tour.totalTravelers?.toLocaleString()}</p>
                <p className="text-xs text-slate-600">คนไปแล้ว</p>
              </div>
                <div className="text-center p-3 bg-gray-50 border border-gray-200 rounded-xl">
                  <Clock className="w-5 h-5 text-orange-600 mx-auto mb-1" />
                  <p className="font-bold text-slate-800 text-sm">{tour.availableSeats}</p>
                  <p className="text-xs text-slate-600">ที่เหลือ</p>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h2 className="text-lg lg:text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <Info className="w-5 h-5 text-gray-700" />
                  รายละเอียดทัวร์
                </h2>
                <div className="bg-gray-50 rounded-xl p-4 lg:p-6">
                  <p className="text-slate-700 leading-relaxed text-sm lg:text-base">
                    {tour.detailedDescription || tour.highlights}
                  </p>
                </div>
              </div>

              {/* Special Offers */}
              {tour.specialOffers && tour.specialOffers.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-lg lg:text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                    <Gift className="w-5 h-5 text-orange-600" />
                    สิทธิพิเศษ
                  </h2>
                  <div className="bg-gray-50 rounded-xl p-4 lg:p-6">
                    <div className="space-y-2">
                      {tour.specialOffers.map((offer, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 mt-2"></div>
                          <span className="text-slate-700 text-sm lg:text-base font-medium">{offer}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Included Services */}
              {tour.included && tour.included.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-lg lg:text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-gray-700" />
                    รวมในราคา
                  </h2>
                  <div className="space-y-2">
                    {tour.included.slice(0, showAllIncluded ? tour.included.length : 4).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 lg:p-4 bg-gray-50 rounded-lg">
                        <CheckCircle2 className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700 text-sm lg:text-base">{item}</span>
                      </div>
                    ))}
                    {tour.included.length > 4 && (
                      <button 
                        onClick={() => setShowAllIncluded(!showAllIncluded)}
                        className="w-full py-2 text-gray-600 font-medium text-sm lg:text-base hover:text-gray-900 transition-colors"
                      >
                        {showAllIncluded ? 'ดูน้อยลง' : `ดูเพิ่มเติม (${tour.included.length - 4} รายการ)`}
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Itinerary */}
              {tour.itinerary && tour.itinerary.length > 0 && (
                <div>
                  <h2 className="text-lg lg:text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                    <Navigation className="w-5 h-5 text-gray-700" />
                    รายละเอียดการเดินทาง
                  </h2>
                  <div className="space-y-3">
                    {tour.itinerary.map((day, idx) => (
                      <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
                        <button
                          onClick={() => setExpandedDay(expandedDay === idx ? null : idx)}
                          className="w-full p-4 lg:p-5 bg-gray-50 hover:bg-gray-100 transition-all duration-300 flex items-center justify-between"
                        >
                          <h3 className="font-bold text-slate-800 text-left text-sm lg:text-base">{day.title}</h3>
                          {expandedDay === idx ? (
                            <ChevronUp className="w-5 h-5 text-gray-600" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-600" />
                          )}
                        </button>
                        {expandedDay === idx && (
                          <div className="p-4 lg:p-5 bg-white space-y-2">
                            {day.activities.map((activity, actIdx) => (
                              <div key={actIdx} className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-gray-400 rounded-full flex-shrink-0 mt-2"></div>
                                <span className="text-sm lg:text-base text-slate-600">{activity}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>
        </div>

        {/* Right Sidebar - Booking (Desktop: 4 cols, Hidden on mobile) */}
        <div className="lg:col-span-4 hidden lg:block">
          <div className="sticky top-24 space-y-6">
            {/* Desktop Booking Card */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200">
              {/* Price Section */}
              <div className="mb-8">
                {tour.originalPrice && (
                  <div className="flex items-center gap-3 mb-3">
                    <p className="text-xl text-slate-400 line-through">
                      ฿{tour.originalPrice.toLocaleString()}
                    </p>
                    <span className="px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full text-sm font-bold animate-pulse">
                      -{discount}%
                    </span>
                  </div>
                )}
                <div className="mb-4">
                  <p className="text-5xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    ฿{tour.price.toLocaleString()}
                  </p>
                  <p className="text-slate-600 text-lg mt-1">ต่อคน รวมทุกอย่าง</p>
                </div>
                {tour.originalPrice && (
                  <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-xl">
                    <span className="text-green-700 font-semibold">คุณประหยัดได้</span>
                    <span className="text-green-700 font-bold text-xl">
                      ฿{(tour.originalPrice - tour.price).toLocaleString()}
                    </span>
                  </div>
                )}
              </div>

              {/* Desktop Key Stats */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="text-center p-4 bg-gray-50 border border-gray-200 rounded-xl">
                  <Calendar className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                  <p className="font-bold text-slate-800">{tour.duration}</p>
                  <p className="text-xs text-slate-600">{tour.days}วัน {tour.nights}คืน</p>
                </div>
                <div className="text-center p-4 bg-gray-50 border border-gray-200 rounded-xl">
                  <Users className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                  <p className="font-bold text-slate-800">{tour.totalTravelers?.toLocaleString()}</p>
                  <p className="text-xs text-slate-600">คนไปแล้ว</p>
                </div>
                <div className="text-center p-4 bg-gray-50 border border-gray-200 rounded-xl">
                  <Clock className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                  <p className="font-bold text-slate-800">{tour.availableSeats}</p>
                  <p className="text-xs text-slate-600">ที่เหลือ</p>
                </div>
              </div>

              {/* Desktop Sale Progress */}
              {tour.soldPercentage && (
                <div className="mb-6">
                  <div className="flex items-center justify-between text-sm mb-3">
                    <span className="text-orange-600 font-bold text-base">จองแล้ว {tour.soldPercentage}%</span>
                    <span className="text-slate-600">เหลือ {tour.availableSeats} ที่นั่ง</span>
                  </div>
                  <div className="h-4 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-1000"
                      style={{ width: `${tour.soldPercentage}%` }}
                    />
                  </div>
                  <p className="text-sm text-slate-500 mt-2">ความนิยมสูงมาก</p>
                </div>
              )}

              {/* Desktop CTA Button */}
              <button className={`w-full flex items-center justify-center gap-3 py-5 px-6 ${
                tour.saleType === 'flash' 
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600' 
                  : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
              } text-white rounded-2xl font-bold text-xl transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 ${
                tour.saleType === 'flash' ? 'animate-pulse [animation-duration:3s]' : ''
              }`}>
                {tour.saleType === 'flash' ? (
                  <>
                    <Flame className="w-7 h-7" />
                    <span>จองด่วน FLASH SALE</span>
                    <Timer className="w-7 h-7" />
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-7 h-7" />
                    <span>จองทัวร์เลย</span>
                    <ArrowRight className="w-7 h-7" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-6 mt-6 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>ปลอดภัย 100%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  <span>รับประกันคุณภาพ</span>
                </div>
              </div>
            </div>

            {/* Desktop Trust Signals Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
              <h3 className="font-bold text-slate-800 text-lg mb-4">ทำไมต้องเลือกเรา</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">ได้รับการรับรอง</p>
                    <p className="text-sm text-slate-600">มีใบอนุญาตและมาตรฐาน</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Award className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">ความพึงพอใจ {tour.satisfaction}%</p>
                    <p className="text-sm text-slate-600">จากลูกค้าที่เดินทางแล้ว</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">ลูกค้ากว่า {tour.totalTravelers?.toLocaleString()} คน</p>
                    <p className="text-sm text-slate-600">ไว้วางใจให้เราดูแล</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Group Discount */}
            {tour.groupDiscount && tour.maxGroupSize && (
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-purple-800">ส่วนลดกลุ่ม</h3>
                    <p className="text-sm text-purple-700">ประหยัดมากขึ้นเมื่อไปด้วยกัน</p>
                  </div>
                </div>
                <div className="bg-white/50 rounded-xl p-4">
                  <p className="text-purple-800 font-bold text-lg text-center">
                    ลด {tour.groupDiscount}% เมื่อจอง {tour.maxGroupSize} คนขึ้นไป
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Urgency Indicators - Only show on mobile */}
        <div className="space-y-3 lg:hidden">
            {tour.availableSeats && tour.availableSeats <= 5 && (
              <div className="flex items-center gap-3 px-4 py-3 bg-red-50 border border-red-200 rounded-xl">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <div>
                  <p className="text-red-700 font-bold text-sm">
                    🔥 เหลือเพียง {tour.availableSeats} ที่นั่ง!
                  </p>
                  <p className="text-red-600 text-xs">รีบจองก่อนหมด</p>
                </div>
              </div>
            )}
            
            {tour.currentViewers && tour.currentViewers > 0 && (
              <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <div>
                  <p className="text-gray-700 font-semibold text-sm">
                    👥 {tour.currentViewers} คนกำลังดู
                  </p>
                  <p className="text-gray-600 text-xs">ความนิยมสูง</p>
                </div>
              </div>
            )}

            {tour.lastBooking && (
              <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl">
                <Clock className="w-4 h-4 text-gray-600" />
                <div>
                  <p className="text-gray-700 font-semibold text-sm">
                    ✅ จองล่าสุด: {tour.lastBooking}
                  </p>
                  <p className="text-gray-600 text-xs">มีคนจองต่อเนื่อง</p>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Group Discount */}
          {tour.groupDiscount && tour.maxGroupSize && (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-purple-600" />
                <span className="font-bold text-gray-700">ส่วนลดกลุ่ม</span>
              </div>
              <p className="text-gray-700 text-sm">
                ลด {tour.groupDiscount}% เมื่อจอง {tour.maxGroupSize} คนขึ้นไป
              </p>
              <button className="mt-2 text-gray-600 text-xs font-semibold underline">
                ดูรายละเอียด
              </button>
            </div>
          )}

          {/* Mobile Sale Progress */}
          {tour.soldPercentage && (
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-orange-600 font-bold">จองแล้ว {tour.soldPercentage}%</span>
                <span className="text-slate-600">เหลือ {tour.availableSeats} ที่</span>
              </div>
              <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-1000"
                  style={{ width: `${tour.soldPercentage}%` }}
                />
              </div>
              <p className="text-xs text-slate-500 mt-1">ความนิยมสูง</p>
            </div>
          )}

          {/* Mobile CTA Button */}
          <div className="sticky bottom-0 -mx-4 p-4 bg-white border-t border-gray-200 md:static md:mx-0 md:bg-transparent md:border-0 lg:hidden">
            <button className={`w-full flex items-center justify-center gap-3 py-4 ${
              tour.saleType === 'flash' 
                ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600' 
                : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
            } text-white rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform active:scale-95 ${
              tour.saleType === 'flash' ? 'animate-pulse [animation-duration:3s]' : ''
            }`}>
              {tour.saleType === 'flash' ? (
                <>
                  <Flame className="w-6 h-6" />
                  <span>จองด่วน FLASH SALE</span>
                  <Timer className="w-6 h-6" />
                </>
              ) : (
                <>
                  <ShoppingCart className="w-6 h-6" />
                  <span>จองทัวร์เลย</span>
                  <ArrowRight className="w-6 h-6" />
                </>
              )}
            </button>
            
            <div className="flex items-center justify-center gap-4 mt-3 text-xs text-slate-500">
              <div className="flex items-center gap-1">
                <Shield className="w-3 h-3" />
                <span>ปลอดภัย 100%</span>
              </div>
              <div className="flex items-center gap-1">
                <Award className="w-3 h-3" />
                <span>รับประกันคุณภาพ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}