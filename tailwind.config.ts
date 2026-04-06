import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Clash Display"', '"Plus Jakarta Sans"', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        cream: '#FDFBF7',
        espresso: '#1a1612',
        warm: {
          50: '#faf8f5',
          100: '#f3efe8',
          200: '#e8e0d4',
          300: '#d4c7b4',
          400: '#bba78a',
          500: '#a68e6d',
          600: '#8d7355',
          700: '#755e46',
          800: '#614e3c',
          900: '#524334',
        },
        gold: {
          400: '#c9a96e',
          500: '#b8943f',
          600: '#9a7b33',
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.32, 0.72, 0, 1) forwards',
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.32, 0.72, 0, 1) forwards',
        'slide-in-left': 'slideInLeft 0.8s cubic-bezier(0.32, 0.72, 0, 1) forwards',
        'slide-in-right': 'slideInRight 0.8s cubic-bezier(0.32, 0.72, 0, 1) forwards',
        'count-up': 'countUp 2s cubic-bezier(0.32, 0.72, 0, 1) forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-60px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(60px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
