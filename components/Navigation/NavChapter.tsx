"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useLayoutConfig } from "@/components/LayoutContext";

export interface NavChapterProps {
  chapters: Array<{
    id: string;
    label: string;
  }>;
  currentChapter?: string;
}

export default function NavChapter({ chapters, currentChapter }: NavChapterProps) {
  const [activeChapter, setActiveChapter] = useState(currentChapter || chapters[0]?.id);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const config = useLayoutConfig();

  // Update active chapter based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = chapters.length - 1; i >= 0; i--) {
        const element = document.getElementById(chapters[i].id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveChapter(chapters[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, [chapters]);

  const scrollToChapter = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveChapter(id);
    }
  };

  return (
    <nav
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-end gap-4"
      aria-label="Chapter navigation"
    >
      {chapters.map((chapter, index) => {
        const isActive = activeChapter === chapter.id;
        const isHovered = hoveredIndex === index;

        return (
          <button
            key={chapter.id}
            onClick={() => scrollToChapter(chapter.id)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={cn(
              "group flex items-center gap-3 transition-all",
              config.buttonInteraction
            )}
            aria-label={`Jump to ${chapter.label}`}
            aria-current={isActive ? "true" : undefined}
          >
            {/* Label - shows on hover */}
            <span
              className={cn(
                "text-sm font-medium whitespace-nowrap transition-all duration-300",
                isHovered || isActive
                  ? "opacity-100 translate-x-0 text-foreground"
                  : "opacity-0 translate-x-2 text-foreground/60"
              )}
            >
              {chapter.label}
            </span>

            {/* Dot indicator */}
            <span
              className={cn(
                "relative w-3 h-3 rounded-full transition-all duration-300",
                isActive
                  ? "bg-primary scale-125"
                  : "bg-muted-foreground/40 hover:bg-muted-foreground/60"
              )}
            >
              {/* Active indicator ring */}
              {isActive && (
                <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
              )}
            </span>
          </button>
        );
      })}

      {/* Progress line connecting dots */}
      <div
        className="absolute right-[5px] top-0 bottom-0 w-px bg-border -z-10"
        style={{
          height: `${(chapters.length - 1) * 32}px`,
          top: "6px",
        }}
      />
    </nav>
  );
}
