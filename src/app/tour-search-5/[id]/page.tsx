'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { 
  ArrowLeft, Calendar, Users, Star, Clock, MapPin, Plane, Hotel, 
  Shield, CreditCard, Heart, Share2, Phone, MessageCircle, CheckCircle,
  Globe, Wifi, Coffee, Camera, Navigation, AlertCircle, Info,
  Award, Sparkles, Crown, Gift, Utensils, ChevronDown, ChevronRight,
  Home, Bed, X, Menu, Download, FileText, Gem
} from 'lucide-react'

// Tour data structure
const toursData = [
  {
    id: 1,
    title: 'ทัวร์ญี่ปุ่น โตเกียว สกายทรี 5 วัน 3 คืน',
    location: 'ญี่ปุ่น',
    city: 'โตเกียว',
    duration: '5 วัน',
    durationCode: '5D4N',
    days: 5,
    nights: 4,
    price: 29900,
    originalPrice: 35900,
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&h=600&fit=crop'
    ],
    rating: 4.8,
    reviews: 234,
    groupSize: '15-20',
    hotelStar: 4,
    airline: 'TG',
    airlineName: 'Thai Airways',
    airportName: 'สุวรรณภูมิ (BKK)',
    availableSeats: 8,
    travelSeason: 'ม.ค.-มี.ค.',
    nextDate: '15 ก.พ. 2567',
    departureDates: {
      'ก.พ. 68': ['15 ก.พ. - 19 ก.พ.', '22 ก.พ. - 26 ก.พ.'],
      'มี.ค. 68': ['5 มี.ค. - 9 มี.ค.', '12 มี.ค. - 16 มี.ค.', '19 มี.ค. - 23 มี.ค.']
    },
    highlights: 'สัมผัสความตื่นตาตื่นใจที่โตเกียวสกายทรี ชมวิวสุดอลังการจากความสูง 634 เมตร เยี่ยมชมวัดเซ็นโซจิอันศักดิ์สิทธิ์ในย่านอาซากุสะ',
    included: [
      'ตั๋วเครื่องบินไป-กลับชั้นประหยัด สายการบิน Thai Airways',
      'ที่พักโรงแรม 4 ดาว จำนวน 4 คืน (พัก 2 ท่านต่อห้อง)',
      'อาหารตามที่ระบุในโปรแกรม',
      'รถโค้ชปรับอากาศ VIP ตลอดการเดินทาง',
      'ค่าธรรมเนียมเข้าชมสถานที่ต่างๆ ตามโปรแกรม',
      'มัคคุเทศก์มืออาชีพดูแลตลอดการเดินทาง',
      'ประกันอุบัติเหตุการเดินทาง วงเงิน 1,000,000 บาท'
    ],
    excluded: [
      'ค่าทิปมัคคุเทศก์และคนขับรถ 1,500 บาท/ท่าน',
      'ค่าใช้จ่ายส่วนตัวนอกเหนือจากที่ระบุในรายการ',
      'ค่าน้ำหนักกระเป๋าที่เกิน 30 กิโลกรัม',
      'ค่าวีซ่าสำหรับผู้ถือหนังสือเดินทางต่างชาติ'
    ],
    detailedItinerary: [
      {
        day: 1,
        title: 'เดินทางสู่โตเกียว',
        meals: { breakfast: false, lunch: true, dinner: true },
        activities: [
          { time: '06:00', activity: 'เช็คอินสนามบินสุวรรณภูมิ', icon: Home },
          { time: '09:00', activity: 'ออกเดินทางโดยสายการบิน Thai Airways TG640', icon: Plane },
          { time: '17:30', activity: 'ถึงสนามบินนาริตะ ประเทศญี่ปุ่น', icon: Globe },
          { time: '18:30', activity: 'รถรับจากสนามบิน เดินทางสู่โรงแรม', icon: Navigation },
          { time: '20:00', activity: 'เช็คอินโรงแรม Shinjuku Washington Hotel', icon: Hotel },
          { time: '21:00', activity: 'อาหารเย็น ณ ร้านอาหารท้องถิ่น', icon: Utensils }
        ],
        accommodation: 'Shinjuku Washington Hotel หรือเทียบเท่า'
      },
      {
        day: 2,
        title: 'โตเกียว สกายทรี - อาซากุสะ - ชิบูย่า',
        meals: { breakfast: true, lunch: true, dinner: true },
        activities: [
          { time: '07:00', activity: 'อาหารเช้าที่โรงแรม', icon: Coffee },
          { time: '08:30', activity: 'ออกเดินทางโดยรถโค้ช', icon: Navigation },
          { time: '09:30', activity: 'ขึ้นชมวิวบนโตเกียวสกายทรี ชั้น 350', icon: Camera },
          { time: '11:30', activity: 'เดินทางสู่วัดเซ็นโซจิ', icon: MapPin },
          { time: '12:00', activity: 'อาหารกลางวัน ณ ร้าน Tempura Daikokuya', icon: Utensils },
          { time: '13:30', activity: 'เดินเล่นถนนนากามิเซะ ช้อปปิ้งของที่ระลึก', icon: Gift },
          { time: '16:00', activity: 'เดินทางสู่ย่านชิบูย่า', icon: Navigation },
          { time: '17:00', activity: 'อิสระช้อปปิ้งที่ชิบูย่า', icon: Sparkles },
          { time: '19:00', activity: 'อาหารเย็น ณ ร้าน Ichiran Ramen', icon: Utensils }
        ],
        accommodation: 'Shinjuku Washington Hotel หรือเทียบเท่า'
      },
      {
        day: 3,
        title: 'ศาลเจ้าเมจิ - ฮาราจูกุ - โอไดบะ',
        meals: { breakfast: true, lunch: true, dinner: true },
        activities: [
          { time: '07:00', activity: 'อาหารเช้าที่โรงแรม', icon: Coffee },
          { time: '09:00', activity: 'เดินทางสู่ศาลเจ้าเมจิ', icon: Navigation },
          { time: '10:30', activity: 'ช้อปปิ้งย่านฮาราจูกุ ถนนทาเคชิตะ', icon: Gift },
          { time: '12:30', activity: 'อาหารกลางวัน', icon: Utensils },
          { time: '14:00', activity: 'เดินทางสู่โอไดบะ', icon: Navigation },
          { time: '15:00', activity: 'ชม Gundam Statue และ Aqua City', icon: Camera },
          { time: '17:00', activity: 'ชมวิวพระอาทิตย์ตกที่ Rainbow Bridge', icon: Sparkles },
          { time: '19:00', activity: 'อาหารเย็น และกลับโรงแรม', icon: Utensils }
        ],
        accommodation: 'Shinjuku Washington Hotel หรือเทียบเท่า'
      },
      {
        day: 4,
        title: 'อิสระเต็มวัน หรือเลือกซื้อทัวร์เสริม',
        meals: { breakfast: true, lunch: false, dinner: false },
        activities: [
          { time: '07:00', activity: 'อาหารเช้าที่โรงแรม', icon: Coffee },
          { time: '09:00', activity: 'อิสระเต็มวัน หรือเลือกซื้อทัวร์เสริม', icon: Sparkles },
          { time: '', activity: 'Option 1: ทัวร์ดิสนีย์แลนด์ (+3,500 บาท)', icon: Gift },
          { time: '', activity: 'Option 2: ทัวร์ภูเขาไฟฟูจิ (+2,800 บาท)', icon: Camera },
          { time: '', activity: 'Option 3: ช้อปปิ้งย่านกินซ่า', icon: Gift }
        ],
        accommodation: 'Shinjuku Washington Hotel หรือเทียบเท่า'
      },
      {
        day: 5,
        title: 'เดินทางกลับกรุงเทพฯ',
        meals: { breakfast: true, lunch: true, dinner: false },
        activities: [
          { time: '07:00', activity: 'อาหารเช้าที่โรงแรม', icon: Coffee },
          { time: '09:00', activity: 'เช็คเอาท์จากโรงแรม', icon: Hotel },
          { time: '10:00', activity: 'เดินทางสู่สนามบินนาริตะ', icon: Navigation },
          { time: '12:00', activity: 'เช็คอินสายการบิน', icon: Plane },
          { time: '14:00', activity: 'ออกเดินทางกลับกรุงเทพฯ TG677', icon: Plane },
          { time: '18:35', activity: 'ถึงสนามบินสุวรรณภูมิ โดยสวัสดิภาพ', icon: Home }
        ],
        accommodation: '-'
      }
    ]
  }
]

