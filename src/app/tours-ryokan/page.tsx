'use client'

import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Japanese Zen-inspired icons
const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
)

const FilterIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
  </svg>
)

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg className={`w-4 h-4 ${filled ? 'text-amber-400' : 'text-stone-300'}`} fill={filled ? "currentColor" : "none"} stroke={filled ? "none" : "currentColor"} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
)

const ClockIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const PlaneIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 13l4 4L19 7" />
  </svg>
)

// Japanese-themed tour data
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
  season: string
}

const mockTours: Tour[] = [
  {
    id: "jp001",
    name: "ทัวร์ญี่ปุ่น โตเกียว โอซาก้า ฟูจิซัง 6 วัน 4 คืน",
    country: "ญี่ปุ่น",
    duration: "6 วัน 4 คืน",
    price: 69900,
    originalPrice: 79900,
    rating: 4.9,
    reviews: 245,
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop",
    tags: ["温泉", "寺院"],
    transportation: "การบินไทย",
    highlights: ["ภูเขาฟูจิ", "วัดเซนโซะจิ", "온천 Onsen"],
    season: "春 (Spring)"
  },
  {
    id: "jp002", 
    name: "เกาหลีใต้ โซล ปูซาน ดูใบไม้เปลี่ยนสี 5 วัน 3 คืน",
    country: "เกาหลีใต้",
    duration: "5 วัน 3 คืน",
    price: 42900,
    rating: 4.7,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop",
    tags: ["한복", "문화"],
    transportation: "แอร์เอเชีย X",
    highlights: ["พระราชวังเคียงบก", "หมู่บ้านฮันบก", "ตลาดมยองดง"],
    season: "秋 (Autumn)"
  },
  {
    id: "ch001",
    name: "จีน ปักกิ่ง เซี่ยงไฮ้ กำแพงเมืองจีน 6 วัน 4 คืน",
    country: "จีน",
    duration: "6 วัน 4 คืน", 
    price: 35900,
    originalPrice: 42900,
    rating: 4.6,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=400&h=300&fit=crop",
    tags: ["故宫", "长城"],
    transportation: "แอร์ไชน่า",
    highlights: ["พระราชวังต้องห้าม", "กำแพงเมืองจีน", "วัดแห่งสวรรค์"],
    season: "夏 (Summer)"
  },
  {
    id: "th001",
    name: "ไทยเหนือ เชียงใหม่ เชียงราย ดอยอินทนนท์ 3 วัน 2 คืน",
    country: "ไทย",
    duration: "3 วัน 2 คืน",
    price: 12900,
    rating: 4.8,
    reviews: 298,
    image: "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=400&h=300&fit=crop",
    tags: ["寺院", "自然"],
    transportation: "รถทัวร์",
    highlights: ["วัดโรงขุ่น", "ดอยสุเทพ", "ตลาดวอม"],
    season: "冬 (Winter)"
  }
]

