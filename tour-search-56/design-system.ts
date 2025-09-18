// ===================================================================
// tour-search-32: Design System
// ===================================================================
// Isolated design tokens and component styles - no external dependencies
// Mobile-first, accessibility-compliant, performance-optimized

// ===================================================================
// Design Tokens
// ===================================================================

export const TS32_TOKENS = {
  // Color Palette - Optimized for accessibility (WCAG AA)
  colors: {
    // Primary - Travel/Trust theme
    primary: {
      50: '#eff6ff',
      100: '#dbeafe', 
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6', // Main brand color
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a'
    },
    
    // Secondary - Accent/Energy
    secondary: {
      50: '#fdf4ff',
      100: '#fae8ff',
      200: '#f5d0fe', 
      300: '#f0abfc',
      400: '#e879f9',
      500: '#d946ef',
      600: '#c026d3',
      700: '#a21caf',
      800: '#86198f',
      900: '#701a75'
    },
    
    // Success - Booking/Available states
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d'
    },
    
    // Warning - Low availability/Attention
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f'
    },
    
    // Error - Sold out/Problems
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d'
    },
    
    // Neutral - Text and backgrounds
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827'
    }
  },
  
  // Typography Scale - Optimized for readability
  typography: {
    // Font families
    fonts: {
      sans: [
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif'
      ].join(', '),
      thai: [
        '"Kanit"',
        '"Noto Sans Thai"',
        '"Sarabun"',
        'ui-sans-serif',
        'system-ui',
        'sans-serif'
      ].join(', ')
    },
    
    // Font sizes - Mobile-first with rem units
    sizes: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
      '5xl': '3rem',     // 48px
      '6xl': '3.75rem'   // 60px
    },
    
    // Font weights
    weights: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800'
    },
    
    // Line heights
    leading: {
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2'
    }
  },
  
  // Spacing Scale - 8px grid system
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
    24: '6rem',    // 96px
    32: '8rem',    // 128px
    40: '10rem',   // 160px
    48: '12rem',   // 192px
    56: '14rem',   // 224px
    64: '16rem'    // 256px
  },
  
  // Border Radius - Consistent rounding
  radius: {
    none: '0',
    sm: '0.125rem',  // 2px
    base: '0.25rem', // 4px
    md: '0.375rem',  // 6px
    lg: '0.5rem',    // 8px
    xl: '0.75rem',   // 12px
    '2xl': '1rem',   // 16px
    '3xl': '1.5rem', // 24px
    full: '9999px'
  },
  
  // Shadows - Elevation system
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)'
  },
  
  // Breakpoints - Mobile-first responsive design
  breakpoints: {
    sm: '640px',   // Small devices
    md: '768px',   // Medium devices  
    lg: '1024px',  // Large devices
    xl: '1280px',  // Extra large devices
    '2xl': '1536px' // 2X Extra large devices
  },
  
  // Z-index layers - Consistent stacking
  zIndex: {
    hide: '-1',
    auto: 'auto',
    base: '0',
    docked: '10',
    dropdown: '1000',
    sticky: '1100',
    banner: '1200',
    overlay: '1300',
    modal: '1400',
    popover: '1500',
    skipLink: '1600',
    toast: '1700',
    tooltip: '1800'
  },
  
  // Animation & Motion
  motion: {
    // Duration
    duration: {
      fast: '150ms',
      normal: '250ms',
      slow: '400ms',
      slower: '600ms'
    },
    
    // Easing functions
    ease: {
      linear: 'linear',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    }
  }
} as const

// ===================================================================
// Component Base Styles
// ===================================================================

