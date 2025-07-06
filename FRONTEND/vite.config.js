import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  server:{
    proxy:{
      "/create" : "http://localhost:3000",
      "/best" : "http://localhost:3000",
      "/created" : "http://localhost:3000"
    }
  },
  plugins: [tailwindcss(),react()],
})
