

# Add Founder's Keynote Speech Video to About Page

## Overview
Copy the uploaded video to the project and embed it on the About page under a new "Founder's Keynote Speech" section.

## Steps

### 1. Copy video to public directory
Copy `user-uploads://TCL_CEO_Keynote_Speech.mp4` → `public/videos/TCL_CEO_Keynote_Speech.mp4`

Using `public/` because video files are best served as static assets (too large for bundling via `src/assets`).

### 2. Edit `src/components/About.tsx`
Add a new section between the Damon Jackson profile card and the Professional Certifications section:

- **Section title**: "Founder's Keynote Speech"
- **HTML5 `<video>` element** with `controls`, `poster` (optional), and responsive styling
- Styled consistently with the existing card-based layout (rounded corners, shadow, dark card background)
- Video source: `/videos/TCL_CEO_Keynote_Speech.mp4`

