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
  // Enable auto-expand to get isInView working
  const { isExpanded, progress, isInView, isFocused, elementRef, toggleExpand } = useAutoExpand(5000, false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [revealedDigits, setRevealedDigits] = useState(0);
  const [spinningDigits, setSpinningDigits] = useState<number[]>([]);
  
  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59 });
  
  const formatPrice = (price: number) => price.toLocaleString('th-TH');
  const hasDiscount = tour.pricing.discount_percentage && tour.pricing.discount_percentage > 0;
  
  // Check if this is a flash sale (discount > 15%) or regular tour
  const isFlashSale = hasDiscount && tour.pricing.discount_percentage > 15;

  // Progressive digit reveal effect - for testing (always active)
  React.useEffect(() => {
    if (isFlashSale) {
      const priceString = formatPrice(tour.pricing.base_price).replace(/,/g, '');
      const totalDigits = priceString.length;
      
      // Reset revealed digits
      setRevealedDigits(0);
      
      // Initialize spinning digits for all unrevealed positions
      const initialSpinning = Array.from({length: totalDigits}, (_, i) => Math.floor(Math.random() * 10));
      setSpinningDigits(initialSpinning);
      
      // Start spinning animation for unrevealed digits
      const spinInterval = setInterval(() => {
        setSpinningDigits(prev => prev.map(() => Math.floor(Math.random() * 10)));
      }, 150); // Change spinning digits every 150ms
      
      // Start revealing digits progressively
      const revealTimer = setTimeout(() => {
        const interval = setInterval(() => {
          setRevealedDigits(prev => {
            if (prev >= totalDigits) {
              clearInterval(interval);
              clearInterval(spinInterval); // Stop spinning when all digits revealed
              return totalDigits;
            }
            return prev + 1;
          });
        }, 400); // Reveal each digit every 400ms
      }, 1500); // Start after 1.5 second (when slash animation starts)
      
      return () => {
        clearTimeout(revealTimer);
        clearInterval(spinInterval);
      };
    }
  }, [isFlashSale, tour.pricing.base_price]);

  // Removed loading animation - direct transition from Pre-Program to Full-Program
  React.useEffect(() => {
    // Skip loading screen entirely
    setShowLoading(false);
    setIsAnimating(false);
  }, [progress, isExpanded]);

  // Countdown timer effect
  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59 };
        } else {
          // Reset to 24 hours when countdown ends
          return { hours: 23, minutes: 59 };
        }
      });
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

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

  // Get airline logo and country flag based on tour program
  const getAirlineAndFlag = () => {
    const tourIdHash = tour.metadata.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    // Use Air Asia for some programs (roughly 30% of tours)
    const useAirAsia = tourIdHash % 10 < 3;
    
    // Map destinations to country codes based on tour program titles
    const getCountryCodeFromTitle = (title: string) => {
      // Extract country information from tour title
      if (title.includes('กรีซ') || title.includes('เกาะสวรรค์ทะเลสีฟ้า')) return 'gr';
      if (title.includes('บาหลี') || title.includes('เกาะแห่งเทพเจ้า')) return 'id';
      if (title.includes('แคนาดา') || title.includes('ธรรมชาติสุดแสนงาม')) return 'ca';
      if (title.includes('สวิสเซอร์แลนด์') || title.includes('แอลป์ยอดหิมะ')) return 'ch';
      if (title.includes('มัลดีฟส์') || title.includes('รีสอร์ท')) return 'mv';
      if (title.includes('ญี่ปุ่น') || title.includes('ซากุระ') || title.includes('โฮบบิท')) return 'jp';
      if (title.includes('ไอซ์แลนด์') || title.includes('ออโรรา') || title.includes('แสงเหนือ')) return 'is';
      if (title.includes('นอร์เวย์') || title.includes('ฟยอร์ด') || title.includes('โลฟเทน')) return 'no';
      if (title.includes('เยอรมนี') || title.includes('ปราสาทโน') || title.includes('นอิชวานชไตน์')) return 'de';
      if (title.includes('นิวซีแลนด์') || title.includes('โฮบบิท')) return 'nz';
      if (title.includes('กัมพูชา') || title.includes('นครวัด') || title.includes('เขมร')) return 'kh';
      if (title.includes('ตุรกี') || title.includes('บอลลูน') || title.includes('คัปปาโดเกีย')) return 'tr';
      if (title.includes('ออสเตรีย') || title.includes('เมืองแห่งดนตรี')) return 'at';
      if (title.includes('ปราก') || title.includes('เช็ก') || title.includes('เมืองแห่งปราสาท')) return 'cz';
      if (title.includes('ทัสคานี') || title.includes('อิตาลี') || title.includes('ไร่องุ่น') || title.includes('ไวน์')) return 'it';
      if (title.includes('โรม') || title.includes('เมืองนิรันดร์')) return 'it';
      if (title.includes('ปารีส') || title.includes('ฝรั่งเศส') || title.includes('เมืองแห่งแสง')) return 'fr';
      if (title.includes('เมดิเตอร์เรเนียน') || title.includes('เกาะ 3 ประเทศ')) return 'gr';
      
      // Fallback to country field if title doesn't contain specific info
      const country = tour.location.country;
      switch (country) {
        case 'ญี่ปุ่น': return 'jp';
        case 'เกาหลีใต้': return 'kr';
        case 'ไต้หวัน': return 'tw';
        case 'ยุโรป': return 'eu';
        case 'จีน': return 'cn';
        case 'สิงคโปร์': return 'sg';
        case 'มาเลเซีย': return 'my';
        case 'ฮ่องกง': return 'hk';
        case 'ไทย': return 'th';
        default: return 'th';
      }
    };
    
    return {
      airlineLogo: useAirAsia ? "/icons/airlines/air-asia.svg" : "/icons/airlines/thai-airways.svg",
      airlineAlt: useAirAsia ? "Air Asia" : "Thai Airways",
      flagIcon: `/icons/destinations/flag-icons-main/flags/4x3/${getCountryCodeFromTitle(destinationInfo.title)}.svg`,
      flagAlt: `${destinationInfo.title.split(' ')[1] || 'Country'} Flag`
    };
  };

  const airlineAndFlagInfo = React.useMemo(() => {
    return getAirlineAndFlag();
  }, [tour.metadata.id, destinationInfo.title]);

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
              
              {/* Pre-Program View - Clean Sales Focused */}
              <div className="relative min-h-[500px] md:min-h-[550px] overflow-hidden" onClick={toggleExpand} style={{ cursor: 'pointer' }}>
                <img
                  src={destinationInfo.image}
                  alt={destinationInfo.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                
                {/* Enhanced Overlay for Better Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10"></div>
                
                {/* Country Flag × Airline Logo */}
                <div className="absolute top-3 right-3 z-20 flex items-center gap-2">
                  {/* Country Flag - Circular */}
                  <div className="w-8 h-8 relative">
                    <Image
                      src={airlineAndFlagInfo.flagIcon}
                      alt={airlineAndFlagInfo.flagAlt}
                      fill
                      className="object-cover rounded-full drop-shadow-lg"
                      sizes="32px"
                    />
                  </div>
                  
                  {/* × Symbol */}
                  <span className="text-white font-bold text-lg drop-shadow-2xl">×</span>
                  
                  {/* Airline Logo */}
                  <div className="w-12 h-8 relative">
                    <Image
                      src={airlineAndFlagInfo.airlineLogo}
                      alt={airlineAndFlagInfo.airlineAlt}
                      fill
                      className="object-contain drop-shadow-2xl"
                      sizes="48px"
                    />
                  </div>
                </div>
                
                {/* Content Section - Focused Sales Layout */}
                <div className="absolute inset-x-0 bottom-0 px-6 py-4">
                  {/* Title - Smaller Size */}
                  <h2 className="text-white text-xl md:text-2xl font-bold mb-3 text-center drop-shadow-2xl">
                    {destinationInfo.title}
                  </h2>
                  
                  {/* Unified Ticket Design - Seamless Zigzag */}
                  <div className="relative mb-4 shadow-2xl" style={{
                    clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 6px, calc(100% - 4px) 12px, 100% 18px, calc(100% - 4px) 24px, 100% 30px, calc(100% - 4px) 36px, 100% 42px, calc(100% - 4px) 48px, 100% 54px, calc(100% - 4px) 60px, 100% 66px, calc(100% - 4px) 72px, 100% 78px, calc(100% - 4px) 84px, 100% 90px, calc(100% - 4px) 96px, 100% 102px, calc(100% - 4px) 108px, 100% 114px, calc(100% - 4px) 120px, 100% 126px, calc(100% - 4px) 132px, 100% 138px, calc(100% - 4px) 144px, 100% 150px, calc(100% - 4px) 156px, 100% 162px, calc(100% - 4px) 168px, 100% 174px, calc(100% - 4px) 180px, 100% 186px, calc(100% - 4px) 192px, 100% 198px, calc(100% - 4px) 204px, 100% 210px, calc(100% - 4px) 216px, 100% 100%, 0 100%, 4px 216px, 0 210px, 4px 204px, 0 198px, 4px 192px, 0 186px, 4px 180px, 0 174px, 4px 168px, 0 162px, 4px 156px, 0 150px, 4px 144px, 0 138px, 4px 132px, 0 126px, 4px 120px, 0 114px, 4px 108px, 0 102px, 4px 96px, 0 90px, 4px 84px, 0 78px, 4px 72px, 0 66px, 4px 60px, 0 54px, 4px 48px, 0 42px, 4px 36px, 0 30px, 4px 24px, 0 18px, 4px 12px, 0 6px)'
                  }}>
                    {/* Flash Sale Header - Show only for flash sales */}
                    {isFlashSale ? (
                      <div className="bg-red-600 text-white px-4 py-2 relative">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                            <span className="text-xs font-bold uppercase tracking-wide">Flash Sale</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-xs font-semibold">จองภายใน {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')} ลดเพิ่ม ฿1,000</span>
                          </div>
                        </div>
                      </div>
                    ) : hasDiscount ? (
                      <div className="bg-blue-600 text-white px-4 py-2 relative">
                        <div className="flex items-center justify-center">
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                            <span className="text-xs font-bold uppercase tracking-wide">พิเศษสำหรับคุณ</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-slate-600 text-white px-4 py-2 relative">
                        <div className="flex items-center justify-center">
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                            <span className="text-xs font-bold uppercase tracking-wide">Premium Quality</span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Price Content Section */}
                    <div className="bg-white/95 backdrop-blur-sm">
                      <div className="py-2 px-4">
                      <div className="flex items-center justify-between mb-3">
                        {/* Price Display */}
                        <div>
                          {/* Flash Sale Price Display */}
                          {isFlashSale && hasDiscount && (
                            <>
                              <div className="relative inline-block mb-1">
                                <span className="text-gray-500 text-lg font-semibold">
                                  ฿{formatPrice(tour.pricing.original_price)}
                                </span>
                                {/* Animated Strike Through - Only for Flash Sale and when focused */}
                                <div className="absolute left-0 w-full pointer-events-none" style={{ top: '90%' }}>
                                  <div 
                                    className="h-0.5 bg-red-500 origin-left"
                                    style={{
                                      width: '0%',
                                      transform: 'rotate(-20deg)',
                                      animation: 'slashPrice 2s ease-out 0.5s infinite'
                                    }}
                                  ></div>
                                </div>
                              </div>
                              <div className="flex items-baseline gap-2">
                                <div className="text-4xl font-black text-red-600 flex items-baseline">
                                  <span>฿</span>
                                  <div className="flex">
                                    {(() => {
                                      const priceStr = formatPrice(tour.pricing.base_price);
                                      let digitCount = 0;
                                      
                                      return priceStr.split('').map((digit, index) => {
                                        const isNumber = !isNaN(parseInt(digit));
                                        let displayDigit = digit;
                                        let shouldShow = true;
                                        
                                        if (isNumber) {
                                          const isRevealed = digitCount < revealedDigits;
                                          if (!isRevealed && spinningDigits[digitCount] !== undefined) {
                                            // Show spinning digit if not yet revealed
                                            displayDigit = spinningDigits[digitCount].toString();
                                          }
                                          shouldShow = true; // Always show (either real digit or spinning)
                                          digitCount++;
                                        }
                                        
                                        return (
                                          <div 
                                            key={index}
                                            className="relative overflow-hidden h-12 flex items-center"
                                            style={{ minWidth: digit === ',' ? '0.3ch' : '0.8ch' }}
                                          >
                                            {isNumber ? (
                                              <>
                                                {/* Spinning slot for unrevealed digits */}
                                                {digitCount - 1 >= revealedDigits && (
                                                  <div className="absolute inset-0 flex flex-col slot-spinning">
                                                    {[0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9].map((num, i) => (
                                                      <span key={i} className="h-12 flex items-center justify-center">
                                                        {num}
                                                      </span>
                                                    ))}
                                                  </div>
                                                )}
                                                {/* Final revealed digit */}
                                                <span 
                                                  className={`h-12 flex items-center justify-center transition-all duration-300 ${
                                                    digitCount - 1 < revealedDigits ? 'opacity-100 z-10 relative' : 'opacity-0'
                                                  }`}
                                                >
                                                  {digit}
                                                </span>
                                              </>
                                            ) : (
                                              <span className="h-12 flex items-center justify-center">
                                                {digit}
                                              </span>
                                            )}
                                          </div>
                                        );
                                      });
                                    })()}
                                  </div>
                                </div>
                                <span className="text-gray-600 text-sm">ต่อท่าน</span>
                              </div>
                            </>
                          )}

                          {/* Regular Discount Price Display */}
                          {!isFlashSale && hasDiscount && (
                            <>
                              <span className="text-gray-400 text-sm line-through block mb-1">
                                ฿{formatPrice(tour.pricing.original_price)}
                              </span>
                              <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-black text-blue-600">
                                  ฿{formatPrice(tour.pricing.base_price)}
                                </span>
                                <span className="text-gray-600 text-sm">ต่อท่าน</span>
                              </div>
                            </>
                          )}

                          {/* Regular Price Display (No Discount) */}
                          {!hasDiscount && (
                            <div className="flex items-baseline gap-2">
                              <span className="text-4xl font-black text-slate-700">
                                ฿{formatPrice(tour.pricing.base_price)}
                              </span>
                              <span className="text-gray-600 text-sm">ต่อท่าน</span>
                            </div>
                          )}
                        </div>
                        
                        {/* Savings Badge */}
                        {hasDiscount && (
                          <div className="text-right">
                            <div className="bg-green-100 text-green-700 px-3 py-1 rounded-lg mb-1">
                              <span className="text-sm font-bold">ประหยัด {tour.pricing.discount_percentage}%</span>
                            </div>
                            <span className="text-green-600 text-xs font-semibold">
                              เซฟเงินได้ ฿{formatPrice(tour.pricing.original_price - tour.pricing.base_price)}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      </div>
                      
                      {/* Sales Incentives Row */}
                      <div className="flex items-center justify-center gap-2 pt-3 border-t border-gray-200 px-4 pb-4 text-xs">
                        <div className="flex items-center gap-1">
                          <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center">
                            <svg className="w-2.5 h-2.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                          </div>
                          <span className="text-gray-700 font-medium">ผ่อน 0% 6 เดือน</span>
                        </div>
                        <span className="text-gray-400">•</span>
                        <div className="flex items-center gap-1">
                          <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
                            <svg className="w-2.5 h-2.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <span className="text-gray-700 font-medium">ยกเลิกฟรี</span>
                        </div>
                        <span className="text-gray-400">•</span>
                        <div className="flex items-center gap-1">
                          <div className="w-4 h-4 bg-amber-100 rounded-full flex items-center justify-center">
                            <svg className="w-2.5 h-2.5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                          <span className="text-gray-700 font-medium">เหลือ 12 ที่นั่ง</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* CTA Text Link - Simple and Clean */}
                  <div className="text-center">
                    <a 
                      href="#" 
                      className="inline-flex items-center gap-2 text-white hover:text-yellow-300 transition-colors duration-200 group"
                    >
                      <span className="text-sm font-bold underline underline-offset-2">คลิกเพื่อดูโปรโมชั่น</span>
                      <svg 
                        className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        style={{
                          animation: 'bounceX 1s ease-in-out infinite'
                        }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
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
        
        @keyframes bounceX {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(4px);
          }
        }
        
        @keyframes slashPrice {
          0% {
            width: 0%;
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            width: 110%;
            opacity: 1;
          }
        }
        
        @keyframes priceHighlight {
          0%, 85%, 100% {
            color: rgb(220, 38, 38);
            font-weight: 900;
            letter-spacing: 0;
          }
          15%, 70% {
            color: rgb(185, 28, 28);
            font-weight: 900;
            letter-spacing: -0.02em;
          }
        }
        
        @keyframes digitReveal {
          0% {
            opacity: 0;
            transform: translateY(10px) scale(0.8);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes spinNumbers {
          0% {
            transform: translateY(0%);
          }
          50% {
            transform: translateY(-50%);
          }
          100% {
            transform: translateY(-100%);
          }
        }
      `}</style>
    </div>
  );
};

export default Prototype7TourCard;