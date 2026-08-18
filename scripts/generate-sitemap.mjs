import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = join(dirname(fileURLToPath(import.meta.url)), '..');
const articlesDir = join(rootDir, 'src', 'content', 'articles');
const siteUrl = 'https://dkl-portfolio.herokuapp.com';

const staticPaths = ['/', '/about', '/articles', '/salaries', '/marketer', '/myco', '/employees', '/business-card'];

// meta.ts dates are dd-mm-yyyy; sitemap lastmod needs yyyy-mm-dd
function toIsoDate(date) {
  const [day, month, year] = date.split('-');
  return `${year}-${month}-${day}`;
}

function readArticles() {
  return readdirSync(articlesDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const meta = readFileSync(join(articlesDir, entry.name, 'meta.ts'), 'utf8');
      const slug = meta.match(/slug:\s*'([^']+)'/)?.[1] ?? entry.name;
      const date = meta.match(/date:\s*'([^']+)'/)?.[1];
      return { path: `/articles/${slug}`, lastmod: date ? toIsoDate(date) : undefined };
    })
    .sort((a, b) => a.path.localeCompare(b.path));
}

const urls = [...staticPaths.map((path) => ({ path })), ...readArticles()];

const body = urls
  .map(({ path, lastmod }) => {
    const lines = [`    <loc>${siteUrl}${path}</loc>`];
    if (lastmod) lines.push(`    <lastmod>${lastmod}</lastmod>`);
    return `  <url>\n${lines.join('\n')}\n  </url>`;
  })
  .join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;

writeFileSync(join(rootDir, 'public', 'sitemap.xml'), sitemap);
console.log(`Generated public/sitemap.xml with ${urls.length} urls`);
