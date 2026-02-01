/**
 * Pricing Section Components
 *
 * Three variants for different layout styles:
 * - PricingCards: 3-tier card layout with highlighted "popular" (Classic, Bold, Glass)
 * - PricingTable: Feature comparison table (Split)
 * - PricingSimple: Clean list with CTAs (Minimal, Magazine)
 *
 * All variants include:
 * - Layout-aware styling via data-layout CSS
 * - Smooth scroll-triggered animations
 * - Highlighted "recommended" tier
 * - Feature checkmarks and X marks
 * - CTA button per tier
 * - Contact for custom quote option
 */

export {
  PricingCards,
  type PricingTier,
  type PricingFeature,
} from "./PricingCards";

export {
  PricingTable,
  type PricingTierHeader,
  type PricingFeature as TableFeature,
} from "./PricingTable";

export {
  PricingSimple,
  type PricingOption,
} from "./PricingSimple";

// Re-export default as named for convenience
export { PricingCards as default } from "./PricingCards";

// Layout-to-component mapping helper
export type PricingComponent = "PricingCards" | "PricingTable" | "PricingSimple";

export function getPricingComponentForLayout(
  layout: "minimal" | "classic" | "split" | "bold" | "glass" | "magazine"
): PricingComponent {
  const mapping: Record<string, PricingComponent> = {
    minimal: "PricingSimple",
    classic: "PricingCards",
    split: "PricingTable",
    bold: "PricingCards",
    glass: "PricingCards",
    magazine: "PricingSimple",
  };
  return mapping[layout] || "PricingCards";
}
