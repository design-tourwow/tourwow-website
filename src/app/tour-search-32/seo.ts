// ===================================================================
// tour-search-32: SEO & Structured Data
// ===================================================================
// Comprehensive SEO optimization with structured data markup
// Search-specific meta tags and JSON-LD generation

import { SearchFilters, SearchIndexTour } from './types'

// ===================================================================
// SEO Meta Tags Configuration
// ===================================================================

export interface SEOMetaTags {
  title: string
  description: string
  canonical: string
  openGraph: {
    title: string
    description: string
    url: string
    type: 'website'
    images: Array<{
      url: string
      width: number
      height: number
      alt: string
    }>
    siteName: string
    locale: string
  }
  twitter: {
    card: 'summary_large_image'
    title: string
    description: string
    image: string
    creator: string
    site: string
  }
  additionalTags: Array<{
    name?: string
    property?: string
    content: string
  }>
}

export interface BreadcrumbItem {
  name: string
  url: string
  position: number
}

// ===================================================================
// SEO Manager Class
// ===================================================================

export class SEOManager {
  private baseUrl: string = 'https://tourwow.com'
  private siteName: string = 'TourWow - Premium Tour Experiences'
  private defaultImage: string = '/images/tourwow-og-default.jpg'
  private twitterHandle: string = '@tourwow'

  // ===================================================================
  // Search Page SEO
  // ===================================================================

  public generateSearchPageMeta(
    query: string = '',
    filters: SearchFilters = {},
    resultsCount: number = 0
  ): SEOMetaTags {
    const { title, description } = this.generateSearchTitleDescription(query, filters, resultsCount)
    const canonicalUrl = this.buildCanonicalUrl('/tour-search-32', query, filters)

    return {
      title,
      description,
      canonical: canonicalUrl,
      openGraph: {
        title,
        description,
        url: canonicalUrl,
        type: 'website',
        images: [{
          url: `${this.baseUrl}${this.defaultImage}`,
          width: 1200,
          height: 630,
          alt: 'TourWow - Discover Amazing Tours'
        }],
        siteName: this.siteName,
        locale: 'en_US'
      },
      twitter: {
        card: 'summary_large_image',
        title: title.slice(0, 70), // Twitter title limit
        description: description.slice(0, 200), // Twitter description limit
        image: `${this.baseUrl}${this.defaultImage}`,
        creator: this.twitterHandle,
        site: this.twitterHandle
      },
      additionalTags: [
        { name: 'robots', content: 'index,follow' },
        { name: 'viewport', content: 'width=device-width,initial-scale=1' },
        { name: 'theme-color', content: '#0066CC' },
        { property: 'og:locale:alternate', content: 'th_TH' },
        { name: 'geo.region', content: 'TH' },
        { name: 'geo.placename', content: 'Thailand' },
        { name: 'application-name', content: 'TourWow' }
      ]
    }
  }

