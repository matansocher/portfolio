// Generates public/feed.xml — an RSS 2.0 feed of articles ordered by date (newest first).

import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ARTICLES_DIR = join(ROOT, 'src', 'content', 'articles');
const FEED_PATH = join(ROOT, 'public', 'feed.xml');

export const BASE_URL = 'https://dkl-portfolio.herokuapp.com';

function escapeXml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Article meta dates are stored as DD-MM-YYYY; RSS requires RFC 2822.
// Example: 21-08-2026 -> Wed, 21 Aug 2026 00:00:00 +0000
function toRfc2822(date) {
  const match = /^(\d{2})-(\d{2})-(\d{4})$/.exec(date);
  if (!match) return undefined;
  const [, day, month, year] = match.map(Number);
  const d = new Date(year, month - 1, day, 0, 0, 0, 0);
  return d.toUTCString();
}

// Compare dates for sorting (newest first).
function dateValue(date) {
  const [day, month, year] = date.split('-').map(Number);
  return new Date(year, month - 1, day).getTime();
}

export async function collectArticles(articlesDir = ARTICLES_DIR) {
  const entries = readdirSync(articlesDir, { withFileTypes: true }).filter((entry) => entry.isDirectory());

  const articles = await Promise.all(
    entries.map(async (entry) => {
      const metaPath = join(articlesDir, entry.name, 'meta.ts');
      // Node 24 strips types on import, so we read the file and extract values with regex.
      const metaContent = readFileSync(metaPath, 'utf8');
      const slug = /slug:\s*'([^']+)'/.exec(metaContent)?.[1] ?? entry.name;
      const date = /date:\s*'([^']+)'/.exec(metaContent)?.[1];
      const title = /en:\s*\{[^}]*title:\s*'([^']+)'/.exec(metaContent)?.[1] ?? '';
      const excerpt = /en:\s*\{[^}]*excerpt:\s*'([^']+)'/.exec(metaContent)?.[1] ?? '';

      return { slug, date, title, excerpt };
    }),
  );

  // Sort by date, newest first.
  return articles.sort((a, b) => dateValue(b.date) - dateValue(a.date));
}

export function buildRssFeed(articles) {
  const items = articles
    .map(({ slug, date, title, excerpt }) => {
      const link = `${BASE_URL}/articles/${slug}`;
      const pubDate = toRfc2822(date);

      return [
        '  <item>',
        `    <title>${escapeXml(title)}</title>`,
        `    <link>${escapeXml(link)}</link>`,
        `    <guid>${escapeXml(link)}</guid>`,
        pubDate ? `    <pubDate>${pubDate}</pubDate>` : '',
        `    <description>${escapeXml(excerpt)}</description>`,
        '  </item>',
      ]
        .filter(Boolean)
        .join('\n');
    })
    .join('\n');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    '  <channel>',
    '    <title>Dekel Nissim — Articles</title>',
    `    <link>${BASE_URL}</link>`,
    '    <description>Articles on Product Design, UX Research, and Building Better Products</description>',
    '    <language>en</language>',
    items,
    '  </channel>',
    '</rss>',
    '',
  ].join('\n');
}

// Main: generate the feed and write to public/feed.xml.
async function main() {
  const articles = await collectArticles();
  const feed = buildRssFeed(articles);
  writeFileSync(FEED_PATH, feed, 'utf8');
  console.log(`✓ RSS feed written to ${FEED_PATH}`);
}

await main();
