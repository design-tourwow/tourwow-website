'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { 
  ArrowLeft, Star, Clock, Users, MapPin, Calendar, Share2, Heart, 
  Phone, MessageSquare, Check, Wifi, Coffee, Utensils, Car, Bed, 
  Shield, Info, Award, Globe, Camera, Building2
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

// Detailed tour data for specific tour
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
    images: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1528164344705-47542687000d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&h=600&fit=crop'
    ],
    highlights: ['ชมซากุระ', 'วัดเก่าแก่', 'รถไฟความเร็วสูง', 'อาหารญี่ปุ่นแท้'],
    departure: '15 มีนาคม 2025',
    available: true,
    groupSize: 'สูงสุด 25 คน',
    description: 'สัมผัสความงามของญี่ปุ่นในช่วงซากุระบาน เยือนวัดเก่าแก่ในเกียวโต นั่งรถไฟความเร็วสูงชิงกันเซ็น ชิมอาหารญี่ปุ่นต้นตำรับ',
    itinerary: [
      {
        day: 1,
        title: 'วันที่ 1: เดินทางสู่โตเกียว',
        activities: [
          'ออกเดินทางจากสนามบินสุวรรณภูมิ',
          'เดินทางถึงสนามบินนาริตะ โตเกียว',
          'เช็คอินโรงแรม พักผ่อน'
        ]
      },
      {
        day: 2,
        title: 'วันที่ 2: ชมซากุระและวัดเซนโซจิ',
        activities: [
          'ชมซากุระที่สวนอุเอโนะ',
          'เยือนวัดเซนโซจิ อาซากุสะ',
          'เดินช้อปปิ้งถนนนากามิเสะ',
          'ชมวิวกรุงโตเกียวจากสกายทรี'
        ]
      },
      {
        day: 3,
        title: 'วันที่ 3: เดินทางสู่เกียวโต',
        activities: [
          'นั่งรถไฟความเร็วสูงชิงกันเซ็น',
          'เยือนวัดคิโยมิซุ-เดระ',
          'เดินชมย่านกิออนเก่าแก่',
          'ชิมอาหารญี่ปุ่นต้นตำรับ'
        ]
      }
    ],
    included: [
      'ตั๋วเครื่องบิน ไป-กลับ',
      'ที่พัก 4 ดาว 4 คืน',
      'อาหาร 8 มื้อ',
      'รถโค้ชปรับอากาศ',
      'ไกด์ท้องถิ่นพูดไทย',
      'ตั๋วรถไฟชิงกันเซ็น',
      'ประกันการเดินทาง'
    ],
    notIncluded: [
      'ค่าทิป',
      'ค่าใช้จ่ายส่วนตัว',
      'อาหารนอกรายการ',
      'ค่าโทรศัพท์'
    ],
    facilities: [
      { icon: Wifi, label: 'WiFi ฟรี' },
      { icon: Car, label: 'รถรับส่ง' },
      { icon: Utensils, label: 'อาหาร 8 มื้อ' },
      { icon: Bed, label: 'โรงแรม 4 ดาว' },
      { icon: Shield, label: 'ประกันเดินทาง' },
      { icon: Globe, label: 'ไกด์ท้องถิ่น' }
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
    images: [
      'https://images.unsplash.com/photo-1538485399081-7191377e8241?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop'
    ],
    highlights: ['วัฒนธรรมเกาหลี', 'ตลาดมยองดง', 'ชิมอาหารท้องถิ่น', 'K-Pop Culture'],
    departure: '20 มีนาคม 2025',
    available: true,
    groupSize: 'สูงสุด 30 คน',
    description: 'สัมผัสวัฒนธรรมเกาหลีใต้ ช้อปปิ้งที่ตลาดมยองดง ชิมอาหารเกาหลีแท้ๆ เยือนสถานที่สำคัญในโซลและปูซาน'
  }
}

