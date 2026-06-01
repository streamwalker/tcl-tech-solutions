# 09 — SEO, Metadata, App Indexing

Web SEO map in `content/routes.json`. For iOS:

- **Universal Links** on `tcltechsolutions.com` → matching screen via `apple-app-site-association` (hosted from web; coordinate with web team).
- **App Clip**: candidate experience = URC Bridge lead form (`/products/urc-bridge/demo`).
- **Spotlight**: index every Knowledge + Glossary + Academy lesson via `CSSearchableItem`.
- **App Shortcuts (iOS 17+)**: "Open URC Bridge", "Start Academy", "Contact TCL".
- **AppIntents**: expose `RequestDemo`, `EnrollInCourse`, `ViewCertificate`.

Do **not** ship Open Graph or JSON-LD inside the app; those are web-only concerns.
