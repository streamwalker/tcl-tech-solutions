import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface DiagramNode {
  id: string;
  label: string;
  description: React.ReactNode;
  x: number; // 0-100
  y: number; // 0-100
  icon?: string;
}
export interface DiagramEdge { from: string; to: string; }

interface Props {
  nodes: DiagramNode[];
  edges?: DiagramEdge[];
  height?: number;
  className?: string;
}

export const InteractiveDiagram: React.FC<Props> = ({ nodes, edges = [], height = 360, className }) => {
  const [activeId, setActiveId] = useState<string | null>(nodes[0]?.id ?? null);
  const active = nodes.find((n) => n.id === activeId);
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <div className={cn("grid md:grid-cols-[1fr_280px] gap-4 my-6", className)}>
      <div className="relative rounded-xl border bg-gradient-to-br from-muted/40 to-background overflow-hidden" style={{ height }}>
        <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
          {edges.map((e, i) => {
            const a = byId[e.from], b = byId[e.to];
            if (!a || !b) return null;
            return (
              <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="hsl(var(--border))" strokeWidth="0.4" strokeDasharray="1,1" />
            );
          })}
        </svg>
        {nodes.map((n) => (
          <button
            key={n.id}
            onClick={() => setActiveId(n.id)}
            className={cn(
              "absolute -translate-x-1/2 -translate-y-1/2 px-3 py-2 rounded-full border-2 text-xs font-medium shadow-sm transition-all hover:scale-105",
              activeId === n.id
                ? "bg-primary text-primary-foreground border-primary shadow-md scale-105"
                : "bg-card hover:border-primary"
            )}
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
          >
            {n.icon && <span className="mr-1">{n.icon}</span>}
            {n.label}
          </button>
        ))}
      </div>
      <aside className="rounded-xl border bg-card p-4">
        {active ? (
          <>
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">Selected</div>
            <div className="font-semibold mb-2 flex items-center gap-2">
              {active.icon} {active.label}
            </div>
            <div className="text-sm text-muted-foreground leading-relaxed">{active.description}</div>
          </>
        ) : (
          <div className="text-sm text-muted-foreground">Click a node to learn more.</div>
        )}
      </aside>
    </div>
  );
};

export default InteractiveDiagram;