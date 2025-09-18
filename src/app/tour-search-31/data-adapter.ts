/**
 * ETL Adapter for Tour Search 31
 * Extracts and normalizes data from tour-search-13 and tour-search-21
 * This is READ-ONLY data extraction - no code/style/assets are reused
 */

export interface NormalizedTour {
  // Core identification
  id: string
  sourceRoute: 'tour-13' | 'tour-21'
  canonicalUrl: string
  
  // Basic information
  title: string
  destination: string
  countries: string[]
  cities: string[]
  
  // Duration & Schedule
  durationDays: number
  durationNights: number
  durationText: string
  
  // Pricing
  priceFrom: number
  priceOriginal?: number
  discountPercent?: number
  currency: string
  
  // Availability
  availableSeats: number
  isAvailable: boolean
  departureDates?: string[]
  travelPeriod?: string
  
  // Quality metrics
  rating: number
  reviewCount: number
  satisfactionRate?: number
  
  // Content
  highlights: string[]
  tags: string[]
  themes: string[]
  
  // Visual
  imageUrl: string
  
  // Metadata
  lastUpdated: string
  viewCount?: number
  bookingCount?: number
}

export interface SearchIndex {
  tours: NormalizedTour[]
  facets: {
    destinations: Array<{ name: string; count: number; flagCode?: string }>
    priceRanges: Array<{ min: number; max: number; count: number; label: string }>
    durations: Array<{ days: number; count: number; label: string }>
    ratings: Array<{ min: number; count: number; label: string }>
    themes: Array<{ name: string; count: number }>
    months: Array<{ month: string; year: number; count: number }>
  }
  stats: {
    totalTours: number
    avgPrice: number
    avgRating: number
    lastIndexed: string
  }
}

// Data extraction functions (simulated - in production would fetch real data)
export function extractFromRoute13Data(): Partial<NormalizedTour>[] {
  // Simulated extraction from tour-search-13 data structure
  // In production, this would read from the actual data source
  const mockData13 = [
    {
      id: 'r13-jp-001',
      title: 'ญี่ปุ่น 7 วัน 6 คืน โตเกียว-เกียวโต-โอซาก้า',
      destination: 'ญี่ปุ่น',
      cities: ['โตเกียว', 'เกียวโต', 'โอซาก้า'],
      durationText: '7 วัน 6 คืน',
      priceFrom: 45900,
      priceOriginal: 52900,
      rating: 4.8,
      reviewCount: 127,
      highlights: ['วัดคิโยมิซุ', 'ภูเขาฟูจิ', 'ชินจูกุ'],
      availableSeats: 8,
      imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop'
    },
    {
      id: 'r13-kr-002',
      title: 'เกาหลีใต้ 6 วัน 5 คืน โซล-ปูซาน-เชจู',
      destination: 'เกาหลีใต้',
      cities: ['โซล', 'ปูซาน', 'เชจู'],
      durationText: '6 วัน 5 คืน',
      priceFrom: 38900,
      priceOriginal: 45900,
      rating: 4.7,
      reviewCount: 89,
      highlights: ['พระราชวังเคียงบกกุง', 'เกาะเชจู', 'ตลาดนัมแดมุน'],
      availableSeats: 12,
      imageUrl: 'https://images.unsplash.com/photo-1538485399081-7c8ed7f69c91?w=800&h=600&fit=crop'
    },
    {
      id: 'r13-eu-003',
      title: 'ยุโรป 12 วัน 11 คืน ฝรั่งเศส-อิตาลี-สวิตเซอร์แลนด์',
      destination: 'ยุโรป',
      cities: ['ปารีส', 'โรม', 'มิลาน', 'ซูริค'],
      durationText: '12 วัน 11 คืน',
      priceFrom: 129900,
      priceOriginal: 149900,
      rating: 4.9,
      reviewCount: 203,
      highlights: ['หอไอเฟล', 'โคลอสเซียม', 'หอเอนปิซา'],
      availableSeats: 5,
      imageUrl: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&h=600&fit=crop'
    }
  ]
  
  return mockData13.map(tour => ({
    ...tour,
    sourceRoute: 'tour-13' as const,
    canonicalUrl: `/tour-search-13/${tour.id.split('-').pop()}`
  }))
}