  private generateSearchTitleDescription(
    query: string,
    filters: SearchFilters,
    resultsCount: number
  ): { title: string; description: string } {
    let title = 'Discover Amazing Tours & Experiences'
    let description = 'Find and book the perfect tour experience from our curated collection of premium adventures.'

    // Query-based optimization
    if (query.trim()) {
      title = `${query} Tours & Experiences | TourWow`
      description = `Discover amazing ${query.toLowerCase()} tours and experiences. Book now from ${resultsCount} available options.`
    }

    // Location-based optimization
    if (filters.cities?.length) {
      const destinations = filters.cities.slice(0, 3).join(', ')
      if (query.trim()) {
        title = `${query} Tours in ${destinations} | TourWow`
        description = `Find the best ${query.toLowerCase()} tours in ${destinations}. ${resultsCount} tours available with instant booking.`
      } else {
        title = `${destinations} Tours & Experiences | TourWow`
        description = `Explore amazing tours and experiences in ${destinations}. Choose from ${resultsCount} carefully curated adventures.`
      }
    }

    // Theme-based optimization
    if (filters.themes?.length && !query.trim()) {
      const themes = filters.themes.slice(0, 2).join(' & ')
      title = `${themes} Tours & Experiences | TourWow`
      description = `Book exciting ${themes.toLowerCase()} tours and adventures. ${resultsCount} options available for immediate booking.`
    }

    // Price range optimization
    if (filters.price_min || filters.price_max) {
      if (filters.price_min && filters.price_max) {
        description += ` Tours from $${filters.price_min} to $${filters.price_max}.`
      } else if (filters.price_min) {
        description += ` Tours from $${filters.price_min}.`
      } else if (filters.price_max) {
        description += ` Tours under $${filters.price_max}.`
      }
    }

    // Duration optimization
    if (filters.duration_min || filters.duration_max) {
      if (filters.duration_min && filters.duration_max) {
        description += ` Duration: ${filters.duration_min}-${filters.duration_max} hours.`
      } else if (filters.duration_min) {
        description += ` Duration: from ${filters.duration_min} hours.`
      } else if (filters.duration_max) {
        description += ` Duration: up to ${filters.duration_max} hours.`
      }
    }

    // Ensure length limits
    title = title.slice(0, 60)
    description = description.slice(0, 160)

    return { title, description }
  }

  private buildCanonicalUrl(basePath: string, query: string, filters: SearchFilters): string {
    const url = new URL(basePath, this.baseUrl)
    
    if (query.trim()) {
      url.searchParams.set('q', query)
    }

    // Add filter parameters for SEO-friendly URLs
    if (filters.cities?.length) {
      url.searchParams.set('cities', filters.cities.join(','))
    }
    if (filters.themes?.length) {
      url.searchParams.set('themes', filters.themes.join(','))
    }
    if (filters.duration_min) {
      url.searchParams.set('duration_min', filters.duration_min.toString())
    }
    if (filters.duration_max) {
      url.searchParams.set('duration_max', filters.duration_max.toString())
    }
    if (filters.price_min) {
      url.searchParams.set('price_min', filters.price_min.toString())
    }
    if (filters.price_max) {
      url.searchParams.set('price_max', filters.price_max.toString())
    }

    return url.toString()
  }

  // ===================================================================
  // Structured Data (JSON-LD)
  // ===================================================================

  public generateSearchPageStructuredData(
    query: string,
    filters: SearchFilters,
    tours: SearchIndexTour[],
    resultsCount: number
  ): any {
    const baseStructuredData = {
      '@context': 'https://schema.org',
      '@graph': [
        this.generateWebsiteSchema(),
        this.generateSearchActionSchema(),
        this.generateBreadcrumbSchema([
          { name: 'Home', url: '/', position: 1 },
          { name: 'Tours', url: '/tour-search-32', position: 2 }
        ])
      ]
    }

    // Add search results structured data if we have results
    if (tours.length > 0) {
      baseStructuredData['@graph'].push(
        this.generateSearchResultsSchema(query, tours, resultsCount)
      )

      // Add individual tour offers for top results
      const topTours = tours.slice(0, 5)
      topTours.forEach(tour => {
        baseStructuredData['@graph'].push(this.generateTourOfferSchema(tour))
      })
    }

    return baseStructuredData
  }

  private generateWebsiteSchema(): any {
    return {
      '@type': 'WebSite',
      '@id': `${this.baseUrl}/#website`,
      'name': this.siteName,
      'url': this.baseUrl,
      'description': 'Premium tour experiences and adventures worldwide',
      'publisher': {
        '@type': 'Organization',
        'name': 'TourWow',
        'url': this.baseUrl,
        'logo': {
          '@type': 'ImageObject',
          'url': `${this.baseUrl}/images/logo.png`,
          'width': 512,
          'height': 512
        }
      },
      'potentialAction': {
        '@type': 'SearchAction',
        'target': {
          '@type': 'EntryPoint',
          'urlTemplate': `${this.baseUrl}/tour-search-32?q={search_term_string}`
        },
        'query-input': 'required name=search_term_string'
      }
    }
  }

