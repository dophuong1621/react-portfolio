import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/portfolio/' : '/',
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 800,
    cssCodeSplit: true,
    reportCompressedSize: false,

    // Không preload particles chunk — để requestIdleCallback thực sự lazy-load nó
    // Mặc định Vite inject <link rel="modulepreload"> cho TẤT CẢ chunks,
    // điều này phá vỡ mục tiêu lazy-load và đưa particles vào critical chain.
    modulePreload: {
      resolveDependencies: (_url, deps) =>
        deps.filter(dep => !dep.includes('particles')),
    },

    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        manualChunks: {
          'vendor-react':     ['react', 'react-dom'],
          'vendor-swiper':    ['swiper'],
          'vendor-framer':    ['framer-motion'],
          'vendor-particles': ['@tsparticles/react', '@tsparticles/slim', '@tsparticles/engine'],
          'vendor-misc':      ['TagCloud', 'typewriter-effect', 'react-icons'],
        }
      }
    }
  },

  server: {
    warmup: {
      clientFiles: ['./src/App.jsx', './src/index.css'],
    }
  }
})
