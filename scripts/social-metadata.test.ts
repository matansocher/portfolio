import { describe, expect, it } from 'vitest';
import { buildSocialMetadata, DEFAULT_IMAGE } from './social-metadata.mjs';
import { STATIC_ROUTES } from './generate-sitemap.mjs';

describe('buildSocialMetadata', () => {
  it('covers every static route and every article', async () => {
    const metadata = await buildSocialMetadata();
    for (const route of STATIC_ROUTES) {
      const key = route === '/' ? 'index' : route.slice(1);
      expect(metadata.has(key), `missing metadata for ${route}`).toBe(true);
    }
    expect([...metadata.keys()].filter((key) => key.startsWith('articles/')).length).toBeGreaterThan(0);
  });

  it('gives every entry the fields the tags require', async () => {
    for (const [key, entry] of await buildSocialMetadata()) {
      expect(entry.title, key).toBeTruthy();
      expect(entry.description, key).toBeTruthy();
      expect(entry.url, key).toMatch(/^https?:\/\//);
      expect(entry.image.path, key).toBeTruthy();
      expect(entry.image.alt, key).toBeTruthy();
    }
  });

  it('titles the home page with the full positioning line and suffixes the rest', async () => {
    const metadata = await buildSocialMetadata();
    expect(metadata.get('index')?.title).toBe('Dekel Nissim — Product Designer, UX Strategist & Researcher');
    expect(metadata.get('articles')?.title).toMatch(/ — Dekel Nissim$/);
  });

  it('marks articles as articles and dates them ISO-first', async () => {
    const articles = [...(await buildSocialMetadata()).entries()].filter(([key]) => key.startsWith('articles/'));
    for (const [key, entry] of articles) {
      expect(entry.type, key).toBe('article');
      expect(entry.publishedTime, key).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it('points articles at their own CDN image, without a cache-busting query', async () => {
    const [, entry] = [...(await buildSocialMetadata()).entries()].find(([key]) => key.startsWith('articles/'))!;
    expect(entry.image.path).toContain('storage.googleapis.com');
    expect(entry.image.path).not.toContain('?a=');
  });

  it('falls back to the bundled card for non-article pages', async () => {
    expect((await buildSocialMetadata()).get('salaries')?.image).toEqual(DEFAULT_IMAGE);
  });

  it('adds a Hebrew article entry with he_IL locale and Hebrew title', async () => {
    const metadata = await buildSocialMetadata();
    const heKeys = [...metadata.keys()].filter((key) => key.startsWith('he/articles/'));
    expect(heKeys.length).toBeGreaterThan(0);

    for (const key of heKeys) {
      const entry = metadata.get(key)!;
      expect(entry.type, key).toBe('article');
      expect(entry.locale, key).toBe('he_IL');
      expect(entry.url, key).toBe(`https://dekelnissim.com/${key}`);
      expect(/[\u0590-\u05FF]/.test(entry.title), key).toBe(true);
      expect(entry.publishedTime, key).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it('gives article entries the shared hreflang alternate set', async () => {
    const metadata = await buildSocialMetadata();
    const [enKey, enEntry] = [...metadata.entries()].find(([key]) => key.startsWith('articles/'))!;
    const slug = enKey.replace('articles/', '');
    const expected = [
      { hreflang: 'en', href: `https://dekelnissim.com/articles/${slug}` },
      { hreflang: 'he', href: `https://dekelnissim.com/he/articles/${slug}` },
      { hreflang: 'x-default', href: `https://dekelnissim.com/articles/${slug}` },
    ];
    expect(enEntry.alternates).toEqual(expected);
    expect(metadata.get(`he/articles/${slug}`)?.alternates).toEqual(expected);
    // Non-article pages carry no alternates.
    expect(metadata.get('salaries')?.alternates).toBeUndefined();
  });

  it('marks English pages and articles with the en_US locale', async () => {
    const metadata = await buildSocialMetadata();
    expect(metadata.get('index')?.locale).toBe('en_US');
    const [, enArticle] = [...metadata.entries()].find(([key]) => key.startsWith('articles/'))!;
    expect(enArticle.locale).toBe('en_US');
  });
});
