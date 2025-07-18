'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { 
  ArrowLeft, Star, MapPin, Calendar, Users, Clock, 
  Plane, Hotel, Utensils, Shield, CheckCircle, X,
  BarChart3, TrendingUp, Award, Zap
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import StarRating from '@/components/StarRating'
import LoadingScreen from '@/components/LoadingScreen'

interface Tour {
  id: string
  title: string
  code: string
  price: number
  originalPrice?: number
  image: string
  location: string
  country: string
  duration: string
  days: number
  nights: number
  airline: string
  hotelStar: number
  meals: number
  highlights: string[]
  tags: string[]
  rating: number
  reviews: number
  availability: string
  availableSlots: number
  wholesaler: string
  wholesalerColor: string
}

function ComparePageContent() {
  const searchParams = useSearchParams()
  const [tours, setTours] = useState<Tour[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchToursForComparison = async () => {
      try {
        setLoading(true)
        const tourIds = searchParams.get('tours')?.split(',') || []
        
        if (tourIds.length === 0) {
          throw new Error('ไม่พบทัวร์ที่ต้องการเปรียบเทียบ')
        }

        // Fetch tours data (in real app, this would be filtered by IDs)
        const response = await fetch("https://online.ttnconnect.com/api/agency/get-allprogram")
        
        if (!response.ok) {
          throw new Error('Failed to fetch tours')
        }

        const data = await response.json()
        
        if (Array.isArray(data)) {
          const processedTours: Tour[] = data.slice(0, 50)
            .filter((item: any) => item.program?.[0])
            .map((item: any) => {
              const program = item.program[0]
              
              const highlights = program.P_HIGHLIGHT ? 
                program.P_HIGHLIGHT.split(',').map((h: string) => h.trim()).filter((h: string) => h.length > 0) : 
                []

              const tags = program.P_TAG ? 
                program.P_TAG.split(',').map((t: string) => t.trim()).filter((t: string) => t.length > 0) : 
                []

              return {
                id: program.P_ID?.toString() || Math.random().toString(),
                title: program.P_NAME || 'ทัวร์ไม่ระบุชื่อ',
                code: program.P_CODE || 'NO-CODE',
                price: parseInt(program.P_PRICE) || 0,
                originalPrice: program.P_ORIGINAL_PRICE ? parseInt(program.P_ORIGINAL_PRICE) : undefined,
                image: program.P_IMAGE || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800',
                location: program.P_LOCATION || 'ไม่ระบุ',
                country: program.P_COUNTRY || 'ไม่ระบุ',
                duration: `${program.P_DAY || 0} วัน ${program.P_NIGHT || 0} คืน`,
                days: parseInt(program.P_DAY) || 0,
                nights: parseInt(program.P_NIGHT) || 0,
                airline: program.P_AIRLINE || 'ไม่ระบุ',
                hotelStar: parseInt(program.P_HOTEL_STAR) || 3,
                meals: parseInt(program.P_MEALS) || 0,
                highlights,
                tags,
                rating: parseFloat(program.P_RATING) || 4.0,
                reviews: parseInt(program.P_REVIEWS) || 0,
                availability: program.P_AVAILABLE > 5 ? 'ว่าง' : 'เหลือน้อย',
                availableSlots: parseInt(program.P_AVAILABLE) || 0,
                wholesaler: program.P_WHOLESALER || 'TTN',
                wholesalerColor: program.P_WHOLESALER_COLOR || '#3B82F6'
              }
            })

          // Filter tours by selected IDs or take first tours as fallback
          let selectedTours: Tour[] = []
          
          // Try to find tours by matching IDs/codes
          for (const tourId of tourIds) {
            const matchingTour = processedTours.find(tour => 
              tour.id === tourId || 
              tour.code === tourId ||
              tour.code.toLowerCase() === tourId.toLowerCase()
            )
            if (matchingTour) {
              selectedTours.push(matchingTour)
            }
          }
          
          // If no matches found, use first tours as fallback for demo
          if (selectedTours.length === 0) {
            selectedTours = processedTours.slice(0, Math.min(tourIds.length, 10))
          }
          
          // Limit to maximum 10 tours
          setTours(selectedTours.slice(0, 10))
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการโหลดข้อมูล')
      } finally {
        setLoading(false)
      }
    }

    fetchToursForComparison()
  }, [searchParams])

  if (loading) {
    return <LoadingScreen title="กำลังโหลดการเปรียบเทียบ" subtitle="โปรดรอสักครู่..." />
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">เกิดข้อผิดพลาด</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link href="/tours-2">
            <Button variant="primary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              กลับไปหน้าทัวร์
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/tours-2">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  กลับ
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                  <BarChart3 className="w-8 h-8 mr-3 text-blue-500" />
                  เปรียบเทียบทัวร์
                </h1>
                <p className="text-gray-600 mt-1">เปรียบเทียบ {tours.length} โปรแกรม</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-600">
                เลือกได้สูงสุด 10 โปรแกรม
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tours Comparison Cards */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {tours.map((tour, index) => (
            <div key={tour.id} className="bg-white rounded-xl shadow-lg border overflow-hidden">
              {/* Rank Badge */}
              <div className="absolute top-4 left-4 z-10">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                  index === 0 ? 'bg-yellow-500' : 
                  index === 1 ? 'bg-gray-400' : 
                  index === 2 ? 'bg-orange-600' : 'bg-blue-500'
                }`}>
                  {index + 1}
                </div>
              </div>

              {/* Tour Image */}
              <div className="relative h-48">
                <Image
                  src={tour.image}
                  alt={tour.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-semibold text-gray-800">
                  {tour.code}
                </div>
              </div>

              {/* Tour Details */}
              <div className="p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">{tour.title}</h3>
                
                <div className="flex items-center text-gray-600 mb-3 text-sm">
                  <MapPin className="w-4 h-4 mr-1" />
                  {tour.location}
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">ราคา:</span>
                    <span className="font-bold text-blue-600 text-lg">฿{tour.price.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">ระยะเวลา:</span>
                    <span className="font-medium">{tour.duration}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">โรงแรม:</span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < tour.hotelStar ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">อาหาร:</span>
                    <span className="font-medium">{tour.meals} มื้อ</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">คะแนน:</span>
                    <div className="flex items-center">
                      <StarRating rating={tour.rating} size="sm" />
                      <span className="ml-1 font-medium">{tour.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">ที่ว่าง:</span>
                    <span className={`font-medium ${tour.availability === 'เหลือน้อย' ? 'text-red-500' : 'text-green-500'}`}>
                      {tour.availability}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <Link href={`/tours-detail-2/${tour.code}`}>
                    <Button variant="primary" size="sm" className="w-full">
                      ดูรายละเอียด
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Comparison Table */}
        <div className="bg-white rounded-xl shadow-lg border overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <TrendingUp className="w-6 h-6 mr-2 text-blue-500" />
              ตารางเปรียบเทียบรายละเอียด
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">รายการ</th>
                  {tours.map((tour, index) => (
                    <th key={tour.id} className="px-6 py-3 text-center text-sm font-semibold text-gray-600">
                      ทัวร์ {index + 1}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-600">ชื่อทัวร์</td>
                  {tours.map((tour) => (
                    <td key={tour.id} className="px-6 py-4 text-sm text-center">
                      <div className="font-medium text-gray-900 line-clamp-2">{tour.title}</div>
                    </td>
                  ))}
                </tr>
                
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-600">ราคา</td>
                  {tours.map((tour) => (
                    <td key={tour.id} className="px-6 py-4 text-sm text-center">
                      <div className="font-bold text-blue-600 text-lg">฿{tour.price.toLocaleString()}</div>
                    </td>
                  ))}
                </tr>
                
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-600">ระยะเวลา</td>
                  {tours.map((tour) => (
                    <td key={tour.id} className="px-6 py-4 text-sm text-center font-medium">{tour.duration}</td>
                  ))}
                </tr>
                
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-600">โรงแรม</td>
                  {tours.map((tour) => (
                    <td key={tour.id} className="px-6 py-4 text-sm text-center">
                      <div className="flex items-center justify-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < tour.hotelStar ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
                
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-600">อาหาร</td>
                  {tours.map((tour) => (
                    <td key={tour.id} className="px-6 py-4 text-sm text-center font-medium">{tour.meals} มื้อ</td>
                  ))}
                </tr>
                
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-600">คะแนนรีวิว</td>
                  {tours.map((tour) => (
                    <td key={tour.id} className="px-6 py-4 text-sm text-center">
                      <div className="flex items-center justify-center">
                        <StarRating rating={tour.rating} size="sm" />
                        <span className="ml-1 font-medium">{tour.rating}</span>
                      </div>
                    </td>
                  ))}
                </tr>
                
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-600">จำนวนรีวิว</td>
                  {tours.map((tour) => (
                    <td key={tour.id} className="px-6 py-4 text-sm text-center font-medium">{tour.reviews}</td>
                  ))}
                </tr>
                
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-600">ที่ว่าง</td>
                  {tours.map((tour) => (
                    <td key={tour.id} className="px-6 py-4 text-sm text-center">
                      <span className={`font-medium ${tour.availability === 'เหลือน้อย' ? 'text-red-500' : 'text-green-500'}`}>
                        {tour.availability}
                      </span>
                    </td>
                  ))}
                </tr>
                
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-600">ผู้ให้บริการ</td>
                  {tours.map((tour) => (
                    <td key={tour.id} className="px-6 py-4 text-sm text-center">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {tour.wholesaler}
                      </span>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Price Comparison Chart */}
        <div className="bg-white rounded-xl shadow-lg border p-6 mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <Award className="w-6 h-6 mr-2 text-purple-500" />
            เปรียบเทียบความคุ้มค่า
          </h2>
          
          <div className="space-y-4">
            {tours.map((tour, index) => {
              const valueScore = Math.min(100, Math.round((tour.rating * 20) + (tour.reviews / 100) + (5 - tour.hotelStar) * 5))
              return (
                <div key={tour.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3 w-1/3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-xs ${
                      index === 0 ? 'bg-yellow-500' : 
                      index === 1 ? 'bg-gray-400' : 
                      index === 2 ? 'bg-orange-600' : 'bg-blue-500'
                    }`}>
                      {index + 1}
                    </div>
                    <span className="text-sm font-medium">{tour.title.substring(0, 30)}...</span>
                  </div>
                  
                  <div className="flex items-center flex-1 mx-4">
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div 
                        className={`h-4 rounded-full ${
                          index === 0 ? 'bg-yellow-500' : 
                          index === 1 ? 'bg-gray-400' : 
                          index === 2 ? 'bg-orange-600' : 'bg-blue-500'
                        }`}
                        style={{width: `${valueScore}%`}}
                      ></div>
                    </div>
                    <span className="ml-3 text-sm font-medium">{valueScore}%</span>
                  </div>
                  
                  <div className="text-right w-1/4">
                    <div className="text-lg font-bold text-blue-600">฿{tour.price.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">ความคุ้มค่า</div>
                  </div>
                </div>
              )
            })}
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600">
              * คะแนนความคุ้มค่าคำนวณจากคะแนนรีวิว, จำนวนรีวิว, ระดับโรงแรม และราคา
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ComparePage() {
  return (
    <Suspense fallback={<LoadingScreen title="กำลังโหลดการเปรียบเทียบ" subtitle="โปรดรอสักครู่..." />}>
      <ComparePageContent />
    </Suspense>
  )
}