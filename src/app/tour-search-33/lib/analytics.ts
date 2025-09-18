// TS33 Analytics and Tracking System
// Isolated analytics for tour-search-33

import type { TS33Tour, TS33SearchFilters, TS33LeadData } from '../types'

// Event types for analytics
export interface TS33AnalyticsEvents {
  // Page events
  'page_view': {
    page_type: 'search' | 'tour_detail'
    filters_applied?: string[]
    search_term?: string
  }

  // Search events
  'search_performed': {
    keyword: string
    filters_count: number
    results_count: number
    response_time_ms: number
  }

  'filter_applied': {
    filter_type: 'country' | 'theme' | 'price' | 'duration' | 'month' | 'rating'
    filter_value: string
    results_count: number
  }

  'sort_changed': {
    sort_from: string
    sort_to: string
    results_count: number
  }

  'view_mode_changed': {
    mode_from: 'card' | 'list'
    mode_to: 'card' | 'list'
  }

  // Tour interaction events
  'tour_card_viewed': {
    tour_id: string
    tour_title: string
    position_in_results: number
    view_mode: 'card' | 'list'
  }

  'tour_card_clicked': {
    tour_id: string
    tour_title: string
    position_in_results: number
    action: 'view_details' | 'quick_book'
  }

  'tour_image_clicked': {
    tour_id: string
    image_index: number
  }

  // Lead generation events
  'lead_modal_opened': {
    tour_id: string
    tour_title: string
    source: 'card_button' | 'tour_detail'
  }

  'lead_form_started': {
    tour_id: string
    form_fields_count: number
  }

  'lead_form_field_completed': {
    tour_id: string
    field_name: string
    field_order: number
  }

  'lead_form_submitted': {
    tour_id: string
    form_completion_time_ms: number
    fields_completed: string[]
    budget_range: string
    participants: number
  }

  'lead_form_abandoned': {
    tour_id: string
    last_field: string
    time_spent_ms: number
  }

  // User behavior events
  'scroll_depth': {
    page_type: string
    scroll_percentage: number
  }

  'time_on_page': {
    page_type: string
    time_spent_ms: number
  }

  'filter_drawer_opened': {
    source: 'button' | 'swipe'
  }

  'filter_drawer_closed': {
    applied_changes: boolean
    time_spent_ms: number
  }

  // Performance events
  'performance_metric': {
    metric_name: string
    metric_value: number
    page_type: string
  }

  // Error events
  'error_occurred': {
    error_type: 'network' | 'validation' | 'render' | 'unknown'
    error_message: string
    component: string
  }
}

// Analytics tracker class
export class TS33AnalyticsTracker {
  private sessionId: string
  private pageLoadTime: number
  private interactions: number = 0
  private scrollDepth: number = 0

  constructor() {
    this.sessionId = this.generateSessionId()
    this.pageLoadTime = Date.now()
    
    if (typeof window !== 'undefined') {
      this.setupScrollTracking()
      this.setupPerformanceTracking()
    }
  }

