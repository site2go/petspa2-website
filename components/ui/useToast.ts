"use client";

import { useContext } from "react";
import { ToastContext, type ToastType } from "./ToastProvider";

export interface ToastOptions {
  /** Toast title */
  title: string;
  /** Toast description (optional) */
  description?: string;
  /** Toast type */
  type?: ToastType;
  /** Duration in milliseconds (0 = no auto-dismiss) */
  duration?: number;
}

/**
 * useToast Hook
 *
 * Provides toast notification functionality throughout the app.
 *
 * @example
 * ```tsx
 * function ContactForm() {
 *   const toast = useToast();
 *
 *   const handleSubmit = async () => {
 *     try {
 *       await submitForm();
 *       toast.success({ title: "Message sent!", description: "We'll get back to you soon." });
 *     } catch (error) {
 *       toast.error({ title: "Failed to send", description: "Please try again." });
 *     }
 *   };
 * }
 * ```
 */
export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  const { addToast, removeToast, toasts } = context;

  return {
    toasts,
    removeToast,
    /**
     * Show a toast notification
     */
    toast: (options: ToastOptions) => addToast(options),
    /**
     * Show a success toast
     */
    success: (options: Omit<ToastOptions, "type">) =>
      addToast({ ...options, type: "success" }),
    /**
     * Show an error toast
     */
    error: (options: Omit<ToastOptions, "type">) =>
      addToast({ ...options, type: "error" }),
    /**
     * Show a warning toast
     */
    warning: (options: Omit<ToastOptions, "type">) =>
      addToast({ ...options, type: "warning" }),
    /**
     * Show an info toast
     */
    info: (options: Omit<ToastOptions, "type">) =>
      addToast({ ...options, type: "info" }),
  };
}

export default useToast;
