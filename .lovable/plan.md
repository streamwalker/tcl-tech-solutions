

# Portfolio Lightbox, Category Filter, and Hero Background Image

## Overview
Three enhancements to the homepage: (1) clickable portfolio photos that open in a lightbox modal, (2) category filter buttons above the portfolio grid, and (3) a dramatic background image on the hero section similar to the Emily Russell Realty project.

## Changes — all in `src/pages/Index.tsx`

### 1. Portfolio Lightbox Modal
- Add state for `selectedProject` (index or null)
- When a portfolio card is clicked, set `selectedProject` to open a full-screen modal overlay
- Modal shows: large image, title, category badge, description, and a close button (X)
- Left/right arrow navigation to cycle through projects
- Click outside or press Escape to close
- Dark overlay background matching the site theme (`rgba(0,0,0,0.9)`)
- Uses existing Dialog component from `src/components/ui/dialog.tsx` for accessibility (focus trap, Escape key)

### 2. Portfolio Category Filter
- Add state `activeFilter` with values: `"All"`, `"Residential"`, `"Commercial"`, `"Builder"`
- Render filter buttons above the portfolio grid, styled as pill buttons matching the gold/dark theme
- Active filter gets the gold highlight; others are muted
- Filter the `projects` array before rendering — "All" shows everything
- Smooth transition when filtering (existing AnimateIn handles re-render)

### 3. Hero Background Image
- Replace the solid gradient background on the hero section with an Unsplash image + dark gradient overlay
- Pattern from Emily Russell project: `background: linear-gradient(overlay) url(unsplash-image) center/cover no-repeat`
- Use a smart home / luxury interior image (e.g., modern living room with ambient lighting or home theater)
- Keep the existing dot pattern and radial glow effects layered on top
- The gradient overlay ensures text remains readable against the dark theme

### Technical Details
- Only `src/pages/Index.tsx` is modified
- Dialog import added from `@/components/ui/dialog`
- Two new `useState` hooks in `PortfolioSection`: `activeFilter` and `selectedProject`
- Hero section's `style.background` property updated to include the Unsplash URL with a dark gradient overlay

