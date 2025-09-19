'use client'

export const dynamic = 'force-dynamic'

import React, { useState } from 'react'
import Image from 'next/image'
import { 
  Search, Filter, Plane, Mountain, Building2, Star, MapPin, Clock, Heart
} from 'lucide-react'

// Tour data
const tours = [
  {
    id: 1,
    title: 'ทัวร์ญี่ปุ่น โตเกียว สกายทรี 5 วัน 3 คืน',
    location: 'ญี่ปุ่น',
    city: 'โตเกียว',
    duration: '5 วัน',
    price: 29900,
    originalPrice: 35900,
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
    rating: 4.8,
    reviews: 234,
    groupSize: '15-20',
    hotelStar: 4,
    airlineName: 'Thai Airways',
    availableSeats: 8
  },
  {
    id: 2,
    title: 'ทัวร์เกาหลี โซล พระราชวัง 4 วัน 3 คืน',
    location: 'เกาหลี',
    city: 'โซล',
    duration: '4 วัน',
    price: 22900,
    originalPrice: 27900,
    image: 'https://images.unsplash.com/photo-1549693578-d683be217e58?w=800&h=600&fit=crop',
    rating: 4.7,
    reviews: 189,
    groupSize: '20-25',
    hotelStar: 4,
    airlineName: 'Thai Airways',
    availableSeats: 22
  },
  {
    id: 3,
    title: 'ทัวร์สิงคโปร์ มารีนา เบย์ 3 วัน 2 คืน',
    location: 'สิงคโปร์',
    city: 'มารีนา เบย์',
    duration: '3 วัน',
    price: 15900,
    originalPrice: 19900,
    image: 'https://images.unsplash.com/photo-1508964942454-1fdcf0fdcbc1?w=800&h=600&fit=crop',
    rating: 4.7,
    reviews: 312,
    groupSize: '20-30',
    hotelStar: 5,
    airlineName: 'Singapore Airlines',
    availableSeats: 25
  }
]

