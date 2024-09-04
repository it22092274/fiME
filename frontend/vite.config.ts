import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API requests to the backend server
      '/api': {
        target: 'http://localhost:5000/api', // Replace with your backend server URL
        changeOrigin: true,
        secure: false, // Set to true if your backend server uses HTTPS
        rewrite: (path) => path.replace(/^\/api/, ''), // Optionally rewrite the path
      },
    },
  },
});
