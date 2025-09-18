// TS33 Data ETL - Extract data from tour-search-13 and 21
// Transform and normalize into TS33SearchIndex format

import { TS33SearchIndex, TS33Tour, TS33Country, TS33FilterOptions, TS33Departure } from './types'

// Sample data extracted from audit findings - normalized structure
const TS13_EXTRACTED_TOURS = [
  {
    id: 'ts13-jp-001',
    title: 'ทัวร์ญี่ปุ่น โตเกียว เกียวโต ใบไม้เปลี่ยนสี',
    country: 'ญี่ปุ่น',
    cities: ['โตเกียว', 'เกียวโต'],
    duration: '5 วัน 4 คืน',
    price: 45900,
    originalPrice: 52900,
    rating: 4.8,
    reviews: 156,
    highlights: ['ชมซากุระ', 'วัดเก่าแก่', 'รถไฟความเร็วสูง'],
    region: 'asia'
  },
  {
    id: 'ts13-kr-002',
    title: 'ทัวร์เกาหลีใต้ โซล ปูซาน วัฒนธรรม',
    country: 'เกาหลีใต้',
    cities: ['โซล', 'ปูซาน'],
    duration: '6 วัน 5 คืน',
    price: 38500,
    rating: 4.7,
    reviews: 89,
    highlights: ['วัฒนธรรมเกาหลี', 'ตลาดมยองดง', 'ชิมอาหารท้องถิ่น'],
    region: 'asia'
  },
  {
    id: 'ts13-tw-003',
    title: 'ทัวร์ไต้หวัน ไทเป เกาสง ตลาดกลางคืน',
    country: 'ไต้หวัน',
    cities: ['ไทเป', 'เกาสง'],
    duration: '4 วัน 3 คืน',
    price: 19900,
    rating: 4.6,
    reviews: 234,
    highlights: ['ตลาดกลางคืน', 'น้ำพุร้อน', 'รถไฟความเร็วสูง'],
    region: 'asia'
  }
]

const TS21_EXTRACTED_TOURS = [
  {
    id: 'tour-jp-001',
    title: 'ทัวร์ญี่ปุ่น โตเกียว เกียวโต',
    destination: 'ญี่ปุ่น',
    duration: '5 วัน 4 คืน',
    price: 45900,
    originalPrice: 52900,
    rating: 4.8,
    reviewCount: 156,
    highlights: ['ชมซากุระ', 'วัดเก่าแก่', 'รถไฟความเร็วสูง'],
    available: true,
    availableSeats: 8,
    travelPeriod: 'ม.ค. - เม.ย. 68'
  },
  {
    id: 'tour-eu-006',
    title: 'ทัวร์ยุโรป อิตาลี สวิส ฝรั่งเศส',
    destination: 'ยุโรป',
    duration: '10 วัน 8 คืน',
    price: 89900,
    originalPrice: 99900,
    rating: 4.9,
    reviewCount: 78,
    highlights: ['หอไอเฟล', 'โคลอสเซียม', 'ยอดเขาจุงเฟรา'],
    available: true,
    availableSeats: 5
  },
  {
    id: 'tour-us-012',
    title: 'ทัวร์อเมริกา นิวยอร์ก ลาสเวกัส',
    destination: 'สหรัฐอเมริกา',
    duration: '9 วัน 7 คืน',
    price: 95900,
    rating: 4.7,
    reviewCount: 89,
    highlights: ['เทพีเสรีภาพ', 'แกรนด์แคนยอน', 'ไทม์สแควร์'],
    available: true,
    availableSeats: 6
  }
]

