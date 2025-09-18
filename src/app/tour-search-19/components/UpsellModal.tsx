'use client'

import { useState } from 'react'

interface UpsellModalProps {
  isOpen: boolean
  onClose: () => void
  tourTitle: string
  basePrice: number
}

const upsellOffers = [
  {
    id: 1,
    title: 'ประกันเดินทาง Premium',
    description: 'คุ้มครองสูงสุด 2,000,000 บาท รวมความเสี่ยงจากโควิด-19',
    price: 1500,
    originalPrice: 2500,
    discount: 40,
    popular: true
  },
  {
    id: 2,
    title: 'Private Guide Service',
    description: 'ไกด์ส่วนตัวพูดไทยคล่อง บริการ VIP ตลอดการเดินทาง',
    price: 8500,
    originalPrice: 12000,
    discount: 29
  },
  {
    id: 3,
    title: 'Airport Lounge Access',
    description: 'เข้าใช้ลานจ์สนามบินฟรี ทั้งไป-กลับ รวมอาหารเครื่องดื่ม',
    price: 2200,
    originalPrice: 3500,
    discount: 37
  },
  {
    id: 4,
    title: 'Room Upgrade (Suite)',
    description: 'อัพเกรดห้องพักเป็น Junior Suite พร้อมวิวพิเศษ',
    price: 4500,
    originalPrice: 7500,
    discount: 40
  }
]

