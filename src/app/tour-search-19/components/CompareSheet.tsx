'use client'

import { useEffect } from 'react'

interface CompareSheetProps {
  isOpen: boolean
  tours: any[]
  onClose: () => void
}

export default function CompareSheet({ isOpen, tours, onClose }: CompareSheetProps) {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const formatPrice = (price: number) => {
    return price.toLocaleString()
  }

  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    
    for (let i = 0; i < fullStars; i++) {
      stars.push('★')
    }
    
    if (hasHalfStar) {
      stars.push('½')
    }
    
    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push('☆')
    }
    
    return stars.join('')
  }

  return (
    <div className="compare-sheet-overlay">
      <style jsx>{`
        .compare-sheet-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--spacing-lg);
        }
        
        .compare-sheet {
          background: var(--color-bg);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-md);
          max-width: 90vw;
          max-height: 90vh;
          width: 100%;
          display: flex;
          flex-direction: column;
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
        
        .compare-header {
          padding: var(--spacing-lg);
          border-bottom: 1px solid var(--color-border);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .compare-title {
          font-size: 20px;
          font-weight: 600;
          color: var(--color-text);
          margin: 0;
        }
        
        .close-button {
          width: 40px;
          height: 40px;
          border: none;
          background: transparent;
          cursor: pointer;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 150ms ease;
        }
        
        .close-button:hover {
          background: var(--color-bg-soft);
        }
        
        .compare-content {
          flex: 1;
          overflow: auto;
          padding: var(--spacing-lg);
        }
        
        .compare-table {
          width: 100%;
          border-collapse: collapse;
          border-spacing: 0;
        }
        
        .table-header {
          position: sticky;
          top: 0;
          background: var(--color-bg-soft);
          z-index: 10;
        }
        
        .table-cell {
          padding: var(--spacing-md);
          border: 1px solid var(--color-border);
          vertical-align: top;
        }
        
        .table-header .table-cell {
          font-weight: 600;
          color: var(--color-text);
          text-align: center;
        }
        
        .row-label {
          background: var(--color-bg-soft);
          font-weight: 600;
          color: var(--color-text);
          white-space: nowrap;
          width: 140px;
        }
        
        .tour-column {
          min-width: 200px;
          text-align: center;
        }
        
        .tour-image {
          width: 100%;
          height: 120px;
          object-fit: cover;
          border-radius: var(--radius-sm);
          margin-bottom: var(--spacing-sm);
        }
        
        .tour-title {
          font-size: 14px;
          font-weight: 600;
          color: var(--color-text);
          margin-bottom: var(--spacing-xs);
          line-height: 1.3;
        }
        
        .tour-location {
          font-size: 12px;
          color: var(--color-text-muted);
        }
        
        .price-cell {
          text-align: center;
        }
        
        .price-current {
          font-size: 18px;
          font-weight: 700;
          color: var(--color-primary);
        }
        
        .price-current.discounted {
          color: var(--color-error);
        }
        
        .price-original {
          font-size: 14px;
          color: var(--color-text-muted);
          text-decoration: line-through;
          margin-bottom: 4px;
        }
        
        .price-unit {
          font-size: 12px;
          color: var(--color-text-muted);
          display: block;
          margin-top: 2px;
        }
        
        .rating-cell {
          text-align: center;
        }
        
        .rating-stars {
          color: var(--color-accent);
          font-size: 16px;
          margin-bottom: 4px;
        }
        
        .rating-text {
          font-size: 12px;
          color: var(--color-text-muted);
        }
        
        .highlights-cell {
          text-align: left;
        }
        
        .highlight-item {
          font-size: 12px;
          color: var(--color-text);
          margin-bottom: 4px;
          display: flex;
          align-items: flex-start;
          gap: 4px;
        }
        
        .highlight-item::before {
          content: '•';
          color: var(--color-primary);
          flex-shrink: 0;
        }
        
        .duration-cell,
        .airline-cell,
        .departure-cell {
          text-align: center;
          font-size: 14px;
          color: var(--color-text);
        }
        
        .action-cell {
          text-align: center;
        }
        
        .book-button {
          padding: var(--spacing-sm) var(--spacing-md);
          background: var(--color-accent);
          color: var(--color-primary);
          border: none;
          border-radius: var(--radius-sm);
          font-weight: 600;
          cursor: pointer;
          transition: background-color 200ms ease;
          width: 100%;
        }
        
        .book-button:hover {
          background: #e6a200;
        }
        
        .book-button:disabled {
          background: var(--color-text-muted);
          color: white;
          cursor: not-allowed;
        }
        
        .compare-actions {
          padding: var(--spacing-lg);
          border-top: 1px solid var(--color-border);
          text-align: center;
        }
        
        .close-compare-btn {
          padding: var(--spacing-sm) var(--spacing-xl);
          background: var(--color-primary);
          color: white;
          border: none;
          border-radius: var(--radius-sm);
          font-weight: 600;
          cursor: pointer;
          transition: background-color 200ms ease;
        }
        
        .close-compare-btn:hover {
          background: #0a1a35;
        }
        
        .no-tours-message {
          text-align: center;
          padding: var(--spacing-3xl);
          color: var(--color-text-muted);
        }
        
        /* Mobile responsive table */
        @media (max-width: 767px) {
          .compare-sheet {
            margin: 0;
            border-radius: 0;
            max-height: 100vh;
          }
          
          .compare-content {
            overflow-x: auto;
          }
          
          .compare-table {
            min-width: 600px;
          }
          
          .tour-column {
            min-width: 160px;
          }
          
          .row-label {
            position: sticky;
            left: 0;
            z-index: 5;
            width: 120px;
          }
        }
        
        .icon {
          width: 24px;
          height: 24px;
        }
      `}</style>
      
      <div className="compare-sheet">
        <div className="compare-header">
          <h2 className="compare-title">เปรียบเทียบทัวร์</h2>
          <button className="close-button" onClick={onClose} aria-label="ปิดการเปรียบเทียบ">
            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div className="compare-content">
          {tours.length === 0 ? (
            <div className="no-tours-message">
              ไม่มีทัวร์ในการเปรียบเทียบ
            </div>
          ) : (
            <table className="compare-table">
              <thead className="table-header">
                <tr>
                  <th className="table-cell row-label">รายการ</th>
                  {tours.map((tour) => (
                    <th key={tour.id} className="table-cell tour-column">
                      <img
                        src={tour.image}
                        alt={tour.title}
                        className="tour-image"
                      />
                      <div className="tour-title">{tour.title}</div>
                      <div className="tour-location">{tour.destination} • {tour.city}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              
              <tbody>
                {/* Price Row */}
                <tr>
                  <td className="table-cell row-label">ราคา</td>
                  {tours.map((tour) => (
                    <td key={`price-${tour.id}`} className="table-cell price-cell">
                      {tour.originalPrice && (
                        <div className="price-original">
                          {formatPrice(tour.originalPrice)} บาท
                        </div>
                      )}
                      <div className={`price-current ${tour.discount ? 'discounted' : ''}`}>
                        {formatPrice(tour.price)}
                      </div>
                      <span className="price-unit">บาท/ท่าน</span>
                    </td>
                  ))}
                </tr>
                
                {/* Duration Row */}
                <tr>
                  <td className="table-cell row-label">ระยะเวลา</td>
                  {tours.map((tour) => (
                    <td key={`duration-${tour.id}`} className="table-cell duration-cell">
                      {tour.duration}
                    </td>
                  ))}
                </tr>
                
                {/* Rating Row */}
                <tr>
                  <td className="table-cell row-label">เรตติ้ง</td>
                  {tours.map((tour) => (
                    <td key={`rating-${tour.id}`} className="table-cell rating-cell">
                      <div className="rating-stars">
                        {renderStars(tour.rating)}
                      </div>
                      <div className="rating-text">
                        {tour.rating.toFixed(1)} ({tour.reviewCount} รีวิว)
                      </div>
                    </td>
                  ))}
                </tr>
                
                {/* Highlights Row */}
                <tr>
                  <td className="table-cell row-label">ไฮไลต์</td>
                  {tours.map((tour) => (
                    <td key={`highlights-${tour.id}`} className="table-cell highlights-cell">
                      {tour.highlights.map((highlight: string, index: number) => (
                        <div key={index} className="highlight-item">
                          {highlight}
                        </div>
                      ))}
                    </td>
                  ))}
                </tr>
                
                {/* Airline Row */}
                <tr>
                  <td className="table-cell row-label">สายการบิน</td>
                  {tours.map((tour) => (
                    <td key={`airline-${tour.id}`} className="table-cell airline-cell">
                      {tour.airline}
                    </td>
                  ))}
                </tr>
                
                {/* Departure Months Row */}
                <tr>
                  <td className="table-cell row-label">เดือนออกเดินทาง</td>
                  {tours.map((tour) => (
                    <td key={`departure-${tour.id}`} className="table-cell departure-cell">
                      {tour.departureMonths.join(', ')}
                    </td>
                  ))}
                </tr>
                
                {/* Action Row */}
                <tr>
                  <td className="table-cell row-label">การดำเนินการ</td>
                  {tours.map((tour) => (
                    <td key={`action-${tour.id}`} className="table-cell action-cell">
                      <button
                        className="book-button"
                        disabled={tour.status === 'sold-out'}
                        onClick={() => {
                          // Handle booking
                          console.log('Book tour:', tour.id)
                        }}
                      >
                        {tour.status === 'sold-out' ? 'เต็มแล้ว' : 'จองเลย'}
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          )}
        </div>
        
        <div className="compare-actions">
          <button className="close-compare-btn" onClick={onClose}>
            ปิดการเปรียบเทียบ
          </button>
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