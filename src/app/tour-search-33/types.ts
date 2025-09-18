// TS33 Types - Isolated type definitions for tour-search-33
// Based on code audit of tour-search-13 and tour-search-21

export interface TS33Tour {
  id: string
  slug: string
  title: string
  country: string
  cities: string[]
  duration_days: number
  nights: number
  price_from: number
  original_price?: number // ราคาเดิมก่อนลด
  currency: 'THB'
  badges: string[]
  highlights: string[]
  rating: number
  reviews_count: number
  departures: TS33Departure[]
  tags: string[]
  themes: string[]
  canonicalUrl: string
  image_url: string
  gallery_urls: string[]
  is_flash_sale?: boolean // Flag สำหรับ Flash Sale
  flash_sale_end?: string // เวลาสิ้นสุด Flash Sale
  discount_percentage?: number // เปอร์เซ็นต์ส่วนลด
}

export interface TS33Departure {
  date_range: string
  status: 'available' | 'low' | 'soldout'
  seats_left: number
  price: number
  is_promotion?: boolean
  promotion_text?: string
}

export interface TS33SearchIndex {
  tours: TS33Tour[]
  countries: TS33Country[]
  filters: TS33FilterOptions
  meta: TS33Meta
}

export interface TS33Country {
  name: string
  code: string
  flag_code: string
  region: string
  tour_count: number
}

export interface TS33FilterOptions {
  countries: TS33Country[]
  price_ranges: TS33PriceRange[]
  durations: TS33Duration[]
  themes: TS33Theme[]
  months: TS33Month[]
  ratings: TS33Rating[]
}

export interface TS33PriceRange {
  id: string
  label: string
  min: number
  max: number
  tour_count: number
}

export interface TS33Duration {
  id: string
  label: string
  min_days: number
  max_days: number
  tour_count: number
}

export interface TS33Theme {
  id: string
  label: string
  icon: string
  tour_count: number
}

export interface TS33Month {
  id: string
  name: string
  short: string
  value: string
  is_high_season: boolean
  tour_count: number
}

export interface TS33Rating {
  id: string
  label: string
  min_rating: number
  tour_count: number
}

export interface TS33Meta {
  total_tours: number
  last_updated: string
  version: string
}

export interface TS33SearchFilters {
  keyword: string
  countries: string[]
  price_range: [number, number] | null
  duration: string | null
  themes: string[]
  months: string[]
  rating: number | null
  sort_by: TS33SortOption
}

export type TS33SortOption = 
  | 'recommended'
  | 'price_low'
  | 'price_high'
  | 'rating'
  | 'duration'
  | 'popularity'

export interface TS33SearchState {
  filters: TS33SearchFilters
  results: TS33Tour[]
  loading: boolean
  error: string | null
  total_count: number
  has_more: boolean
  page: number
}

export interface TS33LeadData {
  name: string
  phone: string
  email: string
  tour_id: string
  preferred_months: string[]
  participants: number
  budget_range: string
  message?: string
  privacy_consent: boolean
  source: 'search33'
}

export interface TS33LeadFormErrors {
  name?: string
  phone?: string
  email?: string
  preferred_months?: string
  participants?: string
  budget_range?: string
  privacy_consent?: string
}

// Component prop types
export interface TS33TourCardProps {
  tour: TS33Tour
  variant: 'card' | 'list'
  show_wishlist?: boolean
  on_click?: (tour: TS33Tour) => void
}

export interface TS33FilterDrawerProps {
  open: boolean
  filters: TS33SearchFilters
  filter_options: TS33FilterOptions
  on_close: () => void
  on_apply: (filters: TS33SearchFilters) => void
  on_clear: () => void
}

export interface TS33LeadModalProps {
  open: boolean
  tour: TS33Tour | null
  on_close: () => void
  on_submit: (lead: TS33LeadData) => Promise<void>
  loading?: boolean
}