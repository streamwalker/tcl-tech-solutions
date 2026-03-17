

# Fix Broken Hero Image

The image at `/TCL Home Automation.jpg` is not loading because the filename contains spaces. The `src` attribute in `IBMHero.tsx` references `/TCL Home Automation.jpg` which browsers may fail to resolve.

## Fix

**File: `src/components/IBMHero.tsx`** (line ~72)
- URL-encode the space in the image path: change `src="/TCL Home Automation.jpg"` to `src="/TCL%20Home%20Automation.jpg"`

Alternatively, this same image is also referenced in `IBMRecommendations.tsx` — apply the same fix there too (line ~51).

One-line fix in each file.

