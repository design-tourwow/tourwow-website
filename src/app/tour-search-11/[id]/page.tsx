'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { 
  ArrowLeft, Star, Heart, Share2, MapPin, Clock, Users,
  Phone, MessageCircle, ArrowRight, Calendar, CheckCircle,
  X, Eye, ChevronLeft, ChevronRight, AlertCircle, Info,
  Award, Shield, Sparkles, TrendingUp, Camera, Play,
  Wifi, Car, Utensils, Bed, Plane, Globe, ThumbsUp
} from 'lucide-react'
import BookingModal from '@/components/BookingModal'

interface BookingFormData {
  name: string;
  phone: string;
  email?: string;
}

// Enhanced mock tour data
const mockTours = [
  {
    id: 1,
    title: "ญี่ปุ่น 7 วัน 6 คืน โตเกียว-เกียวโต-โอซาก้า",
    price: 45900,
    originalPrice: 52900,
    duration: "7 วัน 6 คืน",
    rating: 4.8,
    reviews: 127,
    highlights: ["วัดคิโยมิซุ", "ภูเขาฟูจิ", "ชินจูกุ", "ดาเตะบาชิ", "อาราชิยาม่า", "โดทนโบริ"],
    destinations: ["โตเกียว", "เกียวโต", "โอซาก้า"],
    country: "ญี่ปุ่น",
    airline: "JAL",
    hotel: "4-5 ดาว",
    availableSeats: 8,
    totalSeats: 35,
    badge: "ยอดนิยม",
    includes: ["ตั๋วเครื่องบิน", "โรงแรม 4-5 ดาว", "อาหารเช้า กลางวัน เย็น", "ไกด์ท้องถิ่นมืออาชีพ", "ประกันการเดินทาง", "รถโค้ชปรับอากาศ"],
    excludes: ["ค่าวีซ่า", "ทิปไกด์ 3,000 บาท", "ค่าใช้จ่ายส่วนตัว", "อาหารและเครื่องดื่มนอกรายการ"],
    departureDate: '2024-03-15',
    departureDates: [
      { date: '15 มี.ค. 2024', price: 45900, available: true, seats: 8 },
      { date: '22 มี.ค. 2024', price: 47900, available: true, seats: 12 },
      { date: '29 มี.ค. 2024', price: 49900, available: true, seats: 15 },
      { date: '5 เม.ย. 2024', price: 52900, available: true, seats: 20 },
    ],
    groupSize: { min: 15, max: 35 },
    overview: "เที่ยวญี่ปุ่นสุดคลาสสิก พาคุณสำรวจ 3 มหานครสำคัญ ตั้งแต่โตเกียวที่ทันสมัย เกียวโตแห่งวัฒนธรรม และโอซาก้าเมืองแห่งอาหาร พร้อมสัมผัสความงามของภูเขาฟูจิ และประสบการณ์ที่ไม่ลืมในดินแดนซากุระ",
    itinerary: [
      {
        day: 1,
        title: "วันที่ 1 - เดินทางสู่โตเกียว",
        activities: [
          "ออกเดินทางจากสนามบินสุวรรณภูมิ เวลา 01:25 น.",
          "เดินทางถึงสนามบินนาริตะ โตเกียว เวลา 08:50 น.",
          "นำท่านเยือนศาลเจ้าอาซากุสะ (Asakusa Shrine)",
          "ชมและช้อปปิ้งที่ย่าน Nakamise Shopping Street", 
          "เช็คอินโรงแรม พักผ่อน"
        ],
        meals: ["อาหารกลางวัน", "อาหารเย็น"],
        hotel: "Hotel Gracery Shinjuku หรือเทียบเท่า"
      },
      {
        day: 2,
        title: "วันที่ 2 - ชมภูเขาฟูจิ + ฮาโกเน่",
        activities: [
          "ทานอาหารเช้าที่โรงแรม",
          "เดินทางสู่ภูเขาฟูจิ ชั้น 5 (หากสภาพอากาศเอื้ออำนวย)",
          "ล่องเรือชมทะเลสาบอาชิ (Lake Ashi)",
          "นั่งกระเช้าขึ้นภูเขาโคมะงะดาเกะ",
          "แวะชมและช้อปปิ้งที่ Gotemba Premium Outlet"
        ],
        meals: ["อาหารเช้า", "อาหารกลางวัน", "อาหารเย็น"],
        hotel: "Hotel Gracery Shinjuku หรือเทียบเท่า"
      },
      {
        day: 3, 
        title: "วันที่ 3 - โตเกียว - เมืองแห่งความทันสมัย",
        activities: [
          "ทานอาหารเช้าที่โรงแรม",
          "เยือน Imperial Palace East Gardens",
          "ช้อปปิ้งที่ย่าน Ginza หรือ Shibuya",
          "สัมผัสวิวกรุงโตเกียวจาก Tokyo Skytree หรือ Tokyo Tower",
          "เดินเล่นย่าน Harajuku และ Omotesando"
        ],
        meals: ["อาหารเช้า", "อาหารกลางวัน", "อาหารเย็น"],
        hotel: "Hotel Gracery Shinjuku หรือเทียบเท่า"
      }
    ],
    awards: ["TripAdvisor Excellence 2024", "Thailand Tourism Awards", "Best Tour Package 2024"],
    certifications: ["ISO 9001:2015", "ATTA Member", "TAT License"],
    gallery: 12,
    videoUrl: "https://www.youtube.com/watch?v=example",
    lastBooked: "2 นาทีที่แล้ว",
    trending: true
  },
  {
    id: 2,
    title: "เกาหลีใต้ 6 วัน 5 คืน โซล-ปูซาน-เชจู",
    price: 38900,
    originalPrice: 45900,
    duration: "6 วัน 5 คืน",
    rating: 4.7,
    reviews: 89,
    highlights: ["พระราชวังเคียงบกกุง", "เกาะเชจู", "ตลาดนัมแดมุน", "หอคอยเอ็นโซล", "ฮงแด", "มยองดง"],
    destinations: ["โซล", "ปูซาน", "เชจู"],
    country: "เกาหลี",
    airline: "Korean Air",
    hotel: "4 ดาว",
    availableSeats: 15,
    totalSeats: 40,
    badge: "โปรโมชั่น",
    includes: ["ตั๋วเครื่องบิน", "โรงแรม", "มื้ออาหาร", "ไกด์ไทย"],
    departureDate: '2024-04-10'
  },
  {
    id: 3,
    title: "ยุโรป 12 วัน 11 คืน ฝรั่งเศส-อิตาลี-สวิตเซอร์แลนด์",
    price: 129900,
    originalPrice: 149900,
    duration: "12 วัน 11 คืน",
    rating: 4.9,
    reviews: 203,
    highlights: ["หอไอเฟล", "โคลอสเซียม", "หอเอนปิซา", "เทือกเขาแอลป์"],
    destinations: ["ปารีส", "โรม", "มิลาน", "ซูริค"],
    country: "ยุโรป",
    airline: "Emirates",
    hotel: "4-5 ดาว",
    availableSeats: 5,
    totalSeats: 28,
    badge: "พรีเมียม",
    includes: ["ตั๋วเครื่องบิน", "โรงแรม", "มื้ออาหาร", "ไกด์ท้องถิ่น", "รถทัวร์"],
    departureDate: '2024-05-20'
  }
]

