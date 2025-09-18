'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Search, Filter, MapPin, Calendar, Clock, Users, Star, Heart, 
  ArrowRight, TrendingUp, Award, Sparkles, X, ChevronDown, ChevronUp,
  Plane, Hotel, Globe, Eye, Menu, SlidersHorizontal, RefreshCw
} from 'lucide-react'
// Mock tour data for tour-search-11
const mockTours = [
  {
    id: 1,
    title: "ญี่ปุ่น 7 วัน 6 คืน โตเกียว-เกียวโต-โอซาก้า",
    price: 45900,
    originalPrice: 52900,
    duration: "7 วัน 6 คืน",
    rating: 4.8,
    reviews: 127,
    highlights: ["วัดคิโยมิซุ", "ภูเขาฟูจิ", "ชินจูกุ", "ดาเตะบาชิ"],
    destinations: ["โตเกียว", "เกียวโต", "โอซาก้า"],
    country: "ญี่ปุ่น",
    category: "cultural",
    airline: "JAL",
    hotel: "4-5 ดาว",
    availableSeats: 8,
    badge: "ยอดนิยม",
    includes: ["ตั๋วเครื่องบิน", "โรงแรม", "มื้ออาหาร", "ไกด์ท้องถิ่น"],
    groupSizeMin: 15,
    groupSizeMax: 25,
    popularity: 611.6,
    isNew: true,
    lastUpdated: new Date('2024-12-15')
  },
  {
    id: 2,
    title: "เกาหลีใต้ 6 วัน 5 คืน โซล-ปูซาน-เชจู",
    price: 38900,
    originalPrice: 45900,
    duration: "6 วัน 5 คืน",
    rating: 4.7,
    reviews: 89,
    highlights: ["พระราชวังเคียงบกกุง", "เกาะเชจู", "ตลาดนัมแดมุน", "หอคอยเอ็นโซล"],
    destinations: ["โซล", "ปูซาน", "เชจู"],
    country: "เกาหลี",
    category: "cultural",
    airline: "Korean Air",
    hotel: "4 ดาว",
    availableSeats: 15,
    badge: "โปรโมชั่น",
    includes: ["ตั๋วเครื่องบิน", "โรงแรม", "มื้ออาหาร", "ไกด์ไทย"],
    groupSizeMin: 20,
    groupSizeMax: 30,
    popularity: 418.3,
    isNew: true,
    lastUpdated: new Date('2024-12-10')
  },
  {
    id: 3,
    title: "ยุโรป 12 วัน 11 คืน ฝรั่งเศส-อิตาลี-สวิตเซอร์แลนด์",
    price: 129900,
    originalPrice: 149900,
    duration: "12 วัน 11 คืน",
    rating: 4.9,
    reviews: 203,
    highlights: ["หอไอเฟล", "โคลอสเซียม", "หอเอนปิซา", "เทือกเขาแอลป์"],
    destinations: ["ปารีส", "โรม", "มิลาน", "ซูริค"],
    country: "ยุโรป",
    category: "luxury",
    airline: "Emirates",
    hotel: "4-5 ดาว",
    availableSeats: 5,
    badge: "พรีเมียม",
    includes: ["ตั๋วเครื่องบิน", "โรงแรม", "มื้ออาหาร", "ไกด์ท้องถิ่น", "รถทัวร์"],
    groupSizeMin: 12,
    groupSizeMax: 18,
    popularity: 994.7,
    isNew: false,
    lastUpdated: new Date('2024-11-20')
  }
]

// Enhanced tour data with more comprehensive information
const enhancedTours = mockTours

const featuredTours = enhancedTours.slice(0, 6).map(tour => ({
  ...tour,
  featured: true,
  specialOffer: Math.random() > 0.5 ? 'ราคาพิเศษ' : null
}))

const quickSearchTags = [
  'ญี่ปุ่น ใบไม้เปลี่ยนสี', 'เกาหลี K-Pop', 'ยุโรป คริสต์มาส', 
  'สิงคโปร์ ครอบครัว', 'เวียดนาม เกาะแสม', 'ออสเตรเลีย ธรรมชาติ'
]

