"use client";

import Image from "next/image";
import { useLayoutConfig } from "@/components/LayoutContext";
import { useScrollAnimation, useStaggeredAnimation } from "@/components/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

interface ServiceItem {
  title: string;
  description: string;
  icon: React.ElementType;
  image?: string;
}

interface ServicesHorizontalProps {
  title: string;
  subtitle?: string;
  services: ServiceItem[];
}

/**
 * ServicesHorizontal - Horizontal image cards
 * Editorial, visual-heavy magazine-style layout
 * Used by: Magazine layout
 */
export default function ServicesHorizontal({
  title,
  subtitle,
  services,
}: ServicesHorizontalProps) {
  const config = useLayoutConfig();
  const { ref: headerRef, isInView: headerInView } = useScrollAnimation();
  const { containerRef, getItemProps } = useStaggeredAnimation(services.length);

  return (
    <section id="services" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={cn(
            "mb-16 layout-entry",
            headerInView && "in-view"
          )}
        >
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-muted-foreground text-lg max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>

        {/* Horizontal Cards */}
        <div ref={containerRef} className="space-y-6">
          {services.map((service, index) => {
            const { isInView, style } = getItemProps(index);
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                style={style}
                className={cn(
                  "grid grid-cols-1 md:grid-cols-3 gap-0 bg-card rounded-xl overflow-hidden layout-entry",
                  "border border-border hover:border-primary/30 transition-colors",
                  "group",
                  isInView && "in-view"
                )}
              >
                {/* Image */}
                <div className="relative h-[200px] md:h-full md:min-h-[250px] overflow-hidden">
                  {service.image ? (
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      unoptimized
                    />
                  ) : (
                    <div className="absolute inset-0 bg-muted flex items-center justify-center">
                      <Icon size={60} className="text-muted-foreground/30" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="md:col-span-2 p-6 md:p-8 lg:p-10 flex flex-col justify-center">
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={cn(
                        "w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0",
                        "bg-primary/10 text-primary"
                      )}
                    >
                      <Icon size={24} />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-xl md:text-2xl text-foreground mb-2">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
