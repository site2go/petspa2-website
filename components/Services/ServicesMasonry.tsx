"use client";

import { useLayoutConfig } from "@/components/LayoutContext";
import { useScrollAnimation, useStaggeredAnimation } from "@/components/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

interface ServiceItem {
  title: string;
  description: string;
  icon: React.ElementType;
  image?: string;
}

interface ServicesMasonryProps {
  title: string;
  subtitle?: string;
  services: ServiceItem[];
}

/**
 * ServicesMasonry - Pinterest-style masonry layout for services
 * Variable height cards in CSS columns
 * Used by: Masonry layout
 */
export default function ServicesMasonry({
  title,
  subtitle,
  services,
}: ServicesMasonryProps) {
  const config = useLayoutConfig();
  const { ref: headerRef, isInView: headerInView } = useScrollAnimation();
  const { containerRef, getItemProps } = useStaggeredAnimation(services.length);

  // Vary the content height for visual interest
  const getContentVariant = (index: number) => {
    const variants = ["short", "tall", "medium", "short", "medium", "tall"];
    return variants[index % variants.length];
  };

  return (
    <section id="services" className="py-16 md:py-24 bg-background">
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

        {/* Masonry Grid */}
        <div ref={containerRef} className="masonry-container">
          {services.map((service, index) => {
            const { isInView, style } = getItemProps(index);
            const Icon = service.icon;
            const variant = getContentVariant(index);

            return (
              <div
                key={service.title}
                style={style}
                className={cn(
                  "masonry-item p-6 card-layout-interactive layout-entry",
                  isInView && "in-view"
                )}
              >
                {/* Service Image (if available) */}
                {service.image && (
                  <div className="aspect-video mb-4 rounded-lg overflow-hidden bg-muted">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Icon */}
                <div
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
                    "bg-primary/10 text-primary"
                  )}
                >
                  <Icon size={24} />
                </div>

                {/* Title */}
                <h3 className="font-heading font-semibold text-xl text-foreground mb-3">
                  {service.title}
                </h3>

                {/* Description - varied length for masonry effect */}
                <p
                  className={cn(
                    "text-muted-foreground",
                    variant === "tall" && "line-clamp-none",
                    variant === "medium" && "line-clamp-4",
                    variant === "short" && "line-clamp-2"
                  )}
                >
                  {service.description}
                  {/* Add extra content for tall variants */}
                  {variant === "tall" && (
                    <span className="block mt-4 text-sm opacity-70">
                      Discover more details about this service and the benefits we offer to our customers.
                    </span>
                  )}
                </p>

                {/* CTA Link */}
                <div className="mt-4 pt-4 border-t border-border">
                  <a
                    href="#contact"
                    className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1"
                  >
                    Learn more
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
