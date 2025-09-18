'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { Search, MapPin, Star, Heart, Clock, Users, Filter, ArrowRight, Grid, List, Phone, Info, Mic, TrendingUp, History, ChevronDown, ChevronUp, X, Calendar, BarChart3, Settings, ArrowUpDown } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

// Tour data created specifically for this page
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
    travelPeriod: 'ม.ค. - เม.ย. 68'
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
    travelPeriod: 'เม.ย. - ส.ค. 68'
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
    availableSeats: 3
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
    availableSeats: 12
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
    availableSeats: 0
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
    availableSeats: 5
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
    availableSeats: 10
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
    availableSeats: 7
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
    availableSeats: 2
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
    availableSeats: 18
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
    availableSeats: 0
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
    availableSeats: 6
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
    availableSeats: 11
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
    availableSeats: 4
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
    availableSeats: 9
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
    availableSeats: 13
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
    availableSeats: 0
  },
  {
    id: 'tour-morocco-018',
    title: 'ทัวร์โมร็อกโก คาซาบลังกา มาร์ราเคช',
    destination: 'โมร็อกโก',
    duration: '7 วัน 5 คืน',
    price: 42900,
    rating: 4.5,
    reviewCount: 123,
    image: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=800&h=600&fit=crop',
    highlights: ['ทะเลทรายซาฮารา', 'เมืองสีน้ำเงิน', 'ตลาดท้องถิ่น'],
    available: true,
    availableSeats: 16
  },
  {
    id: 'tour-peru-019',
    title: 'ทัวร์เปรู มาชูปิกชู คุสโก้',
    destination: 'เปรู',
    duration: '8 วัน 6 คืน',
    price: 85900,
    rating: 4.8,
    reviewCount: 67,
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&h=600&fit=crop',
    highlights: ['มาชูปิกชู', 'หุบเขาศักดิ์สิทธิ์', 'ทะเลสาบติติกากา'],
    available: true,
    availableSeats: 1
  },
  {
    id: 'tour-greece-020',
    title: 'ทัวร์กรีซ เอเธนส์ ซานโตรินี',
    destination: 'กรีซ',
    duration: '7 วัน 5 คืน',
    price: 62900,
    originalPrice: 69900,
    rating: 4.7,
    reviewCount: 189,
    image: 'https://images.unsplash.com/photo-1503152394-c571994fd383?w=800&h=600&fit=crop',
    highlights: ['อะโครโพลิส', 'พระอาทิตย์ตกซานโตรินี', 'เกาะมิโคนอส'],
    available: true,
    availableSeats: 14
  }
]

type SortOption = 'recommended' | 'price-low' | 'price-high' | 'rating' | 'departure'
type ViewMode = 'grid' | 'list'

// Search suggestions data
const searchSuggestions = {
  popular: [
    { text: 'ทัวร์ญี่ปุ่น', category: 'ประเทศ', count: '156 ทัวร์' },
    { text: 'ทัวร์เกาหลี', category: 'ประเทศ', count: '89 ทัวร์' },
    { text: 'ทัวร์ยุโรป', category: 'ประเทศ', count: '78 ทัวร์' },
    { text: 'ทัวร์ดูไบ', category: 'ประเทศ', count: '145 ทัวร์' },
    { text: 'ทัวร์ราคาดี', category: 'หมวดหมู่', count: '45 ทัวร์' }
  ],
  recent: [
    { text: 'ญี่ปุ่น ซากุระ', time: '5 นาทีที่แล้ว' },
    { text: 'เกาหลี', time: '1 ชั่วโมงที่แล้ว' }
  ],
  trending: [
    { text: 'ทัวร์ซากุระ', trend: '+15%' },
    { text: 'เกาหลี K-Pop', trend: '+8%' },
    { text: 'ไต้หวัน ตลาดกลางคืน', trend: '+12%' }
  ]
}

// Sort options with better descriptions
const sortOptions = [
  { value: 'recommended', label: 'แนะนำ', icon: Star, description: 'ทัวร์ยอดนิยมและคะแนนดี' },
  { value: 'price-low', label: 'ราคาต่ำ → สูง', icon: TrendingUp, description: 'เรียงจากราคาถูกที่สุด' },
  { value: 'price-high', label: 'ราคาสูง → ต่ำ', icon: TrendingUp, description: 'เรียงจากราคาแพงที่สุด' },
  { value: 'rating', label: 'คะแนนสูงสุด', icon: Star, description: 'ทัวร์ที่ได้รับการรีวิวดีที่สุด' },
  { value: 'departure', label: 'วันออกเดินทาง', icon: Clock, description: 'เรียงตามวันที่ใกล้ที่สุด' }
]

// Filter options data
const filterOptions = {
  durations: [
    { value: '', label: 'ระยะเวลาทั้งหมด' },
    { value: '1-3', label: '1-3 วัน' },
    { value: '4-6', label: '4-6 วัน' },
    { value: '7-10', label: '7-10 วัน' },
    { value: '11+', label: '11 วันขึ้นไป' }
  ],
  months: [
    { value: '', label: 'เดือนทั้งหมด' },
    { value: 'มีนาคม', label: 'มีนาคม 2025' },
    { value: 'เมษายน', label: 'เมษายน 2025' },
    { value: 'พฤษภาคม', label: 'พฤษภาคม 2025' },
    { value: 'มิถุนายน', label: 'มิถุนายน 2025' },
    { value: 'กรกฎาคม', label: 'กรกฎาคม 2025' },
    { value: 'สิงหาคม', label: 'สิงหาคม 2025' }
  ],
  travelers: [
    { value: 1, label: '1 คน' },
    { value: 2, label: '2 คน (คู่รัก)' },
    { value: 3, label: '3-4 คน (ครอบครัว)' },
    { value: 5, label: '5-8 คน (กลุ่มเพื่อน)' },
    { value: 9, label: '9+ คน (กลุ่มใหญ่)' }
  ],
  ratings: [
    { value: 0, label: 'คะแนนทั้งหมด' },
    { value: 3.5, label: '3.5+ ดาว' },
    { value: 4.0, label: '4.0+ ดาว' },
    { value: 4.5, label: '4.5+ ดาว' },
    { value: 4.8, label: '4.8+ ดาว (เยี่ยม)' }
  ]
}

// ประเทศทั้งหมดพร้อมธงชาติ - เรียงตามตัวอักษร ก-ฮ
const allCountries = [
  { name: "กรีซ", flagCode: "gr" },
  { name: "กรีนแลนด์", flagCode: "gl" },
  { name: "กัมพูชา", flagCode: "kh" },
  { name: "เกาหลีใต้", flagCode: "kr" },
  { name: "คาซัคสถาน", flagCode: "kz" },
  { name: "แคนาดา", flagCode: "ca" },
  { name: "จอร์เจีย", flagCode: "ge" },
  { name: "จอร์แดน", flagCode: "jo" },
  { name: "จีน", flagCode: "cn" },
  { name: "ชิลี", flagCode: "cl" },
  { name: "เช็ก", flagCode: "cz" },
  { name: "เซเชลส์", flagCode: "sc" },
  { name: "เซอร์เบีย", flagCode: "rs" },
  { name: "ไซปรัส", flagCode: "cy" },
  { name: "ญี่ปุ่น", flagCode: "jp" },
  { name: "เดนมาร์ก", flagCode: "dk" },
  { name: "ตุรกี", flagCode: "tr" },
  { name: "ตูนีเซีย", flagCode: "tn" },
  { name: "ไต้หวัน", flagCode: "tw" },
  { name: "ไทย", flagCode: "th" },
  { name: "นอร์เวย์", flagCode: "no" },
  { name: "นิวซีแลนด์", flagCode: "nz" },
  { name: "เนเธอร์แลนด์", flagCode: "nl" },
  { name: "เนปาล", flagCode: "np" },
  { name: "บราซิล", flagCode: "br" },
  { name: "บรูไน", flagCode: "bn" },
  { name: "บัลแกเรีย", flagCode: "bg" },
  { name: "บาห์เรน", flagCode: "bh" },
  { name: "เบลเยียม", flagCode: "be" },
  { name: "ปานามา", flagCode: "pa" },
  { name: "เปรู", flagCode: "pe" },
  { name: "โปรตุเกส", flagCode: "pt" },
  { name: "โปแลนด์", flagCode: "pl" },
  { name: "ฝรั่งเศส", flagCode: "fr" },
  { name: "พม่า", flagCode: "mm" },
  { name: "ฟินแลนด์", flagCode: "fi" },
  { name: "ฟิลิปปินส์", flagCode: "ph" },
  { name: "ภูฏาน", flagCode: "bt" },
  { name: "มองโกเลีย", flagCode: "mn" },
  { name: "มอนเตเนโกร", flagCode: "me" },
  { name: "มัลดีฟส์", flagCode: "mv" },
  { name: "มาเก๊า", flagCode: "mo" },
  { name: "มาเลเซีย", flagCode: "my" },
  { name: "โมร็อคโค", flagCode: "ma" },
  { name: "ยุโรป", flagCode: "eu" },
  { name: "ยูกันดา", flagCode: "ug" },
  { name: "เยอรมัน", flagCode: "de" },
  { name: "รวันดา", flagCode: "rw" },
  { name: "รัสเซีย", flagCode: "ru" },
  { name: "โรมาเนีย", flagCode: "ro" },
  { name: "ลัตเวีย", flagCode: "lv" },
  { name: "ลาว", flagCode: "la" },
  { name: "ลิทัวเนีย", flagCode: "lt" },
  { name: "วานูอาตู", flagCode: "vu" },
  { name: "เวลส์", flagCode: "gb-wls" },
  { name: "เวียดนาม", flagCode: "vn" },
  { name: "ศรีลังกา", flagCode: "lk" },
  { name: "สกอตแลนด์", flagCode: "gb-sct" },
  { name: "สเปน", flagCode: "es" },
  { name: "สโลวาเกีย", flagCode: "sk" },
  { name: "สโลวีเนีย", flagCode: "si" },
  { name: "สวิตเซอร์แลนด์", flagCode: "ch" },
  { name: "สวีเดน", flagCode: "se" },
  { name: "สหรัฐอเมริกา", flagCode: "us" },
  { name: "สหรัฐอาหรับเอมิเรตส์", flagCode: "ae" },
  { name: "สาธารณรัฐโครเอเชีย", flagCode: "hr" },
  { name: "สิงคโปร์", flagCode: "sg" },
  { name: "ออสเตรเลีย", flagCode: "au" },
  { name: "ออสเตรีย", flagCode: "at" },
  { name: "อังกฤษ", flagCode: "gb-eng" },
  { name: "อาเซอร์ไบจาน", flagCode: "az" },
  { name: "อาร์เจนตินา", flagCode: "ar" },
  { name: "อิตาลี", flagCode: "it" },
  { name: "อินเดีย", flagCode: "in" },
  { name: "อินโดนีเซีย", flagCode: "id" },
  { name: "อิสราเอล", flagCode: "il" },
  { name: "อิหร่าน", flagCode: "ir" },
  { name: "อียิปต์", flagCode: "eg" },
  { name: "เอกวาดอร์", flagCode: "ec" },
  { name: "เอสโตเนีย", flagCode: "ee" },
  { name: "แอฟริกาใต้", flagCode: "za" },
  { name: "แอลจีเรีย", flagCode: "dz" },
  { name: "ไอซ์แลนด์", flagCode: "is" },
  { name: "ไอร์แลนด์", flagCode: "ie" },
  { name: "ฮ่องกง", flagCode: "hk" },
  { name: "ฮังการี", flagCode: "hu" }
].sort((a, b) => a.name.localeCompare(b.name, 'th'))

