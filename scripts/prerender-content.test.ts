import { describe, expect, it } from 'vitest';
import { buildPrerenderRoutes } from './prerender-content.mjs';

describe('buildPrerenderRoutes', () => {
  it('renders markdown headings, paragraphs, and links as semantic HTML', () => {
    const routes = new Map([['index', "# Hi, I'm Dekel\n\nSome [copy](/about) here."]]);
    const rendered = buildPrerenderRoutes(routes);

    expect(rendered.get('index')).toContain('<h1>Hi, I&#39;m Dekel</h1>');
    expect(rendered.get('index')).toContain('<a href="/about">copy</a>');
  });

  it('renders one entry per route key, independent of others', () => {
    const routes = new Map([
      ['about', '## About'],
      ['articles/foo', '### An Article\n\nBody text.'],
    ]);
    const rendered = buildPrerenderRoutes(routes);

    expect(rendered.size).toBe(2);
    expect(rendered.get('about')).toContain('<h2>About</h2>');
    expect(rendered.get('articles/foo')).toContain('<h3>An Article</h3>');
    expect(rendered.get('articles/foo')).toContain('<p>Body text.</p>');
  });
});
