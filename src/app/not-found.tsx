'use client'

import Link from 'next/link'
import { Home, Search, MapPin, Plane, ArrowLeft } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { LoadingProvider } from '@/components/LoadingProvider'

function NotFoundContent() {
  return (
    <div className="min-h-screen bg-white">
        <Header />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-purple-200 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-pink-200 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-yellow-200 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>

        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="text-center w-full max-w-4xl mx-auto">
            {/* 404 Number */}
            <div className="mb-8">
              <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
                404
              </h1>
            </div>

            {/* Main Message */}
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                อ๊ะ! ดูเหมือนว่าคุณหลงทางแล้ว
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                หน้าเว็บที่คุณกำลังค้นหาไม่มีอยู่ หรืออาจจะย้ายไปที่อื่นแล้ว 
                แต่ไม่ต้องกังวล! เรามีทริปที่น่าสนใจรอคุณอยู่
              </p>
            </div>

            {/* Animated Traveler */}
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto relative">
                {/* Traveler with luggage */}
                <div className="relative">
                  {/* Person */}
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <div className="w-8 h-8 bg-white rounded-full"></div>
                  </div>
                  
                  {/* Body */}
                  <div className="w-12 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded mx-auto mb-2"></div>
                  
                  {/* Arms holding luggage */}
                  <div className="flex justify-center items-end gap-8">
                    <div className="w-3 h-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-l"></div>
                    <div className="w-8 h-6 bg-orange-400 rounded border-2 border-orange-600 animate-bounce"></div>
                    <div className="w-3 h-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-r"></div>
                  </div>
                  
                  {/* Legs */}
                  <div className="flex justify-center gap-2 mt-2">
                    <div className="w-3 h-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded"></div>
                    <div className="w-3 h-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded"></div>
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 animate-ping">
                  <Plane className="w-6 h-6 text-blue-500" />
                </div>
                <div className="absolute -bottom-4 -left-4 animate-bounce">
                  <MapPin className="w-6 h-6 text-red-500" />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link 
                href="/"
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <Home className="w-5 h-5" />
                กลับหน้าหลัก
              </Link>
              
              <Link 
                href="/tours"
                className="flex items-center gap-2 bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <Search className="w-5 h-5" />
                ดูทัวร์ทั้งหมด
              </Link>
            </div>

            {/* Popular Destinations */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">จุดหมายปลายทางยอดนิยม</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'ญี่ปุ่น', href: '/tours/1', color: 'from-pink-400 to-red-400' },
                  { name: 'ยุโรป', href: '/tours/2', color: 'from-blue-400 to-purple-400' },
                  { name: 'ไทย', href: '/tours/3', color: 'from-green-400 to-blue-400' },
                  { name: 'บาหลี', href: '/tours/4', color: 'from-yellow-400 to-orange-400' }
                ].map((destination, index) => (
                  <Link
                    key={index}
                    href={destination.href}
                    className={`bg-gradient-to-r ${destination.color} text-white p-4 rounded-xl text-center font-medium hover:scale-105 transition-transform duration-300 shadow-md`}
                  >
                    {destination.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-8">ไม่พบสิ่งที่คุณกำลังค้นหา?</h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">ค้นหาทัวร์</h4>
                <p className="text-gray-600 text-sm">ใช้เครื่องมือค้นหาของเราเพื่อหาทัวร์ที่เหมาะกับคุณ</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">ดูแผนที่</h4>
                <p className="text-gray-600 text-sm">สำรวจจุดหมายปลายทางต่างๆ บนแผนที่โลก</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plane className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">ติดต่อเรา</h4>
                <p className="text-gray-600 text-sm">ทีมงานพร้อมช่วยคุณหาทัวร์ที่เหมาะสม</p>
              </div>
            </div>
            
            <div className="mt-8">
              <Link 
                href="/contact"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
              >
                <ArrowLeft className="w-5 h-5" />
                ติดต่อเราเพื่อขอคำแนะนำ
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default function NotFound() {
  return (
    <LoadingProvider>
      <NotFoundContent />
    </LoadingProvider>
  )
}