

# Fix Employee Management Tabs Overflow on Mobile

The `TabsList` in `src/components/workforce/EmployeeManagement.tsx` (line 350) has no responsive grid classes, so the 4 tabs overflow horizontally on mobile.

## Fix

**File: `src/components/workforce/EmployeeManagement.tsx` (line 350)**
- Change `<TabsList>` to `<TabsList className="grid w-full grid-cols-2 md:grid-cols-4">`

This wraps tabs into a 2×2 grid on mobile and a single row on desktop.

