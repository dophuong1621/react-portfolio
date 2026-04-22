import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/portfolio/' : '/',
  plugins: [react()],
  build: {
    // Tăng chunk warning limit
    chunkSizeWarningLimit: 800,

    // Tối ưu CSS
    cssCodeSplit: true,

    // Không báo cáo compressed size trong build để nhanh hơn
    reportCompressedSize: false,

    rollupOptions: {
      output: {
        // Content hash để cache lâu dài trên CDN/GitHub Pages
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',

        manualChunks: {
          // React core — thay đổi ít nhất, cache lâu nhất
          'vendor-react': ['react', 'react-dom'],

          // Swiper — khá lớn, tách riêng
          'vendor-swiper': ['swiper'],

          // Framer Motion — animation library
          'vendor-framer': ['framer-motion'],

          // tsParticles — lazy loaded nhưng vẫn tách chunk
          'vendor-particles': ['@tsparticles/react', '@tsparticles/slim', '@tsparticles/engine'],

          // Các thư viện nhỏ gom chung
          'vendor-misc': ['TagCloud', 'typewriter-effect', 'react-icons'],
        }
      }
    }
  },

  // Tối ưu dev server
  server: {
    warmup: {
      // Pre-bundle các module hay dùng để tăng tốc HMR
      clientFiles: ['./src/App.jsx', './src/index.css'],
    }
  }
})
