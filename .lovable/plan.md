## Goal

Replace the bland "video player couldn't load" fallback with a premium, on-brand placeholder that looks like an intentional video poster — not an error.

## Design

A full-bleed cinematic poster card filling the same 16:9 frame:

```text
+-------------------------------------------------------------+
|  [YouTube maxres thumbnail, darkened with gold vignette]    |
|                                                             |
|        FEATURED · TCL TECH SOLUTIONS                        |
|                                                             |
|              ( ▶ )   <- large gold play button              |
|                                                             |
|        See The Connected Lifestyle in Action                |
|        Tap to watch on YouTube · 2 min                      |
|                                                             |
|                                  [ Try embedded player ]    |
+-------------------------------------------------------------+
```

- Background: `https://i.ytimg.com/vi/0gVKShqKTd4/maxresdefault.jpg` with a dark gradient overlay (`linear-gradient(135deg, rgba(10,10,14,0.85), rgba(18,18,26,0.6))`) and subtle gold inner border.
- Centered 88px circular gold play button (`#D4A03C` → `#C49030` gradient, soft shadow, white triangle). The whole card is a clickable `<a>` opening `videoUrl` in a new tab.
- Top-left chip: small gold `FEATURED` eyebrow with TCL wordmark in DM Mono.
- Bottom-left text block: title + supporting line "Tap to watch on YouTube".
- Bottom-right small ghost button: "Try embedded player" (resets `failed`/`loaded` so the iframe re-attempts) — replaces the current "Try again".
- Mobile: stacks the bottom row, scales play button to 64px, keeps the poster background.

No clapperboard emoji, no "couldn't load" headline — the failure is reframed as a polished poster.

## Implementation

Single edit to `VideoSection` in `src/pages/Index.tsx` (lines ~329–347): replace the current fallback `<div>` with the new poster markup. Keep state, timeout logic, and `videoUrl` unchanged.

## CSP

`i.ytimg.com` is already in `img-src` (added previously), so the thumbnail will load even when the iframe is blocked. No `index.html` changes needed.

## Verification

- With iframe blocked (or after the 5s timeout), the poster appears with the real YouTube thumbnail, gold play button, and TCL branding.
- Clicking the card opens the video on YouTube in a new tab.
- "Try embedded player" re-attempts the iframe.
- Looks intentional on both desktop and 440px mobile.
