'use client'

export const dynamic = 'force-dynamic'

import { useState, useMemo, useEffect, useCallback } from 'react'
import { Search, Heart, X, MapPin, Star, Clock, Filter, Compass, Mic, Globe, Sparkles, Grid, List, ArrowLeftRight, Menu, ChevronDown, Eye, TrendingUp, Users, Calendar, ArrowRight, Timer, Zap, Share2, Flame, Gift, Crown, Shield, Award, Bookmark, CheckSquare, Plane, Activity } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

// TypeScript declarations for Web Speech API
declare global {
  interface Window {
    SpeechRecognition: any
    webkitSpeechRecognition: any
  }
}

type SortOption = 'recommended' | 'price-low' | 'price-high' | 'rating' | 'duration' | 'popularity'
type ViewMode = 'card' | 'list' | 'compact'
type FilterCategory = 'destination' | 'budget' | 'duration' | 'style'

// Premium tour data inspired by tour-search-13/14 patterns
const allTours = [
  {
    id: 1,
    title: "ญี่ปุ่น โตเกียว โอซาก้า ฟูจิซัง 6 วัน 4 คืน",
    destinations: ["โตเกียว", "โอซาก้า", "ฟูจิซัง"],
    region: "asia",
    price: 34900,
    originalPrice: 89900,
    image: "https://picsum.photos/800/600?random=1",
    rating: 4.8,
    reviews: 1247,
    duration: "6 วัน 4 คืน",
    groupSize: "15-25 คน",
    departureDate: "มี.ค. - พ.ค. 2568",
    highlights: ["ชมซากุระบานบานเบิกที่อุเอโนะพาร์ค", "ขึ้นภูเขาไฟฟูจิชั้น 5 ชมวิวพระอาทิตย์ขึ้น", "โตเกียวสกายทรีชมวิว 360 องศา", "วัดเซ็นโซจิอาซากุสะเก่าแก่ที่สุด", "ชินคันเซ็นความเร็วสูงสู่โอซาก้า"],
    discount: 61,
    availableSeats: 11,
    totalTravelers: 1847,
    satisfaction: 96,
    isFlashSale: true,
    saleEndTime: new Date(Date.now() + 12 * 60 * 60 * 1000),
    currentViewers: 8,
    lastBooking: "15 นาทีที่แล้ว"
  },
  {
    id: 2,
    title: "เกาหลีใต้ โซล บูซาน เกาะเชจู 5 วัน 3 คืน",
    destinations: ["โซล", "บูซาน", "เกาะเชจู"],
    region: "asia",
    price: 29900,
    originalPrice: 67900,
    image: "https://picsum.photos/800/600?random=2",
    rating: 4.7,
    reviews: 892,
    duration: "5 วัน 3 คืน",
    groupSize: "10-20 คน",
    departureDate: "ก.พ. - เม.ย. 2568",
    highlights: ["ย่านมยองดงช้อปปิ้งแฟชั่นและร้านอาหารดัง", "N Seoul Tower ชมวิวกรุงโซลยามค่ำคืน", "เกาะเชจูชมน้ำตกและหาดทรายขาว", "หมู่บ้านบุคชนฮันบกดั้งเดิม", "K-Beauty ผลิตภัณฑ์ความงามเกาหลี"],
    discount: 56,
    totalTravelers: 923,
    satisfaction: 97,
    lastBooking: "8 นาทีที่แล้ว",
    currentViewers: 12
  },
  {
    id: 3,
    title: "ยุโรป ฝรั่งเศส เยอรมนี สวิตเซอร์แลนด์ 10 วัน 7 คืน",
    destinations: ["ปารีส", "มิวนิค", "ซูริค"],
    region: "europe",
    price: 89900,
    originalPrice: 129900,
    image: "https://picsum.photos/800/600?random=3",
    rating: 4.9,
    reviews: 563,
    duration: "10 วัน 7 คืน",
    groupSize: "8-15 คน",
    departureDate: "เม.ย. - ต.ค. 2568",
    highlights: ["หอไอเฟลสัญลักษณ์แห่งปารีส", "ปราสาทนอยชวานสไตน์เทพนิยายในเยอรมนี", "ยุงเฟราเขาหิมะสวิสส์อัลป์", "แม่น้ำไรน์ล่องเรือชมปราสาท", "พิพิธภัณฑ์ลูฟร์โมนาลิซ่า"],
    discount: 31,
    totalTravelers: 543,
    satisfaction: 98,
    lastBooking: "3 ชั่วโมงที่แล้ว",
    currentViewers: 2
  },
  {
    id: 4,
    title: "สิงคโปร์ Marina Bay Universal Studios 4 วัน 3 คืน",
    destinations: ["Marina Bay", "Sentosa", "Orchard Road"],
    region: "asia",
    price: 19900,
    originalPrice: 45900,
    image: "https://picsum.photos/800/600?random=4",
    rating: 4.6,
    reviews: 445,
    duration: "4 วัน 3 คืน",
    groupSize: "20-30 คน",
    departureDate: "ตลอดปี",
    highlights: ["Marina Bay Sands โรงแรมหรูและ Infinity Pool", "Gardens by the Bay สวนอนาคตกลางเมือง", "Universal Studios เครื่องเล่นและโชว์สุดมันส์", "ออร์ชาร์ด โรดแหล่งช้อปปิ้งระดับโลก", "Sentosa เกาะแห่งความสนุกและหาดสวย"],
    discount: 57,
    availableSeats: 16,
    totalTravelers: 2156,
    satisfaction: 93,
    isFlashSale: true,
    saleEndTime: new Date(Date.now() + 6 * 60 * 60 * 1000),
    lastBooking: "5 นาทีที่แล้ว",
    currentViewers: 15
  },
  {
    id: 5,
    title: "ไต้หวัน ไทเป อาลีซาน ทะเลสาบสุริยันจันทรา 5 วัน 3 คืน",
    destinations: ["ไทเป", "อาลีซาน", "สุริยันจันทรา"],
    region: "asia",
    price: 28900,
    originalPrice: 52900,
    image: "https://picsum.photos/800/600?random=5",
    rating: 4.5,
    reviews: 678,
    duration: "5 วัน 3 คืน",
    groupSize: "15-25 คน",
    departureDate: "ก.พ. - พ.ย. 2568",
    highlights: ["ตลาดกลางคืนหรูหราย่านซีเหมินติง", "ทะเลสาบสุริยันจันทราลึกลับแห่งไต้หวัน", "อาลีซานภูเขาใหญ่ชมพระอาทิตย์ขึ้น", "ลิงเจ็ดสีที่ซิมหลิน", "เต้าฮวงแหล่งผลิตเครื่องปั้นดินเผา"],
    discount: 45,
    totalTravelers: 1205,
    satisfaction: 95,
    lastBooking: "2 ชั่วโมงที่แล้ว",
    currentViewers: 4
  },
  {
    id: 6,
    title: "มัลดีฟส์ รีสอร์ท Water Villa ฮันนีมูน 4 วัน 3 คืน",
    destinations: ["มาเล", "รีสอร์ท"],
    region: "oceania",
    price: 149900,
    originalPrice: 189900,
    image: "https://picsum.photos/800/600?random=6",
    rating: 4.8,
    reviews: 234,
    duration: "4 วัน 3 คืน",
    groupSize: "2 คน",
    departureDate: "ตลอดปี",
    highlights: ["Water Villa บ้านพักลอยน้ำหรูหรา", "ดำน้ำปะการังใสใสกลางมหาสมุทรอินเดีย", "สปาหรูระดับ 5 ดาวบนทะเล", "ดูปลาโลมาและปลาวาฬในธรรมชาติ", "Sunset Cruise ล่องเรือชมพระอาทิตย์ตก"],
    discount: 21,
    totalTravelers: 234,
    satisfaction: 97,
    lastBooking: "3 นาทีที่แล้ว",
    currentViewers: 23
  },
  {
    id: 7,
    title: "อิตาลี โรม ฟลอเรนซ์ เวนิส 8 วัน 6 คืน",
    destinations: ["โรม", "ฟลอเรนซ์", "เวนิส"],
    region: "europe",
    price: 89900,
    originalPrice: 119900,
    image: "https://picsum.photos/800/600?random=7",
    rating: 4.9,
    reviews: 356,
    duration: "8 วัน 6 คืน",
    groupSize: "12-18 คน",
    departureDate: "มี.ค. - ต.ค. 2568",
    highlights: ["โคลอสเซียมโรมโบราณสมรภูมิกลาดิเอเตอร์", "วาติกันมหาวิหารเซนต์ปีเตอร์", "หอเอนปิซาสิ่งมหัศจรรย์แห่งอิตาลี", "กอนโดลาล่องคลองเวนิสโรแมนติก", "ดูโอโมฟลอเรนซ์สถาปัตยกรรมอันยิ่งใหญ่"],
    discount: 25,
    totalTravelers: 456,
    satisfaction: 98,
    lastBooking: "1 ชั่วโมงที่แล้ว",
    currentViewers: 6
  },
  {
    id: 8,
    title: "เวียดนาม ฮานอย ฮาลองเบย์ โฮจิมินห์ 5 วัน 4 คืน",
    destinations: ["ฮานอย", "ฮาลองเบย์", "โฮจิมินห์"],
    region: "asia",
    price: 18900,
    originalPrice: 29900,
    image: "https://picsum.photos/800/600?random=8",
    rating: 4.3,
    reviews: 892,
    duration: "5 วัน 4 คืน",
    groupSize: "20-30 คน",
    departureDate: "ตลอดปี",
    highlights: ["ฮาลองเบย์มรดกโลกอ่าวสีเขียวมรกต", "ถ้ำซุงโซตสถานที่ถ่ายทำหนังฮอลลีวูด", "ย่านไตรเก่าฮานอยบรรยากาศฝรั่งเศส", "ตลาดเบนถานโฮจิมินห์ซิตี้", "อุโมงค์กู่จีระบบอุโมงค์ใต้ดินสงคราม"],
    discount: 37,
    totalTravelers: 2890,
    satisfaction: 89,
    lastBooking: "4 ชั่วโมงที่แล้ว",
    currentViewers: 11
  }
]

