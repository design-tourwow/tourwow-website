'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// Custom icons - no shared components
const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg className={`w-5 h-5 ${filled ? 'text-yellow-400' : 'text-slate-400'}`} fill={filled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
)

const ClockIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const CalendarIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
)

const LocationIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const PeopleIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
)

const PlaneIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 18h18M8 5l4 4 4-4v12l-4-4-4 4V5z" />
  </svg>
)

const BusIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 17a2 2 0 100-4 2 2 0 000 4zM16 17a2 2 0 100-4 2 2 0 000 4zM5 8h14a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2V10a2 2 0 012-2zM5 8V6a2 2 0 012-2h10a2 2 0 012 2v2" />
  </svg>
)

const ShareIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
  </svg>
)

const HeartIcon = ({ filled }: { filled: boolean }) => (
  <svg className={`w-5 h-5 ${filled ? 'text-red-400 fill-current' : 'text-slate-300'}`} fill={filled ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
)

const MapIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
  </svg>
)

const DownloadIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
)

const CheckIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

const ArrowLeftIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
)

// Mock tour data - same as in tours-new page
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
  name: "ทัวร์ญี่ปุ่น โตเกียว โอซาก้า ฟูจิซัง 6 วัน 4 คืน",
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
  tags: ["ยอดนิยม", "ประหยัด"],
  transportation: "การบินไทย",
  highlights: ["ภูเขาฟูจิ", "วัดเซนโซะจิ", "ดิสนีย์แลนด์", "สถานีชิบุยะ", "ตลาดปลาสึกิจิ"],
  description: "สัมผัสความงดงามของญี่ปุ่นในฤดูใบไม้เปลี่ยนสี เยือนสถานที่สำคัญทั้งในโตเกียวและโอซาก้า ชมความยิ่งใหญ่ของภูเขาฟูจิ และสนุกสนานกับดิสนีย์แลนด์ พร้อมกับสัมผัสวัฒนธรรมแบบดั้งเดิมของญี่ปุ่น",
  itinerary: [
    {
      day: 1,
      title: "วันแรก - เดินทางสู่โตเกียว",
      activities: [
        "เดินทางจากสนามบินสุวรรณภูมิ เที่ยวบิน TG 640 เวลา 01:15 น.",
        "ถึงสนามบินนาริตะ เวลา 08:45 น. (เวลาท้องถิ่น)",
        "เช็คอินโรงแรม และพักผ่อน",
        "เที่ยวชมย่านฮาราจุกุ และย่านชิบุยะ",
        "ค่ำคืนแรกในโตเกียว"
      ]
    },
    {
      day: 2,
      title: "วันที่สอง - สำรวจโตเกียว",
      activities: [
        "เยือนวัดเซนโซะจิ ย่านอาซากุสะ",
        "ช้อปปิ้งที่ย่านกินซ่า",
        "เที่ยวชมสวนอิมพีเรียล",
        "ขึ้นหอคอยโตเกียวสกายทรี",
        "ทานอาหารเย็นแบบญี่ปุ่นแท้"
      ]
    },
    {
      day: 3,
      title: "วันที่สาม - ภูเขาฟูจิ",
      activities: [
        "เดินทางสู่ภูเขาฟูจิ ชั้น 5",
        "ถ่ายรูปกับภูเขาฟูจิ",
        "เยือนทะเลสาบคาวากุจิโกะ",
        "แวะช้อปปิ้งที่เอาท์เล็ต โกเท็มบะ",
        "กลับโตเกียวในตอนเย็น"
      ]
    },
    {
      day: 4,
      title: "วันที่สี่ - ดิสนีย์แลนด์",
      activities: [
        "วันเต็มที่ดิสนีย์แลนด์ โตเกียว",
        "เล่นเครื่องเล่นสุดโปรด",
        "ชมพาเหรดสุดอลังการ",
        "ถ่ายรูปกับตัวละครดิสนีย์",
        "ช้อปปิ้งของที่ระลึก"
      ]
    },
    {
      day: 5,
      title: "วันที่ห้า - โอซาก้า",
      activities: [
        "เดินทางสู่โอซาก้า ด้วยรถไฟชินคันเซน",
        "เยือนปราสาทโอซาก้า",
        "เที่ยวชมย่านโดทงโบริ",
        "ทานอาหารพื้นเมืองโอซาก้า",
        "ช้อปปิ้งที่ชิงไซบาชิสึจิ"
      ]
    },
    {
      day: 6,
      title: "วันสุดท้าย - เดินทางกลับ",
      activities: [
        "ช้อปปิ้งของฝากที่สนามบิน",
        "เดินทางกลับประเทศไทย เที่ยวบิน TG 623",
        "ถึงสนามบินสุวรรณภูมิ เวลา 23:55 น."
      ]
    }
  ],
  includes: [
    "ตั้วเครื่องบินไป-กลับ",
    "ที่พักโรงแรม 4 ดาว 4 คืน",
    "อาหาร 4 มื้อ ตามรายการ",
    "รถโค้ชปรับอากาศตลอดเส้นทาง",
    "ไกด์ท้องถิ่นคุณภาพ",
    "ประกันการเดินทาง 1,000,000 บาท",
    "ค่าธรรมเนียมวีซ่า",
    "บัตรเข้าสถานที่ท่องเที่ยวตามรายการ"
  ],
  excludes: [
    "ค่าใช้จ่ายส่วนตัว",
    "ค่าทิปไกด์และคนขับรถ",
    "อาหารนอกเหนือจากรายการ",
    "ค่าเครื่องดื่มแอลกอฮอล์",
    "ค่าโทรศัพท์ระหว่างประเทศ",
    "ค่ารักษาพยาบาลกรณีเจ็บป่วย"
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

export default function TourDetailPage() {
  const params = useParams()
  const [tour, setTour] = useState<TourDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [guests, setGuests] = useState(2)
  const [isFavorited, setIsFavorited] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [activeTab, setActiveTab] = useState('description')

  useEffect(() => {
    // Simulate loading tour data
    setTimeout(() => {
      setTour(mockTourDetail)
      setLoading(false)
    }, 1000)
  }, [params])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-cyan-400 border-t-transparent mb-4"></div>
          <p className="text-cyan-100 text-lg">กำลังโหลดรายละเอียดทัวร์...</p>
        </div>
      </div>
    )
  }

  if (!tour) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">ไม่พบทัวร์ที่คุณต้องการ</h1>
          <Link href="/tours-new" className="text-cyan-400 hover:text-cyan-300">
            กลับไปหน้าทัวร์ทั้งหมด
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Floating background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Sticky Navigation Bar */}
        <div className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/90 border-b border-white/10">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link 
                href="/tours-new"
                className="inline-flex items-center gap-2 text-slate-200 hover:text-cyan-300 transition-colors"
              >
                <ArrowLeftIcon />
                <span className="font-medium">กลับไปหน้าทัวร์</span>
              </Link>
              
              <div className="flex items-center gap-4">
                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setIsFavorited(!isFavorited)}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    <HeartIcon filled={isFavorited} />
                  </button>
                  <button 
                    onClick={() => setShowShareModal(true)}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    <ShareIcon />
                  </button>
                </div>
                
                <div className="flex items-center gap-2 text-cyan-300 font-bold">
                  <span className="text-lg">฿{tour.price.toLocaleString()}</span>
                  <span className="text-xs text-slate-400">ต่อท่าน</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section with Full-width Image */}
        <div id="gallery" className="relative h-[70vh] overflow-hidden">
          <Image
            src={tour.images[selectedImageIndex]}
            alt={tour.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          
          {/* Hero Content */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container mx-auto">
              <div className="max-w-4xl">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {tour.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="backdrop-blur-md bg-gradient-to-r from-cyan-500/80 to-purple-600/80 text-white text-sm font-medium px-4 py-2 rounded-full border border-white/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
                  {tour.name}
                </h1>
                
                <div className="flex flex-wrap items-center gap-6 text-slate-200 mb-6">
                  <div className="flex items-center gap-2">
                    <LocationIcon />
                    <span className="font-medium">{tour.country}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ClockIcon />
                    <span className="font-medium">{tour.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {tour.transportation.includes('รถทัวร์') ? <BusIcon /> : <PlaneIcon />}
                    <span className="font-medium">{tour.transportation}</span>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} filled={i < Math.floor(tour.rating)} />
                    ))}
                  </div>
                  <span className="text-cyan-300 font-bold text-xl">{tour.rating}</span>
                  <span className="text-slate-200">({tour.reviews} รีวิว)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Image Navigation */}
          <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
            <button
              onClick={() => setSelectedImageIndex(selectedImageIndex > 0 ? selectedImageIndex - 1 : tour.images.length - 1)}
              className="w-12 h-12 backdrop-blur-md bg-black/40 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors"
            >
              <ArrowLeftIcon />
            </button>
          </div>
          <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
            <button
              onClick={() => setSelectedImageIndex(selectedImageIndex < tour.images.length - 1 ? selectedImageIndex + 1 : 0)}
              className="w-12 h-12 backdrop-blur-md bg-black/40 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Image Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="flex gap-2">
              {tour.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    selectedImageIndex === index 
                      ? 'bg-cyan-400' 
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Tour Details */}
        <div className="container mx-auto px-6 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Tab Navigation */}
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl overflow-hidden">
                <div className="flex border-b border-white/20 overflow-x-auto scrollbar-hide" style={{ WebkitOverflowScrolling: 'touch' }}>
                  <button
                    onClick={() => setActiveTab('description')}
                    className={`flex items-center gap-2 px-6 py-4 text-center font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                      activeTab === 'description'
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14,2 14,8 20,8"/>
                      <line x1="16" y1="13" x2="8" y2="13"/>
                      <line x1="16" y1="17" x2="8" y2="17"/>
                      <polyline points="10,9 9,9 8,9"/>
                    </svg>
                    รายละเอียด
                  </button>
                  <button
                    onClick={() => setActiveTab('itinerary')}
                    className={`flex items-center gap-2 px-6 py-4 text-center font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                      activeTab === 'itinerary'
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                      <line x1="16" x2="16" y1="2" y2="6"/>
                      <line x1="8" x2="8" y1="2" y2="6"/>
                      <line x1="3" x2="21" y1="10" y2="10"/>
                    </svg>
                    รายการเดินทาง
                  </button>
                  <button
                    onClick={() => setActiveTab('includes')}
                    className={`flex items-center gap-2 px-6 py-4 text-center font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                      activeTab === 'includes'
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <polyline points="20,6 9,17 4,12"/>
                    </svg>
                    ราคารวม/ไม่รวม
                  </button>
                  <button
                    onClick={() => setActiveTab('terms')}
                    className={`flex items-center gap-2 px-6 py-4 text-center font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                      activeTab === 'terms'
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                      <path d="M12 17h.01"/>
                    </svg>
                    เงื่อนไข
                  </button>
                </div>
                
                <div className="p-8">
                  {activeTab === 'description' && (
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-6">รายละเอียดทัวร์</h2>
                      <p className="text-slate-200 leading-relaxed text-lg mb-8">{tour.description}</p>
                      
                      {/* Key Features */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-xl p-4 border border-cyan-400/30">
                          <div className="text-cyan-400 mb-2">⏱️</div>
                          <h4 className="text-white font-bold mb-1">{tour.duration}</h4>
                          <p className="text-slate-300 text-sm">ระยะเวลาเดินทาง</p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 rounded-xl p-4 border border-purple-400/30">
                          <div className="text-purple-400 mb-2">✈️</div>
                          <h4 className="text-white font-bold mb-1">{tour.transportation}</h4>
                          <p className="text-slate-300 text-sm">สายการบิน</p>
                        </div>
                        <div className="bg-gradient-to-br from-emerald-500/10 to-green-600/10 rounded-xl p-4 border border-emerald-400/30">
                          <div className="text-emerald-400 mb-2">⭐</div>
                          <h4 className="text-white font-bold mb-1">{tour.rating}/5.0</h4>
                          <p className="text-slate-300 text-sm">จาก {tour.reviews} รีวิว</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {activeTab === 'itinerary' && (
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-8">รายการเดินทาง</h2>
                      <div className="space-y-6">
                        {tour.itinerary.map((day) => (
                          <div key={day.day} className="relative group">
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform">
                                {day.day}
                              </div>
                              <div className="flex-grow bg-gradient-to-r from-white/5 to-transparent rounded-xl p-4 border border-white/10 group-hover:border-white/20 transition-all">
                                <h3 className="text-xl font-bold text-white mb-3">{day.title}</h3>
                                <ul className="space-y-2">
                                  {day.activities.map((activity, index) => (
                                    <li key={index} className="flex items-start gap-3 text-slate-300 hover:text-white transition-colors">
                                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                                      <span>{activity}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                            {day.day < tour.itinerary.length && (
                              <div className="absolute left-6 top-12 w-px h-12 bg-gradient-to-b from-cyan-400 to-purple-600"></div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {activeTab === 'includes' && (
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-8">ราคารวม/ไม่รวม</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Includes */}
                        <div className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 rounded-xl p-6 border border-green-400/30">
                          <h3 className="text-xl font-bold text-green-300 mb-4 flex items-center gap-2">
                            <CheckIcon />
                            ราคารวม
                          </h3>
                          <ul className="space-y-3">
                            {tour.includes.map((item, index) => (
                              <li key={index} className="flex items-start gap-3 text-slate-200">
                                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        {/* Excludes */}
                        <div className="bg-gradient-to-br from-red-500/10 to-orange-600/10 rounded-xl p-6 border border-red-400/30">
                          <h3 className="text-xl font-bold text-red-300 mb-4 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            ราคาไม่รวม
                          </h3>
                          <ul className="space-y-3">
                            {tour.excludes.map((item, index) => (
                              <li key={index} className="flex items-start gap-3 text-slate-200">
                                <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'terms' && (
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-8">เกี่ยวกับรายละเอียดและเงื่อนไข</h2>
                      
                      {/* Terms and Conditions Sections */}
                      <div className="space-y-8">
                        {/* Booking Terms */}
                        <div className="bg-gradient-to-br from-blue-500/10 to-indigo-600/10 rounded-xl p-6 border border-blue-400/30">
                          <h3 className="text-xl font-bold text-blue-300 mb-4 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            เงื่อนไขการจอง
                          </h3>
                          <ul className="space-y-3 text-slate-200">
                            <li className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span>ท่านสามารถจองทัวร์ล่วงหน้าขั้นต่ำ 30 วัน ก่อนเดินทาง</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span>มัดจำ 50% ของราคาทัวร์ต่อท่าน ภายใน 3 วัน หลังจากจอง</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span>ชำระส่วนที่เหลือ 15 วัน ก่อนเดินทาง</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span>หากไม่ชำระเงินตามกำหนด บริษัทขอสงวนสิทธิ์ยกเลิกการจอง</span>
                            </li>
                          </ul>
                        </div>

                        {/* Cancellation Policy */}
                        <div className="bg-gradient-to-br from-amber-500/10 to-orange-600/10 rounded-xl p-6 border border-amber-400/30">
                          <h3 className="text-xl font-bold text-amber-300 mb-4 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                            นโยบายการยกเลิก
                          </h3>
                          <ul className="space-y-3 text-slate-200">
                            <li className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span>ยกเลิก 45-31 วัน ก่อนเดินทาง เก็บค่าใช้จ่าย 25% ของราคาทัวร์</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span>ยกเลิก 30-15 วัน ก่อนเดินทาง เก็บค่าใช้จ่าย 50% ของราคาทัวร์</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span>ยกเลิก 14-8 วัน ก่อนเดินทาง เก็บค่าใช้จ่าย 75% ของราคาทัวร์</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span>ยกเลิก 7 วัน หรือน้อยกว่า เก็บค่าใช้จ่าย 100% ของราคาทัวร์</span>
                            </li>
                          </ul>
                        </div>

                        {/* Travel Requirements */}
                        <div className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 rounded-xl p-6 border border-purple-400/30">
                          <h3 className="text-xl font-bold text-purple-300 mb-4 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                            </svg>
                            เอกสารและข้อกำหนด
                          </h3>
                          <ul className="space-y-3 text-slate-200">
                            <li className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span>หนังสือเดินทางต้องมีอายุคงเหลือไม่น้อยกว่า 6 เดือน</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span>วีซ่าจะดำเนินเอง โดยบริษัทจะรวมค่าธรรมเนียมไว้ในราคาแล้ว</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span>ต้องมีเงินฝากธนาคารไม่น้อยกว่า 100,000 บาท หรือตามที่สถานทูตกำหนด</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span>ผู้เดินทางที่มีอายุต่ำกว่า 20 ปี ต้องมีผู้ปกครองร่วมเดินทาง</span>
                            </li>
                          </ul>
                        </div>

                        {/* Health & Safety */}
                        <div className="bg-gradient-to-br from-emerald-500/10 to-teal-600/10 rounded-xl p-6 border border-emerald-400/30">
                          <h3 className="text-xl font-bold text-emerald-300 mb-4 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            สุขภาพและความปลอดภัย
                          </h3>
                          <ul className="space-y-3 text-slate-200">
                            <li className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span>ผู้เดินทางต้องมีสุขภาพสมบูรณ์แข็งแรง ไม่เป็นโรคติดต่อร้ายแรง</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span>หญิงมีครรภ์ควรปรึกษาแพทย์ก่อนเดินทาง</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span>ผู้สูงอายุควรปรึกษาแพทย์และแจ้งให้ทราบล่วงหน้า</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span>บริษัทจัดประกันการเดินทางให้ครอบคลุม 1,000,000 บาท</span>
                            </li>
                          </ul>
                        </div>

                        {/* Important Notes */}
                        <div className="bg-gradient-to-br from-red-500/10 to-rose-600/10 rounded-xl p-6 border border-red-400/30">
                          <h3 className="text-xl font-bold text-red-300 mb-4 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            ข้อสำคัญที่ต้องทราบ
                          </h3>
                          <ul className="space-y-3 text-slate-200">
                            <li className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span>รายการทัวร์อาจมีการเปลี่ยนแปลงตามความเหมาะสม เนื่องจากสภาพอากาศ การจราจร การเมือง หรือเหตุสุดวิสัย</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span>บริษัทไม่รับผิดชอบค่าใช้จ่ายส่วนเกินจากการล่าช้าของเที่ยวบิน</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span>กรณีวีซ่าไม่ผ่าน บริษัทคืนเงินหักค่าดำเนินการ 3,000 บาท</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span>ผู้เดินทางต้องปฏิบัติตามกฎระเบียบและคำแนะนำของไกด์ตลอดการเดินทาง</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Highlights */}
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8">
                <h2 className="text-3xl font-bold text-white mb-8">จุดเด่นของทัวร์</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {tour.highlights.map((highlight, index) => (
                    <div 
                      key={index} 
                      className="relative group bg-gradient-to-br from-cyan-400/20 to-blue-600/20 border-cyan-400/50 rounded-2xl p-6 border-2 hover:scale-105 transition-all duration-300 cursor-pointer"
                    >
                      <div className="relative flex items-start gap-4">
                        <div className="text-3xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          ⭐
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-lg mb-2 group-hover:text-cyan-300 transition-colors">
                            {highlight}
                          </h3>
                          <p className="text-slate-300 text-sm leading-relaxed">
                            ประสบการณ์พิเศษที่คุณจะไม่ลืม
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sticky Booking Sidebar */}
            <div className="sticky top-24 h-fit">
              <div id="booking" className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
                {/* Price Header */}
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    {tour.originalPrice && (
                      <span className="text-lg text-slate-400 line-through">
                        ฿{tour.originalPrice.toLocaleString()}
                      </span>
                    )}
                    <span className="text-4xl font-black text-cyan-300">
                      ฿{tour.price.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-slate-300">ต่อท่าน</p>
                </div>

                {/* Date Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-bold text-slate-200 mb-4">เลือกวันเดินทาง</label>
                  <div className="space-y-3">
                    {tour.dates.map((date, index) => (
                      <div
                        key={index}
                        onClick={() => setSelectedDate(date.startDate)}
                        className={`relative cursor-pointer group transition-all duration-300 ${
                          selectedDate === date.startDate
                            ? 'ring-2 ring-cyan-400 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 border-cyan-400/50'
                            : 'hover:ring-1 hover:ring-white/30 bg-white/5 border-white/20'
                        } backdrop-blur-md border-2 rounded-2xl p-4`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className={`font-bold ${
                              selectedDate === date.startDate ? 'text-cyan-300' : 'text-white'
                            }`}>
                              {new Date(date.startDate).toLocaleDateString('th-TH', { 
                                day: 'numeric', 
                                month: 'short',
                                year: 'numeric'
                              })}
                            </div>
                            <div className="text-slate-300 text-sm">
                              เหลือ {date.available} ที่นั่ง
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`font-bold ${
                              selectedDate === date.startDate ? 'text-cyan-300' : 'text-white'
                            }`}>
                              ฿{date.price.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Guest Selection */}
                <div className="mb-8">
                  <label className="block text-sm font-bold text-slate-200 mb-3">จำนวนผู้เดินทาง</label>
                  <div className="flex items-center justify-center gap-6 bg-white/5 rounded-xl p-4 border border-white/10">
                    <button
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl hover:scale-105 transition-transform"
                    >
                      -
                    </button>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">{guests}</div>
                      <div className="text-xs text-slate-300">ท่าน</div>
                    </div>
                    <button
                      onClick={() => setGuests(guests + 1)}
                      className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl hover:scale-105 transition-transform"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Total Price */}
                <div className="bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-xl p-4 mb-6 border border-cyan-400/30">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-200 font-medium">ราคารวมทั้งหมด</span>
                    <span className="text-2xl font-black text-cyan-300">
                      ฿{(tour.price * guests).toLocaleString()}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    {guests} ท่าน × ฿{tour.price.toLocaleString()}
                  </div>
                </div>

                {/* Book Button */}
                <button 
                  disabled={!selectedDate}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all transform shadow-2xl mb-4 ${
                    selectedDate
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:from-cyan-600 hover:to-purple-700 hover:scale-105'
                      : 'bg-slate-600 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {selectedDate ? 'จองทัวร์นี้เลย' : 'เลือกวันเดินทางก่อน'}
                </button>

                {/* Contact Options */}
                <div className="space-y-2 text-sm">
                  <button className="w-full bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 transition-colors">
                    สอบถามผ่าน LINE
                  </button>
                  <button className="w-full bg-white/10 border border-white/20 text-slate-200 py-3 rounded-xl font-medium hover:bg-white/20 transition-colors">
                    โทรสอบถาม 02-674-1500
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-slate-800 border border-white/20 rounded-3xl p-8 max-w-md mx-4 w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">แชร์ทัวร์นี้</h3>
              <button 
                onClick={() => setShowShareModal(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <button className="w-full flex items-center gap-3 bg-green-600 text-white p-4 rounded-xl hover:bg-green-700 transition-colors">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold text-sm">LINE</span>
                </div>
                <span className="font-medium">แชร์ผ่าน LINE</span>
              </button>
              
              <button className="w-full flex items-center gap-3 bg-blue-600 text-white p-4 rounded-xl hover:bg-blue-700 transition-colors">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">FB</span>
                </div>
                <span className="font-medium">แชร์ผ่าน Facebook</span>
              </button>
              
              <div className="bg-slate-700 rounded-xl p-4">
                <p className="text-slate-300 text-sm mb-2">หรือคัดลอกลิงก์</p>
                <div className="flex items-center gap-2">
                  <input 
                    type="text" 
                    value={typeof window !== 'undefined' ? `${window.location.origin}/tours-new/${tour.id}` : ''}
                    readOnly
                    className="flex-1 bg-slate-600 text-white p-2 rounded text-sm"
                  />
                  <button className="bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-600 transition-colors text-sm">
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