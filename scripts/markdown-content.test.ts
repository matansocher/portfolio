import { describe, expect, it } from 'vitest';
import { buildLlmsFullTxt, buildLlmsTxt } from './markdown-content.mjs';

const BASE = 'https://example.com';

function makeRoutes(extra: Record<string, string> = {}): Map<string, string> {
  return new Map<string, string>([
    ['index', '# Home\n\nWelcome.'],
    ['about', '# About\n\nDetails.'],
    ['salaries', '# Salaries\n\nCase study.'],
    ['articles/my-post', '# My Post\n\nBody text.'],
    ...Object.entries(extra),
  ]);
}

describe('buildLlmsTxt', () => {
  it('links to .md URLs for all pages', () => {
    const result = buildLlmsTxt(makeRoutes(), BASE);
    expect(result).toContain('https://example.com/index.md');
    expect(result).toContain('https://example.com/about.md');
    expect(result).toContain('https://example.com/salaries.md');
    expect(result).toContain('https://example.com/articles/my-post.md');
  });

  it('mentions .md URL access method near the top', () => {
    const result = buildLlmsTxt(makeRoutes(), BASE);
    const topSection = result.split('## Pages')[0];
    expect(topSection).toMatch(/\.md/);
  });

  it('includes link to llms-full.txt', () => {
    const result = buildLlmsTxt(makeRoutes(), BASE);
    expect(result).toContain('llms-full.txt');
  });
});

describe('buildLlmsFullTxt', () => {
  it('starts with the llms.txt header', () => {
    const routes = makeRoutes();
    const full = buildLlmsFullTxt(routes, BASE);
    const header = buildLlmsTxt(routes, BASE);
    expect(full.startsWith(header)).toBe(true);
  });

  it('contains the full markdown content of every route', () => {
    const routes = makeRoutes();
    const full = buildLlmsFullTxt(routes, BASE);
    for (const markdown of routes.values()) {
      expect(full).toContain(markdown.trim());
    }
  });

  it('uses separators between sections', () => {
    const full = buildLlmsFullTxt(makeRoutes(), BASE);
    expect(full).toContain('---');
  });

  it('labels each section with its route', () => {
    const full = buildLlmsFullTxt(makeRoutes(), BASE);
    expect(full).toContain('# Source: /salaries');
    expect(full).toContain('# Source: /articles/my-post');
    // Home maps to the root path
    expect(full).toContain('# Source: /');
  });
});
