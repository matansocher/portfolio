import config from '../config';
import articles from '../data/articles';
import type { ArticleLanguage } from '../types';

export interface SearchPageResult {
  type: 'page';
  path: string;
  title: string;
  description: string;
}

export interface SearchProjectResult {
  type: 'project';
  key: string;
  title: string;
  summary: string;
  url: string;
}

export interface SearchArticleResult {
  type: 'article';
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  date: string;
  readingTime: string;
  url: string;
}

export interface SearchResults {
  pages: SearchPageResult[];
  projects: SearchProjectResult[];
  articles: SearchArticleResult[];
}

export const SEARCHABLE_PAGES: SearchPageResult[] = [
  { type: 'page', path: '/', title: 'Home', description: "Dekel Nissim's portfolio - projects and testimonials" },
  {
    type: 'page',
    path: '/articles',
    title: 'Articles',
    description: 'Writing on UX research, product design and building trustworthy interfaces',
  },
  {
    type: 'page',
    path: '/business-card',
    title: 'Contact',
    description: 'Freelance one-pager with a contact form',
  },
  {
    type: 'page',
    path: '/faq',
    title: 'FAQ',
    description: 'Frequently asked questions about working with Dekel',
  },
];

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

export function searchContent(query: string, language: ArticleLanguage = 'en'): SearchResults {
  const term = normalize(query);
  if (!term) {
    return { pages: [], projects: [], articles: [] };
  }

  const pages = SEARCHABLE_PAGES.filter((page) => normalize(`${page.title} ${page.description}`).includes(term));

  const projects = config.PROJECTS.filter((project) =>
    normalize(`${project.title} ${project.summary}`).includes(term),
  ).map<SearchProjectResult>((project) => ({
    type: 'project',
    key: project.key,
    title: project.title,
    summary: project.summary,
    url: project.path,
  }));

  const matchedArticles = articles
    .filter((article) => {
      const locale = article[language];
      const haystack = `${locale.title} ${locale.excerpt} ${article.tags.join(' ')}`;
      return normalize(haystack).includes(term);
    })
    .map<SearchArticleResult>((article) => {
      const locale = article[language];
      return {
        type: 'article',
        slug: article.slug,
        title: locale.title,
        excerpt: locale.excerpt,
        tags: article.tags,
        date: locale.displayDate,
        readingTime: locale.readingTime,
        url: language === 'he' ? `/he/articles/${article.slug}` : `/articles/${article.slug}`,
      };
    });

  return { pages, projects, articles: matchedArticles };
}
