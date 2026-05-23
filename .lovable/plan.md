## RLS Verification Plan

Goal: produce a repeatable, automated checklist that confirms RLS on the recently hardened tables (`academy_exam_attempts`, `academy_certificates`, `contact_submissions`) and re-validates the rest of the user-scoped tables for regressions.

### 1. Static checklist (read-only SQL via `supabase--read_query`)

Run a single audit query that returns one row per finding so anything non-empty is a failure:

```text
- Tables in public schema with rowsecurity = false
- Tables with FORCE row security disabled where it should be on
- Policies with qual = 'true' or with_check = 'true' (except known-public reads like knowledge_nodes)
- Tables granted INSERT/UPDATE/DELETE to anon or authenticated where policy is `false`
  (catches column-grant bypass of WITH CHECK false)
- SECURITY DEFINER functions whose EXECUTE is granted to anon/authenticated
  (must include issue_certificate_if_passed → service_role only)
- Policies on academy_exam_attempts / academy_certificates that allow client INSERT/UPDATE/DELETE
- contact_submissions INSERT policy must reference name/email/phone/project_type
  validation (not 'true')
```

Output is pasted into the plan note for the user.

### 2. Dynamic test cases (Edge Function: `rls-selftest`, dev-only)

A small Deno function that runs a fixed matrix using three clients: `anon`, `authenticated user A`, `authenticated user B`, and `service_role`. Each case asserts an exact outcome.

**academy_exam_attempts**
1. anon INSERT → denied
2. user A direct INSERT (bypassing edge function) → denied by `WITH CHECK false`
3. user A UPDATE own row → denied
4. user A SELECT user B's row → 0 rows
5. user A SELECT own row → returns row
6. service_role INSERT via `submit-final-exam` happy path → row created, score correct
7. submit-final-exam with tampered answers (extra fields, wrong length, unknown course) → 400
8. submit-final-exam called without JWT → 401

**academy_certificates**
9. anon/auth INSERT/UPDATE/DELETE → all denied
10. user A SELECT user B cert → 0 rows
11. Passing exam issues exactly one cert; second pass does not duplicate
12. Failing exam (<70%) issues no cert

**contact_submissions**
13. anon INSERT valid payload → success
14. anon INSERT invalid email / short name / bad project_type / >2000 char message → denied
15. anon SELECT → 0 rows (admin-only)
16. non-admin authenticated SELECT → 0 rows
17. admin SELECT → returns rows

**Regression sweep on user-scoped tables** (`clients`, `products`, `proposals`, `proposal_items`, `projects`, `project_tasks`, `service_orders`, `service_order_checklist`, `profit_analyses`, `academy_enrollments`, `academy_progress`, `academy_quiz_attempts`)
18. user A cannot SELECT/UPDATE/DELETE user B rows
19. user A INSERT with `user_id = userB` → denied by WITH CHECK
20. anon cannot SELECT/INSERT

### 3. Deliverables

- New edge function `supabase/functions/rls-selftest/index.ts` (verify_jwt = false; protected by an `RLS_SELFTEST_TOKEN` secret header so only the operator can invoke it).
- The function seeds two throwaway test users (created + deleted with service_role each run), executes the matrix, and returns `{ passed, failed: [...], summary }`.
- A short admin page is **not** added — invocation is via `supabase functions invoke` / curl with the secret token.
- A markdown report `docs/rls-verification.md` documenting the checklist, how to run, and how to interpret results.

### 4. Run + report

After deploy, invoke the function and paste the JSON summary. Any non-empty `failed` array is treated as a security regression and triggers a follow-up migration before closing the task.

### Technical notes
- Test users created via `auth.admin.createUser` with random emails `rls-test+<uuid>@example.invalid`, deleted in a `finally` block.
- Use two separate `createClient` instances signed in as each test user (via `signInWithPassword`) to evaluate RLS as `authenticated`, and a third using only the anon key for `anon` cases.
- Static audit query is idempotent and safe to run anytime; can later be wired into CI.
- No schema changes required unless the audit surfaces a real gap; in that case a follow-up migration is created.
