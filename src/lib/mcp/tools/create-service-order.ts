import { createClient } from "@supabase/supabase-js";
import { defineTool, type ToolContext } from "@lovable.dev/mcp-js";
import { z } from "zod";

declare const process: { env: Record<string, string | undefined> };

export default defineTool({
  name: "create_service_order",
  title: "Create service order",
  description: "Create a new service order (support/install ticket) for the signed-in operator.",
  inputSchema: {
    title: z.string().trim().min(1).describe("Short title of the ticket."),
    description: z.string().optional().describe("Detailed description of the issue or work."),
    priority: z.enum(["low", "medium", "high", "urgent"]).optional(),
    client_id: z.string().uuid().optional().describe("Optional client UUID to link the ticket to."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
  handler: async ({ title, description, priority, client_id }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
      global: { headers: { Authorization: `Bearer ${ctx.getToken()}` } },
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { data, error } = await supabase
      .from("service_orders")
      .insert({
        user_id: ctx.getUserId(),
        title,
        description: description ?? null,
        priority: priority ?? "medium",
        status: "open",
        client_id: client_id ?? null,
      })
      .select()
      .single();
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: `Created service order ${data.id}` }],
      structuredContent: { service_order: data },
    };
  },
});