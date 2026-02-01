"use client";

import { Star, Shield, Award, Users, Clock, CheckCircle, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLayoutConfig } from "@/components/LayoutContext";
import { useScrollAnimation, useStaggeredAnimation } from "@/components/hooks/useScrollAnimation";

export interface TrustBadge {
  /** Badge type for automatic icon selection */
  type?: "rating" | "guarantee" | "certification" | "customers" | "experience" | "verified";
  /** Custom icon (overrides type-based icon) */
  icon?: LucideIcon;
  /** Main label text */
  label: string;
  /** Optional value (e.g., "4.9", "15+", "5000+") */
  value?: string;
  /** Optional sublabel */
  sublabel?: string;
}

interface TrustBadgesProps {
  badges: TrustBadge[];
  /** Section title (optional) */
  title?: string;
  /** Enable auto-scroll marquee animation */
  marquee?: boolean;
  /** Display variant */
  variant?: "horizontal" | "grid" | "compact";
  className?: string;
}

// Icon mapping for badge types
const typeIcons: Record<string, LucideIcon> = {
  rating: Star,
  guarantee: Shield,
  certification: Award,
  customers: Users,
  experience: Clock,
  verified: CheckCircle,
};

/**
 * Trust Badges Component
 * Visual credibility signals for conversion optimization
 *
 * Features:
 * - Pre-built badge types with automatic icons
 * - Horizontal scroll on mobile
 * - Optional auto-scroll marquee animation
 * - Layout-aware spacing and styling
 */
export function TrustBadges({
  badges,
  title,
  marquee = false,
  variant = "horizontal",
  className,
}: TrustBadgesProps) {
  const config = useLayoutConfig();
  const { ref: sectionRef, isInView } = useScrollAnimation<HTMLElement>();
  const { containerRef, getItemProps } = useStaggeredAnimation<HTMLDivElement>(badges.length);

  const getIcon = (badge: TrustBadge): LucideIcon => {
    if (badge.icon) return badge.icon;
    if (badge.type && typeIcons[badge.type]) return typeIcons[badge.type];
    return CheckCircle;
  };

  const renderBadge = (badge: TrustBadge, index: number) => {
    const Icon = getIcon(badge);
    const { isInView: itemInView, style } = getItemProps(index);

    return (
      <div
        key={index}
        style={marquee ? undefined : style}
        className={cn(
          "trust-badge flex items-center gap-3 px-4 py-3",
          variant === "compact" ? "flex-shrink-0" : "card-layout-interactive",
          !marquee && "layout-entry",
          !marquee && itemInView && "in-view"
        )}
      >
        <div
          className={cn(
            "flex-shrink-0 p-2 rounded-lg",
            config.cardStyle === "glass"
              ? "bg-primary/10 backdrop-blur-sm"
              : "bg-primary/10"
          )}
        >
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div className="flex flex-col min-w-0">
          {badge.value && (
            <span
              className={cn(
                "text-xl font-bold leading-tight",
                config.showGradientText && "gradient-text"
              )}
            >
              {badge.value}
            </span>
          )}
          <span className="text-sm font-medium truncate">{badge.label}</span>
          {badge.sublabel && (
            <span className="text-xs text-muted-foreground truncate">
              {badge.sublabel}
            </span>
          )}
        </div>
      </div>
    );
  };

  const badgeContent = (
    <>
      {badges.map((badge, index) => renderBadge(badge, index))}
      {/* Duplicate for seamless marquee loop */}
      {marquee && badges.map((badge, index) => renderBadge(badge, index + badges.length))}
    </>
  );

  return (
    <section
      ref={sectionRef}
      className={cn(
        "py-8 md:py-12 overflow-hidden",
        className
      )}
      aria-label="Trust indicators"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <h3
            className={cn(
              "text-sm font-medium text-muted-foreground uppercase tracking-wider mb-6 text-center layout-entry",
              isInView && "in-view"
            )}
          >
            {title}
          </h3>
        )}

        {variant === "horizontal" && (
          <div
            ref={containerRef}
            className={cn(
              "flex items-center gap-4 md:gap-6",
              marquee
                ? "animate-marquee"
                : "overflow-x-auto scrollbar-hide justify-center flex-wrap"
            )}
          >
            {badgeContent}
          </div>
        )}

        {variant === "grid" && (
          <div
            ref={containerRef}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {badges.map((badge, index) => renderBadge(badge, index))}
          </div>
        )}

        {variant === "compact" && (
          <div
            ref={containerRef}
            className={cn(
              "flex items-center justify-center gap-6 md:gap-8 flex-wrap",
              marquee && "animate-marquee"
            )}
          >
            {badgeContent}
          </div>
        )}
      </div>
    </section>
  );
}

// Pre-built badge presets for common use cases
export const trustBadgePresets = {
  googleRating: (rating: string = "4.9", reviews: string = "200+"): TrustBadge => ({
    type: "rating",
    label: "Google Rating",
    value: rating,
    sublabel: `${reviews} reviews`,
  }),
  yearsInBusiness: (years: string): TrustBadge => ({
    type: "experience",
    label: "Years in Business",
    value: `${years}+`,
  }),
  customersServed: (count: string): TrustBadge => ({
    type: "customers",
    label: "Customers Served",
    value: `${count}+`,
  }),
  moneyBackGuarantee: (days: string = "30"): TrustBadge => ({
    type: "guarantee",
    label: `${days}-Day Guarantee`,
    value: "100%",
    sublabel: "Money Back",
  }),
  certified: (certification: string): TrustBadge => ({
    type: "certification",
    label: certification,
    sublabel: "Certified",
  }),
  verified: (label: string): TrustBadge => ({
    type: "verified",
    label: label,
    sublabel: "Verified",
  }),
};

export default TrustBadges;
