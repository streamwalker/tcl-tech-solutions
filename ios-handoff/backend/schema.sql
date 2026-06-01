-- TCL Supabase schema (concatenated migrations)
-- Generated for SwiftUI iOS 26 port. Do NOT execute as-is; reference only.


-- =========================
-- 20250915095009_abcccad1-511d-42ff-9ea2-303ca0946af6.sql
-- =========================
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

-- =========================
-- 20250915095730_edaaf2bf-32db-4406-88ff-23f564e1717e.sql
-- =========================
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

-- =========================
-- 20250925013458_0631a798-9ba2-40fe-8c3b-71a48f158d81.sql
-- =========================
-- Fix security vulnerability: Remove public access to communities table
-- and require authentication for viewing community data

-- Drop the overly permissive policy that allows anyone to view communities
DROP POLICY IF EXISTS "Anyone can view communities" ON public.communities;

-- Create a new policy that requires authentication to view communities
CREATE POLICY "Authenticated users can view communities"
ON public.communities
FOR SELECT
TO authenticated
USING (auth.uid() IS NOT NULL);

-- Optional: Create a more restrictive policy for sensitive contact information
-- This ensures only authenticated users can access developer contact details
COMMENT ON POLICY "Authenticated users can view communities" ON public.communities 
IS 'Restricts access to community data including sensitive contact information (phone, email, website_url) to authenticated users only';

-- =========================
-- 20251027181606_92763076-6408-4c5f-a2d1-607e2555b059.sql
-- =========================
-- Enable pgvector extension for semantic search
CREATE EXTENSION IF NOT EXISTS vector;

-- Knowledge nodes table: The core entities in the knowledge graph
CREATE TABLE public.knowledge_nodes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  summary TEXT,
  layer INTEGER NOT NULL CHECK (layer BETWEEN 1 AND 7), -- The 7 knowledge layers
  category TEXT NOT NULL, -- Hardware, Software, Protocols, Theory, AI, etc.
  content JSONB DEFAULT '{}'::jsonb, -- Rich content including markdown, code examples
  embedding VECTOR(1536), -- For semantic search using OpenAI embeddings
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id),
  source_urls TEXT[] DEFAULT '{}', -- Original references
  confidence_score FLOAT DEFAULT 0.5 CHECK (confidence_score BETWEEN 0 AND 1), -- Data quality indicator
  tags TEXT[] DEFAULT '{}' -- Additional categorization tags
);

-- Knowledge relationships table: Connections between nodes
CREATE TABLE public.knowledge_relationships (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  source_node_id UUID NOT NULL REFERENCES public.knowledge_nodes(id) ON DELETE CASCADE,
  target_node_id UUID NOT NULL REFERENCES public.knowledge_nodes(id) ON DELETE CASCADE,
  relationship_type TEXT NOT NULL, -- "derives_from", "implements", "requires", "contradicts", "extends", "part_of"
  strength FLOAT DEFAULT 0.5 CHECK (strength BETWEEN 0 AND 1), -- Relationship confidence (0-1)
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id),
  CONSTRAINT no_self_reference CHECK (source_node_id != target_node_id)
);

-- Historical evolution tracking: Version control for knowledge
CREATE TABLE public.knowledge_versions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  node_id UUID NOT NULL REFERENCES public.knowledge_nodes(id) ON DELETE CASCADE,
  version INTEGER NOT NULL,
  content JSONB NOT NULL,
  contributor_id UUID REFERENCES auth.users(id),
  change_type TEXT NOT NULL, -- "create", "update", "validate", "refine"
  change_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- User contributions: Track and reward contributors (for future DAO integration)
CREATE TABLE public.knowledge_contributions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  node_id UUID REFERENCES public.knowledge_nodes(id) ON DELETE CASCADE,
  relationship_id UUID REFERENCES public.knowledge_relationships(id) ON DELETE CASCADE,
  contribution_type TEXT NOT NULL, -- "create_node", "create_relationship", "validate", "edit", "review"
  reputation_earned INTEGER DEFAULT 0,
  validated BOOLEAN DEFAULT false,
  validated_by UUID REFERENCES auth.users(id),
  validated_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.knowledge_nodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.knowledge_relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.knowledge_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.knowledge_contributions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for knowledge_nodes: Anyone can read, authenticated users can contribute
