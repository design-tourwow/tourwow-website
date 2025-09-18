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
  onFilterToggle: () => void
  loading: boolean
}

const destinations = [
  { name: 'ญี่ปุ่น', type: 'country', popular: true },
  { name: 'เกาหลีใต้', type: 'country', popular: true },
  { name: 'ไต้หวัน', type: 'country', popular: true },
  { name: 'โตเกียว', type: 'city', popular: true },
  { name: 'โอซาก้า', type: 'city', popular: true },
  { name: 'เกียวโต', type: 'city', popular: false },
  { name: 'โซล', type: 'city', popular: true },
  { name: 'ปูซาน', type: 'city', popular: false },
  { name: 'ไทเป', type: 'city', popular: true },
  { name: 'สิงคโปร์', type: 'country', popular: false },
  { name: 'มาเลเซีย', type: 'country', popular: false },
  { name: 'ฮ่องกง', type: 'country', popular: false },
  { name: 'จีน', type: 'country', popular: false },
  { name: 'เวียดนาม', type: 'country', popular: false },
  { name: 'ยุโรป', type: 'region', popular: true },
  { name: 'อเมริกา', type: 'country', popular: false },
  { name: 'ออสเตรเลีย', type: 'country', popular: false }
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

const quickTokens = [
  { type: 'month', label: 'มีนาคม', value: 'มี.ค.' },
  { type: 'month', label: 'เมษายน', value: 'เม.ย.' },
  { type: 'budget', label: '~30,000', value: '30000' },
  { type: 'budget', label: '~40,000', value: '40000' },
  { type: 'duration', label: '5 วัน 4 คืน', value: '5D4N' },
  { type: 'duration', label: '7 วัน 6 คืน', value: '7D6N' }
]

const placeholderExamples = [
  'ปารีส พ.ย. 5 วัน 49,900',
  'โตเกียว ก.ย. 3 คืน 25,000',
  'โซล มี.ค. 4 วัน 35,000',
  'โอซาก้า เม.ย. 6 วัน 45,000',
  'ยุโรป มิ.ย. 10 วัน 85,000'
]

const miniRecommendedTours = [
  { id: 1, title: 'โตเกียว', price: 29900, image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=200&h=120&fit=crop' },
  { id: 2, title: 'โซล', price: 25900, image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=200&h=120&fit=crop' },
  { id: 3, title: 'ไทเป', price: 19900, image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=200&h=120&fit=crop' },
  { id: 4, title: 'โอซาก้า', price: 32900, image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=200&h=120&fit=crop' },
  { id: 5, title: 'ปารีส', price: 49900, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=120&fit=crop' },
  { id: 6, title: 'ลอนดอน', price: 45900, image: 'https://images.unsplash.com/photo-1469521669194-babb32047d6d?w=200&h=120&fit=crop' },
  { id: 7, title: 'ซิดนีย์', price: 55900, image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=200&h=120&fit=crop' },
  { id: 8, title: 'เซี่ยงไฮ้', price: 23900, image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=200&h=120&fit=crop' }
]

export default function HeroSearch({ initialQuery, onSearch, onFilterToggle, loading }: HeroSearchProps) {
  const [globalQuery, setGlobalQuery] = useState('')
  const [showAutocomplete, setShowAutocomplete] = useState(false)
  const [showMiniRecos, setShowMiniRecos] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('hideMiniRecos')
      return !saved || Date.now() - parseInt(saved) > 7 * 24 * 60 * 60 * 1000
    }
    return true
  })
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const [filteredSuggestions, setFilteredSuggestions] = useState<any[]>([])
  
  const inputRef = useRef<HTMLInputElement>(null)
  const autocompleteRef = useRef<HTMLDivElement>(null)

  // Cycle through placeholder examples
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex(prev => (prev + 1) % placeholderExamples.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Filter suggestions based on input
  useEffect(() => {
    if (globalQuery.trim()) {
      const query = globalQuery.toLowerCase()
      const destSuggestions = destinations
        .filter(dest => dest.name.toLowerCase().includes(query))
        .map(dest => ({ ...dest, type: 'destination' }))
      
      const tokenSuggestions = quickTokens
        .filter(token => token.label.toLowerCase().includes(query))
        .map(token => ({ ...token, type: 'token' }))
      
      setFilteredSuggestions([...destSuggestions, ...tokenSuggestions].slice(0, 8))
      setShowAutocomplete(true)
    } else {
      setFilteredSuggestions([])
      setShowAutocomplete(false)
    }
  }, [globalQuery])

  // Close autocomplete when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (autocompleteRef.current && !autocompleteRef.current.contains(event.target as Node) &&
          inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowAutocomplete(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const parseNaturalInput = (input: string) => {
    const parsed = {
      destination: '',
      dateRange: '',
      duration: '',
      priceRange: '',
      travelers: '2-0'
    }

    // Extract destination
    const destMatch = destinations.find(dest => 
      input.toLowerCase().includes(dest.name.toLowerCase())
    )
    if (destMatch) parsed.destination = destMatch.name

    // Extract month
    const monthPatterns = [
      { pattern: /(?:มี\.?นา\.?|มีนาคม)/i, value: 'มี.ค.' },
      { pattern: /(?:เม\.?ย\.?|เมษายน)/i, value: 'เม.ย.' },
      { pattern: /(?:พ\.?ค\.?|พฤษภาคม)/i, value: 'พ.ค.' },
      { pattern: /(?:มิ\.?ย\.?|มิถุนายน)/i, value: 'มิ.ย.' },
      { pattern: /(?:ก\.?ค\.?|กรกฎาคม)/i, value: 'ก.ค.' },
      { pattern: /(?:ส\.?ค\.?|สิงหาคม)/i, value: 'ส.ค.' },
      { pattern: /(?:ก\.?ย\.?|กันยายน)/i, value: 'ก.ย.' },
      { pattern: /(?:ต\.?ค\.?|ตุลาคม)/i, value: 'ต.ค.' },
      { pattern: /(?:พ\.?ย\.?|พฤศจิกายน)/i, value: 'พ.ย.' },
      { pattern: /(?:ธ\.?ค\.?|ธันวาคม)/i, value: 'ธ.ค.' }
    ]
    
    for (const month of monthPatterns) {
      if (month.pattern.test(input)) {
        parsed.dateRange = month.value
        break
      }
    }

    // Extract duration
    const durationMatch = input.match(/(\d+)\s*(?:วัน|คืน)/i)
    if (durationMatch) {
      const days = parseInt(durationMatch[1])
      if (days >= 3) {
        parsed.duration = `${days}D${days-1}N`
      }
    }

    // Extract budget
    const budgetMatch = input.match(/([\d,]+)(?:\s*บาท)?/i)
    if (budgetMatch) {
      const budget = budgetMatch[1].replace(/,/g, '')
      if (parseInt(budget) > 10000) {
        parsed.priceRange = budget
      }
    }

    return parsed
  }

  const handleGlobalSearch = () => {
    if (globalQuery.trim()) {
      const parsedQuery = parseNaturalInput(globalQuery)
      onSearch(parsedQuery)
    } else {
      onSearch(initialQuery)
    }
    
    // Smooth scroll to results
    setTimeout(() => {
      const resultsElement = document.querySelector('.filter-sort-bar')
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }

  const handleAdvancedSearch = () => {
    // Use the same function as the filter button
    onFilterToggle()
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleGlobalSearch()
    } else if (e.key === 'Escape') {
      setShowAutocomplete(false)
    }
  }

  const handleSuggestionClick = (suggestion: any) => {
    if (suggestion.type === 'destination') {
      setGlobalQuery(suggestion.name)
    } else if (suggestion.type === 'token') {
      setGlobalQuery(prev => prev + ' ' + suggestion.label)
    }
    setShowAutocomplete(false)
    inputRef.current?.focus()
  }

  const handleTokenClick = (token: any) => {
    const currentValue = globalQuery.trim()
    const newValue = currentValue ? `${currentValue} ${token.label}` : token.label
    setGlobalQuery(newValue)
    inputRef.current?.focus()
  }

  const clearInput = () => {
    setGlobalQuery('')
    setShowAutocomplete(false)
    inputRef.current?.focus()
  }

  const hideMiniRecos = () => {
    setShowMiniRecos(false)
    if (typeof window !== 'undefined') {
      localStorage.setItem('hideMiniRecos', Date.now().toString())
    }
  }

  const handleMiniRecoClick = (tour: any) => {
    // Apply filter for this destination and scroll to results
    const filterQuery = {
      destination: tour.title,
      dateRange: '',
      duration: '',
      priceRange: '',
      travelers: '2-0'
    }
    onSearch(filterQuery)
    
    setTimeout(() => {
      const resultsElement = document.querySelector('.filter-sort-bar')
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }

  return (
    <div className="hero-search">
      <style jsx>{`
        .hero-search {
          background: var(--c-bg-soft);
          padding: clamp(var(--s-2), 4vw, var(--s-4)) 0;
          margin-bottom: var(--s-1);
        }
        
        .global-search {
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 var(--s-2);
        }
        
        .gs-container {
          background: var(--c-bg);
          border-radius: var(--r-3);
          box-shadow: var(--shadow-1);
          padding: var(--s-3);
          max-height: clamp(90px, 22dvh, 150px);
          overflow: visible;
        }
        
        @media (max-width: 767px) {
          .gs-container {
            max-height: clamp(90px, 22dvh, 150px);
            padding: var(--s-2);
          }
        }
        
        .gs-input-wrapper {
          position: relative;
          margin-bottom: var(--s-2);
        }
        
        .gs-input {
          width: 100%;
          height: 40px;
          padding: 8px 40px 8px 12px;
          border: 1px solid var(--c-border);
          border-radius: var(--r-2);
          font-size: var(--fs-base);
          line-height: 1.3;
          background: var(--c-bg);
          transition: all 200ms ease-out;
        }
        
        .gs-input:focus {
          outline: none;
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px rgba(11, 31, 59, 0.1);
        }
        
        .gs-input::placeholder {
          color: var(--c-muted);
        }
        
        .gs-clear {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--c-muted);
          transition: all 150ms ease;
        }
        
        .gs-clear:hover {
          background: var(--c-bg-soft);
          color: var(--c-text);
        }
        
        .gs-buttons {
          display: flex;
          gap: var(--s-2);
          align-items: center;
        }
        
        @media (max-width: 767px) {
          .gs-buttons {
            flex-wrap: wrap;
          }
        }
        
        .gs-btn-primary {
          background: var(--c-accent);
          color: #1A1D29;
          border: none;
          height: 40px;
          padding: 0 var(--s-3);
          border-radius: var(--r-2);
          font-weight: 600;
          cursor: pointer;
          transition: all 200ms ease;
          min-height: 44px;
          font-size: var(--fs-base);
          flex: 1;
        }
        
        .gs-btn-primary:hover {
          filter: brightness(0.98);
        }
        
        .gs-btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        
        .gs-btn-advanced {
          background: var(--c-bg);
          color: var(--c-text);
          border: 1px solid var(--c-border);
          height: 40px;
          padding: 0 var(--s-3);
          border-radius: var(--r-2);
          font-weight: 600;
          cursor: pointer;
          transition: all 200ms ease;
          min-height: 44px;
          font-size: var(--fs-base);
          white-space: nowrap;
        }
        
        .gs-btn-advanced:hover {
          background: var(--c-bg-soft);
          border-color: var(--color-primary);
        }
        
        .gs-autocomplete {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: var(--c-bg);
          border: 1px solid var(--c-border);
          border-radius: var(--r-2);
          box-shadow: var(--shadow-1);
          max-height: 240px;
          overflow-y: auto;
          z-index: 50;
          margin-top: 4px;
        }
        
        .gs-suggestion-group {
          border-bottom: 1px solid var(--c-border);
        }
        
        .gs-suggestion-group:last-child {
          border-bottom: none;
        }
        
        .gs-group-header {
          padding: var(--s-1) var(--s-2);
          font-size: var(--fs-sm);
          font-weight: 600;
          color: var(--c-muted);
          background: var(--c-bg-soft);
          position: sticky;
          top: 0;
        }
        
        .gs-suggestion {
          padding: var(--s-2);
          cursor: pointer;
          transition: background-color 150ms ease;
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: 44px;
        }
        
        .gs-suggestion:hover {
          background: #FFF4D1;
          color: var(--color-primary);
        }
        
        .gs-suggestion-check {
          opacity: 0;
          color: var(--color-primary);
        }
        
        .gs-suggestion:hover .gs-suggestion-check {
          opacity: 1;
        }
        
        .gs-quick-tokens {
          display: flex;
          gap: var(--s-1);
          flex-wrap: wrap;
          margin-top: var(--s-1);
        }
        
        @media (max-width: 767px) {
          .gs-quick-tokens {
            display: none;
          }
        }
        
        .gs-token {
          background: var(--c-bg-soft);
          border: 1px solid var(--c-border);
          border-radius: var(--r-2);
          padding: 4px var(--s-1);
          font-size: var(--fs-sm);
          cursor: pointer;
          transition: all 150ms ease;
        }
        
        .gs-token:hover {
          background: var(--c-accent);
          border-color: var(--c-accent);
          color: #1A1D29;
        }
        
        .mini-recos {
          margin: var(--s-1) 0 var(--s-2);
          max-height: 120px;
          overflow: hidden;
        }
        
        .mini-recos-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--s-1);
          padding: 0 var(--s-2);
        }
        
        .mini-recos-title {
          font-size: var(--fs-sm);
          font-weight: 600;
          color: var(--c-muted);
        }
        
        .mini-recos-close {
          background: none;
          border: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--c-muted);
          transition: all 150ms ease;
        }
        
        .mini-recos-close:hover {
          background: var(--c-bg-soft);
          color: var(--c-text);
        }
        
        .mini-recos-scroll {
          display: flex;
          gap: var(--s-2);
          padding: 0 var(--s-2);
          overflow-x: auto;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
        }
        
        .mini-recos-scroll::-webkit-scrollbar {
          height: 4px;
        }
        
        .mini-recos-scroll::-webkit-scrollbar-track {
          background: var(--c-bg-soft);
          border-radius: 2px;
        }
        
        .mini-recos-scroll::-webkit-scrollbar-thumb {
          background: var(--c-border);
          border-radius: 2px;
        }
        
        .mini-card {
          flex: 0 0 auto;
          width: 160px;
          background: var(--c-bg);
          border: 1px solid var(--c-border);
          border-radius: var(--r-2);
          overflow: hidden;
          cursor: pointer;
          transition: all 200ms ease;
        }
        
        @media (max-width: 767px) {
          .mini-card {
            width: 140px;
          }
        }
        
        .mini-card:hover {
          box-shadow: var(--shadow-1);
          border-color: var(--color-primary);
        }
        
        .mini-card-image {
          width: 100%;
          height: 60px;
          object-fit: cover;
          background: var(--c-bg-soft);
        }
        
        .mini-card-content {
          padding: var(--s-1);
        }
        
        .mini-card-title {
          font-size: var(--fs-sm);
          font-weight: 600;
          color: var(--c-text);
          margin-bottom: 2px;
          line-height: 1.2;
        }
        
        .mini-card-price {
          font-size: var(--fs-sm);
          color: var(--c-accent);
          font-weight: 600;
        }
        
        .loading-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid transparent;
          border-top: 2px solid currentColor;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-right: var(--s-1);
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      
      <div className="global-search">
        <div className="gs-container">
          <div className="gs-input-wrapper">
            <input
              ref={inputRef}
              type="text"
              className="gs-input"
              placeholder={`ค้นหาประเทศ เมือง วันที่ หรือราคา… เช่น '${placeholderExamples[placeholderIndex]}'`}
              value={globalQuery}
              onChange={(e) => setGlobalQuery(e.target.value)}
              onFocus={() => {
                if (globalQuery.trim()) setShowAutocomplete(true)
              }}
              onKeyDown={handleKeyPress}
              aria-expanded={showAutocomplete}
              aria-controls="gs-autocomplete"
            />
            {globalQuery && (
              <button
                className="gs-clear"
                onClick={clearInput}
                aria-label="ล้างค่า"
              >
                ×
              </button>
            )}
            
            {showAutocomplete && filteredSuggestions.length > 0 && (
              <div id="gs-autocomplete" className="gs-autocomplete" ref={autocompleteRef}>
                {/* Popular destinations */}
                {filteredSuggestions.some(s => s.type === 'destination' && s.popular) && (
                  <div className="gs-suggestion-group">
                    <div className="gs-group-header">ยอดนิยม</div>
                    {filteredSuggestions
                      .filter(s => s.type === 'destination' && s.popular)
                      .map((suggestion, index) => (
                        <div
                          key={`popular-${index}`}
                          className="gs-suggestion"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          <span>{suggestion.name}</span>
                          <span className="gs-suggestion-check">✓</span>
                        </div>
                      ))
                    }
                  </div>
                )}
                
                {/* Countries */}
                {filteredSuggestions.some(s => s.type === 'destination' && s.type === 'country') && (
                  <div className="gs-suggestion-group">
                    <div className="gs-group-header">ประเทศ</div>
                    {filteredSuggestions
                      .filter(s => s.type === 'destination' && s.type === 'country')
                      .map((suggestion, index) => (
                        <div
                          key={`country-${index}`}
                          className="gs-suggestion"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          <span>{suggestion.name}</span>
                          <span className="gs-suggestion-check">✓</span>
                        </div>
                      ))
                    }
                  </div>
                )}
                
                {/* Cities */}
                {filteredSuggestions.some(s => s.type === 'destination' && s.type === 'city') && (
                  <div className="gs-suggestion-group">
                    <div className="gs-group-header">เมือง</div>
                    {filteredSuggestions
                      .filter(s => s.type === 'destination' && s.type === 'city')
                      .map((suggestion, index) => (
                        <div
                          key={`city-${index}`}
                          className="gs-suggestion"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          <span>{suggestion.name}</span>
                          <span className="gs-suggestion-check">✓</span>
                        </div>
                      ))
                    }
                  </div>
                )}
                
                {/* Quick tokens */}
                {filteredSuggestions.some(s => s.type === 'token') && (
                  <div className="gs-suggestion-group">
                    <div className="gs-group-header">เติมคำค้นหา</div>
                    {filteredSuggestions
                      .filter(s => s.type === 'token')
                      .map((suggestion, index) => (
                        <div
                          key={`token-${index}`}
                          className="gs-suggestion"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          <span>{suggestion.label}</span>
                          <span className="gs-suggestion-check">✓</span>
                        </div>
                      ))
                    }
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="gs-buttons">
            <button
              className="gs-btn-primary"
              onClick={handleGlobalSearch}
              disabled={loading}
            >
              {loading && <span className="loading-spinner"></span>}
              ค้นหา
            </button>
            <button
              className="gs-btn-advanced"
              onClick={handleAdvancedSearch}
            >
              ค้นหาขั้นสูง
            </button>
          </div>
          
          <div className="gs-quick-tokens">
            {quickTokens.map((token, index) => (
              <button
                key={index}
                className="gs-token"
                onClick={() => handleTokenClick(token)}
              >
                {token.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Mini Recommended Tours */}
        {showMiniRecos && (
          <div className="mini-recos">
            <div className="mini-recos-header">
              <span className="mini-recos-title">ทัวร์แนะนำยอดนิยม</span>
              <button 
                className="mini-recos-close"
                onClick={hideMiniRecos}
                aria-label="ซ่อน"
              >
                ×
              </button>
            </div>
            <div className="mini-recos-scroll">
              {miniRecommendedTours.map((tour) => (
                <div
                  key={tour.id}
                  className="mini-card"
                  onClick={() => handleMiniRecoClick(tour)}
                >
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="mini-card-image"
                    loading="lazy"
                  />
                  <div className="mini-card-content">
                    <div className="mini-card-title">{tour.title}</div>
                    <div className="mini-card-price">เริ่ม ฿{tour.price.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}