'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SearchIndexTour } from './types';
import { 
  Clock, MapPin, Star, Heart, Calendar, ArrowRight, Plane,
  ChevronLeft, ChevronRight, Info, X, CheckCircle, Sparkles
} from 'lucide-react';

interface BestPracticeTourCardProps {
  tour: SearchIndexTour;
  onWishlistToggle?: (id: string) => void;
  onQuickBook?: (tour: SearchIndexTour) => void;
  isWishlisted?: boolean;
}

export const BestPracticeTourCard: React.FC<BestPracticeTourCardProps> = ({
  tour,
  onWishlistToggle,
  onQuickBook,
  isWishlisted = false
}) => {
  const [showLandmarkModal, setShowLandmarkModal] = useState(false);
  const [currentLandmarkIndex, setCurrentLandmarkIndex] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Extract data from tour object
  const tourTitle = tour.title || 'ทัวร์พิเศษ';
  const countries = tour.location.country ? [tour.location.country] : ['ไทย'];
  const duration = `${tour.duration_days}วัน ${tour.nights}คืน`;
  const tourCode = tour.metadata.id || 'TOUR-001';
  
  // Get airline from tour title or default
  const getAirline = () => {
    const title = tour.title.toLowerCase();
    if (title.includes('thai') || title.includes('ไทย')) return 'การบินไทย';
    if (title.includes('eva')) return 'EVA Air';
    if (title.includes('qatar')) return 'Qatar Airways';
    if (title.includes('emirates')) return 'Emirates';
    if (title.includes('singapore')) return 'Singapore Airlines';
    return 'สายการบินชั้นนำ';
  };

  // Get travel months from departure dates
  const getTravelMonths = () => {
    if (!tour.departure_dates || tour.departure_dates.length === 0) {
      return 'ตลอดทั้งปี';
    }
    const months = new Set<string>();
    tour.departure_dates.forEach(dep => {
      const monthMatch = dep.date_range.match(/(ม\.ค\.|ก\.พ\.|มี\.ค\.|เม\.ย\.|พ\.ค\.|มิ\.ย\.|ก\.ค\.|ส\.ค\.|ก\.ย\.|ต\.ค\.|พ\.ย\.|ธ\.ค\.)/g);
      if (monthMatch) {
        monthMatch.forEach(m => months.add(m));
      }
    });
    return Array.from(months).join(' ');
  };

  // Get landmarks from highlights
  const landmarks = tour.highlights.map(h => h.text).slice(0, 10);

  // Pricing
  const hasDiscount = tour.pricing.discount_percentage > 0;
  const originalPrice = tour.pricing.original_price || tour.pricing.base_price;
  const salePrice = tour.pricing.base_price;
  const savedAmount = hasDiscount ? originalPrice - salePrice : 0;

  // Get tour highlights
  const highlights = tour.highlights.slice(0, 3).map(h => h.text);

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('th-TH').format(price);
  };

  // Landmark slider logic
  useEffect(() => {
    if (landmarks.length > 1) {
      const interval = setInterval(() => {
        setCurrentLandmarkIndex((prev) => (prev + 1) % landmarks.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [landmarks.length]);

  return (
    <>
      <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
        {/* Main Image Section - Unobstructed */}
        <div className="relative h-64 overflow-hidden">
          <Image
            src={tour.media.hero_image}
            alt={tourTitle}
            fill
            className={`object-cover transition-all duration-700 group-hover:scale-110 ${
              isImageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setIsImageLoaded(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority
          />
          
          {/* Gradient Overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          
          {/* Tour Code Badge */}
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-lg">
            <span className="text-xs font-bold text-gray-700">รหัสทัวร์: {tourCode}</span>
          </div>

          {/* Country Flag & Airline - Top Right */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            {/* Country Flag */}
            <div className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center overflow-hidden">
              <span className="text-xl">
                {countries[0] === 'ญี่ปุ่น' && '🇯🇵'}
                {countries[0] === 'เกาหลีใต้' && '🇰🇷'}
                {countries[0] === 'ไต้หวัน' && '🇹🇼'}
                {countries[0] === 'จีน' && '🇨🇳'}
                {countries[0] === 'สิงคโปร์' && '🇸🇬'}
                {countries[0] === 'มาเลเซีย' && '🇲🇾'}
                {countries[0] === 'ฮ่องกง' && '🇭🇰'}
                {countries[0] === 'ยุโรป' && '🇪🇺'}
                {!['ญี่ปุ่น', 'เกาหลีใต้', 'ไต้หวัน', 'จีน', 'สิงคโปร์', 'มาเลเซีย', 'ฮ่องกง', 'ยุโรป'].includes(countries[0]) && '🌏'}
              </span>
            </div>
            
            {/* Wishlist Button */}
            <button
              onClick={() => onWishlistToggle?.(tour.metadata.id)}
              className="w-10 h-10 bg-white/95 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-colors"
            >
              <Heart 
                className={`w-5 h-5 transition-colors ${
                  isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'
                }`} 
              />
            </button>
          </div>

          {/* Tour Title & Duration Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 className="text-xl font-bold mb-1 drop-shadow-lg line-clamp-2">
              {tourTitle}
            </h3>
            <div className="flex items-center gap-3 text-sm">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {duration}
              </span>
              <span className="flex items-center gap-1">
                <Plane className="w-4 h-4" />
                {getAirline()}
              </span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5">
          {/* Countries & Travel Months */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-gray-700">
                ประเทศ: {countries.join(', ')}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-green-600" />
              <span className="text-sm text-gray-600">
                เดินทาง: {getTravelMonths()}
              </span>
            </div>
          </div>

          {/* Landmarks Section with Slider */}
          <div className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-purple-600" />
                แลนด์มาร์กสำคัญ
              </span>
              <button
                onClick={() => setShowLandmarkModal(true)}
                className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
              >
                ดูทั้งหมด ({landmarks.length})
                <Info className="w-3 h-3" />
              </button>
            </div>
            
            {/* Sliding Landmark Display */}
            <div className="relative h-8 overflow-hidden">
              <div 
                className="absolute w-full transition-transform duration-500"
                style={{ transform: `translateY(-${currentLandmarkIndex * 32}px)` }}
              >
                {landmarks.map((landmark, index) => (
                  <div key={index} className="h-8 flex items-center">
                    <span className="text-sm text-gray-700 font-medium">
                      📍 {landmark}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {highlights.map((highlight, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium flex items-center gap-1"
                >
                  <CheckCircle className="w-3 h-3" />
                  {highlight}
                </span>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-bold text-gray-700">{tour.quality.rating}</span>
            </div>
            <span className="text-sm text-gray-500">({tour.quality.review_count} รีวิว)</span>
          </div>

          {/* Pricing Section */}
          <div className="border-t pt-4">
            <div className="flex items-end justify-between mb-3">
              <div>
                {hasDiscount && (
                  <div className="text-sm text-gray-400 line-through">
                    ฿{formatPrice(originalPrice)}
                  </div>
                )}
                <div className="text-2xl font-bold text-blue-600">
                  ฿{formatPrice(salePrice)}
                </div>
                <div className="text-xs text-gray-500">ต่อท่าน</div>
                {hasDiscount && (
                  <div className="text-sm font-medium text-green-600 mt-1">
                    ประหยัด ฿{formatPrice(savedAmount)} (-{tour.pricing.discount_percentage}%)
                  </div>
                )}
              </div>
              
              {/* CTA Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => onQuickBook?.(tour)}
                  className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-medium hover:from-orange-600 hover:to-red-600 transition-all shadow-md hover:shadow-lg"
                >
                  จองด่วน
                </button>
                <Link href={`/tour-search-53/${tour.metadata.id}`}>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-1">
                    รายละเอียด
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Landmark Modal */}
      {showLandmarkModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setShowLandmarkModal(false)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="p-5 border-b flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-800">
                แลนด์มาร์กทั้งหมด ({landmarks.length} แห่ง)
              </h3>
              <button
                onClick={() => setShowLandmarkModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            
            <div className="p-5 overflow-y-auto max-h-[60vh]">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {landmarks.map((landmark, index) => (
                  <div 
                    key={index}
                    className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg hover:from-blue-100 hover:to-purple-100 transition-colors"
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-lg">📍</span>
                      <span className="text-sm font-medium text-gray-700">
                        {landmark}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BestPracticeTourCard;