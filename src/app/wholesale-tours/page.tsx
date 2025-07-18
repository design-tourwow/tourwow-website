'use client'

import { useState, useEffect, useMemo, Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search, MapPin, Calendar, Users, Star, Clock, Plane, Tag, Filter, ArrowRight, Phone, Download, FileText, Briefcase, Utensils, Hotel, BadgeCheck, Grid, LayoutGrid, X, ChevronDown } from 'lucide-react'
import { LoadingProvider } from '@/components/LoadingProvider'
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
    availability: 'ว่าง', // 15 slots = ว่าง
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
    availability: 'เหลือน้อย', // 3 slots = เหลือน้อย (<=5)
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
  
  // ไต้หวัน
  'taiwan': 'ไต้หวัน',
  'taipei': 'ไต้หวัน',
  'kaohsiung': 'ไต้หวัน',
  'taichung': 'ไต้หวัน',
  
  // ฮ่องกง
  'hong kong': 'ฮ่องกง',
  'hk': 'ฮ่องกง',
  
  // สิงคโปร์
  'singapore': 'สิงคโปร์',
  'sg': 'สิงคโปร์',
  
  // มาเลเซีย
  'malaysia': 'มาเลเซีย',
  'kuala lumpur': 'มาเลเซีย',
  'penang': 'มาเลเซีย',
  'langkawi': 'มาเลเซีย',
  'kota kinabalu': 'มาเลเซีย',
  'มาเลเซีย': 'มาเลเซีย',
  'มาเลเซีย-สิงคโปร์': 'มาเลเซีย',
  
  // อินโดนีเซีย
  'indonesia': 'อินโดนีเซีย',
  'jakarta': 'อินโดนีเซีย',
  'bali': 'อินโดนีเซีย',
  'yogyakarta': 'อินโดนีเซีย',
  'bandung': 'อินโดนีเซีย',
  
  // ฟิลิปปินส์
  'philippines': 'ฟิลิปปินส์',
  'manila': 'ฟิลิปปินส์',
  'cebu': 'ฟิลิปปินส์',
  'boracay': 'ฟิลิปปินส์',
  
  // เวียดนาม
  'vietnam': 'เวียดนาม',
  'ho chi minh': 'เวียดนาม',
  'hanoi': 'เวียดนาม',
  'da nang': 'เวียดนาม',
  'hoi an': 'เวียดนาม',
  
  // กัมพูชา
  'cambodia': 'กัมพูชา',
  'phnom penh': 'กัมพูชา',
  'siem reap': 'กัมพูชา',
  
  // ลาว
  'laos': 'ลาว',
  'vientiane': 'ลาว',
  'luang prabang': 'ลาว',
  
  // พม่า
  'myanmar': 'พม่า',
  'yangon': 'พม่า',
  'mandalay': 'พม่า',
  
  // อินเดีย
  'india': 'อินเดีย',
  'delhi': 'อินเดีย',
  'mumbai': 'อินเดีย',
  'kolkata': 'อินเดีย',
  'bangalore': 'อินเดีย',
  
  // ออสเตรเลีย
  'australia': 'ออสเตรเลีย',
  'sydney': 'ออสเตรเลีย',
  'melbourne': 'ออสเตรเลีย',
  'brisbane': 'ออสเตรเลีย',
  'perth': 'ออสเตรเลีย',
  
  // นิวซีแลนด์
  'new zealand': 'นิวซีแลนด์',
  'auckland': 'นิวซีแลนด์',
  'wellington': 'นิวซีแลนด์',
  'christchurch': 'นิวซีแลนด์',
  
  // สหรัฐอเมริกา
  'united states': 'สหรัฐอเมริกา',
  'usa': 'สหรัฐอเมริกา',
  'new york': 'สหรัฐอเมริกา',
  'los angeles': 'สหรัฐอเมริกา',
  'san francisco': 'สหรัฐอเมริกา',
  'las vegas': 'สหรัฐอเมริกา',
  'chicago': 'สหรัฐอเมริกา',
  
  // แคนาดา
  'canada': 'แคนาดา',
  'toronto': 'แคนาดา',
  'vancouver': 'แคนาดา',
  'montreal': 'แคนาดา',
  
  // สหราชอาณาจักร
  'united kingdom': 'สหราชอาณาจักร',
  'uk': 'สหราชอาณาจักร',
  'london': 'สหราชอาณาจักร',
  'manchester': 'สหราชอาณาจักร',
  'edinburgh': 'สหราชอาณาจักร',
  
  // ฝรั่งเศส
  'france': 'ฝรั่งเศส',
  'paris': 'ฝรั่งเศส',
  'lyon': 'ฝรั่งเศส',
  'marseille': 'ฝรั่งเศส',
  'nice': 'ฝรั่งเศส',
  
  // เยอรมนี
  'germany': 'เยอรมนี',
  'berlin': 'เยอรมนี',
  'munich': 'เยอรมนี',
  'hamburg': 'เยอรมนี',
  'frankfurt': 'เยอรมนี',
  
  // อิตาลี
  'italy': 'อิตาลี',
  'rome': 'อิตาลี',
  'milan': 'อิตาลี',
  'venice': 'อิตาลี',
  'florence': 'อิตาลี',
  'naples': 'อิตาลี',
  
  // สเปน
  'spain': 'สเปน',
  'madrid': 'สเปน',
  'barcelona': 'สเปน',
  'seville': 'สเปน',
  'valencia': 'สเปน',
  
  // เนเธอร์แลนด์
  'netherlands': 'เนเธอร์แลนด์',
  'amsterdam': 'เนเธอร์แลนด์',
  'rotterdam': 'เนเธอร์แลนด์',
  
  // สวิตเซอร์แลนด์
  'switzerland': 'สวิตเซอร์แลนด์',
  'zurich': 'สวิตเซอร์แลนด์',
  'geneva': 'สวิตเซอร์แลนด์',
  'bern': 'สวิตเซอร์แลนด์',
  
  // ออสเตรีย
  'austria': 'ออสเตรีย',
  'vienna': 'ออสเตรีย',
  'salzburg': 'ออสเตรีย',
  
  // สวีเดน
  'sweden': 'สวีเดน',
  'stockholm': 'สวีเดน',
  'gothenburg': 'สวีเดน',
  
  // นอร์เวย์
  'norway': 'นอร์เวย์',
  'oslo': 'นอร์เวย์',
  'bergen': 'นอร์เวย์',
  
  // เดนมาร์ก
  'denmark': 'เดนมาร์ก',
  'copenhagen': 'เดนมาร์ก',
  
  // ฟินแลนด์
  'finland': 'ฟินแลนด์',
  'helsinki': 'ฟินแลนด์',
  
  // รัสเซีย
  'russia': 'รัสเซีย',
  'moscow': 'รัสเซีย',
  'st petersburg': 'รัสเซีย',
  
  // ตุรกี
  'turkey': 'ตุรกี',
  'istanbul': 'ตุรกี',
  'ankara': 'ตุรกี',
  'cappadocia': 'ตุรกี',
  
  // อียิปต์
  'egypt': 'อียิปต์',
  'cairo': 'อียิปต์',
  'alexandria': 'อียิปต์',
  'luxor': 'อียิปต์',
  
  // แอฟริกาใต้
  'south africa': 'แอฟริกาใต้',
  'cape town': 'แอฟริกาใต้',
  'johannesburg': 'แอฟริกาใต้',
  
  // เคนยา
  'kenya': 'เคนยา',
  'nairobi': 'เคนยา',
  
  // บราซิล
  'brazil': 'บราซิล',
  'rio de janeiro': 'บราซิล',
  'sao paulo': 'บราซิล',
  
  // อาร์เจนตินา
  'argentina': 'อาร์เจนตินา',
  'buenos aires': 'อาร์เจนตินา',
  
  // ชิลี
  'chile': 'ชิลี',
  'santiago': 'ชิลี',
  
  // เปรู
  'peru': 'เปรู',
  'lima': 'เปรู',
  'cusco': 'เปรู',
  
  // เม็กซิโก
  'mexico': 'เม็กซิโก',
  'mexico city': 'เม็กซิโก',
  'cancun': 'เม็กซิโก',
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
  const [allTours, setAllTours] = useState<any[]>([])
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
  const [isLoading, setIsLoading] = useState(false)
  const toursPerLoad = 20
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Fetch TTN data
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
            price: parseInt(program.P_PRICE) || 0,
            available: 10,
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
            program.P_HIGHLIGHT.split(',').map((h: string) => h.trim()).filter((h: string) => h.length > 0).slice(0, 6) : 
            []
          
          const tags = program.P_TAG ? 
            program.P_TAG.split(',').map((t: string) => t.trim()).filter((t: string) => t.length > 0).slice(0, 4) : 
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

  // Fetch TTN Plus data
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
        name: item.P_NAME || 'ทัวร์',
        code: item.P_CODE || '',
        price: parseInt(item.P_PRICE) || 0,
        image: item.banner_url || '/plane.svg',
        location: item.P_LOCATION || '',
        days: parseInt(item.P_DAY) || 0,
        nights: parseInt(item.P_NIGHT) || 0,
        airline: item.P_AIRLINE || '',
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

  // Fetch Superb Holiday data
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
        id: item.mainid || `superb-${index}`,
        name: item.title || 'ทัวร์',
        code: item.maincode || item.ProductCode || '',
        price: parseInt(item.startingprice) || 0,
        image: item.banner || item.bannerFull || '/plane.svg',
        location: item.Country || '',
        days: parseInt(item.day) || 0,
        nights: parseInt(item.night) || 0,
        airline: item.aey || item.Airline || '',
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

  // Fetch Bestindo data
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
        name: item.name || 'ทัวร์',
        code: item.code || '',
        price: parseInt(item.price) || 0,
        image: item.bannerSq || item.banner || '/plane.svg',
        location: item.country_name || item.country_name_eng || '',
        days: parseInt(item.time?.split(' ')[0]) || 0,
        nights: parseInt(item.time?.split(' ')[2]) || 0,
        airline: item.airline_name || '',
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
      // เมื่อเลือก "ทั้งหมด" ให้โหลดข้อมูลทุก API ที่ยังไม่มีข้อมูล
      fetchAllData()
    } else {
      // โหลดข้อมูลตาม wholesaler ที่เลือก
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

  // Convert tours to unified format
  const convertedTours = useMemo(() => {
    let tours = []
    
    // Helper function to convert any tour to unified format
    const convertTour = (tour: any, wholesaler: string, color: string) => {
      const availableSlots = Math.floor(Math.random() * 20) + 1 // 1-20 slots
      
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
        rating: Math.round((Math.random() * 1.5 + 3.5) * 10) / 10, // 3.5-5.0
        reviews: Math.floor(Math.random() * 50) + 10,
        availableSlots,
        availability: availableSlots <= 5 ? 'เหลือน้อย' : 'ว่าง', // Show เหลือน้อย only when <= 5 seats
        groupSize: `กลุ่ม ${Math.floor(Math.random() * 20) + 10}-${Math.floor(Math.random() * 20) + 30} ท่าน`,
        highlights: tour.highlights || [],
        wholesaler,
        wholesalerColor: color
      }
    }
    
    if (selectedWholesalers.includes('all')) {
      // Combine all tours
      const ttnConverted = ttnTours.map(tour => convertTour(tour, 'TTN', 'indigo'))
      const ttnPlusConverted = ttnPlusTours.map(tour => convertTour(tour, 'TTN Plus', 'emerald'))
      const superbConverted = superbTours.map(tour => convertTour(tour, 'Superb', 'orange'))
      const bestindoConverted = bestindoTours.map(tour => convertTour(tour, 'Bestindo', 'cyan'))
      const zegoConverted = mockZegoTours.map(tour => convertTour(tour, 'ZEGO', 'pink'))
      
      tours = [...ttnConverted, ...ttnPlusConverted, ...superbConverted, ...bestindoConverted, ...zegoConverted]
    } else {
      // Combine selected wholesalers
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
  const sortOptions = ['ยอดนิยม', 'ราคาต่ำ-สูง', 'ราคาสูง-ต่ำ', 'คะแนนรีวิว']

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

    const sorted = [...filtered]

    switch (sortBy) {
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
  }, [searchTerm, selectedCategory, selectedCountry, priceRange, sortBy, convertedTours])

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

  // Handle multi-select logic
  const handleWholesalerToggle = (wholesalerId: string) => {
    if (wholesalerId === 'all') {
      // เลือก "ทั้งหมด" ให้ล้างการเลือกอื่นและเลือกแค่ all
      setSelectedWholesalers(['all'])
    } else {
      setSelectedWholesalers(prev => {
        // ถ้าเลือก wholesaler อื่น ให้เอา "all" ออกก่อน
        const withoutAll = prev.filter(id => id !== 'all')
        
        if (withoutAll.includes(wholesalerId)) {
          // ถ้ามีอยู่แล้ว ให้ลบออก
          const newSelection = withoutAll.filter(id => id !== wholesalerId)
          // ถ้าไม่เหลืออะไรเลย ให้เลือก "ทั้งหมด"
          return newSelection.length === 0 ? ['all'] : newSelection
        } else {
          // ถ้ายังไม่มี ให้เพิ่มเข้าไป
          return [...withoutAll, wholesalerId]
        }
      })
    }
  }

  // คำนวณจำนวนทั้งหมดของแต่ละ wholesaler
  const getTotalCountForWholesaler = (id: string) => {
    switch (id) {
      case 'all':
        return ttnTours.length + ttnPlusTours.length + superbTours.length + bestindoTours.length + mockZegoTours.length
      case 'ttn':
        return ttnTours.length
      case 'ttnplus':
        return ttnPlusTours.length
      case 'superb':
        return superbTours.length
      case 'bestindo':
        return bestindoTours.length
      case 'zego':
        return mockZegoTours.length
      default:
        return 0
    }
  }

  // คำนวณจำนวนรวมของ wholesaler ที่เลือก
  const getTotalSelectedCount = () => {
    if (selectedWholesalers.includes('all')) {
      return getTotalCountForWholesaler('all')
    }
    return selectedWholesalers.reduce((total, id) => total + getTotalCountForWholesaler(id), 0)
  }

  if (loading) {
    return (
      <LoadingScreen 
        title="กำลังโหลดข้อมูลทัวร์ Wholesale" 
        subtitle="โปรดรอสักครู่... กำลังดึงข้อมูลจาก API หลายแหล่ง" 
      />
    )
  }

  return (
    <main className="bg-blue-50/30">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">ทัวร์จาก Wholesale API</h1>
          
          
          <p className="text-lg text-blue-700">เลือกดู Program Tour จาก Wholesale API ต่างๆ พร้อมข้อมูลอัปเดตแบบเรียลไทม์</p>
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
              <div className="hidden sm:block text-sm text-blue-700 whitespace-nowrap">
                พบ {filteredAndSortedTours.length} โปรแกรม
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
                  {displayedToursData.map((tour, index) => {
                    if (tour.availability === 'เต็ม') {
                      return (
                        <div key={`${tour.wholesaler}-${tour.id}-${index}`} className="bg-white rounded-2xl border-2 border-blue-200 shadow-lg group-hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col hover:border-blue-500/80 focus-within:border-blue-600 opacity-50 cursor-not-allowed">
                          <div className="relative h-56">
                            <Image
                              src={tour.image || "/plane.svg"}
                              alt={tour.title || "Tour Image"}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
                              <div className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold text-lg">
                                เต็มแล้ว
                              </div>
                            </div>
                            <div className="absolute top-0 right-0 text-white px-3 py-1.5 rounded-bl-lg text-sm font-semibold bg-gray-400">
                              {tour.category}
                            </div>
                          </div>
                          <div className="p-5 flex-1 flex flex-col">
                            <h2 className="text-xl font-bold text-blue-900 mb-2 line-clamp-2">{tour.title}</h2>
                            <div className="flex items-center text-gray-500 mb-3 text-sm">
                              <MapPin className="w-4 h-4 mr-1.5 text-blue-500 flex-shrink-0" />
                              <span>{tour.location}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm text-gray-600 mb-4 border-t border-b border-gray-100 py-3">
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1.5 text-blue-500" />
                                <span>{tour.duration}</span>
                              </div>
                              <div className="flex items-center">
                                <Users className="w-4 h-4 mr-1.5 text-blue-500" />
                                <span>เต็มแล้ว</span>
                              </div>
                            </div>
                            <div className="flex items-center mb-4">
                              <StarRating rating={tour.rating} size="md" />
                              <span className="text-sm text-blue-800 ml-2 font-semibold">{tour.rating.toFixed(1)} ({tour.reviews} รีวิว)</span>
                            </div>
                            <div className="mt-auto">
                              {/* Wholesale Info at bottom when viewing multiple */}
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
                              
                              <div className="text-right mb-4">
                                {tour.originalPrice && (
                                  <div className="mb-1">
                                    <span className="text-gray-400 line-through text-sm mr-2">฿{tour.originalPrice.toLocaleString()}</span>
                                  </div>
                                )}
                                <div className="text-2xl font-bold text-gray-400">
                                  ฿{tour.price.toLocaleString()} <span className="text-sm font-normal text-gray-500">/ต่อท่าน</span>
                                </div>
                              </div>
                              <Button variant="outline" size="default" className="w-full opacity-50 cursor-not-allowed bg-gray-100 text-gray-400 border-gray-300" disabled>
                                เต็มแล้ว
                              </Button>
                            </div>
                          </div>
                        </div>
                      )
                    } else {
                      const borderClass = tour.availability === 'เหลือน้อย'
                        ? 'border-2 border-red-500 hover:border-red-600 focus-within:border-red-700'
                        : 'border-2 border-blue-200 hover:border-blue-500/80 focus-within:border-blue-600';
                      return (
                        <Link key={`${tour.wholesaler}-${tour.id}-${index}`} href={`/tours/${tour.id}`} className={`bg-white rounded-2xl ${borderClass} shadow-lg group-hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col cursor-pointer`}>
                          <div className="relative h-56">
                            <Image
                              src={tour.image || "/plane.svg"}
                              alt={tour.title || "Tour Image"}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            {tour.availability === 'เหลือน้อย' && (
                              <div className="absolute top-2 left-2 z-10">
                                <div className="bg-gradient-to-r from-red-600 via-yellow-400 to-orange-500 text-white px-3 py-1.5 rounded-full text-sm font-bold animate-pulse shadow-lg">
                                  🔥 เหลือน้อย! จองด่วน
                                </div>
                                <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-30"></div>
                              </div>
                            )}
                            <div className="absolute top-0 right-0 text-white px-3 py-1.5 rounded-bl-lg text-sm font-semibold bg-gradient-to-r from-blue-600 to-cyan-500">
                              {tour.category}
                            </div>
                          </div>
                          <div className="p-5 flex-1 flex flex-col">
                            <h2 className="text-xl font-bold text-blue-900 mb-2 line-clamp-2">{tour.title}</h2>
                            {tour.availability === 'เหลือน้อย' && (
                              <div className="mb-2 text-xs text-red-600 font-semibold bg-red-50 px-2 py-1 rounded-full inline-block animate-pulse">
                                เหลือที่นั่งเพียง {tour.availableSlots} ที่! รีบจองก่อนหมด
                              </div>
                            )}
                            {tour.availability === 'ว่าง' && tour.originalPrice && (
                              <div className="mb-2 text-xs text-green-600 font-semibold bg-green-50 px-2 py-1 rounded-full inline-block">
                                โปรโมชั่นพิเศษ! ประหยัดสูงสุด {Math.round(((tour.originalPrice - tour.price) / tour.originalPrice) * 100)}%
                              </div>
                            )}
                            <div className="flex items-center text-gray-500 mb-3 text-sm">
                              <MapPin className="w-4 h-4 mr-1.5 text-blue-500 flex-shrink-0" />
                              <span>{tour.location}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm text-gray-600 mb-4 border-t border-b border-gray-100 py-3">
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1.5 text-blue-500" />
                                <span>{tour.duration}</span>
                              </div>
                              <div className="flex items-center">
                                <Users className="w-4 h-4 mr-1.5 text-blue-500" />
                                <span>{tour.availableSlots ? `ว่าง ${tour.availableSlots} ที่นั่ง` : tour.groupSize}</span>
                              </div>
                            </div>
                            <div className="flex items-center mb-4">
                              <StarRating rating={tour.rating} size="md" />
                              <span className="text-sm text-blue-800 ml-2 font-semibold">{tour.rating.toFixed(1)} ({tour.reviews} รีวิว)</span>
                            </div>
                            <div className="mt-auto">
                              {/* Wholesale Info at bottom when viewing multiple */}
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
                              
                              <div className="text-right mb-4">
                                {tour.originalPrice && (
                                  <div className="mb-1">
                                    <span className="text-gray-400 line-through text-sm mr-2">฿{tour.originalPrice.toLocaleString()}</span>
                                  </div>
                                )}
                                <div className="text-2xl font-bold text-gray-400">
                                  ฿{tour.price.toLocaleString()} <span className="text-sm font-normal text-gray-500">/ต่อท่าน</span>
                                </div>
                              </div>
                              <Button
                                variant={tour.availability === 'เหลือน้อย' ? undefined : 'primary'}
                                size="default"
                                className={
                                  tour.availability === 'เหลือน้อย'
                                    ? 'w-full bg-red-600 text-white font-bold text-lg shadow-lg hover:bg-red-700 active:scale-95 transition-all duration-150 border-2 border-red-600 hover:shadow-xl'
                                    : 'w-full'
                                }
                              >
                                {tour.availability === 'เหลือน้อย' ? '🔥 จองด่วน! เหลือน้อย' : 'ดูรายละเอียด'}
                              </Button>
                            </div>
                          </div>
                        </Link>
                      )
                    }
                  })}
                </div>
                
                {/* Infinite Scroll Loading Indicator */}
                {isLoading && (
                   <div className="flex justify-center items-center py-12">
                     <div className="flex items-center space-x-3 text-blue-600">
                       <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                       <span className="font-medium">กำลังโหลดทัวร์เพิ่มเติม...</span>
                     </div>
                   </div>
                 )}
                 
                 {/* Load More Button (Backup) */}
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
    </main>
  )
}

export default function WholesaleToursPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen">กำลังโหลดข้อมูลทัวร์...</div>}>
      <WholesaleToursPageContent />
    </Suspense>
  )
}