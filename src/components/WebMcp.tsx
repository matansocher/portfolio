import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { buildWebMcpTools } from '@/webmcpTools';

// Registers WebMCP tools so AI agents can discover and act on the site.
// Spec: https://webmachinelearning.github.io/webmcp/
// Supports both the current spec (`document.modelContext.registerTool`) and the
// earlier draft (`navigator.modelContext.provideContext`). Renders nothing.
export default function WebMcp() {
  const navigate = useNavigate();

  useEffect(() => {
    const modelContext = document.modelContext ?? navigator.modelContext;
    if (!modelContext) return;

    const controller = new AbortController();
    const tools = buildWebMcpTools({ navigate: (path) => navigate(path) });

    if (typeof modelContext.registerTool === 'function') {
      for (const tool of tools) {
        modelContext.registerTool(tool, { signal: controller.signal }).catch(() => {
          // A tool with the same name may already be registered; ignore.
        });
      }
    } else if (typeof modelContext.provideContext === 'function') {
      Promise.resolve(modelContext.provideContext({ tools })).catch(() => {
        // Older draft form; ignore failures so the page keeps working.
      });
    }

    return () => controller.abort();
  }, [navigate]);

  return null;
}
