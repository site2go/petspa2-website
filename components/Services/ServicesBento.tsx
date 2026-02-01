"use client";

import { useLayoutConfig } from "@/components/LayoutContext";
import { useScrollAnimation, useStaggeredAnimation } from "@/components/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

interface ServiceItem {
  title: string;
  description: string;
  icon: React.ElementType;
  featured?: boolean;
}

interface ServicesBentoProps {
  title: string;
  subtitle?: string;
  services: ServiceItem[];
}

/**
 * ServicesBento - Bento grid layout for services
 * Variable-sized cards in a grid pattern
 * Used by: Bento layout
 */
export default function ServicesBento({
  title,
  subtitle,
  services,
}: ServicesBentoProps) {
  const config = useLayoutConfig();
  const { ref: headerRef, isInView: headerInView } = useScrollAnimation();
  const { containerRef, getItemProps } = useStaggeredAnimation(services.length);

  // Assign bento sizes based on index and featured status
  const getBentoSize = (index: number, featured?: boolean) => {
    if (featured) return "bento-2x2";
    const pattern = ["bento-2x1", "bento-1x1", "bento-1x1", "bento-2x1", "bento-1x2", "bento-1x1"];
    return pattern[index % pattern.length];
  };

  return (
    <section id="services" className="py-20 md:py-28 bg-background">
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

        {/* Bento Grid */}
        <div ref={containerRef} className="bento-grid">
          {services.map((service, index) => {
            const { isInView, style } = getItemProps(index);
            const Icon = service.icon;
            const bentoSize = getBentoSize(index, service.featured);
            const isLarge = bentoSize.includes("2x2") || bentoSize.includes("1x2");

            return (
              <div
                key={service.title}
                style={style}
                className={cn(
                  "bento-item p-6 md:p-8 card-layout-interactive layout-entry",
                  bentoSize,
                  config.cardStyle === "glass" && "glass-card",
                  isInView && "in-view"
                )}
              >
                <div
                  className={cn(
                    "rounded-xl flex items-center justify-center mb-4",
                    isLarge ? "w-16 h-16" : "w-12 h-12",
                    "bg-primary/10 text-primary"
                  )}
                >
                  <Icon size={isLarge ? 32 : 24} />
                </div>
                <h3
                  className={cn(
                    "font-heading font-semibold text-foreground mb-2",
                    isLarge ? "text-2xl" : "text-lg"
                  )}
                >
                  {service.title}
                </h3>
                <p
                  className={cn(
                    "text-muted-foreground",
                    isLarge ? "text-base" : "text-sm"
                  )}
                >
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
