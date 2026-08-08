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

function readingTime(markdown: string): string {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
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
      image: meta.image,
      tags: meta.tags,
      en: { ...meta.en, markdown: enMarkdown, readingTime: readingTime(enMarkdown) },
      he: { ...meta.he, markdown: heMarkdown, readingTime: readingTime(heMarkdown) },
    };
  })
  .sort((a, b) => b.date.localeCompare(a.date));

export default articles;