// Function to get tour images
const getTourImage = (tour: any) => {
  const countryImages: { [key: string]: string[] } = {
    'ญี่ปุ่น': [
      'https://picsum.photos/800/500?random=1',
      'https://picsum.photos/800/500?random=2',
      'https://picsum.photos/800/500?random=3',
      'https://picsum.photos/800/500?random=4',
      'https://picsum.photos/800/500?random=5'
    ],
    'เกาหลี': [
      'https://picsum.photos/800/500?random=6',
      'https://picsum.photos/800/500?random=7'
    ],
    'ยุโรป': [
      'https://picsum.photos/800/500?random=8',
      'https://picsum.photos/800/500?random=9'
    ]
  }
  
  return countryImages[tour.country] || ['https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=500&fit=crop']
}

// Sample reviews data
const sampleReviews = [
  {
    id: 1,
    name: "คุณสมชาย ใจดี",
    avatar: "👨‍💼",
    rating: 5,
    date: "3 วันที่แล้ว",
    comment: "ทัวร์นี้ดีมากครับ ไกด์ใส่ใจทุกรายละเอียด โรงแรมสะอาด อาหารอร่อย คุ้มค่าเงินสุดๆ จะไปอีกแน่นอน",
    helpful: 12,
    images: 3
  },
  {
    id: 2,
    name: "คุณนิภา สวยงาม",
    avatar: "👩‍💻",
    rating: 5,
    date: "1 สัปดาห์ที่แล้ว",
    comment: "ประทับใจมากค่ะ สถานที่ท่องเที่ยวสวยงาม ไกด์พูดดี อธิบายชัดเจน ได้ความรู้เพิ่มเติมเยอะ",
    helpful: 8,
    images: 5
  },
  {
    id: 3,
    name: "คุณประยุทธ นักเที่ยว",
    avatar: "🧳",
    rating: 4,
    date: "2 สัปดาห์ที่แล้ว", 
    comment: "โดยรวมดีครับ มีเพียงบางจุดที่เวลาน้อยไปหน่อย แต่ก็เข้าใจว่าต้องดูเวลาทั้งกรุ๊ป แนะนำเลยครับ",
    helpful: 15,
    images: 2
  }
]