export default function UpsellModal({ isOpen, onClose, tourTitle, basePrice }: UpsellModalProps) {
  const [selectedOffers, setSelectedOffers] = useState<number[]>([])

  if (!isOpen) return null

  const toggleOffer = (offerId: number) => {
    setSelectedOffers(prev => 
      prev.includes(offerId) 
        ? prev.filter(id => id !== offerId)
        : [...prev, offerId]
    )
  }

  const getTotalUpgrade = () => {
    return selectedOffers.reduce((total, offerId) => {
      const offer = upsellOffers.find(o => o.id === offerId)
      return total + (offer?.price || 0)
    }, 0)
  }

  const getTotalDiscount = () => {
    return selectedOffers.reduce((total, offerId) => {
      const offer = upsellOffers.find(o => o.id === offerId)
      const discount = (offer?.originalPrice || 0) - (offer?.price || 0)
      return total + discount
    }, 0)
  }

  return (
    <div className="upsell-modal-overlay">
      <style jsx>{`
        .upsell-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          z-index: 200;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--spacing-lg);
        }
        
        .upsell-modal {
          background: var(--color-bg);
          border-radius: var(--radius-md);
          max-width: 600px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: var(--shadow-md);
          animation: slideIn 300ms ease-out;
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        .modal-header {
          padding: var(--spacing-lg);
          border-bottom: 1px solid var(--color-border);
          background: linear-gradient(135deg, var(--color-primary), #1a2951);
          color: white;
          border-radius: var(--radius-md) var(--radius-md) 0 0;
        }
        
        .modal-title {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: var(--spacing-xs);
        }
        
        .modal-subtitle {
          font-size: 14px;
          opacity: 0.9;
        }
        
        .close-button {
          position: absolute;
          top: var(--spacing-lg);
          right: var(--spacing-lg);
          width: 32px;
          height: 32px;
          border: none;
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 150ms ease;
        }
        
        .close-button:hover {
          background: rgba(255, 255, 255, 0.3);
        }
        
        .modal-content {
          padding: var(--spacing-lg);
        }
        
        .offer-card {
          border: 2px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: var(--spacing-md);
          margin-bottom: var(--spacing-md);
          cursor: pointer;
          transition: all 200ms ease;
          position: relative;
        }
        
        .offer-card:hover {
          border-color: var(--color-primary);
          box-shadow: var(--shadow-sm);
        }
        
        .offer-card.selected {
          border-color: var(--color-accent);
          background: var(--color-bg-soft);
        }
        
        .offer-card.popular::before {
          content: 'ยอดนิยม';
          position: absolute;
          top: -8px;
          right: var(--spacing-md);
          background: var(--color-accent);
          color: var(--color-primary);
          padding: 4px var(--spacing-xs);
          border-radius: var(--radius-sm);
          font-size: 11px;
          font-weight: 600;
        }
        
        .offer-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: var(--spacing-sm);
        }
        
        .offer-title {
          font-size: 16px;
          font-weight: 600;
          color: var(--color-text);
        }
        
        .offer-description {
          font-size: 14px;
          color: var(--color-text-muted);
          margin-bottom: var(--spacing-sm);
          line-height: 1.4;
        }
        
        .offer-pricing {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }
        
        .offer-price {
          font-size: 18px;
          font-weight: 700;
          color: var(--color-primary);
        }
        
        .offer-original-price {
          font-size: 14px;
          color: var(--color-text-muted);
          text-decoration: line-through;
        }
        
        .offer-discount {
          background: var(--color-error);
          color: white;
          padding: 2px 6px;
          border-radius: var(--radius-sm);
          font-size: 12px;
          font-weight: 600;
        }
        
        .checkbox {
          width: 20px;
          height: 20px;
          border: 2px solid var(--color-border);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 150ms ease;
        }
        
        .checkbox.checked {
          background: var(--color-accent);
          border-color: var(--color-accent);
          color: var(--color-primary);
        }
        
        .modal-footer {
          padding: var(--spacing-lg);
          border-top: 1px solid var(--color-border);
          background: var(--color-bg-soft);
        }
        
        .pricing-summary {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-md);
          padding: var(--spacing-md);
          background: var(--color-bg);
          border-radius: var(--radius-sm);
          border: 1px solid var(--color-border);
        }
        
        .summary-left {
          flex: 1;
        }
        
        .summary-line {
          display: flex;
          justify-content: space-between;
          margin-bottom: 4px;
          font-size: 14px;
        }
        
        .summary-total {
          display: flex;
          justify-content: space-between;
          font-size: 18px;
          font-weight: 700;
          color: var(--color-primary);
          border-top: 1px solid var(--color-border);
          padding-top: var(--spacing-sm);
          margin-top: var(--spacing-sm);
        }
        
        .savings-badge {
          background: var(--color-success);
          color: white;
          padding: 4px var(--spacing-xs);
          border-radius: var(--radius-sm);
          font-size: 12px;
          font-weight: 600;
          margin-left: var(--spacing-sm);
        }
        
        .action-buttons {
          display: flex;
          gap: var(--spacing-md);
        }
        
        .action-btn {
          flex: 1;
          padding: var(--spacing-md);
          border-radius: var(--radius-sm);
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 200ms ease;
          min-height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .action-btn-primary {
          background: var(--color-accent);
          color: var(--color-primary);
          border: none;
        }
        
        .action-btn-primary:hover {
          background: #e6a200;
        }
        
        .action-btn-secondary {
          background: transparent;
          color: var(--color-text);
          border: 1px solid var(--color-border);
        }
        
        .action-btn-secondary:hover {
          background: var(--color-bg-soft);
        }
        
        .icon {
          width: 20px;
          height: 20px;
        }
      `}</style>
      
      <div className="upsell-modal">
        <div className="modal-header">
          <h2 className="modal-title">🎯 เพิ่มความพิเศษให้การเดินทาง</h2>
          <p className="modal-subtitle">{tourTitle}</p>
          <button className="close-button" onClick={onClose}>
            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div className="modal-content">
          {upsellOffers.map((offer) => (
            <div
              key={offer.id}
              className={`offer-card ${selectedOffers.includes(offer.id) ? 'selected' : ''} ${offer.popular ? 'popular' : ''}`}
              onClick={() => toggleOffer(offer.id)}
            >
              <div className="offer-header">
                <div>
                  <h3 className="offer-title">{offer.title}</h3>
                  <p className="offer-description">{offer.description}</p>
                </div>
                <div className={`checkbox ${selectedOffers.includes(offer.id) ? 'checked' : ''}`}>
                  {selectedOffers.includes(offer.id) && '✓'}
                </div>
              </div>
              
              <div className="offer-pricing">
                <span className="offer-price">+{offer.price.toLocaleString()} บาท</span>
                <span className="offer-original-price">{offer.originalPrice.toLocaleString()} บาท</span>
                <span className="offer-discount">-{offer.discount}%</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="modal-footer">
          <div className="pricing-summary">
            <div className="summary-left">
              <div className="summary-line">
                <span>ราคาทัวร์พื้นฐาน:</span>
                <span>{basePrice.toLocaleString()} บาท</span>
              </div>
              <div className="summary-line">
                <span>บริการเสริม ({selectedOffers.length} รายการ):</span>
                <span>+{getTotalUpgrade().toLocaleString()} บาท</span>
              </div>
              <div className="summary-total">
                <span>ราคารวม:</span>
                <span>
                  {(basePrice + getTotalUpgrade()).toLocaleString()} บาท
                  {getTotalDiscount() > 0 && (
                    <span className="savings-badge">
                      ประหยัด {getTotalDiscount().toLocaleString()}฿
                    </span>
                  )}
                </span>
              </div>
            </div>
          </div>
          
          <div className="action-buttons">
            <button className="action-btn action-btn-secondary" onClick={onClose}>
              จองแบบพื้นฐาน
            </button>
            <button className="action-btn action-btn-primary">
              จองพร้อมบริการเสริม
            </button>
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
      />
    </div>
  )
}