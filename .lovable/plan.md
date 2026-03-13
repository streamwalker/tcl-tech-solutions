

## Plan: 3-Column Layout with Sticky Ad Sidebars

### Overview
Add left and right sticky ad sidebars flanking the main content on the Index page, creating a 3-column layout at 1920px. Each sidebar contains distinctive mock ads that scroll independently. At the bottom, both sides show PicPoppit ads.

### What We'll Build

#### 1. Create `src/components/AdSidebar.tsx`
A reusable sticky sidebar component that accepts a `side` prop ("left" | "right") and renders the appropriate ads:

**Left sidebar ads (top to bottom):**
- **Drip Slayer** — streetwear/gaming aesthetic, bold neon green/black
- **Codex Miraculorum** — mystical book/artifact, gold/dark parchment style
- **Avengers: Doomsday** — dark cinematic, Marvel red accents
- **Apple Watch Ultra 3** — sleek black/orange tech product card
- **PicPoppit** — colorful photo app ad at the bottom

**Right sidebar ads (top to bottom):**
- **EquiForge** — teal/purple gradient fintech card
- **Turo Cybertruck** — photo-style car rental ad
- **Avengers: Doomsday** — same movie ad (different layout variant)
- **Apple Watch Ultra 3** — same product (different layout variant)
- **PicPoppit** — matching bottom ad

Each ad is a styled card with:
- Distinctive visual design (gradients, colors, typography)
- Clickable target (`<a>` with `href="#"` and `target="_blank"`)
- Hover effects
- Fixed width (~160-200px per ad)

#### 2. Update `src/pages/Index.tsx`
Wrap the existing content in a 3-column CSS Grid layout:
```text
┌──────────┬──────────────────────────┬──────────┐
│  Left    │                          │  Right   │
│  Sidebar │     Main Content         │  Sidebar │
│  (sticky)│     (scrolls normally)   │  (sticky)│
│          │                          │          │
│  Drip    │  IBMNavigation           │  EquiFor │
│  Slayer  │  IBMHero                 │  ge      │
│          │  IBMRecommendations      │          │
│  Codex   │  ...all sections...      │  Turo    │
│  Miracul │  Footer                  │  Cyber   │
│          │                          │  truck   │
│  Avenger │                          │          │
│  s       │                          │  Avenger │
│          │                          │  s       │
│  Apple   │                          │          │
│  Watch   │                          │  Apple   │
│          │                          │  Watch   │
│  PicPopp │                          │          │
│  it      │                          │  PicPopp │
│          │                          │  it      │
└──────────┴──────────────────────────┴──────────┘
```

- Grid: `grid grid-cols-[200px_1fr_200px]` at `xl` breakpoint and above
- Sidebars hidden below `xl` (responsive)
- Each sidebar: `sticky top-0 h-screen overflow-y-auto` with independent scrolling
- Main content unchanged

### Files to Create
- `src/components/AdSidebar.tsx` — all ad card designs + sidebar container

### Files to Edit
- `src/pages/Index.tsx` — wrap in 3-column grid, render `<AdSidebar side="left" />` and `<AdSidebar side="right" />`

