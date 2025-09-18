'use client'

import React, { useState, useEffect, use, useMemo, useCallback, useRef } from 'react'
import { 
  ArrowLeft, MapPin, Star, Heart, Clock, Users, Calendar, 
  Check, X, ChevronDown, ChevronUp, Phone, MessageCircle, 
  Share2, Shield, Award, Plane, Hotel, Car, Utensils,
  Camera, Play, Navigation, Globe, Wifi, Coffee, Zap, Timer,
  TrendingUp, Gift, Crown, Sparkles, Minus, Plus, Mail,
  CreditCard, CheckCircle, AlertCircle
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import BookingModal from '@/components/BookingModalNew'

// Tour data - same as in tour-search-21/page.tsx
const tourData = [
  {
    id: 'tour-jp-001',
    title: 'ทัวร์ญี่ปุ่น โตเกียว เกียวโต',
    destination: 'ญี่ปุ่น',
    duration: '5 วัน 4 คืน',
    price: 45900,
    originalPrice: 52900,
    rating: 4.8,
    reviewCount: 156,
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop',
    highlights: ['ชมซากุระ', 'วัดเก่าแก่', 'รถไฟความเร็วสูง'],
    available: true,
    availableSeats: 8,
    travelPeriod: 'ม.ค. - เม.ย. 68',
    gallery: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1528164344705-47542687000d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800&h=600&fit=crop'
    ],
    itinerary: [
      {
        day: 1,
        title: 'เดินทางถึงโตเกียว',
        activities: ['เดินทางจากสนามบินสุวรรณภูมิ', 'เดินทางถึงโตเกียว', 'เช็คอินโรงแรม', 'ชมย่านชิบูยา']
      },
      {
        day: 2,
        title: 'ชมซากุระ อุเอโนะ',
        activities: ['ชมซากุระสวนอุเอโนะ', 'วัดเซ็นโซจิ อาซากุสะ', 'ช้อปปิ้งที่หิมะริ-ญ', 'ล่องเรือแม่น้ำสุมิดะ']
      },
      {
        day: 3,
        title: 'ภูเขาไฟฟูจิ',
        activities: ['เดินทางสู่ภูเขาไฟฟูจิ', 'ขึ้นกระเช้าไฟฟูจิ', 'ชมทะเลสาบคาวากุจิ', 'ชมซากุระริมทะเลสาบ']
      },
      {
        day: 4,
        title: 'เกียวโต โบราณ',
        activities: ['เดินทางสู่เกียวโต', 'วัดคิโยมิซุเดระ', 'ย่านเก๋อิชะ', 'ป่าไผ่อาระชิยามะ']
      },
      {
        day: 5,
        title: 'เดินทางกลับ',
        activities: ['ช้อปปิ้งของฝากสนามบิน', 'เดินทางกลับประเทศไทย', 'ถึงสนามบินสุวรรณภูมิ']
      }
    ]
  },
  {
    id: 'tour-kr-002', 
    title: 'ทัวร์เกาหลีใต้ โซล ปูซาน',
    destination: 'เกาหลีใต้',
    duration: '6 วัน 5 คืน',
    price: 38500,
    rating: 4.7,
    reviewCount: 89,
    image: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?w=800&h=600&fit=crop',
    highlights: ['วัฒนธรรมเกาหลี', 'ตลาดมยองดง', 'ชิมอาหารท้องถิ่น'],
    available: true,
    availableSeats: 15,
    travelPeriod: 'เม.ย. - ส.ค. 68',
    gallery: [
      'https://images.unsplash.com/photo-1538485399081-7191377e8241?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800&h=600&fit=crop'
    ],
    itinerary: [
      { day: 1, title: 'เดินทางถึงโซล', activities: ['เดินทางจากสนามบิน', 'เช็คอินโรงแรม', 'ย่านมยองดง'] },
      { day: 2, title: 'พระราชวังเกียงบก', activities: ['พระราชวังเกียงบก', 'หมู่บ้านบุกชนฮันอก', 'ตลาดนัมแดมุน'] },
      { day: 3, title: 'เกาะเจจู', activities: ['เดินทางสู่เกาะเจจู', 'ชมน้ำตกเจองบัง', 'พิพิธภัณฑ์ตุ๊กตาหมี'] }
    ]
  },
  {
    id: 'tour-tw-003',
    title: 'ทัวร์ไต้หวัน ไทเป เกาสง',
    destination: 'ไต้หวัน', 
    duration: '4 วัน 3 คืน',
    price: 19900,
    rating: 4.6,
    reviewCount: 234,
    image: 'https://images.unsplash.com/photo-1508248467877-aec1b08de376?w=800&h=600&fit=crop',
    highlights: ['ตลาดกลางคืน', 'น้ำพุร้อน', 'รถไฟความเร็วสูง'],
    available: true,
    availableSeats: 3,
    gallery: [
      'https://images.unsplash.com/photo-1508248467877-aec1b08de376?w=800&h=600&fit=crop'
    ],
    itinerary: [
      { day: 1, title: 'เดินทางถึงไทเป', activities: ['เดินทางถึงไทเป', 'ตลาดกลางคืนเสรี', 'ช้อปปิ้งย่านซีเหมินติง'] },
      { day: 2, title: 'อาลีซาน ป่าซากุระ', activities: ['เดินทางสู่อาลีซาน', 'ชมพระอาทิตย์ขึ้น', 'ป่าซากุระโบราณ', 'รถไฟป่าอาลีซาน'] },
      { day: 3, title: 'ทะเลสาบสุริยันจันทรา', activities: ['เดินทางสู่ทะเลสาบสุริยันจันทรา', 'ล่องเรือชมทะเลสาบ', 'วัดเหวินอู', 'ช้อปปิ้งของฝาก'] },
      { day: 4, title: 'เดินทางกลับ', activities: ['อิสระช้อปปิ้งสนามบิน', 'เดินทางกลับประเทศไทย'] }
    ]
  },
  {
    id: 'tour-sg-004',
    title: 'ทัวร์สิงคโปร์ มาเลเซีย',
    destination: 'สิงคโปร์',
    duration: '5 วัน 4 คืน', 
    price: 24900,
    rating: 4.5,
    reviewCount: 167,
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&h=600&fit=crop',
    highlights: ['สวนสนุก', 'ช้อปปิ้ง', 'อาหารหลากหลาย'],
    available: true,
    availableSeats: 12,
    gallery: [
      'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&h=600&fit=crop'
    ],
    itinerary: [
      { day: 1, title: 'เดินทางถึงสิงคโปร์', activities: ['เดินทางถึงสิงคโปร์'] }
    ]
  },
  {
    id: 'tour-vn-005',
    title: 'ทัวร์เวียดนาม ฮานอย โฮจิมินห์',
    destination: 'เวียดนาม',
    duration: '5 วัน 4 คืน',
    price: 16900,
    rating: 4.3,
    reviewCount: 98,
    image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&h=600&fit=crop',
    highlights: ['ถ้ำฮาลอง', 'อาหารเวียดนาม', 'วัฒนธรรมโบราณ'],
    available: false,
    availableSeats: 0,
    gallery: [
      'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&h=600&fit=crop'
    ],
    itinerary: [
      { day: 1, title: 'เดินทางถึงฮานอย', activities: ['เดินทางถึงฮานอย'] }
    ]
  },
  {
    id: 'tour-eu-006',
    title: 'ทัวร์ยุโรป อิตาลี สวิส ฝรั่งเศส',
    destination: 'ยุโรป',
    duration: '10 วัน 8 คืน',
    price: 89900,
    originalPrice: 99900,
    rating: 4.9,
    reviewCount: 78,
    image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&h=600&fit=crop',
    highlights: ['หอไอเฟล', 'โคลอสเซียม', 'ยอดเขาจุงเฟรา'],
    available: true,
    availableSeats: 5,
    gallery: [
      'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&h=600&fit=crop'
    ],
    itinerary: [
      { day: 1, title: 'เดินทางสู่ยุโรป', activities: ['เดินทางสู่ยุโรป'] }
    ]
  },
  {
    id: 'tour-dubai-007',
    title: 'ทัวร์ดูไบ อาบูดาบี',
    destination: 'ดูไบ',
    duration: '6 วัน 4 คืน',
    price: 42900,
    rating: 4.7,
    reviewCount: 145,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop',
    highlights: ['ตึกบุรจญ์คาลิฟา', 'ทะเลทราย', 'ช้อปปิ้งหรู'],
    available: true,
    availableSeats: 10,
    gallery: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop'
    ],
    itinerary: [
      { day: 1, title: 'เดินทางถึงดูไบ', activities: ['เดินทางถึงดูไบ'] }
    ]
  },
  {
    id: 'tour-aus-008',
    title: 'ทัวร์ออสเตรเลีย ซิดนีย์ เมลเบิร์น',
    destination: 'ออสเตรเลีย',
    duration: '7 วัน 5 คืน',
    price: 65900,
    rating: 4.6,
    reviewCount: 92,
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&h=600&fit=crop',
    highlights: ['โอเปร่าเฮาส์', 'สวนสัตว์', 'Great Ocean Road'],
    available: true,
    availableSeats: 7,
    gallery: [
      'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&h=600&fit=crop'
    ],
    itinerary: [
      { day: 1, title: 'เดินทางถึงซิดนีย์', activities: ['เดินทางถึงซิดนีย์'] }
    ]
  },
  {
    id: 'tour-turkey-009',
    title: 'ทัวร์ตุรกี อิสตันบูล คัปปาโดเกีย',
    destination: 'ตุรกี',
    duration: '8 วัน 6 คืน',
    price: 39900,
    originalPrice: 45900,
    rating: 4.8,
    reviewCount: 203,
    image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&h=600&fit=crop',
    highlights: ['บอลลูน', 'พระราชวังโทพคาปึ', 'เมืองใต้ดิน'],
    available: true,
    availableSeats: 2,
    gallery: [
      'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&h=600&fit=crop'
    ],
    itinerary: [
      { day: 1, title: 'เดินทางถึงอิสตันบูล', activities: ['เดินทางถึงอิสตันบูล'] }
    ]
  },
  {
    id: 'tour-egypt-010',
    title: 'ทัวร์อียิปต์ ไคโร อเล็กซานเดรีย',
    destination: 'อียิปต์',
    duration: '7 วัน 5 คืน',
    price: 48900,
    rating: 4.5,
    reviewCount: 67,
    image: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=800&h=600&fit=crop',
    highlights: ['พีระมิด', 'สฟิงซ์', 'ล่องแม่น้ำไนล์'],
    available: true,
    availableSeats: 18,
    gallery: [
      'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=800&h=600&fit=crop'
    ],
    itinerary: [
      { day: 1, title: 'เดินทางถึงไคโร', activities: ['เดินทางถึงไคโร'] }
    ]
  },
  {
    id: 'tour-india-011',
    title: 'ทัวร์อินเดีย ชัยปุระ อัครา',
    destination: 'อินเดีย',
    duration: '6 วัน 5 คืน',
    price: 29900,
    rating: 4.4,
    reviewCount: 134,
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop',
    highlights: ['ทัชมาฮาล', 'พระราชวังชัยปุระ', 'ตลาดท้องถิ่น'],
    available: false,
    availableSeats: 0,
    gallery: [
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop'
    ],
    itinerary: [
      { day: 1, title: 'เดินทางถึงอัครา', activities: ['เดินทางถึงอัครา'] }
    ]
  },
  {
    id: 'tour-us-012',
    title: 'ทัวร์อเมริกา นิวยอร์ก ลาสเวกัส',
    destination: 'สหรัฐอเมริกา',
    duration: '9 วัน 7 คืน',
    price: 95900,
    rating: 4.7,
    reviewCount: 89,
    image: 'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=800&h=600&fit=crop',
    highlights: ['เทพีเสรีภาพ', 'แกรนด์แคนยอน', 'ไทม์สแควร์'],
    available: true,
    availableSeats: 6,
    gallery: [
      'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=800&h=600&fit=crop'
    ],
    itinerary: [
      { day: 1, title: 'เดินทางถึงนิวยอร์ก', activities: ['เดินทางถึงนิวยอร์ก'] }
    ]
  },
  {
    id: 'tour-russia-013',
    title: 'ทัวร์รัสเซีย มอสโก เซนต์ปีเตอร์สเบิร์ก',
    destination: 'รัสเซีย',
    duration: '8 วัน 6 คืน',
    price: 58900,
    originalPrice: 65900,
    rating: 4.6,
    reviewCount: 56,
    image: 'https://images.unsplash.com/photo-1513326738677-b964603b136d?w=800&h=600&fit=crop',
    highlights: ['พระราชวังเครมลิน', 'จัตุรัสแดง', 'พิพิธภัณฑ์เฮอร์มิเทจ'],
    available: true,
    availableSeats: 11,
    gallery: [
      'https://images.unsplash.com/photo-1513326738677-b964603b136d?w=800&h=600&fit=crop'
    ],
    itinerary: [
      { day: 1, title: 'เดินทางถึงมอสโก', activities: ['เดินทางถึงมอสโก'] }
    ]
  },
  {
    id: 'tour-nz-014',
    title: 'ทัวร์นิวซีแลนด์ เกาะเหนือ เกาะใต้',
    destination: 'นิวซีแลนด์',
    duration: '8 วัน 6 คืน',
    price: 72900,
    rating: 4.9,
    reviewCount: 102,
    image: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&h=600&fit=crop',
    highlights: ['ควีนส์ทาวน์', 'ฟยอร์ดแลนด์', 'ถ้ำหนอนเรืองแสง'],
    available: true,
    availableSeats: 4,
    gallery: [
      'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&h=600&fit=crop'
    ],
    itinerary: [
      { day: 1, title: 'เดินทางถึงนิวซีแลนด์', activities: ['เดินทางถึงนิวซีแลนด์'] }
    ]
  },
  {
    id: 'tour-spain-015',
    title: 'ทัวร์สเปน บาร์เซโลนา มาดริด',
    destination: 'สเปน',
    duration: '7 วัน 5 คืน',
    price: 54900,
    rating: 4.7,
    reviewCount: 178,
    image: 'https://images.unsplash.com/photo-1509868918748-a554ad25f858?w=800&h=600&fit=crop',
    highlights: ['ซากราดา ฟามิเลีย', 'พระราชวังหลวง', 'ฟลาเมงโก้'],
    available: true,
    availableSeats: 9,
    gallery: [
      'https://images.unsplash.com/photo-1509868918748-a554ad25f858?w=800&h=600&fit=crop'
    ],
    itinerary: [
      { day: 1, title: 'เดินทางถึงบาร์เซโลนา', activities: ['เดินทางถึงบาร์เซโลนา'] }
    ]
  },
  {
    id: 'tour-canada-016',
    title: 'ทัวร์แคนาดา แวนคูเวอร์ โตรอนโต',
    destination: 'แคนาดา',
    duration: '9 วัน 7 คืน',
    price: 78900,
    originalPrice: 85900,
    rating: 4.8,
    reviewCount: 94,
    image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800&h=600&fit=crop',
    highlights: ['น้ำตกไนแองการา', 'ภูเขาร็อคกี้', 'หอคอย CN'],
    available: true,
    availableSeats: 13,
    gallery: [
      'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800&h=600&fit=crop'
    ],
    itinerary: [
      { day: 1, title: 'เดินทางถึงแคนาดา', activities: ['เดินทางถึงแคนาดา'] }
    ]
  },
  {
    id: 'tour-iceland-017',
    title: 'ทัวร์ไอซ์แลนด์ รอบเกาะ',
    destination: 'ไอซ์แลนด์',
    duration: '6 วัน 4 คืน',
    price: 89900,
    rating: 4.9,
    reviewCount: 45,
    image: 'https://images.unsplash.com/photo-1520769669658-f07657f5a307?w=800&h=600&fit=crop',
    highlights: ['แสงเหนือ', 'ธารน้ำแข็ง', 'บลูลากูน'],
    available: false,
    availableSeats: 0,
    gallery: [
      'https://images.unsplash.com/photo-1520769669658-f07657f5a307?w=800&h=600&fit=crop'
    ],
    itinerary: [
      { day: 1, title: 'เดินทางถึงไอซ์แลนด์', activities: ['เดินทางถึงไอซ์แลนด์'] }
    ]
  }
]

