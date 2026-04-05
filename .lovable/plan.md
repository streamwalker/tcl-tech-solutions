

# Update Platform with Real TCL Business Data

## Summary
Replace the current generic Workforce Management Platform at `/dashboard` with the uploaded TCL Platform design, populated with real business data (Wall Residence project, 11 opportunities, actual financial figures, billing/payments, job costing, and bill of materials).

## What Changes

### 1. Replace Dashboard page with new TCL Platform layout
- Replace the current `/dashboard` page with a new full-featured platform matching the uploaded file's design
- Dark sidebar (64px) with 14 navigation modules: Dashboard, Calendar, Opportunities, Projects, Service, Procurement, Inventory, Catalog, Accounts, Billing, Time Entries, Reports, To Dos, Settings
- TCL branding with red (#C42020) accent color and DM Sans font
- All real data from the uploaded file hardcoded initially (can be migrated to database later)

### 2. Implement 7 views with real data

| View | Key Real Data |
|------|--------------|
| **Dashboard** | April 2026 calendar, Active Projects table (Wall Residence P-1, $117,059), tasks panel, change orders |
| **Opportunities** | 11 real opportunities (Robare Ornelas, Bourn Parade Home, Cane Residence, etc.) with budgets, totals, probability |
| **Project Overview** | Wall Residence details — $117,059.46 contract, 21.54% margin, phases, billing breakdown ($46,824 paid), payment terms |
| **Payments** | Invoice table (INV-2 Cancelled, INV-3 Paid $46,823.78), outstanding balance $70,235.68 |
| **Sales Reports** | Closed sales $117,059.46, 17% close rate, 69-day avg sales cycle, sales chart |
| **Job Costing** | Phase breakdown (Trim $7,850, Rough-In $2,397, Finish $70,144), product/labor variance charts |
| **Bill of Materials** | Locations sidebar (Kitchen $1,552, Theater $34,805, etc.), scope of work, item details (Elura S8 speaker, URC TRC-1480 remote) |

### 3. Shared UI components
- Custom Badge component with status colors (New, Won, Quoting, In Progress, Cancelled, Paid)
- Progress circle SVG component
- Sub-navigation tabs for project views
- Project top bar with Wall Residence details

### 4. Files to create/modify

| File | Action |
|------|--------|
| `src/pages/Dashboard.tsx` | **Major rewrite** — replace workforce management with new TCL Platform |
| `src/components/dashboard/DashboardSidebar.tsx` | **New** — dark sidebar with 14 nav items |
| `src/components/dashboard/DashboardView.tsx` | **New** — main dashboard with calendar, tasks, active projects |
| `src/components/dashboard/OpportunitiesView.tsx` | **New** — opportunities table with 11 real entries |
| `src/components/dashboard/ProjectOverviewView.tsx` | **New** — Wall Residence project detail |
| `src/components/dashboard/PaymentsView.tsx` | **New** — invoices and payment tracking |
| `src/components/dashboard/SalesView.tsx` | **New** — sales reports and analytics |
| `src/components/dashboard/JobCostingView.tsx` | **New** — cost variance and phase tracking |
| `src/components/dashboard/BillOfMaterialsView.tsx` | **New** — locations, items, labor summary |
| `src/components/dashboard/shared.tsx` | **New** — Badge, ProgressCircle, Card, SubNav, TopBar components |

### 5. Design approach
- Convert inline styles from the uploaded JSX to Tailwind CSS classes to match the existing codebase conventions
- Use the TCL color palette as CSS custom properties or Tailwind config extensions
- Keep the existing auth guard and routing structure
- Preserve the Privacy tab and account management functionality from the current Dashboard
- Unimplemented modules (Calendar, Procurement, Inventory, etc.) show "Coming Soon" placeholder

### 6. What stays the same
- Auth flow and AuthGuard protection on `/dashboard`
- The separate `/platform/*` route continues to exist with Supabase-backed data
- Footer component
- All other pages unaffected

