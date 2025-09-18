'use client'

import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Safari Adventure icons
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
  <svg className={`w-4 h-4 ${filled ? 'text-yellow-500' : 'text-stone-400'}`} fill={filled ? "currentColor" : "none"} stroke={filled ? "none" : "currentColor"} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
)

const ClockIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const PlaneIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

const BinocularsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
)

// Safari-themed tour data
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
  wildlife: string[]
  difficulty: string
}

const mockTours: Tour[] = [
  {
    id: "af001",
    name: "เคนยา แทนซาเนีย มาซาอิมาร่า เซเรนเกตี 8 วัน 6 คืน",
    country: "เคนยา & แทนซาเนีย",
    duration: "8 วัน 6 คืน",
    price: 159900,
    originalPrice: 179900,
    rating: 4.9,
    reviews: 187,
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&h=300&fit=crop",
    tags: ["Big 5", "Great Migration"],
    transportation: "Qatar Airways",
    highlights: ["มาซาอิมาร่า", "เซเรนเกตี", "Ngorongoro Crater"],
    wildlife: ["🦁 Lions", "🐘 Elephants", "🦏 Rhinos", "🐆 Leopards", "🐃 Buffalo"],
    difficulty: "Moderate"
  },
  {
    id: "af002", 
    name: "แอฟริกาใต้ เคปทาวน์ ซาฟารี ครูเกอร์ 7 วัน 5 คืน",
    country: "แอฟริกาใต้",
    duration: "7 วัน 5 คืน",
    price: 129900,
    rating: 4.8,
    reviews: 245,
    image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=300&fit=crop",
    tags: ["Wine Safari", "Luxury"],
    transportation: "South African Airways",
    highlights: ["Kruger National Park", "Table Mountain", "Cape Winelands"],
    wildlife: ["🦁 Lions", "🐘 Elephants", "🦓 Zebras", "🦒 Giraffes"],
    difficulty: "Easy"
  },
  {
    id: "af003",
    name: "บอตสวานา โอคาวันโก้ เดลต้า ช่วงน้ำท่วม 6 วัน 4 คืน",
    country: "บอตสวานา",
    duration: "6 วัน 4 คืน", 
    price: 189900,
    originalPrice: 219900,
    rating: 4.9,
    reviews: 98,
    image: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=400&h=300&fit=crop",
    tags: ["Luxury Lodge", "Water Safari"],
    transportation: "Emirates",
    highlights: ["Okavango Delta", "Moremi Game Reserve", "Mokoro Rides"],
    wildlife: ["🦛 Hippos", "🐊 Crocodiles", "🐘 Elephants", "🦅 Birds"],
    difficulty: "Luxury"
  },
  {
    id: "af004",
    name: "ซิมบับเว แซมเบีย วิคตอเรียฟอลส์ 5 วัน 3 คืน",
    country: "ซิมบับเว & แซมเบีย",
    duration: "5 วัน 3 คืน",
    price: 89900,
    rating: 4.7,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop",
    tags: ["Waterfall", "Adventure"],
    transportation: "Ethiopian Airlines",
    highlights: ["Victoria Falls", "Zambezi River", "Sunset Cruise"],
    wildlife: ["🦛 Hippos", "🐊 Crocodiles", "🦅 Eagles"],
    difficulty: "Adventure"
  }
]

const difficultyColors = {
  "Easy": "bg-green-100 text-green-700 border-green-200",
  "Moderate": "bg-yellow-100 text-yellow-700 border-yellow-200", 
  "Adventure": "bg-orange-100 text-orange-700 border-orange-200",
  "Luxury": "bg-purple-100 text-purple-700 border-purple-200"
}

