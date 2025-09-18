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
  // Simplified state - only countdown timer
  const [isAnimating, setIsAnimating] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  
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

  // Flash Sale countdown timer
  const [flashSaleTimeLeft, setFlashSaleTimeLeft] = React.useState('01:00:00');
  const [showColon, setShowColon] = React.useState(true);
  const startTimeRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    if (!isFlashSale) return;

    // Initialize start time only once
    if (!startTimeRef.current) {
      startTimeRef.current = Date.now();
    }

    const duration = 60 * 60 * 1000; // 1 hour in milliseconds

    const calculateTimeLeft = () => {
      const elapsed = Date.now() - startTimeRef.current!;
      const cyclePosition = elapsed % duration; // Loop every hour
      const remaining = duration - cyclePosition;
      
      const hours = Math.floor(remaining / (1000 * 60 * 60));
      const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
      
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const timer = setInterval(() => {
      setFlashSaleTimeLeft(calculateTimeLeft());
      setShowColon(prev => !prev); // Toggle colon visibility every second
    }, 1000);

    setFlashSaleTimeLeft(calculateTimeLeft()); // Set initial value

    return () => clearInterval(timer);
  }, [isFlashSale]);







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
    
    // Cycle through programs based on tour ID
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
    <div ref={elementRef} className="card-container relative mb-2.5 sm:mb-6" style={{ zIndex: 1 }}>
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
            <div className={`group bg-white rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer relative ${
              isFlashSale ? 'flash-sale-border' : 'regular-border'
            }`}>
              {/* Simplified Hover Glow Effect */}
              <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/5 transition-colors duration-200 pointer-events-none rounded-xl"></div>
              
              {/* Seamless Layout - Image with Integrated Content */}
              <div className={`relative min-h-[500px] md:min-h-[550px] overflow-hidden flex flex-col`} onClick={toggleExpand} style={{ cursor: 'pointer' }}>
                
                {/* Image Section - 16:9 Aspect Ratio */}
                <div className="relative w-full h-60 overflow-hidden">
                  <img
                    src={destinationInfo.image}
                    alt={destinationInfo.title}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-105`}
                  />
                  {/* Seamless gradient overlay that blends into content */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-gray-50"></div>
                </div>
                
                {/* Content Section - No Gap */}
                <div className="flex-1 px-0 py-0 bg-gray-50 relative z-10">
                  {/* Title - Hidden */}
                  <div className="hidden mb-3 text-center relative">
                    <div className="absolute inset-0 bg-black/30 blur-xl scale-110 rounded-xl"></div>
                    <h2 className="text-white text-lg md:text-xl font-black text-center leading-tight relative z-10 px-4 py-2">
                      <span className="drop-shadow-2xl bg-gradient-to-b from-white to-gray-200 bg-clip-text text-transparent">
                        {destinationInfo.title}
                      </span>
                    </h2>
                  </div>
                  
                  {/* Clean Card with 7 Required Data Points - Symmetrical Zigzag Ticket Style */}
                  <div className="relative shadow-2xl">
                    <div className="bg-white/85 backdrop-blur-sm relative overflow-hidden rounded-xl">
                      
                      {/* Special Header */}
                      <div className={`${isFlashSale ? 'bg-red-600' : 'bg-blue-600'} text-white px-4 py-2 relative`}>
                        <div className="flex items-center justify-center">
                          <div className="flex items-center gap-2">
                            {isFlashSale ? (
                              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 lightning-flash">
                                <path d="M13 2L3 14h5l-1 8 10-12h-5l1-8z" />
                              </svg>
                            ) : (
                              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 star-glow">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                              </svg>
                            )}
                            <span className="text-sm font-bold tracking-wide">
                              {isFlashSale ? (
                                <div className="flex items-center gap-2">
                                  <span>โปรจำกัดเวลา!</span>
                                  <span className="bg-white/20 px-2 py-1 rounded text-sm font-medium">
                                    {flashSaleTimeLeft.split(':').map((part, index) => (
                                      <span key={index}>
                                        {part}
                                        {index < 2 && (
                                          <span className={`transition-opacity duration-200 ${showColon ? 'opacity-100' : 'opacity-30'}`}>
                                            :
                                          </span>
                                        )}
                                      </span>
                                    ))}
                                  </span>
                                </div>
                              ) : (
                                'แนะนำสำหรับคุณ'
                              )}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* World-Class UX/UI Best Practices Design */}
                      <div className="px-5 py-5 relative overflow-hidden">
                        
                        {/* Sophisticated Brand Atmosphere */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/10 via-white/5 to-gray-50/10"></div>
                        
                        {/* Airbnb-inspired Content Hierarchy */}
                        <div className="relative z-10 space-y-4">
                          
                          {/* Price Leadership Section - Booking.com Style */}
                          <div className="space-y-3">
                            {/* Country Row - Full Width Merged */}
                            <div className="flex items-center gap-2 relative">
                              <div className="w-4 h-4 rounded-full overflow-hidden flex-shrink-0 border border-gray-200">
                                <img 
                                  src={airlineAndFlagInfo.flagIcon}
                                  alt={airlineAndFlagInfo.flagAlt}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <span className="font-medium text-gray-950 text-base">
                                {(() => {
                                  const title = destinationInfo.title;
                                  if (title.includes('กรีซ')) return 'กรีซ';
                                  if (title.includes('บาหลี')) return 'อินโดนีเซีย';
                                  if (title.includes('แคนาดา')) return 'แคนาดา';
                                  if (title.includes('สวิสเซอร์แลนด์')) return 'สวิสเซอร์แลนด์';
                                  if (title.includes('มัลดีฟส์')) return 'มัลดีฟส์';
                                  if (title.includes('ญี่ปุ่น')) return 'ญี่ปุ่น';
                                  if (title.includes('ไอซ์แลนด์')) return 'ไอซ์แลนด์';
                                  if (title.includes('นอร์เวย์')) return 'นอร์เวย์';
                                  if (title.includes('โลฟเทน')) return 'นอร์เวย์';
                                  if (title.includes('เยอรมนี')) return 'เยอรมนี';
                                  if (title.includes('นิวซีแลนด์')) return 'นิวซีแลนด์';
                                  if (title.includes('กัมพูชา')) return 'กัมพูชา';
                                  if (title.includes('ตุรกี')) return 'ตุรกี';
                                  if (title.includes('ออสเตรีย')) return 'ออสเตรีย';
                                  if (title.includes('ปราก')) return 'เช็ก';
                                  if (title.includes('ทัสคานี')) return 'อิตาลี';
                                  if (title.includes('โรม')) return 'อิตาลี';
                                  if (title.includes('ปารีส')) return 'ฝรั่งเศส';
                                  if (title.includes('เมดิเตอร์เรเนียน')) return 'กรีซ';
                                  return 'ไทย';
                                })()}
                              </span>
                              <div className="flex items-center gap-2 flex-wrap">
                                {(() => {
                                  const title = destinationInfo.title;
                                  let countries = [];
                                  if (title.includes('กรีซ')) countries = [
                                    { name: 'กรีซ', flag: '/icons/destinations/flag-icons-main/flags/4x3/gr.svg' },
                                    { name: 'อิตาลี', flag: '/icons/destinations/flag-icons-main/flags/4x3/it.svg' },
                                    { name: 'ตุรกี', flag: '/icons/destinations/flag-icons-main/flags/4x3/tr.svg' }
                                  ];
                                  else if (title.includes('บาหลี')) countries = [
                                    { name: 'อินโดนีเซีย', flag: '/icons/destinations/flag-icons-main/flags/4x3/id.svg' },
                                    { name: 'สิงคโปร์', flag: '/icons/destinations/flag-icons-main/flags/4x3/sg.svg' },
                                    { name: 'มาเลเซีย', flag: '/icons/destinations/flag-icons-main/flags/4x3/my.svg' }
                                  ];
                                  else if (title.includes('แคนาดา')) countries = [
                                    { name: 'แคนาดา', flag: '/icons/destinations/flag-icons-main/flags/4x3/ca.svg' },
                                    { name: 'อเมริกา', flag: '/icons/destinations/flag-icons-main/flags/4x3/us.svg' }
                                  ];
                                  else if (title.includes('สวิสเซอร์แลนด์')) countries = [
                                    { name: 'สวิสเซอร์แลนด์', flag: '/icons/destinations/flag-icons-main/flags/4x3/ch.svg' },
                                    { name: 'ออสเตรีย', flag: '/icons/destinations/flag-icons-main/flags/4x3/at.svg' }
                                  ];
                                  else if (title.includes('มัลดีฟส์')) countries = [
                                    { name: 'มัลดีฟส์', flag: '/icons/destinations/flag-icons-main/flags/4x3/mv.svg' },
                                    { name: 'ศรีลังกา', flag: '/icons/destinations/flag-icons-main/flags/4x3/lk.svg' }
                                  ];
                                  else if (title.includes('ญี่ปุ่น')) countries = [
                                    { name: 'ญี่ปุ่น', flag: '/icons/destinations/flag-icons-main/flags/4x3/jp.svg' },
                                    { name: 'เกาหลีใต้', flag: '/icons/destinations/flag-icons-main/flags/4x3/kr.svg' }
                                  ];
                                  else countries = [
                                    { name: 'อิตาลี', flag: '/icons/destinations/flag-icons-main/flags/4x3/it.svg' },
                                    { name: 'วาติกัน', flag: '/icons/destinations/flag-icons-main/flags/4x3/va.svg' },
                                    { name: 'ฝรั่งเศส', flag: '/icons/destinations/flag-icons-main/flags/4x3/fr.svg' }
                                  ];

                                  return countries.slice(1).map((country, index) => (
                                    <div key={index} className="flex items-center gap-1">
                                      <div className="w-4 h-4 rounded-full overflow-hidden flex-shrink-0 border border-gray-200">
                                        <img
                                          src={country.flag}
                                          alt={`${country.name} Flag`}
                                          className="w-full h-full object-cover"
                                        />
                                      </div>
                                      <span className="font-medium text-gray-950 text-base">{country.name}</span>
                                    </div>
                                  ));
                                })()}
                              </div>
                            </div>

                            {/* Second Row - 2 Columns Layout */}
                            <div className="flex items-start justify-between relative">
                              {/* Left Column - Travel Details */}
                              <div className="text-left space-y-2">
                                {/* Airline Row */}
                                <div className="flex items-center gap-2">
                                  <div className="w-4 h-4 rounded-full overflow-hidden flex-shrink-0 bg-white">
                                    <img 
                                      src={airlineAndFlagInfo.airlineLogo}
                                      alt={airlineAndFlagInfo.airlineAlt}
                                      className="w-full h-full object-contain"
                                    />
                                  </div>
                                  <p className="font-medium text-gray-950 text-sm drop-shadow-sm">
                                    {(() => {
                                      const title = destinationInfo.title;
                                      if (title.includes('กรีซ')) return 'Turkish Airlines';
                                      if (title.includes('บาหลี')) return 'Garuda Indonesia';
                                      if (title.includes('แคนาดา')) return 'Air Canada';
                                      if (title.includes('สวิสเซอร์แลนด์')) return 'Swiss International';
                                      if (title.includes('มัลดีฟส์')) return 'Emirates';
                                      if (title.includes('ญี่ปุ่น')) return 'ANA';
                                      if (title.includes('ไอซ์แลนด์')) return 'Icelandair';
                                      if (title.includes('นอร์เวย์')) return 'SAS';
                                      if (title.includes('โลฟเทน')) return 'Norwegian Air';
                                      if (title.includes('เยอรมนี')) return 'Lufthansa';
                                      if (title.includes('นิวซีแลนด์')) return 'Air New Zealand';
                                      if (title.includes('กัมพูชา')) return 'Cambodia Angkor Air';
                                      if (title.includes('ตุรกี')) return 'Turkish Airlines';
                                      if (title.includes('ออสเตรีย')) return 'Austrian Airlines';
                                      if (title.includes('ปราก')) return 'Czech Airlines';
                                      if (title.includes('ทัสคานี')) return 'Alitalia';
                                      if (title.includes('โรม')) return 'ITA Airways';
                                      if (title.includes('ปารีส')) return 'Air France';
                                      if (title.includes('เมดิเตอร์เรเนียน')) return 'Aegean Airlines';
                                      return 'Emirates';
                                    })()}
                                  </p>
                                </div>

                                {/* Duration Row */}
                                <div className="flex items-center gap-2">
                                  <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                                    <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                  </div>
                                  <p className="font-medium text-gray-950 text-sm drop-shadow-sm">
                                    {tour.duration_days} วัน {tour.nights} คืน
                                  </p>
                                </div>

                                {/* Travel Period Row */}
                                <div className="flex items-center gap-2">
                                  <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                    <Calendar className="w-2.5 h-2.5 text-white" />
                                  </div>
                                  <p className="font-medium text-gray-950 text-sm drop-shadow-sm">ก.ย. 68 - พ.ค. 69</p>
                                </div>
                              </div>

                              {/* Vertical divider */}
                              <div className="absolute left-1/2 top-0 bottom-0 w-px border-l border-dashed border-gray-300 transform -translate-x-1/2"></div>

                              {/* Right Column - Price Section */}
                              <div className="space-y-1 text-right">
                                {hasDiscount && (
                                  <div className="flex items-center gap-2 justify-end">
                                    <p className="text-xs text-gray-700 font-semibold drop-shadow-sm">ราคาเริ่มต้น</p>
                                    <span className="text-sm text-gray-800 line-through font-medium">฿{formatPrice(tour.pricing.original_price)}</span>
                                  </div>
                                )}
                                <div className="flex items-baseline gap-1 justify-end">
                                  <span className="text-lg font-black text-red-600 leading-none drop-shadow-sm">฿{formatPrice(tour.pricing.base_price)}</span>
                                </div>
                                {hasDiscount && (
                                  <p className="text-xs text-green-600 font-semibold relative">
                                    <span className="relative inline-block">
                                      🎉 ประหยัดถึง ฿{formatPrice(tour.pricing.original_price - tour.pricing.base_price)}
                                      {/* Fireworks Animation from 🎉 emoji */}
                                      <div className="absolute top-0 left-0 pointer-events-none">
                                        <div className="emoji-firework emoji-firework-1">
                                          <div className="emoji-spark emoji-spark-1"></div>
                                          <div className="emoji-spark emoji-spark-2"></div>
                                          <div className="emoji-spark emoji-spark-3"></div>
                                          <div className="emoji-spark emoji-spark-4"></div>
                                        </div>
                                      </div>
                                    </span>
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Destinations - Clean Style */}
                          <div className="px-3 py-1.5 mb-3">
                            <div className="flex items-center gap-2 text-sm">
                              <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                                <MapPin className="w-2.5 h-2.5 text-white" />
                              </div>
                              <span className="text-xs font-medium text-blue-700 tracking-wide">จุดหมายปลายทาง</span>
                            </div>
                            <p className="font-medium text-gray-900 text-sm mt-2 leading-relaxed">
                                    {(() => {
                                      // ใช้เมืองที่ตรงกับรูปภาพและธงชาติ
                                      const title = destinationInfo.title;
                                      
                                      if (title.includes('กรีซ')) return 'เอเธนส์・ซานโตรินี่・มิโคนอส・ครีท・โรดส์';
                                      if (title.includes('บาหลี')) return 'เดนปาซาร์・อูบุด・คูตา・ซานูร์・นูซาดัว';
                                      if (title.includes('แคนาดา')) return 'แวนคูเวอร์・ทอรอนโต้・มอนทรีออล・แคลกะรี่・ออตตาวา';
                                      if (title.includes('สวิสเซอร์แลนด์')) return 'ซูริค・เจนีวา・อินเตอร์ลาเก็น・แซร์แมท・เบิร์น';
                                      if (title.includes('มัลดีฟส์')) return 'มาเล่・บาอา・ฮุลุเล่・อารี・ฮัค อารู';
                                      if (title.includes('ญี่ปุ่น')) return 'โตเกียว・โอซาก้า・เกียวโต・นาโกย่า・ฮิโรชิมา';
                                      if (title.includes('ไอซ์แลนด์')) return 'เรคยาวิก・บลู ลากูน・โจกุลซาร์ลอน・ไอซาฟยอร์ด・อากูเรย์รี';
                                      if (title.includes('นอร์เวย์')) return 'ออสโล・เบอร์เก้น・ทรอนไฮม์・สตาวังเงอร์・ทรอมเซอ';
                                      if (title.includes('โลฟเทน')) return 'สวอลแวร์・เฮนนิ่งส์แวร์・อา・เรนา・โซเคล';
                                      if (title.includes('เยอรมนี')) return 'เบอร์ลิน・มิวนิค・ฟรานซ์ฟวร์ต・ฮัมบวร์ก・โคโลญ';
                                      if (title.includes('นิวซีแลนด์')) return 'โอ๊คแลนด์・เวลลิงตัน・ไครสต์เชิร์ช・ควีนส์ทาวน์・โรโตรัว';
                                      if (title.includes('กัมพูชา')) return 'เสียมราฐ・พนมเปญ・บัตดัมบัง・เกาะกง・กำปง ทม';
                                      if (title.includes('ตุรกี')) return 'อิสตันบูล・คัปปาโดเกีย・อังการา・อันตาลยา・ปามุกกาเล่';
                                      if (title.includes('ออสเตรีย')) return 'เวียนนา・ซาลส์บวร์ก・อินส์บรุค・กราซ・ลินซ์';
                                      if (title.includes('ปราก')) return 'ปราก・เชสกี้ ครุมลอฟ・บรโน่・โอโลมอุช・คาร์โลวี วารี';
                                      if (title.includes('ทัสคานี')) return 'ฟลอเรนซ์・ซีเอนา・ปิซา・ลุกกา・อาเรสโซ่';
                                      if (title.includes('โรม')) return 'โรม・เนเปิล・มิลาน・เวนิส・ฟลอเรนซ์';
                                      if (title.includes('ปารีส')) return 'ปารีส・ลียง・นีซ・มาร์เซย์・บอร์โด';
                                      if (title.includes('เมดิเตอร์เรเนียน')) return 'เอเธนส์・ซานโตรินี่・มิโคนอส・ครีท・โรดส์';
                                      
                                      // Fallback
                                      return 'หลายเมืองน่าเที่ยว • สถานที่สำคัญ • ประสบการณ์พิเศษ • ความทรงจำดี • การผจญภัย';
                                    })()}
                            </p>
                          </div>

                        </div>

                        {/* Premium Border Accent */}
                        <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent opacity-60"></div>
                        <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-60"></div>
                        
                      </div>

                    </div>
                  </div>
                  
                  {/* CTA Text Link - Simple and Clean */}
                  {/* Promotion link hidden */}
                  <div className="hidden text-center">
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
        
        @keyframes lightningFlash {
          0%, 90%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          5%, 10%, 15%, 20%, 25% {
            opacity: 0.3;
            transform: scale(1.1);
          }
          30%, 35%, 40% {
            opacity: 1;
            transform: scale(1.2);
          }
          45%, 50% {
            opacity: 0.8;
            transform: scale(0.95);
          }
        }
        
        .lightning-flash {
          animation: lightningFlash 3s infinite;
        }
        
        @keyframes starGlow {
          0%, 100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
            filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.3));
          }
          25% {
            opacity: 0.8;
            transform: scale(1.1) rotate(5deg);
            filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.5));
          }
          50% {
            opacity: 1;
            transform: scale(1.15) rotate(0deg);
            filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.7));
          }
          75% {
            opacity: 0.9;
            transform: scale(1.05) rotate(-5deg);
            filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.4));
          }
        }
        
        .star-glow {
          animation: starGlow 4s ease-in-out infinite;
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
        
        /* Emoji Fireworks Animation from tour-search-47 */
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
          width: 2px;
          height: 2px;
          background: #ffd700;
          border-radius: 50%;
          opacity: 0;
        }
        
        .emoji-firework-1 {
          animation: emoji-firework-explode 2s infinite;
        }
        
        .emoji-firework .emoji-spark-1 {
          animation: emoji-spark-fly-1 2s infinite;
        }
        .emoji-firework .emoji-spark-2 {
          animation: emoji-spark-fly-2 2s infinite;
        }
        .emoji-firework .emoji-spark-3 {
          animation: emoji-spark-fly-3 2s infinite;
        }
        .emoji-firework .emoji-spark-4 {
          animation: emoji-spark-fly-4 2s infinite;
        }
        
        @keyframes emoji-firework-explode {
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
        
        @keyframes emoji-spark-fly-1 {
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
            transform: translate(15px, -15px) scale(0.5);
          }
          100% {
            opacity: 0;
            transform: translate(20px, -10px) scale(0);
          }
        }
        
        @keyframes emoji-spark-fly-2 {
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
            transform: translate(10px, 15px) scale(0.5);
          }
          100% {
            opacity: 0;
            transform: translate(15px, 20px) scale(0);
          }
        }
        
        @keyframes emoji-spark-fly-3 {
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
            transform: translate(-15px, -10px) scale(0.5);
          }
          100% {
            opacity: 0;
            transform: translate(-20px, -15px) scale(0);
          }
        }
        
        @keyframes emoji-spark-fly-4 {
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
            transform: translate(-10px, 12px) scale(0.5);
          }
          100% {
            opacity: 0;
            transform: translate(-15px, 18px) scale(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ExactTourCard;