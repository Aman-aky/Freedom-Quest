/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Cinzel', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        typewriter: ['"Special Elite"', 'monospace'],
      },
      colors: {
        parchment: {
          50: '#fbf6e9',
          100: '#f5ecd0',
          200: '#ecd9a8',
          300: '#e0c078',
          400: '#d4a857',
          500: '#c2913f',
          600: '#a87632',
          700: '#875a2a',
          800: '#6b4622',
          900: '#4d3219',
        },
        ember: {
          400: '#f59e3c',
          500: '#ef7d2a',
          600: '#d9661c',
          700: '#b34d14',
        },
        ink: {
          900: '#0a0806',
          800: '#15110b',
          700: '#211a12',
          600: '#2e2419',
          500: '#3d3022',
          400: '#524031',
        },
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.82' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-18px) translateX(8px)' },
        },
      },
      animation: {
        flicker: 'flicker 3.5s ease-in-out infinite',
        floatSlow: 'floatSlow 9s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
