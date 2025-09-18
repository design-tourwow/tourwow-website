'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  ArrowLeft, Heart, Star, MapPin, Calendar, Users, Clock, 
  Plane, Hotel, Utensils, Eye, Share2, X, Search, Filter,
  ArrowUpDown, Trash2, ShoppingCart, Download, FileText
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import StarRating from '@/components/StarRating'

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

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<string[]>([])
  const [tours, setTours] = useState<Tour[]>([])
  const [loading, setLoading] = useState(true)
  const [compareList, setCompareList] = useState<string[]>([])
  const [showCompareBar, setShowCompareBar] = useState(false)
  const [sortBy, setSortBy] = useState<'added' | 'price' | 'rating'>('added')

  useEffect(() => {
    // Load wishlist from localStorage
    const savedWishlist = localStorage.getItem('tourwow-wishlist')
    if (savedWishlist) {
      const wishlistIds = JSON.parse(savedWishlist)
      setWishlist(wishlistIds)
      
      // Fetch tour details for wishlist items
      fetchWishlistTours(wishlistIds)
    } else {
      setLoading(false)
    }
  }, [])

  const fetchWishlistTours = async (wishlistIds: string[]) => {
    try {
      setLoading(true)
      
      // Fetch tours data
      const response = await fetch("https://online.ttnconnect.com/api/agency/get-allprogram")
      
      if (!response.ok) {
        throw new Error('Failed to fetch tours')
      }

      const data = await response.json()
      
      if (Array.isArray(data)) {
        const processedTours: Tour[] = data
          .filter((item: any) => item.program?.[0])
          .map((item: any) => {
            const program = item.program[0]
            
            const highlights = program.P_HIGHLIGHT ? 
              program.P_HIGHLIGHT.split(',').map((h: string) => h.trim()).filter((h: string) => h.length > 0) : 
              []

            const tags = program.P_TAG ? 
              program.P_TAG.split(',').map((t: string) => t.trim()).filter((t: string) => t.length > 0) : 
              []

            const availableSlots = Math.floor(Math.random() * 20) + 1

            return {
              id: program.P_ID?.toString() || Math.random().toString(),
              title: program.P_NAME || 'ทัวร์',
              code: program.P_CODE || '',
              price: parseInt(program.P_PRICE) || 0,
              originalPrice: parseInt(program.P_PRICE) > 40000 ? Math.round(parseInt(program.P_PRICE) * 1.15) : undefined,
              image: program.BANNER || '/plane.svg',
              location: program.P_LOCATION || '',
              country: program.P_LOCATION || '',
              duration: `${program.P_DAY || 0} วัน ${program.P_NIGHT || 0} คืน`,
              days: parseInt(program.P_DAY) || 0,
              nights: parseInt(program.P_NIGHT) || 0,
              airline: program.P_AIRLINE || '',
              hotelStar: parseInt(program.P_HOTEL_STAR) || 3,
              meals: parseInt(program.P_MEAL) || 0,
              highlights,
              tags,
              rating: parseFloat(program.P_RATING) || Math.round((Math.random() * 1.5 + 3.5) * 10) / 10,
              reviews: parseInt(program.P_REVIEWS) || Math.floor(Math.random() * 50) + 10,
              availability: availableSlots <= 5 ? 'เหลือน้อย' : 'ว่าง',
              availableSlots,
              wholesaler: 'TTN',
              wholesalerColor: 'indigo'
            }
          })
          .filter(tour => wishlistIds.includes(tour.id))

        setTours(processedTours)
      }
    } catch (err) {
      console.error('Error fetching wishlist tours:', err)
    } finally {
      setLoading(false)
    }
  }

  const removeFromWishlist = (tourId: string) => {
    const newWishlist = wishlist.filter(id => id !== tourId)
    setWishlist(newWishlist)
    setTours(tours.filter(tour => tour.id !== tourId))
    localStorage.setItem('tourwow-wishlist', JSON.stringify(newWishlist))
  }

  const clearWishlist = () => {
    setWishlist([])
    setTours([])
    localStorage.removeItem('tourwow-wishlist')
  }

  // Compare functions
  const handleCompareToggle = (tourCode: string) => {
    setCompareList(prev => {
      if (prev.includes(tourCode)) {
        const newList = prev.filter(code => code !== tourCode)
        setShowCompareBar(newList.length > 0)
        return newList
      } else if (prev.length < 10) {
        const newList = [...prev, tourCode]
        setShowCompareBar(newList.length > 0)
        return newList
      }
      return prev
    })
  }

  const clearCompareList = () => {
    setCompareList([])
    setShowCompareBar(false)
  }

  const navigateToComparePage = () => {
    const compareParams = compareList.join(',')
    window.open(`/compare?tours=${compareParams}`, '_blank')
  }

  // Sort tours
  const sortedTours = [...tours].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price
      case 'rating':
        return b.rating - a.rating
      default:
        return 0 // Keep original order (added order)
    }
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-200 border-t-red-500 rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">กำลังโหลดรายการโปรด...</h2>
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
              <Link href="/wholesale-tours-3">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  กลับ
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                  <Heart className="w-8 h-8 mr-3 text-red-500 fill-current" />
                  รายการโปรด
                </h1>
                <p className="text-gray-600 mt-1">ทัวร์ที่คุณถูกใจ {tours.length} โปรแกรม</p>
              </div>
            </div>
            
            {tours.length > 0 && (
              <div className="flex items-center gap-3">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'added' | 'price' | 'rating')}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent"
                >
                  <option value="added">เรียงตามที่เพิ่ม</option>
                  <option value="price">ราคาต่ำ-สูง</option>
                  <option value="rating">คะแนนสูง-ต่ำ</option>
                </select>
                <Button variant="outline" size="sm" onClick={clearWishlist}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  ล้างทั้งหมด
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {tours.length === 0 ? (
          <div className="text-center py-16">
            <div className="mx-auto bg-red-100 rounded-full h-20 w-20 flex items-center justify-center mb-6">
              <Heart className="w-10 h-10 text-red-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">ยังไม่มีรายการโปรด</h3>
            <p className="text-gray-600 mb-6">เริ่มเพิ่มทัวร์ที่คุณชอบเข้ารายการโปรดกันเถอะ</p>
            <Link href="/wholesale-tours-3">
              <Button variant="primary" size="lg">
                <Search className="w-5 h-5 mr-2" />
                ค้นหาทัวร์
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedTours.map((tour) => (
              <div key={tour.id} className="bg-white rounded-xl shadow-lg border hover:shadow-xl transition-shadow">
                {/* Header with badges and actions */}
                <div className="p-4 border-b flex justify-between items-start">
                  <div className="flex flex-col gap-2">
                    <span className="text-xs bg-red-600 text-white px-2 py-1 rounded-full w-fit">
                      ❤️ รายการโปรด
                    </span>
                    {tour.availability === 'เหลือน้อย' && (
                      <span className="text-xs bg-orange-600 text-white px-2 py-1 rounded-full animate-pulse w-fit">
                        🔥 เหลือน้อย
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-gray-100 px-2 py-1 rounded-md text-xs font-semibold text-gray-800">
                      {tour.code}
                    </span>
                    <button
                      onClick={() => removeFromWishlist(tour.id)}
                      className="bg-red-100 text-red-600 p-2 rounded-full hover:bg-red-200 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Tour Details with Image */}
                <div className="p-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">{tour.title}</h3>
                  
                  <div className="flex items-center text-gray-600 mb-3 text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    {tour.location}
                  </div>

                  {/* Tour Image in Detail */}
                  <div className="relative h-32 mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={tour.image}
                      alt={tour.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1 text-gray-400" />
                      {tour.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1 text-gray-400" />
                      ว่าง {tour.availableSlots}
                    </div>
                    <div className="flex items-center">
                      <Hotel className="w-4 h-4 mr-1 text-gray-400" />
                      {tour.hotelStar}⭐
                    </div>
                    <div className="flex items-center">
                      <Plane className="w-4 h-4 mr-1 text-gray-400" />
                      {tour.airline}
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    <StarRating rating={tour.rating} size="sm" />
                    <span className="text-sm text-gray-600 ml-2">({tour.reviews})</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      {tour.originalPrice && (
                        <div className="text-sm text-gray-400 line-through">
                          ฿{tour.originalPrice.toLocaleString()}
                        </div>
                      )}
                      <div className="text-2xl font-bold text-blue-600">
                        ฿{tour.price.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCompareToggle(tour.code)}
                      className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center ${
                        compareList.includes(tour.code)
                          ? 'bg-orange-500 text-white hover:bg-orange-600'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <ArrowUpDown className="w-3 h-3 mr-1" />
                      {compareList.includes(tour.code) ? 'ยกเลิก' : 'เปรียบเทียบ'}
                    </button>
                    
                    <Link href={`/tours-detail-2/${tour.code}`} className="flex-1">
                      <Button variant="primary" size="sm" className="w-full">
                        ดูรายละเอียด
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Compare Bar */}
      {showCompareBar && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-40">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="w-5 h-5 text-orange-500" />
                  <span className="font-semibold text-gray-900">
                    เปรียบเทียบ ({compareList.length}/10)
                  </span>
                </div>
                
                <div className="flex gap-2 overflow-x-auto">
                  {compareList.map((tourCode) => {
                    const tour = tours.find(t => t.code === tourCode)
                    return (
                      <div key={tourCode} className="flex items-center bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm whitespace-nowrap">
                        <span className="mr-2">{tour?.title.substring(0, 20)}...</span>
                        <button
                          onClick={() => handleCompareToggle(tourCode)}
                          className="text-orange-600 hover:text-orange-800"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={clearCompareList}>
                  ล้างทั้งหมด
                </Button>
                <Button 
                  variant="primary" 
                  size="sm" 
                  onClick={navigateToComparePage}
                  disabled={compareList.length < 2}
                >
                  เปรียบเทียบ ({compareList.length})
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}