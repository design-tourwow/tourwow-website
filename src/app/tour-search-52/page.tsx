// ===================================================================
// tour-search-32: Main Search Page
// ===================================================================
// Complete mobile-first tour search implementation from scratch
// No dependencies on existing tour-search implementations

'use client'

export const dynamic = 'force-dynamic'

declare global {
  interface Window {
    webkitSpeechRecognition: any
    SpeechRecognition: any
  }
}

import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import {
  Search, Filter, X, MapPin, Calendar, Star, TrendingUp,
  ChevronDown, ArrowUp, MessageCircle, Phone, Sparkles,
  Users, Clock, Gift, Zap, Globe, Heart
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { searchIndex } from './data-etl'
import { SearchFilters, SearchIndexTour, SearchSortOptions } from './types'
import { TS32_TOKENS, TS32_CSS_VARS } from './design-system'
import { useSEO } from './seo'
import { useAccessibility, AriaManager } from './accessibility'
import { useAnalytics, useSearchPerformance } from './analytics'
import {
  Button,
  Input,
  Badge,
  Card,
  SearchBar
} from './components'
import BookingModal from './BookingModal'



// ===================================================================
// Embedded Styles (Scoped CSS)
// ===================================================================
const tourSearchStyles = `
  .ts32-container {
    font-family: ${TS32_TOKENS.typography.fonts.thai};
    min-height: 100vh;
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  }
  
  
  
  .ts32-search-container {
    background: white;
    border-radius: ${TS32_TOKENS.radius['2xl']};
    box-shadow: ${TS32_TOKENS.shadows.xl};
    padding: ${TS32_TOKENS.spacing[6]};
    margin: 0 ${TS32_TOKENS.spacing[4]};
    transform: translateY(-50%);
    position: sticky;
    top: 4rem;
    z-index: 51;
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  }
  
  .ts32-search-container.scrolled {
    transform: translateY(0);
    border-radius: ${TS32_TOKENS.radius.lg};
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    margin: 0 ${TS32_TOKENS.spacing[2]};
    padding: ${TS32_TOKENS.spacing[4]};
    border-top: 1px solid rgba(229, 231, 235, 0.8);
  }
  
  
  .ts32-popular-destinations {
    background: white;
    border-radius: ${TS32_TOKENS.radius['2xl']};
    box-shadow: ${TS32_TOKENS.shadows.sm};
    padding: ${TS32_TOKENS.spacing[6]};
    margin: ${TS32_TOKENS.spacing[6]} ${TS32_TOKENS.spacing[4]};
  }
  
  .ts32-destination-card {
    position: relative;
    aspect-ratio: 1;
    border-radius: ${TS32_TOKENS.radius.xl};
    overflow: hidden;
    cursor: pointer;
    transition: transform ${TS32_TOKENS.motion.duration.normal} ${TS32_TOKENS.motion.ease.out};
  }
  
  .ts32-destination-card:hover {
    transform: scale(1.05);
  }
  
  /* Flash Sale Card Animation */
  .flash-sale-card {
    position: relative;
    border: 2px solid transparent;
    background: linear-gradient(white, white) padding-box,
                linear-gradient(45deg, #ef4444, #f59e0b, #ef4444) border-box;
    animation: flashSalePulse 2s ease-in-out infinite;
  }
  
  @keyframes flashSalePulse {
    0%, 100% {
      border-color: #ef4444;
      box-shadow: 0 0 20px rgba(239, 68, 68, 0.3);
    }
    50% {
      border-color: #f59e0b;
      box-shadow: 0 0 30px rgba(245, 158, 11, 0.4);
    }
  }
  
  .flash-sale-card::before {
    content: '';
    position: absolute;
    inset: -2px;
    background: linear-gradient(45deg, #ef4444, #f59e0b, #dc2626, #f59e0b);
    background-size: 200% 200%;
    border-radius: inherit;
    z-index: -1;
    animation: flashSaleGradient 3s ease infinite;
  }
  
  @keyframes flashSaleGradient {
    0%, 100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }
  
  .ts32-destination-card::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 50%, transparent 100%);
  }
  
  .ts32-filter-drawer {
    position: fixed;
    inset: 0;
    z-index: ${TS32_TOKENS.zIndex.modal};
    background: rgba(0, 0, 0, 0.5);
  }
  
  .ts32-filter-content {
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    max-width: 400px;
    background: white;
    overflow-y: auto;
    transform: translateX(100%);
    transition: transform ${TS32_TOKENS.motion.duration.normal} ${TS32_TOKENS.motion.ease.out};
  }
  
  .ts32-filter-content.open {
    transform: translateX(0);
  }
  
  .ts32-controls-bar {
    background: white;
    border-bottom: 1px solid ${TS32_TOKENS.colors.gray[200]};
    padding: ${TS32_TOKENS.spacing[4]};
    position: sticky;
    top: 0;
    z-index: ${TS32_TOKENS.zIndex.docked};
  }
  
  .ts32-results-grid {
    display: grid;
    gap: ${TS32_TOKENS.spacing[4]};
    grid-template-columns: repeat(1, 1fr);
  }
  
  .ts32-results-list {
    display: flex;
    flex-direction: column;
    gap: ${TS32_TOKENS.spacing[4]};
  }
  
  /* New Tour Card Styles */
  .new-tour-card {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .new-tour-card:hover {
    transform: translateY(-4px);
  }
  
  .line-clamp-1 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .ts32-sticky-cta {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: white;
    border-top: 1px solid ${TS32_TOKENS.colors.gray[200]};
    padding: ${TS32_TOKENS.spacing[4]};
    z-index: ${TS32_TOKENS.zIndex.docked};
    box-shadow: ${TS32_TOKENS.shadows.lg};
  }
  
  .ts32-back-to-top {
    position: fixed;
    bottom: 100px;
    right: ${TS32_TOKENS.spacing[4]};
    z-index: ${TS32_TOKENS.zIndex.docked};
    opacity: 0;
    transform: translateY(20px) scale(0.8);
    transition: all ${TS32_TOKENS.motion.duration.normal} ${TS32_TOKENS.motion.ease.out};
    pointer-events: none;
  }
  
  .ts32-back-to-top.visible {
    opacity: 1;
    transform: translateY(0) scale(1);
    pointer-events: auto;
  }
  
  @media (min-width: ${TS32_TOKENS.breakpoints.md}) {
    .ts32-search-container {
      margin: 0 ${TS32_TOKENS.spacing[8]};
      padding: ${TS32_TOKENS.spacing[8]};
    }
    
    .ts32-popular-destinations {
      margin-top: ${TS32_TOKENS.spacing[4]} !important;
      margin-bottom: ${TS32_TOKENS.spacing[4]} !important;
      margin-left: ${TS32_TOKENS.spacing[8]};
      margin-right: ${TS32_TOKENS.spacing[8]};
      padding: ${TS32_TOKENS.spacing[4]} ${TS32_TOKENS.spacing[6]};
    }
    
    .ts32-filter-content {
      width: 400px;
    }
  }
  
  @media (min-width: 640px) {
    .ts32-results-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: ${TS32_TOKENS.spacing[6]};
    }
  }
  
  @media (min-width: ${TS32_TOKENS.breakpoints.lg}) {
    .ts32-results-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  
  @media (min-width: 1280px) {
    .ts32-results-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  
  .ts32-skeleton {
    animation: shimmer 2s infinite;
  }
  
  /* Accessibility Classes */
  .sr-only {
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    padding: 0 !important;
    margin: -1px !important;
    overflow: hidden !important;
    clip: rect(0, 0, 0, 0) !important;
    white-space: nowrap !important;
    border: 0 !important;
  }
  
  /* Focus management */
  .ts32-container *:focus {
    outline: 2px solid ${TS32_TOKENS.colors.primary[500]} !important;
    outline-offset: 2px !important;
  }
  
  /* High contrast mode support */
  @media (prefers-contrast: high) {
    .ts32-container {
      background: white !important;
    }
    
    .ts32-header {
      border-bottom: 2px solid black !important;
    }
  }
  
  /* Animated placeholder cursor */
  .ts32-input::placeholder {
    position: relative;
  }
  
  .ts32-placeholder-cursor::after {
    content: '|';
    animation: blink 1s infinite;
    margin-left: 1px;
  }
  
  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out forwards;
  }
  
  @keyframes slideInUp {
    from { 
      opacity: 0; 
      transform: translateY(30px) scale(0.95); 
    }
    to { 
      opacity: 1; 
      transform: translateY(0) scale(1); 
    }
  }
  
  .animate-slideInUp {
    animation: slideInUp 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }
  
  .stagger-animation {
    animation-delay: calc(var(--stagger) * 0.1s);
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    .ts32-container *,
    .ts32-container *::before,
    .ts32-container *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
    
    .ts32-placeholder-cursor::after {
      animation: none;
      opacity: 1;
    }
  }
`

// ===================================================================
// Modal integration from tour-search-13 complete
// ===================================================================

// ===================================================================
// Lead Capture Modal (Simple)
// ===================================================================

interface LeadCaptureModalProps {
  isOpen: boolean
  onClose: () => void
  tour?: MockTour
}

const LeadCaptureModal: React.FC<LeadCaptureModalProps> = ({ isOpen, onClose, tour }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSuccess(true)

    // Auto close after success
    setTimeout(() => {
      setIsSuccess(false)
      onClose()
      setFormData({ name: '', email: '', phone: '', message: '' })
    }, 2000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h3 className="text-xl font-bold text-gray-900">สอบถามทัวร์</h3>
            {tour && (
              <p className="text-sm text-gray-600 mt-1 line-clamp-1">{tour.title}</p>
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSuccess ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">ส่งข้อมูลสำเร็จ!</h4>
              <p className="text-gray-600">ทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง</p>
            </div>
          ) : (
            <>
              {/* Trust Signal */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-900">ข้อมูลของคุณปลอดภัย</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      ทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง เพื่อให้คำปรึกษาและแนะนำทัวร์ที่เหมาะกับคุณ
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="ชื่อ-นามสกุล *"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                  placeholder="กรุณากรอกชื่อ-นามสกุล"
                />

                <Input
                  label="เบอร์โทรศัพท์ *"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  required
                  placeholder="08X-XXX-XXXX"
                />

                <Input
                  label="อีเมล"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="your@email.com"
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ข้อความเพิ่มเติม
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="เช่น ช่วงเวลาที่สะดวกเดินทาง, จำนวนผู้เดินทาง, งบประมาณ..."
                    rows={3}
                    className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={isSubmitting}
                  className="w-full"
                  disabled={!formData.name || !formData.phone}
                >
                  {isSubmitting ? 'กำลังส่ง...' : 'ส่งข้อมูล'}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  การส่งข้อมูลแสดงว่าคุณยินยอมให้เราติดต่อกลับเพื่อให้คำปรึกษา
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// ===================================================================
// Mock Asian Tours Data
// ===================================================================

interface MockTour {
  id: string
  title: string
  countries: string[]
  duration: { days: number; nights: number }
  airline: string
  travelMonths: string[]
  landmarks: string[]
  pricing: {
    originalPrice: number
    salePrice: number
    savings: number
  }
  highlights: string[]
  image: string
  rating: number
  reviewCount: number
}

const mockAsianTours: MockTour[] = [
  {
    id: 'japan-sakura-2024',
    title: 'ญี่ปุ่น โตเกียว โอซาก้า เกียวโต ซากุราบาน',
    countries: ['ญี่ปุ่น'],
    duration: { days: 6, nights: 4 },
    airline: 'Thai Airways',
    travelMonths: ['มีนาคม', 'เมษายน', 'พฤษภาคม'],
    landmarks: ['โตเกียวสกายทรี', 'ปราสาทโอซาก้า', 'วัดเคียวมิซุ', 'ภูเขาไฟฟูจิ', 'ย่านชิบูย่า', 'สวนอุเอโนะ'],
    pricing: {
      originalPrice: 45900,
      salePrice: 35900,
      savings: 10000
    },
    highlights: ['ชมซากุราบาน', 'ขึ้นภูเขาไฟฟูจิ', 'ช้อปปิ้งย่านชิบูย่า', 'ลิ้มรสอาหารญี่ปุ่นแท้', 'ชมวิวจากโตเกียวสกายทรี'],
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=450&fit=crop&auto=format&q=80',
    rating: 4.8,
    reviewCount: 1247
  },
  {
    id: 'korea-seoul-busan',
    title: 'เกาหลีใต้ โซล ปูซาน เจจู K-POP & ช้อปปิ้ง',
    countries: ['เกาหลีใต้'],
    duration: { days: 5, nights: 3 },
    airline: 'Korean Air',
    travelMonths: ['ตลอดปี'],
    landmarks: ['พระราชวังเคียงบกกุง', 'หมู่บ้านบุกชนฮันอก', 'ตลาดเมียงดง', 'เกาะเจจู', 'หาดฮแออุนแด', 'N Seoul Tower'],
    pricing: {
      originalPrice: 28900,
      salePrice: 22900,
      savings: 6000
    },
    highlights: ['สัมผัสวัฒนธรรม K-POP', 'ช้อปปิ้งเมียงดง', 'ลิ้มรสบาร์บีคิวเกาหลี', 'เที่ยวเกาะเจจู', 'ถ่ายรูปใส่ฮันบก'],
    image: 'https://images.unsplash.com/photo-1541963463532-d68292c34d19?w=800&h=450&fit=crop&auto=format&q=80',
    rating: 4.7,
    reviewCount: 892
  },
  {
    id: 'taiwan-taipei-taichung',
    title: 'ไต้หวัน ไทเป ไทจง อาลีซาน ตลาดกลางคืน',
    countries: ['ไต้หวัน'],
    duration: { days: 4, nights: 3 },
    airline: 'China Airlines',
    travelMonths: ['ตุลาคม', 'พฤศจิกายน', 'ธันวาคม', 'มกราคม'],
    landmarks: ['ไทเป 101', 'ตลาดกลางคืนซือหลิน', 'อาลีซาน', 'ทะเลสาบสุริยันจันทรา', 'เย๋หลิ่ว', 'จิ่วเฟิ่น'],
    pricing: {
      originalPrice: 18900,
      salePrice: 13900,
      savings: 5000
    },
    highlights: ['ตลาดกลางคืนซือหลิน', 'ชมพระอาทิตย์ขึ้นอาลีซาน', 'ทะเลสาบสุริยันจันทรา', 'อาหารไต้หวันแท้', 'ชิมชาโอหลง'],
    image: 'https://images.unsplash.com/photo-1508248467877-aec1b08de376?w=800&h=450&fit=crop&auto=format&q=80',
    rating: 4.6,
    reviewCount: 654
  },
  {
    id: 'singapore-malaysia',
    title: 'สิงคโปร์ มาเลเซีย กัวลาลัมเปอร์ เกนติ้งไฮแลนด์',
    countries: ['สิงคโปร์', 'มาเลเซีย'],
    duration: { days: 5, nights: 4 },
    airline: 'Singapore Airlines',
    travelMonths: ['ตลอดปี'],
    landmarks: ['มารีน่าเบย์แซนด์', 'เกาะเซนโตซา', 'ยูนิเวอร์แซลสตูดิโอ', 'เพทโรนาสทาวเวอร์', 'เกนติ้งไฮแลนด์', 'Gardens by the Bay'],
    pricing: {
      originalPrice: 24900,
      salePrice: 19900,
      savings: 5000
    },
    highlights: ['ยูนิเวอร์แซลสตูดิโอ', 'มารีน่าเบย์แซนด์', 'เกนติ้งไฮแลนด์', 'ช้อปปิ้งออร์ชาร์ด', 'Gardens by the Bay'],
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&h=450&fit=crop&auto=format&q=80',
    rating: 4.5,
    reviewCount: 743
  },
  {
    id: 'vietnam-hanoi-halong',
    title: 'เวียดนาม ฮานอย ฮาลองเบย์ โฮจิมินห์ซิตี้',
    countries: ['เวียดนาม'],
    duration: { days: 6, nights: 5 },
    airline: 'Vietnam Airlines',
    travelMonths: ['ตุลาคม', 'พฤศจิกายน', 'ธันวาคม', 'มกราคม', 'กุมภาพันธ์'],
    landmarks: ['ฮาลองเบย์', 'วัดวรรณกรรม', 'ตลาดเบนถาน', 'อุโมงค์กู๋จี', 'พระราชวังรีอูนิฟิเคชั่น', 'ย่านเก่าฮานอย'],
    pricing: {
      originalPrice: 21900,
      salePrice: 16900,
      savings: 5000
    },
    highlights: ['ล่องเรือฮาลองเบย์', 'อุโมงค์กู๋จี', 'อาหารเวียดนามแท้', 'ตลาดเบนถาน', 'กาแฟเวียดนาม'],
    image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&h=450&fit=crop&auto=format&q=80',
    rating: 4.4,
    reviewCount: 521
  },
  {
    id: 'thailand-chiang-mai',
    title: 'ไทย เชียงใหม่ เชียงราย ดอยอินทนนท์ วัดร่องขุ่น',
    countries: ['ไทย'],
    duration: { days: 4, nights: 3 },
    airline: 'Thai Smile',
    travelMonths: ['ตลอดปี'],
    landmarks: ['วัดพระธาตุดอยสุเทพ', 'วัดร่องขุ่น', 'ดอยอินทนนท์', 'ตลาดวอร์กกิ้งสตรีท', 'หมู่บ้านม้ง', 'วัดพระสิงห์'],
    pricing: {
      originalPrice: 12900,
      salePrice: 9900,
      savings: 3000
    },
    highlights: ['วัดร่องขุ่น', 'ดอยอินทนนท์', 'หมู่บ้านม้ง', 'ตลาดวอร์กกิ้งสตรีท', 'นวดแผนไทย'],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=450&fit=crop&auto=format&q=80',
    rating: 4.3,
    reviewCount: 389
  },
  {
    id: 'china-beijing-shanghai',
    title: 'จีน ปักกิ่ง เซี่ยงไฮ้ กำแพงเมืองจีน พระราชวังต้องห้าม',
    countries: ['จีน'],
    duration: { days: 7, nights: 5 },
    airline: 'China Eastern',
    travelMonths: ['มีนาคม', 'เมษายน', 'พฤษภาคม', 'กันยายน', 'ตุลาคม'],
    landmarks: ['กำแพงเมืองจีน', 'พระราชวังต้องห้าม', 'จัตุรัสเทียนอันเหมิน', 'เซี่ยงไฮ้บันด์', 'วัดแห่งสวรรค์', 'หอไข่มุก'],
    pricing: {
      originalPrice: 32900,
      salePrice: 26900,
      savings: 6000
    },
    highlights: ['กำแพงเมืองจีน', 'พระราชวังต้องห้าม', 'เซี่ยงไฮ้บันด์', 'อาหารจีนแท้', 'ชมโชว์อคร์บาติก'],
    image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&h=450&fit=crop&auto=format&q=80',
    rating: 4.6,
    reviewCount: 967
  },
  {
    id: 'indonesia-bali-jakarta',
    title: 'อินโดนีเซีย บาหลี จาการ์ตา วัดโบโรพุทโธ',
    countries: ['อินโดนีเซีย'],
    duration: { days: 6, nights: 4 },
    airline: 'Garuda Indonesia',
    travelMonths: ['เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม'],
    landmarks: ['วัดโบโรพุทโธ', 'วัดปรัมบานัน', 'อุบุด', 'ตานาห์ลอต', 'เกาะกิลี', 'ภูเขาไฟบาตูร์'],
    pricing: {
      originalPrice: 26900,
      salePrice: 21900,
      savings: 5000
    },
    highlights: ['วัดโบโรพุทโธ', 'ชมพระอาทิตย์ขึ้นภูเขาไฟบาตูร์', 'สปาบาหลี', 'อาหารอินโดนีเซีย', 'ช้อปปิ้งอุบุด'],
    image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&h=450&fit=crop&auto=format&q=80',
    rating: 4.5,
    reviewCount: 678
  }
]

// ===================================================================
// Tour Card Skeleton Component
// ===================================================================

const TourCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="aspect-[16/9] bg-gray-200"></div>

      {/* Content Skeleton */}
      <div className="p-4 space-y-4">
        {/* Title */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>

        {/* Duration & Airline */}
        <div className="flex justify-between">
          <div className="h-3 bg-gray-200 rounded w-20"></div>
          <div className="h-3 bg-gray-200 rounded w-16"></div>
        </div>

        {/* Travel Months */}
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded w-24"></div>
          <div className="flex gap-1">
            <div className="h-6 bg-gray-200 rounded-full w-16"></div>
            <div className="h-6 bg-gray-200 rounded-full w-16"></div>
          </div>
        </div>

        {/* Landmarks */}
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded w-32"></div>
          <div className="space-y-1">
            <div className="h-3 bg-gray-200 rounded w-full"></div>
            <div className="h-3 bg-gray-200 rounded w-4/5"></div>
          </div>
        </div>

        {/* Highlights */}
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded w-24"></div>
          <div className="space-y-1">
            <div className="h-3 bg-gray-200 rounded w-full"></div>
            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>

        {/* Pricing */}
        <div className="border-t border-gray-100 pt-4 space-y-3">
          <div className="flex justify-between">
            <div className="space-y-1">
              <div className="h-3 bg-gray-200 rounded w-16"></div>
              <div className="h-6 bg-gray-200 rounded w-20"></div>
              <div className="h-3 bg-gray-200 rounded w-12"></div>
            </div>
            <div className="space-y-1 text-right">
              <div className="h-3 bg-gray-200 rounded w-16"></div>
              <div className="h-4 bg-gray-200 rounded w-12"></div>
            </div>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <div className="h-10 bg-gray-200 rounded-lg"></div>
            <div className="h-10 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ===================================================================
// New Tour Card Component
// ===================================================================

interface NewTourCardProps {
  tour: MockTour
  onInquire: () => void
  onBook: () => void
}

const NewTourCard: React.FC<NewTourCardProps> = ({ tour, onInquire, onBook }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <div className="new-tour-card bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 hover:border-blue-200">
      {/* Image Section - 16:9 Aspect Ratio */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          className={`object-cover transition-all duration-500 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          onLoad={() => setImageLoaded(true)}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          priority={false}
          loading="lazy"
          quality={85}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        )}

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Rating Badge */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm rounded-lg px-2.5 py-1.5 flex items-center space-x-1 shadow-sm">
          <Star className="w-3.5 h-3.5 text-yellow-500 fill-current" />
          <span className="text-sm font-bold text-gray-900">{tour.rating}</span>
          <span className="text-xs text-gray-600">({tour.reviewCount.toLocaleString()})</span>
        </div>

        {/* Savings Badge */}
        <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg px-2.5 py-1.5 shadow-sm">
          <div className="text-xs font-bold">ประหยัด</div>
          <div className="text-sm font-bold">฿{tour.pricing.savings.toLocaleString()}</div>
        </div>

        {/* Countries */}
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
          {tour.countries.map((country, index) => (
            <span
              key={index}
              className="bg-white/95 backdrop-blur-sm text-gray-900 text-xs px-2.5 py-1 rounded-full font-semibold shadow-sm"
            >
              {country}
            </span>
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-4">
        {/* Title */}
        <div>
          <h3 className="text-base font-bold text-gray-900 line-clamp-2 leading-tight mb-1">
            {tour.title}
          </h3>
        </div>

        {/* Duration & Airline */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-1.5 text-gray-600">
            <Clock className="w-4 h-4 text-blue-500" />
            <span className="font-medium">{tour.duration.days} วัน {tour.duration.nights} คืน</span>
          </div>
          <div className="text-gray-700 font-medium bg-gray-50 px-2 py-1 rounded-md text-xs">
            {tour.airline}
          </div>
        </div>

        {/* Travel Months */}
        <div>
          <div className="flex items-center space-x-1.5 mb-2">
            <Calendar className="w-4 h-4 text-green-500" />
            <span className="text-sm font-semibold text-gray-700">ช่วงเดินทาง</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {tour.travelMonths.slice(0, 2).map((month, index) => (
              <span
                key={index}
                className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-md font-medium"
              >
                {month}
              </span>
            ))}
            {tour.travelMonths.length > 2 && (
              <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-md">
                +{tour.travelMonths.length - 2}
              </span>
            )}
          </div>
        </div>

        {/* Landmarks */}
        <div>
          <div className="flex items-center space-x-1.5 mb-2">
            <MapPin className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-semibold text-gray-700">สถานที่ท่องเที่ยว</span>
          </div>
          <div className="space-y-1">
            {tour.landmarks.slice(0, isExpanded ? tour.landmarks.length : 2).map((landmark, index) => (
              <div key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full flex-shrink-0 mt-1.5" />
                <span className="line-clamp-1">{landmark}</span>
              </div>
            ))}
            {tour.landmarks.length > 2 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center space-x-1 mt-1"
              >
                <span>{isExpanded ? 'ดูน้อยลง' : `ดูเพิ่ม (+${tour.landmarks.length - 2})`}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
              </button>
            )}
          </div>
        </div>

        {/* Highlights */}
        <div>
          <div className="flex items-center space-x-1.5 mb-2">
            <Sparkles className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-semibold text-gray-700">ไฮไลท์ทัวร์</span>
          </div>
          <div className="space-y-1">
            {tour.highlights.slice(0, 2).map((highlight, index) => (
              <div key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full flex-shrink-0 mt-1.5" />
                <span className="line-clamp-1">{highlight}</span>
              </div>
            ))}
            {tour.highlights.length > 2 && (
              <div className="text-xs text-gray-500">+{tour.highlights.length - 2} ไฮไลท์เพิ่มเติม</div>
            )}
          </div>
        </div>

        {/* Pricing */}
        <div className="border-t border-gray-100 pt-4">
          <div className="flex items-end justify-between mb-3">
            <div>
              <div className="text-sm text-gray-500 line-through">
                ฿{tour.pricing.originalPrice.toLocaleString()}
              </div>
              <div className="text-xl font-bold text-red-600">
                ฿{tour.pricing.salePrice.toLocaleString()}
              </div>
              <div className="text-xs text-gray-600">ราคาต่อท่าน</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-green-600">
                ประหยัด ฿{tour.pricing.savings.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500 bg-green-50 px-2 py-0.5 rounded-full">
                {Math.round((tour.pricing.savings / tour.pricing.originalPrice) * 100)}% ลด
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={onInquire}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2.5 px-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-1.5 text-sm hover:shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>สอบถาม</span>
            </button>
            <button
              onClick={onBook}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2.5 px-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-1.5 text-sm shadow-sm hover:shadow-md"
            >
              <Heart className="w-4 h-4" />
              <span>จองเลย</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ===================================================================
// Main Tour Search Component
// ===================================================================

// Countries data for the modal (copied from tour-search-13)
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

export default function TourSearch32() {
  // Client-side mounting state
  const [isMounted, setIsMounted] = useState(false)

  // State management
  const [searchQuery, setSearchQuery] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false)
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const [isVoiceSearching, setIsVoiceSearching] = useState(false)
  const [animatedPlaceholder, setAnimatedPlaceholder] = useState('')
  const [filters, setFilters] = useState<SearchFilters>({})
  const [sortOptions, setSortOptions] = useState<SearchSortOptions>({
    field: 'popularity',
    direction: 'desc'
  })

  const [showFilters, setShowFilters] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showStickyCTA, setShowStickyCTA] = useState(false)
  const [wishlist, setWishlist] = useState<string[]>([])
  const [leadModal, setLeadModal] = useState<{
    isOpen: boolean
    tour?: MockTour
  }>({ isOpen: false })
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [selectedTourForBooking, setSelectedTourForBooking] = useState<MockTour | null>(null)
  const [expandedCountries, setExpandedCountries] = useState<{ [key: string]: boolean }>({})
  const [expandedPackages, setExpandedPackages] = useState<{ [key: string]: boolean }>({})
  const [currentDestinationIndex, setCurrentDestinationIndex] = useState(0)
  const [isAutoSlideActive, setIsAutoSlideActive] = useState(true)
  const [showImprovedCardDates, setShowImprovedCardDates] = useState(false)

  // Popular destinations data for carousel
  const destinationsData = useMemo(() => [
    {
      name: 'ญี่ปุ่น',
      tours: '156 ทัวร์',
      rating: '4.8',
      price: '฿25,900',
      originalPrice: '฿32,900',
      discount: 21,
      flagCode: 'jp',
      description: 'ซากุระบาน วัฒนธรรมดั้งเดิม โตเกียวสุดล้ำ',
      highlights: ['ซากุระ', 'รามเทพ', 'โตเกียว'],
      bgImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop&auto=format&q=80',
      season: 'มี.ค. - พ.ค.',
      cities: [
        { name: 'โตเกียว', price: '฿25,900', bgImage: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop&auto=format&q=80' },
        { name: 'โอซาก้า', price: '฿23,900', bgImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&auto=format&q=80' },
        { name: 'เกียวโต', price: '฿27,900', bgImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop&auto=format&q=80' },
        { name: 'ฮิโรชิมา', price: '฿29,900', bgImage: 'https://images.unsplash.com/photo-1549378725-b93c3e3b9e6d?w=800&h=600&fit=crop&auto=format&q=80' },
        { name: 'นาโกย่า', price: '฿26,900', bgImage: 'https://images.unsplash.com/photo-1580837119756-563d608dd119?w=800&h=600&fit=crop&auto=format&q=80' }
      ]
    },
    {
      name: 'เกาหลีใต้',
      tours: '89 ทัวร์',
      rating: '4.7',
      price: '฿15,900',
      originalPrice: '฿19,900',
      discount: 20,
      flagCode: 'kr',
      description: 'K-POP วัฒนธรรม ช้อปปิ้งสุดมันส์',
      highlights: ['K-POP', 'เซนต์รัล', 'เมียงดง'],
      bgImage: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?w=800&h=600&fit=crop&auto=format&q=80',
      season: 'ตลอดปี',
      cities: [
        { name: 'โซล', price: '฿15,900', bgImage: 'https://images.unsplash.com/photo-1541963463532-d68292c34d19?w=800&h=600&fit=crop&auto=format&q=80' },
        { name: 'ปูซาน', price: '฿14,900', bgImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&auto=format&q=80' },
        { name: 'เจจู', price: '฿17,900', bgImage: 'https://images.unsplash.com/photo-1549378725-b93c3e3b9e6d?w=800&h=600&fit=crop&auto=format&q=80' },
        { name: 'แทกู', price: '฿16,900', bgImage: 'https://images.unsplash.com/photo-1580837119756-563d608dd119?w=800&h=600&fit=crop&auto=format&q=80' }
      ]
    },
    {
      name: 'ไต้หวัน',
      tours: '67 ทัวร์',
      rating: '4.6',
      price: '฿9,900',
      originalPrice: '฿13,900',
      discount: 29,
      flagCode: 'tw',
      description: 'อาหารเด็ด ตลาดกลางคืน ธรรมชาติสวย',
      highlights: ['ไทเป 101', 'ตลาดกลางคืน', 'อาลีซาน'],
      bgImage: 'https://images.unsplash.com/photo-1508248467877-aec1b08de376?w=800&h=600&fit=crop&auto=format&q=80',
      season: 'ต.ค. - เม.ย.',
      cities: [
        { name: 'ไทเป', price: '฿9,900', bgImage: 'https://images.unsplash.com/photo-1508248467877-aec1b08de376?w=800&h=600&fit=crop&auto=format&q=80' },
        { name: 'ไทจง', price: '฿11,900', bgImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&auto=format&q=80' },
        { name: 'เกาสง', price: '฿10,900', bgImage: 'https://images.unsplash.com/photo-1549378725-b93c3e3b9e6d?w=800&h=600&fit=crop&auto=format&q=80' },
        { name: 'ฮวาเหลียน', price: '฿12,900', bgImage: 'https://images.unsplash.com/photo-1580837119756-563d608dd119?w=800&h=600&fit=crop&auto=format&q=80' }
      ]
    },
    {
      name: 'อิตาลี',
      tours: '112 ทัวร์',
      rating: '4.9',
      price: '฿45,900',
      originalPrice: '฿59,900',
      discount: 23,
      flagCode: 'it',
      description: 'ประวัติศาสตร์ อาหารอิตาเลียน ศิลปะ',
      highlights: ['โรม', 'ปิซา', 'เวนิส'],
      bgImage: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&h=600&fit=crop&auto=format&q=80',
      season: 'เม.ย. - ต.ค.',
      cities: [
        { name: 'โรม', price: '฿45,900', bgImage: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&h=600&fit=crop&auto=format&q=80' },
        { name: 'เวนิส', price: '฿48,900', bgImage: 'https://images.unsplash.com/photo-1523906921802-b5d2d899e93b?w=800&h=600&fit=crop&auto=format&q=80' },
        { name: 'ฟลอเรนซ์', price: '฿47,900', bgImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&auto=format&q=80' },
        { name: 'มิลาน', price: '฿49,900', bgImage: 'https://images.unsplash.com/photo-1513581166391-887a96ddeafd?w=800&h=600&fit=crop&auto=format&q=80' },
        { name: 'นาโปลี', price: '฿44,900', bgImage: 'https://images.unsplash.com/photo-1544511916-0148ccdeb877?w=800&h=600&fit=crop&auto=format&q=80' }
      ]
    },
    {
      name: 'สวิส',
      tours: '43 ทัวร์',
      rating: '4.8',
      price: '฿55,900',
      originalPrice: '฿69,900',
      discount: 20,
      flagCode: 'ch',
      description: 'ภูเขาแอลป์ ธรรมชาติบริสุทธิ์',
      highlights: ['เจนีวา', 'ภูเขาแอลป์', 'ช็อคโกแลต'],
      bgImage: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800&h=600&fit=crop&auto=format&q=80',
      season: 'มิ.ย. - ก.ย.',
      cities: [
        { name: 'เจนีวา', price: '฿55,900', bgImage: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop&auto=format&q=80' },
        { name: 'ซูริก', price: '฿57,900', bgImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&auto=format&q=80' },
        { name: 'เบิร์น', price: '฿54,900', bgImage: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800&h=600&fit=crop&auto=format&q=80' },
        { name: 'อินเทอร์ลากเคน', price: '฿59,900', bgImage: 'https://images.unsplash.com/photo-1544511916-0148ccdeb877?w=800&h=600&fit=crop&auto=format&q=80' }
      ]
    },
    {
      name: 'ไอซ์แลนด์',
      tours: '28 ทัวร์',
      rating: '4.9',
      price: '฿65,900',
      originalPrice: '฿89,900',
      discount: 27,
      flagCode: 'is',
      description: 'ออรอร่า ธารน้ำแข็ง ธรรมชาติมหัศจรรย์',
      highlights: ['ออรอร่า', 'ธารน้ำแข็ง', 'บลูลากูน'],
      bgImage: 'https://images.unsplash.com/photo-1520769669658-f07657f5a307?w=800&h=600&fit=crop&auto=format&q=80',
      season: 'ก.ย. - มี.ค.',
      cities: [
        { name: 'เรคยาวิค', price: '฿65,900', bgImage: 'https://images.unsplash.com/photo-1520769669658-f07657f5a307?w=800&h=600&fit=crop&auto=format&q=80' },
        { name: 'อากูเรย์รี', price: '฿63,900', bgImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&auto=format&q=80' },
        { name: 'โฮฟน์', price: '฿67,900', bgImage: 'https://images.unsplash.com/photo-1549378725-b93c3e3b9e6d?w=800&h=600&fit=crop&auto=format&q=80' }
      ]
    }
  ], [])

  // Carousel navigation functions
  const goToNext = useCallback(() => {
    setCurrentDestinationIndex((prev) =>
      prev === destinationsData.length - 1 ? 0 : prev + 1
    )
  }, [destinationsData.length])

  const goToPrevious = useCallback(() => {
    setCurrentDestinationIndex((prev) =>
      prev === 0 ? destinationsData.length - 1 : prev - 1
    )
  }, [destinationsData.length])

  const goToSlide = useCallback((index: number) => {
    setCurrentDestinationIndex(index)
  }, [])

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoSlideActive) return

    const interval = setInterval(() => {
      if (isAutoSlideActive) {
        goToNext()
      }
    }, 6000) // Change slide every 6 seconds

    return () => clearInterval(interval)
  }, [goToNext, isAutoSlideActive])

  // Touch/swipe handling for mobile
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const minSwipeDistance = 20 // More sensitive swipe

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
    setIsDragging(false)
    // Stop auto-slide immediately when user starts touching
    setIsAutoSlideActive(false)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return

    const currentTouch = e.targetTouches[0].clientX
    setTouchEnd(currentTouch)
    const distance = Math.abs(touchStart - currentTouch)

    if (distance > 5) {
      setIsDragging(true)
      // Prevent page scroll during swipe
      e.preventDefault()
    }
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      setTouchStart(null)
      setTouchEnd(null)
      setIsDragging(false)
      return
    }

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe && currentDestinationIndex < destinationsData.length - 1) {
      goToNext()
    } else if (isRightSwipe && currentDestinationIndex > 0) {
      goToPrevious()
    }

    // Reset touch states
    setTouchStart(null)
    setTouchEnd(null)
    setIsDragging(false)
  }

  // Modal state variables (copied from tour-search-13)
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedBudget, setSelectedBudget] = useState('')
  const [selectedDuration, setSelectedDuration] = useState('')
  const [countrySearchQuery, setCountrySearchQuery] = useState('')
  const [selectedMonths, setSelectedMonths] = useState<string[]>([])
  const [selectedPeople, setSelectedPeople] = useState('')
  const [selectedRating, setSelectedRating] = useState('')
  const [selectedTourType, setSelectedTourType] = useState('')
  const [showAdvancedModal, setShowAdvancedModal] = useState(false)

  // Loading and data states
  const [isLoading, setIsLoading] = useState(true)
  const [isSearching, setIsSearching] = useState(false)

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
        setAnimatedPlaceholder(current.substring(0, charIndex))
        charIndex++

        if (charIndex > current.length) {
          isDeleting = true
          timeout = setTimeout(type, 5000)
        } else {
          timeout = setTimeout(type, 80 + Math.random() * 40)
        }
      } else {
        setAnimatedPlaceholder(current.substring(0, charIndex))
        charIndex--

        if (charIndex < 0) {
          isDeleting = false
          currentIndex = (currentIndex + 1) % placeholders.length
          timeout = setTimeout(type, 500)
        } else {
          timeout = setTimeout(type, 50 + Math.random() * 30)
        }
      }
    }

    timeout = setTimeout(type, 2000)
    return () => clearTimeout(timeout)
  }, [searchTerm])

  // Voice search functionality
  const handleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice search is not supported in your browser')
      return
    }

    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
    const recognition = new SpeechRecognition()

    recognition.lang = 'th-TH'
    recognition.continuous = false
    recognition.interimResults = false

    setIsVoiceSearching(true)

    recognition.onstart = () => {
      console.log('Voice search started')
    }

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      setSearchTerm(transcript)
      handleSearchSubmit(transcript)
    }

    recognition.onerror = (event) => {
      console.error('Voice search error:', event.error)
      setIsVoiceSearching(false)
    }

    recognition.onend = () => {
      setIsVoiceSearching(false)
    }

    recognition.start()
  }

  // Search submit handler
  const handleSearchSubmit = (query: string) => {
    if (!query.trim()) return

    setSearchTerm(query)  // Set the search term to display in the input
    setSearchQuery(query) // Set the query for search logic
    setShowSearchSuggestions(false)

    // Save to search history
    const newHistory = [query, ...searchHistory.filter(item => item !== query)].slice(0, 10)
    setSearchHistory(newHistory)
    localStorage.setItem('tour-search-35-history', JSON.stringify(newHistory))

    // Update URL
    const url = new URL(window.location.href)
    url.searchParams.set('q', query)
    window.history.pushState({}, '', url.toString())

    // Auto scroll to results header with offset for sticky search bar
    setTimeout(() => {
      const resultsHeader = document.getElementById('search-results-header')
      if (resultsHeader) {
        const headerRect = resultsHeader.getBoundingClientRect()
        const headerHeight = 64 // Header height
        const searchBarHeight = 100 // Approximate sticky search bar height
        const totalOffset = headerHeight + searchBarHeight + 20 // Extra padding

        window.scrollTo({
          top: window.scrollY + headerRect.top - totalOffset,
          behavior: 'smooth'
        })
      }
    }, 300)
  }

  // Clear search history
  const clearSearchHistory = () => {
    setSearchHistory([])
    localStorage.removeItem('tour-search-35-history')
  }

  // Static search suggestions data
  const staticSearchSuggestions = {
    popular: [
      { text: 'ทัวร์ญี่ปุ่น ซากุระ', category: 'ญี่ปุ่น', count: '120 ทัวร์' },
      { text: 'ทัวร์เกาหลี โซล', category: 'เกาหลี', count: '85 ทัวร์' },
      { text: 'ทัวร์ไต้หวัน ตลาดกลางคืน', category: 'ไต้หวัน', count: '65 ทัวร์' },
      { text: 'ทัวร์สิงคโปร์ ครอบครัว', category: 'สิงคโปร์', count: '45 ทัวร์' },
      { text: 'ทัวร์ยุโรป 7 ประเทศ', category: 'ยุโรป', count: '30 ทัวร์' }
    ]
  }

  const clearFilters = () => {
    setSelectedCountry('')
    setSelectedBudget('')
    setSelectedDuration('')
    setCountrySearchQuery('')
    setSelectedMonths([])
    setSelectedPeople('')
    setSelectedRating('')
    setSelectedTourType('')
  }

  // Refs
  const topRef = useRef<HTMLDivElement>(null)
  const searchContainerRef = useRef<HTMLDivElement>(null)

  // SEO and Analytics hooks - SEO temporarily disabled
  // const seo = useSEO()
  const seo = null // Temporarily disabled
  const analytics = useAnalytics()
  const searchPerformance = useSearchPerformance()
  const a11y = useAccessibility()

  // Removed searchResults logic - using mockAsianTours instead

  const popularDestinations = useMemo(() =>
    searchIndex.getPopularDestinations(6),
    []
  )

  const featuredTours = useMemo(() =>
    searchIndex.getFeaturedTours(6),
    []
  )

  // Search suggestions
  const searchSuggestions = useMemo(() => {
    if (searchQuery.length < 2) return []

    const suggestions = new Set<string>()

    // Add popular destinations that match
    popularDestinations.forEach(dest => {
      if (dest.country && dest.country.toLowerCase().includes(searchQuery.toLowerCase())) {
        suggestions.add(`ทัวร์${dest.country}`)
      }
    })

    // Add common search terms
    const commonTerms = [
      'ทัวร์ญี่ปุ่น', 'ทัวร์เกาหลี', 'ทัวร์ยุโรป', 'ทัวร์จีน', 'ทัวร์ไต้หวัน',
      'ทัวร์ราคาดี', 'ทัวร์โปรโมชั่น', 'ทัวร์ช่วงวันหยุด', 'ทัวร์ฮันนีมูน',
      'ทัวร์กรุ๊ป', 'ทัวร์ส่วนตัว', 'ทัวร์เอเชีย', 'ทัวร์อเมริกา', 'ทัวร์ออสเตรเลีย',
      'ทัวร์ซากุระ', 'ทัวร์ใบไม้เปลี่ยนสี', 'ทัวร์ลาเวนเดอร์', 'ทัวร์หิมะ',
      'กรุงเทพ', 'โตเกียว', 'โซล', 'ปารีส', 'ลอนดอน', 'นิวยอร์ก', 'ซิดนีย์'
    ]

    commonTerms.forEach(term => {
      if (term.toLowerCase().includes(searchQuery.toLowerCase())) {
        suggestions.add(term)
      }
    })

    return Array.from(suggestions).slice(0, 5)
  }, [searchQuery, popularDestinations])

  // Event handlers
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
    setIsSearching(true)

    // Auto scroll to results header with offset for sticky search bar
    setTimeout(() => {
      const resultsHeader = document.getElementById('search-results-header')
      if (resultsHeader) {
        const headerRect = resultsHeader.getBoundingClientRect()
        const headerHeight = 64 // Header height
        const searchBarHeight = 100 // Approximate sticky search bar height
        const totalOffset = headerHeight + searchBarHeight + 20 // Extra padding

        window.scrollTo({
          top: window.scrollY + headerRect.top - totalOffset,
          behavior: 'smooth'
        })
      }
      setIsSearching(false)
    }, 300)
  }, [])

  const handleFiltersChange = useCallback((newFilters: SearchFilters) => {
    const oldFilters = filters
    setFilters(newFilters)

    // Track filter changes for analytics and accessibility
    Object.keys(newFilters).forEach(key => {
      const filterKey = key as keyof SearchFilters
      const oldValue = oldFilters[filterKey]
      const newValue = newFilters[filterKey]

      if (JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
        if (newValue && (!oldValue || (Array.isArray(newValue) && newValue.length > 0))) {
          // Filter applied
          analytics.trackFilterApplied(
            filterKey,
            newValue,
            Object.keys(newFilters).filter(k => newFilters[k as keyof SearchFilters]).length,
            mockAsianTours.length, // Will be updated in next render
            mockAsianTours.length // Will be calculated with new filters
          )
          a11y.announceFilterChange(filterKey, 'applied', String(newValue))
        } else if (!newValue || (Array.isArray(newValue) && newValue.length === 0)) {
          // Filter removed
          analytics.trackFilterCleared(
            filterKey,
            Object.keys(newFilters).filter(k => newFilters[k as keyof SearchFilters]).length,
            mockAsiesults.llength,
            mockAsianTours.lengh
          )
          a11y.announceFilterChange(filterKey, 'removed', String(oldValue))
        }
      }
    })
  }, [filters, analytics, a11y])

  const handleWishlistToggle = useCallback((tourId: string) => {
    setWishlist(prev => {
      const newWishlist = prev.includes(tourId)
        ? prev.filter(id => id !== tourId)
        : [...prev, tourId]

      // Save to localStorage (only on client)
      if (typeof window !== 'undefined') {
        localStorage.setItem('ts32-wishlist', JSON.stringify(newWishlist))
      }
      return newWishlist
    })
  }, [])

  const handleQuickBook = useCallback((tour: MockTour) => {
    // Track booking modal opened
    analytics.trackLeadFormOpened(tour as any, 'quick_book')
    setSelectedTourForBooking(tour)
    setShowBookingModal(true)
  }, [analytics])

  // Flash Sale logic - same as in TourCardComponent
  const getIsFlashSale = useCallback((tourId: string) => {
    const hash = tourId.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0)
      return a & a
    }, 0)
    return Math.abs(hash) % 4 === 0 // 25% chance
  }, [])

  const handleTourClick = useCallback((tour: MockTour, position: number) => {
    // Track tour click
    analytics.trackTourClick(tour as any, position, 'grid', 'search_results')
  }, [analytics])

  const handleFirstCardExpandToggle = useCallback((tourId: string) => {
    setIsFirstCardCompact(prev => !prev)
  }, [])

  const handleSecondCardExpandToggle = useCallback((tourId: string) => {
    setIsSecondCardCompact(prev => !prev)
  }, [])

  const handleThirdCardExpandToggle = useCallback((tourId: string) => {
    setIsThirdCardCompact(prev => !prev)
  }, [])

  const handleFourthCardExpandToggle = useCallback((tourId: string) => {
    setIsFourthCardCompact(prev => !prev)
  }, [])

  const handleFifthCardExpandToggle = useCallback((tourId: string) => {
    setIsFifthCardCompact(prev => !prev)
  }, [])

  const handleSixthCardExpandToggle = useCallback((tourId: string) => {
    setIsSixthCardCompact(prev => !prev)
  }, [])

  const handleSeventhCardExpandToggle = useCallback((tourId: string) => {
    setIsSeventhCardCompact(prev => !prev)
  }, [])

  const handleEighthCardExpandToggle = useCallback((tourId: string) => {
    setIsEighthCardCompact(prev => !prev)
  }, [])

  const scrollToTop = useCallback(() => {
    topRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  // Effects
  useEffect(() => {
    // Set mounted state
    setIsMounted(true)

    // Load wishlist from localStorage (only on client)
    if (typeof window !== 'undefined') {
      const savedWishlist = localStorage.getItem('ts32-wishlist')
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist))
      }

      // Load search history
      const savedHistory = localStorage.getItem('tour-search-35-history')
      if (savedHistory) {
        setSearchHistory(JSON.parse(savedHistory))
      }
    }

    // Simulate initial load
    setTimeout(() => {
      setIsLoading(false)
      console.log('✅ Tour cards loaded successfully:', mockAsianTours.length, 'tours')
      // Optional: Show success toast
      // toast.success('โหลดทัวร์สำเร็จ!')
    }, 1500)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const handleScroll = () => {
      const scrollY = window.scrollY

      // Show back-to-top button only after scrolling past search results header
      const resultsHeader = document.getElementById('search-results-header')
      if (resultsHeader) {
        const headerRect = resultsHeader.getBoundingClientRect()
        const isHeaderAboveViewport = headerRect.bottom < 0
        setShowBackToTop(isHeaderAboveViewport && scrollY > 800)
      } else {
        // Fallback: show after scrolling significantly past hero section
        setShowBackToTop(scrollY > 800)
      }

      // Handle search container smooth sticky behavior
      const searchContainer = searchContainerRef.current
      if (searchContainer) {
        const containerRect = searchContainer.getBoundingClientRect()

        // Add scrolled class when search container starts to stick
        // This happens when the container reaches the top position (4rem from top)
        if (containerRect.top <= 64) { // 64px = 4rem = header height
          searchContainer.classList.add('scrolled')
        } else {
          searchContainer.classList.remove('scrolled')
        }
      }

      // Show sticky CTA only after scrolling past controls bar
      const controlsBar = document.querySelector('.ts32-controls-bar')
      if (controlsBar) {
        const rect = controlsBar.getBoundingClientRect()
        // Show CTA when controls bar is scrolled out of view (bottom < 0)
        const shouldShow = rect.bottom < 0
        setShowStickyCTA(shouldShow)
        // Debug log
        if (shouldShow !== showStickyCTA) {
          console.log('Sticky CTA visibility changed:', { shouldShow, bottom: rect.bottom, searchResultsLength: mockAsianTours.length })
        }
      } else {
        // Fallback: show after scrolling 600px if controls bar not found
        setShowStickyCTA(scrollY > 600)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMounted])

  // SEO and Analytics tracking
  useEffect(() => {
    // Track search performance
    if (searchQuery || Object.keys(filters).length > 0) {
      searchPerformance.startSearch(searchQuery, filters)
    }
  }, [searchQuery, filters, searchPerformance])

  useEffect(() => {
    // Complete search tracking and announce results
    if (!isSearching) {
      searchPerformance.endSearch(mockAsianTours.length)
      a11y.announceSearchResults(searchQuery, mockAsianTours.length, filters)
    }
  }, [isSearching, searchQuery, filters, searchPerformance, a11y])

  useEffect(() => {
    if (!isMounted) return

    try {
      // Update document meta tags for SEO - Temporarily disabled
      // const metaTags = seo.generateSearchPageMeta(searchQuery, filters, mockAsianTours.length)
      const metaTags = {
        title: searchQuery ? `ค้นหา "${searchQuery}" - ทัวร์เอเชีย` : 'ทัวร์เอเชียแนะนำ',
        description: 'ค้นหาและเปรียบเทียบทัวร์เอเชียจากบริษัททัวร์ชั้นนำ พร้อมราคาดีที่สุด',
        canonical: '/tour-search-52'
      }

      // Update title
      if (document && document.title !== undefined) {
        document.title = metaTags.title
      }

      // Update meta description
      let metaDescription = document.querySelector('meta[name="description"]')
      if (!metaDescription) {
        metaDescription = document.createElement('meta')
        metaDescription.setAttribute('name', 'description')
        document.head.appendChild(metaDescription)
      }
      metaDescription.setAttribute('content', metaTags.description)

      // Update canonical URL
      let canonicalLink = document.querySelector('link[rel="canonical"]')
      if (!canonicalLink) {
        canonicalLink = document.createElement('link')
        canonicalLink.setAttribute('rel', 'canonical')
        document.head.appendChild(canonicalLink)
      }
      canonicalLink.setAttribute('href', metaTags.canonical)
    } catch (error) {
      console.warn('SEO meta tags update failed:', error)
    }

    // Add structured data - DISABLED for new mock data structure
    // TODO: Update SEO system to work with new MockTour interface
    // Temporarily disabled to prevent errors with mock data
    /*
    try {
      const structuredData = seo.generateSearchPageStructuredData(
        searchQuery,
        filters,
        [], // Empty array to prevent errors with mock data
        mockAsianTours.length
      )

      let scriptTag = document.querySelector('#ts32-structured-data')
      if (!scriptTag) {
        scriptTag = document.createElement('script')
        scriptTag.id = 'ts32-structured-data'
        scriptTag.type = 'application/ld+json'
        document.head.appendChild(scriptTag)
      }
      scriptTag.textContent = JSON.stringify(structuredData)
    } catch (error) {
      console.warn('SEO structured data generation failed:', error)
    }
    */
  }, [searchQuery, filters, isMounted])

  // Sort options
  const sortOptionsList = [
    { value: 'popularity', label: 'ความนิยม', description: 'ทัวร์ที่ได้รับความสนใจมากที่สุด' },
    { value: 'price-low', label: 'ราคาต่ำ → สูง', description: 'เรียงจากราคาถูกที่สุด' },
    { value: 'price-high', label: 'ราคาสูง → ต่ำ', description: 'เรียงจากราคาแพงที่สุด' },
    { value: 'rating', label: 'คะแนนสูงสุด', description: 'ทัวร์ที่ได้รับรีวิวดีที่สุด' },
    { value: 'departure_date', label: 'วันเดินทางใกล้สุด', description: 'เรียงตามวันออกเดินทาง' },
    { value: 'discount', label: 'ส่วนลดสูงสุด', description: 'โปรโมชั่นดีที่สุด' }
  ]

  const handleSortChange = (value: string) => {
    const [field, direction = 'desc'] = value.split('-')
    setSortOptions({
      field: field as SearchSortOptions['field'],
      direction: direction as 'asc' | 'desc'
    })
  }

  const currentSortValue = sortOptions.direction === 'asc' ?
    `${sortOptions.field}-asc` : sortOptions.field

  // Calculate active filters count
  const activeFiltersCount = Object.values(filters).filter(value => {
    if (Array.isArray(value)) return value.length > 0
    return value !== undefined && value !== null && value !== ''
  }).length

  return (
    <div className="ts32-container">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <style>{tourSearchStyles}</style>

      {/* ARIA Live Regions for Screen Readers */}
      <div id="ts32-announcements" aria-live="polite" aria-atomic="true" className="sr-only" />
      <div id="ts32-search-status" aria-live="polite" aria-atomic="true" className="sr-only" />
      <div id="ts32-filter-status" aria-live="polite" aria-atomic="false" className="sr-only" />
      <div id="ts32-errors" aria-live="assertive" aria-atomic="true" className="sr-only" />

      <div ref={topRef} />


      {/* Search Container */}
      <div className="sticky top-16 z-40 bg-white border-b border-gray-200 shadow-sm px-4 py-2 transition-all duration-300">
        <div className="flex gap-3">
          <div className="flex-1 relative" data-search-container="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-6 h-6 z-10">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
            <input
              ref={searchContainerRef}
              type="text"
              placeholder={searchTerm ? '' : animatedPlaceholder}
              className="w-full pl-14 pr-24 text-lg border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:outline-none transition-colors h-[68px] flex items-center"
              aria-label="ค้นหาทัวร์"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setShowSearchSuggestions(true)
              }}
              onFocus={() => setShowSearchSuggestions(true)}
              onBlur={(e) => {
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
            <button
              onClick={handleVoiceSearch}
              disabled={isVoiceSearching}
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center ${isVoiceSearching
                ? 'bg-red-100 text-red-600'
                : 'hover:bg-gray-100 text-gray-600'
                }`}
              aria-label="ค้นหาด้วยเสียง"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                <line x1="12" x2="12" y1="19" y2="22"></line>
              </svg>
            </button>

            {/* Search Suggestions */}
            {showSearchSuggestions && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-30 max-h-96 overflow-hidden">
                <div className="relative">
                  <div className="max-h-96 overflow-y-auto">
                    {/* Search History */}
                    {searchHistory.length > 0 && (
                      <div className="border-b border-gray-100">
                        <div className="flex items-center justify-between p-4 pb-2">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span className="text-sm font-medium text-gray-700">ประวัติการค้นหา</span>
                          </div>
                          <button
                            onClick={clearSearchHistory}
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                          >
                            ลบทั้งหมด
                          </button>
                        </div>
                        <div className="space-y-2 px-4 pb-4">
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
                        {staticSearchSuggestions.popular.map((suggestion, index) => (
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
                  </div>
                </div>
              </div>
            )}

            {/* Voice Search Status */}
            {isVoiceSearching && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-red-50 border-2 border-red-200 rounded-xl p-4 z-30">
                <div className="flex items-center gap-3 text-red-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 animate-pulse">
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                    <line x1="12" x2="12" y1="19" y2="22"></line>
                  </svg>
                  <span className="font-medium">กำลังฟัง... พูดชื่อจุดหมายที่ต้องการ</span>
                </div>
              </div>
            )}
          </div>
          <button
            onClick={() => setShowAdvancedModal(true)}
            className="text-blue-600 hover:text-blue-700 transition-colors duration-200 text-sm font-medium border-2 border-gray-300 rounded-xl hover:border-blue-600 bg-white relative flex items-center justify-center"
            style={{ height: '68px', minWidth: '68px' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
          </button>
        </div>
      </div>

      {/* Popular Destinations Carousel */}
      <section className={`py-6 ${showAdvancedModal ? 'hidden' : ''}`}>
        <div className="text-center mb-8 px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">จุดหมายยอดนิยม</h2>
          <p className="text-gray-600 text-sm md:text-base">สำรวจจุดหมายที่นักเดินทางทั่วโลกหลงใหล</p>
        </div>

        {/* Carousel Container */}
        <div className="relative px-4">
          {/* Main Carousel */}
          <div
            className="overflow-hidden"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentDestinationIndex * 88}%)`,
              }}
            >
              {destinationsData.map((country, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 flex justify-center px-2"
                  style={{ width: '88%' }}
                >
                  <div className="w-full max-w-md group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 bg-white">
                    {/* Main Image Container */}
                    <div className="relative h-48 md:h-56 overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                        style={{ backgroundImage: `url(${country.bgImage})` }}
                      ></div>

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                      {/* Top Elements */}
                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-lg">
                          <Image
                            src={`/icons/destinations/flag-icons-main/flags/1x1/${country.flagCode}.svg`}
                            alt={`${country.name} flag`}
                            width={32}
                            height={32}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                          <span className="text-yellow-500 text-xs">⭐</span>
                          <span className="text-xs font-medium text-gray-800">{country.rating}</span>
                        </div>
                      </div>

                      <div className="absolute top-4 right-4">
                        <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                          -{country.discount}%
                        </div>
                      </div>

                      {/* Bottom Content in Image */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white text-lg md:text-xl font-bold mb-1 drop-shadow-lg">{country.name}</h3>
                        <p className="text-white/90 text-sm mb-2 drop-shadow">{country.description}</p>
                        <div className="text-white/80 text-xs drop-shadow">
                          {country.tours} • ฤดูท่องเที่ยว: {country.season}
                        </div>
                      </div>
                    </div>

                    {/* Content Card */}
                    <div className="p-4 bg-white">
                      {/* Price Section */}
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="text-xs text-gray-500 font-medium mb-1 text-left">ราคาเริ่มต้น</div>
                          <div className="flex flex-col items-start">
                            <span className="text-xs text-gray-500 line-through">{country.originalPrice}</span>
                            <div className="flex items-baseline gap-1">
                              <span className="text-2xl md:text-3xl font-black text-orange-600 drop-shadow-sm">{country.price}</span>
                            </div>
                            <span className="text-xs font-medium text-green-600">
                              ประหยัด ฿{(parseInt(country.originalPrice.replace('฿', '').replace(',', '')) - parseInt(country.price.replace('฿', '').replace(',', ''))).toLocaleString()}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleSearch(`ทัวร์${country.name}`)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:shadow-lg transition-all transform hover:scale-105"
                        >
                          ดูทัวร์
                        </button>
                      </div>

                      {/* Cities Toggle Button */}
                      <div className="mt-4 text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            const isCurrentlyExpanded = expandedCountries[country.name]

                            if (!isCurrentlyExpanded) {
                              // If expanding current card, also expand all other cards
                              const allExpanded = destinationsData.reduce((acc, dest) => ({
                                ...acc,
                                [dest.name]: true
                              }), {})
                              setExpandedCountries(allExpanded)
                            } else {
                              // If collapsing, only collapse current card
                              setExpandedCountries(prev => ({
                                ...prev,
                                [country.name]: false
                              }))
                            }
                          }}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center justify-center gap-1 w-full py-2 hover:bg-blue-50 rounded-lg transition-all group"
                        >
                          <style jsx>{`
                            @keyframes gentleBounce {
                              0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                              40% { transform: translateY(-3px); }
                              60% { transform: translateY(-2px); }
                            }
                          `}</style>
                          ดูเมืองยอดนิยมทั้งหมด
                          <svg
                            className={`w-4 h-4 transition-all duration-300 group-hover:animate-none ${expandedCountries[country.name] ? 'rotate-180' : ''}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            style={{ animation: 'gentleBounce 2s ease-in-out infinite' }}
                          >
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>

                      {/* Expanded Cities List */}
                      {expandedCountries[country.name] && (
                        <div className="mt-4 border-t pt-4">
                          <h4 className="text-sm font-semibold text-gray-700 mb-3">เมืองยอดนิยมใน{country.name}</h4>
                          <div className="space-y-2">
                            {country.cities?.map((city, cityIdx) => (
                              <div key={cityIdx} className="flex items-center justify-between py-3 px-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg hover:from-blue-50 hover:to-blue-100 transition-all group">
                                <div className="flex items-center gap-3">
                                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                                    <div
                                      className="w-full h-full bg-cover bg-center opacity-80 group-hover:opacity-100 transition-opacity"
                                      style={{ backgroundImage: `url(${city.bgImage || country.bgImage})` }}
                                    ></div>
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-sm font-semibold text-gray-800">{city.name}</span>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        handleSearch(`ทัวร์${city.name}`)
                                      }}
                                      className="text-xs text-blue-600 hover:text-blue-800 hover:underline text-left font-medium transition-colors flex items-center gap-1"
                                    >
                                      ดูทัวร์{city.name} ราคาเริ่มต้น {city.price}
                                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6" style={{ gap: '4px' }}>
            {destinationsData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`rounded-full transition-all duration-200 ${idx === currentDestinationIndex
                  ? 'bg-blue-600'
                  : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                style={{
                  width: '10px',
                  height: '10px',
                  minWidth: '10px',
                  minHeight: '10px'
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Special Tour Packages */}
      <section className={`ts32-popular-destinations ${showAdvancedModal ? 'hidden' : ''}`} style={{ marginTop: '2rem' }}>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">แพ็กเกจทัวร์พิเศษ</h2>
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0 snap-x snap-mandatory md:snap-none">
          <div className="group flex-shrink-0 w-80 md:w-auto bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden snap-center md:snap-align-none cursor-pointer">
            <div className="relative h-44 md:h-48 overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800&h=600&fit=crop&auto=format&q=80)' }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                <div className="flex flex-col gap-2">
                  <span className="inline-flex items-center gap-1.5 bg-blue-600 text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-lg">
                    <span>🌸</span>
                    <span>ซากุระ</span>
                  </span>
                  <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                    <span className="text-yellow-500 text-xs">⭐</span>
                    <span className="text-xs font-medium text-gray-800">4.8</span>
                    <span className="text-xs text-gray-600">(256)</span>
                  </div>
                </div>
                <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">-22%</div>
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <h4 className="text-white text-lg font-bold mb-1 drop-shadow-lg">ทัวร์ญี่ปุ่น ซากุระ</h4>
                <p className="text-white/90 text-xs mb-2 drop-shadow">Tokyo • Kyoto • Osaka</p>
                <div className="text-white/80 text-xs drop-shadow flex items-center gap-2">
                  <span>🕒 5 วัน 4 คืน</span>
                  <span>•</span>
                  <span>ซากุระบานเต็มที่</span>
                </div>
              </div>
            </div>
            <div className="p-4">
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">ชมความงามของดอกซากุระ เที่ยววัดเก่าแก่ โตเกียว เกียวโต</p>
              <div className="flex flex-wrap gap-1 mb-4">
                <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full border border-green-200">เที่ยวบิน</span>
                <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full border border-green-200">โรงแรม 4*</span>
                <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full border border-green-200">มื้ออาหาร</span>
                <span className="bg-gray-50 text-gray-600 text-xs px-2 py-1 rounded-full border border-gray-200">+1</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-2xl font-bold text-gray-800">฿25,900</span>
                    <span className="text-sm text-gray-500 line-through">฿32,900</span>
                  </div>
                  <div className="text-xs text-gray-600">ราคาต่อคน</div>
                </div>
                <div className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:shadow-lg transition-all duration-300 hover:scale-105">จองเลย</div>
              </div>

              {/* Toggle Button for Package Details */}
              <div className="mt-4 border-t pt-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setExpandedCountries(prev => ({
                      ...prev,
                      'sakura-package': !prev['sakura-package']
                    }))
                  }}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center justify-center gap-1 w-full py-2 hover:bg-blue-50 rounded-lg transition-all"
                >
                  ดูรายละเอียดเพิ่มเติม
                  <svg
                    className={`w-4 h-4 transition-transform ${expandedCountries['sakura-package'] ? 'rotate-180' : ''}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              {/* Expanded Package Details */}
              {expandedCountries['sakura-package'] && (
                <div className="mt-4 border-t pt-4">
                  {/* Cherry Blossom Spots */}
                  <div>
                    <h5 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2 text-center justify-center">
                      <span className="text-lg">🌸</span> สปอตยอดฮิต
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="relative group bg-gradient-to-br from-pink-100 via-pink-50 to-rose-50 p-4 rounded-xl shadow-sm border border-pink-100 hover:shadow-md hover:border-pink-200 transition-all duration-300 transform hover:-translate-y-1">
                        <div className="absolute top-2 right-2 text-pink-400 opacity-60 group-hover:opacity-100 transition-opacity">🌸</div>
                        <div className="text-sm font-semibold text-gray-800 mb-2">อุทยานอุเอโนะ</div>
                        <div className="text-xs text-gray-600 leading-relaxed">
                          <div className="flex items-center gap-1 mb-1">
                            <span className="inline-block w-1 h-1 bg-pink-400 rounded-full"></span>
                            <span>ซากุระกว่า 1,000 ต้น</span>
                          </div>
                          <div className="text-xs text-gray-500">สวนสาธารณะใหญ่ที่สุดในโตเกียว มีพิพิธภัณฑ์และสวนสัตว์</div>
                        </div>
                      </div>
                      <div className="relative group bg-gradient-to-br from-blue-100 via-blue-50 to-cyan-50 p-4 rounded-xl shadow-sm border border-blue-100 hover:shadow-md hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-1">
                        <div className="absolute top-2 right-2 text-blue-400 opacity-60 group-hover:opacity-100 transition-opacity">🌊</div>
                        <div className="text-sm font-semibold text-gray-800 mb-2">แม่น้ำเมกุโระ</div>
                        <div className="text-xs text-gray-600 leading-relaxed">
                          <div className="flex items-center gap-1 mb-1">
                            <span className="inline-block w-1 h-1 bg-blue-400 rounded-full"></span>
                            <span>ซากุระริมคลองยาว 4 กม.</span>
                          </div>
                          <div className="text-xs text-gray-500">ทางเดินซากุระสุดโรแมนติก มีร้านอาหารริมน้ำ</div>
                        </div>
                      </div>
                      <div className="relative group bg-gradient-to-br from-amber-100 via-amber-50 to-orange-50 p-4 rounded-xl shadow-sm border border-amber-100 hover:shadow-md hover:border-amber-200 transition-all duration-300 transform hover:-translate-y-1">
                        <div className="absolute top-2 right-2 text-amber-400 opacity-60 group-hover:opacity-100 transition-opacity">🏰</div>
                        <div className="text-sm font-semibold text-gray-800 mb-2">ปราสาทโอซาก้า</div>
                        <div className="text-xs text-gray-600 leading-relaxed">
                          <div className="flex items-center gap-1 mb-1">
                            <span className="inline-block w-1 h-1 bg-amber-400 rounded-full"></span>
                            <span>สวนนิชิโนมารุ</span>
                          </div>
                          <div className="text-xs text-gray-500">ปราสาทประวัติศาสตร์ มีซากุระ 4,300 ต้น วิวสวยงาม</div>
                        </div>
                      </div>
                      <div className="relative group bg-gradient-to-br from-emerald-100 via-emerald-50 to-green-50 p-4 rounded-xl shadow-sm border border-emerald-100 hover:shadow-md hover:border-emerald-200 transition-all duration-300 transform hover:-translate-y-1">
                        <div className="absolute top-2 right-2 text-emerald-400 opacity-60 group-hover:opacity-100 transition-opacity">🎋</div>
                        <div className="text-sm font-semibold text-gray-800 mb-2">ป่าไผ่อารายาม่า</div>
                        <div className="text-xs text-gray-600 leading-relaxed">
                          <div className="flex items-center gap-1 mb-1">
                            <span className="inline-block w-1 h-1 bg-emerald-400 rounded-full"></span>
                            <span>ป่าไผ่เมืองเกียวโต</span>
                          </div>
                          <div className="text-xs text-gray-500">ทางเดินไผ่สีเขียวสวยงาม บรรยากาศเงียบสงบ</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="group flex-shrink-0 w-80 md:w-auto bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden snap-center md:snap-align-none cursor-pointer">
            <div className="relative h-44 md:h-48 overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop&auto=format&q=80)' }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                <div className="flex flex-col gap-2">
                  <span className="inline-flex items-center gap-1.5 bg-blue-600 text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-lg">
                    <span>🎵</span>
                    <span>K-POP</span>
                  </span>
                  <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                    <span className="text-yellow-500 text-xs">⭐</span>
                    <span className="text-xs font-medium text-gray-800">4.7</span>
                    <span className="text-xs text-gray-600">(198)</span>
                  </div>
                </div>
                <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">-20%</div>
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <h4 className="text-white text-lg font-bold mb-1 drop-shadow-lg">เกาหลี K-POP</h4>
                <p className="text-white/90 text-xs mb-2 drop-shadow">Seoul • Busan • Jeju</p>
                <div className="text-white/80 text-xs drop-shadow flex items-center gap-2">
                  <span>🕒 4 วัน 3 คืน</span>
                  <span>•</span>
                  <span>คอนเสิร์ต K-POP</span>
                </div>
              </div>
            </div>
            <div className="p-4">
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">สัมผัสวัฒนธรรมเกาหลี ช้อปปิ้งเมียงดง ชม K-POP Concert</p>
              <div className="flex flex-wrap gap-1 mb-4">
                <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full border border-green-200">เที่ยวบิน</span>
                <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full border border-green-200">โรงแรม 3*</span>
                <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full border border-green-200">มื้ออาหาร</span>
                <span className="bg-gray-50 text-gray-600 text-xs px-2 py-1 rounded-full border border-gray-200">+1</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-2xl font-bold text-gray-800">฿15,900</span>
                    <span className="text-sm text-gray-500 line-through">฿19,900</span>
                  </div>
                  <div className="text-xs text-gray-600">ราคาต่อคน</div>
                </div>
                <div className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:shadow-lg transition-all duration-300 hover:scale-105">จองเลย</div>
              </div>
            </div>
          </div>
          <div className="group flex-shrink-0 w-80 md:w-auto bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden snap-center md:snap-align-none cursor-pointer">
            <div className="relative h-44 md:h-48 overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&h=600&fit=crop&auto=format&q=80)' }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                <div className="flex flex-col gap-2">
                  <span className="inline-flex items-center gap-1.5 bg-blue-600 text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-lg">
                    <span>🍜</span>
                    <span>อาหาร</span>
                  </span>
                  <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                    <span className="text-yellow-500 text-xs">⭐</span>
                    <span className="text-xs font-medium text-gray-800">4.6</span>
                    <span className="text-xs text-gray-600">(142)</span>
                  </div>
                </div>
                <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">-23%</div>
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <h4 className="text-white text-lg font-bold mb-1 drop-shadow-lg">ทัวร์ไต้หวัน Street Food</h4>
                <p className="text-white/90 text-xs mb-2 drop-shadow">Taipei • Taichung • Kaohsiung</p>
                <div className="text-white/80 text-xs drop-shadow flex items-center gap-2">
                  <span>🕒 3 วัน 2 คืน</span>
                  <span>•</span>
                  <span>ตลาดกลางคืนขึ้นชื่อ</span>
                </div>
              </div>
            </div>
            <div className="p-4">
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">ลิ้มรสอาหารข้างถนน ตลาดกลางคืน ไทเป 101</p>
              <div className="flex flex-wrap gap-1 mb-4">
                <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full border border-green-200">เที่ยวบิน</span>
                <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full border border-green-200">โรงแรม 3*</span>
                <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full border border-green-200">ไกด์</span>
                <span className="bg-gray-50 text-gray-600 text-xs px-2 py-1 rounded-full border border-gray-200">+1</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-2xl font-bold text-gray-800">฿9,900</span>
                    <span className="text-sm text-gray-500 line-through">฿12,900</span>
                  </div>
                  <div className="text-xs text-gray-600">ราคาต่อคน</div>
                </div>
                <div className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:shadow-lg transition-all duration-300 hover:scale-105">จองเลย</div>
              </div>
            </div>
          </div>
          <div className="group flex-shrink-0 w-80 md:w-auto bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden snap-center md:snap-align-none cursor-pointer">
            <div className="relative h-44 md:h-48 overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&h=600&fit=crop&auto=format&q=80)' }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                <div className="flex flex-col gap-2">
                  <span className="inline-flex items-center gap-1.5 bg-blue-600 text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-lg">
                    <span>🏰</span>
                    <span>ปราสาท</span>
                  </span>
                  <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                    <span className="text-yellow-500 text-xs">⭐</span>
                    <span className="text-xs font-medium text-gray-800">4.9</span>
                    <span className="text-xs text-gray-600">(89)</span>
                  </div>
                </div>
                <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">-30%</div>
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <h4 className="text-white text-lg font-bold mb-1 drop-shadow-lg">ยุโรป 4 ประเทศ</h4>
                <p className="text-white/90 text-xs mb-2 drop-shadow">Italy • Swiss • France • Germany</p>
                <div className="text-white/80 text-xs drop-shadow flex items-center gap-2">
                  <span>🕒 8 วัน 6 คืน</span>
                  <span>•</span>
                  <span>ปราสาทโบราณ 4 ประเทศ</span>
                </div>
              </div>
            </div>
            <div className="p-4">
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">เยือนปราสาทโบราณ อิตาลี สวิส ฝรั่งเศส เยอรมนี</p>
              <div className="flex flex-wrap gap-1 mb-4">
                <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full border border-green-200">เที่ยวบิน</span>
                <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full border border-green-200">โรงแรม 4*</span>
                <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full border border-green-200">มื้ออาหาร</span>
                <span className="bg-gray-50 text-gray-600 text-xs px-2 py-1 rounded-full border border-gray-200">+1</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-2xl font-bold text-gray-800">฿45,900</span>
                    <span className="text-sm text-gray-500 line-through">฿65,900</span>
                  </div>
                  <div className="text-xs text-gray-600">ราคาต่อคน</div>
                </div>
                <div className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:shadow-lg transition-all duration-300 hover:scale-105">จองเลย</div>
              </div>
            </div>
          </div>
          <div className="group flex-shrink-0 w-80 md:w-auto bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden snap-center md:snap-align-none cursor-pointer">
            <div className="relative h-44 md:h-48 overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&auto=format&q=80)' }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                <div className="flex flex-col gap-2">
                  <span className="inline-flex items-center gap-1.5 bg-blue-600 text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-lg">
                    <span>🎡</span>
                    <span>ครอบครัว</span>
                  </span>
                  <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                    <span className="text-yellow-500 text-xs">⭐</span>
                    <span className="text-xs font-medium text-gray-800">4.9</span>
                    <span className="text-xs text-gray-600">(234)</span>
                  </div>
                </div>
                <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">-18%</div>
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <h4 className="text-white text-lg font-bold mb-1 drop-shadow-lg">โตเกียว ดิสนีย์แลนด์</h4>
                <p className="text-white/90 text-xs mb-2 drop-shadow">Tokyo Disneyland • DisneySea</p>
                <div className="text-white/80 text-xs drop-shadow flex items-center gap-2">
                  <span>🕒 5 วัน 3 คืน</span>
                  <span>•</span>
                  <span>ครอบครัวและเด็ก</span>
                </div>
              </div>
            </div>
            <div className="p-4">
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">ครอบครัวสนุก ดิสนีย์แลนด์ ดิสนีย์ซี ช้อปปิ้งชิบุยะ</p>
              <div className="flex flex-wrap gap-1 mb-4">
                <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full border border-green-200">เที่ยวบิน</span>
                <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full border border-green-200">โรงแรม 4*</span>
                <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full border border-green-200">ตั้วดิสนีย์</span>
                <span className="bg-gray-50 text-gray-600 text-xs px-2 py-1 rounded-full border border-gray-200">+1</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-2xl font-bold text-gray-800">฿32,900</span>
                    <span className="text-sm text-gray-500 line-through">฿39,900</span>
                  </div>
                  <div className="text-xs text-gray-600">ราคาต่อคน</div>
                </div>
                <div className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:shadow-lg transition-all duration-300 hover:scale-105">จองเลย</div>
              </div>
            </div>
          </div>
          <div className="group flex-shrink-0 w-80 md:w-auto bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden snap-center md:snap-align-none cursor-pointer">
            <div className="relative h-44 md:h-48 overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&h=600&fit=crop&auto=format&q=80)' }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                <div className="flex flex-col gap-2">
                  <span className="inline-flex items-center gap-1.5 bg-blue-600 text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-lg">
                    <span>🛍️</span>
                    <span>ช้อปปิ้ง</span>
                  </span>
                  <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                    <span className="text-yellow-500 text-xs">⭐</span>
                    <span className="text-xs font-medium text-gray-800">4.5</span>
                    <span className="text-xs text-gray-600">(167)</span>
                  </div>
                </div>
                <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">-24%</div>
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <h4 className="text-white text-lg font-bold mb-1 drop-shadow-lg">สิงคโปร์ มาเลเซีย</h4>
                <p className="text-white/90 text-xs mb-2 drop-shadow">Singapore • Kuala Lumpur</p>
                <div className="text-white/80 text-xs drop-shadow flex items-center gap-2">
                  <span>🕒 4 วัน 3 คืน</span>
                  <span>•</span>
                  <span>ช้อปปิ้งสุดคุ้ม</span>
                </div>
              </div>
            </div>
            <div className="p-4">
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">ไดเวอร์สิตี้ แหล่งช้อปปิ้ง อาหารนานาชาติ</p>
              <div className="flex flex-wrap gap-1 mb-4">
                <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full border border-green-200">เที่ยวบิน</span>
                <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full border border-green-200">โรงแรม 4*</span>
                <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full border border-green-200">มื้ออาหาร</span>
                <span className="bg-gray-50 text-gray-600 text-xs px-2 py-1 rounded-full border border-gray-200">+1</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-2xl font-bold text-gray-800">฿18,900</span>
                    <span className="text-sm text-gray-500 line-through">฿24,900</span>
                  </div>
                  <div className="text-xs text-gray-600">ราคาต่อคน</div>
                </div>
                <div className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:shadow-lg transition-all duration-300 hover:scale-105">จองเลย</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Controls Bar - Hidden since we only use grid view */}
      <div className="hidden">
        {/* Removed ViewToggle and SortDropdown as we use fixed grid layout */}
      </div>

      {/* Results Section */}
      <main id="search-results" className={`max-w-7xl mx-auto px-4 py-8 ${showAdvancedModal ? 'hidden' : ''}`}>
        {/* Results Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 id="search-results-header" className="text-2xl font-bold text-gray-900 mb-2">
                ทัวร์เอเชียแนะนำ
              </h2>
              <p className="text-gray-600">
                ทัวร์ยอดนิยม พร้อมข้อมูลครบถ้วน ราคาดีที่สุด
              </p>
            </div>
            <div className="flex items-center space-x-3">
              {isLoading ? (
                <>
                  <div className="bg-gray-200 animate-pulse h-8 w-20 rounded-full"></div>
                  <div className="bg-gray-200 animate-pulse h-8 w-24 rounded-full"></div>
                </>
              ) : (
                <>
                  <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-semibold text-sm flex items-center space-x-2">
                    <span>พบ {mockAsianTours.length} ทัวร์</span>
                  </div>
                  <div className="bg-green-50 text-green-700 px-4 py-2 rounded-full font-semibold text-sm flex items-center space-x-1">
                    <Sparkles className="w-4 h-4" />
                    <span>ราคาพิเศษ</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* New Tour Cards Grid - Mobile First: 1 col, Tablet: 2 cols, Desktop: 4 cols */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="animate-slideInUp stagger-animation"
                style={{ '--stagger': index } as React.CSSProperties}
              >
                <TourCardSkeleton />
              </div>
            ))}
          </div>
        ) : mockAsianTours.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">ไม่พบทัวร์ที่ตรงกับการค้นหา</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              ลองปรับเปลี่ยนคำค้นหาหรือตัวกรองเพื่อค้นหาทัวร์ที่เหมาะกับคุณ
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                setSearchQuery('')
                setSearchTerm('')
                // Reset filters if needed
              }}
              className="inline-flex items-center space-x-2"
            >
              <Sparkles className="w-5 h-5" />
              <span>ดูทัวร์ทั้งหมด</span>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {mockAsianTours.map((tour, index) => (
              <div
                key={tour.id}
                className="animate-slideInUp stagger-animation"
                style={{ '--stagger': index } as React.CSSProperties}
              >
                <NewTourCard
                  tour={tour}
                  onInquire={() => setLeadModal({ isOpen: true, tour: tour })}
                  onBook={() => {
                    setSelectedTourForBooking(tour)
                    setShowBookingModal(true)
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Advanced Filter Modal (copied from tour-search-13) */}
      {showAdvancedModal && (
        <div className="fixed inset-0 z-[1500] bg-black/20 backdrop-blur-sm lg:hidden">
          <div className="absolute inset-0 bg-white animate-in slide-in-from-top duration-300">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex-1 overflow-y-auto p-4 pb-2 space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-base font-semibold text-gray-900">🌍 ประเทศทั้งหมด</h3>
                    <button
                      onClick={() => setShowAdvancedModal(false)}
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
                        className={`p-3 rounded-lg border transition-all duration-200 text-left ${selectedCountry === country.name
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
                          className={`relative py-2 px-3 rounded-lg border text-sm font-medium transition-all ${isDisabled
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
                        className={`p-4 rounded-xl border-2 transition-all duration-200 ${selectedPeople === people.value
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
                        className={`p-4 rounded-xl border-2 transition-all duration-200 ${selectedRating === rating.value
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
                        className={`p-4 rounded-xl border-2 transition-all duration-200 ${selectedTourType === type.value
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
                        className={`p-4 rounded-xl border-2 transition-all duration-200 ${selectedBudget === budget.value
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
                        className={`p-4 rounded-xl border-2 transition-all duration-200 ${selectedDuration === duration.value
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
                  onClick={() => setShowAdvancedModal(false)}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  ค้นหาทัวร์ ({mockAsianTours.length} ผลลัพธ์)
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

      {/* Lead Capture Modal */}
      <LeadCaptureModal
        isOpen={leadModal.isOpen}
        onClose={() => {
          setLeadModal({ isOpen: false })
          a11y.disableModalFocusTrap()
        }}
        tour={leadModal.tour as any}
      />

      {/* Sticky CTA (Mobile) */}
      {showStickyCTA && mockAsianTours.length > 0 && !showAdvancedModal && (
        <div className="ts32-sticky-cta" style={{ backgroundColor: 'white', zIndex: 9999 }}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600">
                พบ {mockAsianTours.length} ทัวร์
              </div>
              <div className="text-lg font-bold text-blue-600">
                เริ่มต้น ฿{Math.min(...mockAsianTours.map(t => t.pricing.salePrice)).toLocaleString()}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors text-sm"
                onClick={() => setShowAdvancedModal(true)}
              >
                <Filter className="w-4 h-4" />
                ตัวกรอง
              </button>

              <Button
                variant="primary"
                size="sm"
                leftIcon={<Zap className="w-4 h-4" />}
                onClick={() => {
                  setShowBookingModal(true)
                }}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0 font-bold shadow-md"
              >
                จองด่วน
              </Button>
            </div>
          </div>
        </div>
      )}


      {/* Floating Action Buttons */}
      {!showAdvancedModal && (
        <div className="fixed bottom-6 right-4 z-50 flex flex-col space-y-3">
          {/* Filter Button - Mobile Only */}
          <button
            onClick={() => setShowFilters(true)}
            className="lg:hidden bg-white hover:bg-gray-50 text-gray-700 p-3 rounded-full shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-xl"
            aria-label="เปิดตัวกรอง"
          >
            <Filter className="w-5 h-5" />
          </button>

          {/* Back to Top Button */}
          <button
            className={`${showBackToTop ? 'visible opacity-100' : 'opacity-0 pointer-events-none'} bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl transform hover:scale-105`}
            onClick={scrollToTop}
            aria-label="กลับไปด้านบน"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Booking Modal */}
      {showBookingModal && selectedTourForBooking && (
        <BookingModal
          isOpen={showBookingModal}
          onClose={() => {
            setShowBookingModal(false)
            setSelectedTourForBooking(null)
          }}
          tour={selectedTourForBooking as any}
          formatPrice={(price: number) => new Intl.NumberFormat('th-TH').format(price)}
          isFlashSale={selectedTourForBooking?.id ? getIsFlashSale(selectedTourForBooking.id) : false}
        />
      )}
    </div>
  )
}