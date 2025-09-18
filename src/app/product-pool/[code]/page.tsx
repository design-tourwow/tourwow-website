'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { 
  ArrowLeft, Calendar, Users, Star, Clock, MapPin, Plane, Hotel, 
  Utensils, FileText, Download, Globe, Tag, BadgeCheck, Phone,
  ChevronRight, Heart, Share2, Shield, CreditCard, RefreshCw,
  AlertTriangle, CheckCircle, Info, Car, Camera, Wifi, Coffee,
  Umbrella, Baby, Accessibility, DollarSign, Calculator, MessageCircle,
  Send, Bot, X, CloudSun, TrendingUp, Bookmark, QrCode, ExternalLink,
  Navigation, Zap, Monitor, ImageIcon, Map, Bell, BellOff, Languages,
  Play, Video, BarChart3, Smartphone, Tablet, Eye, UserPlus, LogIn
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import StarRating from '@/components/StarRating'
import LoadingScreen from '@/components/LoadingScreen'
import BookingModal, { BookingFormData } from '@/components/BookingModal'
import { useThailandData } from '@/hooks/useThailandData'
import Modal from '@/components/ui/Modal'
import LoginForm from '@/components/LoginForm'
import RegisterForm from '@/components/RegisterForm'

// Custom CSS for mobile scrolling
const customStyles = `
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .touch-manipulation {
    touch-action: manipulation;
  }
  @media (max-width: 640px) {
    .mobile-optimize {
      font-size: 14px;
      line-height: 1.4;
    }
  }
`

interface ProductPoolTourRaw {
  id: number
  productName: string
  productTourCode: string
  productTourwowCode: string
  productPrice: number
  productPriceCompare?: number
  productMainCountryNameTh: string
  productMainCountryNameEn: string
  productCountries: string
  productDurationDay: number
  productDurationNight: number
  productDurationDayAndNight?: string
  productHotelStar: number
  productMealAmount: number
  productHilightDescription: string
  productBannerUrl: string
  productIsRecommended: number
  productStartAt: string
  productTags: string
  periodStartAt: string
  periodEndAt: string
  periodPriceAdultDouble: number
  periodPriceAdultDoubleCompare?: number
  periodQuantityRemaining: number
  periodIsActive: number
  periodGoTransportationNameEn: string
  periodGoTransportationCode: string
  periodBackTransportationNameEn: string
  periodBackTransportationCode: string
  period_id: number
}

interface Period {
  id?: number;
  startAt: string;
  endAt: string;
  price: number;
  comparePrice?: number;
  available: number;
  isActive: number;
  goTransport: string;
  goTransportCode: string;
  backTransport: string;
  backTransportCode: string;
}

interface TourDetail {
  id: string
  name: string
  code: string
  tourwowCode: string
  price: number
  originalPrice?: number
  image: string
  location: string
  country: string
  days: number
  nights: number
  duration: {
    days: number
    nights: number
    dayAndNight: string
  }
  hotelStar: number
  meals: number
  highlights: string[]
  tags: string[]
  periods: Period[]
  isRecommended: boolean
  quantityRemaining: number
  airline?: string
  airlineName?: string
  rating?: number
  reviews?: number
  availability?: string
  availableSlots?: number
}

// Function to format date from YYYY-MM-DD to Thai format (DD MMM YYYY)
function formatDateToThai(dateString: string): string {
  if (!dateString) return 'รอประกาศ'
  
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return 'รอประกาศ'
    
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear() + 543 // Convert to Buddhist era
    
    const thaiMonths = [
      'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
      'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
    ]
    
    return `${day} ${thaiMonths[month]} ${year}`
  } catch (error) {
    return 'รอประกาศ'
  }
}

// Generate order reference number
function generateOrderReference(): string {
  const now = new Date()
  const year = (now.getFullYear() % 100).toString().padStart(2, '0')
  const month = (now.getMonth() + 1).toString().padStart(2, '0')
  const day = now.getDate().toString().padStart(2, '0')
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  return `TW${year}${month}${day}${random}`
}

function mapRawToTour(raws: ProductPoolTourRaw[]): TourDetail | null {
  if (!raws || raws.length === 0) return null
  
  const firstTour = raws[0]
  
  // แปลง product_duration_day_and_night format
  let dayAndNight = ''
  let days = firstTour.productDurationDay
  let nights = firstTour.productDurationNight

  if (firstTour.productDurationDayAndNight) {
    // Check for different formats: "5D4N", "5วัน4คืน", "5 วัน 4 คืน"
    const formats = [
      /(\d+)D(\d+)N/i,                    // 5D4N format
      /(\d+)\s*วัน\s*(\d+)\s*คืน/,        // 5วัน4คืน or 5 วัน 4 คืน
      /(\d+)\s*day[s]?\s*(\d+)\s*night[s]?/i // 5day4night format
    ]

    for (const format of formats) {
      const match = firstTour.productDurationDayAndNight.match(format)
      if (match) {
        days = parseInt(match[1])
        nights = parseInt(match[2])
        break
      }
    }
    
    // Always format as Thai
    dayAndNight = `${days} วัน ${nights} คืน`
  } else {
    dayAndNight = `${days} วัน ${nights} คืน`
  }

  // สร้าง periods จากทุก rows
  const periods: Period[] = raws.map(raw => ({
    id: raw.period_id,
    startAt: raw.periodStartAt,
    endAt: raw.periodEndAt,
    price: raw.periodPriceAdultDouble,
    comparePrice: raw.periodPriceAdultDoubleCompare,
    available: raw.periodQuantityRemaining,
    isActive: raw.periodIsActive,
    goTransport: raw.periodGoTransportationNameEn || 'สายการบินชั้นนำ',
    goTransportCode: raw.periodGoTransportationCode || 'TG',
    backTransport: raw.periodBackTransportationNameEn,
    backTransportCode: raw.periodBackTransportationCode,
  }))

  return {
    id: firstTour.id.toString(),
    name: firstTour.productName,
    code: firstTour.productTourCode,
    tourwowCode: firstTour.productTourwowCode,
    price: Math.min(...periods.filter(p => p.price > 0).map(p => p.price)) || firstTour.productPrice,
    originalPrice: firstTour.productPriceCompare,
    image: firstTour.productBannerUrl,
    location: firstTour.productMainCountryNameTh,
    country: firstTour.productMainCountryNameTh,
    days: days,
    nights: nights,
    duration: {
      days: days,
      nights: nights,
      dayAndNight: dayAndNight
    },
    hotelStar: firstTour.productHotelStar,
    meals: firstTour.productMealAmount,
    highlights: firstTour.productHilightDescription ? firstTour.productHilightDescription.split(/,|\n|\|/).map(s => s.trim()).filter(Boolean) : [],
    tags: firstTour.productTags ? firstTour.productTags.split(/,|\n|\|/).map(s => s.trim()).filter(Boolean) : [],
    periods: periods,
    isRecommended: firstTour.productIsRecommended === 1,
    quantityRemaining: Math.min(...periods.map(p => p.available)),
    airline: periods[0]?.goTransportCode || 'TG',
    airlineName: periods[0]?.goTransport || 'สายการบินชั้นนำ',
    rating: 4.5,
    reviews: 127,
    availability: 'มีที่ว่าง', // ค่าเริ่มต้น จะคำนวณใหม่ตามรอบที่เลือก
    availableSlots: Math.max(...periods.map(p => p.available)),
  }
}

