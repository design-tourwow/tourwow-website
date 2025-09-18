// TS33 SEO and Metadata Management
// Isolated SEO system for tour-search-33

import type { Metadata } from 'next'
import { TS33_SEARCH_INDEX } from '../data-etl'
import type { TS33SearchFilters, TS33Tour } from '../types'

// Base metadata for tour search page
export const TS33_BASE_METADATA: Metadata = {
  title: 'ค้นหาทัวร์ที่ใช่สำหรับคุณ | TourWow',
  description: 'ค้นพบทัวร์ที่เหมาะสมกับคุณจากกว่า 30+ ทัวร์คุณภาพ พร้อมข้อมูลรายละเอียด รีวิว และราคาที่ดีที่สุด',
  keywords: 'ทัวร์, เที่ยว, ต่างประเทศ, จองทัวร์, ทัวร์คุณภาพ, TourWow',
  authors: [{ name: 'TourWow' }],
  creator: 'TourWow',
  publisher: 'TourWow',
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1
  },
  alternates: {
    canonical: '/tour-search-33'
  },
  openGraph: {
    type: 'website',
    locale: 'th_TH',
    url: '/tour-search-33',
    siteName: 'TourWow',
    title: 'ค้นหาทัวร์ที่ใช่สำหรับคุณ | TourWow',
    description: 'ค้นพบทัวร์ที่เหมาะสมกับคุณจากกว่า 30+ ทัวร์คุณภาพ พร้อมข้อมูลรายละเอียด รีวิว และราคาที่ดีที่สุด',
    images: [
      {
        url: '/tour-banners/search-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'TourWow - ค้นหาทัวร์ที่ใช่สำหรับคุณ'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ค้นหาทัวร์ที่ใช่สำหรับคุณ | TourWow',
    description: 'ค้นพบทัวร์ที่เหมาะสมกับคุณจากกว่า 30+ ทัวร์คุณภาพ',
    images: ['/tour-banners/search-hero.jpg']
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION
  }
}

// Generate dynamic metadata based on search filters
export function generateTS33SearchMetadata(filters: TS33SearchFilters): Metadata {
  const hasFilters = Boolean(
    filters.keyword ||
    filters.countries.length > 0 ||
    filters.themes.length > 0 ||
    filters.price_range ||
    filters.duration ||
    filters.months.length > 0 ||
    filters.rating
  )

  if (!hasFilters) {
    return TS33_BASE_METADATA
  }

  // Build dynamic title and description
  let title = 'ค้นหาทัวร์'
  let description = 'ค้นพบทัวร์ที่เหมาะสม'
  const titleParts: string[] = []
  const descParts: string[] = []

  // Add keyword
  if (filters.keyword) {
    titleParts.push(filters.keyword)
    descParts.push(`"${filters.keyword}"`)
  }

  // Add countries
  if (filters.countries.length > 0) {
    const countryNames = filters.countries
      .map(code => TS33_SEARCH_INDEX.countries.find(c => c.code === code)?.name)
      .filter(Boolean)
      .join(', ')
    
    if (countryNames) {
      titleParts.push(countryNames)
      descParts.push(`ประเทศ${countryNames}`)
    }
  }

  // Add themes
  if (filters.themes.length > 0) {
    const themeNames = filters.themes
      .map(id => TS33_SEARCH_INDEX.filters.themes.find(t => t.id === id)?.label)
      .filter(Boolean)
      .join(', ')
    
    if (themeNames) {
      titleParts.push(themeNames)
      descParts.push(`ธีม${themeNames}`)
    }
  }

  // Add duration
  if (filters.duration) {
    const duration = TS33_SEARCH_INDEX.filters.durations.find(d => d.id === filters.duration)
    if (duration) {
      titleParts.push(duration.label)
      descParts.push(duration.label)
    }
  }

  // Add price range
  if (filters.price_range) {
    const [min, max] = filters.price_range
    const priceText = max === Infinity 
      ? `เริ่มต้น ${min.toLocaleString()} บาท`
      : `${min.toLocaleString()}-${max.toLocaleString()} บาท`
    descParts.push(priceText)
  }

  // Build final title and description
  if (titleParts.length > 0) {
    title = `ทัวร์${titleParts.slice(0, 2).join(' ')} | TourWow`
  } else {
    title = 'ค้นหาทัวร์ที่ใช่สำหรับคุณ | TourWow'
  }

  if (descParts.length > 0) {
    description = `ค้นพบทัวร์${descParts.slice(0, 3).join(' ')} พร้อมข้อมูลรายละเอียด รีวิว และราคาที่ดีที่สุด`
  } else {
    description = TS33_BASE_METADATA.description as string
  }

  return {
    ...TS33_BASE_METADATA,
    title,
    description,
    openGraph: {
      ...TS33_BASE_METADATA.openGraph,
      title,
      description
    },
    twitter: {
      ...TS33_BASE_METADATA.twitter,
      title,
      description
    }
  }
}

// Generate tour-specific metadata
export function generateTS33TourMetadata(tour: TS33Tour): Metadata {
  const title = `${tour.title} | TourWow`
  const description = `${tour.title} ${tour.duration_days} วัน ${tour.nights} คืน เริ่มต้น ${tour.price_from.toLocaleString()} บาท ${tour.highlights.slice(0, 2).join(' ')}`

  return {
    title,
    description,
    keywords: `${tour.title}, ทัวร์${tour.country}, ${tour.cities.join(', ')}, ${tour.themes.join(', ')}`,
    alternates: {
      canonical: `/tour-search-33/${tour.slug}`
    },
    openGraph: {
      type: 'article',
      locale: 'th_TH',
      url: `/tour-search-33/${tour.slug}`,
      siteName: 'TourWow',
      title,
      description,
      images: [
        {
          url: tour.image_url,
          width: 1200,
          height: 630,
          alt: tour.title
        },
        ...tour.gallery_urls.slice(0, 3).map(url => ({
          url,
          width: 800,
          height: 600,
          alt: tour.title
        }))
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [tour.image_url]
    }
  }
}

// JSON-LD structured data
export function generateTS33StructuredData(filters?: TS33SearchFilters, tour?: TS33Tour) {
  const baseData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'TourWow',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://tourwow.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://tourwow.com'}/tour-search-33?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  }

  if (tour) {
    return {
      '@context': 'https://schema.org',
      '@type': 'TouristTrip',
      name: tour.title,
      description: tour.highlights.join(' '),
      image: [tour.image_url, ...tour.gallery_urls],
      offers: {
        '@type': 'Offer',
        price: tour.price_from,
        priceCurrency: tour.currency,
        availability: 'https://schema.org/InStock'
      },
      provider: {
        '@type': 'Organization',
        name: 'TourWow',
        url: process.env.NEXT_PUBLIC_SITE_URL || 'https://tourwow.com'
      },
      touristType: tour.themes,
      itinerary: tour.departures.map(dep => ({
        '@type': 'Event',
        name: `${tour.title} - ${dep.date_range}`,
        startDate: dep.date_range.split(' - ')[0],
        offers: {
          '@type': 'Offer',
          price: dep.price,
          priceCurrency: tour.currency,
          availability: dep.status === 'available' ? 'https://schema.org/InStock' : 'https://schema.org/LimitedAvailability'
        }
      }))
    }
  }

  // Search page structured data
  const searchData = {
    ...baseData,
    '@type': ['WebSite', 'SearchResultsPage'],
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'หน้าแรก',
          item: process.env.NEXT_PUBLIC_SITE_URL || 'https://tourwow.com'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'ค้นหาทัวร์',
          item: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://tourwow.com'}/tour-search-33`
        }
      ]
    }
  }

  if (filters && (filters.keyword || filters.countries.length > 0)) {
    return {
      ...searchData,
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: TS33_SEARCH_INDEX.tours.length,
        itemListElement: TS33_SEARCH_INDEX.tours.slice(0, 10).map((tour, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'TouristTrip',
            name: tour.title,
            image: tour.image_url,
            offers: {
              '@type': 'Offer',
              price: tour.price_from,
              priceCurrency: tour.currency
            }
          }
        }))
      }
    }
  }

  return searchData
}

