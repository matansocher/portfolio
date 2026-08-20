// Builds the route -> markdown map that backs `Accept: text/markdown` responses.
// Reads the same sources the React app renders from: hand-authored page copy in
// src/content/pages and the article markdown in src/content/articles.

import { readdir, readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { BASE_URL } from './generate-sitemap.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PAGES_DIR = join(ROOT, 'src', 'content', 'pages');
const ARTICLES_DIR = join(ROOT, 'src', 'content', 'articles');

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

const MONTHS_HE = [
  'ינואר',
  'פברואר',
  'מרץ',
  'אפריל',
  'מאי',
  'יוני',
  'יולי',
  'אוגוסט',
  'ספטמבר',
  'אוקטובר',
  'נובמבר',
  'דצמבר',
];

function displayDate(date, months = MONTHS_EN) {
  const [, month, year] = date.split('-').map(Number);
  return `${months[month - 1]} ${year}`;
}

function dateValue(date) {
  const [day, month, year] = date.split('-').map(Number);
  return new Date(year, month - 1, day).getTime();
}

function readingTime(markdown, language = 'en') {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return language === 'he' ? `${minutes} דקות קריאה` : `${minutes} min read`;
}

async function readArticles() {
  const folders = await readdir(ARTICLES_DIR, { withFileTypes: true });
  const articles = await Promise.all(
    folders
      .filter((entry) => entry.isDirectory())
      .map(async (entry) => {
        const folder = join(ARTICLES_DIR, entry.name);
        // Node 24 strips types on import, so meta.ts is read directly rather than duplicated.
        const meta = (await import(pathToFileURL(join(folder, 'meta.ts')).href)).default;
        const markdown = await readFile(join(folder, 'en.md'), 'utf8');
        const markdownHe = await readFile(join(folder, 'he.md'), 'utf8');
        return { meta, markdown, markdownHe };
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

function articleDocumentHe({ meta, markdownHe }) {
  const header = [
    `# ${meta.he.title}`,
    '',
    `${displayDate(meta.date, MONTHS_HE)} • ${readingTime(markdownHe, 'he')}`,
    '',
    `Tags: ${meta.tags.join(', ')}`,
    '',
    '---',
    '',
  ].join('\n');
  return `${header}${markdownHe.trim()}\n`;
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
    routes.set(name.replace(/\.md$/, ''), await readFile(join(PAGES_DIR, name), 'utf8'));
  }

  const articles = await readArticles();
  for (const article of articles) {
    routes.set(`articles/${article.meta.slug}`, articleDocument(article));
    routes.set(`he/articles/${article.meta.slug}`, articleDocumentHe(article));
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
    `- [Articles](${mdUrl('articles')}): Writing on UX research and product design, in English and Hebrew`,
    `- [Business Card](${mdUrl('business-card')}): Freelance services and contact form`,
    `- [FAQ](${mdUrl('faq')}): Answers to common questions about working with Dekel Nissim`,
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
    '- Articles are published in English and Hebrew. English lives at `/articles/<slug>`; Hebrew has its own crawlable URL at `/he/articles/<slug>`. Each URL declares `hreflang` alternates (en, he, x-default → English) and a self-referential canonical, so both languages can be indexed independently. The client-side toggle on the articles index switches card links between the two URL sets.',
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
