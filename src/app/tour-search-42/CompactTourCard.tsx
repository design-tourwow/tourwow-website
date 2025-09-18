'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import './animations.css';
import Image from 'next/image';
import Link from 'next/link';
import { SearchIndexTour } from './types';
import { useSmartAutoExpand } from './useSmartAutoExpand';
import { 
  Clock, MapPin, Star, Users, Heart, Zap, ChevronDown, 
  Calendar, ArrowRight
} from 'lucide-react';

// Global state to prevent multiple cards expanding simultaneously
let currentExpandingCard: string | null = null;
let expandingCardTimestamp: number = 0;

// Enhanced auto-expand hook with smart controls
const useAutoExpand = (threshold = 6000, enabled = true) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>();
  const progressRef = useRef<NodeJS.Timeout>();
  const elementRef = useRef<HTMLDivElement>(null);
  const cardId = useRef(`card_${Math.random().toString(36).substr(2, 9)}`);
  const cardTimestamp = useRef<number>(0);

  useEffect(() => {
    if (!enabled || !elementRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isInViewport = entry.isIntersecting && entry.intersectionRatio > 0.6;
          const isCompletelyOut = entry.intersectionRatio === 0;
          setIsInView(isInViewport);
          
          if (isInViewport) {
            const currentTime = Date.now();
            
            // Set timestamp for this card if not set yet
            if (cardTimestamp.current === 0) {
              cardTimestamp.current = currentTime;
            }
            
            // Simplified logic - allow card to expand if no one else is currently expanding
            // or if this card already has control
            if (!currentExpandingCard || currentExpandingCard === cardId.current) {
              // Take control if available
              currentExpandingCard = cardId.current;
              expandingCardTimestamp = cardTimestamp.current;
              setIsFocused(true);
            } else {
              // Another card is expanding, but we can still prepare
              // Once the other card is done, this one can take over
              setIsFocused(false);
              // Don't return here - let the card prepare but not start animation
            }
            
            // Only start animation if this card has focus or no other card is active
            if (!currentExpandingCard || currentExpandingCard === cardId.current) {
              const startTime = Date.now();
              
              const animateProgress = () => {
                const elapsed = Date.now() - startTime;
                const progressPercent = Math.min((elapsed / threshold) * 100, 100);
                
                // Update progress if we have control
                if (!currentExpandingCard || currentExpandingCard === cardId.current) {
                  setProgress(progressPercent);
                  
                  if (progressPercent < 100) {
                    progressRef.current = requestAnimationFrame(animateProgress);
                  }
                } else {
                  // Lost control, stop animation
                  setProgress(0);
                }
              };
              
              progressRef.current = requestAnimationFrame(animateProgress);

              // Auto expand after threshold
              timerRef.current = setTimeout(() => {
                if (!currentExpandingCard || currentExpandingCard === cardId.current) {
                  setIsExpanded(true);
                  setProgress(100);
                }
              }, threshold);
            }
          } else if (isCompletelyOut) {
            // Card is completely out of viewport - flip back to Pre-Program
            setIsFocused(false);
            setProgress(0);
            
            // Flip back to Pre-Program when completely scrolled out
            if (isExpanded) {
              setIsExpanded(false);
              // Reset global state when card flips back
              if (currentExpandingCard === cardId.current) {
                currentExpandingCard = null;
                expandingCardTimestamp = 0;
              }
            }
            
            // Release global state if this card was expanding
            if (currentExpandingCard === cardId.current) {
              currentExpandingCard = null;
              expandingCardTimestamp = 0;
            }
            
            // Reset card timestamp
            cardTimestamp.current = 0;
            
            // Clear timers
            if (timerRef.current) clearTimeout(timerRef.current);
            if (progressRef.current) cancelAnimationFrame(progressRef.current);
          } else if (!entry.isIntersecting) {
            // Card is partially out of view but not completely
            // Stop progress but don't reset expanded state yet
            if (!isExpanded && progress > 0) {
              setProgress(0);
              setIsFocused(false);
              if (currentExpandingCard === cardId.current) {
                currentExpandingCard = null;
                expandingCardTimestamp = 0;
              }
              if (timerRef.current) clearTimeout(timerRef.current);
              if (progressRef.current) cancelAnimationFrame(progressRef.current);
            }
          }
        });
      },
      { threshold: [0, 0.1, 0.6] } // 0 = completely out, 0.1 = almost out, 0.6 = trigger auto-expand
    );

    observer.observe(elementRef.current);

    return () => {
      // Release global state and timestamp
      if (currentExpandingCard === cardId.current) {
        currentExpandingCard = null;
        expandingCardTimestamp = 0;
      }
      cardTimestamp.current = 0;
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressRef.current) cancelAnimationFrame(progressRef.current);
      observer.disconnect();
    };
  }, [threshold, enabled]);

  const toggleExpand = useCallback(() => {
    // Clear timers
    if (timerRef.current) clearTimeout(timerRef.current);
    if (progressRef.current) cancelAnimationFrame(progressRef.current);
    
    // Take control of expansion
    if (!isExpanded) {
      currentExpandingCard = cardId.current;
    } else {
      // Release control when collapsing
      if (currentExpandingCard === cardId.current) {
        currentExpandingCard = null;
      }
    }
    
    setTimeout(() => {
      setIsExpanded(!isExpanded);
      setProgress(0);
    }, 50);
  }, [isExpanded]);

  return { isExpanded, progress, isInView, isFocused, elementRef, toggleExpand, setIsExpanded };
};

interface CompactTourCardProps {
  tour: SearchIndexTour;
  prototype?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  isWishlisted?: boolean;
  onWishlistToggle?: (tourId: string) => void;
  onQuickBook?: (tour: SearchIndexTour) => void;
}

