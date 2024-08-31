import { defineConfig } from 'kirbyup/config'

export default defineConfig({
  input: 'src/index.js',
  alias: {
    '@components': '/src/components'
  },
  vite: {
    server: {
      port: 3000
    }
  }
})