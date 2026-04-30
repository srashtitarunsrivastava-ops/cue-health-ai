import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../public',
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    proxy: {
      '/chat': 'http://localhost:3000',
      '/doctor-callback': 'http://localhost:3000',
      '/health': 'http://localhost:3000',
    },
  },
})
