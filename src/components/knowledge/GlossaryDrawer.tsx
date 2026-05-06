import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink, Volume2 } from "lucide-react";
import { useKnowledge } from "@/contexts/KnowledgeContext";
import { Link } from "react-router-dom";
import { PronunciationButton } from "./PronunciationButton";

export const GlossaryDrawer: React.FC = () => {
  const { openTermId, closeTerm, getTerm, openTerm, plainEnglish } = useKnowledge();
  const term = openTermId ? getTerm(openTermId) : null;

  return (
    <Sheet open={!!term} onOpenChange={(o) => !o && closeTerm()}>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
        {term && (
          <div className="space-y-6">
            <SheetHeader>
              <div className="flex items-center gap-3">
                <div className="text-4xl" aria-hidden>{term.icon ?? "📘"}</div>
                <div className="flex-1">
                  <SheetTitle className="flex items-center gap-2 text-2xl">
                    {term.term}
                    {term.pronunciation && <PronunciationButton text={term.term} hint={term.pronunciation} />}
                  </SheetTitle>
                  <Badge variant="secondary" className="mt-1">{term.category}</Badge>
                </div>
              </div>
              <SheetDescription className="text-base">
                {plainEnglish ? term.plain : term.short}
              </SheetDescription>
            </SheetHeader>

            {term.image && (
              <img src={term.image} alt={term.term} className="w-full rounded-lg border" />
            )}

            <Section label="Full explanation">
              <p className="text-sm leading-relaxed text-muted-foreground">{term.full}</p>
            </Section>

            {!plainEnglish && (
              <Section label="In simple terms">
                <p className="text-sm leading-relaxed">{term.plain}</p>
              </Section>
            )}

            {term.example && (
              <Section label="Example usage">
                <p className="text-sm italic text-muted-foreground border-l-2 border-primary pl-3">
                  {term.example}
                </p>
              </Section>
            )}

            {term.whyItMatters && (
              <Section label="Why it matters">
                <p className="text-sm leading-relaxed">{term.whyItMatters}</p>
              </Section>
            )}

            {term.related && term.related.length > 0 && (
              <Section label="Related concepts">
                <div className="flex flex-wrap gap-2">
                  {term.related.map((rid) => {
                    const r = getTerm(rid);
                    if (!r) return null;
                    return (
                      <button
                        key={rid}
                        onClick={() => openTerm(rid)}
                        className="inline-flex items-center gap-1 px-3 py-1 text-xs rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        {r.icon} {r.term} <ArrowRight className="h-3 w-3" />
                      </button>
                    );
                  })}
                </div>
              </Section>
            )}

            <div className="pt-2 border-t flex gap-2">
              <Button asChild variant="outline" size="sm" className="flex-1">
                <Link to={`/glossary?term=${term.id}`} onClick={closeTerm}>
                  Full glossary entry <ExternalLink className="h-3 w-3 ml-1" />
                </Link>
              </Button>
              {term.link && (
                <Button asChild size="sm" className="flex-1">
                  <Link to={term.link} onClick={closeTerm}>Open page</Link>
                </Button>
              )}
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

const Section: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div>
    <div className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground mb-2">
      {label}
    </div>
    {children}
  </div>
);

export default GlossaryDrawer;