// Country data with enhanced filtering
const allCountries = [
  { name: "ญี่ปุ่น", flagCode: "jp" },
  { name: "เกาหลีใต้", flagCode: "kr" },
  { name: "ไต้หวัน", flagCode: "tw" },
  { name: "สิงคโปร์", flagCode: "sg" },
  { name: "ไทย", flagCode: "th" },
  { name: "มาเลเซีย", flagCode: "my" },
  { name: "เวียดนาม", flagCode: "vn" },
  { name: "ฝรั่งเศส", flagCode: "fr" },
  { name: "เยอรมนี", flagCode: "de" },
  { name: "สวิตเซอร์แลนด์", flagCode: "ch" },
  { name: "อิตาลี", flagCode: "it" },
  { name: "สเปน", flagCode: "es" },
  { name: "อังกฤษ", flagCode: "gb" },
  { name: "มัลดีฟส์", flagCode: "mv" },
  { name: "ออสเตรเลีย", flagCode: "au" },
  { name: "นิวซีแลนด์", flagCode: "nz" },
  { name: "สหรัฐอเมริกา", flagCode: "us" },
  { name: "แคนาดา", flagCode: "ca" }
].sort((a, b) => a.name.localeCompare(b.name, 'th'))

// Search inspiration categories based on tour-search-13/14 patterns
const SEARCH_INSPIRATIONS = [
  { title: 'Flash Sale', desc: 'ลดสูงสุด 70%', icon: '🔥', filter: 'flash' },
  { title: 'ประหยัด', desc: 'งบไม่เกิน 30K', icon: '💰', filter: 'budget' },
  { title: 'ใกล้บ้าน', desc: 'เอเชียใกล้เคียง', icon: '✈️', filter: 'nearby' },
  { title: 'วันหยุดยาว', desc: 'ทัวร์ 7+ วัน', icon: '🏖️', filter: 'long' }
]

