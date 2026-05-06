import React from "react";
import { Volume2 } from "lucide-react";
import { toast } from "sonner";

interface Props {
  text: string;
  hint?: string;
  className?: string;
}

export const PronunciationButton: React.FC<Props> = ({ text, hint, className }) => {
  const speak = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      toast.info(hint ? `Pronunciation: ${hint}` : `Pronounce: ${text}`);
      return;
    }
    try {
      const u = new SpeechSynthesisUtterance(hint ?? text);
      u.rate = 0.9;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    } catch {
      toast.info(hint ? `Pronunciation: ${hint}` : `Pronounce: ${text}`);
    }
  };
  return (
    <button
      type="button"
      onClick={speak}
      aria-label={`Pronounce ${text}`}
      title={hint ? `Pronunciation: ${hint}` : "Play pronunciation"}
      className={`inline-flex items-center justify-center h-7 w-7 rounded-full hover:bg-secondary text-muted-foreground hover:text-primary transition-colors ${className ?? ""}`}
    >
      <Volume2 className="h-4 w-4" />
    </button>
  );
};

export default PronunciationButton;