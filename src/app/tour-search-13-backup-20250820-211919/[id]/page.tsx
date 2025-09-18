'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { 
  ArrowLeft, Star, Clock, Users, MapPin, Calendar, Share2, Heart, CheckCircle2, 
  Camera, Plane, Utensils, Car, Bed, Shield, ChevronDown, ChevronUp, MessageCircle,
  AlertCircle, Phone, MessageSquare, Check, X, Wifi, Coffee, Luggage, Globe,
  CreditCard, Award, TrendingUp, Info, Play, Hotel, Sparkles, Gift, 
  ThermometerSun, Shirt, HelpCircle, ChevronRight, Eye, Building2, DollarSign,
  ArrowRight, Plus, Minus
} from 'lucide-react'
import Image from 'next/image'
import { allTours } from '@/data/tours-data'

interface Tour {
  id: number
  title: string
  image: string
  price: number
  originalPrice?: number
  duration: string
  rating: number
  reviews: number
  highlights: string[]
  destinations: string[]
  discount?: number
  groupSize: string
  departureDate: string
}

// Enhanced mock data for demonstration
interface EnhancedTourData extends Tour {
  // Flight Information
  airline: string
  flightDetails: {
    departure: string
    return: string
    baggageAllowance: string
  }
  
  // Hotel Information
  hotels: Array<{
    name: string
    rating: number
    location: string
    nights: number
    roomType: string
  }>
  
  // Meal Information
  meals: {
    breakfast: number
    lunch: number
    dinner: number
    specialMeals: string[]
  }
  
  // Booking Information
  availableSeats: number
  minGroupSize: number
  maxGroupSize: number
  bookingDeadline: string
  
  // Additional Info
  included: string[]
  excluded: string[]
  requirements: string[]
  cancellationPolicy: string
  paymentOptions: string[]
  
  // Trust Signals
  totalTravelers: number
  satisfaction: number
  badges: string[]
  lastBooking: string
  viewsToday: number
}