CREATE POLICY "Anyone can view knowledge nodes"
  ON public.knowledge_nodes
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create nodes"
  ON public.knowledge_nodes
  FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their own nodes"
  ON public.knowledge_nodes
  FOR UPDATE
  USING (created_by = auth.uid() OR EXISTS (
    SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role IN ('admin', 'curator')
  ));

-- RLS Policies for knowledge_relationships
CREATE POLICY "Anyone can view relationships"
  ON public.knowledge_relationships
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create relationships"
  ON public.knowledge_relationships
  FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their own relationships"
  ON public.knowledge_relationships
  FOR UPDATE
  USING (created_by = auth.uid() OR EXISTS (
    SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role IN ('admin', 'curator')
  ));

-- RLS Policies for knowledge_versions
CREATE POLICY "Anyone can view versions"
  ON public.knowledge_versions
  FOR SELECT
  USING (true);

CREATE POLICY "System can insert versions"
  ON public.knowledge_versions
  FOR INSERT
  WITH CHECK (true);

-- RLS Policies for knowledge_contributions
CREATE POLICY "Users can view their own contributions"
  ON public.knowledge_contributions
  FOR SELECT
  USING (user_id = auth.uid() OR EXISTS (
    SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role IN ('admin', 'curator')
  ));

CREATE POLICY "System can track contributions"
  ON public.knowledge_contributions
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can validate contributions"
  ON public.knowledge_contributions
  FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role IN ('admin', 'curator')
  ));

-- Indexes for performance
CREATE INDEX idx_knowledge_nodes_layer ON public.knowledge_nodes(layer);
CREATE INDEX idx_knowledge_nodes_category ON public.knowledge_nodes(category);
CREATE INDEX idx_knowledge_nodes_created_by ON public.knowledge_nodes(created_by);
CREATE INDEX idx_knowledge_relationships_source ON public.knowledge_relationships(source_node_id);
CREATE INDEX idx_knowledge_relationships_target ON public.knowledge_relationships(target_node_id);
CREATE INDEX idx_knowledge_relationships_type ON public.knowledge_relationships(relationship_type);
CREATE INDEX idx_knowledge_versions_node ON public.knowledge_versions(node_id);
CREATE INDEX idx_knowledge_contributions_user ON public.knowledge_contributions(user_id);

-- Trigger to update updated_at timestamp
CREATE TRIGGER update_knowledge_nodes_updated_at
  BEFORE UPDATE ON public.knowledge_nodes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Function to get related nodes (traverses relationships)
CREATE OR REPLACE FUNCTION get_related_nodes(node_uuid UUID, max_depth INTEGER DEFAULT 2)
RETURNS TABLE(
  id UUID,
  title TEXT,
  layer INTEGER,
  relationship_path TEXT[],
  depth INTEGER
) 
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  WITH RECURSIVE node_tree AS (
    -- Base case: start node
    SELECT 
      kn.id,
      kn.title,
      kn.layer,
      ARRAY[]::TEXT[] AS relationship_path,
      0 AS depth
    FROM knowledge_nodes kn
    WHERE kn.id = node_uuid
    
    UNION ALL
    
    -- Recursive case: follow relationships
    SELECT 
      kn.id,
      kn.title,
      kn.layer,
      nt.relationship_path || kr.relationship_type,
      nt.depth + 1
    FROM node_tree nt
    JOIN knowledge_relationships kr ON (
      kr.source_node_id = nt.id OR kr.target_node_id = nt.id
    )
    JOIN knowledge_nodes kn ON (
      CASE 
        WHEN kr.source_node_id = nt.id THEN kr.target_node_id
        ELSE kr.source_node_id
      END = kn.id
    )
    WHERE nt.depth < max_depth
      AND NOT kn.id = ANY(SELECT unnest(nt.relationship_path::UUID[]))
  )
  SELECT DISTINCT ON (node_tree.id) 
    node_tree.id,
    node_tree.title,
    node_tree.layer,
    node_tree.relationship_path,
    node_tree.depth
  FROM node_tree
  ORDER BY node_tree.id, node_tree.depth;
END;
$$;

