import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { PlatformSidebar } from "./PlatformSidebar";
import { AgentPanel } from "./AgentPanel";
import { AgentProvider } from "./AgentContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Bot } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";

interface PlatformLayoutProps {
  children: React.ReactNode;
}

export function PlatformLayout({ children }: PlatformLayoutProps) {
  const navigate = useNavigate();
  const [agentOpen, setAgentOpen] = useState(false);

  return (
    <AgentProvider>
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <PlatformSidebar onToggleAgent={() => setAgentOpen((o) => !o)} agentOpen={agentOpen} />
          <div className="flex-1 flex flex-col min-w-0">
            <header className="h-12 flex items-center border-b border-border bg-card px-4 justify-between">
              <div className="flex items-center gap-2">
                <SidebarTrigger />
                <span className="text-sm font-medium text-muted-foreground">TCL Integration Platform</span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={agentOpen ? "default" : "outline"}
                  size="sm"
                  onClick={() => setAgentOpen((o) => !o)}
                >
                  <Bot className="h-4 w-4 mr-1" />
                  Agent
                </Button>
                <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Home
                </Button>
              </div>
            </header>
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 flex overflow-hidden">
                <main className="flex-1 p-6 overflow-auto">
                  {children}
                </main>
                <AgentPanel open={agentOpen} onClose={() => setAgentOpen(false)} />
              </div>
              <Footer />
            </div>
          </div>
        </div>
      </SidebarProvider>
    </AgentProvider>
  );
}
