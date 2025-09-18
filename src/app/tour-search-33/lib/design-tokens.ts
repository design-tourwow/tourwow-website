// TS33 Design Tokens - Isolated design system for tour-search-33
// Completely independent from project's existing design tokens

export const TS33_DESIGN_TOKENS = {
  // Color System - Fresh palette, no inheritance
  colors: {
    // Primary Brand Colors
    primary: {
      50: '#eff6ff',
      100: '#dbeafe', 
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6', // Main brand
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a'
    },
    
    // Secondary Colors
    secondary: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0', 
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e', // Success green
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d'
    },
    
    // Surface & Background
    surface: {
      primary: '#ffffff',
      secondary: '#f8fafc',
      tertiary: '#f1f5f9',
      elevated: '#ffffff',
      overlay: 'rgba(0, 0, 0, 0.5)'
    },
    
    // Text Colors
    text: {
      primary: '#0f172a',
      secondary: '#475569',
      tertiary: '#64748b',
      inverse: '#ffffff',
      muted: '#94a3b8'
    },
    
    // Border Colors
    border: {
      primary: '#e2e8f0',
      secondary: '#cbd5e1',
      focus: '#3b82f6',
      error: '#ef4444'
    },
    
    // Status Colors
    status: {
      success: '#22c55e',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6'
    },
    
    // Feature Colors
    feature: {
      promotion: '#dc2626',
      popular: '#7c3aed',
      new: '#059669',
      premium: '#d97706'
    }
  },
  
  // Typography Scale
  typography: {
    fonts: {
      sans: ['Kanit', 'Noto Sans Thai', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      display: ['Kanit', 'Noto Sans Thai', 'system-ui', 'sans-serif']
    },
    
    sizes: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem'     // 48px
    },
    
    weights: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700'
    },
    
    lineHeights: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75'
    }
  },
  
  // Spacing System (4px base)
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
    24: '6rem'     // 96px
  },
  
  // Border Radius
  radius: {
    none: '0',
    xs: '0.125rem',   // 2px
    sm: '0.25rem',    // 4px
    base: '0.375rem', // 6px
    md: '0.5rem',     // 8px
    lg: '0.75rem',    // 12px
    xl: '1rem',       // 16px
    '2xl': '1.5rem',  // 24px
    full: '9999px'
  },
  
  // Shadows
  shadows: {
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)'
  },
  
  // Animation & Motion
  motion: {
    durations: {
      fast: '150ms',
      normal: '250ms',
      slow: '350ms'
    },
    
    easings: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)'
    }
  },
  
  // Component-specific tokens
  components: {
    button: {
      height: {
        sm: '2rem',    // 32px
        md: '2.5rem',  // 40px
        lg: '3rem'     // 48px
      },
      
      padding: {
        sm: '0.5rem 0.75rem',
        md: '0.75rem 1rem',
        lg: '1rem 1.5rem'
      }
    },
    
    input: {
      height: {
        sm: '2rem',
        md: '2.5rem',
        lg: '3rem'
      }
    },
    
    card: {
      padding: '1.5rem',
      radius: '0.75rem'
    },
    
    modal: {
      backdropBlur: 'blur(8px)',
      maxWidth: '32rem'
    }
  },
  
  // Breakpoints for responsive design
  breakpoints: {
    sm: '640px',
    md: '768px', 
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  },
  
  // Z-index scale
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1040,
    popover: 1050,
    tooltip: 1060
  }
} as const

// CSS Custom Properties Generator
export function generateTS33CSSVariables() {
  const tokens = TS33_DESIGN_TOKENS
  const cssVars: Record<string, string> = {}
  
  // Generate color variables with --ts33 prefix
  Object.entries(tokens.colors).forEach(([category, colors]) => {
    if (typeof colors === 'object' && colors !== null) {
      Object.entries(colors).forEach(([key, value]) => {
        cssVars[`--ts33-color-${category}-${key}`] = value
      })
    } else {
      cssVars[`--ts33-color-${category}`] = colors as string
    }
  })
  
  // Generate spacing variables
  Object.entries(tokens.spacing).forEach(([key, value]) => {
    cssVars[`--ts33-spacing-${key}`] = value
  })
  
  // Generate typography variables
  Object.entries(tokens.typography.sizes).forEach(([key, value]) => {
    cssVars[`--ts33-text-${key}`] = value
  })
  
  // Generate radius variables
  Object.entries(tokens.radius).forEach(([key, value]) => {
    cssVars[`--ts33-radius-${key}`] = value
  })
  
  // Generate shadow variables
  Object.entries(tokens.shadows).forEach(([key, value]) => {
    cssVars[`--ts33-shadow-${key}`] = value
  })
  
  return cssVars
}

// Utility functions for accessing tokens
export const ts33 = {
  color: (path: string) => {
    const keys = path.split('.')
    let value: any = TS33_DESIGN_TOKENS.colors
    for (const key of keys) {
      value = value?.[key]
    }
    return value
  },
  
  space: (key: keyof typeof TS33_DESIGN_TOKENS.spacing) => {
    return TS33_DESIGN_TOKENS.spacing[key]
  },
  
  radius: (key: keyof typeof TS33_DESIGN_TOKENS.radius) => {
    return TS33_DESIGN_TOKENS.radius[key]
  },
  
  shadow: (key: keyof typeof TS33_DESIGN_TOKENS.shadows) => {
    return TS33_DESIGN_TOKENS.shadows[key]
  },
  
  motion: (key: 'fast' | 'normal' | 'slow') => {
    return TS33_DESIGN_TOKENS.motion.durations[key]
  }
}

// CSS-in-JS helper for component styling
export function ts33Styles(styles: Record<string, any>) {
  return styles
}

// Responsive breakpoint helper
export function ts33Responsive(styles: Record<string, any>) {
  const { breakpoints } = TS33_DESIGN_TOKENS
  const responsive: Record<string, string> = {}
  
  Object.entries(styles).forEach(([bp, style]) => {
    if (bp in breakpoints) {
      responsive[`@media (min-width: ${breakpoints[bp as keyof typeof breakpoints]})`] = style
    } else {
      responsive[bp] = style
    }
  })
  
  return responsive
}