  private generateSessionId(): string {
    return `ts33_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private setupScrollTracking() {
    let ticking = false
    
    const updateScrollDepth = () => {
      const scrollTop = window.pageYOffset
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight
      const currentDepth = Math.round((scrollTop / documentHeight) * 100)
      
      if (currentDepth > this.scrollDepth && currentDepth % 25 === 0) {
        this.scrollDepth = currentDepth
        this.track('scroll_depth', {
          page_type: 'search',
          scroll_percentage: currentDepth
        })
      }
      
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollDepth)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
  }

  private setupPerformanceTracking() {
    // Track initial page load performance
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
        
        if (navigation) {
          this.track('performance_metric', {
            metric_name: 'page_load_time',
            metric_value: navigation.loadEventEnd - navigation.loadEventStart,
            page_type: 'search'
          })
          
          this.track('performance_metric', {
            metric_name: 'dom_content_loaded',
            metric_value: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
            page_type: 'search'
          })
        }
      }, 1000)
    })

    // Track page unload
    window.addEventListener('beforeunload', () => {
      this.track('time_on_page', {
        page_type: 'search',
        time_spent_ms: Date.now() - this.pageLoadTime
      })
    })
  }

  track<T extends keyof TS33AnalyticsEvents>(
    event: T,
    properties: TS33AnalyticsEvents[T]
  ) {
    const eventData = {
      event,
      properties: {
        ...properties,
        session_id: this.sessionId,
        timestamp: Date.now(),
        page_url: typeof window !== 'undefined' ? window.location.href : '',
        user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
        interactions_count: this.interactions
      }
    }

    // Send to Google Analytics 4
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', event, {
        custom_parameter: eventData.properties,
        session_id: this.sessionId
      })
    }

    // Send to custom analytics endpoint (if available)
    if (process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
      fetch(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventData)
      }).catch(error => {
        console.warn('Analytics tracking failed:', error)
      })
    }

    // Development logging
    if (process.env.NODE_ENV === 'development') {
      console.log('TS33 Analytics:', event, eventData.properties)
    }

    this.interactions++
  }

  // Convenience methods for common events
  trackPageView(pageType: 'search' | 'tour_detail', filters?: TS33SearchFilters) {
    this.track('page_view', {
      page_type: pageType,
      filters_applied: filters ? this.getActiveFilters(filters) : undefined,
      search_term: filters?.keyword || undefined
    })
  }

  trackSearch(keyword: string, filtersCount: number, resultsCount: number, responseTime: number) {
    this.track('search_performed', {
      keyword,
      filters_count: filtersCount,
      results_count: resultsCount,
      response_time_ms: responseTime
    })
  }

  trackTourInteraction(
    action: 'view_details' | 'quick_book',
    tour: TS33Tour,
    position: number,
    viewMode: 'card' | 'list'
  ) {
    this.track('tour_card_clicked', {
      tour_id: tour.id,
      tour_title: tour.title,
      position_in_results: position,
      action
    })
  }

  trackLeadGeneration(stage: 'opened' | 'started' | 'submitted' | 'abandoned', data: {
    tour: TS33Tour
    source?: string
    completionTime?: number
    leadData?: TS33LeadData
    lastField?: string
    timeSpent?: number
  }) {
    switch (stage) {
      case 'opened':
        this.track('lead_modal_opened', {
          tour_id: data.tour.id,
          tour_title: data.tour.title,
          source: data.source as any || 'card_button'
        })
        break

      case 'started':
        this.track('lead_form_started', {
          tour_id: data.tour.id,
          form_fields_count: 7
        })
        break

      case 'submitted':
        if (data.leadData && data.completionTime) {
          this.track('lead_form_submitted', {
            tour_id: data.tour.id,
            form_completion_time_ms: data.completionTime,
            fields_completed: this.getCompletedFields(data.leadData),
            budget_range: data.leadData.budget_range,
            participants: data.leadData.participants
          })
        }
        break

      case 'abandoned':
        this.track('lead_form_abandoned', {
          tour_id: data.tour.id,
          last_field: data.lastField || 'unknown',
          time_spent_ms: data.timeSpent || 0
        })
        break
    }
  }

  trackError(errorType: 'network' | 'validation' | 'render' | 'unknown', message: string, component: string) {
    this.track('error_occurred', {
      error_type: errorType,
      error_message: message,
      component
    })
  }

  private getActiveFilters(filters: TS33SearchFilters): string[] {
    const active: string[] = []
    
    if (filters.keyword) active.push('keyword')
    if (filters.countries.length > 0) active.push('countries')
    if (filters.themes.length > 0) active.push('themes')
    if (filters.price_range) active.push('price_range')
    if (filters.duration) active.push('duration')
    if (filters.months.length > 0) active.push('months')
    if (filters.rating) active.push('rating')
    
    return active
  }

  private getCompletedFields(leadData: TS33LeadData): string[] {
    const completed: string[] = []
    
    if (leadData.name) completed.push('name')
    if (leadData.phone) completed.push('phone')
    if (leadData.email) completed.push('email')
    if (leadData.preferred_months.length > 0) completed.push('preferred_months')
    if (leadData.participants) completed.push('participants')
    if (leadData.budget_range) completed.push('budget_range')
    if (leadData.message) completed.push('message')
    if (leadData.privacy_consent) completed.push('privacy_consent')
    
    return completed
  }
}

// Create global analytics instance
export const ts33Analytics = new TS33AnalyticsTracker()

// Hook for React components
export function useTS33Analytics() {
  return {
    track: ts33Analytics.track.bind(ts33Analytics),
    trackPageView: ts33Analytics.trackPageView.bind(ts33Analytics),
    trackSearch: ts33Analytics.trackSearch.bind(ts33Analytics),
    trackTourInteraction: ts33Analytics.trackTourInteraction.bind(ts33Analytics),
    trackLeadGeneration: ts33Analytics.trackLeadGeneration.bind(ts33Analytics),
    trackError: ts33Analytics.trackError.bind(ts33Analytics)
  }
}

// A11y event tracking
export function trackA11yInteraction(type: 'keyboard' | 'screen_reader' | 'voice' | 'focus', element: string) {
  ts33Analytics.track('performance_metric', {
    metric_name: `a11y_${type}_interaction`,
    metric_value: 1,
    page_type: 'search'
  })
}