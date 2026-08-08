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

export interface ArticleBlock {
  type: 'paragraph' | 'heading' | 'list' | 'quote';
  text?: string;
  items?: string[];
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  tags: string[];
  body: ArticleBlock[];
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
