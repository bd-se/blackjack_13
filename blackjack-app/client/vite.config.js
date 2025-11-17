import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/start-game': 'http://localhost:3000',
      '/deal-user-card': 'http://localhost:3000',
      '/deal-dealer-card': 'http://localhost:3000',
    },
  },
});