export const TS32_COMPONENTS = {
  // Button variants
  button: {
    base: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: TS32_TOKENS.radius.lg,
      fontWeight: TS32_TOKENS.typography.weights.semibold,
      fontSize: TS32_TOKENS.typography.sizes.sm,
      lineHeight: TS32_TOKENS.typography.leading.snug,
      textAlign: 'center' as const,
      verticalAlign: 'top',
      whiteSpace: 'nowrap' as const,
      userSelect: 'none' as const,
      border: '2px solid transparent',
      cursor: 'pointer',
      transition: `all ${TS32_TOKENS.motion.duration.normal} ${TS32_TOKENS.motion.ease.out}`,
      outline: 'none',
      textDecoration: 'none',
      
      // Focus styles handled by CSS
      
      // Touch targets (minimum 44px)
      minHeight: '44px',
      minWidth: '44px',
      
      // Disabled state
      '&:disabled': {
        opacity: '0.5',
        cursor: 'not-allowed',
        pointerEvents: 'none'
      }
    },
    
    // Size variants
    sizes: {
      sm: {
        padding: `${TS32_TOKENS.spacing[2]} ${TS32_TOKENS.spacing[3]}`,
        fontSize: TS32_TOKENS.typography.sizes.xs,
        minHeight: '36px'
      },
      md: {
        padding: `${TS32_TOKENS.spacing[3]} ${TS32_TOKENS.spacing[4]}`,
        fontSize: TS32_TOKENS.typography.sizes.sm
      },
      lg: {
        padding: `${TS32_TOKENS.spacing[4]} ${TS32_TOKENS.spacing[6]}`,
        fontSize: TS32_TOKENS.typography.sizes.base,
        minHeight: '48px'
      }
    },
    
    // Color variants
    variants: {
      primary: {
        backgroundColor: TS32_TOKENS.colors.primary[500],
        color: TS32_TOKENS.colors.gray[50],
        boxShadow: TS32_TOKENS.shadows.sm,
        
        '&:hover': {
          backgroundColor: TS32_TOKENS.colors.primary[600],
          boxShadow: TS32_TOKENS.shadows.md,
          transform: 'translateY(-1px)'
        },
        
        '&:active': {
          backgroundColor: TS32_TOKENS.colors.primary[700],
          transform: 'translateY(0)'
        }
      },
      
      secondary: {
        backgroundColor: TS32_TOKENS.colors.gray[100],
        color: TS32_TOKENS.colors.gray[700],
        border: `2px solid ${TS32_TOKENS.colors.gray[200]}`,
        
        '&:hover': {
          backgroundColor: TS32_TOKENS.colors.gray[200],
          borderColor: TS32_TOKENS.colors.gray[300]
        },
        
        '&:active': {
          backgroundColor: TS32_TOKENS.colors.gray[300]
        }
      },
      
      success: {
        backgroundColor: TS32_TOKENS.colors.success[500],
        color: TS32_TOKENS.colors.gray[50],
        
        '&:hover': {
          backgroundColor: TS32_TOKENS.colors.success[600]
        }
      },
      
      warning: {
        backgroundColor: TS32_TOKENS.colors.warning[500],
        color: TS32_TOKENS.colors.gray[50],
        
        '&:hover': {
          backgroundColor: TS32_TOKENS.colors.warning[600]
        }
      },
      
      error: {
        backgroundColor: TS32_TOKENS.colors.error[500],
        color: TS32_TOKENS.colors.gray[50],
        
        '&:hover': {
          backgroundColor: TS32_TOKENS.colors.error[600]
        }
      },
      
      ghost: {
        backgroundColor: 'transparent',
        color: TS32_TOKENS.colors.primary[600],
        
        '&:hover': {
          backgroundColor: TS32_TOKENS.colors.primary[50],
          color: TS32_TOKENS.colors.primary[700]
        }
      }
    }
  },
  
  // Input components
  input: {
    base: {
      width: '100%',
      borderRadius: TS32_TOKENS.radius.lg,
      border: `2px solid ${TS32_TOKENS.colors.gray[200]}`,
      backgroundColor: TS32_TOKENS.colors.gray[50],
      padding: `${TS32_TOKENS.spacing[3]} ${TS32_TOKENS.spacing[4]}`,
      fontSize: TS32_TOKENS.typography.sizes.base,
      lineHeight: TS32_TOKENS.typography.leading.snug,
      color: TS32_TOKENS.colors.gray[900],
      transition: `all ${TS32_TOKENS.motion.duration.normal} ${TS32_TOKENS.motion.ease.out}`,
      outline: 'none',
      
      // Minimum touch target
      minHeight: '44px',
      
      // States
      '&::placeholder': {
        color: TS32_TOKENS.colors.gray[400]
      },
      
      '&:focus': {
        backgroundColor: TS32_TOKENS.colors.gray[50],
        borderColor: TS32_TOKENS.colors.primary[500],
        boxShadow: `0 0 0 1px ${TS32_TOKENS.colors.primary[500]}`
      },
      
      '&:disabled': {
        backgroundColor: TS32_TOKENS.colors.gray[100],
        color: TS32_TOKENS.colors.gray[400],
        cursor: 'not-allowed'
      },
      
      // Error state handled by CSS
    }
  },
  
  // Card component
  card: {
    base: {
      backgroundColor: TS32_TOKENS.colors.gray[50],
      borderRadius: TS32_TOKENS.radius['2xl'],
      border: `1px solid ${TS32_TOKENS.colors.gray[200]}`,
      boxShadow: TS32_TOKENS.shadows.sm,
      overflow: 'hidden',
      transition: `all ${TS32_TOKENS.motion.duration.normal} ${TS32_TOKENS.motion.ease.out}`,
      
      '&:hover': {
        boxShadow: TS32_TOKENS.shadows.lg,
        transform: 'translateY(-2px)'
      }
    },
    
    variants: {
      elevated: {
        boxShadow: TS32_TOKENS.shadows.md,
        
        '&:hover': {
          boxShadow: TS32_TOKENS.shadows.xl,
          transform: 'translateY(-4px)'
        }
      },
      
      interactive: {
        cursor: 'pointer',
        
        '&:active': {
          transform: 'translateY(0) scale(0.98)'
        }
      }
    }
  },
  
  // Badge component
  badge: {
    base: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: TS32_TOKENS.radius.full,
      fontSize: TS32_TOKENS.typography.sizes.xs,
      fontWeight: TS32_TOKENS.typography.weights.semibold,
      lineHeight: TS32_TOKENS.typography.leading.tight,
      padding: `${TS32_TOKENS.spacing[1]} ${TS32_TOKENS.spacing[2]}`,
      whiteSpace: 'nowrap' as const,
      textTransform: 'none' as const
    },
    
    variants: {
      primary: {
        backgroundColor: TS32_TOKENS.colors.primary[100],
        color: TS32_TOKENS.colors.primary[800]
      },
      success: {
        backgroundColor: TS32_TOKENS.colors.success[100],
        color: TS32_TOKENS.colors.success[800]
      },
      warning: {
        backgroundColor: TS32_TOKENS.colors.warning[100],
        color: TS32_TOKENS.colors.warning[800]
      },
      error: {
        backgroundColor: TS32_TOKENS.colors.error[100],
        color: TS32_TOKENS.colors.error[800]
      },
      gray: {
        backgroundColor: TS32_TOKENS.colors.gray[100],
        color: TS32_TOKENS.colors.gray[700]
      }
    }
  },
  
  // Modal/Drawer components
  modal: {
    overlay: {
      position: 'fixed' as const,
      inset: '0',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: TS32_TOKENS.zIndex.overlay,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: TS32_TOKENS.spacing[4]
    },
    
    content: {
      backgroundColor: TS32_TOKENS.colors.gray[50],
      borderRadius: TS32_TOKENS.radius['2xl'],
      boxShadow: TS32_TOKENS.shadows['2xl'],
      width: '100%',
      maxWidth: '500px',
      maxHeight: '90vh',
      overflow: 'auto',
      position: 'relative' as const,
      zIndex: TS32_TOKENS.zIndex.modal
    }
  },
  
  // Loading states
  skeleton: {
    base: {
      backgroundColor: TS32_TOKENS.colors.gray[200],
      borderRadius: TS32_TOKENS.radius.md,
      overflow: 'hidden',
      position: 'relative' as const,
      
      '&::after': {
        content: '""',
        position: 'absolute' as const,
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
        transform: 'translateX(-100%)',
        backgroundImage: `linear-gradient(
          90deg,
          transparent,
          ${TS32_TOKENS.colors.gray[50]},
          transparent
        )`,
        animation: 'shimmer 2s infinite'
      }
    }
  }
} as const

