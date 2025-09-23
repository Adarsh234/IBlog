import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // your dev server port
    proxy: {
      // Proxy any request starting with /api to your backend
      '/api': {
        target: 'https://i-blog-nrg4.vercel.app',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, '/api') // keep /api prefix
      }
    }
  }
})
