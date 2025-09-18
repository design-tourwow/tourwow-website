'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Custom icons - Vibrant Playful style
const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg className={`w-4 h-4 ${filled ? 'text-yellow-400' : 'text-gray-300'}`} fill={filled ? "currentColor" : "none"} stroke={filled ? "none" : "currentColor"} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
)

const CalendarIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
)

const ClockIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const PeopleIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
)

const LocationIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const PlaneIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

const CheckIcon = () => (
  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
  </svg>
)

const ArrowLeftIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
)

const ShareIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
  </svg>
)

const HeartIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
)

const SparkleIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l1.5 6L12 8l-5.5 1L5 15l-1.5-6L0 8l5.5-1L5 3z" />
  </svg>
)

// Mock tour data
interface TourDate {
  id: string
  startDate: string
  endDate: string
  price: number
  originalPrice?: number
  available: number
  total: number
  badge?: string
}

interface Tour {
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
  itinerary: {
    day: number
    title: string
    description: string
    meals: string[]
    accommodation?: string
  }[]
  includes: string[]
  excludes: string[]
  dates: TourDate[]
}

const mockTour: Tour = {
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
    "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1528164344705-47542687000d?w=800&h=600&fit=crop"
  ],
  tags: ["ยอดนิยม", "ประหยัด"],
  transportation: "การบินไทย",
  highlights: ["ภูเขาฟูจิ", "วัดเซนโซะจิ", "ดิสนีย์แลนด์", "ตลาดปลาสึกิจิ", "ย่านชิบูยา", "ปราสาทโอซาก้า"],
  description: "สัมผัสเสน่ห์ญี่ปุ่นในแบบฉบับที่สมบูรณ์แบบ ตั้งแต่ความทันสมัยของโตเกียวไปจนถึงความงดงามของภูเขาฟูจิ และเมืองโบราณโอซาก้า ด้วยโปรแกรมที่คัดสรรมาอย่างพิถีพิถัน",
  itinerary: [
    {
      day: 1,
      title: "เดินทางสู่โตเกียว",
      description: "ออกเดินทางจากกรุงเทพฯ สู่สนามบินนาริตะ โตเกียว เช็คอินโรงแรม",
      meals: ["อาหารค่ำ"]
    },
    {
      day: 2,
      title: "ชมภูเขาฟูจิ - ฮาโกเน่",
      description: "เดินทางสู่ภูเขาฟูจิ ขึ้นกระเช้าไฟฟ้า ชมทะเลสาบอาชิ",
      meals: ["อาหารเช้า", "อาหารกลางวัน", "อาหารค่ำ"],
      accommodation: "โรงแรมใน ฮาโกเน่"
    },
    {
      day: 3,
      title: "โตเกียว - อาซากุสะ - ชิบูยา",
      description: "ชมวัดเซนโซะจิ ตลาดนากามิเสะ ย่านชิบูยา",
      meals: ["อาหารเช้า", "อาหารกลางวัน"]
    },
    {
      day: 4,
      title: "ดิสนีย์แลนด์",
      description: "เพลิดเพลินกับสวนสนุกดิสนีย์แลนด์ โตเกียว",
      meals: ["อาหารเช้า"]
    },
    {
      day: 5,
      title: "โอซาก้า - ปราสาทโอซาก้า",
      description: "เดินทางสู่โอซาก้า ชมปราสาทโอซาก้า ถนนโดทงโบริ",
      meals: ["อาหารเช้า", "อาหารกลางวัน", "อาหารค่ำ"]
    },
    {
      day: 6,
      title: "เดินทางกลับกรุงเทพฯ",
      description: "ช้อปปิ้งห้างสรรพสินค้า เดินทางกลับกรุงเทพฯ",
      meals: ["อาหารเช้า"]
    }
  ],
  includes: [
    "ตั๋วเครื่องบิน กรุงเทพฯ - โตเกียว - กรุงเทพฯ",
    "ที่พัก 4 คืน ตามโปรแกรม",
    "อาหารตามระบุในโปรแกรม",
    "รถโค้ชปรับอากาศตลอดเส้นทาง",
    "ไกด์ท้องถิ่นคอยดูแล",
    "ประกันการเดินทาง"
  ],
  excludes: [
    "ค่าธรรมเนียมการทำวีซ่า",
    "ค่าบริการกระเป๋าเดินทาง",
    "ค่าใช้จ่ายส่วนตัว",
    "ทิปไกด์และคนขับรถ"
  ],
  dates: [
    {
      id: "1",
      startDate: "2024-03-15",
      endDate: "2024-03-20",
      price: 49900,
      originalPrice: 59900,
      available: 8,
      total: 20,
      badge: "🔥 ลดพิเศษ"
    },
    {
      id: "2",
      startDate: "2024-03-22",
      endDate: "2024-03-27",
      price: 52900,
      available: 15,
      total: 25
    },
    {
      id: "3",
      startDate: "2024-04-05",
      endDate: "2024-04-10",
      price: 54900,
      available: 12,
      total: 20,
      badge: "🌸 ช่วงซากุระ"
    },
    {
      id: "4",
      startDate: "2024-04-12",
      endDate: "2024-04-17",
      price: 54900,
      available: 18,
      total: 25
    },
    {
      id: "5",
      startDate: "2024-04-19",
      endDate: "2024-04-24",
      price: 51900,
      available: 22,
      total: 30
    }
  ]
}

