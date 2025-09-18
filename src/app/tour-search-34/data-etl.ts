// ===================================================================
// tour-search-32: Data ETL System
// ===================================================================
// Extract, Transform, Load data from tour-search-13 and tour-search-21
// Creates optimized SearchIndex for tour-search-32

import { SearchIndexTour, DepartureDate, TourHighlight, SearchFilters } from './types'

// ===================================================================
// Extract: Data sources from existing implementations
// ===================================================================

// Legacy tour interface (from tour-search-13 and 21)
interface LegacyTour {
  id: number | string
  title: string
  destination: string
  duration: string
  price: number
  originalPrice?: number
  rating: number
  reviews?: number
  reviewCount?: number
  image: string
  highlights: string[]
  destinations?: string[]
  discount?: number
  groupSize?: string
  departureDate?: string
  available?: boolean
  availableSeats?: number
  travelPeriod?: string
  gallery?: string[]
  itinerary?: any[]
}

// Country mapping with regions
const COUNTRY_REGIONS: Record<string, { region: string; country_code: string }> = {
  'ญี่ปุ่น': { region: 'East Asia', country_code: 'JP' },
  'เกาหลีใต้': { region: 'East Asia', country_code: 'KR' },
  'จีน': { region: 'East Asia', country_code: 'CN' },
  'ไต้หวัน': { region: 'East Asia', country_code: 'TW' },
  'ฮ่องกง': { region: 'East Asia', country_code: 'HK' },
  'สิงคโปร์': { region: 'Southeast Asia', country_code: 'SG' },
  'มาเลเซีย': { region: 'Southeast Asia', country_code: 'MY' },
  'ไทย': { region: 'Southeast Asia', country_code: 'TH' },
  'เวียดนาม': { region: 'Southeast Asia', country_code: 'VN' },
  'อินโดนีเซีย': { region: 'Southeast Asia', country_code: 'ID' },
  'ฟิลิปปินส์': { region: 'Southeast Asia', country_code: 'PH' },
  'อินเดีย': { region: 'South Asia', country_code: 'IN' },
  'ศรีลังกา': { region: 'South Asia', country_code: 'LK' },
  'เนปาล': { region: 'South Asia', country_code: 'NP' },
  'ยุโรป': { region: 'Europe', country_code: 'EU' },
  'ฝรั่งเศส': { region: 'Western Europe', country_code: 'FR' },
  'อิตาลี': { region: 'Southern Europe', country_code: 'IT' },
  'สเปน': { region: 'Southern Europe', country_code: 'ES' },
  'เยอรมัน': { region: 'Central Europe', country_code: 'DE' },
  'สวิตเซอร์แลนด์': { region: 'Central Europe', country_code: 'CH' },
  'ออสเตรีย': { region: 'Central Europe', country_code: 'AT' },
  'อังกฤษ': { region: 'Western Europe', country_code: 'GB' },
  'เนเธอร์แลนด์': { region: 'Western Europe', country_code: 'NL' },
  'เบลเยียม': { region: 'Western Europe', country_code: 'BE' },
  'สวีเดน': { region: 'Northern Europe', country_code: 'SE' },
  'นอร์เวย์': { region: 'Northern Europe', country_code: 'NO' },
  'ฟินแลนด์': { region: 'Northern Europe', country_code: 'FI' },
  'เดนมาร์ก': { region: 'Northern Europe', country_code: 'DK' },
  'ไอซ์แลนด์': { region: 'Northern Europe', country_code: 'IS' },
  'รัสเซีย': { region: 'Eastern Europe', country_code: 'RU' },
  'ตุรกี': { region: 'Western Asia', country_code: 'TR' },
  'อียิปต์': { region: 'Africa', country_code: 'EG' },
  'โมร็อกโก': { region: 'Africa', country_code: 'MA' },
  'แอฟริกาใต้': { region: 'Africa', country_code: 'ZA' },
  'ออสเตรเลีย': { region: 'Oceania', country_code: 'AU' },
  'นิวซีแลนด์': { region: 'Oceania', country_code: 'NZ' },
  'สหรัฐอเมริกา': { region: 'North America', country_code: 'US' },
  'แคนาดา': { region: 'North America', country_code: 'CA' },
  'เปรู': { region: 'South America', country_code: 'PE' },
  'อาร์เจนตินา': { region: 'South America', country_code: 'AR' },
  'บราซิล': { region: 'South America', country_code: 'BR' },
  'ดูไบ': { region: 'Middle East', country_code: 'AE' },
  'สหรัฐอาหรับเอมิเรตส์': { region: 'Middle East', country_code: 'AE' },
  'อิสราเอล': { region: 'Middle East', country_code: 'IL' },
  'จอร์แดน': { region: 'Middle East', country_code: 'JO' }
}

