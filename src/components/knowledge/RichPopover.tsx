import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface Props {
  trigger: React.ReactNode;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const RichPopover: React.FC<Props> = ({ trigger, title, children, className }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent className={`w-80 ${className ?? ""}`}>
        {title && <h4 className="font-semibold mb-2">{title}</h4>}
        <div className="text-sm space-y-2 leading-relaxed">{children}</div>
      </PopoverContent>
    </Popover>
  );
};

export default RichPopover;