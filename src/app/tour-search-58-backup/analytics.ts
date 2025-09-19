// ===================================================================
// tour-search-32: Analytics & Performance Monitoring
// ===================================================================
// Isolated analytics system with privacy-first approach
// Performance monitoring and user behavior tracking

import { SearchFilters, SearchIndexTour } from './types'

// ===================================================================
// Analytics Events Configuration
// ===================================================================

export interface AnalyticsEvent {
  event_name: string
  timestamp: Date
  session_id: string
  user_agent?: string
  page_url: string
  referrer?: string
  properties: Record<string, any>
}

export interface SearchEvent extends AnalyticsEvent {
  event_name: 'search_performed'
  properties: {
    query: string
    filters_applied: SearchFilters
    results_count: number
    search_duration_ms: number
    source: 'search_bar' | 'filter_change' | 'suggestion_click'
  }
}

export interface FilterEvent extends AnalyticsEvent {
  event_name: 'filter_applied' | 'filter_cleared'
  properties: {
    filter_type: keyof SearchFilters
    filter_value: any
    active_filters_count: number
    results_count_before: number
    results_count_after: number
  }
}

export interface TourClickEvent extends AnalyticsEvent {
  event_name: 'tour_clicked'
  properties: {
    tour_id: string
    tour_title: string
    tour_price: number
    tour_rating: number
    click_position: number
    view_mode: 'card' | 'list'
    source: 'search_results' | 'featured' | 'related'
  }
}

export interface LeadCaptureEvent extends AnalyticsEvent {
  event_name: 'lead_captured' | 'lead_form_opened' | 'lead_form_abandoned'
  properties: {
    tour_id?: string
    tour_title?: string
    form_step?: number
    lead_source: 'quick_book' | 'sticky_cta' | 'tour_detail'
    time_on_page_ms: number
  }
}

export interface PerformanceEvent extends AnalyticsEvent {
  event_name: 'performance_measured'
  properties: {
    metric_name: 'FCP' | 'LCP' | 'FID' | 'CLS' | 'TTFB' | 'search_time'
    metric_value: number
    page_type: 'search' | 'detail' | 'home'
    device_type: 'mobile' | 'tablet' | 'desktop'
    connection_type?: string
  }
}

// ===================================================================
// Analytics Manager
// ===================================================================

class AnalyticsManager {
  private sessionId: string
  private events: AnalyticsEvent[] = []
  private isEnabled: boolean = true
  private batchSize: number = 10
  private flushInterval: number = 30000 // 30 seconds
  private performanceObserver?: PerformanceObserver

  constructor() {
    this.sessionId = this.generateSessionId()
    this.initializePerformanceMonitoring()
    this.startEventFlushing()
  }

