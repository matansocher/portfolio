export declare function collectArticles(articlesDir?: string): { slug: string; lastmod?: string }[];
export declare function buildSitemap(articles: { slug: string; lastmod?: string }[], today?: string): string;
export declare function buildRobots(existing: string): string;
export declare const BASE_URL: string;
export declare const STATIC_ROUTES: string[];
