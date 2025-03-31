  import { defineConfig } from 'vite'
  import react from '@vitejs/plugin-react'
  import tailwindcss from '@tailwindcss/vite'
  

  // https://vite.dev/config/
  export default defineConfig({
    plugins: [react(),tailwindcss()],
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:8001", // Your backend server
          // target: import.meta.env.VITE_CORS_ORIGIN , // Your backend server
          changeOrigin: true,
          secure: false, // Set to true if using HTTPS  
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  
  })
