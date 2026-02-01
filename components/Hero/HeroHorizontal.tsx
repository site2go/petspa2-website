"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface HeroHorizontalProps {
  headline: string;
  subheadline: string;
  primaryCTA: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  backgroundImage?: string;
  backgroundImageAlt?: string;
}

/**
 * HeroHorizontal - First panel in horizontal scroll layout
 * Full width panel optimized for horizontal navigation
 * Used by: Horizontal layout
 */
export default function HeroHorizontal({
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
  backgroundImage = "https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=1920",
  backgroundImageAlt = "Hero background",
}: HeroHorizontalProps) {
  return (
    <section
      id="hero"
      className={cn(
        "horizontal-panel relative min-w-[100vw] w-[100vw] h-screen",
        "flex items-center snap-start snap-always"
      )}
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {backgroundImage && (
          <Image
            src={backgroundImage}
            alt={backgroundImageAlt}
            fill
            className="object-cover"
            priority
            unoptimized
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
      </div>

      {/* Content - Left aligned for horizontal flow */}
      <div className="relative z-10 container mx-auto px-8 md:px-16">
        <div className="max-w-2xl">
          {/* Headline */}
          <h1
            className={cn(
              "font-heading font-bold text-5xl md:text-6xl lg:text-7xl",
              "text-foreground mb-6 leading-tight",
              "layout-entry animate-fade-in"
            )}
          >
            {headline}
          </h1>

          {/* Subheadline */}
          <p
            className={cn(
              "text-lg md:text-xl text-muted-foreground mb-10 max-w-lg",
              "layout-entry animate-fade-in animation-delay-200"
            )}
          >
            {subheadline}
          </p>

          {/* CTAs */}
          <div
            className={cn(
              "flex flex-col sm:flex-row gap-4",
              "layout-entry animate-fade-in animation-delay-300"
            )}
          >
            <Link
              href={primaryCTA.href}
              className={cn(
                "px-8 py-4 rounded-lg text-lg font-semibold",
                "bg-primary text-primary-foreground",
                "hover:scale-105 transition-transform duration-300",
                "shadow-lg"
              )}
            >
              {primaryCTA.label}
            </Link>
            {secondaryCTA && (
              <Link
                href={secondaryCTA.href}
                className={cn(
                  "px-8 py-4 rounded-lg text-lg font-semibold",
                  "border border-border bg-background/50 backdrop-blur-sm",
                  "hover:bg-muted transition-colors duration-300"
                )}
              >
                {secondaryCTA.label}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Right side */}
      <div
        className={cn(
          "absolute right-8 top-1/2 -translate-y-1/2 z-10",
          "hidden md:flex flex-col items-center gap-2"
        )}
      >
        <span className="text-sm text-muted-foreground font-medium rotate-90 whitespace-nowrap mb-4">
          Scroll
        </span>
        <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center">
          <ChevronRight className="w-5 h-5 text-muted-foreground animate-pulse" />
        </div>
      </div>
    </section>
  );
}
