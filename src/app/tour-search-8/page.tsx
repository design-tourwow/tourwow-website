'use client'

export const dynamic = 'force-dynamic'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  X, Star, MapPin, Clock, TrendingUp, Sparkles, CheckCircle, Plane, Globe, Crown, ChevronUp, ChevronDown, Filter, Calendar, Users, Hotel, Shield, Search, Heart, Eye
} from 'lucide-react'

// Import tours data from consolidated file
import { toursData } from '@/lib/tour-data-consolidated'

// Use tours data from the consolidated file
const tours = toursData

export default function TourSearch8Page() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 mb-6 leading-tight">
            ค้นพบโลกใหม่
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            สัมผัสประสบการณ์การเดินทางที่แตกต่าง กับทัวร์คุณภาพระดับพรีเมียม
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <input
                type="text"
                placeholder="ค้นหาทัวร์หรือจุดหมายปลายทาง..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.slice(0, 6).map((tour) => (
            <div key={tour.id} className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20">
              <div className="p-6">
                <h3 className="font-black text-xl mb-4 text-white">
                  {tour.title}
                </h3>
                <div className="flex items-center text-gray-300 mb-3">
                  <MapPin className="w-5 h-5 text-purple-400" />
                  <span className="font-bold ml-2 text-white">{tour.location}</span>
                </div>
                <div className="text-gray-400 mb-4">
                  <div className="flex items-center">
                    <Plane className="w-5 h-5 text-purple-400 mr-2" />
                    <span className="font-semibold">{tour.airlineName} ({tour.airline})</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-gray-400 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">({tour.reviews} รีวิว)</span>
                    <span className="text-gray-600">•</span>
                    <div className="flex items-center gap-1">
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((starNumber) => {
                          const filled = tour.rating >= starNumber;
                          return (
                            <Star 
                              key={starNumber}
                              className={`w-4 h-4 ${filled ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-600 text-gray-600'}`} 
                            />
                          );
                        })}
                      </div>
                      <span className="font-black ml-1 text-white">{tour.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-purple-400" />
                    <span className="text-white">{tour.groupSize} คน</span>
                  </div>
                </div>
                <p className="text-gray-300 mb-6 line-clamp-3 leading-relaxed text-sm">
                  {tour.highlights}
                </p>
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-4 rounded-2xl font-black text-lg">
                  ฿{isClient ? tour.price.toLocaleString() : tour.price.toString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 