

# Add More Video Content & Product Photography to Josh.ai Tutorial

## Current State
The page has 4 YouTube videos and uses only Lucide icons for products — no product images or lifestyle photography.

## Changes

### 1. Expand video library (videos array, line 114)
Add 8 more official Josh.ai YouTube videos covering topics like:
- Josh Micro installation overview
- Josh Touchscreen demo
- JoshGPT capabilities
- Multi-room audio
- Josh + Lutron integration
- Privacy & security features
- Josh One product showcase
- Josh App deep dive

Reorganize the video grid into two sections: "Getting Started" (beginner) and "Advanced Features" in the Training tab.

### 2. Add product photography section (Tutorial tab, after products grid ~line 186)
Add a visual product gallery using high-quality images from Josh.ai's public website/CDN:
- Josh Core, Josh One, Josh Micro, Josh Nano, Josh Touchscreen
- Lifestyle shots of Josh in-situ (living rooms, kitchens)
- Use `<img>` tags with josh.ai public image URLs, with fallback alt text and rounded styling

### 3. Add hero lifestyle image
Add a lifestyle/product banner image in the hero section showing Josh devices in a smart home setting.

### 4. Add visual product cards with images
Update the products array to include image URLs from josh.ai's public assets, and render them as image cards with photos above the text descriptions.

### File Modified
- `src/pages/JoshAiTutorial.tsx` — expand videos array, add product image URLs, add lifestyle imagery sections, restructure video tutorials into categorized groups

