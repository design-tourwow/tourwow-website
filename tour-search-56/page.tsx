'use client'

import React, { useState, useEffect } from 'react'
import {
  Search, Filter, X, MapPin, Calendar, Star, TrendingUp,
  ChevronDown, ArrowUp, MessageCircle, Phone, Sparkles,
  Users, Clock, Gift, Zap, Globe, Heart
} from 'lucide-react'

const TourSearch56 = () => {
  const [searchQuery, setSearchQuery] = useState('')

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
      `}</style>
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              ค้นหาทัวร์ที่ใช่สำหรับคุณ
            </h1>
            <p className="text-gray-600">
              เลือกจากทัวร์คุณภาพสูงกว่า 1,000+ โปรแกรม
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
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
          <div className="w-full py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4 md:gap-6">

              {/* Tour Card 1 */}
              <div className="group cursor-pointer">
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                  <video
                    src="/images/countries/japan-6.mov"
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                  {/* Text Overlay */}
                  <div className="absolute bottom-2 left-0 right-0 p-3 text-white">
                    {/* Badge */}
                    <div className="mb-2">
                      <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md">
                        โปรไฟไหม้
                      </span>
                    </div>
                    <h3 className="text-sm font-bold leading-relaxed mb-2 line-clamp-1">
                      ทัวร์โอซาก้า 7 วัน 5 คืน จัดเต็ม USJ ไม่มีวันอิสระ
                    </h3>
                    <p className="text-xs text-gray-200 leading-relaxed line-clamp-3 mb-2">
                      ชมปราสาทโอซาก้า วัดคินคากุจิ วัดฟุชิมิอินาริ สวนอาราชิยามะ อุโมงค์ไผ่เขียวขจี ตลาดดงโทบอริ ช้อปปิ้งย่านชินไซบาชิ ดิวตี้ฟรีคันไซ ลิ้มลองอาหารท้องถิ่น ทาโกยากิ โอโคโนมิยากิ พักผ่อนออนเซ็นเกียวโต อิสระเต็มวัน
                    </p>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-bold text-white">ราคาเริ่มต้น <span className="text-red-500">฿89,900</span></span>
                      <span className="text-xs text-gray-300 line-through">฿119,900</span>
                    </div>
                    <p className="text-xs text-gray-200 mb-1">
                      โปรโมชั่นนี้ถึง 31 ธ.ค. 2567 เท่านั้น
                    </p>
                    <div className="flex justify-end">
                      <span className="animate-bounce-x">
                        <a
                          className="text-xs text-white hover:text-yellow-300 cursor-pointer hover:scale-105 transition-all duration-200 leading-none"
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
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
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
                  <div className="absolute bottom-8 left-0 right-0 p-4">
                    {/* Ticket Container */}
                    <div className="bg-white/95 backdrop-blur-sm shadow-lg rounded-xl relative overflow-hidden" style={{
                      maskImage: 'radial-gradient(circle at 0% 50%, transparent 8px, black 8px), radial-gradient(circle at 100% 50%, transparent 8px, black 8px)',
                      maskComposite: 'intersect'
                    }}>
                      {/* Main Ticket Body */}
                      <div className="relative">

                        {/* Ticket Content */}
                        <div className="px-3 py-2">
                          {/* Header - Tour Name */}
                          <div className="mb-2 pb-1 border-b border-gray-200">
                            <h3 className="text-base font-bold text-gray-900 mb-1 line-clamp-1">
                              ทัวร์โอซาก้า 7 วัน 5 คืน จัดเต็ม USJ ไม่มีวันอิสระ
                            </h3>
                          </div>

                          {/* Route */}
                          <div className="flex items-center justify-between mb-3">
                            <div className="text-center">
                              <div className="text-sm font-bold text-gray-900">BKK</div>
                              <div className="text-xs text-gray-500">กรุงเทพฯ</div>
                            </div>
                            <div className="flex-1 mx-3 relative flex items-center">
                              <div className="flex-1 border-t-2 border-dashed border-gray-300 mr-2"></div>
                              <div className="flex flex-col items-center">
                                <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-lg shadow-md">✈</div>
                                <div className="text-[10px] text-gray-500 mt-1 whitespace-nowrap">Thai Airways</div>
                              </div>
                              <div className="flex-1 border-t-2 border-dashed border-gray-300 ml-2"></div>
                            </div>
                            <div className="text-center">
                              <div className="text-sm font-bold text-gray-900">KIX</div>
                              <div className="text-xs text-gray-500">โอซาก้า</div>
                            </div>
                          </div>

                          {/* Promotion Details */}
                          <div className="text-center mb-2 py-3 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border-l-4 border-red-500">
                            <div className="flex items-center justify-center gap-4 text-xs">
                              <div className="flex items-center gap-2">
                                <span className="bg-red-500 text-white px-2 py-1 rounded-full font-bold text-[10px] animate-pulse-glow">ลด ฿30,000</span>
                                <div className="flex items-center gap-1">
                                  <span className="text-xs text-gray-400 line-through">฿119,900</span>
                                  <span className="text-red-600 font-bold">฿89,900</span>
                                </div>
                              </div>
                              <div className="h-3 w-px bg-gray-300"></div>
                              <div className="flex items-center gap-1 text-orange-600">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                </svg>
                                <span className="font-bold">เหลือ 3 วัน</span>
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>

                  {/* Link outside card at bottom center */}
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                    <div className="animate-gentle-bounce text-center">
                      <a
                        className="text-xs text-white hover:text-yellow-300 cursor-pointer hover:scale-105 transition-all duration-200 leading-none flex items-center gap-1"
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

            </div>
          </div>
        </div>
      </main>
    </div>
    </>
  )
}

export default TourSearch56