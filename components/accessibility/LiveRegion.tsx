"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface LiveRegionProps {
  /**
   * The message to announce. Changes trigger announcements.
   */
  children?: React.ReactNode;
  /**
   * The politeness level for the announcement.
   * - "polite": Waits for user to finish current task (default)
   * - "assertive": Interrupts immediately (use sparingly)
   */
  mode?: "polite" | "assertive";
  /**
   * Whether to read the entire region on updates.
   * @default true
   */
  atomic?: boolean;
  /**
   * The ARIA role for the region.
   * - "status": For status messages (default for polite)
   * - "alert": For important messages (default for assertive)
   * - "log": For chat/activity logs
   */
  role?: "status" | "alert" | "log";
  /**
   * Whether to visually hide the region (screen reader only)
   * @default true
   */
  visuallyHidden?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Live Region Component
 *
 * Announces dynamic content changes to screen readers.
 * Required for WCAG 4.1.3 Status Messages.
 *
 * @example
 * // Form submission status
 * const [status, setStatus] = useState("");
 *
 * const handleSubmit = async () => {
 *   setStatus("Sending...");
 *   await submitForm();
 *   setStatus("Message sent successfully!");
 * };
 *
 * return (
 *   <>
 *     <form onSubmit={handleSubmit}>...</form>
 *     <LiveRegion>{status}</LiveRegion>
 *   </>
 * );
 *
 * @example
 * // Alert for important messages
 * <LiveRegion mode="assertive" role="alert">
 *   {errorMessage}
 * </LiveRegion>
 *
 * @example
 * // Visible status with styling
 * <LiveRegion visuallyHidden={false} className="text-green-600">
 *   {successMessage}
 * </LiveRegion>
 */
export function LiveRegion({
  children,
  mode = "polite",
  atomic = true,
  role,
  visuallyHidden = true,
  className,
}: LiveRegionProps) {
  // Determine role based on mode if not specified
  const effectiveRole = role ?? (mode === "assertive" ? "alert" : "status");

  return (
    <div
      role={effectiveRole}
      aria-live={mode}
      aria-atomic={atomic}
      className={cn(visuallyHidden && "sr-only", className)}
    >
      {children}
    </div>
  );
}

/**
 * Announcement Hook
 *
 * For programmatic announcements without a visible component.
 *
 * @example
 * const announce = useAnnounce();
 *
 * const handleAction = () => {
 *   // Do something
 *   announce("Action completed successfully");
 * };
 */
export function useAnnounce() {
  const regionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Create a live region if it doesn't exist
    if (!regionRef.current) {
      const region = document.createElement("div");
      region.setAttribute("role", "status");
      region.setAttribute("aria-live", "polite");
      region.setAttribute("aria-atomic", "true");
      region.className = "sr-only";
      region.id = "announcer-region";
      document.body.appendChild(region);
      regionRef.current = region;
    }

    return () => {
      // Cleanup on unmount
      if (regionRef.current) {
        regionRef.current.remove();
        regionRef.current = null;
      }
    };
  }, []);

  const announce = (message: string, mode: "polite" | "assertive" = "polite") => {
    if (regionRef.current) {
      regionRef.current.setAttribute("aria-live", mode);
      // Clear and set to trigger announcement
      regionRef.current.textContent = "";
      // Use setTimeout to ensure the clear happens first
      setTimeout(() => {
        if (regionRef.current) {
          regionRef.current.textContent = message;
        }
      }, 50);
    }
  };

  return announce;
}

/**
 * Form Status Component
 *
 * Specialized live region for form submission states.
 *
 * @example
 * <form onSubmit={handleSubmit}>
 *   ...
 *   <button type="submit" disabled={isSubmitting}>
 *     {isSubmitting ? "Sending..." : "Submit"}
 *   </button>
 *   <FormStatus
 *     isSubmitting={isSubmitting}
 *     isSuccess={isSuccess}
 *     isError={isError}
 *     errorMessage={errorMessage}
 *     successMessage="Your message has been sent!"
 *   />
 * </form>
 */
interface FormStatusProps {
  isSubmitting: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage?: string;
  successMessage?: string;
  submittingMessage?: string;
}

export function FormStatus({
  isSubmitting,
  isSuccess,
  isError,
  errorMessage = "An error occurred. Please try again.",
  successMessage = "Form submitted successfully!",
  submittingMessage = "Submitting form...",
}: FormStatusProps) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (isSubmitting) {
      setMessage(submittingMessage);
    } else if (isSuccess) {
      setMessage(successMessage);
    } else if (isError) {
      setMessage(errorMessage);
    } else {
      setMessage("");
    }
  }, [isSubmitting, isSuccess, isError, submittingMessage, successMessage, errorMessage]);

  return (
    <LiveRegion mode={isError ? "assertive" : "polite"}>
      {message}
    </LiveRegion>
  );
}

/**
 * Loading Announcer Component
 *
 * Announces loading states for async operations.
 *
 * @example
 * <LoadingAnnouncer
 *   isLoading={isLoading}
 *   loadingMessage="Loading results..."
 *   loadedMessage="Results loaded"
 * />
 */
interface LoadingAnnouncerProps {
  isLoading: boolean;
  loadingMessage?: string;
  loadedMessage?: string;
}

export function LoadingAnnouncer({
  isLoading,
  loadingMessage = "Loading...",
  loadedMessage = "Content loaded",
}: LoadingAnnouncerProps) {
  const [message, setMessage] = useState("");
  const wasLoading = useRef(false);

  useEffect(() => {
    if (isLoading && !wasLoading.current) {
      setMessage(loadingMessage);
      wasLoading.current = true;
    } else if (!isLoading && wasLoading.current) {
      setMessage(loadedMessage);
      wasLoading.current = false;
      // Clear message after announcement
      setTimeout(() => setMessage(""), 1000);
    }
  }, [isLoading, loadingMessage, loadedMessage]);

  return <LiveRegion>{message}</LiveRegion>;
}

export default LiveRegion;
