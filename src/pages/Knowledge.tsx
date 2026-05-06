import React from "react";
import IBMNavigation from "@/components/IBMNavigation";
import Footer from "@/components/Footer";
import {
  HighlightedTerm,
  TooltipDefinition,
  RichPopover,
  TermHoverCard,
  PlainEnglishToggle,
  ExplainerAccordion,
  ContextCallout,
  ConceptCard,
  ComparisonTable,
  ReadMoreSection,
  FAQBlock,
  TimelineModule,
  BreadcrumbContext,
  VideoExplainer,
  PronunciationButton,
  WhyItMattersPanel,
  AnnotatedImage,
  InteractiveDiagram,
  FootnoteLink,
  FootnoteList,
  FootnoteProvider,
} from "@/components/knowledge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useKnowledge } from "@/contexts/KnowledgeContext";
import { glossary } from "@/data/glossary";

const Section: React.FC<{ id: string; title: string; eyebrow?: string; children: React.ReactNode }> = ({
  id,
  title,
  eyebrow,
  children,
}) => (
  <section id={id} className="scroll-mt-20 py-10 border-t">
    {eyebrow && (
      <div className="text-[11px] uppercase tracking-widest text-primary font-semibold mb-2">{eyebrow}</div>
    )}
    <h2 className="text-2xl sm:text-3xl font-bold mb-4">{title}</h2>
    <div className="prose-sm max-w-none">{children}</div>
  </section>
);

