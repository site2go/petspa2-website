"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutConfig } from "@/components/LayoutContext";
import { cn } from "@/lib/utils";

interface HeroFullBleedProps {
  headline: string;
  subheadline: string;
  backgroundImage: string;
  backgroundImageAlt?: string;
  primaryCTA: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  badge?: { icon?: React.ElementType; text: string };
  trustIndicators?: Array<{ icon?: React.ElementType; text: string }>;
  overlayStyle?: "dark" | "gradient" | "color";
}

/**
 * HeroFullBleed - Full-bleed image with huge text
 * Energetic, attention-grabbing design
 * Used by: Bold layout, Magazine layout
 */
export default function HeroFullBleed({
  headline,
  subheadline,
  backgroundImage,
  backgroundImageAlt = "Hero background",
  primaryCTA,
  secondaryCTA,
  badge,
  trustIndicators = [],
  overlayStyle = "dark",
}: HeroFullBleedProps) {
  const config = useLayoutConfig();

  const overlayClasses = {
    dark: "bg-foreground/70",
    gradient: "bg-gradient-to-b from-foreground/80 via-foreground/50 to-foreground/80",
    color: "bg-primary/60",
  };

  return (
    <section className="relative min-h-screen flex items-center">
      {/* Full-bleed Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt={backgroundImageAlt}
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className={cn("absolute inset-0", overlayClasses[overlayStyle])} />
      </div>

      {/* Decorative elements for Bold layout */}
      {config.showDecorativeOrbs && (
        <>
          <div className="decorative-orb decorative-orb-primary absolute top-20 right-10 opacity-50" />
          <div className="decorative-orb decorative-orb-accent absolute bottom-40 left-10 opacity-40" />
        </>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          {badge && (
            <div
              className={cn(
                "inline-flex items-center gap-2 bg-accent text-accent-foreground px-5 py-2.5 rounded-full mb-8",
                "animate-scale-in-bounce"
              )}
            >
              {badge.icon && <badge.icon size={20} />}
              <span className="text-sm font-bold uppercase tracking-wider">
                {badge.text}
              </span>
            </div>
          )}

          {/* Huge Headline */}
          <h1
            className={cn(
              "font-heading font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-background mb-8 leading-[0.9]",
              config.showGradientText && "gradient-text-animated",
              "animate-scale-in-bounce animation-delay-100"
            )}
          >
            {headline}
          </h1>

          {/* Subheadline */}
          <p
            className={cn(
              "text-xl md:text-2xl text-background/90 mb-10 max-w-2xl mx-auto font-medium",
              "animate-fade-in animation-delay-200"
            )}
          >
            {subheadline}
          </p>

          {/* Bold CTAs */}
          <div
            className={cn(
              "flex flex-col sm:flex-row gap-5 justify-center mb-14",
              "animate-fade-in animation-delay-300"
            )}
          >
            <Link
              href={primaryCTA.href}
              className={cn(
                "bg-accent text-accent-foreground px-10 py-5 rounded-xl font-bold text-lg shadow-xl",
                "hover:scale-105 transition-transform",
                config.buttonInteraction
              )}
            >
              {primaryCTA.label}
            </Link>
            {secondaryCTA && (
              <Link
                href={secondaryCTA.href}
                className={cn(
                  "bg-background/20 text-background border-2 border-background/40 px-10 py-5 rounded-xl font-bold text-lg backdrop-blur-sm",
                  "hover:bg-background/30 transition-colors"
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
                "flex flex-wrap gap-8 justify-center",
                "animate-fade-in animation-delay-500"
              )}
            >
              {trustIndicators.map((indicator, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 text-background"
                >
                  {indicator.icon && (
                    <indicator.icon className="w-6 h-6 text-accent" />
                  )}
                  <span className="text-base font-semibold">
                    {indicator.text}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      {config.showScrollIndicator && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-background/50 flex justify-center pt-2">
            <div className="w-1 h-3 bg-background/50 rounded-full" />
          </div>
        </div>
      )}

      {/* Angled Divider */}
      {config.sectionTransition === "angled" && (
        <div
          className="absolute bottom-0 left-0 right-0 h-24 bg-background"
          style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }}
        />
      )}
    </section>
  );
}