// Prototype 3: Enhanced Compact Card with Complete Info
const Prototype3: React.FC<CompactTourCardProps> = ({ 
  tour, 
  isWishlisted = false, 
  onWishlistToggle, 
  onQuickBook 
}) => {
  const { isExpanded, progress, isInView, isFocused, elementRef, toggleExpand } = useAutoExpand(6000);
  const formatPrice = (price: number) => price.toLocaleString('th-TH');
  const hasDiscount = tour.pricing.discount_percentage && tour.pricing.discount_percentage > 0;
  const [isAnimating, setIsAnimating] = useState(false);
  const compactRef = useRef<HTMLDivElement>(null);

  // Handle smooth animation state
  useEffect(() => {
    if (isExpanded !== undefined) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 700);
      return () => clearTimeout(timer);
    }
  }, [isExpanded]);

  // Mock data for airline and travel period since it's not in tour object
  const getAirlineInfo = (country: string) => {
    switch (country) {
      case 'ญี่ปุ่น': return 'Thai Airways (TG)';
      case 'เกาหลีใต้': return 'Korean Air (KE)';
      case 'ไต้หวัน': return 'EVA Air (BR)';
      case 'ยุโรป': return 'Emirates (EK)';
      case 'จีน': return 'China Airlines (CI)';
      case 'สิงคโปร์': return 'Singapore Airlines (SQ)';
      case 'มาเลเซีย': return 'Malaysia Airlines (MH)';
      case 'ฮ่องกง': return 'Cathay Pacific (CX)';
      default: return 'Thai Airways (TG)';
    }
  };

  const getTravelPeriod = (country: string) => {
    switch (country) {
      case 'ญี่ปุ่น': return 'ก.ย. 68 – เม.ย. 69';
      case 'เกาหลีใต้': return 'ต.ค. 68 – มี.ค. 69';
      case 'ไต้หวัน': return 'ก.ย. 68 – ก.พ. 69';
      case 'ยุโรป': return 'เม.ย. 68 – ต.ค. 68';
      case 'จีน': return 'ตลอดปี';
      case 'สิงคโปร์': return 'ตลอดปี';
      case 'มาเลเซีย': return 'ตลอดปี';
      case 'ฮ่องกง': return 'ต.ค. 68 – เม.ย. 69';
      default: return 'ก.ย. 68 – ก.พ. 69';
    }
  };

  return (
    <div ref={elementRef} className="card-container relative mb-4 sm:mb-6" style={{ zIndex: 1 }}>
      {/* Enhanced Loading Indicator with Focus State */}
      {progress > 0 && progress < 100 && !isExpanded && isFocused && (
        <>
          {/* Subtle Focus Glow */}
          <div 
            className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-blue-400/15 to-blue-500/15 blur-sm z-0 pointer-events-none"
            style={{
              opacity: Math.sin((progress / 100) * Math.PI) * 0.3 + 0.15,
              willChange: 'opacity'
            }}
          />
          
          {/* Clean Progress Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gray-100 rounded-t-2xl z-10 pointer-events-none overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-2xl shadow-sm"
              style={{
                width: `${progress}%`,
                transition: 'width 100ms ease-out',
                willChange: 'width',
                boxShadow: '0 0 8px rgba(59, 130, 246, 0.4)'
              }}
            />
          </div>
          
          {/* Subtle Focus Ring */}
          <div className="absolute -inset-0.5 rounded-2xl border border-blue-400/20 z-5 pointer-events-none" />
        </>
      )}

      <div 
        className={`
          bg-white rounded-xl border overflow-hidden
          ${isExpanded ? 'shadow-2xl border-blue-500/50' : 'shadow-md border-gray-200 hover:shadow-lg'}
          ${isFocused && !isExpanded ? 'ring-1 ring-blue-400/30 shadow-lg border-blue-200' : ''}
          transition-all duration-500 ease-in-out will-change-transform
          ${isAnimating ? 'transform-gpu' : ''}
          ${progress > 0 && progress < 100 && !isExpanded ? 'ring-1 ring-blue-500/10' : ''}
        `}
      >
        {/* Enhanced Compact View with Smooth Height Transition */}
        <div 
          ref={compactRef}
          className="cursor-pointer group transition-colors duration-200 hover:bg-gray-50/50"
          onClick={toggleExpand}
          style={{
            maxHeight: isExpanded ? '0px' : '500px',
            opacity: isExpanded ? 0 : 1,
            transition: `max-height 0.5s cubic-bezier(0.4,0,0.2,1), opacity ${isExpanded ? '0.2s' : '0.4s 0.2s'} ease-out`,
            overflow: 'hidden',
            pointerEvents: isExpanded ? 'none' : 'auto'
          }}
        >
          <div className="flex p-3 md:p-4">
            {/* Main Image */}
            <div className="relative w-20 sm:w-24 md:w-32 lg:w-40 h-16 sm:h-20 md:h-24 lg:h-28 flex-shrink-0 rounded-lg overflow-hidden">
              <Image
                src={tour.media.hero_image}
                alt={tour.title}
                fill
                className="object-cover"
              />
              {hasDiscount && (
                <span className="absolute top-1 left-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                  -{tour.pricing.discount_percentage}%
                </span>
              )}
              {/* Duration overlay */}
              <div className="absolute bottom-1 left-1 bg-black/70 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                {tour.duration_days}วัน{tour.nights}คืน
              </div>
            </div>

            {/* Enhanced Info Section */}
            <div className="flex-1 ml-2 sm:ml-3 md:ml-4 flex flex-col justify-between min-w-0">
              {/* Top Section - Location & Title */}
              <div>
                <div className="flex items-center gap-1 sm:gap-2 mb-1">
                  <span className="text-xs sm:text-sm font-bold text-gray-800 truncate">{tour.location.country}</span>
                  <span className="text-gray-400 text-xs">•</span>
                  <span className="text-xs sm:text-sm text-gray-600 truncate">{tour.location.cities?.[0] || tour.location.country}</span>
                </div>
                <h3 className="font-medium text-xs sm:text-sm line-clamp-2 sm:line-clamp-1 text-gray-900 mb-1 sm:mb-2 leading-tight">
                  {tour.title}
                </h3>
              </div>

              {/* Middle Section - Details */}
              <div className="space-y-1 sm:space-y-2 mb-1 sm:mb-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center text-gray-600 min-w-0 flex-1 mr-2">
                    <svg className="w-3 h-3 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    <span className="truncate text-xs">{getAirlineInfo(tour.location.country)}</span>
                  </div>
                  <span className="text-blue-600 font-semibold text-xs sm:text-sm flex-shrink-0">
                    ฿{formatPrice(tour.pricing.base_price)}
                  </span>
                </div>
                <div className="flex items-center text-xs text-gray-600">
                  <svg className="w-3 h-3 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="truncate">{getTravelPeriod(tour.location.country)}</span>
                </div>
              </div>

              {/* Bottom Section - Expand Button */}
              <div className="flex items-center justify-between">
                <div className="flex items-center text-xs text-gray-500">
                  <svg className="w-3 h-3 text-yellow-400 fill-current mr-1" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                  {tour.quality.rating} ({tour.quality.review_count})
                </div>
                
                <button
                  className={`
                    flex items-center gap-1 px-2 py-1 rounded-lg transition-all duration-300
                    ${isExpanded ? 'rotate-180 bg-blue-100 text-blue-600' : 'text-blue-600 bg-blue-50 group-hover:bg-blue-100'}
                  `}
                  aria-label={isExpanded ? 'ซ่อนรายละเอียด' : 'ดูรายละเอียด'}
                >
                  <span className="text-[10px] font-medium hidden sm:inline">ดูเพิ่ม</span>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Expanded Content */}
        <div 
          className={`
            transition-all duration-400 ease-out border-t border-gray-100
            ${isExpanded 
              ? 'opacity-100 max-h-screen transform translate-y-0' 
              : 'opacity-0 max-h-0 overflow-hidden transform -translate-y-2'
            }
          `}
          style={{
            transitionDelay: isExpanded ? '150ms' : '0ms'
          }}
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
              {hasDiscount && (
                <span className="bg-red-100 text-red-600 text-sm px-3 py-1 rounded-full font-bold">
                  ลด {tour.pricing.discount_percentage}%
                </span>
              )}
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onWishlistToggle?.(tour.metadata.id);
                }}
                className="bg-white/90 backdrop-blur-sm rounded-full p-2"
                aria-label={isWishlisted ? 'ลบจากรายการโปรด' : 'เพิ่มในรายการโปรด'}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
              </button>
            </div>
            
            {/* Duration Badge */}
            <div className="absolute bottom-3 left-3">
              <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-sm font-medium flex items-center">
                <Clock className="w-4 h-4 mr-1 text-blue-600" />
                {tour.duration_days} วัน {tour.nights} คืน
              </div>
            </div>
          </div>
          
          {/* Content Section */}
          <div className="p-4">
            {/* Title */}
            <h3 className="font-semibold text-gray-900 text-base mb-2 line-clamp-2 leading-tight">
              {tour.title}
            </h3>
            
            {/* Enhanced Location Info */}
            <div className="flex items-center gap-2 mb-3 text-sm">
              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                <span className="font-medium">{tour.location.country}</span>
              </div>
              {tour.location.cities && tour.location.cities.length > 0 && (
                <span className="text-gray-600">
                  {tour.location.cities.slice(0, 5).join(', ')}
                </span>
              )}
            </div>
            
            {/* Highlights */}
            <div className="flex flex-wrap gap-2 mb-3">
              {tour.highlights.slice(0, 3).map((highlight, idx) => (
                <span key={idx} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-lg">
                  {typeof highlight === 'string' ? highlight : highlight.text}
                </span>
              ))}
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

            {/* Enhanced information for Prototype 3 */}
            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-600">สายการบิน:</span>
                  <div className="font-medium">{getAirlineInfo(tour.location.country)}</div>
                </div>
                <div>
                  <span className="text-gray-600">ช่วงเวลาเดินทาง:</span>
                  <div className="font-medium">{getTravelPeriod(tour.location.country)}</div>
                </div>
              </div>
            </div>

            {/* Price & CTA */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div>
                {tour.pricing.original_price && tour.pricing.original_price > tour.pricing.base_price && (
                  <span className="text-sm text-gray-400 line-through mr-2">
                    ฿{formatPrice(tour.pricing.original_price)}
                  </span>
                )}
                <span className="text-2xl font-bold text-blue-600">
                  ฿{formatPrice(tour.pricing.base_price)}
                </span>
                <div className="text-xs text-gray-500">ต่อคน</div>
                {tour.pricing.original_price && tour.pricing.original_price > tour.pricing.base_price && (
                  <div className="text-xs text-green-600 font-medium">
                    ประหยัด ฿{formatPrice(tour.pricing.original_price - tour.pricing.base_price)}
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onQuickBook?.(tour);
                  }}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg font-medium text-sm hover:from-blue-600 hover:to-blue-700 transition-all"
                >
                  จองทันที
                </button>
                <Link href={tour.metadata.canonical_url}>
                  <button className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg font-medium text-sm hover:bg-blue-50 transition-all">
                    ดูเพิ่มเติม
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Prototype 1: Minimal Card with Slide Expand (simplified for space)
const Prototype1: React.FC<CompactTourCardProps> = ({ 
  tour, 
  isWishlisted = false, 
  onWishlistToggle, 
  onQuickBook 
}) => {
  const { isExpanded, progress, elementRef, toggleExpand } = useAutoExpand();
  const formatPrice = (price: number) => price.toLocaleString('th-TH');

  return (
    <div ref={elementRef} className="relative mb-6">
      <div className="bg-white rounded-xl border shadow-md hover:shadow-lg transition-all">
        <div className="flex items-center p-2 cursor-pointer" onClick={toggleExpand}>
          <div className="relative w-16 h-16 rounded overflow-hidden">
            <Image src={tour.media.hero_image} alt={tour.title} fill className="object-cover" />
          </div>
          <div className="flex-1 ml-3 min-w-0">
            <h3 className="font-medium text-sm line-clamp-1 text-gray-900 mb-1">{tour.title}</h3>
            <div className="flex items-center gap-3 text-xs text-gray-600">
              <span>★ {tour.quality.rating}</span>
              <span>{tour.duration_days}วัน{tour.nights}คืน</span>
              <span className="text-blue-600 font-medium">฿{formatPrice(tour.pricing.base_price)}</span>
            </div>
          </div>
        </div>
        {isExpanded && (
          <div className="border-t border-gray-100 p-4">
            <p className="text-sm text-gray-600 mb-4">{tour.title}</p>
            <div className="flex gap-2">
              <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium">จองเลย</button>
              <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium">ดูรายละเอียด</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Prototype 2: Card with Side Progress Ring (simplified)
const Prototype2: React.FC<CompactTourCardProps> = ({ 
  tour, 
  isWishlisted = false, 
  onWishlistToggle, 
  onQuickBook 
}) => {
  const { isExpanded, progress, elementRef, toggleExpand } = useAutoExpand();
  const formatPrice = (price: number) => price.toLocaleString('th-TH');

  return (
    <div ref={elementRef} className="relative mb-6">
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all">
        <div className="flex p-4 cursor-pointer" onClick={toggleExpand}>
          <div className="relative w-32 h-28 rounded-lg overflow-hidden">
            <Image src={tour.media.hero_image} alt={tour.title} fill className="object-cover" />
          </div>
          <div className="flex-1 ml-4">
            <h3 className="font-bold text-base mb-2 line-clamp-2">{tour.title}</h3>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center bg-yellow-50 px-2 py-1 rounded">
                <span className="text-sm font-semibold">★ {tour.quality.rating}</span>
              </div>
            </div>
            <div className="flex items-end justify-between">
              <span className="text-xl font-bold text-blue-600">฿{formatPrice(tour.pricing.base_price)}</span>
              <button className="px-3 py-1.5 bg-gray-100 rounded-lg text-sm">
                {isExpanded ? 'ซ่อน' : 'ดูเพิ่ม'}
              </button>
            </div>
          </div>
        </div>
        {isExpanded && (
          <div className="border-t border-gray-100 p-4">
            <p className="text-sm text-gray-600 mb-4">{tour.title}</p>
            <div className="flex gap-2">
              <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium">จองด่วน</button>
              <button className="px-6 py-2 border-2 border-blue-500 text-blue-600 rounded-lg font-semibold">รายละเอียด</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Prototype 4: Enhanced Larger Compact Card - Beautiful Mobile First Design
const Prototype4: React.FC<CompactTourCardProps> = ({ 
  tour, 
  isWishlisted = false, 
  onWishlistToggle, 
  onQuickBook 
}) => {
  const { isExpanded, progress, elementRef, toggleExpand } = useAutoExpand();
  const formatPrice = (price: number) => price.toLocaleString('th-TH');
  const hasDiscount = tour.pricing.discount_percentage && tour.pricing.discount_percentage > 0;
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle smooth animation state
  useEffect(() => {
    if (isExpanded !== undefined) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 700);
      return () => clearTimeout(timer);
    }
  }, [isExpanded]);

  // Mock data for airline and travel period since it's not in tour object
  const getAirlineInfo = (country: string) => {
    switch (country) {
      case 'ญี่ปุ่น': return 'Thai Airways (TG)';
      case 'เกาหลีใต้': return 'Korean Air (KE)';
      case 'ไต้หวัน': return 'EVA Air (BR)';
      case 'ยุโรป': return 'Emirates (EK)';
      case 'จีน': return 'China Airlines (CI)';
      case 'สิงคโปร์': return 'Singapore Airlines (SQ)';
      case 'มาเลเซีย': return 'Malaysia Airlines (MH)';
      case 'ฮ่องกง': return 'Cathay Pacific (CX)';
      default: return 'Thai Airways (TG)';
    }
  };

  const getTravelPeriod = (country: string) => {
    switch (country) {
      case 'ญี่ปุ่น': return 'ก.ย. 68 – เม.ย. 69';
      case 'เกาหลีใต้': return 'ต.ค. 68 – มี.ค. 69';
      case 'ไต้หวัน': return 'ก.ย. 68 – ก.พ. 69';
      case 'ยุโรป': return 'เม.ย. 68 – ต.ค. 68';
      case 'จีน': return 'ตลอดปี';
      case 'สิงคโปร์': return 'ตลอดปี';
      case 'มาเลเซีย': return 'ตลอดปี';
      case 'ฮ่องกง': return 'ต.ค. 68 – เม.ย. 69';
      default: return 'ก.ย. 68 – ก.พ. 69';
    }
  };

  return (
    <div ref={elementRef} className="card-container relative mb-4 sm:mb-6" style={{ zIndex: 1 }}>
      {/* Clean Loading Indicator - Best Practice */}
      {progress > 0 && progress < 100 && !isExpanded && (
        <>
          {/* Progress Bar Only */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gray-100 rounded-t-2xl z-10 pointer-events-none overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-2xl"
              style={{
                width: `${progress}%`,
                transition: 'width 100ms ease-out',
                willChange: 'width'
              }}
            />
          </div>
        </>
      )}

      <div 
        className={`
          bg-white rounded-xl border transition-all duration-700 ease-in-out overflow-hidden will-change-transform
          ${isExpanded ? 'shadow-2xl border-blue-500/50' : 'shadow-md border-gray-200 hover:shadow-lg'}
          ${isAnimating ? 'transform-gpu' : ''}
          ${progress > 0 && progress < 100 && !isExpanded ? 'ring-1 ring-blue-500/10' : ''}
        `}
      >
        {/* Enhanced Compact View - Redesigned with Better Height */}
        <div 
          className={`
            cursor-pointer transition-all duration-300 ease-out
            ${isExpanded ? 'opacity-0 max-h-0 overflow-hidden pointer-events-none' : 'opacity-100'}
          `}
          onClick={toggleExpand}
        >
          <div className="flex flex-col sm:flex-row p-4 sm:p-5 md:p-6 gap-4 sm:gap-5 min-h-[140px] sm:min-h-[120px] md:min-h-[140px] lg:min-h-[160px]">
            {/* Image Section - Full width on mobile, left side on larger screens */}
            <div className="relative w-full sm:w-32 md:w-40 lg:w-48 h-32 sm:h-full flex-shrink-0 rounded-xl overflow-hidden shadow-md">
              <Image
                src={tour.media.hero_image}
                alt={tour.title}
                fill
                className="object-cover"
              />
              {hasDiscount && (
                <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg">
                  -{tour.pricing.discount_percentage}%
                </div>
              )}
              {/* Duration Badge */}
              <div className="absolute bottom-2 left-2 bg-black/80 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-lg">
                {tour.duration_days}วัน{tour.nights}คืน
              </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 flex flex-col justify-between min-w-0 space-y-3">
              {/* Header - Country & Title */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-base sm:text-lg md:text-xl font-bold text-gray-800">
                    {tour.location.country}
                  </span>
                  {tour.location.cities?.[0] && (
                    <>
                      <span className="text-gray-400">•</span>
                      <span className="text-sm sm:text-base text-gray-600">
                        {tour.location.cities[0]}
                      </span>
                    </>
                  )}
                </div>
                <h3 className="font-semibold text-sm sm:text-base md:text-lg text-gray-900 line-clamp-2 leading-snug">
                  {tour.title}
                </h3>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                <div className="flex items-center text-gray-600">
                  <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  <span className="truncate">{getAirlineInfo(tour.location.country)}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="truncate">{getTravelPeriod(tour.location.country)}</span>
                </div>
              </div>

              {/* Bottom Section - Rating & Price */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <div className="flex items-center space-x-1">
                  <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
                    <svg className="w-4 h-4 text-yellow-400 fill-current mr-1" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                    <span className="text-xs font-semibold text-gray-800">{tour.quality.rating}</span>
                  </div>
                  <span className="text-xs text-gray-500">({tour.quality.review_count})</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-lg sm:text-xl font-bold text-blue-600">
                      ฿{formatPrice(tour.pricing.base_price)}
                    </div>
                    <div className="text-xs text-gray-500">ต่อคน</div>
                  </div>
                  
                  <button
                    className={`
                      p-2 rounded-lg transition-all duration-300 flex-shrink-0
                      ${isExpanded 
                        ? 'rotate-180 bg-blue-100 text-blue-600' 
                        : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                      }
                    `}
                    aria-label={isExpanded ? 'ซ่อนรายละเอียด' : 'ดูรายละเอียด'}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Expanded Content */}
        <div 
          className={`
            transition-all duration-400 ease-out border-t border-gray-100
            ${isExpanded 
              ? 'opacity-100 max-h-screen transform translate-y-0' 
              : 'opacity-0 max-h-0 overflow-hidden transform -translate-y-2'
            }
          `}
          style={{
            transitionDelay: isExpanded ? '150ms' : '0ms'
          }}
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
              {hasDiscount && (
                <span className="bg-red-100 text-red-600 text-sm px-3 py-1 rounded-full font-bold">
                  ลด {tour.pricing.discount_percentage}%
                </span>
              )}
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onWishlistToggle?.(tour.metadata.id);
                }}
                className="bg-white/90 backdrop-blur-sm rounded-full p-2"
                aria-label={isWishlisted ? 'ลบจากรายการโปรด' : 'เพิ่มในรายการโปรด'}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
              </button>
            </div>
            
            {/* Duration Badge */}
            <div className="absolute bottom-3 left-3">
              <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-sm font-medium flex items-center">
                <Clock className="w-4 h-4 mr-1 text-blue-600" />
                {tour.duration_days} วัน {tour.nights} คืน
              </div>
            </div>
          </div>
          
          {/* Content Section */}
          <div className="p-4">
            {/* Title */}
            <h3 className="font-semibold text-gray-900 text-base mb-2 line-clamp-2 leading-tight">
              {tour.title}
            </h3>
            
            {/* Enhanced Location Info */}
            <div className="flex items-center gap-2 mb-3 text-sm">
              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                <span className="font-medium">{tour.location.country}</span>
              </div>
              {tour.location.cities && tour.location.cities.length > 0 && (
                <span className="text-gray-600">
                  {tour.location.cities.slice(0, 5).join(', ')}
                </span>
              )}
            </div>
            
            {/* Highlights */}
            <div className="flex flex-wrap gap-2 mb-3">
              {tour.highlights.slice(0, 3).map((highlight, idx) => (
                <span key={idx} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-lg">
                  {typeof highlight === 'string' ? highlight : highlight.text}
                </span>
              ))}
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

            {/* Enhanced information for Prototype 3 */}
            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-600">สายการบิน:</span>
                  <div className="font-medium">{getAirlineInfo(tour.location.country)}</div>
                </div>
                <div>
                  <span className="text-gray-600">ช่วงเวลาเดินทาง:</span>
                  <div className="font-medium">{getTravelPeriod(tour.location.country)}</div>
                </div>
              </div>
            </div>

            {/* Price & CTA */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div>
                {tour.pricing.original_price && tour.pricing.original_price > tour.pricing.base_price && (
                  <span className="text-sm text-gray-400 line-through mr-2">
                    ฿{formatPrice(tour.pricing.original_price)}
                  </span>
                )}
                <span className="text-2xl font-bold text-blue-600">
                  ฿{formatPrice(tour.pricing.base_price)}
                </span>
                <div className="text-xs text-gray-500">ต่อคน</div>
                {tour.pricing.original_price && tour.pricing.original_price > tour.pricing.base_price && (
                  <div className="text-xs text-green-600 font-medium">
                    ประหยัด ฿{formatPrice(tour.pricing.original_price - tour.pricing.base_price)}
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onQuickBook?.(tour);
                  }}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg font-medium text-sm hover:from-blue-600 hover:to-blue-700 transition-all"
                >
                  จองทันที
                </button>
                <Link href={tour.metadata.canonical_url}>
                  <button className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg font-medium text-sm hover:bg-blue-50 transition-all">
                    ดูเพิ่มเติม
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Prototype 5: Enhanced Compact Card with Smooth/Bounce Expand Animation
const Prototype5: React.FC<CompactTourCardProps> = ({ 
  tour, 
  isWishlisted = false, 
  onWishlistToggle, 
  onQuickBook 
}) => {
  const { isExpanded, progress, elementRef, toggleExpand } = useAutoExpand();
  const formatPrice = (price: number) => price.toLocaleString('th-TH');
  const hasDiscount = tour.pricing.discount_percentage && tour.pricing.discount_percentage > 0;
  const [isAnimating, setIsAnimating] = useState(false);

  // Enhanced smooth animation state with bounce
  useEffect(() => {
    if (isExpanded !== undefined) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isExpanded]);

  // Mock data for airline and travel period since it's not in tour object
  const getAirlineInfo = (country: string) => {
    switch (country) {
      case 'ญี่ปุ่น': return 'Thai Airways (TG)';
      case 'เกาหลีใต้': return 'Korean Air (KE)';
      case 'ไต้หวัน': return 'EVA Air (BR)';
      case 'ยุโรป': return 'Emirates (EK)';
      case 'จีน': return 'China Airlines (CI)';
      case 'สิงคโปร์': return 'Singapore Airlines (SQ)';
      case 'มาเลเซีย': return 'Malaysia Airlines (MH)';
      case 'ฮ่องกง': return 'Cathay Pacific (CX)';
      default: return 'Thai Airways (TG)';
    }
  };

  const getTravelPeriod = (country: string) => {
    switch (country) {
      case 'ญี่ปุ่น': return 'ก.ย. 68 – เม.ย. 69';
      case 'เกาหลีใต้': return 'ต.ค. 68 – มี.ค. 69';
      case 'ไต้หวัน': return 'ก.ย. 68 – ก.พ. 69';
      case 'ยุโรป': return 'เม.ย. 68 – ต.ค. 68';
      case 'จีน': return 'ตลอดปี';
      case 'สิงคโปร์': return 'ตลอดปี';
      case 'มาเลเซีย': return 'ตลอดปี';
      case 'ฮ่องกง': return 'ต.ค. 68 – เม.ย. 69';
      default: return 'ก.ย. 68 – ก.พ. 69';
    }
  };

  return (
    <div ref={elementRef} className="card-container relative mb-4 sm:mb-6" style={{ zIndex: 1 }}>
      {/* Clean Loading Indicator - Best Practice */}
      {progress > 0 && progress < 100 && !isExpanded && (
        <>
          {/* Progress Bar Only */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gray-100 rounded-t-2xl z-10 pointer-events-none overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-2xl"
              style={{
                width: `${progress}%`,
                transition: 'width 100ms ease-out',
                willChange: 'width'
              }}
            />
          </div>
        </>
      )}

      <div 
        className={`
          bg-white rounded-xl border overflow-hidden will-change-transform
          ${isExpanded 
            ? 'shadow-2xl border-blue-500/50' 
            : 'shadow-md border-gray-200 hover:shadow-lg'
          }
          ${isAnimating ? 'transform-gpu' : ''}
          ${progress > 0 && progress < 100 && !isExpanded ? 'ring-1 ring-blue-500/10' : ''}
          transition-all duration-700 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]
        `}
      >
        {/* Enhanced Compact View - Redesigned with Better Height */}
        <div 
          className={`
            cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]
            ${isExpanded 
              ? 'opacity-0 max-h-0 overflow-hidden pointer-events-none' 
              : 'opacity-100'
            }
          `}
          onClick={toggleExpand}
        >
          <div className="flex flex-col sm:flex-row p-4 sm:p-5 md:p-6 gap-4 sm:gap-5 min-h-[140px] sm:min-h-[120px] md:min-h-[140px] lg:min-h-[160px]">
            {/* Image Section - Full width on mobile, left side on larger screens */}
            <div className="relative w-full sm:w-32 md:w-40 lg:w-48 h-32 sm:h-full flex-shrink-0 rounded-xl overflow-hidden shadow-md">
              <Image
                src={tour.media.hero_image}
                alt={tour.title}
                fill
                className="object-cover"
              />
              {hasDiscount && (
                <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg">
                  -{tour.pricing.discount_percentage}%
                </div>
              )}
              {/* Duration Badge */}
              <div className="absolute bottom-2 left-2 bg-black/80 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-lg">
                {tour.duration_days}วัน{tour.nights}คืน
              </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 flex flex-col justify-between min-w-0 space-y-3">
              {/* Header - Country & Title */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-base sm:text-lg md:text-xl font-bold text-gray-800">
                    {tour.location.country}
                  </span>
                  {tour.location.cities?.[0] && (
                    <>
                      <span className="text-gray-400">•</span>
                      <span className="text-sm sm:text-base text-gray-600">
                        {tour.location.cities[0]}
                      </span>
                    </>
                  )}
                </div>
                <h3 className="font-semibold text-sm sm:text-base md:text-lg text-gray-900 line-clamp-2 leading-snug">
                  {tour.title}
                </h3>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                <div className="flex items-center text-gray-600">
                  <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  <span className="truncate">{getAirlineInfo(tour.location.country)}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="truncate">{getTravelPeriod(tour.location.country)}</span>
                </div>
              </div>

              {/* Bottom Section - Rating & Price */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <div className="flex items-center space-x-1">
                  <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
                    <svg className="w-4 h-4 text-yellow-400 fill-current mr-1" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                    <span className="text-xs font-semibold text-gray-800">{tour.quality.rating}</span>
                  </div>
                  <span className="text-xs text-gray-500">({tour.quality.review_count})</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-lg sm:text-xl font-bold text-blue-600">
                      ฿{formatPrice(tour.pricing.base_price)}
                    </div>
                    <div className="text-xs text-gray-500">ต่อคน</div>
                  </div>
                  
                  <button
                    className={`
                      p-2 rounded-lg flex-shrink-0
                      ${isExpanded 
                        ? 'rotate-180 bg-blue-100 text-blue-600' 
                        : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                      }
                      transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]
                    `}
                    aria-label={isExpanded ? 'ซ่อนรายละเอียด' : 'ดูรายละเอียด'}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Expanded Content - ใช้เหมือน Prototype 4 แต่ปรับ animation */}
        <div 
          className={`
            transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] border-t border-gray-100
            ${isExpanded 
              ? 'opacity-100 max-h-screen transform translate-y-0' 
              : 'opacity-0 max-h-0 overflow-hidden transform -translate-y-2'
            }
          `}
          style={{
            transitionDelay: isExpanded ? '150ms' : '0ms'
          }}
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
              {hasDiscount && (
                <span className="bg-red-100 text-red-600 text-sm px-3 py-1 rounded-full font-bold">
                  ลด {tour.pricing.discount_percentage}%
                </span>
              )}
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onWishlistToggle?.(tour.metadata.id);
                }}
                className="bg-white/90 backdrop-blur-sm rounded-full p-2"
                aria-label={isWishlisted ? 'ลบจากรายการโปรด' : 'เพิ่มในรายการโปรด'}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
              </button>
            </div>
            
            {/* Duration Badge */}
            <div className="absolute bottom-3 left-3">
              <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-sm font-medium flex items-center">
                <Clock className="w-4 h-4 mr-1 text-blue-600" />
                {tour.duration_days} วัน {tour.nights} คืน
              </div>
            </div>
          </div>
          
          {/* Content Section */}
          <div className="p-4">
            {/* Title */}
            <h3 className="font-semibold text-gray-900 text-base mb-2 line-clamp-2 leading-tight">
              {tour.title}
            </h3>
            
            {/* Enhanced Location Info */}
            <div className="flex items-center gap-2 mb-3 text-sm">
              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                <span className="font-medium">{tour.location.country}</span>
              </div>
              {tour.location.cities && tour.location.cities.length > 0 && (
                <span className="text-gray-600">
                  {tour.location.cities.slice(0, 5).join(', ')}
                </span>
              )}
            </div>
            
            {/* Highlights */}
            <div className="flex flex-wrap gap-2 mb-3">
              {tour.highlights.slice(0, 3).map((highlight, idx) => (
                <span key={idx} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-lg">
                  {typeof highlight === 'string' ? highlight : highlight.text}
                </span>
              ))}
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

            {/* Enhanced information for Prototype 4 */}
            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-600">สายการบิน:</span>
                  <div className="font-medium">{getAirlineInfo(tour.location.country)}</div>
                </div>
                <div>
                  <span className="text-gray-600">ช่วงเวลาเดินทาง:</span>
                  <div className="font-medium">{getTravelPeriod(tour.location.country)}</div>
                </div>
              </div>
            </div>

            {/* Price & CTA */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div>
                {tour.pricing.original_price && tour.pricing.original_price > tour.pricing.base_price && (
                  <span className="text-sm text-gray-400 line-through mr-2">
                    ฿{formatPrice(tour.pricing.original_price)}
                  </span>
                )}
                <span className="text-2xl font-bold text-blue-600">
                  ฿{formatPrice(tour.pricing.base_price)}
                </span>
                <div className="text-xs text-gray-500">ต่อคน</div>
                {tour.pricing.original_price && tour.pricing.original_price > tour.pricing.base_price && (
                  <div className="text-xs text-green-600 font-medium">
                    ประหยัด ฿{formatPrice(tour.pricing.original_price - tour.pricing.base_price)}
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onQuickBook?.(tour);
                  }}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg font-medium text-sm hover:from-blue-600 hover:to-blue-700 transition-all"
                >
                  จองทันที
                </button>
                <Link href={tour.metadata.canonical_url}>
                  <button className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg font-medium text-sm hover:bg-blue-50 transition-all">
                    ดูเพิ่มเติม
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Prototype 6: 3D Flip Card (Pre-Program to Full Version) - Copied from tour-search-41
const Prototype6: React.FC<CompactTourCardProps> = ({ 
  tour, 
  isWishlisted = false, 
  onWishlistToggle, 
  onQuickBook 
}) => {
  // Disabled auto-expand for better UX - manual click only
  const { isExpanded, progress, isInView, elementRef, toggleExpand } = useAutoExpand(5000, false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  
  const formatPrice = (price: number) => price.toLocaleString('th-TH');
  const hasDiscount = tour.pricing.discount_percentage && tour.pricing.discount_percentage > 0;

  // Removed loading animation - direct transition from Pre-Program to Full-Program
  React.useEffect(() => {
    // Skip loading screen entirely
    setShowLoading(false);
    setIsAnimating(false);
  }, [progress, isExpanded]);

  // Generate unique image and title for each tour (copied from tour-search-41)
  const getUniqueImageAndTitle = () => {
    const tourIdHash = tour.metadata.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    // Tour ads titles matched with destination images
    const destinationData = [
      {
        image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=1200&q=95",
        title: "ทัวร์กรีซ 7 วัน 6 คืน เกาะสวรรค์ทะเลสีฟ้า"
      },
      {
        image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=1200&q=95",
        title: "ทัวร์บาหลี 5 วัน 4 คืน เกาะแห่งเทพเจ้า"
      },
      {
        image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1200&q=95",
        title: "ทัวร์แคนาดา 8 วัน 6 คืน ธรรมชาติสุดแสนงาม"
      },
      {
        image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=95",
        title: "ทัวร์สวิสเซอร์แลนด์ 9 วัน 7 คืน แอลป์ยอดหิมะ"
      },
      {
        image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&q=95",
        title: "ทัวร์มัลดีฟส์ 4 วัน 3 คืน รีสอร์ท 5 ดาว"
      },
      {
        image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1200&q=95",
        title: "ทัวร์ญี่ปุ่น 6 วัน 4 คืน ซากุระบานฤดูใบไม้ผลิ"
      },
      {
        image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200&q=95",
        title: "ทัวร์ไอซ์แลนด์ 8 วัน 6 คืน ล่าแสงเหนือออโรรา"
      },
      {
        image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1200&q=95",
        title: "ทัวร์นอร์เวย์ 10 วัน 8 คืน ฟยอร์ดสุดแสนจะงาม"
      },
      {
        image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=1200&q=95",
        title: "ทัวร์โลฟเทนไอส์แลนด์ 7 วัน 5 คืน เกาะลับแห่งนอร์เวย์"
      },
      {
        image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&q=95",
        title: "ทัวร์เยอรมนี 8 วัน 6 คืน ปราสาทโนอิชวานชไตน์"
      },
      {
        image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=95",
        title: "ทัวร์นิวซีแลนด์ 9 วัน 7 คืน แดนแห่งหนังโฮบบิท"
      },
      {
        image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=1200&q=95",
        title: "ทัวร์กัมพูชา 4 วัน 3 คืน นครวัดปราสาทเขมร"
      },
      {
        image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=1200&q=95",
        title: "ทัวร์ตุรกี 8 วัน 6 คืน บอลลูนคัปปาโดเกีย"
      },
      {
        image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=1200&q=95",
        title: "ทัวร์ออสเตรีย 8 วัน 6 คืน เมืองแห่งดนตรี"
      },
      {
        image: "https://images.unsplash.com/photo-1541849546-216549ae216d?w=1200&q=95",
        title: "ทัวร์ปราก เช็ก 7 วัน 5 คืน เมืองแห่งปราสาท"
      },
      {
        image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=1200&q=95",
        title: "ทัวร์ทัสคานี อิตาลี 8 วัน 6 คืน ไร่องุ่นและไวน์"
      },
      {
        image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=1200&q=95",
        title: "ทัวร์แคนาดาตะวันออก 9 วัน 7 คืน ใบไม้เปลี่ยนสี"
      },
      {
        image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=1200&q=95",
        title: "ทัวร์โรม อิตาลี 6 วัน 4 คืน เมืองนิรันดร์"
      },
      {
        image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=1200&q=95",
        title: "ทัวร์ปารีส ฝรั่งเศส 7 วัน 5 คืน เมืองแห่งแสง"
      },
      {
        image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=1200&q=95",
        title: "ทัวร์เมดิเตอร์เรเนียน 10 วัน 8 คืน เกาะ 3 ประเทศ"
      }
    ];
    
    const selectedIndex = tourIdHash % 20;
    return destinationData[selectedIndex];
  };

  // Get the destination data for this tour (image and title)
  const destinationInfo = React.useMemo(() => {
    return getUniqueImageAndTitle();
  }, [tour.metadata.id]);

  // Mock data for airline and travel period since it's not in tour object
  const getAirlineInfo = (country: string) => {
    switch (country) {
      case 'ญี่ปุ่น': return 'Thai Airways (TG)';
      case 'เกาหลีใต้': return 'Korean Air (KE)';
      case 'ไต้หวัน': return 'EVA Air (BR)';
      case 'ยุโรป': return 'Emirates (EK)';
      case 'จีน': return 'China Airlines (CI)';
      case 'สิงคโปร์': return 'Singapore Airlines (SQ)';
      case 'มาเลเซีย': return 'Malaysia Airlines (MH)';
      case 'ฮ่องกง': return 'Cathay Pacific (CX)';
      default: return 'Thai Airways (TG)';
    }
  };

  const getTravelPeriod = (country: string) => {
    switch (country) {
      case 'ญี่ปุ่น': return 'ก.ย. 68 – เม.ย. 69';
      case 'เกาหลีใต้': return 'ต.ค. 68 – มี.ค. 69';
      case 'ไต้หวัน': return 'ก.ย. 68 – ก.พ. 69';
      case 'ยุโรป': return 'เม.ย. 68 – ต.ค. 68';
      case 'จีน': return 'ตลอดปี';
      case 'สิงคโปร์': return 'ตลอดปี';
      case 'มาเลเซีย': return 'ตลอดปี';
      case 'ฮ่องกง': return 'ต.ค. 68 – เม.ย. 69';
      default: return 'ก.ย. 68 – ก.พ. 69';
    }
  };

  return (
    <div ref={elementRef} className="card-container relative mb-4 sm:mb-6" style={{ zIndex: 1 }}>
      {/* 3D Flip Container */}
      <div 
        className="relative w-full h-auto"
        style={{ 
          perspective: '1000px',
          minHeight: '500px'
        }}
      >
        <div 
          className={`
            relative w-full transition-all duration-700 preserve-3d
            ${isExpanded ? 'rotate-y-180' : ''}
          `}
          style={{
            transformStyle: 'preserve-3d',
            transform: isExpanded ? 'rotateY(180deg)' : 'rotateY(0deg)'
          }}
        >
          
          {/* Front Face - Pre-Program (copied from tour-search-41) */}
          <div 
            className={`
              relative w-full backface-hidden
              ${isExpanded ? 'rotate-y-180' : ''}
            `}
            style={{
              backfaceVisibility: 'hidden',
              transform: isExpanded ? 'rotateY(180deg)' : 'rotateY(0deg)'
            }}
          >
            <div className="group bg-white rounded-xl border shadow-md border-gray-200 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 overflow-hidden cursor-pointer relative">
              {/* Simplified Hover Glow Effect */}
              <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/5 transition-colors duration-200 pointer-events-none rounded-xl"></div>
              
              {/* Progress indicator - Disabled when manual click only */}
              {false && progress > 0 && progress < 100 && (
                <div className="absolute top-0 left-0 right-0 h-2 z-10">
                  <div className="relative w-full h-full">
                    {/* Enhanced Background Track */}
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 rounded-t-xl shadow-inner"></div>
                    
                    {/* Professional Progress Bar - Theme Colors */}
                    <div 
                      className="absolute top-0 left-0 h-full transition-all duration-200 ease-out rounded-tl-xl overflow-hidden"
                      style={{ 
                        width: `${progress}%`,
                        background: `linear-gradient(90deg, #3B82F6 0%, #2563EB 30%, #1D4ED8 70%, #1E40AF 100%)`,
                        boxShadow: `0 1px 3px rgba(37, 99, 235, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)`
                      }}
                    >
                      {/* Animated Shimmer Effect */}
                      <div 
                        className="absolute inset-0 opacity-60"
                        style={{
                          background: `linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%)`,
                          animation: `shimmer 2s linear infinite`
                        }}
                      ></div>
                      
                      {/* Progress Head Indicator */}
                      <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-md border border-blue-300">
                        <div className="absolute inset-0.5 bg-blue-500 rounded-full"></div>
                      </div>
                      
                      {/* Glass Effect */}
                      <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-tl-xl"></div>
                      
                      {/* Active Edge Glow */}
                      <div 
                        className="absolute right-0 top-0 w-px h-full bg-white/60 shadow-sm"
                        style={{ 
                          filter: 'blur(0.5px)',
                          boxShadow: '0 0 4px rgba(255,255,255,0.8)' 
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Pre-Program View - Enhanced with Hover Effects */}
              <div className="relative min-h-[500px] md:min-h-[550px] overflow-hidden" onClick={toggleExpand} style={{ cursor: 'pointer' }}>
                <img
                  src={destinationInfo.image}
                  alt={destinationInfo.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200"></div>
                
                {/* Tour Title Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/60 to-transparent group-hover:from-black/70 transition-colors duration-200">
                  <h2 className="text-white text-xl md:text-2xl font-bold mb-1">
                    {destinationInfo.title}
                  </h2>
                  
                  {/* Short Highlight */}
                  <p className="text-white/90 text-sm mb-2">
                    บินตรง • โรงแรม 4-5 ดาว • มื้ออาหารครบ • ไกด์ท้องถิ่น
                  </p>
                  
                  {/* Price and Discount */}
                  <div className="flex items-center gap-2">
                    <span className="text-white text-lg font-bold">
                      ฿{formatPrice(tour.pricing.base_price)}
                    </span>
                    {hasDiscount && (
                      <>
                        <span className="text-white/70 text-sm line-through">
                          ฿{formatPrice(tour.pricing.original_price)}
                        </span>
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                          ลดสูงสุด {tour.pricing.discount_percentage}%
                        </span>
                      </>
                    )}
                  </div>
                  
                  {/* Simple Text Link with Animated Chevron */}
                  <div className="flex justify-center mt-4">
                    <div className="flex items-center gap-1 text-white hover:text-yellow-300 transition-colors duration-200 cursor-pointer">
                      <span className="text-sm font-medium underline underline-offset-2">คลิกเพื่อดูโปรโมชั่น</span>
                      <svg 
                        className="w-4 h-4 animate-bounce" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Back Face - Full Version (copied from tour-search-41) */}
          <div 
            className={`
              absolute inset-0 w-full backface-hidden rotate-y-180
              ${isExpanded ? '' : 'rotate-y-0'}
            `}
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
          >
            <div className="bg-white rounded-xl border shadow-md border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden">
              {/* Back to Pre-Program Button - Positioned below Wishlist */}
              <div className="absolute top-16 right-3 z-10">
                <button 
                  onClick={toggleExpand}
                  className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-all flex items-center justify-center"
                >
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>

              {/* Full Card View (copied exactly from tour-search-41) */}
              <div className={`transition-all duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
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
                    {hasDiscount && (
                      <span className="bg-red-100 text-red-600 text-sm px-3 py-1 rounded-full font-bold">
                        ลด {tour.pricing.discount_percentage}%
                      </span>
                    )}
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onWishlistToggle?.(tour.metadata.id);
                      }}
                      className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-all flex items-center justify-center"
                      aria-label={isWishlisted ? 'ลบจากรายการโปรด' : 'เพิ่มในรายการโปรด'}
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                    </button>
                  </div>
                  
                  {/* Duration Badge */}
                  <div className="absolute bottom-3 left-3">
                    <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-sm font-medium flex items-center">
                      <Clock className="w-4 h-4 mr-1 text-blue-600" />
                      {tour.duration_days} วัน {tour.nights} คืน
                    </div>
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="p-4">
                  {/* Title */}
                  <h3 className="font-semibold text-gray-900 text-base mb-2 line-clamp-2 leading-tight">
                    {tour.title}
                  </h3>
                  
                  {/* Enhanced Location Info */}
                  <div className="flex items-center gap-2 mb-3 text-sm">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                      <span className="font-medium">{tour.location.country}</span>
                    </div>
                    {tour.location.cities && tour.location.cities.length > 0 && (
                      <span className="text-gray-600">
                        {tour.location.cities.slice(0, 5).join(', ')}
                      </span>
                    )}
                  </div>
                  
                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {tour.highlights.slice(0, 3).map((highlight, idx) => (
                      <span key={idx} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-lg">
                        {typeof highlight === 'string' ? highlight : highlight.text}
                      </span>
                    ))}
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

                  {/* Enhanced information */}
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-gray-600">สายการบิน:</span>
                        <div className="font-medium">{getAirlineInfo(tour.location.country)}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">ช่วงเวลาเดินทาง:</span>
                        <div className="font-medium">{getTravelPeriod(tour.location.country)}</div>
                      </div>
                    </div>
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      {tour.pricing.original_price && tour.pricing.original_price > tour.pricing.base_price && (
                        <span className="text-sm text-gray-400 line-through mr-2">
                          ฿{formatPrice(tour.pricing.original_price)}
                        </span>
                      )}
                      <span className="text-2xl font-bold text-blue-600">
                        ฿{formatPrice(tour.pricing.base_price)}
                      </span>
                      <div className="text-xs text-gray-500">ต่อคน</div>
                      {tour.pricing.original_price && tour.pricing.original_price > tour.pricing.base_price && (
                        <div className="text-xs text-green-600 font-medium">
                          ประหยัด ฿{formatPrice(tour.pricing.original_price - tour.pricing.base_price)}
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onQuickBook?.(tour);
                        }}
                        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg font-medium text-sm hover:from-blue-600 hover:to-blue-700 transition-all"
                      >
                        จองทันที
                      </button>
                      <Link href={tour.metadata.canonical_url}>
                        <button className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg font-medium text-sm hover:bg-blue-50 transition-all">
                          ดูเพิ่มเติม
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Loading Overlay - "Presented by Tourwow" - DISABLED for direct transition */}
      {false && showLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/95 backdrop-blur-sm rounded-2xl">
          <div className="text-center">
            {/* Elegant Loading Spinner */}
            <div className="relative mb-4">
              {/* Outer Ring */}
              <div className="w-16 h-16 mx-auto relative">
                <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 border-r-blue-400 rounded-full animate-spin"></div>
                <div className="absolute inset-2 border-2 border-transparent border-t-purple-500 border-l-purple-400 rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
              </div>
              
              {/* Inner Tourwow Logo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Branding Text */}
            <div className="space-y-1">
              <div className="text-sm font-medium text-gray-600 animate-pulse">
                Loading Full Version...
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                <div className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Presented by
                </div>
                <div className="w-8 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
              </div>
              <div className="text-2xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent tracking-wide">
                TOURWOW
              </div>
              
              {/* Decorative Elements */}
              <div className="flex justify-center gap-1 mt-2">
                {[...Array(3)].map((_, i) => (
                  <div 
                    key={i}
                    className="w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .preserve-3d {
          transform-style: preserve-3d;
        }
        
        .backface-hidden {
          backface-visibility: hidden;
        }
        
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        
        @keyframes progressPulse {
          0% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            opacity: 0.4;
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
        
        /* Best Practice Transition Animations */
        @keyframes elegantFadeOut {
          0% {
            opacity: 1;
            transform: scale(1) rotateY(0deg);
            filter: blur(0);
          }
          25% {
            opacity: 0.9;
            transform: scale(0.99) rotateY(-5deg);
            filter: blur(0.5px);
          }
          75% {
            opacity: 0.3;
            transform: scale(0.97) rotateY(-90deg);
            filter: blur(1px);
          }
          100% {
            opacity: 0;
            transform: scale(0.95) rotateY(-180deg);
            filter: blur(2px);
          }
        }
        
        @keyframes elegantFadeIn {
          0% {
            opacity: 0;
            transform: scale(0.95) rotateY(180deg);
            filter: blur(2px);
          }
          25% {
            opacity: 0.3;
            transform: scale(0.97) rotateY(90deg);
            filter: blur(1px);
          }
          75% {
            opacity: 0.9;
            transform: scale(0.99) rotateY(5deg);
            filter: blur(0.5px);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotateY(0deg);
            filter: blur(0);
          }
        }
        
        @keyframes slideUpFade {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          60% {
            opacity: 0.7;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes microBounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-2px);
          }
        }
        
        @keyframes glowPulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
          }
          50% {
            box-shadow: 0 0 30px 10px rgba(59, 130, 246, 0.1);
          }
        }
        
        /* Smooth transition classes */
        .transition-flip-elegant {
          animation: elegantFadeOut 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        .transition-flip-elegant-in {
          animation: elegantFadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        .content-reveal {
          animation: slideUpFade 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          animation-delay: 0.2s;
        }
        
        .micro-interaction {
          animation: microBounce 0.3s cubic-bezier(0.4, 0, 0.6, 1);
        }
        
        .glow-effect {
          animation: glowPulse 2s ease-in-out infinite;
        }
        
        /* Performance Optimizations */
        .group {
          will-change: transform;
        }
        
        .group:hover {
          transform: translateY(-2px);
        }
        
        .group img {
          will-change: transform;
        }
        
        .group:hover img {
          transform: scale(1.05);
        }
        
        /* Prevent event bubbling issues */
        .card-container {
          isolation: isolate;
          contain: layout style;
        }
      `}</style>
    </div>
  );
};

// Prototype 7 - Duplicate of Prototype 6
const Prototype7: React.FC<CompactTourCardProps> = ({ 
  tour, 
  isWishlisted = false, 
  onWishlistToggle, 
  onQuickBook 
}) => {
  // Exact duplicate of Prototype 6
  return <Prototype6 
    tour={tour}
    isWishlisted={isWishlisted}
    onWishlistToggle={onWishlistToggle}
    onQuickBook={onQuickBook}
  />;
};

// Main Component Selector
interface CompactTourCardSelectorProps {
  tour: SearchIndexTour;
  prototype: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  isWishlisted?: boolean;
  onWishlistToggle?: (tourId: string) => void;
  onQuickBook?: (tour: SearchIndexTour) => void;
}

const CompactTourCard: React.FC<CompactTourCardSelectorProps> = ({
  tour,
  prototype = 2,
  isWishlisted = false,
  onWishlistToggle,
  onQuickBook
}) => {
  const props = { tour, isWishlisted, onWishlistToggle, onQuickBook };

  switch (prototype) {
    case 1:
      return <Prototype1 {...props} />;
    case 2:
      return <Prototype2 {...props} />;
    case 3:
      return <Prototype3 {...props} />;
    case 4:
      return <Prototype4 {...props} />;
    case 5:
      return <Prototype5 {...props} />;
    case 6:
      return <Prototype6 {...props} />;
    case 7:
      return <Prototype7 {...props} />;
    default:
      return <Prototype2 {...props} />;
  }
};

export default CompactTourCard;