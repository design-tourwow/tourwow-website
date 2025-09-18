'use client'

import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Custom icons - Vibrant Playful style
const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
)

const FilterIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 713 7V4z" />
  </svg>
)

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg className={`w-4 h-4 ${filled ? 'text-yellow-400' : 'text-gray-300'}`} fill={filled ? "currentColor" : "none"} stroke={filled ? "none" : "currentColor"} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
)

const ClockIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const PeopleIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
)

const PlaneIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

const HeartIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
)

const SparkleIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l1.5 6L12 8l-5.5 1L5 15l-1.5-6L0 8l5.5-1L5 3z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12l1 4-4-1-1-4 4 1z" />
  </svg>
)

// Mock data for tours - same data, vibrant presentation
interface Tour {
  id: string
  name: string
  country: string
  duration: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  image: string
  tags: string[]
  transportation: string
  highlights: string[]
  departureDates: string[]
}

const mockTours: Tour[] = [
  {
    id: "jp001",
    name: "ทัวร์ญี่ปุ่น โตเกียว โอซาก้า ฟูจิซัง 6 วัน 4 คืน",
    country: "ญี่ปุ่น",
    duration: "6 วัน 4 คืน",
    price: 49900,
    originalPrice: 59900,
    rating: 4.8,
    reviews: 245,
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop",
    tags: ["ยอดนิยม", "ประหยัด"],
    transportation: "การบินไทย",
    highlights: ["ภูเขาฟูจิ", "วัดเซนโซะจิ", "ดิสนีย์แลนด์"],
    departureDates: ["8-14 ม.ค. 25", "22-28 ม.ค. 25", "5-11 ก.พ. 25", "19-25 ก.พ. 25"]
  },
  {
    id: "kr002",
    name: "เกาหลีใต้ โซล ปูซาน ดูใบไม้เปลี่ยนสี 5 วัน 3 คืน",
    country: "เกาหลีใต้",
    duration: "5 วัน 3 คืน",
    price: 32900,
    rating: 4.6,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop",
    tags: ["ใหม่", "ใบไม้เปลี่ยนสี"],
    transportation: "แอร์เอเชีย X",
    highlights: ["พระราชวังเคียงบก", "ป่าไผ่", "ตลาดมยองดง"],
    departureDates: ["11-15 ม.ค. 25", "25-29 ม.ค. 25", "8-12 ก.พ. 25"]
  },
  {
    id: "sg003",
    name: "สิงคโปร์ มาเลเซีย คูลาลัมเปอร์ 4 วัน 3 คืน",
    country: "สิงคโปร์",
    duration: "4 วัน 3 คืน",
    price: 19900,
    originalPrice: 24900,
    rating: 4.5,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=400&h=300&fit=crop",
    tags: ["โปรโมชั่น", "ครอบครัว"],
    transportation: "สิงคโปร์แอร์",
    highlights: ["การ์เด้นส์ บาย เดอะ เบย์", "เปโตรนาส", "สะพานยึดโยง"],
    departureDates: ["6-9 ม.ค. 25", "13-16 ม.ค. 25", "20-23 ม.ค. 25", "27-30 ม.ค. 25", "3-6 ก.พ. 25"]
  },
  {
    id: "th004",
    name: "ไทยเหนือ เชียงใหม่ เชียงราย ดอยอินทนนท์ 3 วัน 2 คืน",
    country: "ไทย",
    duration: "3 วัน 2 คืน",
    price: 8900,
    rating: 4.7,
    reviews: 298,
    image: "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=400&h=300&fit=crop",
    tags: ["ในประเทศ", "ธรรมชาติ"],
    transportation: "รถทัวร์",
    highlights: ["วัดโรงขุ่น", "ดอยสุเทพ", "ตลาดวอร์ดิ"],
    departureDates: ["ทุกวันเสาร์", "ทุกวันอาทิตย์"]
  },
  {
    id: "eu005",
    name: "ยุโรป 4 ประเทศ ฝรั่งเศส เยอรมนี สวิส อิตาลี 8 วัน",
    country: "ยุโรป",
    duration: "8 วัน 6 คืน",
    price: 89900,
    originalPrice: 99900,
    rating: 4.9,
    reviews: 87,
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&h=300&fit=crop",
    tags: ["พรีเมียม", "หลายประเทศ"],
    transportation: "เอมิเรตส์",
    highlights: ["หอไอเฟล", "นอยชวานสไตน์", "โคลอสเซียม"],
    departureDates: ["16-23 ม.ค. 25", "6-13 ก.พ. 25", "20-27 ก.พ. 25"]
  },
  {
    id: "us006",
    name: "อเมริกา นิวยอร์ค ลาสเวกัส แกรนด์แคนยอน 7 วัน",
    country: "อเมริกา",
    duration: "7 วัน 5 คืน",
    price: 79900,
    rating: 4.4,
    reviews: 134,
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop",
    tags: ["ผจญภัย", "เมืองใหญ่"],
    transportation: "ยูไนเต็ด",
    highlights: ["รูปปั้นเสรีภาพ", "แกรนด์แคนยอน", "ลาสเวกัส"],
    departureDates: ["28 ม.ค.-4 ก.พ. 25", "18-24 ก.พ. 25", "11-17 มี.ค. 25"]
  }
]

