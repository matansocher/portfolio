import { describe, it, expect } from 'vitest';
import { searchContent, SEARCHABLE_PAGES } from './search';

describe('searchContent', () => {
  it('returns empty groups for a blank query', () => {
    const results = searchContent('   ');
    expect(results).toEqual({ pages: [], projects: [], articles: [] });
  });

  it('matches pages by title', () => {
    const results = searchContent('faq');
    expect(results.pages.map((page) => page.path)).toContain('/faq');
  });

  it('matches a project by title', () => {
    const results = searchContent('marketer');
    expect(results.projects.some((project) => project.key === 'marketer')).toBe(true);
    expect(results.projects[0]).toMatchObject({ type: 'project', url: '/marketer' });
  });

  it('matches articles by tag', () => {
    const results = searchContent('AI');
    expect(results.articles.length).toBeGreaterThan(0);
    expect(results.articles[0].url).toBe(`/articles/${results.articles[0].slug}`);
  });

  it('is case-insensitive', () => {
    expect(searchContent('MARKETER').projects.length).toBe(searchContent('marketer').projects.length);
  });

  it('returns Hebrew article URLs and text when language is he', () => {
    const results = searchContent('AI', 'he');
    expect(results.articles.length).toBeGreaterThan(0);
    expect(results.articles[0].url).toBe(`/he/articles/${results.articles[0].slug}`);
  });

  it('returns no matches for an unrelated query', () => {
    const results = searchContent('zzzznotachance');
    expect(results.pages).toEqual([]);
    expect(results.projects).toEqual([]);
    expect(results.articles).toEqual([]);
  });

  it('exposes a non-empty list of searchable pages', () => {
    expect(SEARCHABLE_PAGES.length).toBeGreaterThan(0);
  });
});