// Popular destinations inspired by tour-search-13
const POPULAR_DESTINATIONS = [
  { 
    name: 'ญี่ปุ่น',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=400&fit=crop',
    flagCode: 'jp'
  },
  { 
    name: 'เกาหลีใต้',
    image: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?w=400&h=400&fit=crop',
    flagCode: 'kr'
  },
  { 
    name: 'ไต้หวัน',
    image: 'https://images.unsplash.com/photo-1508248467877-aec1b08de376?w=400&h=400&fit=crop',
    flagCode: 'tw'
  },
  { 
    name: 'อิตาลี',
    image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=400&h=400&fit=crop',
    flagCode: 'it'
  },
  { 
    name: 'สวิตเซอร์แลนด์',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=400&h=400&fit=crop',
    flagCode: 'ch'
  },
  { 
    name: 'ไอซ์แลนด์',
    image: 'https://images.unsplash.com/photo-1520769669658-f07657f5a307?w=400&h=400&fit=crop',
    flagCode: 'is'
  }
]

// Trending search suggestions based on tour-search-14 patterns
const TRENDING_DESTINATIONS = [
  { name: 'ญี่ปุ่น', tag: 'ใบไม้เปลี่ยนสี', trend: '+25%' },
  { name: 'เกาหลี', tag: 'K-Culture', trend: '+18%' },
  { name: 'ไต้หวัน', tag: 'อาหารดึก', trend: '+12%' },
  { name: 'สิงคโปร์', tag: 'Family Trip', trend: '+8%' }
]