export function extractFromRoute21Data(): Partial<NormalizedTour>[] {
  // Simulated extraction from tour-search-21 data structure
  const mockData21 = [
    {
      id: 'r21-jp-001',
      title: 'ทัวร์ญี่ปุ่น โตเกียว เกียวโต',
      destination: 'ญี่ปุ่น',
      cities: ['โตเกียว', 'เกียวโต'],
      durationText: '5 วัน 4 คืน',
      priceFrom: 45900,
      priceOriginal: 52900,
      rating: 4.8,
      reviewCount: 156,
      highlights: ['ชมซากุระ', 'วัดเก่าแก่', 'รถไฟความเร็วสูง'],
      availableSeats: 8,
      travelPeriod: 'ม.ค. - เม.ย. 68',
      imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop'
    },
    {
      id: 'r21-tw-002',
      title: 'ทัวร์ไต้หวัน ไทเป เกาสง',
      destination: 'ไต้หวัน',
      cities: ['ไทเป', 'เกาสง'],
      durationText: '4 วัน 3 คืน',
      priceFrom: 19900,
      rating: 4.6,
      reviewCount: 234,
      highlights: ['ตลาดกลางคืน', 'น้ำพุร้อน', 'รถไฟความเร็วสูง'],
      availableSeats: 3,
      imageUrl: 'https://images.unsplash.com/photo-1508248467877-aec1b08de376?w=800&h=600&fit=crop'
    },
    {
      id: 'r21-dubai-003',
      title: 'ทัวร์ดูไบ อาบูดาบี',
      destination: 'ดูไบ',
      cities: ['ดูไบ', 'อาบูดาบี'],
      durationText: '6 วัน 4 คืน',
      priceFrom: 42900,
      rating: 4.7,
      reviewCount: 145,
      highlights: ['ตึกบุรจญ์คาลิฟา', 'ทะเลทราย', 'ช้อปปิ้งหรู'],
      availableSeats: 10,
      imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop'
    }
  ]
  
  return mockData21.map(tour => ({
    ...tour,
    sourceRoute: 'tour-21' as const,
    canonicalUrl: `/tour-search-21/${tour.id.split('-').slice(-1)[0]}`
  }))
}

// Normalize tour data to unified schema
export function normalizeTour(rawTour: any, source: 'tour-13' | 'tour-21'): NormalizedTour {
  // Parse duration
  const durationMatch = rawTour.durationText?.match(/(\d+)\s*วัน\s*(\d+)?\s*คืน/)
  const days = durationMatch ? parseInt(durationMatch[1]) : 1
  const nights = durationMatch && durationMatch[2] ? parseInt(durationMatch[2]) : days - 1
  
  // Calculate discount
  const discount = rawTour.priceOriginal 
    ? Math.round((1 - rawTour.priceFrom / rawTour.priceOriginal) * 100)
    : 0
  
  // Extract themes from highlights
  const themes = extractThemes(rawTour.highlights || [])
  
  return {
    id: rawTour.id,
    sourceRoute: rawTour.sourceRoute,
    canonicalUrl: rawTour.canonicalUrl,
    
    title: rawTour.title,
    destination: rawTour.destination,
    countries: [rawTour.destination], // Simplified - could map to actual countries
    cities: rawTour.cities || [],
    
    durationDays: days,
    durationNights: nights,
    durationText: rawTour.durationText,
    
    priceFrom: rawTour.priceFrom,
    priceOriginal: rawTour.priceOriginal,
    discountPercent: discount,
    currency: 'THB',
    
    availableSeats: rawTour.availableSeats || 0,
    isAvailable: (rawTour.availableSeats || 0) > 0,
    departureDates: rawTour.departureDates,
    travelPeriod: rawTour.travelPeriod,
    
    rating: rawTour.rating || 0,
    reviewCount: rawTour.reviewCount || 0,
    satisfactionRate: rawTour.rating ? Math.round(rawTour.rating * 20) : undefined,
    
    highlights: rawTour.highlights || [],
    tags: generateTags(rawTour),
    themes,
    
    imageUrl: rawTour.imageUrl,
    
    lastUpdated: new Date().toISOString(),
    viewCount: Math.floor(Math.random() * 500) + 50,
    bookingCount: Math.floor(Math.random() * 50) + 5
  }
}

