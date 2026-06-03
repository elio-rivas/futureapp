import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // 1. Change to relative paths so it loads correctly on Hostinger's preview subdomains
  base: './', 
  
  plugins: [react()],
  
  // 2. Point to 'public_assets' if that is your primary folder, 
  // but ensure all global styles/assets are moved there!
  publicDir: 'public_assets', 
  
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});

