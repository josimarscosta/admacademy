import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  root: __dirname, // Diretório raiz do projeto
  build: {
    outDir: 'dist',
  },
})
