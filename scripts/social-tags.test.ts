import { describe, expect, it } from 'vitest';
import { injectSocialTags, renderSocialTags } from './social-tags.mjs';
import type { SocialMetadata } from './social-metadata.d.mts';

const BASE = 'https://example.com';

const page: SocialMetadata = {
  title: 'Dekel Nissim',
  description: 'Product Designer & UX Researcher',
  url: 'https://example.com/',
  type: 'website',
  locale: 'en_US',
  image: { path: '/og-image.png', alt: 'Dekel Nissim', width: 1999, height: 1023 },
};

const article: SocialMetadata = {
  title: 'When an Interface Acts Like Someone You Can\u2019t Trust — Dekel Nissim',
  description: 'A bug is not only a usability problem.',
  url: 'https://example.com/articles/interface-trust-broken-verification',
  type: 'article',
  locale: 'en_US',
  publishedTime: '2026-06-22',
  tags: ['UX Design', 'Trust'],
  image: {
    path: 'https://storage.googleapis.com/dkl-portfolio/new/articles/interface-trust-broken-verification.png',
    alt: 'Trust',
  },
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
    expect(tags).toContain('<meta property="article:author" content="Dekel Nissim" />');
    expect(tags).toContain('<meta property="article:tag" content="UX Design" />');
    expect(renderSocialTags(page, BASE)).not.toContain('article:');
  });

  it('emits og:locale from the metadata locale', () => {
    expect(renderSocialTags(page, BASE)).toContain('<meta property="og:locale" content="en_US" />');
    const hebrew: SocialMetadata = { ...article, locale: 'he_IL' };
    expect(renderSocialTags(hebrew, BASE)).toContain('<meta property="og:locale" content="he_IL" />');
  });

  it('always requests a large summary card', () => {
    expect(renderSocialTags(page, BASE)).toContain('<meta name="twitter:card" content="summary_large_image" />');
  });

  it('prefers ogDescription for the card and keeps description elsewhere', () => {
    const split: SocialMetadata = { ...page, description: 'Long meta description.', ogDescription: 'Short card copy.' };
    const tags = renderSocialTags(split, BASE);
    expect(tags).toContain('<meta property="og:description" content="Short card copy." />');
    expect(tags).toContain('<meta name="twitter:description" content="Short card copy." />');
    expect(tags).not.toContain('Long meta description.');
  });

  it('falls back to description when ogDescription is absent', () => {
    expect(renderSocialTags(page, BASE)).toContain(
      '<meta property="og:description" content="Product Designer &amp; UX Researcher" />',
    );
  });
});

describe('injectSocialTags', () => {
  const shell = [
    '<head>',
    '    <title>Dekel Nissim</title>',
    '    <meta name="description" content="Dekel Nissim — Product Designer &amp; UX Researcher" />',
    '    <link rel="canonical" href="https://dekelnissim.com/" />',
    '    <!-- social-tags:start — fallback -->',
    '    <meta property="og:title" content="Dekel Nissim" />',
    '    <meta property="og:url" content="https://dekelnissim.com/" />',
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
    expect(result).toContain(
      '<link rel="canonical" href="https://example.com/articles/interface-trust-broken-verification" />',
    );
    expect(result).not.toContain('<link rel="canonical" href="https://dekelnissim.com/" />');
  });

  it('rewrites the <title> element to the route title', () => {
    const result = injectSocialTags(shell, article, BASE);
    expect(result).toContain('<title>When an Interface Acts Like Someone You Can\u2019t Trust — Dekel Nissim</title>');
    expect(result).not.toContain('<title>Dekel Nissim</title>');
  });

  it('rewrites the meta description to the route description', () => {
    const result = injectSocialTags(shell, article, BASE);
    expect(result).toContain('<meta name="description" content="A bug is not only a usability problem." />');
    expect(result).not.toContain('Product Designer');
  });

  it('injects hreflang alternates from metadata alongside the canonical link', () => {
    const withAlternates: SocialMetadata = {
      ...article,
      alternates: [
        { hreflang: 'en', href: 'https://example.com/articles/x' },
        { hreflang: 'he', href: 'https://example.com/he/articles/x' },
        { hreflang: 'x-default', href: 'https://example.com/articles/x' },
      ],
    };
    const result = injectSocialTags(shell, withAlternates, BASE);
    expect(result).toContain('<link rel="alternate" hreflang="en" href="https://example.com/articles/x" />');
    expect(result).toContain('<link rel="alternate" hreflang="he" href="https://example.com/he/articles/x" />');
    expect(result).toContain('<link rel="alternate" hreflang="x-default" href="https://example.com/articles/x" />');
  });

  it('omits hreflang alternates when metadata has none', () => {
    const result = injectSocialTags(shell, page, BASE);
    expect(result).not.toContain('rel="alternate" hreflang');
  });

  it('leaves the fallback in place when there is no metadata', () => {
    expect(injectSocialTags(shell, undefined, BASE)).toBe(shell);
  });
});
