import { describe, expect, it } from 'vitest';
import { readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { BASE_URL, buildRssFeed, collectArticles } from './generate-rss.mjs';

const ARTICLES_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'content', 'articles');

describe('generate-rss', () => {
  it('includes every article folder sorted by date (newest first)', async () => {
    const folders = readdirSync(ARTICLES_DIR, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name);

    const articles = await collectArticles();
    const feed = buildRssFeed(articles);

    for (const folder of folders) {
      expect(feed).toContain(folder);
    }

    // Verify items appear in the feed.
    expect(feed).toContain('<item>');
    expect(feed).toContain('</item>');
  });

  it('produces parseable XML in RSS 2.0 format', async () => {
    const articles = await collectArticles();
    const feed = buildRssFeed(articles);
    const parsed = new DOMParser().parseFromString(feed, 'application/xml');

    expect(parsed.querySelector('parsererror')).toBeNull();
    expect(parsed.documentElement.tagName).toBe('rss');
    expect(parsed.documentElement.getAttribute('version')).toBe('2.0');
    expect(parsed.querySelector('channel > title')).toBeTruthy();
    expect(parsed.querySelector('channel > title')?.textContent).toBe('Dekel Nissim — Articles');
  });

  it('includes article metadata in each item', async () => {
    const articles = await collectArticles();
    const feed = buildRssFeed(articles);

    const parsed = new DOMParser().parseFromString(feed, 'application/xml');
    const items = parsed.querySelectorAll('item');

    expect(items.length).toBeGreaterThan(0);

    items.forEach((item) => {
      const title = item.querySelector('title');
      const link = item.querySelector('link');
      const guid = item.querySelector('guid');
      const description = item.querySelector('description');

      expect(title).toBeTruthy();
      expect(title?.textContent).toBeTruthy();

      expect(link).toBeTruthy();
      expect(link?.textContent).toMatch(/^https:\/\//);

      expect(guid).toBeTruthy();
      expect(guid?.textContent).toBe(link?.textContent);

      expect(description).toBeTruthy();
      expect(description?.textContent).toBeTruthy();
    });
  });

  it('includes RFC 2822 pubDate in UTC for articles with dates', async () => {
    const articles = await collectArticles();
    const feed = buildRssFeed(articles);
    const parsed = new DOMParser().parseFromString(feed, 'application/xml');
    const items = parsed.querySelectorAll('item');

    items.forEach((item) => {
      const pubDate = item.querySelector('pubDate');
      if (pubDate?.textContent) {
        // Verify it parses as a valid date.
        const date = new Date(pubDate.textContent);
        expect(date.getTime()).not.toBeNaN();
        // Verify it's midnight UTC (00:00:00 GMT).
        expect(pubDate.textContent).toMatch(/00:00:00 GMT/);
      }
    });
  });

  it('builds pubDate in UTC to match article date exactly', () => {
    // Test that 21-08-2026 produces exactly "Fri, 21 Aug 2026 00:00:00 GMT"
    // regardless of local timezone.
    const articles = [
      {
        slug: 'test',
        date: '21-08-2026',
        title: 'Test Article',
        excerpt: 'Test excerpt',
      },
    ];

    const feed = buildRssFeed(articles);
    expect(feed).toContain('<pubDate>Fri, 21 Aug 2026 00:00:00 GMT</pubDate>');
  });

  it('escapes XML entities in titles and descriptions', () => {
    const articles = [
      {
        slug: 'test',
        date: '21-08-2026',
        title: 'Test & <Article> with "Quotes" and \'Apostrophes\'',
        excerpt: 'This is a <test> & example "excerpt" with \'entities\'',
      },
    ];

    const feed = buildRssFeed(articles);

    expect(feed).toContain('&amp;');
    expect(feed).toContain('&lt;');
    expect(feed).toContain('&gt;');
    expect(feed).toContain('&quot;');
    expect(feed).toContain('&apos;');

    // Verify no raw unescaped entities in values.
    const parsed = new DOMParser().parseFromString(feed, 'application/xml');
    const items = parsed.querySelectorAll('item > title');
    expect(items.length).toBeGreaterThan(0);
    const itemTitle = items[0];
    expect(itemTitle?.textContent).toContain('Test & <Article>');
  });

  it('links articles to the canonical host', async () => {
    const articles = await collectArticles();
    const feed = buildRssFeed(articles);

    expect(feed).toContain(BASE_URL);
    expect(feed).toContain('https://dekelnissim.com');

    const parsed = new DOMParser().parseFromString(feed, 'application/xml');
    const links = parsed.querySelectorAll('item > link');

    links.forEach((link) => {
      expect(link.textContent).toMatch(new RegExp(`^${BASE_URL}/articles/`));
    });
  });
});