  private generateSearchActionSchema(): any {
    return {
      '@type': 'SearchAction',
      'target': {
        '@type': 'EntryPoint',
        'urlTemplate': `${this.baseUrl}/tour-search-32?q={query}&destinations={destinations}&activities={activities}`,
        'actionPlatform': [
          'http://schema.org/DesktopWebPlatform',
          'http://schema.org/MobileWebPlatform'
        ]
      },
      'query-input': [
        'required name=query',
        'name=destinations',
        'name=activities'
      ]
    }
  }

  private generateBreadcrumbSchema(items: BreadcrumbItem[]): any {
    return {
      '@type': 'BreadcrumbList',
      'itemListElement': items.map(item => ({
        '@type': 'ListItem',
        'position': item.position,
        'name': item.name,
        'item': `${this.baseUrl}${item.url}`
      }))
    }
  }

  private generateSearchResultsSchema(query: string, tours: SearchIndexTour[], totalCount: number): any {
    return {
      '@type': 'SearchResultsPage',
      'name': `Search Results for "${query}"`,
      'description': `Found ${totalCount} tours matching "${query}"`,
      'mainEntity': {
        '@type': 'ItemList',
        'numberOfItems': totalCount,
        'itemListElement': tours.slice(0, 10).map((tour, index) => ({
          '@type': 'ListItem',
          'position': index + 1,
          'item': this.generateTourOfferSchema(tour)
        }))
      }
    }
  }

  private generateTourOfferSchema(tour: SearchIndexTour): any {
    return {
      '@type': 'TouristTrip',
      '@id': `${this.baseUrl}/tour-search-21/${tour.metadata.id}`,
      'name': tour.title,
      'description': tour.highlights.slice(0, 3).map(h => h.text).join('. '),
      'url': `${this.baseUrl}/tour-search-21/${tour.metadata.id}`,
      'image': tour.media.gallery_images[0] || this.defaultImage,
      'touristType': tour.themes || [],
      'itinerary': {
        '@type': 'ItemList',
        'numberOfItems': tour.highlights.length,
        'itemListElement': tour.highlights.map((highlight, index) => ({
          '@type': 'ListItem',
          'position': index + 1,
          'name': highlight.text
        }))
      },
      'provider': {
        '@type': 'Organization',
        'name': 'TourWow',
        'url': this.baseUrl
      },
      'offers': {
        '@type': 'Offer',
        'price': tour.pricing.base_price.toString(),
        'priceCurrency': tour.pricing.currency,
        'availability': tour.availability.departure_dates.length > 0 
          ? 'https://schema.org/InStock' 
          : 'https://schema.org/OutOfStock',
        'validFrom': new Date().toISOString(),
        'url': `${this.baseUrl}/tour-search-21/${tour.metadata.id}`,
        'seller': {
          '@type': 'Organization',
          'name': 'TourWow'
        }
      },
      'aggregateRating': tour.quality.review_count > 0 ? {
        '@type': 'AggregateRating',
        'ratingValue': tour.quality.rating.toString(),
        'reviewCount': tour.quality.review_count.toString(),
        'bestRating': '5',
        'worstRating': '1'
      } : undefined,
      'geo': tour.location.coordinates ? {
        '@type': 'GeoCoordinates',
        'latitude': tour.location.coordinates.lat,
        'longitude': tour.location.coordinates.lng
      } : undefined,
      'duration': `P${tour.duration_days}D`,
      'startDate': tour.availability.departure_dates[0]?.start_date || new Date().toISOString(),
      'includesObject': tour.highlights.map(highlight => ({
        '@type': 'Thing',
        'name': highlight.text
      }))
    }
  }

  // ===================================================================
  // Meta Tags Utilities
  // ===================================================================