// Generate dynamic reviews based on tour
const generateReviewsData = (tourId: string, rating: number) => {
  const reviewTemplates = [
    { name: 'คุณสมหญิง', comment: 'ทริปดีมาก ไกด์ดูแลดี สถานที่สวยงาม ประทับใจมาก' },
    { name: 'คุณวิทยา', comment: 'โรงแรมดี อาหารอร่อย แต่เวลาเดินทางค่อนข้างเหนื่อย' },
    { name: 'คุณมาลี', comment: 'คุณภาพดีเยี่ยม ราคาสมเหตุสมผล แนะนำเลยครับ' },
    { name: 'คุณสมชาย', comment: 'บรรยากาศดี ได้ความรู้มากมาย ทีมงานมืออาชีพ' }
  ]
  
  return reviewTemplates.slice(0, 2).map((template, index) => ({
    id: index + 1,
    ...template,
    rating: rating >= 4.5 ? 5 : 4,
    date: `${15 - index * 7} ม.ค. 2568`,
    images: index === 0 ? ['https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=300&h=200&fit=crop'] : undefined
  }))
}

// Generate dynamic FAQ based on destination
const generateFAQData = (destination: string) => {
  const baseFAQ = [
    {
      question: 'ต้องเตรียมเอกสารอะไรบ้าง?',
      answer: 'หนังสือเดินทางที่มีอายุเหลือมากกว่า 6 เดือน, วีซ่า (หากจำเป็น), ใบรับรองการฉีดวัคซีน'
    },
    {
      question: 'สามารถยกเลิกการจองได้หรือไม่?',
      answer: 'สามารถยกเลิกได้ตามเงื่อนไขของแต่ละแพ็กเกจ โดยทั่วไปจะเสียค่าธรรมเนียมตามจำนวนวันที่ยกเลิกก่อนเดินทาง'
    }
  ]
  
  // Add destination-specific FAQ
  if (destination === 'ญี่ปุ่น') {
    baseFAQ.push({
      question: 'ต้องซื้อ JR Pass หรือไม่?',
      answer: 'JR Pass รวมอยู่ในแพ็กเกจแล้ว สามารถใช้รถไฟความเร็วสูงได้ไม่จำกัด'
    })
  } else if (destination === 'ยุโรป') {
    baseFAQ.push({
      question: 'ต้องใช้วีซ่าหรือไม่?',
      answer: 'หนังสือเดินทางไทยไม่ต้องใช้วีซ่าสำหรับการท่องเที่ยวในยุโรป 90 วัน'
    })
  } else {
    baseFAQ.push({
      question: 'มีประกันการเดินทางหรือไม่?',
      answer: 'มีประกันการเดินทางพื้นฐานให้ แต่แนะนำให้ซื้อประกันเพิ่มเติมเพื่อความคุ้มครองที่ครอบคลุมมากขึ้น'
    })
  }
  
  return baseFAQ
}

