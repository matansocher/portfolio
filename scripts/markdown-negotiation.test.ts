import { describe, expect, it } from 'vitest';
import {
  estimateTokens,
  isDocumentRequest,
  mdUrlToKey,
  routeToMarkdownKey,
  sendMarkdown,
  wantsMarkdown,
} from './markdown-negotiation.mjs';

describe('wantsMarkdown', () => {
  it('matches an explicit markdown request', () => {
    expect(wantsMarkdown('text/markdown')).toBe(true);
    expect(wantsMarkdown('text/markdown, text/html;q=0.9')).toBe(true);
    expect(wantsMarkdown('TEXT/MARKDOWN')).toBe(true);
  });

  it('keeps HTML the default for browsers and unknown clients', () => {
    expect(wantsMarkdown('text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,*/*;q=0.8')).toBe(false);
    expect(wantsMarkdown('*/*')).toBe(false);
    expect(wantsMarkdown(undefined)).toBe(false);
    expect(wantsMarkdown('')).toBe(false);
  });

  it('honours an explicit rejection via q=0', () => {
    expect(wantsMarkdown('text/markdown;q=0, text/html')).toBe(false);
  });
});

describe('isDocumentRequest', () => {
  it('treats extensionless paths as negotiable documents', () => {
    expect(isDocumentRequest('/')).toBe(true);
    expect(isDocumentRequest('/about')).toBe(true);
    expect(isDocumentRequest('/articles/interface-trust-broken-verification?x=1')).toBe(true);
  });

  it('leaves real assets alone', () => {
    expect(isDocumentRequest('/favicon.ico')).toBe(false);
    expect(isDocumentRequest('/assets/index-abc123.js')).toBe(false);
    expect(isDocumentRequest('/llms.txt')).toBe(false);
    expect(isDocumentRequest('/salaries.md')).toBe(false);
  });
});

describe('routeToMarkdownKey', () => {
  it('maps routes to markdown keys', () => {
    expect(routeToMarkdownKey('/')).toBe('index');
    expect(routeToMarkdownKey('/about')).toBe('about');
    expect(routeToMarkdownKey('/about/')).toBe('about');
    expect(routeToMarkdownKey('/articles/interface-trust-broken-verification?lang=en#top')).toBe(
      'articles/interface-trust-broken-verification',
    );
  });
});

describe('mdUrlToKey', () => {
  const keys = new Set(['index', 'about', 'salaries', 'articles/some-slug']);

  it('maps known .md URLs to their markdown key', () => {
    expect(mdUrlToKey('/salaries.md', keys)).toBe('salaries');
    expect(mdUrlToKey('/about.md', keys)).toBe('about');
    expect(mdUrlToKey('/articles/some-slug.md', keys)).toBe('articles/some-slug');
    expect(mdUrlToKey('/index.md', keys)).toBe('index');
  });

  it('ignores query strings when matching', () => {
    expect(mdUrlToKey('/salaries.md?foo=bar', keys)).toBe('salaries');
  });

  it('returns null for unknown routes', () => {
    expect(mdUrlToKey('/unknown.md', keys)).toBeNull();
  });

  it('returns null for non-.md URLs', () => {
    expect(mdUrlToKey('/salaries', keys)).toBeNull();
    expect(mdUrlToKey('/llms.txt', keys)).toBeNull();
  });

  it('returns null for path-traversal attempts', () => {
    expect(mdUrlToKey('/../../etc/passwd.md', keys)).toBeNull();
  });

  it('works with a Map as the knownKeys argument', () => {
    const map = new Map([['salaries', 'content']]);
    expect(mdUrlToKey('/salaries.md', map)).toBe('salaries');
    expect(mdUrlToKey('/about.md', map)).toBeNull();
  });
});

describe('estimateTokens', () => {
  it('always reports at least one token', () => {
    expect(estimateTokens('')).toBe(1);
    expect(estimateTokens('a'.repeat(400))).toBe(100);
  });
});

describe('sendMarkdown', () => {
  it('sets Vary: Accept, Accept-Encoding', () => {
    const headers: Record<string, string> = {};
    const res = {
      setHeader(k: string, v: string) {
        headers[k.toLowerCase()] = v;
      },
      end() {},
    } as unknown as import('node:http').ServerResponse;
    sendMarkdown(res, 'hello');
    expect(headers['vary']).toBe('Accept, Accept-Encoding');
  });
});
