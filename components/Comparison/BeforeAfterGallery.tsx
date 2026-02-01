"use client";

import { useState, useCallback, RefCallback } from "react";
import Image from "next/image";
import { useLayoutConfig } from "@/components/LayoutContext";
import { useScrollAnimation, useStaggeredAnimation } from "@/components/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import BeforeAfterSlider from "./BeforeAfterSlider";

interface BeforeAfterItem {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  caption?: string;
  category?: string;
}

interface BeforeAfterGalleryProps {
  title: string;
  subtitle?: string;
  items: BeforeAfterItem[];
  categories?: string[];
  variant?: "grid" | "carousel";
}

/**
 * BeforeAfterGallery - Grid/carousel of before/after comparisons
 * Lightbox mode with full BeforeAfterSlider interaction
 * High-value for: beauty, auto repair, dental, pet grooming, salon
 */
export default function BeforeAfterGallery({
  title,
  subtitle,
  items,
  categories,
  variant = "grid",
}: BeforeAfterGalleryProps) {
  const config = useLayoutConfig();
  const { ref: headerRef, isInView: headerInView } = useScrollAnimation();
  const { containerRef, getItemProps } = useStaggeredAnimation(items.length);

  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Filter items by category
  const filteredItems = activeCategory
    ? items.filter((item) => item.category === activeCategory)
    : items;

  // Get unique categories
  const displayCategories =
    categories ||
    (Array.from(new Set(items.map((item) => item.category).filter(Boolean))) as string[]);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goToPrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex(
      lightboxIndex === 0 ? filteredItems.length - 1 : lightboxIndex - 1
    );
  };

  const goToNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex(
      lightboxIndex === filteredItems.length - 1 ? 0 : lightboxIndex + 1
    );
  };

  return (
    <section id="transformations" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className={cn(
            "text-center mb-12 layout-entry",
            headerInView && "in-view"
          )}
        >
          {config.showDecorativeLines && (
            <div className="decorative-line mx-auto mb-4" />
          )}
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Category Filters */}
        {displayCategories.length > 1 && (
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            <button
              onClick={() => setActiveCategory(null)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                activeCategory === null
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              All
            </button>
            {displayCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize",
                  activeCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {category.replace(/-/g, " ")}
              </button>
            ))}
          </div>
        )}

        {/* Gallery Grid */}
        {variant === "grid" && (
          <div
            ref={containerRef as React.RefObject<HTMLDivElement>}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredItems.map((item, index) => {
              const { isInView, style } = getItemProps(index);

              return (
                <div
                  key={`${item.beforeImage}-${index}`}
                  style={style}
                  className={cn("layout-entry", isInView && "in-view")}
                >
                  <div
                    className={cn(
                      "group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer",
                      "card-layout-interactive",
                      config.cardStyle === "glass" && "glass-card",
                      config.cardStyle === "bordered" && "border-2 border-border"
                    )}
                    onClick={() => openLightbox(index)}
                  >
                    {/* Split Preview (Before | After) */}
                    <div className="absolute inset-0 flex">
                      {/* Before Half */}
                      <div className="relative w-1/2 h-full overflow-hidden">
                        <Image
                          src={item.beforeImage}
                          alt={`Before - ${item.caption || ""}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, 25vw"
                          unoptimized
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/20" />
                      </div>
                      {/* After Half */}
                      <div className="relative w-1/2 h-full overflow-hidden">
                        <Image
                          src={item.afterImage}
                          alt={`After - ${item.caption || ""}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, 25vw"
                          unoptimized
                        />
                        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-background/20" />
                      </div>
                    </div>

                    {/* Center Divider */}
                    <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white/80 -translate-x-1/2 z-10" />

                    {/* Labels */}
                    <div className="absolute bottom-3 left-3 z-10">
                      <span className="px-2 py-1 rounded text-xs font-medium bg-background/80 backdrop-blur-sm text-foreground">
                        {item.beforeLabel || "Before"}
                      </span>
                    </div>
                    <div className="absolute bottom-3 right-3 z-10">
                      <span className="px-2 py-1 rounded text-xs font-medium bg-background/80 backdrop-blur-sm text-foreground">
                        {item.afterLabel || "After"}
                      </span>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity px-4 py-2 rounded-full bg-background/90 text-foreground text-sm font-medium">
                        Click to compare
                      </span>
                    </div>
                  </div>

                  {/* Caption */}
                  {item.caption && (
                    <p className="mt-3 text-center text-foreground font-medium">
                      {item.caption}
                    </p>
                  )}
                  {item.category && (
                    <p className="text-center text-muted-foreground text-sm capitalize">
                      {item.category.replace(/-/g, " ")}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Carousel Variant */}
        {variant === "carousel" && (
          <div className="relative overflow-hidden">
            <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4">
              {filteredItems.map((item, index) => (
                <div
                  key={`${item.beforeImage}-${index}`}
                  className="flex-shrink-0 w-[300px] md:w-[400px] snap-start"
                  onClick={() => openLightbox(index)}
                >
                  <div
                    className={cn(
                      "relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer",
                      "card-layout-interactive",
                      config.cardStyle === "glass" && "glass-card",
                      config.cardStyle === "bordered" && "border-2 border-border"
                    )}
                  >
                    {/* Split Preview */}
                    <div className="absolute inset-0 flex">
                      <div className="relative w-1/2 h-full">
                        <Image
                          src={item.beforeImage}
                          alt={`Before - ${item.caption || ""}`}
                          fill
                          className="object-cover"
                          sizes="200px"
                          unoptimized
                        />
                      </div>
                      <div className="relative w-1/2 h-full">
                        <Image
                          src={item.afterImage}
                          alt={`After - ${item.caption || ""}`}
                          fill
                          className="object-cover"
                          sizes="200px"
                          unoptimized
                        />
                      </div>
                    </div>
                    <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white/80 -translate-x-1/2" />
                  </div>
                  {item.caption && (
                    <p className="mt-3 text-center text-foreground font-medium">
                      {item.caption}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-white hover:text-white/80 transition-colors z-50"
            onClick={closeLightbox}
          >
            <X size={32} />
          </button>

          {/* Navigation */}
          {filteredItems.length > 1 && (
            <>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-white/80 transition-colors z-50 p-2"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrev();
                }}
              >
                <ChevronLeft size={40} />
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-white/80 transition-colors z-50 p-2"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
              >
                <ChevronRight size={40} />
              </button>
            </>
          )}

          {/* Slider */}
          <div
            className="w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <BeforeAfterSlider
              beforeImage={filteredItems[lightboxIndex].beforeImage}
              afterImage={filteredItems[lightboxIndex].afterImage}
              beforeLabel={filteredItems[lightboxIndex].beforeLabel}
              afterLabel={filteredItems[lightboxIndex].afterLabel}
              caption={filteredItems[lightboxIndex].caption}
            />

            {/* Counter */}
            <div className="mt-4 text-center text-white/70 text-sm">
              {lightboxIndex + 1} / {filteredItems.length}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