// Theme categorization
const HIGHLIGHT_THEMES: Record<string, string[]> = {
  'nature': ['ธรรมชาติ', 'ภูเขา', 'ทะเล', 'น้ำตก', 'ป่า', 'สวน', 'เกาะ', 'ชายหาด'],
  'culture': ['วัฒนธรรม', 'วัด', 'ปราสาท', 'พระราชวัง', 'โบราณ', 'ประวัติศาสตร์', 'พิพิธภัณฑ์'],
  'food': ['อาหาร', 'ตลาด', 'ร้านอาหาร', 'ของกิน', 'เมนูพิเศษ', 'อาหารท้องถิ่น'],
  'shopping': ['ช้อปปิ้ง', 'ตลาด', 'ห้างสรรพสินค้า', 'ของฝาก', 'สินค้า'],
  'adventure': ['ผจญภัย', 'กีฬา', 'ปีนเขา', 'ดำน้ำ', 'เล่นสกี', 'รถไฟ'],
  'relaxation': ['ผ่อนคลาย', 'สปา', 'น้ำพุร้อน', 'นวดแผนไทย', 'โยคะ'],
  'modern': ['ทันสมัย', 'เทคโนโลยี', 'ตึกสูง', 'สะพาน', 'รถไฟความเร็วสูง'],
  'entertainment': ['บันเทิง', 'สวนสนุก', 'โชว์', 'คอนเสิร์ต', 'งานเทศกาล']
}

// ===================================================================
// Transform: Data processing functions
// ===================================================================

class TourDataETL {
  private generateDepartureDates(
    basePrice: number, 
    travelPeriod?: string,
    availableSeats: number = 15
  ): DepartureDate[] {
    const dates: DepartureDate[] = []
    const currentDate = new Date()
    
    // Generate 6-12 departure dates over next 6 months
    for (let i = 0; i < 8; i++) {
      const departureDate = new Date(currentDate)
      departureDate.setDate(currentDate.getDate() + (i * 14) + Math.random() * 7) // Every 2 weeks +- variation
      
      const endDate = new Date(departureDate)
      endDate.setDate(departureDate.getDate() + 5 + Math.random() * 3) // 5-8 day trips
      
      // Price variation: ±20% based on season/demand
      const priceMultiplier = 0.8 + (Math.random() * 0.4)
      const price = Math.round(basePrice * priceMultiplier)
      
      // Seats availability simulation
      const totalSeats = 20 + Math.floor(Math.random() * 15) // 20-35 total seats
      const seatsLeft = Math.max(0, Math.min(totalSeats, availableSeats + Math.floor(Math.random() * 10) - 5))
      
      // Determine status
      let status: 'available' | 'low' | 'soldout' = 'available'
      if (seatsLeft === 0) status = 'soldout'
      else if (seatsLeft <= 3) status = 'low'
      
      dates.push({
        id: `dep-${i + 1}`,
        date_range: `${departureDate.toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })} - ${endDate.toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })}`,
        start_date: departureDate,
        end_date: endDate,
        price,
        available_seats: seatsLeft,
        total_seats: totalSeats,
        status,
        early_bird: i < 2 && price < basePrice * 0.9,
        last_minute: i > 5 && price < basePrice * 0.85
      })
    }
    
    return dates.filter(d => d.start_date > currentDate) // Only future dates
  }

  private categorizeHighlights(highlights: string[]): TourHighlight[] {
    return highlights.map((highlight, index) => {
      let category: TourHighlight['category'] = 'attraction'
      
      // Categorize based on keywords
      const text = highlight.toLowerCase()
      if (text.includes('โรงแรม') || text.includes('ที่พัก')) category = 'accommodation'
      else if (text.includes('อาหาร') || text.includes('มื้อ')) category = 'meal'
      else if (text.includes('รถ') || text.includes('เครื่องบิน')) category = 'transport'
      else if (text.includes('กิจกรรม') || text.includes('เล่น')) category = 'activity'
      else if (text.includes('ชม') || text.includes('เที่ยว')) category = 'experience'
      
      return {
        id: `highlight-${index}`,
        text: highlight,
        category
      }
    })
  }

