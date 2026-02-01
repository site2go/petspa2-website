"use client";

import { cn } from "@/lib/utils";

interface SkipLinkProps {
  /**
   * The ID of the element to skip to (without #)
   * @default "main"
   */
  href?: string;
  /**
   * The text displayed in the skip link
   * @default "Skip to main content"
   */
  children?: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Skip Link Component
 *
 * Provides a way for keyboard users to skip repetitive navigation
 * and jump directly to the main content. Required for WCAG 2.4.1.
 *
 * @example
 * // In layout.tsx
 * <body>
 *   <SkipLink />
 *   <Header />
 *   <main id="main">
 *     {children}
 *   </main>
 * </body>
 *
 * @example
 * // With custom target
 * <SkipLink href="content">Skip to content</SkipLink>
 * <main id="content">...</main>
 */
export function SkipLink({
  href = "main",
  children = "Skip to main content",
  className,
}: SkipLinkProps) {
  return (
    <a
      href={`#${href}`}
      className={cn(
        // Hidden by default
        "sr-only",
        // Visible on focus
        "focus:not-sr-only",
        "focus:absolute",
        "focus:top-4",
        "focus:left-4",
        "focus:z-[100]",
        // Styling
        "focus:px-4",
        "focus:py-2",
        "focus:bg-background",
        "focus:text-foreground",
        "focus:border",
        "focus:border-border",
        "focus:rounded-md",
        "focus:shadow-lg",
        // Focus ring
        "focus:outline-none",
        "focus:ring-2",
        "focus:ring-ring",
        "focus:ring-offset-2",
        // Font
        "focus:font-medium",
        // Transition
        "transition-all",
        className
      )}
    >
      {children}
    </a>
  );
}

/**
 * Multiple Skip Links Component
 *
 * For pages with multiple landmark regions.
 *
 * @example
 * <SkipLinks
 *   links={[
 *     { href: "main", label: "Skip to main content" },
 *     { href: "navigation", label: "Skip to navigation" },
 *     { href: "footer", label: "Skip to footer" },
 *   ]}
 * />
 */
interface SkipLinksProps {
  links: Array<{
    href: string;
    label: string;
  }>;
  className?: string;
}

export function SkipLinks({ links, className }: SkipLinksProps) {
  return (
    <div
      className={cn(
        "sr-only focus-within:not-sr-only",
        "focus-within:absolute",
        "focus-within:top-4",
        "focus-within:left-4",
        "focus-within:z-[100]",
        "focus-within:flex",
        "focus-within:flex-col",
        "focus-within:gap-2",
        "focus-within:bg-background",
        "focus-within:p-4",
        "focus-within:border",
        "focus-within:border-border",
        "focus-within:rounded-md",
        "focus-within:shadow-lg",
        className
      )}
    >
      <span className="font-medium text-sm text-muted-foreground">
        Skip to:
      </span>
      {links.map((link) => (
        <a
          key={link.href}
          href={`#${link.href}`}
          className={cn(
            "px-3 py-1.5",
            "text-sm font-medium",
            "bg-muted hover:bg-muted/80",
            "rounded",
            "outline-none",
            "focus:ring-2 focus:ring-ring focus:ring-offset-2",
            "transition-colors"
          )}
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}

export default SkipLink;
