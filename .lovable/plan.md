

# Update Website with New TCL Design

## Overview
Replace the current Index (homepage) with the uploaded design — a dark luxury theme (black/gold) single-page layout with inline styles, scroll animations, tabbed services, portfolio, FAQ accordion, and contact form. The uploaded file is a self-contained component with sections: Hero (countdown timer + stats), Services (Residential/Commercial/Builders tabs), How It Works, Portfolio, Reviews, About, FAQ, and Contact.

## Approach
Convert the uploaded JSX into a proper TypeScript React component that integrates with the existing project (React Router, Tailwind environment), replacing the current `Index.tsx` homepage while keeping all other routes and subpages intact.

## Changes

### 1. Replace `src/pages/Index.tsx`
Rewrite the homepage using the uploaded file's content:
- All sections: Navbar, Hero (with countdown + stats), tabbed Services, Process, Portfolio, Reviews, About, FAQ, Contact form, Footer
- Keep inline styles as-is (the design uses them intentionally for the luxury dark theme)
- Convert to TypeScript (add proper types for props, refs, state)
- Replace `<a href="#section">` anchor links with smooth scroll behavior
- Keep the existing `Link` imports from react-router-dom for any cross-page navigation (e.g., nav links to `/business-plan`, `/capital-stack`, etc.)
- Add Google Fonts import for Playfair Display, DM Sans, DM Mono
- Retain existing `ChatBot` and `CookieConsent` components at the bottom
- Include navigation links to existing subpages (Platform, Investor, Capital Stack, etc.) in the navbar and footer

### 2. Remove unused homepage components
The following components are no longer used by the new Index page (they may still be used by other pages, so only remove imports from Index):
- `IBMNavigation`, `IBMHero`, `IBMRecommendations`
- `Services` (component), `DealerPartners`, `ValuePropositions`, `Testimonials`, `About`, `Experience`, `Contact`
- `Footer`, `SEOContent`, `AdSidebar`

### 3. Update `index.html`
Add Google Fonts link for Playfair Display, DM Sans, and DM Mono in the `<head>` to ensure fonts load before render.

### Key integration points
- Navbar will include links to existing routes: `/business-plan`, `/capital-stack`, `/investor-white-paper`, `/platform`, `/services`, `/josh-ai-tutorial`
- Contact form submission will be wired to the existing backend (insert into a contacts/leads table) rather than just local state
- Mobile responsive CSS media query for hamburger menu
- ChatBot and CookieConsent retained from current site

