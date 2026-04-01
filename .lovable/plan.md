

# Add Headshot & Parade of Homes Branding

## Steps

### 1. Copy uploaded assets to project
- Copy `user-uploads://Image_4-1-26_at_09.50.png` → `src/assets/damon-jackson-headshot.png`
- Copy `user-uploads://IMG_3479-2.png` → `src/assets/parade-of-homes-2026-logo.png` (the second Parade logo image — check if it differs from existing `parade-of-homes-2026.png`)

### 2. Replace placeholder avatar with headshot (`src/pages/Index.tsx`, ~line 559)
- Import the headshot image
- Replace the "DJ" initials circle with an `<img>` tag using the headshot, styled as a circular 100×100 avatar with `object-fit: cover`

### 3. Add Co-Chair / Parade of Homes branding to profile card (~line 564)
- Update the subtitle from "Founder & CEO" to "Founder & CEO · Co-Chair, 2026 Parade of Homes"
- Optionally add the Parade of Homes logo as a small badge next to or below his title

### 4. Add Parade of Homes branding to keynote video caption (~line 584-587)
- Mention his Co-Chair role in the video description text

### 5. Evaluate other appropriate placements
- The hero section already has a Parade of Homes banner (line 219-227) — no changes needed there
- The Press page already features the Parade of Homes prominently — no changes needed

