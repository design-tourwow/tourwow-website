'use client'

import { useState, useEffect } from 'react'

interface FilterSortBarProps {
  totalResults: number
  sortBy: string
  viewMode: string
  filters: any
  onSortChange: (sort: string) => void
  onViewChange: (view: string) => void
  onFilterToggle: () => void
  onFilterClear: () => void
}

const sortOptions = [
  { value: 'recommended', label: 'แนะนำ' },
  { value: 'price-asc', label: 'ราคา: น้อย → มาก' },
  { value: 'price-desc', label: 'ราคา: มาก → น้อย' },
  { value: 'rating', label: 'เรตติ้งสูงสุด' },
  { value: 'departure', label: 'ออกเดินทางเร็วสุด' }
]

export default function FilterSortBar({
  totalResults,
  sortBy,
  viewMode,
  filters,
  onSortChange,
  onViewChange,
  onFilterToggle,
  onFilterClear
}: FilterSortBarProps) {
  const [isSticky, setIsSticky] = useState(false)
  const [showSortDropdown, setShowSortDropdown] = useState(false)

  // Track sticky state
  useEffect(() => {
    const handleScroll = () => {
      const element = document.querySelector('.filter-sort-bar')
      if (element) {
        const rect = element.getBoundingClientRect()
        setIsSticky(rect.top <= 0)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Get active filter count
  const activeFilterCount = Object.values(filters).flat().length

  // Get active filter chips
  const getActiveFilters = () => {
    const chips = []
    
    if (filters.countries?.length > 0) {
      filters.countries.forEach((country: string) => {
        chips.push({ type: 'country', value: country, label: country })
      })
    }
    
    if (filters.tourTypes?.length > 0) {
      filters.tourTypes.forEach((type: string) => {
        chips.push({ type: 'tourType', value: type, label: type })
      })
    }
    
    if (filters.months?.length > 0) {
      filters.months.forEach((month: string) => {
        chips.push({ type: 'month', value: month, label: month })
      })
    }
    
    return chips
  }

  const activeFilters = getActiveFilters()

  const removeFilter = (chipToRemove: any) => {
    // Implementation would depend on how filters are structured
    console.log('Remove filter:', chipToRemove)
  }

  return (
    <div className={`filter-sort-bar ${isSticky ? 'sticky' : ''}`}>
      <style jsx>{`
        .filter-sort-bar {
          background: var(--color-bg);
          border-bottom: 1px solid var(--color-border);
          padding: var(--spacing-md) 0;
          margin-bottom: var(--spacing-lg);
          transition: all 200ms ease-out;
        }
        
        .filter-sort-bar.sticky {
          position: sticky;
          top: 0;
          z-index: 40;
          box-shadow: var(--shadow-sm);
        }
        
        .filter-sort-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 var(--spacing-md);
        }
        
        .filter-sort-main {
          display: flex;
          flex-wrap: wrap;
          gap: var(--spacing-md);
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--spacing-sm);
        }
        
        .results-count {
          font-size: 14px;
          color: var(--color-text-muted);
          font-weight: 500;
        }
        
        .results-count strong {
          color: var(--color-text);
          font-weight: 600;
        }
        
        .filter-sort-controls {
          display: flex;
          gap: var(--spacing-md);
          align-items: center;
          flex-wrap: wrap;
        }
        
        .sort-dropdown {
          position: relative;
        }
        
        .sort-button {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          padding: var(--spacing-xs) var(--spacing-md);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          background: var(--color-bg);
          cursor: pointer;
          font-size: 14px;
          transition: all 150ms ease;
          min-height: 36px;
        }
        
        .sort-button:hover {
          border-color: var(--color-primary);
        }
        
        .sort-dropdown-menu {
          position: absolute;
          top: 100%;
          right: 0;
          background: var(--color-bg);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          box-shadow: var(--shadow-md);
          z-index: 50;
          margin-top: 4px;
          min-width: 180px;
        }
        
        .sort-option {
          padding: var(--spacing-sm) var(--spacing-md);
          cursor: pointer;
          font-size: 14px;
          transition: background-color 150ms ease;
          border-bottom: 1px solid var(--color-border);
        }
        
        .sort-option:last-child {
          border-bottom: none;
        }
        
        .sort-option:hover {
          background: var(--color-bg-soft);
        }
        
        .sort-option.active {
          background: var(--color-primary);
          color: white;
        }
        
        .view-toggle {
          display: flex;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          overflow: hidden;
        }
        
        .view-button {
          padding: var(--spacing-xs) var(--spacing-sm);
          border: none;
          background: var(--color-bg);
          cursor: pointer;
          font-size: 14px;
          transition: all 150ms ease;
          min-width: 44px;
          min-height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .view-button.active {
          background: var(--color-primary);
          color: white;
        }
        
        .view-button:hover:not(.active) {
          background: var(--color-bg-soft);
        }
        
        .filter-button {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          padding: var(--spacing-xs) var(--spacing-md);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          background: var(--color-bg);
          cursor: pointer;
          font-size: 14px;
          transition: all 150ms ease;
          min-height: 36px;
        }
        
        .filter-button:hover {
          border-color: var(--color-primary);
        }
        
        .filter-button.has-filters {
          background: var(--color-primary);
          color: white;
          border-color: var(--color-primary);
        }
        
        .filter-badge {
          background: var(--color-accent);
          color: var(--color-primary);
          border-radius: 50%;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 600;
          margin-left: var(--spacing-xs);
        }
        
        .active-filters {
          display: flex;
          flex-wrap: wrap;
          gap: var(--spacing-xs);
          align-items: center;
        }
        
        .filter-chip {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          padding: 4px var(--spacing-xs);
          background: var(--color-bg-soft);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          font-size: 12px;
          color: var(--color-text);
        }
        
        .chip-remove {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: var(--color-text-muted);
          color: white;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          transition: background-color 150ms ease;
        }
        
        .chip-remove:hover {
          background: var(--color-error);
        }
        
        .clear-all-button {
          padding: 4px var(--spacing-xs);
          border: 1px solid var(--color-error);
          border-radius: var(--radius-sm);
          background: transparent;
          color: var(--color-error);
          cursor: pointer;
          font-size: 12px;
          transition: all 150ms ease;
        }
        
        .clear-all-button:hover {
          background: var(--color-error);
          color: white;
        }
        
        .icon {
          width: 16px;
          height: 16px;
        }
        
        @media (max-width: 767px) {
          .filter-sort-main {
            flex-direction: column;
            align-items: stretch;
            gap: var(--spacing-sm);
          }
          
          .filter-sort-controls {
            justify-content: space-between;
          }
          
          .active-filters {
            order: 3;
            overflow-x: auto;
            padding-bottom: var(--spacing-xs);
          }
        }
      `}</style>
      
      <div className="filter-sort-content">
        <div className="filter-sort-main">
          <div className="results-count">
            พบ <strong>{totalResults.toLocaleString()}</strong> แพ็คเกจทัวร์
          </div>
          
          <div className="filter-sort-controls">
            {/* Sort Dropdown */}
            <div className="sort-dropdown">
              <button
                className="sort-button"
                onClick={() => setShowSortDropdown(!showSortDropdown)}
              >
                <span>เรียงตาม: {sortOptions.find(opt => opt.value === sortBy)?.label}</span>
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="6,9 12,15 18,9"></polyline>
                </svg>
              </button>
              
              {showSortDropdown && (
                <div className="sort-dropdown-menu">
                  {sortOptions.map((option) => (
                    <div
                      key={option.value}
                      className={`sort-option ${sortBy === option.value ? 'active' : ''}`}
                      onClick={() => {
                        onSortChange(option.value)
                        setShowSortDropdown(false)
                      }}
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* View Toggle */}
            <div className="view-toggle">
              <button
                className={`view-button ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => onViewChange('grid')}
                aria-label="มุมมองตาราง"
              >
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
              </button>
              <button
                className={`view-button ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => onViewChange('list')}
                aria-label="มุมมองรายการ"
              >
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <line x1="8" y1="6" x2="21" y2="6"></line>
                  <line x1="8" y1="12" x2="21" y2="12"></line>
                  <line x1="8" y1="18" x2="21" y2="18"></line>
                  <line x1="3" y1="6" x2="3.01" y2="6"></line>
                  <line x1="3" y1="12" x2="3.01" y2="12"></line>
                  <line x1="3" y1="18" x2="3.01" y2="18"></line>
                </svg>
              </button>
            </div>
            
            {/* Filter Button */}
            <button
              className={`filter-button ${activeFilterCount > 0 ? 'has-filters' : ''}`}
              onClick={onFilterToggle}
            >
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46"></polygon>
              </svg>
              <span>ฟิลเตอร์เพิ่มเติม</span>
              {activeFilterCount > 0 && (
                <span className="filter-badge">{activeFilterCount}</span>
              )}
            </button>
          </div>
        </div>
        
        {/* Active Filter Chips */}
        {activeFilters.length > 0 && (
          <div className="active-filters">
            {activeFilters.map((filter, index) => (
              <div key={index} className="filter-chip">
                <span>{filter.label}</span>
                <button
                  className="chip-remove"
                  onClick={() => removeFilter(filter)}
                  aria-label={`ลบฟิลเตอร์ ${filter.label}`}
                >
                  ×
                </button>
              </div>
            ))}
            
            <button
              className="clear-all-button"
              onClick={onFilterClear}
            >
              ล้างทั้งหมด
            </button>
          </div>
        )}
      </div>
    </div>
  )
}