interface TourDetailPageProps {
  params: Promise<{ id: string }>
}

export default function TourDetailPage({ params }: TourDetailPageProps) {
  const resolvedParams = use(params)
  const [activeTab, setActiveTab] = useState('highlights')
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [expandedItinerary, setExpandedItinerary] = useState<number>(1)
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTravelDate, setSelectedTravelDate] = useState<number>(0)
  const [activeMonth, setActiveMonth] = useState<string>('ส.ค.')
  const [showCalendar, setShowCalendar] = useState(false)
  const [calendarDates, setCalendarDates] = useState<any[]>([])
  const [showStickyCTA, setShowStickyCTA] = useState(false)
  const [stickyTabs, setStickyTabs] = useState(false)
  
  // Refs for sections
  const highlightsRef = useRef<HTMLElement>(null)
  const travelDatesRef = useRef<HTMLElement>(null)
  const itineraryRef = useRef<HTMLElement>(null)
  const includedRef = useRef<HTMLElement>(null)
  const galleryRef = useRef<HTMLElement>(null)
  const reviewsRef = useRef<HTMLElement>(null)
  const relatedToursRef = useRef<HTMLElement>(null)
  const tabsRef = useRef<HTMLDivElement>(null)
  const tabsContainerRef = useRef<HTMLDivElement>(null)
  const [viewingUsers, setViewingUsers] = useState(12)
  const [flashSaleTimeLeft, setFlashSaleTimeLeft] = useState({ hours: 23, minutes: 45, seconds: 30 })
  const [recentBookings, setRecentBookings] = useState<Array<{name: string, time: string, location: string}>>([])
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [bookingStep, setBookingStep] = useState(1)
  const [isBookingLoading, setIsBookingLoading] = useState(false)
  const [bookingData, setBookingData] = useState({
    guests: 1,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    idCard: '',
    emergencyName: '',
    emergencyPhone: '',
    specialRequests: ''
  })

  // Find tour data
  const tour = tourData.find(t => t.id === resolvedParams.id)
  
  if (!tour) {
    notFound()
  }

  // Generate dynamic data based on tour
  const reviewsData = useMemo(() => generateReviewsData(tour.id, tour.rating), [tour.id, tour.rating])
  const faqData = useMemo(() => generateFAQData(tour.destination), [tour.destination])
  const [showFlashSale, setShowFlashSale] = useState(false) // Disabled for non-Flash Sale tours
  
  // Calendar Helper Functions - moved here to fix hoisting issue
  const generateStableCalendarDates = useCallback((basePrice: number) => {
    const today = new Date()
    const dates = []
    
    // Fixed seed for consistent random results
    const seedRandom = (seed: number) => {
      const x = Math.sin(seed) * 10000
      return x - Math.floor(x)
    }
    
    const currentMonth = today.getMonth()
    const currentYear = today.getFullYear()
    const currentDay = today.getDate()
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
    
    // Current month dates (only from today onwards)
    for (let day = currentDay; day <= lastDayOfMonth; day++) {
      const date = new Date(currentYear, currentMonth, day)
      const seed = day * 100 + currentMonth * 1000
      const availability = seedRandom(seed) > 0.3
      const priceMultiplier = seedRandom(seed + 1) > 0.7 ? seedRandom(seed + 2) * 0.15 : 0
      
      dates.push({
        date,
        day,
        month: date.toLocaleDateString('th-TH', { month: 'short' }),
        dayName: date.toLocaleDateString('th-TH', { weekday: 'short' }),
        available: availability,
        price: Math.round(basePrice * (1 + priceMultiplier)),
        isToday: day === currentDay,
        seats: availability ? Math.floor(seedRandom(seed + 3) * 10) + 1 : 0
      })
    }
    
    // Next month dates (first 15 days)
    const nextMonth = currentMonth + 1
    const nextYear = nextMonth > 11 ? currentYear + 1 : currentYear
    const actualNextMonth = nextMonth > 11 ? 0 : nextMonth
    
    for (let day = 1; day <= 15; day++) {
      const date = new Date(nextYear, actualNextMonth, day)
      const seed = day * 100 + actualNextMonth * 1000 + 50
      const availability = seedRandom(seed) > 0.2
      const priceMultiplier = seedRandom(seed + 1) > 0.6 ? seedRandom(seed + 2) * 0.2 : 0
      
      dates.push({
        date,
        day,
        month: date.toLocaleDateString('th-TH', { month: 'short' }),
        dayName: date.toLocaleDateString('th-TH', { weekday: 'short' }),
        available: availability,
        price: Math.round(basePrice * (1 + priceMultiplier)),
        isToday: false,
        seats: availability ? Math.floor(seedRandom(seed + 3) * 10) + 1 : 0
      })
    }
    
    return dates
  }, [])

  // Initialize calendar data once - memoized for better performance
  const memoizedCalendarDates = useMemo(() => {
    return generateStableCalendarDates(tour.price)
  }, [tour.price, generateStableCalendarDates])
  
  useEffect(() => {
    setCalendarDates(memoizedCalendarDates)
  }, [memoizedCalendarDates])

  // Combined effects for better performance
  useEffect(() => {
    const bookingNames = ['คุณสมศรี', 'คุณวิชัย', 'คุณมาลี', 'คุณสมชาย', 'คุณนันทพร', 'คุณอรรถพล']
    const locations = ['กรุงเทพฯ', 'เชียงมาย', 'ภูเก็ต', 'ขอนแก่น', 'นครราชสีมา', 'อุบลราชธานี']
    
    // Initial booking data
    const initialBooking = {
      name: bookingNames[0],
      location: locations[0],
      time: '5 นาทีที่แล้ว'
    }
    setRecentBookings([initialBooking])
    
    // Live viewing users update
    const viewingInterval = setInterval(() => {
      setViewingUsers(prev => Math.max(8, Math.min(25, prev + Math.floor(Math.random() * 5) - 2)))
    }, 12000)
    
    // Recent bookings update
    const bookingInterval = setInterval(() => {
      const randomName = bookingNames[Math.floor(Math.random() * bookingNames.length)]
      const randomLocation = locations[Math.floor(Math.random() * locations.length)]
      const timeAgo = Math.floor(Math.random() * 15) + 2
      
      const newBooking = {
        name: randomName,
        location: randomLocation,
        time: `${timeAgo} นาทีที่แล้ว`
      }
      
      setRecentBookings(prev => [newBooking, ...prev.slice(0, 1)])
    }, 18000)
    
    return () => {
      clearInterval(viewingInterval)
      clearInterval(bookingInterval)
    }
  }, [])
  
  // Flash Sale Timer - separate for clarity
  useEffect(() => {
    if (!showFlashSale) return
    
    const timer = setInterval(() => {
      setFlashSaleTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else {
          setShowFlashSale(false)
          return prev
        }
      })
    }, 1000)
    
    return () => clearInterval(timer)
  }, [showFlashSale])

  // Handle sticky CTA visibility
  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero-section')
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight
        setShowStickyCTA(window.scrollY > heroBottom)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle click outside calendar and prevent body scroll
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const calendarElement = document.getElementById('custom-calendar')
      if (showCalendar && calendarElement && !calendarElement.contains(event.target as Node)) {
        setShowCalendar(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showCalendar) {
        setShowCalendar(false)
      }
    }

    // Completely prevent window scroll when calendar is open
    const handleWindowWheel = (e: WheelEvent) => {
      if (showCalendar) {
        e.preventDefault()
        e.stopPropagation()
      }
    }

    const handleWindowTouchMove = (e: TouchEvent) => {
      if (showCalendar) {
        e.preventDefault()
      }
    }

    if (showCalendar) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)
      document.addEventListener('wheel', handleWindowWheel, { passive: false })
      document.addEventListener('touchmove', handleWindowTouchMove, { passive: false })
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('wheel', handleWindowWheel)
      document.removeEventListener('touchmove', handleWindowTouchMove)
    }
  }, [showCalendar])

  // Auto scroll tab container to show active tab
  const scrollTabIntoView = (tabKey: string) => {
    if (tabsContainerRef.current) {
      const tabContainer = tabsContainerRef.current
      const activeTabButton = tabContainer.querySelector(`button[data-tab="${tabKey}"]`) as HTMLElement
      
      if (activeTabButton) {
        const containerRect = tabContainer.getBoundingClientRect()
        const tabRect = activeTabButton.getBoundingClientRect()
        
        // Check if tab is not fully visible
        if (tabRect.right > containerRect.right || tabRect.left < containerRect.left) {
          const scrollLeft = activeTabButton.offsetLeft - (tabContainer.clientWidth / 2) + (activeTabButton.clientWidth / 2)
          tabContainer.scrollTo({
            left: scrollLeft,
            behavior: 'smooth'
          })
        }
      }
    }
  }

  // Handle sticky tabs and auto-highlight based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (tabsRef.current) {
        const tabsTop = tabsRef.current.offsetTop
        const headerHeight = 80 // Approximate header height
        setStickyTabs(window.scrollY > tabsTop - headerHeight)
      }

      // Check which section is in view
      const sections = [
        { ref: highlightsRef, key: 'highlights' },
        { ref: travelDatesRef, key: 'travel-dates' },
        { ref: itineraryRef, key: 'itinerary' },
        { ref: includedRef, key: 'included' },
        { ref: galleryRef, key: 'gallery' },
        { ref: reviewsRef, key: 'reviews' },
        { ref: relatedToursRef, key: 'related-tours' }
      ]

      const headerHeight = 80
      const tabsHeight = stickyTabs ? 80 : 0
      const offset = headerHeight + tabsHeight + 50

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section.ref.current) {
          const rect = section.ref.current.getBoundingClientRect()
          if (rect.top <= offset) {
            setActiveTab(section.key)
            // Auto scroll tab container to show active tab
            scrollTabIntoView(section.key)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [stickyTabs])

  // Handle tab click scrolling
  const scrollToSection = (tabKey: string) => {
    const sectionMap = {
      highlights: highlightsRef,
      'travel-dates': travelDatesRef,
      itinerary: itineraryRef,
      included: includedRef,
      gallery: galleryRef,
      reviews: reviewsRef
    }

    const ref = sectionMap[tabKey as keyof typeof sectionMap]
    if (ref?.current) {
      const headerHeight = 80
      const tabsHeight = 80
      const offset = headerHeight + tabsHeight + 20
      
      const elementTop = ref.current.offsetTop
      const offsetPosition = elementTop - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
    setActiveTab(tabKey)
  }

  // Memoized helper functions for better performance
  const formatPrice = useCallback((price: number) => {
    return new Intl.NumberFormat('th-TH').format(price)
  }, [])
  
  const formatDateForDisplay = useCallback((dateStr: string) => {
    if (!dateStr) return 'เลือกวันเดินทาง'
    const [year, month, day] = dateStr.split('-')
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
    return date.toLocaleDateString('th-TH', { 
      weekday: 'long',
      day: 'numeric', 
      month: 'long',
      year: 'numeric'
    })
  }, [])



  // BookingCTA component moved outside - see above

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center text-sm overflow-x-auto scrollbar-hide whitespace-nowrap" role="navigation">
            <Link href="/" className="text-blue-600 hover:underline inline-block">หน้าแรก</Link>
            <span className="text-gray-400 inline-block mx-2" aria-hidden="true">/</span>
            <Link href="/tour-search-21" className="text-blue-600 hover:underline inline-block">ทัวร์ต่างประเทศ</Link>
            <span className="text-gray-400 inline-block mx-2" aria-hidden="true">/</span>
            <span className="text-gray-600 inline-block">{tour.destination}</span>
            <span className="text-gray-400 inline-block mx-2" aria-hidden="true">/</span>
            <span className="text-gray-900 font-medium inline-block">{tour.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Hero Section */}
            <section id="hero-section" className="mb-8">
              {/* Mobile Back Button */}
              <div className="flex items-center mb-4 lg:hidden">
                <Link href="/tour-search-21" className="flex items-center text-gray-600 hover:text-gray-900">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  <span>กลับ</span>
                </Link>
                <div className="flex-1 flex justify-end space-x-2">
                  <button className="p-2 text-gray-600 hover:text-red-500">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-gray-900">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="relative">
                {/* Image Carousel */}
                <div className="relative h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden mb-4">
                  <Image
                    src={tour.gallery?.[activeImageIndex] || tour.image}
                    alt={tour.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      HOT
                    </span>
                  </div>
                  {tour.gallery && tour.gallery.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {tour.gallery.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveImageIndex(index)}
                          className={`w-2 h-2 rounded-full ${
                            index === activeImageIndex ? 'bg-white' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Title and basic info */}
                <div className="space-y-4">
                  <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                      {tour.title}
                    </h1>
                    <div className="flex flex-wrap items-center text-sm text-gray-600 space-x-4">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {tour.destination}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {tour.duration}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        เหลือ {tour.availableSeats} ที่นั่ง
                      </div>
                    </div>
                  </div>

                  {/* Mobile Price & CTA */}
                  <div className="lg:hidden bg-gray-50 rounded-2xl p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-blue-600">
                            ฿{formatPrice(tour.price)}
                          </div>
                          <div className="text-sm text-gray-500">ต่อคน</div>
                        </div>
                        <button 
                          onClick={() => setShowBookingModal(true)}
                          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
                        >
                          จองเลย
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Tab Navigation - Mobile First Optimized with Sticky */}
            <div 
              ref={tabsRef}
              className={`mb-6 transition-all duration-300 ${
                stickyTabs ? 'fixed top-20 left-0 right-0 z-40 bg-white shadow-md py-4' : ''
              }`}
            >
              <div className={`${
                stickyTabs ? 'max-w-screen-xl mx-auto px-4' : ''
              }`}>
                <div className="bg-gray-100 rounded-xl p-1">
                  {/* Mobile: Scrollable tabs */}
                  <div ref={tabsContainerRef} className="flex space-x-1 overflow-x-auto scrollbar-hide md:grid md:grid-cols-7 md:gap-1">
                    {[
                      { key: 'highlights', label: 'จุดเด่น', mobileLabel: 'จุดเด่น' },
                      { key: 'travel-dates', label: 'ช่วงเวลาเดินทาง', mobileLabel: 'วันเดินทาง' },
                      { key: 'itinerary', label: 'กำหนดการเดินทาง', mobileLabel: 'กำหนดการ' },
                      { key: 'included', label: 'รวมในแพ็กเกจ', mobileLabel: 'รายการ' },
                      { key: 'gallery', label: 'ภาพถ่าย', mobileLabel: 'ภาพถ่าย' },
                      { key: 'reviews', label: 'รีวิว', mobileLabel: 'รีวิว' },
                      { key: 'related-tours', label: 'ทัวร์ที่คุณอาจสนใจ', mobileLabel: 'ทัวร์อื่น' }
                    ].map(tab => (
                      <button
                        key={tab.key}
                        data-tab={tab.key}
                        onClick={() => scrollToSection(tab.key)}
                        className={`flex-shrink-0 md:flex-1 py-3 px-4 md:px-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                          activeTab === tab.key
                            ? 'bg-white text-blue-600 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        <span className="md:hidden">{tab.mobileLabel}</span>
                        <span className="hidden md:inline">{tab.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Spacing for sticky tabs */}
            {stickyTabs && <div className="h-20"></div>}

            {/* Highlights Section */}
            <section ref={highlightsRef} className="mb-8">
              <h2 className="text-xl font-bold mb-4">จุดเด่นของทัวร์</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {tour.highlights.map((highlight, index) => (
                  <div key={`highlight-${index}`} className="flex items-center space-x-3 p-4 bg-blue-50 rounded-xl">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      ✓
                    </div>
                    <span className="text-sm font-medium text-gray-900">{highlight}</span>
                  </div>
                ))}
                {/* Additional standard features */}
                {[
                  { icon: Plane, text: 'บินตรง' },
                  { icon: Hotel, text: 'โรงแรม 4 ดาว' },
                  { icon: Utensils, text: 'อาหารครบ' },
                  { icon: Car, text: 'รถรับส่ง' }
                ].map((feature, index) => {
                  const Icon = feature.icon
                  return (
                    <div key={`feature-${index}`} className="flex items-center space-x-3 p-4 bg-blue-50 rounded-xl">
                      <Icon className="w-5 h-5 text-blue-500" />
                      <span className="text-sm font-medium">{feature.text}</span>
                    </div>
                  )
                })}
              </div>
            </section>

            {/* Travel Dates Section */}
            <section ref={travelDatesRef} className="mb-8">
              <h2 className="text-xl font-bold mb-4">ช่วงเวลาเดินทาง</h2>
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                {/* Month Tabs - Mobile First */}
                <div className="mb-6">
                  <div className="flex space-x-1 overflow-x-auto scrollbar-hide pb-2">
                    {['ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'].map((month) => (
                      <button
                        key={month}
                        onClick={() => setActiveMonth(month)}
                        className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                          activeMonth === month
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {month} 2568
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  {calendarDates
                    .filter(dateObj => {
                      const monthShort = dateObj.date.toLocaleDateString('th-TH', { month: 'short' })
                      return monthShort === activeMonth
                    })
                    .slice(0, 10)
                    .map((dateObj, index) => {
                    const isRecommended = dateObj.price <= tour.price
                    const isHighSeason = dateObj.price > tour.price * 1.1
                    const isSelected = selectedTravelDate === index
                    const availableSeats = dateObj.available ? Math.floor(Math.random() * 10) + 1 : 0
                    const isDisabled = !dateObj.available
                    
                    return (
                      <button 
                        key={index}
                        disabled={isDisabled}
                        onClick={() => setSelectedTravelDate(index)}
                        className={`w-full p-4 rounded-xl text-left border transition-colors ${
                          isDisabled 
                            ? 'bg-gray-50 border-gray-200 opacity-50 cursor-not-allowed'
                            : isSelected
                              ? 'bg-blue-50 border-blue-300 hover:border-blue-400'
                              : 'bg-white border-gray-200 hover:border-blue-300'
                        }`}>
                        <div className="flex justify-between items-start">
                          <div className="flex gap-3">
                            <div className="text-center min-w-[40px]">
                              <div className={`text-xl font-bold ${isDisabled ? 'text-gray-400' : 'text-gray-900'}`}>
                                {dateObj.date.getDate()}
                              </div>
                              <div className="text-xs text-gray-500">
                                {dateObj.date.toLocaleDateString('th-TH', { weekday: 'short' }).replace('.', '')}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {dateObj.date.toLocaleDateString('th-TH', { 
                                  month: 'short', 
                                  year: 'numeric' 
                                })}
                              </div>
                              <div className={`text-xs mt-1 ${
                                isDisabled 
                                  ? 'text-gray-400' 
                                  : availableSeats <= 3
                                    ? 'text-orange-600'
                                    : 'text-gray-500'
                              }`}>
                                {isDisabled 
                                  ? 'เต็มแล้ว' 
                                  : `เหลือ ${availableSeats} ที่นั่ง`
                                }
                              </div>
                            </div>
                          </div>
                          {!isDisabled && (
                            <div className="text-right">
                              <div className="text-lg font-bold text-gray-900">
                                ฿{formatPrice(dateObj.price)}
                              </div>
                              {isRecommended && (
                                <div className="text-xs text-green-600 font-medium">ราคาดี</div>
                              )}
                            </div>
                          )}
                        </div>
                      </button>
                    )
                  })}
                  
                  {/* Empty State */}
                  {calendarDates.filter(dateObj => {
                    const monthShort = dateObj.date.toLocaleDateString('th-TH', { month: 'short' })
                    return monthShort === activeMonth
                  }).length === 0 && (
                    <div className="text-center py-8">
                      <div className="text-gray-400 mb-2">📅</div>
                      <p className="text-gray-500 text-sm">
                        ยังไม่มีรอบเดินทางสำหรับเดือน{activeMonth} 2568
                      </p>
                      <p className="text-gray-400 text-xs mt-1">
                        ลองเลือกเดือนอื่นหรือดูวันที่เดินทางทั้งหมด
                      </p>
                    </div>
                  )}
                </div>
                
                {/* View More Button */}
                <div className="mt-6 text-center">
                  <button 
                    onClick={() => setShowCalendar(true)}
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
                  >
                    <Calendar className="w-5 h-5" />
                    <span>ดูวันที่เดินทางทั้งหมด</span>
                  </button>
                </div>
              </div>
            </section>

            {/* Tab Content - All sections visible for scrolling */}
            
            {/* Itinerary Section */}
            <section ref={itineraryRef} className="mb-8">
                <div className="space-y-4">
                  {tour.itinerary?.map((day) => (
                    <div key={day.day} className="border border-gray-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setExpandedItinerary(expandedItinerary === day.day ? 0 : day.day)}
                        className="w-full px-6 py-4 bg-gray-50 flex items-center justify-between hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                            {day.day}
                          </div>
                          <h3 className="font-semibold text-left">{day.title}</h3>
                        </div>
                        {expandedItinerary === day.day ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </button>
                      
                      {expandedItinerary === day.day && (
                        <div className="px-6 py-4 bg-white">
                          <ul className="space-y-2">
                            {day.activities.map((activity, index) => (
                              <li key={index} className="flex items-start space-x-3">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-gray-700">{activity}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>

            {/* Included Section */}
            <section ref={includedRef} className="mb-8">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Included */}
                  <div className="bg-green-50 rounded-xl p-6">
                    <h3 className="font-bold text-green-800 mb-4 flex items-center">
                      <Check className="w-5 h-5 mr-2" />
                      รวมในแพ็กเกจ
                    </h3>
                    <ul className="space-y-2">
                      {[
                        'ตั๋วเครื่องบิน (ไป-กลับ)',
                        'โรงแรม 4-5 ดาว',
                        'รถรับส่งสนามบิน',
                        'อาหาร 3 มื้อตามโปรแกรม',
                        'ไกด์นำเที่ยวท้องถิ่น',
                        'ค่าเข้าชมสถานที่ท่องเที่ยว',
                        'ประกันการเดินทางพื้นฐาน'
                      ].map((item, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <Check className="w-4 h-4 text-green-600" />
                          <span className="text-green-800">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Not Included */}
                  <div className="bg-red-50 rounded-xl p-6">
                    <h3 className="font-bold text-red-800 mb-4 flex items-center">
                      <X className="w-5 h-5 mr-2" />
                      ไม่รวมในแพ็กเกจ
                    </h3>
                    <ul className="space-y-2">
                      {[
                        'ค่าทิปไกด์และคนขับรถ',
                        'ค่าวีซ่า (หากจำเป็น)',
                        'ประกันการเดินทางเพิ่มเติม',
                        'ค่าใช้จ่ายส่วนตัว',
                        'อาหารและเครื่องดื่มนอกโปรแกรม',
                        'ค่าภาษีสนามบินต่างประเทศ',
                        'ค่าโทรศัพท์และอินเทอร์เน็ต'
                      ].map((item, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <X className="w-4 h-4 text-red-600" />
                          <span className="text-red-800">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

            {/* Gallery Section */}
            <section ref={galleryRef} className="mb-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {(tour.gallery || [tour.image]).map((image, index) => (
                    <div key={index} className="relative aspect-square rounded-xl overflow-hidden">
                      <Image
                        src={image}
                        alt={`${tour.title} - ${index + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform cursor-pointer"
                        onClick={() => setActiveImageIndex(index)}
                      />
                    </div>
                  ))}
                </div>
              </section>

            {/* Reviews Section */}
            <section ref={reviewsRef} className="mb-8">
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="text-4xl font-bold text-gray-900">{tour.rating}</div>
                      <div>
                        <div className="flex items-center mb-1">
                          {Array.from({ length: 5 }, (_, i) => {
                            const starValue = i + 1
                            const isFilled = starValue <= Math.floor(tour.rating)
                            const isHalf = starValue === Math.ceil(tour.rating) && tour.rating % 1 !== 0
                            return (
                              <Star 
                                key={i} 
                                className={`w-5 h-5 ${
                                  isFilled || isHalf ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                }`}
                              />
                            )
                          })}
                        </div>
                        <p className="text-gray-600 text-sm">{tour.reviewCount} รีวิวจากลูกค้า</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {reviewsData.map(review => (
                      <div key={review.id} className="border border-gray-200 rounded-xl p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold">{review.name}</h4>
                            <div className="flex items-center mt-1">
                              {Array.from({ length: 5 }, (_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-4 h-4 ${
                                    i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                  }`} 
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <p className="text-gray-700 mb-3">{review.comment}</p>
                        {review.images && review.images.length > 0 && (
                          <div className="flex space-x-2">
                            {review.images.map((img, index) => (
                              <div key={index} className="relative w-20 h-20 rounded-lg overflow-hidden">
                                <Image 
                                  src={img} 
                                  alt={`รีวิวของ ${review.name}`} 
                                  fill 
                                  className="object-cover" 
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </section>

            {/* Trust & Safety - moved up for better UX flow */}
            <section className="mb-8">
              <div className="bg-blue-50 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center">
                  <Shield className="w-6 h-6 mr-2" />
                  ความไว้วางใจและความปลอดภัย
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Award className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-blue-900">ใบอนุญาต ททท.</h3>
                        <p className="text-sm text-blue-700">ได้รับการรับรองจากการท่องเที่ยวแห่งประเทศไทย</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Shield className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-blue-900">การันตีคืนเงิน 100%</h3>
                        <p className="text-sm text-blue-700">หากไม่สามารถออกเดินทางได้ตามกำหนด</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Globe className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-blue-900">พันธมิตรทั่วโลก</h3>
                        <p className="text-sm text-blue-700">ร่วมงานกับโรงแรมและสายการบินชั้นนำ</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Phone className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-blue-900">ดูแล 24/7</h3>
                        <p className="text-sm text-blue-700">ทีมงานพร้อมให้คำปรึกษาตลอดการเดินทาง</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-6">คำถามที่พบบ่อย</h2>
              <div className="space-y-4">
                {faqData.map((faq, index) => (
                  <div key={`faq-${index}`} className="border border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                      className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 flex items-center justify-between transition-colors"
                      aria-expanded={expandedFAQ === index}
                      aria-controls={`faq-content-${index}`}
                    >
                      <span className="font-medium">{faq.question}</span>
                      {expandedFAQ === index ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                    {expandedFAQ === index && (
                      <div id={`faq-content-${index}`} className="px-6 py-4 bg-white">
                        <p className="text-gray-700">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            
            {/* Related Tours - moved to the end for better UX */}
            <section ref={relatedToursRef} className="mb-8">
              <h2 className="text-xl font-bold mb-6">ทัวร์ที่คุณอาจสนใจ</h2>
              <div className="space-y-6 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
                {tourData
                  .filter(t => t.id !== tour.id && t.available)
                  .slice(0, 4)
                  .map(relatedTour => (
                  <Link key={relatedTour.id} href={`/tour-search-21/${relatedTour.id}`} className="group block mb-6">
                    <div className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-48">
                        <Image
                          src={relatedTour.image}
                          alt={relatedTour.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                        {relatedTour.availableSeats <= 5 && (
                          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
                            เหลือ {relatedTour.availableSeats} ที่!
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold mb-2 group-hover:text-blue-600 line-clamp-1">{relatedTour.title}</h3>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm text-gray-600">
                            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                            {relatedTour.rating} ({relatedTour.reviewCount})
                          </div>
                          <div className="text-right">
                            {relatedTour.originalPrice && (
                              <div className="text-xs text-gray-400 line-through">
                                ฿{formatPrice(relatedTour.originalPrice)}
                              </div>
                            )}
                            <div className="text-lg font-bold text-blue-600">
                              ฿{formatPrice(relatedTour.price)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

          </div>

          {/* Sidebar - Desktop Booking Box */}
          <div className="hidden lg:block">
            <div className="sticky top-6">
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-lg">
                {/* Desktop Booking Box */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold text-blue-600">
                        ฿{formatPrice(tour.price)}
                      </div>
                      <div className="text-sm text-gray-500">ต่อคน</div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setShowBookingModal(true)}
                    className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors"
                  >
                    จองทัวร์
                  </button>
                  
                  <button className="w-full border-2 border-blue-600 text-blue-600 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors">
                    สอบถามรายละเอียด
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky CTA - Mobile Compact */}
      {showStickyCTA && (
        <div className="fixed bottom-0 left-0 right-0 lg:hidden z-50 bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-3">
            {/* Special Offer Ticker - Compact */}
            <div className="bg-blue-500 text-white text-center py-1 px-3 rounded-full mb-2 text-xs">
              ⭐ โปรโมชั่นพิเศษ - จองวันนี้!
            </div>
            
            {/* Main Content - Single Row */}
            <div className="flex items-center justify-between">
              {/* Price Section */}
              <div className="flex-1">
                <div className="flex items-baseline space-x-1">
                  {tour.originalPrice && (
                    <span className="text-xs text-gray-400 line-through">฿{formatPrice(tour.originalPrice)}</span>
                  )}
                  <span className="text-xl font-bold text-blue-600">฿{formatPrice(tour.price)}</span>
                </div>
                <div className="flex items-center space-x-3 text-xs text-gray-500">
                  <span>ต่อคน</span>
                  {tour.availableSeats <= 5 && (
                    <span className="text-red-500 font-medium">🔥 เหลือ {tour.availableSeats} ที่!</span>
                  )}
                  <span>👥 {viewingUsers} คนดู</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 ml-3">
                <button className="bg-green-500 text-white w-14 h-14 rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105 flex items-center justify-center min-h-[56px] min-w-[56px] touch-manipulation">
                  <MessageCircle className="w-5 h-5" />
                </button>
                
                <button 
                  onClick={() => {
                    // Allow booking without date selection - can select date in modal
                    setShowBookingModal(true)
                  }}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center space-x-1 min-h-[56px] touch-manipulation">
                  <Calendar className="w-4 h-4" />
                  <span>จองทัวร์</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {showBookingModal && (
        <BookingModal
          tour={tour}
          selectedDate={selectedDate}
          bookingStep={bookingStep}
          setBookingStep={setBookingStep}
          bookingData={bookingData}
          setBookingData={setBookingData}
          isLoading={isBookingLoading}
          setIsLoading={setIsBookingLoading}
          onClose={() => setShowBookingModal(false)}
          onOpenCalendar={() => setShowCalendar(true)}
          formatPrice={formatPrice}
        />
      )}
    </div>
  )
}