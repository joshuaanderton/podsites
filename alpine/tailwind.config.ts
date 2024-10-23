import typographyPlugin from '@tailwindcss/typography'
import { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

process.loadEnvFile('.env')

var [primary, secondary] = (process.env.VITE_THEME_COLORS || '#F6BB43,#AF450E').split(',')

export default {
  content: ['./index.html', './src/**/*.{js,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Satoshi', ...defaultTheme.fontFamily.sans],
        mono: ['JetBrains Mono', ...defaultTheme.fontFamily.mono],
      },
      spacing: {
        18: '4.5rem',
      },
      colors: { primary, secondary },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            'h2>a:not(:hover)': {
              color: 'inherit !important',
            },
            'a,button': {
              color: theme('colors.primary'),
              fontWeight: 500,
              transitionProperty: 'color',
              textDecoration: 'none',
              '&:hover,&:active': {
                color: theme('colors.secondary'),
              },
            },
          },
        },
      })
    },
  },
  plugins: [typographyPlugin],
} satisfies Config
