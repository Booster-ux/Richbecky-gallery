/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#F0F4F8',
          100: '#D9E2EC',
          200: '#BCCCDC',
          700: '#162A3B',
          800: '#0F2537', // Brand Deep Navy
          900: '#0B192C',
          950: '#060E18'
        },
        gold: {
          50: '#FDFBF0',
          100: '#FAF3D7',
          200: '#F5E6AA',
          300: '#EED67C',
          400: '#E6CA65',
          500: '#D4AF37', // Brand Champagne Gold
          600: '#C5A059',
          700: '#9E7E36',
          800: '#7B6024',
          900: '#5A4416'
        },
        ivory: {
          50: '#FFFFFF',
          100: '#FDFBF7', // Brand Warm White / Ivory
          200: '#FAF8F5',
          300: '#F3EFE6',
          400: '#E8E1D3',
          500: '#DCD1BD'
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Playfair Display', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 4px 20px -2px rgba(15, 37, 55, 0.05)',
        'gallery': '0 10px 30px -5px rgba(15, 37, 55, 0.08)',
        'gold-glow': '0 0 15px rgba(212, 175, 55, 0.25)',
      }
    },
  },
  plugins: [],
}
