'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SearchIndexTour } from './types';
import { 
  Clock, MapPin, Star, Users, Heart, Calendar, ArrowRight, Sparkles
} from 'lucide-react';

interface MorphTransformCardProps {
  tour: SearchIndexTour;
  isWishlisted?: boolean;
  onWishlistToggle?: (tourId: string) => void;
  onQuickBook?: (tour: SearchIndexTour) => void;
}

// Morph Transform Card - การ์ดแปลงร่าง
const MorphTransformCard: React.FC<MorphTransformCardProps> = ({ 
  tour, 
  isWishlisted = false, 
  onWishlistToggle, 
  onQuickBook 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMorphing, setIsMorphing] = useState(false);
  
  const formatPrice = (price: number) => price.toLocaleString('th-TH');
  const hasDiscount = tour.pricing.discount_percentage && tour.pricing.discount_percentage > 0;

  const getUniqueImage = () => {
    const tourIdHash = tour.metadata.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const images = [
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1200&q=95",
      "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=1200&q=95",
      "https://images.unsplash.com/photo-1549144511-f099e773c147?w=1200&q=95",
      "https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=1200&q=95",
      "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=1200&q=95",
      "https://images.unsplash.com/photo-1495344517868-8ebaf0a2044a?w=1200&q=95",
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1200&q=95",
      "https://images.unsplash.com/photo-1468078809804-4c7b3e60a478?w=1200&q=95"
    ];
    return images[tourIdHash % images.length];
  };

  const handleMorph = () => {
    setIsMorphing(true);
    setTimeout(() => {
      setIsExpanded(!isExpanded);
      setIsMorphing(false);
    }, 300);
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

  return (
    <div className="relative mb-6 transition-all duration-500 ease-in-out">
      <div 
        className={`
          relative bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200
          transition-all duration-700 ease-in-out transform-gpu
          ${isMorphing ? 'scale-95 opacity-80' : 'scale-100 opacity-100'}
          ${isExpanded ? 'max-w-full' : 'max-w-full'}
        `}
        style={{
          transformOrigin: 'center center',
        }}
      >
        {!isExpanded ? (
          // Pre-Program View - Landscape Layout
          <div className="flex flex-col md:flex-row">
            <div className="relative w-full md:w-2/5 h-64 md:h-auto">
              <img
                src={getUniqueImage()}
                alt={tour.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {hasDiscount && (
                <div className="absolute top-4 left-4">
                  <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full font-bold">
                    ลด {tour.pricing.discount_percentage}%
                  </span>
                </div>
              )}
            </div>
            
            <div className="flex-1 p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {tour.title}
                </h3>
                
                <div className="flex items-center gap-4 text-gray-600 mb-4">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {tour.location.country}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {tour.duration_days} วัน {tour.nights} คืน
                  </div>
                </div>
                
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
                    <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-sm">{tour.quality.rating}</span>
                  </div>
                  <span className="text-gray-500 text-sm">({tour.quality.review_count} รีวิว)</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-blue-600">
                    ฿{formatPrice(tour.pricing.base_price)}
                  </span>
                  {tour.pricing.original_price && tour.pricing.original_price > tour.pricing.base_price && (
                    <span className="text-gray-400 text-sm line-through ml-2">
                      ฿{formatPrice(tour.pricing.original_price)}
                    </span>
                  )}
                </div>
                
                <button
                  onClick={handleMorph}
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-indigo-600 transition-all transform hover:scale-105 flex items-center gap-2"
                >
                  <span>คลิกดูโปรโมชั่น</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Full Program View - Portrait Layout
          <div className="relative">
            {/* Morphing Effect Overlay */}
            {isMorphing && (
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 z-10 animate-pulse" />
            )}
            
            <div className="relative h-80 overflow-hidden">
              <img
                src={getUniqueImage()}
                alt={tour.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              <div className="absolute top-4 left-4 right-4 flex justify-between">
                {hasDiscount && (
                  <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full font-bold">
                    ลด {tour.pricing.discount_percentage}%
                  </span>
                )}
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onWishlistToggle?.(tour.metadata.id);
                  }}
                  className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-all ml-auto"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                </button>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white text-3xl font-bold mb-2">
                  {tour.title}
                </h3>
                <div className="flex items-center gap-4 text-white/90">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {tour.location.country}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {tour.duration_days} วัน {tour.nights} คืน
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              {/* Highlights */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-yellow-500" />
                  ไฮไลท์ของทริป
                </h4>
                <div className="flex flex-wrap gap-2">
                  {tour.highlights.slice(0, 5).map((highlight, idx) => (
                    <span key={idx} className="text-sm bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 px-3 py-1 rounded-full">
                      {typeof highlight === 'string' ? highlight : highlight.text}
                    </span>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center bg-yellow-50 px-3 py-2 rounded-lg">
                  <Star className="w-5 h-5 mr-1 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{tour.quality.rating}</span>
                </div>
                <span className="text-gray-500">({tour.quality.review_count} รีวิว)</span>
                <div className="flex items-center text-green-600">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">รีวิวจริง 100%</span>
                </div>
              </div>

              {/* Travel Info */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-gray-600 text-sm">สายการบิน</span>
                    <div className="font-semibold text-gray-900">{getAirlineInfo(tour.location.country)}</div>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">ช่วงเวลาเดินทาง</span>
                    <div className="font-semibold text-gray-900">{getTravelPeriod(tour.location.country)}</div>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">ประเภททัวร์</span>
                    <div className="font-semibold text-gray-900">{tour.tour_type}</div>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">รหัสทัวร์</span>
                    <div className="font-semibold text-gray-900">{tour.tour_code}</div>
                  </div>
                </div>
              </div>

              {/* Cities */}
              {tour.location.cities && tour.location.cities.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">เมืองที่เที่ยว</h4>
                  <div className="flex flex-wrap gap-2">
                    {tour.location.cities.map((city, idx) => (
                      <span key={idx} className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-lg">
                        {city}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Price & CTA */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <div>
                  <div className="text-3xl font-bold text-blue-600">
                    ฿{formatPrice(tour.pricing.base_price)}
                  </div>
                  <div className="text-sm text-gray-500">ต่อคน</div>
                  {tour.pricing.original_price && tour.pricing.original_price > tour.pricing.base_price && (
                    <div className="text-sm text-green-600 font-medium mt-1">
                      ประหยัด ฿{formatPrice(tour.pricing.original_price - tour.pricing.base_price)}
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleMorph}
                    className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition-all"
                  >
                    ย้อนกลับ
                  </button>
                  <button 
                    onClick={() => onQuickBook?.(tour)}
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 px-6 rounded-xl font-medium hover:from-blue-600 hover:to-indigo-600 transition-all shadow-lg"
                  >
                    จองทันที
                  </button>
                  <Link href={tour.metadata.canonical_url}>
                    <button className="px-6 py-3 border-2 border-blue-500 text-blue-600 rounded-xl font-medium hover:bg-blue-50 transition-all">
                      ดูรายละเอียด
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Liquid Morph Effect Styles */}
      <style jsx>{`
        @keyframes liquid-morph {
          0% {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          }
          50% {
            border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
          }
          100% {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          }
        }
        
        .liquid-morph {
          animation: liquid-morph 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default MorphTransformCard;