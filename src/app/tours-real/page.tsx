'use client'

import { useState, useEffect, Suspense } from 'react'
import Image from 'next/image'
import { Search, Star, MapPin, Clock, Users, Filter, Grid, LayoutGrid, Calendar, Plane, FileDown, Hotel, Utensils } from 'lucide-react'

interface SimpleTour {
  id: string
  title: string
  price: number
  image: string
  country: string
  days: number
  nights: number
  availability: 'ว่าง' | 'เหลือน้อย' | 'เต็ม'
  availableSlots: number
  highlights: string[]
}

function ToursRealPageContent() {
  const [tours, setTours] = useState<SimpleTour[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('ทั้งหมด')

  useEffect(() => {
    const fetchTours = async () => {
      try {
        console.log('เริ่มเรียก API...')
        
        await new Promise(resolve => setTimeout(resolve, 2000)) // รอ 2 วินาที
        
        const res = await fetch("https://www.zegoapi.com/v1.5/programtours", {
          headers: {
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjhmMmViYjEyYjE0NzIyZDQxZDRmODQiLCJpYXQiOjE2NzA4NDI2NTB9.OqjXzyitMLH2Q2int7pfAvZ1Fel-7eZSnmak0k9g3pk"
          }
        })
        
        console.log('ได้รับ response:', res.ok, res.status)
        
        if (!res.ok) {
          if (res.status === 429) {
            throw new Error('API rate limit exceeded - กรุณารอสักครู่แล้วลองใหม่')
          }
          throw new Error(`API error: ${res.status}`)
        }
        
        const data = await res.json()
        console.log('ข้อมูลจาก API:', data.length, 'รายการ')
        
        // แปลงข้อมูลแบบง่าย
        const simpleTours: SimpleTour[] = data.slice(0, 50).map((item: any, index: number) => {
          const periods = item.Periods || []
          const price = periods.length > 0 ? periods[0].Price : 25000
          
          // คำนวณที่ว่าง
          let availability: 'ว่าง' | 'เหลือน้อย' | 'เต็ม' = 'ว่าง'
          let totalAvailable = periods.reduce((sum: number, p: any) => sum + (p.Seat || 0), 0)
          
          if (totalAvailable === 0) {
            availability = 'เต็ม'
          } else if (totalAvailable <= 10) {
            availability = 'เหลือน้อย'
          }
          
          // ไฮไลท์
          const highlights = item.Highlight 
            ? item.Highlight.split('\\n').filter((h: string) => h.trim().length > 0).slice(0, 3)
            : []
          
          return {
            id: item.ProductID || `tour-${index}`,
            title: item.ProductName || 'ทัวร์',
            price: price || 25000,
            image: item.URLImage || '/plane.svg',
            country: item.CountryName || 'ไม่ระบุ',
            days: parseInt(item.Days) || 5,
            nights: parseInt(item.Nights) || 4,
            availability,
            availableSlots: totalAvailable,
            highlights
          }
        }).filter((tour: any) => tour.price > 0)
        
        console.log('แปลงข้อมูลแล้ว:', simpleTours.length, 'รายการ')
        console.log('ทัวร์แรก:', simpleTours[0])
        
        setTours(simpleTours)
      } catch (e: any) {
        console.error('เกิดข้อผิดพลาด:', e)
        setError(e.message || 'เกิดข้อผิดพลาด')
      } finally {
        setLoading(false)
      }
    }

    fetchTours()
  }, [])

  // Filter tours
  const filteredTours = tours.filter(tour => {
    const matchesSearch = tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tour.country.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCountry = selectedCountry === 'ทั้งหมด' || tour.country === selectedCountry
    return matchesSearch && matchesCountry
  })

  // Get unique countries
  const countries = ['ทั้งหมด', ...Array.from(new Set(tours.map(tour => tour.country)))]

  if (loading) {
    return (
      <main className="bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-center items-center h-64">
            <div className="flex items-center space-x-3 text-blue-600">
              <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="font-medium text-lg">กำลังโหลดทัวร์จาก API (รอ 2 วินาทีเพื่อหลีกเลี่ยง rate limit)...</span>
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg mb-4 max-w-md mx-auto">
              <h2 className="font-bold mb-2">ไม่สามารถโหลดข้อมูลได้</h2>
              <p>{error}</p>
            </div>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              ลองใหม่
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-3">
            ทัวร์จริงจาก API
          </h1>
          <p className="text-lg text-blue-700 mb-2">
            ข้อมูลทัวร์แบบเรียลไทม์ {tours.length} โปรแกรม
          </p>
          <div className="flex justify-center items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>ข้อมูลจาก API จริง</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>อัปเดตแบบเรียลไทม์</span>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-4 mb-6 border border-white/20">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-grow w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
              <input
                type="text"
                placeholder="ค้นหาทัวร์ตามชื่อ หรือ ประเทศ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-blue-900"
              />
            </div>
            
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white min-w-[120px]"
            >
              {countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
            
            <div className="text-sm text-blue-700 whitespace-nowrap font-medium">
              พบ {filteredTours.length} ทัวร์
            </div>
          </div>
        </div>

        {/* Tours Grid */}
        {filteredTours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTours.map(tour => {
              if (tour.availability === 'เต็ม') {
                return (
                  <div key={tour.id} className="bg-white/60 rounded-2xl border-2 border-gray-300 shadow-lg overflow-hidden opacity-70">
                    <div className="relative h-48">
                      <Image
                        src={tour.image}
                        alt={tour.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gray-900/60 flex items-center justify-center">
                        <div className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold text-lg shadow-lg">
                          เต็มแล้ว
                        </div>
                      </div>
                      <div className="absolute top-3 right-3 bg-gray-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {tour.country}
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h2 className="text-xl font-bold text-gray-600 mb-2 line-clamp-2">{tour.title}</h2>
                      <div className="text-2xl font-bold text-gray-400 mb-4">
                        ฿{tour.price.toLocaleString()}
                      </div>
                      <button className="w-full bg-gray-400 text-white py-2 rounded cursor-not-allowed" disabled>
                        เต็มแล้ว
                      </button>
                    </div>
                  </div>
                )
              }

              const borderClass = tour.availability === 'เหลือน้อย'
                ? 'border-2 border-red-500 hover:border-red-600 shadow-red-100'
                : 'border-2 border-blue-200 hover:border-blue-400 shadow-blue-100'

              return (
                <div key={tour.id} className={`bg-white/90 backdrop-blur-sm rounded-2xl ${borderClass} shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group`}>
                  <div className="relative h-48">
                    <Image
                      src={tour.image}
                      alt={tour.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Availability Badge */}
                    {tour.availability === 'เหลือน้อย' && (
                      <div className="absolute top-3 left-3 z-10">
                        <div className="bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 text-white px-3 py-1.5 rounded-full text-sm font-bold animate-pulse shadow-lg">
                          🔥 เหลือน้อย!
                        </div>
                      </div>
                    )}
                    
                    {/* Country Badge */}
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                      {tour.country}
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h2 className="text-xl font-bold text-blue-900 mb-2 line-clamp-2 group-hover:text-blue-700 transition-colors">
                      {tour.title}
                    </h2>
                    
                    {/* Alert for low availability */}
                    {tour.availability === 'เหลือน้อย' && (
                      <div className="mb-3 text-xs text-red-600 font-semibold bg-red-50 px-3 py-2 rounded-lg border border-red-200 animate-pulse">
                        ⚠️ เหลือที่นั่งเพียง {tour.availableSlots} ที่! รีบจองก่อนหมด
                      </div>
                    )}

                    {/* Highlights */}
                    {tour.highlights.length > 0 && (
                      <div className="mb-3 text-sm text-gray-600">
                        <div className="line-clamp-2 leading-relaxed">{tour.highlights[0]}</div>
                      </div>
                    )}
                    
                    {/* Tour Details */}
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4 p-3 bg-blue-50/50 rounded-lg border border-blue-100">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-blue-500" />
                        <span>{tour.days} วัน {tour.nights} คืน</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2 text-blue-500" />
                        <span>ว่าง {tour.availableSlots} ที่</span>
                      </div>
                    </div>
                    
                    {/* Pricing */}
                    <div className="text-right mb-4">
                      <div className="text-3xl font-bold text-blue-900">
                        ฿{tour.price.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">เริ่มต้น /ท่าน</div>
                    </div>
                    
                    {/* Action Button */}
                    <button
                      className={
                        tour.availability === 'เหลือน้อย'
                          ? 'w-full bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold py-3 rounded-lg shadow-lg hover:from-red-700 hover:to-orange-700 transition-all duration-200'
                          : 'w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors'
                      }
                    >
                      {tour.availability === 'เหลือน้อย' ? '🔥 จองด่วน!' : 'ดูรายละเอียด'}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20">
            <div className="mx-auto bg-blue-100 rounded-full h-20 w-20 flex items-center justify-center mb-6">
              <Search className="w-10 h-10 text-blue-500" />
            </div>
            <h3 className="text-2xl font-semibold text-blue-900 mb-2">ไม่พบทัวร์</h3>
            <p className="text-blue-700 mb-6">ขออภัย เราไม่พบทัวร์ที่ตรงกับเงื่อนไขของคุณ</p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedCountry('ทั้งหมด')
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              ล้างตัวกรองทั้งหมด
            </button>
          </div>
        )}
      </div>
    </main>
  )
}

export default function ToursRealPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
        <div className="flex items-center space-x-3 text-blue-600">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="font-medium text-lg">กำลังโหลดข้อมูลทัวร์จาก API...</span>
        </div>
      </div>
    }>
      <ToursRealPageContent />
    </Suspense>
  )
}