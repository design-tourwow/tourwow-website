'use client'

export const dynamic = 'force-dynamic'

import React, { useState, useEffect } from 'react'
import {
  Search, Filter, X, MapPin, Calendar, Star, TrendingUp,
  ChevronDown, ArrowUp, MessageCircle, Phone, Sparkles,
  Users, Clock, Gift, Zap, Globe, Heart
} from 'lucide-react'

const TourSearch56 = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Auto-play carousel for Card 23 - Video plays first, then images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % 5)
    }, 5000) // Change every 5 seconds (video gets more time)

    return () => clearInterval(interval)
  }, [])

  // Update carousel indicators and visibility
  useEffect(() => {
    // Handle Card 23 carousel
    const carouselItems = document.querySelectorAll('.carousel-item')
    const indicators = document.querySelectorAll('.carousel-indicator')

    carouselItems.forEach((item, index) => {
      if (index === currentImageIndex) {
        item.classList.remove('opacity-0')
        item.classList.add('opacity-100')
      } else {
        item.classList.remove('opacity-100')
        item.classList.add('opacity-0')
      }
    })

    indicators.forEach((indicator, index) => {
      if (index === currentImageIndex) {
        indicator.classList.remove('bg-white/50')
        indicator.classList.add('bg-white')
      } else {
        indicator.classList.remove('bg-white')
        indicator.classList.add('bg-white/50')
      }
    })

    // Handle Card 24 carousel
    const carouselItems24 = document.querySelectorAll('.carousel-item-24')
    const indicators24 = document.querySelectorAll('.carousel-indicator-24')

    carouselItems24.forEach((item, index) => {
      if (index === currentImageIndex) {
        item.classList.remove('opacity-0')
        item.classList.add('opacity-100')
      } else {
        item.classList.remove('opacity-100')
        item.classList.add('opacity-0')
      }
    })

    indicators24.forEach((indicator, index) => {
      if (index === currentImageIndex) {
        indicator.classList.remove('border-white/70')
        indicator.classList.add('border-blue-600', 'border-2')
      } else {
        indicator.classList.remove('border-blue-600', 'border-2')
        indicator.classList.add('border-white/70')
      }
    })

    // Handle Card 25 carousel
    const carouselItems25 = document.querySelectorAll('.carousel-item-25')
    const indicators25 = document.querySelectorAll('.carousel-indicator-25')

    carouselItems25.forEach((item, index) => {
      if (index === currentImageIndex) {
        item.classList.remove('opacity-0')
        item.classList.add('opacity-100')
      } else {
        item.classList.remove('opacity-100')
        item.classList.add('opacity-0')
      }
    })

    indicators25.forEach((indicator, index) => {
      if (index === currentImageIndex) {
        indicator.classList.remove('bg-white/50', 'scale-100')
        indicator.classList.add('bg-white', 'scale-125')
      } else {
        indicator.classList.remove('bg-white', 'scale-125')
        indicator.classList.add('bg-white/50', 'scale-100')
      }
    })

    // Handle Card 26 carousel
    const carouselItems26 = document.querySelectorAll('.carousel-item-26')
    const indicators26 = document.querySelectorAll('.carousel-indicator-26')

    carouselItems26.forEach((item, index) => {
      if (index === currentImageIndex) {
        item.classList.remove('opacity-0')
        item.classList.add('opacity-100')
      } else {
        item.classList.remove('opacity-100')
        item.classList.add('opacity-0')
      }
    })

    indicators26.forEach((indicator, index) => {
      if (index === currentImageIndex) {
        indicator.classList.remove('bg-gray-300')
        indicator.classList.add('bg-blue-600')
      } else {
        indicator.classList.remove('bg-blue-600')
        indicator.classList.add('bg-gray-300')
      }
    })

    // Handle Card 27 carousel
    const carouselItems27 = document.querySelectorAll('.carousel-item-27')
    const indicators27 = document.querySelectorAll('.carousel-indicator-27')

    carouselItems27.forEach((item, index) => {
      if (index === currentImageIndex) {
        item.classList.remove('opacity-0')
        item.classList.add('opacity-100')
      } else {
        item.classList.remove('opacity-100')
        item.classList.add('opacity-0')
      }
    })

    indicators27.forEach((indicator, index) => {
      if (index === currentImageIndex) {
        indicator.classList.remove('bg-white/50')
        indicator.classList.add('bg-white', 'shadow-lg')
      } else {
        indicator.classList.remove('bg-white', 'shadow-lg')
        indicator.classList.add('bg-white/50')
      }
    })

    // Handle Card 28 carousel
    const carouselItems28 = document.querySelectorAll('.carousel-item-28')

    carouselItems28.forEach((item, index) => {
      if (index === currentImageIndex) {
        item.classList.remove('opacity-0')
        item.classList.add('opacity-100')
      } else {
        item.classList.remove('opacity-100')
        item.classList.add('opacity-0')
      }
    })

    // Handle Card 29 carousel
    const carouselItems29 = document.querySelectorAll('.carousel-item-29')

    carouselItems29.forEach((item, index) => {
      if (index === currentImageIndex) {
        item.classList.remove('opacity-0')
        item.classList.add('opacity-100')
      } else {
        item.classList.remove('opacity-100')
        item.classList.add('opacity-0')
      }
    })
  }, [currentImageIndex])

  return (
    <>
      <style jsx>{`
        @keyframes bounce-x {
          0%, 100% {
            transform: translateX(0px);
          }
          50% {
            transform: translateX(4px);
          }
        }
        .animate-bounce-x {
          animation: bounce-x 1s ease-in-out infinite;
        }
        @keyframes gentle-bounce {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-3px);
          }
        }
        .animate-gentle-bounce {
          animation: gentle-bounce 1.5s ease-in-out infinite;
        }
        @keyframes pulse-glow {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 0 4px rgba(239, 68, 68, 0);
          }
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        @keyframes flash-gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .flash-gradient {
          background: linear-gradient(89deg, #fca5a5, #ef4444, #dc2626, #b91c1c, #ef4444, #f87171);
          background-size: 300% 300%;
          animation: flash-gradient 3s ease infinite;
        }
        .animated-badge {
          background: linear-gradient(45deg, #f97316, #dc2626, #ea580c, #ef4444);
          background-size: 400% 400%;
          animation: badge-gradient 2s ease-in-out infinite;
        }
        @keyframes badge-gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .shadow-pop-tr {
          -webkit-animation: shadow-pop-tr 0.3s cubic-bezier(0.470, 0.000, 0.745, 0.715) both;
          animation: shadow-pop-tr 0.3s cubic-bezier(0.470, 0.000, 0.745, 0.715) both;
        }
        @keyframes shadow-pop-tr {
          0% {
            -webkit-box-shadow: 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e;
            box-shadow: 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e;
            -webkit-transform: translateX(0) translateY(0);
            transform: translateX(0) translateY(0);
          }
          100% {
            -webkit-box-shadow: 1px -1px #3e3e3e, 2px -2px #3e3e3e, 3px -3px #3e3e3e, 4px -4px #3e3e3e, 5px -5px #3e3e3e, 6px -6px #3e3e3e, 7px -7px #3e3e3e, 8px -8px #3e3e3e;
            box-shadow: 1px -1px #3e3e3e, 2px -2px #3e3e3e, 3px -3px #3e3e3e, 4px -4px #3e3e3e, 5px -5px #3e3e3e, 6px -6px #3e3e3e, 7px -7px #3e3e3e, 8px -8px #3e3e3e;
            -webkit-transform: translateX(-8px) translateY(8px);
            transform: translateX(-8px) translateY(8px);
          }
        }
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-2px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        @keyframes gentle-glow {
          0%, 100% {
            box-shadow: 0 4px 15px rgba(59, 130, 246, 0.2);
          }
          50% {
            box-shadow: 0 4px 25px rgba(59, 130, 246, 0.4);
          }
        }
        .animate-gentle-glow {
          animation: gentle-glow 3s ease-in-out infinite;
        }
        .scale-102 {
          transform: scale(1.02);
        }
        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }
        .gradient-background-red {
          background: linear-gradient(300deg, #dc2626, #b91c1c, #ef4444, #f87171);
          background-size: 180% 180%;
          animation: gradient-animation-red 6s ease infinite;
        }
        @keyframes gradient-animation-red {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        @keyframes arrow-bounce-x {
          0%, 100% {
            transform: translateX(0px);
          }
          50% {
            transform: translateX(4px);
          }
        }
        .animate-arrow-bounce {
          animation: arrow-bounce-x 1.5s ease-in-out infinite;
        }
      `}</style>
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-4">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              ค้นหาทัวร์ที่ใช่สำหรับคุณ
            </h1>
            <p className="text-gray-600">
              เลือกจากทัวร์คุณภาพสูงกว่า 1,000+ โปรแกรม
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="ค้นหาจุดหมายปลายทาง, ประเทศ, หรือกิจกรรม..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Results Grid */}
          <div className="w-full py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4 md:gap-6">

              {/* Tour Card 1 */}
              <div className="group cursor-pointer">
                <div className="relative aspect-[5/6] overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                  {/* Tour Code */}
                  <div className="absolute top-0 right-0 z-10">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white px-4 py-1.5 rounded-bl-xl shadow-md">
                      <p className="text-base font-semibold tracking-wide">TW29847</p>
                    </div>
                  </div>
                  <video
                    src="/images/countries/japan-6.mov"
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                  {/* Text Overlay */}
                  <div className="absolute bottom-2 left-0 right-0 p-3 text-white">
                    {/* Badge */}
                    <div className="mb-2">
                      <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md">
                        โปรไฟไหม้
                      </span>
                    </div>
                    <h3 className="text-sm font-bold leading-relaxed mb-2 line-clamp-1 drop-shadow-lg">
                      ทัวร์โอซาก้า 7 วัน 5 คืน จัดเต็ม USJ ไม่มีวันอิสระ
                    </h3>
                    <p className="text-xs text-gray-100 leading-relaxed line-clamp-3 mb-2 drop-shadow-md">
                      ชมปราสาทโอซาก้า วัดคินคากุจิ วัดฟุชิมิอินาริ สวนอาราชิยามะ อุโมงค์ไผ่เขียวขจี ตลาดดงโทบอริ ช้อปปิ้งย่านชินไซบาชิ ดิวตี้ฟรีคันไซ ลิ้มลองอาหารท้องถิ่น ทาโกยากิ โอโคโนมิยากิ พักผ่อนออนเซ็นเกียวโต อิสระเต็มวัน
                    </p>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-bold text-white drop-shadow-md">ราคาเริ่มต้น <span className="text-red-400">฿89,900</span></span>
                      <span className="text-xs text-gray-200 line-through drop-shadow-md">฿119,900</span>
                    </div>
                    <p className="text-xs text-gray-100 mb-1 drop-shadow-md">
                      โปรโมชั่นนี้ถึง 31 ธ.ค. 2567 เท่านั้น
                    </p>
                    <div className="flex justify-end">
                      <span className="animate-bounce-x">
                        <a
                          className="text-xs text-white hover:text-yellow-300 cursor-pointer hover:scale-105 transition-all duration-200 leading-none drop-shadow-lg font-medium"
                          href="#"
                          tabIndex={0}
                          data-animate="true"
                          title="สำรวจโปรโมชั่นสำหรับคุณ"
                          aria-label="สำรวจโปรโมชั่นสำหรับคุณ"
                          aria-hidden="false"
                        >
                          สำรวจโปรโมชั่นสำหรับคุณ ›
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tour Card 2 - Ticket Style Design */}
              <div className="group cursor-pointer">
                <div className="relative aspect-[5/6] overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                  {/* Tour Code */}
                  <div className="absolute top-0 right-0 z-10">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white px-4 py-1.5 rounded-bl-xl shadow-md">
                      <p className="text-base font-semibold tracking-wide">TW73512</p>
                    </div>
                  </div>
                  <video
                    src="/images/countries/japan-6.mov"
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                  {/* Airline Ticket Style Content */}
                  <div className="absolute bottom-8 left-0 right-0 px-6 py-4">
                    {/* Ticket Container */}
                    <div className="bg-white/95 backdrop-blur-sm shadow-lg rounded-lg relative overflow-hidden transform scale-90" style={{
                      maskImage: 'radial-gradient(circle at 0% 50%, transparent 6px, black 6px), radial-gradient(circle at 100% 50%, transparent 6px, black 6px)',
                      maskComposite: 'intersect'
                    }}>
                      {/* Main Ticket Body */}
                      <div className="relative">

                        {/* Ticket Content */}
                        <div className="px-2 py-1">
                          {/* Header - Tour Name */}
                          <div className="mb-1 pb-1 border-b border-gray-200">
                            <h3 className="text-sm font-bold text-gray-900 mb-1 line-clamp-1">
                              ทัวร์โอซาก้า 7 วัน 5 คืน จัดเต็ม USJ ไม่มีวันอิสระ
                            </h3>
                          </div>

                          {/* Route */}
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-center">
                              <div className="text-sm font-bold text-gray-900">BKK</div>
                              <div className="text-xs text-gray-500">กรุงเทพฯ</div>
                            </div>
                            <div className="flex-1 mx-2 relative flex items-center">
                              <div className="flex-1 border-t-2 border-dashed border-gray-300 mr-2"></div>
                              <div className="flex flex-col items-center">
                                <div className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-sm shadow-md">✈</div>
                                <div className="text-[9px] text-gray-500 mt-1 whitespace-nowrap">Thai Airways</div>
                              </div>
                              <div className="flex-1 border-t-2 border-dashed border-gray-300 ml-2"></div>
                            </div>
                            <div className="text-center">
                              <div className="text-sm font-bold text-gray-900">KIX</div>
                              <div className="text-xs text-gray-500">โอซาก้า</div>
                            </div>
                          </div>

                          {/* Promotion Details */}
                          <div className="text-center mb-1 py-2 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border-l-3 border-red-500">
                            <div className="flex items-center justify-center gap-3 text-xs">
                              <div className="flex items-center gap-2">
                                <span className="bg-red-500 text-white px-2 py-0.5 rounded-full font-bold text-[9px] animate-pulse-glow">ลด ฿30,000</span>
                                <div className="flex items-center gap-1">
                                  <span className="text-[10px] text-gray-400 line-through">฿119,900</span>
                                  <span className="text-red-600 font-bold text-sm">฿89,900</span>
                                </div>
                              </div>
                              <div className="h-3 w-px bg-gray-300"></div>
                              <div className="flex items-center gap-1 text-orange-600">
                                <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                </svg>
                                <span className="font-bold text-[10px]">เหลือ 3 วัน</span>
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>

                  {/* Link outside card at bottom center */}
                  <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2">
                    <div className="animate-gentle-bounce text-center">
                      <a
                        className="text-xs text-white hover:text-yellow-300 cursor-pointer hover:scale-105 transition-all duration-200 leading-none flex items-center gap-1 drop-shadow-lg font-medium"
                        href="#"
                        tabIndex={0}
                        data-animate="true"
                        title="สำรวจโปรโมชั่นสำหรับคุณ"
                        aria-label="สำรวจโปรโมชั่นสำหรับคุณ"
                        aria-hidden="false"
                      >
                        สำรวจโปรโมชั่นสำหรับคุณ
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tour Card 3 - Design from tour-search-46 */}
              <div className="group cursor-pointer">
                <div className="relative aspect-[5/6] overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                  {/* Tour Code */}
                  <div className="absolute top-0 right-0 z-10">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white px-4 py-1.5 rounded-bl-xl shadow-md">
                      <p className="text-base font-semibold tracking-wide">TW68324</p>
                    </div>
                  </div>
                  <video
                    src="/images/countries/japan-6.mov"
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />

                  {/* Content from tour-search-46 style */}
                  <div className="absolute inset-x-0 bottom-0 px-6 py-2">
                    <h2 className="text-white text-lg md:text-xl font-bold mb-2 text-center drop-shadow-2xl" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>
                      ทัวร์โอซาก้า 7 วัน 5 คืน จัดเต็ม USJ ไม่มีวันอิสระ
                    </h2>

                    <div className="relative mb-3 shadow-2xl transform scale-90" style={{
                      clipPath: 'polygon(0px 0px, calc(100% - 3px) 0px, 100% 5px, calc(100% - 3px) 10px, 100% 15px, calc(100% - 3px) 20px, 100% 25px, calc(100% - 3px) 30px, 100% 35px, calc(100% - 3px) 40px, 100% 45px, calc(100% - 3px) 50px, 100% 55px, calc(100% - 3px) 60px, 100% 65px, calc(100% - 3px) 70px, 100% 75px, calc(100% - 3px) 80px, 100% 85px, calc(100% - 3px) 90px, 100% 95px, calc(100% - 3px) 100px, 100% 105px, calc(100% - 3px) 110px, 100% 115px, calc(100% - 3px) 120px, 100% 125px, calc(100% - 3px) 130px, 100% 135px, calc(100% - 3px) 140px, 100% 145px, calc(100% - 3px) 150px, 100% 155px, calc(100% - 3px) 160px, 100% 165px, calc(100% - 3px) 170px, 100% 175px, calc(100% - 3px) 180px, 100% 100%, 0px 100%, 3px 180px, 0px 175px, 3px 170px, 0px 165px, 3px 160px, 0px 155px, 3px 150px, 0px 145px, 3px 140px, 0px 135px, 3px 130px, 0px 125px, 3px 120px, 0px 115px, 3px 110px, 0px 105px, 3px 100px, 0px 95px, 3px 90px, 0px 85px, 3px 80px, 0px 75px, 3px 70px, 0px 65px, 3px 60px, 0px 55px, 3px 50px, 0px 45px, 3px 40px, 0px 35px, 3px 30px, 0px 25px, 3px 20px, 0px 15px, 3px 10px, 0px 5px)'
                    }}>

                      {/* Header */}
                      <div className="flash-gradient text-white px-3 py-1.5 relative">
                        <div className="flex items-center justify-center">
                          <div className="flex items-center gap-2">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <span className="text-xs font-bold uppercase tracking-wide">Flash Sale</span>
                          </div>
                        </div>
                      </div>
                      {/* Price Section */}
                      <div className="bg-white/95 backdrop-blur-sm">
                        <div className="py-2 px-3">
                          <div className="text-center mb-2">
                            <div className="flex items-center justify-center gap-2 mb-1.5">
                              <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse-glow">ลด ฿30,000</span>
                              <span className="text-xs text-gray-400 line-through">฿119,900</span>
                            </div>
                            <div className="flex items-baseline justify-center gap-2 mb-1.5">
                              <span className="text-2xl font-bold text-red-600">฿89,900</span>
                              <span className="text-gray-600 text-sm">ต่อท่าน</span>
                            </div>
                            <p className="text-[10px] text-gray-500 mb-1.5">
                              โปรโมชั่นนี้ถึง 31 ธ.ค. 2567 เท่านั้น
                            </p>
                          </div>
                        </div>

                        {/* Features */}
                        <div className="border-t border-gray-100 pt-2 pb-2 px-3">
                          <div className="flex items-center justify-center gap-3 text-xs">
                            <div className="flex items-center gap-1">
                              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                              <span className="text-red-600 font-medium">ด่วน! เหลือ 3 วันสุดท้าย</span>
                            </div>
                            <span className="text-gray-300">|</span>
                            <div className="flex items-center gap-1">
                              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                              <span className="text-green-600 font-medium">ผ่อน 0% 6 เดือน</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="text-center mt-2">
                      <div className="animate-gentle-bounce text-center">
                        <a
                          className="text-xs text-white hover:text-yellow-300 cursor-pointer hover:scale-105 transition-all duration-200 leading-none inline-flex items-center gap-1 drop-shadow-lg font-medium"
                          href="#"
                          tabIndex={0}
                          data-animate="true"
                          title="สำรวจโปรโมชั่นสำหรับคุณ"
                          aria-label="สำรวจโปรโมชั่นสำหรับคุณ"
                          aria-hidden="false"
                        >
                          สำรวจโปรโมชั่นสำหรับคุณ
                          <svg fill="currentColor" viewBox="0 0 20 20" className="w-3 h-3">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </a>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* Tour Card 4 - Flash Sale Premium Style */}
              <div className="group cursor-pointer">
                <div className="relative aspect-[5/6] overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                  {/* Tour Code */}
                  <div className="absolute top-0 right-0 z-10">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white px-4 py-1.5 rounded-bl-xl shadow-md">
                      <p className="text-base font-semibold tracking-wide">TW49731</p>
                    </div>
                  </div>
                  <video
                    src="/images/countries/japan-6.mov"
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                  {/* Premium Card Content */}
                  <div className="absolute bottom-8 left-0 right-0 px-6 py-4">
                    <div className="bg-white/95 backdrop-blur-sm shadow-lg rounded-lg p-4 border-l-4 border-red-600">
                      {/* Premium Header */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M13 10V3L4 14h7v7l9-11h-7z" clipRule="evenodd" />
                            </svg>
                            พิเศษสุด
                          </div>
                          <span className="text-gray-600 text-xs">บริการระดับพรีเมี่ยม</span>
                        </div>
                      </div>

                      {/* Tour Title */}
                      <h3 className="text-gray-900 text-lg font-bold mb-2">
                        ทัวร์โอซาก้า VIP 7 วัน 5 คืน พักโรงแรม 5 ดาว
                      </h3>

                      {/* Features */}
                      <div className="flex items-center gap-4 mb-3 text-xs">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <span className="text-gray-700 font-medium">ไกด์ส่วนตัว</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          <span className="text-gray-700 font-medium">ร้านมิชลิน</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <span className="text-gray-700 font-medium">โรงแรมระดับ 5 ดาว</span>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-red-600">฿89,900</span>
                          <span className="text-gray-400 text-sm ml-2 line-through">฿119,900</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600">7 วัน 5 คืน</div>
                          <div className="text-xs text-red-600 font-medium">ลด ฿30,000</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Link outside card at bottom center */}
                  <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2">
                    <div className="animate-gentle-bounce text-center">
                      <a
                        className="text-xs text-white hover:text-yellow-300 cursor-pointer hover:scale-105 transition-all duration-200 leading-none flex items-center gap-1 drop-shadow-lg font-medium"
                        href="#"
                        tabIndex={0}
                        data-animate="true"
                        title="สำรวจโปรโมชั่นสำหรับคุณ"
                        aria-label="สำรวจโปรโมชั่นสำหรับคุณ"
                        aria-hidden="false"
                      >
                        สำรวจโปรโมชั่นสำหรับคุณ
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tour Card 5 - Split Layout Style */}
              <div className="group cursor-pointer">
                <div className="relative aspect-[5/6] overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                  {/* Tour Code */}
                  <div className="absolute top-0 right-0 z-10">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white px-4 py-1.5 rounded-bl-xl shadow-md">
                      <p className="text-base font-semibold tracking-wide">TW86243</p>
                    </div>
                  </div>

                  {/* Split Background - Video Top, Card Bottom */}
                  <div className="h-[60%] relative">
                    <video
                      src="/images/countries/japan-6.mov"
                      className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                    {/* Gradient overlay on video */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-600/90"></div>

                    {/* Floating Badge */}
                    <div className="absolute bottom-4 left-4">
                      <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
                            <span className="text-white text-xs font-bold">HOT</span>
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-500">โปรโมชั่นพิเศษ</p>
                            <p className="text-xs font-bold text-red-600">ลด 25%</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Content Card */}
                  <div className="h-[40%] bg-gradient-to-br from-blue-600 to-blue-700 relative">
                    <div className="absolute inset-0 bg-white/10"></div>
                    <div className="relative h-full flex flex-col justify-between p-4">
                      {/* Title Section */}
                      <div>
                        <h3 className="text-white font-bold text-base mb-1 line-clamp-1">
                          ทัวร์ญี่ปุ่น โตเกียว-โอซาก้า 7 วัน
                        </h3>
                        <div className="flex items-center gap-3 text-white/80 text-xs">
                          <span className="flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            2 เมือง
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                            </svg>
                            7 วัน 5 คืน
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                            </svg>
                            15 ที่นั่ง
                          </span>
                        </div>
                      </div>

                      {/* Price Section */}
                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-white/60 text-xs mb-1">ราคาเริ่มต้น</p>
                          <div className="flex items-baseline gap-2">
                            <span className="text-white text-2xl font-bold">฿89,900</span>
                            <span className="text-white/50 text-sm line-through">฿119,900</span>
                          </div>
                        </div>
                        <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-bold text-xs hover:bg-yellow-400 hover:text-blue-700 transition-all duration-200 shadow-lg">
                          VIP
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tour Card 6 - Diagonal Split Style */}
              <div className="group cursor-pointer">
                <div className="relative aspect-[5/6] overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                  {/* Tour Code */}
                  <div className="absolute top-0 right-0 z-10">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white px-4 py-1.5 rounded-bl-xl shadow-md">
                      <p className="text-base font-semibold tracking-wide">TW92476</p>
                    </div>
                  </div>

                  <video
                    src="/images/countries/japan-6.mov"
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />

                  {/* Diagonal Overlay */}
                  <div className="absolute inset-0" style={{
                    background: 'linear-gradient(135deg, transparent 50%, rgba(239, 68, 68, 0.95) 50%)'
                  }}></div>

                  {/* Content on Diagonal */}
                  <div className="absolute bottom-0 right-0 w-[70%] p-6 text-white">
                    <div className="text-right">
                      <div className="inline-block bg-yellow-400 text-red-600 px-3 py-1 rounded-full text-xs font-bold mb-3">
                        ⚡ FLASH DEAL
                      </div>
                      <h3 className="text-lg font-bold mb-2">
                        ทัวร์พรีเมี่ยม ญี่ปุ่น 7 วัน
                      </h3>
                      <div className="flex justify-end items-baseline gap-2 mb-2">
                        <span className="text-2xl font-bold">฿89,900</span>
                        <span className="text-sm line-through opacity-70">฿119,900</span>
                      </div>
                      <p className="text-xs opacity-90">รวมทุกอย่าง • ไม่มีค่าใช้จ่ายเพิ่ม</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tour Card 7 - Corner Badge Style */}
              <div className="group cursor-pointer">
                <div className="relative aspect-[5/6] overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                  {/* Tour Code */}
                  <div className="absolute top-0 right-0 z-10">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white px-4 py-1.5 rounded-bl-xl shadow-md">
                      <p className="text-base font-semibold tracking-wide">TW73819</p>
                    </div>
                  </div>

                  <video
                    src="/images/countries/japan-6.mov"
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />

                  {/* Corner Triangle Badge */}
                  <div className="absolute top-0 left-0 w-32 h-32 overflow-hidden">
                    <div className="absolute transform -rotate-45 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-2 left-[-40px] top-[25px] w-[170px] shadow-lg">
                      <p className="text-xs font-bold">BEST SELLER</p>
                    </div>
                  </div>

                  {/* Bottom Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                  {/* Minimal Bottom Content */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-end justify-between">
                      <div>
                        <h3 className="text-white font-bold text-lg mb-1">
                          โอซาก้า-เกียวโต 7 วัน
                        </h3>
                        <p className="text-white/80 text-xs">พักโรงแรม 4-5 ดาว</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white/60 text-xs">เริ่มต้น</p>
                        <p className="text-white text-2xl font-bold">฿89,900</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tour Card 8 - Neon Border Style */}
              <div className="group cursor-pointer">
                <div className="relative aspect-[5/6] overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                  {/* Tour Code */}
                  <div className="absolute top-0 right-0 z-10">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white px-4 py-1.5 rounded-bl-xl shadow-md">
                      <p className="text-base font-semibold tracking-wide">TW61528</p>
                    </div>
                  </div>

                  <video
                    src="/images/countries/japan-6.mov"
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />

                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                  {/* Neon Border Effect */}
                  <div className="absolute inset-6 border-2 border-red-500 rounded-lg shadow-[0_0_20px_rgba(239,68,68,0.6)] animate-pulse"></div>

                  {/* Content Inside Neon Border */}
                  <div className="absolute inset-0 flex flex-col justify-end p-10">
                    <div className="text-center text-white">
                      <div className="animated-badge text-white px-4 py-1 rounded-full text-xs font-bold mb-4 inline-block shadow-md transform rotate-3">
                        ⚡ HOT DEAL
                      </div>

                      <h3 className="text-xl font-bold mb-3 drop-shadow-lg">
                        ทัวร์ญี่ปุ่น โอซาก้า
                      </h3>

                      <div className="flex items-center justify-center gap-2 mb-4 text-xs">
                        <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full font-medium">7 วัน 5 คืน</span>
                        <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full font-medium">USJ</span>
                        <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full font-medium">บินตรง</span>
                      </div>

                      <div className="text-3xl font-bold mb-2 drop-shadow-lg">
                        ฿89,900
                      </div>

                      <p className="text-sm opacity-80 line-through">
                        ราคาเดิม ฿119,900
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tour Card 9 - Side Panel Style */}
              <div className="group cursor-pointer">
                <div className="relative aspect-[5/6] overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                  {/* Tour Code */}
                  <div className="absolute top-0 right-0 z-10">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white px-4 py-1.5 rounded-bl-xl shadow-md">
                      <p className="text-base font-semibold tracking-wide">TW38924</p>
                    </div>
                  </div>

                  <div className="flex h-full">
                    {/* Video Side - 65% */}
                    <div className="w-[65%] relative">
                      <video
                        src="/images/countries/japan-6.mov"
                        className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-blue-600/50"></div>
                    </div>

                    {/* Info Panel - 35% */}
                    <div className="w-[35%] bg-gradient-to-b from-blue-600 to-blue-700 p-4 flex flex-col justify-between">
                      <div className="mt-8">
                        <h3 className="text-white font-bold text-sm mb-2 leading-tight">
                          ทัวร์ญี่ปุ่น
                          <br />โอซาก้า
                        </h3>
                        <div className="space-y-1 text-white/80 text-xs">
                          <p>✓ 7 วัน 5 คืน</p>
                          <p>✓ บินตรง</p>
                          <p>✓ โรงแรม 4 ดาว</p>
                        </div>
                      </div>
                      <div className="text-white">
                        <p className="text-xs opacity-60">ราคาพิเศษ</p>
                        <p className="text-xl font-bold">฿89,900</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tour Card 10 - Diagonal Split Style */}
              <div className="group cursor-pointer">
                <div className="relative aspect-[5/6] overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                  {/* Tour Code */}
                  <div className="absolute top-0 right-0 z-20">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white px-4 py-1.5 rounded-bl-xl shadow-md">
                      <p className="text-base font-semibold tracking-wide">TW50832</p>
                    </div>
                  </div>

                  <video
                    src="/images/countries/japan-6.mov"
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />

                  {/* Diagonal Split Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/80">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/90 via-transparent to-transparent"
                         style={{clipPath: 'polygon(0 0, 70% 0, 0 100%)'}}></div>
                  </div>

                  {/* Premium Badge Top Left */}
                  <div className="absolute top-6 left-6 z-10">
                    <div className="bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
                      ⭐ PREMIUM
                    </div>
                  </div>

                  {/* Main Content - Top Left Area */}
                  <div className="absolute top-16 left-6 text-white z-10 max-w-[60%]">
                    <h3 className="text-xl font-bold mb-2 drop-shadow-lg leading-tight">
                      โอซาก้า<br />เกียวโต
                    </h3>
                    <div className="space-y-1 text-sm">
                      <p className="drop-shadow-md">🌸 ช่วงซากุระ</p>
                      <p className="drop-shadow-md">🏯 วัดทอง</p>
                      <p className="drop-shadow-md">🍜 อาหารแท้</p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Tour Card 11 - Frame Border Style */}
              <div className="group cursor-pointer">
                <div className="relative aspect-[5/6] overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                  {/* Tour Code */}
                  <div className="absolute top-0 right-0 z-10">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white px-4 py-1.5 rounded-bl-xl shadow-md">
                      <p className="text-base font-semibold tracking-wide">TW14782</p>
                    </div>
                  </div>

                  <video
                    src="/images/countries/japan-6.mov"
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />

                  {/* Split Screen Design */}
                  <div className="absolute inset-0">
                    {/* Left side - Blue theme with transparency */}
                    <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-gradient-to-br from-blue-600/80 to-blue-800/80"></div>
                    {/* Right side - White with transparency */}
                    <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-white/85"></div>
                  </div>

                  {/* Left content - Blue side */}
                  <div className="absolute left-6 top-6 bottom-6 w-1/2 flex flex-col justify-between text-white z-10">
                    <div>
                      <h3 className="text-xl font-bold mb-2">ญี่ปุ่น<br />พรีเมี่ยม</h3>
                      <p className="text-sm opacity-90">7 วัน 5 คืน</p>
                    </div>
                    <div className="space-y-1 text-xs">
                      <p>✓ โรงแรม 5 ดาว</p>
                      <p>✓ ไกด์ส่วนตัว</p>
                      <p>✓ รถ VIP</p>
                    </div>
                  </div>

                  {/* Right content - White side */}
                  <div className="absolute right-6 top-6 bottom-6 w-1/2 flex flex-col justify-center text-gray-900 z-10">
                    <div className="text-center">
                      <div className="mb-4">
                        <div className="bg-red-600 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-lg relative overflow-hidden inline-block">
                          <div className="absolute inset-0 bg-gradient-to-r from-red-500/50 to-red-700/50"></div>
                          <span className="relative flex items-center gap-1">
                            <span>🔥</span>
                            <span>ประหยัด 30%</span>
                          </span>
                        </div>
                      </div>
                      <div className="mb-2">
                        <p className="text-3xl font-bold text-blue-600">฿89,900</p>
                        <p className="text-sm text-gray-500 line-through">฿120,000</p>
                      </div>
                      <div className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold">
                        จองเลย
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tour Card 12 - Circle Overlay Style */}
              <div className="group cursor-pointer">
                <div className="relative aspect-[5/6] overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                  {/* Tour Code */}
                  <div className="absolute top-0 right-0 z-10">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white px-4 py-1.5 rounded-bl-xl shadow-md">
                      <p className="text-base font-semibold tracking-wide">TW95637</p>
                    </div>
                  </div>

                  <video
                    src="/images/countries/japan-6.mov"
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />

                  {/* Large Circle Overlay */}
                  <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-600/90 rounded-full flex items-center justify-center">
                    <div className="text-white text-center transform -translate-x-8 -translate-y-8">
                      <p className="text-xs font-bold mb-1">SPECIAL PRICE</p>
                      <p className="text-3xl font-bold">฿89.9K</p>
                      <p className="text-xs line-through opacity-70">฿119,900</p>
                    </div>
                  </div>

                  {/* Top Left Info */}
                  <div className="absolute top-6 left-6 text-white">
                    <h3 className="font-bold text-lg drop-shadow-lg">
                      โอซาก้า พรีเมี่ยม
                    </h3>
                    <p className="text-sm opacity-90 drop-shadow-md">
                      7 วัน 5 คืน
                    </p>
                  </div>
                </div>
              </div>

              {/* Tour Card 13 - Luxury Ribbon Style */}
              <div className="group cursor-pointer">
                <div className="relative aspect-[5/6] overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                  {/* Tour Code */}
                  <div className="absolute top-0 right-0 z-20">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white px-4 py-1.5 rounded-bl-xl shadow-md">
                      <p className="text-base font-semibold tracking-wide">TW28461</p>
                    </div>
                  </div>

                  <video
                    src="/images/countries/japan-6.mov"
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />

                  {/* Diagonal Ribbon */}
                  <div className="absolute top-0 left-0 w-32 h-32 overflow-hidden z-10">
                    <div className="absolute transform rotate-[-45deg] bg-gradient-to-r from-red-600 to-red-700 text-white text-center py-2 left-[-30px] top-[30px] w-40 shadow-lg">
                      <p className="text-xs font-bold">FLASH SALE</p>
                    </div>
                  </div>

                  {/* Curved Bottom Panel */}
                  <div className="absolute bottom-0 left-0 right-0 z-10">
                    <svg className="w-full h-6" viewBox="0 0 400 24" preserveAspectRatio="none">
                      <path d="M0,24 C50,0 150,0 200,12 C250,24 350,12 400,0 L400,24 Z" fill="rgba(37, 99, 235, 0.95)" />
                    </svg>
                    <div className="bg-blue-600/95 backdrop-blur-sm p-4 text-white">
                      <div className="text-center">
                        <h3 className="font-bold text-lg mb-1">ญี่ปุ่น คลาสสิค</h3>
                        <p className="text-xs opacity-90 mb-3">โอซาก้า-เกียวโต 7 วัน 5 คืน</p>
                        <div className="flex items-center justify-center gap-4">
                          <p className="text-2xl font-bold">฿89,900</p>
                          <div className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">
                            ลด 25%
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tour Card 14 - Gradient Wave Style */}
              <div className="group cursor-pointer">
                <div className="relative aspect-[5/6] overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                  {/* Tour Code */}
                  <div className="absolute top-0 right-0 z-10">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white px-4 py-1.5 rounded-bl-xl shadow-md">
                      <p className="text-base font-semibold tracking-wide">TW67593</p>
                    </div>
                  </div>

                  <video
                    src="/images/countries/japan-6.mov"
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />

                  {/* Magazine Style Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                  {/* Magazine Header */}
                  <div className="absolute top-6 left-6 z-10">
                    <div className="bg-red-600/90 backdrop-blur-sm text-white px-4 py-2 rounded text-xs font-bold shadow-lg">
                      HOT DEAL
                    </div>
                  </div>

                  {/* Magazine Content Layout */}
                  <div className="absolute inset-6 flex flex-col justify-end text-white z-10">
                    {/* Main Headline */}
                    <div className="mb-4">
                      <h1 className="text-3xl font-bold leading-tight mb-2">
                        ญี่ปุ่น
                        <br />
                        <span className="text-red-500">ผจญภัย</span>
                      </h1>
                      <p className="text-sm opacity-90">สัมผัสดินแดนอาทิตย์อุทัย</p>
                    </div>

                    {/* Magazine Details */}
                    <div className="flex items-end justify-between">
                      <div className="space-y-1">
                        <p className="text-xs uppercase tracking-wide opacity-80">7 วัน • พรีเมี่ยม</p>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="bg-yellow-500 text-black px-2 py-1 rounded font-bold">ใหม่</span>
                          <span>ลิมิเต็ด อิดิชั่น</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs opacity-80">เริ่มต้น</p>
                        <p className="text-3xl font-bold">฿89,900</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tour Card 15 - Hexagon Badge Style */}
              <div className="group cursor-pointer">
                <div className="relative aspect-[5/6] overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                  {/* Tour Code */}
                  <div className="absolute top-0 right-0 z-10">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white px-4 py-1.5 rounded-bl-xl shadow-md">
                      <p className="text-base font-semibold tracking-wide">TW31856</p>
                    </div>
                  </div>

                  <video
                    src="/images/countries/japan-6.mov"
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />

                  {/* Geometric Pattern Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-700/80 to-blue-600/90"></div>

                  {/* Left Side Content */}
                  <div className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white z-10 max-w-[60%]">
                    <div className="mb-4">
                      <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold mb-3 inline-block">
                        VIP TOUR
                      </div>
                      <h3 className="text-2xl font-bold leading-tight mb-2">
                        ญี่ปุ่น<br />
                        ลักซ์ชัวรี่
                      </h3>
                      <p className="text-sm opacity-90">7 วัน 6 คืน เฟิร์สคลาส</p>
                    </div>
                  </div>

                  {/* Right Side Price Card */}
                  <div className="absolute right-6 top-1/2 transform -translate-y-1/2 z-10">
                    <div className="bg-white rounded-xl p-6 text-center shadow-2xl min-w-[120px]">
                      <div className="mb-3">
                        <div className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold inline-block">
                          HOT
                        </div>
                      </div>
                      <div className="mb-3">
                        <p className="text-3xl font-bold text-gray-900">฿89,900</p>
                        <p className="text-xs text-gray-500 line-through">฿120,000</p>
                      </div>
                      <div className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold">
                        จองเลย
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Tour Card 16 - Pill Stack Style */}
              <div className="group cursor-pointer">
                <div className="relative aspect-[5/6] overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                  {/* Tour Code */}
                  <div className="absolute top-0 right-0 z-10">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white px-4 py-1.5 rounded-bl-xl shadow-md">
                      <p className="text-base font-semibold tracking-wide">TW42718</p>
                    </div>
                  </div>

                  <video
                    src="/images/countries/japan-6.mov"
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                  {/* Stacked Pills */}
                  <div className="absolute bottom-6 left-6 right-6 space-y-2">
                    <div className="bg-red-600/90 backdrop-blur-sm rounded-full px-4 py-2 text-white text-center">
                      <span className="text-sm font-bold">⚡ ทัวร์ญี่ปุ่น 7 วัน 5 คืน</span>
                    </div>
                    <div className="bg-blue-600/90 backdrop-blur-sm rounded-full px-4 py-2 text-white flex justify-between items-center">
                      <span className="text-xs">ราคาพิเศษ</span>
                      <span className="text-lg font-bold">฿89,900</span>
                    </div>
                    <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 text-gray-900 text-center">
                      <span className="text-xs font-medium">✓ รวมทุกอย่าง • ไม่มีค่าใช้จ่ายเพิ่ม</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tour Card 17 - Rotated Card Style */}
              <div className="group cursor-pointer">
                <div className="relative aspect-[5/6] overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                  {/* Tour Code */}
                  <div className="absolute top-0 right-0 z-10">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white px-4 py-1.5 rounded-bl-xl shadow-md">
                      <p className="text-base font-semibold tracking-wide">TW58923</p>
                    </div>
                  </div>

                  <video
                    src="/images/countries/japan-6.mov"
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />

                  {/* Rotated Info Card */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/95 backdrop-blur-sm rounded-lg p-6 shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-300 max-w-[80%]">
                      <div className="text-center">
                        <div className="inline-block bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold mb-3">
                          HOT DEAL
                        </div>
                        <h3 className="text-gray-900 font-bold text-lg mb-2">
                          โอซาก้า ซากุระ
                        </h3>
                        <p className="text-gray-600 text-sm mb-3">
                          7 วัน 5 คืน
                        </p>
                        <div className="border-t pt-3">
                          <span className="text-2xl font-bold text-red-600">฿89,900</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tour Card 18 - Gradient Bars Style */}
              <div className="group cursor-pointer">
                <div className="relative aspect-[5/6] overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                  {/* Tour Code */}
                  <div className="absolute top-0 right-0 z-10">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white px-4 py-1.5 rounded-bl-xl shadow-md">
                      <p className="text-base font-semibold tracking-wide">TW76214</p>
                    </div>
                  </div>

                  <video
                    src="/images/countries/japan-6.mov"
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />

                  {/* Top Gradient Bar */}
                  <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-blue-600/80 to-transparent"></div>

                  {/* Bottom Gradient Bars */}
                  <div className="absolute bottom-0 left-0 right-0">
                    <div className="h-3 bg-gradient-to-r from-blue-600 via-red-600 to-blue-600"></div>
                    <div className="bg-black/80 backdrop-blur-sm p-4">
                      <div className="flex items-center justify-between text-white">
                        <div>
                          <h3 className="font-bold text-base">ทัวร์ญี่ปุ่น พรีเมี่ยม</h3>
                          <p className="text-xs opacity-80">7 วัน 5 คืน • 2 เมือง</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs opacity-60">เริ่มต้น</p>
                          <p className="text-2xl font-bold">฿89,900</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tour Card 19 - Spotlight Style */}
              <div className="group cursor-pointer">
                <div className="relative aspect-[5/6] overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                  {/* Tour Code */}
                  <div className="absolute top-0 right-0 z-10">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white px-4 py-1.5 rounded-bl-xl shadow-md">
                      <p className="text-base font-semibold tracking-wide">TW83452</p>
                    </div>
                  </div>

                  <video
                    src="/images/countries/japan-6.mov"
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />

                  {/* Simple Dark Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                  {/* Single Bottom Bar */}
                  <div className="absolute bottom-0 left-0 right-0 z-10">
                    <div className="bg-blue-600/95 backdrop-blur-sm p-4 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-bold text-base">ญี่ปุ่น 7 วัน</h3>
                          <p className="text-xs opacity-90">โอซาก้า-เกียวโต</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold">฿89,900</p>
                          <p className="text-xs opacity-90">ต่อท่าน</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tour Card 20 - Mosaic Grid Style */}
              <div className="group cursor-pointer">
                <div className="relative aspect-[5/6] overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                  {/* Tour Code */}
                  <div className="absolute top-0 right-0 z-10">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white px-4 py-1.5 rounded-bl-xl shadow-md">
                      <p className="text-base font-semibold tracking-wide">TW91635</p>
                    </div>
                  </div>

                  <video
                    src="/images/countries/japan-6.mov"
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />

                  {/* Minimal Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                  {/* Side Panel Style */}
                  <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-blue-600/95 to-blue-600/80 backdrop-blur-sm z-10">
                    <div className="flex flex-col justify-center h-full p-4 text-white text-center">
                      <div className="mb-4">
                        <div className="bg-yellow-400 text-red-700 px-3 py-1 rounded text-xs font-bold mb-3 inline-block transform rotate-[-3deg] shadow-md border-2 border-red-600">
                          โปรโมชั่น
                        </div>
                        <h3 className="text-lg font-bold mb-2">ญี่ปุ่น</h3>
                        <p className="text-xs opacity-90">7 วัน 5 คืน</p>
                      </div>
                      <div className="border-t border-white/30 pt-4">
                        <p className="text-2xl font-bold">฿89,900</p>
                        <p className="text-xs opacity-80">ต่อท่าน</p>
                      </div>
                    </div>
                  </div>

                  {/* Left Content */}
                  <div className="absolute left-6 bottom-6 text-white z-10">
                    <h2 className="text-xl font-bold mb-1">โอซาก้า-เกียวโต</h2>
                    <p className="text-sm opacity-90">ทัวร์พรีเมี่ยม</p>
                  </div>
                </div>
              </div>

              {/* Tour Card 21 - สไตล์หรูหราสุดพิเศษ */}
              {/*
                แนวคิดการออกแบบ:
                - ความสวยงาม: เน้นสีสันนุ่มนวล ไล่โทนที่ลึกซึ้ง
                - ความหรูหรา: ใช้ทองคำและสีน้ำเงินเข้ม
                - อ่านง่าย: ตัวอักษรชัดเจน มีพื้นที่หายใจ
                - ความน่าเชื่อถือ: แสดงข้อมูลครบถ้วน
              */}
              <div className="group cursor-pointer">
                <div className="relative aspect-[5/6] overflow-hidden rounded-xl shadow-md hover:shadow-xl hover:shadow-pop-tr transition-all duration-300">

                  {/* รหัสทัวร์ */}
                  <div className="absolute top-0 right-0 z-10">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white px-4 py-1.5 rounded-bl-xl shadow-md">
                      <p className="text-base font-semibold tracking-wide">TW-2101</p>
                    </div>
                  </div>

                  <video
                    src="/images/countries/japan-6.mov"
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />

                  {/* เอฟเฟกต์พื้นหลัง */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                  {/* ป้ายพิเศษ */}
                  <div className="absolute top-4 left-4 z-10">
                    <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg">
                      🌟 แพ็คเกจพิเศษ
                    </div>
                  </div>

                  {/* เนื้อหาหลัก */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">

                    {/* ชื่อทัวร์ */}
                    <h3 className="text-white text-base font-bold mb-3 leading-tight drop-shadow-lg">
                      ญี่ปุ่น พรีเมี่ยม โตเกียว-โอซาก้า-เกียวโต
                    </h3>

                    {/* รายละเอียดการเดินทาง */}
                    <div className="space-y-1 mb-3">
                      <p className="text-blue-100 text-xs">✈️ การบินไทย บินตรง</p>
                      <p className="text-blue-100 text-xs">🏨 โรงแรม 5 ดาว • 7 วัน 5 คืน</p>
                      <p className="text-pink-200 text-xs">🌸 ซากุระ • 🏯 เกียวโต • 🗼 สกายทรี • ♨️ ออนเซ็น</p>
                    </div>

                    {/* ส่วนราคา */}
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-red-500 text-sm line-through mb-1">฿145,000</p>
                          <div className="flex items-baseline gap-1">
                            <span className="text-slate-800 text-xl font-bold">฿89,900</span>
                            <span className="text-gray-600 text-xs">ต่อท่าน</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="bg-emerald-500 text-white px-2 py-1 rounded-md">
                            <p className="text-xs font-bold">ประหยัด 38%</p>
                          </div>
                          <p className="text-gray-500 text-xs mt-1">คุ้มที่สุด!</p>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* Tour Card 22 - Bento Grid Better Layout */}
              {/*
                Layout: BENTO GRID จัดเรียงใหม่
                - วิดีโอขยายใหญ่ขึ้น (บน 2x2)
                - ราคาเด่นชัด (ล่างขยาย)
                - Flash Sale ยังเด่น
              */}
              <div className="group cursor-pointer">
                <div className="relative aspect-[5/6] overflow-hidden rounded-xl shadow-md hover:shadow-xl hover:shadow-pop-tr transition-all duration-300 bg-slate-900">

                  {/* Grid Container - 6 rows x 3 cols */}
                  <div className="absolute inset-0 grid grid-cols-3 grid-rows-6 gap-0.5 p-1.5">

                    {/* Top: Video Large (span 2x3) */}
                    <div className="col-span-2 row-span-3 relative overflow-hidden rounded-lg">
                      <video
                        src="/images/countries/japan-6.mov"
                        className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                      {/* Title Overlay */}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-3">
                        <p className="text-white text-sm font-bold leading-tight">
                          ญี่ปุ่น โตเกียว ฟูจิ ฮาโกเน่
                        </p>
                      </div>
                    </div>

                    {/* Top-right: Flash Sale (tall) */}
                    <div className="row-span-2 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-lg group-hover:animate-pulse transition-all duration-300">
                      <div className="text-center group-hover:scale-110 transition-transform duration-300">
                        <p className="text-white text-base font-black">FLASH</p>
                        <p className="text-white text-sm font-bold">SALE</p>
                      </div>
                    </div>

                    {/* Right: Timer */}
                    <div className="bg-slate-800 rounded-lg flex items-center justify-center group-hover:bg-slate-700 transition-colors duration-300">
                      <div className="text-center">
                        <p className="text-white text-xs font-bold group-hover:text-yellow-300 transition-colors">⏱ 08:45</p>
                      </div>
                    </div>

                    {/* Middle: 6 Days */}
                    <div className="bg-slate-800 rounded-lg flex items-center justify-center group-hover:bg-slate-700 transition-all duration-300">
                      <div className="text-center text-white/80 group-hover:text-white transition-colors">
                        <p className="text-lg font-bold">6D</p>
                      </div>
                    </div>

                    {/* Middle: 4 Nights */}
                    <div className="bg-slate-800 rounded-lg flex items-center justify-center group-hover:bg-slate-700 transition-all duration-300">
                      <div className="text-center text-white/80 group-hover:text-white transition-colors">
                        <p className="text-lg font-bold">4N</p>
                      </div>
                    </div>

                    {/* Right: Tour Code */}
                    <div className="bg-slate-800 rounded-lg flex items-center justify-center">
                      <p className="text-white/40 text-xs">TW-2202</p>
                    </div>

                    {/* Bottom: Price Large (span 2x2) */}
                    <div className="col-span-2 row-span-2 bg-white rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:scale-[1.02]">
                      <div className="text-center">
                        <p className="text-gray-400 text-sm line-through opacity-0 group-hover:opacity-100 transition-opacity duration-500">฿125,000</p>
                        <p className="text-slate-900 text-2xl font-black group-hover:text-3xl transition-all duration-300">฿89,900</p>
                        <p className="text-gray-600 text-xs group-hover:text-red-500 group-hover:font-bold transition-all">/ท่าน</p>
                      </div>
                    </div>

                    {/* Bottom-right: Save % */}
                    <div className="row-span-2 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center group-hover:from-emerald-400 group-hover:to-green-500 transition-all duration-300">
                      <div className="text-center group-hover:scale-110 transition-transform duration-300">
                        <p className="text-white text-xs">ประหยัด</p>
                        <p className="text-white text-xl font-black group-hover:animate-bounce">28%</p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* Tour Card 23 - Amazon Style Product Card */}
              <div className="group cursor-pointer">
                <div className="relative aspect-[5/6] overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 bg-white border border-gray-200">

                  {/* Tour Code */}
                  <div className="absolute top-2 right-2 z-20">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white px-3 py-1 rounded-md shadow-md">
                      <p className="text-sm font-semibold tracking-wide">TW-2303</p>
                    </div>
                  </div>

                  {/* Image Carousel Container */}
                  <div className="relative h-[45%] overflow-hidden">
                    {/* Carousel Images */}
                    <div className="carousel-container relative w-full h-full">
                      <video
                        src="/images/countries/japan-6.mov"
                        className="carousel-item absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                      <img
                        src="/images/countries/japan-1-1.jpg"
                        alt="Japan 1"
                        className="carousel-item absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0"
                      />
                      <img
                        src="/images/countries/japan-1-2.jpg"
                        alt="Japan 2"
                        className="carousel-item absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0"
                      />
                      <img
                        src="/images/countries/japan-1-3.jpg"
                        alt="Japan 3"
                        className="carousel-item absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0"
                      />
                      <img
                        src="/images/countries/japan-1-4.jpg"
                        alt="Japan 4"
                        className="carousel-item absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0"
                      />
                    </div>

                    {/* Amazon-style Deal Badge */}
                    <div className="absolute top-2 left-2 z-10">
                      <div className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold animate-pulse">
                        โปรโมชั่นจำกัดเวลา
                      </div>
                    </div>

                    {/* Image Indicators */}
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                      {[0, 1, 2, 3, 4].map((index) => (
                        <div
                          key={index}
                          className={`carousel-indicator w-2 h-2 rounded-full transition-all duration-300 ${
                            index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Product Info Section */}
                  <div className="p-3 h-[55%] flex flex-col justify-between">

                    {/* Airline Information */}
                    <div className="flex items-center gap-1 mb-2 text-xs text-gray-600">
                      <svg className="w-3 h-3 transform rotate-45" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                      </svg>
                      <span className="font-medium">การบินไทย</span>
                      <span className="text-gray-400">•</span>
                      <span>บินตรง</span>
                      <span className="text-gray-400">•</span>
                      <span>TG676/677</span>
                    </div>

                    {/* Product Title */}
                    <h3 className="text-sm font-normal text-gray-900 line-clamp-3 mb-2 leading-snug">
                      ทัวร์ญี่ปุ่น โตเกียว-โอซาก้า-เกียวโต 7 วัน 5 คืน ครบเครื่อง ไม่มีวันอิสระ พักโรงแรม 4-5 ดาว รวมออนเซ็น USJ Disneyland
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400 text-sm">
                        ★★★★☆
                      </div>
                      <span className="text-sm text-blue-600 hover:underline cursor-pointer ml-1">4.5</span>
                      <span className="text-sm text-gray-500 ml-1">(221)</span>
                    </div>

                    {/* Price Section */}
                    <div className="mb-3">
                      {/* Current Price */}
                      <div className="flex items-baseline gap-1 mb-1">
                        <span className="text-lg font-normal text-gray-900">฿</span>
                        <span className="text-xl font-normal text-gray-900">89,900</span>
                      </div>

                      {/* Original Price */}
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-500">ราคาเริ่มต้น:</span>
                        <span className="text-gray-500 line-through">฿139,900</span>
                      </div>

                      {/* Coupon */}
                      <div className="mt-1">
                        <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-medium">ประหยัดเงินไป ฿50,000</span>
                        <span className="text-xs text-gray-600 ml-1">พิเศษสำหรับคุณ</span>
                      </div>
                    </div>

                    {/* Promotion Button */}
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 hover:scale-105 hover:shadow-lg animate-bounce-slow group">
                      <svg className="w-4 h-4 group-hover:animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span className="group-hover:animate-pulse">คลิกเพื่อดูโปรโมชั่นเฉพาะคุณ</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Tour Card 24 - Modified Amazon Style (Different Layout) */}
              <div className="group cursor-pointer">
                <div className="relative aspect-[5/6] overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 bg-white border border-gray-200">

                  {/* Tour Code */}
                  <div className="absolute top-0 left-0 z-20">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white px-4 py-1.5 rounded-br-xl shadow-md">
                      <p className="text-base font-semibold tracking-wide">TW-2404</p>
                    </div>
                  </div>

                  {/* Image Carousel Container - Larger */}
                  <div className="relative h-[55%] overflow-hidden bg-gray-100">
                    {/* Carousel Images */}
                    <div className="carousel-container-24 relative w-full h-full">
                      <video
                        src="/images/countries/japan-6.mov"
                        className="carousel-item-24 absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                      <img
                        src="/images/countries/japan-1-1.jpg"
                        alt="Japan 1"
                        className="carousel-item-24 absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0"
                      />
                      <img
                        src="/images/countries/japan-1-2.jpg"
                        alt="Japan 2"
                        className="carousel-item-24 absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0"
                      />
                      <img
                        src="/images/countries/japan-1-3.jpg"
                        alt="Japan 3"
                        className="carousel-item-24 absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0"
                      />
                      <img
                        src="/images/countries/japan-1-4.jpg"
                        alt="Japan 4"
                        className="carousel-item-24 absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0"
                      />
                    </div>

                    {/* Thumbnail Navigation - Right Side */}
                    <div className="absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-l from-black/80 via-black/50 to-transparent flex items-center justify-center">
                      <div className="flex flex-col space-y-2">
                        {/* Video Thumbnail */}
                        <div className="carousel-indicator-24 w-12 h-8 rounded border-2 transition-all duration-300 cursor-pointer overflow-hidden border-white/70 shadow-lg relative">
                          <video
                            src="/images/countries/japan-6.mov"
                            className="w-full h-full object-cover"
                            muted
                            playsInline
                          />
                          {/* Video Overlay Icon */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-3 h-3 bg-black/50 rounded-full flex items-center justify-center">
                              <svg className="w-2 h-2 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                              </svg>
                            </div>
                          </div>
                        </div>

                        {/* Image Thumbnails */}
                        {[
                          "/images/countries/japan-1-1.jpg",
                          "/images/countries/japan-1-2.jpg",
                          "/images/countries/japan-1-3.jpg",
                          "/images/countries/japan-1-4.jpg"
                        ].map((src, index) => (
                          <div
                            key={index + 1}
                            className="carousel-indicator-24 w-12 h-8 rounded border-2 transition-all duration-300 cursor-pointer overflow-hidden border-white/70 shadow-lg"
                          >
                            <img
                              src={src}
                              alt={`Japan ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Product Info Section - Compact */}
                  <div className="p-4 h-[45%] flex flex-col justify-between">

                    {/* Product Title - Larger */}
                    <h3 className="text-base font-semibold text-gray-900 line-clamp-2 mb-3 leading-tight">
                      ทัวร์ญี่ปุ่น โตเกียว-โอซาก้า-เกียวโต 7 วัน 5 คืน ครบเครื่อง ไม่มีวันอิสระ พักโรงแรม 4-5 ดาว
                    </h3>

                    {/* Features Row */}
                    <div className="flex items-center gap-3 mb-3 text-xs">
                      <div className="flex items-center gap-1 text-gray-600">
                        <svg className="w-3 h-3 transform rotate-45" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                        </svg>
                        <span className="font-medium">การบินไทย บินตรง</span>
                      </div>
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      <div className="flex text-yellow-400 text-sm">
                        ★★★★☆
                      </div>
                      <span className="text-sm text-blue-600 hover:underline cursor-pointer">4.5</span>
                      <span className="text-sm text-gray-500">(221 รีวิว)</span>
                    </div>

                    {/* Price Section - Horizontal Layout */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        {/* Current Price */}
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-bold text-red-600">฿89,900</span>
                          <span className="text-sm text-gray-500">ต่อท่าน</span>
                        </div>

                        {/* Savings Badge */}
                        <div className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold animate-pulse">
                          ประหยัด 36%
                        </div>
                      </div>

                      {/* Original Price & Special Offer */}
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500">ราคาปกติ:</span>
                          <span className="text-gray-500 line-through">฿139,900</span>
                        </div>
                        <div className="text-green-600 font-medium text-xs">
                          🎁 ของแถมมูลค่า ฿15,000
                        </div>
                      </div>
                    </div>

                    {/* Action Button - Different Style */}
                    <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-4 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 hover:scale-102 hover:shadow-xl animate-gentle-glow group">
                      <svg className="w-4 h-4 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="group-hover:animate-pulse">ดูรายละเอียดโปรโมชั่น</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Tour Card 25 - Full Image Style with Beautiful Details */}
              <div className="group cursor-pointer">
                <div className="relative aspect-[5/6] overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300">

                  {/* Full Background Carousel */}
                  <div className="absolute inset-0">
                    {/* Carousel Images */}
                    <div className="carousel-container-25 relative w-full h-full">
                      <video
                        src="/images/countries/japan-6.mov"
                        className="carousel-item-25 absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                      <img
                        src="/images/countries/japan-1-1.jpg"
                        alt="Japan 1"
                        className="carousel-item-25 absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0"
                      />
                      <img
                        src="/images/countries/japan-1-2.jpg"
                        alt="Japan 2"
                        className="carousel-item-25 absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0"
                      />
                      <img
                        src="/images/countries/japan-1-3.jpg"
                        alt="Japan 3"
                        className="carousel-item-25 absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0"
                      />
                      <img
                        src="/images/countries/japan-1-4.jpg"
                        alt="Japan 4"
                        className="carousel-item-25 absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0"
                      />
                    </div>

                    {/* Full Card Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/90"></div>
                  </div>

                  {/* Tour Code - Top Left */}
                  <div className="absolute top-0 left-0 z-20">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white px-4 py-1.5 rounded-br-xl shadow-md">
                      <p className="text-base font-semibold tracking-wide">TW-2505</p>
                    </div>
                  </div>

                  {/* Flash Sale Badge - Top Right */}
                  <div className="absolute top-4 right-4 z-20">
                    <div className="bg-red-600 text-white px-3 py-1 rounded text-xs font-bold animate-pulse">
                      โปรไฟไหม้
                    </div>
                  </div>

                  {/* Main Content - Bottom (Minimal) */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">

                    {/* Title - Compact */}
                    <h3 className="text-lg font-bold mb-2 leading-tight drop-shadow-lg">
                      ทัวร์ญี่ปุ่น โตเกียว-โอซาก้า-เกียวโต 7 วัน 5 คืน
                    </h3>

                    {/* Essential Info - One Line */}
                    <div className="flex items-center gap-3 mb-3 text-sm">
                      <div className="flex items-center gap-1">
                        <svg className="w-3 h-3 transform rotate-45" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                        </svg>
                        <span>การบินไทย</span>
                      </div>
                      <div className="w-1 h-1 bg-white/50 rounded-full"></div>
                      <div className="flex text-yellow-400 text-sm">★★★★☆</div>
                      <span className="text-sm">4.5 (221)</span>
                    </div>

                    {/* Price - Compact */}
                    <div className="bg-blue-600/80 backdrop-blur-sm rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold">฿89,900</span>
                            <span className="text-sm line-through opacity-70">฿139,900</span>
                          </div>
                          <p className="text-xs opacity-90">ประหยัด ฿50,000</p>
                        </div>
                        <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-bold text-sm hover:scale-105 transition-all">
                          ดูโปรโมชั่น
                        </button>
                      </div>
                    </div>

                  </div>

                  {/* Thumbnail Indicators - Bottom Center */}
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                    {[0, 1, 2, 3, 4].map((index) => (
                      <div
                        key={index}
                        className={`carousel-indicator-25 w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentImageIndex ? 'bg-white scale-125' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>

                </div>
              </div>

              {/* Tour Card 26 - Mercedes-Benz Style */}
              <div className="group cursor-pointer">
                <div className="relative h-[800px] overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 bg-white">

                  {/* Top Bar with Special Offer Badge */}
                  <div className="absolute top-0 left-0 right-0 z-20 p-3">
                    <div className="flex justify-between items-start">
                      <div className="bg-red-600 text-white px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        Special Offer
                      </div>
                      <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all">
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Image Container */}
                  <div className="relative h-[250px] mt-16 overflow-hidden">
                    <div className="carousel-container-26 relative w-full h-full">
                      <video
                        src="/images/countries/japan-6.mov"
                        className="carousel-item-26 absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                      <img
                        src="/images/countries/japan-1-1.jpg"
                        alt="Japan 1"
                        className="carousel-item-26 absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0"
                      />
                      <img
                        src="/images/countries/japan-1-2.jpg"
                        alt="Japan 2"
                        className="carousel-item-26 absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0"
                      />
                      <img
                        src="/images/countries/japan-1-3.jpg"
                        alt="Japan 3"
                        className="carousel-item-26 absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0"
                      />
                      <img
                        src="/images/countries/japan-1-4.jpg"
                        alt="Japan 4"
                        className="carousel-item-26 absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0"
                      />
                    </div>

                    {/* Image Indicators */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1">
                      {[0, 1, 2, 3, 4].map((index) => (
                        <div
                          key={index}
                          className={`carousel-indicator-26 w-2 h-2 rounded-full transition-all duration-300 ${
                            index === currentImageIndex ? 'bg-white shadow-lg' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Content Below Image */}
                  <div className="p-4 space-y-3">

                    {/* Tour Code and Title */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        สัมผัสญี่ปุ่นสุดพิเศษ โตเกียว โอซาก้า เกียวโต 7 วัน 5 คืน
                      </h3>
                      <div className="text-xs text-gray-500 font-medium">TW-2606</div>
                    </div>

                    {/* Tour Characteristics */}
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 transform rotate-45" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                        </svg>
                        <span>การบินไทย</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"/>
                        </svg>
                        <span>7 วัน 5 คืน</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        <span>โรงแรม 5 ดาว</span>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-4 h-4 bg-blue-100 rounded flex items-center justify-center">
                          <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                          </svg>
                        </div>
                        <span className="text-gray-700">USJ + Disneyland ครบเครื่อง</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-4 h-4 bg-blue-100 rounded flex items-center justify-center">
                          <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                          </svg>
                        </div>
                        <span className="text-gray-700">โรงแรม 4-5 ดาว รวมออนเซ็น</span>
                      </div>
                    </div>

                    {/* Additional Details */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-4 h-4 bg-green-100 rounded flex items-center justify-center">
                          <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                          </svg>
                        </div>
                        <span className="text-gray-700">ไม่มีวันอิสระ ครบทุกมื้อ</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-4 h-4 bg-green-100 rounded flex items-center justify-center">
                          <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                          </svg>
                        </div>
                        <span className="text-gray-700">รถโค้ชปรับอากาศ + WiFi</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-4 h-4 bg-green-100 rounded flex items-center justify-center">
                          <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                          </svg>
                        </div>
                        <span className="text-gray-700">ไกด์ไทยพูดไทย</span>
                      </div>
                    </div>

                    {/* Rating & Reviews */}
                    <div className="bg-blue-50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="flex text-yellow-400">
                            ★★★★☆
                          </div>
                          <span className="text-sm font-bold text-gray-900">4.5</span>
                          <span className="text-xs text-gray-600">(221 รีวิว)</span>
                        </div>
                        <div className="text-xs text-blue-600 font-medium">98% แนะนำ</div>
                      </div>
                      <p className="text-xs text-gray-600">"ครบเครื่อง คุ้มค่า ไกด์เก่ง บริการดี"</p>
                    </div>

                    {/* Pricing Section */}
                    <div className="space-y-3">
                      {/* Installment Payment */}
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-gray-600 mb-1">ผ่อนชำระรายเดือน</p>
                            <div className="flex items-center gap-2">
                              <span className="text-xl font-bold text-blue-600">฿7,990</span>
                              <span className="text-blue-600 text-xs cursor-pointer hover:bg-blue-50 px-1 py-0.5 rounded" style={{marginTop: '1px'}}>ⓘ</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">6 เดือน 0% ดอกเบี้ย</p>
                          </div>
                        </div>
                      </div>

                      {/* Full Price */}
                      <div className="border-t pt-3">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="text-xs text-gray-600">ราคาเต็ม/ท่าน</p>
                            <div className="flex items-center gap-2">
                              <span className="text-2xl font-bold text-gray-900">฿89,900</span>
                              <span className="text-gray-600 text-sm cursor-pointer hover:bg-gray-50 px-1 py-0.5 rounded" style={{marginTop: '2px'}}>ⓘ</span>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-gray-500 line-through">฿139,900</span>
                              <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs font-bold">ประหยัด 36%</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 font-medium">🎁 กระเป๋าเดินทาง + ประกันการเดินทาง</p>
                      </div>
                    </div>

                    {/* Availability & Departure */}
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <svg className="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"/>
                        </svg>
                        <span className="text-sm font-bold text-amber-800">วันเดินทางใกล้เต็ม</span>
                      </div>
                      <p className="text-xs text-amber-700">เหลือที่นั่งเพียง 6 ที่ สำหรับ 25 ธ.ค. - 31 ธ.ค.</p>
                      <div className="mt-2 bg-amber-200 rounded-full h-2">
                        <div className="bg-amber-600 h-2 rounded-full" style={{width: '20%'}}></div>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 hover:scale-[1.02]">
                      Explore & Buy
                    </button>

                  </div>

                </div>
              </div>

              {/* Card 27 - Modern Split Design */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] self-start transform scale-100 md:scale-110">
                <div className="flex flex-col md:flex-row min-h-[320px]">

                  {/* Left Side - Image */}
                  <div className="relative w-full h-48 md:w-[45%] md:h-auto">
                    <div className="carousel-container-27 absolute inset-0 w-full h-full">
                      <video
                        src="/images/countries/japan-6.mov"
                        className="carousel-item-27 absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                      <img
                        src="/images/countries/japan-1-1.jpg"
                        alt="Japan 1"
                        className="carousel-item-27 absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0"
                      />
                      <img
                        src="/images/countries/japan-1-2.jpg"
                        alt="Japan 2"
                        className="carousel-item-27 absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0"
                      />
                      <img
                        src="/images/countries/japan-1-3.jpg"
                        alt="Japan 3"
                        className="carousel-item-27 absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0"
                      />
                      <img
                        src="/images/countries/japan-1-4.jpg"
                        alt="Japan 4"
                        className="carousel-item-27 absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0"
                      />
                    </div>

                    {/* Image Indicators */}
                    <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
                      {[0, 1, 2, 3, 4].map((index) => (
                        <div
                          key={index}
                          className={`carousel-indicator-27 w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                            index === currentImageIndex ? 'bg-white shadow-lg' : 'bg-white/60'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Tour Code Badge */}
                    <div className="absolute top-0 left-0 bg-gradient-to-br from-blue-600 to-blue-700 text-white px-4 py-1.5 rounded-br-xl shadow-md">
                      <p className="text-base font-semibold tracking-wide">TW-2505</p>
                    </div>
                  </div>

                  {/* Right Side - Content */}
                  <div className="w-full md:w-[55%] p-4 md:p-6 flex flex-col justify-between">

                    {/* Header */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                        สัมผัสญี่ปุ่นสุดพิเศษ โตเกียว โอซาก้า เกียวโต 7 วัน 5 คืน
                      </h3>

                      {/* Quick Info */}
                      <div className="space-y-2 text-xs text-gray-600 mb-4">
                        <div className="flex items-center gap-1">
                          <svg className="w-3 h-3 transform rotate-45" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                          </svg>
                          <span>การบินไทย</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 4.5l1.42 4.37h4.6l-3.72 2.7 1.42 4.37L12 13.24l-3.72 2.7 1.42-4.37L6 8.87h4.6L12 4.5z"/>
                          </svg>
                          <span>โรงแรม 5 ดาว</span>
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex text-yellow-400 text-sm">
                          <span>★</span>
                          <span>★</span>
                          <span>★</span>
                          <span>★</span>
                          <span className="relative">
                            <span className="text-gray-300">★</span>
                            <span className="absolute inset-0 overflow-hidden w-1/2">★</span>
                          </span>
                        </div>
                        <span className="text-sm font-bold text-gray-900">4.5</span>
                        <span className="text-xs text-gray-500">(221 รีวิว)</span>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="space-y-4">
                      <div className="bg-blue-50 rounded-lg p-4">
                        <div className="text-xs text-blue-600 font-medium mb-1">ผ่อนชำระรายเดือน</div>
                        <div className="text-2xl font-bold text-blue-600">฿7,990</div>
                        <div className="text-xs text-gray-600">6 เดือน 0% ดอกเบี้ย</div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <div className="text-lg font-bold text-gray-900">฿89,900</div>
                            <div className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold">ประหยัด 36%</div>
                          </div>
                          <div className="text-sm text-gray-500 line-through">฿139,900</div>
                        </div>
                      </div>

                      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 hover:scale-[1.02]">
                        คลิกดูโปรโมชั่น
                      </button>
                    </div>

                  </div>
                </div>
              </div>

              {/* Card 28 - Unique Full Banner Style */}
              <div className="group cursor-pointer">
                <div className="relative aspect-[5/6] overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300">

                  {/* Full Background Carousel */}
                  <div className="absolute inset-0">
                    <div className="carousel-container-28 relative w-full h-full">
                      <video
                        src="/images/countries/japan-6.mov"
                        className="carousel-item-28 absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                      <img
                        src="/images/countries/japan-1-1.jpg"
                        alt="Japan 1"
                        className="carousel-item-28 absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0"
                      />
                      <img
                        src="/images/countries/japan-1-2.jpg"
                        alt="Japan 2"
                        className="carousel-item-28 absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0"
                      />
                      <img
                        src="/images/countries/japan-1-3.jpg"
                        alt="Japan 3"
                        className="carousel-item-28 absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0"
                      />
                      <img
                        src="/images/countries/japan-1-4.jpg"
                        alt="Japan 4"
                        className="carousel-item-28 absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0"
                      />
                    </div>

                    {/* Gradient Overlay like Card 1 */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  </div>

                  {/* Tour Code - Top Right (Different Style) */}
                  <div className="absolute top-0 right-0 z-20">
                    <div className="bg-gradient-to-bl from-red-600 to-red-700 text-white px-4 py-1.5 rounded-bl-xl shadow-md">
                      <p className="text-base font-semibold tracking-wide">TW61528</p>
                    </div>
                  </div>


                  {/* Main Content - Bottom Left Focus */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">

                    {/* Flash Sale Badge above title */}
                    <div className="mb-2">
                      <div className="bg-red-600 text-white px-3 py-1 rounded text-xs font-bold inline-block shadow-lg animate-bounce-x">
                        Flash Sale
                      </div>
                    </div>

                    {/* Title with Rating */}
                    <h3 className="text-xl font-bold mb-1 leading-tight drop-shadow-lg">
                      ทัวร์ญี่ปุ่น โอซาก้า โตเกียว 7 วัน 5 คืน
                    </h3>

                    {/* Rating - Right after title */}
                    <div className="flex items-center gap-2 mb-3 text-sm">
                      <div className="flex text-yellow-400 text-sm">★★★★★</div>
                      <span className="text-sm">4.8 (124 รีวิว)</span>
                    </div>

                    {/* Highlight Text - 2 lines */}
                    <div className="mb-3 text-sm leading-relaxed">
                      <p className="drop-shadow-lg">สัมผัสความมหัศจรรย์ของญี่ปุ่น</p>
                      <p className="drop-shadow-lg">พร้อมประสบการณ์สุดพิเศษที่ไม่ลืม</p>
                    </div>

                    {/* Price - Compact with Red Theme */}
                    <div className="gradient-background-red backdrop-blur-sm rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold">฿89,900</span>
                            <span className="text-sm line-through opacity-70">฿119,900</span>
                          </div>
                          <p className="text-xs opacity-90">ประหยัด ฿30,000 • ผ่อน ฿14,983/เดือน</p>
                        </div>
                        <button className="bg-white text-red-600 px-2 py-2 rounded-lg font-bold text-sm hover:scale-105 transition-all flex items-center gap-2">
                          <span>โปรโมชั่นพิเศษ</span>
                          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1 animate-arrow-bounce" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6-6 6-1.41-1.41z"/>
                          </svg>
                        </button>
                      </div>
                    </div>

                  </div>

                  {/* Image Indicators - Right Side */}
                  <div className="absolute top-1/2 right-4 transform -translate-y-1/2 flex flex-col space-y-2 z-20">
                    {[0, 1, 2, 3, 4].map((index) => (
                      <div
                        key={index}
                        className={`carousel-indicator-28 w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentImageIndex ? 'bg-red-500 shadow-lg' : 'bg-white/60'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Card 29 - Enhanced with Travel Months and Airline */}
              <div className="group cursor-pointer">
                <div className="relative aspect-[5/6] overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300">

                  {/* Full Background Carousel */}
                  <div className="absolute inset-0">
                    <div className="carousel-container-29 relative w-full h-full">
                      <video
                        src="/images/countries/japan-6.mov"
                        className="carousel-item-29 absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                      <img
                        src="/images/countries/japan-1-1.jpg"
                        alt="Japan 1"
                        className="carousel-item-29 absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0"
                      />
                      <img
                        src="/images/countries/japan-1-2.jpg"
                        alt="Japan 2"
                        className="carousel-item-29 absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0"
                      />
                      <img
                        src="/images/countries/japan-1-3.jpg"
                        alt="Japan 3"
                        className="carousel-item-29 absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0"
                      />
                      <img
                        src="/images/countries/japan-1-4.jpg"
                        alt="Japan 4"
                        className="carousel-item-29 absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0"
                      />
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  </div>

                  {/* Combined Info Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-md px-3 py-1.5">
                      <div className="flex items-center gap-3 text-xs font-semibold">

                        {/* Airline */}
                        <div className="flex items-center gap-1.5 text-gray-800">
                          <svg className="w-3 h-3 transform rotate-45 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                          </svg>
                          <span>Thai Airways (TG)</span>
                        </div>

                        {/* Separator */}
                        <div className="w-px h-3 bg-gray-300"></div>

                        {/* Travel Months with Year */}
                        <div className="text-blue-600">
                          <span>มี.ค. - พ.ค. 2568</span>
                        </div>

                      </div>
                    </div>
                  </div>

                  {/* Tour Code - Separate Top Right */}
                  <div className="absolute top-0 right-0 z-20">
                    <div className="bg-gradient-to-bl from-red-600 to-red-700 text-white px-3 py-1.5 rounded-bl-xl shadow-md">
                      <p className="text-xs font-semibold tracking-wide">TW61529</p>
                    </div>
                  </div>

                  {/* Main Content - Bottom Focus */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">

                    {/* Flash Sale Badge */}
                    <div className="mb-2">
                      <div className="bg-red-600 text-white px-3 py-1 rounded text-xs font-bold inline-block shadow-lg animate-bounce-x">
                        Flash Sale
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold mb-1 leading-tight drop-shadow-lg">
                      ทัวร์ญี่ปุ่น โอซาก้า โตเกียว 7 วัน 5 คืน
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3 text-sm">
                      <div className="flex text-yellow-400 text-sm">★★★★★</div>
                      <span className="text-sm">4.8 (124 รีวิว)</span>
                    </div>

                    {/* Highlight Text */}
                    <div className="mb-3 text-sm leading-relaxed">
                      <p className="drop-shadow-lg">สัมผัสความมหัศจรรย์ของญี่ปุ่น</p>
                      <p className="drop-shadow-lg">พร้อมประสบการณ์สุดพิเศษที่ไม่ลืม</p>
                    </div>

                    {/* Price Section */}
                    <div className="gradient-background-red backdrop-blur-sm rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold">฿89,900</span>
                            <span className="text-sm line-through opacity-70">฿119,900</span>
                          </div>
                          <p className="text-xs opacity-90">ประหยัด ฿30,000 • ผ่อน ฿14,983/เดือน</p>
                        </div>
                        <button className="bg-white text-red-600 px-2 py-2 rounded-lg font-bold text-sm hover:scale-105 transition-all flex items-center gap-2">
                          <span>โปรโมชั่นพิเศษ</span>
                          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1 animate-arrow-bounce" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6-6 6-1.41-1.41z"/>
                          </svg>
                        </button>
                      </div>
                    </div>

                  </div>

                  {/* Image Indicators - Right Side */}
                  <div className="absolute top-1/2 right-4 transform -translate-y-1/2 flex flex-col space-y-2 z-20">
                    {[0, 1, 2, 3, 4].map((index) => (
                      <div
                        key={index}
                        className={`carousel-indicator-29 w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentImageIndex ? 'bg-red-500 shadow-lg' : 'bg-white/60'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
    </>
  )
}

export default TourSearch56