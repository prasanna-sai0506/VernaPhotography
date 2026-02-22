/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
      },
      colors: {
        ink: '#0b0c10',
        slate: '#1b1d24',
        sand: '#f2e8d8',
        ember: '#ff6b3d',
        gold: '#f4c46b',
      },
      fontFamily: {
        display: ['Cinzel', 'Times New Roman', 'serif'],
        body: ['Source Sans 3', 'Segoe UI', 'Helvetica Neue', 'sans-serif'],
        elegant: ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        glow: '0 0 30px rgba(255, 107, 61, 0.35)',
      },
    },
  },
  plugins: [],
}

