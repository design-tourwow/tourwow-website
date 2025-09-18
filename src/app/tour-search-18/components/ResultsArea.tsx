'use client'

import { useState, useEffect, useRef } from 'react'
import TourCard from './TourCard'

interface ResultsAreaProps {
  tours: any[]
  loading: boolean
  viewMode: 'grid' | 'list'
  compareList: any[]
  onCompareToggle: (tour: any) => void
  onQuickView: (tour: any) => void
}

// Skeleton component for loading state
const TourCardSkeleton = ({ viewMode }: { viewMode: 'grid' | 'list' }) => (
  <div className={`skeleton-card ${viewMode}`}>
    <style jsx>{`
      .skeleton-card {
        background: var(--color-bg);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        overflow: hidden;
      }
      
      .skeleton-card.grid {
        display: flex;
        flex-direction: column;
      }
      
      .skeleton-card.list {
        display: flex;
        flex-direction: row;
        min-height: 200px;
      }
      
      @media (max-width: 767px) {
        .skeleton-card.list {
          flex-direction: column;
        }
      }
      
      .skeleton-image {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: loading 1.5s infinite;
      }
      
      .skeleton-card.grid .skeleton-image {
        aspect-ratio: 16/9;
      }
      
      .skeleton-card.list .skeleton-image {
        width: 280px;
        flex-shrink: 0;
      }
      
      @media (max-width: 767px) {
        .skeleton-card.list .skeleton-image {
          width: 100%;
          aspect-ratio: 16/9;
        }
      }
      
      .skeleton-content {
        padding: var(--spacing-md);
        flex: 1;
      }
      
      .skeleton-card.list .skeleton-content {
        padding: var(--spacing-lg);
      }
      
      .skeleton-line {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: loading 1.5s infinite;
        border-radius: 4px;
        margin-bottom: var(--spacing-sm);
      }
      
      .skeleton-line:last-child {
        margin-bottom: 0;
      }
      
      .skeleton-line.title {
        height: 20px;
        width: 80%;
      }
      
      .skeleton-line.subtitle {
        height: 16px;
        width: 60%;
      }
      
      .skeleton-line.text {
        height: 14px;
        width: 90%;
      }
      
      .skeleton-line.short {
        height: 14px;
        width: 40%;
      }
      
      .skeleton-line.price {
        height: 24px;
        width: 50%;
        margin-top: var(--spacing-md);
      }
      
      @keyframes loading {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
    `}</style>
    
    <div className="skeleton-image"></div>
    <div className="skeleton-content">
      <div className="skeleton-line title"></div>
      <div className="skeleton-line subtitle"></div>
      <div className="skeleton-line text"></div>
      <div className="skeleton-line short"></div>
      <div className="skeleton-line price"></div>
    </div>
  </div>
)

