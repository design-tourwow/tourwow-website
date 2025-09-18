// ===================================================================
// tour-search-32: UI Primitives & Components
// ===================================================================
// Isolated, reusable components with full accessibility support
// Mobile-first design with comprehensive state handling

'use client'

import React, { useState, useEffect, useRef, forwardRef, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Search, Filter, X, ChevronDown, ChevronUp, Star, Heart, 
  Clock, Users, MapPin, Calendar, Grid, List, Loader2,
  ArrowRight, Plus, Minus, Check, AlertCircle, MessageCircle, Zap, Mic, 
  Sparkles, TrendingUp, Globe
} from 'lucide-react'
import { TS32_TOKENS, TS32_COMPONENTS, TS32_CSS_VARS } from './design-system'
import { SearchIndexTour, SearchFilters, TourCard as TourCardType, FilterDrawer as FilterDrawerType } from './types'
import Prototype7TourCard from './Prototype7TourCard'

// ===================================================================
// Flash Sale Components
// ===================================================================

interface FlashSaleTimerProps {
  endTime: string | Date
  onExpire?: () => void
}

export const FlashSaleTimer: React.FC<FlashSaleTimerProps> = ({ endTime, onExpire }) => {
  const [timeLeft, setTimeLeft] = useState<{
    hours: number
    minutes: number
    seconds: number
  }>({ hours: 0, minutes: 0, seconds: 0 })
  const [isExpired, setIsExpired] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const end = new Date(endTime).getTime()
      const difference = end - now

      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)
        
        setTimeLeft({ hours, minutes, seconds })
        setIsExpired(false)
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 })
        setIsExpired(true)
        onExpire?.()
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [endTime, onExpire, isMounted])

  if (!isMounted || isExpired) return null

  return (
    <div className="flex items-center space-x-1 text-white text-xs font-bold">
      <div className="flex items-center space-x-0.5">
        <div className="bg-white/20 px-1 py-0.5 rounded text-center min-w-[16px]">
          {String(timeLeft.hours).padStart(2, '0')}
        </div>
        <span className="text-white/80">:</span>
        <div className="bg-white/20 px-1 py-0.5 rounded text-center min-w-[16px]">
          {String(timeLeft.minutes).padStart(2, '0')}
        </div>
        <span className="text-white/80">:</span>
        <div className="bg-white/20 px-1 py-0.5 rounded text-center min-w-[16px]">
          {String(timeLeft.seconds).padStart(2, '0')}
        </div>
      </div>
    </div>
  )
}

interface FlashSaleBadgeProps {
  discount: number
  endTime: string | Date
  size?: 'sm' | 'md'
}

export const FlashSaleBadge: React.FC<FlashSaleBadgeProps> = ({ 
  discount, 
  endTime, 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'px-2.5 py-1.5 text-xs min-w-[100px]',
    md: 'px-3 py-2 text-sm min-w-[120px]'
  }

  return (
    <div className={`bg-gradient-to-r from-red-500 via-red-600 to-pink-600 text-white rounded-xl ${sizeClasses[size]} shadow-xl relative overflow-hidden border border-red-400/30`}>
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-transparent animate-pulse" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-300 to-orange-400" />
      
      <div className="relative z-10 flex flex-col items-center space-y-1">
        {/* Header */}
        <div className="flex items-center space-x-1.5 font-bold">
          <Zap className="w-3.5 h-3.5 text-yellow-300 drop-shadow-sm" />
          <span className="text-xs font-extrabold tracking-wide">FLASH SALE</span>
        </div>
        
        {/* Discount */}
        <div className="text-lg font-black text-yellow-200 drop-shadow-md leading-none">
          -{discount}%
        </div>
        
        {/* Timer */}
        <div className="bg-black/30 px-2 py-0.5 rounded-md backdrop-blur-sm">
          <FlashSaleTimer endTime={endTime} />
        </div>
      </div>
    </div>
  )
}