// Function to get banner image based on tour
const getTourBannerImage = (tour: typeof mockTours[0]) => {
  const tourTitle = tour.title.toLowerCase()
  const destinations = tour.destinations?.map(d => d.toLowerCase()) || []
  
  // Japan tours with specific landscape images
  if (tourTitle.includes('ญี่ปุ่น') || destinations.some(d => d.includes('โตเกียว') || d.includes('เกียวโต') || d.includes('โอซาก้า') || d.includes('นารา') || d.includes('ซัปโปโร') || d.includes('ทาคายาม่า') || d.includes('ชิราคาวาโกะ') || d.includes('คานาซาว่า') || d.includes('คุมาโมโต้') || d.includes('ฟุกุโอกะ') || d.includes('เบปปุ') || d.includes('โอตารุ') || d.includes('ฟูราโน่'))) {
    const japanImages = [
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=400&fit=crop&crop=entropy', // Tokyo
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=400&fit=crop&crop=entropy', // Kyoto
      'https://images.unsplash.com/photo-1569163139394-de4798e9a8c0?w=800&h=400&fit=crop&crop=entropy', // Hokkaido
      'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=800&h=400&fit=crop&crop=entropy', // Takayama
      'https://images.unsplash.com/photo-1590766940554-634a7ed41d69?w=800&h=400&fit=crop&crop=entropy', // Disney
      'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&h=400&fit=crop&crop=entropy', // Kumamoto
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop&crop=entropy', // Sendai
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=400&fit=crop&crop=entropy', // Okinawa
      'https://images.unsplash.com/photo-1604608672516-2c1177b10c92?w=800&h=400&fit=crop&crop=entropy', // Hiroshima
      'https://images.unsplash.com/photo-1565021993-2faea7a8113b?w=800&h=400&fit=crop&crop=entropy', // Nagoya
      'https://images.unsplash.com/photo-1490650034439-fd184c3c86a5?w=800&h=400&fit=crop&crop=entropy', // Cherry blossoms
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop&crop=entropy', // Mount Fuji
      'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=800&h=400&fit=crop&crop=entropy', // Shirakawa-go
      'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&h=400&fit=crop&crop=entropy'  // Kanazawa
    ]
    return japanImages[Math.floor(Math.random() * japanImages.length)]
  }
  
  // Korea tours with specific landscape images
  if (tourTitle.includes('เกาหลี') || destinations.some(d => d.includes('โซล') || d.includes('ปูซาน') || d.includes('เชจู') || d.includes('เกาหลีใต้'))) {
    const koreaImages = [
      'https://images.unsplash.com/photo-1538485399081-7c8ed7f69c91?w=800&h=400&fit=crop&crop=entropy', // Seoul
      'https://images.unsplash.com/photo-1546874177-31bfa593f693?w=800&h=400&fit=crop&crop=entropy', // Seoul city
      'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800&h=400&fit=crop&crop=entropy', // Korean landscape
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop&crop=entropy', // Korean temple
      'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&h=400&fit=crop&crop=entropy', // Jeju Island
      'https://images.unsplash.com/photo-1538485399081-7c8ed7f69c91?w=800&h=400&fit=crop&crop=entropy', // Busan
      'https://images.unsplash.com/photo-1546874177-31bfa593f693?w=800&h=400&fit=crop&crop=entropy', // Korean palace
      'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800&h=400&fit=crop&crop=entropy', // Korean mountains
      'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&h=400&fit=crop&crop=entropy'  // Korean countryside
    ]
    return koreaImages[Math.floor(Math.random() * koreaImages.length)]
  }
  
  // China tours with specific landscape images
  if (tourTitle.includes('จีน') || destinations.some(d => d.includes('ปักกิ่ง') || d.includes('เซี่ยงไฮ้') || d.includes('จีน'))) {
    const chinaImages = [
      'https://images.unsplash.com/photo-1508804052814-cd3ba865a116?w=800&h=400&fit=crop&crop=entropy', // Beijing
      'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=800&h=400&fit=crop&crop=entropy', // Great Wall
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop&crop=entropy', // Shanghai
      'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&h=400&fit=crop&crop=entropy', // Chinese landscape
      'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=800&h=400&fit=crop&crop=entropy', // Forbidden City
      'https://images.unsplash.com/photo-1508804052814-cd3ba865a116?w=800&h=400&fit=crop&crop=entropy', // Shanghai skyline
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop&crop=entropy', // Chinese mountains
      'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&h=400&fit=crop&crop=entropy', // Chinese countryside
      'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=800&h=400&fit=crop&crop=entropy'  // Chinese architecture
    ]
    return chinaImages[Math.floor(Math.random() * chinaImages.length)]
  }
  
  // Taiwan tours with specific landscape images
  if (tourTitle.includes('ไต้หวัน') || destinations.some(d => d.includes('ไทเป') || d.includes('อาลีซาน') || d.includes('ไต้หวัน'))) {
    const taiwanImages = [
      'https://images.unsplash.com/photo-1470004914212-05527e49370b?w=800&h=400&fit=crop&crop=entropy', // Taipei
      'https://images.unsplash.com/photo-1508248467877-aec1b08de376?w=800&h=400&fit=crop&crop=entropy', // Taiwan landscape
      'https://images.unsplash.com/photo-1470004914212-05527e49370b?w=800&h=400&fit=crop&crop=entropy', // Taipei 101
      'https://images.unsplash.com/photo-1508248467877-aec1b08de376?w=800&h=400&fit=crop&crop=entropy', // Alishan
      'https://images.unsplash.com/photo-1470004914212-05527e49370b?w=800&h=400&fit=crop&crop=entropy', // Taiwan mountains
      'https://images.unsplash.com/photo-1508248467877-aec1b08de376?w=800&h=400&fit=crop&crop=entropy', // Taiwan coast
      'https://images.unsplash.com/photo-1470004914212-05527e49370b?w=800&h=400&fit=crop&crop=entropy', // Taiwan cityscape
      'https://images.unsplash.com/photo-1508248467877-aec1b08de376?w=800&h=400&fit=crop&crop=entropy'  // Taiwan temples
    ]
    return taiwanImages[Math.floor(Math.random() * taiwanImages.length)]
  }
  
  // Europe tours with specific landscape images
  if (tourTitle.includes('ยุโรป') || destinations.some(d => d.includes('ปารีส') || d.includes('โรม') || d.includes('มิลาน') || d.includes('ซูริค') || d.includes('ฝรั่งเศส') || d.includes('อิตาลี') || d.includes('สวิตเซอร์แลนด์'))) {
    const europeImages = [
      'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&h=400&fit=crop&crop=entropy', // Paris
      'https://images.unsplash.com/photo-1509023925912-6c96c1de6c9e?w=800&h=400&fit=crop&crop=entropy', // Rome
      'https://images.unsplash.com/photo-1546268060-2592ff93ee24?w=800&h=400&fit=crop&crop=entropy', // Milan
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=400&fit=crop&crop=entropy', // Zurich
      'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&h=400&fit=crop&crop=entropy', // Eiffel Tower
      'https://images.unsplash.com/photo-1509023925912-6c96c1de6c9e?w=800&h=400&fit=crop&crop=entropy', // Colosseum
      'https://images.unsplash.com/photo-1546268060-2592ff93ee24?w=800&h=400&fit=crop&crop=entropy', // Swiss Alps
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=400&fit=crop&crop=entropy', // European countryside
      'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&h=400&fit=crop&crop=entropy', // French countryside
      'https://images.unsplash.com/photo-1509023925912-6c96c1de6c9e?w=800&h=400&fit=crop&crop=entropy', // Italian countryside
      'https://images.unsplash.com/photo-1546268060-2592ff93ee24?w=800&h=400&fit=crop&crop=entropy'  // European architecture
    ]
    return europeImages[Math.floor(Math.random() * europeImages.length)]
  }
  
  // Australia tours with specific landscape images
  if (tourTitle.includes('ออสเตรเลีย') || destinations.some(d => d.includes('ซิดนีย์') || d.includes('เมลเบิร์น') || d.includes('โกลด์โคสต์') || d.includes('ออสเตรเลีย'))) {
    const australiaImages = [
      'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&h=400&fit=crop&crop=entropy', // Sydney
      'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800&h=400&fit=crop&crop=entropy', // Melbourne
      'https://images.unsplash.com/photo-1514395462725-fb4566210144?w=800&h=400&fit=crop&crop=entropy', // Gold Coast
      'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&h=400&fit=crop&crop=entropy', // Opera House
      'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800&h=400&fit=crop&crop=entropy', // Great Barrier Reef
      'https://images.unsplash.com/photo-1514395462725-fb4566210144?w=800&h=400&fit=crop&crop=entropy', // Uluru
      'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&h=400&fit=crop&crop=entropy', // Australian outback
      'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800&h=400&fit=crop&crop=entropy', // Australian beaches
      'https://images.unsplash.com/photo-1514395462725-fb4566210144?w=800&h=400&fit=crop&crop=entropy'  // Australian wildlife
    ]
    return australiaImages[Math.floor(Math.random() * australiaImages.length)]
  }
  
  // New Zealand tours with specific landscape images
  if (tourTitle.includes('นิวซีแลนด์') || destinations.some(d => d.includes('ออกแลนด์') || d.includes('ควีนส์ทาวน์') || d.includes('เวลลิงตัน') || d.includes('นิวซีแลนด์'))) {
    const newZealandImages = [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop&crop=entropy', // Auckland
      'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&h=400&fit=crop&crop=entropy', // Queenstown
      'https://images.unsplash.com/photo-1465056836041-7f43ac27ae62?w=800&h=400&fit=crop&crop=entropy', // Wellington
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop&crop=entropy', // Milford Sound
      'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&h=400&fit=crop&crop=entropy', // Rotorua
      'https://images.unsplash.com/photo-1465056836041-7f43ac27ae62?w=800&h=400&fit=crop&crop=entropy', // Hobbiton
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop&crop=entropy', // New Zealand mountains
      'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&h=400&fit=crop&crop=entropy', // New Zealand lakes
      'https://images.unsplash.com/photo-1465056836041-7f43ac27ae62?w=800&h=400&fit=crop&crop=entropy'  // New Zealand fjords
    ]
    return newZealandImages[Math.floor(Math.random() * newZealandImages.length)]
  }
  
  // Canada tours with specific landscape images
  if (tourTitle.includes('แคนาดา') || destinations.some(d => d.includes('แวนคูเวอร์') || d.includes('แคลกะรี') || d.includes('โตรอนโต') || d.includes('แคนาดา'))) {
    const canadaImages = [
      'https://images.unsplash.com/photo-1519832979-6fa011b87667?w=800&h=400&fit=crop&crop=entropy', // Vancouver
      'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800&h=400&fit=crop&crop=entropy', // Calgary
      'https://images.unsplash.com/photo-1609825488888-3a766db05542?w=800&h=400&fit=crop&crop=entropy', // Toronto
      'https://images.unsplash.com/photo-1519832979-6fa011b87667?w=800&h=400&fit=crop&crop=entropy', // Banff
      'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800&h=400&fit=crop&crop=entropy', // Niagara Falls
      'https://images.unsplash.com/photo-1609825488888-3a766db05542?w=800&h=400&fit=crop&crop=entropy', // Canadian Rockies
      'https://images.unsplash.com/photo-1519832979-6fa011b87667?w=800&h=400&fit=crop&crop=entropy', // Stanley Park
      'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800&h=400&fit=crop&crop=entropy', // Canadian lakes
      'https://images.unsplash.com/photo-1609825488888-3a766db05542?w=800&h=400&fit=crop&crop=entropy'  // Canadian wilderness
    ]
    return canadaImages[Math.floor(Math.random() * canadaImages.length)]
  }

  // Singapore tours with specific landscape images
  if (tourTitle.includes('สิงคโปร์') || destinations.some(d => d.includes('สิงคโปร์'))) {
    const singaporeImages = [
      'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&h=400&fit=crop&crop=entropy', // Singapore skyline
      'https://images.unsplash.com/photo-1506351421178-63b52a2d2562?w=800&h=400&fit=crop&crop=entropy', // Marina Bay Sands
      'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&h=400&fit=crop&crop=entropy', // Gardens by the Bay
      'https://images.unsplash.com/photo-1506351421178-63b52a2d2562?w=800&h=400&fit=crop&crop=entropy', // Singapore city
      'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&h=400&fit=crop&crop=entropy', // Singapore architecture
      'https://images.unsplash.com/photo-1506351421178-63b52a2d2562?w=800&h=400&fit=crop&crop=entropy'  // Singapore waterfront
    ]
    return singaporeImages[Math.floor(Math.random() * singaporeImages.length)]
  }

  // Vietnam tours with specific landscape images
  if (tourTitle.includes('เวียดนาม') || destinations.some(d => d.includes('เวียดนาม') || d.includes('ฮานอย') || d.includes('โฮจิมินห์') || d.includes('ดานัง') || d.includes('ฮอยอัน'))) {
    const vietnamImages = [
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&h=400&fit=crop&crop=entropy', // Vietnam landscape
      'https://images.unsplash.com/photo-1506351421178-63b52a2d2562?w=800&h=400&fit=crop&crop=entropy', // Hanoi
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&h=400&fit=crop&crop=entropy', // Ho Chi Minh City
      'https://images.unsplash.com/photo-1506351421178-63b52a2d2562?w=800&h=400&fit=crop&crop=entropy', // Da Nang
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&h=400&fit=crop&crop=entropy', // Hoi An
      'https://images.unsplash.com/photo-1506351421178-63b52a2d2562?w=800&h=400&fit=crop&crop=entropy', // Halong Bay
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&h=400&fit=crop&crop=entropy'  // Vietnamese countryside
    ]
    return vietnamImages[Math.floor(Math.random() * vietnamImages.length)]
  }

  // Thailand tours with specific landscape images
  if (tourTitle.includes('ไทย') || destinations.some(d => d.includes('ไทย') || d.includes('กรุงเทพ') || d.includes('เชียงใหม่') || d.includes('ภูเก็ต') || d.includes('พัทยา'))) {
    const thailandImages = [
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&h=400&fit=crop&crop=entropy', // Thailand landscape
      'https://images.unsplash.com/photo-1506351421178-63b52a2d2562?w=800&h=400&fit=crop&crop=entropy', // Bangkok
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&h=400&fit=crop&crop=entropy', // Chiang Mai
      'https://images.unsplash.com/photo-1506351421178-63b52a2d2562?w=800&h=400&fit=crop&crop=entropy', // Phuket
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&h=400&fit=crop&crop=entropy', // Pattaya
      'https://images.unsplash.com/photo-1506351421178-63b52a2d2562?w=800&h=400&fit=crop&crop=entropy', // Thai temples
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&h=400&fit=crop&crop=entropy'  // Thai beaches
    ]
    return thailandImages[Math.floor(Math.random() * thailandImages.length)]
  }

  // Malaysia tours with specific landscape images
  if (tourTitle.includes('มาเลเซีย') || destinations.some(d => d.includes('มาเลเซีย') || d.includes('กัวลาลัมเปอร์') || d.includes('ลังกาวี') || d.includes('ปีนัง'))) {
    const malaysiaImages = [
      'https://images.unsplash.com/photo-1506351421178-63b52a2d2562?w=800&h=400&fit=crop&crop=entropy', // Kuala Lumpur
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&h=400&fit=crop&crop=entropy', // Langkawi
      'https://images.unsplash.com/photo-1506351421178-63b52a2d2562?w=800&h=400&fit=crop&crop=entropy', // Penang
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&h=400&fit=crop&crop=entropy', // Malaysian landscape
      'https://images.unsplash.com/photo-1506351421178-63b52a2d2562?w=800&h=400&fit=crop&crop=entropy', // Malaysian beaches
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&h=400&fit=crop&crop=entropy'  // Malaysian rainforest
    ]
    return malaysiaImages[Math.floor(Math.random() * malaysiaImages.length)]
  }

  // Indonesia tours with specific landscape images
  if (tourTitle.includes('อินโดนีเซีย') || destinations.some(d => d.includes('อินโดนีเซีย') || d.includes('บาหลี') || d.includes('จาการ์ตา') || d.includes('ยอกยาการ์ตา'))) {
    const indonesiaImages = [
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&h=400&fit=crop&crop=entropy', // Bali
      'https://images.unsplash.com/photo-1506351421178-63b52a2d2562?w=800&h=400&fit=crop&crop=entropy', // Jakarta
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&h=400&fit=crop&crop=entropy', // Yogyakarta
      'https://images.unsplash.com/photo-1506351421178-63b52a2d2562?w=800&h=400&fit=crop&crop=entropy', // Indonesian landscape
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&h=400&fit=crop&crop=entropy', // Indonesian temples
      'https://images.unsplash.com/photo-1506351421178-63b52a2d2562?w=800&h=400&fit=crop&crop=entropy'  // Indonesian beaches
    ]
    return indonesiaImages[Math.floor(Math.random() * indonesiaImages.length)]
  }

  // Philippines tours with specific landscape images
  if (tourTitle.includes('ฟิลิปปินส์') || destinations.some(d => d.includes('ฟิลิปปินส์') || d.includes('มะนิลา') || d.includes('เซบู') || d.includes('โบราเคย์'))) {
    const philippinesImages = [
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&h=400&fit=crop&crop=entropy', // Manila
      'https://images.unsplash.com/photo-1506351421178-63b52a2d2562?w=800&h=400&fit=crop&crop=entropy', // Cebu
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&h=400&fit=crop&crop=entropy', // Boracay
      'https://images.unsplash.com/photo-1506351421178-63b52a2d2562?w=800&h=400&fit=crop&crop=entropy', // Philippine landscape
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&h=400&fit=crop&crop=entropy', // Philippine beaches
      'https://images.unsplash.com/photo-1506351421178-63b52a2d2562?w=800&h=400&fit=crop&crop=entropy'  // Philippine islands
    ]
    return philippinesImages[Math.floor(Math.random() * philippinesImages.length)]
  }
  
  // Default fallback based on country
  if (tour.country?.includes('ญี่ปุ่น')) {
    return 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=400&fit=crop&crop=entropy'
  }
  if (tour.country?.includes('เกาหลี')) {
    return 'https://images.unsplash.com/photo-1538485399081-7c8ed7f69c91?w=800&h=400&fit=crop&crop=entropy'
  }
  if (tour.country?.includes('จีน')) {
    return 'https://images.unsplash.com/photo-1508804052814-cd3ba865a116?w=800&h=400&fit=crop&crop=entropy'
  }
  if (tour.country?.includes('ไต้หวัน')) {
    return 'https://images.unsplash.com/photo-1470004914212-05527e49370b?w=800&h=400&fit=crop&crop=entropy'
  }
  if (tour.country?.includes('ยุโรป')) {
    return 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&h=400&fit=crop&crop=entropy'
  }
  if (tour.country?.includes('ออสเตรเลีย')) {
    return 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&h=400&fit=crop&crop=entropy'
  }
  if (tour.country?.includes('นิวซีแลนด์')) {
    return 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop&crop=entropy'
  }
  if (tour.country?.includes('แคนาดา')) {
    return 'https://images.unsplash.com/photo-1519832979-6fa011b87667?w=800&h=400&fit=crop&crop=entropy'
  }
  if (tour.country?.includes('สิงคโปร์')) {
    return 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&h=400&fit=crop&crop=entropy'
  }
  if (tour.country?.includes('เวียดนาม')) {
    return 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&h=400&fit=crop&crop=entropy'
  }
  if (tour.country?.includes('ไทย')) {
    return 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&h=400&fit=crop&crop=entropy'
  }
  if (tour.country?.includes('มาเลเซีย')) {
    return 'https://images.unsplash.com/photo-1506351421178-63b52a2d2562?w=800&h=400&fit=crop&crop=entropy'
  }
  if (tour.country?.includes('อินโดนีเซีย')) {
    return 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&h=400&fit=crop&crop=entropy'
  }
  if (tour.country?.includes('ฟิลิปปินส์')) {
    return 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&h=400&fit=crop&crop=entropy'
  }
  
  // Ultimate fallback - beautiful travel landscape
  return 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=400&fit=crop&crop=entropy'
}