// Vibrant colors for different elements
const vibrantColors = [
  'from-pink-400 to-red-400',
  'from-purple-400 to-blue-400', 
  'from-green-400 to-teal-400',
  'from-yellow-400 to-orange-400',
  'from-indigo-400 to-purple-400',
  'from-red-400 to-pink-400'
]

const tagColors = [
  'bg-gradient-to-r from-pink-500 to-rose-500',
  'bg-gradient-to-r from-purple-500 to-indigo-500',
  'bg-gradient-to-r from-blue-500 to-cyan-500',
  'bg-gradient-to-r from-green-500 to-emerald-500',
  'bg-gradient-to-r from-yellow-500 to-orange-500',
  'bg-gradient-to-r from-red-500 to-pink-500'
]

export default function ToursVibrantPage() {
  const [tours, setTours] = useState<Tour[]>(mockTours)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('ทั้งหมด')
  const [priceRange, setPriceRange] = useState('ทั้งหมด')
  const [sortBy, setSortBy] = useState('ยอดนิยม')

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 900)
  }, [])

  const countries = useMemo(() => {
    return ['ทั้งหมด', ...new Set(tours.map(tour => tour.country))]
  }, [tours])

  const filteredTours = useMemo(() => {
    let filtered = tours.filter(tour => {
      const matchesSearch = searchTerm === '' || tour.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCountry = selectedCountry === 'ทั้งหมด' || tour.country === selectedCountry
      const matchesPrice = priceRange === 'ทั้งหมด' || 
        (priceRange === 'ต่ำกว่า 20,000' && tour.price < 20000) ||
        (priceRange === '20,000-50,000' && tour.price >= 20000 && tour.price <= 50000) ||
        (priceRange === 'มากกว่า 50,000' && tour.price > 50000)
      
      return matchesSearch && matchesCountry && matchesPrice
    })

    // Sort
    switch (sortBy) {
      case 'ราคาต่ำ':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'ราคาสูง':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'คะแนน':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      default: // ยอดนิยม
        filtered.sort((a, b) => b.reviews - a.reviews)
    }

    return filtered
  }, [tours, searchTerm, selectedCountry, priceRange, sortBy])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-pink-500 border-t-transparent mb-4"></div>
          <p className="text-gray-700 text-lg font-medium">กำลังโหลดทัวร์สุดเจ๋ง...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100">
      {/* Floating decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-200 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-pink-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-purple-200 rounded-full opacity-20 animate-bounce delay-1000"></div>
        <div className="absolute bottom-40 right-1/3 w-24 h-24 bg-blue-200 rounded-full opacity-20 animate-pulse delay-500"></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white">
        <div className="container mx-auto px-6 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-6 animate-pulse">
              <SparkleIcon />
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 animate-fade-in">
              🌈 <span className="bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">เที่ยวสนุก</span>
              <br />
              <span className="text-white drop-shadow-lg">ทั่วโลก</span> ✈️
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed font-medium">
              🎉 ค้นพบประสบการณ์ท่องเที่ยวสุดมันส์ ด้วยทัวร์สีสันสดใสที่จะทำให้คุณหลงรัก! 🏖️
            </p>
            
            {/* Fun stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 transform hover:scale-105 transition-transform">
                <div className="text-2xl font-bold text-yellow-200">2000+</div>
                <div className="text-white/80 text-sm">ทัวร์สุดเจ๋ง</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 transform hover:scale-105 transition-transform">
                <div className="text-2xl font-bold text-pink-200">100+</div>
                <div className="text-white/80 text-sm">ประเทศ</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 transform hover:scale-105 transition-transform">
                <div className="text-2xl font-bold text-cyan-200">50K+</div>
                <div className="text-white/80 text-sm">นักเดินทาง</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 transform hover:scale-105 transition-transform">
                <div className="text-2xl font-bold text-green-200">4.8⭐</div>
                <div className="text-white/80 text-sm">คะแนนเฉลี่ย</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Search & Filter Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border-2 border-white/50 p-8 mb-12 transform hover:scale-[1.02] transition-transform">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder="🔍 ค้นหาทัวร์ในฝันของคุณ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-6 py-5 border-2 border-purple-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:border-purple-400 focus:outline-none focus:ring-4 focus:ring-purple-100 transition-all text-lg font-medium"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">🌍 ประเทศ</label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full p-4 border-2 border-pink-200 rounded-xl text-gray-900 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all font-medium"
              >
                {countries.map(country => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">💰 ช่วงราคา</label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full p-4 border-2 border-green-200 rounded-xl text-gray-900 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-100 transition-all font-medium"
              >
                <option value="ทั้งหมด">ทั้งหมด</option>
                <option value="ต่ำกว่า 20,000">ต่ำกว่า ฿20,000</option>
                <option value="20,000-50,000">฿20,000 - ฿50,000</option>
                <option value="มากกว่า 50,000">มากกว่า ฿50,000</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">📊 เรียงตาม</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-4 border-2 border-blue-200 rounded-xl text-gray-900 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium"
              >
                <option value="ยอดนิยม">🔥 ยอดนิยม</option>
                <option value="ราคาต่ำ">💵 ราคาต่ำ - สูง</option>
                <option value="ราคาสูง">💎 ราคาสูง - ต่ำ</option>
                <option value="คะแนน">⭐ คะแนนสูงสุด</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCountry('ทั้งหมด')
                  setPriceRange('ทั้งหมด')
                  setSortBy('ยอดนิยม')
                }}
                className="w-full p-4 bg-gradient-to-r from-orange-400 to-red-400 text-white rounded-xl hover:from-orange-500 hover:to-red-500 transition-all font-bold flex items-center justify-center gap-2 transform hover:scale-105 shadow-lg"
              >
                <FilterIcon />
                🔄 รีเซ็ต
              </button>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-8 text-center">
          <p className="text-gray-700 text-xl font-bold">
            🎯 พบ <span className="text-purple-600 text-2xl">{filteredTours.length}</span> ทัวร์สุดเจ๋งสำหรับคุณ! 🎉
          </p>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTours.map((tour, index) => (
            <Link 
              key={tour.id} 
              href={`/tours-vibrant/${tour.id}`}
              className="group"
            >
              <div className="bg-white rounded-3xl shadow-xl border-2 border-white/50 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:rotate-1 transform">
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={tour.image}
                    alt={tour.name}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${vibrantColors[index % vibrantColors.length]} opacity-20`} />
                  
                  {/* Price Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg border-2 border-white/50">
                      <div className="text-right">
                        {tour.originalPrice && (
                          <div className="text-xs text-gray-500 line-through font-medium">
                            ฿{tour.originalPrice.toLocaleString()}
                          </div>
                        )}
                        <div className="text-lg font-black text-purple-600">
                          ฿{tour.price.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="absolute top-4 left-4">
                    <div className="flex flex-wrap gap-2">
                      {tour.tags.slice(0, 2).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className={`${tagColors[tagIndex % tagColors.length]} text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Heart Icon */}
                  <div className="absolute bottom-4 right-4">
                    <button className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-pink-100 transition-colors border-2 border-white/50 hover:scale-110 transform">
                      <HeartIcon />
                    </button>
                  </div>

                  {/* Fun Badge */}
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-yellow-400 text-yellow-900 text-xs font-black px-3 py-1 rounded-full shadow-lg animate-bounce">
                      🎊 สนุกมาก!
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                      {tour.name}
                    </h3>
                    <p className="text-purple-600 text-sm font-bold flex items-center gap-1">
                      🌍 {tour.country}
                    </p>
                  </div>

                  {/* Rating & Reviews */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} filled={i < Math.floor(tour.rating)} />
                      ))}
                    </div>
                    <span className="text-gray-900 font-bold text-sm">{tour.rating}</span>
                    <span className="text-gray-600 text-sm">({tour.reviews} รีวิว)</span>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-700 text-sm font-medium">
                      <ClockIcon />
                      <span>⏰ {tour.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 text-sm font-medium">
                      <PlaneIcon />
                      <span>✈️ {tour.transportation}</span>
                    </div>
                  </div>

                  {/* Departure Dates - Vibrant Colorful Style */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-3">
                      <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm font-black text-purple-700">🗓️ วันเดินทาง</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {tour.departureDates.slice(0, 4).map((date, dateIndex) => (
                        <div
                          key={dateIndex}
                          className={`text-xs ${tagColors[dateIndex % tagColors.length]} text-white px-3 py-2 rounded-full text-center font-bold shadow-md hover:shadow-lg transform hover:scale-105 transition-all cursor-pointer animate-pulse`}
                        >
                          {date}
                        </div>
                      ))}
                    </div>
                    {tour.departureDates.length > 4 && (
                      <div className="text-xs text-purple-600 text-center mt-2 font-bold">
                        🎊 และอีก {tour.departureDates.length - 4} รอบสุดมันส์!
                      </div>
                    )}
                  </div>

                  {/* Highlights */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {tour.highlights.slice(0, 3).map((highlight, hIndex) => (
                        <span
                          key={hIndex}
                          className="text-xs bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-3 py-1 rounded-full border border-purple-200 font-medium"
                        >
                          ✨ {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* View Details Button */}
                  <div className="pt-4 border-t-2 border-gradient-to-r border-purple-100">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 text-sm font-bold">🎯 ดูรายละเอียด</span>
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredTours.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border-2 border-white/50 p-12 max-w-md mx-auto">
              <div className="text-6xl mb-4">😢</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">ไม่พบทัวร์ที่ตรงกับเงื่อนไข</h3>
              <p className="text-gray-600 mb-6">
                ลองปรับเปลี่ยนคำค้นหาหรือตัวกรองเพื่อค้นหาทัวร์สุดเจ๋งที่เหมาะกับคุณ! 🎉
              </p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCountry('ทั้งหมด')
                  setPriceRange('ทั้งหมด')
                  setSortBy('ยอดนิยม')
                }}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all font-bold transform hover:scale-105 shadow-lg"
              >
                🔄 รีเซ็ตตัวกรอง
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}