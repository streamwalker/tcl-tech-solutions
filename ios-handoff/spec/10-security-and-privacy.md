# 10 — Security & Privacy

## Zero PII logging
Never log emails, phone numbers, addresses, names, or auth tokens. Use opaque IDs in logs. Mirror the web project's strict policy.

## Auth
- Email/password + Google. Email verification required. No anonymous sign-ins.
- Password reset via deep link `tcl://reset-password` → `ResetPasswordScreen` → `supabase.auth.update(password:)`.
- Store session in Keychain via supabase-swift's storage adapter.

## RBAC
- `app_role` enum: `admin | moderator | user`.
- Role checks via `has_role(uuid, app_role)` RPC. Never trust client-only state for admin gates.

## GDPR
- `user_consents` written on signup + cookie banner equivalent (in-app: a one-time consent sheet).
- Account deletion calls `delete-account` edge function; sign-out + clear Keychain afterwards.

## Network
- ATS enforced. TLS only.
- Pin Supabase cert? Optional; skip unless InfoSec asks.

## Crash + analytics
- No third-party SDKs without consent. If added, gate on consent.
