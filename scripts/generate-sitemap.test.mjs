import { describe, expect, it } from 'vitest';
import { readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { BASE_URL, STATIC_ROUTES, buildRobots, buildSitemap, collectArticles } from './generate-sitemap.mjs';

const ARTICLES_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'content', 'articles');

describe('generate-sitemap', () => {
  it('includes every article folder and every static route', () => {
    const folders = readdirSync(ARTICLES_DIR, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name);

    const xml = buildSitemap(collectArticles());

    for (const route of STATIC_ROUTES) {
      expect(xml).toContain(`<loc>${BASE_URL}${route}</loc>`);
    }
    for (const folder of folders) {
      expect(xml).toContain(`<loc>${BASE_URL}/articles/${folder}</loc>`);
    }
    expect(xml).not.toContain('/business-card');
  });

  it('produces parseable XML with W3C lastmod dates', () => {
    const xml = buildSitemap([{ slug: 'sample', lastmod: '2026-06-22' }], '2026-01-01');
    const parsed = new DOMParser().parseFromString(xml, 'application/xml');

    expect(parsed.querySelector('parsererror')).toBeNull();
    expect(parsed.documentElement.getAttribute('xmlns')).toBe('http://www.sitemaps.org/schemas/sitemap/0.9');
    expect(xml).toContain('<lastmod>2026-06-22</lastmod>');
    expect(
      [...xml.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].every(([, date]) => /^\d{4}-\d{2}-\d{2}$/.test(date)),
    ).toBe(true);
  });

  it('adds the sitemap reference to robots.txt exactly once', () => {
    const once = buildRobots('User-agent: *\nDisallow:\n');
    const twice = buildRobots(once);

    expect(once).toContain(`Sitemap: ${BASE_URL}/sitemap.xml`);
    expect(twice.match(/Sitemap:/g)).toHaveLength(1);
    expect(twice).toContain('User-agent: *');
  });
});
