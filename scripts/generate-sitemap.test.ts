import { describe, expect, it } from 'vitest';
import { readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  BASE_URL,
  STATIC_ROUTES,
  buildRobots,
  buildSitemap,
  collectArticles,
  getGitLastmodDate,
} from './generate-sitemap.mjs';

const ARTICLES_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'content', 'articles');

describe('generate-sitemap', () => {
  it('includes every article folder and every static route', () => {
    const folders = readdirSync(ARTICLES_DIR, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name);

    const xml = buildSitemap(collectArticles(), '2026-01-01', () => '2026-01-01');

    for (const route of STATIC_ROUTES) {
      expect(xml).toContain(`<loc>${BASE_URL}${route}</loc>`);
    }
    for (const folder of folders) {
      expect(xml).toContain(`<loc>${BASE_URL}/articles/${folder}</loc>`);
    }
  });

  it('produces parseable XML with W3C lastmod dates', () => {
    const xml = buildSitemap([{ slug: 'sample', lastmod: '2026-06-22' }], '2026-01-01', () => '2026-01-01');
    const parsed = new DOMParser().parseFromString(xml, 'application/xml');

    expect(parsed.querySelector('parsererror')).toBeNull();
    expect(parsed.documentElement.getAttribute('xmlns')).toBe('http://www.sitemaps.org/schemas/sitemap/0.9');
    expect(xml).toContain('<lastmod>2026-06-22</lastmod>');
    expect(
      [...xml.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].every(([, date]) => /^\d{4}-\d{2}-\d{2}$/.test(date)),
    ).toBe(true);
  });

  it('resolves static route lastmod from git history via injected resolver', () => {
    const mockResolver = (filePath: string, fallback: string): string => {
      const map: Record<string, string> = {
        'src/content/pages/index.md': '2026-01-15',
        'src/content/pages/about.md': '2026-02-20',
        'src/content/pages/articles.md': '2026-03-10',
      };
      return map[filePath] ?? fallback;
    };

    const xml = buildSitemap([], '2026-01-01', mockResolver);

    expect(xml).toContain('<loc>https://dkl-portfolio.herokuapp.com/</loc>');
    expect(xml).toContain('<lastmod>2026-01-15</lastmod>');
    expect(xml).toContain('<loc>https://dkl-portfolio.herokuapp.com/about</loc>');
    expect(xml).toContain('<lastmod>2026-02-20</lastmod>');
  });

  it('falls back to the provided date when git resolver returns it', () => {
    const mockResolver = () => '2026-08-19';

    const xml = buildSitemap([{ slug: 'test-article', lastmod: '2026-07-01' }], '2026-08-19', mockResolver);

    // Static routes should use the fallback
    expect(xml).toContain('<loc>https://dkl-portfolio.herokuapp.com/</loc>');
    expect(xml).toMatch(/<loc>https:\/\/dkl-portfolio\.herokuapp\.com\/<\/loc>\s*<lastmod>2026-08-19<\/lastmod>/);
  });

  it('uses article lastmod when available, fallback otherwise', () => {
    const mockResolver = () => '2026-08-19';

    const xml = buildSitemap(
      [
        { slug: 'with-date', lastmod: '2026-05-15' },
        { slug: 'without-date', lastmod: undefined },
      ],
      '2026-08-19',
      mockResolver,
    );

    expect(xml).toContain('<loc>https://dkl-portfolio.herokuapp.com/articles/with-date</loc>');
    expect(xml).toContain('<lastmod>2026-05-15</lastmod>');
    expect(xml).toContain('<loc>https://dkl-portfolio.herokuapp.com/articles/without-date</loc>');
    expect(xml).toContain('<lastmod>2026-08-19</lastmod>');
  });

  it('getGitLastmodDate returns fallback when git is unavailable', () => {
    const date = getGitLastmodDate('/nonexistent/file.md', '2026-01-01');
    expect(date).toBe('2026-01-01');
  });

  it('adds the sitemap reference to robots.txt exactly once', () => {
    const once = buildRobots('User-agent: *\nDisallow:\n');
    const twice = buildRobots(once);

    expect(once).toContain(`Sitemap: ${BASE_URL}/sitemap.xml`);
    expect(twice.match(/Sitemap:/g)).toHaveLength(1);
    expect(twice).toContain('User-agent: *');
  });

  it('preserves the Content-Signal and AI-crawler directives when rewriting robots.txt', () => {
    const source = [
      'User-agent: *',
      'Allow: /',
      'Content-Signal: ai-train=no, search=yes, ai-input=yes',
      '',
      'User-agent: GPTBot',
      'Allow: /',
      '',
      'User-agent: Google-Extended',
      'Disallow: /',
      '',
      'Sitemap: https://example.com/old-sitemap.xml',
      '',
    ].join('\n');

    const rewritten = buildRobots(source);

    expect(rewritten).toContain('Content-Signal: ai-train=no, search=yes, ai-input=yes');
    expect(rewritten).toContain('User-agent: GPTBot');
    expect(rewritten).toContain('User-agent: Google-Extended\nDisallow: /');
    expect(rewritten).not.toContain('old-sitemap.xml');
    expect(rewritten.match(/Sitemap:/g)).toHaveLength(1);
  });
});
