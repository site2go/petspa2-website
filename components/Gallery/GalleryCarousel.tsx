"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useLayoutConfig } from "@/components/LayoutContext";
import { useScrollAnimation } from "@/components/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryItem {
  src: string;
  alt: string;
  caption?: string;
  category?: string;
}

interface GalleryCarouselProps {
  title: string;
  subtitle?: string;
  items: GalleryItem[];
  categories?: string[];
}

/**
 * GalleryCarousel - Horizontal scrolling gallery
 * Smooth horizontal scroll with snap points
 * Used by: Horizontal, Fullscreen layouts
 */
export default function GalleryCarousel({
  title,
  subtitle,
  items,
  categories,
}: GalleryCarouselProps) {
  const config = useLayoutConfig();
  const { ref: headerRef, isInView: headerInView } = useScrollAnimation();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Filter items by category
  const filteredItems = activeCategory
    ? items.filter((item) => item.category === activeCategory)
    : items;

  // Get unique categories from items if not provided
  const displayCategories = categories ||
    (Array.from(new Set(items.map((item) => item.category).filter(Boolean))) as string[]);

  // Check scroll position
  const checkScrollPosition = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    );
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener("scroll", checkScrollPosition);
    checkScrollPosition();

    return () => container.removeEventListener("scroll", checkScrollPosition);
  }, [filteredItems]);

  // Scroll handlers
  const scrollBy = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.8;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section id="gallery" className="py-20 md:py-28 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={cn(
            "flex flex-col md:flex-row md:items-end md:justify-between mb-10 layout-entry",
            headerInView && "in-view"
          )}
        >
          <div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-2">
              {title}
            </h2>
            {subtitle && (
              <p className="text-muted-foreground text-lg">
                {subtitle}
              </p>
            )}
          </div>

          {/* Navigation Arrows - Desktop */}
          <div className="hidden md:flex items-center gap-2 mt-4 md:mt-0">
            <button
              onClick={() => scrollBy("left")}
              disabled={!canScrollLeft}
              className={cn(
                "w-12 h-12 rounded-full border border-border flex items-center justify-center transition-colors",
                canScrollLeft
                  ? "hover:bg-muted text-foreground"
                  : "text-muted-foreground opacity-50 cursor-not-allowed"
              )}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => scrollBy("right")}
              disabled={!canScrollRight}
              className={cn(
                "w-12 h-12 rounded-full border border-border flex items-center justify-center transition-colors",
                canScrollRight
                  ? "hover:bg-muted text-foreground"
                  : "text-muted-foreground opacity-50 cursor-not-allowed"
              )}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Category Filters */}
        {displayCategories.length > 1 && (
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setActiveCategory(null)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
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
                  "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors capitalize",
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
      </div>

      {/* Horizontal Scroll Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 md:px-[calc((100vw-1280px)/2+1rem)]"
        style={{ scrollPaddingLeft: "1rem" }}
      >
        {filteredItems.map((item, index) => (
          <div
            key={`${item.src}-${index}`}
            className="flex-shrink-0 snap-start"
          >
            <div
              className={cn(
                "group relative w-[280px] md:w-[400px] aspect-[3/4] rounded-xl overflow-hidden cursor-pointer",
                config.cardStyle === "glass" && "glass-card",
                config.cardStyle === "bordered" && "border-2 border-border"
              )}
              onClick={() => setLightboxImage(item)}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className={cn(
                  "object-cover transition-transform duration-500",
                  "group-hover:scale-105",
                  config.imageInteraction
                )}
                sizes="(max-width: 768px) 280px, 400px"
              />

              {/* Caption Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end">
                <div className="p-5 w-full">
                  {item.caption && (
                    <p className="text-white text-base font-medium mb-1">
                      {item.caption}
                    </p>
                  )}
                  {item.category && (
                    <span className="text-white/70 text-xs uppercase tracking-wider">
                      {item.category.replace(/-/g, " ")}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Navigation Hint */}
      <div className="md:hidden flex justify-center mt-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <ChevronLeft size={16} />
          <span>Swipe to explore</span>
          <ChevronRight size={16} />
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
              <div className="mt-4 text-center">
                <p className="text-white text-lg">
                  {lightboxImage.caption}
                </p>
                {lightboxImage.category && (
                  <span className="text-white/60 text-sm uppercase tracking-wider mt-1 block">
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
