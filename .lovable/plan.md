

# Add Revenue Waterfall & Profit Analysis to TCL Platform

## Summary
Add a new "Profit Analysis" module to the `/dashboard` platform sidebar that replicates the full TCL Profit Analysis & Amendment 1-A document as an interactive view. This includes a revenue waterfall chart, labor cost sensitivity slider, item-level margin audit, below-cost item analysis, and the proposed Amendment 1-A text.

## What Changes

### 1. Add new sidebar nav item
Add a "Profit Analysis" entry (icon: 📈 or similar) to the `navItems` array in `shared.tsx` with id `"profitanalysis"`.

### 2. Create `ProfitAnalysisView.tsx` component
A new view component with 8 sections matching the uploaded HTML analysis:

| Section | Content |
|---------|---------|
| **Executive Summary** | 4 metric cards: Schedule A Margin (26.26%), Estimated True Margin (~34-35%), SW Potential Shortfall ($3,600-$5,300), Labor Data Gap ($2,775). Core issue callout card. |
| **Revenue Waterfall** | Bar chart (using recharts, already in project) showing Contract Value → Sales Tax → Pre-Tax Revenue → Product Cost → Labor Billed → Product Markup → Schedule A Profit → Hidden Labor Profit. Data table below with all layers. |
| **Labor Cost Sensitivity** | Interactive slider ($20-$65/hr) that recalculates: True Labor Cost, Hidden Labor Profit, True Project Margin, SW 49% Should Be. Line chart showing SW 49% share vs Schedule A baseline ($15,057). D-Tools labor rate breakdown table (Family 23.5hrs@$125, Installation 111hrs@$150, Programming 34.5hrs@$150). |
| **Item-Level Margin Audit** | Bar chart showing margin distribution across ranges (Below 0% through 60%+). Table of high-margin items (Maestro screen 62.57%, URC HDA-8100 57.62%, etc.). |
| **Below-Cost Items** | Horizontal bar chart of 7 items sold below dealer cost. Table with qty, cost, sell price, loss amount. Impact callout: ~$219.85 reduced SW distribution. |
| **Sales Tax Treatment** | 3 metric cards: Margin on Gross (26.26%), Margin on Pre-Tax (27.93%), Dilution (-1.67%). |
| **Summary of Findings** | 5 finding cards (color-coded: green for verified, red for critical, gold for advisory). |
| **Amendment 1-A Text** | Full legal text of the proposed definitional clarification amendment, styled as a legal document section with clause numbering. |

### 3. Wire into Dashboard page
- Add `profitanalysis` to the `views` record in `Dashboard.tsx` pointing to the new component
- Uses `ProjectTopBar` since this analysis is specific to the Wall Residence project

### 4. All data hardcoded
Every number from the analysis is hardcoded (matching the uploaded HTML exactly). The labor sensitivity slider uses the same formula: `trueCost = 169 * rate`, `trueProfit = 110025.28 - 64342.41 - trueCost`, `swShare = trueProfit * 0.49`.

### Technical Details

**Charts**: Use recharts (already a project dependency) for:
- Waterfall: `BarChart` with positive/negative values and color-coded bars
- Labor sensitivity: `LineChart` with two datasets
- Margin distribution: `BarChart` 
- Below-cost items: Horizontal `BarChart`

**Styling**: Follows existing TCL Platform conventions — `TCLCard` wrappers, Tailwind classes, DM Sans font, red (#C42020) accent. Color-coded alert cards using red/green/gold borders matching the analysis document.

**Slider**: React `useState` with an HTML range input, recalculating 4 derived metrics on change.

### Files

| File | Action |
|------|--------|
| `src/components/dashboard/ProfitAnalysisView.tsx` | **New** — full profit analysis view (~500 lines) |
| `src/components/dashboard/shared.tsx` | **Edit** — add `profitanalysis` nav item |
| `src/pages/Dashboard.tsx` | **Edit** — add `profitanalysis` to views record, import component |

