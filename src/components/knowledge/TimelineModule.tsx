import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useKnowledge } from "@/contexts/KnowledgeContext";

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  short: string;
  full?: React.ReactNode;
  relatedTermIds?: string[];
}

export const TimelineModule: React.FC<{ events: TimelineEvent[] }> = ({ events }) => {
  const [openId, setOpenId] = useState<string | null>(null);
  const { openTerm, getTerm } = useKnowledge();

  return (
    <ol className="relative border-l-2 border-primary/30 ml-3 my-6 space-y-6">
      {events.map((e) => {
        const open = openId === e.id;
        return (
          <li key={e.id} className="ml-6">
            <span className="absolute -left-[9px] flex h-4 w-4 items-center justify-center rounded-full bg-primary ring-4 ring-background" />
            <button
              type="button"
              onClick={() => setOpenId(open ? null : e.id)}
              className="text-left w-full"
              aria-expanded={open}
            >
              <div className="text-xs font-mono text-primary mb-1">{e.date}</div>
              <div className="font-semibold flex items-center gap-2">
                {e.title}
                {e.full && (
                  <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{e.short}</p>
            </button>
            {open && e.full && (
              <div className="mt-3 text-sm leading-relaxed border-l-2 border-muted pl-4">
                {e.full}
                {e.relatedTermIds && e.relatedTermIds.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {e.relatedTermIds.map((rid) => {
                      const r = getTerm(rid);
                      if (!r) return null;
                      return (
                        <button
                          key={rid}
                          onClick={() => openTerm(rid)}
                          className="text-xs px-2 py-1 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          {r.icon} {r.term}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
};

export default TimelineModule;