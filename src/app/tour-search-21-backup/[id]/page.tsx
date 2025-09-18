'use client'

import React, { useState, useEffect } from 'react'
import { ArrowLeft, MapPin, Star, Heart, Clock, Users, Calendar, Check, X, Share2, Phone, MessageCircle, ChevronLeft, ChevronRight, Shield, Award, ThumbsUp, Wifi, Coffee, Car } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

// Tour data - same as in the main page
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
    description: 'เที่ยวญี่ปุ่นสุดคุ้ม เยือนเมืองหลวงโตเกียว ชมวัดอาซากุสะ ช้อปปิ้งชินจูกุ เที่ยวเกียวโต วัดคินคะคุจิ ศาลเจ้าฟูชิมิอินาริ พร้อมสัมผัสประสบการณ์นั่งรถไฟชินคันเซ็น',
    itinerary: [
      { day: 1, title: 'กรุงเทพฯ - โตเกียว', detail: 'เดินทางถึงสนามบินนาริตะ เข้าที่พักในโตเกียว' },
      { day: 2, title: 'โตเกียว', detail: 'วัดอาซากุสะ ช้อปปิ้งย่านชินจูกุ โตเกียวสกายทรี' },
      { day: 3, title: 'โตเกียว - เกียวโต', detail: 'นั่งรถไฟชินคันเซ็นสู่เกียวโต วัดคินคะคุจิ' },
      { day: 4, title: 'เกียวโต - โอซาก้า', detail: 'ศาลเจ้าฟูชิมิอินาริ ปราสาทโอซาก้า ช้อปปิ้งชินไซบาชิ' },
      { day: 5, title: 'โอซาก้า - กรุงเทพฯ', detail: 'เดินทางกลับกรุงเทพฯ' }
    ],
    included: ['ตั๋วเครื่องบินไป-กลับ', 'ที่พัก 4 คืน', 'อาหาร 10 มื้อ', 'รถรับส่ง', 'ไกด์ไทย', 'ประกันการเดินทาง'],
    excluded: ['ค่าทิปไกด์และคนขับรถ', 'ค่าใช้จ่ายส่วนตัว', 'ค่าทำพาสปอร์ต'],
    gallery: [
      'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?w=800&h=600&fit=crop'
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
    description: 'ทัวร์เกาหลีใต้สุดฟิน เที่ยวโซล พระราชวังเคียงบกกุง หมู่บ้านบุคชอนฮันอก ช้อปปิ้งมยองดง เที่ยวปูซาน หมู่บ้านวัฒนธรรมคัมชอน วัดแฮดงยงกุงซา',
    itinerary: [
      { day: 1, title: 'กรุงเทพฯ - โซล', detail: 'เดินทางถึงสนามบินอินชอน เข้าที่พักในโซล' },
      { day: 2, title: 'โซล', detail: 'พระราชวังเคียงบกกุง หมู่บ้านบุคชอนฮันอก โซลทาวเวอร์' },
      { day: 3, title: 'โซล', detail: 'สวนสนุกเอเวอร์แลนด์ ช้อปปิ้งมยองดง' },
      { day: 4, title: 'โซล - ปูซาน', detail: 'เดินทางสู่ปูซาน หมู่บ้านวัฒนธรรมคัมชอน' },
      { day: 5, title: 'ปูซาน', detail: 'วัดแฮดงยงกุงซา ตลาดจากัลชิ หาดแฮอุนแด' },
      { day: 6, title: 'ปูซาน - กรุงเทพฯ', detail: 'เดินทางกลับกรุงเทพฯ' }
    ],
    included: ['ตั๋วเครื่องบินไป-กลับ', 'ที่พัก 5 คืน', 'อาหาร 12 มื้อ', 'รถรับส่ง', 'ไกด์ไทย', 'ประกันการเดินทาง'],
    excluded: ['ค่าทิปไกด์และคนขับรถ', 'ค่าใช้จ่ายส่วนตัว', 'ค่าทำพาสปอร์ต'],
    gallery: [
      'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1546874177-9e664107314e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1541055575455-83ea4394de79?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1555080796-a032fe17e55f?w=800&h=600&fit=crop'
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
    description: 'เที่ยวไต้หวันราคาประหยัด ชมตึกไทเป 101 ล่องเรือทะเลสาบสุริยันจันทรา แช่น้ำพุร้อนเป่ยโถว ช้อปปิ้งตลาดกลางคืนซีเหมินติง',
    itinerary: [
      { day: 1, title: 'กรุงเทพฯ - ไทเป', detail: 'เดินทางถึงสนามบินเถาหยวน ตึกไทเป 101' },
      { day: 2, title: 'ไทเป - หนานโถว', detail: 'ทะเลสาบสุริยันจันทรา วัดเหวินหวู่' },
      { day: 3, title: 'ไทเป', detail: 'อุทยานเย่หลิ่ว หมู่บ้านจิ่วเฟิ่น ตลาดกลางคืนซีเหมินติง' },
      { day: 4, title: 'ไทเป - กรุงเทพฯ', detail: 'เดินทางกลับกรุงเทพฯ' }
    ],
    included: ['ตั๋วเครื่องบินไป-กลับ', 'ที่พัก 3 คืน', 'อาหาร 8 มื้อ', 'รถรับส่ง', 'ไกด์ไทย', 'ประกันการเดินทาง'],
    excluded: ['ค่าทิปไกด์และคนขับรถ', 'ค่าใช้จ่ายส่วนตัว', 'ค่าทำพาสปอร์ต'],
    gallery: [
      'https://images.unsplash.com/photo-1552493450-2beb3e29fc29?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1470004914212-05527e49370b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1572477733003-0c6ad35e6e5c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1598935898639-81586f7d2129?w=800&h=600&fit=crop'
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
    description: 'ทัวร์สิงคโปร์-มาเลเซีย เที่ยว 2 ประเทศ ชม Gardens by the Bay สวนสนุก Universal Studios ช้อปปิ้งออร์ชาร์ด เที่ยวกัวลาลัมเปอร์ ถ้ำบาตู',
    itinerary: [
      { day: 1, title: 'กรุงเทพฯ - สิงคโปร์', detail: 'เดินทางถึงสิงคโปร์ Gardens by the Bay' },
      { day: 2, title: 'สิงคโปร์', detail: 'Universal Studios เกาะเซ็นโตซ่า' },
      { day: 3, title: 'สิงคโปร์', detail: 'เมอร์ไลอ้อน พาร์ค ช้อปปิ้งออร์ชาร์ด' },
      { day: 4, title: 'สิงคโปร์ - กัวลาลัมเปอร์', detail: 'เดินทางสู่มาเลเซีย ถ้ำบาตู' },
      { day: 5, title: 'กัวลาลัมเปอร์ - กรุงเทพฯ', detail: 'ตึกแฝดเปโตรนาส เดินทางกลับ' }
    ],
    included: ['ตั๋วเครื่องบินไป-กลับ', 'ที่พัก 4 คืน', 'อาหาร 10 มื้อ', 'รถรับส่ง', 'ไกด์ไทย', 'ประกันการเดินทาง'],
    excluded: ['ค่าทิปไกด์และคนขับรถ', 'ค่าใช้จ่ายส่วนตัว', 'ค่าทำพาสปอร์ต'],
    gallery: [
      'https://images.unsplash.com/photo-1496939376851-89342e90adcd?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1508964942454-1a56651d54ac?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&h=600&fit=crop'
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
    description: 'ทัวร์เวียดนามสุดคลาสสิก ล่องเรืออ่าวฮาลอง มรดกโลก ชมเมืองโบราณฮอยอัน เที่ยวโฮจิมินห์ซิตี้',
    itinerary: [
      { day: 1, title: 'กรุงเทพฯ - ฮานอย', detail: 'เดินทางถึงฮานอย ชมทะเลสาบคืนดาบ' },
      { day: 2, title: 'ฮานอย - ฮาลอง', detail: 'ล่องเรืออ่าวฮาลอง ถ้ำนางฟ้า' },
      { day: 3, title: 'ฮาลอง - ดานัง', detail: 'เดินทางสู่ดานัง สะพานมังกร' },
      { day: 4, title: 'ดานัง - ฮอยอัน - โฮจิมินห์', detail: 'เมืองโบราณฮอยอัน เดินทางสู่โฮจิมินห์' },
      { day: 5, title: 'โฮจิมินห์ - กรุงเทพฯ', detail: 'ตลาดเบนถัน เดินทางกลับ' }
    ],
    included: ['ตั๋วเครื่องบินไป-กลับ', 'ที่พัก 4 คืน', 'อาหาร 10 มื้อ', 'รถรับส่ง', 'ไกด์ไทย', 'ประกันการเดินทาง'],
    excluded: ['ค่าทิปไกด์และคนขับรถ', 'ค่าใช้จ่ายส่วนตัว', 'ค่าทำพาสปอร์ต'],
    gallery: [
      'https://images.unsplash.com/photo-1555921015-5532091f6026?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1528127269322-539801943592?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1557750255-c76072a7aad1?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&h=600&fit=crop'
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
    description: 'ทัวร์ยุโรป 3 ประเทศสุดคลาสสิก ปารีส หอไอเฟล พิพิธภัณฑ์ลูฟร์ สวิตเซอร์แลนด์ ยอดเขาจุงเฟรา อิตาลี โรม โคลอสเซียม เวนิส',
    itinerary: [
      { day: 1, title: 'กรุงเทพฯ - ปารีส', detail: 'เดินทางถึงปารีส เข้าที่พัก' },
      { day: 2, title: 'ปารีส', detail: 'หอไอเฟล พิพิธภัณฑ์ลูฟร์ ล่องเรือแม่น้ำแซน' },
      { day: 3, title: 'ปารีส - ดิจอง', detail: 'พระราชวังแวร์ซาย เดินทางสู่ดิจอง' },
      { day: 4, title: 'ดิจอง - อินเทอร์ลาเคน', detail: 'เดินทางสู่สวิตเซอร์แลนด์ เมืองอินเทอร์ลาเคน' },
      { day: 5, title: 'อินเทอร์ลาเคน', detail: 'ยอดเขาจุงเฟรา Top of Europe' },
      { day: 6, title: 'อินเทอร์ลาเคน - มิลาน', detail: 'เดินทางสู่อิตาลี มหาวิหารมิลาน' },
      { day: 7, title: 'มิลาน - เวนิส', detail: 'เมืองเวนิส ล่องเรือกอนโดล่า' },
      { day: 8, title: 'เวนิส - โรม', detail: 'เดินทางสู่โรม น้ำพุเทรวี่' },
      { day: 9, title: 'โรม', detail: 'โคลอสเซียม โรมันฟอรั่ม วาติกัน' },
      { day: 10, title: 'โรม - กรุงเทพฯ', detail: 'เดินทางกลับกรุงเทพฯ' }
    ],
    included: ['ตั๋วเครื่องบินไป-กลับ', 'ที่พัก 8 คืน', 'อาหาร 20 มื้อ', 'รถรับส่ง', 'ไกด์ไทย', 'ประกันการเดินทาง'],
    excluded: ['ค่าทิปไกด์และคนขับรถ', 'ค่าใช้จ่ายส่วนตัว', 'ค่าทำพาสปอร์ต', 'ค่าวีซ่า'],
    gallery: [
      'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1529260830199-42c24126f198?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&h=600&fit=crop'
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
    highlights: ['ตึกบุรจญ์คาลิฟา', 'ทะเลทราย', 'ช้อปปิ้งสุดหรู'],
    available: true,
    availableSeats: 10,
    description: 'ทัวร์ดูไบ-อาบูดาบี เมืองแห่งความหรูหรา ขึ้นตึกบุรจญ์คาลิฟา ตะลุยทะเลทราย นั่งอูฐ ช้อปปิ้งดูไบมอลล์ ชมมัสยิดชีคซาเยด',
    itinerary: [
      { day: 1, title: 'กรุงเทพฯ - ดูไบ', detail: 'เดินทางถึงดูไบ เข้าที่พัก' },
      { day: 2, title: 'ดูไบ', detail: 'ตึกบุรจญ์คาลิฟา ดูไบมอลล์ น้ำพุเต้นรำ' },
      { day: 3, title: 'ดูไบ', detail: 'Desert Safari นั่งอูฐ ขับรถ 4WD' },
      { day: 4, title: 'ดูไบ - อาบูดาบี', detail: 'มัสยิดชีคซาเยด Ferrari World' },
      { day: 5, title: 'อาบูดาบี - ดูไบ', detail: 'ตลาดทองและเครื่องเทศ' },
      { day: 6, title: 'ดูไบ - กรุงเทพฯ', detail: 'เดินทางกลับกรุงเทพฯ' }
    ],
    included: ['ตั๋วเครื่องบินไป-กลับ', 'ที่พัก 4 คืน', 'อาหาร 10 มื้อ', 'รถรับส่ง', 'ไกด์ไทย', 'ประกันการเดินทาง'],
    excluded: ['ค่าทิปไกด์และคนขับรถ', 'ค่าใช้จ่ายส่วนตัว', 'ค่าทำพาสปอร์ต'],
    gallery: [
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=800&h=600&fit=crop'
    ]
  },
  {
    id: 'tour-usa-008',
    title: 'ทัวร์อเมริกา ลอสแอนเจลิส ลาสเวกัส',
    destination: 'สหรัฐอเมริกา',
    duration: '9 วัน 7 คืน',
    price: 75900,
    rating: 4.6,
    reviewCount: 92,
    image: 'https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?w=800&h=600&fit=crop',
    highlights: ['ฮอลลีวูด', 'แกรนด์แคนยอน', 'ลาสเวกัส'],
    available: true,
    availableSeats: 7,
    description: 'ทัวร์อเมริกาฝั่งตะวันตก ลอสแอนเจลิส ฮอลลีวูด ดิสนีย์แลนด์ ลาสเวกัส แกรนด์แคนยอน ซานฟรานซิสโก สะพานโกลเดนเกต',
    itinerary: [
      { day: 1, title: 'กรุงเทพฯ - ลอสแอนเจลิส', detail: 'เดินทางถึง LA เข้าที่พัก' },
      { day: 2, title: 'ลอสแอนเจลิส', detail: 'ฮอลลีวูด Beverly Hills' },
      { day: 3, title: 'ลอสแอนเจลิส', detail: 'ดิสนีย์แลนด์เต็มวัน' },
      { day: 4, title: 'ลอสแอนเจลิส - ลาสเวกัส', detail: 'เดินทางสู่ลาสเวกัส' },
      { day: 5, title: 'ลาสเวกัส', detail: 'แกรนด์แคนยอน' },
      { day: 6, title: 'ลาสเวกัส - ซานฟรานซิสโก', detail: 'เดินทางสู่ซานฟรานซิสโก' },
      { day: 7, title: 'ซานฟรานซิสโก', detail: 'สะพานโกลเดนเกต อัลคาทราซ' },
      { day: 8, title: 'ซานฟรานซิสโก', detail: 'อิสระช้อปปิ้ง' },
      { day: 9, title: 'ซานฟรานซิสโก - กรุงเทพฯ', detail: 'เดินทางกลับ' }
    ],
    included: ['ตั๋วเครื่องบินไป-กลับ', 'ที่พัก 7 คืน', 'อาหาร 15 มื้อ', 'รถรับส่ง', 'ไกด์ไทย', 'ประกันการเดินทาง'],
    excluded: ['ค่าทิปไกด์และคนขับรถ', 'ค่าใช้จ่ายส่วนตัว', 'ค่าทำพาสปอร์ต', 'ค่าวีซ่า'],
    gallery: [
      'https://images.unsplash.com/photo-1542259009477-d625272157b7?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1515896769750-31548aa180ed?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600&fit=crop'
    ]
  },
  {
    id: 'tour-au-009',
    title: 'ทัวร์ออสเตรเลีย ซิดนีย์ เมลเบิร์น',
    destination: 'ออสเตรเลีย',
    duration: '8 วัน 6 คืน',
    price: 68900,
    rating: 4.7,
    reviewCount: 110,
    image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800&h=600&fit=crop',
    highlights: ['โอเปร่าเฮาส์', 'เกรทโอเชี่ยนโรด', 'จิงโจ้'],
    available: true,
    availableSeats: 9,
    description: 'ทัวร์ออสเตรเลีย ซิดนีย์ โอเปร่าเฮาส์ สะพานฮาร์เบอร์ เมลเบิร์น เกรทโอเชี่ยนโรด 12 Apostles สวนสัตว์ชมจิงโจ้และโคอาล่า',
    itinerary: [
      { day: 1, title: 'กรุงเทพฯ - ซิดนีย์', detail: 'เดินทางถึงซิดนีย์' },
      { day: 2, title: 'ซิดนีย์', detail: 'โอเปร่าเฮาส์ สะพานฮาร์เบอร์' },
      { day: 3, title: 'ซิดนีย์', detail: 'บลูเมาท์เทน Three Sisters' },
      { day: 4, title: 'ซิดนีย์', detail: 'สวนสัตว์ Bondi Beach' },
      { day: 5, title: 'ซิดนีย์ - เมลเบิร์น', detail: 'เดินทางสู่เมลเบิร์น' },
      { day: 6, title: 'เมลเบิร์น', detail: 'เกรทโอเชี่ยนโรด 12 Apostles' },
      { day: 7, title: 'เมลเบิร์น', detail: 'เกาะฟิลลิป ดูเพนกวิน' },
      { day: 8, title: 'เมลเบิร์น - กรุงเทพฯ', detail: 'เดินทางกลับ' }
    ],
    included: ['ตั๋วเครื่องบินไป-กลับ', 'ที่พัก 6 คืน', 'อาหาร 14 มื้อ', 'รถรับส่ง', 'ไกด์ไทย', 'ประกันการเดินทาง'],
    excluded: ['ค่าทิปไกด์และคนขับรถ', 'ค่าใช้จ่ายส่วนตัว', 'ค่าทำพาสปอร์ต', 'ค่าวีซ่า'],
    gallery: [
      'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1529108190281-9a4f620bc2d8?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1494233892892-84542a694e72?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1514395462725-fb4566210144?w=800&h=600&fit=crop'
    ]
  },
  {
    id: 'tour-nz-010',
    title: 'ทัวร์นิวซีแลนด์ เกาะเหนือ เกาะใต้',
    destination: 'นิวซีแลนด์',
    duration: '9 วัน 7 คืน',
    price: 72900,
    rating: 4.8,
    reviewCount: 65,
    image: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&h=600&fit=crop',
    highlights: ['มิลฟอร์ดซาวด์', 'ควีนส์ทาวน์', 'ถ้ำหนอนเรืองแสง'],
    available: true,
    availableSeats: 11,
    description: 'ทัวร์นิวซีแลนด์ทั้ง 2 เกาะ โอ๊คแลนด์ โรโตรัว ควีนส์ทาวน์ มิลฟอร์ดซาวด์ ไครสต์เชิร์ช ถ้ำหนอนเรืองแสง',
    itinerary: [
      { day: 1, title: 'กรุงเทพฯ - โอ๊คแลนด์', detail: 'เดินทางถึงโอ๊คแลนด์' },
      { day: 2, title: 'โอ๊คแลนด์ - โรโตรัว', detail: 'หมู่บ้านชาวเมารี น้ำพุร้อน' },
      { day: 3, title: 'โรโตรัว - ไวโตโม', detail: 'ถ้ำหนอนเรืองแสง' },
      { day: 4, title: 'โอ๊คแลนด์ - ควีนส์ทาวน์', detail: 'บินสู่เกาะใต้' },
      { day: 5, title: 'ควีนส์ทาวน์', detail: 'กระเช้าสู่ยอดเขาบ็อบส์พีค' },
      { day: 6, title: 'ควีนส์ทาวน์ - มิลฟอร์ดซาวด์', detail: 'ล่องเรือมิลฟอร์ดซาวด์' },
      { day: 7, title: 'ควีนส์ทาวน์ - ไครสต์เชิร์ช', detail: 'เมืองไครสต์เชิร์ช' },
      { day: 8, title: 'ไครสต์เชิร์ช', detail: 'อิสระช้อปปิ้ง' },
      { day: 9, title: 'ไครสต์เชิร์ช - กรุงเทพฯ', detail: 'เดินทางกลับ' }
    ],
    included: ['ตั๋วเครื่องบินไป-กลับ', 'ที่พัก 7 คืน', 'อาหาร 16 มื้อ', 'รถรับส่ง', 'ไกด์ไทย', 'ประกันการเดินทาง'],
    excluded: ['ค่าทิปไกด์และคนขับรถ', 'ค่าใช้จ่ายส่วนตัว', 'ค่าทำพาสปอร์ต', 'ค่าวีซ่า'],
    gallery: [
      'https://images.unsplash.com/photo-1507097634215-e82e6b518529?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1496184737574-22ef388c6c5f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1561562176-47dbaff42391?w=800&h=600&fit=crop'
    ]
  },
  {
    id: 'tour-in-011',
    title: 'ทัวร์อินเดีย ชัยปุระ อัครา เดลี',
    destination: 'อินเดีย',
    duration: '6 วัน 5 คืน',
    price: 28900,
    rating: 4.4,
    reviewCount: 73,
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop',
    highlights: ['ทัชมาฮาล', 'นครสีชมพู', 'ป้อมแดง'],
    available: true,
    availableSeats: 14,
    description: 'ทัวร์อินเดียสามเหลี่ยมทองคำ เดลี อัครา ชัยปุระ ชมทัชมาฮาล 1 ใน 7 สิ่งมหัศจรรย์ของโลก นครสีชมพู',
    itinerary: [
      { day: 1, title: 'กรุงเทพฯ - เดลี', detail: 'เดินทางถึงเดลี' },
      { day: 2, title: 'เดลี', detail: 'ป้อมแดง ประตูเมืองอินเดีย' },
      { day: 3, title: 'เดลี - อัครา', detail: 'ทัชมาฮาล ป้อมอัครา' },
      { day: 4, title: 'อัครา - ชัยปุระ', detail: 'นครสีชมพู ป้อมอัมเบอร์' },
      { day: 5, title: 'ชัยปุระ - เดลี', detail: 'พระราชวังลม เดินทางกลับเดลี' },
      { day: 6, title: 'เดลี - กรุงเทพฯ', detail: 'เดินทางกลับ' }
    ],
    included: ['ตั๋วเครื่องบินไป-กลับ', 'ที่พัก 5 คืน', 'อาหาร 12 มื้อ', 'รถรับส่ง', 'ไกด์ไทย', 'ประกันการเดินทาง'],
    excluded: ['ค่าทิปไกด์และคนขับรถ', 'ค่าใช้จ่ายส่วนตัว', 'ค่าทำพาสปอร์ต', 'ค่าวีซ่า'],
    gallery: [
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1587135941948-670b381f08ce?w=800&h=600&fit=crop'
    ]
  },
  {
    id: 'tour-eg-012',
    title: 'ทัวร์อียิปต์ ไคโร ลุกซอร์',
    destination: 'อียิปต์',
    duration: '7 วัน 5 คืน',
    price: 48900,
    rating: 4.6,
    reviewCount: 54,
    image: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=800&h=600&fit=crop',
    highlights: ['พีระมิด', 'สฟิงซ์', 'ล่องแม่น้ำไนล์'],
    available: true,
    availableSeats: 6,
    description: 'ทัวร์อียิปต์ ไคโร พีระมิดกีซ่า สฟิงซ์ ลุกซอร์ หุบผากษัตริย์ ล่องเรือแม่น้ำไนล์',
    itinerary: [
      { day: 1, title: 'กรุงเทพฯ - ไคโร', detail: 'เดินทางถึงไคโร' },
      { day: 2, title: 'ไคโร', detail: 'พีระมิดกีซ่า สฟิงซ์' },
      { day: 3, title: 'ไคโร', detail: 'พิพิธภัณฑ์อียิปต์ ตลาดข่านเอลคาลิลี' },
      { day: 4, title: 'ไคโร - ลุกซอร์', detail: 'บินภายในสู่ลุกซอร์' },
      { day: 5, title: 'ลุกซอร์', detail: 'หุบผากษัตริย์ วิหารคาร์นัค' },
      { day: 6, title: 'ลุกซอร์ - ไคโร', detail: 'ล่องแม่น้ำไนล์ กลับไคโร' },
      { day: 7, title: 'ไคโร - กรุงเทพฯ', detail: 'เดินทางกลับ' }
    ],
    included: ['ตั๋วเครื่องบินไป-กลับ', 'ที่พัก 5 คืน', 'อาหาร 13 มื้อ', 'รถรับส่ง', 'ไกด์ไทย', 'ประกันการเดินทาง'],
    excluded: ['ค่าทิปไกด์และคนขับรถ', 'ค่าใช้จ่ายส่วนตัว', 'ค่าทำพาสปอร์ต', 'ค่าวีซ่า'],
    gallery: [
      'https://images.unsplash.com/photo-1553913861-c0fddf2619ee?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1539768942893-daf53e448371?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1562679299-266edbefd084?w=800&h=600&fit=crop'
    ]
  },
  {
    id: 'tour-tr-013',
    title: 'ทัวร์ตุรกี อิสตันบูล คัปปาโดเกีย',
    destination: 'ตุรกี',
    duration: '8 วัน 6 คืน',
    price: 39900,
    rating: 4.7,
    reviewCount: 98,
    image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&h=600&fit=crop',
    highlights: ['บอลลูนลอยฟ้า', 'ปามุคคาเล่', 'บลูมอสก์'],
    available: true,
    availableSeats: 10,
    description: 'ทัวร์ตุรกี อิสตันบูล คัปปาโดเกีย ขึ้นบอลลูน ปามุคคาเล่ ปราสาทปุยฝ้าย เอเฟซุส',
    itinerary: [
      { day: 1, title: 'กรุงเทพฯ - อิสตันบูล', detail: 'เดินทางถึงอิสตันบูล' },
      { day: 2, title: 'อิสตันบูล', detail: 'บลูมอสก์ ฮาเกียโซเฟีย' },
      { day: 3, title: 'อิสตันบูล - คัปปาโดเกีย', detail: 'บินภายในสู่คัปปาโดเกีย' },
      { day: 4, title: 'คัปปาโดเกีย', detail: 'ขึ้นบอลลูน เมืองใต้ดิน' },
      { day: 5, title: 'คัปปาโดเกีย - ปามุคคาเล่', detail: 'เดินทางสู่ปามุคคาเล่' },
      { day: 6, title: 'ปามุคคาเล่ - คูซาดาซี', detail: 'ปราสาทปุยฝ้าย เอเฟซุส' },
      { day: 7, title: 'คูซาดาซี - อิสตันบูล', detail: 'กลับอิสตันบูล ตลาดแกรนด์บาซาร์' },
      { day: 8, title: 'อิสตันบูล - กรุงเทพฯ', detail: 'เดินทางกลับ' }
    ],
    included: ['ตั๋วเครื่องบินไป-กลับ', 'ที่พัก 6 คืน', 'อาหาร 15 มื้อ', 'รถรับส่ง', 'ไกด์ไทย', 'ประกันการเดินทาง'],
    excluded: ['ค่าทิปไกด์และคนขับรถ', 'ค่าใช้จ่ายส่วนตัว', 'ค่าทำพาสปอร์ต', 'ค่าขึ้นบอลลูน'],
    gallery: [
      'https://images.unsplash.com/photo-1570939274717-7eda259b50ed?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1525885967029-a3ed6c1b23f9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1567527259232-3a7fcd490c55?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1598867166431-f1ee8cd29c7b?w=800&h=600&fit=crop'
    ]
  },
  {
    id: 'tour-morocco-014',
    title: 'ทัวร์โมร็อกโก คาซาบลังกา มาราเกช',
    destination: 'โมร็อกโก',
    duration: '9 วัน 7 คืน',
    price: 52900,
    rating: 4.5,
    reviewCount: 42,
    image: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=800&h=600&fit=crop',
    highlights: ['ทะเลทรายซาฮารา', 'เมืองสีน้ำเงิน', 'ตลาดเมดิน่า'],
    available: true,
    availableSeats: 8,
    description: 'ทัวร์โมร็อกโก คาซาบลังกา มาราเกช เฟซ เชฟชาอูน เมืองสีน้ำเงิน ขี่อูฐในทะเลทรายซาฮารา',
    itinerary: [
      { day: 1, title: 'กรุงเทพฯ - คาซาบลังกา', detail: 'เดินทางถึงคาซาบลังกา' },
      { day: 2, title: 'คาซาบลังกา - ราบัต', detail: 'มัสยิดฮัสซันที่ 2 เมืองหลวงราบัต' },
      { day: 3, title: 'ราบัต - เชฟชาอูน', detail: 'เมืองสีน้ำเงินเชฟชาอูน' },
      { day: 4, title: 'เชฟชาอูน - เฟซ', detail: 'เมืองเก่าเฟซ เมดิน่า' },
      { day: 5, title: 'เฟซ - เมอร์ซูก้า', detail: 'เดินทางสู่ทะเลทรายซาฮารา' },
      { day: 6, title: 'เมอร์ซูก้า', detail: 'ขี่อูฐชมพระอาทิตย์ตก นอนแคมป์' },
      { day: 7, title: 'เมอร์ซูก้า - มาราเกช', detail: 'ผ่านเทือกเขาแอตลาส' },
      { day: 8, title: 'มาราเกช', detail: 'จัตุรัสเจมาเอลฟนา สวนมาโจแรล' },
      { day: 9, title: 'มาราเกช - กรุงเทพฯ', detail: 'เดินทางกลับ' }
    ],
    included: ['ตั๋วเครื่องบินไป-กลับ', 'ที่พัก 7 คืน', 'อาหาร 18 มื้อ', 'รถรับส่ง', 'ไกด์ไทย', 'ประกันการเดินทาง'],
    excluded: ['ค่าทิปไกด์และคนขับรถ', 'ค่าใช้จ่ายส่วนตัว', 'ค่าทำพาสปอร์ต'],
    gallery: [
      'https://images.unsplash.com/photo-1549425743-43cf32b88ba3?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1569383746724-6f1b882b8f46?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1596591199571-bb6797c3179f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1558818623-0c34e762c094?w=800&h=600&fit=crop'
    ]
  },
  {
    id: 'tour-spain-015',
    title: 'ทัวร์สเปน มาดริด บาร์เซโลน่า',
    destination: 'สเปน',
    duration: '9 วัน 7 คืน',
    price: 65900,
    rating: 4.8,
    reviewCount: 125,
    image: 'https://images.unsplash.com/photo-1558642084-fd07fae5282e?w=800&h=600&fit=crop',
    highlights: ['ซากราดา ฟามิเลีย', 'พระราชวังหลวง', 'ฟลาเมงโก้'],
    available: true,
    availableSeats: 7,
    description: 'ทัวร์สเปนคลาสสิก มาดริด บาร์เซโลน่า เซบียา กรานาดา ชมฟลาเมงโก้ ซากราดา ฟามิเลีย อัลฮัมบรา',
    itinerary: [
      { day: 1, title: 'กรุงเทพฯ - มาดริด', detail: 'เดินทางถึงมาดริด' },
      { day: 2, title: 'มาดริด', detail: 'พระราชวังหลวง พลาซ่า มายอร์' },
      { day: 3, title: 'มาดริด - โทเลโด', detail: 'เมืองมรดกโลกโทเลโด' },
      { day: 4, title: 'มาดริด - เซบียา', detail: 'รถไฟความเร็วสูงสู่เซบียา' },
      { day: 5, title: 'เซบียา - กรานาดา', detail: 'มหาวิหารเซบียา พระราชวังอัลฮัมบรา' },
      { day: 6, title: 'กรานาดา - บาร์เซโลน่า', detail: 'บินภายในสู่บาร์เซโลน่า' },
      { day: 7, title: 'บาร์เซโลน่า', detail: 'ซากราดา ฟามิเลีย ปาร์ค กูเอล' },
      { day: 8, title: 'บาร์เซโลน่า', detail: 'ลา รัมบลา ตลาดโบเกอเรีย' },
      { day: 9, title: 'บาร์เซโลน่า - กรุงเทพฯ', detail: 'เดินทางกลับ' }
    ],
    included: ['ตั๋วเครื่องบินไป-กลับ', 'ที่พัก 7 คืน', 'อาหาร 17 มื้อ', 'รถรับส่ง', 'ไกด์ไทย', 'ประกันการเดินทาง'],
    excluded: ['ค่าทิปไกด์และคนขับรถ', 'ค่าใช้จ่ายส่วนตัว', 'ค่าทำพาสปอร์ต', 'ค่าวีซ่า'],
    gallery: [
      'https://images.unsplash.com/photo-1523531294919-6154b3e68589?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1509845350455-fb8707d98474?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1504019347908-b45f9b0b8dd5?w=800&h=600&fit=crop'
    ]
  },
  {
    id: 'tour-russia-016',
    title: 'ทัวร์รัสเซีย มอสโคว์ เซนต์ปีเตอร์สเบิร์ก',
    destination: 'รัสเซีย',
    duration: '8 วัน 6 คืน',
    price: 58900,
    rating: 4.6,
    reviewCount: 76,
    image: 'https://images.unsplash.com/photo-1513326738677-b964603b136d?w=800&h=600&fit=crop',
    highlights: ['พระราชวังเครมลิน', 'จัตุรัสแดง', 'พระราชวังฤดูหนาว'],
    available: true,
    availableSeats: 9,
    description: 'ทัวร์รัสเซียคลาสสิก มอสโคว์ เครมลิน จัตุรัสแดง เซนต์ปีเตอร์สเบิร์ก พระราชวังฤดูหนาว เฮอร์มิเทจ',
    itinerary: [
      { day: 1, title: 'กรุงเทพฯ - มอสโคว์', detail: 'เดินทางถึงมอสโคว์' },
      { day: 2, title: 'มอสโคว์', detail: 'พระราชวังเครมลิน จัตุรัสแดง' },
      { day: 3, title: 'มอสโคว์', detail: 'วิหารเซนต์บาซิล สถานีรถไฟใต้ดิน' },
      { day: 4, title: 'มอสโคว์ - เซนต์ปีเตอร์สเบิร์ก', detail: 'รถไฟความเร็วสูง Sapsan' },
      { day: 5, title: 'เซนต์ปีเตอร์สเบิร์ก', detail: 'พระราชวังฤดูหนาว พิพิธภัณฑ์เฮอร์มิเทจ' },
      { day: 6, title: 'เซนต์ปีเตอร์สเบิร์ก', detail: 'พระราชวังฤดูร้อน ปีเตอร์ฮอฟ' },
      { day: 7, title: 'เซนต์ปีเตอร์สเบิร์ก', detail: 'โบสถ์หยดเลือด ป้อมปีเตอร์และพอล' },
      { day: 8, title: 'เซนต์ปีเตอร์สเบิร์ก - กรุงเทพฯ', detail: 'เดินทางกลับ' }
    ],
    included: ['ตั๋วเครื่องบินไป-กลับ', 'ที่พัก 6 คืน', 'อาหาร 16 มื้อ', 'รถรับส่ง', 'ไกด์ไทย', 'ประกันการเดินทาง'],
    excluded: ['ค่าทิปไกด์และคนขับรถ', 'ค่าใช้จ่ายส่วนตัว', 'ค่าทำพาสปอร์ต', 'ค่าวีซ่า'],
    gallery: [
      'https://images.unsplash.com/photo-1547448415-e9f5b28e570d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1520106212299-d99c443e4568?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1548834925-e48f612bfece?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=800&h=600&fit=crop'
    ]
  },
  {
    id: 'tour-canada-017',
    title: 'ทัวร์แคนาดา โทรอนโต ไนแอการ่า',
    destination: 'แคนาดา',
    duration: '8 วัน 6 คืน',
    price: 79900,
    rating: 4.7,
    reviewCount: 88,
    image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800&h=600&fit=crop',
    highlights: ['น้ำตกไนแอการ่า', 'ซีเอ็นทาวเวอร์', 'ใบไม้เปลี่ยนสี'],
    available: true,
    availableSeats: 10,
    description: 'ทัวร์แคนาดาฝั่งตะวันออก โทรอนโต น้ำตกไนแอการ่า ออตตาวา มอนทรีออล ควิเบก ชมใบไม้เปลี่ยนสี',
    itinerary: [
      { day: 1, title: 'กรุงเทพฯ - โทรอนโต', detail: 'เดินทางถึงโทรอนโต' },
      { day: 2, title: 'โทรอนโต', detail: 'ซีเอ็นทาวเวอร์ ตลาดเซนต์ลอว์เรนซ์' },
      { day: 3, title: 'โทรอนโต - ไนแอการ่า', detail: 'น้ำตกไนแอการ่า ล่องเรือ Maid of the Mist' },
      { day: 4, title: 'ไนแอการ่า - ออตตาวา', detail: 'เมืองหลวงออตตาวา รัฐสภา' },
      { day: 5, title: 'ออตตาวา - มอนทรีออล', detail: 'มหาวิหารนอเทรอดาม' },
      { day: 6, title: 'มอนทรีออล - ควิเบก', detail: 'เมืองเก่าควิเบก ปราสาท Frontenac' },
      { day: 7, title: 'ควิเบก - โทรอนโต', detail: 'เดินทางกลับโทรอนโต' },
      { day: 8, title: 'โทรอนโต - กรุงเทพฯ', detail: 'เดินทางกลับ' }
    ],
    included: ['ตั๋วเครื่องบินไป-กลับ', 'ที่พัก 6 คืน', 'อาหาร 15 มื้อ', 'รถรับส่ง', 'ไกด์ไทย', 'ประกันการเดินทาง'],
    excluded: ['ค่าทิปไกด์และคนขับรถ', 'ค่าใช้จ่ายส่วนตัว', 'ค่าทำพาสปอร์ต', 'ค่าวีซ่า'],
    gallery: [
      'https://images.unsplash.com/photo-1549221987-25a490f65d34?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1486591913781-4bee9ed65bfe?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1569018107541-f371cf7ad845?w=800&h=600&fit=crop'
    ]
  }
]

interface TourDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default function TourDetailPage({ params }: TourDetailPageProps) {
  const [tour, setTour] = useState<any>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [activeTab, setActiveTab] = useState('itinerary')

  useEffect(() => {
    const getTour = async () => {
      const resolvedParams = await params
      const tourId = resolvedParams.id
      const foundTour = tourData.find(t => t.id === tourId)
      if (foundTour) {
        setTour(foundTour)
      }
    }
    getTour()
  }, [params])

  if (!tour) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">กำลังโหลดข้อมูล...</p>
        </div>
      </div>
    )
  }

  const handleBooking = () => {
    // Handle booking logic
    alert('เปิดหน้าจองทัวร์')
  }

  const handleShare = (platform: string) => {
    const url = window.location.href
    const text = `ชวนเที่ยว ${tour.title} - ราคาเพียง ${tour.price.toLocaleString()} บาท`
    
    switch(platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`)
        break
      case 'line':
        window.open(`https://social-plugins.line.me/lineit/share?url=${url}&text=${text}`)
        break
      case 'copy':
        navigator.clipboard.writeText(url)
        alert('คัดลอกลิงก์แล้ว')
        break
    }
    setShowShareMenu(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Mobile Header */}
      <div className="sticky top-0 z-50 bg-white shadow-md md:hidden">
        <div className="flex items-center justify-between p-4">
          <Link
            href="/tour-search-21"
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-lg font-bold truncate flex-1 mx-2">{tour.title}</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
            <button
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
            >
              <Share2 className="w-6 h-6" />
              {showShareMenu && (
                <div className="absolute right-0 top-12 bg-white rounded-lg shadow-xl p-2 w-48 z-10">
                  <button
                    onClick={() => handleShare('facebook')}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg"
                  >
                    แชร์ Facebook
                  </button>
                  <button
                    onClick={() => handleShare('line')}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg"
                  >
                    แชร์ LINE
                  </button>
                  <button
                    onClick={() => handleShare('copy')}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg"
                  >
                    คัดลอกลิงก์
                  </button>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:block bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/tour-search-21"
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <h1 className="text-2xl font-bold">{tour.title}</h1>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                <span>บันทึก</span>
              </button>
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors relative"
              >
                <Share2 className="w-5 h-5" />
                <span>แชร์</span>
                {showShareMenu && (
                  <div className="absolute right-0 top-12 bg-white rounded-lg shadow-xl p-2 w-48 z-10">
                    <button
                      onClick={() => handleShare('facebook')}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg"
                    >
                      แชร์ Facebook
                    </button>
                    <button
                      onClick={() => handleShare('line')}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg"
                    >
                      แชร์ LINE
                    </button>
                    <button
                      onClick={() => handleShare('copy')}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg"
                    >
                      คัดลอกลิงก์
                    </button>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Image Gallery */}
        <div className="mb-6">
          <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-4">
            <Image
              src={tour.gallery?.[selectedImage] || tour.image}
              alt={tour.title}
              fill
              className="object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4 flex gap-2 justify-center">
              {tour.gallery?.map((_: any, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    selectedImage === index ? 'w-8 bg-white' : 'bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>
          
          {/* Thumbnail Gallery - Desktop */}
          <div className="hidden md:flex gap-2 overflow-x-auto">
            {tour.gallery?.map((img: string, index: number) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative h-20 w-32 rounded-lg overflow-hidden flex-shrink-0 ${
                  selectedImage === index ? 'ring-2 ring-red-500' : ''
                }`}
              >
                <Image
                  src={img}
                  alt={`${tour.title} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Tour Info */}
        <div className="bg-white rounded-xl p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">{tour.title}</h2>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{tour.destination}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{tour.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span>{tour.rating} ({tour.reviewCount} รีวิว)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Price & Availability */}
          <div className="flex items-center justify-between py-4 border-t border-b">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-red-600">
                  ฿{tour.price.toLocaleString()}
                </span>
                {tour.originalPrice && (
                  <span className="text-lg text-gray-400 line-through">
                    ฿{tour.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600">ราคาต่อท่าน</p>
            </div>
            <div className="text-right">
              {tour.available ? (
                <div>
                  <p className="text-green-600 font-semibold">มีที่นั่งว่าง</p>
                  <p className="text-sm text-gray-600">เหลือ {tour.availableSeats} ที่นั่ง</p>
                </div>
              ) : (
                <p className="text-red-600 font-semibold">เต็มแล้ว</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="py-4">
            <p className="text-gray-700 leading-relaxed">{tour.description}</p>
          </div>

          {/* Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
            {tour.highlights.map((highlight: string, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl overflow-hidden mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('itinerary')}
              className={`flex-1 py-3 px-4 font-semibold transition-colors ${
                activeTab === 'itinerary' 
                  ? 'text-red-600 border-b-2 border-red-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              โปรแกรมทัวร์
            </button>
            <button
              onClick={() => setActiveTab('included')}
              className={`flex-1 py-3 px-4 font-semibold transition-colors ${
                activeTab === 'included' 
                  ? 'text-red-600 border-b-2 border-red-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              รายละเอียด
            </button>
            <button
              onClick={() => setActiveTab('terms')}
              className={`flex-1 py-3 px-4 font-semibold transition-colors ${
                activeTab === 'terms' 
                  ? 'text-red-600 border-b-2 border-red-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              เงื่อนไข
            </button>
          </div>

          <div className="p-6">
            {/* Itinerary Tab */}
            {activeTab === 'itinerary' && (
              <div className="space-y-4">
                {tour.itinerary?.map((day: any) => (
                  <div key={day.day} className="flex gap-4">
                    <div className="flex-shrink-0 w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center">
                      <span className="font-bold text-red-600">วันที่ {day.day}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{day.title}</h4>
                      <p className="text-gray-600">{day.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Included Tab */}
            {activeTab === 'included' && (
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3 text-green-600">อัตรานี้รวม</h4>
                  <div className="space-y-2">
                    {tour.included?.map((item: string, index: number) => (
                      <div key={index} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-500 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-red-600">อัตรานี้ไม่รวม</h4>
                  <div className="space-y-2">
                    {tour.excluded?.map((item: string, index: number) => (
                      <div key={index} className="flex items-start gap-2">
                        <X className="w-5 h-5 text-red-500 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Terms Tab */}
            {activeTab === 'terms' && (
              <div className="space-y-4 text-gray-700">
                <div>
                  <h4 className="font-semibold mb-2">เงื่อนไขการจอง</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>ชำระมัดจำ 10,000 บาท ภายใน 24 ชั่วโมงหลังจอง</li>
                    <li>ชำระส่วนที่เหลือก่อนเดินทาง 30 วัน</li>
                    <li>กรณียกเลิกก่อนเดินทาง 45 วัน คืนเงินเต็มจำนวน</li>
                    <li>กรณียกเลิกก่อนเดินทาง 30-44 วัน หักค่าใช้จ่าย 50%</li>
                    <li>กรณียกเลิกก่อนเดินทางน้อยกว่า 30 วัน ไม่คืนเงิน</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">หมายเหตุ</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>ราคาอาจเปลี่ยนแปลงตามช่วงเทศกาล</li>
                    <li>จำนวนผู้เดินทางขั้นต่ำ 15 ท่าน</li>
                    <li>บริษัทขอสงวนสิทธิ์ในการเปลี่ยนแปลงโปรแกรม</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 flex items-center gap-3">
            <Shield className="w-8 h-8 text-blue-500" />
            <div>
              <p className="font-semibold text-sm">การันตีคุณภาพ</p>
              <p className="text-xs text-gray-600">มาตรฐาน TAT</p>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 flex items-center gap-3">
            <Award className="w-8 h-8 text-yellow-500" />
            <div>
              <p className="font-semibold text-sm">รางวัลการันตี</p>
              <p className="text-xs text-gray-600">บริการยอดเยี่ยม</p>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 flex items-center gap-3">
            <ThumbsUp className="w-8 h-8 text-green-500" />
            <div>
              <p className="font-semibold text-sm">รีวิวจริง</p>
              <p className="text-xs text-gray-600">จากลูกค้า 100%</p>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 flex items-center gap-3">
            <Users className="w-8 h-8 text-purple-500" />
            <div>
              <p className="font-semibold text-sm">ไกด์มืออาชีพ</p>
              <p className="text-xs text-gray-600">ประสบการณ์ 10+ ปี</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Booking Bar */}
      <div className="sticky bottom-0 bg-white border-t shadow-lg p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-red-600">
                ฿{tour.price.toLocaleString()}
              </span>
              {tour.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  ฿{tour.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-600">ต่อท่าน</p>
          </div>
          <div className="flex gap-2">
            <a
              href="tel:021234567"
              className="p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <Phone className="w-5 h-5" />
            </a>
            <a
              href="https://line.me/ti/p/@tourwow"
              className="p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <button
              onClick={handleBooking}
              disabled={!tour.available}
              className={`px-6 py-3 rounded-lg font-bold transition-all ${
                tour.available
                  ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <span>{tour.available ? 'จองเลย!' : 'เต็มแล้ว'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}