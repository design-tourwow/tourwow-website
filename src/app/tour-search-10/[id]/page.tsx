'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { 
  ArrowLeft, Calendar, Users, Star, Clock, MapPin, 
  Heart, Share2, CheckCircle, Shield, CreditCard,
  AlertCircle, ChevronDown, ChevronUp, X, Camera,
  Phone, MessageCircle, Award, Globe, Wifi, Coffee,
  Navigation, Utensils, Bed, Home, Eye, ThumbsUp,
  PlayCircle, ArrowRight, Copy, Check, HelpCircle,
  Filter, Search, TrendingUp, Sparkles, ChevronLeft
} from 'lucide-react'
import { allTours } from '@/data/tours-data'

// Tour interface
interface Tour {
  id: number
  title: string
  image: string
  price: number
  originalPrice?: number
  duration: string
  rating: number
  reviews: number
  highlights: string[]
  destinations: string[]
  discount?: number
  groupSize: string
  departureDate: string
}

interface DateInfo {
  date: string
  price: number
  available: boolean
}

interface Review {
  id: number
  name: string
  avatar: string
  rating: number
  date: string
  verified: boolean
  comment: string
  images?: string[]
  helpful: number
}

interface FAQ {
  id: number
  question: string
  answer: string
  category: string
}

