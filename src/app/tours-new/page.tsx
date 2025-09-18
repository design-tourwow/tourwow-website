'use client'

import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Custom icons - no shared components
const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
)

const FilterIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
  </svg>
)

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg className={`w-4 h-4 ${filled ? 'text-yellow-400' : 'text-slate-400'}`} fill={filled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
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
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 18h18M8 5l4 4 4-4v12l-4-4-4 4V5z" />
  </svg>
)

const BusIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 17a2 2 0 100-4 2 2 0 000 4zM16 17a2 2 0 100-4 2 2 0 000 4zM5 8h14a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2V10a2 2 0 012-2zM5 8V6a2 2 0 012-2h10a2 2 0 012 2v2" />
  </svg>
)

// Mock data for tours
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
  remainingSlots?: number
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
    departureDates: ["7-13 ม.ค. 25", "18-24 ม.ค. 25", "3-9 ก.พ. 25", "17-23 ก.พ. 25"]
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
    tags: ["เหลือน้อย", "ใบไม้เปลี่ยนสี"],
    transportation: "แอร์เอเชีย X",
    highlights: ["พระราชวังเคียงบก", "ป่าไผ่", "ตลาดมยองดง"],
    departureDates: ["12-16 ม.ค. 25", "26-30 ม.ค. 25", "9-13 ก.พ. 25"]
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
    remainingSlots: 3,
    departureDates: ["5-8 ม.ค. 25", "12-15 ม.ค. 25", "19-22 ม.ค. 25", "26-29 ม.ค. 25", "2-5 ก.พ. 25"]
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
    departureDates: ["15-22 ม.ค. 25", "5-12 ก.พ. 25", "19-26 ก.พ. 25"]
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
    departureDates: ["25 ม.ค.-1 ก.พ. 25", "15-21 ก.พ. 25", "8-14 มี.ค. 25"]
  }
]

