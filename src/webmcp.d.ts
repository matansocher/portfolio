// Ambient types for the experimental WebMCP API.
// Spec: https://webmachinelearning.github.io/webmcp/
// The API is still behind a flag / early-preview, so these declarations are
// intentionally minimal and cover both the current spec (`document.modelContext`
// with `registerTool`) and the earlier draft (`navigator.modelContext` with
// `provideContext`).

interface WebMcpToolAnnotations {
  readOnlyHint?: boolean;
  untrustedContentHint?: boolean;
}

interface WebMcpToolDefinition {
  name: string;
  title?: string;
  description: string;
  inputSchema?: object;
  annotations?: WebMcpToolAnnotations;
  execute: (inputObject: Record<string, unknown>) => unknown | Promise<unknown>;
}

interface WebMcpRegisterToolOptions {
  exposedTo?: string[];
  signal?: AbortSignal;
}

interface WebMcpModelContext {
  // Current spec (imperative form).
  registerTool?: (tool: WebMcpToolDefinition, options?: WebMcpRegisterToolOptions) => Promise<void>;
  // Earlier draft form.
  provideContext?: (context: { tools: WebMcpToolDefinition[] }) => void | Promise<void>;
}

interface Document {
  readonly modelContext?: WebMcpModelContext;
}

interface Navigator {
  readonly modelContext?: WebMcpModelContext;
}
