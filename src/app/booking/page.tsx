'use client'

import { useState, useMemo } from 'react'
import { useLoading } from '@/components/LoadingProvider';
import { tours } from '@/lib/tour-data'
import { Calendar, Users, MapPin, CreditCard, Shield, CheckCircle, ArrowRight, ArrowLeft, AlertTriangle } from 'lucide-react'
import Image from 'next/image'

function BookingContent() {
  const [formData, setFormData] = useState({
    tourId: '',
    fullName: '',
    email: '',
    phone: '',
    travelers: 1,
    date: '',
    specialRequests: ''
  })
  const [step, setStep] = useState(1)
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null)
  const { showLoading, hideLoading } = useLoading()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    showLoading('กำลังดำเนินการจอง...')

    try {
      // Simulate booking process with a random outcome
      await new Promise(resolve => setTimeout(resolve, 2000))
      if (Math.random() > 0.1) { // 90% success rate
        setSubmitStatus('success')
      } else {
        throw new Error("Random booking failure");
      }
      setStep(4)
    } catch (error) {
      console.error("Booking failed:", error)
      setSubmitStatus('error')
      setStep(4) // Go to final step to show error
    } finally {
      hideLoading()
    }
  }

  const selectedTour = useMemo(() => tours.find(tour => tour.id === formData.tourId), [formData.tourId]);
  const totalPrice = useMemo(() => selectedTour ? selectedTour.price * formData.travelers : 0, [selectedTour, formData.travelers]);
  const taxAndFees = useMemo(() => totalPrice * 0.07, [totalPrice]); // Example tax rate 7%
  const finalPrice = useMemo(() => totalPrice + taxAndFees, [totalPrice, taxAndFees]);

  const nextStep = () => {
    if (step === 1 && !formData.tourId) {
      alert('กรุณาเลือกแพ็กเกจทัวร์');
      return;
    }
    if (step === 2 && (!formData.fullName || !formData.email || !formData.phone)) {
      alert('กรุณากรอกข้อมูลผู้เดินทางให้ครบถ้วน');
      return;
    }
    if (step < 4) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }
  
  const bookingSteps = [
    { id: 1, name: 'เลือกทัวร์' },
    { id: 2, name: 'ข้อมูลผู้เดินทาง' },
    { id: 3, name: 'ยืนยันและชำระเงิน' },
    { id: 4, name: 'เสร็จสิ้น' }
  ];

  return (
    <main className="bg-blue-50">
        <section className="relative py-20 bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1523908511403-7fc7b25592f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
              alt="Booking with TourWow"
              fill
              className="object-cover opacity-20"
            />
          </div>
          <div className="relative container mx-auto px-4 text-center z-10">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-3">ขั้นตอนการจองทัวร์</h1>
            <p className="text-lg md:text-xl text-blue-100">ง่าย ปลอดภัย และเชื่อถือได้ใน 3 ขั้นตอน</p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-center mb-12">
              {bookingSteps.map((s, index) => (
                <div key={s.id} className="flex items-center">
                  <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300
                    ${step >= s.id ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-500'}
                  `}>
                    {step > s.id || (s.id === 4 && submitStatus === 'success') ? (
                      <CheckCircle className="w-7 h-7" />
                    ) : (
                      s.id
                    )}
                  </div>
                  <p className={`ml-3 mr-6 font-semibold hidden sm:block ${step >= s.id ? 'text-blue-700' : 'text-gray-500'}`}>{s.name}</p>
                  
                  {index < bookingSteps.length - 2 && (
                    <div className={`flex-1 h-1 transition-all duration-300 hidden sm:block ${
                      step > s.id ? 'bg-blue-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10 min-h-[400px]">
              {step === 1 && (
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-6">ขั้นตอนที่ 1: เลือกแพ็กเกจทัวร์</h2>
                  {tours && tours.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {tours.map(tour => (
                        <div
                          key={tour.id}
                          onClick={() => setFormData(prev => ({ ...prev, tourId: tour.id, travelers: 1 }))}
                          className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-300 flex items-start gap-4 ${
                            formData.tourId === tour.id
                              ? 'border-blue-600 bg-blue-50 shadow-md scale-105'
                              : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                          }`}
                        >
                          <Image
                              src={tour.image}
                              alt={tour.title}
                              width={100}
                              height={100}
                              className="rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <h3 className="font-bold text-lg text-blue-900">{tour.title}</h3>
                              <p className="text-sm text-gray-600 flex items-center mt-1"><MapPin className="w-4 h-4 mr-1"/>{tour.location}</p>
                              <p className="text-lg font-bold text-blue-600 mt-2">฿{tour.price.toLocaleString()} / ท่าน</p>
                            </div>
                            {formData.tourId === tour.id && <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0"/>}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <h3 className="text-xl font-semibold">ขออภัย</h3>
                      <p>ไม่พบแพ็กเกจทัวร์ที่สามารถจองได้ในขณะนี้</p>
                    </div>
                  )}
                  {formData.tourId && (
                    <div className="mt-8 flex justify-end">
                      <button
                        onClick={nextStep}
                        className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-lg"
                      >
                        ถัดไป <ArrowRight className="w-5 h-5"/>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-6">ขั้นตอนที่ 2: กรอกข้อมูลผู้เดินทาง</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-gray-700 font-semibold mb-2">ชื่อ-นามสกุล (ผู้ติดต่อหลัก)</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="กรอกชื่อ-นามสกุล"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">อีเมล</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="example@email.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">เบอร์โทรศัพท์</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="08xxxxxxxx"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">จำนวนผู้เดินทาง</label>
                      <select
                        name="travelers"
                        value={formData.travelers}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      >
                        {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
                          <option key={num} value={num}>{num} คน</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">วันเดินทาง (ถ้ามี)</label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-gray-700 font-semibold mb-2">คำขอพิเศษ (ถ้ามี)</label>
                      <textarea
                        name="specialRequests"
                        value={formData.specialRequests}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="เช่น ขออาหารพิเศษ, การเดินทางสำหรับผู้สูงอายุ"
                      />
                    </div>
                  </div>
                  <div className="mt-8 flex justify-between items-center">
                    <button
                      onClick={prevStep}
                      className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2 font-semibold"
                    >
                      <ArrowLeft className="w-5 h-5"/> ย้อนกลับ
                    </button>
                    <button
                      onClick={nextStep}
                      className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-semibold shadow-lg"
                    >
                      ถัดไป <ArrowRight className="w-5 h-5"/>
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && selectedTour && (
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-6">ขั้นตอนที่ 3: ยืนยันข้อมูลและชำระเงิน</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-bold text-lg text-blue-800 mb-3 border-b pb-2">สรุปข้อมูลทัวร์</h3>
                        <div className="flex items-start gap-4">
                          <Image
                            src={selectedTour.image}
                            alt={selectedTour.title}
                            width={120}
                            height={90}
                            className="rounded-lg object-cover"
                          />
                          <div>
                            <h4 className="font-bold text-lg">{selectedTour.title}</h4>
                            <p className="text-gray-600 flex items-center text-sm mt-1"><MapPin className="w-4 h-4 mr-1"/>{selectedTour.location}</p>
                            <p className="text-gray-600 flex items-center text-sm mt-1"><Users className="w-4 h-4 mr-1"/>{selectedTour.duration}</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-bold text-lg text-blue-800 mb-3 border-b pb-2">ข้อมูลผู้เดินทาง</h3>
                        <div className="space-y-2 text-gray-700">
                          <p><span className="font-semibold">ชื่อ-นามสกุล:</span> {formData.fullName}</p>
                          <p><span className="font-semibold">อีเมล:</span> {formData.email}</p>
                          <p><span className="font-semibold">เบอร์โทรศัพท์:</span> {formData.phone}</p>
                          <p><span className="font-semibold">จำนวนผู้เดินทาง:</span> {formData.travelers} คน</p>
                          {formData.date && <p><span className="font-semibold">วันเดินทาง:</span> {new Date(formData.date).toLocaleDateString('th-TH')}</p>}
                          {formData.specialRequests && (
                            <p><span className="font-semibold">คำขอพิเศษ:</span> {formData.specialRequests}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-xl sticky top-6 border border-blue-100">
                        <h3 className="font-bold text-xl text-blue-900 mb-4">สรุปค่าใช้จ่าย</h3>
                        <div className="space-y-3 mb-6">
                          <div className="flex justify-between">
                            <span>ราคาทัวร์ ({selectedTour.price.toLocaleString()} x {formData.travelers})</span>
                            <span>฿{totalPrice.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>ภาษีและค่าบริการ (7%)</span>
                            <span>฿{taxAndFees.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                          </div>
                          <hr className="border-gray-300" />
                          <div className="flex justify-between text-xl font-bold text-blue-700">
                            <span>ยอดรวมทั้งหมด</span>
                            <span>฿{finalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                          </div>
                        </div>

                        <div className="flex items-center mb-4 p-3 bg-blue-100 rounded-lg">
                          <Shield className="w-6 h-6 text-blue-600 mr-3" />
                          <span className="text-sm text-blue-800 font-semibold">ข้อมูลของคุณปลอดภัยและได้รับการเข้ารหัส</span>
                        </div>

                        <form onSubmit={handleSubmit}>
                          <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors font-bold text-lg shadow-lg"
                          >
                            ยืนยันและดำเนินการต่อ
                          </button>
                        </form>
                         <p className="text-xs text-center text-gray-500 mt-3">
                           * ระบบจะจำลองการชำระเงินและแจ้งผลทันที
                         </p>
                    </div>
                  </div>
                  <div className="mt-8 flex justify-start">
                    <button
                      onClick={prevStep}
                      className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2 font-semibold"
                    >
                      <ArrowLeft className="w-5 h-5"/> ย้อนกลับ
                    </button>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="text-center py-8">
                  {submitStatus === 'success' ? (
                    <>
                      <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 ring-4 ring-blue-200">
                        <CheckCircle className="w-12 h-12 text-blue-600" />
                      </div>
                      <h2 className="text-3xl font-bold text-blue-800 mb-4">การจองสำเร็จ!</h2>
                      <p className="text-lg text-gray-700 mb-6 max-w-md mx-auto">
                        ขอบคุณที่ไว้วางใจ TourWow! เราได้ส่งอีเมลยืนยันพร้อมรายละเอียดการจองให้คุณแล้ว
                      </p>
                      <div className="bg-gray-100 p-4 rounded-lg mb-8 inline-block">
                        <h3 className="font-bold text-lg">หมายเลขการจอง: <span className="text-blue-600 font-mono">{Math.random().toString(36).substring(2, 10).toUpperCase()}</span></h3>
                        <p className="text-gray-600 text-sm">โปรดเก็บหมายเลขนี้ไว้เพื่อใช้อ้างอิง</p>
                      </div>
                    </>
                  ) : (
                     <>
                      <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 ring-4 ring-red-200">
                        <AlertTriangle className="w-12 h-12 text-red-600" />
                      </div>
                      <h2 className="text-3xl font-bold text-red-600 mb-4">เกิดข้อผิดพลาด!</h2>
                      <p className="text-lg text-gray-700 mb-6 max-w-md mx-auto">
                        ขออภัย, ระบบไม่สามารถดำเนินการจองของคุณได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง หรือติดต่อฝ่ายบริการลูกค้า
                      </p>
                    </>
                  )}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                    <a
                      href="/"
                      className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                      กลับสู่หน้าหลัก
                    </a>
                    <a
                      href="/contact"
                      className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                    >
                      ติดต่อเรา
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
  )
}

export default function BookingPage() {
  return <BookingContent />;
}