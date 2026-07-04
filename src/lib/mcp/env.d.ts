// MCP tool files run in Deno (Supabase Edge Functions) at runtime, where
// `process.env` is available. This local ambient declaration keeps the Vite
// TS pass happy without pulling in @types/node.
declare const process: { env: Record<string, string | undefined> };