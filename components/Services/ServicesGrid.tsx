"use client";

import { useLayoutConfig } from "@/components/LayoutContext";
import { useScrollAnimation, useStaggeredAnimation } from "@/components/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import * as LucideIcons from "lucide-react";

// Icon name mapping - allows passing icon names as strings from Server Components
const iconMap: Record<string, React.ElementType> = {
  Scissors: LucideIcons.Scissors,
  Droplets: LucideIcons.Droplets,
  Sparkles: LucideIcons.Sparkles,
  Heart: LucideIcons.Heart,
  Star: LucideIcons.Star,
  Cat: LucideIcons.Cat,
  Dog: LucideIcons.Dog,
  Bath: LucideIcons.Bath,
  Brush: LucideIcons.Brush,
  Clock: LucideIcons.Clock,
  Award: LucideIcons.Award,
  Shield: LucideIcons.Shield,
  Smile: LucideIcons.Smile,
  Check: LucideIcons.Check,
  Stethoscope: LucideIcons.Stethoscope,
  Bone: LucideIcons.Bone,
  PawPrint: LucideIcons.PawPrint,
};

interface ServiceItem {
  title: string;
  description: string;
  iconName?: string;
  icon?: React.ElementType;
}

interface ServicesGridProps {
  title: string;
  subtitle?: string;
  services: ServiceItem[];
}

/**
 * ServicesGrid - Standard card grid layout
 * Clean, organized display of services
 * Used by: Minimal, Classic, Glass layouts
 */
export default function ServicesGrid({
  title,
  subtitle,
  services,
}: ServicesGridProps) {
  const config = useLayoutConfig();
  const { ref: headerRef, isInView: headerInView } = useScrollAnimation();
  const { containerRef, getItemProps } = useStaggeredAnimation(services.length);

  return (
    <section id="services" className="py-20 md:py-28 bg-muted">
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

        {/* Services Grid */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {services.map((service, index) => {
            const { isInView, style } = getItemProps(index);
            // Support both iconName (string) and icon (component) for flexibility
            const Icon = service.iconName
              ? iconMap[service.iconName] || LucideIcons.Star
              : service.icon || LucideIcons.Star;

            return (
              <div
                key={service.title}
                style={style}
                className={cn(
                  "bg-card rounded-xl p-6 md:p-8 card-layout-interactive shadow-soft layout-entry",
                  config.cardStyle === "glass" && "glass-card",
                  config.cardStyle === "bordered" && "border-2 border-border",
                  isInView && "in-view"
                )}
              >
                <div
                  className={cn(
                    "w-14 h-14 rounded-xl flex items-center justify-center mb-5",
                    "bg-primary/10 text-primary"
                  )}
                >
                  <Icon size={28} />
                </div>
                <h3 className="font-heading font-semibold text-xl text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
