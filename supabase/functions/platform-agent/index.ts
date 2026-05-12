import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const tools = [
  {
    type: "function",
    function: {
      name: "list_clients",
      description: "List all clients. Optional status filter.",
      parameters: {
        type: "object",
        properties: {
          status: { type: "string", description: "Filter by status (Lead, Active, Inactive)" },
        },
      },
    },
  },
  {
    type: "function",
    function: {
      name: "create_client",
      description: "Create a new client.",
      parameters: {
        type: "object",
        properties: {
          name: { type: "string" },
          email: { type: "string" },
          phone: { type: "string" },
          address: { type: "string" },
          source: { type: "string" },
          status: { type: "string", enum: ["Lead", "Active", "Inactive"] },
        },
        required: ["name"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "update_client",
      description: "Update an existing client by ID.",
      parameters: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          email: { type: "string" },
          phone: { type: "string" },
          address: { type: "string" },
          status: { type: "string" },
          source: { type: "string" },
        },
        required: ["id"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "search_products",
      description: "Search products by name, manufacturer, model, or category.",
      parameters: {
        type: "object",
        properties: {
          query: { type: "string", description: "Search term" },
          category: { type: "string", description: "Filter by category" },
        },
      },
    },
  },
  {
    type: "function",
    function: {
      name: "list_proposals",
      description: "List proposals with optional status filter.",
      parameters: {
        type: "object",
        properties: {
          status: { type: "string", description: "Draft, Sent, Accepted, Declined" },
        },
      },
    },
  },
  {
    type: "function",
    function: {
      name: "create_proposal",
      description: "Create a new proposal.",
      parameters: {
        type: "object",
        properties: {
          title: { type: "string" },
          client_id: { type: "string" },
          labor_hours: { type: "number" },
          labor_rate: { type: "number" },
          notes: { type: "string" },
        },
        required: ["title"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "add_proposal_item",
      description: "Add a line item to a proposal.",
      parameters: {
        type: "object",
        properties: {
          proposal_id: { type: "string" },
          product_name: { type: "string" },
          qty: { type: "number" },
          unit_price: { type: "number" },
          room: { type: "string" },
        },
        required: ["proposal_id", "product_name"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "list_projects",
      description: "List projects with optional status filter.",
      parameters: {
        type: "object",
        properties: {
          status: { type: "string", description: "Planning, In Progress, Complete, On Hold" },
        },
      },
    },
  },
  {
    type: "function",
    function: {
      name: "create_project",
      description: "Create a new project.",
      parameters: {
        type: "object",
        properties: {
          title: { type: "string" },
          client_id: { type: "string" },
          budget: { type: "number" },
          start_date: { type: "string" },
          end_date: { type: "string" },
          proposal_id: { type: "string" },
        },
        required: ["title"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "update_project",
      description: "Update a project by ID.",
      parameters: {
        type: "object",
        properties: {
          id: { type: "string" },
          title: { type: "string" },
          status: { type: "string" },
          progress: { type: "number" },
          budget: { type: "number" },
          spent: { type: "number" },
          start_date: { type: "string" },
          end_date: { type: "string" },
        },
        required: ["id"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "list_service_orders",
      description: "List service orders with optional status/priority filter.",
      parameters: {
        type: "object",
        properties: {
          status: { type: "string" },
          priority: { type: "string" },
        },
      },
    },
  },
  {
    type: "function",
    function: {
      name: "create_service_order",
      description: "Create a new service order.",
      parameters: {
        type: "object",
        properties: {
          title: { type: "string" },
          description: { type: "string" },
          client_id: { type: "string" },
          priority: { type: "string", enum: ["Low", "Medium", "High", "Critical"] },
          technician: { type: "string" },
          scheduled_for: { type: "string" },
        },
        required: ["title"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "update_service_order",
      description: "Update a service order by ID.",
      parameters: {
        type: "object",
        properties: {
          id: { type: "string" },
          status: { type: "string" },
          priority: { type: "string" },
          technician: { type: "string" },
          time_spent: { type: "number" },
          scheduled_for: { type: "string" },
        },
        required: ["id"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_dashboard_stats",
      description: "Get summary stats: total clients, proposals, projects, service orders, revenue.",
      parameters: { type: "object", properties: {} },
    },
  },
];

async function executeTool(
  name: string,
  args: Record<string, unknown>,
  userId: string,
  db: ReturnType<typeof createClient>
): Promise<string> {
  try {
    switch (name) {
      case "list_clients": {
        let q = db.from("clients").select("*").eq("user_id", userId).order("created_at", { ascending: false }).limit(50);
        if (args.status) q = q.eq("status", args.status);
        const { data, error } = await q;
        if (error) return JSON.stringify({ error: error.message });
        return JSON.stringify({ clients: data, count: data?.length ?? 0 });
      }
      case "create_client": {
        const { data, error } = await db.from("clients").insert({ ...args, user_id: userId }).select().single();
        if (error) return JSON.stringify({ error: error.message });
        return JSON.stringify({ success: true, client: data });
      }
      case "update_client": {
        const { id, ...rest } = args as { id: string };
        const { data, error } = await db.from("clients").update(rest).eq("id", id).eq("user_id", userId).select().single();
        if (error) return JSON.stringify({ error: error.message });
        return JSON.stringify({ success: true, client: data });
      }
      case "search_products": {
        let q = db.from("products").select("*").eq("user_id", userId).limit(20);
        if (args.query) q = q.or(`name.ilike.%${args.query}%,manufacturer.ilike.%${args.query}%,model.ilike.%${args.query}%`);
        if (args.category) q = q.eq("category", args.category);
        const { data, error } = await q;
        if (error) return JSON.stringify({ error: error.message });
        return JSON.stringify({ products: data, count: data?.length ?? 0 });
      }
      case "list_proposals": {
        let q = db.from("proposals").select("*, proposal_items(*), clients(name)").eq("user_id", userId).order("created_at", { ascending: false }).limit(50);
        if (args.status) q = q.eq("status", args.status);
        const { data, error } = await q;
        if (error) return JSON.stringify({ error: error.message });
        return JSON.stringify({ proposals: data, count: data?.length ?? 0 });
      }
      case "create_proposal": {
        const { data, error } = await db.from("proposals").insert({ ...args, user_id: userId }).select().single();
        if (error) return JSON.stringify({ error: error.message });
        return JSON.stringify({ success: true, proposal: data });
      }
      case "add_proposal_item": {
        const { data, error } = await db.from("proposal_items").insert({ ...args, user_id: userId }).select().single();
        if (error) return JSON.stringify({ error: error.message });
        return JSON.stringify({ success: true, item: data });
      }
      case "list_projects": {
        let q = db.from("projects").select("*, clients(name)").eq("user_id", userId).order("created_at", { ascending: false }).limit(50);
        if (args.status) q = q.eq("status", args.status);
        const { data, error } = await q;
        if (error) return JSON.stringify({ error: error.message });
        return JSON.stringify({ projects: data, count: data?.length ?? 0 });
      }
      case "create_project": {
        const { data, error } = await db.from("projects").insert({ ...args, user_id: userId }).select().single();
        if (error) return JSON.stringify({ error: error.message });
        return JSON.stringify({ success: true, project: data });
      }
      case "update_project": {
        const { id, ...rest } = args as { id: string };
        const { data, error } = await db.from("projects").update(rest).eq("id", id).eq("user_id", userId).select().single();
        if (error) return JSON.stringify({ error: error.message });
        return JSON.stringify({ success: true, project: data });
      }
      case "list_service_orders": {
        let q = db.from("service_orders").select("*, clients(name)").eq("user_id", userId).order("created_at", { ascending: false }).limit(50);
        if (args.status) q = q.eq("status", args.status);
        if (args.priority) q = q.eq("priority", args.priority);
        const { data, error } = await q;
        if (error) return JSON.stringify({ error: error.message });
        return JSON.stringify({ service_orders: data, count: data?.length ?? 0 });
      }
      case "create_service_order": {
        const { data, error } = await db.from("service_orders").insert({ ...args, user_id: userId }).select().single();
        if (error) return JSON.stringify({ error: error.message });
        return JSON.stringify({ success: true, service_order: data });
      }
      case "update_service_order": {
        const { id, ...rest } = args as { id: string };
        const { data, error } = await db.from("service_orders").update(rest).eq("id", id).eq("user_id", userId).select().single();
        if (error) return JSON.stringify({ error: error.message });
        return JSON.stringify({ success: true, service_order: data });
      }
      case "get_dashboard_stats": {
        const [clients, proposals, projects, serviceOrders] = await Promise.all([
          db.from("clients").select("id, total_revenue, status", { count: "exact" }).eq("user_id", userId),
          db.from("proposals").select("id, status", { count: "exact" }).eq("user_id", userId),
          db.from("projects").select("id, status, budget, spent", { count: "exact" }).eq("user_id", userId),
          db.from("service_orders").select("id, status, priority", { count: "exact" }).eq("user_id", userId),
        ]);
        const totalRevenue = (clients.data ?? []).reduce((sum: number, c: { total_revenue: number }) => sum + Number(c.total_revenue), 0);
        const activeClients = (clients.data ?? []).filter((c: { status: string }) => c.status === "Active").length;
        const openTickets = (serviceOrders.data ?? []).filter((s: { status: string }) => s.status === "Open").length;
        return JSON.stringify({
          total_clients: clients.count ?? 0,
          active_clients: activeClients,
          total_revenue: totalRevenue,
          total_proposals: proposals.count ?? 0,
          total_projects: projects.count ?? 0,
          total_service_orders: serviceOrders.count ?? 0,
          open_tickets: openTickets,
        });
      }
      default:
        return JSON.stringify({ error: `Unknown tool: ${name}` });
    }
  } catch (e) {
    return JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" });
  }
}

const systemPrompt = `You are the TCL Platform Assistant — an AI agent embedded in the TCL Integration Platform. You help manage the entire system integration business.

You have access to tools for managing:
- **Clients**: CRM with leads, active clients, contact info, revenue tracking
- **Products**: Hardware/software product library with MSRP and dealer costs
- **Proposals**: Quotes with line items, labor hours, and client association
- **Projects**: Project tracking with budgets, progress, and tasks
- **Service Orders**: Field service tickets with priority, scheduling, and checklists
- **Dashboard Stats**: Overview of business metrics

Guidelines:
- Always confirm before creating or modifying records
- Present data in clean, readable markdown tables when listing items
- Be concise but thorough
- When creating records, confirm what was created with key details
- If a user asks about something ambiguous, ask clarifying questions
- Format currency values with $ and 2 decimal places
- Use the user's existing data — never fabricate records`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Auth
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userClient = createClient(SUPABASE_URL, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: { user }, error: userError } = await userClient.auth.getUser();
    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const userId = user.id;

    // User-scoped DB client so RLS enforces data isolation as a safety net
    // on top of the explicit user_id filters in executeTool.
    const db = userClient;

    const { messages } = await req.json();

    // AI call with tools
    let aiMessages = [{ role: "system", content: systemPrompt }, ...messages];
    const maxIterations = 5;

    for (let i = 0; i < maxIterations; i++) {
      const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: aiMessages,
          tools,
          stream: false,
        }),
      });

      if (!aiResponse.ok) {
        const status = aiResponse.status;
        const text = await aiResponse.text();
        console.error("AI gateway error:", status, text);
        if (status === 429) {
          return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again shortly." }), {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
        if (status === 402) {
          return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits." }), {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
        return new Response(JSON.stringify({ error: "AI service error" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const data = await aiResponse.json();
      const choice = data.choices[0];

      // If no tool calls, return the final text
      if (choice.finish_reason !== "tool_calls" || !choice.message.tool_calls?.length) {
        return new Response(
          JSON.stringify({ response: choice.message.content }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Execute tool calls
      aiMessages.push(choice.message);
      for (const tc of choice.message.tool_calls) {
        const args = typeof tc.function.arguments === "string" ? JSON.parse(tc.function.arguments) : tc.function.arguments;
        console.log(`Tool call: ${tc.function.name}`, args);
        const result = await executeTool(tc.function.name, args, userId, db);
        aiMessages.push({
          role: "tool",
          tool_call_id: tc.id,
          content: result,
        });
      }
    }

    return new Response(
      JSON.stringify({ response: "I've completed the maximum number of actions. Please ask a follow-up question." }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("platform-agent error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
