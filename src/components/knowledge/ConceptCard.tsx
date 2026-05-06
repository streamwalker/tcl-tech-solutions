import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { useKnowledge } from "@/contexts/KnowledgeContext";

interface Props {
  termId?: string;
  term?: string;
  short?: string;
  icon?: string;
  category?: string;
  onLearnMore?: () => void;
}

export const ConceptCard: React.FC<Props> = ({ termId, term, short, icon, category, onLearnMore }) => {
  const { getTerm, openTerm } = useKnowledge();
  const entry = termId ? getTerm(termId) : null;
  const title = entry?.term ?? term ?? "";
  const desc = entry?.short ?? short ?? "";
  const ic = entry?.icon ?? icon ?? "📘";
  const cat = entry?.category ?? category;

  return (
    <Card className="group hover:border-primary/60 transition-all hover:shadow-md">
      <CardContent className="p-5 space-y-3">
        <div className="flex items-start justify-between">
          <div className="text-3xl" aria-hidden>{ic}</div>
          {cat && <Badge variant="secondary" className="text-[10px]">{cat}</Badge>}
        </div>
        <div>
          <h4 className="font-semibold leading-tight">{title}</h4>
          <p className="text-sm text-muted-foreground mt-1 leading-relaxed line-clamp-3">{desc}</p>
        </div>
        <button
          type="button"
          onClick={() => (onLearnMore ? onLearnMore() : termId && openTerm(termId))}
          className="text-xs font-medium text-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all"
        >
          Learn more <ArrowRight className="h-3 w-3" />
        </button>
      </CardContent>
    </Card>
  );
};

export default ConceptCard;