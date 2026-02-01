/**
 * FAQ Section Components
 *
 * Three variants for different layout styles:
 * - FAQAccordion: Collapsible Q&A (Classic, Split, Bold)
 * - FAQGrid: Card-based grid layout (Glass, Magazine)
 * - FAQSimple: Clean list with hover effects (Minimal)
 *
 * All variants include:
 * - JSON-LD FAQ schema for SEO
 * - Keyboard accessible (Enter/Space to toggle accordion)
 * - Layout-aware styling via data-layout CSS
 * - Smooth scroll-triggered animations
 */

export { FAQAccordion, type FAQItem } from "./FAQAccordion";
export { FAQGrid } from "./FAQGrid";
export { FAQSimple } from "./FAQSimple";

// Re-export default as named for convenience
export { FAQAccordion as default } from "./FAQAccordion";

// Layout-to-component mapping helper
export type FAQComponent = "FAQAccordion" | "FAQGrid" | "FAQSimple";

export function getFAQComponentForLayout(
  layout: "minimal" | "classic" | "split" | "bold" | "glass" | "magazine"
): FAQComponent {
  const mapping: Record<string, FAQComponent> = {
    minimal: "FAQSimple",
    classic: "FAQAccordion",
    split: "FAQAccordion",
    bold: "FAQAccordion",
    glass: "FAQGrid",
    magazine: "FAQGrid",
  };
  return mapping[layout] || "FAQAccordion";
}
