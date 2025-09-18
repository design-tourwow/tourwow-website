'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

// Shared types and interfaces
interface TourData {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  duration: string;
  image: string;
  highlights: string[];
  travelDates: string;
  location: string;
}

const sampleTour: TourData = {
  id: '196',
  title: 'ไต้หวัน 4 วัน 3 คืน ไทเป-พิเศษ 1',
  description: 'สำรวจปลายทางใหม่อันงดงาม เที่ยวสุดคุ้มกับโปรแกรมคุณภาพ มีไกด์ท้องถิ่นคอยดูแล พักโรงแรมมาตรฐาน รับประทานอาหารท้องถิ่นรสชาติดี พร้อมประสบการณ์ท่องเที่ยวที่ไม่ลืม',
  price: 24900,
  originalPrice: 29900,
  discount: 14,
  rating: 4.5,
  reviews: 72,
  duration: '4วัน3คืน',
  image: 'https://images.unsplash.com/photo-1470004914212-05527e49370b?w=400&h=300&fit=crop',
  highlights: ['ตึกไทเป 101', 'อาลีซาน', 'ทะเลสาบสุริยัน'],
  travelDates: '31 ส.ค. 68 - 7 ก.ย. 68',
  location: 'ไต้หวัน'
};

// Utility hook for auto-expand with progress
const useAutoExpand = (threshold = 3000, enabled = true) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>();
  const progressRef = useRef<NodeJS.Timeout>();
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled || !elementRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            setIsInView(true);
            
            // Start progress animation
            let currentProgress = 0;
            const increment = 100 / (threshold / 100);
            
            progressRef.current = setInterval(() => {
              currentProgress += increment;
              setProgress(Math.min(currentProgress, 100));
              
              if (currentProgress >= 100) {
                clearInterval(progressRef.current);
              }
            }, 100);

            // Auto expand after threshold
            timerRef.current = setTimeout(() => {
              setIsExpanded(true);
              setProgress(100);
            }, threshold);
          } else {
            setIsInView(false);
            setProgress(0);
            
            // Clear timers
            if (timerRef.current) clearTimeout(timerRef.current);
            if (progressRef.current) clearInterval(progressRef.current);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(elementRef.current);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
      observer.disconnect();
    };
  }, [threshold, enabled]);

  const toggleExpand = useCallback(() => {
    setIsExpanded(!isExpanded);
    setProgress(0);
    if (timerRef.current) clearTimeout(timerRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
  }, [isExpanded]);

  return { isExpanded, progress, isInView, elementRef, toggleExpand, setIsExpanded };
};

