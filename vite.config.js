import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    visualizer({ open: false, gzipSize: true, brotliSize: true }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-router-dom') || id.includes('@remix-run')) {
              return 'vendor-router';
            }
            if (id.includes('recharts')) {
              return 'vendor-charts';
            }
            if (id.includes('gsap')) {
              return 'vendor-gsap';
            }
            if (id.includes('@reduxjs/toolkit') || id.includes('react-redux')) {
              return 'vendor-redux';
            }
            if (id.includes('react-helmet-async')) {
              return 'vendor-helmet';
            }
            if (id.includes('lenis')) {
              return 'vendor-lenis';
            }
            return 'vendor';
          }
        },
      },
    },
    chunkSizeWarningLimit: 500,
    modulePreload: { polyfill: true },
    cssMinify: 'lightningcss',
  },
  // Prefetch lazy-loaded chunks on idle
  esbuild: {
    legalComments: 'none',
  },
});