  private extractThemes(title: string, highlights: string[]): string[] {
    const allText = `${title} ${highlights.join(' ')}`.toLowerCase()
    const themes: string[] = []
    
    Object.entries(HIGHLIGHT_THEMES).forEach(([theme, keywords]) => {
      if (keywords.some(keyword => allText.includes(keyword.toLowerCase()))) {
        themes.push(theme)
      }
    })
    
    return themes.length > 0 ? themes : ['general']
  }

  private extractMainDestination(tour: LegacyTour): string {
    // First check if destination field exists
    if (tour.destination) {
      return tour.destination
    }
    
    // Extract from title - look for known countries
    const titleLower = tour.title.toLowerCase()
    for (const country of Object.keys(COUNTRY_REGIONS)) {
      if (titleLower.includes(country.toLowerCase())) {
        return country
      }
    }
    
    // Fallback to first destination in destinations array
    if (tour.destinations && tour.destinations.length > 0) {
      // Try to find a main country from destinations
      for (const dest of tour.destinations) {
        for (const country of Object.keys(COUNTRY_REGIONS)) {
          if (dest.toLowerCase().includes(country.toLowerCase()) || country.toLowerCase().includes(dest.toLowerCase())) {
            return country
          }
        }
      }
      return tour.destinations[0]
    }
    
    return 'ไทย' // Default fallback
  }

  private generateSearchKeywords(tour: LegacyTour): string[] {
    const keywords = new Set<string>()
    
    // Extract from title
    if (tour.title && typeof tour.title === 'string') {
      tour.title.split(' ').forEach(word => {
        if (word.length > 2) keywords.add(word.toLowerCase())
      })
    }
    
    // Add destination (extract main destination)
    const mainDestination = this.extractMainDestination(tour)
    keywords.add(mainDestination.toLowerCase())
    
    // Add highlights
    if (tour.highlights && Array.isArray(tour.highlights)) {
      tour.highlights.forEach(highlight => {
        if (highlight && typeof highlight === 'string') {
          highlight.split(' ').forEach(word => {
            if (word.length > 2) keywords.add(word.toLowerCase())
          })
        }
      })
    }
    
    // Add destinations array if available
    if (tour.destinations && Array.isArray(tour.destinations)) {
      tour.destinations.forEach(dest => {
        if (dest) {
          keywords.add(dest.toLowerCase())
        }
      })
    }
    
    return Array.from(keywords)
  }

  private parseDuration(duration: string): { days: number; nights: number } {
    const match = duration.match(/(\d+)\s*วัน\s*(\d+)\s*คืน/)
    if (match) {
      return { days: parseInt(match[1]), nights: parseInt(match[2]) }
    }
    
    // Fallback parsing
    const dayMatch = duration.match(/(\d+)\s*วัน/)
    if (dayMatch) {
      const days = parseInt(dayMatch[1])
      return { days, nights: Math.max(0, days - 1) }
    }
    
    return { days: 5, nights: 4 } // Default
  }

  private generateSlug(title: string, id: string | number): string {
    return title
      .toLowerCase()
      .replace(/[^\u0E00-\u0E7Fa-z0-9\s]/g, '') // Keep Thai, English, numbers, spaces
      .trim()
      .replace(/\s+/g, '-')
      .substring(0, 50) + `-${id}`
  }

  private calculatePopularityScore(tour: LegacyTour): number {
    const rating = tour.rating || 4.0
    const reviews = tour.reviews || tour.reviewCount || 0
    const hasDiscount = tour.discount ? 1.2 : 1.0
    const availabilityMultiplier = tour.available !== false ? 1.0 : 0.1
    
    // Formula: (rating * log(reviews + 1) * discount_bonus * availability) / 10
    return Math.round(
      (rating * Math.log(reviews + 1) * hasDiscount * availabilityMultiplier) * 10
    ) / 10
  }

