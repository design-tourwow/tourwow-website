'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { 
  ArrowLeft, Star, Clock, Users, MapPin, Calendar, Share2, Heart, 
  Phone, MessageSquare, Check, Wifi, Coffee, Utensils, Car, Bed, 
  Shield, Info, Award, Globe, Camera, Building2, ChevronDown, ChevronUp,
  X, Plus, Minus, AlertTriangle, Eye, ThumbsUp, TrendingUp, Plane,
  DollarSign, CreditCard, Home, Navigation, ChevronRight, CheckCircle,
  Headphones, Mail, Play, Pause, Volume2, Gauge, Zap, Target, FileText,
  Timer, Gift, Crown, Sparkles
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

// Extended tour data with comprehensive details for all tours
const tourDetailData: { [key: string]: any } = {
  'tour-jp-001': {
    id: 'tour-jp-001',
    title: 'ทัวร์ญี่ปุ่น โตเกียว เกียวโต',
    destination: 'ญี่ปุ่น',
    duration: '5 วัน 4 คืน',
    price: 45900,
    originalPrice: 52900,
    rating: 4.8,
    reviewCount: 156,
    urgentBooking: true,
    availableSeats: 8,
    badge: 'Hot',
    flashSale: true,
    images: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1528164344705-47542687000d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800&h=600&fit=crop'
    ],
    highlights: [
      '✈️ บินตรง', 
      '🏨 โรงแรม 4 ดาว', 
      '🍲 อาหารครบ', 
      '🏛️ วัดเก่าแก่', 
      '🚄 รถไฟชิงกันเซ็น',
      '🌸 ชมซากุระ'
    ],
    departDates: [
      { date: '12-20 พ.ย. 2568', price: 45900, status: 'available', seats: 8 },
      { date: '15-23 ธ.ค. 2568', price: 48900, status: 'limited', seats: 3 },
      { date: '10-18 ม.ค. 2569', price: 43900, status: 'available', seats: 12 },
      { date: '14-22 ก.พ. 2569', price: 49900, status: 'soldout', seats: 0 }
    ],
    available: true,
    groupSize: 'สูงสุด 25 คน',
    description: 'สัมผัสความงามของญี่ปุ่นในช่วงซากุระบาน เยือนวัดเก่าแก่ในเกียวโต นั่งรถไฟความเร็วสูงชิงกันเซ็น ชิมอาหารญี่ปุ่นต้นตำรับ พร้อมสัมผัสวัฒนธรรมและประเพณีดั้งเดิมของญี่ปุ่น',
    itinerary: [
      {
        day: 1,
        title: 'วันที่ 1: เดินทางสู่โตเกียว',
        activities: [
          'ออกเดินทางจากสนามบินสุวรรณภูมิ เที่ยวบิน TG640 เวลา 08:45 น.',
          'เดินทางถึงสนามบินนาริตะ โตเกียว เวลา 16:30 น. (เวลาท้องถิ่น)',
          'เช็คอินโรงแรม Tokyo Bay Shiomi Prince Hotel 4 ดาว',
          'พักผ่อนและเตรียมตัวสำหรับวันพรุ่งนี้'
        ]
      },
      {
        day: 2,
        title: 'วันที่ 2: ชมซากุระและวัดเซนโซจิ',
        activities: [
          'รับประทานอาหารเช้าแบบญี่ปุ่น-สากลที่โรงแรม',
          'ชมซากุระที่สวนอุเอโนะ (เดือนมีนาคม-เมษายน)',
          'เยือนวัดเซนโซจิ วัดเก่าแก่ที่สุดในโตเกียว ย่านอาซากุสะ',
          'เดินช้อปปิ้งถนนนากามิเสะ ซื้อของฝากและขนมญี่ปุ่น',
          'ชมวิวกรุงโตเกียวจาก Tokyo Skytree สูง 634 เมตร',
          'รับประทานอาหารเย็นสไตล์ญี่ปุ่น'
        ]
      },
      {
        day: 3,
        title: 'วันที่ 3: เดินทางสู่เกียวโต',
        activities: [
          'รับประทานอาหารเช้า และเช็คเอาท์จากโรงแรม',
          'นั่งรถไฟความเร็วสูงชิงกันเซ็น (Bullet Train) สู่เกียวโต',
          'รับประทานอาหารกลางวันบนรถไฟ (Bento Set)',
          'เยือนวัดคิโยมิซุ-เดระ วัดไม้โบราณบนเนินเขา',
          'เดินชมย่านกิออนเก่าแก่ โอกาสพบเกอิชา',
          'เช็คอินโรงแรม Kyoto Century Hotel 4 ดาว'
        ]
      },
      {
        day: 4,
        title: 'วันที่ 4: ปราสาทนิโจและป่าไผ่',
        activities: [
          'รับประทานอาหารเช้าที่โรงแรม',
          'เยือนปราสาทนิโจ มรดกโลกยูเนสโก',
          'ชมป่าไผ่อาราชิยาม่า ถ่ายรูปสวยๆ',
          'รับประทานอาหารกลางวันแบบไคเซกิ (Kaiseki)',
          'ชมวัดคินคะคุจิ (Golden Pavilion)',
          'ช้อปปิ้งย่านเกียวโตสเตชั่น'
        ]
      },
      {
        day: 5,
        title: 'วันที่ 5: เดินทางกลับประเทศไทย',
        activities: [
          'รับประทานอาหารเช้าและเช็คเอาท์',
          'เดินทางสู่สนามบินคันไซ',
          'ช้อปปิ้งปลอดภาษี ณ สนามบิน',
          'ออกเดินทางกลับกรุงเทพฯ เที่ยวบิน TG623 เวลา 17:30 น.',
          'เดินทางถึงสนามบินสุวรรณภูมิ เวลา 21:15 น.'
        ]
      }
    ],
    included: [
      'ตั๋วเครื่องบิน ไป-กลับ (Thai Airways)',
      'ที่พัก 4 ดาว 4 คืน (ห้องแบ่งปัน 2 ท่าน/ห้อง)',
      'อาหาร 8 มื้อ (เช้า 4 มื้อ กลางวัน 2 มื้อ เย็น 2 มื้อ)',
      'รถโค้ชปรับอากาศ พร้อมน้ำดื่ม',
      'ไกด์ท้องถิ่นพูดไทย',
      'ตั๋วรถไฟชิงกันเซ็น (JR Pass 3 วัน)',
      'ตั๋วเข้าชมสถานที่ท่องเที่ยวตามรายการ',
      'ประกันการเดินทาง วงเงิน 1 ล้านบาท',
      'ภาษีสนามบิน ค่าน้ำมัน และค่าธรรมเนียมต่างๆ',
      'กระเป๋าเดินทาง TourWow'
    ],
    notIncluded: [
      'ค่าทิปไกด์และคนขับรถ (แนะนำ 1,500 บาท/ท่าน)',
      'ค่าใช้จ่ายส่วนตัว เช่น โทรศัพท์ ซักรีด',
      'อาหารนอกรายการ และเครื่องดื่มแอลกอฮอล์',
      'ค่าบริการห้องพักคนเดียว (Single Supplement 8,000 บาท)',
      'ค่าวีซ่า (หากจำเป็น)',
      'ประกันเสริม Covid-19 หรือประกันสุขภาพเพิ่มเติม'
    ],
    facilities: [
      { icon: Wifi, label: 'WiFi ฟรี' },
      { icon: Car, label: 'รถรับส่ง' },
      { icon: Utensils, label: 'อาหาร 8 มื้อ' },
      { icon: Bed, label: 'โรงแรม 4 ดาว' },
      { icon: Shield, label: 'ประกันเดินทาง' },
      { icon: Globe, label: 'ไกด์ท้องถิ่น' },
      { icon: Plane, label: 'บินตรง Thai Airways' },
      { icon: Camera, label: 'ถ่ายรูปฟรี' }
    ],
    addOns: [
      { id: 'insurance', name: 'ประกันเสริม Covid-19', price: 800, description: 'คุ้มครองโควิด รักษาพยาบาล', badge: 'แนะนำ' },
      { id: 'single-room', name: 'ห้องพักคนเดียว', price: 8000, description: 'ห้องส่วนตัว ไม่ต้องแชร์' },
      { id: 'seat-selection', name: 'เลือกที่นั่งเครื่องบิน', price: 1200, description: 'เลือกที่นั่งตามใจชอบ' },
      { id: 'wifi-sim', name: 'ซิมญี่ปุ่น 5GB', price: 590, description: 'เน็ตความเร็วสูง 5GB', badge: 'ฮิต' }
    ],
    reviews: [
      {
        id: 1,
        name: 'คุณสุกัญญา ก.',
        rating: 5,
        date: '15 ต.ค. 2567',
        comment: 'ทัวร์ดีมาก ไกด์เก่ง พาเที่ยวครบ ซากุระสวยมาก แนะนำเลยค่ะ',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
      },
      {
        id: 2, 
        name: 'คุณประเสริฐ ส.',
        rating: 5,
        date: '8 ต.ค. 2567',
        comment: 'ราคาคุ้มค่า อาหารอร่อย โรงแรมดี รถไฟชิงกันเซ็นเร็วมาก',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
      },
      {
        id: 3,
        name: 'คุณรัตนา ม.',
        rating: 4,
        date: '2 ต.ค. 2567', 
        comment: 'สนุกมาก ได้เรียนรู้วัฒนธรรมญี่ปุ่น ของฝากเยอะ',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face'
      }
    ],
    faq: [
      {
        question: 'ต้องมีพาสปอร์ตอายุเท่าไหร่?',
        answer: 'พาสปอร์ตต้องมีอายุคงเหลือไม่น้อยกว่า 6 เดือน นับจากวันเดินทางกลับ'
      },
      {
        question: 'สามารถยกเลิกการเดินทางได้หรือไม่?',
        answer: 'สามารถยกเลิกได้ โดยจะมีค่าใช้จ่ายตามเงื่อนไข 30 วันก่อนเดินทาง คืนเงิน 80%, 15 วันก่อนเดินทาง คืนเงิน 50%'
      },
      {
        question: 'อากาศที่ญี่ปุ่นเป็นอย่างไร?',
        answer: 'ช่วงนี้อุณหภูมิอยู่ที่ 15-25°C ค่อนข้างเย็น แนะนำให้เตรียมเสื้อแจ็คเก็ตไปด้วย'
      }
    ],
    relatedTours: ['tour-kr-002', 'tour-tw-003', 'tour-sg-004'],
    trustBadges: [
      { icon: Award, label: 'ใบอนุญาต ททท.' },
      { icon: Shield, label: 'ประกันเต็มวงเงิน' },
      { icon: CheckCircle, label: 'คืนเงิน 100%' }
    ]
  },
  'tour-kr-002': {
    id: 'tour-kr-002',
    title: 'ทัวร์เกาหลีใต้ โซล ปูซาน',
    destination: 'เกาหลีใต้',
    duration: '6 วัน 5 คืน',
    price: 38500,
    rating: 4.7,
    reviewCount: 89,
    urgentBooking: false,
    availableSeats: 15,
    badge: 'Promo',
    flashSale: false,
    images: [
      'https://images.unsplash.com/photo-1538485399081-7191377e8241?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop'
    ],
    highlights: ['วัฒนธรรมเกาหลี', 'ตลาดมยองดง', 'ชิมอาหารท้องถิ่น', 'K-Pop Culture'],
    departDates: [
      { date: '5-10 ธ.ค. 2568', price: 38500, status: 'available', seats: 15 }
    ],
    available: true,
    groupSize: 'สูงสุด 30 คน',
    description: 'สัมผัสวัฒนธรรมเกาหลีใต้ ช้อปปิ้งที่ตลาดมยองดง ชิมอาหารเกาหลีแท้ๆ เยือนสถานที่สำคัญในโซลและปูซาน',
    itinerary: [],
    included: ['ตั๋วเครื่องบิน', 'ที่พัก 4 ดาว', 'อาหาร 10 มื้อ'],
    notIncluded: ['ค่าทิป', 'ค่าใช้จ่ายส่วนตัว'],
    facilities: [
      { icon: Wifi, label: 'WiFi ฟรี' },
      { icon: Car, label: 'รถรับส่ง' }
    ],
    addOns: [],
    reviews: [],
    faq: [],
    relatedTours: [],
    trustBadges: []
  },
  'tour-tw-003': {
    id: 'tour-tw-003',
    title: 'ทัวร์ไต้หวัน ไทเป เกาสง',
    destination: 'ไต้หวัน',
    duration: '4 วัน 3 คืน',
    price: 19900,
    rating: 4.6,
    reviewCount: 234,
    urgentBooking: true,
    availableSeats: 3,
    badge: 'Hot',
    flashSale: true,
    images: [
      'https://images.unsplash.com/photo-1508248467877-aec1b08de376?w=800&h=600&fit=crop'
    ],
    highlights: ['ตลาดกลางคืน', 'น้ำพุร้อน', 'รถไฟความเร็วสูง'],
    departDates: [
      { date: '8-11 ธ.ค. 2568', price: 19900, status: 'limited', seats: 3 }
    ],
    available: true,
    groupSize: 'สูงสุด 25 คน',
    description: 'สัมผัสความหลากหลายของไต้หวัน ตลาดกลางคืนที่มีชื่อเสียง น้ำพุร้อนธรรมชาติ',
    itinerary: [],
    included: [],
    notIncluded: [],
    facilities: [],
    addOns: [],
    reviews: [],
    faq: [],
    relatedTours: [],
    trustBadges: []
  }
}

