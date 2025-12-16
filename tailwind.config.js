/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'love-pink': '#FF6B9D',
        'love-purple': '#C06C84',
        'love-violet': '#9D4EDD',
        'love-gold': '#FFD700',
        'love-rose': '#F72585',
        'love-lavender': '#E0B0FF',
        'love-peach': '#FFB5A7',
        'love-dark': '#2D1B69',
      },
      fontFamily: {
        'romantic': ['"Playfair Display"', 'serif'],
        'modern': ['Poppins', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  plugins: [],
}