interface TourDetailPageProps {
  params: Promise<{ id: string }>
}

export default function TourVibrantDetailPage({ params }: TourDetailPageProps) {
  const [id, setId] = useState<string>('')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [travelers, setTravelers] = useState(2)

  // Extract id from params (App Router)
  useEffect(() => {
    if (params) {
      params.then(({ id }) => setId(id))
    }
  }, [params])

  const tabs = [
    { id: 'overview', label: '🎯 ภาพรวม', emoji: '🎯' },
    { id: 'itinerary', label: '📅 รายการท่องเที่ยว', emoji: '📅' },
    { id: 'includes', label: '✅ รวม/ไม่รวม', emoji: '✅' },
    { id: 'reviews', label: `⭐ รีวิว (${mockTour.reviews})`, emoji: '⭐' }
  ]

  const selectedDateInfo = selectedDate ? mockTour.dates.find(d => d.id === selectedDate) : null
  const totalPrice = selectedDateInfo ? selectedDateInfo.price * travelers : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100">
      {/* Floating decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-200 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-pink-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-purple-200 rounded-full opacity-20 animate-bounce delay-1000"></div>
        <div className="absolute bottom-40 right-1/3 w-24 h-24 bg-blue-200 rounded-full opacity-20 animate-pulse delay-500"></div>
      </div>

      {/* Navigation */}
      <div className="bg-white/80 backdrop-blur-sm border-b-2 border-white/50 sticky top-0 z-40 shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/tours-vibrant" 
              className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all font-bold transform hover:scale-105"
            >
              <ArrowLeftIcon />
              <span>กลับไปหาทัวร์</span>
            </Link>
            
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-400 to-cyan-400 text-white rounded-full hover:from-blue-500 hover:to-cyan-500 transition-all font-bold transform hover:scale-105">
                <ShareIcon />
                <span>แชร์</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-400 to-red-400 text-white rounded-full hover:from-pink-500 hover:to-red-500 transition-all font-bold transform hover:scale-105">
                <HeartIcon />
                <span>บันทึก</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border-2 border-white/50 overflow-hidden mb-8 transform hover:scale-[1.02] transition-transform">
              <div className="relative h-96">
                <Image
                  src={mockTour.images[currentImageIndex]}
                  alt={mockTour.name}
                  fill
                  className="object-cover"
                />
                
                {/* Fun overlay badge */}
                <div className="absolute top-4 left-4">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-2 rounded-full font-bold shadow-lg animate-pulse">
                    📸 สวยมาก!
                  </div>
                </div>
                
                {/* Image Navigation */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <div className="flex gap-2">
                    {mockTour.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all transform hover:scale-150 ${
                          index === currentImageIndex ? 'bg-white w-8' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Thumbnail Navigation */}
              <div className="p-4 bg-gradient-to-r from-purple-100 to-pink-100">
                <div className="flex gap-2 overflow-x-auto">
                  {mockTour.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-16 rounded-xl overflow-hidden border-2 transition-all transform hover:scale-110 ${
                        index === currentImageIndex ? 'border-purple-500 shadow-lg' : 'border-white'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${mockTour.name} ${index + 1}`}
                        width={80}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tour Info */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border-2 border-white/50 p-8 mb-8 transform hover:scale-[1.01] transition-transform">
              <div className="mb-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {mockTour.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg animate-pulse"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h1 className="text-3xl font-black text-gray-900 mb-4">{mockTour.name}</h1>
                
                <div className="flex items-center gap-6 text-gray-700 mb-6">
                  <div className="flex items-center gap-2 font-medium">
                    <LocationIcon />
                    <span>🌍 {mockTour.country}</span>
                  </div>
                  <div className="flex items-center gap-2 font-medium">
                    <ClockIcon />
                    <span>⏰ {mockTour.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 font-medium">
                    <PlaneIcon />
                    <span>✈️ {mockTour.transportation}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} filled={i < Math.floor(mockTour.rating)} />
                    ))}
                  </div>
                  <span className="text-gray-900 font-bold text-lg">{mockTour.rating}</span>
                  <span className="text-gray-600 font-medium">({mockTour.reviews} รีวิว)</span>
                  <div className="bg-gradient-to-r from-green-400 to-emerald-400 text-white px-3 py-1 rounded-full text-sm font-bold animate-bounce">
                    🏆 ยอดเยี่ยม!
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed text-lg">{mockTour.description}</p>
                
                {/* Meal Count Display */}
                <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-6 mt-6 border-2 border-yellow-300">
                  <h3 className="text-gray-900 font-bold mb-4 flex items-center gap-3">
                    <div className="text-3xl">🍽️</div>
                    <span>อาหารรวมในแพ็คเกจ</span>
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-orange-200 to-red-200 rounded-xl p-4 text-center transform hover:scale-105 transition-transform">
                      <div className="text-orange-600 text-3xl mb-2">🌅</div>
                      <div className="text-gray-900 font-black text-xl">{mockTour.itinerary.reduce((count, day) => count + day.meals.filter(meal => meal.includes('เช้า')).length, 0)}</div>
                      <div className="text-gray-600 text-sm font-bold">อาหารเช้า</div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-200 to-cyan-200 rounded-xl p-4 text-center transform hover:scale-105 transition-transform">
                      <div className="text-blue-600 text-3xl mb-2">☀️</div>
                      <div className="text-gray-900 font-black text-xl">{mockTour.itinerary.reduce((count, day) => count + day.meals.filter(meal => meal.includes('กลางวัน')).length, 0)}</div>
                      <div className="text-gray-600 text-sm font-bold">อาหารกลางวัน</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-200 to-pink-200 rounded-xl p-4 text-center transform hover:scale-105 transition-transform">
                      <div className="text-purple-600 text-3xl mb-2">🌙</div>
                      <div className="text-gray-900 font-black text-xl">{mockTour.itinerary.reduce((count, day) => count + day.meals.filter(meal => meal.includes('ค่ำ')).length, 0)}</div>
                      <div className="text-gray-600 text-sm font-bold">อาหารค่ำ</div>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <div className="bg-gradient-to-r from-green-400 to-emerald-400 text-white px-4 py-2 rounded-full inline-block font-black text-lg animate-pulse">
                      รวม {mockTour.itinerary.reduce((count, day) => count + day.meals.length, 0)} มื้อ
                    </div>
                    <div className="text-gray-600 text-sm mt-2 font-medium">ตามรายการในโปรแกรม</div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b-2 border-purple-200 mb-6">
                <div className="flex gap-4 overflow-x-auto">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`pb-4 border-b-4 font-bold transition-all whitespace-nowrap ${
                        activeTab === tab.id
                          ? 'border-purple-500 text-purple-600 scale-105'
                          : 'border-transparent text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div>
                {activeTab === 'overview' && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <SparkleIcon />
                      <span>✨ จุดเด่นของทัวร์</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {mockTour.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl transform hover:scale-105 transition-transform">
                          <CheckIcon />
                          <span className="text-gray-700 font-medium">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'itinerary' && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">📅 รายการท่องเที่ยว</h3>
                    <div className="space-y-6">
                      {mockTour.itinerary.map((day, index) => (
                        <div key={index} className="flex gap-4 group">
                          <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform">
                            {day.day}
                          </div>
                          <div className="flex-1 bg-white/60 backdrop-blur-sm rounded-2xl p-4 border-2 border-purple-200 group-hover:border-purple-400 transition-colors">
                            <h4 className="text-lg font-bold text-gray-900 mb-2">{day.title}</h4>
                            <p className="text-gray-700 mb-3">{day.description}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span>{day.meals.join(', ')}</span>
                              {day.accommodation && (
                                <span>{day.accommodation}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'includes' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4 text-green-600">✅ ราคารวม</h3>
                      <div className="space-y-3">
                        {mockTour.includes.map((item, index) => (
                          <div key={index} className="flex items-start gap-3 bg-green-50 p-3 rounded-xl">
                            <CheckIcon />
                            <span className="text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4 text-red-600">❌ ราคาไม่รวม</h3>
                      <div className="space-y-3">
                        {mockTour.excludes.map((item, index) => (
                          <div key={index} className="flex items-start gap-3 bg-red-50 p-3 rounded-xl">
                            <svg className="w-4 h-4 text-red-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span className="text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">⭐</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">รีวิวจะเปิดให้บริการเร็วๆ นี้</h3>
                    <p className="text-gray-600 text-lg">เรากำลังพัฒนาระบบรีวิวให้ดีที่สุดสำหรับคุณ 🚀</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border-2 border-white/50 p-6 sticky top-24 transform hover:scale-[1.02] transition-transform">
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  {mockTour.originalPrice && (
                    <span className="text-lg text-gray-500 line-through font-medium">
                      ฿{mockTour.originalPrice.toLocaleString()}
                    </span>
                  )}
                  <span className="text-3xl font-black text-purple-600">
                    ฿{mockTour.price.toLocaleString()}
                  </span>
                  <span className="text-gray-600 font-medium">/ ท่าน</span>
                </div>
                {mockTour.originalPrice && (
                  <div className="inline-block bg-gradient-to-r from-green-400 to-emerald-400 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                    💸 ประหยัด ฿{(mockTour.originalPrice - mockTour.price).toLocaleString()}
                  </div>
                )}
              </div>

              {/* Date Selection */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  เลือกวันเดินทาง
                </label>
                
                {/* Month Selector */}
                <div className="mb-4">
                  <h4 className="text-gray-700 font-bold mb-3 flex items-center gap-2">
                    <CalendarIcon />
                    <span>เลือกช่วงเดือน</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <button className="px-4 py-2 bg-gradient-to-r from-purple-400 to-pink-400 text-white text-sm font-bold rounded-full hover:from-purple-500 hover:to-pink-500 transition-all transform hover:scale-105 animate-pulse">
                      ทั้งหมด
                    </button>
                    <button className="px-4 py-2 bg-gradient-to-r from-blue-200 to-purple-200 text-gray-700 text-sm font-bold rounded-full hover:from-blue-300 hover:to-purple-300 transition-all transform hover:scale-105">
                      มี.ค. 2024
                    </button>
                    <button className="px-4 py-2 bg-gradient-to-r from-green-200 to-blue-200 text-gray-700 text-sm font-bold rounded-full hover:from-green-300 hover:to-blue-300 transition-all transform hover:scale-105">
                      เม.ย. 2024
                    </button>
                    <button className="px-4 py-2 bg-gradient-to-r from-yellow-200 to-orange-200 text-gray-700 text-sm font-bold rounded-full hover:from-yellow-300 hover:to-orange-300 transition-all transform hover:scale-105">
                      มิ.ย. 2024
                    </button>
                  </div>
                </div>
                <div className="space-y-3">
                  {mockTour.dates.map((date) => (
                    <div
                      key={date.id}
                      onClick={() => setSelectedDate(date.id)}
                      className={`p-4 border-2 rounded-2xl cursor-pointer transition-all transform hover:scale-105 ${
                        selectedDate === date.id
                          ? 'border-purple-500 bg-gradient-to-r from-purple-100 to-pink-100'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="font-bold text-gray-900">
                            {new Date(date.startDate).toLocaleDateString('th-TH', {
                              day: 'numeric',
                              month: 'short'
                            })} - {new Date(date.endDate).toLocaleDateString('th-TH', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </div>
                          <div className="text-sm text-gray-600 font-medium">
                            เหลือที่นั่ง {date.available}/{date.total}
                          </div>
                        </div>
                        <div className="text-right">
                          {date.originalPrice && (
                            <div className="text-sm text-gray-500 line-through">
                              ฿{date.originalPrice.toLocaleString()}
                            </div>
                          )}
                          <div className="font-bold text-purple-600">
                            ฿{date.price.toLocaleString()}
                          </div>
                        </div>
                      </div>
                      {date.badge && (
                        <div className="inline-block bg-gradient-to-r from-orange-400 to-red-400 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                          {date.badge}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Travelers */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  <PeopleIcon />
                  👥 จำนวนผู้เดินทาง
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setTravelers(Math.max(1, travelers - 1))}
                    className="w-12 h-12 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full flex items-center justify-center hover:from-purple-300 hover:to-pink-300 transition-all font-bold text-purple-700 transform hover:scale-110"
                  >
                    -
                  </button>
                  <span className="text-2xl font-black min-w-[3rem] text-center text-purple-600">{travelers}</span>
                  <button
                    onClick={() => setTravelers(travelers + 1)}
                    className="w-12 h-12 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full flex items-center justify-center hover:from-purple-300 hover:to-pink-300 transition-all font-bold text-purple-700 transform hover:scale-110"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Total Price */}
              {selectedDate && (
                <div className="mb-6 p-4 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl border-2 border-yellow-300">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700 font-medium">💰 ราคารวม ({travelers} ท่าน)</span>
                    <span className="text-2xl font-black text-orange-600">
                      ฿{totalPrice.toLocaleString()}
                    </span>
                  </div>
                  {selectedDateInfo?.originalPrice && (
                    <div className="text-sm text-green-600 font-bold">
                      🎉 ประหยัด ฿{((selectedDateInfo.originalPrice - selectedDateInfo.price) * travelers).toLocaleString()}
                    </div>
                  )}
                </div>
              )}

              {/* Book Button */}
              <button
                disabled={!selectedDate}
                className={`w-full py-4 rounded-2xl font-black transition-all transform text-lg ${
                  selectedDate
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 hover:scale-105 shadow-lg animate-pulse'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                {selectedDate ? 'จองทัวร์นี้เลย!' : 'เลือกวันเดินทาง'}
              </button>

              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600 font-medium">
                  รองรับการชำระผ่านบัตรเครดิต<br />
                  สอบถามเพิ่มเติม: 02-123-4567
                </p>
              </div>

              {/* Fun guarantee badges */}
              <div className="mt-6 grid grid-cols-2 gap-2">
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-3 rounded-xl text-center">
                  <div className="text-2xl mb-1">✅</div>
                  <div className="text-xs font-bold text-green-700">การันตีคุณภาพ</div>
                </div>
                <div className="bg-gradient-to-r from-blue-100 to-cyan-100 p-3 rounded-xl text-center">
                  <div className="text-2xl mb-1">🛡️</div>
                  <div className="text-xs font-bold text-blue-700">ปลอดภัย 100%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}