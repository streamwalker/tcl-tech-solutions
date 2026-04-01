

# Compliance Gaps — What's Done vs. What's Missing

## Already Implemented
- TermsOfService page with full EULA text
- PrivacyPolicy page with GDPR language
- CookiePolicy page
- Compliance page (SOC 2, ISO 27001, ISO 42001, PCI-DSS overview)
- Cookie consent banner (CookieConsent component, used on homepage)
- Auth signup form with terms checkbox that blocks signup until checked
- All routes registered in App.tsx

## What's Missing

### 1. Record terms acceptance in the database
The signup checkbox exists but acceptance is never persisted. Create a `user_consents` table and record the timestamp + version when a user signs up.

**Migration**: Create `user_consents` table with columns: `id`, `user_id` (references auth.users, ON DELETE CASCADE), `consent_type` (text — e.g. "terms_v1"), `accepted_at` (timestamptz), with RLS so users can insert their own and read their own.

**Edit `src/pages/Auth.tsx`**: After successful `signUp`, insert a row into `user_consents` with the authenticated user's ID and current timestamp.

### 2. Add Content Security Policy meta tag
**Edit `index.html`**: Add a `<meta http-equiv="Content-Security-Policy">` tag in `<head>` with a policy that allows self, inline styles (needed for the dark theme inline styles), Google Fonts, Google AdSense, Supabase API, and Unsplash images. This hardens against XSS.

### 3. GDPR data rights on Dashboard
**Edit `src/pages/Dashboard.tsx`**: Add an "Account & Privacy" tab with:
- **Download My Data** button — fetches all user data (clients, proposals, projects, service orders, products) from the database and exports as a JSON file download
- **Delete My Account** button — confirmation dialog, then calls `supabase.rpc` or edge function to delete all user data + auth account (right to erasure)

### 4. CookieConsent on all pages (not just Index)
**Edit `src/App.tsx`**: Move `<CookieConsent />` into the App-level layout so it appears on every page, not just the homepage.

### 5. Edge function for account deletion
**Create `supabase/functions/delete-account/index.ts`**: Securely deletes all user data across tables and then calls `supabase.auth.admin.deleteUser()` using the service role key. Validates the JWT to ensure users can only delete themselves.

## Files to Create/Edit

| File | Action |
|------|--------|
| Migration SQL | Create `user_consents` table with RLS |
| `src/pages/Auth.tsx` | Insert consent record after signup |
| `index.html` | Add CSP meta tag |
| `src/pages/Dashboard.tsx` | Add Account & Privacy tab with data export + deletion |
| `src/App.tsx` | Move CookieConsent to app level |
| `supabase/functions/delete-account/index.ts` | Create edge function for account deletion |