// Avatar Component
function Avatar({ name, bgColor }: { name: string; bgColor: string }) {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  
  return (
    <div 
      className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg`}
      style={{ backgroundColor: bgColor }}
    >
      {initials}
    </div>
  )
}

// Mock reviews data
const generateReviews = (tourId: number): Review[] => [
  {
    id: 1,
    name: "สมศรี จันทร์งาม",
    avatar: "#4F46E5",
    rating: 5,
    date: "2 สัปดาห์ที่แล้ว",
    verified: true,
    comment: "ทริปดีมากค่ะ ไกด์น่ารัก ดูแลดี อาหารอร่อย โรงแรมสะอาด วิวสวยมาก ถ่ายรูปได้เยอะ แนะนำเลยค่ะ คุ้มค่าคุ้มราคา",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf"
    ],
    helpful: 24
  },
  {
    id: 2,
    name: "วิชัย ใจดี",
    avatar: "#10B981",
    rating: 4,
    date: "1 เดือนที่แล้ว",
    verified: true,
    comment: "โดยรวมดีครับ แต่เวลาค่อนข้างเร่งรีบหน่อย อยากให้มีเวลาเดินเล่นมากกว่านี้ แต่ก็เข้าใจว่าต้องไปหลายที่",
    helpful: 15
  },
  {
    id: 3,
    name: "มาลี รักสนุก",
    avatar: "#EC4899",
    rating: 5,
    date: "1 เดือนที่แล้ว",
    verified: true,
    comment: "สนุกมากๆ เลยค่ะ ทีมงานน่ารัก อาหารอร่อยทุกมื้อ โรงแรมดี ราคาคุ้มค่ามากๆ จะกลับมาใช้บริการอีกแน่นอน",
    images: [
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0"
    ],
    helpful: 32
  },
  {
    id: 4,
    name: "สมชาย ท่องเที่ยว",
    avatar: "#F59E0B",
    rating: 5,
    date: "2 เดือนที่แล้ว",
    verified: false,
    comment: "ประทับใจมากครับ จัดการดีทุกอย่าง ไม่ต้องกังวลอะไรเลย พักผ่อนได้เต็มที่",
    helpful: 8
  }
]

// Mock FAQ data
const generateFAQs = (): FAQ[] => [
  {
    id: 1,
    question: "ต้องจ่ายเงินเมื่อไหร่?",
    answer: "ท่านสามารถจ่ายมัดจำ 50% หลังจากยืนยันการจอง และจ่ายส่วนที่เหลือก่อนเดินทาง 30 วัน",
    category: "การชำระเงิน"
  },
  {
    id: 2,
    question: "สามารถยกเลิกการจองได้ไหม?",
    answer: "สามารถยกเลิกได้โดยไม่มีค่าใช้จ่ายหากยกเลิกก่อนเดินทาง 45 วัน หลังจากนั้นจะมีค่าธรรมเนียมตามเงื่อนไข",
    category: "การยกเลิก"
  },
  {
    id: 3,
    question: "ราคานี้รวมค่าวีซ่าหรือไม่?",
    answer: "ราคาทัวร์ไม่รวมค่าวีซ่า ท่านสามารถให้เราดำเนินการวีซ่าให้ได้โดยมีค่าบริการเพิ่มเติม",
    category: "วีซ่า"
  },
  {
    id: 4,
    question: "มีประกันการเดินทางให้หรือไม่?",
    answer: "ราคาทัวร์รวมประกันการเดินทางพื้นฐานแล้ว ท่านสามารถซื้อประกันเพิ่มเติมได้",
    category: "ประกัน"
  },
  {
    id: 5,
    question: "เด็กอายุเท่าไหร่จ่ายราคาเต็ม?",
    answer: "เด็กอายุต่ำกว่า 2 ปี ฟรี, 2-12 ปี ลด 25%, 12 ปีขึ้นไป ราคาเต็ม",
    category: "ราคา"
  }
]

// Mock image gallery
const generateImageGallery = (baseImage: string, title: string) => [
  { id: 1, url: baseImage, title: `${title} - ภาพหลัก` },
  { id: 2, url: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0", title: "ทิวทัศน์สวยงาม" },
  { id: 3, url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e", title: "สถานที่น่าเที่ยว" },
  { id: 4, url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4", title: "กิจกรรมสนุก" },
  { id: 5, url: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf", title: "วัฒนธรรมท้องถิ่น" },
  { id: 6, url: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b", title: "อาหารอร่อย" },
]

// Mock tour details
const generateTourDetails = (tour: Tour) => ({
  overview: "เที่ยวชมสถานที่สำคัญและสัมผัสวัฒนธรรมท้องถิ่น พร้อมไกด์มืออาชีพคอยให้บริการตลอดการเดินทาง ทัวร์นี้ออกแบบมาเพื่อให้นักเดินทางได้สัมผัสประสบการณ์ที่ยากลืมและสร้างความทรงจำดีๆ",
  included: [
    "ตั๋วเครื่องบินไป-กลับ",
    "ที่พักตามโปรแกรม",
    "อาหารตามโปรแกรม",
    "ค่าเข้าชมสถานที่ต่างๆ",
    "รถโค้ชปรับอากาศ",
    "ไกด์ท้องถิ่นมืออาชีพ",
    "ประกันการเดินทาง"
  ],
  excluded: [
    "ค่าทิป",
    "ค่าใช้จ่ายส่วนตัว",
    "อาหารและเครื่องดื่มที่ไม่ได้ระบุ",
    "ค่าวีซ่า (ถ้ามี)",
    "ค่าใช้จ่ายเพิ่มเติมจากการแก้ไขโปรแกรม"
  ],
  itinerary: [
    {
      day: 1,
      title: "วันแรก - เดินทางถึงจุดหมาย",
      activities: [
        "เดินทางจากประเทศไทย",
        "เช็คอินที่พัก",
        "ทานอาหารเย็น",
        "พักผ่อน"
      ]
    },
    {
      day: 2,
      title: "วันที่สอง - ชมเมืองและสถานที่สำคัญ",
      activities: [
        "ทานอาหารเช้า",
        "ชมสถานที่สำคัญ",
        "ทานอาหารกลางวัน",
        "เดินชมเมือง",
        "ทานอาหารเย็น"
      ]
    },
    {
      day: 3,
      title: "วันสุดท้าย - ช้อปปิ้งและเดินทางกลับ",
      activities: [
        "ทานอาหารเช้า",
        "เวลาอิสระช้อปปิ้ง",
        "เดินทางสู่สนามบิน",
        "เดินทางกลับประเทศไทย"
      ]
    }
  ]
})

// Loading Skeleton Component
function ImageSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-[60vh] bg-gray-200 relative">
        <div className="absolute bottom-4 right-4 bg-gray-300 rounded-full h-10 w-32" />
      </div>
    </div>
  )
}

// Share Modal Component
function ShareModal({ isOpen, onClose, tour }: {
  isOpen: boolean
  onClose: () => void
  tour: Tour
}) {
  const [copied, setCopied] = useState(false)
  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [isOpen])

  if (!isOpen) return null

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareOptions = [
    { 
      name: 'Line', 
      icon: '📱', 
      color: 'bg-green-500',
      action: () => window.open(`https://line.me/R/msg/text/?${encodeURIComponent(tour.title + ' ' + shareUrl)}`)
    },
    { 
      name: 'Facebook', 
      icon: '👤', 
      color: 'bg-blue-600',
      action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`)
    },
    { 
      name: 'X (Twitter)', 
      icon: '🐦', 
      color: 'bg-black',
      action: () => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(tour.title)}`)
    },
    { 
      name: 'WhatsApp', 
      icon: '💬', 
      color: 'bg-green-600',
      action: () => window.open(`https://wa.me/?text=${encodeURIComponent(tour.title + ' ' + shareUrl)}`)
    }
  ]

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 animate-in slide-in-from-bottom duration-300">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">แชร์ทัวร์นี้</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          {shareOptions.map((option) => (
            <button
              key={option.name}
              onClick={option.action}
              className="flex flex-col items-center gap-2 p-3 hover:bg-gray-50 rounded-xl transition-colors"
            >
              <div className={`w-12 h-12 ${option.color} rounded-full flex items-center justify-center text-white text-xl`}>
                {option.icon}
              </div>
              <span className="text-xs text-gray-600">{option.name}</span>
            </button>
          ))}
        </div>

        <div className="border-t pt-4">
          <p className="text-sm text-gray-600 mb-3">หรือคัดลอกลิงก์</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="flex-1 px-3 py-2 bg-gray-100 rounded-lg text-sm text-gray-600"
            />
            <button
              onClick={handleCopy}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                copied 
                  ? 'bg-green-500 text-white' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Image Gallery Modal Component