export default function ToursNewPage() {
  const [tours, setTours] = useState<Tour[]>(mockTours)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('ทั้งหมด')
  const [priceRange, setPriceRange] = useState('ทั้งหมด')
  const [sortBy, setSortBy] = useState('ยอดนิยม')

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1000)
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-cyan-400 border-t-transparent mb-4"></div>
          <p className="text-cyan-100 text-lg">กำลังโหลดทัวร์ที่น่าสนใจ...</p>
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

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 mb-6">
            DISCOVER
            <br />
            <span className="text-white">THE WORLD</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
            สำรวจทัวร์ท่องเที่ยวระดับพรีเมียม ด้วยเทคโนโลยีล้ำสมัย และประสบการณ์ที่ไม่มีวันลืม
          </p>
        </div>

        {/* Search & Filter Section */}
        <div className="relative mb-16">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                  <SearchIcon />
                </div>
                <input
                  type="text"
                  placeholder="ค้นหาจุดหมายปลายทางที่คุณฝัน..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all text-lg backdrop-blur-sm"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">ประเทศ</label>
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all backdrop-blur-sm"
                >
                  {countries.map(country => (
                    <option key={country} value={country} className="bg-slate-800 text-white">
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">ช่วงราคา</label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all backdrop-blur-sm"
                >
                  <option value="ทั้งหมด" className="bg-slate-800">ทั้งหมด</option>
                  <option value="ต่ำกว่า 20,000" className="bg-slate-800">ต่ำกว่า ฿20,000</option>
                  <option value="20,000-50,000" className="bg-slate-800">฿20,000 - ฿50,000</option>
                  <option value="มากกว่า 50,000" className="bg-slate-800">มากกว่า ฿50,000</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">เรียงตาม</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all backdrop-blur-sm"
                >
                  <option value="ยอดนิยม" className="bg-slate-800">ยอดนิยม</option>
                  <option value="ราคาต่ำ" className="bg-slate-800">ราคาต่ำ - สูง</option>  
                  <option value="ราคาสูง" className="bg-slate-800">ราคาสูง - ต่ำ</option>
                  <option value="คะแนน" className="bg-slate-800">คะแนนสูงสุด</option>
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
                  className="w-full p-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all font-medium flex items-center justify-center gap-2"
                >
                  <FilterIcon />
                  รีเซ็ต
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-8">
          <p className="text-slate-200 text-lg">
            พบ <span className="text-cyan-300 font-bold text-xl">{filteredTours.length}</span> ทัวร์ที่ตรงกับความต้องการของคุณ
          </p>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTours.map((tour) => (
            <Link 
              key={tour.id} 
              href={`/tours-new/${tour.id}`}
              className="group relative"
            >
              <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl overflow-hidden hover:bg-white/15 transition-all duration-500 hover:scale-105 shadow-2xl">
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={tour.image}
                    alt={tour.name}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Price Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="backdrop-blur-md bg-black/40 border border-white/20 rounded-full px-4 py-2">
                      <div className="text-right">
                        {tour.originalPrice && (
                          <div className="text-xs text-slate-300 line-through">
                            ฿{tour.originalPrice.toLocaleString()}
                          </div>
                        )}
                        <div className="text-lg font-bold text-cyan-400">
                          ฿{tour.price.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="absolute top-4 left-4">
                    <div className="flex flex-wrap gap-2">
                      {tour.remainingSlots && tour.remainingSlots <= 5 && (
                        <span className="backdrop-blur-md bg-gradient-to-r from-red-500/80 to-orange-600/80 text-white text-xs font-medium px-3 py-1 rounded-full border border-white/20 animate-pulse">
                          เหลือเพียง {tour.remainingSlots} ที่นั่ง
                        </span>
                      )}
                      {tour.tags.slice(0, tour.remainingSlots && tour.remainingSlots <= 5 ? 1 : 2).map((tag, index) => (
                        <span
                          key={index}
                          className="backdrop-blur-md bg-gradient-to-r from-cyan-500/80 to-purple-600/80 text-white text-xs font-medium px-3 py-1 rounded-full border border-white/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-3">
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-cyan-300 transition-colors">
                      {tour.name}
                    </h3>
                    <p className="text-slate-300 text-sm font-medium">{tour.country}</p>
                  </div>

                  {/* Rating & Reviews */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} filled={i < Math.floor(tour.rating)} />
                      ))}
                    </div>
                    <span className="text-cyan-300 font-bold">{tour.rating}</span>
                    <span className="text-slate-200 text-sm">({tour.reviews} รีวิว)</span>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-slate-200 text-sm">
                      <ClockIcon />
                      <span>{tour.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-200 text-sm">
                      {tour.transportation.includes('รถทัวร์') ? <BusIcon /> : <PlaneIcon />}
                      <span>{tour.transportation}</span>
                    </div>
                  </div>

                  {/* Departure Dates - Futuristic Theme */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-3">
                      <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-xs font-semibold text-cyan-300 uppercase tracking-wider">วันเดินทาง</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {tour.departureDates.slice(0, 4).map((date, index) => (
                        <div
                          key={index}
                          className="text-xs backdrop-blur-md bg-white/5 border border-cyan-400/30 text-cyan-100 px-3 py-2 rounded-lg text-center hover:bg-cyan-400/10 hover:border-cyan-400/50 hover:text-cyan-300 transition-all cursor-pointer transform hover:scale-105"
                        >
                          {date}
                        </div>
                      ))}
                    </div>
                    {tour.departureDates.length > 4 && (
                      <div className="text-xs text-slate-400 text-center mt-2">
                        และอีก {tour.departureDates.length - 4} รอบ
                      </div>
                    )}
                  </div>

                  {/* Landmarks Section */}
                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">จุดท่องเที่ยวยอดนิยม</h4>
                    <div className="flex flex-wrap gap-1">
                      {tour.highlights.slice(0, 3).map((highlight, index) => (
                        <span
                          key={index}
                          className="text-xs bg-white/10 text-slate-200 px-2 py-1 rounded-full border border-white/20"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* View Details Button */}
                  <div className="pt-4 border-t border-white/20">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-200 text-sm font-medium">ดูรายละเอียด</span>
                      <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-12 max-w-md mx-auto">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                <SearchIcon />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">ไม่พบทัวร์ที่ตรงกับเงื่อนไข</h3>
              <p className="text-slate-300 mb-6">
                ลองปรับเปลี่ยนคำค้นหาหรือตัวกรองเพื่อค้นหาทัวร์ที่เหมาะกับคุณ
              </p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCountry('ทั้งหมด')
                  setPriceRange('ทั้งหมด')
                  setSortBy('ยอดนิยม')
                }}
                className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all font-medium"
              >
                รีเซ็ตตัวกรอง
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}