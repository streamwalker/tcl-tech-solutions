export type GlossaryCategory =
  | "Characters"
  | "Organizations"
  | "Technologies"
  | "Locations"
  | "Symbols"
  | "Historical Events"
  | "Lore / Mythology"
  | "Business Terms"
  | "Technical Terms"
  | "Legal / Financial Terms"
  | "Products / Services";

export interface GlossaryEntry {
  id: string;
  term: string;
  short: string;
  full: string;
  plain: string;
  example?: string;
  whyItMatters?: string;
  related?: string[];
  category: GlossaryCategory;
  icon?: string; // emoji or lucide name
  image?: string;
  pronunciation?: string; // e.g. "tee-see-el"
  link?: string;
  tags?: string[];
}

export const glossary: GlossaryEntry[] = [
  {
    id: "tcl",
    term: "TCL",
    short: "The Connected Lifestyle — a veteran-owned smart-home integration brand.",
    full: "TCL (The Connected Lifestyle) is a luxury smart-home integration company specializing in Josh.ai voice control, custom AV, lighting, shading, and networking for high-end residential and commercial environments.",
    plain: "A company that designs and installs premium smart-home systems for high-end homes and businesses.",
    example: "TCL designed the smart-home automation for the 2026 Parade of Homes showcase.",
    whyItMatters: "TCL is the parent brand behind every product, page, and service on this site.",
    related: ["josh-ai", "omnicode", "platform-suite"],
    category: "Organizations",
    icon: "🏛️",
    pronunciation: "tee-see-el",
    tags: ["brand", "integration", "veteran-owned"],
  },
  {
    id: "josh-ai",
    term: "Josh.ai",
    short: "A privacy-first natural-language voice control platform for luxury homes.",
    full: "Josh.ai is a high-end voice control system that integrates with Control4, Lutron, Sonos, and other home automation platforms using natural-language commands processed locally for privacy.",
    plain: "Like Alexa, but smarter and built for fancy homes — with no listening to your conversations.",
    example: '"OK Josh, set the dining room for dinner" dims lights, lowers shades, and starts a playlist.',
    whyItMatters: "Josh.ai is one of TCL\u2019s flagship integrations and a primary differentiator for clients.",
    related: ["tcl", "control4", "lutron"],
    category: "Technologies",
    icon: "🎙️",
    pronunciation: "josh dot ay-eye",
    link: "/josh-ai-tutorial",
  },
  {
    id: "omnicode",
    term: "OmniCode",
    short: "TCL\u2019s 7-layer computational knowledge engine.",
    full: "OmniCode is a multi-layer knowledge engine built on Postgres + pgvector that powers semantic search, agent reasoning, and contextual answers across the TCL Platform.",
    plain: "The smart memory and reasoning engine that powers TCL\u2019s tools.",
    example: "When ClawdBot answers a question, it queries OmniCode\u2019s seven layers for the right context.",
    whyItMatters: "OmniCode is the IP backbone of TCL\u2019s platform suite and a key element of the capital stack story.",
    related: ["clawdbot", "platform-suite", "pgvector"],
    category: "Technologies",
    icon: "🧠",
    link: "/omnicode",
  },
  {
    id: "clawdbot",
    term: "ClawdBot",
    short: "TCL\u2019s in-platform AI agent (a.k.a. OpenClaw) with full module access.",
    full: "ClawdBot is the AI agent embedded inside the TCL Platform. It has read/write access to every operations module \u2014 clients, projects, proposals, service orders \u2014 and reasons over OmniCode for context.",
    plain: "An AI helper that lives inside the TCL Platform and can actually do work for you.",
    example: "Ask ClawdBot \u201cdraft a proposal for the Smith project\u201d and it will pull the right products, labor rate, and tax.",
    related: ["omnicode", "platform-suite"],
    category: "Technologies",
    icon: "🤖",
  },
  {
    id: "platform-suite",
    term: "Platform Suite",
    short: "The 14-module TCL operations platform.",
    full: "A unified suite of operational modules \u2014 Client Management, Proposal Builder, Product Library, Service Orders, Project Tracker, Profit Analysis, and more \u2014 designed for AV integrators.",
    plain: "The all-in-one software TCL uses to run the business.",
    related: ["clawdbot", "profit-analysis"],
    category: "Products / Services",
    icon: "🧩",
    link: "/platform",
  },
  {
    id: "profit-analysis",
    term: "Profit Analysis",
    short: "Audit module that compares contracted labor vs. actual schedule-A profit share.",
    full: "The Profit Analysis module ingests proposal line-items and schedule-A labor breakdowns to compute true project margin, flag below-cost items, and generate amendment text.",
    plain: "A tool that checks whether a project actually made money and where it lost margin.",
    whyItMatters: "Below-cost line items are the #1 cause of margin leakage on integration projects.",
    related: ["dealer-cost", "msrp", "platform-suite"],
    category: "Business Terms",
    icon: "📊",
  },
  {
    id: "dealer-cost",
    term: "Dealer Cost",
    short: "What the integrator pays the manufacturer for a product.",
    full: "Dealer Cost is the wholesale price an authorized integrator pays a manufacturer or distributor, before markup is applied to reach the client-facing price.",
    plain: "The wholesale price \u2014 not what the customer pays.",
    example: "A speaker with a $1,000 MSRP might have a $600 dealer cost.",
    related: ["msrp", "product-markup"],
    category: "Business Terms",
    icon: "💵",
  },
  {
    id: "msrp",
    term: "MSRP",
    short: "Manufacturer\u2019s Suggested Retail Price.",
    full: "MSRP is the price the manufacturer suggests retailers charge end customers. Most authorized integration channels enforce or strongly suggest selling at MSRP.",
    plain: "The sticker price the customer sees.",
    related: ["dealer-cost"],
    category: "Business Terms",
    icon: "🏷️",
    pronunciation: "em-ess-arr-pee",
  },
  {
    id: "product-markup",
    term: "Product Markup",
    short: "MSRP minus dealer cost \u2014 the gross margin on hardware.",
    full: "Product markup is the difference between dealer cost and MSRP, expressed as a dollar amount or percentage. It funds engineering, design, project management, and warranty support.",
    plain: "The profit baked into the hardware price.",
    related: ["dealer-cost", "msrp"],
    category: "Business Terms",
    icon: "📈",
  },
  {
    id: "capital-stack",
    term: "Capital Stack",
    short: "TCL\u2019s $1.9M non-dilutive funding strategy.",
    full: "The capital stack outlines a layered funding plan combining grants, SBA-backed lending, revenue-based financing, and strategic partnerships \u2014 raising $1.9M without giving up equity.",
    plain: "A plan to raise money for the business without selling ownership.",
    related: ["tcl"],
    category: "Legal / Financial Terms",
    icon: "💼",
    link: "/capital-stack",
  },
  {
    id: "rls",
    term: "RLS",
    short: "Row-Level Security \u2014 Postgres policies that restrict row access per user.",
    full: "Row-Level Security is a Postgres feature where SELECT/INSERT/UPDATE/DELETE policies determine which rows a user can touch. TCL uses RLS to enforce per-user data isolation in the Platform Suite.",
    plain: "Database rules that make sure users only see their own data.",
    whyItMatters: "Without RLS, any signed-in user could read every other user\u2019s data.",
    related: ["rbac"],
    category: "Technical Terms",
    icon: "🔐",
    pronunciation: "arr-ell-ess",
  },
  {
    id: "rbac",
    term: "RBAC",
    short: "Role-Based Access Control.",
    full: "RBAC assigns permissions based on roles (admin, moderator, user) stored in a dedicated user_roles table. TCL\u2019s implementation uses a Postgres app_role enum and a security-definer has_role() function to avoid recursive RLS.",
    plain: "Permissions based on what role you have \u2014 admin, staff, or regular user.",
    related: ["rls"],
    category: "Technical Terms",
    icon: "🛡️",
    pronunciation: "are-back",
  },
  {
    id: "pgvector",
    term: "pgvector",
    short: "A Postgres extension for vector similarity search.",
    full: "pgvector adds vector data types and similarity operators to Postgres, enabling semantic search, embeddings storage, and RAG workflows directly inside the database.",
    plain: "A database add-on that lets the database understand the meaning of text.",
    related: ["omnicode"],
    category: "Technical Terms",
    icon: "🧮",
  },
  {
    id: "control4",
    term: "Control4",
    short: "A leading whole-home automation control platform.",
    full: "Control4 (now part of Snap One) provides a unified interface for AV, lighting, climate, security, and more \u2014 commonly paired with Josh.ai for natural-language control.",
    plain: "The remote-control brain for a smart home.",
    related: ["josh-ai", "lutron"],
    category: "Technologies",
    icon: "🎛️",
  },
  {
    id: "lutron",
    term: "Lutron",
    short: "Premium lighting and shading control manufacturer.",
    full: "Lutron makes the high-end lighting control and motorized shading systems used in most luxury smart-home installations TCL designs.",
    plain: "The fancy lighting and window shade brand.",
    related: ["control4", "josh-ai"],
    category: "Technologies",
    icon: "💡",
  },
  {
    id: "parade-of-homes",
    term: "Parade of Homes",
    short: "Annual luxury showcase where TCL is 2026 Co-Chair.",
    full: "The Parade of Homes is an annual juried showcase of luxury custom homes. Damon Jackson serves as 2026 Co-Chair, bringing TCL\u2019s smart-home expertise to the event.",
    plain: "A yearly tour of the area\u2019s most beautiful new homes.",
    related: ["tcl"],
    category: "Historical Events",
    icon: "🏠",
  },
];

export const glossaryById = Object.fromEntries(glossary.map((g) => [g.id, g])) as Record<string, GlossaryEntry>;

export const glossaryCategories: GlossaryCategory[] = [
  "Characters",
  "Organizations",
  "Technologies",
  "Locations",
  "Symbols",
  "Historical Events",
  "Lore / Mythology",
  "Business Terms",
  "Technical Terms",
  "Legal / Financial Terms",
  "Products / Services",
];