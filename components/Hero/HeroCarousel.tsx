"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLayoutConfig } from "@/components/LayoutContext";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

interface HeroSlide {
  headline: string;
  subheadline?: string;
  backgroundImage: string;
  backgroundImageAlt?: string;
  cta?: { label: string; href: string };
}

interface HeroCarouselProps {
  slides: HeroSlide[];
  autoPlay?: boolean;
  interval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  overlayOpacity?: number;
}

/**
 * HeroCarousel - Multiple hero slides with auto-rotation
 * Dot navigation + optional arrows, swipe support
 * High-value for: visual industries (60%+ competitor usage)
 */
export default function HeroCarousel({
  slides,
  autoPlay = true,
  interval = 5000,
  showDots = true,
  showArrows = true,
  overlayOpacity = 0.5,
}: HeroCarouselProps) {
  const config = useLayoutConfig();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  const goToNext = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  // Auto-play
  useEffect(() => {
    if (!autoPlay || isPaused || slides.length <= 1) return;

    const timer = setInterval(goToNext, interval);
    return () => clearInterval(timer);
  }, [autoPlay, isPaused, interval, goToNext, slides.length]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;

    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }

    setTouchStart(null);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToPrev, goToNext]);

  if (slides.length === 0) return null;

  return (
    <section
      id="hero"
      className="relative min-h-screen h-screen overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 transition-opacity duration-700",
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          )}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={slide.backgroundImage}
              alt={slide.backgroundImageAlt || slide.headline}
              fill
              className="object-cover"
              priority={index === 0}
              unoptimized
            />
            <div
              className="absolute inset-0 bg-background"
              style={{ opacity: overlayOpacity }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
          </div>

          {/* Decorative orbs */}
          {config.showDecorativeOrbs && (
            <>
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
              <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/15 rounded-full blur-3xl" />
            </>
          )}

          {/* Content */}
          <div className="relative z-20 h-full flex items-center justify-center">
            <div className="container mx-auto px-4 text-center">
              <div className="max-w-4xl mx-auto">
                {/* Headline */}
                <h1
                  className={cn(
                    "font-heading font-bold text-4xl md:text-6xl lg:text-7xl",
                    "text-foreground mb-6 leading-tight",
                    "transition-all duration-500",
                    index === currentSlide
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8",
                    config.showGradientText && "gradient-text"
                  )}
                  style={{ transitionDelay: index === currentSlide ? "200ms" : "0ms" }}
                >
                  {slide.headline}
                </h1>

                {/* Subheadline */}
                {slide.subheadline && (
                  <p
                    className={cn(
                      "text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto",
                      "transition-all duration-500",
                      index === currentSlide
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8"
                    )}
                    style={{ transitionDelay: index === currentSlide ? "400ms" : "0ms" }}
                  >
                    {slide.subheadline}
                  </p>
                )}

                {/* CTA */}
                {slide.cta && (
                  <div
                    className={cn(
                      "transition-all duration-500",
                      index === currentSlide
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8"
                    )}
                    style={{ transitionDelay: index === currentSlide ? "600ms" : "0ms" }}
                  >
                    <Link
                      href={slide.cta.href}
                      className={cn(
                        "inline-flex px-10 py-4 rounded-full text-lg font-semibold",
                        "bg-primary text-primary-foreground",
                        "hover:scale-105 transition-transform duration-300",
                        "shadow-xl shadow-primary/20",
                        config.buttonInteraction
                      )}
                    >
                      {slide.cta.label}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      {showArrows && slides.length > 1 && (
        <>
          <button
            onClick={goToPrev}
            className={cn(
              "absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30",
              "w-12 h-12 rounded-full",
              "bg-background/80 backdrop-blur-sm",
              "flex items-center justify-center",
              "text-foreground hover:bg-background transition-colors",
              "border border-border"
            )}
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={goToNext}
            className={cn(
              "absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30",
              "w-12 h-12 rounded-full",
              "bg-background/80 backdrop-blur-sm",
              "flex items-center justify-center",
              "text-foreground hover:bg-background transition-colors",
              "border border-border"
            )}
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Dot Navigation */}
      {showDots && slides.length > 1 && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "transition-all duration-300",
                index === currentSlide
                  ? "w-8 h-2 rounded-full bg-primary"
                  : "w-2 h-2 rounded-full bg-foreground/30 hover:bg-foreground/50"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Scroll Indicator */}
      {config.showScrollIndicator && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30">
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <span className="text-sm font-medium">Scroll</span>
            <ChevronDown className="w-6 h-6 animate-bounce" />
          </div>
        </div>
      )}

      {/* Progress Bar (optional - appears during autoplay) */}
      {autoPlay && !isPaused && slides.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-foreground/10 z-30">
          <div
            className="h-full bg-primary transition-none"
            style={{
              width: "100%",
              animation: `progress ${interval}ms linear`,
            }}
            key={currentSlide}
          />
        </div>
      )}

      <style jsx>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
