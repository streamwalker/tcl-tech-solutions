# 01 — Information Architecture

## Tab bar
1. **Home** — landing + secondary public pages via menu.
2. **Products** — URC Bridge micro-site root.
3. **Academy** — course catalog, courses, lessons, quizzes, certificates.
4. **Platform** — operator suite (auth required).
5. **Account** — sign in / profile / consents / delete account.

## Build order
Implement screens in this order; one PR per screen.

1. Auth + Account
2. Home (`/`)
3. Services, About blocks, Contact form
4. URC Bridge: Landing → Pricing → FAQ → Demo → Pilot → Docs → Download
5. Press, Knowledge, Glossary
6. Business Plan, Investor White Paper, Capital Stack, Builder Deck
7. Education + Academy Catalog (public)
8. Josh AI Tutorial, OmniCode, Troubleshooting/DNS
9. Compliance, Terms, Privacy, Cookie
10. Dashboard
11. Platform: Dashboard → Clients → Products → Proposals → Projects → Service Orders → Profit Analysis → URC Bridge Admin → Dossier → Star Panel → Upgrade Model
12. Academy authenticated flows: Course → Lesson → Chapter Quiz → Final Exam → Certificate → Certificates list

Full route table: see `content/routes.json` (29 entries).

## Deep links
- Universal links: `https://www.tcltechsolutions.com/<path>` → matching screen.
- Custom scheme `tcl://reset-password` for password reset deep link.
