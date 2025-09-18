'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import { Search, MapPin, Calendar, Star, Heart, Clock, Users, ArrowRight, X, TrendingUp, ArrowUpDown, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import AsiaIcon from '@/components/icons/AsiaIcon'
import EuropeIcon from '@/components/icons/EuropeIcon'
import { allTours } from '@/data/tours-data'

// ใช้ข้อมูลทัวร์จากไฟล์แยก
const mockTours = allTours

// ข้อมูลเก่าที่จะลบออก (เก็บไว้สำหรับ reference)
const mockToursOld = [
  {
    id: 1,
    title: "ญี่ปุ่น 7 วัน 6 คืน โตเกียว-เกียวโต-โอซาก้า",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop",
    price: 45900,
    originalPrice: 52900,
    duration: "7 วัน 6 คืน",
    rating: 4.8,
    reviews: 127,
    highlights: ["วัดคิโยมิซุ", "ภูเขาฟูจิ", "ชินจูกุ", "ดาเตะบาชิ"],
    destinations: ["โตเกียว", "เกียวโต", "โอซาก้า"],
    discount: 13,
    groupSize: "2-15 คน",
    departureDate: "มี.ค. - พ.ค. 67"
  },
  {
    id: 2,
    title: "เกาหลีใต้ 6 วัน 5 คืน โซล-ปูซาน-เชจู",
    image: "https://images.unsplash.com/photo-1538485399081-7c8ed7f69c91?w=400&h=300&fit=crop",
    price: 38900,
    originalPrice: 45900,
    duration: "6 วัน 5 คืน",
    rating: 4.7,
    reviews: 89,
    highlights: ["พระราชวังเคียงบกกุง", "เกาะเชจู", "ตลาดนัมแดมุน", "หอคอยเอ็นโซล"],
    destinations: ["โซล", "ปูซาน", "เชจู"],
    discount: 15,
    groupSize: "2-12 คน",
    departureDate: "เม.ย. - มิ.ย. 67"
  },
  {
    id: 3,
    title: "ยุโรป 12 วัน 11 คืน ฝรั่งเศส-อิตาลี-สวิตเซอร์แลนด์",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&h=300&fit=crop",
    price: 129900,
    originalPrice: 149900,
    duration: "12 วัน 11 คืน",
    rating: 4.9,
    reviews: 203,
    highlights: ["หอไอเฟล", "โคลอสเซียม", "หอเอนปิซา", "เทือกเขาแอลป์"],
    destinations: ["ปารีส", "โรม", "มิลาน", "ซูริค"],
    discount: 13,
    groupSize: "2-20 คน",
    departureDate: "พ.ค. - ธ.ค. 68"
  },
  {
    id: 4,
    title: "ออสเตรเลีย 8 วัน 7 คืน ซิดนีย์-เมลเบิร์น-โกลด์โคสต์",
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400&h=300&fit=crop",
    price: 78900,
    originalPrice: 89900,
    duration: "8 วัน 7 คืน",
    rating: 4.6,
    reviews: 156,
    highlights: ["โอเปร่าเฮาส์", "เกรทบาร์รีฟ", "ทาสเมเนีย", "แอร์ร็อค"],
    destinations: ["ซิดนีย์", "เมลเบิร์น", "โกลด์โคสต์"],
    discount: 12,
    groupSize: "2-18 คน",
    departureDate: "มิ.ย. - ก.ย. 67"
  },
  {
    id: 5,
    title: "นิวซีแลนด์ 10 วัน 9 คืน ออกแลนด์-ควีนส์ทาวน์-เวลลิงตัน",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    price: 98900,
    originalPrice: 115900,
    duration: "10 วัน 9 คืน",
    rating: 4.8,
    reviews: 94,
    highlights: ["มิลฟอร์ดซาวด์", "โรโตรัว", "เทาโป", "ไบรท์วอเตอร์"],
    destinations: ["ออกแลนด์", "ควีนส์ทาวน์", "เวลลิงตัน"],
    discount: 15,
    groupSize: "2-16 คน",
    departureDate: "ก.ค. - ต.ค. 67"
  },
  {
    id: 6,
    title: "แคนาดา 9 วัน 8 คืน แวนคูเวอร์-แคลกะรี-โตรอนโต",
    image: "https://images.unsplash.com/photo-1519832979-6fa011b87667?w=400&h=300&fit=crop",
    price: 115900,
    originalPrice: 135900,
    duration: "9 วัน 8 คืน",
    rating: 4.7,
    reviews: 78,
    highlights: ["แบนฟ์", "ไนแอการาฟอลส์", "สแตนลีย์พาร์ค", "ซีแอตเทิล"],
    destinations: ["แวนคูเวอร์", "แคลกะรี", "โตรอนโต"],
    discount: 15,
    groupSize: "2-14 คน",
    departureDate: "ส.ค. - พ.ย. 67"
  },
  // ทัวร์ญี่ปุ่นเพิ่มเติม (ให้ครบ 45 ทัวร์)
  {
    id: 7,
    title: "ญี่ปุ่น 5 วัน 4 คืน โอซาก้า-เกียวโต-นารา",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop",
    price: 32900,
    originalPrice: 38900,
    duration: "5 วัน 4 คืน",
    rating: 4.7,
    reviews: 95,
    highlights: ["ปราสาทโอซาก้า", "วัดโทไดจิ", "กวางนารา", "ศาลเจ้าฟูชิมิอินาริ"],
    destinations: ["โอซาก้า", "เกียวโต", "นารา"],
    discount: 15,
    groupSize: "2-16 คน",
    departureDate: "ก.พ. - เม.ย. 67"
  },
  {
    id: 8,
    title: "ญี่ปุ่น 6 วัน 5 คืน ฮอกไกโด ซัปโปโร-โอตารุ",
    image: "https://images.unsplash.com/photo-1569163139394-de4798e9a8c0?w=400&h=300&fit=crop",
    price: 42900,
    originalPrice: 48900,
    duration: "6 วัน 5 คืน",
    rating: 4.8,
    reviews: 112,
    highlights: ["เทศกาลหิมะซัปโปโร", "คลองโอตารุ", "ฟาร์มโทมิตะ", "บ่อน้ำพุร้อนโนโบริเบ็ตสึ"],
    destinations: ["ซัปโปโร", "โอตารุ", "ฟูราโน่"],
    discount: 12,
    groupSize: "2-20 คน",
    departureDate: "ก.พ. - มี.ค. 67"
  },
  {
    id: 9,
    title: "ญี่ปุ่น 8 วัน 7 คืน ทาคายาม่า-ชิราคาวาโกะ-คานาซาว่า",
    image: "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=400&h=300&fit=crop",
    price: 55900,
    originalPrice: 65900,
    duration: "8 วัน 7 คืน",
    rating: 4.9,
    reviews: 87,
    highlights: ["หมู่บ้านชิราคาวาโกะ", "ตลาดเช้าทาคายาม่า", "สวนเคนโรคุเอ็น", "ปราสาททอง"],
    destinations: ["ทาคายาม่า", "ชิราคาวาโกะ", "คานาซาว่า"],
    discount: 15,
    groupSize: "2-12 คน",
    departureDate: "มี.ค. - พ.ค. 67"
  },
  {
    id: 10,
    title: "ญี่ปุ่น 4 วัน 3 คืน โตเกียวดิสนีย์แลนด์",
    image: "https://images.unsplash.com/photo-1590766940554-634a7ed41d69?w=400&h=300&fit=crop",
    price: 28900,
    originalPrice: 32900,
    duration: "4 วัน 3 คืน",
    rating: 4.6,
    reviews: 156,
    highlights: ["โตเกียวดิสนีย์แลนด์", "โตเกียวดิสนีย์ซี", "ช้อปปิ้งชิบูย่า", "วัดเซนโซจิ"],
    destinations: ["โตเกียว"],
    discount: 12,
    groupSize: "2-15 คน",
    departureDate: "ทุกเดือน"
  },
  // ทัวร์เกาหลีเพิ่มเติม (ให้ครบ 32 ทัวร์)
  {
    id: 11,
    title: "เกาหลีใต้ 5 วัน 4 คืน โซล-เอเวอร์แลนด์",
    image: "https://images.unsplash.com/photo-1546874177-31bfa593f693?w=400&h=300&fit=crop",
    price: 29900,
    originalPrice: 35900,
    duration: "5 วัน 4 คืน",
    rating: 4.5,
    reviews: 134,
    highlights: ["สวนสนุกเอเวอร์แลนด์", "พระราชวังชางด๊อก", "ตลาดเมียงดง", "ภูเขานัมซาน"],
    destinations: ["โซล", "ยงอิน"],
    discount: 17,
    groupSize: "2-18 คน",
    departureDate: "มี.ค. - พ.ค. 67"
  },
  {
    id: 12,
    title: "เกาหลีใต้ 4 วัน 3 คืน โซลช้อปปิ้ง",
    image: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=400&h=300&fit=crop",
    price: 24900,
    originalPrice: 28900,
    duration: "4 วัน 3 คืน",
    rating: 4.4,
    reviews: 98,
    highlights: ["ตลาดทงแดมุน", "ฮงแด", "คังนัม", "ชินซาดง"],
    destinations: ["โซล"],
    discount: 14,
    groupSize: "2-12 คน",
    departureDate: "ทุกเดือน"
  },
  {
    id: 13,
    title: "เกาหลีใต้ 6 วัน 5 คืน ปูซาน-แทกู-โซล",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    price: 36900,
    originalPrice: 42900,
    duration: "6 วัน 5 คืน",
    rating: 4.6,
    reviews: 76,
    highlights: ["หมู่บ้านคัมชอน", "วัดแฮดงยงกุงซา", "ตลาดจากัลชิ", "หอคอยปูซาน"],
    destinations: ["ปูซาน", "แทกู", "โซล"],
    discount: 14,
    groupSize: "2-16 คน",
    departureDate: "เม.ย. - มิ.ย. 67"
  },
  // ทัวร์จีนเพิ่มเติม (ให้ครบ 28 ทัวร์)
  {
    id: 14,
    title: "จีน 7 วัน 6 คืน ปักกิ่ง-เซี่ยงไฮ้",
    image: "https://images.unsplash.com/photo-1508804052814-cd3ba865a116?w=400&h=300&fit=crop",
    price: 38900,
    originalPrice: 45900,
    duration: "7 วัน 6 คืน",
    rating: 4.7,
    reviews: 92,
    highlights: ["กำแพงเมืองจีน", "พระราชวังต้องห้าม", "หอไข่มุก", "เซี่ยงไฮ้ดิสนีย์แลนด์"],
    destinations: ["ปักกิ่ง", "เซี่ยงไฮ้"],
    discount: 15,
    groupSize: "2-20 คน",
    departureDate: "พ.ค. - ส.ค. 67"
  },
  {
    id: 15,
    title: "จีน 5 วัน 4 คืน คุนหมิง-ต้าหลี่-ลี่เจียง",
    image: "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=400&h=300&fit=crop",
    price: 32900,
    originalPrice: 38900,
    duration: "5 วัน 4 คืน",
    rating: 4.8,
    reviews: 68,
    highlights: ["ภูเขาหิมะมังกรหยก", "เมืองเก่าลี่เจียง", "ทะเลสาบเอ๋อไห่", "สะพานแก้ว"],
    destinations: ["คุนหมิง", "ต้าหลี่", "ลี่เจียง"],
    discount: 15,
    groupSize: "2-15 คน",
    departureDate: "เม.ย. - มิ.ย. 67"
  },
  // ทัวร์ไต้หวันเพิ่มเติม (ให้ครบ 22 ทัวร์)
  {
    id: 16,
    title: "ไต้หวัน 5 วัน 4 คืน ไทเป-อาลีซาน",
    image: "https://images.unsplash.com/photo-1470004914212-05527e49370b?w=400&h=300&fit=crop",
    price: 26900,
    originalPrice: 31900,
    duration: "5 วัน 4 คืน",
    rating: 4.6,
    reviews: 103,
    highlights: ["ตึกไทเป 101", "อาลีซาน", "ทะเลสาบสุริยันจันทรา", "หมู่บ้านจิ่วเฟิ่น"],
    destinations: ["ไทเป", "เจียอี้", "หนานโถว"],
    discount: 16,
    groupSize: "2-18 คน",
    departureDate: "มี.ค. - พ.ค. 67"
  },
  {
    id: 17,
    title: "ไต้หวัน 4 วัน 3 คืน ไทเป ช้อปปิ้ง",
    image: "https://images.unsplash.com/photo-1508248467877-aec1b08de376?w=400&h=300&fit=crop",
    price: 19900,
    originalPrice: 23900,
    duration: "4 วัน 3 คืน",
    rating: 4.5,
    reviews: 87,
    highlights: ["ซีเหมินติง", "ตลาดราตรีซื่อหลิน", "เหย่หลิ่ว", "อนุสรณ์สถานเจียงไคเช็ค"],
    destinations: ["ไทเป"],
    discount: 17,
    groupSize: "2-16 คน",
    departureDate: "ทุกเดือน"
  },
  // ทัวร์ยุโรปเพิ่มเติม (ให้ครบ 35 ทัวร์)
  {
    id: 18,
    title: "ยุโรป 10 วัน 9 คืน อังกฤษ-สก๊อตแลนด์",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop",
    price: 98900,
    originalPrice: 115900,
    duration: "10 วัน 9 คืน",
    rating: 4.8,
    reviews: 145,
    highlights: ["บิ๊กเบน", "ลอนดอนอาย", "ปราสาทเอดินบะระ", "ทะเลสาบล็อคเนส"],
    destinations: ["ลอนดอน", "เอดินบะระ", "กลาสโกว์"],
    discount: 15,
    groupSize: "2-20 คน",
    departureDate: "มิ.ย. - ก.ย. 67"
  },
  {
    id: 19,
    title: "ยุโรป 8 วัน 7 คืน สเปน-โปรตุเกส",
    image: "https://images.unsplash.com/photo-1509023925912-6c96c1de6c9e?w=400&h=300&fit=crop",
    price: 85900,
    originalPrice: 99900,
    duration: "8 วัน 7 คืน",
    rating: 4.7,
    reviews: 112,
    highlights: ["ซากราดา ฟามิเลีย", "พระราชวังอัลฮัมบรา", "หอคอยเบเล็ง", "ลิสบอน"],
    destinations: ["บาร์เซโลนา", "มาดริด", "ลิสบอน"],
    discount: 14,
    groupSize: "2-18 คน",
    departureDate: "พ.ค. - ส.ค. 67"
  },
  {
    id: 20,
    title: "ยุโรป 9 วัน 8 คืน เยอรมนี-เนเธอร์แลนด์-เบลเยี่ยม",
    image: "https://images.unsplash.com/photo-1546268060-2592ff93ee24?w=400&h=300&fit=crop",
    price: 92900,
    originalPrice: 108900,
    duration: "9 วัน 8 คืน",
    rating: 4.6,
    reviews: 98,
    highlights: ["ปราสาทนอยชวานสไตน์", "หมู่บ้านกังหันลมซานส์สคันส์", "จัตุรัสกรองด์ปลาซ", "ล่องเรือคลอง"],
    destinations: ["แฟรงก์เฟิร์ต", "อัมสเตอร์ดัม", "บรัสเซลส์"],
    discount: 15,
    groupSize: "2-16 คน",
    departureDate: "ก.ค. - ต.ค. 67"
  },
  // ทัวร์ออสเตรเลียเพิ่มเติม (ให้ครบ 23 ทัวร์)
  {
    id: 21,
    title: "ออสเตรเลีย 6 วัน 5 คืน ซิดนีย์-บลูเมาท์เท่น",
    image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=400&h=300&fit=crop",
    price: 58900,
    originalPrice: 68900,
    duration: "6 วัน 5 คืน",
    rating: 4.5,
    reviews: 121,
    highlights: ["โอเปร่าเฮาส์", "สะพานฮาร์เบอร์", "บลูเมาท์เท่น", "ซิดนีย์ทาวเวอร์"],
    destinations: ["ซิดนีย์", "บลูเมาท์เท่น"],
    discount: 14,
    groupSize: "2-16 คน",
    departureDate: "พ.ค. - ส.ค. 67"
  },
  {
    id: 22,
    title: "ออสเตรเลีย 7 วัน 6 คืน เมลเบิร์น-เกรทโอเชี่ยนโร้ด",
    image: "https://images.unsplash.com/photo-1514395462725-fb4566210144?w=400&h=300&fit=crop",
    price: 65900,
    originalPrice: 75900,
    duration: "7 วัน 6 คืน",
    rating: 4.7,
    reviews: 89,
    highlights: ["12 อพอสเทิล", "เกรทโอเชี่ยนโร้ด", "ฟิลลิปไอส์แลนด์", "รถไฟจักรไอน้ำ"],
    destinations: ["เมลเบิร์น", "ทอร์คเวย์", "อพอลโล เบย์"],
    discount: 13,
    groupSize: "2-14 คน",
    departureDate: "มิ.ย. - ก.ย. 67"
  },
  // ทัวร์นิวซีแลนด์เพิ่มเติม (ให้ครบ 18 ทัวร์)
  {
    id: 23,
    title: "นิวซีแลนด์ 8 วัน 7 คืน เกาะเหนือ-เกาะใต้",
    image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=400&h=300&fit=crop",
    price: 88900,
    originalPrice: 102900,
    duration: "8 วัน 7 คืน",
    rating: 4.8,
    reviews: 76,
    highlights: ["ฟยอร์ดแลนด์", "ควีนส์ทาวน์", "ธารน้ำแข็งฟรานซ์โจเซฟ", "ถ้ำหนอนเรืองแสง"],
    destinations: ["ออกแลนด์", "ควีนส์ทาวน์", "ไครสต์เชิร์ช"],
    discount: 14,
    groupSize: "2-15 คน",
    departureDate: "ก.ค. - ต.ค. 67"
  },
  {
    id: 24,
    title: "นิวซีแลนด์ 6 วัน 5 คืน เกาะเหนือ",
    image: "https://images.unsplash.com/photo-1465056836041-7f43ac27ae62?w=400&h=300&fit=crop",
    price: 72900,
    originalPrice: 82900,
    duration: "6 วัน 5 คืน",
    rating: 4.6,
    reviews: 65,
    highlights: ["โรโตรัว", "ไวโตโม่", "ฮอบบิตัน", "สกายทาวเวอร์"],
    destinations: ["ออกแลนด์", "โรโตรัว", "ไวโตโม่"],
    discount: 12,
    groupSize: "2-18 คน",
    departureDate: "ส.ค. - พ.ย. 67"
  },
  // ทัวร์แคนาดาเพิ่มเติม (ให้ครบ 15 ทัวร์)
  {
    id: 25,
    title: "แคนาดา 7 วัน 6 คืน ไนแอการา-โตรอนโต",
    image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=400&h=300&fit=crop",
    price: 89900,
    originalPrice: 102900,
    duration: "7 วัน 6 คืน",
    rating: 4.7,
    reviews: 93,
    highlights: ["ไนแอการาฟอลส์", "ซีเอ็นทาวเวอร์", "คาซาโลม่า", "ตลาดเซนต์ลอว์เรนซ์"],
    destinations: ["โตรอนโต", "ไนแอการา"],
    discount: 13,
    groupSize: "2-16 คน",
    departureDate: "ก.ย. - ธ.ค. 67"
  },
  {
    id: 26,
    title: "แคนาดา 8 วัน 7 คืน ร็อคกี้เมาท์เท่น",
    image: "https://images.unsplash.com/photo-1609825488888-3a766db05542?w=400&h=300&fit=crop",
    price: 105900,
    originalPrice: 122900,
    duration: "8 วัน 7 คืน",
    rating: 4.9,
    reviews: 67,
    highlights: ["ทะเลสาบหลุยส์", "ธารน้ำแข็งโคลัมเบีย", "แบนฟ์", "แจสเปอร์"],
    destinations: ["แคลกะรี", "แบนฟ์", "แจสเปอร์"],
    discount: 14,
    groupSize: "2-12 คน",
    departureDate: "ก.ค. - ต.ค. 67"
  },
  // เพิ่มทัวร์ญี่ปุ่นให้ครบ 45 ทัวร์
  {
    id: 27,
    title: "ญี่ปุ่น 9 วัน 8 คืน เกียวชู คุมาโมโต้-ฟุกุโอกะ",
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&h=300&fit=crop",
    price: 48900,
    originalPrice: 56900,
    duration: "9 วัน 8 คืน",
    rating: 4.8,
    reviews: 78,
    highlights: ["ปราสาทคุมาโมโต้", "ภูเขาไฟอาโซะ", "เมืองเก่าฟุกุโอกะ", "บ่อน้ำพุร้อนเบปปุ"],
    destinations: ["คุมาโมโต้", "ฟุกุโอกะ", "เบปปุ"],
    discount: 14,
    groupSize: "2-18 คน",
    departureDate: "เม.ย. - มิ.ย. 67"
  },
  {
    id: 28,
    title: "ญี่ปุ่น 6 วัน 5 คืน โยโกฮาม่า-คามาคุระ-เอโนชิม่า",
    image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400&h=300&fit=crop",
    price: 36900,
    originalPrice: 42900,
    duration: "6 วัน 5 คืน",
    rating: 4.6,
    reviews: 102,
    highlights: ["โยโกฮาม่าไชน่าทาวน์", "พระใหญ่คามาคุระ", "เกาะเอโนชิม่า", "คอสโมเวิลด์"],
    destinations: ["โยโกฮาม่า", "คามาคุระ", "เอโนชิม่า"],
    discount: 14,
    groupSize: "2-16 คน",
    departureDate: "พ.ค. - ก.ค. 67"
  },
  {
    id: 29,
    title: "ญี่ปุ่น 7 วัน 6 คืน นิกโกะ-อิคาโฮะ-อุซึโนมิยะ",
    image: "https://images.unsplash.com/photo-1578662996442-48f40103fc96?w=400&h=300&fit=crop",
    price: 44900,
    originalPrice: 52900,
    duration: "7 วัน 6 คืน",
    rating: 4.7,
    reviews: 89,
    highlights: ["ศาลเจ้าโทชogu", "น้ำตกเคกอน", "ทะเลสาบจูเซ็นจิ", "อิคาโฮะออนเซ็น"],
    destinations: ["นิกโกะ", "อิคาโฮะ"],
    discount: 15,
    groupSize: "2-14 คน",
    departureDate: "มิ.ย. - ส.ค. 67"
  },
  {
    id: 30,
    title: "ญี่ปุ่น 5 วัน 4 คืน ชิซุโอกะ-ฮะโกเน่-อะตะมิ",
    image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=300&fit=crop",
    price: 38900,
    originalPrice: 44900,
    duration: "5 วัน 4 คืน",
    rating: 4.5,
    reviews: 96,
    highlights: ["ภูเขาฟูจิ", "ทะเลสาบอาชิ", "รถกระเช้าฮะโกเน่", "บ่อน้ำพุร้อนอะตะมิ"],
    destinations: ["ชิซุโอกะ", "ฮะโกเน่", "อะตะมิ"],
    discount: 13,
    groupSize: "2-20 คน",
    departureDate: "ก.ค. - ก.ย. 67"
  },
  {
    id: 31,
    title: "ญี่ปุ่น 8 วัน 7 คืน ฮิโรชิม่า-มิยาจิม่า-โอคายาม่า",
    image: "https://images.unsplash.com/photo-1604608672516-2c1177b10c92?w=400&h=300&fit=crop",
    price: 52900,
    originalPrice: 61900,
    duration: "8 วัน 7 คืน",
    rating: 4.8,
    reviews: 74,
    highlights: ["อนุสรณ์สถานสันติภาพ", "เกาะมิยาจิม่า", "ปราสาทโอคายาม่า", "สวนโคราคุเอ็น"],
    destinations: ["ฮิโรชิม่า", "มิยาจิม่า", "โอคายาม่า"],
    discount: 15,
    groupSize: "2-16 คน",
    departureDate: "ส.ค. - ต.ค. 67"
  },
  {
    id: 32,
    title: "ญี่ปุ่น 4 วัน 3 คืน นาโกย่า-อินุยาม่า",
    image: "https://images.unsplash.com/photo-1565021993-2faea7a8113b?w=400&h=300&fit=crop",
    price: 31900,
    originalPrice: 36900,
    duration: "4 วัน 3 คืน",
    rating: 4.6,
    reviews: 108,
    highlights: ["ปราสาทนาโกย่า", "หมู่บ้านเมจิมูระ", "ปราสาทอินุยาม่า", "ตลาดโอสุคันนง"],
    destinations: ["นาโกย่า", "อินุยาม่า"],
    discount: 14,
    groupSize: "2-18 คน",
    departureDate: "ก.ย. - พ.ย. 67"
  },
  {
    id: 33,
    title: "ญี่ปุ่น 10 วัน 9 คืน ทัวร์ครบครัน 4 เกาะ",
    image: "https://images.unsplash.com/photo-1544616333-fb43e5df8b0b?w=400&h=300&fit=crop",
    price: 89900,
    originalPrice: 105900,
    duration: "10 วัน 9 คืน",
    rating: 4.9,
    reviews: 156,
    highlights: ["โตเกียว", "โอซาก้า", "ฮิโรชิม่า", "ซัปโปโร"],
    destinations: ["โตเกียว", "โอซาก้า", "ฮิโรชิม่า", "ซัปโปโร"],
    discount: 15,
    groupSize: "2-20 คน",
    departureDate: "ต.ค. - ธ.ค. 67"
  },
  {
    id: 34,
    title: "ญี่ปุ่น 6 วัน 5 คืน ซากุระเทศกาล",
    image: "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=400&h=300&fit=crop",
    price: 65900,
    originalPrice: 78900,
    duration: "6 วัน 5 คืน",
    rating: 4.8,
    reviews: 198,
    highlights: ["ซากุระอุเอโนะ", "ซากุระยะมะนาชิ", "ซากุระอะริเคลดะ", "ซากุระโยะชิโนะ"],
    destinations: ["โตเกียว", "นารา", "ยะมะนาชิ"],
    discount: 16,
    groupSize: "2-25 คน",
    departureDate: "เม.ย. - พ.ค. 67"
  },
  {
    id: 35,
    title: "ญี่ปุ่น 7 วัน 6 คืน เมจิอุทยาน",
    image: "https://images.unsplash.com/photo-1546195646-8875000d89b1?w=400&h=300&fit=crop",
    price: 49900,
    originalPrice: 58900,
    duration: "7 วัน 6 คืน",
    rating: 4.7,
    reviews: 123,
    highlights: ["เมจิอุทยาน", "นิกโกะ", "หมู่บ้านมุรดกโลก", "บ่อน้ำพุร้อนยุโมโตะ"],
    destinations: ["นิกโกะ", "ชิราคาวาโกะ"],
    discount: 15,
    groupSize: "2-16 คน",
    departureDate: "พ.ย. - ม.ค. 68"
  },
  {
    id: 36,
    title: "ญี่ปุ่น 5 วัน 4 คืน ใบไม้เปลี่ยนสี",
    image: "https://images.unsplash.com/photo-1556909114-7ea2b3e5b65f?w=400&h=300&fit=crop",
    price: 54900,
    originalPrice: 64900,
    duration: "5 วัน 4 คืน",
    rating: 4.9,
    reviews: 167,
    highlights: ["ใบไม้แดงเกียวโต", "ใบไม้แดงนิกโกะ", "ใบไม้แดงฟูจิ", "ใบไม้แดงทาคายาม่า"],
    destinations: ["เกียวโต", "นิกโกะ", "ทาคายาม่า"],
    discount: 15,
    groupSize: "2-20 คน",
    departureDate: "พ.ย. - ธ.ค. 67"
  },
  {
    id: 37,
    title: "ญี่ปุ่น 3 วัน 2 คืน เที่ยวสั้น โตเกียว",
    image: "https://images.unsplash.com/photo-1551688709-94e38c67ee51?w=400&h=300&fit=crop",
    price: 22900,
    originalPrice: 26900,
    duration: "3 วัน 2 คืน",
    rating: 4.4,
    reviews: 89,
    highlights: ["สกายทรี", "อาซากุสะ", "โตเกียวสถานี", "กินซ่า"],
    destinations: ["โตเกียว"],
    discount: 15,
    groupSize: "2-12 คน",
    departureDate: "ทุกเดือน"
  },
  {
    id: 38,
    title: "ญี่ปุ่น 11 วัน 10 คืน มิชลินไกด์",
    image: "https://images.unsplash.com/photo-1570197596781-8a33b7d4e5e5?w=400&h=300&fit=crop",
    price: 128900,
    originalPrice: 149900,
    duration: "11 วัน 10 คืน",
    rating: 4.9,
    reviews: 245,
    highlights: ["ร้านมิชลิน 3 ดาว", "ร้านซูชิท็อปเท็น", "ร้านราเมนระดับมาสเตอร์", "ร้านเทมปุระชื่อดัง"],
    destinations: ["โตเกียว", "เกียวโต", "โอซาก้า"],
    discount: 14,
    groupSize: "2-8 คน",
    departureDate: "ธ.ค. - ก.พ. 68"
  },
  {
    id: 39,
    title: "ญี่ปุ่น 4 วัน 3 คืน ออนเซ็นทัวร์",
    image: "https://images.unsplash.com/photo-1583559721611-60d3c6ee3811?w=400&h=300&fit=crop",
    price: 42900,
    originalPrice: 49900,
    duration: "4 วัน 3 คืน",
    rating: 4.8,
    reviews: 134,
    highlights: ["บ่อน้ำพุร้อนฮะโกเน่", "บ่อน้ำพุร้อนอะตะมิ", "บ่อน้ำพุร้อนอิคาโฮะ", "โรงแรมริวคัง"],
    destinations: ["ฮะโกเน่", "อะตะมิ", "อิคาโฮะ"],
    discount: 14,
    groupSize: "2-16 คน",
    departureDate: "ม.ค. - มี.ค. 67"
  },
  {
    id: 40,
    title: "ญี่ปุ่น 6 วัน 5 คืน เฟสติวัลหิมะ",
    image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=300&fit=crop",
    price: 58900,
    originalPrice: 68900,
    duration: "6 วัน 5 คืน",
    rating: 4.7,
    reviews: 178,
    highlights: ["เทศกาลหิมะซัปโปโร", "ประติมากรรมน้ำแข็ง", "หิมะโมนกี้", "สกีรีสอร์ท"],
    destinations: ["ซัปโปโร", "โอตารุ", "นิเซโกะ"],
    discount: 14,
    groupSize: "2-20 คน",
    departureDate: "ก.พ. - มี.ค. 67"
  },
  {
    id: 41,
    title: "ญี่ปุ่น 8 วัน 7 คืน อนิเมะ & มังงะ",
    image: "https://images.unsplash.com/photo-1578662996442-48f40103fc96?w=400&h=300&fit=crop",
    price: 62900,
    originalPrice: 72900,
    duration: "8 วัน 7 คืน",
    rating: 4.6,
    reviews: 156,
    highlights: ["สตูดิโอจิบลิ", "โตเกียวอนิเมะเซ็นเตอร์", "อะกิฮาบาระ", "หุ่นกันดั้มไซส์จริง"],
    destinations: ["โตเกียว", "โอซาก้า", "เกียวโต"],
    discount: 14,
    groupSize: "2-18 คน",
    departureDate: "มี.ค. - พ.ค. 67"
  },
  // เพิ่มทัวร์ญี่ปุ่นให้ครบ 45 ทัวร์ (ต่อ)
  {
    id: 42,
    title: "ญี่ปุ่น 5 วัน 4 คืน มัตสึยาม่า-ฮิเมจิ",
    image: "https://images.unsplash.com/photo-1542640244-4d4b31b6cf30?w=400&h=300&fit=crop",
    price: 41900,
    originalPrice: 48900,
    duration: "5 วัน 4 คืน",
    rating: 4.7,
    reviews: 92,
    highlights: ["ปราสาทฮิเมจิ", "มัตสึยาม่าคาสเซิล", "โดโกะออนเซ็น", "สวนริทสึรินคุโอ"],
    destinations: ["มัตสึยาม่า", "ฮิเมจิ"],
    discount: 14,
    groupSize: "2-16 คน",
    departureDate: "มิ.ย. - ส.ค. 67"
  },
  {
    id: 43,
    title: "ญี่ปุ่น 6 วัน 5 คืน คานาซาว่า-ฟุกุอิ",
    image: "https://images.unsplash.com/photo-1551524164-687a55dd1126?w=400&h=300&fit=crop",
    price: 43900,
    originalPrice: 51900,
    duration: "6 วัน 5 คืน",
    rating: 4.6,
    reviews: 85,
    highlights: ["สวนเคนโรคุเอ็น", "วัดเอโหะจิ", "ยามาชิโระออนเซ็น", "หอไดโซฟุซึ"],
    destinations: ["คานาซาว่า", "ฟุกุอิ"],
    discount: 15,
    groupSize: "2-14 คน",
    departureDate: "ก.ย. - พ.ย. 67"
  },
  {
    id: 44,
    title: "ญี่ปุ่น 4 วัน 3 คืน อะโอโมริ-ฮาโคดาเต้",
    image: "https://images.unsplash.com/photo-1580625142932-7c2bd789eae3?w=400&h=300&fit=crop",
    price: 35900,
    originalPrice: 41900,
    duration: "4 วัน 3 คืน",
    rating: 4.5,
    reviews: 76,
    highlights: ["เซโรกะ-โคเก็น", "ฮาโคดาเต้มอร์นิ่งมาร์เก็ต", "โมอิไดสัน", "เทพีดาเบียร์"],
    destinations: ["อะโอโมริ", "ฮาโคดาเต้"],
    discount: 14,
    groupSize: "2-18 คน",
    departureDate: "เม.ย. - มิ.ย. 67"
  },
  {
    id: 45,
    title: "ญี่ปุ่น 7 วัน 6 คืน โอกินาวา-อิชิงากิ",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
    price: 52900,
    originalPrice: 62900,
    duration: "7 วัน 6 คืน",
    rating: 4.8,
    reviews: 134,
    highlights: ["ชุไรโจ", "หาดเอเมรัลด์", "เกาะอิชิงากิ", "ดำน้ำดูปะการัง"],
    destinations: ["โอกินาวา", "อิชิงากิ"],
    discount: 16,
    groupSize: "2-20 คน",
    departureDate: "ก.ค. - ก.ย. 67"
  },
  {
    id: 46,
    title: "ญี่ปุ่น 8 วัน 7 คืน คิโนะซากิ-อิวามิ",
    image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=300&fit=crop",
    price: 47900,
    originalPrice: 55900,
    duration: "8 วัน 7 คืน",
    rating: 4.7,
    reviews: 98,
    highlights: ["คิโนะซากิออนเซ็น", "อิวามิกินซาน", "ทอตโตะ", "มัตสึเอะ"],
    destinations: ["คิโนะซากิ", "อิวามิ"],
    discount: 14,
    groupSize: "2-16 คน",
    departureDate: "ต.ค. - ธ.ค. 67"
  },
  {
    id: 47,
    title: "ญี่ปุ่น 5 วัน 4 คืน ฟุกุชิม่า-เซนได",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    price: 39900,
    originalPrice: 46900,
    duration: "5 วัน 4 คืน",
    rating: 4.6,
    reviews: 87,
    highlights: ["เซนไดคาสเซิล", "มัตสึชิม่า", "บันไดออนเซ็น", "อินาวาชิโระคาสเซิล"],
    destinations: ["ฟุกุชิม่า", "เซนได"],
    discount: 15,
    groupSize: "2-18 คน",
    departureDate: "พ.ค. - ก.ค. 67"
  },
  {
    id: 48,
    title: "ญี่ปุ่น 6 วัน 5 คืน ยามางะตะ-นิงาตะ",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop",
    price: 44900,
    originalPrice: 52900,
    duration: "6 วัน 5 คืน",
    rating: 4.7,
    reviews: 93,
    highlights: ["ยามาเดระ", "เซคาไค", "ยุซาว่าออนเซ็น", "ทุ่งข้าวเทอเรซ"],
    destinations: ["ยามางะตะ", "นิงาตะ"],
    discount: 15,
    groupSize: "2-16 คน",
    departureDate: "ส.ค. - ต.ค. 67"
  },
  {
    id: 49,
    title: "ญี่ปุ่น 4 วัน 3 คืน อิบาระกิ-ชิบะ",
    image: "https://images.unsplash.com/photo-1569163139394-de4798e9a8c0?w=400&h=300&fit=crop",
    price: 32900,
    originalPrice: 38900,
    duration: "4 วัน 3 คืน",
    rating: 4.5,
    reviews: 68,
    highlights: ["สวนฮิตาชิ", "ชิบะพีนัทฟาร์ม", "อิบาระกิกอล์ฟ", "นาริตะสนามบิน"],
    destinations: ["อิบาระกิ", "ชิบะ"],
    discount: 15,
    groupSize: "2-20 คน",
    departureDate: "เม.ย. - มิ.ย. 67"
  },
  {
    id: 50,
    title: "ญี่ปุ่น 9 วัน 8 คืน โทโฮคุ 6 จังหวัด",
    image: "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=400&h=300&fit=crop",
    price: 68900,
    originalPrice: 79900,
    duration: "9 วัน 8 คืน",
    rating: 4.8,
    reviews: 112,
    highlights: ["โทโฮคุ", "อะกิตะ", "อิวาเตะ", "ยามางะตะ"],
    destinations: ["เซนได", "อะกิตะ", "อิวาเตะ"],
    discount: 14,
    groupSize: "2-18 คน",
    departureDate: "ก.ย. - พ.ย. 67"
  },
  {
    id: 51,
    title: "ญี่ปุ่น 3 วัน 2 คืน คิวชู เอกซ์เพรส",
    image: "https://images.unsplash.com/photo-1590766940554-634a7ed41d69?w=400&h=300&fit=crop",
    price: 29900,
    originalPrice: 34900,
    duration: "3 วัน 2 คืน",
    rating: 4.4,
    reviews: 54,
    highlights: ["ฟุกุโอกะทาวเวอร์", "คุมาโมโต้คาสเซิล", "นางาซากิ", "อิบุสุกิ"],
    destinations: ["ฟุกุโอกะ", "คุมาโมโต้"],
    discount: 14,
    groupSize: "2-12 คน",
    departureDate: "ทุกเดือน"
  },
  {
    id: 52,
    title: "ญี่ปุ่น 5 วัน 4 คืน กุนม่า-นางาโนะ",
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&h=300&fit=crop",
    price: 41900,
    originalPrice: 48900,
    duration: "5 วัน 4 คืน",
    rating: 4.6,
    reviews: 79,
    highlights: ["คุซาสึออนเซ็น", "มัตสึโมโตะคาสเซิล", "คามิโคชิ", "ไคดุกาว่า"],
    destinations: ["กุนม่า", "นางาโนะ"],
    discount: 14,
    groupSize: "2-16 คน",
    departureDate: "มิ.ย. - ส.ค. 67"
  },
  {
    id: 53,
    title: "ญี่ปุ่น 6 วัน 5 คืน โอกายาม่า-ฮิโรชิม่า",
    image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400&h=300&fit=crop",
    price: 46900,
    originalPrice: 54900,
    duration: "6 วัน 5 คืน",
    rating: 4.7,
    reviews: 103,
    highlights: ["โอกายาม่าคาสเซิล", "คุราชิกิ", "ฮิโรชิม่าพีซ", "มิยาจิม่าเกต"],
    destinations: ["โอกายาม่า", "ฮิโรชิม่า"],
    discount: 15,
    groupSize: "2-18 คน",
    departureDate: "ก.ย. - พ.ย. 67"
  },
  {
    id: 54,
    title: "ญี่ปุ่น 4 วัน 3 คืน ทิโซจิแลนด์ & ฟูจิคิว",
    image: "https://images.unsplash.com/photo-1551688709-94e38c67ee51?w=400&h=300&fit=crop",
    price: 34900,
    originalPrice: 40900,
    duration: "4 วัน 3 คืน",
    rating: 4.5,
    reviews: 89,
    highlights: ["ทิโซจิแลนด์", "ฟูจิคิวไฮแลนด์", "ภูเขาฟูจิ", "ทะเลสาบคาวากุชิ"],
    destinations: ["โตเกียว", "ยามานาชิ"],
    discount: 15,
    groupSize: "2-20 คน",
    departureDate: "ก.ค. - ก.ย. 67"
  },
  {
    id: 55,
    title: "ญี่ปุ่น 7 วัน 6 คืน ชูโกกุ 5 จังหวัด",
    image: "https://images.unsplash.com/photo-1604608672516-2c1177b10c92?w=400&h=300&fit=crop",
    price: 55900,
    originalPrice: 65900,
    duration: "7 วัน 6 คืน",
    rating: 4.8,
    reviews: 127,
    highlights: ["ทอตโตะ", "ชิมาเนะ", "โอกายาม่า", "ฮิโรชิม่า"],
    destinations: ["ทอตโตะ", "ชิมาเนะ", "โอกายาม่า"],
    discount: 15,
    groupSize: "2-16 คน",
    departureDate: "ต.ค. - ธ.ค. 67"
  },
  {
    id: 56,
    title: "ญี่ปุ่น 5 วัน 4 คืน ชิโกกุ 4 จังหวัด",
    image: "https://images.unsplash.com/photo-1583559721611-60d3c6ee3811?w=400&h=300&fit=crop",
    price: 43900,
    originalPrice: 51900,
    duration: "5 วัน 4 คืน",
    rating: 4.7,
    reviews: 95,
    highlights: ["คางาว่า", "เอฮิเมะ", "โคชิ", "โตกุชิม่า"],
    destinations: ["ทาคามัตสึ", "มัตสึยาม่า", "โคชิ"],
    discount: 15,
    groupSize: "2-18 คน",
    departureDate: "พ.ค. - ก.ค. 67"
  },
  {
    id: 57,
    title: "ญี่ปุ่น 8 วัน 7 คืน จูบุ 9 จังหวัด",
    image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=300&fit=crop",
    price: 64900,
    originalPrice: 75900,
    duration: "8 วัน 7 คืน",
    rating: 4.8,
    reviews: 143,
    highlights: ["นางาโนะ", "ยามานาชิ", "ชิซุโอกะ", "ไอชิ"],
    destinations: ["นาโกย่า", "มัตสึโมโตะ", "ชิซุโอกะ"],
    discount: 14,
    groupSize: "2-20 คน",
    departureDate: "ส.ค. - ต.ค. 67"
  },
  {
    id: 58,
    title: "ญี่ปุ่น 6 วัน 5 คืน คันโต 7 จังหวัด",
    image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=300&fit=crop",
    price: 49900,
    originalPrice: 58900,
    duration: "6 วัน 5 คืน",
    rating: 4.7,
    reviews: 118,
    highlights: ["โตเกียว", "คานางาว่า", "ไซตามะ", "ชิบะ"],
    destinations: ["โตเกียว", "โยโกฮาม่า", "ชิบะ"],
    discount: 15,
    groupSize: "2-25 คน",
    departureDate: "ทุกเดือน"
  },
  {
    id: 59,
    title: "ญี่ปุ่น 4 วัน 3 คืน คันไซ เอกซ์เพรส",
    image: "https://images.unsplash.com/photo-1556909114-7ea2b3e5b65f?w=400&h=300&fit=crop",
    price: 36900,
    originalPrice: 43900,
    duration: "4 วัน 3 คืน",
    rating: 4.6,
    reviews: 102,
    highlights: ["โอซาก้า", "เกียวโต", "นารา", "วากายาม่า"],
    destinations: ["โอซาก้า", "เกียวโต", "นารา"],
    discount: 16,
    groupSize: "2-22 คน",
    departureDate: "ทุกเดือน"
  },
  {
    id: 60,
    title: "ญี่ปุ่น 10 วัน 9 คืน ทัวร์มาสเตอร์พีช",
    image: "https://images.unsplash.com/photo-1570197596781-8a33b7d4e5e5?w=400&h=300&fit=crop",
    price: 99900,
    originalPrice: 119900,
    duration: "10 วัน 9 คืน",
    rating: 4.9,
    reviews: 189,
    highlights: ["47 จังหวัด", "ทุกภาค", "ประสบการณ์ครบครัน", "ไกด์เซียน"],
    destinations: ["โตเกียว", "โอซาก้า", "ซัปโปโร", "ฟุกุโอกะ"],
    discount: 17,
    groupSize: "2-15 คน",
    departureDate: "ม.ค. - ธ.ค. 67"
  },
  {
    id: 61,
    title: "ญี่ปุ่น 3 วัน 2 คืน ฮันามิ พิเศษ",
    image: "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=400&h=300&fit=crop",
    price: 42900,
    originalPrice: 49900,
    duration: "3 วัน 2 คืน",
    rating: 4.8,
    reviews: 167,
    highlights: ["ซากุระยามานาชิ", "ฮานามิอุเอโนะ", "ซากุระเมกุโระ", "พิกนิกใต้ซากุระ"],
    destinations: ["โตเกียว", "ยามานาชิ"],
    discount: 14,
    groupSize: "2-30 คน",
    departureDate: "เม.ย. - พ.ค. 67"
  },
  {
    id: 62,
    title: "ญี่ปุ่น 7 วัน 6 คืน คันซาย เฟสติวัล",
    image: "https://images.unsplash.com/photo-1546195646-8875000d89b1?w=400&h=300&fit=crop",
    price: 53900,
    originalPrice: 63900,
    duration: "7 วัน 6 คืน",
    rating: 4.7,
    reviews: 134,
    highlights: ["กิออนมัตสึริ", "เทนจินมัตสึริ", "คิชิมิอินาริ", "อาราชิยาม่า"],
    destinations: ["โอซาก้า", "เกียวโต", "นารา"],
    discount: 16,
    groupSize: "2-24 คน",
    departureDate: "ก.ค. - ส.ค. 67"
  },
  {
    id: 63,
    title: "ญี่ปุ่น 5 วัน 4 คืน เจเออาร์พาส พิเศษ",
    image: "https://images.unsplash.com/photo-1544616333-fb43e5df8b0b?w=400&h=300&fit=crop",
    price: 45900,
    originalPrice: 53900,
    duration: "5 วัน 4 คืน",
    rating: 4.6,
    reviews: 98,
    highlights: ["เจเออาร์พาส", "ชินคันเซน", "เที่ยวฟรีสไตล์", "ไม่มีไกด์"],
    destinations: ["โตเกียว", "โอซาก้า"],
    discount: 15,
    groupSize: "2-8 คน",
    departureDate: "ทุกเดือน"
  },
  {
    id: 64,  
    title: "ญี่ปุ่น 6 วัน 5 คืน รูโทปิเซียลทัวร์",
    image: "https://images.unsplash.com/photo-1565021993-2faea7a8113b?w=400&h=300&fit=crop",
    price: 67900,
    originalPrice: 79900,
    duration: "6 วัน 5 คืน",
    rating: 4.9,
    reviews: 201,
    highlights: ["ทัวร์พรีเมียม", "โรงแรม 5 ดาว", "อาหารหรู", "บริการพิเศษ"],
    destinations: ["โตเกียว", "เกียวโต"],
    discount: 15,
    groupSize: "2-12 คน",  
    departureDate: "ก.พ. - เม.ย. 67"
  },
  {
    id: 65,
    title: "ญี่ปุ่น 4 วัน 3 คืน สุดคุ้ม โปรฯพิเศษ",
    image: "https://images.unsplash.com/photo-1542640244-4d4b31b6cf30?w=400&h=300&fit=crop",
    price: 19900,
    originalPrice: 29900,
    duration: "4 วัน 3 คืน",
    rating: 4.3,
    reviews: 156,
    highlights: ["ราคาพิเศษ", "โปรโมชั่น", "คุ้มสุดๆ", "จองด่วน"],
    destinations: ["โตเกียว"],
    discount: 33,
    groupSize: "2-40 คน",
    departureDate: "ทุกเดือน"
  }
]

