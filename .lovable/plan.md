

# Mobile Tab Optimization

## Problem
On mobile, the tab labels in three locations overflow and overlap because they use fixed grid columns that are too narrow for the text:

1. **Dashboard top tabs** (`src/pages/Dashboard.tsx` line 37): `grid-cols-5` with icon+text — 5 columns too tight on mobile
2. **Schedule inner tabs** (`src/components/workforce/ScheduleManagement.tsx` line 314): `grid-cols-4` with long labels like "Today's Schedule", "Weekly Overview"
3. **Analytics inner tabs** (`src/components/workforce/Analytics.tsx` line 82): `grid-cols-5` with labels like "Productivity", "Performance"

## Fix

**All three TabsList grids** — change from fixed `grid-cols-N` to responsive: use `flex flex-wrap` on mobile, grid on larger screens.

### Dashboard tabs (Dashboard.tsx line 37)
- Change to: `grid w-full grid-cols-3 md:grid-cols-5`
- Hide icon text on small screens: wrap `<span>` with `hidden sm:inline`

### Schedule tabs (ScheduleManagement.tsx line 314)
- Change to: `grid w-full grid-cols-2 md:grid-cols-4`
- Shorten labels on mobile using shorter text or `truncate`

### Analytics tabs (Analytics.tsx line 82)
- Change to: `grid w-full grid-cols-3 md:grid-cols-5` or `grid-cols-2 sm:grid-cols-3 md:grid-cols-5`

This ensures tabs stack into 2-3 columns on mobile and expand to full width on desktop, preventing text overlap.

