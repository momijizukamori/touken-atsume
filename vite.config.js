import { defineConfig } from 'vite'

export default defineConfig({
  base: '/touken-atsume/',
  test: {
    environment: 'jsdom'
  }
})