  public generateMetaTagsHTML(metaTags: SEOMetaTags): string {
    const tags: string[] = []

    // Basic meta tags
    tags.push(`<title>${this.escapeHtml(metaTags.title)}</title>`)
    tags.push(`<meta name="description" content="${this.escapeHtml(metaTags.description)}" />`)
    tags.push(`<link rel="canonical" href="${metaTags.canonical}" />`)

    // Open Graph tags
    tags.push(`<meta property="og:title" content="${this.escapeHtml(metaTags.openGraph.title)}" />`)
    tags.push(`<meta property="og:description" content="${this.escapeHtml(metaTags.openGraph.description)}" />`)
    tags.push(`<meta property="og:url" content="${metaTags.openGraph.url}" />`)
    tags.push(`<meta property="og:type" content="${metaTags.openGraph.type}" />`)
    tags.push(`<meta property="og:site_name" content="${this.escapeHtml(metaTags.openGraph.siteName)}" />`)
    tags.push(`<meta property="og:locale" content="${metaTags.openGraph.locale}" />`)

    metaTags.openGraph.images.forEach(image => {
      tags.push(`<meta property="og:image" content="${image.url}" />`)
      tags.push(`<meta property="og:image:width" content="${image.width}" />`)
      tags.push(`<meta property="og:image:height" content="${image.height}" />`)
      tags.push(`<meta property="og:image:alt" content="${this.escapeHtml(image.alt)}" />`)
    })

    // Twitter Card tags
    tags.push(`<meta name="twitter:card" content="${metaTags.twitter.card}" />`)
    tags.push(`<meta name="twitter:title" content="${this.escapeHtml(metaTags.twitter.title)}" />`)
    tags.push(`<meta name="twitter:description" content="${this.escapeHtml(metaTags.twitter.description)}" />`)
    tags.push(`<meta name="twitter:image" content="${metaTags.twitter.image}" />`)
    tags.push(`<meta name="twitter:creator" content="${metaTags.twitter.creator}" />`)
    tags.push(`<meta name="twitter:site" content="${metaTags.twitter.site}" />`)

    // Additional tags
    metaTags.additionalTags.forEach(tag => {
      if (tag.name) {
        tags.push(`<meta name="${tag.name}" content="${this.escapeHtml(tag.content)}" />`)
      } else if (tag.property) {
        tags.push(`<meta property="${tag.property}" content="${this.escapeHtml(tag.content)}" />`)
      }
    })

    return tags.join('\n')
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div')
    div.textContent = text
    return div.innerHTML
  }

  // ===================================================================
  // Performance & Core Web Vitals
  // ===================================================================

  public generatePreloadTags(criticalResources: string[]): string {
    return criticalResources.map(resource => {
      const extension = resource.split('.').pop()?.toLowerCase()
      let asType = 'fetch'
      
      switch (extension) {
        case 'css': asType = 'style'; break
        case 'js': asType = 'script'; break
        case 'woff':
        case 'woff2': asType = 'font'; break
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'webp': asType = 'image'; break
      }

      let crossorigin = ''
      if (asType === 'font' || resource.startsWith('http')) {
        crossorigin = ' crossorigin'
      }

      return `<link rel="preload" href="${resource}" as="${asType}"${crossorigin} />`
    }).join('\n')
  }

  public generateCriticalCSS(): string {
    return `
      <style>
        /* Critical CSS for above-the-fold content */
        .ts32-loading { 
          min-height: 200px; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
        }
        .ts32-skeleton { 
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
        }
        @keyframes loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      </style>
    `
  }
}

// ===================================================================
// Export Singleton Instance
// ===================================================================

export const seoManager = new SEOManager()

// ===================================================================
// React Hooks for SEO
// ===================================================================

export const useSEO = () => {
  return {
    generateSearchPageMeta: seoManager.generateSearchPageMeta.bind(seoManager),
    generateSearchPageStructuredData: seoManager.generateSearchPageStructuredData.bind(seoManager),
    generateMetaTagsHTML: seoManager.generateMetaTagsHTML.bind(seoManager),
    generatePreloadTags: seoManager.generatePreloadTags.bind(seoManager),
    generateCriticalCSS: seoManager.generateCriticalCSS.bind(seoManager)
  }
}

export default seoManager