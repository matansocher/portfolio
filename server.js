// Production server. Serves the Vite build exactly like `sirv-cli --single` did,
// with three additions: requests that explicitly ask for `Accept: text/markdown` get
// the pre-generated markdown for that route instead of the SPA shell, HTML responses
// carry RFC 8288 `Link` headers pointing agents at /llms.txt, and the SPA shell is
// served with per-route Open Graph tags so chat clients and crawlers -- which never
// run the JavaScript that would set them -- get a correct link preview.

import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath, URL } from 'node:url';
import sirv from 'sirv';
import { LINK_HEADER } from './scripts/link-headers.mjs';
import { isDocumentRequest, routeToMarkdownKey, sendMarkdown, wantsMarkdown } from './scripts/markdown-negotiation.mjs';
import { injectSocialTags } from './scripts/social-tags.mjs';

const PORT = Number(process.env.PORT) || 3000;
const BUILD_DIR = fileURLToPath(new URL('./build/', import.meta.url));
const BUILD_URL = new URL('./build/', import.meta.url);
const MARKDOWN_DIR = new URL('./build/_markdown/', import.meta.url);

// Read once at boot: the shell and the metadata are build artifacts and cannot change
// while the process is alive.
const [shell, socialMetadata] = await Promise.all([
  readFile(new URL('index.html', BUILD_URL), 'utf8'),
  readFile(new URL('_social-metadata.json', BUILD_URL), 'utf8').then(JSON.parse),
]);

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

function sendShell(req, res, key) {
  const origin = originOf(req);
  // Unknown paths fall back to the home page's tags, mirroring the SPA catch-all route.
  const metadata = localize(socialMetadata[key] ?? socialMetadata.index, origin);
  const body = Buffer.from(injectSocialTags(shell, metadata, origin ?? ''), 'utf8');

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Content-Length', body.byteLength);
  res.setHeader('Vary', 'Accept');
  res.setHeader('Link', LINK_HEADER);
  // The shell is rebuilt on every deploy and references hashed assets, so it must not
  // be cached; a stale shell would point at assets that no longer exist.
  res.setHeader('Cache-Control', 'no-cache');
  res.end(body);
}

// Only assets reach sirv now, so no Vary/Link handling is needed in setHeaders.
const assets = sirv(BUILD_DIR, { gzip: true, brotli: true });

createServer(async (req, res) => {
  const url = req.url ?? '/';

  if (isDocumentRequest(url)) {
    const key = routeToMarkdownKey(url);

    if (wantsMarkdown(req.headers.accept)) {
      const markdown = (await readMarkdown(key)) ?? (await readMarkdown('index'));
      if (markdown) {
        res.setHeader('Link', LINK_HEADER);
        sendMarkdown(res, markdown);
        return;
      }
    }

    sendShell(req, res, key);
    return;
  }

  assets(req, res, () => {
    res.statusCode = 404;
    res.end('Not found');
  });
}).listen(PORT, () => {
  console.log(`Serving build on http://localhost:${PORT}`);
});
