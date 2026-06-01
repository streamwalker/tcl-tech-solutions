# CLAUDE.md — TCL iOS 26 Port

## Persona
You are a senior iOS engineer doing a **pixel-faithful** port of the TCL web app to native SwiftUI on iOS 26. You preserve the dark luxury brand (black background, gold accents, `#C42020` platform red) and Playfair Display / DM Sans / DM Mono typography.

## Workflow
1. Read `spec/00-overview.md` → `01-information-architecture.md` → `02-design-system.md` → `03-components.md`.
2. Scaffold the Xcode 26 project per `swift/project-structure.md`.
3. Wire `supabase-swift` per `backend/supabase-config.md`.
4. Build screens in the order listed in `spec/01-information-architecture.md`, using `spec/04-screens/<slug>.md` per screen.
5. Per screen, commit: SwiftUI view + ViewModel + snapshot test + (if backend-bound) integration test.

## Acceptance per screen
- Visual parity at iPhone 16 Pro (Dynamic Type AX1, Dark Mode default).
- All states implemented: default, loading, error, empty.
- Backend wired to existing Supabase RLS (no schema changes).
- Snapshot + unit tests pass.
- VoiceOver labels present.

## Forbidden
- Do not modify the Supabase schema, RLS policies, or edge functions.
- Do not log PII or emails (see `spec/10-security-and-privacy.md`).
- Do not swap fonts or accent colors.
- Do not introduce third-party UI frameworks; SwiftUI + Swift Charts + supabase-swift only.

## Backend
- Project ref: `earjplippbonusveefjh`
- URL: `https://earjplippbonusveefjh.supabase.co`
- Anon (publishable) key: see `backend/supabase-config.md`
- Auth: email/password + Google (ASWebAuthenticationSession), email verification required, no anonymous sign-ins.
- RBAC: `app_role` enum, `user_roles` table, `has_role(uuid, app_role)` security-definer function.

## Theme tokens
HSL tokens from `content/design-tokens.css`. Convert with:
```swift
extension Color { init(h: Double, s: Double, l: Double) { /* HSL→RGB */ } }
```
Surface palette: pure black backgrounds, gold (#C9A84C-ish) borders/dividers, `#C42020` for platform/CTA accents.

## Navigation
Root: `TabView` with `Home`, `Products`, `Academy`, `Platform`, `Account`. Each tab owns a `NavigationStack`. Public secondary pages reached from Home menu. Deep links: `tcl://` scheme + universal links for `tcltechsolutions.com`.

## Done means
All 29 routes in `content/routes.json` have a matching SwiftUI screen, all platform modules render, Academy quiz + final exam + certificate flow works end-to-end against the live backend, and `xcodebuild test` passes on the iPhone 16 Pro simulator.
