// PRODUCTION
/*
import { defineConfig } from "vite";
import react from '@vitejs/plugin-react-swc'

export default defineConfig(() => {
 return {
   plugins: [react()],
   server: {
     
     port: 3000,
     host: true,
     watch: {
      usePolling: true,
     },
     esbuild: {
      target: "esnext",
      platform: "linux",
    },
  }
 };
});
*/

/// <reference types="vitest" />
/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'; // Import path module

export default defineConfig({
  plugins: [react()],
  server: {
	port: 3000,
    proxy: {
      '/api': {
        target: 'http://spvending-api-container:8080', // Your actual API server
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.ts', // or path to your setup file
    css: true, // if you want to process CSS during tests
    // reporters: ['verbose', '@vitest/ui'], // Temporarily comment out @vitest/ui
    reporters: ['verbose'], // Use verbose reporter, can add 'html' for html report
    coverage: {
      provider: 'v8', // or 'istanbul'
      reporter: ['text', 'json', 'html'], // Ensure 'html' is included for UI viewing if needed
    },
  },
  resolve: {
    alias: {
      // This helps Vitest resolve react-router-dom correctly, especially if it's a peer dependency or linked.
      'react-router-dom': path.resolve(__dirname, 'node_modules/react-router-dom'),
    },
  },
});
