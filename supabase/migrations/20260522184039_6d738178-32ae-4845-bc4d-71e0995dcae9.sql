-- Prevent learners from directly creating or modifying final-exam results.
DROP POLICY IF EXISTS "own exam insert" ON public.academy_exam_attempts;
DROP POLICY IF EXISTS "own exam update" ON public.academy_exam_attempts;

REVOKE INSERT, UPDATE, DELETE ON public.academy_exam_attempts FROM anon, authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.academy_certificates FROM anon, authenticated;

-- Signed-in users must not directly execute the SECURITY DEFINER certificate helper.
REVOKE EXECUTE ON FUNCTION public.issue_certificate_if_passed(text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.issue_certificate_if_passed(text) TO service_role;

-- Replace the overly broad public insert rule with validation that preserves public contact submissions.
DROP POLICY IF EXISTS "Anyone can insert contact submissions" ON public.contact_submissions;
CREATE POLICY "Validated public contact submissions"
ON public.contact_submissions
FOR INSERT
TO public
WITH CHECK (
  char_length(btrim(name)) BETWEEN 1 AND 120
  AND char_length(btrim(email)) BETWEEN 3 AND 255
  AND email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'
  AND char_length(btrim(phone)) BETWEEN 7 AND 40
  AND project_type IN ('residential', 'commercial', 'builder', 'other')
  AND (message IS NULL OR char_length(message) <= 2000)
);