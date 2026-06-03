import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  publicDir: 'public_assets',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
