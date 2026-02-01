"use client";

import { cn } from "@/lib/utils";
import { useLayoutConfig } from "@/components/LayoutContext";
import { useScrollAnimation, useStaggeredAnimation } from "@/components/hooks/useScrollAnimation";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSimpleProps {
  title?: string;
  subtitle?: string;
  items: FAQItem[];
  className?: string;
}

/**
 * FAQ Simple Component
 * Minimal list style with clean typography
 * Best for: Minimal layout
 */
export function FAQSimple({
  title = "Frequently Asked Questions",
  subtitle,
  items,
  className,
}: FAQSimpleProps) {
  const config = useLayoutConfig();
  const { ref: sectionRef, isInView } = useScrollAnimation<HTMLElement>();
  const { containerRef, getItemProps } = useStaggeredAnimation<HTMLDivElement>(items.length);

  return (
    <section
      ref={sectionRef}
      className={cn("py-16 md:py-24", className)}
      aria-labelledby="faq-simple-title"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        {/* Header */}
        <div
          className={cn(
            "mb-12 md:mb-16 layout-entry",
            isInView && "in-view"
          )}
        >
          {config.showDecorativeLines && (
            <div className="decorative-line mb-6" />
          )}
          <h2
            id="faq-simple-title"
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-muted-foreground max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>

        {/* List */}
        <div ref={containerRef} className="divide-y divide-border">
          {items.map((item, index) => {
            const { isInView: itemInView, style } = getItemProps(index);

            return (
              <article
                key={index}
                style={style}
                className={cn(
                  "faq-item py-8 first:pt-0 last:pb-0 layout-entry group",
                  itemInView && "in-view"
                )}
              >
                <h3 className="text-lg font-medium mb-3 group-hover:text-primary transition-colors">
                  {item.question}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.answer}
                </p>
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

export default FAQSimple;
