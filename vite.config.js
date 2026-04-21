import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/react-portfolio/' : '/',
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          swiper: ['swiper'],
          framer: ['framer-motion'],
          particles: ['@tsparticles/react', '@tsparticles/slim', '@tsparticles/engine'],
          tagcloud: ['TagCloud'],
          icons: ['react-icons']
        }
      }
    }
  }
})
