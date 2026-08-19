import { describe, it, expect, vi } from 'vitest';
import { buildWebMcpTools } from './webmcpTools';

function toolsByName() {
  const navigate = vi.fn();
  const tools = buildWebMcpTools({ navigate });
  const map = new Map(tools.map((tool) => [tool.name, tool]));
  return { navigate, tools, map };
}

describe('buildWebMcpTools', () => {
  it('exposes the expected read-only tools with valid definitions', () => {
    const { tools } = toolsByName();
    const names = tools.map((tool) => tool.name);

    expect(names).toEqual(
      expect.arrayContaining([
        'navigate',
        'list_pages',
        'list_projects',
        'list_articles',
        'get_article',
        'search_content',
      ]),
    );

    for (const tool of tools) {
      expect(tool.name).toMatch(/^[a-zA-Z0-9_.-]{1,128}$/);
      expect(tool.description.length).toBeGreaterThan(0);
      expect(typeof tool.execute).toBe('function');
      expect(tool.annotations?.readOnlyHint).toBe(true);
    }
  });

  it('navigate calls the router with a known path', async () => {
    const { navigate, map } = toolsByName();
    const result = (await map.get('navigate')!.execute({ path: '/articles' })) as { navigatedTo: string };

    expect(navigate).toHaveBeenCalledWith('/articles');
    expect(result.navigatedTo).toBe('/articles');
  });

  it('navigate falls back to home for an unknown path', async () => {
    const { navigate, map } = toolsByName();
    const result = (await map.get('navigate')!.execute({ path: '/does-not-exist' })) as { navigatedTo: string };

    expect(navigate).toHaveBeenCalledWith('/');
    expect(result.navigatedTo).toBe('/');
  });

  it('list_projects returns the configured projects', async () => {
    const { map } = toolsByName();
    const result = (await map.get('list_projects')!.execute({})) as {
      projects: { key: string; url: string }[];
    };

    expect(result.projects.length).toBeGreaterThan(0);
    expect(result.projects[0]).toHaveProperty('title');
    expect(result.projects[0]).toHaveProperty('url');
  });

  it('list_articles returns articles and honors language', async () => {
    const { map } = toolsByName();
    const en = (await map.get('list_articles')!.execute({})) as {
      articles: { slug: string; title: string; url: string }[];
    };
    const he = (await map.get('list_articles')!.execute({ language: 'he' })) as {
      articles: { slug: string; title: string }[];
    };

    expect(en.articles.length).toBeGreaterThan(0);
    expect(he.articles.length).toBe(en.articles.length);
    expect(en.articles[0].url).toBe(`/articles/${en.articles[0].slug}`);
  });

  it('get_article returns full content for a known slug', async () => {
    const { map } = toolsByName();
    const list = (await map.get('list_articles')!.execute({})) as { articles: { slug: string }[] };
    const slug = list.articles[0].slug;

    const result = (await map.get('get_article')!.execute({ slug })) as { slug: string; markdown: string };

    expect(result.slug).toBe(slug);
    expect(typeof result.markdown).toBe('string');
  });

  it('get_article returns an error for an unknown slug', async () => {
    const { map } = toolsByName();
    const result = (await map.get('get_article')!.execute({ slug: 'nope' })) as { error?: string };

    expect(result.error).toBeTruthy();
  });

  it('search_content returns empty results for a blank query', async () => {
    const { map } = toolsByName();
    const result = (await map.get('search_content')!.execute({ query: '   ' })) as {
      projects: unknown[];
      articles: unknown[];
    };

    expect(result.projects).toEqual([]);
    expect(result.articles).toEqual([]);
  });
});
