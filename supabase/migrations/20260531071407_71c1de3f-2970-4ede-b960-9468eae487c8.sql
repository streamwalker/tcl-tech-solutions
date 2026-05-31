CREATE TABLE public.urc_bridge_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  name text,
  company text,
  role text,
  rs520_count integer,
  message text,
  source text NOT NULL DEFAULT 'pilot',
  tier text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.urc_bridge_leads TO anon, authenticated;
GRANT SELECT, DELETE ON public.urc_bridge_leads TO authenticated;
GRANT ALL ON public.urc_bridge_leads TO service_role;
ALTER TABLE public.urc_bridge_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit urc bridge leads"
  ON public.urc_bridge_leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(btrim(email)) BETWEEN 3 AND 255
    AND email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'
    AND (message IS NULL OR char_length(message) <= 4000)
    AND source = ANY (ARRAY['pilot','demo','subscribe'])
  );

CREATE POLICY "Admins can view urc bridge leads"
  ON public.urc_bridge_leads FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete urc bridge leads"
  ON public.urc_bridge_leads FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));