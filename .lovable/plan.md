# Integrate TCL Upgrade Platform Module

Port the standalone `TCL_Upgrade_Platform.html` (calculator + 30-term glossary + 107 tooltips) into the existing React app as a new platform module, following `integration_spec.json` verbatim for fonts, spacing, colors, motion, and calculation engine.

## Scope

- New route mounted in the existing Platform layout (not a global redesign).
- 8-tab IA preserved: Dashboard, Deal Modeler, Portfolio, AT&T, Spread, Hardware, Credit/Cash, Glossary.
- All economics (`$530 deal profit`, `$56,500 portfolio net`) reproduced exactly per `calculationEngine`.
- Jargon explainer system wired through every tab.

## Where it goes

- Route: `/platform/upgrade-model` (added to `App.tsx`, rendered inside `PlatformLayout`).
- Sidebar link added to `PlatformSidebar.tsx` under existing platform tools.
- All module CSS scoped under a `.tcl-upgrade-root` wrapper so the spec's `:root` design tokens (`--navy`, `--steel`, Arial 14px base, etc.) do not leak into the rest of the app.

## File layout

```text
src/pages/platform/UpgradeModel.tsx          # route shell + tab switcher
src/modules/upgrade/
  data/glossary.ts                            # 30-term glossary (from spec)
  data/defaults.ts                            # dataModel.defaults seed
  engine/calc.ts                              # calculationEngine fns (pure)
  state/useUpgradeStore.ts                    # localStorage('tcl_model') + import/export
  components/
    Tooltip.tsx                               # hover/focus/tap, 0.25s ease fade
    Jargon.tsx                                # <Jargon termId="float"> wrapper + InfoIcon
    Tabs.tsx                                  # 8-tab nav, dashboard default
    tabs/DashboardTab.tsx
    tabs/DealModelerTab.tsx
    tabs/PortfolioTab.tsx
    tabs/AttTab.tsx
    tabs/SpreadTab.tsx
    tabs/HardwareTab.tsx
    tabs/CreditCashTab.tsx
    tabs/GlossaryTab.tsx                      # searchable list, "On this platform:" line
  styles/upgrade.css                          # :root vars + component CSS verbatim
```

The existing `src/data/glossary.ts` (TCL brand glossary used by `KnowledgeContext`) is left untouched — this module's glossary is domain-specific (deal economics) and lives separately to avoid collision.

## Implementation notes

1. Copy `:root` CSS variable block and component CSS from `TCL_Upgrade_Platform.html` verbatim into `upgrade.css`, scoped under `.tcl-upgrade-root`.
2. Port `calculationEngine` functions from `integration_spec.json` into `engine/calc.ts` as pure TS; unit-ready but no tests required by spec.
3. `Tooltip.tsx`: single component handling hover (desktop), focus (keyboard), and tap (mobile via `pointerdown`); 0.25s ease opacity fade only (no other transitions, per fidelity contract). Click → navigates to Glossary tab and scrolls to entry.
4. `Jargon.tsx`: `<Jargon termId="float">float</Jargon>` renders dotted underline; `<InfoIcon termId="..." />` renders the ⓘ. Both resolve against `glossary.ts`. Throws in dev if `termId` is missing (reference-integrity guard).
5. State: zustand-free — a small `useUpgradeStore` hook with `useSyncExternalStore` over a module-scoped store that mirrors to `localStorage('tcl_model')`. JSON import/export buttons in Dashboard.
6. Dashboard shows a one-time welcome note ("Hover any dotted term…") gated by `localStorage('tcl_model.welcomeSeen')`.
7. No backend, no Supabase changes, no auth changes. Pure client module.

## Acceptance (from spec)

- Every one of the 28 inline tooltip keys resolves (compile-time check via `keyof typeof glossary`).
- Default seed produces `$530` deal profit and `$56,500` portfolio net.
- Glossary tab lists all 30 terms with plain-English + "On this platform:" lines.
- Tooltip uses exactly `opacity 0.25s ease`; no width/transform animations elsewhere.

## Out of scope

- No changes to existing pages, brand glossary, RLS, edge functions, SEO, or AdSense.
- No new dependencies (uses existing React + Tailwind + lucide; module CSS is plain CSS scoped to the wrapper).
