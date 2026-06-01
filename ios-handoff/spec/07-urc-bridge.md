# 07 — URC Bridge

## Routes
`/products/urc-bridge`, `/pricing`, `/demo`, `/pilot`, `/faq`, `/docs`, `/docs/deployment`, `/docs/josh-ai`, `/download`.

## Data
- Tiers: `content/data/urc-bridge/tiers.ts`
- FAQs: `content/data/urc-bridge/faqs.ts`

## Lead capture
INSERT into `urc_bridge_leads` (anon allowed):
- `source` ∈ {pilot, demo, subscribe}
- Validated: email format, message ≤ 4000 chars.

## Downloads
Host download artifacts on a public CDN or App-Group-shared location; iOS app links out via `SFSafariViewController` for now. Files live under `/public/downloads/urc-bridge/` on the web today — keep web as the canonical download host.

## SoftwareApplication JSON-LD
Mirrored as a structured `AppMetadata` value type for App Clips / Universal Links handoff.
