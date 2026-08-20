import { describe, expect, it } from 'vitest';
import { CONTENT_SECURITY_POLICY, SECURITY_HEADERS, applySecurityHeaders } from './security-headers.mjs';

describe('security headers', () => {
  it('builds a CSP that locks down framing, objects, and base-uri', () => {
    expect(CONTENT_SECURITY_POLICY).toContain("default-src 'self'");
    expect(CONTENT_SECURITY_POLICY).toContain("frame-ancestors 'none'");
    expect(CONTENT_SECURITY_POLICY).toContain("object-src 'none'");
    expect(CONTENT_SECURITY_POLICY).toContain("base-uri 'self'");
    expect(CONTENT_SECURITY_POLICY).toContain('upgrade-insecure-requests');
  });

  it('allows the origins the site actually loads from', () => {
    expect(CONTENT_SECURITY_POLICY).toContain('https://fonts.gstatic.com');
    expect(CONTENT_SECURITY_POLICY).toContain('https://fonts.googleapis.com');
    expect(CONTENT_SECURITY_POLICY).toContain('https://unicons.iconscout.com');
    expect(CONTENT_SECURITY_POLICY).toContain('https://storage.googleapis.com');
    expect(CONTENT_SECURITY_POLICY).toContain('https://www.google-analytics.com');
    expect(CONTENT_SECURITY_POLICY).toContain('https://dkl-portfolio-be.herokuapp.com');
  });

  it('ships the standard hardening headers', () => {
    expect(SECURITY_HEADERS['X-Content-Type-Options']).toBe('nosniff');
    expect(SECURITY_HEADERS['X-Frame-Options']).toBe('DENY');
    expect(SECURITY_HEADERS['Referrer-Policy']).toBe('strict-origin-when-cross-origin');
    expect(SECURITY_HEADERS['Strict-Transport-Security']).toContain('max-age=');
    expect(SECURITY_HEADERS['Permissions-Policy']).toContain('geolocation=()');
  });

  it('applies every header to the response', () => {
    const headers: Record<string, string> = {};
    applySecurityHeaders({ setHeader: (name: string, value: string) => void (headers[name] = value) });
    for (const name of Object.keys(SECURITY_HEADERS)) {
      expect(headers[name]).toBe(SECURITY_HEADERS[name]);
    }
  });
});
