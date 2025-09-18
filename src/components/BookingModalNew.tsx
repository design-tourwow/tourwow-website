'use client'

import React, { useState } from 'react'
import { 
  X, Users, Calendar, Check, Mail, Phone, 
  CreditCard, CheckCircle, AlertCircle, Minus, Plus, Clock, ChevronDown 
} from 'lucide-react'

interface BookingModalProps {
  tour: any
  selectedDate: string
  bookingStep: number
  setBookingStep: (step: number) => void
  bookingData: any
  setBookingData: (data: any) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  onClose: () => void
  onOpenCalendar: () => void
  formatPrice: (price: number) => string
}

export default function BookingModal({
  tour,
  selectedDate,
  bookingStep,
  setBookingStep,
  bookingData,
  setBookingData,
  isLoading,
  setIsLoading,
  onClose,
  onOpenCalendar,
  formatPrice
}: BookingModalProps) {
  
  const [paymentMethod, setPaymentMethod] = useState('deposit')
  const [selectedPaymentCard, setSelectedPaymentCard] = useState('credit')
  const [selectedAddons, setSelectedAddons] = useState<{[key: string]: boolean}>({})
  
  const handleNext = async () => {
    if (bookingStep < 3) {
      setBookingStep(bookingStep + 1)
    } else {
      // Final booking submission
      setIsLoading(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setIsLoading(false)
      setBookingStep(4) // Success step
    }
  }

  // Add-ons data
  const addonsData = [
    {
      id: 'insurance',
      title: '🛡️ ประกันเดินทางครอบคลุม',
      description: 'คุ้มครอง COVID-19, ยกเลิกทริป, สูญหายกระเป๋า',
      price: 890,
      originalPrice: 1200,
      badge: 'แนะนำ 95% ลูกค้า',
      badgeColor: 'green'
    },
    {
      id: 'vip',
      title: '🎒 เซอร์วิส VIP',
      description: 'Fast Track, รถรับส่งส่วนตัว, ไกด์เฉพาะกลุ่ม',
      price: 2900,
      badge: '🔥 เหลือ 3 ที่',
      badgeColor: 'red'
    },
    {
      id: 'esim',
      title: '📱 eSIM Internet',
      description: 'Internet ไม่จำกัด 8 วัน, ไม่ต้องเปลี่ยน SIM',
      price: 290,
      badge: '⚡ ติดตั้งง่าย',
      badgeColor: 'blue',
      savings: 'ถูกกว่าซื้อที่สนามบิน 60%'
    },
    {
      id: 'upgrade',
      title: '✈️ อัปเกรดที่นั่ง',
      description: 'Business Class, อาหารพิเศษ, น้ำหนักกระเป๋าเพิ่ม',
      price: 12900,
      originalPrice: 18000,
      badge: '💎 Limited',
      badgeColor: 'gray'
    }
  ]

  const addonsTotal = Object.keys(selectedAddons).reduce((total, addonId) => {
    if (selectedAddons[addonId]) {
      const addon = addonsData.find(a => a.id === addonId)
      return total + (addon ? addon.price : 0)
    }
    return total
  }, 0)

  const totalPrice = (tour.price * bookingData.guests) + (addonsTotal * bookingData.guests)
  const selectedDateObj = selectedDate ? (() => {
    const [year, month, day] = selectedDate.split('-')
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
  })() : null
  const formattedDate = selectedDate ? selectedDateObj?.toLocaleDateString('th-TH', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }) : 'กรุณาเลือกวันที่'

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-6">
      {[1, 2, 3].map((step) => (
        <div key={step} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            bookingStep >= step 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-600'
          }`}>
            {bookingStep > step ? <Check className="w-4 h-4" /> : step}
          </div>
          {step < 3 && (
            <div className={`w-12 h-0.5 mx-2 ${
              bookingStep > step ? 'bg-blue-600' : 'bg-gray-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  )

  const renderStep1 = () => (
    <div className="space-y-4">
      {/* Mobile Title */}
      <div className="lg:hidden">
        <h2 className="text-xl font-bold text-gray-900 mb-1">📋 ข้อมูลการจอง</h2>
        <p className="text-sm text-gray-600">กรุณาตรวจสอบข้อมูลและเลือกจำนวนผู้เดินทาง</p>
      </div>

      {/* Desktop Title */}
      <div className="hidden lg:block text-center mb-6">
        <h2 className="text-2xl font-bold">ข้อมูลการจอง</h2>
      </div>
      
      {/* Tour Summary Card - Mobile First */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 lg:w-20 lg:h-20 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Calendar className="w-8 h-8 lg:w-10 lg:h-10 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-base lg:text-lg text-gray-900 mb-2 line-clamp-2">{tour.title}</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <span>📍</span>
                <span>{tour.destination}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>⏰</span>
                <span>{tour.duration}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>⭐</span>
                <span>{tour.rating} ({tour.reviewCount} รีวิว)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Availability Alert - Same style as main page */}
        {tour.availableSeats <= 5 && (
          <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-600 text-sm font-medium">
              🔥 เหลือที่นั่งสุดท้าย {tour.availableSeats} ที่นั่ง!
            </p>
          </div>
        )}
        
        {/* Highlights - Mobile Optimized */}
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-700 mb-2">✨ ไฮไลท์:</p>
          <div className="flex flex-wrap gap-2">
            {tour.highlights.map((highlight, index) => (
              <span key={index} className="bg-blue-50 border border-blue-200 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                {highlight}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Date Selection - Same style as main page */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-blue-600" />
          วันที่เดินทาง
        </label>
        <button
          type="button"
          onClick={() => onOpenCalendar()}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-left flex items-center justify-between hover:border-blue-400 transition-colors bg-white"
        >
          <span className={selectedDate ? 'text-gray-900' : 'text-gray-500'}>
            {selectedDate ? formattedDate : 'เลือกวันที่เดินทาง'}
          </span>
          <Calendar className="w-5 h-5 text-gray-400" />
        </button>
        <p className="text-xs text-gray-500 mt-2">*สามารถเลือกวันที่หลังจากกรอกข้อมูล</p>
      </div>

      {/* Guest Count - Mobile First */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <Users className="w-4 h-4 text-blue-600" />
          จำนวนผู้เดินทาง
        </label>
        
        {/* Mobile: Compact Layout */}
        <div className="lg:hidden bg-white border border-gray-300 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="font-medium text-gray-700">👥 ผู้ใหญ่</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setBookingData({
                  ...bookingData,
                  guests: Math.max(1, bookingData.guests - 1)
                })}
                disabled={bookingData.guests <= 1}
                className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-100 touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-bold text-xl min-w-[3rem] text-center text-blue-600">{bookingData.guests}</span>
              <button
                onClick={() => setBookingData({
                  ...bookingData,
                  guests: Math.min(tour.availableSeats, bookingData.guests + 1)
                })}
                disabled={bookingData.guests >= tour.availableSeats}
                className="w-10 h-10 rounded-full border-2 border-blue-300 bg-blue-50 flex items-center justify-center hover:bg-blue-100 touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-4 h-4 text-blue-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop: Original Layout */}
        <div className="hidden lg:flex lg:items-center lg:justify-between lg:bg-white lg:border lg:border-gray-300 lg:rounded-xl lg:p-4">
          <div className="flex items-center space-x-3">
            <Users className="w-5 h-5 text-gray-500" />
            <span className="font-medium">ผู้ใหญ่</span>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setBookingData({
                ...bookingData,
                guests: Math.max(1, bookingData.guests - 1)
              })}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 touch-manipulation min-h-[40px] min-w-[40px]"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-bold text-xl min-w-[3rem] text-center">{bookingData.guests}</span>
            <button
              onClick={() => setBookingData({
                ...bookingData,
                guests: Math.min(tour.availableSeats, bookingData.guests + 1)
              })}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 touch-manipulation min-h-[40px] min-w-[40px]"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Guest Info */}
        <p className="text-xs text-gray-500 mt-2">เหลือที่นั่ง {tour.availableSeats} ที่นั่ง</p>
      </div>

      {/* Price Breakdown - Mobile First */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        {/* Header */}
        <div className="bg-blue-50 px-4 py-3 border-b border-gray-200">
          <h4 className="font-semibold text-gray-800 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-blue-600" />
            💰 รายละเอียดราคา
          </h4>
        </div>
        
        {/* Price Details */}
        <div className="p-4">
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">ราคาต่อคน</span>
              <span className="font-semibold">฿{formatPrice(tour.price)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">จำนวนผู้เดินทาง</span>
              <span className="font-semibold text-blue-600">{bookingData.guests} คน</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">รวมทัวร์</span>
              <span className="font-semibold">฿{formatPrice(tour.price * bookingData.guests)}</span>
            </div>
            {addonsTotal > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-blue-600">บริการเสริม</span>
                <span className="font-semibold text-blue-600">฿{formatPrice(addonsTotal * bookingData.guests)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">รวมทั้งหมด</span>
              <span className="font-semibold">฿{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-green-600">ส่วนลดพิเศษ</span>
              <span className="font-semibold text-green-600">-฿{formatPrice(Math.round(totalPrice * 0.1))}</span>
            </div>
            
            {/* Total */}
            <div className="border-t border-gray-200 pt-3 mt-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-base lg:text-lg text-gray-900">ราคารวมทั้งสิ้น</span>
                <div className="text-right">
                  <div className="text-xl lg:text-2xl font-bold text-red-600">
                    ฿{formatPrice(Math.round(totalPrice * 0.9))}
                  </div>
                  <div className="text-xs text-gray-500">ประหยัด {Math.round(((totalPrice * 0.1) / totalPrice) * 100)}%</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Benefits - Mobile Optimized */}
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="grid grid-cols-1 gap-2 text-xs text-blue-700">
              <div className="flex items-center space-x-2">
                <span>💰</span>
                <span>มัดจำเพียง ฿3,000 วันนี้</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>💳</span>
                <span>ผ่อน 0% นาน 6 เดือน</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>🛡️</span>
                <span>คืนเงิน 100% หากยกเลิก</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>✈️</span>
                <span>รวมทุกค่าใช้จ่าย ไม่มีค่าซ่อนเร้น</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add-ons Selection */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span>🎯</span>
          <span>เพิ่มประสบการณ์การเดินทาง</span>
        </h3>
        <p className="text-sm text-gray-600 mb-4">เลือกบริการเสริมเพื่อประสบการณ์ที่ดีที่สุด</p>
        
        <div className="space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
          {addonsData.map((addon) => {
            const isSelected = selectedAddons[addon.id]
            const badgeColors = {
              green: 'bg-green-100 text-green-600',
              red: 'bg-red-100 text-red-600',
              blue: 'bg-blue-100 text-blue-600',
              gray: 'bg-gray-100 text-gray-600'
            }
            
            return (
              <div 
                key={addon.id}
                className={`border-2 rounded-xl p-4 transition-colors cursor-pointer group ${
                  isSelected 
                    ? 'border-blue-400 bg-blue-50' 
                    : 'border-gray-200 hover:border-blue-400 hover:bg-gray-50'
                }`}
                onClick={() => setSelectedAddons(prev => ({
                  ...prev,
                  [addon.id]: !prev[addon.id]
                }))}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className={`font-semibold ${
                      isSelected ? 'text-blue-700' : 'text-gray-900'
                    }`}>
                      {addon.title}
                    </h3>
                    <p className="text-sm text-gray-600">{addon.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-600">
                      ฿{formatPrice(addon.price)}
                    </div>
                    {addon.originalPrice && (
                      <div className="text-xs text-gray-500 line-through">
                        ฿{formatPrice(addon.originalPrice)}
                      </div>
                    )}
                    {addon.savings && (
                      <div className="text-xs text-green-600">
                        {addon.savings}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-xs px-2 py-1 rounded ${
                    badgeColors[addon.badgeColor as keyof typeof badgeColors]
                  }`}>
                    {addon.badge}
                  </span>
                  <button 
                    className={`text-sm font-medium px-3 py-1 rounded-md transition-colors ${
                      isSelected 
                        ? 'text-blue-700 bg-blue-100' 
                        : 'text-blue-600 hover:text-blue-700 hover:bg-blue-50'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedAddons(prev => ({
                        ...prev,
                        [addon.id]: !prev[addon.id]
                      }))
                    }}
                  >
                    {isSelected ? '✓ เลือกแล้ว' : '+ เพิ่ม'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Add-ons Summary */}
        {Object.values(selectedAddons).some(Boolean) && (
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h4 className="font-semibold text-blue-800 mb-3">✨ บริการเสริมที่เลือก</h4>
            <div className="space-y-2">
              {Object.keys(selectedAddons).map(addonId => {
                if (!selectedAddons[addonId]) return null
                const addon = addonsData.find(a => a.id === addonId)
                if (!addon) return null
                
                return (
                  <div key={addonId} className="flex justify-between text-sm">
                    <span className="text-blue-700">{addon.title}</span>
                    <span className="font-semibold text-blue-800">฿{formatPrice(addon.price)} × {bookingData.guests} คน</span>
                  </div>
                )
              })}
              <div className="border-t border-blue-200 pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span className="text-blue-800">รวมบริการเสริม:</span>
                  <span className="text-blue-900">฿{formatPrice(addonsTotal * bookingData.guests)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-4">
      {/* Mobile Title */}
      <div className="lg:hidden">
        <h2 className="text-xl font-bold text-gray-900 mb-1">👤 ข้อมูลผู้จอง</h2>
        <p className="text-sm text-gray-600">กรุณากรอกข้อมูลผู้ติดต่อให้ครบถ้วน</p>
      </div>

      {/* Desktop Title */}
      <div className="hidden lg:block text-center mb-6">
        <h2 className="text-2xl font-bold">ข้อมูลผู้จอง</h2>
      </div>
      

      {/* Customer Info Header */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
        <div className="flex items-center gap-2 mb-1">
          <Mail className="w-4 h-4 text-blue-600" />
          <h3 className="font-semibold text-blue-800">ข้อมูลหลักผู้ติดต่อ</h3>
        </div>
        <p className="text-xs text-blue-600">ข้อมูลนี้จะใช้ในการติดต่อและส่งเอกสารทัวร์</p>
      </div>
      
      {/* Name Fields - Mobile First */}
      <div className="space-y-4 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            ชื่อจริง *
          </label>
          <input
            type="text"
            value={bookingData.firstName || ''}
            onChange={(e) => setBookingData({...bookingData, firstName: e.target.value})}
            className="w-full px-4 py-3 lg:py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base lg:text-lg touch-manipulation bg-white"
            placeholder="ชื่อจริง"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            นามสกุล *
          </label>
          <input
            type="text"
            value={bookingData.lastName || ''}
            onChange={(e) => setBookingData({...bookingData, lastName: e.target.value})}
            className="w-full px-4 py-3 lg:py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base lg:text-lg touch-manipulation bg-white"
            placeholder="นามสกุล"
            required
          />
        </div>
      </div>

      {/* Email & Phone - Mobile First */}
      <div className="space-y-4 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            อีเมล *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="email"
              value={bookingData.email || ''}
              onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
              className="w-full pl-10 pr-4 py-3 lg:py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base lg:text-lg touch-manipulation bg-white"
              placeholder="your@email.com"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            เบอร์โทรศัพท์ *
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="tel"
              value={bookingData.phone || ''}
              onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
              className="w-full pl-10 pr-4 py-3 lg:py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base lg:text-lg touch-manipulation bg-white"
              placeholder="08x-xxx-xxxx"
              maxLength={10}
              required
            />
          </div>
        </div>
      </div>



      {/* Special Requests */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          ความต้องการพิเศษ
        </label>
        <textarea
          value={bookingData.specialRequests || ''}
          onChange={(e) => setBookingData({...bookingData, specialRequests: e.target.value})}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base touch-manipulation bg-white resize-none"
          rows={3}
          placeholder="เช่น อาหารเจ, เตียงแยก, รถเข็น, ความช่วยเหลือพิเศษ ฯลฯ"
        />
        <p className="text-xs text-gray-500 mt-2">💡 เราจะพยายามจัดการตามความต้องการให้มากที่สุด</p>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center mb-6">ยืนยันการจอง</h2>
      
      {/* Booking Summary */}
      <div className="bg-gray-50 rounded-xl p-6 space-y-4">
        <h3 className="font-semibold text-lg">สรุปการจอง</h3>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span>ทัวร์:</span>
            <span className="font-medium">{tour.title}</span>
          </div>
          <div className="flex justify-between">
            <span>วันเดินทาง:</span>
            <span className="font-medium">{formattedDate}</span>
          </div>
          <div className="flex justify-between">
            <span>ผู้เดินทาง:</span>
            <span className="font-medium">{bookingData.guests} คน</span>
          </div>
          <div className="flex justify-between">
            <span>ชื่อผู้จอง:</span>
            <span className="font-medium">{bookingData.firstName} {bookingData.lastName}</span>
          </div>
          <div className="flex justify-between">
            <span>อีเมล:</span>
            <span className="font-medium">{bookingData.email}</span>
          </div>
          <div className="flex justify-between">
            <span>เบอร์โทร:</span>
            <span className="font-medium">{bookingData.phone}</span>
          </div>
        </div>

        <hr className="border-gray-200" />
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>ราคาทัวร์:</span>
            <span className="font-medium">฿{formatPrice(tour.price * bookingData.guests)}</span>
          </div>
          {addonsTotal > 0 && (
            <div className="flex justify-between text-sm">
              <span>บริการเสริม:</span>
              <span className="font-medium text-blue-600">฿{formatPrice(addonsTotal * bookingData.guests)}</span>
            </div>
          )}
          <div className="flex justify-between text-lg border-t border-gray-200 pt-2">
            <span>ราคารวม:</span>
            <span className="font-bold text-blue-600">฿{formatPrice(totalPrice)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>มัดจำวันนี้:</span>
            <span className="font-medium">฿3,000</span>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="space-y-4">
        <label className="block text-sm font-semibold text-gray-700">
          วิธีการชำระเงิน
        </label>
        <div className="space-y-3">
          <div className={`flex items-start p-4 rounded-xl cursor-pointer transition-all ${
            paymentMethod === 'deposit' 
              ? 'border-2 border-blue-200 bg-blue-50' 
              : 'border border-gray-300 bg-gray-50 hover:border-blue-300'
          }`} onClick={() => setPaymentMethod('deposit')}>
            <input 
              type="radio" 
              name="payment" 
              value="deposit" 
              checked={paymentMethod === 'deposit'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-4 mt-1" 
            />
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <CreditCard className={`w-5 h-5 ${
                  paymentMethod === 'deposit' ? 'text-blue-600' : 'text-gray-600'
                }`} />
                <div className={`font-semibold ${
                  paymentMethod === 'deposit' ? 'text-blue-800' : 'text-gray-800'
                }`}>จ่ายมัดจำ ฿3,000 (แนะนำ)</div>
              </div>
              <div className={`text-sm space-y-1 ${
                paymentMethod === 'deposit' ? 'text-blue-600' : 'text-gray-600'
              }`}>
                <div>• ชำระมัดจำเพียง ฿3,000 เพื่อยืนยันการจอง</div>
                <div>• ชำระส่วนที่เหลือก่อนเดินทาง 7 วัน</div>
                <div>• สามารถยกเลิกและขอคืนเงินได้ 100%</div>
              </div>
            </div>
          </div>
          
          <div className={`flex items-start p-4 rounded-xl cursor-pointer transition-all ${
            paymentMethod === 'full' 
              ? 'border-2 border-blue-200 bg-blue-50' 
              : 'border border-gray-300 bg-gray-50 hover:border-blue-300'
          }`} onClick={() => setPaymentMethod('full')}>
            <input 
              type="radio" 
              name="payment" 
              value="full" 
              checked={paymentMethod === 'full'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-4 mt-1" 
            />
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <CreditCard className={`w-5 h-5 ${
                  paymentMethod === 'full' ? 'text-blue-600' : 'text-gray-600'
                }`} />
                <div className={`font-semibold ${
                  paymentMethod === 'full' ? 'text-blue-800' : 'text-gray-800'
                }`}>ชำระเต็มจำนวน</div>
              </div>
              <div className={`text-sm space-y-1 ${
                paymentMethod === 'full' ? 'text-blue-600' : 'text-gray-600'
              }`}>
                <div>• ชำระครั้งเดียว ฿{formatPrice(Math.round(totalPrice * 0.98))}</div>
                <div>• ได้ส่วนลดเพิ่ม 2%</div>
                <div>• ไม่ต้องกังวลเรื่องการชำระในอนาคต</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Payment Methods */}
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
          <h4 className="font-medium text-gray-800 mb-3">ช่องทางการชำระเงิน</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div 
              className={`flex flex-col items-center p-2 rounded-lg border cursor-pointer transition-all ${
                selectedPaymentCard === 'credit' 
                  ? 'bg-blue-50 border-blue-500 border-2' 
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedPaymentCard('credit')}
            >
              <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center mb-1">
                <CreditCard className="w-4 h-4 text-blue-600" />
              </div>
              <span className={selectedPaymentCard === 'credit' ? 'text-blue-600 font-medium' : 'text-gray-700'}>บัตรเครดิต</span>
            </div>
            <div 
              className={`flex flex-col items-center p-2 rounded-lg border cursor-pointer transition-all ${
                selectedPaymentCard === 'transfer' 
                  ? 'bg-blue-50 border-blue-500 border-2' 
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedPaymentCard('transfer')}
            >
              <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center mb-1">
                <span className="text-lg">💰</span>
              </div>
              <span className={selectedPaymentCard === 'transfer' ? 'text-blue-600 font-medium' : 'text-gray-700'}>โอนธนาคาร</span>
            </div>
            <div 
              className={`flex flex-col items-center p-2 rounded-lg border cursor-pointer transition-all ${
                selectedPaymentCard === 'promptpay' 
                  ? 'bg-blue-50 border-blue-500 border-2' 
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedPaymentCard('promptpay')}
            >
              <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center mb-1">
                <span className="text-lg">📱</span>
              </div>
              <span className={selectedPaymentCard === 'promptpay' ? 'text-blue-600 font-medium' : 'text-gray-700'}>PromptPay</span>
            </div>
            <div 
              className={`flex flex-col items-center p-2 rounded-lg border cursor-pointer transition-all ${
                selectedPaymentCard === 'counter' 
                  ? 'bg-blue-50 border-blue-500 border-2' 
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedPaymentCard('counter')}
            >
              <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center mb-1">
                <span className="text-lg">🏪</span>
              </div>
              <span className={selectedPaymentCard === 'counter' ? 'text-blue-600 font-medium' : 'text-gray-700'}>เคาน์เตอร์</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderStep4 = () => (
    <div className="text-center space-y-6">
      {/* Success Icon & Animation */}
      <div className="relative">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto animate-pulse">
          <CheckCircle className="w-16 h-16 text-green-600" />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
          <span className="text-xs">🎉</span>
        </div>
      </div>
      
      <div>
        <h2 className="text-3xl font-bold text-green-600 mb-2">จองสำเร็จแล้ว!</h2>
        <div className="bg-green-50 inline-block px-4 py-2 rounded-full border border-green-200">
          <p className="text-green-700 font-semibold">หมายเลขการจอง: #TW{Date.now().toString().slice(-6)}</p>
        </div>
      </div>

      {/* Booking Summary */}
      <div className="bg-gray-50 rounded-xl p-6 text-left">
        <h3 className="font-semibold text-gray-800 mb-4 text-center">🎯 สรุปการจอง</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">ทัวร์:</span>
            <span className="font-medium text-right flex-1 ml-4">{tour.title}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">ผู้จอง:</span>
            <span className="font-medium">{bookingData.firstName} {bookingData.lastName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">จำนวนผู้เดินทาง:</span>
            <span className="font-medium">{bookingData.guests} คน</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">อีเมล:</span>
            <span className="font-medium">{bookingData.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">เบอร์โทร:</span>
            <span className="font-medium">{bookingData.phone}</span>
          </div>
          <hr className="border-gray-200 my-3" />
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">ราคาทัวร์:</span>
            <span className="font-medium">฿{formatPrice(tour.price * bookingData.guests)}</span>
          </div>
          {addonsTotal > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">บริการเสริม:</span>
              <span className="font-medium text-blue-600">฿{formatPrice(addonsTotal * bookingData.guests)}</span>
            </div>
          )}
          <div className="flex justify-between font-semibold text-lg">
            <span>ราคารวม:</span>
            <span className="text-green-600">฿{formatPrice(Math.round(totalPrice * 0.9))}</span>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-blue-50 rounded-xl p-6 text-left border border-blue-200">
        <h3 className="font-semibold text-blue-800 mb-4 flex items-center justify-center gap-2">
          <Clock className="w-5 h-5" />
          ขั้นตอนต่อไป
        </h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-bold text-blue-600">1</span>
            </div>
            <div>
              <div className="font-medium text-blue-800">อีเมลยืนยันการจอง</div>
              <div className="text-blue-600">ส่งไปที่ {bookingData.email || 'อีเมลที่ระบุ'}</div>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-bold text-blue-600">2</span>
            </div>
            <div>
              <div className="font-medium text-blue-800">ทีมงานติดต่อกลับ</div>
              <div className="text-blue-600">ภายใน 2 ชั่วโมง ทางเบอร์ {bookingData.phone || 'ที่ระบุ'}</div>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-bold text-blue-600">3</span>
            </div>
            <div>
              <div className="font-medium text-blue-800">ชำระเงินมัดจำ</div>
              <div className="text-blue-600">฿3,000 ผ่านช่องทางที่สะดวก</div>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-bold text-blue-600">4</span>
            </div>
            <div>
              <div className="font-medium text-blue-800">เตรียมเอกสารเดินทาง</div>
              <div className="text-blue-600">หนังสือเดินทางที่เหลือวันไม่ต่ำกว่า 6 เดือน</div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 border border-orange-200">
        <h4 className="font-semibold text-orange-800 mb-2">📞 ติดต่อเราได้ตลอด 24 ชม.</h4>
        <div className="flex justify-center space-x-6 text-sm">
          <div className="text-orange-700">📱 LINE: @tourwow</div>
          <div className="text-orange-700">☎️ 02-xxx-xxxx</div>
        </div>
      </div>
    </div>
  )

  return (
    <>
    <div className="fixed inset-0 bg-black bg-opacity-25 z-50">
      {/* Mobile Full Screen Modal */}
      <div className="lg:flex lg:items-center lg:justify-center lg:p-4 h-full">
        <div className="bg-white h-full w-full lg:rounded-2xl lg:shadow-2xl lg:w-full lg:max-w-2xl lg:h-auto lg:max-h-[95vh] flex flex-col">
          {/* Header - Mobile First */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
            <div className="flex items-center space-x-3">
              <button
                onClick={onClose}
                className="lg:hidden w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center touch-manipulation"
              >
                <X className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-lg font-bold">
                  {bookingStep === 4 ? '🎉 จองสำเร็จ!' : '📝 จองทัวร์'}
                </h1>
                {bookingStep < 4 && (
                  <p className="text-sm text-gray-500">ขั้นตอนที่ {bookingStep} จาก 3</p>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="hidden lg:flex w-10 h-10 rounded-full hover:bg-gray-100 items-center justify-center touch-manipulation"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Bar - Mobile */}
          {bookingStep < 4 && (
            <div className="lg:hidden bg-gray-50 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-600">ขั้นตอนที่ {bookingStep}</span>
                <span className="text-xs text-gray-500">{Math.round((bookingStep/3)*100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(bookingStep/3)*100}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Content - Scrollable */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 pb-6">
              {/* Desktop Step Indicator */}
              <div className="hidden lg:block">
                {bookingStep < 4 && renderStepIndicator()}
              </div>
              
              {bookingStep === 1 && renderStep1()}
              {bookingStep === 2 && renderStep2()}
              {bookingStep === 3 && renderStep3()}
              {bookingStep === 4 && renderStep4()}
            </div>
          </div>

          {/* Footer - Mobile Sticky */}
          {bookingStep < 4 && (
            <div className="bg-white border-t border-gray-200 p-4 safe-area-pb">
              <div className="flex space-x-3">
                {bookingStep > 1 && (
                  <button
                    onClick={() => setBookingStep(bookingStep - 1)}
                    className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-200 transition-colors touch-manipulation min-h-[48px] text-sm"
                    disabled={isLoading}
                  >
                    ← กลับ
                  </button>
                )}
                <button
                  onClick={handleNext}
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-bold hover:from-blue-700 hover:to-blue-800 transition-all disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed touch-manipulation min-h-[48px] text-sm shadow-lg"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>กำลังประมวลผล...</span>
                    </div>
                  ) : (
                    <>
                      {bookingStep === 3 ? '🎯 ยืนยันการจอง' : bookingStep === 1 ? 'กรอกข้อมูล →' : 'ถัดไป →'}
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {bookingStep === 4 && (
            <div className="bg-white border-t border-gray-200 p-4 safe-area-pb">
              <button
                onClick={onClose}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-xl font-bold hover:from-green-700 hover:to-green-800 transition-all touch-manipulation min-h-[48px] shadow-lg"
              >
                ✓ เสร็จสิ้น
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  )
}