
-- Admin full access to job-photos and job-signatures
CREATE POLICY "Admins manage job-photos" ON storage.objects
  FOR ALL TO authenticated
  USING (bucket_id = 'job-photos' AND public.has_role(auth.uid(), 'admin'))
  WITH CHECK (bucket_id = 'job-photos' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins manage job-signatures" ON storage.objects
  FOR ALL TO authenticated
  USING (bucket_id = 'job-signatures' AND public.has_role(auth.uid(), 'admin'))
  WITH CHECK (bucket_id = 'job-signatures' AND public.has_role(auth.uid(), 'admin'));

-- Technicians: SELECT files in their assigned orders
CREATE POLICY "Techs view job-photos for assigned orders" ON storage.objects
  FOR SELECT TO authenticated
  USING (
    bucket_id = 'job-photos'
    AND public.is_assigned_technician(
      NULLIF((storage.foldername(name))[1], '')::uuid,
      auth.uid()
    )
  );

CREATE POLICY "Techs view job-signatures for assigned orders" ON storage.objects
  FOR SELECT TO authenticated
  USING (
    bucket_id = 'job-signatures'
    AND public.is_assigned_technician(
      NULLIF((storage.foldername(name))[1], '')::uuid,
      auth.uid()
    )
  );

-- Technicians: INSERT files under folders of assigned orders (owner must be self)
CREATE POLICY "Techs upload job-photos for assigned orders" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'job-photos'
    AND owner = auth.uid()
    AND public.is_assigned_technician(
      NULLIF((storage.foldername(name))[1], '')::uuid,
      auth.uid()
    )
  );

CREATE POLICY "Techs upload job-signatures for assigned orders" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'job-signatures'
    AND owner = auth.uid()
    AND public.is_assigned_technician(
      NULLIF((storage.foldername(name))[1], '')::uuid,
      auth.uid()
    )
  );

-- Technicians: UPDATE only own files under assigned orders
CREATE POLICY "Techs update own job-photos" ON storage.objects
  FOR UPDATE TO authenticated
  USING (
    bucket_id = 'job-photos'
    AND owner = auth.uid()
    AND public.is_assigned_technician(
      NULLIF((storage.foldername(name))[1], '')::uuid,
      auth.uid()
    )
  )
  WITH CHECK (
    bucket_id = 'job-photos'
    AND owner = auth.uid()
    AND public.is_assigned_technician(
      NULLIF((storage.foldername(name))[1], '')::uuid,
      auth.uid()
    )
  );

CREATE POLICY "Techs update own job-signatures" ON storage.objects
  FOR UPDATE TO authenticated
  USING (
    bucket_id = 'job-signatures'
    AND owner = auth.uid()
    AND public.is_assigned_technician(
      NULLIF((storage.foldername(name))[1], '')::uuid,
      auth.uid()
    )
  )
  WITH CHECK (
    bucket_id = 'job-signatures'
    AND owner = auth.uid()
    AND public.is_assigned_technician(
      NULLIF((storage.foldername(name))[1], '')::uuid,
      auth.uid()
    )
  );

-- Technicians: DELETE only own files under assigned orders
CREATE POLICY "Techs delete own job-photos" ON storage.objects
  FOR DELETE TO authenticated
  USING (
    bucket_id = 'job-photos'
    AND owner = auth.uid()
    AND public.is_assigned_technician(
      NULLIF((storage.foldername(name))[1], '')::uuid,
      auth.uid()
    )
  );

CREATE POLICY "Techs delete own job-signatures" ON storage.objects
  FOR DELETE TO authenticated
  USING (
    bucket_id = 'job-signatures'
    AND owner = auth.uid()
    AND public.is_assigned_technician(
      NULLIF((storage.foldername(name))[1], '')::uuid,
      auth.uid()
    )
  );
