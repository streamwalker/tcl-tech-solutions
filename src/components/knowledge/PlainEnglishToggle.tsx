import React from "react";
import { Switch } from "@/components/ui/switch";
import { Sparkles } from "lucide-react";
import { useKnowledge } from "@/contexts/KnowledgeContext";

export const PlainEnglishToggle: React.FC<{ className?: string }> = ({ className }) => {
  const { plainEnglish, togglePlainEnglish } = useKnowledge();
  return (
    <label
      className={`inline-flex items-center gap-2 px-3 py-2 rounded-full border bg-card cursor-pointer select-none ${className ?? ""}`}
    >
      <Sparkles className="h-4 w-4 text-primary" />
      <span className="text-xs font-medium">Plain English</span>
      <Switch checked={plainEnglish} onCheckedChange={togglePlainEnglish} aria-label="Toggle plain English mode" />
    </label>
  );
};

export default PlainEnglishToggle;