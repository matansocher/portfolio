// Production server. Serves the Vite build exactly like `sirv-cli --single` did,
// with three additions: requests that explicitly ask for `Accept: text/markdown` get
// the pre-generated markdown for that route instead of the SPA shell, HTML responses
// carry RFC 8288 `Link` headers pointing agents at /llms.txt, and the SPA shell is
// served with per-route Open Graph tags so chat clients and crawlers -- which never
// run the JavaScript that would set them -- get a correct link preview.

import { createServer } from 'node:http';
import { readFile, readdir } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL, URL } from 'node:url';
import { createBrotliCompress, createGzip } from 'node:zlib';
import { Readable } from 'node:stream';
import sirv from 'sirv';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { LINK_HEADER } from './scripts/link-headers.mjs';
import { applySecurityHeaders } from './scripts/security-headers.mjs';
import {
  isDocumentRequest,
  mdUrlToKey,
  routeToMarkdownKey,
  sendMarkdown,
  wantsMarkdown,
} from './scripts/markdown-negotiation.mjs';
import { injectSocialTags } from './scripts/social-tags.mjs';
import { buildMcpServer } from './scripts/mcp-server.mjs';

const PORT = Number(process.env.PORT) || 3000;

// The legacy Heroku platform host still resolves (Heroku keeps serving it), so requests
// that arrive on it are 301'd to the canonical custom domain to consolidate SEO authority
// and avoid duplicate content. Set CANONICAL_HOST='' to disable, or override either value.
const LEGACY_HOST = process.env.LEGACY_HOST ?? 'dkl-portfolio.herokuapp.com';
const CANONICAL_HOST = process.env.CANONICAL_HOST ?? 'dekelnissim.com';

const BUILD_DIR = fileURLToPath(new URL('./build/', import.meta.url));
const BUILD_URL = new URL('./build/', import.meta.url);
const MARKDOWN_DIR = new URL('./build/_markdown/', import.meta.url);
const PRERENDER_DIR = new URL('./build/_prerender/', import.meta.url);
const ARTICLES_DIR = new URL('./src/content/articles/', import.meta.url);

// Read once at boot: the shell and the metadata are build artifacts and cannot change
// while the process is alive.
const [shell, socialMetadata] = await Promise.all([
  readFile(new URL('index.html', BUILD_URL), 'utf8'),
  readFile(new URL('_social-metadata.json', BUILD_URL), 'utf8').then(JSON.parse),
]);

// Build the known-route set from the metadata map so 404 detection stays in sync with
// the sitemap and OG data automatically. The 'index' key maps to '/'.
const KNOWN_ROUTE_KEYS = new Set(Object.keys(socialMetadata));

// Load article metadata from the source tree for the MCP server.
// Node 24 strips TypeScript type annotations on import so meta.ts is directly importable.
const MONTHS_EN = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
async function loadArticleMeta() {
  const entries = await readdir(ARTICLES_DIR, { withFileTypes: true });
  const results = await Promise.all(
    entries
      .filter((e) => e.isDirectory())
      .map(async (entry) => {
        const folder = new URL(`${entry.name}/`, ARTICLES_DIR);
        const meta = (await import(pathToFileURL(fileURLToPath(new URL('meta.ts', folder))).href)).default;
        const en = await readFile(new URL('en.md', folder), 'utf8');
        const wordCount = en.trim().split(/\s+/).filter(Boolean).length;
        const readingTime = `${Math.max(1, Math.round(wordCount / 200))} min read`;
        const [, month, year] = meta.date.split('-').map(Number);
        const displayDate = `${MONTHS_EN[month - 1]} ${year}`;
        return {
          slug: meta.slug,
          title: meta.en.title,
          excerpt: meta.en.excerpt,
          tags: meta.tags,
          displayDate,
          readingTime,
        };
      }),
  );
  return results;
}

const mcpArticles = await loadArticleMeta();

// Absolute origin for og:url and relative image paths. Heroku terminates TLS at the
// router, so x-forwarded-proto is the only way to know the public scheme; a direct
// connection is only encrypted if the socket says so.
function originOf(req) {
  const host = req.headers['x-forwarded-host'] ?? req.headers.host;
  if (!host) {
    return null;
  }
  const forwarded = req.headers['x-forwarded-proto'];
  const proto = forwarded ?? (req.socket.encrypted ? 'https' : 'http');
  return `${String(proto).split(',')[0]}://${String(host).split(',')[0]}`;
}

