

# Fix Navigation Inconsistency on Education (and Other) Pages

## Problem
The Education, BusinessPlan, and JoshAiTutorial pages use the old white `Navigation` component which shows a cropped VetOwnedLogo.jpg next to "TCL" — this looks unprofessional and doesn't match the site's dark luxury branding used on the homepage and Services page.

## Solution
Replace the old `Navigation` component with `IBMNavigation` on all pages that still use it, and adjust padding accordingly.

## Changes

| File | Change |
|------|--------|
| `src/pages/Education.tsx` | Replace `Navigation` import with `IBMNavigation`, update wrapper classes (remove `pt-16`, use dark theme background) |
| `src/pages/BusinessPlan.tsx` | Replace `Navigation` with `IBMNavigation`, adjust `pt-16` to `pt-12` |
| `src/pages/JoshAiTutorial.tsx` | Replace `Navigation` with `IBMNavigation`, adjust wrapper styles |

Each page will switch from:
```tsx
import Navigation from "../components/Navigation";
// ...
<Navigation />
```
To:
```tsx
import IBMNavigation from "@/components/IBMNavigation";
// ...
<IBMNavigation />
```

This gives every page the same dark branded navigation with "THE CONNECTED LIFESTYLE" logo that the homepage and Services page use.

