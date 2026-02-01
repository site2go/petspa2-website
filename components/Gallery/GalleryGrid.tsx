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

interface GalleryGridProps {
  title: string;
  subtitle?: string;
  items: GalleryItem[];
  categories?: string[];
}

/**
 * GalleryGrid - Standard responsive grid gallery
 * 2 columns on mobile, 3 on tablet, 4 on desktop
 * Optional category filtering and lightbox
 * Used by: Minimal, Classic, Split, Bold, Glass, Bento, Sidebar, Bottomnav layouts
 */
export default function GalleryGrid({
  title,
  subtitle,
  items,
  categories,
}: GalleryGridProps) {
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
        <div
          ref={containerRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {filteredItems.map((item, index) => {
            const { isInView, style } = getItemProps(index);

            return (
              <div
                key={`${item.src}-${index}`}
                style={style}
                className={cn(
                  "group relative aspect-square rounded-xl overflow-hidden cursor-pointer layout-entry",
                  config.cardStyle === "glass" && "glass-card",
                  config.cardStyle === "bordered" && "border-2 border-border",
                  isInView && "in-view"
                )}
                onClick={() => setLightboxImage(item)}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className={cn(
                    "object-cover transition-transform duration-500",
                    "group-hover:scale-110",
                    config.imageInteraction
                  )}
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />

                {/* Hover Overlay with Caption */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-end">
                  {item.caption && (
                    <p className="p-4 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                      {item.caption}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-white/80 transition-colors"
            onClick={() => setLightboxImage(null)}
          >
            <X size={32} />
          </button>

          <div
            className="relative max-w-4xl max-h-[80vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightboxImage.src}
              alt={lightboxImage.alt}
              width={1200}
              height={800}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
            {lightboxImage.caption && (
              <p className="text-white text-center mt-4 text-lg">
                {lightboxImage.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