// If the request arrived on the legacy Heroku host, return the canonical URL to 301 to;
// otherwise null. The custom domain and localhost pass through untouched. Uses the same
// x-forwarded-proto/host discipline as originOf since Heroku terminates TLS at its router.
function legacyRedirectLocation(req) {
  if (!CANONICAL_HOST || !LEGACY_HOST) {
    return null;
  }
  const rawHost = req.headers['x-forwarded-host'] ?? req.headers.host ?? '';
  const host = String(rawHost).split(',')[0].split(':')[0].trim().toLowerCase();
  if (host !== LEGACY_HOST) {
    return null;
  }
  return `https://${CANONICAL_HOST}${req.url ?? '/'}`;
}

// Rewrites the build-time base URL to the host actually serving the request, so
// previews stay correct behind a custom domain or when testing on localhost. Image
// paths need no rewrite: relative ones get the origin prepended at render time, and
// CDN ones must keep their own host.
function localize(metadata, origin) {
  if (!origin || !metadata) {
    return metadata;
  }
  return { ...metadata, url: metadata.url.replace(/^https?:\/\/[^/]+/, origin) };
}

// Route keys come from the request URL, so the resolved path must be confined to
// the markdown directory - otherwise `/../../secret` would read arbitrary .md files.
async function readMarkdown(key) {
  const target = new URL(`${key}.md`, MARKDOWN_DIR);
  if (!target.href.startsWith(MARKDOWN_DIR.href)) {
    return null;
  }
  try {
    return await readFile(target, 'utf8');
  } catch {
    return null;
  }
}

// Same path-confinement discipline as readMarkdown above, applied to the prerendered
// HTML fragments instead. Content comes from this repo's own markdown, so injecting
// it unescaped into the shell is safe as long as the resolved path stays inside
// PRERENDER_DIR.
async function readPrerendered(key) {
  const target = new URL(`${key}.html`, PRERENDER_DIR);
  if (!target.href.startsWith(PRERENDER_DIR.href)) {
    return null;
  }
  try {
    return await readFile(target, 'utf8');
  } catch {
    return null;
  }
}

// Sends a response body with optional brotli or gzip encoding based on Accept-Encoding.
// Buffer-in, stream-out: the compressed body is written to res.
function sendCompressed(req, res, body, contentType) {
  const ae = req.headers['accept-encoding'] ?? '';
  res.setHeader('Content-Type', contentType);
  res.setHeader('Vary', 'Accept, Accept-Encoding');
  if (ae.includes('br')) {
    res.setHeader('Content-Encoding', 'br');
    Readable.from(body).pipe(createBrotliCompress()).pipe(res);
  } else if (ae.includes('gzip')) {
    res.setHeader('Content-Encoding', 'gzip');
    Readable.from(body).pipe(createGzip()).pipe(res);
  } else {
    res.setHeader('Content-Length', body.byteLength);
    res.end(body);
  }
}

async function sendShell(req, res, key, status = 200) {
  const origin = originOf(req);
  // Unknown paths fall back to the home page's tags, mirroring the SPA catch-all route.
  const metadata = localize(socialMetadata[key] ?? socialMetadata.index, origin);
  let html = injectSocialTags(shell, metadata, origin ?? '');

  // Fill the empty SPA mount point with real markup so crawlers that only read
  // text/html (Bing, DuckDuckGo, most AI bots - unlike Googlebot, they don't
  // reliably execute JS) see actual content instead of an empty <div id="root">.
  // The app uses createRoot().render (not hydrateRoot), so React replaces this
  // markup wholesale on mount rather than reconciling against it - no hydration
  // mismatch, and no flash since the replacement is the same synchronous paint
  // that would otherwise have rendered into an empty div.
  const prerendered = (await readPrerendered(key)) ?? (await readPrerendered('index'));
  if (prerendered) {
    html = html.replace('<div id="root"></div>', `<div id="root">${prerendered}</div>`);
  }

  const body = Buffer.from(html, 'utf8');

  res.statusCode = status;
  // The shell is rebuilt on every deploy and references hashed assets, so it must not
  // be cached; a stale shell would point at assets that no longer exist.
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Link', LINK_HEADER);
  sendCompressed(req, res, body, 'text/html; charset=utf-8');
}

