'use client'

export const dynamic = 'force-dynamic'

import React, { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Search, SlidersHorizontal, MapPin, Calendar, Star, Shield,
  ChevronRight, Globe, Sparkles, Clock, Heart,
  Phone, MessageCircle, Crown, Menu, ArrowRight, Flame,
  Gem, Award, Users, Plane, Hotel,
  Filter, X, Check, ArrowUpRight, Info, Eye
} from 'lucide-react'

// Enhanced tour data with working images and better UX
const tours = [
  {
    id: 1,
    title: 'ทัวร์ญี่ปุ่น โตเกียว สกายทรี 5 วัน 4 คืน',
    subtitle: 'Tokyo Premium Experience',
    location: 'ญี่ปุ่น',
    city: 'โตเกียว',
    duration: '5 วัน 4 คืน',
    price: 89900,
    originalPrice: 119900,
    currency: '฿',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    rating: 4.9,
    reviews: 327,
    groupSize: { min: 8, max: 12 },
    hotelStars: 5,
    airline: { code: 'TG', name: 'Thai Airways', class: 'Business' },
    availableSeats: 3,
    tags: ['ที่นั่งจำกัด', 'หรูหรา', 'ซากุระ'],
    travelDates: {
      availableMonths: ['ม.ค. 68', 'ก.พ. 68', 'มี.ค. 68'],
      selectedMonth: 'ม.ค. 68',
      monthlyDates: {
        'ม.ค. 68': [
          { period: '15-22 ม.ค. 68', available: 3 },
          { period: '22-29 ม.ค. 68', available: 5 },
          { period: '29 ม.ค. - 5 ก.พ. 68', available: 2 }
        ],
        'ก.พ. 68': [
          { period: '5-12 ก.พ. 68', available: 4 },
          { period: '12-19 ก.พ. 68', available: 6 },
          { period: '19-26 ก.พ. 68', available: 3 }
        ],
        'มี.ค. 68': [
          { period: '3-10 มี.ค. 68', available: 8 },
          { period: '10-17 มี.ค. 68', available: 5 }
        ]
      }
    },
    highlights: [
      'ประสบการณ์ส่วนตัวบนโตเกียวสกายทรีขั้น 350 เมตร พร้อมมื้อค่ำโรแมนติก',
      'รับประทานอาหารระดับมิชลิน 2 ดาว ที่ร้าน Sukiyabashi Jiro',
      'ช่างภาพส่วนตัวเต็มวันสำหรับถ่ายรูปพรีเวดดิ้งในสวนซากุระ',
      'เข้าชมพิพิธภัณฑ์จิบลิพร้อมกับไกด์ผู้เชี่ยวชาญด้านอนิเมะ',
      'ช้อปปิ้งส่วนตัวในย่าน Harajuku กับสไตลิสต์แฟชั่น'
    ],
    included: ['ตั๋วเครื่องบิน', 'โรงแรม', 'อาหาร', 'ไกด์', 'ประกัน'],
    tripType: 'วัฒนธรรม',
    difficulty: 'ง่าย',
    bestFor: ['คู่รัก', 'ถ่ายรูป', 'ครั้งแรก'],
    nextDeparture: new Date('2024-03-15'),
    popularityScore: 98
  },
  {
    id: 2,
    title: 'ทัวร์เกาหลี โซล พระราชวัง 4 วัน 3 คืน',
    subtitle: '4 Days Korean Wave Experience',
    location: 'เกาหลี',
    city: 'โซล',
    duration: '4 วัน 3 คืน',
    price: 45900,
    originalPrice: 59900,
    currency: '฿',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    rating: 4.8,
    reviews: 256,
    groupSize: { min: 10, max: 15 },
    hotelStars: 5,
    airline: { code: 'KE', name: 'Korean Air', class: 'Premium Economy' },
    availableSeats: 8,
    tags: ['ยอดนิยม', 'K-Culture', 'ช้อปปิ้ง'],
    travelDates: {
      availableMonths: ['ก.พ. 68', 'มี.ค. 68', 'เม.ย. 68'],
      selectedMonth: 'ก.พ. 68',
      monthlyDates: {
        'ก.พ. 68': [
          { period: '10-14 ก.พ. 68', available: 8 },
          { period: '17-21 ก.พ. 68', available: 6 },
          { period: '24-28 ก.พ. 68', available: 4 }
        ],
        'มี.ค. 68': [
          { period: '1-8 มี.ค. 68', available: 12 },
          { period: '15-22 มี.ค. 68', available: 9 }
        ],
        'เม.ย. 68': [
          { period: '5-12 เม.ย. 68', available: 6 },
          { period: '19-26 เม.ย. 68', available: 3 }
        ]
      }
    },
    highlights: [
      'เรียนเต้น K-pop สไตล์ BTS และ BLACKPINK กับนักเต้นมืออาชีพ',
      'ดินเนอร์หรูบนเรือยอชท์แม่น้ำฮัน พร้อมชมไฟประดับ Banpo Bridge',
      'แต่งหน้าสไตล์เกาหลีโดยเมคอัพอาร์ทิสต์ดังใน Gangnam',
      'ช้อปปิ้ง K-Beauty ที่ Myeongdong พร้อมคำแนะนำจากบิวตี้กูรู',
      'ถ่ายรูปสไตล์ K-Drama ที่ Bukchon Hanok Village'
    ],
    included: ['ตั๋วเครื่องบิน', 'โรงแรม', 'อาหารเช้า', 'ไกด์'],
    tripType: 'วัฒนธรรมสมัยใหม่',
    difficulty: 'ง่าย',
    bestFor: ['วัยรุ่น', 'แฟน K-pop', 'ช้อปปิ้ง'],
    nextDeparture: new Date('2024-02-20'),
    popularityScore: 92
  },
  {
    id: 3,
    title: 'ทัวร์ฝรั่งเศส ปารีส หอไอเฟล 8 วัน 7 คืน',
    subtitle: '8 Days of French Elegance',
    location: 'ฝรั่งเศส',
    city: 'ปารีส',
    duration: '8 วัน 7 คืน',
    price: 159900,
    originalPrice: 189900,
    currency: '฿',
    image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    rating: 5.0,
    reviews: 189,
    groupSize: { min: 6, max: 10 },
    hotelStars: 5,
    airline: { code: 'TG', name: 'Thai Airways', class: 'Business' },
    availableSeats: 2,
    tags: ['อัลตร้าลักชัวรี', 'เอ็กซ์คลูซีฟ', 'เหลือ 2 ที่'],
    travelDates: {
      availableMonths: ['เม.ย. 68', 'พ.ค. 68', 'มิ.ย. 68'],
      selectedMonth: 'เม.ย. 68',
      monthlyDates: {
        'เม.ย. 68': [
          { period: '5-12 เม.ย. 68', available: 2 },
          { period: '19-26 เม.ย. 68', available: 1 }
        ],
        'พ.ค. 68': [
          { period: '2-9 พ.ค. 68', available: 3 },
          { period: '16-23 พ.ค. 68', available: 2 }
        ],
        'มิ.ย. 68': [
          { period: '7-14 มิ.ย. 68', available: 4 }
        ]
      }
    },
    highlights: [
      'เข้าชมลูฟร์โดยไม่ต้องต่อคิว พร้อมไกด์นักประวัติศาสตร์ศิลปะส่วนตัว',
      'ดินเนอร์โรแมนติกบนหอไอเฟลชั้น 2 พร้อมทัศนียภาพปารีสยามค่ำคืน',
      'ชิมแชมเปญ Dom Pérignon ในห้องใต้ดินพิเศษที่ Caves du Louvre',
      'ล่องเซนน์ด้วยเรือหรูส่วนตัวพร้อมนักดนตรีบรรเลงสด',
      'ช้อปปิ้งที่ Champs-Élysées พร้อมสไตลิสต์แฟชั่นจากบูติกดัง'
    ],
    included: ['ตั๋วเครื่องบิน', 'โรงแรม', 'อาหารทุกมื้อ', 'ไกด์', 'เข้า VIP'],
    tripType: 'มรดกหรูหรา',
    difficulty: 'ง่าย',
    bestFor: ['นักหรูหรา', 'คนรักศิลปะ', 'โอกาสพิเศษ'],
    nextDeparture: new Date('2024-04-10'),
    popularityScore: 100
  },
  {
    id: 4,
    title: 'ทัวร์ดูไบ บูรจ์คาลิฟา 5 วัน 4 คืน',
    subtitle: '5 Days Desert to Sky',
    location: 'ดูไบ',
    city: 'ดูไบ',
    duration: '5 วัน 4 คืน',
    price: 75900,
    originalPrice: 95900,
    currency: '฿',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    rating: 4.7,
    reviews: 143,
    groupSize: { min: 12, max: 18 },
    hotelStars: 5,
    airline: { code: 'EK', name: 'Emirates', class: 'Business' },
    availableSeats: 10,
    tags: ['หรูหรา', 'ผจญภัย', 'ช้อปปิ้ง'],
    travelDates: {
      availableMonths: ['มี.ค. 68', 'เม.ย. 68', 'พ.ค. 68'],
      selectedMonth: 'มี.ค. 68',
      monthlyDates: {
        'มี.ค. 68': [
          { period: '1-6 มี.ค. 68', available: 10 },
          { period: '8-13 มี.ค. 68', available: 7 },
          { period: '15-20 มี.ค. 68', available: 5 }
        ],
        'เม.ย. 68': [
          { period: '3-8 เม.ย. 68', available: 8 },
          { period: '10-15 เม.ย. 68', available: 12 }
        ],
        'พ.ค. 68': [
          { period: '7-12 พ.ค. 68', available: 6 }
        ]
      }
    },
    highlights: [
      'ประสบการณ์พระอาทิตย์ตก VIP บนชั้น 148 ของ Burj Khalifa พร้อมแชมเปญ',
      'ค่ายทะเลทรายส่วนตัวพร้อมการแสดงนกเหยี่ยวและอูฐแข่ง',
      'ล่องเรือยอชท์หรู 90 ฟุต พร้อมบาร์บีคิวดินเนอร์และดีเจสด',
      'ช้อปปิ้งที่ Gold Souk พร้อมผู้เชี่ยวชาญด้านอัญมณี',
      'สปาแบบราชินีที่ Burj Al Arab พร้อมทรีทเมนต์ทองคำ'
    ],
    included: ['ตั๋วเครื่องบิน', 'โรงแรม', 'อาหารเช้า', 'ไกด์', 'ซาฟารีทะเลทราย'],
    tripType: 'หรูหราสมัยใหม่',
    difficulty: 'ง่าย',
    bestFor: ['ครอบครัว', 'ผจญภัย', 'ช้อปปิ้งหรูหรา'],
    nextDeparture: new Date('2024-03-01'),
    popularityScore: 88
  },
  {
    id: 5,
    title: 'ทัวร์สิงคโปร์ มารีนา เบย์ 4 วัน 3 คืน',
    subtitle: '4 Days Lion City Deluxe',
    location: 'สิงคโปร์',
    city: 'สิงคโปร์',
    duration: '4 วัน 3 คืน',
    price: 39900,
    originalPrice: 49900,
    currency: '฿',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    rating: 4.8,
    reviews: 298,
    groupSize: { min: 15, max: 20 },
    hotelStars: 5,
    airline: { code: 'SQ', name: 'Singapore Airlines', class: 'Premium Economy' },
    availableSeats: 12,
    tags: ['เหมาะครอบครัว', 'เมืองหยุดพัก', 'สวรรค์อาหาร'],
    travelDates: {
      availableMonths: ['ก.พ. 68', 'มี.ค. 68', 'เม.ย. 68'],
      selectedMonth: 'ก.พ. 68',
      monthlyDates: {
        'ก.พ. 68': [
          { period: '20-24 ก.พ. 68', available: 12 },
          { period: '27 ก.พ. - 3 มี.ค. 68', available: 9 }
        ],
        'มี.ค. 68': [
          { period: '6-10 มี.ค. 68', available: 8 },
          { period: '13-17 มี.ค. 68', available: 15 }
        ],
        'เม.ย. 68': [
          { period: '4-8 เม.ย. 68', available: 10 }
        ]
      }
    },
    highlights: [
      'เข้าชม SkyPark มารีนาเบย์แซนด์ส พร้อมค็อกเทลที่ CE LA VIE',
      'ทัวร์อาหารมิชลิน Street Food ที่ Newton Hawker Centre กับเชฟชื่อดัง',
      'ไนท์ซาฟารี VIP ทัวร์พร้อมรถไฟเหาะส่วนตัวและมื้อค่ำในป่า',
      'ช้อปปิ้งที่ Orchard Road พร้อมช้อปปิ้งแอสซิสแตนท์ส่วนตัว',
      'เข้าชม Gardens by the Bay พร้อมไดนิ่งในโดมแก้วจำลองป่าฝนเมฆ'
    ],
    included: ['ตั๋วเครื่องบิน', 'โรงแรม', 'อาหารเช้า', 'ไกด์'],
    tripType: 'ผจญภัยเมือง',
    difficulty: 'ง่าย',
    bestFor: ['ครอบครัว', 'คนรักอาหาร', 'ครั้งแรก'],
    nextDeparture: new Date('2024-02-25'),
    popularityScore: 90
  },
  {
    id: 6,
    title: 'ทัวร์อิตาลี โรม โคลอสเซียม 7 วัน 5 คืน',
    subtitle: '7 Days Roman Empire',
    location: 'อิตาลี',
    city: 'โรม',
    duration: '7 วัน 5 คืน',
    price: 125900,
    originalPrice: 149900,
    currency: '฿',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    rating: 4.9,
    reviews: 178,
    groupSize: { min: 8, max: 14 },
    hotelStars: 5,
    airline: { code: 'TG', name: 'Thai Airways', class: 'Business' },
    availableSeats: 6,
    tags: ['มรดกโลก', 'ประวัติศาสตร์', 'อาหารอิตาลี'],
    travelDates: {
      availableMonths: ['มี.ค. 68', 'เม.ย. 68', 'พ.ค. 68'],
      selectedMonth: 'มี.ค. 68',
      monthlyDates: {
        'มี.ค. 68': [
          { period: '12-19 มี.ค. 68', available: 6 },
          { period: '26 มี.ค. - 2 เม.ย. 68', available: 4 }
        ],
        'เม.ย. 68': [
          { period: '9-16 เม.ย. 68', available: 8 },
          { period: '23-30 เม.ย. 68', available: 5 }
        ],
        'พ.ค. 68': [
          { period: '6-13 พ.ค. 68', available: 7 }
        ]
      }
    },
    highlights: [
      'เข้าชมโคลอสเซียมส่วนใต้ดินและเวทีต่อสู้ที่ปิดให้นักท่องเที่ยวทั่วไป',
      'ทัวร์ส่วนตัวพิพิธภัณฑ์วาติกันพร้อมการเข้าชมไซสทีนแชเปลหลังปิดทำการ',
      'เรียนทำพาสต้าแฮนด์เมดกับเชฟมิชลินใน Trastevere',
      'ชิมไวน์ในไร่องุ่นโบราณ Frascati พร้อมมื้อค่ำใต้แสงเทียน',
      'ช้อปปิ้งแฟชั่นอิตาเลียนที่ Via del Corso พร้อมแฟชั่นคอนซัลแตนต์'
    ],
    included: ['ตั๋วเครื่องบิน', 'โรงแรม', 'อาหารเช้า', 'ไกด์', 'ค่าเข้าชม'],
    tripType: 'ประวัติศาสตร์วัฒนธรรม',
    difficulty: 'ง่าย',
    bestFor: ['คนรักประวัติศาสตร์', 'คนรักอาหาร', 'คู่รัก'],
    nextDeparture: new Date('2024-03-20'),
    popularityScore: 95
  }
]

