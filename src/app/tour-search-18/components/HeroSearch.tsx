'use client'

import { useState, useRef, useEffect } from 'react'

interface HeroSearchProps {
  initialQuery: {
    destination: string
    dateRange: string
    duration: string
    priceRange: string
    travelers: string
  }
  onSearch: (query: any) => void
  loading: boolean
}

const destinations = [
  'ญี่ปุ่น',
  'เกาหลีใต้',
  'ไต้หวัน',
  'สิงคโปร์',
  'มาเลเซีย',
  'ฮ่องกง',
  'จีน',
  'เวียดนาม',
  'กัมพูชา',
  'ลาว',
  'พม่า',
  'อินเดีย',
  'ยุโรป',
  'อเมริกา',
  'ออสเตรเลีย'
]

const durations = [
  { value: '3D2N', label: '3 วัน 2 คืน' },
  { value: '4D3N', label: '4 วัน 3 คืน' },
  { value: '5D4N', label: '5 วัน 4 คืน' },
  { value: '6D5N', label: '6 วัน 5 คืน' },
  { value: '7D6N', label: '7 วัน 6 คืน' },
  { value: '8D7N', label: '8 วัน 7 คืน' },
  { value: '10D9N', label: '10 วัน 9 คืน' },
  { value: '15D14N', label: '15 วัน 14 คืน' }
]

