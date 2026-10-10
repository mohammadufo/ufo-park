import type { Config } from 'tailwindcss'
import {
  colorsConfig,
  spacingConfig,
  animationConfig,
  keyframesConfig,
} from './src/styles/config'

const config: Config = {
  important: true,
  content: ['./src/components/**/*.{js,ts,jsx,tsx}'],

  theme: {
    colors: colorsConfig,
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        // Overpass descends from Highway Gothic, the lettering on road signs.
        display: [
          'var(--font-display)',
          'var(--font-sans)',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
      },
      ringColor: {
        DEFAULT: colorsConfig.primary.DEFAULT,
      },
      outlineColor: {
        DEFAULT: colorsConfig.primary.DEFAULT,
      },
      borderRadius: {
        DEFAULT: '0',
      },
      boxShadow: {
        glow: '0 0 0 1px rgb(var(--primary-rgb) / 0.5), 0 10px 40px -10px rgb(var(--primary-rgb) / 0.55)',
        'glow-sm':
          '0 0 0 1px rgb(var(--primary-rgb) / 0.35), 0 6px 20px -8px rgb(var(--primary-rgb) / 0.45)',
        panel:
          'inset 0 1px 0 0 rgb(255 255 255 / 0.04), 0 24px 60px -24px rgb(0 0 0 / 0.65)',
      },
      spacing: spacingConfig,
      animation: animationConfig,
      keyframes: keyframesConfig,
    },
  },
  plugins: [],
}
export default config