  // Main transform function
  public transformLegacyTour(
    legacyTour: LegacyTour, 
    sourcePage: '13' | '21'
  ): SearchIndexTour {
    const { days, nights } = this.parseDuration(legacyTour.duration)
    
    // Extract destination from title or destinations array
    const destination = this.extractMainDestination(legacyTour)
    const locationInfo = COUNTRY_REGIONS[destination] || { 
      region: 'Unknown', 
      country_code: 'XX' 
    }
    
    const departureDates = this.generateDepartureDates(
      legacyTour.price,
      legacyTour.travelPeriod,
      legacyTour.availableSeats
    )
    
    const highlights = this.categorizeHighlights(legacyTour.highlights)
    const themes = this.extractThemes(legacyTour.title, legacyTour.highlights)
    const searchKeywords = this.generateSearchKeywords(legacyTour)
    const slug = this.generateSlug(legacyTour.title, legacyTour.id)
    
    const canonicalUrl = sourcePage === '13' 
      ? `/tour-search-13/${legacyTour.id}?src=search32`
      : `/tour-search-21/${legacyTour.id}?src=search32`

    const searchTour: SearchIndexTour = {
      metadata: {
        id: `ts32-${legacyTour.id}`,
        slug,
        canonical_url: canonicalUrl,
        source_page: sourcePage,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        featured: legacyTour.discount ? legacyTour.discount >= 15 : false,
        priority_score: this.calculatePopularityScore(legacyTour),
        search_keywords: searchKeywords,
        seo_title: `${legacyTour.title} - ทัวร์${legacyTour.destination} ${days}วัน${nights}คืน`,
        seo_description: `${legacyTour.title} ราคาเริ่มต้น ${legacyTour.price.toLocaleString()} บาท รวม ${legacyTour.highlights.slice(0, 3).join(', ')}`
      },
      
      title: legacyTour.title,
      description: `เที่ยว${legacyTour.destination} ${days}วัน${nights}คืน ${legacyTour.highlights.slice(0, 2).join(' ')} พร้อมไกด์ท้องถิ่น`,
      duration_days: days,
      nights,
      
      location: {
        country: legacyTour.destination,
        country_code: locationInfo.country_code,
        region: locationInfo.region,
        cities: legacyTour.destinations || [legacyTour.destination]
      },
      
      pricing: {
        base_price: legacyTour.price,
        currency: 'THB',
        original_price: legacyTour.originalPrice,
        discount_percentage: legacyTour.discount,
        promotion_text: legacyTour.discount ? `ลด ${legacyTour.discount}% จากราคาปกติ` : undefined,
        price_includes: [
          'ตั๋วเครื่องบินไป-กลับ',
          'ที่พักโรงแรมตามโปรแกรม',
          'อาหารตามระบุ',
          'รถรับส่งและนำเที่ยว',
          'ไกด์ท้องถิ่น',
          'ค่าเข้าชมสถานที่ท่องเที่ยว'
        ],
        price_excludes: [
          'ค่าทิปไกด์และคนขับ',
          'ค่าใช้จ่ายส่วนตัว',
          'ค่าวีซ่า (หากจำเป็น)',
          'ภาษีสนามบินต่างประเทศ'
        ],
        deposit_required: Math.ceil(legacyTour.price * 0.3 / 1000) * 1000, // 30% rounded to thousands
        payment_terms: 'มัดจำ 30% ชำระเต็มจำนวนก่อนเดินทาง 14 วัน'
      },
      
      quality: {
        rating: legacyTour.rating,
        review_count: legacyTour.reviews || legacyTour.reviewCount || 0,
        satisfaction_score: Math.min(100, Math.round(legacyTour.rating * 20)), // Convert 5-star to 100%
        trust_score: Math.round(85 + Math.random() * 10), // 85-95%
        completion_rate: Math.round(92 + Math.random() * 6), // 92-98%
        repeat_customers: Math.round(15 + Math.random() * 25) // 15-40%
      },
      
      highlights,
      tags: searchKeywords.slice(0, 10), // Top 10 keywords as tags
      themes,
      
      media: {
        hero_image: legacyTour.image,
        gallery_images: legacyTour.gallery || [legacyTour.image],
        alt_texts: [`${legacyTour.title} - ภาพหลัก`, `ทัวร์${legacyTour.destination} - แกลเลอรี่`]
      },
      
      availability: {
        available_seats: legacyTour.availableSeats || 15,
        total_capacity: (legacyTour.availableSeats || 15) + Math.floor(Math.random() * 10),
        min_group_size: 2,
        max_group_size: parseInt((legacyTour.groupSize || '2-20').split('-')[1] || '20'),
        departure_dates: departureDates,
        booking_deadline_days: 7,
        cancellation_policy: 'ยกเลิกก่อน 30 วัน คืนเงิน 90% | 15-29 วัน คืน 50% | น้อยกว่า 15 วัน ไม่คืนเงิน'
      },
      
      search_text: `${legacyTour.title} ${destination} ${legacyTour.highlights.join(' ')} ${searchKeywords.join(' ')}`.toLowerCase(),
      popularity_score: this.calculatePopularityScore(legacyTour),
      conversion_rate: Math.round((8 + Math.random() * 7) * 10) / 10 // 8-15% conversion rate
    }
    
    return searchTour
  }
}