export default function TourDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)
  const [activeTab, setActiveTab] = useState('overview')
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')
  const [travelers, setTravelers] = useState(2)
  const [showAllReviews, setShowAllReviews] = useState(false)
  const [showFullItinerary, setShowFullItinerary] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  // Find tour by id
  const tourId = parseInt(params?.id as string)
  const tour = mockTours.find(t => t.id === tourId)
  
  if (!tour) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">ไม่พบทัวร์</h1>
          <p className="text-gray-600 text-sm mb-6">ขออภัย เราไม่พบทัวร์ที่คุณกำลังมองหา</p>
          <button 
            onClick={() => router.back()}
            className="w-full py-3 bg-blue-600 text-white rounded-xl font-medium"
          >
            กลับหน้าก่อนหน้า
          </button>
        </div>
      </div>
    )
  }
  
  // Prevent hydration mismatch
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">กำลังโหลด...</p>
        </div>
      </div>
    )
  }

  const images = getTourImage(tour)
  const savingsAmount = tour.originalPrice - tour.price
  const savingsPercent = Math.round((savingsAmount / tour.originalPrice) * 100)
  const bookedPercent = Math.round(((tour.totalSeats - tour.availableSeats) / tour.totalSeats) * 100)
  
  const handleBooking = () => {
    setShowBookingModal(true)
  }

  const handleBookingSubmit = async (formData: BookingFormData) => {
    setIsSubmitting(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setShowBookingModal(false)
      // Navigate to booking success page
      router.push(`/booking-success?tour=${tour.title}&price=${tour.price}&travelers=${travelers}`)
    } catch (error) {
      console.error('Booking error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 📱 ENHANCED MOBILE HEADER */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100">
        <div className="flex items-center justify-between px-4 py-3">
          <button 
            onClick={() => router.back()}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          
          <div className="flex-1 text-center px-4">
            <h1 className="font-semibold text-gray-900 truncate text-sm">
              {tour.title}
            </h1>
            {tour.trending && (
              <div className="flex items-center justify-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3 text-red-500" />
                <span className="text-xs text-red-500 font-medium">กำลังมาแรง</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Share2 className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>
      </header>

      {/* 🖼️ ENHANCED HERO IMAGE SECTION */}
      <section className="relative">
        <div className="aspect-[4/3] bg-gray-200 relative overflow-hidden">
          <img
            src={images[selectedImage]}
            alt={tour.title}
            className="w-full h-full object-cover"
          />
          
          {/* Enhanced Overlay Elements */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
          
          {/* Top Left - Awards & Certifications */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {tour.awards && (
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                <Award className="w-3 h-3" />
                <span>รางวัล TripAdvisor</span>
              </div>
            )}
            <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
              <Shield className="w-3 h-3" />
              <span>รับประกัน 100%</span>
            </div>
          </div>
          
          {/* Top Right - Discount Badge */}
          <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-xl shadow-lg">
            <div className="text-sm font-bold">ลด {savingsPercent}%</div>
            <div className="text-xs opacity-90">ประหยัด ฿{savingsAmount.toLocaleString()}</div>
          </div>
          
          {/* Bottom Left - Booking Status */}
          <div className="absolute bottom-4 left-4 space-y-2">
            {tour.lastBooked && (
              <div className="bg-blue-600/90 backdrop-blur-sm text-white px-3 py-2 rounded-lg shadow-lg text-sm">
                🔥 มีคนจองเมื่อ {tour.lastBooked}
              </div>
            )}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-2 rounded-xl shadow-lg flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm font-medium">เหลือ {tour.availableSeats} ที่นั่ง</span>
            </div>
          </div>
          
          {/* Bottom Right - Media Info */}
          <div className="absolute bottom-4 right-4 flex items-center gap-2">
            {tour.gallery && (
              <div className="bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-lg flex items-center gap-1">
                <Camera className="w-3 h-3" />
                <span className="text-xs">{tour.gallery} รูป</span>
              </div>
            )}
            {tour.videoUrl && (
              <div className="bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-lg flex items-center gap-1">
                <Play className="w-3 h-3" />
                <span className="text-xs">วิดีโอ</span>
              </div>
            )}
          </div>
          
          {/* Image Navigation */}
          {images.length > 1 && (
            <>
              <button
                onClick={() => setSelectedImage(Math.max(0, selectedImage - 1))}
                disabled={selectedImage === 0}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/30 backdrop-blur-sm text-white rounded-full disabled:opacity-30 hover:bg-black/50 transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setSelectedImage(Math.min(images.length - 1, selectedImage + 1))}
                disabled={selectedImage === images.length - 1}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/30 backdrop-blur-sm text-white rounded-full disabled:opacity-30 hover:bg-black/50 transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              
              {/* Dot Indicators */}
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`rounded-full transition-all ${
                      selectedImage === index 
                        ? 'bg-white' 
                        : 'bg-white/60 hover:bg-white/80'
                    }`}
                    style={{
                      width: selectedImage === index ? '24px' : '8px',
                      height: '8px'
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* 📋 ENHANCED MAIN CONTENT */}
      <main className="px-4 py-4 space-y-5">
        
        {/* ⭐ ENHANCED QUICK INFO CARD */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          {/* Enhanced Badge Section */}
          <div className="flex items-center gap-2 mb-4">
            {tour.badge && (
              <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold ${
                tour.badge === 'ยอดนิยม' ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' :
                tour.badge === 'โปรโมชั่น' ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' :
                'bg-gradient-to-r from-purple-500 to-purple-600 text-white'
              }`}>
                {tour.badge === 'ยอดนิยม' && <TrendingUp className="w-3 h-3" />}
                {tour.badge === 'โปรโมชั่น' && <Sparkles className="w-3 h-3" />}
                {tour.badge}
              </span>
            )}
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
              <Users className="w-3 h-3" />
              จองแล้ว {bookedPercent}%
            </span>
          </div>
          
          <h2 className="text-xl font-bold text-gray-900 leading-tight mb-4">
            {tour.title}
          </h2>
          
          {/* Enhanced Rating & Reviews */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(tour.rating) 
                        ? 'fill-yellow-400 text-yellow-400' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="font-semibold text-gray-900">{tour.rating}</span>
              <span className="text-gray-500 text-sm">({tour.reviews} รีวิว)</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600 text-sm">
              <Clock className="w-4 h-4" />
              <span>{tour.duration}</span>
            </div>
          </div>
          
          {/* Destinations with Icons */}
          <div className="flex flex-wrap gap-2 mb-5">
            {tour.destinations.map((dest, index) => (
              <span key={index} className="inline-flex items-center gap-1 px-3 py-2 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-xl text-sm font-medium border border-blue-200">
                <MapPin className="w-3 h-3" />
                {dest}
              </span>
            ))}
          </div>
          
          {/* Enhanced Price Section */}
          <div className="bg-gradient-to-r from-blue-50 via-blue-100 to-indigo-100 rounded-2xl p-5 mb-6 border border-blue-200">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-3xl font-bold text-blue-600">
                ฿{tour.price.toLocaleString()}
              </span>
              <span className="text-lg text-gray-500 line-through">
                ฿{tour.originalPrice.toLocaleString()}
              </span>
              <span className="bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
                -{savingsPercent}%
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-3">ราคาต่อท่าน • รวมทุกอย่าง • ไม่มีค่าใช้จ่ายแอบแฝง</p>
            
            {/* Price Benefits */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-1 text-green-600">
                <CheckCircle className="w-3 h-3" />
                <span>ประกันเดินทาง</span>
              </div>
              <div className="flex items-center gap-1 text-green-600">
                <CheckCircle className="w-3 h-3" />
                <span>ยกเลิกฟรี 7 วัน</span>
              </div>
            </div>
          </div>

          {/* Group Size & Date Selection */}
          <div className="grid grid-cols-1 gap-4 mb-6">
            {/* Travelers Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                จำนวนผู้เดินทาง
              </label>
              <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-3">
                <button
                  onClick={() => setTravelers(Math.max(1, travelers - 1))}
                  className="w-8 h-8 bg-white rounded-lg shadow-sm flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <span className="text-lg font-bold text-gray-600">−</span>
                </button>
                <div className="flex-1 text-center">
                  <span className="text-xl font-bold text-gray-900">{travelers}</span>
                  <span className="text-sm text-gray-600 ml-1">ท่าน</span>
                </div>
                <button
                  onClick={() => setTravelers(travelers + 1)}
                  className="w-8 h-8 bg-white rounded-lg shadow-sm flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <span className="text-lg font-bold text-gray-600">+</span>
                </button>
              </div>
            </div>

            {/* Date Selection */}
            {tour.departureDates && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  วันเดินทาง
                </label>
                <div className="space-y-2">
                  {tour.departureDates.map((date, index) => (
                    <div 
                      key={index}
                      className={`flex items-center justify-between p-3 border rounded-xl cursor-pointer transition-all ${
                        selectedDate === date.date 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedDate(date.date)}
                    >
                      <div>
                        <div className="font-medium text-gray-900">{date.date}</div>
                        <div className="text-xs text-gray-500">เหลือ {date.seats} ที่นั่ง</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-blue-600">฿{date.price.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">ต่อท่าน</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* 🎯 ENHANCED PRIMARY CTA BUTTON */}
          <button
            onClick={handleBooking}
            disabled={isSubmitting}
            className="w-full py-4 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-0.5 disabled:opacity-50 flex items-center justify-center gap-3"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                กำลังดำเนินการ...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                จองทัวร์เลย • รับส่วนลดทันที
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
          
          {/* Trust Signals */}
          <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Shield className="w-3 h-3" />
              <span>ชำระเงินปลอดภัย</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              <span>รับประกันความพึงพอใจ</span>
            </div>
          </div>
        </div>

        {/* 📑 ENHANCED CONTENT TABS */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Enhanced Tab Navigation */}
          <div className="flex overflow-x-auto border-b border-gray-200 bg-gray-50">
            {[
              { id: 'overview', label: 'ภาพรวม', icon: Eye, count: null },
              { id: 'itinerary', label: 'โปรแกรม', icon: Calendar, count: tour.itinerary?.length },
              { id: 'includes', label: 'รวม/ไม่รวม', icon: CheckCircle, count: null },
              { id: 'reviews', label: 'รีวิว', icon: Star, count: tour.reviews },
              { id: 'contact', label: 'ติดต่อ', icon: Phone, count: null }
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-4 text-sm font-medium whitespace-nowrap transition-all relative ${
                    activeTab === tab.id
                      ? 'text-blue-600 bg-white border-b-3 border-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-white/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  {tab.count && (
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                      activeTab === tab.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
          
          {/* Enhanced Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-blue-600" />
                    ทำไมต้องเลือกทัวร์นี้?
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">{tour.overview}</p>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-200">
                  <h4 className="font-bold text-gray-900 mb-4">จุดเด่นสำคัญ</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {tour.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-gray-800 font-medium">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-5 text-center border border-blue-200">
                    <div className="text-3xl mb-3">✈️</div>
                    <div className="font-bold text-gray-900">{tour.airline}</div>
                    <div className="text-sm text-gray-600">สายการบินชั้นนำ</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-5 text-center border border-purple-200">
                    <div className="text-3xl mb-3">🏨</div>
                    <div className="font-bold text-gray-900">{tour.hotel}</div>
                    <div className="text-sm text-gray-600">โรงแรมคุณภาพ</div>
                  </div>
                </div>

                {/* Awards & Certifications */}
                {tour.awards && (
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-5 border border-yellow-200">
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <Award className="w-5 h-5 text-yellow-600" />
                      รางวัลและการรับรอง
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {tour.awards.map((award, index) => (
                        <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">
                          <Award className="w-3 h-3 text-yellow-500" />
                          {award}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'itinerary' && (
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    รายละเอียดโปรแกรม {tour.duration}
                  </h3>
                  {tour.itinerary && tour.itinerary.length > 3 && (
                    <button
                      onClick={() => setShowFullItinerary(!showFullItinerary)}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      {showFullItinerary ? 'ย่อโปรแกรม' : 'ดูทั้งหมด'}
                    </button>
                  )}
                </div>
                
                <div className="space-y-4">
                  {tour.itinerary?.slice(0, showFullItinerary ? undefined : 3).map((day, index) => (
                    <div key={day.day} className="border border-gray-200 rounded-2xl p-5 hover:shadow-md transition-shadow bg-gradient-to-r from-gray-50 to-white">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg flex-shrink-0">
                          {day.day}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 text-lg">{day.title}</h4>
                          {day.hotel && (
                            <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                              <Bed className="w-3 h-3" />
                              {day.hotel}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-3 ml-16">
                        {day.activities.map((activity, actIndex) => (
                          <div key={actIndex} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">{activity}</span>
                          </div>
                        ))}
                        
                        {day.meals && (
                          <div className="bg-blue-50 rounded-xl p-3 border border-blue-200">
                            <h5 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                              <Utensils className="w-4 h-4" />
                              มื้ออาหาร
                            </h5>
                            <div className="flex flex-wrap gap-2">
                              {day.meals.map((meal, mealIndex) => (
                                <span key={mealIndex} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                                  {meal}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                {!showFullItinerary && tour.itinerary && tour.itinerary.length > 3 && (
                  <div className="text-center py-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                    <span className="text-gray-600">และอีกมากมายในโปรแกรมเต็ม...</span>
                    <button
                      onClick={() => setShowFullItinerary(true)}
                      className="block mx-auto mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      ดูโปรแกรมทั้งหมด
                    </button>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'includes' && (
              <div className="space-y-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  รายละเอียดราคาทัวร์
                </h3>
                
                {/* Enhanced Includes */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-5 border border-green-200">
                  <h4 className="font-bold text-green-800 mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    ราคารวมแล้ว
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    {tour.includes.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-green-800 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Enhanced Excludes */}
                <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-5 border border-red-200">
                  <h4 className="font-bold text-red-800 mb-4 flex items-center gap-2">
                    <X className="w-5 h-5" />
                    ราคาไม่รวม
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    {tour.excludes?.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <span className="text-red-800 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Group Size Info */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-200">
                  <h4 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    ข้อมูลกรุ๊ปทัวร์
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-3">
                      <div className="text-sm text-gray-600">ขนาดกรุ๊ป</div>
                      <div className="font-bold text-blue-800">{tour.groupSize?.min} - {tour.groupSize?.max} ท่าน</div>
                    </div>
                    <div className="bg-white rounded-xl p-3">
                      <div className="text-sm text-gray-600">ที่นั่งทั้งหมด</div>
                      <div className="font-bold text-blue-800">{tour.totalSeats} ท่าน</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    รีวิวจากลูกค้า ({tour.reviews} รีวิว)
                  </h3>
                  <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-orange-100 px-3 py-2 rounded-xl border border-yellow-200">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-lg text-gray-900">{tour.rating}</span>
                  </div>
                </div>
                
                {/* Rating Breakdown */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-5 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-4">คะแนนรีวิวโดยรวม</h4>
                  <div className="space-y-3">
                    {[5,4,3,2,1].map((star) => (
                      <div key={star} className="flex items-center gap-3">
                        <span className="text-sm text-gray-600 w-8">{star} ดาว</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full" 
                            style={{ width: `${star === 5 ? 75 : star === 4 ? 20 : star === 3 ? 3 : star === 2 ? 1 : 1}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 w-8">{star === 5 ? '75%' : star === 4 ? '20%' : '3%'}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Sample Reviews */}
                <div className="space-y-4">
                  {sampleReviews.slice(0, showAllReviews ? undefined : 2).map((review) => (
                    <div key={review.id} className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xl">
                          {review.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-semibold text-gray-900">{review.name}</h5>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating 
                                      ? 'fill-yellow-400 text-yellow-400' 
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            {review.images > 0 && (
                              <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full flex items-center gap-1">
                                <Camera className="w-3 h-3" />
                                {review.images} รูป
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-3 leading-relaxed">{review.comment}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <button className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors">
                          <ThumbsUp className="w-4 h-4" />
                          มีประโยชน์ ({review.helpful})
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                {sampleReviews.length > 2 && (
                  <div className="text-center">
                    <button
                      onClick={() => setShowAllReviews(!showAllReviews)}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all"
                    >
                      {showAllReviews ? 'ดูน้อยลง' : `ดูรีวิวทั้งหมด (${tour.reviews} รีวิว)`}
                    </button>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'contact' && (
              <div className="space-y-6">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-blue-600" />
                  ติดต่อสอบถามข้อมูลเพิ่มเติม
                </h3>
                
                <div className="grid grid-cols-1 gap-4">
                  <a href="tel:021234567" className="flex items-center gap-4 p-5 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl border border-blue-200 hover:shadow-lg transition-all group active:scale-95">
                    <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg">
                      <Phone className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">โทร 02-123-4567</div>
                      <div className="text-sm text-gray-600">เปิดบริการ 08:00-20:00 น. • ปรึกษาฟรี</div>
                      <div className="text-xs text-blue-600 mt-1">📞 กดเพื่อโทรเลย</div>
                    </div>
                  </a>
                  
                  <a href="https://line.me/ti/p/@tourwow" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-5 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl border border-green-200 hover:shadow-lg transition-all group active:scale-95">
                    <div className="w-14 h-14 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl flex items-center justify-center shadow-lg">
                      <MessageCircle className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-gray-900 text-lg group-hover:text-green-600 transition-colors">LINE: @tourwow</div>
                      <div className="text-sm text-gray-600">ตอบกลับรวดเร็ว 24/7 • สะดวกทุกที่</div>
                      <div className="text-xs text-green-600 mt-1">💬 แชทเลย</div>
                    </div>
                  </a>

                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-5 border border-gray-200">
                    <h4 className="font-bold text-gray-900 mb-3">ช่วงเวลาที่แนะนำในการติดต่อ</h4>
                    <div className="space-y-2 text-sm text-gray-700">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span><strong>จันทร์-ศุกร์:</strong> 08:00-20:00 น.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span><strong>เสาร์-อาทิตย์:</strong> 09:00-18:00 น.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* 🔒 ENHANCED STICKY BOTTOM CTA */}
      <div className="sticky bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 px-4 py-4 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <div className="text-xs text-gray-500">เริ่มต้น</div>
              <span className="bg-red-500 text-white px-2 py-0.5 rounded text-xs font-bold">
                -{savingsPercent}%
              </span>
            </div>
            <div className="text-lg font-bold text-blue-600">
              ฿{tour.price.toLocaleString()}
            </div>
          </div>
          <button
            onClick={handleBooking}
            disabled={isSubmitting}
            className="flex-1 max-w-xs py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                จอง...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                จองเลย
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Enhanced Booking Modal */}
      {showBookingModal && (
        <BookingModal
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
          onConfirm={handleBookingSubmit}
          tourSummary={{
            tourName: tour.title,
            dateRange: selectedDate || tour.departureDate,
            pricePerPerson: tour.price,
            travelerCount: travelers,
            totalAmount: tour.price * travelers
          }}
          isGuestBooking={true}
        />
      )}
    </div>
  )
}