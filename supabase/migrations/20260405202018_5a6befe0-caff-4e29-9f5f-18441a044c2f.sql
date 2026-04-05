
CREATE TABLE public.profit_analyses (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  project_title text NOT NULL,
  contract_value numeric NOT NULL DEFAULT 0,
  sales_tax numeric NOT NULL DEFAULT 0,
  product_cost numeric NOT NULL DEFAULT 0,
  labor_billed numeric NOT NULL DEFAULT 0,
  schedule_a_labor numeric NOT NULL DEFAULT 0,
  product_markup numeric NOT NULL DEFAULT 0,
  total_hours numeric NOT NULL DEFAULT 0,
  schedule_a_profit numeric NOT NULL DEFAULT 0,
  sw_share_pct numeric NOT NULL DEFAULT 0.49,
  labor_breakdown jsonb DEFAULT '[]'::jsonb,
  margin_distribution jsonb DEFAULT '[]'::jsonb,
  high_margin_items jsonb DEFAULT '[]'::jsonb,
  below_cost_items jsonb DEFAULT '[]'::jsonb,
  findings jsonb DEFAULT '[]'::jsonb,
  amendment_text text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.profit_analyses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profit analyses" ON public.profit_analyses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profit analyses" ON public.profit_analyses FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own profit analyses" ON public.profit_analyses FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own profit analyses" ON public.profit_analyses FOR DELETE USING (auth.uid() = user_id);

CREATE TRIGGER update_profit_analyses_updated_at
  BEFORE UPDATE ON public.profit_analyses
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
