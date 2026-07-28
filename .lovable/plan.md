## Goal
Create a public marketing/support page dedicated to the TCL iOS app (App Store ID 6787331106) with three embedded demonstration videos from the uploaded screen recordings.

## Route
`/ios-app` — added in `src/App.tsx` with SEO metadata (title, meta description, `SoftwareApplication` JSON-LD linked to the App Store URL). Add nav entry in `IBMNavigation.tsx` under an appropriate menu.

## Video hosting
The three uploaded MP4s total ~136 MB — too large to bundle in the repo. Per the project's "large videos statically from /public" convention, publish each via Lovable Assets (CDN pointer JSON) instead. Reference them from the page as `<video controls playsInline preload="metadata" poster="…">` in a phone-frame wrapper.

Screen recordings, tentatively titled:
1. `07-02` recording → "Signing in & Jobs tab overview"
2. `07-06 2:44` recording → "Completing a service order (photos, notes, sign-off)"
3. `07-06 2:45` recording → "Workflows & Account tab"

(Titles finalized after quick review of each clip once we're in build mode.)

## Page structure (`src/pages/IosApp.tsx`)
Dark-luxury styling matching the site (Playfair Display headings, DM Sans body, gold accents).

1. **Hero** — App icon, name "TCL Field Service", one-line pitch, "Download on the App Store" badge linking to `https://apps.apple.com/us/app/tcltechsolutions/id6787331106`, "Requires iOS 17+", veteran-owned tag.
2. **What it is** — 3–4 sentences: field-service companion for TCL technicians and admins; sign in, view assigned work orders, capture photos/notes, collect client sign-off, manage account. Note it complements (does not replace) the web platform.
3. **Who it's for** — Two cards: Technicians / Admins, with bullet capabilities.
4. **How to use it** — Numbered walkthrough mirroring the v3 app manual sections:
   - Install & sign in (Account tab)
   - Jobs tab: browse assigned work orders
   - Open a work order: checklist, photos, notes
   - Capture client sign-off
   - Workflows screen (Platform section)
   - Account: profile, sign out, delete account
5. **Video demonstrations** — Three-column responsive grid (stacks on mobile), each video in an iPhone-frame div with caption and short description of what it shows.
6. **FAQ** — 4–5 Q&As: Who can sign in? Is my data private? How is data deleted? Does it work offline? How do I get access?
7. **CTA footer** — App Store button + "Read the full manual" link → `/app-manual`, + contact link.

## Files touched
- `src/pages/IosApp.tsx` (new)
- `src/App.tsx` — import + route + SEO entry with SoftwareApplication JSON-LD
- `src/components/IBMNavigation.tsx` — add "iOS App" link
- `src/assets/ios-demo-*.mp4.asset.json` (3, via `lovable-assets create` from `/mnt/user-uploads/`)
- `public/sitemap.xml` — add `/ios-app` entry
- `public/robots.txt` / `public/llms.txt` — no changes needed unless you want AEO-indexed

## SEO
- Title: "TCL Field Service — iOS App | The Connected Lifestyle" (<60 chars)
- Description: 155-char pitch mentioning iOS, technicians, San Antonio.
- JSON-LD `SoftwareApplication` with `applicationCategory: BusinessApplication`, `operatingSystem: iOS 17+`, `offers` free, `installUrl` = App Store URL.
- Single H1, semantic sections, alt text on app icon.

## Out of scope
No backend changes. No changes to auth, RLS, or existing routes. No changes to the app manual.
