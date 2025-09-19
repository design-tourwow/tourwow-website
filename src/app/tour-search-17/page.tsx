'use client';

export const dynamic = 'force-dynamic'

import React, { useState, useCallback, useEffect, useRef } from 'react';
import './styles.css';

// Icons (using simple SVG for better performance)
const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.35-4.35"/>
  </svg>
);

const LocationIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const MoneyIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="1" x2="12" y2="23"/>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12,6 12,12 16,14"/>
  </svg>
);

const FilterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46"/>
  </svg>
);

const GridIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7"/>
    <rect x="14" y="3" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/>
    <rect x="3" y="14" width="7" height="7"/>
  </svg>
);

const ListIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="8" y1="6" x2="21" y2="6"/>
    <line x1="8" y1="12" x2="21" y2="12"/>
    <line x1="8" y1="18" x2="21" y2="18"/>
    <line x1="3" y1="6" x2="3.01" y2="6"/>
    <line x1="3" y1="12" x2="3.01" y2="12"/>
    <line x1="3" y1="18" x2="3.01" y2="18"/>
  </svg>
);

const SortIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 6h18"/>
    <path d="M7 12h10"/>
    <path d="M10 18h4"/>
  </svg>
);

const HeartIcon = ({ filled = false }: { filled?: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const ShareIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="18" cy="5" r="3"/>
    <circle cx="6" cy="12" r="3"/>
    <circle cx="18" cy="19" r="3"/>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
  </svg>
);

const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const StarIcon = ({ filled = false }: { filled?: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? "#FDE047" : "none"} stroke={filled ? "#FDE047" : "#D1D5DB"} strokeWidth="2">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

// Types
interface SearchFilters {
  destination: string;
  dateRange: { start: string; end: string };
  budget: { min: number; max: number };
  duration: string;
}

interface AdvancedFilters {
  countries: string[];
  travelMonths: string[];
  tourTypes: string[];
  airlines: string[];
  languages: string[];
  minRating: number;
}

interface Tour {
  id: string;
  title: string;
  destination: string;
  country: string;
  image: string;
  rating: number;
  reviewCount: number;
  highlights: string[];
  duration: string;
  travelMonths: string[];
  airline: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  priceNote: string;
  status: 'available' | 'limited' | 'sold-out';
  badges: string[];
  isPopular?: boolean;
  isEco?: boolean;
}

// Mock data with Thai content
const MOCK_TOURS: Tour[] = [
  {
    id: '1',
    title: 'ญี่ปุ่น โตเกียว โอซาก้า เกียวโต สัมผัสใบไม้เปลี่ยนสี',
    destination: 'โตเกียว, โอซาก้า, เกียวโต',
    country: 'ญี่ปุ่น',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=240&fit=crop',
    rating: 4.8,
    reviewCount: 324,
    highlights: ['ใบไม้เปลี่ยนสี', 'วัดเกียวโต', 'อาหารแท้'],
    duration: '5 วัน 4 คืน',
    travelMonths: ['พ.ย.', 'ธ.ค.'],
    airline: 'Thai Airways',
    price: 89900,
    originalPrice: 99900,
    discountPercent: 10,
    priceNote: 'รวมภาษี',
    status: 'available',
    badges: ['ลดราคา', 'ยอดนิยม'],
    isPopular: true
  },
  {
    id: '2',
    title: 'เกาหลี โซล ปูซาน ดูใบไม้เปลี่ยนสีเกาหลี K-Culture',
    destination: 'โซล, ปูซาน',
    country: 'เกาหลีใต้',
    image: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=400&h=240&fit=crop',
    rating: 4.6,
    reviewCount: 187,
    highlights: ['ใบไม้เปลี่ยนสี', 'K-Culture', 'ช้อปปิ้ง'],
    duration: '4 วัน 3 คืน',
    travelMonths: ['ต.ค.', 'พ.ย.'],
    airline: 'Korean Air',
    price: 42900,
    priceNote: 'ไม่รวมภาษี',
    status: 'limited',
    badges: ['ที่นั่งเหลือไม่มาก']
  },
  {
    id: '3',
    title: 'ยุโรป อิตาลี ฝรั่งเศส สวิตเซอร์แลนด์ 3 ประเทศ',
    destination: 'โรม, ปารีส, ซูริค',
    country: 'ยุโรป',
    image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=400&h=240&fit=crop',
    rating: 4.9,
    reviewCount: 542,
    highlights: ['3 ประเทศ', 'พิพิธภัณฑ์', 'ฟาร์มชีส'],
    duration: '9 วัน 6 คืน',
    travelMonths: ['ก.ย.', 'ต.ค.', 'พ.ย.'],
    airline: 'Emirates',
    price: 189900,
    priceNote: 'รวมภาษี',
    status: 'available',
    badges: ['หรูหรา', 'Eco-Friendly'],
    isEco: true
  },
  {
    id: '4',
    title: 'สิงคโปร์ มาเลเซีย ช้อปปิ้งเที่ยวสนุก',
    destination: 'สิงคโปร์, กัวลาลัมเปอร์',
    country: 'เอเชีย',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&h=240&fit=crop',
    rating: 4.3,
    reviewCount: 156,
    highlights: ['ช้อปปิ้ง', 'อาหารริมทาง', 'เมืองท่า'],
    duration: '4 วัน 3 คืน',
    travelMonths: ['ตลอดปี'],
    airline: 'Singapore Airlines',
    price: 32900,
    priceNote: 'รวมภาษี',
    status: 'available',
    badges: ['เริ่มต้น']
  },
  {
    id: '5',
    title: 'ตุรกี อิสตันบูล คัปปาโดเซีย บอลลูนสุดโรแมนติก',
    destination: 'อิสตันบูล, คัปปาโดเซีย',
    country: 'ตุรกี',
    image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=400&h=240&fit=crop',
    rating: 4.7,
    reviewCount: 289,
    highlights: ['บอลลูน', 'โรแมนติก', 'ถ้ำแปลก'],
    duration: '6 วัน 5 คืน',
    travelMonths: ['มี.ค.', 'เม.ย.', 'ต.ค.', 'พ.ย.'],
    airline: 'Turkish Airlines',
    price: 69900,
    originalPrice: 79900,
    discountPercent: 13,
    priceNote: 'รวมภาษี',
    status: 'available',
    badges: ['ลดราคา', 'โรแมนติก']
  },
  {
    id: '6',
    title: 'นอร์เวย์ ฟินแลนด์ ออโรรา แสงเหนือสุดมหัศจรรย์',
    destination: 'โอสโล, เฮลซิงกิ',
    country: 'สแกนดิเนเวีย',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=240&fit=crop',
    rating: 4.9,
    reviewCount: 134,
    highlights: ['ออโรรา', 'แสงเหนือ', 'ฟยอร์ด'],
    duration: '7 วัน 6 คืน',
    travelMonths: ['ธ.ค.', 'ม.ค.', 'ก.พ.'],
    airline: 'Finnair',
    price: 149900,
    priceNote: 'รวมภาษี',
    status: 'sold-out',
    badges: ['เต็มแล้ว', 'สุดพิเศษ']
  }
];

const POPULAR_DESTINATIONS = ['ญี่ปุ่น', 'เกาหลี', 'ยุโรป', 'สิงคโปร์', 'ตุรกี', 'สแกนดิเนเวีย'];

// Analytics function
const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  console.log('🔍 Analytics:', eventName, properties);
  // In real app: gtag('event', eventName, properties);
};

// Main Component
export default function TourSearch17() {
  // State
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    destination: '',
    dateRange: { start: '', end: '' },
    budget: { min: 0, max: 200000 },
    duration: ''
  });

  const [advancedFilters, setAdvancedFilters] = useState<AdvancedFilters>({
    countries: [],
    travelMonths: [],
    tourTypes: [],
    airlines: [],
    languages: [],
    minRating: 0
  });

  const [tours, setTours] = useState<Tour[]>(MOCK_TOURS);
  const [filteredTours, setFilteredTours] = useState<Tour[]>(MOCK_TOURS);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isSlowNetwork, setIsSlowNetwork] = useState(false);
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('recommended');
  
  const [showFilters, setShowFilters] = useState(false);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [savedTours, setSavedTours] = useState<Set<string>>(new Set());
  const [quickViewTour, setQuickViewTour] = useState<Tour | null>(null);

  // Refs
  const resultsRef = useRef<HTMLDivElement>(null);

  // Search function
  const handleSearch = useCallback(() => {
    setIsLoading(true);
    setHasError(false);
    
    trackEvent('search_submit', {
      destination: searchFilters.destination,
      dateRange: searchFilters.dateRange,
      budget: searchFilters.budget,
      duration: searchFilters.duration
    });

    // Simulate network delay
    setTimeout(() => {
      try {
        let filtered = [...tours];
        
        // Apply search filters
        if (searchFilters.destination) {
          filtered = filtered.filter(tour => 
            tour.title.toLowerCase().includes(searchFilters.destination.toLowerCase()) ||
            tour.destination.toLowerCase().includes(searchFilters.destination.toLowerCase()) ||
            tour.country.toLowerCase().includes(searchFilters.destination.toLowerCase())
          );
        }

        if (searchFilters.budget.max > 0) {
          filtered = filtered.filter(tour => 
            tour.price >= searchFilters.budget.min && tour.price <= searchFilters.budget.max
          );
        }

        // Apply advanced filters
        if (advancedFilters.countries.length > 0) {
          filtered = filtered.filter(tour => 
            advancedFilters.countries.includes(tour.country)
          );
        }

        if (advancedFilters.minRating > 0) {
          filtered = filtered.filter(tour => tour.rating >= advancedFilters.minRating);
        }

        // Apply sorting
        switch (sortBy) {
          case 'price-low':
            filtered.sort((a, b) => a.price - b.price);
            break;
          case 'price-high':
            filtered.sort((a, b) => b.price - a.price);
            break;
          case 'rating':
            filtered.sort((a, b) => b.rating - a.rating);
            break;
          case 'newest':
            // Mock newest sort
            break;
          default: // recommended
            filtered.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
        }

        setFilteredTours(filtered);
        setIsLoading(false);

        // Smooth scroll to results
        setTimeout(() => {
          resultsRef.current?.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }, 100);

      } catch (error) {
        setHasError(true);
        setIsLoading(false);
      }
    }, 500);

    // Simulate slow network detection
    setTimeout(() => {
      if (isLoading) {
        setIsSlowNetwork(true);
      }
    }, 2000);
  }, [searchFilters, advancedFilters, sortBy, tours, isLoading]);

  // Filter handlers
  const handleFilterChange = useCallback((key: keyof SearchFilters, value: any) => {
    setSearchFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const handleAdvancedFilterChange = useCallback((key: keyof AdvancedFilters, value: any) => {
    setAdvancedFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  // Compare handlers
  const handleCompareToggle = useCallback((tourId: string) => {
    setCompareList(prev => {
      const newList = prev.includes(tourId) 
        ? prev.filter(id => id !== tourId)
        : prev.length < 4 ? [...prev, tourId] : prev;
      
      if (newList.length > prev.length) {
        trackEvent('compare_add', { tourId, compareCount: newList.length });
      }
      
      return newList;
    });
  }, []);

  const handleClearCompare = useCallback(() => {
    trackEvent('compare_clear', { previousCount: compareList.length });
    setCompareList([]);
  }, [compareList.length]);

  // Save handlers
  const handleSaveToggle = useCallback((tourId: string) => {
    setSavedTours(prev => {
      const newSet = new Set(prev);
      if (newSet.has(tourId)) {
        newSet.delete(tourId);
      } else {
        newSet.add(tourId);
      }
      return newSet;
    });
  }, []);

  // View handlers
  const handleViewModeChange = useCallback((mode: 'grid' | 'list') => {
    setViewMode(mode);
    trackEvent('view_toggle', { mode });
  }, []);

  const handleSortChange = useCallback((option: string) => {
    setSortBy(option);
    trackEvent('sort_change', { option });
  }, []);

  // Modal handlers
  const handleQuickView = useCallback((tour: Tour) => {
    setQuickViewTour(tour);
    trackEvent('card_quick_view', { tourId: tour.id });
  }, []);

  const handleCloseQuickView = useCallback(() => {
    setQuickViewTour(null);
  }, []);

  // Filter drawer handlers
  const handleToggleFilters = useCallback(() => {
    const newState = !showFilters;
    setShowFilters(newState);
    trackEvent(newState ? 'filter_open' : 'filter_close');
  }, [showFilters]);

  const handleApplyFilters = useCallback(() => {
    setShowFilters(false);
    handleSearch();
    trackEvent('filter_apply', { filters: advancedFilters });
  }, [advancedFilters, handleSearch]);

  const handleClearFilters = useCallback(() => {
    setAdvancedFilters({
      countries: [],
      travelMonths: [],
      tourTypes: [],
      airlines: [],
      languages: [],
      minRating: 0
    });
    setSearchFilters({
      destination: '',
      dateRange: { start: '', end: '' },
      budget: { min: 0, max: 200000 },
      duration: ''
    });
    trackEvent('filter_clear_all');
  }, []);

  // Keyboard handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (quickViewTour) {
          handleCloseQuickView();
        } else if (showFilters) {
          setShowFilters(false);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [quickViewTour, showFilters, handleCloseQuickView]);

  // Auto-search on filter changes
  useEffect(() => {
    handleSearch();
  }, [sortBy]);

  return (
    <main className="tour-search-17">
      {/* 2.1 Micro-Hero Search (Compact ATF) */}
      <section className="micro-hero-search">
        <div className="search-container">
          <div className="search-bar">
            <div className="search-fields">
              <div className="search-field">
                <label htmlFor="destination">ปลายทาง</label>
                <LocationIcon />
                <input
                  id="destination"
                  type="text"
                  placeholder="ค้นหาประเทศหรือเมือง..."
                  value={searchFilters.destination}
                  onChange={(e) => handleFilterChange('destination', e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>

              <div className="search-field">
                <label htmlFor="dates">วันที่เดินทาง</label>
                <CalendarIcon />
                <input
                  id="dates"
                  type="text"
                  placeholder="เลือกวันที่..."
                  value={searchFilters.dateRange.start && searchFilters.dateRange.end 
                    ? `${searchFilters.dateRange.start} - ${searchFilters.dateRange.end}`
                    : ''
                  }
                  readOnly
                />
              </div>

              <div className="search-field">
                <label htmlFor="budget">งบประมาณ</label>
                <MoneyIcon />
                <input
                  id="budget"
                  type="text"
                  placeholder="ระบุงบประมาณ..."
                  value={searchFilters.budget.max > 0 
                    ? `${searchFilters.budget.min.toLocaleString()} - ${searchFilters.budget.max.toLocaleString()} บาท`
                    : ''
                  }
                  readOnly
                />
              </div>

              <div className="search-field">
                <label htmlFor="duration">ระยะเวลา</label>
                <ClockIcon />
                <select
                  id="duration"
                  value={searchFilters.duration}
                  onChange={(e) => handleFilterChange('duration', e.target.value)}
                >
                  <option value="">เลือกระยะเวลา</option>
                  <option value="3d2n">3 วัน 2 คืน</option>
                  <option value="4d3n">4 วัน 3 คืน</option>
                  <option value="5d4n">5 วัน 4 คืน</option>
                  <option value="6d5n">6 วัน 5 คืน</option>
                  <option value="7d6n">7 วัน 6 คืน</option>
                  <option value="8d7n">8 วัน 7 คืน</option>
                  <option value="9d8n">9+ วัน</option>
                </select>
              </div>
            </div>

            <div className="search-actions">
              <button 
                className="btn-search"
                onClick={handleSearch}
                disabled={isLoading}
              >
                <SearchIcon />
                ค้นหา
              </button>
              <button 
                className="btn-reset"
                onClick={handleClearFilters}
              >
                รีเซ็ต
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Slow Network Banner */}
      {isSlowNetwork && (
        <div className="slow-network-banner">
          อินเทอร์เน็ตช้า กำลังโหลดรูป...
        </div>
      )}

      {/* 2.2 Results Toolbar (Sticky) */}
      <section className="results-toolbar" ref={resultsRef}>
        <div className="toolbar-content">
          <div className="results-info">
            <span className="results-count">
              พบ {filteredTours.length} โปรแกรมทัวร์
            </span>
          </div>

          <div className="toolbar-controls">
            <div className="sort-control">
              <SortIcon />
              <select 
                value={sortBy} 
                onChange={(e) => handleSortChange(e.target.value)}
                aria-label="เรียงลำดับ"
              >
                <option value="recommended">แนะนำ</option>
                <option value="price-low">ราคา: น้อย → มาก</option>
                <option value="price-high">ราคา: มาก → น้อย</option>
                <option value="rating">เรตติ้งสูงสุด</option>
                <option value="newest">วันที่เร็วสุด</option>
              </select>
            </div>

            <div className="view-toggle">
              <button
                className={viewMode === 'grid' ? 'active' : ''}
                onClick={() => handleViewModeChange('grid')}
                aria-label="มุมมองตาราง"
              >
                <GridIcon />
              </button>
              <button
                className={viewMode === 'list' ? 'active' : ''}
                onClick={() => handleViewModeChange('list')}
                aria-label="มุมมองรายการ"
              >
                <ListIcon />
              </button>
            </div>

            <button 
              className="filter-btn"
              onClick={handleToggleFilters}
              aria-label="ฟิลเตอร์เพิ่มเติม"
            >
              <FilterIcon />
              ฟิลเตอร์เพิ่มเติม
            </button>
          </div>

          {/* Quick Filters */}
          <div className="quick-filters">
            {POPULAR_DESTINATIONS.map(dest => (
              <button
                key={dest}
                className={`quick-filter-chip ${searchFilters.destination === dest ? 'active' : ''}`}
                onClick={() => {
                  handleFilterChange('destination', searchFilters.destination === dest ? '' : dest);
                  if (searchFilters.destination !== dest) {
                    setTimeout(handleSearch, 100);
                  }
                }}
              >
                {dest}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2.4 Results Area */}
      <section className="results-area">
        <div className="results-container">
          {hasError ? (
            <div className="error-state">
              <h3>เกิดข้อผิดพลาด</h3>
              <p>ไม่สามารถโหลดข้อมูลได้ กรุณาลองใหม่</p>
              <button className="btn-retry" onClick={handleSearch}>
                ลองใหม่
              </button>
            </div>
          ) : isLoading ? (
            <div className="skeleton-grid">
              {Array.from({ length: 6 }, (_, i) => (
                <div key={i} className="skeleton-card" />
              ))}
            </div>
          ) : filteredTours.length === 0 ? (
            <div className="empty-state">
              <h3>ไม่พบโปรแกรมทัวร์ที่ตรงกับเงื่อนไข</h3>
              <p>ลองปรับเปลี่ยนเงื่อนไขการค้นหาหรือเลือกจุดหมายยอดนิยม</p>
              <button className="btn-clear-filters" onClick={handleClearFilters}>
                ล้างฟิลเตอร์ทั้งหมด
              </button>
              <div className="popular-destinations">
                {POPULAR_DESTINATIONS.map(dest => (
                  <button
                    key={dest}
                    className="destination-chip"
                    onClick={() => {
                      handleFilterChange('destination', dest);
                      setTimeout(handleSearch, 100);
                    }}
                  >
                    {dest}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className={`tours-grid ${viewMode}`}>
              {filteredTours.map((tour) => (
                <TourCard
                  key={tour.id}
                  tour={tour}
                  viewMode={viewMode}
                  isComparing={compareList.includes(tour.id)}
                  isSaved={savedTours.has(tour.id)}
                  onCompareToggle={() => handleCompareToggle(tour.id)}
                  onSaveToggle={() => handleSaveToggle(tour.id)}
                  onQuickView={() => handleQuickView(tour)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 2.6 Compare Bar */}
      {compareList.length > 0 && (
        <div className={`compare-bar ${compareList.length > 0 ? 'visible' : ''}`}>
          <div className="compare-content">
            <div className="compare-items">
              เปรียบเทียบ ({compareList.length}/4)
            </div>
            <div className="compare-actions">
              <button 
                className="btn-compare-now"
                onClick={() => trackEvent('compare_open', { tours: compareList })}
              >
                เปรียบเทียบตอนนี้
              </button>
              <button 
                className="btn-clear-compare"
                onClick={handleClearCompare}
              >
                ล้างทั้งหมด
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2.3 Filter Drawer */}
      {showFilters && (
        <div className="filter-overlay" onClick={handleToggleFilters}>
          <div 
            className={`filter-drawer ${showFilters ? 'open' : ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="filter-header">
              <h3>ฟิลเตอร์ขั้นสูง</h3>
              <button 
                className="filter-close"
                onClick={handleToggleFilters}
                aria-label="ปิดฟิลเตอร์"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="filter-section">
              <h4>ประเทศ/เมือง</h4>
              <div className="filter-options">
                {['ญี่ปุ่น', 'เกาหลีใต้', 'ยุโรป', 'เอเชีย', 'ตุรกี', 'สแกนดิเนเวีย'].map(country => (
                  <label key={country} className={`filter-option ${advancedFilters.countries.includes(country) ? 'active' : ''}`}>
                    <input
                      type="checkbox"
                      checked={advancedFilters.countries.includes(country)}
                      onChange={(e) => {
                        const countries = e.target.checked 
                          ? [...advancedFilters.countries, country]
                          : advancedFilters.countries.filter(c => c !== country);
                        handleAdvancedFilterChange('countries', countries);
                      }}
                    />
                    {country}
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h4>ประเภททัวร์</h4>
              <div className="filter-options">
                {['พักผ่อน', 'ผจญภัย', 'หรูหรา', 'ครอบครัว', 'ธรรมชาติ', 'วัฒนธรรม'].map(type => (
                  <label key={type} className={`filter-option ${advancedFilters.tourTypes.includes(type) ? 'active' : ''}`}>
                    <input
                      type="checkbox"
                      checked={advancedFilters.tourTypes.includes(type)}
                      onChange={(e) => {
                        const tourTypes = e.target.checked 
                          ? [...advancedFilters.tourTypes, type]
                          : advancedFilters.tourTypes.filter(t => t !== type);
                        handleAdvancedFilterChange('tourTypes', tourTypes);
                      }}
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h4>เรตติ้งขั้นต่ำ</h4>
              <div className="price-range">
                <span>{advancedFilters.minRating} ดาว</span>
                <span>5 ดาว</span>
              </div>
              <input
                type="range"
                className="price-slider"
                min="0"
                max="5"
                step="0.5"
                value={advancedFilters.minRating}
                onChange={(e) => handleAdvancedFilterChange('minRating', parseFloat(e.target.value))}
              />
            </div>

            <div className="filter-actions">
              <button className="btn-apply-filters" onClick={handleApplyFilters}>
                ใช้ฟิลเตอร์
              </button>
              <button className="btn-clear-filters" onClick={handleClearFilters}>
                ล้างทั้งหมด
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2.7 Quick View Modal */}
      {quickViewTour && (
        <div className="modal-overlay" onClick={handleCloseQuickView}>
          <div className="quick-view-modal" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close"
              onClick={handleCloseQuickView}
              aria-label="ปิด"
            >
              <CloseIcon />
            </button>
            <QuickViewContent tour={quickViewTour} />
          </div>
        </div>
      )}
    </main>
  );
}

// Tour Card Component
interface TourCardProps {
  tour: Tour;
  viewMode: 'grid' | 'list';
  isComparing: boolean;
  isSaved: boolean;
  onCompareToggle: () => void;
  onSaveToggle: () => void;
  onQuickView: () => void;
}

function TourCard({ 
  tour, 
  viewMode, 
  isComparing, 
  isSaved, 
  onCompareToggle, 
  onSaveToggle, 
  onQuickView 
}: TourCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleCardClick = () => {
    trackEvent('card_click', { tourId: tour.id });
  };

  const handleBookClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    trackEvent('cta_book_click', { tourId: tour.id });
  };

  const handleDetailsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    trackEvent('cta_detail_click', { tourId: tour.id });
  };

  return (
    <article 
      className={`tour-card ${viewMode} ${tour.status}`}
      onClick={handleCardClick}
    >
      <div className="card-image-container">
        {!imageLoaded && !imageError && <div className="image-skeleton" />}
        <img
          className="card-image"
          src={tour.image}
          alt={tour.title}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          style={{ display: imageLoaded && !imageError ? 'block' : 'none' }}
        />
        
        {tour.badges.length > 0 && (
          <div className="card-badges">
            {tour.badges.map((badge, i) => (
              <span 
                key={i} 
                className={`card-badge ${
                  badge === 'ลดราคา' ? 'discount' : 
                  badge === 'ยอดนิยม' ? 'popular' : 
                  badge === 'ที่นั่งเหลือไม่มาก' ? 'limited' :
                  badge === 'Eco-Friendly' ? 'eco' : ''
                }`}
              >
                {badge}
              </span>
            ))}
          </div>
        )}

        <div className="card-actions">
          <button 
            className={`card-action-btn ${isSaved ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              onSaveToggle();
            }}
            aria-label={isSaved ? 'ลบจากรายการโปรด' : 'บันทึกเป็นรายการโปรด'}
          >
            <HeartIcon filled={isSaved} />
          </button>
          <button 
            className="card-action-btn"
            onClick={(e) => {
              e.stopPropagation();
              trackEvent('card_share', { tourId: tour.id });
            }}
            aria-label="แชร์"
          >
            <ShareIcon />
          </button>
          <button 
            className="card-action-btn"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView();
            }}
            aria-label="ดูรายละเอียดด่วน"
          >
            <EyeIcon />
          </button>
        </div>
      </div>

      <div className="card-content">
        <div className="card-header">
          <h3>{tour.title}</h3>
          <p className="card-destination">{tour.destination}, {tour.country}</p>
        </div>

        <div className="card-rating">
          <div className="rating-stars">
            {Array.from({ length: 5 }, (_, i) => (
              <StarIcon key={i} filled={i < Math.floor(tour.rating)} />
            ))}
            <span className="rating-value">{tour.rating}</span>
          </div>
          <span className="review-count">({tour.reviewCount} รีวิว)</span>
        </div>

        <div className="card-highlights">
          {tour.highlights.slice(0, 3).map((highlight, i) => (
            <span key={i} className="highlight-chip">{highlight}</span>
          ))}
        </div>

        <div className="card-details">
          <span>{tour.duration}</span>
          <span>{tour.travelMonths.join(', ')}</span>
          <span>{tour.airline}</span>
        </div>

        <div className="card-footer">
          <div className="price-section">
            {tour.originalPrice && (
              <span className="original-price">
                ฿{tour.originalPrice.toLocaleString()}
              </span>
            )}
            <div className="current-price">
              <span className="price">฿{tour.price.toLocaleString()}</span>
              <span className="price-note">/ท่าน</span>
              {tour.discountPercent && (
                <span className="discount-badge">-{tour.discountPercent}%</span>
              )}
            </div>
            <span className="price-note">{tour.priceNote}</span>
          </div>

          <div className="card-actions-row">
            <label className="compare-checkbox">
              <input
                type="checkbox"
                checked={isComparing}
                onChange={(e) => {
                  e.stopPropagation();
                  onCompareToggle();
                }}
              />
              เปรียบเทียบ
            </label>

            <button 
              className="btn-detail"
              onClick={handleDetailsClick}
            >
              ดูรายละเอียด
            </button>

            {tour.status === 'sold-out' ? (
              <button className="btn-notify" disabled>
                แจ้งเตือนรอบใหม่
              </button>
            ) : (
              <button 
                className="btn-book"
                onClick={handleBookClick}
              >
                จองเลย
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

// Quick View Content Component
function QuickViewContent({ tour }: { tour: Tour }) {
  return (
    <div className="quick-view-content">
      <div className="quick-view-image">
        <img src={tour.image} alt={tour.title} />
      </div>
      <div className="quick-view-info">
        <h2>{tour.title}</h2>
        <p className="destination">{tour.destination}, {tour.country}</p>
        
        <div className="rating">
          <div className="stars">
            {Array.from({ length: 5 }, (_, i) => (
              <StarIcon key={i} filled={i < Math.floor(tour.rating)} />
            ))}
          </div>
          <span>{tour.rating} ({tour.reviewCount} รีวิว)</span>
        </div>

        <div className="highlights">
          {tour.highlights.map((highlight, i) => (
            <span key={i} className="highlight">{highlight}</span>
          ))}
        </div>

        <div className="price-info">
          <div className="price">฿{tour.price.toLocaleString()}</div>
          <div className="duration">{tour.duration}</div>
          <div className="price-note">{tour.priceNote}</div>
        </div>

        <div className="quick-view-actions">
          <button 
            className="btn-book-quick"
            onClick={() => trackEvent('cta_book_click', { tourId: tour.id, source: 'quick_view' })}
          >
            จองเลย
          </button>
          <button 
            className="btn-detail-full"
            onClick={() => trackEvent('cta_detail_click', { tourId: tour.id, source: 'quick_view' })}
          >
            ดูรายละเอียดเต็ม
          </button>
        </div>
      </div>
    </div>
  );
}