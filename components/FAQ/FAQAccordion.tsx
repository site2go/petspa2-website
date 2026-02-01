"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLayoutConfig } from "@/components/LayoutContext";
import { useScrollAnimation, useStaggeredAnimation } from "@/components/hooks/useScrollAnimation";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  title?: string;
  subtitle?: string;
  items: FAQItem[];
  className?: string;
}

/**
 * FAQ Accordion Component
 * Collapsible Q&A with smooth animations
 * Best for: Classic, Split, Bold layouts
 */
export function FAQAccordion({
  title = "Frequently Asked Questions",
  subtitle,
  items,
  className,
}: FAQAccordionProps) {
  const config = useLayoutConfig();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { ref: sectionRef, isInView } = useScrollAnimation<HTMLElement>();
  const { containerRef, getItemProps } = useStaggeredAnimation<HTMLDivElement>(items.length);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      className={cn("py-16 md:py-24", className)}
      aria-labelledby="faq-title"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <div
          className={cn(
            "text-center mb-12 layout-entry",
            isInView && "in-view"
          )}
        >
          {config.showDecorativeLines && (
            <div className="decorative-line-gradient mx-auto mb-6" />
          )}
          <h2
            id="faq-title"
            className={cn(
              "text-3xl md:text-4xl font-bold mb-4",
              config.showGradientText && "gradient-text"
            )}
          >
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Accordion Items */}
        <div ref={containerRef} className="space-y-3">
          {items.map((item, index) => {
            const { isInView: itemInView, style } = getItemProps(index);
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                style={style}
                className={cn(
                  "faq-item card-layout-interactive layout-entry overflow-hidden",
                  itemInView && "in-view"
                )}
              >
                <button
                  onClick={() => toggleItem(index)}
                  className={cn(
                    "w-full flex items-center justify-between p-4 md:p-6 text-left",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    config.buttonInteraction
                  )}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="text-base md:text-lg font-medium pr-4">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 flex-shrink-0 text-muted-foreground transition-transform duration-300",
                      isOpen && "rotate-180"
                    )}
                  />
                </button>
                <div
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  className={cn(
                    "grid transition-all duration-300 ease-out",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="px-4 md:px-6 pb-4 md:pb-6 pt-0 text-muted-foreground">
                      {item.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* JSON-LD Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: items.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          }),
        }}
      />
    </section>
  );
}

export default FAQAccordion;
