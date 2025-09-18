'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Crown, Star, MapPin, Clock, TrendingUp, Sparkles, Heart, CheckCircle, Plane,
  Shield, Award, Target, Zap, Gift, Utensils, Bed, Users, Calendar, Globe
} from 'lucide-react'

// Premium tour data for luxury travelers aged 46-60
const premiumTours = [
  {
    id: 1,
    title: 'ทัวร์พรีเมี่ยม ญี่ปุ่น โตเกียว-เกียวโต 7 วัน 5 คืน',
    location: 'ญี่ปุ่น',
    city: 'โตเกียว-เกียวโต',
    duration: '7 วัน',
    durationCode: '7D5N',
    days: 7,
    nights: 5,
    price: 89900,
    originalPrice: 109900,
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
    rating: 4.9,
    reviews: 156,
    groupSize: '8-12',
    hotelStar: 5,
    airline: 'TG',
    airlineName: 'Thai Airways Business Class',
    airportName: 'สุวรรณภูมิ (BKK)',
    availableSeats: 6,
    travelSeason: 'ม.ค.-มี.ค.',
    nextDate: '15 ก.พ. 2567',
    highlights: 'ประสบการณ์พรีเมี่ยมระดับโลก พักโรงแรม 5 ดาวใจกลางเมือง โตเกียวสกายทรี ชมวิวพาโนรามา 360 องศา อาหารมิชลินสตาร์ 3 มื้อ ล่องเรือแม่น้ำซูมิดะ ชมดอกซากุระที่สวยงามที่สุด พร้อมมัคคุเทศก์ส่วนตัวและรถโค้ชหรู',
    premiumFeatures: [
      'Business Class ไป-กลับ',
      'โรงแรม 5 ดาวใจกลางเมือง',
      'อาหารมิชลินสตาร์ 3 มื้อ',
      'มัคคุเทศก์ส่วนตัว',
      'รถโค้ชหรูส่วนตัว',
      'ประกันการเดินทาง 5 ล้านบาท'
    ]
  },
  {
    id: 2,
    title: 'ทัวร์พรีเมี่ยม ยุโรป ปารีส-ลอนดอน 10 วัน 7 คืน',
    location: 'ยุโรป',
    city: 'ปารีส-ลอนดอน',
    duration: '10 วัน',
    durationCode: '10D7N',
    days: 10,
    nights: 7,
    price: 189900,
    originalPrice: 229900,
    image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop',
    rating: 4.9,
    reviews: 89,
    groupSize: '6-10',
    hotelStar: 5,
    airline: 'TG',
    airlineName: 'Thai Airways Business Class',
    airportName: 'สุวรรณภูมิ (BKK)',
    availableSeats: 4,
    travelSeason: 'มี.ค.-พ.ค.',
    nextDate: '20 มี.ค. 2567',
    highlights: 'สัมผัสความหรูหราของยุโรป พักโรงแรม 5 ดาวใจกลางปารีสและลอนดอน ชมหอไอเฟล พิพิธภัณฑ์ลูฟร์ พระราชวังแวร์ซายส์ บิ๊กเบน ทาวเวอร์บริดจ์ พร้อมอาหารมิชลินสตาร์และมัคคุเทศก์ส่วนตัว',
    premiumFeatures: [
      'Business Class ไป-กลับ',
      'โรงแรม 5 ดาวใจกลางเมือง',
      'อาหารมิชลินสตาร์ 5 มื้อ',
      'มัคคุเทศก์ส่วนตัว',
      'รถโค้ชหรูส่วนตัว',
      'ประกันการเดินทาง 10 ล้านบาท'
    ]
  },
  {
    id: 3,
    title: 'ทัวร์พรีเมี่ยม ดูไบ-อาบูดาบี 6 วัน 4 คืน',
    location: 'ดูไบ',
    city: 'ดูไบ-อาบูดาบี',
    duration: '6 วัน',
    durationCode: '6D4N',
    days: 6,
    nights: 4,
    price: 129900,
    originalPrice: 159900,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop',
    rating: 4.8,
    reviews: 134,
    groupSize: '8-12',
    hotelStar: 5,
    airline: 'EK',
    airlineName: 'Emirates Business Class',
    airportName: 'สุวรรณภูมิ (BKK)',
    availableSeats: 8,
    travelSeason: 'ก.พ.-เม.ย.',
    nextDate: '25 ก.พ. 2567',
    highlights: 'ประสบการณ์หรูหราในตะวันออกกลาง พักบูรจ์อัลอารับ 7 ดาว ชมวิวจากบูรจ์คาลิฟา ช้อปปิ้งในดูไบมอลล์ ล่องเรือในอ่าวเปอร์เซีย พร้อมอาหารอาหรับหรูและมัคคุเทศก์ส่วนตัว',
    premiumFeatures: [
      'Business Class ไป-กลับ',
      'โรงแรม 7 ดาวใจกลางเมือง',
      'อาหารหรู 4 มื้อ',
      'มัคคุเทศก์ส่วนตัว',
      'รถโค้ชหรูส่วนตัว',
      'ประกันการเดินทาง 8 ล้านบาท'
    ]
  },
  {
    id: 4,
    title: 'ทัวร์พรีเมี่ยม ออสเตรเลีย ซิดนีย์-เมลเบิร์น 8 วัน 6 คืน',
    location: 'ออสเตรเลีย',
    city: 'ซิดนีย์-เมลเบิร์น',
    duration: '8 วัน',
    durationCode: '8D6N',
    days: 8,
    nights: 6,
    price: 149900,
    originalPrice: 189900,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    rating: 4.9,
    reviews: 98,
    groupSize: '6-10',
    hotelStar: 5,
    airline: 'TG',
    airlineName: 'Thai Airways Business Class',
    airportName: 'สุวรรณภูมิ (BKK)',
    availableSeats: 5,
    travelSeason: 'มี.ค.-พ.ค.',
    nextDate: '10 มี.ค. 2567',
    highlights: 'สัมผัสความงดงามของออสเตรเลีย พักโรงแรม 5 ดาวใจกลางซิดนีย์และเมลเบิร์น ชมโอเปร่าเฮาส์ สะพานฮาร์เบอร์บริดจ์ เกรตโอเชียนโร้ด พร้อมอาหารหรูและมัคคุเทศก์ส่วนตัว',
    premiumFeatures: [
      'Business Class ไป-กลับ',
      'โรงแรม 5 ดาวใจกลางเมือง',
      'อาหารหรู 4 มื้อ',
      'มัคคุเทศก์ส่วนตัว',
      'รถโค้ชหรูส่วนตัว',
      'ประกันการเดินทาง 6 ล้านบาท'
    ]
  }
]