// Destination categories
const destinations = [
  { id: 'all', label: 'ทุกจุดหมาย', icon: Globe, color: 'from-blue-600 to-blue-700' },
  { id: 'asia', label: 'เอเชีย', icon: Sparkles, color: 'from-blue-600 to-cyan-600' },
  { id: 'europe', label: 'ยุโรป', icon: Crown, color: 'from-amber-600 to-orange-600' },
  { id: 'middle-east', label: 'ตะวันออกกลาง', icon: Gem, color: 'from-emerald-600 to-teal-600' }
]

export default function TourSearch5Page() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [savedTours, setSavedTours] = useState<number[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 200000])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [sortBy, setSortBy] = useState('popularity')
  const [selectedMonths, setSelectedMonths] = useState<Record<number, string>>({})

  // Add custom styles
  useEffect(() => {
    const style = document.createElement('style')
    style.id = 'tour-search-5-styles'
    style.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap');
      
      * {
        font-family: 'Noto Sans Thai', 'Inter', system-ui, -apple-system, sans-serif !important;
      }
      
      .gradient-text {
        background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      
      .glass-effect {
        background: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(37, 99, 235, 0.1);
      }
      
      .hover-lift {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .hover-lift:hover {
        transform: translateY(-4px);
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      }
      
      .animate-fade-in {
        animation: fadeIn 0.6s ease-out forwards;
      }
      
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .card-gradient {
        background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
      }
      
      .btn-primary {
        background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
        transition: all 0.3s ease;
      }
      
      .btn-primary:hover {
        background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
        box-shadow: 0 10px 20px rgba(37, 99, 235, 0.3);
      }
      
      .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        line-height: 1.4;
      }
      
      .line-clamp-3 {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        line-height: 1.5;
      }
      
      .text-shadow {
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      }

      /* Scrollbar Hide */
      .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      
      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }
      
      /* Mobile First Responsive Enhancements */
      @media (max-width: 640px) {
        .hero-title {
          font-size: 2.5rem;
          line-height: 1.1;
        }
        
        .tour-card-image {
          height: 16rem;
        }
      }
      
      @media (min-width: 640px) {
        .hero-title {
          font-size: 3.5rem;
        }
        
        .tour-card-image {
          height: 18rem;
        }
      }
      
      @media (min-width: 768px) {
        .hero-title {
          font-size: 4rem;
        }
      }
      
      @media (min-width: 1024px) {
        .hero-title {
          font-size: 4.5rem;
        }
      }
      
      /* Smooth animations */
      .animate-pulse-slow {
        animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      }
      
      @keyframes pulse {
        0%, 100% {
          opacity: 1;
        }
        50% {
          opacity: .8;
        }
      }
    `
    
    if (!document.getElementById('tour-search-5-styles')) {
      document.head.appendChild(style)
    }
    
    return () => {
      const existingStyle = document.getElementById('tour-search-5-styles')
      if (existingStyle) {
        existingStyle.remove()
      }
    }
  }, [])

  // Filter tours
  const filteredTours = useMemo(() => {
    let filtered = tours

    // Category filter
    if (selectedCategory !== 'all') {
      const categoryMap: Record<string, string[]> = {
        'asia': ['ญี่ปุ่น', 'เกาหลี', 'สิงคโปร์'],
        'europe': ['ฝรั่งเศส', 'อิตาลี'],
        'middle-east': ['ดูไบ']
      }
      filtered = filtered.filter(tour => 
        categoryMap[selectedCategory]?.includes(tour.location)
      )
    }

    // Price filter
    filtered = filtered.filter(tour => 
      tour.price >= priceRange[0] && tour.price <= priceRange[1]
    )

    // Tag filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter(tour =>
        selectedTags.some(tag => tour.tags.includes(tag))
      )
    }

    // Sort
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price
        case 'price-high': return b.price - a.price
        case 'rating': return b.rating - a.rating
        case 'popularity': return b.popularityScore - a.popularityScore
        default: return 0
      }
    })
  }, [selectedCategory, priceRange, selectedTags, sortBy])

  const toggleSaveTour = (tourId: number) => {
    setSavedTours(prev =>
      prev.includes(tourId)
        ? prev.filter(id => id !== tourId)
        : [...prev, tourId]
    )
  }

  const getSelectedMonth = (tourId: number) => {
    return selectedMonths[tourId] || tours.find(t => t.id === tourId)?.travelDates.selectedMonth || ''
  }

  const setSelectedMonth = (tourId: number, month: string) => {
    setSelectedMonths(prev => ({ ...prev, [tourId]: month }))
  }

  const getDatesForMonth = (tour: any, month: string) => {
    return tour.travelDates.monthlyDates[month] || []
  }

  return (
    <div className="min-h-screen bg-blue-50/30">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-effect shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 btn-primary rounded-xl flex items-center justify-center">
                <Gem className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">TourWow</h1>
                <p className="text-xs text-gray-600">ทัวร์ในฝัน</p>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <button className="text-gray-600 hover:text-gray-900 transition-colors font-medium">จุดหมาย</button>
              <button className="text-gray-600 hover:text-gray-900 transition-colors font-medium">ประสบการณ์</button>
              <button className="text-gray-600 hover:text-gray-900 transition-colors font-medium">เกี่ยวกับ</button>
              <button className="bg-white border border-gray-300 px-6 py-2 rounded-full hover:bg-gray-50 transition-all flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>ติดต่อ</span>
              </button>
              <button className="btn-primary text-white px-6 py-2 rounded-full font-medium">
                จองทันที
              </button>
            </nav>

            {/* Mobile Menu */}
            <button className="lg:hidden">
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-28">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Beautiful night cityscape travel destination"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-blue-900/70 to-black/60"></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full mix-blend-overlay filter blur-xl opacity-40 animate-pulse-slow"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-300/20 rounded-full mix-blend-overlay filter blur-xl opacity-40 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-blue-300/20 rounded-full mix-blend-overlay filter blur-xl opacity-40 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30 shadow-lg mb-8">
                <Sparkles className="w-4 h-4 text-cyan-300 mr-2" />
                <span className="text-white font-semibold text-sm">ประสบการณ์ท่องเที่ยวระดับพรีเมี่ยม</span>
              </div>
            </div>
            
            <h1 className="hero-title font-bold text-white mb-8 animate-fade-in leading-tight drop-shadow-lg">
              ค้นพบทัวร์ในฝัน
              <span className="block bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent mt-2">ที่เหนือความคาดหมาย</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 mb-16 max-w-3xl mx-auto animate-fade-in leading-relaxed drop-shadow-md">
              คัดสรรทัวร์พรีเมี่ยมคุณภาพสูง ด้วยบริการระดับ 5 ดาว<br className="hidden sm:block"/>
              สำหรับผู้ที่ต้องการประสบการณ์ท่องเที่ยวที่แตกต่าง
            </p>

            {/* Search Bar - Mobile First Design */}
            <div className="max-w-2xl mx-auto mb-12 animate-fade-in px-4">
              <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-4 border border-white/20">
                {/* Main Search Input */}
                <div className="relative mb-4">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <MapPin className="w-5 h-5 text-blue-500" />
                  </div>
                  <input
                    type="text"
                    placeholder="คุณอยากไปเที่ยวที่ไหน?"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border-0 focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500 text-base"
                  />
                </div>
                
                {/* Quick Filters */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <button className="flex items-center justify-center space-x-2 py-3 px-4 bg-blue-50 rounded-2xl border border-blue-100 hover:bg-blue-100 transition-all">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span className="text-blue-700 font-medium text-sm">เลือกวันที่</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 py-3 px-4 bg-blue-50 rounded-2xl border border-blue-100 hover:bg-blue-100 transition-all">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span className="text-blue-700 font-medium text-sm">จำนวนคน</span>
                  </button>
                </div>
                
                {/* Search Button */}
                <button className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 text-white py-4 px-6 rounded-2xl font-semibold text-base hover:shadow-lg hover:scale-[1.02] transition-all duration-200 flex items-center justify-center space-x-2">
                  <Search className="w-5 h-5" />
                  <span>ค้นหาทัวร์ในฝัน</span>
                </button>
              </div>
            </div>

            {/* Stats - 2x2 Grid */}
            <div className="max-w-lg mx-auto">
              <div className="grid grid-cols-2 gap-6 animate-fade-in">
                {[
                  { label: 'ทัวร์พรีเมี่ยม', value: '50+', icon: Crown, color: 'from-blue-500 to-blue-600' },
                  { label: 'นักเดินทางพอใจ', value: '10K+', icon: Heart, color: 'from-cyan-500 to-cyan-600' },
                  { label: 'จุดหมายปลายทาง', value: '25+', icon: Globe, color: 'from-blue-500 to-blue-600' },
                  { label: 'ปีแห่งประสบการณ์', value: '15+', icon: Award, color: 'from-amber-500 to-amber-600' }
                ].map((stat, index) => (
                  <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/50 hover:scale-[1.02] transition-all duration-200">
                    <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <p className="text-sm text-gray-600 font-medium leading-tight">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              เริ่มต้นการเดินทางของคุณ
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              เลือกจุดหมายปลายทางที่คุณฝันไว้ และค้นพบประสบการณ์ที่ไม่เหมือนใคร
            </p>
          </div>
          

          {/* Category Tabs */}
          <div className="mb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {destinations.map((dest) => {
                const Icon = dest.icon
                const isActive = selectedCategory === dest.id
                
                return (
                  <button
                    key={dest.id}
                    onClick={() => setSelectedCategory(dest.id)}
                    className={`
                      px-4 py-3 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 font-medium
                      ${isActive 
                        ? `bg-gradient-to-r ${dest.color} text-white shadow-lg` 
                        : 'bg-white border border-gray-200 hover:bg-blue-50 hover:border-blue-200 text-gray-700 hover:text-blue-700'
                      }
                    `}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{dest.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mb-8 p-6 bg-white rounded-xl shadow-lg border border-gray-200 animate-fade-in">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">ตัวกรองขั้นสูง</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Price Range */}
                <div>
                  <h4 className="font-semibold mb-3 text-gray-800">ช่วงราคา</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>฿{priceRange[0].toLocaleString()}</span>
                      <span>฿{priceRange[1].toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="200000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full accent-blue-600"
                    />
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <h4 className="font-semibold mb-3 text-gray-800">ประเภททัวร์</h4>
                  <div className="flex flex-wrap gap-2">
                    {['หรูหรา', 'ผจญภัย', 'วัฒนธรรม', 'ครอบครัว', 'โรแมนติก'].map(tag => (
                      <button
                        key={tag}
                        onClick={() => {
                          setSelectedTags(prev =>
                            prev.includes(tag)
                              ? prev.filter(t => t !== tag)
                              : [...prev, tag]
                          )
                        }}
                        className={`
                          px-3 py-2 rounded-lg text-sm font-medium transition-all
                          ${selectedTags.includes(tag)
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-gray-100 hover:bg-blue-50 text-gray-700 hover:text-blue-700'
                          }
                        `}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}


          {/* Tours Section Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">ทัวร์แนะนำ</h3>
              <p className="text-sm text-gray-600">พบ {filteredTours.length} ทัวร์</p>
            </div>
            <div className="flex items-center space-x-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1.5 bg-white border border-gray-200 rounded-md text-sm text-gray-700 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="popularity">ยอดนิยม</option>
                <option value="price-low">ราคา ต่ำ-สูง</option>
                <option value="price-high">ราคา สูง-ต่ำ</option>
                <option value="rating">คะแนน</option>
              </select>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-1 px-3 py-1.5 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-all text-sm text-gray-700"
              >
                <Filter className="w-4 h-4" />
                <span>กรอง</span>
                {selectedTags.length > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 bg-blue-600 text-white rounded-full text-xs font-medium">
                    {selectedTags.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Tours Grid - Responsive Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredTours.map((tour, index) => (
              <div
                key={tour.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in border border-gray-100 hover:-translate-y-1"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={tour.image}
                    alt={tour.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    priority={index < 2}
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  
                  {/* Heart Button - Top Right */}
                  <button
                    onClick={() => toggleSaveTour(tour.id)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all shadow-lg"
                  >
                    <Heart
                      className={`w-5 h-5 transition-all ${
                        savedTours.includes(tour.id)
                          ? 'fill-red-500 text-red-500'
                          : 'text-gray-600'
                      }`}
                    />
                  </button>

                  {/* Simple Bottom Info */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white text-lg font-bold mb-1 leading-tight drop-shadow-lg">
                      {tour.title}
                    </h3>
                    <div className="flex items-center justify-between text-white/90">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm font-medium">{tour.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm font-medium">{tour.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5">
                  {/* Price and Status */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      {tour.availableSeats <= 5 && (
                        <div className="bg-red-100 text-red-700 px-2 py-1 rounded-full flex items-center space-x-1 h-6">
                          <Flame className="w-3 h-3" />
                          <span className="text-xs font-bold leading-none">เหลือ {tour.availableSeats} ที่</span>
                        </div>
                      )}
                      {tour.tags[0] && (
                        <div className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full h-6 flex items-center">
                          <span className="text-xs font-semibold leading-none">{tour.tags[0]}</span>
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      {tour.originalPrice && (
                        <p className="text-xs text-gray-500 mb-1">ราคาเริ่มต้น/ท่าน</p>
                      )}
                      {tour.originalPrice && (
                        <p className="text-sm text-gray-500 line-through">
                          {tour.currency}{tour.originalPrice.toLocaleString()}
                        </p>
                      )}
                      <p className={`text-xl font-bold ${
                        tour.originalPrice ? 'text-red-600' : 'text-gray-900'
                      }`}>
                        {tour.currency}{tour.price.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(tour.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold text-gray-900">{tour.rating}</span>
                    <span className="text-gray-500 text-sm">({tour.reviews} รีวิว)</span>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-2 mb-4">
                    <h4 className="font-semibold text-gray-900 text-sm">ไฮไลท์ทัวร์:</h4>
                    {tour.highlights.slice(0, 2).map((highlight, idx) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-700 text-sm leading-relaxed">{highlight}</p>
                      </div>
                    ))}
                  </div>

                  {/* Quick Info */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center p-2 bg-blue-50 rounded-lg">
                      <Users className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                      <p className="text-xs text-blue-700 font-semibold">{tour.groupSize.min}-{tour.groupSize.max} คน</p>
                    </div>
                    <div className="text-center p-2 bg-blue-50 rounded-lg">
                      <Hotel className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                      <p className="text-xs text-blue-700 font-semibold">{tour.hotelStars}★ โรงแรม</p>
                    </div>
                    <div className="text-center p-2 bg-green-50 rounded-lg">
                      <Plane className="w-4 h-4 text-green-600 mx-auto mb-1" />
                      <p className="text-xs text-green-700 font-semibold">{tour.airline.class}</p>
                    </div>
                  </div>

                  {/* Travel Dates - New Design */}
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 mb-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <h4 className="text-sm font-semibold text-blue-900">รอบเดินทาง</h4>
                    </div>
                    
                    {/* Month Tabs */}
                    <div className="flex gap-2 mb-3 overflow-x-auto scrollbar-hide">
                      {tour.travelDates.availableMonths.map((month, idx) => {
                        const isSelected = month === getSelectedMonth(tour.id)
                        return (
                          <button
                            key={idx}
                            onClick={() => setSelectedMonth(tour.id, month)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                              isSelected
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'bg-white/70 text-gray-700 hover:bg-white/90'
                            }`}
                          >
                            {month}
                          </button>
                        )
                      })}
                    </div>

                    {/* Dates List */}
                    <div className="space-y-2">
                      {getDatesForMonth(tour, getSelectedMonth(tour.id)).map((date: { period: string; available: number }) => (
                        <div key={date.period} className="flex items-center justify-between bg-white/60 rounded-lg px-3 py-2 hover:bg-white/80 transition-colors">
                          <span className="text-sm text-gray-700 font-medium">{date.period}</span>
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${
                              date.available <= 3 ? 'bg-red-500' :
                              date.available <= 5 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}></div>
                            <span className="text-xs text-gray-600 font-medium">เหลือ {date.available}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>


                  {/* CTA Button */}
                  <Link href={`/tours/${tour.id}`}>
                    <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold text-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-200 flex items-center justify-center space-x-2">
                      <Eye className="w-4 h-4" />
                      <span>ดูรายละเอียดทัวร์</span>
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            พร้อมสำหรับการผจญภัยครั้งต่อไป?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            ร่วมเป็นส่วนหนึ่งกับนักเดินทางหลายพันคนที่ค้นพบการเดินทางที่สมบูรณ์แบบกับเรา
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="btn-primary text-white px-8 py-4 rounded-full font-medium flex items-center space-x-2">
              <Phone className="w-5 h-5" />
              <span>จองคำปรึกษา</span>
            </button>
            <button className="bg-white border border-gray-300 text-gray-700 px-8 py-4 rounded-full font-medium hover:bg-gray-50 transition-all flex items-center space-x-2">
              <MessageCircle className="w-5 h-5" />
              <span>แชทกับผู้เชี่ยวชาญ</span>
            </button>
          </div>
        </div>
      </section>

      {/* Floating Contact */}
      <div className="fixed bottom-8 right-8 z-40">
        <button className="w-14 h-14 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
          <MessageCircle className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  )
}