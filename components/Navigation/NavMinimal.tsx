"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLayoutConfig } from "@/components/LayoutContext";

export interface NavMinimalProps {
  logo: { text: string; href: string };
  links: Array<{ label: string; href: string }>;
}

export default function NavMinimal({ logo, links }: NavMinimalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const config = useLayoutConfig();

  return (
    <>
      {/* Floating Navigation Bar */}
      <nav
        className={cn(
          "fixed top-4 left-1/2 -translate-x-1/2 z-50",
          "flex items-center gap-6 px-6 py-3",
          "bg-background/80 backdrop-blur-md rounded-full",
          "border border-border shadow-sm"
        )}
      >
        {/* Logo */}
        <Link
          href={logo.href}
          className="font-bold text-foreground hover:text-primary transition-colors"
        >
          {logo.text}
        </Link>

        {/* Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "p-2 rounded-full transition-all",
            "hover:bg-muted text-foreground",
            config.buttonInteraction
          )}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Dropdown Menu */}
      <div
        className={cn(
          "fixed top-20 left-1/2 -translate-x-1/2 z-50",
          "bg-background/95 backdrop-blur-md rounded-2xl",
          "border border-border shadow-lg",
          "transition-all duration-300",
          isOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-4"
        )}
      >
        <div className="p-4 min-w-[200px]">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "block py-3 px-4 rounded-lg text-foreground/80 hover:text-foreground hover:bg-muted transition-all",
                config.linkInteraction
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
