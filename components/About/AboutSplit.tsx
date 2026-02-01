"use client";

import Image from "next/image";
import { useLayoutConfig } from "@/components/LayoutContext";
import { useScrollAnimation } from "@/components/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

interface StatItem {
  value: string;
  label: string;
}

interface AboutSplitProps {
  title: string;
  paragraphs: string[];
  image: string;
  imageAlt?: string;
  stats?: StatItem[];
  reversed?: boolean;
}

/**
 * AboutSplit - Split layout with image and text
 * Clean, organized display of about content
 * Used by: Glass, Classic, Minimal layouts
 */
export default function AboutSplit({
  title,
  paragraphs,
  image,
  imageAlt = "About us",
  stats,
  reversed = false,
}: AboutSplitProps) {
  const config = useLayoutConfig();
  const { ref: sectionRef, isInView } = useScrollAnimation<HTMLDivElement>();

  return (
    <section id="about" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div
          ref={sectionRef}
          className={cn(
            "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center layout-entry",
            isInView && "in-view"
          )}
        >
          {/* Image */}
          <div
            className={cn(
              "relative aspect-[4/3] lg:aspect-square rounded-2xl overflow-hidden",
              reversed && "lg:order-2",
              config.cardStyle === "glass" && "glass-card"
            )}
          >
            <Image
              src={image}
              alt={imageAlt}
              fill
              className={cn(
                "object-cover transition-transform duration-500 hover:scale-105",
                config.imageInteraction
              )}
              sizes="(max-width: 1024px) 100vw, 50vw"
              unoptimized
            />
            {/* Decorative overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className={cn(reversed && "lg:order-1")}>
            {config.showDecorativeLines && (
              <div className="decorative-line mb-6" />
            )}

            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-6">
              {title}
            </h2>

            <div className="space-y-4 mb-8">
              {paragraphs.map((paragraph, index) => (
                <p key={index} className="text-muted-foreground text-lg leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Stats */}
            {stats && stats.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6 border-t border-border">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center md:text-left">
                    <div className="font-heading font-bold text-3xl md:text-4xl text-primary mb-1">
                      {stat.value}
                    </div>
                    <div className="text-muted-foreground text-sm">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
