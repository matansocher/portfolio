import type { ServerResponse } from 'node:http';

export declare function wantsMarkdown(acceptHeader: string | undefined): boolean;
export declare function isDocumentRequest(url: string): boolean;
export declare function routeToMarkdownKey(url: string): string;
export declare function estimateTokens(markdown: string): number;
export declare function sendMarkdown(res: ServerResponse, markdown: string): void;
