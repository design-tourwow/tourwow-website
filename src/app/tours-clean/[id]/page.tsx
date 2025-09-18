'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// Minimalist Clean Icons
const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg className={`w-4 h-4 ${filled ? 'text-amber-400' : 'text-gray-300'}`} fill={filled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
)

const ClockIcon = () => (
  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const CalendarIcon = () => (
  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
)

const LocationIcon = () => (
  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const PeopleIcon = () => (
  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
)

const PlaneIcon = () => (
  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 18h18M8 5l4 4 4-4v12l-4-4-4 4V5z" />
  </svg>
)

const CheckIcon = () => (
  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

const XIcon = () => (
  <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

// Additional icons for the fourth tab
const DocumentIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
)

const InfoIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const CalendarCheckIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const ArrowLeftIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
  </svg>
)

const ShareIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
  </svg>
)

const HeartIcon = ({ filled }: { filled: boolean }) => (
  <svg className={`w-5 h-5 ${filled ? 'text-red-500 fill-current' : 'text-gray-400'}`} fill={filled ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
)

// Clean, minimal tour data structure
interface TourDetail {
  id: string
  name: string
  country: string
  duration: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  images: string[]
  tags: string[]
  transportation: string
  highlights: string[]
  description: string
  itinerary: Array<{
    day: number
    title: string
    activities: string[]
  }>
  includes: string[]
  excludes: string[]
  dates: Array<{
    startDate: string
    endDate: string
    price: number
    available: number
  }>
}

const mockTourDetail: TourDetail = {
  id: "jp001",
  name: "ทัวร์ญี่ปุ่น โตเกียว โอซาก้า ฟูจิซัง",
  country: "ญี่ปุ่น",
  duration: "6 วัน 4 คืน",
  price: 49900,
  originalPrice: 59900,
  rating: 4.8,
  reviews: 245,
  images: [
    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800&h=600&fit=crop"
  ],
  tags: ["ยอดนิยม", "ราคาดี"],
  transportation: "การบินไทย",
  highlights: ["ภูเขาฟูจิ", "วัดเซนโซะจิ", "ดิสนีย์แลนด์", "สถานีชิบุยะ", "ตลาดปลาสึกิจิ"],
  description: "สัมผัสความงดงามของญี่ปุ่นในฤดูใบไม้เปลี่ยนสี เยือนสถานที่สำคัญทั้งในโตเกียวและโอซาก้า ชมความยิ่งใหญ่ของภูเขาฟูจิ และสนุกสนานกับดิสนีย์แลนด์ พร้อมกับสัมผัสวัฒนธรรมแบบดั้งเดิมของญี่ปุ่น",
  itinerary: [
    {
      day: 1,
      title: "เดินทางสู่โตเกียว",
      activities: [
        "เดินทางจากสนามบินสุวรรณภูมิ",
        "ถึงสนามบินนาริตะ",
        "เช็คอินโรงแรม",
        "เที่ยวชมย่านฮาราจุกุ",
        "พักผ่อนในโตเกียว"
      ]
    },
    {
      day: 2,
      title: "สำรวจโตเกียว",
      activities: [
        "เยือนวัดเซนโซะจิ",
        "ช้อปปิ้งที่ย่านกินซ่า",
        "เที่ยวชมสวนอิมพีเรียล",
        "ขึ้นหอคอยโตเกียวสกายทรี",
        "ทานอาหารเย็นแบบญี่ปุ่น"
      ]
    },
    {
      day: 3,
      title: "ภูเขาฟูจิ",
      activities: [
        "เดินทางสู่ภูเขาฟูจิ",
        "ถ่ายรูปกับภูเขาฟูจิ",
        "เยือนทะเลสาบคาวากุจิโกะ",
        "ช้อปปิ้งที่เอาท์เล็ต",
        "กลับโตเกียว"
      ]
    },
    {
      day: 4,
      title: "ดิสนีย์แลนด์",
      activities: [
        "ทั้งวันที่ดิสนีย์แลนด์",
        "เล่นเครื่องเล่น",
        "ชมพาเหรด",
        "ถ่ายรูปกับตัวละคร",
        "ช้อปปิ้งของที่ระลึก"
      ]
    },
    {
      day: 5,
      title: "โอซาก้า",
      activities: [
        "เดินทางสู่โอซาก้า",
        "เยือนปราสาทโอซาก้า",
        "เที่ยวชมย่านโดทงโบริ",
        "ทานอาหารพื้นเมือง",
        "ช้อปปิ้ง"
      ]
    },
    {
      day: 6,
      title: "เดินทางกลับ",
      activities: [
        "ช้อปปิ้งของฝาก",
        "เดินทางกลับประเทศไทย",
        "ถึงสนามบินสุวรรณภูมิ"
      ]
    }
  ],
  includes: [
    "ตั๋วเครื่องบินไป-กลับ",
    "ที่พักโรงแรม 4 ดาว",
    "อาหารตามรายการ",
    "รถโค้ชปรับอากาศ",
    "ไกด์ท้องถิ่น",
    "ประกันการเดินทาง",
    "ค่าธรรมเนียมวีซ่า",
    "บัตรเข้าสถานที่ท่องเที่ยว"
  ],
  excludes: [
    "ค่าใช้จ่ายส่วนตัว",
    "ค่าทิปไกด์และคนขับ",
    "อาหารนอกรายการ",
    "ค่าเครื่องดื่มแอลกอฮอล์",
    "ค่าโทรศัพท์ระหว่างประเทศ",
    "ค่ารักษาพยาบาล"
  ],
  dates: [
    {
      startDate: "2024-03-15",
      endDate: "2024-03-20",
      price: 49900,
      available: 12
    },
    {
      startDate: "2024-03-22",
      endDate: "2024-03-27",
      price: 52900,
      available: 8
    },
    {
      startDate: "2024-04-05",
      endDate: "2024-04-10",
      price: 47900,
      available: 15
    }
  ]
}

export default function TourCleanDetailPage() {
  const params = useParams()
  const [tour, setTour] = useState<TourDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [guests, setGuests] = useState(2)
  const [isFavorited, setIsFavorited] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    // Simulate loading tour data
    setTimeout(() => {
      setTour(mockTourDetail)
      setLoading(false)
    }, 800)
  }, [params])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent mb-4"></div>
          <p className="text-gray-600 text-sm">กำลังโหลดรายละเอียดทัวร์...</p>
        </div>
      </div>
    )
  }

  if (!tour) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light text-gray-900 mb-4">ไม่พบทัวร์ที่คุณต้องการ</h1>
          <Link href="/tours-clean" className="text-blue-600 hover:text-blue-700 font-medium">
            กลับไปหน้าทัวร์ทั้งหมด
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Clean Navigation */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/tours-clean"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors font-medium"
            >
              <ArrowLeftIcon />
              <span>กลับไปหน้าทัวร์</span>
            </Link>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsFavorited(!isFavorited)}
                  className="p-2 rounded-full hover:bg-gray-50 transition-colors"
                >
                  <HeartIcon filled={isFavorited} />
                </button>
                <button 
                  onClick={() => setShowShareModal(true)}
                  className="p-2 rounded-full hover:bg-gray-50 transition-colors"
                >
                  <ShareIcon />
                </button>
              </div>
              
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">฿{tour.price.toLocaleString()}</div>
                <div className="text-sm text-gray-500">ต่อท่าน</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image Gallery */}
      <div className="relative h-[60vh] bg-gray-100">
        <Image
          src={tour.images[selectedImageIndex]}
          alt={tour.name}
          fill
          className="object-cover"
        />
        
        {/* Image Navigation */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="flex gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2">
            {tour.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  selectedImageIndex === index ? 'bg-blue-600 w-6' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Image Arrows */}
        <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
          <button
            onClick={() => setSelectedImageIndex(selectedImageIndex > 0 ? selectedImageIndex - 1 : tour.images.length - 1)}
            className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
          >
            <ArrowLeftIcon />
          </button>
        </div>
        <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
          <button
            onClick={() => setSelectedImageIndex(selectedImageIndex < tour.images.length - 1 ? selectedImageIndex + 1 : 0)}
            className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Tour Information */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Title and Basic Info */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {tour.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <h1 className="text-3xl font-light text-gray-900 mb-6 leading-tight">{tour.name}</h1>
              
              <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <LocationIcon />
                  <span>{tour.country}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ClockIcon />
                  <span>{tour.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <PlaneIcon />
                  <span>{tour.transportation}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} filled={i < Math.floor(tour.rating)} />
                  ))}
                </div>
                <span className="font-medium text-gray-900">{tour.rating}</span>
                <span className="text-gray-500">({tour.reviews} รีวิว)</span>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-8 shadow-sm">
              <div 
                className="flex border-b border-gray-200 overflow-x-auto scrollbar-hide"
                style={{ WebkitOverflowScrolling: 'touch' }}
              >
                {[
                  { id: 'overview', label: 'ภาพรวม', icon: <DocumentIcon /> },
                  { id: 'itinerary', label: 'รายการเดินทาง', icon: <CalendarIcon /> },
                  { id: 'includes', label: 'รวม/ไม่รวม', icon: <CheckIcon /> },
                  { id: 'terms', label: 'เงื่อนไข', icon: <InfoIcon /> }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 text-center font-medium transition-all duration-300 whitespace-nowrap border-b-2 flex-shrink-0 ${
                      activeTab === tab.id
                        ? 'border-blue-600 text-blue-600 bg-blue-50 shadow-sm'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="space-y-8">
              {activeTab === 'overview' && (
                <div>
                  <div className="prose prose-gray max-w-none mb-8">
                    <p className="text-gray-700 leading-relaxed text-lg">{tour.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-medium text-gray-900 mb-6">จุดเด่นของทัวร์</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {tour.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                          <CheckIcon />
                          <span className="text-gray-700">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'itinerary' && (
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-6">รายการเดินทาง</h3>
                  <div className="space-y-6">
                    {tour.itinerary.map((day) => (
                      <div key={day.day} className="flex gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-semibold">
                          {day.day}
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-medium text-gray-900 mb-3">{day.title}</h4>
                          <ul className="space-y-2">
                            {day.activities.map((activity, index) => (
                              <li key={index} className="text-gray-600 text-sm flex items-start gap-2">
                                <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 flex-shrink-0"></span>
                                <span>{activity}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'includes' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4 text-green-700">ราคารวม</h3>
                    <div className="space-y-3">
                      {tour.includes.map((item, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckIcon />
                          <span className="text-gray-700 text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4 text-red-600">ราคาไม่รวม</h3>
                    <div className="space-y-3">
                      {tour.excludes.map((item, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <XIcon />
                          <span className="text-gray-700 text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'terms' && (
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-6">เกี่ยวกับรายละเอียดและเงื่อนไข</h3>
                  
                  {/* Terms and Conditions Sections */}
                  <div className="space-y-6">
                    {/* Booking Terms */}
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <h4 className="text-lg font-medium text-blue-800 mb-3 flex items-center gap-2">
                        <DocumentIcon />
                        เงื่อนไขการจอง
                      </h4>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-blue-600 mt-2 flex-shrink-0"></span>
                          <span className="text-sm">ท่านสามารถจองทัวร์ล่วงหน้าขั้นต่ำ 30 วัน ก่อนเดินทาง</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-blue-600 mt-2 flex-shrink-0"></span>
                          <span className="text-sm">มัดจำ 50% ของราคาทัวร์ต่อท่าน ภายใน 3 วัน หลังจากจอง</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-blue-600 mt-2 flex-shrink-0"></span>
                          <span className="text-sm">ชำระส่วนที่เหลือ 15 วัน ก่อนเดินทาง</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-blue-600 mt-2 flex-shrink-0"></span>
                          <span className="text-sm">หากไม่ชำระเงินตามกำหนด บริษัทขอสงวนสิทธิ์ยกเลิกการจอง</span>
                        </li>
                      </ul>
                    </div>

                    {/* Cancellation Policy */}
                    <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                      <h4 className="text-lg font-medium text-orange-800 mb-3 flex items-center gap-2">
                        <CalendarCheckIcon />
                        นโยบายการยกเลิก
                      </h4>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-orange-600 mt-2 flex-shrink-0"></span>
                          <span className="text-sm">ยกเลิก 45-31 วัน ก่อนเดินทาง เก็บค่าใช้จ่าย 25% ของราคาทัวร์</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-orange-600 mt-2 flex-shrink-0"></span>
                          <span className="text-sm">ยกเลิก 30-15 วัน ก่อนเดินทาง เก็บค่าใช้จ่าย 50% ของราคาทัวร์</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-orange-600 mt-2 flex-shrink-0"></span>
                          <span className="text-sm">ยกเลิก 14-8 วัน ก่อนเดินทาง เก็บค่าใช้จ่าย 75% ของราคาทัวร์</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-orange-600 mt-2 flex-shrink-0"></span>
                          <span className="text-sm">ยกเลิก 7 วัน หรือน้อยกว่า เก็บค่าใช้จ่าย 100% ของราคาทัวร์</span>
                        </li>
                      </ul>
                    </div>

                    {/* Travel Requirements */}
                    <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                      <h4 className="text-lg font-medium text-purple-800 mb-3 flex items-center gap-2">
                        <DocumentIcon />
                        เอกสารและข้อกำหนด
                      </h4>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-purple-600 mt-2 flex-shrink-0"></span>
                          <span className="text-sm">หนังสือเดินทางต้องมีอายุคงเหลือไม่น้อยกว่า 6 เดือน</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-purple-600 mt-2 flex-shrink-0"></span>
                          <span className="text-sm">วีซ่าจะดำเนินเอง โดยบริษัทจะรวมค่าธรรมเนียมไว้ในราคาแล้ว</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-purple-600 mt-2 flex-shrink-0"></span>
                          <span className="text-sm">ต้องมีเงินฝากธนาคารไม่น้อยกว่า 100,000 บาท หรือตามที่สถานทูตกำหนด</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-purple-600 mt-2 flex-shrink-0"></span>
                          <span className="text-sm">ผู้เดินทางที่มีอายุต่ำกว่า 20 ปี ต้องมีผู้ปกครองร่วมเดินทาง</span>
                        </li>
                      </ul>
                    </div>

                    {/* Health & Safety */}
                    <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                      <h4 className="text-lg font-medium text-green-800 mb-3 flex items-center gap-2">
                        <CheckIcon />
                        สุขภาพและความปลอดภัย
                      </h4>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-green-600 mt-2 flex-shrink-0"></span>
                          <span className="text-sm">ผู้เดินทางต้องมีสุขภาพสมบูรณ์แข็งแรง ไม่เป็นโรคติดต่อร้ายแรง</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-green-600 mt-2 flex-shrink-0"></span>
                          <span className="text-sm">หญิงมีครรภ์ควรปรึกษาแพทย์ก่อนเดินทาง</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-green-600 mt-2 flex-shrink-0"></span>
                          <span className="text-sm">ผู้สูงอายุควรปรึกษาแพทย์และแจ้งให้ทราบล่วงหน้า</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-green-600 mt-2 flex-shrink-0"></span>
                          <span className="text-sm">บริษัทจัดประกันการเดินทางให้ครอบคลุม 1,000,000 บาท</span>
                        </li>
                      </ul>
                    </div>

                    {/* Important Notes */}
                    <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                      <h4 className="text-lg font-medium text-red-800 mb-3 flex items-center gap-2">
                        <InfoIcon />
                        ข้อสำคัญที่ต้องทราบ
                      </h4>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-red-600 mt-2 flex-shrink-0"></span>
                          <span className="text-sm">รายการทัวร์อาจมีการเปลี่ยนแปลงตามความเหมาะสม เนื่องจากสภาพอากาศ การจราจร การเมือง หรือเหตุสุดวิสัย</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-red-600 mt-2 flex-shrink-0"></span>
                          <span className="text-sm">บริษัทไม่รับผิดชอบค่าใช้จ่ายส่วนเกินจากการล่าช้าของเที่ยวบิน</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-red-600 mt-2 flex-shrink-0"></span>
                          <span className="text-sm">กรณีวีซ่าไม่ผ่าน บริษัทคืนเงินหักค่าดำเนินการ 3,000 บาท</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-red-600 mt-2 flex-shrink-0"></span>
                          <span className="text-sm">ผู้เดินทางต้องปฏิบัติตามกฎระเบียบและคำแนะนำของไกด์ตลอดการเดินทาง</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="sticky top-24 h-fit">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              {/* Price */}
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-2 mb-1">
                  {tour.originalPrice && (
                    <span className="text-gray-400 line-through text-sm">
                      ฿{tour.originalPrice.toLocaleString()}
                    </span>
                  )}
                  <span className="text-3xl font-bold text-gray-900">
                    ฿{tour.price.toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-500 text-sm">ต่อท่าน</p>
              </div>

              {/* Date Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">เลือกวันเดินทาง</label>
                <div className="space-y-2">
                  {tour.dates.map((date, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedDate(date.startDate)}
                      className={`cursor-pointer p-3 border rounded-lg transition-all ${
                        selectedDate === date.startDate
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium text-gray-900 text-sm">
                            {new Date(date.startDate).toLocaleDateString('th-TH', { 
                              day: 'numeric', 
                              month: 'short',
                              year: 'numeric'
                            })}
                          </div>
                          <div className="text-xs text-gray-500">
                            เหลือ {date.available} ที่นั่ง
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-gray-900">
                            ฿{date.price.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Guest Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">จำนวนผู้เดินทาง</label>
                <div className="flex items-center justify-center gap-4 bg-gray-50 rounded-lg p-3">
                  <button
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    className="w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    -
                  </button>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{guests}</div>
                    <div className="text-xs text-gray-500">ท่าน</div>
                  </div>
                  <button
                    onClick={() => setGuests(guests + 1)}
                    className="w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Total Price */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium">ราคารวม</span>
                  <span className="text-2xl font-bold text-gray-900">
                    ฿{(tour.price * guests).toLocaleString()}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {guests} ท่าน × ฿{tour.price.toLocaleString()}
                </div>
              </div>

              {/* Book Button */}
              <button 
                disabled={!selectedDate}
                className={`w-full py-3 rounded-lg font-medium transition-all ${
                  selectedDate
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                {selectedDate ? 'จองทัวร์นี้' : 'เลือกวันเดินทางก่อน'}
              </button>

              {/* Contact */}
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                  สอบถามเพิ่มเติม: 02-674-1500
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">แชร์ทัวร์นี้</h3>
              <button 
                onClick={() => setShowShareModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <XIcon />
              </button>
            </div>
            
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition-colors">
                <span>แชร์ผ่าน LINE</span>
              </button>
              
              <button className="w-full flex items-center gap-3 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors">
                <span>แชร์ผ่าน Facebook</span>
              </button>
              
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-600 text-sm mb-2">คัดลอกลิงก์</p>
                <div className="flex items-center gap-2">
                  <input 
                    type="text" 
                    value={typeof window !== 'undefined' ? `${window.location.origin}/tours-clean/${tour.id}` : ''}
                    readOnly
                    className="flex-1 bg-white border border-gray-200 rounded px-3 py-2 text-sm"
                  />
                  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm">
                    คัดลอก
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}