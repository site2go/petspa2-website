"use client";

import { Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLayoutConfig } from "@/components/LayoutContext";
import { useScrollAnimation, useStaggeredAnimation } from "@/components/hooks/useScrollAnimation";

export interface PricingOption {
  /** Option name (e.g., "Basic Service", "Premium Package") */
  name: string;
  /** Price display (e.g., "$99", "From $50", "Contact Us") */
  price: string;
  /** Billing period (e.g., "/month", "/project", "starting") */
  period?: string;
  /** Short description */
  description?: string;
  /** Key features (3-5 bullet points) */
  features?: string[];
  /** CTA button text */
  ctaText: string;
  /** CTA button link */
  ctaHref: string;
}

interface PricingSimpleProps {
  title?: string;
  subtitle?: string;
  options: PricingOption[];
  /** Show as horizontal list or vertical stack */
  layout?: "horizontal" | "vertical";
  className?: string;
}

/**
 * Pricing Simple Component
 * Clean list with CTAs
 * Best for: Minimal, Magazine layouts
 */
export function PricingSimple({
  title = "Our Services",
  subtitle,
  options,
  layout = "vertical",
  className,
}: PricingSimpleProps) {
  const config = useLayoutConfig();
  const { ref: sectionRef, isInView } = useScrollAnimation<HTMLElement>();
  const { containerRef, getItemProps } = useStaggeredAnimation<HTMLDivElement>(options.length);

  return (
    <section
      ref={sectionRef}
      className={cn("py-16 md:py-24", className)}
      aria-labelledby="pricing-simple-title"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <div
          className={cn(
            "mb-12 md:mb-16 layout-entry",
            layout === "horizontal" ? "text-center" : "",
            isInView && "in-view"
          )}
        >
          {config.showDecorativeLines && (
            <div
              className={cn(
                "decorative-line mb-6",
                layout === "horizontal" && "mx-auto"
              )}
            />
          )}
          <h2
            id="pricing-simple-title"
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            {title}
          </h2>
          {subtitle && (
            <p
              className={cn(
                "text-lg text-muted-foreground",
                layout === "horizontal" && "max-w-2xl mx-auto"
              )}
            >
              {subtitle}
            </p>
          )}
        </div>

        {/* Options */}
        <div
          ref={containerRef}
          className={cn(
            layout === "horizontal"
              ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-0 divide-y divide-border"
          )}
        >
          {options.map((option, index) => {
            const { isInView: itemInView, style } = getItemProps(index);

            if (layout === "horizontal") {
              return (
                <article
                  key={index}
                  style={style}
                  className={cn(
                    "card-layout-interactive p-6 flex flex-col layout-entry",
                    itemInView && "in-view"
                  )}
                >
                  <h3 className="text-xl font-semibold mb-2">{option.name}</h3>
                  {option.description && (
                    <p className="text-sm text-muted-foreground mb-4">
                      {option.description}
                    </p>
                  )}
                  <div className="mb-4">
                    <span className="text-3xl font-bold">{option.price}</span>
                    {option.period && (
                      <span className="text-muted-foreground ml-1">
                        {option.period}
                      </span>
                    )}
                  </div>
                  {option.features && (
                    <ul className="space-y-2 mb-6 flex-1">
                      {option.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-start gap-2 text-sm">
                          <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <a
                    href={option.ctaHref}
                    className={cn(
                      "inline-flex items-center justify-center gap-2 py-2 px-4 font-medium",
                      "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                      "transition-all duration-200 btn-layout-interactive",
                      config.buttonInteraction
                    )}
                  >
                    {option.ctaText}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </article>
              );
            }

            // Vertical list layout
            return (
              <article
                key={index}
                style={style}
                className={cn(
                  "py-8 first:pt-0 last:pb-0 layout-entry group",
                  itemInView && "in-view"
                )}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-1 group-hover:text-primary transition-colors">
                      {option.name}
                    </h3>
                    {option.description && (
                      <p className="text-muted-foreground mb-3">
                        {option.description}
                      </p>
                    )}
                    {option.features && (
                      <ul className="flex flex-wrap gap-x-6 gap-y-2">
                        {option.features.map((feature, fIndex) => (
                          <li
                            key={fIndex}
                            className="flex items-center gap-2 text-sm text-muted-foreground"
                          >
                            <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="flex flex-col items-start md:items-end gap-3">
                    <div>
                      <span className="text-2xl font-bold">{option.price}</span>
                      {option.period && (
                        <span className="text-muted-foreground ml-1 text-sm">
                          {option.period}
                        </span>
                      )}
                    </div>
                    <a
                      href={option.ctaHref}
                      className={cn(
                        "inline-flex items-center gap-2 font-medium",
                        "text-primary hover:text-primary/80",
                        "transition-colors",
                        config.linkInteraction
                      )}
                    >
                      {option.ctaText}
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Contact for Custom Quote */}
        <div
          className={cn(
            "mt-12 text-center layout-entry",
            isInView && "in-view"
          )}
        >
          <p className="text-muted-foreground mb-4">
            Need something custom? We&apos;re happy to discuss your specific requirements.
          </p>
          <a
            href="#contact"
            className={cn(
              "inline-flex items-center gap-2 font-medium",
              "text-primary hover:text-primary/80 transition-colors",
              config.linkInteraction
            )}
          >
            Get a Custom Quote
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default PricingSimple;
