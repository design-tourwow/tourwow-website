// TS33 Accessibility Helper Utilities
// Comprehensive A11y support for tour-search-33

import { trackA11yInteraction } from './analytics'

// Screen reader announcements
export class TS33ScreenReaderAnnouncer {
  private announcer: HTMLElement | null = null

  constructor() {
    if (typeof window !== 'undefined') {
      this.createAnnouncer()
    }
  }

  private createAnnouncer() {
    this.announcer = document.createElement('div')
    this.announcer.setAttribute('aria-live', 'polite')
    this.announcer.setAttribute('aria-atomic', 'true')
    this.announcer.className = 'ts33-sr-only'
    this.announcer.style.cssText = `
      position: absolute !important;
      width: 1px !important;
      height: 1px !important;
      padding: 0 !important;
      margin: -1px !important;
      overflow: hidden !important;
      clip: rect(0, 0, 0, 0) !important;
      white-space: nowrap !important;
      border: 0 !important;
    `
    document.body.appendChild(this.announcer)
  }

  announce(message: string, priority: 'polite' | 'assertive' = 'polite') {
    if (!this.announcer) return

    this.announcer.setAttribute('aria-live', priority)
    this.announcer.textContent = message

    trackA11yInteraction('screen_reader', 'announcement')

    // Clear after announcement to allow repeated messages
    setTimeout(() => {
      if (this.announcer) {
        this.announcer.textContent = ''
      }
    }, 1000)
  }

  announceSearchResults(count: number, filters?: string[]) {
    const filtersText = filters && filters.length > 0 
      ? ` ด้วยตัวกรอง ${filters.join(', ')}`
      : ''
    
    this.announce(
      `พบทัวร์ ${count} รายการ${filtersText}`,
      'polite'
    )
  }

  announceFilterChange(filterType: string, value: string, action: 'added' | 'removed') {
    const actionText = action === 'added' ? 'เพิ่ม' : 'ลบ'
    this.announce(`${actionText}ตัวกรอง ${filterType}: ${value}`)
  }

  announceLoadingState(message: string) {
    this.announce(`กำลัง${message}...`, 'assertive')
  }

  announceError(message: string) {
    this.announce(`ข้อผิดพลาด: ${message}`, 'assertive')
  }
}

// Keyboard navigation helper
export class TS33KeyboardNavigation {
  private focusableSelectors = [
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'a[href]',
    '[tabindex]:not([tabindex="-1"])'
  ].join(', ')

  getFocusableElements(container: HTMLElement): HTMLElement[] {
    return Array.from(container.querySelectorAll(this.focusableSelectors))
  }

  trapFocus(container: HTMLElement) {
    const focusableElements = this.getFocusableElements(container)
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      }

      if (e.key === 'Escape') {
        this.releaseFocus(container)
      }
    }

    container.addEventListener('keydown', handleKeyDown)
    firstElement?.focus()

    return () => container.removeEventListener('keydown', handleKeyDown)
  }

  releaseFocus(container: HTMLElement) {
    const event = new CustomEvent('ts33:focus-released')
    container.dispatchEvent(event)
  }

  handleArrowNavigation(
    elements: HTMLElement[],
    currentIndex: number,
    direction: 'up' | 'down' | 'left' | 'right'
  ): number {
    trackA11yInteraction('keyboard', 'arrow_navigation')

    let nextIndex = currentIndex

    switch (direction) {
      case 'up':
      case 'left':
        nextIndex = currentIndex > 0 ? currentIndex - 1 : elements.length - 1
        break
      case 'down':
      case 'right':
        nextIndex = currentIndex < elements.length - 1 ? currentIndex + 1 : 0
        break
    }

    elements[nextIndex]?.focus()
    return nextIndex
  }
}

// Focus management utility
export class TS33FocusManager {
  private focusStack: HTMLElement[] = []

