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
  ArrowRight, Plus, Minus, Check, AlertCircle, MessageCircle, Zap, Mic
} from 'lucide-react'
import { TS32_TOKENS, TS32_COMPONENTS, TS32_CSS_VARS } from './design-system'
import { SearchIndexTour, SearchFilters, TourCard as TourCardType, FilterDrawer as FilterDrawerType } from './types'

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
  
  const Component = onClick ? 'button' : 'div'
  
  return (
    <Component
      className={`ts32-card ts32-card--${variant} ${className}`}
      style={cardStyle}
      onClick={onClick}
    >
      {children}
    </Component>
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
}

export const TourCardComponent: React.FC<TourCardComponentProps> = ({
  tour,
  viewMode = 'card',
  showWishlist = true,
  showQuickBook = true,
  isWishlisted = false,
  onWishlistToggle,
  onQuickBook
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
                  onClick={() => onWishlistToggle?.(tour.metadata.id)}
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
                    onClick={() => onQuickBook?.(tour)}
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
              <span>{tour.location.country}</span>
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
  ViewToggle,
  SortDropdown,
  TourCardSkeleton,
  SearchResultsSkeleton
}