// ===================================================================
// tour-search-32: Accessibility (A11y) System
// ===================================================================
// WCAG 2.1 AA compliance utilities and enhancements
// Screen reader support, keyboard navigation, and inclusive design

import { SearchFilters, SearchIndexTour } from './types'

// ===================================================================
// Accessibility Configuration
// ===================================================================

export interface A11yConfig {
  announceSearchResults: boolean
  keyboardNavigation: boolean
  focusManagement: boolean
  reduceMotion: boolean
  highContrast: boolean
  screenReaderOptimizations: boolean
}

export interface FocusableElement {
  element: HTMLElement
  tabIndex: number
  ariaLabel?: string
  role?: string
}

export interface AriaLiveRegion {
  id: string
  politeness: 'polite' | 'assertive' | 'off'
  atomic: boolean
  relevant: string
}

// ===================================================================
// Screen Reader Utilities
// ===================================================================

export class ScreenReaderManager {
  private liveRegions: Map<string, HTMLElement> = new Map()
  private announceQueue: string[] = []
  private isProcessing: boolean = false

  constructor() {
    this.initializeLiveRegions()
  }

  private initializeLiveRegions(): void {
    if (typeof document === 'undefined') return

    // Create main announcement region
    this.createLiveRegion('ts32-announcements', 'polite', true, 'additions text')
    
    // Create search status region
    this.createLiveRegion('ts32-search-status', 'polite', true, 'additions text')
    
    // Create filter status region
    this.createLiveRegion('ts32-filter-status', 'polite', false, 'additions text')
    
    // Create error region
    this.createLiveRegion('ts32-errors', 'assertive', true, 'additions text')
  }

  private createLiveRegion(
    id: string, 
    politeness: 'polite' | 'assertive', 
    atomic: boolean, 
    relevant: string
  ): void {
    const existing = document.getElementById(id)
    if (existing) {
      this.liveRegions.set(id, existing)
      return
    }

    const region = document.createElement('div')
    region.id = id
    region.setAttribute('aria-live', politeness)
    region.setAttribute('aria-atomic', atomic.toString())
    region.setAttribute('aria-relevant', relevant)
    region.style.cssText = `
      position: absolute !important;
      left: -10000px !important;
      width: 1px !important;
      height: 1px !important;
      overflow: hidden !important;
      clip: rect(1px, 1px, 1px, 1px) !important;
      white-space: nowrap !important;
    `
    
    document.body.appendChild(region)
    this.liveRegions.set(id, region)
  }

  public announce(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    const regionId = priority === 'assertive' ? 'ts32-errors' : 'ts32-announcements'
    this.announceToRegion(regionId, message)
  }

  public announceSearchResults(query: string, count: number, filters: SearchFilters): void {
    let message = ''
    
    if (query.trim()) {
      message = `Search results for "${query}": ${count} ${count === 1 ? 'tour' : 'tours'} found`
    } else {
      message = `${count} ${count === 1 ? 'tour' : 'tours'} displayed`
    }

    // Add filter information
    const activeFilters = this.getActiveFiltersDescription(filters)
    if (activeFilters) {
      message += `. Filters applied: ${activeFilters}`
    }

    this.announceToRegion('ts32-search-status', message)
  }

  public announceFilterChange(filterType: string, action: 'applied' | 'removed', value: string): void {
    const message = `Filter ${action}: ${filterType} ${value}`
    this.announceToRegion('ts32-filter-status', message)
  }

  public announceError(error: string): void {
    this.announceToRegion('ts32-errors', `Error: ${error}`)
  }

  private announceToRegion(regionId: string, message: string): void {
    const region = this.liveRegions.get(regionId)
    if (!region) return

    // Clear previous content
    region.textContent = ''
    
    // Use setTimeout to ensure screen readers pick up the change
    setTimeout(() => {
      region.textContent = message
    }, 100)
  }

