// Factory that builds an MCP McpServer backed by a markdown-map reader.
// Kept pure and dependency-injected so it can be unit-tested without a real filesystem.
//
// Tools exposed (read-only, mirroring the in-browser WebMCP surface):
//   list_pages       — all navigable routes with path + description
//   list_projects    — case-study projects with title, summary, url
//   list_articles    — all published articles (title, excerpt, tags, date, readingTime)
//   get_article      — full markdown content for one article by slug
//   get_page         — raw markdown for any route (e.g. /salaries, /articles/some-slug)
//   search_content   — substring search across all markdown content

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

// Static data that mirrors src/webmcpTools.ts — kept here so the server has no
// dependency on the React/Vite source tree.
const PAGES = [
  { path: '/', title: 'Home', description: "Landing page with Dekel Nissim's projects and testimonials" },
  { path: '/salaries', title: 'Salary Additions', description: 'Case study: automating salary calculations' },
  { path: '/marketer', title: 'Marketer', description: 'Case study: design system for a marketing startup' },
  { path: '/myco', title: 'Myco', description: 'Case study: mobile apps for community events (ticket buyers and event producers)' },
  { path: '/employees', title: 'Employee Onboarding', description: 'Case study: employee onboarding experience' },
  { path: '/articles', title: 'Articles', description: 'List of written articles on UX, research and product' },
  { path: '/business-card', title: 'Business card', description: 'Freelance one-pager with a contact form' },
];

const PROJECTS = [
  { key: 'salaries', title: 'Salary Additions', summary: 'Automating salary calculations', url: '/salaries' },
  { key: 'marketer', title: 'Marketer', summary: 'Design system for a marketing startup', url: '/marketer' },
  { key: 'myco', title: 'Myco', summary: 'Mobile apps for community events (ticket buyers and event producers)', url: '/myco' },
  {
    key: 'employees',
    title: 'Employee Onboarding',
    summary: 'Employee onboarding experience',
    url: '/employees',
  },
];

/**
 * Build and return an McpServer instance.
 *
 * @param {Object} opts
 * @param {(key: string) => Promise<string|null>} opts.readMarkdown
 *   Called with a markdown key (e.g. "salaries", "articles/some-slug", "index") and
 *   returns the markdown string or null when not found.
 * @param {{ slug: string; title: string; excerpt: string; tags: string[]; displayDate: string; readingTime: string }[]} opts.articles
 *   Static article metadata list (same shape as the build-time articles data).
 * @returns {McpServer}
 */
export function buildMcpServer({ readMarkdown, articles }) {
  const server = new McpServer({
    name: 'dekelnissim.com/portfolio',
    version: '0.1.0',
  });

  // --- list_pages ----------------------------------------------------------
  server.registerTool(
    'list_pages',
    {
      title: 'List site pages',
      description: 'List all navigable pages on the portfolio site with their paths and a short description.',
      annotations: { readOnlyHint: true },
      inputSchema: z.object({}),
    },
    async () => ({
      content: [{ type: 'text', text: JSON.stringify({ pages: PAGES }, null, 2) }],
    }),
  );

  // --- list_projects --------------------------------------------------------
  server.registerTool(
    'list_projects',
    {
      title: 'List projects',
      description:
        "List Dekel Nissim's featured case-study projects (Salary Additions, Marketer, Myco, Employee Onboarding) with a summary and link for each.",
      annotations: { readOnlyHint: true },
      inputSchema: z.object({}),
    },
    async () => ({
      content: [{ type: 'text', text: JSON.stringify({ projects: PROJECTS }, null, 2) }],
    }),
  );

  // --- list_articles --------------------------------------------------------
  server.registerTool(
    'list_articles',
    {
      title: 'List articles',
      description: 'List published articles about UX research, product design and building trustworthy interfaces.',
      annotations: { readOnlyHint: true },
      inputSchema: z.object({}),
    },
    async () => {
      const list = articles.map((a) => ({
        slug: a.slug,
        title: a.title,
        excerpt: a.excerpt,
        tags: a.tags,
        date: a.displayDate,
        readingTime: a.readingTime,
        url: `/articles/${a.slug}`,
      }));
      return { content: [{ type: 'text', text: JSON.stringify({ articles: list }, null, 2) }] };
    },
  );

  // --- get_article ----------------------------------------------------------
  server.registerTool(
    'get_article',
    {
      title: 'Get an article',
      description:
        'Retrieve the full markdown content of a single article by its slug. Use list_articles first to discover available slugs.',
      annotations: { readOnlyHint: true },
      inputSchema: z.object({
        slug: z.string().describe('The article slug, e.g. "not-every-product-needs-ai".'),
      }),
    },
    async ({ slug }) => {
      const meta = articles.find((a) => a.slug === slug);
      if (!meta) {
        return {
          content: [{ type: 'text', text: JSON.stringify({ error: `No article found with slug "${slug}".` }) }],
        };
      }
      const markdown = await readMarkdown(`articles/${slug}`);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                slug: meta.slug,
                title: meta.title,
                excerpt: meta.excerpt,
                tags: meta.tags,
                date: meta.displayDate,
                readingTime: meta.readingTime,
                url: `/articles/${meta.slug}`,
                markdown: markdown ?? '',
              },
              null,
              2,
            ),
          },
        ],
      };
    },
  );

  // --- get_page -------------------------------------------------------------
  server.registerTool(
    'get_page',
    {
      title: 'Get page content',
      description:
        'Retrieve the markdown content for any portfolio route, e.g. "/salaries", "/articles/some-slug", or "/" for the home page.',
      annotations: { readOnlyHint: true },
      inputSchema: z.object({
        path: z.string().describe('The site path, e.g. "/salaries" or "/articles/some-slug".'),
      }),
    },
    async ({ path }) => {
      // Convert path to a markdown key (strip leading slash, map "/" -> "index").
      const key = path === '/' ? 'index' : path.replace(/^\//, '');
      const markdown = await readMarkdown(key);
      if (!markdown) {
        return { content: [{ type: 'text', text: JSON.stringify({ error: `No content found for path "${path}".` }) }] };
      }
      return { content: [{ type: 'text', text: markdown }] };
    },
  );

  // --- search_content -------------------------------------------------------
  server.registerTool(
    'search_content',
    {
      title: 'Search the site',
      description:
        "Search across Dekel Nissim's projects and articles for a keyword. Returns matching projects and articles with their links.",
      annotations: { readOnlyHint: true },
      inputSchema: z.object({
        query: z.string().describe('The keyword or phrase to search for.'),
      }),
    },
    async ({ query }) => {
      const q = query.trim().toLowerCase();
      if (!q) {
        return { content: [{ type: 'text', text: JSON.stringify({ projects: [], articles: [] }) }] };
      }
      const matchedProjects = PROJECTS.filter((p) => `${p.title} ${p.summary}`.toLowerCase().includes(q));
      const matchedArticles = articles
        .filter((a) => `${a.title} ${a.excerpt} ${a.tags.join(' ')}`.toLowerCase().includes(q))
        .map((a) => ({
          slug: a.slug,
          title: a.title,
          excerpt: a.excerpt,
          tags: a.tags,
          date: a.displayDate,
          readingTime: a.readingTime,
          url: `/articles/${a.slug}`,
        }));
      return {
        content: [
          { type: 'text', text: JSON.stringify({ projects: matchedProjects, articles: matchedArticles }, null, 2) },
        ],
      };
    },
  );

  return server;
}