// ประเทศทั้งหมดพร้อมธงชาติ - เรียงตามตัวอักษร ก-ฮ
const allCountries = [
  { name: "กรีซ", tours: 18, flagCode: "gr" },
  { name: "กรีนแลนด์", tours: 4, flagCode: "gl" },
  { name: "กัมพูชา", tours: 12, flagCode: "kh" },
  { name: "คาซัคสถาน", tours: 8, flagCode: "kz" },
  { name: "จอร์แดน", tours: 15, flagCode: "jo" },
  { name: "จอร์เจีย", tours: 10, flagCode: "ge" },
  { name: "จีน", tours: 28, flagCode: "cn" },
  { name: "ชิลี", tours: 11, flagCode: "cl" },
  { name: "ญี่ปุ่น", tours: 45, flagCode: "jp" },
  { name: "ตุรกี", tours: 20, flagCode: "tr" },
  { name: "ตูนีเซีย", tours: 8, flagCode: "tn" },
  { name: "นอร์เวย์", tours: 15, flagCode: "no" },
  { name: "นิวซีแลนด์", tours: 18, flagCode: "nz" },
  { name: "บราซิล", tours: 16, flagCode: "br" },
  { name: "บรูไน", tours: 6, flagCode: "bn" },
  { name: "บัลแกเรีย", tours: 8, flagCode: "bg" },
  { name: "บาห์เรน", tours: 7, flagCode: "bh" },
  { name: "ปานามา", tours: 7, flagCode: "pa" },
  { name: "ฝรั่งเศส", tours: 25, flagCode: "fr" },
  { name: "พม่า", tours: 10, flagCode: "mm" },
  { name: "ฟิลิปปินส์", tours: 18, flagCode: "ph" },
  { name: "ฟินแลนด์", tours: 12, flagCode: "fi" },
  { name: "ภูฏาน", tours: 5, flagCode: "bt" },
  { name: "มองโกเลีย", tours: 9, flagCode: "mn" },
  { name: "มัลดีฟส์", tours: 14, flagCode: "mv" },
  { name: "มาเก๊า", tours: 8, flagCode: "mo" },
  { name: "มาเลเซีย", tours: 22, flagCode: "my" },
  { name: "มอนเตเนโกร", tours: 7, flagCode: "me" },
  { name: "ยุโรป", tours: 35, flagCode: "eu" },
  { name: "ยูกันดา", tours: 6, flagCode: "ug" },
  { name: "รวันดา", tours: 5, flagCode: "rw" },
  { name: "รัสเซีย", tours: 16, flagCode: "ru" },
  { name: "ลาว", tours: 11, flagCode: "la" },
  { name: "ลัตเวีย", tours: 6, flagCode: "lv" },
  { name: "ลิทัวเนีย", tours: 6, flagCode: "lt" },
  { name: "วานูอาตู", tours: 4, flagCode: "vu" },
  { name: "ศรีลังกา", tours: 13, flagCode: "lk" },
  { name: "สกอตแลนด์", tours: 11, flagCode: "gb-sct" },
  { name: "สวิตเซอร์แลนด์", tours: 19, flagCode: "ch" },
  { name: "สวีเดน", tours: 14, flagCode: "se" },
  { name: "สหรัฐอเมริกา", tours: 30, flagCode: "us" },
  { name: "สหรัฐอาหรับเอมิเรตส์", tours: 16, flagCode: "ae" },
  { name: "สาธารณรัฐโครเอเชีย", tours: 13, flagCode: "hr" },
  { name: "สิงคโปร์", tours: 19, flagCode: "sg" },
  { name: "สเปน", tours: 22, flagCode: "es" },
  { name: "สโลวาเกีย", tours: 8, flagCode: "sk" },
  { name: "สโลวีเนีย", tours: 7, flagCode: "si" },
  { name: "ออสเตรเลีย", tours: 23, flagCode: "au" },
  { name: "ออสเตรีย", tours: 16, flagCode: "at" },
  { name: "อังกฤษ", tours: 28, flagCode: "gb-eng" },
  { name: "อาเซอร์ไบจาน", tours: 7, flagCode: "az" },
  { name: "อาร์เจนตินา", tours: 12, flagCode: "ar" },
  { name: "อิตาลี", tours: 24, flagCode: "it" },
  { name: "อิสราเอล", tours: 12, flagCode: "il" },
  { name: "อิหร่าน", tours: 9, flagCode: "ir" },
  { name: "อียิปต์", tours: 14, flagCode: "eg" },
  { name: "อินเดีย", tours: 25, flagCode: "in" },
  { name: "อินโดนีเซีย", tours: 21, flagCode: "id" },
  { name: "เกาหลีใต้", tours: 32, flagCode: "kr" },
  { name: "เซเชลส์", tours: 8, flagCode: "sc" },
  { name: "เซอร์เบีย", tours: 9, flagCode: "rs" },
  { name: "เช็ก", tours: 15, flagCode: "cz" },
  { name: "เดนมาร์ก", tours: 13, flagCode: "dk" },
  { name: "เนปาล", tours: 11, flagCode: "np" },
  { name: "เนเธอร์แลนด์", tours: 17, flagCode: "nl" },
  { name: "เบลเยียม", tours: 14, flagCode: "be" },
  { name: "เปรู", tours: 10, flagCode: "pe" },
  { name: "เวลส์", tours: 8, flagCode: "gb-wls" },
  { name: "เวียดนาม", tours: 24, flagCode: "vn" },
  { name: "เยอรมัน", tours: 26, flagCode: "de" },
  { name: "เอกวาดอร์", tours: 9, flagCode: "ec" },
  { name: "เอสโตเนีย", tours: 6, flagCode: "ee" },
  { name: "แคนาดา", tours: 15, flagCode: "ca" },
  { name: "แอฟริกาใต้", tours: 13, flagCode: "za" },
  { name: "แอลจีเรีย", tours: 7, flagCode: "dz" },
  { name: "โปรตุเกส", tours: 16, flagCode: "pt" },
  { name: "โปแลนด์", tours: 18, flagCode: "pl" },
  { name: "โมร็อคโค", tours: 12, flagCode: "ma" },
  { name: "โรมาเนีย", tours: 11, flagCode: "ro" },
  { name: "ไซปรัส", tours: 9, flagCode: "cy" },
  { name: "ไต้หวัน", tours: 22, flagCode: "tw" },
  { name: "ไทย", tours: 35, flagCode: "th" },
  { name: "ไอซ์แลนด์", tours: 12, flagCode: "is" },
  { name: "ไอร์แลนด์", tours: 14, flagCode: "ie" },
  { name: "ฮ่องกง", tours: 17, flagCode: "hk" },
  { name: "ฮังการี", tours: 12, flagCode: "hu" }
].sort((a, b) => a.name.localeCompare(b.name, 'th'))

