'use client'

import React, { useState, useEffect, use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Head from 'next/head'
import {
  ArrowLeft, Star, Heart, Share2, MapPin, Clock, Users,
  Calendar, Phone, MessageCircle, Zap, Flame, Timer,
  ChevronRight, Eye, Shield, Award, Check, X, 
  ChevronDown, ChevronUp, Play, Camera, Navigation,
  CreditCard, CheckCircle, AlertCircle, TrendingUp
} from 'lucide-react'

// Add custom CSS animations
const customStyles = `
  @keyframes slide-up {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
  }
  
  @keyframes count-up {
    from { transform: scale(1); }
    50% { transform: scale(1.1); }
    to { transform: scale(1); }
  }
  
  .animate-slide-up {
    animation: slide-up 0.3s ease-out;
  }
  
  .animate-count-up {
    animation: count-up 0.5s ease-out;
  }
  
  .scroll-smooth {
    scroll-behavior: smooth;
  }
`

// Mock tour data matching the listing page
const tourData = [
  {
    id: 'tour-jp-001',
    title: 'ทัวร์ญี่ปุ่น โตเกียว เกียวโต ซากุระบูม',
    destination: 'ญี่ปุ่น',
    duration: '5 วัน 4 คืน',
    price: 45900,
    originalPrice: 52900,
    rating: 4.8,
    reviewCount: 156,
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop',
    highlights: [
      { title: 'ชมซากุระ', description: 'ฤดูกาลดอกซากุระบาน มี.ค.-เม.ย.' },
      { title: 'วัดเก่าแก่', description: 'วัดเซ็นโซจิ อายุกว่า 1,400 ปี' },
      { title: 'รถไฟชินคันเซน', description: 'ประสบการณ์รถไฟความเร็วสูง 320 กม./ชม.' },
      { title: 'ฟูจิซัง', description: 'ภูเขาไฟศักดิ์สิทธิ์ สูง 3,776 เมตร' }
    ],
    available: true,
    availableSeats: 8,
    flashSale: true,
    trendingBadge: 'HOT',
    lastBooking: '5 นาทีที่แล้ว',
    bookingCount: 234,
    gallery: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1528164344705-47542687000d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800&h=600&fit=crop'
    ],
    itinerary: [
      {
        day: 1,
        title: 'เดินทางถึงโตเกียว',
        activities: ['เดินทางจากสนามบินสุวรรณภูมิ', 'เดินทางถึงโตเกียว', 'เช็คอินโรงแรม', 'ชมย่านชิบูยา'],
        meal: 'มื้อค่ำ'
      },
      {
        day: 2,
        title: 'ชมซากุระ อุเอโนะ',
        activities: ['ชมซากุระสวนอุเอโนะ', 'วัดเซ็นโซจิ อาซากุสะ', 'ช้อปปิ้งที่หิมะริ-ญ', 'ล่องเรือแม่น้ำสุมิดะ'],
        meal: 'เช้า, กลางวัน, ค่ำ'
      },
      {
        day: 3,
        title: 'ภูเขาไฟฟูจิ',
        activities: ['เดินทางสู่ภูเขาไฟฟูจิ', 'ขึ้นกระเช้าไฟฟูจิ', 'ชมทะเลสาบคาวากุจิ', 'ชมซากุระริมทะเลสาบ'],
        meal: 'เช้า, กลางวัน'
      }
    ]
  },
  {
    id: 'tour-kr-002',
    title: 'ทัวร์เกาหลีใต้ โซล ปูซาน ซากุระเกาหลี',
    destination: 'เกาหลีใต้',
    duration: '6 วัน 5 คืน',
    price: 38500,
    originalPrice: 42900,
    rating: 4.7,
    reviewCount: 89,
    image: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?w=800&h=600&fit=crop',
    highlights: [
      { title: 'K-Pop Culture', description: 'สถานที่ถ่ายทำ MV และค่ายเพลงดัง' },
      { title: 'ตลาดมยองดง', description: 'แหล่งช้อปปิ้งครบวงจร เปิด 24 ชม.' },
      { title: 'ซากุราฤดูใบไผ่', description: 'ดอกซากุระเกาหลี เม.ย.-พ.ค.' },
      { title: 'จีจูไอส์แลนด์', description: 'เกาะสวรรค์ มรดกโลกธรรมชาติ' }
    ],
    available: true,
    availableSeats: 12,
    flashSale: false,
    trendingBadge: 'TRENDING',
    lastBooking: '12 นาทีที่แล้ว',
    bookingCount: 167,
    gallery: [
      'https://images.unsplash.com/photo-1538485399081-7191377e8241?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop'
    ],
    itinerary: [
      {
        day: 1,
        title: 'เดินทางถึงโซล',
        activities: ['เดินทางจากไทย', 'เช็คอินโรงแรม', 'ย่านมยองดง'],
        meal: 'มื้อค่ำ'
      }
    ]
  }
]

