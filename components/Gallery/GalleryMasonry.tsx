"use client";

import { useState } from "react";
import Image from "next/image";
import { useLayoutConfig } from "@/components/LayoutContext";
import { useScrollAnimation, useStaggeredAnimation } from "@/components/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface GalleryItem {
  src: string;
  alt: string;
  caption?: string;
  category?: string;
}

interface GalleryMasonryProps {
  title: string;
  subtitle?: string;
  items: GalleryItem[];
  categories?: string[];
}

/**
 * GalleryMasonry - Pinterest-style masonry layout
 * Variable height items with CSS columns
 * Used by: Magazine, Masonry layouts
 */
export default function GalleryMasonry({
  title,
  subtitle,
  items,
  categories,
}: GalleryMasonryProps) {
  const config = useLayoutConfig();
  const { ref: headerRef, isInView: headerInView } = useScrollAnimation();
  const { containerRef, getItemProps } = useStaggeredAnimation(items.length);

  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null);

  // Filter items by category
  const filteredItems = activeCategory
    ? items.filter((item) => item.category === activeCategory)
    : items;

  // Get unique categories from items if not provided
  const displayCategories = categories ||
    (Array.from(new Set(items.map((item) => item.category).filter(Boolean))) as string[]);

  // Assign varying aspect ratios for masonry effect
  const getAspectRatio = (index: number) => {
    const ratios = ["aspect-square", "aspect-[3/4]", "aspect-[4/5]", "aspect-square", "aspect-[4/5]", "aspect-[3/4]"];
    return ratios[index % ratios.length];
  };

  return (
    <section id="gallery" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={cn(
            "text-center mb-12 layout-entry",
            headerInView && "in-view"
          )}
        >
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Category Filters - Sticky on scroll */}
        {displayCategories.length > 1 && (
          <div className="sticky top-20 z-10 bg-background/80 backdrop-blur-sm py-4 mb-8 -mx-4 px-4">
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setActiveCategory(null)}
                className={cn(
                  "px-5 py-2.5 text-sm font-medium transition-all",
                  activeCategory === null
                    ? "text-foreground border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                All
              </button>
              {displayCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "px-5 py-2.5 text-sm font-medium transition-all capitalize",
                    activeCategory === category
                      ? "text-foreground border-b-2 border-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {category.replace(/-/g, " ")}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Masonry Grid */}
        <div ref={containerRef} className="masonry-container">
          {filteredItems.map((item, index) => {
            const { isInView, style } = getItemProps(index);

            return (
              <div
                key={`${item.src}-${index}`}
                style={style}
                className={cn(
                  "masonry-item mb-4 cursor-pointer layout-entry",
                  isInView && "in-view"
                )}
                onClick={() => setLightboxImage(item)}
              >
                <div
                  className={cn(
                    "group relative overflow-hidden rounded-lg",
                    getAspectRatio(index)
                  )}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className={cn(
                      "object-cover transition-transform duration-700",
                      "group-hover:scale-105",
                      config.imageInteraction
                    )}
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />

                  {/* Editorial-style caption overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {item.caption && (
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <p className="text-white text-base font-medium leading-snug">
                          {item.caption}
                        </p>
                        {item.category && (
                          <span className="inline-block mt-2 text-white/70 text-xs uppercase tracking-wider">
                            {item.category.replace(/-/g, " ")}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors"
            onClick={() => setLightboxImage(null)}
          >
            <X size={28} strokeWidth={1.5} />
          </button>

          <div
            className="relative max-w-5xl max-h-[85vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightboxImage.src}
              alt={lightboxImage.alt}
              width={1400}
              height={900}
              className="w-full h-auto max-h-[80vh] object-contain"
            />
            {lightboxImage.caption && (
              <div className="mt-6 text-center">
                <p className="text-white text-lg font-light">
                  {lightboxImage.caption}
                </p>
                {lightboxImage.category && (
                  <span className="text-white/60 text-sm uppercase tracking-wider mt-2 block">
                    {lightboxImage.category.replace(/-/g, " ")}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