export default function EnhancedTourDetail() {
  const params = useParams()
  const router = useRouter()
  const [tour, setTour] = useState<EnhancedTourData | null>(null)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedDate, setSelectedDate] = useState('')
  const [guestCount, setGuestCount] = useState(2)
  const [activeTab, setActiveTab] = useState<'overview' | 'dates' | 'itinerary' | 'hotels' | 'reviews' | 'faq'>('overview')
  const [expandedDay, setExpandedDay] = useState<number | null>(null)
  const [showAllIncluded, setShowAllIncluded] = useState(false)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [showUrgency, setShowUrgency] = useState(true)
  const [showAllDates, setShowAllDates] = useState(false)
  const [bookingStep, setBookingStep] = useState(1)
  const [isFromDatesTab, setIsFromDatesTab] = useState(false)
  const [showChangePeriod, setShowChangePeriod] = useState(false)
  const [bookingForm, setBookingForm] = useState({
    // Step 1 - Tour Details (already handled by existing states)
    
    // Step 2 - Customer Information
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    
    // Traveler Information
    travelers: [{ name: '', passportNumber: '', birthDate: '' }],
    
    // Payment
    paymentMethod: 'full', // 'full' or 'deposit'
    paymentType: 'bank_transfer', // 'bank_transfer', 'credit_card', 'qr_code'
    
    // Terms
    acceptTerms: false,
    acceptPrivacy: false
  })

  useEffect(() => {
    const tourId = parseInt(params.id as string)
    const foundTour = allTours.find(t => t.id === tourId)
    
    if (foundTour) {
      // Generate hotel data based on tour destinations
      const generateHotelsForTour = (tour: Tour) => {
        const destinations = tour.destinations
        const totalNights = parseInt(tour.duration.split(' ')[0]) - 1 // minus travel days
        const nightsPerCity = Math.ceil(totalNights / destinations.length)
        
        return destinations.map((destination, idx) => ({
          name: `${destination} ${['Grand Hotel', 'Palace Inn', 'Garden Resort', 'Central Hotel'][idx % 4]}`,
          rating: 4 + (tour.rating > 4.5 ? 1 : 0), // 4-5 stars based on tour rating
          location: destination,
          nights: idx === 0 ? nightsPerCity + (totalNights % destinations.length) : nightsPerCity,
          roomType: ['Superior Room', 'Deluxe Room', 'Standard Room', 'Premium Room'][idx % 4]
        }))
      }

      // Enhance tour data with additional mock information
      const enhancedTour: EnhancedTourData = {
        ...foundTour,
        airline: foundTour.destinations[0]?.includes('ญี่ปุ่น') || foundTour.title.includes('ญี่ปุ่น') ? 'Thai Airways' :
                 foundTour.destinations[0]?.includes('เกาหลี') || foundTour.title.includes('เกาหลี') ? 'Korean Air' :
                 foundTour.destinations[0]?.includes('ยุโรป') || foundTour.title.includes('ยุโรป') ? 'Thai Airways' :
                 'Thai Airways',
        flightDetails: {
          departure: foundTour.title.includes('ญี่ปุ่น') ? 'TG640 BKK 09:30 - NRT 17:40' :
                    foundTour.title.includes('เกาหลี') ? 'KE658 BKK 23:55 - ICN 07:05+1' :
                    'TG920 BKK 10:30 - CDG 17:35',
          return: foundTour.title.includes('ญี่ปุ่น') ? 'TG677 NRT 22:00 - BKK 03:20+1' :
                 foundTour.title.includes('เกาหลี') ? 'KE657 ICN 09:20 - BKK 13:25' :
                 'TG921 CDG 20:10 - BKK 13:45+1',
          baggageAllowance: '30 kg'
        },
        hotels: generateHotelsForTour(foundTour),
        meals: {
          breakfast: parseInt(foundTour.duration.split(' ')[0]) - 1, // all days except first
          lunch: parseInt(foundTour.duration.split(' ')[0]) - 2, // all days except first and last
          dinner: parseInt(foundTour.duration.split(' ')[0]) - 2, // all days except first and last
          specialMeals: foundTour.title.includes('ญี่ปุ่น') ? ['ชาบู ชาบู', 'ซูชิ', 'ราเมน', 'ปิ้งย่าง BBQ'] :
                       foundTour.title.includes('เกาหลี') ? ['Korean BBQ', 'บิบิมบับ', 'กิมจิ', 'ปุลโกกิ'] :
                       foundTour.title.includes('ยุโรป') ? ['สเต็กฝรั่งเศส', 'พิซซ่าอิตาเลียน', 'ไวน์ดินเนอร์', 'ขนมปังเยอรมัน'] :
                       ['อาหารท้องถิ่น', 'อาหารนานาชาติ', 'อาหารพิเศษ', 'อาหารชาววัง']
        },
        availableSeats: Math.floor(Math.random() * 5) + 3,
        minGroupSize: 2,
        maxGroupSize: 15,
        bookingDeadline: '7 วันก่อนเดินทาง',
        included: [
          'ตั๋วเครื่องบินไป-กลับ ชั้นประหยัด',
          'ภาษีสนามบินและภาษีน้ำมัน',
          'ที่พักโรงแรม 4 ดาว (พัก 2 ท่านต่อห้อง)',
          'อาหารตามที่ระบุในโปรแกรม',
          'รถโค้ชปรับอากาศตลอดการเดินทาง',
          'ค่าเข้าชมสถานที่ท่องเที่ยวตามโปรแกรม',
          'ไกด์ท้องถิ่นและหัวหน้าทัวร์ไทย',
          'ประกันการเดินทาง วงเงิน 1,000,000 บาท',
          'น้ำดื่มวันละ 2 ขวด',
          'Wi-Fi บนรถตลอดการเดินทาง'
        ],
        excluded: [
          'ค่าทิปไกด์และคนขับรถ 1,500 บาท/ท่าน',
          'ค่าใช้จ่ายส่วนตัว',
          'ค่าน้ำหนักกระเป๋าเกิน 30 กก.',
          'ค่าทำหนังสือเดินทาง',
          'ภาษีมูลค่าเพิ่ม 7% และภาษีหัก ณ ที่จ่าย 3%'
        ],
        requirements: [
          'หนังสือเดินทางต้องมีอายุเหลือไม่น้อยกว่า 6 เดือน',
          'สำเนาบัตรประชาชน',
          'รูปถ่าย 2 นิ้ว จำนวน 2 รูป (ถ้าต้องการทำวีซ่า)'
        ],
        cancellationPolicy: 'ยกเลิกก่อน 30 วัน คืนเต็มจำนวน | 15-29 วัน หัก 50% | น้อยกว่า 15 วัน ไม่คืนเงิน',
        paymentOptions: ['ชำระเต็มจำนวน', 'มัดจำ 50%', 'ผ่อน 0% 3 เดือน', 'QR Payment'],
        totalTravelers: 2847,
        satisfaction: 98,
        badges: ['Best Seller', 'Recommended', 'Flash Sale'],
        lastBooking: '2 ชั่วโมงที่แล้ว',
        viewsToday: 156
      }
      
      setTour(enhancedTour)
      
      // Check wishlist
      const wishlist = JSON.parse(localStorage.getItem('tourwow-wishlist') || '[]')
      setIsWishlisted(wishlist.includes(tourId))
    }
  }, [params.id])

  const toggleWishlist = () => {
    if (!tour) return
    
    const wishlist = JSON.parse(localStorage.getItem('tourwow-wishlist') || '[]')
    const newWishlist = wishlist.includes(tour.id) 
      ? wishlist.filter((id: number) => id !== tour.id)
      : [...wishlist, tour.id]
    
    localStorage.setItem('tourwow-wishlist', JSON.stringify(newWishlist))
    setIsWishlisted(!isWishlisted)
  }

  if (!tour) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">กำลังโหลดข้อมูลทัวร์...</p>
        </div>
      </div>
    )
  }

  const galleryImages = [
    tour.image,
    'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1569163139394-de4798e9a8c0?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600&h=400&fit=crop'
  ]

  // Sample departure dates - organized by month
  const allDepartureDates = [
    // มีนาคม 2568
    { date: '15 - 18 มี.ค. 2568', dateShort: '15 มี.ค. 2568', available: 8, price: tour.price, month: 'มีนาคม 2568' },
    { date: '22 - 25 มี.ค. 2568', dateShort: '22 มี.ค. 2568', available: 3, price: tour.price + 2000, month: 'มีนาคม 2568' },
    { date: '29 มี.ค. - 2 เม.ย. 2568', dateShort: '29 มี.ค. 2568', available: 12, price: tour.price, month: 'มีนาคม 2568' },
    
    // เมษายน 2568
    { date: '5 - 8 เม.ย. 2568', dateShort: '5 เม.ย. 2568', available: 0, price: tour.price + 5000, month: 'เมษายน 2568' },
    { date: '12 - 15 เม.ย. 2568', dateShort: '12 เม.ย. 2568', available: 15, price: tour.price + 3000, month: 'เมษายน 2568' },
    { date: '19 - 22 เม.ย. 2568', dateShort: '19 เม.ย. 2568', available: 6, price: tour.price + 4000, month: 'เมษายน 2568' },
    { date: '26 - 29 เม.ย. 2568', dateShort: '26 เม.ย. 2568', available: 4, price: tour.price + 6000, month: 'เมษายน 2568' },
    
    // พฤษภาคม 2568
    { date: '3 - 6 พ.ค. 2568', dateShort: '3 พ.ค. 2568', available: 20, price: tour.price, month: 'พฤษภาคม 2568' },
    { date: '10 - 13 พ.ค. 2568', dateShort: '10 พ.ค. 2568', available: 8, price: tour.price + 1000, month: 'พฤษภาคม 2568' },
    { date: '17 - 20 พ.ค. 2568', dateShort: '17 พ.ค. 2568', available: 2, price: tour.price + 7000, month: 'พฤษภาคม 2568' },
    { date: '24 - 27 พ.ค. 2568', dateShort: '24 พ.ค. 2568', available: 25, price: tour.price - 1000, month: 'พฤษภาคม 2568' },
    
    // มิถุนายน 2568
    { date: '7 - 10 มิ.ย. 2568', dateShort: '7 มิ.ย. 2568', available: 18, price: tour.price + 8000, month: 'มิถุนายน 2568' },
    { date: '14 - 17 มิ.ย. 2568', dateShort: '14 มิ.ย. 2568', available: 5, price: tour.price + 9000, month: 'มิถุนายน 2568' },
    { date: '21 - 24 มิ.ย. 2568', dateShort: '21 มิ.ย. 2568', available: 12, price: tour.price + 5000, month: 'มิถุนายน 2568' },
    { date: '28 มิ.ย. - 1 ก.ค. 2568', dateShort: '28 มิ.ย. 2568', available: 9, price: tour.price + 3000, month: 'มิถุนายน 2568' }
  ]

  // Quick select dates for overview tab
  const departureDates = allDepartureDates.slice(0, 3).map(d => ({
    date: d.dateShort,
    available: d.available,
    price: d.price
  }))

  // Calculate total price and savings with real-time updates
  const selectedDateData = allDepartureDates.find(d => d.dateShort === selectedDate)
  const selectedDatePrice = selectedDateData?.price || tour.price
  const basePrice = tour.price * guestCount
  const actualPrice = selectedDatePrice * guestCount
  const savings = Math.max(0, basePrice - actualPrice)
  const totalPrice = actualPrice

  // Group dates by month
  const datesByMonth = allDepartureDates.reduce((acc, date) => {
    if (!acc[date.month]) {
      acc[date.month] = []
    }
    acc[date.month].push(date)
    return acc
  }, {} as Record<string, typeof allDepartureDates>)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Mobile-First Styles */}
      <style jsx>{`
        @media (max-width: 640px) {
          .active\\:scale-98:active {
            transform: scale(0.98);
          }
          .touch-manipulation {
            touch-action: manipulation;
          }
          /* iOS Safari specific fixes */
          button {
            -webkit-tap-highlight-color: transparent;
          }
        }
      `}</style>
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          
          <div className="flex items-center gap-1">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Share2 className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={toggleWishlist}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Phone className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
      </div>

      {/* Urgency Banner */}
      {showUrgency && tour.availableSeats <= 5 && (
        <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 animate-pulse" />
              <span className="text-sm font-medium">
                เหลือเพียง {tour.availableSeats} ที่นั่ง! มี {tour.viewsToday} คนกำลังดูทัวร์นี้
              </span>
            </div>
            <button onClick={() => setShowUrgency(false)} className="text-white/80">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Hero Gallery Section */}
      <div className="relative">
        <div className="aspect-[16/10] relative overflow-hidden bg-gray-200">
          <Image
            src={galleryImages[selectedImage]}
            alt={tour.title}
            fill
            className="object-cover"
            priority
          />
          
          {/* Video Play Button (if first image) */}
          {selectedImage === 0 && (
            <button className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors">
              <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-xl">
                <Play className="w-8 h-8 text-blue-600 ml-1" />
              </div>
            </button>
          )}
          
          {/* Trust Badges Overlay */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {tour.badges.map((badge, idx) => (
              <div key={idx} className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm
                ${badge === 'Best Seller' ? 'bg-blue-600/90 text-white' :
                  badge === 'Recommended' ? 'bg-blue-500/90 text-white' :
                  'bg-blue-700/90 text-white'}`}>
                {badge === 'Best Seller' && '🔥'} {badge}
              </div>
            ))}
          </div>
          
          {/* Gallery Counter */}
          <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
            <Camera className="w-4 h-4 inline mr-1" />
            {selectedImage + 1}/{galleryImages.length}
          </div>
        </div>
        
        {/* Thumbnail Strip */}
        <div className="flex gap-1 p-2 bg-white overflow-x-auto scrollbar-hide">
          {galleryImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(idx)}
              className={`flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all
                ${selectedImage === idx ? 'border-blue-500 scale-105' : 'border-gray-200'}`}
            >
              <Image src={img} alt="" width={80} height={56} className="object-cover w-full h-full" />
            </button>
          ))}
        </div>
      </div>

      {/* Title & Quick Info Section */}
      <div className="bg-white p-4 border-b border-gray-100">
        <h1 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
          {tour.title}
        </h1>
        
        {/* Trust Signals Bar */}
        <div className="flex items-center gap-4 mb-3 text-sm">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-bold">{tour.rating}</span>
            <span className="text-gray-500">({tour.reviews} รีวิว)</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <TrendingUp className="w-4 h-4 text-blue-500" />
            <span className="font-medium">{tour.satisfaction}% พึงพอใจ</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <Users className="w-4 h-4 text-blue-500" />
            <span className="font-medium">{tour.totalTravelers.toLocaleString()} คนเดินทางแล้ว</span>
          </div>
        </div>
        
        {/* Last Booking Alert */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 mb-3">
          <div className="flex items-center gap-2 text-blue-700 text-sm">
            <Sparkles className="w-4 h-4" />
            <span>มีผู้จองล่าสุด {tour.lastBooking}</span>
          </div>
        </div>

        {/* Key Selling Points Grid */}
        <div className="grid grid-cols-4 gap-3 mb-4">
          {[
            { icon: Shield, label: 'การันตีคืนเงิน' },
            { icon: Award, label: 'ไกด์มืออาชีพ' },
            { icon: CreditCard, label: 'ผ่อน 0%' },
            { icon: Gift, label: 'มีโปรโมชั่น' }
          ].map((item, idx) => (
            <div key={idx} className="text-center">
              <div className="w-10 h-10 mx-auto mb-1 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center text-blue-600">
                <item.icon className="w-5 h-5" />
              </div>
              <p className="text-xs text-gray-700 font-medium">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Widget */}
      <div className="bg-white p-4 border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="flex items-baseline gap-2">
              {tour.originalPrice && (
                <span className="text-gray-500 line-through text-sm">
                  ฿{tour.originalPrice.toLocaleString()}
                </span>
              )}
              <span className="text-2xl font-bold text-blue-600">
                ฿{tour.price.toLocaleString()}
              </span>
              <span className="text-gray-600 text-sm">ต่อคน</span>
            </div>
            {savings > 0 && (
              <span className="text-xs text-green-600 font-medium">
                ประหยัด ฿{(tour.originalPrice! - tour.price).toLocaleString()}
              </span>
            )}
          </div>
          
          <button
            onClick={() => {
              setIsFromDatesTab(false)
              setShowBookingModal(true)
            }}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
          >
            จองเลย
          </button>
        </div>
        
        {/* Quick Select Date */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {departureDates.slice(0, 3).map((date, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedDate(date.date)}
              className={`flex-shrink-0 px-3 py-2 rounded-lg border text-xs font-medium transition-all
                ${selectedDate === date.date 
                  ? 'border-blue-500 bg-blue-50 text-blue-700' 
                  : 'border-gray-200 hover:border-gray-300'}`}
            >
              <div>{date.date}</div>
              <div className={`text-xs mt-1 ${date.available <= 5 ? 'text-red-600' : 'text-gray-500'}`}>
                เหลือ {date.available} ที่
              </div>
            </button>
          ))}
          <button
            onClick={() => {
              setActiveTab('dates')
              // Scroll to content area right below the sticky tabs
              setTimeout(() => {
                const contentArea = document.querySelector('.pb-6')
                if (contentArea) {
                  const headerHeight = 72 // header height
                  const tabBarHeight = 56 // approximate tab bar height
                  const topOffset = headerHeight + tabBarHeight
                  const elementTop = contentArea.getBoundingClientRect().top + window.scrollY
                  window.scrollTo({ 
                    top: elementTop - topOffset, 
                    behavior: 'smooth' 
                  })
                }
              }, 50)
            }}
            className="flex-shrink-0 px-3 py-2 rounded-lg border border-gray-200 text-xs font-medium hover:border-blue-300 hover:bg-blue-50 transition-colors flex items-center gap-1"
          >
            ดูทั้งหมด
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-[72px] z-30">
        <div className="flex overflow-x-auto scrollbar-hide">
          {[
            { id: 'overview', label: 'ภาพรวม', icon: Eye },
            { id: 'dates', label: 'วันเดินทาง', icon: Calendar },
            { id: 'itinerary', label: 'โปรแกรม', icon: MapPin },
            { id: 'hotels', label: 'ที่พัก', icon: Hotel },
            { id: 'reviews', label: 'รีวิว', icon: MessageCircle },
            { id: 'faq', label: 'FAQ', icon: HelpCircle }
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as typeof activeTab)
                  // Scroll to content area right below the sticky tabs
                  setTimeout(() => {
                    const contentArea = document.querySelector('.pb-6')
                    if (contentArea) {
                      const headerHeight = 72 // header height
                      const tabBarHeight = 56 // approximate tab bar height
                      const topOffset = headerHeight + tabBarHeight
                      const elementTop = contentArea.getBoundingClientRect().top + window.scrollY
                      window.scrollTo({ 
                        top: elementTop - topOffset, 
                        behavior: 'smooth' 
                      })
                    }
                  }, 50)
                }}
                className={`flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-all relative
                  ${activeTab === tab.id
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'}`}
                style={activeTab === tab.id ? {
                  borderBottom: '2px solid #3b82f6'
                } : {}}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Content Area */}
      <div className="pb-6">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="p-4 space-y-4">
            {/* Trip Overview Cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white p-4 rounded-xl border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <Plane className="w-5 h-5 text-blue-500" />
                  <h3 className="font-semibold text-gray-900">สายการบิน</h3>
                </div>
                <p className="text-sm text-gray-700 font-medium">{tour.airline}</p>
                <p className="text-xs text-gray-500 mt-1">น้ำหนักกระเป๋า {tour.flightDetails.baggageAllowance}</p>
              </div>
              
              <div className="bg-white p-4 rounded-xl border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  <h3 className="font-semibold text-gray-900">ระยะเวลา</h3>
                </div>
                <p className="text-sm text-gray-700 font-medium">{tour.duration}</p>
                <p className="text-xs text-gray-500 mt-1">{tour.groupSize}</p>
              </div>
              
              <div className="bg-white p-4 rounded-xl border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <Hotel className="w-5 h-5 text-blue-500" />
                  <h3 className="font-semibold text-gray-900">ที่พัก</h3>
                </div>
                <p className="text-sm text-gray-700 font-medium">โรงแรม 4 ดาว</p>
                <p className="text-xs text-gray-500 mt-1">{tour.hotels.length} แห่ง</p>
              </div>
              
              <div className="bg-white p-4 rounded-xl border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <Utensils className="w-5 h-5 text-blue-500" />
                  <h3 className="font-semibold text-gray-900">อาหาร</h3>
                </div>
                <p className="text-sm text-gray-700 font-medium">รวม {tour.meals.breakfast + tour.meals.lunch + tour.meals.dinner} มื้อ</p>
                <p className="text-xs text-gray-500 mt-1">พิเศษ {tour.meals.specialMeals.length} เมนู</p>
              </div>
            </div>

            {/* Destinations */}
            <div className="bg-white rounded-xl p-5 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-500" />
                เส้นทางการเดินทาง
              </h3>
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
                {tour.destinations.map((dest, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="px-3 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 text-sm font-medium text-blue-700 whitespace-nowrap">
                      {dest}
                    </div>
                    {idx < tour.destinations.length - 1 && (
                      <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* What\'s Included */}
            <div className="bg-white rounded-xl p-5 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">รายการที่รวมในแพ็คเกจ</h3>
              <div className="space-y-2">
                {(showAllIncluded ? tour.included : tour.included.slice(0, 5)).map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              {tour.included.length > 5 && (
                <button
                  onClick={() => setShowAllIncluded(!showAllIncluded)}
                  className="mt-3 text-blue-600 font-medium text-sm flex items-center gap-1"
                >
                  {showAllIncluded ? 'ดูน้อยลง' : `ดูเพิ่มเติม (+${tour.included.length - 5} รายการ)`}
                  {showAllIncluded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              )}
            </div>

            {/* What\'s Not Included */}
            <div className="bg-white rounded-xl p-5 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">รายการที่ไม่รวม</h3>
              <div className="space-y-2">
                {tour.excluded.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <X className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Special Meals */}
            <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl p-5 border border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Utensils className="w-5 h-5 text-blue-500" />
                อาหารพิเศษที่รวมในทัวร์
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {tour.meals.specialMeals.map((meal, idx) => (
                  <div key={idx} className="bg-white rounded-lg px-3 py-2 text-sm font-medium text-blue-700 border border-blue-200 text-center">
                    {meal}
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Options */}
            <div className="bg-white rounded-xl p-5 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-blue-500" />
                ตัวเลือกการชำระเงิน
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {tour.paymentOptions.map((option, idx) => (
                  <button key={idx} className="p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors">
                    <p className="text-sm font-medium text-blue-700">{option}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Important Information */}
            <div className="bg-slate-50 rounded-xl p-5 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-500" />
                ข้อมูลสำคัญ
              </h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div>
                  <p className="font-medium mb-1">เอกสารที่ต้องใช้:</p>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {tour.requirements.map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-1">นโยบายการยกเลิก:</p>
                  <p className="text-gray-600">{tour.cancellationPolicy}</p>
                </div>
                <div>
                  <p className="font-medium mb-1">กำหนดจองล่วงหน้า:</p>
                  <p className="text-gray-600">{tour.bookingDeadline}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Dates Tab - Mobile First Design */}
        {activeTab === 'dates' && (
          <div className="p-4 space-y-6">

            {/* Monthly Groups */}
            <div className="space-y-6">
              {Object.entries(datesByMonth).map(([month, dates], monthIndex) => {
                const availableDates = dates.filter(d => d.available > 0)
                
                if (availableDates.length === 0) return null
                
                return (
                  <div key={month} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    {/* Month Header */}
                    <div className="bg-blue-100 px-6 py-4 border-b border-blue-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-6 h-6 text-blue-600" />
                          <h3 className="text-xl font-bold text-gray-900">{month}</h3>
                        </div>
                        <span className="text-sm text-gray-500">
                          {availableDates.length} ช่วงเวลาเดินทาง
                        </span>
                      </div>
                    </div>

                    {/* Date Grid */}
                    <div className="p-6 grid gap-3">
                      {availableDates.map((dateInfo, idx) => {
                        const isSelected = selectedDate === dateInfo.dateShort
                        const isDiscounted = dateInfo.price < tour.price
                        const isLowStock = dateInfo.available <= 5
                        
                        return (
                          <button
                            key={idx}
                            onClick={() => {
                              setSelectedDate(dateInfo.dateShort)
                              setIsFromDatesTab(true)
                              setShowBookingModal(true)
                            }}
                            className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 hover:shadow-md
                              ${isSelected 
                                ? 'border-blue-500 bg-blue-50 shadow-md' 
                                : 'border-gray-200 bg-white hover:border-gray-300'}`}
                          >
                            <div className="flex items-center justify-between">
                              {/* Date & Duration */}
                              <div className="flex-1">
                                <div className="font-bold text-lg text-gray-900 mb-1">
                                  {dateInfo.date}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                  <Clock className="w-4 h-4" />
                                  <span>{tour.duration}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <Users className="w-4 h-4" />
                                  <span>เหลือ {dateInfo.available} ที่นั่ง</span>
                                </div>
                              </div>

                              {/* Price & Tags */}
                              <div className="text-right">
                                <div className="text-2xl font-bold text-blue-600 mb-1">
                                  ฿{dateInfo.price.toLocaleString()}
                                </div>
                                <div className="text-xs text-gray-500 mb-2">ต่อคน</div>
                                
                                {/* Status Tags */}
                                <div className="flex flex-col gap-1 items-end">
                                  {isDiscounted && (
                                    <span className="inline-flex bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">
                                      ประหยัด ฿{(tour.price - dateInfo.price).toLocaleString()}
                                    </span>
                                  )}
                                  {isLowStock && (
                                    <span className="inline-flex bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-bold">
                                      ที่นั่งน้อย
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                          </button>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Call to Action */}
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <MessageCircle className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h4 className="text-lg font-bold text-gray-900 mb-2">ไม่พบวันที่ต้องการ?</h4>
              <p className="text-gray-600 mb-6">
                ติดต่อเราเพื่อสอบถามวันเดินทางพิเศษหรือจัดกรุ๊ปส่วนตัว
              </p>
              <div className="flex gap-3 justify-center">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors">
                  <Phone className="w-4 h-4" />
                  <span>โทรเลย</span>
                </button>
                <button className="bg-white hover:bg-gray-100 text-gray-800 px-6 py-3 rounded-lg font-semibold border border-gray-300 flex items-center gap-2 transition-colors">
                  <MessageSquare className="w-4 h-4" />
                  <span>แชทออนไลน์</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Itinerary Tab */}
        {activeTab === 'itinerary' && (
          <div className="p-4">
            <div className="bg-white rounded-xl p-5 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">โปรแกรมการเดินทาง</h3>
              
              {/* Timeline Itinerary */}
              <div className="space-y-4">
                {Array.from({ length: parseInt(tour.duration.split(' ')[0]) }).map((_, day) => (
                  <div key={day} className="relative">
                    {/* Timeline Line */}
                    {day < parseInt(tour.duration.split(' ')[0]) - 1 && (
                      <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gray-200"></div>
                    )}
                    
                    {/* Day Card */}
                    <div className="flex gap-4">
                      {/* Day Number */}
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
                          {day + 1}
                        </div>
                      </div>
                      
                      {/* Day Content */}
                      <div className="flex-1 bg-gray-50 rounded-xl p-4 mb-4">
                        <button
                          onClick={() => setExpandedDay(expandedDay === day ? null : day)}
                          className="w-full text-left"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900">
                              วันที่ {day + 1}: {
                                day === 0 ? 'ออกเดินทาง' :
                                day === parseInt(tour.duration.split(' ')[0]) - 1 ? 'เดินทางกลับ' :
                                tour.destinations[day % tour.destinations.length]
                              }
                            </h4>
                            {expandedDay === day ? 
                              <ChevronUp className="w-5 h-5 text-gray-500" /> : 
                              <ChevronDown className="w-5 h-5 text-gray-500" />
                            }
                          </div>
                          
                          {/* Meal Icons */}
                          <div className="flex items-center gap-4 text-xs text-gray-600 mb-2">
                            <span className="flex items-center gap-1">
                              <Coffee className="w-3 h-3 text-blue-500" /> อาหารเช้า
                            </span>
                            <span className="flex items-center gap-1">
                              <Utensils className="w-3 h-3 text-blue-500" /> อาหารกลางวัน
                            </span>
                            {day > 0 && (
                              <span className="flex items-center gap-1">
                                <Utensils className="w-3 h-3 text-blue-500" /> อาหารเย็น
                              </span>
                            )}
                          </div>
                        </button>
                        
                        {/* Expanded Details */}
                        {expandedDay === day && (
                          <div className="mt-3 pt-3 border-t border-gray-200 space-y-2 text-sm text-gray-700">
                            {day === 0 ? (
                              <>
                                <p>06:00 - นัดพบที่สนามบินสุวรรณภูมิ อาคารผู้โดยสารขาออก</p>
                                <p>09:30 - ออกเดินทางสู่ประเทศญี่ปุ่น โดยสายการบิน {tour.airline}</p>
                                <p>17:40 - เดินทางถึงสนามบินนาริตะ ประเทศญี่ปุ่น</p>
                                <p>18:30 - รับสัมภาระและผ่านพิธีการตรวจคนเข้าเมือง</p>
                                <p>19:00 - เดินทางสู่โรงแรมที่พัก</p>
                                <p>20:30 - เช็คอินโรงแรม พักผ่อนตามอัธยาศัย</p>
                              </>
                            ) : day === parseInt(tour.duration.split(' ')[0]) - 1 ? (
                              <>
                                <p>08:00 - รับประทานอาหารเช้าที่โรงแรม</p>
                                <p>09:00 - เช็คเอาท์จากโรงแรม</p>
                                <p>10:00 - อิสระช้อปปิ้งย่านชินจูกุ</p>
                                <p>15:00 - เดินทางสู่สนามบินนาริตะ</p>
                                <p>17:00 - ถึงสนามบิน ทำการเช็คอิน</p>
                                <p>22:00 - ออกเดินทางกลับประเทศไทย</p>
                                <p>03:20+1 - ถึงสนามบินสุวรรณภูมิโดยสวัสดิภาพ</p>
                              </>
                            ) : (
                              <>
                                <p>07:00 - รับประทานอาหารเช้าที่โรงแรม</p>
                                <p>08:30 - ออกเดินทางเที่ยวชมสถานที่ท่องเที่ยว</p>
                                <p>10:00 - เยี่ยมชม {tour.highlights[day % tour.highlights.length]}</p>
                                <p>12:30 - รับประทานอาหารกลางวัน</p>
                                <p>14:00 - เดินทางต่อไปยังจุดท่องเที่ยวถัดไป</p>
                                <p>16:00 - ช้อปปิ้งและเดินเล่นตามอัธยาศัย</p>
                                <p>18:30 - รับประทานอาหารเย็น</p>
                                <p>20:00 - เดินทางกลับโรงแรม พักผ่อน</p>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Hotels Tab */}
        {activeTab === 'hotels' && (
          <div className="p-4 space-y-4">
            <h3 className="font-semibold text-gray-900">โรงแรมที่พัก</h3>
            
            {tour.hotels.map((hotel, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                {/* Hotel Image */}
                <div className="aspect-[16/9] relative bg-gray-200">
                  <Image
                    src={
                      tour.title.includes('ญี่ปุ่น') ? [
                        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop',
                        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
                        'https://images.unsplash.com/photo-1615460549969-36fa19521a4f?w=600&h=400&fit=crop'
                      ][idx % 3] :
                      tour.title.includes('เกาหลี') ? [
                        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
                        'https://images.unsplash.com/photo-1590841609987-4ac211afdde1?w=600&h=400&fit=crop',
                        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&h=400&fit=crop'
                      ][idx % 3] :
                      tour.title.includes('ยุโรป') ? [
                        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=400&fit=crop',
                        'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&h=400&fit=crop',
                        'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=600&h=400&fit=crop'
                      ][idx % 3] :
                      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop'
                    }
                    alt={hotel.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: hotel.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Hotel Info */}
                <div className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-1">{hotel.name}</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    {hotel.location} • {hotel.nights} คืน
                  </p>
                  
                  {/* Room Info */}
                  <div className="bg-gray-50 rounded-lg p-3 mb-3">
                    <p className="text-sm font-medium text-gray-700 mb-1">ประเภทห้องพัก</p>
                    <p className="text-sm text-gray-600">{hotel.roomType}</p>
                  </div>
                  
                  {/* Amenities */}
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { icon: Wifi, label: 'WiFi' },
                      { icon: Coffee, label: 'อาหารเช้า' },
                      { icon: Car, label: 'ที่จอดรถ' },
                      { icon: Building2, label: 'ฟิตเนส' }
                    ].map((amenity, i) => (
                      <div key={i} className="text-center">
                        <div className="w-8 h-8 mx-auto mb-1 bg-blue-50 rounded-full flex items-center justify-center">
                          <amenity.icon className="w-4 h-4 text-blue-600" />
                        </div>
                        <p className="text-xs text-gray-600">{amenity.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div className="p-4 space-y-4">
            {/* Review Summary */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-5 border border-blue-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">คะแนนรีวิว</h3>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-blue-600">{tour.rating}</span>
                    <div>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${
                            i < Math.floor(tour.rating) 
                              ? 'fill-yellow-400 text-yellow-400' 
                              : 'text-gray-300'
                          }`} />
                        ))}
                      </div>
                      <p className="text-xs text-gray-600">{tour.reviews} รีวิว</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Rating Breakdown */}
              <div className="space-y-2">
                {[
                  { stars: 5, count: Math.floor(tour.reviews * 0.65) },
                  { stars: 4, count: Math.floor(tour.reviews * 0.25) },
                  { stars: 3, count: Math.floor(tour.reviews * 0.08) },
                  { stars: 2, count: Math.floor(tour.reviews * 0.01) },
                  { stars: 1, count: Math.floor(tour.reviews * 0.01) }
                ].map((rating) => (
                  <div key={rating.stars} className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 w-3">{rating.stars}</span>
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-yellow-400 to-orange-400"
                        style={{ width: `${(rating.count / tour.reviews) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-600 w-10 text-right">{rating.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Individual Reviews */}
            <div className="space-y-4">
              {[
                { 
                  name: 'คุณพิมพ์ชนก', 
                  rating: 5, 
                  date: '2 สัปดาห์ที่แล้ว',
                  verified: true,
                  comment: 'ประทับใจมากค่ะ ทัวร์จัดได้ดีมาก ไกด์น่ารักให้ความรู้เยอะ โรงแรมสะอาดสะอ้าน อาหารอร่อยทุกมื้อ ได้ไปครบทุกที่ตามโปรแกรม จะกลับมาใช้บริการอีกแน่นอน',
                  images: ['https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=200&h=200&fit=crop']
                },
                { 
                  name: 'คุณสมชาย', 
                  rating: 4, 
                  date: '1 เดือนที่แล้ว',
                  verified: true,
                  comment: 'โดยรวมดีครับ แต่เวลาค่อนข้างกระชั้น บางที่อยากอยู่นานกว่านี้ แต่ไกด์ดูแลดีมาก อาหารอร่อย'
                },
                { 
                  name: 'คุณมาลี', 
                  rating: 5, 
                  date: '1 เดือนที่แล้ว',
                  verified: false,
                  comment: 'คุ้มค่ามากค่ะ ได้ไปเที่ยวหลายที่ โรงแรมดี บริการประทับใจ'
                }
              ].map((review, idx) => (
                <div key={idx} className="bg-white rounded-xl p-4 border border-gray-200">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-900">{review.name}</span>
                        {review.verified && (
                          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-medium">
                            ✓ ซื้อแล้ว
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span>•</span>
                        <span>{review.date}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-700 mb-3">{review.comment}</p>
                  
                  {review.images && (
                    <div className="flex gap-2">
                      {review.images.map((img, i) => (
                        <div key={i} className="w-16 h-16 rounded-lg overflow-hidden">
                          <Image src={img} alt="" width={64} height={64} className="object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Load More */}
            <button className="w-full py-3 bg-white rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              ดูรีวิวเพิ่มเติม
            </button>
          </div>
        )}

        {/* FAQ Tab */}
        {activeTab === 'faq' && (
          <div className="p-4 space-y-4">
            <h3 className="font-semibold text-gray-900 mb-4">คำถามที่พบบ่อย</h3>
            
            {[
              { 
                q: 'ต้องมีวีซ่าไหม?', 
                a: 'ไม่ต้องใช้วีซ่าสำหรับการท่องเที่ยวไม่เกิน 15 วัน' 
              },
              { 
                q: 'จองล่วงหน้ากี่วัน?', 
                a: 'แนะนำจองล่วงหน้าอย่างน้อย 7-14 วัน หรือจนกว่าที่นั่งจะเต็ม' 
              },
              { 
                q: 'เด็กคิดราคาอย่างไร?', 
                a: 'เด็กอายุ 2-12 ปี ลด 10% | ต่ำกว่า 2 ปี ฟรี (ไม่มีที่นั่งและเตียง)' 
              },
              { 
                q: 'สามารถเลื่อนการเดินทางได้ไหม?', 
                a: 'สามารถเลื่อนได้ 1 ครั้ง แจ้งล่วงหน้า 15 วัน มีค่าธรรมเนียม 1,000 บาท' 
              },
              { 
                q: 'มีประกันการเดินทางให้ไหม?', 
                a: 'รวมประกันอุบัติเหตุวงเงิน 1,000,000 บาท ค่ารักษาพยาบาล 500,000 บาท' 
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setExpandedDay(expandedDay === idx ? null : idx)}
                  className="w-full p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-3">
                      <HelpCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="font-medium text-gray-900">{faq.q}</span>
                    </div>
                    {expandedDay === idx ? 
                      <ChevronUp className="w-5 h-5 text-gray-500" /> : 
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    }
                  </div>
                </button>
                {expandedDay === idx && (
                  <div className="px-4 pb-4 pl-12 text-sm text-gray-700">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>


      {/* Enhanced Booking Modal - Mobile First */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end">
          <div className="bg-white w-full max-h-[95vh] rounded-t-2xl animate-in slide-in-from-bottom duration-300 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
              <h2 className="text-lg font-bold text-gray-900">จองทัวร์</h2>
              <button
                onClick={() => {
                  setShowBookingModal(false)
                  setBookingStep(1) // Reset step when closing
                  setIsFromDatesTab(false) // Reset the dates tab flag
                  setShowChangePeriod(false) // Reset the change period flag
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Progress Steps */}
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex-shrink-0">
              <div className="flex items-center justify-center">
                <div className="flex items-center space-x-4">
                  {/* Step 1 */}
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                      ${bookingStep === 1 ? 'bg-blue-600 text-white' : 
                        bookingStep > 1 ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
                      {bookingStep > 1 ? <Check className="w-4 h-4" /> : '1'}
                    </div>
                    <span className={`ml-2 text-sm font-medium ${bookingStep === 1 ? 'text-blue-600' : 'text-gray-600'}`}>
                      เลือกรายละเอียด
                    </span>
                  </div>
                  
                  {/* Divider */}
                  <div className={`w-8 h-0.5 ${bookingStep > 1 ? 'bg-green-600' : 'bg-gray-300'}`}></div>
                  
                  {/* Step 2 */}
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                      ${bookingStep === 2 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
                      2
                    </div>
                    <span className={`ml-2 text-sm font-medium ${bookingStep === 2 ? 'text-blue-600' : 'text-gray-600'}`}>
                      ข้อมูลและชำระเงิน
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              <div className="p-4 space-y-6">
                {/* Step 1: Tour Details */}
                {bookingStep === 1 && (
                  <>
                {/* Tour Summary */}
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <h3 className="font-bold text-gray-900 mb-2">{tour.title}</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span>{tour.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Plane className="w-4 h-4 text-blue-600" />
                      <span>{tour.airline}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Hotel className="w-4 h-4 text-blue-600" />
                      <span>โรงแรม 4 ดาว</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Utensils className="w-4 h-4 text-blue-600" />
                      <span>{tour.meals.breakfast + tour.meals.lunch + tour.meals.dinner} มื้อ</span>
                    </div>
                  </div>
                </div>
                
                {/* Select Date */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">วันเดินทาง</h3>
                  
                  {/* Show only selected period when opened from dates tab and not changing */}
                  {isFromDatesTab && !showChangePeriod && selectedDate ? (
                    <>
                      {/* Selected Period Display */}
                      {(() => {
                        const selectedDateInfo = allDepartureDates.find(d => d.dateShort === selectedDate)
                        if (!selectedDateInfo) return null
                        
                        const isDiscounted = selectedDateInfo.price < tour.price
                        const isLowStock = selectedDateInfo.available <= 5
                        
                        return (
                          <div className="w-full p-4 rounded-lg border-2 border-blue-500 bg-blue-50 shadow-md">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="font-bold text-gray-900 mb-1">{selectedDateInfo.date}</div>
                                <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                                  <span>เลือกแล้ว</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                                  <Users className="w-4 h-4" />
                                  <span>เหลือ {selectedDateInfo.available} ที่นั่ง</span>
                                </div>
                                <div className="flex gap-2">
                                  {isDiscounted && (
                                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">
                                      ประหยัด ฿{(tour.price - selectedDateInfo.price).toLocaleString()}
                                    </span>
                                  )}
                                  {isLowStock && (
                                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-bold">
                                      ที่นั่งน้อย
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="text-right ml-4">
                                <div className="text-xl font-bold text-blue-600">
                                  ฿{selectedDateInfo.price.toLocaleString()}
                                </div>
                                <div className="text-xs text-gray-500">ต่อคน</div>
                              </div>
                            </div>
                          </div>
                        )
                      })()}
                      
                      {/* Change Period Link */}
                      <button
                        onClick={() => setShowChangePeriod(true)}
                        className="w-full mt-3 text-center text-sm text-blue-600 hover:text-blue-700 font-medium py-2"
                      >
                        ต้องการเปลี่ยนวันเดินทาง?
                      </button>
                    </>
                  ) : (
                    /* Show all periods when opened from booking button or when changing period */
                    <div className="space-y-3">
                      {allDepartureDates.filter(d => d.available > 0).map((dateInfo, idx) => {
                        const isSelected = selectedDate === dateInfo.dateShort
                        const isDiscounted = dateInfo.price < tour.price
                        const isLowStock = dateInfo.available <= 5
                        
                        return (
                          <button
                            key={idx}
                            onClick={() => {
                              setSelectedDate(dateInfo.dateShort)
                              // If changing period, collapse back to single view
                              if (isFromDatesTab && showChangePeriod) {
                                setShowChangePeriod(false)
                              }
                            }}
                            className={`w-full p-4 rounded-lg border-2 text-left transition-all hover:shadow-md
                              ${isSelected 
                                ? 'border-blue-500 bg-blue-50 shadow-md' 
                                : 'border-gray-200 hover:border-gray-300'}`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="font-bold text-gray-900 mb-1">{dateInfo.date}</div>
                                <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                                  <Users className="w-4 h-4" />
                                  <span>เหลือ {dateInfo.available} ที่นั่ง</span>
                                </div>
                                <div className="flex gap-2">
                                  {isDiscounted && (
                                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">
                                      ประหยัด ฿{(tour.price - dateInfo.price).toLocaleString()}
                                    </span>
                                  )}
                                  {isLowStock && (
                                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-bold">
                                      ที่นั่งน้อย
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="text-right ml-4">
                                <div className="text-xl font-bold text-blue-600">
                                  ฿{dateInfo.price.toLocaleString()}
                                </div>
                                <div className="text-xs text-gray-500">ต่อคน</div>
                              </div>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
                
                {/* Number of Guests */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">จำนวนผู้เดินทาง</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">ผู้ใหญ่</div>
                        <div className="text-sm text-gray-600">อายุ 12 ปีขึ้นไป</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-blue-500 hover:bg-blue-50 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-lg font-bold text-gray-900 min-w-[2rem] text-center">
                          {guestCount}
                        </span>
                        <button
                          onClick={() => setGuestCount(Math.min(tour.maxGroupSize, guestCount + 1))}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-blue-500 hover:bg-blue-50 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Price Summary */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-3">สรุปราคา</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">ราคาทัวร์ ({guestCount} ท่าน)</span>
                      <span className="font-medium">฿{basePrice.toLocaleString()}</span>
                    </div>
                    {selectedDatePrice !== tour.price && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {selectedDatePrice > tour.price ? 'ค่าธรรมเนียมเพิ่มเติม' : 'ส่วนลดพิเศษ'}
                        </span>
                        <span className={selectedDatePrice > tour.price ? 'text-red-600' : 'text-green-600'}>
                          {selectedDatePrice > tour.price ? '+' : '-'}฿{Math.abs(basePrice - actualPrice).toLocaleString()}
                        </span>
                      </div>
                    )}
                    <div className="pt-2 border-t border-gray-200">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-gray-900">ราคารวม</span>
                        <span className="text-2xl font-bold text-blue-600">
                          ฿{totalPrice.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                  </>
                )}

                {/* Step 2: Customer Information & Payment */}
                {bookingStep === 2 && (
                  <>
                    {/* Booking Summary */}
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <h3 className="font-bold text-gray-900 mb-2">สรุปการจอง</h3>
                      <div className="text-sm text-gray-700 space-y-1">
                        <div className="flex justify-between">
                          <span>ทัวร์:</span>
                          <span className="font-medium">{tour.title}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>วันเดินทาง:</span>
                          <span className="font-medium">{selectedDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>จำนวนคน:</span>
                          <span className="font-medium">{guestCount} ท่าน</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-blue-200 font-bold text-blue-600">
                          <span>ราคารวม:</span>
                          <span>฿{totalPrice.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div>
                      <h3 className="font-bold text-gray-900 mb-3">ข้อมูลผู้ติดต่อ</h3>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            ชื่อ-นามสกุล *
                          </label>
                          <input
                            type="text"
                            value={bookingForm.contactName}
                            onChange={(e) => setBookingForm({...bookingForm, contactName: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="กรอกชื่อ-นามสกุล"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            เบอร์โทรศัพท์ *
                          </label>
                          <input
                            type="tel"
                            value={bookingForm.contactPhone}
                            onChange={(e) => setBookingForm({...bookingForm, contactPhone: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="08X-XXX-XXXX"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            อีเมล *
                          </label>
                          <input
                            type="email"
                            value={bookingForm.contactEmail}
                            onChange={(e) => setBookingForm({...bookingForm, contactEmail: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="example@email.com"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div>
                      <h3 className="font-bold text-gray-900 mb-3">วิธีการชำระเงิน</h3>
                      
                      {/* Payment Amount Options */}
                      <div className="mb-4">
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            onClick={() => setBookingForm({...bookingForm, paymentMethod: 'full'})}
                            className={`p-3 rounded-lg border-2 text-left transition-all
                              ${bookingForm.paymentMethod === 'full' 
                                ? 'border-blue-500 bg-blue-50' 
                                : 'border-gray-200 hover:border-gray-300'}`}
                          >
                            <div className="font-medium text-gray-900">ชำระเต็มจำนวน</div>
                            <div className="text-sm text-gray-600">฿{totalPrice.toLocaleString()}</div>
                          </button>
                          
                          <button
                            onClick={() => setBookingForm({...bookingForm, paymentMethod: 'deposit'})}
                            className={`p-3 rounded-lg border-2 text-left transition-all
                              ${bookingForm.paymentMethod === 'deposit' 
                                ? 'border-blue-500 bg-blue-50' 
                                : 'border-gray-200 hover:border-gray-300'}`}
                          >
                            <div className="font-medium text-gray-900">มัดจำ 30%</div>
                            <div className="text-sm text-gray-600">฿{Math.round(totalPrice * 0.3).toLocaleString()}</div>
                          </button>
                        </div>
                      </div>
                      
                      {/* Payment Type Options */}
                      <div className="space-y-2">
                        {[
                          { id: 'bank_transfer', label: 'โอนเงินผ่านธนาคาร', icon: '🏧' },
                          { id: 'qr_code', label: 'QR Code', icon: '📱' },
                          { id: 'credit_card', label: 'บัตรเครดิต', icon: '💳' }
                        ].map((payment) => (
                          <button
                            key={payment.id}
                            onClick={() => setBookingForm({...bookingForm, paymentType: payment.id})}
                            className={`w-full p-3 rounded-lg border-2 text-left transition-all
                              ${bookingForm.paymentType === payment.id 
                                ? 'border-blue-500 bg-blue-50' 
                                : 'border-gray-200 hover:border-gray-300'}`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-lg">{payment.icon}</span>
                              <span className="font-medium text-gray-900">{payment.label}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Terms and Conditions */}
                    <div>
                      <h3 className="font-bold text-gray-900 mb-3">ข้อตกลง</h3>
                      <div className="space-y-3">
                        <label className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            checked={bookingForm.acceptTerms}
                            onChange={(e) => setBookingForm({...bookingForm, acceptTerms: e.target.checked})}
                            className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">
                            ฉันยอมรับ <span className="text-blue-600 underline">เงื่อนไขและข้อตกลงการใช้บริการ</span>
                          </span>
                        </label>
                        
                        <label className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            checked={bookingForm.acceptPrivacy}
                            onChange={(e) => setBookingForm({...bookingForm, acceptPrivacy: e.target.checked})}
                            className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">
                            ฉันยอมรับ <span className="text-blue-600 underline">นโยบายความเป็นส่วนตัว</span>
                          </span>
                        </label>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            
            {/* Footer */}
            <div className="p-4 border-t border-gray-200 bg-white flex-shrink-0">
              {bookingStep === 1 && (
                <button
                  onClick={() => setBookingStep(2)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-bold text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!selectedDate}
                >
                  {selectedDate ? 'ไปขั้นตอนต่อไป' : 'เลือกวันเดินทาง'}
                </button>
              )}
              
              {bookingStep === 2 && (
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <button
                      onClick={() => setBookingStep(1)}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-4 rounded-lg font-bold text-lg transition-colors"
                    >
                      ย้อนกลับ
                    </button>
                    <button
                      onClick={() => {
                        // Handle booking submission
                        alert('จองสำเร็จ! (Mock)')
                      }}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg font-bold text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={
                        !bookingForm.contactName || 
                        !bookingForm.contactPhone || 
                        !bookingForm.contactEmail ||
                        !bookingForm.acceptTerms ||
                        !bookingForm.acceptPrivacy
                      }
                    >
                      ยืนยันการจอง
                    </button>
                  </div>
                  <p className="text-center text-xs text-gray-500">
                    การจองจะได้รับการยืนยันทันทีหลังกดยืนยัน
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* All Dates Modal */}
      {showAllDates && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end">
          <div className="bg-white w-full max-h-[80vh] rounded-t-3xl animate-in slide-in-from-bottom duration-300">
            <div className="p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">เลือกวันเดินทาง</h2>
                <button
                  onClick={() => setShowAllDates(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              {/* All Departure Dates */}
              <div className="space-y-3">
                {allDepartureDates.map((dateInfo, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedDate(dateInfo.dateShort)
                      setShowAllDates(false)
                      setTimeout(() => {
                        setShowBookingModal(true)
                      }, 300) // รอให้ animation เสร็จก่อนเปิด BookingModal
                    }}
                    disabled={dateInfo.available === 0}
                    className={`w-full p-4 rounded-xl border-2 transition-all text-left disabled:opacity-50 disabled:cursor-not-allowed
                      ${selectedDate === dateInfo.dateShort 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">{dateInfo.date}</p>
                        <p className={`text-sm mt-1 ${
                          dateInfo.available === 0 ? 'text-gray-500' :
                          dateInfo.available <= 5 ? 'text-red-600 font-medium' : 
                          dateInfo.available <= 10 ? 'text-blue-600' : 'text-gray-600'
                        }`}>
                          {dateInfo.available === 0 ? 'เต็มแล้ว' :
                           dateInfo.available <= 5 ? '🔥 เหลือเพียง' : 'เหลือ'} {dateInfo.available > 0 ? dateInfo.available : ''} {dateInfo.available > 0 ? 'ที่นั่ง' : ''}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-blue-600">
                          ฿{dateInfo.price.toLocaleString()}
                        </p>
                        {dateInfo.price !== tour.price && (
                          <p className={`text-xs ${dateInfo.price > tour.price ? 'text-gray-500' : 'text-green-600'}`}>
                            {dateInfo.price > tour.price ? '+' : ''}
                            ฿{(dateInfo.price - tour.price).toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Continue Button */}
              <button
                onClick={() => {
                  if (selectedDate) {
                    setShowAllDates(false)
                    setTimeout(() => {
                      setShowBookingModal(true)
                    }, 300) // รอให้ animation ของ AllDates Modal เสร็จก่อน
                  }
                }}
                disabled={!selectedDate}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {selectedDate ? 'ดำเนินการต่อ' : 'เลือกวันเดินทาง'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}