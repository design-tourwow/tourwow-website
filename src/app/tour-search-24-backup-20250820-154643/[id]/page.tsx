'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { Metadata } from 'next/types'
import { ArrowLeft, Calendar, Clock, MapPin, Star, Users, Heart, Share2, Phone, MessageCircle, CheckCircle, X, AlertTriangle, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Play, Eye, Check, Plus, Minus, CreditCard, Shield } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

// Import components
import BookingModal from '../../../components/tour-search-24/BookingModal'
import StickyBookingBar from '../../../components/tour-search-24/StickyBookingBar'

// Mock tour data - this matches the schema from the prompt
const getTourData = (id: string) => {
  const tours = {
    'tour-turkey-009': {
      "id": "tour-turkey-009",
      "title": "ทัวร์ตุรกี 9 วัน 7 คืน บินตรง",
      "country": "Turkey",
      "cities": ["Istanbul", "Cappadocia", "Pamukkale"],
      "duration_days": 9,
      "nights": 7,
      "price_from": 39999,
      "currency": "THB",
      "badges": ["Hot", "Promotion"],
      "rating": 4.8,
      "reviews_count": 126,
      "hero_images": [
        "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"
      ],
      "highlights": [
        "บินตรง Full Service",
        "พักโรงแรม 4 ดาว",
        "บอลลูนคัปปาโดเกีย",
        "พามุกคาเล่คอตตันปราสาท"
      ],
      "itinerary": [
        {"day":1,"title":"ออกเดินทางจากกรุงเทพฯ","details":["เช็คอิน 3 ชม.ก่อนเดินทาง","ออกเดินทางด้วยสายการบินตุรกี","มื้ออาหารบนเครื่อง"]},
        {"day":2,"title":"อิสตันบูล - เมืองประวัติศาสตร์","details":["Blue Mosque มัสยิดสีฟ้า","Hagia Sophia พิพิธภัณฑ์ฮาเจียโซเฟีย","Grand Bazaar ตลาดใหญ่","พักโรงแรม 4 ดาว"]},
        {"day":3,"title":"คัปปาโดเกีย - แดนมหัศจรรย์","details":["บินภายในประเทศสู่คัปปาโดเกีย","ชมหินปรากฏการณ์ธรรมชาติ","เมือง Goreme ที่มีชื่อเสียง","พักโรงแรม Cave Hotel"]},
        {"day":4,"title":"บอลลูนคัปปาโดเกีย","details":["ขึ้นบอลลูนชมวิวยามเช้า (ถ้าสภาพอากาศอำนวย)","เยือน Derinkuyu เมืองใต้ดิน","ชมการทำเครื่องปั้นดินเผา","ช้อปปิ้งของฝากพื้นเมือง"]},
        {"day":5,"title":"พามุกคาเล่ - คอตตันปราสาท","details":["เดินทางสู่พามุกคาเล่","ชม Cotton Castle น้ำพุร้อนธรรมชาติ","เยือนเมืองโบราณ Hierapolis","แช่น้ำแร่บำบัด Cleopatra Pool"]}
      ],
      "gallery": [
        "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1551248429-40975aa4de74?w=800&h=600&fit=crop"
      ],
      "included": [
        "ตั๋วเครื่องบินไป-กลับ",
        "โรงแรม 4 ดาว",
        "อาหารครบทุกมื้อ",
        "รถรับส่ง VIP",
        "ไกด์ไทยประสบการณ์"
      ],
      "excluded": [
        "ทิปไกด์และคนขับ",
        "ค่าทำวีซ่า (ถ้ามี)",
        "ประกันเสริม",
        "ค่าใช้จ่ายส่วนตัว"
      ],
      "policies": {
        "deposit": 3000,
        "cancellation": "ยกเลิกฟรีภายใน 7 วันหลังจอง",
        "payment_options": ["บัตรเครดิต","โอนเงิน","ผ่อน 0% 6 เดือน"]
      },
      "departures": [
        {"id":"dep-2025-11-12","date_range":"12–20 พ.ย. 2568","price":39999,"seats_left":12,"status":"available"},
        {"id":"dep-2025-12-10","date_range":"10–18 ธ.ค. 2568","price":41999,"seats_left":3,"status":"low"},
        {"id":"dep-2026-01-15","date_range":"15–23 ม.ค. 2569","price":38999,"seats_left":0,"status":"soldout"}
      ],
      "addons": [
        {"code":"INS10","label":"ประกันการเดินทาง","price":899},
        {"code":"HKUP","label":"อัปเกรดโรงแรม","price":2500},
        {"code":"SEAT","label":"เลือกที่นั่งเครื่องบิน","price":500}
      ],
      "faqs": [
        {"q":"ต้องขอวีซ่าหรือไม่?","a":"สัญชาติไทยเดินทางเข้าตุรกีได้โดยไม่ต้องขอวีซ่าล่วงหน้า สามารถขอ e-Visa ออนไลน์ได้ หรือจะขอ Visa on Arrival ที่สนามบินได้"},
        {"q":"มีอาหารมุสลิม/เจหรือไม่?","a":"แจ้งล่วงหน้าได้ครับ ทางบริษัทจะจัดหาอาหารตามความต้องการของท่าน ไม่มีค่าใช้จ่ายเพิ่มเติม"},
        {"q":"สภาพอากาศเป็นอย่างไร?","a":"ช่วงพฤศจิกายน-มกราคม อากาศเย็นสบาย อุณหภูมิประมาณ 5-15 องศาเซลเซียส แนะนำให้เตรียมเสื้อกันหนาว"},
        {"q":"บอลลูนบินแน่นอนไหม?","a":"ขึ้นอยู่กับสภาพอากาศในวันนั้น หากไม่สามารถบินได้จะมีกิจกรรมทดแทน และคืนค่าบอลลูนให้ทันที"}
      ],
      "related": [
        {"id":"tour-turkey-011","title":"ทัวร์ตุรกี 8 วัน","price_from":35999,"thumb":"https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=400&h=300&fit=crop"},
        {"id":"tour-europe-015","title":"ทัวร์สเปน-โปรตุเกส 9 วัน","price_from":45999,"thumb":"https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=400&h=300&fit=crop"}
      ],
      "reviews": [
        {"id":1,"name":"คุณสมศรี","avatar":"","rating":5,"comment":"ทริปดีมากค่ะ ไกด์น่ารัก ที่พักสะอาด อาหารอร่อย บอลลูนสวยมาก แนะนำเลยค่ะ","date":"2024-10-15","images":["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop"]},
        {"id":2,"name":"คุณวิชัย","avatar":"","rating":5,"comment":"ประทับใจมากครับ โดยเฉพาะคัปปาโดเกีย สวยงามมาก ไกด์อธิบายดี ดูแลดีตลอดทริป","date":"2024-10-20","images":[]},
        {"id":3,"name":"คุณนิตยา","avatar":"","rating":4,"comment":"โดยรวมดีค่ะ แต่อากาศหนาวกว่าที่คิด ต้องเตรียมเสื้อกันหนาวหนาๆ ไป","date":"2024-11-02","images":[]}
      ],
      "licenses": {"tourism_license":"11/2564","airline_partners":["TK","QR"]}
    },
    'tour-jp-001': {
      "id": "tour-jp-001", 
      "title": "ทัวร์ญี่ปุ่น โตเกียว เกียวโต 5 วัน 4 คืน",
      "country": "Japan",
      "cities": ["Tokyo", "Kyoto"],
      "duration_days": 5,
      "nights": 4,
      "price_from": 45900,
      "currency": "THB",
      "badges": ["Hot", "ซากุระ"],
      "rating": 4.8,
      "reviews_count": 156,
      "hero_images": [
        "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop"
      ],
      "gallery": [
        "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop"
      ],
      "highlights": [
        "ชมซากุราบาน",
        "วัดเก่าแก่เกียวโต", 
        "รถไฟความเร็วสูง",
        "ช้อปปิ้งชิบูย่า"
      ],
      "itinerary": [
        {"day":1,"title":"ออกเดินทางจากกรุงเทพฯ","details":["เช็คอิน 3 ชม.ก่อนเดินทาง","ออกเดินทางสู่โตเกียว","มื้ออาหารบนเครื่อง"]},
        {"day":2,"title":"โตเกียว - เมืองหลวง","details":["เยือนวัดเซ็นโซจิ","ตลาดอาซากุสะ","ชิบูย่าครอสซิ่ง","ช้อปปิ้งฮาราจุกุ"]},
        {"day":3,"title":"ฟูจิ - ภูเขาไฟศักดิ์สิทธิ์","details":["เดินทางสู่ภูเขาไฟฟูจิ","ชมทะเลสาบคาวากุจิโกะ","ขึ้นกระเช้าไฟฟ้า","ถ่าย������ับฟูจิซัง"]},
        {"day":4,"title":"เกียวโต - เมืองโบราณ","details":["เดินทางสู่เกียวโต","วัดคิโยมิสึ","ป่าไผ่อาราชิยาม่า","ย่านเกอิชา"]},
        {"day":5,"title":"เกียวโต - กลับกรุงเทพฯ","details":["ช้อปปิ้งของฝาก","เดินทางสู่สนามบิน","กลับถึงกรุงเทพฯ"]}
      ],
      "included": [
        "ตั๋วเครื่องบินไป-กลับ",
        "โรงแรม 4 ดาว",
        "อาหารครบทุกมื้อ",
        "รถรับส่ง VIP",
        "ไกด์ไทยประสบการณ์",
        "JR Pass 3 วัน"
      ],
      "excluded": [
        "ทิปไกด์และคนขับ", 
        "ค่าใช้จ่ายส่วนตัว",
        "ประกันเสริม",
        "วีซ่า (หากต้องการ)"
      ],
      "policies": {
        "deposit": 5000,
        "cancellation": "ยกเลิกฟรีภายใน 7 วันหลังจอง",
        "payment_options": ["บัตรเครดิต","โอนเงิน","ผ่อน 0% 6 เดือน"]
      },
      "departures": [
        {"id":"dep-jp-2025-03-15","date_range":"15–19 มี.ค. 2568","price":45900,"seats_left":8,"status":"available"},
        {"id":"dep-jp-2025-04-10","date_range":"10–14 เม.ย. 2568","price":48900,"seats_left":5,"status":"available"}
      ],
      "addons": [
        {"code":"INS15","label":"ประกันการเดินทาง","price":999},
        {"code":"ONSEN","label":"ออนเซนประสบการณ์","price":1500},
        {"code":"SEAT","label":"เลือกที่นั่งเครื่องบิน","price":800}
      ],
      "faqs": [
        {"q":"ซากุระบานหรือยัง?","a":"ช่วงมีนาคม-เมษายนเป็นช่วงซากุระบาน ขึ้นอยู่กับสภาพอากาศในแต่ละปี"},
        {"q":"อากาศหนาวมากไหม?","a":"ช่วงมีนาคม-เมษายนอุณหภูมิประมาณ 10-20 องศา ควรเตรียมเสื้อกันหนาว"},
        {"q":"มีอาหารเจ/ฮาลาลไหม?","a":"แจ้งล่วงหน้าได้ครับ ทางบริษัทจะจัดหาให้"}
      ],
      "related": [
        {"id":"tour-kr-002","title":"ทัวร์เกาหลีใต้ 6 วัน","price_from":38500,"thumb":"https://images.unsplash.com/photo-1538485399081-7191377e8241?w=400&h=300&fit=crop"},
        {"id":"tour-tw-003","title":"ทัวร์ไต้หวัน 4 วัน","price_from":19900,"thumb":"https://images.unsplash.com/photo-1508248467877-aec1b08de376?w=400&h=300&fit=crop"}
      ],
      "reviews": [
        {"id":1,"name":"คุณน้ำฝน","avatar":"","rating":5,"comment":"ซากุระสวยมาก ไกด์อธิบายดีมาก ประทับใจสุดๆ","date":"2024-03-20","images":["https://images.unsplash.com/photo-1522383225653-ed111181a951?w=300&h=200&fit=crop"]},
        {"id":2,"name":"คุณสมชาย","avatar":"","rating":5,"comment":"ทริปดีมาก วัดสวย อาหารอร่อย ที่พักดี แนะนำเลยครับ","date":"2024-04-15","images":[]},
        {"id":3,"name":"คุณมาลี","avatar":"","rating":4,"comment":"โดยรวมดีค่ะ แต่เวลาไม่ค่อยพอ อยากอยู่นานกว่านี้","date":"2024-04-22","images":[]}
      ],
      "licenses": {"tourism_license":"11/2564","airline_partners":["JAL","ANA"]}
    },
    'tour-kr-002': {
      "id": "tour-kr-002",
      "title": "ทัวร์เกาหลีใต้ โซล ปูซาน 6 วัน 5 คืน", 
      "country": "South Korea",
      "cities": ["Seoul", "Busan"],
      "duration_days": 6,
      "nights": 5,
      "price_from": 38500,
      "currency": "THB",
      "badges": ["ยอดนิยม"],
      "rating": 4.7,
      "reviews_count": 89,
      "hero_images": [
        "https://images.unsplash.com/photo-1538485399081-7191377e8241?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800&h=600&fit=crop"
      ],
      "gallery": [
        "https://images.unsplash.com/photo-1538485399081-7191377e8241?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1549693578-d683be217e58?w=800&h=600&fit=crop"
      ],
      "highlights": [
        "วัฒนธรรมเกาหลี",
        "ตลาดมยองดง",
        "ชิมอาหารท้องถิ่น",
        "K-Pop สไตล์"
      ],
      "departures": [
        {"id":"dep-kr-2025-05-01","date_range":"1–6 พ.ค. 2568","price":38500,"seats_left":15,"status":"available"}
      ]
    },
    'tour-tw-003': {
      "id": "tour-tw-003",
      "title": "ทัวร์ไต้หวัน ไทเป เกาสง 4 วัน 3 คืน",
      "country": "Taiwan", 
      "cities": ["Taipei", "Kaohsiung"],
      "duration_days": 4,
      "nights": 3,
      "price_from": 19900,
      "currency": "THB",
      "badges": ["ราคาดี"],
      "rating": 4.6,
      "reviews_count": 234,
      "hero_images": [
        "https://images.unsplash.com/photo-1508248467877-aec1b08de376?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=800&h=600&fit=crop"
      ],
      "highlights": [
        "ตลาดกลางคืน",
        "น้ำพุร้อน",
        "รถไฟความเร็วสูง",
        "ชิมติ่มซำ"
      ],
      "departures": [
        {"id":"dep-tw-2025-06-15","date_range":"15–18 มิ.ย. 2568","price":19900,"seats_left":3,"status":"low"}
      ]
    }
  }

  return tours[id as keyof typeof tours] || null
}

