import { defineConfig, type Plugin, type PreviewServer, type ViteDevServer } from 'vite';
import react from '@vitejs/plugin-react';
import { compression } from 'vite-plugin-compression2';
import { fileURLToPath, URL } from 'node:url';
import { applyLinkHeader } from './scripts/link-headers.mjs';
import { buildLlmsFullTxt, buildLlmsTxt, buildMarkdownRoutes } from './scripts/markdown-content.mjs';
import {
  isDocumentRequest,
  mdUrlToKey,
  routeToMarkdownKey,
  sendMarkdown,
  wantsMarkdown,
} from './scripts/markdown-negotiation.mjs';
import { buildSocialMetadata } from './scripts/social-metadata.mjs';
import { injectSocialTags } from './scripts/social-tags.mjs';

// Mirrors the RFC 8288 Link headers that server.js sends in production.
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

// Mirrors the production markdown negotiation (see server.js) during `npm run dev`,
// reading straight from src/content so edits show up without a rebuild.
function markdownForAgents(): Plugin {
  return {
    name: 'markdown-for-agents',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url ?? '/';
        const path = url.split('?')[0];

        if (path === '/llms.txt') {
          const routes = await buildMarkdownRoutes();
          res.setHeader('Content-Type', 'text/plain; charset=utf-8');
          res.end(buildLlmsTxt(routes));
          return;
        }

        if (path === '/llms-full.txt') {
          const routes = await buildMarkdownRoutes();
          res.setHeader('Content-Type', 'text/plain; charset=utf-8');
          res.end(buildLlmsFullTxt(routes));
          return;
        }

        // Handle explicit .md URLs before isDocumentRequest, which treats them as assets.
        const routes = await buildMarkdownRoutes();
        const mdKey = mdUrlToKey(url, routes);
        if (mdKey !== null) {
          const markdown = routes.get(mdKey);
          if (markdown) {
            res.setHeader('Link', '');
            sendMarkdown(res, markdown);
            return;
          }
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

// Mirrors the per-route Open Graph injection that server.js does in production, so
// link previews can be checked with `npm run dev` instead of only after a deploy.
function socialTags(): Plugin {
  return {
    name: 'social-tags',
    apply: 'serve',
    transformIndexHtml: {
      order: 'post',
      async handler(html, ctx) {
        const origin = ctx.server?.config.server.origin ?? '';
        const metadata = await buildSocialMetadata();
        const key = routeToMarkdownKey(ctx.originalUrl ?? ctx.path ?? '/');
        return injectSocialTags(html, metadata.get(key) ?? metadata.get('index'), origin);
      },
    },
  };
}

// Precompresses text assets (js, css, html, svg, json, xml, txt, md) for both
// brotli and gzip so sirv can serve them without runtime CPU overhead.
const TEXT_ASSET_RE = /\.(js|css|html|svg|json|xml|txt|md)$/;

export default defineConfig({
  plugins: [
    react(),
    linkHeaders(),
    markdownForAgents(),
    socialTags(),
    compression({ algorithms: ['brotliCompress'], include: TEXT_ASSET_RE }),
    compression({ algorithms: ['gzip'], include: TEXT_ASSET_RE }),
  ],
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
