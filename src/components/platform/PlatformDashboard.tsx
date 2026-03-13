import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Package, FileText, FolderKanban, Users, Wrench, TrendingUp, DollarSign, Clock } from "lucide-react";
import { Link } from "react-router-dom";

export default function PlatformDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Platform Dashboard</h1>
        <p className="text-muted-foreground">TCL System Integration Suite — overview</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Projects</CardTitle>
            <FolderKanban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent><p className="text-2xl font-bold">3</p><p className="text-xs text-muted-foreground">1 in punch list</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pipeline Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent><p className="text-2xl font-bold">$142,480</p><p className="text-xs text-green-600">+18% this month</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Open Service Orders</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent><p className="text-2xl font-bold text-red-600">3</p><p className="text-xs text-muted-foreground">1 urgent</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent><p className="text-2xl font-bold">6</p><p className="text-xs text-muted-foreground">2 prospects</p></CardContent>
        </Card>
      </div>

      {/* Quick Access */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Active Projects</CardTitle>
            <CardDescription>Current project status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "Johnson Whole-Home Automation", progress: 65, budget: "$34.2K / $52.1K" },
              { name: "TechCorp Conference AV", progress: 10, budget: "$5.2K / $79.0K" },
              { name: "Chen Dental Office Network", progress: 92, budget: "$17.2K / $18.5K" },
            ].map((p, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{p.name}</span>
                  <span className="text-muted-foreground">{p.budget}</span>
                </div>
                <Progress value={p.progress} className="h-1.5" />
              </div>
            ))}
            <Link to="/platform/projects"><Button variant="outline" size="sm" className="w-full">View All Projects</Button></Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Service Orders</CardTitle>
            <CardDescription>Tickets requiring attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { title: "Security camera offline", client: "Sunset Ridge HOA", priority: "Urgent", color: "bg-red-100 text-red-800" },
              { title: "WiFi dead zones", client: "Johnson Family", priority: "High", color: "bg-orange-100 text-orange-800" },
              { title: "Lutron dimmer not responding", client: "Dr. Robert Chen", priority: "Medium", color: "bg-yellow-100 text-yellow-800" },
            ].map((s, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div>
                  <p className="text-sm font-medium">{s.title}</p>
                  <p className="text-xs text-muted-foreground">{s.client}</p>
                </div>
                <Badge className={s.color}>{s.priority}</Badge>
              </div>
            ))}
            <Link to="/platform/service"><Button variant="outline" size="sm" className="w-full">View All Service Orders</Button></Link>
          </CardContent>
        </Card>
      </div>

      {/* Module Quick Links */}
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
                  <m.icon className="h-6 w-6" />
                  <span>{m.label}</span>
                </Button>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
