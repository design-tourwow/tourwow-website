'use client'

import { useState, useEffect } from 'react'

interface FilterDrawerProps {
  isOpen: boolean
  filters: {
    countries: string[]
    months: string[]
    tourTypes: string[]
    airlines: string[]
    features: string[]
  }
  onClose: () => void
  onApply: (filters: any) => void
}

const filterData = {
  countries: [
    'ญี่ปุ่น', 'เกาหลีใต้', 'ไต้หวัน', 'สิงคโปร์', 'มาเลเซีย', 
    'ฮ่องกง', 'จีน', 'เวียดนาม', 'กัมพูชา', 'ลาว', 'พม่า', 
    'อินเดีย', 'ยุโรป', 'อเมริกา', 'ออสเตรเลีย'
  ],
  months: [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
  ],
  tourTypes: [
    'พักผ่อน', 'ผจญภัย', 'หรูหรา', 'ครอบครัว', 'ธรรมชาติ', 
    'วัฒนธรรม', 'อาหาร', 'ช้อปปิ้ง', 'โรแมนติก', 'กีฬา'
  ],
  airlines: [
    'Thai Airways', 'Bangkok Airways', 'AirAsia', 'Nok Air', 
    'Singapore Airlines', 'Emirates', 'Qatar Airways', 'Cathay Pacific'
  ],
  features: [
    'ภาษาไกด์ไทย', 'Private Tour', 'วีซ่ารวม', 'ประกันเดินทาง',
    'ที่พักระดับ 4-5 ดาว', 'อาหารครบทุกมื้อ', 'ไม่มีเสริมทัวร์', 'รถรับส่งสนามบิน'
  ]
}

