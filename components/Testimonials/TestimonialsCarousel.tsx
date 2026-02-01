"use client";

import { useState, useRef, useEffect } from "react";
import { useLayoutConfig } from "@/components/LayoutContext";
import { useScrollAnimation } from "@/components/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

interface Testimonial {
  quote: string;
  name: string;
  role?: string;
  image?: string;
  rating?: number;
}

interface TestimonialsCarouselProps {
  title: string;
  subtitle?: string;
  testimonials: Testimonial[];
  autoplay?: boolean;
  autoplayInterval?: number;
}

/**
 * TestimonialsCarousel - Scrollable testimonials with navigation
 * Supports autoplay and manual navigation
 * Used by: Glass, Classic, Magazine layouts
 */
export default function TestimonialsCarousel({
  title,
  subtitle,
  testimonials,
  autoplay = true,
  autoplayInterval = 5000,
}: TestimonialsCarouselProps) {
  const config = useLayoutConfig();
  const { ref: headerRef, isInView: headerInView } = useScrollAnimation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Autoplay
  useEffect(() => {
    if (!autoplay || isPaused || testimonials.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, autoplayInterval);

    return () => clearInterval(interval);
  }, [autoplay, autoplayInterval, isPaused, testimonials.length]);

  const goToPrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-muted">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={cn(
            "text-center mb-12 layout-entry",
            headerInView && "in-view"
          )}
        >
          {config.showDecorativeLines && (
            <div className="decorative-line mx-auto mb-4" />
          )}
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Carousel */}
        <div
          ref={containerRef}
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Arrows */}
          {testimonials.length > 1 && (
            <>
              <button
                onClick={goToPrev}
                className={cn(
                  "absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10",
                  "w-10 h-10 md:w-12 md:h-12 rounded-full bg-card shadow-lg border border-border",
                  "flex items-center justify-center",
                  "hover:bg-muted transition-colors",
                  config.buttonInteraction
                )}
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={goToNext}
                className={cn(
                  "absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10",
                  "w-10 h-10 md:w-12 md:h-12 rounded-full bg-card shadow-lg border border-border",
                  "flex items-center justify-center",
                  "hover:bg-muted transition-colors",
                  config.buttonInteraction
                )}
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {/* Testimonial Card */}
          <div
            className={cn(
              "bg-card rounded-2xl p-8 md:p-12 shadow-soft",
              config.cardStyle === "glass" && "glass-card",
              config.cardStyle === "bordered" && "border-2 border-border"
            )}
          >
            {/* Quote Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Quote className="w-6 h-6 text-primary" />
              </div>
            </div>

            {/* Rating */}
            {testimonials[currentIndex].rating && (
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-5 h-5",
                      i < (testimonials[currentIndex].rating || 0)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-muted-foreground"
                    )}
                  />
                ))}
              </div>
            )}

            {/* Quote Text */}
            <blockquote className="text-center mb-8">
              <p className="text-lg md:text-xl text-foreground leading-relaxed italic">
                "{testimonials[currentIndex].quote}"
              </p>
            </blockquote>

            {/* Author */}
            <div className="flex flex-col items-center">
              {testimonials[currentIndex].image && (
                <div className="w-16 h-16 rounded-full overflow-hidden mb-4 border-2 border-primary/20">
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="text-center">
                <div className="font-heading font-semibold text-lg text-foreground">
                  {testimonials[currentIndex].name}
                </div>
                {testimonials[currentIndex].role && (
                  <div className="text-muted-foreground text-sm">
                    {testimonials[currentIndex].role}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Dots Navigation */}
          {testimonials.length > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all",
                    index === currentIndex
                      ? "bg-primary w-8"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