export default function ToursSafariPage() {
  const [tours, setTours] = useState<Tour[]>(mockTours)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('ทั้งหมด')
  const [priceRange, setPriceRange] = useState('ทั้งหมด')
  const [sortBy, setSortBy] = useState('ยอดนิยม')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500)
  }, [])

  const countries = useMemo(() => {
    return ['ทั้งหมด', ...new Set(tours.map(tour => tour.country))]
  }, [tours])

  const filteredTours = useMemo(() => {
    let filtered = tours.filter(tour => {
      const matchesSearch = searchTerm === '' || tour.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCountry = selectedCountry === 'ทั้งหมด' || tour.country === selectedCountry
      const matchesPrice = priceRange === 'ทั้งหมด' || 
        (priceRange === 'ต่ำกว่า 100,000' && tour.price < 100000) ||
        (priceRange === '100,000-150,000' && tour.price >= 100000 && tour.price <= 150000) ||
        (priceRange === 'มากกว่า 150,000' && tour.price > 150000)
      
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
      <div className="min-h-screen bg-gradient-to-b from-amber-100 via-orange-50 to-yellow-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent mb-4"></div>
          <p className="text-amber-800 text-lg font-semibold">🦁 Tracking the perfect safari adventure...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-100 via-orange-50 to-yellow-100">
      {/* Safari Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-32 right-16 text-6xl animate-bounce" style={{animationDelay: '0s'}}>🦒</div>
        <div className="absolute bottom-40 left-12 text-4xl animate-bounce" style={{animationDelay: '2s'}}>🦓</div>
        <div className="absolute top-1/2 left-1/3 text-5xl animate-bounce" style={{animationDelay: '4s'}}>🐘</div>
        <div className="absolute bottom-1/4 right-1/4 text-3xl animate-bounce" style={{animationDelay: '1s'}}>🦁</div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 bg-gradient-to-r from-amber-800 via-orange-700 to-red-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
        }}></div>
        
        <div className="relative container mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500/30 backdrop-blur-sm rounded-full mb-6 animate-pulse">
            <span className="text-2xl">🦁</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-yellow-100 mb-4 tracking-wide">
            SAFARI EXPEDITION
          </h1>
          <p className="text-xl text-orange-200 mb-2 font-semibold">
            Wild Africa Adventure
          </p>
          <p className="text-lg text-orange-100 mb-8 leading-relaxed">
            🌍 ผจญภัยสุดขีดในแดนแอฟริกา พบเจอสัตว์โลกแห่งธรรมชาติ
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
              <div className="text-2xl font-bold text-yellow-300">Big 5</div>
              <div className="text-orange-200 text-sm">Wildlife</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
              <div className="text-2xl font-bold text-yellow-300">15+</div>
              <div className="text-orange-200 text-sm">Countries</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
              <div className="text-2xl font-bold text-yellow-300">500+</div>
              <div className="text-orange-200 text-sm">Expeditions</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
              <div className="text-2xl font-bold text-yellow-300">4.8⭐</div>
              <div className="text-orange-200 text-sm">Rating</div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Search Section */}
        <div className="mb-6">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-orange-200 p-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <BinocularsIcon />
              </div>
              <input
                type="text"
                placeholder="🔍 Track your dream safari adventure..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-orange-300 rounded-xl text-amber-900 placeholder-amber-600 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all text-lg font-medium"
              />
            </div>
          </div>
        </div>

        {/* Filter Toggle Button (Mobile) */}
        <div className="mb-6 md:hidden">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full bg-orange-100 border-2 border-orange-300 rounded-xl p-4 flex items-center justify-center gap-2 text-amber-800 font-bold transform hover:scale-105 transition-transform"
          >
            <FilterIcon />
            <span>🎯 FILTERS</span>
          </button>
        </div>

        {/* Filters */}
        {(showFilters || window.innerWidth >= 768) && (
          <div className="mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-orange-200 p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-bold text-amber-800 mb-2">🌍 ประเทศ</label>
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="w-full p-3 border-2 border-orange-300 rounded-lg text-amber-900 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all font-medium"
                  >
                    {countries.map(country => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-amber-800 mb-2">💰 ช่วงราคา</label>
                  <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full p-3 border-2 border-orange-300 rounded-lg text-amber-900 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all font-medium"
                  >
                    <option value="ทั้งหมด">ทั้งหมด</option>
                    <option value="ต่ำกว่า 100,000">ต่ำกว่า ฿100,000</option>
                    <option value="100,000-150,000">฿100,000 - ฿150,000</option>
                    <option value="มากกว่า 150,000">มากกว่า ฿150,000</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-amber-800 mb-2">📊 เรียงตาม</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full p-3 border-2 border-orange-300 rounded-lg text-amber-900 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all font-medium"
                  >
                    <option value="ยอดนิยม">🔥 ยอดนิยม</option>
                    <option value="ราคาต่ำ">💵 ราคาต่ำ</option>
                    <option value="ราคาสูง">💎 ราคาสูง</option>
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
                      setShowFilters(false)
                    }}
                    className="w-full p-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg hover:from-red-600 hover:to-orange-600 transition-all font-bold transform hover:scale-105"
                  >
                    🔄 RESET
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results Counter */}
        <div className="mb-6 text-center">
          <p className="text-amber-800 text-lg font-bold">
            🎯 Spotted <span className="text-orange-600 text-xl">{filteredTours.length}</span> amazing safari adventures! 🦁
          </p>
        </div>

        {/* Tours Grid - Mobile First */}
        <div className="space-y-6 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 md:space-y-0">
          {filteredTours.map((tour, index) => (
            <Link 
              key={tour.id} 
              href={`/tours-safari/${tour.id}`}
              className="block group"
            >
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-orange-200 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:rotate-1 transform">
                {/* Image */}
                <div className="relative h-48 md:h-56 overflow-hidden">
                  <Image
                    src={tour.image}
                    alt={tour.name}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  
                  {/* Difficulty Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${difficultyColors[tour.difficulty as keyof typeof difficultyColors]}`}>
                      {tour.difficulty}
                    </span>
                  </div>

                  {/* Price Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg border-2 border-orange-200">
                      <div className="text-right">
                        {tour.originalPrice && (
                          <div className="text-xs text-amber-600 line-through font-medium">
                            ฿{tour.originalPrice.toLocaleString()}
                          </div>
                        )}
                        <div className="text-lg font-black text-orange-600">
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
                          className="bg-gradient-to-r from-orange-600 to-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Wildlife Count */}
                  <div className="absolute bottom-4 right-4">
                    <div className="bg-yellow-400/90 backdrop-blur-sm rounded-full px-3 py-1 border-2 border-yellow-300">
                      <span className="text-amber-800 text-xs font-black">
                        🦁 {tour.wildlife.length} Species
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-amber-900 mb-2 line-clamp-2 group-hover:text-orange-700 transition-colors leading-tight">
                      {tour.name}
                    </h3>
                    <p className="text-orange-600 text-sm font-bold flex items-center gap-1">
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
                    <span className="text-amber-900 font-bold text-sm">{tour.rating}</span>
                    <span className="text-amber-700 text-sm">({tour.reviews} reviews)</span>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-amber-800 text-sm font-medium">
                      <ClockIcon />
                      <span>⏰ {tour.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-amber-800 text-sm font-medium">
                      <PlaneIcon />
                      <span>✈️ {tour.transportation}</span>
                    </div>
                  </div>

                  {/* Wildlife Icons */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {tour.wildlife.slice(0, 4).map((animal, aIndex) => (
                        <span
                          key={aIndex}
                          className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full border border-amber-300 font-medium"
                          title={animal}
                        >
                          {animal.split(' ')[0]}
                        </span>
                      ))}
                      {tour.wildlife.length > 4 && (
                        <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full border border-orange-300 font-bold">
                          +{tour.wildlife.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {tour.highlights.slice(0, 2).map((highlight, hIndex) => (
                        <span
                          key={hIndex}
                          className="text-xs bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800 px-2 py-1 rounded-full border border-orange-200 font-medium"
                        >
                          📍 {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* View Details */}
                  <div className="pt-4 border-t-2 border-orange-100">
                    <div className="flex items-center justify-between">
                      <span className="text-amber-800 text-sm font-bold">🎯 TRACK DETAILS</span>
                      <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
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
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-orange-200 p-12 max-w-md mx-auto">
              <div className="text-6xl mb-4">🦁</div>
              <h3 className="text-2xl font-bold text-amber-900 mb-4">No Safari Found!</h3>
              <p className="text-amber-700 mb-6 font-medium">
                The animals are hiding! Try adjusting your search filters to track down the perfect safari adventure! 🔍
              </p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCountry('ทั้งหมด')
                  setPriceRange('ทั้งหมด')
                  setSortBy('ยอดนิยม')
                }}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all font-bold transform hover:scale-105 shadow-lg"
              >
                🔄 RESET TRACKING
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}