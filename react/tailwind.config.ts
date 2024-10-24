import typographyPlugin from '@tailwindcss/typography'
import { type Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Satoshi', ...defaultTheme.fontFamily.sans],
        mono: ['JetBrains Mono', ...defaultTheme.fontFamily.mono],
      },
      colors: {
        primary: 'var(--color-primary, rgba(0, 0, 0, 1))',
        secondary: 'var(--color-secondary, rgba(0, 0, 0, .5))',
      },
      spacing: {
        18: '4.5rem',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            'h2>a:not(:hover)': {
              color: 'inherit !important',
            },
            'a,button': {
              fontWeight: 500,
              transitionProperty: 'color',
              textDecoration: 'none',
              color: theme('colors.primary'),
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
