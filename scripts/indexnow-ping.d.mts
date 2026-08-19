export declare const INDEXNOW_KEY: string;
export declare const INDEXNOW_ENDPOINT: string;
export declare function extractUrls(sitemapXml: string): string[];
export declare function buildPayload(
  urlList: string[],
  key?: string,
): { host: string; key: string; keyLocation: string; urlList: string[] };
export declare function pingIndexNow(
  payload: { host: string; key: string; keyLocation: string; urlList: string[] },
  options?: {
    endpoint?: string;
    fetchImpl?: (url: string, init: unknown) => Promise<{ status: number }>;
  },
): Promise<number>;