  private getActiveFiltersDescription(filters: SearchFilters): string {
    const descriptions: string[] = []

    if (filters.cities?.length) {
      descriptions.push(`cities: ${filters.cities.join(', ')}`)
    }
    if (filters.themes?.length) {
      descriptions.push(`themes: ${filters.themes.join(', ')}`)
    }
    if (filters.duration_min || filters.duration_max) {
      if (filters.duration_min && filters.duration_max) {
        descriptions.push(`duration: ${filters.duration_min}-${filters.duration_max} hours`)
      } else if (filters.duration_min) {
        descriptions.push(`duration: from ${filters.duration_min} hours`)
      } else if (filters.duration_max) {
        descriptions.push(`duration: up to ${filters.duration_max} hours`)
      }
    }
    if (filters.price_min || filters.price_max) {
      if (filters.price_min && filters.price_max) {
        descriptions.push(`price: $${filters.price_min} to $${filters.price_max}`)
      } else if (filters.price_min) {
        descriptions.push(`price: from $${filters.price_min}`)
      } else if (filters.price_max) {
        descriptions.push(`price: up to $${filters.price_max}`)
      }
    }

    return descriptions.join(', ')
  }
}

// ===================================================================
// Keyboard Navigation Manager
// ===================================================================

export class KeyboardNavigationManager {
  private focusableElements: HTMLElement[] = []
  private currentFocusIndex: number = -1
  private trapFocus: boolean = false
  private focusTrapContainer: HTMLElement | null = null

  public initializeKeyboardNavigation(): void {
    if (typeof document === 'undefined') return

    document.addEventListener('keydown', this.handleGlobalKeydown.bind(this))
    document.addEventListener('focusin', this.handleFocusIn.bind(this))
  }

  private handleGlobalKeydown(event: KeyboardEvent): void {
    const { key, ctrlKey, shiftKey, altKey } = event

    // Skip navigation shortcuts
    if (key === 'Tab' && altKey) return
    if (key === 'F6') return

    // Search shortcuts
    if (key === '/' && !this.isInputFocused()) {
      event.preventDefault()
      this.focusSearchInput()
      return
    }

    // Escape key handling
    if (key === 'Escape') {
      this.handleEscape()
      return
    }

    // Arrow key navigation in search results
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)) {
      this.handleArrowNavigation(event)
    }

    // Enter key on tour cards
    if (key === 'Enter' || key === ' ') {
      this.handleActivation(event)
    }
  }

  private handleFocusIn(event: FocusEvent): void {
    const target = event.target as HTMLElement
    if (!target) return

    // Update current focus index if it's a managed element
    const index = this.focusableElements.indexOf(target)
    if (index !== -1) {
      this.currentFocusIndex = index
    }

    // Focus trap handling
    if (this.trapFocus && this.focusTrapContainer) {
      if (!this.focusTrapContainer.contains(target)) {
        event.preventDefault()
        this.focusFirstTrapElement()
      }
    }
  }

  private isInputFocused(): boolean {
    const active = document.activeElement
    return active instanceof HTMLInputElement || 
           active instanceof HTMLTextAreaElement ||
           active?.getAttribute('contenteditable') === 'true'
  }

  private focusSearchInput(): void {
    const searchInput = document.querySelector('#ts32-search-input') as HTMLInputElement
    if (searchInput) {
      searchInput.focus()
      searchInput.select()
    }
  }

  private handleEscape(): void {
    // Close modals, clear focus traps, etc.
    const modal = document.querySelector('[role="dialog"][aria-hidden="false"]')
    if (modal) {
      const closeButton = modal.querySelector('[aria-label*="close"], [aria-label*="Close"]') as HTMLButtonElement
      if (closeButton) {
        closeButton.click()
      }
      return
    }

    // Clear search if focused
    const searchInput = document.activeElement as HTMLInputElement
    if (searchInput?.id === 'ts32-search-input' && searchInput.value) {
      searchInput.value = ''
      searchInput.dispatchEvent(new Event('input', { bubbles: true }))
    }
  }

  private handleArrowNavigation(event: KeyboardEvent): void {
    const { key, target } = event
    const activeElement = target as HTMLElement

    // Only handle arrow navigation in specific contexts
    if (!this.shouldHandleArrowNavigation(activeElement)) return

    const tourCards = Array.from(document.querySelectorAll('[data-tour-card]')) as HTMLElement[]
    if (tourCards.length === 0) return

    const currentIndex = tourCards.indexOf(activeElement)
    let newIndex = currentIndex

    switch (key) {
      case 'ArrowDown':
        newIndex = Math.min(currentIndex + 1, tourCards.length - 1)
        break
      case 'ArrowUp':
        newIndex = Math.max(currentIndex - 1, 0)
        break
      case 'ArrowRight':
        if (this.isGridView()) {
          newIndex = Math.min(currentIndex + 1, tourCards.length - 1)
        }
        break
      case 'ArrowLeft':
        if (this.isGridView()) {
          newIndex = Math.max(currentIndex - 1, 0)
        }
        break
    }

    if (newIndex !== currentIndex) {
      event.preventDefault()
      tourCards[newIndex]?.focus()
    }
  }

  private shouldHandleArrowNavigation(element: HTMLElement): boolean {
    return element.hasAttribute('data-tour-card') ||
           element.closest('[data-tour-card]') !== null
  }

  private isGridView(): boolean {
    const container = document.querySelector('[data-tour-results]')
    return container?.getAttribute('data-view-mode') === 'card'
  }

  private handleActivation(event: KeyboardEvent): void {
    const target = event.target as HTMLElement
    
    // Only handle space/enter on specific elements
    if (target.tagName === 'BUTTON' || target.tagName === 'A') return
    
    if (target.hasAttribute('data-tour-card') || target.closest('[data-tour-card]')) {
      event.preventDefault()
      const link = target.querySelector('a') || target.closest('a')
      if (link) {
        link.click()
      }
    }
  }

  // Focus trap management
  public enableFocusTrap(container: HTMLElement): void {
    this.focusTrapContainer = container
    this.trapFocus = true
    this.updateFocusableElements(container)
    this.focusFirstTrapElement()
  }

  public disableFocusTrap(): void {
    this.trapFocus = false
    this.focusTrapContainer = null
    this.focusableElements = []
  }

  private updateFocusableElements(container: HTMLElement): void {
    const selector = `
      button:not([disabled]),
      [href],
      input:not([disabled]),
      select:not([disabled]),
      textarea:not([disabled]),
      [tabindex]:not([tabindex="-1"]):not([disabled]),
      [contenteditable="true"]
    `
    this.focusableElements = Array.from(container.querySelectorAll(selector))
  }

  private focusFirstTrapElement(): void {
    if (this.focusableElements.length > 0) {
      this.focusableElements[0].focus()
    }
  }
}

