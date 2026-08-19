// Pings IndexNow (https://www.indexnow.org/documentation) with every URL in
// public/sitemap.xml so Bing, Seznam, Naver, Yandex, and other IndexNow-consuming
// engines re-crawl changed content after each deploy.
//
// Wired to Heroku's release phase (Procfile `release:` line). The release phase runs
// in the same slug as `web`, where devDependencies are pruned, so this script uses
// ONLY Node built-ins (global fetch requires Node >= 18; the app pins Node 24).
//
// A ping failure must never fail a deploy: on any error we log a warning and exit 0.

import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITEMAP_PATH = join(ROOT, 'public', 'sitemap.xml');

// Public by design: the IndexNow protocol requires the key to be served at
// https://<host>/<key>.txt so engines can verify ownership. Not a secret.
export const INDEXNOW_KEY = 'ccdf83f4414386ebc670740f27284d82';
export const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

// Extracts every <loc> URL from a sitemap XML string. Pure and unit-testable.
export function extractUrls(sitemapXml) {
  return [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, loc]) =>
    loc.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim(),
  );
}

// Builds the IndexNow POST payload per the spec. Pure and unit-testable.
export function buildPayload(urlList, key = INDEXNOW_KEY) {
  const host = new URL(urlList[0]).host;
  return {
    host,
    key,
    keyLocation: `https://${host}/${key}.txt`,
    urlList,
  };
}

// POSTs the payload to IndexNow. `fetchImpl` is injectable for tests.
export async function pingIndexNow(payload, { endpoint = INDEXNOW_ENDPOINT, fetchImpl = fetch } = {}) {
  const response = await fetchImpl(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  });
  return response.status;
}

async function main() {
  const dryRun = process.argv.includes('--dry-run');

  let urlList;
  try {
    urlList = extractUrls(readFileSync(SITEMAP_PATH, 'utf8'));
  } catch (error) {
    console.warn(`[indexnow] skipped: could not read sitemap (${error.message})`);
    return;
  }

  if (urlList.length === 0) {
    console.warn('[indexnow] skipped: sitemap contained no <loc> URLs');
    return;
  }

  const payload = buildPayload(urlList);

  if (dryRun) {
    console.log(JSON.stringify(payload, null, 2));
    return;
  }

  try {
    const status = await pingIndexNow(payload);
    if (status >= 200 && status < 300) {
      console.log(`[indexnow] pinged ${urlList.length} URLs (HTTP ${status})`);
    } else {
      console.warn(`[indexnow] ping returned HTTP ${status}`);
    }
  } catch (error) {
    console.warn(`[indexnow] ping failed: ${error.message}`);
  }
}

const isDirectRun = process.argv[1] === fileURLToPath(import.meta.url);

if (isDirectRun) {
  await main();
}
