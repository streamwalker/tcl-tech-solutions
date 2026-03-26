

# TCL Capital Stack Strategy Subpage

## Overview
Create a new `/capital-stack` page that presents TCL's full 6-layer capital stack strategy as a professional, investor-ready subpage. This converts the detailed funding roadmap into a structured, visually engaging page with navigation sidebar, timeline, and financial tables.

## Content Structure

The page will have a sticky Table of Contents sidebar (matching the Investor White Paper pattern) and these sections:

1. **Hero** — "TCL Capital Stack Strategy" with subtitle about building a $1.9M+ ecosystem without giving up equity
2. **What TCL Actually Is** — Positioning as early-stage infrastructure company, not a startup
3. **Layer 1: Immediate Liquidity (0-30 Days)** — Business credit stack, equipment financing ($50K-$150K)
4. **Layer 2: Revenue-Backed Capital (30-90 Days)** — Revenue-based financing, contract collateral ($100K-$500K)
5. **Layer 3: Non-Dilutive Funding** — SDVOSB certification, Texas grants, energy efficiency programs ($100K-$300K)
6. **Layer 4: Contract Stacking** — SAM.gov registration, government positioning, subcontractor strategy ($250K-$2M)
7. **Layer 5: Builder & Developer Stack** — Community-scale deals with Coventry/Lennar/Perry ($500K-$2M)
8. **Layer 6: Recurring Revenue Engine** — Scaling managed services to $10K-$50K/month
9. **Full Capital Stack Summary** — Table showing all layers totaling $1.9M+
10. **Timeline to $1M+** — Visual timeline: 0-60 days, 3-6 months, 6-12 months
11. **Next Steps** — Capability statement, builder pitch deck, grant pipeline, financing model

## Technical Details

### New File: `src/pages/CapitalStack.tsx`
- Follows the Investor White Paper pattern: sticky sidebar TOC, section-based scrolling, print-friendly
- Uses existing Card, Table, Badge components
- Visually distinct layer cards with color-coded badges (Layer 1 = blue, Layer 2 = green, etc.)
- Progress bars or visual indicators for funding amounts per layer
- Responsive layout with sidebar collapsing on mobile

### Modified: `src/App.tsx`
- Add route: `/capital-stack` → `CapitalStack`

### Modified: `src/components/Navigation.tsx`
- Add "Capital Stack Strategy" link to the nav items array (alongside Business Plan, Investor White Paper)