// Country data extracted from tour-search-13 audit
const COUNTRIES_DATA: TS33Country[] = [
  { name: 'ญี่ปุ่น', code: 'JP', flag_code: 'jp', region: 'เอเชีย', tour_count: 12 },
  { name: 'เกาหลีใต้', code: 'KR', flag_code: 'kr', region: 'เอเชีย', tour_count: 8 },
  { name: 'ไต้หวัน', code: 'TW', flag_code: 'tw', region: 'เอเชีย', tour_count: 6 },
  { name: 'สิงคโปร์', code: 'SG', flag_code: 'sg', region: 'เอเชีย', tour_count: 4 },
  { name: 'อิตาลี', code: 'IT', flag_code: 'it', region: 'ยุโรป', tour_count: 9 },
  { name: 'สวิตเซอร์แลนด์', code: 'CH', flag_code: 'ch', region: 'ยุโรป', tour_count: 7 },
  { name: 'ฝรั่งเศส', code: 'FR', flag_code: 'fr', region: 'ยุโรป', tour_count: 8 },
  { name: 'เยอรมนี', code: 'DE', flag_code: 'de', region: 'ยุโรป', tour_count: 5 },
  { name: 'สหรัฐอเมริกา', code: 'US', flag_code: 'us', region: 'อเมริกา', tour_count: 6 },
  { name: 'แคนาดา', code: 'CA', flag_code: 'ca', region: 'อเมริกา', tour_count: 4 },
  { name: 'ออสเตรเลีย', code: 'AU', flag_code: 'au', region: 'โอเซียเนีย', tour_count: 5 },
  { name: 'นิวซีแลนด์', code: 'NZ', flag_code: 'nz', region: 'โอเซียเนีย', tour_count: 3 }
]

// Get appropriate image URL for country
function getImageForCountry(country: string, seed: number): string {
  const imageMap: Record<string, string[]> = {
    'ญี่ปุ่น': [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop', // Tokyo Temple
      'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&h=600&fit=crop', // Mt Fuji
      'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&h=600&fit=crop', // Japanese street
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop'  // Tokyo cityscape
    ],
    'เกาหลีใต้': [
      'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800&h=600&fit=crop', // Seoul
      'https://images.unsplash.com/photo-1546874177-9e664107314e?w=800&h=600&fit=crop', // Korean palace
      'https://images.unsplash.com/photo-1534274867514-92d0ea71f52c?w=800&h=600&fit=crop'  // Seoul street
    ],
    'ไต้หวัน': [
      'https://images.unsplash.com/photo-1508248467877-aec1b08de376?w=800&h=600&fit=crop', // Taipei 101
      'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&h=600&fit=crop', // Taiwan temple
      'https://images.unsplash.com/photo-1552582305-6b778426ab60?w=800&h=600&fit=crop'  // Jiufen
    ],
    'สิงคโปร์': [
      'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&h=600&fit=crop', // Marina Bay
      'https://images.unsplash.com/photo-1508964942454-1a56651d54ac?w=800&h=600&fit=crop', // Gardens by the Bay
      'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800&h=600&fit=crop'  // Singapore skyline
    ],
    'มาเลเซีย': [
      'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&h=600&fit=crop', // KL Twin Towers
      'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800&h=600&fit=crop', // Batu Caves
      'https://images.unsplash.com/photo-1581683705068-ca8f49fc7f45?w=800&h=600&fit=crop'  // Penang
    ],
    'อินโดนีเซีย': [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=600&fit=crop', // Bali temple
      'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&h=600&fit=crop', // Bali rice terrace
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&h=600&fit=crop'  // Indonesia landscape
    ],
    'เวียดนาม': [
      'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&h=600&fit=crop', // Venice
      'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=800&h=600&fit=crop', // Ha Long Bay
      'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&h=600&fit=crop'  // Vietnam street
    ],
    'ฟิลิปปินส์': [
      'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=800&h=600&fit=crop', // Philippines beach
      'https://images.unsplash.com/photo-1551041777-ed277b8a2a97?w=800&h=600&fit=crop', // Palawan
      'https://images.unsplash.com/photo-1534570122623-99e8b8c6a9e1?w=800&h=600&fit=crop'  // Boracay
    ],
    'อินเดีย': [
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop', // Taj Mahal
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop', // India palace
      'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=800&h=600&fit=crop'  // India street
    ],
    'ออสเตรเลีย': [
      'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800&h=600&fit=crop', // Sydney Opera House
      'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&h=600&fit=crop', // Sydney Harbor Bridge
      'https://images.unsplash.com/photo-1529108190281-9a48a7eecfb5?w=800&h=600&fit=crop'  // Great Ocean Road
    ]
  }
  
  const images = imageMap[country] || imageMap['ญี่ปุ่น'] // Default to Japan
  return images[seed % images.length]
}