export default function ProductPoolDetailPage() {
  const params = useParams()
  const code = decodeURIComponent(params?.code as string || '')
  const [tour, setTour] = useState<TourDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedPeriod, setSelectedPeriod] = useState<Period | null>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'itinerary' | 'booking' | 'terms'>('overview')
  
  // Thailand data hook for address conversion
  const { provinces, districts, subDistricts } = useThailandData()
  
  // New features state
  const [chatbotOpen, setChatbotOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState<Array<{id: string, text: string, sender: 'user' | 'bot', timestamp: Date}>>([])
  const [currentMessage, setCurrentMessage] = useState('')
  const [bookmarked, setBookmarked] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<'standard' | 'premium' | null>(null)
  const [travelers, setTravelers] = useState(1)
  const [extraRooms, setExtraRooms] = useState(0)
  const [showImageGallery, setShowImageGallery] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [showMap, setShowMap] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedLanguage, setSelectedLanguage] = useState<'th' | 'en'>('th')
  const [pushNotificationsEnabled, setPushNotificationsEnabled] = useState(false)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const packageRef = useRef<HTMLDivElement>(null)
  const travelerRef = useRef<HTMLDivElement>(null)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')
  const [authPendingBookingData, setAuthPendingBookingData] = useState<BookingFormData | null>(null)
  const router = useRouter();
  const [pendingRedirect, setPendingRedirect] = useState(false)
  const [isGuestBooking, setIsGuestBooking] = useState(false)
  
  // Auto switch from booking tab if no periods are available
  useEffect(() => {
    if (activeTab === 'booking' && tour?.periods) {
      const hasAvailablePeriod = tour.periods.some(period => {
        const startDate = new Date(period.startAt)
        const today = new Date()
        return period.available > 0 && startDate >= today
      })
      if (!hasAvailablePeriod) {
        setActiveTab('overview')
      }
    }
  }, [tour, activeTab])
  
  // Mock image gallery data
  const imageGallery = [
    tour?.image || '/plane.svg',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800',
    'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=800',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
    'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'
  ]

  // Helper functions
  const t = (th: string, en: string) => selectedLanguage === 'th' ? th : en

  const toggleBookmark = () => {
    setBookmarked(!bookmarked)
  }

  const toggleNotifications = () => {
    setPushNotificationsEnabled(!pushNotificationsEnabled)
  }

  const shareWhatsApp = () => {
    const text = `ดูทัวร์ ${tour?.name} ราคา ${tour?.price.toLocaleString()} บาท`
    const url = `https://wa.me/?text=${encodeURIComponent(text + ' ' + window.location.href)}`
    window.open(url, '_blank')
  }

  const openGoogleMaps = () => {
    const searchQuery = encodeURIComponent(tour?.location || '')
    window.open(`https://www.google.com/maps/search/?api=1&query=${searchQuery}`, '_blank')
  }

  const generateQRCode = () => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(window.location.href)}`
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + imageGallery.length) % imageGallery.length)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % imageGallery.length)
  }

  const checkAvailability = () => {
    // Simulate real-time availability check
    if (tour) {
      const newAvailability = Math.random() > 0.7 ? 'เหลือน้อย' : 'มีที่ว่าง'
      setTour({ ...tour, availability: newAvailability })
    }
  }

  // Chatbot functions
  const sendMessage = () => {
    if (!currentMessage.trim()) return
    
    const userMessage = {
      id: Date.now().toString(),
      text: currentMessage,
      sender: 'user' as const,
      timestamp: new Date()
    }
    
    setChatMessages(prev => [...prev, userMessage])
    setCurrentMessage('')
    
    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(currentMessage)
      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot' as const,
        timestamp: new Date()
      }
      setChatMessages(prev => [...prev, botMessage])
    }, 1000)
  }

  const getBotResponse = (message: string): string => {
    const lowercaseMessage = message.toLowerCase()
    
    if (lowercaseMessage.includes('ราคา') || lowercaseMessage.includes('เท่าไหร่')) {
      return `ทัวร์นี้ราคาเริ่มต้นที่ ${tour?.price.toLocaleString()} บาท ต่อท่านครับ สำหรับห้องพักคู่`
    } else if (lowercaseMessage.includes('วีซ่า')) {
      return 'สำหรับประเทศนี้ นักท่องเที่ยวไทยไม่ต้องขอวีซ่าล่วงหน้า สามารถพักได้ 30 วันครับ'
    } else if (lowercaseMessage.includes('โรงแรม')) {
      return `ทัวร์นี้พักโรงแรมระดับ ${tour?.hotelStar} ดาว มาตรฐานสากลครับ`
    } else if (lowercaseMessage.includes('อาหาร')) {
      return `รวมอาหาร ${tour?.meals} มื้อ ตามที่ระบุในโปรแกรมครับ`
    } else {
      return 'ขออภัย ผมยังไม่เข้าใจคำถามนี้ครับ ลองถามเรื่องราคา วีซ่า โรงแรม หรืออาหารดูนะครับ'
    }
  }

  useEffect(() => {
    const fetchTour = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch('/api/product-pool')
        if (!res.ok) throw new Error('ไม่สามารถดึงข้อมูลโปรแกรมทัวร์ได้')
        
        const result = await res.json()
        const data: ProductPoolTourRaw[] = Array.isArray(result) ? result : (result.data || [])
        
        if (!Array.isArray(data)) {
          throw new Error('ข้อมูลที่ได้รับไม่ถูกต้อง')
        }
        
        // หา tour ทั้งหมดที่มี code เดียวกัน (productTourCode หรือ productTourwowCode)
        console.log('Looking for code:', code)
        console.log('Sample data:', data.slice(0, 2).map(t => ({ 
          productTourCode: t.productTourCode, 
          productTourwowCode: t.productTourwowCode,
          productName: t.productName
        })))
        
        // ลองหาแบบ exact match ก่อน
        let matchingTours = data.filter(t => 
          t.productTourCode === code || 
          t.productTourwowCode === code
        )
        
        // ถ้าไม่เจอ ลองหาแบบ case insensitive
        if (matchingTours.length === 0) {
          matchingTours = data.filter(t => 
            (t.productTourCode && t.productTourCode.toLowerCase() === code.toLowerCase()) || 
            (t.productTourwowCode && t.productTourwowCode.toLowerCase() === code.toLowerCase())
          )
        }
        
        // ถ้ายังไม่เจอ ลองหาแบบ includes
        if (matchingTours.length === 0) {
          matchingTours = data.filter(t => 
            (t.productTourCode && t.productTourCode.includes(code)) || 
            (t.productTourwowCode && t.productTourwowCode.includes(code)) ||
            (t.productTourCode && code.includes(t.productTourCode)) ||
            (t.productTourwowCode && code.includes(t.productTourwowCode))
          )
        }
        
        // ถ้ายังไม่เจอ ลองหาแบบ partial match และ special characters
        if (matchingTours.length === 0) {
          const normalizedCode = code.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
          matchingTours = data.filter(t => {
            const normalizedTourCode = (t.productTourCode || '').replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
            const normalizedTourwowCode = (t.productTourwowCode || '').replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
            return normalizedTourCode === normalizedCode || normalizedTourwowCode === normalizedCode
          })
        }
        
        console.log('Found matching tours:', matchingTours.length)
        
        if (matchingTours.length === 0) {
          setError('ไม่พบโปรแกรมทัวร์นี้')
          setTour(null)
        } else {
          const tourDetail = mapRawToTour(matchingTours)
          setTour(tourDetail)
          
          // ไม่เลือก period อัตโนมัติ ให้ผู้ใช้เลือกเอง
          setSelectedPeriod(null)
        }
      } catch (e: any) {
        setError(e.message || 'เกิดข้อผิดพลาด')
        setTour(null)
      } finally {
        setLoading(false)
      }
    }
    
    if (code) fetchTour()
  }, [code])

  // Auto check availability
  useEffect(() => {
    const interval = setInterval(checkAvailability, 30000)
    return () => clearInterval(interval)
  }, [tour])

  // Handle booking confirmation
  const handleBookingConfirm = async (formData: BookingFormData) => {
    if (!isLoggedIn) {
      setAuthPendingBookingData(formData)
      setShowAuthModal(true)
      setAuthMode('login')
      return
    }
    if (!tour || !selectedPeriod) return
    
    try {
      // Get names from Thailand data
      const provinceName = provinces.find(p => p.id === formData.provinceId)?.name_th || ''
      const districtName = districts.find(d => d.id === formData.districtId)?.name_th || ''
      const subDistrictName = subDistricts.find(sd => sd.id === formData.subDistrictId)?.name_th || ''
      
      const orderData = {
        period_id: selectedPeriod.id, // ✅ ส่ง period_id ที่เลือกไป backend
        tour_program_id: tour.tourwowCode,
        tour_name: tour.name,
        departure_date: selectedPeriod.startAt,
        return_date: selectedPeriod.endAt,
        price_per_person: selectedPeriod.price,
        traveler_count: travelers,
        total_amount: selectedPeriod.price * travelers,
        deposit_amount: Math.round(selectedPeriod.price * travelers * 0.3),
        customer_name: formData.name,
        customer_phone: formData.phone,
        customer_email: formData.email,
        customer_address: formData.address,
        customer_sub_district: subDistrictName,
        customer_district: districtName,
        customer_province: provinceName,
        customer_postal_code: formData.zipCode,
        selected_package: selectedPackage,
        extra_rooms: extraRooms,
        base_price: selectedPeriod.price
      }

      console.log('🚀 Sending booking data:', orderData)
      
      const jwt = !isGuestBooking && typeof window !== 'undefined' ? localStorage.getItem('jwt') : null;
      const response = await fetch('/api/tw-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(jwt ? { Authorization: `Bearer ${jwt}` } : {})
        },
        body: JSON.stringify(orderData),
      })

      const result = await response.json()
      
      if (response.ok) {
        console.log('✅ Booking successful:', result)
        // BookingModal จะแสดง success modal อัตโนมัติ
        setShowBookingModal(true)
        setPendingRedirect(true)
      } else {
        console.error('❌ Booking failed:', result)
        alert('เกิดข้อผิดพลาดในการจอง: ' + result.error)
      }
    } catch (error) {
      console.error('💥 Booking error:', error)
      alert('เกิดข้อผิดพลาดในการจอง โปรดลองใหม่อีกครั้ง')
    }
  }

  // Scroll to package when selectedPeriod changes
  useEffect(() => {
    if (selectedPeriod && packageRef.current) {
      packageRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [selectedPeriod])

  // Scroll to traveler/room when selectedPackage changes
  useEffect(() => {
    if (selectedPackage && travelerRef.current) {
      travelerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [selectedPackage])

  if (loading) {
    return (
      <LoadingScreen 
        title="กำลังโหลดข้อมูลทัวร์" 
        subtitle="โปรดรอสักครู่..." 
      />
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">ไม่พบข้อมูลทัวร์</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link href="/product-pool">
            <Button variant="primary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              กลับไปหน้าหลัก
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  if (!tour) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-gray-600 text-xl font-semibold mb-4">ไม่พบข้อมูลทัวร์</div>
          <Link href="/product-pool">
            <Button variant="primary">กลับไปหน้าหลัก</Button>
          </Link>
        </div>
      </div>
    )
  }

  const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('jwt')
  const handleBookingClick = () => {
    if (!isLoggedIn) {
      setShowAuthModal(true)
      setAuthMode('login')
    } else {
      setShowBookingModal(true)
    }
  }

  const handleGuestBooking = () => {
    setShowAuthModal(false)
    setTimeout(() => {
      setIsGuestBooking(true)
      setShowBookingModal(true)
    }, 350)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Custom Styles */}
      <style jsx>{customStyles}</style>

      {/* Hero Section with Image Gallery */}
      <div className="relative h-96 overflow-hidden group">
        <Image
          src={imageGallery[currentImageIndex]}
          alt={tour.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        
        {/* Image Gallery Navigation */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors opacity-0 group-hover:opacity-100"
        >
          <ChevronRight className="w-5 h-5 rotate-180" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors opacity-0 group-hover:opacity-100"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
        
        {/* Image Gallery Indicator */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {imageGallery.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentImageIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
        
        {/* Gallery Button */}
        <button
          onClick={() => setShowImageGallery(true)}
          className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white px-3 py-2 rounded-lg transition-colors flex items-center"
        >
          <ImageIcon className="w-4 h-4 mr-2" />
          ดูรูปทั้งหมด ({imageGallery.length})
        </button>
        
        {/* Back Button */}
        <div className="absolute top-6 left-6">
          <Link href="/product-pool">
            <Button variant="secondary" size="sm" className="bg-white/90 hover:bg-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('กลับ', 'Back')}
            </Button>
          </Link>
        </div>

        {/* Language & Notification Controls */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 flex gap-2">
          {/* Language Switcher */}
          <div className="bg-white/90 rounded-lg p-1 flex">
            <button
              onClick={() => setSelectedLanguage('th')}
              className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                selectedLanguage === 'th' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              ไทย
            </button>
            <button
              onClick={() => setSelectedLanguage('en')}
              className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                selectedLanguage === 'en' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              EN
            </button>
          </div>
          
          {/* Notification Toggle */}
          <button
            onClick={toggleNotifications}
            className={`p-2 rounded-lg transition-colors ${
              pushNotificationsEnabled 
                ? 'bg-green-500 text-white hover:bg-green-600' 
                : 'bg-white/90 text-gray-600 hover:bg-white'
            }`}
          >
            {pushNotificationsEnabled ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
          </button>
        </div>

        {/* Title & Basic Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="container mx-auto">
            <div className="flex items-center mb-2">
              <span className="text-xs bg-blue-600 px-2 py-1 rounded-full mr-3">
                Product Pool
              </span>
              {tour.availability === 'เหลือน้อย' && (
                <span className="text-xs bg-red-600 px-2 py-1 rounded-full animate-pulse">
                  🔥 เหลือน้อย
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{tour.name}</h1>
            <div className="flex items-center text-sm opacity-90">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="mr-4">{tour.location}</span>
              <Clock className="w-4 h-4 mr-1" />
              <span className="mr-4">{tour.duration.dayAndNight}</span>
              <Users className="w-4 h-4 mr-1" />
              <span className="mr-4">ว่าง {tour.availableSlots} ที่</span>
              <button
                onClick={openGoogleMaps}
                className="flex items-center bg-white/20 hover:bg-white/30 px-2 py-1 rounded transition-colors"
              >
                <Map className="w-4 h-4 mr-1" />
                {t('แผนที่', 'Map')}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 sm:py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {/* Main Content - Mobile First */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Enhanced Tabs */}
            <div className="bg-white rounded-xl shadow-sm border">
              <div className="flex border-b overflow-x-auto scrollbar-hide">
                {[
                  { key: 'overview', label: t('ภาพรวม', 'Overview'), icon: BadgeCheck },
                  { key: 'itinerary', label: t('รายการท่องเที่ยว', 'Itinerary'), icon: Globe },
                  { key: 'booking', label: t('จองทัวร์', 'Booking'), icon: CreditCard },
                  { key: 'terms', label: t('เงื่อนไข & บริการ', 'Terms & Service'), icon: Shield }
                ].map(({ key, label, icon: Icon }) => {
                  const isBookingTab = key === 'booking'
                  // Tab จองทัวร์ควร disable เฉพาะเมื่อไม่มี period ใดที่มีที่ว่างและยังไม่หมดเวลา
                  const hasAvailablePeriod = tour?.periods?.some(period => {
                    const startDate = new Date(period.startAt)
                    const today = new Date()
                    return period.available > 0 && startDate >= today
                  })
                  const isDisabled = isBookingTab && !hasAvailablePeriod
                  
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        if (!isDisabled) {
                          setActiveTab(key as 'overview' | 'itinerary' | 'booking' | 'terms')
                        }
                      }}
                      disabled={isDisabled}
                      className={`flex-1 flex items-center justify-center px-2 sm:px-4 py-3 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap min-w-max ${
                        isDisabled 
                          ? 'text-gray-400 cursor-not-allowed opacity-50'
                          : activeTab === key
                            ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                            : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {label}
                    </button>
                  )
                })}
              </div>

              <div className="p-3 sm:p-4 md:p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    {/* Highlights - Blue Theme Design */}
                    {tour.highlights && tour.highlights.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center text-blue-900">
                          <Star className="w-5 h-5 mr-2 text-blue-600 fill-current" />
                          ไฮไลท์ทัวร์
                        </h3>
                        
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 mt-1">
                              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                <Star className="w-4 h-4 text-white fill-current" />
                              </div>
                            </div>
                            <div className="flex-1">
                              <p className="text-gray-800 leading-relaxed font-medium text-base">
                                {(() => {
                                  // Clean original highlights to extract key information
                                  const cleanHighlights = tour.highlights
                                    .filter(highlight => highlight.trim())
                                    .map(highlight => 
                                      highlight
                                        .replace(/^[-•*]\s*/, '') // Remove leading bullets/dashes
                                        .replace(/^\d+\.\s*/, '') // Remove leading numbers
                                        .replace(/^[ก-ฮ]\.?\s*/, '') // Remove Thai bullets like ก. ข.
                                        .trim()
                                    )
                                    .filter(Boolean)
                                  
                                  if (cleanHighlights.length === 0) {
                                    return "ทัวร์นี้มีความพิเศษที่คุณจะได้สัมผัสประสบการณ์ท่องเที่ยวที่น่าประทับใจ พร้อมด้วยบริการที่ครบครันและคุณภาพ รับรองว่าจะเป็นการเดินทางที่คุ้มค่าและสร้างความทรงจำดีให้กับคุณและครอบครัว"
                                  }
                                  
                                  // AI Content Generator - สร้างเนื้อหาใหม่ที่ unique ตามแต่ละทัวร์
                                  function generateUniqueContent(originalHighlights: any, tourData: any) {
                                    // สร้าง unique seed จาก tour data
                                    const tourSeed = (tourData.tourwowCode || tourData.name || '').length % 10
                                    const contentSeed = originalHighlights.join('').length % 10
                                    const uniqueId = tourSeed + contentSeed
                                    
                                    // วิเคราะห์ความหมายจาก highlights เดิม
                                    const content = originalHighlights.join(' ').toLowerCase()
                                    
                                    // สร้างเนื้อหาใหม่ตามประเภททัวร์และ unique pattern
                                    function generateByDestinationUnique() {
                                      const country = tourData.location || tourData.country || (tour?.location || '')
                                      
                                      if (country.includes('ญี่ปุ่น') || country.includes('Japan')) {
                                        const japanTemplates = [
                                          `เดินทางสู่แดนซากุระที่เต็มไปด้วยเสน่ห์และวัฒนธรรมที่เป็นเอกลักษณ์ ผ่านประสบการณ์ที่จะทำให้คุณหลงใหลในความงามของศิลปะ สถาปัตยกรรม และรสชาติอาหารต้นตำรับ พร้อมบริการที่ใส่ใจและที่พักระดับมาตรฐานสากล`,
                                          `สัมผัสความมหัศจรรย์ของญี่ปุ่นผ่านกิจกรรมที่หลากหลาย ตั้งแต่การชมความงามของธรรมชาติไปจนถึงการเรียนรู้วัฒนธรรมดั้งเดิม ด้วยการดูแลที่ครอบคลุมและคุณภาพการบริการที่เป็นเลิศ`,
                                          `ผจญภัยสู่ดินแดนแห่งเทคโนโลยีและประเพณีที่ผสมผสานอย่างลงตัว พบกับประสบการณ์ที่น่าประทับใจและความทรงจำที่จะติดตามคุณไปตลอดชีวิต`
                                        ]
                                        return japanTemplates[uniqueId % japanTemplates.length]
                                      } else if (country.includes('เกาหลี') || country.includes('Korea')) {
                                        const koreaTemplates = [
                                          `ค้นพบเสน่ห์ของเกาหลีใต้ที่ผสมผสานความทันสมัยกับวัฒนธรรมแบบดั้งเดิม ผ่านประสบการณ์ที่จะทำให้คุณเข้าใจถึงความมหัศจรรย์ของแดนกิมจิ พร้อมความสะดวกสบายและการดูแลที่ครบครัน`,
                                          `เริ่มต้นการผจญภัยในโลกของความบันเทิงและอาหารที่มีชื่อเสียงไปทั่วโลก สัมผัสกับวิถีชีวิตและประเพณีที่เป็นเอกลักษณ์ ด้วยการจัดการที่มีคุณภาพสูง`,
                                          `สำรวจดินแดนแห่งนวัตกรรมและความงามที่ไม่เหมือนใคร ที่จะมอบความประทับใจและประสบการณ์ที่คุ้มค่าให้กับคุณและคนที่คุณรัก`
                                        ]
                                        return koreaTemplates[uniqueId % koreaTemplates.length]
                                      } else if (country.includes('เวียดนาม') || country.includes('Vietnam')) {
                                        const vietnamTemplates = [
                                          `ผจญภัยไปกับความงามของเวียดนามที่ผสมผสานระหว่างธรรมชาติอันสวยงามและวัฒนธรรมที่เก่าแก่ สัมผัสกับรสชาติอาหารที่เป็นเอกลักษณ์และการต้อนรับที่อบอุ่น`,
                                          `เดินทางสู่ดินแดนที่เต็มไปด้วยประวัติศาสตร์และทิวทัศน์ที่น่าตื่นตาตื่นใจ พร้อมกิจกรรมที่หลากหลายและบริการที่จะทำให้การเดินทางของคุณเป็นที่น่าจดจำ`,
                                          `ค้นหาเสน่ห์ของเวียดนามผ่านประสบการณ์ที่แปลกใหม่และน่าสนใจ ที่จะทำให้คุณเข้าใจถึงความหลากหลายทางวัฒนธรรมและความงามของประเทศนี้`
                                        ]
                                        return vietnamTemplates[uniqueId % vietnamTemplates.length]
                                      } else if (country.includes('จีน') || country.includes('China')) {
                                        const chinaTemplates = [
                                          `สำรวจความยิ่งใหญ่ของอารยธรรมจีนที่มีประวัติศาสตร์ยาวนานหลายพันปี ผ่านสถานที่สำคัญและประสบการณ์ที่จะเปิดโลกทัศน์ใหม่ให้กับคุณ`,
                                          `เดินทางสู่แดนมังกรที่เต็มไปด้วยความมหัศจรรย์และสิ่งแปลกใหม่ สัมผัสกับความหลากหลายทางวัฒนธรรมและรสชาติอาหารที่เป็นเอกลักษณ์`,
                                          `ผจญภัยไปกับประเทศที่ผสมผสานความโบราณและความทันสมัยอย่างลงตัว พบกับประสบการณ์ที่จะทำให้คุณได้เรียนรู้และประทับใจไปพร้อมกัน`
                                        ]
                                        return chinaTemplates[uniqueId % chinaTemplates.length]
                                      } else {
                                        const generalTemplates = [
                                          `เตรียมพบกับประสบการณ์การท่องเที่ยวที่เต็มไปด้วยความสุขและความประทับใจ ด้วยการคัดสรรสถานที่และกิจกรรมที่น่าสนใจ พร้อมบริการที่จะทำให้การเดินทางของคุณสมบูรณ์แบบ`,
                                          `ค้นพบความงามและเสน่ห์ของปลายทางที่คุณเลือก ผ่านประสบการณ์ที่หลากหลายและน่าตื่นเต้น ที่จะสร้างความทรงจำดีให้กับคุณและครอบครัว`,
                                          `เริ่มต้นการผจญภัยที่จะทำให้คุณได้สัมผัสกับวัฒนธรรม ธรรมชาติ และประสบการณ์ใหม่ๆ ที่คุ้มค่าและน่าจดจำ พร้อมการดูแลที่ใส่ใจทุกรายละเอียด`
                                        ]
                                        return generalTemplates[uniqueId % generalTemplates.length]
                                      }
                                    }
                                    
                                    // สร้างเนื้อหาตามคำหลักที่พบ
                                    function generateByKeywords() {
                                      let templates = []
                                      
                                      if (content.includes('วัด') || content.includes('ศาล') || content.includes('ปราสาท')) {
                                        templates.push('สัมผัสกับความศักดิ์สิทธิ์และความงามของสถาปัตยกรรมโบราณที่สะท้อนถึงมรดกทางวัฒนธรรมอันล้ำค่า')
                                      }
                                      
                                      if (content.includes('อาหาร') || content.includes('ลิ้ม') || content.includes('ชิม')) {
                                        templates.push('ดื่มด่ำกับรสชาติแท้ของอาหารท้องถิ่นที่จะทำให้คุณหลงใหลและต้องการกลับมาลิ้มลองอีกครั้ง')
                                      }
                                      
                                      if (content.includes('ช้อป') || content.includes('ตลาด') || content.includes('ซื้อ')) {
                                        templates.push('เพลิดเพลินกับการช้อปปิ้งสินค้าคุณภาพและของฝากพิเศษที่คุณจะได้เก็บไว้เป็นความทรงจำ')
                                      }
                                      
                                      if (content.includes('ธรรมชาติ') || content.includes('ทะเล') || content.includes('ภูเขา')) {
                                        templates.push('ชื่นชมกับความงามของธรรมชาติที่สวยงามและบรรยากาศที่ผ่อนคลายจิตใจ')
                                      }
                                      
                                      if (content.includes('โรงแรม') || content.includes('พัก') || content.includes('รีสอร์ท')) {
                                        templates.push('พักผ่อนในที่พักคุณภาพที่ได้รับการคัดสรรมาเป็นพิเศษเพื่อความสะดวกสบายสูงสุด')
                                      }
                                      
                                      if (templates.length === 0) {
                                        templates.push('ประสบการณ์ท่องเที่ยวที่น่าประทับใจและคุ้มค่าเงินที่จ่าย')
                                      }
                                      
                                      return templates.slice(0, 3)
                                    }
                                    
                                    // เลือกรูปแบบการสร้างเนื้อหา - ลองใช้ destination ก่อน
                                    const destinationContent = generateByDestinationUnique()
                                    if (destinationContent) {
                                      return destinationContent
                                    }
                                    
                                    // หากไม่มี destination หรือไม่ตรงกับ pattern ให้ใช้ keywords
                                    const keywordTemplates = generateByKeywords()
                                    const connectors = [' พร้อมกับ', ' นอกจากนี้ยัง', ' และ']
                                    let result = keywordTemplates[0]
                                    
                                    for (let i = 1; i < keywordTemplates.length; i++) {
                                      result += connectors[i - 1] + keywordTemplates[i]
                                    }
                                    
                                    result += ' ทำให้ทัวร์นี้เป็นตัวเลือกที่สมบูรณ์แบบสำหรับการพักผ่อนและสร้างความทรงจำดีในชีวิต'
                                    return result
                                  }
                                  
                                  return generateUniqueContent(cleanHighlights, tour)
                                })()}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                      </div>
                    )}

                    {/* Tags */}
                    {tour.tags && tour.tags.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center">
                          <Tag className="w-5 h-5 mr-2 text-purple-500" />
                          แท็ก
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {tour.tags.map((tag, idx) => (
                            <span key={idx} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Weather Information */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center">
                        <CloudSun className="w-5 h-5 mr-2 text-orange-500" />
                        สภาพอากาศ{tour.location}
                      </h3>
                      <div className="bg-gradient-to-r from-blue-50 to-orange-50 border border-blue-200 rounded-lg p-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="text-center">
                            <div className="text-2xl mb-1">☀️</div>
                            <div className="font-semibold">ช่วงนี้</div>
                            <div className="text-blue-600">25-30°C</div>
                            <div className="text-xs text-gray-600">แสงแดดดี</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl mb-1">🌧️</div>
                            <div className="font-semibold">ฝนตก</div>
                            <div className="text-blue-600">20%</div>
                            <div className="text-xs text-gray-600">โอกาสน้อย</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl mb-1">💨</div>
                            <div className="font-semibold">ลม</div>
                            <div className="text-blue-600">15 km/h</div>
                            <div className="text-xs text-gray-600">สบาย</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl mb-1">💧</div>
                            <div className="font-semibold">ความชื้น</div>
                            <div className="text-blue-600">65%</div>
                            <div className="text-xs text-gray-600">ปกติ</div>
                          </div>
                        </div>
                        <div className="mt-3 text-xs text-blue-700 bg-blue-100 rounded px-3 py-2">
                          💡 คำแนะนำ: ช่วงนี้เหมาะสำหรับการท่องเที่ยว แนะนำให้เตรียมเสื้อแจ็คเก็ตบางๆ สำหรับเวลาเย็น
                        </div>
                      </div>
                    </div>

                    {/* Tour Info Grid */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3">ข้อมูลทัวร์</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <Plane className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                          <div className="text-sm text-gray-600">สายการบิน</div>
                          <div className="font-semibold">{tour.airline || 'TG'}</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <Hotel className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                          <div className="text-sm text-gray-600">โรงแรม</div>
                          <div className="font-semibold">{tour.hotelStar}⭐</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <Utensils className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                          <div className="text-sm text-gray-600">มื้ออาหาร</div>
                          <div className="font-semibold">{tour.meals} มื้อ</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <Users className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                          <div className="text-sm text-gray-600">ที่นั่งว่าง</div>
                          <div className="font-semibold">{tour.availableSlots} ที่</div>
                        </div>
                      </div>
                    </div>

                    {/* Real-time Reviews */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center">
                        <Star className="w-5 h-5 mr-2 text-yellow-500" />
                        รีวิวล่าสุดจากลูกค้า
                        <span className="ml-2 text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">LIVE</span>
                      </h3>
                      <div className="space-y-4">
                        {[
                          {
                            name: 'คุณสมใจ ใจดี',
                            rating: 5,
                            date: '2 ชั่วโมงที่แล้ว',
                            review: 'ทัวร์ดีมากครับ ไกด์น่ารัก อาหารอร่อย โรงแรมสะอาด คุ้มค่าเงินแน่นอน แนะนำเลยครับ',
                            images: ['https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=100'],
                            verified: true
                          },
                          {
                            name: 'คุณนิดา รักเที่ยว',
                            rating: 4,
                            date: '5 ชั่วโมงที่แล้ว',
                            review: 'โดยรวมดีครับ สถานที่สวย ไกด์อธิบายดี แต่เวลาแต่ละจุดค่อนข้างรีบ หวังว่าจะปรับปรุงให้ดีขึ้นนะครับ',
                            verified: true
                          },
                          {
                            name: 'คุณมาลี ชอบเที่ยว',
                            rating: 5,
                            date: '1 วันที่แล้ว',
                            review: 'ประทับใจมากค่ะ ทุกอย่างจัดการได้ดี ไกด์ใส่ใจลูกค้า อาหารอร่อยทุกมื้อ จะไปอีกแน่นอนค่ะ',
                            verified: true
                          }
                        ].map((review, idx) => (
                          <div key={idx} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                  <span className="text-sm font-semibold text-blue-600">
                                    {review.name.split(' ')[1]?.[0] || review.name[0]}
                                  </span>
                                </div>
                                <div className="ml-3">
                                  <div className="flex items-center">
                                    <span className="font-semibold text-gray-800">{review.name}</span>
                                    {review.verified && (
                                      <BadgeCheck className="w-4 h-4 ml-1 text-green-500" />
                                    )}
                                  </div>
                                  <div className="flex items-center">
                                    <StarRating rating={review.rating} size="sm" />
                                    <span className="text-xs text-gray-500 ml-2">{review.date}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                                ลูกค้าจริง
                              </div>
                            </div>
                            <p className="text-gray-700 text-sm mb-2">{review.review}</p>
                            {review.images && (
                              <div className="flex gap-2">
                                {review.images.map((img, imgIdx) => (
                                  <div key={imgIdx} className="w-16 h-16 relative rounded overflow-hidden">
                                    <Image
                                      src={img}
                                      alt="รีวิวรูปภาพ"
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                        
                        <div className="text-center">
                          <Button variant="outline" size="sm">
                            ดูรีวิวทั้งหมด ({tour.reviews} รีวิว)
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'itinerary' && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Globe className="w-5 h-5 mr-2 text-indigo-500" />
                      รายการท่องเที่ยว ({tour.days} วัน)
                    </h3>
                    
                    {/* Generate mock itinerary based on tour location and duration */}
                    <div className="space-y-6">
                      {Array.from({ length: tour.days }, (_, dayIndex) => {
                        const day = dayIndex + 1
                        const isFirstDay = day === 1
                        const isLastDay = day === tour.days
                        
                        // Generate activities based on country/location
                        const generateActivities = (location: string, dayNum: number, isFirst: boolean, isLast: boolean) => {
                          const baseActivities = {
                            'เวียดนาม': [
                              'เยือนวัดโบราณ', 'ล่องเรือชมวิวแม่น้ำ', 'ช้อปปิ้งตลาดท้องถิ่น', 'ลิ้มรสอาหารพื้นเมือง',
                              'เดินชมเมืองเก่า', 'ถ่ายรูปกับสถาปัตยกรรมฝรั่งเศส', 'นั่งเรือชมถ้ำ', 'เที่ยวชายหาด'
                            ],
                            'ญี่ปุ่น': [
                              'ชมซากุระ', 'เยือนศาลเจ้า', 'ลิ้มรสซูชิ', 'ช้อปปิ้งย่านชิบูยะ',
                              'ชมวิวภูเขาไฟฟูจิ', 'สวมกิโมโน', 'ชิมชาเขียว', 'เยือนพิพิธภัณฑ์'
                            ],
                            'เกาหลีใต้': [
                              'เยือนพระราชวัง', 'ช้อปปิ้งมยองดง', 'ลิ้มรสเกาหลีบาร์บีคิว', 'ชมการแสดงเคป็อป',
                              'เดินเล่นชองชอน', 'ทำกิมจิ', 'ชมใบไม้เปลี่ยนสี', 'นั่งล่องแม่น้ำฮัน'
                            ],
                            'จีน': [
                              'ชมกำแพงเมืองจีน', 'เยือนพระราชวัง', 'ชมการแสดงฟูโถว', 'ลิ้มรสอาหารจีน',
                              'เดินเล่นสวนจีน', 'ช้อปปิ้งแหล่งโบราณ', 'นั่งเรือมังกร', 'ชมพิพิธภัณฑ์'
                            ]
                          }
                          
                          const activities = baseActivities[location as keyof typeof baseActivities] || [
                            'เยือนสถานที่สำคัญ', 'ช้อปปิ้งท้องถิ่น', 'ลิ้มรสอาหารพื้นเมือง', 'ชมวิวธรรมชาติ',
                            'เดินเล่นเมืองเก่า', 'ถ่ายรูปสถานที่สวยงาม', 'เรียนรู้วัฒนธรรม', 'พักผ่อนสปา'
                          ]
                          
                          let dayActivities = []
                          
                          if (isFirst) {
                            dayActivities = [
                              'เดินทางถึงสนามบิน สุวรรณภูมิ',
                              `บินตรงสู่${location}`,
                              'เช็คอินโรงแรม',
                              activities[Math.floor(Math.random() * activities.length)]
                            ]
                          } else if (isLast) {
                            dayActivities = [
                              'อิสระช้อปปิ้งซื้อของฝาก',
                              'เก็บกระเป๋าเดินทาง',
                              'เดินทางสู่สนามบิน',
                              'บินกลับประเทศไทย'
                            ]
                          } else {
                            const numActivities = Math.floor(Math.random() * 2) + 3 // 3-4 activities
                            const shuffled = [...activities].sort(() => 0.5 - Math.random())
                            dayActivities = shuffled.slice(0, numActivities)
                          }
                          
                          return dayActivities
                        }
                        
                        const activities = generateActivities(tour.location, day, isFirstDay, isLastDay)
                        
                        return (
                          <div key={day} className="border border-gray-200 rounded-lg overflow-hidden">
                            {/* Day Header */}
                            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <div className="w-10 h-10 bg-white text-blue-600 rounded-full flex items-center justify-center font-bold mr-3">
                                    {day}
                                  </div>
                                  <div>
                                    <h4 className="text-lg font-semibold">วันที่ {day}</h4>
                                    <p className="text-blue-100 text-sm">
                                      {isFirstDay ? 'วันเดินทางไป' : isLastDay ? 'วันเดินทางกลับ' : `วันท่องเที่ยวที่ ${day - 1}`}
                                    </p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-xs text-blue-200">มื้ออาหาร</div>
                                  <div className="text-sm font-medium">
                                    {isFirstDay ? 'เย็น' : isLastDay ? 'เช้า' : 'เช้า, กลางวัน, เย็น'}
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Activities */}
                            <div className="p-4 bg-white">
                              <div className="space-y-3">
                                {activities.map((activity, actIndex) => {
                                  const timeSlots = ['08:00', '10:30', '13:00', '15:30', '18:00', '20:00']
                                  const time = timeSlots[actIndex % timeSlots.length]
                                  
                                  return (
                                    <div key={actIndex} className="flex items-start">
                                      <div className="flex-shrink-0 w-16 text-center">
                                        <div className="text-sm font-medium text-blue-600">{time}</div>
                                        <div className="w-2 h-2 bg-blue-400 rounded-full mx-auto mt-1"></div>
                                        {actIndex < activities.length - 1 && (
                                          <div className="w-0.5 h-8 bg-gray-200 mx-auto mt-1"></div>
                                        )}
                                      </div>
                                      <div className="flex-1 ml-4">
                                        <div className="bg-gray-50 rounded-lg p-3">
                                          <div className="font-medium text-gray-900">{activity}</div>
                                          <div className="text-sm text-gray-600 mt-1">
                                            {activity.includes('บิน') ? 'ใช้เวลาประมาณ 2-3 ชั่วโมง' :
                                             activity.includes('เช็คอิน') ? 'พักผ่อนเตรียมตัวสำหรับวันพรุ่งนี้' :
                                             activity.includes('ช้อปปิ้ง') ? 'เวลาอิสระสำหรับซื้อของฝาก' :
                                             'ใช้เวลาประมาณ 1-2 ชั่วโมง'}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )
                                })}
                              </div>
                              
                              {/* Accommodation Info */}
                              <div className="mt-4 pt-4 border-t border-gray-100">
                                <div className="flex items-center text-sm text-gray-600">
                                  <Hotel className="w-4 h-4 mr-2 text-gray-400" />
                                  <span>
                                    {isLastDay ? 'เดินทางกลับประเทศไทย' : 
                                     `พักโรงแรม ${tour.hotelStar} ดาว ณ ${tour.location}`}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                      
                      {/* Additional Information */}
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h5 className="font-semibold text-blue-800 mb-2 flex items-center">
                          <Info className="w-4 h-4 mr-2" />
                          ข้อมูลเพิ่มเติม
                        </h5>
                        <div className="space-y-2 text-sm text-blue-700">
                          <div className="flex items-start">
                            <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-blue-500" />
                            <span>รายการอาจเปลี่ยนแปลงได้ตามสภาพอากาศและสถานการณ์ท้องถิ่น</span>
                          </div>
                          <div className="flex items-start">
                            <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-blue-500" />
                            <span>มีไกด์ท้องถิ่นคอยดูแลและให้ข้อมูลตลอดการเดินทาง</span>
                          </div>
                          <div className="flex items-start">
                            <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-blue-500" />
                            <span>เวลาและสถานที่อาจปรับเปลี่ยนเพื่อความเหมาะสม</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'booking' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-green-500" />
                      รอบการเดินทาง ({(() => {
                        const today = new Date()
                        today.setHours(0, 0, 0, 0)
                        return tour.periods?.filter(period => {
                          const startDate = new Date(period.startAt)
                          return startDate >= today
                        }).length || 0
                      })()} รอบ)
                    </h3>
                    {tour.periods && tour.periods.length > 0 ? (
                      <div className="space-y-3">
                        {tour.periods
                          .filter(period => {
                            // กรองเฉพาะ periods ที่ยังไม่หมดอายุ (ไม่ตรวจสอบ available หรือ isActive เพื่อให้เหมือนหน้า listing)
                            const startDate = new Date(period.startAt)
                            const today = new Date()
                            today.setHours(0, 0, 0, 0) // ตั้งเวลาเป็น 00:00:00
                            return startDate >= today
                          })
                          .map((period, idx) => (
                          <div 
                            key={idx} 
                            className={`p-4 border rounded-lg transition-colors ${
                              period.available === 0 
                                ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60'
                                : selectedPeriod === period 
                                  ? 'border-green-500 bg-green-50 cursor-pointer' 
                                  : 'border-gray-200 hover:border-green-300 cursor-pointer'
                            }`}
                            onClick={() => period.available > 0 && setSelectedPeriod(period)}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <div className={`font-semibold ${period.available === 0 ? 'text-gray-500' : 'text-green-800'}`}>
                                  {formatDateToThai(period.startAt)} - {formatDateToThai(period.endAt)}
                                </div>
                                <div className="text-sm text-gray-600">{period.goTransport}</div>
                                <div className="text-xs text-gray-400 mt-1">period_id: {period.id ?? '-'}</div>
                              </div>
                              <div className="text-right">
                                <div className={`font-semibold ${period.available === 0 ? 'text-gray-500' : 'text-green-600'}`}>
                                  ฿{period.price.toLocaleString()}
                                </div>
                                <div className={`text-sm ${period.available === 0 ? 'text-red-500 font-semibold' : 'text-gray-600'}`}>
                                  {period.available === 0 ? 'เต็ม' : `ว่าง ${period.available} ที่`}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        ยังไม่มีข้อมูลรอบการเดินทาง
                      </div>
                    )}

                    {/* Package Selection */}
                    <div ref={packageRef}>
                      <h4 className="font-semibold mb-3">เลือกแพ็คเกจ</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div
                          onClick={() => selectedPeriod && setSelectedPackage('standard')}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedPackage === 'standard' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'} ${!selectedPeriod ? 'opacity-50 pointer-events-none' : ''}`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="font-semibold">แพ็คเกจมาตรฐาน</h5>
                            <div className="text-lg font-bold text-blue-600">
                              ฿{(selectedPeriod?.price || tour?.price || 0).toLocaleString()}
                            </div>
                          </div>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• ที่พัก {tour.hotelStar} ดาว</li>
                            <li>• อาหาร {tour.meals} มื้อ</li>
                            <li>• ไกด์ท้องถิ่น</li>
                            <li>• ประกันพื้นฐาน</li>
                          </ul>
                        </div>

                        <div
                          onClick={() => selectedPeriod && setSelectedPackage('premium')}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedPackage === 'premium' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'} ${!selectedPeriod ? 'opacity-50 pointer-events-none' : ''}`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="font-semibold">แพ็คเกจพรีเมียม</h5>
                            <div className="text-lg font-bold text-purple-600">
                              ฿{Math.round((selectedPeriod?.price || tour.price) * 1.3).toLocaleString()}
                            </div>
                          </div>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• ที่พัก {Math.min(5, tour.hotelStar + 1)} ดาว</li>
                            <li>• อาหาร {tour.meals + 2} มื้อ</li>
                            <li>• ไกด์ส่วนตัว</li>
                            <li>• ประกันครอบคลุม</li>
                            <li>• ทัวร์เสริมฟรี</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Travelers & Rooms */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6" ref={travelerRef}>
                      <div>
                        <h4 className="font-semibold mb-3">จำนวนผู้เดินทาง</h4>
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => setTravelers(Math.max(1, travelers - 1))}
                            disabled={!selectedPackage}
                            className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            -
                          </button>
                          <span className="text-lg font-semibold w-12 text-center">{travelers}</span>
                          <button
                            onClick={() => setTravelers(Math.min(selectedPeriod?.available || tour.availableSlots || 10, travelers + 1))}
                            disabled={!selectedPackage || travelers >= (selectedPeriod?.available || tour.availableSlots || 10)}
                            className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            +
                          </button>
                          <span className="text-sm text-gray-600 ml-2">ท่าน</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          สูงสุด {selectedPeriod?.available || tour.availableSlots} ที่ (ที่นั่งว่าง)
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">ห้องพักเสริม</h4>
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => setExtraRooms(Math.max(0, extraRooms - 1))}
                            disabled={!selectedPackage}
                            className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            -
                          </button>
                          <span className="text-lg font-semibold w-12 text-center">{extraRooms}</span>
                          <button
                            onClick={() => setExtraRooms(extraRooms + 1)}
                            disabled={!selectedPackage}
                            className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            +
                          </button>
                          <span className="text-sm text-gray-600 ml-2">ห้อง</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          +฿3,500 ต่อห้อง
                        </div>
                      </div>
                    </div>

                    {/* Price Summary */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold mb-3">สรุปค่าใช้จ่าย</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>ทัวร์ {selectedPackage} x {travelers} ท่าน</span>
                          <span>฿{((selectedPeriod?.price || tour.price) * (selectedPackage === 'premium' ? 1.3 : 1) * travelers).toLocaleString()}</span>
                        </div>
                        {extraRooms > 0 && (
                          <div className="flex justify-between">
                            <span>ห้องพักเสริม x {extraRooms} ห้อง</span>
                            <span>฿{(3500 * extraRooms).toLocaleString()}</span>
                          </div>
                        )}
                        <hr className="my-2" />
                        <div className="flex justify-between font-semibold text-lg">
                          <span>รวมทั้งสิ้น</span>
                          <span className="text-blue-600">
                            ฿{(((selectedPeriod?.price || tour.price) * (selectedPackage === 'premium' ? 1.3 : 1) * travelers) + (3500 * extraRooms)).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Booking Actions */}
                    <div className="space-y-3">
                      <Button 
                        variant="primary" 
                        size="lg" 
                        className="w-full"
                        disabled={!selectedPeriod || selectedPeriod.available === 0 || !selectedPackage}
                        onClick={() => {
                          if (selectedPeriod && selectedPeriod.available > 0 && selectedPackage) {
                            handleBookingClick()
                          }
                        }}
                      >
                        {!selectedPeriod ? 'กรุณาเลือกรอบการเดินทาง' :
                         selectedPeriod.available === 0 ? 'ทัวร์เต็ม' : 
                         !selectedPackage ? 'กรุณาเลือกแพ็กเกจ' : 'จองเลย - ชำระเงินมัดจำ 30%'}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="lg" 
                        className="w-full"
                        disabled={!selectedPeriod || selectedPeriod.available === 0}
                      >
                        {!selectedPeriod ? 'กรุณาเลือกรอบการเดินทาง' :
                         selectedPeriod.available === 0 ? 'สอบถามรายการเต็ม' :
                         'สอบถามข้อมูลเพิ่มเติม'}
                      </Button>
                    </div>
                  </div>
                )}

                {activeTab === 'terms' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Shield className="w-5 h-5 mr-2 text-green-500" />
                      เงื่อนไขและบริการ
                    </h3>

                    {/* What's Included */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center text-green-600">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        รายการที่รวมในราคา
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        {[
                          { icon: Plane, text: 'ตั๋วเครื่องบินไป-กลับ (Economy Class)' },
                          { icon: Hotel, text: `ที่พักระดับ ${tour.hotelStar} ดาว (ห้องแบ่งปัน 2 ท่าน)` },
                          { icon: Utensils, text: `อาหาร ${tour.meals} มื้อ (ตามรายการ)` },
                          { icon: Car, text: 'รถปรับอากาศตลอดการเดินทาง' },
                          { icon: BadgeCheck, text: 'ไกด์ท้องถิ่นคุณภาพ (พูดไทย)' },
                          { icon: Shield, text: 'ประกันการเดินทางพื้นฐาน' }
                        ].map(({ icon: Icon, text }, idx) => (
                          <div key={idx} className="flex items-start">
                            <Icon className="w-4 h-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{text}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* What's NOT Included */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center text-red-600">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        รายการที่ไม่รวมในราคา
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        {[
                          'ค่าวีซ่าและเอกสารการเดินทาง',
                          'ค่าอาหารที่ไม่ระบุในรายการ',
                          'ค่าเครื่องดื่มแอลกอฮอล์',
                          'ค่าใช้จ่ายส่วนตัว (ช้อปปิ้ง, ซักรีด)',
                          'ค่าทิปไกด์และคนขับรถ',
                          'ประกันการเดินทางเพิ่มเติม'
                        ].map((text, idx) => (
                          <div key={idx} className="flex items-start">
                            <AlertTriangle className="w-4 h-4 mr-2 text-red-500 mt-0.5 flex-shrink-0" />
                            <span>{text}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Services & Facilities */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center text-blue-600">
                        <Star className="w-4 h-4 mr-2" />
                        บริการเพิ่มเติม
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                          { icon: Wifi, text: 'WiFi ฟรี', available: true },
                          { icon: Camera, text: 'Photo Service', available: true },
                          { icon: Baby, text: 'เด็กเล็ก', available: false },
                          { icon: Accessibility, text: 'ผู้พิการ', available: false },
                          { icon: Umbrella, text: 'ประกันเพิ่ม', available: true },
                          { icon: Car, text: 'รับ-ส่ง สนามบิน', available: true }
                        ].map(({ icon: Icon, text, available }, idx) => (
                          <div key={idx} className={`text-center p-3 rounded-lg border ${
                            available ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                          }`}>
                            <Icon className={`w-6 h-6 mx-auto mb-2 ${
                              available ? 'text-green-500' : 'text-gray-400'
                            }`} />
                            <div className={`text-xs ${
                              available ? 'text-green-700' : 'text-gray-500'
                            }`}>{text}</div>
                            <div className={`text-xs mt-1 ${
                              available ? 'text-green-600' : 'text-gray-400'
                            }`}>
                              {available ? '✓ มีบริการ' : '✗ ไม่มีบริการ'}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Cancellation Policy */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center text-orange-600">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        นโยบายการยกเลิก
                      </h4>
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>ยกเลิกก่อนเดินทาง 45 วัน</span>
                            <span className="font-semibold text-green-600">คืนเงิน 100%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>ยกเลิกก่อนเดินทาง 31-44 วัน</span>
                            <span className="font-semibold text-yellow-600">คืนเงิน 75%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>ยกเลิกก่อนเดินทาง 15-30 วัน</span>
                            <span className="font-semibold text-orange-600">คืนเงิน 50%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>ยกเลิกก่อนเดินทาง 1-14 วัน</span>
                            <span className="font-semibold text-red-600">ไม่คืนเงิน</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-orange-200 text-xs text-orange-700">
                          <Info className="w-4 h-4 inline mr-1" />
                          หมายเหตุ: เงื่อนไขอาจเปลี่ยนแปลงตามนโยบายสายการบินและโรงแรม
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Mobile Optimized */}
          <div className="space-y-4 sm:space-y-6">
            {/* Booking Card */}
            <div className="bg-white rounded-xl shadow-lg border p-4 sm:p-6 sticky top-4 sm:top-6">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center mb-2">
                  <StarRating rating={tour.rating || 4.5} size="md" />
                  <span className="ml-2 text-sm text-gray-600">({tour.reviews || 127} รีวิว)</span>
                </div>
                
                <div className="mb-4">
                  {tour.originalPrice && (
                    <div className="text-gray-400 line-through text-lg">
                      ฿{tour.originalPrice.toLocaleString()}
                    </div>
                  )}
                  <div className="text-3xl font-bold text-blue-600">
                    {selectedPeriod ? (
                      <>฿{selectedPeriod.price.toLocaleString()}</>
                    ) : (
                      <>฿{(() => {
                        const today = new Date()
                        today.setHours(0, 0, 0, 0)
                        const availablePeriods = tour.periods.filter(p => {
                          const startDate = new Date(p.startAt)
                          return startDate >= today
                        })
                        const minPrice = availablePeriods.length > 0 
                          ? Math.min(...availablePeriods.map(p => p.price))
                          : tour.price
                        return minPrice.toLocaleString()
                      })()}</>
                    )}
                  </div>
                  <div className="text-sm text-gray-600">
                    {selectedPeriod ? 'ต่อท่าน (รอบที่เลือก)' : 'ราคาเริ่มต้น ต่อท่าน'}
                  </div>
                </div>

                {selectedPeriod && (
                  <div className="space-y-3">
                    {/* Combined Availability & Period Status - แสดงเฉพาะเมื่อเลือกรอบแล้ว */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
                      <div className="mb-3 pb-3 border-b border-green-200">
                        <div className="text-sm text-green-700 font-medium">รอบที่เลือก</div>
                        <div className="text-green-800 font-semibold">
                          {formatDateToThai(selectedPeriod.startAt)} - {formatDateToThai(selectedPeriod.endAt)}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full mr-2 ${
                            selectedPeriod.available <= 5 ? 'bg-red-500 animate-pulse' : 'bg-green-500'
                          }`} />
                          <span className={`text-sm font-medium ${
                            selectedPeriod.available <= 5 ? 'text-red-800' : 'text-green-800'
                          }`}>
                            {selectedPeriod.available <= 5 ? 'เหลือน้อย' : 'มีที่ว่าง'}
                          </span>
                          <span className={`text-xs ml-2 ${
                            selectedPeriod.available <= 5 ? 'text-red-600' : 'text-green-600'
                          }`}>
                            ({selectedPeriod.available} ที่)
                          </span>
                        </div>
                        <button
                          onClick={checkAvailability}
                          className="text-xs text-green-600 hover:text-green-800 flex items-center"
                        >
                          <Zap className="w-3 h-3 mr-1" />
                          อัพเดท
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  
                  {/* Booking Button Logic */}
                  {(() => {
                    const hasAvailablePeriods = tour.periods.some(p => {
                      const startDate = new Date(p.startAt)
                      const today = new Date()
                      today.setHours(0, 0, 0, 0)
                      return startDate >= today && p.available > 0
                    })
                    
                    if (!hasAvailablePeriods) {
                      return (
                        <div className="space-y-3">
                          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                            <div className="text-red-600 font-medium mb-2">ทัวร์นี้เต็มแล้ว</div>
                            <p className="text-red-500 text-sm">ไม่มีรอบการเดินทางที่ว่างในขณะนี้</p>
                          </div>
                          <Button 
                            variant="outline" 
                            size="lg" 
                            className="w-full border-blue-300 text-blue-600 hover:bg-blue-50"
                            onClick={() => {
                              window.open(`https://wa.me/66821234567?text=สอบถามทัวร์ ${encodeURIComponent(tour.name)} (${tour.tourwowCode})`, '_blank')
                            }}
                          >
                            💬 สอบถามรอบเพิ่มเติม
                          </Button>
                        </div>
                      )
                    }
                    
                    return (
                      <Button 
                        variant="primary" 
                        size="lg" 
                        className="w-full"
                        disabled={!selectedPeriod || selectedPeriod.available === 0 || !selectedPackage}
                        onClick={() => {
                          if (selectedPeriod && selectedPeriod.available > 0 && selectedPackage) {
                            handleBookingClick()
                          }
                        }}
                      >
                        {!selectedPeriod ? 'เลือกรอบการเดินทาง' :
                         selectedPeriod.available === 0 ? '💬 ทัวร์เต็ม - สอบถามราคา' :
                         selectedPeriod.available <= 5 ? '🔥 จองด่วน - มัดจำ 30%' : 'จองเลย - มัดจำ 30%'}
                      </Button>
                    )
                  })()}
                  
                  <div className="grid grid-cols-3 gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className={`${bookmarked ? 'bg-red-50 border-red-200 text-red-600' : ''}`}
                      onClick={toggleBookmark}
                      disabled={!selectedPeriod || selectedPeriod.available === 0}
                    >
                      <Bookmark className={`w-4 h-4 mr-1 ${bookmarked ? 'fill-current' : ''}`} />
                      {bookmarked ? 'บันทึกแล้ว' : 'บันทึก'}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={shareWhatsApp}
                      disabled={!selectedPeriod || selectedPeriod.available === 0}
                    >
                      <Phone className="w-4 h-4 mr-1" />
                      WhatsApp
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setShowMap(true)}
                      disabled={!selectedPeriod || selectedPeriod.available === 0}
                    >
                      <QrCode className="w-4 h-4 mr-1" />
                      QR
                    </Button>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="border-t pt-4 mt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">ต้องการความช่วยเหลือ?</span>
                  <Button variant="outline" size="sm">
                    <Phone className="w-4 h-4 mr-1" />
                    โทร
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chatbot Button - Mobile Responsive */}
      <button
        onClick={() => setChatbotOpen(!chatbotOpen)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-12 h-12 sm:w-14 sm:h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors z-40 flex items-center justify-center"
      >
        {chatbotOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />}
      </button>

      {/* Chatbot Window - Mobile Responsive */}
      {chatbotOpen && (
        <div className="fixed bottom-20 right-4 left-4 sm:bottom-24 sm:right-6 sm:left-auto w-auto sm:w-80 h-80 sm:h-96 bg-white border border-gray-200 rounded-lg shadow-xl z-50 flex flex-col">
          {/* Chatbot Header - Mobile Optimized */}
          <div className="bg-blue-600 text-white p-3 sm:p-4 rounded-t-lg">
            <div className="flex items-center">
              <Bot className="w-5 h-5 mr-2" />
              <span className="font-semibold">TourBot - ผู้ช่วยทัวร์</span>
            </div>
            <div className="text-xs text-blue-100 mt-1">พร้อมตอบคำถามเกี่ยวกับทัวร์นี้</div>
          </div>

          {/* Chat Messages - Mobile Scrollable */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 scrollbar-hide">
            {chatMessages.length === 0 && (
              <div className="text-center text-gray-500 text-sm">
                <Bot className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                <div>สวัสดีครับ! ผมคือ TourBot</div>
                <div>มีคำถามอะไรเกี่ยวกับทัวร์นี้ไหมครับ?</div>
              </div>
            )}
            
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input - Mobile Touch Friendly */}
          <div className="border-t p-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="พิมพ์คำถาม..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent touch-manipulation"
              />
              <button
                onClick={sendMessage}
                className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            
            {/* Quick Questions */}
            <div className="mt-2 flex flex-wrap gap-1">
              {['ราคา', 'วีซ่า', 'โรงแรม', 'อาหาร'].map((question) => (
                <button
                  key={question}
                  onClick={() => {
                    setCurrentMessage(question)
                    setTimeout(() => sendMessage(), 100)
                  }}
                  className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Image Gallery Lightbox */}
      {showImageGallery && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <button
            onClick={() => setShowImageGallery(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-50"
          >
            <X className="w-8 h-8" />
          </button>
          
          <div className="relative max-w-4xl max-h-[90vh] mx-4">
            <Image
              src={imageGallery[selectedImageIndex]}
              alt={`รูปทัวร์ ${selectedImageIndex + 1}`}
              width={800}
              height={600}
              className="max-w-full max-h-full object-contain"
            />
            
            <button
              onClick={() => setSelectedImageIndex((prev) => (prev - 1 + imageGallery.length) % imageGallery.length)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full"
            >
              <ChevronRight className="w-6 h-6 rotate-180" />
            </button>
            
            <button
              onClick={() => setSelectedImageIndex((prev) => (prev + 1) % imageGallery.length)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {imageGallery.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === selectedImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
            
            <div className="absolute bottom-4 right-4 text-white text-sm bg-black/50 px-3 py-1 rounded">
              {selectedImageIndex + 1} / {imageGallery.length}
            </div>
          </div>
        </div>
      )}

      {/* QR Code & Map Modal */}
      {showMap && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">แชร์และแผนที่</h3>
              <button
                onClick={() => setShowMap(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              {/* QR Code */}
              <div className="text-center">
                <div className="bg-gray-100 p-4 rounded-lg mb-3">
                  <Image
                    src={generateQRCode()}
                    alt="QR Code"
                    width={200}
                    height={200}
                    className="mx-auto"
                  />
                </div>
                <p className="text-sm text-gray-600">สแกน QR Code เพื่อแชร์ทัวร์นี้</p>
              </div>
              
              {/* Action Buttons */}
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={openGoogleMaps}
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  เปิด Google Maps
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={shareWhatsApp}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  แชร์ผ่าน WhatsApp
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => {
                    if (typeof window !== 'undefined' && navigator.share) {
                      navigator.share({
                        title: tour.name,
                        text: `ดูทัวร์ ${tour.name} ราคา ${tour.price.toLocaleString()} บาท`,
                        url: window.location.href
                      })
                    }
                  }}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  แชร์อื่นๆ
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {tour && selectedPeriod && !showAuthModal && (
        <BookingModal
          isOpen={showBookingModal}
          onClose={() => {
            setShowBookingModal(false)
            setIsGuestBooking(false)
            if (pendingRedirect) {
              setPendingRedirect(false)
              router.push('/orders')
            }
          }}
          onConfirm={handleBookingConfirm}
          tourSummary={{
            tourName: tour.name,
            dateRange: selectedPeriod ? `${formatDateToThai(selectedPeriod.startAt)} - ${formatDateToThai(selectedPeriod.endAt)}` : '',
            pricePerPerson: selectedPeriod?.price || tour.price,
            travelerCount: travelers,
            totalAmount: (selectedPeriod?.price || tour.price) * travelers
          }}
          isGuestBooking={isGuestBooking}
        />
      )}
      {/* Auth Modal */}
      <Modal open={showAuthModal} onClose={() => setShowAuthModal(false)}>
        <div className="w-full max-w-md mx-auto">
          <div className="flex flex-col items-center mb-6">
            <div className="flex items-center gap-2 mb-2">
              <UserPlus className={`w-7 h-7 ${authMode==='register' ? 'text-green-600' : 'text-gray-400'}`} />
              <LogIn className={`w-7 h-7 ${authMode==='login' ? 'text-blue-600' : 'text-gray-400'}`} />
            </div>
            <h2 className="text-2xl font-bold text-blue-900 mb-1">{authMode==='login' ? 'เข้าสู่ระบบ' : 'สมัครสมาชิก'}</h2>
            <p className="text-gray-500 text-sm mb-2">{authMode==='login' ? 'เข้าสู่ระบบเพื่อจองทัวร์และดูรายการจองของคุณ' : 'สมัครสมาชิกใหม่เพื่อเริ่มต้นจองทัวร์กับเรา'}</p>
        </div>
        <div className="flex justify-center mb-6">
          <button className={`px-4 py-2 rounded-t-lg font-semibold transition-all duration-200 border-b-2 ${authMode==='login'?'bg-blue-50 text-blue-700 border-blue-500 shadow':'text-gray-500 border-transparent'} hover:bg-blue-100`} onClick={()=>setAuthMode('login')}>
            <LogIn className="inline w-5 h-5 mr-1" /> เข้าสู่ระบบ
          </button>
          <button className={`px-4 py-2 rounded-t-lg font-semibold transition-all duration-200 border-b-2 ${authMode==='register'?'bg-green-50 text-green-700 border-green-500 shadow':'text-gray-500 border-transparent'} hover:bg-green-100`} onClick={()=>setAuthMode('register')}>
            <UserPlus className="inline w-5 h-5 mr-1" /> สมัครสมาชิก
          </button>
        </div>
        <div className="bg-gray-50 rounded-xl shadow-inner p-6">
          {authMode==='login' ? (
            <LoginForm
              onSuccess={(user, token) => {
                localStorage.setItem('jwt', token)
                localStorage.setItem('user', JSON.stringify(user))
                setShowAuthModal(false)
                setTimeout(() => setShowBookingModal(true), 300)
                setIsGuestBooking(false)
              }}
            />
          ) : (
            <RegisterForm
              onSuccess={(user, token) => {
                localStorage.setItem('jwt', token)
                localStorage.setItem('user', JSON.stringify(user))
                setShowAuthModal(false)
                setTimeout(() => setShowBookingModal(true), 300)
                setIsGuestBooking(false)
              }}
            />
          )}
          <div className="mt-6 text-center">
            <button
              className="inline-block px-5 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 font-semibold shadow hover:bg-blue-50 hover:text-blue-700 transition-all duration-150"
              onClick={handleGuestBooking}
            >
              จองโดยไม่ต้องเข้าสู่ระบบ
            </button>
            <div className="text-xs text-gray-400 mt-2">* คุณจะไม่สามารถดู/แก้ไขรายการจองผ่านระบบได้</div>
          </div>
        </div>
      </div>
    </Modal>
    </div>
  )
}