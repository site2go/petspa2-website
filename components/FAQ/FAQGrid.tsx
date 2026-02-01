"use client";

import { HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLayoutConfig } from "@/components/LayoutContext";
import { useScrollAnimation, useStaggeredAnimation } from "@/components/hooks/useScrollAnimation";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQGridProps {
  title?: string;
  subtitle?: string;
  items: FAQItem[];
  columns?: 2 | 3;
  className?: string;
}

/**
 * FAQ Grid Component
 * Card-based grid layout for FAQ items
 * Best for: Glass, Magazine layouts
 */
export function FAQGrid({
  title = "Frequently Asked Questions",
  subtitle,
  items,
  columns = 2,
  className,
}: FAQGridProps) {
  const config = useLayoutConfig();
  const { ref: sectionRef, isInView } = useScrollAnimation<HTMLElement>();
  const { containerRef, getItemProps } = useStaggeredAnimation<HTMLDivElement>(items.length);

  return (
    <section
      ref={sectionRef}
      className={cn("py-16 md:py-24", className)}
      aria-labelledby="faq-grid-title"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={cn(
            "text-center mb-12 md:mb-16 layout-entry",
            isInView && "in-view"
          )}
        >
          {config.showDecorativeLines && (
            <div className="decorative-line-gradient mx-auto mb-6" />
          )}
          <h2
            id="faq-grid-title"
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

        {/* Grid */}
        <div
          ref={containerRef}
          className={cn(
            "grid gap-6",
            columns === 2
              ? "md:grid-cols-2"
              : "md:grid-cols-2 lg:grid-cols-3"
          )}
        >
          {items.map((item, index) => {
            const { isInView: itemInView, style } = getItemProps(index);

            return (
              <article
                key={index}
                style={style}
                className={cn(
                  "faq-item card-layout-interactive p-6 layout-entry",
                  itemInView && "in-view"
                )}
              >
                <div className="flex items-start gap-4">
                  {config.showContactIcons && (
                    <div className="flex-shrink-0 p-2 rounded-lg bg-primary/10">
                      <HelpCircle className="h-5 w-5 text-primary" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold mb-2">
                      {item.question}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </article>
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

export default FAQGrid;
