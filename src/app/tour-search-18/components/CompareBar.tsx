'use client'

interface CompareBarProps {
  compareList: any[]
  onCompare: () => void
  onClear: () => void
}

export default function CompareBar({ compareList, onCompare, onClear }: CompareBarProps) {
  if (compareList.length === 0) return null

  return (
    <div className="compare-bar">
      <style jsx>{`
        .compare-bar {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: var(--color-bg);
          border-top: 1px solid var(--color-border);
          box-shadow: 0 -4px 20px rgba(0,0,0,0.1);
          padding: var(--spacing-md);
          z-index: 50;
          transform: translateY(100%);
          animation: slideUp 300ms ease-out forwards;
        }
        
        @keyframes slideUp {
          to {
            transform: translateY(0);
          }
        }
        
        .compare-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
        }
        
        .compare-count {
          font-weight: 600;
          color: var(--color-text);
          white-space: nowrap;
        }
        
        .compare-items {
          flex: 1;
          display: flex;
          gap: var(--spacing-sm);
          overflow-x: auto;
          padding: var(--spacing-xs) 0;
        }
        
        .compare-item {
          background: var(--color-bg-soft);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          padding: var(--spacing-xs);
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          white-space: nowrap;
          min-width: 140px;
          position: relative;
        }
        
        .item-image {
          width: 32px;
          height: 24px;
          object-fit: cover;
          border-radius: 4px;
          flex-shrink: 0;
        }
        
        .item-title {
          font-size: 12px;
          color: var(--color-text);
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .remove-item {
          width: 20px;
          height: 20px;
          border: none;
          background: var(--color-error);
          color: white;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          transition: all 150ms ease;
          flex-shrink: 0;
        }
        
        .remove-item:hover {
          background: #b71c1c;
          transform: scale(1.1);
        }
        
        .compare-actions {
          display: flex;
          gap: var(--spacing-sm);
          align-items: center;
        }
        
        .compare-btn {
          padding: var(--spacing-sm) var(--spacing-lg);
          border-radius: var(--radius-sm);
          font-weight: 600;
          cursor: pointer;
          transition: all 200ms ease-out;
          white-space: nowrap;
          min-height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .compare-btn-primary {
          background: var(--color-accent);
          color: var(--color-primary);
          border: none;
        }
        
        .compare-btn-primary:hover {
          background: #e6a200;
        }
        
        .compare-btn-secondary {
          background: transparent;
          color: var(--color-text-muted);
          border: 1px solid var(--color-border);
        }
        
        .compare-btn-secondary:hover {
          background: var(--color-bg-soft);
          color: var(--color-text);
        }
        
        .max-items-notice {
          font-size: 12px;
          color: var(--color-text-muted);
          text-align: center;
          margin-top: var(--spacing-xs);
        }
        
        @media (max-width: 767px) {
          .compare-content {
            flex-direction: column;
            gap: var(--spacing-sm);
          }
          
          .compare-count {
            align-self: flex-start;
          }
          
          .compare-items {
            width: 100%;
          }
          
          .compare-actions {
            width: 100%;
            justify-content: space-between;
          }
          
          .compare-btn {
            flex: 1;
          }
        }
      `}</style>
      
      <div className="compare-content">
        <div className="compare-count">
          เปรียบเทียบ ({compareList.length}/4)
        </div>
        
        <div className="compare-items">
          {compareList.map((tour) => (
            <div key={tour.id} className="compare-item">
              <img
                src={tour.image}
                alt={tour.title}
                className="item-image"
              />
              <div className="item-title">{tour.title}</div>
              <button
                className="remove-item"
                onClick={() => {
                  // Remove this specific tour from compare list
                  const event = new CustomEvent('removeFromCompare', { detail: tour.id })
                  document.dispatchEvent(event)
                }}
                aria-label={`ลบ ${tour.title} จากการเปรียบเทียบ`}
              >
                ×
              </button>
            </div>
          ))}
        </div>
        
        <div className="compare-actions">
          <button
            className="compare-btn compare-btn-secondary"
            onClick={onClear}
          >
            ล้างทั้งหมด
          </button>
          
          <button
            className="compare-btn compare-btn-primary"
            onClick={onCompare}
            disabled={compareList.length < 2}
          >
            เปรียบเทียบตอนนี้
          </button>
        </div>
      </div>
      
      {compareList.length >= 4 && (
        <div className="max-items-notice">
          เปรียบเทียบได้สูงสุด 4 รายการ
        </div>
      )}
    </div>
  )
}