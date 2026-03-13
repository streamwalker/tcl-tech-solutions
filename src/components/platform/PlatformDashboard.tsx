import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Package, FileText, FolderKanban, Users, Wrench, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export default function PlatformDashboard() {
  const [stats, setStats] = useState({ projects: 0, pipelineValue: 0, openOrders: 0, urgentOrders: 0, clients: 0, prospects: 0 });
  const [recentProjects, setRecentProjects] = useState<any[]>([]);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  useEffect(() => { loadDashboard(); }, []);

  const loadDashboard = async () => {
    const [{ data: projects }, { data: proposals }, { data: orders }, { data: clients }] = await Promise.all([
      supabase.from("projects").select("*, clients(name)").neq("status", "Complete").order("created_at", { ascending: false }).limit(5),
      supabase.from("proposals").select("labor_hours, labor_rate, status").neq("status", "Declined"),
      supabase.from("service_orders").select("*, clients(name)").neq("status", "Resolved").order("created_at", { ascending: false }).limit(5),
      supabase.from("clients").select("status"),
    ]);
    const pipeline = (proposals || []).reduce((s: number, p: any) => s + Number(p.labor_hours) * Number(p.labor_rate), 0);
    setStats({
      projects: (projects || []).length,
      pipelineValue: pipeline,
      openOrders: (orders || []).length,
      urgentOrders: (orders || []).filter((o: any) => o.priority === "Urgent").length,
      clients: (clients || []).length,
      prospects: (clients || []).filter((c: any) => c.status === "Prospect").length,
    });
    setRecentProjects(projects || []);
    setRecentOrders(orders || []);
  };

  const fmt = (n: number) => "$" + n.toLocaleString();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Platform Dashboard</h1>
        <p className="text-muted-foreground">TCL System Integration Suite — overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Projects</CardTitle>
            <FolderKanban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent><p className="text-2xl font-bold">{stats.projects}</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pipeline Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent><p className="text-2xl font-bold">{fmt(stats.pipelineValue)}</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Open Service Orders</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent><p className="text-2xl font-bold text-red-600">{stats.openOrders}</p><p className="text-xs text-muted-foreground">{stats.urgentOrders} urgent</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent><p className="text-2xl font-bold">{stats.clients}</p><p className="text-xs text-muted-foreground">{stats.prospects} prospects</p></CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Active Projects</CardTitle><CardDescription>Current project status</CardDescription></CardHeader>
          <CardContent className="space-y-4">
            {recentProjects.length > 0 ? recentProjects.map((p: any) => (
              <div key={p.id} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{p.title}</span>
                  <span className="text-muted-foreground">{fmt(Number(p.spent))} / {fmt(Number(p.budget))}</span>
                </div>
                <Progress value={p.progress} className="h-1.5" />
              </div>
            )) : <p className="text-sm text-muted-foreground py-4">No active projects</p>}
            <Link to="/platform/projects"><Button variant="outline" size="sm" className="w-full">View All Projects</Button></Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Recent Service Orders</CardTitle><CardDescription>Tickets requiring attention</CardDescription></CardHeader>
          <CardContent className="space-y-3">
            {recentOrders.length > 0 ? recentOrders.map((o: any) => {
              const color = o.priority === "Urgent" ? "bg-red-100 text-red-800" : o.priority === "High" ? "bg-orange-100 text-orange-800" : "bg-yellow-100 text-yellow-800";
              return (
                <div key={o.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div><p className="text-sm font-medium">{o.title}</p><p className="text-xs text-muted-foreground">{o.clients?.name || "—"}</p></div>
                  <Badge className={color}>{o.priority}</Badge>
                </div>
              );
            }) : <p className="text-sm text-muted-foreground py-4">No open service orders</p>}
            <Link to="/platform/service"><Button variant="outline" size="sm" className="w-full">View All Service Orders</Button></Link>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Quick Access</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { icon: Package, label: "Products", to: "/platform/products" },
              { icon: Users, label: "Clients", to: "/platform/clients" },
              { icon: FileText, label: "Proposals", to: "/platform/proposals" },
              { icon: FolderKanban, label: "Projects", to: "/platform/projects" },
              { icon: Wrench, label: "Service", to: "/platform/service" },
            ].map((m) => (
              <Link key={m.label} to={m.to}>
                <Button variant="outline" className="h-20 w-full flex-col gap-2">
                  <m.icon className="h-6 w-6" /><span>{m.label}</span>
                </Button>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
