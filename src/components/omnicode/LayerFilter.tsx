import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface LayerFilterProps {
  selectedLayers: number[];
  onLayerToggle: (layer: number) => void;
  layerNames: string[];
  layerColors: string[];
}

export function LayerFilter({ selectedLayers, onLayerToggle, layerNames, layerColors }: LayerFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {layerNames.map((name, index) => {
        const layer = index + 1;
        const isSelected = selectedLayers.includes(layer);
        
        return (
          <Button
            key={layer}
            variant={isSelected ? "default" : "outline"}
            size="sm"
            onClick={() => onLayerToggle(layer)}
            className="gap-2"
            style={isSelected ? {
              backgroundColor: layerColors[index],
              borderColor: layerColors[index],
              color: 'white'
            } : undefined}
          >
            <div 
              className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={{ backgroundColor: layerColors[index] }}
            >
              {layer}
            </div>
            {name}
          </Button>
        );
      })}
    </div>
  );
}
