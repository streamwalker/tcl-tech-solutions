import { useState } from "react";

interface CodeBlockProps {
  code: string;
  lang?: string;
  title?: string;
}

export function CodeBlock({ code, lang, title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="my-4 overflow-hidden rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border bg-secondary/40 px-3 py-1.5">
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          {title ?? lang ?? "shell"}
        </span>
        <button
          onClick={onCopy}
          className="font-mono text-[11px] text-muted-foreground transition hover:text-primary"
        >
          {copied ? "copied" : "copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}