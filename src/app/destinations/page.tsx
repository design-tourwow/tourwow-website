'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Star, Clock, Users, Search, Filter } from 'lucide-react'
import { tours } from '@/lib/tour-data'

function DestinationsPageContent() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('ทั้งหมด')

  // Extract unique destinations from tours data
  const destinations = Array.from(
    new Set(tours.map(tour => tour.location))
  ).map(location => {
    const locationTours = tours.filter(tour => tour.location === location)
    const avgRating = locationTours.reduce((sum, tour) => sum + tour.rating, 0) / locationTours.length
    const minPrice = Math.min(...locationTours.map(tour => tour.price))
    const maxPrice = Math.max(...locationTours.map(tour => tour.price))
    
    // Determine region
    let region = 'อื่นๆ'
    if (location.includes('ญี่ปุ่น') || location.includes('เกาหลี') || location.includes('จีน') || location.includes('ไต้หวัน')) {
      region = 'เอเชียตะวันออก'
    } else if (location.includes('ไทย') || location.includes('เวียดนาม') || location.includes('กัมพูชา') || location.includes('ลาว')) {
      region = 'เอเชียตะวันออกเฉียงใต้'
    } else if (location.includes('อิตาลี') || location.includes('ฝรั่งเศส') || location.includes('เยอรมนี') || location.includes('สเปน')) {
      region = 'ยุโรป'
    } else if (location.includes('อเมริกา') || location.includes('แคนาดา') || location.includes('เม็กซิโก')) {
      region = 'อเมริกา'
    }

    return {
      name: location,
      region,
      image: locationTours[0].image,
      tourCount: locationTours.length,
      avgRating: Number(avgRating.toFixed(1)),
      priceRange: { min: minPrice, max: maxPrice },
      description: `สำรวจความงามและวัฒนธรรมที่น่าทึ่งของ${location} พร้อมโปรแกรมทัวร์คุณภาพจากเรา`,
      featured: locationTours.some(tour => tour.featured)
    }
  })

  const regions = ['ทั้งหมด', ...Array.from(new Set(destinations.map(d => d.region)))]

  const filteredDestinations = destinations.filter(dest => {
    const matchesSearch = dest.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRegion = selectedRegion === 'ทั้งหมด' || dest.region === selectedRegion
    return matchesSearch && matchesRegion
  })

  return (
    <main className="bg-blue-50/30">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] bg-gradient-to-t from-black/50 to-transparent text-white">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="จุดหมายปลายทางทั่วโลก"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-2xl">
            จุดหมายปลายทางทั่วโลก
          </h1>
          <p className="text-lg md:text-xl max-w-3xl drop-shadow-xl">
            ค้นพบความงามและเสน่ห์ของสถานที่ท่องเที่ยวชั้นนำทั่วโลกที่เราคัดสรรมาเพื่อคุณ
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-10 sticky top-4 z-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <div className="relative md:col-span-2">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="ค้นหาจุดหมายปลายทาง..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full bg-white pl-12 pr-4 py-3 border border-gray-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                {regions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>
            
            <div className="text-right text-gray-600 font-medium">
              {filteredDestinations.length} จุดหมายปลายทาง
            </div>
          </div>
        </div>

        {/* Destinations Grid */}
        {filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((destination, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-1">
                <div className="relative h-56">
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {destination.featured && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md animate-pulse">
                      ⭐ แนะนำ
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <h3 className="text-2xl font-bold text-white drop-shadow-lg">{destination.name}</h3>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                      {destination.region}
                    </span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <span className="text-sm font-semibold">{destination.avgRating}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 text-sm line-clamp-2">{destination.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{destination.tourCount} โปรแกรม</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-emerald-600">
                        ฿{destination.priceRange.min.toLocaleString()} - ฿{destination.priceRange.max.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  
                  <Link href={`/tours?search=${encodeURIComponent(destination.name)}`} className="block w-full">
                    <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium py-3 px-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg">
                      ดูโปรแกรมทัวร์
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl shadow-md">
            <div className="mx-auto bg-blue-100 rounded-full h-20 w-20 flex items-center justify-center mb-6">
              <Search className="w-10 h-10 text-blue-500" />
            </div>
            <h3 className="text-2xl font-semibold text-blue-900 mb-2">ไม่พบจุดหมายปลายทาง</h3>
            <p className="text-blue-700 mb-6">ขออภัย เราไม่พบจุดหมายปลายทางที่ตรงกับเงื่อนไขของคุณ</p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedRegion('ทั้งหมด')
              }}
              className="bg-blue-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              ล้างตัวกรองทั้งหมด
            </button>
          </div>
        )}
      </div>
    </main>
  )
}

export default function DestinationsPage() {
  return <DestinationsPageContent />
}