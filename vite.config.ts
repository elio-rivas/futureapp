
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Future Foundations Education - Vite Configuration
export default defineConfig({
  // Use absolute asset paths so React Router deep links work
  // correctly in production on Hostinger.
  base: '/',

  plugins: [react()],

  publicDir: 'public/',

  build: {
    // Hostinger uses the dist directory as the build output.
    outDir: 'dist',
  },

  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
