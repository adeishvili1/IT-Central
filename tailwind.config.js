/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['DejaVu Sans', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif']
      },

      // ═══════════════════════════════════════════════════════════════
      // PREMIUM DUAL THEME COLOR SYSTEM (Light + Dark)
      // ═══════════════════════════════════════════════════════════════
      colors: {
        // Brand Primary (Indigo - modern, sophisticated, tech-forward)
        primary: {
          50:  '#f0f4ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b'
        },

        // Light Theme Backgrounds
        light: {
          bg: '#ffffff',
          card: '#f8f9fa',
          elevated: '#ffffff',
          hover: '#f1f5f9',
          active: '#e2e8f0',
          border: '#e2e8f0',
          'border-subtle': '#cbd5e1',
          'border-accent': '#94a3b8'
        },

        // Dark Theme Backgrounds (Layered depth system)
        dark: {
          // Main app background (darkest)
          bg: '#0a0a0a',

          // Secondary surfaces (cards, containers)
          card: '#1a1a1a',

          // Elevated surfaces (modals, popovers, dropdowns)
          elevated: '#242424',

          // Hover state backgrounds
          hover: '#2d2d2d',

          // Active state backgrounds
          active: '#363636',

          // Subtle dividers
          border: '#1f1f1f',

          // Defined borders
          'border-subtle': '#2d2d2d',

          // Accent borders (lower opacity)
          'border-accent': '#3d3d3d'
        },

        // Text Colors (Light mode)
        'text-light': {
          primary: '#1f2937',
          secondary: '#6b7280',
          tertiary: '#9ca3af',
          muted: '#d1d5db',
          disabled: '#9ca3af',
          inverse: '#ffffff'
        },

        // Text Colors (Dark mode optimized)
        text: {
          primary: '#f5f5f5',
          secondary: '#d1d5db',
          tertiary: '#9ca3af',
          muted: '#6b7280',
          disabled: '#4b5563',
          inverse: '#0a0a0a'
        },

        // Status Colors (Vibrant but controlled)
        success: {
          50:  '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#145231',
          950: '#052e16'
        },

        warning: {
          50:  '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03'
        },

        error: {
          50:  '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a'
        },

        info: {
          50:  '#ecf0ff',
          100: '#dde9ff',
          200: '#c7d9ff',
          300: '#a4bfff',
          400: '#7da3ff',
          500: '#5b8cff',
          600: '#3d6cff',
          700: '#2e5bd6',
          800: '#2845ad',
          900: '#1f3685',
          950: '#142451'
        }
      },

      // ═══════════════════════════════════════════════════════════════
      // SHADOWS (Dark theme optimized - subtle but effective)
      // ═══════════════════════════════════════════════════════════════
      boxShadow: {
        // Subtle shadows
        'xs': '0 1px 2px rgba(0, 0, 0, 0.3)',
        'sm': '0 1px 3px rgba(0, 0, 0, 0.35), 0 1px 2px rgba(0, 0, 0, 0.25)',
        'base': '0 1px 3px rgba(0, 0, 0, 0.4), 0 1px 2px rgba(0, 0, 0, 0.3)',

        // Card & component shadows
        'md': '0 4px 12px rgba(0, 0, 0, 0.45)',
        'lg': '0 12px 24px rgba(0, 0, 0, 0.5)',
        'xl': '0 20px 40px rgba(0, 0, 0, 0.55)',

        // Glow effect for focus states
        'glow': '0 0 0 3px rgba(99, 102, 241, 0.15)',
        'glow-primary': '0 0 0 3px rgba(99, 102, 241, 0.2), 0 0 12px rgba(99, 102, 241, 0.15)',

        // Inset shadows for pressed states
        'inner-light': 'inset 0 1px 2px rgba(255, 255, 255, 0.05)',
        'inner-dark': 'inset 0 1px 3px rgba(0, 0, 0, 0.5)'
      },

      // ═══════════════════════════════════════════════════════════════
      // SPACING (8px grid system)
      // ═══════════════════════════════════════════════════════════════
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '32px',
        '3xl': '48px',
        '4xl': '64px'
      },

      // ═══════════════════════════════════════════════════════════════
      // BORDER RADIUS (Smooth, modern curves)
      // ═══════════════════════════════════════════════════════════════
      borderRadius: {
        'xs': '4px',
        'sm': '6px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '20px',
        '3xl': '24px'
      },

      // ═══════════════════════════════════════════════════════════════
      // TRANSITIONS & ANIMATIONS
      // ═══════════════════════════════════════════════════════════════
      transitionDuration: {
        'fast': '100ms',
        'base': '150ms',
        'slow': '200ms',
        'slower': '300ms'
      },

      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
      },

      // ═══════════════════════════════════════════════════════════════
      // GRADIENTS (Subtle, premium)
      // ═══════════════════════════════════════════════════════════════
      backgroundImage: {
        'gradient-subtle': 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(34, 197, 94, 0.05) 100%)',
        'gradient-primary': 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
        'gradient-success': 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
        'gradient-shimmer': 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)'
      },

      // ═══════════════════════════════════════════════════════════════
      // TYPOGRAPHY SCALE
      // ═══════════════════════════════════════════════════════════════
      fontSize: {
        'xs': ['12px', { lineHeight: '16px', letterSpacing: '0.04em' }],
        'sm': ['13px', { lineHeight: '18px', letterSpacing: '0.02em' }],
        'base': ['14px', { lineHeight: '21px' }],
        'lg': ['16px', { lineHeight: '24px' }],
        'xl': ['18px', { lineHeight: '27px' }],
        '2xl': ['20px', { lineHeight: '30px', fontWeight: '600' }],
        '3xl': ['24px', { lineHeight: '36px', fontWeight: '700' }],
        '4xl': ['32px', { lineHeight: '40px', fontWeight: '700' }]
      },

      // ═══════════════════════════════════════════════════════════════
      // FILTER EFFECTS
      // ═══════════════════════════════════════════════════════════════
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px'
      }
    }
  },
  plugins: []
}
