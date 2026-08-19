// Writes the negotiated markdown documents into the Vite build output so the
// production server can serve them without reading src/ at runtime.

import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath, URL } from 'node:url';
import { buildLlmsFullTxt, buildLlmsTxt, buildMarkdownRoutes } from './markdown-content.mjs';
import { buildSocialMetadata } from './social-metadata.mjs';

const BUILD_DIR = new URL('../build/', import.meta.url);
const MARKDOWN_DIR = new URL('_markdown/', BUILD_DIR);

const routes = await buildMarkdownRoutes();

for (const [key, markdown] of routes) {
  const target = fileURLToPath(new URL(`${key}.md`, MARKDOWN_DIR));
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, markdown, 'utf8');
}

await writeFile(fileURLToPath(new URL('llms.txt', BUILD_DIR)), buildLlmsTxt(routes), 'utf8');
await writeFile(fileURLToPath(new URL('llms-full.txt', BUILD_DIR)), buildLlmsFullTxt(routes), 'utf8');

// Emitted as JSON so the server can inject per-route preview tags without importing
// anything under src/ at runtime.
const social = await buildSocialMetadata();
await writeFile(
  fileURLToPath(new URL('_social-metadata.json', BUILD_DIR)),
  JSON.stringify(Object.fromEntries(social), null, 2),
  'utf8',
);

console.log(`Generated ${routes.size} markdown documents, llms.txt, llms-full.txt, and ${social.size} social metadata entries`);
