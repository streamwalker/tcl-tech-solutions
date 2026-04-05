

# Fix Profit Analysis: Auto-Seed Wall Residence Data

## Problem
The Profit Analysis view fetches from the `profit_analyses` database table, which is empty. The Wall Residence data constants exist in the code but are never inserted into the database, so users see "No Profit Analyses Yet" instead of the full analysis.

## Solution
Auto-seed the Wall Residence data on first load when no analyses exist for the current user. When the component detects zero rows, it will automatically insert the `WALL_RESIDENCE_DEFAULTS` (already defined in the file) into the database for the logged-in user, then reload. This means the user immediately sees the full profit analysis without any manual data entry.

## Changes

### 1. Update `ProfitAnalysisView.tsx` — auto-seed logic
In the `fetchAnalyses` function, after the query returns zero rows:
- Get the current user
- Insert a row using `WALL_RESIDENCE_DEFAULTS` (including all JSONB fields: labor_breakdown, margin_distribution, high_margin_items, below_cost_items, findings, and the amendment_text)
- Re-fetch to display the seeded data immediately

This is a small change (~15 lines) inside the existing `fetchAnalyses` function where `data.length === 0`.

### 2. Add `amendment_text` to defaults
The `WALL_RESIDENCE_DEFAULTS` object is missing the `amendment_text` field. Add the full Amendment 1-A legal text so it gets seeded along with everything else.

### Files Modified
| File | Action |
|------|--------|
| `src/components/dashboard/ProfitAnalysisView.tsx` | Edit — add amendment_text to defaults, add auto-seed in fetchAnalyses |

