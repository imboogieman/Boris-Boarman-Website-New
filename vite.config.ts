import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Boris-Boarman-Website-New/', // Match your GitHub repository name exactly
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
