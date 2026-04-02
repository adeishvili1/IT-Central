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
        sans: ['FiraGO', 'Fira Sans', 'sans-serif']
      },
      colors: {
        // Primary brand color (modern blue)
        primary: {
          50:  '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554'
        },
        // Dark theme - sophisticated neutrals
        slate: {
          0: '#ffffff',
          50:  '#f8fafc',
          100: '#f1f5f9',
          150: '#e8ecf1',
          200: '#e2e8f0',
          250: '#cbd5e1',
          300: '#cbd5e1',
          350: '#94a3b8',
          400: '#64748b',
          450: '#475569',
          500: '#64748b',
          550: '#475569',
          600: '#475569',
          650: '#334155',
          700: '#334155',
          750: '#1e293b',
          800: '#1e293b',
          850: '#0f172a',
          900: '#0f172a',
          950: '#020617'
        }
      },
      boxShadow: {
        // Subtle shadows for depth
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'sm': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        'base': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        'dark-xs': '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
        'dark-sm': '0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px -1px rgba(0, 0, 0, 0.3)',
        'dark-md': '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -2px rgba(0, 0, 0, 0.3)',
      },
      spacing: {
        // 8px grid system
        'gutter': '24px',
        'gap-xs': '4px',
        'gap-sm': '8px',
        'gap-md': '12px',
        'gap-lg': '16px',
        'gap-xl': '24px',
        'gap-2xl': '32px'
      },
      borderRadius: {
        'xs': '4px',
        'sm': '6px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '20px',
        '3xl': '24px'
      },
      transitionDuration: {
        'fast': '150ms',
        'base': '200ms',
        'slow': '300ms'
      },
      backgroundImage: {
        'gradient-subtle': 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)',
      }
    }
  },
  plugins: []
}
