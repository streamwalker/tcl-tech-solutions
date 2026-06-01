# iOS 26 SwiftUI Handoff Bundle

Goal: produce everything Claude Code needs to rebuild this web app as a pixel-faithful native iOS 26 SwiftUI app wired to the existing Lovable Cloud (Supabase) backend. Scope covers the public marketing site, the URC Bridge micro-site, Auth + Dashboard, and the Platform suite + Academy.

Output lands in two places:
- `/ios-handoff/` in this repo (versioned with the project)
- `/mnt/documents/tcl-ios26-handoff.zip` (downloadable mirror of the same folder)

No app code in the web project changes. This is a documentation + asset extraction pass only.

## Bundle layout

```text
ios-handoff/
  README.md                       entry point + how to use with Claude Code
  CLAUDE.md                       Claude Code system prompt: persona, rules, milestones, acceptance criteria
  PROMPT.md                       one-shot kickoff prompt to paste into Claude Code
  spec/
    00-overview.md                product summary, audiences, success criteria
    01-information-architecture.md every route -> SwiftUI screen name, nav graph, deep links
    02-design-system.md           dark luxury tokens, Playfair / DM Sans / DM Mono mapping, #C42020 accent
    03-components.md              shadcn -> SwiftUI component mapping table (Button, Card, Sheet, Tabs, etc.)
    04-screens/                   one .md per screen with layout, states, copy, data bindings
    05-backend-contract.md        Supabase tables, RLS, RPCs, edge functions, auth flows
    06-academy.md                 course/chapter/lesson/quiz/exam/certificate model
    07-urc-bridge.md              micro-site flows, lead form, pricing tiers
    08-platform-suite.md          14 modules incl. profit analysis JSONB schema
    09-seo-and-metadata.md        SEO map, JSON-LD strategy (App Clips / universal links optional)
    10-security-and-privacy.md    PII logging rules, consent, account deletion, RBAC
    11-testing-and-qa.md          unit + snapshot + UI test matrix per screen
    12-build-and-distribution.md  Xcode 26 project layout, schemes, signing, TestFlight
  swift/
    Package.swift                 stub SwiftPM manifest with supabase-swift dep
    Sources/TCL/                  empty SwiftUI scaffolding (App entry, Theme, Router, EnvObjects)
    project-structure.md          target/module layout Claude Code should follow
  assets/
    brand/                        logos, favicon, social images copied from /public
    images/                       hero, founder, press, product imagery from src/assets + /public
    fonts/                        Playfair Display, DM Sans, DM Mono (sourced from Google Fonts, licenses included)
    icons/                        lucide icon usage list -> SF Symbols mapping table
    videos/                       references only (list + URLs) - large files stay external
  content/
    routes.json                   machine-readable route -> title/description/og/jsonLd
    copy/                         marketing copy extracted from each page (one .md per route)
    data/                         academy courses, glossary, knowledge nodes, URC tiers/faqs as JSON
    legal/                        Terms, Privacy, Cookie, Compliance markdown
  backend/
    schema.sql                    current public-schema DDL (tables, RLS, policies, grants)
    functions.sql                 has_role, issue_certificate_if_passed, update_updated_at_column
    edge-functions/               read-only copies of academy-tutor, chat-bot, delete-account,
                                  platform-agent, rls-selftest, submit-final-exam
    supabase-config.md            URL, anon key (publishable), JWT validation notes
    auth.md                       email + Google sign-in flows, session lifecycle, ASWebAuthenticationSession
  reference/
    web-source-map.md             "this SwiftUI screen mirrors this React file" lookup
    component-inventory.csv       every src/components/* file + role + iOS counterpart
```

## What gets extracted (automated)

