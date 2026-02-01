"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Layout profile types - 14 distinct layouts (6 original + 8 new structural layouts)
export type LayoutProfile =
  // Original 6 layouts (visual variations)
  | "minimal"
  | "classic"
  | "split"
  | "bold"
  | "glass"
  | "magazine"
  // New 8 structural layouts
  | "brutalist"   // Fixed sidebar left, harsh typography, no radius
  | "sidebar"     // Fixed sidebar left, independent scroll
  | "fullscreen"  // Snap scroll, 100vh sections
  | "horizontal"  // Horizontal scroll
  | "bento"       // Multi-panel grid layout
  | "storytelling" // Chapter progression with dots
  | "bottomnav"   // Mobile-style bottom navigation
  | "masonry";    // Pinterest-style masonry grid

// Component variant mappings
export type HeroComponent =
  | "HeroMinimal"
  | "HeroCentered"
  | "HeroSplit"
  | "HeroFullBleed"
  // New hero components
  | "HeroBrutalist"
  | "HeroBento"
  | "HeroFullscreen"
  | "HeroHorizontal"
  | "HeroChapter";

export type ServicesComponent =
  | "ServicesGrid"
  | "ServicesAlternating"
  | "ServicesLarge"
  | "ServicesHorizontal"
  // New services components
  | "ServicesBento"
  | "ServicesCards"
  | "ServicesMasonry"
  | "ServicesFullscreen"
  | "ServicesTimeline";

export type FAQComponent = "FAQAccordion" | "FAQGrid" | "FAQSimple";
export type PricingComponent = "PricingCards" | "PricingTable" | "PricingSimple";
export type GalleryComponent = "GalleryGrid" | "GalleryMasonry" | "GalleryCarousel";
export type CardStyle = "flat" | "default" | "bordered" | "glass" | "brutal";

// New Tier 1 component types
export type ComparisonComponent = "BeforeAfterSlider" | "BeforeAfterGallery";
export type TeamComponent = "TeamShowcase" | "TeamCarousel" | "TeamFeatured";
export type HeroCarouselComponent = "HeroCarousel";

// New structural types
export type NavigationComponent = "NavTop" | "NavSidebar" | "NavBottom" | "NavOverlay" | "NavChapter" | "NavMinimal";
export type LayoutWrapper = "default" | "sidebar" | "fullscreen" | "horizontal" | "masonry";
export type ContentFlowType = "vertical" | "horizontal" | "snap" | "cards" | "continuous";
export type GridSystemType = "traditional" | "bento" | "broken" | "masonry" | "fullwidth";
export type SectionHeightType = "auto" | "viewport" | "compact";
export type NavPositionType = "top" | "left" | "bottom" | "overlay" | "right";

// Layout configuration for each profile
export interface LayoutConfig {
  name: string;
  description: string;
  // Component mappings
  heroComponent: HeroComponent;
  servicesComponent: ServicesComponent;
  faqComponent: FAQComponent;
  pricingComponent: PricingComponent;
  galleryComponent: GalleryComponent;
  // Animation settings
  animationDuration: string;
  animationEasing: string;
  staggerDelay: string;
  entryAnimation: "fade-in" | "slide-up" | "scale-in-bounce" | "slide-left" | "none";
  // Component variants
  headerVariant: "default" | "glass" | "transparent" | "minimal" | "sidebar" | "bottom" | "overlay";
  cardStyle: CardStyle;
  buttonStyle: "default" | "rounded" | "sharp" | "pill" | "brutal";
  cardInteraction: string;
  buttonInteraction: string;
  linkInteraction: string;
  imageInteraction: string;
  formStyle: "default" | "card" | "glass" | "minimal" | "brutal";
  footerVariant: "default" | "dark" | "branded" | "minimal" | "sidebar";
  // Section settings
  sectionTransition: "none" | "fade" | "wave" | "angled" | "snap";
  sectionSpacing: "normal" | "large" | "compact" | "none";
  // Feature flags
  showHeroImage: boolean;
  showDecorativeOrbs: boolean;
  showScrollIndicator: boolean;
  showGradientText: boolean;
  showQuoteIcons: boolean;
  showContactIcons: boolean;
  showAnimatedStats: boolean;
  showDecorativeLines: boolean;
  showGlassEffects: boolean;
  showColorBlocking: boolean;
  showLargeImages: boolean;
  // NEW: Structural properties
  navigationComponent: NavigationComponent;
  layoutWrapper: LayoutWrapper;
  contentFlow: ContentFlowType;
  gridSystem: GridSystemType;
  sectionHeight: SectionHeightType;
  navPosition: NavPositionType;
}