// Generate mock departures for each tour
function generateDepartures(basePrice: number, tourId: string): TS33Departure[] {
  const departures: TS33Departure[] = []
  const months = ['มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.']
  
  for (let i = 0; i < 8; i++) {
    const monthIndex = i % months.length
    const isHighSeason = ['ธ.ค.', 'ม.ค.', 'เม.ย.'].includes(months[monthIndex])
    // Use deterministic values based on tour id and month index
    const seedValue = (tourId.charCodeAt(0) + i * 7) % 100
    const priceMultiplier = isHighSeason ? 1.2 : (seedValue % 30) * 0.01 + 0.9
    const seats = (seedValue % 15) + 2
    
    departures.push({
      date_range: `${months[monthIndex]} 2568`,
      status: seats > 5 ? 'available' : seats > 2 ? 'low' : 'soldout',
      seats_left: seats,
      price: Math.round(basePrice * priceMultiplier),
      is_promotion: (seedValue % 10) < 3,
      promotion_text: (seedValue % 10) < 3 ? 'ลด 15% จองด่วน!' : undefined
    })
  }
  
  return departures
}

// Transform tour data into TS33 format
function transformTourData(): TS33Tour[] {
  const tours: TS33Tour[] = []
  
  // Transform TS13 data
  TS13_EXTRACTED_TOURS.forEach((tour, index) => {
    const duration = parseInt(tour.duration.split(' ')[0])
    const nights = parseInt(tour.duration.split(' ')[2])
    
    tours.push({
      id: `ts33-${tour.id}`,
      slug: tour.title.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-'),
      title: tour.title,
      country: tour.country,
      cities: tour.cities,
      duration_days: duration,
      nights: nights,
      price_from: tour.price,
      currency: 'THB',
      badges: tour.originalPrice ? ['ลดราคา'] : [],
      highlights: tour.highlights,
      rating: tour.rating,
      reviews_count: tour.reviews,
      departures: generateDepartures(tour.price, tour.id),
      tags: [tour.region, ...tour.highlights.slice(0, 2)],
      themes: tour.highlights.includes('ซากุระ') ? ['ธรรมชาติ'] : ['วัฒนธรรม'],
      canonicalUrl: `/tour-search-13/${index + 1}?src=search33`,
      image_url: `https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop`,
      gallery_urls: [
        `https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop`,
        `https://images.unsplash.com/photo-1528164344705-47542687000d?w=800&h=600&fit=crop`
      ]
    })
  })
  
  // Transform TS21 data
  TS21_EXTRACTED_TOURS.forEach((tour, index) => {
    const duration = parseInt(tour.duration.split(' ')[0])
    const nights = parseInt(tour.duration.split(' ')[2])
    
    tours.push({
      id: `ts33-${tour.id}`,
      slug: tour.title.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-'),
      title: tour.title,
      country: tour.destination === 'ยุโรป' ? 'อิตาลี' : tour.destination,
      cities: tour.destination === 'ยุโรป' ? ['โรม', 'มิลาน'] : 
              tour.destination === 'สหรัฐอเมริกา' ? ['นิวยอร์ก', 'ลาสเวกัส'] :
              ['เมืองหลัก'],
      duration_days: duration,
      nights: nights,
      price_from: tour.price,
      currency: 'THB',
      badges: tour.originalPrice ? ['ลดราคา'] : [],
      highlights: tour.highlights,
      rating: tour.rating,
      reviews_count: tour.reviewCount,
      departures: generateDepartures(tour.price, tour.id),
      tags: [tour.destination, ...tour.highlights.slice(0, 2)],
      themes: tour.highlights.includes('ธรรมชาติ') ? ['ธรรมชาติ'] : ['วัฒนธรรม'],
      canonicalUrl: `/tour-search-21/${tour.id}?src=search33`,
      image_url: `https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&h=600&fit=crop`,
      gallery_urls: [
        `https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&h=600&fit=crop`
      ]
    })
  })
  
  return tours
}