// Helper functions
function extractThemes(highlights: string[]): string[] {
  const themeMap: Record<string, string[]> = {
    'ธรรมชาติ': ['ภูเขา', 'ทะเล', 'น้ำตก', 'ป่า', 'ธาร', 'ทะเลสาบ'],
    'วัฒนธรรม': ['วัด', 'พระราชวัง', 'ศาล', 'เมืองเก่า', 'หมู่บ้าน'],
    'ผจญภัย': ['ปีนเขา', 'ดำน้ำ', 'กระโดด', 'ล่องแก่ง'],
    'ช้อปปิ้ง': ['ตลาด', 'ช้อปปิ้ง', 'ซื้อ', 'ของฝาก'],
    'อาหาร': ['อาหาร', 'ชิม', 'ลิ้มรส', 'ร้านอาหาร']
  }
  
  const themes = new Set<string>()
  highlights.forEach(highlight => {
    Object.entries(themeMap).forEach(([theme, keywords]) => {
      if (keywords.some(keyword => highlight.includes(keyword))) {
        themes.add(theme)
      }
    })
  })
  
  return Array.from(themes)
}

function generateTags(tour: any): string[] {
  const tags = []
  
  // Price tags
  if (tour.priceFrom < 20000) tags.push('ราคาประหยัด')
  if (tour.priceFrom > 80000) tags.push('ระดับพรีเมียม')
  if (tour.discountPercent > 10) tags.push('โปรโมชั่น')
  
  // Duration tags
  if (tour.durationDays <= 3) tags.push('ทริปสั้น')
  if (tour.durationDays >= 7) tags.push('ทริปยาว')
  
  // Availability tags
  if (tour.availableSeats <= 5 && tour.availableSeats > 0) tags.push('ที่นั่งจำกัด')
  if (tour.availableSeats === 0) tags.push('เต็ม')
  
  // Rating tags
  if (tour.rating >= 4.8) tags.push('ยอดนิยม')
  if (tour.reviewCount > 100) tags.push('รีวิวเยอะ')
  
  return tags
}

// Build complete search index
export function buildSearchIndex(): SearchIndex {
  // Extract data from both sources
  const route13Tours = extractFromRoute13Data()
  const route21Tours = extractFromRoute21Data()
  
  // Normalize all tours
  const normalizedTours = [
    ...route13Tours.map(t => normalizeTour(t, 'tour-13')),
    ...route21Tours.map(t => normalizeTour(t, 'tour-21'))
  ]
  
  // Build facets
  const destinationCounts = new Map<string, number>()
  const priceRanges = [
    { min: 0, max: 20000, count: 0, label: 'ต่ำกว่า 20,000' },
    { min: 20000, max: 50000, count: 0, label: '20,000 - 50,000' },
    { min: 50000, max: 100000, count: 0, label: '50,000 - 100,000' },
    { min: 100000, max: Infinity, count: 0, label: 'มากกว่า 100,000' }
  ]
  const durationCounts = new Map<number, number>()
  const ratingRanges = [
    { min: 4.5, count: 0, label: '4.5 ขึ้นไป' },
    { min: 4.0, count: 0, label: '4.0 ขึ้นไป' },
    { min: 3.5, count: 0, label: '3.5 ขึ้นไป' }
  ]
  const themeCounts = new Map<string, number>()
  
  // Process tours for facets
  normalizedTours.forEach(tour => {
    // Destinations
    destinationCounts.set(tour.destination, (destinationCounts.get(tour.destination) || 0) + 1)
    
    // Price ranges
    priceRanges.forEach(range => {
      if (tour.priceFrom >= range.min && tour.priceFrom < range.max) {
        range.count++
      }
    })
    
    // Durations
    durationCounts.set(tour.durationDays, (durationCounts.get(tour.durationDays) || 0) + 1)
    
    // Ratings
    ratingRanges.forEach(range => {
      if (tour.rating >= range.min) {
        range.count++
      }
    })
    
    // Themes
    tour.themes.forEach(theme => {
      themeCounts.set(theme, (themeCounts.get(theme) || 0) + 1)
    })
  })
  
  // Calculate stats
  const avgPrice = normalizedTours.reduce((sum, t) => sum + t.priceFrom, 0) / normalizedTours.length
  const avgRating = normalizedTours.reduce((sum, t) => sum + t.rating, 0) / normalizedTours.length
  
  return {
    tours: normalizedTours,
    facets: {
      destinations: Array.from(destinationCounts.entries())
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count),
      priceRanges: priceRanges.filter(r => r.count > 0),
      durations: Array.from(durationCounts.entries())
        .map(([days, count]) => ({ 
          days, 
          count, 
          label: `${days} วัน` 
        }))
        .sort((a, b) => a.days - b.days),
      ratings: ratingRanges.filter(r => r.count > 0),
      themes: Array.from(themeCounts.entries())
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count),
      months: [] // Would be populated from actual departure dates
    },
    stats: {
      totalTours: normalizedTours.length,
      avgPrice: Math.round(avgPrice),
      avgRating: Math.round(avgRating * 10) / 10,
      lastIndexed: new Date().toISOString()
    }
  }
}

