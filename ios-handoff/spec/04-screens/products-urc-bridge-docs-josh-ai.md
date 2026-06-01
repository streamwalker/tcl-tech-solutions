# Josh AI Integration Guide — URC Rose Bridge | TCL

**Route:** `/products/urc-bridge/docs/josh-ai`
**OG Type:** website
**JSON-LD:** no

## Description
Wire the bridge into Josh AI: Custom HTTP Device config, Josh-tuned aliases, sample utterances.

## SwiftUI screen
- Suggested name: `ProductsUrcBridgeDocsJoshAiScreen`
- Web source: see `reference/web-source-map.md` for the React file this mirrors.

## Layout
TBD by Claude Code. Match the React page section-for-section, preserving heading hierarchy, spacing, and gold-accent treatments.

## Data bindings
- URC Bridge: see `content/data/urc-tiers.json` and `content/data/urc-faqs.json`.
- Lead form -> `urc_bridge_leads` (anon INSERT allowed).

## States
- Default
- Loading (if backend-bound)
- Error (if backend-bound)
- Empty (if backend-bound)
