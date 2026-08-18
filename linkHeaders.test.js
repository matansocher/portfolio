import { describe, it, expect } from 'vitest';
import { LINK_HEADER, isDocumentRequest, applyLinkHeader } from './linkHeaders.js';

describe('link headers', () => {
  it('advertises registered relation types per RFC 8288', () => {
    expect(LINK_HEADER).toContain('</llms.txt>; rel="describedby"');
    expect(LINK_HEADER).toContain('</manifest.json>; rel="manifest"');
  });

  it('treats extensionless routes and html files as documents', () => {
    expect(isDocumentRequest('/')).toBe(true);
    expect(isDocumentRequest('/about')).toBe(true);
    expect(isDocumentRequest('/articles/some-slug')).toBe(true);
    expect(isDocumentRequest('/index.html')).toBe(true);
  });

  it('leaves static assets alone', () => {
    expect(isDocumentRequest('/assets/index-abc123.js')).toBe(false);
    expect(isDocumentRequest('/favicon.ico')).toBe(false);
    expect(isDocumentRequest('/llms.txt')).toBe(false);
  });

  it('sets the header only on document requests', () => {
    const headers = {};
    const res = {
      setHeader: (name, value) => {
        headers[name] = value;
      },
    };

    applyLinkHeader(res, '/about?ref=agent');
    expect(headers.Link).toBe(LINK_HEADER);

    const assetHeaders = {};
    applyLinkHeader(
      {
        setHeader: (name, value) => {
          assetHeaders[name] = value;
        },
      },
      '/assets/index-abc123.js',
    );
    expect(assetHeaders.Link).toBeUndefined();
  });
});
