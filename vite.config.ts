import { defineConfig, type Plugin, type ViteDevServer, type PreviewServer } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { applyLinkHeader } from './linkHeaders.js';

// Mirrors the Link headers that server.js sends in production.
function linkHeaders(): Plugin {
  const use = (server: ViteDevServer | PreviewServer) => {
    server.middlewares.use((req, res, next) => {
      applyLinkHeader(res, req.url);
      next();
    });
  };

  return {
    name: 'link-headers',
    configureServer: use,
    configurePreviewServer: use,
  };
}

export default defineConfig({
  plugins: [react(), linkHeaders()],
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('.', import.meta.url)),
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'build',
  },
});
