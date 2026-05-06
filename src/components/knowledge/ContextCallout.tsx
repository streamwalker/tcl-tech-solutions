import React from "react";
import {
  Lightbulb,
  AlertTriangle,
  Info,
  BookOpen,
  Wrench,
  Sparkles,
  Star,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type CalloutKind =
  | "simple"
  | "why"
  | "context"
  | "lore"
  | "technical"
  | "warning"
  | "example"
  | "behind";

const CONFIG: Record<
  CalloutKind,
  { label: string; Icon: React.ComponentType<{ className?: string }>; tone: string }
> = {
  simple: { label: "In Simple Terms", Icon: Sparkles, tone: "border-primary/40 bg-primary/5 text-foreground" },
  why: { label: "Why This Matters", Icon: Star, tone: "border-amber-500/40 bg-amber-500/5" },
  context: { label: "Important Context", Icon: Info, tone: "border-blue-500/40 bg-blue-500/5" },
  lore: { label: "Story Lore", Icon: BookOpen, tone: "border-purple-500/40 bg-purple-500/5" },
  technical: { label: "Technical Note", Icon: Wrench, tone: "border-slate-500/40 bg-slate-500/5" },
  warning: { label: "Warning", Icon: AlertTriangle, tone: "border-destructive/50 bg-destructive/5" },
  example: { label: "Example", Icon: Lightbulb, tone: "border-emerald-500/40 bg-emerald-500/5" },
  behind: { label: "Behind the Concept", Icon: HelpCircle, tone: "border-indigo-500/40 bg-indigo-500/5" },
};

interface Props {
  kind?: CalloutKind;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const ContextCallout: React.FC<Props> = ({ kind = "context", title, children, className }) => {
  const cfg = CONFIG[kind];
  return (
    <aside
      role="note"
      aria-label={cfg.label}
      className={cn("border rounded-lg p-4 my-4 flex gap-3", cfg.tone, className)}
    >
      <cfg.Icon className="h-5 w-5 mt-0.5 shrink-0" aria-hidden />
      <div className="flex-1 min-w-0">
        <div className="text-[11px] uppercase tracking-wider font-bold mb-1 opacity-80">
          {title ?? cfg.label}
        </div>
        <div className="text-sm leading-relaxed">{children}</div>
      </div>
    </aside>
  );
};

export default ContextCallout;