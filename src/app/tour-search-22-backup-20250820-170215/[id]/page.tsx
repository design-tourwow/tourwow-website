'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { ArrowLeft, Star, Heart, Clock, MapPin, Shield, Share2, Check, X, ChevronDown, ChevronUp, Users, Calendar, Phone, Eye, Zap, Flame, Timer, TrendingUp, Award, ThumbsUp, CheckCircle, MessageCircle, Camera } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface TourData {
  id: string
  slug: string
  title: string
  country: string
  cities: string[]
  duration_days: number
  nights: number
  price_from: number
  badges: string[]
  rating: number
  reviews_count: number
  hero_images: string[]
  highlights: string[]
  gallery?: string[]
  itinerary?: Array<{
    day: number
    title: string
    details: string[]
  }>
  departures: Array<{
    id: string
    start_date: string
    end_date: string
    date_label: string
    price: number
    seats_left: number
    status: 'available' | 'low' | 'soldout'
  }>
  addons: Array<{
    code: string
    label: string
    price: number
  }>
  related?: Array<{
    id: string
    title: string
    price_from: number
    thumb: string
  }>
  included: string[]
  excluded: string[]
  policies: {
    deposit: number
    cancellation: string
    payment_options: string[]
  }
  faqs: Array<{
    q: string
    a: string
  }>
}