// Popular destinations
const popularDestinations = {
  asia: [
    { id: 1, name: 'ญี่ปุ่น', image: 'https://images.unsplash.com/photo-1490650034439-fd184c3c86a5?w=500&h=500&fit=crop&crop=center', tours: 3 },
    { id: 2, name: 'เกาหลี', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=500&h=500&fit=crop&crop=center', tours: 1 },
    { id: 3, name: 'สิงคโปร์', image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=500&h=500&fit=crop&crop=center', tours: 1 },
    { id: 4, name: 'ไทย', image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=500&h=500&fit=crop&crop=center', tours: 2 },
    { id: 5, name: 'จีน', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=500&h=500&fit=crop&crop=center', tours: 2 },
    { id: 6, name: 'เวียดนาม', image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=500&h=500&fit=crop&crop=center', tours: 1 }
  ],
  europe: [
    { id: 7, name: 'ฝรั่งเศส', image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=500&h=500&fit=crop&crop=center', tours: 2 },
    { id: 8, name: 'อิตาลี', image: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=500&h=500&fit=crop&crop=center', tours: 2 },
    { id: 9, name: 'สเปน', image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=500&h=500&fit=crop&crop=center', tours: 1 },
    { id: 10, name: 'สวิตเซอร์แลนด์', image: 'https://images.unsplash.com/photo-1471623432079-b009d30b6729?w=500&h=500&fit=crop&crop=center', tours: 2 },
    { id: 11, name: 'เนเธอร์แลนด์', image: 'https://images.unsplash.com/photo-1512470876302-972faa02aa51?w=500&h=500&fit=crop&crop=center', tours: 1 },
    { id: 12, name: 'กรีซ', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=500&h=500&fit=crop&crop=center', tours: 1 }
  ]
}

export default function TourSearch9Page() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [priceRange, setPriceRange] = useState([0, 100000])
  const [durationFilter, setDurationFilter] = useState<string>('all')
  const [showFilters, setShowFilters] = useState(false)
  const [activeTab, setActiveTab] = useState<'asia' | 'europe'>('asia')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'popularity'>('popularity')

  // Filter tours
  const filteredTours = tours.filter(tour => {
    const matchesCountry = !selectedCountry || tour.location === selectedCountry
    const matchesSearch = !searchTerm || 
      tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tour.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPrice = tour.price >= priceRange[0] && tour.price <= priceRange[1]
    const matchesDuration = durationFilter === 'all' || 
      (durationFilter === 'short' && tour.duration.includes('3')) ||
      (durationFilter === 'medium' && tour.duration.includes('4') || tour.duration.includes('5')) ||
      (durationFilter === 'long' && tour.duration.includes('6'))

    return matchesCountry && matchesSearch && matchesPrice && matchesDuration
  })

  const getAvailabilityStatus = (availableSeats: number) => {
    if (availableSeats <= 5) return { status: 'เหลือน้อย', color: 'text-red-500' }
    if (availableSeats <= 10) return { status: 'เหลือปานกลาง', color: 'text-yellow-500' }
    return { status: 'มีที่นั่ง', color: 'text-green-500' }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" role="main">
      {/* Mobile Hero Section */}
      <div className="lg:hidden relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-800/80 to-purple-900/70"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop')] bg-cover bg-center opacity-20"></div>
        <div className="relative px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">ค้นหาทัวร์</h1>
              <p className="text-blue-100 text-sm">ค้นพบประสบการณ์การเดินทางที่สมบูรณ์แบบ</p>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/30"
            >
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">กรอง</span>
            </button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
              <div className="text-white text-lg font-bold">500+</div>
              <div className="text-blue-100 text-xs">ทัวร์ทั้งหมด</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
              <div className="text-white text-lg font-bold">50+</div>
              <div className="text-blue-100 text-xs">ประเทศ</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
              <div className="text-white text-lg font-bold">10K+</div>
              <div className="text-blue-100 text-xs">ลูกค้าพอใจ</div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Hero Section */}
      <div className="hidden lg:block relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-800/80 to-purple-900/70"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&h=600&fit=crop')] bg-cover bg-center opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Plane className="w-6 h-6 text-white" />
              </div>
              <span className="text-blue-200 text-lg font-medium">TourWow</span>
            </div>
            <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
              ค้นหาทัวร์
              <span className="block text-4xl text-blue-200 font-normal mt-2">แห่งความฝัน</span>
            </h1>
            <p className="text-blue-100 text-xl mb-8 leading-relaxed">
              ค้นพบประสบการณ์การเดินทางที่สมบูรณ์แบบ พร้อมบริการระดับพรีเมียม 
              และเส้นทางที่ออกแบบมาเพื่อคุณโดยเฉพาะ
            </p>
            
            {/* CTA Buttons */}
            <div className="flex gap-4 mb-8">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl">
                เริ่มค้นหาทัวร์
              </button>
              <button className="border-2 border-white/30 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white/10 transition-all duration-200 backdrop-blur-sm">
                ดูทัวร์แนะนำ
              </button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-4 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-white text-3xl font-bold mb-1">500+</div>
                <div className="text-blue-200 text-sm">ทัวร์ทั้งหมด</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-white text-3xl font-bold mb-1">50+</div>
                <div className="text-blue-200 text-sm">ประเทศ</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-white text-3xl font-bold mb-1">10K+</div>
                <div className="text-blue-200 text-sm">ลูกค้าพอใจ</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-white text-3xl font-bold mb-1">24/7</div>
                <div className="text-blue-200 text-sm">บริการสนับสนุน</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 lg:py-12">
        {/* Mobile Search Bar */}
        <div className="lg:hidden mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="ค้นหาทัวร์..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            />
          </div>
          
          {/* Quick Actions */}
          <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-hide">
            <button className="whitespace-nowrap px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors">
              ทัวร์ญี่ปุ่น
            </button>
            <button className="whitespace-nowrap px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
              ทัวร์เกาหลี
            </button>
            <button className="whitespace-nowrap px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
              ทัวร์ยุโรป
            </button>
            <button className="whitespace-nowrap px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
              ทัวร์สั้น
            </button>
          </div>
        </div>

        {/* Mobile Filters */}
        {showFilters && (
          <div className="lg:hidden bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="space-y-4">
              <select
                value={selectedCountry || ''}
                onChange={(e) => setSelectedCountry(e.target.value || null)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">ทุกประเทศ</option>
                <option value="ญี่ปุ่น">ญี่ปุ่น</option>
                <option value="เกาหลี">เกาหลี</option>
                <option value="สิงคโปร์">สิงคโปร์</option>
              </select>

              <select
                value={durationFilter}
                onChange={(e) => setDurationFilter(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">ทุกระยะเวลา</option>
                <option value="short">สั้น (1-3 วัน)</option>
                <option value="medium">ปานกลาง (4-5 วัน)</option>
                <option value="long">ยาว (6+ วัน)</option>
              </select>

              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  placeholder="ราคาต่ำสุด"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                  className="w-1/2 px-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <span className="text-gray-500">-</span>
                <input
                  type="number"
                  placeholder="ราคาสูงสุด"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 100000])}
                  className="w-1/2 px-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )}

        {/* Desktop Search and Filter Section */}
        <div className="hidden lg:block bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="grid grid-cols-4 gap-6 mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="ค้นหาทัวร์..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              />
            </div>

            <select
              value={selectedCountry || ''}
              onChange={(e) => setSelectedCountry(e.target.value || null)}
              className="px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            >
              <option value="">ทุกประเทศ</option>
              <option value="ญี่ปุ่น">ญี่ปุ่น</option>
              <option value="เกาหลี">เกาหลี</option>
              <option value="สิงคโปร์">สิงคโปร์</option>
            </select>

            <select
              value={durationFilter}
              onChange={(e) => setDurationFilter(e.target.value)}
              className="px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            >
              <option value="all">ทุกระยะเวลา</option>
              <option value="short">สั้น (1-3 วัน)</option>
              <option value="medium">ปานกลาง (4-5 วัน)</option>
              <option value="long">ยาว (6+ วัน)</option>
            </select>

            <div className="flex items-center space-x-3">
              <input
                type="number"
                placeholder="ราคาต่ำสุด"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                className="w-1/2 px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              />
              <span className="text-gray-500 text-lg">-</span>
              <input
                type="number"
                placeholder="ราคาสูงสุด"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 100000])}
                className="w-1/2 px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              />
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="flex gap-3">
            <button className="px-6 py-3 bg-blue-100 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors">
              ทัวร์ญี่ปุ่น
            </button>
            <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
              ทัวร์เกาหลี
            </button>
            <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
              ทัวร์ยุโรป
            </button>
            <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
              ทัวร์สั้น
            </button>
            <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
              ทัวร์พรีเมียม
            </button>
          </div>
        </div>

        {/* Popular Destinations - Mobile */}
        <div className="lg:hidden mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">จุดหมายยอดนิยม</h2>
          
          {/* Tab Navigation */}
          <div className="flex bg-gray-100 rounded-2xl p-1 mb-6">
            <button
              onClick={() => setActiveTab('asia')}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                activeTab === 'asia'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Mountain className="w-4 h-4" />
              ทัวร์เอเชีย
            </button>
            <button
              onClick={() => setActiveTab('europe')}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                activeTab === 'europe'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Building2 className="w-4 h-4" />
              ทัวร์ยุโรป
            </button>
          </div>

          {/* Tab Content */}
          <div className="grid grid-cols-3 gap-3">
            {popularDestinations[activeTab].map((destination) => (
              <div
                key={destination.id}
                className="relative aspect-square cursor-pointer overflow-hidden rounded-2xl shadow-lg group"
                onClick={() => setSelectedCountry(destination.name)}
              >
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-2 left-2 right-2 text-white text-center">
                  <h4 className="text-sm font-bold truncate">{destination.name}</h4>
                  <p className="text-xs opacity-90">{destination.tours} ทัวร์</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Destinations - Desktop */}
        <div className="hidden lg:block mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">จุดหมายยอดนิยม</h2>
          
          {/* Tab Navigation */}
          <div className="flex bg-gray-100 rounded-2xl p-2 mb-8 max-w-md">
            <button
              onClick={() => setActiveTab('asia')}
              className={`flex-1 py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center gap-3 ${
                activeTab === 'asia'
                  ? 'bg-white text-blue-600 shadow-lg'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Mountain className="w-5 h-5" />
              ทัวร์เอเชีย
            </button>
            <button
              onClick={() => setActiveTab('europe')}
              className={`flex-1 py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center gap-3 ${
                activeTab === 'europe'
                  ? 'bg-white text-blue-600 shadow-lg'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Building2 className="w-5 h-5" />
              ทัวร์ยุโรป
            </button>
          </div>

          {/* Tab Content */}
          <div className="grid grid-cols-3 gap-6">
            {popularDestinations[activeTab].map((destination) => (
              <div
                key={destination.id}
                className="relative aspect-square cursor-pointer overflow-hidden rounded-2xl shadow-lg group"
                onClick={() => setSelectedCountry(destination.name)}
              >
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white text-center">
                  <h4 className="text-lg font-bold">{destination.name}</h4>
                  <p className="text-sm opacity-90">{destination.tours} ทัวร์</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tours Section */}
        <div>
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-6 lg:mb-8 gap-4">
            <div>
              <h2 className="text-xl lg:text-3xl font-bold text-gray-800">ทัวร์ทั้งหมด</h2>
              <p className="text-gray-600 text-sm lg:text-lg">{filteredTours.length} ทัวร์</p>
            </div>
            
            {/* View Controls */}
            <div className="flex items-center gap-4">
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="popularity">ยอดนิยม</option>
                <option value="price">ราคา</option>
                <option value="rating">คะแนน</option>
              </select>
              
              {/* View Mode */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Tours Grid/List */}
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6' : 'space-y-4'}>
            {filteredTours.map((tour) => {
              const availability = getAvailabilityStatus(tour.availableSeats)
              
              if (viewMode === 'list') {
                return (
                  <div key={tour.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="flex flex-col lg:flex-row">
                      {/* Tour Image */}
                      <div className="relative lg:w-80 lg:flex-shrink-0">
                        <Image
                          src={tour.image}
                          alt={tour.title}
                          width={400}
                          height={300}
                          className="w-full h-48 lg:h-full object-cover"
                        />
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2">
                          <Heart className="w-4 h-4 text-red-500" />
                        </div>
                        {tour.originalPrice && (
                          <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            ลด {Math.round(((tour.originalPrice - tour.price) / tour.originalPrice) * 100)}%
                          </div>
                        )}
                      </div>

                      {/* Tour Content */}
                      <div className="p-4 lg:p-6 flex-1">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between h-full">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <MapPin className="w-4 h-4 text-blue-600" />
                              <span className="text-sm text-gray-600">{tour.location} • {tour.city}</span>
                            </div>

                            <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-3">{tour.title}</h3>

                            <div className="flex items-center gap-4 mb-4">
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span className="text-sm font-semibold">{tour.rating}</span>
                                <span className="text-sm text-gray-500">({tour.reviews})</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-600">{tour.duration}</span>
                              </div>
                              <span className={`text-sm font-semibold ${availability.color}`}>
                                {availability.status}
                              </span>
                            </div>

                            <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                              <span>✈️ {tour.airlineName}</span>
                              <span>🏨 {tour.hotelStar} ดาว</span>
                              <span>👥 {tour.groupSize}</span>
                            </div>
                          </div>

                          <div className="flex flex-col items-end gap-4">
                            <div className="text-right">
                              <span className="text-2xl lg:text-3xl font-bold text-blue-600">฿{tour.price.toLocaleString()}</span>
                              {tour.originalPrice && (
                                <span className="text-sm text-gray-500 line-through ml-2">฿{tour.originalPrice.toLocaleString()}</span>
                              )}
                            </div>
                            <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200">
                              ดูรายละเอียด
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }

              return (
                <div key={tour.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  {/* Tour Image */}
                  <div className="relative">
                    <Image
                      src={tour.image}
                      alt={tour.title}
                      width={400}
                      height={300}
                      className="w-full h-48 lg:h-56 object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2">
                      <Heart className="w-4 h-4 text-red-500" />
                    </div>
                    {tour.originalPrice && (
                      <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        ลด {Math.round(((tour.originalPrice - tour.price) / tour.originalPrice) * 100)}%
                      </div>
                    )}
                  </div>

                  {/* Tour Content */}
                  <div className="p-4 lg:p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-gray-600">{tour.location} • {tour.city}</span>
                    </div>

                    <h3 className="text-base lg:text-lg font-bold text-gray-800 mb-2 line-clamp-2">{tour.title}</h3>

                    <div className="flex items-center gap-3 lg:gap-4 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-semibold">{tour.rating}</span>
                        <span className="text-sm text-gray-500">({tour.reviews})</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{tour.duration}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-xl lg:text-2xl font-bold text-blue-600">฿{tour.price.toLocaleString()}</span>
                        {tour.originalPrice && (
                          <span className="text-sm text-gray-500 line-through ml-2">฿{tour.originalPrice.toLocaleString()}</span>
                        )}
                      </div>
                      <span className={`text-sm font-semibold ${availability.color}`}>
                        {availability.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <span>✈️ {tour.airlineName}</span>
                      <span>🏨 {tour.hotelStar} ดาว</span>
                      <span>👥 {tour.groupSize}</span>
                    </div>

                    <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 lg:py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 text-sm lg:text-base">
                      ดูรายละเอียด
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-200 z-50 hover:scale-110"
        aria-label="กลับขึ้นด้านบน"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  )
} 