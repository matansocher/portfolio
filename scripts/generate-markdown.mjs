// Writes the negotiated markdown documents into the Vite build output so the
// production server can serve them without reading src/ at runtime.

import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath, URL } from 'node:url';
import { buildLlmsTxt, buildMarkdownRoutes } from './markdown-content.mjs';

const BUILD_DIR = new URL('../build/', import.meta.url);
const MARKDOWN_DIR = new URL('_markdown/', BUILD_DIR);

const routes = await buildMarkdownRoutes();

for (const [key, markdown] of routes) {
  const target = fileURLToPath(new URL(`${key}.md`, MARKDOWN_DIR));
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, markdown, 'utf8');
}

await writeFile(fileURLToPath(new URL('llms.txt', BUILD_DIR)), buildLlmsTxt(routes), 'utf8');

console.log(`Generated ${routes.size} markdown documents and llms.txt`);
