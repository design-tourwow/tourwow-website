'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Star, MapPin, Clock, Plane, Users, Calendar, CheckCircle
} from 'lucide-react'
import { Tour, generateDeparturePeriods, getAvailabilityStatus } from '@/lib/tour-data-consolidated'

interface TourCardProps {
  tour: Tour
  selectedMonths: {[tourId: number]: string}
  onMonthSelect: (tourId: number, month: string) => void
  allMonths: string[]
}

export default function TourCard({ tour, selectedMonths, onMonthSelect, allMonths }: TourCardProps) {
  const [imageError, setImageError] = useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  const getImageSrc = () => {
    if (imageError) {
      return `https://via.placeholder.com/400x300/3B82F6/FFFFFF?text=${encodeURIComponent(tour.title)}`
    }
    return tour.image
  }

  return (
    <Link 
      href={`/tour-search-7/${tour.id}`} 
      className="group block bg-white/95 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 active:scale-95 touch-manipulation border border-white/20"
      style={{ touchAction: 'manipulation' }}
    >
      {/* Image with Enhanced Overlay */}
      <div className="relative h-56 sm:h-60 md:h-64 overflow-hidden">
        <Image
          src={getImageSrc()}
          alt={tour.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          onError={handleImageError}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        {/* Price Badge - Enhanced */}
        <div className="absolute top-4 right-4">
          <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-3 rounded-2xl shadow-2xl text-right border border-red-400">
            {tour.originalPrice && (
              <p className="text-sm text-red-200 line-through leading-tight">
                ฿{tour.originalPrice.toLocaleString()}
              </p>
            )}
            <p className="text-lg font-bold leading-tight">
              ฿{tour.price.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Duration Badge */}
        <div className="absolute top-4 left-4">
          <div className="bg-black/60 backdrop-blur-sm text-white px-3 py-2 rounded-xl border border-white/20">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="font-semibold text-sm">{tour.durationCode}</span>
            </div>
          </div>
        </div>

        {/* Availability Badge */}
        <div className="absolute bottom-4 left-4">
          <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
            tour.availableSeats >= 15 ? 'bg-green-500 text-white' :
            tour.availableSeats >= 8 ? 'bg-yellow-500 text-white' :
            tour.availableSeats >= 1 ? 'bg-red-500 text-white' :
            'bg-gray-500 text-white'
          }`}>
            {tour.availableSeats >= 15 ? `ว่าง ${tour.availableSeats}` :
             tour.availableSeats >= 8 ? `เหลือ ${tour.availableSeats}` :
             tour.availableSeats >= 1 ? `ใกล้เต็ม ${tour.availableSeats}` :
             'เต็มแล้ว'}
          </div>
        </div>
      </div>

      {/* Content - Enhanced */}
      <div className="p-6 md:p-8">
        <h3 className="font-bold text-xl md:text-2xl mb-4 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
          {tour.title}
        </h3>
        
        {/* Location */}
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="w-5 h-5 text-blue-500" />
          <span className="font-semibold ml-2 text-lg">{tour.location}</span>
        </div>

        {/* Airline Info */}
        <div className="text-gray-600 mb-4">
          <div className="flex items-center">
            <Plane className="w-5 h-5 text-blue-500 mr-2" />
            <span className="font-medium">{tour.airlineName} ({tour.airline})</span>
          </div>
        </div>

        {/* Reviews & Rating - Enhanced */}
        <div className="flex items-center justify-between text-gray-600 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-sm">({tour.reviews} รีวิว)</span>
            <span className="text-gray-400">•</span>
            <div className="flex items-center gap-1">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((starNumber) => {
                  const filled = tour.rating >= starNumber;
                  const partialFill = tour.rating > starNumber - 1 && tour.rating < starNumber;
                  const fillPercentage = partialFill ? ((tour.rating - (starNumber - 1)) * 100) : 0;
                  
                  return (
                    <div key={starNumber} className="relative">
                      <Star 
                        className={`w-4 h-4 ${filled ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`} 
                      />
                      {partialFill && (
                        <div 
                          className="absolute top-0 left-0 overflow-hidden"
                          style={{ width: `${fillPercentage}%` }}
                        >
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <span className="font-bold ml-1">{tour.rating}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Users className="w-4 h-4 text-blue-500" />
            <span>{tour.groupSize} คน</span>
          </div>
        </div>

        <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed text-sm">
          {tour.highlights}
        </p>

        {/* Travel Dates Section - Enhanced */}
        <div className="pt-4 border-t border-gray-100">
          <div className="mb-3">
            <p className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-500" />
              ช่วงเวลาเดินทาง
            </p>
          </div>

          {tour.departureDates && (
            <div className="space-y-3">
              {/* Month Tabs - Enhanced */}
              <div className="overflow-x-auto scrollbar-hide">
                <div className="flex gap-2 w-max pb-2">
                  {allMonths.map(month => (
                    <button
                      key={month}
                      onClick={(e) => {
                        e.preventDefault()
                        onMonthSelect(tour.id, month)
                      }}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                        selectedMonths[tour.id] === month
                          ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg transform scale-105'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:shadow-md'
                      }`}
                    >
                      {month}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Month Periods - Enhanced */}
              <div className="max-h-32 overflow-y-auto space-y-2 mt-3">
                {generateDeparturePeriods(selectedMonths[tour.id] || allMonths[0], tour).slice(0, 5).map((period, index) => {
                  const status = getAvailabilityStatus(tour.availableSeats)
                  return (
                    <div
                      key={index}
                      className={`px-3 py-2 rounded-xl text-sm font-medium border ${status.style} flex justify-between items-center shadow-sm`}
                    >
                      <span>{period}</span>
                      <span className="ml-2 font-semibold">({status.text})</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* View Details Button - Enhanced */}
        <div className="mt-6">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center py-4 rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 shadow-lg hover:shadow-xl transform group-hover:scale-105">
            ดูรายละเอียด
          </div>
        </div>
      </div>
    </Link>
  )
} 