export default function ToursRyokanPage() {
  const [tours, setTours] = useState<Tour[]>(mockTours)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('ทั้งหมด')
  const [priceRange, setPriceRange] = useState('ทั้งหมด')
  const [sortBy, setSortBy] = useState('ยอดนิยม')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    setTimeout(() => setLoading(false), 1200)
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
      default:
        filtered.sort((a, b) => b.reviews - a.reviews)
    }

    return filtered
  }, [tours, searchTerm, selectedCountry, priceRange, sortBy])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-stone-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-2 border-amber-400 border-t-transparent mb-4"></div>
          <p className="text-stone-600 text-lg font-light">กำลังค้นหาการเดินทางแห่งความสงบ...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-stone-50 to-amber-50">
      {/* Zen Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-20 right-10 w-32 h-32 rounded-full border border-amber-200" style={{animation: 'float 6s ease-in-out infinite'}}></div>
        <div className="absolute bottom-32 left-8 w-24 h-24 rounded-full border border-stone-300" style={{animation: 'float 8s ease-in-out infinite reverse'}}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full border border-amber-300" style={{animation: 'float 10s ease-in-out infinite'}}></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 bg-gradient-to-b from-stone-800 via-stone-700 to-stone-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500/20 backdrop-blur-sm rounded-full mb-6">
            <span className="text-2xl">🌸</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-light text-amber-100 mb-4 tracking-wide">
            หัวใจนักเดินทาง
          </h1>
          <p className="text-xl text-stone-200 mb-2 font-light">
            Premium Travel Experience
          </p>
          <p className="text-lg text-stone-300 mb-8 leading-relaxed">
            ค้นพบเส้นทางแห่งความสงบ ด้วยจิตใจที่เปิดกว้าง
          </p>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Search Section */}
        <div className="mb-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-stone-200 p-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder="ค้นหาการเดินทางในฝัน..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-stone-300 rounded-xl text-stone-900 placeholder-stone-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100 transition-all text-lg"
              />
            </div>
          </div>
        </div>

        {/* Filter Toggle Button (Mobile) */}
        <div className="mb-6 md:hidden">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full bg-stone-100 border border-stone-300 rounded-xl p-4 flex items-center justify-center gap-2 text-stone-700 font-medium"
          >
            <FilterIcon />
            <span>ตัวกรอง</span>
          </button>
        </div>

        {/* Filters - Mobile Bottom Sheet Style */}
        {(showFilters || window.innerWidth >= 768) && (
          <div className="mb-8">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-stone-200 p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">🗾 ประเทศ</label>
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="w-full p-3 border border-stone-300 rounded-lg text-stone-900 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-100 transition-all"
                  >
                    {countries.map(country => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">💰 ช่วงราคา</label>
                  <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full p-3 border border-stone-300 rounded-lg text-stone-900 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-100 transition-all"
                  >
                    <option value="ทั้งหมด">ทั้งหมด</option>
                    <option value="ต่ำกว่า 20,000">ต่ำกว่า ฿20,000</option>
                    <option value="20,000-50,000">฿20,000 - ฿50,000</option>
                    <option value="มากกว่า 50,000">มากกว่า ฿50,000</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">📊 เรียงตาม</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full p-3 border border-stone-300 rounded-lg text-stone-900 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-100 transition-all"
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
                      setShowFilters(false)
                    }}
                    className="w-full p-3 bg-stone-200 text-stone-700 rounded-lg hover:bg-stone-300 transition-colors font-medium"
                  >
                    รีเซ็ต
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results Counter */}
        <div className="mb-6 text-center">
          <p className="text-stone-600 text-lg">
            พบ <span className="text-amber-600 font-medium text-xl">{filteredTours.length}</span> ทัวร์ที่ตรงใจ
          </p>
        </div>

        {/* Tours Grid - Mobile First Single Column */}
        <div className="space-y-6 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 md:space-y-0">
          {filteredTours.map((tour, index) => (
            <Link 
              key={tour.id} 
              href={`/tours-ryokan/${tour.id}`}
              className="block group"
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-stone-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                {/* Image */}
                <div className="relative h-48 md:h-56 overflow-hidden">
                  <Image
                    src={tour.image}
                    alt={tour.name}
                    fill
                    className="object-cover transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  
                  {/* Season Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-amber-500/90 backdrop-blur-sm text-white text-sm font-medium px-3 py-1 rounded-full">
                      {tour.season}
                    </span>
                  </div>

                  {/* Price Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-sm">
                      <div className="text-right">
                        {tour.originalPrice && (
                          <div className="text-xs text-stone-500 line-through">
                            ฿{tour.originalPrice.toLocaleString()}
                          </div>
                        )}
                        <div className="text-lg font-semibold text-amber-600">
                          ฿{tour.price.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="absolute bottom-4 left-4">
                    <div className="flex gap-2">
                      {tour.tags.slice(0, 2).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="bg-stone-800/80 backdrop-blur-sm text-amber-200 text-xs font-medium px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-medium text-stone-900 mb-2 line-clamp-2 group-hover:text-amber-700 transition-colors leading-relaxed">
                      {tour.name}
                    </h3>
                    <p className="text-stone-600 text-sm font-medium">{tour.country}</p>
                  </div>

                  {/* Rating & Reviews */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} filled={i < Math.floor(tour.rating)} />
                      ))}
                    </div>
                    <span className="text-stone-900 font-medium text-sm">{tour.rating}</span>
                    <span className="text-stone-500 text-sm">({tour.reviews} 評価)</span>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-stone-600 text-sm">
                      <ClockIcon />
                      <span>{tour.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-stone-600 text-sm">
                      <PlaneIcon />
                      <span>{tour.transportation}</span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {tour.highlights.slice(0, 3).map((highlight, hIndex) => (
                        <span
                          key={hIndex}
                          className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded-full border border-amber-200"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* View Details */}
                  <div className="pt-4 border-t border-stone-100">
                    <div className="flex items-center justify-between">
                      <span className="text-stone-600 text-sm font-medium">詳細を見る</span>
                      <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                        <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
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
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-stone-200 p-12 max-w-md mx-auto">
              <div className="text-6xl mb-4">🍂</div>
              <h3 className="text-xl font-medium text-stone-900 mb-4">旅路が見つかりません</h3>
              <p className="text-stone-600 mb-6">
                検索条件を調整して、心に響く旅を見つけてください
              </p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCountry('ทั้งหมด')
                  setPriceRange('ทั้งหมด')
                  setSortBy('ยอดนิยม')
                }}
                className="bg-amber-500 text-white px-6 py-3 rounded-lg hover:bg-amber-600 transition-colors font-medium"
              >
                リセット
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  )
}