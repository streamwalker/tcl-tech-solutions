# Pricing — URC Rose Bridge | TCL

**Route:** `/products/urc-bridge/pricing`
**OG Type:** website
**JSON-LD:** no

## Description
Three published tiers for the URC ↔ Rose RS520 ↔ Josh AI compatibility bridge: Single-Site, Dealer Toolkit, Enterprise.

## SwiftUI screen
- Suggested name: `ProductsUrcBridgePricingScreen`
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