export default function FilterDrawer({ isOpen, filters, onClose, onApply }: FilterDrawerProps) {
  const [tempFilters, setTempFilters] = useState(filters)
  const [priceRange, setPriceRange] = useState([10000, 200000])

  useEffect(() => {
    setTempFilters(filters)
  }, [filters])

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

  const handleCheckboxChange = (category: string, value: string) => {
    setTempFilters(prev => ({
      ...prev,
      [category]: prev[category as keyof typeof prev].includes(value)
        ? prev[category as keyof typeof prev].filter((item: string) => item !== value)
        : [...prev[category as keyof typeof prev], value]
    }))
  }

  const handleApply = () => {
    onApply({ ...tempFilters, priceRange })
    onClose()
  }

  const handleClear = () => {
    const clearedFilters = {
      countries: [],
      months: [],
      tourTypes: [],
      airlines: [],
      features: []
    }
    setTempFilters(clearedFilters)
    setPriceRange([10000, 200000])
  }

  const formatPrice = (price: number) => {
    return price.toLocaleString() + ' บาท'
  }

  if (!isOpen) return null

  return (
    <div className="filter-drawer-overlay">
      <style jsx>{`
        .filter-drawer-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 100;
          display: flex;
        }
        
        .filter-drawer {
          width: 100%;
          max-width: 400px;
          background: var(--color-bg);
          box-shadow: var(--shadow-md);
          display: flex;
          flex-direction: column;
          transform: translateX(-100%);
          animation: slideIn 300ms ease-out forwards;
        }
        
        @keyframes slideIn {
          to {
            transform: translateX(0);
          }
        }
        
        @media (max-width: 767px) {
          .filter-drawer-overlay {
            align-items: flex-end;
          }
          
          .filter-drawer {
            width: 100%;
            max-width: none;
            max-height: 80vh;
            border-radius: var(--radius-md) var(--radius-md) 0 0;
            transform: translateY(100%);
            animation: slideUp 300ms ease-out forwards;
          }
          
          @keyframes slideUp {
            to {
              transform: translateY(0);
            }
          }
        }
        
        .filter-header {
          padding: var(--spacing-lg);
          border-bottom: 1px solid var(--color-border);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .filter-title {
          font-size: 18px;
          font-weight: 600;
          color: var(--color-text);
          margin: 0;
        }
        
        .close-button {
          width: 32px;
          height: 32px;
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
        
        .filter-content {
          flex: 1;
          overflow-y: auto;
          padding: var(--spacing-lg);
        }
        
        .filter-section {
          margin-bottom: var(--spacing-xl);
        }
        
        .filter-section:last-child {
          margin-bottom: 0;
        }
        
        .filter-section-title {
          font-size: 16px;
          font-weight: 600;
          color: var(--color-text);
          margin-bottom: var(--spacing-md);
        }
        
        .checkbox-group {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
        }
        
        .checkbox-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          cursor: pointer;
          padding: var(--spacing-xs);
          border-radius: var(--radius-sm);
          transition: background-color 150ms ease;
        }
        
        .checkbox-item:hover {
          background: var(--color-bg-soft);
        }
        
        .checkbox {
          width: 18px;
          height: 18px;
          border: 2px solid var(--color-border);
          border-radius: 3px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 150ms ease;
        }
        
        .checkbox.checked {
          background: var(--color-primary);
          border-color: var(--color-primary);
          color: white;
        }
        
        .checkbox-label {
          font-size: 14px;
          color: var(--color-text);
          flex: 1;
        }
        
        .price-range-section {
          margin-bottom: var(--spacing-lg);
        }
        
        .price-range-values {
          display: flex;
          justify-content: space-between;
          margin-bottom: var(--spacing-sm);
          font-size: 14px;
          color: var(--color-text-muted);
        }
        
        .price-slider {
          width: 100%;
          height: 6px;
          background: var(--color-border);
          border-radius: 3px;
          position: relative;
          cursor: pointer;
        }
        
        .price-slider-track {
          height: 100%;
          background: var(--color-primary);
          border-radius: 3px;
          position: absolute;
        }
        
        .price-slider-thumb {
          width: 20px;
          height: 20px;
          background: var(--color-primary);
          border-radius: 50%;
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          cursor: grab;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .price-slider-thumb:active {
          cursor: grabbing;
        }
        
        .filter-actions {
          padding: var(--spacing-lg);
          border-top: 1px solid var(--color-border);
          display: flex;
          gap: var(--spacing-md);
        }
        
        .filter-button {
          flex: 1;
          padding: var(--spacing-md);
          border-radius: var(--radius-sm);
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 200ms ease-out;
          min-height: 48px;
        }
        
        .filter-button-primary {
          background: var(--color-accent);
          color: var(--color-primary);
          border: none;
        }
        
        .filter-button-primary:hover {
          background: #e6a200;
        }
        
        .filter-button-secondary {
          background: transparent;
          color: var(--color-text-muted);
          border: 1px solid var(--color-border);
        }
        
        .filter-button-secondary:hover {
          background: var(--color-bg-soft);
        }
        
        .icon {
          width: 20px;
          height: 20px;
        }
        
        .selected-count {
          font-size: 12px;
          color: var(--color-primary);
          font-weight: 500;
        }
      `}</style>
      
      <div className="filter-drawer">
        <div className="filter-header">
          <h2 className="filter-title">ฟิลเตอร์ค้นหา</h2>
          <button className="close-button" onClick={onClose} aria-label="ปิดฟิลเตอร์">
            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div className="filter-content">
          {/* Price Range */}
          <div className="filter-section">
            <div className="filter-section-title">ช่วงราคา</div>
            <div className="price-range-section">
              <div className="price-range-values">
                <span>{formatPrice(priceRange[0])}</span>
                <span>{formatPrice(priceRange[1])}</span>
              </div>
              <div className="price-slider">
                <div 
                  className="price-slider-track"
                  style={{
                    left: `${(priceRange[0] - 10000) / (200000 - 10000) * 100}%`,
                    width: `${(priceRange[1] - priceRange[0]) / (200000 - 10000) * 100}%`
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Countries */}
          <div className="filter-section">
            <div className="filter-section-title">
              ประเทศ/เมือง
              {tempFilters.countries.length > 0 && (
                <span className="selected-count"> ({tempFilters.countries.length} เลือก)</span>
              )}
            </div>
            <div className="checkbox-group">
              {filterData.countries.map((country) => (
                <label key={country} className="checkbox-item">
                  <div className={`checkbox ${tempFilters.countries.includes(country) ? 'checked' : ''}`}>
                    {tempFilters.countries.includes(country) && '✓'}
                  </div>
                  <span className="checkbox-label">{country}</span>
                  <input
                    type="checkbox"
                    checked={tempFilters.countries.includes(country)}
                    onChange={() => handleCheckboxChange('countries', country)}
                    style={{ display: 'none' }}
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Months */}
          <div className="filter-section">
            <div className="filter-section-title">
              เดือนออกเดินทาง
              {tempFilters.months.length > 0 && (
                <span className="selected-count"> ({tempFilters.months.length} เลือก)</span>
              )}
            </div>
            <div className="checkbox-group">
              {filterData.months.map((month) => (
                <label key={month} className="checkbox-item">
                  <div className={`checkbox ${tempFilters.months.includes(month) ? 'checked' : ''}`}>
                    {tempFilters.months.includes(month) && '✓'}
                  </div>
                  <span className="checkbox-label">{month}</span>
                  <input
                    type="checkbox"
                    checked={tempFilters.months.includes(month)}
                    onChange={() => handleCheckboxChange('months', month)}
                    style={{ display: 'none' }}
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Tour Types */}
          <div className="filter-section">
            <div className="filter-section-title">
              ประเภททัวร์
              {tempFilters.tourTypes.length > 0 && (
                <span className="selected-count"> ({tempFilters.tourTypes.length} เลือก)</span>
              )}
            </div>
            <div className="checkbox-group">
              {filterData.tourTypes.map((type) => (
                <label key={type} className="checkbox-item">
                  <div className={`checkbox ${tempFilters.tourTypes.includes(type) ? 'checked' : ''}`}>
                    {tempFilters.tourTypes.includes(type) && '✓'}
                  </div>
                  <span className="checkbox-label">{type}</span>
                  <input
                    type="checkbox"
                    checked={tempFilters.tourTypes.includes(type)}
                    onChange={() => handleCheckboxChange('tourTypes', type)}
                    style={{ display: 'none' }}
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Airlines */}
          <div className="filter-section">
            <div className="filter-section-title">
              สายการบิน
              {tempFilters.airlines.length > 0 && (
                <span className="selected-count"> ({tempFilters.airlines.length} เลือก)</span>
              )}
            </div>
            <div className="checkbox-group">
              {filterData.airlines.map((airline) => (
                <label key={airline} className="checkbox-item">
                  <div className={`checkbox ${tempFilters.airlines.includes(airline) ? 'checked' : ''}`}>
                    {tempFilters.airlines.includes(airline) && '✓'}
                  </div>
                  <span className="checkbox-label">{airline}</span>
                  <input
                    type="checkbox"
                    checked={tempFilters.airlines.includes(airline)}
                    onChange={() => handleCheckboxChange('airlines', airline)}
                    style={{ display: 'none' }}
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="filter-section">
            <div className="filter-section-title">
              คุณสมบัติพิเศษ
              {tempFilters.features.length > 0 && (
                <span className="selected-count"> ({tempFilters.features.length} เลือก)</span>
              )}
            </div>
            <div className="checkbox-group">
              {filterData.features.map((feature) => (
                <label key={feature} className="checkbox-item">
                  <div className={`checkbox ${tempFilters.features.includes(feature) ? 'checked' : ''}`}>
                    {tempFilters.features.includes(feature) && '✓'}
                  </div>
                  <span className="checkbox-label">{feature}</span>
                  <input
                    type="checkbox"
                    checked={tempFilters.features.includes(feature)}
                    onChange={() => handleCheckboxChange('features', feature)}
                    style={{ display: 'none' }}
                  />
                </label>
              ))}
            </div>
          </div>
        </div>
        
        <div className="filter-actions">
          <button
            className="filter-button filter-button-secondary"
            onClick={handleClear}
          >
            ล้างทั้งหมด
          </button>
          <button
            className="filter-button filter-button-primary"
            onClick={handleApply}
          >
            ใช้ฟิลเตอร์
          </button>
        </div>
      </div>
      
      {/* Backdrop */}
      <div 
        style={{ flex: 1 }}
        onClick={onClose}
      ></div>
    </div>
  )
}