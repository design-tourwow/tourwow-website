'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { 
  ArrowLeft, Calendar, Users, Star, Clock, MapPin, Plane, Hotel, 
  Shield, CreditCard, Heart, Share2, Phone, MessageCircle, CheckCircle,
  Globe, Wifi, Coffee, Camera, Navigation, AlertCircle, Info,
  ThumbsUp, Award, Target, Sparkles, Zap, Crown, Gift, Utensils,
  Home, CalendarDays, Package, Bed, Menu, X, Trophy, Diamond
} from 'lucide-react'

// Premium tour data
const premiumToursData = [
  {
    id: 1,
    title: 'ทัวร์พรีเมี่ยม ญี่ปุ่น โตเกียว-เกียวโต 7 วัน 5 คืน',
    location: 'ญี่ปุ่น',
    city: 'โตเกียว-เกียวโต',
    duration: '7 วัน',
    durationCode: '7D5N',
    days: 7,
    nights: 5,
    price: 89900,
    originalPrice: 109900,
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
    rating: 4.9,
    reviews: 156,
    groupSize: '8-12',
    hotelStar: 5,
    airline: 'TG',
    airlineName: 'Thai Airways Business Class',
    airportName: 'สุวรรณภูมิ (BKK)',
    availableSeats: 6,
    travelSeason: 'ม.ค.-มี.ค.',
    nextDate: '15 ก.พ. 2567',
    highlights: 'ประสบการณ์พรีเมี่ยมระดับโลก พักโรงแรม 5 ดาวใจกลางเมือง โตเกียวสกายทรี ชมวิวพาโนรามา 360 องศา อาหารมิชลินสตาร์ 3 มื้อ ล่องเรือแม่น้ำซูมิดะ ชมดอกซากุระที่สวยงามที่สุด พร้อมมัคคุเทศก์ส่วนตัวและรถโค้ชหรู',
    premiumFeatures: [
      'Business Class ไป-กลับ',
      'โรงแรม 5 ดาวใจกลางเมือง',
      'อาหารมิชลินสตาร์ 3 มื้อ',
      'มัคคุเทศก์ส่วนตัว',
      'รถโค้ชหรูส่วนตัว',
      'ประกันการเดินทาง 5 ล้านบาท'
    ],
    detailedItinerary: [
      {
        day: 1,
        title: 'วันที่ 1: เดินทางสู่โตเกียว Business Class',
        activities: [
          '08:00 - เช็คอินสนามบินสุวรรณภูมิ Business Class Lounge',
          '10:30 - ออกเดินทางโดย Thai Airways Business Class',
          '18:00 - ถึงสนามบินนาริตะ',
          '19:30 - รถโค้ชหรูส่วนตัวรับจากสนามบิน',
          '21:00 - เช็คอินโรงแรม 5 ดาวใจกลางโตเกียว',
          '22:00 - อาหารเย็นหรูที่โรงแรม'
        ],
        meals: {
          breakfast: { location: 'Business Class Lounge', type: 'บุฟเฟ่ต์หรู' },
          lunch: { location: 'บนเครื่องบิน Business Class', type: 'อาหารหรู' },
          dinner: { location: 'โรงแรม 5 ดาว', type: 'อาหารญี่ปุ่นหรู' }
        }
      },
      {
        day: 2,
        title: 'วันที่ 2: โตเกียวสกายทรี - อาซากุสะ',
        activities: [
          '07:00 - อาหารเช้าบุฟเฟ่ต์หรูที่โรงแรม',
          '08:30 - ออกเดินทางด้วยรถโค้ชหรูส่วนตัว',
          '09:30 - ขึ้นชมวิวบนโตเกียวสกายทรี ชั้น 350',
          '11:30 - เดินทางสู่วัดเซ็นโซจิ',
          '12:30 - อาหารกลางวันมิชลินสตาร์',
          '14:00 - ล่องเรือแม่น้ำซูมิดะ',
          '16:00 - เดินทางสู่ย่านชิบูย่า',
          '17:00 - อิสระช้อปปิ้งที่ชิบูย่า',
          '19:00 - อาหารเย็นมิชลินสตาร์',
          '21:00 - กลับโรงแรม'
        ],
        meals: {
          breakfast: { location: 'โรงแรม 5 ดาว', type: 'บุฟเฟ่ต์นานาชาติหรู' },
          lunch: { location: 'ร้านมิชลินสตาร์', type: 'อาหารญี่ปุ่นหรู' },
          dinner: { location: 'ร้านมิชลินสตาร์', type: 'อาหารญี่ปุ่นหรู' }
        }
      }
    ],
    inclusions: [
      'ตั๋วเครื่องบิน Business Class ไป-กลับ',
      'โรงแรม 5 ดาวใจกลางเมือง 5 คืน',
      'อาหารมิชลินสตาร์ 3 มื้อ',
      'มัคคุเทศก์ส่วนตัวตลอดการเดินทาง',
      'รถโค้ชหรูส่วนตัว',
      'ประกันการเดินทาง 5 ล้านบาท',
      'น้ำดื่มพรีเมี่ยมวันละ 2 ขวด'
    ],
    exclusions: [
      'ค่าทำหนังสือเดินทาง (พาสปอร์ต)',
      'ค่าวีซ่าสำหรับชาวต่างชาติ',
      'ค่าอาหารและเครื่องดื่มนอกเหนือจากรายการ',
      'ค่าใช้จ่ายส่วนตัว เช่น ค่าโทรศัพท์, ค่าซักรีด',
      'ค่าทิปมัคคุเทศก์และคนขับรถ 2,000 บาท/ท่าน/ทริป',
      'ค่าภาษีมูลค่าเพิ่ม 7% และภาษีหัก ณ ที่จ่าย 3%',
      'ค่าทัวร์เสริมนอกโปรแกรม'
    ],
    facilities: [
      { icon: Crown, label: 'บริการพรีเมี่ยม' },
      { icon: Wifi, label: 'Wi-Fi ฟรี' },
      { icon: Coffee, label: 'อาหารเช้า' },
      { icon: Camera, label: 'จุดถ่ายรูป' },
      { icon: Navigation, label: 'มัคคุเทศก์ส่วนตัว' },
      { icon: Shield, label: 'ประกันครอบคลุม' }
    ]
  }
]

