'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Japanese-inspired icons
const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg className={`w-5 h-5 ${filled ? 'text-amber-400' : 'text-stone-300'}`} fill={filled ? "currentColor" : "none"} stroke={filled ? "none" : "currentColor"} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
)

const CalendarIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
)

const UsersIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
  </svg>
)

const HeartIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
)

const ShareIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
  </svg>
)

// Additional icons for Japanese-themed tabs
const DocumentIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
)

const InfoIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const CheckCircleIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

// Mock tour detail data with dates
const tourDetail = {
  id: "jp001",
  name: "ทัวร์ญี่ปุ่น โตเกียว โอซาก้า ฟูจิซัง 6 วัน 4 คืน",
  shortName: "日本の心の旅 - Journey to Japan's Heart",
  country: "ญี่ปุ่น",
  duration: "6 วัน 4 คืน",
  price: 69900,
  originalPrice: 79900,
  rating: 4.9,
  reviews: 245,
  season: "春 (Spring)",
  images: [
    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1542640244-7e672d6cef4e?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1528164344705-47542687000d?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&h=600&fit=crop"
  ],
  tags: ["温泉", "寺院", "桜"],
  transportation: "การบินไทย",
  highlights: ["ภูเขาฟูจิ", "วัดเซนโซะจิ", "온천 Onsen", "Shibuya Crossing", "Imperial Palace"],
  dates: [
    {
      id: "1",
      startDate: "2024-03-15",
      endDate: "2024-03-20",
      price: 69900,
      originalPrice: 79900,
      available: 8,
      total: 20,
      badge: "特価 (พิเศษ)"
    },
    {
      id: "2",
      startDate: "2024-03-25",
      endDate: "2024-03-30",
      price: 72900,
      available: 12,
      total: 25
    },
    {
      id: "3",
      startDate: "2024-04-08",
      endDate: "2024-04-13",
      price: 75900,
      available: 15,
      total: 20,
      badge: "桜季 (ซากุระ)"
    },
    {
      id: "4",
      startDate: "2024-04-18",
      endDate: "2024-04-23",
      price: 74900,
      available: 18,
      total: 25
    },
    {
      id: "5",
      startDate: "2024-05-10",
      endDate: "2024-05-15",
      price: 71900,
      available: 22,
      total: 30
    }
  ],
  itinerary: [
    {
      day: 1,
      title: "第一日 - วันแรกแห่งการเดินทาง",
      description: "เดินทางสู่แดนซามูไร ท่ามกลางความงดงามของซากุระ",
      activities: ["ออกเดินทางจากสุวรรณภูมิ", "เดินทางถึงโตเกียว", "เช็คอินโรงแรม", "เดินเล่นย่าน Shibuya"],
      meals: ["อาหารค่ำ"]
    },
    {
      day: 2,
      title: "第二日 - วันแห่งวัฒนธรรม",
      description: "สัมผัสความศักดิ์สิทธิ์แห่งวัดเก่าแก่",
      activities: ["วัดเซนโซะจิ (Sensoji Temple)", "ตลาด Nakamise", "Imperial Palace", "Ginza Shopping"],
      meals: ["อาหารเช้า", "อาหารกลางวัน", "อาหารค่ำ"]
    },
    {
      day: 3,
      title: "第三日 - วันแห่งธรรมชาติ",
      description: "ชมความงดงามของภูเขาฟูจิ",
      activities: ["เดินทางสู่ Mt. Fuji", "Lake Kawaguchi", "Onsen Experience", "Ryokan Stay"],
      meals: ["อาหารเช้า", "อาหารกลางวัน", "อาหารค่ำ"]
    },
    {
      day: 4,
      title: "第四日 - วันแห่งการเดินทาง",
      description: "สู่ดินแดนแห่งอาหารและวัฒนธรรม",
      activities: ["เดินทางสู่โอซาก้า", "Osaka Castle", "Dotonbori District", "Street Food Tour"],
      meals: ["อาหารเช้า", "อาหารกลางวัน"]
    },
    {
      day: 5,
      title: "第五日 - วันแห่งการสำรวจ",
      description: "ค้นพบเสน่ห์แห่งเกียว",
      activities: ["Kyoto Day Trip", "Fushimi Inari Shrine", "Bamboo Grove", "Traditional Tea Ceremony"],
      meals: ["อาหารเช้า", "อาหารค่ำ"]
    },
    {
      day: 6,
      title: "第六日 - วันแห่งการอำลา",
      description: "บทสุดท้ายแห่งการเดินทาง",
      activities: ["Last Minute Shopping", "Transfer to Airport", "Return to Thailand"],
      meals: ["อาหารเช้า"]
    }
  ],
  included: [
    "✈️ ตั๋วเครื่องบินไป-กลับ",
    "🏨 ที่พักระดับ 4 ดาว",
    "🍱 อาหารตามรายการ",
    "🚌 รถโค้ชปรับอากาศ",
    "👨‍💼 ไกด์ท้องถิ่น",
    "🎟️ ค่าเข้าชมสถานที่ท่องเที่ยว"
  ],
  notIncluded: [
    "❌ ค่าใช้จ่ายส่วนตัว",
    "❌ ทิปไกด์และคนขับ",
    "❌ ประกันการเดินทาง",
    "❌ อาหารนอกรายการ"
  ]
}