// Helper function to find tour
const findTour = (id: string) => {
  return toursData.find(tour => tour.id === parseInt(id))
}

export default function TourDetailPage() {
  const params = useParams()
  const router = useRouter()
  const tour = findTour(params.id as string)
  
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedMonth, setSelectedMonth] = useState<string>('')
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [expandedDay, setExpandedDay] = useState<number | null>(1)
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    if (tour && tour.departureDates) {
      const firstMonth = Object.keys(tour.departureDates)[0]
      setSelectedMonth(firstMonth)
    }
  }, [tour])

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">ไม่พบข้อมูลทัวร์</h1>
          <Link href="/tour-search-5">
            <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-gold transition-colors">
              กลับไปหน้าค้นหา
            </button>
          </Link>
        </div>
      </div>
    )
  }

  const colors = {
    primary: '#1a1b3a',
    gold: '#d4af37',
    goldLight: '#f4e5c2',
    white: '#fafafa'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Premium Header */}
      <header className="sticky top-0 z-50 bg-primary shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="text-white hover:text-gold transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div className="flex items-center space-x-2">
                <Gem className="w-6 h-6 md:w-8 md:h-8 text-gold" />
                <span className="text-white font-bold text-lg md:text-2xl">Premium Tours</span>
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <button 
                onClick={() => setIsSaved(!isSaved)}
                className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full hover:bg-white/20 transition-colors flex items-center space-x-2"
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
                <span>บันทึก</span>
              </button>
              <button className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full hover:bg-white/20 transition-colors flex items-center space-x-2">
                <Share2 className="w-4 h-4" />
                <span>แชร์</span>
              </button>
              <button 
                onClick={() => setShowBookingModal(true)}
                className="bg-gold text-primary px-6 py-2 rounded-full font-semibold hover:bg-goldLight transition-colors"
              >
                จองทัวร์
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-white">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Image Gallery */}
      <section className="relative">
        <div className="relative h-[40vh] md:h-[60vh] overflow-hidden">
          <Image
            src={tour.images?.[selectedImage] || tour.image}
            alt={tour.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Tour Title Overlay */}
          <div className="absolute bottom-8 left-8 right-8 text-white">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">{tour.title}</h1>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-gold fill-gold" />
                <span className="font-semibold">{tour.rating}</span>
                <span className="text-gray-300">({tour.reviews} รีวิว)</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-gold" />
                <span>{tour.city}, {tour.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-gold" />
                <span>{tour.duration}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail Gallery */}
        {tour.images && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {tour.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImage === index ? 'border-gold scale-110' : 'border-white/50'
                }`}
              >
                <Image
                  src={img}
                  alt={`Gallery ${index + 1}`}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Highlights */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold text-primary mb-4 flex items-center">
                <Sparkles className="w-6 h-6 text-gold mr-2" />
                ไฮไลท์ของทริป
              </h2>
              <p className="text-gray-700 leading-relaxed">{tour.highlights}</p>
              
              {/* Premium Features */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="text-center">
                  <div className="bg-goldLight p-3 rounded-full w-16 h-16 mx-auto mb-2 flex items-center justify-center">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-sm font-semibold">กรุ๊ปขนาดเล็ก</p>
                  <p className="text-xs text-gray-500">{tour.groupSize} ท่าน</p>
                </div>
                <div className="text-center">
                  <div className="bg-goldLight p-3 rounded-full w-16 h-16 mx-auto mb-2 flex items-center justify-center">
                    <Hotel className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-sm font-semibold">โรงแรม {tour.hotelStar} ดาว</p>
                  <p className="text-xs text-gray-500">มาตรฐานสากล</p>
                </div>
                <div className="text-center">
                  <div className="bg-goldLight p-3 rounded-full w-16 h-16 mx-auto mb-2 flex items-center justify-center">
                    <Plane className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-sm font-semibold">{tour.airlineName}</p>
                  <p className="text-xs text-gray-500">สายการบินชั้นนำ</p>
                </div>
                <div className="text-center">
                  <div className="bg-goldLight p-3 rounded-full w-16 h-16 mx-auto mb-2 flex items-center justify-center">
                    <Shield className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-sm font-semibold">ประกันครบ</p>
                  <p className="text-xs text-gray-500">คุ้มครองทุกเหตุการณ์</p>
                </div>
              </div>
            </div>

            {/* Detailed Itinerary */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold text-primary mb-6 flex items-center">
                <Calendar className="w-6 h-6 text-gold mr-2" />
                โปรแกรมการเดินทาง
              </h2>
              
              {tour.detailedItinerary?.map((day, index) => (
                <div key={index} className="mb-4">
                  <button
                    onClick={() => setExpandedDay(expandedDay === day.day ? null : day.day)}
                    className="w-full bg-gray-50 hover:bg-gray-100 rounded-xl p-4 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="bg-gold text-primary w-12 h-12 rounded-full flex items-center justify-center font-bold">
                          {day.day}
                        </div>
                        <div className="text-left">
                          <h3 className="font-bold text-lg text-primary">วันที่ {day.day}</h3>
                          <p className="text-gray-600">{day.title}</p>
                        </div>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${
                        expandedDay === day.day ? 'rotate-180' : ''
                      }`} />
                    </div>
                    
                    {/* Meal Icons */}
                    <div className="flex items-center space-x-4 mt-3 ml-16">
                      <div className={`flex items-center space-x-1 text-sm ${
                        day.meals?.breakfast ? 'text-primary' : 'text-gray-300'
                      }`}>
                        <Coffee className="w-4 h-4" />
                        <span>อาหารเช้า</span>
                      </div>
                      <div className={`flex items-center space-x-1 text-sm ${
                        day.meals?.lunch ? 'text-primary' : 'text-gray-300'
                      }`}>
                        <Utensils className="w-4 h-4" />
                        <span>อาหารกลางวัน</span>
                      </div>
                      <div className={`flex items-center space-x-1 text-sm ${
                        day.meals?.dinner ? 'text-primary' : 'text-gray-300'
                      }`}>
                        <Utensils className="w-4 h-4" />
                        <span>อาหารเย็น</span>
                      </div>
                    </div>
                  </button>
                  
                  {/* Expanded Activities */}
                  {expandedDay === day.day && (
                    <div className="mt-4 ml-16 space-y-3">
                      {day.activities?.map((activity, actIndex) => {
                        const Icon = activity.icon
                        return (
                          <div key={actIndex} className="flex items-start space-x-3">
                            <div className="bg-goldLight p-2 rounded-lg">
                              <Icon className="w-4 h-4 text-primary" />
                            </div>
                            <div className="flex-1">
                              {activity.time && (
                                <span className="text-sm font-semibold text-primary">{activity.time} - </span>
                              )}
                              <span className="text-gray-700">{activity.activity}</span>
                            </div>
                          </div>
                        )
                      })}
                      {day.accommodation && day.accommodation !== '-' && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <Bed className="w-4 h-4 text-gold" />
                            <span className="text-sm font-semibold">ที่พัก:</span>
                            <span className="text-sm text-gray-600">{day.accommodation}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* What's Included/Excluded */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Included */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  ราคานี้รวม
                </h3>
                <ul className="space-y-2">
                  {tour.included?.map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Excluded */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                  <X className="w-5 h-5 text-red-500 mr-2" />
                  ราคานี้ไม่รวม
                </h3>
                <ul className="space-y-2">
                  {tour.excluded?.map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <X className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Widget */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              {/* Price */}
              <div className="border-b pb-4 mb-4">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-3xl font-bold text-primary">฿{tour.price.toLocaleString()}</span>
                    <span className="text-gray-500 text-sm ml-1">/ท่าน</span>
                  </div>
                  {tour.originalPrice && (
                    <span className="text-lg line-through text-gray-400">
                      ฿{tour.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                <div className="mt-2 bg-red-50 text-red-600 px-3 py-1 rounded-full text-sm inline-block">
                  ประหยัด ฿{((tour.originalPrice || tour.price) - tour.price).toLocaleString()}
                </div>
              </div>

              {/* Select Departure Date */}
              <div className="mb-4">
                <h4 className="font-semibold text-primary mb-2">เลือกวันเดินทาง</h4>
                <select 
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-gold focus:outline-none"
                >
                  {tour.departureDates && Object.keys(tour.departureDates).map(month => (
                    <option key={month} value={month}>{month}</option>
                  ))}
                </select>
                
                {selectedMonth && tour.departureDates && (
                  <div className="mt-3 space-y-2">
                    {(tour.departureDates as any)[selectedMonth]?.map((date: any, index: any) => (
                      <label key={index} className="flex items-center space-x-3 p-3 border rounded-lg hover:border-gold cursor-pointer">
                        <input type="radio" name="departure" className="text-gold" />
                        <span className="text-sm">{date}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Available Seats Warning */}
              {tour.availableSeats < 10 && (
                <div className="mb-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm text-yellow-800">
                      เหลือเพียง {tour.availableSeats} ที่นั่งเท่านั้น
                    </span>
                  </div>
                </div>
              )}

              {/* CTA Buttons */}
              <button 
                onClick={() => setShowBookingModal(true)}
                className="w-full bg-gold text-primary py-3 rounded-xl font-bold text-lg hover:bg-goldLight transition-colors mb-3"
              >
                จองทัวร์นี้
              </button>
              
              <div className="grid grid-cols-2 gap-3">
                <button className="bg-gray-100 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>โทรสอบถาม</span>
                </button>
                <button className="bg-gray-100 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>Line Chat</span>
                </button>
              </div>

              {/* Download Brochure */}
              <button className="w-full mt-3 border border-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                <Download className="w-4 h-4" />
                <span>ดาวน์โหลดโบรชัวร์</span>
              </button>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-600">การันตีการเดินทาง</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Award className="w-5 h-5 text-blue-500" />
                    <span className="text-sm text-gray-600">บริการระดับ Premium</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CreditCard className="w-5 h-5 text-purple-500" />
                    <span className="text-sm text-gray-600">ผ่อน 0% นาน 10 เดือน</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Card */}
            <div className="mt-6 bg-gradient-to-br from-primary to-gray-900 text-white rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-4">ต้องการความช่วยเหลือ?</h3>
              <p className="text-sm text-gray-300 mb-4">
                ทีมผู้เชี่ยวชาญของเราพร้อมให้คำปรึกษา
              </p>
              <div className="space-y-2">
                <a href="tel:021234567" className="flex items-center space-x-2 text-gold hover:text-goldLight">
                  <Phone className="w-4 h-4" />
                  <span>02-123-4567</span>
                </a>
                <a href="#" className="flex items-center space-x-2 text-gold hover:text-goldLight">
                  <MessageCircle className="w-4 h-4" />
                  <span>@tourwow</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Fixed Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-2xl border-t p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-2xl font-bold text-primary">฿{tour.price.toLocaleString()}</span>
            <span className="text-gray-500 text-sm ml-1">/ท่าน</span>
          </div>
          {tour.availableSeats < 10 && (
            <span className="text-sm text-red-500">เหลือ {tour.availableSeats} ที่</span>
          )}
        </div>
        <button 
          onClick={() => setShowBookingModal(true)}
          className="w-full bg-gold text-primary py-3 rounded-xl font-bold text-lg hover:bg-goldLight transition-colors"
        >
          จองทัวร์นี้
        </button>
      </div>

      {/* Booking Modal (Placeholder) */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-primary">จองทัวร์</h3>
              <button
                onClick={() => setShowBookingModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <p className="text-gray-600 mb-6">กรุณาติดต่อเจ้าหน้าที่เพื่อดำเนินการจองทัวร์</p>
            <div className="space-y-3">
              <a href="tel:021234567" className="w-full bg-gold text-primary py-3 rounded-xl font-bold hover:bg-goldLight transition-colors flex items-center justify-center space-x-2">
                <Phone className="w-5 h-5" />
                <span>โทร 02-123-4567</span>
              </a>
              <a href="#" className="w-full bg-green-500 text-white py-3 rounded-xl font-bold hover:bg-green-600 transition-colors flex items-center justify-center space-x-2">
                <MessageCircle className="w-5 h-5" />
                <span>Line @tourwow</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}