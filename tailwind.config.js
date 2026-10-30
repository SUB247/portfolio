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
        bg: 'hsl(var(--bg) / <alpha-value>)',
        surface: 'hsl(var(--surface) / <alpha-value>)',
        'surface-card': 'hsl(var(--surface-card) / <alpha-value>)',
        text: 'hsl(var(--text) / <alpha-value>)',
        muted: 'hsl(var(--muted) / <alpha-value>)',
        stroke: 'hsl(var(--stroke) / <alpha-value>)',
        accent: 'hsl(var(--accent) / <alpha-value>)',
        accentBlue: {
          light: '#89AACC',
          dark: '#4E85BF',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)',
        'accent-gradient-vertical': 'linear-gradient(180deg, #89AACC 0%, #4E85BF 100%)',
        'accent-glow': 'radial-gradient(circle at center, rgba(137, 170, 204, 0.15) 0%, transparent 70%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      boxShadow: {
        'accent-sm': '0 0 15px -3px rgba(137, 170, 204, 0.25)',
        'accent-lg': '0 0 30px -5px rgba(78, 133, 191, 0.35)',
      }
    },
  },
  plugins: [],
}
