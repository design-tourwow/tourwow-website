'use client'

import React, { useState, useEffect, use, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft, Star, Heart, Share2, MapPin, Clock, Users, Calendar, 
  Phone, MessageCircle, Zap, Flame, Timer, ChevronRight, Eye, 
  Shield, Award, Check, X, ChevronDown, ChevronUp, Play, Camera, 
  CreditCard, CheckCircle, AlertCircle, TrendingUp, Sparkles,
  Navigation, Globe, Wifi, Coffee, Utensils, Car, Plane, Hotel,
  ThumbsUp, BookOpen, Send, Bookmark
} from 'lucide-react'

// Extended tour data for tour-search-28 specific detail pages
const tourData = [
  {
    id: 'tour-jp-001',
    title: 'ทัวร์ญี่ปุ่น โตเกียว เกียวโต ซากุระบูม',
    subtitle: 'สัมผัสความงามของซากุระในฤดูใบไม้ผลิ',
    destination: 'ญี่ปุ่น',
    cities: ['โตเกียว', 'เกียวโต', 'โอซาก้า'],
    duration: '5 วัน 4 คืน',
    price: 45900,
    originalPrice: 52900,
    rating: 4.8,
    reviewCount: 156,
    bookingCount: 342,
    lastBookedAt: '3 นาทีที่แล้ว',
    viewingNow: 28,
    heroImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&h=800&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1528164344705-47542687000d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&h=600&fit=crop'
    ],
    highlights: [
      { icon: '🌸', title: 'ชมซากุระ', description: 'ฤดูกาลดอกซากุระบาน มี.ค.-เม.ย.' },
      { icon: '⛩️', title: 'วัดเก่าแก่', description: 'วัดเซ็นโซจิ อายุกว่า 1,400 ปี' },
      { icon: '🚄', title: 'รถไฟชินคันเซน', description: 'ประสบการณ์รถไฟความเร็วสูง 320 กม./ชม.' },
      { icon: '🗾', title: 'ฟูจิซัง', description: 'ภูเขาไฟศักดิ์สิทธิ์ สูง 3,776 เมตร' }
    ],
    available: true,
    availableSeats: 8,
    features: ['ไกด์ไทย', 'รถปรับอากาศ', 'อาหาร 3 มื้อ', 'โรงแรม 4 ดาว', 'ประกันเดินทาง'],
    departures: [
      { 
        id: 1, 
        date: '2025-03-15', 
        dateLabel: '15 มีนาคม 2568', 
        price: 45900, 
        seats: 8, 
        status: 'available',
        specialNote: 'ช่วงซากุระบาน' 
      },
      { 
        id: 2, 
        date: '2025-03-22', 
        dateLabel: '22 มีนาคม 2568', 
        price: 47900, 
        seats: 12, 
        status: 'available',
        specialNote: 'วันหยุดยาว' 
      },
      { 
        id: 3, 
        date: '2025-04-05', 
        dateLabel: '5 เมษายน 2568', 
        price: 49900, 
        seats: 3, 
        status: 'limited',
        specialNote: 'ซากุระเต็มบาน' 
      }
    ],
    itinerary: [
      {
        day: 1,
        title: 'เดินทางถึงโตเกียว',
        location: 'โตเกียว',
        highlight: 'ย่านชิบูยา',
        activities: [
          'เดินทางจากสุวรรณภูมิ',
          'เดินทางถึงนาริตะ',
          'เช็คอินโรงแรม',
          'เดินเล่นย่านชิบูยา'
        ],
        meals: ['อาหารค่ำ'],
        accommodation: 'Shinagawa Prince Hotel 4⭐'
      },
      {
        day: 2,
        title: 'ชมซากุระ อุเอโนะ',
        location: 'โตเกียว',
        highlight: 'สวนอุเอโนะ',
        activities: [
          'ชมซากุระสวนอุเอโนะ',
          'วัดเซ็นโซจิ อาซากุสะ',
          'ช้อปปิ้งถนนนากามิเสะ',
          'ล่องเรือแม่น้ำสุมิดะ'
        ],
        meals: ['อาหารเช้า', 'อาหารกลางวัน', 'อาหารค่ำ'],
        accommodation: 'Shinagawa Prince Hotel 4⭐'
      },
      {
        day: 3,
        title: 'ภูเขาไฟฟูจิ',
        location: 'ฟูจิ-คาวากุจิ',
        highlight: 'ทะเลสาบคาวากุจิ',
        activities: [
          'เดินทางสู่ภูเขาไฟฟูจิ',
          'ขึ้นกระเช้าไฟฟูจิ',
          'ชมทะเลสาบคาวากุจิ',
          'ถ่ายรูปซากุระกับฟูจิซัง'
        ],
        meals: ['อาหารเช้า', 'อาหารกลางวัน'],
        accommodation: 'Kyoto Tower Hotel 4⭐'
      },
      {
        day: 4,
        title: 'เกียวโต โบราณ',
        location: 'เกียวโต',
        highlight: 'วัดทองคำ',
        activities: [
          'วัดทองคำ คินคะคุจิ',
          'สวนไผ่อารชิยามะ',
          'ย่านเก๋อิชะ กิออน',
          'วัดเคียวมิซุเดระ'
        ],
        meals: ['อาหารเช้า', 'อาหารกลางวัน', 'อาหารค่ำ'],
        accommodation: 'Kyoto Tower Hotel 4⭐'
      },
      {
        day: 5,
        title: 'เดินทางกลับ',
        location: 'กลับประเทศไทย',
        highlight: 'ช้อปปิ้งสนามบิน',
        activities: [
          'ช้อปปิ้งของฝากล่าสุด',
          'เดินทางสู่สนามบิน',
          'เดินทางกลับประเทศไทย'
        ],
        meals: ['อาหารเช้า', 'อาหารบนเครื่องบิน'],
        accommodation: '-'
      }
    ],
    included: [
      'ตั๋วเครื่องบิน ไป-กลับ (Thai Airways)',
      'โรงแรม 4 ดาว (2 คืนต่อเมือง)',
      'อาหาร 3 มื้อตามรายการ',
      'รถรับส่งและนำเที่ยวปรับอากาศ',
      'ไกด์ท้องถิ่นพูดไทยได้',
      'ค่าเข้าชมสถานที่ทุกแห่ง',
      'ประกันการเดินทางพื้นฐาน',
      'ภาษีสนามบินทุกแห่ง'
    ],
    excluded: [
      'ค่าทิปไกด์และคนขับ (1,500 บาท/ท่าน)',
      'ค่าวีซ่าญี่ปุ่น (หากจำเป็น)',
      'ประกันการเดินทางเพิ่มเติม',
      'ค่าใช้จ่ายส่วนตัว',
      'อาหารและเครื่องดื่มนอกโปรแกรม',
      'ค่าโทรศัพท์และอินเทอร์เน็ต',
      'ค่าธรรมเนียมกระเป๋าเพิ่ม'
    ],
    policies: {
      deposit: 10000,
      cancellation: 'ยกเลิกฟรี 30 วันก่อนเดินทาง',
      payment: ['เงินสด', 'โอนธนาคาร', 'บัตรเครดิต'],
      documents: ['หนังสือเดินทาง (อายุเหลือ > 6 เดือน)', 'รูปถ่าย 2x2 จำนวน 2 ใบ']
    },
    reviews: [
      {
        id: 1,
        name: 'คุณสมใจ เที่ยวดี',
        rating: 5,
        date: '2025-01-15',
        review: 'ทัวร์ดีมาก ไกด์ดูแลดี ซากุระสวยมาก ประทับใจสุดๆ แนะนำเลย!',
        images: ['https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=300&h=200&fit=crop'],
        verified: true
      },
      {
        id: 2,
        name: 'คุณมาลี รักเที่ยว',
        rating: 4,
        date: '2025-01-10',
        review: 'โรงแรมดี อาหารอร่อย แต่เดินเยอะหน่อย โดยรวมดีมาก คุ้มค่าเงิน',
        verified: true
      }
    ],
    faqs: [
      {
        q: 'ต้องเตรียมเอกสารอะไรบ้าง?',
        a: 'หนังสือเดินทางที่มีอายุเหลือมากกว่า 6 เดือน และรูปถ่าย 2x2 จำนวน 2 ใบ สำหรับการขอวีซ่า (หากจำเป็น)'
      },
      {
        q: 'สามารถยกเลิกการจองได้หรือไม่?',
        a: 'สามารถยกเลิกได้ฟรี 30 วันก่อนเดินทาง หลังจากนั้นจะมีค่าธรรมเนียมตามเงื่อนไข'
      },
      {
        q: 'มีประกันการเดินทางหรือไม่?',
        a: 'รวมประกันการเดินทางพื้นฐานแล้ว แต่แนะนำให้ซื้อประกันเพิ่มเติมเพื่อความคุ้มครองที่ครอบคลุม'
      },
      {
        q: 'อากาศในญี่ปุ่นช่วงนี้เป็นอย่างไร?',
        a: 'อุณหภูมิประมาณ 15-22 องศา เซลเซียส แนะนำให้เตรียมเสื้อแขนยาวและเสื้อกันหนาว'
      }
    ],
    seo: {
      title: 'ทัวร์ญี่ปุ่น โตเกียว เกียวโต ซากุระบูม 5วัน4คืน',
      description: 'ทัวร์ญี่ปุ่นซากุระบูม เที่ยวโตเกียว เกียวโต ชมวัดเก่าแก่ ขึ้นภูเขาไฟฟูจิ พร้อมไกด์ไทย โรงแรม 4 ดาว เริ่มต้น 45,900 บาท',
      keywords: ['ทัวร์ญี่ปุ่น', 'ซากุระ', 'โตเกียว', 'เกียวโต', 'ฟูจิซัง', 'ทัวร์ต่างประเทศ']
    }
  }
  // Add more tours as needed
]

