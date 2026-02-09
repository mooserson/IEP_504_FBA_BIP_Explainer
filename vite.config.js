import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Use /IEP_504_FBA_BIP_Explainer/ for GitHub Pages, / for Render and local
  base: process.env.GITHUB_PAGES === 'true' ? '/IEP_504_FBA_BIP_Explainer/' : '/',
})