const categories = [
  { id: 'all', name: 'ทั้งหมด', icon: Globe, color: 'from-blue-600 to-blue-700', bgColor: 'bg-blue-50', textColor: 'text-blue-700' },
  { id: 'cultural', name: 'วัฒนธรรม', icon: Award, color: 'from-blue-600 to-blue-700', bgColor: 'bg-blue-50', textColor: 'text-blue-700' },
  { id: 'luxury', name: 'พรีเมียม', icon: Sparkles, color: 'from-blue-600 to-blue-700', bgColor: 'bg-blue-50', textColor: 'text-blue-700' },
  { id: 'family', name: 'ครอบครัว', icon: Users, color: 'from-blue-600 to-blue-700', bgColor: 'bg-blue-50', textColor: 'text-blue-700' },
  { id: 'adventure', name: 'ผจญภัย', icon: TrendingUp, color: 'from-blue-600 to-blue-700', bgColor: 'bg-blue-50', textColor: 'text-blue-700' },
  { id: 'nature', name: 'ธรรมชาติ', icon: MapPin, color: 'from-blue-600 to-blue-700', bgColor: 'bg-blue-50', textColor: 'text-blue-700' }
]

const popularDestinations = [
  { 
    country: 'ญี่ปุ่น', 
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=200&fit=crop&crop=entropy', 
    tours: 45, 
    trend: '+15%', 
    color: 'from-blue-500 to-blue-600' 
  },
  { 
    country: 'เกาหลี', 
    image: 'https://images.unsplash.com/photo-1538485399081-7c8ed7f69c91?w=400&h=200&fit=crop&crop=entropy', 
    tours: 32, 
    trend: '+8%', 
    color: 'from-blue-500 to-blue-600' 
  },
  { 
    country: 'จีน', 
    image: 'https://images.unsplash.com/photo-1508804052814-cd3ba865a116?w=400&h=200&fit=crop&crop=entropy', 
    tours: 28, 
    trend: '+12%', 
    color: 'from-blue-500 to-blue-600' 
  },
  { 
    country: 'ไต้หวัน', 
    image: 'https://images.unsplash.com/photo-1470004914212-05527e49370b?w=400&h=200&fit=crop&crop=entropy', 
    tours: 22, 
    trend: '+10%', 
    color: 'from-blue-500 to-blue-600' 
  },
  { 
    country: 'ยุโรป', 
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&h=200&fit=crop&crop=entropy', 
    tours: 35, 
    trend: '+22%', 
    color: 'from-blue-500 to-blue-600' 
  },
  { 
    country: 'ออสเตรเลีย', 
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400&h=200&fit=crop&crop=entropy', 
    tours: 23, 
    trend: '+18%', 
    color: 'from-blue-500 to-blue-600' 
  },
  { 
    country: 'นิวซีแลนด์', 
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop&crop=entropy', 
    tours: 18, 
    trend: '+25%', 
    color: 'from-blue-500 to-blue-600' 
  },
  { 
    country: 'แคนาดา', 
    image: 'https://images.unsplash.com/photo-1519832979-6fa011b87667?w=400&h=200&fit=crop&crop=entropy', 
    tours: 15, 
    trend: '+20%', 
    color: 'from-blue-500 to-blue-600' 
  },
  { 
    country: 'สิงคโปร์', 
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&h=200&fit=crop&crop=entropy', 
    tours: 12, 
    trend: '+5%', 
    color: 'from-blue-500 to-blue-600' 
  },
  { 
    country: 'เวียดนาม', 
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=400&h=200&fit=crop&crop=entropy', 
    tours: 15, 
    trend: '+12%', 
    color: 'from-blue-500 to-blue-600' 
  },
  { 
    country: 'ไทย', 
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=400&h=200&fit=crop&crop=entropy', 
    tours: 20, 
    trend: '+8%', 
    color: 'from-blue-500 to-blue-600' 
  },
  { 
    country: 'มาเลเซีย', 
    image: 'https://images.unsplash.com/photo-1506351421178-63b52a2d2562?w=400&h=200&fit=crop&crop=entropy', 
    tours: 10, 
    trend: '+15%', 
    color: 'from-blue-500 to-blue-600' 
  }
]

