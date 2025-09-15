-- Create workforce management database schema

-- Employee profiles and organizational structure
CREATE TABLE public.employees (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  employee_id TEXT UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  department TEXT NOT NULL,
  position TEXT NOT NULL,
  manager_id UUID REFERENCES public.employees(id),
  hire_date DATE NOT NULL,
  employment_status TEXT NOT NULL DEFAULT 'active',
  hourly_rate NUMERIC,
  salary NUMERIC,
  skills JSONB DEFAULT '[]'::jsonb,
  certifications JSONB DEFAULT '[]'::jsonb,
  profile_image_url TEXT,
  emergency_contact JSONB,
  address JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Departments table
CREATE TABLE public.departments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  manager_id UUID REFERENCES public.employees(id),
  budget NUMERIC,
  cost_center TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Shifts and scheduling
CREATE TABLE public.shifts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id UUID REFERENCES public.employees(id) ON DELETE CASCADE NOT NULL,
  shift_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  break_duration INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'scheduled',
  notes TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Time tracking
CREATE TABLE public.time_entries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id UUID REFERENCES public.employees(id) ON DELETE CASCADE NOT NULL,
  shift_id UUID REFERENCES public.shifts(id),
  clock_in TIMESTAMP WITH TIME ZONE NOT NULL,
  clock_out TIMESTAMP WITH TIME ZONE,
  break_start TIMESTAMP WITH TIME ZONE,
  break_end TIMESTAMP WITH TIME ZONE,
  total_hours NUMERIC,
  overtime_hours NUMERIC DEFAULT 0,
  location JSONB,
  notes TEXT,
  approved_by UUID REFERENCES auth.users(id),
  approved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Projects and tasks
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'planning',
  priority TEXT NOT NULL DEFAULT 'medium',
  start_date DATE,
  end_date DATE,
  estimated_hours NUMERIC,
  actual_hours NUMERIC DEFAULT 0,
  budget NUMERIC,
  spent_amount NUMERIC DEFAULT 0,
  manager_id UUID REFERENCES public.employees(id),
  client_name TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tasks within projects
CREATE TABLE public.tasks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  assigned_to UUID REFERENCES public.employees(id),
  status TEXT NOT NULL DEFAULT 'pending',
  priority TEXT NOT NULL DEFAULT 'medium',
  estimated_hours NUMERIC,
  actual_hours NUMERIC DEFAULT 0,
  start_date DATE,
  due_date DATE,
  completed_at TIMESTAMP WITH TIME ZONE,
  dependencies JSONB DEFAULT '[]'::jsonb,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Performance metrics
CREATE TABLE public.performance_metrics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id UUID REFERENCES public.employees(id) ON DELETE CASCADE NOT NULL,
  metric_type TEXT NOT NULL,
  metric_value NUMERIC NOT NULL,
  target_value NUMERIC,
  measurement_date DATE NOT NULL,
  period_start DATE,
  period_end DATE,
  notes TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Training and certifications
CREATE TABLE public.training_records (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id UUID REFERENCES public.employees(id) ON DELETE CASCADE NOT NULL,
  training_name TEXT NOT NULL,
  training_type TEXT NOT NULL,
  completion_date DATE,
  expiry_date DATE,
  certification_number TEXT,
  trainer_name TEXT,
  score NUMERIC,
  status TEXT NOT NULL DEFAULT 'in_progress',
  required BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shifts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.time_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.performance_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_records ENABLE ROW LEVEL SECURITY;

-- RLS Policies for employees
CREATE POLICY "Employees can view their own data and their reports"
ON public.employees FOR SELECT
USING (
  auth.uid() = user_id OR 
  id IN (
    SELECT e.id FROM public.employees e 
    WHERE e.manager_id = (
      SELECT emp.id FROM public.employees emp WHERE emp.user_id = auth.uid()
    )
  ) OR
  EXISTS (
    SELECT 1 FROM public.user_roles ur 
    WHERE ur.user_id = auth.uid() AND ur.role IN ('admin', 'hr_manager')
  )
);

CREATE POLICY "HR and admins can manage employees"
ON public.employees FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles ur 
    WHERE ur.user_id = auth.uid() AND ur.role IN ('admin', 'hr_manager')
  )
);

CREATE POLICY "Employees can update their own profile"
ON public.employees FOR UPDATE
USING (auth.uid() = user_id);

-- RLS Policies for shifts
CREATE POLICY "Employees can view their own shifts"
ON public.shifts FOR SELECT
USING (
  employee_id IN (
    SELECT id FROM public.employees WHERE user_id = auth.uid()
  ) OR
  EXISTS (
    SELECT 1 FROM public.user_roles ur 
    WHERE ur.user_id = auth.uid() AND ur.role IN ('admin', 'manager', 'hr_manager')
  )
);

CREATE POLICY "Managers can manage shifts"
ON public.shifts FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles ur 
    WHERE ur.user_id = auth.uid() AND ur.role IN ('admin', 'manager', 'hr_manager')
  )
);

