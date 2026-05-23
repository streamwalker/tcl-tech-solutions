# RLS Verification

Two complementary checks for the hardened tables (`academy_exam_attempts`, `academy_certificates`, `contact_submissions`) plus a regression sweep on every user-scoped table.

## 1. Static audit (read-only SQL)

Run the audit query in `supabase/sql/rls-audit.sql` (or via the Lovable Cloud SQL console). It returns one row per finding — **empty result = pass**.

Checks:
- Tables with RLS disabled
- Policies with `qual=true` or `with_check=true` (excluding intentional public reads)
- `SECURITY DEFINER` functions in `public` granted to `anon`/`authenticated`
- Client write policies on `academy_exam_attempts` / `academy_certificates` that aren't `false`
- `contact_submissions` INSERT policy without `project_type` validation

Last run: clean (0 findings).

## 2. Dynamic self-test (Edge Function)

Function: `rls-selftest`. Admin-only. Creates two throwaway users, runs ~40 assertions across the matrix below, deletes the users, returns JSON `{ summary, failed[], results[] }`.

### How to run

Sign in as an admin in the app, then from the browser console:
```js
const { data } = await supabase.functions.invoke("rls-selftest");
console.log(data);
```
Or via curl with an admin user's access token:
```bash
curl -H "Authorization: Bearer <ADMIN_JWT>" \
     -H "apikey: $ANON_KEY" \
     https://<project>.supabase.co/functions/v1/rls-selftest
```

### Test matrix

**academy_exam_attempts** — anon insert denied · authenticated direct insert denied (`WITH CHECK false`) · update own denied · cross-user select returns 0 · own select returns rows · `submit-final-exam` rejects invalid course · `submit-final-exam` returns 401 without JWT.

**academy_certificates** — anon insert denied · authenticated insert denied · update denied · delete denied · cross-user select returns 0.

**contact_submissions** — anon valid insert succeeds · invalid email/short name/bad project_type/oversized message all denied · anon select returns 0 · non-admin select returns 0.

**Regression sweep** (`clients`, `products`, `proposals`, `projects`, `service_orders`, `profit_analyses`, `academy_enrollments`, `academy_progress`, `academy_quiz_attempts`) — anon insert denied · insert with foreign `user_id` denied · cross-user select returns 0.

### Interpreting results

- `failed: []` → all RLS rules behaving as designed.
- Any entry in `failed` is a regression: read its `name` and `detail`, write a migration to fix, re-run.