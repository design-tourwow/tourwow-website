// ===================================================================
// tour-search-32: Main Search Page
// ===================================================================
// Complete mobile-first tour search implementation from scratch
// No dependencies on existing tour-search implementations

'use client'

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
  SearchBar,
  TourCardComponent,
  ViewToggle,
  SortDropdown,
  SearchResultsSkeleton
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
  
  
  .ts32-hero-section {
    background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), 
                url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop') center/cover no-repeat;
    color: white;
    position: relative;
    overflow: hidden;
    min-height: 40vh;
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
    gap: ${TS32_TOKENS.spacing[6]};
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
  
  .ts32-results-list {
    display: flex;
    flex-direction: column;
    gap: ${TS32_TOKENS.spacing[4]};
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
  
  @media (min-width: ${TS32_TOKENS.breakpoints.lg}) {
    .ts32-results-grid {
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
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
  tour?: SearchIndexTour
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
  const [filters, setFilters] = useState<SearchFilters>({})
  const [sortOptions, setSortOptions] = useState<SearchSortOptions>({
    field: 'popularity',
    direction: 'desc'
  })
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card')
  const [showFilters, setShowFilters] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [showStickyCTA, setShowStickyCTA] = useState(false)
  const [wishlist, setWishlist] = useState<string[]>([])
  const [leadModal, setLeadModal] = useState<{
    isOpen: boolean
    tour?: SearchIndexTour
  }>({ isOpen: false })
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [selectedTourForBooking, setSelectedTourForBooking] = useState<SearchIndexTour | null>(null)
  
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
  
  // SEO and Analytics hooks
  const seo = useSEO()
  const analytics = useAnalytics()
  const searchPerformance = useSearchPerformance()
  const a11y = useAccessibility()
  
  // Search and filter logic
  const searchResults = useMemo(() => {
    const combinedFilters: SearchFilters = {
      ...filters,
      query: searchQuery.trim() || undefined
    }
    
    return searchIndex.search(combinedFilters, sortOptions)
  }, [searchQuery, filters, sortOptions])
  
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
            searchResults.length, // Will be updated in next render
            searchResults.length // Will be calculated with new filters
          )
          a11y.announceFilterChange(filterKey, 'applied', String(newValue))
        } else if (!newValue || (Array.isArray(newValue) && newValue.length === 0)) {
          // Filter removed
          analytics.trackFilterCleared(
            filterKey,
            Object.keys(newFilters).filter(k => newFilters[k as keyof SearchFilters]).length,
            searchResults.length,
            searchResults.length
          )
          a11y.announceFilterChange(filterKey, 'removed', String(oldValue))
        }
      }
    })
  }, [filters, analytics, a11y, searchResults.length])
  
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
  
  const handleQuickBook = useCallback((tour: SearchIndexTour) => {
    // Track booking modal opened
    analytics.trackLeadFormOpened(tour, 'quick_book')
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

  const handleTourClick = useCallback((tour: SearchIndexTour, position: number) => {
    // Track tour click
    analytics.trackTourClick(tour, position, viewMode, 'search_results')
  }, [analytics, viewMode])
  
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
    }
    
    // Simulate initial load
    setTimeout(() => setIsLoading(false), 1000)
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
          console.log('Sticky CTA visibility changed:', { shouldShow, bottom: rect.bottom, searchResultsLength: searchResults.length })
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
      searchPerformance.endSearch(searchResults.length)
      a11y.announceSearchResults(searchQuery, searchResults.length, filters)
    }
  }, [searchResults, isSearching, searchQuery, filters, searchPerformance, a11y])

  useEffect(() => {
    if (!isMounted) return
    
    // Update document meta tags for SEO
    const metaTags = seo.generateSearchPageMeta(searchQuery, filters, searchResults.length)
    
    // Update title
    document.title = metaTags.title
    
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
    
    // Add structured data
    const structuredData = seo.generateSearchPageStructuredData(
      searchQuery, 
      filters, 
      searchResults.slice(0, 10), 
      searchResults.length
    )
    
    let scriptTag = document.querySelector('#ts32-structured-data')
    if (!scriptTag) {
      scriptTag = document.createElement('script')
      scriptTag.id = 'ts32-structured-data'
      scriptTag.type = 'application/ld+json'
      document.head.appendChild(scriptTag)
    }
    scriptTag.textContent = JSON.stringify(structuredData)
  }, [searchQuery, filters, searchResults, seo, isMounted])
  
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
      
      
      {/* Hero Section */}
      <section className="ts32-hero-section py-16 md:py-20">
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-8">
            ทัวร์ในฝันของคุณ<br />
            <span className="text-blue-200">ได้เริ่มต้นขึ้นแล้ว!</span>
          </h1>
          
          {/* Hero Benefits */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { 
                label: 'ลดราคาสูงสุด 40%', 
                value: 'ประหยัดได้มาก', 
                icon: <Gift className="w-8 h-8 text-yellow-300" />
              },
              { 
                label: 'รีวิว 4.8/5 ดาว', 
                value: 'ลูกค้าพึงพอใจ', 
                icon: <Star className="w-8 h-8 text-yellow-300" />
              },
              { 
                label: 'ประกันครอบคลุม', 
                value: 'เดินทางอุ่นใจ', 
                icon: <Heart className="w-8 h-8 text-yellow-300" />
              },
              { 
                label: 'ปรึกษา 24/7', 
                value: 'บริการไม่หยุด', 
                icon: <MessageCircle className="w-8 h-8 text-yellow-300" />
              }
            ].map((benefit, index) => (
              <div key={index} className="text-center bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                <div className="mb-3 flex justify-center">{benefit.icon}</div>
                <div className="text-lg font-bold text-white mb-1">{benefit.label}</div>
                <div className="text-sm text-blue-100">{benefit.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Search Container */}
      <div 
        ref={searchContainerRef} 
        className={`ts32-search-container ${showAdvancedModal ? 'hidden' : ''}`}
      >
        <SearchBar
          id="ts32-search-input"
          value={searchQuery}
          onChange={setSearchQuery}
          onSearch={handleSearch}
          suggestions={searchSuggestions}
          isLoading={isSearching}
          aria-label="ค้นหาทัวร์และประสบการณ์ท่องเที่ยว"
          aria-describedby="ts32-search-help"
        />
        <div id="ts32-search-help" className="sr-only">
          พิมพ์คำค้นหาเพื่อค้นหาทัวร์ หรือกด / เพื่อเข้าสู่ช่องค้นหาด้วยแป้นพิมพ์
        </div>
      </div>
      
      {/* Popular Destinations */}
      <section className={`ts32-popular-destinations ${showAdvancedModal ? 'hidden' : ''}`}>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">จุดหมายยอดนิยม</h2>
        {/* First 4 destinations in 2x2 grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {[
            { country: 'ญี่ปุ่น', count: 89, image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=300&h=300&fit=crop' },
            { country: 'เกาหลีใต้', count: 56, image: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=300&h=300&fit=crop' },
            { country: 'ไต้หวัน', count: 43, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop' },
            { country: 'ฮ่องกง', count: 32, image: 'https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=300&h=300&fit=crop' }
          ].map((dest, index) => (
            <button
              key={dest.country}
              onClick={() => handleSearch(`ทัวร์${dest.country}`)}
              className="ts32-destination-card group aspect-square"
            >
              <Image
                src={dest.image}
                alt={`ทัวร์${dest.country} - ภาพปลายทางยอดนิยม`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-4 z-10">
                <h3 className="text-white font-bold text-sm group-hover:scale-110 transition-transform">
                  {dest.country}
                </h3>
                <p className="text-white/80 text-xs">
                  {dest.count} ทัวร์
                </p>
              </div>
            </button>
          ))}
        </div>
        
        {/* Remaining destinations in scrollable row */}
        <div className="overflow-x-auto">
          <div className="flex gap-4 pb-2">
            {[
              { country: 'สิงคโปร์', count: 28, image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=300&h=300&fit=crop' },
              { country: 'มาเลเซีย', count: 24, image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=300&h=300&fit=crop' },
              { country: 'อินเดีย', count: 18, image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=300&h=300&fit=crop' },
              { country: 'เวียดนาม', count: 22, image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=300&h=300&fit=crop' },
              { country: 'อิตาลี', count: 15, image: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=300&h=300&fit=crop' },
              { country: 'ฝรั่งเศส', count: 12, image: 'https://images.unsplash.com/photo-1431274172761-fca41d930114?w=300&h=300&fit=crop' }
            ].map((dest, index) => (
              <button
                key={dest.country}
                onClick={() => handleSearch(`ทัวร์${dest.country}`)}
                className="ts32-destination-card group flex-shrink-0 w-36 h-28"
              >
                <Image
                  src={dest.image}
                  alt={`ทัวร์${dest.country} - ภาพปลายทางยอดนิยม`}
                  fill
                  className="object-cover"
                  sizes="128px"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-2 z-10">
                  <h3 className="text-white font-bold text-xs group-hover:scale-110 transition-transform">
                    {dest.country}
                  </h3>
                  <p className="text-white/80 text-[10px]">
                    {dest.count} ทัวร์
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Controls Bar */}
      <div className={`ts32-controls-bar ${showAdvancedModal ? 'hidden' : ''}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <ViewToggle viewMode={viewMode} onChange={setViewMode} />
            
            <button
              className="ts32-button ts32-secondary flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
              onClick={() => setShowAdvancedModal(true)}
            >
              <Filter className="w-4 h-4" />
              ตัวกรอง
              {activeFiltersCount > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <SortDropdown
              options={sortOptionsList}
              value={currentSortValue}
              onChange={handleSortChange}
            />
          </div>
        </div>
      </div>
      
      {/* Results Section */}
      <main id="search-results" className={`max-w-7xl mx-auto px-4 py-8 ${showAdvancedModal ? 'hidden' : ''}`}>
        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 id="search-results-header" className="text-xl font-bold text-gray-900">
              ผลการค้นหา
            </h2>
            <p className="text-gray-600 text-sm" suppressHydrationWarning>
              พบ {searchResults.length} ทัวร์
              {searchQuery && ` สำหรับ "${searchQuery}"`}
            </p>
          </div>
        </div>
        
        {/* Results Grid */}
        {isLoading ? (
          <SearchResultsSkeleton viewMode={viewMode} count={8} />
        ) : searchResults.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              ไม่พบทัวร์ที่ตรงกับเงื่อนไข
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              ลองเปลี่ยนคำค้นหาหรือตัวกรองเพื่อค้นหาทัวร์ที่เหมาะกับคุณ
            </p>
            <Button
              variant="primary"
              onClick={() => {
                setSearchQuery('')
                setFilters({})
              }}
            >
              ล้างตัวกรองทั้งหมด
            </Button>
          </div>
        ) : (
          <div 
            className={viewMode === 'card' ? 'ts32-results-grid' : 'ts32-results-list'}
            data-tour-results
            data-view-mode={viewMode}
            {...AriaManager.generateSearchResultsAria(searchResults.length, searchQuery)}
          >
            {searchResults.map((tour, index) => (
              <TourCardComponent
                key={tour.metadata.id}
                tour={tour}
                viewMode={viewMode}
                isWishlisted={wishlist.includes(tour.metadata.id)}
                onWishlistToggle={handleWishlistToggle}
                onQuickBook={handleQuickBook}
                onTourClick={() => handleTourClick(tour, index + 1)}
                position={index + 1}
                {...AriaManager.generateTourCardAria(tour, index + 1)}
              />
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
                  onClick={() => setShowAdvancedModal(false)}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  ค้นหาทัวร์ ({searchResults.length} ผลลัพธ์)
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
        tour={leadModal.tour}
      />
      
      {/* Sticky CTA (Mobile) */}
      {showStickyCTA && searchResults.length > 0 && !showAdvancedModal && (
        <div className="ts32-sticky-cta" style={{ backgroundColor: 'white', zIndex: 9999 }}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600" suppressHydrationWarning>
                พบ {searchResults.length} ทัวร์
              </div>
              <div className="text-lg font-bold text-blue-600" suppressHydrationWarning>
                เริ่มต้น ฿{searchResults.length > 0 
                  ? Math.min(...searchResults.map(t => t.pricing.base_price)).toLocaleString()
                  : '24,900'
                }
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
                  // Get the first available tour for booking
                  if (searchResults.length > 0) {
                    setSelectedTourForBooking(searchResults[0])
                    setShowBookingModal(true)
                  }
                }}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0 font-bold shadow-md"
              >
                จองด่วน
              </Button>
            </div>
          </div>
        </div>
      )}
      
      
      {/* Back to Top */}
      {!showAdvancedModal && (
        <button
          className={`ts32-back-to-top ${showBackToTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="กลับไปด้านบน"
      >
          <div className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg transition-colors">
            <ArrowUp className="w-5 h-5" />
          </div>
        </button>
      )}

      {/* Booking Modal */}
      {showBookingModal && selectedTourForBooking && (
        <BookingModal
          isOpen={showBookingModal}
          onClose={() => {
            setShowBookingModal(false)
            setSelectedTourForBooking(null)
          }}
          tour={selectedTourForBooking}
          formatPrice={(price: number) => new Intl.NumberFormat('th-TH').format(price)}
          isFlashSale={getIsFlashSale(selectedTourForBooking.metadata.id)}
        />
      )}
    </div>
  )
}