function ImageGalleryModal({ isOpen, onClose, images, currentIndex, onIndexChange }: {
  isOpen: boolean
  onClose: () => void
  images: Array<{ id: number, url: string, title: string }>
  currentIndex: number
  onIndexChange: (index: number) => void
}) {
  const [imageLoading, setImageLoading] = useState(true)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [isOpen])

  useEffect(() => {
    setImageLoading(true)
  }, [currentIndex])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/60 to-transparent">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={onClose}
            className="text-white p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <span className="text-white font-medium">
            {currentIndex + 1} / {images.length}
          </span>
        </div>
      </div>

      {/* Main Image */}
      <div className="relative w-full h-full flex items-center justify-center">
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white" />
          </div>
        )}
        <Image
          src={images[currentIndex]?.url || '/plane.svg'}
          alt={images[currentIndex]?.title || 'Tour image'}
          fill
          className={`object-contain transition-opacity duration-300 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
          priority
          onLoad={() => setImageLoading(false)}
        />
        
        {/* Navigation Arrows */}
        <button
          onClick={() => onIndexChange(currentIndex > 0 ? currentIndex - 1 : images.length - 1)}
          className="absolute left-4 text-white p-3 hover:bg-white/20 rounded-full transition-all hover:scale-110"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => onIndexChange(currentIndex < images.length - 1 ? currentIndex + 1 : 0)}
          className="absolute right-4 text-white p-3 hover:bg-white/20 rounded-full transition-all hover:scale-110"
        >
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
        <h3 className="text-white text-lg font-semibold">{images[currentIndex]?.title}</h3>
      </div>

      {/* Thumbnail Strip */}
      <div className="absolute bottom-20 left-0 right-0">
        <div className="flex gap-2 px-4 overflow-x-auto scrollbar-hide">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => onIndexChange(index)}
              className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all transform hover:scale-110 ${
                index === currentIndex ? 'border-white' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <Image
                src={image.url}
                alt={image.title}
                width={64}
                height={48}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// Contact Info interface
interface ContactInfo {
  name: string
  email: string
  phone: string
  lineId?: string
  specialRequests?: string
}

// Booking Modal Component
function BookingModal({ isOpen, onClose, tour, onConfirm }: {
  isOpen: boolean
  onClose: () => void
  tour: Tour
  onConfirm: (data: any) => void
}) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [travelers, setTravelers] = useState(1)
  const [step, setStep] = useState(1) // 3 steps: 1 = Date+Travelers, 2 = Contact Info, 3 = Confirmation
  const [animating, setAnimating] = useState(false)
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    name: '',
    email: '',
    phone: '',
    lineId: '',
    specialRequests: ''
  })

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setAnimating(true)
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [isOpen])

  if (!isOpen) return null

  const availableDates: DateInfo[] = [
    { date: "2024-08-15", price: tour.price, available: true },
    { date: "2024-08-22", price: tour.price + 2000, available: true },
    { date: "2024-08-29", price: tour.price, available: false },
    { date: "2024-09-05", price: tour.price + 3000, available: true },
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('th-TH', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const totalPrice = selectedDate ? 
    (availableDates.find(d => d.date === selectedDate)?.price || tour.price) * travelers : 0

  const handleStepChange = (newStep: number) => {
    setAnimating(true)
    setTimeout(() => {
      setStep(newStep)
      setAnimating(false)
    }, 150)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className={`absolute inset-x-4 top-8 bottom-8 bg-white rounded-3xl overflow-hidden flex flex-col ${animating ? 'animate-in slide-in-from-bottom' : ''}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-gray-900">จองทัวร์</h2>
            <div className="flex gap-1">
              {[1, 2, 3].map((num) => (
                <div
                  key={num}
                  className={`w-8 h-2 rounded-full transition-all duration-300 ${
                    num <= step ? 'bg-gradient-to-r from-blue-600 to-indigo-600' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {step === 1 && (
            <div className={`space-y-6 ${animating ? 'animate-in fade-in duration-300' : ''}`}>
              {/* Date Selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">เลือกวันที่เดินทาง</h3>
                <div className="space-y-3">
                  {availableDates.map((dateInfo) => (
                    <button
                      key={dateInfo.date}
                      onClick={() => dateInfo.available && setSelectedDate(dateInfo.date)}
                      disabled={!dateInfo.available}
                      className={`w-full p-4 border rounded-2xl text-left transition-all transform hover:scale-[1.02] ${
                        selectedDate === dateInfo.date 
                          ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-md' 
                          : dateInfo.available 
                            ? 'border-gray-200 hover:border-blue-300 bg-white hover:shadow-sm' 
                            : 'border-gray-200 bg-gray-50 opacity-50'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-semibold text-gray-900">
                            {formatDate(dateInfo.date)}
                          </div>
                          <div className="text-sm text-gray-600">
                            ฿{dateInfo.price.toLocaleString()} / คน
                          </div>
                        </div>
                        {dateInfo.available && (
                          <CheckCircle 
                            className={`w-6 h-6 transition-colors ${
                              selectedDate === dateInfo.date ? 'text-blue-500' : 'text-gray-300'
                            }`} 
                          />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Travelers Selection - Show only when date is selected */}
              {selectedDate && (
                <div className="space-y-4 animate-in slide-in-from-bottom duration-300">
                  <h3 className="text-lg font-semibold">จำนวนผู้เดินทาง</h3>
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-gray-900">ผู้เดินทาง</div>
                        <div className="text-sm text-gray-600">ผู้ใหญ่ (อายุ 12 ปีขึ้นไป)</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => setTravelers(Math.max(1, travelers - 1))}
                          className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-blue-500 hover:text-blue-600 transition-all hover:scale-110"
                        >
                          -
                        </button>
                        <span className="text-xl font-bold text-gray-900 w-8 text-center animate-in zoom-in">
                          {travelers}
                        </span>
                        <button
                          onClick={() => setTravelers(travelers + 1)}
                          className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-blue-500 hover:text-blue-600 transition-all hover:scale-110"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Real-time Total Price */}
                  <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                    <div className="flex items-center justify-between">
                      <div className="text-gray-700">
                        <div className="text-sm">ราคาต่อคน: ฿{(availableDates.find(d => d.date === selectedDate)?.price || tour.price).toLocaleString()}</div>
                        <div className="text-sm">จำนวน: {travelers} คน</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">ราคารวม</div>
                        <div className="text-2xl font-bold text-blue-600 animate-in zoom-in">
                          ฿{totalPrice.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div className={`space-y-6 ${animating ? 'animate-in fade-in duration-300' : ''}`}>
              <h3 className="text-lg font-semibold">ข้อมูลผู้ติดต่อ</h3>
              <div className="space-y-4">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ชื่อ-นามสกุล <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={contactInfo.name}
                    onChange={(e) => setContactInfo({...contactInfo, name: e.target.value})}
                    placeholder="กรอกชื่อ-นามสกุล"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    อีเมล <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                    placeholder="example@email.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                  />
                </div>

                {/* Phone Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    เบอร์โทรศัพท์ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                    placeholder="08X-XXX-XXXX"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                  />
                </div>

                {/* Line ID Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Line ID <span className="text-gray-400">(ไม่บังคับ)</span>
                  </label>
                  <input
                    type="text"
                    value={contactInfo.lineId}
                    onChange={(e) => setContactInfo({...contactInfo, lineId: e.target.value})}
                    placeholder="@your-line-id"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-1">เพื่อความสะดวกในการติดต่อ</p>
                </div>

                {/* Special Requests */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ความต้องการพิเศษ <span className="text-gray-400">(ไม่บังคับ)</span>
                  </label>
                  <textarea
                    value={contactInfo.specialRequests}
                    onChange={(e) => setContactInfo({...contactInfo, specialRequests: e.target.value})}
                    placeholder="เช่น อาหารแพ้, ความต้องการด้านที่พัก, หรือข้อมูลเพิ่มเติมอื่นๆ"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all resize-none"
                  />
                </div>
              </div>

              {/* Current Booking Summary */}
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                <h4 className="font-semibold text-blue-900 mb-3">สรุปการจอง</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-700">วันที่เดินทาง</span>
                    <span className="font-medium text-blue-900">{selectedDate && formatDate(selectedDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">จำนวนผู้เดินทาง</span>
                    <span className="font-medium text-blue-900">{travelers} คน</span>
                  </div>
                  <div className="border-t border-blue-200 pt-2">
                    <div className="flex justify-between">
                      <span className="font-semibold text-blue-900">ราคารวม</span>
                      <span className="font-bold text-blue-600 text-lg">฿{totalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className={`space-y-6 ${animating ? 'animate-in fade-in duration-300' : ''}`}>
              <h3 className="text-lg font-semibold">ยืนยันการจอง</h3>
              
              {/* Tour Info */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">{tour.title}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Tour Details */}
                  <div className="space-y-3">
                    <h5 className="font-medium text-gray-800">รายละเอียดทัวร์</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">วันที่เดินทาง</span>
                        <span className="font-medium">{selectedDate && formatDate(selectedDate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">จำนวนผู้เดินทาง</span>
                        <span className="font-medium">{travelers} คน</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">ราคาต่อคน</span>
                        <span className="font-medium">฿{(availableDates.find(d => d.date === selectedDate)?.price || tour.price).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Contact Details */}
                  <div className="space-y-3">
                    <h5 className="font-medium text-gray-800">ข้อมูลผู้ติดต่อ</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">ชื่อ</span>
                        <span className="font-medium">{contactInfo.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">อีเมล</span>
                        <span className="font-medium text-xs">{contactInfo.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">โทร</span>
                        <span className="font-medium">{contactInfo.phone}</span>
                      </div>
                      {contactInfo.lineId && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Line ID</span>
                          <span className="font-medium">{contactInfo.lineId}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Special Requests */}
                {contactInfo.specialRequests && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h5 className="font-medium text-gray-800 mb-2">ความต้องการพิเศษ</h5>
                    <p className="text-sm text-gray-700 bg-white/50 p-3 rounded-lg">
                      {contactInfo.specialRequests}
                    </p>
                  </div>
                )}

                {/* Total Price */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-xl font-bold text-blue-600">
                    <span>ราคารวมทั้งหมด</span>
                    <span className="animate-in zoom-in">฿{totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Important Note */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 animate-in slide-in-from-bottom">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div className="text-sm text-yellow-800">
                    <strong>หมายเหตุสำคัญ:</strong> การจองนี้จะต้องได้รับการยืนยันจากทีมงาน 
                    เราจะติดต่อกลับภายใน 24 ชั่วโมง ผ่านช่องทางที่ท่านระบุ
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6">
          <div className="flex items-center justify-between">
            {step > 1 && (
              <button
                onClick={() => handleStepChange(step - 1)}
                className="px-6 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition-all hover:scale-105"
              >
                ย้อนกลับ
              </button>
            )}
            <div className="flex-1" />
            
            {/* Dynamic button based on step and validation */}
            <button
              onClick={() => {
                if (step === 1 && selectedDate) {
                  handleStepChange(2)
                } else if (step === 2 && contactInfo.name && contactInfo.email && contactInfo.phone) {
                  handleStepChange(3)
                } else if (step === 3) {
                  onConfirm({ 
                    date: selectedDate, 
                    travelers, 
                    totalPrice, 
                    tour,
                    contactInfo 
                  })
                }
              }}
              disabled={
                (step === 1 && !selectedDate) ||
                (step === 2 && (!contactInfo.name || !contactInfo.email || !contactInfo.phone))
              }
              className={`px-8 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                ((step === 1 && !selectedDate) ||
                (step === 2 && (!contactInfo.name || !contactInfo.email || !contactInfo.phone)))
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg'
              }`}
            >
              {step === 1 ? 'ต่อไป' : step === 2 ? 'ต่อไป' : 'ยืนยันการจอง'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Reviews Section Component
function ReviewsSection({ reviews, tourRating }: { reviews: Review[], tourRating: number }) {
  const [filterRating, setFilterRating] = useState<number | null>(null)
  const [sortBy, setSortBy] = useState<'recent' | 'helpful'>('recent')
  const [showImageModal, setShowImageModal] = useState<string | null>(null)

  const filteredReviews = filterRating 
    ? reviews.filter(r => r.rating === filterRating)
    : reviews

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === 'helpful') return b.helpful - a.helpful
    return 0
  })

  const ratingCounts = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length,
    percentage: (reviews.filter(r => r.rating === rating).length / reviews.length) * 100
  }))

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">รีวิวจากผู้เดินทาง</h2>
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-400 fill-current" />
          <span className="font-bold text-lg">{tourRating.toFixed(1)}</span>
          <span className="text-gray-600">({reviews.length} รีวิว)</span>
        </div>
      </div>

      {/* Rating Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-2">
          {ratingCounts.map(({ rating, count, percentage }) => (
            <div key={rating} className="flex items-center gap-3">
              <div className="flex items-center gap-1 w-20">
                <span className="text-sm font-medium">{rating}</span>
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
              </div>
              <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-sm text-gray-600 w-12 text-right">{count}</span>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">กรองรีวิว:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterRating(null)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                filterRating === null 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              ทั้งหมด
            </button>
            {[5, 4, 3, 2, 1].map(rating => (
              <button
                key={rating}
                onClick={() => setFilterRating(rating)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all flex items-center gap-1 ${
                  filterRating === rating 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {rating} <Star className="w-3 h-3 fill-current" />
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-sm font-medium text-gray-700">เรียงตาม:</span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'recent' | 'helpful')}
              className="text-sm border border-gray-200 rounded-lg px-3 py-1"
            >
              <option value="recent">ล่าสุด</option>
              <option value="helpful">เป็นประโยชน์</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {sortedReviews.map((review) => (
          <div key={review.id} className="border-t pt-4">
            <div className="flex items-start gap-4">
              <Avatar 
                name={review.name} 
                bgColor={review.avatar}
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-gray-900">{review.name}</h4>
                    {review.verified && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                        ✓ ซื้อแล้ว
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-3">{review.comment}</p>
                
                {review.images && review.images.length > 0 && (
                  <div className="flex gap-2 mb-3">
                    {review.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setShowImageModal(img)}
                        className="relative w-20 h-20 rounded-lg overflow-hidden hover:opacity-80 transition-opacity"
                      >
                        <Image src={img} alt="" fill className="object-cover" />
                      </button>
                    ))}
                  </div>
                )}

                <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  <ThumbsUp className="w-4 h-4" />
                  เป็นประโยชน์ ({review.helpful})
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Image Modal */}
      {showImageModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setShowImageModal(null)}
        >
          <div className="relative max-w-3xl max-h-[80vh]">
            <Image 
              src={showImageModal} 
              alt="Review image" 
              width={800} 
              height={600} 
              className="object-contain"
            />
            <button 
              onClick={() => setShowImageModal(null)}
              className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full hover:bg-black/70"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// FAQ Section Component
function FAQSection({ faqs }: { faqs: FAQ[] }) {
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredFAQs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const categories = [...new Set(faqs.map(f => f.category))]

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <HelpCircle className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-bold text-gray-900">คำถามที่พบบ่อย</h2>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="ค้นหาคำถาม..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
        />
      </div>

      {/* FAQ List */}
      <div className="space-y-3">
        {filteredFAQs.map((faq) => (
          <div 
            key={faq.id}
            className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all"
          >
            <button
              onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start gap-3 text-left">
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium mt-0.5">
                  {faq.category}
                </span>
                <span className="font-medium text-gray-900">{faq.question}</span>
              </div>
              <ChevronDown 
                className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                  expandedId === faq.id ? 'rotate-180' : ''
                }`}
              />
            </button>
            {expandedId === faq.id && (
              <div className="px-4 pb-4 text-gray-700 animate-in slide-in-from-top duration-300">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredFAQs.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">ไม่พบคำถามที่ค้นหา</p>
          <button className="text-blue-600 hover:text-blue-700 font-medium">
            ติดต่อเราเพื่อสอบถามเพิ่มเติม →
          </button>
        </div>
      )}
    </div>
  )
}

// Related Tours Component
function RelatedTours({ currentTourId }: { currentTourId: number }) {
  const relatedTours = allTours
    .filter(t => t.id !== currentTourId)
    .slice(0, 4)

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">ทัวร์ที่คุณอาจชอบ</h2>
        <Link 
          href="/tour-search-10"
          className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
        >
          ดูทั้งหมด <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {relatedTours.map((tour) => (
          <Link
            key={tour.id}
            href={`/tour-search-10/${tour.id}`}
            className="group block"
          >
            <div className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative h-48">
                <Image
                  src={tour.image}
                  alt={tour.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {tour.discount && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
                    -{tour.discount}%
                  </div>
                )}
                <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs font-medium">
                  {tour.duration}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {tour.title}
                </h3>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{tour.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">({tour.reviews} รีวิว)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    {tour.originalPrice && (
                      <div className="text-xs text-gray-400 line-through">
                        ฿{tour.originalPrice.toLocaleString()}
                      </div>
                    )}
                    <div className="text-lg font-bold text-blue-600">
                      ฿{tour.price.toLocaleString()}
                    </div>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                    ดูรายละเอียด
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default function TourSearch10DetailPage() {
  const params = useParams()
  const router = useRouter()
  const [tour, setTour] = useState<Tour | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [imageLoading, setImageLoading] = useState(true)
  const [showGallery, setShowGallery] = useState(false)
  const [galleryIndex, setGalleryIndex] = useState(0)
  const [showBooking, setShowBooking] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [expandedSection, setExpandedSection] = useState<string | null>('overview')
  const [isLiked, setIsLiked] = useState(false)
  const [showScrollUp, setShowScrollUp] = useState(false)
  const [isSticky, setIsSticky] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const pricingSectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsLoading(true)
    
    if (!params.id) {
      setTour(null)
      setIsLoading(false)
      return
    }

    const tourId = parseInt(params.id as string)
    
    if (isNaN(tourId)) {
      setTour(null)
      setIsLoading(false)
      return
    }

    const foundTour = allTours.find(t => t.id === tourId)
    setTour(foundTour || null)
    setIsLoading(false)
  }, [params.id])

  // Scroll handler for show/hide scroll-up button and sticky pricing
  useEffect(() => {
    let ticking = false
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setShowScrollUp(window.scrollY > 500)
          
          // Check if pricing section should be sticky
          if (pricingSectionRef.current) {
            const rect = pricingSectionRef.current.getBoundingClientRect()
            const headerHeight = 64 // mobile header height
            // Make it sticky when section bottom goes above the header
            const shouldBeSticky = rect.bottom <= headerHeight
            setIsSticky(shouldBeSticky)
          }
          ticking = false
        })
        ticking = true
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleBookingConfirm = (bookingData: any) => {
    setShowBooking(false)
    // Here you would typically send to backend
    alert('การจองสำเร็จ! ทีมงานจะติดต่อกลับเร็วๆ นี้')
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    // Add heart animation
    if (!isLiked) {
      const heart = document.getElementById('heart-icon')
      heart?.classList.add('animate-ping')
      setTimeout(() => {
        heart?.classList.remove('animate-ping')
      }, 500)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 text-lg animate-pulse">กำลังโหลด...</p>
        </div>
      </div>
    )
  }

  if (!tour) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md mx-auto animate-in fade-in duration-500">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <AlertCircle className="w-10 h-10 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">ไม่พบทัวร์ที่ต้องการ</h1>
          <p className="text-gray-600 mb-8">ขออภัย ไม่พบข้อมูลทัวร์ที่คุณกำลังค้นหา</p>
          <Link
            href="/tour-search-10"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all font-semibold transform hover:scale-105 shadow-lg"
          >
            <ArrowLeft className="w-5 h-5" />
            กลับหน้าหลัก
          </Link>
        </div>
      </div>
    )
  }

  const images = generateImageGallery(tour.image, tour.title)
  const tourDetails = generateTourDetails(tour)
  const reviews = generateReviews(tour.id)
  const faqs = generateFAQs()

  return (
    <>
      <div ref={scrollRef} className="min-h-screen bg-gray-50">
        {/* Mobile Header - Fixed */}
        <div className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-sm border-b border-gray-200 lg:hidden animate-in slide-in-from-top">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-full transition-all hover:scale-110"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={handleLike}
                className={`p-2 rounded-full transition-all hover:scale-110 ${
                  isLiked ? 'text-red-500 bg-red-50' : 'hover:bg-gray-100'
                }`}
              >
                <Heart id="heart-icon" className={`w-6 h-6 transition-all ${isLiked ? 'fill-current' : ''}`} />
              </button>
              <button 
                onClick={() => setShowShare(true)}
                className="p-2 hover:bg-gray-100 rounded-full transition-all hover:scale-110"
              >
                <Share2 className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Hero Image Section - Mobile First */}
        <div className="relative">
          <div className="h-[60vh] relative overflow-hidden">
            {imageLoading && <ImageSkeleton />}
            <Image
              src={tour.image}
              alt={tour.title}
              fill
              className={`object-cover transition-opacity duration-500 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
              priority
              onLoad={() => setImageLoading(false)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Desktop Header */}
            <div className="absolute top-6 left-6 right-6 hidden lg:flex items-center justify-between z-30 animate-in fade-in duration-500">
              <button
                onClick={() => router.back()}
                className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-2xl hover:bg-white/30 transition-all hover:scale-110"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleLike}
                  className={`backdrop-blur-sm p-3 rounded-2xl transition-all hover:scale-110 ${
                    isLiked 
                      ? 'bg-red-500/80 text-white' 
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <Heart className={`w-6 h-6 transition-all ${isLiked ? 'fill-current' : ''}`} />
                </button>
                <button 
                  onClick={() => setShowShare(true)}
                  className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-2xl hover:bg-white/30 transition-all hover:scale-110"
                >
                  <Share2 className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Image Gallery Button */}
            <button
              onClick={() => setShowGallery(true)}
              className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-black/80 transition-all hover:scale-105 animate-in fade-in-50 slide-in-from-bottom duration-500"
            >
              <Camera className="w-4 h-4" />
              <span className="text-sm font-medium">ดูรูปทั้งหมด ({images.length})</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative bg-white">
          {/* Tour Header */}
          <div className="px-4 pt-6 pb-4">
            <div className="max-w-4xl mx-auto">
              {/* Tags Row */}
              <div className="flex items-center gap-2 mb-4 flex-wrap animate-in fade-in slide-in-from-bottom duration-500">
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {tour.duration}
                </span>
                {tour.discount && (
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
                    ลด {tour.discount}%
                  </span>
                )}
                <div className="flex items-center bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                  <Star className="w-4 h-4 mr-1 fill-current" />
                  <span className="text-sm font-semibold">{tour.rating.toFixed(1)}</span>
                </div>
                <div className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span className="text-sm font-semibold">ขายดี</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight animate-in fade-in slide-in-from-bottom duration-700">
                {tour.title}
              </h1>

              {/* Quick Info */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center gap-2 text-gray-600 animate-in fade-in slide-in-from-left duration-500">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="text-sm text-gray-500">จุดหมาย</div>
                    <div className="font-medium text-gray-900 text-sm">
                      {tour.destinations.slice(0, 2).join(', ')}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-600 animate-in fade-in slide-in-from-left duration-700">
                  <Users className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="text-sm text-gray-500">กลุ่ม</div>
                    <div className="font-medium text-gray-900 text-sm">{tour.groupSize}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-600 animate-in fade-in slide-in-from-right duration-500">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="text-sm text-gray-500">วันเดินทาง</div>
                    <div className="font-medium text-gray-900 text-sm">{tour.departureDate}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-600 animate-in fade-in slide-in-from-right duration-700">
                  <ThumbsUp className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="text-sm text-gray-500">รีวิว</div>
                    <div className="font-medium text-gray-900 text-sm">{tour.reviews} รีวิว</div>
                  </div>
                </div>
              </div>

              {/* Highlights */}
              <div className="mb-6 animate-in fade-in slide-in-from-bottom duration-1000">
                <h3 className="font-semibold text-gray-900 mb-3">จุดเด่นของทัวร์</h3>
                <div className="flex flex-wrap gap-2">
                  {tour.highlights.map((highlight, index) => (
                    <span
                      key={index}
                      className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors cursor-default"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Price and Booking Section */}
          <div ref={pricingSectionRef}>
            <div 
              className={`transition-all duration-200 ease-out ${
                isSticky 
                  ? 'fixed top-16 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-xl z-50 lg:top-0' 
                  : 'bg-white border-t border-gray-200 lg:border-t-0 lg:bg-transparent relative'
              } px-4 py-4 lg:px-0`}
            >
              <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
                <div className="flex-1">
                  {tour.originalPrice && (
                    <div className="text-sm text-gray-400 line-through">
                      ฿{tour.originalPrice.toLocaleString()}
                    </div>
                  )}
                  <div className="text-2xl lg:text-3xl font-bold text-blue-600">
                    ฿{tour.price.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">ต่อคน</div>
                </div>
                <button
                  onClick={() => setShowBooking(true)}
                  className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  จองเลย
                </button>
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div className={`px-4 pb-8 transition-all duration-300 ${isSticky ? 'pt-24' : ''}`}>
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Overview Section */}
              <div className="bg-gray-50 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setExpandedSection(expandedSection === 'overview' ? null : 'overview')}
                  className="w-full flex items-center justify-between p-6 hover:bg-gray-100 transition-colors"
                >
                  <h2 className="text-xl font-bold text-gray-900">ภาพรวมทัวร์</h2>
                  {expandedSection === 'overview' ? 
                    <ChevronUp className="w-6 h-6 transition-transform" /> : 
                    <ChevronDown className="w-6 h-6 transition-transform" />
                  }
                </button>
                {expandedSection === 'overview' && (
                  <div className="px-6 pb-6 animate-in slide-in-from-top duration-300">
                    <p className="text-gray-700 leading-relaxed">{tourDetails.overview}</p>
                  </div>
                )}
              </div>

              {/* Included Section */}
              <div className="bg-gray-50 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setExpandedSection(expandedSection === 'included' ? null : 'included')}
                  className="w-full flex items-center justify-between p-6 hover:bg-gray-100 transition-colors"
                >
                  <h2 className="text-xl font-bold text-gray-900">รายการที่รวมในราคา</h2>
                  {expandedSection === 'included' ? 
                    <ChevronUp className="w-6 h-6 transition-transform" /> : 
                    <ChevronDown className="w-6 h-6 transition-transform" />
                  }
                </button>
                {expandedSection === 'included' && (
                  <div className="px-6 pb-6 space-y-3 animate-in slide-in-from-top duration-300">
                    {tourDetails.included.map((item, index) => (
                      <div 
                        key={index} 
                        className="flex items-center gap-3 animate-in fade-in slide-in-from-left"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Not Included Section */}
              <div className="bg-gray-50 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setExpandedSection(expandedSection === 'excluded' ? null : 'excluded')}
                  className="w-full flex items-center justify-between p-6 hover:bg-gray-100 transition-colors"
                >
                  <h2 className="text-xl font-bold text-gray-900">ค่าใช้จ่ายที่ไม่รวมในราคา</h2>
                  {expandedSection === 'excluded' ? 
                    <ChevronUp className="w-6 h-6 transition-transform" /> : 
                    <ChevronDown className="w-6 h-6 transition-transform" />
                  }
                </button>
                {expandedSection === 'excluded' && (
                  <div className="px-6 pb-6 space-y-3 animate-in slide-in-from-top duration-300">
                    {tourDetails.excluded.map((item, index) => (
                      <div 
                        key={index} 
                        className="flex items-center gap-3 animate-in fade-in slide-in-from-left"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <X className="w-5 h-5 text-red-500 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Itinerary Section */}
              <div className="bg-gray-50 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setExpandedSection(expandedSection === 'itinerary' ? null : 'itinerary')}
                  className="w-full flex items-center justify-between p-6 hover:bg-gray-100 transition-colors"
                >
                  <h2 className="text-xl font-bold text-gray-900">รายละเอียดการเดินทาง</h2>
                  {expandedSection === 'itinerary' ? 
                    <ChevronUp className="w-6 h-6 transition-transform" /> : 
                    <ChevronDown className="w-6 h-6 transition-transform" />
                  }
                </button>
                {expandedSection === 'itinerary' && (
                  <div className="px-6 pb-6 space-y-6 animate-in slide-in-from-top duration-300">
                    {tourDetails.itinerary.map((day, index) => (
                      <div 
                        key={day.day} 
                        className="border-l-4 border-blue-600 pl-6 animate-in fade-in slide-in-from-left"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <h3 className="font-bold text-gray-900 mb-2">
                          {day.title}
                        </h3>
                        <ul className="space-y-2">
                          {day.activities.map((activity, actIndex) => (
                            <li key={actIndex} className="text-gray-700 flex items-center gap-2">
                              <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0" />
                              {activity}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Reviews Section */}
              <ReviewsSection reviews={reviews} tourRating={tour.rating} />

              {/* FAQ Section */}
              <FAQSection faqs={faqs} />

              {/* Trust Indicators */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-center hover:shadow-md transition-all hover:scale-105">
                  <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="font-semibold text-green-800">ประกันครบครัน</div>
                  <div className="text-sm text-green-700">คุ้มครองตลอดการเดินทาง</div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-center hover:shadow-md transition-all hover:scale-105">
                  <CreditCard className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-semibold text-blue-800">ชำระปลอดภัย</div>
                  <div className="text-sm text-blue-700">รองรับหลายช่องทาง</div>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 text-center hover:shadow-md transition-all hover:scale-105">
                  <Award className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <div className="font-semibold text-yellow-800">ยืนยันทันที</div>
                  <div className="text-sm text-yellow-700">รับใบยืนยันผ่านอีเมล</div>
                </div>
              </div>

              {/* Related Tours */}
              <RelatedTours currentTourId={tour.id} />

              {/* Contact Section */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                  ต้องการคำปรึกษาเพิ่มเติม?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button className="flex items-center justify-center gap-3 bg-green-500 text-white px-6 py-4 rounded-xl hover:bg-green-600 transition-all hover:scale-105 shadow-lg">
                    <MessageCircle className="w-5 h-5" />
                    <span className="font-semibold">แชท Line</span>
                  </button>
                  <button className="flex items-center justify-center gap-3 bg-blue-500 text-white px-6 py-4 rounded-xl hover:bg-blue-600 transition-all hover:scale-105 shadow-lg">
                    <Phone className="w-5 h-5" />
                    <span className="font-semibold">โทรสอบถาม</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollUp && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-24 right-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 rounded-full shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-110 z-40 animate-in fade-in slide-in-from-bottom"
        >
          <ArrowLeft className="w-6 h-6 rotate-90" />
        </button>
      )}

      {/* Image Gallery Modal */}
      <ImageGalleryModal
        isOpen={showGallery}
        onClose={() => setShowGallery(false)}
        images={images}
        currentIndex={galleryIndex}
        onIndexChange={setGalleryIndex}
      />

      {/* Booking Modal */}
      <BookingModal
        isOpen={showBooking}
        onClose={() => setShowBooking(false)}
        tour={tour}
        onConfirm={handleBookingConfirm}
      />

      {/* Share Modal */}
      <ShareModal
        isOpen={showShare}
        onClose={() => setShowShare(false)}
        tour={tour}
      />
    </>
  )
}