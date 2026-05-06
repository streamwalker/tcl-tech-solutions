import React from "react";
import { Star } from "lucide-react";

export const WhyItMattersPanel: React.FC<{ title?: string; children: React.ReactNode }> = ({
  title = "Why it matters",
  children,
}) => (
  <div className="my-6 rounded-xl border-l-4 border-primary bg-gradient-to-br from-primary/5 to-transparent p-5">
    <div className="flex items-center gap-2 text-primary font-semibold mb-2">
      <Star className="h-4 w-4" />
      <span className="text-sm uppercase tracking-wider">{title}</span>
    </div>
    <div className="text-sm leading-relaxed">{children}</div>
  </div>
);

export default WhyItMattersPanel;