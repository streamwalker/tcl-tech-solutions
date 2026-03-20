

# Make OmniCode Subpage Go Live

## Problem
The OmniCode page exists in the codebase and routing, but the `knowledge_nodes` database table it queries doesn't exist yet. The page will load but show 0 nodes and an empty graph.

## Plan

### 1. Create `knowledge_nodes` database table
Run a migration to create the table with columns matching what the page expects:
- `id` (uuid, primary key)
- `title` (text, not null)
- `summary` (text, nullable)
- `layer` (integer, 1-7, not null)
- `category` (text, not null)
- `content` (jsonb, nullable)
- `tags` (text[], nullable)
- `confidence_score` (numeric, nullable)
- `created_at` (timestamptz, default now())

Enable RLS with a public read policy (this is a public-facing knowledge base).

### 2. Seed initial knowledge nodes
Insert starter data across all 7 layers so the graph has content on launch. Examples:
- Layer 1 (Physical): Transistors, Circuit Boards, Fiber Optics
- Layer 2 (Logical): Binary Logic, Operating Systems, Memory Management
- Layer 3 (Network): TCP/IP, DNS, HTTP/HTTPS
- Layer 4 (Application): Web Browsers, Databases, APIs
- Layer 5 (Conceptual): Algorithms, Data Structures, Design Patterns
- Layer 6 (Meta): Machine Learning, Neural Networks, NLP
- Layer 7 (Philosophical): AI Ethics, Consciousness, Singularity

~30-40 nodes total to populate a meaningful graph.

### 3. Fix the Supabase query cast
The page currently uses `(supabase as any)` to query `knowledge_nodes`. Once the table exists, the types will auto-regenerate, but if not, the `as any` cast keeps it working.

### Files Modified
- **Database migration**: Create `knowledge_nodes` table + seed data
- **`src/pages/OmniCode.tsx`**: No changes needed — it already queries the table and renders correctly

