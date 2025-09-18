'use client'

import { useState, useEffect } from 'react'

interface FilterSortBarProps {
  totalResults: number
  sortBy: string
  viewMode: string
  filters: any
  onSortChange: (sort: string) => void
  onViewChange: (view: string) => void
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
  onFilterClear
}: FilterSortBarProps) {
  const [isSticky, setIsSticky] = useState(false)
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 })

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.sort-dropdown')) {
        setShowSortDropdown(false)
      }
    }

    if (showSortDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showSortDropdown])

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

  const handleSortDropdownToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget
    const rect = button.getBoundingClientRect()
    const isMobile = window.matchMedia('(max-width: 767px)').matches
    
    if (isMobile) {
      // On mobile, position dropdown to the right edge of screen
      setDropdownPosition({
        top: rect.bottom + 4,
        left: Math.max(8, Math.min(rect.right - 180, window.innerWidth - 188))
      })
    } else {
      // On desktop, position normally
      setDropdownPosition({
        top: rect.bottom + 4,
        left: rect.right - 180 // Right align
      })
    }
    
    setShowSortDropdown(!showSortDropdown)
  }

  return (
    <div className={`filter-sort-bar ${isSticky ? 'sticky' : ''}`}>
      <style jsx>{`
        .filter-sort-bar {
          position: sticky;
          top: 0;
          z-index: 5;
          background: var(--c-bg);
          border-bottom: 1px solid var(--c-border);
          transition: all 200ms ease-out;
        }
        
        .filter-sort-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 var(--s-3);
        }
        
        .filter-sort-main {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: var(--bar-h-desktop);
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
          align-items: center;
          gap: var(--s-2);
        }
        
        .sort-dropdown {
          position: relative;
          z-index: 100;
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
          position: fixed;
          background: var(--color-bg);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          box-shadow: 0 8px 32px rgba(0,0,0,.12);
          z-index: 9999;
          min-width: 180px;
          max-height: 200px;
          overflow-y: auto;
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
        }
        
        .view-button {
          height: 36px;
          width: 36px;
          border: 1px solid var(--c-border);
          border-radius: 10px;
          background: #fff;
          cursor: pointer;
          transition: all 150ms ease;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: -1px;
        }
        
        .view-button:first-child {
          margin-left: 0;
        }
        
        .view-button.active {
          border-color: var(--c-accent);
          box-shadow: inset 0 0 0 2px var(--c-accent);
        }
        
        .view-button:hover:not(.active) {
          background: var(--c-bg-soft);
        }
        
        .filter-button {
          height: 36px;
          padding: 0 10px;
          border: 1px solid var(--c-border);
          border-radius: 10px;
          background: #fff;
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          font-size: 14px;
          transition: all 150ms ease;
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
            height: 56px;
            padding: 0 var(--s-2);
          }
          .results-count {
            font-size: 15px;
            flex: 1;
            min-width: 0;
          }
          .filter-sort-controls {
            gap: var(--s-1);
            flex-shrink: 0;
          }
          .sort-dropdown .sort-button {
            height: 36px;
            padding: 0 8px;
            font-size: 13px;
            border: 1px solid var(--c-border);
            border-radius: 8px;
            background: #fff;
            min-width: 0;
          }
          .sort-button span {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 80px;
          }
          .view-button {
            height: 36px;
            width: 36px;
          }
          .active-filters {
            overflow-x: auto;
            padding-bottom: var(--s-1);
          }
          .sort-dropdown-menu {
            min-width: 160px;
            max-width: 200px;
            font-size: 14px;
          }
          .sort-option {
            padding: 12px 16px;
            min-height: 44px;
            display: flex;
            align-items: center;
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
                onClick={handleSortDropdownToggle}
              >
                <span>เรียงตาม: {sortOptions.find(opt => opt.value === sortBy)?.label}</span>
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="6,9 12,15 18,9"></polyline>
                </svg>
              </button>
              
              {showSortDropdown && (
                <div 
                  className="sort-dropdown-menu"
                  style={{
                    top: `${dropdownPosition.top}px`,
                    left: `${dropdownPosition.left}px`
                  }}
                >
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