'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SearchIndexTour } from './types';
import { 
  Clock, MapPin, Star, Users, Heart, Calendar
} from 'lucide-react';

interface MagazineUnfoldCardProps {
  tour: SearchIndexTour;
  isWishlisted?: boolean;
  onWishlistToggle?: (tourId: string) => void;
  onQuickBook?: (tour: SearchIndexTour) => void;
}

// Magazine Unfold Card - พับเปิดแบบนิตยสาร
const MagazineUnfoldCard: React.FC<MagazineUnfoldCardProps> = ({ 
  tour, 
  isWishlisted = false, 
  onWishlistToggle, 
  onQuickBook 
}) => {
  const [isUnfolded, setIsUnfolded] = useState(false);
  const [isFolding, setIsFolding] = useState(false);
  
  const formatPrice = (price: number) => price.toLocaleString('th-TH');
  const hasDiscount = tour.pricing.discount_percentage && tour.pricing.discount_percentage > 0;

  const getUniqueImage = () => {
    const tourIdHash = tour.metadata.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const images = [
      "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=1200&q=95",
      "https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&q=95",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=95",
      "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=1200&q=95",
      "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=1200&q=95",
      "https://images.unsplash.com/photo-1586996292898-71f4036c4e07?w=1200&q=95",
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=95",
      "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=1200&q=95"
    ];
    return images[tourIdHash % images.length];
  };

  const handleUnfold = () => {
    setIsFolding(true);
    setTimeout(() => {
      setIsUnfolded(!isUnfolded);
      setIsFolding(false);
    }, 400);
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
    <div className="relative mb-8 perspective-1000">
      <div 
        className={`
          relative bg-white shadow-2xl overflow-hidden transition-all duration-700 ease-in-out
          ${isFolding ? 'animate-pulse' : ''}
          ${isUnfolded ? 'rounded-lg' : 'rounded-2xl'}
        `}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {!isUnfolded ? (
          // Pre-Program View - Magazine Cover
          <div className="relative">
            <div className="relative h-96 overflow-hidden">
              <img
                src={getUniqueImage()}
                alt={tour.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              
              {/* Magazine Overlay Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
              
              {/* Promotion Badge */}
              <div className="absolute top-6 left-6">
                <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg inline-flex items-center gap-1 animate-pulse">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  โปรพิเศษ ลดสูงสุด {tour.pricing.discount_percentage || 25}%
                </div>
              </div>
              
              {/* Travel Period */}
              <div className="absolute top-16 left-6">
                <div className="text-white/90 text-sm font-medium bg-black/30 backdrop-blur-sm px-3 py-1 rounded-lg inline-block">
                  <svg className="w-3 h-3 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  เดินทาง ม.ค. - มี.ค. 69
                </div>
              </div>
              
              
              {/* Cover Story */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h1 className="text-white text-2xl font-bold leading-tight mb-3">
                  {tour.title}
                </h1>
                
                {/* Quote */}
                <div className="border-l-4 border-yellow-400 pl-4 mb-4">
                  <p className="text-white/90 text-base italic">
                    <span className="text-yellow-400 text-2xl mr-1">&ldquo;</span>
                    การเดินทางที่จะเปลี่ยนชีวิตคุณไปตลอดกาล
                    <span className="text-yellow-400 text-2xl ml-1">&rdquo;</span>
                  </p>
                </div>
                
                <div className="text-white/70 text-sm">ราคาเริ่มต้น</div>
                
                {/* Price and button on same row */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-white text-2xl font-bold">฿{formatPrice(tour.pricing.base_price)}</span>
                    <span className="text-white/70 text-sm ml-2">ต่อท่าน</span>
                  </div>
                  
                  <button
                    onClick={handleUnfold}
                    className="text-white hover:text-yellow-300 transition-colors duration-200 flex items-center gap-1"
                  >
                    <span className="text-base font-medium underline underline-offset-2">คลิกเพื่อดูโปรโมชั่น</span>
                    <svg 
                      className="w-5 h-5 animate-bounce" 
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
        ) : (
          // Full Program View - Same as tour-search-39
          <div className="bg-white rounded-xl border shadow-md border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden">
            {/* Back to Pre-Program Button - Positioned below Wishlist */}
            <div className="absolute top-16 right-3 z-10">
              <button 
                onClick={handleUnfold}
                className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-all flex items-center justify-center"
              >
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>

            {/* Full Card View */}
            <div className="transition-all duration-500">
              {/* Image Section */}
              <div className="relative h-48 md:h-52">
                <img
                  src={getUniqueImage()}
                  alt={tour.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                
                {/* Overlays */}
                <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                  {hasDiscount && (
                    <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg inline-flex items-center gap-1 animate-pulse">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                      โปรพิเศษ ลดสูงสุด {tour.pricing.discount_percentage}%
                    </div>
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
                    <span key={idx} className="text-sm bg-blue-50 text-blue-700 px-2 py-1 rounded-lg">
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
        )}
      </div>

      {/* Magazine Fold Effect Styles */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 800px;
        }
        
        @keyframes page-flip {
          0% {
            transform: rotateY(0deg);
          }
          50% {
            transform: rotateY(-90deg);
          }
          100% {
            transform: rotateY(-180deg);
          }
        }
        
        .page-flip {
          animation: page-flip 0.8s ease-in-out;
          transform-origin: left center;
        }
      `}</style>
    </div>
  );
};

export default MagazineUnfoldCard;