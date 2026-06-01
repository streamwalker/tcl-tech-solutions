# Auth flows

## Sign up
1. `supabase.auth.signUp(email:password:redirectTo: URL("tcl://auth-callback"))`
2. Show "Check your inbox" screen.
3. After verification, user lands back via universal link → `RootView` re-evaluates session.

## Sign in (email)
`supabase.auth.signIn(email:password:)`

## Sign in (Google)
```swift
let url = try supabase.auth.getOAuthSignInURL(provider: .google, redirectTo: URL("tcl://auth-callback"))
let callback = try await ASWebAuthenticationSession.start(url: url, callbackURLScheme: "tcl")
try await supabase.auth.session(from: callback)
```

## Session lifecycle
Subscribe to `supabase.auth.authStateChanges` at app launch. Drive UI from an `@Observable AuthStore`.

## Reset password
1. `supabase.auth.resetPasswordForEmail(email, redirectTo: URL("tcl://reset-password"))`
2. Deep link opens `ResetPasswordScreen` → `supabase.auth.update(password:)`.

## Delete account
Invoke `delete-account` edge function with the user's JWT; on success, sign out + clear Keychain + return to onboarding.
