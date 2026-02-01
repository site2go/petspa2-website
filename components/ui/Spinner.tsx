"use client";

import { cn } from "@/lib/utils";

interface SpinnerProps {
  /** Size of the spinner */
  size?: "sm" | "md" | "lg";
  /** Color variant */
  variant?: "default" | "primary" | "white";
  /** Optional className */
  className?: string;
  /** Screen reader label */
  label?: string;
}

const sizeClasses = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-8 w-8 border-3",
};

const variantClasses = {
  default: "border-muted-foreground/30 border-t-muted-foreground",
  primary: "border-primary/30 border-t-primary",
  white: "border-white/30 border-t-white",
};

/**
 * Loading Spinner Component
 *
 * Accessible loading indicator with multiple sizes and variants.
 *
 * @example
 * ```tsx
 * <Spinner size="md" variant="primary" />
 * <Button disabled><Spinner size="sm" variant="white" /> Loading...</Button>
 * ```
 */
export function Spinner({
  size = "md",
  variant = "default",
  className,
  label = "Loading",
}: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label={label}
      className={cn(
        "animate-spin rounded-full",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      <span className="sr-only">{label}</span>
    </div>
  );
}

export default Spinner;
