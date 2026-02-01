"use client";

import { Check, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLayoutConfig } from "@/components/LayoutContext";
import { useScrollAnimation, useStaggeredAnimation } from "@/components/hooks/useScrollAnimation";

export interface PricingFeature {
  text: string;
  included: boolean;
}

export interface PricingTier {
  /** Tier name (e.g., "Basic", "Pro", "Enterprise") */
  name: string;
  /** Price display (e.g., "$99", "From $50", "Custom") */
  price: string;
  /** Billing period (e.g., "/month", "/year", "one-time") */
  period?: string;
  /** Short description */
  description?: string;
  /** List of features */
  features: PricingFeature[];
  /** CTA button text */
  ctaText: string;
  /** CTA button link */
  ctaHref: string;
  /** Mark as popular/recommended */
  popular?: boolean;
}

interface PricingCardsProps {
  title?: string;
  subtitle?: string;
  tiers: PricingTier[];
  className?: string;
}

/**
 * Pricing Cards Component
 * 3-tier card layout with highlighted "popular" option
 * Best for: Classic, Bold, Glass layouts
 */
export function PricingCards({
  title = "Simple, Transparent Pricing",
  subtitle,
  tiers,
  className,
}: PricingCardsProps) {
  const config = useLayoutConfig();
  const { ref: sectionRef, isInView } = useScrollAnimation<HTMLElement>();
  const { containerRef, getItemProps } = useStaggeredAnimation<HTMLDivElement>(tiers.length);

  return (
    <section
      ref={sectionRef}
      className={cn("py-16 md:py-24", className)}
      aria-labelledby="pricing-title"
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
            id="pricing-title"
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

        {/* Pricing Cards */}
        <div
          ref={containerRef}
          className={cn(
            "grid gap-6 md:gap-8 max-w-6xl mx-auto",
            tiers.length === 2 && "md:grid-cols-2",
            tiers.length === 3 && "md:grid-cols-3",
            tiers.length >= 4 && "md:grid-cols-2 lg:grid-cols-4"
          )}
        >
          {tiers.map((tier, index) => {
            const { isInView: itemInView, style } = getItemProps(index);

            return (
              <article
                key={index}
                style={style}
                className={cn(
                  "pricing-card card-layout-interactive p-6 md:p-8 flex flex-col layout-entry relative",
                  itemInView && "in-view",
                  tier.popular && [
                    "ring-2 ring-primary",
                    config.cardStyle === "glass" && "ring-primary/50",
                    // Scale up popular card
                    "md:scale-105 md:z-10",
                  ]
                )}
              >
                {/* Popular Badge */}
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span
                      className={cn(
                        "px-3 py-1 text-xs font-semibold uppercase tracking-wider",
                        "bg-primary text-primary-foreground rounded-full"
                      )}
                    >
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Tier Name */}
                <h3 className="text-xl font-semibold mb-2">{tier.name}</h3>

                {/* Description */}
                {tier.description && (
                  <p className="text-sm text-muted-foreground mb-4">
                    {tier.description}
                  </p>
                )}

                {/* Price */}
                <div className="mb-6">
                  <span
                    className={cn(
                      "text-4xl md:text-5xl font-bold",
                      config.showGradientText && tier.popular && "gradient-text"
                    )}
                  >
                    {tier.price}
                  </span>
                  {tier.period && (
                    <span className="text-muted-foreground ml-1">
                      {tier.period}
                    </span>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className={cn(
                        "flex items-start gap-3",
                        !feature.included && "text-muted-foreground"
                      )}
                    >
                      {feature.included ? (
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="h-5 w-5 text-muted-foreground/50 flex-shrink-0 mt-0.5" />
                      )}
                      <span className="text-sm">{feature.text}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <a
                  href={tier.ctaHref}
                  className={cn(
                    "inline-flex items-center justify-center gap-2 w-full py-3 px-4 font-medium",
                    "transition-all duration-200",
                    "btn-layout-interactive",
                    config.buttonInteraction,
                    tier.popular
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  )}
                >
                  {tier.ctaText}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default PricingCards;
