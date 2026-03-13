

# Disable Email Confirmation Requirement

The auth logs confirm the issue: sign-in attempts are failing with "Email not confirmed." We'll enable auto-confirm for email signups so users can sign in immediately without email verification.

## Change

Use the `configure_auth` tool to set `enable_signup: true` and `double_confirm_changes: false` with auto-confirm enabled. This is a single backend configuration change — no code edits needed.