// Generate additional mock tours to reach 30+ requirement
function generateMockTours(): TS33Tour[] {
  const mockTours: TS33Tour[] = []
  const templates = [
    { country: 'จีน', cities: ['ปักกิ่ง', 'เซี่ยงไฮ้'], themes: ['วัฒนธรรม'], basePrice: 25900 },
    { country: 'เวียดนาม', cities: ['ฮานอย', 'โฮจิมินห์'], themes: ['ธรรมชาติ'], basePrice: 16900 },
    { country: 'ฟิลิปปินส์', cities: ['มะนิลา', 'เซบู'], themes: ['ผจญภัย'], basePrice: 18900 },
    { country: 'อินเดีย', cities: ['เดลี', 'มุมไบ'], themes: ['วัฒนธรรม'], basePrice: 29900 },
    { country: 'สเปน', cities: ['มาดริด', 'บาร์เซโลนา'], themes: ['วัฒนธรรม'], basePrice: 54900 },
    { country: 'ตุรกี', cities: ['อิสตันบูล', 'คัปปาโดเกีย'], themes: ['ผจญภัย'], basePrice: 39900 },
    { country: 'อียิปต์', cities: ['ไคโร', 'อเล็กซานเดรีย'], themes: ['วัฒนธรรม'], basePrice: 48900 },
    { country: 'รัสเซีย', cities: ['มอสโก', 'เซนต์ปีเตอร์สเบิร์ก'], themes: ['วัฒนธรรม'], basePrice: 58900 }
  ]
  
  templates.forEach((template, index) => {
    for (let variant = 1; variant <= 3; variant++) {
      // Determine if this tour should be a Flash Sale (30% chance)
      const isFlashSale = ((index + variant) * 7) % 10 < 3
      const discountPercentage = isFlashSale ? 15 + ((index * variant) % 20) : 0 // 15-35% discount
      const originalPrice = template.basePrice + (variant * 5000)
      const flashSalePrice = isFlashSale ? Math.round(originalPrice * (1 - discountPercentage / 100)) : originalPrice
      
      mockTours.push({
        id: `ts33-mock-${template.country.toLowerCase()}-${variant}`,
        slug: `tour-${template.country.toLowerCase()}-${variant}`,
        title: `ทัวร์${template.country} ${template.cities.join(' ')} ${variant === 1 ? 'คลาสสิค' : variant === 2 ? 'พรีเมี่ยม' : 'เอ็กซ์คลูซีฟ'}`,
        country: template.country,
        cities: template.cities,
        duration_days: 4 + variant,
        nights: 3 + variant,
        price_from: flashSalePrice,
        original_price: isFlashSale ? originalPrice : undefined,
        currency: 'THB',
        badges: variant === 3 ? ['พรีเมี่ยม'] : variant === 2 ? ['ยอดนิยม'] : [],
        highlights: [`${template.themes[0]}`, 'ไกด์มืออาชีพ', 'โรงแรมคุณภาพ'],
        rating: 4.0 + ((index * variant * 7 + 13) % 90) / 100,
        reviews_count: ((index * variant * 11 + 17) % 200) + 50,
        departures: generateDepartures(template.basePrice + (variant * 5000), `mock-${index}-${variant}`),
        tags: [template.country, template.themes[0]],
        themes: template.themes,
        canonicalUrl: variant % 2 === 0 ? `/tour-search-13/${index * 3 + variant}?src=search33` : `/tour-search-21/mock-${index}-${variant}?src=search33`,
        image_url: getImageForCountry(template.country, index * 3 + variant),
        gallery_urls: [
          getImageForCountry(template.country, index * 3 + variant),
          getImageForCountry(template.country, index * 3 + variant + 1)
        ],
        is_flash_sale: isFlashSale,
        flash_sale_end: isFlashSale ? new Date(Date.now() + (2 + (index % 5)) * 24 * 60 * 60 * 1000).toISOString() : undefined,
        discount_percentage: isFlashSale ? discountPercentage : undefined
      })
    }
  })
  
  return mockTours
}

