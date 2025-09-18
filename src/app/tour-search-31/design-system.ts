/**
 * Design System for Tour Search 31
 * Completely independent design tokens and system
 * Mobile-first, accessible, performant
 */

// Design Tokens
export const tokens = {
  // Colors - New palette (different from existing routes)
  colors: {
    // Primary - Teal/Cyan theme
    primary: {
      50: '#e6fffa',
      100: '#b2f5ea',
      200: '#81e6d9',
      300: '#4fd1c5',
      400: '#38b2ac',
      500: '#319795',
      600: '#2c7a7b',
      700: '#285e61',
      800: '#234e52',
      900: '#1d4044',
    },
    // Secondary - Coral/Orange
    secondary: {
      50: '#fff5f5',
      100: '#fed7d7',
      200: '#feb2b2',
      300: '#fc8181',
      400: '#f56565',
      500: '#e53e3e',
      600: '#c53030',
      700: '#9b2c2c',
      800: '#822727',
      900: '#63171b',
    },
    // Neutral grays
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
    },
    // Semantic colors
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
    
    // Background colors
    background: {
      primary: '#ffffff',
      secondary: '#fafafa',
      tertiary: '#f5f5f5',
      overlay: 'rgba(0, 0, 0, 0.5)',
    },
    
    // Text colors
    text: {
      primary: '#171717',
      secondary: '#525252',
      tertiary: '#737373',
      inverse: '#ffffff',
      link: '#319795',
    }
  },
  
  // Typography
  typography: {
    fontFamily: {
      sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans Thai", sans-serif',
      mono: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
    },
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    }
  },
  
  // Spacing (based on 4px grid)
  spacing: {
    0: '0',
    1: '0.25rem',  // 4px
    2: '0.5rem',   // 8px
    3: '0.75rem',  // 12px
    4: '1rem',     // 16px
    5: '1.25rem',  // 20px
    6: '1.5rem',   // 24px
    8: '2rem',     // 32px
    10: '2.5rem',  // 40px
    12: '3rem',    // 48px
    16: '4rem',    // 64px
    20: '5rem',    // 80px
  },
  
  // Border radius
  borderRadius: {
    none: '0',
    sm: '0.25rem',   // 4px
    base: '0.5rem',  // 8px
    md: '0.75rem',   // 12px
    lg: '1rem',      // 16px
    xl: '1.5rem',    // 24px
    full: '9999px',
  },
  
  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 2px 4px 0 rgba(0, 0, 0, 0.06), 0 1px 2px 0 rgba(0, 0, 0, 0.04)',
    md: '0 4px 8px 0 rgba(0, 0, 0, 0.08), 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    lg: '0 8px 16px 0 rgba(0, 0, 0, 0.10), 0 4px 8px 0 rgba(0, 0, 0, 0.08)',
    xl: '0 16px 32px 0 rgba(0, 0, 0, 0.12), 0 8px 16px 0 rgba(0, 0, 0, 0.10)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  },
  
  // Transitions
  transitions: {
    fast: '150ms ease-in-out',
    base: '250ms ease-in-out',
    slow: '350ms ease-in-out',
  },
  
  // Breakpoints (mobile-first)
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  
  // Z-index scale
  zIndex: {
    base: 0,
    dropdown: 10,
    sticky: 20,
    overlay: 30,
    modal: 40,
    toast: 50,
  }
}

