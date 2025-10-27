import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Node {
  id: string;
  title: string;
  layer: number;
  category: string;
  summary?: string;
  content?: any;
  tags?: string[];
  confidence_score?: number;
}

interface KnowledgeGraphProps {
  nodes: Node[];
  onNodeClick: (node: Node) => void;
  selectedNode: Node | null;
  layerColors: string[];
}

export function KnowledgeGraph({ nodes, onNodeClick, selectedNode, layerColors }: KnowledgeGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Draw grid
    ctx.strokeStyle = 'rgba(128, 128, 128, 0.1)';
    ctx.lineWidth = 1;
    const gridSize = 50 * zoom;
    for (let x = offset.x % gridSize; x < rect.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, rect.height);
      ctx.stroke();
    }
    for (let y = offset.y % gridSize; y < rect.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(rect.width, y);
      ctx.stroke();
    }

    // Calculate node positions in a circular layout per layer
    const layerRadius = 80;
    const centerX = rect.width / 2 + offset.x;
    const centerY = rect.height / 2 + offset.y;

    const nodePositions = new Map();
    const layerGroups = new Map<number, Node[]>();
    
    // Group nodes by layer
    nodes.forEach(node => {
      if (!layerGroups.has(node.layer)) {
        layerGroups.set(node.layer, []);
      }
      layerGroups.get(node.layer)!.push(node);
    });

    // Position nodes in concentric circles
    layerGroups.forEach((layerNodes, layer) => {
      const radius = layerRadius * layer * zoom;
      const angleStep = (2 * Math.PI) / layerNodes.length;
      
      layerNodes.forEach((node, index) => {
        const angle = index * angleStep - Math.PI / 2; // Start from top
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        nodePositions.set(node.id, { x, y, node });
      });
    });

    // Draw connections between adjacent layers
    ctx.strokeStyle = 'rgba(128, 128, 128, 0.2)';
    ctx.lineWidth = 1;
    layerGroups.forEach((layerNodes, layer) => {
      const nextLayerNodes = layerGroups.get(layer + 1);
      if (nextLayerNodes) {
        layerNodes.forEach(node => {
          const pos1 = nodePositions.get(node.id);
          nextLayerNodes.forEach(nextNode => {
            const pos2 = nodePositions.get(nextNode.id);
            ctx.beginPath();
            ctx.moveTo(pos1.x, pos1.y);
            ctx.lineTo(pos2.x, pos2.y);
            ctx.stroke();
          });
        });
      }
    });

    // Draw nodes
    nodePositions.forEach(({ x, y, node }) => {
      const isSelected = selectedNode?.id === node.id;
      const radius = (isSelected ? 12 : 8) * zoom;

      // Node circle
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.fillStyle = layerColors[node.layer - 1];
      ctx.fill();
      
      // Selection ring
      if (isSelected) {
        ctx.strokeStyle = layerColors[node.layer - 1];
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(x, y, radius + 5, 0, 2 * Math.PI);
        ctx.stroke();
      }

      // Node label
      if (zoom > 0.5) {
        ctx.fillStyle = 'hsl(var(--foreground))';
        ctx.font = `${12 * zoom}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        const maxWidth = 100 * zoom;
        const text = node.title.length > 20 ? node.title.substring(0, 20) + '...' : node.title;
        ctx.fillText(text, x, y + radius + 5, maxWidth);
      }
    });

    // Store positions for click detection
    (canvas as any)._nodePositions = nodePositions;
  }, [nodes, zoom, offset, selectedNode, layerColors]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const nodePositions = (canvas as any)._nodePositions;
    if (!nodePositions) return;

    // Find clicked node
    for (const [, { x: nodeX, y: nodeY, node }] of nodePositions) {
      const distance = Math.sqrt((x - nodeX) ** 2 + (y - nodeY) ** 2);
      const radius = (selectedNode?.id === node.id ? 12 : 8) * zoom;
      
      if (distance <= radius) {
        onNodeClick(node);
        return;
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;
    setOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className="w-full h-[600px] bg-card rounded-lg border cursor-move"
        onClick={handleCanvasClick}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
      
      {/* Zoom Controls */}
      <div className="absolute bottom-4 right-4 flex gap-2">
        <Button
          size="icon"
          variant="secondary"
          onClick={() => setZoom(z => Math.min(z + 0.2, 3))}
          className="shadow-lg"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="secondary"
          onClick={() => setZoom(z => Math.max(z - 0.2, 0.3))}
          className="shadow-lg"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="secondary"
          onClick={() => {
            setZoom(1);
            setOffset({ x: 0, y: 0 });
          }}
          className="shadow-lg"
        >
          <Maximize2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Instructions */}
      <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm border rounded-lg p-3 shadow-lg text-sm text-muted-foreground">
        <p>• Click nodes to view details</p>
        <p>• Drag to pan • Scroll or use buttons to zoom</p>
      </div>
    </div>
  );
}