  saveFocus() {
    const activeElement = document.activeElement as HTMLElement
    if (activeElement && activeElement !== document.body) {
      this.focusStack.push(activeElement)
    }
  }

  restoreFocus() {
    const lastFocused = this.focusStack.pop()
    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus()
    }
  }

  setFocusToFirstInteractive(container: HTMLElement) {
    const keyboardNav = new TS33KeyboardNavigation()
    const focusableElements = keyboardNav.getFocusableElements(container)
    focusableElements[0]?.focus()
  }
}

// High contrast mode detection
export function detectHighContrastMode(): boolean {
  if (typeof window === 'undefined') return false

  // Check for Windows High Contrast Mode
  const testElement = document.createElement('div')
  testElement.style.cssText = `
    border: 1px solid red;
    border-color: red green;
    position: absolute;
    height: 5px;
    top: -999px;
    background-image: url("data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==");
  `
  
  document.body.appendChild(testElement)
  
  const computed = window.getComputedStyle(testElement)
  const isHighContrast = (
    computed.borderTopColor === computed.borderRightColor ||
    computed.backgroundImage === 'none'
  )
  
  document.body.removeChild(testElement)
  
  return isHighContrast
}

// Reduced motion detection
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Color contrast utilities
export function getContrastRatio(foreground: string, background: string): number {
  function getLuminance(color: string): number {
    // Simple RGB luminance calculation
    const rgb = color.match(/\d+/g)
    if (!rgb || rgb.length < 3) return 0
    
    const [r, g, b] = rgb.map(c => {
      const normalized = parseInt(c) / 255
      return normalized <= 0.03928
        ? normalized / 12.92
        : Math.pow((normalized + 0.055) / 1.055, 2.4)
    })
    
    return 0.2126 * r + 0.7152 * g + 0.0722 * b
  }
  
  const l1 = getLuminance(foreground)
  const l2 = getLuminance(background)
  
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)
}

// Touch target size validation
export function validateTouchTargets(container: HTMLElement): {
  valid: boolean
  violations: Array<{ element: HTMLElement; size: { width: number; height: number } }>
} {
  const minSize = 44 // 44px minimum touch target size
  const violations: Array<{ element: HTMLElement; size: { width: number; height: number } }> = []
  
  const interactiveElements = container.querySelectorAll('button, input, a, [role="button"]')
  
  interactiveElements.forEach(element => {
    const rect = element.getBoundingClientRect()
    if (rect.width < minSize || rect.height < minSize) {
      violations.push({
        element: element as HTMLElement,
        size: { width: rect.width, height: rect.height }
      })
    }
  })
  
  return {
    valid: violations.length === 0,
    violations
  }
}

// ARIA live region manager
export class TS33LiveRegionManager {
  private regions: Map<string, HTMLElement> = new Map()

  createLiveRegion(id: string, politeness: 'polite' | 'assertive' = 'polite'): HTMLElement {
    if (this.regions.has(id)) {
      return this.regions.get(id)!
    }

    const region = document.createElement('div')
    region.id = `ts33-live-${id}`
    region.setAttribute('aria-live', politeness)
    region.setAttribute('aria-atomic', 'true')
    region.className = 'ts33-sr-only'
    region.style.cssText = `
      position: absolute !important;
      width: 1px !important;
      height: 1px !important;
      padding: 0 !important;
      margin: -1px !important;
      overflow: hidden !important;
      clip: rect(0, 0, 0, 0) !important;
      white-space: nowrap !important;
      border: 0 !important;
    `

    document.body.appendChild(region)
    this.regions.set(id, region)
    
    return region
  }

  announce(regionId: string, message: string) {
    const region = this.regions.get(regionId)
    if (region) {
      region.textContent = message
      
      // Clear after announcement
      setTimeout(() => {
        region.textContent = ''
      }, 1000)
    }
  }

  cleanup() {
    this.regions.forEach(region => {
      if (region.parentNode) {
        region.parentNode.removeChild(region)
      }
    })
    this.regions.clear()
  }
}

