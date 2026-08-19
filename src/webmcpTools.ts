import config from '@/config';
import articles from '@/data/articles';
import type { ArticleLanguage } from '@/types';

export interface WebMcpToolContext {
  navigate: (path: string) => void;
}

const ROUTES: { path: string; title: string; description: string }[] = [
  { path: '/', title: 'Home', description: "Landing page with Dekel Nissim's projects and testimonials" },
  { path: '/salaries', title: 'Salary Additions', description: 'Case study: automating salary calculations' },
  { path: '/marketer', title: 'Marketer', description: 'Case study: design system for a marketing startup' },
  { path: '/myco', title: 'Myco', description: 'Case study: marketing management system and producers interface' },
  { path: '/employees', title: 'Employee Onboarding', description: 'Case study: employee onboarding experience' },
  { path: '/articles', title: 'Articles', description: 'List of written articles on UX, research and product' },
  { path: '/business-card', title: 'Business card', description: 'Freelance one-pager with a contact form' },
];

const LANGUAGE_ENUM: ArticleLanguage[] = ['en', 'he'];

function resolveLanguage(value: unknown): ArticleLanguage {
  return value === 'he' ? 'he' : 'en';
}

function articleSummary(slug: string, language: ArticleLanguage) {
  const article = articles.find((item) => item.slug === slug);
  if (!article) return null;
  const locale = article[language];
  return {
    slug: article.slug,
    title: locale.title,
    excerpt: locale.excerpt,
    tags: article.tags,
    date: locale.displayDate,
    readingTime: locale.readingTime,
    url: `/articles/${article.slug}`,
  };
}

export function buildWebMcpTools({ navigate }: WebMcpToolContext): WebMcpToolDefinition[] {
  return [
    {
      name: 'navigate',
      title: 'Navigate to a page',
      description:
        "Navigate the site to one of Dekel Nissim's portfolio pages. Use this to move the user to a case study, the articles list, the home page, or the business card / contact page.",
      annotations: { readOnlyHint: true },
      inputSchema: {
        type: 'object',
        properties: {
          path: {
            type: 'string',
            description: 'The site path to navigate to.',
            enum: ROUTES.map((route) => route.path),
          },
        },
        required: ['path'],
      },
      execute: (input) => {
        const path = typeof input.path === 'string' ? input.path : '/';
        const match = ROUTES.find((route) => route.path === path);
        const target = match ? match.path : '/';
        navigate(target);
        return { navigatedTo: target };
      },
    },
    {
      name: 'list_pages',
      title: 'List site pages',
      description: 'List all navigable pages on the portfolio site with their paths and a short description of each.',
      annotations: { readOnlyHint: true },
      inputSchema: { type: 'object', properties: {} },
      execute: () => ({ pages: ROUTES }),
    },
    {
      name: 'list_projects',
      title: 'List projects',
      description:
        "List Dekel Nissim's featured case-study projects (Salary Additions, Marketer, Myco, Employee Onboarding) with a summary and link for each.",
      annotations: { readOnlyHint: true },
      inputSchema: { type: 'object', properties: {} },
      execute: () => ({
        projects: config.PROJECTS.map((project) => ({
          key: project.key,
          title: project.title,
          summary: project.summary,
          url: project.path,
        })),
      }),
    },
    {
      name: 'list_articles',
      title: 'List articles',
      description:
        'List published articles about UX research, product design and building trustworthy interfaces. Returns title, excerpt, tags, date and reading time for each article.',
      annotations: { readOnlyHint: true },
      inputSchema: {
        type: 'object',
        properties: {
          language: {
            type: 'string',
            description: 'Language for the returned article text.',
            enum: LANGUAGE_ENUM,
          },
        },
      },
      execute: (input) => {
        const language = resolveLanguage(input.language);
        return {
          articles: articles.map((article) => ({
            slug: article.slug,
            title: article[language].title,
            excerpt: article[language].excerpt,
            tags: article.tags,
            date: article[language].displayDate,
            readingTime: article[language].readingTime,
            url: `/articles/${article.slug}`,
          })),
        };
      },
    },
    {
      name: 'get_article',
      title: 'Get an article',
      description:
        'Retrieve the full content of a single article by its slug, including the markdown body. Use list_articles first to discover available slugs.',
      annotations: { readOnlyHint: true },
      inputSchema: {
        type: 'object',
        properties: {
          slug: {
            type: 'string',
            description: 'The article slug, e.g. "not-every-product-needs-ai".',
            enum: articles.map((article) => article.slug),
          },
          language: {
            type: 'string',
            description: 'Language for the returned article content.',
            enum: LANGUAGE_ENUM,
          },
        },
        required: ['slug'],
      },
      execute: (input) => {
        const slug = typeof input.slug === 'string' ? input.slug : '';
        const language = resolveLanguage(input.language);
        const article = articles.find((item) => item.slug === slug);
        if (!article) {
          return { error: `No article found with slug "${slug}".` };
        }
        const locale = article[language];
        return {
          slug: article.slug,
          title: locale.title,
          excerpt: locale.excerpt,
          tags: article.tags,
          date: locale.displayDate,
          readingTime: locale.readingTime,
          url: `/articles/${article.slug}`,
          markdown: locale.markdown,
        };
      },
    },
    {
      name: 'search_content',
      title: 'Search the site',
      description:
        "Search across Dekel Nissim's projects and articles for a keyword. Returns matching projects and articles with their links.",
      annotations: { readOnlyHint: true },
      inputSchema: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'The keyword or phrase to search for.',
          },
          language: {
            type: 'string',
            description: 'Language for the returned article text.',
            enum: LANGUAGE_ENUM,
          },
        },
        required: ['query'],
      },
      execute: (input) => {
        const query = (typeof input.query === 'string' ? input.query : '').trim().toLowerCase();
        const language = resolveLanguage(input.language);
        if (!query) {
          return { projects: [], articles: [] };
        }

        const projects = config.PROJECTS.filter((project) =>
          `${project.title} ${project.summary}`.toLowerCase().includes(query),
        ).map((project) => ({
          key: project.key,
          title: project.title,
          summary: project.summary,
          url: project.path,
        }));

        const matchedArticles = articles
          .filter((article) => {
            const locale = article[language];
            const haystack = `${locale.title} ${locale.excerpt} ${article.tags.join(' ')}`.toLowerCase();
            return haystack.includes(query);
          })
          .map((article) => articleSummary(article.slug, language))
          .filter((item): item is NonNullable<typeof item> => item !== null);

        return { projects, articles: matchedArticles };
      },
    },
  ];
}
