

# Josh.ai Tutorial & Training Subpage

## Overview
Create a new `/josh-ai-tutorial` page with comprehensive, beginner-friendly Josh.ai tutorials and training content. Add it to the site navigation under the Services dropdown.

## Content Structure

The page will have two main tabs: **Josh.ai Tutorial** and **Josh.ai Training**, covering:

**Tutorial Tab:**
- What is Josh.ai (overview, products: Josh Core, Josh One, Josh Micro, Josh Nano, Josh App, Josh Touchscreen)
- Getting Started (wake phrases: "Ok Josh", "Ok Home", "Hey Micro", "Nikola"; changing voice gender/accent)
- Voice Commands guide (Top 10 commands with examples: lights, TV, music, shades, scenes, weather, fan, Netflix, timers)
- Using the Josh App (dashboards, scenes, remote control from anywhere)
- JoshGPT (generative AI assistant features)
- Privacy & Security info
- Troubleshooting & FAQ

**Training Tab:**
- Step-by-step walkthroughs for common tasks (creating scenes, managing users, lighting control, entertainment)
- Tips & Tricks for less tech-savvy users
- Video embeds from Josh.ai's official YouTube tutorials
- Quick reference card of common commands

## Visual Content
- Embedded YouTube videos from Josh.ai's official channel (voice control tutorial, lighting control, user management, scenes)
- Product images referenced from josh.ai CDN/public URLs
- Custom icons and illustrations using Lucide icons
- Step-by-step numbered cards with visual hierarchy
- Color-coded command categories

## Technical Changes

### New File: `src/pages/JoshAiTutorial.tsx`
- Full page with Navigation + Footer
- Two-tab layout (Tutorial / Training) using existing Tabs component
- Accordion sections for expandable content
- Embedded YouTube iframes for video content
- Responsive grid cards for products and commands
- Badge components for difficulty levels (Beginner/Intermediate)

### Modified: `src/components/Navigation.tsx`
- Add "Josh.ai Tutorial" link to the Services dropdown menu

### Modified: `src/App.tsx`
- Add route: `/josh-ai-tutorial` pointing to new page

