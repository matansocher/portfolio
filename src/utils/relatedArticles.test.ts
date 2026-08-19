import { describe, it, expect } from 'vitest';
import { getRelatedArticles } from './relatedArticles';
import type { Article } from '../types';

function makeArticle(slug: string, tags: string[], date: string): Article {
  const locale = { title: slug, excerpt: '', displayDate: date, readingTime: '1 min read', markdown: '' };
  return { slug, date, displayDate: date, image: '', tags, en: locale, he: locale };
}

const a1 = makeArticle('a1', ['ux', 'research'], '01-01-2024');
const a2 = makeArticle('a2', ['ux', 'design'], '01-06-2024');
const a3 = makeArticle('a3', ['design'], '01-03-2024');
const a4 = makeArticle('a4', ['research'], '01-05-2024');
const a5 = makeArticle('a5', ['other'], '01-09-2024');

describe('getRelatedArticles', () => {
  it('excludes the current article', () => {
    const result = getRelatedArticles(a1, [a1, a2, a3]);
    expect(result.find((a) => a.slug === 'a1')).toBeUndefined();
  });

  it('ranks by shared tags descending', () => {
    const result = getRelatedArticles(a1, [a1, a2, a3, a4]);
    // a2 shares 'ux' (1), a3 shares nothing (0), a4 shares 'research' (1)
    expect(result[0].slug).toMatch(/a2|a4/);
  });

  it('tie-breaks by newest date', () => {
    // a2 (date 01-06-2024) and a4 (date 01-05-2024) both share 1 tag with a1
    const result = getRelatedArticles(a1, [a1, a2, a3, a4]);
    expect(result[0].slug).toBe('a2');
    expect(result[1].slug).toBe('a4');
  });

  it('falls back to newest articles when no tag overlap', () => {
    const result = getRelatedArticles(a5, [a1, a2, a3, a4, a5], 3);
    // no shared tags; should return 3 newest: a2 (06), a4 (05), a3 (03)
    expect(result.map((a) => a.slug)).toEqual(['a2', 'a4', 'a3']);
  });

  it('respects max limit', () => {
    const result = getRelatedArticles(a1, [a1, a2, a3, a4, a5], 2);
    expect(result).toHaveLength(2);
  });

  it('returns all available when fewer than max', () => {
    const result = getRelatedArticles(a1, [a1, a2]);
    expect(result).toHaveLength(1);
  });
});
