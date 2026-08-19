// Builds the route -> markdown map that backs `Accept: text/markdown` responses.
// Reads the same sources the React app renders from: hand-authored page copy in
// src/content/pages and the article markdown in src/content/articles.

import { readdir, readFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL, URL } from 'node:url';
import { BASE_URL } from './generate-sitemap.mjs';

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

export function buildLlmsTxt(routes, baseUrl = BASE_URL) {
  const url = (path) => `${baseUrl}${path}`;
  // Route key → .md URL (index maps to /index.md for agents)
  const mdUrl = (key) => `${baseUrl}/${key === 'index' ? 'index' : key}.md`;

  const lines = [
    '# Dekel Nissim',
    '',
    '> Product Designer & UX Researcher specializing in UX for complex systems — internal tools, dashboards, and mobile platforms. Partners with startups, enterprises, and public-sector teams to turn messy problems into clear, human-centered products, backed by research rather than opinion.',
    '',
    'Services: UX research, product design, design systems, and product strategy. Contact: dklnsm@gmail.com',
    '',
    'Every page on this site is available as markdown at `<route>.md` (e.g. `/salaries.md`) or by sending `Accept: text/markdown` to the extensionless route.',
    '',
    '## Pages',
    '',
    `- [Home](${mdUrl('index')}): Selected work and client testimonials`,
    `- [About](${mdUrl('about')}): Background, services, and the Understand / Define / Design / Deliver process`,
    `- [Articles](${mdUrl('articles')}): Writing on UX research and product design, in English and Hebrew`,
    `- [Business Card](${mdUrl('business-card')}): Freelance services and contact form`,
    '',
    '## Case Studies',
    '',
    `- [Salary Additions](${mdUrl('salaries')}): Automating salary calculations and approvals for a municipal HR department`,
    `- [Marketer](${mdUrl('marketer')}): Design system for an early-stage marketing platform`,
    `- [Myco](${mdUrl('myco')}): Two mobile apps for community events and event producers`,
    `- [Employee Onboarding Page](${mdUrl('employees')}): A flexible onboarding template for a global workforce`,
    '',
    '## Articles',
    '',
  ];

  for (const key of routes.keys()) {
    if (key.startsWith('articles/')) {
      const title = routes.get(key).split('\n')[0].replace(/^#\s*/, '');
      lines.push(`- [${title}](${mdUrl(key)})`);
    }
  }

  lines.push(
    '',
    '## Notes',
    '',
    '- The site is a client-rendered single-page app; the HTML shell contains no content. Request `Accept: text/markdown` to read any page.',
    '- Articles are published in English and Hebrew, toggled client-side on the same URL. The markdown responses serve the English text.',
    '- There is no public API. The only backend endpoint is the contact form submission on a separate service.',
    `- Machine-readable index: ${url('/sitemap.xml')}. Crawler policy: ${url('/robots.txt')}.`,
    `- Full content of all pages concatenated: ${url('/llms-full.txt')}.`,
  );

  return `${lines.join('\n')}\n`;
}

const LLMS_FULL_SEPARATOR = '\n\n---\n\n';

export function buildLlmsFullTxt(routes, baseUrl = BASE_URL) {
  const header = buildLlmsTxt(routes, baseUrl);
  const sections = [];

  for (const [key, markdown] of routes) {
    const sectionHeader = `# Source: /${key === 'index' ? '' : key}\n\n`;
    sections.push(`${sectionHeader}${markdown.trim()}`);
  }

  return `${header}${LLMS_FULL_SEPARATOR}${sections.join(LLMS_FULL_SEPARATOR)}\n`;
}
