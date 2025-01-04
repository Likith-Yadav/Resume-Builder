/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'pulse-slow': 'pulse-slow 10s ease-in-out infinite',
        'pulse-slow-reverse': 'pulse-slow 12s ease-in-out infinite reverse',
        'float-slow': 'float-slow 8s ease-in-out infinite',
        'float-slow-reverse': 'float-slow 10s ease-in-out infinite reverse',
        'shimmer': 'shimmer 5s ease-in-out infinite',
        'shimmer-reverse': 'shimmer 6s ease-in-out infinite reverse'
      },
      keyframes: {
        'pulse-slow': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' }
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        'shimmer': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '0.8' }
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}