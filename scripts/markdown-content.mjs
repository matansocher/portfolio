// Builds the route -> markdown map that backs `Accept: text/markdown` responses.
// Reads the same sources the React app renders from: hand-authored page copy in
// src/content/pages and the article markdown in src/content/articles.

import { readdir, readFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL, URL } from 'node:url';

const PAGES_DIR = new URL('../src/content/pages/', import.meta.url);
const ARTICLES_DIR = new URL('../src/content/articles/', import.meta.url);

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

function displayDate(date) {
  const [, month, year] = date.split('-').map(Number);
  return `${MONTHS_EN[month - 1]} ${year}`;
}

function dateValue(date) {
  const [day, month, year] = date.split('-').map(Number);
  return new Date(year, month - 1, day).getTime();
}

function readingTime(markdown) {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

async function readArticles() {
  const folders = await readdir(ARTICLES_DIR, { withFileTypes: true });
  const articles = await Promise.all(
    folders
      .filter((entry) => entry.isDirectory())
      .map(async (entry) => {
        const folder = new URL(`${entry.name}/`, ARTICLES_DIR);
        // Node 24 strips types on import, so meta.ts is read directly rather than duplicated.
        const meta = (await import(pathToFileURL(fileURLToPath(new URL('meta.ts', folder))).href)).default;
        const markdown = await readFile(new URL('en.md', folder), 'utf8');
        return { meta, markdown };
      }),
  );

  return articles.sort((a, b) => dateValue(b.meta.date) - dateValue(a.meta.date));
}

function articleDocument({ meta, markdown }) {
  const header = [
    `# ${meta.en.title}`,
    '',
    `${displayDate(meta.date)} • ${readingTime(markdown)}`,
    '',
    `Tags: ${meta.tags.join(', ')}`,
    '',
    '---',
    '',
  ].join('\n');
  return `${header}${markdown.trim()}\n`;
}

function articlesIndexDocument(intro, articles) {
  const list = articles
    .map(({ meta, markdown }) =>
      [
        `## [${meta.en.title}](/articles/${meta.slug})`,
        '',
        `${displayDate(meta.date)} • ${readingTime(markdown)}`,
        '',
        meta.en.excerpt,
        '',
        `Tags: ${meta.tags.join(', ')}`,
      ].join('\n'),
    )
    .join('\n\n');
  return `${intro.trim()}\n\n${list}\n`;
}

/**
 * @returns {Promise<Map<string, string>>} markdown keyed by route key ('index', 'about', 'articles/<slug>', ...)
 */
export async function buildMarkdownRoutes() {
  const routes = new Map();

  const pageFiles = (await readdir(PAGES_DIR)).filter((name) => name.endsWith('.md'));
  for (const name of pageFiles) {
    routes.set(name.replace(/\.md$/, ''), await readFile(new URL(name, PAGES_DIR), 'utf8'));
  }

  const articles = await readArticles();
  for (const article of articles) {
    routes.set(`articles/${article.meta.slug}`, articleDocument(article));
  }

  const articlesIntro = routes.get('articles');
  if (articlesIntro) {
    routes.set('articles', articlesIndexDocument(articlesIntro, articles));
  }

  return routes;
}

export function buildLlmsTxt(routes) {
  const lines = [
    '# Dekel Nissim',
    '',
    '> Product Designer & UX Researcher specializing in UX for complex systems — internal tools, dashboards, and mobile platforms.',
    '',
    'Every page on this site is available as markdown by sending `Accept: text/markdown`.',
    '',
    '## Pages',
    '',
    '- [Home](/): Selected work and client testimonials',
    '- [About](/about): Background, services, and design approach',
    '- [Articles](/articles): Writing on UX research and product design',
    '- [Business Card](/business-card): Freelance services and contact',
    '',
    '## Case Studies',
    '',
    '- [Salary Additions](/salaries): Automating salary calculations for a municipal HR department',
    '- [Marketer](/marketer): Design system for an early-stage marketing platform',
    '- [Myco](/myco): Two mobile apps for community events and event producers',
    '- [Employee Onboarding Page](/employees): A flexible onboarding template for a global workforce',
    '',
    '## Articles',
    '',
  ];

  for (const key of routes.keys()) {
    if (key.startsWith('articles/')) {
      const title = routes.get(key).split('\n')[0].replace(/^#\s*/, '');
      lines.push(`- [${title}](/${key})`);
    }
  }

  return `${lines.join('\n')}\n`;
}
