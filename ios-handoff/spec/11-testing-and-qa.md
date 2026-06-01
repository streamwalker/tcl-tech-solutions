# 11 — Testing & QA

## Unit
- ViewModels: every state transition and Supabase error path.
- Theme: HSL → RGB conversions for every token.
- Data decoders: every Codable struct against fixture JSON.

## Snapshot (swift-snapshot-testing)
- Every screen × {default, loading, error, empty} × {light, dark} × {iPhone 16 Pro, iPad 13" Pro}.
- Dynamic Type: at least `.xLarge` and `AX1`.

## UI tests
- Auth happy path (email + Google).
- Enroll → lesson → chapter quiz → final exam → certificate.
- URC Bridge: submit a demo lead.

## Manual QA matrix
- iPhone 15, iPhone 16 Pro Max, iPad 11" — iOS 26 only.
- VoiceOver pass per screen.
- Dark mode parity vs web at `www.tcltechsolutions.com`.