// ===================================================================
// Color Contrast & Visual Accessibility
// ===================================================================

export class VisualAccessibilityManager {
  private preferReducedMotion: boolean = false
  private highContrastMode: boolean = false

  constructor() {
    this.detectUserPreferences()
    this.setupMediaQueryListeners()
  }

  private detectUserPreferences(): void {
    if (typeof window === 'undefined') return

    // Detect reduced motion preference
    const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    this.preferReducedMotion = reduceMotionQuery.matches

    // Detect high contrast preference
    const highContrastQuery = window.matchMedia('(prefers-contrast: high)')
    this.highContrastMode = highContrastQuery.matches
  }

  private setupMediaQueryListeners(): void {
    if (typeof window === 'undefined') return

    // Listen for reduced motion changes
    const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    reduceMotionQuery.addEventListener('change', (e) => {
      this.preferReducedMotion = e.matches
      this.updateMotionPreferences()
    })

    // Listen for contrast changes
    const highContrastQuery = window.matchMedia('(prefers-contrast: high)')
    highContrastQuery.addEventListener('change', (e) => {
      this.highContrastMode = e.matches
      this.updateContrastPreferences()
    })
  }

  private updateMotionPreferences(): void {
    document.documentElement.style.setProperty(
      '--ts32-reduce-motion',
      this.preferReducedMotion ? '1' : '0'
    )
  }

  private updateContrastPreferences(): void {
    document.documentElement.style.setProperty(
      '--ts32-high-contrast',
      this.highContrastMode ? '1' : '0'
    )
  }

  public getContrastRatio(color1: string, color2: string): number {
    const rgb1 = this.hexToRgb(color1)
    const rgb2 = this.hexToRgb(color2)
    
    if (!rgb1 || !rgb2) return 0

    const l1 = this.getLuminance(rgb1)
    const l2 = this.getLuminance(rgb2)
    
    const lighter = Math.max(l1, l2)
    const darker = Math.min(l1, l2)
    
    return (lighter + 0.05) / (darker + 0.05)
  }

  private hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  }

  private getLuminance(rgb: { r: number; g: number; b: number }): number {
    const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(c => {
      c = c / 255
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    })
    return 0.2126 * r + 0.7152 * g + 0.0722 * b
  }

  public validateContrastCompliance(foreground: string, background: string): {
    aa: boolean
    aaa: boolean
    ratio: number
  } {
    const ratio = this.getContrastRatio(foreground, background)
    return {
      aa: ratio >= 4.5,
      aaa: ratio >= 7,
      ratio: Math.round(ratio * 100) / 100
    }
  }
}

