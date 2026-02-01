"use client";

import Image from "next/image";
import { useLayoutConfig } from "@/components/LayoutContext";
import { useScrollAnimation } from "@/components/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

interface ServiceItem {
  title: string;
  description: string;
  icon: React.ElementType;
  image?: string;
  features?: string[];
}

interface ServicesAlternatingProps {
  title: string;
  subtitle?: string;
  services: ServiceItem[];
}

/**
 * ServicesAlternating - Zigzag layout with image alternating left/right
 * Corporate, balanced design with detailed service info
 * Used by: Split layout
 */
export default function ServicesAlternating({
  title,
  subtitle,
  services,
}: ServicesAlternatingProps) {
  const config = useLayoutConfig();
  const { ref: headerRef, isInView: headerInView } = useScrollAnimation();

  return (
    <section id="services" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={cn(
            "text-center mb-20 layout-entry",
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

        {/* Alternating Services */}
        <div className="space-y-20 md:space-y-32">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isEven = index % 2 === 0;

            return (
              <ServiceRow
                key={service.title}
                service={service}
                Icon={Icon}
                imageOnLeft={!isEven}
                config={config}
                index={index}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

interface ServiceRowProps {
  service: {
    title: string;
    description: string;
    image?: string;
    features?: string[];
  };
  Icon: React.ElementType;
  imageOnLeft: boolean;
  config: ReturnType<typeof useLayoutConfig>;
  index: number;
}

function ServiceRow({ service, Icon, imageOnLeft, config, index }: ServiceRowProps) {
  const { ref, isInView } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={cn(
        "grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center layout-entry",
        isInView && "in-view"
      )}
    >
      {/* Image Side */}
      <div
        className={cn(
          "relative h-[300px] md:h-[400px] rounded-xl overflow-hidden",
          imageOnLeft ? "lg:order-1" : "lg:order-2",
          "border-2 border-border"
        )}
      >
        {service.image ? (
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 bg-muted flex items-center justify-center">
            <Icon size={80} className="text-muted-foreground/30" />
          </div>
        )}
      </div>

      {/* Content Side */}
      <div className={cn(imageOnLeft ? "lg:order-2" : "lg:order-1")}>
        <div
          className={cn(
            "w-16 h-16 rounded-xl flex items-center justify-center mb-6",
            "bg-primary/10 text-primary"
          )}
        >
          <Icon size={32} />
        </div>

        <h3 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-4">
          {service.title}
        </h3>

        <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
          {service.description}
        </p>

        {/* Feature List */}
        {service.features && service.features.length > 0 && (
          <ul className="space-y-3">
            {service.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <span className="text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