// Live activity data for social proof
const liveActivity = {
  viewers: 15,
  recentBookings: [
    { name: 'คุณสมชาย ก.', tour: 'ทัวร์ญี่ปุ่น', time: '5 นาทีที่แล้ว' },
    { name: 'คุณแสงดาว จ.', tour: 'ทัวร์เกาหลี', time: '12 นาทีที่แล้ว' }
  ]
}

export default function TourDetail() {
  const params = useParams()
  const router = useRouter()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [expandedItinerary, setExpandedItinerary] = useState<number>(1)
  const [showAllFacilities, setShowAllFacilities] = useState(false)
  const [showCalendarModal, setShowCalendarModal] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState('พ.ย.')
  const [bookingData, setBookingData] = useState({
    adults: 1,
    children: 0,
    infants: 0,
    selectedDate: '',
    addOns: [] as string[]
  })

  // NEW: State for enhanced features
  const [activeTab, setActiveTab] = useState('highlights')
  const [stickyTabs, setStickyTabs] = useState(false)
  const [showStickyCTA, setShowStickyCTA] = useState(false)
  const [viewingUsers, setViewingUsers] = useState(liveActivity.viewers)
  const [flashSaleTime, setFlashSaleTime] = useState({ hours: 23, minutes: 45, seconds: 30 })
  const [recentBookingNotification, setRecentBookingNotification] = useState<any>(null)
  
  // Refs for section navigation
  const highlightsRef = useRef<HTMLElement>(null)
  const itineraryRef = useRef<HTMLElement>(null)
  const datesRef = useRef<HTMLElement>(null)
  const detailsRef = useRef<HTMLElement>(null)
  const galleryRef = useRef<HTMLElement>(null)
  const reviewsRef = useRef<HTMLElement>(null)
  const faqRef = useRef<HTMLElement>(null)
  const tabsRef = useRef<HTMLDivElement>(null)
  const tabsContainerRef = useRef<HTMLDivElement>(null)

  const tour = tourDetailData[params.id as string]

  // Flash Sale Timer Effect
  useEffect(() => {
    if (!tour?.flashSale) return
    
    const timer = setInterval(() => {
      setFlashSaleTime(prev => {
        let { hours, minutes, seconds } = prev
        
        if (seconds > 0) {
          seconds--
        } else if (minutes > 0) {
          minutes--
          seconds = 59
        } else if (hours > 0) {
          hours--
          minutes = 59
          seconds = 59
        }
        
        return { hours, minutes, seconds }
      })
    }, 1000)
    
    return () => clearInterval(timer)
  }, [tour?.flashSale])

  // Live Viewing Users Effect
  useEffect(() => {
    const interval = setInterval(() => {
      setViewingUsers(prev => {
        const change = Math.floor(Math.random() * 5) - 2
        const newValue = prev + change
        return Math.max(8, Math.min(25, newValue))
      })
    }, 12000)
    
    return () => clearInterval(interval)
  }, [])

  // Recent Booking Notifications
  useEffect(() => {
    const bookingNames = ['คุณสมศรี', 'คุณวิชัย', 'คุณมาลี', 'คุณสมชาย', 'คุณนันทพร']
    const locations = ['กรุงเทพฯ', 'เชียงใหม่', 'ภูเก็ต', 'ขอนแก่น']
    
    const showNotification = () => {
      const randomName = bookingNames[Math.floor(Math.random() * bookingNames.length)]
      const randomLocation = locations[Math.floor(Math.random() * locations.length)]
      
      setRecentBookingNotification({
        name: randomName,
        location: randomLocation,
        time: 'เมื่อสักครู่'
      })
      
      setTimeout(() => {
        setRecentBookingNotification(null)
      }, 5000)
    }
    
    // Show first notification after 10 seconds
    const firstTimeout = setTimeout(showNotification, 10000)
    
    // Then show periodically
    const interval = setInterval(showNotification, 30000)
    
    return () => {
      clearTimeout(firstTimeout)
      clearInterval(interval)
    }
  }, [])

  // Sticky Tabs & CTA Effect
  useEffect(() => {
    const handleScroll = () => {
      // Sticky Tabs
      if (tabsRef.current) {
        const tabsTop = tabsRef.current.getBoundingClientRect().top + window.scrollY
        setStickyTabs(window.scrollY > tabsTop - 60)
      }
      
      // Sticky CTA
      setShowStickyCTA(window.scrollY > 500)
      
      // Active Tab based on scroll position
      const sections = [
        { id: 'highlights', ref: highlightsRef },
        { id: 'itinerary', ref: itineraryRef },
        { id: 'dates', ref: datesRef },
        { id: 'details', ref: detailsRef },
        { id: 'gallery', ref: galleryRef },
        { id: 'reviews', ref: reviewsRef },
        { id: 'faq', ref: faqRef }
      ]
      
      for (const section of sections) {
        if (section.ref.current) {
          const rect = section.ref.current.getBoundingClientRect()
          if (rect.top <= 150 && rect.bottom > 150) {
            setActiveTab(section.id)
            scrollTabIntoView(section.id)
            break
          }
        }
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [stickyTabs])

  // Auto-scroll tab into view
  const scrollTabIntoView = (tabId: string) => {
    if (!tabsContainerRef.current) return
    
    const tabButton = tabsContainerRef.current.querySelector(`[data-tab="${tabId}"]`)
    if (tabButton) {
      const container = tabsContainerRef.current
      const scrollLeft = (tabButton as HTMLElement).offsetLeft - (container.clientWidth / 2) + ((tabButton as HTMLElement).clientWidth / 2)
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' })
    }
  }

  // Scroll to section when tab clicked
  const scrollToSection = (sectionId: string) => {
    const sectionMap: { [key: string]: React.RefObject<HTMLElement> } = {
      highlights: highlightsRef,
      itinerary: itineraryRef,
      dates: datesRef,
      details: detailsRef,
      gallery: galleryRef,
      reviews: reviewsRef,
      faq: faqRef
    }
    
    const ref = sectionMap[sectionId]
    if (ref?.current) {
      const offset = stickyTabs ? 120 : 20
      const top = ref.current.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
      setActiveTab(sectionId)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    const savedWishlist = localStorage.getItem('tour-search-22-wishlist')
    if (savedWishlist) {
      const wishlist = JSON.parse(savedWishlist)
      setIsWishlisted(wishlist.includes(params.id))
    }

    return () => clearTimeout(timer)
  }, [params.id])

  const toggleWishlist = () => {
    const savedWishlist = localStorage.getItem('tour-search-22-wishlist')
    const wishlist = savedWishlist ? JSON.parse(savedWishlist) : []
    
    const newWishlist = isWishlisted
      ? wishlist.filter((id: string) => id !== params.id)
      : [...wishlist, params.id]
    
    localStorage.setItem('tour-search-22-wishlist', JSON.stringify(newWishlist))
    setIsWishlisted(!isWishlisted)
  }

  const calculateTotal = () => {
    if (!tour) return 0
    const basePrice = tour.price * (bookingData.adults + bookingData.children * 0.8)
    const addOnPrice = bookingData.addOns.reduce((sum, addOnId) => {
      const addOn = tour.addOns?.find((a: any) => a.id === addOnId)
      return sum + (addOn?.price || 0)
    }, 0)
    return basePrice + addOnPrice
  }

  // Generate calendar dates
  const generateCalendarDates = useCallback(() => {
    const dates = []
    const today = new Date()
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      
      const isAvailable = Math.random() > 0.3
      const hasPromo = Math.random() > 0.8
      const price = tour?.price || 0
      const adjustedPrice = hasPromo ? Math.round(price * 0.9) : price
      
      dates.push({
        date: date.getDate(),
        month: date.toLocaleDateString('th-TH', { month: 'short' }),
        dayName: date.toLocaleDateString('th-TH', { weekday: 'short' }),
        available: isAvailable,
        price: adjustedPrice,
        hasPromo,
        seats: isAvailable ? Math.floor(Math.random() * 10) + 1 : 0
      })
    }
    
    return dates
  }, [tour?.price])

  const calendarDates = useMemo(() => generateCalendarDates(), [generateCalendarDates])

  if (isLoading) {
    return <LoadingDetail />
  }

  if (!tour) {
    return <NotFoundDetail />
  }

  const discount = tour.originalPrice ? Math.round(((tour.originalPrice - tour.price) / tour.originalPrice) * 100) : 0

  return (
    <div className="min-h-screen bg-white">
      {/* Flash Sale Banner */}
      {tour.flashSale && (
        <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-2 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 animate-pulse" />
              <span className="font-bold">⚡ Flash Sale!</span>
              <span className="text-sm">ลดสูงสุด {discount}%</span>
            </div>
            <div className="flex items-center gap-3 text-sm font-mono">
              <Timer className="w-4 h-4" />
              <span>{String(flashSaleTime.hours).padStart(2, '0')}:{String(flashSaleTime.minutes).padStart(2, '0')}:{String(flashSaleTime.seconds).padStart(2, '0')}</span>
            </div>
          </div>
        </div>
      )}

      {/* Breadcrumb */}
      <nav className="bg-gray-50 px-4 py-2 text-sm">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-gray-600 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-blue-600">
            <Home className="w-4 h-4" />
          </Link>
          <ChevronRight className="w-4 h-4 flex-shrink-0" />
          <Link href="/tour-search-22" className="hover:text-blue-600">ทัวร์</Link>
          <ChevronRight className="w-4 h-4 flex-shrink-0" />
          <span className="text-gray-900 font-medium truncate">{tour.destination}</span>
        </div>
      </nav>

      {/* Recent Booking Notification */}
      {recentBookingNotification && (
        <div className="fixed top-20 right-4 z-50 bg-white shadow-lg rounded-lg p-4 border-l-4 border-green-500 animate-slide-in-right max-w-xs">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">
                {recentBookingNotification.name}
              </p>
              <p className="text-xs text-gray-600">
                จาก {recentBookingNotification.location} เพิ่งจองทัวร์นี้
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Header Navigation */}
      <header className="sticky top-0 z-40 bg-white border-b-2 border-gray-200 shadow-sm">
        <div className="px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-xl transition-colors"
              aria-label="กลับ"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
              <span className="text-lg font-medium text-gray-900 hidden sm:inline">กลับ</span>
            </button>
            
            <div className="flex items-center gap-2">
              {/* Live Viewers Counter */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-700 font-medium">{viewingUsers} คนกำลังดู</span>
              </div>
              
              <button
                onClick={toggleWishlist}
                className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                aria-label={isWishlisted ? 'เอาออกจากรายการโปรด' : 'เพิ่มในรายการโปรด'}
              >
                <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} />
              </button>
              <button
                className="p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                aria-label="แชร์"
              >
                <Share2 className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Image Carousel */}
      <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
        <Image
          src={tour.images?.[currentImageIndex] || tour.images?.[0]}
          alt={tour.title}
          fill
          className="object-cover"
          priority
        />
        
        {/* Image Navigation */}
        {tour.images && tour.images.length > 1 && (
          <>
            {/* Mobile Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 sm:hidden">
              {tour.images.map((_: any, index: number) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                  aria-label={`ดูรูปที่ ${index + 1}`}
                />
              ))}
            </div>
            
            {/* Desktop Thumbnails */}
            <div className="hidden sm:block absolute bottom-4 left-4">
              <div className="flex gap-2">
                {tour.images.slice(0, 4).map((_: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                      index === currentImageIndex ? 'border-white' : 'border-white/50'
                    }`}
                  >
                    <Image
                      src={tour.images[index]}
                      alt=""
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
                {tour.images.length > 4 && (
                  <div className="w-16 h-16 rounded-lg bg-black/50 flex items-center justify-center text-white text-sm font-bold">
                    +{tour.images.length - 4}
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          {discount > 0 && (
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
              ลด {discount}%
            </div>
          )}
          {tour.badge && (
            <div className={`px-3 py-1 rounded-full text-sm font-bold shadow-lg ${
              tour.badge === 'Hot' 
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
            }`}>
              {tour.badge}
            </div>
          )}
        </div>

        {/* Urgency Indicator */}
        {tour.urgentBooking && (
          <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg flex items-center gap-1">
            <AlertTriangle className="w-4 h-4" />
            เหลือ {tour.availableSeats} ที่นั่ง!
          </div>
        )}

        {/* Social Proof - Mobile */}
        <div className="sm:hidden absolute bottom-4 right-4 bg-black/70 text-white px-3 py-2 rounded-lg text-xs flex items-center gap-2">
          <Eye className="w-3 h-3" />
          {viewingUsers} คนกำลังดู
        </div>
      </div>

      {/* Main Content */}
      <main className="px-4 py-6 max-w-7xl mx-auto">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            {/* Tour Header */}
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 leading-tight">
                {tour.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <div className="flex items-center gap-2 bg-yellow-50 px-3 py-2 rounded-xl">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-lg">{tour.rating}</span>
                  <span className="text-gray-600">({tour.reviewCount} รีวิว)</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Award className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">ทัวร์ยอดนิยม</span>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <TrendingUp className="w-5 h-5" />
                  <span className="text-sm font-medium">จองเพิ่มขึ้น 40% เดือนนี้</span>
                </div>
              </div>

              {/* Key Info Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="text-sm text-gray-600">ระยะเวลา</div>
                    <div className="font-semibold text-gray-900">{tour.duration}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Users className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="text-sm text-gray-600">ขนาดกลุ่ม</div>
                    <div className="font-semibold text-gray-900">{tour.groupSize}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <MapPin className="w-5 h-5 text-red-500" />
                  <div>
                    <div className="text-sm text-gray-600">จุดหมาย</div>
                    <div className="font-semibold text-gray-900">{tour.destination}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  <div>
                    <div className="text-sm text-gray-600">จองล่วงหน้า</div>
                    <div className="font-semibold text-gray-900">7 วัน</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sticky Tabs Navigation */}
            <div 
              ref={tabsRef}
              className={`mb-6 transition-all duration-300 ${
                stickyTabs ? 'fixed top-[65px] left-0 right-0 z-30 bg-white shadow-md py-3 px-4' : ''
              }`}
            >
              <div className={stickyTabs ? 'max-w-7xl mx-auto' : ''}>
                <div className="bg-gray-100 rounded-xl p-1">
                  <div 
                    ref={tabsContainerRef}
                    className="flex space-x-1 overflow-x-auto scrollbar-hide md:grid md:grid-cols-7 md:gap-1"
                  >
                    {[
                      { id: 'highlights', label: 'ไฮไลท์', icon: Sparkles },
                      { id: 'itinerary', label: 'โปรแกรม', icon: Navigation },
                      { id: 'dates', label: 'วันเดินทาง', icon: Calendar },
                      { id: 'details', label: 'รายละเอียด', icon: FileText },
                      { id: 'gallery', label: 'รูปภาพ', icon: Camera },
                      { id: 'reviews', label: 'รีวิว', icon: Star },
                      { id: 'faq', label: 'FAQ', icon: Info }
                    ].map(tab => {
                      const Icon = tab.icon
                      return (
                        <button
                          key={tab.id}
                          data-tab={tab.id}
                          onClick={() => scrollToSection(tab.id)}
                          className={`flex-shrink-0 md:flex-1 py-3 px-4 md:px-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap flex items-center justify-center gap-2 ${
                            activeTab === tab.id
                              ? 'bg-white text-blue-600 shadow-sm'
                              : 'text-gray-600 hover:text-gray-900'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span>{tab.label}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Spacing for sticky tabs */}
            {stickyTabs && <div className="h-16"></div>}

            {/* Highlight Section */}
            <section ref={highlightsRef} id="highlights" className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Zap className="w-6 h-6 text-yellow-500" />
                ✨ ไฮไลท์ทัวร์
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3">
                {tour.highlights.map((highlight: string, index: number) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-200">
                    <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-800 font-medium text-sm">{highlight}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Itinerary Section */}
            {tour.itinerary && tour.itinerary.length > 0 && (
              <section ref={itineraryRef} id="itinerary" className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Navigation className="w-6 h-6 text-blue-600" />
                  📅 รายการเดินทาง
                </h2>
                
                {/* Mobile: Accordion */}
                <div className="space-y-3 sm:hidden">
                  {tour.itinerary.map((day: any, index: number) => (
                    <div key={index} className="border-2 border-gray-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setExpandedItinerary(expandedItinerary === day.day ? 0 : day.day)}
                        className="w-full p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
                      >
                        <h3 className="font-bold text-lg text-gray-900">{day.title}</h3>
                        {expandedItinerary === day.day ? (
                          <ChevronUp className="w-5 h-5 text-gray-600" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-600" />
                        )}
                      </button>
                      
                      {expandedItinerary === day.day && (
                        <div className="p-4 bg-white">
                          <ul className="space-y-2">
                            {day.activities.map((activity: string, actIndex: number) => (
                              <li key={actIndex} className="flex items-start gap-3 text-gray-700">
                                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-base leading-relaxed">{activity}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Desktop: Timeline */}
                <div className="hidden sm:block space-y-6">
                  {tour.itinerary.map((day: any, index: number) => (
                    <div key={index} className="relative">
                      <div className="flex gap-6">
                        <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                          {day.day}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-xl text-gray-900 mb-3">{day.title}</h3>
                          <ul className="space-y-2">
                            {day.activities.map((activity: string, actIndex: number) => (
                              <li key={actIndex} className="flex items-start gap-3 text-gray-700">
                                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-base leading-relaxed">{activity}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      {index < tour.itinerary.length - 1 && (
                        <div className="absolute left-6 top-12 w-0.5 h-6 bg-blue-200"></div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Price & Departure Dates */}
            <section ref={datesRef} id="dates" className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-green-600" />
                💰 ราคาและวันเดินทาง
              </h2>
              
              {/* Mobile: Calendar Button + Horizontal Scroll */}
              <div className="sm:hidden">
                <button
                  onClick={() => setShowCalendarModal(true)}
                  className="w-full p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold mb-4 flex items-center justify-between"
                >
                  <span>เลือกวันเดินทาง</span>
                  <Calendar className="w-5 h-5" />
                </button>
                
                <div className="overflow-x-auto pb-4">
                  <div className="flex gap-4 min-w-max">
                    {tour.departDates?.map((date: any, index: number) => (
                      <div key={index} className="min-w-[280px] p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-300 transition-colors">
                        <div className="text-lg font-bold text-gray-900 mb-2">{date.date}</div>
                        <div className="text-2xl font-bold text-blue-600 mb-2">฿{date.price.toLocaleString()}</div>
                        <div className={`text-sm font-medium mb-3 ${
                          date.status === 'available' ? 'text-green-600' :
                          date.status === 'limited' ? 'text-orange-600' :
                          'text-red-600'
                        }`}>
                          {date.status === 'available' ? `✅ ว่าง ${date.seats} ที่นั่ง` :
                           date.status === 'limited' ? `⚠️ เหลือ ${date.seats} ที่นั่ง` :
                           '❌ เต็ม'}
                        </div>
                        <button
                          onClick={() => {
                            setBookingData(prev => ({ ...prev, selectedDate: date.date }))
                            setShowBookingModal(true)
                          }}
                          disabled={date.status === 'soldout'}
                          className={`w-full py-3 rounded-xl font-bold transition-colors ${
                            date.status === 'soldout'
                              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              : date.status === 'limited'
                              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600'
                              : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800'
                          }`}
                        >
                          {date.status === 'soldout' ? 'เต็มแล้ว' : 'จองเลย'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Desktop: Table */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full border-2 border-gray-200 rounded-xl overflow-hidden">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-4 font-bold text-gray-900">วันเดินทาง</th>
                      <th className="text-left p-4 font-bold text-gray-900">ราคา</th>
                      <th className="text-left p-4 font-bold text-gray-900">สถานะ</th>
                      <th className="text-center p-4 font-bold text-gray-900">การจอง</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tour.departDates?.map((date: any, index: number) => (
                      <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                        <td className="p-4 text-lg font-semibold text-gray-900">{date.date}</td>
                        <td className="p-4 text-2xl font-bold text-blue-600">฿{date.price.toLocaleString()}</td>
                        <td className="p-4">
                          <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                            date.status === 'available' ? 'bg-green-100 text-green-700' :
                            date.status === 'limited' ? 'bg-orange-100 text-orange-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {date.status === 'available' ? `✅ ว่าง ${date.seats} ที่นั่ง` :
                             date.status === 'limited' ? `⚠️ เหลือ ${date.seats} ที่นั่ง` :
                             '❌ เต็ม'}
                          </span>
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() => {
                              setBookingData(prev => ({ ...prev, selectedDate: date.date }))
                              setShowBookingModal(true)
                            }}
                            disabled={date.status === 'soldout'}
                            className={`px-6 py-3 rounded-xl font-bold transition-colors ${
                              date.status === 'soldout'
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : date.status === 'limited'
                                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600'
                                : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800'
                            }`}
                          >
                            {date.status === 'soldout' ? 'เต็มแล้ว' : 'จองด่วน!'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Service Details */}
            <section ref={detailsRef} id="details" className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6 text-purple-600" />
                📋 รายละเอียดการบริการ
              </h2>
              
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Included */}
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-green-800 mb-4 flex items-center gap-2">
                    <Check className="w-5 h-5" />
                    ✅ รวมในราคา
                  </h3>
                  <ul className="space-y-2">
                    {tour.included.map((item: string, index: number) => (
                      <li key={index} className="flex items-start gap-3 text-green-700">
                        <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                        <span className="text-base leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Not Included */}
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-800 mb-4 flex items-center gap-2">
                    <X className="w-5 h-5" />
                    ❌ ไม่รวมในราคา
                  </h3>
                  <ul className="space-y-2">
                    {tour.notIncluded.map((item: string, index: number) => (
                      <li key={index} className="flex items-start gap-3 text-red-700">
                        <X className="w-4 h-4 text-red-600 flex-shrink-0 mt-1" />
                        <span className="text-base leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Payment Info */}
              <div className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-blue-800 mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  💳 ข้อมูลการชำระเงิน
                </h3>
                <div className="grid sm:grid-cols-2 gap-4 text-blue-700">
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-blue-600" />
                    <span>มัดจำ 3,000 บาท</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    <span>ผ่อน 0% 6 เดือน</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Gallery */}
            {tour.images && tour.images.length > 1 && (
              <section ref={galleryRef} id="gallery" className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Camera className="w-6 h-6 text-pink-600" />
                  📷 แกลเลอรี่
                </h2>
                
                {/* Mobile: Horizontal Swipe */}
                <div className="overflow-x-auto pb-4 sm:hidden">
                  <div className="flex gap-3">
                    {tour.images.map((image: string, index: number) => (
                      <div key={index} className="min-w-[200px] h-32 rounded-xl overflow-hidden">
                        <Image
                          src={image}
                          alt=""
                          width={200}
                          height={128}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Desktop: Grid */}
                <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 gap-4">
                  {tour.images.map((image: string, index: number) => (
                    <div key={index} className="aspect-video rounded-xl overflow-hidden hover:scale-105 transition-transform cursor-pointer">
                      <Image
                        src={image}
                        alt=""
                        width={300}
                        height={200}
                        className="object-cover w-full h-full"
                        onClick={() => setCurrentImageIndex(index)}
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Review Section */}
            {tour.reviews && tour.reviews.length > 0 && (
              <section ref={reviewsRef} id="reviews" className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <ThumbsUp className="w-6 h-6 text-yellow-600" />
                  ⭐ รีวิวลูกค้า
                </h2>
                
                {/* Rating Summary */}
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 mb-6">
                  <div className="flex items-center gap-6 mb-4">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-yellow-600">{tour.rating}</div>
                      <div className="flex items-center justify-center gap-1 mb-1">
                        {[1,2,3,4,5].map(star => (
                          <Star key={star} className={`w-5 h-5 ${star <= Math.round(tour.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <div className="text-sm text-gray-600">{tour.reviewCount} รีวิว</div>
                    </div>
                  </div>
                </div>

                {/* Reviews */}
                <div className="space-y-4">
                  {tour.reviews.map((review: any) => (
                    <div key={review.id} className="bg-white border-2 border-gray-200 rounded-xl p-6">
                      <div className="flex items-start gap-4">
                        <Image
                          src={review.avatar}
                          alt=""
                          width={48}
                          height={48}
                          className="rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <div className="font-semibold text-gray-900">{review.name}</div>
                              <div className="text-sm text-gray-500">{review.date}</div>
                            </div>
                            <div className="flex items-center gap-1">
                              {[1,2,3,4,5].map(star => (
                                <Star key={star} className={`w-4 h-4 ${star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* FAQ Section */}
            {tour.faq && tour.faq.length > 0 && (
              <section ref={faqRef} id="faq" className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Info className="w-6 h-6 text-indigo-600" />
                  ❓ คำถามที่พบบ่อย
                </h2>
                
                <div className="grid lg:grid-cols-2 gap-4">
                  {tour.faq.map((item: any, index: number) => (
                    <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-6">
                      <h3 className="font-bold text-gray-900 mb-3">{item.question}</h3>
                      <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column - Sticky Booking Box (Desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <div className="bg-white border-2 border-gray-200 rounded-2xl shadow-lg p-6">
                {/* Flash Sale Timer */}
                {tour.flashSale && (
                  <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl p-3 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Zap className="w-5 h-5 animate-pulse" />
                        <span className="font-bold text-sm">Flash Sale!</span>
                      </div>
                      <div className="font-mono text-sm">
                        {String(flashSaleTime.hours).padStart(2, '0')}:
                        {String(flashSaleTime.minutes).padStart(2, '0')}:
                        {String(flashSaleTime.seconds).padStart(2, '0')}
                      </div>
                    </div>
                  </div>
                )}

                <div className="text-center mb-4">
                  {tour.originalPrice && (
                    <p className="text-gray-500 text-lg line-through mb-1">
                      ฿{tour.originalPrice.toLocaleString()}
                    </p>
                  )}
                  <p className="text-3xl font-bold text-gray-900 mb-1">
                    ฿{tour.price.toLocaleString()}
                  </p>
                  <p className="text-gray-600">ต่อคน</p>
                  {discount > 0 && (
                    <p className="text-green-600 font-medium mt-1">
                      ประหยัด ฿{((tour.originalPrice || 0) - tour.price).toLocaleString()}
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => setShowBookingModal(true)}
                    className="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-xl hover:from-red-700 hover:to-red-800 transition-colors flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-5 h-5" />
                    {tour.urgentBooking ? 'จองด่วน!' : 'จองทัวร์นี้'}
                  </button>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <button className="py-2 bg-gray-100 text-gray-800 font-semibold rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-1">
                      <Phone className="w-4 h-4" />
                      โทรสอบถาม
                    </button>
                    <button className="py-2 bg-gray-100 text-gray-800 font-semibold rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-1">
                      <MessageSquare className="w-4 h-4" />
                      แชท
                    </button>
                  </div>
                </div>

                {/* Urgency indicators */}
                {tour.urgentBooking && (
                  <div className="mt-4 text-center text-red-600 text-sm font-medium">
                    <AlertTriangle className="w-4 h-4 inline mr-1" />
                    เหลือเวลาจองไม่มาก!
                  </div>
                )}
                
                {/* Live Activity */}
                <div className="mt-4 pt-4 border-t text-xs text-gray-600">
                  <div className="flex items-center gap-1 mb-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>{viewingUsers} คนกำลังดูหน้านี้</span>
                  </div>
                  {liveActivity.recentBookings.map((booking, index) => (
                    <div key={index} className="text-xs text-green-600 mb-1">
                      🟢 {booking.name} จองเมื่อ {booking.time}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Sticky CTA - Mobile Bottom Bar */}
      {showStickyCTA && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t-2 border-gray-200 p-4 lg:hidden">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-sm text-gray-600">ราคาเริ่มต้น</div>
              <div className="text-xl font-bold text-blue-600">฿{tour.price.toLocaleString()}</div>
            </div>
            <button
              onClick={() => setShowBookingModal(true)}
              className="flex-1 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-xl hover:from-red-700 hover:to-red-800 transition-colors flex items-center justify-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              {tour.urgentBooking ? 'จองด่วน!' : 'จองทัวร์นี้'}
            </button>
          </div>
        </div>
      )}

      {/* Calendar Modal */}
      {showCalendarModal && (
        <CalendarModal
          tour={tour}
          calendarDates={calendarDates}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          bookingData={bookingData}
          setBookingData={setBookingData}
          setShowBookingModal={setShowBookingModal}
          onClose={() => setShowCalendarModal(false)}
        />
      )}

      {/* Enhanced Booking Modal */}
      {showBookingModal && (
        <EnhancedBookingModal
          tour={tour}
          bookingData={bookingData}
          setBookingData={setBookingData}
          calculateTotal={calculateTotal}
          onClose={() => setShowBookingModal(false)}
        />
      )}

      {/* Add bottom padding for mobile sticky CTA */}
      <div className="h-20 lg:h-0"></div>
    </div>
  )
}

// Calendar Modal Component
function CalendarModal({ 
  tour, 
  calendarDates, 
  selectedMonth, 
  setSelectedMonth,
  bookingData,
  setBookingData,
  setShowBookingModal,
  onClose 
}: any) {
  const months = ['พ.ย.', 'ธ.ค.', 'ม.ค.', 'ก.พ.', 'มี.ค.']
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
      <div className="bg-white w-full max-h-[80vh] rounded-t-2xl overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
          <h3 className="text-xl font-bold">เลือกวันเดินทาง</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Month Tabs */}
        <div className="px-4 py-3 bg-gray-50">
          <div className="flex gap-2 overflow-x-auto">
            {months.map(month => (
              <button
                key={month}
                onClick={() => setSelectedMonth(month)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap font-medium ${
                  selectedMonth === month
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border'
                }`}
              >
                {month}
              </button>
            ))}
          </div>
        </div>
        
        {/* Calendar Grid */}
        <div className="p-4 overflow-y-auto">
          <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
            {['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'].map(day => (
              <div key={day} className="p-2 font-bold text-gray-600">{day}</div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {calendarDates.map((date: any, index: number) => (
              <button
                key={index}
                disabled={!date.available}
                onClick={() => {
                  setBookingData((prev: any) => ({
                    ...prev,
                    selectedDate: `${date.date} ${date.month}`
                  }))
                  onClose()
                  setShowBookingModal(true)
                }}
                className={`p-3 rounded-lg text-center ${
                  date.available
                    ? date.hasPromo
                      ? 'bg-orange-50 hover:bg-orange-100 border border-orange-200'
                      : 'bg-gray-50 hover:bg-gray-100 border'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                <div className="font-bold text-lg">{date.date}</div>
                {date.available && (
                  <>
                    <div className="text-xs text-gray-600">{date.seats} ที่</div>
                    <div className={`text-xs font-bold ${date.hasPromo ? 'text-orange-600' : 'text-blue-600'}`}>
                      ฿{date.price.toLocaleString()}
                    </div>
                  </>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Enhanced Booking Modal with Add-ons
function EnhancedBookingModal({ 
  tour, 
  bookingData, 
  setBookingData, 
  calculateTotal,
  onClose 
}: any) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    specialRequests: ''
  })

  const updateBookingData = (field: string, value: any) => {
    setBookingData((prev: any) => ({ ...prev, [field]: value }))
  }

  const toggleAddOn = (addOnId: string) => {
    setBookingData((prev: any) => ({
      ...prev,
      addOns: prev.addOns.includes(addOnId)
        ? prev.addOns.filter((id: string) => id !== addOnId)
        : [...prev.addOns, addOnId]
    }))
  }

  const getAddOnTotal = () => {
    return bookingData.addOns.reduce((total: number, addOnId: string) => {
      const addOn = tour.addOns?.find((a: any) => a.id === addOnId)
      return total + (addOn?.price || 0)
    }, 0)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-center">
      <div className="bg-white w-full max-h-[90vh] overflow-y-auto sm:max-w-2xl sm:w-full sm:max-h-[80vh] sm:rounded-2xl sm:m-4">
        
        {/* Header */}
        <div className="sticky top-0 bg-white border-b-2 border-gray-200 p-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">
            {step === 1 ? 'เลือกจำนวนผู้เดินทาง' :
             step === 2 ? 'เลือกบริการเสริม' :
             step === 3 ? 'กรอกข้อมูล' : 'สรุปการจอง'}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            aria-label="ปิด"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-4 pt-4">
          <div className="flex items-center justify-between mb-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  i <= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {i}
                </div>
                {i < 4 && (
                  <div className={`w-full h-1 mx-2 ${
                    i < step ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-6">
          {/* Tour Summary */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-6">
            <h4 className="font-bold text-gray-900 mb-1">{tour.title}</h4>
            {bookingData.selectedDate && (
              <p className="text-blue-600 font-medium">วันเดินทาง: {bookingData.selectedDate}</p>
            )}
            <p className="text-2xl font-bold text-blue-600">฿{tour.price.toLocaleString()} / ท่าน</p>
          </div>

          {/* Step 1: Travelers */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-3">จำนวนผู้เดินทาง</label>
                
                <div className="space-y-4">
                  {/* Adults */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <div className="font-semibold text-gray-900">ผู้ใหญ่</div>
                      <div className="text-sm text-gray-600">อายุ 12 ปีขึ้นไป</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateBookingData('adults', Math.max(1, bookingData.adults - 1))}
                        className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-100"
                        disabled={bookingData.adults <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-bold">{bookingData.adults}</span>
                      <button
                        onClick={() => updateBookingData('adults', bookingData.adults + 1)}
                        className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-100"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Children */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <div className="font-semibold text-gray-900">เด็ก</div>
                      <div className="text-sm text-gray-600">อายุ 2-11 ปี (ราคา 80%)</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateBookingData('children', Math.max(0, bookingData.children - 1))}
                        className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-100"
                        disabled={bookingData.children <= 0}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-bold">{bookingData.children}</span>
                      <button
                        onClick={() => updateBookingData('children', bookingData.children + 1)}
                        className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-100"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Infants */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <div className="font-semibold text-gray-900">ทารก</div>
                      <div className="text-sm text-gray-600">อายุ 0-23 เดือน (ฟรี)</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateBookingData('infants', Math.max(0, bookingData.infants - 1))}
                        className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-100"
                        disabled={bookingData.infants <= 0}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-bold">{bookingData.infants}</span>
                      <button
                        onClick={() => updateBookingData('infants', bookingData.infants + 1)}
                        className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-100"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-xl">
                <div className="text-lg font-bold text-gray-900 mb-2">ยอดรวม</div>
                <div className="text-2xl font-bold text-blue-600">฿{calculateTotal().toLocaleString()}</div>
              </div>
            </div>
          )}

          {/* Step 2: Add-ons */}
          {step === 2 && tour.addOns && tour.addOns.length > 0 && (
            <div className="space-y-4">
              <div className="text-gray-700 mb-4">เลือกบริการเสริม (ไม่บังคับ)</div>
              
              {tour.addOns.map((addOn: any) => (
                <div key={addOn.id} className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-900">{addOn.name}</span>
                        {addOn.badge && (
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                            {addOn.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{addOn.description}</p>
                      <div className="text-blue-600 font-bold">+฿{addOn.price.toLocaleString()}</div>
                    </div>
                    <button
                      onClick={() => toggleAddOn(addOn.id)}
                      className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                        bookingData.addOns.includes(addOn.id)
                          ? 'bg-blue-600 border-blue-600 text-white'
                          : 'border-gray-300 hover:border-blue-600'
                      }`}
                    >
                      {bookingData.addOns.includes(addOn.id) && <Check className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              ))}

              <div className="bg-blue-50 p-4 rounded-xl">
                <div className="space-y-2 text-sm mb-3">
                  <div className="flex justify-between">
                    <span>ค่าทัวร์</span>
                    <span>฿{(tour.price * (bookingData.adults + bookingData.children * 0.8)).toLocaleString()}</span>
                  </div>
                  {getAddOnTotal() > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>บริการเสริม</span>
                      <span>+฿{getAddOnTotal().toLocaleString()}</span>
                    </div>
                  )}
                </div>
                <div className="pt-2 border-t">
                  <div className="text-lg font-bold text-gray-900 mb-1">ยอดรวม</div>
                  <div className="text-2xl font-bold text-blue-600">฿{calculateTotal().toLocaleString()}</div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Contact Form */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">ชื่อ-นามสกุล *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:outline-none text-base"
                  placeholder="กรอกชื่อ-นามสกุล"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">หมายเลขโทรศัพท์ *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:outline-none text-base"
                  placeholder="08X-XXX-XXXX"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">อีเมล</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:outline-none text-base"
                  placeholder="example@email.com"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">ความต้องการพิเศษ</label>
                <textarea
                  value={formData.specialRequests}
                  onChange={(e) => setFormData(prev => ({ ...prev, specialRequests: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:outline-none text-base"
                  placeholder="เช่น อาหารมังสวิรัติ, ที่นั่งแถวหน้า"
                  rows={3}
                />
              </div>
            </div>
          )}

          {/* Step 4: Summary */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="bg-green-100 border-2 border-green-300 rounded-xl p-6 text-center">
                <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-green-800 mb-2">จองสำเร็จแล้ว!</h3>
                <p className="text-green-700">เจ้าหน้าที่จะติดต่อกลับภายใน 24 ชม.</p>
              </div>

              <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4">
                <h4 className="font-bold text-gray-900 mb-4">สรุปการจอง</h4>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>ผู้ใหญ่ x {bookingData.adults}</span>
                    <span>฿{(tour.price * bookingData.adults).toLocaleString()}</span>
                  </div>
                  
                  {bookingData.children > 0 && (
                    <div className="flex justify-between">
                      <span>เด็ก x {bookingData.children}</span>
                      <span>฿{(tour.price * bookingData.children * 0.8).toLocaleString()}</span>
                    </div>
                  )}
                  
                  {bookingData.addOns.length > 0 && (
                    <>
                      <hr className="border-gray-300" />
                      <div className="font-medium">บริการเสริม:</div>
                      {bookingData.addOns.map((addOnId: string) => {
                        const addOn = tour.addOns?.find((a: any) => a.id === addOnId)
                        if (!addOn) return null
                        return (
                          <div key={addOnId} className="flex justify-between">
                            <span>{addOn.name}</span>
                            <span>฿{addOn.price.toLocaleString()}</span>
                          </div>
                        )
                      })}
                    </>
                  )}
                  
                  <hr className="border-gray-300" />
                  <div className="flex justify-between font-bold text-lg">
                    <span>ยอดรวม</span>
                    <span className="text-blue-600">฿{calculateTotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-green-600 font-medium">
                    <span>มัดจำ (30%)</span>
                    <span>฿{Math.round(calculateTotal() * 0.3).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                <h4 className="font-bold text-blue-800 mb-2">ข้อมูลการติดต่อ</h4>
                <div className="text-sm space-y-1">
                  <div><strong>ชื่อ:</strong> {formData.name}</div>
                  <div><strong>โทรศัพท์:</strong> {formData.phone}</div>
                  {formData.email && <div><strong>อีเมล:</strong> {formData.email}</div>}
                  {formData.specialRequests && <div><strong>ความต้องการพิเศษ:</strong> {formData.specialRequests}</div>}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-3 mt-6">
            {step > 1 && step < 4 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-6 py-3 bg-gray-100 text-gray-800 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
              >
                ย้อนกลับ
              </button>
            )}
            
            {step < 4 ? (
              <button
                onClick={() => {
                  if (step < 3) {
                    setStep(step + 1)
                  } else {
                    // Submit booking
                    setStep(4)
                  }
                }}
                disabled={step === 3 && (!formData.name || !formData.phone)}
                className={`flex-1 py-3 font-bold rounded-xl transition-colors flex items-center justify-center gap-2 ${
                  step === 3 && (!formData.name || !formData.phone)
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800'
                }`}
              >
                {step === 3 ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    ยืนยันการจอง
                  </>
                ) : (
                  'ถัดไป'
                )}
              </button>
            ) : (
              <button
                onClick={onClose}
                className="flex-1 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold rounded-xl hover:from-green-700 hover:to-green-800"
              >
                เสร็จสิ้น
              </button>
            )}
          </div>

          {/* Additional Info */}
          {step === 4 && (
            <div className="text-center text-gray-600 text-sm mt-4">
              <p className="mb-2">🔒 ข้อมูลของคุณปลอดภัย 100%</p>
              <p>เจ้าหน้าที่จะติดต่อกลับภายใน 24 ชม. เพื่อยืนยันรายละเอียดและแจ้งวิธีการชำระเงิน</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Loading Component
function LoadingDetail() {
  return (
    <div className="min-h-screen bg-white">
      <div className="px-4 py-4 border-b-2 border-gray-200">
        <div className="h-8 bg-gray-200 rounded w-20 animate-pulse"></div>
      </div>
      <div className="h-64 sm:h-80 bg-gray-200 animate-pulse"></div>
      <div className="px-4 py-6 space-y-6">
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-16 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-16 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Not Found Component
function NotFoundDetail() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          <MapPin className="w-8 h-8 text-gray-400" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">ไม่พบทัวร์นี้</h1>
        <p className="text-gray-600 mb-8 text-lg leading-relaxed">
          ทัวร์ที่คุณค้นหาไม่มีอยู่ในระบบ หรือ URL อาจจะผิดพลาด
        </p>
        <div className="space-y-4">
          <Link
            href="/tour-search-22"
            className="inline-block w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-lg font-bold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-colors"
          >
            กลับหน้าค้นหาทัวร์
          </Link>
          <Link
            href="/"
            className="inline-block w-full px-6 py-4 bg-gray-100 text-gray-800 text-lg font-medium rounded-xl hover:bg-gray-200 transition-colors"
          >
            กลับหน้าแรก
          </Link>
        </div>
      </div>
    </div>
  )
}

// Add CSS for scrollbar-hide and animation
const style = `
  @layer utilities {
    .scrollbar-hide {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    .scrollbar-hide::-webkit-scrollbar {
      display: none;
    }
    
    @keyframes slide-in-right {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    .animate-slide-in-right {
      animation: slide-in-right 0.3s ease-out;
    }
  }
`

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style')
  styleSheet.innerText = style
  document.head.appendChild(styleSheet)
}