"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLayoutConfig } from "@/components/LayoutContext";
import { cn } from "@/lib/utils";
import { Phone, X, Calendar, MessageCircle } from "lucide-react";

interface CtaButton {
  label: string;
  href: string;
  icon?: React.ElementType;
}

interface StickyCtaBarProps {
  primaryCta: CtaButton;
  secondaryCta?: CtaButton;
  phone?: string;
  showOnScroll?: boolean;
  scrollThreshold?: number;
  position?: "bottom" | "top";
  dismissible?: boolean;
}

/**
 * StickyCtaBar - Persistent call-to-action bar
 * Fixed position, appears after scrolling past hero
 * High-value for: all service businesses (60%+ competitor usage)
 */
export default function StickyCtaBar({
  primaryCta,
  secondaryCta,
  phone,
  showOnScroll = true,
  scrollThreshold = 400,
  position = "bottom",
  dismissible = false,
}: StickyCtaBarProps) {
  const config = useLayoutConfig();
  const [isVisible, setIsVisible] = useState(!showOnScroll);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (!showOnScroll) return;

    const handleScroll = () => {
      const scrolled = window.scrollY > scrollThreshold;
      setIsVisible(scrolled);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, [showOnScroll, scrollThreshold]);

  if (isDismissed) return null;

  const PrimaryIcon = primaryCta.icon || Calendar;
  const SecondaryIcon = secondaryCta?.icon || MessageCircle;

  return (
    <div
      className={cn(
        "fixed left-0 right-0 z-40 transition-transform duration-300",
        position === "bottom" ? "bottom-0" : "top-0",
        isVisible
          ? "translate-y-0"
          : position === "bottom"
          ? "translate-y-full"
          : "-translate-y-full"
      )}
    >
      {/* Desktop Bar */}
      <div
        className={cn(
          "hidden md:block",
          "bg-background/95 backdrop-blur-md border-t border-border",
          position === "top" && "border-t-0 border-b",
          config.cardStyle === "glass" && "bg-background/80"
        )}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Phone */}
            {phone && (
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className={cn(
                  "flex items-center gap-2 text-foreground hover:text-primary transition-colors",
                  config.linkInteraction
                )}
              >
                <Phone size={18} />
                <span className="font-medium">{phone}</span>
              </a>
            )}

            {/* Right: CTAs */}
            <div className="flex items-center gap-3 ml-auto">
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className={cn(
                    "flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-colors",
                    "bg-muted text-foreground hover:bg-muted/80",
                    config.buttonInteraction
                  )}
                >
                  <SecondaryIcon size={18} />
                  <span>{secondaryCta.label}</span>
                </Link>
              )}
              <Link
                href={primaryCta.href}
                className={cn(
                  "flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold transition-all",
                  "bg-primary text-primary-foreground hover:bg-primary/90",
                  "shadow-lg shadow-primary/20",
                  config.buttonInteraction
                )}
              >
                <PrimaryIcon size={18} />
                <span>{primaryCta.label}</span>
              </Link>

              {dismissible && (
                <button
                  onClick={() => setIsDismissed(true)}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Dismiss"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bar */}
      <div
        className={cn(
          "md:hidden",
          "bg-background/95 backdrop-blur-md border-t border-border",
          position === "top" && "border-t-0 border-b",
          config.cardStyle === "glass" && "bg-background/80"
        )}
      >
        <div className="flex items-stretch">
          {/* Phone Button */}
          {phone && (
            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-4",
                "bg-muted text-foreground",
                "border-r border-border"
              )}
            >
              <Phone size={20} />
              <span className="font-medium text-sm">Call</span>
            </a>
          )}

          {/* Secondary CTA */}
          {secondaryCta && (
            <Link
              href={secondaryCta.href}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-4",
                "bg-muted text-foreground",
                phone ? "" : "border-r border-border"
              )}
            >
              <SecondaryIcon size={20} />
              <span className="font-medium text-sm">{secondaryCta.label}</span>
            </Link>
          )}

          {/* Primary CTA */}
          <Link
            href={primaryCta.href}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-4",
              "bg-primary text-primary-foreground font-semibold"
            )}
          >
            <PrimaryIcon size={20} />
            <span className="text-sm">{primaryCta.label}</span>
          </Link>

          {/* Dismiss Button (Mobile) */}
          {dismissible && (
            <button
              onClick={() => setIsDismissed(true)}
              className="px-3 bg-muted text-muted-foreground"
              aria-label="Dismiss"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
