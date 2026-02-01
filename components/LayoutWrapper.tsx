"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useLayoutConfig, LayoutWrapper as LayoutWrapperType } from "@/components/LayoutContext";

interface LayoutWrapperProps {
  children: ReactNode;
  /**
   * Override the layout wrapper type from context
   * Useful for specific sections that need different treatment
   */
  type?: LayoutWrapperType;
  className?: string;
}

/**
 * LayoutWrapper - Structural wrapper for different layout paradigms
 *
 * Handles the page structure for:
 * - default: Standard vertical scroll
 * - sidebar: Fixed left sidebar with scrollable main area
 * - fullscreen: Snap-scroll 100vh sections
 * - horizontal: Horizontal scroll container
 * - masonry: CSS columns masonry grid
 */
export default function LayoutWrapper({
  children,
  type,
  className,
}: LayoutWrapperProps) {
  const config = useLayoutConfig();
  const wrapperType = type ?? config.layoutWrapper;

  // Default wrapper - standard vertical scroll
  if (wrapperType === "default") {
    return (
      <div className={cn("min-h-screen", className)}>
        {children}
      </div>
    );
  }

  // Sidebar wrapper - fixed left sidebar, scrollable main
  if (wrapperType === "sidebar") {
    return (
      <div className={cn("layout-sidebar-wrapper flex min-h-screen", className)}>
        {/* Main content area with sidebar offset */}
        <div className="layout-sidebar-main flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    );
  }

  // Fullscreen wrapper - snap-scroll container
  if (wrapperType === "fullscreen") {
    return (
      <div
        className={cn(
          "layout-fullscreen-wrapper",
          "h-screen overflow-y-scroll snap-y snap-mandatory",
          className
        )}
      >
        {children}
      </div>
    );
  }

  // Horizontal wrapper - horizontal scroll container
  if (wrapperType === "horizontal") {
    return (
      <div
        className={cn(
          "layout-horizontal-wrapper",
          "h-screen overflow-x-scroll overflow-y-hidden snap-x snap-mandatory",
          "flex flex-row",
          className
        )}
      >
        <div className="horizontal-container flex flex-row">
          {children}
        </div>
      </div>
    );
  }

  // Masonry wrapper - CSS columns container
  if (wrapperType === "masonry") {
    return (
      <div className={cn("layout-masonry-wrapper min-h-screen", className)}>
        {children}
      </div>
    );
  }

  // Fallback to default
  return (
    <div className={cn("min-h-screen", className)}>
      {children}
    </div>
  );
}

/**
 * SidebarNav - Fixed sidebar navigation component
 * Use alongside LayoutWrapper type="sidebar"
 */
interface SidebarNavProps {
  children: ReactNode;
  className?: string;
  width?: number;
}

export function SidebarNav({ children, className, width = 240 }: SidebarNavProps) {
  return (
    <nav
      className={cn(
        "layout-sidebar-nav fixed left-0 top-0 bottom-0 z-50",
        "bg-card border-r border-border overflow-y-auto",
        className
      )}
      style={{ width: `${width}px` }}
    >
      {children}
    </nav>
  );
}

/**
 * SnapSection - Full viewport section for snap-scroll layouts
 */
interface SnapSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  background?: "default" | "muted" | "primary" | "gradient";
}

export function SnapSection({
  children,
  className,
  id,
  background = "default",
}: SnapSectionProps) {
  const bgClasses = {
    default: "bg-background",
    muted: "bg-muted",
    primary: "bg-primary text-primary-foreground",
    gradient: "bg-gradient-to-br from-background via-muted to-background",
  };

  return (
    <section
      id={id}
      className={cn(
        "snap-section h-screen min-h-screen",
        "flex items-center justify-center",
        "snap-start snap-always",
        bgClasses[background],
        className
      )}
    >
      {children}
    </section>
  );
}

/**
 * HorizontalPanel - Full viewport panel for horizontal scroll layouts
 */
interface HorizontalPanelProps {
  children: ReactNode;
  className?: string;
  id?: string;
  background?: "default" | "muted" | "primary" | "gradient";
}

export function HorizontalPanel({
  children,
  className,
  id,
  background = "default",
}: HorizontalPanelProps) {
  const bgClasses = {
    default: "bg-background",
    muted: "bg-muted",
    primary: "bg-primary text-primary-foreground",
    gradient: "bg-gradient-to-r from-background via-muted to-background",
  };

  return (
    <section
      id={id}
      className={cn(
        "horizontal-panel min-w-[100vw] w-[100vw] h-screen",
        "flex items-center justify-center flex-shrink-0",
        "snap-start snap-always",
        bgClasses[background],
        className
      )}
    >
      {children}
    </section>
  );
}

/**
 * ChapterSection - Story chapter section for storytelling layouts
 */
interface ChapterSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  chapterNumber?: string;
  background?: "default" | "muted";
}

export function ChapterSection({
  children,
  className,
  id,
  chapterNumber,
  background = "default",
}: ChapterSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "chapter-section relative min-h-screen py-24",
        background === "muted" ? "bg-muted" : "bg-background",
        className
      )}
    >
      {/* Chapter Number Watermark */}
      {chapterNumber && (
        <div className="chapter-number absolute top-8 left-8 text-9xl font-black text-muted/20 select-none pointer-events-none">
          {chapterNumber}
        </div>
      )}
      {children}
    </section>
  );
}

/**
 * BottomNavBar - Fixed bottom navigation bar
 */
interface BottomNavBarProps {
  children: ReactNode;
  className?: string;
}

export function BottomNavBar({ children, className }: BottomNavBarProps) {
  return (
    <nav
      className={cn(
        "layout-bottom-nav fixed bottom-0 left-0 right-0 z-50",
        "bg-background/95 backdrop-blur-md border-t border-border",
        "h-20",
        className
      )}
    >
      <div className="layout-bottom-nav-inner h-full flex items-center justify-around max-w-lg mx-auto px-4">
        {children}
      </div>
    </nav>
  );
}

/**
 * MasonryContainer - CSS columns masonry grid container
 */
interface MasonryContainerProps {
  children: ReactNode;
  className?: string;
  columns?: number;
  gap?: string;
}

export function MasonryContainer({
  children,
  className,
  columns = 4,
  gap = "1rem",
}: MasonryContainerProps) {
  return (
    <div
      className={cn("masonry-container", className)}
      style={{
        columnCount: columns,
        columnGap: gap,
      }}
    >
      {children}
    </div>
  );
}

/**
 * MasonryItem - Individual masonry grid item
 */
interface MasonryItemProps {
  children: ReactNode;
  className?: string;
}

export function MasonryItem({ children, className }: MasonryItemProps) {
  return (
    <div
      className={cn(
        "masonry-item break-inside-avoid mb-4",
        "bg-card rounded-xl overflow-hidden",
        className
      )}
    >
      {children}
    </div>
  );
}
