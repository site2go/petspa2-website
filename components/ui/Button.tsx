"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { useLayoutConfig } from "@/components/LayoutContext";
import { Spinner } from "./Spinner";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button variant */
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive";
  /** Button size */
  size?: "sm" | "md" | "lg";
  /** Loading state */
  loading?: boolean;
  /** Full width button */
  fullWidth?: boolean;
  /** Icon to display on the left */
  leftIcon?: React.ReactNode;
  /** Icon to display on the right */
  rightIcon?: React.ReactNode;
}

const variantClasses = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
};

const sizeClasses = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2.5 text-base",
  lg: "px-6 py-3 text-lg",
};

/**
 * Button Component
 *
 * Enhanced button with loading state, icons, and layout-aware styling.
 *
 * @example
 * ```tsx
 * // Basic
 * <Button>Click me</Button>
 *
 * // Loading state
 * <Button loading>Submitting...</Button>
 *
 * // With icons
 * <Button leftIcon={<Mail />} rightIcon={<ArrowRight />}>
 *   Send Message
 * </Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "default",
      size = "md",
      loading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const config = useLayoutConfig();
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        className={cn(
          // Base styles
          "inline-flex items-center justify-center gap-2 font-medium",
          "transition-all duration-200",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",

          // Layout-aware border radius
          config.buttonStyle === "sharp" && "rounded-none",
          config.buttonStyle === "rounded" && "rounded-lg",
          config.buttonStyle === "pill" && "rounded-full",
          config.buttonStyle === "default" && "rounded-md",

          // Layout-aware interactions
          "btn-layout-interactive",
          config.buttonInteraction,

          // Variant
          variantClasses[variant],

          // Size
          sizeClasses[size],

          // Full width
          fullWidth && "w-full",

          // Disabled/loading state
          isDisabled && "opacity-50 cursor-not-allowed pointer-events-none",

          // Error shake animation class (applied via form validation)
          "data-[error=true]:animate-shake",

          className
        )}
        disabled={isDisabled}
        aria-busy={loading}
        {...props}
      >
        {/* Loading spinner or left icon */}
        {loading ? (
          <Spinner
            size="sm"
            variant={variant === "default" ? "white" : "default"}
          />
        ) : (
          leftIcon && <span className="flex-shrink-0">{leftIcon}</span>
        )}

        {/* Button text */}
        <span>{children}</span>

        {/* Right icon (hidden during loading) */}
        {rightIcon && !loading && (
          <span className="flex-shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
