import { auth, defineMcp } from "@lovable.dev/mcp-js";
import whoamiTool from "./tools/whoami";
import listClientsTool from "./tools/list-clients";
import listProjectsTool from "./tools/list-projects";
import listServiceOrdersTool from "./tools/list-service-orders";
import createServiceOrderTool from "./tools/create-service-order";

// Build the Supabase Auth issuer from the project ref (a build-time literal
// via Vite's define). Must be the direct supabase.co host, never the
// .lovable.cloud proxy — mcp-js verifies the discovery document.
const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "tcl-platform-mcp",
  title: "TCL Platform MCP",
  version: "0.1.0",
  instructions:
    "Tools for TCL Tech Solutions operators. Read clients, projects, and service orders, and create new service orders. All calls run as the signed-in user under row-level security.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [
    whoamiTool,
    listClientsTool,
    listProjectsTool,
    listServiceOrdersTool,
    createServiceOrderTool,
  ],
});