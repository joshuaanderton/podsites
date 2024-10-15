import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      name: 'podcast-from-rss',
      fileName: 'podcast-from-rss',
    },
    rollupOptions: {
      external: ['rss-to-json'],
      output: {
        globals: {
          'rss-to-json': 'rss-to-json',
        },
      },
    },
  },
})
