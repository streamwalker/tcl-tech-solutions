# Sign In | The Connected Lifestyle

**Route:** `/auth`
**OG Type:** website
**JSON-LD:** no

## Description
Sign in to your TCL account.

## SwiftUI screen
- Suggested name: `AuthScreen`
- Web source: see `reference/web-source-map.md` for the React file this mirrors.

## Layout
TBD by Claude Code. Match the React page section-for-section, preserving heading hierarchy, spacing, and gold-accent treatments.

## Data bindings
- Email/password + Google OAuth (ASWebAuthenticationSession).

## States
- Default
- Loading (if backend-bound)
- Error (if backend-bound)
- Empty (if backend-bound)
