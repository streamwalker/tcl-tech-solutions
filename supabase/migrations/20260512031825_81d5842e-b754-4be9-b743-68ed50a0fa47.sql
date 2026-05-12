
-- 1) Remove direct INSERT on academy_certificates (prevent self-issuance)
DROP POLICY IF EXISTS "own cert insert" ON public.academy_certificates;

-- 2) Server-side issuance function: only issues if a passing exam attempt exists
CREATE OR REPLACE FUNCTION public.issue_certificate_if_passed(_course_slug text)
RETURNS public.academy_certificates
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _user_id uuid := auth.uid();
  _best_score numeric;
  _existing public.academy_certificates;
  _new public.academy_certificates;
BEGIN
  IF _user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  -- Must have at least one passed final exam attempt for this course
  SELECT MAX(score_pct) INTO _best_score
  FROM public.academy_exam_attempts
  WHERE user_id = _user_id
    AND course_slug = _course_slug
    AND passed = true;

  IF _best_score IS NULL OR _best_score < 70 THEN
    RAISE EXCEPTION 'No passing exam attempt on record for this course';
  END IF;

  -- Return existing certificate if already issued
  SELECT * INTO _existing
  FROM public.academy_certificates
  WHERE user_id = _user_id AND course_slug = _course_slug
  LIMIT 1;

  IF FOUND THEN
    RETURN _existing;
  END IF;

  INSERT INTO public.academy_certificates (user_id, course_slug, final_score)
  VALUES (_user_id, _course_slug, _best_score)
  RETURNING * INTO _new;

  RETURN _new;
END;
$$;

-- Restrict EXECUTE on SECURITY DEFINER helpers to internal use only
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;

-- issue_certificate_if_passed must be callable by signed-in users
REVOKE EXECUTE ON FUNCTION public.issue_certificate_if_passed(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.issue_certificate_if_passed(text) TO authenticated;
