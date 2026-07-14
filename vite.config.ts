import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev
export default defineConfig({
  base: '/',
  plugins: [react()],
  publicDir: 'public/',
  build: {
    outDir: 'dist', // 👈 Revert this back to 'dist' so Hostinger finds the folder
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