export default function TourDetailPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const tourId = params.id as string
  const source = searchParams.get('src')

  const [tour, setTour] = useState<TourData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedDeparture, setSelectedDeparture] = useState<any>(null)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)
  const [selectedAddons, setSelectedAddons] = useState<string[]>([])
  const [showGallery, setShowGallery] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [flashSaleTimer, setFlashSaleTimer] = useState(3600) // 1 hour in seconds
  const [showTrustModal, setShowTrustModal] = useState(false)

  useEffect(() => {
    if (source !== 'search24') {
      console.warn('Direct access detected - missing src=search24 parameter')
    }
  }, [source])

  // Flash sale timer
  useEffect(() => {
    if (flashSaleTimer > 0) {
      const timer = setTimeout(() => {
        setFlashSaleTimer(flashSaleTimer - 1)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [flashSaleTimer])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  useEffect(() => {
    const loadTour = async () => {
      try {
        const response = await fetch(`/data/tours/${tourId}.json`)
        if (!response.ok) {
          throw new Error('Tour not found')
        }
        const tourData = await response.json()
        setTour(tourData)
        
        const firstAvailable = tourData.departures.find((d: any) => d.status !== 'soldout')
        if (firstAvailable) {
          setSelectedDeparture(firstAvailable)
        }
      } catch (error) {
        console.error('Error loading tour:', error)
        setTour(null)
      } finally {
        setLoading(false)
      }
    }

    if (tourId) {
      loadTour()
    }
  }, [tourId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">ไม่พบทัวร์ที่ต้องการ</h1>
          <Link href="/tour-search-22" className="text-blue-600 hover:underline">
            กลับไปหน้าค้นหา
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/tour-search-22" 
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 text-sm sm:text-base transition-colors"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">กลับไปค้นหา</span>
              <span className="sm:hidden">กลับ</span>
            </Link>
            <div className="flex items-center space-x-1 sm:space-x-2">
              {/* Trust Badges */}
              <div className="hidden sm:flex items-center space-x-2 mr-2">
                <div className="flex items-center space-x-1 bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs">
                  <Shield className="w-3 h-3" />
                  <span>ปลอดภัย</span>
                </div>
                <div className="flex items-center space-x-1 bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs">
                  <Award className="w-3 h-3" />
                  <span>รับรอง</span>
                </div>
              </div>
              <a href="tel:+66123456789" className="flex items-center space-x-1 bg-green-500 text-white px-2 sm:px-3 py-1.5 rounded-full text-sm font-medium hover:bg-green-600 transition-colors">
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">โทรสอบถาม</span>
              </a>
              <button className="p-2 text-gray-600 hover:text-red-600 transition-colors">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Hero Section - Mobile First */}
      <div className="relative h-72 sm:h-80 lg:h-96 overflow-hidden">
        <Image
          src={tour.hero_images[0]}
          alt={tour.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {tour.badges.map((badge) => (
            <span
              key={badge}
              className="px-2 sm:px-3 py-1 bg-red-500 text-white text-xs sm:text-sm font-medium rounded-full flex items-center space-x-1 shadow-lg"
            >
              <Flame className="w-3 h-3" />
              <span>{badge}</span>
            </span>
          ))}
          {selectedDeparture?.seats_left && selectedDeparture.seats_left < 10 && (
            <span className="px-2 sm:px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs sm:text-sm font-medium rounded-full flex items-center space-x-1 animate-pulse shadow-lg">
              <Timer className="w-3 h-3" />
              <span>เหลือ {selectedDeparture.seats_left} ที่!</span>
            </span>
          )}
          {flashSaleTimer > 0 && (
            <span className="px-2 sm:px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs sm:text-sm font-bold rounded-full flex items-center space-x-1 animate-bounce shadow-lg">
              <Zap className="w-3 h-3" />
              <span>Flash Sale {formatTime(flashSaleTimer)}</span>
            </span>
          )}
        </div>

        {tour.gallery && tour.gallery.length > 1 && (
          <button 
            onClick={() => setShowGallery(true)}
            className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1.5 rounded-lg text-sm flex items-center space-x-1 hover:bg-black/70"
          >
            <Eye className="w-4 h-4" />
            <span>{tour.gallery.length} รูป</span>
          </button>
        )}

        <div className="absolute bottom-4 sm:bottom-6 left-4 right-4 text-white">
          <div className="mb-3">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 leading-tight drop-shadow-lg">{tour.title}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 text-sm">
              <div className="flex items-center space-x-2 bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-sm">
                <MapPin className="w-4 h-4 text-blue-300" />
                <span className="font-medium">{tour.cities.slice(0, 2).join(', ')}{tour.cities.length > 2 ? '...' : ''}</span>
              </div>
              <div className="flex items-center space-x-2 bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-sm">
                <Clock className="w-4 h-4 text-green-300" />
                <span className="font-medium">{tour.duration_days}วัน {tour.nights}คืน</span>
              </div>
              <div className="flex items-center space-x-2 bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-sm">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{tour.rating} ({tour.reviews_count} รีวิว)</span>
              </div>
            </div>
          </div>
          
          {/* Mobile Quick CTA */}
          <div className="sm:hidden mt-4">
            <button
              onClick={() => setShowBookingModal(true)}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-bold shadow-lg flex items-center justify-center space-x-2"
            >
              <Calendar className="w-5 h-5" />
              <span>จองเลย เริ่ม ฿{tour.price_from.toLocaleString()}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Flash Sale Banner - Mobile First */}
      {flashSaleTimer > 0 && (
        <div className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 text-white py-4 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Zap className="w-5 h-5 animate-pulse" />
              <span className="font-bold text-lg">ลดพิเศษ FLASH SALE!</span>
            </div>
            <div className="text-sm opacity-90 mb-2">จองภายใน {formatTime(flashSaleTimer)} ได้รับส่วนลดพิเศษ 15%</div>
            <div className="text-xs opacity-75">เงื่อนไขในราคานี้เท่านั้น!</div>
          </div>
        </div>
      )}

      {/* Social Proof Bar */}
      <div className="bg-green-50 border border-green-200 py-3 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-1 text-green-700">
              <ThumbsUp className="w-4 h-4" />
              <span className="font-medium">{tour.reviews_count}+ คนจองทัวรนี้แล้ว</span>
            </div>
            <div className="flex items-center space-x-4 text-green-600">
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-3 h-3" />
                <span>ผู้ให้บริการมืออาชีพ</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span>{tour.rating}/5</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Highlights with enhanced visual appeal */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="w-6 h-6 text-blue-500" />
                <h2 className="text-xl font-bold">ไฮไลท์ของทริป</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {tour.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-green-50 transition-colors">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700 font-medium">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Tabs with icons */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="border-b overflow-x-auto">
                <nav className="flex space-x-2 sm:space-x-4 px-4 sm:px-6 min-w-max">
                  {[
                    { key: 'overview', label: 'ภาพรวม', icon: Eye },
                    { key: 'itinerary', label: 'รายการ', icon: MapPin },
                    { key: 'included', label: 'รวม/ไม่รวม', icon: CheckCircle },
                    { key: 'addons', label: 'เสริม', icon: Star },
                    { key: 'policies', label: 'เงื่อนไข', icon: Shield }
                  ].map((tab) => {
                    const IconComponent = tab.icon
                    return (
                      <button
                        key={tab.key}
                        className={`py-3 px-2 sm:px-3 border-b-2 transition-all duration-200 text-xs sm:text-sm whitespace-nowrap flex items-center space-x-1 ${
                          activeTab === tab.key
                            ? 'border-blue-500 text-blue-600 bg-blue-50'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                        }`}
                        onClick={() => setActiveTab(tab.key)}
                      >
                        <IconComponent className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{tab.label}</span>
                      </button>
                    )
                  })}
                </nav>
              </div>

              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-4">
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                      {tour.title} เป็นทัวร์คุณภาพที่จะพาคุณไปสัมผัสประสบการณ์ที่น่าจดจำ
                      ด้วยการบริการที่เป็นเลิศและไกด์มืออาชีพ พร้อมสิ่งอำนวยความสะดวกครบครัน
                    </p>
                    {tour.gallery && tour.gallery.length > 0 && (
                      <div>
                        <h3 className="font-semibold mb-3">แกลเลอรี่</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {tour.gallery.slice(0, 6).map((image, index) => (
                            <div key={index} className="relative aspect-square rounded-lg overflow-hidden cursor-pointer" onClick={() => { setCurrentImageIndex(index); setShowGallery(true); }}>
                              <Image src={image} alt={`Gallery ${index + 1}`} fill className="object-cover hover:scale-105 transition-transform" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'itinerary' && (
                  <div className="space-y-4">
                    {tour.itinerary ? (
                      <div className="space-y-4">
                        {tour.itinerary.map((day, index) => (
                          <div key={index} className="border-l-4 border-blue-500 pl-4">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">{day.day}</span>
                              <h3 className="font-semibold text-sm sm:text-base">{day.title}</h3>
                            </div>
                            <ul className="space-y-1 text-sm text-gray-600">
                              {day.details.map((detail, idx) => (
                                <li key={idx} className="flex items-start space-x-2">
                                  <Check className="w-3 h-3 mt-1 text-green-500 flex-shrink-0" />
                                  <span>{detail}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-8">รายละเอียดโปรแกรมจะแจ้งให้ทราบเร็วๆ นี้</p>
                    )}
                  </div>
                )}

                {activeTab === 'included' && (
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-semibold text-lg mb-3 text-green-600">ราคารวม</h3>
                      <ul className="space-y-2">
                        {tour.included.map((item, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-3 text-red-600">ราคาไม่รวม</h3>
                      <ul className="space-y-2">
                        {tour.excluded.map((item, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <X className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'addons' && (
                  <div className="space-y-4">
                    <h3 className="font-semibold mb-3">บริการเสริม (ตัวเลือก)</h3>
                    <div className="space-y-3">
                      {tour.addons.map((addon) => (
                        <div key={addon.code} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                          <div className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              id={addon.code}
                              checked={selectedAddons.includes(addon.code)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedAddons([...selectedAddons, addon.code])
                                } else {
                                  setSelectedAddons(selectedAddons.filter(code => code !== addon.code))
                                }
                              }}
                              className="w-4 h-4 text-blue-600"
                            />
                            <label htmlFor={addon.code} className="text-sm sm:text-base cursor-pointer">
                              {addon.label}
                            </label>
                          </div>
                          <span className="font-semibold text-blue-600">+฿{addon.price.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                    {selectedAddons.length > 0 && (
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="font-semibold text-blue-800 mb-1">รายการเสริมที่เลือก:</div>
                        <div className="text-sm text-blue-700">
                          รวมค่าบริการเสริม: ฿{tour.addons.filter(addon => selectedAddons.includes(addon.code)).reduce((sum, addon) => sum + addon.price, 0).toLocaleString()}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'policies' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold mb-2 text-sm sm:text-base">เงินมัดจำ</h3>
                        <p className="text-gray-700 text-sm sm:text-base">฿{tour.policies.deposit.toLocaleString()} ต่อท่าน</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold mb-2 text-sm sm:text-base">การยกเลิก</h3>
                        <p className="text-gray-700 text-xs sm:text-sm">{tour.policies.cancellation}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-sm sm:text-base">วิธีชำระเงิน</h3>
                      <div className="flex flex-wrap gap-2">
                        {tour.policies.payment_options.map((option, index) => (
                          <span key={index} className="px-2 sm:px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs sm:text-sm">
                            {option}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced FAQ Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
              <div className="flex items-center space-x-2 mb-4">
                <MessageCircle className="w-5 h-5 text-orange-500" />
                <h2 className="text-lg sm:text-xl font-bold">คำถามที่พบบ่อย</h2>
                <div className="ml-auto text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                  ตอบได้ทั้งหมด
                </div>
              </div>
              <div className="space-y-2 sm:space-y-3">
                {tour.faqs.map((faq, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl hover:shadow-sm transition-all duration-200">
                    <button
                      className="w-full px-4 py-4 text-left flex justify-between items-center hover:bg-gray-50 rounded-xl transition-colors"
                      onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                    >
                      <span className="font-semibold text-sm sm:text-base pr-3 text-gray-800">{faq.q}</span>
                      <div className={`flex-shrink-0 p-1 rounded-full transition-all duration-200 ${
                        expandedFAQ === index ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {expandedFAQ === index ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </div>
                    </button>
                    {expandedFAQ === index && (
                      <div className="px-4 pb-4 text-gray-600 text-sm sm:text-base leading-relaxed border-t border-gray-100 pt-3 mt-1">
                        <div className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{faq.a}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Related Tours with better upselling */}
            {tour.related && tour.related.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg sm:text-xl font-bold flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-orange-500" />
                    <span>ทัวร์ยอดนิยม</span>
                  </h2>
                  <div className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-medium">
                    จองคู่ ลด 20%
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {tour.related.map((related, index) => (
                    <Link key={related.id} href={`/tour-search-22/${related.id}?src=search24`} className="block border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-white to-gray-50">
                      <div className="relative aspect-video">
                        <Image src={related.thumb} alt={related.title} fill className="object-cover" />
                        {index === 0 && (
                          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold flex items-center space-x-1">
                            <Flame className="w-3 h-3" />
                            <span>HOT</span>
                          </div>
                        )}
                        <div className="absolute bottom-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                          ลด 15%
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-sm mb-2 line-clamp-2 text-gray-800">{related.title}</h3>
                        <div className="flex items-center justify-between">
                          <div className="text-blue-600 font-bold text-sm">
                            เริ่มต้น ฿{related.price_from.toLocaleString()}
                          </div>
                          <div className="flex items-center space-x-1 text-xs text-yellow-600">
                            <Star className="w-3 h-3 fill-yellow-400" />
                            <span>4.8</span>
                          </div>
                        </div>
                        <div className="mt-2 text-xs text-gray-500 flex items-center space-x-1">
                          <Users className="w-3 h-3" />
                          <span>124 คนจองแล้ว</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full text-sm font-medium hover:shadow-lg transition-all duration-300">
                    ดูทัวร์ทั้งหมด →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 sm:p-6 sticky top-24">
              {/* Trust Indicators */}
              <div className="flex items-center justify-center space-x-4 mb-4 p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                <div className="flex items-center space-x-1 text-green-600 text-xs">
                  <Shield className="w-3 h-3" />
                  <span>ปลอดภัย 100%</span>
                </div>
                <div className="flex items-center space-x-1 text-blue-600 text-xs">
                  <Award className="w-3 h-3" />
                  <span>รับรองรางวัล</span>
                </div>
                <div className="flex items-center space-x-1 text-purple-600 text-xs">
                  <MessageCircle className="w-3 h-3" />
                  <span>24/7 ซัพพอร์ต</span>
                </div>
              </div>
              <div className="mb-4 sm:mb-6">
                <div className="text-xl sm:text-2xl font-bold text-blue-600">
                  ฿{tour.price_from.toLocaleString()}
                  <span className="text-base sm:text-lg text-gray-500 font-normal"> /ท่าน</span>
                </div>
                {selectedAddons.length > 0 && (
                  <div className="text-sm text-gray-600 mt-1">
                    + ฿{tour.addons.filter(addon => selectedAddons.includes(addon.code)).reduce((sum, addon) => sum + addon.price, 0).toLocaleString()} บริการเสริม
                  </div>
                )}
              </div>

              {/* Departure Selection */}
              <div className="mb-4 sm:mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-sm sm:text-base">เลือกรอบการเดินทาง</h3>
                  <div className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-bold animate-pulse">
                    จำกัด!
                  </div>
                </div>
                <div className="space-y-2 max-h-48 sm:max-h-64 overflow-y-auto">
                  {tour.departures.slice(0, 4).map((departure) => (
                    <div 
                      key={departure.id} 
                      className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                        selectedDeparture?.id === departure.id 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedDeparture(departure)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium text-xs sm:text-sm">{departure.date_label}</div>
                          <div className={`text-xs flex items-center space-x-1 ${
                            departure.seats_left < 5 ? 'text-red-500' : 'text-gray-500'
                          }`}>
                            <Users className="w-3 h-3" />
                            <span>เหลือ {departure.seats_left} ที่</span>
                          </div>
                        </div>
                        <div className="text-sm sm:text-lg font-bold text-blue-600">
                          ฿{departure.price.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {tour.departures.length > 4 && (
                  <button className="w-full text-center text-sm text-blue-600 mt-2 hover:underline">
                    ดูรอบเดินทางทั้งหมด ({tour.departures.length} รอบ)
                  </button>
                )}
              </div>

              {/* Enhanced Urgency Banner */}
              {selectedDeparture?.seats_left && selectedDeparture.seats_left < 10 && (
                <div className="bg-gradient-to-r from-red-500 via-pink-500 to-orange-500 text-white p-4 rounded-xl mb-4 text-center shadow-lg animate-pulse">
                  <div className="flex items-center justify-center space-x-2 text-sm font-bold mb-1">
                    <Zap className="w-5 h-5 animate-bounce" />
                    <span>เหลือเพียง {selectedDeparture.seats_left} ที่นั่ง!</span>
                  </div>
                  <div className="text-xs opacity-90 mb-2">จองเลยวันนี้ เพื่อไม่พลาดโอกาส</div>
                  <div className="text-xs bg-white/20 rounded-full py-1 px-3 inline-block">
                    มี 47 คนกำลังดูอยู่ตอนนี้
                  </div>
                </div>
              )}

              {/* Social Proof in Sidebar */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 text-blue-700 text-sm font-medium mb-1">
                    <Camera className="w-4 h-4" />
                    <span>รีวิวจริงจากลูกค้า</span>
                  </div>
                  <div className="text-xs text-blue-600">
                    "ประทับใจมากค่ะ ไกด์เก่งมาก บริการดี 10/10"
                  </div>
                  <div className="text-xs text-gray-500 mt-1">- คุณสมใจ (จองเมื่อ 2 ชั่วโมงที่แล้ว)</div>
                </div>
              </div>

              {/* Enhanced CTAs */}
              <div className="space-y-3">
                <button
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold hover:shadow-xl transition-all duration-300 text-sm sm:text-base flex items-center justify-center space-x-2 transform hover:scale-105"
                  onClick={() => setShowBookingModal(true)}
                >
                  <Calendar className="w-5 h-5" />
                  <span>จองทัวร์นี้</span>
                  {flashSaleTimer > 0 && (
                    <span className="bg-white/20 px-2 py-1 rounded-full text-xs animate-pulse">
                      -15%
                    </span>
                  )}
                </button>
                
                <div className="grid grid-cols-2 gap-2">
                  <a href="tel:+66123456789" className="flex items-center justify-center space-x-1 bg-green-500 text-white py-3 rounded-xl text-sm font-medium hover:bg-green-600 transition-all duration-300 hover:scale-105 shadow-md">
                    <Phone className="w-4 h-4" />
                    <span>โทรสอบถาม</span>
                  </a>
                  <a href="https://line.me/ti/p/~@tourwow" className="flex items-center justify-center space-x-1 bg-gradient-to-r from-green-400 to-green-500 text-white py-3 rounded-xl text-sm font-medium hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <span>💬</span>
                    <span>Line Chat</span>
                  </a>
                </div>
                
                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t">
                  <button className="flex items-center justify-center space-x-1 border border-orange-300 text-orange-600 py-2 rounded-lg text-xs hover:bg-orange-50 transition-colors">
                    <Heart className="w-3 h-3" />
                    <span>บันทึกไว้</span>
                  </button>
                  <button className="flex items-center justify-center space-x-1 border border-blue-300 text-blue-600 py-2 rounded-lg text-xs hover:bg-blue-50 transition-colors">
                    <Share2 className="w-3 h-3" />
                    <span>แชร์</span>
                  </button>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-gray-500 bg-gray-50 py-2 px-3 rounded-lg">
                <Shield className="w-4 h-4 text-green-500" />
                <span className="font-medium">การจองปลอดภัย ได้รับการรับรอง</span>
              </div>
              
              {/* View Counter */}
              <div className="mt-3 text-center text-xs text-gray-400">
                มี 247 คนกำลังดูหน้านี้อยู่
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Gallery Modal with Mobile First */}
      {showGallery && tour.gallery && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="relative max-w-4xl w-full max-h-full">
            {/* Header with controls */}
            <div className="absolute top-2 sm:top-4 left-0 right-0 flex justify-between items-center z-10 px-4">
              <div className="text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-full">
                {currentImageIndex + 1} / {tour.gallery.length}
              </div>
              <button 
                onClick={() => setShowGallery(false)}
                className="text-white hover:text-gray-300 bg-black/50 p-2 rounded-full transition-colors"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
            
            {/* Navigation arrows */}
            {tour.gallery.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentImageIndex(currentImageIndex > 0 ? currentImageIndex - 1 : tour.gallery.length - 1)}
                  className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 p-2 sm:p-3 rounded-full hover:bg-black/70 transition-colors z-10"
                >
                  <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6 rotate-[-90deg]" />
                </button>
                <button
                  onClick={() => setCurrentImageIndex(currentImageIndex < tour.gallery.length - 1 ? currentImageIndex + 1 : 0)}
                  className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 p-2 sm:p-3 rounded-full hover:bg-black/70 transition-colors z-10"
                >
                  <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6 rotate-90" />
                </button>
              </>
            )}
            
            <div className="relative aspect-video sm:aspect-[4/3]">
              <Image 
                src={tour.gallery[currentImageIndex]} 
                alt={`Gallery ${currentImageIndex + 1}`} 
                fill 
                className="object-contain" 
              />
            </div>
            
            {/* Thumbnails for desktop, dots for mobile */}
            <div className="flex justify-center mt-4 space-x-2 max-h-16 overflow-x-auto">
              {tour.gallery.length <= 10 ? (
                // Show thumbnails for smaller galleries
                tour.gallery.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 relative rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentImageIndex ? 'border-white scale-110' : 'border-white/30 hover:border-white/60'
                    }`}
                  >
                    <Image src={image} alt={`Thumb ${index + 1}`} fill className="object-cover" />
                  </button>
                ))
              ) : (
                // Show dots for larger galleries
                tour.gallery.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Trust Modal */}
      {showTrustModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-bold mb-2">การรับรองความปลอดภัย</h3>
              <div className="text-sm text-gray-600 space-y-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>ผู้ให้บริการมืออาชีพมากกว่า 15 ปี</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>รับประกันจากกระทรวงการท่องเที่ยว</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>ลูกค้ากว่า 50,000+ คนแล้ว</span>
                </div>
              </div>
              <button
                onClick={() => setShowTrustModal(false)}
                className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                เข้าใจแล้ว
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Booking Modal with Mobile First design */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/60 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl max-w-md w-full p-4 sm:p-6 max-h-[95vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-800">ยืนยันการจอง</h3>
                <div className="text-sm text-green-600 flex items-center space-x-1 mt-1">
                  <CheckCircle className="w-3 h-3" />
                  <span>จองได้ภายใน 30 วินาที</span>
                </div>
              </div>
              <button 
                onClick={() => setShowBookingModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <div className="font-medium text-sm sm:text-base">{tour.title}</div>
                <div className="text-sm text-gray-500">
                  {selectedDeparture?.date_label}
                </div>
              </div>
              
              {selectedAddons.length > 0 && (
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">บริการเสริม:</h4>
                  {tour.addons.filter(addon => selectedAddons.includes(addon.code)).map(addon => (
                    <div key={addon.code} className="flex justify-between text-sm">
                      <span>{addon.label}</span>
                      <span>฿{addon.price.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="border-t pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>ราคาทัวร์</span>
                    <span>฿{(selectedDeparture?.price || tour.price_from).toLocaleString()}</span>
                  </div>
                  {selectedAddons.length > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>บริการเสริม</span>
                      <span>฿{tour.addons.filter(addon => selectedAddons.includes(addon.code)).reduce((sum, addon) => sum + addon.price, 0).toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>ราคารวม</span>
                    <span className="text-blue-600">
                      ฿{((selectedDeparture?.price || tour.price_from) + tour.addons.filter(addon => selectedAddons.includes(addon.code)).reduce((sum, addon) => sum + addon.price, 0)).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {/* Urgency reminder in modal */}
              {selectedDeparture?.seats_left && selectedDeparture.seats_left < 10 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center">
                  <div className="text-red-600 text-sm font-medium flex items-center justify-center space-x-1">
                    <Timer className="w-4 h-4" />
                    <span>เหลือเพียง {selectedDeparture.seats_left} ที่นั่ง!</span>
                  </div>
                  <div className="text-xs text-red-500 mt-1">มีคนอื่นกำลังมองอยู่</div>
                </div>
              )}
              
              <button
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl hover:shadow-xl font-bold transition-all duration-300 flex items-center justify-center space-x-2"
                onClick={() => {
                  alert('ระบบจองจะพร้อมใช้งานเร็วๆ นี้')
                  setShowBookingModal(false)
                }}
              >
                <Calendar className="w-5 h-5" />
                <span>ยืนยันจองทัวร์</span>
                {flashSaleTimer > 0 && (
                  <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                    -15%
                  </span>
                )}
              </button>
              
              <div className="grid grid-cols-2 gap-2">
                <a href="tel:+66123456789" className="flex items-center justify-center space-x-1 border-2 border-green-500 text-green-600 py-3 rounded-xl text-sm hover:bg-green-50 transition-all duration-300 font-medium">
                  <Phone className="w-4 h-4" />
                  <span>โทรสอบถาม</span>
                </a>
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="border-2 border-gray-300 text-gray-600 py-3 rounded-xl hover:bg-gray-50 text-sm transition-all duration-300 font-medium"
                >
                  ยกเลิก
                </button>
              </div>
              
              {/* Trust elements in modal */}
              <div className="bg-blue-50 rounded-lg p-3 text-center">
                <div className="text-blue-700 text-sm font-medium mb-1">รับประกัน:</div>
                <div className="flex items-center justify-center space-x-4 text-xs text-blue-600">
                  <div className="flex items-center space-x-1">
                    <Shield className="w-3 h-3" />
                    <span>คืนเงิน 100%</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="w-3 h-3" />
                    <span>ยกเลิกฟรี</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Award className="w-3 h-3" />
                    <span>24/7 ซัพพอร์ต</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}