'use client'

import React, { useState, useEffect } from 'react'
import { ArrowLeft, Calendar, Clock, MapPin, Star, Users, Heart, Share2, Phone, MessageCircle, CheckCircle, X, AlertTriangle, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Play, Eye, Check, Plus, Minus, CreditCard, Shield, Zap, Gift, Award, Timer, TrendingUp, UserCheck, ThumbsUp, Camera } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

// Import components
import BookingModal from '../../../components/tour-search-24/BookingModal'
import StickyBookingBar from '../../../components/tour-search-24/StickyBookingBar'

interface TourDetailClientProps {
  initialTour: any
  src?: string
}

export default function TourDetailClient({ initialTour, src }: TourDetailClientProps) {
  const [tour, setTour] = useState(initialTour)
  const [loading, setLoading] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [selectedDeparture, setSelectedDeparture] = useState(null)
  const [expandedItinerary, setExpandedItinerary] = useState({ 1: true })
  const [showGallery, setShowGallery] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState({})
  const [showWarning, setShowWarning] = useState(false)
  const [showReviews, setShowReviews] = useState(false)
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0)
  const [flashSaleTimeLeft, setFlashSaleTimeLeft] = useState(3600) // 1 hour in seconds

  useEffect(() => {
    // Initialize with the provided tour data
    setTour(initialTour)
    
    if (initialTour?.departures?.length > 0) {
      const firstDeparture = initialTour.departures[0]
      console.log('🔍 Setting selectedDeparture:', firstDeparture)
      setSelectedDeparture(firstDeparture)
    } else {
      console.warn('❌ No departures found in tour data:', initialTour)
    }
    
    // Check if accessed from search page
    if (src !== 'search24') {
      console.warn('Direct access detected - missing src=search24 parameter')
    }

    // Flash sale timer
    const timer = setInterval(() => {
      setFlashSaleTimeLeft(prev => prev > 0 ? prev - 1 : 0)
    }, 1000)

    return () => clearInterval(timer)
  }, [initialTour, src])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Handle not found
  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">ไม่พบข้อมูลทัวร์</h1>
          <Link href="/tour-search-24" className="text-blue-600 hover:underline">
            กลับไปหน้าค้นหาทัวร์
          </Link>
        </div>
      </div>
    )
  }

  // Handle loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
            <div className="h-64 bg-gray-200 rounded-xl mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                <div className="h-12 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Render the full tour detail page
  return (
    <div className="min-h-screen bg-white">
      {/* Mobile-First Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="px-3 sm:px-4">
          <div className="flex items-center justify-between py-3">
            <Link 
              href="/tour-search-24" 
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors min-w-0"
            >
              <ArrowLeft size={18} className="flex-shrink-0" />
              <span className="text-sm truncate">กลับไปค้นหา</span>
            </Link>
            
            <div className="flex items-center gap-2">
              <button className="p-2.5 text-gray-600 hover:text-red-500 transition-colors">
                <Heart size={18} />
              </button>
              <button className="p-2.5 text-gray-600 hover:text-blue-500 transition-colors">
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile-First Main Content */}
      <div className="px-3 sm:px-4 py-4">
        {/* Mobile-Optimized Flash Sale Banner */}
        {flashSaleTimeLeft > 0 && (
          <div className="mb-3 bg-red-600 text-white rounded-lg p-3 mx-0">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-yellow-300 text-lg">⚡</span>
                <div className="min-w-0">
                  <div className="text-sm font-bold">Flash Sale -15%</div>
                  <div className="text-xs opacity-90">เหลือเวลา</div>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-base font-bold">{formatTime(flashSaleTimeLeft)}</div>
                <div className="text-xs">รีบจอง!</div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile-First Tour Header */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1.5 mb-2">
            {tour.badges?.map((badge: string, idx: number) => (
              <span key={idx} className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full font-medium">
                {badge}
              </span>
            ))}
            <span className="px-2 py-0.5 bg-green-500 text-white text-xs rounded-full font-medium">
              🔥 ยอดนิยม
            </span>
          </div>
          
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2 leading-tight">
            {tour.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-2 text-gray-600 mb-3">
            <div className="flex items-center gap-1">
              <MapPin size={14} />
              <span className="text-xs">{tour.country}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span className="text-xs">{tour.duration_days} วัน {tour.nights} คืน</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="text-yellow-400" size={14} fill="currentColor" />
              <span className="text-xs font-medium">{tour.rating}</span>
              <span className="text-xs text-gray-500">({tour.reviews_count})</span>
            </div>
          </div>

          {/* Mobile-First Price Section */}
          <div className="bg-blue-50 rounded-lg p-3 mb-4">
            {flashSaleTimeLeft > 0 && (
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm line-through text-gray-400">
                  ฿{Math.round(tour.price_from * 1.15)?.toLocaleString()}
                </span>
                <span className="bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                  -15%
                </span>
              </div>
            )}
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-2xl font-bold text-blue-600">
                ฿{tour.price_from?.toLocaleString()}
              </span>
              <span className="text-gray-500 text-sm">เริ่มต้น/ท่าน</span>
            </div>
            
            {/* Quick Benefits */}
            <div className="flex flex-wrap gap-1 text-xs">
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded">ผ่อน 0%</span>
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">ประกัน</span>
              <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">มัดจำ ฿{tour.policies?.deposit?.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Mobile-First Hero Image */}
        <div className="mb-4">
          <div className="relative h-48 sm:h-64 rounded-lg overflow-hidden">
            <Image
              src={tour.hero_images?.[currentImageIndex] || tour.hero_images?.[0] || '/placeholder.jpg'}
              alt={tour.title}
              fill
              className="object-cover"
              priority
            />
            
            {/* Mobile Image Navigation */}
            {tour.hero_images?.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentImageIndex((prev) => 
                    prev === 0 ? tour.hero_images.length - 1 : prev - 1
                  )}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1.5 rounded-full active:bg-black/70"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => setCurrentImageIndex((prev) => 
                    prev === tour.hero_images.length - 1 ? 0 : prev + 1
                  )}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1.5 rounded-full active:bg-black/70"
                >
                  <ChevronRight size={16} />
                </button>
              </>
            )}
            
            {/* Image Indicators */}
            {tour.hero_images?.length > 1 && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {tour.hero_images.map((_: any, idx: number) => (
                  <div
                    key={idx}
                    className={`w-1.5 h-1.5 rounded-full ${
                      idx === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            )}
            
            {/* View Gallery Button - Mobile */}
            <button
              onClick={() => setShowGallery(true)}
              className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs flex items-center gap-1"
            >
              <Eye size={12} />
              {tour.gallery?.length || 0}
            </button>
          </div>
        </div>

        {/* Mobile-First Content Layout */}
        <div className="space-y-4">
          {/* Tour Details */}
          <div className="space-y-4">
            
            {/* Simple Trust Indicators - Mobile First */}
            <div className="bg-white rounded-lg border p-3 mb-3">
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-3">
                  <UserCheck className="text-blue-600 mx-auto mb-1" size={16} />
                  <div className="text-xs font-medium">ไกด์มืออาชีพ</div>
                </div>
                <div className="p-3">
                  <Shield className="text-green-600 mx-auto mb-1" size={16} />
                  <div className="text-xs font-medium">จ่ายปลอดภัย</div>
                </div>
                <div className="p-3">
                  <Award className="text-yellow-600 mx-auto mb-1" size={16} />
                  <div className="text-xs font-medium">รางวัล</div>
                </div>
                <div className="p-3">
                  <ThumbsUp className="text-purple-600 mx-auto mb-1" size={16} />
                  <div className="text-xs font-medium">4.8★</div>
                </div>
              </div>
            </div>

            {/* Tour Highlights - Mobile First */}
            {tour.highlights?.length > 0 && (
              <div className="bg-white rounded-lg border p-3">
                <h2 className="text-base font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <Award className="text-yellow-500" size={16} />
                  จุดเด่นของทัวร์
                </h2>
                <div className="space-y-2">
                  {tour.highlights.map((highlight: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={14} />
                      <span className="text-gray-700 text-sm">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Simple Offer CTA - Mobile First */}
            <div className="bg-orange-500 text-white rounded-lg p-3 mb-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <Timer className="text-yellow-300 flex-shrink-0" size={16} />
                  <div className="min-w-0">
                    <div className="text-sm font-bold">โปรโมชั่น!</div>
                    <div className="text-xs opacity-90">จองวันนี้ ลด 5%</div>
                  </div>
                </div>
                <button className="bg-white text-orange-600 px-3 py-1.5 rounded text-xs font-bold flex-shrink-0">
                  รับโค้ด
                </button>
              </div>
            </div>

            {/* Itinerary */}
            {tour.itinerary?.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">รายการท่องเที่ยว</h2>
                <div className="space-y-4">
                  {tour.itinerary.map((day: any, idx: number) => (
                    <div key={idx} className="border-l-4 border-blue-500 pl-6 pb-6 last:pb-0">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                          {day.day}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">{day.title}</h3>
                      </div>
                      
                      {expandedItinerary[day.day] && (
                        <div className="ml-11 space-y-2">
                          {day.details?.map((detail: string, detailIdx: number) => (
                            <p key={detailIdx} className="text-gray-600 flex items-start gap-2">
                              <span className="text-blue-500 mt-1.5 block w-1.5 h-1.5 rounded-full bg-current flex-shrink-0"></span>
                              {detail}
                            </p>
                          ))}
                        </div>
                      )}
                      
                      <button
                        onClick={() => setExpandedItinerary(prev => ({
                          ...prev,
                          [day.day]: !prev[day.day]
                        }))}
                        className="ml-11 mt-2 text-blue-500 hover:text-blue-600 text-sm flex items-center gap-1"
                      >
                        {expandedItinerary[day.day] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        {expandedItinerary[day.day] ? 'ย่อ' : 'ดูเพิ่มเติม'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Customer Reviews - Enhanced */}
            {tour.reviews?.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <Star className="text-yellow-400 fill-current" size={24} />
                    รีวิวจากลูกค้า
                  </h2>
                  <button 
                    onClick={() => setShowReviews(!showReviews)}
                    className="text-blue-600 text-sm font-medium hover:underline"
                  >
                    {showReviews ? 'ซ่อน' : `ดูทั้งหมด (${tour.reviews.length})`}
                  </button>
                </div>
                
                <div className="flex items-center gap-4 mb-4 p-3 bg-yellow-50 rounded-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">{tour.rating}</div>
                    <div className="flex text-yellow-400 text-sm">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill={i < Math.floor(tour.rating) ? 'currentColor' : 'none'} />
                      ))}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <div className="font-medium">{tour.reviews_count} รีวิว</div>
                    <div>จาก {tour.reviews_count} ท่านที่เดินทาง</div>
                  </div>
                </div>

                {/* Featured Review */}
                <div className="border border-gray-200 rounded-lg p-4 mb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {tour.reviews[currentReviewIndex]?.name?.charAt(0) || 'A'}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{tour.reviews[currentReviewIndex]?.name}</span>
                        <div className="flex text-yellow-400">
                          {[...Array(tour.reviews[currentReviewIndex]?.rating || 5)].map((_, i) => (
                            <Star key={i} size={12} fill="currentColor" />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{tour.reviews[currentReviewIndex]?.comment}</p>
                      <div className="text-xs text-gray-500">{tour.reviews[currentReviewIndex]?.date}</div>
                      {tour.reviews[currentReviewIndex]?.images?.length > 0 && (
                        <div className="flex gap-2 mt-2">
                          {tour.reviews[currentReviewIndex].images.map((img: string, idx: number) => (
                            <div key={idx} className="w-16 h-16 relative rounded">
                              <Image src={img} alt="Review" fill className="object-cover rounded" />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {tour.reviews.length > 1 && (
                  <div className="flex justify-center gap-2">
                    {tour.reviews.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentReviewIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          idx === currentReviewIndex ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                )}

                {showReviews && (
                  <div className="mt-4 space-y-3">
                    {tour.reviews.slice(1).map((review: any, idx: number) => (
                      <div key={idx} className="border-t pt-3">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                            {review.name?.charAt(0) || 'A'}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-sm">{review.name}</span>
                              <div className="flex text-yellow-400">
                                {[...Array(review.rating)].map((_, i) => (
                                  <Star key={i} size={10} fill="currentColor" />
                                ))}
                              </div>
                            </div>
                            <p className="text-gray-600 text-sm">{review.comment}</p>
                            <div className="text-xs text-gray-500 mt-1">{review.date}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Included/Excluded */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tour.included?.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <CheckCircle className="text-green-500" size={20} />
                    รวมในราคา
                  </h3>
                  <ul className="space-y-2">
                    {tour.included.map((item: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-600 text-sm">
                        <Check className="text-green-500 flex-shrink-0 mt-0.5" size={14} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {tour.excluded?.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <X className="text-red-500" size={20} />
                    ไม่รวมในราคา
                  </h3>
                  <ul className="space-y-2">
                    {tour.excluded.map((item: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-600 text-sm">
                        <X className="text-red-500 flex-shrink-0 mt-0.5" size={14} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Related Tours Upsell */}
            {tour.related?.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <TrendingUp className="text-blue-500" size={24} />
                  ทัวร์ที่คุณอาจสนใจ
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tour.related.map((relatedTour: any, idx: number) => (
                    <div key={idx} className="border rounded-lg p-4 hover:shadow-lg transition-all duration-200">
                      <div className="flex gap-3">
                        <div className="w-20 h-16 relative rounded-lg overflow-hidden flex-shrink-0">
                          <Image src={relatedTour.thumb} alt={relatedTour.title} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-sm text-gray-800 mb-1 line-clamp-2">{relatedTour.title}</h3>
                          <div className="text-blue-600 font-bold text-sm">฿{relatedTour.price_from?.toLocaleString()}</div>
                          <button className="mt-2 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded hover:bg-blue-200 transition-colors">
                            ดูรายละเอียด
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FAQs */}
            {tour.faqs?.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">คำถามที่พบบ่อย</h2>
                <div className="space-y-4">
                  {tour.faqs.map((faq: any, idx: number) => (
                    <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => setExpandedFaq(prev => ({
                          ...prev,
                          [idx]: !prev[idx]
                        }))}
                        className="w-full px-4 py-3 text-left font-semibold text-gray-800 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
                      >
                        {faq.q}
                        {expandedFaq[idx] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </button>
                      {expandedFaq[idx] && (
                        <div className="px-4 py-3 text-gray-600">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Booking Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {/* Flash Sale Countdown - Desktop */}
            {flashSaleTimeLeft > 0 && (
              <div className="hidden lg:block bg-red-600 text-white rounded-xl p-4 text-center mb-4">
                <div className="text-lg font-bold mb-2">⚡ Flash Sale -15%</div>
                <div className="text-2xl font-mono font-bold mb-2">{formatTime(flashSaleTimeLeft)}</div>
                <div className="text-sm">ลด 15% เหลือเวลาอีก!</div>
              </div>
            )}

              {/* Booking Card */}
              <div className="bg-white rounded-2xl shadow-lg p-4 lg:p-6">
                <div className="text-center mb-6">
                  {flashSaleTimeLeft > 0 && (
                    <div className="flex justify-center items-center gap-3 mb-3 p-3 bg-red-50 rounded-xl border border-red-200">
                      <span className="text-xl line-through text-gray-500">
                        ฿{Math.round((selectedDeparture?.price || tour.price_from) * 1.15)?.toLocaleString()}
                      </span>
                      <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-md animate-pulse">
                        ประหยัด 15%
                      </span>
                    </div>
                  )}
                  <div className="bg-blue-50 rounded-2xl p-6 mb-4 border border-blue-100">
                    <div className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                      ฿{selectedDeparture?.price?.toLocaleString() || tour.price_from?.toLocaleString()}
                    </div>
                    <div className="text-gray-600 text-base font-medium mb-3">ต่อท่าน</div>
                    <div className="flex justify-center gap-2 text-xs">
                      <span className="bg-white text-green-700 px-3 py-2 rounded-lg border border-green-200 font-medium">💳 ผ่อน 0%</span>
                      <span className="bg-white text-blue-700 px-3 py-2 rounded-lg border border-blue-200 font-medium">🛡️ รับประกัน</span>
                    </div>
                  </div>
                </div>

                {/* Departure Selection */}
                {tour.departures?.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-800 mb-3">เลือกวันออกเดินทาง</h3>
                    <div className="space-y-2">
                      {tour.departures.map((departure: any, idx: number) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedDeparture(departure)}
                          disabled={departure.status === 'soldout'}
                          className={`w-full p-3 rounded-lg border text-left transition-colors ${
                            selectedDeparture?.id === departure.id
                              ? 'border-blue-500 bg-blue-50'
                              : departure.status === 'soldout'
                              ? 'border-gray-200 bg-gray-50 cursor-not-allowed'
                              : 'border-gray-200 hover:border-blue-300'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium text-gray-800">
                                {departure.date_range}
                              </div>
                              <div className="text-sm text-gray-600">
                                {departure.status === 'soldout' ? 'เต็มแล้ว' :
                                 departure.status === 'low' ? `เหลือ ${departure.seats_left} ที่นั่ง` :
                                 `${departure.seats_left} ที่นั่ง`}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-blue-600">
                                ฿{departure.price?.toLocaleString()}
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Urgency Indicators */}
                {selectedDeparture?.seats_left <= 5 && selectedDeparture?.seats_left > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                    <div className="flex items-center gap-2 text-red-800">
                      <AlertTriangle size={18} className="text-red-500" />
                      <span className="text-sm font-medium">⚠️ เหลือเพียง {selectedDeparture.seats_left} ที่นั่ง!</span>
                    </div>
                    <div className="text-xs text-red-600 mt-1">มีผู้สนใจกำลังดูทัวร์นี้ 12 คน</div>
                  </div>
                )}

                {/* Booking Buttons */}
                <div className="space-y-2 lg:space-y-3">
                  <button
                    onClick={() => setShowBookingModal(true)}
                    disabled={!selectedDeparture || selectedDeparture?.status === 'soldout'}
                    className={`w-full py-3 lg:py-4 px-6 rounded-xl font-bold text-base lg:text-lg transition-all duration-300 relative ${
                      !selectedDeparture || selectedDeparture?.status === 'soldout'
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : selectedDeparture?.seats_left <= 5
                        ? 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 shadow-lg hover:shadow-xl animate-pulse'
                        : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {!selectedDeparture ? 'เลือกวันเดินทาง' :
                     selectedDeparture?.status === 'soldout' ? 'เต็มแล้ว' :
                     selectedDeparture?.seats_left <= 5 ? '🔥 จองด่วน!' : '⚡ จองเลย!'}
                    {flashSaleTimeLeft > 0 && selectedDeparture?.status !== 'soldout' && (
                      <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full">
                        -15%
                      </span>
                    )}
                  </button>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <button className="py-2 lg:py-3 px-4 rounded-lg border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition-colors text-sm">
                      💬 แชท
                    </button>
                    <button className="py-2 lg:py-3 px-4 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-1 text-sm">
                      <Phone size={16} />
                      โทร
                    </button>
                  </div>
                  
                  <button className="w-full py-2 px-4 rounded-lg bg-orange-100 text-orange-800 font-medium hover:bg-orange-200 transition-colors text-sm flex items-center justify-center gap-2">
                    <Gift size={16} />
                    รับโค้ดส่วนลด
                  </button>
                </div>

                {/* Trust Indicators */}
                <div className="mt-4 lg:mt-6 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <Shield size={14} className="text-green-500" />
                      <span>จ่ายปลอดภัย</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle size={14} className="text-blue-500" />
                      <span>ประกันราคา</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CreditCard size={14} className="text-purple-500" />
                      <span>ผ่อน 0%</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award size={14} className="text-yellow-500" />
                      <span>รางวัลคุณภาพ</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Card */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl p-4 lg:p-6">
                <h3 className="text-lg lg:text-xl font-bold mb-2">💬 ต้องการคำปรึกษา?</h3>
                <p className="text-blue-100 mb-4 text-sm">ทีมผู้เชี่ยวชาญพร้อมช่วยเหลือ 24/7</p>
                <div className="space-y-2">
                  <a href="tel:020000000" className="flex items-center gap-2 hover:text-blue-200 text-sm">
                    <Phone size={16} />
                    <span>02-000-0000</span>
                  </a>
                  <button className="flex items-center gap-2 hover:text-blue-200 text-sm">
                    <MessageCircle size={16} />
                    <span>Line: @tourwow</span>
                  </button>
                </div>
                <div className="mt-3 text-xs text-blue-200">
                  ⭐ คะแนนบริการ 4.9/5 จากลูกค้า 2,847 คน
                </div>
              </div>

              {/* Social Proof */}
              <div className="bg-white rounded-2xl shadow-lg p-4 text-center">
                <div className="text-2xl font-bold text-gray-800 mb-1">12,847</div>
                <div className="text-sm text-gray-600 mb-3">คนเดินทางกับเราแล้ว</div>
                <div className="flex justify-center items-center gap-1 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                  <span className="text-gray-600 text-sm ml-1">4.8 คะแนน</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Spacing */}
      <div className="lg:hidden h-20"></div>

      {/* Enhanced Sticky Booking Bar */}
      <StickyBookingBar 
        tour={tour}
        selectedDeparture={selectedDeparture}
        flashSaleTimeLeft={flashSaleTimeLeft}
        onBooking={() => setShowBookingModal(true)}
      />

      {/* Booking Modal */}
      {showBookingModal && (
        <BookingModal
          isOpen={showBookingModal}
          tour={tour}
          selectedDeparture={selectedDeparture}
          onClose={() => setShowBookingModal(false)}
        />
      )}

      {/* Warning Modal for direct access */}
      {showWarning && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-start gap-3 mb-4">
              <AlertTriangle className="text-yellow-500 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-bold text-gray-800 mb-2">การเข้าถึงโดยตรง</h3>
                <p className="text-gray-600">
                  คุณเข้าถึงหน้านี้โดยตรง แนะนำให้เริ่มจากหน้าค้นหาทัวร์เพื่อประสบการณ์ที่ดีที่สุด
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Link 
                href="/tour-search-24" 
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-center font-semibold hover:bg-blue-700 transition-colors"
              >
                ไปหน้าค้นหา
              </Link>
              <button
                onClick={() => setShowWarning(false)}
                className="flex-1 border border-gray-300 py-2 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                ดำเนินการต่อ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}