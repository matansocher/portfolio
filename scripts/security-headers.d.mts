export interface SecurityHeaderTarget {
  setHeader(name: string, value: string): unknown;
}

export declare const CONTENT_SECURITY_POLICY: string;
export declare const SECURITY_HEADERS: Record<string, string>;
export declare function applySecurityHeaders(res: SecurityHeaderTarget): void;