// Performance monitoring
export interface TS33PerformanceMetrics {
  page_load_time: number
  search_response_time: number
  filter_response_time: number
  lead_form_time: number
  total_tours_loaded: number
  images_loaded: number
  errors_count: number
  user_interactions: number
}

export class TS33PerformanceTracker {
  private metrics: Partial<TS33PerformanceMetrics> = {}
  private startTimes: Record<string, number> = {}

  startTimer(event: string) {
    this.startTimes[event] = performance.now()
  }

  endTimer(event: string) {
    if (this.startTimes[event]) {
      const duration = performance.now() - this.startTimes[event]
      
      switch (event) {
        case 'page_load':
          this.metrics.page_load_time = duration
          break
        case 'search':
          this.metrics.search_response_time = duration
          break
        case 'filter':
          this.metrics.filter_response_time = duration
          break
        case 'lead_form':
          this.metrics.lead_form_time = duration
          break
      }
    }
  }

  incrementCounter(metric: keyof TS33PerformanceMetrics) {
    if (typeof this.metrics[metric] === 'number') {
      (this.metrics[metric] as number)++
    } else {
      (this.metrics[metric] as number) = 1
    }
  }

  getMetrics(): Partial<TS33PerformanceMetrics> {
    return { ...this.metrics }
  }

  sendToAnalytics() {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'ts33_performance', {
        custom_parameter: this.metrics
      })
    }
    
    console.log('TS33 Performance Metrics:', this.metrics)
  }
}

// Create global performance tracker instance
export const ts33Performance = new TS33PerformanceTracker()