-- Seed initial data: Layer definitions
INSERT INTO public.knowledge_nodes (title, summary, layer, category, content, confidence_score, tags) VALUES
  (
    'Physical Knowledge Layer',
    'Hardware principles, semiconductor physics, and device fabrication',
    1,
    'Meta',
    '{"description": "The Physical Knowledge Layer encompasses all knowledge about physical computing hardware, from transistor design to complete system architecture. This includes semiconductor physics, circuit design, chip fabrication, power systems, and the fundamental physical principles that enable computation.", "examples": ["Transistor design", "ARM architecture", "Chip lithography", "PCB design", "Power management"]}'::jsonb,
    1.0,
    ARRAY['meta', 'hardware', 'foundation']
  ),
  (
    'Logical Layer',
    'System-level logic, firmware, and compiler theory',
    2,
    'Meta',
    '{"description": "The Logical Layer contains knowledge about how physical hardware is controlled and abstracted into logical operations. This includes firmware, BIOS, bootloaders, device drivers, logic gates, and the compilation process from high-level code to machine instructions.", "examples": ["BIOS/UEFI", "Device drivers", "Logic gates", "Compiler design", "Assembly language"]}'::jsonb,
    1.0,
    ARRAY['meta', 'systems', 'foundation']
  ),
  (
    'Network Layer',
    'Protocols, routing, and distributed systems connectivity',
    3,
    'Meta',
    '{"description": "The Network Layer encompasses all knowledge about how computing systems communicate and interconnect. This includes network protocols, routing algorithms, distributed system architecture, and the principles of data transmission across networks.", "examples": ["TCP/IP", "Routing protocols", "Network topologies", "Load balancing", "CDNs"]}'::jsonb,
    1.0,
    ARRAY['meta', 'networking', 'foundation']
  ),
  (
    'Application Layer',
    'Software systems, APIs, and user interfaces',
    4,
    'Meta',
    '{"description": "The Application Layer contains knowledge about software that directly serves user needs. This includes operating systems, application programming interfaces, web services, databases, and all the software systems that users interact with.", "examples": ["Operating systems", "APIs", "Web services", "Databases", "Mobile apps"]}'::jsonb,
    1.0,
    ARRAY['meta', 'software', 'foundation']
  ),
  (
    'Conceptual Layer',
    'Algorithms, data structures, and computational theory',
    5,
    'Meta',
    '{"description": "The Conceptual Layer encompasses abstract computational concepts, algorithms, data structures, and theoretical foundations of computer science. This is where mathematical and logical principles are applied to solve computational problems.", "examples": ["Sorting algorithms", "Graph theory", "Machine learning models", "Complexity theory", "Data structures"]}'::jsonb,
    1.0,
    ARRAY['meta', 'theory', 'foundation']
  ),
  (
    'Meta Layer',
    'Documentation, languages, and knowledge representation',
    6,
    'Meta',
    '{"description": "The Meta Layer contains knowledge about how we represent, document, and communicate computational concepts. This includes programming languages, documentation systems, ontologies, knowledge graphs, and standards.", "examples": ["Programming languages", "Documentation systems", "Ontologies", "Standards bodies", "Knowledge graphs"]}'::jsonb,
    1.0,
    ARRAY['meta', 'representation', 'foundation']
  ),
  (
    'Philosophical Layer',
    'Ethics, governance, and the metaphysics of computing',
    7,
    'Meta',
    '{"description": "The Philosophical Layer addresses the broader implications of computing technology. This includes AI ethics, digital consciousness, computational philosophy, governance of technology, and the social and philosophical questions raised by computing.", "examples": ["AI ethics", "Digital consciousness", "Computational philosophy", "Technology governance", "Digital rights"]}'::jsonb,
    1.0,
    ARRAY['meta', 'philosophy', 'foundation']
  );

-- Create relationships between the layer definitions
INSERT INTO public.knowledge_relationships (source_node_id, target_node_id, relationship_type, strength, description)
SELECT 
  n1.id,
  n2.id,
  'builds_upon',
  0.9,
  'Each layer builds conceptually upon the previous layer'
FROM knowledge_nodes n1
JOIN knowledge_nodes n2 ON n2.layer = n1.layer + 1
WHERE n1.category = 'Meta' AND n2.category = 'Meta';