export default function HeroSearch({ initialQuery, onSearch, loading }: HeroSearchProps) {
  const [query, setQuery] = useState(initialQuery)
  const [showDestinations, setShowDestinations] = useState(false)
  const [filteredDestinations, setFilteredDestinations] = useState(destinations)
  const [showDuration, setShowDuration] = useState(false)
  const [showTravelers, setShowTravelers] = useState(false)
  
  const destinationRef = useRef<HTMLDivElement>(null)
  const durationRef = useRef<HTMLDivElement>(null)
  const travelersRef = useRef<HTMLDivElement>(null)

  // Filter destinations based on input
  useEffect(() => {
    if (query.destination) {
      const filtered = destinations.filter(dest => 
        dest.toLowerCase().includes(query.destination.toLowerCase())
      )
      setFilteredDestinations(filtered)
    } else {
      setFilteredDestinations(destinations)
    }
  }, [query.destination])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (destinationRef.current && !destinationRef.current.contains(event.target as Node)) {
        setShowDestinations(false)
      }
      if (durationRef.current && !durationRef.current.contains(event.target as Node)) {
        setShowDuration(false)
      }
      if (travelersRef.current && !travelersRef.current.contains(event.target as Node)) {
        setShowTravelers(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = () => {
    onSearch(query)
    // Smooth scroll to results
    setTimeout(() => {
      const resultsElement = document.querySelector('.filter-sort-bar')
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }

  const handleReset = () => {
    const resetQuery = {
      destination: '',
      dateRange: '',
      duration: '',
      priceRange: '',
      travelers: '2-0'
    }
    setQuery(resetQuery)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const formatTravelersDisplay = (travelers: string) => {
    const [adults, children] = travelers.split('-').map(Number)
    const parts = []
    if (adults > 0) parts.push(`${adults} ผู้ใหญ่`)
    if (children > 0) parts.push(`${children} เด็ก`)
    return parts.join(', ') || 'เลือกจำนวนผู้เดินทาง'
  }

  const updateTravelers = (adults: number, children: number) => {
    setQuery(prev => ({ ...prev, travelers: `${adults}-${children}` }))
  }

  const [adults, children] = query.travelers.split('-').map(Number)

  return (
    <div className="hero-search">
      <style jsx>{`
        .hero-search {
          background: var(--color-bg-soft);
          padding: var(--spacing-2xl) 0;
          margin-bottom: var(--spacing-xl);
        }
        
        .search-container {
          background: var(--color-bg);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-sm);
          padding: var(--spacing-lg);
          max-width: 1000px;
          margin: 0 auto;
        }
        
        .search-grid {
          display: grid;
          gap: var(--spacing-md);
          grid-template-columns: 1fr;
        }
        
        @media (min-width: 768px) {
          .search-grid {
            grid-template-columns: 2fr 1.5fr 1fr 1fr 1.5fr;
          }
        }
        
        .search-field {
          position: relative;
        }
        
        .search-label {
          display: block;
          font-size: 14px;
          font-weight: 500;
          color: var(--color-text);
          margin-bottom: var(--spacing-xs);
        }
        
        .search-input {
          width: 100%;
          padding: var(--spacing-sm) var(--spacing-md);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          font-size: 16px;
          background: var(--color-bg);
          transition: all 200ms ease-out;
        }
        
        .search-input:focus {
          outline: none;
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px rgba(11, 31, 59, 0.1);
        }
        
        .search-input::placeholder {
          color: var(--color-text-muted);
        }
        
        .dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: var(--color-bg);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          box-shadow: var(--shadow-md);
          max-height: 200px;
          overflow-y: auto;
          z-index: 50;
          margin-top: 4px;
        }
        
        .dropdown-item {
          padding: var(--spacing-sm) var(--spacing-md);
          cursor: pointer;
          transition: background-color 150ms ease;
          border-bottom: 1px solid var(--color-border);
        }
        
        .dropdown-item:last-child {
          border-bottom: none;
        }
        
        .dropdown-item:hover {
          background: var(--color-bg-soft);
        }
        
        .travelers-controls {
          background: var(--color-bg);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          padding: var(--spacing-md);
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          box-shadow: var(--shadow-md);
          z-index: 50;
          margin-top: 4px;
        }
        
        .traveler-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-sm);
        }
        
        .traveler-row:last-child {
          margin-bottom: 0;
        }
        
        .counter-controls {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }
        
        .counter-btn {
          width: 32px;
          height: 32px;
          border: 1px solid var(--color-border);
          border-radius: 50%;
          background: var(--color-bg);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 150ms ease;
        }
        
        .counter-btn:hover {
          background: var(--color-bg-soft);
          border-color: var(--color-primary);
        }
        
        .counter-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .counter-display {
          min-width: 24px;
          text-align: center;
          font-weight: 500;
        }
        
        .search-buttons {
          grid-column: 1 / -1;
          display: flex;
          gap: var(--spacing-md);
          justify-content: center;
          margin-top: var(--spacing-md);
        }
        
        @media (min-width: 768px) {
          .search-buttons {
            grid-column: auto;
            margin-top: 0;
            flex-direction: column;
          }
        }
        
        .search-btn {
          padding: var(--spacing-md) var(--spacing-xl);
          border: none;
          border-radius: var(--radius-sm);
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 200ms ease-out;
          min-height: 44px;
        }
        
        .search-btn-primary {
          background: var(--color-accent);
          color: var(--color-primary);
        }
        
        .search-btn-primary:hover {
          background: #e6a200;
        }
        
        .search-btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        
        .search-btn-secondary {
          background: transparent;
          color: var(--color-text-muted);
          border: 1px solid var(--color-border);
        }
        
        .search-btn-secondary:hover {
          background: var(--color-bg-soft);
        }
        
        .loading-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid transparent;
          border-top: 2px solid var(--color-primary);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-right: var(--spacing-xs);
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      
      <div className="search-container">
        <div className="search-grid">
          {/* Destination */}
          <div className="search-field" ref={destinationRef}>
            <label className="search-label">ปลายทาง</label>
            <input
              type="text"
              className="search-input"
              placeholder="เลือกประเทศหรือเมือง"
              value={query.destination}
              onChange={(e) => {
                setQuery(prev => ({ ...prev, destination: e.target.value }))
                setShowDestinations(true)
              }}
              onFocus={() => setShowDestinations(true)}
              onKeyPress={handleKeyPress}
            />
            {showDestinations && filteredDestinations.length > 0 && (
              <div className="dropdown">
                {filteredDestinations.map((dest) => (
                  <div
                    key={dest}
                    className="dropdown-item"
                    onClick={() => {
                      setQuery(prev => ({ ...prev, destination: dest }))
                      setShowDestinations(false)
                    }}
                  >
                    {dest}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Date Range */}
          <div className="search-field">
            <label className="search-label">วันที่เดินทาง</label>
            <input
              type="text"
              className="search-input"
              placeholder="เลือกวันที่"
              value={query.dateRange}
              onChange={(e) => setQuery(prev => ({ ...prev, dateRange: e.target.value }))}
              onKeyPress={handleKeyPress}
            />
          </div>

          {/* Duration */}
          <div className="search-field" ref={durationRef}>
            <label className="search-label">ระยะเวลา</label>
            <input
              type="text"
              className="search-input"
              placeholder="เลือกระยะเวลา"
              value={durations.find(d => d.value === query.duration)?.label || ''}
              readOnly
              onClick={() => setShowDuration(!showDuration)}
              style={{ cursor: 'pointer' }}
            />
            {showDuration && (
              <div className="dropdown">
                {durations.map((duration) => (
                  <div
                    key={duration.value}
                    className="dropdown-item"
                    onClick={() => {
                      setQuery(prev => ({ ...prev, duration: duration.value }))
                      setShowDuration(false)
                    }}
                  >
                    {duration.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Price Range */}
          <div className="search-field">
            <label className="search-label">ช่วงราคา (บาท)</label>
            <input
              type="text"
              className="search-input"
              placeholder="เช่น 30000-50000"
              value={query.priceRange}
              onChange={(e) => setQuery(prev => ({ ...prev, priceRange: e.target.value }))}
              onKeyPress={handleKeyPress}
            />
          </div>

          {/* Travelers */}
          <div className="search-field" ref={travelersRef}>
            <label className="search-label">จำนวนผู้เดินทาง</label>
            <input
              type="text"
              className="search-input"
              placeholder="เลือกจำนวนผู้เดินทาง"
              value={formatTravelersDisplay(query.travelers)}
              readOnly
              onClick={() => setShowTravelers(!showTravelers)}
              style={{ cursor: 'pointer' }}
            />
            {showTravelers && (
              <div className="travelers-controls">
                <div className="traveler-row">
                  <span>ผู้ใหญ่</span>
                  <div className="counter-controls">
                    <button
                      className="counter-btn"
                      onClick={() => updateTravelers(Math.max(0, adults - 1), children)}
                      disabled={adults <= 0}
                    >
                      -
                    </button>
                    <span className="counter-display">{adults}</span>
                    <button
                      className="counter-btn"
                      onClick={() => updateTravelers(adults + 1, children)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="traveler-row">
                  <span>เด็ก</span>
                  <div className="counter-controls">
                    <button
                      className="counter-btn"
                      onClick={() => updateTravelers(adults, Math.max(0, children - 1))}
                      disabled={children <= 0}
                    >
                      -
                    </button>
                    <span className="counter-display">{children}</span>
                    <button
                      className="counter-btn"
                      onClick={() => updateTravelers(adults, children + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="search-buttons">
          <button
            className="search-btn search-btn-primary"
            onClick={handleSearch}
            disabled={loading}
          >
            {loading && <span className="loading-spinner"></span>}
            ค้นหา
          </button>
          <button
            className="search-btn search-btn-secondary"
            onClick={handleReset}
          >
            รีเซ็ต
          </button>
        </div>
      </div>
    </div>
  )
}