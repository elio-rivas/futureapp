export default defineConfig({
  base: './',
  plugins: [react()],
  publicDir: 'public_assets',
  build: {
    outDir: '.', // 👈 Dumps the index.html directly into the root folder
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
