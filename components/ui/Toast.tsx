"use client";

import { useEffect, useState } from "react";
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { type ToastType } from "./ToastProvider";

export interface ToastProps {
  id: string;
  title: string;
  description?: string;
  type?: ToastType;
  duration?: number;
  onDismiss: (id: string) => void;
}

const typeConfig = {
  success: {
    icon: CheckCircle,
    className: "border-green-500/50 bg-green-50 dark:bg-green-950/50",
    iconClassName: "text-green-600 dark:text-green-400",
  },
  error: {
    icon: AlertCircle,
    className: "border-red-500/50 bg-red-50 dark:bg-red-950/50",
    iconClassName: "text-red-600 dark:text-red-400",
  },
  warning: {
    icon: AlertTriangle,
    className: "border-yellow-500/50 bg-yellow-50 dark:bg-yellow-950/50",
    iconClassName: "text-yellow-600 dark:text-yellow-500",
  },
  info: {
    icon: Info,
    className: "border-blue-500/50 bg-blue-50 dark:bg-blue-950/50",
    iconClassName: "text-blue-600 dark:text-blue-400",
  },
};

/**
 * Toast Component
 *
 * Individual toast notification with auto-dismiss and manual close.
 */
export function Toast({
  id,
  title,
  description,
  type = "info",
  duration = 5000,
  onDismiss,
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  const config = typeConfig[type];
  const Icon = config.icon;

  useEffect(() => {
    // Trigger enter animation
    const enterTimer = setTimeout(() => setIsVisible(true), 10);

    // Auto-dismiss
    let dismissTimer: NodeJS.Timeout;
    if (duration > 0) {
      dismissTimer = setTimeout(() => {
        handleDismiss();
      }, duration);
    }

    return () => {
      clearTimeout(enterTimer);
      if (dismissTimer) clearTimeout(dismissTimer);
    };
  }, [duration]);

  const handleDismiss = () => {
    setIsLeaving(true);
    setTimeout(() => onDismiss(id), 300);
  };

  return (
    <div
      role="alert"
      aria-live="polite"
      className={cn(
        "pointer-events-auto flex items-start gap-3 p-4 rounded-lg border shadow-lg",
        "transform transition-all duration-300 ease-out",
        config.className,
        isVisible && !isLeaving
          ? "translate-x-0 opacity-100"
          : "translate-x-full opacity-0"
      )}
    >
      <Icon className={cn("h-5 w-5 flex-shrink-0 mt-0.5", config.iconClassName)} />
      <div className="flex-1 min-w-0">
        <p className="font-medium text-foreground">{title}</p>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <button
        onClick={handleDismiss}
        className={cn(
          "flex-shrink-0 p-1 rounded-md transition-colors",
          "hover:bg-foreground/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        )}
        aria-label="Dismiss notification"
      >
        <X className="h-4 w-4 text-muted-foreground" />
      </button>
    </div>
  );
}

export default Toast;
