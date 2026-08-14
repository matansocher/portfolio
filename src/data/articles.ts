import type { Article, ArticleLanguage, ArticleMeta } from '../types';

const metaModules = import.meta.glob('../content/articles/*/meta.ts', {
  eager: true,
}) as Record<string, { default: ArticleMeta }>;

const markdownModules = import.meta.glob('../content/articles/*/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

function folderFromPath(path: string): string {
  const match = path.match(/\/content\/articles\/([^/]+)\//);
  return match ? match[1] : '';
}

function markdownFor(folder: string, language: ArticleLanguage): string {
  const entry = Object.entries(markdownModules).find(
    ([path]) => folderFromPath(path) === folder && path.endsWith(`/${language}.md`),
  );
  return entry ? entry[1] : '';
}

function readingTime(markdown: string, language: ArticleLanguage): string {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return language === 'he' ? `${minutes} דקות קריאה` : `${minutes} min read`;
}

function dateValue(date: string): number {
  const [day, month, year] = date.split('-').map(Number);
  return new Date(year, month - 1, day).getTime();
}

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

function displayDate(date: string, months: string[]): string {
  const [, month, year] = date.split('-').map(Number);
  return `${months[month - 1]} ${year}`;
}

const articles: Article[] = Object.entries(metaModules)
  .map(([path, module]) => {
    const meta = module.default;
    const folder = folderFromPath(path);
    const enMarkdown = markdownFor(folder, 'en');
    const heMarkdown = markdownFor(folder, 'he');

    return {
      slug: meta.slug,
      date: meta.date,
      displayDate: displayDate(meta.date, MONTHS_EN),
      image: meta.image,
      tags: meta.tags,
      en: {
        ...meta.en,
        markdown: enMarkdown,
        readingTime: readingTime(enMarkdown, 'en'),
        displayDate: displayDate(meta.date, MONTHS_EN),
      },
      he: {
        ...meta.he,
        markdown: heMarkdown,
        readingTime: readingTime(heMarkdown, 'he'),
        displayDate: displayDate(meta.date, MONTHS_HE),
      },
    };
  })
  .sort((a, b) => dateValue(b.date) - dateValue(a.date));

export default articles;
