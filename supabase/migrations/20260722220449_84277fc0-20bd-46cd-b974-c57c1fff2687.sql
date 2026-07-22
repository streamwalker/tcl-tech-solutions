
-- A) technician_id on service_orders (additive; keeps existing technician TEXT column)
ALTER TABLE public.service_orders
  ADD COLUMN IF NOT EXISTS technician_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS idx_service_orders_technician_id ON public.service_orders(technician_id);

-- B) Photos
CREATE TABLE public.service_order_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_order_id UUID NOT NULL REFERENCES public.service_orders(id) ON DELETE CASCADE,
  uploaded_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  storage_path TEXT NOT NULL,
  caption TEXT DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_service_order_photos_service_order_id ON public.service_order_photos(service_order_id);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.service_order_photos TO authenticated;
GRANT ALL ON public.service_order_photos TO service_role;
ALTER TABLE public.service_order_photos ENABLE ROW LEVEL SECURITY;

-- C) Notes (append-only log)
CREATE TABLE public.service_order_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_order_id UUID NOT NULL REFERENCES public.service_orders(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_service_order_notes_order_created ON public.service_order_notes(service_order_id, created_at DESC);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.service_order_notes TO authenticated;
GRANT ALL ON public.service_order_notes TO service_role;
ALTER TABLE public.service_order_notes ENABLE ROW LEVEL SECURITY;

-- D) Sign-offs
CREATE TABLE public.service_order_signoffs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_order_id UUID NOT NULL UNIQUE REFERENCES public.service_orders(id) ON DELETE CASCADE,
  captured_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  signer_name TEXT NOT NULL,
  signer_role TEXT DEFAULT '',
  signature_path TEXT NOT NULL,
  signed_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.service_order_signoffs TO authenticated;
GRANT ALL ON public.service_order_signoffs TO service_role;
ALTER TABLE public.service_order_signoffs ENABLE ROW LEVEL SECURITY;

-- Security-definer helper: is the caller the assigned technician on this order?
CREATE OR REPLACE FUNCTION public.is_assigned_technician(_order_id uuid, _user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.service_orders
    WHERE id = _order_id AND technician_id = _user_id
  )
$$;

-- Photos policies
CREATE POLICY "Admins manage all photos" ON public.service_order_photos
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Assigned technicians view photos" ON public.service_order_photos
  FOR SELECT TO authenticated
  USING (public.is_assigned_technician(service_order_id, auth.uid()));

CREATE POLICY "Assigned technicians insert photos" ON public.service_order_photos
  FOR INSERT TO authenticated
  WITH CHECK (
    uploaded_by = auth.uid()
    AND public.is_assigned_technician(service_order_id, auth.uid())
  );

CREATE POLICY "Technicians update own photos" ON public.service_order_photos
  FOR UPDATE TO authenticated
  USING (uploaded_by = auth.uid() AND public.is_assigned_technician(service_order_id, auth.uid()))
  WITH CHECK (uploaded_by = auth.uid() AND public.is_assigned_technician(service_order_id, auth.uid()));

CREATE POLICY "Technicians delete own photos" ON public.service_order_photos
  FOR DELETE TO authenticated
  USING (uploaded_by = auth.uid() AND public.is_assigned_technician(service_order_id, auth.uid()));

-- Notes policies
CREATE POLICY "Admins manage all notes" ON public.service_order_notes
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Assigned technicians view notes" ON public.service_order_notes
  FOR SELECT TO authenticated
  USING (public.is_assigned_technician(service_order_id, auth.uid()));

CREATE POLICY "Assigned technicians insert notes" ON public.service_order_notes
  FOR INSERT TO authenticated
  WITH CHECK (
    author_id = auth.uid()
    AND public.is_assigned_technician(service_order_id, auth.uid())
  );

CREATE POLICY "Technicians update own notes" ON public.service_order_notes
  FOR UPDATE TO authenticated
  USING (author_id = auth.uid() AND public.is_assigned_technician(service_order_id, auth.uid()))
  WITH CHECK (author_id = auth.uid() AND public.is_assigned_technician(service_order_id, auth.uid()));

CREATE POLICY "Technicians delete own notes" ON public.service_order_notes
  FOR DELETE TO authenticated
  USING (author_id = auth.uid() AND public.is_assigned_technician(service_order_id, auth.uid()));

-- Sign-off policies
CREATE POLICY "Admins manage all signoffs" ON public.service_order_signoffs
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Assigned technicians view signoffs" ON public.service_order_signoffs
  FOR SELECT TO authenticated
  USING (public.is_assigned_technician(service_order_id, auth.uid()));

CREATE POLICY "Assigned technicians insert signoffs" ON public.service_order_signoffs
  FOR INSERT TO authenticated
  WITH CHECK (
    captured_by = auth.uid()
    AND public.is_assigned_technician(service_order_id, auth.uid())
  );

CREATE POLICY "Technicians update own signoffs" ON public.service_order_signoffs
  FOR UPDATE TO authenticated
  USING (captured_by = auth.uid() AND public.is_assigned_technician(service_order_id, auth.uid()))
  WITH CHECK (captured_by = auth.uid() AND public.is_assigned_technician(service_order_id, auth.uid()));

CREATE POLICY "Technicians delete own signoffs" ON public.service_order_signoffs
  FOR DELETE TO authenticated
  USING (captured_by = auth.uid() AND public.is_assigned_technician(service_order_id, auth.uid()));

-- Allow assigned technicians to view their assigned service orders + checklist (additive)
CREATE POLICY "Assigned technicians view service orders" ON public.service_orders
  FOR SELECT TO authenticated
  USING (technician_id = auth.uid());

CREATE POLICY "Assigned technicians view checklist" ON public.service_order_checklist
  FOR SELECT TO authenticated
  USING (public.is_assigned_technician(service_order_id, auth.uid()));