export default function TourDetailPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const tourId = params.id as string
  const src = searchParams.get('src')
  
  const [tour, setTour] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [selectedDeparture, setSelectedDeparture] = useState(null)
  const [expandedItinerary, setExpandedItinerary] = useState({ 1: true })
  const [showGallery, setShowGallery] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState({})
  const [showWarning, setShowWarning] = useState(false)

  useEffect(() => {
    // Simulate API call
    const fetchTour = async () => {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 500))
      const tourData = getTourData(tourId)
      setTour(tourData)
      
      if (tourData?.departures?.length > 0) {
        setSelectedDeparture(tourData.departures[0])
      }
      
      // Check source guard
      if (src !== 'search24') {
        setShowWarning(true)
      }
      
      setLoading(false)
    }

    fetchTour()
  }, [tourId, src])

  // Analytics events
  useEffect(() => {
    if (tour) {
      // Track page view
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'view_item', {
          currency: 'THB',
          value: tour.price_from,
          items: [{
            item_id: tour.id,
            item_name: tour.title,
            item_category: 'Tour Package',
            price: tour.price_from
          }]
        })
      }
    }
  }, [tour])

  // Track contact support clicks
  const handleContactSupport = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'contact_support', {
        method: 'line_oa',
        tour_id: tour?.id,
        tour_name: tour?.title
      })
    }
  }

  const handleBookNow = () => {
    setShowBookingModal(true)
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'begin_checkout', {
        currency: 'THB',
        value: tour?.price_from,
        items: [{
          item_id: tour?.id,
          item_name: tour?.title,
          item_category: 'Tour Package',
          price: tour?.price_from
        }]
      })
    }
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev >= (tour?.hero_images?.length || 1) - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev <= 0 ? (tour?.hero_images?.length || 1) - 1 : prev - 1
    )
  }

  const toggleItinerary = (day: number) => {
    setExpandedItinerary(prev => ({
      ...prev,
      [day]: !prev[day]
    }))
  }

  const toggleFaq = (index: number) => {
    setExpandedFaq(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="animate-pulse">
          <div className="h-80 bg-gray-300"></div>
          <div className="container mx-auto px-4 py-8">
            <div className="h-8 bg-gray-300 rounded mb-4"></div>
            <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="space-y-4">
              {[1,2,3,4].map(i => (
                <div key={i} className="h-20 bg-gray-300 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!tour) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">ไม่พบทัวร์ที่ต้องการ</h1>
          <Link href="/tour-search-24" className="text-red-600 hover:text-red-700 font-semibold">
            ← กลับไปหาทัวร์
          </Link>
        </div>
      </div>
    )
  }

  // Generate structured data
  const structuredData = tour ? {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "หน้าแรก",
            "item": "https://tourwow.com"
          },
          {
            "@type": "ListItem", 
            "position": 2,
            "name": "ทัวร์",
            "item": "https://tourwow.com/tour-search-24"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": tour.country,
            "item": `https://tourwow.com/tour-search-24/${tour.id}`
          }
        ]
      },
      {
        "@type": "Product",
        "name": tour.title,
        "description": `${tour.title} - ${tour.highlights?.slice(0, 3).join(', ')}`,
        "image": tour.hero_images,
        "brand": {
          "@type": "Organization",
          "name": "TourWow"
        },
        "offers": {
          "@type": "Offer",
          "price": tour.price_from,
          "priceCurrency": "THB",
          "availability": "https://schema.org/InStock",
          "url": `https://tourwow.com/tour-search-24/${tour.id}`,
          "seller": {
            "@type": "Organization",
            "name": "TourWow"
          }
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": tour.rating,
          "reviewCount": tour.reviews_count
        },
        "review": tour.reviews?.slice(0, 3).map(review => ({
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": review.name
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": review.rating
          },
          "reviewBody": review.comment,
          "datePublished": review.date
        }))
      },
      {
        "@type": "FAQPage",
        "mainEntity": tour.faqs?.map(faq => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a
          }
        }))
      }
    ]
  } : null

  return (
    <div className="min-h-screen bg-gray-50">
      {structuredData && (
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
      
      {/* Warning Toast */}
      {showWarning && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-yellow-50 border border-yellow-200 rounded-lg p-4 z-50 max-w-sm mx-auto shadow-lg">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-yellow-800">
                แนะนำให้เริ่มการค้นหาจาก
                <Link href="/tour-search-24" className="font-semibold text-yellow-900 hover:underline ml-1">
                  หน้าค้นหาทัวร์
                </Link>
              </p>
            </div>
            <button
              onClick={() => setShowWarning(false)}
              className="ml-2 text-yellow-600 hover:text-yellow-800"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-red-600">หน้าแรก</Link>
            <span>/</span>
            <Link href="/tour-search-24" className="hover:text-red-600">ทัวร์</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium truncate">{tour.country}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative">
        <div className="relative h-80 lg:h-96 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
          
          {tour.hero_images?.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={image}
                alt={tour.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}

          {/* Navigation arrows */}
          {tour.hero_images?.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 backdrop-blur-sm transition-all"
                aria-label="รูปก่อนหน้า"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 backdrop-blur-sm transition-all"
                aria-label="รูปถัดไป"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          {/* Hero Content */}
          <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
            <div className="container mx-auto">
              <div className="flex flex-wrap gap-2 mb-3">
                {tour.badges?.map((badge) => (
                  <span key={badge} className="px-3 py-1 bg-red-600 text-white text-sm font-semibold rounded-full">
                    {badge}
                  </span>
                ))}
              </div>
              
              <h1 className="text-2xl lg:text-4xl font-bold text-white mb-2">
                {tour.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-white/90 mb-4">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{tour.cities?.join(' • ')}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">{tour.duration_days} วัน {tour.nights} คืน</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{tour.rating} ({tour.reviews_count} รีวิว)</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/80">เริ่มต้น</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl lg:text-3xl font-bold text-white">
                      ฿{tour.price_from?.toLocaleString()}
                    </span>
                    <span className="text-sm text-white/80">/ ท่าน</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <button className="p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full transition-all">
                    <Heart className="h-5 w-5" />
                  </button>
                  <button className="p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full transition-all">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Image indicators */}
          {tour.hero_images?.length > 1 && (
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
              {tour.hero_images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Main CTA */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 z-30">
          <button
            onClick={handleBookNow}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 whitespace-nowrap"
          >
            จองด่วน
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="lg:flex lg:gap-8">
          {/* Left Content */}
          <div className="lg:flex-1">
            {/* Quick Contact */}
            <div className="mb-8 lg:mb-12">
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={handleContactSupport}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
                    aria-label="สอบถามเจ้าหน้าที่ผ่าน LINE Official Account"
                  >
                    <MessageCircle className="h-5 w-5" />
                    สอบถามเจ้าหน้าที่
                  </button>
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors">
                    <Phone className="h-5 w-5" />
                    โทรเลย
                  </button>
                </div>
                <p className="text-center text-sm text-gray-600 mt-3">
                  มัดจำเพียง ฿{tour.policies?.deposit?.toLocaleString()} • {tour.policies?.cancellation}
                </p>
              </div>
            </div>

            {/* Highlights Section */}
            <div className="mb-8 lg:mb-12">
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6">จุดเด่นของทัวร์</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                  {tour.highlights?.map((highlight, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                      <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-gray-800 font-medium">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Itinerary Section */}
            <div className="mb-8 lg:mb-12">
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6">กำหนดการเดินทาง</h2>
                <div className="space-y-4">
                  {tour.itinerary?.map((day, index) => (
                    <div key={day.day} className="border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => toggleItinerary(day.day)}
                        className="w-full p-4 text-left bg-gray-50 hover:bg-gray-100 flex items-center justify-between transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {day.day}
                          </div>
                          <h3 className="font-semibold text-gray-900">วันที่ {day.day}: {day.title}</h3>
                        </div>
                        <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${expandedItinerary[day.day] ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {expandedItinerary[day.day] && (
                        <div className="p-4 bg-white">
                          <ul className="space-y-2">
                            {day.details?.map((detail, detailIndex) => (
                              <li key={detailIndex} className="flex items-start gap-2 text-gray-700">
                                <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-sm">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Departures & Pricing */}
            <div className="mb-8 lg:mb-12">
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6">รอบเดินทางและราคา</h2>
                
                {/* Mobile: Cards */}
                <div className="lg:hidden space-y-4">
                  {tour.departures?.map((departure) => (
                    <div
                      key={departure.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedDeparture?.id === departure.id
                          ? 'border-red-600 bg-red-50 ring-2 ring-red-200'
                          : 'border-gray-200 hover:border-gray-300'
                      } ${departure.status === 'soldout' ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={() => {
                        if (departure.status !== 'soldout') {
                          setSelectedDeparture(departure)
                          if (typeof window !== 'undefined' && window.gtag) {
                            window.gtag('event', 'select_departure', {
                              departure_id: departure.id,
                              departure_date: departure.date_range,
                              price: departure.price
                            })
                          }
                        }
                      }}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="font-semibold text-gray-900">{departure.date_range}</div>
                          <div className="text-sm text-gray-600 mt-1 flex items-center gap-2">
                            {departure.status === 'available' && (
                              <>
                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                <span>เหลือ {departure.seats_left} ที่นั่ง</span>
                              </>
                            )}
                            {departure.status === 'low' && (
                              <>
                                <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
                                <span className="text-yellow-700 font-medium">เหลือ {departure.seats_left} ที่สุดท้าย!</span>
                              </>
                            )}
                            {departure.status === 'soldout' && (
                              <>
                                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                <span className="text-red-600">เต็มแล้ว</span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-red-600">฿{departure.price.toLocaleString()}</div>
                          <div className="text-sm text-gray-600">ต่อท่าน</div>
                        </div>
                      </div>
                      
                      {departure.status !== 'soldout' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedDeparture(departure)
                            handleBookNow()
                          }}
                          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors"
                        >
                          เลือกและจอง
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Desktop: Table */}
                <div className="hidden lg:block overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">วันเดินทาง</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-900">ราคา</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-900">ที่นั่งเหลือ</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-900">จอง</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tour.departures?.map((departure) => (
                        <tr key={departure.id} className="border-b hover:bg-gray-50 transition-colors">
                          <td className="py-4 px-4">
                            <div className="font-medium text-gray-900">{departure.date_range}</div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="text-lg font-bold text-red-600">฿{departure.price.toLocaleString()}</div>
                            <div className="text-sm text-gray-600">ต่อท่าน</div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              {departure.status === 'available' && (
                                <>
                                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                  <span className="text-green-700">{departure.seats_left} ที่นั่ง</span>
                                </>
                              )}
                              {departure.status === 'low' && (
                                <>
                                  <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
                                  <span className="text-yellow-700 font-medium">{departure.seats_left} ที่สุดท้าย!</span>
                                </>
                              )}
                              {departure.status === 'soldout' && (
                                <>
                                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                  <span className="text-red-600">เต็มแล้ว</span>
                                </>
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            {departure.status !== 'soldout' ? (
                              <button
                                onClick={() => {
                                  setSelectedDeparture(departure)
                                  handleBookNow()
                                }}
                                className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-lg font-semibold transition-colors"
                              >
                                เลือกและจอง
                              </button>
                            ) : (
                              <span className="text-gray-400 font-medium">เต็มแล้ว</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Service Details */}
            <div className="mb-8 lg:mb-12">
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6">รายละเอียดการบริการ</h2>
                
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Included */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      ราคารวม
                    </h3>
                    <ul className="space-y-3">
                      {tour.included?.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Excluded */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <X className="h-5 w-5 text-red-600" />
                      ไม่รวม
                    </h3>
                    <ul className="space-y-3">
                      {tour.excluded?.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <X className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Policies */}
                <div className="mt-8 pt-6 border-t">
                  <h3 className="font-semibold text-gray-900 mb-4">เงื่อนไขการจอง</h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-gray-700">มัดจำ: ฿{tour.policies?.deposit?.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-gray-700">{tour.policies?.cancellation}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CreditCard className="h-4 w-4 text-purple-600 mt-0.5" />
                      <div>
                        <div className="text-sm text-gray-700">วิธีชำระเงิน:</div>
                        <div className="text-sm text-gray-600 ml-2">
                          {tour.policies?.payment_options?.join(' • ')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Gallery */}
            <div className="mb-8 lg:mb-12">
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6">ภาพทัวร์</h2>
                
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  {tour.gallery?.slice(0, 6).map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-video cursor-pointer overflow-hidden rounded-lg hover:opacity-80 transition-opacity"
                      onClick={() => setShowGallery(true)}
                    >
                      <Image
                        src={image}
                        alt={`${tour.title} - รูปที่ ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                      {index === 5 && tour.gallery.length > 6 && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <div className="text-white text-center">
                            <Plus className="h-8 w-8 mx-auto mb-2" />
                            <span className="font-semibold">+{tour.gallery.length - 6} อีก</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {tour.gallery?.length > 6 && (
                  <button
                    onClick={() => setShowGallery(true)}
                    className="w-full mt-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    ดูภาพทั้งหมด ({tour.gallery.length})
                  </button>
                )}
              </div>
            </div>

            {/* Reviews */}
            <div className="mb-8 lg:mb-12">
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900">รีวิวจากลูกค้า</h2>
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-gray-900">{tour.rating}</span>
                    <span className="text-gray-600">({tour.reviews_count} รีวิว)</span>
                  </div>
                </div>

                <div className="space-y-6">
                  {tour.reviews?.slice(0, 3).map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-gray-600 font-semibold text-sm">
                            {review.name.slice(2, 4)}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-medium text-gray-900">{review.name}</span>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-4 w-4 ${
                                    star <= review.rating
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                          <p className="text-gray-700 text-sm mb-3">{review.comment}</p>
                          {review.images?.length > 0 && (
                            <div className="flex gap-2">
                              {review.images.map((image, imgIndex) => (
                                <div key={imgIndex} className="w-20 h-16 relative overflow-hidden rounded">
                                  <Image
                                    src={image}
                                    alt="รูปรีวิว"
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {tour.reviews?.length > 3 && (
                  <button className="w-full mt-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors">
                    ดูรีวิวทั้งหมด ({tour.reviews_count})
                  </button>
                )}
              </div>
            </div>

            {/* FAQ */}
            <div className="mb-8 lg:mb-12">
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6">คำถามที่พบบ่อย</h2>
                
                <div className="space-y-4">
                  {tour.faqs?.map((faq, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full p-4 text-left hover:bg-gray-50 flex items-center justify-between transition-colors"
                      >
                        <span className="font-medium text-gray-900 pr-4">{faq.q}</span>
                        <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform flex-shrink-0 ${expandedFaq[index] ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {expandedFaq[index] && (
                        <div className="p-4 bg-gray-50 border-t">
                          <p className="text-gray-700 text-sm leading-relaxed">{faq.a}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Related Tours */}
            <div className="mb-8 lg:mb-12">
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6">ทัวร์ที่เกี่ยวข้อง</h2>
                
                <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
                  {tour.related?.map((relatedTour) => (
                    <Link
                      key={relatedTour.id}
                      href={`/tour-search-24/${relatedTour.id}?src=search24`}
                      className="group border rounded-lg overflow-hidden hover:shadow-md transition-all"
                    >
                      <div className="relative aspect-video overflow-hidden">
                        <Image
                          src={relatedTour.thumb}
                          alt={relatedTour.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                          {relatedTour.title}
                        </h3>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-sm text-gray-600">เริ่มต้น</span>
                            <div className="font-bold text-red-600">฿{relatedTour.price_from.toLocaleString()}</div>
                          </div>
                          <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-red-600 transition-colors" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Trust & Safety */}
            <div className="mb-8 lg:mb-16">
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6">ความปลอดภัยและความน่าเชื่อถือ</h2>
                
                <div className="grid sm:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Shield className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">ใบอนุญาตท่องเที่ยว</h3>
                    <p className="text-sm text-gray-600">เลขที่ {tour.licenses?.tourism_license}</p>
                  </div>
                  
                  <div>
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <CheckCircle className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">การันตีคืนเงิน</h3>
                    <p className="text-sm text-gray-600">ยกเลิกฟรีภายใน 7 วัน</p>
                  </div>
                  
                  <div>
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">ลูกค้าไว้วางใจ</h3>
                    <p className="text-sm text-gray-600">มีลูกค้าเดินทาง 10,000+ ท่าน</p>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t text-center">
                  <p className="text-sm text-gray-600 mb-2">พันธมิตรสายการบิน</p>
                  <div className="flex justify-center gap-4">
                    {tour.licenses?.airline_partners?.map((airline) => (
                      <span key={airline} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded">
                        {airline}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
          </div>

          {/* Right Sidebar - Desktop Only */}
          <div className="hidden lg:block lg:w-80 lg:pl-8">
            {/* This space is intentionally left for the sticky booking bar */}
          </div>
        </div>
      </div>

      {/* Components */}
      <StickyBookingBar 
        tour={tour}
        selectedDeparture={selectedDeparture}
        onBookNow={handleBookNow}
      />
      
      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        tour={tour}
        selectedDeparture={selectedDeparture}
      />
    </div>
  )
}