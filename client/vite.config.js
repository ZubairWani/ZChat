// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import path from "path"

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
//   server: {
//     proxy: {
//       '/api': {
//         target: 'http://localhost:4000', // Your backend server address
//         changeOrigin: true,
//       }
//     }
//   }
// })




import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
      // Add WebSocket proxy configuration
      '/socket.io': {
        target: 'ws://localhost:4000',
        ws: true,
        changeOrigin: true
      }
    }
  }
})