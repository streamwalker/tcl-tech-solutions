import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, DollarSign, CheckCircle2, Plus, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ProjectTask { id: string; name: string; done: boolean; }
interface Project {
  id: string; title: string; status: string; budget: number; spent: number;
  progress: number; start_date: string | null; end_date: string | null;
  client_id: string | null; clients?: { name: string } | null;
  project_tasks?: ProjectTask[];
}
interface ClientOption { id: string; name: string; }

const statusColors: Record<string, string> = {
  Planning: "bg-yellow-100 text-yellow-800",
  "In Progress": "bg-blue-100 text-blue-800",
  "Punch List": "bg-orange-100 text-orange-800",
  Complete: "bg-green-100 text-green-800",
};
const phases = ["Planning", "In Progress", "Punch List", "Complete"] as const;

export default function ProjectTracker() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [clientOptions, setClientOptions] = useState<ClientOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"board" | "list">("board");
  const [selected, setSelected] = useState<Project | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ title: "", clientId: "", budget: "0", status: "Planning", startDate: "", endDate: "" });
  const { toast } = useToast();

  useEffect(() => { load(); }, []);

  const load = async () => {
    setLoading(true);
    const [{ data: p }, { data: c }] = await Promise.all([
      supabase.from("projects").select("*, clients(name), project_tasks(*)").order("created_at", { ascending: false }),
      supabase.from("clients").select("id, name").order("name"),
    ]);
    setProjects((p as Project[]) || []);
    setClientOptions((c as ClientOption[]) || []);
    setLoading(false);
  };

  const handleCreate = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from("projects").insert({
      user_id: user.id, title: form.title, client_id: form.clientId || null,
      budget: parseFloat(form.budget) || 0, status: form.status,
      start_date: form.startDate || null, end_date: form.endDate || null,
    });
    setSaving(false);
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Project created" });
    setShowCreate(false);
    setForm({ title: "", clientId: "", budget: "0", status: "Planning", startDate: "", endDate: "" });
    load();
  };

  const fmt = (n: number) => "$" + Number(n).toLocaleString();

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Project Tracker</h1>
          <p className="text-muted-foreground">Manage projects from planning to completion</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setShowCreate(true)}><Plus className="h-4 w-4 mr-2" />New Project</Button>
          <Tabs value={view} onValueChange={(v) => setView(v as "board" | "list")}>
            <TabsList><TabsTrigger value="board">Board</TabsTrigger><TabsTrigger value="list">List</TabsTrigger></TabsList>
          </Tabs>
        </div>
      </div>

      {view === "board" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {phases.map((phase) => (
            <div key={phase} className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge className={statusColors[phase]}>{phase}</Badge>
                <span className="text-xs text-muted-foreground">({projects.filter(p => p.status === phase).length})</span>
              </div>
              {projects.filter((p) => p.status === phase).map((project) => (
                <Card key={project.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelected(project)}>
                  <CardContent className="p-4 space-y-3">
                    <p className="font-medium text-sm">{project.title}</p>
                    <p className="text-xs text-muted-foreground">{project.clients?.name || "—"}</p>
                    <Progress value={project.progress} className="h-1.5" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{project.progress}%</span>
                      <span>{fmt(project.spent)} / {fmt(project.budget)}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {projects.filter(p => p.status === phase).length === 0 && (
                <div className="text-center py-8 text-xs text-muted-foreground border border-dashed rounded-lg">No projects</div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((p) => (
            <Card key={p.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelected(p)}>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Badge className={statusColors[p.status] || ""}>{p.status}</Badge>
                  <div><p className="font-medium">{p.title}</p><p className="text-sm text-muted-foreground">{p.clients?.name || "—"}</p></div>
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <div className="w-32"><Progress value={p.progress} className="h-1.5" /></div>
                  <span className="text-muted-foreground">{fmt(p.spent)} / {fmt(p.budget)}</span>
                </div>
              </CardContent>
            </Card>
          ))}
          {projects.length === 0 && <div className="text-center py-12 text-muted-foreground">No projects yet</div>}
        </div>
      )}

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{selected?.title}</DialogTitle></DialogHeader>
          {selected && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge className={statusColors[selected.status] || ""}>{selected.status}</Badge>
                <span className="text-sm text-muted-foreground">{selected.clients?.name || "—"}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-muted-foreground" />{selected.start_date || "TBD"} → {selected.end_date || "TBD"}</div>
                <div className="flex items-center gap-2"><DollarSign className="h-4 w-4 text-muted-foreground" />{fmt(selected.spent)} / {fmt(selected.budget)}</div>
              </div>
              <div><Progress value={selected.progress} className="h-2 mb-1" /><p className="text-xs text-muted-foreground text-right">{selected.progress}% complete</p></div>
              {(selected.project_tasks || []).length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">Tasks</p>
                  <div className="space-y-2">
                    {(selected.project_tasks || []).map((t) => (
                      <div key={t.id} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className={`h-4 w-4 ${t.done ? "text-green-600" : "text-muted-foreground/30"}`} />
                        <span className={t.done ? "line-through text-muted-foreground" : ""}>{t.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {selected.budget > 0 && (
                <div className="p-3 bg-muted/50 rounded-lg flex justify-between text-sm">
                  <span className="text-muted-foreground">Budget remaining</span>
                  <span className={`font-bold ${Number(selected.budget) - Number(selected.spent) > 0 ? "text-green-600" : "text-destructive"}`}>{fmt(Number(selected.budget) - Number(selected.spent))}</span>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent>
          <DialogHeader><DialogTitle>Create New Project</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Title</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Project title" /></div>
            <div><Label>Client</Label>
              <Select value={form.clientId} onValueChange={(v) => setForm({ ...form, clientId: v })}>
                <SelectTrigger><SelectValue placeholder="Select client" /></SelectTrigger>
                <SelectContent>{clientOptions.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div><Label>Budget ($)</Label><Input type="number" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Start Date</Label><Input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} /></div>
              <div><Label>End Date</Label><Input type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} /></div>
            </div>
            <Button className="w-full" onClick={handleCreate} disabled={saving || !form.title}>{saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}Create Project</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
