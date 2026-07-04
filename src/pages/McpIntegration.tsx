import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Copy, ExternalLink, ArrowLeft, Bot, Shield, Zap } from "lucide-react";
import Footer from "@/components/Footer";

const MCP_URL = "https://earjplippbonusveefjh.supabase.co/functions/v1/mcp";

const tools = [
  { name: "whoami", desc: "Verify which TCL operator the connection is authenticated as." },
  { name: "list_clients", desc: "List clients owned by the signed-in operator." },
  { name: "list_projects", desc: "List installation/integration projects, optionally filtered by status." },
  { name: "list_service_orders", desc: "List service orders (tickets) newest first, optionally filtered by status." },
  { name: "create_service_order", desc: "Create a new service order for the signed-in operator." },
];

const clients = [
  {
    name: "ChatGPT",
    badge: "OpenAI",
    steps: [
      "Open ChatGPT (a plan that supports custom connectors is required).",
      "Go to Settings → Connectors → Add custom connector.",
      "Paste the TCL MCP server URL below and choose OAuth as the auth method.",
      "Sign in with your TCL operator account and approve the consent screen.",
    ],
  },
  {
    name: "Claude",
    badge: "Anthropic",
    steps: [
      "Open Claude → Settings → Connectors → Add custom connector.",
      "Paste the TCL MCP server URL and continue.",
      "Sign in with your TCL operator account and approve on the consent screen.",
      "Return to Claude — the TCL tools appear in the tool picker.",
    ],
  },
  {
    name: "Cursor",
    badge: "IDE",
    steps: [
      "Open Cursor Settings → MCP → Add server.",
      "Choose HTTP transport and paste the TCL MCP server URL.",
      "Follow the browser prompt to sign in and approve.",
      "Tools appear in Cursor's Composer/Chat.",
    ],
  },
];

export default function McpIntegration() {
  const [copied, setCopied] = useState(false);

  const copyUrl = async () => {
    await navigator.clipboard.writeText(MCP_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container max-w-4xl mx-auto px-4 py-10">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>

        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground mb-3">
            <Bot className="h-3.5 w-3.5" />
            Agent Integrations
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-3">
            Connect your AI assistant to TCL
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            The TCL Platform exposes a Model Context Protocol (MCP) server so external AI
            assistants can read your clients, projects, and service orders, and open new
            tickets — securely, as you, under row-level security.
          </p>
        </div>

        {/* MCP URL card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">MCP server URL</CardTitle>
            <CardDescription>
              Paste this into your AI client when adding a custom MCP connector.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-2">
              <code className="flex-1 rounded-md border border-border bg-muted px-3 py-2 text-sm font-mono break-all">
                {MCP_URL}
              </code>
              <Button onClick={copyUrl} variant="outline" className="shrink-0">
                {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 text-sm">
              <div className="flex items-start gap-2">
                <Shield className="h-4 w-4 mt-0.5 text-primary" />
                <div>
                  <div className="font-medium text-foreground">OAuth 2.1</div>
                  <div className="text-muted-foreground text-xs">
                    Sign-in per user; no tokens to copy.
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Zap className="h-4 w-4 mt-0.5 text-primary" />
                <div>
                  <div className="font-medium text-foreground">Streamable HTTP</div>
                  <div className="text-muted-foreground text-xs">
                    MCP spec 2025-06-18.
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Bot className="h-4 w-4 mt-0.5 text-primary" />
                <div>
                  <div className="font-medium text-foreground">RLS-scoped</div>
                  <div className="text-muted-foreground text-xs">
                    Every call runs as the signed-in operator.
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Consent flow */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">How the consent flow works</CardTitle>
            <CardDescription>
              What you and your users will see the first time an AI client connects.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-4 text-sm">
              {[
                {
                  t: "Add the connector",
                  d: "In your AI client, add a custom MCP connector and paste the TCL MCP URL above.",
                },
                {
                  t: "Sign in to TCL",
                  d: "The client opens a browser window. Sign in with the same TCL operator account you use for the platform.",
                },
                {
                  t: "Approve on the consent screen",
                  d: "You'll land on /.lovable/oauth/consent showing the requesting app's name. Click Approve to grant it access.",
                },
                {
                  t: "Start using tools",
                  d: "The client receives a short-lived OAuth token and can now call the TCL MCP tools as you. No keys or passwords are shared.",
                },
              ].map((s, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold">
                    {i + 1}
                  </span>
                  <div>
                    <div className="font-medium text-foreground">{s.t}</div>
                    <div className="text-muted-foreground">{s.d}</div>
                  </div>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        {/* Clients */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Supported clients</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {clients.map((c) => (
              <Card key={c.name}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{c.name}</CardTitle>
                    <Badge variant="secondary">{c.badge}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                    {c.steps.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Tools */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">Available tools</CardTitle>
            <CardDescription>
              All tools run under your account's row-level security policies.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="divide-y divide-border">
              {tools.map((t) => (
                <li key={t.name} className="py-3 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                  <code className="text-sm font-mono text-primary shrink-0">{t.name}</code>
                  <span className="text-sm text-muted-foreground">{t.desc}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/auth">Sign in to TCL</Link>
          </Button>
          <Button asChild variant="outline">
            <a
              href="https://modelcontextprotocol.io/specification/2025-06-18/basic/transports"
              target="_blank"
              rel="noreferrer"
            >
              MCP spec
              <ExternalLink className="h-4 w-4 ml-1" />
            </a>
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}