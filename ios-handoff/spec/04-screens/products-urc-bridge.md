# URC ↔ Hi-Fi Rose RS520 ↔ Josh AI Bridge | TCL

**Route:** `/products/urc-bridge`
**OG Type:** website
**JSON-LD:** yes

## Description
Stable HTTP bridge between URC Total Control, the Hi-Fi Rose RS520, and Josh AI. Firmware-drift maintenance and a /v2 Universal Translator across Control4, URC, and Josh.

## SwiftUI screen
- Suggested name: `ProductsUrcBridgeScreen`
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
