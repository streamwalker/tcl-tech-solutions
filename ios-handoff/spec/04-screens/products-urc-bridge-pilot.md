# Start a 30-day Pilot — URC Rose Bridge | TCL

**Route:** `/products/urc-bridge/pilot`
**OG Type:** website
**JSON-LD:** no

## Description
Full bridge access for 30 days, no payment up front.

## SwiftUI screen
- Suggested name: `ProductsUrcBridgePilotScreen`
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
