# Upgrade Membership Model | TCL Tools

**Route:** `/tools/upgrade-model`
**OG Type:** website
**JSON-LD:** no

## Description
Standalone deal-modeling tool: portfolio economics, AT&T comparison, KPI dashboard. Fully client-side.

## Source artifact
`ios-handoff/content/tools/TCL_Upgrade_Platform.html` — pixel-fidelity contract (Arial 14px, exact paddings, 0.25s ease toast). Spec: `upgrade-model.integration_spec.json`. Reference spreadsheet: `TCL_Upgrade_Membership_Model.xlsx`.

## SwiftUI screen
- Suggested name: `UpgradeModelScreen`
- Web source mirrors `src/pages/platform/UpgradeModelPage.tsx` (iframe wrapper).

## Implementation notes (iOS)
Per the spec's `fidelityContract`, the iOS port should reproduce the design system verbatim (Arial-equivalent system font, exact pixel paddings, hex colors). Two paths:
1. **WKWebView wrapper** — bundle `TCL_Upgrade_Platform.html` in `Resources/`, load via `WKWebView`. Fastest, perfectly faithful.
2. **Native SwiftUI rebuild** — implement the 8-tab IA (`dashboard` default), calculation engine from `integration_spec.json` → `calculationEngine`, glossary tooltip system, JSON import/export. Persist via UserDefaults key `tcl_model`.

Recommend WKWebView for v1 to honor the fidelity contract; native rebuild as v2.

## States
- Default (dashboard tab)
- Edited (toast confirms save)
- Imported (JSON file picker)