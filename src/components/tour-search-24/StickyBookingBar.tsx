'use client'

import React from 'react'
import { Calendar, Users, Phone } from 'lucide-react'

interface StickyBookingBarProps {
  tour: any
  selectedDeparture: any
  flashSaleTimeLeft?: number
  onBooking: () => void
}

export default function StickyBookingBar({ tour, selectedDeparture, flashSaleTimeLeft = 0, onBooking }: StickyBookingBarProps) {
  // Debug logging
  console.log('🎯 StickyBookingBar props:', {
    tour: tour?.id,
    selectedDeparture: selectedDeparture ? {
      id: selectedDeparture.id,
      date_range: selectedDeparture.date_range,
      price: selectedDeparture.price
    } : null
  })

  return (
    <>
      {/* Mobile Sticky Bar - Simplified */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        {/* Flash Sale Alert - Mobile */}
        {flashSaleTimeLeft > 0 && (
          <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-4 py-2 text-center">
            <div className="flex items-center justify-center gap-2">
              <span className="text-xs font-bold animate-pulse">⚡ Flash Sale ลด 15%</span>
              <span className="text-xs bg-black/30 px-2 py-0.5 rounded font-mono">
                {Math.floor(flashSaleTimeLeft / 3600).toString().padStart(2, '0')}:
                {Math.floor((flashSaleTimeLeft % 3600) / 60).toString().padStart(2, '0')}:
                {(flashSaleTimeLeft % 60).toString().padStart(2, '0')}
              </span>
            </div>
          </div>
        )}
        
        <div className="p-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="text-xs text-gray-600 mb-1 truncate">
                {selectedDeparture?.date_range || tour?.departures?.[0]?.date_range || 'เลือกวัน'}
              </div>
              <div className="flex items-center gap-2">
                {flashSaleTimeLeft > 0 && (
                  <span className="text-xs line-through text-gray-400">
                    ฿{Math.round((selectedDeparture?.price || tour?.price_from || 0) * 1.15)?.toLocaleString()}
                  </span>
                )}
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-bold text-gray-900">
                    ฿{selectedDeparture?.price?.toLocaleString() || tour?.departures?.[0]?.price?.toLocaleString() || tour?.price_from?.toLocaleString() || '0'}
                  </span>
                  <span className="text-xs text-gray-600">/ท่าน</span>
                </div>
                {flashSaleTimeLeft > 0 && (
                  <span className="bg-red-500 text-white px-1.5 py-0.5 rounded-full text-xs font-bold">
                    -15%
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex gap-2 flex-shrink-0">
              {/* Quick Call Button */}
              <button 
                aria-label="โทร"
                className="bg-green-600 text-white w-10 h-10 flex items-center justify-center rounded-lg"
              >
                <Phone size={16} />
              </button>
              
              {/* Simple Booking Button */}
              <button
                onClick={onBooking}
                disabled={!selectedDeparture || selectedDeparture?.status === 'soldout'}
                className={`px-4 py-2.5 rounded-lg font-bold text-sm min-w-[100px] ${
                  !selectedDeparture || selectedDeparture?.status === 'soldout'
                    ? 'bg-gray-300 text-gray-500'
                    : selectedDeparture?.seats_left <= 5
                    ? 'bg-red-600 text-white'
                    : 'bg-blue-600 text-white'
                }`}
              >
                {!selectedDeparture ? 'เลือก' :
                 selectedDeparture?.status === 'soldout' ? 'เต็ม' :
                 'จองเลย'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Desktop Sticky Sidebar */}
      <div className="hidden lg:block fixed top-1/2 right-8 transform -translate-y-1/2 w-96 z-40">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200/50 p-6 space-y-6">
          {/* Flash Sale Header - Desktop */}
          {flashSaleTimeLeft > 0 && (
            <div className="bg-red-600 text-white rounded-xl p-4 text-center -m-6 mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="font-bold">⚡ Flash Sale ลด 15%</span>
              </div>
              <div className="bg-black/30 rounded-lg px-3 py-1 inline-block font-mono font-bold text-lg">
                {Math.floor(flashSaleTimeLeft / 3600).toString().padStart(2, '0')}:
                {Math.floor((flashSaleTimeLeft % 3600) / 60).toString().padStart(2, '0')}:
                {(flashSaleTimeLeft % 60).toString().padStart(2, '0')}
              </div>
              <div className="text-xs opacity-90 mt-1">🔥 47 คนกำลังดู</div>
            </div>
          )}
          
          {/* Tour Info */}
          <div className="text-center">
            <h3 className="font-black text-xl text-gray-900 mb-3">จองทัวร์นี้</h3>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-700 mb-4 bg-gray-50 rounded-lg px-3 py-2">
              <Calendar className="h-4 w-4 text-blue-600" />
              <span className="font-medium">{selectedDeparture?.date_range || tour?.departures?.[0]?.date_range || 'เลือกวันเดินทาง'}</span>
            </div>
            
            {/* Price Display */}
            <div className="bg-blue-50 rounded-xl p-4 mb-4">
              {flashSaleTimeLeft > 0 && (
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-lg line-through text-gray-400">
                    ฿{Math.round((selectedDeparture?.price || tour?.departures?.[0]?.price || tour?.price_from || 0) * 1.15)?.toLocaleString()}
                  </span>
                  <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
                    -15%
                  </span>
                </div>
              )}
              <div className="text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1">
                ฿{selectedDeparture?.price?.toLocaleString() || tour?.departures?.[0]?.price?.toLocaleString() || tour?.price_from?.toLocaleString() || '0'}
              </div>
              <div className="text-sm font-medium text-gray-600">ต่อท่าน</div>
            </div>
          </div>

          {/* Urgency Indicators */}
          {selectedDeparture?.seats_left && selectedDeparture.seats_left <= 10 && selectedDeparture.seats_left > 0 && (
            <div className={`border rounded-xl p-4 text-center ${
              selectedDeparture.seats_left <= 3 
                ? 'bg-red-50 border-red-200 text-red-800'
                : selectedDeparture.seats_left <= 5
                ? 'bg-orange-50 border-orange-200 text-orange-800'
                : 'bg-yellow-50 border-yellow-200 text-yellow-800'
            }`}>
              <div className="flex items-center justify-center gap-2 mb-1">
                <Users className="h-5 w-5" />
                <span className="font-bold">เหลือ {selectedDeparture.seats_left} ที่สุดท้าย!</span>
              </div>
              <div className="text-xs opacity-80">มีผู้สนใจ 23 คนกำลังดูทัวร์นี้</div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={onBooking}
              disabled={!selectedDeparture || selectedDeparture?.status === 'soldout'}
              className={`w-full py-4 px-6 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 relative ${
                !selectedDeparture || selectedDeparture?.status === 'soldout'
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : selectedDeparture?.seats_left <= 5
                  ? 'bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white hover:from-red-700 hover:via-red-600 hover:to-red-700 animate-pulse shadow-red-200'
                  : flashSaleTimeLeft > 0
                  ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white hover:from-orange-600 hover:to-red-700 shadow-orange-200'
                  : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-blue-200'
              } hover:shadow-xl hover:scale-105 active:scale-95`}
            >
              {!selectedDeparture ? 'เลือกวันเดินทาง' :
               selectedDeparture?.status === 'soldout' ? 'เต็มแล้ว' :
               selectedDeparture?.seats_left <= 5 ? '🔥 จองด่วน!' : 
               flashSaleTimeLeft > 0 ? '⚡ จองเลย!' : 'จองด่วน'}
               
              {flashSaleTimeLeft > 0 && selectedDeparture?.status !== 'soldout' && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-sm font-bold px-2 py-1 rounded-full animate-bounce shadow-md">
                  -15%
                </span>
              )}
            </button>

            <button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2">
              <Phone className="h-5 w-5" />
              โทรสอบถาม
            </button>
          </div>

          {/* Trust Info */}
          <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
            <div className="text-sm text-gray-700 space-y-1">
              <div className="font-medium">💰 มัดจำเพียง ฿{tour?.policies?.deposit?.toLocaleString()}</div>
              <div className="text-xs text-gray-600">{tour?.policies?.cancellation}</div>
              <div className="text-xs text-green-600 font-medium pt-2 border-t border-gray-200">
                ✅ ปลอดภัย 100% • บริการ 24/7
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}