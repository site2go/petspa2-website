"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLayoutConfig } from "@/components/LayoutContext";

export interface NavOverlayProps {
  logo: { text: string; href: string };
  links: Array<{ label: string; href: string }>;
}

export default function NavOverlay({ logo, links }: NavOverlayProps) {
  const [isOpen, setIsOpen] = useState(false);
  const config = useLayoutConfig();

  // Prevent body scroll when overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <>
      {/* Hamburger Button - Fixed Position */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed top-4 right-4 z-50 p-3 rounded-full transition-all",
          "bg-background/80 backdrop-blur-sm border border-border",
          "hover:bg-muted text-foreground",
          config.buttonInteraction,
          isOpen && "opacity-0 pointer-events-none"
        )}
        aria-label="Open menu"
      >
        <Menu size={24} />
      </button>

      {/* Logo - Fixed Position (optional, shown when menu closed) */}
      <Link
        href={logo.href}
        className={cn(
          "fixed top-4 left-4 z-40 font-bold text-xl text-foreground hover:text-primary transition-all",
          isOpen && "opacity-0 pointer-events-none"
        )}
      >
        {logo.text}
      </Link>

      {/* Full-screen Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-50 flex items-center justify-center transition-all duration-500",
          "bg-background/95 backdrop-blur-xl",
          isOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        )}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className={cn(
            "absolute top-4 right-4 p-3 rounded-full transition-all",
            "hover:bg-muted text-foreground",
            config.buttonInteraction
          )}
          aria-label="Close menu"
        >
          <X size={24} />
        </button>

        {/* Logo in Overlay */}
        <Link
          href={logo.href}
          onClick={() => setIsOpen(false)}
          className="absolute top-4 left-4 font-bold text-xl text-foreground hover:text-primary transition-colors"
        >
          {logo.text}
        </Link>

        {/* Navigation Links - Centered, Large */}
        <nav className="flex flex-col items-center gap-6">
          {links.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "text-3xl md:text-5xl font-bold text-foreground/80 hover:text-foreground transition-all",
                "transform hover:scale-105",
                config.linkInteraction
              )}
              style={{
                transitionDelay: isOpen ? `${index * 75}ms` : "0ms",
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? "translateY(0)" : "translateY(20px)",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
