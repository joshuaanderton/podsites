import typographyPlugin from '@tailwindcss/typography'
import { type Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ['index.html', './src/**/*.{js,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Satoshi', ...defaultTheme.fontFamily.sans],
        mono: ['JetBrains Mono', ...defaultTheme.fontFamily.mono],
      },
      spacing: {
        18: '4.5rem',
      },
      colors: {
        theme: {
          500: '#F6BB43',
          700: '#d3640c',
          900: '#af450e',
        }
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            'h2>a:not(:hover)': {
              color: 'inherit !important',
            },
            'a,button': {
              color: theme('colors.theme[500]'),
              fontWeight: 500,
              transitionProperty: 'color',
              textDecoration: 'none',
              '&:hover,&:active': {
                color: theme('colors.theme[900]'),
              },
            },
          },
        },
      })
    },
  },
  plugins: [typographyPlugin],
} satisfies Config
