// Baseline security response headers, shared by the production server (server.js) and
// the Vite dev/preview servers (vite.config.ts) so the two cannot drift. Plain .mjs so
// both a Node server and the Vite config can import it.
//
// The Content-Security-Policy is derived from the origins the site actually loads from:
//   - Google Fonts stylesheet + font files (fonts.googleapis.com / fonts.gstatic.com)
//   - Unicons icon-font CSS + font files (unicons.iconscout.com)
//   - Client/case-study images on the GCS CDN (storage.googleapis.com)
//   - Google Analytics 4 via react-ga4 (googletagmanager.com / google-analytics.com)
//   - The contact-form backend (dkl-portfolio-be.herokuapp.com)
// If any of those origins change, update the matching directive here.

const CSP_DIRECTIVES = {
  'default-src': ["'self'"],
  'base-uri': ["'self'"],
  // GA injects gtag.js from googletagmanager and beacons to google-analytics. The two
  // inline JSON-LD <script type="application/ld+json"> blocks (site-wide in the shell and
  // per-article) are not executable, but script-src still gates them, so 'unsafe-inline'
  // is required for them to be accepted.
  'script-src': ["'self'", "'unsafe-inline'", 'https://www.googletagmanager.com', 'https://www.google-analytics.com'],
  // Google Fonts + Unicons ship their CSS from these hosts; component-level inline style
  // attributes are not covered by CSP, but Vite injects <style> tags so 'unsafe-inline'
  // is needed for styling to apply.
  'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com', 'https://unicons.iconscout.com'],
  'font-src': ["'self'", 'https://fonts.gstatic.com', 'https://unicons.iconscout.com'],
  'img-src': ["'self'", 'data:', 'https://storage.googleapis.com', 'https://www.google-analytics.com'],
  'connect-src': [
    "'self'",
    'https://dkl-portfolio-be.herokuapp.com',
    'https://www.google-analytics.com',
    'https://www.googletagmanager.com',
  ],
  'manifest-src': ["'self'"],
  'object-src': ["'none'"],
  'frame-ancestors': ["'none'"],
  'form-action': ["'self'"],
  'upgrade-insecure-requests': [],
};

export const CONTENT_SECURITY_POLICY = Object.entries(CSP_DIRECTIVES)
  .map(([directive, values]) => (values.length ? `${directive} ${values.join(' ')}` : directive))
  .join('; ');

// Applied to every response. frame-ancestors 'none' in the CSP is the modern clickjacking
// control; X-Frame-Options is kept for older browsers that ignore it.
export const SECURITY_HEADERS = {
  'Content-Security-Policy': CONTENT_SECURITY_POLICY,
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  // Tell browsers to stick to HTTPS for two years, including subdomains. Only meaningful
  // over TLS; harmless on plain-HTTP localhost since browsers ignore it there.
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
};

export function applySecurityHeaders(res) {
  for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
    res.setHeader(name, value);
  }
}