// Empty state component
const EmptyState = () => (
  <div className="empty-state">
    <style jsx>{`
      .empty-state {
        text-align: center;
        padding: var(--spacing-3xl) var(--spacing-lg);
        background: var(--color-bg);
        border-radius: var(--radius-md);
        border: 1px solid var(--color-border);
      }
      
      .empty-icon {
        width: 64px;
        height: 64px;
        margin: 0 auto var(--spacing-lg);
        color: var(--color-text-muted);
      }
      
      .empty-title {
        font-size: 20px;
        font-weight: 600;
        color: var(--color-text);
        margin-bottom: var(--spacing-sm);
      }
      
      .empty-message {
        color: var(--color-text-muted);
        margin-bottom: var(--spacing-lg);
        line-height: 1.5;
      }
      
      .popular-destinations {
        display: flex;
        flex-wrap: wrap;
        gap: var(--spacing-sm);
        justify-content: center;
        margin-top: var(--spacing-lg);
      }
      
      .destination-chip {
        padding: var(--spacing-xs) var(--spacing-md);
        background: var(--color-bg-soft);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-sm);
        cursor: pointer;
        transition: all 150ms ease;
        font-size: 14px;
        color: var(--color-text);
      }
      
      .destination-chip:hover {
        background: var(--color-primary);
        color: white;
        border-color: var(--color-primary);
      }
      
      .clear-filters-btn {
        padding: var(--spacing-sm) var(--spacing-lg);
        background: var(--color-accent);
        color: var(--color-primary);
        border: none;
        border-radius: var(--radius-sm);
        font-weight: 600;
        cursor: pointer;
        transition: background-color 200ms ease;
      }
      
      .clear-filters-btn:hover {
        background: #e6a200;
      }
    `}</style>
    
    <svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.35-4.35"></path>
    </svg>
    
    <h3 className="empty-title">ไม่พบทัวร์ที่ตรงกับการค้นหา</h3>
    <p className="empty-message">
      ลองปรับเปลี่ยนเงื่อนไขการค้นหาหรือดูจุดหมายยอดนิยมด้านล่าง
    </p>
    
    <button className="clear-filters-btn">
      ล้างฟิลเตอร์ทั้งหมด
    </button>
    
    <div className="popular-destinations">
      {['ญี่ปุ่น', 'เกาหลีใต้', 'ไต้หวัน', 'สิงคโปร์', 'ยุโรป'].map(dest => (
        <button key={dest} className="destination-chip">
          {dest}
        </button>
      ))}
    </div>
  </div>
)

// Error state component
const ErrorState = ({ onRetry }: { onRetry: () => void }) => (
  <div className="error-state">
    <style jsx>{`
      .error-state {
        text-align: center;
        padding: var(--spacing-3xl) var(--spacing-lg);
        background: var(--color-bg);
        border-radius: var(--radius-md);
        border: 1px solid var(--color-border);
      }
      
      .error-icon {
        width: 64px;
        height: 64px;
        margin: 0 auto var(--spacing-lg);
        color: var(--color-error);
      }
      
      .error-title {
        font-size: 20px;
        font-weight: 600;
        color: var(--color-text);
        margin-bottom: var(--spacing-sm);
      }
      
      .error-message {
        color: var(--color-text-muted);
        margin-bottom: var(--spacing-lg);
        line-height: 1.5;
      }
      
      .retry-btn {
        padding: var(--spacing-sm) var(--spacing-lg);
        background: var(--color-primary);
        color: white;
        border: none;
        border-radius: var(--radius-sm);
        font-weight: 600;
        cursor: pointer;
        transition: background-color 200ms ease;
      }
      
      .retry-btn:hover {
        background: #0a1a35;
      }
    `}</style>
    
    <svg className="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="15" y1="9" x2="9" y2="15"></line>
      <line x1="9" y1="9" x2="15" y2="15"></line>
    </svg>
    
    <h3 className="error-title">เกิดข้อผิดพลาด</h3>
    <p className="error-message">
      ไม่สามารถโหลดข้อมูลทัวร์ได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง
    </p>
    
    <button className="retry-btn" onClick={onRetry}>
      ลองอีกครั้ง
    </button>
  </div>
)

