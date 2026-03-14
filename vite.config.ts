import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Leitet /fussball-api/* im Dev-Server an api-fussball.de weiter
      '/fussball-api': {
        target: 'https://www.api-fussball.de',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/fussball-api/, ''),
        secure: true,
      },
    },
  },
})
