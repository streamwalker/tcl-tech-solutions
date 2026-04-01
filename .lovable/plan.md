

# Add Streamwalkers Footer to All Pages

## Problem
The shared `Footer` component (which contains the Streamwalkers "Built & maintained by" badge) is only used on 5 pages: BusinessPlan, Services, InvestorWhitePaper, CapitalStack, JoshAiTutorial. Many pages either have custom footers or no footer at all.

## Pages needing the Footer added

| Page | Current state | Action |
|------|--------------|--------|
| **Index.tsx** | Custom `SiteFooter` inline component | Replace with shared `Footer` component (or append Streamwalkers badge to existing) |
| **Press.tsx** | Custom inline `<footer>` | Replace with shared `Footer` component |
| **Education.tsx** | No footer | Add `Footer` |
| **Auth.tsx** | No footer | Add `Footer` |
| **PrivacyPolicy.tsx** | No footer | Add `Footer` |
| **TermsOfService.tsx** | No footer | Add `Footer` |
| **CookiePolicy.tsx** | No footer | Add `Footer` |
| **Compliance.tsx** | No footer | Add `Footer` |
| **Dashboard.tsx** | No footer | Add `Footer` |
| **Platform.tsx** | Uses `PlatformLayout` — no footer | Add `Footer` inside PlatformLayout |
| **OmniCode.tsx** | No footer | Add `Footer` |
| **NotFound.tsx** | No footer | Add `Footer` |
| **BuilderDeck.tsx** | Slide deck (already has subtle badge) | Skip — full footer not appropriate for slide deck |

## Approach
1. For **Index.tsx**: Replace the custom `SiteFooter` with the shared `Footer` component to get consistent branding including the Streamwalkers badge.
2. For **Press.tsx**: Replace the custom inline footer with the shared `Footer` component.
3. For all other pages listed above (except BuilderDeck and Platform): Import and add `<Footer />` at the bottom of each page.
4. For **Platform.tsx**: Add `<Footer />` inside the `PlatformLayout` component after the main content area.

This ensures the Streamwalkers "Built & maintained by" badge appears on every page consistently.

