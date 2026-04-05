

# Connect Profit Analysis to Database + Add PDF Export

## Summary
Store profit analysis data in the database so multiple projects can be tracked and compared over time, and add a PDF export button using browser print with dedicated print styles.

## Database Changes

### New table: `profit_analyses`
Stores per-project profit analysis snapshots with all the financial data needed to render the view.

| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| user_id | uuid | RLS owner |
| project_title | text | e.g. "Wall Residence P-1" |
| contract_value | numeric | |
| sales_tax | numeric | |
| product_cost | numeric | |
| labor_billed | numeric | |
| schedule_a_labor | numeric | |
| product_markup | numeric | |
| total_hours | numeric | |
| schedule_a_profit | numeric | |
| sw_share_pct | numeric | default 0.49 |
| labor_breakdown | jsonb | Array of {category, hours, rate, total} |
| margin_distribution | jsonb | Array of {range, count} |
| high_margin_items | jsonb | Array of {name, margin, cost, sell} |
| below_cost_items | jsonb | Array of {name, qty, cost, sell, loss} |
| findings | jsonb | Array of {title, color, detail} |
| amendment_text | text | nullable, full amendment content |
| created_at | timestamptz | |
| updated_at | timestamptz | |

RLS: standard owner-only CRUD policies (same pattern as other tables).

### Migration: seed Wall Residence data
Insert the current hardcoded Wall Residence data as the first row so there's no data loss.

## Code Changes

### 1. Update `ProfitAnalysisView.tsx`
- Accept a `projectId` prop (optional; defaults to first/latest analysis)
- Fetch analysis data from `profit_analyses` table via Supabase client
- Add a **project selector dropdown** at the top to switch between saved analyses
- Add a **"New Analysis"** button that opens a form to create a new project analysis entry
- Add a **"Export PDF"** button in the header that triggers `window.print()`
- Replace all hardcoded constants with data from the database row
- The sensitivity slider continues to compute derived values client-side from the stored base figures
- Loading and empty states

### 2. Add print styles
- Add a `@media print` block (either in the component or `App.css`) that:
  - Hides sidebar, top navigation, and the export button itself
  - Forces white background, removes shadows/borders for clean output
  - Sets appropriate page margins and prevents chart/section breaks mid-element
  - Shows the full report title and date in the printed header

### 3. Update `Dashboard.tsx`
- Pass selected project context to ProfitAnalysisView if needed

### 4. Update `shared.tsx`
- No changes needed (nav item already exists)

## Files Modified

| File | Action |
|------|--------|
| `src/components/dashboard/ProfitAnalysisView.tsx` | Major rewrite — database-driven + PDF export |
| `src/pages/Dashboard.tsx` | Minor — pass any needed props |
| `src/App.css` or inline | Add `@media print` styles |
| Migration SQL | New `profit_analyses` table + seed data |

## What stays the same
- All other dashboard views unchanged
- Amendment 1-A text still rendered inline
- Sensitivity slider still fully interactive (client-side math)
- Auth guard and routing unchanged