-- RLS Policies for time entries
CREATE POLICY "Employees can manage their own time entries"
ON public.time_entries FOR ALL
USING (
  employee_id IN (
    SELECT id FROM public.employees WHERE user_id = auth.uid()
  ) OR
  EXISTS (
    SELECT 1 FROM public.user_roles ur 
    WHERE ur.user_id = auth.uid() AND ur.role IN ('admin', 'manager', 'hr_manager')
  )
);

-- RLS Policies for projects
CREATE POLICY "Team members can view assigned projects"
ON public.projects FOR SELECT
USING (
  manager_id IN (
    SELECT id FROM public.employees WHERE user_id = auth.uid()
  ) OR
  id IN (
    SELECT project_id FROM public.tasks t
    JOIN public.employees e ON t.assigned_to = e.id
    WHERE e.user_id = auth.uid()
  ) OR
  EXISTS (
    SELECT 1 FROM public.user_roles ur 
    WHERE ur.user_id = auth.uid() AND ur.role IN ('admin', 'manager')
  )
);

CREATE POLICY "Managers can manage projects"
ON public.projects FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles ur 
    WHERE ur.user_id = auth.uid() AND ur.role IN ('admin', 'manager')
  )
);

-- RLS Policies for tasks
CREATE POLICY "Employees can view assigned tasks"
ON public.tasks FOR SELECT
USING (
  assigned_to IN (
    SELECT id FROM public.employees WHERE user_id = auth.uid()
  ) OR
  project_id IN (
    SELECT id FROM public.projects p
    WHERE p.manager_id IN (
      SELECT id FROM public.employees WHERE user_id = auth.uid()
    )
  ) OR
  EXISTS (
    SELECT 1 FROM public.user_roles ur 
    WHERE ur.user_id = auth.uid() AND ur.role IN ('admin', 'manager')
  )
);

CREATE POLICY "Employees can update assigned tasks"
ON public.tasks FOR UPDATE
USING (
  assigned_to IN (
    SELECT id FROM public.employees WHERE user_id = auth.uid()
  ) OR
  EXISTS (
    SELECT 1 FROM public.user_roles ur 
    WHERE ur.user_id = auth.uid() AND ur.role IN ('admin', 'manager')
  )
);

CREATE POLICY "Managers can manage tasks"
ON public.tasks FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.user_roles ur 
    WHERE ur.user_id = auth.uid() AND ur.role IN ('admin', 'manager')
  )
);

-- RLS Policies for performance metrics
CREATE POLICY "Employees can view their own metrics"
ON public.performance_metrics FOR SELECT
USING (
  employee_id IN (
    SELECT id FROM public.employees WHERE user_id = auth.uid()
  ) OR
  EXISTS (
    SELECT 1 FROM public.user_roles ur 
    WHERE ur.user_id = auth.uid() AND ur.role IN ('admin', 'manager', 'hr_manager')
  )
);

CREATE POLICY "Managers can manage performance metrics"
ON public.performance_metrics FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles ur 
    WHERE ur.user_id = auth.uid() AND ur.role IN ('admin', 'manager', 'hr_manager')
  )
);

-- RLS Policies for training records
CREATE POLICY "Employees can view their own training"
ON public.training_records FOR SELECT
USING (
  employee_id IN (
    SELECT id FROM public.employees WHERE user_id = auth.uid()
  ) OR
  EXISTS (
    SELECT 1 FROM public.user_roles ur 
    WHERE ur.user_id = auth.uid() AND ur.role IN ('admin', 'manager', 'hr_manager')
  )
);

CREATE POLICY "HR and managers can manage training"
ON public.training_records FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles ur 
    WHERE ur.user_id = auth.uid() AND ur.role IN ('admin', 'hr_manager', 'manager')
  )
);

-- Create indexes for performance
CREATE INDEX idx_employees_user_id ON public.employees(user_id);
CREATE INDEX idx_employees_manager_id ON public.employees(manager_id);
CREATE INDEX idx_employees_department ON public.employees(department);
CREATE INDEX idx_shifts_employee_date ON public.shifts(employee_id, shift_date);
CREATE INDEX idx_time_entries_employee ON public.time_entries(employee_id);
CREATE INDEX idx_tasks_assigned_to ON public.tasks(assigned_to);
CREATE INDEX idx_tasks_project_id ON public.tasks(project_id);
CREATE INDEX idx_performance_employee_date ON public.performance_metrics(employee_id, measurement_date);

-- Create triggers for updated_at
CREATE TRIGGER update_employees_updated_at
  BEFORE UPDATE ON public.employees
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_departments_updated_at
  BEFORE UPDATE ON public.departments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_shifts_updated_at
  BEFORE UPDATE ON public.shifts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_time_entries_updated_at
  BEFORE UPDATE ON public.time_entries
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at
  BEFORE UPDATE ON public.tasks
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_training_records_updated_at
  BEFORE UPDATE ON public.training_records
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();