export default function TourSearch15() {
  // Mobile-first state management
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [minDays, setMinDays] = useState('')
  const [maxDays, setMaxDays] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('recommended')
  const [viewMode, setViewMode] = useState<ViewMode>('card')
  const [wishlist, setWishlist] = useState<Set<number>>(new Set())
  const [compareList, setCompareList] = useState<Set<number>>(new Set())
  
  // Mobile-specific states
  const [showFilters, setShowFilters] = useState(false)
  const [showCountryList, setShowCountryList] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showQuickView, setShowQuickView] = useState<number | null>(null)
  const [isVoiceRecording, setIsVoiceRecording] = useState(false)
  const [activeInspiration, setActiveInspiration] = useState<string | null>(null)
  
  // Additional search states
  const [selectedBudget, setSelectedBudget] = useState('')
  const [selectedDuration, setSelectedDuration] = useState('')
  const [selectedFilters, setSelectedFilters] = useState({
    region: '',
    duration: '',
    priceRange: [0, 200000] as [number, number],
    rating: 0
  })
  const [isSearching, setIsSearching] = useState(false)
  const [showHeader, setShowHeader] = useState(true)
  const [isVoiceSearchActive, setIsVoiceSearchActive] = useState(false)
  const [voiceSearchResult, setVoiceSearchResult] = useState('')
  const [voiceSearchSupported, setVoiceSearchSupported] = useState(false)
  
  // Loading and error states
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Check voice search support
  useEffect(() => {
    setVoiceSearchSupported(
      'webkitSpeechRecognition' in window || 'SpeechRecognition' in window
    )
  }, [])

  // Voice search functionality
  const startVoiceSearch = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('เบราว์เซอร์นี้ไม่รองรับการค้นหาด้วยเสียง')
      return
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    
    recognition.lang = 'th-TH'
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    setIsVoiceRecording(true)
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      setSearchTerm(transcript)
      setIsVoiceRecording(false)
    }

    recognition.onerror = () => {
      setIsVoiceRecording(false)
    }

    recognition.onend = () => {
      setIsVoiceRecording(false)
    }

    recognition.start()
  }, [])

  // Enhanced wishlist management with localStorage
  useEffect(() => {
    const saved = localStorage.getItem('tourwow-wishlist-15')
    if (saved) {
      setWishlist(new Set(JSON.parse(saved)))
    }
  }, [])

  const toggleWishlist = useCallback((tourId: number) => {
    setWishlist(prev => {
      const newSet = new Set(prev)
      if (newSet.has(tourId)) {
        newSet.delete(tourId)
      } else {
        newSet.add(tourId)
      }
      localStorage.setItem('tourwow-wishlist-15', JSON.stringify([...newSet]))
      return newSet
    })
  }, [])

  const toggleCompare = useCallback((tourId: number) => {
    setCompareList(prev => {
      const newSet = new Set(prev)
      if (newSet.has(tourId)) {
        newSet.delete(tourId)
      } else if (newSet.size < 3) {
        newSet.add(tourId)
      } else {
        alert('เปรียบเทียบได้สูงสุด 3 ทัวร์')
      }
      return newSet
    })
  }, [])

  // Enhanced tour filtering
  const filteredTours = useMemo(() => {
    let tours = allTours && allTours.length > 0 ? allTours : []
    
    if (activeInspiration) {
      tours = tours.filter(tour => {
        switch (activeInspiration) {
          case 'flash':
            return tour.isFlashSale
          case 'premium':
            return tour.price > 80000
          case 'nearby':
            return tour.region === 'asia'
          case 'long':
            return parseInt(tour.duration.split(' ')[0]) >= 7
          case 'budget':
            return tour.price < 40000
          case 'family':
            return tour.groupSize && tour.groupSize.includes('15-')
          default:
            return true
        }
      })
    }

    // Apply other filters
    tours = tours.filter(tour => {
      const matchesSearch = tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (tour.destinations && tour.destinations.some(dest => dest.toLowerCase().includes(searchTerm.toLowerCase())))
      const matchesCountry = !selectedCountry || tour.destinations?.some(dest => dest.includes(selectedCountry))
      const matchesMinPrice = !minPrice || tour.price >= parseInt(minPrice)
      const matchesMaxPrice = !maxPrice || tour.price <= parseInt(maxPrice)
      
      const tourDays = parseInt(tour.duration.split(' ')[0])
      const matchesMinDays = !minDays || tourDays >= parseInt(minDays)
      const matchesMaxDays = !maxDays || tourDays <= parseInt(maxDays)

      return matchesSearch && matchesCountry && matchesMinPrice && matchesMaxPrice && matchesMinDays && matchesMaxDays
    })

    // Enhanced sorting
    tours.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        case 'duration':
          return parseInt(a.duration.split(' ')[0]) - parseInt(b.duration.split(' ')[0])
        case 'popularity':
          return (b.reviews || 0) - (a.reviews || 0)
        default:
          return 0
      }
    })

    return tours
  }, [searchTerm, selectedCountry, minPrice, maxPrice, minDays, maxDays, sortBy, activeInspiration])

  // Calculate active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0
    if (selectedCountry) count++
    if (minPrice || maxPrice) count++
    if (minDays || maxDays) count++
    if (selectedFilters.region) count++
    return count
  }, [selectedCountry, minPrice, maxPrice, minDays, maxDays, selectedFilters.region])

  // Voice search handler
  const handleVoiceSearch = useCallback(() => {
    if (!voiceSearchSupported) return
    
    if (isVoiceSearchActive) {
      setIsVoiceSearchActive(false)
      return
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    
    recognition.lang = 'th-TH'
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    setIsVoiceSearchActive(true)
    setVoiceSearchResult('')
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      setSearchTerm(transcript)
      setVoiceSearchResult(transcript)
      setIsVoiceSearchActive(false)
      
      setTimeout(() => setVoiceSearchResult(''), 3000)
    }

    recognition.onerror = () => {
      setIsVoiceSearchActive(false)
    }

    recognition.onend = () => {
      setIsVoiceSearchActive(false)
    }

    recognition.start()
  }, [voiceSearchSupported, isVoiceSearchActive])

  // Clear all filters
  const clearAllFilters = () => {
    setSearchTerm('')
    setSelectedCountry('')
    setMinPrice('')
    setMaxPrice('')
    setMinDays('')
    setMaxDays('')
    setSortBy('recommended')
    setActiveInspiration(null)
  }

  // Mobile-optimized Tour Card Component
  const TourCard = ({ tour }: { tour: any }) => {
    const [currentTime, setCurrentTime] = useState(Date.now())
    const isFlashSale = tour.isFlashSale
    
    // Update time every second for flash sale tours
    useEffect(() => {
      if (!isFlashSale || !tour.saleEndTime) return
      
      const interval = setInterval(() => {
        setCurrentTime(Date.now())
      }, 1000)
      
      return () => clearInterval(interval)
    }, [isFlashSale, tour.saleEndTime])
    
    const timeRemaining = isFlashSale && tour.saleEndTime ? tour.saleEndTime.getTime() - currentTime : 0
    const hoursLeft = Math.max(0, Math.floor(timeRemaining / (1000 * 60 * 60)))
    const minutesLeft = Math.max(0, Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60)))
    const secondsLeft = Math.max(0, Math.floor((timeRemaining % (1000 * 60)) / 1000))

    if (viewMode === 'list') {
      return (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-blue-100/20">
          <div className="flex flex-col sm:flex-row">
            <div className="relative w-full sm:w-48 h-48 sm:h-32 flex-shrink-0">
              <Image
                src={tour.image}
                alt={tour.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 192px"
              />
              {isFlashSale && (
                <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                  🔥 Flash Sale
                </div>
              )}
              <button
                onClick={() => toggleWishlist(tour.id)}
                className="absolute top-2 right-2 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
              >
                <Heart
                  size={16}
                  className={wishlist.has(tour.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}
                />
              </button>
            </div>
            <div className="flex-1 p-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-2 sm:mb-0 line-clamp-2">{tour.title}</h3>
                <div className="text-right">
                  {tour.originalPrice && (
                    <div className="text-gray-400 line-through text-xs">฿{tour.originalPrice?.toLocaleString() || '0'}</div>
                  )}
                  <div className="text-blue-600 font-bold text-lg">฿{tour.price?.toLocaleString() || '0'}</div>
                </div>
              </div>
              <div className="text-gray-600 text-sm mb-3 line-clamp-2">
                {tour.highlights && tour.highlights.slice(0, 2).map((highlight, idx) => (
                  <span key={idx} className="inline-block mr-2 text-xs bg-gray-100 px-2 py-1 rounded">
                    {highlight}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock size={12} />
                  {tour.duration}
                </div>
                <div className="flex items-center gap-1">
                  <Star size={12} className="fill-yellow-400 text-yellow-400" />
                  {tour.rating} ({tour.reviews})
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={12} />
                  {tour.destinations && tour.destinations[0]}
                </div>
              </div>
              {/* CTA Section for List View */}
              <div className="mt-3 flex items-center gap-2">
                {isFlashSale && timeRemaining > 0 && (
                  <div className="flex items-center gap-1 bg-red-50 px-2 py-1 rounded text-xs">
                    <Clock className="w-3 h-3 text-red-600" />
                    <span className="font-mono font-bold text-red-600">
                      {hoursLeft.toString().padStart(2, '0')}:{minutesLeft.toString().padStart(2, '0')}:{secondsLeft.toString().padStart(2, '0')}
                    </span>
                  </div>
                )}
                <Link
                  href={`/tour-search-15/${tour.id}`}
                  className="ml-auto group"
                >
                  <button className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 flex items-center gap-2 ${
                    isFlashSale 
                      ? 'bg-red-600 text-white hover:bg-red-700' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}>
                    <span>จองเลย</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (viewMode === 'mosaic') {
      return (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-blue-100/20 h-64">
          <div className="relative h-32">
            <Image
              src={tour.image}
              alt={tour.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            {isFlashSale && (
              <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                🔥 Flash Sale
              </div>
            )}
            <button
              onClick={() => toggleWishlist(tour.id)}
              className="absolute top-2 right-2 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
            >
              <Heart
                size={14}
                className={wishlist.has(tour.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}
              />
            </button>
          </div>
          <div className="p-3">
            <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-2">{tour.title}</h3>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1 text-xs text-gray-600">
                <MapPin size={10} />
                {tour.destinations && tour.destinations[0]}
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-600">
                <Star size={10} className="fill-yellow-400 text-yellow-400" />
                {tour.rating}
              </div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div>
                {tour.originalPrice && (
                  <div className="text-gray-400 line-through text-xs">฿{tour.originalPrice?.toLocaleString() || '0'}</div>
                )}
                <div className="text-blue-600 font-bold text-sm">฿{tour.price?.toLocaleString() || '0'}</div>
              </div>
              <Link href={`/tour-search-15/${tour.id}`}>
                <button className={`px-3 py-1.5 rounded-md font-medium text-xs transition-all duration-200 ${
                  isFlashSale 
                    ? 'bg-red-600 text-white hover:bg-red-700' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}>
                  จองเลย
                </button>
              </Link>
            </div>
            {isFlashSale && timeRemaining > 0 && (
              <div className="mt-1 flex items-center gap-1 text-xs">
                <Clock className="w-3 h-3 text-red-600" />
                <span className="font-mono text-red-600">
                  {hoursLeft.toString().padStart(2, '0')}:{minutesLeft.toString().padStart(2, '0')}:{secondsLeft.toString().padStart(2, '0')}
                </span>
              </div>
            )}
          </div>
        </div>
      )
    }

    // Default card view - Mobile optimized
    return (
      <div className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-2 ${
        isFlashSale 
          ? 'border-red-600 shadow-red-200/50 hover:shadow-red-400/70' 
          : 'border-blue-100/20'
      }`}>
        <div className="relative h-48 sm:h-56">
          <Image
            src={tour.image}
            alt={tour.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {isFlashSale ? (
            <div className="absolute top-3 left-3 z-10">
              {/* Flash Sale Badge */}
              <div className="relative">
                <div className="bg-gradient-to-r from-red-500 via-red-600 to-orange-500 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-xl animate-pulse">
                  FLASH SALE
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-full animate-ping opacity-30"></div>
              </div>
            </div>
          ) : (
            /* Quality Badge for regular tours */
            tour.rating >= 4.7 && (
              <div className="absolute top-3 left-3 z-10">
                <div className="relative">
                  <div className="bg-gradient-to-r from-slate-900 via-gray-800 to-slate-900 text-amber-400 px-4 py-1.5 rounded-full text-xs font-bold shadow-2xl flex items-center gap-1.5 border border-amber-400/50">
                    <Crown size={14} className="fill-current text-amber-300" />
                    <span className="bg-gradient-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent font-black tracking-wide">PREMIUM</span>
                  </div>
                  <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-md animate-pulse"></div>
                </div>
              </div>
            )
          )}
          <div className="absolute top-3 right-3 flex flex-col items-end gap-2">
            {/* Real-time viewers for all tours */}
            {tour.currentViewers && (
              <div className={`${isFlashSale ? 'bg-black/70' : 'bg-blue-600/80'} text-white px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1`}>
                <div className={`w-2 h-2 ${isFlashSale ? 'bg-green-400' : 'bg-blue-300'} rounded-full animate-ping`}></div>
                <span>{tour.currentViewers} คนกำลังดู</span>
              </div>
            )}
            
            <button
              onClick={() => toggleWishlist(tour.id)}
              className="p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors shadow-lg"
            >
              <Heart
                size={18}
                className={wishlist.has(tour.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}
              />
            </button>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-gray-900 text-base sm:text-lg mb-2 line-clamp-2">{tour.title}</h3>
          
          {/* Key Info - Consolidated */}
          <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
            <div className="flex items-center gap-1 text-gray-600">
              <Clock size={14} />
              <span>{tour.duration}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <Star size={14} className="fill-yellow-400 text-yellow-400" />
              <span>{tour.rating} ({tour.reviews?.toLocaleString()})</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600 col-span-2">
              <MapPin size={14} />
              <span className="line-clamp-1">{tour.destinations?.slice(0, 3).join(' • ')}</span>
            </div>
          </div>

          {/* Tour Highlights - Simplified */}
          {tour.highlights && (
            <div className="mb-4">
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                <div className="text-xs font-medium text-gray-700 mb-1 flex items-center gap-1">
                  <Sparkles size={12} className="text-orange-500" />
                  <span>ไฮไลท์ทัวร์</span>
                </div>
                <div className="text-sm text-gray-600 leading-relaxed">
                  {tour.highlights.slice(0, 2).join(' • ')}
                  {tour.highlights.length > 2 && ` และอีก ${tour.highlights.length - 2} สถานที่`}
                </div>
              </div>
            </div>
          )}

          {/* Pricing - Streamlined */}
          <div className="mb-4">
            <div className="flex items-end justify-between">
              <div className="flex-1">
                {tour.originalPrice && (
                  <div className="text-gray-400 line-through text-sm">฿{tour.originalPrice?.toLocaleString()}</div>
                )}
                <div className={`font-bold text-2xl ${isFlashSale ? 'text-red-600' : 'text-gray-900'}`}>
                  ฿{tour.price?.toLocaleString()}
                  <span className="text-sm font-normal text-gray-500 ml-1">/คน</span>
                </div>
              </div>
              {isFlashSale && tour.discount && (
                <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-2 rounded-xl text-sm font-bold shadow-lg">
                  ลด {tour.discount}%
                </div>
              )}
            </div>
            {tour.originalPrice && tour.price && (
              <div className="text-green-600 text-sm font-medium mt-1">
                💰 ประหยัด ฿{(tour.originalPrice - tour.price).toLocaleString()}
              </div>
            )}
          </div>


          {/* CTA Section - UX/UI Best Practices */}
          <div className="space-y-2">
            {/* Flash Sale Timer - Above CTA for urgency */}
            {isFlashSale && timeRemaining > 0 && (
              <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75"></div>
                      <div className="relative bg-red-500 rounded-full p-1">
                        <Zap className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <span className="text-xs font-medium text-red-700">Flash Sale</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-gray-600">เหลือ</span>
                    <span className="font-mono text-sm font-bold text-red-600 bg-white px-2 py-0.5 rounded">
                      {hoursLeft.toString().padStart(2, '0')}:{minutesLeft.toString().padStart(2, '0')}:{secondsLeft.toString().padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Primary CTA - Optimized Size & Design */}
            <Link
              href={`/tour-search-15/${tour.id}`}
              className={`group relative block w-full transition-all duration-200 ${
                isFlashSale && hoursLeft < 1 ? 'animate-pulse' : isFlashSale ? 'animate-subtle-pulse' : ''
              }`}
            >
              <div className={`relative overflow-hidden rounded-lg ${
                isFlashSale 
                  ? 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600' 
                  : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600'
              } shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200`}>
                {/* Button Content */}
                <div className="relative z-10 px-4 py-3 flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-white font-semibold text-sm">
                      {isFlashSale ? 
                        `ประหยัด ฿${tour.originalPrice ? (tour.originalPrice - tour.price).toLocaleString() : '0'}` : 
                        tour.originalPrice ? `ประหยัด ฿${(tour.originalPrice - tour.price).toLocaleString()}` : 'จองทัวร์'
                      }
                    </div>
                    <div className="text-white/90 text-xs mt-0.5">
                      {isFlashSale ? 'คลิกเพื่อล็อกราคา 15 นาที' : 'รับประกันราคาดีที่สุด'}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <div className="text-white font-bold text-base">
                        ฿{tour.price?.toLocaleString()}
                      </div>
                      {tour.originalPrice && (
                        <div className="text-white/70 line-through text-xs">
                          ฿{tour.originalPrice?.toLocaleString()}
                        </div>
                      )}
                    </div>
                    <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
                
                {/* Shimmer Effect on Hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              </div>
            </Link>
            
            {/* Social Proof & Urgency */}
            <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
              <span className="flex items-center gap-1">
                <Users size={12} />
                {tour.totalTravelers?.toLocaleString()} คนเดินทาง
              </span>
              {tour.lastBooking && (
                <span className="flex items-center gap-1 text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  จองล่าสุด {tour.lastBooking}
                </span>
              )}
            </div>
            
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Bar Section - Inspired by tour-search-13 */}
      <div 
        className="sticky top-16 z-40 bg-white border-b border-gray-200 shadow-sm transition-transform duration-300 ease-in-out"
        style={{
          transform: showHeader ? 'translateY(0)' : 'translateY(-100%)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-1">
          <div className="max-w-5xl mx-auto">
            {/* Main Search Bar */}
            <div className="relative">
              {/* Search Input - Full Width */}
              <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="relative">
                  <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="พิมพ์ชื่อทัวร์, จุดหมาย, ประเทศ..."
                    className="w-full pl-16 pr-24 py-3 text-gray-900 placeholder-gray-500 focus:outline-none text-base focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value)
                      if (e.target.value.length >= 3) {
                        setIsSearching(true)
                        setTimeout(() => setIsSearching(false), 300)
                      }
                    }}
                  />
                  {isSearching && (
                    <div className="absolute right-24 top-1/2 transform -translate-y-1/2">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-400 border-t-transparent"></div>
                    </div>
                  )}

                  {/* Voice Search & Advanced Search */}
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                    {/* Voice Search Button */}
                    <button
                      onClick={handleVoiceSearch}
                      disabled={!voiceSearchSupported}
                      className={`p-2 rounded-lg transition-colors ${
                        isVoiceSearchActive 
                          ? 'bg-red-500 text-white animate-pulse' 
                          : voiceSearchSupported
                            ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      }`}
                      title={voiceSearchSupported ? 
                        (isVoiceSearchActive ? 'กำลังฟัง... คลิกเพื่อหยุด' : 'ค้นหาด้วยเสียง') : 
                        'เบราว์เซอร์ไม่รองรับการค้นหาด้วยเสียง'
                      }
                    >
                      <Mic className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => setShowFilters(true)}
                      className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      title="Advanced Search"
                    >
                      <Filter className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Advanced Search Link - Bottom Right */}
              <div className="text-right mt-2">
                <button
                  onClick={() => setShowFilters(true)}
                  className="text-blue-600 hover:text-blue-700 transition-colors duration-200 text-sm font-medium leading-none p-0 m-0 border-0 bg-transparent group"
                  style={{ lineHeight: '1', height: 'auto', minHeight: 'auto' }}
                >
                  <span className="border-b border-blue-300 group-hover:border-blue-700">ค้นหาขั้นสูง</span>
                  {activeFiltersCount > 0 && (
                    <span className="bg-blue-600 text-white px-2 py-0.5 rounded-full text-xs font-bold ml-1">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Inspiration Section - Inspired by tour-search-13 */}
      <div className="relative overflow-hidden">
        {/* Hero Content */}
        <div className="relative z-10 py-4">
          <div className="max-w-7xl mx-auto px-4 w-full">
            {/* Popular Countries */}
            <div className="mb-4 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm">
              <h2 className="text-gray-900 text-xl font-bold mb-3">ประเทศยอดนิยม</h2>
              
              {/* Country grid with scenic images */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {POPULAR_DESTINATIONS.map((dest, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSearchTerm(dest.name)}
                    className="group relative aspect-square rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <Image 
                        src={dest.image}
                        alt={dest.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 33vw, 16vw"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/60 transition-colors duration-300"></div>
                    </div>
                    
                    {/* Flag */}
                    <div className="absolute top-2 right-2">
                      <div className="relative w-8 h-5">
                        {/* Flag fabric rectangle with realistic wave */}
                        <div className="flag-wrapper w-8 h-5">
                          <div className="flag-realistic shadow-lg overflow-hidden">
                            <Image 
                              src={`/icons/destinations/flag-icons-main/flags/1x1/${dest.flagCode}.svg`}
                              alt={`${dest.name} flag`}
                              width={32}
                              height={20}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Country Name */}
                    <div className="absolute inset-0 flex items-end justify-center p-3">
                      <h3 className="text-white font-bold text-base sm:text-sm group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">
                        ทัวร์{dest.name}
                      </h3>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Search Inspirations - Clean Design */}
            <div className="mb-4 p-4 bg-slate-50 rounded-lg shadow-md">
              <div>
                <span className="text-gray-900 text-xl font-bold mb-3 block">หมวดหมู่ยอดนิยม</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {SEARCH_INSPIRATIONS.map((inspiration, idx) => (
                    <button 
                      key={idx}
                      onClick={() => {
                        if (inspiration.filter === 'flash') {
                          setSelectedBudget('promotion')
                        } else if (inspiration.filter === 'budget') {
                          setSelectedBudget('30000')
                        } else if (inspiration.filter === 'nearby') {
                          setSelectedFilters(prev => ({ ...prev, region: 'asia' }))
                        } else if (inspiration.filter === 'long') {
                          setSelectedDuration('long')
                        }
                      }}
                      className="group relative px-3 py-4 bg-white hover:bg-slate-50 text-gray-900 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg border border-gray-200 hover:border-gray-300 flex flex-col items-center gap-2 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white via-slate-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <span className="text-2xl">{inspiration.icon}</span>
                      <div className="relative z-10">
                        <span className="block font-bold group-hover:font-extrabold transition-all duration-300">{inspiration.title}</span>
                        <span className="block text-xs text-gray-600 mt-1">{inspiration.desc}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Controls Bar - Inspired by tour-search-13 */}
      <div className="bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="px-4 py-2">
          <div className="flex items-center justify-between gap-3">
            {/* View Toggle - Left */}
            <div className="flex bg-gray-100 rounded-lg p-0.5">
              <button
                onClick={() => setViewMode('card')}
                className={`p-1.5 rounded-md transition-all duration-200 min-h-[36px] min-w-[36px] flex items-center justify-center ${
                  viewMode === 'card' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md transition-all duration-200 min-h-[36px] min-w-[36px] flex items-center justify-center ${
                  viewMode === 'list' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-3">
              {/* Compare Counter */}
              {compareList.size > 0 && (
                <div className="flex items-center gap-2 px-3 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm">
                  <CheckSquare className="w-4 h-4" />
                  <span>เปรียบเทียบ ({compareList.size}/3)</span>
                </div>
              )}
              
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="text-sm bg-gray-50 border border-gray-200 rounded-lg px-2 py-2 min-h-[36px] focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="recommended">แนะนำ</option>
                <option value="price-low">ราคาต่ำ-สูง</option>
                <option value="price-high">ราคาสูง-ต่ำ</option>
                <option value="rating">คะแนนสูงสุด</option>
                <option value="popularity">ความนิยม</option>
                <option value="duration">ระยะเวลา</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Voice Search Status */}
      {isVoiceSearchActive && (
        <div className="relative z-50 bg-red-50 border-b border-red-200 p-3">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-2 text-red-700">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">กำลังฟัง... พูดชื่อจุดหมายที่ต้องการค้นหา</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Voice Search Result */}
      {voiceSearchResult && (
        <div className="relative z-50 bg-green-50 border-b border-green-200 p-3">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-2 text-green-700">
              <Mic className="w-4 h-4" />
              <span className="text-sm">ได้ยิน: "{voiceSearchResult}"</span>
            </div>
          </div>
        </div>
      )}

      {/* Results Section - Mobile optimized */}
      <section className="relative z-10 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">ผลการค้นหา</h2>
              <p className="text-gray-600">พบ {filteredTours.length} ทัวร์</p>
            </div>
            
            {compareList.size > 0 && (
              <button className="bg-orange-500 text-white px-4 py-2 rounded-xl hover:bg-orange-600 transition-colors flex items-center gap-2 shadow-lg">
                <ArrowLeftRight size={18} />
                เปรียบเทียบ ({compareList.size})
              </button>
            )}
          </div>

          {/* Loading State */}
          {isSearching && (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent mx-auto mb-4"></div>
                <p className="text-gray-600">กำลังค้นหาทัวร์ที่ดีที่สุดสำหรับคุณ...</p>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!isSearching && filteredTours.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="bg-gray-100 rounded-full p-6 mb-4">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">ไม่พบทัวร์ที่ตรงกับการค้นหา</h3>
              <p className="text-gray-500 text-center mb-6 max-w-md">
                ลองปรับเปลี่ยนคำค้นหาหรือตัวกรองเพื่อดูทัวร์อื่นๆ
              </p>
              <button 
                onClick={() => {
                  setSearchTerm('')
                  setActiveInspiration(null)
                  setSelectedCountry(null)
                  setMinPrice(null)
                  setMaxPrice(null)
                }}
                className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
              >
                ล้างการค้นหาทั้งหมด
              </button>
            </div>
          )}

          {/* Active filters display */}
          {!isSearching && filteredTours.length > 0 && (activeInspiration || selectedCountry || minPrice || maxPrice) && (
            <div className="mb-6 flex flex-wrap gap-2">
              {activeInspiration && (
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                  {SEARCH_INSPIRATIONS.find(i => i.filter === activeInspiration)?.title}
                  <button onClick={() => setActiveInspiration(null)}>
                    <X size={14} />
                  </button>
                </span>
              )}
              {selectedCountry && (
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                  {selectedCountry}
                  <button onClick={() => setSelectedCountry('')}>
                    <X size={14} />
                  </button>
                </span>
              )}
              {(minPrice || maxPrice) && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                  ฿{minPrice || '0'} - ฿{maxPrice || '∞'}
                  <button onClick={() => { setMinPrice(''); setMaxPrice('') }}>
                    <X size={14} />
                  </button>
                </span>
              )}
            </div>
          )}

          {/* Tours Grid - Mobile responsive */}
          <div className={`grid gap-4 ${
            viewMode === 'list' ? 'grid-cols-1' :
            viewMode === 'mosaic' ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' :
            'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
          }`}>
            {filteredTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">กำลังค้นหาทัวร์...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">⚠️</div>
              <h3 className="text-xl font-bold text-red-600 mb-2">เกิดข้อผิดพลาด</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={() => setError(null)}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
              >
                ลองใหม่อีกครั้ง
              </button>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && filteredTours.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">ไม่พบทัวร์ที่ค้นหา</h3>
              <p className="text-gray-600 mb-4">ลองปรับเปลี่ยนคำค้นหาหรือตัวกรองใหม่</p>
              <button
                onClick={clearAllFilters}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
              >
                ล้างตัวกรองทั้งหมด
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Quick View Modal - Mobile optimized */}
      {showQuickView && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">รายละเอียดด่วน</h3>
                <button
                  onClick={() => setShowQuickView(null)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>
              {/* Quick view content here */}
              <p>Quick view content for tour ID: {showQuickView}</p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        @keyframes countdown-pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.9;
          }
        }
        
        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 5px rgba(255, 255, 0, 0.5);
          }
          50% {
            box-shadow: 0 0 20px rgba(255, 255, 0, 0.8), 0 0 30px rgba(255, 100, 0, 0.6);
          }
        }
        
        @keyframes flash {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(0.8);
          }
        }
        
        @keyframes subtle-pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.95;
          }
        }
        
        .countdown-timer {
          animation: countdown-pulse 1s ease-in-out infinite;
        }
        
        .timer-glow {
          animation: glow 2s ease-in-out infinite;
        }
        
        .animate-flash {
          animation: flash 1s ease-in-out infinite;
        }
        
        .animate-subtle-pulse {
          animation: subtle-pulse 2s ease-in-out infinite;
        }
        
        @keyframes flag-wave-realistic {
          0% {
            transform: 
              perspective(200px) 
              rotateY(0deg) 
              rotateX(0deg) 
              skewY(0deg);
            box-shadow: 2px 2px 8px rgba(0,0,0,0.3);
          }
          25% {
            transform: 
              perspective(200px) 
              rotateY(-8deg) 
              rotateX(2deg) 
              skewY(1deg);
            box-shadow: 3px 3px 12px rgba(0,0,0,0.4);
          }
          50% {
            transform: 
              perspective(200px) 
              rotateY(-15deg) 
              rotateX(-1deg) 
              skewY(-1deg);
            box-shadow: 4px 2px 15px rgba(0,0,0,0.5);
          }
          75% {
            transform: 
              perspective(200px) 
              rotateY(-5deg) 
              rotateX(3deg) 
              skewY(2deg);
            box-shadow: 2px 4px 10px rgba(0,0,0,0.35);
          }
          100% {
            transform: 
              perspective(200px) 
              rotateY(0deg) 
              rotateX(0deg) 
              skewY(0deg);
            box-shadow: 2px 2px 8px rgba(0,0,0,0.3);
          }
        }
        
        
        .flag-realistic {
          animation: flag-wave-realistic 3.5s ease-in-out infinite;
          transform-origin: left center;
          transform-style: preserve-3d;
          position: relative;
        }
        
        .flag-realistic::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            90deg, 
            transparent 0%, 
            rgba(255,255,255,0.15) 30%, 
            rgba(255,255,255,0.3) 50%, 
            rgba(255,255,255,0.15) 70%, 
            transparent 100%
          );
          pointer-events: none;
          z-index: 1;
        }
        
        .flag-wrapper:hover .flag-realistic {
          animation-duration: 1.8s;
        }
      `}</style>
    </div>
  )
}