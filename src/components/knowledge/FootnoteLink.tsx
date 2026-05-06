import React, { createContext, useContext, useMemo, useRef } from "react";

interface FootnoteEntry { id: string; content: React.ReactNode; }
interface Ctx {
  register: (content: React.ReactNode) => { id: string; index: number };
  notes: React.MutableRefObject<FootnoteEntry[]>;
}
const FootnoteContext = createContext<Ctx | null>(null);

export const FootnoteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const notes = useRef<FootnoteEntry[]>([]);
  const counter = useRef(0);
  const register = (content: React.ReactNode) => {
    counter.current += 1;
    const id = `fn-${counter.current}`;
    if (!notes.current.find((n) => n.id === id)) {
      notes.current.push({ id, content });
    }
    return { id, index: counter.current };
  };
  return <FootnoteContext.Provider value={{ register, notes }}>{children}</FootnoteContext.Provider>;
};

export const FootnoteLink: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ctx = useContext(FootnoteContext);
  const reg = useMemo(() => ctx?.register(children), [ctx, children]);
  if (!ctx || !reg) return null;
  return (
    <sup>
      <a
        id={`ref-${reg.id}`}
        href={`#${reg.id}`}
        className="text-primary hover:underline ml-0.5 text-xs font-medium"
        aria-label={`Footnote ${reg.index}`}
      >
        [{reg.index}]
      </a>
    </sup>
  );
};

export const FootnoteList: React.FC = () => {
  const ctx = useContext(FootnoteContext);
  if (!ctx || ctx.notes.current.length === 0) return null;
  return (
    <ol className="mt-12 pt-6 border-t space-y-2 text-sm text-muted-foreground">
      {ctx.notes.current.map((n, i) => (
        <li key={n.id} id={n.id} className="flex gap-2">
          <span className="font-semibold text-primary">{i + 1}.</span>
          <span className="flex-1">
            {n.content}{" "}
            <a href={`#ref-${n.id}`} className="text-primary hover:underline" aria-label="Back to reference">
              ↩
            </a>
          </span>
        </li>
      ))}
    </ol>
  );
};