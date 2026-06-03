import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev
export default defineConfig({
  base: './',
  plugins: [react()],
  publicDir: 'public_assets',
  build: {
    outDir: '.', // Keeps files in the root directory for Hostinger
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
