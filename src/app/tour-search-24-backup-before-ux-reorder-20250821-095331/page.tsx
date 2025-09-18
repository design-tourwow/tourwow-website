'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Search, Filter, Star, MapPin, Clock, Users, Calendar,
  Flame, TrendingUp, Heart, Eye, Zap, ArrowRight,
  ChevronDown, Shield, Award, Phone
} from 'lucide-react'

// Tour data with enhanced structure for tour-search-24
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
    highlights: ['ชมซากุระ', 'วัดเก่าแก่', 'รถไฟชินคันเซน', 'ฟูจิซัง'],
    available: true,
    availableSeats: 8,
    flashSale: true,
    trendingBadge: 'HOT',
    lastBooking: '5 นาทีที่แล้ว',
    bookingCount: 234
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
    highlights: ['K-Pop Culture', 'ตลาดมยองดง', 'ซากุราฤดูใบไผ่', 'จีจูไอส์แลนด์'],
    available: true,
    availableSeats: 12,
    flashSale: false,
    trendingBadge: 'TRENDING',
    lastBooking: '12 นาทีที่แล้ว',
    bookingCount: 167
  },
  {
    id: 'tour-tw-003',
    title: 'ทัวร์ไต้หวัน ไทเป อาลีซาน ซากุระปรวน',
    destination: 'ไต้หวัน',
    duration: '4 วัน 3 คืน', 
    price: 19900,
    rating: 4.6,
    reviewCount: 234,
    image: 'https://images.unsplash.com/photo-1508248467877-aec1b08de376?w=800&h=600&fit=crop',
    highlights: ['ตลาดกลางคืน', 'น้ำพุร้อน', 'รถไฟป่าอาลีซาน', 'ทะเลสาบสุริยันจันทรา'],
    available: true,
    availableSeats: 3,
    flashSale: true,
    trendingBadge: 'LAST CHANCE',
    lastBooking: '1 นาทีที่แล้ว',
    bookingCount: 445
  },
  {
    id: 'tour-eu-006',
    title: 'ทัวร์ยุโรป อิตาลี สวิตเซอร์แลนด์ ฝรั่งเศส',
    destination: 'ยุโรป',
    duration: '10 วัน 8 คืน',
    price: 89900,
    originalPrice: 99900,
    rating: 4.9,
    reviewCount: 78,
    image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&h=600&fit=crop',
    highlights: ['หอไอเฟล', 'โคลอสเซียม', 'ยอดเขาจุงเฟรา', 'เวนิส'],
    available: true,
    availableSeats: 5,
    flashSale: false,
    trendingBadge: 'PREMIUM',
    lastBooking: '23 นาทีที่แล้ว',
    bookingCount: 89
  },
  {
    id: 'tour-dubai-007',
    title: 'ทัวร์ดูไบ อาบูดาบี สุดหรูแห่งตะวันออกกลาง',
    destination: 'ดูไบ',
    duration: '6 วัน 4 คืน',
    price: 42900,
    rating: 4.7,
    reviewCount: 145,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop',
    highlights: ['บุรจญ์คาลิฟา', 'ทะเลทราย', 'ช้อปปิ้งมอลล์', 'เฟรมดูไบ'],
    available: true,
    availableSeats: 10,
    flashSale: true,
    trendingBadge: 'NEW',
    lastBooking: '8 นาทีที่แล้ว',
    bookingCount: 203
  }
]

