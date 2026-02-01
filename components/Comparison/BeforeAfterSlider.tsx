"use client";

import { useState, useRef, useEffect, useCallback, RefCallback } from "react";
import Image from "next/image";
import { useLayoutConfig } from "@/components/LayoutContext";
import { useScrollAnimation } from "@/components/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  caption?: string;
  orientation?: "horizontal" | "vertical";
  beforeAlt?: string;
  afterAlt?: string;
}

/**
 * BeforeAfterSlider - Interactive before/after comparison
 * Draggable divider to reveal before/after images
 * High-value for: beauty, auto repair, dental, pet grooming
 */
export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
  caption,
  orientation = "horizontal",
  beforeAlt = "Before image",
  afterAlt = "After image",
}: BeforeAfterSliderProps) {
  const config = useLayoutConfig();
  const { ref, isInView } = useScrollAnimation<HTMLDivElement>();
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const isHorizontal = orientation === "horizontal";

  const handleMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      let position: number;

      if (isHorizontal) {
        position = ((clientX - rect.left) / rect.width) * 100;
      } else {
        position = ((clientY - rect.top) / rect.height) * 100;
      }

      setSliderPosition(Math.max(0, Math.min(100, position)));
    },
    [isHorizontal]
  );

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX, e.clientY);
    },
    [isDragging, handleMove]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      const touch = e.touches[0];
      handleMove(touch.clientX, touch.clientY);
    },
    [isDragging, handleMove]
  );

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleTouchMove]);

  // Combine refs
  const setRefs: RefCallback<HTMLDivElement> = useCallback(
    (node) => {
      // Set the scroll animation ref
      (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    },
    [ref]
  );

  return (
    <div
      ref={setRefs}
      className={cn(
        "layout-entry",
        isInView && "in-view"
      )}
    >
      <div
        ref={containerRef}
        className={cn(
          "relative w-full aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-xl cursor-ew-resize select-none",
          config.cardStyle === "glass" && "glass-card",
          config.cardStyle === "bordered" && "border-2 border-border",
          isDragging && "cursor-grabbing"
        )}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        {/* After Image (Background - full) */}
        <div className="absolute inset-0">
          <Image
            src={afterImage}
            alt={afterAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 80vw"
            draggable={false}
            unoptimized
          />
          {/* After Label */}
          <div className="absolute bottom-4 right-4 z-10">
            <span
              className={cn(
                "px-3 py-1.5 rounded-full text-sm font-medium",
                "bg-background/80 backdrop-blur-sm text-foreground"
              )}
            >
              {afterLabel}
            </span>
          </div>
        </div>

        {/* Before Image (Clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={
            isHorizontal
              ? { clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }
              : { clipPath: `inset(0 0 ${100 - sliderPosition}% 0)` }
          }
        >
          <Image
            src={beforeImage}
            alt={beforeAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 80vw"
            draggable={false}
            unoptimized
          />
          {/* Before Label */}
          <div className="absolute bottom-4 left-4 z-10">
            <span
              className={cn(
                "px-3 py-1.5 rounded-full text-sm font-medium",
                "bg-background/80 backdrop-blur-sm text-foreground"
              )}
            >
              {beforeLabel}
            </span>
          </div>
        </div>

        {/* Slider Handle */}
        <div
          className={cn(
            "absolute z-20",
            isHorizontal
              ? "top-0 bottom-0 w-1 bg-white shadow-lg"
              : "left-0 right-0 h-1 bg-white shadow-lg"
          )}
          style={
            isHorizontal
              ? { left: `${sliderPosition}%`, transform: "translateX(-50%)" }
              : { top: `${sliderPosition}%`, transform: "translateY(-50%)" }
          }
        >
          {/* Handle Circle */}
          <div
            className={cn(
              "absolute w-10 h-10 rounded-full bg-white shadow-lg",
              "flex items-center justify-center",
              "border-2 border-primary",
              isHorizontal
                ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                : "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            )}
          >
            {/* Arrows */}
            <svg
              className={cn(
                "w-5 h-5 text-primary",
                !isHorizontal && "rotate-90"
              )}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 9l4-4 4 4M8 15l4 4 4-4"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Caption */}
      {caption && (
        <p className="mt-4 text-center text-muted-foreground text-sm">
          {caption}
        </p>
      )}
    </div>
  );
}