export default function PremiumTourDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const [tour, setTour] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedDate, setSelectedDate] = useState('')
  const [showBooking, setShowBooking] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [showStickyNav, setShowStickyNav] = useState(false)

  useEffect(() => {
    console.log('Searching for tour with ID:', id)
    console.log('Available tour IDs:', premiumToursData.map(t => t.id))
    
    try {
      const foundTour = premiumToursData.find(t => t.id.toString() === id)
      console.log('Found tour:', foundTour)
      
      if (foundTour) {
        setTour(foundTour)
        setError(null)
      } else {
        setError('ไม่พบข้อมูลทัวร์ที่ต้องการ')
      }
    } catch (err) {
      console.error('Error loading tour:', err)
      setError('เกิดข้อผิดพลาดในการโหลดข้อมูล')
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyNav(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gold-400 border-t-transparent mx-auto mb-4"></div>
          <p className="text-white">กำลังโหลดข้อมูลทัวร์พรีเมี่ยม...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error || !tour) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">ไม่พบข้อมูลทัวร์</h2>
          <p className="text-white/80 mb-6">{error || 'ไม่พบข้อมูลทัวร์ที่ต้องการ'}</p>
          <Link 
            href="/tour-search-6"
            className="bg-gradient-to-r from-gold-500 to-yellow-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-gold-600 hover:to-yellow-600 transition-all duration-300"
          >
            กลับไปหน้าหลัก
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      
        {/* Sticky Navigation */}
        {showStickyNav && (
          <div className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-4">
                  <h2 className="text-lg font-semibold text-white hidden md:block truncate max-w-[300px]">
                    {tour.title}
                  </h2>
                  <div className="text-2xl font-bold text-gold-400 md:hidden">
                    ฿{tour.price.toLocaleString()}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowBooking(true)}
                    className="bg-gradient-to-r from-gold-500 to-yellow-500 text-white px-4 py-2 rounded-lg font-medium hover:from-gold-600 hover:to-yellow-600 transition-all shadow-md"
                  >
                    จองเลย
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Premium Hero Section */}
        <div className="relative h-[70vh] overflow-hidden">
          <Image 
            src={tour.image} 
            alt={tour.title}
            fill
            className="object-cover"
            priority
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = `https://via.placeholder.com/800x600/3B82F6/FFFFFF?text=${encodeURIComponent(tour.title)}`;
            }}
          />
          
          {/* Premium Background Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-purple-900/40 to-transparent">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3Ccircle cx='10' cy='10' r='1'/%3E%3Ccircle cx='50' cy='10' r='1'/%3E%3Ccircle cx='10' cy='50' r='1'/%3E%3Ccircle cx='50' cy='50' r='1'/%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
          </div>

          {/* Back Button */}
          <Link 
            href="/tour-search-6"
            className="absolute top-6 left-6 z-20 bg-white/90 backdrop-blur-sm hover:bg-white/95 transition-all duration-300 rounded-full p-3 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </Link>

          {/* Actions */}
          <div className="absolute top-6 right-6 z-20 flex gap-3">
            <button 
              onClick={() => setIsLiked(!isLiked)}
              className="bg-white/90 backdrop-blur-sm hover:bg-white/95 transition-all duration-300 rounded-full p-3 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Heart className={`w-6 h-6 ${isLiked ? 'text-red-500 fill-red-500' : 'text-gray-700'}`} />
            </button>
            <button className="bg-white/90 backdrop-blur-sm hover:bg-white/95 transition-all duration-300 rounded-full p-3 shadow-lg hover:shadow-xl transform hover:scale-105">
              <Share2 className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          {/* Hero Content */}
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="max-w-4xl mx-auto">
              {/* Premium Badge */}
              <div className="flex items-center gap-2 mb-4">
                <Crown className="w-6 h-6 text-gold-400" />
                <span className="bg-gradient-to-r from-gold-500 to-yellow-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                  PREMIUM EXPERIENCE
                </span>
              </div>

              {/* Tour Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-gold-500/90 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                  {tour.location}
                </span>
                <span className="bg-purple-500/90 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                  {tour.durationCode}
                </span>
                <span className="bg-cyan-500/90 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                  โรงแรม {tour.hotelStar} ดาว
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight drop-shadow-2xl">
                {tour.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-lg">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-gold-400 fill-gold-400" />
                  <span className="font-semibold">{tour.rating}</span>
                  <span className="text-white/80">({tour.reviews} รีวิว)</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-cyan-300" />
                  <span>{tour.city}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-300" />
                  <span>{tour.groupSize} คน</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Content - Tour Details */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Premium Tab Navigation */}
              <div className="sticky top-20 z-30 mb-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-1">
                  <div className="flex gap-1 overflow-x-auto scrollbar-hide">
                    {[
                      { id: 'overview', label: 'ภาพรวม', icon: Info },
                      { id: 'itinerary', label: 'รายการเดินทาง', icon: Calendar },
                      { id: 'inclusions', label: 'สิ่งที่รวม', icon: CheckCircle },
                      { id: 'terms', label: 'เงื่อนไข', icon: Shield }
                    ].map((tab) => {
                      const Icon = tab.icon
                      const isActive = activeTab === tab.id
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`
                            relative flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium flex-shrink-0
                            transition-all duration-200 ease-out whitespace-nowrap min-w-fit
                            ${isActive 
                              ? 'bg-gradient-to-r from-gold-500 to-yellow-500 text-white shadow-md scale-[1.02]' 
                              : 'text-white hover:text-gold-400 hover:bg-white/10'
                            }
                          `}
                        >
                          <Icon className={`w-4 h-4 transition-colors duration-200 ${
                            isActive ? 'text-white' : 'text-white/70'
                          }`} />
                          <span className="text-sm font-medium">
                            {tab.label}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Tab Content */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 min-h-[600px]">
                
                {activeTab === 'overview' && (
                  <div className="space-y-6 animate-fadeIn">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                        <Sparkles className="w-7 h-7 text-gold-400" />
                        ไฮไลท์ของทัวร์พรีเมี่ยม
                      </h2>
                      <p className="text-white/90 leading-relaxed text-lg">
                        {tour.highlights}
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-gradient-to-br from-gold-500/20 to-yellow-500/20 p-4 rounded-xl text-center border border-gold-500/30">
                        <Clock className="w-8 h-8 text-gold-400 mx-auto mb-2" />
                        <div className="font-semibold text-white">{tour.duration}</div>
                        <div className="text-sm text-white/80">{tour.nights} คืน</div>
                      </div>
                      <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-4 rounded-xl text-center border border-purple-500/30">
                        <Plane className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                        <div className="font-semibold text-white">{tour.airlineName}</div>
                        <div className="text-sm text-white/80">{tour.airportName}</div>
                      </div>
                      <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 p-4 rounded-xl text-center border border-cyan-500/30">
                        <Hotel className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                        <div className="font-semibold text-white">โรงแรม {tour.hotelStar} ดาว</div>
                        <div className="text-sm text-white/80">พักสบาย</div>
                      </div>
                      <div className="bg-gradient-to-br from-emerald-500/20 to-green-500/20 p-4 rounded-xl text-center border border-emerald-500/30">
                        <Users className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                        <div className="font-semibold text-white">{tour.groupSize} คน</div>
                        <div className="text-sm text-white/80">กรุ๊ปขนาดเล็ก</div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'inclusions' && (
                  <div className="space-y-8 animate-fadeIn">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <CheckCircle className="w-7 h-7 text-green-400" />
                        รายการที่รวมในแพ็คเกจพรีเมี่ยม
                      </h2>
                      <div className="grid gap-3">
                        {tour.inclusions.map((item: string, idx: number) => (
                          <div key={idx} className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl border border-green-500/30 hover:shadow-md transition-all duration-300">
                            <Crown className="w-5 h-5 text-green-400 flex-shrink-0" />
                            <span className="text-white font-medium leading-relaxed">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <AlertCircle className="w-7 h-7 text-red-400" />
                        รายการที่ไม่รวมในแพ็คเกจ
                      </h2>
                      <div className="grid gap-3">
                        {tour.exclusions.map((item: string, idx: number) => (
                          <div key={idx} className="flex items-center gap-3 p-4 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-xl border border-red-500/30 hover:shadow-md transition-all duration-300">
                            <X className="w-5 h-5 text-red-400 flex-shrink-0" />
                            <span className="text-white font-medium leading-relaxed">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Premium Features */}
                    {tour.facilities && (
                      <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                          <Award className="w-7 h-7 text-gold-400" />
                          สิ่งอำนวยความสะดวกพรีเมี่ยม
                        </h2>
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {tour.facilities.map((facility: any, idx: number) => {
                            const Icon = facility.icon
                            return (
                              <div key={idx} className="bg-gradient-to-br from-gold-500/20 to-yellow-500/20 p-6 rounded-xl text-center border border-gold-500/30 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                                <Icon className="w-8 h-8 text-gold-400 mx-auto mb-3" />
                                <div className="font-medium text-white">{facility.label}</div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right Sidebar - Premium Booking */}
            <div className="space-y-6">
              
              {/* Premium Price Card */}
              <div className="bg-gradient-to-br from-gold-500/20 to-yellow-500/20 backdrop-blur-sm rounded-2xl p-6 border border-gold-500/30">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Crown className="w-6 h-6 text-gold-400" />
                    <span className="text-gold-400 font-bold">PREMIUM PACKAGE</span>
                    <Crown className="w-6 h-6 text-gold-400" />
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-white/60 line-through text-lg">฿{tour.originalPrice?.toLocaleString()}</span>
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      ลด {Math.round(((tour.originalPrice - tour.price) / tour.originalPrice) * 100)}%
                    </span>
                  </div>
                  <div className="text-4xl font-bold text-gold-400 mb-2">
                    ฿{tour.price.toLocaleString()}
                  </div>
                  <div className="text-white/80">ต่อท่าน</div>
                </div>

                {/* Premium Features */}
                <div className="space-y-3 mb-6">
                  {tour.premiumFeatures.slice(0, 4).map((feature: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2 text-white/90">
                      <Crown className="w-4 h-4 text-gold-400" />
                      <span className="text-sm leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Available Seats */}
                <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-2 text-yellow-400">
                    <AlertCircle className="w-5 h-5" />
                    <span className="font-medium">เหลือที่นั่ง {tour.availableSeats} ที่</span>
                  </div>
                </div>

                {/* Book Now Button */}
                <button 
                  onClick={() => setShowBooking(true)}
                  className="w-full bg-gradient-to-r from-gold-500 to-yellow-500 text-white py-4 rounded-xl font-semibold text-lg hover:from-gold-600 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  จองทัวร์พรีเมี่ยม
                </button>

                {/* Contact Options */}
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <button className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl transition-all duration-300">
                    <Phone className="w-4 h-4" />
                    โทร
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl transition-all duration-300">
                    <MessageCircle className="w-4 h-4" />
                    แชท
                  </button>
                </div>

                {/* Premium Trust Indicators */}
                <div className="mt-6 pt-6 border-t border-white/20">
                  <div className="flex items-center justify-center gap-4 text-sm text-white/80">
                    <div className="flex items-center gap-1">
                      <Shield className="w-4 h-4 text-green-400" />
                      <span>ปลอดภัย</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Crown className="w-4 h-4 text-gold-400" />
                      <span>พรีเมี่ยม</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Premium Info */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-gold-400" />
                  ข้อมูลพรีเมี่ยม
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/70">สายการบิน:</span>
                    <span className="font-medium text-white">{tour.airlineName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">สนามบิน:</span>
                    <span className="font-medium text-white">{tour.airportName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">จำนวนผู้เดินทาง:</span>
                    <span className="font-medium text-white">{tour.groupSize} คน</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">โรงแรม:</span>
                    <span className="font-medium text-white">{tour.hotelStar} ดาว</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Booking Modal */}
        {showBooking && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto border border-gold-500/30">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Crown className="w-8 h-8 text-gold-400" />
                  <h2 className="text-2xl font-bold text-white">จองทัวร์พรีเมี่ยม</h2>
                  <Crown className="w-8 h-8 text-gold-400" />
                </div>
                <p className="text-white/80 leading-relaxed">{tour.title}</p>
                <p className="text-gold-400 font-semibold mt-2">
                  ฿{tour.price.toLocaleString()}
                </p>
              </div>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-1">ชื่อ-นามสกุล</label>
                  <input type="text" className="w-full p-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-gold-500 text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-1">อีเมล</label>
                  <input type="email" className="w-full p-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-gold-500 text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-1">เบอร์โทรศัพท์</label>
                  <input type="tel" className="w-full p-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-gold-500 text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-1">จำนวนผู้เดินทาง</label>
                  <select className="w-full p-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-gold-500 text-white">
                    <option>1 ท่าน</option>
                    <option>2 ท่าน</option>
                    <option>3 ท่าน</option>
                    <option>4 ท่าน</option>
                    <option>5 ท่าน</option>
                    <option>6+ ท่าน</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => setShowBooking(false)}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl transition-all duration-300 border border-white/20"
                >
                  ยกเลิก
                </button>
                <button className="flex-1 bg-gradient-to-r from-gold-500 to-yellow-500 hover:from-gold-600 hover:to-yellow-600 text-white py-3 rounded-xl transition-all duration-300">
                  ยืนยันการจอง
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
} 