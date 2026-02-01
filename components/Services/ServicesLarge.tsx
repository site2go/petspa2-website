"use client";

import { useLayoutConfig } from "@/components/LayoutContext";
import { useScrollAnimation, useStaggeredAnimation } from "@/components/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

interface ServiceItem {
  title: string;
  description: string;
  icon: React.ElementType;
}

interface ServicesLargeProps {
  title: string;
  subtitle?: string;
  services: ServiceItem[];
}

/**
 * ServicesLarge - Large cards with color blocking
 * Bold, energetic design with strong visual impact
 * Used by: Bold layout
 */
export default function ServicesLarge({
  title,
  subtitle,
  services,
}: ServicesLargeProps) {
  const config = useLayoutConfig();
  const { ref: headerRef, isInView: headerInView } = useScrollAnimation();
  const { containerRef, getItemProps } = useStaggeredAnimation(services.length);

  return (
    <section id="services" className="py-20 md:py-28 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={cn(
            "text-center mb-16 layout-entry",
            headerInView && "in-view"
          )}
        >
          {config.showDecorativeLines && (
            <div className="decorative-line-gradient mx-auto mb-4" />
          )}
          <h2 className="font-heading font-black text-4xl md:text-5xl mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-primary-foreground/80 text-xl max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Large Services Grid */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
        >
          {services.map((service, index) => {
            const { isInView, style } = getItemProps(index);
            const Icon = service.icon;
            const isAccent = index % 3 === 0;

            return (
              <div
                key={service.title}
                style={style}
                className={cn(
                  "p-8 md:p-10 rounded-2xl layout-entry transition-all duration-300",
                  isAccent
                    ? "bg-accent text-accent-foreground"
                    : "bg-background text-foreground",
                  "border-4 border-transparent hover:border-accent/50",
                  "hover:scale-[1.02] hover:shadow-2xl",
                  isInView && "in-view"
                )}
              >
                <div
                  className={cn(
                    "w-20 h-20 rounded-2xl flex items-center justify-center mb-6",
                    isAccent ? "bg-background/20" : "bg-primary/10"
                  )}
                >
                  <Icon
                    size={40}
                    className={isAccent ? "text-accent-foreground" : "text-primary"}
                  />
                </div>
                <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
                  {service.title}
                </h3>
                <p
                  className={cn(
                    "text-lg",
                    isAccent ? "text-accent-foreground/80" : "text-muted-foreground"
                  )}
                >
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Decorative Orbs */}
      {config.showDecorativeOrbs && (
        <>
          <div className="decorative-orb decorative-orb-accent absolute top-20 right-10 opacity-30" />
          <div className="decorative-orb decorative-orb-small absolute bottom-20 left-10 opacity-20" />
        </>
      )}
    </section>
  );
}