export default function TourSearch24() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilter, setShowFilter] = useState(false)
  const [selectedDestination, setSelectedDestination] = useState('ทั้งหมด')
  const [sortBy, setSortBy] = useState('ยอดนิยม')
  const [viewingUsers, setViewingUsers] = useState(127)
  const [recentBookings, setRecentBookings] = useState<Array<{tour: string, name: string, time: string}>>([])

  // Live updates simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setViewingUsers(prev => Math.max(80, Math.min(200, prev + Math.floor(Math.random() * 10) - 5)))
      
      // Simulate recent bookings
      const names = ['คุณสมใจ', 'คุณมาลี', 'คุณวิชัย', 'คุณสุดา', 'คุณณรงค์']
      const randomName = names[Math.floor(Math.random() * names.length)]
      const randomTour = tourData[Math.floor(Math.random() * tourData.length)]
      
      setRecentBookings(prev => [
        { tour: randomTour.destination, name: randomName, time: 'เมื่อสักครู่' },
        ...prev.slice(0, 2)
      ])
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('th-TH').format(price)
  }

  const destinations = ['ทั้งหมด', 'ญี่ปุ่น', 'เกาหลีใต้', 'ไต้หวัน', 'ยุโรป', 'ดูไบ']
  const sortOptions = ['ยอดนิยม', 'ราคาต่ำ-สูง', 'ราคาสูง-ต่ำ', 'คะแนนสูงสุด']

  const filteredTours = tourData
    .filter(tour => 
      selectedDestination === 'ทั้งหมด' || tour.destination === selectedDestination
    )
    .filter(tour =>
      searchQuery === '' || tour.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'ราคาต่ำ-สูง':
          return a.price - b.price
        case 'ราคาสูง-ต่ำ':
          return b.price - a.price
        case 'คะแนนสูงสุด':
          return b.rating - a.rating
        default:
          return b.bookingCount - a.bookingCount
      }
    })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Enhanced Header with Trust Signals */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                ทัวร์ต่างประเทศ
                <span className="text-blue-600"> Premium</span>
              </h1>
              <p className="text-sm text-gray-600">ค้นหาทัวร์ในฝันของคุณ</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="hidden sm:flex items-center space-x-4 text-xs">
                <div className="flex items-center space-x-1 bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  <Shield className="w-3 h-3" />
                  <span>รับประกัน</span>
                </div>
                <div className="flex items-center space-x-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                  <Award className="w-3 h-3" />
                  <span>รางวัลดีเยี่ยม</span>
                </div>
              </div>
              <a href="tel:+66123456789" className="flex items-center space-x-1 bg-green-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors">
                <Phone className="w-4 h-4" />
                <span>โทรสอบถาม</span>
              </a>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="ค้นหาประเทศ, เมือง, หรือกิจกรรม..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center space-x-3 overflow-x-auto scrollbar-hide pb-2">
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors whitespace-nowrap"
            >
              <Filter className="w-4 h-4" />
              <span>ตัวกรอง</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilter ? 'rotate-180' : ''}`} />
            </button>

            <div className="flex space-x-2 overflow-x-auto">
              {destinations.map(dest => (
                <button
                  key={dest}
                  onClick={() => setSelectedDestination(dest)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedDestination === dest
                      ? 'bg-blue-100 text-blue-700 border border-blue-300'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {dest}
                </button>
              ))}
            </div>
          </div>

          {/* Filter Panel */}
          {showFilter && (
            <div className="mt-4 bg-gray-50 rounded-xl p-4 border border-gray-200">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">เรียงตาม</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                  >
                    {sortOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ช่วงราคา</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500">
                    <option>ทั้งหมด</option>
                    <option>น้อยกว่า 30,000</option>
                    <option>30,000 - 50,000</option>
                    <option>50,000 - 80,000</option>
                    <option>มากกว่า 80,000</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">จำนวนวัน</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500">
                    <option>ทั้งหมด</option>
                    <option>3-5 วัน</option>
                    <option>6-8 วัน</option>
                    <option>9+ วัน</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Live Activity Bar */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-4 rounded-xl mb-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <Eye className="w-5 h-5" />
                <span className="font-medium">{viewingUsers} คน กำลังดูอยู่</span>
              </div>
              <div className="hidden sm:block h-4 w-px bg-white/30"></div>
              <div className="hidden sm:flex items-center space-x-2">
                <Zap className="w-4 h-4" />
                <span className="text-sm">Flash Sale วันนี้เท่านั้น!</span>
              </div>
            </div>
            <div className="text-sm opacity-90">
              {recentBookings.length > 0 && `${recentBookings[0].name} จอง${recentBookings[0].tour} ${recentBookings[0].time}`}
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              พบ {filteredTours.length} ทัวร์
              {selectedDestination !== 'ทั้งหมด' && (
                <span className="text-blue-600"> ใน{selectedDestination}</span>
              )}
            </h2>
            <p className="text-sm text-gray-600 mt-1">เลือกทัวร์ที่ใช่สำหรับคุณ</p>
          </div>
          <div className="text-sm text-gray-500">
            อัปเดตล่าสุด: เมื่อสักครู่
          </div>
        </div>

        {/* Tour Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTours.map((tour) => (
            <div key={tour.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              {/* Image Section */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={tour.image}
                  alt={tour.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col space-y-2">
                  {tour.flashSale && (
                    <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-1 shadow-lg animate-pulse">
                      <Flame className="w-3 h-3" />
                      <span>FLASH SALE</span>
                    </span>
                  )}
                  <span className={`px-2 py-1 rounded-full text-xs font-bold text-white shadow-lg ${
                    tour.trendingBadge === 'HOT' ? 'bg-red-500' :
                    tour.trendingBadge === 'TRENDING' ? 'bg-orange-500' :
                    tour.trendingBadge === 'NEW' ? 'bg-green-500' :
                    tour.trendingBadge === 'LAST CHANCE' ? 'bg-purple-500' :
                    'bg-blue-500'
                  } flex items-center space-x-1`}>
                    <TrendingUp className="w-3 h-3" />
                    <span>{tour.trendingBadge}</span>
                  </span>
                </div>

                {/* Heart Button */}
                <button className="absolute top-3 right-3 p-2 bg-black/20 text-white rounded-full hover:bg-black/40 transition-colors">
                  <Heart className="w-4 h-4" />
                </button>

                {/* Price Badge */}
                <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <div className="text-lg font-bold text-blue-600">฿{formatPrice(tour.price)}</div>
                </div>

                {/* Availability */}
                {tour.availableSeats <= 5 && (
                  <div className="absolute bottom-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                    เหลือ {tour.availableSeats} ที่!
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {tour.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4 text-blue-500" />
                        <span>{tour.destination}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4 text-green-500" />
                        <span>{tour.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Highlights */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {tour.highlights.slice(0, 3).map((highlight, index) => (
                      <span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs font-medium">
                        {highlight}
                      </span>
                    ))}
                    {tour.highlights.length > 3 && (
                      <span className="text-gray-500 text-xs px-2 py-1">+{tour.highlights.length - 3} อื่นๆ</span>
                    )}
                  </div>
                </div>

                {/* Rating & Reviews */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-medium">{tour.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">({tour.reviewCount} รีวิว)</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-green-600">
                    <Users className="w-4 h-4" />
                    <span>{tour.bookingCount}+ คนจอง</span>
                  </div>
                </div>

                {/* Social Proof */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-2 mb-4">
                  <div className="text-xs text-green-700 text-center">
                    <span className="font-medium">มีคนจองล่าสุด:</span> {tour.lastBooking}
                  </div>
                </div>

                {/* Price Section */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    {tour.originalPrice && (
                      <div className="text-sm text-gray-400 line-through">฿{formatPrice(tour.originalPrice)}</div>
                    )}
                    <div className="text-2xl font-bold text-blue-600">
                      ฿{formatPrice(tour.price)}
                      <span className="text-sm text-gray-500 font-normal"> /คน</span>
                    </div>
                  </div>
                  {tour.originalPrice && (
                    <div className="bg-red-100 text-red-700 px-2 py-1 rounded-md text-xs font-bold">
                      ประหยัด ฿{formatPrice(tour.originalPrice - tour.price)}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Link
                    href={`/tour-search-24/${tour.id}?src=search24`}
                    className="block w-full"
                  >
                    <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-bold hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-2">
                      <Calendar className="w-5 h-5" />
                      <span>จองทัวร์นี้</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href={`/tour-search-24/${tour.id}?src=search24`}
                      className="block"
                    >
                      <button className="w-full border-2 border-blue-600 text-blue-600 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors">
                        ดูรายละเอียด
                      </button>
                    </Link>
                    <a
                      href="tel:+66123456789"
                      className="flex items-center justify-center space-x-1 border-2 border-green-500 text-green-600 py-2 rounded-lg text-sm font-medium hover:bg-green-50 transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      <span>โทรสอบถาม</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredTours.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">ไม่พบทัวร์ที่คุณค้นหา</h3>
            <p className="text-gray-600 mb-4">ลองเปลี่ยนคำค้นหาหรือตัวกรองดูครับ</p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedDestination('ทั้งหมด')
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              รีเซ็ตการค้นหา
            </button>
          </div>
        )}
      </div>

      {/* Trust Footer */}
      <div className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center space-y-2">
              <Shield className="w-8 h-8 text-green-400" />
              <div className="font-semibold">การันตีความปลอดภัย</div>
              <div className="text-sm text-gray-300">รับรองโดย ททท.</div>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Award className="w-8 h-8 text-yellow-400" />
              <div className="font-semibold">รางวัลการบริการดีเยี่ยม</div>
              <div className="text-sm text-gray-300">5 ปีติดต่อกัน</div>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Users className="w-8 h-8 text-blue-400" />
              <div className="font-semibold">ลูกค้ามากกว่า 50,000 คน</div>
              <div className="text-sm text-gray-300">ให้ความไว้วางใจ</div>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Phone className="w-8 h-8 text-purple-400" />
              <div className="font-semibold">บริการ 24/7</div>
              <div className="text-sm text-gray-300">พร้อมช่วยเหลือตลอดเวลา</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}