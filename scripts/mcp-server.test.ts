import { describe, expect, it } from 'vitest';
import { buildMcpServer } from './mcp-server.mjs';

// --- Fake data ------------------------------------------------------------

const FAKE_ARTICLES = [
  {
    slug: 'not-every-product-needs-ai',
    title: 'Not Every Product Needs AI',
    excerpt: 'A critical look at the AI hype cycle in product design.',
    tags: ['AI', 'product design'],
    displayDate: 'January 2025',
    readingTime: '4 min read',
  },
  {
    slug: 'trust-in-interfaces',
    title: 'Trust in Interfaces',
    excerpt: 'How verification mechanics shape user trust.',
    tags: ['trust', 'UX'],
    displayDate: 'March 2025',
    readingTime: '6 min read',
  },
];

const FAKE_MARKDOWN: Record<string, string> = {
  index: '# Home\nWelcome to the portfolio.',
  salaries: '# Salary Additions\nCase study content.',
  'articles/not-every-product-needs-ai': '# Not Every Product Needs AI\nFull article body...',
};

async function fakeReadMarkdown(key: string): Promise<string | null> {
  return FAKE_MARKDOWN[key] ?? null;
}

// Helper: call a registered tool by name with given args
async function callTool(
  server: ReturnType<typeof buildMcpServer>,
  name: string,
  args: Record<string, unknown> = {},
): Promise<unknown> {
  // Access internal registered tools via the server's plain-object tool registry.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const registeredTools = (server as any)._registeredTools as Record<
    string,
    { handler: (args: unknown) => Promise<unknown> }
  >;
  const tool = registeredTools[name];
  if (!tool) throw new Error(`Tool "${name}" not found`);
  return tool.handler(args);
}

// --- Tests -----------------------------------------------------------------

describe('buildMcpServer', () => {
  const server = buildMcpServer({ readMarkdown: fakeReadMarkdown, articles: FAKE_ARTICLES });

  it('exposes the expected tool names', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tools: Record<string, unknown> = (server as any)._registeredTools;
    expect(Object.keys(tools).sort()).toEqual([
      'get_article',
      'get_page',
      'list_articles',
      'list_pages',
      'list_projects',
      'search_content',
    ]);
  });

  describe('list_pages', () => {
    it('returns all known routes', async () => {
      const result = (await callTool(server, 'list_pages')) as { content: [{ text: string }] };
      const data = JSON.parse(result.content[0].text);
      expect(data.pages).toHaveLength(7);
      expect(data.pages[0].path).toBe('/');
      expect(data.pages.map((p: { path: string }) => p.path)).toContain('/salaries');
    });
  });

  describe('list_projects', () => {
    it('returns the four case studies', async () => {
      const result = (await callTool(server, 'list_projects')) as { content: [{ text: string }] };
      const data = JSON.parse(result.content[0].text);
      expect(data.projects).toHaveLength(4);
      expect(data.projects.map((p: { key: string }) => p.key)).toEqual(['salaries', 'marketer', 'myco', 'employees']);
    });
  });

  describe('list_articles', () => {
    it('returns all articles with expected fields', async () => {
      const result = (await callTool(server, 'list_articles')) as { content: [{ text: string }] };
      const data = JSON.parse(result.content[0].text);
      expect(data.articles).toHaveLength(2);
      const first = data.articles[0];
      expect(first).toMatchObject({
        slug: 'not-every-product-needs-ai',
        title: 'Not Every Product Needs AI',
        url: '/articles/not-every-product-needs-ai',
      });
    });
  });

  describe('get_article', () => {
    it('returns article metadata and markdown for a known slug', async () => {
      const result = (await callTool(server, 'get_article', { slug: 'not-every-product-needs-ai' })) as {
        content: [{ text: string }];
      };
      const data = JSON.parse(result.content[0].text);
      expect(data.slug).toBe('not-every-product-needs-ai');
      expect(data.markdown).toContain('Full article body');
    });

    it('returns an error for an unknown slug', async () => {
      const result = (await callTool(server, 'get_article', { slug: 'nonexistent' })) as {
        content: [{ text: string }];
      };
      const data = JSON.parse(result.content[0].text);
      expect(data.error).toMatch(/No article found/);
    });
  });

  describe('get_page', () => {
    it('returns markdown for a known route', async () => {
      const result = (await callTool(server, 'get_page', { path: '/salaries' })) as {
        content: [{ text: string }];
      };
      expect(result.content[0].text).toContain('# Salary Additions');
    });

    it('maps "/" to the index key', async () => {
      const result = (await callTool(server, 'get_page', { path: '/' })) as {
        content: [{ text: string }];
      };
      expect(result.content[0].text).toContain('# Home');
    });

    it('returns an error for an unknown path', async () => {
      const result = (await callTool(server, 'get_page', { path: '/nonexistent' })) as {
        content: [{ text: string }];
      };
      const data = JSON.parse(result.content[0].text);
      expect(data.error).toMatch(/No content found/);
    });
  });

  describe('search_content', () => {
    it('matches projects by title', async () => {
      const result = (await callTool(server, 'search_content', { query: 'salary' })) as {
        content: [{ text: string }];
      };
      const data = JSON.parse(result.content[0].text);
      expect(data.projects).toHaveLength(1);
      expect(data.projects[0].key).toBe('salaries');
    });

    it('matches articles by excerpt', async () => {
      const result = (await callTool(server, 'search_content', { query: 'verification' })) as {
        content: [{ text: string }];
      };
      const data = JSON.parse(result.content[0].text);
      expect(data.articles).toHaveLength(1);
      expect(data.articles[0].slug).toBe('trust-in-interfaces');
    });

    it('returns empty lists for a blank query', async () => {
      const result = (await callTool(server, 'search_content', { query: '' })) as {
        content: [{ text: string }];
      };
      const data = JSON.parse(result.content[0].text);
      expect(data.projects).toHaveLength(0);
      expect(data.articles).toHaveLength(0);
    });

    it('returns empty lists when nothing matches', async () => {
      const result = (await callTool(server, 'search_content', { query: 'xyzzy_no_match' })) as {
        content: [{ text: string }];
      };
      const data = JSON.parse(result.content[0].text);
      expect(data.projects).toHaveLength(0);
      expect(data.articles).toHaveLength(0);
    });
  });
});
