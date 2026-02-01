"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface HeroBrutalistProps {
  headline: string;
  subheadline: string;
  primaryCTA: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
}

/**
 * HeroBrutalist - Raw typography hero with no images
 * Giant monospace headlines, thick borders, harsh aesthetic
 * Used by: Brutalist layout
 */
export default function HeroBrutalist({
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
}: HeroBrutalistProps) {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center py-20 bg-background border-b-8 border-foreground"
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-5xl">
          {/* Giant Headline */}
          <h1
            className={cn(
              "font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl",
              "text-foreground uppercase tracking-tighter leading-[0.85]",
              "mb-8"
            )}
          >
            {headline.split(" ").map((word, i) => (
              <span key={i} className="block">
                {word}
              </span>
            ))}
          </h1>

          {/* Subheadline with offset */}
          <p
            className={cn(
              "text-xl md:text-2xl text-foreground/70 max-w-xl",
              "border-l-8 border-primary pl-6 mb-12",
              "font-mono"
            )}
          >
            {subheadline}
          </p>

          {/* CTAs - Brutal style */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={primaryCTA.href}
              className={cn(
                "inline-block px-8 py-5 text-lg font-bold uppercase tracking-wider",
                "bg-foreground text-background border-4 border-foreground",
                "hover:bg-primary hover:border-primary transition-colors duration-200"
              )}
              style={{ boxShadow: "6px 6px 0 hsl(var(--primary))" }}
            >
              {primaryCTA.label}
            </Link>
            {secondaryCTA && (
              <Link
                href={secondaryCTA.href}
                className={cn(
                  "inline-block px-8 py-5 text-lg font-bold uppercase tracking-wider",
                  "bg-background text-foreground border-4 border-foreground",
                  "hover:bg-muted transition-colors duration-200"
                )}
              >
                {secondaryCTA.label}
              </Link>
            )}
          </div>
        </div>

        {/* Decorative Element */}
        <div className="absolute top-8 right-8 hidden lg:block">
          <div className="text-[200px] font-black text-foreground/5 leading-none select-none">
            01
          </div>
        </div>
      </div>
    </section>
  );
}
