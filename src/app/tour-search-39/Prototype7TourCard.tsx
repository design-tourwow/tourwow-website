'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import './animations.css';
import Image from 'next/image';
import Link from 'next/link';
import { SearchIndexTour } from './types';
import { 
  Clock, MapPin, Star, Users, Heart, Zap, ChevronDown, 
  Calendar, ArrowRight
} from 'lucide-react';

// Global state to prevent multiple cards expanding simultaneously
let currentExpandingCard: string | null = null;
let expandingCardTimestamp: number = 0;

// Simple auto-expand hook without CardExpansionContext
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
            
            if (cardTimestamp.current === 0) {
              cardTimestamp.current = currentTime;
            }
            
            if (!currentExpandingCard || currentExpandingCard === cardId.current) {
              currentExpandingCard = cardId.current;
              expandingCardTimestamp = cardTimestamp.current;
              setIsFocused(true);
            } else {
              setIsFocused(false);
            }
            
            if (!currentExpandingCard || currentExpandingCard === cardId.current) {
              const startTime = Date.now();
              
              const animateProgress = () => {
                const elapsed = Date.now() - startTime;
                const progressPercent = Math.min((elapsed / threshold) * 100, 100);
                
                if (!currentExpandingCard || currentExpandingCard === cardId.current) {
                  setProgress(progressPercent);
                  
                  if (progressPercent < 100) {
                    progressRef.current = requestAnimationFrame(animateProgress);
                  }
                } else {
                  setProgress(0);
                }
              };
              
              progressRef.current = requestAnimationFrame(animateProgress);

              timerRef.current = setTimeout(() => {
                if (!currentExpandingCard || currentExpandingCard === cardId.current) {
                  setIsExpanded(true);
                  setProgress(100);
                }
              }, threshold);
            }
          } else if (isCompletelyOut) {
            setIsFocused(false);
            setProgress(0);
            
            if (isExpanded) {
              setIsExpanded(false);
              if (currentExpandingCard === cardId.current) {
                currentExpandingCard = null;
                expandingCardTimestamp = 0;
              }
            }
            
            if (currentExpandingCard === cardId.current) {
              currentExpandingCard = null;
              expandingCardTimestamp = 0;
            }
            
            cardTimestamp.current = 0;
            
            if (timerRef.current) clearTimeout(timerRef.current);
            if (progressRef.current) cancelAnimationFrame(progressRef.current);
          } else if (!entry.isIntersecting) {
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
      { threshold: [0, 0.1, 0.6] }
    );

    observer.observe(elementRef.current);

    return () => {
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
    if (timerRef.current) clearTimeout(timerRef.current);
    if (progressRef.current) cancelAnimationFrame(progressRef.current);
    
    if (!isExpanded) {
      currentExpandingCard = cardId.current;
    } else {
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

interface Prototype7TourCardProps {
  tour: SearchIndexTour;
  isWishlisted?: boolean;
  onWishlistToggle?: (tourId: string) => void;
  onQuickBook?: (tour: SearchIndexTour) => void;
}

// Prototype 7: 3D Flip Card (Pre-Program to Full Version)
const Prototype7TourCard: React.FC<Prototype7TourCardProps> = ({ 
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

  // Generate unique image and title for each tour
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
          
          {/* Front Face - Pre-Program */}
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
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
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

          {/* Back Face - Full Version */}
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

              {/* Full Card View */}
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
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                        ลดสูงสุด {tour.pricing.discount_percentage}%
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

      {/* 3D Flip Animation Styles */}
      <style jsx>{`
        .preserve-3d {
          transform-style: preserve-3d;
        }
        
        .backface-hidden {
          backface-visibility: hidden;
        }
        
        .rotate-y-0 {
          transform: rotateY(0deg);
        }
        
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default Prototype7TourCard;