-- Fix RLS policy for departments table
CREATE POLICY "Anyone can view departments"
ON public.departments FOR SELECT
USING (true);

CREATE POLICY "Managers can manage departments"
ON public.departments FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles ur 
    WHERE ur.user_id = auth.uid() AND ur.role IN ('admin', 'hr_manager')
  )
);