export default function TourSearch16() {
  // States for functionality
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('recommended')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [wishlist, setWishlist] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState({
    priceRange: [0, 200000],
    duration: '',
    rating: ''
  })
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedBudget, setSelectedBudget] = useState('')
  const [selectedDuration, setSelectedDuration] = useState('')
  const [countrySearchQuery, setCountrySearchQuery] = useState('')
  const [selectedMonths, setSelectedMonths] = useState<string[]>([])
  const [selectedPeople, setSelectedPeople] = useState('')
  const [selectedRating, setSelectedRating] = useState('')
  const [selectedTourType, setSelectedTourType] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false)
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const [isVoiceSearching, setIsVoiceSearching] = useState(false)
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [animatedPlaceholder, setAnimatedPlaceholder] = useState('')
  const [filters, setFilters] = useState({
    priceRange: [0, 100000],
    duration: '',
    month: '',
    travelers: 1,
    minRating: 0,
    includeAvailable: true
  })

  // Load data simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    // Load wishlist from localStorage
    const savedWishlist = localStorage.getItem('tour-search-16-wishlist')
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist))
    }

    // Load search history
    const savedHistory = localStorage.getItem('tour-search-16-history')
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory))
    }

    return () => clearTimeout(timer)
  }, [])

  // Animated placeholder effect
  useEffect(() => {
    if (searchTerm) {
      setAnimatedPlaceholder('')
      return
    }
    
    const placeholders = [
      'ทัวร์ญี่ปุ่น ใบไม้เปลี่ยนสี',
      'ทัวร์เกาหลี ซากุระ',
      'ทัวร์โอซาก้า หน้าหนาว',
      'ทัวร์ไต้หวัน ตลาดกลางคืน',
      'ทัวร์สิงคโปร์ ครอบครัว'
    ]
    
    let currentIndex = 0
    let charIndex = 0
    let isDeleting = false
    let timeout: NodeJS.Timeout
    
    const type = () => {
      const current = placeholders[currentIndex]
      
      if (!isDeleting) {
        // Typing
        setAnimatedPlaceholder(current.substring(0, charIndex))
        charIndex++
        
        if (charIndex > current.length) {
          // Finished typing, pause then start deleting
          isDeleting = true
          timeout = setTimeout(type, 5000) // 5 second pause
        } else {
          timeout = setTimeout(type, 80 + Math.random() * 40) // Natural typing speed
        }
      } else {
        // Deleting
        setAnimatedPlaceholder(current.substring(0, charIndex))
        charIndex--
        
        if (charIndex === 0) {
          // Finished deleting, move to next
          isDeleting = false
          currentIndex = (currentIndex + 1) % placeholders.length
          timeout = setTimeout(type, 500) // Pause before next word
        } else {
          timeout = setTimeout(type, 30 + Math.random() * 20) // Faster deletion
        }
      }
    }
    
    timeout = setTimeout(type, 1000) // Initial delay
    
    return () => clearTimeout(timeout)
  }, [searchTerm])

  // Wishlist functionality
  const toggleWishlist = (tourId: string) => {
    const newWishlist = wishlist.includes(tourId)
      ? wishlist.filter(id => id !== tourId)
      : [...wishlist, tourId]
    
    setWishlist(newWishlist)
    localStorage.setItem('tour-search-16-wishlist', JSON.stringify(newWishlist))
  }

  // Search functionality
  const handleSearchSubmit = (term: string) => {
    if (term.trim() && !searchHistory.includes(term.trim())) {
      const newHistory = [term.trim(), ...searchHistory.slice(0, 4)] // Keep only 5 recent searches
      setSearchHistory(newHistory)
      localStorage.setItem('tour-search-16-history', JSON.stringify(newHistory))
    }
    setSearchTerm(term)
    setShowSearchSuggestions(false)
  }

  const handleVoiceSearch = () => {
    // Check for browser support
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
    
    if (!SpeechRecognition) {
      alert('เบราว์เซอร์ของคุณไม่รองรับการค้นหาด้วยเสียง')
      return
    }

    const recognition = new SpeechRecognition()
    
    // Configure recognition
    recognition.lang = 'th-TH' // Thai language
    recognition.continuous = false // Stop after getting result
    recognition.interimResults = false // Only final results
    recognition.maxAlternatives = 1
    
    setIsVoiceSearching(true)
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      console.log('Voice input:', transcript)
      handleSearchSubmit(transcript)
      setIsVoiceSearching(false)
    }
    
    recognition.onerror = (event: any) => {
      console.error('Voice recognition error:', event.error)
      setIsVoiceSearching(false)
      
      if (event.error === 'no-speech') {
        alert('ไม่ได้ยินเสียง กรุณาลองใหม่อีกครั้ง')
      } else if (event.error === 'not-allowed') {
        alert('กรุณาอนุญาตการใช้ไมโครโฟน')
      } else {
        alert('เกิดข้อผิดพลาด: ' + event.error)
      }
    }
    
    recognition.onend = () => {
      setIsVoiceSearching(false)
    }
    
    // Start recognition
    try {
      recognition.start()
    } catch (error) {
      console.error('Failed to start voice recognition:', error)
      setIsVoiceSearching(false)
      alert('ไม่สามารถเริ่มการรับเสียงได้')
    }
  }

  const clearSearchHistory = () => {
    setSearchHistory([])
    localStorage.removeItem('tour-search-16-history')
  }

  // Filter helper functions
  const updateFilter = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const resetFilters = () => {
    setFilters({
      priceRange: [0, 100000],
      duration: '',
      month: '',
      travelers: 1,
      minRating: 0,
      includeAvailable: true
    })
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 100000) count++
    if (filters.duration) count++
    if (filters.month) count++
    if (filters.travelers > 1) count++
    if (filters.minRating > 0) count++
    if (!filters.includeAvailable) count++
    return count
  }

  const formatPrice = (price: number) => {
    if (price >= 1000) {
      return Math.floor(price / 1000) + 'k'
    }
    return price.toString()
  }

  const formatNumberWithCommas = (value: number | string) => {
    const num = typeof value === 'string' ? value.replace(/,/g, '') : value.toString()
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const parseNumberFromInput = (value: string) => {
    return parseInt(value.replace(/,/g, '')) || 0
  }

  // Close dropdowns when clicking outside or scrolling
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      // Close search suggestions if clicking outside search area
      if (showSearchSuggestions && !target.closest('[data-search-container]')) {
        setShowSearchSuggestions(false)
      }
      // Close sort dropdown if clicking outside sort area
      if (showSortDropdown && !target.closest('[data-sort-container]')) {
        setShowSortDropdown(false)
      }
    }

    const handleScroll = (event: Event) => {
      const target = event.target as Element
      
      // Check if scrolling is happening inside dropdown
      const isScrollingInDropdown = 
        target?.classList?.contains('scrollbar-thin') ||
        target?.classList?.contains('overflow-y-auto') ||
        target?.closest('.overflow-y-auto') ||
        target?.closest('[data-search-container] .overflow-y-auto') ||
        target?.closest('[data-sort-container] .overflow-y-auto')
      
      // If scrolling on main page (not in dropdown), close dropdowns
      if (!isScrollingInDropdown) {
        if (showSearchSuggestions) {
          setShowSearchSuggestions(false)
        }
        if (showSortDropdown) {
          setShowSortDropdown(false)
        }
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowSearchSuggestions(false)
        setShowSortDropdown(false)
      }
    }

    const handleResize = () => {
      setShowSearchSuggestions(false)
      setShowSortDropdown(false)
    }

    if (showSearchSuggestions || showSortDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('scroll', handleScroll, true) // Capture phase
      document.addEventListener('keydown', handleKeyDown)
      window.addEventListener('resize', handleResize)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('scroll', handleScroll, true)
      document.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', handleResize)
    }
  }, [showSearchSuggestions, showSortDropdown])

  // Filter and sort tours
  const filteredTours = useMemo(() => {
    let filtered = tourData.filter(tour => {
      // Search filter
      const matchesSearch = !searchTerm || 
        tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tour.destination.toLowerCase().includes(searchTerm.toLowerCase())
      
      // Price range filter
      const matchesPrice = tour.price >= filters.priceRange[0] && tour.price <= filters.priceRange[1]
      
      // Duration filter
      let matchesDuration = true
      if (filters.duration) {
        const tourDays = parseInt(tour.duration.split(' ')[0])
        switch (filters.duration) {
          case '1-3': matchesDuration = tourDays >= 1 && tourDays <= 3; break
          case '4-6': matchesDuration = tourDays >= 4 && tourDays <= 6; break
          case '7-10': matchesDuration = tourDays >= 7 && tourDays <= 10; break
          case '11+': matchesDuration = tourDays >= 11; break
        }
      }
      
      // Month filter
      const matchesMonth = !filters.month || tour.departure.includes(filters.month)
      
      // Rating filter
      const matchesRating = tour.rating >= filters.minRating
      
      // Available filter
      const matchesAvailable = !filters.includeAvailable || tour.available
      
      return matchesSearch && matchesPrice && matchesDuration && matchesMonth && matchesRating && matchesAvailable
    })

    // Sort tours
    switch (sortBy) {
      case 'price-low':
        return filtered.sort((a, b) => a.price - b.price)
      case 'price-high':
        return filtered.sort((a, b) => b.price - a.price)
      case 'rating':
        return filtered.sort((a, b) => b.rating - a.rating)
      case 'departure':
        return filtered.sort((a, b) => new Date(a.departure).getTime() - new Date(b.departure).getTime())
      default: // recommended
        return filtered.sort((a, b) => (b.rating * b.reviewCount) - (a.rating * a.reviewCount))
    }
  }, [searchTerm, sortBy, filters])

  const clearFilters = () => {
    setSelectedFilters({
      priceRange: [0, 200000],
      duration: '',
      rating: ''
    })
    setSearchTerm('')
    setSelectedCountry('')
    setSelectedBudget('')
    setSelectedDuration('')
    setSelectedMonths([])
    setSelectedPeople('')
    setSelectedRating('')
    setSelectedTourType('')
    setCountrySearchQuery('')
  }

  const activeFiltersCount = Object.values(selectedFilters).filter(value => 
    Array.isArray(value) ? value[0] > 0 || value[1] < 200000 : Boolean(value)
  ).length + (selectedCountry ? 1 : 0) + (selectedBudget ? 1 : 0) + (selectedDuration ? 1 : 0) + (selectedMonths.length > 0 ? 1 : 0) + (selectedPeople ? 1 : 0) + (selectedRating ? 1 : 0) + (selectedTourType ? 1 : 0)

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Senior Friendly */}
      <header className="sticky top-0 z-40 bg-white border-b-2 border-gray-200 shadow-sm">
        <div className="px-4 py-4">

          {/* Search Bar with Filter */}
          <div className="flex gap-3">
            {/* Advanced Search Bar */}
            <div className="flex-1 relative" data-search-container>
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-6 h-6 z-10" />
              <input
                type="text"
                placeholder={searchTerm ? '' : animatedPlaceholder}
                className="w-full pl-14 pr-24 text-lg border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:outline-none transition-colors h-[68px] flex items-center"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setShowSearchSuggestions(true)
                }}
                onFocus={() => setShowSearchSuggestions(true)}
                onBlur={(e) => {
                  // Only close if not clicking on suggestions
                  const relatedTarget = e.relatedTarget as Element
                  if (!relatedTarget?.closest('[data-search-container]')) {
                    setTimeout(() => setShowSearchSuggestions(false), 150)
                  }
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSearchSubmit(searchTerm)
                  }
                }}
                aria-label="ค้นหาทัวร์"
              />
              
              {/* Clear Button */}
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setShowSearchSuggestions(false)
                  }}
                  className="absolute right-14 top-1/2 transform -translate-y-1/2 p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="ลบข้อความ"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              
              {/* Voice Search Button */}
              <button
                onClick={handleVoiceSearch}
                disabled={isVoiceSearching}
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center ${
                  isVoiceSearching 
                    ? 'bg-red-100 text-red-600' 
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
                aria-label="ค้นหาด้วยเสียง"
              >
                <Mic className={`w-5 h-5 ${isVoiceSearching ? 'animate-pulse' : ''}`} />
              </button>

              {/* Search Suggestions Dropdown */}
              {showSearchSuggestions && (
              <>
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-lg z-30 max-h-80 overflow-hidden">
                  <div className="max-h-80 overflow-y-auto" style={{scrollbarWidth: 'thin'}}>
                    
                    {/* Search History */}
                    {searchHistory.length > 0 && (
                      <div className="p-4 border-b border-gray-100">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <History className="w-5 h-5 text-gray-500" />
                            <span className="font-medium text-gray-700">ค้นหาล่าสุด</span>
                          </div>
                          <button
                            onClick={clearSearchHistory}
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                          >
                            ลบทั้งหมด
                          </button>
                        </div>
                        <div className="space-y-2">
                          {searchHistory.map((term, index) => (
                            <button
                              key={index}
                              onClick={(e) => {
                                e.preventDefault()
                                handleSearchSubmit(term)
                              }}
                              onMouseDown={(e) => e.preventDefault()}
                              className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                              <span className="text-gray-800">{term}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Popular Searches */}
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <TrendingUp className="w-5 h-5 text-blue-600" />
                        <span className="font-medium text-gray-700">ยอดนิยม</span>
                      </div>
                      <div className="space-y-2">
                        {searchSuggestions.popular.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={(e) => {
                              e.preventDefault()
                              handleSearchSubmit(suggestion.text)
                            }}
                            onMouseDown={(e) => e.preventDefault()}
                            className="w-full text-left px-3 py-2 hover:bg-blue-50 rounded-lg transition-colors group"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="text-gray-800 font-medium">{suggestion.text}</span>
                                <span className="text-sm text-gray-500 ml-2">({suggestion.category})</span>
                              </div>
                              <span className="text-sm text-blue-600 group-hover:text-blue-700">
                                {suggestion.count}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Scroll indicator */}
                    <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                  </div>
                </div>

              </>
              )}

              {/* Voice Search Status */}
              {isVoiceSearching && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-red-50 border-2 border-red-200 rounded-xl p-4 z-30">
                  <div className="flex items-center gap-3 text-red-700">
                    <Mic className="w-5 h-5 animate-pulse" />
                    <span className="font-medium">กำลังฟัง... พูดชื่อจุดหมายที่ต้องการ</span>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setShowFilters(true)}
              className="text-blue-600 hover:text-blue-700 transition-colors duration-200 text-sm font-medium border-2 border-gray-300 rounded-xl hover:border-blue-600 bg-white relative flex items-center justify-center"
              style={{ height: '68px', minWidth: '68px' }}
            >
              <Filter className="w-6 h-6" />
              {activeFiltersCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Popular Countries */}
      <div className="px-4 py-4">
        <div className="mb-4 p-4 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-900 text-xl font-bold flex items-center gap-2">
              <span className="text-2xl">🌟</span>
              ประเทศยอดนิยม
            </h2>
            <button className="text-sm text-blue-600 font-medium hover:text-blue-700 transition-colors">
              ดูทั้งหมด →
            </button>
          </div>
          
          {/* Story Cards Layout - Mobile First */}
          <div className="space-y-3">
            {[
              { 
                name: 'ญี่ปุ่น',
                tours: 124,
                rating: 4.8,
                price: '15,900',
                flagCode: 'jp',
                image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=200&fit=crop'
              },
              { 
                name: 'เกาหลีใต้',
                tours: 89,
                rating: 4.7,
                price: '12,500',
                flagCode: 'kr',
                image: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?w=800&h=200&fit=crop'
              },
              { 
                name: 'ไต้หวัน',
                tours: 67,
                rating: 4.6,
                price: '9,900',
                flagCode: 'tw',
                image: 'https://images.unsplash.com/photo-1508248467877-aec1b08de376?w=800&h=200&fit=crop'
              },
              { 
                name: 'อิตาลี',
                tours: 45,
                rating: 4.5,
                price: '45,000',
                flagCode: 'it',
                image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&h=200&fit=crop'
              }
            ].map((dest, idx) => (
              <button
                key={idx}
                onClick={() => setSearchTerm(dest.name)}
                className="w-full rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02] overflow-hidden relative group"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image 
                    src={dest.image}
                    alt={dest.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="100vw"
                  />
                  {/* Light overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/25 to-black/15 group-hover:from-black/50 group-hover:via-black/30 group-hover:to-black/20 transition-all duration-300" />
                </div>
                
                {/* Content */}
                <div className="relative z-10 flex items-center gap-4 p-4">
                  {/* Left Flag Section */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full overflow-hidden shadow-2xl">
                      <Image
                        src={`/icons/destinations/flag-icons-main/flags/1x1/${dest.flagCode}.svg`}
                        alt={`${dest.name} flag`}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  {/* Right Info Section */}
                  <div className="flex-1 text-left">
                    <h3 className="font-bold text-lg text-white mb-1 drop-shadow-lg">
                      ทัวร์{dest.name}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-white/90 mb-2 drop-shadow-md">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {dest.tours} ทัวร์
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        {dest.rating}
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-yellow-300 drop-shadow-md">
                      เริ่มต้น ฿{dest.price}+
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Popular Tours Section - Background Image Design */}
        <div className="mt-4 bg-gradient-to-br from-blue-50 to-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-2xl">🔥</span>
            <span>ทัวร์ยอดนิยม</span>
            <span className="text-xs font-normal text-gray-500 ml-2">อัพเดทล่าสุด</span>
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {/* Tour Card 1 - Japan Sakura */}
            <button 
              onClick={() => setSearchTerm('ญี่ปุ่น ซากุระ')}
              className="relative overflow-hidden rounded-xl hover:shadow-xl transition-all duration-300 cursor-pointer group text-left h-52 border-2 border-white/20 hover:border-pink-300/50"
            >
              {/* Background Image - Cherry Blossoms in Japan */}
              <div 
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800&h=600&fit=crop&auto=format)'
                }}
              ></div>
              
              {/* Lighter overlay for brighter image */}
              <div className="absolute inset-0 bg-black/25"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              
              {/* Content */}
              <div className="relative h-full p-4 flex flex-col justify-between">
                {/* Top - Badge with strong backdrop */}
                <div className="flex items-start justify-between">
                  <span className="inline-flex items-center gap-1 bg-red-500 text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-lg">
                    <span>🌸</span>
                    <span>ซากุระ</span>
                  </span>
                  <span className="bg-white/95 text-gray-800 text-xs px-2 py-1 rounded-full font-bold shadow-md">
                    ฿25,900
                  </span>
                </div>
                
                {/* Bottom - Essential Info Only */}
                <div className="space-y-3">
                  {/* Title with strong contrast */}
                  <div>
                    <h4 className="font-bold text-white text-lg mb-1 drop-shadow-2xl" style={{textShadow: '2px 2px 6px rgba(0,0,0,0.9)'}}>
                      🇯🇵 ญี่ปุ่น ซากุระ
                    </h4>
                    <div className="text-white text-sm font-bold drop-shadow-xl" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>
                      5 วัน 4 คืน • ⭐ 4.8
                    </div>
                  </div>
                </div>
              </div>
            </button>

            {/* Tour Card 2 - Korea K-POP */}
            <button 
              onClick={() => setSearchTerm('เกาหลี')}
              className="relative overflow-hidden rounded-xl hover:shadow-xl transition-all duration-300 cursor-pointer group text-left h-52 border-2 border-white/20 hover:border-purple-300/50"
            >
              {/* Background Image - Seoul Gangnam District */}
              <div 
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop&auto=format)'
                }}
              ></div>
              
              {/* Lighter overlay for brighter image */}
              <div className="absolute inset-0 bg-black/25"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              
              {/* Content */}
              <div className="relative h-full p-4 flex flex-col justify-between">
                {/* Top - Badge with strong backdrop */}
                <div className="flex items-start justify-between">
                  <span className="inline-flex items-center gap-1 bg-purple-500 text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-lg">
                    <span>🎵</span>
                    <span>K-POP</span>
                  </span>
                  <span className="bg-white/95 text-gray-800 text-xs px-2 py-1 rounded-full font-bold shadow-md">
                    ฿15,900
                  </span>
                </div>
                
                {/* Bottom - Essential Info Only */}
                <div className="space-y-3">
                  {/* Title with strong contrast */}
                  <div>
                    <h4 className="font-bold text-white text-lg mb-1 drop-shadow-2xl" style={{textShadow: '2px 2px 6px rgba(0,0,0,0.9)'}}>
                      🇰🇷 เกาหลี K-POP
                    </h4>
                    <div className="text-white text-sm font-bold drop-shadow-xl" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>
                      4 วัน 3 คืน • ⭐ 4.7
                    </div>
                  </div>
                </div>
              </div>
            </button>

            {/* Tour Card 3 - Taiwan Street Food */}
            <button 
              onClick={() => setSearchTerm('ไต้หวัน')}
              className="relative overflow-hidden rounded-xl hover:shadow-xl transition-all duration-300 cursor-pointer group text-left h-52 border-2 border-white/20 hover:border-orange-300/50"
            >
              {/* Background Image - Taiwan Night Market */}
              <div 
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&h=600&fit=crop&auto=format)'
                }}
              ></div>
              
              {/* Lighter overlay for brighter image */}
              <div className="absolute inset-0 bg-black/25"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              
              {/* Content */}
              <div className="relative h-full p-4 flex flex-col justify-between">
                {/* Top - Badge with strong backdrop */}
                <div className="flex items-start justify-between">
                  <span className="inline-flex items-center gap-1 bg-orange-500 text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-lg">
                    <span>🍜</span>
                    <span>อาหาร</span>
                  </span>
                  <div className="text-right">
                    <span className="bg-white/95 text-gray-800 text-xs px-2 py-1 rounded-full font-bold shadow-md block">
                      ฿9,900
                    </span>
                    <span className="text-white text-xs line-through mt-1 block font-medium" style={{textShadow: '1px 1px 3px rgba(0,0,0,0.8)'}}>
                      ฿12,900
                    </span>
                  </div>
                </div>
                
                {/* Bottom - Essential Info Only */}
                <div className="space-y-3">
                  {/* Title with strong contrast */}
                  <div>
                    <h4 className="font-bold text-white text-lg mb-1 drop-shadow-2xl" style={{textShadow: '2px 2px 6px rgba(0,0,0,0.9)'}}>
                      🇹🇼 ไต้หวัน Street Food
                    </h4>
                    <div className="text-white text-sm font-bold drop-shadow-xl" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>
                      3 วัน 2 คืน • ⭐ 4.6
                    </div>
                  </div>
                </div>
              </div>
            </button>

            {/* Tour Card 4 - Europe 4 Countries */}
            <button 
              onClick={() => setSearchTerm('ยุโรป')}
              className="relative overflow-hidden rounded-xl hover:shadow-xl transition-all duration-300 cursor-pointer group text-left h-52 border-2 border-white/20 hover:border-blue-300/50"
            >
              {/* Background Image - European Architecture (Neuschwanstein Castle) */}
              <div 
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&h=600&fit=crop&auto=format)'
                }}
              ></div>
              
              {/* Lighter overlay for brighter image */}
              <div className="absolute inset-0 bg-black/25"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              
              {/* Content */}
              <div className="relative h-full p-4 flex flex-col justify-between">
                {/* Top - Badge with strong backdrop */}
                <div className="flex items-start justify-between">
                  <span className="inline-flex items-center gap-1 bg-blue-600 text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-lg">
                    <span>🏰</span>
                    <span>ปราสาท</span>
                  </span>
                  <div className="text-right">
                    <span className="bg-white/95 text-gray-800 text-xs px-2 py-1 rounded-full font-bold shadow-md block">
                      ฿45,900
                    </span>
                    <span className="text-white text-xs line-through mt-1 block font-medium" style={{textShadow: '1px 1px 3px rgba(0,0,0,0.8)'}}>
                      ฿65,900
                    </span>
                  </div>
                </div>
                
                {/* Bottom - Essential Info Only */}
                <div className="space-y-3">
                  {/* Title with strong contrast */}
                  <div>
                    <h4 className="font-bold text-white text-lg mb-1 drop-shadow-2xl" style={{textShadow: '2px 2px 6px rgba(0,0,0,0.9)'}}>
                      🇪🇺 ยุโรป 4 ประเทศ
                    </h4>
                    <div className="text-white text-sm font-bold drop-shadow-xl" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>
                      8 วัน 6 คืน • ⭐ 4.9
                    </div>
                  </div>
                </div>
              </div>
            </button>

            {/* Tour Card 5 - Tokyo Disney */}
            <button 
              onClick={() => setSearchTerm('โตเกียว ดิสนีย์')}
              className="relative overflow-hidden rounded-xl hover:shadow-xl transition-all duration-300 cursor-pointer group text-left h-52 border-2 border-white/20 hover:border-pink-300/50 md:block hidden"
            >
              {/* Background Image - Tokyo Disneyland */}
              <div 
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&auto=format)'
                }}
              ></div>
              
              {/* Lighter overlay for brighter image */}
              <div className="absolute inset-0 bg-black/25"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              
              {/* Content */}
              <div className="relative h-full p-4 flex flex-col justify-between">
                {/* Top - Badge with strong backdrop */}
                <div className="flex items-start justify-between">
                  <span className="inline-flex items-center gap-1 bg-pink-500 text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-lg">
                    <span>🎡</span>
                    <span>ครอบครัว</span>
                  </span>
                  <span className="bg-white/95 text-gray-800 text-xs px-2 py-1 rounded-full font-bold shadow-md">
                    ฿32,900
                  </span>
                </div>
                
                {/* Bottom - Essential Info Only */}
                <div className="space-y-3">
                  {/* Title with strong contrast */}
                  <div>
                    <h4 className="font-bold text-white text-lg mb-1 drop-shadow-2xl" style={{textShadow: '2px 2px 6px rgba(0,0,0,0.9)'}}>
                      🇯🇵 โตเกียว ดิสนีย์แลนด์
                    </h4>
                    <div className="text-white text-sm font-bold drop-shadow-xl" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>
                      5 วัน 3 คืน • ⭐ 4.9
                    </div>
                  </div>
                </div>
              </div>
            </button>

            {/* Tour Card 6 - Budget Japan */}
            <button 
              onClick={() => setSearchTerm('ญี่ปุ่น งบน้อย')}
              className="relative overflow-hidden rounded-xl hover:shadow-xl transition-all duration-300 cursor-pointer group text-left h-52 border-2 border-white/20 hover:border-green-300/50 md:block hidden"
            >
              {/* Background Image - Mount Fuji Japan */}
              <div 
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1606918801925-e2c914c4b503?w=800&h=600&fit=crop&auto=format)'
                }}
              ></div>
              
              {/* Lighter overlay for brighter image */}
              <div className="absolute inset-0 bg-black/25"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              
              {/* Content */}
              <div className="relative h-full p-4 flex flex-col justify-between">
                {/* Top - Badge with strong backdrop */}
                <div className="flex items-start justify-between">
                  <span className="inline-flex items-center gap-1 bg-green-600 text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-lg">
                    <span>💎</span>
                    <span>งบ 20K</span>
                  </span>
                  <span className="bg-white/95 text-gray-800 text-xs px-2 py-1 rounded-full font-bold shadow-md">
                    ฿19,900
                  </span>
                </div>
                
                {/* Bottom - Essential Info Only */}
                <div className="space-y-3">
                  {/* Title with strong contrast */}
                  <div>
                    <h4 className="font-bold text-white text-lg mb-1 drop-shadow-2xl" style={{textShadow: '2px 2px 6px rgba(0,0,0,0.9)'}}>
                      🇯🇵 ญี่ปุ่น งบประหยัด
                    </h4>
                    <div className="text-white text-sm font-bold drop-shadow-xl" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>
                      4 วัน 3 คืน • ⭐ 4.5
                    </div>
                  </div>
                </div>
              </div>
            </button>
          </div>

          {/* View All Button */}
          <div className="text-center mt-4">
            <button 
              onClick={() => setSearchTerm('')}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:underline transition-colors"
            >
              ดูทัวร์ทั้งหมด →
            </button>
          </div>
        </div>
      </div>


      {/* Controls Bar */}
      <div className="px-4 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between gap-4">
          {/* View Mode Toggle */}
          <div className="flex bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-3 rounded-lg transition-all min-h-[48px] min-w-[48px] flex items-center justify-center ${
                viewMode === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
              }`}
              aria-label="แสดงแบบตาราง"
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-3 rounded-lg transition-all min-h-[48px] min-w-[48px] flex items-center justify-center ${
                viewMode === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
              }`}
              aria-label="แสดงแบบรายการ"
            >
              <List className="w-5 h-5" />
            </button>
          </div>

          {/* Custom Sort Dropdown */}
          <div className="flex-1 max-w-64 relative" data-sort-container>
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              onBlur={(e) => {
                // Only close if not clicking on dropdown items
                const relatedTarget = e.relatedTarget as Element
                if (!relatedTarget?.closest('[data-sort-container]')) {
                  setTimeout(() => setShowSortDropdown(false), 150)
                }
              }}
              className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:outline-none bg-white flex items-center justify-between hover:border-gray-400 transition-colors min-h-[56px]"
              aria-label="เรียงลำดับ"
            >
              <div className="flex items-center gap-3">
                {React.createElement(sortOptions.find(opt => opt.value === sortBy)?.icon || Star, { 
                  className: "w-5 h-5 text-gray-600" 
                })}
                <span className="font-medium text-gray-800">
                  {sortOptions.find(opt => opt.value === sortBy)?.label}
                </span>
              </div>
              <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} />
            </button>

            {/* Custom Dropdown Menu */}
            {showSortDropdown && (
              <>
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-lg z-30 max-h-80 overflow-hidden">
                  <div className="max-h-72 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    <div className="py-2">
                      {sortOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={(e) => {
                            e.preventDefault()
                            setSortBy(option.value as SortOption)
                            setShowSortDropdown(false)
                          }}
                          onMouseDown={(e) => e.preventDefault()}
                          className={`w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors group ${
                            sortBy === option.value ? 'bg-blue-50 border-r-4 border-blue-600' : ''
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <option.icon className={`w-5 h-5 mt-0.5 ${
                              sortBy === option.value ? 'text-blue-600' : 'text-gray-500 group-hover:text-blue-600'
                            }`} />
                            <div className="flex-1">
                              <div className={`font-medium ${
                                sortBy === option.value ? 'text-blue-600' : 'text-gray-800 group-hover:text-blue-600'
                              }`}>
                                {option.label}
                              </div>
                              <div className="text-sm text-gray-600 mt-1">
                                {option.description}
                              </div>
                            </div>
                            {sortBy === option.value && (
                              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                              </div>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                    
                    {/* Scroll indicator for sort dropdown */}
                    <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                  </div>

                  {/* Results count for current sort - Fixed at bottom */}
                  <div className="border-t border-gray-100 px-4 py-3 bg-gray-50">
                    <div className="text-sm text-gray-600 text-center">
                      พบ <span className="font-medium text-gray-800">{filteredTours.length}</span> ทัวร์ที่ตรงกับเงื่อนไข
                    </div>
                  </div>
                </div>

              </>
            )}
          </div>
        </div>
      </div>

      {/* Advanced Filters Modal */}
      {showAdvancedFilters && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center p-4 pt-20" style={{position: 'fixed'}}>
          <div className="bg-white rounded-2xl border-2 border-gray-200 max-w-4xl w-full max-h-[80vh] overflow-hidden shadow-2xl">
            
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white sticky top-0">
              <h3 className="text-xl font-bold text-gray-900">ตัวกรองขั้นสูง</h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 font-medium"
                >
                  ล้างตัวกรอง
                </button>
                <button
                  onClick={() => setShowAdvancedFilters(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto max-h-[calc(80vh-140px)] pb-20">
              <div className="p-6">
                {/* Filters Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  
                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      💰 ช่วงราคา (บาท)
                    </label>
                    {/* Price Range Quick Select */}
                    <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => updateFilter('priceRange', [0, 10000])}
                          className={`px-2 py-2 text-xs border rounded-lg transition-colors ${
                            filters.priceRange[0] === 0 && filters.priceRange[1] === 10000
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-300 hover:border-gray-400 text-gray-700'
                          }`}
                        >
                          {'<'} 10,000 บาท
                        </button>
                        <button
                          onClick={() => updateFilter('priceRange', [10000, 20000])}
                          className={`px-2 py-2 text-xs border rounded-lg transition-colors ${
                            filters.priceRange[0] === 10000 && filters.priceRange[1] === 20000
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-300 hover:border-gray-400 text-gray-700'
                          }`}
                        >
                          10,000 - 20,000
                        </button>
                        <button
                          onClick={() => updateFilter('priceRange', [20000, 30000])}
                          className={`px-2 py-2 text-xs border rounded-lg transition-colors ${
                            filters.priceRange[0] === 20000 && filters.priceRange[1] === 30000
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-300 hover:border-gray-400 text-gray-700'
                          }`}
                        >
                          20,000 - 30,000
                        </button>
                        <button
                          onClick={() => updateFilter('priceRange', [30000, 40000])}
                          className={`px-2 py-2 text-xs border rounded-lg transition-colors ${
                            filters.priceRange[0] === 30000 && filters.priceRange[1] === 40000
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-300 hover:border-gray-400 text-gray-700'
                          }`}
                        >
                          30,000 - 40,000
                        </button>
                        <button
                          onClick={() => updateFilter('priceRange', [40000, 50000])}
                          className={`px-2 py-2 text-xs border rounded-lg transition-colors ${
                            filters.priceRange[0] === 40000 && filters.priceRange[1] === 50000
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-300 hover:border-gray-400 text-gray-700'
                          }`}
                        >
                          40,000 - 50,000
                        </button>
                        <button
                          onClick={() => updateFilter('priceRange', [50000, 100000])}
                          className={`px-2 py-2 text-xs border rounded-lg transition-colors ${
                            filters.priceRange[0] === 50000 && filters.priceRange[1] === 100000
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-300 hover:border-gray-400 text-gray-700'
                          }`}
                        >
                          {'>'} 50,000 บาท
                        </button>
                    </div>
                  </div>

                  {/* Month */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      📅 เดือนที่เดินทาง
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {filterOptions.months.slice(1).map((option) => (
                        <button
                          key={option.value}
                          onClick={() => updateFilter('month', filters.month === option.value ? '' : option.value)}
                          className={`px-2 py-2 text-xs border rounded-lg transition-colors ${
                            filters.month === option.value
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-300 hover:border-gray-400 text-gray-700'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      ⏰ ระยะเวลาเดินทาง
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {filterOptions.durations.slice(1).map((option) => (
                        <button
                          key={option.value}
                          onClick={() => updateFilter('duration', filters.duration === option.value ? '' : option.value)}
                          className={`px-2 py-2 text-xs border rounded-lg transition-colors ${
                            filters.duration === option.value
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-300 hover:border-gray-400 text-gray-700'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      ⭐ คะแนนรีวิว
                    </label>
                    <div className="flex gap-2">
                      {[3, 3.5, 4, 4.5, 5].map((rating) => (
                        <button
                          key={rating}
                          onClick={() => updateFilter('minRating', filters.minRating === rating ? 0 : rating)}
                          className={`flex-1 px-2 py-2 text-xs border rounded-lg transition-colors ${
                            filters.minRating === rating
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-300 hover:border-gray-400 text-gray-700'
                          }`}
                        >
                          {rating}+
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Availability */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      ✅ สถานะทัวร์
                    </label>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.includeAvailable}
                          onChange={(e) => updateFilter('includeAvailable', e.target.checked)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-gray-700">แสดงเฉพาะทัวร์ที่มีที่นั่งว่าง</span>
                      </label>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Footer with Apply Button - Fixed at bottom */}
            <div className="border-t border-gray-200 px-6 py-4 bg-white sticky bottom-0">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  ผลลัพธ์: <span className="font-medium text-gray-900">{filteredTours.length}</span> ทัวร์
                </div>
                <button
                  onClick={() => setShowAdvancedFilters(false)}
                  className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
                >
                  ใช้ตัวกรอง ({filteredTours.length} ทัวร์)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tour Results */}
      <main className="px-4 py-6">
        {isLoading ? (
          <LoadingState />
        ) : filteredTours.length === 0 ? (
          <EmptyState searchTerm={searchTerm} onClearSearch={() => setSearchTerm('')} />
        ) : (
          <div className={`${viewMode === 'grid' ? 'space-y-6' : 'space-y-4'}`}>
            {filteredTours.map((tour) => (
              <TourCard
                key={tour.id}
                tour={tour}
                viewMode={viewMode}
                isWishlisted={wishlist.includes(tour.id)}
                onToggleWishlist={() => toggleWishlist(tour.id)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Help Footer */}
      <footer className="mt-12 p-6 bg-gray-50 border-t-2 border-gray-200">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-blue-600">
            <Info className="w-6 h-6" />
            <span className="text-lg font-medium">ต้องการความช่วยเหลือ?</span>
          </div>
          <p className="text-gray-700 text-base">
            โทรหาเราได้ที่ <span className="font-bold text-blue-600">02-123-4567</span>
          </p>
          <p className="text-gray-600 text-sm">
            เปิดให้บริการ จันทร์-ศุกร์ 9:00-18:00 น.
          </p>
        </div>
      </footer>

      {/* Advanced Filter Modal */}
      {showFilters && (
        <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm lg:hidden">
          <div className="absolute inset-0 bg-white animate-in slide-in-from-top duration-300">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex-1 overflow-y-auto p-4 pb-2 space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-base font-semibold text-gray-900">🌍 ประเทศทั้งหมด</h3>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="group p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 hover:text-gray-800 transition-all duration-200"
                    >
                      <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
                    </button>
                  </div>

                  {/* Country Search */}
                  <div className="mb-4">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="ค้นหาประเทศ..."
                        value={countrySearchQuery}
                        onChange={(e) => setCountrySearchQuery(e.target.value)}
                        className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-sm"
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="w-4 h-4 text-gray-400" />
                      </div>
                      {countrySearchQuery && (
                        <button
                          onClick={() => setCountrySearchQuery('')}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Countries Grid */}
                  <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                    {allCountries.filter(country => {
                      if (countrySearchQuery.length < 2) return true;
                      return country.name.toLowerCase().includes(countrySearchQuery.toLowerCase());
                    }).map((country, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedCountry(country.name === selectedCountry ? '' : country.name)}
                        className={`p-3 rounded-lg border transition-all duration-200 text-left ${
                          selectedCountry === country.name
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-[18px] h-[18px] rounded-full border border-gray-200 overflow-hidden flex-shrink-0">
                            <Image 
                              src={`/icons/destinations/flag-icons-main/flags/1x1/${country.flagCode}.svg`}
                              alt={`${country.name} flag`}
                              width={18}
                              height={18}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="text-sm font-medium truncate">{country.name}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Travel Date Filter - Redesigned Compact Version */}
                <div className="bg-white p-4 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <h3 className="text-base font-semibold text-gray-900">วันเดินทาง</h3>
                    <span className="text-xs text-gray-500">(2568)</span>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                    {[
                      { name: 'มกราคม', short: 'ม.ค.', value: '01', isPast: true, hasTours: true },
                      { name: 'กุมภาพันธ์', short: 'ก.พ.', value: '02', isPast: true, hasTours: true },
                      { name: 'มีนาคม', short: 'มี.ค.', value: '03', isPast: true, hasTours: true },
                      { name: 'เมษายน', short: 'เม.ย.', value: '04', isPast: false, hasTours: true },
                      { name: 'พฤษภาคม', short: 'พ.ค.', value: '05', isPast: false, hasTours: true },
                      { name: 'มิถุนายน', short: 'มิ.ย.', value: '06', isPast: false, hasTours: true },
                      { name: 'กรกฎาคม', short: 'ก.ค.', value: '07', isPast: false, hasTours: true },
                      { name: 'สิงหาคม', short: 'ส.ค.', value: '08', isPast: false, hasTours: false },
                      { name: 'กันยายน', short: 'ก.ย.', value: '09', isPast: false, hasTours: true },
                      { name: 'ตุลาคม', short: 'ต.ค.', value: '10', isPast: false, hasTours: true },
                      { name: 'พฤศจิกายน', short: 'พ.ย.', value: '11', isPast: false, hasTours: true },
                      { name: 'ธันวาคม', short: 'ธ.ค.', value: '12', isPast: false, hasTours: true }
                    ].map((month, index) => {
                      const isDisabled = month.isPast || !month.hasTours
                      const isSelected = selectedMonths.includes(month.value)
                      
                      return (
                        <button
                          key={index}
                          disabled={isDisabled}
                          onClick={() => {
                            if (isDisabled) return
                            setSelectedMonths(prev => 
                              isSelected 
                                ? prev.filter(m => m !== month.value)
                                : [...prev, month.value]
                            )
                          }}
                          className={`relative py-2 px-3 rounded-lg border text-sm font-medium transition-all ${
                            isDisabled
                              ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed opacity-50'
                              : isSelected
                              ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm'
                              : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50/50'
                          }`}
                        >
                          <div className="text-xs font-bold">{month.short}</div>
                          {isSelected && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"></div>
                          )}
                        </button>
                      )
                    })}
                  </div>
                  
                  {selectedMonths.length > 0 && (
                    <div className="mt-6 p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-white/50">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="flex items-center gap-1 text-blue-600">
                          <Calendar className="w-4 h-4" />
                          <span className="font-medium">เดือนที่เลือก:</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {selectedMonths.map(monthValue => {
                            const monthData = [
                              { name: 'มกราคม', short: 'ม.ค.', value: '01' },
                              { name: 'กุมภาพันธ์', short: 'ก.พ.', value: '02' },
                              { name: 'มีนาคม', short: 'มี.ค.', value: '03' },
                              { name: 'เมษายน', short: 'เม.ย.', value: '04' },
                              { name: 'พฤษภาคม', short: 'พ.ค.', value: '05' },
                              { name: 'มิถุนายน', short: 'มิ.ย.', value: '06' },
                              { name: 'กรกฎาคม', short: 'ก.ค.', value: '07' },
                              { name: 'สิงหาคม', short: 'ส.ค.', value: '08' },
                              { name: 'กันยายน', short: 'ก.ย.', value: '09' },
                              { name: 'ตุลาคม', short: 'ต.ค.', value: '10' },
                              { name: 'พฤศจิกายน', short: 'พ.ย.', value: '11' },
                              { name: 'ธันวาคม', short: 'ธ.ค.', value: '12' }
                            ].find(m => m.value === monthValue)
                            return (
                              <span key={monthValue} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium">
                                {monthData?.short}
                              </span>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Number of People Filter */}
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-3">👥 จำนวนผู้เดินทาง</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: '1 คน', value: '1' },
                      { label: '2 คน', value: '2' },
                      { label: '3-4 คน', value: '3-4' },
                      { label: '5+ คน', value: '5+' }
                    ].map((people, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedPeople(people.value === selectedPeople ? '' : people.value)}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                          selectedPeople === people.value
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
                        }`}
                      >
                        <div className="text-sm font-medium">{people.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-3">⭐ คะแนนรีวิว</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: '4+ ดาว', value: '4+' },
                      { label: '3+ ดาว', value: '3+' },
                      { label: 'ทุกคะแนน', value: 'all' },
                      { label: 'รีวิวเยอะ', value: 'popular' }
                    ].map((rating, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedRating(rating.value === selectedRating ? '' : rating.value)}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                          selectedRating === rating.value
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
                        }`}
                      >
                        <div className="text-sm font-medium">{rating.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tour Type Filter */}
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-3">🏷️ ประเภททัวร์</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: '🌿 ธรรมชาติ', value: 'nature' },
                      { label: '🏛️ วัฒนธรรม', value: 'culture' },
                      { label: '🛍️ ช้อปปิ้ง', value: 'shopping' },
                      { label: '🏔️ ผจญภัย', value: 'adventure' }
                    ].map((type, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedTourType(type.value === selectedTourType ? '' : type.value)}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                          selectedTourType === type.value
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
                        }`}
                      >
                        <div className="text-sm font-medium">{type.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget Filter */}
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-3">💰 งบประมาณ</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'ไม่เกิน 30,000', value: '30000' },
                      { label: 'ไม่เกิน 50,000', value: '50000' },
                      { label: 'ไม่เกิน 100,000', value: '100000' },
                      { label: 'โปรโมชั่น', value: 'promotion' }
                    ].map((budget, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedBudget(budget.value === selectedBudget ? '' : budget.value)}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                          selectedBudget === budget.value
                            ? 'border-green-500 bg-green-50 text-green-700'
                            : 'border-gray-200 bg-white hover:border-green-300 hover:bg-green-50'
                        }`}
                      >
                        <div className="text-sm font-medium">{budget.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Duration Filter */}
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-3">⏰ ระยะเวลา</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: '3-5 วัน', value: 'short' },
                      { label: '6-8 วัน', value: 'medium' },
                      { label: '9-12 วัน', value: 'long' },
                      { label: 'มากกว่า 2 สัปดาห์', value: 'extended' }
                    ].map((duration, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedDuration(duration.value === selectedDuration ? '' : duration.value)}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                          selectedDuration === duration.value
                            ? 'border-purple-500 bg-purple-50 text-purple-700'
                            : 'border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50'
                        }`}
                      >
                        <div className="text-sm font-medium">{duration.label}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Fixed Bottom Buttons */}
              <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 space-y-3">
                <button
                  onClick={() => setShowFilters(false)}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  ค้นหาทัวร์ ({filteredTours.length} ผลลัพธ์)
                </button>
                <button
                  onClick={clearFilters}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-medium transition-colors"
                >
                  ล้างตัวกรอง
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Loading Component
function LoadingState() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="bg-gray-100 rounded-2xl p-6 animate-pulse">
          <div className="h-48 bg-gray-200 rounded-xl mb-4"></div>
          <div className="h-6 bg-gray-200 rounded mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
          <div className="flex justify-between items-center">
            <div className="h-8 bg-gray-200 rounded w-24"></div>
            <div className="h-12 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
      ))}
    </div>
  )
}

// Empty State Component
function EmptyState({ searchTerm, onClearSearch }: { searchTerm: string, onClearSearch: () => void }) {
  return (
    <div className="text-center py-12">
      <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
        <Search className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">
        ไม่พบทัวร์ที่ค้นหา
      </h3>
      <p className="text-gray-600 mb-6 text-base leading-relaxed">
        {searchTerm ? (
          <>ไม่พบทัวร์สำหรับ "{searchTerm}" <br />ลองเปลี่ยนคำค้นหาใหม่</>
        ) : (
          'ไม่มีทัวร์ที่ตรงกับเงื่อนไข'
        )}
      </p>
      {searchTerm && (
        <button
          onClick={onClearSearch}
          className="px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-xl hover:bg-blue-700 transition-colors min-h-[56px]"
        >
          ดูทัวร์ทั้งหมด
        </button>
      )}
    </div>
  )
}

// Tour Card Component - Redesigned for Better UX/UI and CTA/UP Sale
function TourCard({ 
  tour, 
  viewMode, 
  isWishlisted, 
  onToggleWishlist 
}: { 
  tour: any
  viewMode: ViewMode
  isWishlisted: boolean
  onToggleWishlist: () => void
}) {
  const discount = tour.originalPrice ? Math.round(((tour.originalPrice - tour.price) / tour.originalPrice) * 100) : 0
  const isHighValue = tour.price >= 50000
  const isPopular = tour.rating >= 4.7
  const isUrgent = tour.availableSeats <= 3 && tour.available

  if (viewMode === 'list') {
    return (
      <div className={`group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 ease-out ${
        isUrgent 
          ? 'border-red-300 hover:border-red-400' 
          : 'hover:border-blue-300'
      }`}>
        <div className="flex flex-col sm:flex-row">
          {/* Image Section - Mobile First */}
          <div className="relative w-full h-48 sm:w-44 sm:h-32 flex-shrink-0">
            <Image
              src={tour.image}
              alt={tour.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 176px"
            />
            
            {/* Essential Badges Only - Mobile First */}
            {discount >= 20 && (
              <div className="absolute top-2 left-2 bg-gradient-to-r from-red-600 to-pink-600 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse" style={{animationDuration: '2s'}}>
                🔥 FLASH SALE -{discount}%
              </div>
            )}
            
            {isUrgent && (
              <div className="absolute bottom-2 left-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg animate-bounce" style={{animationDuration: '1.5s'}}>
                ⚡ เหลือ {tour.availableSeats} ที่!
              </div>
            )}

            {/* Wishlist - Top Right */}
            <button
              onClick={onToggleWishlist}
              className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300 ease-out flex items-center justify-center"
              aria-label={isWishlisted ? 'เอาออกจากรายการโปรด' : 'เพิ่มในรายการโปรด'}
            >
              <Heart
                className={`w-4 h-4 transition-all duration-300 ease-out ${
                  isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'
                }`}
              />
            </button>

            {/* Sold Out Overlay */}
            {!tour.available && (
              <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
                <div className="bg-white px-3 py-2 rounded-lg shadow-xl">
                  <span className="text-gray-900 font-bold text-sm">ทัวร์เต็มแล้ว</span>
                </div>
              </div>
            )}
          </div>
          
          {/* Content Section - Mobile First Layout */}
          <div className="flex-1 p-4">
            {/* Top Section: Title + Rating */}
            <div className="mb-3">
              <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 leading-tight">
                {tour.title}
              </h3>

              {/* Rating - Simplified for Mobile */}
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-400 px-2 py-1 rounded-lg">
                  <Star className="w-4 h-4 fill-white text-white" />
                  <span className="font-bold text-white text-sm">{tour.rating}</span>
                </div>
                <span className="text-gray-600 text-sm">({tour.reviewCount} รีวิว)</span>
                {tour.rating >= 4.8 && (
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-bold">
                    EXCELLENT
                  </span>
                )}
              </div>
            </div>

            {/* Essential Info - Mobile Optimized */}
            <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span className="font-medium text-gray-700">{tour.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className={`w-4 h-4 ${isUrgent ? 'text-red-600' : 'text-blue-600'}`} />
                <span className={`font-medium text-sm ${isUrgent ? 'text-red-600' : 'text-gray-700'}`}>
                  {tour.availableSeats > 0 ? `เหลือ ${tour.availableSeats} ที่` : 'เต็มแล้ว'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span className="font-medium text-gray-700">{tour.destination}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-600 text-sm">📅</span>
                <span className="font-medium text-gray-700 text-sm">{tour.travelPeriod || 'ก.ย. - ม.ค. 68'}</span>
              </div>
            </div>

            {/* Bottom Section: Price + CTA - Mobile Stacked */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
              {/* Price Section */}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-gray-600">ราคาพิเศษ</span>
                  {discount > 0 && (
                    <span className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full font-bold">
                      ลด {discount}%
                    </span>
                  )}
                </div>
                
                <div className="flex items-baseline gap-2">
                  {tour.originalPrice && (
                    <span className="text-gray-500 text-sm line-through">
                      ฿{tour.originalPrice.toLocaleString()}
                    </span>
                  )}
                  <span className="text-2xl font-bold text-blue-600">
                    ฿{tour.price.toLocaleString()}
                  </span>
                </div>
                
                <p className="text-xs text-gray-600">ต่อคน รวมทุกอย่าง</p>
                
                {discount > 0 && (
                  <div className="text-xs text-green-700 font-bold mt-1">
                    💰 ประหยัด ฿{((tour.originalPrice || 0) - tour.price).toLocaleString()}
                  </div>
                )}
              </div>
              
              {/* CTA Section - Mobile Stacked */}
              <div className="space-y-2 w-full sm:w-auto">
                <Link
                  href={`/tour-search-16/${tour.id}`}
                  className={`w-full sm:w-auto px-6 py-3 text-white font-bold rounded-xl transition-all duration-400 ease-out flex items-center justify-center gap-2 shadow-lg hover:shadow-xl ${
                    tour.available 
                      ? isUrgent 
                        ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800' 
                        : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
                      : 'bg-gray-400 cursor-not-allowed'
                  } transform hover:scale-[1.01] active:scale-[0.99]`}
                >
                  {tour.available ? (
                    <>
                      <span>{isUrgent ? 'จองด่วน!' : 'จองทัวร์'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  ) : (
                    'ทัวร์เต็มแล้ว'
                  )}
                </Link>
                
                {tour.available && (
                  <div className="flex gap-2 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none py-2 px-4 border-2 border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-all duration-300 ease-out text-sm">
                      💬 สอบถาม
                    </button>
                    <button className="flex-1 sm:flex-none py-2 px-4 border-2 border-green-600 text-green-600 font-medium rounded-lg hover:bg-green-50 transition-all duration-300 ease-out text-sm">
                      📱 โทร
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Grid view - Completely redesigned for better conversion
  return (
    <div className={`group relative bg-white rounded-2xl shadow-sm border-2 overflow-hidden hover:shadow-xl transition-all duration-700 ease-out hover:-translate-y-1 ${
      isUrgent 
        ? 'border-red-300 hover:border-red-400 ring-1 ring-red-200' 
        : 'border-gray-200 hover:border-blue-300'
    }`}>
      
      {/* Image Section with Advanced Overlays */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        
        {/* Dynamic Status Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
          {/* Flash Sale Badge */}
          {discount >= 20 && (
            <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg animate-pulse" style={{animationDuration: '2s'}}>
              🔥 FLASH SALE -{discount}%
            </div>
          )}
          
          
          {/* Popular Badge */}
          {isPopular && (
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              ⭐ ยอดนิยม #{Math.floor(Math.random() * 3) + 1}
            </div>
          )}
          
          {/* Premium Badge */}
          {isHighValue && (
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              👑 PREMIUM
            </div>
          )}
        </div>

        {/* Urgency Badge - Bottom Left */}
        {isUrgent && (
          <div className="absolute bottom-4 left-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg animate-bounce z-20" style={{animationDuration: '1.5s'}}>
            ⚡ เหลือ {tour.availableSeats} ที่!
          </div>
        )}

        {/* Wishlist & Share Buttons */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
          <button
            onClick={onToggleWishlist}
            className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:scale-105 transition-all duration-300 ease-out flex items-center justify-center"
            aria-label={isWishlisted ? 'เอาออกจากรายการโปรด' : 'เพิ่มในรายการโปรด'}
          >
            <Heart
              className={`w-5 h-5 transition-all duration-300 ease-out ${
                isWishlisted ? 'fill-red-500 text-red-500 scale-105' : 'text-gray-600'
              }`}
            />
          </button>
        </div>

        {/* Sold Out Overlay */}
        {!tour.available && (
          <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-30">
            <div className="bg-white px-6 py-3 rounded-xl shadow-xl">
              <span className="text-gray-900 font-bold text-lg">ทัวร์เต็มแล้ว</span>
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* 1. Tour Title (Most Important) */}
        <h3 className="font-bold text-gray-900 text-xl mb-4 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors duration-300 ease-out">
          {tour.title}
        </h3>

        {/* 2. Pricing (High Priority for Decision Making) */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-gray-600">ราคาพิเศษ</span>
                {discount > 0 && (
                  <span className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full font-bold animate-pulse" style={{animationDuration: '2s'}}>
                    ลด {discount}%
                  </span>
                )}
              </div>
              
              <div className="flex items-baseline gap-2">
                {tour.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">
                    ฿{tour.originalPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ฿{tour.price.toLocaleString()}
                </span>
              </div>
              
              <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                <span>ต่อคน</span>
                <span className="font-medium text-blue-600">• รวมทุกอย่าง</span>
              </div>
              
              {discount > 0 && (
                <div className="text-sm text-green-700 font-bold mt-1">
                  💰 ประหยัด ฿{((tour.originalPrice || 0) - tour.price).toLocaleString()}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 3. Social Proof & Trust (Critical for Conversion) */}
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm mb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-400 px-3 py-2 rounded-lg shadow-sm">
                <Star className="w-4 h-4 fill-white text-white" />
                <span className="font-bold text-white text-base">{tour.rating}</span>
              </div>
              <div className="text-left">
                <p className="font-bold text-gray-800">{tour.reviewCount} รีวิว</p>
                <p className="text-xs text-gray-600">จากลูกค้าจริง {Math.floor(tour.reviewCount * 2.3).toLocaleString()}+ ท่าน</p>
              </div>
            </div>
            
            {tour.rating >= 4.8 && (
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full">
                <span className="text-xs font-bold">🏆 EXCELLENT</span>
              </div>
            )}
          </div>
          
          {/* Trust Indicators */}
          <div className="flex items-center gap-4 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <span className="text-blue-600">✓</span>
              <span>ตรวจสอบแล้ว</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-blue-600">🛡</span>
              <span>รับประกันความพึงพอใจ</span>
            </div>
          </div>
        </div>

        {/* 4. Key Info (Essential Details) */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 mb-5">
          <h5 className="font-bold text-gray-800 mb-3 text-sm">📋 รายละเอียดสำคัญ</h5>
          <div className="grid grid-cols-2 gap-3 text-sm">
            {/* Availability First (Most Critical) */}
            <div className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                isUrgent 
                  ? 'bg-gradient-to-r from-red-500 to-red-600' 
                  : 'bg-gradient-to-r from-blue-500 to-blue-600'
              }`}>
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className={`font-bold ${isUrgent ? 'text-red-600' : 'text-gray-800'}`}>
                  {tour.availableSeats > 0 ? `เหลือ ${tour.availableSeats} ที่นั่ง` : 'เต็มแล้ว'}
                </p>
                <p className="text-xs text-gray-600">สถานะที่นั่ง</p>
              </div>
            </div>

            {/* Duration */}
            <div className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow duration-300 ease-out">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-bold text-gray-800">{tour.duration}</p>
                <p className="text-xs text-gray-600">ระยะเวลาเดินทาง</p>
              </div>
            </div>

            {/* Destination */}
            <div className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-bold text-gray-800">{tour.destination}</p>
                <p className="text-xs text-gray-600">จุดหมายปลายทาง</p>
              </div>
            </div>

            {/* Travel Period */}
            <div className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow duration-300 ease-out">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-base font-bold flex items-center justify-center">📅</span>
              </div>
              <div>
                <p className="font-bold text-gray-800">{tour.travelPeriod || 'ก.ย. - ม.ค. 68'}</p>
                <p className="text-xs text-gray-600">ช่วงเดินทาง</p>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Tour Highlights (Supporting Details) */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">✨</span>
            </div>
            <h4 className="font-bold text-gray-800 text-base">ไฮไลท์โปรแกรมทัวร์</h4>
          </div>
          
          <div className="space-y-2">
            {tour.highlights.map((highlight: string, index: number) => (
              <div 
                key={index}
                className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200 hover:shadow-sm transition-all"
              >
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <span className="text-blue-900 font-medium text-sm flex-1">{highlight}</span>
              </div>
            ))}
            
            {/* Additional Value Props */}
            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold">📦</span>
              </div>
              <span className="text-blue-900 font-medium text-sm">รวมค่าที่พัก + อาหาร + คมนาคม</span>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold">🛡</span>
              </div>
              <span className="text-blue-900 font-medium text-sm">มีประกันการเดินทาง + ไกด์มืออาชีพ</span>
            </div>
          </div>
        </div>

        {/* Pricing Section - Redesigned for Better Conversion */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-gray-600">ราคาพิเศษ</span>
                {discount > 0 && (
                  <span className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full font-bold animate-pulse">
                    ลด {discount}%
                  </span>
                )}
              </div>
              
              <div className="flex items-baseline gap-2">
                {tour.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">
                    ฿{tour.originalPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ฿{tour.price.toLocaleString()}
                </span>
              </div>
              
              <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                <span>ต่อคน</span>
                <span className="font-medium text-green-600">• รวมทุกอย่าง</span>
              </div>
              
              {discount > 0 && (
                <div className="text-sm text-green-700 font-bold mt-1">
                  💰 ประหยัด ฿{((tour.originalPrice || 0) - tour.price).toLocaleString()}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CTA Section - Multi-tiered Strategy */}
        <div className="space-y-3">
          {/* Primary CTA */}
          <Link
            href={`/tour-search-16/${tour.id}`}
            className={`group w-full py-4 px-6 text-white font-bold rounded-xl transition-all duration-400 ease-out flex items-center justify-center gap-2 text-lg shadow-lg hover:shadow-xl ${
              tour.available 
                ? isUrgent 
                  ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 animate-pulse' 
                  : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
                : 'bg-gray-400 cursor-not-allowed'
            } transform hover:scale-[1.01] active:scale-[0.99]`}
            style={isUrgent ? {animationDuration: '2s'} : {}}
          >
            {tour.available ? (
              <>
                <span>{isUrgent ? 'จองด่วน!' : 'จองทัวร์นี้'}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 ease-out" />
              </>
            ) : (
              'ทัวร์เต็มแล้ว'
            )}
          </Link>

          {/* Secondary CTAs */}
          {tour.available && (
            <div className="flex gap-2">
              <button className="flex-1 py-2 px-4 border-2 border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-all duration-300 ease-out text-sm">
                💬 สอบถาม
              </button>
              <button className="flex-1 py-2 px-4 border-2 border-green-600 text-green-600 font-medium rounded-lg hover:bg-green-50 transition-all duration-300 ease-out text-sm">
                📱 โทรจอง
              </button>
            </div>
          )}
        </div>

        {/* Urgency Messages */}
        {tour.available && (
          <div className="mt-3 text-center">
            {isUrgent && (
              <p className="text-red-600 font-bold text-sm animate-pulse" style={{animationDuration: '2s'}}>
                🔥 เหลือที่นั่งน้อยมาก รีบจองเลย!
              </p>
            )}
            {discount > 0 && (
              <p className="text-orange-600 font-medium text-xs mt-1">
                ⏰ โปรโมชั่นสิ้นสุดเร็วๆ นี้
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}