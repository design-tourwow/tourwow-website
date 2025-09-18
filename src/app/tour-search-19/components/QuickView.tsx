'use client'

import { useState, useEffect } from 'react'

interface QuickViewProps {
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
  }
  onClose: () => void
}

export default function QuickView({ tour, onClose }: QuickViewProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  // Mock additional images for slider
  const images = [
    tour.image,
    `https://picsum.photos/600/400?random=${tour.id + 1}`,
    `https://picsum.photos/600/400?random=${tour.id + 2}`,
    `https://picsum.photos/600/400?random=${tour.id + 3}`
  ]

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [onClose])

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

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="quick-view-overlay">
      <style jsx>{`
        .quick-view-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--spacing-lg);
        }
        
        .quick-view-modal {
          background: var(--color-bg);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-md);
          max-width: 800px;
          max-height: 90vh;
          width: 100%;
          display: flex;
          overflow: hidden;
          animation: fadeInScale 300ms ease-out;
        }
        
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @media (max-width: 767px) {
          .quick-view-modal {
            flex-direction: column;
            max-height: 95vh;
            margin: 0;
          }
        }
        
        .image-section {
          flex: 1;
          position: relative;
          min-height: 300px;
        }
        
        @media (max-width: 767px) {
          .image-section {
            flex: none;
            height: 250px;
          }
        }
        
        .image-slider {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        
        .slide-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 300ms ease;
        }
        
        .slider-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.9);
          border: none;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 200ms ease;
          z-index: 10;
        }
        
        .slider-nav:hover {
          background: white;
          transform: translateY(-50%) scale(1.1);
        }
        
        .slider-nav.prev {
          left: var(--spacing-md);
        }
        
        .slider-nav.next {
          right: var(--spacing-md);
        }
        
        .slide-indicators {
          position: absolute;
          bottom: var(--spacing-md);
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: var(--spacing-xs);
        }
        
        .indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          cursor: pointer;
          transition: background-color 200ms ease;
        }
        
        .indicator.active {
          background: white;
        }
        
        .badges {
          position: absolute;
          top: var(--spacing-md);
          left: var(--spacing-md);
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
        
        .close-button {
          position: absolute;
          top: var(--spacing-md);
          right: var(--spacing-md);
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.9);
          border: none;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 200ms ease;
          z-index: 10;
        }
        
        .close-button:hover {
          background: white;
          transform: scale(1.1);
        }
        
        .content-section {
          flex: 1;
          padding: var(--spacing-xl);
          display: flex;
          flex-direction: column;
          overflow-y: auto;
        }
        
        @media (max-width: 767px) {
          .content-section {
            padding: var(--spacing-lg);
          }
        }
        
        .tour-title {
          font-size: 20px;
          font-weight: 600;
          color: var(--color-text);
          margin-bottom: var(--spacing-xs);
          line-height: 1.3;
        }
        
        .tour-location {
          font-size: 16px;
          color: var(--color-text-muted);
          margin-bottom: var(--spacing-md);
        }
        
        .tour-rating {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          margin-bottom: var(--spacing-lg);
        }
        
        .stars {
          display: flex;
          color: var(--color-accent);
          font-size: 16px;
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
          margin-bottom: var(--spacing-lg);
        }
        
        .highlights-title {
          font-size: 16px;
          font-weight: 600;
          color: var(--color-text);
          margin-bottom: var(--spacing-sm);
        }
        
        .highlights-list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
        }
        
        .highlight-item {
          font-size: 14px;
          color: var(--color-text);
          display: flex;
          align-items: flex-start;
          gap: var(--spacing-xs);
        }
        
        .highlight-item::before {
          content: '✓';
          color: var(--color-success);
          font-weight: 600;
          flex-shrink: 0;
          margin-top: 1px;
        }
        
        .tour-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-lg);
          padding: var(--spacing-md);
          background: var(--color-bg-soft);
          border-radius: var(--radius-sm);
        }
        
        @media (max-width: 767px) {
          .tour-details {
            grid-template-columns: 1fr;
            gap: var(--spacing-sm);
          }
        }
        
        .detail-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          font-size: 14px;
          color: var(--color-text);
        }
        
        .detail-label {
          font-weight: 500;
          color: var(--color-text-muted);
        }
        
        .tour-price {
          margin-top: auto;
          padding-top: var(--spacing-lg);
          border-top: 1px solid var(--color-border);
        }
        
        .price-section {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: var(--spacing-lg);
        }
        
        .price-info {
          flex: 1;
        }
        
        .price-original {
          font-size: 16px;
          color: var(--color-text-muted);
          text-decoration: line-through;
          margin-bottom: 4px;
        }
        
        .price-current {
          font-size: 24px;
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
          padding: var(--spacing-xs) var(--spacing-sm);
          border-radius: var(--radius-sm);
          font-size: 14px;
          font-weight: 600;
        }
        
        .tour-actions {
          display: flex;
          gap: var(--spacing-sm);
        }
        
        .action-btn {
          flex: 1;
          padding: var(--spacing-md);
          border-radius: var(--radius-sm);
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 200ms ease-out;
          text-align: center;
          min-height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
        }
        
        .action-btn-primary {
          background: var(--color-accent);
          color: var(--color-primary);
          border: none;
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
        }
        
        .action-btn-secondary:hover {
          background: var(--color-primary);
          color: white;
        }
        
        .icon {
          width: 20px;
          height: 20px;
        }
        
        .icon-sm {
          width: 16px;
          height: 16px;
        }
      `}</style>
      
      <div className="quick-view-modal">
        {/* Image Section */}
        <div className="image-section">
          <div className="image-slider">
            <img
              src={images[currentImageIndex]}
              alt={tour.title}
              className="slide-image"
            />
            
            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button className="slider-nav prev" onClick={prevImage}>
                  <svg className="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <polyline points="15,18 9,12 15,6"></polyline>
                  </svg>
                </button>
                
                <button className="slider-nav next" onClick={nextImage}>
                  <svg className="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <polyline points="9,18 15,12 9,6"></polyline>
                  </svg>
                </button>
              </>
            )}
            
            {/* Slide Indicators */}
            {images.length > 1 && (
              <div className="slide-indicators">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
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
            </div>
            
            {/* Close Button */}
            <button className="close-button" onClick={onClose} aria-label="ปิด">
              <svg className="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="content-section">
          <h2 className="tour-title">{tour.title}</h2>
          <div className="tour-location">{tour.destination} • {tour.city}</div>
          
          <div className="tour-rating">
            <div className="stars">
              {renderStars(tour.rating)}
            </div>
            <span className="rating-text">
              {tour.rating.toFixed(1)} ({tour.reviewCount} รีวิว)
            </span>
          </div>
          
          <div className="tour-highlights">
            <h3 className="highlights-title">ไฮไลต์ทัวร์</h3>
            <div className="highlights-list">
              {tour.highlights.map((highlight, index) => (
                <div key={index} className="highlight-item">
                  {highlight}
                </div>
              ))}
            </div>
          </div>
          
          <div className="tour-details">
            <div className="detail-item">
              <svg className="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12,6 12,12 16,14"></polyline>
              </svg>
              <span className="detail-label">ระยะเวลา:</span>
              <span>{tour.duration}</span>
            </div>
            
            <div className="detail-item">
              <svg className="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              </svg>
              <span className="detail-label">สายการบิน:</span>
              <span>{tour.airline}</span>
            </div>
            
            <div className="detail-item">
              <svg className="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span className="detail-label">เดือนออกเดินทาง:</span>
              <span>{tour.departureMonths.join(', ')}</span>
            </div>
            
            <div className="detail-item">
              <svg className="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M12 1v6m0 6v6"></path>
                <path d="m21 12-6 0m-6 0-6 0"></path>
              </svg>
              <span className="detail-label">สถานะ:</span>
              <span>{tour.status === 'available' ? 'พร้อมเดินทาง' : tour.status === 'limited' ? 'ที่นั่งเหลือน้อย' : 'เต็มแล้ว'}</span>
            </div>
          </div>
          
          <div className="tour-price">
            <div className="price-section">
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
            
            <div className="tour-actions">
              <button
                className="action-btn action-btn-secondary"
                onClick={() => {
                  onClose()
                  // Navigate to full details page
                  window.open(`/tours/${tour.id}`, '_blank')
                }}
              >
                ดูรายละเอียดเต็ม
              </button>
              
              <button
                className="action-btn action-btn-primary"
                disabled={tour.status === 'sold-out'}
                onClick={() => {
                  onClose()
                  // Handle booking
                  console.log('Book tour:', tour.id)
                }}
              >
                {tour.status === 'sold-out' ? 'แจ้งเตือนรอบใหม่' : 'จองเลย'}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Backdrop */}
      <div 
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1
        }}
        onClick={onClose}
      ></div>
    </div>
  )
}