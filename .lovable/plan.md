

# Add Google AdSense Script to Site Head

Add the AdSense script tag to `index.html` inside the `<head>` section. Since this is a single-page app, `index.html` covers all pages.

## Change

**File: `index.html`**
- Add the AdSense `<script>` tag inside `<head>`, after the existing meta tags (before the closing `</head>`):

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4031739871952197" crossorigin="anonymous"></script>
```

Single file edit, one line addition.

