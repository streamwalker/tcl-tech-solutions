# FAQ — URC Rose Bridge | TCL

**Route:** `/products/urc-bridge/faq`
**OG Type:** website
**JSON-LD:** no

## Description
Candid answers about firmware drift, Rose endorsement, URC dealer requirements, Josh AI, refunds, and SLAs.

## SwiftUI screen
- Suggested name: `ProductsUrcBridgeFaqScreen`
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
