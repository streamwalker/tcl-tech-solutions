
CREATE TABLE public.knowledge_nodes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  summary TEXT,
  layer INTEGER NOT NULL CHECK (layer >= 1 AND layer <= 7),
  category TEXT NOT NULL,
  content JSONB,
  tags TEXT[],
  confidence_score NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.knowledge_nodes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Knowledge nodes are publicly readable"
  ON public.knowledge_nodes
  FOR SELECT
  USING (true);
