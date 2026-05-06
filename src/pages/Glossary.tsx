import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import IBMNavigation from "@/components/IBMNavigation";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { glossary, glossaryCategories, type GlossaryCategory } from "@/data/glossary";
import { useKnowledge } from "@/contexts/KnowledgeContext";
import { ConceptCard, PlainEnglishToggle, BreadcrumbContext } from "@/components/knowledge";

const Glossary: React.FC = () => {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [activeCats, setActiveCats] = useState<GlossaryCategory[]>([]);
  const { openTerm } = useKnowledge();

  useEffect(() => {
    const t = params.get("term");
    if (t) openTerm(t);
  }, [params, openTerm]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return glossary.filter((g) => {
      if (activeCats.length > 0 && !activeCats.includes(g.category)) return false;
      if (!q) return true;
      return (
        g.term.toLowerCase().includes(q) ||
        g.short.toLowerCase().includes(q) ||
        g.full.toLowerCase().includes(q) ||
        g.tags?.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [query, activeCats]);

  const toggleCat = (c: GlossaryCategory) =>
    setActiveCats((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));

  return (
    <div className="min-h-screen flex flex-col">
      <IBMNavigation />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        <BreadcrumbContext items={[{ label: "Home", href: "/" }, { label: "Knowledge", href: "/knowledge" }, { label: "Glossary" }]} />
        <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold">Glossary</h1>
            <p className="text-muted-foreground mt-2 max-w-2xl">
              A searchable reference for every technical, business, and lore term used across the TCL universe.
            </p>
          </div>
          <PlainEnglishToggle />
        </div>

        <div className="mt-8 sticky top-16 z-10 bg-background/80 backdrop-blur py-3 -mx-2 px-2 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search terms, descriptions, tags…"
              className="pl-9"
              aria-label="Search glossary"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {glossaryCategories.map((c) => {
              const active = activeCats.includes(c);
              const count = glossary.filter((g) => g.category === c).length;
              if (count === 0) return null;
              return (
                <button
                  key={c}
                  onClick={() => toggleCat(c)}
                  className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                    active
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card hover:bg-secondary"
                  }`}
                >
                  {c} <span className="opacity-60">({count})</span>
                </button>
              );
            })}
            {activeCats.length > 0 && (
              <Button variant="ghost" size="sm" onClick={() => setActiveCats([])}>
                Clear filters
              </Button>
            )}
          </div>
        </div>

        <div className="mt-6 text-sm text-muted-foreground">
          {filtered.length} term{filtered.length === 1 ? "" : "s"}
        </div>

        {filtered.length === 0 ? (
          <div className="mt-10 text-center text-muted-foreground border border-dashed rounded-xl p-10">
            No matching terms.
          </div>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((g) => (
              <ConceptCard key={g.id} termId={g.id} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Glossary;