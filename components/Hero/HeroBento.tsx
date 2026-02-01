"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useLayoutConfig } from "@/components/LayoutContext";

interface HeroBentoProps {
  headline: string;
  subheadline: string;
  primaryCTA: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  images?: {
    main?: string;
    secondary?: string;
    tertiary?: string;
  };
  stats?: Array<{ value: string; label: string }>;
}

const defaultImages = {
  main: "https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=800",
  secondary: "https://images.pexels.com/photos/1805600/pexels-photo-1805600.jpeg?auto=compress&cs=tinysrgb&w=600",
  tertiary: "https://images.pexels.com/photos/897262/pexels-photo-897262.jpeg?auto=compress&cs=tinysrgb&w=600",
};

const defaultStats = [
  { value: "10+", label: "Years Experience" },
  { value: "5000+", label: "Happy Clients" },
  { value: "4.9", label: "Rating" },
];

/**
 * HeroBento - Multi-panel grid hero layout
 * 2x2 or 3x2 grid with varied panel sizes
 * Used by: Bento layout
 */
export default function HeroBento({
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
  images = defaultImages,
  stats = defaultStats,
}: HeroBentoProps) {
  const config = useLayoutConfig();

  return (
    <section id="hero" className="min-h-screen py-20 pt-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="bento-grid min-h-[80vh]">
          {/* Main Content Panel - 2x2 */}
          <div
            className={cn(
              "bento-item bento-2x2 p-8 md:p-12 flex flex-col justify-center",
              "bg-gradient-to-br from-primary/10 to-accent/10",
              "layout-entry animate-fade-in"
            )}
          >
            <h1
              className={cn(
                "font-heading font-bold text-4xl md:text-5xl lg:text-6xl",
                "text-foreground mb-6 leading-tight",
                config.showGradientText && "gradient-text"
              )}
            >
              {headline}
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              {subheadline}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={primaryCTA.href}
                className={cn(
                  "px-8 py-4 rounded-xl font-semibold",
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
                    "px-8 py-4 rounded-xl font-semibold",
                    "border border-border bg-background/50 backdrop-blur-sm",
                    "hover:bg-muted transition-colors duration-300"
                  )}
                >
                  {secondaryCTA.label}
                </Link>
              )}
            </div>
          </div>

          {/* Main Image Panel - 2x1 */}
          {images.main && (
            <div
              className={cn(
                "bento-item bento-2x1 relative overflow-hidden",
                "layout-entry animate-fade-in animation-delay-100"
              )}
            >
              <Image
                src={images.main}
                alt="Main showcase"
                fill
                className="object-cover"
                priority
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
            </div>
          )}

          {/* Stats Panel - 1x1 */}
          <div
            className={cn(
              "bento-item bento-1x1 p-6 flex flex-col justify-center",
              "bg-primary text-primary-foreground",
              "layout-entry animate-fade-in animation-delay-200"
            )}
          >
            <div className="text-4xl md:text-5xl font-bold mb-2">
              {stats[0]?.value}
            </div>
            <div className="text-sm opacity-80">{stats[0]?.label}</div>
          </div>

          {/* Secondary Image Panel - 1x1 */}
          {images.secondary && (
            <div
              className={cn(
                "bento-item bento-1x1 relative overflow-hidden",
                "layout-entry animate-fade-in animation-delay-300"
              )}
            >
              <Image
                src={images.secondary}
                alt="Secondary showcase"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          )}

          {/* Stats Panel 2 - 1x1 */}
          <div
            className={cn(
              "bento-item bento-1x1 p-6 flex flex-col justify-center",
              "bg-muted",
              "layout-entry animate-fade-in animation-delay-400"
            )}
          >
            <div className="text-4xl md:text-5xl font-bold mb-2 text-foreground">
              {stats[1]?.value}
            </div>
            <div className="text-sm text-muted-foreground">{stats[1]?.label}</div>
          </div>

          {/* Tertiary Image Panel - 1x1 */}
          {images.tertiary && (
            <div
              className={cn(
                "bento-item bento-1x1 relative overflow-hidden",
                "layout-entry animate-fade-in animation-delay-500"
              )}
            >
              <Image
                src={images.tertiary}
                alt="Tertiary showcase"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
