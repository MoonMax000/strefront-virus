import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/screens/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        blink: 'blink 2s infinite',
      },
      screens: {
        'max-small-desktop': {
          max: '950px',
        },
        'max-big-mobile': {
          max: '500px',
        },
        'max-tablet': {
          max: '824px',
        },
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '0' },
        },
      },
      colors: {
        background: 'var(--color-bg)',
        darkCharcoal: 'var(--color-darkCharcoal)',
        purple: 'var(--color-lavenderIndigo)',
        moonlessNight: 'var(--color-moonlessNight)',
        onyxGrey: 'var(--color-onyxGrey)',
        white: 'var(--color-white)',
        webGray: 'var(--color-webGray)',
        black: 'var(--color-black)',
        green: 'var(--color-mountainMeadow)',
        red: 'var(--color-fieryRose)',
        orange: 'var(--color-orangePeel)',
        blue: 'var(--color-cornflowerBlue)',
        darkGreen: 'var(--color-darkJungleGreen)',
        darkRed: 'var(--color-darkSienna)',
        gunpowder: 'var(--color-gunpowder)',
        regaliaPurple: 'var(--color-regaliaPurple)',
        lightGray: '#1F2229',
        gray: '#272A32',
        text: 'var(--text)',
        darckGray: 'var(--darckGray)',
        blackedGray: 'var(--color-darkCharcoal)',
        'white-opacity-64': 'rgba(255, 255, 255, 0.64)',
        'white-opacity-16': 'rgba(255, 255, 255, 0.16)',
        'white-opacity-8': 'rgba(255, 255, 255, 0.8)',
        'black-opacity-64': 'rgba(0, 0, 0, 0.64)',
      },
      letterSpacing: {
        '-tight': '-0.02em',
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.custom-bg-blur': {
          'background-color': '#0C101480',
          'backdrop-filter': 'blur(100px)',
          '-webkit-backdrop-filter': 'blur(100px)',
        },
      });
    }),
  ],
} satisfies Config;
