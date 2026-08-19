// RFC 8288 Link response headers, so agents can discover machine-readable
// descriptions of the site without parsing the SPA shell.

export const LINK_HEADER = '</llms.txt>; rel="describedby"; type="text/plain", </manifest.json>; rel="manifest"';

// Only HTML documents carry the header — static assets (js/css/images) do not.
export function shouldSendLinkHeader(pathname) {
  const lastSegment = pathname.slice(pathname.lastIndexOf('/') + 1);
  return !lastSegment.includes('.') || lastSegment.endsWith('.html');
}

export function applyLinkHeader(res, url) {
  const { pathname } = new URL(url || '/', 'http://localhost');
  if (shouldSendLinkHeader(pathname)) {
    res.setHeader('Link', LINK_HEADER);
  }
}
