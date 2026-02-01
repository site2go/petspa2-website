"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useLayoutConfig, useLayoutProfile } from "@/components/LayoutContext";

export interface NavSidebarProps {
  logo: { text: string; href: string };
  links: Array<{ label: string; href: string }>;
  variant?: "default" | "brutal";
}

export default function NavSidebar({ logo, links, variant = "default" }: NavSidebarProps) {
  const config = useLayoutConfig();
  const layout = useLayoutProfile();

  // Determine variant from layout if not explicitly set
  const actualVariant = layout === "brutalist" ? "brutal" : variant;

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen w-64 lg:w-72 flex flex-col z-50",
        "border-r bg-background",
        {
          // Default variant - clean, tech-style
          "border-border": actualVariant === "default",
          // Brutal variant - thick borders, no radius
          "border-foreground border-r-4": actualVariant === "brutal",
        }
      )}
    >
      {/* Logo */}
      <div
        className={cn(
          "p-6",
          {
            "border-b border-border": actualVariant === "default",
            "border-b-4 border-foreground": actualVariant === "brutal",
          }
        )}
      >
        <Link
          href={logo.href}
          className={cn(
            "font-bold text-xl text-foreground hover:text-primary transition-colors",
            {
              "uppercase tracking-widest": actualVariant === "brutal",
            }
          )}
        >
          {logo.text}
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto p-6">
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "block py-3 px-4 text-foreground/80 hover:text-foreground transition-all",
                  config.linkInteraction,
                  {
                    // Default variant
                    "rounded-md hover:bg-muted": actualVariant === "default",
                    // Brutal variant
                    "border-2 border-transparent hover:border-foreground hover:bg-muted uppercase tracking-wide font-medium":
                      actualVariant === "brutal",
                  }
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer area */}
      <div
        className={cn(
          "p-6 text-sm text-muted-foreground",
          {
            "border-t border-border": actualVariant === "default",
            "border-t-4 border-foreground": actualVariant === "brutal",
          }
        )}
      >
        <p>&copy; {new Date().getFullYear()}</p>
      </div>
    </aside>
  );
}
