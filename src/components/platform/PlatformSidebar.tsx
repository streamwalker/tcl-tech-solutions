import { Package, FileText, FolderKanban, Users, Wrench, LayoutDashboard, Bot, TrendingUp } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

const modules = [
  { title: "Dashboard", url: "/platform", icon: LayoutDashboard },
  { title: "Product Library", url: "/platform/products", icon: Package },
  { title: "Clients", url: "/platform/clients", icon: Users },
  { title: "Proposals", url: "/platform/proposals", icon: FileText },
  { title: "Projects", url: "/platform/projects", icon: FolderKanban },
  { title: "Service Orders", url: "/platform/service", icon: Wrench },
];

interface PlatformSidebarProps {
  onToggleAgent: () => void;
  agentOpen: boolean;
}

export function PlatformSidebar({ onToggleAgent, agentOpen }: PlatformSidebarProps) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  const isActive = (url: string) =>
    url === "/platform"
      ? location.pathname === "/platform"
      : location.pathname.startsWith(url);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-border px-4 py-3">
        {!collapsed && (
          <div>
            <h2 className="text-sm font-bold text-foreground tracking-wide">TCL PLATFORM</h2>
            <p className="text-xs text-muted-foreground">System Integration Suite</p>
          </div>
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Modules</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {modules.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                  >
                    <Link to={item.url}>
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-border p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={onToggleAgent} isActive={agentOpen}>
              <Bot className="h-4 w-4" />
              {!collapsed && <span>AI Agent</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