// Premium destinations data
const premiumDestinations = [
  { id: 1, name: 'ญี่ปุ่น', image: 'https://images.unsplash.com/photo-1490650034439-fd184c3c86a5?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 2, description: 'วัฒนธรรมอันล้ำค่า อาหารมิชลินสตาร์' },
  { id: 2, name: 'ยุโรป', image: 'https://images.unsplash.com/photo-1471623432079-b009d30b6729?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 3, description: 'ศิลปะ วัฒนธรรม และประวัติศาสตร์' },
  { id: 3, name: 'ดูไบ', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 2, description: 'ความหรูหราและนวัตกรรม' },
  { id: 4, name: 'ออสเตรเลีย', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 2, description: 'ธรรมชาติและเมืองทันสมัย' }
]

export default function TourSearch6Page() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [activeTab, setActiveTab] = useState<'destinations' | 'tours'>('destinations')

  // Filter tours based on selected country
  const filteredTours = selectedCountry 
    ? premiumTours.filter(tour => tour.location.includes(selectedCountry))
    : premiumTours

  return (
    <>
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        @keyframes shimmer {
          0% { background-position: -200px 0; }
          100% { background-position: calc(200px + 100%) 0; }
        }
        .shimmer {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200px 100%;
          animation: shimmer 1.5s infinite;
        }
      `}</style>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        
        {/* Premium Hero Section */}
        <div className="relative h-[500px] w-full overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&h=800&fit=crop"
            alt="Luxury Travel Experience"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Crown className="w-8 h-8 text-gold-400" />
                <span className="text-gold-400 font-semibold text-lg">PREMIUM EXPERIENCE</span>
                <Crown className="w-8 h-8 text-gold-400" />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 text-center drop-shadow-2xl">
                ทัวร์พรีเมี่ยม
              </h1>
              <p className="text-xl md:text-2xl text-white/90 text-center drop-shadow-lg max-w-3xl mb-8">
                สำหรับผู้ที่ต้องการประสบการณ์การเดินทางระดับโลก
                <br />
                <span className="text-gold-400 font-semibold">ความหรูหรา • ความสะดวก • ความพิเศษ</span>
              </p>
              <div className="flex items-center justify-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-gold-400" />
                  <span>ปลอดภัย 100%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-gold-400" />
                  <span>คุณภาพระดับโลก</span>
                </div>
                <div className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-gold-400" />
                  <span>บริการพรีเมี่ยม</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Features Section */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              ทำไมต้องเลือกทัวร์พรีเมี่ยม
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              เราเข้าใจความต้องการของผู้เดินทางพรีเมี่ยม ที่ต้องการประสบการณ์ที่เหนือระดับ
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gradient-to-br from-gold-500/10 to-yellow-500/10 backdrop-blur-sm rounded-2xl p-8 border border-gold-500/20 hover:border-gold-400/40 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-gold-400 to-yellow-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">บริการระดับพรีเมี่ยม</h3>
              <p className="text-white/80 text-center">มัคคุเทศก์ส่วนตัว รถโค้ชหรู โรงแรม 5 ดาว</p>
            </div>

            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <Plane className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">Business Class</h3>
              <p className="text-white/80 text-center">ตั๋วเครื่องบินชั้นธุรกิจ ไป-กลับ</p>
            </div>

            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <Utensils className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">อาหารมิชลินสตาร์</h3>
              <p className="text-white/80 text-center">อาหารหรูระดับมิชลินสตาร์</p>
            </div>

            <div className="bg-gradient-to-br from-emerald-500/10 to-green-500/10 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/20 hover:border-emerald-400/40 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-green-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">ประกันครอบคลุม</h3>
              <p className="text-white/80 text-center">ประกันการเดินทาง 5-10 ล้านบาท</p>
            </div>
          </div>
        </div>

        {/* Destinations Section */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              จุดหมายปลายทางพรีเมี่ยม
            </h2>
            <p className="text-xl text-white/80">
              เลือกจุดหมายที่เหมาะกับสไตล์การเดินทางของคุณ
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {premiumDestinations.map(destination => (
              <button
                key={destination.id}
                onClick={() => setSelectedCountry(destination.name)}
                className={`group relative overflow-hidden rounded-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 ${
                  selectedCountry === destination.name 
                    ? 'ring-4 ring-gold-400 shadow-2xl' 
                    : 'hover:shadow-2xl'
                }`}
              >
                <div className="relative h-64">
                  {destination.image && (
                    <Image
                      src={destination.image}
                      alt={destination.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://via.placeholder.com/400x300/3B82F6/FFFFFF?text=${encodeURIComponent(destination.name)}`;
                      }}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2 text-center">{destination.name}</h3>
                    <p className="text-white/90 text-center text-sm mb-3 leading-relaxed">{destination.description}</p>
                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                      <Crown className="w-4 h-4 text-gold-400" />
                      <span className="font-semibold">{destination.tours} ทัวร์พรีเมี่ยม</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Tours Section */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              แพ็คเกจทัวร์พรีเมี่ยม
            </h2>
            <p className="text-xl text-white/80">
              {selectedCountry ? `ทัวร์พรีเมี่ยม ${selectedCountry}` : 'ทัวร์พรีเมี่ยมทั้งหมด'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredTours.map(tour => (
              <Link 
                href={`/tour-search-6/${tour.id}`} 
                key={tour.id}
                className="group block bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 hover:border-gold-400/40 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105"
              >
                {/* Image with Premium Overlay */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={tour.image}
                    alt={tour.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://via.placeholder.com/800x600/3B82F6/FFFFFF?text=${encodeURIComponent(tour.title)}`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  
                  {/* Premium Badge */}
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-gold-500 to-yellow-500 text-white px-4 py-2 rounded-full font-bold text-sm">
                    PREMIUM
                  </div>
                  
                  {/* Price Badge */}
                  <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-right">
                    {tour.originalPrice && (
                      <p className="text-gold-400 line-through text-sm">
                        ฿{tour.originalPrice.toLocaleString()}
                      </p>
                    )}
                    <p className="text-xl font-bold">
                      ฿{tour.price.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-bold text-xl text-white mb-4 line-clamp-2 group-hover:text-gold-400 transition-colors leading-tight">
                    {tour.title}
                  </h3>
                  
                  <div className="flex items-center text-white/80 mb-4">
                    <MapPin className="w-4 h-4 text-gold-400 mr-2" />
                    <span className="font-medium">{tour.location}</span>
                  </div>

                  <div className="flex items-center text-white/80 mb-4">
                    <Plane className="w-4 h-4 text-gold-400 mr-2" />
                    <span className="font-medium">{tour.airlineName}</span>
                  </div>

                  <div className="flex items-center text-white/80 mb-6">
                    <Star className="w-4 h-4 text-gold-400 mr-2" />
                    <span className="font-semibold">{tour.rating}</span>
                    <span className="text-white/60 ml-2">({tour.reviews} รีวิว)</span>
                  </div>

                  <p className="text-white/80 mb-6 line-clamp-3 leading-relaxed">
                    {tour.highlights}
                  </p>

                  {/* Premium Features */}
                  <div className="space-y-2 mb-6">
                    {tour.premiumFeatures.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-white/90">
                        <Crown className="w-4 h-4 text-gold-400" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* View Details Button */}
                  <div className="bg-gradient-to-r from-gold-500 to-yellow-500 text-white text-center py-3 rounded-xl font-semibold group-hover:from-gold-600 group-hover:to-yellow-600 transition-all duration-300">
                    ดูรายละเอียด
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-gold-500/10 to-yellow-500/10 backdrop-blur-sm py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">พร้อมเริ่มต้นประสบการณ์พรีเมี่ยม?</h2>
            <p className="text-xl text-white/80 mb-8">
              ติดต่อเราเพื่อรับคำปรึกษาและแพ็คเกจที่เหมาะกับคุณ
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-gold-500 to-yellow-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-gold-600 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105">
                ติดต่อเรา
              </button>
              <button className="border-2 border-gold-400 text-gold-400 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gold-400 hover:text-white transition-all duration-300">
                ดูแพ็คเกจทั้งหมด
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 