import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface ExplainerItem {
  id: string;
  question: string;
  answer: React.ReactNode;
}

export const ExplainerAccordion: React.FC<{ items: ExplainerItem[]; className?: string }> = ({
  items,
  className,
}) => {
  return (
    <Accordion type="single" collapsible className={className}>
      {items.map((it) => (
        <AccordionItem key={it.id} value={it.id}>
          <AccordionTrigger className="text-left">{it.question}</AccordionTrigger>
          <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
            {it.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default ExplainerAccordion;