// Hashed asset paths look like /assets/index-AbCd1234.js - the hash guarantees
// content never changes for a given URL, so an immutable long max-age is safe.
// Deploy-time files (sitemap, llms.txt, robots.txt, manifest) change each deploy
// but carry no hash, so they get no-cache to avoid serving stale content.
const HASHED_ASSET_RE = /^\/assets\/[^/]+-[A-Za-z0-9_]{8,}\.[^/]+$/;
const NO_CACHE_RE = /\/(sitemap\.xml|llms\.txt|robots\.txt|manifest\.json|feed\.xml)$/;

// Only assets reach sirv now, so no Vary/Link handling is needed in setHeaders.
const assets = sirv(BUILD_DIR, {
  gzip: true,
  brotli: true,
  setHeaders(res, pathname) {
    if (HASHED_ASSET_RE.test(pathname)) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    } else if (NO_CACHE_RE.test(pathname)) {
      res.setHeader('Cache-Control', 'no-cache');
    }
  },
});

createServer(async (req, res) => {
  const url = req.url ?? '/';
  const pathname = url.split('?')[0];

  // Baseline security headers on every response (documents, markdown, /mcp, assets, and
  // redirects). Set before any branching so no early return can skip them.
  applySecurityHeaders(res);

  // Consolidate SEO onto the canonical domain: any request that reaches the legacy
  // Heroku host is permanently redirected to the same path on the custom domain.
  // Runs first so it applies uniformly to documents, .md URLs, /mcp, and assets.
  const legacyLocation = legacyRedirectLocation(req);
  if (legacyLocation) {
    res.statusCode = 301;
    res.setHeader('Location', legacyLocation);
    res.setHeader('Cache-Control', 'no-cache');
    res.end();
    return;
  }

  // MCP endpoint: handle POST/GET/DELETE on /mcp using stateless StreamableHTTP.
  // Must come before isDocumentRequest so /mcp never falls through to the shell.
  if (pathname === '/mcp') {
    const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });
    const mcpServer = buildMcpServer({ readMarkdown, articles: mcpArticles });
    await mcpServer.connect(transport);
    await transport.handleRequest(req, res);
    return;
  }

  // Handle explicit .md URLs (e.g. /salaries.md, /articles/slug.md) before the
  // isDocumentRequest check, which would otherwise treat them as static assets.
  // Keys are validated against the known set - never derived from user-controlled paths.
  const mdKey = mdUrlToKey(url, KNOWN_ROUTE_KEYS);
  if (mdKey !== null) {
    // Known .md route: serve markdown with 200.
    const markdown = await readMarkdown(mdKey);
    if (markdown) {
      res.setHeader('Link', LINK_HEADER);
      sendMarkdown(res, markdown);
      return;
    }
  } else if (pathname.endsWith('.md') && !pathname.startsWith('/.well-known/')) {
    // .md extension on an unknown SPA route: 404 rather than falling through to sirv.
    // Paths under /.well-known/ are real static files (e.g. agent-skills SKILL.md)
    // and must reach sirv - only exclude the synthetic SPA-markdown namespace here.
    res.statusCode = 404;
    res.end('Not found');
    return;
  }

  if (isDocumentRequest(url)) {
    const key = routeToMarkdownKey(url);
    const isKnownRoute = KNOWN_ROUTE_KEYS.has(key);

    if (wantsMarkdown(req.headers.accept)) {
      const markdown = (await readMarkdown(key)) ?? (isKnownRoute ? null : await readMarkdown('index'));
      if (markdown) {
        res.statusCode = isKnownRoute ? 200 : 404;
        res.setHeader('Link', LINK_HEADER);
        sendMarkdown(res, markdown);
        return;
      }
    }

    await sendShell(req, res, key, isKnownRoute ? 200 : 404);
    return;
  }

  assets(req, res, () => {
    res.statusCode = 404;
    res.end('Not found');
  });
}).listen(PORT, () => {
  console.log(`Serving build on http://localhost:${PORT}`);
});
