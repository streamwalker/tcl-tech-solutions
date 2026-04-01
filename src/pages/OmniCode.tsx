import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Brain, Network, Search, Filter, BookOpen, Sparkles, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { KnowledgeGraph } from "@/components/omnicode/KnowledgeGraph";
import { LayerFilter } from "@/components/omnicode/LayerFilter";
import { NodeDetail } from "@/components/omnicode/NodeDetail";
import Footer from "../components/Footer";

interface KnowledgeNode {
  id: string;
  title: string;
  summary?: string;
  layer: number;
  category: string;
  content?: any;
  tags?: string[];
  confidence_score?: number;
}

const LAYER_NAMES = [
  "Physical Knowledge",
  "Logical Systems", 
  "Network Protocols",
  "Application Software",
  "Conceptual Theory",
  "Meta Knowledge",
  "Philosophical"
];

const LAYER_COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(var(--primary))",
  "hsl(var(--secondary))"
];

export default function OmniCode() {
  const [nodes, setNodes] = useState<KnowledgeNode[]>([]);
  const [selectedNode, setSelectedNode] = useState<KnowledgeNode | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLayers, setSelectedLayers] = useState<number[]>([1, 2, 3, 4, 5, 6, 7]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNodes();
  }, [selectedLayers]);

  const loadNodes = async () => {
    setLoading(true);
    try {
      const { data, error } = await (supabase as any)
        .from('knowledge_nodes')
        .select('*')
        .in('layer', selectedLayers)
        .order('layer', { ascending: true });

      if (error) throw error;
      setNodes(data || []);
    } catch (error) {
      console.error('Error loading nodes:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredNodes = nodes.filter(node =>
    searchQuery === "" ||
    node.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    node.summary?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    node.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background border-b">
        <div className="absolute inset-0 bg-grid-primary/5 [mask-image:linear-gradient(0deg,transparent,black)]" />
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 rounded-2xl bg-primary/10 backdrop-blur-sm border border-primary/20">
              <Brain className="h-12 w-12 text-primary animate-pulse-soft" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
            OmniCode
          </h1>
          
          <p className="text-xl md:text-2xl text-center text-muted-foreground max-w-3xl mx-auto mb-4">
            The Universal Computational Knowledge Engine
          </p>
          
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-8">
            A living, semantic repository of all computational knowledge — from physical hardware to philosophical implications of AI
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12">
            <Card className="p-4 text-center bg-card/50 backdrop-blur-sm border-primary/20">
              <div className="text-3xl font-bold text-primary">{nodes.length}</div>
              <div className="text-sm text-muted-foreground">Knowledge Nodes</div>
            </Card>
            <Card className="p-4 text-center bg-card/50 backdrop-blur-sm border-primary/20">
              <div className="text-3xl font-bold text-primary">7</div>
              <div className="text-sm text-muted-foreground">Semantic Layers</div>
            </Card>
            <Card className="p-4 text-center bg-card/50 backdrop-blur-sm border-primary/20">
              <div className="text-3xl font-bold text-primary">∞</div>
              <div className="text-sm text-muted-foreground">Relationships</div>
            </Card>
            <Card className="p-4 text-center bg-card/50 backdrop-blur-sm border-primary/20">
              <div className="text-3xl font-bold text-primary">AI</div>
              <div className="text-sm text-muted-foreground">Powered</div>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search knowledge graph... (e.g., TCP/IP, neural networks, transistors)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-lg"
            />
          </div>
          <Button variant="outline" size="lg" className="gap-2">
            <Filter className="h-5 w-5" />
            Advanced Filters
          </Button>
        </div>

        {/* Layer Filter */}
        <LayerFilter
          selectedLayers={selectedLayers}
          onLayerToggle={(layer) => {
            setSelectedLayers(prev =>
              prev.includes(layer)
                ? prev.filter(l => l !== layer)
                : [...prev, layer]
            );
          }}
          layerNames={LAYER_NAMES}
          layerColors={LAYER_COLORS}
        />

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-3 gap-8 mt-8">
          {/* Left: Knowledge Graph Visualization */}
          <div className="md:col-span-2">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Network className="h-5 w-5 text-primary" />
                  <h2 className="text-2xl font-bold">Knowledge Graph</h2>
                </div>
                <Badge variant="outline" className="gap-2">
                  <Sparkles className="h-3 w-3" />
                  Interactive
                </Badge>
              </div>
              
              <KnowledgeGraph 
                nodes={filteredNodes}
                onNodeClick={setSelectedNode}
                selectedNode={selectedNode}
                layerColors={LAYER_COLORS}
              />
            </Card>

            {/* Layer Legend */}
            <Card className="p-6 mt-6">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">7-Layer Knowledge Stack</h3>
              </div>
              <div className="space-y-2">
                {LAYER_NAMES.map((name, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                      style={{ backgroundColor: LAYER_COLORS[index] }}
                    >
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{name}</div>
                      <div className="text-xs text-muted-foreground">
                        {filteredNodes.filter(n => n.layer === index + 1).length} nodes
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right: Node Detail */}
          <div>
            <NodeDetail node={selectedNode} />
          </div>
        </div>

        {/* Call to Action */}
        <Card className="mt-12 p-8 text-center bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border-primary/20">
          <Brain className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Contribute to OmniCode</h3>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Help expand the knowledge graph. Add nodes, create relationships, and earn reputation in the community.
          </p>
          <Button size="lg" className="gap-2">
            <Sparkles className="h-5 w-5" />
            Start Contributing
          </Button>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
