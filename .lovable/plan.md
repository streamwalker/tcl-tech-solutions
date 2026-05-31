## Goal

Every public route emits a unique, correct `<link rel="canonical">` and a complete, consistent Open Graph + Twitter Card block — all pointing at the **www.tcltechsolutions.com** host. No duplicate canonicals, no stale apex-host URLs, no missing social previews.

## Changes

### 1. `src/components/Seo.tsx` — strengthen the per-route head

- Change `SITE` from `https://tcltechsolutions.com` → `https://www.tcltechsolutions.com`.
- Add a default `ogImage` fallback (the existing home-theater social image already in `index.html`) so every route ships a full social card, not just the few that pass `ogImage`.
- Emit a complete OG set on every route: `og:title`, `og:description`, `og:url`, `og:type`, `og:image`, `og:image:width` (1200), `og:image:height` (630), `og:image:alt`, `og:site_name` ("The Connected Lifestyle"), `og:locale` ("en_US").
- Emit a complete Twitter set: `twitter:card` ("summary_large_image"), `twitter:title`, `twitter:description`, `twitter:url`, `twitter:image`, `twitter:image:alt`.
- Allow per-route override of `ogImage` and a new optional `ogImageAlt`.

Helmet dedupes `<meta>` by `name`/`property`, so the per-route values cleanly replace the static ones in `index.html` for JS-executing crawlers; the static block remains as the fallback for non-JS social crawlers (LinkedIn, Slack, Facebook).

### 2. `index.html` — remove the duplicate canonical, fix the host

- **Delete** any static `<link rel="canonical">` from `<head>` (Helmet already emits one per route; `<link rel="canonical">` does NOT dedupe and would ship as two canonicals).
- Update the sitewide static fallbacks to the www host:
  - `og:url`, `twitter:url` → `https://www.tcltechsolutions.com/`
- Leave the sitewide `og:image`, `og:site_name`, `twitter:card` etc. in place as the no-JS fallback.

### 3. `src/App.tsx` — fill SEO gaps and pass `path` correctly

- The `SEO` map already covers all 27 public routes mounted under `<Page>`. Verify and:
  - Add an `ogImage` override for `/press` (the Damon Jackson Parade-of-Homes article) if a unique image exists; otherwise rely on the default.
  - Add the URC Bridge landing page's existing `SoftwareApplication` JSON-LD by promoting it from the inline `<Helmet>` into the central `SEO` map (or leave it inline — it doesn't affect canonical/OG work; flagged so the two don't drift).
- Confirm `/auth` and `/dashboard` keep their entries (they aren't in the sitemap but still benefit from a clean canonical when shared).

### 4. `src/pages/urc-bridge/Landing.tsx` — stop double-emitting head tags

- The page currently wraps `<Helmet>` directly to add JSON-LD. Move that JSON-LD into the `SEO` map entry's `jsonLd` field so it flows through the same `<Seo>` component. Avoids a second `<Helmet>` instance on the same route.

### 5. `public/sitemap.xml` — align host

- Replace any `https://tcltechsolutions.com` or `https://tcl.streamwalkers.com` `<loc>` with `https://www.tcltechsolutions.com` so the sitemap-advertised host matches the canonical host.

### 6. Verification

- After changes, mentally walk three routes (`/`, `/products/urc-bridge`, `/press`) and confirm: exactly one `<link rel="canonical">`, og/twitter URLs match canonical, og:image present, JSON-LD intact.
- Run `seo_chat--list_findings` after the implementation to mark canonical/OG-related findings as fixed.

## Out of scope

- No new routes, no new content, no design changes.
- No SSR — the existing client-side Helmet limitation for social crawlers remains; the static `index.html` fallback covers it for the home page.
- No new images generated; the existing home-theater social image is reused as the default.
- No changes to `/platform/*` (gated, no SEO needed).

## Technical notes

```
Canonical host: https://www.tcltechsolutions.com (chosen by user)
Default og:image: existing GCS social image already in index.html
Helmet dedupe: meta[name|property] = yes, link[rel] = NO → must remove static canonical
Routes touched: 0 (only Seo.tsx + App.tsx data + index.html + sitemap.xml + Landing.tsx cleanup)
```
