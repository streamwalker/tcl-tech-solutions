## Problem

The "This content is blocked" message is coming from the browser, not YouTube. Your site's Content Security Policy (CSP) in `index.html` only allows iframes from Google ad domains:

```
frame-src 'self' https://*.googlesyndication.com https://tpc.googlesyndication.com;
```

YouTube isn't in that list, so the browser refuses to render the player and shows the sad-page icon. The video itself is fine and embeddable.

## Fix

**1. `index.html` (line 359)** — extend `frame-src` to allow YouTube:

```
frame-src 'self' https://*.googlesyndication.com https://tpc.googlesyndication.com https://www.youtube.com https://www.youtube-nocookie.com;
```

Also add YouTube's image CDN to `img-src` so thumbnails/posters load:

```
img-src ... https://i.ytimg.com
```

**2. `src/pages/Index.tsx` (line 311)** — switch the embed URL to the privacy-enhanced domain (no cookies until play, friendlier with our cookie-consent banner):

```
https://www.youtube-nocookie.com/embed/0gVKShqKTd4?si=K6mN-HbWR63j6GdU
```

## Verify

- Hard refresh the homepage — the player should render in 16:9.
- Click play; video streams.
- "Share This Video" still copies the homepage URL.

No new dependencies, no component restructuring.