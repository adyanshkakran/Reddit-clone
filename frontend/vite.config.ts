import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // proxy: {
    //   '/api': {
    //     target: 'http://127.0.0.1:3000',
    //     changeOrigin: true,
    //     secure: false
    //   }
    // },
    watch:{
      usePolling: true
    },
    host: true,
    strictPort: true,
    port: 5173,
    hmr: {
      host: 'localhost',
      port: 5173
    }
  }
})