// ===================================================================
// CSS Custom Properties (CSS Variables)
// ===================================================================

export const TS32_CSS_VARS = {
  ':root': {
    // Colors
    '--ts32-primary': TS32_TOKENS.colors.primary[500],
    '--ts32-primary-dark': TS32_TOKENS.colors.primary[600],
    '--ts32-primary-light': TS32_TOKENS.colors.primary[100],
    
    '--ts32-success': TS32_TOKENS.colors.success[500],
    '--ts32-warning': TS32_TOKENS.colors.warning[500],
    '--ts32-error': TS32_TOKENS.colors.error[500],
    
    '--ts32-gray-50': TS32_TOKENS.colors.gray[50],
    '--ts32-gray-100': TS32_TOKENS.colors.gray[100],
    '--ts32-gray-200': TS32_TOKENS.colors.gray[200],
    '--ts32-gray-300': TS32_TOKENS.colors.gray[300],
    '--ts32-gray-400': TS32_TOKENS.colors.gray[400],
    '--ts32-gray-500': TS32_TOKENS.colors.gray[500],
    '--ts32-gray-600': TS32_TOKENS.colors.gray[600],
    '--ts32-gray-700': TS32_TOKENS.colors.gray[700],
    '--ts32-gray-800': TS32_TOKENS.colors.gray[800],
    '--ts32-gray-900': TS32_TOKENS.colors.gray[900],
    
    // Typography
    '--ts32-font-sans': TS32_TOKENS.typography.fonts.sans,
    '--ts32-font-thai': TS32_TOKENS.typography.fonts.thai,
    
    // Spacing
    '--ts32-space-1': TS32_TOKENS.spacing[1],
    '--ts32-space-2': TS32_TOKENS.spacing[2],
    '--ts32-space-3': TS32_TOKENS.spacing[3],
    '--ts32-space-4': TS32_TOKENS.spacing[4],
    '--ts32-space-6': TS32_TOKENS.spacing[6],
    '--ts32-space-8': TS32_TOKENS.spacing[8],
    
    // Border radius
    '--ts32-radius-sm': TS32_TOKENS.radius.sm,
    '--ts32-radius-md': TS32_TOKENS.radius.md,
    '--ts32-radius-lg': TS32_TOKENS.radius.lg,
    '--ts32-radius-xl': TS32_TOKENS.radius.xl,
    '--ts32-radius-2xl': TS32_TOKENS.radius['2xl'],
    
    // Shadows
    '--ts32-shadow-sm': TS32_TOKENS.shadows.sm,
    '--ts32-shadow-md': TS32_TOKENS.shadows.md,
    '--ts32-shadow-lg': TS32_TOKENS.shadows.lg,
    '--ts32-shadow-xl': TS32_TOKENS.shadows.xl,
    
    // Motion
    '--ts32-duration-fast': TS32_TOKENS.motion.duration.fast,
    '--ts32-duration-normal': TS32_TOKENS.motion.duration.normal,
    '--ts32-duration-slow': TS32_TOKENS.motion.duration.slow,
    '--ts32-ease-out': TS32_TOKENS.motion.ease.out,
    '--ts32-ease-in-out': TS32_TOKENS.motion.ease['in-out']
  }
} as const