// Global instances
export const ts33Announcer = new TS33ScreenReaderAnnouncer()
export const ts33KeyboardNav = new TS33KeyboardNavigation()
export const ts33FocusManager = new TS33FocusManager()
export const ts33LiveRegions = new TS33LiveRegionManager()

// React hook for accessibility features
export function useTS33Accessibility() {
  return {
    announcer: ts33Announcer,
    keyboard: ts33KeyboardNav,
    focus: ts33FocusManager,
    liveRegions: ts33LiveRegions,
    detectHighContrast: detectHighContrastMode,
    prefersReducedMotion,
    validateTouchTargets,
    getContrastRatio
  }
}

// Accessibility audit function
export async function runTS33AccessibilityAudit(container: HTMLElement = document.body): Promise<{
  score: number
  issues: Array<{
    type: 'warning' | 'error'
    message: string
    element?: HTMLElement
    recommendation: string
  }>
}> {
  const issues: Array<{
    type: 'warning' | 'error'
    message: string
    element?: HTMLElement
    recommendation: string
  }> = []

  // Check touch targets
  const touchTargetCheck = validateTouchTargets(container)
  if (!touchTargetCheck.valid) {
    touchTargetCheck.violations.forEach(violation => {
      issues.push({
        type: 'error',
        message: `Touch target too small: ${violation.size.width}x${violation.size.height}px`,
        element: violation.element,
        recommendation: 'Increase touch target size to at least 44x44px'
      })
    })
  }

  // Check for missing alt text
  const images = container.querySelectorAll('img')
  images.forEach(img => {
    if (!img.alt && !img.getAttribute('aria-hidden')) {
      issues.push({
        type: 'error',
        message: 'Image missing alt text',
        element: img,
        recommendation: 'Add descriptive alt text or mark decorative images with aria-hidden="true"'
      })
    }
  })

  // Check for proper heading structure
  const headings = Array.from(container.querySelectorAll('h1, h2, h3, h4, h5, h6'))
  let lastLevel = 0
  headings.forEach(heading => {
    const level = parseInt(heading.tagName[1])
    if (level > lastLevel + 1) {
      issues.push({
        type: 'warning',
        message: `Heading level skipped: jumped from h${lastLevel} to h${level}`,
        element: heading as HTMLElement,
        recommendation: 'Use sequential heading levels for proper document structure'
      })
    }
    lastLevel = level
  })

  // Check for keyboard accessibility
  const interactiveElements = container.querySelectorAll('button, input, select, textarea, a[href]')
  interactiveElements.forEach(element => {
    const tabIndex = element.getAttribute('tabindex')
    if (tabIndex && parseInt(tabIndex) > 0) {
      issues.push({
        type: 'warning',
        message: 'Positive tabindex found',
        element: element as HTMLElement,
        recommendation: 'Use tabindex="0" or remove tabindex to maintain natural tab order'
      })
    }
  })

  // Check for ARIA labels
  const buttons = container.querySelectorAll('button')
  buttons.forEach(button => {
    const hasAccessibleName = button.textContent?.trim() || 
                             button.getAttribute('aria-label') || 
                             button.getAttribute('aria-labelledby')
    
    if (!hasAccessibleName) {
      issues.push({
        type: 'error',
        message: 'Button missing accessible name',
        element: button,
        recommendation: 'Add visible text, aria-label, or aria-labelledby attribute'
      })
    }
  })

  // Calculate score based on issues
  const errorCount = issues.filter(issue => issue.type === 'error').length
  const warningCount = issues.filter(issue => issue.type === 'warning').length
  const totalElements = container.querySelectorAll('*').length
  
  // Score calculation: start at 100, deduct for issues
  let score = 100
  score -= (errorCount * 10) // -10 points per error
  score -= (warningCount * 5) // -5 points per warning
  score = Math.max(0, score) // Minimum score of 0

  return {
    score,
    issues
  }
}