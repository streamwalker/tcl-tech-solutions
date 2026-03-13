import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, DollarSign, Clock, CheckCircle2 } from "lucide-react";

interface Project {
  id: string;
  title: string;
  client: string;
  status: "Planning" | "In Progress" | "Punch List" | "Complete";
  budget: number;
  spent: number;
  startDate: string;
  endDate: string;
  progress: number;
  tasks: { name: string; done: boolean }[];
}

const mockProjects: Project[] = [
  {
    id: "PRJ-001", title: "Johnson Whole-Home Automation", client: "Johnson Family", status: "In Progress",
    budget: 52100, spent: 34200, startDate: "2026-02-20", endDate: "2026-04-15", progress: 65,
    tasks: [
      { name: "Pre-wire rough-in", done: true }, { name: "Equipment rack build", done: true },
      { name: "Controller programming", done: false }, { name: "Trim-out & device install", done: false },
      { name: "Client walkthrough", done: false },
    ],
  },
  {
    id: "PRJ-002", title: "TechCorp Conference AV", client: "TechCorp Inc.", status: "Planning",
    budget: 78980, spent: 5200, startDate: "2026-03-15", endDate: "2026-05-01", progress: 10,
    tasks: [
      { name: "Site survey", done: true }, { name: "Engineering drawings", done: false },
      { name: "Equipment procurement", done: false }, { name: "Installation", done: false },
      { name: "Commissioning", done: false },
    ],
  },
  {
    id: "PRJ-003", title: "Chen Dental Office Network", client: "Dr. Robert Chen", status: "Punch List",
    budget: 18500, spent: 17200, startDate: "2026-01-10", endDate: "2026-03-15", progress: 92,
    tasks: [
      { name: "Network design", done: true }, { name: "Cable runs", done: true },
      { name: "Switch & AP install", done: true }, { name: "VLAN configuration", done: true },
      { name: "Final testing", done: false },
    ],
  },
  {
    id: "PRJ-004", title: "Sunset Ridge Security Upgrade", client: "Sunset Ridge HOA", status: "Complete",
    budget: 42000, spent: 39800, startDate: "2025-11-01", endDate: "2026-02-28", progress: 100,
    tasks: [
      { name: "Camera placement design", done: true }, { name: "Conduit & cable", done: true },
      { name: "Camera install", done: true }, { name: "NVR setup", done: true },
      { name: "Client training", done: true },
    ],
  },
];

const statusColors: Record<string, string> = {
  Planning: "bg-yellow-100 text-yellow-800",
  "In Progress": "bg-blue-100 text-blue-800",
  "Punch List": "bg-orange-100 text-orange-800",
  Complete: "bg-green-100 text-green-800",
};

const phases = ["Planning", "In Progress", "Punch List", "Complete"] as const;

export default function ProjectTracker() {
  const [view, setView] = useState<"board" | "list">("board");
  const [selected, setSelected] = useState<Project | null>(null);
  const fmt = (n: number) => "$" + n.toLocaleString();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Project Tracker</h1>
          <p className="text-muted-foreground">Manage projects from planning to completion</p>
        </div>
        <Tabs value={view} onValueChange={(v) => setView(v as "board" | "list")}>
          <TabsList><TabsTrigger value="board">Board</TabsTrigger><TabsTrigger value="list">List</TabsTrigger></TabsList>
        </Tabs>
      </div>

      {view === "board" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {phases.map((phase) => (
            <div key={phase} className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge className={statusColors[phase]}>{phase}</Badge>
                <span className="text-xs text-muted-foreground">({mockProjects.filter(p => p.status === phase).length})</span>
              </div>
              {mockProjects.filter((p) => p.status === phase).map((project) => (
                <Card key={project.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelected(project)}>
                  <CardContent className="p-4 space-y-3">
                    <p className="font-medium text-sm">{project.title}</p>
                    <p className="text-xs text-muted-foreground">{project.client}</p>
                    <Progress value={project.progress} className="h-1.5" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{project.progress}%</span>
                      <span>{fmt(project.spent)} / {fmt(project.budget)}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {mockProjects.map((p) => (
            <Card key={p.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelected(p)}>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Badge className={statusColors[p.status]}>{p.status}</Badge>
                  <div>
                    <p className="font-medium">{p.title}</p>
                    <p className="text-sm text-muted-foreground">{p.client}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <div className="w-32"><Progress value={p.progress} className="h-1.5" /></div>
                  <span className="text-muted-foreground">{fmt(p.spent)} / {fmt(p.budget)}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{selected?.title}</DialogTitle></DialogHeader>
          {selected && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge className={statusColors[selected.status]}>{selected.status}</Badge>
                <span className="text-sm text-muted-foreground">{selected.client}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-muted-foreground" />{selected.startDate} → {selected.endDate}</div>
                <div className="flex items-center gap-2"><DollarSign className="h-4 w-4 text-muted-foreground" />{fmt(selected.spent)} / {fmt(selected.budget)}</div>
              </div>
              <div>
                <Progress value={selected.progress} className="h-2 mb-1" />
                <p className="text-xs text-muted-foreground text-right">{selected.progress}% complete</p>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Tasks</p>
                <div className="space-y-2">
                  {selected.tasks.map((t, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className={`h-4 w-4 ${t.done ? "text-green-600" : "text-muted-foreground/30"}`} />
                      <span className={t.done ? "line-through text-muted-foreground" : ""}>{t.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              {selected.budget > 0 && (
                <div className="p-3 bg-muted/50 rounded-lg flex justify-between text-sm">
                  <span className="text-muted-foreground">Budget remaining</span>
                  <span className={`font-bold ${selected.budget - selected.spent > 0 ? "text-green-600" : "text-destructive"}`}>{fmt(selected.budget - selected.spent)}</span>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
