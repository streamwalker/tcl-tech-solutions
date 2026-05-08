
-- Enrollments
CREATE TABLE public.academy_enrollments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  course_slug TEXT NOT NULL,
  enrolled_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ,
  UNIQUE (user_id, course_slug)
);
ALTER TABLE public.academy_enrollments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own enrollments select" ON public.academy_enrollments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "admin enrollments select" ON public.academy_enrollments FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "own enrollments insert" ON public.academy_enrollments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own enrollments update" ON public.academy_enrollments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "own enrollments delete" ON public.academy_enrollments FOR DELETE USING (auth.uid() = user_id);

-- Progress
CREATE TABLE public.academy_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  course_slug TEXT NOT NULL,
  chapter_slug TEXT NOT NULL,
  lesson_slug TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'in_progress',
  last_viewed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, course_slug, chapter_slug, lesson_slug)
);
ALTER TABLE public.academy_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own progress select" ON public.academy_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "admin progress select" ON public.academy_progress FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "own progress insert" ON public.academy_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own progress update" ON public.academy_progress FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "own progress delete" ON public.academy_progress FOR DELETE USING (auth.uid() = user_id);

-- Quiz attempts
CREATE TABLE public.academy_quiz_attempts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  course_slug TEXT NOT NULL,
  chapter_slug TEXT NOT NULL,
  score_pct NUMERIC NOT NULL DEFAULT 0,
  answers JSONB NOT NULL DEFAULT '[]'::jsonb,
  attempted_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.academy_quiz_attempts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own quiz select" ON public.academy_quiz_attempts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "admin quiz select" ON public.academy_quiz_attempts FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "own quiz insert" ON public.academy_quiz_attempts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own quiz delete" ON public.academy_quiz_attempts FOR DELETE USING (auth.uid() = user_id);

-- Exam attempts
CREATE TABLE public.academy_exam_attempts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  course_slug TEXT NOT NULL,
  score_pct NUMERIC NOT NULL DEFAULT 0,
  passed BOOLEAN NOT NULL DEFAULT false,
  answers JSONB NOT NULL DEFAULT '[]'::jsonb,
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  submitted_at TIMESTAMPTZ
);
ALTER TABLE public.academy_exam_attempts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own exam select" ON public.academy_exam_attempts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "admin exam select" ON public.academy_exam_attempts FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "own exam insert" ON public.academy_exam_attempts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own exam update" ON public.academy_exam_attempts FOR UPDATE USING (auth.uid() = user_id);

-- Certificates
CREATE TABLE public.academy_certificates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  course_slug TEXT NOT NULL,
  final_score NUMERIC NOT NULL,
  certificate_no TEXT NOT NULL UNIQUE DEFAULT ('TCL-' || upper(substr(md5(random()::text), 1, 10))),
  issued_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, course_slug)
);
ALTER TABLE public.academy_certificates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own cert select" ON public.academy_certificates FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "admin cert select" ON public.academy_certificates FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "own cert insert" ON public.academy_certificates FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE INDEX idx_academy_progress_user_course ON public.academy_progress(user_id, course_slug);
CREATE INDEX idx_academy_quiz_user_course ON public.academy_quiz_attempts(user_id, course_slug);