export default function TourDetail({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const tour = tourDetailData[params.id]

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    // Check wishlist status
    const savedWishlist = localStorage.getItem('tour-search-16-wishlist')
    if (savedWishlist) {
      const wishlist = JSON.parse(savedWishlist)
      setIsWishlisted(wishlist.includes(params.id))
    }

    return () => clearTimeout(timer)
  }, [params.id])

  const toggleWishlist = () => {
    const savedWishlist = localStorage.getItem('tour-search-16-wishlist')
    const wishlist = savedWishlist ? JSON.parse(savedWishlist) : []
    
    const newWishlist = isWishlisted
      ? wishlist.filter((id: string) => id !== params.id)
      : [...wishlist, params.id]
    
    localStorage.setItem('tour-search-16-wishlist', JSON.stringify(newWishlist))
    setIsWishlisted(!isWishlisted)
  }

  if (isLoading) {
    return <LoadingDetail />
  }

  if (!tour) {
    return <NotFoundDetail />
  }

  const discount = tour.originalPrice ? Math.round(((tour.originalPrice - tour.price) / tour.originalPrice) * 100) : 0

  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 bg-white border-b-2 border-gray-200 shadow-sm">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 p-3 hover:bg-gray-100 rounded-xl transition-colors min-h-[56px]"
              aria-label="กลับ"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
              <span className="text-lg font-medium text-gray-900">กลับ</span>
            </button>
            
            <div className="flex items-center gap-3">
              <button
                onClick={toggleWishlist}
                className="p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors min-h-[56px] min-w-[56px] flex items-center justify-center"
                aria-label={isWishlisted ? 'เอาออกจากรายการโปรด' : 'เพิ่มในรายการโปรด'}
              >
                <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} />
              </button>
              <button
                className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors min-h-[56px] min-w-[56px] flex items-center justify-center"
                aria-label="แชร์"
              >
                <Share2 className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Image Gallery */}
      <div className="relative h-64 sm:h-80 overflow-hidden">
        <Image
          src={tour.images?.[currentImageIndex] || tour.images?.[0]}
          alt={tour.title}
          fill
          className="object-cover"
          priority
        />
        
        {/* Image Navigation */}
        {tour.images && tour.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {tour.images.map((_: any, index: number) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
                aria-label={`ดูรูปที่ ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 rounded-xl text-base font-bold shadow-lg">
            ลด {discount}%
          </div>
        )}
      </div>

      {/* Main Content */}
      <main className="px-4 py-6">
        {/* Tour Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 leading-tight">
            {tour.title}
          </h1>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2 bg-yellow-50 px-3 py-2 rounded-xl">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="font-bold text-lg">{tour.rating}</span>
              <span className="text-gray-600">({tour.reviewCount} รีวิว)</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Award className="w-5 h-5 text-blue-600" />
              <span className="font-medium">ทัวร์ยอดนิยม</span>
            </div>
          </div>

          {/* Key Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-base">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-blue-600" />
              <span className="text-gray-700">{tour.duration}</span>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-green-600" />
              <span className="text-gray-700">{tour.groupSize}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-red-500" />
              <span className="text-gray-700">ออกเดินทาง {tour.departure}</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-purple-600" />
              <span className="text-gray-700">จองล่วงหน้า 7 วัน</span>
            </div>
          </div>
        </div>

        {/* Description */}
        {tour.description && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">รายละเอียดทัวร์</h2>
            <p className="text-gray-700 text-base leading-relaxed">
              {tour.description}
            </p>
          </div>
        )}

        {/* Highlights */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">✨ ไฮไลท์ทัวร์</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {tour.highlights.map((highlight: string, index: number) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span className="text-gray-800 font-medium">{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Facilities */}
        {tour.facilities && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">🏨 สิ่งอำนวยความสะดวก</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {tour.facilities.map((facility: any, index: number) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <facility.icon className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-800 text-sm font-medium">{facility.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Itinerary */}
        {tour.itinerary && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">📅 รายการเดินทาง</h2>
            <div className="space-y-4">
              {tour.itinerary.map((day: any, index: number) => (
                <div key={index} className="border-2 border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-colors">
                  <h3 className="font-bold text-lg text-gray-900 mb-3">{day.title}</h3>
                  <ul className="space-y-2">
                    {day.activities.map((activity: string, actIndex: number) => (
                      <li key={actIndex} className="flex items-start gap-3 text-gray-700">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-base leading-relaxed">{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Price & Booking */}
        <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-6 mb-8">
          <div className="text-center mb-6">
            {tour.originalPrice && (
              <p className="text-gray-500 text-lg line-through mb-2">
                ฿{tour.originalPrice.toLocaleString()}
              </p>
            )}
            <p className="text-4xl font-bold text-gray-900 mb-2">
              ฿{tour.price.toLocaleString()}
            </p>
            <p className="text-gray-600 text-lg">ต่อคน</p>
            {discount > 0 && (
              <p className="text-green-600 text-base font-medium mt-2">
                ประหยัด ฿{((tour.originalPrice || 0) - tour.price).toLocaleString()}
              </p>
            )}
          </div>

          <div className="space-y-4">
            <button
              onClick={() => setShowBookingForm(true)}
              className="w-full py-4 bg-blue-600 text-white text-xl font-bold rounded-xl hover:bg-blue-700 transition-colors min-h-[60px] flex items-center justify-center gap-3"
            >
              <Calendar className="w-6 h-6" />
              จองทัวร์นี้เลย
            </button>
            
            <div className="grid grid-cols-2 gap-3">
              <button className="py-3 bg-gray-100 text-gray-800 font-semibold rounded-xl hover:bg-gray-200 transition-colors min-h-[56px] flex items-center justify-center gap-2">
                <Phone className="w-5 h-5" />
                โทรสอบถาม
              </button>
              <button className="py-3 bg-gray-100 text-gray-800 font-semibold rounded-xl hover:bg-gray-200 transition-colors min-h-[56px] flex items-center justify-center gap-2">
                <MessageSquare className="w-5 h-5" />
                แชท
              </button>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-blue-600 mb-3">
              <Info className="w-6 h-6" />
              <span className="text-lg font-bold">ต้องการความช่วยเหลือ?</span>
            </div>
            <p className="text-gray-700 text-base mb-2">
              โทรหาเราได้ที่ <span className="font-bold text-blue-600 text-lg">02-123-4567</span>
            </p>
            <p className="text-gray-600 text-sm">
              เปิดให้บริการ จันทร์-ศุกร์ 9:00-18:00 น.
            </p>
          </div>
        </div>
      </main>

      {/* Related Tours */}
      <section className="px-4 py-8 bg-gray-50">
        <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">ทัวร์ที่เกี่ยวข้อง</h2>
        <div className="flex gap-4 text-center">
          <Link 
            href="/tour-search-16"
            className="flex-1 py-4 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-300 transition-colors"
          >
            <span className="text-gray-800 font-medium">ดูทัวร์อื่นๆ</span>
          </Link>
        </div>
      </section>

      {/* Booking Modal */}
      {showBookingForm && (
        <BookingModal 
          tour={tour} 
          onClose={() => setShowBookingForm(false)} 
        />
      )}
    </div>
  )
}

// Loading Component for Detail Page
function LoadingDetail() {
  return (
    <div className="min-h-screen bg-white">
      <div className="px-4 py-4 border-b-2 border-gray-200">
        <div className="h-8 bg-gray-200 rounded w-20 animate-pulse"></div>
      </div>
      <div className="h-64 bg-gray-200 animate-pulse"></div>
      <div className="px-4 py-6 space-y-4">
        <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

// Not Found Component
function NotFoundDetail() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center">
        <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          <MapPin className="w-8 h-8 text-gray-400" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">ไม่พบทัวร์นี้</h1>
        <p className="text-gray-600 mb-6 text-base">
          ทัวร์ที่คุณค้นหาไม่มีอยู่ในระบบ
        </p>
        <Link
          href="/tour-search-16"
          className="inline-block px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-xl hover:bg-blue-700 transition-colors"
        >
          กลับหน้าหลัก
        </Link>
      </div>
    </div>
  )
}

// Simple Booking Modal Component
function BookingModal({ tour, onClose }: { tour: any, onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">จองทัวร์</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              aria-label="ปิด"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-2">{tour.title}</h4>
            <p className="text-2xl font-bold text-blue-600">฿{tour.price.toLocaleString()}</p>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">ชื่อ-นามสกุล *</label>
              <input
                type="text"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:outline-none text-base"
                placeholder="กรอกชื่อ-นามสกุล"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">หมายเลขโทรศัพท์ *</label>
              <input
                type="tel"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:outline-none text-base"
                placeholder="08X-XXX-XXXX"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">อีเมล</label>
              <input
                type="email"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:outline-none text-base"
                placeholder="example@email.com"
              />
            </div>
          </div>

          <button className="w-full py-4 bg-blue-600 text-white text-lg font-bold rounded-xl hover:bg-blue-700 transition-colors">
            ยืนยันการจอง
          </button>

          <p className="text-center text-gray-600 text-sm mt-4">
            เจ้าหน้าที่จะติดต่อกลับภายใน 24 ชม.
          </p>
        </div>
      </div>
    </div>
  )
}