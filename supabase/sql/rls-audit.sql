-- Read-only RLS audit. Empty result = pass.
WITH findings AS (
  SELECT 'rls_disabled' AS check_name, schemaname||'.'||tablename AS object, NULL::text AS detail
  FROM pg_tables WHERE schemaname='public' AND NOT rowsecurity
  UNION ALL
  SELECT 'always_true_policy', schemaname||'.'||tablename||':'||policyname,
         'cmd='||cmd||' qual='||COALESCE(qual,'')||' check='||COALESCE(with_check,'')
  FROM pg_policies
  WHERE schemaname='public'
    AND (qual='true' OR with_check='true')
    AND tablename NOT IN ('knowledge_nodes')
  UNION ALL
  SELECT 'definer_fn_public_grant', n.nspname||'.'||p.proname,
         array_to_string(p.proacl::text[], ',')
  FROM pg_proc p JOIN pg_namespace n ON n.oid=p.pronamespace
  WHERE n.nspname='public' AND p.prosecdef
    AND EXISTS (
      SELECT 1 FROM unnest(COALESCE(p.proacl, ARRAY[]::aclitem[])) a
      WHERE a::text LIKE 'anon=%' OR a::text LIKE 'authenticated=%'
    )
  UNION ALL
  SELECT 'critical_write_open', tablename||':'||policyname,
         'cmd='||cmd||' check='||COALESCE(with_check,'')
  FROM pg_policies
  WHERE schemaname='public'
    AND tablename IN ('academy_exam_attempts','academy_certificates')
    AND cmd IN ('INSERT','UPDATE','DELETE')
    AND COALESCE(with_check,'') NOT IN ('false')
    AND COALESCE(qual,'') NOT IN ('false')
  UNION ALL
  SELECT 'contact_insert_unvalidated', tablename||':'||policyname,
         'check='||COALESCE(with_check,'')
  FROM pg_policies
  WHERE schemaname='public' AND tablename='contact_submissions' AND cmd='INSERT'
    AND with_check NOT LIKE '%project_type%'
)
SELECT * FROM findings ORDER BY check_name;