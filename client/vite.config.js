// C:\Users\caror\Regutech\client\vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // AÑADE ESTA SECCIÓN PARA CONFIGURAR ESBUILD
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx?$/, // Regex para incluir archivos .jsx y .js en src/
    exclude: [], // No excluyas nada por defecto
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx', // Esto le dice a esbuild que trate los archivos .js como jsx
      },
    },
  },
});