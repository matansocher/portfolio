// Production server. Serves the Vite build exactly like `sirv-cli --single` did,
// with two additions: requests that explicitly ask for `Accept: text/markdown` get
// the pre-generated markdown for that route instead of the SPA shell, and HTML
// responses carry RFC 8288 `Link` headers pointing agents at /llms.txt.

import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath, URL } from 'node:url';
import sirv from 'sirv';
import { LINK_HEADER } from './scripts/link-headers.mjs';
import { isDocumentRequest, routeToMarkdownKey, sendMarkdown, wantsMarkdown } from './scripts/markdown-negotiation.mjs';

const PORT = Number(process.env.PORT) || 3000;
const BUILD_DIR = fileURLToPath(new URL('./build/', import.meta.url));
const MARKDOWN_DIR = new URL('./build/_markdown/', import.meta.url);

// `setHeaders` runs after sirv sets its own Vary, so merge rather than replace.
// Only HTML documents are content-negotiated; tagging static assets would hurt caching.
const assets = sirv(BUILD_DIR, {
  single: true,
  gzip: true,
  brotli: true,
  setHeaders(res, pathname) {
    if (!isDocumentRequest(pathname)) {
      return;
    }
    const existing = res.getHeader('Vary');
    res.setHeader('Vary', existing ? `${existing}, Accept` : 'Accept');
    res.setHeader('Link', LINK_HEADER);
  },
});

// Route keys come from the request URL, so the resolved path must be confined to
// the markdown directory — otherwise `/../../secret` would read arbitrary .md files.
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

createServer(async (req, res) => {
  const url = req.url ?? '/';

  if (isDocumentRequest(url) && wantsMarkdown(req.headers.accept)) {
    const markdown = (await readMarkdown(routeToMarkdownKey(url))) ?? (await readMarkdown('index'));
    if (markdown) {
      res.setHeader('Link', LINK_HEADER);
      sendMarkdown(res, markdown);
      return;
    }
  }

  assets(req, res, () => {
    res.statusCode = 404;
    res.end('Not found');
  });
}).listen(PORT, () => {
  console.log(`Serving build on http://localhost:${PORT}`);
});
