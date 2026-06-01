# 05 — Backend Contract

All tables, RLS policies, GRANTs, functions, and triggers are in `backend/schema.sql`. Do **not** modify them in this port.

## Tables (public schema)

| Table | Owner scope | Notes |
|---|---|---|
| `clients`, `products`, `proposals`, `proposal_items`, `projects`, `project_tasks`, `service_orders`, `service_order_checklist`, `profit_analyses` | RLS: `auth.uid() = user_id` | Operator-owned platform data |
| `academy_enrollments`, `academy_progress`, `academy_quiz_attempts` | RLS: own + admin select | Self-managed |
| `academy_exam_attempts` | INSERT/UPDATE blocked from clients | Server-side via edge function `submit-final-exam` only |
| `academy_certificates` | Own + admin SELECT, no client INSERT | Issued via `issue_certificate_if_passed(course_slug)` RPC |
| `contact_submissions`, `urc_bridge_leads` | anon INSERT with validation; admin SELECT | Public lead capture |
| `knowledge_nodes` | Public SELECT | OmniCode read-only |
| `user_roles` | Admin RW + own SELECT | RBAC via `app_role` enum |
| `user_consents` | Own INSERT/SELECT | GDPR consents |

## RPCs
- `has_role(uuid, app_role) → boolean`
- `issue_certificate_if_passed(course_slug text) → academy_certificates`
- `update_updated_at_column()` trigger fn

## Edge functions (HTTPS, no JWT verification at gateway — verified in code)
- `academy-tutor` — lesson Q&A via Lovable AI
- `chat-bot` — public site chatbot
- `delete-account` — GDPR account deletion
- `platform-agent` — OpenClaw/ClawdBot with R/W module access
- `rls-selftest` — admin diagnostics
- `submit-final-exam` — only path to create `academy_exam_attempts`

Source copies live in `backend/edge-functions/`.

## Invocation pattern (Swift)
Use `supabase-swift`'s `functions.invoke(...)`. Never hand-construct `/functions/v1/...` URLs.
