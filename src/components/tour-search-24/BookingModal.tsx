'use client'

import React, { useState, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight, Calendar, Users, CreditCard, Shield, CheckCircle, AlertCircle, Plus, Minus } from 'lucide-react'

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  tour: any
  selectedDeparture: any
}

export default function BookingModal({ isOpen, onClose, tour, selectedDeparture }: BookingModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedDepartureLocal, setSelectedDepartureLocal] = useState(selectedDeparture)
  const [travelers, setTravelers] = useState({
    adults: 2,
    childrenWithBed: 0,
    childrenNoBed: 0,
    infants: 0
  })
  const [selectedAddons, setSelectedAddons] = useState<{[key: string]: number}>({})
  const [travelerDetails, setTravelerDetails] = useState({
    name: '',
    phone: '',
    email: '',
    fillLater: false
  })
  const [paymentOption, setPaymentOption] = useState('deposit')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (selectedDeparture) {
      setSelectedDepartureLocal(selectedDeparture)
    }
  }, [selectedDeparture])

  if (!isOpen) return null

  const totalTravelers = travelers.adults + travelers.childrenWithBed + travelers.childrenNoBed + travelers.infants
  const basePrice = selectedDepartureLocal?.price || tour?.price_from || 0
  const adultPrice = basePrice
  const childWithBedPrice = Math.round(basePrice * 0.9)
  const childNoBedPrice = Math.round(basePrice * 0.7)
  const infantPrice = Math.round(basePrice * 0.1)

  const subtotal = (
    travelers.adults * adultPrice +
    travelers.childrenWithBed * childWithBedPrice +
    travelers.childrenNoBed * childNoBedPrice +
    travelers.infants * infantPrice
  )

  const addonsTotal = Object.entries(selectedAddons).reduce((total, [code, quantity]) => {
    const addon = tour?.addons?.find(a => a.code === code)
    return total + (addon ? addon.price * quantity : 0)
  }, 0)

  const totalPrice = subtotal + addonsTotal
  const depositAmount = tour?.policies?.deposit || 3000
  const finalAmount = paymentOption === 'deposit' ? depositAmount : totalPrice

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleConfirmBooking = async () => {
    setLoading(true)
    
    // Analytics event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'purchase', {
        transaction_id: `BK${Date.now()}`,
        value: finalAmount,
        currency: 'THB',
        items: [{
          item_id: tour.id,
          item_name: tour.title,
          item_category: 'Tour Package',
          price: finalAmount,
          quantity: totalTravelers
        }]
      })
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setLoading(false)
    setShowSuccess(true)
  }

  const handleTravelerChange = (type: string, increment: boolean) => {
    setTravelers(prev => {
      const newValue = increment ? prev[type] + 1 : Math.max(0, prev[type] - 1)
      return { ...prev, [type]: newValue }
    })
  }

  const handleAddonChange = (code: string, quantity: number) => {
    setSelectedAddons(prev => ({
      ...prev,
      [code]: Math.max(0, quantity)
    }))
  }

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-md w-full p-6 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">จองสำเร็จ!</h3>
          <p className="text-gray-600 mb-4">รหัสการจอง: BK{Date.now()}</p>
          <div className="space-y-3">
            <button
              onClick={() => {
                setShowSuccess(false)
                onClose()
              }}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
            >
              ดูใบจอง
            </button>
            <button
              onClick={() => {
                setShowSuccess(false)
                onClose()
              }}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-lg font-semibold transition-colors"
            >
              ปิด
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      {/* Mobile: Full Screen / Desktop: Modal */}
      <div className="bg-white w-full h-full sm:w-auto sm:h-auto sm:max-w-2xl sm:max-h-[90vh] sm:rounded-xl flex flex-col sm:m-4">
        {/* Mobile-First Header */}
        <div className="flex items-center justify-between p-3 border-b bg-gray-50 sm:rounded-t-xl">
          <div className="flex items-center gap-2">
            {currentStep > 1 && (
              <button onClick={handleBack} className="p-2.5">
                <ChevronLeft className="h-4 w-4" />
              </button>
            )}
            <div>
              <h2 className="text-base font-bold text-gray-900">จองทัวร์</h2>
              <p className="text-xs text-gray-600">ขั้นตอน {currentStep}/2</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2.5">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Mobile Progress Bar */}
        <div className="px-3 py-2 bg-gray-50 border-b">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>ข้อมูล</span>
            <span>ยืนยัน</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-red-600 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 2) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Mobile Content */}
        <div className="flex-1 overflow-y-auto p-3">
          {/* Step 1: Booking Details */}
          {currentStep === 1 && (
            <div className="space-y-6">
              {/* Tour Summary */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex gap-4">
                  <img
                    src={tour.hero_images?.[0]}
                    alt={tour.title}
                    className="w-20 h-16 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{tour.title}</h3>
                    <p className="text-sm text-gray-600">{tour.duration_days} วัน {tour.nights} คืน</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg text-red-600">฿{selectedDepartureLocal?.price?.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">ต่อท่าน</div>
                  </div>
                </div>
              </div>

              {/* Departure Selection */}
              {tour.departures?.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">เลือกวันออกเดินทาง</h4>
                  <div className="space-y-3">
                    {tour.departures.map((departure: any, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedDepartureLocal(departure)}
                        disabled={departure.status === 'soldout'}
                        className={`w-full p-3 rounded-lg border text-left transition-colors ${
                          selectedDepartureLocal?.id === departure.id
                            ? 'border-red-600 bg-red-50'
                            : departure.status === 'soldout'
                            ? 'border-gray-200 bg-gray-50 cursor-not-allowed'
                            : 'border-gray-200 hover:border-red-300'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium text-gray-900">{departure.date_range}</div>
                            <div className="text-sm text-gray-600">
                              {departure.status === 'soldout' ? 'เต็มแล้ว' :
                               departure.status === 'low' ? `เหลือ ${departure.seats_left} ที่นั่ง` :
                               `${departure.seats_left} ที่นั่ง`}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-red-600">฿{departure.price?.toLocaleString()}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Travelers */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">จำนวนผู้เดินทาง</h4>
                <div className="space-y-4">
                  {[
                    { key: 'adults', label: 'ผู้ใหญ่', desc: '12 ปีขึ้นไป', price: adultPrice },
                    { key: 'childrenWithBed', label: 'เด็กมีเตียง', desc: '2-11 ปี', price: childWithBedPrice },
                    { key: 'childrenNoBed', label: 'เด็กไม่มีเตียง', desc: '2-11 ปี', price: childNoBedPrice },
                    { key: 'infants', label: 'ทารก', desc: 'ต่ำกว่า 2 ปี', price: infantPrice }
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">{item.label}</div>
                        <div className="text-sm text-gray-600">{item.desc}</div>
                        <div className="text-sm font-medium text-red-600">฿{item.price.toLocaleString()}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleTravelerChange(item.key, false)}
                          className="w-10 h-10 border rounded-full flex items-center justify-center active:bg-gray-100 transition-colors"
                          disabled={travelers[item.key] <= 0 || (item.key === 'adults' && travelers[item.key] <= 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-10 text-center font-medium">{travelers[item.key]}</span>
                        <button
                          onClick={() => handleTravelerChange(item.key, true)}
                          className="w-10 h-10 border rounded-full flex items-center justify-center active:bg-gray-100 transition-colors"
                          disabled={totalTravelers >= 10}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Details */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">ข้อมูลผู้ติดต่อ</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ชื่อ-นามสกุล *
                    </label>
                    <input
                      type="text"
                      value={travelerDetails.name}
                      onChange={(e) => setTravelerDetails(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="นาย/นาง/นางสาว ชื่อ นามสกุล"
                      disabled={travelerDetails.fillLater}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      เบอร์โทรศัพท์ *
                    </label>
                    <input
                      type="tel"
                      value={travelerDetails.phone}
                      onChange={(e) => setTravelerDetails(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="08XXXXXXXX"
                      disabled={travelerDetails.fillLater}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      อีเมล *
                    </label>
                    <input
                      type="email"
                      value={travelerDetails.email}
                      onChange={(e) => setTravelerDetails(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="example@email.com"
                      disabled={travelerDetails.fillLater}
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="fillLater"
                      checked={travelerDetails.fillLater}
                      onChange={(e) => setTravelerDetails(prev => ({ ...prev, fillLater: e.target.checked }))}
                      className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                    />
                    <label htmlFor="fillLater" className="text-sm text-gray-700">
                      กรอกรายละเอียดทีหลัง (จองด้วยมัดจำก่อน)
                    </label>
                  </div>
                </div>
              </div>

              {/* Add-ons */}
              {tour.addons?.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">บริการเสริม (ไม่บังคับ)</h4>
                  <div className="space-y-3">
                    {tour.addons.map((addon) => (
                      <div key={addon.code} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <div className="font-medium text-gray-900">{addon.label}</div>
                            <div className="text-lg font-bold text-red-600">฿{addon.price.toLocaleString()}</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleAddonChange(addon.code, (selectedAddons[addon.code] || 0) - 1)}
                              className="w-10 h-10 border rounded-full flex items-center justify-center active:bg-gray-100"
                              disabled={(selectedAddons[addon.code] || 0) <= 0}
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-10 text-center font-medium">{selectedAddons[addon.code] || 0}</span>
                            <button
                              onClick={() => handleAddonChange(addon.code, (selectedAddons[addon.code] || 0) + 1)}
                              className="w-10 h-10 border rounded-full flex items-center justify-center active:bg-gray-100"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Payment & Confirmation */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">สรุปการจองและชำระเงิน</h3>
              
              {/* Booking Summary */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">ทัวร์</h4>
                  <p className="text-sm text-gray-600">{tour.title}</p>
                  <p className="text-sm text-gray-600">{selectedDepartureLocal?.date_range}</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">ผู้เดินทาง</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    {travelers.adults > 0 && <p>ผู้ใหญ่ {travelers.adults} ท่าน</p>}
                    {travelers.childrenWithBed > 0 && <p>เด็กมีเตียง {travelers.childrenWithBed} ท่าน</p>}
                    {travelers.childrenNoBed > 0 && <p>เด็กไม่มีเตียง {travelers.childrenNoBed} ท่าน</p>}
                    {travelers.infants > 0 && <p>ทารก {travelers.infants} ท่าน</p>}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">สรุปราคา</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">ค่าทัวร์</span>
                      <span>฿{subtotal.toLocaleString()}</span>
                    </div>
                    {addonsTotal > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">บริการเสริม</span>
                        <span>฿{addonsTotal.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-bold text-base pt-2 border-t">
                      <span>รวมทั้งสิ้น</span>
                      <span className="text-red-600">฿{totalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Options */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">เลือกการชำระ</h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="paymentOption"
                      value="deposit"
                      checked={paymentOption === 'deposit'}
                      onChange={(e) => setPaymentOption(e.target.value)}
                      className="w-4 h-4 text-red-600"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">ชำระมัดจำ (แนะนำ)</div>
                      <div className="text-sm text-gray-600">ชำระ ฿{depositAmount.toLocaleString()} วันนี้ ส่วนที่เหลือชำระก่อนเดินทาง</div>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="paymentOption"
                      value="full"
                      checked={paymentOption === 'full'}
                      onChange={(e) => setPaymentOption(e.target.value)}
                      className="w-4 h-4 text-red-600"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">ชำระเต็มจำนวน</div>
                      <div className="text-sm text-gray-600">ชำระ ฿{totalPrice.toLocaleString()} เลย</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">วิธีการชำระ</h4>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { key: 'credit', label: 'บัตรเครดิต/เดบิต', desc: 'Visa, Mastercard, JCB' },
                    { key: 'transfer', label: 'โอนเงิน', desc: 'PromptPay, โอนผ่านธนาคาร' },
                    { key: 'installment', label: 'ผ่อนชำระ 0%', desc: '3-6 เดือน (บัตรเครดิตเท่านั้น)' }
                  ].map((method) => (
                    <label key={method.key} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.key}
                        checked={paymentMethod === method.key}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-red-600"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 text-sm">{method.label}</div>
                        <div className="text-xs text-gray-600">{method.desc}</div>
                      </div>
                      <CreditCard className="h-4 w-4 text-gray-400" />
                    </label>
                  ))}
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="acceptTerms"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500 mt-1"
                />
                <label htmlFor="acceptTerms" className="text-sm text-gray-700">
                  ข้าพเจ้ายอมรับ
                  <a href="#" className="text-red-600 hover:underline mx-1">เงื่อนไขการใช้งาน</a>
                  และ
                  <a href="#" className="text-red-600 hover:underline mx-1">นโยบายความเป็นส่วนตัว</a>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Footer */}
        <div className="p-3 border-t bg-gray-50 sm:rounded-b-xl">
          <div className="flex justify-between items-center gap-3">
            <div className="text-xs text-gray-600 min-w-0">
              {currentStep < 2 ? (
                <div>
                  <div>รวม {totalTravelers || 0} ท่าน</div>
                  <div className="font-bold">฿{totalPrice.toLocaleString()}</div>
                </div>
              ) : (
                <div>
                  <div>ยอดชำระ</div>
                  <div className="font-bold text-red-600">฿{finalAmount.toLocaleString()}</div>
                </div>
              )}
            </div>
            
            <div className="flex gap-2 flex-shrink-0">
              {currentStep > 1 && (
                <button
                  onClick={handleBack}
                  className="px-3 py-2 bg-gray-200 text-gray-800 rounded text-sm font-medium"
                >
                  ย้อน
                </button>
              )}
              
              {currentStep < 2 ? (
                <button
                  onClick={handleNext}
                  className="px-4 py-2 bg-red-600 text-white rounded text-sm font-bold"
                  disabled={
                    (!travelerDetails.fillLater && (!travelerDetails.name || !travelerDetails.phone || !travelerDetails.email))
                  }
                >
                  ต่อไป
                </button>
              ) : (
                <button
                  onClick={handleConfirmBooking}
                  disabled={!acceptTerms || !paymentMethod || loading}
                  className="px-4 py-2 bg-red-600 disabled:bg-gray-400 text-white rounded text-sm font-bold flex items-center gap-1"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-3 w-3 border border-white border-t-transparent"></div>
                      จอง...
                    </>
                  ) : (
                    'ยืนยันจอง'
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}