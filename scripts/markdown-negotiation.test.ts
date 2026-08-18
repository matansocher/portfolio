import { describe, expect, it } from 'vitest';
import { estimateTokens, isDocumentRequest, routeToMarkdownKey, wantsMarkdown } from './markdown-negotiation.mjs';

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
    expect(isDocumentRequest('/articles/hate-lies?x=1')).toBe(true);
  });

  it('leaves real assets alone', () => {
    expect(isDocumentRequest('/favicon.ico')).toBe(false);
    expect(isDocumentRequest('/assets/index-abc123.js')).toBe(false);
    expect(isDocumentRequest('/llms.txt')).toBe(false);
  });
});

describe('routeToMarkdownKey', () => {
  it('maps routes to markdown keys', () => {
    expect(routeToMarkdownKey('/')).toBe('index');
    expect(routeToMarkdownKey('/about')).toBe('about');
    expect(routeToMarkdownKey('/about/')).toBe('about');
    expect(routeToMarkdownKey('/articles/hate-lies?lang=en#top')).toBe('articles/hate-lies');
  });
});

describe('estimateTokens', () => {
  it('always reports at least one token', () => {
    expect(estimateTokens('')).toBe(1);
    expect(estimateTokens('a'.repeat(400))).toBe(100);
  });
});
