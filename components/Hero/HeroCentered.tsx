"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutConfig } from "@/components/LayoutContext";
import { cn } from "@/lib/utils";

interface HeroCenteredProps {
  headline: string;
  subheadline: string;
  backgroundImage: string;
  backgroundImageAlt?: string;
  primaryCTA: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  badge?: { icon?: React.ElementType; text: string };
  trustIndicators?: Array<{ icon?: React.ElementType; text: string }>;
}

/**
 * HeroCentered - Traditional centered hero with image background
 * Classic layout - symmetrical, familiar design
 * Used by: Classic layout
 */
export default function HeroCentered({
  headline,
  subheadline,
  backgroundImage,
  backgroundImageAlt = "Hero background",
  primaryCTA,
  secondaryCTA,
  badge,
  trustIndicators = [],
}: HeroCenteredProps) {
  const config = useLayoutConfig();

  return (
    <section className="relative min-h-[90vh] flex items-center pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt={backgroundImageAlt}
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-foreground/60" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          {badge && (
            <div
              className={cn(
                "inline-flex items-center gap-2 bg-accent/90 text-accent-foreground px-4 py-2 rounded-full mb-6",
                "animate-fade-in"
              )}
            >
              {badge.icon && <badge.icon size={18} />}
              <span className="text-sm font-semibold">{badge.text}</span>
            </div>
          )}

          {/* Headline */}
          <h1
            className={cn(
              "font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-background mb-6",
              "animate-fade-in-up animation-delay-100"
            )}
          >
            {headline}
          </h1>

          {/* Subheadline */}
          <p
            className={cn(
              "text-lg md:text-xl text-background/90 mb-8 max-w-2xl mx-auto",
              "animate-fade-in animation-delay-200"
            )}
          >
            {subheadline}
          </p>

          {/* CTAs */}
          <div
            className={cn(
              "flex flex-col sm:flex-row gap-4 justify-center mb-12",
              "animate-fade-in animation-delay-300"
            )}
          >
            <Link
              href={primaryCTA.href}
              className={cn(
                "bg-secondary text-secondary-foreground px-8 py-4 rounded-lg font-semibold text-lg shadow-lg",
                "hover:shadow-xl transition-shadow",
                config.buttonInteraction
              )}
            >
              {primaryCTA.label}
            </Link>
            {secondaryCTA && (
              <Link
                href={secondaryCTA.href}
                className={cn(
                  "bg-background/10 text-background border border-background/30 px-8 py-4 rounded-lg font-semibold text-lg backdrop-blur-sm",
                  "hover:bg-background/20 transition-colors"
                )}
              >
                {secondaryCTA.label}
              </Link>
            )}
          </div>

          {/* Trust Indicators */}
          {trustIndicators.length > 0 && (
            <div
              className={cn(
                "flex flex-wrap gap-6 justify-center",
                "animate-fade-in animation-delay-500"
              )}
            >
              {trustIndicators.map((indicator, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-background/90"
                >
                  {indicator.icon && (
                    <indicator.icon className="w-5 h-5 text-accent" />
                  )}
                  <span className="text-sm font-medium">{indicator.text}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
