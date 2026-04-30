/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        accent: {
          cyan: '#00d4ff',
          purple: '#9b59ff',
          pink: '#ff4da6',
          green: '#00ffaa',
        },
        dark: {
          base: '#00001a',
          secondary: 'rgba(10,10,40,0.7)',
          card: 'rgba(10,10,40,0.8)',
          border: 'rgba(0,212,255,0.2)',
        },
      },
      keyframes: {
        twinkle: {
          '0%': { opacity: '0.6' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0.7' },
        },
        heroGlow: {
          from: { filter: 'drop-shadow(0 0 20px rgba(0,212,255,0.2))' },
          to: { filter: 'drop-shadow(0 0 40px rgba(155,89,255,0.4))' },
        },
        pulse: {
          '0%': { opacity: '1' },
          '50%': { opacity: '0.4' },
          '100%': { opacity: '1' },
        },
        spin: {
          to: { transform: 'rotate(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        twinkle: 'twinkle 6s infinite alternate ease-in-out',
        heroGlow: 'heroGlow 4s ease-in-out infinite alternate',
        pulse: 'pulse 1.8s infinite ease-in-out',
        spin: 'spin 0.75s linear infinite',
        float: 'float 3s ease-in-out infinite',
        fadeIn: 'fadeIn 0.4s ease-out both',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
