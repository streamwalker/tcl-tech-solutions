# URC-Rose-Josh AI Universal Translator — Product Micro-Site

Port the uploaded TanStack Start app into TCL as a new product micro-site under `/products/urc-bridge/*`, reusing TCL's React Router, Supabase auth, IBM navigation, and dark-luxury design tokens. Park the Fastify bridge service and installer as downloadable assets — the TCL site cannot host a Node service, so the bridge ships as documentation + a downloadable tarball.

## Scope

In:
- 9 public pages (landing, pricing, demo, pilot, FAQ, docs index, deployment docs, Josh AI docs, downloads)
- 1 gated admin page (leads + simulations viewer)
- Product glossary + simulator (client-only) ported from `src/lib/`
- Bridge tarball + installer scripts + 2 architecture DOCXs served from `/public/downloads/urc-bridge/`
- Lead capture (pilot/subscribe forms) → new Supabase table

Out:
- The Fastify bridge service itself (zipped, served as download — not deployed)
- TanStack Start server functions (`*.functions.ts` are server-only and won't run here; rewritten as Supabase edge functions or client-only logic)
- Stripe/payment integration (pricing page is presentational; "Contact for pilot" CTA)
- Auth duplication — reuses existing TCL Supabase auth + RBAC

## Route map (under TCL React Router)

```text
/products/urc-bridge                       → Landing (from src/routes/index.tsx)
/products/urc-bridge/pricing               → Pricing tiers
/products/urc-bridge/demo                  → Interactive simulator
/products/urc-bridge/pilot                 → Pilot signup form → leads table
/products/urc-bridge/faq                   → FAQ accordion
/products/urc-bridge/docs                  → Docs index
/products/urc-bridge/docs/deployment       → Deployment guide
/products/urc-bridge/docs/josh-ai          → Josh AI integration guide
/products/urc-bridge/download              → Bridge tarball + installer (auth-gated)
/platform/urc-bridge-admin                 → Admin leads/simulations (admin role only)
```

All pages render inside the existing `IBMNavigation` header + `Footer`, with `pt-16` per layout-constraints memory.

## File layout

```text
src/pages/urc-bridge/
  Landing.tsx                  ← from routes/index.tsx
  Pricing.tsx                  ← from routes/pricing.tsx + PricingTiers component
  Demo.tsx                     ← from routes/demo.tsx + simulator engine
  Pilot.tsx                    ← from routes/pilot.tsx (pilot lead form)
  Faq.tsx                      ← from routes/faq.tsx
  Docs.tsx                     ← from routes/_authenticated.docs.tsx
  DocsDeployment.tsx
  DocsJoshAi.tsx
  Download.tsx                 ← auth-gated download page
  Admin.tsx                    ← admin-role-gated, mounted under /platform
src/modules/urc-bridge/
  data/glossary.ts             ← from src/lib/glossary.ts (separate from TCL glossary)
  data/pricing.ts              ← tier definitions
  simulator/
    engine.ts                  ← from src/lib/simulator/engine.ts (pure)
    profiles.ts                ← from src/lib/simulator/profiles.ts
  components/
    SimulatorPanel.tsx
    PricingTiers.tsx
    SubscribeForm.tsx
    CodeBlock.tsx              ← reuse TCL prism setup if present, else port
public/downloads/urc-bridge/
  urc-rose-bridge-v1.0.0.tar.gz       ← zipped /bridge folder
  install.sh, uninstall.sh, update.sh ← from /installer
  com.tcltech.urc-rose-bridge.plist
  URC_RS520_JoshAI_Implementation_Plan.pdf  ← converted from docx
  Universal_Translator_Architecture.pdf
```

## Database (one migration)

```sql
CREATE TABLE public.urc_bridge_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  company text,
  role text,
  systems text[],                  -- which ecosystems they own
  message text,
  source text NOT NULL,            -- 'pilot' | 'subscribe' | 'demo'
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.urc_bridge_leads TO anon, authenticated;
GRANT SELECT ON public.urc_bridge_leads TO authenticated;
ALTER TABLE public.urc_bridge_leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can submit" ON public.urc_bridge_leads
  FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "admins read leads" ON public.urc_bridge_leads
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.urc_bridge_simulations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  profile text NOT NULL,
  inputs jsonb NOT NULL,
  result jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.urc_bridge_simulations TO anon, authenticated;
GRANT SELECT ON public.urc_bridge_simulations TO authenticated;
ALTER TABLE public.urc_bridge_simulations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone logs sim" ON public.urc_bridge_simulations
  FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "admins read sims" ON public.urc_bridge_simulations
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
```

No new auth flows — admin page uses existing `has_role(auth.uid(), 'admin')` and is mounted inside `<AuthGuard>` + `<Platform>`.

## Design / branding

- Reuse TCL tokens (Playfair Display headings, DM Sans body, `#C42020` accents, dark luxury).
- Landing hero re-themed: keep copy and architecture diagram from `routes/index.tsx`, restyle to match `BusinessPlanHero` aesthetic.
- ASCII hub-and-spoke diagram from the bridge README rendered in a `<pre>` block with the existing DM Mono treatment.
- Code samples use the existing TCL `CodeBlock` styling (no new prism setup unless missing).

## SEO

Add nine new `SEO` entries to `src/App.tsx` (`/products/urc-bridge`, …) with titles, descriptions, and a `SoftwareApplication` JSON-LD on the landing page.

## Sidebar / navigation

- Add a top-nav "Products" dropdown link to `IBMNavigation` → "URC ↔ Rose ↔ Josh AI Bridge".
- Add `PlatformSidebar` entry "URC Bridge Admin" gated by admin role.
- Update `public/sitemap.xml` with the nine new public routes.

## Out of scope (explicit)

- No Fastify deployment, no Docker, no Node server inside TCL — bridge ships only as a download.
- No Stripe checkout — pricing is presentational.
- No real C4/URC/Josh adapter wiring from the browser — the simulator is the in-browser demonstration.
- No edits to existing TCL pages other than `App.tsx` (routes + SEO), `IBMNavigation.tsx` (one nav entry), `PlatformSidebar.tsx` (admin entry), and `sitemap.xml`.

## Acceptance

- All 9 public routes render under TCL header/footer with correct SEO.
- Pilot/subscribe form inserts into `urc_bridge_leads`; admin page lists rows.
- Simulator runs entirely client-side and matches the engine output of the original.
- Download page serves the tarball + installer scripts + both architecture PDFs.
- No regressions on existing TCL routes (build clean, no console errors).
