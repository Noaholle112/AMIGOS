import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // Relative base so the built app works under any subpath
  // (e.g. GitHub Pages: https://<user>.github.io/<repo>/).
  base: './',
  plugins: [react()],
})
