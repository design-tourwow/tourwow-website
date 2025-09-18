'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SearchIndexTour } from './types';
import { 
  Clock, MapPin, Star, Users, Heart, Calendar, ChevronDown, ChevronUp
} from 'lucide-react';

interface SlideRevealCardProps {
  tour: SearchIndexTour;
  isWishlisted?: boolean;
  onWishlistToggle?: (tourId: string) => void;
  onQuickBook?: (tour: SearchIndexTour) => void;
}

// Slide Reveal Card - เลื่อนเปิดข้อมูลแบบ Accordion
const SlideRevealCard: React.FC<SlideRevealCardProps> = ({ 
  tour, 
  isWishlisted = false, 
  onWishlistToggle, 
  onQuickBook 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const formatPrice = (price: number) => price.toLocaleString('th-TH');
  const hasDiscount = tour.pricing.discount_percentage && tour.pricing.discount_percentage > 0;

  // Generate unique image for each tour
  const getUniqueImage = () => {
    const tourIdHash = tour.metadata.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const images = [
      "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=1200&q=95",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=95",
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=95",
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=95",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=95",
      "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=1200&q=95",
      "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=1200&q=95",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=95"
    ];
    return images[tourIdHash % images.length];
  };

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

  const handleToggle = () => {
    setIsAnimating(true);
    setIsExpanded(!isExpanded);
    setTimeout(() => setIsAnimating(false), 600);
  };

  return (
    <div className="relative mb-6">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
        
        {/* Pre-Program View - Always Visible */}
        <div className="relative">
          <div className="relative h-80 md:h-96 overflow-hidden">
            <img
              src={getUniqueImage()}
              alt={tour.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* Gradient Overlay - Darker */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
            
            {/* Top Badges */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
              {hasDiscount && (
                <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full font-bold animate-pulse">
                  ลด {tour.pricing.discount_percentage}%
                </span>
              )}
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onWishlistToggle?.(tour.metadata.id);
                }}
                className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-all ml-auto flex items-center justify-center"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
              </button>
            </div>
            
            {/* Bottom Content */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              {/* Title and Highlight always visible */}
              <h3 className="text-white text-2xl font-bold mb-2">
                {tour.title}
              </h3>
              
              {/* Short Highlight */}
              <p className="text-white/90 text-sm mb-3">
                บินตรง • โรงแรม 4-5 ดาว • มื้ออาหารครบ • ไกด์ท้องถิ่น
              </p>
              
              {/* Price - show only when collapsed */}
              {!isExpanded && (
                <div className="mb-3">
                  <span className="text-white text-2xl font-bold">
                    ฿{formatPrice(tour.pricing.base_price)}
                  </span>
                  {tour.pricing.original_price && tour.pricing.original_price > tour.pricing.base_price && (
                    <span className="text-white/70 text-sm line-through ml-2">
                      ฿{formatPrice(tour.pricing.original_price)}
                    </span>
                  )}
                </div>
              )}
              
              {/* Text Link Toggle - Bottom of Banner */}
              <div className="flex justify-center">
                <button
                  onClick={handleToggle}
                  className="text-white flex items-center gap-1"
                >
                  <span className="text-sm font-medium underline underline-offset-2">
                    {isExpanded ? 'ซ่อนข้อมูล' : 'คลิกเพื่อดูโปรโมชั่น'}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4 animate-bounce" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Full Program View - Slide Down (Details only, no duplicate image) */}
        <div 
          className={`
            overflow-hidden transition-all duration-500 ease-in-out
            ${isExpanded ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}
          `}
        >
          <div className="bg-white border-t border-gray-100">
            {/* Content Section */}
            <div className="p-4 pt-5">
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

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes progress-bar {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
        
        .animate-progress-bar {
          animation: progress-bar 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default SlideRevealCard;