// ===================================================================
// Base UI Primitives
// ===================================================================

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  children: React.ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading = false, leftIcon, rightIcon, children, className = '', ...props }, ref) => {
    const baseStyle = TS32_COMPONENTS.button.base
    const sizeStyle = TS32_COMPONENTS.button.sizes[size]
    const variantStyle = TS32_COMPONENTS.button.variants[variant]
    
    const buttonStyle: React.CSSProperties = {
      ...baseStyle,
      ...sizeStyle,
      ...variantStyle
    }
    
    return (
      <button
        ref={ref}
        className={`ts32-button ts32-button--${variant} ts32-button--${size} ${className}`}
        style={buttonStyle}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    )
  }
)
Button.displayName = 'Button'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, leftIcon, rightIcon, className = '', ...props }, ref) => {
    const baseStyle = TS32_COMPONENTS.input.base
    const hasError = Boolean(error)
    
    const inputStyle: React.CSSProperties = {
      ...baseStyle,
      paddingLeft: leftIcon ? TS32_TOKENS.spacing[10] : baseStyle.padding.split(' ')[1],
      paddingRight: rightIcon ? TS32_TOKENS.spacing[10] : baseStyle.padding.split(' ')[1]
    }
    
    return (
      <div className="ts32-input-wrapper">
        {label && (
          <label className="ts32-input-label block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={`ts32-input ${className}`}
            style={inputStyle}
            aria-invalid={hasError}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {error}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

interface BadgeProps {
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'gray'
  children: React.ReactNode
  className?: string
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'primary', children, className = '' }) => {
  const baseStyle = TS32_COMPONENTS.badge.base
  const variantStyle = TS32_COMPONENTS.badge.variants[variant]
  
  const badgeStyle: React.CSSProperties = {
    ...baseStyle,
    ...variantStyle
  }
  
  return (
    <span className={`ts32-badge ts32-badge--${variant} ${className}`} style={badgeStyle}>
      {children}
    </span>
  )
}

interface CardProps {
  variant?: 'base' | 'elevated' | 'interactive'
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export const Card: React.FC<CardProps> = ({ variant = 'base', children, className = '', onClick }) => {
  const baseStyle = TS32_COMPONENTS.card.base
  const variantStyle = variant !== 'base' ? TS32_COMPONENTS.card.variants[variant] : {}
  
  const cardStyle: React.CSSProperties = {
    ...baseStyle,
    ...variantStyle
  }
  
  // Always use div to avoid nested button issues
  return (
    <div
      className={`ts32-card ts32-card--${variant} ${className}`}
      style={cardStyle}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  )
}

interface SkeletonProps {
  width?: string
  height?: string
  className?: string
}

export const Skeleton: React.FC<SkeletonProps> = ({ width = '100%', height = '1rem', className = '' }) => {
  const skeletonStyle = TS32_COMPONENTS.skeleton.base
  
  return (
    <div 
      className={`ts32-skeleton ${className}`}
      style={{
        ...skeletonStyle,
        width,
        height
      }}
    />
  )
}

// ===================================================================
// Search Components
// ===================================================================

interface SearchBarProps {
  id?: string
  value: string
  onChange: (value: string) => void
  onSearch: (query: string) => void
  placeholder?: string
  suggestions?: string[]
  isLoading?: boolean
  enableVoiceSearch?: boolean
}

export const SearchBar: React.FC<SearchBarProps> = ({
  id,
  value,
  onChange,
  onSearch,
  placeholder = 'ค้นหาทัวร์, จุดหมาย, ประเทศ...',
  suggestions = [],
  isLoading = false,
  enableVoiceSearch = true
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [animatedPlaceholder, setAnimatedPlaceholder] = useState('')
  const [isTypingAnimation, setIsTypingAnimation] = useState(false)
  const [isVoiceSearching, setIsVoiceSearching] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const placeholderExamples = [
    'ทัวร์ญี่ปุ่น',
    'ทัวร์เกาหลี', 
    'ทัวร์ไต้หวัน',
    'ทัวร์ยุโรป',
    'ทัวร์สิงคโปร์'
  ]
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(value)
    setShowSuggestions(false)
  }
  
  const handleSuggestionClick = (e: React.MouseEvent, suggestion: string) => {
    e.preventDefault()
    e.stopPropagation()
    onChange(suggestion)
    onSearch(suggestion)
    setShowSuggestions(false)
  }
  
  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onChange('')
    setShowSuggestions(false)
    inputRef.current?.focus()
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
    setShowSuggestions(false)
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      console.log('Voice input:', transcript)
      onChange(transcript)
      onSearch(transcript)
      setIsVoiceSearching(false)
    }
    
    recognition.onerror = (event: any) => {
      console.error('Voice recognition error:', event.error)
      setIsVoiceSearching(false)
      
      if (event.error === 'no-speech') {
        alert('ไม่ได้ยินเสียง กรุณาลองอีกครั้ง')
      } else if (event.error === 'not-allowed') {
        alert('กรุณาอนุญาตให้เข้าถึงไมโครโฟน')
      } else {
        alert('เกิดข้อผิดพลาดในการรับรู้เสียง กรุณาลองอีกครั้ง')
      }
    }
    
    recognition.onend = () => {
      setIsVoiceSearching(false)
    }
    
    recognition.start()
  }
  
  // Animated placeholder effect
  useEffect(() => {
    if (value.trim()) {
      setAnimatedPlaceholder('')
      setIsTypingAnimation(false)
      return
    }
    
    let currentIndex = 0
    let isDeleting = false
    let currentText = ''
    let timeoutId: NodeJS.Timeout
    
    const animatePlaceholder = () => {
      const currentExample = placeholderExamples[currentIndex]
      
      if (!isDeleting && currentText.length < currentExample.length) {
        // Typing animation
        setIsTypingAnimation(true)
        currentText += currentExample[currentText.length]
        setAnimatedPlaceholder(currentText)
        timeoutId = setTimeout(animatePlaceholder, 150) // Typing speed
      } else if (!isDeleting && currentText.length === currentExample.length) {
        // Pause after typing complete
        setIsTypingAnimation(false)
        timeoutId = setTimeout(() => {
          isDeleting = true
          animatePlaceholder()
        }, 3000) // Wait 3 seconds before deleting
      } else if (isDeleting && currentText.length > 0) {
        // Deleting animation
        setIsTypingAnimation(true)
        currentText = currentText.slice(0, -1)
        setAnimatedPlaceholder(currentText)
        timeoutId = setTimeout(animatePlaceholder, 100) // Deleting speed
      } else if (isDeleting && currentText.length === 0) {
        // Move to next example
        isDeleting = false
        currentIndex = (currentIndex + 1) % placeholderExamples.length
        timeoutId = setTimeout(animatePlaceholder, 500) // Pause before next word
      }
    }
    
    // Start animation after initial delay
    timeoutId = setTimeout(animatePlaceholder, 1000)
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [value])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  
  return (
    <div ref={containerRef} className="ts32-search-bar relative">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Input
            id={id}
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => {
              onChange(e.target.value)
              setShowSuggestions(true)
            }}
            onFocus={() => setShowSuggestions(true)}
            placeholder={value.trim() ? placeholder : ''}
            leftIcon={<Search className="w-5 h-5" />}
            rightIcon={
              <div className="flex items-center space-x-1">
                {/* Voice Search Button */}
                {enableVoiceSearch && (
                  <button
                    type="button"
                    onClick={handleVoiceSearch}
                    disabled={isVoiceSearching}
                    className={`p-2 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center ${
                      isVoiceSearching 
                        ? 'bg-red-100 text-red-600' 
                        : 'hover:bg-gray-100 text-gray-600'
                    }`}
                    aria-label="ค้นหาด้วยเสียง"
                  >
                    <Mic className={`w-5 h-5 ${isVoiceSearching ? 'animate-pulse' : ''}`} />
                  </button>
                )}
                {/* Loading or Clear Button */}
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : value.trim() ? (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="ล้างข้อความ"
                  >
                    <X className="w-4 h-4 text-gray-500 hover:text-gray-700" />
                  </button>
                ) : null}
              </div>
            }
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
          
          {/* Animated Placeholder Overlay */}
          {!value.trim() && animatedPlaceholder && (
            <div 
              className="absolute left-10 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400 select-none"
              style={{ fontSize: '1rem' }}
            >
              {animatedPlaceholder}
              {!isTypingAnimation && (
                <span className="animate-pulse">|</span>
              )}
            </div>
          )}
        </div>
      </form>
      
      {/* Voice Search Status */}
      {isVoiceSearching && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-red-50 border-2 border-red-200 rounded-xl p-4 z-30">
          <div className="flex items-center gap-3 text-red-700">
            <Mic className="w-5 h-5 animate-pulse" />
            <span className="font-medium">กำลังฟัง... พูดชื่อจุดหมายที่ต้องการ</span>
          </div>
        </div>
      )}

      {/* Search Suggestions */}
      {showSuggestions && suggestions.length > 0 && !isVoiceSearching && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-[60]">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              className="w-full text-left px-4 py-3 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg cursor-pointer relative"
              onClick={(e) => handleSuggestionClick(e, suggestion)}
            >
              <div className="flex items-center">
                <Search className="w-4 h-4 mr-3 text-gray-400" />
                <span className="text-gray-900">{suggestion}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ===================================================================
// Tour Card Component
// ===================================================================

interface TourCardComponentProps {
  tour: SearchIndexTour
  viewMode?: 'card' | 'list'
  showWishlist?: boolean
  showQuickBook?: boolean
  isWishlisted?: boolean
  onWishlistToggle?: (tourId: string) => void
  onQuickBook?: (tour: SearchIndexTour) => void
  isFirstCard?: boolean
  isCompact?: boolean
  compactVersion?: 'v1' | 'v2' | 'v3' | 'v4' | 'v5' | 'v6' | 'v7' | 'v8' | 'v9' | 'v10' | 'v11'
  onExpandToggle?: (tourId: string) => void
}

// Improved Tour Card Component with Better UX/UI
export const ImprovedTourCard: React.FC<{
  tour: SearchIndexTour;
  showTravelDates?: boolean;
  onToggleDates?: () => void;
  onBook?: () => void;
}> = ({ 
  tour, 
  showTravelDates = false, 
  onToggleDates, 
  onBook 
}) => {
  const formatPrice = (price: number) => price.toLocaleString('th-TH')
  
  // Generate realistic travel rounds data with holiday names
  const travelRounds = [
    { 
      month: 'ก.ย. 68', 
      dates: [
        { range: '2-6', holiday: 'วันหยุด' },
        { range: '10-14', holiday: 'ติดวันหยุด 3 วัน' }, 
        { range: '19-23', holiday: 'วันหยุดยาว' },
        { range: '26-30', holiday: 'ช่วงปลายเดือน' }
      ], 
      basePrice: tour.pricing.base_price, 
      availability: 'available', 
      color: 'emerald' 
    },
    { 
      month: 'ต.ค. 68', 
      dates: [
        { range: '4-8', holiday: 'วันหยุดยาว' },
        { range: '11-15', holiday: 'High Season' },
        { range: '22-26', holiday: 'ติดวันหยุด 5 วัน' },
        { range: '29-2 พ.ย.', holiday: 'วันหยุดพิเศษ' }
      ], 
      basePrice: tour.pricing.base_price + 2000, 
      availability: 'limited', 
      color: 'orange' 
    },
    { 
      month: 'พ.ย. 68', 
      dates: [
        { range: '5-9', holiday: 'Cool Season' },
        { range: '12-16', holiday: 'วันหยุด' },
        { range: '19-23', holiday: 'ติดวันหยุด 4 วัน' },
        { range: '26-30', holiday: 'ปลายปี' }
      ], 
      basePrice: tour.pricing.base_price + 1000, 
      availability: 'available', 
      color: 'blue' 
    }
  ]
  
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer group">
      {/* Hero Section */}
      <div className="relative">
        {/* Main Image - Larger and more prominent */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={tour.media.hero_image}
            alt={tour.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Price Badge */}
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg">
            <div className="flex items-center gap-1">
              <span className="text-lg font-bold text-blue-600">฿{formatPrice(tour.pricing.base_price)}</span>
              <span className="text-sm text-gray-600">/คน</span>
            </div>
          </div>
          
          {/* Flash Sale Badge */}
          <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium animate-pulse">
            🔥 Flash Sale
          </div>
        </div>
        
        {/* Content Overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white font-bold text-xl mb-2 line-clamp-2 drop-shadow-lg">
            {tour.title}
          </h3>
          <div className="flex items-center text-white/90 text-sm">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{tour.location.cities?.slice(0, 3).join(' • ') || tour.location.region || 'ไทเป • เชียงใหม่ • ภูเก็ต'}, {tour.location.country}</span>
          </div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="p-6">
        {/* Tour Highlights */}
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
            <Clock className="w-4 h-4 mr-1" />
            <span>6 วัน 5 คืน</span>
          </div>
          <div className="flex items-center bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">
            <Users className="w-4 h-4 mr-1" />
            <span>รวมมื้ออาหาร</span>
          </div>
          <div className="flex items-center bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm">
            <Star className="w-4 h-4 mr-1" />
            <span>4.8/5</span>
          </div>
        </div>
        
        {/* Travel Dates Section */}
        <div className="border-t pt-4">
          <button 
            className="flex items-center justify-between w-full p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all duration-200 group/btn"
            onClick={onToggleDates}
          >
            <div className="flex items-center">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-lg mr-3">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">ช่วงเวลาเดินทาง</div>
                <div className="text-sm text-gray-600" dangerouslySetInnerHTML={{__html: `ก.ย. 68 - พ.ค.69<br />เริ่มต้น ฿${formatPrice(tour.pricing.base_price)}`}}></div>
              </div>
              <div className="ml-3 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                มีที่ว่าง
              </div>
            </div>
            <ChevronDown className={`w-5 h-5 text-blue-600 transition-transform duration-200 group-hover/btn:text-blue-700 ${showTravelDates ? 'rotate-180' : ''}`} />
          </button>
          
          {/* Expandable Travel Dates */}
          {showTravelDates && (
            <div className="mt-4 space-y-3 max-h-80 overflow-y-auto overscroll-contain">
              {travelRounds.map((round, index) => (
                <div key={index} className="space-y-3">
                  <div className="mb-3">
                    {/* Minimal Elegant Design - Sticky Header */}
                    <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-100 pb-2 mb-2 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-1 h-6 rounded-full bg-blue-500"></div>
                        <h4 className="text-lg font-semibold text-gray-900">{round.month}</h4>
                      </div>
                      <span className={`text-sm px-2 py-1 rounded ${
                        round.availability === 'available' 
                          ? 'text-blue-700 bg-blue-50' 
                          : 'text-blue-700 bg-blue-100'
                      }`}>
                        {round.availability === 'available' ? 'มีที่ว่าง' : 'เหลือน้อย'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {round.dates.map((date, dateIndex) => (
                      <div key={dateIndex} className="bg-white/90 backdrop-blur-sm rounded-xl border border-white/60 hover:bg-white hover:shadow-md transition-all duration-200 cursor-pointer group/date">
                        {/* Month Bar */}
                        <div className="w-full h-1 rounded-t-xl bg-gradient-to-r from-blue-400 to-indigo-500"></div>
                        
                        {/* Content */}
                        <div className="p-4">
                          <div className="flex justify-between items-center">
                            <div className="flex-1">
                              <div className="text-xl font-bold text-gray-900 mb-1">
                                {date.range} {round.month.split(' ')[0]}
                              </div>
                              <div className="text-xs flex items-center space-x-2">
                                <span className="text-orange-600 font-medium bg-orange-50 px-2 py-0.5 rounded">{date.holiday}</span>
                                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  round.availability === 'available' ? 'bg-green-100 text-green-700' :
                                  'bg-orange-100 text-orange-700'
                                }`}>
                                  {round.availability === 'available' ? 'มีที่ว่าง' : 'เหลือน้อย'}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-xl font-bold text-blue-600">฿{formatPrice(round.basePrice)}</div>
                              <div className="text-xs text-gray-500">ต่อคน</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              
              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                <button 
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={onToggleDates}
                >
                  ย่อ
                </button>
                <button 
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-[1.02]"
                  onClick={onBook}
                >
                  เลือกวันเดินทาง
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Modern Compact Tour Card - Using Prototype 7 from tour-search-42
export const CompactTourCard: React.FC<{
  tour: SearchIndexTour;
  onClick?: () => void;
  onBookClick?: () => void;
  variant?: 'minimal' | 'feature' | 'premium';
  isWishlisted?: boolean;
  onWishlistToggle?: (tourId: string) => void;
}> = ({ 
  tour, 
  onClick, 
  onBookClick,
  variant = 'minimal',
  isWishlisted = false,
  onWishlistToggle
}) => {
  // Use Prototype7TourCard instead
  return (
    <Prototype7TourCard 
      tour={tour}
      isWishlisted={isWishlisted}
      onWishlistToggle={onWishlistToggle}
      onQuickBook={onBookClick ? () => onBookClick() : undefined}
    />
  )
}

export const TourCardComponent: React.FC<TourCardComponentProps> = ({
  tour,
  viewMode = 'card',
  showWishlist = true,
  showQuickBook = true,
  isWishlisted = false,
  onWishlistToggle,
  onQuickBook,
  isFirstCard = false,
  isCompact = false,
  compactVersion,
  onExpandToggle
}) => {
  const formatPrice = (price: number) => price.toLocaleString('th-TH')
  const hasDiscount = tour.pricing.discount_percentage && tour.pricing.discount_percentage > 0
  const discountSavings = hasDiscount ? 
    (tour.pricing.original_price || tour.pricing.base_price) - tour.pricing.base_price : 0
  
  // Get next available departure
  const nextDeparture = tour.availability.departure_dates.find(d => d.status !== 'soldout')
  
  // Flash Sale Logic - สุ่มให้บางทัวร์มี Flash Sale (25% chance)
  const tourId = tour.metadata.id
  const isFlashSale = useMemo(() => {
    // ใช้ tour ID เป็น seed เพื่อให้ Flash Sale คงที่
    const hash = tourId.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0)
      return a & a
    }, 0)
    return Math.abs(hash) % 4 === 0 // 25% chance
  }, [tourId])
  
  // Flash Sale end time (24 hours from fixed date to avoid hydration mismatch)
  const flashSaleEndTime = useMemo(() => {
    // Use a fixed future date to avoid hydration mismatch
    return new Date('2025-08-23T23:59:59Z')
  }, [])
  
  // Flash Sale discount (15-40%)
  const flashSaleDiscount = useMemo(() => {
    const hash = tourId.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0)
      return a & a
    }, 0)
    return 15 + (Math.abs(hash) % 26) // 15-40%
  }, [tourId])
  
  if (viewMode === 'list') {
    return (
      <Card 
        variant="interactive" 
        className={`mb-4 ${isFlashSale ? 'flash-sale-card' : ''}`}
      >
        <div className="flex p-4">
          {/* Image */}
          <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={tour.media.hero_image}
              alt={tour.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 96px, 128px"
            />
            {isFlashSale ? (
              <div className="absolute top-1 left-1">
                <FlashSaleBadge 
                  discount={flashSaleDiscount} 
                  endTime={flashSaleEndTime}
                  size="sm"
                />
              </div>
            ) : hasDiscount && (
              <div className="absolute top-1 left-1">
                <Badge variant="error" className="text-xs">
                  -{tour.pricing.discount_percentage}%
                </Badge>
              </div>
            )}
          </div>
          
          {/* Content */}
          <div className="flex-1 ml-4 min-w-0">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1 mr-2">
                <h3 className="font-semibold text-gray-900 text-sm md:text-base line-clamp-2">
                  {tour.title}
                </h3>
                {/* Promotional Text */}
                <div className="text-xs text-blue-600 mt-1 line-clamp-1">
                  {(() => {
                    switch (tour.location.country) {
                      case 'ญี่ปุ่น':
                        return 'สัมผัสวัฒนธรรมแบบดั้งเดิม ชมซากุระบาน หรือใบไม้เปลี่ยนสี เยือนเกียวโต นารา โตเกียว'
                      case 'เกาหลีใต้':
                        return 'เที่ยวเกาหลีสไตล์ K-Pop ช้อปปิ้งเมืองโซล เดินเล่นในถนนมยองดง'
                      case 'ไต้หวัน':
                        return 'เจียวเฟิ่น จิ่วเฟิ่น และตลาดกลางคืนชื่อดัง ชิมอาหารข้างทาง'
                      case 'ยุโรป':
                        return 'เยือนยุโรปเก่าแก่ ชมหอไอเฟล ลอนดอนบริดจ์ และโคลอสเซียม'
                      case 'จีน':
                        return 'สำรวจกำแพงเมืองจีน พระราชวังต้องห้าม เยือนสุสานทหารดินเผา'
                      case 'สิงคโปร์':
                        return 'เมืองแห่งอนาคต Universal Studios Gardens by the Bay'
                      case 'มาเลเซีย':
                        return 'ปีนัง กัวลาลัมเปอร์ และลังกาวี เยือนถ้ำบาตู เพโทรนาส ทาวเวอร์'
                      case 'ฮ่องกง':
                        return 'ดิสนีย์แลนด์ วิคตอเรีย ฮาร์เบอร์ นั่งเคเบิลคาร์ขึ้นเขา'
                      default:
                        return `สำรวจ${tour.location.country || 'ปลายทางใหม่'}อันงดงาม เที่ยวสุดคุ้มกับโปรแกรมคุณภาพ พักโรงแรมมาตรฐาน`
                    }
                  })()}
                </div>
              </div>
              {showWishlist && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    onWishlistToggle?.(tour.metadata.id)
                  }}
                  aria-label={isWishlisted ? 'ลบจากรายการโปรด' : 'เพิ่มในรายการโปรด'}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                </Button>
              )}
            </div>
            
            {/* Tour Info */}
            <div className="flex flex-wrap items-center gap-3 mb-3 text-xs text-gray-600">
              <div className="flex items-center">
                <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{tour.quality.rating}</span>
                <span className="ml-1">({tour.quality.review_count})</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                <span>{tour.duration_days}วัน{tour.nights}คืน</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-3 h-3 mr-1" />
                <span>{tour.location.country}</span>
              </div>
              {tour.availability.available_seats <= 5 && (
                <div className="flex items-center text-red-600">
                  <Users className="w-3 h-3 mr-1" />
                  <span>เหลือ {tour.availability.available_seats} ที่</span>
                </div>
              )}
            </div>
            
            {/* Price & CTA */}
            <div className="flex items-center justify-between">
              <div>
                {isFlashSale ? (
                  <>
                    <div className="text-xs text-gray-400 line-through">
                      ฿{formatPrice(tour.pricing.base_price)}
                    </div>
                    <div className="text-lg font-bold text-red-600 flex items-center">
                      <Zap className="w-4 h-4 mr-1" />
                      ฿{formatPrice(Math.round(tour.pricing.base_price * (1 - flashSaleDiscount / 100)))}
                    </div>
                    <div className="text-xs text-red-500 font-medium">ลดสูงสุดกว่า {flashSaleDiscount}%</div>
                  </>
                ) : hasDiscount ? (
                  <>
                    <div className="text-xs text-gray-400 line-through">
                      ฿{formatPrice(tour.pricing.original_price!)}
                    </div>
                    <div className="text-lg font-bold text-blue-600">
                      ฿{formatPrice(tour.pricing.base_price)}
                    </div>
                  </>
                ) : (
                  <div className="text-lg font-bold text-blue-600">
                    ฿{formatPrice(tour.pricing.base_price)}
                  </div>
                )}
                <div className="text-xs text-gray-500">ต่อคน</div>
              </div>
              
              <div className="flex items-center space-x-2">
                {showQuickBook && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      onQuickBook?.(tour)
                    }}
                    leftIcon={<Zap className="w-4 h-4" />}
                    className={isFlashSale 
                      ? "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white border-0 font-bold shadow-md text-xs"
                      : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0 font-bold shadow-md text-xs"
                    }
                  >
                    จองด่วน
                  </Button>
                )}
                <Link href={tour.metadata.canonical_url}>
                  <Button 
                    variant="primary" 
                    size="sm"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                    className="text-xs"
                  >
                    ดูรายละเอียด
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Card>
    )
  }
  
  // Compact Designs for first card only (7 versions)
  const [showTravelDates, setShowTravelDates] = useState(false)
  
  if (isFirstCard && isCompact) {
    // Use Prototype7TourCard for all compact cards
    return (
      <CompactTourCard
        tour={tour}
        isWishlisted={isWishlisted}
        onWishlistToggle={onWishlistToggle}
        onBookClick={onQuickBook}
      />
    )
  }
  
  // Old compact versions - kept for reference but not used
  if (false && isFirstCard && isCompact) {
    // V1 - Original compact size  
    if (compactVersion === 'v1') {
      return (
        <Card 
          variant="interactive" 
          className="overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] group"
          onClick={() => onExpandToggle?.(tour.metadata.id)}
        >
          <div className="p-3">
            <div className="flex items-start space-x-3">
              <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden group-hover:scale-105 transition-transform duration-200">
                <Image
                  src={tour.media.hero_image}
                  alt={tour.title}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-2 leading-tight">
                  {tour.title}
                </h3>
                <div className="flex items-center gap-2 text-xs mb-2">
                  <span className="text-gray-600">{tour.location.city}</span>
                  <span className="text-gray-400">•</span>
                  <div className="flex items-center">
                    <Star className="w-3 h-3 text-yellow-400 mr-1" />
                    <span className="text-gray-600">{tour.rating?.average || '4.5'}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-right">
                    <div className="flex items-center text-blue-600 font-bold text-sm">
                      <span>฿{formatPrice(tour.pricing.base_price)}</span>
                      <span className="text-xs text-gray-500 ml-1">/คน</span>
                    </div>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    className="text-xs px-3 py-1"
                    onClick={(e) => {
                      e.stopPropagation()
                      onExpandToggle?.(tour.metadata.id)
                    }}
                  >
                    ดูเพิ่มเติม
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )
    }

    // V2 - Medium size
    if (compactVersion === 'v2') {
      return (
        <Card 
          variant="interactive" 
          className="overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.01] group"
          onClick={() => onExpandToggle?.(tour.metadata.id)}
        >
          <div className="flex">
            <div className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
              <Image
                src={tour.media.hero_image}
                alt={tour.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 128px, 160px"
              />
              {hasDiscount && (
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded font-medium">
                  -{tour.pricing.discount_percentage}%
                </div>
              )}
            </div>
            
            <div className="flex-1 p-4">
              <div className="flex flex-col h-full">
                <div className="flex-1">
                  <h3 className="font-semibold text-base text-gray-900 mb-2 line-clamp-2">
                    {tour.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {tour.location.cities?.slice(0, 3).join(' • ') || tour.location.region || 'ไทเป • เชียงใหม่ • ภูเก็ต'}, {tour.location.country}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {tour.highlights.slice(0, 2).map((highlight, idx) => (
                      <span 
                        key={idx} 
                        className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full whitespace-nowrap"
                      >
                        {highlight.text}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg font-bold text-blue-600">
                      ฿{formatPrice(tour.pricing.base_price)}
                    </div>
                    <div className="text-xs text-gray-500">ต่อคน</div>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    className="text-xs"
                  >
                    ดูเพิ่มเติม
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )
    }

    // V3 - Modern horizontal card
    if (compactVersion === 'v3') {
      return (
        <Card 
          variant="interactive" 
          className="overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group"
          onClick={() => onExpandToggle?.(tour.metadata.id)}
        >
          <div className="relative">
            <div className="absolute inset-0 h-32 md:h-36">
              <Image
                src={tour.media.hero_image}
                alt={tour.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            </div>
            
            <div className="relative h-32 md:h-36 flex flex-col justify-end p-4 text-white">
              <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                <div className="flex gap-2">
                  {hasDiscount ? (
                    <Badge className="bg-red-500 text-white border-0">
                      ลด {tour.pricing.discount_percentage}%
                    </Badge>
                  ) : (
                    <Badge className="bg-blue-500 text-white border-0">
                      ยอดนิยม
                    </Badge>
                  )}
                </div>
              </div>
              
              <h3 className="font-bold text-lg mb-1 line-clamp-2 drop-shadow-sm">
                {tour.title}
              </h3>
              <div className="flex items-center justify-between">
                <p className="text-sm text-white/90 line-clamp-1">
                  {tour.location.cities?.slice(0, 3).join(' • ') || tour.location.region || 'ไทเป • เชียงใหม่ • ภูเก็ต'}, {tour.location.country}
                </p>
                <div className="text-right">
                  <div className="text-xl font-bold">
                    ฿{formatPrice(tour.pricing.base_price)}
                  </div>
                  <div className="text-xs text-white/80">ต่อคน</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )
    }

    // V4 - Ultra premium glass morphism
    if (compactVersion === 'v4') {
      return (
        <Card 
          variant="interactive" 
          className="overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] group relative"
          onClick={() => onExpandToggle?.(tour.metadata.id)}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-blue-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative h-48 md:h-56 overflow-hidden">
              <Image
                src={tour.media.hero_image}
                alt={tour.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              
              <div className="absolute top-4 left-4 space-y-2">
                {hasDiscount && (
                  <div className="bg-red-500/90 backdrop-blur-md text-white px-3 py-2 rounded-full inline-flex items-center gap-2 animate-pulse shadow-lg">
                    <div className="text-sm font-bold">
                      -{tour.pricing.discount_percentage}%
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="p-6 flex flex-col justify-between bg-gradient-to-br from-white via-gray-50/80 to-blue-50/30 backdrop-blur-sm">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">
                  {tour.title}
                </h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                    <span className="text-sm">{tour.location.cities?.slice(0, 3).join(' • ') || tour.location.region || 'ไทเป • เชียงใหม่ • ภูเก็ต'}, {tour.location.country}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Star className="w-4 h-4 mr-2 text-yellow-500" />
                    <span className="text-sm font-medium">{tour.rating?.average || '4.5'}</span>
                    <span className="text-xs text-gray-500 ml-1">({tour.rating?.total_reviews || '256'})</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {tour.highlights.slice(0, 2).map((highlight, idx) => (
                    <span 
                      key={idx} 
                      className="text-xs bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-gray-700 px-3 py-1.5 rounded-full border border-blue-200/50 backdrop-blur-sm"
                    >
                      {highlight.text}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-end justify-between">
                  <div>
                    {hasDiscount ? (
                      <>
                        <div className="text-sm text-gray-400 line-through">
                          ฿{formatPrice(tour.pricing.original_price || tour.pricing.base_price)}
                        </div>
                        <div className="flex items-baseline">
                          <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            ฿{formatPrice(tour.pricing.base_price)}
                          </span>
                          <span className="text-sm text-gray-500 ml-1">/คน</span>
                        </div>
                      </>
                    ) : (
                      <div className="flex items-baseline">
                        <span className="text-3xl font-bold text-gray-900">
                          ฿{formatPrice(tour.pricing.base_price)}
                        </span>
                        <span className="text-sm text-gray-500 ml-1">/คน</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )
    }

    // V5 - Compact version of V4
    if (compactVersion === 'v5') {
      return (
        <Card 
          variant="interactive" 
          className="overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-[0_10px_40px_rgba(0,0,0,0.12)] group relative"
          onClick={() => onExpandToggle?.(tour.metadata.id)}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="flex">
            <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden">
              <Image
                src={tour.media.hero_image}
                alt={tour.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="128px"
              />
            </div>
            
            <div className="flex-1 p-4">
              <h3 className="font-bold text-base text-gray-900 mb-2 line-clamp-2">
                {tour.title}
              </h3>
              
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <MapPin className="w-3 h-3 mr-1 text-gray-400" />
                <span>{tour.location.city}</span>
              </div>
              
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <div>
                  <div className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    ฿{formatPrice(tour.pricing.base_price)}
                  </div>
                  <div className="text-xs text-gray-500">ต่อคน</div>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  className="text-xs bg-gradient-to-r from-blue-500 to-purple-500 border-0"
                >
                  ดูเพิ่ม
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )
    }

    // V6 - Mobile First UX/UI Best Practice
    if (compactVersion === 'v6') {
      return (
        <Card 
          variant="interactive" 
          className="overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-md active:scale-[0.99]"
          onClick={() => onExpandToggle?.(tour.metadata.id)}
        >
          <div className="p-4">
            <div className="flex gap-3 mb-3">
              <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={tour.media.hero_image}
                  alt={tour.title}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-base text-gray-900 mb-1 line-clamp-2 leading-snug">
                  {tour.title}
                </h3>
                
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <MapPin className="w-3 h-3 text-gray-400" />
                  <span className="truncate">{tour.location.city}</span>
                  <div className="flex items-center ml-auto">
                    <Star className="w-3 h-3 text-yellow-400 mr-0.5" />
                    <span className="text-xs font-medium">{tour.rating?.average || '4.5'}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1.5">
                  {tour.highlights.slice(0, 3).map((highlight, idx) => (
                    <span 
                      key={idx} 
                      className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full whitespace-nowrap flex-shrink-0"
                    >
                      {highlight.text}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex items-end justify-between pt-3 border-t border-gray-100">
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-bold text-gray-900">
                    ฿{formatPrice(tour.pricing.base_price)}
                  </span>
                  <span className="text-xs text-gray-500">/คน</span>
                </div>
              </div>
              <Button 
                variant="primary" 
                size="sm"
                rightIcon={<ChevronDown className="w-4 h-4 ml-1 rotate-[-90deg]" />}
                className="text-xs px-3"
              >
                ดูเพิ่ม
              </Button>
            </div>
          </div>
          
          <div className="bg-gray-50 px-4 py-2 flex items-center justify-center border-t border-gray-100">
            <span className="text-xs text-gray-500 mr-2">แตะเพื่อดูข้อมูลเพิ่มเติม</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 animate-bounce" />
          </div>
        </Card>
      )
    }

    // V7 - V6 + Travel Dates Expansion
    if (compactVersion === 'v7') {
    return (
      <Card 
        variant="interactive" 
        className="overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-md"
      >
        <div className="p-4">
          {/* Compact Header */}
          <div className="flex gap-3 mb-3">
            <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={tour.media.hero_image}
                alt={tour.title}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-base text-gray-900 mb-1 line-clamp-2">
                {tour.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2 line-clamp-1">
                {tour.location.cities?.slice(0, 3).join(' • ') || tour.location.region || 'ไทเป • เชียงใหม่ • ภูเก็ต'}, {tour.location.country}
              </p>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-bold text-blue-600">
                  ฿{formatPrice(tour.pricing.base_price)}
                </span>
                <span className="text-gray-500">/คน</span>
              </div>
            </div>
          </div>
          
          {/* Travel Dates Expansion Section */}
          <div className="border-t pt-3">
            <button 
              className="flex items-center justify-between w-full p-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
              onClick={() => setShowTravelDates(!showTravelDates)}
            >
              <div className="flex items-center">
                <Calendar className="w-4 h-4 text-blue-600 mr-2" />
                <span className="font-medium text-gray-900 text-sm">ช่วงเวลาเดินทาง</span>
                <span className="ml-2 text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                  32 รอบ
                </span>
              </div>
              <div className="flex items-center text-blue-600">
                <span className="text-xs mr-1">{showTravelDates ? 'ย่อ' : 'ดูช่วงเวลาเดินทาง'}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showTravelDates ? 'rotate-180' : ''}`} />
              </div>
            </button>
            
            {showTravelDates && (
              <div className="mt-3 max-h-60 overflow-y-auto">
                <div className="space-y-2">
                  {/* กันยายน 2568 */}
                  <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                    <div className="font-semibold text-sm text-gray-900 mb-2">กันยายน 2568</div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex justify-between items-center p-1.5 bg-white rounded">
                        <span>2-6 ก.ย.</span>
                        <span className="text-green-600 font-medium">฿{formatPrice(tour.pricing.base_price)}</span>
                      </div>
                      <div className="flex justify-between items-center p-1.5 bg-white rounded">
                        <span>10-14 ก.ย.</span>
                        <span className="text-green-600 font-medium">฿{formatPrice(tour.pricing.base_price)}</span>
                      </div>
                      <div className="flex justify-between items-center p-1.5 bg-white rounded">
                        <span>19-23 ก.ย.</span>
                        <span className="text-blue-600 font-medium">฿{formatPrice(tour.pricing.base_price + 2000)}</span>
                      </div>
                      <div className="flex justify-between items-center p-1.5 bg-white rounded">
                        <span>26-30 ก.ย.</span>
                        <span className="text-green-600 font-medium">฿{formatPrice(tour.pricing.base_price)}</span>
                      </div>
                    </div>
                    <div className="text-xs text-green-600 mt-2 flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                      มีที่ว่าง 8-15 ที่นั่ง
                    </div>
                  </div>
                  
                  {/* ตุลาคม 2568 */}
                  <div className="p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200">
                    <div className="font-semibold text-sm text-gray-900 mb-2">ตุลาคม 2568</div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex justify-between items-center p-1.5 bg-white rounded">
                        <span>4-8 ต.ค.</span>
                        <span className="text-green-600 font-medium">฿{formatPrice(tour.pricing.base_price)}</span>
                      </div>
                      <div className="flex justify-between items-center p-1.5 bg-white rounded relative">
                        <span>11-15 ต.ค.</span>
                        <span className="text-red-600 font-medium">฿{formatPrice(tour.pricing.base_price + 3000)}</span>
                        <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded text-[10px]">วันหยุด</div>
                      </div>
                      <div className="flex justify-between items-center p-1.5 bg-white rounded relative">
                        <span>22-26 ต.ค.</span>
                        <span className="text-red-600 font-medium">฿{formatPrice(tour.pricing.base_price + 3000)}</span>
                        <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded text-[10px]">วันหยุด</div>
                      </div>
                      <div className="flex justify-between items-center p-1.5 bg-white rounded">
                        <span>29 ต.ค.-2 พ.ย.</span>
                        <span className="text-blue-600 font-medium">฿{formatPrice(tour.pricing.base_price + 1000)}</span>
                      </div>
                    </div>
                    <div className="text-xs text-orange-600 mt-2 flex items-center">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-1"></div>
                      เหลือน้อย 2-5 ที่นั่ง
                    </div>
                  </div>
                  
                  {/* พฤศจิกายน 2568 */}
                  <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                    <div className="font-semibold text-sm text-gray-900 mb-2">พฤศจิกายน 2568</div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex justify-between items-center p-1.5 bg-white rounded">
                        <span>5-9 พ.ย.</span>
                        <span className="text-green-600 font-medium">฿{formatPrice(tour.pricing.base_price)}</span>
                      </div>
                      <div className="flex justify-between items-center p-1.5 bg-white rounded">
                        <span>12-16 พ.ย.</span>
                        <span className="text-green-600 font-medium">฿{formatPrice(tour.pricing.base_price)}</span>
                      </div>
                      <div className="flex justify-between items-center p-1.5 bg-white rounded">
                        <span>19-23 พ.ย.</span>
                        <span className="text-green-600 font-medium">฿{formatPrice(tour.pricing.base_price)}</span>
                      </div>
                      <div className="flex justify-between items-center p-1.5 bg-white rounded">
                        <span>26-30 พ.ย.</span>
                        <span className="text-blue-600 font-medium">฿{formatPrice(tour.pricing.base_price + 1500)}</span>
                      </div>
                    </div>
                    <div className="text-xs text-green-600 mt-2 flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                      มีที่ว่าง 6-13 ที่นั่ง
                    </div>
                  </div>
                  
                  {/* ธันวาคม 2568 */}
                  <div className="p-3 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg border border-red-200">
                    <div className="font-semibold text-sm text-gray-900 mb-2">ธันวาคม 2568</div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex justify-between items-center p-1.5 bg-white rounded relative">
                        <span>4-8 ธ.ค.</span>
                        <span className="text-red-600 font-medium">฿{formatPrice(tour.pricing.base_price + 4000)}</span>
                        <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded text-[10px]">วันพ่อ</div>
                      </div>
                      <div className="flex justify-between items-center p-1.5 bg-white rounded relative">
                        <span>9-14 ธ.ค.</span>
                        <span className="text-red-600 font-medium">฿{formatPrice(tour.pricing.base_price + 4000)}</span>
                        <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs px-1 rounded text-[10px]">รธน.</div>
                      </div>
                      <div className="flex justify-between items-center p-1.5 bg-gray-100 rounded relative opacity-60">
                        <span>20-25 ธ.ค.</span>
                        <span className="text-gray-500 font-medium line-through">฿{formatPrice(tour.pricing.base_price + 6000)}</span>
                        <div className="absolute -top-1 -right-1 bg-gray-500 text-white text-xs px-1 rounded text-[10px]">เต็ม</div>
                      </div>
                      <div className="flex justify-between items-center p-1.5 bg-gray-100 rounded relative opacity-60">
                        <span>28 ธ.ค.-2 ม.ค.</span>
                        <span className="text-gray-500 font-medium line-through">฿{formatPrice(tour.pricing.base_price + 8000)}</span>
                        <div className="absolute -top-1 -right-1 bg-gray-500 text-white text-xs px-1 rounded text-[10px]">เต็ม</div>
                      </div>
                    </div>
                    <div className="text-xs text-red-600 mt-2 flex items-center">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-1"></div>
                      ช่วงเทศกาล - จองเต็มแล้ว
                    </div>
                  </div>
                  
                  {/* มกราคม 2569 */}
                  <div className="p-3 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-200">
                    <div className="font-semibold text-sm text-gray-900 mb-2">มกราคม 2569</div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex justify-between items-center p-1.5 bg-white rounded">
                        <span>3-7 ม.ค.</span>
                        <span className="text-blue-600 font-medium">฿{formatPrice(tour.pricing.base_price + 2000)}</span>
                      </div>
                      <div className="flex justify-between items-center p-1.5 bg-white rounded">
                        <span>10-14 ม.ค.</span>
                        <span className="text-green-600 font-medium">฿{formatPrice(tour.pricing.base_price)}</span>
                      </div>
                      <div className="flex justify-between items-center p-1.5 bg-white rounded">
                        <span>17-21 ม.ค.</span>
                        <span className="text-green-600 font-medium">฿{formatPrice(tour.pricing.base_price)}</span>
                      </div>
                      <div className="flex justify-between items-center p-1.5 bg-white rounded">
                        <span>24-28 ม.ค.</span>
                        <span className="text-green-600 font-medium">฿{formatPrice(tour.pricing.base_price)}</span>
                      </div>
                    </div>
                    <div className="text-xs text-green-600 mt-2 flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                      มีที่ว่าง 8-15 ที่นั่ง
                    </div>
                  </div>
                  
                  {/* กุมภาพันธ์ 2569 */}
                  <div className="p-3 bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg border border-pink-200">
                    <div className="font-semibold text-sm text-gray-900 mb-2">กุมภาพันธ์ 2569</div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex justify-between items-center p-1.5 bg-white rounded">
                        <span>7-11 ก.พ.</span>
                        <span className="text-green-600 font-medium">฿{formatPrice(tour.pricing.base_price)}</span>
                      </div>
                      <div className="flex justify-between items-center p-1.5 bg-white rounded relative">
                        <span>14-18 ก.พ.</span>
                        <span className="text-red-600 font-medium">฿{formatPrice(tour.pricing.base_price + 3500)}</span>
                        <div className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs px-1 rounded text-[10px]">วาเลน</div>
                      </div>
                      <div className="flex justify-between items-center p-1.5 bg-white rounded">
                        <span>21-25 ก.พ.</span>
                        <span className="text-green-600 font-medium">฿{formatPrice(tour.pricing.base_price)}</span>
                      </div>
                      <div className="flex justify-between items-center p-1.5 bg-white rounded">
                        <span>28 ก.พ.-4 มี.ค.</span>
                        <span className="text-green-600 font-medium">฿{formatPrice(tour.pricing.base_price)}</span>
                      </div>
                    </div>
                    <div className="text-xs text-green-600 mt-2 flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                      มีที่ว่าง 5-12 ที่นั่ง
                    </div>
                  </div>
                  
                  {/* มีนาคม 2569 */}
                  <div className="p-2 bg-gray-50 rounded">
                    <div className="font-medium text-sm text-gray-900">มีนาคม 2569</div>
                    <div className="text-xs text-gray-600 mt-1">
                      7-11, 14-18, 21-25, 28-1 เม.ย.
                    </div>
                    <div className="text-xs text-green-600">มีที่ว่าง</div>
                  </div>
                  <div className="p-2 bg-gray-50 rounded">
                    <div className="font-medium text-sm text-gray-900">เมษายน 2569</div>
                    <div className="text-xs text-gray-600 mt-1">
                      4-8, 11-15, 18-22, 25-29 เม.ย.
                    </div>
                    <div className="text-xs text-orange-600">เหลือน้อย</div>
                  </div>
                  <div className="p-2 bg-gray-50 rounded">
                    <div className="font-medium text-sm text-gray-900">พฤษภาคม 2569</div>
                    <div className="text-xs text-gray-600 mt-1">
                      2-6, 9-13, 16-20, 23-27 พ.ค.
                    </div>
                    <div className="text-xs text-green-600">มีที่ว่าง</div>
                  </div>
                  <div className="p-2 bg-gray-50 rounded">
                    <div className="font-medium text-sm text-gray-900">มิถุนายน 2569</div>
                    <div className="text-xs text-gray-600 mt-1">
                      6-10, 13-17, 20-24, 27-1 ก.ค.
                    </div>
                    <div className="text-xs text-green-600">มีที่ว่าง</div>
                  </div>
                  <div className="p-2 bg-gray-50 rounded">
                    <div className="font-medium text-sm text-gray-900">กรกฎาคม 2569</div>
                    <div className="text-xs text-gray-600 mt-1">
                      4-8, 11-15, 18-22, 25-29 ก.ค.
                    </div>
                    <div className="text-xs text-orange-600">เหลือน้อย</div>
                  </div>
                  <div className="p-2 bg-gray-50 rounded">
                    <div className="font-medium text-sm text-gray-900">สิงหาคม 2569</div>
                    <div className="text-xs text-gray-600 mt-1">
                      1-5, 8-12, 15-19, 22-26, 29-2 ก.ย.
                    </div>
                    <div className="text-xs text-green-600">มีที่ว่าง</div>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-3 pt-3 border-t">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setShowTravelDates(false)}
                    className="text-xs"
                  >
                    ปิด
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    className="flex-1 text-xs"
                    rightIcon={<ArrowRight className="w-3 h-3" />}
                  >
                    เลือกวันเดินทาง
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    )
  }

    // V8 - V7 + Improved Month UI
    if (compactVersion === 'v8') {
      return (
        <Card 
          variant="interactive" 
          className="overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-md"
        >
          <div className="p-4">
            {/* Compact Header */}
            <div className="flex gap-3 mb-3">
              <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={tour.media.hero_image}
                  alt={tour.title}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-base text-gray-900 mb-1 line-clamp-2">
                  {tour.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2 line-clamp-1">
                  {tour.location.cities?.slice(0, 3).join(' • ') || tour.location.region || 'ไทเป • เชียงใหม่ • ภูเก็ต'}, {tour.location.country}
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-bold text-blue-600">
                    ฿{formatPrice(tour.pricing.base_price)}
                  </span>
                  <span className="text-gray-500">/คน</span>
                </div>
              </div>
            </div>
            
            {/* Travel Dates Expansion Section */}
            <div className="border-t pt-3">
              <button 
                className="flex items-center justify-between w-full p-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
                onClick={() => setShowTravelDates(!showTravelDates)}
              >
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="font-medium text-gray-900 text-sm">ช่วงเวลาเดินทาง</span>
                  <span className="ml-2 text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                    32 รอบ
                  </span>
                </div>
                <div className="flex items-center text-blue-600">
                  <span className="text-xs mr-1">{showTravelDates ? 'ย่อ' : 'ดูช่วงเวลาเดินทาง'}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showTravelDates ? 'rotate-180' : ''}`} />
                </div>
              </button>
              
              {showTravelDates && (
                <div className="mt-3 max-h-60 overflow-y-auto">
                  <div className="space-y-3">
                    {/* กันยายน 2568 */}
                    <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                      <div className="font-semibold text-sm text-gray-900 mb-2">กันยายน 2568</div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex justify-between items-center p-1.5 bg-white rounded">
                          <span>2-6 ก.ย.</span>
                          <span className="text-green-600 font-medium">฿{formatPrice(tour.pricing.base_price)}</span>
                        </div>
                        <div className="flex justify-between items-center p-1.5 bg-white rounded">
                          <span>10-14 ก.ย.</span>
                          <span className="text-green-600 font-medium">฿{formatPrice(tour.pricing.base_price)}</span>
                        </div>
                        <div className="flex justify-between items-center p-1.5 bg-white rounded">
                          <span>19-23 ก.ย.</span>
                          <span className="text-blue-600 font-medium">฿{formatPrice(tour.pricing.base_price + 2000)}</span>
                        </div>
                        <div className="flex justify-between items-center p-1.5 bg-white rounded">
                          <span>26-30 ก.ย.</span>
                          <span className="text-green-600 font-medium">฿{formatPrice(tour.pricing.base_price)}</span>
                        </div>
                      </div>
                      <div className="text-xs text-green-600 mt-2 flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                        มีที่ว่าง 8-15 ที่นั่ง
                      </div>
                    </div>
                    
                    {/* ตุลาคม 2568 */}
                    <div className="p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200">
                      <div className="font-semibold text-sm text-gray-900 mb-2">ตุลาคม 2568</div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex justify-between items-center p-1.5 bg-white rounded">
                          <span>4-8 ต.ค.</span>
                          <span className="text-green-600 font-medium">฿{formatPrice(tour.pricing.base_price)}</span>
                        </div>
                        <div className="flex justify-between items-center p-1.5 bg-white rounded relative">
                          <span>11-15 ต.ค.</span>
                          <span className="text-red-600 font-medium">฿{formatPrice(tour.pricing.base_price + 3000)}</span>
                          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded text-[10px]">วันหยุด</div>
                        </div>
                        <div className="flex justify-between items-center p-1.5 bg-white rounded relative">
                          <span>22-26 ต.ค.</span>
                          <span className="text-red-600 font-medium">฿{formatPrice(tour.pricing.base_price + 3000)}</span>
                          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded text-[10px]">วันหยุด</div>
                        </div>
                        <div className="flex justify-between items-center p-1.5 bg-white rounded">
                          <span>29 ต.ค.-2 พ.ย.</span>
                          <span className="text-blue-600 font-medium">฿{formatPrice(tour.pricing.base_price + 1000)}</span>
                        </div>
                      </div>
                      <div className="text-xs text-orange-600 mt-2 flex items-center">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mr-1"></div>
                        เหลือน้อย 2-5 ที่นั่ง
                      </div>
                    </div>
                    
                    {/* พฤศจิกายน 2568 */}
                    <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                      <div className="font-semibold text-sm text-gray-900 mb-2">พฤศจิกายน 2568</div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex justify-between items-center p-1.5 bg-white rounded">
                          <span>5-9 พ.ย.</span>
                          <span className="text-green-600 font-medium">฿{formatPrice(tour.pricing.base_price)}</span>
                        </div>
                        <div className="flex justify-between items-center p-1.5 bg-white rounded">
                          <span>12-16 พ.ย.</span>
                          <span className="text-green-600 font-medium">฿{formatPrice(tour.pricing.base_price)}</span>
                        </div>
                        <div className="flex justify-between items-center p-1.5 bg-white rounded">
                          <span>19-23 พ.ย.</span>
                          <span className="text-green-600 font-medium">฿{formatPrice(tour.pricing.base_price)}</span>
                        </div>
                        <div className="flex justify-between items-center p-1.5 bg-white rounded">
                          <span>26-30 พ.ย.</span>
                          <span className="text-blue-600 font-medium">฿{formatPrice(tour.pricing.base_price + 1500)}</span>
                        </div>
                      </div>
                      <div className="text-xs text-green-600 mt-2 flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                        มีที่ว่าง 6-13 ที่นั่ง
                      </div>
                    </div>
                    
                    {/* ธันวาคม 2568 */}
                    <div className="p-3 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg border border-red-200">
                      <div className="font-semibold text-sm text-gray-900 mb-2">ธันวาคม 2568</div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex justify-between items-center p-1.5 bg-white rounded relative">
                          <span>4-8 ธ.ค.</span>
                          <span className="text-red-600 font-medium">฿{formatPrice(tour.pricing.base_price + 4000)}</span>
                          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded text-[10px]">วันพ่อ</div>
                        </div>
                        <div className="flex justify-between items-center p-1.5 bg-white rounded relative">
                          <span>9-14 ธ.ค.</span>
                          <span className="text-red-600 font-medium">฿{formatPrice(tour.pricing.base_price + 4000)}</span>
                          <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs px-1 rounded text-[10px]">รธน.</div>
                        </div>
                        <div className="flex justify-between items-center p-1.5 bg-gray-100 rounded relative opacity-60">
                          <span>20-25 ธ.ค.</span>
                          <span className="text-gray-500 font-medium line-through">฿{formatPrice(tour.pricing.base_price + 6000)}</span>
                          <div className="absolute -top-1 -right-1 bg-gray-500 text-white text-xs px-1 rounded text-[10px]">เต็ม</div>
                        </div>
                        <div className="flex justify-between items-center p-1.5 bg-gray-100 rounded relative opacity-60">
                          <span>28 ธ.ค.-2 ม.ค.</span>
                          <span className="text-gray-500 font-medium line-through">฿{formatPrice(tour.pricing.base_price + 8000)}</span>
                          <div className="absolute -top-1 -right-1 bg-gray-500 text-white text-xs px-1 rounded text-[10px]">เต็ม</div>
                        </div>
                      </div>
                      <div className="text-xs text-red-600 mt-2 flex items-center">
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-1"></div>
                        ช่วงเทศกาล - จองเต็มแล้ว
                      </div>
                    </div>
                    
                    {/* มกราคม 2569 */}
                    <div className="p-3 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-200">
                      <div className="font-semibold text-sm text-gray-900 mb-2">มกราคม 2569</div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex justify-between items-center p-1.5 bg-white rounded">
                          <span>3-7 ม.ค.</span>
                          <span className="text-blue-600 font-medium">฿{formatPrice(tour.pricing.base_price + 2000)}</span>
                        </div>
                        <div className="flex justify-between items-center p-1.5 bg-white rounded">
                          <span>10-14 ม.ค.</span>
                          <span className="text-green-600 font-medium">฿{formatPrice(tour.pricing.base_price)}</span>
                        </div>
                        <div className="flex justify-between items-center p-1.5 bg-white rounded">
                          <span>17-21 ม.ค.</span>
                          <span className="text-green-600 font-medium">฿{formatPrice(tour.pricing.base_price)}</span>
                        </div>
                        <div className="flex justify-between items-center p-1.5 bg-white rounded">
                          <span>24-28 ม.ค.</span>
                          <span className="text-green-600 font-medium">฿{formatPrice(tour.pricing.base_price)}</span>
                        </div>
                      </div>
                      <div className="text-xs text-green-600 mt-2 flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                        มีที่ว่าง 8-15 ที่นั่ง
                      </div>
                    </div>
                    
                    {/* กุมภาพันธ์ 2569 */}
                    <div className="p-3 bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg border border-pink-200">
                      <div className="font-semibold text-sm text-gray-900 mb-2">กุมภาพันธ์ 2569</div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex justify-between items-center p-1.5 bg-white rounded">
                          <span>7-11 ก.พ.</span>
                          <span className="text-green-600 font-medium">฿{formatPrice(tour.pricing.base_price)}</span>
                        </div>
                        <div className="flex justify-between items-center p-1.5 bg-white rounded relative">
                          <span>14-18 ก.พ.</span>
                          <span className="text-red-600 font-medium">฿{formatPrice(tour.pricing.base_price + 3500)}</span>
                          <div className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs px-1 rounded text-[10px]">วาเลน</div>
                        </div>
                        <div className="flex justify-between items-center p-1.5 bg-white rounded">
                          <span>21-25 ก.พ.</span>
                          <span className="text-green-600 font-medium">฿{formatPrice(tour.pricing.base_price)}</span>
                        </div>
                        <div className="flex justify-between items-center p-1.5 bg-white rounded">
                          <span>28 ก.พ.-4 มี.ค.</span>
                          <span className="text-green-600 font-medium">฿{formatPrice(tour.pricing.base_price)}</span>
                        </div>
                      </div>
                      <div className="text-xs text-green-600 mt-2 flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                        มีที่ว่าง 5-12 ที่นั่ง
                      </div>
                    </div>
                    
                    {/* มีนาคม 2569 - Improved UI */}
                    <div className="p-3 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg border border-teal-200">
                      <div className="font-semibold text-sm text-gray-900 mb-2">มีนาคม 2569</div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex justify-between items-center p-1.5 bg-white rounded">
                          <span>7-11 มี.ค.</span>
                          <span className="text-green-600 font-medium">฿{formatPrice(tour.pricing.base_price)}</span>
                        </div>
                        <div className="flex justify-between items-center p-1.5 bg-white rounded">
                          <span>14-18 มี.ค.</span>
                          <span className="text-green-600 font-medium">฿{formatPrice(tour.pricing.base_price)}</span>
                        </div>
                        <div className="flex justify-between items-center p-1.5 bg-white rounded">
                          <span>21-25 มี.ค.</span>
                          <span className="text-green-600 font-medium">฿{formatPrice(tour.pricing.base_price)}</span>
                        </div>
                        <div className="flex justify-between items-center p-1.5 bg-white rounded">
                          <span>28 มี.ค.-1 เม.ย.</span>
                          <span className="text-green-600 font-medium">฿{formatPrice(tour.pricing.base_price)}</span>
                        </div>
                      </div>
                      <div className="text-xs text-green-600 mt-2 flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                        มีที่ว่าง 7-14 ที่นั่ง
                      </div>
                    </div>
                    
                    {/* เมษายน 2569 - Improved UI */}
                    <div className="p-3 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg border border-yellow-200">
                      <div className="font-semibold text-sm text-gray-900 mb-2">เมษายน 2569</div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex justify-between items-center p-1.5 bg-white rounded">
                          <span>4-8 เม.ย.</span>
                          <span className="text-green-600 font-medium">฿{formatPrice(tour.pricing.base_price)}</span>
                        </div>
                        <div className="flex justify-between items-center p-1.5 bg-white rounded relative">
                          <span>11-15 เม.ย.</span>
                          <span className="text-red-600 font-medium">฿{formatPrice(tour.pricing.base_price + 2500)}</span>
                          <div className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs px-1 rounded text-[10px]">สงกรานต์</div>
                        </div>
                        <div className="flex justify-between items-center p-1.5 bg-white rounded">
                          <span>18-22 เม.ย.</span>
                          <span className="text-orange-600 font-medium">฿{formatPrice(tour.pricing.base_price + 1000)}</span>
                        </div>
                        <div className="flex justify-between items-center p-1.5 bg-white rounded">
                          <span>25-29 เม.ย.</span>
                          <span className="text-green-600 font-medium">฿{formatPrice(tour.pricing.base_price)}</span>
                        </div>
                      </div>
                      <div className="text-xs text-orange-600 mt-2 flex items-center">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mr-1"></div>
                        เหลือน้อย 3-8 ที่นั่ง
                      </div>
                    </div>
                    
                    {/* พฤษภาคม 2569 - Improved UI */}
                    <div className="p-3 bg-gradient-to-r from-lime-50 to-green-50 rounded-lg border border-lime-200">
                      <div className="font-semibold text-sm text-gray-900 mb-2">พฤษภาคม 2569</div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex justify-between items-center p-1.5 bg-white rounded relative">
                          <span>2-6 พ.ค.</span>
                          <span className="text-red-600 font-medium">฿{formatPrice(tour.pricing.base_price + 3000)}</span>
                          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded text-[10px]">วันแรงงาน</div>
                        </div>
                        <div className="flex justify-between items-center p-1.5 bg-white rounded">
                          <span>9-13 พ.ค.</span>
                          <span className="text-green-600 font-medium">฿{formatPrice(tour.pricing.base_price)}</span>
                        </div>
                        <div className="flex justify-between items-center p-1.5 bg-white rounded">
                          <span>16-20 พ.ค.</span>
                          <span className="text-green-600 font-medium">฿{formatPrice(tour.pricing.base_price)}</span>
                        </div>
                        <div className="flex justify-between items-center p-1.5 bg-white rounded">
                          <span>23-27 พ.ค.</span>
                          <span className="text-green-600 font-medium">฿{formatPrice(tour.pricing.base_price)}</span>
                        </div>
                      </div>
                      <div className="text-xs text-green-600 mt-2 flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                        มีที่ว่าง 6-12 ที่นั่ง
                      </div>
                    </div>
                    
                    {/* มิถุนายน 2569 - Improved UI */}
                    <div className="p-3 bg-gradient-to-r from-sky-50 to-blue-50 rounded-lg border border-sky-200">
                      <div className="font-semibold text-sm text-gray-900 mb-2">มิถุนายน 2569</div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex justify-between items-center p-1.5 bg-white rounded">
                          <span>6-10 มิ.ย.</span>
                          <span className="text-green-600 font-medium">฿{formatPrice(tour.pricing.base_price)}</span>
                        </div>
                        <div className="flex justify-between items-center p-1.5 bg-white rounded">
                          <span>13-17 มิ.ย.</span>
                          <span className="text-green-600 font-medium">฿{formatPrice(tour.pricing.base_price)}</span>
                        </div>
                        <div className="flex justify-between items-center p-1.5 bg-white rounded">
                          <span>20-24 มิ.ย.</span>
                          <span className="text-green-600 font-medium">฿{formatPrice(tour.pricing.base_price)}</span>
                        </div>
                        <div className="flex justify-between items-center p-1.5 bg-white rounded">
                          <span>27 มิ.ย.-1 ก.ค.</span>
                          <span className="text-green-600 font-medium">฿{formatPrice(tour.pricing.base_price)}</span>
                        </div>
                      </div>
                      <div className="text-xs text-green-600 mt-2 flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                        มีที่ว่าง 8-15 ที่นั่ง
                      </div>
                    </div>
                    
                    {/* กรกฎาคม 2569 - Improved UI */}
                    <div className="p-3 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-200">
                      <div className="font-semibold text-sm text-gray-900 mb-2">กรกฎาคม 2569</div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex justify-between items-center p-1.5 bg-white rounded">
                          <span>4-8 ก.ค.</span>
                          <span className="text-blue-600 font-medium">฿{formatPrice(tour.pricing.base_price + 1500)}</span>
                        </div>
                        <div className="flex justify-between items-center p-1.5 bg-white rounded">
                          <span>11-15 ก.ค.</span>
                          <span className="text-orange-600 font-medium">฿{formatPrice(tour.pricing.base_price + 2000)}</span>
                        </div>
                        <div className="flex justify-between items-center p-1.5 bg-white rounded">
                          <span>18-22 ก.ค.</span>
                          <span className="text-orange-600 font-medium">฿{formatPrice(tour.pricing.base_price + 2000)}</span>
                        </div>
                        <div className="flex justify-between items-center p-1.5 bg-white rounded">
                          <span>25-29 ก.ค.</span>
                          <span className="text-blue-600 font-medium">฿{formatPrice(tour.pricing.base_price + 1500)}</span>
                        </div>
                      </div>
                      <div className="text-xs text-orange-600 mt-2 flex items-center">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mr-1"></div>
                        เหลือน้อย 2-6 ที่นั่ง
                      </div>
                    </div>
                    
                    {/* สิงหาคม 2569 - Improved UI */}
                    <div className="p-3 bg-gradient-to-r from-violet-50 to-purple-50 rounded-lg border border-violet-200">
                      <div className="font-semibold text-sm text-gray-900 mb-2">สิงหาคม 2569</div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex justify-between items-center p-1.5 bg-white rounded">
                          <span>1-5 ส.ค.</span>
                          <span className="text-green-600 font-medium">฿{formatPrice(tour.pricing.base_price)}</span>
                        </div>
                        <div className="flex justify-between items-center p-1.5 bg-white rounded relative">
                          <span>8-12 ส.ค.</span>
                          <span className="text-red-600 font-medium">฿{formatPrice(tour.pricing.base_price + 3500)}</span>
                          <div className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs px-1 rounded text-[10px]">วันแม่</div>
                        </div>
                        <div className="flex justify-between items-center p-1.5 bg-white rounded">
                          <span>15-19 ส.ค.</span>
                          <span className="text-green-600 font-medium">฿{formatPrice(tour.pricing.base_price)}</span>
                        </div>
                        <div className="flex justify-between items-center p-1.5 bg-white rounded">
                          <span>22-26 ส.ค.</span>
                          <span className="text-green-600 font-medium">฿{formatPrice(tour.pricing.base_price)}</span>
                        </div>
                        <div className="flex justify-between items-center p-1.5 bg-white rounded">
                          <span>29 ส.ค.-2 ก.ย.</span>
                          <span className="text-green-600 font-medium">฿{formatPrice(tour.pricing.base_price)}</span>
                        </div>
                      </div>
                      <div className="text-xs text-green-600 mt-2 flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                        มีที่ว่าง 4-11 ที่นั่ง
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-3 pt-3 border-t">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setShowTravelDates(false)}
                      className="text-xs"
                    >
                      ปิด
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      className="flex-1 text-xs"
                      rightIcon={<ArrowRight className="w-3 h-3" />}
                    >
                      เลือกวันเดินทาง
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>
      )
    }

    // V9 - Compact Program Tour Card - Modern Material Design
    if (compactVersion === 'v9') {
      return (
        <Card 
          variant="interactive" 
          className="overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-xl hover:scale-[1.02] group relative bg-gradient-to-br from-slate-50 via-white to-blue-50/30"
          onClick={() => onExpandToggle?.(tour.metadata.id)}
        >
          {/* Modern gradient accent bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
          
          {/* Content Container with Material Design spacing */}
          <div className="p-5">
            {/* Header Section - Minimal & Modern */}
            <div className="flex items-start gap-4 mb-4">
              {/* Compact Image with modern styling */}
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 shadow-md group-hover:shadow-lg transition-shadow">
                <Image
                  src={tour.media.hero_image}
                  alt={tour.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="64px"
                />
                {/* Modern overlay icon */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <div className="w-6 h-6 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-3 h-3 text-gray-700" />
                  </div>
                </div>
              </div>
              
              {/* Title & Location - Typography focused */}
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-2 leading-tight tracking-tight">
                  {tour.title}
                </h3>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 mr-1.5 text-blue-500" />
                  <span className="font-medium">{tour.location.city}</span>
                  <span className="mx-2 text-gray-300">•</span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-amber-400 mr-1" />
                    <span className="font-medium">{tour.rating?.average || '4.8'}</span>
                    <span className="text-gray-400 text-xs ml-1">({tour.rating?.count || '127'})</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Program Features - Compact pills */}
            <div className="flex gap-2 mb-4 flex-wrap">
              <div className="inline-flex items-center px-3 py-1.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                <Clock className="w-3 h-3 mr-1" />
                {tour.duration_days}วัน {tour.nights}คืน
              </div>
              <div className="inline-flex items-center px-3 py-1.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                <Users className="w-3 h-3 mr-1" />
                โปรแกรมกลุ่ม
              </div>
              {hasDiscount && (
                <div className="inline-flex items-center px-3 py-1.5 bg-red-100 text-red-700 text-xs font-bold rounded-full animate-pulse">
                  <Zap className="w-3 h-3 mr-1" />
                  ลด {tour.pricing.discount_percentage}%
                </div>
              )}
            </div>
            
            {/* Price Section - Modern layout */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex flex-col">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-blue-600">
                    ฿{formatPrice(tour.pricing.base_price)}
                  </span>
                  {hasDiscount && (
                    <span className="text-sm text-gray-400 line-through">
                      ฿{formatPrice(tour.pricing.original_price || tour.pricing.base_price * 1.2)}
                    </span>
                  )}
                </div>
                <span className="text-xs text-gray-500 font-medium">ต่อคน / รวมทุกค่าใช้จ่าย</span>
              </div>
              
              {/* CTA Button - Minimal modern */}
              <div className="flex items-center gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 shadow-md hover:shadow-lg transition-all px-4 py-2 text-sm font-semibold rounded-xl"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  ดูรายละเอียด
                </Button>
              </div>
            </div>
            
            {/* Availability indicator - Subtle */}
            {tour.availability.available_seats <= 10 && (
              <div className="mt-3 flex items-center justify-center">
                <div className="inline-flex items-center px-3 py-1 bg-orange-50 text-orange-700 text-xs rounded-lg border border-orange-200">
                  <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2 animate-pulse"></div>
                  เหลือที่ว่าง {tour.availability.available_seats} ที่นั่ง
                </div>
              </div>
            )}
          </div>
        </Card>
      )
    }

    // V10 - Mobile First Large Compact Card - Instagram Story Style
    if (compactVersion === 'v10') {
      return (
        <Card 
          variant="interactive" 
          className="overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl active:scale-[0.98] group relative bg-white border-2 border-gray-100 hover:border-blue-200"
          onClick={() => onExpandToggle?.(tour.metadata.id)}
        >
          {/* Hero Image Section - Instagram Story Style */}
          <div className="relative h-64 sm:h-72 overflow-hidden">
            <Image
              src={tour.media.hero_image}
              alt={tour.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            
            {/* Top Badges */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
              {/* Flash Sale or Discount Badge */}
              {isFlashSale ? (
                <FlashSaleBadge 
                  discount={flashSaleDiscount} 
                  endTime={flashSaleEndTime}
                  size="md"
                />
              ) : hasDiscount ? (
                <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
                  🔥 ลด {tour.pricing.discount_percentage}%
                </div>
              ) : (
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  ⭐ ยอดนิยม
                </div>
              )}
              
              {/* Wishlist Heart */}
              {showWishlist && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    onWishlistToggle?.(tour.metadata.id)
                  }}
                  className="bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
                  aria-label={isWishlisted ? 'ลบจากรายการโปรด' : 'เพิ่มในรายการโปรด'}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                </Button>
              )}
            </div>
            
            {/* Bottom Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
              {/* Duration & Rating */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full">
                  <Clock className="w-4 h-4 mr-1.5" />
                  <span className="font-semibold text-sm">{tour.duration_days}วัน{tour.nights}คืน</span>
                </div>
                <div className="flex items-center bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full">
                  <Star className="w-4 h-4 text-yellow-300 mr-1" />
                  <span className="font-semibold text-sm">{tour.rating?.average || '4.8'}</span>
                  <span className="text-xs ml-1 opacity-80">({tour.rating?.count || '127'})</span>
                </div>
              </div>
              
              {/* Location */}
              <div className="flex items-center mb-2">
                <MapPin className="w-5 h-5 text-blue-300 mr-2" />
                <span className="text-lg font-bold">{tour.location.cities?.slice(0, 3).join(' • ') || tour.location.region || 'ไทเป • เชียงใหม่ • ภูเก็ต'}, {tour.location.country}</span>
              </div>
            </div>
          </div>
          
          {/* Content Section */}
          <div className="p-6">
            {/* Title */}
            <h3 className="font-bold text-xl text-gray-900 mb-3 line-clamp-2 leading-tight">
              {tour.title}
            </h3>
            
            {/* Features Grid - Mobile First */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="flex items-center bg-blue-50 p-3 rounded-xl">
                <Users className="w-5 h-5 text-blue-600 mr-2" />
                <div className="text-left">
                  <div className="text-xs text-blue-600 font-medium">ประเภท</div>
                  <div className="text-sm font-bold text-gray-900">โปรแกรมกลุ่ม</div>
                </div>
              </div>
              
              <div className="flex items-center bg-green-50 p-3 rounded-xl">
                <Globe className="w-5 h-5 text-green-600 mr-2" />
                <div className="text-left">
                  <div className="text-xs text-green-600 font-medium">ปลายทาง</div>
                  <div className="text-sm font-bold text-gray-900">{tour.location.country}</div>
                </div>
              </div>
            </div>
            
            {/* Availability Alert - Mobile Optimized */}
            {tour.availability.available_seats <= 10 && (
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border-l-4 border-orange-400 p-4 rounded-lg mb-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-orange-400 rounded-full mr-3 animate-pulse"></div>
                  <div>
                    <div className="text-sm font-bold text-orange-800">เหลือที่นั่งน้อย!</div>
                    <div className="text-xs text-orange-600">เหลือเพียง {tour.availability.available_seats} ที่นั่งเท่านั้น</div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Price Section - Mobile First Design */}
            <div className="bg-gray-50 rounded-2xl p-4 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-xs text-gray-500 mb-1">ราคาเริ่มต้น</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-blue-600">
                      ฿{formatPrice(tour.pricing.base_price)}
                    </span>
                    {hasDiscount && (
                      <span className="text-lg text-gray-400 line-through">
                        ฿{formatPrice(tour.pricing.original_price || tour.pricing.base_price * 1.2)}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">ต่อคน / รวมทุกค่าใช้จ่าย</div>
                </div>
                
                {hasDiscount && (
                  <div className="text-right">
                    <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      ประหยัด ฿{formatPrice(discountSavings)}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* CTA Section - Mobile First */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="primary"
                className="flex-1 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 hover:from-blue-700 hover:via-blue-800 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all py-4 text-base font-bold rounded-xl"
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                ดูรายละเอียดทัวร์
              </Button>
              
              <Button
                variant="secondary"
                size="md"
                className="sm:w-auto bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 py-4 px-6 rounded-xl font-semibold"
                leftIcon={<MessageCircle className="w-5 h-5" />}
                onClick={(e) => {
                  e.stopPropagation()
                  onQuickBook?.(tour)
                }}
              >
                สอบถาม
              </Button>
            </div>
            
            {/* Next Departure - Mobile Optimized */}
            {nextDeparture && (
              <div className="mt-4 p-3 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-blue-600 mr-2" />
                    <span className="text-sm font-medium text-blue-900">ช่วงเวลาเดินทางถัดไป</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-blue-900">{nextDeparture.date_range}</div>
                    <div className="text-xs text-blue-600">
                      เหลือ {nextDeparture.available_seats} ที่นั่ง
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>
      )
    }

    // V11 - Extra Large Mobile-First TikTok-Style Vertical Card
    if (compactVersion === 'v11') {
      return (
        <Card 
          variant="interactive" 
          className="overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl active:scale-[0.99] group relative bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20 border-0 shadow-xl"
          onClick={() => onExpandToggle?.(tour.metadata.id)}
        >
          {/* TikTok-Style Vertical Hero Section */}
          <div className="relative h-80 sm:h-96 overflow-hidden rounded-t-2xl">
            <Image
              src={tour.media.hero_image}
              alt={tour.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            />
            
            {/* Dark gradient overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
            
            {/* Floating Action Buttons - Top Right */}
            <div className="absolute top-6 right-6 flex flex-col gap-3 z-20">
              {/* Share Button */}
              <div className="w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6 text-blue-600" />
              </div>
              
              {/* Wishlist Heart */}
              {showWishlist && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    onWishlistToggle?.(tour.metadata.id)
                  }}
                  className="w-12 h-12 bg-white/90 backdrop-blur-md rounded-full p-0 hover:bg-white hover:scale-110 transition-all"
                  aria-label={isWishlisted ? 'ลบจากรายการโปรด' : 'เพิ่มในรายการโปรด'}
                >
                  <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                </Button>
              )}
            </div>
            
            {/* Premium Badge - Top Left */}
            <div className="absolute top-6 left-6 z-20">
              {isFlashSale ? (
                <div className="bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 text-white px-6 py-3 rounded-2xl shadow-2xl animate-pulse">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-300" />
                    <span className="font-black text-lg">FLASH SALE</span>
                  </div>
                  <div className="text-center text-2xl font-black mt-1">-{flashSaleDiscount}%</div>
                </div>
              ) : hasDiscount ? (
                <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-2xl shadow-xl">
                  <div className="flex items-center gap-2">
                    <div className="text-2xl">🔥</div>
                    <div>
                      <div className="font-bold text-sm">ส่วนลด</div>
                      <div className="font-black text-xl">-{tour.pricing.discount_percentage}%</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-2xl shadow-xl">
                  <div className="flex items-center gap-2">
                    <div className="text-2xl">⭐</div>
                    <div>
                      <div className="font-bold text-sm">ทัวร์</div>
                      <div className="font-black text-xl">ยอดนิยม</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Bottom Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-10">
              {/* Quick Stats Row */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center bg-white/20 backdrop-blur-xl px-4 py-2 rounded-full border border-white/30">
                  <Clock className="w-5 h-5 mr-2" />
                  <span className="font-bold text-lg">{tour.duration_days}วัน{tour.nights}คืน</span>
                </div>
                <div className="flex items-center bg-white/20 backdrop-blur-xl px-4 py-2 rounded-full border border-white/30">
                  <Star className="w-5 h-5 text-yellow-300 mr-2" />
                  <span className="font-bold text-lg">{tour.rating?.average || '4.8'}</span>
                  <span className="text-sm ml-1 opacity-90">({tour.rating?.count || '127'})</span>
                </div>
              </div>
              
              {/* Location & Country */}
              <div className="mb-3">
                <div className="flex items-center mb-1">
                  <MapPin className="w-6 h-6 text-blue-300 mr-2" />
                  <span className="text-2xl font-black tracking-tight">{tour.location.city}</span>
                </div>
                <div className="text-lg font-semibold opacity-90 ml-8">{tour.location.country}</div>
              </div>
            </div>
          </div>
          
          {/* Extended Content Section */}
          <div className="p-8 space-y-6">
            {/* Title Section */}
            <div>
              <h3 className="font-black text-2xl sm:text-3xl text-gray-900 mb-3 line-clamp-2 leading-tight">
                {tour.title}
              </h3>
              
              {/* Tour Type Badge */}
              <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-4 py-2 rounded-full border border-blue-200">
                <Users className="w-5 h-5 mr-2" />
                <span className="font-bold text-lg">โปรแกรมทัวร์กลุ่ม</span>
              </div>
            </div>
            
            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-2xl border border-green-200">
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-green-600">รวมค่าใช้จ่าย</div>
                    <div className="font-bold text-green-800">ครบทุกอย่าง</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-2xl border border-blue-200">
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                    <Globe className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-blue-600">ปลายทาง</div>
                    <div className="font-bold text-blue-800">{tour.location.country}</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-2xl border border-purple-200">
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-purple-600">คะแนน</div>
                    <div className="font-bold text-purple-800">{tour.rating?.average || '4.8'}/5</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Availability Alert - Enhanced */}
            {tour.availability.available_seats <= 15 && (
              <div className="bg-gradient-to-r from-orange-100 via-yellow-50 to-orange-100 border-2 border-orange-300 p-6 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-400 animate-pulse"></div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-orange-500 rounded-full mr-4 relative">
                    <div className="absolute inset-0 bg-orange-400 rounded-full animate-ping"></div>
                    <div className="relative w-full h-full bg-orange-500 rounded-full"></div>
                  </div>
                  <div>
                    <div className="font-black text-xl text-orange-800 mb-1">🔥 ที่นั่งใกล้เต็มแล้ว!</div>
                    <div className="text-orange-700 font-medium">เหลือเพียง {tour.availability.available_seats} ที่นั่ง จาก {tour.availability.total_seats || 45} ที่นั่ง</div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Premium Price Display */}
            <div className="bg-gradient-to-r from-gray-50 via-white to-gray-50 p-8 rounded-3xl border-2 border-gray-200 shadow-inner">
              <div className="text-center mb-4">
                <div className="text-lg font-semibold text-gray-600 mb-2">ราคาพิเศษเริ่มต้น</div>
                <div className="flex items-center justify-center gap-4">
                  <span className="text-5xl font-black text-blue-600 tracking-tight">
                    ฿{formatPrice(tour.pricing.base_price)}
                  </span>
                  {hasDiscount && (
                    <div className="text-right">
                      <div className="text-2xl text-gray-400 line-through font-bold">
                        ฿{formatPrice(tour.pricing.original_price || tour.pricing.base_price * 1.2)}
                      </div>
                      <div className="bg-red-500 text-white px-4 py-2 rounded-full text-lg font-bold">
                        ประหยัด ฿{formatPrice(discountSavings)}
                      </div>
                    </div>
                  )}
                </div>
                <div className="text-gray-500 font-medium mt-2">ต่อคน / รวมทุกค่าใช้จ่าย ไม่มีค่าซ่อนเร้น</div>
              </div>
            </div>
            
            {/* Triple CTA Section - Mobile First */}
            <div className="space-y-4">
              {/* Primary CTA */}
              <Button
                variant="primary"
                className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white border-0 shadow-2xl hover:shadow-3xl transition-all py-6 text-xl font-black rounded-2xl relative overflow-hidden"
                rightIcon={<ArrowRight className="w-6 h-6" />}
              >
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <span className="relative">ดูรายละเอียดทัวร์เต็ม</span>
              </Button>
              
              {/* Secondary CTAs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button
                  variant="secondary"
                  className="py-5 px-6 bg-white border-3 border-blue-600 text-blue-600 hover:bg-blue-50 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
                  leftIcon={<MessageCircle className="w-5 h-5" />}
                  onClick={(e) => {
                    e.stopPropagation()
                    onQuickBook?.(tour)
                  }}
                >
                  สอบถามรายละเอียด
                </Button>
                
                <Button
                  variant="secondary"
                  className="py-5 px-6 bg-green-50 border-3 border-green-600 text-green-600 hover:bg-green-100 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
                  leftIcon={<Calendar className="w-5 h-5" />}
                >
                  ดูช่วงเวลาเดินทาง
                </Button>
              </div>
            </div>
            
            {/* Next Departure Enhanced */}
            {nextDeparture && (
              <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 p-6 rounded-2xl border-2 border-blue-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-blue-900">ช่วงเวลาเดินทางถัดไป</div>
                      <div className="text-blue-700 font-medium">พร้อมออกเดินทาง</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-blue-900">{nextDeparture.date_range}</div>
                    <div className="text-blue-600 font-semibold">
                      เหลือ {nextDeparture.available_seats} / {nextDeparture.total_seats || 45} ที่นั่ง
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>
      )
    }
  }
  
  // Card view
  return (
    <Card 
      variant="interactive" 
      className={`overflow-hidden ${isFlashSale ? 'flash-sale-card' : ''}`}
    >
      {/* Image Section */}
      <div className="relative h-48 md:h-52">
        <Image
          src={tour.media.hero_image}
          alt={tour.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        
        {/* Overlays */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          {isFlashSale ? (
            <FlashSaleBadge 
              discount={flashSaleDiscount} 
              endTime={flashSaleEndTime}
              size="md"
            />
          ) : hasDiscount && (
            <Badge variant="error">
              ลด {tour.pricing.discount_percentage}%
            </Badge>
          )}
          
          {showWishlist && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onWishlistToggle?.(tour.metadata.id)}
              className="bg-white/90 backdrop-blur-sm rounded-full"
              aria-label={isWishlisted ? 'ลบจากรายการโปรด' : 'เพิ่มในรายการโปรด'}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
            </Button>
          )}
        </div>
        
        {/* Duration Badge */}
        <div className="absolute bottom-3 left-3">
          <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-sm font-medium flex items-center">
            <Clock className="w-4 h-4 mr-1 text-blue-600" />
            {tour.duration_days}วัน{tour.nights}คืน
          </div>
        </div>
        
        {/* Availability Alert */}
        {tour.availability.available_seats <= 5 && (
          <div className="absolute bottom-3 right-3">
            <Badge variant="warning" className="text-xs">
              เหลือ {tour.availability.available_seats} ที่!
            </Badge>
          </div>
        )}
      </div>
      
      {/* Content Section */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-semibold text-gray-900 text-base mb-2 line-clamp-2 leading-tight">
          {tour.title}
        </h3>
        
        {/* Promotional Text */}
        <div className="text-sm text-blue-600 mb-3 line-clamp-2 leading-relaxed">
          {(() => {
            switch (tour.location.country) {
              case 'ญี่ปุ่น':
                return 'สัมผัสวัฒนธรรมแบบดั้งเดิม ชมซากุระบาน หรือใบไม้เปลี่ยนสี พร้อมลิ้มรสอาหารญี่ปุ่นแท้ เยือนเกียวโต นารา โตเกียว และชิราคาวาโกะ นั่งรถไฟชินคันเซน สุดยอดประสบการณ์ที่ไม่ลืม'
              case 'เกาหลีใต้':
                return 'เที่ยวเกาหลีสไตล์ K-Pop ช้อปปิ้งเมืองโซล ลิ้มรสกิมจิและบาร์บีคิวเกาหลีแท้ เดินเล่นในถนนมยองดง ใสใสดง เชคอิน N Seoul Tower และเกาะเชจู สวรรค์แห่งธรรมชาติ'
              case 'ไต้หวัน':
                return 'เจียวเฟิ่น จิ่วเฟิ่น และตลาดกลางคืนชื่อดัง ครบครันในราคาสุดคุ้ม ชิมอาหารข้างทาง เที่ยวทะเลสาบสุริยันจันทรา ชมความงามของหุบเขาทาโรโกะ และช้อปปิ้งย่านไทเป'
              case 'ยุโรป':
                return 'เยือนยุโรปเก่าแก่ สถาปัตยกรรมสวยงาม และวัฒนธรรมที่หลากหลาย ชมหอไอเฟล ลอนดอนบริดจ์ และโคลอสเซียม เดินทางสะดวกด้วยรถไฟความเร็วสูง พักโรงแรมกลางเมือง'
              case 'จีน':
                return 'สำรวจกำแพงเมืองจีน พระราชวังต้องห้าม และความทันสมัยของเซี่ยงไฮ้ เยือนสุสานทหารดินเผาที่ซีอาน ขี่จักรยานในปักกิ่งเก่า และชมมหานครสมัยใหม่ เซินเจิ้น กวางโจว'
              case 'สิงคโปร์':
                return 'เมืองแห่งอนาคต สวนสนุกระดับโลก และอาหารหลากหลายวัฒนธรรม Universal Studios Gardens by the Bay และโรงแรมทรายที่มารีน่าเบย์แซนด์ส ช้อปปิ้งย่านออร์ชาร์ด รด.'
              case 'มาเลเซีย':
                return 'ปีนัง กัวลาลัมเปอร์ และลังกาวี สวรรค์แห่งการท่องเที่ยวเอเชีย เยือนถ้ำบาตู เพโทรนาส ทาวเวอร์ และสะพานท้องฟ้าลังกาวี ลิ้มรสอาหารมาเลย์ จีน อินเดีย ต้นตำรับ'
              case 'ฮ่องกง':
                return 'ดิสนีย์แลนด์ วิคตอเรีย ฮาร์เบอร์ และการช้อปปิ้งสุดเจ๋งในใจกลางเอเชีย นั่งเคเบิลคาร์ขึ้นเขาวิคตอเรียพีค ชิมติ่มซำแท้ ๆ ย่านต์ไซซา หลานไกฟง และมองก๊ก'
              default:
                return `สำรวจ${tour.location.country || 'ปลายทางใหม่'}อันงดงาม เที่ยวสุดคุ้มกับโปรแกรมคุณภาพ มีไกด์ท้องถิ่นคอยดูแล พักโรงแรมมาตรฐาน รับประทานอาหารท้องถิ่นรสชาติดี พร้อมประสบการณ์ท่องเที่ยวที่ไม่ลืม`
            }
          })()}
        </div>
        
        {/* Location & Highlights */}
        <div className="mb-4">
          <div className="flex items-center flex-wrap gap-2">
            <div className="flex items-center text-gray-600 text-sm mr-2">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{tour.location.cities?.slice(0, 3).join(' • ') || tour.location.region || 'ไทเป • เชียงใหม่ • ภูเก็ต'}, {tour.location.country}</span>
            </div>
            {tour.highlights.slice(0, 3).map((highlight) => (
              <Badge key={highlight.text} variant="primary" className="text-xs">
                {highlight.text}
              </Badge>
            ))}
            {tour.highlights.length > 3 && (
              <span className="text-xs text-gray-500 px-2 py-1">
                +{tour.highlights.length - 3} อื่นๆ
              </span>
            )}
          </div>
        </div>
        
        {/* Rating */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
            <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-sm">{tour.quality.rating}</span>
          </div>
          <span className="text-gray-500 text-sm">({tour.quality.review_count} รีวิว)</span>
          <div className="flex items-center text-green-600 text-xs">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">รีวิวจริง</span>
          </div>
        </div>
        
        {/* Next Departure */}
        {nextDeparture && (
          <div className="mb-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1 text-blue-500" />
              <span>ช่วงเวลาเดินทาง: {nextDeparture.date_range.replace(/(\d+)\s+(ม\.ค\.|ก\.พ\.|มี\.ค\.|เม\.ย\.|พ\.ค\.|มิ\.ย\.|ก\.ค\.|ส\.ค\.|ก\.ย\.|ต\.ค\.|พ\.ย\.|ธ\.ค\.)/g, '$1 $2 68')}</span>
            </div>
            {nextDeparture.available_seats <= 3 && (
              <div className="text-orange-600 text-xs mt-1">
                ⚡ เหลือที่นั่งน้อย ({nextDeparture.available_seats} ที่)
              </div>
            )}
          </div>
        )}
        
        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            {isFlashSale ? (
              <>
                <div className="text-sm text-gray-400 line-through">
                  ฿{formatPrice(tour.pricing.base_price)}
                </div>
                <div className="text-2xl font-bold text-red-600 flex items-center">
                  <Zap className="w-5 h-5 mr-1" />
                  ฿{formatPrice(Math.round(tour.pricing.base_price * (1 - flashSaleDiscount / 100)))}
                </div>
                <div className="text-sm text-red-500 font-medium">ลดสูงสุดกว่า {flashSaleDiscount}%</div>
              </>
            ) : hasDiscount ? (
              <>
                <div className="text-sm text-gray-400 line-through">
                  ฿{formatPrice(tour.pricing.original_price!)}
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  ฿{formatPrice(tour.pricing.base_price)}
                </div>
              </>
            ) : (
              <div className="text-2xl font-bold text-blue-600">
                ฿{formatPrice(tour.pricing.base_price)}
              </div>
            )}
            <div className="text-xs text-gray-500">ต่อคน</div>
            {discountSavings > 0 && (
              <div className="text-xs text-green-600 font-medium">
                ประหยัด ฿{formatPrice(discountSavings)}
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {showQuickBook && (
              <Button
                variant="primary"
                size="md"
                onClick={() => onQuickBook?.(tour)}
                leftIcon={<Zap className="w-4 h-4" />}
                className={isFlashSale 
                  ? "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white border-0 font-bold shadow-md"
                  : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0 font-bold shadow-md"
                }
              >
                จองด่วน
              </Button>
            )}
            <Link href={tour.metadata.canonical_url}>
              <Button
                variant="primary"
                size="md"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                ดูรายละเอียด
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  )
}

// ===================================================================
// View Toggle Component
// ===================================================================

interface ViewToggleProps {
  viewMode: 'card' | 'list'
  onChange: (mode: 'card' | 'list') => void
}

export const ViewToggle: React.FC<ViewToggleProps> = ({ viewMode, onChange }) => {
  return (
    <div className="flex bg-gray-100 rounded-lg p-1">
      <Button
        variant={viewMode === 'card' ? 'primary' : 'ghost'}
        size="sm"
        onClick={() => onChange('card')}
        className="!min-w-[40px] !h-[36px]"
        aria-label="มุมมองการ์ด"
      >
        <Grid className="w-4 h-4" />
      </Button>
      <Button
        variant={viewMode === 'list' ? 'primary' : 'ghost'}
        size="sm"
        onClick={() => onChange('list')}
        className="!min-w-[40px] !h-[36px]"
        aria-label="มุมมองรายการ"
      >
        <List className="w-4 h-4" />
      </Button>
    </div>
  )
}

// ===================================================================
// Sort Dropdown Component
// ===================================================================

interface SortOption {
  value: string
  label: string
  description?: string
}

interface SortDropdownProps {
  options: SortOption[]
  value: string
  onChange: (value: string) => void
}

export const SortDropdown: React.FC<SortDropdownProps> = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const selectedOption = options.find(option => option.value === value)
  
  return (
    <div className="relative">
      <Button
        variant="secondary"
        onClick={() => setIsOpen(!isOpen)}
        rightIcon={<ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />}
      >
        {selectedOption?.label || 'เรียงตาม'}
      </Button>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          {options.map((option) => (
            <button
              key={option.value}
              className="w-full text-left px-4 py-3 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
              onClick={() => {
                onChange(option.value)
                setIsOpen(false)
              }}
            >
              <div className="font-medium text-gray-900">{option.label}</div>
              {option.description && (
                <div className="text-sm text-gray-500 mt-1">{option.description}</div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ===================================================================
// Loading States
// ===================================================================

export const TourCardSkeleton: React.FC<{ viewMode?: 'card' | 'list' }> = ({ viewMode = 'card' }) => {
  if (viewMode === 'list') {
    return (
      <Card className="mb-4">
        <div className="flex p-4">
          <Skeleton width="96px" height="96px" className="rounded-lg flex-shrink-0" />
          <div className="flex-1 ml-4">
            <Skeleton width="70%" height="1.25rem" className="mb-2" />
            <Skeleton width="50%" height="1rem" className="mb-3" />
            <div className="flex justify-between items-center">
              <Skeleton width="80px" height="1.5rem" />
              <Skeleton width="100px" height="2rem" />
            </div>
          </div>
        </div>
      </Card>
    )
  }
  
  return (
    <Card>
      <Skeleton width="100%" height="192px" className="mb-4" />
      <div className="p-4">
        <Skeleton width="90%" height="1.25rem" className="mb-3" />
        <Skeleton width="60%" height="1rem" className="mb-4" />
        <div className="flex gap-2 mb-4">
          <Skeleton width="60px" height="1.5rem" />
          <Skeleton width="70px" height="1.5rem" />
          <Skeleton width="50px" height="1.5rem" />
        </div>
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <Skeleton width="80px" height="2rem" />
          <Skeleton width="120px" height="2.5rem" />
        </div>
      </div>
    </Card>
  )
}

export const SearchResultsSkeleton: React.FC<{ count?: number; viewMode?: 'card' | 'list' }> = ({ 
  count = 8, 
  viewMode = 'card' 
}) => {
  return (
    <div className={viewMode === 'card' 
      ? 'grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
      : 'space-y-4'
    }>
      {Array.from({ length: count }).map((_, index) => (
        <TourCardSkeleton key={index} viewMode={viewMode} />
      ))}
    </div>
  )
}

export default {
  FlashSaleTimer,
  FlashSaleBadge,
  Button,
  Input,
  Badge,
  Card,
  Skeleton,
  SearchBar,
  TourCardComponent,
  ImprovedTourCard,
  CompactTourCard,
  ViewToggle,
  SortDropdown,
  TourCardSkeleton,
  SearchResultsSkeleton
}