// 14 Layout configurations with DRAMATIC differences
export const layoutConfigs: Record<LayoutProfile, LayoutConfig> = {
  // ============================================
  // ORIGINAL 6 LAYOUTS (Visual Variations)
  // ============================================

  // MINIMAL: Typography-focused, no hero image, maximum whitespace
  minimal: {
    name: "Minimal",
    description: "Clean, typography-focused with maximum whitespace",
    // Components
    heroComponent: "HeroMinimal",
    servicesComponent: "ServicesGrid",
    faqComponent: "FAQSimple",
    pricingComponent: "PricingSimple",
    galleryComponent: "GalleryGrid",
    // Animation - slow, subtle
    animationDuration: "700ms",
    animationEasing: "ease-out",
    staggerDelay: "120ms",
    entryAnimation: "fade-in",
    // Variants - simple, understated
    headerVariant: "minimal",
    cardStyle: "flat",
    buttonStyle: "sharp",
    cardInteraction: "transition-colors",
    buttonInteraction: "transition-colors",
    linkInteraction: "link-underline-center",
    imageInteraction: "img-brightness",
    formStyle: "minimal",
    footerVariant: "minimal",
    // Sections
    sectionTransition: "none",
    sectionSpacing: "large",
    // Features - NOTHING decorative
    showHeroImage: false,
    showDecorativeOrbs: false,
    showScrollIndicator: false,
    showGradientText: false,
    showQuoteIcons: false,
    showContactIcons: false,
    showAnimatedStats: false,
    showDecorativeLines: false,
    showGlassEffects: false,
    showColorBlocking: false,
    showLargeImages: false,
    // Structural - default
    navigationComponent: "NavTop",
    layoutWrapper: "default",
    contentFlow: "vertical",
    gridSystem: "traditional",
    sectionHeight: "auto",
    navPosition: "top",
  },

  // CLASSIC: Traditional centered layout with image background
  classic: {
    name: "Classic",
    description: "Traditional, centered design with familiar patterns",
    // Components
    heroComponent: "HeroCentered",
    servicesComponent: "ServicesGrid",
    faqComponent: "FAQAccordion",
    pricingComponent: "PricingCards",
    galleryComponent: "GalleryGrid",
    // Animation - moderate, comfortable
    animationDuration: "600ms",
    animationEasing: "ease-out",
    staggerDelay: "100ms",
    entryAnimation: "fade-in",
    // Variants - traditional
    headerVariant: "default",
    cardStyle: "default",
    buttonStyle: "rounded",
    cardInteraction: "card-lift-subtle",
    buttonInteraction: "transition-colors",
    linkInteraction: "link-underline-center",
    imageInteraction: "img-zoom-subtle",
    formStyle: "default",
    footerVariant: "default",
    // Sections
    sectionTransition: "fade",
    sectionSpacing: "normal",
    // Features - minimal decoration
    showHeroImage: true,
    showDecorativeOrbs: false,
    showScrollIndicator: false,
    showGradientText: false,
    showQuoteIcons: true,
    showContactIcons: true,
    showAnimatedStats: false,
    showDecorativeLines: false,
    showGlassEffects: false,
    showColorBlocking: false,
    showLargeImages: false,
    // Structural - default
    navigationComponent: "NavTop",
    layoutWrapper: "default",
    contentFlow: "vertical",
    gridSystem: "traditional",
    sectionHeight: "auto",
    navPosition: "top",
  },

  // SPLIT: Asymmetric 50/50 layout, corporate feel
  split: {
    name: "Split",
    description: "Asymmetric 50/50 layout with corporate balance",
    // Components
    heroComponent: "HeroSplit",
    servicesComponent: "ServicesAlternating",
    faqComponent: "FAQAccordion",
    pricingComponent: "PricingTable",
    galleryComponent: "GalleryGrid",
    // Animation - smooth, professional
    animationDuration: "550ms",
    animationEasing: "cubic-bezier(0.16, 1, 0.3, 1)",
    staggerDelay: "80ms",
    entryAnimation: "slide-up",
    // Variants - structured, bordered
    headerVariant: "default",
    cardStyle: "bordered",
    buttonStyle: "rounded",
    cardInteraction: "card-lift",
    buttonInteraction: "btn-scale",
    linkInteraction: "link-underline",
    imageInteraction: "img-zoom",
    formStyle: "card",
    footerVariant: "default",
    // Sections
    sectionTransition: "none",
    sectionSpacing: "large",
    // Features - moderate decoration
    showHeroImage: true,
    showDecorativeOrbs: false,
    showScrollIndicator: false,
    showGradientText: false,
    showQuoteIcons: true,
    showContactIcons: true,
    showAnimatedStats: false,
    showDecorativeLines: true,
    showGlassEffects: false,
    showColorBlocking: false,
    showLargeImages: true,
    // Structural - default
    navigationComponent: "NavTop",
    layoutWrapper: "default",
    contentFlow: "vertical",
    gridSystem: "traditional",
    sectionHeight: "auto",
    navPosition: "top",
  },

  // BOLD: High-impact, color blocking, energetic
  bold: {
    name: "Bold",
    description: "High-impact with color blocking and dynamic effects",
    // Components
    heroComponent: "HeroFullBleed",
    servicesComponent: "ServicesLarge",
    faqComponent: "FAQAccordion",
    pricingComponent: "PricingCards",
    galleryComponent: "GalleryGrid",
    // Animation - fast, bouncy
    animationDuration: "400ms",
    animationEasing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    staggerDelay: "50ms",
    entryAnimation: "scale-in-bounce",
    // Variants - strong, impactful
    headerVariant: "transparent",
    cardStyle: "bordered",
    buttonStyle: "pill",
    cardInteraction: "card-lift card-glow",
    buttonInteraction: "btn-scale btn-shine",
    linkInteraction: "link-underline",
    imageInteraction: "img-zoom",
    formStyle: "glass",
    footerVariant: "dark",
    // Sections
    sectionTransition: "angled",
    sectionSpacing: "normal",
    // Features - EVERYTHING enabled
    showHeroImage: true,
    showDecorativeOrbs: true,
    showScrollIndicator: true,
    showGradientText: true,
    showQuoteIcons: true,
    showContactIcons: true,
    showAnimatedStats: true,
    showDecorativeLines: true,
    showGlassEffects: false,
    showColorBlocking: true,
    showLargeImages: true,
    // Structural - default
    navigationComponent: "NavTop",
    layoutWrapper: "default",
    contentFlow: "vertical",
    gridSystem: "traditional",
    sectionHeight: "auto",
    navPosition: "top",
  },

  // GLASS: Frosted glass aesthetic, premium modern
  glass: {
    name: "Glass",
    description: "Premium glassmorphism with blur effects everywhere",
    // Components
    heroComponent: "HeroCentered",
    servicesComponent: "ServicesGrid",
    faqComponent: "FAQGrid",
    pricingComponent: "PricingCards",
    galleryComponent: "GalleryGrid",
    // Animation - smooth, elegant
    animationDuration: "500ms",
    animationEasing: "cubic-bezier(0.16, 1, 0.3, 1)",
    staggerDelay: "75ms",
    entryAnimation: "slide-up",
    // Variants - glass everywhere
    headerVariant: "glass",
    cardStyle: "glass",
    buttonStyle: "rounded",
    cardInteraction: "card-lift",
    buttonInteraction: "btn-scale",
    linkInteraction: "link-underline-center",
    imageInteraction: "img-zoom-subtle",
    formStyle: "glass",
    footerVariant: "default",
    // Sections
    sectionTransition: "wave",
    sectionSpacing: "normal",
    // Features - glass + gradients
    showHeroImage: true,
    showDecorativeOrbs: true,
    showScrollIndicator: false,
    showGradientText: true,
    showQuoteIcons: true,
    showContactIcons: true,
    showAnimatedStats: false,
    showDecorativeLines: true,
    showGlassEffects: true,
    showColorBlocking: false,
    showLargeImages: false,
    // Structural - default
    navigationComponent: "NavTop",
    layoutWrapper: "default",
    contentFlow: "vertical",
    gridSystem: "traditional",
    sectionHeight: "auto",
    navPosition: "top",
  },

  // MAGAZINE: Editorial, image-heavy, visual storytelling
  magazine: {
    name: "Magazine",
    description: "Editorial layout with image-first visual storytelling",
    // Components
    heroComponent: "HeroFullBleed",
    servicesComponent: "ServicesHorizontal",
    faqComponent: "FAQGrid",
    pricingComponent: "PricingSimple",
    galleryComponent: "GalleryMasonry",
    // Animation - cinematic
    animationDuration: "600ms",
    animationEasing: "cubic-bezier(0.22, 1, 0.36, 1)",
    staggerDelay: "100ms",
    entryAnimation: "fade-in",
    // Variants - editorial
    headerVariant: "transparent",
    cardStyle: "default",
    buttonStyle: "default",
    cardInteraction: "card-lift-subtle",
    buttonInteraction: "btn-scale",
    linkInteraction: "link-underline",
    imageInteraction: "img-zoom",
    formStyle: "card",
    footerVariant: "dark",
    // Sections
    sectionTransition: "fade",
    sectionSpacing: "large",
    // Features - image-focused
    showHeroImage: true,
    showDecorativeOrbs: false,
    showScrollIndicator: true,
    showGradientText: false,
    showQuoteIcons: false,
    showContactIcons: true,
    showAnimatedStats: false,
    showDecorativeLines: false,
    showGlassEffects: false,
    showColorBlocking: false,
    showLargeImages: true,
    // Structural - default
    navigationComponent: "NavTop",
    layoutWrapper: "default",
    contentFlow: "vertical",
    gridSystem: "traditional",
    sectionHeight: "auto",
    navPosition: "top",
  },

  // ============================================
  // NEW 8 STRUCTURAL LAYOUTS
  // ============================================

  // BRUTALIST: Raw, harsh typography, fixed sidebar
  brutalist: {
    name: "Brutalist",
    description: "Raw typography, thick borders, zero radius - art gallery aesthetic",
    // Components
    heroComponent: "HeroBrutalist",
    servicesComponent: "ServicesGrid",
    faqComponent: "FAQSimple",
    pricingComponent: "PricingTable",
    galleryComponent: "GalleryGrid",
    // Animation - minimal, abrupt
    animationDuration: "200ms",
    animationEasing: "linear",
    staggerDelay: "0ms",
    entryAnimation: "none",
    // Variants - raw, harsh
    headerVariant: "sidebar",
    cardStyle: "brutal",
    buttonStyle: "brutal",
    cardInteraction: "transition-colors",
    buttonInteraction: "transition-colors",
    linkInteraction: "link-underline",
    imageInteraction: "img-brightness",
    formStyle: "brutal",
    footerVariant: "sidebar",
    // Sections
    sectionTransition: "none",
    sectionSpacing: "compact",
    // Features - nothing decorative
    showHeroImage: false,
    showDecorativeOrbs: false,
    showScrollIndicator: false,
    showGradientText: false,
    showQuoteIcons: false,
    showContactIcons: false,
    showAnimatedStats: false,
    showDecorativeLines: false,
    showGlassEffects: false,
    showColorBlocking: true,
    showLargeImages: false,
    // Structural - SIDEBAR navigation
    navigationComponent: "NavSidebar",
    layoutWrapper: "sidebar",
    contentFlow: "vertical",
    gridSystem: "broken",
    sectionHeight: "auto",
    navPosition: "left",
  },

  // SIDEBAR: Fixed left sidebar, independent scroll
  sidebar: {
    name: "Sidebar",
    description: "Fixed sidebar navigation with independent scroll area",
    // Components
    heroComponent: "HeroMinimal",
    servicesComponent: "ServicesGrid",
    faqComponent: "FAQAccordion",
    pricingComponent: "PricingCards",
    galleryComponent: "GalleryGrid",
    // Animation - smooth, professional
    animationDuration: "400ms",
    animationEasing: "cubic-bezier(0.16, 1, 0.3, 1)",
    staggerDelay: "60ms",
    entryAnimation: "slide-left",
    // Variants - tech, clean
    headerVariant: "sidebar",
    cardStyle: "bordered",
    buttonStyle: "rounded",
    cardInteraction: "card-lift-subtle",
    buttonInteraction: "btn-scale",
    linkInteraction: "link-underline",
    imageInteraction: "img-zoom-subtle",
    formStyle: "card",
    footerVariant: "sidebar",
    // Sections
    sectionTransition: "fade",
    sectionSpacing: "normal",
    // Features - minimal
    showHeroImage: false,
    showDecorativeOrbs: false,
    showScrollIndicator: false,
    showGradientText: false,
    showQuoteIcons: false,
    showContactIcons: true,
    showAnimatedStats: false,
    showDecorativeLines: false,
    showGlassEffects: false,
    showColorBlocking: false,
    showLargeImages: false,
    // Structural - SIDEBAR
    navigationComponent: "NavSidebar",
    layoutWrapper: "sidebar",
    contentFlow: "vertical",
    gridSystem: "traditional",
    sectionHeight: "auto",
    navPosition: "left",
  },

  // FULLSCREEN: Snap scroll with 100vh sections
  fullscreen: {
    name: "Fullscreen",
    description: "Full viewport sections with snap scrolling - luxury experience",
    // Components
    heroComponent: "HeroFullscreen",
    servicesComponent: "ServicesFullscreen",
    faqComponent: "FAQAccordion",
    pricingComponent: "PricingCards",
    galleryComponent: "GalleryCarousel",
    // Animation - dramatic reveals
    animationDuration: "800ms",
    animationEasing: "cubic-bezier(0.22, 1, 0.36, 1)",
    staggerDelay: "150ms",
    entryAnimation: "fade-in",
    // Variants - immersive
    headerVariant: "overlay",
    cardStyle: "glass",
    buttonStyle: "pill",
    cardInteraction: "card-lift",
    buttonInteraction: "btn-scale",
    linkInteraction: "link-underline-center",
    imageInteraction: "img-zoom",
    formStyle: "glass",
    footerVariant: "minimal",
    // Sections
    sectionTransition: "snap",
    sectionSpacing: "none",
    // Features - immersive
    showHeroImage: true,
    showDecorativeOrbs: true,
    showScrollIndicator: true,
    showGradientText: true,
    showQuoteIcons: false,
    showContactIcons: true,
    showAnimatedStats: true,
    showDecorativeLines: false,
    showGlassEffects: true,
    showColorBlocking: false,
    showLargeImages: true,
    // Structural - FULLSCREEN
    navigationComponent: "NavOverlay",
    layoutWrapper: "fullscreen",
    contentFlow: "snap",
    gridSystem: "fullwidth",
    sectionHeight: "viewport",
    navPosition: "overlay",
  },

  // HORIZONTAL: Horizontal scroll layout
  horizontal: {
    name: "Horizontal",
    description: "Horizontal scrolling experience - gallery/portfolio style",
    // Components
    heroComponent: "HeroHorizontal",
    servicesComponent: "ServicesHorizontal",
    faqComponent: "FAQSimple",
    pricingComponent: "PricingSimple",
    galleryComponent: "GalleryCarousel",
    // Animation - slide transitions
    animationDuration: "500ms",
    animationEasing: "cubic-bezier(0.16, 1, 0.3, 1)",
    staggerDelay: "100ms",
    entryAnimation: "slide-left",
    // Variants - gallery-like
    headerVariant: "minimal",
    cardStyle: "default",
    buttonStyle: "rounded",
    cardInteraction: "card-lift-subtle",
    buttonInteraction: "btn-scale",
    linkInteraction: "link-underline",
    imageInteraction: "img-zoom",
    formStyle: "minimal",
    footerVariant: "minimal",
    // Sections
    sectionTransition: "none",
    sectionSpacing: "none",
    // Features - image-focused
    showHeroImage: true,
    showDecorativeOrbs: false,
    showScrollIndicator: true,
    showGradientText: false,
    showQuoteIcons: false,
    showContactIcons: false,
    showAnimatedStats: false,
    showDecorativeLines: false,
    showGlassEffects: false,
    showColorBlocking: false,
    showLargeImages: true,
    // Structural - HORIZONTAL
    navigationComponent: "NavMinimal",
    layoutWrapper: "horizontal",
    contentFlow: "horizontal",
    gridSystem: "fullwidth",
    sectionHeight: "viewport",
    navPosition: "top",
  },

  // BENTO: Multi-panel grid layout
  bento: {
    name: "Bento",
    description: "Multi-panel grid hero with varied sizes - tech/startup style",
    // Components
    heroComponent: "HeroBento",
    servicesComponent: "ServicesBento",
    faqComponent: "FAQGrid",
    pricingComponent: "PricingCards",
    galleryComponent: "GalleryGrid",
    // Animation - staggered reveal
    animationDuration: "450ms",
    animationEasing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    staggerDelay: "75ms",
    entryAnimation: "scale-in-bounce",
    // Variants - modern tech
    headerVariant: "glass",
    cardStyle: "glass",
    buttonStyle: "rounded",
    cardInteraction: "card-lift card-glow",
    buttonInteraction: "btn-scale",
    linkInteraction: "link-underline-center",
    imageInteraction: "img-zoom-subtle",
    formStyle: "glass",
    footerVariant: "default",
    // Sections
    sectionTransition: "fade",
    sectionSpacing: "normal",
    // Features - modern tech
    showHeroImage: true,
    showDecorativeOrbs: true,
    showScrollIndicator: false,
    showGradientText: true,
    showQuoteIcons: false,
    showContactIcons: true,
    showAnimatedStats: true,
    showDecorativeLines: false,
    showGlassEffects: true,
    showColorBlocking: false,
    showLargeImages: false,
    // Structural - BENTO
    navigationComponent: "NavTop",
    layoutWrapper: "default",
    contentFlow: "vertical",
    gridSystem: "bento",
    sectionHeight: "auto",
    navPosition: "top",
  },

  // STORYTELLING: Chapter-based progression
  storytelling: {
    name: "Storytelling",
    description: "Chapter dots navigation with story progression - nonprofit/founder style",
    // Components
    heroComponent: "HeroChapter",
    servicesComponent: "ServicesTimeline",
    faqComponent: "FAQAccordion",
    pricingComponent: "PricingSimple",
    galleryComponent: "GalleryMasonry",
    // Animation - narrative reveals
    animationDuration: "700ms",
    animationEasing: "cubic-bezier(0.22, 1, 0.36, 1)",
    staggerDelay: "200ms",
    entryAnimation: "fade-in",
    // Variants - storytelling
    headerVariant: "transparent",
    cardStyle: "default",
    buttonStyle: "default",
    cardInteraction: "card-lift-subtle",
    buttonInteraction: "transition-colors",
    linkInteraction: "link-underline",
    imageInteraction: "img-zoom",
    formStyle: "default",
    footerVariant: "default",
    // Sections
    sectionTransition: "fade",
    sectionSpacing: "large",
    // Features - story-focused
    showHeroImage: true,
    showDecorativeOrbs: false,
    showScrollIndicator: false,
    showGradientText: false,
    showQuoteIcons: true,
    showContactIcons: true,
    showAnimatedStats: false,
    showDecorativeLines: true,
    showGlassEffects: false,
    showColorBlocking: false,
    showLargeImages: true,
    // Structural - CHAPTER navigation
    navigationComponent: "NavChapter",
    layoutWrapper: "default",
    contentFlow: "vertical",
    gridSystem: "traditional",
    sectionHeight: "auto",
    navPosition: "right",
  },

  // BOTTOMNAV: Mobile-style bottom navigation
  bottomnav: {
    name: "Bottom Nav",
    description: "Fixed bottom bar with card stacking - youth/app style",
    // Components
    heroComponent: "HeroCentered",
    servicesComponent: "ServicesCards",
    faqComponent: "FAQSimple",
    pricingComponent: "PricingCards",
    galleryComponent: "GalleryGrid",
    // Animation - playful, bouncy
    animationDuration: "350ms",
    animationEasing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    staggerDelay: "50ms",
    entryAnimation: "scale-in-bounce",
    // Variants - app-like
    headerVariant: "bottom",
    cardStyle: "default",
    buttonStyle: "pill",
    cardInteraction: "card-lift",
    buttonInteraction: "btn-scale",
    linkInteraction: "link-underline-center",
    imageInteraction: "img-zoom-subtle",
    formStyle: "card",
    footerVariant: "minimal",
    // Sections
    sectionTransition: "none",
    sectionSpacing: "compact",
    // Features - playful
    showHeroImage: true,
    showDecorativeOrbs: true,
    showScrollIndicator: false,
    showGradientText: true,
    showQuoteIcons: false,
    showContactIcons: true,
    showAnimatedStats: true,
    showDecorativeLines: false,
    showGlassEffects: false,
    showColorBlocking: true,
    showLargeImages: false,
    // Structural - BOTTOM navigation
    navigationComponent: "NavBottom",
    layoutWrapper: "default",
    contentFlow: "cards",
    gridSystem: "traditional",
    sectionHeight: "auto",
    navPosition: "bottom",
  },

  // MASONRY: Pinterest-style masonry grid
  masonry: {
    name: "Masonry",
    description: "Continuous masonry flow with sticky filters - photography/fashion style",
    // Components
    heroComponent: "HeroMinimal",
    servicesComponent: "ServicesMasonry",
    faqComponent: "FAQGrid",
    pricingComponent: "PricingSimple",
    galleryComponent: "GalleryMasonry",
    // Animation - staggered flow
    animationDuration: "400ms",
    animationEasing: "ease-out",
    staggerDelay: "50ms",
    entryAnimation: "fade-in",
    // Variants - gallery-like
    headerVariant: "default",
    cardStyle: "default",
    buttonStyle: "rounded",
    cardInteraction: "card-lift-subtle",
    buttonInteraction: "btn-scale",
    linkInteraction: "link-underline",
    imageInteraction: "img-zoom",
    formStyle: "minimal",
    footerVariant: "minimal",
    // Sections
    sectionTransition: "none",
    sectionSpacing: "compact",
    // Features - image-focused
    showHeroImage: false,
    showDecorativeOrbs: false,
    showScrollIndicator: false,
    showGradientText: false,
    showQuoteIcons: false,
    showContactIcons: true,
    showAnimatedStats: false,
    showDecorativeLines: false,
    showGlassEffects: false,
    showColorBlocking: false,
    showLargeImages: true,
    // Structural - MASONRY
    navigationComponent: "NavTop",
    layoutWrapper: "masonry",
    contentFlow: "continuous",
    gridSystem: "masonry",
    sectionHeight: "auto",
    navPosition: "top",
  },
};

