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