interface TourDetailPageProps {
  params: Promise<{ id: string }>
}

export default function TourDetailPage({ params }: TourDetailPageProps) {
  const resolvedParams = use(params)
  const searchParams = useSearchParams()
  const source = searchParams.get('src')
  
  // State management
  const [activeImage, setActiveImage] = useState(0)
  const [showGallery, setShowGallery] = useState(false)
  const [selectedDeparture, setSelectedDeparture] = useState(0)
  const [showBookingSheet, setShowBookingSheet] = useState(false)
  const [bookingStep, setBookingStep] = useState(1)
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)
  const [viewingCount, setViewingCount] = useState(28)
  const [recentBooking, setRecentBooking] = useState('คุณสมใจ จองเมื่อ 3 นาทีที่แล้ว')
  const [showStickyBar, setShowStickyBar] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  
  // Refs
  const heroRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  
  // Find tour
  const tour = tourData.find(t => t.id === resolvedParams.id)
  
  if (!tour) {
    notFound()
  }

  // Check source parameter
  useEffect(() => {
    if (source !== 'search28') {
      console.warn('Direct access detected - missing src=search28 parameter')
    }
  }, [source])

  // Dynamic viewing count
  useEffect(() => {
    const interval = setInterval(() => {
      setViewingCount(prev => Math.max(15, Math.min(45, prev + Math.floor(Math.random() * 5) - 2)))
    }, 8000)
    
    return () => clearInterval(interval)
  }, [])

  // Recent booking updates
  useEffect(() => {
    const bookings = [
      'คุณสมใจ จองเมื่อ 3 นาทีที่แล้ว',
      'คุณมาลี จองเมื่อ 7 นาทีที่แล้ว', 
      'คุณประยุทธ์ จองเมื่อ 12 นาทีที่แล้ว',
      'คุณสุภาพร จองเมื่อ 18 นาทีที่แล้ว'
    ]
    
    const interval = setInterval(() => {
      const randomBooking = bookings[Math.floor(Math.random() * bookings.length)]
      setRecentBooking(randomBooking)
    }, 15000)
    
    return () => clearInterval(interval)
  }, [])

  // Sticky bar visibility
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const heroBottom = heroRef.current.offsetTop + heroRef.current.offsetHeight
        setShowStickyBar(window.scrollY > heroBottom - 100)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Gallery swipe handling
  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'left' && activeImage < tour.gallery.length - 1) {
      setActiveImage(activeImage + 1)
    } else if (direction === 'right' && activeImage > 0) {
      setActiveImage(activeImage - 1)
    }
  }

  // Format price helper
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('th-TH').format(price)
  }

  // Analytics events
  const trackEvent = (eventName: string, data?: any) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, {
        tour_id: tour.id,
        tour_name: tour.title,
        price: tour.price,
        source: source || 'direct',
        ...data
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* SEO Head */}
      <head>
        <title>{tour.seo.title} | TourWow</title>
        <meta name="description" content={tour.seo.description} />
        <meta name="keywords" content={tour.seo.keywords.join(', ')} />
        <meta property="og:title" content={tour.title} />
        <meta property="og:description" content={tour.seo.description} />
        <meta property="og:image" content={tour.heroImage} />
        <meta property="og:type" content="product" />
        <link rel="canonical" href={`https://tourwow.com/tour-search-28/${tour.id}`} />
      </head>

      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          <Link 
            href="/tour-search-28" 
            className="flex items-center text-gray-700 hover:text-gray-900 transition-colors"
            onClick={() => trackEvent('back_button_clicked')}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="font-medium">กลับ</span>
          </Link>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                setIsBookmarked(!isBookmarked)
                trackEvent('bookmark_clicked', { bookmarked: !isBookmarked })
              }}
              className={`p-2 rounded-full transition-all duration-300 ${
                isBookmarked ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
            
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: tour.title,
                    text: tour.subtitle,
                    url: window.location.href
                  })
                }
                trackEvent('share_clicked')
              }}
              className="p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section - Magazine Style */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        <Image
          src={tour.heroImage}
          alt={tour.title}
          fill
          className="object-cover"
          priority
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Floating Trust Badges */}
        <div className="absolute top-20 left-4 flex flex-wrap gap-2">
          <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
            <Flame className="w-4 h-4" />
            HOT
          </div>
          {tour.availableSeats <= 10 && (
            <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
              เหลือ {tour.availableSeats} ที่!
            </div>
          )}
        </div>

        {/* Gallery Counter */}
        <button
          onClick={() => {
            setShowGallery(true)
            trackEvent('gallery_opened')
          }}
          className="absolute top-20 right-4 bg-black/50 text-white px-3 py-2 rounded-full text-sm flex items-center gap-1 backdrop-blur-sm"
        >
          <Camera className="w-4 h-4" />
          {tour.gallery.length} รูป
        </button>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          {/* Real-time Social Proof */}
          <div className="bg-green-500/90 backdrop-blur-sm rounded-full px-4 py-2 mb-4 inline-flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span className="text-sm font-medium">{viewingCount} คนกำลังดู</span>
          </div>

          <h1 className="text-3xl font-bold mb-2 leading-tight">{tour.title}</h1>
          <p className="text-lg opacity-90 mb-4">{tour.subtitle}</p>
          
          <div className="flex flex-wrap gap-3 mb-6">
            <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{tour.cities.join(' • ')}</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{tour.duration}</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
              <Star className="w-4 h-4 fill-current text-yellow-400" />
              <span className="text-sm">{tour.rating} ({tour.reviewCount})</span>
            </div>
          </div>

          {/* Quick Price Display */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">
                ฿{formatPrice(tour.price)}
                <span className="text-lg font-normal opacity-75"> /คน</span>
              </div>
              {tour.originalPrice && (
                <div className="text-sm opacity-75 line-through">
                  ฿{formatPrice(tour.originalPrice)}
                </div>
              )}
            </div>
            
            <button
              onClick={() => {
                setShowBookingSheet(true)
                trackEvent('quick_book_clicked', { location: 'hero' })
              }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              จองเลย
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Cards */}
      <div className="relative -mt-6 z-10">
        {/* Highlights Card */}
        <div className="bg-white rounded-t-3xl shadow-lg mx-4 mb-6 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-yellow-500" />
            <h2 className="text-xl font-bold">ไฮไลท์ทริป</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {tour.highlights.map((highlight, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4">
                <div className="text-2xl mb-2">{highlight.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{highlight.title}</h3>
                <p className="text-sm text-gray-600">{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Booking Alert */}
        <div className="mx-4 mb-6">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-green-800 font-medium">{recentBooking}</span>
            <ThumbsUp className="w-4 h-4 text-green-600 ml-auto" />
          </div>
        </div>

        {/* Departure Selection Card */}
        <div className="bg-white rounded-2xl shadow-lg mx-4 mb-6 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-6 h-6 text-blue-500" />
            <h2 className="text-xl font-bold">เลือกวันเดินทาง</h2>
            <div className="ml-auto bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-bold">
              จำกัด!
            </div>
          </div>
          
          <div className="space-y-3">
            {tour.departures.map((departure, index) => (
              <button
                key={departure.id}
                onClick={() => {
                  setSelectedDeparture(index)
                  trackEvent('departure_selected', { departure_id: departure.id })
                }}
                className={`w-full p-4 rounded-xl border-2 transition-all duration-300 ${
                  selectedDeparture === index
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-blue-300'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">{departure.dateLabel}</div>
                    <div className="text-sm text-gray-600">{departure.specialNote}</div>
                    <div className={`text-sm flex items-center gap-1 mt-1 ${
                      departure.seats <= 5 ? 'text-red-500' : 'text-gray-500'
                    }`}>
                      <Users className="w-4 h-4" />
                      เหลือ {departure.seats} ที่นั่ง
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-blue-600">
                      ฿{formatPrice(departure.price)}
                    </div>
                    <div className="text-sm text-gray-500">ต่อคน</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Floating Timeline - Itinerary */}
        <div className="bg-white rounded-2xl shadow-lg mx-4 mb-6 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Navigation className="w-6 h-6 text-green-500" />
            <h2 className="text-xl font-bold">กำหนดการเดินทาง</h2>
          </div>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>
            
            {tour.itinerary.map((day, index) => (
              <div key={day.day} className="relative flex gap-4 pb-6 last:pb-0">
                {/* Day Circle */}
                <div className="relative z-10 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  {day.day}
                </div>
                
                {/* Day Content */}
                <div className="flex-1 pt-2">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="font-bold text-gray-900 mb-1">{day.title}</h3>
                    <p className="text-sm text-blue-600 mb-2">{day.location}</p>
                    <div className="text-sm text-gray-600">
                      <div className="font-medium text-orange-600 mb-1">🌟 {day.highlight}</div>
                      <div className="space-y-1">
                        {day.activities.slice(0, 2).map((activity, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                            {activity}
                          </div>
                        ))}
                        {day.activities.length > 2 && (
                          <div className="text-blue-600 text-xs">+{day.activities.length - 2} กิจกรรมเพิ่มเติม</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust & Features Card */}
        <div className="bg-white rounded-2xl shadow-lg mx-4 mb-6 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-6 h-6 text-green-500" />
            <h2 className="text-xl font-bold">ความมั่นใจ & บริการ</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {tour.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Award className="w-4 h-4 text-blue-500" />
                <span>รับรอง ททท.</span>
              </div>
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4 text-green-500" />
                <span>ประกันเดินทาง</span>
              </div>
              <div className="flex items-center gap-1">
                <Phone className="w-4 h-4 text-purple-500" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Card */}
        <div className="bg-white rounded-2xl shadow-lg mx-4 mb-6 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-6 h-6 text-yellow-500 fill-current" />
            <h2 className="text-xl font-bold">รีวิวจากลูกค้า</h2>
            <div className="ml-auto bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-bold">
              {tour.rating}/5
            </div>
          </div>
          
          <div className="space-y-4">
            {tour.reviews.map((review) => (
              <div key={review.id} className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {review.name.charAt(2)}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{review.name}</div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: review.rating }, (_, i) => (
                        <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                      ))}
                      {review.verified && (
                        <div className="ml-2 flex items-center gap-1 text-green-600 text-xs">
                          <CheckCircle className="w-3 h-3" />
                          ยืนยันแล้ว
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{review.review}</p>
                {review.images && (
                  <div className="mt-3 flex gap-2">
                    {review.images.map((img, idx) => (
                      <div key={idx} className="relative w-16 h-16 rounded-lg overflow-hidden">
                        <Image src={img} alt={`Review ${idx + 1}`} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Card */}
        <div className="bg-white rounded-2xl shadow-lg mx-4 mb-6 p-6">
          <div className="flex items-center gap-2 mb-4">
            <MessageCircle className="w-6 h-6 text-orange-500" />
            <h2 className="text-xl font-bold">คำถามที่พบบ่อย</h2>
          </div>
          
          <div className="space-y-3">
            {tour.faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">{faq.q}</span>
                  {expandedFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                
                {expandedFAQ === index && (
                  <div className="px-4 pb-4 text-gray-700 text-sm leading-relaxed border-t border-gray-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Card */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg mx-4 mb-20 p-6 text-white">
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2">ต้องการสอบถามเพิ่มเติม?</h2>
            <p className="opacity-90 mb-4">ทีมงานพร้อมดูแลตลอด 24 ชั่วโมง</p>
            
            <div className="flex gap-3">
              <a 
                href="tel:+66123456789"
                className="flex-1 bg-white/20 backdrop-blur-sm py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-white/30 transition-colors"
                onClick={() => trackEvent('phone_clicked')}
              >
                <Phone className="w-5 h-5" />
                โทรเลย
              </a>
              <a 
                href="https://line.me/ti/p/~@tourwow"
                className="flex-1 bg-green-500 py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-green-600 transition-colors"
                onClick={() => trackEvent('line_clicked')}
              >
                <MessageCircle className="w-5 h-5" />
                Line Chat
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      {showStickyBar && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 p-4 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <div className="text-lg font-bold text-blue-600">
                ฿{formatPrice(tour.departures[selectedDeparture].price)}
              </div>
              <div className="text-sm text-gray-500">
                {tour.departures[selectedDeparture].dateLabel}
              </div>
            </div>
            
            <button
              onClick={() => {
                setShowBookingSheet(true)
                trackEvent('sticky_book_clicked')
              }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              จองทัวร์
            </button>
          </div>
        </div>
      )}

      {/* Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          <div className="relative w-full h-full max-w-4xl">
            {/* Close Button */}
            <button
              onClick={() => setShowGallery(false)}
              className="absolute top-4 right-4 z-10 bg-black/50 text-white p-2 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
            
            {/* Image Counter */}
            <div className="absolute top-4 left-4 z-10 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {activeImage + 1} / {tour.gallery.length}
            </div>
            
            {/* Main Image */}
            <div className="relative w-full h-full">
              <Image
                src={tour.gallery[activeImage]}
                alt={`Gallery ${activeImage + 1}`}
                fill
                className="object-contain"
              />
            </div>
            
            {/* Navigation */}
            {activeImage > 0 && (
              <button
                onClick={() => setActiveImage(activeImage - 1)}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
              >
                <ChevronDown className="w-6 h-6 rotate-90" />
              </button>
            )}
            
            {activeImage < tour.gallery.length - 1 && (
              <button
                onClick={() => setActiveImage(activeImage + 1)}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
              >
                <ChevronDown className="w-6 h-6 -rotate-90" />
              </button>
            )}
            
            {/* Thumbnails */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 max-w-full overflow-x-auto px-4">
              {tour.gallery.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 flex-shrink-0 ${
                    index === activeImage ? 'border-white' : 'border-white/30'
                  }`}
                >
                  <Image src={img} alt={`Thumb ${index + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Booking Bottom Sheet */}
      {showBookingSheet && (
        <div className="fixed inset-0 z-50 bg-black/50">
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">ยืนยันการจอง</h3>
              <button
                onClick={() => setShowBookingSheet(false)}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {bookingStep === 1 && (
              <div className="space-y-6">
                {/* Tour Summary */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-semibold mb-2">{tour.title}</h4>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{tour.departures[selectedDeparture].dateLabel}</span>
                    <span>{tour.duration}</span>
                  </div>
                </div>
                
                {/* Guest Count */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    จำนวนผู้เดินทาง
                  </label>
                  <div className="flex items-center gap-4">
                    <button className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      -
                    </button>
                    <span className="text-xl font-semibold">1</span>
                    <button className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center">
                      +
                    </button>
                  </div>
                </div>
                
                {/* Price Summary */}
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span>ราคาต่อคน</span>
                    <span className="font-semibold">฿{formatPrice(tour.departures[selectedDeparture].price)}</span>
                  </div>
                  <div className="flex justify-between items-center text-lg font-bold text-blue-600 border-t border-blue-200 pt-2">
                    <span>รวมทั้งหมด</span>
                    <span>฿{formatPrice(tour.departures[selectedDeparture].price)}</span>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      setBookingStep(2)
                      trackEvent('booking_continue_clicked')
                    }}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg"
                  >
                    ดำเนินการต่อ
                  </button>
                  
                  <div className="flex gap-3">
                    <a 
                      href="tel:+66123456789"
                      className="flex-1 border-2 border-green-500 text-green-600 py-3 rounded-xl font-semibold text-center"
                    >
                      โทรสอบถาม
                    </a>
                    <a 
                      href="https://line.me/ti/p/~@tourwow"
                      className="flex-1 bg-green-500 text-white py-3 rounded-xl font-semibold text-center"
                    >
                      Line Chat
                    </a>
                  </div>
                </div>
              </div>
            )}
            
            {bookingStep === 2 && (
              <div className="space-y-6">
                <div className="text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h4 className="text-xl font-bold mb-2">ขอบคุณสำหรับความสนใจ!</h4>
                  <p className="text-gray-600 mb-6">
                    ระบบจองออนไลน์จะเปิดให้บริการเร็วๆ นี้<br />
                    ขณะนี้สามารถติดต่อทีมงานเพื่อจองได้เลย
                  </p>
                  
                  <div className="space-y-3">
                    <a 
                      href="tel:+66123456789"
                      className="w-full bg-green-500 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2"
                      onClick={() => trackEvent('final_phone_clicked')}
                    >
                      <Phone className="w-5 h-5" />
                      โทร 02-123-4567
                    </a>
                    
                    <a 
                      href="https://line.me/ti/p/~@tourwow"
                      className="w-full border-2 border-green-500 text-green-600 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2"
                      onClick={() => trackEvent('final_line_clicked')}
                    >
                      <MessageCircle className="w-5 h-5" />
                      แชท LINE @tourwow
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}