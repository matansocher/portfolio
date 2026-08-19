// Renders Open Graph / Twitter Card tags and injects them into the built SPA shell.
// Kept separate from social-metadata.mjs so the server can inject without importing
// anything under src/ at runtime.

const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

// Values come from article titles and excerpts, which contain apostrophes and could
// contain quotes or angle brackets. Unescaped, those would terminate the attribute.
function escapeAttribute(value) {
  return String(value).replace(/[&<>"']/g, (char) => ESCAPES[char]);
}

function meta(attribute, name, content) {
  return `<meta ${attribute}="${escapeAttribute(name)}" content="${escapeAttribute(content)}" />`;
}

/**
 * @param {object} metadata one entry from buildSocialMetadata()
 * @param {string} baseUrl absolute origin, used to resolve relative image paths
 * @returns {string} the tag block, newline-separated and indented to match index.html
 */
export function renderSocialTags(metadata, baseUrl) {
  const image = metadata.image;
  // og:image must be absolute; relative paths are ignored by most consumers.
  const imageUrl = image.path.startsWith('http') ? image.path : `${baseUrl}${image.path}`;

  const tags = [
    meta('property', 'og:type', metadata.type),
    meta('property', 'og:site_name', 'Dekel Nissim'),
    meta('property', 'og:title', metadata.title),
    meta('property', 'og:description', metadata.description),
    meta('property', 'og:url', metadata.url),
    meta('property', 'og:image', imageUrl),
    meta('property', 'og:image:alt', image.alt),
  ];

  // Only the bundled default card has known dimensions. Declaring them lets clients
  // reserve layout space before the image loads; guessing them for CDN images would
  // make cards render at the wrong aspect ratio.
  if (image.width && image.height) {
    tags.push(meta('property', 'og:image:width', image.width), meta('property', 'og:image:height', image.height));
  }

  tags.push(meta('property', 'og:locale', 'en_US'));

  if (metadata.type === 'article') {
    tags.push(meta('property', 'article:published_time', metadata.publishedTime));
    tags.push(meta('property', 'article:author', 'Dekel Nissim'));
    for (const tag of metadata.tags ?? []) {
      tags.push(meta('property', 'article:tag', tag));
    }
  }

  tags.push(
    meta('name', 'twitter:card', 'summary_large_image'),
    meta('name', 'twitter:title', metadata.title),
    meta('name', 'twitter:description', metadata.description),
    meta('name', 'twitter:image', imageUrl),
    meta('name', 'twitter:image:alt', image.alt),
  );

  return tags.join('\n    ');
}

// Delimited block in the built HTML that per-route tags replace wholesale. index.html
// ships home-page tags between these markers so previews still work if injection is
// bypassed; replacing the entire block (rather than inserting after it) is what keeps
// scrapers from seeing duplicate og: tags and picking the fallback.
const BLOCK_PATTERN = /[ \t]*<!-- social-tags:start[\s\S]*?social-tags:end -->/;

/**
 * Swaps the fallback block for this route's tags, and rewrites the canonical link so it
 * points at the requested page rather than the home page baked into index.html.
 */
export function injectSocialTags(html, metadata, baseUrl) {
  if (!metadata) {
    return html;
  }
  return html
    .replace(BLOCK_PATTERN, `    ${renderSocialTags(metadata, baseUrl)}`)
    .replace(
      /<link rel="canonical" href="[^"]*" \/>/,
      `<link rel="canonical" href="${escapeAttribute(metadata.url)}" />`,
    )
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeAttribute(metadata.title)}</title>`)
    .replace(
      /<meta name="description" content="[^"]*" \/>/,
      `<meta name="description" content="${escapeAttribute(metadata.description)}" />`,
    );
}
