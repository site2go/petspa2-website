"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutConfig } from "@/components/LayoutContext";
import { cn } from "@/lib/utils";

interface HeroSplitProps {
  headline: string;
  subheadline: string;
  heroImage: string;
  heroImageAlt?: string;
  primaryCTA: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  badge?: { icon?: React.ElementType; text: string };
  trustIndicators?: Array<{ icon?: React.ElementType; text: string }>;
  imagePosition?: "left" | "right";
}

/**
 * HeroSplit - 50/50 split layout with text and image
 * Asymmetric, corporate, balanced design
 * Used by: Split layout
 */
export default function HeroSplit({
  headline,
  subheadline,
  heroImage,
  heroImageAlt = "Hero image",
  primaryCTA,
  secondaryCTA,
  badge,
  trustIndicators = [],
  imagePosition = "right",
}: HeroSplitProps) {
  const config = useLayoutConfig();

  const textContent = (
    <div className="flex flex-col justify-center h-full py-12 lg:py-20">
      {/* Badge */}
      {badge && (
        <div
          className={cn(
            "inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6 w-fit",
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
          "font-heading font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-foreground mb-6",
          "animate-slide-up animation-delay-100"
        )}
      >
        {headline}
      </h1>

      {/* Subheadline */}
      <p
        className={cn(
          "text-lg md:text-xl text-muted-foreground mb-8 max-w-lg",
          "animate-fade-in animation-delay-200"
        )}
      >
        {subheadline}
      </p>

      {/* CTAs */}
      <div
        className={cn(
          "flex flex-col sm:flex-row gap-4 mb-10",
          "animate-fade-in animation-delay-300"
        )}
      >
        <Link
          href={primaryCTA.href}
          className={cn(
            "bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg",
            "hover:bg-primary/90 transition-colors",
            config.buttonInteraction
          )}
        >
          {primaryCTA.label}
        </Link>
        {secondaryCTA && (
          <Link
            href={secondaryCTA.href}
            className={cn(
              "border-2 border-primary text-primary px-8 py-4 rounded-lg font-semibold text-lg",
              "hover:bg-primary hover:text-primary-foreground transition-colors"
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
            "flex flex-wrap gap-6",
            "animate-fade-in animation-delay-500"
          )}
        >
          {trustIndicators.map((indicator, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-muted-foreground"
            >
              {indicator.icon && (
                <indicator.icon className="w-5 h-5 text-primary" />
              )}
              <span className="text-sm font-medium">{indicator.text}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const imageContent = (
    <div className="relative h-[400px] lg:h-full min-h-[500px]">
      <Image
        src={heroImage}
        alt={heroImageAlt}
        fill
        className="object-cover"
        priority
        unoptimized
      />
    </div>
  );

  return (
    <section className="min-h-screen pt-16 bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-4rem)]">
        {/* Text Side */}
        <div
          className={cn(
            "container mx-auto px-4 lg:px-8",
            imagePosition === "left" ? "order-2" : "order-1"
          )}
        >
          {textContent}
        </div>

        {/* Image Side */}
        <div
          className={cn(
            "relative overflow-hidden",
            imagePosition === "left" ? "order-1" : "order-2"
          )}
        >
          {imageContent}
        </div>
      </div>
    </section>
  );
}
