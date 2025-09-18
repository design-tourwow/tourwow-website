import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Safari Adventure icons
const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg className={`w-5 h-5 ${filled ? 'text-yellow-500' : 'text-stone-400'}`} fill={filled ? "currentColor" : "none"} stroke={filled ? "none" : "currentColor"} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
)

const CalendarIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
)

const UsersIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
  </svg>
)

const HeartIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
)

const ShareIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
  </svg>
)

const BinocularsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
)

// Mock safari tour detail data with dates and meals
const tourDetail = {
  id: "af001",
  name: "เคนยา แทนซาเนีย มาซาอิมาร่า เซเรนเกตี 8 วัน 6 คืน",
  shortName: "🦁 THE BIG 5 SAFARI EXPEDITION",
  country: "เคนยา & แทนซาเนีย",
  duration: "8 วัน 6 คืน",
  price: 159900,
  originalPrice: 179900,
  rating: 4.9,
  reviews: 187,
  difficulty: "Moderate",
  images: [
    "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop"
  ],
  tags: ["Big 5", "Great Migration", "Luxury Lodge"],
  transportation: "Qatar Airways",
  wildlife: ["🦁 Lions", "🐘 Elephants", "🦏 Rhinos", "🐆 Leopards", "🐃 Buffalo", "🦓 Zebras", "🦒 Giraffes", "🦛 Hippos"],
  highlights: ["มาซาอิมาร่า", "เซเรนเกตี", "Ngorongoro Crater", "Great Migration", "Luxury Tented Camp"],
  itinerary: [
    {
      day: 1,
      title: "🛬 ARRIVAL - Welcome to Wild Africa",
      description: "เริ่มต้นการผจญภัยสุดยิ่งใหญ่ในแดนแอฟริกา",
      activities: ["เดินทางถึงไนโรบี", "Welcome Dinner", "Safari Briefing", "Rest at Luxury Hotel"],
      wildlife: ["Urban Wildlife Viewing"],
      meals: ["อาหารค่ำ"]
    },
    {
      day: 2,
      title: "🦁 MASAI MARA - The Lion Kingdom",
      description: "สู่อาณาจักรแห่งสิงโต ดินแดนของนักล่าผู้ยิ่งใหญ่",
      activities: ["Flight to Masai Mara", "First Game Drive", "Masai Village Visit", "Sundowner Drinks"],
      wildlife: ["Lions", "Elephants", "Zebras", "Wildebeest"],
      meals: ["อาหารเช้า", "อาหารกลางวัน", "อาหารค่ำ"]
    },
    {
      day: 3,
      title: "🌅 FULL DAY SAFARI - The Great Hunt",
      description: "ล่องลอยท่ามกลางการล่าที่ยิ่งใหญ่ที่สุดในโลก",
      activities: ["Dawn Game Drive", "Hot Air Balloon (Optional)", "Bush Lunch", "Evening Game Drive"],
      wildlife: ["Big 5 Spotting", "Cheetahs", "Hyenas", "Vultures"],
      meals: ["อาหารเช้า", "อาหารกลางวัน", "อาหารค่ำ"]
    },
    {
      day: 4,
      title: "✈️ SERENGETI - Endless Plains",
      description: "สู่ทุ่งกว้างไม่มีที่สิ้นสุด แดนแห่งการอพยพ",
      activities: ["Transfer to Serengeti", "En-route Game Drive", "Camp Setup", "Night Sounds of Africa"],
      wildlife: ["Migration Herds", "Crocodiles", "Hippos"],
      meals: ["อาหารเช้า", "อาหารกลางวัน", "อาหารค่ำ"]
    },
    {
      day: 5,
      title: "🦓 MIGRATION TRACKING - Following the Herds",
      description: "ติดตามขบวนการอพยพที่ยิ่งใหญ่ที่สุดในโลก",
      activities: ["Early Morning Tracking", "River Crossing Viewing", "Photography Session", "Bush Dinner"],
      wildlife: ["Wildebeest Migration", "River Predators", "Scavengers"],
      meals: ["อาหารเช้า", "อาหารกลางวัน", "อาหารค่ำ"]
    },
    {
      day: 6,
      title: "🌋 NGORONGORO CRATER - Eden of Africa",
      description: "สู่เอเดนแห่งแอฟริกา หลุมใหญ่แห่งความมหัศจรรย์",
      activities: ["Crater Descent", "Full Day Game Drive", "Crater Floor Picnic", "Rhino Tracking"],
      wildlife: ["Black Rhinos", "Flamingos", "Crater Lions", "Buffalo Herds"],
      meals: ["อาหารเช้า", "อาหารกลางวัน", "อาหารค่ำ"]
    },
    {
      day: 7,
      title: "📸 CULTURAL EXPERIENCE - Masai Heritage",
      description: "สัมผัสวัฒนธรรมดั้งเดิมของชาวมาซาย",
      activities: ["Masai Cultural Center", "Traditional Dancing", "Craft Shopping", "Farewell Dinner"],
      wildlife: ["Domestic Cattle", "Traditional Coexistence"],
      meals: ["อาหารเช้า", "อาหารกลางวัน", "อาหารค่ำ"]
    },
    {
      day: 8,
      title: "🏠 DEPARTURE - Memories Forever",
      description: "อำลาแดนแอฟริกา พร้อมความทรงจำที่ไม่มีวันลืม",
      activities: ["Transfer to Airport", "Last Minute Shopping", "Flight to Thailand"],
      wildlife: ["Final Airport Wildlife Spotting"],
      meals: ["อาหารเช้า"]
    }
  ],
  dates: [
    {
      id: "1",
      startDate: "2024-07-15",
      endDate: "2024-07-22",
      price: 159900,
      originalPrice: 179900,
      available: 8,
      total: 12,
      badge: "🦓 MIGRATION PEAK"
    },
    {
      id: "2",
      startDate: "2024-08-05",
      endDate: "2024-08-12",
      price: 164900,
      available: 6,
      total: 12
    },
    {
      id: "3",
      startDate: "2024-08-20",
      endDate: "2024-08-27",
      price: 159900,
      available: 10,
      total: 12,
      badge: "🦁 DRY SEASON"
    },
    {
      id: "4",
      startDate: "2024-09-10",
      endDate: "2024-09-17",
      price: 154900,
      available: 12,
      total: 12
    },
    {
      id: "5",
      startDate: "2024-10-08",
      endDate: "2024-10-15",
      price: 149900,
      available: 8,
      total: 12
    }
  ],
  included: [
    "✈️ ตั๋วเครื่องบินไป-กลับ",
    "🏕️ Luxury Tented Camp",
    "🚙 4WD Safari Vehicle",
    "👨‍💼 Professional Safari Guide",
    "🍽️ All Meals & Drinks",
    "🎟️ Park Entrance Fees",
    "📷 Photography Equipment",
    "🦏 Conservation Fees"
  ],
  notIncluded: [
    "❌ ค่าใช้จ่ายส่วนตัว",
    "❌ ทิปไกด์และคนขับ",
    "❌ ประกันการเดินทาง",
    "❌ Hot Air Balloon (Optional)",
    "❌ Alcoholic Beverages",
    "❌ Laundry Services"
  ],
  bestTime: "July - September (Great Migration)",
  groupSize: "8-12 adventurers"
}

