export interface NavigationItem {
  path: string;
  displayName: string;
  prev: string | null;
  next: string | null;
}

export type NavigationDictionary = Record<string, NavigationItem>;

export type IconsMap = Record<string, string>;

export interface ClientData {
  text: string;
  name: string;
  title: string;
  company: string;
}

export interface AssetConfig {
  name: string;
  file: string;
}

export interface ProjectItem {
  key: string;
  path: string;
  title: string;
  summary: string;
  imageKey: string;
}

export interface NavLink {
  label: string;
  path: string;
}

export type ArticleLanguage = 'en' | 'he';

export interface ArticleLocaleMeta {
  title: string;
  excerpt: string;
}

export interface ArticleMeta {
  slug: string;
  date: string;
  image: string;
  tags: string[];
  en: ArticleLocaleMeta;
  he: ArticleLocaleMeta;
}

export interface ArticleLocaleContent extends ArticleLocaleMeta {
  markdown: string;
  readingTime: string;
}

export interface Article {
  slug: string;
  date: string;
  image: string;
  tags: string[];
  en: ArticleLocaleContent;
  he: ArticleLocaleContent;
}

export type Assets = Record<string, string>;

export interface Config {
  STORAGE_BASE_URL: string;
  PORTFOLIO_BACKEND: string;
  CONTACT_ENDPOINT: string;
  MARKETER_URL: string;
  NAVIGATION_DICTIONARY: NavigationDictionary;
  ICONS_MAP: IconsMap;
  CLIENTS_DATA: ClientData[];
  NAV_LINKS: NavLink[];
  PROJECTS: ProjectItem[];
}