// Component styles (CSS-in-JS patterns)
export const componentStyles = {
  // Button variants
  button: {
    base: `
      ts31-btn
      inline-flex items-center justify-center
      font-semibold
      transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
      min-height: 44px
      touch-action: manipulation
    `,
    variants: {
      primary: `
        bg-teal-600 text-white
        hover:bg-teal-700 active:bg-teal-800
        focus:ring-teal-500
      `,
      secondary: `
        bg-white text-teal-600 border-2 border-teal-600
        hover:bg-teal-50 active:bg-teal-100
        focus:ring-teal-500
      `,
      ghost: `
        bg-transparent text-gray-700
        hover:bg-gray-100 active:bg-gray-200
        focus:ring-gray-500
      `,
    },
    sizes: {
      sm: 'px-3 py-2 text-sm rounded-md',
      md: 'px-4 py-2.5 text-base rounded-lg',
      lg: 'px-6 py-3 text-lg rounded-xl',
    }
  },
  
  // Input styles
  input: {
    base: `
      ts31-input
      w-full px-4 py-3
      bg-white border border-gray-300
      rounded-lg
      text-gray-900 placeholder-gray-500
      focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent
      disabled:bg-gray-50 disabled:text-gray-500
      min-height: 44px
    `,
    error: `
      border-red-500
      focus:ring-red-500
    `
  },
  
  // Card styles
  card: {
    base: `
      ts31-card
      bg-white rounded-xl
      border border-gray-200
      overflow-hidden
      transition-all duration-200
    `,
    interactive: `
      hover:shadow-lg hover:border-gray-300
      hover:transform hover:scale-[1.02]
      cursor-pointer
    `
  },
  
  // Badge styles
  badge: {
    base: `
      ts31-badge
      inline-flex items-center
      px-2.5 py-1
      rounded-full
      text-xs font-semibold
    `,
    variants: {
      default: 'bg-gray-100 text-gray-800',
      primary: 'bg-teal-100 text-teal-800',
      success: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      error: 'bg-red-100 text-red-800',
    }
  }
}

// Utility functions for responsive design
export const responsive = {
  // Check if mobile viewport
  isMobile: () => {
    if (typeof window === 'undefined') return false
    return window.innerWidth < 768
  },
  
  // Get breakpoint value
  getValue: <T>(values: { base: T; sm?: T; md?: T; lg?: T; xl?: T }): T => {
    if (typeof window === 'undefined') return values.base
    
    const width = window.innerWidth
    if (width >= 1280 && values.xl !== undefined) return values.xl
    if (width >= 1024 && values.lg !== undefined) return values.lg
    if (width >= 768 && values.md !== undefined) return values.md
    if (width >= 640 && values.sm !== undefined) return values.sm
    return values.base
  }
}

// Animation presets
export const animations = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  },
  slideDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  slideLeft: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  },
  slideRight: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  },
  rotate: {
    initial: { rotate: 0 },
    animate: { rotate: 360 },
  }
}

// Icon set (using simple SVG paths)
export const icons = {
  search: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
  filter: 'M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z',
  sort: 'M3 7h18M3 12h10M3 17h6',
  close: 'M6 18L18 6M6 6l12 12',
  chevronDown: 'M19 9l-7 7-7-7',
  chevronUp: 'M5 15l7-7 7 7',
  chevronLeft: 'M15 19l-7-7 7-7',
  chevronRight: 'M9 5l7 7-7 7',
  check: 'M5 13l4 4L19 7',
  plus: 'M12 4v16m8-8H4',
  minus: 'M20 12H4',
  star: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
  heart: 'M3.172 5.172a4 4 0 015.656 0L12 8.344l3.172-3.172a4 4 0 115.656 5.656L12 19.656 3.172 10.828a4 4 0 010-5.656z',
  globe: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-.61.08-1.21.21-1.78L8.99 15v1c0 1.1.9 2 2 2v1.93C7.06 19.43 4 16.07 4 12zm13.89 5.4c-.26-.81-1-1.4-1.89-1.4h-1v-3c0-.55-.45-1-1-1h-6v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41C17.92 5.77 20 8.65 20 12c0 2.08-.81 3.98-2.11 5.4z',
  location: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
  calendar: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  clock: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  users: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
  grid: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z',
  list: 'M4 6h16M4 12h16M4 18h16',
  info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  warning: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
  error: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
  success: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  loading: 'M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z',
}

// Accessibility helpers
export const a11y = {
  // Screen reader only text
  srOnly: `
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  `,
  
  // Focus visible styles
  focusVisible: `
    outline: 2px solid transparent;
    outline-offset: 2px;
    &:focus-visible {
      outline-color: ${tokens.colors.primary[500]};
    }
  `,
  
  // Skip to content link
  skipLink: `
    position: absolute;
    top: -40px;
    left: 0;
    background: ${tokens.colors.primary[600]};
    color: white;
    padding: 8px;
    text-decoration: none;
    z-index: 100;
    &:focus {
      top: 0;
    }
  `
}

// Export everything as a single design system object
export const designSystem = {
  tokens,
  componentStyles,
  responsive,
  animations,
  icons,
  a11y,
}

export default designSystem