DO $$
DECLARE r record; n int;
BEGIN
  SELECT count(*) INTO n FROM auth.users;
  RAISE NOTICE 'total users in auth.users: %', n;
  RAISE NOTICE '--- ten most recent accounts ---';
  FOR r IN
    SELECT email, created_at, (email_confirmed_at IS NOT NULL) AS confirmed
      FROM auth.users ORDER BY created_at DESC LIMIT 10
  LOOP
    RAISE NOTICE 'email=% created=% confirmed=%', r.email, r.created_at, r.confirmed;
  END LOOP;
  RAISE NOTICE '--- anything resembling a demo account ---';
  FOR r IN
    SELECT email FROM auth.users
     WHERE email ILIKE '%demo%' OR email ILIKE '%tech%' OR email ILIKE '%admin%'
  LOOP
    RAISE NOTICE 'match: %', r.email;
  END LOOP;
END $$;