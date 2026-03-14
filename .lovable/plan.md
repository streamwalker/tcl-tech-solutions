

# TCL Platform AI Agent — Sidebar Chat with Full Platform Control

Build an AI agent embedded in the platform sidebar that can read and write all platform data (clients, products, proposals, projects, service orders) via natural language commands.

## Architecture

```text
┌─────────────────────────────────────────────────┐
│  PlatformLayout                                 │
│  ┌──────────┬──────────────────┬──────────────┐ │
│  │ Sidebar  │  Main Content    │ Agent Panel  │ │
│  │ (nav)    │  (routes)        │ (chat)       │ │
│  │          │                  │ resizable    │ │
│  └──────────┴──────────────────┴──────────────┘ │
└─────────────────────────────────────────────────┘
         ↕ Supabase functions.invoke()
┌─────────────────────────────────────────────────┐
│  Edge Function: platform-agent                  │
│  - Lovable AI Gateway (gemini-3-flash-preview)  │
│  - Tool-calling for CRUD operations             │
│  - Supabase service role for DB access          │
└─────────────────────────────────────────────────┘
```

## Components

### 1. Edge Function: `supabase/functions/platform-agent/index.ts`
- Receives user message + conversation history + authenticated user ID
- Defines tools the AI can call:
  - `list_clients`, `create_client`, `update_client`
  - `list_products`, `search_products`
  - `list_proposals`, `create_proposal`, `add_proposal_item`
  - `list_projects`, `create_project`, `update_project`
  - `list_service_orders`, `create_service_order`, `update_service_order`
  - `get_dashboard_stats`
- Uses Lovable AI Gateway with tool-calling; executes tool calls against the database using the service role client scoped to the user's data
- Streams responses back via SSE for real-time token rendering
- System prompt defines the agent as "TCL Platform Assistant" with knowledge of all modules

### 2. Agent Panel: `src/components/platform/AgentPanel.tsx`
- Collapsible right-side panel in the platform layout (toggle via a bot icon in the header)
- Streaming chat interface with markdown rendering (install `react-markdown`)
- Shows tool call results inline (e.g., "Created client: John Smith")
- Quick action buttons: "Show pipeline", "List open tickets", "Create proposal"
- Persists conversation in component state (resets on navigation away)

### 3. Layout Update: `src/components/platform/PlatformLayout.tsx`
- Add agent panel toggle button in the header
- Render `AgentPanel` as a right-side panel alongside main content
- Use CSS transition for smooth open/close

### 4. Sidebar Update: `src/components/platform/PlatformSidebar.tsx`
- Add "AI Agent" menu item at the bottom linking to the panel toggle

## Dependencies
- Add `react-markdown` package for rendering AI responses
- `LOVABLE_API_KEY` — needs to be enabled via the AI gateway tool

## Database
No schema changes needed. The edge function queries existing tables using the service role, filtered by the authenticated user's ID.

## Security
- Edge function validates the JWT from the Authorization header to extract user ID
- All DB queries filter by `user_id` matching the authenticated user
- Service role is used only within the edge function, never exposed to client

