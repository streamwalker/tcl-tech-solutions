# Supabase config

- **Project ref:** `earjplippbonusveefjh`
- **URL:** `https://earjplippbonusveefjh.supabase.co`
- **Anon (publishable) key:**
  `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVhcmpwbGlwcGJvbnVzdmVlZmpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0NDIxNjgsImV4cCI6MjA4OTAxODE2OH0.m8gGAatOHBwx5-LDKFwpM7dfxOoPX-qA8aA7iqYUNtM`

## Swift client setup

```swift
import Supabase

extension SupabaseClient {
    static let tcl = SupabaseClient(
        supabaseURL: URL(string: "https://earjplippbonusveefjh.supabase.co")!,
        supabaseKey: "<anon key above>"
    )
}
```

Store the session in Keychain (supabase-swift default on iOS).

## Auth

- Email/password with email verification.
- Google via ASWebAuthenticationSession; configure redirect URL `tcl://auth-callback` and add it under Supabase Auth → URL Configuration (web admin already has Google enabled).
- Password reset deep link: `tcl://reset-password`.

## RLS
Never bypass. The anon key only unlocks rows that policies allow. For admin tooling, sign in as an admin user — do **not** ship the service-role key in the app.

## Edge function endpoints
`https://earjplippbonusveefjh.supabase.co/functions/v1/<name>` — but invoke via `supabase.functions.invoke("<name>", options:)` instead of constructing URLs.
