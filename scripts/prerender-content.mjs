// Renders the same route -> markdown map used for `Accept: text/markdown` into
// semantic HTML, so crawlers that fetch `Accept: text/html` (most of them - only
// Googlebot reliably executes JS) also see real content instead of an empty shell.
//
// `marked` was picked over hand-rolling this: it's a single well-maintained
// dependency (no transitive deps), used dev-only (never shipped to the browser
// bundle - the client already renders markdown itself via `react-markdown`), and
// handles the headings/lists/links/emphasis this repo's content actually uses
// without any config.

import { marked } from 'marked';

marked.setOptions({ gfm: true });

/**
 * @param {Map<string, string>} routes route key -> markdown, from buildMarkdownRoutes()
 * @returns {Map<string, string>} route key -> rendered HTML fragment (no wrapping tags)
 */
export function buildPrerenderRoutes(routes) {
  const rendered = new Map();
  for (const [key, markdown] of routes) {
    rendered.set(key, marked.parse(markdown.trim()));
  }
  return rendered;
}
