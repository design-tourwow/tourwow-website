'use client'

import Image from 'next/image'
import { Star, MapPin, Clock, Users, Calendar, Check, ArrowLeft, Heart, Share2, ChevronDown, ChevronUp, X } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLoading } from '@/components/LoadingProvider'
import { Tour } from '@/lib/tour-data'
import StarRating from '@/components/StarRating'

interface TourDetailClientProps {
  tour: Tour
}

export default function TourDetailClient({ tour }: TourDetailClientProps) {
  const [selectedDate, setSelectedDate] = useState('')
  const [travelers, setTravelers] = useState(1)
  const [expandedDay, setExpandedDay] = useState<number | null>(null)
  const router = useRouter()
  const { showLoading, hideLoading } = useLoading()
  
  const handleBookTour = () => {
    showLoading('กำลังไปยังหน้าจองทัวร์...')
    setTimeout(() => {
      hideLoading()
      router.push('/booking')
    }, 1500)
  }

  const handleContactInquiry = () => {
    showLoading('กำลังไปยังหน้าติดต่อ...')
    setTimeout(() => {
      hideLoading()
      router.push('/contact')
    }, 1500)
  }

  const handleBackToTours = () => {
    showLoading('กำลังกลับไปยังหน้าทัวร์...')
    setTimeout(() => {
      hideLoading()
      router.push('/tours')
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={handleBackToTours}
          className="flex items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          กลับไปหน้าทัวร์
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Hero Image */}
            <div className="relative h-96 bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center text-white mb-8 rounded-xl overflow-hidden">
              <Image src={tour.image} alt={tour.title} fill className="object-cover opacity-40" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>
              <div className="relative z-10 text-center max-w-4xl px-6">
                <div className="mb-4">
                  <span className="bg-blue-600/80 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold">
                    {tour.category}
                  </span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-2xl">{tour.title}</h1>
                <p className="text-xl md:text-2xl drop-shadow-xl opacity-90">
                  {tour.location} | {tour.duration} | 
                  {tour.availability === 'เต็ม' ? 'เต็มแล้ว' : 
                   tour.availableSlots ? `ว่าง ${tour.availableSlots} ที่นั่ง` : tour.groupSize}
                </p>
                <div className="flex items-center justify-center mt-6 gap-6 text-lg">
                  <div className="flex items-center gap-2">
                    <Star className="w-6 h-6 text-yellow-400 fill-current" />
                    <span className="font-semibold">{tour.rating}</span>
                    <span className="opacity-75">({tour.reviews} รีวิว)</span>
                  </div>
                  <div className={`px-4 py-2 rounded-full font-semibold ${
                    tour.availability === 'ว่าง' ? 'bg-green-500' : 
                    tour.availability === 'เหลือน้อย' ? 'bg-red-500 animate-pulse' : 
                    'bg-gray-500'
                  }`}>
                    {tour.availability === 'เหลือน้อย' ? '🔥 เหลือน้อย!' : tour.availability}
                  </div>
                </div>
              </div>
            </div>

            {/* Tour Info */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {tour.category}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  tour.availability === 'ว่าง' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {tour.availability}
                </span>
              </div>

              <h1 className="text-3xl font-bold text-gray-800 mb-4">{tour.title}</h1>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                  <span>{tour.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-2 text-blue-600" />
                  <span>{tour.duration}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="w-5 h-5 mr-2 text-blue-600" />
                  <span>
                    {tour.availability === 'เต็ม' ? 'เต็มแล้ว' : 
                     tour.availableSlots ? `ว่าง ${tour.availableSlots} ที่นั่ง` : tour.groupSize}
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                  <span>{tour.departureDates?.length || 0} รอบ</span>
                </div>
              </div>

              <div className="flex items-center mb-6">
                <div className="mr-4">
                  <StarRating rating={tour.rating} size="md" />
                </div>
                <span className="text-lg font-semibold text-gray-700">{tour.rating.toFixed(1)}</span>
                <span className="text-gray-600 ml-2">({tour.reviews} รีวิว)</span>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">{tour.description}</p>

              <div className="border-t pt-6">
                <h3 className="text-xl font-bold mb-4">ไฮไลท์ของทัวร์</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {tour.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center">
                      <Check className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Itinerary Section */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h3 className="text-xl font-bold mb-4 text-blue-700">กำหนดการเดินทางแต่ละวัน</h3>
              <p className="text-sm text-gray-500 mb-6">โปรแกรมตัวอย่าง กำหนดการเดินทางแต่ละวันอาจเปลี่ยนแปลงได้ตามความเหมาะสม</p>
              <div className="space-y-6">
                {(() => {
                  // ดึงจำนวนวันจาก duration เช่น "6 วัน 4 คืน" => 6
                  const dayMatch = tour.duration.match(/(\d+)\s*วัน/)
                  const totalDays = dayMatch ? parseInt(dayMatch[1]) : (tour.itinerary?.length || 1)
                  // ถ้า itinerary ไม่ครบ ให้ generate mock ข้อมูลเพิ่ม
                  let itinerary = tour.itinerary ? [...tour.itinerary] : []
                  const randomImages = [
                    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1465156799763-2c087c332922?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=800&q=80',
                  ]
                  for (let i = itinerary.length + 1; i <= totalDays; i++) {
                    itinerary.push({
                      day: i,
                      title: `ผจญภัยวันที่ ${i}`,
                      description: `กิจกรรมท่องเที่ยวและประสบการณ์ใหม่ๆ ในวันที่ ${i} ของทริปนี้ เช่น เที่ยวชมสถานที่สำคัญ ชิมอาหารท้องถิ่น หรือพักผ่อนตามอัธยาศัย`,
                      image: randomImages[(i-1) % randomImages.length],
                      highlights: [
                        `กิจกรรมเด่นประจำวัน ${i}`,
                        `จุดถ่ายรูปยอดนิยม`,
                        `ประสบการณ์ใหม่`
                      ],
                      meals: ["อาหารเช้า", "อาหารกลางวัน", "อาหารเย็น"],
                      accommodation: i === totalDays ? "เตรียมตัวเดินทางกลับ" : `โรงแรมมาตรฐาน 4 ดาว วันที่ ${i}`,
                      fullDescription: `วันที่ ${i} ของทริปนี้ คุณจะได้สัมผัสประสบการณ์ที่แตกต่าง เช่น เยี่ยมชมสถานที่สำคัญ ชิมอาหารท้องถิ่น หรือพักผ่อนตามอัธยาศัย โดยทีมงานมืออาชีพจะดูแลคุณตลอดการเดินทาง`
                    })
                  }
                  return itinerary.map((day, idx) => (
                    <div key={day.day} className="border rounded-lg p-4 flex flex-col md:flex-row gap-4 bg-blue-50/30 shadow-sm hover:shadow-lg transition-shadow">
                      <div className="md:w-1/3 flex-shrink-0 flex items-center justify-center">
                        <Image
                          src={day.image}
                          alt={day.title}
                          width={400}
                          height={250}
                          className="rounded-lg object-cover w-full h-48 md:h-40 shadow-md"
                        />
                      </div>
                      <div className="md:w-2/3">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow">วันที่ {day.day}</span>
                          <span className="text-lg font-bold text-blue-900 drop-shadow">{day.title}</span>
                        </div>
                        <div className="mb-2 text-gray-700 font-semibold flex flex-wrap gap-2">
                          {day.highlights && day.highlights.map((h, i) => (
                            <span key={i} className="inline-flex items-center bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-xs font-medium">
                              <Check className="w-3 h-3 mr-1 text-emerald-500" />{h}
                            </span>
                          ))}
                        </div>
                        <div className="mb-2 text-gray-600 leading-relaxed text-base">
                          {day.fullDescription || day.description}
                        </div>
                        <div className="flex flex-wrap gap-4 mt-2">
                          {day.meals && (
                            <div className="text-sm text-emerald-700 flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded">
                              <span role="img" aria-label="meals">🍽️</span> มื้ออาหาร: {day.meals.join(', ')}
                            </div>
                          )}
                          {day.accommodation && (
                            <div className="text-sm text-indigo-700 flex items-center gap-1 bg-indigo-50 px-2 py-1 rounded">
                              <span role="img" aria-label="hotel">🏨</span> ที่พัก: {day.accommodation}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                })()}
              </div>
            </div>

            {/* Included/Not Included */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-green-600">รวมในแพ็กเกจ</h3>
                <ul className="space-y-2">
                  {tour.included.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-4 h-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-red-600">ไม่รวมในแพ็กเกจ</h3>
                <ul className="space-y-2">
                  {tour.notIncluded.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <X className="w-4 h-4 text-red-600 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-3xl font-bold text-emerald-600">฿{tour.price.toLocaleString()}</div>
                  {tour.originalPrice && tour.originalPrice > tour.price && (
                    <div className="text-lg text-gray-500 line-through">฿{tour.originalPrice.toLocaleString()}</div>
                  )}
                </div>
                <p className="text-lg font-semibold text-blue-700 bg-blue-50 px-3 py-1 rounded-md inline-block">ราคาต่อคน</p>
                {tour.originalPrice && tour.originalPrice > tour.price && (
                  <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold mt-2 inline-block animate-pulse">
                    🔥 ประหยัด ฿{(tour.originalPrice - tour.price).toLocaleString()}!
                  </div>
                )}
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">ช่วงเวลาเดินทาง</label>
                  <select 
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">เลือกช่วงเวลาเดินทาง</option>
                    {tour.departureDates?.map((dateRange, index) => (
                      <option key={index} value={`${dateRange.start}-${dateRange.end}`}>
                        {dateRange.start} - {dateRange.end}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">จำนวนผู้เดินทาง</label>
                  <select 
                    value={travelers}
                    onChange={(e) => setTravelers(parseInt(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={tour.availability === 'เต็ม'}
                  >
                    {Array.from({ 
                      length: tour.availability === 'เต็ม' ? 0 : 
                               tour.availableSlots ? Math.min(tour.availableSlots, 30) : 30 
                    }, (_, i) => i + 1).map(num => (
                      <option key={num} value={num}>{num} คน</option>
                    ))}
                    {tour.availability === 'เต็ม' && (
                      <option value={0}>เต็มแล้ว</option>
                    )}
                  </select>
                </div>
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span>ยอดรวม ({travelers} คน)</span>
                  <span>฿{(tour.price * travelers).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span>ภาษี & ค่าธรรมเนียม</span>
                  <span>฿{Math.round(tour.price * travelers * 0.1).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center font-bold text-lg border-t pt-2">
                  <span>ยอดรวมทั้งหมด</span>
                  <span className="text-emerald-600">฿{(tour.price * travelers + Math.round(tour.price * travelers * 0.1)).toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-3">
                {tour.availability === 'เต็ม' ? (
                  <button 
                    disabled
                    className="w-full bg-gray-400 text-white font-bold py-3 px-8 rounded-lg shadow-lg cursor-not-allowed text-lg"
                  >
                    เต็มแล้ว
                  </button>
                ) : (
                  <button 
                    onClick={handleBookTour} 
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 text-lg transform hover:scale-105"
                  >
                    {tour.availability === 'เหลือน้อย' ? '🔥 จองด่วน!' : 'จองทัวร์นี้'}
                  </button>
                )}
                <button 
                  onClick={handleContactInquiry} 
                  className="w-full bg-white text-blue-700 font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-50 transition-all duration-200 text-lg border-2 border-blue-600 hover:border-blue-700"
                >
                  สอบถามเพิ่มเติม
                </button>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 mb-2">ต้องการความช่วยเหลือ?</p>
                <p className="text-sm font-semibold">โทร: 02-674-1500</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}