Scripts in `tools/` (run once during packaging, not shipped):
1. Walk `src/App.tsx` routes -> emit `content/routes.json` with title, description, ogType, jsonLd flags.
2. Walk `src/pages/**` and `src/components/**` -> emit `reference/component-inventory.csv` + one stub in `spec/04-screens/` per page using the file name.
3. Read `src/index.css` + `tailwind.config.ts` -> emit `spec/02-design-system.md` with HSL tokens, font families, radii, shadows converted to Swift `Color` / `Font` / `RoundedRectangle` snippets.
4. Read `src/data/academy/**`, `src/data/glossary.ts`, `src/modules/urc-bridge/data/**` -> serialize to JSON under `content/data/`.
5. Read `supabase/migrations/**` -> concatenate to `backend/schema.sql`; copy each `supabase/functions/<name>/index.ts` verbatim into `backend/edge-functions/`.
6. Copy `public/*.{svg,png,jpg,webp,ico,xml,txt,md,html}` + `src/assets/*` into `assets/`.
7. Generate `ios-handoff/README.md`, `CLAUDE.md`, `PROMPT.md` from templates.
8. `zip -r /mnt/documents/tcl-ios26-handoff.zip ios-handoff` (excluding `.DS_Store`, build junk).

## Pixel-faithful port guidance (lives in CLAUDE.md)

- Backend: integrate `supabase-swift` (>= 2.x) against existing project ref `earjplippbonusveefjh`, anon key included in `backend/supabase-config.md`. Reuse RLS as-is; no schema changes.
- Auth: email/password + Google (ASWebAuthenticationSession). Password reset via deep link `tcl://reset-password`.
- Theme: dark luxury default. Define `TCLTheme` with HSL-derived `Color` extensions, Playfair Display for headings, DM Sans body, DM Mono code. Accent `#C42020`.
- Navigation: iOS 26 `NavigationStack` per tab. Tabs: Home, Products (URC Bridge), Academy, Platform, Account. Public pages (Press, Knowledge, Glossary, Business Plan, Capital Stack, etc.) accessible via Home menu.
- Liquid Glass surfaces allowed where they preserve the dark-luxury feel; cards use `RoundedRectangle(cornerRadius: 16)` with subtle gold borders.
- Forms: SwiftUI `Form` styled to match shadcn inputs.
- Embedded HTML/markdown content (lessons, legal pages) rendered with `AttributedString` or `WKWebView` for fidelity.
- Charts (profit analysis) use Swift Charts.
- Sensitive logging: same zero-PII rule as web.
- Accessibility: Dynamic Type respected; min tap target 44pt; VoiceOver labels per screen spec.

## CLAUDE.md highlights

- Persona: senior iOS engineer doing a pixel-faithful port.
- Workflow: read `spec/00-overview.md` first, then `01-information-architecture.md`, then build screen-by-screen following `spec/04-screens/` order.
- Acceptance per screen: visual parity at iPhone 16 Pro, all interactive states, backend wired, snapshot test committed.
- Forbidden: changing the Supabase schema, logging PII, swapping fonts, removing the gold accent system.

## PROMPT.md

A single paste-ready prompt that tells Claude Code: clone the bundle, `cd ios-handoff`, read README + CLAUDE.md, scaffold the Xcode 26 project per `swift/project-structure.md`, then iterate screen by screen.

## Steps the agent will execute

1. Create `tools/` extraction scripts (TypeScript via `bun`).
2. Run them to populate `ios-handoff/`.
3. Hand-write `README.md`, `CLAUDE.md`, `PROMPT.md`, and the spec files that need narrative (00, 01, 02, 05, 11, 12).
4. Stub the Swift package skeleton (no compile required here).
5. Zip to `/mnt/documents/tcl-ios26-handoff.zip` and surface a `<presentation-artifact>` link.
6. QA: list the zip contents, verify every route in `src/App.tsx` has a matching `spec/04-screens/*.md`, every public-schema table has an entry in `backend/schema.sql`, and every edge function was copied.

## Out of scope

- No changes to web app code, routes, or styles.
- No actual Swift compilation or Xcode project file generation (Claude Code will create the `.xcodeproj`).
- No new backend tables, RLS changes, or migrations.
- No App Store assets (screenshots, marketing) - separate task if you want them.
