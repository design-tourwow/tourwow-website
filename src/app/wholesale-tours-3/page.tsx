'use client'

import { useState, useEffect, useMemo, Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search, MapPin, Calendar, Users, Star, Clock, Plane, Tag, Filter, ArrowRight, Phone, Download, FileText, Briefcase, Utensils, Hotel, BadgeCheck, Grid, LayoutGrid, X, ChevronDown, Globe, Heart, Share2, Bell, History, TrendingUp, Timer, Zap, Eye, Activity, Users2, Gift, Target, ShoppingCart, Award, Flame, AlertCircle, Crown, Camera, Thermometer, MapIcon, Lightbulb, CreditCard, ArrowUpDown } from 'lucide-react'
// import { LoadingProvider } from '@/components/LoadingProvider'
import TourFilterSidebar from '@/components/TourFilterSidebar'
import { Button } from '@/components/ui/Button'
import StarRating from '@/components/StarRating'
import LoadingScreen from '@/components/LoadingScreen'

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
  wholesaler: string
}

interface ZegoTour {
  id: string
  title: string
  price: number
  image: string
  country: string
  days: number
  nights: number
  availability: 'ว่าง' | 'เหลือน้อย' | 'เต็ม'
  availableSlots: number
  highlights: string[]
  wholesaler: string
}

// Mock ZEGO data
const mockZegoTours: ZegoTour[] = [
  {
    id: 'zego-1',
    title: 'ทัวร์ญี่ปุ่น โตเกียว โอซาก้า 6 วัน 4 คืน',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800',
    country: 'ญี่ปุ่น',
    days: 6,
    nights: 4,
    availability: 'ว่าง',
    availableSlots: 15,
    highlights: ['ภูเขาไฟฟูจิ', 'ดิสนีย์แลนด์', 'วัดเซนโซจิ'],
    wholesaler: 'ZEGO'
  },
  {
    id: 'zego-2',
    title: 'ทัวร์เกาหลี โซล ปูซาน 5 วัน 3 คืน',
    price: 32000,
    image: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800',
    country: 'เกาหลีใต้',
    days: 5,
    nights: 3,
    availability: 'เหลือน้อย',
    availableSlots: 3,
    highlights: ['พระราชวังเคียงบก', 'เมียงดง', 'ป่าไผ่'],
    wholesaler: 'ZEGO'
  }
]

// Country mapping to Thai
const countryMapping: Record<string, string> = {
  // ญี่ปุ่น
  'japan': 'ญี่ปุ่น',
  'jp': 'ญี่ปุ่น',
  'tokyo': 'ญี่ปุ่น',
  'osaka': 'ญี่ปุ่น',
  'kyoto': 'ญี่ปุ่น',
  'nagoya': 'ญี่ปุ่น',
  'fukuoka': 'ญี่ปุ่น',
  'sapporo': 'ญี่ปุ่น',
  
  // เกาหลี
  'korea': 'เกาหลีใต้',
  'south korea': 'เกาหลีใต้',
  'kr': 'เกาหลีใต้',
  'seoul': 'เกาหลีใต้',
  'busan': 'เกาหลีใต้',
  'jeju': 'เกาหลีใต้',
  'เกาหลี': 'เกาหลีใต้',
  
  // จีน
  'china': 'จีน',
  'cn': 'จีน',
  'beijing': 'จีน',
  'shanghai': 'จีน',
  'guangzhou': 'จีน',
  'shenzhen': 'จีน',
  'chengdu': 'จีน',
  'xian': 'จีน',
  'kunming': 'จีน',
  'chongqing': 'จีน',
  'hangzhou': 'จีน',
  'nanjing': 'จีน',
  
  // อื่นๆ
  'taiwan': 'ไต้หวัน',
  'taipei': 'ไต้หวัน',
  'hong kong': 'ฮ่องกง',
  'singapore': 'สิงคโปร์',
  'malaysia': 'มาเลเซีย',
  'indonesia': 'อินโดนีเซีย',
  'vietnam': 'เวียดนาม',
  'thailand': 'ไทย',
  'philippines': 'ฟิลิปปินส์',
  'cambodia': 'กัมพูชา',
  'laos': 'ลาว',
  'myanmar': 'พม่า',
  'india': 'อินเดีย',
  'australia': 'ออสเตรเลีย',
  'new zealand': 'นิวซีแลนด์',
  'united states': 'สหรัฐอเมริกา',
  'usa': 'สหรัฐอเมริกา',
  'canada': 'แคนาดา',
  'united kingdom': 'สหราชอาณาจักร',
  'uk': 'สหราชอาณาจักร',
  'france': 'ฝรั่งเศส',
  'germany': 'เยอรมนี',
  'italy': 'อิตาลี',
  'spain': 'สเปน',
  'switzerland': 'สวิตเซอร์แลนด์',
  'austria': 'ออสเตรีย',
  'netherlands': 'เนเธอร์แลนด์',
  'belgium': 'เบลเยียม',
  'sweden': 'สวีเดน',
  'norway': 'นอร์เวย์',
  'denmark': 'เดนมาร์ก',
  'finland': 'ฟินแลนด์',
  'russia': 'รัสเซีย',
  'turkey': 'ตุรกี',
  'egypt': 'อียิปต์',
  'south africa': 'แอฟริกาใต้',
  'brazil': 'บราซิล',
  'argentina': 'อาร์เจนตินา',
  'chile': 'ชิลี',
  'peru': 'เปรู',
  'mexico': 'เม็กซิโก',
}

// Function to normalize country name
const normalizeCountryName = (location: string): string => {
  if (!location) return 'ไม่ระบุ'
  
  const normalizedLocation = location.toLowerCase().trim()
  
  // Check direct mapping first
  if (countryMapping[normalizedLocation]) {
    return countryMapping[normalizedLocation]
  }
  
  // Check if any mapping key is contained in the location
  for (const [key, value] of Object.entries(countryMapping)) {
    if (normalizedLocation.includes(key) || key.includes(normalizedLocation)) {
      return value
    }
  }
  
  // If already in Thai, return as is
  if (/[\u0E00-\u0E7F]/.test(location)) {
    return location.split(',')[0].trim()
  }
  
  return 'อื่นๆ'
}

const wholesalers = [
  { id: 'all', name: 'ทั้งหมด', apiUrl: '', color: 'blue' },
  { id: 'ttn', name: 'TTN Connect', apiUrl: 'https://online.ttnconnect.com/api/agency/get-allprogram', color: 'indigo' },
  { id: 'ttnplus', name: 'TTN Plus', apiUrl: 'https://www.ttnplus.co.th/api/program', color: 'emerald' },
  { id: 'superb', name: 'Superb Holiday', apiUrl: '', color: 'orange', endpoints: [
    'https://superbholidayz.com/superb/apiweb.php?id=17',
    'https://superbholidayz.com/superb/apiweb.php?id=1',
    'https://superbholidayz.com/superb/apiweb.php?id=18',
    'https://superbholidayz.com/superb/apiweb.php?id=2',
    'https://superbholidayz.com/superb/apiweb.php?id=25',
    'https://superbholidayz.com/superb/apiweb.php?id=3'
  ]},
  { id: 'bestindo', name: 'Bestindo', apiUrl: '', color: 'cyan', endpoints: [
    'https://tour-api.bestinternational.com/api/tour-programs/v2/103',
    'https://tour-api.bestinternational.com/api/tour-programs/v2/105',
    'https://tour-api.bestinternational.com/api/tour-programs/v2/106',
    'https://tour-api.bestinternational.com/api/tour-programs/v2/108',
    'https://tour-api.bestinternational.com/api/tour-programs/v2/11',
    'https://tour-api.bestinternational.com/api/tour-programs/v2/12',
    'https://tour-api.bestinternational.com/api/tour-programs/v2/14',
    'https://tour-api.bestinternational.com/api/tour-programs/v2/15',
    'https://tour-api.bestinternational.com/api/tour-programs/v2/16',
    'https://tour-api.bestinternational.com/api/tour-programs/v2/18',
    'https://tour-api.bestinternational.com/api/tour-programs/v2/22',
    'https://tour-api.bestinternational.com/api/tour-programs/v2/23',
    'https://tour-api.bestinternational.com/api/tour-programs/v2/24',
    'https://tour-api.bestinternational.com/api/tour-programs/v2/30',
    'https://tour-api.bestinternational.com/api/tour-programs/v2/32',
    'https://tour-api.bestinternational.com/api/tour-programs/v2/34',
    'https://tour-api.bestinternational.com/api/tour-programs/v2/35',
    'https://tour-api.bestinternational.com/api/tour-programs/v2/6',
    'https://tour-api.bestinternational.com/api/tour-programs/v2/7',
    'https://tour-api.bestinternational.com/api/tour-programs/v2/8',
    'https://tour-api.bestinternational.com/api/tour-programs/v2/9'
  ]},
  { id: 'zego', name: 'ZEGO Travel', apiUrl: '', color: 'pink' }
]

