

# Fix Navigation Logo Overlap

## Problem
The large `text-2xl` "The Connected Lifestyle" text in the Navigation component overlaps with the "Home" and "Services" menu links on certain viewport sizes.

## Solution
Replace the large text with the existing `VetOwnedLogo.jpg` image + a shorter "TCL" text label (matching the pattern already used in `IBMNavigation.tsx`), keeping it compact so it doesn't overlap navigation items.

## Changes

### `src/components/Navigation.tsx` (~lines 82-86)
Replace the current logo link:
```tsx
<Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700">
  The Connected Lifestyle
</Link>
```
With a compact logo + abbreviated name:
```tsx
<Link to="/" className="flex items-center space-x-2">
  <img src="/VetOwnedLogo.jpg" alt="TCL" className="h-8 w-8 rounded-sm object-cover" />
  <span className="text-lg font-semibold text-blue-600 hover:text-blue-700">TCL</span>
</Link>
```

This matches the `IBMNavigation` style and eliminates the overlap completely.

