

# Full AEO + SEO Optimization

## What is AEO?
Answer Engine Optimization targets AI-powered search tools (ChatGPT, Perplexity, Google AI Overviews, Bing Copilot) that extract direct answers from web content. AEO requires clear, concise, well-structured content that AI can parse — structured data, semantic HTML, and authoritative "snippet-ready" answers.

## Current State
- SEO is strong: JSON-LD (LocalBusiness, FAQPage, BreadcrumbList), meta tags, sitemap, robots.txt all in place
- `SEOContent.tsx` component exists but is **never used** — it's not imported on any page
- FAQ section on the Index page uses inline styles without semantic `<article>` or schema markup
- No `speakable` schema, no `HowTo` schema, no `Organization` knowledge panel schema
- Missing `meta robots` directives for AI crawlers (GPTBot, PerplexityBot, etc.)

## Changes

### 1. `robots.txt` — Allow AI crawlers explicitly
Add explicit rules for GPTBot, ChatGPT-User, PerplexityBot, Anthropic, and Google-Extended to signal AEO friendliness.

### 2. `index.html` — Add AEO-focused structured data
- **Organization schema** with `sameAs` links for knowledge graph authority
- **Speakable schema** marking key sections AI assistants should read aloud
- **HowTo schema** for "How to get started with smart home automation" — a high-intent query AI engines love to surface
- Add all 10 FAQs from `SEOContent.tsx` to the existing FAQPage JSON-LD (currently only 5)
- Add `meta` tag for AI snippet eligibility: `<meta name="robots" content="max-snippet:-1, max-image-preview:large">`

### 3. `src/pages/Index.tsx` — Import and render `SEOContent`
Add `<SEOContent />` before the footer so the FAQ accordion, service areas, ZIP codes, brand keywords, and internal link hub are all rendered and crawlable. This is the biggest AEO win — it puts concise, direct answers on the page.

### 4. `src/components/SEOContent.tsx` — Add AEO enhancements
- Wrap the FAQ section with `itemScope`/`itemType` microdata attributes mirroring the JSON-LD for redundancy (belt-and-suspenders approach AI crawlers prefer)
- Add a new "Quick Answers" block at the top with short, direct 1-2 sentence answers to top queries (e.g., "The Connected Lifestyle is a veteran-owned smart home company in San Antonio, TX. Call (210) 995-8655 for a free consultation.") — these are optimized for AI snippet extraction
- Add `id` anchors to each section for deep-linking and speakable targeting

### 5. `src/pages/Services.tsx` — Add per-service semantic content
Add a brief "About this service" paragraph under each service card using `<article>` tags with clear question-answer format that AI engines can extract.

## Files Modified
| File | Change |
|------|--------|
| `public/robots.txt` | Add AI crawler rules |
| `index.html` | Organization + Speakable + HowTo schemas, expand FAQ schema to 10 items, add max-snippet meta |
| `src/pages/Index.tsx` | Import and render `SEOContent` |
| `src/components/SEOContent.tsx` | Add Quick Answers block, microdata attributes, section anchors |
| `src/pages/Services.tsx` | Add semantic `<article>` wrappers with AEO-friendly content |

