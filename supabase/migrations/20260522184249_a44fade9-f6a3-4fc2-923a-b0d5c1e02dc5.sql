-- Make the direct-write denial explicit for scanners and future maintainers.
CREATE POLICY "No direct exam inserts from clients"
ON public.academy_exam_attempts
FOR INSERT
TO authenticated
WITH CHECK (false);

CREATE POLICY "No direct exam updates from clients"
ON public.academy_exam_attempts
FOR UPDATE
TO authenticated
USING (false)
WITH CHECK (false);