// เวอร์ชันใหม่ - แบ่งเป็น 2 ทวีป พร้อม SVG flags
const destinationsByRegion = {
  asia: [
    { name: "ทัวร์ญี่ปุ่น", tours: 45, flagCode: "jp", landmark: "ภูเขาฟูจิ" },
    { name: "ทัวร์เกาหลีใต้", tours: 32, flagCode: "kr", landmark: "พระราชวัง" },
    { name: "ทัวร์จีน", tours: 28, flagCode: "cn", landmark: "กำแพงเมือง" },
    { name: "ทัวร์ไต้หวัน", tours: 22, flagCode: "tw", landmark: "อาลีซาน" }
  ],
  international: [
    { name: "ทัวร์ยุโรป", tours: 35, flagCode: "eu", landmark: "หอไอเฟล" },
    { name: "ทัวร์ออสเตรเลีย", tours: 23, flagCode: "au", landmark: "ซิดนี่ย์" },
    { name: "ทัวร์นิวซีแลนด์", tours: 18, flagCode: "nz", landmark: "เทือกเขา" },
    { name: "ทัวร์แคนาดา", tours: 15, flagCode: "ca", landmark: "ใบเมเปิล" }
  ]
}

const popularDestinations = allCountries

export default function TourSearch10() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDestination, setSelectedDestination] = useState('')
  const [selectedBudget, setSelectedBudget] = useState('')
  const [selectedDuration, setSelectedDuration] = useState('')
  const [sortBy, setSortBy] = useState('popular')
  const [showSearch, setShowSearch] = useState(false)
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedTab, setSelectedTab] = useState<'asia' | 'europe' | null>('asia')
  const [selectedTourType, setSelectedTourType] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [displayedTours, setDisplayedTours] = useState<typeof mockTours>([])
  const [hasMore, setHasMore] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const sortDropdownRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<HTMLDivElement>(null)

  const TOURS_PER_PAGE = 20

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target as Node)) {
        setShowSortDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const filteredTours = useMemo(() => {
    return mockTours.filter(tour => {
      const matchesSearch = tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           tour.destinations.some(dest => dest.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesDestination = !selectedDestination || 
                                tour.destinations.some(dest => dest.includes(selectedDestination)) ||
                                tour.title.includes(selectedDestination) ||
                                (selectedDestination.includes('ญี่ปุ่น') && tour.title.includes('ญี่ปุ่น')) ||
                                (selectedDestination.includes('เกาหลี') && tour.title.includes('เกาหลีใต้')) ||
                                (selectedDestination.includes('จีน') && tour.title.includes('จีน')) ||
                                (selectedDestination.includes('ไต้หวัน') && tour.title.includes('ไต้หวัน')) ||
                                (selectedDestination.includes('ยุโรป') && tour.title.includes('ยุโรป')) ||
                                (selectedDestination.includes('ออสเตรเลีย') && tour.title.includes('ออสเตรเลีย')) ||
                                (selectedDestination.includes('นิวซีแลนด์') && tour.title.includes('นิวซีแลนด์')) ||
                                (selectedDestination.includes('แคนาดา') && tour.title.includes('แคนาดา'))
      const matchesBudget = !selectedBudget || 
                           (selectedBudget === '30000' && tour.price <= 30000) ||
                           (selectedBudget === '50000' && tour.price <= 50000) ||
                           (selectedBudget === '100000' && tour.price <= 100000) ||
                           (selectedBudget === 'promotion' && tour.discount > 10)
      const matchesDuration = !selectedDuration ||
                             (selectedDuration === 'short' && parseInt(tour.duration) <= 5) ||
                             (selectedDuration === 'medium' && parseInt(tour.duration) >= 6 && parseInt(tour.duration) <= 8) ||
                             (selectedDuration === 'long' && parseInt(tour.duration) >= 9 && parseInt(tour.duration) <= 12) ||
                             (selectedDuration === 'extended' && parseInt(tour.duration) >= 14)
      
      return matchesSearch && matchesDestination && matchesBudget && matchesDuration
    })
  }, [searchQuery, selectedDestination, selectedBudget, selectedDuration, selectedTourType])

  const sortedTours = useMemo(() => {
    return [...filteredTours].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        default:
          return b.reviews - a.reviews
      }
    })
  }, [filteredTours, sortBy])

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1)
    setDisplayedTours([])
    setHasMore(true)
  }, [searchQuery, selectedDestination, selectedBudget, selectedDuration, selectedTourType, sortBy])

  // Load initial tours and handle pagination
  useEffect(() => {
    const startIndex = 0
    const endIndex = currentPage * TOURS_PER_PAGE
    const toursToShow = sortedTours.slice(startIndex, endIndex)
    
    setDisplayedTours(toursToShow)
    setHasMore(endIndex < sortedTours.length)
  }, [currentPage, searchQuery, selectedDestination, selectedBudget, selectedDuration, selectedTourType, sortBy])

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          setLoadingMore(true)
          setTimeout(() => {
            setCurrentPage(prev => prev + 1)
            setLoadingMore(false)
          }, 500)
        }
      },
      { threshold: 0.1 }
    )

    if (observerRef.current) {
      observer.observe(observerRef.current)
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current)
      }
    }
  }, [hasMore, loadingMore])

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
      }, 500)
    }
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedDestination('')
    setSelectedBudget('')
    setSelectedDuration('')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Filter Sections - Not Sticky */}
      <div className="lg:hidden bg-white shadow-md">
        {/* Mobile Header */}
        <div className="px-4 py-3 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">ทัวร์ต่างประเทศ</h1>
            <button
              onClick={() => setShowSearch(true)}
              className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Popular Destinations Section - Vertical Tabs Style */}
        <div className="px-4 py-3">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-sm font-semibold text-gray-700">🌏 ประเทศยอดนิยม</span>
          </div>
          
          {/* Tab Navigation */}
          <div className="mb-2">
            <div className="flex items-center bg-gradient-to-r from-gray-100 to-gray-50 rounded-lg p-1 mb-3 shadow-inner">
              <button
                onClick={() => setSelectedTab('asia')}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-md transition-all duration-200 relative ${
                  selectedTab === 'asia'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-md'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
                }`}
              >
                <AsiaIcon className="w-5 h-5" />
                <span className="text-base">ทัวร์เอเชีย</span>
              </button>
              
              {/* Vertical Divider */}
              <div className="w-px h-8 bg-gray-200"></div>
              
              <button
                onClick={() => setSelectedTab('europe')}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-md transition-all duration-200 relative ${
                  selectedTab === 'europe'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-md'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
                }`}
              >
                <EuropeIcon className="w-5 h-5" />
                <span className="text-base">ทัวร์ยุโรป</span>
              </button>
            </div>

            {/* Tab Content */}
            {selectedTab && (
              <div className="animate-in slide-in-from-top-2 duration-200">
                <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
                  {(selectedTab === 'asia' ? destinationsByRegion.asia : destinationsByRegion.international).map((dest, index) => (
                    <button
                      key={`${selectedTab}-${index}`}
                      onClick={() => setSelectedDestination(dest.name === selectedDestination ? '' : dest.name)}
                      className={`flex-shrink-0 flex items-center gap-3 px-4 py-3 rounded-lg border transition-all duration-200 ${
                        selectedDestination === dest.name
                          ? 'border-blue-300 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 shadow-sm'
                          : 'border-gray-200 bg-white text-gray-800 hover:border-gray-300 hover:shadow-sm'
                      }`}
                    >
                      <div className="w-[32px] h-[32px] rounded-full border-2 border-blue-200 p-0.5 bg-white">
                        <Image 
                          src={`/icons/destinations/flag-icons-main/flags/1x1/${dest.flagCode}.svg`}
                          alt={`${dest.name} flag`}
                          width={28}
                          height={28}
                          className="rounded-full w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="text-sm font-medium leading-tight">{dest.name}</span>
                        <span className="text-xs text-gray-500 leading-tight">{dest.landmark}</span>
                      </div>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {dest.tours}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="mx-4 border-t border-gray-200"></div>

        {/* Recommended Tours Section */}
        <div className="px-4 pt-3 pb-4 bg-gradient-to-b from-white to-gray-50">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-sm font-semibold text-gray-700">⭐ ทัวร์แนะนำ</span>
          </div>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            {[
              { label: 'ลด 40%', value: 'promotion', color: 'red', icon: '🔥' },
              { label: 'หน้าหนาว', value: 'winter', color: 'blue', icon: '❄️' },
              { label: 'ไม่เกินหมื่น', value: 'budget', color: 'green', icon: '💰' },
              { label: 'พรีเมียม', value: 'premium', color: 'yellow', icon: '⭐' },
              { label: 'ซากุระ', value: 'sakura', color: 'pink', icon: '🌸' },
              { label: 'เกาะสวรรค์', value: 'island', color: 'teal', icon: '🏖️' }
            ].map((tag, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedTourType(selectedTourType === tag.value ? '' : tag.value)
                }}
                className={`flex-shrink-0 flex items-center gap-3 px-4 py-3 rounded-lg border transition-all duration-200 ${
                  selectedTourType === tag.value
                    ? 'border-blue-300 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 shadow-sm'
                    : 'border-gray-200 bg-white text-gray-800 hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                <div className={`w-[32px] h-[32px] rounded-full flex items-center justify-center text-white ${
                  tag.color === 'red' ? 'bg-gradient-to-r from-red-500 to-orange-500' :
                  tag.color === 'blue' ? 'bg-gradient-to-r from-blue-500 to-cyan-400' :
                  tag.color === 'green' ? 'bg-gradient-to-r from-green-500 to-emerald-400' :
                  tag.color === 'yellow' ? 'bg-gradient-to-r from-yellow-500 to-amber-400' :
                  tag.color === 'pink' ? 'bg-gradient-to-r from-pink-500 to-rose-400' :
                  'bg-gradient-to-r from-teal-500 to-blue-400'
                }`}>
                  <span className="text-sm leading-none flex items-center justify-center w-full h-full">
                    {tag.icon}
                  </span>
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium leading-tight">{tag.label}</span>
                  <span className="text-xs text-gray-500 leading-tight">ทัวร์พิเศษ</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Search Overlay (Mobile) */}
      {showSearch && (
        <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm lg:hidden">
          <div className="absolute inset-0 bg-white animate-in slide-in-from-top duration-300">
            {/* Detailed Search Content */}
<div className="flex flex-col h-full">
              <div className="flex-1 overflow-y-auto p-4 pb-2 space-y-6">
              {/* Destination Filter */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">🌍 ประเทศทั้งหมด</h3>
                  <button
                    onClick={() => setShowSearch(false)}
                    className="group p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 hover:text-gray-800 transition-all duration-200"
                  >
                    <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
                  </button>
                </div>
                
                {/* Search Input - above country list */}
                <div className="mb-4">
                  <div className="relative">
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="ค้นหาประเทศ..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-sm"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="w-4 h-4 text-gray-400" />
                    </div>
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                  {popularDestinations.filter(dest => {
                    if (searchQuery.length < 2) return true;
                    return dest.name.toLowerCase().includes(searchQuery.toLowerCase());
                  }).map((dest, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedDestination(dest.name === selectedDestination ? '' : dest.name)}
                      className={`p-3 rounded-lg border transition-all duration-200 text-left ${
                        selectedDestination === dest.name
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-[18px] h-[18px] rounded-full border border-gray-200 overflow-hidden flex-shrink-0">
                          <Image 
                            src={`/icons/destinations/flag-icons-main/flags/1x1/${dest.flagCode}.svg`}
                            alt={`${dest.name} flag`}
                            width={18}
                            height={18}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-sm font-medium truncate">{dest.name}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget Filter */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">💰 งบประมาณ</h3>
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
                <h3 className="text-lg font-semibold text-gray-900 mb-3">⏰ ระยะเวลา</h3>
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
                  onClick={() => {
                    handleSearch()
                    setShowSearch(false)
                  }}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  ค้นหาทัวร์ ({sortedTours.length} ผลลัพธ์)
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

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 bg-gradient-to-b from-gray-50 to-white">
        {/* Desktop Header */}
        <div className="hidden lg:block mb-8 sticky top-16 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 pb-4">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              ทัวร์ต่างประเทศ
            </h1>
            <p className="text-gray-600">ค้นพบประสบการณ์การเดินทางที่ไม่มีวันลืม</p>
          </div>
          
          {/* Desktop Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="ค้นหาทัวร์ ประเทศ หรือเมืองที่ต้องการ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-50 transition-all"
              />
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>


        {/* Results Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <p className="text-lg text-gray-700 font-medium">
              พบ <span className="text-blue-600 font-bold">{sortedTours.length}</span> ทัวร์
            </p>
            {isLoading && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                กำลังค้นหา...
              </div>
            )}
          </div>
          
          {/* Active Filters & Sorting */}
          <div className="flex items-center gap-2 text-sm">
            <div className="relative" ref={sortDropdownRef}>
              <button 
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowUpDown className="w-4 h-4" />
                <span>
                  {sortBy === 'popular' ? 'ความนิยมสูงสุด' :
                   sortBy === 'price-low' ? 'ราคาต่ำ - สูง' :
                   sortBy === 'price-high' ? 'ราคาสูง - ต่ำ' :
                   sortBy === 'rating' ? 'คะแนนสูงสุด' : 'ความนิยมสูงสุด'}
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} />
              </button>
              
              {showSortDropdown && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <button
                    onClick={() => {setSortBy('popular'); setShowSortDropdown(false)}}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors ${sortBy === 'popular' ? 'text-blue-600 bg-blue-50' : 'text-gray-700'}`}
                  >
                    ความนิยมสูงสุด
                  </button>
                  <button
                    onClick={() => {setSortBy('rating'); setShowSortDropdown(false)}}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors ${sortBy === 'rating' ? 'text-blue-600 bg-blue-50' : 'text-gray-700'}`}
                  >
                    คะแนนสูงสุด
                  </button>
                  <button
                    onClick={() => {setSortBy('price-low'); setShowSortDropdown(false)}}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors ${sortBy === 'price-low' ? 'text-blue-600 bg-blue-50' : 'text-gray-700'}`}
                  >
                    ราคาต่ำ - สูง
                  </button>
                  <button
                    onClick={() => {setSortBy('price-high'); setShowSortDropdown(false)}}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors ${sortBy === 'price-high' ? 'text-blue-600 bg-blue-50' : 'text-gray-700'}`}
                  >
                    ราคาสูง - ต่ำ
                  </button>
                </div>
              )}
            </div>
            {selectedBudget && (
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                {selectedBudget === '30000' ? 'งบ 30,000' :
                 selectedBudget === '50000' ? 'งบ 50,000' :
                 selectedBudget === '100000' ? 'งบ 100,000' : 'โปรโมชั่น'}
              </span>
            )}
            {selectedDuration && (
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                {selectedDuration === 'short' ? '3-5 วัน' :
                 selectedDuration === 'medium' ? '6-8 วัน' :
                 selectedDuration === 'long' ? '9-12 วัน' : 'มากกว่า 2 สัปดาห์'}
              </span>
            )}
          </div>
        </div>

        {/* Tour Results */}
        <div className="grid gap-6 pb-20 lg:pb-8">
          {displayedTours.length === 0 && !isLoading ? (
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
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors duration-200 font-medium"
              >
                ดูทัวร์ทั้งหมด
              </button>
            </div>
          ) : (
            <>
              {displayedTours.map((tour) => (
              <Link 
                key={tour.id} 
                href={`/tour-search-10/${tour.id}`}
                className="group bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-300 transition-all duration-500 overflow-hidden transform hover:-translate-y-2 block"
              >
                <div className="flex flex-col lg:flex-row h-auto lg:h-48">
                  {/* Tour Image */}
                  <div className="w-full lg:w-64 h-48 lg:h-full relative flex-shrink-0 overflow-hidden">
                    <img 
                      src={tour.image} 
                      alt={tour.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
                    
                    {/* Discount Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg shadow-red-500/30">
                        -{tour.discount}%
                      </span>
                    </div>
                    
                    {/* Rating Badge */}
                    <div className="absolute top-4 right-4">
                                              <div className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          {tour.rating.toFixed(1)}
                        </div>
                    </div>
                    
                    {/* Wishlist Button */}
                    <button 
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        // Add wishlist functionality here
                      }}
                      className="absolute top-4 right-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-red-50 transition-colors duration-200">
                        <Heart className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors duration-200" />
                      </div>
                    </button>
                  </div>

                  {/* Tour Details */}
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900 mb-3 text-lg leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                        {tour.title}
                      </h3>
                      
                      {/* Highlights */}
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-2">ไฮไลท์:</p>
                        <div className="flex flex-wrap gap-2">
                          {tour.highlights.slice(0, 3).map((highlight, index) => (
                            <span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-lg text-xs font-medium">
                              {highlight}
                            </span>
                          ))}
                          {tour.highlights.length > 3 && (
                            <span className="bg-gray-50 text-gray-600 px-2 py-1 rounded-lg text-xs font-medium">
                              +{tour.highlights.length - 3} อื่นๆ
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Tour Info Grid */}
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
                            <MapPin className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{tour.destinations[0]}</p>
                            <p className="text-xs text-gray-500">{tour.destinations.length} เมือง</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center">
                            <Calendar className="w-4 h-4 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{tour.duration}</p>
                            <p className="text-xs text-gray-500">{tour.departureDate}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-8 h-8 bg-purple-50 rounded-full flex items-center justify-center">
                            <Users className="w-4 h-4 text-purple-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{tour.groupSize}</p>
                            <p className="text-xs text-gray-500">กลุ่มเล็ก</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-8 h-8 bg-orange-50 rounded-full flex items-center justify-center">
                            <Star className="w-4 h-4 text-orange-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{tour.rating.toFixed(1)}</p>
                            <p className="text-xs text-gray-500">({tour.reviews} รีวิว)</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Price and Action */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="text-left">
                        <div className="text-sm text-gray-400 line-through">฿{tour.originalPrice.toLocaleString()}</div>
                        <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                          ฿{tour.price.toLocaleString()}
                        </div>
                        <div className="text-xs text-green-600 font-medium">ประหยัด ฿{(tour.originalPrice - tour.price).toLocaleString()}</div>
                      </div>
                      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/25 flex items-center gap-2 group-hover:shadow-xl group-hover:shadow-blue-500/30">
                        ดูรายละเอียด
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
            
            {/* Infinite Scroll Trigger - positioned after the 15th tour */}
            {displayedTours.map((tour, index) => {
              if (index === 14 && hasMore) { // 15th item (0-indexed)
                return (
                  <div 
                    key={`trigger-${index}`}
                    ref={observerRef}
                    className="h-1 w-full"
                  />
                )
              }
              return null
            })}
            
            {/* Loading Indicator */}
            {loadingMore && (
              <div className="text-center py-8">
                <div className="flex items-center justify-center gap-3 text-gray-600">
                  <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm">กำลังโหลดทัวร์เพิ่มเติม...</span>
                </div>
              </div>
            )}
            
            {/* End of Results */}
            {!hasMore && displayedTours.length > 0 && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 font-medium">แสดงทัวร์ทั้งหมดแล้ว</p>
                <p className="text-gray-400 text-sm mt-1">รวม {displayedTours.length} ทัวร์</p>
              </div>
            )}
          </>
          )}
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 lg:hidden">
          <div className="flex items-center justify-around">
            <button className="flex flex-col items-center gap-1 text-gray-600">
              <MapPin className="w-6 h-6" />
              <span className="text-xs">หน้าแรก</span>
            </button>
            
            <button 
              onClick={() => setShowSearch(true)}
              className="flex flex-col items-center gap-1 text-blue-600"
            >
              <Search className="w-6 h-6" />
              <span className="text-xs">ค้นหา</span>
            </button>
            
            <button className="flex flex-col items-center gap-1 text-gray-600">
              <Heart className="w-6 h-6" />
              <span className="text-xs">ถูกใจ</span>
            </button>
            
            <button className="flex flex-col items-center gap-1 text-gray-600">
              <Users className="w-6 h-6" />
              <span className="text-xs">บัญชี</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}