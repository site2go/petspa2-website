"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useLayoutConfig } from "@/components/LayoutContext";

export interface NavBottomProps {
  items: Array<{
    label: string;
    href: string;
    icon: React.ElementType;
  }>;
}

export default function NavBottom({ items }: NavBottomProps) {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const config = useLayoutConfig();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show on scroll up, hide on scroll down
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Limit to 5 items max
  const displayItems = items.slice(0, 5);

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-border transition-transform duration-300",
        visible ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="container mx-auto px-4">
        <ul className="flex items-center justify-around h-16">
          {displayItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = index === activeIndex;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "flex flex-col items-center gap-1 px-3 py-2 transition-all",
                    config.buttonInteraction,
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <div className="relative">
                    <Icon size={20} />
                    {isActive && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
                    )}
                  </div>
                  <span className="text-xs font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Safe area padding for mobile devices */}
      <div className="h-safe-area-inset-bottom bg-background" />
    </nav>
  );
}
