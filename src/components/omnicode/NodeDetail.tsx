import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, BookOpen, GitBranch, TrendingUp } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface Node {
  id: string;
  title: string;
  summary?: string;
  layer: number;
  category: string;
  content?: any;
  tags?: string[];
  confidence_score?: number;
}

interface NodeDetailProps {
  node: Node | null;
}

const LAYER_NAMES = [
  "Physical Knowledge Layer",
  "Logical Layer", 
  "Network Layer",
  "Application Layer",
  "Conceptual Layer",
  "Meta Layer",
  "Philosophical Layer"
];

export function NodeDetail({ node }: NodeDetailProps) {
  if (!node) {
    return (
      <Card className="p-6 sticky top-4">
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">
            Select a node from the graph to view its details
          </p>
        </div>
      </Card>
    );
  }

  const content = node.content || {};
  const examples = content.examples || [];
  const description = content.description || node.summary;

  return (
    <Card className="p-6 sticky top-4 max-h-[calc(100vh-6rem)] overflow-y-auto">
      <div className="space-y-4">
        {/* Header */}
        <div>
          <div className="flex items-start justify-between mb-2">
            <Badge variant="secondary" className="mb-2">
              Layer {node.layer}
            </Badge>
            <Badge variant="outline">{node.category}</Badge>
          </div>
          <h3 className="text-2xl font-bold mb-2">{node.title}</h3>
          <p className="text-sm text-muted-foreground">
            {LAYER_NAMES[node.layer - 1]}
          </p>
        </div>

        <Separator />

        {/* Description */}
        {description && (
          <div>
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Description
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>
        )}

        {/* Examples */}
        {examples.length > 0 && (
          <div>
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <GitBranch className="h-4 w-4" />
              Examples
            </h4>
            <ul className="space-y-1">
              {examples.map((example: string, index: number) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>{example}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tags */}
        {node.tags && node.tags.length > 0 && (
          <div>
            <h4 className="font-semibold mb-2">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {node.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Confidence Score */}
        {node.confidence_score !== undefined && (
          <div>
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Data Quality
            </h4>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all"
                  style={{ width: `${node.confidence_score * 100}%` }}
                />
              </div>
              <span className="text-sm font-medium">
                {Math.round(node.confidence_score * 100)}%
              </span>
            </div>
          </div>
        )}

        <Separator />

        {/* Actions */}
        <div className="space-y-2">
          <Button variant="outline" className="w-full justify-start gap-2">
            <GitBranch className="h-4 w-4" />
            View Related Nodes
          </Button>
          <Button variant="outline" className="w-full justify-start gap-2">
            <ExternalLink className="h-4 w-4" />
            View Sources
          </Button>
        </div>
      </div>
    </Card>
  );
}
