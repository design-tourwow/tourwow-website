'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { CheckCircle, Phone, MessageCircle, ArrowRight, Star, Gift, Clock, Users, Calendar } from 'lucide-react'
import Link from 'next/link'

export default function BookingSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [countdown, setCountdown] = useState(10)
  
  // Get booking details from URL params
  const tour = searchParams.get('tour') || 'ทัวร์ที่เลือก'
  const price = parseInt(searchParams.get('price') || '0')
  const travelers = parseInt(searchParams.get('travelers') || '1')
  const totalAmount = price * travelers
  
  // Countdown for redirect
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          router.push('/tour-search-11')
          return 0
        }
        return prev - 1
      })
    }, 1000)
    
    return () => clearInterval(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl animate-bounce">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
              🎉
            </div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-pink-400 rounded-full flex items-center justify-center animate-pulse">
              ✨
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            จองสำเร็จแล้ว!
          </h1>
          <p className="text-gray-600 text-lg">
            ขอบคุณที่เลือกใช้บริการ TourWow
          </p>
        </div>

        {/* Booking Summary Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="text-center mb-6">
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-4 mb-4">
              <h2 className="font-bold text-gray-900 text-lg leading-tight">
                {tour}
              </h2>
            </div>
            
            {/* Booking Details */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-50 rounded-xl p-3">
                <Users className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                <div className="text-gray-600">จำนวนท่าน</div>
                <div className="font-bold text-gray-900">{travelers} ท่าน</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <div className="text-2xl mb-1">💰</div>
                <div className="text-gray-600">ราคารวม</div>
                <div className="font-bold text-green-600">฿{totalAmount.toLocaleString()}</div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-200 mb-6">
            <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              ขั้นตอนถัดไป
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">1</div>
                <div>
                  <div className="font-medium text-blue-800">ทีมงานจะติดต่อกลับ</div>
                  <div className="text-blue-600">ภายใน 2 ชั่วโมง เพื่อยืนยันการจอง</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">2</div>
                <div>
                  <div className="font-medium text-blue-800">รับเอกสารการเดินทาง</div>
                  <div className="text-blue-600">ทาง Email และ LINE</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">3</div>
                <div>
                  <div className="font-medium text-blue-800">ชำระเงินมัดจำ</div>
                  <div className="text-blue-600">30% ภายใน 3 วัน</div>
                </div>
              </div>
            </div>
          </div>

          {/* Special Offer */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-5 border border-yellow-200 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <Gift className="w-5 h-5 text-yellow-600" />
              <h3 className="font-bold text-yellow-800">ของแถมพิเศษ!</h3>
            </div>
            <div className="text-sm text-yellow-700">
              🎁 รับคูปองส่วนลด 1,000 บาท สำหรับการจองครั้งต่อไป<br/>
              📱 ได้รับสิทธิพิเศษ VIP Member
            </div>
          </div>

          {/* Contact Buttons */}
          <div className="space-y-3">
            <a href="tel:021234567" className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all">
              <Phone className="w-5 h-5" />
              โทร 02-123-4567
            </a>
            <a href="#" className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all">
              <MessageCircle className="w-5 h-5" />
              LINE: @tourwow
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div className="text-center space-y-4">
          <Link href="/tour-search-11" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all border border-gray-200">
            ดูทัวร์อื่น ๆ
            <ArrowRight className="w-4 h-4" />
          </Link>
          
          <div className="text-sm text-gray-500">
            🔄 จะกลับหน้าหลักอัตโนมัติใน {countdown} วินาที
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex items-center justify-center gap-4 mt-8 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <CheckCircle className="w-3 h-3 text-green-500" />
            <span>รับประกันความปลอดภัย</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-500" />
            <span>บริการมาตรฐาน</span>
          </div>
        </div>
      </div>
    </div>
  )
}