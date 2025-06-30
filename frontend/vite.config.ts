/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // <- ¡Esto es necesario!
    environment: 'jsdom',
    coverage: {
      reporter: ['text', 'html'],
    },
  },
});
