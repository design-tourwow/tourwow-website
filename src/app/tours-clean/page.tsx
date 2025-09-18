'use client'

import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Custom icons - Clean Minimalist style
const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
)

const FilterIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
  </svg>
)

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg className={`w-4 h-4 ${filled ? 'text-blue-500' : 'text-gray-300'}`} fill={filled ? "currentColor" : "none"} stroke={filled ? "none" : "currentColor"} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
)

const ClockIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const PeopleIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
)

const PlaneIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
  </svg>
)

const HeartIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
)

const ArrowRightIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
  </svg>
)

// Mock data for tours - same as Template A
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
    departureDates: ["5-11 ม.ค. 25", "15-21 ม.ค. 25", "1-7 ก.พ. 25", "10-16 ก.พ. 25"]
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
    departureDates: ["8-12 ม.ค. 25", "22-26 ม.ค. 25", "5-9 ก.พ. 25"]
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
    departureDates: ["3-6 ม.ค. 25", "10-13 ม.ค. 25", "17-20 ม.ค. 25", "24-27 ม.ค. 25", "31 ม.ค.-3 ก.พ. 25"]
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
    departureDates: ["12-19 ม.ค. 25", "2-9 ก.พ. 25", "16-23 ก.พ. 25"]
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
    departureDates: ["20-26 ม.ค. 25", "10-16 ก.พ. 25", "3-9 มี.ค. 25"]
  }
]

export default function ToursCleanPage() {
  const [tours, setTours] = useState<Tour[]>(mockTours)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('ทั้งหมด')
  const [priceRange, setPriceRange] = useState('ทั้งหมด')
  const [sortBy, setSortBy] = useState('ยอดนิยม')

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 800)
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent mb-4"></div>
          <p className="text-gray-600 text-sm">กำลังโหลดทัวร์...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop&q=80"
            alt="Beautiful international travel destination"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-transparent to-black/30"></div>
        </div>
        
        {/* Content */}
        <div className="relative container mx-auto px-6 py-20 md:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl mb-8 border border-white/30">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold text-white mb-6 tracking-tight drop-shadow-lg">
              ค้นหาทัวร์ในฝัน
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed drop-shadow-sm max-w-3xl mx-auto font-medium">
              เลือกจากทัวร์คุณภาพกว่า 100+ แพ็กเกจ ไปยังจุดหมายยอดนิยมทั่วโลก
            </p>
            
            {/* Optional CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                <span className="text-white text-sm font-medium">🌟 มีทัวร์ใหม่ทุกสัปดาห์</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Search & Filter Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-10">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder="ค้นหาจุดหมายปลายทาง เช่น ญี่ปุ่น เกาหลี..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-4 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors text-base"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ประเทศ</label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
              >
                {countries.map(country => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ช่วงราคา</label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
              >
                <option value="ทั้งหมด">ทั้งหมด</option>
                <option value="ต่ำกว่า 20,000">ต่ำกว่า ฿20,000</option>
                <option value="20,000-50,000">฿20,000 - ฿50,000</option>
                <option value="มากกว่า 50,000">มากกว่า ฿50,000</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">เรียงตาม</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
              >
                <option value="ยอดนิยม">ยอดนิยม</option>
                <option value="ราคาต่ำ">ราคาต่ำ - สูง</option>  
                <option value="ราคาสูง">ราคาสูง - ต่ำ</option>
                <option value="คะแนน">คะแนนสูงสุด</option>
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
                className="w-full p-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <FilterIcon />
                รีเซ็ต
              </button>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-8">
          <p className="text-gray-600">
            พบ <span className="text-blue-600 font-semibold">{filteredTours.length}</span> ทัวร์
          </p>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTours.map((tour) => (
            <Link 
              key={tour.id} 
              href={`/tours-clean/${tour.id}`}
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={tour.image}
                    alt={tour.name}
                    fill
                    className="object-cover transition-all duration-500 group-hover:scale-105"
                  />
                  
                  {/* Price Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-sm">
                      <div className="text-right">
                        {tour.originalPrice && (
                          <div className="text-xs text-gray-500 line-through">
                            ฿{tour.originalPrice.toLocaleString()}
                          </div>
                        )}
                        <div className="text-lg font-semibold text-blue-600">
                          ฿{tour.price.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="absolute top-4 left-4">
                    <div className="flex flex-wrap gap-2">
                      {tour.tags.slice(0, 2).map((tag, index) => (
                        <span
                          key={index}
                          className="bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Heart Icon */}
                  <div className="absolute bottom-4 right-4">
                    <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors">
                      <HeartIcon />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {tour.name}
                    </h3>
                    <p className="text-gray-600 text-sm font-medium">{tour.country}</p>
                  </div>

                  {/* Rating & Reviews */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} filled={i < Math.floor(tour.rating)} />
                      ))}
                    </div>
                    <span className="text-gray-900 font-semibold text-sm">{tour.rating}</span>
                    <span className="text-gray-500 text-sm">({tour.reviews} รีวิว)</span>
                  </div>

                  {/* Details */}
                  <div className="space-y-3 mb-4">
                    {/* Duration - เน้นให้โดดเด่น */}
                    <div className="bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-blue-700 font-medium">
                          <ClockIcon />
                          <span className="text-sm">{tour.duration}</span>
                        </div>
                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                          ระยะเวลา
                        </span>
                      </div>
                    </div>
                    
                    {/* Transportation */}
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <PlaneIcon />
                      <span>{tour.transportation}</span>
                    </div>
                  </div>

                  {/* Departure Dates - Clean Minimalist Style */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-3">
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm font-medium text-gray-700">วันเดินทาง</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {tour.departureDates.slice(0, 4).map((date, index) => (
                        <div
                          key={index}
                          className="text-xs bg-gray-50 border border-gray-200 text-gray-700 px-2 py-2 rounded-lg text-center hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-colors cursor-pointer"
                        >
                          {date}
                        </div>
                      ))}
                    </div>
                    {tour.departureDates.length > 4 && (
                      <div className="text-xs text-gray-500 text-center mt-2">
                        และอีก {tour.departureDates.length - 4} รอบ
                      </div>
                    )}
                  </div>

                  {/* Highlights */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {tour.highlights.slice(0, 3).map((highlight, index) => (
                        <span
                          key={index}
                          className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded-full border border-gray-200"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* View Details Button */}
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 text-sm font-medium">ดูรายละเอียด</span>
                      <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                        <ArrowRightIcon />
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
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <SearchIcon />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">ไม่พบทัวร์ที่ตรงกับเงื่อนไข</h3>
              <p className="text-gray-600 mb-6">
                ลองปรับเปลี่ยนคำค้นหาหรือตัวกรองเพื่อค้นหาทัวร์ที่เหมาะกับคุณ
              </p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCountry('ทั้งหมด')
                  setPriceRange('ทั้งหมด')
                  setSortBy('ยอดนิยม')
                }}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
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