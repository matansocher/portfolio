import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { buildLlmsTxt, buildMarkdownRoutes } from './scripts/markdown-content.mjs';
import { isDocumentRequest, routeToMarkdownKey, sendMarkdown, wantsMarkdown } from './scripts/markdown-negotiation.mjs';

// Mirrors the production markdown negotiation (see server.js) during `npm run dev`,
// reading straight from src/content so edits show up without a rebuild.
function markdownForAgents(): Plugin {
  return {
    name: 'markdown-for-agents',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url ?? '/';

        if (url.split('?')[0] === '/llms.txt') {
          const routes = await buildMarkdownRoutes();
          res.setHeader('Content-Type', 'text/plain; charset=utf-8');
          res.end(buildLlmsTxt(routes));
          return;
        }

        if (!isDocumentRequest(url)) {
          next();
          return;
        }

        res.setHeader('Vary', 'Accept');

        if (!wantsMarkdown(req.headers.accept)) {
          next();
          return;
        }

        const routes = await buildMarkdownRoutes();
        const markdown = routes.get(routeToMarkdownKey(url)) ?? routes.get('index');
        if (!markdown) {
          next();
          return;
        }

        sendMarkdown(res, markdown);
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), markdownForAgents()],
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
