"use client";

import { useLayoutConfig } from "@/components/LayoutContext";
import { useScrollAnimation, useStaggeredAnimation } from "@/components/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

interface ServiceItem {
  title: string;
  description: string;
  icon: React.ElementType;
}

interface ServicesTimelineProps {
  title: string;
  subtitle?: string;
  services: ServiceItem[];
  chapterNumber?: string;
}

/**
 * ServicesTimeline - Chapter/story format timeline for services
 * Vertical timeline with alternating sides
 * Used by: Storytelling layout
 */
export default function ServicesTimeline({
  title,
  subtitle,
  services,
  chapterNumber = "02",
}: ServicesTimelineProps) {
  const config = useLayoutConfig();
  const { ref: headerRef, isInView: headerInView } = useScrollAnimation();
  const { containerRef, getItemProps } = useStaggeredAnimation(services.length);

  return (
    <section
      id="services"
      className="chapter-section py-24 md:py-32 bg-muted relative"
    >
      {/* Chapter Number Watermark */}
      <div className="chapter-number">
        {chapterNumber}
      </div>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={cn(
            "max-w-2xl mb-16 layout-entry",
            headerInView && "in-view"
          )}
        >
          {/* Chapter Indicator */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-medium text-primary tracking-widest uppercase">
              Chapter {chapterNumber}
            </span>
            <div className="h-px flex-1 max-w-20 bg-primary/50" />
          </div>

          <h2 className="chapter-title text-foreground mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>

        {/* Timeline */}
        <div ref={containerRef} className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border" />

          {/* Timeline Items */}
          <div className="space-y-16">
            {services.map((service, index) => {
              const { isInView, style } = getItemProps(index);
              const Icon = service.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={service.title}
                  style={style}
                  className={cn(
                    "relative pl-12 md:pl-0 layout-entry",
                    isInView && "in-view"
                  )}
                >
                  {/* Timeline Dot */}
                  <div
                    className={cn(
                      "absolute left-2 md:left-1/2 w-5 h-5 rounded-full bg-primary",
                      "md:-translate-x-1/2 ring-4 ring-background z-10"
                    )}
                  />

                  {/* Content Card */}
                  <div
                    className={cn(
                      "md:w-[calc(50%-3rem)] card-layout-interactive",
                      "bg-card rounded-xl p-6 md:p-8",
                      isEven ? "md:mr-auto" : "md:ml-auto"
                    )}
                  >
                    {/* Step Number */}
                    <div className="text-sm font-medium text-primary mb-4">
                      Step {String(index + 1).padStart(2, "0")}
                    </div>

                    {/* Icon */}
                    <div
                      className={cn(
                        "w-14 h-14 rounded-xl flex items-center justify-center mb-4",
                        "bg-primary/10 text-primary"
                      )}
                    >
                      <Icon size={28} />
                    </div>

                    {/* Title */}
                    <h3 className="font-heading font-semibold text-xl text-foreground mb-3">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Timeline End */}
          <div className="absolute left-4 md:left-1/2 bottom-0 w-px h-16 bg-gradient-to-b from-border to-transparent" />
        </div>
      </div>
    </section>
  );
}
