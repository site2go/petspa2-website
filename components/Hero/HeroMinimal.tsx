"use client";

import Link from "next/link";
import { useLayoutConfig } from "@/components/LayoutContext";
import { cn } from "@/lib/utils";

interface HeroMinimalProps {
  headline: string;
  subheadline: string;
  primaryCTA: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  trustIndicators?: Array<{ icon?: React.ElementType; text: string }>;
}

/**
 * HeroMinimal - Text-only hero with giant typography
 * NO hero image - just typography and whitespace
 * Used by: Minimal layout
 */
export default function HeroMinimal({
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
  trustIndicators = [],
}: HeroMinimalProps) {
  const config = useLayoutConfig();

  return (
    <section className="min-h-[85vh] flex items-center justify-center pt-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Giant Headline */}
          <h1
            className={cn(
              "font-heading font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-foreground mb-8 tracking-tight",
              "animate-fade-in"
            )}
          >
            {headline}
          </h1>

          {/* Subheadline */}
          <p
            className={cn(
              "text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed",
              "animate-fade-in animation-delay-200"
            )}
          >
            {subheadline}
          </p>

          {/* CTAs - Simple, clean */}
          <div
            className={cn(
              "flex flex-col sm:flex-row gap-4 justify-center mb-16",
              "animate-fade-in animation-delay-300"
            )}
          >
            <Link
              href={primaryCTA.href}
              className={cn(
                "bg-foreground text-background px-8 py-4 rounded-none font-medium text-lg",
                "hover:bg-foreground/90 transition-colors",
                config.buttonInteraction
              )}
            >
              {primaryCTA.label}
            </Link>
            {secondaryCTA && (
              <Link
                href={secondaryCTA.href}
                className={cn(
                  "border border-foreground text-foreground px-8 py-4 rounded-none font-medium text-lg",
                  "hover:bg-foreground hover:text-background transition-colors"
                )}
              >
                {secondaryCTA.label}
              </Link>
            )}
          </div>

          {/* Trust Indicators - Minimal styling */}
          {trustIndicators.length > 0 && (
            <div
              className={cn(
                "flex flex-wrap gap-8 justify-center text-muted-foreground",
                "animate-fade-in animation-delay-500"
              )}
            >
              {trustIndicators.map((indicator, index) => (
                <div key={index} className="flex items-center gap-2">
                  {indicator.icon && <indicator.icon className="w-4 h-4" />}
                  <span className="text-sm tracking-wide">{indicator.text}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
