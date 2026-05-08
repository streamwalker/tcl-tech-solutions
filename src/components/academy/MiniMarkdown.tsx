import React from "react";

/**
 * Tiny zero-dependency markdown renderer for our lesson bodies.
 * Supports: # / ## / ### headings, paragraphs, **bold**, *italic*,
 * inline `code`, fenced ``` code blocks, bullet lists ("- "), numbered
 * lists ("1. "), simple GitHub-style tables (| col | col |), and horizontal rules (---).
 */
export const MiniMarkdown: React.FC<{ source: string; className?: string }> = ({
  source,
  className,
}) => {
  const blocks = parseBlocks(source);
  return (
    <div className={`prose prose-invert max-w-none text-foreground ${className ?? ""}`}>
      {blocks.map((b, i) => renderBlock(b, i))}
    </div>
  );
};

type Block =
  | { kind: "h"; level: 1 | 2 | 3; text: string }
  | { kind: "p"; text: string }
  | { kind: "code"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "ol"; items: string[] }
  | { kind: "table"; header: string[]; rows: string[][] }
  | { kind: "hr" };

function parseBlocks(src: string): Block[] {
  const lines = src.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i++;
      continue;
    }
    // fenced code
    if (line.startsWith("```")) {
      const buf: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        buf.push(lines[i]);
        i++;
      }
      i++; // skip closing fence
      blocks.push({ kind: "code", text: buf.join("\n") });
      continue;
    }
    // heading
    const h = /^(#{1,3})\s+(.*)$/.exec(line);
    if (h) {
      blocks.push({ kind: "h", level: h[1].length as 1 | 2 | 3, text: h[2] });
      i++;
      continue;
    }
    if (line.trim() === "---") {
      blocks.push({ kind: "hr" });
      i++;
      continue;
    }
    // table
    if (line.trim().startsWith("|") && i + 1 < lines.length && /^\s*\|[\s\-|:]+\|\s*$/.test(lines[i + 1])) {
      const header = splitRow(line);
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        rows.push(splitRow(lines[i]));
        i++;
      }
      blocks.push({ kind: "table", header, rows });
      continue;
    }
    // unordered list
    if (/^\s*-\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*-\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*-\s+/, ""));
        i++;
      }
      blocks.push({ kind: "ul", items });
      continue;
    }
    // ordered list
    if (/^\s*\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*\d+\.\s+/, ""));
        i++;
      }
      blocks.push({ kind: "ol", items });
      continue;
    }
    // paragraph (collect until blank line)
    const para: string[] = [line];
    i++;
    while (i < lines.length && lines[i].trim() && !/^(#{1,3}\s|```|\s*-\s|\s*\d+\.\s|\|)/.test(lines[i])) {
      para.push(lines[i]);
      i++;
    }
    blocks.push({ kind: "p", text: para.join(" ") });
  }
  return blocks;
}

function splitRow(line: string): string[] {
  return line
    .trim()
    .replace(/^\||\|$/g, "")
    .split("|")
    .map((s) => s.trim());
}

function renderInline(text: string): React.ReactNode {
  // escape <
  const safe = text.replace(/</g, "&lt;");
  const html = safe
    .replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 rounded bg-muted text-foreground">$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>");
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

function renderBlock(b: Block, key: number): React.ReactNode {
  switch (b.kind) {
    case "h":
      if (b.level === 1) return <h1 key={key} className="font-serif text-3xl mt-6 mb-3">{renderInline(b.text)}</h1>;
      if (b.level === 2) return <h2 key={key} className="font-serif text-2xl mt-6 mb-2 text-foreground">{renderInline(b.text)}</h2>;
      return <h3 key={key} className="font-semibold text-lg mt-4 mb-2">{renderInline(b.text)}</h3>;
    case "p":
      return <p key={key} className="leading-relaxed text-muted-foreground mb-3">{renderInline(b.text)}</p>;
    case "code":
      return (
        <pre key={key} className="bg-muted/50 border border-border rounded-lg p-3 overflow-x-auto text-xs font-mono mb-4">
          <code>{b.text}</code>
        </pre>
      );
    case "ul":
      return (
        <ul key={key} className="list-disc pl-6 space-y-1 text-muted-foreground mb-4">
          {b.items.map((it, i) => (<li key={i}>{renderInline(it)}</li>))}
        </ul>
      );
    case "ol":
      return (
        <ol key={key} className="list-decimal pl-6 space-y-1 text-muted-foreground mb-4">
          {b.items.map((it, i) => (<li key={i}>{renderInline(it)}</li>))}
        </ol>
      );
    case "hr":
      return <hr key={key} className="my-4 border-border" />;
    case "table":
      return (
        <div key={key} className="overflow-x-auto mb-4">
          <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
            <thead className="bg-muted">
              <tr>{b.header.map((h, i) => (<th key={i} className="px-3 py-2 text-left font-semibold">{renderInline(h)}</th>))}</tr>
            </thead>
            <tbody>
              {b.rows.map((r, ri) => (
                <tr key={ri} className="border-t border-border">
                  {r.map((c, ci) => (<td key={ci} className="px-3 py-2 text-muted-foreground">{renderInline(c)}</td>))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

export default MiniMarkdown;