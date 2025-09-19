'use client'

export const dynamic = 'force-dynamic'

import React, { useState, useEffect } from 'react'
import {
  Search, Filter, X, MapPin, Calendar, Star, TrendingUp,
  ChevronDown, ArrowUp, MessageCircle, Phone, Sparkles,
  Users, Clock, Gift, Zap, Globe, Heart
} from 'lucide-react'

const TourSearch58 = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [globalTime, setGlobalTime] = useState(Date.now())

  // Base countdown times (in seconds from now)
  const baseCountdowns = {
    countdown1: { totalSeconds: 2 * 3600 + 35 * 60 + 41 },
    countdown2: { totalSeconds: 1 * 3600 + 47 * 60 + 23 },
    countdown5: { totalSeconds: 3 * 3600 + 12 * 60 + 18 },
    countdown7: { totalSeconds: 4 * 3600 + 25 * 60 + 33 },
    countdown9: { totalSeconds: 2 * 3600 + 8 * 60 + 47 },
    countdown11: { totalSeconds: 1 * 3600 + 55 * 60 + 29 }
  }

  // Calculate current countdowns based on global time
  const getCountdown = (baseSeconds) => {
    const elapsed = Math.floor((Date.now() - globalTime) / 1000)
    const remaining = Math.max(0, baseSeconds - elapsed)
    return {
      hours: Math.floor(remaining / 3600),
      minutes: Math.floor((remaining % 3600) / 60),
      seconds: remaining % 60
    }
  }

  const countdown1 = getCountdown(baseCountdowns.countdown1.totalSeconds)
  const countdown2 = getCountdown(baseCountdowns.countdown2.totalSeconds)
  const countdown5 = getCountdown(baseCountdowns.countdown5.totalSeconds)
  const countdown7 = getCountdown(baseCountdowns.countdown7.totalSeconds)
  const countdown9 = getCountdown(baseCountdowns.countdown9.totalSeconds)
  const countdown11 = getCountdown(baseCountdowns.countdown11.totalSeconds)

  // Single global timer for all countdowns and carousel
  useEffect(() => {
    const interval = setInterval(() => {
      // Update global time for countdowns
      setGlobalTime(Date.now())

      // Update carousel every 5 seconds
      if (Math.floor(Date.now() / 1000) % 5 === 0) {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % 5)
      }
    }, 1000) // Update every second

    return () => clearInterval(interval)
  }, [])


  // Update carousel indicators and visibility
  useEffect(() => {
    // Handle Card 1 carousel
    const carouselItems1 = document.querySelectorAll('.carousel-item-1')

    carouselItems1.forEach((item, index) => {
      if (index === currentImageIndex) {
        item.classList.remove('opacity-0')
        item.classList.add('opacity-100')
      } else {
        item.classList.remove('opacity-100')
        item.classList.add('opacity-0')
      }
    })

    // Handle Card 2 carousel
    const carouselItems2 = document.querySelectorAll('.carousel-item-2')

    carouselItems2.forEach((item, index) => {
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
    <div className="min-h-screen bg-gray-50">
      <style jsx>{`
        .flash-sale-card {
          animation: gradient-border-flash 6s ease infinite;
        }

        @keyframes gradient-border-flash {
          0% {
            box-shadow: 0 0 0 3px #dc2626;
          }
          25% {
            box-shadow: 0 0 0 3px #b91c1c;
          }
          50% {
            box-shadow: 0 0 0 3px #ef4444;
          }
          75% {
            box-shadow: 0 0 0 3px #f87171;
          }
          100% {
            box-shadow: 0 0 0 3px #dc2626;
          }
        }

        @keyframes gradient-animation-flash {
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

        @keyframes countdown-breathe {
          0%, 100% {
            transform: scale(1);
            opacity: 0.9;
          }
          50% {
            transform: scale(1.02);
            opacity: 1;
          }
        }

        .countdown-simple {
          background: rgba(255, 255, 255, 0.95);
          color: #dc2626;
          border: 1px solid rgba(220, 38, 38, 0.2);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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
        .gradient-background-blue {
          background: linear-gradient(300deg, #1d4ed8, #1e40af, #3b82f6, #60a5fa);
          background-size: 180% 180%;
          animation: gradient-animation-blue 6s ease infinite;
        }
        @keyframes gradient-animation-blue {
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
      `}</style>
      <main className="container mx-auto px-4 py-4">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              ค้นหาทัวร์ที่ใช่สำหรับคุณ
            </h1>
            <p className="text-gray-600 mb-4">เลือกจากทัวร์ยอดนิยมที่คัดสรรมาเป็นพิเศษ</p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Card 1 - ลดพิเศษ with Flight Info and Tour Code */}
            <div className="group cursor-pointer">
              <div className="relative aspect-[5/6] overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flash-sale-card">

                {/* Full Background Carousel */}
                <div className="absolute inset-0">
                  <img
                    src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop&auto=format&q=100"
                    alt="Japan"
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                </div>

                {/* Elegant Flight Info - Red Theme */}
                <div className="absolute top-3 left-3 z-20">
                  <div className="bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-md rounded-xl shadow-xl overflow-hidden">
                    <div className="flex items-center">

                      {/* Airline Section */}
                      <div className="flex items-center gap-2 px-3 py-2 border-r border-red-100">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-rose-600 rounded-full blur-md opacity-70"></div>
                          <div className="relative bg-gradient-to-br from-red-500 to-rose-600 p-1.5 rounded-full">
                            <svg className="w-3 h-3 transform rotate-45 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                            </svg>
                          </div>
                        </div>
                        <div>
                          <p className="text-[9px] text-gray-500 font-medium uppercase tracking-wider">Thai Airways</p>
                          <p className="text-xs text-gray-900 -mt-0.5">
                            <span className="font-bold">บินตรง</span>
                            <span className="text-gray-600 font-normal"> | น้ำหนัก 30 กก.</span>
                          </p>
                        </div>
                      </div>

                      {/* Date Section */}
                      <div className="px-3 py-2 bg-gradient-to-r from-red-50 to-rose-50">
                        <p className="text-[9px] text-blue-600 font-medium">ช่วงเดินทาง</p>
                        <p className="text-xs font-bold text-red-900 -mt-0.5">มี.ค. - พ.ค. 68</p>
                      </div>

                    </div>
                  </div>
                </div>

                {/* Tour Code - Separate Top Right */}
                <div className="absolute top-0 right-0 z-20">
                  <div className="bg-gradient-to-bl from-red-600 to-red-700 text-white px-3.5 py-2 rounded-bl-xl shadow-md">
                    <p className="text-xs font-semibold tracking-wide">TW61529</p>
                  </div>
                </div>

                {/* Main Content - Bottom Focus */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">

                  {/* ลดพิเศษ Badge */}
                  <div className="mb-2">
                    <div className="bg-red-600 text-white px-3 py-1 rounded text-xs font-bold inline-block shadow-lg animate-bounce">
                      เหลือ 3 สุดท้าย
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
                  <div className="mb-6 text-sm leading-relaxed">
                    <p className="drop-shadow-lg">สัมผัสความมหัศจรรย์ของญี่ปุ่น</p>
                    <p className="drop-shadow-lg">พร้อมประสบการณ์สุดพิเศษที่ไม่ลืม</p>
                  </div>

                  {/* Price Section */}
                  <div className="gradient-background-red backdrop-blur-sm rounded-lg p-3 relative">
                    {/* Countdown Timer - Clean Design */}
                    <div className="absolute -top-5 left-0 bg-white text-red-600 px-3 py-1.5 rounded-r-lg rounded-tl-md text-sm font-bold shadow-md flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{String(countdown1.hours).padStart(2, '0')}:{String(countdown1.minutes).padStart(2, '0')}:{String(countdown1.seconds).padStart(2, '0')}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold">฿89,900</span>
                          <span className="text-sm line-through opacity-70">฿119,900</span>
                        </div>
                        <p className="text-xs opacity-90">ประหยัด ฿30,000 • ผ่อน ฿14,983/เดือน</p>
                      </div>
                      <button className="bg-white text-red-600 px-2 py-2 rounded-lg font-bold text-sm hover:scale-105 transition-all flex items-center gap-2 group">
                        <span>โปรโมชั่นพิเศษ</span>
                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1 animate-arrow-bounce" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6-6 6-1.41-1.41z"/>
                        </svg>
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            </div>

            {/* Card 2 - ทัวร์พรีเมี่ยม with Flight Info and Tour Code */}
            <div className="group cursor-pointer">
              <div className="relative aspect-[5/6] overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300">

                {/* Single Background Image */}
                <div className="absolute inset-0">
                  <img
                    src="https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800&h=600&fit=crop&auto=format&q=100"
                    alt="Hokkaido"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    style={{
                      imageRendering: 'pixelated',
                      imageRendering: '-webkit-optimize-contrast',
                      imageRendering: '-moz-crisp-edges',
                      imageRendering: 'crisp-edges',
                      filter: 'contrast(1.3) saturate(1.2) brightness(1.05) blur(0px) sharpen(2px)',
                      transform: 'scale(1.002)',
                      WebkitBackfaceVisibility: 'hidden',
                      backfaceVisibility: 'hidden',
                      WebkitPerspective: 1000,
                      perspective: 1000,
                      willChange: 'transform'
                    }}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                </div>

                {/* Elegant Flight Info - Blue Theme */}
                <div className="absolute top-3 left-3 z-20">
                  <div className="bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-md rounded-xl shadow-xl overflow-hidden">
                    <div className="flex items-center">

                      {/* Airline Section */}
                      <div className="flex items-center gap-2 px-3 py-2 border-r border-blue-100">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full blur-md opacity-70"></div>
                          <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 p-1.5 rounded-full">
                            <svg className="w-3 h-3 transform rotate-45 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                            </svg>
                          </div>
                        </div>
                        <div>
                          <p className="text-[9px] text-gray-500 font-medium uppercase tracking-wider">Thai Airways</p>
                          <p className="text-xs text-gray-900 -mt-0.5">
                            <span className="font-bold">บินตรง</span>
                            <span className="text-gray-600 font-normal"> | น้ำหนัก 30 กก.</span>
                          </p>
                        </div>
                      </div>

                      {/* Date Section */}
                      <div className="px-3 py-2 bg-gradient-to-r from-blue-50 to-blue-50">
                        <p className="text-[9px] text-blue-600 font-medium">ช่วงเดินทาง</p>
                        <p className="text-xs font-bold text-blue-900 -mt-0.5">ก.ย. - พ.ย. 68</p>
                      </div>

                    </div>
                  </div>
                </div>

                {/* Tour Code - Separate Top Right */}
                <div className="absolute top-0 right-0 z-20">
                  <div className="bg-gradient-to-bl from-blue-600 to-blue-700 text-white px-3.5 py-2 rounded-bl-xl shadow-md">
                    <p className="text-xs font-semibold tracking-wide">TW62841</p>
                  </div>
                </div>

                {/* Main Content - Bottom Focus */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">

                  {/* Premium Badge */}
                  <div className="mb-2">
                    <div className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold inline-block shadow-lg">
                      ทัวร์พรีเมี่ยม
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-1 leading-tight drop-shadow-lg">
                    ทัวร์ญี่ปุ่น ฮอกไกโด 7 วัน 5 คืน
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3 text-sm">
                    <div className="flex text-yellow-400 text-sm">
                      <span>★★★</span>
                      <span style={{position: 'relative', display: 'inline-block'}}>
                        <span style={{color: '#d1d5db'}}>★</span>
                        <span style={{position: 'absolute', left: 0, top: 0, width: '50%', overflow: 'hidden', color: '#fbbf24'}}>★</span>
                      </span>
                      <span style={{color: '#d1d5db'}}>★</span>
                    </div>
                    <span className="text-sm">3.5 (89 รีวิว)</span>
                  </div>

                  {/* Highlight Text */}
                  <div className="mb-3 text-sm leading-relaxed">
                    <p className="drop-shadow-lg">สัมผัสความมหัศจรรย์ของฮอกไกโด</p>
                    <p className="drop-shadow-lg">พร้อมประสบการณ์สุดพิเศษที่ไม่ลืม</p>
                  </div>

                  {/* Price Section */}
                  <div className="gradient-background-blue backdrop-blur-sm rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold">฿78,900</span>
                          <span className="text-sm line-through opacity-70">฿98,900</span>
                        </div>
                        <p className="text-xs opacity-90">ประหยัด ฿20,000 • ผ่อน ฿13,150/เดือน</p>
                      </div>
                      <button className="bg-white text-blue-600 px-2 py-2 rounded-lg font-bold text-sm hover:scale-105 transition-all flex items-center gap-2 group">
                        <span>จองตอนนี้</span>
                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1 animate-arrow-bounce" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6-6 6-1.41-1.41z"/>
                        </svg>
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            </div>

            {/* Card 3 - Singapore ลดพิเศษ */}
            <div className="group cursor-pointer">
              <div className="relative aspect-[5/6] overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flash-sale-card">

                {/* Single Background Image */}
                <div className="absolute inset-0">
                  <img
                    src="https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&h=600&fit=crop&auto=format&q=100"
                    alt="Singapore"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    style={{
                      imageRendering: 'pixelated',
                      imageRendering: '-webkit-optimize-contrast',
                      imageRendering: '-moz-crisp-edges',
                      imageRendering: 'crisp-edges',
                      filter: 'contrast(1.3) saturate(1.2) brightness(1.05) blur(0px) sharpen(2px)',
                      transform: 'scale(1.002)',
                      WebkitBackfaceVisibility: 'hidden',
                      backfaceVisibility: 'hidden',
                      WebkitPerspective: 1000,
                      perspective: 1000,
                      willChange: 'transform'
                    }}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                </div>

                {/* Elegant Flight Info - Red Theme */}
                <div className="absolute top-3 left-3 z-20">
                  <div className="bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-md rounded-xl shadow-xl overflow-hidden">
                    <div className="flex items-center">

                      {/* Airline Section */}
                      <div className="flex items-center gap-2 px-3 py-2 border-r border-red-100">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-rose-600 rounded-full blur-md opacity-70"></div>
                          <div className="relative bg-gradient-to-br from-red-500 to-rose-600 p-1.5 rounded-full">
                            <svg className="w-3 h-3 transform rotate-45 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                            </svg>
                          </div>
                        </div>
                        <div>
                          <p className="text-[9px] text-gray-500 font-medium uppercase tracking-wider">Singapore Airlines</p>
                          <p className="text-xs text-gray-900 -mt-0.5">
                            <span className="font-bold">บินตรง</span>
                            <span className="text-gray-600 font-normal"> | บินเช้ากลับดึก</span>
                          </p>
                        </div>
                      </div>

                      {/* Date Section */}
                      <div className="px-3 py-2 bg-gradient-to-r from-red-50 to-rose-50">
                        <p className="text-[9px] text-blue-600 font-medium">ช่วงเดินทาง</p>
                        <p className="text-xs font-bold text-red-900 -mt-0.5">ธ.ค. - ก.พ. 68</p>
                      </div>

                    </div>
                  </div>
                </div>

                {/* Tour Code - Separate Top Right */}
                <div className="absolute top-0 right-0 z-20">
                  <div className="bg-gradient-to-bl from-red-600 to-red-700 text-white px-3.5 py-2 rounded-bl-xl shadow-md">
                    <p className="text-xs font-semibold tracking-wide">TW63254</p>
                  </div>
                </div>

                {/* Main Content - Bottom Focus */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">

                  {/* ลดพิเศษ Badge */}
                  <div className="mb-2">
                    <div className="bg-red-600 text-white px-3 py-1 rounded text-xs font-bold inline-block shadow-lg animate-bounce">
                      ดีลสุดคุ้ม
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-1 leading-tight drop-shadow-lg">
                    ทัวร์สิงคโปร์ 4 วัน 3 คืน
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3 text-sm">
                    <div className="flex text-yellow-400 text-sm">★★★★★</div>
                    <span className="text-sm">4.6 (156 รีวิว)</span>
                  </div>

                  {/* Highlight Text */}
                  <div className="mb-6 text-sm leading-relaxed">
                    <p className="drop-shadow-lg">สัมผัสเสน่ห์เมืองสิงคโปร์</p>
                    <p className="drop-shadow-lg">ช้อปปิ้งและสถานที่ท่องเที่ยวระดับโลก</p>
                  </div>

                  {/* Price Section */}
                  <div className="gradient-background-red backdrop-blur-sm rounded-lg p-3 relative">
                    {/* Countdown Timer - Clean Design */}
                    <div className="absolute -top-5 left-0 bg-white text-red-600 px-3 py-1.5 rounded-r-lg rounded-tl-md text-sm font-bold shadow-md flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{String(countdown2.hours).padStart(2, '0')}:{String(countdown2.minutes).padStart(2, '0')}:{String(countdown2.seconds).padStart(2, '0')}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold">฿32,900</span>
                          <span className="text-sm line-through opacity-70">฿45,900</span>
                        </div>
                        <p className="text-xs opacity-90">ประหยัด ฿13,000 • ผ่อน ฿5,483/เดือน</p>
                      </div>
                      <button className="bg-white text-red-600 px-2 py-2 rounded-lg font-bold text-sm hover:scale-105 transition-all flex items-center gap-2 group">
                        <span>โปรโมชั่นพิเศษ</span>
                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1 animate-arrow-bounce" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6-6 6-1.41-1.41z"/>
                        </svg>
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            </div>



            {/* Card 4 - Kazakhstan (Copy of Card 2) */}
            <div className="group cursor-pointer">
              <div className="relative aspect-[5/6] overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300">

                {/* Video Background Only */}
                <div className="absolute inset-0">
                  <img
                    src="https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&h=600&fit=crop&auto=format&q=100"
                    alt="Kazakhstan"
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                    fetchPriority="low"
                    decoding="async"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                </div>

                {/* Elegant Flight Info - Blue Theme */}
                <div className="absolute top-3 left-3 z-20">
                  <div className="bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-md rounded-xl shadow-xl overflow-hidden">
                    <div className="flex items-center">

                      {/* Airline Section */}
                      <div className="flex items-center gap-2 px-3 py-2 border-r border-blue-100">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full blur-md opacity-70"></div>
                          <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 p-1.5 rounded-full">
                            <svg className="w-3 h-3 transform rotate-45 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                            </svg>
                          </div>
                        </div>
                        <div>
                          <p className="text-[9px] text-gray-500 font-medium uppercase tracking-wider">Air Astana</p>
                          <p className="text-xs text-gray-900 -mt-0.5">
                            <span className="font-bold">บินตรง</span>
                            <span className="text-gray-600 font-normal"> | WiFi ฟรี+อาหาร</span>
                          </p>
                        </div>
                      </div>

                      {/* Date Section */}
                      <div className="px-3 py-2 bg-gradient-to-r from-blue-50 to-blue-50">
                        <p className="text-[9px] text-blue-600 font-medium">ช่วงเดินทาง</p>
                        <p className="text-xs font-bold text-blue-900 -mt-0.5">มี.ค. - พ.ค. 68</p>
                      </div>

                    </div>
                  </div>
                </div>

                {/* Tour Code - Separate Top Right */}
                <div className="absolute top-0 right-0 z-20">
                  <div className="bg-gradient-to-bl from-blue-600 to-blue-700 text-white px-3.5 py-2 rounded-bl-xl shadow-md">
                    <p className="text-xs font-semibold tracking-wide">TW84172</p>
                  </div>
                </div>

                {/* Main Content - Bottom Focus */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">

                  {/* Premium Badge */}
                  <div className="mb-2">
                    <div className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold inline-block shadow-lg">
                      ทัวร์ผจญภัย
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-1 leading-tight drop-shadow-lg">
                    ทัวร์คาซัคสถาน อัลมาตี 8 วัน 6 คืน
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3 text-sm">
                    <div className="flex text-yellow-400 text-sm">
                      <span>★★★★</span>
                      <span style={{position: 'relative', display: 'inline-block'}}>
                        <span style={{color: '#d1d5db'}}>★</span>
                        <span style={{position: 'absolute', left: 0, top: 0, width: '30%', overflow: 'hidden', color: '#fbbf24'}}>★</span>
                      </span>
                    </div>
                    <span className="text-sm">4.3 (47 รีวิว)</span>
                  </div>

                  {/* Highlight Text */}
                  <div className="mb-3 text-sm leading-relaxed">
                    <p className="drop-shadow-lg">สัมผัสความมหัศจรรย์ของคาซัคสถาน</p>
                    <p className="drop-shadow-lg">พร้อมประสบการณ์สุดพิเศษที่ไม่ลืม</p>
                  </div>

                  {/* Price Section */}
                  <div className="gradient-background-blue backdrop-blur-sm rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold">฿89,900</span>
                          <span className="text-sm line-through opacity-70">฿109,900</span>
                        </div>
                        <p className="text-xs opacity-90">ประหยัด ฿20,000 • ผ่อน ฿14,983/เดือน</p>
                      </div>
                      <button className="bg-white text-blue-600 px-2 py-2 rounded-lg font-bold text-sm hover:scale-105 transition-all flex items-center gap-2 group">
                        <span>จองตอนนี้</span>
                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1 animate-arrow-bounce" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6-6 6-1.41-1.41z"/>
                        </svg>
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            </div>

            {/* Card 5 - Philippines (ลดพิเศษ) */}
            <div className="group cursor-pointer">
              <div className="relative aspect-[5/6] overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flash-sale-card">
                {/* Single Background Image */}
                <div className="absolute inset-0">
                  <img
                    src="https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&h=600&fit=crop&auto=format&q=100"
                    alt="Philippines"
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                    fetchPriority="low"
                    decoding="async"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                </div>

                {/* Elegant Flight Info - Red Theme */}
                <div className="absolute top-3 left-3 z-20">
                  <div className="bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-md rounded-xl shadow-xl overflow-hidden">
                    <div className="flex items-center">
                      <div className="flex items-center gap-2 px-3 py-2 border-r border-red-100">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-rose-600 rounded-full blur-md opacity-70"></div>
                          <div className="relative bg-gradient-to-br from-red-500 to-rose-600 p-1.5 rounded-full">
                            <svg className="w-3 h-3 transform rotate-45 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                            </svg>
                          </div>
                        </div>
                        <div>
                          <p className="text-[9px] text-gray-500 font-medium uppercase tracking-wider">Philippine Airlines</p>
                          <p className="text-xs text-gray-900 -mt-0.5">
                            <span className="font-bold">บินตรง</span>
                            <span className="text-gray-600 font-normal"> | บินบ่าย+น้ำหนัก 25 กก.</span>
                          </p>
                        </div>
                      </div>
                      <div className="px-3 py-2 bg-gradient-to-r from-red-50 to-rose-50">
                        <p className="text-[9px] text-blue-600 font-medium">ช่วงเดินทาง</p>
                        <p className="text-xs font-bold text-red-900 -mt-0.5">เม.ย. - มิ.ย. 68</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tour Code */}
                <div className="absolute top-0 right-0 z-20">
                  <div className="bg-gradient-to-bl from-red-600 to-red-700 text-white px-3.5 py-2 rounded-bl-xl shadow-md">
                    <p className="text-xs font-semibold tracking-wide">TW85231</p>
                  </div>
                </div>

                {/* Main Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">
                  <div className="mb-2">
                    <div className="bg-red-600 text-white px-3 py-1 rounded text-xs font-bold inline-block shadow-lg animate-bounce">
                      โปรโมชั่นพิเศษ
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-1 leading-tight drop-shadow-lg">
                    ทัวร์ฟิลิปปินส์ โบราเคย์ 5 วัน 4 คืน
                  </h3>
                  <div className="flex items-center gap-2 mb-3 text-sm">
                    <div className="flex text-yellow-400 text-sm">★★★★★</div>
                    <span className="text-sm">4.9 (203 รีวิว)</span>
                  </div>
                  <div className="mb-6 text-sm leading-relaxed">
                    <p className="drop-shadow-lg">หาดทรายขาวที่สวยที่สุด</p>
                    <p className="drop-shadow-lg">ดำน้ำตื้นชมปะการัง</p>
                  </div>
                  <div className="gradient-background-red backdrop-blur-sm rounded-lg p-3 relative">
                    {/* Countdown Timer - Clean Design */}
                    <div className="absolute -top-5 left-0 bg-white text-red-600 px-3 py-1.5 rounded-r-lg rounded-tl-md text-sm font-bold shadow-md flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{String(countdown5.hours).padStart(2, '0')}:{String(countdown5.minutes).padStart(2, '0')}:{String(countdown5.seconds).padStart(2, '0')}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold">฿24,900</span>
                          <span className="text-sm line-through opacity-70">฿34,900</span>
                        </div>
                        <p className="text-xs opacity-90">ประหยัด ฿10,000 • ผ่อน ฿4,150/เดือน</p>
                      </div>
                      <button className="bg-white text-red-600 px-2 py-2 rounded-lg font-bold text-sm hover:scale-105 transition-all flex items-center gap-2 group">
                        <span>จองเลย</span>
                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1 animate-arrow-bounce" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6-6 6-1.41-1.41z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 6 - Laos (ทัวร์พรีเมี่ยม) */}
            <div className="group cursor-pointer">
              <div className="relative aspect-[5/6] overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                {/* Single Background Image */}
                <div className="absolute inset-0">
                  <img
                    src="https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&h=600&fit=crop&auto=format&q=100"
                    alt="Laos"
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                    fetchPriority="low"
                    decoding="async"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                </div>

                {/* Elegant Flight Info - Blue Theme */}
                <div className="absolute top-3 left-3 z-20">
                  <div className="bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-md rounded-xl shadow-xl overflow-hidden">
                    <div className="flex items-center">
                      <div className="flex items-center gap-2 px-3 py-2 border-r border-blue-100">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full blur-md opacity-70"></div>
                          <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 p-1.5 rounded-full">
                            <svg className="w-3 h-3 transform rotate-45 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                            </svg>
                          </div>
                        </div>
                        <div>
                          <p className="text-[9px] text-gray-500 font-medium uppercase tracking-wider">Lao Airlines</p>
                          <p className="text-xs text-gray-900 -mt-0.5">
                            <span className="font-bold">บินตรง</span>
                            <span className="text-gray-600 font-normal"> | มัคคุเทศก์ VIP</span>
                          </p>
                        </div>
                      </div>
                      <div className="px-3 py-2 bg-gradient-to-r from-blue-50 to-blue-50">
                        <p className="text-[9px] text-blue-600 font-medium">ช่วงเดินทาง</p>
                        <p className="text-xs font-bold text-blue-900 -mt-0.5">ต.ค. - ธ.ค. 68</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tour Code */}
                <div className="absolute top-0 right-0 z-20">
                  <div className="bg-gradient-to-bl from-blue-600 to-blue-700 text-white px-3.5 py-2 rounded-bl-xl shadow-md">
                    <p className="text-xs font-semibold tracking-wide">TW86342</p>
                  </div>
                </div>

                {/* Main Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">
                  <div className="mb-2">
                    <div className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold inline-block shadow-lg">
                      ทัวร์พรีเมี่ยม
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-1 leading-tight drop-shadow-lg">
                    ทัวร์ลาว หลวงพระบาง เวียงจันทน์ 4 วัน 3 คืน
                  </h3>
                  <div className="flex items-center gap-2 mb-3 text-sm">
                    <div className="flex text-yellow-400 text-sm">★★★★☆</div>
                    <span className="text-sm">4.5 (89 รีวิว)</span>
                  </div>
                  <div className="mb-3 text-sm leading-relaxed">
                    <p className="drop-shadow-lg">มรดกโลกหลวงพระบาง</p>
                    <p className="drop-shadow-lg">ตักบาตรข้าวเหนียว</p>
                  </div>
                  <div className="gradient-background-blue backdrop-blur-sm rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold">฿15,900</span>
                          <span className="text-sm line-through opacity-70">฿19,900</span>
                        </div>
                        <p className="text-xs opacity-90">ประหยัด ฿4,000 • ผ่อน ฿2,650/เดือน</p>
                      </div>
                      <button className="bg-white text-blue-600 px-2 py-2 rounded-lg font-bold text-sm hover:scale-105 transition-all flex items-center gap-2 group">
                        <span>จองตอนนี้</span>
                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1 animate-arrow-bounce" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6-6 6-1.41-1.41z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 7 - Cambodia (ลดพิเศษ) */}
            <div className="group cursor-pointer">
              <div className="relative aspect-[5/6] overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flash-sale-card">
                {/* Single Background Image */}
                <div className="absolute inset-0">
                  <img
                    src="https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&h=600&fit=crop&auto=format&q=100"
                    alt="Cambodia"
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                    fetchPriority="low"
                    decoding="async"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                </div>

                {/* Elegant Flight Info - Red Theme */}
                <div className="absolute top-3 left-3 z-20">
                  <div className="bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-md rounded-xl shadow-xl overflow-hidden">
                    <div className="flex items-center">
                      <div className="flex items-center gap-2 px-3 py-2 border-r border-red-100">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-rose-600 rounded-full blur-md opacity-70"></div>
                          <div className="relative bg-gradient-to-br from-red-500 to-rose-600 p-1.5 rounded-full">
                            <svg className="w-3 h-3 transform rotate-45 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                            </svg>
                          </div>
                        </div>
                        <div>
                          <p className="text-[9px] text-gray-500 font-medium uppercase tracking-wider">Bangkok Airways</p>
                          <p className="text-xs text-gray-900 -mt-0.5">
                            <span className="font-bold">บินตรง</span>
                            <span className="text-gray-600 font-normal"> | บินเช้าถึงสาย</span>
                          </p>
                        </div>
                      </div>
                      <div className="px-3 py-2 bg-gradient-to-r from-red-50 to-rose-50">
                        <p className="text-[9px] text-blue-600 font-medium">ช่วงเดินทาง</p>
                        <p className="text-xs font-bold text-red-900 -mt-0.5">ม.ค. - มี.ค. 68</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tour Code */}
                <div className="absolute top-0 right-0 z-20">
                  <div className="bg-gradient-to-bl from-red-600 to-red-700 text-white px-3.5 py-2 rounded-bl-xl shadow-md">
                    <p className="text-xs font-semibold tracking-wide">TW87453</p>
                  </div>
                </div>

                {/* Main Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">
                  <div className="mb-2">
                    <div className="bg-red-600 text-white px-3 py-1 rounded text-xs font-bold inline-block shadow-lg animate-bounce">
                      จองด่วน!
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-1 leading-tight drop-shadow-lg">
                    ทัวร์กัมพูชา นครวัด นครธม 3 วัน 2 คืน
                  </h3>
                  <div className="flex items-center gap-2 mb-3 text-sm">
                    <div className="flex text-yellow-400 text-sm">★★★★★</div>
                    <span className="text-sm">4.7 (156 รีวิว)</span>
                  </div>
                  <div className="mb-6 text-sm leading-relaxed">
                    <p className="drop-shadow-lg">มรดกโลกปราสาทนครวัด</p>
                    <p className="drop-shadow-lg">เมืองโบราณนครธม</p>
                  </div>
                  <div className="gradient-background-red backdrop-blur-sm rounded-lg p-3 relative">
                    {/* Countdown Timer - Clean Design */}
                    <div className="absolute -top-5 left-0 bg-white text-red-600 px-3 py-1.5 rounded-r-lg rounded-tl-md text-sm font-bold shadow-md flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{String(countdown7.hours).padStart(2, '0')}:{String(countdown7.minutes).padStart(2, '0')}:{String(countdown7.seconds).padStart(2, '0')}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold">฿9,900</span>
                          <span className="text-sm line-through opacity-70">฿14,900</span>
                        </div>
                        <p className="text-xs opacity-90">ประหยัด ฿5,000 • ผ่อน ฿1,650/เดือน</p>
                      </div>
                      <button className="bg-white text-red-600 px-2 py-2 rounded-lg font-bold text-sm hover:scale-105 transition-all flex items-center gap-2 group">
                        <span>จองเลย</span>
                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1 animate-arrow-bounce" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6-6 6-1.41-1.41z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 8 - Hong Kong (ทัวร์พรีเมี่ยม) */}
            <div className="group cursor-pointer">
              <div className="relative aspect-[5/6] overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                {/* Single Background Image */}
                <div className="absolute inset-0">
                  <img
                    src="https://images.unsplash.com/photo-1536431311719-398b6704d4cc?w=800&h=600&fit=crop&auto=format&q=100"
                    alt="Hong Kong"
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                    fetchPriority="low"
                    decoding="async"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                </div>

                {/* Elegant Flight Info - Blue Theme */}
                <div className="absolute top-3 left-3 z-20">
                  <div className="bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-md rounded-xl shadow-xl overflow-hidden">
                    <div className="flex items-center">
                      <div className="flex items-center gap-2 px-3 py-2 border-r border-blue-100">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full blur-md opacity-70"></div>
                          <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 p-1.5 rounded-full">
                            <svg className="w-3 h-3 transform rotate-45 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                            </svg>
                          </div>
                        </div>
                        <div>
                          <p className="text-[9px] text-gray-500 font-medium uppercase tracking-wider">Cathay Pacific</p>
                          <p className="text-xs text-gray-900 -mt-0.5">
                            <span className="font-bold">บินตรง</span>
                            <span className="text-gray-600 font-normal"> | Lounge ฟรี+ไมล์x3</span>
                          </p>
                        </div>
                      </div>
                      <div className="px-3 py-2 bg-gradient-to-r from-blue-50 to-blue-50">
                        <p className="text-[9px] text-blue-600 font-medium">ช่วงเดินทาง</p>
                        <p className="text-xs font-bold text-blue-900 -mt-0.5">พ.ย. - ม.ค. 68</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tour Code */}
                <div className="absolute top-0 right-0 z-20">
                  <div className="bg-gradient-to-bl from-blue-600 to-blue-700 text-white px-3.5 py-2 rounded-bl-xl shadow-md">
                    <p className="text-xs font-semibold tracking-wide">TW88564</p>
                  </div>
                </div>

                {/* Main Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">
                  <div className="mb-2">
                    <div className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold inline-block shadow-lg">
                      ทัวร์หรู
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-1 leading-tight drop-shadow-lg">
                    ทัวร์ฮ่องกง ดิสนีย์แลนด์ 4 วัน 3 คืน
                  </h3>
                  <div className="flex items-center gap-2 mb-3 text-sm">
                    <div className="flex text-yellow-400 text-sm">★★★★★</div>
                    <span className="text-sm">4.8 (234 รีวิว)</span>
                  </div>
                  <div className="mb-3 text-sm leading-relaxed">
                    <p className="drop-shadow-lg">ดิสนีย์แลนด์เต็มวัน</p>
                    <p className="drop-shadow-lg">นั่งกระเช้านองปิง</p>
                  </div>
                  <div className="gradient-background-blue backdrop-blur-sm rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold">฿42,900</span>
                          <span className="text-sm line-through opacity-70">฿52,900</span>
                        </div>
                        <p className="text-xs opacity-90">ประหยัด ฿10,000 • ผ่อน ฿7,150/เดือน</p>
                      </div>
                      <button className="bg-white text-blue-600 px-2 py-2 rounded-lg font-bold text-sm hover:scale-105 transition-all flex items-center gap-2 group">
                        <span>จองตอนนี้</span>
                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1 animate-arrow-bounce" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6-6 6-1.41-1.41z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 9 - Indonesia (ลดพิเศษ) */}
            <div className="group cursor-pointer">
              <div className="relative aspect-[5/6] overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flash-sale-card">
                {/* Single Background Image */}
                <div className="absolute inset-0">
                  <img
                    src="https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&h=600&fit=crop&auto=format&q=100"
                    alt="Indonesia"
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                    fetchPriority="low"
                    decoding="async"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                </div>

                {/* Elegant Flight Info - Red Theme */}
                <div className="absolute top-3 left-3 z-20">
                  <div className="bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-md rounded-xl shadow-xl overflow-hidden">
                    <div className="flex items-center">
                      <div className="flex items-center gap-2 px-3 py-2 border-r border-red-100">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-rose-600 rounded-full blur-md opacity-70"></div>
                          <div className="relative bg-gradient-to-br from-red-500 to-rose-600 p-1.5 rounded-full">
                            <svg className="w-3 h-3 transform rotate-45 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                            </svg>
                          </div>
                        </div>
                        <div>
                          <p className="text-[9px] text-gray-500 font-medium uppercase tracking-wider">Garuda Indonesia</p>
                          <p className="text-xs text-gray-900 -mt-0.5">
                            <span className="font-bold">บินตรง</span>
                            <span className="text-gray-600 font-normal"> | อาหารฮาลาล</span>
                          </p>
                        </div>
                      </div>
                      <div className="px-3 py-2 bg-gradient-to-r from-red-50 to-rose-50">
                        <p className="text-[9px] text-blue-600 font-medium">ช่วงเดินทาง</p>
                        <p className="text-xs font-bold text-red-900 -mt-0.5">ก.ค. - ก.ย. 68</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tour Code */}
                <div className="absolute top-0 right-0 z-20">
                  <div className="bg-gradient-to-bl from-red-600 to-red-700 text-white px-3.5 py-2 rounded-bl-xl shadow-md">
                    <p className="text-xs font-semibold tracking-wide">TW89675</p>
                  </div>
                </div>

                {/* Main Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">
                  <div className="mb-2">
                    <div className="bg-red-600 text-white px-3 py-1 rounded text-xs font-bold inline-block shadow-lg animate-bounce">
                      ดีลร้อนแรง
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-1 leading-tight drop-shadow-lg">
                    ทัวร์บาหลี อินโดนีเซีย 5 วัน 4 คืน
                  </h3>
                  <div className="flex items-center gap-2 mb-3 text-sm">
                    <div className="flex text-yellow-400 text-sm">★★★★★</div>
                    <span className="text-sm">4.9 (312 รีวิว)</span>
                  </div>
                  <div className="mb-6 text-sm leading-relaxed">
                    <p className="drop-shadow-lg">เกาะสวรรค์บาหลี</p>
                    <p className="drop-shadow-lg">วัดเบซากีห์ นาข้าวขั้นบันได</p>
                  </div>
                  <div className="gradient-background-red backdrop-blur-sm rounded-lg p-3 relative">
                    {/* Countdown Timer - Clean Design */}
                    <div className="absolute -top-5 left-0 bg-white text-red-600 px-3 py-1.5 rounded-r-lg rounded-tl-md text-sm font-bold shadow-md flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{String(countdown9.hours).padStart(2, '0')}:{String(countdown9.minutes).padStart(2, '0')}:{String(countdown9.seconds).padStart(2, '0')}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold">฿28,900</span>
                          <span className="text-sm line-through opacity-70">฿38,900</span>
                        </div>
                        <p className="text-xs opacity-90">ประหยัด ฿10,000 • ผ่อน ฿4,817/เดือน</p>
                      </div>
                      <button className="bg-white text-red-600 px-2 py-2 rounded-lg font-bold text-sm hover:scale-105 transition-all flex items-center gap-2 group">
                        <span>จองเลย</span>
                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1 animate-arrow-bounce" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6-6 6-1.41-1.41z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 10 - Malaysia (ทัวร์พรีเมี่ยม) */}
            <div className="group cursor-pointer">
              <div className="relative aspect-[5/6] overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                {/* Single Background Image */}
                <div className="absolute inset-0">
                  <img
                    src="https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&h=600&fit=crop&auto=format&q=100"
                    alt="Malaysia"
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                    fetchPriority="low"
                    decoding="async"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                </div>

                {/* Elegant Flight Info - Blue Theme */}
                <div className="absolute top-3 left-3 z-20">
                  <div className="bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-md rounded-xl shadow-xl overflow-hidden">
                    <div className="flex items-center">
                      <div className="flex items-center gap-2 px-3 py-2 border-r border-blue-100">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full blur-md opacity-70"></div>
                          <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 p-1.5 rounded-full">
                            <svg className="w-3 h-3 transform rotate-45 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                            </svg>
                          </div>
                        </div>
                        <div>
                          <p className="text-[9px] text-gray-500 font-medium uppercase tracking-wider">Malaysia Airlines</p>
                          <p className="text-xs text-gray-900 -mt-0.5">
                            <span className="font-bold">บินตรง</span>
                            <span className="text-gray-600 font-normal"> | บินดึก+กระเป๋า 2 ใบ</span>
                          </p>
                        </div>
                      </div>
                      <div className="px-3 py-2 bg-gradient-to-r from-blue-50 to-blue-50">
                        <p className="text-[9px] text-blue-600 font-medium">ช่วงเดินทาง</p>
                        <p className="text-xs font-bold text-blue-900 -mt-0.5">มิ.ย. - ส.ค. 68</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tour Code */}
                <div className="absolute top-0 right-0 z-20">
                  <div className="bg-gradient-to-bl from-blue-600 to-blue-700 text-white px-3.5 py-2 rounded-bl-xl shadow-md">
                    <p className="text-xs font-semibold tracking-wide">TW90786</p>
                  </div>
                </div>

                {/* Main Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">
                  <div className="mb-2">
                    <div className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold inline-block shadow-lg">
                      ทัวร์ครอบครัว
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-1 leading-tight drop-shadow-lg">
                    ทัวร์มาเลเซีย กัวลาลัมเปอร์ 4 วัน 3 คืน
                  </h3>
                  <div className="flex items-center gap-2 mb-3 text-sm">
                    <div className="flex text-yellow-400 text-sm">★★★★☆</div>
                    <span className="text-sm">4.6 (178 รีวิว)</span>
                  </div>
                  <div className="mb-3 text-sm leading-relaxed">
                    <p className="drop-shadow-lg">เก็นติ้งไฮแลนด์</p>
                    <p className="drop-shadow-lg">ถ้ำบาตู ปุตราจายา</p>
                  </div>
                  <div className="gradient-background-blue backdrop-blur-sm rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold">฿18,900</span>
                          <span className="text-sm line-through opacity-70">฿24,900</span>
                        </div>
                        <p className="text-xs opacity-90">ประหยัด ฿6,000 • ผ่อน ฿3,150/เดือน</p>
                      </div>
                      <button className="bg-white text-blue-600 px-2 py-2 rounded-lg font-bold text-sm hover:scale-105 transition-all flex items-center gap-2 group">
                        <span>จองตอนนี้</span>
                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1 animate-arrow-bounce" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6-6 6-1.41-1.41z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 11 - South Korea (ลดพิเศษ) */}
            <div className="group cursor-pointer">
              <div className="relative aspect-[5/6] overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flash-sale-card">
                {/* Single Background Image */}
                <div className="absolute inset-0">
                  <img
                    src="https://images.unsplash.com/photo-1538485399081-7191377e8241?w=800&h=600&fit=crop&auto=format&q=100"
                    alt="South Korea"
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                    fetchPriority="low"
                    decoding="async"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                </div>

                {/* Elegant Flight Info - Red Theme */}
                <div className="absolute top-3 left-3 z-20">
                  <div className="bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-md rounded-xl shadow-xl overflow-hidden">
                    <div className="flex items-center">
                      <div className="flex items-center gap-2 px-3 py-2 border-r border-red-100">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-rose-600 rounded-full blur-md opacity-70"></div>
                          <div className="relative bg-gradient-to-br from-red-500 to-rose-600 p-1.5 rounded-full">
                            <svg className="w-3 h-3 transform rotate-45 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                            </svg>
                          </div>
                        </div>
                        <div>
                          <p className="text-[9px] text-gray-500 font-medium uppercase tracking-wider">Korean Air</p>
                          <p className="text-xs text-gray-900 -mt-0.5">
                            <span className="font-bold">บินตรง</span>
                            <span className="text-gray-600 font-normal"> | ไมล์สะสม x2</span>
                          </p>
                        </div>
                      </div>
                      <div className="px-3 py-2 bg-gradient-to-r from-red-50 to-rose-50">
                        <p className="text-[9px] text-blue-600 font-medium">ช่วงเดินทาง</p>
                        <p className="text-xs font-bold text-red-900 -mt-0.5">ต.ค. - ธ.ค. 68</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tour Code */}
                <div className="absolute top-0 right-0 z-20">
                  <div className="bg-gradient-to-bl from-red-600 to-red-700 text-white px-3.5 py-2 rounded-bl-xl shadow-md">
                    <p className="text-xs font-semibold tracking-wide">TW91897</p>
                  </div>
                </div>

                {/* Main Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">
                  <div className="mb-2">
                    <div className="bg-red-600 text-white px-3 py-1 rounded text-xs font-bold inline-block shadow-lg animate-bounce">
                      โปรโมชั่นหมดวันนี้!
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-1 leading-tight drop-shadow-lg">
                    ทัวร์เกาหลี โซล ปูซาน 6 วัน 4 คืน
                  </h3>
                  <div className="flex items-center gap-2 mb-3 text-sm">
                    <div className="flex text-yellow-400 text-sm">★★★★★</div>
                    <span className="text-sm">5.0 (425 รีวิว)</span>
                  </div>
                  <div className="mb-6 text-sm leading-relaxed">
                    <p className="drop-shadow-lg">ชมใบไม้เปลี่ยนสี</p>
                    <p className="drop-shadow-lg">สวนสนุกเอเวอร์แลนด์</p>
                  </div>
                  <div className="gradient-background-red backdrop-blur-sm rounded-lg p-3 relative">
                    {/* Countdown Timer - Clean Design */}
                    <div className="absolute -top-5 left-0 bg-white text-red-600 px-3 py-1.5 rounded-r-lg rounded-tl-md text-sm font-bold shadow-md flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{String(countdown11.hours).padStart(2, '0')}:{String(countdown11.minutes).padStart(2, '0')}:{String(countdown11.seconds).padStart(2, '0')}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold">฿35,900</span>
                          <span className="text-sm line-through opacity-70">฿45,900</span>
                        </div>
                        <p className="text-xs opacity-90">ประหยัด ฿10,000 • ผ่อน ฿5,983/เดือน</p>
                      </div>
                      <button className="bg-white text-red-600 px-2 py-2 rounded-lg font-bold text-sm hover:scale-105 transition-all flex items-center gap-2 group">
                        <span>จองเลย</span>
                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1 animate-arrow-bounce" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6-6 6-1.41-1.41z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 12 - Taiwan (ทัวร์พรีเมี่ยม) */}
            <div className="group cursor-pointer">
              <div className="relative aspect-[5/6] overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                {/* Single Background Image */}
                <div className="absolute inset-0">
                  <img
                    src="https://images.unsplash.com/photo-1508248467877-aec1b08de376?w=800&h=600&fit=crop&auto=format&q=100"
                    alt="Taiwan"
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                    fetchPriority="low"
                    decoding="async"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                </div>

                {/* Elegant Flight Info - Blue Theme */}
                <div className="absolute top-3 left-3 z-20">
                  <div className="bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-md rounded-xl shadow-xl overflow-hidden">
                    <div className="flex items-center">
                      <div className="flex items-center gap-2 px-3 py-2 border-r border-blue-100">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full blur-md opacity-70"></div>
                          <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 p-1.5 rounded-full">
                            <svg className="w-3 h-3 transform rotate-45 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                            </svg>
                          </div>
                        </div>
                        <div>
                          <p className="text-[9px] text-gray-500 font-medium uppercase tracking-wider">EVA Air</p>
                          <p className="text-xs text-gray-900 -mt-0.5">
                            <span className="font-bold">บินตรง</span>
                            <span className="text-gray-600 font-normal"> | เลือกที่นั่ง+ประกัน</span>
                          </p>
                        </div>
                      </div>
                      <div className="px-3 py-2 bg-gradient-to-r from-blue-50 to-blue-50">
                        <p className="text-[9px] text-blue-600 font-medium">ช่วงเดินทาง</p>
                        <p className="text-xs font-bold text-blue-900 -mt-0.5">เม.ย. - มิ.ย. 68</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tour Code */}
                <div className="absolute top-0 right-0 z-20">
                  <div className="bg-gradient-to-bl from-blue-600 to-blue-700 text-white px-3.5 py-2 rounded-bl-xl shadow-md">
                    <p className="text-xs font-semibold tracking-wide">TW92908</p>
                  </div>
                </div>

                {/* Main Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">
                  <div className="mb-2">
                    <div className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold inline-block shadow-lg">
                      ขายดี
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-1 leading-tight drop-shadow-lg">
                    ทัวร์ไต้หวัน ไทเป อาลีซาน 5 วัน 3 คืน
                  </h3>
                  <div className="flex items-center gap-2 mb-3 text-sm">
                    <div className="flex text-yellow-400 text-sm">★★★★☆</div>
                    <span className="text-sm">4.7 (298 รีวิว)</span>
                  </div>
                  <div className="mb-3 text-sm leading-relaxed">
                    <p className="drop-shadow-lg">ตึกไทเป 101</p>
                    <p className="drop-shadow-lg">หมู่บ้านจิ่วเฟิน</p>
                  </div>
                  <div className="gradient-background-blue backdrop-blur-sm rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold">฿25,900</span>
                          <span className="text-sm line-through opacity-70">฿32,900</span>
                        </div>
                        <p className="text-xs opacity-90">ประหยัด ฿7,000 • ผ่อน ฿4,317/เดือน</p>
                      </div>
                      <button className="bg-white text-blue-600 px-2 py-2 rounded-lg font-bold text-sm hover:scale-105 transition-all flex items-center gap-2 group">
                        <span>จองตอนนี้</span>
                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1 animate-arrow-bounce" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6-6 6-1.41-1.41z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}

export default TourSearch58