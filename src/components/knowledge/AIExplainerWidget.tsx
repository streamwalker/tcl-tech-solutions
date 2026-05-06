import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Sparkles, Send } from "lucide-react";
import { glossary } from "@/data/glossary";
import { useKnowledge } from "@/contexts/KnowledgeContext";
import { cn } from "@/lib/utils";

interface Msg { role: "user" | "assistant"; content: string; termIds?: string[]; }

const SUGGESTIONS = [
  "What does this mean?",
  "Explain this in simple terms.",
  "Where does this concept fit?",
  "What is related to this?",
  "Why does this matter?",
];

function findMatches(q: string) {
  const lower = q.toLowerCase();
  return glossary.filter(
    (g) =>
      lower.includes(g.term.toLowerCase()) ||
      g.tags?.some((t) => lower.includes(t.toLowerCase())) ||
      g.term.toLowerCase().split(/\s+/).some((w) => w.length > 2 && lower.includes(w))
  );
}

function generateAnswer(q: string, plain: boolean): Msg {
  const lower = q.toLowerCase();
  const matches = findMatches(q);
  if (matches.length === 0) {
    return {
      role: "assistant",
      content:
        "I couldn't find a matching term in the glossary yet. Try asking about TCL, Josh.ai, OmniCode, RLS, MSRP, or Capital Stack.",
    };
  }
  const m = matches[0];
  let content: string;
  if (lower.includes("simple") || lower.includes("plain")) {
    content = `${m.term}: ${m.plain}`;
  } else if (lower.includes("why")) {
    content = `${m.term} matters because — ${m.whyItMatters ?? m.short}`;
  } else if (lower.includes("related")) {
    const rels = (m.related ?? []).map((id) => glossary.find((g) => g.id === id)?.term).filter(Boolean).join(", ");
    content = rels ? `Related to ${m.term}: ${rels}.` : `No related terms recorded for ${m.term}.`;
  } else if (lower.includes("fit") || lower.includes("where")) {
    content = `${m.term} sits in the "${m.category}" part of TCL's knowledge graph. ${m.short}`;
  } else {
    content = plain ? `${m.term}: ${m.plain}` : `${m.term}: ${m.short}`;
  }
  return { role: "assistant", content, termIds: matches.slice(0, 3).map((x) => x.id) };
}

export const AIExplainerWidget: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Hi — I'm the TCL knowledge assistant. Ask me about any term on this page (e.g. \"What is OmniCode?\" or \"Explain RLS in simple terms\").",
    },
  ]);
  const { plainEnglish, openTerm } = useKnowledge();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, open]);

  const ask = (q: string) => {
    if (!q.trim()) return;
    setMsgs((prev) => [...prev, { role: "user", content: q }]);
    setInput("");
    setTimeout(() => {
      setMsgs((prev) => [...prev, generateAnswer(q, plainEnglish)]);
    }, 350);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Open knowledge assistant"
        className={cn(
          "fixed bottom-5 right-5 z-50 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-xl flex items-center justify-center hover:scale-105 transition-transform",
          open && "scale-90"
        )}
      >
        {open ? <X className="h-6 w-6" /> : <Sparkles className="h-6 w-6" />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-5 z-50 w-[calc(100vw-2.5rem)] sm:w-96 max-h-[70vh] rounded-2xl border bg-card shadow-2xl flex flex-col overflow-hidden">
          <div className="px-4 py-3 border-b bg-gradient-to-r from-primary/10 to-transparent">
            <div className="flex items-center gap-2 font-semibold">
              <MessageCircle className="h-4 w-4 text-primary" /> Knowledge Assistant
            </div>
            <div className="text-[11px] text-muted-foreground">Ask about any term on this page</div>
          </div>
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {msgs.map((m, i) => (
              <div key={i} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed",
                    m.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  )}
                >
                  {m.content}
                  {m.termIds && m.termIds.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {m.termIds.map((id) => (
                        <button
                          key={id}
                          onClick={() => openTerm(id)}
                          className="text-[11px] px-2 py-0.5 rounded-full bg-background/40 hover:bg-background/60 transition-colors"
                        >
                          Open →
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t p-2 space-y-2">
            <div className="flex gap-1 overflow-x-auto pb-1">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => ask(s)}
                  className="text-[11px] whitespace-nowrap px-2 py-1 rounded-full border bg-background hover:bg-secondary"
                >
                  {s}
                </button>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                ask(input);
              }}
              className="flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question…"
                className="h-9"
              />
              <Button type="submit" size="sm" className="h-9">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AIExplainerWidget;