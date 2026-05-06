import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export interface ImageAnnotation {
  id: string;
  x: number; // 0-100 (%)
  y: number; // 0-100 (%)
  label: string;
  description: React.ReactNode;
}

interface Props {
  src: string;
  alt: string;
  annotations: ImageAnnotation[];
  caption?: string;
}

export const AnnotatedImage: React.FC<Props> = ({ src, alt, annotations, caption }) => (
  <figure className="my-6">
    <div className="relative rounded-lg overflow-hidden border bg-muted">
      <img src={src} alt={alt} className="w-full h-auto block" />
      {annotations.map((a, i) => (
        <Popover key={a.id}>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="absolute -translate-x-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-primary text-primary-foreground text-xs font-bold shadow-lg ring-4 ring-primary/30 hover:scale-110 transition-transform"
              style={{ left: `${a.x}%`, top: `${a.y}%` }}
              aria-label={`Marker ${i + 1}: ${a.label}`}
            >
              {i + 1}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <div className="font-semibold text-sm mb-1">{a.label}</div>
            <div className="text-xs text-muted-foreground leading-relaxed">{a.description}</div>
          </PopoverContent>
        </Popover>
      ))}
    </div>
    {caption && <figcaption className="mt-2 text-xs text-muted-foreground text-center">{caption}</figcaption>}
  </figure>
);

export default AnnotatedImage;