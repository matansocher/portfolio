import { describe, expect, it } from 'vitest';
import { injectSocialTags, renderSocialTags } from './social-tags.mjs';
import type { SocialMetadata } from './social-metadata.d.mts';

const BASE = 'https://example.com';

const page: SocialMetadata = {
  title: 'Dekel Nissim',
  description: 'Product Designer & UX Researcher',
  url: 'https://example.com/',
  type: 'website',
  image: { path: '/og-image.png', alt: 'Dekel Nissim', width: 1999, height: 1023 },
};

const article: SocialMetadata = {
  title: 'When an Interface Acts Like Someone You Can\u2019t Trust — Dekel Nissim',
  description: 'A bug is not only a usability problem.',
  url: 'https://example.com/articles/interface-trust-broken-verification',
  type: 'article',
  publishedTime: '2026-06-22',
  tags: ['UX Design', 'Trust'],
  image: { path: 'https://storage.googleapis.com/dkl-portfolio/new/articles/interface-trust-broken-verification.png', alt: 'Trust' },
};

describe('renderSocialTags', () => {
  it('resolves a relative image path against the origin', () => {
    const tags = renderSocialTags(page, BASE);
    expect(tags).toContain('<meta property="og:image" content="https://example.com/og-image.png" />');
    expect(tags).toContain('<meta name="twitter:image" content="https://example.com/og-image.png" />');
  });

  it('leaves an absolute CDN image URL untouched', () => {
    expect(renderSocialTags(article, BASE)).toContain(
      '<meta property="og:image" content="https://storage.googleapis.com/dkl-portfolio/new/articles/interface-trust-broken-verification.png" />',
    );
  });

  it('escapes characters that would break out of the attribute', () => {
    const hostile: SocialMetadata = {
      ...page,
      title: 'Quote " and <script> & ampersand',
      image: { path: '/og-image.png', alt: "Tom's card" },
    };
    const tags = renderSocialTags(hostile, BASE);
    expect(tags).toContain('content="Quote &quot; and &lt;script&gt; &amp; ampersand"');
    expect(tags).toContain('content="Tom&#39;s card"');
    expect(tags).not.toContain('<script>');
  });

  it('declares dimensions only when they are known', () => {
    expect(renderSocialTags(page, BASE)).toContain('<meta property="og:image:width" content="1999" />');
    expect(renderSocialTags(article, BASE)).not.toContain('og:image:width');
  });

  it('emits article metadata only for articles', () => {
    const tags = renderSocialTags(article, BASE);
    expect(tags).toContain('<meta property="og:type" content="article" />');
    expect(tags).toContain('<meta property="article:published_time" content="2026-06-22" />');
    expect(tags).toContain('<meta property="article:tag" content="UX Design" />');
    expect(renderSocialTags(page, BASE)).not.toContain('article:');
  });

  it('always requests a large summary card', () => {
    expect(renderSocialTags(page, BASE)).toContain('<meta name="twitter:card" content="summary_large_image" />');
  });
});

describe('injectSocialTags', () => {
  const shell = [
    '<head>',
    '    <link rel="canonical" href="https://dkl-portfolio.herokuapp.com/" />',
    '    <!-- social-tags:start — fallback -->',
    '    <meta property="og:title" content="Dekel Nissim" />',
    '    <meta property="og:url" content="https://dkl-portfolio.herokuapp.com/" />',
    '    <!-- social-tags:end -->',
    '</head>',
  ].join('\n');

  it('replaces the whole fallback block so no duplicate og: tags remain', () => {
    const result = injectSocialTags(shell, article, BASE);
    expect(result).not.toContain('social-tags:start');
    expect(result).not.toContain('social-tags:end');
    expect(result.match(/property="og:title"/g)).toHaveLength(1);
    expect(result.match(/property="og:url"/g)).toHaveLength(1);
    expect(result).toContain('content="https://example.com/articles/interface-trust-broken-verification"');
  });

  it('rewrites the canonical link to the requested route', () => {
    const result = injectSocialTags(shell, article, BASE);
    expect(result).toContain('<link rel="canonical" href="https://example.com/articles/interface-trust-broken-verification" />');
    expect(result).not.toContain('<link rel="canonical" href="https://dkl-portfolio.herokuapp.com/" />');
  });

  it('leaves the fallback in place when there is no metadata', () => {
    expect(injectSocialTags(shell, undefined, BASE)).toBe(shell);
  });
});
