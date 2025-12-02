import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/workshops/react-stacked-menu/",
  plugins: [react()],
})
