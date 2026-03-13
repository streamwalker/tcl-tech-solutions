

## Plan: Aggressive SEO Optimization

### Overview
Saturate the site with internal links, keyword-rich content, structured data, and semantic HTML to maximize search engine visibility. The changes target the same techniques used by high-traffic sites: dense internal linking, long-tail keyword coverage, FAQ schema, breadcrumbs, semantic headings, and geo-targeted content.

### 1. Enhanced `index.html` — Meta & Structured Data
- Add `sitemap.xml` and `robots.txt` references via `<link rel="sitemap">`
- Add FAQ structured data (JSON-LD) for common smart home questions
- Add BreadcrumbList JSON-LD schema
- Add `<link rel="canonical">` tag
- Expand meta keywords with long-tail phrases (e.g., "smart home installer San Antonio TX", "home theater installation near me", "Control4 dealer San Antonio")

### 2. Create `public/sitemap.xml`
- List all public routes: `/`, `/services`, `/business-plan`, `/compliance`, `/terms-of-service`, `/privacy-policy`, `/cookie-policy`, `/investor-white-paper`, `/education`, `/auth`
- Set priority and changefreq values

### 3. Update `public/robots.txt`
- Add `Sitemap: https://tcltechsolutions.com/sitemap.xml`

### 4. New SEO Content Component — `src/components/SEOContent.tsx`
A keyword-rich section added to the Index page below the main content, containing:
- **Service area callouts** with geo-keywords (San Antonio, Helotes, Leon Springs, Alamo Ranch, 78245, 78253, 78254)
- **FAQ accordion** with 8-10 questions targeting long-tail keywords ("How much does smart home automation cost in San Antonio?", "What is the best home theater system for a living room?", etc.)
- **Internal link hub** — grid of links to every page on the site (`/services`, `/compliance`, `/business-plan`, `/education`, etc.) with keyword-rich anchor text
- **Brand keyword cloud** — mentions of Control4, Savant, Lutron, URC, RTI, AVA Cinema as keyword anchors

### 5. Update `src/components/Footer.tsx`
- Convert all service items from `<button>` to `<Link to="/services#...">` for crawlable internal links
- Convert company items to proper `<Link>` or `<a>` tags pointing to real routes
- Add links to `/education`, `/builder-deck`, `/omnicode`
- Add a "Service Areas" text block with San Antonio neighborhoods
- Use `<Link>` from react-router-dom instead of `<a>` for internal routes

### 6. Update `src/components/IBMNavigation.tsx`
- Add links in Solutions dropdown: Workforce Management → `/dashboard`, OmniCode → `/omnicode`
- Add links in Support dropdown: Help Center and Contact Support → scroll to `#contact` or `/services`
- Ensure all dropdown items are wrapped in `<Link>` for crawlability

### 7. Update `src/components/IBMHero.tsx`
- Add keyword-rich `alt` text on images
- Add semantic `<h2>` and `<h3>` tags with keywords
- Ensure news items link to real routes (e.g., `/services`, `/omnicode`, `/dashboard`)

### 8. Update `src/components/IBMRecommendations.tsx`
- Add `aria-label` attributes with keyword phrases on cards
- Ensure all `alt` text is keyword-optimized

### 9. Update existing section components for keyword density
- **Services.tsx** (component): Add "San Antonio" and geo-keywords in descriptions
- **Testimonials.tsx**: Add "San Antonio" location context, structured review data
- **About.tsx**: Add `itemScope`/`itemType` for Organization schema via JSON-LD in the component
- **Contact.tsx**: Add LocalBusiness keywords in heading/description text

### 10. Update `src/pages/Services.tsx` (page)
- Add an FAQ section at the bottom with service-specific questions
- Add internal links to `/business-plan`, `/compliance`, `/education`
- Add a "Service Areas" section with neighborhood names

### Files to Create
- `public/sitemap.xml`
- `src/components/SEOContent.tsx`

### Files to Edit
- `index.html` — canonical, FAQ schema, expanded meta
- `public/robots.txt` — sitemap reference
- `src/pages/Index.tsx` — add SEOContent component
- `src/components/Footer.tsx` — crawlable internal links, service areas
- `src/components/IBMNavigation.tsx` — real links in all dropdowns
- `src/components/IBMHero.tsx` — keyword alt text, real link targets
- `src/components/IBMRecommendations.tsx` — keyword alt text
- `src/components/Testimonials.tsx` — location keywords
- `src/components/Contact.tsx` — geo-keyword headings
- `src/pages/Services.tsx` — FAQ section, internal links, service areas