// ===================================================================
// Load: Data loading and indexing
// ===================================================================

export class SearchIndexManager {
  private tours: SearchIndexTour[] = []
  private lastUpdated: Date = new Date()
  
  constructor() {
    this.loadData()
  }
  
  private async loadData(): Promise<void> {
    try {
      // Import data from existing tour data
      const { allTours } = await import('../../data/tours-data')
      
      const etl = new TourDataETL()
      
      // Transform legacy tours to SearchIndex format
      this.tours = (allTours || []).map((tour, index) => {
        // Determine source page (simulate distribution)
        const sourcePage: '13' | '21' = index % 3 === 0 ? '21' : '13'
        return etl.transformLegacyTour(tour, sourcePage)
      })
      
      // Add additional seed data if needed
      if (this.tours.length < 30) {
        const additionalTours = this.generateAdditionalTours(30 - this.tours.length)
        this.tours.push(...additionalTours)
      }
      
      this.lastUpdated = new Date()
      console.log(`✅ Loaded ${this.tours.length} tours into SearchIndex`)
      
    } catch (error) {
      console.error('❌ Failed to load tour data:', error)
      this.tours = []
    }
  }
  
  private generateAdditionalTours(count: number): SearchIndexTour[] {
    const etl = new TourDataETL()
    const additionalTours: LegacyTour[] = []
    
    const destinations = ['ญี่ปุ่น', 'เกาหลีใต้', 'ไต้หวัน', 'สิงคโปร์', 'ยุโรป', 'ออสเตรเลีย']
    const highlights = [
      ['ชมวิว', 'ถ่ายรูป', 'อาหารอร่อย'],
      ['วัฒนธรรม', 'ประวัติศาสตร์', 'ช้อปปิ้ง'],
      ['ธรรมชาติ', 'ผจญภัย', 'ผ่อนคลาย'],
      ['สถาปัตยกรรม', 'ศิลปะ', 'ไลฟ์สไตล์']
    ]
    
    for (let i = 0; i < count; i++) {
      const destination = destinations[i % destinations.length]
      const days = 4 + (i % 6)
      const basePrice = 25000 + (i * 3000)
      
      additionalTours.push({
        id: `seed-${1000 + i}`,
        title: `ทัวร์${destination} ${days}วัน${days-1}คืน แพ็กเกจพิเศษ ${i + 1}`,
        destination,
        duration: `${days}วัน${days-1}คืน`,
        price: basePrice,
        originalPrice: basePrice + 7000,
        rating: 4.2 + (Math.random() * 0.7),
        reviews: 45 + Math.floor(Math.random() * 150),
        image: `https://images.unsplash.com/photo-150690531${i % 9}?w=800&h=600&fit=crop`,
        highlights: highlights[i % highlights.length],
        destinations: [destination],
        discount: 10 + (i % 8),
        groupSize: '2-16 คน',
        departureDate: 'มี.ค. - พ.ค. 68',
        available: true,
        availableSeats: 5 + Math.floor(Math.random() * 15)
      })
    }
    
    return additionalTours.map(tour => etl.transformLegacyTour(tour, '13'))
  }
  