export default function ResultsArea({
  tours,
  loading,
  viewMode,
  compareList,
  onCompareToggle,
  onQuickView
}: ResultsAreaProps) {
  const [displayedTours, setDisplayedTours] = useState<any[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState(false)
  const observerRef = useRef<HTMLDivElement>(null)

  const TOURS_PER_PAGE = 12

  // Initialize displayed tours
  useEffect(() => {
    if (tours.length > 0) {
      setDisplayedTours(tours.slice(0, TOURS_PER_PAGE))
      setHasMore(tours.length > TOURS_PER_PAGE)
      setError(false)
    }
  }, [tours])

  // Infinite scroll observer
  useEffect(() => {
    if (!observerRef.current || loading || !hasMore) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingMore) {
          loadMore()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(observerRef.current)
    return () => observer.disconnect()
  }, [hasMore, loadingMore, loading])

  const loadMore = () => {
    if (loadingMore || !hasMore) return

    setLoadingMore(true)
    
    // Simulate API call delay
    setTimeout(() => {
      const currentLength = displayedTours.length
      const nextTours = tours.slice(currentLength, currentLength + TOURS_PER_PAGE)
      
      setDisplayedTours(prev => [...prev, ...nextTours])
      setHasMore(currentLength + nextTours.length < tours.length)
      setLoadingMore(false)
    }, 1000)
  }

  const handleRetry = () => {
    setError(false)
    setDisplayedTours(tours.slice(0, TOURS_PER_PAGE))
    setHasMore(tours.length > TOURS_PER_PAGE)
  }

  if (error) {
    return <ErrorState onRetry={handleRetry} />
  }

  if (!loading && tours.length === 0) {
    return <EmptyState />
  }

  return (
    <div className="results-area">
      <style jsx>{`
        .results-area {
          flex: 1;
        }
        
        .results-grid {
          display: grid;
          gap: var(--spacing-lg);
          margin-bottom: var(--spacing-xl);
        }
        
        .results-grid.grid {
          grid-template-columns: 1fr;
        }
        
        @media (min-width: 768px) {
          .results-grid.grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (min-width: 1200px) {
          .results-grid.grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        
        .results-grid.list {
          grid-template-columns: 1fr;
        }
        
        .loading-more {
          text-align: center;
          padding: var(--spacing-lg);
          color: var(--color-text-muted);
        }
        
        .loading-spinner {
          width: 32px;
          height: 32px;
          border: 3px solid var(--color-border);
          border-top: 3px solid var(--color-primary);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto var(--spacing-sm);
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .load-more-button {
          display: block;
          margin: var(--spacing-lg) auto;
          padding: var(--spacing-md) var(--spacing-xl);
          background: var(--color-primary);
          color: white;
          border: none;
          border-radius: var(--radius-sm);
          font-weight: 600;
          cursor: pointer;
          transition: background-color 200ms ease;
        }
        
        .load-more-button:hover {
          background: #0a1a35;
        }
        
        .load-more-button:disabled {
          background: var(--color-text-muted);
          cursor: not-allowed;
        }
        
        .slow-network-notice {
          background: var(--color-info);
          color: white;
          padding: var(--spacing-sm) var(--spacing-md);
          border-radius: var(--radius-sm);
          margin-bottom: var(--spacing-lg);
          text-align: center;
          font-size: 14px;
        }
      `}</style>
      
      {/* Slow network notice */}
      {loading && (
        <div className="slow-network-notice">
          อินเทอร์เน็ตช้า กำลังโหลดรูป...
        </div>
      )}

      {/* Results Grid */}
      <div className={`results-grid ${viewMode}`}>
        {/* Show skeletons during initial loading */}
        {loading && displayedTours.length === 0 && (
          Array.from({ length: 6 }, (_, i) => (
            <TourCardSkeleton key={`skeleton-${i}`} viewMode={viewMode} />
          ))
        )}
        
        {/* Show actual tour cards */}
        {displayedTours.map((tour) => (
          <TourCard
            key={tour.id}
            tour={tour}
            viewMode={viewMode}
            isCompared={compareList.some(t => t.id === tour.id)}
            onCompareToggle={() => onCompareToggle(tour)}
            onQuickView={() => onQuickView(tour)}
          />
        ))}
        
        {/* Show skeleton cards during load more */}
        {loadingMore && (
          Array.from({ length: 3 }, (_, i) => (
            <TourCardSkeleton key={`loading-skeleton-${i}`} viewMode={viewMode} />
          ))
        )}
      </div>

      {/* Infinite scroll trigger */}
      <div ref={observerRef} style={{ height: '20px' }} />

      {/* Load more button (fallback) */}
      {hasMore && !loading && !loadingMore && (
        <button
          className="load-more-button"
          onClick={loadMore}
          disabled={loadingMore}
        >
          ดูเพิ่มเติม
        </button>
      )}

      {/* Loading more indicator */}
      {loadingMore && (
        <div className="loading-more">
          <div className="loading-spinner"></div>
          <div>กำลังโหลดเพิ่มเติม...</div>
        </div>
      )}
    </div>
  )
}