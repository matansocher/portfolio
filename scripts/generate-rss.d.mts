export const BASE_URL: string;

export interface Article {
  slug: string;
  date: string;
  title: string;
  excerpt: string;
}

export function collectArticles(articlesDir?: string): Promise<Article[]>;

export function buildRssFeed(articles: Article[]): string;
