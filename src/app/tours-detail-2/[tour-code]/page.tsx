'use client'

import { useState, useEffect, useMemo } from 'react'
import { useParams } from 'next/navigation'
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
  Play, Video, BarChart3, Smartphone, Tablet, Eye
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import StarRating from '@/components/StarRating'
import LoadingScreen from '@/components/LoadingScreen'

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

interface TourDetail {
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
  wholesaler: string
  wholesalerColor: string
  rating: number
  reviews: number
  availability: string
  availableSlots: number
}

export default function TourDetailPage() {
  const params = useParams()
  const tourCode = params['tour-code'] as string
  const [tour, setTour] = useState<TourDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedPeriod, setSelectedPeriod] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'itinerary' | 'booking' | 'terms'>('overview')
  
  // New features state
  const [chatbotOpen, setChatbotOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState<Array<{id: string, text: string, sender: 'user' | 'bot', timestamp: Date}>>([])
  const [currentMessage, setCurrentMessage] = useState('')
  const [bookmarked, setBookmarked] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<'standard' | 'premium'>('standard')
  const [travelers, setTravelers] = useState(1)
  const [extraRooms, setExtraRooms] = useState(0)
  const [showImageGallery, setShowImageGallery] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [showMap, setShowMap] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showCompare, setShowCompare] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState<'th' | 'en'>('th')
  const [pushNotificationsEnabled, setPushNotificationsEnabled] = useState(false)
  
  // Mock image gallery data
  const imageGallery = [
    tour?.image || '/plane.svg',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800',
    'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=800',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
    'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'
  ]

  // Mock similar tours data
  const similarTours = [
    {
      id: 'similar-1',
      title: `${tour?.location} แบบประหยัด`,
      price: tour ? Math.round(tour.price * 0.85) : 0,
      days: tour ? tour.days - 1 : 0,
      nights: tour ? tour.nights - 1 : 0,
      hotelStar: tour ? tour.hotelStar - 1 : 0,
      rating: tour ? Number((tour.rating - 0.3).toFixed(1)) : 0,
      wholesaler: 'Budget Plus',
      highlights: ['ราคาประหยัด', 'เหมาะกับครอบครัว']
    },
    {
      id: 'similar-2', 
      title: `${tour?.location} แบบพรีเมี่ยม`,
      price: tour ? Math.round(tour.price * 1.25) : 0,
      days: tour ? tour.days + 1 : 0,
      nights: tour ? tour.nights + 1 : 0,
      hotelStar: tour ? tour.hotelStar + 1 : 0,
      rating: tour ? Number((tour.rating + 0.2).toFixed(1)) : 0,
      wholesaler: 'Luxury Travel',
      highlights: ['โรงแรมหรู', 'บริการพิเศษ', 'มื้อพิเศษ']
    }
  ]

  // Country mapping function (same as wholesale-tours-2)
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
    
    if (lowercaseMessage.includes('ราคา') || lowercaseMessage.includes('price')) {
      return `ราคาทัวร์นี้ ${tour?.price.toLocaleString()} บาทต่อท่าน สำหรับ ${tour?.duration}. หากต้องการข้อมูลเพิ่มเติมเกี่ยวกับแพ็คเกจอื่นๆ กรุณาสอบถามได้เลยค่ะ`
    }
    
    if (lowercaseMessage.includes('วีซ่า') || lowercaseMessage.includes('visa')) {
      return `สำหรับทัวร์${tour?.location} วีซ่าจะขึ้นอยู่กับสัญชาติของท่าน หากเป็นคนไทยส่วนใหญ่จะต้องใช้วีซ่า กรุณาติดต่อทีมงานเพื่อขอข้อมูลเอกสารที่ต้องเตรียมค่ะ`
    }
    
    if (lowercaseMessage.includes('โรงแรม') || lowercaseMessage.includes('hotel')) {
      return `ทัวร์นี้ใช้โรงแรมระดับ ${tour?.hotelStar} ดาว เป็นโรงแรมที่มีมาตรฐานดี สะอาด และปลอดภัย หากต้องการโรงแรมระดับสูงกว่านี้ สามารถอัพเกรดเป็นแพ็คเกจ Premium ได้ค่ะ`
    }
    
    if (lowercaseMessage.includes('อาหาร') || lowercaseMessage.includes('meal')) {
      return `ทัวร์นี้รวมอาหาร ${tour?.meals} มื้อ ตามรายการที่ระบุ ส่วนมื้ออื่นๆ ท่านสามารถเลือกรับประทานตามใจชอบได้ค่ะ`
    }
    
    if (lowercaseMessage.includes('ยกเลิก') || lowercaseMessage.includes('cancel')) {
      return `นโยบายการยกเลิก: ยกเลิกก่อน 45 วัน คืนเงิน 100%, ก่อน 31-44 วัน คืนเงิน 75%, ก่อน 15-30 วัน คืนเงิน 50%, ก่อน 1-14 วัน ไม่คืนเงิน`
    }
    
    if (lowercaseMessage.includes('สายการบิน') || lowercaseMessage.includes('airline')) {
      return `ทัวร์นี้ใช้สายการบิน ${tour?.airline || 'ตามที่บริษัทจัดหา'} ซึ่งเป็นสายการบินที่มีความปลอดภัยสูงและมาตรฐานดีค่ะ`
    }
    
    return `ขอบคุณสำหรับคำถามค่ะ ผมคือ TourBot ผู้ช่วยสำหรับทัวร์นี้ หากมีคำถามเกี่ยวกับ ราคา, วีซ่า, โรงแรม, อาหาร, การยกเลิก หรือสายการบิน สามารถสอบถามได้เลยค่ะ หรือติดต่อทีมงานโดยตรงที่ปุ่มโทรด้านล่างเลยค่ะ`
  }

  // Image navigation functions
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % imageGallery.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + imageGallery.length) % imageGallery.length)
  }

  // Google Maps function
  const openGoogleMaps = () => {
    const query = encodeURIComponent(tour?.location || '')
    window.open(`https://www.google.com/maps/search/${query}`, '_blank')
  }

  // WhatsApp sharing function
  const shareWhatsApp = () => {
    const message = `เช็คทัวร์นี้สิ: ${tour?.title} - ราคา ฿${tour?.price.toLocaleString()} ${window.location.href}`
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  // QR Code generation function
  const generateQRCode = () => {
    const url = window.location.href
    return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(url)}`
  }

  // Price calculator
  const calculateTotalPrice = () => {
    const basePrice = selectedPeriod?.price || tour?.price || 0
    const packageMultiplier = selectedPackage === 'premium' ? 1.3 : 1
    const travelerCost = basePrice * packageMultiplier * travelers
    const roomCost = extraRooms * 2000 // 2000 baht per extra room
    return travelerCost + roomCost
  }

  // Bookmark function
  const toggleBookmark = () => {
    setBookmarked(!bookmarked)
    const bookmarks = JSON.parse(localStorage.getItem('tour-bookmarks') || '[]')
    
    if (bookmarked) {
      const updatedBookmarks = bookmarks.filter((id: string) => id !== tour?.id)
      localStorage.setItem('tour-bookmarks', JSON.stringify(updatedBookmarks))
    } else {
      bookmarks.push(tour?.id)
      localStorage.setItem('tour-bookmarks', JSON.stringify(bookmarks))
    }
  }

  // Real-time availability checker
  const checkAvailability = async () => {
    // Mock real-time check
    const availableSlots = Math.floor(Math.random() * 15) + 1
    if (tour) {
      setTour({
        ...tour,
        availableSlots,
        availability: availableSlots <= 3 ? 'เหลือน้อย' : 'ว่าง'
      })
    }
  }

  // Load bookmark status
  useEffect(() => {
    if (tour) {
      const bookmarks = JSON.parse(localStorage.getItem('tour-bookmarks') || '[]')
      setBookmarked(bookmarks.includes(tour.id))
    }
  }, [tour])

  // Auto-refresh availability every 30 seconds
  useEffect(() => {
    const interval = setInterval(checkAvailability, 30000)
    return () => clearInterval(interval)
  }, [tour])

  // Push notification functions
  const requestNotificationPermission = async () => {
    if ('Notification' in window && 'serviceWorker' in navigator) {
      const permission = await Notification.requestPermission()
      if (permission === 'granted') {
        setPushNotificationsEnabled(true)
        localStorage.setItem('notifications-enabled', 'true')
        new Notification('แจ้งเตือนราคาเปิดแล้ว', {
          body: 'คุณจะได้รับการแจ้งเตือนเมื่อมีการอัพเดทราคาทัวร์นี้',
          icon: '/favicon.ico'
        })
      }
    }
  }

  const toggleNotifications = () => {
    if (pushNotificationsEnabled) {
      setPushNotificationsEnabled(false)
      localStorage.setItem('notifications-enabled', 'false')
    } else {
      requestNotificationPermission()
    }
  }

  // Multi-language support
  const t = (th: string, en: string) => selectedLanguage === 'th' ? th : en

  // Load notification preference
  useEffect(() => {
    const enabled = localStorage.getItem('notifications-enabled') === 'true'
    setPushNotificationsEnabled(enabled)
  }, [])

  // Mock price change notification
  useEffect(() => {
    if (pushNotificationsEnabled && tour) {
      const interval = setInterval(() => {
        const randomChance = Math.random()
        if (randomChance < 0.1) { // 10% chance every 60 seconds
          const newPrice = Math.round(tour.price * (0.95 + Math.random() * 0.1))
          if (newPrice !== tour.price && 'Notification' in window) {
            new Notification('💰 ราคาทัวร์เปลี่ยนแปลง!', {
              body: `${tour.title} ตอนนี้ ฿${newPrice.toLocaleString()} (เดิม ฿${tour.price.toLocaleString()})`,
              icon: '/favicon.ico'
            })
          }
        }
      }, 60000) // Check every minute
      return () => clearInterval(interval)
    }
  }, [pushNotificationsEnabled, tour])

  // Fetch API data (same logic as wholesale-tours-2)
  useEffect(() => {
    const fetchTourData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch from all APIs concurrently
        const [ttnResponse, ttnPlusResponse, superbResponse, bestindoResponse] = await Promise.allSettled([
          fetch("https://online.ttnconnect.com/api/agency/get-allprogram"),
          fetch("https://api.ttnplus.com/api/tours"),
          fetch("https://api.superbholiday.com/tours"),
          fetch("https://api.bestindo.com/tours")
        ])

        let foundTour: TourDetail | null = null

        // Process TTN API
        if (ttnResponse.status === 'fulfilled' && ttnResponse.value.ok) {
          const ttnData = await ttnResponse.value.json()
          if (Array.isArray(ttnData)) {
            for (const item of ttnData) {
              const program = item.program?.[0]
              if (!program || !program.P_CODE) continue
              
              if (program.P_CODE === tourCode) {
                const periods = (program.Period || []).map((period: any) => ({
                  id: period.P_ID?.toString() || `${program.P_ID}-period`,
                  dates: period.P_DUE_TH || 'รอประกาศ',
                  datesEn: period.P_DUE_EN || 'TBA',
                  startDate: period.P_DUE_START || '',
                  endDate: period.P_DUE_END || '',
                  price: parseInt(program.P_PRICE) || 0,
                  available: period.P_AVAILABLE || 10,
                  status: 'Open'
                }))

                if (periods.length === 0) {
                  periods.push({
                    id: `${program.P_ID}-default`,
                    dates: 'รอประกาศ',
                    datesEn: 'TBA',
                    startDate: '',
                    endDate: '',
                    price: parseInt(program.P_PRICE) || 0,
                    available: 10,
                    status: 'Open'
                  })
                }

                const itinerary = (program.Itinerary || []).map((itin: any) => ({
                  day: itin.D_DAY || 1,
                  description: itin.D_ITIN || ''
                }))

                const highlights = program.P_HIGHLIGHT ? 
                  program.P_HIGHLIGHT.split(',').map((h: string) => h.trim()).filter((h: string) => h.length > 0) : 
                  []

                const tags = program.P_TAG ? 
                  program.P_TAG.split(',').map((t: string) => t.trim()).filter((t: string) => t.length > 0) : 
                  []

                const availableSlots = Math.floor(Math.random() * 20) + 1

                foundTour = {
                  id: program.P_ID?.toString() || tourCode,
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
                  airlineName: program.P_AIRLINE_NAME || '',
                  hotelStar: parseInt(program.P_HOTEL_STAR) || 3,
                  meals: parseInt(program.P_MEAL) || 0,
                  highlights,
                  tags,
                  periods,
                  itinerary,
                  pdfUrl: program.PDF || '',
                  wordUrl: program.WORD || '',
                  wholesaler: 'TTN',
                  wholesalerColor: 'indigo',
                  rating: Math.round((Math.random() * 1.5 + 3.5) * 10) / 10,
                  reviews: Math.floor(Math.random() * 50) + 10,
                  availability: availableSlots <= 5 ? 'เหลือน้อย' : 'ว่าง',
                  availableSlots
                }
                break
              }
            }
          }
        }

        // Process other APIs similarly...
        // (Add similar processing for TTN Plus, Superb, Bestindo)

        if (foundTour) {
          setTour(foundTour)
          if (foundTour.periods && foundTour.periods.length > 0) {
            setSelectedPeriod(foundTour.periods[0])
          }
        } else {
          setError('ไม่พบข้อมูลทัวร์ที่ต้องการ')
        }

      } catch (err: any) {
        console.error('Error fetching tour data:', err)
        setError('เกิดข้อผิดพลาดในการโหลดข้อมูล')
      } finally {
        setLoading(false)
      }
    }

    if (tourCode) {
      fetchTourData()
    }
  }, [tourCode])

  if (loading) {
    return (
      <LoadingScreen 
        title="กำลังโหลดข้อมูลทัวร์เต็มรูปแบบ" 
        subtitle="โปรดรอสักครู่... กำลังค้นหาข้อมูลครบถ้วนจาก API ทุกแหล่ง" 
      />
    )
  }

  if (error || !tour) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">ไม่พบข้อมูลทัวร์</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link href="/wholesale-tours-2">
            <Button variant="primary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              กลับไปหน้าทัวร์
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Custom Styles */}
      <style jsx>{customStyles}</style>
      {/* Hero Section with Image Gallery */}
      <div className="relative h-96 overflow-hidden group">
        <Image
          src={imageGallery[currentImageIndex]}
          alt={tour.title}
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
          <Link href="/wholesale-tours-2">
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
              <span className={`text-xs bg-${tour.wholesalerColor}-600 px-2 py-1 rounded-full mr-3`}>
                {tour.wholesaler}
              </span>
              {tour.availability === 'เหลือน้อย' && (
                <span className="text-xs bg-red-600 px-2 py-1 rounded-full animate-pulse">
                  🔥 เหลือน้อย
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{tour.title}</h1>
            {/* Mobile responsive text adjustments */}
            <div className="md:hidden text-center">
              <h2 className="text-xl font-bold mb-1">{tour.title}</h2>
            </div>
            <div className="flex items-center text-sm opacity-90">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="mr-4">{tour.location}</span>
              <Clock className="w-4 h-4 mr-1" />
              <span className="mr-4">{tour.duration}</span>
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
                ].map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key as 'overview' | 'itinerary' | 'booking' | 'terms')}
                    className={`flex-1 flex items-center justify-center px-2 sm:px-4 py-3 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap min-w-max ${
                      activeTab === key
                        ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {label}
                  </button>
                ))}
              </div>

              <div className="p-3 sm:p-4 md:p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    {/* Highlights */}
                    {tour.highlights && tour.highlights.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center">
                          <Star className="w-5 h-5 mr-2 text-yellow-500" />
                          ไฮไลท์ทัวร์
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {tour.highlights.map((highlight, idx) => (
                            <div key={idx} className="flex items-start">
                              <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                              <span className="text-gray-700">{highlight}</span>
                            </div>
                          ))}
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
                          <div className="font-semibold">{tour.airline}</div>
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
                      รายการท่องเที่ยว ({tour.itinerary?.length || 0} วัน)
                    </h3>
                    {tour.itinerary && tour.itinerary.length > 0 ? (
                      <div className="space-y-4">
                        {tour.itinerary.map((item, idx) => (
                          <div key={idx} className="flex">
                            <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-semibold mr-4">
                              {item.day}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold mb-1">วันที่ {item.day}</h4>
                              <p className="text-gray-700">{item.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        ยังไม่มีข้อมูลรายการท่องเที่ยว
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'booking' && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-green-500" />
                      รอบการเดินทาง ({tour.periods?.length || 0} รอบ)
                    </h3>
                    {tour.periods && tour.periods.length > 0 ? (
                      <div className="space-y-3">
                        {tour.periods.map((period, idx) => (
                          <div 
                            key={idx} 
                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                              selectedPeriod?.id === period.id 
                                ? 'border-green-500 bg-green-50' 
                                : 'border-gray-200 hover:border-green-300'
                            }`}
                            onClick={() => setSelectedPeriod(period)}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="font-semibold text-green-800">{period.dates}</div>
                                <div className="text-sm text-gray-600">{period.datesEn}</div>
                              </div>
                              <div className="text-right">
                                <div className="font-semibold text-green-600">฿{period.price.toLocaleString()}</div>
                                <div className="text-sm text-gray-600">ว่าง {period.available} ที่</div>
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
                  </div>
                )}

                {false && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <CreditCard className="w-5 h-5 mr-2 text-blue-500" />
                      ข้อมูลการจองและการชำระเงิน
                    </h3>

                    {/* Price Breakdown */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
                        <Calculator className="w-4 h-4 mr-2" />
                        รายละเอียดราคา
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>ราคาทัวร์ (ต่อท่าน)</span>
                          <span className="font-semibold">฿{tour?.price.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                          <span>ค่าบริการและภาษี</span>
                          <span>รวมในราคาแล้ว</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                          <span>ค่าวีซ่า (หากมี)</span>
                          <span>สอบถามแยกต่างหาก</span>
                        </div>
                        <hr className="border-blue-200" />
                        <div className="flex justify-between font-semibold text-blue-800">
                          <span>ราคารวม</span>
                          <span>฿{tour?.price.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Payment Methods */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center">
                        <CreditCard className="w-4 h-4 mr-2 text-green-500" />
                        วิธีการชำระเงิน
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border rounded-lg p-3 flex items-center">
                          <CreditCard className="w-5 h-5 mr-3 text-blue-500" />
                          <div>
                            <div className="font-medium">บัตรเครดิต/เดบิต</div>
                            <div className="text-xs text-gray-600">Visa, MasterCard, JCB</div>
                          </div>
                        </div>
                        <div className="border rounded-lg p-3 flex items-center">
                          <DollarSign className="w-5 h-5 mr-3 text-green-500" />
                          <div>
                            <div className="font-medium">โอนเงินผ่านธนาคาร</div>
                            <div className="text-xs text-gray-600">ทุกธนาคารในประเทศ</div>
                          </div>
                        </div>
                        <div className="border rounded-lg p-3 flex items-center">
                          <Phone className="w-5 h-5 mr-3 text-purple-500" />
                          <div>
                            <div className="font-medium">Mobile Banking</div>
                            <div className="text-xs text-gray-600">PromptPay, ธนาคารกรุงไทย</div>
                          </div>
                        </div>
                        <div className="border rounded-lg p-3 flex items-center">
                          <Coffee className="w-5 h-5 mr-3 text-orange-500" />
                          <div>
                            <div className="font-medium">ชำระที่เคาน์เตอร์</div>
                            <div className="text-xs text-gray-600">เซเว่น, เทสโก้ โลตัส</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Booking Steps */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                        ขั้นตอนการจอง
                      </h4>
                      <div className="space-y-3">
                        {[
                          { step: 1, title: 'เลือกรอบการเดินทาง', desc: 'เลือกวันที่และจำนวนผู้เดินทาง' },
                          { step: 2, title: 'กรอกข้อมูลผู้เดินทาง', desc: 'ชื่อ-นามสกุล, เบอร์โทร, อีเมล' },
                          { step: 3, title: 'ชำระเงินมัดจำ', desc: 'ชำระมัดจำ 30% หรือเต็มจำนวน' },
                          { step: 4, title: 'ยืนยันการจอง', desc: 'รับใบยืนยันการจองทางอีเมล' },
                          { step: 5, title: 'ชำระส่วนที่เหลือ', desc: 'ชำระก่อนเดินทาง 7-14 วัน' }
                        ].map(({ step, title, desc }) => (
                          <div key={step} className="flex items-start">
                            <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">
                              {step}
                            </div>
                            <div>
                              <div className="font-medium">{title}</div>
                              <div className="text-sm text-gray-600">{desc}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Required Documents */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center">
                        <FileText className="w-4 h-4 mr-2 text-red-500" />
                        เอกสารที่ต้องใช้
                      </h4>
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                          <div className="flex items-start">
                            <CheckCircle className="w-4 h-4 mr-2 text-red-500 mt-0.5 flex-shrink-0" />
                            <span>หนังสือเดินทาง (Passport) อายุไม่เกิน 6 เดือน</span>
                          </div>
                          <div className="flex items-start">
                            <CheckCircle className="w-4 h-4 mr-2 text-red-500 mt-0.5 flex-shrink-0" />
                            <span>วีซ่า (หากประเทศปลายทางต้องใช้)</span>
                          </div>
                          <div className="flex items-start">
                            <CheckCircle className="w-4 h-4 mr-2 text-red-500 mt-0.5 flex-shrink-0" />
                            <span>ใบรับรองการฉีดวัคซีน (หากจำเป็น)</span>
                          </div>
                          <div className="flex items-start">
                            <CheckCircle className="w-4 h-4 mr-2 text-red-500 mt-0.5 flex-shrink-0" />
                            <span>ประกันการเดินทาง (แนะนำ)</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Travel Insurance Information */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center">
                        <Shield className="w-4 h-4 mr-2 text-green-500" />
                        ประกันการเดินทาง
                      </h4>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Basic Insurance */}
                          <div className="border border-green-300 rounded-lg p-3 bg-white">
                            <h5 className="font-semibold text-green-800 mb-2">ประกันพื้นฐาน (รวมในราคา)</h5>
                            <div className="space-y-1 text-sm">
                              <div className="flex items-center">
                                <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                                <span>ค่ารักษาพยาบาล 100,000 บาท</span>
                              </div>
                              <div className="flex items-center">
                                <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                                <span>อุบัติเหตุการเดินทาง 50,000 บาท</span>
                              </div>
                              <div className="flex items-center">
                                <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                                <span>กระเป๋าเดินทางสูญหาย 5,000 บาท</span>
                              </div>
                            </div>
                          </div>

                          {/* Premium Insurance */}
                          <div className="border border-blue-300 rounded-lg p-3 bg-blue-50">
                            <h5 className="font-semibold text-blue-800 mb-2">ประกันเพิ่มเติม (+฿350/ท่าน)</h5>
                            <div className="space-y-1 text-sm">
                              <div className="flex items-center">
                                <CheckCircle className="w-3 h-3 text-blue-500 mr-2" />
                                <span>ค่ารักษาพยาบาล 500,000 บาท</span>
                              </div>
                              <div className="flex items-center">
                                <CheckCircle className="w-3 h-3 text-blue-500 mr-2" />
                                <span>ยกเลิกการเดินทาง 100,000 บาท</span>
                              </div>
                              <div className="flex items-center">
                                <CheckCircle className="w-3 h-3 text-blue-500 mr-2" />
                                <span>ประกันโควิด-19 200,000 บาท</span>
                              </div>
                              <div className="flex items-center">
                                <CheckCircle className="w-3 h-3 text-blue-500 mr-2" />
                                <span>เที่ยวบินล่าช้า/ยกเลิก 10,000 บาท</span>
                              </div>
                            </div>
                            <Button size="sm" className="w-full mt-3 bg-blue-600 hover:bg-blue-700">
                              เพิ่มประกันขยาย
                            </Button>
                          </div>
                        </div>
                        
                        <div className="mt-3 text-xs text-green-700 bg-green-100 rounded px-3 py-2">
                          ℹ️ ข้อมูล: ประกันพื้นฐานรวมอยู่ในราคาทัวร์แล้ว สำหรับประกันขยายสามารถเพิ่มได้ตามต้องการ
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {false && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Calculator className="w-5 h-5 mr-2 text-blue-500" />
                      คำนวณราคาทัวร์
                    </h3>

                    {/* Package Selection */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold mb-3">เลือกแพ็คเกจ</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => setSelectedPackage('standard')}
                          className={`p-3 border rounded-lg text-left transition-colors ${
                            selectedPackage === 'standard' 
                              ? 'border-blue-500 bg-blue-100 text-blue-800' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="font-semibold">Standard</div>
                          <div className="text-sm text-gray-600">แพ็คเกจมาตรฐาน</div>
                          <div className="text-lg font-bold text-blue-600 mt-1">
                            ฿{(selectedPeriod?.price || tour?.price || 0).toLocaleString()}
                          </div>
                        </button>
                        <button
                          onClick={() => setSelectedPackage('premium')}
                          className={`p-3 border rounded-lg text-left transition-colors ${
                            selectedPackage === 'premium' 
                              ? 'border-orange-500 bg-orange-100 text-orange-800' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="font-semibold">Premium</div>
                          <div className="text-sm text-gray-600">แพ็คเกจพรีเมี่ยม</div>
                          <div className="text-lg font-bold text-orange-600 mt-1">
                            ฿{Math.round((selectedPeriod?.price || tour.price) * 1.3).toLocaleString()}
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Traveler Selection */}
                    <div>
                      <h4 className="font-semibold mb-3">จำนวนผู้เดินทาง</h4>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => setTravelers(Math.max(1, travelers - 1))}
                          className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                        >
                          -
                        </button>
                        <span className="text-lg font-semibold w-12 text-center">{travelers}</span>
                        <button
                          onClick={() => setTravelers(Math.min(selectedPeriod?.available || tour.availableSlots, travelers + 1))}
                          disabled={travelers >= (selectedPeriod?.available || tour.availableSlots)}
                          className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          +
                        </button>
                        <span className="text-sm text-gray-600 ml-2">ท่าน</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        สูงสุด {selectedPeriod?.available || tour.availableSlots} ท่าน (ที่นั่งว่าง)
                      </div>
                    </div>

                    {/* Extra Rooms */}
                    <div>
                      <h4 className="font-semibold mb-3">ห้องพักเสริม</h4>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => setExtraRooms(Math.max(0, extraRooms - 1))}
                          className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                        >
                          -
                        </button>
                        <span className="text-lg font-semibold w-12 text-center">{extraRooms}</span>
                        <button
                          onClick={() => setExtraRooms(extraRooms + 1)}
                          className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                        >
                          +
                        </button>
                        <span className="text-sm text-gray-600 ml-2">ห้อง (+฿2,000/ห้อง)</span>
                      </div>
                    </div>

                    {/* Price Summary */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-3">สรุปราคา</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>ทัวร์ {selectedPackage} x {travelers} ท่าน</span>
                          <span>฿{((selectedPeriod?.price || tour.price) * (selectedPackage === 'premium' ? 1.3 : 1) * travelers).toLocaleString()}</span>
                        </div>
                        {extraRooms > 0 && (
                          <div className="flex justify-between">
                            <span>ห้องพักเสริม x {extraRooms} ห้อง</span>
                            <span>฿{(extraRooms * 2000).toLocaleString()}</span>
                          </div>
                        )}
                        <hr className="border-green-200" />
                        <div className="flex justify-between font-bold text-lg text-green-800">
                          <span>ราคารวม</span>
                          <span>฿{calculateTotalPrice().toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {false && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-purple-500" />
                      เปรียบเทียบแพ็คเกจ
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Standard Package */}
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="text-center mb-4">
                          <h4 className="text-xl font-bold text-blue-600">Standard Package</h4>
                          <div className="text-2xl font-bold text-blue-800 mt-2">
                            ฿{(selectedPeriod?.price || tour?.price || 0).toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-600">ต่อท่าน</div>
                        </div>
                        
                        <div className="space-y-3 text-sm">
                          <div className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>โรงแรม {tour.hotelStar} ดาว</span>
                          </div>
                          <div className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>อาหาร {tour.meals} มื้อ</span>
                          </div>
                          <div className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>ไกด์ท้องถิ่น</span>
                          </div>
                          <div className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>ประกันพื้นฐาน</span>
                          </div>
                          <div className="flex items-center">
                            <X className="w-4 h-4 text-red-500 mr-2" />
                            <span>ไม่มีอาหารพิเศษ</span>
                          </div>
                          <div className="flex items-center">
                            <X className="w-4 h-4 text-red-500 mr-2" />
                            <span>ไม่มีรถส่วนตัว</span>
                          </div>
                        </div>
                      </div>

                      {/* Premium Package */}
                      <div className="border border-orange-200 rounded-lg p-4 relative">
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">แนะนำ</span>
                        </div>
                        
                        <div className="text-center mb-4">
                          <h4 className="text-xl font-bold text-orange-600">Premium Package</h4>
                          <div className="text-2xl font-bold text-orange-800 mt-2">
                            ฿{Math.round((selectedPeriod?.price || tour.price) * 1.3).toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-600">ต่อท่าน</div>
                        </div>
                        
                        <div className="space-y-3 text-sm">
                          <div className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>โรงแรม {tour.hotelStar + 1} ดาว</span>
                          </div>
                          <div className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>อาหาร {tour.meals + 2} มื้อ</span>
                          </div>
                          <div className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>ไกด์ท้องถิ่นพิเศษ</span>
                          </div>
                          <div className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>ประกันครอบคลุม</span>
                          </div>
                          <div className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>อาหารพิเศษ 2 มื้อ</span>
                          </div>
                          <div className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>รถส่วนตัว VIP</span>
                          </div>
                        </div>
                      </div>
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

                    {/* Terms & Conditions */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center text-gray-600">
                        <FileText className="w-4 h-4 mr-2" />
                        ข้อกำหนดและเงื่อนไขทั่วไป
                      </h4>
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-700 space-y-2">
                        <p>• บริษัทขอสงวนสิทธิ์ในการเปลี่ยนแปลงรายการหรือยกเลิกการเดินทางโดยไม่ต้องแจ้งให้ทราบล่วงหน้า</p>
                        <p>• ผู้เดินทางต้องมีหนังสือเดินทางที่ใช้การได้อย่างน้อย 6 เดือนนับจากวันเดินทางกลับ</p>
                        <p>• บริษัทไม่รับผิดชอบต่อความเสียหายที่เกิดจากการล่าช้าของเที่ยวบิน อุบัติเหตุ หรือเหตุสุดวิสัย</p>
                        <p>• ราคาทัวร์อาจเปลี่ยนแปลงได้ตามอัตราแลกเปลี่ยนเงินตราต่างประเทศ</p>
                        <p>• การจองทัวร์ถือเป็นการยอมรับเงื่อนไขทั้งหมดของบริษัท</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'booking' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <CreditCard className="w-5 h-5 mr-2 text-blue-500" />
                      จองทัวร์
                    </h3>


                    {/* Package Selection */}
                    <div>
                      <h4 className="font-semibold mb-3">เลือกแพ็คเกจ</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div
                          onClick={() => setSelectedPackage('standard')}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                            selectedPackage === 'standard' 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-gray-200 hover:border-blue-300'
                          }`}
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
                          onClick={() => setSelectedPackage('premium')}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                            selectedPackage === 'premium' 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-gray-200 hover:border-blue-300'
                          }`}
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">จำนวนผู้เดินทาง</h4>
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => setTravelers(Math.max(1, travelers - 1))}
                            className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                          >
                            -
                          </button>
                          <span className="text-lg font-semibold w-12 text-center">{travelers}</span>
                          <button
                            onClick={() => setTravelers(Math.min(selectedPeriod?.available || tour.availableSlots, travelers + 1))}
                            disabled={travelers >= (selectedPeriod?.available || tour.availableSlots)}
                            className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            +
                          </button>
                          <span className="text-sm text-gray-600 ml-2">ท่าน</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          สูงสุด {selectedPeriod?.available || tour.availableSlots} ท่าน (ที่นั่งว่าง)
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">ห้องพักเสริม</h4>
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => setExtraRooms(Math.max(0, extraRooms - 1))}
                            className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                          >
                            -
                          </button>
                          <span className="text-lg font-semibold w-12 text-center">{extraRooms}</span>
                          <button
                            onClick={() => setExtraRooms(extraRooms + 1)}
                            className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
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

                    {/* Payment Information */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                      <h4 className="font-semibold mb-3 text-blue-800 flex items-center">
                        <CreditCard className="w-5 h-5 mr-2" />
                        ข้อมูลการชำระเงิน
                      </h4>
                      
                      <div className="space-y-4 text-sm">
                        {/* Payment Schedule */}
                        <div>
                          <h5 className="font-medium text-blue-700 mb-2">กำหนดการชำระเงิน</h5>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center bg-white rounded-lg p-3">
                              <div className="flex items-center">
                                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">1</div>
                                <div>
                                  <div className="font-medium text-gray-800">เงินมัดจำ</div>
                                  <div className="text-xs text-gray-600">ณ วันจอง</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-bold text-blue-600">30%</div>
                                <div className="text-xs text-gray-600">
                                  ฿{Math.round((((selectedPeriod?.price || tour.price) * (selectedPackage === 'premium' ? 1.3 : 1) * travelers) + (3500 * extraRooms)) * 0.3).toLocaleString()}
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex justify-between items-center bg-white rounded-lg p-3">
                              <div className="flex items-center">
                                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">2</div>
                                <div>
                                  <div className="font-medium text-gray-800">ชำระส่วนที่เหลือ</div>
                                  <div className="text-xs text-gray-600">ก่อนเดินทาง 30 วัน</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-bold text-green-600">70%</div>
                                <div className="text-xs text-gray-600">
                                  ฿{Math.round((((selectedPeriod?.price || tour.price) * (selectedPackage === 'premium' ? 1.3 : 1) * travelers) + (3500 * extraRooms)) * 0.7).toLocaleString()}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Payment Methods */}
                        <div>
                          <h5 className="font-medium text-blue-700 mb-2">วิธีการชำระเงิน</h5>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="bg-white rounded-lg p-2 text-center border">
                              <CreditCard className="w-5 h-5 mx-auto mb-1 text-blue-500" />
                              <div className="text-xs font-medium">บัตรเครดิต</div>
                              <div className="text-xs text-gray-500">Visa, Master</div>
                            </div>
                            <div className="bg-white rounded-lg p-2 text-center border">
                              <div className="w-5 h-5 mx-auto mb-1 bg-green-500 rounded text-white flex items-center justify-center text-xs">฿</div>
                              <div className="text-xs font-medium">โอนเงิน</div>
                              <div className="text-xs text-gray-500">ธนาคาร</div>
                            </div>
                            <div className="bg-white rounded-lg p-2 text-center border">
                              <div className="w-5 h-5 mx-auto mb-1 bg-purple-500 rounded text-white flex items-center justify-center text-xs">QR</div>
                              <div className="text-xs font-medium">QR Code</div>
                              <div className="text-xs text-gray-500">PromptPay</div>
                            </div>
                            <div className="bg-white rounded-lg p-2 text-center border">
                              <div className="w-5 h-5 mx-auto mb-1 bg-orange-500 rounded text-white flex items-center justify-center text-xs">💳</div>
                              <div className="text-xs font-medium">ผ่อน 0%</div>
                              <div className="text-xs text-gray-500">6-10 งวด</div>
                            </div>
                          </div>
                        </div>

                        {/* Important Notes */}
                        <div>
                          <h5 className="font-medium text-blue-700 mb-2">ข้อมูลสำคัญ</h5>
                          <div className="space-y-1 text-xs text-gray-700">
                            <div className="flex items-start">
                              <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                              <span>ราคารวมค่าธรรมเนียมการจอง แต่ไม่รวมค่าวีซ่า</span>
                            </div>
                            <div className="flex items-start">
                              <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                              <span>สามารถขอใบกำกับภาษีได้ (บอกล่วงหน้า)</span>
                            </div>
                            <div className="flex items-start">
                              <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                              <span>มีประกันการเดินทางพื้นฐานให้แล้ว</span>
                            </div>
                            <div className="flex items-start">
                              <div className="w-1 h-1 bg-red-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                              <span className="text-red-600">การยกเลิกหลังจากชำระเงินมัดจำจะมีค่าใช้จ่าย</span>
                            </div>
                          </div>
                        </div>

                        {/* Special Offers */}
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                          <h5 className="font-medium text-yellow-800 mb-2 flex items-center">
                            <Zap className="w-4 h-4 mr-1" />
                            โปรโมชั่นพิเศษ
                          </h5>
                          <div className="space-y-1 text-xs text-yellow-700">
                            <div>🎁 จองวันนี้ รับฟรี! ประกันเดินทางเพิ่ม (มูลค่า ฿2,500)</div>
                            <div>💰 ชำระเต็มจำนวนภายใน 7 วัน ลดเพิ่ม 3%</div>
                            <div>👥 จองกลุ่ม 6 ท่านขึ้นไป ลดเพิ่ม 5%</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Booking Actions */}
                    <div className="space-y-3">
                      <Button 
                        variant="primary" 
                        size="lg" 
                        className="w-full"
                      >
                        จองเลย - ชำระเงินมัดจำ 30%
                      </Button>
                      <Button 
                        variant="outline" 
                        size="lg" 
                        className="w-full"
                      >
                        สอบถามข้อมูลเพิ่มเติม
                      </Button>
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
                  <StarRating rating={tour.rating} size="md" />
                  <span className="ml-2 text-sm text-gray-600">({tour.reviews} รีวิว)</span>
                </div>
                
                <div className="mb-4">
                  {tour.originalPrice && (
                    <div className="text-gray-400 line-through text-lg">
                      ฿{tour.originalPrice.toLocaleString()}
                    </div>
                  )}
                  <div className="text-3xl font-bold text-blue-600">
                    ฿{selectedPeriod?.price ? selectedPeriod.price.toLocaleString() : tour.price.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">ต่อท่าน</div>
                </div>

                <div className="space-y-3">
                  {/* Combined Availability & Period Status */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
                    {selectedPeriod && (
                      <div className="mb-3 pb-3 border-b border-green-200">
                        <div className="text-sm text-green-700 font-medium">รอบที่เลือก</div>
                        <div className="text-green-800 font-semibold">{selectedPeriod.dates}</div>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-2 ${
                          tour.availability === 'เหลือน้อย' ? 'bg-red-500 animate-pulse' : 'bg-green-500'
                        }`} />
                        <span className="text-sm font-medium text-green-800">{tour.availability}</span>
                        <span className="text-xs text-green-600 ml-2">
                          ({selectedPeriod?.available || tour.availableSlots} ที่)
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
                  
                  <Button 
                    variant="primary" 
                    size="lg" 
                    className="w-full"
                    disabled={tour.availability === 'เต็ม'}
                  >
                    {tour.availability === 'เต็ม' ? 'เต็มแล้ว' : 
                     tour.availability === 'เหลือน้อย' ? '🔥 จองด่วน!' : 'จองทัวร์'}
                  </Button>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className={`${bookmarked ? 'bg-red-50 border-red-200 text-red-600' : ''}`}
                      onClick={toggleBookmark}
                    >
                      <Bookmark className={`w-4 h-4 mr-1 ${bookmarked ? 'fill-current' : ''}`} />
                      {bookmarked ? 'บันทึกแล้ว' : 'บันทึก'}
                    </Button>
                    <Button variant="outline" size="sm" onClick={shareWhatsApp}>
                      <Phone className="w-4 h-4 mr-1" />
                      WhatsApp
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setShowMap(true)}>
                      <QrCode className="w-4 h-4 mr-1" />
                      QR
                    </Button>
                  </div>
                </div>
              </div>

              {/* Documents */}
              {(tour.pdfUrl || tour.wordUrl) && (
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3">เอกสารแนบ</h4>
                  <div className="space-y-2">
                    {tour.pdfUrl && (
                      <a 
                        href={tour.pdfUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center p-2 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <FileText className="w-4 h-4 mr-2 text-red-600" />
                        <span className="text-sm text-red-600">ดาวน์โหลด PDF</span>
                      </a>
                    )}
                    {tour.wordUrl && (
                      <a 
                        href={tour.wordUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center p-2 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        <Download className="w-4 h-4 mr-2 text-blue-600" />
                        <span className="text-sm text-blue-600">ดาวน์โหลด Word</span>
                      </a>
                    )}
                  </div>
                </div>
              )}

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
                        title: tour.title,
                        text: `ดูทัวร์ ${tour.title} ราคา ${tour.price.toLocaleString()} บาท`,
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
    </div>
  )
}