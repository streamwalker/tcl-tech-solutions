# TCL → iOS 26 SwiftUI Handoff

This bundle contains everything Claude Code needs to rebuild **The Connected Lifestyle** web app as a pixel-faithful native iOS 26 SwiftUI app wired to the existing Lovable Cloud (Supabase) backend.

## Quick start

1. Open this folder in Claude Code.
2. Read `CLAUDE.md` (the operating contract).
3. Paste `PROMPT.md` as your kickoff message.
4. Claude Code will scaffold an Xcode 26 project under `app/` and iterate screen-by-screen using `spec/04-screens/`.

## What's in here

| Folder | Purpose |
|---|---|
| `spec/` | Narrative specs: overview, IA, design system, components, screens, backend, security, QA, build. |
| `swift/` | SwiftPM stub + project structure conventions. |
| `assets/` | Brand images, photos, fonts list, icon mapping. |
| `content/` | Routes JSON, marketing copy, course data, glossary, URC tiers/FAQs, legal pages, design tokens. |
| `backend/` | Schema, edge functions, Supabase config + auth. |
| `reference/` | Web-source-to-SwiftUI map and full component inventory CSV. |

## Scope

- Public marketing site (Home, Services, Press, Knowledge, Glossary, Business Plan, Capital Stack, Builder Deck, Education, OmniCode, Josh AI Tutorial)
- URC Bridge product micro-site (Landing, Pricing, Demo, Pilot, FAQ, Docs, Download)
- Auth + Dashboard
- Platform suite + Academy (courses, quizzes, certificates, dossier, star panel, upgrade model, URC bridge admin, profit analysis)

## Non-goals

- No web app changes.
- No Supabase schema changes — reuse `backend/schema.sql` as the source of truth.
- No App Store screenshots / marketing assets.
