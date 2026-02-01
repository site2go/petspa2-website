"use client";

import { useLayoutConfig } from "@/components/LayoutContext";
import { useScrollAnimation, useStaggeredAnimation } from "@/components/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

interface ServiceItem {
  title: string;
  description: string;
  icon: React.ElementType;
}

interface ServicesCardsProps {
  title: string;
  subtitle?: string;
  services: ServiceItem[];
}

/**
 * ServicesCards - Stacking cards layout for services
 * Cards that appear to stack on scroll
 * Used by: BottomNav layout
 */
export default function ServicesCards({
  title,
  subtitle,
  services,
}: ServicesCardsProps) {
  const config = useLayoutConfig();
  const { ref: headerRef, isInView: headerInView } = useScrollAnimation();
  const { containerRef, getItemProps } = useStaggeredAnimation(services.length);

  return (
    <section id="services" className="py-16 md:py-24 bg-muted">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={cn(
            "text-center mb-10 layout-entry",
            headerInView && "in-view"
          )}
        >
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-3">
            {title}
          </h2>
          {subtitle && (
            <p className="text-muted-foreground text-base max-w-xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Stacking Cards */}
        <div ref={containerRef} className="stacking-cards max-w-2xl mx-auto">
          {services.map((service, index) => {
            const { isInView, style } = getItemProps(index);
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                style={{
                  ...style,
                  // Add slight rotation for stacking effect
                  transform: isInView
                    ? `rotate(${(index % 3 - 1) * 0.5}deg)`
                    : `translateY(20px) scale(0.95)`,
                }}
                className={cn(
                  "stacking-card bg-card flex items-start gap-4",
                  "card-layout-interactive layout-entry",
                  isInView && "in-view"
                )}
              >
                {/* Icon */}
                <div
                  className={cn(
                    "w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center",
                    "bg-primary/10 text-primary"
                  )}
                >
                  <Icon size={26} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-1">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {service.description}
                  </p>
                </div>

                {/* Arrow indicator */}
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-muted-foreground"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