  private generateSessionId(): string {
    return `ts32_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private getCurrentUrl(): string {
    return typeof window !== 'undefined' ? window.location.href : ''
  }

  private getReferrer(): string | undefined {
    return typeof document !== 'undefined' ? document.referrer || undefined : undefined
  }

  private getUserAgent(): string | undefined {
    return typeof navigator !== 'undefined' ? navigator.userAgent : undefined
  }

  private getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
    if (typeof window === 'undefined') return 'desktop'
    
    const width = window.innerWidth
    if (width < 768) return 'mobile'
    if (width < 1024) return 'tablet'
    return 'desktop'
  }

  private getConnectionType(): string | undefined {
    if (typeof navigator !== 'undefined' && 'connection' in navigator) {
      const connection = (navigator as any).connection
      return connection?.effectiveType || connection?.type
    }
    return undefined
  }

  public trackEvent(event: Omit<AnalyticsEvent, 'timestamp' | 'session_id' | 'page_url'>): void {
    if (!this.isEnabled) return

    const fullEvent: AnalyticsEvent = {
      ...event,
      timestamp: new Date(),
      session_id: this.sessionId,
      page_url: this.getCurrentUrl(),
      user_agent: this.getUserAgent(),
      referrer: this.getReferrer()
    }

    this.events.push(fullEvent)
    
    // Auto-flush if batch size reached
    if (this.events.length >= this.batchSize) {
      this.flushEvents()
    }

    // Console logging in development
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Analytics Event:', fullEvent)
    }
  }

  private initializePerformanceMonitoring(): void {
    if (typeof window === 'undefined') return

    // Web Vitals monitoring
    if ('PerformanceObserver' in window) {
      // First Contentful Paint (FCP)
      const fcpObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            this.trackPerformance('FCP', entry.startTime)
          }
        }
      })
      fcpObserver.observe({ type: 'paint', buffered: true })

      // Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        this.trackPerformance('LCP', lastEntry.startTime)
      })
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true })

      // First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.trackPerformance('FID', (entry as any).processingStart - entry.startTime)
        }
      })
      fidObserver.observe({ type: 'first-input', buffered: true })

      // Cumulative Layout Shift (CLS)
      let clsValue = 0
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value
          }
        }
        this.trackPerformance('CLS', clsValue)
      })
      clsObserver.observe({ type: 'layout-shift', buffered: true })
    }

    // Page load performance
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      if (navigation) {
        this.trackPerformance('TTFB', navigation.responseStart - navigation.requestStart)
      }
    })
  }

  private startEventFlushing(): void {
    if (typeof window === 'undefined') return

    setInterval(() => {
      if (this.events.length > 0) {
        this.flushEvents()
      }
    }, this.flushInterval)

    // Flush on page unload
    window.addEventListener('beforeunload', () => {
      this.flushEvents(true)
    })
  }

  private flushEvents(immediate: boolean = false): void {
    if (this.events.length === 0) return

    const eventsToSend = [...this.events]
    this.events = []

    if (immediate && 'sendBeacon' in navigator) {
      // Use sendBeacon for immediate sending on page unload
      navigator.sendBeacon('/api/analytics', JSON.stringify(eventsToSend))
    } else {
      // Send via fetch for normal flushing
      fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventsToSend)
      }).catch(error => {
        console.warn('Failed to send analytics events:', error)
        // Re-add events to queue on failure
        this.events.unshift(...eventsToSend)
      })
    }
  }

  // ===================================================================
  // Public Analytics Methods
  // ===================================================================

  public trackSearch(
    query: string,
    filters: SearchFilters,
    resultsCount: number,
    searchDurationMs: number,
    source: 'search_bar' | 'filter_change' | 'suggestion_click' = 'search_bar'
  ): void {
    this.trackEvent({
      event_name: 'search_performed',
      properties: {
        query,
        filters_applied: filters,
        results_count: resultsCount,
        search_duration_ms: searchDurationMs,
        source
      }
    })
  }

  public trackFilterApplied(
    filterType: keyof SearchFilters,
    filterValue: any,
    activeFiltersCount: number,
    resultsCountBefore: number,
    resultsCountAfter: number
  ): void {
    this.trackEvent({
      event_name: 'filter_applied',
      properties: {
        filter_type: filterType,
        filter_value: filterValue,
        active_filters_count: activeFiltersCount,
        results_count_before: resultsCountBefore,
        results_count_after: resultsCountAfter
      }
    })
  }

  public trackFilterCleared(
    filterType: keyof SearchFilters,
    activeFiltersCount: number,
    resultsCountBefore: number,
    resultsCountAfter: number
  ): void {
    this.trackEvent({
      event_name: 'filter_cleared',
      properties: {
        filter_type: filterType,
        filter_value: null,
        active_filters_count: activeFiltersCount,
        results_count_before: resultsCountBefore,
        results_count_after: resultsCountAfter
      }
    })
  }

  public trackTourClick(
    tour: SearchIndexTour,
    clickPosition: number,
    viewMode: 'card' | 'list',
    source: 'search_results' | 'featured' | 'related' = 'search_results'
  ): void {
    this.trackEvent({
      event_name: 'tour_clicked',
      properties: {
        tour_id: tour.metadata.id,
        tour_title: tour.title,
        tour_price: tour.pricing.base_price,
        tour_rating: tour.quality.rating,
        click_position: clickPosition,
        view_mode: viewMode,
        source
      }
    })
  }

  public trackLeadFormOpened(
    tour?: SearchIndexTour,
    source: 'quick_book' | 'sticky_cta' | 'tour_detail' = 'quick_book'
  ): void {
    this.trackEvent({
      event_name: 'lead_form_opened',
      properties: {
        tour_id: tour?.metadata.id,
        tour_title: tour?.title,
        lead_source: source,
        time_on_page_ms: performance.now()
      }
    })
  }

  public trackLeadCaptured(
    tour?: SearchIndexTour,
    source: 'quick_book' | 'sticky_cta' | 'tour_detail' = 'quick_book',
    timeOnPageMs: number = performance.now()
  ): void {
    this.trackEvent({
      event_name: 'lead_captured',
      properties: {
        tour_id: tour?.metadata.id,
        tour_title: tour?.title,
        lead_source: source,
        time_on_page_ms: timeOnPageMs
      }
    })
  }

  public trackLeadFormAbandoned(
    formStep: number,
    tour?: SearchIndexTour,
    source: 'quick_book' | 'sticky_cta' | 'tour_detail' = 'quick_book'
  ): void {
    this.trackEvent({
      event_name: 'lead_form_abandoned',
      properties: {
        tour_id: tour?.metadata.id,
        tour_title: tour?.title,
        form_step: formStep,
        lead_source: source,
        time_on_page_ms: performance.now()
      }
    })
  }

  public trackPerformance(
    metricName: 'FCP' | 'LCP' | 'FID' | 'CLS' | 'TTFB' | 'search_time',
    metricValue: number,
    pageType: 'search' | 'detail' | 'home' = 'search'
  ): void {
    this.trackEvent({
      event_name: 'performance_measured',
      properties: {
        metric_name: metricName,
        metric_value: metricValue,
        page_type: pageType,
        device_type: this.getDeviceType(),
        connection_type: this.getConnectionType()
      }
    })
  }

  // ===================================================================
  // Utility Methods
  // ===================================================================

  public setEnabled(enabled: boolean): void {
    this.isEnabled = enabled
  }

  public getSessionId(): string {
    return this.sessionId
  }

  public getEventHistory(): AnalyticsEvent[] {
    return [...this.events]
  }

  public clearEvents(): void {
    this.events = []
  }

  public forceFlush(): void {
    this.flushEvents()
  }
}

// ===================================================================
// Performance Measurement Helpers
// ===================================================================

export class PerformanceMeasurement {
  private startTime: number
  private measurementName: string

  constructor(measurementName: string) {
    this.measurementName = measurementName
    this.startTime = performance.now()
  }

  public end(): number {
    const duration = performance.now() - this.startTime
    analytics.trackPerformance('search_time', duration)
    return duration
  }

  public static measure<T>(name: string, fn: () => T): T {
    const measurement = new PerformanceMeasurement(name)
    try {
      return fn()
    } finally {
      measurement.end()
    }
  }

  public static async measureAsync<T>(name: string, fn: () => Promise<T>): Promise<T> {
    const measurement = new PerformanceMeasurement(name)
    try {
      return await fn()
    } finally {
      measurement.end()
    }
  }
}

// ===================================================================
// Search Performance Tracker
// ===================================================================

export class SearchPerformanceTracker {
  private searchStartTime: number = 0
  private lastQuery: string = ''
  private lastFilters: SearchFilters = {}

  public startSearch(query: string, filters: SearchFilters): void {
    this.searchStartTime = performance.now()
    this.lastQuery = query
    this.lastFilters = filters
  }

  public endSearch(resultsCount: number, source: 'search_bar' | 'filter_change' | 'suggestion_click' = 'search_bar'): void {
    if (this.searchStartTime === 0) return

    const duration = performance.now() - this.searchStartTime
    
    analytics.trackSearch(
      this.lastQuery,
      this.lastFilters,
      resultsCount,
      duration,
      source
    )

    // Reset
    this.searchStartTime = 0
  }
}

// ===================================================================
// A/B Testing Framework
// ===================================================================

export interface ABTest {
  test_id: string
  variant: string
  user_segment?: string
}

export class ABTestManager {
  private activeTests: Map<string, string> = new Map()

  public getVariant(testId: string, variants: string[]): string {
    // Check if user already has a variant for this test
    if (this.activeTests.has(testId)) {
      return this.activeTests.get(testId)!
    }

    // Assign variant based on session ID hash
    const hash = this.hashCode(analytics.getSessionId() + testId)
    const variantIndex = Math.abs(hash) % variants.length
    const variant = variants[variantIndex]
    
    this.activeTests.set(testId, variant)
    
    // Track variant assignment
    analytics.trackEvent({
      event_name: 'ab_test_assigned',
      properties: {
        test_id: testId,
        variant: variant,
        available_variants: variants
      }
    })

    return variant
  }

  private hashCode(str: string): number {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32-bit integer
    }
    return hash
  }

  public trackConversion(testId: string, conversionType: string): void {
    const variant = this.activeTests.get(testId)
    if (!variant) return

    analytics.trackEvent({
      event_name: 'ab_test_conversion',
      properties: {
        test_id: testId,
        variant: variant,
        conversion_type: conversionType
      }
    })
  }
}

// ===================================================================
// Export Singleton Instances
// ===================================================================

export const analytics = new AnalyticsManager()
export const searchPerformance = new SearchPerformanceTracker()
export const abTest = new ABTestManager()

// ===================================================================
// React Hooks for Analytics
// ===================================================================

export const useAnalytics = () => {
  return {
    trackSearch: analytics.trackSearch.bind(analytics),
    trackFilterApplied: analytics.trackFilterApplied.bind(analytics),
    trackFilterCleared: analytics.trackFilterCleared.bind(analytics),
    trackTourClick: analytics.trackTourClick.bind(analytics),
    trackLeadFormOpened: analytics.trackLeadFormOpened.bind(analytics),
    trackLeadCaptured: analytics.trackLeadCaptured.bind(analytics),
    trackLeadFormAbandoned: analytics.trackLeadFormAbandoned.bind(analytics),
    trackPerformance: analytics.trackPerformance.bind(analytics)
  }
}

export const useSearchPerformance = () => {
  return {
    startSearch: searchPerformance.startSearch.bind(searchPerformance),
    endSearch: searchPerformance.endSearch.bind(searchPerformance)
  }
}

export const useABTest = () => {
  return {
    getVariant: abTest.getVariant.bind(abTest),
    trackConversion: abTest.trackConversion.bind(abTest)
  }
}

export default analytics