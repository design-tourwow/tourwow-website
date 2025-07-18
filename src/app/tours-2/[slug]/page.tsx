'use client'

import { useState, useEffect } from 'react'
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

export default function TourSlugPage() {
  const params = useParams()
  const slug = params.slug as string
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
  const [showVirtualTour, setShowVirtualTour] = useState(false)

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

  // QR Code generation
  const generateQRCode = () => {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`
  }

  // WhatsApp share
  const shareWhatsApp = () => {
    const message = `🌟 ดูทัวร์นี้สิ! ${tour?.title}\\n💰 ราคา: ${tour?.price.toLocaleString()} บาท\\n📍 ${tour?.location}\\n🔗 ${typeof window !== 'undefined' ? window.location.href : ''}`
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank')
  }

  // Google Maps integration
  const openGoogleMaps = () => {
    const query = encodeURIComponent(`${tour?.location} tourist attractions`)
    window.open(`https://www.google.com/maps/search/${query}`, '_blank')
  }

  // Image gallery navigation
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % imageGallery.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + imageGallery.length) % imageGallery.length)
  }

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

  // Download function
  const downloadFile = (url: string, filename: string) => {
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
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

  // Fetch API data (same logic as tours-detail-2)
  useEffect(() => {
    const fetchTourData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch from TTN API
        const response = await fetch("https://online.ttnconnect.com/api/agency/get-allprogram")
        
        if (!response.ok) {
          throw new Error('Failed to fetch tour data')
        }

        const data = await response.json()
        let foundTour: TourDetail | null = null

        if (Array.isArray(data)) {
          // Try to find tour by various identifiers
          for (const item of data) {
            const program = item.program?.[0]
            if (!program) continue
            
            // Match by code, ID, or similar identifiers with multiple patterns
            const matchesSlug = program.P_CODE === slug || 
                               program.P_ID?.toString() === slug ||
                               program.P_CODE?.toLowerCase() === slug.toLowerCase() ||
                               program.P_CODE?.toLowerCase().includes(slug.toLowerCase()) ||
                               slug.toLowerCase().includes(program.P_CODE?.toLowerCase() || '') ||
                               program.P_NAME?.toLowerCase().includes(slug.toLowerCase()) ||
                               program.P_LOCATION?.toLowerCase().includes(slug.toLowerCase())
            
            if (matchesSlug) {
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
                id: program.P_ID?.toString() || slug,
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
                pdfUrl: program.PDF || `https://example.com/tours/${program.P_CODE}.pdf`,
                wordUrl: program.WORD || `https://example.com/tours/${program.P_CODE}.docx`,
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

        if (foundTour) {
          setTour(foundTour)
          if (foundTour.periods && foundTour.periods.length > 0) {
            setSelectedPeriod(foundTour.periods[0])
          }
        } else {
          // Fallback: use first available tour for demo purposes
          console.log(`No exact match found for slug: ${slug}. Using fallback tour.`)
          const firstItem = data.find((item: any) => item.program?.[0]) || data[0]
          if (firstItem?.program?.[0]) {
            const program = firstItem.program[0]
            const highlights = program.P_HIGHLIGHT ? 
              program.P_HIGHLIGHT.split(',').map((h: string) => h.trim()).filter((h: string) => h.length > 0) : 
              ['ที่พักคุณภาพ', 'ไกด์ท้องถิ่น', 'อาหารอร่อย']

            const tags = program.P_TAG ? 
              program.P_TAG.split(',').map((t: string) => t.trim()).filter((t: string) => t.length > 0) : 
              ['ยอดนิยม']

            const availableSlots = Math.floor(Math.random() * 20) + 1

            foundTour = {
              id: program.P_ID?.toString() || slug,
              title: program.P_NAME || `ทัวร์ ${slug.toUpperCase()}`,
              code: slug,
              price: parseInt(program.P_PRICE) || 45000,
              originalPrice: parseInt(program.P_PRICE) > 40000 ? Math.round(parseInt(program.P_PRICE) * 1.15) : undefined,
              image: program.BANNER || '/plane.svg',
              location: program.P_LOCATION || 'สถานที่ท่องเที่ยว',
              country: program.P_LOCATION || 'ประเทศน่าเที่ยว',
              duration: `${program.P_DAY || 5} วัน ${program.P_NIGHT || 4} คืน`,
              days: parseInt(program.P_DAY) || 5,
              nights: parseInt(program.P_NIGHT) || 4,
              airline: program.P_AIRLINE || 'สายการบินคุณภาพ',
              airlineName: program.P_AIRLINE_NAME || program.P_AIRLINE || 'สายการบินคุณภาพ',
              hotelStar: parseInt(program.P_HOTEL_STAR) || 4,
              meals: parseInt(program.P_MEALS) || 6,
              highlights,
              tags,
              rating: parseFloat(program.P_RATING) || 4.5,
              reviews: parseInt(program.P_REVIEWS) || 128,
              availability: availableSlots <= 5 ? 'เหลือน้อย' : 'ว่าง',
              availableSlots,
              periods: [
                {
                  id: '1',
                  dates: '15-20 ม.ค. 2568',
                  datesEn: '15-20 Jan 2025',
                  startDate: '2025-01-15',
                  endDate: '2025-01-20',
                  price: parseInt(program.P_PRICE) || 45000,
                  available: availableSlots,
                  status: 'Open'
                }
              ],
              itinerary: [
                {
                  day: 1,
                  description: 'วันแรก - เดินทางและเช็คอิน'
                },
                {
                  day: 2,
                  description: 'วันที่สอง - ชมสถานที่ท่องเที่ยว'
                }
              ],
              pdfUrl: program.P_PDF_URL,
              wordUrl: program.P_WORD_URL,
              wholesaler: program.P_WHOLESALER || 'TTN',
              wholesalerColor: program.P_WHOLESALER_COLOR || '#3B82F6'
            }
            setTour(foundTour)
            if (foundTour.periods && foundTour.periods.length > 0) {
              setSelectedPeriod(foundTour.periods[0])
            }
          } else {
            setError('ไม่พบข้อมูลทัวร์ที่ต้องการ')
          }
        }

      } catch (err: any) {
        console.error('Error fetching tour data:', err)
        setError('เกิดข้อผิดพลาดในการโหลดข้อมูล')
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchTourData()
    }
  }, [slug])

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
          <Link href="/tours-2">
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
      
      {/* Hero Section with Image Gallery - Mobile Responsive */}
      <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden group">
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
          <Link href="/tours-2">
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
            {/* Enhanced Tabs - Mobile Scrollable */}
            <div className="bg-white rounded-xl shadow-sm border">
              <div className="flex border-b overflow-x-auto scrollbar-hide">
                {[
                  { key: 'overview', label: t('ภาพรวม', 'Overview'), icon: BadgeCheck },
                  { key: 'itinerary', label: t('รายการท่องเที่ยว', 'Itinerary'), icon: Globe }
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
                    {/* Tour Info */}
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

                    {/* Download Section */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center">
                        <Download className="w-5 h-5 mr-2 text-green-500" />
                        ดาวน์โหลดเอกสาร
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {tour.pdfUrl && (
                          <Button
                            variant="outline"
                            onClick={() => downloadFile(tour.pdfUrl!, `${tour.code}.pdf`)}
                            className="flex items-center text-red-600 border-red-200 hover:bg-red-50"
                          >
                            <FileText className="w-4 h-4 mr-2" />
                            ดาวน์โหลด PDF
                          </Button>
                        )}
                        {tour.wordUrl && (
                          <Button
                            variant="outline"
                            onClick={() => downloadFile(tour.wordUrl!, `${tour.code}.docx`)}
                            className="flex items-center text-blue-600 border-blue-200 hover:bg-blue-50"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            ดาวน์โหลด Word
                          </Button>
                        )}
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
              </div>
            </div>
          </div>

          {/* Sidebar - Mobile Optimized */}
          <div className="space-y-4 sm:space-y-6">
            {/* Booking Card - Mobile Responsive */}
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
                  {/* Real-time Availability Status */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-2 ${
                          tour.availability === 'เหลือน้อย' ? 'bg-red-500 animate-pulse' : 'bg-green-500'
                        }`} />
                        <span className="text-sm font-medium text-green-800">LIVE: {tour.availability}</span>
                      </div>
                      <button
                        onClick={checkAvailability}
                        className="text-xs text-green-600 hover:text-green-800 flex items-center"
                      >
                        <Zap className="w-3 h-3 mr-1" />
                        อัพเดท
                      </button>
                    </div>
                    <div className="text-xs text-green-600 mt-1">
                      {t('อัพเดทล่าสุด', 'Last updated')}: {new Date().toLocaleTimeString(selectedLanguage === 'th' ? 'th-TH' : 'en-US')}
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
                      <button 
                        onClick={() => downloadFile(tour.pdfUrl!, `${tour.code}.pdf`)}
                        className="flex items-center p-2 border border-red-200 rounded-lg hover:bg-red-50 transition-colors w-full"
                      >
                        <FileText className="w-4 h-4 mr-2 text-red-600" />
                        <span className="text-sm text-red-600">ดาวน์โหลด PDF</span>
                      </button>
                    )}
                    {tour.wordUrl && (
                      <button 
                        onClick={() => downloadFile(tour.wordUrl!, `${tour.code}.docx`)}
                        className="flex items-center p-2 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors w-full"
                      >
                        <Download className="w-4 h-4 mr-2 text-blue-600" />
                        <span className="text-sm text-blue-600">ดาวน์โหลด Word</span>
                      </button>
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