// Search and filter functions
export function searchTours(
  index: SearchIndex,
  query: string,
  filters: {
    destination?: string
    priceMin?: number
    priceMax?: number
    durationDays?: number
    minRating?: number
    themes?: string[]
    availability?: boolean
  } = {}
): NormalizedTour[] {
  let results = [...index.tours]
  
  // Text search
  if (query) {
    const searchTerms = query.toLowerCase().split(' ')
    results = results.filter(tour => {
      const searchText = [
        tour.title,
        tour.destination,
        ...tour.cities,
        ...tour.highlights,
        ...tour.tags,
        ...tour.themes
      ].join(' ').toLowerCase()
      
      return searchTerms.every(term => searchText.includes(term))
    })
  }
  
  // Apply filters
  if (filters.destination) {
    results = results.filter(t => t.destination === filters.destination)
  }
  
  if (filters.priceMin !== undefined) {
    results = results.filter(t => t.priceFrom >= filters.priceMin!)
  }
  
  if (filters.priceMax !== undefined) {
    results = results.filter(t => t.priceFrom <= filters.priceMax!)
  }
  
  if (filters.durationDays) {
    results = results.filter(t => t.durationDays === filters.durationDays)
  }
  
  if (filters.minRating) {
    results = results.filter(t => t.rating >= filters.minRating!)
  }
  
  if (filters.themes && filters.themes.length > 0) {
    results = results.filter(t => 
      filters.themes!.some(theme => t.themes.includes(theme))
    )
  }
  
  if (filters.availability !== undefined) {
    results = results.filter(t => t.isAvailable === filters.availability)
  }
  
  return results
}

// Sort functions
export function sortTours(
  tours: NormalizedTour[],
  sortBy: 'recommended' | 'price-low' | 'price-high' | 'rating' | 'departure' | 'discount'
): NormalizedTour[] {
  const sorted = [...tours]
  
  switch (sortBy) {
    case 'price-low':
      return sorted.sort((a, b) => a.priceFrom - b.priceFrom)
    
    case 'price-high':
      return sorted.sort((a, b) => b.priceFrom - a.priceFrom)
    
    case 'rating':
      return sorted.sort((a, b) => {
        if (b.rating === a.rating) {
          return b.reviewCount - a.reviewCount
        }
        return b.rating - a.rating
      })
    
    case 'discount':
      return sorted.sort((a, b) => (b.discountPercent || 0) - (a.discountPercent || 0))
    
    case 'departure':
      return sorted.sort((a, b) => b.availableSeats - a.availableSeats)
    
    case 'recommended':
    default:
      // Complex scoring algorithm
      return sorted.sort((a, b) => {
        const scoreA = calculateRecommendationScore(a)
        const scoreB = calculateRecommendationScore(b)
        return scoreB - scoreA
      })
  }
}

function calculateRecommendationScore(tour: NormalizedTour): number {
  let score = 0
  
  // Rating weight (max 40 points)
  score += tour.rating * 8
  
  // Review count weight (max 20 points)
  score += Math.min(tour.reviewCount / 10, 20)
  
  // Availability weight (max 10 points)
  if (tour.isAvailable) {
    score += 10
    if (tour.availableSeats <= 5) score += 5 // Urgency bonus
  }
  
  // Discount weight (max 10 points)
  if (tour.discountPercent) {
    score += Math.min(tour.discountPercent / 2, 10)
  }
  
  // View/booking weight (max 20 points)
  if (tour.viewCount) {
    score += Math.min(tour.viewCount / 50, 10)
  }
  if (tour.bookingCount) {
    score += Math.min(tour.bookingCount / 5, 10)
  }
  
  return score
}