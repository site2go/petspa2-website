"use client";

import { createContext, useCallback, useState, type ReactNode } from "react";
import { Toast, type ToastProps } from "./Toast";
import { cn } from "@/lib/utils";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastData {
  id: string;
  title: string;
  description?: string;
  type: ToastType;
  duration: number;
}

interface ToastContextValue {
  toasts: ToastData[];
  addToast: (options: Omit<ToastData, "id" | "type" | "duration"> & { type?: ToastType; duration?: number }) => string;
  removeToast: (id: string) => void;
}

export const ToastContext = createContext<ToastContextValue | null>(null);

interface ToastProviderProps {
  children: ReactNode;
  /** Position of toast container */
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center";
  /** Maximum number of toasts to display */
  maxToasts?: number;
}

const positionClasses = {
  "top-right": "top-4 right-4",
  "top-left": "top-4 left-4",
  "bottom-right": "bottom-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "top-center": "top-4 left-1/2 -translate-x-1/2",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
};

/**
 * Toast Provider Component
 *
 * Wrap your app with this provider to enable toast notifications.
 *
 * @example
 * ```tsx
 * // app/layout.tsx
 * import { ToastProvider } from "@/components/ui/ToastProvider";
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         <ToastProvider position="bottom-right">
 *           {children}
 *         </ToastProvider>
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 */
export function ToastProvider({
  children,
  position = "bottom-right",
  maxToasts = 5,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = useCallback(
    (options: Omit<ToastData, "id" | "type" | "duration"> & { type?: ToastType; duration?: number }) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const newToast: ToastData = {
        id,
        type: options.type || "info",
        duration: options.duration ?? 5000,
        title: options.title,
        description: options.description,
      };

      setToasts((prev) => {
        const updated = [...prev, newToast];
        // Keep only the most recent toasts
        return updated.slice(-maxToasts);
      });

      return id;
    },
    [maxToasts]
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}

      {/* Toast Container */}
      <div
        className={cn(
          "fixed z-50 flex flex-col gap-2 pointer-events-none",
          "w-full max-w-sm",
          positionClasses[position]
        )}
        role="region"
        aria-label="Notifications"
      >
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            id={toast.id}
            title={toast.title}
            description={toast.description}
            type={toast.type}
            duration={toast.duration}
            onDismiss={removeToast}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export default ToastProvider;
