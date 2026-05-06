import React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useKnowledge } from "@/contexts/KnowledgeContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface HighlightedTermProps {
  termId: string;
  children?: React.ReactNode;
  variant?: "underline" | "pill" | "subtle";
  className?: string;
}

/**
 * Inline term that opens the GlossaryDrawer on click/tap and shows a tooltip on hover (desktop).
 */
export const HighlightedTerm: React.FC<HighlightedTermProps> = ({
  termId,
  children,
  variant = "underline",
  className,
}) => {
  const { getTerm, openTerm, plainEnglish } = useKnowledge();
  const isMobile = useIsMobile();
  const term = getTerm(termId);
  if (!term) return <span className={className}>{children ?? termId}</span>;

  const label = children ?? term.term;
  const definition = plainEnglish ? term.plain : term.short;

  const styles = {
    underline:
      "underline decoration-dotted decoration-primary/60 underline-offset-4 hover:decoration-primary cursor-pointer",
    pill:
      "inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary hover:bg-primary/15 cursor-pointer text-sm font-medium",
    subtle: "border-b border-dashed border-muted-foreground/40 hover:border-primary cursor-pointer",
  } as const;

  const trigger = (
    <button
      type="button"
      onClick={() => openTerm(termId)}
      aria-label={`Open glossary entry for ${term.term}`}
      className={cn("transition-colors text-left align-baseline inline", styles[variant], className)}
    >
      {label}
    </button>
  );

  if (isMobile) return trigger;

  return (
    <Tooltip>
      <TooltipTrigger asChild>{trigger}</TooltipTrigger>
      <TooltipContent side="top" className="max-w-xs">
        <div className="space-y-1">
          <p className="font-semibold text-sm">
            {term.icon && <span className="mr-1">{term.icon}</span>}
            {term.term}
          </p>
          <p className="text-xs leading-relaxed">{definition}</p>
          <p className="text-[10px] text-muted-foreground italic">Click for full details</p>
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

export default HighlightedTerm;