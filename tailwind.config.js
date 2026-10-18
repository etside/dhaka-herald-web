/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        v1: {
          black: '#050505',
          dark: '#282828',
          'dark-2': '#383838',
          gold: '#e4b854',
          light: '#e4e4e4',
        },
        signal: {
          DEFAULT: '#ffd269',
          2: '#ffc65d',
          3: '#f3c454',
        },
        'gold-deep': '#8f6609',
        page: {
          DEFAULT: '#ffffff',
          2: '#f5f5f5',
          3: '#f7f7f7',
        },
        ink: {
          DEFAULT: '#282828',
          muted: '#9c9c9c',
        },
        background: 'var(--background)',
        surface: {
          DEFAULT: 'var(--surface)',
          2: 'var(--surface-2)',
          3: 'var(--surface-3)',
        },
        gold: {
          DEFAULT: 'var(--gold)',
          secondary: 'var(--gold-secondary)',
          glow: 'var(--gold-glow)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
          inverse: 'var(--text-inverse)',
        },
        glass: {
          bg: 'var(--glass-bg)',
          border: 'var(--glass-border)',
        },
        border: {
          DEFAULT: 'var(--border-line)',
          strong: 'var(--border-strong)',
        },
        breaking: 'var(--breaking)',
        high: 'var(--high)',
        urgent: {
          bg: 'var(--urgent-bg)',
          border: 'var(--urgent-border)',
        },
      },
      fontFamily: {
        sans: ['var(--font-body)'],
        body: ['var(--font-body)'],
        headline: ['var(--font-headline)'],
      },
      fontSize: {
        display: ['clamp(2.25rem, 7vw, 4.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
      },
      borderRadius: {
        card: '20px',
        pill: '100px',
        'v1-sm': '14px',
        'v1-md': '16px',
        'v1-lg': '18px',
        'v1-xl': '20px',
        sm: '8px',
        md: '12px',
        lg: '16px',
      },
      maxWidth: {
        page: '1512px',
      },
      transitionTimingFunction: {
        'v1-out': 'cubic-bezier(0, 0, 0.2, 1)',
        'v1-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}