const difficultyColors = {
  "Easy": "bg-green-100 text-green-700 border-green-200",
  "Moderate": "bg-yellow-100 text-yellow-700 border-yellow-200", 
  "Adventure": "bg-orange-100 text-orange-700 border-orange-200",
  "Luxury": "bg-purple-100 text-purple-700 border-purple-200"
}

interface TourDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function SafariTourDetailPage({ params }: TourDetailPageProps) {
  const { id } = await params
  // สามารถใช้ id เพื่อดึงข้อมูลทัวร์จริงได้ในอนาคต
  // (ตอนนี้ mock ข้อมูลไว้เหมือนเดิม)

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-100 via-orange-50 to-yellow-100">
      {/* Safari Background Animals */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute top-32 right-16 text-6xl animate-bounce" style={{animationDelay: '0s'}}>🦒</div>
        <div className="absolute bottom-40 left-12 text-4xl animate-bounce" style={{animationDelay: '2s'}}>🦓</div>
        <div className="absolute top-1/2 left-1/3 text-5xl animate-bounce" style={{animationDelay: '4s'}}>🐘</div>
      </div>

      {/* Back Button */}
      <div className="relative z-10 container mx-auto px-4 pt-6">
        <Link 
          href="/tours-safari"
          className="inline-flex items-center gap-2 text-amber-800 hover:text-orange-600 transition-colors font-bold"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          🔙 BACK TO EXPEDITIONS
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Image Gallery */}
        <div className="mb-8">
          <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl border-4 border-orange-200">
            <Image
              src={tourDetail.images[0]} // Assuming the first image is the main one
              alt={tourDetail.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            
            {/* Difficulty Badge */}
            <div className="absolute top-4 left-4">
              <span className={`text-sm font-bold px-4 py-2 rounded-full border-2 ${difficultyColors[tourDetail.difficulty as keyof typeof difficultyColors]}`}>
                🎯 {tourDetail.difficulty}
              </span>
            </div>

            {/* Actions */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors border-2 border-orange-200 hover:scale-110 transform">
                <HeartIcon />
              </button>
              <button className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors border-2 border-orange-200 hover:scale-110 transform">
                <ShareIcon />
              </button>
            </div>

            {/* Price Badge */}
            <div className="absolute bottom-4 right-4">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-xl border-2 border-orange-200">
                <div className="text-right">
                  {tourDetail.originalPrice && (
                    <div className="text-sm text-amber-600 line-through font-medium">
                      ฿{tourDetail.originalPrice.toLocaleString()}
                    </div>
                  )}
                  <div className="text-2xl font-black text-orange-600">
                    ฿{tourDetail.price.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Wildlife Count */}
            <div className="absolute bottom-4 left-4">
              <div className="bg-yellow-400/90 backdrop-blur-sm rounded-2xl px-4 py-2 border-2 border-yellow-300">
                <span className="text-amber-800 font-black flex items-center gap-2">
                  <BinocularsIcon />
                  {tourDetail.wildlife.length} SPECIES
                </span>
              </div>
            </div>
          </div>

          {/* Image Thumbnails */}
          <div className="flex gap-2 mt-4 overflow-x-auto">
            {tourDetail.images.map((image, index) => (
              <button
                key={index}
                // onClick={() => setCurrentImage(index)} // This state is removed
                className={`relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-3 transition-all transform hover:scale-105 ${
                  // currentImage === index ? 'border-orange-500 scale-105' : 'border-orange-200' // This state is removed
                  'border-orange-200' // Default state for thumbnails
                }`}
              >
                <Image
                  src={image}
                  alt={`Safari ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Tour Info */}
        <div className="mb-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-orange-200 p-6">
            <div className="mb-4">
              <h1 className="text-2xl md:text-3xl font-black text-amber-900 mb-2 leading-tight">
                {tourDetail.name}
              </h1>
              <p className="text-lg text-orange-600 font-bold mb-4">
                {tourDetail.shortName}
              </p>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} filled={i < Math.floor(tourDetail.rating)} />
                  ))}
                </div>
                <span className="text-amber-900 font-black">{tourDetail.rating}</span>
                <span className="text-amber-700 font-bold">({tourDetail.reviews} REVIEWS)</span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {tourDetail.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-bold border border-orange-300 shadow-lg"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-orange-100 rounded-xl p-3 border-2 border-orange-200">
                  <div className="flex items-center gap-2 text-orange-700 font-bold">
                    <CalendarIcon />
                    <span className="text-sm">{tourDetail.duration}</span>
                  </div>
                </div>
                <div className="bg-yellow-100 rounded-xl p-3 border-2 border-yellow-200">
                  <div className="flex items-center gap-2 text-yellow-700 font-bold">
                    <UsersIcon />
                    <span className="text-sm">{tourDetail.groupSize}</span>
                  </div>
                </div>
                <div className="bg-green-100 rounded-xl p-3 border-2 border-green-200">
                  <div className="text-green-700 font-bold text-sm">🌍 {tourDetail.country}</div>
                </div>
                <div className="bg-purple-100 rounded-xl p-3 border-2 border-purple-200">
                  <div className="text-purple-700 font-bold text-sm">📅 {tourDetail.bestTime}</div>
                </div>
              </div>
              
              {/* Safari Meal Count Display */}
              <div className="bg-gradient-to-r from-orange-100 via-yellow-100 to-red-100 rounded-2xl p-6 border-3 border-orange-300 shadow-xl">
                <h3 className="text-amber-900 font-black mb-4 flex items-center gap-3">
                  <div className="text-3xl">🍖</div>
                  <span>SAFARI MEALS INCLUDED</span>
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-orange-200 to-red-200 rounded-xl p-4 border-2 border-orange-300 text-center hover:scale-105 transform transition-all">
                    <div className="text-orange-600 text-3xl mb-2">🌅</div>
                    <div className="text-amber-900 font-black text-2xl">{tourDetail.itinerary.reduce((count, day) => count + (day.meals ? day.meals.filter(meal => meal.includes('เช้า')).length : 0), 0)}</div>
                    <div className="text-amber-700 text-sm font-bold">BREAKFAST</div>
                  </div>
                  <div className="bg-gradient-to-br from-yellow-200 to-orange-200 rounded-xl p-4 border-2 border-yellow-300 text-center hover:scale-105 transform transition-all">
                    <div className="text-yellow-600 text-3xl mb-2">☀️</div>
                    <div className="text-amber-900 font-black text-2xl">{tourDetail.itinerary.reduce((count, day) => count + (day.meals ? day.meals.filter(meal => meal.includes('กลางวัน')).length : 0), 0)}</div>
                    <div className="text-amber-700 text-sm font-bold">BUSH LUNCH</div>
                  </div>
                  <div className="bg-gradient-to-br from-red-200 to-pink-200 rounded-xl p-4 border-2 border-red-300 text-center hover:scale-105 transform transition-all">
                    <div className="text-red-600 text-3xl mb-2">🌙</div>
                    <div className="text-amber-900 font-black text-2xl">{tourDetail.itinerary.reduce((count, day) => count + (day.meals ? day.meals.filter(meal => meal.includes('ค่ำ')).length : 0), 0)}</div>
                    <div className="text-amber-700 text-sm font-bold">CAMP DINNER</div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full inline-block font-black text-lg shadow-lg">
                    🍽️ TOTAL {tourDetail.itinerary.reduce((count, day) => count + (day.meals ? day.meals.length : 0), 0)} MEALS
                  </div>
                  <div className="text-amber-600 text-sm mt-2 font-bold">All meals provided during expedition</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wildlife Showcase */}
        <div className="mb-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-orange-200 p-6">
            <h2 className="text-xl font-black text-amber-900 mb-4 flex items-center gap-2">
              🦁 WILDLIFE SPOTTING CHECKLIST
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {tourDetail.wildlife.map((animal, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border-2 border-orange-200 hover:scale-105 transform transition-all">
                  <span className="text-2xl">{animal.split(' ')[0]}</span>
                  <span className="text-amber-800 font-bold text-sm">{animal.split(' ')[1]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Safari Itinerary */}
        <div className="mb-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-orange-200 overflow-hidden">
            <div className="p-6 border-b-2 border-orange-200 bg-gradient-to-r from-orange-500 to-red-500">
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                📋 EXPEDITION TIMELINE
              </h2>
            </div>
            
            <div className="p-6">
              {tourDetail.itinerary.slice(0, 4).map((day, index) => (
                <div key={day.day} className="mb-6 last:mb-0">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-black border-2 border-orange-300">
                      {day.day}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-black text-amber-900 mb-1 text-lg">{day.title}</h3>
                      <p className="text-amber-700 text-sm mb-3 font-medium">{day.description}</p>
                      
                      {/* Activities */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                        {day.activities.map((activity, actIndex) => (
                          <div key={actIndex} className="flex items-center gap-2 text-sm text-amber-800 font-medium">
                            <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                            {activity}
                          </div>
                        ))}
                      </div>

                      {/* Wildlife */}
                      <div className="flex flex-wrap gap-2">
                        {day.wildlife.map((animal, wildIndex) => (
                          <span key={wildIndex} className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-bold border border-yellow-200">
                            🔍 {animal}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  {index < 3 && (
                    <div className="ml-6 mt-4 h-8 border-l-3 border-orange-200"></div>
                  )}
                </div>
              ))}
              
              {/* The showFullItinerary state and button are removed */}
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div className="mb-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-orange-200 p-6">
            <h2 className="text-xl font-black text-amber-900 mb-4 flex items-center gap-2">
              ✨ EXPEDITION HIGHLIGHTS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tourDetail.highlights.map((highlight, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border-2 border-orange-200 hover:scale-105 transform transition-all">
                  <span className="text-3xl">🌟</span>
                  <span className="text-amber-800 font-bold">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Included & Not Included */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Included */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-green-200 p-6">
            <h3 className="text-lg font-black text-green-800 mb-4 flex items-center gap-2">
              ✅ EXPEDITION INCLUDES
            </h3>
            <div className="space-y-2">
              {tourDetail.included.map((item, index) => (
                <div key={index} className="text-sm text-green-700 font-medium flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Not Included */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-red-200 p-6">
            <h3 className="text-lg font-black text-red-800 mb-4 flex items-center gap-2">
              ❌ NOT INCLUDED
            </h3>
            <div className="space-y-2">
              {tourDetail.notIncluded.map((item, index) => (
                <div key={index} className="text-sm text-red-700 font-medium flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Booking Section */}
        <div className="sticky bottom-0 bg-white/95 backdrop-blur-sm border-t-4 border-orange-300 p-4 rounded-t-2xl shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-amber-700 font-bold">🎯 EXPEDITION PRICE</div>
              <div className="text-3xl font-black text-orange-600">
                ฿{tourDetail.price.toLocaleString()}
              </div>
              <div className="text-xs text-amber-600 font-medium">per adventurer</div>
            </div>
            <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-2xl font-black hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105 shadow-2xl border-2 border-orange-300">
              🦁 BOOK EXPEDITION
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}