'use client'

import { useState } from 'react'
import UpsellModal from './UpsellModal'

interface TourCardProps {
  tour: {
    id: number
    title: string
    destination: string
    city: string
    duration: string
    price: number
    originalPrice?: number
    discount?: number
    rating: number
    reviewCount: number
    image: string
    highlights: string[]
    airline: string
    departureMonths: string[]
    status: 'available' | 'sold-out' | 'limited'
    badges: string[]
    availableSeats?: number
    totalBookings?: number
    specialOffers?: string[]
    urgencyMessage?: string
  }
  viewMode: 'grid' | 'list'
  isCompared: boolean
  onCompareToggle: () => void
  onQuickView: () => void
}

export default function TourCard({ 
  tour, 
  viewMode, 
  isCompared, 
  onCompareToggle, 
  onQuickView 
}: TourCardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [showUpsellModal, setShowUpsellModal] = useState(false)

  const formatPrice = (price: number) => {
    return price.toLocaleString()
  }

  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="star filled">★</span>
      )
    }
    
    if (hasHalfStar) {
      stars.push(
        <span key="half" className="star half">★</span>
      )
    }
    
    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="star">☆</span>
      )
    }
    
    return stars
  }

  const isGridView = viewMode === 'grid'

  // Generate urgency message
  const getUrgencyMessage = () => {
    if (tour.urgencyMessage) return tour.urgencyMessage
    if (tour.availableSeats && tour.availableSeats <= 5) {
      return `เหลือที่ว่างเพียง ${tour.availableSeats} ที่สุดท้าย!`
    }
    if (tour.totalBookings && tour.totalBookings > 100) {
      return `จองแล้ว ${tour.totalBookings} คนในเดือนนี้`
    }
    return null
  }

  // Enhanced CTA text based on tour status
  const getPrimaryCTA = () => {
    if (tour.status === 'sold-out') return 'แจ้งเตือนรอบใหม่'
    if (tour.discount && tour.discount >= 20) return `จองทันที - ประหยัด ${tour.discount}%`
    if (tour.status === 'limited') return 'จองด่วน - เหลือน้อย!'
    if (tour.specialOffers?.includes('early-bird')) return 'จองล่วงหน้า - ลด 10%'
    if (tour.specialOffers?.includes('last-minute')) return 'Last Minute - ลด 30%'
    return 'จองทันที - ฟรีประกัน'
  }

  return (
    <div 
      className={`tour-card ${viewMode} ${isHovered ? 'hovered' : ''} ${tour.status}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <style jsx>{`
        .tour-card {
          background: var(--color-bg);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          overflow: hidden;
          transition: all 300ms ease-out;
          cursor: pointer;
          position: relative;
        }
        
        .tour-card:hover {
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
        }
        
        .tour-card.grid {
          display: flex;
          flex-direction: column;
        }
        
        .tour-card.list {
          display: flex;
          flex-direction: row;
          min-height: 200px;
        }
        
        @media (max-width: 767px) {
          .tour-card.list {
            flex-direction: column;
          }
        }
        
        .image-container {
          position: relative;
          overflow: hidden;
        }
        
        .tour-card.grid .image-container {
          aspect-ratio: 16/9;
        }
        
        .tour-card.list .image-container {
          width: 280px;
          flex-shrink: 0;
        }
        
        @media (max-width: 767px) {
          .tour-card.list .image-container {
            width: 100%;
            aspect-ratio: 16/9;
          }
        }
        
        .tour-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 300ms ease-out;
        }
        
        .tour-card.hovered .tour-image {
          transform: scale(1.05);
        }
        
        .image-skeleton {
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
        }
        
        .image-fallback {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, var(--color-bg-soft), var(--color-border));
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .fallback-content {
          text-align: center;
          color: var(--color-text-muted);
        }
        
        .fallback-icon {
          width: 48px;
          height: 48px;
          margin-bottom: var(--spacing-sm);
          opacity: 0.5;
        }
        
        .fallback-text {
          font-size: 14px;
          font-weight: 500;
        }
        
        @keyframes loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        
        .badges {
          position: absolute;
          top: var(--spacing-sm);
          left: var(--spacing-sm);
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        
        .badge {
          padding: 4px var(--spacing-xs);
          border-radius: var(--radius-sm);
          font-size: 12px;
          font-weight: 600;
          text-align: center;
          max-width: 80px;
        }
        
        .badge-discount {
          background: var(--color-error);
          color: white;
        }
        
        .badge-popular {
          background: var(--color-accent);
          color: var(--color-primary);
        }
        
        .badge-limited {
          background: #ff9800;
          color: white;
        }
        
        .badge-sold-out {
          background: var(--color-text-muted);
          color: white;
        }
        
        .quick-actions {
          position: absolute;
          top: var(--spacing-sm);
          right: var(--spacing-sm);
          display: flex;
          gap: var(--spacing-xs);
          opacity: 0;
          transform: translateY(-10px);
          transition: all 200ms ease-out;
        }
        
        .tour-card.hovered .quick-actions {
          opacity: 1;
          transform: translateY(0);
        }
        
        .action-button {
          width: 36px;
          height: 36px;
          border: none;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(4px);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 150ms ease;
        }
        
        .action-button:hover {
          background: white;
          transform: scale(1.1);
        }
        
        .action-button.active {
          background: var(--color-primary);
          color: white;
        }
        
        .card-content {
          padding: var(--spacing-md);
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        
        .tour-card.list .card-content {
          padding: var(--spacing-lg);
        }
        
        .tour-title {
          font-size: 16px;
          font-weight: 600;
          color: var(--color-text);
          margin-bottom: var(--spacing-xs);
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .tour-card.list .tour-title {
          font-size: 18px;
          -webkit-line-clamp: 1;
        }
        
        .tour-location {
          font-size: 14px;
          color: var(--color-text-muted);
          margin-bottom: var(--spacing-sm);
        }
        
        .tour-rating {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          margin-bottom: var(--spacing-sm);
        }
        
        .stars {
          display: flex;
          color: var(--color-accent);
          font-size: 14px;
        }
        
        .star.filled {
          color: var(--color-accent);
        }
        
        .star.half {
          background: linear-gradient(90deg, var(--color-accent) 50%, #ddd 50%);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
        }
        
        .star:not(.filled):not(.half) {
          color: #ddd;
        }
        
        .rating-text {
          font-size: 14px;
          color: var(--color-text-muted);
        }
        
        .tour-highlights {
          margin-bottom: var(--spacing-md);
        }
        
        .highlights-list {
          display: flex;
          flex-wrap: wrap;
          gap: var(--spacing-xs);
        }
        
        .highlight-item {
          font-size: 12px;
          color: var(--color-text-muted);
          display: flex;
          align-items: center;
          gap: 4px;
        }
        
        .highlight-item::before {
          content: '•';
          color: var(--color-primary);
        }
        
        .tour-details {
          display: flex;
          flex-wrap: wrap;
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-md);
          font-size: 13px;
          color: var(--color-text-muted);
        }
        
        .detail-item {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        
        .tour-price {
          margin-top: auto;
          padding-top: var(--spacing-sm);
          border-top: 1px solid var(--color-border);
        }
        
        .price-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: var(--spacing-sm);
        }
        
        .price-info {
          flex: 1;
        }
        
        .price-original {
          font-size: 14px;
          color: var(--color-text-muted);
          text-decoration: line-through;
          margin-bottom: 2px;
        }
        
        .price-current {
          font-size: 20px;
          font-weight: 700;
          color: var(--color-primary);
        }
        
        .price-current.discounted {
          color: var(--color-error);
        }
        
        .price-unit {
          font-size: 14px;
          color: var(--color-text-muted);
          margin-left: var(--spacing-xs);
        }
        
        .discount-badge {
          background: var(--color-error);
          color: white;
          padding: 2px var(--spacing-xs);
          border-radius: var(--radius-sm);
          font-size: 12px;
          font-weight: 600;
        }
        
        .tour-actions {
          display: flex;
          gap: var(--spacing-sm);
        }
        
        .tour-card.grid .tour-actions {
          flex-direction: column;
        }
        
        .tour-card.list .tour-actions {
          flex-direction: row;
        }
        
        .action-btn {
          padding: var(--spacing-sm) var(--spacing-md);
          border-radius: var(--radius-sm);
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 200ms ease-out;
          text-align: center;
          min-height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
        }
        
        .action-btn-primary {
          background: var(--color-accent);
          color: var(--color-primary);
          border: none;
          flex: 1;
        }
        
        .action-btn-primary:hover {
          background: #e6a200;
        }
        
        .action-btn-primary:disabled {
          background: var(--color-text-muted);
          color: white;
          cursor: not-allowed;
        }
        
        .action-btn-secondary {
          background: transparent;
          color: var(--color-primary);
          border: 1px solid var(--color-primary);
          flex: 1;
        }
        
        .action-btn-secondary:hover {
          background: var(--color-primary);
          color: white;
        }
        
        .sold-out-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          font-weight: 600;
          color: var(--color-text-muted);
          opacity: 0;
          transition: opacity 200ms ease;
        }
        
        .tour-card.sold-out .sold-out-overlay {
          opacity: 1;
        }
        
        .compare-checkbox {
          position: absolute;
          bottom: var(--spacing-sm);
          right: var(--spacing-sm);
          width: 24px;
          height: 24px;
          border: 2px solid var(--color-primary);
          border-radius: 4px;
          background: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: all 200ms ease;
        }
        
        .tour-card.hovered .compare-checkbox {
          opacity: 1;
        }
        
        .compare-checkbox.checked {
          background: var(--color-primary);
          color: white;
          opacity: 1;
        }
        
        .icon {
          width: 16px;
          height: 16px;
        }
        
        .icon-sm {
          width: 12px;
          height: 12px;
        }
        
        .urgency-banner {
          position: absolute;
          top: var(--spacing-sm);
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(90deg, #ff4444, #ff6b6b);
          color: white;
          padding: 4px var(--spacing-sm);
          border-radius: var(--radius-sm);
          font-size: 11px;
          font-weight: 600;
          text-align: center;
          z-index: 2;
          opacity: 0;
          animation: slideDown 300ms ease-out forwards;
          box-shadow: 0 2px 8px rgba(255, 68, 68, 0.3);
        }
        
        @keyframes slideDown {
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
          from {
            transform: translateX(-50%) translateY(-10px);
          }
        }
        
        .social-proof {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          margin-top: 4px;
          font-size: 12px;
          color: var(--color-success);
          font-weight: 500;
        }
        
        .social-proof-icon {
          width: 12px;
          height: 12px;
          color: var(--color-success);
        }
        
        .action-btn-primary {
          position: relative;
          overflow: hidden;
        }
        
        .action-btn-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }
        
        .action-btn-primary:hover::before {
          left: 100%;
        }
        
        .special-offer-badge {
          position: absolute;
          top: -8px;
          right: -8px;
          background: #ff4444;
          color: white;
          padding: 2px 6px;
          border-radius: 10px;
          font-size: 10px;
          font-weight: 600;
          transform: rotate(15deg);
          z-index: 3;
        }
        
        .tour-actions.enhanced {
          position: relative;
        }
      `}</style>
      
      {/* Image Container */}
      <div className="image-container">
        {!isImageLoaded && !imageError && <div className="image-skeleton"></div>}
        {imageError && (
          <div className="image-fallback">
            <div className="fallback-content">
              <svg className="fallback-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21,15 16,10 5,21"></polyline>
              </svg>
              <span className="fallback-text">{tour.destination}</span>
            </div>
          </div>
        )}
        <img
          src={tour.image}
          alt={tour.title}
          className="tour-image"
          onLoad={() => {
            console.log('Image loaded successfully:', tour.image)
            setIsImageLoaded(true)
            setImageError(false)
          }}
          onError={(e) => {
            console.log('Image failed to load:', tour.image, e)
            setImageError(true)
            setIsImageLoaded(false)
          }}
          style={{ 
            display: imageError ? 'none' : 'block',
            opacity: isImageLoaded ? 1 : 0.7,
            transition: 'opacity 0.3s ease'
          }}
        />
        
        {/* Urgency Banner */}
        {getUrgencyMessage() && (
          <div className="urgency-banner">
            {getUrgencyMessage()}
          </div>
        )}
        
        {/* Badges */}
        <div className="badges">
          {tour.discount && (
            <div className="badge badge-discount">-{tour.discount}%</div>
          )}
          {tour.badges.includes('ยอดนิยม') && (
            <div className="badge badge-popular">ยอดนิยม</div>
          )}
          {tour.status === 'limited' && (
            <div className="badge badge-limited">เหลือน้อย</div>
          )}
          {tour.status === 'sold-out' && (
            <div className="badge badge-sold-out">เต็มแล้ว</div>
          )}
        </div>
        
        {/* Quick Actions */}
        <div className="quick-actions">
          <button
            className={`action-button ${isWishlisted ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation()
              setIsWishlisted(!isWishlisted)
            }}
            aria-label="บันทึก"
          >
            <svg className="icon" viewBox="0 0 24 24" fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
          
          <button
            className="action-button"
            onClick={(e) => {
              e.stopPropagation()
              onQuickView()
            }}
            aria-label="ดูรายละเอียดด่วน"
          >
            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </button>
          
          <button
            className="action-button"
            onClick={(e) => {
              e.stopPropagation()
              // Share functionality
            }}
            aria-label="แชร์"
          >
            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
            </svg>
          </button>
        </div>
        
        {/* Compare Checkbox */}
        <div 
          className={`compare-checkbox ${isCompared ? 'checked' : ''}`}
          onClick={(e) => {
            e.stopPropagation()
            onCompareToggle()
          }}
        >
          {isCompared && '✓'}
        </div>
        
        {/* Sold Out Overlay */}
        {tour.status === 'sold-out' && (
          <div className="sold-out-overlay">
            ทัวร์เต็มแล้ว
          </div>
        )}
      </div>
      
      {/* Card Content */}
      <div className="card-content">
        <h3 className="tour-title">{tour.title}</h3>
        <div className="tour-location">{tour.destination} • {tour.city}</div>
        
        <div className="tour-rating">
          <div className="stars">
            {renderStars(tour.rating)}
          </div>
          <span className="rating-text">
            {tour.rating.toFixed(1)} ({tour.reviewCount} รีวิว)
          </span>
          {tour.totalBookings && tour.totalBookings > 50 && (
            <div className="social-proof">
              <svg className="social-proof-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>มีคนจองแล้ว {tour.totalBookings}+ คน</span>
            </div>
          )}
        </div>
        
        <div className="tour-highlights">
          <div className="highlights-list">
            {tour.highlights.slice(0, 3).map((highlight, index) => (
              <span key={index} className="highlight-item">{highlight}</span>
            ))}
          </div>
        </div>
        
        <div className="tour-details">
          <div className="detail-item">
            <svg className="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12,6 12,12 16,14"></polyline>
            </svg>
            <span>{tour.duration}</span>
          </div>
          
          <div className="detail-item">
            <svg className="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            </svg>
            <span>{tour.airline}</span>
          </div>
          
          <div className="detail-item">
            <svg className="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span>{tour.departureMonths.join(', ')}</span>
          </div>
        </div>
        
        <div className="tour-price">
          <div className="price-row">
            <div className="price-info">
              {tour.originalPrice && (
                <div className="price-original">
                  {formatPrice(tour.originalPrice)} บาท
                </div>
              )}
              <div className={`price-current ${tour.discount ? 'discounted' : ''}`}>
                {formatPrice(tour.price)}
                <span className="price-unit">บาท/ท่าน</span>
              </div>
            </div>
            {tour.discount && (
              <div className="discount-badge">-{tour.discount}%</div>
            )}
          </div>
          
          <div className="tour-actions enhanced">
            <button
              className="action-btn action-btn-secondary"
              onClick={(e) => {
                e.stopPropagation()
                onQuickView()
              }}
            >
              ดูรายละเอียด & เปรียบเทียบ
            </button>
            
            <button
              className="action-btn action-btn-primary"
              disabled={tour.status === 'sold-out'}
              onClick={(e) => {
                e.stopPropagation()
                if (tour.status !== 'sold-out') {
                  setShowUpsellModal(true)
                }
              }}
            >
              {getPrimaryCTA()}
              {tour.specialOffers?.includes('limited-time') && (
                <div className="special-offer-badge">HOT</div>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Upsell Modal */}
      <UpsellModal 
        isOpen={showUpsellModal}
        onClose={() => setShowUpsellModal(false)}
        tourTitle={tour.title}
        basePrice={tour.price}
      />
    </div>
  )
}