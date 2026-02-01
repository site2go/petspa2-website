"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useLayoutConfig } from "@/components/LayoutContext";
import { ChevronDown } from "lucide-react";

interface HeroFullscreenProps {
  headline: string;
  subheadline: string;
  primaryCTA: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  backgroundImage?: string;
  backgroundImageAlt?: string;
  overlayOpacity?: number;
}

/**
 * HeroFullscreen - Full viewport hero for snap-scroll layouts
 * 100vh with dramatic centered content
 * Used by: Fullscreen layout
 */
export default function HeroFullscreen({
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
  backgroundImage = "https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=1920",
  backgroundImageAlt = "Hero background",
  overlayOpacity = 0.6,
}: HeroFullscreenProps) {
  const config = useLayoutConfig();

  return (
    <section
      id="hero"
      className={cn(
        "snap-section relative min-h-screen h-screen",
        "flex items-center justify-center overflow-hidden"
      )}
    >
      {/* Background Image */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt={backgroundImageAlt}
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div
            className="absolute inset-0 bg-background"
            style={{ opacity: overlayOpacity }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
        </div>
      )}

      {/* Decorative orbs */}
      {config.showDecorativeOrbs && (
        <>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/15 rounded-full blur-3xl" />
        </>
      )}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Headline */}
          <h1
            className={cn(
              "font-heading font-bold text-5xl md:text-7xl lg:text-8xl",
              "text-foreground mb-8 leading-tight",
              "layout-entry animate-fade-in",
              config.showGradientText && "gradient-text"
            )}
          >
            {headline}
          </h1>

          {/* Subheadline */}
          <p
            className={cn(
              "text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto",
              "layout-entry animate-fade-in animation-delay-200"
            )}
          >
            {subheadline}
          </p>

          {/* CTAs */}
          <div
            className={cn(
              "flex flex-col sm:flex-row gap-6 justify-center",
              "layout-entry animate-fade-in animation-delay-300"
            )}
          >
            <Link
              href={primaryCTA.href}
              className={cn(
                "px-12 py-5 rounded-full text-lg font-semibold",
                "bg-primary text-primary-foreground",
                "hover:scale-105 transition-transform duration-300",
                "shadow-xl shadow-primary/20"
              )}
            >
              {primaryCTA.label}
            </Link>
            {secondaryCTA && (
              <Link
                href={secondaryCTA.href}
                className={cn(
                  "px-12 py-5 rounded-full text-lg font-semibold",
                  "glass-card",
                  "hover:bg-background/80 transition-colors duration-300"
                )}
              >
                {secondaryCTA.label}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      {config.showScrollIndicator && (
        <div
          className={cn(
            "absolute bottom-8 left-1/2 -translate-x-1/2 z-10",
            "layout-entry animate-fade-in animation-delay-500"
          )}
        >
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <span className="text-sm font-medium">Scroll</span>
            <ChevronDown className="w-6 h-6 animate-bounce" />
          </div>
        </div>
      )}
    </section>
  );
}
