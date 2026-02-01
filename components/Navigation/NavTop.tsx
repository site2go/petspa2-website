"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLayoutConfig } from "@/components/LayoutContext";

export interface NavTopProps {
  logo: { text: string; href: string };
  links: Array<{ label: string; href: string }>;
  cta?: { label: string; href: string };
}

export default function NavTop({ logo, links, cta }: NavTopProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const config = useLayoutConfig();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerVariant = config.headerVariant;

  const headerClasses = cn(
    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
    {
      // Default variant
      "bg-background/95 backdrop-blur-sm border-b border-border":
        headerVariant === "default" && scrolled,
      // Glass variant
      "bg-background/60 backdrop-blur-xl border-b border-white/10":
        headerVariant === "glass",
      // Transparent variant (not scrolled) or Default variant (not scrolled)
      "bg-transparent": (headerVariant === "default" && !scrolled) || (headerVariant === "transparent" && !scrolled),
      // Transparent variant (scrolled)
      "bg-background/80 backdrop-blur-sm": headerVariant === "transparent" && scrolled,
      // Minimal variant
      "bg-background border-b border-border": headerVariant === "minimal",
    }
  );

  return (
    <header className={headerClasses}>
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href={logo.href}
          className="font-bold text-xl text-foreground hover:text-primary transition-colors"
        >
          {logo.text}
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium text-foreground/80 hover:text-foreground transition-colors",
                config.linkInteraction
              )}
            >
              {link.label}
            </Link>
          ))}
          {cta && (
            <Link
              href={cta.href}
              className={cn(
                "px-4 py-2 bg-primary text-primary-foreground font-medium text-sm transition-all",
                config.buttonInteraction,
                {
                  "rounded-md": config.buttonStyle === "default",
                  "rounded-full": config.buttonStyle === "rounded" || config.buttonStyle === "pill",
                  "rounded-none": config.buttonStyle === "sharp" || config.buttonStyle === "brutal",
                }
              )}
            >
              {cta.label}
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden fixed inset-x-0 top-16 bg-background/95 backdrop-blur-sm border-b border-border transition-all duration-300",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-foreground/80 hover:text-foreground transition-colors py-2"
            >
              {link.label}
            </Link>
          ))}
          {cta && (
            <Link
              href={cta.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "px-4 py-2 bg-primary text-primary-foreground font-medium text-center transition-all",
                {
                  "rounded-md": config.buttonStyle === "default",
                  "rounded-full": config.buttonStyle === "rounded" || config.buttonStyle === "pill",
                  "rounded-none": config.buttonStyle === "sharp" || config.buttonStyle === "brutal",
                }
              )}
            >
              {cta.label}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
