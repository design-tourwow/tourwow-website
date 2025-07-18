'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronDown, Clock, MapPin, Star, Users, Zap } from 'lucide-react'
import Image from 'next/image'
import { tours } from '@/lib/tour-data'

interface FlashSaleDropdownProps {
  isActive: boolean
}

export default function FlashSaleDropdown({ isActive }: FlashSaleDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()
  const router = useRouter()

  // Filter tours with 40%+ discount
  const flashSaleTours = tours.filter(tour => {
    if (tour.originalPrice && tour.price) {
      const discount = ((tour.originalPrice - tour.price) / tour.originalPrice) * 100
      return discount >= 40
    }
    return false
  }).slice(0, 20) // Get first 20 tours

  // เปิด dropdown เมื่อคลิกเท่านั้น
  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsOpen(!isOpen)
  }
  
  // ปิด dropdown ทันทีเมื่อ mouse leave
  const handleDropdownMouseLeave = () => {
    setIsOpen(false)
  }

  const handleMenuClick = () => {
    setIsOpen(false)
  }

  // Close dropdown when component unmounts or route changes
  useEffect(() => {
    const handleRouteChange = () => setIsOpen(false)
    window.addEventListener('beforeunload', handleRouteChange)
    return () => window.removeEventListener('beforeunload', handleRouteChange)
  }, [])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={handleButtonClick}
        className={`relative flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
          isActive 
            ? 'text-red-600 bg-red-50 shadow-sm' 
            : 'text-gray-700 hover:text-red-600 hover:bg-red-50'
        }`}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span className="animate-bounce text-xl mr-1">🔥</span>
        ทัวร์ไฟไหม้
        <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        {isActive && <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-red-600 rounded-full"></div>}
      </button>

      {isOpen && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-[1100px] bg-white rounded-2xl shadow-2xl border border-gray-100 z-[9999] overflow-hidden transition-all duration-200"
          style={{ pointerEvents: isOpen ? 'auto' : 'none', zIndex: 9999, opacity: isOpen ? 1 : 0 }}
          onMouseLeave={handleDropdownMouseLeave}
        >
          {/* Header with Fire Gradient */}
          <div className="relative bg-gradient-to-br from-red-500 via-red-600 to-orange-600 text-white p-6">
            <div className="absolute inset-0 opacity-20">
              <div className="w-full h-full bg-repeat" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12 12-5.373 12-12zm12 0c0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12 12-5.373 12-12z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}></div>
            </div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center animate-pulse">
                    <span className="text-lg">🔥</span>
                  </div>
                  <h3 className="text-xl font-bold">ทัวร์ไฟไหม้ ลดสูงสุด 50%</h3>
                </div>
                <div className="text-red-200 text-sm bg-white/10 px-3 py-1 rounded-full">
                  จากเมนู: ทัวร์ไฟไหม้
                </div>
              </div>
              <p className="text-red-100 text-sm leading-relaxed">
                โอกาสทองที่ไม่ควรพลาด! ทัวร์คุณภาพลดราคาสูงสุด 50% จำนวนจำกัด รีบจองก่อนหมด
              </p>
            </div>
          </div>
          
          {/* Flash Sale Tours Content */}
          <div className="p-6">
            <div className="grid grid-cols-4 gap-4 max-h-96 overflow-y-auto">
              {flashSaleTours.map((tour) => {
                const discountPercent = tour.originalPrice ? Math.round(((tour.originalPrice - tour.price) / tour.originalPrice) * 100) : 0
                return (
                  <Link
                    key={tour.id}
                    href={`/tours/${tour.id}`}
                    className="group bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-200 overflow-hidden hover:border-red-300"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="relative h-32">
                      <Image
                        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                        alt={tour.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="250px"
                      />
                      <div className="absolute top-2 left-2 z-10">
                        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse shadow-lg">
                          🔥 ลด {discountPercent}%
                        </div>
                      </div>
                      <div className="absolute top-2 right-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
                        {tour.category}
                      </div>
                    </div>
                    <div className="p-3">
                      <h4 className="font-bold text-gray-800 text-sm mb-1 line-clamp-2 group-hover:text-red-600 transition-colors">
                        {tour.title}
                      </h4>
                      <div className="flex items-center text-gray-500 mb-2 text-xs">
                        <MapPin className="w-3 h-3 mr-1 text-blue-500" />
                        <span className="truncate">{tour.location}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1 text-blue-500" />
                          <span>{tour.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="w-3 h-3 mr-1 text-blue-500" />
                          <span>{tour.groupSize}</span>
                        </div>
                      </div>
                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < Math.floor(tour.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <span className="text-xs text-gray-600 ml-1">{tour.rating}</span>
                      </div>
                      <div className="text-right">
                        {tour.originalPrice && (
                          <div className="mb-1">
                            <span className="text-gray-400 line-through text-xs">฿{tour.originalPrice.toLocaleString()}</span>
                          </div>
                        )}
                        <div className="text-red-600 font-bold text-sm">
                          ฿{tour.price.toLocaleString()}
                        </div>
                        <div className="text-xs text-green-600 font-semibold">
                          ประหยัด ฿{tour.originalPrice ? (tour.originalPrice - tour.price).toLocaleString() : '0'}
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
          
          {/* Call-to-Action Footer */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 px-6 py-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link 
                  href="/flash-sale" 
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  onClick={() => setIsOpen(false)}
                >
                  <Zap className="w-4 h-4" />
                  <span>ดูทัวร์ไฟไหม้ทั้งหมด</span>
                </Link>
                <div className="text-sm text-gray-600">
                  <span className="font-semibold text-red-600">⏰ เวลาจำกัด!</span> โปรโมชั่นสิ้นสุดเร็วๆ นี้
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-800 mb-1">ทัวร์ไฟไหม้</div>
                <div className="flex items-center space-x-1 text-red-600">
                  <span className="text-2xl font-bold">{flashSaleTours.length}</span>
                  <span className="text-sm">โปรแกรม</span>
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}