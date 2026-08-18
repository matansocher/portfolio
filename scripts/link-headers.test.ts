import { describe, expect, it } from 'vitest';
import { LINK_HEADER, applyLinkHeader, shouldSendLinkHeader } from './link-headers.mjs';

describe('link headers', () => {
  it('advertises registered relation types per RFC 8288', () => {
    expect(LINK_HEADER).toContain('</llms.txt>; rel="describedby"');
    expect(LINK_HEADER).toContain('</manifest.json>; rel="manifest"');
  });

  it('treats extensionless routes and html files as documents', () => {
    expect(shouldSendLinkHeader('/')).toBe(true);
    expect(shouldSendLinkHeader('/about')).toBe(true);
    expect(shouldSendLinkHeader('/articles/some-slug')).toBe(true);
    expect(shouldSendLinkHeader('/index.html')).toBe(true);
  });

  it('leaves static assets alone', () => {
    expect(shouldSendLinkHeader('/assets/index-abc123.js')).toBe(false);
    expect(shouldSendLinkHeader('/favicon.ico')).toBe(false);
    expect(shouldSendLinkHeader('/llms.txt')).toBe(false);
  });

  it('sets the header only on document requests', () => {
    const headers: Record<string, string> = {};
    applyLinkHeader({ setHeader: (name: string, value: string) => void (headers[name] = value) }, '/about?ref=agent');
    expect(headers.Link).toBe(LINK_HEADER);

    const assetHeaders: Record<string, string> = {};
    applyLinkHeader(
      { setHeader: (name: string, value: string) => void (assetHeaders[name] = value) },
      '/assets/index-abc123.js',
    );
    expect(assetHeaders.Link).toBeUndefined();
  });
});
