"use client";

import { forwardRef, type TextareaHTMLAttributes } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLayoutConfig } from "@/components/LayoutContext";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Label for the textarea */
  label?: string;
  /** Error message to display */
  error?: string;
  /** Success state */
  success?: boolean;
  /** Helper text */
  helperText?: string;
  /** Show validation icon */
  showValidationIcon?: boolean;
}

/**
 * Textarea Component
 *
 * Enhanced form textarea with validation states, error/success styling,
 * and layout-aware design.
 *
 * @example
 * ```tsx
 * <Textarea
 *   label="Message"
 *   rows={4}
 *   error={errors.message}
 *   success={!errors.message && touched.message}
 * />
 * ```
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      success,
      helperText,
      showValidationIcon = true,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const config = useLayoutConfig();
    const inputId = id || `textarea-${label?.toLowerCase().replace(/\s/g, "-")}`;
    const hasError = !!error;
    const hasSuccess = success && !hasError;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium mb-2"
          >
            {label}
            {props.required && (
              <span className="text-destructive ml-1" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        <div className="relative">
          <textarea
            ref={ref}
            id={inputId}
            className={cn(
              // Base styles
              "w-full px-4 py-3 text-base resize-y min-h-[120px]",
              "border bg-background transition-all duration-200",
              "placeholder:text-muted-foreground",
              "focus:outline-none focus:ring-2 focus:ring-offset-0",

              // Layout-aware border radius
              config.buttonStyle === "sharp" && "rounded-none",
              config.buttonStyle === "rounded" && "rounded-lg",
              config.buttonStyle === "pill" && "rounded-xl",
              config.buttonStyle === "default" && "rounded-md",

              // Form style variants
              config.formStyle === "glass" && "glass-card",
              config.formStyle === "card" && "shadow-soft",

              // Default state
              !hasError && !hasSuccess && [
                "border-input",
                "focus:ring-ring focus:border-ring",
              ],

              // Error state
              hasError && [
                "border-destructive",
                "focus:ring-destructive/50 focus:border-destructive",
              ],

              // Success state
              hasSuccess && [
                "border-green-500",
                "focus:ring-green-500/50 focus:border-green-500",
              ],

              // Disabled state
              props.disabled && "opacity-50 cursor-not-allowed",

              className
            )}
            aria-invalid={hasError}
            aria-describedby={
              hasError
                ? `${inputId}-error`
                : helperText
                ? `${inputId}-helper`
                : undefined
            }
            {...props}
          />

          {/* Validation Icon */}
          {showValidationIcon && (hasError || hasSuccess) && (
            <div className="absolute right-3 top-4 pointer-events-none">
              {hasError && (
                <AlertCircle className="h-5 w-5 text-destructive" />
              )}
              {hasSuccess && (
                <CheckCircle className="h-5 w-5 text-green-500" />
              )}
            </div>
          )}
        </div>

        {/* Error Message */}
        {hasError && (
          <p
            id={`${inputId}-error`}
            className="mt-2 text-sm text-destructive flex items-center gap-1"
            role="alert"
          >
            {error}
          </p>
        )}

        {/* Helper Text */}
        {helperText && !hasError && (
          <p
            id={`${inputId}-helper`}
            className="mt-2 text-sm text-muted-foreground"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