function WholesaleToursPageContent() {
  const [selectedWholesalers, setSelectedWholesalers] = useState<string[]>(['all'])
  const [ttnTours, setTTNTours] = useState<TTNTour[]>([])
  const [ttnPlusTours, setTTNPlusTours] = useState<any[]>([])
  const [superbTours, setSuperbTours] = useState<any[]>([])
  const [bestindoTours, setBestindoTours] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด')
  const [priceRange, setPriceRange] = useState('ทั้งหมด')
  const [selectedCountry, setSelectedCountry] = useState('ทั้งหมด')
  const [sortBy, setSortBy] = useState('ยอดนิยม')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [displayedTours, setDisplayedTours] = useState(20)
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'compact'>('grid')
  const [compareList, setCompareList] = useState<string[]>([])
  const [showCompareBar, setShowCompareBar] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  // Wishlist and new features state
  const [wishlist, setWishlist] = useState<string[]>([])
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([])
  const [notifications, setNotifications] = useState<string[]>([])
  const [shareModalOpen, setShareModalOpen] = useState<string | null>(null)
  
  // Promotional features state
  const [flashSaleEnd, setFlashSaleEnd] = useState<Date>(new Date(Date.now() + 2 * 60 * 60 * 1000)) // 2 hours from now
  const [liveViewers, setLiveViewers] = useState<Record<string, number>>({})
  const [recentBookings, setRecentBookings] = useState<Array<{id: string, name: string, tour: string, time: Date}>>([])
  const [currentTime, setCurrentTime] = useState(new Date())
  const [showExitIntent, setShowExitIntent] = useState(false)
  const toursPerLoad = 20
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    // Load wishlist and recently viewed from localStorage
    const savedWishlist = localStorage.getItem('tourwow-wishlist')
    const savedRecentlyViewed = localStorage.getItem('tourwow-recently-viewed')
    
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist))
    }
    if (savedRecentlyViewed) {
      setRecentlyViewed(JSON.parse(savedRecentlyViewed))
    }
  }, [])

  // Wishlist functions
  const toggleWishlist = (tourId: string) => {
    const tour = filteredAndSortedTours.find(t => t.id === tourId)
    const newWishlist = wishlist.includes(tourId)
      ? wishlist.filter(id => id !== tourId)
      : [...wishlist, tourId]
    
    setWishlist(newWishlist)
    localStorage.setItem('tourwow-wishlist', JSON.stringify(newWishlist))
    
    // Add notification
    const message = wishlist.includes(tourId) 
      ? 'ลบออกจากรายการโปรดแล้ว' 
      : `เพิ่ม "${tour?.title || 'ทัวร์'}" เข้ารายการโปรดแล้ว`
    addNotification(message)
    
    // Set up price alert for new wishlist items
    if (!wishlist.includes(tourId) && tour) {
      const originalPrice = tour.price
      localStorage.setItem(`price-alert-${tourId}`, JSON.stringify({
        originalPrice,
        tourTitle: tour.title,
        dateAdded: new Date().toISOString()
      }))
    }
  }

  const addToRecentlyViewed = (tourId: string) => {
    const newRecentlyViewed = [tourId, ...recentlyViewed.filter(id => id !== tourId)].slice(0, 10)
    setRecentlyViewed(newRecentlyViewed)
    localStorage.setItem('tourwow-recently-viewed', JSON.stringify(newRecentlyViewed))
  }

  const addNotification = (message: string) => {
    const newNotifications = [message, ...notifications].slice(0, 5)
    setNotifications(newNotifications)
    
    // Auto remove notification after 3 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n !== message))
    }, 3000)
  }

  // Check for price alerts
  const checkPriceAlerts = () => {
    wishlist.forEach(tourId => {
      const alertData = localStorage.getItem(`price-alert-${tourId}`)
      if (alertData) {
        const { originalPrice, tourTitle } = JSON.parse(alertData)
        const currentTour = filteredAndSortedTours.find(t => t.id === tourId)
        
        if (currentTour && currentTour.price < originalPrice) {
          const discount = originalPrice - currentTour.price
          const discountPercent = Math.round((discount / originalPrice) * 100)
          addNotification(`🎉 ${tourTitle} ลดราคา ${discountPercent}% (ประหยัด ฿${discount.toLocaleString()})`)
          
          // Update the stored price to avoid repeated notifications
          localStorage.setItem(`price-alert-${tourId}`, JSON.stringify({
            ...JSON.parse(alertData),
            originalPrice: currentTour.price
          }))
        }
        
        // Alert for low availability
        if (currentTour && currentTour.availability === 'เหลือน้อย') {
          addNotification(`⚠️ ${tourTitle} เหลือที่นั่งน้อยแล้ว!`)
        }
      }
    })
  }


  const shareUrl = (tourId: string, platform: string) => {
    const url = `${window.location.origin}/tours-detail-2/${tourId}`
    const text = `ดูทัวร์นี้สิ - ${filteredAndSortedTours.find(t => t.id === tourId)?.title || 'ทัวร์พิเศษ'}`
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
        break
      case 'line':
        window.open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`, '_blank')
        break
      case 'copy':
        navigator.clipboard.writeText(url)
        addNotification('คัดลอกลิงก์แล้ว!')
        break
    }
    setShareModalOpen(null)
  }

  // Flash Sale Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatCountdown = (endTime: Date) => {
    const now = currentTime.getTime()
    const end = endTime.getTime()
    const diff = end - now

    if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0 }

    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)

    return { hours, minutes, seconds }
  }


  // Exit Intent Detection
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !showExitIntent) {
        setShowExitIntent(true)
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [showExitIntent])

  // Fetch TTN data with ALL fields
  const fetchTTNData = async (skipLoading = false) => {
    try {
      if (!skipLoading) {
        setLoading(true)
        setError(null)
      }
      
      console.log('Starting TTN API fetch...')
      
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 30000)
      
      const response = await fetch("https://online.ttnconnect.com/api/agency/get-allprogram", {
        signal: controller.signal
      })
      
      clearTimeout(timeoutId)
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      console.log('TTN API Response:', data?.length || 0, 'programs')
      
      if (!Array.isArray(data)) {
        throw new Error('API response is not an array')
      }
      
      const processedTours = data.map((item: any, index: number) => {
        try {
          const program = item.program?.[0]
          if (!program) {
            return null
          }
          
          const periods = (program.Period || []).map((period: any) => ({
            id: period.P_ID?.toString() || `${program.P_ID}-period`,
            dates: period.P_DUE_TH || 'รอประกาศ',
            datesEn: period.P_DUE_EN || 'TBA',
            startDate: period.P_DUE_START || '',
            endDate: period.P_DUE_END || '',
            price: parseInt(period.P_PRICE || program.P_PRICE) || 0,
            available: parseInt(period.P_AVAILABLE) || 10,
            status: period.P_STATUS || 'Open'
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
          
          return {
            id: program.P_ID?.toString() || `tour-${index}`,
            name: program.P_NAME || 'ทัวร์',
            code: program.P_CODE || '',
            price: parseInt(program.P_PRICE) || 0,
            image: program.BANNER || '/plane.svg',
            location: program.P_LOCATION || '',
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
            wholesaler: 'TTN'
          }
        } catch (e) {
          console.error(`Error processing item ${index}:`, e)
          return null
        }
      }).filter((tour: TTNTour | null) => tour !== null && tour.price > 0)
      
      setTTNTours(processedTours.filter(tour => tour !== null) as TTNTour[])
      console.log('Processed TTN tours:', processedTours.length)
    } catch (err: any) {
      console.error('TTN API Error:', err)
      if (err.name === 'AbortError') {
        setError('การโหลดข้อมูลใช้เวลานานเกินไป กรุณาลองใหม่อีกครั้ง')
      } else {
        setError(err.message || 'ไม่สามารถโหลดข้อมูลทัวร์ได้')
      }
    } finally {
      if (!skipLoading) {
        setLoading(false)
      }
    }
  }

  // Fetch TTN Plus data with ALL fields  
  const fetchTTNPlusData = async (skipLoading = false) => {
    try {
      if (!skipLoading) {
        setLoading(true)
        setError(null)
      }
      
      const response = await fetch("https://www.ttnplus.co.th/api/program")
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      
      const data = await response.json()
      const processedTours = data.map((item: any, index: number) => ({
        id: item.P_ID || `ttnplus-${index}`,
        name: item.P_NAME || item.program_name || 'ทัวร์',
        code: item.P_CODE || item.program_code || '',
        price: parseInt(item.P_PRICE || item.price) || 0,
        image: item.banner_url || item.image_url || item.BANNER || '/plane.svg',
        location: item.P_LOCATION || item.location || item.country || '',
        days: parseInt(item.P_DAY || item.days) || 0,
        nights: parseInt(item.P_NIGHT || item.nights) || 0,
        airline: item.P_AIRLINE || item.airline || '',
        airlineName: item.P_AIRLINE_NAME || item.airline_name || '',
        hotelStar: parseInt(item.P_HOTEL_STAR || item.hotel_star) || 3,
        meals: parseInt(item.P_MEAL || item.meals) || 0,
        highlights: item.P_HIGHLIGHT ? item.P_HIGHLIGHT.split(',').map((h: string) => h.trim()) : [],
        tags: item.P_TAG ? item.P_TAG.split(',').map((t: string) => t.trim()) : [],
        periods: item.periods || [],
        itinerary: item.itinerary || [],
        pdfUrl: item.PDF || item.pdf_url || '',
        wordUrl: item.WORD || item.word_url || '',
        wholesaler: 'TTN Plus'
      }))
      
      setTTNPlusTours(processedTours.filter((tour: any) => tour.price > 0))
    } catch (err: any) {
      console.error('TTN Plus API Error:', err)
      setError(err.message || 'ไม่สามารถโหลดข้อมูล TTN Plus ได้')
    } finally {
      if (!skipLoading) {
        setLoading(false)
      }
    }
  }

  // Fetch Superb Holiday data with ALL fields
  const fetchSuperbData = async (skipLoading = false) => {
    try {
      if (!skipLoading) {
        setLoading(true)
        setError(null)
      }
      
      const endpoints = wholesalers.find(w => w.id === 'superb')?.endpoints || []
      const allData = []
      
      for (const endpoint of endpoints) {
        try {
          const response = await fetch(endpoint)
          if (response.ok) {
            const data = await response.json()
            if (Array.isArray(data)) {
              allData.push(...data)
            }
          }
        } catch (e) {
          console.log(`Failed to fetch from ${endpoint}:`, e)
        }
      }
      
      const processedTours = allData.map((item: any, index: number) => ({
        id: item.mainid || item.id || `superb-${index}`,
        name: item.title || item.name || item.program_name || 'ทัวร์',
        code: item.maincode || item.ProductCode || item.code || '',
        price: parseInt(item.startingprice || item.price || item.starting_price) || 0,
        image: item.banner || item.bannerFull || item.image || item.banner_url || '/plane.svg',
        location: item.Country || item.country || item.location || '',
        days: parseInt(item.day || item.days) || 0,
        nights: parseInt(item.night || item.nights) || 0,
        airline: item.aey || item.Airline || item.airline || '',
        airlineName: item.airline_name || '',
        hotelStar: parseInt(item.hotel_star || item.hotelstar) || 3,
        meals: parseInt(item.meals || item.meal) || 0,
        highlights: item.highlights ? (Array.isArray(item.highlights) ? item.highlights : item.highlights.split(',').map((h: string) => h.trim())) : [],
        tags: item.tags ? (Array.isArray(item.tags) ? item.tags : item.tags.split(',').map((t: string) => t.trim())) : [],
        periods: item.periods || [],
        itinerary: item.itinerary || [],
        pdfUrl: item.pdf || item.pdf_url || '',
        wordUrl: item.word || item.word_url || '',
        wholesaler: 'Superb Holiday'
      }))
      
      setSuperbTours(processedTours.filter(tour => tour.price > 0))
    } catch (err: any) {
      console.error('Superb Holiday API Error:', err)
      setError(err.message || 'ไม่สามารถโหลดข้อมูล Superb Holiday ได้')
    } finally {
      if (!skipLoading) {
        setLoading(false)
      }
    }
  }

  // Fetch Bestindo data with ALL fields
  const fetchBestindoData = async (skipLoading = false) => {
    try {
      if (!skipLoading) {
        setLoading(true)
        setError(null)
      }
      
      const endpoints = wholesalers.find(w => w.id === 'bestindo')?.endpoints || []
      const allData = []
      
      for (const endpoint of endpoints) {
        try {
          const response = await fetch(endpoint)
          if (response.ok) {
            const data = await response.json()
            if (Array.isArray(data)) {
              allData.push(...data)
            }
          }
        } catch (e) {
          console.log(`Failed to fetch from ${endpoint}:`, e)
        }
      }
      
      const processedTours = allData.map((item: any, index: number) => ({
        id: item.id || `bestindo-${index}`,
        name: item.name || item.title || item.program_name || 'ทัวร์',
        code: item.code || item.program_code || '',
        price: parseInt(item.price || item.starting_price) || 0,
        image: item.bannerSq || item.banner || item.image || item.banner_url || '/plane.svg',
        location: item.country_name || item.country_name_eng || item.location || item.country || '',
        days: parseInt(item.time?.split(' ')[0] || item.days) || 0,
        nights: parseInt(item.time?.split(' ')[2] || item.nights) || 0,
        airline: item.airline_name || item.airline || '',
        airlineName: item.airline_name || '',
        hotelStar: parseInt(item.hotel_star || item.hotelstar) || 3,
        meals: parseInt(item.meals || item.meal) || 0,
        highlights: item.highlights ? (Array.isArray(item.highlights) ? item.highlights : item.highlights.split(',').map((h: string) => h.trim())) : [],
        tags: item.tags ? (Array.isArray(item.tags) ? item.tags : item.tags.split(',').map((t: string) => t.trim())) : [],
        periods: item.periods || item.available_periods || [],
        itinerary: item.itinerary || item.program_detail || [],
        pdfUrl: item.pdf || item.pdf_url || '',
        wordUrl: item.word || item.word_url || '',
        wholesaler: 'Bestindo'
      }))
      
      setBestindoTours(processedTours.filter(tour => tour.price > 0))
    } catch (err: any) {
      console.error('Bestindo API Error:', err)
      setError(err.message || 'ไม่สามารถโหลดข้อมูล Bestindo ได้')
    } finally {
      if (!skipLoading) {
        setLoading(false)
      }
    }
  }

  // Fetch all data from all APIs
  const fetchAllData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      console.log('Loading all wholesale data...')
      
      // เรียก API ทั้งหมดพร้อมกัน
      const promises = []
      
      if (ttnTours.length === 0) {
        promises.push(fetchTTNData(true))
      }
      if (ttnPlusTours.length === 0) {
        promises.push(fetchTTNPlusData(true))
      }
      if (superbTours.length === 0) {
        promises.push(fetchSuperbData(true))
      }
      if (bestindoTours.length === 0) {
        promises.push(fetchBestindoData(true))
      }
      
      // รอให้ทุก API โหลดเสร็จ
      await Promise.allSettled(promises)
      
    } catch (err: any) {
      console.error('Error loading all data:', err)
      setError('ไม่สามารถโหลดข้อมูลบางส่วนได้')
    } finally {
      setLoading(false)
    }
  }

  // Load tours based on selected wholesalers
  useEffect(() => {
    if (selectedWholesalers.includes('all')) {
      fetchAllData()
    } else {
      if (selectedWholesalers.includes('ttn') && ttnTours.length === 0) {
        fetchTTNData()
      }
      if (selectedWholesalers.includes('ttnplus') && ttnPlusTours.length === 0) {
        fetchTTNPlusData()
      }
      if (selectedWholesalers.includes('superb') && superbTours.length === 0) {
        fetchSuperbData()
      }
      if (selectedWholesalers.includes('bestindo') && bestindoTours.length === 0) {
        fetchBestindoData()
      }
    }
  }, [selectedWholesalers])

  // Handle multi-select logic
  const handleWholesalerToggle = (wholesalerId: string) => {
    if (wholesalerId === 'all') {
      setSelectedWholesalers(['all'])
    } else {
      setSelectedWholesalers(prev => {
        const withoutAll = prev.filter(id => id !== 'all')
        
        if (withoutAll.includes(wholesalerId)) {
          const newSelection = withoutAll.filter(id => id !== wholesalerId)
          return newSelection.length === 0 ? ['all'] : newSelection
        } else {
          return [...withoutAll, wholesalerId]
        }
      })
    }
  }

  // Convert tours to unified format with ALL DATA
  const convertedTours = useMemo(() => {
    let tours = []
    
    // Enhanced function to convert any tour to unified format with ALL available data
    const convertTour = (tour: any, wholesaler: string, color: string) => {
      // Use deterministic values based on tour ID for consistency
      const tourId = String(tour.id || '1')
      const idNum = parseInt(tourId.replace(/\D/g, '')) || 1
      const availableSlots = Math.max(1, (idNum % 15) + 5)
      
      return {
        id: tour.id,
        title: tour.name || tour.title,
        price: tour.price,
        originalPrice: tour.price > 40000 ? Math.round(tour.price * 1.15) : null,
        image: tour.image,
        location: tour.location,
        country: normalizeCountryName(tour.location),
        duration: `${tour.days} วัน ${tour.nights} คืน`,
        category: tour.tags?.[0] || 'ทัวร์ทั่วไป',
        rating: Math.round(((idNum % 15) / 10 + 4.0) * 10) / 10,
        reviews: (idNum % 40) + 15,
        availableSlots,
        availability: availableSlots <= 5 ? 'เหลือน้อย' : 'ว่าง',
        groupSize: `กลุ่ม ${(idNum % 15) + 10}-${(idNum % 20) + 25} ท่าน`,
        highlights: tour.highlights || [],
        wholesaler,
        wholesalerColor: color,
        // Enhanced data fields
        code: tour.code || '',
        airline: tour.airline || '',
        airlineName: tour.airlineName || '',
        hotelStar: tour.hotelStar || 3,
        meals: tour.meals || 0,
        tags: tour.tags || [],
        periods: tour.periods || [],
        itinerary: tour.itinerary || [],
        pdfUrl: tour.pdfUrl || '',
        wordUrl: tour.wordUrl || ''
      }
    }
    
    if (selectedWholesalers.includes('all')) {
      const ttnConverted = ttnTours.map(tour => convertTour(tour, 'TTN', 'indigo'))
      const ttnPlusConverted = ttnPlusTours.map(tour => convertTour(tour, 'TTN Plus', 'emerald'))
      const superbConverted = superbTours.map(tour => convertTour(tour, 'Superb', 'orange'))
      const bestindoConverted = bestindoTours.map(tour => convertTour(tour, 'Bestindo', 'cyan'))
      const zegoConverted = mockZegoTours.map(tour => convertTour(tour, 'ZEGO', 'pink'))
      
      tours = [...ttnConverted, ...ttnPlusConverted, ...superbConverted, ...bestindoConverted, ...zegoConverted]
    } else {
      if (selectedWholesalers.includes('ttn')) {
        tours.push(...ttnTours.map(tour => convertTour(tour, 'TTN', 'indigo')))
      }
      if (selectedWholesalers.includes('ttnplus')) {
        tours.push(...ttnPlusTours.map(tour => convertTour(tour, 'TTN Plus', 'emerald')))
      }
      if (selectedWholesalers.includes('superb')) {
        tours.push(...superbTours.map(tour => convertTour(tour, 'Superb', 'orange')))
      }
      if (selectedWholesalers.includes('bestindo')) {
        tours.push(...bestindoTours.map(tour => convertTour(tour, 'Bestindo', 'cyan')))
      }
      if (selectedWholesalers.includes('zego')) {
        tours.push(...mockZegoTours.map(tour => convertTour(tour, 'ZEGO', 'pink')))
      }
    }
    
    return tours
  }, [selectedWholesalers, ttnTours, ttnPlusTours, superbTours, bestindoTours])

  const categories = useMemo(() => ['ทั้งหมด', ...Array.from(new Set(convertedTours.map(t => t.category)))], [convertedTours])
  const priceRanges = ['ทั้งหมด', 'ต่ำกว่า 25,000', '25,000-35,000', '35,000-50,000', 'มากกว่า 50,000']
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
  const sortOptions = ['ยอดนิยม', 'ราคาต่ำ-สูง', 'ราคาสูง-ต่ำ', 'คะแนนรีวิว', 'วันที่อัพเดต', 'ชื่อ A-Z', 'ชื่อ Z-A']

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

    // Group tours by unique program code/name combination
    const groupedTours = filtered.reduce((groups, tour) => {
      const groupKey = tour.code || tour.title; // Use code if available, otherwise title
      if (!groups[groupKey]) {
        groups[groupKey] = {
          ...tour,
          periods: tour.periods || [],
          wholesalers: [tour.wholesaler],
          allPeriods: tour.periods || []
        };
      } else {
        // Merge periods from same program
        if (tour.periods) {
          groups[groupKey].allPeriods = [...(groups[groupKey].allPeriods || []), ...tour.periods];
        }
        // Track multiple wholesalers if different
        if (!groups[groupKey].wholesalers.includes(tour.wholesaler)) {
          groups[groupKey].wholesalers.push(tour.wholesaler);
        }
        // Keep the lowest price
        if (tour.price < groups[groupKey].price) {
          groups[groupKey].price = tour.price;
        }
      }
      return groups;
    }, {} as Record<string, any>);

    // Convert back to array and update periods
    const uniqueTours = Object.values(groupedTours).map(tour => ({
      ...tour,
      periods: tour.allPeriods,
      wholesaler: tour.wholesalers.length > 1 ? tour.wholesalers.join(', ') : tour.wholesalers[0]
    }));

    const sorted = [...uniqueTours]

    // First sort by availability of periods (tours with periods first)
    sorted.sort((a, b) => {
      const aPeriods = (a.periods && a.periods.length > 0) ? 1 : 0;
      const bPeriods = (b.periods && b.periods.length > 0) ? 1 : 0;
      
      if (aPeriods !== bPeriods) {
        return bPeriods - aPeriods; // Tours with periods first
      }
      
      // Then apply the selected sorting
      switch (sortBy) {
        case 'ราคาต่ำ-สูง':
          return a.price - b.price
        case 'ราคาสูง-ต่ำ':
          return b.price - a.price
        case 'คะแนนรีวิว':
          return b.rating - a.rating
        case 'วันที่อัพเดต':
          return new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime()
        case 'ชื่อ A-Z':
          return a.title.localeCompare(b.title, 'th')
        case 'ชื่อ Z-A':
          return b.title.localeCompare(a.title, 'th')
        default:
          // ยอดนิยม - prioritize wishlist items, then reviews
          const aInWishlist = wishlist.includes(a.id) ? 1 : 0
          const bInWishlist = wishlist.includes(b.id) ? 1 : 0
          if (aInWishlist !== bInWishlist) return bInWishlist - aInWishlist
          return (b.reviews || 0) - (a.reviews || 0)
      }
    })

    return sorted
  }, [searchTerm, selectedCategory, selectedCountry, priceRange, sortBy, convertedTours, wishlist])

  // Check price alerts when tours data changes
  useEffect(() => {
    if (filteredAndSortedTours.length > 0 && wishlist.length > 0) {
      checkPriceAlerts()
    }
  }, [filteredAndSortedTours, wishlist])

  // Live Viewers - Static Display
  useEffect(() => {
    const updateViewers = () => {
      const newViewers: Record<string, number> = {}
      filteredAndSortedTours.slice(0, 10).forEach(tour => {
              // Use deterministic values based on tour ID for consistency
      const tourId = String(tour.id || '1')
      const idNum = parseInt(tourId.replace(/\D/g, '')) || 1
      const base = (idNum % 15) + 8
        newViewers[tour.id] = base + ((idNum * 7) % 6)
      })
      setLiveViewers(newViewers)
    }

    updateViewers()
    const interval = setInterval(updateViewers, 15000) // Update every 15 seconds
    return () => clearInterval(interval)
  }, [filteredAndSortedTours])

  // Recent Bookings - Static Display
  useEffect(() => {
    const names = ['สมชาย ก.', 'นิดา จ.', 'มาลี ส.', 'ประยุทธ์ ต.', 'สุภาพ ล.', 'จันทรา ว.', 'อนุสรณ์ ป.', 'วิภา ค.']
    const addBooking = () => {
      if (filteredAndSortedTours.length > 0) {
        // Use deterministic selection based on current time and available tours
        const tourIndex = Math.floor(Date.now() / 60000) % Math.min(5, filteredAndSortedTours.length)
        const nameIndex = Math.floor(Date.now() / 45000) % names.length
        const selectedTour = filteredAndSortedTours[tourIndex]
        
        if (selectedTour) {
          const booking = {
            id: Date.now().toString(),
            name: names[nameIndex],
            tour: selectedTour.title.length > 30 ? selectedTour.title.substring(0, 30) + '...' : selectedTour.title,
            time: new Date()
          }
          setRecentBookings(prev => [booking, ...prev.slice(0, 4)])
        }
      }
    }

    const interval = setInterval(addBooking, 30000) // Add booking every 30 seconds
    // Add initial bookings
    setTimeout(addBooking, 5000)
    setTimeout(addBooking, 15000)
    return () => clearInterval(interval)
  }, [filteredAndSortedTours])

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

  // Reset displayed tours when wholesaler changes
  useEffect(() => {
    setDisplayedTours(toursPerLoad)
  }, [selectedWholesalers, toursPerLoad])

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

  // คำนวณจำนวนทั้งหมดของแต่ละ wholesaler (หลัง unique filtering)
  const getTotalCountForWholesaler = (id: string) => {
    if (id === 'all') {
      return convertedTours.length
    }
    
    // นับจาก convertedTours ที่ผ่าน unique filtering แล้ว
    return convertedTours.filter(tour => {
      if (id === 'ttn') return tour.wholesaler.includes('TTN')
      if (id === 'ttnplus') return tour.wholesaler.includes('TTN Plus')
      if (id === 'superb') return tour.wholesaler.includes('Superb')
      if (id === 'bestindo') return tour.wholesaler.includes('Bestindo')
      if (id === 'zego') return tour.wholesaler.includes('ZEGO')
      return false
    }).length
  }

  // คำนวณจำนวนรวมของ wholesaler ที่เลือก
  const getTotalSelectedCount = () => {
    if (selectedWholesalers.includes('all')) {
      return getTotalCountForWholesaler('all')
    }
    return selectedWholesalers.reduce((total, id) => total + getTotalCountForWholesaler(id), 0)
  }

  // Compare functions
  const handleCompareToggle = (tourCode: string) => {
    setCompareList(prev => {
      if (prev.includes(tourCode)) {
        const newList = prev.filter(code => code !== tourCode)
        setShowCompareBar(newList.length > 0)
        return newList
      } else if (prev.length < 10) {
        const newList = [...prev, tourCode]
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
    return (
      <LoadingScreen 
        title="กำลังโหลดข้อมูลทัวร์เต็มรูปแบบ" 
        subtitle="โปรดรอสักครู่... กำลังดึงข้อมูลครบถ้วนจาก API ทุกแหล่ง" 
      />
    )
  }

  return (
    <main className="bg-blue-50/30">
      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {notifications.map((notification, idx) => (
            <div key={idx} className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
              <div className="flex items-center">
                <Bell className="w-4 h-4 mr-2" />
                {notification}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="container mx-auto px-4 py-12">
        {/* Flash Sale Banner */}
        {formatCountdown(flashSaleEnd).hours > 0 && (
          <div className="bg-red-600 text-white rounded-xl p-6 mb-8 relative overflow-hidden">
            <div className="relative z-10 text-center">
              <div className="flex items-center justify-center mb-3">
                <Flame className="w-8 h-8 mr-2" />
                <h2 className="text-3xl font-bold">🔥 FLASH SALE 🔥</h2>
                <Flame className="w-8 h-8 ml-2" />
              </div>
              <p className="text-xl mb-4">ลดสูงสุด 40% เฉพาะวันนี้เท่านั้น!</p>
              <div className="flex justify-center items-center space-x-4 mb-4">
                <div className="bg-white/20 backdrop-blur rounded-lg px-4 py-2">
                  <div className="text-2xl font-bold">{formatCountdown(flashSaleEnd).hours.toString().padStart(2, '0')}</div>
                  <div className="text-sm">ชั่วโมง</div>
                </div>
                <div className="text-2xl font-bold">:</div>
                <div className="bg-white/20 backdrop-blur rounded-lg px-4 py-2">
                  <div className="text-2xl font-bold">{formatCountdown(flashSaleEnd).minutes.toString().padStart(2, '0')}</div>
                  <div className="text-sm">นาที</div>
                </div>
                <div className="text-2xl font-bold">:</div>
                <div className="bg-white/20 backdrop-blur rounded-lg px-4 py-2">
                  <div className="text-2xl font-bold">{formatCountdown(flashSaleEnd).seconds.toString().padStart(2, '0')}</div>
                  <div className="text-sm">วินาที</div>
                </div>
              </div>
              <div className="text-sm opacity-90">⚡ จำกัดเวลา! เมื่อหมดเวลาราคาจะกลับเป็นปกติ</div>
            </div>
          </div>
        )}

        {/* Live Activity Feed */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Recent Bookings */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-green-500" />
              การจองล่าสุด
              <span className="ml-2 text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">LIVE</span>
            </h3>
            <div className="space-y-2 max-h-24 overflow-y-auto">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="text-sm text-gray-600 flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="font-medium text-green-700">{booking.name}</span>
                  <span className="mx-1">จอง</span>
                  <span className="font-medium">{booking.tour}</span>
                  <span className="text-xs text-gray-400 ml-auto">
                    {Math.floor((currentTime.getTime() - booking.time.getTime()) / 60000)} นาทีที่แล้ว
                  </span>
                </div>
              ))}
              {recentBookings.length === 0 && (
                <div className="text-xs text-gray-400 italic">รอการจองใหม่...</div>
              )}
            </div>
          </div>

          {/* Hot Tours */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
              <Flame className="w-5 h-5 mr-2 text-orange-500" />
              ทัวร์ฮิตตอนนี้
              <span className="ml-2 text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">HOT</span>
            </h3>
            <div className="space-y-2 max-h-24 overflow-y-auto">
              {Object.entries(liveViewers).slice(0, 3).map(([tourId, viewers]) => {
                const tour = filteredAndSortedTours.find(t => t.id === tourId)
                return tour ? (
                  <div key={tourId} className="text-sm flex items-center justify-between">
                    <span className="font-medium text-gray-700 truncate">{tour.title.substring(0, 25)}...</span>
                    <div className="flex items-center text-orange-600">
                      <Eye className="w-3 h-3 mr-1" />
                      <span className="font-bold">{viewers}</span>
                      <span className="text-xs ml-1">คนดู</span>
                    </div>
                  </div>
                ) : null
              })}
            </div>
          </div>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">ทัวร์จาก Wholesale API เต็มรูปแบบ</h1>
          <p className="text-lg text-blue-700">แสดงข้อมูลทัวร์จาก API ทุกตัวอย่างครบถ้วน พร้อมรายละเอียดเต็มรูปแบบ</p>
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
              // Wholesale props
              wholesalers={wholesalers}
              selectedWholesalers={selectedWholesalers}
              onWholesalerToggle={handleWholesalerToggle}
              getTotalCountForWholesaler={getTotalCountForWholesaler}
              getTotalSelectedCount={getTotalSelectedCount}
            />
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Recently Viewed Section */}
            {recentlyViewed.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <History className="w-5 h-5 mr-2 text-blue-500" />
                  ดูล่าสุด ({recentlyViewed.length})
                </h3>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {recentlyViewed.slice(0, 5).map(tourId => {
                    const tour = filteredAndSortedTours.find(t => t.id === tourId)
                    if (!tour) return null
                    return (
                      <Link
                        key={tourId}
                        href={`/tours-detail-2/${tour.code || tour.id}`}
                        className="flex-shrink-0 w-32 h-20 relative rounded-lg overflow-hidden hover:scale-105 transition-transform"
                        onClick={() => addToRecentlyViewed(tour.id)}
                      >
                        <Image
                          src={tour.image}
                          alt={tour.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end">
                          <div className="text-white text-xs p-2 font-semibold truncate w-full">
                            {tour.title.length > 20 ? tour.title.substring(0, 20) + '...' : tour.title}
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )}
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
              <div className="flex items-center gap-4">
                {wishlist.length > 0 && (
                  <Link href="/wishlist">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <Heart className="w-4 h-4 mr-1 fill-current" />
                      ดูรายการโปรด ({wishlist.length})
                    </Button>
                  </Link>
                )}
                <div className="hidden sm:block text-sm text-blue-700 whitespace-nowrap">
                  พบ {filteredAndSortedTours.length} โปรแกรม
                </div>
              </div>
            </div>

            {/* Enhanced Tours Grid with MORE DATA */}
            {filteredAndSortedTours.length > 0 ? (
              <>
                <div className={`grid gap-8 ${
                  viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2' :
                  viewMode === 'list' ? 'grid-cols-1' :
                  'grid-cols-1'
                }`}>
                  {displayedToursData.map((tour, index) => {
                    const borderClass = tour.availability === 'เหลือน้อย'
                      ? 'border-2 border-red-500 hover:border-red-600 focus-within:border-red-700'
                      : 'border-2 border-blue-200 hover:border-blue-500/80 focus-within:border-blue-600';
                    
                    return (
                      <Link 
                        key={`${tour.wholesaler}-${tour.id}-${index}`} 
                        href={`/tours-detail-2/${tour.code || tour.id}`} 
                        className={`bg-white rounded-2xl ${borderClass} shadow-lg overflow-hidden flex flex-col cursor-pointer`}
                        onClick={() => addToRecentlyViewed(tour.id)}
                      >
                        <div className="relative h-56">
                          <Image
                            src={tour.image || "/plane.svg"}
                            alt={tour.title || "Tour Image"}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover"
                          />
                          {tour.availability === 'เหลือน้อย' && (
                            <div className="absolute top-2 left-2 z-10">
                              <div className="bg-red-600 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
                                🔥 เหลือน้อย! จองด่วน
                              </div>
                            </div>
                          )}
                          <div className="absolute top-0 right-0 text-white px-3 py-1.5 rounded-bl-lg text-sm font-semibold bg-gradient-to-r from-blue-600 to-cyan-500">
                            {tour.category}
                          </div>
                          
                          {/* Wishlist and Share Buttons */}
                          <div className="absolute top-2 right-2 flex flex-col gap-2">
                            <button
                              onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                toggleWishlist(tour.id)
                              }}
                              className={`p-2 rounded-full shadow-lg ${
                                wishlist.includes(tour.id)
                                  ? 'bg-red-500 text-white'
                                  : 'bg-white/80 text-gray-600'
                              }`}
                            >
                              <Heart className={`w-4 h-4 ${wishlist.includes(tour.id) ? 'fill-current' : ''}`} />
                            </button>
                            <button
                              onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                setShareModalOpen(tour.id)
                              }}
                              className="p-2 rounded-full bg-white/80 text-gray-600 shadow-lg"
                            >
                              <Share2 className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Live Viewers */}
                          {liveViewers[tour.id] && (
                            <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center">
                              <Eye className="w-3 h-3 mr-1" />
                              <span className="font-semibold text-orange-300">{liveViewers[tour.id]}</span>
                              <span className="ml-1">คนดู</span>
                            </div>
                          )}

                          {/* Simple, Clean Badges */}
                          {tour.originalPrice && (
                            <div className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded text-xs font-medium">
                              ลด {Math.round(((tour.originalPrice - tour.price) / tour.originalPrice) * 100)}%
                            </div>
                          )}
                          
                          {tour.availability === 'เหลือน้อย' && (
                            <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-medium">
                              เหลือที่
                            </div>
                          )}
                        </div>
                        
                        <div className="p-5 flex-1 flex flex-col">
                          <div className="flex items-start justify-between mb-2">
                            <h2 className="text-xl font-bold text-blue-900 line-clamp-2 flex-1">{tour.title}</h2>
                            <div className="flex items-center gap-1 ml-2">
                              {wishlist.includes(tour.id) && (
                                <div className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full flex items-center">
                                  <Heart className="w-3 h-3 mr-1 fill-current" />
                                  โปรด
                                </div>
                              )}
                              {(tour.reviews || 0) > 15 && (
                                <div className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full flex items-center">
                                  <TrendingUp className="w-3 h-3 mr-1" />
                                  ฮิต
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {/* Enhanced Tour Details */}
                          {tour.code && (
                            <div className="mb-2 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded inline-block">
                              รหัส: {tour.code}
                            </div>
                          )}
                          
                          {tour.availability === 'เหลือน้อย' && (
                            <div className="mb-2 text-xs text-red-600 font-semibold bg-red-50 px-2 py-1 rounded-full inline-block">
                              เหลือที่นั่งเพียง {tour.availableSlots} ที่! รีบจองก่อนหมด
                            </div>
                          )}

                          {/* Tour Status and Promotion Tags */}
                          <div className="mb-3 flex flex-wrap gap-2">
                            {tour.availability === 'เหลือน้อย' && (
                              <span className="text-xs text-red-700 bg-red-100 px-2 py-1 rounded-full font-medium">
                                เหลือที่นั่ง {tour.availableSlots} ที่
                              </span>
                            )}
                            {tour.originalPrice && (
                              <span className="text-xs text-green-700 bg-green-100 px-2 py-1 rounded-full font-medium">
                                ประหยัด {Math.round(((tour.originalPrice - tour.price) / tour.originalPrice) * 100)}%
                              </span>
                            )}
                            {(tour.reviews || 0) > 20 && (
                              <span className="text-xs text-blue-700 bg-blue-100 px-2 py-1 rounded-full font-medium">
                                ยอดนิยม
                              </span>
                            )}
                          </div>
                          
                          
                          <div className="flex items-center text-gray-500 mb-3 text-sm">
                            <MapPin className="w-4 h-4 mr-1.5 text-blue-500 flex-shrink-0" />
                            <span>{tour.location}</span>
                          </div>
                          

                          {/* Clean Information Grid */}
                          <div className="grid grid-cols-2 gap-3 text-sm text-gray-700 mb-4 bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4 text-blue-600" />
                              <span className="font-medium">{tour.duration}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Users className="w-4 h-4 text-green-600" />
                              <span>{tour.availableSlots} ที่ว่าง</span>
                            </div>
                            {tour.airline && (
                              <div className="flex items-center space-x-2">
                                <Plane className="w-4 h-4 text-sky-600" />
                                <span>{tour.airline}</span>
                              </div>
                            )}
                            {tour.hotelStar > 0 && (
                              <div className="flex items-center space-x-2">
                                <Hotel className="w-4 h-4 text-amber-600" />
                                <span>{tour.hotelStar} ดาว</span>
                              </div>
                            )}
                          </div>
                          
                          {/* Travel Periods - Month-based Display */}
                          {tour.periods && tour.periods.length > 0 && (() => {
                            // Function to extract month from date string
                            const getMonthFromDate = (dateStr: any) => {
                              if (!dateStr || dateStr === 'รอประกาศ') return null;
                              
                              // Try to extract month from various date formats
                              const thaiMonths = {
                                'ม.ค.': '01', 'มกราคม': '01', 'มค': '01', 'jan': '01', 'january': '01',
                                'ก.พ.': '02', 'กุมภาพันธ์': '02', 'กพ': '02', 'feb': '02', 'february': '02',
                                'มี.ค.': '03', 'มีนาคม': '03', 'มีค': '03', 'mar': '03', 'march': '03',
                                'เม.ย.': '04', 'เมษายน': '04', 'เมย': '04', 'apr': '04', 'april': '04',
                                'พ.ค.': '05', 'พฤษภาคม': '05', 'พค': '05', 'may': '05',
                                'มิ.ย.': '06', 'มิถุนายน': '06', 'มิย': '06', 'jun': '06', 'june': '06',
                                'ก.ค.': '07', 'กรกฎาคม': '07', 'กค': '07', 'jul': '07', 'july': '07',
                                'ส.ค.': '08', 'สิงหาคม': '08', 'สค': '08', 'aug': '08', 'august': '08',
                                'ก.ย.': '09', 'กันยายน': '09', 'กย': '09', 'sep': '09', 'september': '09',
                                'ต.ค.': '10', 'ตุลาคม': '10', 'ตค': '10', 'oct': '10', 'october': '10',
                                'พ.ย.': '11', 'พฤศจิกายน': '11', 'พย': '11', 'nov': '11', 'november': '11',
                                'ธ.ค.': '12', 'ธันวาคม': '12', 'ธค': '12', 'dec': '12', 'december': '12'
                              };
                              
                              const lowerDate = dateStr.toLowerCase();
                              for (const [monthName, monthNum] of Object.entries(thaiMonths)) {
                                if (lowerDate.includes(monthName.toLowerCase())) {
                                  return monthNum;
                                }
                              }
                              
                              // Try to extract from date patterns like DD/MM/YYYY or YYYY-MM-DD
                              const dateMatch = dateStr.match(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);
                              if (dateMatch) {
                                return dateMatch[2].padStart(2, '0');
                              }
                              
                              return null;
                            };
                            
                            // Group periods by month
                            const periodsByMonth = tour.periods.reduce((groups: any, period: any) => {
                              const month = getMonthFromDate(period.dates || period.startDate);
                              if (month) {
                                if (!groups[month]) groups[month] = [];
                                groups[month].push(period);
                              } else {
                                if (!groups['00']) groups['00'] = [];
                                groups['00'].push(period);
                              }
                              return groups;
                            }, {});
                            
                            const monthNames = ['', 'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
                            
                            return (
                              <div className="mb-4">
                                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 shadow-sm">
                                  <div className="text-xs font-semibold text-blue-800 mb-3 flex items-center">
                                    <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                                    รอบการเดินทาง ({tour.periods.length} รอบ)
                                  </div>
                                  <div className="max-h-32 overflow-y-auto">
                                    {Object.entries(periodsByMonth)
                                      .sort(([a], [b]) => a.localeCompare(b))
                                      .map(([month, periods]: any) => (
                                        <div key={month} className="mb-3 last:mb-0">
                                          <div className="flex items-center mb-2">
                                            <div className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-full font-semibold mr-3 shadow-sm">
                                              {month === '00' ? 'อื่นๆ' : monthNames[parseInt(month)]}
                                            </div>
                                            <span className="text-xs text-blue-600 font-medium">
                                              {periods.length} รอบ
                                            </span>
                                          </div>
                                          <div className="ml-6 space-y-2">
                                            {periods.map((period: any, idx: number) => (
                                              <div key={idx} className="text-xs">
                                                <div className="flex justify-between items-start bg-white/60 rounded-lg px-3 py-2 border border-blue-100">
                                                  <div className="flex-1">
                                                    <div className="font-medium text-blue-800 text-xs">
                                                      {period.dates || period.startDate || 'รอประกาศ'}
                                                    </div>
                                                    {period.price && period.price !== tour.price && (
                                                      <div className="text-emerald-600 font-semibold mt-1 text-xs">
                                                        ฿{period.price.toLocaleString()}
                                                      </div>
                                                    )}
                                                  </div>
                                                  {period.available && (
                                                    <div className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full ml-2 whitespace-nowrap font-medium">
                                                      ว่าง {period.available}
                                                    </div>
                                                  )}
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      ))}
                                  </div>
                                </div>
                              </div>
                            );
                          })()}

                          {/* Highlights - Enhanced */}
                          {tour.highlights && tour.highlights.length > 0 && (
                            <div className="mb-3">
                              <div className="text-xs font-semibold text-gray-700 mb-2 flex items-center">
                                <Star className="w-3 h-3 mr-1 text-yellow-500" />
                                ไฮไลท์ ({tour.highlights.length} รายการ)
                              </div>
                              <div className="max-h-20 overflow-y-auto space-y-1">
                                {tour.highlights.map((highlight: any, idx: number) => (
                                  <div key={idx} className="text-xs bg-yellow-50 text-yellow-700 px-2 py-1 rounded flex items-start">
                                    <span className="text-yellow-500 mr-1 flex-shrink-0">✨</span>
                                    <span>{highlight}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Tags - New Addition */}
                          {tour.tags && tour.tags.length > 0 && (
                            <div className="mb-3">
                              <div className="text-xs font-semibold text-gray-700 mb-2">แท็ก:</div>
                              <div className="flex flex-wrap gap-1">
                                {tour.tags.slice(0, 5).map((tag: any, idx: number) => (
                                  <span key={idx} className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full border border-purple-200">
                                    #{tag}
                                  </span>
                                ))}
                                {tour.tags.length > 5 && (
                                  <span className="text-xs text-gray-500">+{tour.tags.length - 5}</span>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Itinerary Preview - New Addition */}
                          {tour.itinerary && tour.itinerary.length > 0 && (
                            <div className="mb-3">
                              <div className="text-xs font-semibold text-gray-700 mb-2 flex items-center">
                                <Globe className="w-3 h-3 mr-1 text-indigo-600" />
                                รายการท่องเที่ยว ({tour.itinerary.length} วัน)
                              </div>
                              <div className="max-h-16 overflow-y-auto space-y-1">
                                {tour.itinerary.slice(0, 3).map((item: any, idx: number) => (
                                  <div key={idx} className="text-xs bg-indigo-50 text-indigo-700 p-2 rounded">
                                    <span className="font-medium">วันที่ {item.day}:</span> {item.description.slice(0, 50)}
                                    {item.description.length > 50 && '...'}
                                  </div>
                                ))}
                                {tour.itinerary.length > 3 && (
                                  <div className="text-xs text-gray-500 text-center">+{tour.itinerary.length - 3} วันเพิ่มเติม</div>
                                )}
                              </div>
                            </div>
                          )}
                          
                          {/* Additional Files - Enhanced */}
                          {(tour.pdfUrl || tour.wordUrl) && (
                            <div className="mb-3">
                              <div className="text-xs font-semibold text-gray-700 mb-2">เอกสารแนบ:</div>
                              <div className="flex gap-2">
                                {tour.pdfUrl && (
                                  <a 
                                    href={tour.pdfUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center text-xs bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-800 px-2 py-1 rounded border border-red-200 transition-colors"
                                  >
                                    <FileText className="w-3 h-3 mr-1" />
                                    <span>ดู PDF</span>
                                  </a>
                                )}
                                {tour.wordUrl && (
                                  <a 
                                    href={tour.wordUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center text-xs bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-800 px-2 py-1 rounded border border-blue-200 transition-colors"
                                  >
                                    <Download className="w-3 h-3 mr-1" />
                                    <span>ดาวน์โหลด Word</span>
                                  </a>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Data Completeness Indicator */}
                          <div className="mb-3 flex items-center justify-between text-xs">
                            <div className="flex items-center space-x-2">
                              <span className="text-gray-500">ความครบถ้วนข้อมูล:</span>
                              <div className="flex space-x-1">
                                {tour.periods && tour.periods.length > 0 && (
                                  <div className="w-2 h-2 bg-green-500 rounded-full" title="มีรอบการเดินทาง"></div>
                                )}
                                {tour.itinerary && tour.itinerary.length > 0 && (
                                  <div className="w-2 h-2 bg-indigo-500 rounded-full" title="มีรายการท่องเที่ยว"></div>
                                )}
                                {(tour.pdfUrl || tour.wordUrl) && (
                                  <div className="w-2 h-2 bg-red-500 rounded-full" title="มีเอกสารแนบ"></div>
                                )}
                                {tour.highlights && tour.highlights.length > 0 && (
                                  <div className="w-2 h-2 bg-yellow-500 rounded-full" title="มีไฮไลท์"></div>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between mb-4 py-2 border-t border-gray-200">
                            <div className="flex items-center">
                              <StarRating rating={tour.rating} size="md" />
                              <span className="text-sm text-gray-700 ml-2 font-medium">{tour.rating.toFixed(1)}</span>
                            </div>
                            <span className="text-sm text-gray-600">({tour.reviews} รีวิว)</span>
                          </div>
                          
                          <div className="mt-auto">
                            {/* Wholesale Info */}
                            {(selectedWholesalers.includes('all') || selectedWholesalers.length > 1) && (
                              <div className={`mb-4 p-3 rounded-xl bg-${tour.wholesalerColor}-50 border border-${tour.wholesalerColor}-200`}>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full bg-${tour.wholesalerColor}-500`}></div>
                                    <span className={`text-sm font-semibold text-${tour.wholesalerColor}-700`}>
                                      {tour.wholesaler}
                                    </span>
                                  </div>
                                  <div className={`text-xs text-${tour.wholesalerColor}-600 bg-${tour.wholesalerColor}-100 px-2 py-1 rounded-full`}>
                                    Wholesale
                                  </div>
                                </div>
                              </div>
                            )}
                            
                            {/* Clean Price Section */}
                            <div className="border-t border-gray-200 pt-4 mb-4">
                              {tour.originalPrice && (
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-gray-400 line-through text-sm">฿{tour.originalPrice.toLocaleString()}</span>
                                  <span className="bg-red-100 text-red-700 text-xs px-3 py-1 rounded-full font-medium">
                                    ประหยัด {Math.round(((tour.originalPrice - tour.price) / tour.originalPrice) * 100)}%
                                  </span>
                                </div>
                              )}
                              <div className="flex items-baseline justify-between">
                                <div className="text-3xl font-bold text-blue-900">
                                  ฿{tour.price.toLocaleString()}
                                </div>
                                <span className="text-sm text-gray-500">/ต่อท่าน</span>
                              </div>
                            </div>
                            
                            {/* Action buttons */}
                            <div className="flex gap-2">
                              <button
                                onClick={(e) => {
                                  e.preventDefault()
                                  handleCompareToggle(tour.code)
                                }}
                                className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center ${
                                  compareList.includes(tour.code)
                                    ? 'bg-orange-500 text-white hover:bg-orange-600'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                              >
                                <ArrowUpDown className="w-3 h-3 mr-1" />
                                {compareList.includes(tour.code) ? 'ยกเลิก' : 'เปรียบเทียบ'}
                              </button>
                              
                              <Button
                                variant={tour.availability === 'เหลือน้อย' ? undefined : 'primary'}
                                size="default"
                                className={
                                  tour.availability === 'เหลือน้อย'
                                    ? 'flex-1 bg-red-600 text-white font-bold text-lg shadow-lg hover:bg-red-700 active:scale-95 transition-all duration-150 border-2 border-red-600 hover:shadow-xl'
                                    : 'flex-1'
                                }
                              >
                                {tour.availability === 'เหลือน้อย' ? '🔥 จองด่วน!' : 'ดูรายละเอียด'}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
                
                {/* Loading and Load More */}
                {isLoading && (
                   <div className="flex justify-center items-center py-12">
                     <div className="flex items-center space-x-3 text-blue-600">
                       <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                       <span className="font-medium">กำลังโหลดทัวร์เพิ่มเติม...</span>
                     </div>
                   </div>
                 )}
                 
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

      {/* Share Modal */}
      {shareModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Share2 className="w-5 h-5 mr-2 text-blue-500" />
              แชร์ทัวร์นี้
            </h3>
            <div className="space-y-3">
              <button
                onClick={() => shareUrl(shareModalOpen, 'facebook')}
                className="w-full flex items-center p-3 border rounded-lg hover:bg-blue-50 transition-colors"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-sm font-bold">f</span>
                </div>
                <span>แชร์ไปยัง Facebook</span>
              </button>
              <button
                onClick={() => shareUrl(shareModalOpen, 'line')}
                className="w-full flex items-center p-3 border rounded-lg hover:bg-green-50 transition-colors"
              >
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-sm font-bold">LINE</span>
                </div>
                <span>แชร์ไปยัง LINE</span>
              </button>
              <button
                onClick={() => shareUrl(shareModalOpen, 'copy')}
                className="w-full flex items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-sm">📋</span>
                </div>
                <span>คัดลอกลิงก์</span>
              </button>
            </div>
            <button
              onClick={() => setShareModalOpen(null)}
              className="w-full mt-4 p-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              ปิด
            </button>
          </div>
        </div>
      )}

      {/* Abandonment Recovery Popup */}
      {showExitIntent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-red-500"></div>
            <button
              onClick={() => setShowExitIntent(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="text-center">
              <div className="mb-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">รอก่อน!</h3>
                <p className="text-gray-600 mb-4">อย่าพลาดโอกาสดีๆ แบบนี้!</p>
              </div>
              <div className="bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-red-700 mb-2">รับส่วนลดพิเศษ!</h4>
                <p className="text-sm text-red-600 mb-3">ใช้โค้ด <span className="font-bold bg-red-200 px-2 py-1 rounded">SAVE15</span> ลด 15% ทันที!</p>
                <div className="flex items-center justify-center space-x-2 text-sm text-orange-600">
                  <Timer className="w-4 h-4" />
                  <span>เหลือเวลาอีก 10 นาที!</span>
                </div>
              </div>
              <div className="space-y-3">
                <Button
                  onClick={() => setShowExitIntent(false)}
                  className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold"
                >
                  ได้! ฉันอยากดูทัวร์ต่อ
                </Button>
                <button
                  onClick={() => setShowExitIntent(false)}
                  className="w-full text-sm text-gray-500 hover:text-gray-700"
                >
                  ไม่แล้ว ขอบคุณ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Smart Recommendations */}
      {filteredAndSortedTours.length > 5 && (
        <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-sm border border-blue-200 z-40">
          <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
            <Lightbulb className="w-4 h-4 mr-2 text-yellow-500" />
            แนะนำสำหรับคุณ
          </h4>
          <div className="space-y-2">
            {filteredAndSortedTours.slice(0, 2).map((tour) => (
              <div key={tour.id} className="flex items-center space-x-2 text-sm">
                <div className="w-8 h-8 rounded overflow-hidden flex-shrink-0">
                  <Image
                    src={tour.image || "/plane.svg"}
                    alt={tour.title}
                    width={32}
                    height={32}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-800 truncate">{tour.title.substring(0, 20)}...</div>
                  <div className="text-xs text-blue-600 font-semibold">฿{tour.price.toLocaleString()}</div>
                </div>
                <Star className="w-4 h-4 text-yellow-500 flex-shrink-0" />
              </div>
            ))}
          </div>
          <div className="mt-3 text-xs text-center">
            <button className="text-blue-600 hover:text-blue-800 font-medium">
              ดูทั้งหมด บนพื้นฐานความชอบของคุณ
            </button>
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
                    const tour = filteredAndSortedTours.find(t => t.code === tourCode)
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
    </main>
  )
}

export default function WholesaleToursPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen">กำลังโหลดข้อมูลทัวร์เต็มรูปแบบ...</div>}>
      <WholesaleToursPageContent />
    </Suspense>
  )
}