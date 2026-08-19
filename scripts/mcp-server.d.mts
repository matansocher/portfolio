import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

export interface ArticleMeta {
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  displayDate: string;
  readingTime: string;
}

export interface McpServerOptions {
  readMarkdown: (key: string) => Promise<string | null>;
  articles: ArticleMeta[];
}

export declare function buildMcpServer(opts: McpServerOptions): McpServer;
