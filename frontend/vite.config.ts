import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { copyFileSync } from 'fs'

// Função para copiar o arquivo _redirects após o build
const copyRedirects = () => {
  return {
    name: 'copy-redirects',
    closeBundle() {
      try {
        copyFileSync('_redirects', 'dist/_redirects');
        console.log('_redirects file copied to dist/');
      } catch (err) {
        console.error('Failed to copy _redirects file:', err);
      }
    }
  }
}

export default defineConfig({
  plugins: [react(), copyRedirects()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
