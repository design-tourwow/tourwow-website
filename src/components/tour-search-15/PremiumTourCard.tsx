'use client'

import { 
  Heart, Star, Clock, Users, ArrowRight, Shield, Award, 
  Flame, Timer, Crown, Sparkles, Gift, Percent, Zap, 
  ShoppingCart, ChevronRight, X
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface PremiumTourCardProps {
  tour: any
  viewMode: 'grid' | 'list'
  isWishlisted: boolean
  isCompared: boolean
  onToggleWishlist: () => void
  onToggleCompare: () => void
  onQuickView: () => void
  onNextImage: () => void
  currentImageIndex: number
  index: number
  timeLeft?: string
  isClient: boolean
}

export function PremiumTourCard({
  tour, 
  viewMode,
  isWishlisted,
  isCompared,
  onToggleWishlist,
  onToggleCompare,
  onQuickView,
  onNextImage,
  currentImageIndex,
  index,
  timeLeft,
  isClient
}: PremiumTourCardProps) {
  const currentImage = tour.gallery?.[currentImageIndex] || tour.image
  const urgency = tour.availableSeats && tour.availableSeats <= 5
  const discount = tour.originalPrice ? Math.round(((tour.originalPrice - tour.price) / tour.originalPrice) * 100) : 0

  // Get card styling based on tour type
  const getCardStyle = () => {
    switch (tour.uiStyle) {
      case 'premium':
        return 'bg-white border-2 border-blue-200 shadow-xl hover:shadow-2xl ring-1 ring-blue-100'
      case 'elegant':
        return 'bg-white border border-slate-300 shadow-lg hover:shadow-xl'
      case 'luxury':
        return 'bg-white border-2 border-slate-300 shadow-xl hover:shadow-2xl'
      default:
        return 'bg-white border border-slate-200 shadow-lg hover:shadow-xl'
    }
  }

  if (viewMode === 'list') {
    return (
      <div className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200 ${
        isCompared ? 'ring-4 ring-purple-300' : ''
      }`}>
        <div className="flex flex-col sm:flex-row">
          <div className="relative w-full sm:w-80 h-64 sm:h-48 flex-shrink-0">
            <Image
              src={currentImage}
              alt={tour.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 320px"
            />
            {tour.gallery && tour.gallery.length > 1 && (
              <button
                onClick={onNextImage}
                className="absolute top-3 right-3 p-2 bg-black/20 backdrop-blur-sm text-white rounded-full hover:bg-black/30 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
            
            {/* Flash Sale Badge */}
            {tour.saleType === 'flash' && (
              <div className="absolute top-3 left-3 bg-gradient-to-r from-red-600 to-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 animate-pulse shadow-lg">
                <Flame className="w-3 h-3" />
                <span>FLASH SALE</span>
                {timeLeft && isClient && (
                  <span className="ml-2 bg-black/20 px-2 py-0.5 rounded-full font-mono text-[10px]">
                    {timeLeft}
                  </span>
                )}
              </div>
            )}
            
            {/* Urgency Badge */}
            {urgency && !tour.saleType && (
              <div className="absolute top-3 left-3 px-2 py-1 bg-red-500 text-white rounded-lg text-sm font-bold">
                เหลือ {tour.availableSeats} ที่นั่ง
              </div>
            )}
            
            {/* Discount Badge */}
            {discount > 0 && !tour.saleType && (
              <div className="absolute top-3 left-3 px-2 py-1 bg-red-500 text-white rounded-lg text-sm font-bold">
                -{discount}%
              </div>
            )}
          </div>
          
          <div className="flex-1 p-6">
            {/* Trust Signals */}
            <div className="flex items-center gap-2 mb-3">
              {tour.isVerified && (
                <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  <Shield className="w-3 h-3" />
                  <span>รับรอง</span>
                </div>
              )}
              {tour.satisfaction && (
                <div className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                  <Award className="w-3 h-3" />
                  <span>{tour.satisfaction}% ความพึงพอใจ</span>
                </div>
              )}
            </div>
            
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{tour.title}</h3>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{tour.rating}</span>
                    <span>({tour.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{tour.duration}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={onToggleWishlist}
                  className={`p-2 rounded-full transition-colors ${
                    isWishlisted ? 'text-red-600 bg-red-50' : 'text-slate-400 hover:text-red-500 hover:bg-red-50'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
            
            <p className="text-sm text-slate-600 line-clamp-2 mb-4">{tour.highlights}</p>
            
            <div className="flex items-end justify-between">
              <div>
                {tour.originalPrice && (
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-slate-400 line-through text-sm">฿{tour.originalPrice.toLocaleString()}</p>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">
                      ประหยัด ฿{(tour.originalPrice - tour.price).toLocaleString()}
                    </span>
                  </div>
                )}
                <p className="text-2xl font-bold text-blue-600">฿{tour.price.toLocaleString()}</p>
                <p className="text-xs text-slate-500">ต่อคน รวมทุกอย่าง</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={onQuickView}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm font-medium"
                >
                  ดูรายละเอียด
                </button>
                <Link
                  href={`/tour-search-15/${tour.id}`}
                  className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                    tour.saleType === 'flash'
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  จองเลย
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Grid view
  return (
    <div className={`group rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 ${
      index % 2 === 1 ? 'sm:mt-6' : ''
    } ${isCompared ? 'ring-4 ring-purple-300' : ''} ${getCardStyle()}`}>
      <div className="relative h-64 overflow-hidden">
        <Image
          src={currentImage}
          alt={tour.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        
        {tour.gallery && tour.gallery.length > 1 && (
          <button
            onClick={onNextImage}
            className="absolute top-3 right-3 p-2 bg-black/20 backdrop-blur-sm text-white rounded-full hover:bg-black/40 transition-colors opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
        
        {/* Flash Sale Badge */}
        {tour.saleType === 'flash' && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-red-600 to-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 animate-pulse shadow-lg">
            <Flame className="w-3 h-3" />
            <span>FLASH SALE</span>
            {timeLeft && isClient && (
              <span className="ml-2 bg-black/20 px-2 py-0.5 rounded-full font-mono text-[10px]">
                {timeLeft}
              </span>
            )}
          </div>
        )}
        
        {/* Live viewers */}
        {tour.currentViewers && tour.currentViewers > 0 && (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
            <span>{tour.currentViewers} คนดู</span>
          </div>
        )}
        
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all">
          <button
            onClick={onToggleWishlist}
            className={`p-2 backdrop-blur-sm rounded-full transition-colors ${
              isWishlisted ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{tour.rating}</span>
              <span className="text-white/80 text-sm">({tour.reviews})</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Clock className="w-4 h-4" />
              <span>{tour.duration}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        {/* Sale Progress Bar */}
        {tour.soldPercentage && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-orange-600 font-semibold flex items-center gap-1">
                <Flame className="w-3 h-3" />
                จองแล้ว {tour.soldPercentage}%
              </span>
              <span className="text-slate-500">เหลือ {tour.availableSeats} ที่นั่ง</span>
            </div>
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-1000"
                style={{ width: `${tour.soldPercentage}%` }}
              />
            </div>
          </div>
        )}
        
        {/* Special Offers */}
        {tour.specialOffers && tour.specialOffers.length > 0 && (
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-3 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Gift className="w-4 h-4 text-orange-600" />
              <span className="text-xs font-bold text-orange-700">สิทธิพิเศษ</span>
            </div>
            <div className="space-y-1">
              {tour.specialOffers.slice(0, 2).map((offer: string, idx: number) => (
                <div key={idx} className="flex items-center gap-1 text-xs text-slate-700">
                  <Sparkles className="w-3 h-3 text-yellow-600" />
                  <span>{offer}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Trust Signals */}
        <div className="flex items-center gap-2 mb-4">
          {tour.isVerified && (
            <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
              <Shield className="w-3 h-3" />
              <span>รับรอง</span>
            </div>
          )}
          {tour.satisfaction && (
            <div className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
              <Award className="w-3 h-3" />
              <span>{tour.satisfaction}%</span>
            </div>
          )}
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {tour.title}
        </h3>
        
        <p className="text-sm text-slate-600 line-clamp-2 mb-4">
          {tour.highlights}
        </p>
        
        {/* Group Discount */}
        {tour.groupDiscount && tour.maxGroupSize && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-2 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-green-600" />
                <span className="text-xs font-semibold text-green-700">
                  ลด {tour.groupDiscount}% สำหรับ {tour.maxGroupSize} คนขึ้นไป
                </span>
              </div>
              <Percent className="w-4 h-4 text-green-500" />
            </div>
          </div>
        )}
        
        <div className="flex items-end justify-between pt-4 border-t border-slate-200">
          <div>
            {tour.originalPrice && (
              <div className="flex items-center gap-2 mb-1">
                <p className="text-slate-400 line-through text-sm">฿{tour.originalPrice.toLocaleString()}</p>
                <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-bold">
                  -{discount}%
                </span>
              </div>
            )}
            <p className="text-2xl font-bold text-blue-600">฿{tour.price.toLocaleString()}</p>
            <p className="text-xs text-slate-500">ต่อคน</p>
          </div>
          <Link
            href={`/tour-search-15/${tour.id}`}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105 ${
              tour.saleType === 'flash'
                ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white animate-pulse [animation-duration:3s]'
                : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
            }`}
          >
            <span>จองเลย</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}