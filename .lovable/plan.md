# Certificates hub page

A single page that lists every certificate the signed-in student has earned, with quick view and download for each. The existing per-course certificate page (`/platform/academy/:courseSlug/certificate`) keeps working — this is the index/hub on top of it.

## Route

Add `/platform/academy/certificates` (rendered inside the existing `Platform` layout, gated by `AuthGuard` like the rest of `/platform/*`). Register it in `src/pages/Platform.tsx` next to the other academy routes.

## UX

Header: "My Certificates" + count, e.g. `2 of 3 courses certified`.

Three states:

1. **Empty** — no certificates yet. Show a friendly card explaining "Pass any course's final exam (≥70%) to earn a certificate" with a button to "Browse courses" (→ `/platform/academy`).
2. **Has certificates** — responsive grid (1 col mobile, 2 cols ≥md) of certificate cards. Each card shows:
   - Course icon + title
   - "Certified" badge with score (e.g. `Score 88%`)
   - Issue date + certificate number (mono)
   - Buttons: **View** (→ `/platform/academy/:courseSlug/certificate`) and **Download PDF**
3. **Locked previews** (below earned ones, collapsible "Courses still in progress") — for each course the student has progress in but no certificate yet, a muted card with progress bar and "Take final exam" button → `/platform/academy/:slug/exam` if all chapters built, else "Continue learning".

## Download

Reuse the existing print path: clicking **Download PDF** on a card navigates to the existing single-certificate page and triggers the print dialog automatically (already wired via `window.print()` in `CertificateView`). Implementation detail: pass a `?print=1` query param; `CertificatePage` reads it on mount and calls `window.print()` after the certificate renders. This avoids adding a new PDF-generation library and keeps the look identical to the on-screen certificate.

## Data

Single query at mount:

```
supabase.from("academy_certificates")
  .select("course_slug, final_score, certificate_no, issued_at")
  .order("issued_at", { ascending: false })
```

RLS already restricts rows to the current user (existing `own cert select` policy). Join to course metadata client-side via `getCourse(slug)` from `src/data/academy`.

For the in-progress section, also fetch `academy_progress` (already used on `AcademyHome`) to compute per-course completion percentage.

## Discoverability

- **Sidebar / navigation**: add a "Certificates" link to the Academy area. Lightest touch: add a button in the `AcademyHome` stats card ("Certificates earned") that links to the new page, plus a small `<Link>` chip in the Academy header next to "Browse catalog".
- The single-course certificate page gets a `← All certificates` back link in addition to the existing "Back to course" button.

## Files touched

- `src/pages/platform/CertificatesPage.tsx` — new hub.
- `src/pages/Platform.tsx` — register `academy/certificates` route (above the `:courseSlug` route to avoid the dynamic match swallowing it).
- `src/pages/platform/CertificatePage.tsx` — auto-print when `?print=1` is present; add "All certificates" back link.
- `src/pages/platform/AcademyHome.tsx` — wrap the "Certificates earned" stat card in a `Link` to the new page.

## Out of scope

- Server-rendered PDF generation (we rely on the browser print dialog → "Save as PDF").
- Public/shareable certificate verification URLs by `certificate_no`.
- LinkedIn share metadata.
- Email delivery of certificates.
