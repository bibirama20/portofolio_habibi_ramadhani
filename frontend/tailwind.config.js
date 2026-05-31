/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        dark: {
          950: '#02020a',
          900: '#0d0d1a',
          800: '#13131f',
          700: '#1a1a2e',
          600: '#22223b',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-hero':
          'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99,102,241,0.2), transparent)',
      },
      animation: {
        'fade-up':    'fadeUp 0.6s ease forwards',
        'fade-in':    'fadeIn 0.4s ease forwards',
        blob:         'blob 8s ease-in-out infinite',
        'blob-slow':  'blob 12s ease-in-out infinite',
        float:        'float 6s ease-in-out infinite',
        shimmer:      'shimmer 2s linear infinite',
        'spin-slow':  'spin 8s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        blob: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '33%':     { transform: 'translate(30px,-30px) scale(1.05)' },
          '66%':     { transform: 'translate(-20px,20px) scale(0.95)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition:  '200% 0' },
        },
      },
      boxShadow: {
        'glow-sm':  '0 0 20px rgba(99,102,241,0.2)',
        'glow':     '0 0 40px rgba(99,102,241,0.3)',
        'glow-lg':  '0 0 80px rgba(99,102,241,0.4)',
        'glow-violet': '0 0 40px rgba(139,92,246,0.35)',
      },
    },
  },
  plugins: [],
}