// ===================================================================
// Utility Classes
// ===================================================================

export const TS32_UTILITIES = {
  // Screen reader only
  'sr-only': {
    position: 'absolute' as const,
    width: '1px',
    height: '1px',
    padding: '0',
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap' as const,
    border: '0'
  },
  
  // Focus ring for accessibility (handled by CSS)
  'focus-ring': {
    outline: 'none'
  },
  
  // Truncate text
  'truncate': {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const
  },
  
  // Line clamp (multi-line truncation)
  'line-clamp-2': {
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: '2'
  },
  
  'line-clamp-3': {
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: '3'
  },
  
  // Scrollbar hide (for horizontal scrolling)
  'scrollbar-hide': {
    scrollbarWidth: 'none' as const,
    '&::-webkit-scrollbar': {
      display: 'none'
    }
  },
  
  // Touch manipulation (for better mobile performance)
  'touch-manipulation': {
    touchAction: 'manipulation'
  }
} as const

// ===================================================================
// Keyframe Animations
// ===================================================================

export const TS32_KEYFRAMES = {
  shimmer: {
    '0%': { transform: 'translateX(-100%)' },
    '100%': { transform: 'translateX(100%)' }
  },
  
  fadeIn: {
    '0%': { opacity: '0' },
    '100%': { opacity: '1' }
  },
  
  slideInUp: {
    '0%': { 
      transform: 'translateY(100%)', 
      opacity: '0' 
    },
    '100%': { 
      transform: 'translateY(0)', 
      opacity: '1' 
    }
  },
  
  slideInDown: {
    '0%': { 
      transform: 'translateY(-100%)', 
      opacity: '0' 
    },
    '100%': { 
      transform: 'translateY(0)', 
      opacity: '1' 
    }
  },
  
  pulse: {
    '0%': { opacity: '1' },
    '50%': { opacity: '0.5' },
    '100%': { opacity: '1' }
  },
  
  bounce: {
    '0%, 20%, 53%, 80%, 100%': { 
      animationTimingFunction: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
      transform: 'translate3d(0,0,0)' 
    },
    '40%, 43%': { 
      animationTimingFunction: 'cubic-bezier(0.755, 0.050, 0.855, 0.060)',
      transform: 'translate3d(0, -30px, 0)' 
    },
    '70%': { 
      animationTimingFunction: 'cubic-bezier(0.755, 0.050, 0.855, 0.060)',
      transform: 'translate3d(0, -15px, 0)' 
    },
    '90%': { transform: 'translate3d(0, -4px, 0)' }
  }
} as const

export default TS32_TOKENS