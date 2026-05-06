import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface FAQItem { q: string; a: React.ReactNode; }

export const FAQBlock: React.FC<{ items: FAQItem[]; title?: string }> = ({ items, title = "Frequently asked questions" }) => {
  return (
    <section
      itemScope
      itemType="https://schema.org/FAQPage"
      className="my-8 border rounded-xl p-6 bg-card"
    >
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <Accordion type="single" collapsible>
        {items.map((it, i) => (
          <AccordionItem
            key={i}
            value={`faq-${i}`}
            itemScope
            itemProp="mainEntity"
            itemType="https://schema.org/Question"
          >
            <AccordionTrigger itemProp="name" className="text-left">{it.q}</AccordionTrigger>
            <AccordionContent
              itemScope
              itemProp="acceptedAnswer"
              itemType="https://schema.org/Answer"
            >
              <div itemProp="text" className="text-sm leading-relaxed text-muted-foreground">
                {it.a}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default FAQBlock;