// Context type
interface LayoutContextType {
  layout: LayoutProfile;
  config: LayoutConfig;
  setLayout: (layout: LayoutProfile) => void;
}

// Create context
const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

// Provider component
export function LayoutProvider({ children }: { children: ReactNode }) {
  const [layout, setLayoutState] = useState<LayoutProfile>("classic");

  // Load saved layout on mount
  useEffect(() => {
    const saved = localStorage.getItem("layout-profile") as LayoutProfile;
    if (saved && layoutConfigs[saved]) {
      setLayoutState(saved);
      applyLayoutCSS(saved);
    } else {
      applyLayoutCSS("classic");
    }
  }, []);

  // Apply CSS variables for layout
  const applyLayoutCSS = (layoutKey: LayoutProfile) => {
    const config = layoutConfigs[layoutKey];
    const root = document.documentElement;

    // Set layout-specific CSS variables
    root.style.setProperty("--layout-animation-duration", config.animationDuration);
    root.style.setProperty("--layout-animation-easing", config.animationEasing);
    root.style.setProperty("--layout-stagger-delay", config.staggerDelay);

    // Set layout class on root for CSS-based styling
    root.setAttribute("data-layout", layoutKey);

    // Set additional structural data attributes
    root.setAttribute("data-nav-position", config.navPosition);
    root.setAttribute("data-content-flow", config.contentFlow);
    root.setAttribute("data-layout-wrapper", config.layoutWrapper);
  };

  // Set layout and persist
  const setLayout = (newLayout: LayoutProfile) => {
    setLayoutState(newLayout);
    applyLayoutCSS(newLayout);
    localStorage.setItem("layout-profile", newLayout);
  };

  return (
    <LayoutContext.Provider
      value={{
        layout,
        config: layoutConfigs[layout],
        setLayout,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}

// Hook to use layout context
export function useLayout() {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return context;
}

// Hook that returns layout config with fallback (for SSR safety)
export function useLayoutConfig(): LayoutConfig {
  const context = useContext(LayoutContext);
  // Return classic as default for SSR or when outside provider
  return context?.config ?? layoutConfigs.classic;
}

// Hook that returns just the profile name
export function useLayoutProfile(): LayoutProfile {
  const context = useContext(LayoutContext);
  return context?.layout ?? "classic";
}

// Helper to get component for current layout
export function getHeroComponent(layout: LayoutProfile): HeroComponent {
  return layoutConfigs[layout].heroComponent;
}

export function getServicesComponent(layout: LayoutProfile): ServicesComponent {
  return layoutConfigs[layout].servicesComponent;
}

export function getFAQComponent(layout: LayoutProfile): FAQComponent {
  return layoutConfigs[layout].faqComponent;
}

export function getPricingComponent(layout: LayoutProfile): PricingComponent {
  return layoutConfigs[layout].pricingComponent;
}

export function getGalleryComponent(layout: LayoutProfile): GalleryComponent {
  return layoutConfigs[layout].galleryComponent;
}

// Helper to check if layout uses sidebar navigation
export function usesSidebarNav(layout: LayoutProfile): boolean {
  return layoutConfigs[layout].navPosition === "left";
}

// Helper to check if layout uses bottom navigation
export function usesBottomNav(layout: LayoutProfile): boolean {
  return layoutConfigs[layout].navPosition === "bottom";
}

// Helper to check if layout uses fullscreen sections
export function usesFullscreenSections(layout: LayoutProfile): boolean {
  return layoutConfigs[layout].sectionHeight === "viewport";
}

// Helper to check if layout uses horizontal scroll
export function usesHorizontalScroll(layout: LayoutProfile): boolean {
  return layoutConfigs[layout].contentFlow === "horizontal";
}

// Helper to get navigation component for a layout
export function getNavigationComponent(layout: LayoutProfile): NavigationComponent {
  return layoutConfigs[layout].navigationComponent;
}

// Helper to get layout wrapper type for a layout
export function getLayoutWrapper(layout: LayoutProfile): LayoutWrapper {
  return layoutConfigs[layout].layoutWrapper;
}

export default LayoutContext;
