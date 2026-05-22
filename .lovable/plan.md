## Goal

Activate Google AdSense (publisher `ca-pub-4031739871952197`) sitewide using Auto Ads, replace the fake sidebar cards in `AdSidebar.tsx` with real AdSense display units, and ship the supporting files Google requires for serving and verification.

## Changes

### 1. `public/ads.txt` (new)
Required by AdSense to authorize your account to monetize the domain. Single line:

```
google.com, pub-4031739871952197, DIRECT, f08c47fec0942fa0
```

Served at `https://tcltechsolutions.com/ads.txt` automatically by Vite's public dir.

### 2. `index.html`
- Keep the existing AdSense script tag (already present, correct).
- Add an Auto Ads activation snippet so Google can place anchor/in-page ads automatically:

```html
<script>
  (adsbygoogle = window.adsbygoogle || []).push({
    google_ad_client: "ca-pub-4031739871952197",
    enable_page_level_ads: true
  });
</script>
```

- CSP already allows `pagead2.googlesyndication.com` and `*.googlesyndication.com` — no CSP changes needed.

### 3. `src/components/AdSense.tsx` (new)
Small reusable React component that renders an `<ins class="adsbygoogle">` slot and pushes `adsbygoogle` on mount. Props: `slot` (ad unit ID), `format` (default `auto`), `responsive` (default `true`), optional `style`/`className`. Handles SPA re-renders safely (guards against double-push, re-pushes on route change via a key).

### 4. `src/components/AdSidebar.tsx` (replace)
Delete all six placeholder ad components (Drip Slayer, Codex Miraculorum, Avengers, Apple Watch, EquiForge, Turo, PicPoppit). Replace each sidebar with 2–3 real `<AdSense />` slots stacked in the same sticky column. Since you're using Auto Ads only, the sidebar will use **display ad units with `data-ad-format="auto"` and no explicit slot ID** — Google's Auto Ads will fill them based on page context. If/when you create named display units in AdSense, swap in those slot IDs.

Layout, sticky positioning, `hidden xl:block`, and the dark-theme container styling are preserved so the page rhythm doesn't shift.

### 5. `public/robots.txt`
No changes required — Googlebot and `Mediapartners-Google` are already allowed under `User-agent: *`. (AdSense's crawler `Mediapartners-Google` falls back to `*` rules.)

## Out of scope

- No manual in-article ad placements (you chose Auto Ads only).
- No changes to other pages — Auto Ads handles in-page placement automatically once the snippet ships.
- No AdSense account changes — verification, payment setup, and ads.txt validation happen in your AdSense dashboard after deploy.

## Post-deploy checklist (you do these in AdSense)

1. Confirm `https://tcltechsolutions.com/ads.txt` returns the single line above.
2. In AdSense → Sites, confirm `tcltechsolutions.com` shows "Ready" with ads.txt status green.
3. In AdSense → Ads → Overview, enable **Auto ads** for the site and pick formats (anchor, in-page, side rail).
4. Allow 20–60 min for first ads to appear; ad blockers will hide them locally.
