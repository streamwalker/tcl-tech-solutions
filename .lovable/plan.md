

## Plan: Remove Left Ad Sidebar

### Changes

**`src/pages/Index.tsx`**
- Remove the `<AdSidebar side="left" />` component
- Change the grid layout from 3-column (`xl:grid-cols-[200px_1fr_200px]`) to 2-column (`xl:grid-cols-[1fr_200px]`) so the right sidebar remains

No other files need changes. The `AdSidebar` component and import stay since the right sidebar still uses it.

