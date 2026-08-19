import { describe, expect, it, vi } from 'vitest';
import { INDEXNOW_ENDPOINT, INDEXNOW_KEY, buildPayload, extractUrls, pingIndexNow } from './indexnow-ping.mjs';

const SAMPLE_SITEMAP = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://dkl-portfolio.herokuapp.com/</loc><lastmod>2026-01-01</lastmod></url>
  <url><loc>https://dkl-portfolio.herokuapp.com/articles</loc><lastmod>2026-01-01</lastmod></url>
  <url><loc>https://dkl-portfolio.herokuapp.com/a?x=1&amp;y=2</loc><lastmod>2026-01-01</lastmod></url>
</urlset>`;

describe('indexnow-ping', () => {
  it('is a 32-char hex key', () => {
    expect(INDEXNOW_KEY).toMatch(/^[0-9a-f]{32}$/);
  });

  it('extracts and XML-unescapes every <loc> URL', () => {
    expect(extractUrls(SAMPLE_SITEMAP)).toEqual([
      'https://dkl-portfolio.herokuapp.com/',
      'https://dkl-portfolio.herokuapp.com/articles',
      'https://dkl-portfolio.herokuapp.com/a?x=1&y=2',
    ]);
  });

  it('returns an empty list when there are no <loc> entries', () => {
    expect(extractUrls('<urlset></urlset>')).toEqual([]);
  });

  it('builds a spec-compliant payload with host and keyLocation', () => {
    const payload = buildPayload(['https://dkl-portfolio.herokuapp.com/', 'https://dkl-portfolio.herokuapp.com/a']);
    expect(payload).toEqual({
      host: 'dkl-portfolio.herokuapp.com',
      key: INDEXNOW_KEY,
      keyLocation: `https://dkl-portfolio.herokuapp.com/${INDEXNOW_KEY}.txt`,
      urlList: ['https://dkl-portfolio.herokuapp.com/', 'https://dkl-portfolio.herokuapp.com/a'],
    });
  });

  it('POSTs JSON to the injected endpoint and returns the status', async () => {
    const fetchImpl = vi.fn().mockResolvedValue({ status: 202 });
    const payload = buildPayload(['https://dkl-portfolio.herokuapp.com/']);

    const status = await pingIndexNow(payload, { fetchImpl });

    expect(status).toBe(202);
    expect(fetchImpl).toHaveBeenCalledWith(
      INDEXNOW_ENDPOINT,
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(payload),
      }),
    );
  });
});