interface TourDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function TourDetailPage({ params }: TourDetailPageProps) {
  const { id } = await params
  // สามารถใช้ id เพื่อดึงข้อมูลทัวร์จริงได้ในอนาคต
  // (ตอนนี้ mock ข้อมูลไว้เหมือนเดิม)

  const [currentImage, setCurrentImage] = useState(0)
  const [showFullItinerary, setShowFullItinerary] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [travelers, setTravelers] = useState(2)
  const [activeTab, setActiveTab] = useState('overview')

  // Filter dates by selected month
  const filteredDates = selectedMonth 
    ? tourDetail.dates.filter(date => 
        new Date(date.startDate).toLocaleDateString('th-TH', { month: 'short', year: 'numeric' }) === selectedMonth
      )
    : tourDetail.dates

  const selectedDateInfo = selectedDate ? tourDetail.dates.find(d => d.id === selectedDate) : null
  const totalPrice = selectedDateInfo ? selectedDateInfo.price * travelers : 0

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-stone-50 to-amber-50">
      {/* Zen Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-32 right-16 w-40 h-40 rounded-full border border-amber-200" style={{animation: 'float 8s ease-in-out infinite'}}></div>
        <div className="absolute bottom-40 left-12 w-32 h-32 rounded-full border border-stone-300" style={{animation: 'float 10s ease-in-out infinite reverse'}}></div>
      </div>

      {/* Back Button */}
      <div className="relative z-10 container mx-auto px-4 pt-6">
        <Link 
          href="/tours-ryokan"
          className="inline-flex items-center gap-2 text-stone-600 hover:text-amber-600 transition-colors font-medium"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 19l-7-7 7-7" />
          </svg>
          戻る (กลับ)
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Image Gallery */}
        <div className="mb-8">
          <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={tourDetail.images[currentImage]}
              alt={tourDetail.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            
            {/* Season Badge */}
            <div className="absolute top-4 left-4">
              <span className="bg-amber-500/90 backdrop-blur-sm text-white font-medium px-4 py-2 rounded-full">
                {tourDetail.season}
              </span>
            </div>

            {/* Actions */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
                <HeartIcon />
              </button>
              <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
                <ShareIcon />
              </button>
            </div>

            {/* Price Badge */}
            <div className="absolute bottom-4 right-4">
              <div className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg">
                <div className="text-right">
                  {tourDetail.originalPrice && (
                    <div className="text-sm text-stone-500 line-through">
                      ฿{tourDetail.originalPrice.toLocaleString()}
                    </div>
                  )}
                  <div className="text-2xl font-bold text-amber-600">
                    ฿{tourDetail.price.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Image Thumbnails */}
          <div className="flex gap-2 mt-4 overflow-x-auto">
            {tourDetail.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  currentImage === index ? 'border-amber-400' : 'border-stone-200'
                }`}
              >
                <Image
                  src={image}
                  alt={`Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Tour Info */}
        <div className="mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-stone-200 p-6">
            <div className="mb-4">
              <h1 className="text-2xl md:text-3xl font-bold text-stone-900 mb-2 leading-tight">
                {tourDetail.name}
              </h1>
              <p className="text-lg text-amber-600 font-medium mb-4">
                {tourDetail.shortName}
              </p>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} filled={i < Math.floor(tourDetail.rating)} />
                  ))}
                </div>
                <span className="text-stone-900 font-bold">{tourDetail.rating}</span>
                <span className="text-stone-600">({tourDetail.reviews} 評価)</span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {tourDetail.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-medium border border-amber-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2 text-stone-600">
                  <CalendarIcon />
                  <span>{tourDetail.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-stone-600">
                  <UsersIcon />
                  <span>15-25 คน</span>
                </div>
              </div>
              
              {/* Meal Count Display - Ryokan Style */}
              <div className="bg-gradient-to-r from-amber-50 to-stone-50 rounded-xl p-6 border border-amber-200 mb-6">
                <h3 className="text-stone-900 font-semibold mb-4 flex items-center gap-3">
                  <div className="text-2xl">🍱</div>
                  <span>お食事 - อาหารในแพ็คเกจ</span>
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-orange-100 to-red-100 rounded-lg p-4 border border-orange-200 text-center">
                    <div className="text-orange-600 text-2xl mb-2">🌅</div>
                    <div className="text-stone-900 font-bold text-xl">{tourDetail.itinerary.reduce((count, day) => count + (day.meals ? day.meals.filter(meal => meal.includes('เช้า')).length : 0), 0)}</div>
                    <div className="text-stone-600 text-sm">朝食 - อาหารเช้า</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg p-4 border border-blue-200 text-center">
                    <div className="text-blue-600 text-2xl mb-2">☀️</div>
                    <div className="text-stone-900 font-bold text-xl">{tourDetail.itinerary.reduce((count, day) => count + (day.meals ? day.meals.filter(meal => meal.includes('กลางวัน')).length : 0), 0)}</div>
                    <div className="text-stone-600 text-sm">昼食 - อาหารกลางวัน</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg p-4 border border-purple-200 text-center">
                    <div className="text-purple-600 text-2xl mb-2">🌙</div>
                    <div className="text-stone-900 font-bold text-xl">{tourDetail.itinerary.reduce((count, day) => count + (day.meals ? day.meals.filter(meal => meal.includes('ค่ำ')).length : 0), 0)}</div>
                    <div className="text-stone-600 text-sm">夕食 - อาหารค่ำ</div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <div className="bg-amber-200 text-amber-800 px-4 py-2 rounded-full inline-block font-semibold">
                    合計 {tourDetail.itinerary.reduce((count, day) => count + (day.meals ? day.meals.length : 0), 0)} มื้อ
                  </div>
                  <div className="text-stone-500 text-sm mt-2">ตามรายการในโปรแกรม</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation with Japanese Aesthetic */}
        <div className="mb-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-amber-200 overflow-hidden">
            {/* Tab Headers */}
            <div 
              className="flex border-b border-amber-200 overflow-x-auto scrollbar-hide bg-gradient-to-r from-amber-50 to-stone-50"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {[
                { id: 'overview', label: '概要 - ภาพรวม', icon: <DocumentIcon /> },
                { id: 'itinerary', label: '行程 - รายการ', icon: <CalendarIcon /> },
                { id: 'includes', label: '含む - รวม/ไม่รวม', icon: <CheckCircleIcon /> },
                { id: 'terms', label: '条件 - เงื่อนไข', icon: <InfoIcon /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 text-center font-medium transition-all duration-300 whitespace-nowrap border-b-2 relative group flex-shrink-0 ${
                    activeTab === tab.id
                      ? 'border-amber-500 text-amber-700 bg-gradient-to-t from-amber-100 to-white shadow-sm'
                      : 'border-transparent text-stone-600 hover:text-amber-600 hover:bg-amber-50/50'
                  }`}
                >
                  <div className={`transition-transform duration-300 ${activeTab === tab.id ? 'scale-110' : 'group-hover:scale-105'}`}>
                    {tab.icon}
                  </div>
                  <span className="text-sm">{tab.label}</span>
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"></div>
                  )}
                </button>
              ))}
            </div>
            
            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-stone-900 mb-4 flex items-center gap-3">
                      <span className="text-3xl">🌸</span>
                      <span>概要 - ภาพรวมทัวร์</span>
                    </h2>
                    <p className="text-stone-700 leading-relaxed text-lg mb-6">
                      สัมผัสความงดงามของญี่ปุ่นในแบบดั้งเดิม ท่ามกลางบรรยากาศแห่งความเงียบสงบ เยือนสถานที่ศักดิ์สิทธิ์และประสบการณ์การพักผ่อนในรโยกัง แบบญี่ปุ่นแท้
                    </p>
                    
                    {/* Highlights with Japanese Style */}
                    <div>
                      <h3 className="text-xl font-bold text-stone-900 mb-4 flex items-center gap-2">
                        ✨ ハイライト (จุดเด่น)
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {tourDetail.highlights.map((highlight, index) => (
                          <div key={index} className="flex items-center gap-3 p-4 bg-gradient-to-r from-amber-50 to-stone-50 rounded-xl border border-amber-200 hover:shadow-md transition-all duration-300 group">
                            <span className="text-3xl group-hover:scale-110 transition-transform duration-300">🌸</span>
                            <span className="text-stone-700 font-medium group-hover:text-amber-700 transition-colors">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'itinerary' && (
                <div>
                  <h2 className="text-2xl font-bold text-stone-900 mb-6 flex items-center gap-3">
                    <span className="text-3xl">📋</span>
                    <span>行程表 - รายการเดินทาง</span>
                  </h2>
                  <div className="space-y-6">
                    {tourDetail.itinerary.map((day, index) => (
                      <div key={day.day} className="relative group">
                        <div className="flex gap-4">
                          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                            {day.day}
                          </div>
                          <div className="flex-1 bg-gradient-to-r from-amber-50 to-transparent rounded-xl p-4 border border-amber-200 group-hover:border-amber-300 transition-all duration-300">
                            <h3 className="font-bold text-stone-900 mb-2">{day.title}</h3>
                            <p className="text-stone-600 text-sm mb-3 italic">{day.description}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {day.activities.map((activity, actIndex) => (
                                <div key={actIndex} className="flex items-center gap-2 text-sm text-stone-700">
                                  <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                                  {activity}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        {index < tourDetail.itinerary.length - 1 && (
                          <div className="absolute left-6 top-12 w-px h-12 bg-gradient-to-b from-amber-400 to-orange-500"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {activeTab === 'includes' && (
                <div>
                  <h2 className="text-2xl font-bold text-stone-900 mb-6 flex items-center gap-3">
                    <span className="text-3xl">📝</span>
                    <span>含む - ราคารวม/ไม่รวม</span>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Included */}
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                      <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
                        ✅ 含まれる (รวมในราคา)
                      </h3>
                      <div className="space-y-3">
                        {tourDetail.included.map((item, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                            <span className="text-stone-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Not Included */}
                    <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-6 border border-red-200">
                      <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center gap-2">
                        ❌ 含まれない (ไม่รวมในราคา)
                      </h3>
                      <div className="space-y-3">
                        {tourDetail.notIncluded.map((item, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                            <span className="text-stone-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'terms' && (
                <div>
                  <h2 className="text-2xl font-bold text-stone-900 mb-6 flex items-center gap-3">
                    <span className="text-3xl">📋</span>
                    <span>条件 - เกี่ยวกับรายละเอียดและเงื่อนไข</span>
                  </h2>
                  
                  {/* Terms and Conditions Sections with Japanese Theme */}
                  <div className="space-y-8">
                    {/* Booking Terms */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                      <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        予約条件 - เงื่อนไขการจอง
                      </h3>
                      <ul className="space-y-3 text-stone-700">
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>ท่านสามารถจองทัวร์ล่วงหน้าขั้นต่ำ 30 วัน ก่อนเดินทาง</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>มัดจำ 50% ของราคาทัวร์ต่อท่าน ภายใน 3 วัน หลังจากจอง</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>ชำระส่วนที่เหลือ 15 วัน ก่อนเดินทาง</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>หากไม่ชำระเงินตามกำหนด บริษัทขอสงวนสิทธิ์ยกเลิกการจอง</span>
                        </li>
                      </ul>
                    </div>

                    {/* Cancellation Policy */}
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
                      <h3 className="text-xl font-bold text-amber-800 mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        キャンセル - นโยบายการยกเลิก
                      </h3>
                      <ul className="space-y-3 text-stone-700">
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>ยกเลิก 45-31 วัน ก่อนเดินทาง เก็บค่าใช้จ่าย 25% ของราคาทัวร์</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>ยกเลิก 30-15 วัน ก่อนเดินทาง เก็บค่าใช้จ่าย 50% ของราคาทัวร์</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>ยกเลิก 14-8 วัน ก่อนเดินทาง เก็บค่าใช้จ่าย 75% ของราคาทัวร์</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>ยกเลิก 7 วัน หรือน้อยกว่า เก็บค่าใช้จ่าย 100% ของราคาทัวร์</span>
                        </li>
                      </ul>
                    </div>

                    {/* Travel Requirements */}
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                      <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                        </svg>
                        書類 - เอกสารและข้อกำหนด
                      </h3>
                      <ul className="space-y-3 text-stone-700">
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>หนังสือเดินทางต้องมีอายุคงเหลือไม่น้อยกว่า 6 เดือน</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>วีซ่าจะดำเนินเอง โดยบริษัทจะรวมค่าธรรมเนียมไว้ในราคาแล้ว</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>ต้องมีเงินฝากธนาคารไม่น้อยกว่า 100,000 บาท หรือตามที่สถานทูตกำหนด</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>ผู้เดินทางที่มีอายุต่ำกว่า 20 ปี ต้องมีผู้ปกครองร่วมเดินทาง</span>
                        </li>
                      </ul>
                    </div>

                    {/* Health & Safety */}
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200">
                      <h3 className="text-xl font-bold text-emerald-800 mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        健康 - สุขภาพและความปลอดภัย
                      </h3>
                      <ul className="space-y-3 text-stone-700">
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>ผู้เดินทางต้องมีสุขภาพสมบูรณ์แข็งแรง ไม่เป็นโรคติดต่อร้ายแรง</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>หญิงมีครรภ์ควรปรึกษาแพทย์ก่อนเดินทาง</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>ผู้สูงอายุควรปรึกษาแพทย์และแจ้งให้ทราบล่วงหน้า</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>บริษัทจัดประกันการเดินทางให้ครอบคลุม 1,000,000 บาท</span>
                        </li>
                      </ul>
                    </div>

                    {/* Important Notes */}
                    <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-6 border border-red-200">
                      <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        重要 - ข้อสำคัญที่ต้องทราบ
                      </h3>
                      <ul className="space-y-3 text-stone-700">
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>รายการทัวร์อาจมีการเปลี่ยนแปลงตามความเหมาะสม เนื่องจากสภาพอากาศ การจราจร การเมือง หรือเหตุสุดวิสัย</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>บริษัทไม่รับผิดชอบค่าใช้จ่ายส่วนเกินจากการล่าช้าของเที่ยวบิน</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>กรณีวีซ่าไม่ผ่าน บริษัทคืนเงินหักค่าดำเนินการ 3,000 บาท</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>ผู้เดินทางต้องปฏิบัติตามกฎระเบียบและคำแนะนำของไกด์ตลอดการเดินทาง</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Date Selection & Booking Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-stone-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-stone-900 mb-6 flex items-center gap-2">
            📅 出発日選択 (เลือกวันเดินทาง)
          </h2>
          
          {/* Month Selection - Ryokan Style */}
          <div className="mb-6">
            <h3 className="text-stone-700 font-semibold mb-3 flex items-center gap-2">
              <CalendarIcon />
              <span>月選択 - เลือกเดือน</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedMonth(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedMonth === null
                    ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-md'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                全て ({tourDetail.dates.length})
              </button>
              {Array.from(new Set(tourDetail.dates.map(date => 
                new Date(date.startDate).toLocaleDateString('th-TH', { month: 'short', year: 'numeric' })
              ))).map((month) => {
                const monthDates = tourDetail.dates.filter(date => 
                  new Date(date.startDate).toLocaleDateString('th-TH', { month: 'short', year: 'numeric' }) === month
                )
                return (
                  <button
                    key={month}
                    onClick={() => setSelectedMonth(month)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedMonth === month
                        ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-md'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {month} ({monthDates.length})
                  </button>
                )
              })}
            </div>
          </div>

          {/* Date Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {filteredDates.map((date) => (
              <div
                key={date.id}
                onClick={() => setSelectedDate(date.id)}
                className={`p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-md ${
                  selectedDate === date.id
                    ? 'border-amber-400 bg-amber-50'
                    : 'border-stone-200 hover:border-amber-300'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-semibold text-stone-900">
                      {new Date(date.startDate).toLocaleDateString('th-TH', {
                        day: 'numeric',
                        month: 'short'
                      })} - {new Date(date.endDate).toLocaleDateString('th-TH', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </div>
                    <div className="text-sm text-stone-600">
                      残席 {date.available}/{date.total} 席
                    </div>
                  </div>
                  <div className="text-right">
                    {date.originalPrice && (
                      <div className="text-sm text-stone-500 line-through">
                        ฿{date.originalPrice.toLocaleString()}
                      </div>
                    )}
                    <div className="font-bold text-amber-600">
                      ฿{date.price.toLocaleString()}
                    </div>
                  </div>
                </div>
                {date.badge && (
                  <div className="inline-block bg-amber-200 text-amber-800 text-xs font-semibold px-2 py-1 rounded-full">
                    {date.badge}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Traveler Selection */}
          <div className="mb-6">
            <label className="block text-stone-700 font-semibold mb-3">人数 - จำนวนผู้เดินทาง</label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setTravelers(Math.max(1, travelers - 1))}
                className="w-10 h-10 bg-stone-100 rounded-lg flex items-center justify-center hover:bg-stone-200 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <span className="text-lg font-semibold min-w-[3rem] text-center text-stone-900">{travelers}</span>
              <button
                onClick={() => setTravelers(travelers + 1)}
                className="w-10 h-10 bg-stone-100 rounded-lg flex items-center justify-center hover:bg-stone-200 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </div>
          </div>

          {/* Total Price */}
          {selectedDate && (
            <div className="mb-6 p-4 bg-gradient-to-r from-amber-50 to-stone-50 rounded-xl border border-amber-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-stone-600">合計金額 ({travelers} 名)</span>
                <span className="text-2xl font-bold text-amber-600">
                  ฿{totalPrice.toLocaleString()}
                </span>
              </div>
              {selectedDateInfo?.originalPrice && (
                <div className="text-sm text-green-600 font-medium">
                  節約 ฿{((selectedDateInfo.originalPrice - selectedDateInfo.price) * travelers).toLocaleString()}
                </div>
              )}
            </div>
          )}

          {/* Booking Button */}
          <button
            disabled={!selectedDate}
            className={`w-full py-4 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg ${
              selectedDate
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600'
                : 'bg-stone-300 text-stone-500 cursor-not-allowed hover:scale-100'
            }`}
          >
            {selectedDate ? '予約する (จองเลย)' : '出発日を選択 (เลือกวันเดินทาง)'}
          </button>

          <div className="mt-4 text-center">
            <p className="text-sm text-stone-600">
              お支払い: クレジットカード対応<br />
              お問い合わせ: 02-123-4567
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(1deg); }
        }
      `}</style>
    </div>
  )
}