import React from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { useKnowledge } from "@/contexts/KnowledgeContext";
import { useIsMobile } from "@/hooks/use-mobile";

interface Props {
  termId: string;
  children: React.ReactNode;
}

export const TermHoverCard: React.FC<Props> = ({ termId, children }) => {
  const { getTerm, openTerm, plainEnglish } = useKnowledge();
  const isMobile = useIsMobile();
  const term = getTerm(termId);
  if (!term) return <span>{children}</span>;

  const Card = (
    <div className="space-y-3">
      <div className="flex items-start gap-3">
        <div className="text-3xl" aria-hidden>{term.icon ?? "📘"}</div>
        <div>
          <div className="font-semibold text-base leading-tight">{term.term}</div>
          <Badge variant="secondary" className="mt-1 text-[10px]">{term.category}</Badge>
        </div>
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {plainEnglish ? term.plain : term.short}
      </p>
      <button
        type="button"
        onClick={() => openTerm(termId)}
        className="text-xs font-medium text-primary inline-flex items-center gap-1 hover:underline"
      >
        Learn more <ArrowRight className="h-3 w-3" />
      </button>
    </div>
  );

  const Trigger = (
    <button type="button" className="underline decoration-dotted underline-offset-4 cursor-pointer">
      {children}
    </button>
  );

  if (isMobile) {
    return (
      <Popover>
        <PopoverTrigger asChild>{Trigger}</PopoverTrigger>
        <PopoverContent className="w-72">{Card}</PopoverContent>
      </Popover>
    );
  }

  return (
    <HoverCard>
      <HoverCardTrigger asChild>{Trigger}</HoverCardTrigger>
      <HoverCardContent className="w-80">{Card}</HoverCardContent>
    </HoverCard>
  );
};

export default TermHoverCard;