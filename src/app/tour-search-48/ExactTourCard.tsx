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
const ExactTourCard: React.FC<Prototype7TourCardProps> = ({ 
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
  
  // Countdown timer state - start at 5 seconds for flash sales
  const [timeLeft, setTimeLeft] = useState(() => {
    return { hours: 0, minutes: 0, seconds: 5 };
  });
  const [isExpired, setIsExpired] = useState(false);
  const [showExpiredAnimation, setShowExpiredAnimation] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);
  const [nextProgramCountdown, setNextProgramCountdown] = useState(0);
  const [currentProgramIndex, setCurrentProgramIndex] = useState(0);
  const [currentSlotCountry, setCurrentSlotCountry] = useState('');
  const [isSlotMachineActive, setIsSlotMachineActive] = useState(false);
  
  const formatPrice = (price: number) => price.toLocaleString('th-TH');
  const hasDiscount = tour.pricing.discount_percentage && tour.pricing.discount_percentage > 0;

  // Country list for slot machine - only popular countries that definitely have tours
  const countries = [
    'ญี่ปุ่น', 'เกาหลีใต้', 'ไต้หวัน', 'จีน', 'สิงคโปร์', 'มาเลเซีย', 
    'ฮ่องกง', 'ไทย', 'อินโดนีเซีย', 'เวียดนาม', 'กัมพูชา',
    'ตุรกี', 'กรีซ', 'อิตาลี', 'ฝรั่งเศส', 'เยอรมนี', 
    'สวิสเซอร์แลนด์', 'ออสเตรีย', 'นอร์เวย์', 'ไอซ์แลนด์'
  ];
  
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

  // Start timer immediately for flash sales
  React.useEffect(() => {
    if (!isFlashSale || isExpired || timerStarted) return;
    
    // Start timer immediately
    console.log('Timer started for flash sale card:', tour.metadata.id);
    setTimerStarted(true);
  }, [isFlashSale, isExpired, timerStarted]);

  // Countdown timer effect - only for flash sales and when started
  React.useEffect(() => {
    console.log('Timer effect:', { isFlashSale, isExpired, timerStarted });
    if (!isFlashSale || isExpired || !timerStarted) return;
    
    let intervalId: NodeJS.Timeout;
    
    const startTimer = () => {
      intervalId = setInterval(() => {
        setTimeLeft(prev => {
          let newHours = prev.hours;
          let newMinutes = prev.minutes;
          let newSeconds = prev.seconds;
          
          // Countdown logic
          if (newSeconds > 0) {
            newSeconds = newSeconds - 1;
          } else if (newMinutes > 0) {
            newSeconds = 59;
            newMinutes = newMinutes - 1;
          } else if (newHours > 0) {
            newSeconds = 59;
            newMinutes = 59;
            newHours = newHours - 1;
          } else {
            // Timer expired - trigger animation first, then slot machine
            setShowExpiredAnimation(true);
            setTimeout(() => {
              setShowExpiredAnimation(false); // Hide "ว้าย อดเลย!" 
              setIsExpired(true);
              setNextProgramCountdown(5); // Start 5-second countdown  
              setIsSlotMachineActive(true); // Start slot machine
            }, 1500); // Show "ว้าย อดเลย!" for 1.5 seconds first
            clearInterval(intervalId);
            return { hours: 0, minutes: 0, seconds: 0 };
          }
          
          return { hours: newHours, minutes: newMinutes, seconds: newSeconds };
        });
      }, 1000);
    };
    
    // Small delay to prevent double initialization
    const timeoutId = setTimeout(startTimer, 100);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [isFlashSale, isExpired, timerStarted]);

  // Next program countdown effect
  React.useEffect(() => {
    if (nextProgramCountdown <= 0) return;
    
    const countdownInterval = setInterval(() => {
      setNextProgramCountdown(prev => {
        if (prev <= 1) {
          // Stop slot machine and select final country
          setIsSlotMachineActive(false);
          
          // Reset to new flash sale program with slight delay to show final country
          setTimeout(() => {
            setIsExpired(false);
            setShowExpiredAnimation(false);
            setTimerStarted(false);
            setTimeLeft({ hours: 0, minutes: 0, seconds: 5 });
            setCurrentProgramIndex(prev => prev + 1);
          }, 500);
          
          clearInterval(countdownInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [nextProgramCountdown]);

  // Slot machine effect
  React.useEffect(() => {
    if (!isSlotMachineActive) return;
    
    const slotInterval = setInterval(() => {
      const randomCountry = countries[Math.floor(Math.random() * countries.length)];
      setCurrentSlotCountry(randomCountry);
    }, 5); // Change every 5ms for ultra-fast spinning effect
    
    return () => clearInterval(slotInterval);
  }, [isSlotMachineActive, countries]);

  // Extract destination data array for matching
  const getDestinationData = () => {
    return [
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
  };

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
    
    // Cycle through programs based on currentProgramIndex
    const selectedIndex = (tourIdHash + currentProgramIndex) % 20;
    return destinationData[selectedIndex];
  };

  // Get the destination data for this tour (image and title)
  const destinationInfo = React.useMemo(() => {
    // If slot machine has selected a country, try to match it to destination data
    if (currentSlotCountry && !isSlotMachineActive) {
      const destinationData = getDestinationData();
      const matchingDestination = destinationData.find(dest => 
        dest.title.includes(currentSlotCountry)
      );
      if (matchingDestination) {
        return matchingDestination;
      }
    }
    return getUniqueImageAndTitle();
  }, [tour.metadata.id, currentProgramIndex, currentSlotCountry, isSlotMachineActive]);

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
      if (title.includes('เมดิเตอร์เรเนียน') || title.includes('เกาะ 3 ประเทศ')) return 'gr'; // Mediterranean typically associated with Greece
      
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
        case 'อินโดนีเซีย': return 'id';
        case 'ฟิลิปปินส์': return 'ph';
        case 'เวียดนาม': return 'vn';
        case 'กัมพูชา': return 'kh';
        case 'ลาว': return 'la';
        case 'เมียนมาร์': return 'mm';
        case 'บรูไน': return 'bn';
        case 'อินเดีย': return 'in';
        case 'ศรีลังกา': return 'lk';
        case 'เนปาล': return 'np';
        case 'ปากีสถาน': return 'pk';
        case 'บังกลาเทศ': return 'bd';
        case 'อัฟกานิสถาน': return 'af';
        case 'อิหร่าน': return 'ir';
        case 'ตุรกี': return 'tr';
        case 'กรีซ': return 'gr';
        case 'อิตาลี': return 'it';
        case 'ฝรั่งเศส': return 'fr';
        case 'เยอรมนี': return 'de';
        case 'สเปน': return 'es';
        case 'โปรตุเกส': return 'pt';
        case 'สหราชอาณาจักร': return 'gb';
        case 'ไอร์แลนด์': return 'ie';
        case 'เนเธอร์แลนด์': return 'nl';
        case 'เบลเยียม': return 'be';
        case 'สวิสเซอร์แลนด์': return 'ch';
        case 'ออสเตรีย': return 'at';
        case 'เช็ก': return 'cz';
        case 'โปแลนด์': return 'pl';
        case 'ฮังการี': return 'hu';
        case 'โรมาเนีย': return 'ro';
        case 'บัลแกเรีย': return 'bg';
        case 'นอร์เวย์': return 'no';
        case 'สวีเดน': return 'se';
        case 'ฟินแลนด์': return 'fi';
        case 'เดนมาร์ก': return 'dk';
        case 'ไอซ์แลนด์': return 'is';
        case 'รัสเซีย': return 'ru';
        case 'สหรัฐอเมริกา': return 'us';
        case 'แคนาดา': return 'ca';
        case 'เม็กซิโก': return 'mx';
        case 'บราซิล': return 'br';
        case 'อาร์เจนตินา': return 'ar';
        case 'เปรู': return 'pe';
        case 'ชิลี': return 'cl';
        case 'โคลอมเบีย': return 'co';
        case 'เวเนซุเอลา': return 've';
        case 'ออสเตรเลีย': return 'au';
        case 'นิวซีแลนด์': return 'nz';
        case 'แอฟริกาใต้': return 'za';
        case 'อียิปต์': return 'eg';
        case 'โมร็อกโก': return 'ma';
        default: return 'th'; // Default to Thailand
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

  const getAirlineCode = (country: string) => {
    switch (country) {
      case 'ญี่ปุ่น': return 'TG';
      case 'เกาหลีใต้': return 'KE';
      case 'ไต้หวัน': return 'BR';
      case 'ยุโรป': return 'EK';
      case 'จีน': return 'CI';
      case 'สิงคโปร์': return 'SQ';
      case 'มาเลเซีย': return 'MH';
      case 'ฮ่องกง': return 'CX';
      default: return 'TG';
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
            <div className={`group bg-white rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 overflow-hidden cursor-pointer relative ${
              isFlashSale && !isExpired && nextProgramCountdown === 0 ? 'flash-sale-border' : 'regular-border'
            }`}>
              {/* Simplified Hover Glow Effect */}
              <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/5 transition-colors duration-200 pointer-events-none rounded-xl"></div>
              
              {/* Pre-Program View - Clean Sales Focused */}
              <div className={`relative min-h-[500px] md:min-h-[550px] overflow-hidden ${isExpired && isFlashSale ? 'pointer-events-none' : ''}`} onClick={!isExpired ? toggleExpand : undefined} style={{ cursor: isExpired && isFlashSale ? 'default' : 'pointer' }}>
                <img
                  src={destinationInfo.image}
                  alt={destinationInfo.title}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out ${
                    isExpired && isFlashSale ? 'grayscale opacity-50' : 'group-hover:scale-105'
                  }`}
                />
                
                {/* Enhanced Overlay for Better Text Readability - Lighter */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                
                {/* Expired Animation & Overlay */}
                {((showExpiredAnimation && !isExpired) || (isExpired && nextProgramCountdown > 0)) && isFlashSale && (
                  <div className="absolute inset-0 bg-black/70 z-30 flex items-center justify-center">
                    {isExpired && nextProgramCountdown > 0 ? (
                      <div className="text-center">
                        {/* Card-style Loading Interface */}
                        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 p-6 max-w-sm mx-auto">
                          
                          {/* Header with Time */}
                          <div className="mb-4">
                            <div className="text-lg font-semibold text-gray-800 mb-1">
                              กำลังโหลดโปรโมชั่นถัดไป...
                            </div>
                            <div className="text-sm text-gray-500 mb-2">
                              รอสักครู่ กำลังเตรียมข้อเสนอพิเศษ
                            </div>
                          </div>

                          {/* Progress Circle */}
                          <div className="relative mb-4 flex justify-center">
                            <div className="relative w-28 h-28">
                              {/* Background Circle */}
                              <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 36 36">
                                <circle
                                  cx="18"
                                  cy="18"
                                  r="16"
                                  fill="none"
                                  className="stroke-gray-200"
                                  strokeWidth="3"
                                />
                                {/* Progress Circle */}
                                <circle
                                  cx="18"
                                  cy="18"
                                  r="16"
                                  fill="none"
                                  className="stroke-red-500"
                                  strokeWidth="3"
                                  strokeDasharray={`${((5 - nextProgramCountdown) / 5) * 100}, 100`}
                                  strokeLinecap="round"
                                  style={{
                                    transition: 'stroke-dasharray 1s ease-in-out'
                                  }}
                                />
                              </svg>
                              {/* Slot Machine Text */}
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center px-2">
                                  <div className="text-xs font-bold text-gray-800 leading-tight">
                                    {isSlotMachineActive ? (
                                      <span className="animate-pulse">
                                        ทัวร์{currentSlotCountry}
                                      </span>
                                    ) : (
                                      <span className="text-green-600">
                                        ทัวร์{currentSlotCountry || 'พร้อม!'}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>



                          {/* Loading Animation Dots */}
                          <div className="flex justify-center items-center space-x-1 mt-3">
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div 
                        className={`text-white text-4xl font-bold transform -rotate-12 bg-red-600 px-8 py-4 rounded-lg shadow-2xl border-4 border-white transition-all duration-300 ${
                          showExpiredAnimation && !isExpired 
                            ? 'stamp-animation scale-0' 
                            : 'scale-100'
                        }`}
                        style={{
                          textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                          animationDelay: showExpiredAnimation && !isExpired ? '0s' : undefined
                        }}
                      >
                        ว้าย อดเลย!
                      </div>
                    )}
                  </div>
                )}
                
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
                  <div className="w-8 h-8 relative bg-white rounded-full border border-gray-200 flex items-center justify-center" style={{width: '32px', height: '32px'}}>
                    <Image
                      src={airlineAndFlagInfo.airlineLogo}
                      alt={airlineAndFlagInfo.airlineAlt}
                      fill
                      className="object-contain drop-shadow-lg"
                      sizes="32px"
                    />
                  </div>
                </div>
                
                {/* Content Section - With Additional Data */}
                <div className="absolute inset-x-0 bottom-0 px-6 py-4">
                  {/* Title - With Text Background Overlay */}
                  <div className="mb-3 text-center relative">
                    <div className="absolute inset-0 bg-black/30 blur-xl scale-110 rounded-xl"></div>
                    <h2 className="text-white text-xl md:text-2xl font-black text-center leading-tight relative z-10 px-4 py-2">
                      <span className="drop-shadow-2xl bg-gradient-to-b from-white to-gray-200 bg-clip-text text-transparent">
                        {tour.title}
                      </span>
                    </h2>
                  </div>
                  
                  {/* Clean Card with 7 Required Data Points */}
                  <div className="relative mb-3 group">
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 relative">
                      
                      

                      {/* World-Class UX/UI Best Practices Design */}
                      <div className="px-5 py-5 bg-white relative overflow-hidden">
                        
                        {/* Sophisticated Brand Atmosphere */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-amber-50/40"></div>
                        
                        {/* Airbnb-inspired Content Hierarchy */}
                        <div className="relative z-10 space-y-4">
                          
                          {/* Price Leadership Section - Booking.com Style */}
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              {hasDiscount && (
                                <div className="flex items-center gap-2">
                                  <span className="text-sm text-gray-500 line-through font-medium">฿{formatPrice(tour.pricing.original_price)}</span>
                                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full animate-pulse">
                                    -{tour.pricing.discount_percentage}%
                                  </span>
                                </div>
                              )}
                              <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-black text-gray-900 leading-none">฿{formatPrice(tour.pricing.base_price)}</span>
                                <span className="text-sm text-gray-600 font-medium">ต่อคน</span>
                              </div>
                              {hasDiscount && (
                                <p className="text-xs text-green-600 font-semibold">
                                  🎉 ประหยัดถึง ฿{formatPrice(tour.pricing.original_price - tour.pricing.base_price)}
                                </p>
                              )}
                            </div>
                            
                            {/* Travel Period - Right Side Simple */}
                            <div className="text-right">
                              <div className="flex items-center gap-2 justify-end">
                                <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                                  <Calendar className="w-2.5 h-2.5 text-white" />
                                </div>
                                <p className="text-gray-600 text-xs">ช่วงเวลาเดินทาง</p>
                              </div>
                              <p className="font-semibold text-gray-900 text-sm mt-1">ก.ย. 68 - พ.ค. 69</p>
                            </div>
                          </div>

                          {/* Premium Travel Details - Expedia Style */}
                          <div className="bg-gray-50/80 rounded-xl px-4 py-3 border border-gray-100">
                            <div className="grid grid-cols-1 gap-4 text-sm">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-red-100 rounded-lg flex items-center justify-center">
                                  <MapPin className="w-3.5 h-3.5 text-red-600" />
                                </div>
                                <div>
                                  <p className="text-gray-600 text-xs">จุดหมายปลายทาง</p>
                                  <p className="font-semibold text-gray-900">
                                    {tour.location.country === 'ไต้หวัน' ? 'ไทเป・เกาสง・ไถจง・ไท-นาน・หัวเหลียน' :
                                     tour.location.country === 'ญี่ปุ่น' ? 'โตเกียว・โอซาก้า・เกียวโต・นาโกย่า・ฟูกุโอกะ' :
                                     tour.location.country === 'เกาหลีใต้' ? 'โซล・ปูซาน・เจจู・แดกู・อินชอน' :
                                     tour.location.country === 'จีน' ? 'ปักกิ่ง・เซี่ยงไฮ้・กวางโจว・เสิ่นเจิ้น・ฮางโจว' :
                                     tour.location.country === 'สิงคโปร์' ? 'สิงคโปร์・เซ็นโตซา・ออร์ชาร์ด・มารีนา เบย์・ชิต้าท่าทัน' :
                                     tour.location.country === 'มาเลเซีย' ? 'กัวลาลัมเปอร์・เปนัง・มะละกา・โคตาคินาบาลู・คูชิง' :
                                     tour.location.country === 'อิตาลี' ? 'โรม・ฟลอเรนซ์・เวนิส・มิลาน・นาโปลี' :
                                     tour.location.country === 'ฝรั่งเศส' ? 'ปารีส・นีซ・ลียง・มาร์เซย์・บอร์โด' :
                                     tour.location.country === 'เยอรมนี' ? 'เบอร์ลิน・มิวนิค・ฟรานซ์ฟวร์ต・ฮัมบวร์ก・โคโลญ' :
                                     tour.location.country === 'สวิสเซอร์แลนด์' ? 'ซูริค・เจนีวา・อินเตอร์ลาเก็น・แซร์แมท・เบิร์น' :
                                     tour.location.cities && tour.location.cities.length > 0 ? tour.location.cities.slice(0, 5).join('・') : tour.location.country}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                        </div>

                        {/* Premium Border Accent */}
                        <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent opacity-60"></div>
                        <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-60"></div>
                        
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
        .flash-sale-border {
          position: relative;
          background: linear-gradient(white, white) padding-box,
                      linear-gradient(90deg, #ff0066, #ff6600, #ffcc00, #ff6600, #ff0066) border-box;
          border: 3px solid transparent;
          border-radius: 12px;
          background-size: 100% 100%, 300% 100%;
          animation: moveBorder 6s linear infinite;
        }
        
        @keyframes moveBorder {
          0% {
            background-position: 0% 0%, 0% 0%;
          }
          100% {
            background-position: 0% 0%, 200% 0%;
          }
        }
        
        .stamp-animation {
          animation: stampEffect 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }
        
        @keyframes stampEffect {
          0% {
            transform: scale(0) rotate(-12deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.2) rotate(-12deg);
            opacity: 1;
          }
          65% {
            transform: scale(0.9) rotate(-12deg);
          }
          80% {
            transform: scale(1.05) rotate(-12deg);
          }
          90% {
            transform: scale(0.98) rotate(-12deg);
          }
          100% {
            transform: scale(1) rotate(-12deg);
            opacity: 1;
          }
        }
        
        .discount-border {
          position: relative;
          background: linear-gradient(white, white) padding-box,
                      linear-gradient(135deg, #3b82f6, #06b6d4) border-box;
          border: 2px solid transparent;
          border-radius: 12px;
        }
        
        .regular-border {
          position: relative;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          transition: border-color 0.3s ease;
        }
        
        .regular-border:hover {
          border-color: #d1d5db;
        }
        
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
        
        /* Fireworks Animation */
        .firework {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
        
        .firework-1 {
          top: 20%;
          left: 15%;
          animation: firework-explode 1s infinite;
          animation-delay: 0s;
        }
        
        .firework-2 {
          top: 40%;
          right: 20%;
          animation: firework-explode 1s infinite;
          animation-delay: 0.3s;
        }
        
        .firework-3 {
          top: 60%;
          left: 70%;
          animation: firework-explode 1s infinite;
          animation-delay: 0.6s;
        }
        
        .spark {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #ffd700;
          border-radius: 50%;
          opacity: 0;
        }
        
        .firework .spark-1 {
          animation: spark-fly-1 1s infinite;
        }
        .firework .spark-2 {
          animation: spark-fly-2 1s infinite;
        }
        .firework .spark-3 {
          animation: spark-fly-3 1s infinite;
        }
        .firework .spark-4 {
          animation: spark-fly-4 1s infinite;
        }
        .firework .spark-5 {
          animation: spark-fly-5 1s infinite;
        }
        .firework .spark-6 {
          animation: spark-fly-6 1s infinite;
        }
        
        .firework-1 .spark {
          animation-delay: 0s;
        }
        .firework-2 .spark {
          animation-delay: 0.3s;
        }
        .firework-3 .spark {
          animation-delay: 0.6s;
        }
        
        @keyframes firework-explode {
          0%, 10% {
            background: #ff6b6b;
            opacity: 1;
            transform: scale(0.1);
          }
          15% {
            background: #ffd700;
            opacity: 1;
            transform: scale(1);
          }
          20%, 100% {
            opacity: 0;
            transform: scale(0.1);
          }
        }
        
        @keyframes spark-fly-1 {
          0%, 15% {
            opacity: 0;
            transform: translate(0, 0) scale(0);
          }
          20% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
          }
          70% {
            opacity: 1;
            transform: translate(25px, -25px) scale(0.5);
          }
          100% {
            opacity: 0;
            transform: translate(35px, -20px) scale(0);
          }
        }
        
        @keyframes spark-fly-2 {
          0%, 15% {
            opacity: 0;
            transform: translate(0, 0) scale(0);
          }
          20% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
          }
          70% {
            opacity: 1;
            transform: translate(20px, 25px) scale(0.5);
          }
          100% {
            opacity: 0;
            transform: translate(30px, 35px) scale(0);
          }
        }
        
        @keyframes spark-fly-3 {
          0%, 15% {
            opacity: 0;
            transform: translate(0, 0) scale(0);
          }
          20% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
          }
          70% {
            opacity: 1;
            transform: translate(-25px, -20px) scale(0.5);
          }
          100% {
            opacity: 0;
            transform: translate(-35px, -30px) scale(0);
          }
        }
        
        @keyframes spark-fly-4 {
          0%, 15% {
            opacity: 0;
            transform: translate(0, 0) scale(0);
          }
          20% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
          }
          70% {
            opacity: 1;
            transform: translate(-20px, 22px) scale(0.5);
          }
          100% {
            opacity: 0;
            transform: translate(-30px, 32px) scale(0);
          }
        }
        
        @keyframes spark-fly-5 {
          0%, 15% {
            opacity: 0;
            transform: translate(0, 0) scale(0);
          }
          20% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
          }
          70% {
            opacity: 1;
            transform: translate(0, -30px) scale(0.5);
          }
          100% {
            opacity: 0;
            transform: translate(0, -40px) scale(0);
          }
        }
        
        @keyframes spark-fly-6 {
          0%, 15% {
            opacity: 0;
            transform: translate(0, 0) scale(0);
          }
          20% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
          }
          70% {
            opacity: 1;
            transform: translate(0, 28px) scale(0.5);
          }
          100% {
            opacity: 0;
            transform: translate(0, 38px) scale(0);
          }
        }
        
        /* Emoji Fireworks - positioned relative to emoji */
        .emoji-firework {
          position: absolute;
          width: 4px;
          height: 4px;
          left: 8px;
          top: 2px;
          pointer-events: none;
        }
        
        .emoji-spark {
          position: absolute;
          width: 3px;
          height: 3px;
          background: #ffd700;
          border-radius: 50%;
          opacity: 0;
        }
        
        .emoji-firework .emoji-spark-1 {
          animation: emoji-spark-fly-1 1.5s infinite;
          animation-delay: 0.2s;
        }
        .emoji-firework .emoji-spark-2 {
          animation: emoji-spark-fly-2 1.5s infinite;
          animation-delay: 0.4s;
        }
        .emoji-firework .emoji-spark-3 {
          animation: emoji-spark-fly-3 1.5s infinite;
          animation-delay: 0.6s;
        }
        .emoji-firework .emoji-spark-4 {
          animation: emoji-spark-fly-4 1.5s infinite;
          animation-delay: 0.8s;
        }
        .emoji-firework .emoji-spark-5 {
          animation: emoji-spark-fly-5 1.5s infinite;
          animation-delay: 1.0s;
        }
        .emoji-firework .emoji-spark-6 {
          animation: emoji-spark-fly-6 1.5s infinite;
          animation-delay: 1.2s;
        }
        
        @keyframes emoji-spark-fly-1 {
          0% {
            opacity: 0;
            transform: translate(0, 0) scale(0);
          }
          20% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
          }
          70% {
            opacity: 1;
            transform: translate(15px, -8px) scale(0.5);
          }
          100% {
            opacity: 0;
            transform: translate(20px, -5px) scale(0);
          }
        }
        
        @keyframes emoji-spark-fly-2 {
          0% {
            opacity: 0;
            transform: translate(0, 0) scale(0);
          }
          20% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
          }
          70% {
            opacity: 1;
            transform: translate(12px, 10px) scale(0.5);
          }
          100% {
            opacity: 0;
            transform: translate(18px, 15px) scale(0);
          }
        }
        
        @keyframes emoji-spark-fly-3 {
          0% {
            opacity: 0;
            transform: translate(0, 0) scale(0);
          }
          20% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
          }
          70% {
            opacity: 1;
            transform: translate(-12px, -6px) scale(0.5);
          }
          100% {
            opacity: 0;
            transform: translate(-18px, -10px) scale(0);
          }
        }
        
        @keyframes emoji-spark-fly-4 {
          0% {
            opacity: 0;
            transform: translate(0, 0) scale(0);
          }
          20% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
          }
          70% {
            opacity: 1;
            transform: translate(-8px, 12px) scale(0.5);
          }
          100% {
            opacity: 0;
            transform: translate(-15px, 18px) scale(0);
          }
        }
        
        @keyframes emoji-spark-fly-5 {
          0% {
            opacity: 0;
            transform: translate(0, 0) scale(0);
          }
          20% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
          }
          70% {
            opacity: 1;
            transform: translate(0, -15px) scale(0.5);
          }
          100% {
            opacity: 0;
            transform: translate(0, -20px) scale(0);
          }
        }
        
        @keyframes emoji-spark-fly-6 {
          0% {
            opacity: 0;
            transform: translate(0, 0) scale(0);
          }
          20% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
          }
          70% {
            opacity: 1;
            transform: translate(0, 14px) scale(0.5);
          }
          100% {
            opacity: 0;
            transform: translate(0, 20px) scale(0);
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};

export default ExactTourCard;