// Prototype 1: Minimal Card with Slide Expand
const Prototype1 = ({ tour }: { tour: TourData }) => {
  const { isExpanded, progress, elementRef, toggleExpand } = useAutoExpand();

  return (
    <div ref={elementRef} className="relative mb-6">
      {/* Enhanced Progress indicator */}
      {progress > 0 && progress < 100 && (
        <div className="absolute -inset-0.5 rounded-2xl z-10 pointer-events-none">
          {/* Outer glow ring */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/30 to-purple-500/30 animate-pulse" />
          
          {/* Progress track */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-200 to-gray-300 rounded-t-2xl overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 relative"
              style={{
                width: `${progress}%`,
                transition: 'width 0.1s ease-out'
              }}
            >
              {/* Moving shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse" 
                   style={{
                     animation: 'shimmer 2s linear infinite'
                   }} />
            </div>
          </div>
          
          {/* Corner progress indicators */}
          <div className="absolute top-2 right-2">
            <div className="relative w-8 h-8">
              <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 32 32">
                <circle
                  cx="16"
                  cy="16"
                  r="12"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  opacity="0.3"
                />
                <circle
                  cx="16"
                  cy="16"
                  r="12"
                  fill="none"
                  stroke="url(#progressGradient)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 12}`}
                  strokeDashoffset={`${2 * Math.PI * 12 * (1 - progress / 100)}`}
                  style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
                />
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="50%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#EC4899" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[10px] font-bold text-white bg-black/50 rounded-full w-5 h-5 flex items-center justify-center">
                  {Math.round(progress)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div 
        className={`
          bg-white rounded-xl border transition-all duration-500 ease-out
          ${isExpanded ? 'shadow-2xl border-blue-500/50' : 'shadow-md border-gray-200 hover:shadow-lg'}
        `}
      >
        {/* Compact View - Always Visible */}
        <div 
          className="flex items-center p-3 md:p-4 cursor-pointer"
          onClick={toggleExpand}
        >
          {/* Image */}
          <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-lg overflow-hidden">
            <Image
              src={tour.image}
              alt={tour.title}
              fill
              className="object-cover"
            />
            {tour.discount > 0 && (
              <span className="absolute top-1 left-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                -{tour.discount}%
              </span>
            )}
          </div>

          {/* Basic Info */}
          <div className="flex-1 ml-3 md:ml-4">
            <h3 className="font-semibold text-sm md:text-base line-clamp-1 mb-1">
              {tour.title}
            </h3>
            
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center">
                <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                </svg>
                <span className="text-xs ml-1 font-medium">{tour.rating}</span>
              </div>
              <span className="text-xs text-gray-500">({tour.reviews})</span>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                {tour.duration}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                {tour.originalPrice > tour.price && (
                  <span className="text-xs text-gray-400 line-through mr-2">
                    ฿{tour.originalPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-lg md:text-xl font-bold text-blue-600">
                  ฿{tour.price.toLocaleString()}
                </span>
              </div>
              
              <button
                className={`
                  p-2 rounded-lg transition-all duration-300
                  ${isExpanded ? 'rotate-180 bg-blue-100' : 'bg-gray-100'}
                `}
                aria-label={isExpanded ? 'ซ่อนรายละเอียด' : 'ดูรายละเอียด'}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Expanded Content */}
        <div
          className={`
            transition-all duration-500 ease-out overflow-hidden
            ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
          `}
        >
          <div className="px-3 pb-3 md:px-4 md:pb-4 border-t border-gray-100">
            <p className="text-sm text-gray-600 mt-3 mb-3 leading-relaxed">
              {tour.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {tour.highlights.map((highlight, idx) => (
                <span key={idx} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-lg">
                  {highlight}
                </span>
              ))}
            </div>

            <div className="flex items-center text-sm text-gray-600 mb-4">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {tour.travelDates}
            </div>

            <div className="flex gap-2">
              <button className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg font-medium text-sm hover:from-blue-600 hover:to-blue-700 transition-all">
                จองทันที
              </button>
              <button className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg font-medium text-sm hover:bg-blue-50 transition-all">
                ดูเพิ่มเติม
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Prototype 2: Card with Side Progress Ring
const Prototype2 = ({ tour }: { tour: TourData }) => {
  const { isExpanded, progress, elementRef, toggleExpand } = useAutoExpand();

  return (
    <div ref={elementRef} className="relative mb-6">
      <div 
        className={`
          bg-white rounded-xl transition-all duration-500 
          ${isExpanded ? 'shadow-2xl ring-2 ring-blue-500/30' : 'shadow-md hover:shadow-lg'}
        `}
      >
        <div className="relative">
          {/* Compact Card */}
          <div 
            className={`
              transition-all duration-500 cursor-pointer
              ${isExpanded ? '' : 'hover:bg-gray-50/50'}
            `}
            onClick={toggleExpand}
          >
            <div className="flex p-3 md:p-4">
              {/* Enhanced Progress Ring */}
              {progress > 0 && progress < 100 && (
                <div className="absolute right-2 top-2 md:right-3 md:top-3">
                  <div className="relative">
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full animate-pulse" />
                    
                    <svg className="w-10 h-10 -rotate-90 relative z-10">
                      <circle
                        cx="20"
                        cy="20"
                        r="18"
                        stroke="white"
                        strokeWidth="3"
                        fill="none"
                        opacity="0.2"
                      />
                      <circle
                        cx="20"
                        cy="20"
                        r="18"
                        stroke="url(#ringGradient)"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 18}`}
                        strokeDashoffset={`${2 * Math.PI * 18 * (1 - progress / 100)}`}
                        className="transition-all duration-100"
                      />
                      <defs>
                        <linearGradient id="ringGradient">
                          <stop offset="0%" stopColor="#3B82F6" />
                          <stop offset="50%" stopColor="#8B5CF6" />
                          <stop offset="100%" stopColor="#EC4899" />
                        </linearGradient>
                      </defs>
                    </svg>
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/90 backdrop-blur rounded-full w-6 h-6 flex items-center justify-center shadow-sm">
                        <span className="text-[10px] font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          {Math.round(progress)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Content Layout */}
              <div className="flex flex-col md:flex-row w-full gap-3 md:gap-4">
                {/* Image */}
                <div className="relative w-full md:w-40 h-28 md:h-32 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={tour.image}
                    alt={tour.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                    ลด {tour.discount}%
                  </div>
                  <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                    {tour.duration}
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h3 className="font-bold text-base md:text-lg mb-2 line-clamp-2">
                    {tour.title}
                  </h3>
                  
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center bg-yellow-50 px-2 py-1 rounded">
                      <svg className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                      <span className="text-sm font-semibold ml-1">{tour.rating}</span>
                      <span className="text-xs text-gray-600 ml-1">({tour.reviews})</span>
                    </div>
                    
                    <div className="hidden md:flex flex-wrap gap-1">
                      {tour.highlights.slice(0, 2).map((h, i) => (
                        <span key={i} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-end justify-between">
                    <div>
                      <span className="text-sm text-gray-400 line-through block">
                        ฿{tour.originalPrice.toLocaleString()}
                      </span>
                      <span className="text-xl md:text-2xl font-bold text-blue-600">
                        ฿{tour.price.toLocaleString()}
                      </span>
                      <span className="text-xs text-gray-500 ml-1">/ คน</span>
                    </div>

                    <button
                      className={`
                        flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium text-sm transition-all
                        ${isExpanded 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }
                      `}
                    >
                      <span className="hidden md:inline">
                        {isExpanded ? 'ซ่อน' : 'ดูเพิ่ม'}
                      </span>
                      <svg 
                        className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Expanded Details */}
          {isExpanded && (
            <div className="border-t border-gray-100 p-3 md:p-4 animate-fadeIn">
              <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                {tour.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                <div className="flex items-center text-sm">
                  <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-700">{tour.location}</span>
                </div>
                <div className="flex items-center text-sm">
                  <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-700">{tour.travelDates}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {tour.highlights.map((highlight, idx) => (
                  <span key={idx} className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 text-xs px-3 py-1.5 rounded-full border border-blue-200">
                    {highlight}
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <button className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2.5 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-md">
                  <span className="flex items-center justify-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    จองด่วน
                  </span>
                </button>
                <button className="px-6 py-2.5 border-2 border-blue-500 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all">
                  รายละเอียด
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Prototype 3: Horizontal Timeline Progress
const Prototype3 = ({ tour }: { tour: TourData }) => {
  const { isExpanded, progress, elementRef, toggleExpand } = useAutoExpand();

  return (
    <div ref={elementRef} className="mb-6">
      <div className={`
        relative bg-white rounded-2xl overflow-hidden transition-all duration-500
        ${isExpanded ? 'shadow-2xl' : 'shadow-lg hover:shadow-xl'}
      `}>
        {/* Enhanced Progress Bar at Top */}
        {progress > 0 && progress < 100 && (
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-gray-100 to-gray-200 z-20 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 relative shadow-sm transition-all duration-150 ease-out"
              style={{ width: `${progress}%` }}
            >
              {/* Animated shimmer overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse opacity-60" />
              
              {/* Progress indicator dot */}
              <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md border-2 border-teal-400">
                <div className="absolute inset-0.5 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full animate-pulse" />
              </div>
            </div>
            
            {/* Loading text indicator */}
            <div className="absolute right-2 -bottom-6 text-xs text-teal-600 font-medium bg-white/80 backdrop-blur px-2 py-0.5 rounded-full shadow-sm">
              กำลังโหลด... {Math.round(progress)}%
            </div>
          </div>
        )}

        {/* Compact View */}
        <div 
          className="flex items-center p-4 cursor-pointer"
          onClick={toggleExpand}
        >
          <div className="flex-1 flex items-center gap-4">
            {/* Thumbnail */}
            <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden flex-shrink-0">
              <Image
                src={tour.image}
                alt={tour.title}
                fill
                className="object-cover"
              />
              {tour.discount > 0 && (
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/80 to-transparent flex items-start justify-start p-1">
                  <span className="text-white text-xs font-bold">-{tour.discount}%</span>
                </div>
              )}
            </div>

            {/* Quick Info */}
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-sm md:text-base text-gray-900 truncate">
                {tour.title}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="inline-flex items-center text-xs">
                  <svg className="w-3 h-3 text-yellow-400 fill-current mr-0.5" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                  {tour.rating}
                </span>
                <span className="text-xs text-gray-500">•</span>
                <span className="text-xs text-gray-600">{tour.duration}</span>
                <span className="text-xs text-gray-500">•</span>
                <span className="text-xs text-blue-600 font-semibold">
                  ฿{tour.price.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Expand Indicator */}
            <div className="flex items-center gap-2">
              {progress > 0 && progress < 100 && (
                <div className="text-xs text-gray-500 hidden md:block">
                  กำลังโหลด...
                </div>
              )}
              <div className={`
                p-2 rounded-full transition-all duration-300
                ${isExpanded ? 'bg-blue-100 rotate-180' : 'bg-gray-100'}
              `}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Expanded Content with Animation */}
        <div className={`
          grid transition-all duration-500 ease-out
          ${isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}
        `}>
          <div className="overflow-hidden">
            <div className="px-4 pb-4 border-t border-gray-100">
              <div className="pt-3">
                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  {tour.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-3">
                  {tour.highlights.map((h, i) => (
                    <span 
                      key={i} 
                      className="bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 text-xs px-2 py-1 rounded-lg border border-blue-200/50"
                      style={{
                        animation: `fadeInUp 0.3s ease-out ${i * 0.1}s both`
                      }}
                    >
                      {h}
                    </span>
                  ))}
                </div>

                <div className="text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {tour.travelDates}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-lg font-medium text-sm hover:from-orange-600 hover:to-red-600 transition-all">
                    จองทันที
                  </button>
                  <button className="border border-gray-300 text-gray-700 py-2 rounded-lg font-medium text-sm hover:bg-gray-50 transition-all">
                    ดูรายละเอียด
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
};

// Prototype 4: Focus Card with Blur Background
const Prototype4 = ({ tour }: { tour: TourData }) => {
  const { isExpanded, progress, elementRef, toggleExpand } = useAutoExpand();

  return (
    <>
      {/* Blur Overlay */}
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black/10 backdrop-blur-sm z-10 animate-fadeIn"
          onClick={toggleExpand}
        />
      )}

      <div 
        ref={elementRef} 
        className={`
          relative mb-6 transition-all duration-500
          ${isExpanded ? 'z-10' : 'z-0'}
        `}
      >
        <div className={`
          bg-white rounded-xl overflow-hidden transition-all duration-500
          ${isExpanded 
            ? 'shadow-3xl scale-105 md:scale-110' 
            : 'shadow-md hover:shadow-xl'
          }
        `}>
          {/* Circular Progress */}
          {progress > 0 && progress < 100 && (
            <div className="absolute -top-2 -right-2 z-10">
              <div className="relative w-12 h-12">
                <svg className="w-12 h-12 transform -rotate-90">
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    stroke="white"
                    strokeWidth="4"
                    fill="none"
                  />
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    stroke="url(#gradient)"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 20}`}
                    strokeDashoffset={`${2 * Math.PI * 20 * (1 - progress / 100)}`}
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="gradient">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#8B5CF6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                    <span className="text-xs font-bold text-blue-600">{Math.round(progress)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Card Content */}
          <div className="cursor-pointer" onClick={toggleExpand}>
            {/* Compact Layout */}
            <div className={`flex p-3 md:p-4 ${isExpanded ? 'border-b border-gray-100' : ''}`}>
              <div className="relative w-28 md:w-32 h-24 md:h-28 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={tour.image}
                  alt={tour.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-2 left-2 right-2">
                  <div className="flex items-center justify-between">
                    <span className="bg-white/90 backdrop-blur text-xs px-1.5 py-0.5 rounded font-semibold">
                      {tour.duration}
                    </span>
                    {tour.discount > 0 && (
                      <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded font-semibold">
                        -{tour.discount}%
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex-1 ml-3 md:ml-4 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-sm md:text-base line-clamp-1 mb-1">
                    {tour.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs mb-2">
                    <div className="flex items-center">
                      <svg className="w-3.5 h-3.5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                      <span className="ml-1 font-medium">{tour.rating}</span>
                    </div>
                    <span className="text-gray-500">• {tour.reviews} รีวิว</span>
                  </div>
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    {tour.originalPrice > tour.price && (
                      <span className="text-xs text-gray-400 line-through">
                        ฿{tour.originalPrice.toLocaleString()}
                      </span>
                    )}
                    <div className="text-lg md:text-xl font-bold text-blue-600">
                      ฿{tour.price.toLocaleString()}
                    </div>
                  </div>
                  <div className={`
                    p-1.5 rounded-lg transition-all duration-300
                    ${isExpanded ? 'bg-blue-100 rotate-180' : 'bg-gray-100'}
                  `}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Expanded Content */}
            {isExpanded && (
              <div className="p-3 md:p-4 animate-slideDown">
                <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                  {tour.description}
                </p>

                <div className="grid grid-cols-3 gap-2 mb-3">
                  {tour.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="bg-gradient-to-br from-blue-50 to-purple-50 p-2 rounded-lg border border-blue-200/30"
                    >
                      <div className="text-xs font-medium text-blue-700 text-center">
                        {h}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 mb-4 p-2 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {tour.travelDates}
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    การันตีคุณภาพ
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2.5 rounded-lg font-medium text-sm hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg">
                    จองเลย
                  </button>
                  <button className="flex-1 border-2 border-gray-300 text-gray-700 py-2.5 rounded-lg font-medium text-sm hover:border-gray-400 hover:bg-gray-50 transition-all">
                    ดูเพิ่มเติม
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            max-height: 0;
          }
          to {
            opacity: 1;
            max-height: 500px;
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideDown {
          animation: slideDown 0.5s ease-out;
        }
      `}</style>
    </>
  );
};

// Prototype 5: Minimal Modern with Pulse Effect
const Prototype5 = ({ tour }: { tour: TourData }) => {
  const { isExpanded, progress, isInView, elementRef, toggleExpand } = useAutoExpand();

  return (
    <div ref={elementRef} className="mb-6">
      <div className={`
        relative bg-white rounded-2xl transition-all duration-500
        ${isExpanded ? 'shadow-2xl' : 'shadow-md hover:shadow-lg'}
      `}>
        {/* Pulse Effect when counting */}
        {isInView && progress > 0 && progress < 100 && (
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-30 animate-pulse" />
        )}

        {/* Enhanced Progress Line */}
        {progress > 0 && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-100 to-gray-200 rounded-t-2xl overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 relative transition-all duration-150 ease-out"
              style={{ width: `${progress}%` }}
            >
              {/* Flowing animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
              
              {/* Progress head indicator */}
              <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full shadow-lg border border-purple-300">
                <div className="absolute inset-0.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="relative bg-white rounded-2xl overflow-hidden">
          {/* Compact View */}
          <div 
            className={`p-4 cursor-pointer transition-all duration-300 ${!isExpanded ? 'hover:bg-gray-50/50' : ''}`}
            onClick={toggleExpand}
          >
            <div className="flex gap-4">
              {/* Left: Image + Badge */}
              <div className="relative">
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-xl overflow-hidden">
                  <Image
                    src={tour.image}
                    alt={tour.title}
                    fill
                    className="object-cover"
                  />
                </div>
                {tour.discount > 0 && (
                  <div className="absolute -top-2 -right-2 bg-gradient-to-br from-red-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-lg">
                    -{tour.discount}%
                  </div>
                )}
                {progress > 0 && progress < 100 && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-1 shadow-lg">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{Math.round(progress)}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Right: Info */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-bold text-gray-900 text-sm md:text-base line-clamp-1 flex-1">
                      {tour.title}
                    </h3>
                    <button
                      className={`
                        ml-2 p-1 rounded-lg transition-all duration-300
                        ${isExpanded ? 'rotate-180 bg-purple-100' : 'bg-gray-100'}
                      `}
                      aria-label="Toggle details"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>

                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i}
                          className={`w-3 h-3 ${i < Math.floor(tour.rating) ? 'text-yellow-400' : 'text-gray-200'} fill-current`} 
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                        </svg>
                      ))}
                      <span className="ml-1 text-xs font-medium">{tour.rating}</span>
                    </div>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-600">{tour.duration}</span>
                  </div>
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      {tour.originalPrice > tour.price && (
                        <span className="text-sm text-gray-400 line-through">
                          ฿{tour.originalPrice.toLocaleString()}
                        </span>
                      )}
                      <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        ฿{tour.price.toLocaleString()}
                      </span>
                    </div>
                    <span className="text-xs text-green-600 font-medium">
                      ประหยัด ฿{(tour.originalPrice - tour.price).toLocaleString()}
                    </span>
                  </div>

                  {!isExpanded && (
                    <button className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-medium rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all">
                      จองด่วน
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Expanded Content */}
          <div className={`
            overflow-hidden transition-all duration-500 ease-out
            ${isExpanded ? 'max-h-96' : 'max-h-0'}
          `}>
            <div className="px-4 pb-4 border-t border-gray-100">
              <p className="text-sm text-gray-600 mt-3 mb-3 leading-relaxed">
                {tour.description}
              </p>

              {/* Highlights Grid */}
              <div className="grid grid-cols-3 gap-2 mb-3">
                {tour.highlights.map((h, i) => (
                  <div
                    key={i}
                    className="relative overflow-hidden rounded-lg bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-2 border border-purple-200/30"
                    style={{
                      animation: isExpanded ? `slideIn 0.5s ease-out ${i * 0.1}s both` : ''
                    }}
                  >
                    <div className="text-xs font-medium text-center text-gray-700">
                      {h}
                    </div>
                  </div>
                ))}
              </div>

              {/* Date & Location */}
              <div className="flex items-center justify-between text-xs text-gray-600 mb-4 p-2.5 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{tour.travelDates}</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{tour.location}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button className="relative overflow-hidden group bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2.5 rounded-xl font-medium text-sm transition-all hover:shadow-lg">
                  <span className="relative z-10 flex items-center justify-center">
                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    จองทันที
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </button>
                <button className="group border-2 border-gradient-to-r from-blue-500 to-purple-500 text-gray-700 py-2.5 rounded-xl font-medium text-sm hover:text-white transition-all relative overflow-hidden">
                  <span className="relative z-10">ดูรายละเอียด</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

// Prototype 6: 3D Flip Card (Pre-Program to Full Version)
const Prototype6 = ({ tour }: { tour: TourData }) => {
  const { isExpanded, progress, isInView, elementRef, toggleExpand } = useAutoExpand();

  return (
    <div ref={elementRef} className="mb-6">
      {/* 3D Flip Container */}
      <div className={`
        relative w-full h-auto perspective-1000
        ${isExpanded ? 'z-10' : ''}
      `}>
        <div className={`
          relative w-full transition-all duration-700 preserve-3d
          ${isExpanded ? 'rotate-y-180' : ''}
        `}>
          
          {/* Front Face - Pre-Program (Compact View) */}
          <div className={`
            relative w-full backface-hidden
            ${isExpanded ? 'rotate-y-180' : ''}
          `}>
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              {/* Enhanced progress indicator for flip countdown */}
              {progress > 0 && progress < 100 && (
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 z-20 overflow-hidden rounded-t-2xl">
                  <div className="relative h-full bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-400 transition-all duration-150 ease-out shadow-sm"
                       style={{ width: `${progress}%` }}>
                    
                    {/* Animated wave effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-pulse opacity-70" />
                    
                    {/* Flip indicator dot */}
                    <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg border-2 border-teal-400 flex items-center justify-center">
                      <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full animate-pulse" />
                    </div>
                    
                    {/* Flip countdown text */}
                    <div className="absolute right-6 -bottom-7 text-xs text-teal-600 font-semibold bg-white/90 backdrop-blur px-2.5 py-1 rounded-full shadow-sm border border-teal-200/50">
                      <div className="flex items-center gap-1">
                        <svg className="w-3 h-3 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        <span>Flip {Math.round(progress)}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Card Click Area */}
              <div className="cursor-pointer" onClick={toggleExpand}>
                <div className="flex p-4 gap-4">
                  {/* Image with Flip Icon */}
                  <div className="relative">
                    <div className="w-24 h-24 md:w-28 md:h-28 rounded-xl overflow-hidden">
                      <Image
                        src={tour.image}
                        alt={tour.title}
                        fill
                        className="object-cover"
                      />
                      
                      {/* Floating Flip Indicator */}
                      {progress > 0 && progress < 100 && (
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <div className="bg-white/90 backdrop-blur p-2 rounded-full shadow-lg">
                            <svg className="w-5 h-5 text-teal-600 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {tour.discount > 0 && (
                      <div className="absolute -top-2 -right-2 bg-gradient-to-br from-rose-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-lg">
                        -{tour.discount}%
                      </div>
                    )}
                    
                    {/* Status Badge */}
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs px-2 py-0.5 rounded-full font-medium shadow-lg">
                      Pre-Program
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-bold text-gray-900 text-sm md:text-base line-clamp-2 flex-1">
                          {tour.title}
                        </h3>
                        <div className="ml-2 p-1 bg-gray-100 rounded-lg">
                          <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg 
                              key={i}
                              className={`w-3 h-3 ${i < Math.floor(tour.rating) ? 'text-yellow-400' : 'text-gray-200'} fill-current`} 
                              viewBox="0 0 20 20"
                            >
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                            </svg>
                          ))}
                          <span className="ml-1 text-xs font-medium">{tour.rating}</span>
                        </div>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full font-medium">
                          {tour.duration}
                        </span>
                      </div>

                      <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-2">
                        {tour.description}
                      </p>
                    </div>

                    <div className="flex items-end justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          {tour.originalPrice > tour.price && (
                            <span className="text-sm text-gray-400 line-through">
                              ฿{tour.originalPrice.toLocaleString()}
                            </span>
                          )}
                          <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                            ฿{tour.price.toLocaleString()}
                          </span>
                        </div>
                        <span className="text-xs text-emerald-600 font-medium">
                          พิเศษ! ประหยัด ฿{(tour.originalPrice - tour.price).toLocaleString()}
                        </span>
                      </div>

                      <div className="text-right">
                        <div className="text-xs text-gray-500 mb-1">คลิกเพื่อดู Full Version</div>
                        <div className="flex items-center gap-1 text-teal-600">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          <span className="text-xs font-medium">Flip</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Back Face - Full Version (Expanded View) */}
          <div className={`
            absolute inset-0 w-full backface-hidden rotate-y-180
            ${isExpanded ? '' : 'rotate-y-0'}
          `}>
            <div className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl shadow-2xl border-2 border-teal-200/50 overflow-hidden">
              {/* Full Version Header */}
              <div className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-semibold text-sm">Full Version</span>
                  </div>
                  <button 
                    onClick={toggleExpand}
                    className="p-1 bg-white/20 rounded-lg hover:bg-white/30 transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Full Content */}
              <div className="p-4">
                <div className="flex gap-4 mb-4">
                  {/* Enhanced Image */}
                  <div className="relative w-32 h-32 rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={tour.image}
                      alt={tour.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2">
                      <div className="flex items-center justify-between">
                        <span className="bg-white/90 backdrop-blur text-xs px-2 py-0.5 rounded-full font-semibold">
                          {tour.duration}
                        </span>
                        <div className="bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                          -{tour.discount}%
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Info */}
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2">
                      {tour.title}
                    </h3>
                    
                    <div className="flex items-center gap-4 mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(tour.rating) ? 'text-yellow-400' : 'text-gray-300'} fill-current`} 
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                          </svg>
                        ))}
                        <span className="ml-2 text-sm font-semibold">{tour.rating}</span>
                        <span className="text-sm text-gray-500 ml-1">({tour.reviews} รีวิว)</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 mb-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-1 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {tour.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-1 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {tour.travelDates}
                      </div>
                    </div>

                    {/* Price Section */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg text-gray-400 line-through">
                            ฿{tour.originalPrice.toLocaleString()}
                          </span>
                          <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                            ฿{tour.price.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
                            ประหยัด ฿{(tour.originalPrice - tour.price).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {tour.description}
                </p>

                {/* Highlights */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {tour.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="bg-gradient-to-br from-teal-50 to-emerald-50 p-2.5 rounded-lg border border-teal-200/50 text-center"
                      style={{
                        animation: `highlightFadeIn 0.6s ease-out ${i * 0.2}s both`
                      }}
                    >
                      <div className="text-xs font-medium text-teal-700">{h}</div>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <button className="relative overflow-hidden group bg-gradient-to-r from-teal-500 to-emerald-500 text-white py-3 rounded-xl font-semibold text-sm transition-all hover:shadow-lg">
                    <span className="relative z-10 flex items-center justify-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      จองเลยวันนี้
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </button>
                  <button className="group border-2 border-teal-300 text-teal-700 py-3 rounded-xl font-semibold text-sm hover:bg-teal-50 transition-all relative overflow-hidden">
                    <span className="relative z-10 flex items-center justify-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      ดูรายละเอียด
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .preserve-3d {
          transform-style: preserve-3d;
        }
        
        .backface-hidden {
          backface-visibility: hidden;
        }
        
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        
        @keyframes highlightFadeIn {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

// Main Component to Display All Prototypes
export default function CompactCardPrototypes() {
  const [selectedPrototype, setSelectedPrototype] = useState(1);

  const prototypes = [
    { id: 1, name: 'Minimal Slide', component: Prototype1 },
    { id: 2, name: 'Progress Ring', component: Prototype2 },
    { id: 3, name: 'Timeline Bar', component: Prototype3 },
    { id: 4, name: 'Focus Blur', component: Prototype4 },
    { id: 5, name: 'Modern Pulse', component: Prototype5 },
    { id: 6, name: '3D Flip Card', component: Prototype6 }
  ];

  const SelectedComponent = prototypes.find(p => p.id === selectedPrototype)?.component || Prototype1;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Compact Card Prototypes
          </h1>
          <p className="text-gray-600">
            Mobile-first design with 3-second auto-expand feature
          </p>
        </div>

        {/* Prototype Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {prototypes.map((proto) => (
            <button
              key={proto.id}
              onClick={() => setSelectedPrototype(proto.id)}
              className={`
                px-4 py-2 rounded-lg font-medium text-sm transition-all
                ${selectedPrototype === proto.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:shadow'
                }
              `}
            >
              {proto.name}
            </button>
          ))}
        </div>

        {/* Selected Prototype */}
        <div className="mb-8">
          <SelectedComponent tour={sampleTour} />
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-xl p-4 md:p-6 shadow-md">
          <h2 className="font-semibold text-lg mb-3">Features:</h2>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Auto-expands after 3 seconds when 50% visible in viewport</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Visual progress indicator while counting down</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Manual toggle by clicking card or expand button</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Mobile-first responsive design</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Smooth animations and transitions</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}