// ===================================================================
// ARIA Attributes Manager
// ===================================================================

export class AriaManager {
  public static generateTourCardAria(tour: SearchIndexTour, position: number): {
    role: string
    ariaLabel: string
    ariaDescribedBy?: string
    tabIndex: number
  } {
    const rating = tour.quality.rating > 0 
      ? `${tour.quality.rating} out of 5 stars` 
      : 'No rating'
    
    const price = `$${tour.pricing.base_price}`
    const location = tour.location.cities[0] || tour.location.region
    
    const ariaLabel = `${tour.title}, ${location}, ${price}, ${rating}, position ${position}`

    return {
      role: 'button',
      ariaLabel: ariaLabel,
      tabIndex: 0
    }
  }

  public static generateFilterAria(
    filterType: string, 
    isActive: boolean, 
    count?: number
  ): {
    role: string
    ariaLabel: string
    ariaPressed?: boolean
    ariaExpanded?: boolean
  } {
    let ariaLabel = `${filterType} filter`
    
    if (count !== undefined) {
      ariaLabel += `, ${count} options`
    }
    
    if (isActive) {
      ariaLabel += ', currently active'
    }

    return {
      role: 'button',
      ariaLabel,
      ariaPressed: isActive
    }
  }

  public static generateSearchResultsAria(count: number, query: string): {
    role: string
    'aria-label': string
    'aria-live': string
  } {
    const ariaLabel = query 
      ? `Search results for "${query}": ${count} tours found`
      : `${count} tours displayed`

    return {
      role: 'region',
      'aria-label': ariaLabel,
      'aria-live': 'polite'
    }
  }
}

// ===================================================================
// Main Accessibility Manager
// ===================================================================

export class AccessibilityManager {
  private screenReader: ScreenReaderManager
  private keyboard: KeyboardNavigationManager
  private visual: VisualAccessibilityManager
  private config: A11yConfig

  constructor(config: Partial<A11yConfig> = {}) {
    this.config = {
      announceSearchResults: true,
      keyboardNavigation: true,
      focusManagement: true,
      reduceMotion: false,
      highContrast: false,
      screenReaderOptimizations: true,
      ...config
    }

    this.screenReader = new ScreenReaderManager()
    this.keyboard = new KeyboardNavigationManager()
    this.visual = new VisualAccessibilityManager()

    this.initialize()
  }

  private initialize(): void {
    if (this.config.keyboardNavigation) {
      this.keyboard.initializeKeyboardNavigation()
    }
  }

  // Public API
  public announceSearchResults(query: string, count: number, filters: SearchFilters): void {
    if (this.config.announceSearchResults) {
      this.screenReader.announceSearchResults(query, count, filters)
    }
  }

  public announceFilterChange(filterType: string, action: 'applied' | 'removed', value: string): void {
    this.screenReader.announceFilterChange(filterType, action, value)
  }

  public announceError(error: string): void {
    this.screenReader.announceError(error)
  }

  public enableModalFocusTrap(modal: HTMLElement): void {
    if (this.config.focusManagement) {
      this.keyboard.enableFocusTrap(modal)
    }
  }

  public disableModalFocusTrap(): void {
    this.keyboard.disableFocusTrap()
  }

  public validateContrast(foreground: string, background: string) {
    return this.visual.validateContrastCompliance(foreground, background)
  }
}

// ===================================================================
// Export Singleton Instance
// ===================================================================

export const a11yManager = new AccessibilityManager()

// ===================================================================
// React Hooks for Accessibility
// ===================================================================

export const useAccessibility = () => {
  return {
    announceSearchResults: a11yManager.announceSearchResults.bind(a11yManager),
    announceFilterChange: a11yManager.announceFilterChange.bind(a11yManager),
    announceError: a11yManager.announceError.bind(a11yManager),
    enableModalFocusTrap: a11yManager.enableModalFocusTrap.bind(a11yManager),
    disableModalFocusTrap: a11yManager.disableModalFocusTrap.bind(a11yManager),
    validateContrast: a11yManager.validateContrast.bind(a11yManager),
    AriaManager
  }
}

export default a11yManager