export default function TourSearch11() {
  const [searchQuery, setSearchQuery] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [priceRange, setPriceRange] = useState([0, 150000])
  const [durationFilter, setDurationFilter] = useState('all')
  const [sortBy, setSortBy] = useState('popularity')
  const [showFilters, setShowFilters] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [favorites, setFavorites] = useState<number[]>([])
  const [viewedTours, setViewedTours] = useState<number[]>([])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isClient, setIsClient] = useState(false)
  const [displayedCount, setDisplayedCount] = useState(12)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [showFilterMessage, setShowFilterMessage] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const filterPanelRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  
  const itemsPerLoad = 12

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Reset displayed count when filters change
  useEffect(() => {
    setDisplayedCount(itemsPerLoad)
  }, [searchQuery, selectedCategory, selectedCountry, priceRange, durationFilter, sortBy])

  useEffect(() => {
    if (searchQuery.length > 1) {
      const searchTerm = searchQuery.toLowerCase()
      
      // สร้าง suggestions ที่หลากหลาย
      const tourSuggestions = enhancedTours
        .filter(tour => 
          tour.title.toLowerCase().includes(searchTerm) ||
          tour.destinations?.some(dest => dest.toLowerCase().includes(searchTerm)) ||
          tour.highlights?.some(highlight => highlight.toLowerCase().includes(searchTerm))
        )
        .slice(0, 3)
        .map(tour => tour.title)

      const countryNames = Array.from(
        new Set(enhancedTours.flatMap(tour => tour.destinations || []))
      )
        .filter(country => country.toLowerCase().includes(searchTerm))
        .slice(0, 2)

      const highlightSuggestions = Array.from(
        new Set(enhancedTours.flatMap(tour => tour.highlights || []))
      )
        .filter(highlight => highlight.toLowerCase().includes(searchTerm))
        .slice(0, 2)

      const allSuggestions = [...tourSuggestions, ...countryNames, ...highlightSuggestions]
      setSuggestions(Array.from(new Set(allSuggestions)).slice(0, 6))
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [searchQuery])

  // Move tour calculations before useEffect hooks to avoid hoisting issues
  const filteredTours = enhancedTours.filter(tour => {
    const searchTerm = searchQuery.toLowerCase()
    const matchesSearch = !searchQuery || 
      tour.title.toLowerCase().includes(searchTerm) ||
      tour.destinations?.some(dest => dest.toLowerCase().includes(searchTerm)) ||
      tour.highlights?.some(highlight => highlight.toLowerCase().includes(searchTerm)) ||
      tour.airline?.toLowerCase().includes(searchTerm) ||
      tour.duration.toLowerCase().includes(searchTerm)
    
    const matchesCategory = selectedCategory === 'all' || tour.category === selectedCategory
    const matchesCountry = !selectedCountry || tour.destinations?.includes(selectedCountry)
    const matchesPrice = tour.price >= priceRange[0] && tour.price <= priceRange[1]
    const matchesDuration = durationFilter === 'all' || 
      (durationFilter === 'short' && parseInt(tour.duration) <= 5) ||
      (durationFilter === 'medium' && parseInt(tour.duration) >= 6 && parseInt(tour.duration) <= 9) ||
      (durationFilter === 'long' && parseInt(tour.duration) >= 10)
    
    return matchesSearch && matchesCategory && matchesCountry && matchesPrice && matchesDuration
  })

  const sortedTours = [...filteredTours].sort((a, b) => {
    switch (sortBy) {
      case 'price_low': return a.price - b.price
      case 'price_high': return b.price - a.price
      case 'rating': return b.rating - a.rating
      case 'duration': return parseInt(a.duration) - parseInt(b.duration)
      case 'newest': return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
      case 'availability': return b.availableSeats - a.availableSeats
      default: // popularity - ยอดนิยม (default)
        return b.popularity - a.popularity
    }
  })

  const displayedTours = sortedTours.slice(0, displayedCount)
  const hasMoreTours = displayedCount < sortedTours.length

  const loadMoreTours = useCallback(() => {
    const hasMore = displayedCount < sortedTours.length
    if (isLoadingMore || !hasMore) return
    
    setIsLoadingMore(true)
    
    // Simulate loading delay for better UX
    setTimeout(() => {
      setDisplayedCount(prev => {
        const newCount = prev + itemsPerLoad
        return Math.min(newCount, sortedTours.length)
      })
      setIsLoadingMore(false)
    }, 500)
  }, [isLoadingMore, displayedCount, sortedTours.length, itemsPerLoad])

  // Infinite scroll observer - placed after sortedTours calculation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const hasMore = displayedCount < sortedTours.length
        if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
          loadMoreTours()
        }
      },
      { threshold: 0.1 }
    )

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current)
    }

    return () => observer.disconnect()
  }, [displayedCount, sortedTours.length, isLoadingMore, loadMoreTours])

  const toggleFavorite = (tourId: number) => {
    setFavorites(prev => 
      prev.includes(tourId) 
        ? prev.filter(id => id !== tourId)
        : [...prev, tourId]
    )
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('all')
    setSelectedCountry(null)
    setPriceRange([0, 150000])
    setDurationFilter('all')
    setDisplayedCount(itemsPerLoad)
  }

  const handleQuickSearch = (tag: string) => {
    setSearchQuery(tag)
    setShowSuggestions(false)
  }

  const handleFilterToggle = () => {
    const newShowFilters = !showFilters
    setShowFilters(newShowFilters)
    
    // If opening filters, scroll to the filter panel after a short delay
    if (newShowFilters && filterPanelRef.current) {
      setShowFilterMessage(true)
      setTimeout(() => {
        filterPanelRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
        // Hide the message after 3 seconds
        setTimeout(() => setShowFilterMessage(false), 3000)
      }, 100)
    } else {
      setShowFilterMessage(false)
    }
  }

  // Prevent hydration mismatch
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">กำลังโหลด...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Search Header */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                ref={searchRef}
                type="text"
                placeholder="🔍 ค้นหาประเทศ เมือง หรือทัวร์..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSuggestions(suggestions.length > 0)}
                className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setShowSuggestions(false)
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              {/* Search Suggestions */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSearchQuery(suggestion)
                        setShowSuggestions(false)
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Filter Toggle */}
            <button
              onClick={handleFilterToggle}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 shadow-lg ${
                showFilters 
                  ? 'bg-gradient-to-r from-blue-700 to-blue-800 text-white shadow-xl scale-105' 
                  : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 hover:shadow-xl hover:scale-105'
              }`}
            >
              <SlidersHorizontal className={`w-4 h-4 transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
              <span className="hidden sm:inline">ตัวกรอง</span>
              {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {/* Quick Search Tags */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-500" />
              ค้นหาด่วน
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {quickSearchTags.map((tag, index) => {
                // Primary action (first button) - more prominent
                const isPrimary = index === 0;
                
                if (isPrimary) {
                  // Primary button - สีน้ำเงินเข้ม
                  return (
                    <button
                      key={index}
                      onClick={() => handleQuickSearch(tag)}
                      className="group relative px-3 py-2.5 text-xs sm:text-sm rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg hover:from-blue-700 hover:to-blue-800 hover:shadow-xl hover:-translate-y-1 focus:ring-blue-300"
                    >
                      <span className="font-medium leading-tight text-white">
                        <span className="mr-1">🔥 </span>
                        {tag}
                      </span>
                      <div className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-1.5 py-0.5 rounded-full font-bold shadow-lg transform scale-75 z-10">
                        ยอดนิยม
                      </div>
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:to-indigo-500/10 transition-all duration-200"></div>
                    </button>
                  );
                } else {
                  // Secondary button - สีเทาอ่อน
                  return (
                    <button
                      key={index}
                      onClick={() => handleQuickSearch(tag)}
                      className="group relative px-3 py-2.5 text-xs sm:text-sm rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 text-gray-700 hover:from-gray-100 hover:to-gray-200 hover:border-gray-300 hover:shadow-md hover:-translate-y-0.5 focus:ring-gray-300"
                    >
                      <span className="font-medium leading-tight text-gray-700">
                        {tag}
                      </span>
                    </button>
                  );
                }
              })}
            </div>
          </div>

          {/* Filter Message */}
          {showFilterMessage && (
            <div className="mt-4 animate-in slide-in-from-top-2 duration-300">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-blue-700 font-medium">
                  ตัวกรองได้เปิดขึ้นแล้ว กำลังเลื่อนไปยังส่วนตัวกรอง...
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Hero Section with Featured Tours */}
        <section className="py-8">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-800">
              🌟 ทัวร์พิเศษแนะนำ
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
            {featuredTours.slice(0, 3).map((tour, index) => (
              <div
                key={tour.id}
                className="relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200"
              >
                <div className="relative h-40 md:h-48 bg-gradient-to-br from-blue-600 to-blue-700 overflow-hidden">
                  <img 
                    src={getTourBannerImage(tour)} 
                    alt={tour.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to gradient if banner image fails
                      e.currentTarget.style.display = 'none'
                      e.currentTarget.parentElement?.classList.add('bg-gradient-to-br', 'from-blue-600', 'to-blue-700')
                    }}
                    onLoad={(e) => {
                      // Ensure image is visible when loaded successfully
                      e.currentTarget.style.display = 'block'
                    }}
                  />
                  {tour.specialOffer && (
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      🔥 {tour.specialOffer}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute bottom-3 left-3 text-white">
                    <h3 className="font-bold text-lg">{tour.destinations?.[0]}</h3>
                    <p className="text-sm opacity-90">{tour.duration}</p>
                  </div>
                  {/* Priority Badge */}
                  <div className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-blue-500 to-blue-600">
                    {index === 0 ? '🥇 ยอดนิยม' : index === 1 ? '🥈 แนะนำ' : '🥉 พิเศษ'}
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{tour.title}</h3>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{tour.rating}</span>
                    <span className="text-sm text-gray-500">({tour.reviews} รีวิว)</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      {tour.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ฿{tour.originalPrice.toLocaleString()}
                        </span>
                      )}
                      <div className="text-xl font-bold text-blue-600">
                        ฿{tour.price.toLocaleString()}
                      </div>
                    </div>
                    <button 
                      onClick={() => router.push(`/tour-search-11/${tour.id}`)}
                      className="px-4 py-2 rounded-lg text-white font-medium transition-all bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                    >
                      ดูรายละเอียด
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Popular Destinations */}
        <section className="py-8">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-800">🔥 จุดหมายยอดนิยม</h2>
          </div>
          
          <div className="overflow-x-auto">
            <div className="flex gap-4 pb-4" style={{ minWidth: 'max-content' }}>
              {popularDestinations.map((destination, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCountry(destination.country)}
                  className="flex-shrink-0 w-48 md:w-56 lg:w-64 bg-white rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden group border border-gray-200"
                >
                  <div className="h-24 md:h-28 lg:h-32 bg-gradient-to-br from-blue-500 to-blue-600 relative overflow-hidden">
                    <img 
                      src={destination.image} 
                      alt={destination.country}
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to gradient if image fails
                        e.currentTarget.style.display = 'none'
                        e.currentTarget.parentElement?.classList.add('bg-gradient-to-br', 'from-blue-500', 'to-blue-600')
                      }}
                      onLoad={(e) => {
                        // Ensure image is visible when loaded successfully
                        e.currentTarget.style.display = 'block'
                      }}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                    <div className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-blue-700">
                      ลดสูงสุด {destination.trend.replace('+', '').replace('%', '')}%
                    </div>
                    {/* Priority Badge */}
                    {index < 3 && (
                      <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold text-gray-800">
                        {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                      </div>
                    )}
                  </div>
                  <div className="p-3 md:p-4">
                    <h3 className="font-semibold text-gray-800 text-base md:text-lg">{destination.country}</h3>
                    <p className="text-sm md:text-base text-gray-600">{destination.tours} ทัวร์</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">หมวดหมู่ทัวร์</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {categories.map((category) => {
              const IconComponent = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex flex-col items-center p-4 rounded-xl transition-all ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg transform scale-105'
                      : 'bg-white text-gray-700 hover:shadow-md border border-gray-200 hover:scale-105 hover:bg-blue-50 hover:text-blue-700'
                  }`}
                >
                  <IconComponent className="w-6 h-6 mb-2" />
                  <span className="text-sm font-medium">{category.name}</span>
                </button>
              )
            })}
          </div>
        </section>

        {/* Filters Panel */}
        {showFilters && (
          <div 
            ref={filterPanelRef} 
            className="bg-white rounded-xl shadow-lg p-6 mb-6 border-2 border-blue-200 animate-in slide-in-from-top-2 duration-300 relative"
          >
            {/* Highlight indicator */}
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full opacity-80 animate-pulse"></div>
            
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-blue-600" />
                ตัวกรองการค้นหา
              </h3>
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                รีเซ็ต
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ประเทศ</label>
                <select
                  value={selectedCountry || ''}
                  onChange={(e) => setSelectedCountry(e.target.value || null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">ทุกประเทศ</option>
                  {Array.from(new Set(enhancedTours.flatMap(tour => tour.destinations || []))).map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ระยะเวลา</label>
                <select
                  value={durationFilter}
                  onChange={(e) => setDurationFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">ทุกระยะเวลา</option>
                  <option value="short">สั้น (1-5 วัน)</option>
                  <option value="medium">ปานกลาง (6-9 วัน)</option>
                  <option value="long">ยาว (10+ วัน)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">เรียงตาม</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="popularity">ยอดนิยม</option>
                  <option value="price_low">ราคาต่ำ - สูง</option>
                  <option value="price_high">ราคาสูง - ต่ำ</option>
                  <option value="rating">คะแนนรีวิว</option>
                  <option value="newest">ใหม่ล่าสุด</option>
                  <option value="availability">ที่นั่งว่าง</option>
                  <option value="duration">ระยะเวลา</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ราคาต่ำสุด</label>
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                  placeholder="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ราคาสูงสุด</label>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 150000])}
                  placeholder="150000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <span className="text-gray-600">
              พบ <span className="font-semibold text-gray-800">{sortedTours.length}</span> ทัวร์
            </span>
            {(searchQuery || selectedCategory !== 'all' || selectedCountry) && (
              <div className="flex items-center gap-2">
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm shadow-sm">
                    🔍 &quot;{searchQuery}&quot;
                    <button onClick={() => setSearchQuery('')}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedCountry && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm shadow-sm">
                    🌍 {selectedCountry}
                    <button onClick={() => setSelectedCountry(null)}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
              </div>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <div className="w-4 h-4 flex flex-col gap-1">
                <div className="h-0.5 bg-current rounded"></div>
                <div className="h-0.5 bg-current rounded"></div>
                <div className="h-0.5 bg-current rounded"></div>
              </div>
            </button>
          </div>
        </div>

        {/* Tours Grid/List */}
        {displayedTours.length > 0 ? (
          <div className={`grid gap-6 mb-8 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {displayedTours.map((tour) => {
              const isFavorite = favorites.includes(tour.id)
              const isViewed = viewedTours.includes(tour.id)
              const discount = tour.originalPrice ? Math.round(((tour.originalPrice - tour.price) / tour.originalPrice) * 100) : 0

              return (
                <div
                  key={tour.id}
                  className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 ${
                    viewMode === 'list' ? 'flex flex-col md:flex-row' : ''
                  } ${isViewed ? 'ring-2 ring-blue-200' : ''}`}
                >
                  {/* Tour Image */}
                  <div className={`relative ${viewMode === 'list' ? 'w-full md:w-80 h-48 md:h-full' : 'h-48'} overflow-hidden`}>
                    <img 
                      src={getTourBannerImage(tour)} 
                      alt={tour.title}
                      className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                        if (e.currentTarget.parentElement) {
                          e.currentTarget.parentElement.classList.add('bg-gradient-to-br', 'from-blue-600', 'to-blue-700')
                        }
                      }}
                    />
                    
                    {/* Discount Badge */}
                    {discount > 0 && (
                      <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
                        -{discount}%
                      </div>
                    )}
                    
                    {/* Badge */}
                    {tour.badge && (
                      <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        {tour.badge}
                      </div>
                    )}

                    {/* Favorite Button */}
                    <button
                      onClick={() => toggleFavorite(tour.id)}
                      className="absolute bottom-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white shadow-lg transition-all duration-200"
                    >
                      <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                    </button>
                  </div>

                  {/* Tour Content */}
                  <div className="flex-1 p-6">
                    {/* Title */}
                    <h3 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
                      {tour.title}
                    </h3>

                    {/* Destinations */}
                    <div className="flex items-center gap-2 text-gray-600 mb-3">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm">{tour.destinations?.join(' • ')}</span>
                    </div>

                    {/* Tour Details Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-blue-500" />
                        <span className="text-gray-700">{tour.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-green-500" />
                        <span className="text-gray-700">{tour.groupSizeMin}-{tour.groupSizeMax} คน</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Plane className="w-4 h-4 text-purple-500" />
                        <span className="text-gray-700">{tour.airline}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-gray-700">{tour.rating} ({tour.reviews})</span>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {tour.highlights?.slice(0, 3).map((highlight, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
                          >
                            {highlight}
                          </span>
                        ))}
                        {(tour.highlights?.length || 0) > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                            +{(tour.highlights?.length || 0) - 3} อื่นๆ
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Includes */}
                    <div className="mb-4">
                      <p className="text-xs text-gray-600 mb-1">รวมในราคา:</p>
                      <div className="flex flex-wrap gap-1">
                        {tour.includes?.slice(0, 3).map((include, index) => (
                          <span key={index} className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded">
                            {include}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Price Section */}
                    <div className="border-t pt-4">
                      <div className="flex items-end justify-between">
                        <div>
                          {tour.originalPrice && tour.originalPrice > tour.price ? (
                            <>
                              <span className="text-sm text-gray-500 line-through">
                                ฿{tour.originalPrice.toLocaleString()}
                              </span>
                              <div className="text-xl font-bold text-blue-600">
                                ฿{tour.price.toLocaleString()}
                              </div>
                              <div className="text-xs text-green-600 font-medium">
                                ประหยัด ฿{(tour.originalPrice - tour.price).toLocaleString()}
                              </div>
                            </>
                          ) : (
                            <div className="text-xl font-bold text-blue-600">
                              ฿{tour.price.toLocaleString()}
                            </div>
                          )}
                          <span className="text-xs text-gray-500">ต่อคน</span>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => router.push(`/tour-search-11/${tour.id}`)}
                            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                          >
                            ดูรายละเอียด
                          </button>
                          <button
                            onClick={() => router.push(`/tour-search-11/${tour.id}`)}
                            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2.5 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center gap-2"
                          >
                            จองเลย
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Available Seats Warning */}
                    {tour.availableSeats <= 5 && (
                      <div className="mt-3 p-2 bg-orange-50 border border-orange-200 rounded-lg">
                        <div className="flex items-center gap-2 text-orange-700">
                          <Eye className="w-4 h-4" />
                          <span className="text-sm font-medium">
                            เหลือที่นั่งเพียง {tour.availableSeats} ที่นั่ง!
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              ไม่พบทัวร์ที่ตรงกับการค้นหา
            </h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              ลองเปลี่ยนคำค้นหาหรือเลือกตัวกรองอื่น เราจะช่วยคุณหาทัวร์ที่เหมาะสม
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl transition-colors duration-200 font-medium"
            >
              ดูทัวร์ทั้งหมด
            </button>
          </div>
        )}

        {/* Load More Section */}
        {hasMoreTours && !isLoadingMore && (
          <div ref={loadMoreRef} className="text-center py-8">
            <button
              onClick={loadMoreTours}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg"
            >
              โหลดทัวร์เพิ่มเติม
            </button>
          </div>
        )}

        {/* Loading More Indicator */}
        {isLoadingMore && (
          <div className="text-center py-8">
            <div className="flex items-center justify-center gap-3 text-gray-600">
              <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-sm">กำลังโหลดทัวร์เพิ่มเติม...</span>
            </div>
          </div>
        )}
        
        {/* End of Results */}
        {!hasMoreTours && displayedTours.length > 0 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 font-medium">แสดงทัวร์ทั้งหมดแล้ว</p>
            <p className="text-gray-400 text-sm mt-1">รวม {displayedTours.length} ทัวร์</p>
          </div>
        )}
      </div>
    </div>
  )
}