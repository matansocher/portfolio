// Builds the route -> social-preview metadata map behind the Open Graph and
// Twitter Card tags. Chat clients (Slack, Telegram, WhatsApp, iMessage, Discord)
// and crawlers do not execute JavaScript, so a client-rendered SPA has to have
// these tags present in the served HTML. The production server injects them per
// route from this map; see injectSocialTags in scripts/social-tags.mjs.

import { readdir, readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { BASE_URL } from './generate-sitemap.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PAGES_DIR = join(ROOT, 'src', 'content', 'pages');
const ARTICLES_DIR = join(ROOT, 'src', 'content', 'articles');

const SITE_NAME = 'Dekel Nissim';

// Fallback card for the pages that are not articles. 1999x1023 (~1.95:1), close
// enough to the 1.91:1 that Open Graph consumers lay out for.
export const DEFAULT_IMAGE = {
  path: '/og-image.png',
  width: 1999,
  height: 1023,
  alt: 'Dekel Nissim - Product design for complex products',
};

// Hand-written descriptions for the static pages. The page markdown leads with an
// H1 plus body copy that is too long for a preview card, so these are authored
// rather than extracted. This value feeds the <meta name="description"> tag.
const PAGE_DESCRIPTIONS = {
  index:
    'Product designer, UX strategist, and researcher helping product teams turn complex workflows, AI-assisted design processes, design systems, and product questions into clearer decisions.',
  articles: 'Writing on UX research and product design, in English and Hebrew.',
  'business-card': 'Freelance UX research and product design. Get in touch.',
  faq: 'Answers to common questions about working with Dekel Nissim - services, products, and how to get in touch.',
  salaries: 'Automating salary calculations and approvals for a municipal HR department.',
  marketer: 'Design system for an early-stage marketing platform.',
  myco: 'Two mobile apps for community events and event producers.',
  employees: 'A flexible onboarding template for a global workforce.',
};

// Shorter descriptions for the OG/Twitter preview card, where a long meta
// description reads poorly. Falls back to PAGE_DESCRIPTIONS when absent.
const PAGE_OG_DESCRIPTIONS = {
  index: 'UX strategy, research, AI-assisted workflows, and design systems for complex products.',
};

// Overrides for the meta/OG title where the page's markdown H1 makes a poor,
// long, or redundant title tag. The visible H1 stays as authored.
const PAGE_TITLES = {
  faq: 'FAQ',
};

function titleOf(markdown) {
  const heading = markdown.split('\n').find((line) => line.startsWith('# '));
  return heading ? heading.slice(2).trim() : SITE_NAME;
}

// `og:title` is rendered next to `og:site_name`, but the home page uses its full
// positioning line as the title so search results and previews read clearly.
function pageTitle(key, markdown) {
  if (key === 'index') return 'Dekel Nissim - Product Designer, UX Strategist & Researcher';
  return `${PAGE_TITLES[key] ?? titleOf(markdown)} - ${SITE_NAME}`;
}

function isoDate(date) {
  const [day, month, year] = date.split('-');
  return `${year}-${month}-${day}`;
}

// hreflang alternate set shared by an article's English and Hebrew entries. The
// server injects these as <link rel="alternate"> tags so crawlers pair the two
// language URLs; x-default points at English.
function articleAlternates(slug) {
  return [
    { hreflang: 'en', href: `${BASE_URL}/articles/${slug}` },
    { hreflang: 'he', href: `${BASE_URL}/he/articles/${slug}` },
    { hreflang: 'x-default', href: `${BASE_URL}/articles/${slug}` },
  ];
}

// Resolved lazily and cached: importing the TS config eagerly would make this module
// unusable in environments that cannot load it.
let cdnBase;
let assetList;

async function cdnImageFor(meta, language = 'en') {
  if (!assetList) {
    const [config, assets] = await Promise.all([
      import(pathToFileURL(join(ROOT, 'src', 'config.ts')).href),
      import(pathToFileURL(join(ROOT, 'src', 'assets', 'assetsConfig.ts')).href),
    ]);
    cdnBase = config.default.STORAGE_BASE_URL;
    assetList = assets.default;
  }

  const asset = assetList.find((entry) => entry.name === meta.image);
  if (!asset) {
    return DEFAULT_IMAGE;
  }
  // No cache-busting query here: unlike the runtime asset map, preview images are
  // fetched by scrapers that cache aggressively, and a per-build URL would defeat that.
  return { path: `${cdnBase}/new/${asset.file}`, alt: meta[language].title };
}

/**
 * @returns {Promise<Map<string, object>>} preview metadata keyed by route key ('index', 'about', 'articles/<slug>', ...)
 */
export async function buildSocialMetadata() {
  const metadata = new Map();

  const pageFiles = (await readdir(PAGES_DIR)).filter((name) => name.endsWith('.md'));
  for (const name of pageFiles) {
    const key = name.replace(/\.md$/, '');
    const markdown = await readFile(join(PAGES_DIR, name), 'utf8');
    metadata.set(key, {
      title: pageTitle(key, markdown),
      description: PAGE_DESCRIPTIONS[key] ?? titleOf(markdown),
      ogDescription: PAGE_OG_DESCRIPTIONS[key],
      url: `${BASE_URL}${key === 'index' ? '/' : `/${key}`}`,
      type: 'website',
      locale: 'en_US',
      image: DEFAULT_IMAGE,
    });
  }

  const folders = await readdir(ARTICLES_DIR, { withFileTypes: true });
  for (const entry of folders.filter((folder) => folder.isDirectory())) {
    const meta = (await import(pathToFileURL(join(ARTICLES_DIR, entry.name, 'meta.ts')).href)).default;
    metadata.set(`articles/${meta.slug}`, {
      title: `${meta.en.title} - ${SITE_NAME}`,
      description: meta.en.excerpt,
      url: `${BASE_URL}/articles/${meta.slug}`,
      type: 'article',
      locale: 'en_US',
      publishedTime: isoDate(meta.date),
      tags: meta.tags,
      image: await cdnImageFor(meta, 'en'),
      alternates: articleAlternates(meta.slug),
    });
    // Hebrew version lives at its own crawlable URL so it can be indexed and ranked
    // independently; server.js gates document routes on these keys, so it must exist here.
    metadata.set(`he/articles/${meta.slug}`, {
      title: `${meta.he.title} - ${SITE_NAME}`,
      description: meta.he.excerpt,
      url: `${BASE_URL}/he/articles/${meta.slug}`,
      type: 'article',
      locale: 'he_IL',
      publishedTime: isoDate(meta.date),
      tags: meta.tags,
      image: await cdnImageFor(meta, 'he'),
      alternates: articleAlternates(meta.slug),
    });
  }

  return metadata;
}