interface TourDetailPageProps {
  params: Promise<{ id: string }>
}

export default function TourDetailPage({ params }: TourDetailPageProps) {
  const resolvedParams = use(params)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')
  const [showGallery, setShowGallery] = useState(false)
  const [expandedDay, setExpandedDay] = useState<number>(1)
  const [showStickyCTA, setShowStickyCTA] = useState(false)
  const [viewingUsers, setViewingUsers] = useState(12)
  const [flashSaleTimeLeft, setFlashSaleTimeLeft] = useState({ hours: 2, minutes: 15, seconds: 30 })
  const [bookingStep, setBookingStep] = useState(1)
  const [bookingData, setBookingData] = useState({
    guests: 1,
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  })

  // Find tour data
  const tour = tourData.find(t => t.id === resolvedParams.id)
  
  if (!tour) {
    notFound()
  }

  // Analytics tracking
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      // Page view event
      window.gtag('event', 'page_view', {
        page_title: tour.title,
        page_location: window.location.href,
        content_category: 'tour_detail',
        tour_id: tour.id,
        destination: tour.destination,
        price: tour.price
      })

      // View item event (ecommerce)
      window.gtag('event', 'view_item', {
        currency: 'THB',
        value: tour.price,
        items: [{
          item_id: tour.id,
          item_name: tour.title,
          category: 'tours',
          category2: tour.destination,
          price: tour.price,
          quantity: 1
        }]
      })
    }
  }, [tour])

  // Track booking funnel events
  const trackFunnelEvent = (event: string, data?: any) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', event, {
        event_category: 'booking_funnel_search24',
        tour_id: tour.id,
        destination: tour.destination,
        ...data
      })
    }
  }

  // Flash sale timer
  useEffect(() => {
    if (tour.flashSale) {
      const timer = setInterval(() => {
        setFlashSaleTimeLeft(prev => {
          if (prev.seconds > 0) {
            return { ...prev, seconds: prev.seconds - 1 }
          } else if (prev.minutes > 0) {
            return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
          } else if (prev.hours > 0) {
            return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
          }
          return prev
        })
      }, 1000)
      
      return () => clearInterval(timer)
    }
  }, [tour.flashSale])

  // Live viewing users with animation
  useEffect(() => {
    const interval = setInterval(() => {
      setViewingUsers(prev => {
        const newCount = Math.max(8, Math.min(25, prev + Math.floor(Math.random() * 5) - 2))
        // Trigger count animation
        const countElements = document.querySelectorAll('.viewing-count')
        countElements.forEach(el => {
          el.classList.add('animate-count-up')
          setTimeout(() => el.classList.remove('animate-count-up'), 500)
        })
        return newCount
      })
    }, 12000)
    
    return () => clearInterval(interval)
  }, [])

  // Sticky CTA visibility
  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero-section')
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight
        setShowStickyCTA(window.scrollY > heroBottom)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('th-TH').format(price)
  }

  const formatTime = (time: { hours: number, minutes: number, seconds: number }) => {
    return `${time.hours.toString().padStart(2, '0')}:${time.minutes.toString().padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}`
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      <Head>
        <title>{tour.title} - ทัวร์คุณภาพ ราคาดี | TourWow</title>
        <meta name="description" content={`${tour.title} ${tour.duration} เริ่มต้น ฿${formatPrice(tour.price)} ${tour.highlights.join(', ')} จองออนไลน์ได้ทันที`} />
        <meta name="keywords" content={`ทัวร์${tour.destination}, ${tour.destination}, ทัวร์ต่างประเทศ, ${tour.highlights.join(', ')}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={`${tour.title} - ราคาพิเศษ ฿${formatPrice(tour.price)}`} />
        <meta property="og:description" content={`${tour.duration} ${tour.highlights.join(', ')} จองง่าย ปลอดภัย มั่นใจ`} />
        <meta property="og:image" content={tour.image} />
        <meta property="og:type" content="product" />
        <meta property="product:price:amount" content={tour.price.toString()} />
        <meta property="product:price:currency" content="THB" />
        
        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TouristTrip",
              "name": tour.title,
              "description": `${tour.title} ${tour.duration} ${tour.highlights.join(', ')}`,
              "image": tour.image,
              "offers": {
                "@type": "Offer",
                "price": tour.price,
                "priceCurrency": "THB",
                "availability": tour.available ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
                "url": `https://tourwow.com/tour-search-24/${tour.id}`
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": tour.rating,
                "reviewCount": tour.reviewCount,
                "bestRating": 5
              },
              "itinerary": tour.itinerary?.map(day => ({
                "@type": "Day",
                "name": day.title,
                "description": day.activities.join(', ')
              }))
            })
          }}
        />
      </Head>
      <div className="min-h-screen bg-white">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/tour-search-24" className="flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span>กลับ</span>
          </Link>
          <div className="flex items-center space-x-2">
            <button 
              className="p-2 text-gray-600 hover:text-red-500 transition-all duration-300"
              onClick={() => {
                // Heart animation micro-interaction
                const heart = document.querySelector('.heart-btn')
                heart?.classList.add('animate-ping')
                setTimeout(() => heart?.classList.remove('animate-ping'), 600)
              }}
            >
              <Heart className="w-5 h-5 heart-btn transition-all duration-300" />
            </button>
            <button 
              className="p-2 text-gray-600 hover:text-blue-500 transition-colors"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: tour.title,
                    text: `ดูทัวร์นี้ ${tour.title} ราคาเพียง ฿${formatPrice(tour.price)}`,
                    url: window.location.href
                  })
                } else {
                  navigator.clipboard.writeText(window.location.href)
                  alert('คัดลิงก์แล้ว!')
                }
              }}
            >
              <Share2 className="w-5 h-5" />
            </button>
            <a href="https://line.me/ti/p/YOUR_LINE_ID" target="_blank" className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-colors">
              <MessageCircle className="w-5 h-5" />
            </a>
            <a href="tel:+66123456789" className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors">
              <Phone className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Hero Story Section - Fresh Design */}
      <section id="hero-section" className="relative">
        {/* Image Carousel */}
        <div className="relative h-72 sm:h-80 lg:h-96 overflow-hidden">
          <Image
            src={tour.gallery?.[activeImageIndex] || tour.image}
            alt={tour.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          
          {/* Badges - Top */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {tour.flashSale && (
              <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-sm font-bold flex items-center space-x-1 shadow-lg animate-pulse">
                <Flame className="w-4 h-4" />
                <span>FLASH SALE</span>
              </div>
            )}
            <div className="bg-red-500 text-white px-3 py-1.5 rounded-full text-sm font-bold">
              {tour.trendingBadge}
            </div>
          </div>

          {/* Gallery Button */}
          {tour.gallery && tour.gallery.length > 1 && (
            <button 
              onClick={() => setShowGallery(true)}
              className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1.5 rounded-lg text-sm flex items-center space-x-1 hover:bg-black/70"
            >
              <Eye className="w-4 h-4" />
              <span>{tour.gallery.length} รูป</span>
            </button>
          )}

          {/* Navigation Arrows - Touch Friendly */}
          {tour.gallery && tour.gallery.length > 1 && (
            <>
              <button 
                onClick={() => setActiveImageIndex(activeImageIndex > 0 ? activeImageIndex - 1 : tour.gallery!.length - 1)}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-all"
                style={{ minWidth: '48px', minHeight: '48px' }}
              >
                ‹
              </button>
              <button 
                onClick={() => setActiveImageIndex(activeImageIndex < tour.gallery!.length - 1 ? activeImageIndex + 1 : 0)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-all"
                style={{ minWidth: '48px', minHeight: '48px' }}
              >
                ›
              </button>
              
              {/* Thumbnail Strip */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 bg-black/50 px-3 py-2 rounded-full backdrop-blur-sm">
                {tour.gallery.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`w-12 h-8 rounded overflow-hidden border-2 transition-all ${
                      index === activeImageIndex ? 'border-white shadow-lg' : 'border-white/50'
                    }`}
                    style={{ minWidth: '48px', minHeight: '32px' }}
                  >
                    <Image src={img} alt={`Thumb ${index + 1}`} width={48} height={32} className="object-cover w-full h-full" />
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Title Overlay - Story Format with Trust */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 leading-tight">
              {tour.title}
            </h1>
            <div className="flex items-center space-x-3 mb-3">
              <span className="text-sm bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
                🔥 จองแล้ว {tour.bookingCount}+ คน
              </span>
              <span className="text-sm bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
                ⭐ {tour.rating} ({tour.reviewCount} รีวิว)
              </span>
            </div>
            <div className="flex items-center space-x-4 text-sm mb-4">
              <div className="flex items-center space-x-1 bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
                <MapPin className="w-4 h-4 text-blue-300" />
                <span>{tour.destination}</span>
              </div>
              <div className="flex items-center space-x-1 bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
                <Clock className="w-4 h-4 text-green-300" />
                <span>{tour.duration}</span>
              </div>
              <div className="flex items-center space-x-1 bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{tour.rating}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Flash Sale Timer - More Prominent */}
        {tour.flashSale && (
          <div className="bg-gradient-to-r from-red-600 via-red-500 to-pink-600 text-white py-4 px-4 shadow-lg">
            <div className="flex items-center justify-center space-x-3">
              <Flame className="w-6 h-6 animate-pulse" />
              <span className="text-lg font-bold">⏰ เหลือเวลา: {formatTime(flashSaleTimeLeft)}</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium animate-pulse">
                -{Math.round(((tour.originalPrice || tour.price) - tour.price) / (tour.originalPrice || tour.price) * 100)}% OFF
              </span>
            </div>
          </div>
        )}
      </section>

      <div className="max-w-7xl mx-auto">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8 p-4 lg:p-6">
          {/* Main Content - Card-Based Layout */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Quick Info Cards - Mobile First */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Social Proof Card - Show First on Mobile */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-5 border border-green-200 order-1 lg:order-2">
                <div className="flex items-center space-x-2 mb-3">
                  <Users className="w-5 h-5 text-green-600" />
                  <h3 className="font-bold text-gray-900">ความไว้วางใจ</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">คะแนนรีวิว</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-bold">{tour.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">จำนวนรีวิว</span>
                    <span className="font-bold">{tour.reviewCount} รีวิว</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">คนจองแล้ว</span>
                    <span className="font-bold text-green-600">{tour.bookingCount}+ คน</span>
                  </div>
                  <div className="bg-green-100 rounded-lg p-2 mt-3">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-medium text-green-700">มี <span className="viewing-count">{viewingUsers}</span> คนกำลังดูอยู่</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Highlights Card - Enhanced with Context */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-5 border border-blue-200 order-2 lg:order-1">
                <div className="flex items-center space-x-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <h3 className="font-bold text-gray-900">จุดเด่น</h3>
                </div>
                <div className="space-y-3">
                  {tour.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <span className="text-sm font-semibold text-gray-800 block">{highlight.title}</span>
                        <span className="text-xs text-gray-600 mt-0.5 block">{highlight.description}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Story-Driven Itinerary */}
            <div id="itinerary-section" className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center space-x-2">
                <Navigation className="w-6 h-6 text-blue-600" />
                <span>เรื่องราวการเดินทาง</span>
              </h2>
              
              <div className="space-y-4">
                {tour.itinerary?.map((day, index) => (
                  <div key={day.day} className="border-l-4 border-blue-500 pl-4">
                    <button
                      onClick={() => setExpandedDay(expandedDay === day.day ? 0 : day.day)}
                      className="w-full text-left mb-2 hover:bg-gray-50 p-2 rounded-lg transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                            {day.day}
                          </div>
                          <h3 className="font-semibold text-gray-900">{day.title}</h3>
                        </div>
                        {expandedDay === day.day ? 
                          <ChevronUp className="w-5 h-5 text-gray-400" /> : 
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        }
                      </div>
                    </button>
                    
                    {expandedDay === day.day && (
                      <div className="ml-11 space-y-2 pb-4">
                        {day.activities.map((activity, actIndex) => (
                          <div key={actIndex} className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700 text-sm">{activity}</span>
                          </div>
                        ))}
                        {day.meal && (
                          <div className="mt-3 bg-orange-50 p-3 rounded-lg border border-orange-200">
                            <div className="flex items-center space-x-2">
                              <span className="text-orange-600 text-sm font-medium">🍽️ อาหาร:</span>
                              <span className="text-orange-800 text-sm">{day.meal}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* What's Included/Excluded - Card Format */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
                <h3 className="font-bold text-green-800 mb-4 flex items-center space-x-2">
                  <Check className="w-5 h-5" />
                  <span>รวมในราคา</span>
                </h3>
                <div className="space-y-2">
                  {[
                    'ตั๋วเครื่องบิน (ไป-กลับ)',
                    'โรงแรม 4-5 ดาว',
                    'รถรับส่งสนามบิน',
                    'อาหาร 3 มื้อตามโปรแกรม',
                    'ไกด์นำเที่ยวท้องถิ่น',
                    'ค่าเข้าชมสถานที่'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-green-800 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-red-50 rounded-2xl p-6 border border-red-200">
                <h3 className="font-bold text-red-800 mb-4 flex items-center space-x-2">
                  <X className="w-5 h-5" />
                  <span>ไม่รวมในราคา</span>
                </h3>
                <div className="space-y-2">
                  {[
                    'ค่าทิปไกด์และคนขับรถ',
                    'ค่าวีซ่า (หากจำเป็น)',
                    'ประกันการเดินทางเพิ่มเติม',
                    'ค่าใช้จ่ายส่วนตัว',
                    'อาหารและเครื่องดื่มนอกโปรแกรม'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <X className="w-4 h-4 text-red-600" />
                      <span className="text-red-800 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Trust & Safety - Enhanced */}
            <div id="trust-section" className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
              <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center space-x-2">
                <Shield className="w-6 h-6" />
                <span>ความไว้วางใจและความปลอดภัย</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Award className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-blue-900">ใบอนุญาต ททท.</h3>
                      <p className="text-sm text-blue-700">รับรองจากการท่องเที่ยวแห่งประเทศไทย</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Shield className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-blue-900">การันตีคืนเงิน 100%</h3>
                      <p className="text-sm text-blue-700">หากไม่สามารถออกเดินทางได้ตามกำหนด</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-blue-900">พันธมิตรทั่วโลก</h3>
                      <p className="text-sm text-blue-700">ร่วมงานกับโรงแรมและสายการบินชั้นนำ</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Phone className="w-6 h-6 text-purple-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-blue-900">ดูแล 24/7</h3>
                      <p className="text-sm text-blue-700">ทีมงานพร้อมให้คำปรึกษาตลอดการเดินทาง</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Sidebar - Enhanced */}
          <div className="lg:col-span-1">
            <div id="booking-sidebar" className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sticky top-24">
              {/* Live Activity */}
              <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-xl p-3 mb-4">
                <div className="flex items-center justify-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <Eye className="w-4 h-4 text-gray-600" />
                  <span className="font-medium">มี <span className="viewing-count">{viewingUsers}</span> คน กำลังดูอยู่</span>
                </div>
              </div>

              {/* Price - Bigger and Bolder */}
              <div className="text-center mb-6">
                {tour.originalPrice && (
                  <div className="text-xl text-gray-400 line-through">฿{formatPrice(tour.originalPrice)}</div>
                )}
                <div className="text-4xl font-black text-blue-600 mb-2">
                  ฿{formatPrice(tour.price)}
                  <span className="text-lg text-gray-500 font-normal"> /คน</span>
                </div>
                {tour.originalPrice && (
                  <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full inline-block text-sm font-bold">
                    💰 ประหยัด ฿{formatPrice(tour.originalPrice - tour.price)}!
                  </div>
                )}
              </div>

              {/* Urgency with Progress Bar */}
              {tour.availableSeats <= 10 && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
                  <div className="text-red-600 font-bold flex items-center justify-center space-x-2 mb-2">
                    <AlertCircle className="w-5 h-5 animate-pulse" />
                    <span>เหลือเพียง {tour.availableSeats} ที่นั่ง!</span>
                  </div>
                  <div className="w-full bg-red-100 rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-red-500 to-red-600 h-full rounded-full animate-pulse"
                      style={{ width: `${(tour.availableSeats / 20) * 100}%` }}
                    />
                  </div>
                  <div className="text-red-500 text-xs mt-2 text-center">⚡ จองเลยวันนี้ เพื่อไม่พลาดโอกาส</div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => {
                    trackFunnelEvent('begin_checkout', { step: 'open_booking_modal' })
                    setShowBookingModal(true)
                  }}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                  aria-label={`จองทัวร์ ${tour.title} ราคา ${formatPrice(tour.price)} บาท`}
                >
                  <Calendar className="w-5 h-5" />
                  <span>จองทัวร์นี้</span>
                  {tour.flashSale && (
                    <span className="bg-white/20 px-2 py-1 rounded-full text-xs animate-pulse">
                      -15%
                    </span>
                  )}
                </button>
                
                <div className="grid grid-cols-2 gap-3">
                  <a 
                    href="tel:+66123456789" 
                    className="flex items-center justify-center space-x-1 bg-green-500 text-white py-3 rounded-xl font-medium hover:bg-green-600 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span>โทรสอบถาม</span>
                  </a>
                  <button className="flex items-center justify-center space-x-1 border-2 border-blue-600 text-blue-600 py-3 rounded-xl font-medium hover:bg-blue-50 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span>แชท</span>
                  </button>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <div className="text-xs text-gray-600 text-center mb-2 font-medium">รับชำระผ่าน</div>
                <div className="flex items-center justify-center space-x-3">
                  <div className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold">VISA</div>
                  <div className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">MC</div>
                  <div className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-bold">PP</div>
                  <div className="text-xs text-gray-600">บัตรเครดิต</div>
                </div>
              </div>
              
              {/* Trust Badge */}
              <div className="mt-3 flex items-center justify-center space-x-2 text-xs text-gray-500 bg-green-50 py-2 px-3 rounded-lg border border-green-200">
                <Shield className="w-4 h-4 text-green-500" />
                <span className="font-medium text-green-700">🔒 การจองปลอดภัย ได้รับการรับรอง</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Mobile CTA */}
      {showStickyCTA && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 animate-slide-up">
          <div className="p-4">
            <div className="flex items-center space-x-3">
              <div className="flex-1">
                <div className="flex items-baseline space-x-2">
                  {tour.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">฿{formatPrice(tour.originalPrice)}</span>
                  )}
                  <span className="text-xl font-bold text-blue-600 animate-pulse">฿{formatPrice(tour.price)}</span>
                </div>
                <div className="text-xs text-gray-500">ต่อคน • {tour.availableSeats} ที่เหลือ</div>
              </div>
              
              <div className="flex space-x-2">
                <a href="https://line.me/ti/p/YOUR_LINE_ID" target="_blank" className="bg-green-500 text-white p-3 rounded-xl hover:bg-green-600 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                </a>
                <button
                  onClick={() => {
                    setShowBookingModal(true)
                    // Smooth scroll to top when modal opens
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-xl text-white px-6 py-3 rounded-xl font-bold shadow-lg flex items-center space-x-2 transform hover:scale-105 transition-all duration-300"
                >
                  <Calendar className="w-4 h-4" />
                  <span>จองเลย</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal - 3-Step Process */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/60 flex items-end sm:items-center justify-center z-50">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {bookingStep === 1 && (
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-xl font-bold">เลือกวันเดินทาง</h3>
                    <div className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">ขั้นที่ 1/3</div>
                  </div>
                  <button onClick={() => setShowBookingModal(false)}>
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="space-y-4 mb-6">
                  {['15 มีนาคม 2568', '22 มีนาคม 2568', '29 มีนาคม 2568'].map((date, index) => (
                    <button
                      key={date}
                      onClick={() => {
                        setSelectedDate(date)
                        setBookingStep(2)
                      }}
                      className={`w-full p-4 border rounded-xl text-left hover:border-blue-300 transition-colors ${
                        selectedDate === date ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">{date}</div>
                          <div className="text-sm text-gray-500">เหลือ {8 - index * 2} ที่นั่ง</div>
                        </div>
                        <div className="text-lg font-bold text-blue-600">
                          ฿{formatPrice(tour.price)}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {bookingStep === 2 && (
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-xl font-bold">ข้อมูลผู้เดินทาง</h3>
                    <div className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">ขั้นที่ 2/3</div>
                  </div>
                  <button onClick={() => setShowBookingModal(false)}>
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">จำนวนผู้เดินทาง</label>
                    <select 
                      value={bookingData.guests}
                      onChange={(e) => setBookingData({...bookingData, guests: parseInt(e.target.value)})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    >
                      {[1,2,3,4,5].map(num => (
                        <option key={num} value={num}>{num} คน</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium mb-2">ชื่อ</label>
                      <input
                        type="text"
                        value={bookingData.firstName}
                        onChange={(e) => setBookingData({...bookingData, firstName: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="ชื่อ"
                        autoFocus
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">นามสกุล</label>
                      <input
                        type="text"
                        value={bookingData.lastName}
                        onChange={(e) => setBookingData({...bookingData, lastName: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        placeholder="นามสกุล"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">อีเมล</label>
                    <input
                      type="email"
                      value={bookingData.email}
                      onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      placeholder="อีเมล"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">เบอร์โทรศัพท์</label>
                    <input
                      type="tel"
                      value={bookingData.phone}
                      onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      placeholder="เบอร์โทรศัพท์"
                    />
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => setBookingStep(1)}
                    className="flex-1 border border-gray-300 py-3 rounded-xl font-medium"
                  >
                    กลับ
                  </button>
                  <button
                    onClick={() => setBookingStep(3)}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold"
                  >
                    ถัดไป
                  </button>
                </div>
              </div>
            )}

            {bookingStep === 3 && (
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-xl font-bold">ยืนยันการจอง</h3>
                    <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">ขั้นที่ 3/3</div>
                  </div>
                  <button onClick={() => setShowBookingModal(false)}>
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="font-medium mb-2">{tour.title}</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>วันเดินทาง: {selectedDate}</div>
                      <div>จำนวนผู้เดินทาง: {bookingData.guests} คน</div>
                      <div>ชื่อ-นามสกุล: {bookingData.firstName} {bookingData.lastName}</div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between mb-2">
                      <span>ราคาทัวร์ ({bookingData.guests} คน)</span>
                      <span>฿{formatPrice(tour.price * bookingData.guests)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg">
                      <span>ราคารวม</span>
                      <span className="text-blue-600">฿{formatPrice(tour.price * bookingData.guests)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => setBookingStep(2)}
                    className="flex-1 border border-gray-300 py-3 rounded-xl font-medium"
                  >
                    กลับ
                  </button>
                  <button
                    onClick={(e) => {
                      const btn = e.currentTarget
                      btn.innerHTML = '<div class="flex items-center justify-center space-x-2"><div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div><span>กำลังดำเนินการ...</span></div>'
                      btn.disabled = true
                      
                      setTimeout(() => {
                        alert('ขอบคุณสำหรับการจอง! ทางเราจะติดต่อกลับภายใน 24 ชั่วโมง')
                        setShowBookingModal(false)
                        setBookingStep(1)
                      }, 2000)
                    }}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold flex items-center justify-center space-x-2 transition-colors"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>ยืนยันจอง</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Gallery Modal */}
      {showGallery && tour.gallery && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl w-full">
            <button 
              onClick={() => setShowGallery(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 bg-black/50 p-2 rounded-full z-10"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="relative aspect-video">
              <Image 
                src={tour.gallery[activeImageIndex]} 
                alt={`Gallery ${activeImageIndex + 1}`} 
                fill 
                className="object-contain" 
              />
            </div>
            
            <div className="flex justify-center mt-4 space-x-2">
              {tour.gallery.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === activeImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  )
}