// Create filter options based on data
function createFilterOptions(tours: TS33Tour[]): TS33FilterOptions {
  return {
    countries: COUNTRIES_DATA,
    price_ranges: [
      { id: 'budget', label: 'ไม่เกิน 30,000 บาท', min: 0, max: 30000, tour_count: tours.filter(t => t.price_from <= 30000).length },
      { id: 'mid', label: '30,001 - 60,000 บาท', min: 30001, max: 60000, tour_count: tours.filter(t => t.price_from > 30000 && t.price_from <= 60000).length },
      { id: 'premium', label: '60,001 - 100,000 บาท', min: 60001, max: 100000, tour_count: tours.filter(t => t.price_from > 60000 && t.price_from <= 100000).length },
      { id: 'luxury', label: 'มากกว่า 100,000 บาท', min: 100001, max: 999999, tour_count: tours.filter(t => t.price_from > 100000).length }
    ],
    durations: [
      { id: 'short', label: '3-5 วัน', min_days: 3, max_days: 5, tour_count: tours.filter(t => t.duration_days >= 3 && t.duration_days <= 5).length },
      { id: 'medium', label: '6-8 วัน', min_days: 6, max_days: 8, tour_count: tours.filter(t => t.duration_days >= 6 && t.duration_days <= 8).length },
      { id: 'long', label: '9-12 วัน', min_days: 9, max_days: 12, tour_count: tours.filter(t => t.duration_days >= 9 && t.duration_days <= 12).length },
      { id: 'extended', label: 'มากกว่า 12 วัน', min_days: 13, max_days: 99, tour_count: tours.filter(t => t.duration_days > 12).length }
    ],
    themes: [
      { id: 'culture', label: '🏛️ วัฒนธรรม', icon: '🏛️', tour_count: tours.filter(t => t.themes.includes('วัฒนธรรม')).length },
      { id: 'nature', label: '🌿 ธรรมชาติ', icon: '🌿', tour_count: tours.filter(t => t.themes.includes('ธรรมชาติ')).length },
      { id: 'adventure', label: '🏔️ ผจญภัย', icon: '🏔️', tour_count: tours.filter(t => t.themes.includes('ผจญภัย')).length },
      { id: 'shopping', label: '🛍️ ช้อปปิ้ง', icon: '🛍️', tour_count: Math.floor(tours.length * 0.3) }
    ],
    months: [
      { id: '03', name: 'มีนาคม', short: 'มี.ค.', value: '03', is_high_season: false, tour_count: Math.floor(tours.length * 0.8) },
      { id: '04', name: 'เมษายน', short: 'เม.ย.', value: '04', is_high_season: true, tour_count: tours.length },
      { id: '05', name: 'พฤษภาคม', short: 'พ.ค.', value: '05', is_high_season: false, tour_count: Math.floor(tours.length * 0.9) },
      { id: '06', name: 'มิถุนายน', short: 'มิ.ย.', value: '06', is_high_season: false, tour_count: Math.floor(tours.length * 0.7) },
      { id: '07', name: 'กรกฎาคม', short: 'ก.ค.', value: '07', is_high_season: false, tour_count: Math.floor(tours.length * 0.8) },
      { id: '08', name: 'สิงหาคม', short: 'ส.ค.', value: '08', is_high_season: false, tour_count: Math.floor(tours.length * 0.6) },
      { id: '09', name: 'กันยายน', short: 'ก.ย.', value: '09', is_high_season: false, tour_count: Math.floor(tours.length * 0.9) },
      { id: '10', name: 'ตุลาคม', short: 'ต.ค.', value: '10', is_high_season: false, tour_count: Math.floor(tours.length * 0.8) },
      { id: '11', name: 'พฤศจิกายน', short: 'พ.ย.', value: '11', is_high_season: false, tour_count: Math.floor(tours.length * 0.9) },
      { id: '12', name: 'ธันวาคม', short: 'ธ.ค.', value: '12', is_high_season: true, tour_count: tours.length }
    ],
    ratings: [
      { id: '4plus', label: '4+ ดาว', min_rating: 4.0, tour_count: tours.filter(t => t.rating >= 4.0).length },
      { id: '3plus', label: '3+ ดาว', min_rating: 3.0, tour_count: tours.filter(t => t.rating >= 3.0).length },
      { id: 'all', label: 'ทุกคะแนน', min_rating: 0.0, tour_count: tours.length }
    ]
  }
}

// Main ETL function
export function createTS33SearchIndex(): TS33SearchIndex {
  const transformedTours = transformTourData()
  const mockTours = generateMockTours()
  const allTours = [...transformedTours, ...mockTours]
  
  return {
    tours: allTours,
    countries: COUNTRIES_DATA,
    filters: createFilterOptions(allTours),
    meta: {
      total_tours: allTours.length,
      last_updated: new Date().toISOString(),
      version: '1.0.0'
    }
  }
}

// Export search index instance
export const TS33_SEARCH_INDEX = createTS33SearchIndex()