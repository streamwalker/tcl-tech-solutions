import React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useIsMobile } from "@/hooks/use-mobile";

interface Props {
  text: string;
  children: React.ReactNode;
}

export const TooltipDefinition: React.FC<Props> = ({ text, children }) => {
  const isMobile = useIsMobile();
  if (isMobile) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <button type="button" className="underline decoration-dotted underline-offset-4">
            {children}
          </button>
        </PopoverTrigger>
        <PopoverContent className="max-w-xs text-sm">{text}</PopoverContent>
      </Popover>
    );
  }
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="underline decoration-dotted underline-offset-4 cursor-help">{children}</span>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs">{text}</TooltipContent>
    </Tooltip>
  );
};

export default TooltipDefinition;