  // Search and filter methods
  public search(filters: SearchFilters, sortOptions?: SearchSortOptions): SearchIndexTour[] {
    let filtered = [...this.tours]
    
    // Text search
    if (filters.query && filters.query.length >= 2) {
      const query = filters.query.toLowerCase()
      
      // Handle "ทัวร์" prefix - extract the actual destination
      let searchQuery = query
      if (query.startsWith('ทัวร์')) {
        searchQuery = query.replace('ทัวร์', '').trim()
      }
      
      filtered = filtered.filter(tour => 
        tour.search_text.includes(query) ||
        tour.search_text.includes(searchQuery) ||
        tour.title.toLowerCase().includes(query) ||
        tour.title.toLowerCase().includes(searchQuery) ||
        (tour.location?.country?.toLowerCase() || '').includes(query) ||
        (tour.location?.country?.toLowerCase() || '').includes(searchQuery)
      )
    }
    
    // Location filters
    if (filters.countries?.length) {
      filtered = filtered.filter(tour => 
        filters.countries!.includes(tour.location.country)
      )
    }
    
    if (filters.regions?.length) {
      filtered = filtered.filter(tour => 
        filters.regions!.includes(tour.location.region)
      )
    }
    
    // Price filters
    if (filters.price_min !== undefined) {
      filtered = filtered.filter(tour => tour.pricing.base_price >= filters.price_min!)
    }
    
    if (filters.price_max !== undefined) {
      filtered = filtered.filter(tour => tour.pricing.base_price <= filters.price_max!)
    }
    
    if (filters.has_promotion) {
      filtered = filtered.filter(tour => tour.pricing.discount_percentage)
    }
    
    // Duration filters
    if (filters.duration_min !== undefined) {
      filtered = filtered.filter(tour => tour.duration_days >= filters.duration_min!)
    }
    
    if (filters.duration_max !== undefined) {
      filtered = filtered.filter(tour => tour.duration_days <= filters.duration_max!)
    }
    
    // Quality filters
    if (filters.min_rating !== undefined) {
      filtered = filtered.filter(tour => tour.quality.rating >= filters.min_rating!)
    }
    
    if (filters.min_reviews !== undefined) {
      filtered = filtered.filter(tour => tour.quality.review_count >= filters.min_reviews!)
    }
    
    // Availability filters
    if (filters.available_only) {
      filtered = filtered.filter(tour => 
        tour.availability.departure_dates.some(date => date.status !== 'soldout')
      )
    }
    
    if (filters.min_seats !== undefined) {
      filtered = filtered.filter(tour => 
        tour.availability.available_seats >= filters.min_seats!
      )
    }
    
    // Theme filters
    if (filters.themes?.length) {
      filtered = filtered.filter(tour =>
        filters.themes!.some(theme => tour.themes.includes(theme))
      )
    }
    
    // Sort results
    if (sortOptions) {
      filtered.sort((a, b) => {
        let comparison = 0
        
        switch (sortOptions.field) {
          case 'popularity':
            comparison = b.popularity_score - a.popularity_score
            break
          case 'price':
            comparison = a.pricing.base_price - b.pricing.base_price
            break
          case 'rating':
            comparison = b.quality.rating - a.quality.rating
            break
          case 'duration':
            comparison = a.duration_days - b.duration_days
            break
          case 'departure_date':
            const aNext = a.availability.departure_dates.find(d => d.status !== 'soldout')
            const bNext = b.availability.departure_dates.find(d => d.status !== 'soldout')
            if (aNext && bNext) {
              comparison = aNext.start_date.getTime() - bNext.start_date.getTime()
            }
            break
          case 'discount':
            const aDiscount = a.pricing.discount_percentage || 0
            const bDiscount = b.pricing.discount_percentage || 0
            comparison = bDiscount - aDiscount
            break
        }
        
        return sortOptions.direction === 'desc' ? -comparison : comparison
      })
    }
    
    return filtered
  }
  
  public getTourById(id: string): SearchIndexTour | undefined {
    return this.tours.find(tour => tour.metadata.id === id)
  }
  
  public getTourBySlug(slug: string): SearchIndexTour | undefined {
    return this.tours.find(tour => tour.metadata.slug === slug)
  }
  
  public getPopularDestinations(limit: number = 10): Array<{country: string; count: number}> {
    const destinations = new Map<string, number>()
    
    this.tours.forEach(tour => {
      const count = destinations.get(tour.location.country) || 0
      destinations.set(tour.location.country, count + 1)
    })
    
    return Array.from(destinations.entries())
      .map(([country, count]) => ({ country, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit)
  }
  
  public getFeaturedTours(limit: number = 6): SearchIndexTour[] {
    return this.tours
      .filter(tour => tour.metadata.featured)
      .sort((a, b) => b.popularity_score - a.popularity_score)
      .slice(0, limit)
  }
  
  public getStats() {
    return {
      total_tours: this.tours.length,
      countries: new Set(this.tours.map(t => t.location.country)).size,
      themes: new Set(this.tours.flatMap(t => t.themes)).size,
      avg_price: Math.round(this.tours.reduce((sum, t) => sum + t.pricing.base_price, 0) / this.tours.length),
      last_updated: this.lastUpdated
    }
  }
}

// Export singleton instance
export const searchIndex = new SearchIndexManager()

export default searchIndex