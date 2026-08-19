// Shared helpers for `Accept: text/markdown` content negotiation.
// Used by the production server (server.js) and the dev middleware (vite.config.ts)
// so both surfaces negotiate identically.

const MARKDOWN_TYPE = 'text/markdown';

function parseAccept(header) {
  return header
    .split(',')
    .map((part) => {
      const [type, ...params] = part.trim().split(';');
      const q = params
        .map((param) => param.trim())
        .find((param) => param.startsWith('q='))
        ?.slice(2);
      return { type: type.trim().toLowerCase(), quality: q === undefined ? 1 : Number.parseFloat(q) };
    })
    .filter((entry) => entry.type);
}

// True only when the client explicitly asks for markdown. A wildcard `*/*` (what
// browsers send) must not match, otherwise HTML would stop being the default.
export function wantsMarkdown(acceptHeader) {
  if (!acceptHeader) {
    return false;
  }
  return parseAccept(acceptHeader).some(
    (entry) => entry.type === MARKDOWN_TYPE && (Number.isNaN(entry.quality) || entry.quality > 0),
  );
}

function pathnameOf(url) {
  return url.split('?')[0].split('#')[0];
}

// Only SPA document routes are negotiable. Anything with a file extension is a real
// asset (/favicon.ico, /assets/index.js, /llms.txt) and must be served as-is.
export function isDocumentRequest(url) {
  return !/\.[^/]+$/.test(pathnameOf(url));
}

// Maps a request URL to the markdown key used by the generated `_markdown` output.
// `/` becomes `index`, and the SPA catch-all route is mirrored by falling back to
// `index` for unknown paths so markdown and HTML describe the same page.
export function routeToMarkdownKey(url) {
  const trimmed = pathnameOf(url).replace(/^\/+/, '').replace(/\/+$/, '');
  return trimmed === '' ? 'index' : trimmed;
}

// If the request path ends in `.md` and the rest matches a known markdown route,
// strip the extension and return the key; otherwise return null (not an .md route).
// Accepts a Set/Map of known keys so server and dev plugin can pass their route map.
export function mdUrlToKey(url, knownKeys) {
  const path = pathnameOf(url);
  if (!path.endsWith('.md')) {
    return null;
  }
  // Strip leading slash and trailing .md
  const withoutExt = path.replace(/^\/+/, '').replace(/\.md$/, '');
  // /index.md → 'index'
  const key = withoutExt === '' ? 'index' : withoutExt;
  if (knownKeys.has(key)) {
    return key;
  }
  return null;
}

// Rough token estimate; the spec asks for `x-markdown-tokens` "if available" and we
// have no tokenizer in the runtime dependency set.
export function estimateTokens(markdown) {
  return Math.max(1, Math.ceil(markdown.length / 4));
}

export function sendMarkdown(res, markdown) {
  const body = Buffer.from(markdown, 'utf8');
  res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
  res.setHeader('Content-Length', body.byteLength);
  res.setHeader('x-markdown-tokens', String(estimateTokens(markdown)));
  res.setHeader('Vary', 'Accept, Accept-Encoding');
  res.end(body);
}
