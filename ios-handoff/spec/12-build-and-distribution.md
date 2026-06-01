# 12 — Build & Distribution

## Project
- Xcode 26, Swift 6, iOS 26 deployment target.
- Targets: `TCL` (app), `TCLTests`, `TCLUITests`, optional `TCLAppClip`.
- SPM deps: `supabase-swift`, `swift-snapshot-testing`.

## Schemes
- `TCL-Debug` (sandbox Supabase env if/when added — for now uses prod with test users).
- `TCL-Release` (App Store).

## Signing
- Bundle id: `com.tcltech.tcl`.
- Team: TCL Tech Solutions LLC.
- Capabilities: Sign in with Apple (optional), Associated Domains (`applinks:tcltechsolutions.com`, `applinks:www.tcltechsolutions.com`), Keychain Sharing.

## Distribution
- TestFlight first (internal → external).
- App Store category: Business.
- Marketing URL: https://www.tcltechsolutions.com
- Support URL: https://www.tcltechsolutions.com/#contact
- Privacy Policy URL: https://www.tcltechsolutions.com/privacy-policy

## CI (suggested)
- GitHub Actions: `xcodebuild test -scheme TCL -destination 'platform=iOS Simulator,name=iPhone 16 Pro'`.
