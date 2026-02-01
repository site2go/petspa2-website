"use client";

import { Check, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLayoutConfig } from "@/components/LayoutContext";
import { useScrollAnimation } from "@/components/hooks/useScrollAnimation";

export interface PricingFeature {
  name: string;
  tiers: Record<string, boolean | string>;
}

export interface PricingTierHeader {
  name: string;
  price: string;
  period?: string;
  description?: string;
  ctaText: string;
  ctaHref: string;
  popular?: boolean;
}

interface PricingTableProps {
  title?: string;
  subtitle?: string;
  tiers: PricingTierHeader[];
  features: PricingFeature[];
  featureCategories?: Array<{ name: string; features: string[] }>;
  className?: string;
}

/**
 * Pricing Table Component
 * Feature comparison table layout
 * Best for: Split layout
 */
export function PricingTable({
  title = "Compare Plans",
  subtitle,
  tiers,
  features,
  featureCategories,
  className,
}: PricingTableProps) {
  const config = useLayoutConfig();
  const { ref: sectionRef, isInView } = useScrollAnimation<HTMLElement>();

  const renderFeatureValue = (value: boolean | string) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="h-5 w-5 text-green-500 mx-auto" />
      ) : (
        <X className="h-5 w-5 text-muted-foreground/50 mx-auto" />
      );
    }
    return <span className="text-sm">{value}</span>;
  };

  return (
    <section
      ref={sectionRef}
      className={cn("py-16 md:py-24 overflow-x-auto", className)}
      aria-labelledby="pricing-table-title"
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
            id="pricing-table-title"
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

        {/* Table */}
        <div
          className={cn(
            "card-layout-interactive overflow-hidden layout-entry",
            isInView && "in-view"
          )}
        >
          <table className="w-full min-w-[600px]">
            {/* Header Row */}
            <thead>
              <tr className="border-b border-border">
                <th className="p-4 md:p-6 text-left w-1/4">
                  <span className="sr-only">Feature</span>
                </th>
                {tiers.map((tier, index) => (
                  <th
                    key={index}
                    className={cn(
                      "p-4 md:p-6 text-center",
                      tier.popular && "bg-primary/5"
                    )}
                  >
                    {tier.popular && (
                      <span
                        className={cn(
                          "inline-block px-3 py-1 mb-2 text-xs font-semibold uppercase tracking-wider",
                          "bg-primary text-primary-foreground rounded-full"
                        )}
                      >
                        Popular
                      </span>
                    )}
                    <div className="font-semibold text-lg mb-1">
                      {tier.name}
                    </div>
                    <div className="mb-2">
                      <span className="text-2xl md:text-3xl font-bold">
                        {tier.price}
                      </span>
                      {tier.period && (
                        <span className="text-muted-foreground text-sm">
                          {tier.period}
                        </span>
                      )}
                    </div>
                    {tier.description && (
                      <p className="text-sm text-muted-foreground mb-4">
                        {tier.description}
                      </p>
                    )}
                    <a
                      href={tier.ctaHref}
                      className={cn(
                        "inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium",
                        "transition-all duration-200",
                        "btn-layout-interactive",
                        tier.popular
                          ? "bg-primary text-primary-foreground hover:bg-primary/90"
                          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      )}
                    >
                      {tier.ctaText}
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Feature Rows */}
            <tbody>
              {featureCategories ? (
                // Categorized features
                featureCategories.map((category, catIndex) => (
                  <>
                    <tr key={`cat-${catIndex}`} className="bg-muted/50">
                      <td
                        colSpan={tiers.length + 1}
                        className="p-3 md:p-4 font-semibold text-sm uppercase tracking-wider"
                      >
                        {category.name}
                      </td>
                    </tr>
                    {features
                      .filter((f) => category.features.includes(f.name))
                      .map((feature, fIndex) => (
                        <tr
                          key={`${catIndex}-${fIndex}`}
                          className="border-b border-border/50 last:border-0"
                        >
                          <td className="p-3 md:p-4 text-sm">
                            {feature.name}
                          </td>
                          {tiers.map((tier, tIndex) => (
                            <td
                              key={tIndex}
                              className={cn(
                                "p-3 md:p-4 text-center",
                                tier.popular && "bg-primary/5"
                              )}
                            >
                              {renderFeatureValue(feature.tiers[tier.name])}
                            </td>
                          ))}
                        </tr>
                      ))}
                  </>
                ))
              ) : (
                // Flat feature list
                features.map((feature, index) => (
                  <tr
                    key={index}
                    className="border-b border-border/50 last:border-0"
                  >
                    <td className="p-3 md:p-4 text-sm">{feature.name}</td>
                    {tiers.map((tier, tIndex) => (
                      <td
                        key={tIndex}
                        className={cn(
                          "p-3 md:p-4 text-center",
                          tier.popular && "bg-primary/5"
                        )}
                      >
                        {renderFeatureValue(feature.tiers[tier.name])}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default PricingTable;
