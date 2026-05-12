# Add CINEMASHOP Star Panel subpage

Mirror the existing `/platform/dossier` pixel-perfect import pattern to embed the uploaded `CINEMASHOP_StarPanel_Platform.html` as a new module in the TCL Platform suite.

## Changes

1. **Copy assets to `public/`**
   - `user-uploads://CINEMASHOP_StarPanel_Platform.html` → `public/cinemashop-starpanel.html`
   - `user-uploads://CINEMASHOP_StarPanel_Manual.md` → `public/cinemashop-starpanel-manual.md` (so the HTML can reference it if needed, and for download)

2. **New page component** `src/pages/platform/StarPanelPage.tsx`
   - Same shape as `DossierPage.tsx`: full-bleed iframe (`-m-6 h-[calc(100vh-3rem)]`) pointing to `/cinemashop-starpanel.html`.

3. **Route** in `src/pages/Platform.tsx`
   - Add `<Route path="star-panel" element={<StarPanelPage />} />` at `/platform/star-panel`.

4. **Sidebar entry** in `src/components/platform/PlatformSidebar.tsx`
   - Add `{ title: "Star Panel", url: "/platform/star-panel", icon: Sparkles }` (lucide `Sparkles` icon, fits the fiber-optic star ceiling theme), placed just after "Client Dossier".

## Technical notes

- Prototype keeps its own dark theme/CSS — no design-token integration, matching the dossier import decision.
- No backend, no data model changes.
- The manual `.md` is shipped statically so the prototype's links resolve; no parser added.
