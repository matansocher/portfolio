// Generates public/sitemap.xml from the app's routes plus every article folder,
// and keeps the `Sitemap:` line in public/robots.txt pointing at it.

import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ARTICLES_DIR = join(ROOT, 'src', 'content', 'articles');
const SITEMAP_PATH = join(ROOT, 'public', 'sitemap.xml');
const ROBOTS_PATH = join(ROOT, 'public', 'robots.txt');

export const BASE_URL = 'https://dkl-portfolio.herokuapp.com';

// Mirrors the public routes declared in src/App.tsx.
export const STATIC_ROUTES = ['/', '/articles', '/salaries', '/marketer', '/myco', '/employees', '/business-card'];

function escapeXml(value) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function toIsoDate(date) {
  const match = /^(\d{2})-(\d{2})-(\d{4})$/.exec(date);
  if (!match) return undefined;
  const [, day, month, year] = match;
  return `${year}-${month}-${day}`;
}

// Derives lastmod date from git history. Returns ISO date (YYYY-MM-DD) or undefined if unavailable.
export function getGitLastmodDate(filePath, fallbackDate = new Date().toISOString().slice(0, 10)) {
  try {
    const date = execSync(`git log -1 --format=%cs -- "${filePath}"`, {
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
    }).trim();
    return date || fallbackDate;
  } catch {
    // git is unavailable or file has no history; use fallback
    return fallbackDate;
  }
}

export function collectArticles(articlesDir = ARTICLES_DIR) {
  return readdirSync(articlesDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const meta = readFileSync(join(articlesDir, entry.name, 'meta.ts'), 'utf8');
      const slug = /slug:\s*'([^']+)'/.exec(meta)?.[1] ?? entry.name;
      const date = /date:\s*'([^']+)'/.exec(meta)?.[1];
      return { slug, lastmod: date ? toIsoDate(date) : undefined };
    })
    .sort((a, b) => a.slug.localeCompare(b.slug));
}

export function buildSitemap(
  articles,
  today = new Date().toISOString().slice(0, 10),
  resolveStaticLastmod = getGitLastmodDate,
) {
  const urls = [
    ...STATIC_ROUTES.map((route) => {
      const contentFile = route === '/' ? 'src/content/pages/index.md' : `src/content/pages/${route.slice(1)}.md`;
      const lastmod = resolveStaticLastmod(contentFile, today);
      return { loc: route, lastmod };
    }),
    ...articles.map((article) => ({ loc: `/articles/${article.slug}`, lastmod: article.lastmod ?? today })),
  ];

  const entries = urls
    .map(({ loc, lastmod }) =>
      [
        '  <url>',
        `    <loc>${escapeXml(`${BASE_URL}${loc}`)}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        '  </url>',
      ].join('\n'),
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
}

// Idempotent: strips any existing Sitemap: line before appending the current one.
export function buildRobots(existing) {
  const withoutSitemap = existing
    .split('\n')
    .filter((line) => !line.trim().toLowerCase().startsWith('sitemap:'))
    .join('\n')
    .trimEnd();
  return `${withoutSitemap}\n\nSitemap: ${BASE_URL}/sitemap.xml\n`;
}

const isDirectRun = process.argv[1] === fileURLToPath(import.meta.url);

if (isDirectRun) {
  const articles = collectArticles();
  writeFileSync(SITEMAP_PATH, buildSitemap(articles));
  writeFileSync(ROBOTS_PATH, buildRobots(readFileSync(ROBOTS_PATH, 'utf8')));
  console.log(`sitemap.xml written with ${STATIC_ROUTES.length + articles.length} URLs`);
}