-- Create curator role if it doesn't exist
INSERT INTO user_roles (user_id, role, created_by)
SELECT 
  u.id,
  'curator',
  u.id
FROM auth.users u
WHERE u.email IN (
  SELECT email FROM beta_whitelist WHERE role = 'admin'
)
ON CONFLICT DO NOTHING;

-- =========================
-- 20260313233407_ad2f2110-a604-4d6a-b097-d5edf4f10487.sql
-- =========================

-- Timestamp update function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- PRODUCTS TABLE
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  model TEXT NOT NULL,
  manufacturer TEXT NOT NULL,
  category TEXT NOT NULL,
  msrp NUMERIC(10,2) NOT NULL DEFAULT 0,
  dealer_cost NUMERIC(10,2) NOT NULL DEFAULT 0,
  description TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own products" ON public.products FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own products" ON public.products FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own products" ON public.products FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own products" ON public.products FOR DELETE USING (auth.uid() = user_id);
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- CLIENTS TABLE
CREATE TABLE public.clients (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  email TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  address TEXT DEFAULT '',
  status TEXT NOT NULL DEFAULT 'Lead',
  source TEXT DEFAULT '',
  total_revenue NUMERIC(12,2) NOT NULL DEFAULT 0,
  project_count INTEGER NOT NULL DEFAULT 0,
  last_contact DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own clients" ON public.clients FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own clients" ON public.clients FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own clients" ON public.clients FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own clients" ON public.clients FOR DELETE USING (auth.uid() = user_id);
CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON public.clients FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- PROPOSALS TABLE
CREATE TABLE public.proposals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Draft',
  labor_hours NUMERIC(8,2) NOT NULL DEFAULT 0,
  labor_rate NUMERIC(8,2) NOT NULL DEFAULT 150,
  notes TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.proposals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own proposals" ON public.proposals FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own proposals" ON public.proposals FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own proposals" ON public.proposals FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own proposals" ON public.proposals FOR DELETE USING (auth.uid() = user_id);
CREATE TRIGGER update_proposals_updated_at BEFORE UPDATE ON public.proposals FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- PROPOSAL ITEMS TABLE
CREATE TABLE public.proposal_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  proposal_id UUID NOT NULL REFERENCES public.proposals(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  product_name TEXT NOT NULL,
  room TEXT DEFAULT '',
  qty INTEGER NOT NULL DEFAULT 1,
  unit_price NUMERIC(10,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.proposal_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own proposal items" ON public.proposal_items FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own proposal items" ON public.proposal_items FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own proposal items" ON public.proposal_items FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own proposal items" ON public.proposal_items FOR DELETE USING (auth.uid() = user_id);

-- PROJECTS TABLE
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
  proposal_id UUID REFERENCES public.proposals(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Planning',
  budget NUMERIC(12,2) NOT NULL DEFAULT 0,
  spent NUMERIC(12,2) NOT NULL DEFAULT 0,
  progress INTEGER NOT NULL DEFAULT 0,
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own projects" ON public.projects FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own projects" ON public.projects FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own projects" ON public.projects FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own projects" ON public.projects FOR DELETE USING (auth.uid() = user_id);
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- PROJECT TASKS TABLE
CREATE TABLE public.project_tasks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  done BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.project_tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own project tasks" ON public.project_tasks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own project tasks" ON public.project_tasks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own project tasks" ON public.project_tasks FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own project tasks" ON public.project_tasks FOR DELETE USING (auth.uid() = user_id);

-- SERVICE ORDERS TABLE
CREATE TABLE public.service_orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  priority TEXT NOT NULL DEFAULT 'Medium',
  status TEXT NOT NULL DEFAULT 'Open',
  technician TEXT DEFAULT '',
  scheduled_for DATE,
  time_spent NUMERIC(6,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.service_orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own service orders" ON public.service_orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own service orders" ON public.service_orders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own service orders" ON public.service_orders FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own service orders" ON public.service_orders FOR DELETE USING (auth.uid() = user_id);
CREATE TRIGGER update_service_orders_updated_at BEFORE UPDATE ON public.service_orders FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- SERVICE ORDER CHECKLIST TABLE
CREATE TABLE public.service_order_checklist (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service_order_id UUID NOT NULL REFERENCES public.service_orders(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  item TEXT NOT NULL,
  done BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.service_order_checklist ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own checklist items" ON public.service_order_checklist FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own checklist items" ON public.service_order_checklist FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own checklist items" ON public.service_order_checklist FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own checklist items" ON public.service_order_checklist FOR DELETE USING (auth.uid() = user_id);


-- =========================
-- 20260320175040_a96b465a-4675-4535-904c-7074672f9edc.sql
-- =========================

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


-- =========================
-- 20260331193555_bd753611-cf58-4418-8033-12b139d422b2.sql
-- =========================
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  project_type TEXT NOT NULL DEFAULT 'residential',
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert contact submissions"
  ON public.contact_submissions
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can view submissions"
  ON public.contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- =========================
-- 20260401070135_b4bf8c4f-af6d-4a69-a9ea-be23a033b5e6.sql
-- =========================

CREATE TABLE public.user_consents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  consent_type text NOT NULL,
  accepted_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.user_consents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert own consents"
  ON public.user_consents FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read own consents"
  ON public.user_consents FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);


-- =========================
-- 20260404024713_b279a52c-ab16-4c5a-9f75-53013ce17ec2.sql
-- =========================

-- Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Admins can view all roles
CREATE POLICY "Admins can view all roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Users can view their own roles
CREATE POLICY "Users can view own roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Only admins can manage roles
CREATE POLICY "Admins can insert roles"
ON public.user_roles FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete roles"
ON public.user_roles FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));


-- =========================
-- 20260405202018_5a6befe0-caff-4e29-9f5f-18441a044c2f.sql
-- =========================

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


-- =========================
-- 20260506050046_cebe8695-77ea-4ec6-aa18-12d184bce885.sql
-- =========================
DROP POLICY IF EXISTS "Only authenticated users can view submissions" ON public.contact_submissions;

CREATE POLICY "Only admins can view contact submissions"
ON public.contact_submissions
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- =========================
-- 20260508183601_5b68a64f-0af4-4fbf-acd5-3ee478949a2c.sql
-- =========================

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


-- =========================
-- 20260512031825_81d5842e-b754-4be9-b743-68ed50a0fa47.sql
-- =========================

-- 1) Remove direct INSERT on academy_certificates (prevent self-issuance)
DROP POLICY IF EXISTS "own cert insert" ON public.academy_certificates;

-- 2) Server-side issuance function: only issues if a passing exam attempt exists
CREATE OR REPLACE FUNCTION public.issue_certificate_if_passed(_course_slug text)
RETURNS public.academy_certificates
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _user_id uuid := auth.uid();
  _best_score numeric;
  _existing public.academy_certificates;
  _new public.academy_certificates;
BEGIN
  IF _user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  -- Must have at least one passed final exam attempt for this course
  SELECT MAX(score_pct) INTO _best_score
  FROM public.academy_exam_attempts
  WHERE user_id = _user_id
    AND course_slug = _course_slug
    AND passed = true;

  IF _best_score IS NULL OR _best_score < 70 THEN
    RAISE EXCEPTION 'No passing exam attempt on record for this course';
  END IF;

  -- Return existing certificate if already issued
  SELECT * INTO _existing
  FROM public.academy_certificates
  WHERE user_id = _user_id AND course_slug = _course_slug
  LIMIT 1;

  IF FOUND THEN
    RETURN _existing;
  END IF;

  INSERT INTO public.academy_certificates (user_id, course_slug, final_score)
  VALUES (_user_id, _course_slug, _best_score)
  RETURNING * INTO _new;

  RETURN _new;
END;
$$;

-- Restrict EXECUTE on SECURITY DEFINER helpers to internal use only
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;

-- issue_certificate_if_passed must be callable by signed-in users
REVOKE EXECUTE ON FUNCTION public.issue_certificate_if_passed(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.issue_certificate_if_passed(text) TO authenticated;


-- =========================
-- 20260522184039_6d738178-32ae-4845-bc4d-71e0995dcae9.sql
-- =========================
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

-- =========================
-- 20260522184249_a44fade9-f6a3-4fc2-923a-b0d5c1e02dc5.sql
-- =========================
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

-- =========================
-- 20260531071407_71c1de3f-2970-4ede-b960-9468eae487c8.sql
-- =========================
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
