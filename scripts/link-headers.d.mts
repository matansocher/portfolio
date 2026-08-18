export interface LinkHeaderTarget {
  setHeader(name: string, value: string): unknown;
}

export declare const LINK_HEADER: string;
export declare function shouldSendLinkHeader(pathname: string): boolean;
export declare function applyLinkHeader(res: LinkHeaderTarget, url: string | undefined): void;
