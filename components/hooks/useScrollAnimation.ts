"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface UseScrollAnimationOptions {
  /**
   * When to trigger the animation (0-1, where 0.1 = 10% visible)
   * @default 0.1
   */
  threshold?: number;
  /**
   * Root margin for earlier/later triggering
   * @default "0px 0px -50px 0px"
   */
  rootMargin?: string;
  /**
   * Only trigger once (true) or every time element enters view (false)
   * @default true
   */
  triggerOnce?: boolean;
  /**
   * Disable animation (respects prefers-reduced-motion by default)
   * @default false
   */
  disabled?: boolean;
}

interface UseScrollAnimationReturn<T extends HTMLElement> {
  /**
   * Ref to attach to the animated element
   */
  ref: React.RefObject<T>;
  /**
   * Whether the element is currently in view
   */
  isInView: boolean;
  /**
   * Whether the element has ever been in view (useful for triggerOnce)
   */
  hasAnimated: boolean;
}

/**
 * Hook for scroll-triggered animations using Intersection Observer.
 * Automatically respects prefers-reduced-motion.
 *
 * @example
 * ```tsx
 * function AnimatedCard({ children }) {
 *   const { ref, isInView } = useScrollAnimation<HTMLDivElement>();
 *
 *   return (
 *     <div
 *       ref={ref}
 *       className={cn(
 *         "transition-all duration-500",
 *         isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
 *       )}
 *     >
 *       {children}
 *     </div>
 *   );
 * }
 * ```
 */
export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollAnimationOptions = {}
): UseScrollAnimationReturn<T> {
  const {
    threshold = 0.1,
    rootMargin = "0px 0px -50px 0px",
    triggerOnce = true,
    disabled = false,
  } = options;

  const ref = useRef<T>(null!);
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // If disabled or user prefers reduced motion, show immediately
    if (disabled || prefersReducedMotion) {
      setIsInView(true);
      setHasAnimated(true);
      return;
    }

    // If already animated and triggerOnce, skip
    if (triggerOnce && hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            setHasAnimated(true);

            if (triggerOnce) {
              observer.unobserve(element);
            }
          } else if (!triggerOnce) {
            setIsInView(false);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, disabled, prefersReducedMotion, hasAnimated]);

  return { ref, isInView, hasAnimated };
}

/**
 * Hook for staggered animations on multiple elements.
 * Returns an array of animation states for each item.
 *
 * @example
 * ```tsx
 * function ServiceCards({ services }) {
 *   const { containerRef, getItemProps } = useStaggeredAnimation(services.length);
 *
 *   return (
 *     <div ref={containerRef}>
 *       {services.map((service, index) => (
 *         <Card
 *           key={index}
 *           {...getItemProps(index)}
 *           className={cn(
 *             "transition-all duration-500",
 *             getItemProps(index).isInView
 *               ? "opacity-100 translate-y-0"
 *               : "opacity-0 translate-y-8"
 *           )}
 *         >
 *           {service.title}
 *         </Card>
 *       ))}
 *     </div>
 *   );
 * }
 * ```
 */
export function useStaggeredAnimation<T extends HTMLElement = HTMLDivElement>(
  itemCount: number,
  options: UseScrollAnimationOptions & {
    /**
     * Delay between each item's animation in ms
     * @default 75
     */
    staggerDelay?: number;
  } = {}
) {
  const { staggerDelay = 75, ...scrollOptions } = options;
  const containerRef = useRef<T>(null!);
  const [isContainerInView, setIsContainerInView] = useState(false);
  const [itemsAnimated, setItemsAnimated] = useState<boolean[]>(
    new Array(itemCount).fill(false)
  );
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Watch container for intersection
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (scrollOptions.disabled || prefersReducedMotion) {
      setIsContainerInView(true);
      setItemsAnimated(new Array(itemCount).fill(true));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsContainerInView(true);
            observer.unobserve(container);
          }
        });
      },
      {
        threshold: scrollOptions.threshold ?? 0.1,
        rootMargin: scrollOptions.rootMargin ?? "0px 0px -50px 0px",
      }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [itemCount, scrollOptions.disabled, scrollOptions.threshold, scrollOptions.rootMargin, prefersReducedMotion]);

  // Stagger item animations
  useEffect(() => {
    if (!isContainerInView) return;
    if (prefersReducedMotion || scrollOptions.disabled) {
      setItemsAnimated(new Array(itemCount).fill(true));
      return;
    }

    const timeouts: NodeJS.Timeout[] = [];

    for (let i = 0; i < itemCount; i++) {
      const timeout = setTimeout(() => {
        setItemsAnimated((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, i * staggerDelay);
      timeouts.push(timeout);
    }

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [isContainerInView, itemCount, staggerDelay, prefersReducedMotion, scrollOptions.disabled]);

  const getItemProps = useCallback(
    (index: number) => ({
      isInView: itemsAnimated[index] ?? false,
      style: {
        transitionDelay: prefersReducedMotion ? "0ms" : `${index * staggerDelay}ms`,
      },
    }),
    [itemsAnimated, staggerDelay, prefersReducedMotion]
  );

  return {
    containerRef,
    isContainerInView,
    itemsAnimated,
    getItemProps,
  };
}

export default useScrollAnimation;
