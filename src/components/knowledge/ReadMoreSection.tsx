import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  preview: React.ReactNode;
  children: React.ReactNode;
  label?: string;
  className?: string;
}

export const ReadMoreSection: React.FC<Props> = ({ preview, children, label = "Read more", className }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("space-y-3", className)}>
      <div>{preview}</div>
      <div
        className={cn(
          "grid transition-all duration-300",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="pt-2">{children}</div>
        </div>
      </div>
      <Button variant="ghost" size="sm" onClick={() => setOpen((v) => !v)}>
        {open ? (
          <>
            Show less <ChevronUp className="ml-1 h-4 w-4" />
          </>
        ) : (
          <>
            {label} <ChevronDown className="ml-1 h-4 w-4" />
          </>
        )}
      </Button>
    </div>
  );
};

export default ReadMoreSection;