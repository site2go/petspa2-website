"use client";

import { useLayoutConfig } from "@/components/LayoutContext";
import { cn } from "@/lib/utils";

interface ServiceItem {
  title: string;
  description: string;
  icon: React.ElementType;
  image?: string;
}

interface ServicesFullscreenProps {
  title: string;
  subtitle?: string;
  services: ServiceItem[];
}

/**
 * ServicesFullscreen - One service per screen for snap-scroll layouts
 * Each service takes up 100vh
 * Used by: Fullscreen layout
 */
export default function ServicesFullscreen({
  title,
  subtitle,
  services,
}: ServicesFullscreenProps) {
  const config = useLayoutConfig();

  return (
    <>
      {/* Section Title Screen */}
      <section
        id="services"
        className={cn(
          "snap-section h-screen flex items-center justify-center",
          "bg-muted"
        )}
      >
        <div className="text-center px-4">
          <h2
            className={cn(
              "font-heading font-bold text-4xl md:text-6xl lg:text-7xl text-foreground mb-6",
              config.showGradientText && "gradient-text"
            )}
          >
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      </section>

      {/* Individual Service Screens */}
      {services.map((service, index) => {
        const Icon = service.icon;
        const isEven = index % 2 === 0;

        return (
          <section
            key={service.title}
            className={cn(
              "snap-section h-screen flex items-center relative overflow-hidden",
              isEven ? "bg-background" : "bg-muted"
            )}
          >
            {/* Background Number */}
            <div
              className={cn(
                "absolute font-black text-[300px] leading-none select-none pointer-events-none",
                isEven
                  ? "right-8 bottom-0 text-muted/20"
                  : "left-8 bottom-0 text-background/20"
              )}
            >
              {String(index + 1).padStart(2, "0")}
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 relative z-10">
              <div
                className={cn(
                  "flex flex-col md:flex-row items-center gap-12 md:gap-20",
                  !isEven && "md:flex-row-reverse"
                )}
              >
                {/* Icon/Visual Side */}
                <div className="flex-1 flex justify-center">
                  <div
                    className={cn(
                      "w-40 h-40 md:w-56 md:h-56 rounded-3xl flex items-center justify-center",
                      "bg-primary/10 text-primary",
                      "layout-entry animate-fade-in"
                    )}
                  >
                    <Icon size={80} strokeWidth={1.5} />
                  </div>
                </div>

                {/* Text Side */}
                <div className="flex-1 max-w-xl">
                  <div
                    className={cn(
                      "text-sm font-medium text-primary tracking-widest uppercase mb-4",
                      "layout-entry animate-fade-in"
                    )}
                  >
                    Service {String(index + 1).padStart(2, "0")}
                  </div>
                  <h3
                    className={cn(
                      "font-heading font-bold text-3xl md:text-5xl text-foreground mb-6",
                      "layout-entry animate-fade-in animation-delay-100"
                    )}
                  >
                    {service.title}
                  </h3>
                  <p
                    className={cn(
                      "text-lg md:text-xl text-muted-foreground leading-relaxed",
                      "layout-entry animate-fade-in animation-delay-200"
                    )}
                  >
                    {service.description}
                  </p>
                  <div
                    className={cn(
                      "mt-8",
                      "layout-entry animate-fade-in animation-delay-300"
                    )}
                  >
                    <a
                      href="#contact"
                      className={cn(
                        "inline-flex items-center gap-2 px-8 py-4 rounded-full",
                        "bg-primary text-primary-foreground font-semibold",
                        "hover:scale-105 transition-transform duration-300"
                      )}
                    >
                      Book Now
                      <svg
                        width="20"
                        height="20"
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
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
