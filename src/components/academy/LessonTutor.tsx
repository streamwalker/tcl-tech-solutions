import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Send, Loader2, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { MiniMarkdown } from "@/components/academy/MiniMarkdown";

interface Msg { role: "user" | "assistant"; content: string; }

interface Props {
  courseTitle: string;
  chapterTitle: string;
  lessonTitle: string;
  lessonBody: string;
}

export const LessonTutor: React.FC<Props> = ({ courseTitle, chapterTitle, lessonTitle, lessonBody }) => {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: `Hi! I'm ClawdBot, your AI tutor for "${lessonTitle}". Ask me anything — I can re-explain concepts, generate practice problems, or walk through worked examples.` },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  const sendText = async (text: string) => {
    if (!text.trim() || busy) return;
    const userMsg: Msg = { role: "user", content: text.trim() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setBusy(true);
    try {
      const { data, error } = await supabase.functions.invoke("academy-tutor", {
        body: {
          courseTitle,
          chapterTitle,
          lessonTitle,
          lessonBody,
          history: [...messages, userMsg].slice(-10),
        },
      });
      if (error) throw new Error((data as any)?.error || error.message);
      if ((data as any)?.error) throw new Error((data as any).error);
      const reply = data?.reply ?? "(no response)";
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch (e: any) {
      toast.error("Tutor error", { description: e?.message ?? "Could not reach tutor." });
    } finally {
      setBusy(false);
    }
  };

  const send = () => sendText(input);

  const quickPrompts = [
    "Explain this lesson step by step",
    "Give me a worked example",
    "Quiz me with 3 practice problems",
    "Re-explain in plain English",
  ];

  return (
    <Card className="border-primary/30 bg-card/60">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Bot className="h-4 w-4 text-primary" /> ClawdBot — Lesson Tutor
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div ref={scrollRef} className="space-y-2 max-h-96 overflow-y-auto pr-1">
          {messages.map((m, i) => (
            <div key={i} className={`text-sm rounded-lg px-3 py-2 ${m.role === "user" ? "bg-primary/10 ml-6" : "bg-muted/60 mr-6"}`}>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">{m.role === "user" ? "You" : "ClawdBot"}</div>
              {m.role === "assistant"
                ? <MiniMarkdown source={m.content} className="prose-sm" />
                : <div className="whitespace-pre-wrap">{m.content}</div>}
            </div>
          ))}
          {busy && (
            <div className="text-sm text-muted-foreground flex items-center gap-2">
              <Loader2 className="h-3 w-3 animate-spin" /> Thinking…
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {quickPrompts.map((p) => (
            <Button key={p} type="button" size="sm" variant="outline" className="h-7 text-xs"
              disabled={busy} onClick={() => sendText(p)}>
              <Sparkles className="h-3 w-3 mr-1" />{p}
            </Button>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Ask about this lesson…"
            disabled={busy}
            autoFocus
          />
          <Button size="icon" onClick={send} disabled={busy}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LessonTutor;