const Knowledge: React.FC = () => {
  const { plainEnglish } = useKnowledge();
  return (
    <div className="min-h-screen flex flex-col">
      <IBMNavigation />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        <FootnoteProvider>
          <BreadcrumbContext items={[{ label: "Home", href: "/" }, { label: "Knowledge" }]} />

          <header className="mt-6 flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="text-[11px] uppercase tracking-widest text-primary font-semibold mb-2">
                Interactive Knowledge Layer
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold leading-tight">Context & Explanation System</h1>
              <p className="mt-3 text-lg text-muted-foreground max-w-2xl">
                Hover, tap, and explore. Every highlighted term opens a layered explanation — from a one-line
                tooltip to a full glossary entry with examples and related concepts.
              </p>
            </div>
            <PlainEnglishToggle />
          </header>

          <ContextCallout kind="simple">
            Try this: hover any <HighlightedTerm termId="omnicode" /> term on desktop, or tap on mobile. Click for the
            full side panel.
          </ContextCallout>

          <Section id="terms" title="Highlighted terms" eyebrow="01">
            <p>
              <HighlightedTerm termId="tcl" /> is a veteran-owned integration brand whose flagship voice platform is{" "}
              <HighlightedTerm termId="josh-ai" />. Underneath it all sits{" "}
              <HighlightedTerm termId="omnicode" />, the engine that powers our{" "}
              <HighlightedTerm termId="clawdbot">in-platform AI agent</HighlightedTerm>.
            </p>
            <p className="mt-3">
              Variants: <HighlightedTerm termId="msrp" variant="pill" /> as a pill,{" "}
              <HighlightedTerm termId="dealer-cost" variant="subtle" /> as subtle.
            </p>
          </Section>

          <Section id="tooltip" title="Tooltips & popovers" eyebrow="02 / 03">
            <p>
              Quick tooltips work great for short, one-line context — like{" "}
              <TooltipDefinition text="Application Programming Interface — how systems talk to each other.">
                APIs
              </TooltipDefinition>{" "}
              or{" "}
              <TooltipDefinition text="A protected, encrypted connection between two networks.">
                VPN
              </TooltipDefinition>
              .
            </p>
            <p className="mt-3">
              Need more room? Use a{" "}
              <RichPopover
                title="What is a Bill of Materials?"
                trigger={
                  <button className="underline decoration-dotted underline-offset-4 text-primary">rich popover</button>
                }
              >
                <p>A Bill of Materials (BoM) lists every product needed for a project.</p>
                <ul className="list-disc pl-5">
                  <li>SKU and manufacturer</li>
                  <li>Quantity per room</li>
                  <li>Dealer cost &amp; MSRP</li>
                </ul>
                <Link to="/platform" className="text-primary hover:underline">
                  See it in the Platform →
                </Link>
              </RichPopover>
              .
            </p>
          </Section>

          <Section id="hover-card" title="Hover cards" eyebrow="04">
            <p>
              Premium previews for important entities. Hover (or tap){" "}
              <TermHoverCard termId="josh-ai">Josh.ai</TermHoverCard>,{" "}
              <TermHoverCard termId="control4">Control4</TermHoverCard>, or{" "}
              <TermHoverCard termId="lutron">Lutron</TermHoverCard> to preview.
            </p>
          </Section>

          <Section id="callouts" title="Callout boxes" eyebrow="10">
            <ContextCallout kind="why">TCL's edge is the integration of voice, lighting, AV, and control under one design language.</ContextCallout>
            <ContextCallout kind="context">Most terms here belong to multiple categories — that's by design.</ContextCallout>
            <ContextCallout kind="lore">Internally we call our agent "OpenClaw," but visitors meet it as ClawdBot.</ContextCallout>
            <ContextCallout kind="technical">RLS policies route every Platform query through <code>has_role(auth.uid(), 'admin')</code>.</ContextCallout>
            <ContextCallout kind="warning">Never store roles on the profiles table — it leads to privilege escalation.</ContextCallout>
            <ContextCallout kind="example">"Set the dining room for dinner" dims lights, lowers shades, and starts a playlist.</ContextCallout>
            <ContextCallout kind="behind">Plain English mode is an opinionated rewrite, not a translation.</ContextCallout>
          </Section>

          <Section id="why-it-matters" title="Why it matters panel" eyebrow="23">
            <WhyItMattersPanel>
              The knowledge layer turns every page into a self-teaching experience. Visitors don't have to leave
              for a glossary, a docs site, or an AI chat — they discover context exactly where it's needed.
            </WhyItMattersPanel>
          </Section>

          <Section id="concept-cards" title="Concept cards" eyebrow="14">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 not-prose">
              {["josh-ai", "omnicode", "clawdbot", "platform-suite", "rls", "capital-stack"].map((id) => (
                <ConceptCard key={id} termId={id} />
              ))}
            </div>
          </Section>

          <Section id="comparison" title="Comparison tables" eyebrow="15">
            <ComparisonTable
              caption="Pricing concepts"
              rows={[
                {
                  term: "Dealer Cost",
                  meaning: "Wholesale price the integrator pays.",
                  plain: "What we pay the manufacturer.",
                  related: "MSRP",
                  whyItMatters: "Sets the floor for project margin.",
                },
                {
                  term: "MSRP",
                  meaning: "Manufacturer Suggested Retail Price.",
                  plain: "The sticker price for the customer.",
                  related: "Dealer Cost",
                  whyItMatters: "Anchors the proposal price.",
                },
                {
                  term: "Product Markup",
                  meaning: "MSRP minus dealer cost.",
                  plain: "The profit baked into hardware.",
                  related: "Dealer Cost / MSRP",
                  whyItMatters: "Funds engineering and warranty.",
                },
              ]}
            />
          </Section>

          <Section id="read-more" title="Read more sections" eyebrow="16">
            <ReadMoreSection
              preview={
                <p>
                  TCL's <HighlightedTerm termId="capital-stack" /> is a layered, non-dilutive funding plan.
                </p>
              }
            >
              <p>
                The plan combines SBA-backed lending, revenue-based financing, dealer-credit lines, and strategic
                partnerships to reach $1.9M without giving up equity. Each layer carries a different cost of capital
                and unlocks at a different revenue milestone.
              </p>
            </ReadMoreSection>
          </Section>

          <Section id="accordion" title="Expandable accordions" eyebrow="09">
            <ExplainerAccordion
              items={[
                {
                  id: "what",
                  question: "What is OmniCode in one paragraph?",
                  answer:
                    "A 7-layer knowledge engine built on Postgres + pgvector that powers semantic search and agent reasoning across every TCL Platform module.",
                },
                {
                  id: "why",
                  question: "Why 7 layers?",
                  answer:
                    "Each layer encodes a different abstraction — facts, structures, relations, processes, intents, narratives, and meta-rules — letting the agent reason at the right granularity.",
                },
                {
                  id: "how",
                  question: "How do I add a new term?",
                  answer: "Drop a new entry into src/data/glossary.ts. The drawer, search, and AI explainer pick it up automatically.",
                },
              ]}
            />
          </Section>

          <Section id="faq" title="FAQ block" eyebrow="17">
            <FAQBlock
              items={[
                { q: "Do I need an account to read the glossary?", a: "No — the glossary is public." },
                { q: "Does Plain English Mode persist?", a: "Yes — your choice is saved locally so it survives page reloads." },
                { q: "Can I link directly to a term?", a: <>Yes — use <code>/glossary?term=omnicode</code>.</> },
              ]}
            />
          </Section>

          <Section id="footnotes" title="Footnotes" eyebrow="11">
            <p>
              The TCL Platform serves as both a productivity tool and a defensible IP asset
              <FootnoteLink>Internal capital memo, 2026 — see Capital Stack page.</FootnoteLink>. Pricing data
              flows from dealer portals on a daily sync
              <FootnoteLink>Excludes manufacturers without an authorized dealer API.</FootnoteLink>.
            </p>
          </Section>

          <Section id="annotated" title="Annotated images" eyebrow="12">
            <AnnotatedImage
              src="/og-image.png"
              alt="TCL platform"
              caption="Click any marker to learn more."
              annotations={[
                { id: "a", x: 22, y: 30, label: "Brand mark", description: "TCL's veteran-owned monogram." },
                { id: "b", x: 60, y: 55, label: "Surface", description: "Dark luxury surface with gold accents." },
                { id: "c", x: 82, y: 25, label: "AI accent", description: "Where ClawdBot speaks back to you." },
              ]}
            />
          </Section>

          <Section id="diagram" title="Interactive diagrams" eyebrow="13">
            <InteractiveDiagram
              edges={[
                { from: "tcl", to: "platform" },
                { from: "platform", to: "clawd" },
                { from: "platform", to: "omnicode" },
                { from: "clawd", to: "omnicode" },
                { from: "omnicode", to: "pgvector" },
              ]}
              nodes={[
                { id: "tcl", label: "TCL", icon: "🏛️", x: 12, y: 50, description: "The brand and parent organization." },
                { id: "platform", label: "Platform Suite", icon: "🧩", x: 38, y: 30, description: "14 operational modules for AV integrators." },
                { id: "clawd", label: "ClawdBot", icon: "🤖", x: 62, y: 60, description: "Agent with R/W access to every module." },
                { id: "omnicode", label: "OmniCode", icon: "🧠", x: 78, y: 30, description: "7-layer knowledge engine." },
                { id: "pgvector", label: "pgvector", icon: "🧮", x: 92, y: 65, description: "Vector similarity in Postgres." },
              ]}
            />
          </Section>

          <Section id="timeline" title="Timeline module" eyebrow="18">
            <TimelineModule
              events={[
                {
                  id: "founding",
                  date: "Phase 1 — Founding",
                  title: "TCL is established",
                  short: "Veteran-owned integration brand launches with a focus on luxury smart-home design.",
                  full: <p>Damon Jackson founds TCL after years of hands-on AV and military leadership.</p>,
                  relatedTermIds: ["tcl"],
                },
                {
                  id: "platform",
                  date: "Phase 2 — Platform",
                  title: "Platform Suite goes live",
                  short: "14 modules unify clients, projects, proposals, and service orders.",
                  full: <p>Every operational workflow moves from spreadsheets into a single React + Postgres system.</p>,
                  relatedTermIds: ["platform-suite", "rls"],
                },
                {
                  id: "ai",
                  date: "Phase 3 — AI",
                  title: "ClawdBot ships",
                  short: "An in-platform agent that reads, writes, and reasons over OmniCode.",
                  full: <p>The agent gives every employee an instant operations co-pilot.</p>,
                  relatedTermIds: ["clawdbot", "omnicode"],
                },
                {
                  id: "parade",
                  date: "2026",
                  title: "Parade of Homes Co-Chair",
                  short: "Damon serves as 2026 Co-Chair, showcasing TCL's smart-home design.",
                  relatedTermIds: ["parade-of-homes"],
                },
              ]}
            />
          </Section>

          <Section id="video" title="Video explainer" eyebrow="20">
            <VideoExplainer
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="What is a connected lifestyle?"
              caption="Replace this URL with your real explainer video."
            />
          </Section>

          <Section id="pronounce" title="Audio pronunciation" eyebrow="21">
            <p className="flex items-center gap-3">
              Hard-to-say terms get a one-tap pronunciation:
              <span className="inline-flex items-center gap-2">
                <strong>OmniCode</strong>
                <PronunciationButton text="OmniCode" hint="om-nee-code" />
              </span>
              <span className="inline-flex items-center gap-2">
                <strong>pgvector</strong>
                <PronunciationButton text="pgvector" hint="pee-gee-vector" />
              </span>
            </p>
          </Section>

          <Section id="ai" title="AI explainer assistant" eyebrow="24">
            <p>
              An always-on assistant lives in the bottom-right of every page using the knowledge layer. Try asking it{" "}
              <em>"Explain OmniCode in simple terms"</em> or <em>"Why does RLS matter?"</em>.
            </p>
            <ContextCallout kind="behind">
              The widget answers from the local glossary today. Wire it to Lovable AI when you're ready for full LLM
              answers.
            </ContextCallout>
          </Section>

          <Section id="explore" title="Explore the full glossary" eyebrow="07">
            <p className="mb-4">
              Every term lives in a searchable, filterable index — currently {glossary.length} entries.
            </p>
            <Button asChild>
              <Link to="/glossary">Open the glossary →</Link>
            </Button>
          </Section>

          <FootnoteList />
        </FootnoteProvider>
      </main>
      <Footer />
    </div>
  );
};

export default Knowledge;