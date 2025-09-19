// ===================================================================
// tour-search-32: TypeScript Type Definitions
// ===================================================================
// Isolated type system for tour-search-32 - no external dependencies
// Designed for mobile-first performance and comprehensive search

export interface DepartureDate {
  id: string
  date_range: string
  start_date: Date
  end_date: Date
  price: number
  original_price?: number
  available_seats: number
  total_seats: number
  status: 'available' | 'low' | 'soldout'
  special_notes?: string
  early_bird?: boolean
  last_minute?: boolean
}

export interface TourHighlight {
  id: string
  text: string
  icon?: string
  category: 'attraction' | 'experience' | 'accommodation' | 'transport' | 'meal' | 'activity'
}

export interface TourLocation {
  country: string
  country_code: string
  region: string
  cities: string[]
  coordinates?: {
    lat: number
    lng: number
  }
}

export interface TourPricing {
  base_price: number
  currency: 'THB'
  original_price?: number
  discount_percentage?: number
  promotion_text?: string
  price_includes: string[]
  price_excludes: string[]
  deposit_required: number
  payment_terms: string
}

export interface TourQuality {
  rating: number
  review_count: number
  satisfaction_score: number
  trust_score: number
  completion_rate: number
  repeat_customers: number
}

export interface TourMedia {
  hero_image: string
  gallery_images: string[]
  video_url?: string
  virtual_tour_url?: string
  alt_texts: string[]
}

export interface TourAvailability {
  available_seats: number
  total_capacity: number
  min_group_size: number
  max_group_size: number
  departure_dates: DepartureDate[]
  booking_deadline_days: number
  cancellation_policy: string
}

export interface TourMetadata {
  id: string
  slug: string
  canonical_url: string
  source_page: '13' | '21'
  created_at: string
  updated_at: string
  featured: boolean
  priority_score: number
  search_keywords: string[]
  seo_title?: string
  seo_description?: string
}

// Main SearchIndex Tour Interface
export interface SearchIndexTour {
  // Core identification
  metadata: TourMetadata
  
  // Basic information
  title: string
  description: string
  duration_days: number
  nights: number
  
  // Location data
  location: TourLocation
  
  // Pricing information
  pricing: TourPricing
  
  // Quality metrics
  quality: TourQuality
  
  // Highlights and features
  highlights: TourHighlight[]
  tags: string[]
  themes: string[]
  
  // Media content
  media: TourMedia
  
  // Availability and booking
  availability: TourAvailability
  
  // Search optimization
  search_text: string // Concatenated searchable text
  popularity_score: number
  conversion_rate: number
}

// Filter and Search Types
export interface SearchFilters {
  // Text search
  query?: string
  
  // Location filters
  countries?: string[]
  regions?: string[]
  cities?: string[]
  
  // Price filters
  price_min?: number
  price_max?: number
  has_promotion?: boolean
  
  // Duration filters
  duration_min?: number
  duration_max?: number
  
  // Quality filters
  min_rating?: number
  min_reviews?: number
  
  // Availability filters
  departure_month?: string[]
  available_only?: boolean
  min_seats?: number
  
  // Feature filters
  themes?: string[]
  tags?: string[]
  
  // Traveler preferences
  group_size?: number
  budget_category?: 'budget' | 'mid' | 'luxury' | 'premium'
}

export interface SearchSortOptions {
  field: 'popularity' | 'price' | 'rating' | 'duration' | 'departure_date' | 'discount'
  direction: 'asc' | 'desc'
  priority?: number
}

export interface SearchResult {
  tours: SearchIndexTour[]
  total_count: number
  page: number
  per_page: number
  filters_applied: SearchFilters
  sort_applied: SearchSortOptions
  search_time_ms: number
  suggestions?: string[]
}

// Lead capture types (separate from booking)
export interface LeadCapture {
  // Personal information
  name: string
  email: string
  phone: string
  
  // Travel preferences
  tour_id: string
  preferred_month?: string
  group_size?: number
  budget_range?: string
  special_requests?: string
  
  // Marketing consent
  marketing_consent: boolean
  sms_consent: boolean
  
  // Tracking
  source: 'search' | 'tour_detail' | 'filter' | 'direct'
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  
  // Metadata
  created_at: Date
  ip_address?: string
  user_agent?: string
}

// UI Component types
export interface TourCard {
  tour: SearchIndexTour
  view_mode: 'card' | 'list'
  show_wishlist?: boolean
  show_quick_book?: boolean
  on_click?: (tour: SearchIndexTour) => void
  on_wishlist_toggle?: (tour_id: string) => void
  on_quick_book?: (tour: SearchIndexTour) => void
}

export interface FilterDrawer {
  filters: SearchFilters
  on_filter_change: (filters: SearchFilters) => void
  on_clear_filters: () => void
  is_open: boolean
  on_close: () => void
  total_results: number
}

// State management types
export interface SearchState {
  // Data
  tours: SearchIndexTour[]
  total_count: number
  
  // Loading states
  is_loading: boolean
  is_searching: boolean
  is_filtering: boolean
  
  // Current state
  current_filters: SearchFilters
  current_sort: SearchSortOptions
  current_page: number
  
  // UI state
  view_mode: 'card' | 'list'
  filter_drawer_open: boolean
  sort_dropdown_open: boolean
  
  // Search history
  recent_searches: string[]
  search_suggestions: string[]
  
  // User preferences
  wishlist: string[]
  preferred_currency: 'THB'
  
  // Error handling
  error: string | null
  retry_count: number
}

// Action types for state management
export type SearchAction = 
  | { type: 'SEARCH_START'; payload: { query: string } }
  | { type: 'SEARCH_SUCCESS'; payload: SearchResult }
  | { type: 'SEARCH_ERROR'; payload: { error: string } }
  | { type: 'FILTER_CHANGE'; payload: { filters: SearchFilters } }
  | { type: 'SORT_CHANGE'; payload: { sort: SearchSortOptions } }
  | { type: 'VIEW_MODE_CHANGE'; payload: { mode: 'card' | 'list' } }
  | { type: 'PAGE_CHANGE'; payload: { page: number } }
  | { type: 'WISHLIST_TOGGLE'; payload: { tour_id: string } }
  | { type: 'CLEAR_FILTERS' }
  | { type: 'CLEAR_ERROR' }

// Configuration types
export interface TS32Config {
  // Search configuration
  search: {
    debounce_ms: number
    min_query_length: number
    max_results_per_page: number
    fuzzy_search_threshold: number
  }
  
  // UI configuration
  ui: {
    mobile_breakpoint: number
    tablet_breakpoint: number
    desktop_breakpoint: number
    animation_duration_ms: number
    touch_target_min_size: number
  }
  
  // Performance configuration
  performance: {
    lazy_load_threshold: number
    image_sizes: string
    virtual_scroll_threshold: number
    cache_duration_ms: number
  }
  
  // Analytics configuration
  analytics: {
    track_searches: boolean
    track_filters: boolean
    track_clicks: boolean
    track_conversions: boolean
  }
}

export default SearchIndexTour