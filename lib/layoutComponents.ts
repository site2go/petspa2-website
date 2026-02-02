/**
 * Dynamic Component Loader for Layout System
 *
 * This module provides dynamic imports for all Hero and Services component variants,
 * enabling the layout system to render different components based on the active layout.
 */

import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type {
  HeroComponent,
  ServicesComponent,
  GalleryComponent,
  ComparisonComponent,
  TeamComponent,
} from "@/components/LayoutContext";

// ============================================
// HERO COMPONENT TYPES
// ============================================

interface HeroBaseProps {
  headline: string;
  subheadline: string;
  primaryCTA: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
}

interface HeroWithImageProps extends HeroBaseProps {
  backgroundImage?: string;
  backgroundImageAlt?: string;
}

interface HeroBentoProps extends HeroBaseProps {
  images?: {
    main?: string;
    secondary?: string;
    tertiary?: string;
  };
  stats?: Array<{ value: string; label: string }>;
}

interface HeroChapterProps extends HeroWithImageProps {
  chapterNumber?: string;
  chapterTitle?: string;
}

// Union of all hero props for generic typing
export type HeroProps = HeroBaseProps & Partial<HeroWithImageProps> & Partial<HeroBentoProps> & Partial<HeroChapterProps>;

// ============================================
// SERVICES COMPONENT TYPES
// ============================================

interface ServiceItem {
  title: string;
  description: string;
  icon: React.ElementType;
  featured?: boolean;
  image?: string;
}

interface ServicesBaseProps {
  title: string;
  subtitle?: string;
  services: ServiceItem[];
}

interface ServicesTimelineProps extends ServicesBaseProps {
  chapterNumber?: string;
}

// Union of all services props for generic typing
export type ServicesProps = ServicesBaseProps & Partial<ServicesTimelineProps>;

// ============================================
// GALLERY COMPONENT TYPES
// ============================================

interface GalleryItem {
  src: string;
  alt: string;
  caption?: string;
  category?: string;
}

interface GalleryBaseProps {
  title: string;
  subtitle?: string;
  items: GalleryItem[];
  categories?: string[];
}

// Union of all gallery props for generic typing
export type GalleryProps = GalleryBaseProps;

// ============================================
// COMPARISON COMPONENT TYPES
// ============================================

interface BeforeAfterItem {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  caption?: string;
  category?: string;
}

interface ComparisonBaseProps {
  title: string;
  subtitle?: string;
  items: BeforeAfterItem[];
  categories?: string[];
  variant?: "grid" | "carousel";
}

// Union of all comparison props for generic typing
export type ComparisonProps = ComparisonBaseProps;

// ============================================
// TEAM COMPONENT TYPES
// ============================================

interface SocialLink {
  platform: string;
  url: string;
}

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio?: string;
  social?: SocialLink[];
  specialties?: string[];
}

interface TeamBaseProps {
  title: string;
  subtitle?: string;
  members: TeamMember[];
  variant?: "grid" | "carousel" | "featured";
}

// Union of all team props for generic typing
export type TeamProps = TeamBaseProps;

// ============================================
// HERO CAROUSEL COMPONENT TYPES
// ============================================

interface HeroSlide {
  headline: string;
  subheadline?: string;
  backgroundImage: string;
  backgroundImageAlt?: string;
  cta?: { label: string; href: string };
}

interface HeroCarouselBaseProps {
  slides: HeroSlide[];
  autoPlay?: boolean;
  interval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  overlayOpacity?: number;
}

export type HeroCarouselProps = HeroCarouselBaseProps;

// ============================================
// HERO COMPONENTS DYNAMIC IMPORTS
// ============================================

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const heroComponents: Record<HeroComponent, ComponentType<any>> = {
  // Original 4 hero components
  HeroMinimal: dynamic(() => import("@/components/Hero/HeroMinimal"), {
    loading: () => null,
    ssr: false,
  }),
  HeroCentered: dynamic(() => import("@/components/Hero/HeroCentered"), {
    loading: () => null,
    ssr: false,
  }),
  HeroSplit: dynamic(() => import("@/components/Hero/HeroSplit"), {
    loading: () => null,
    ssr: false,
  }),
  HeroFullBleed: dynamic(() => import("@/components/Hero/HeroFullBleed"), {
    loading: () => null,
    ssr: false,
  }),
  // New 5 hero components for structural layouts
  HeroBrutalist: dynamic(() => import("@/components/Hero/HeroBrutalist"), {
    loading: () => null,
    ssr: false,
  }),
  HeroBento: dynamic(() => import("@/components/Hero/HeroBento"), {
    loading: () => null,
    ssr: false,
  }),
  HeroFullscreen: dynamic(() => import("@/components/Hero/HeroFullscreen"), {
    loading: () => null,
    ssr: false,
  }),
  HeroHorizontal: dynamic(() => import("@/components/Hero/HeroHorizontal"), {
    loading: () => null,
    ssr: false,
  }),
  HeroChapter: dynamic(() => import("@/components/Hero/HeroChapter"), {
    loading: () => null,
    ssr: false,
  }),
};

// ============================================
// SERVICES COMPONENTS DYNAMIC IMPORTS
// ============================================

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const servicesComponents: Record<ServicesComponent, ComponentType<any>> = {
  // Original 4 services components
  ServicesGrid: dynamic(() => import("@/components/Services/ServicesGrid"), {
    loading: () => null,
    ssr: false,
  }),
  ServicesAlternating: dynamic(() => import("@/components/Services/ServicesAlternating"), {
    loading: () => null,
    ssr: false,
  }),
  ServicesLarge: dynamic(() => import("@/components/Services/ServicesLarge"), {
    loading: () => null,
    ssr: false,
  }),
  ServicesHorizontal: dynamic(() => import("@/components/Services/ServicesHorizontal"), {
    loading: () => null,
    ssr: false,
  }),
  // New 5 services components for structural layouts
  ServicesBento: dynamic(() => import("@/components/Services/ServicesBento"), {
    loading: () => null,
    ssr: false,
  }),
  ServicesCards: dynamic(() => import("@/components/Services/ServicesCards"), {
    loading: () => null,
    ssr: false,
  }),
  ServicesMasonry: dynamic(() => import("@/components/Services/ServicesMasonry"), {
    loading: () => null,
    ssr: false,
  }),
  ServicesFullscreen: dynamic(() => import("@/components/Services/ServicesFullscreen"), {
    loading: () => null,
    ssr: false,
  }),
  ServicesTimeline: dynamic(() => import("@/components/Services/ServicesTimeline"), {
    loading: () => null,
    ssr: false,
  }),
};

// ============================================
// GALLERY COMPONENTS DYNAMIC IMPORTS
// ============================================

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const galleryComponents: Record<GalleryComponent, ComponentType<any>> = {
  GalleryGrid: dynamic(() => import("@/components/Gallery/GalleryGrid"), {
    loading: () => null,
    ssr: false,
  }),
  GalleryMasonry: dynamic(() => import("@/components/Gallery/GalleryMasonry"), {
    loading: () => null,
    ssr: false,
  }),
  GalleryCarousel: dynamic(() => import("@/components/Gallery/GalleryCarousel"), {
    loading: () => null,
    ssr: false,
  }),
};

// ============================================
// COMPARISON COMPONENTS DYNAMIC IMPORTS
// ============================================

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const comparisonComponents: Record<ComparisonComponent, ComponentType<any>> = {
  BeforeAfterSlider: dynamic(() => import("@/components/Comparison/BeforeAfterGallery"), {
    loading: () => null,
    ssr: false,
  }),
  BeforeAfterGallery: dynamic(() => import("@/components/Comparison/BeforeAfterGallery"), {
    loading: () => null,
    ssr: false,
  }),
};

// ============================================
// TEAM COMPONENTS DYNAMIC IMPORTS
// ============================================

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const teamComponents: Record<TeamComponent, ComponentType<any>> = {
  TeamShowcase: dynamic(() => import("@/components/Team/TeamShowcase"), {
    loading: () => null,
    ssr: false,
  }),
  // TeamCarousel and TeamFeatured use the same component - variant is passed via props
  TeamCarousel: dynamic(() => import("@/components/Team/TeamShowcase"), {
    loading: () => null,
    ssr: false,
  }),
  TeamFeatured: dynamic(() => import("@/components/Team/TeamShowcase"), {
    loading: () => null,
    ssr: false,
  }),
};

// ============================================
// HERO CAROUSEL COMPONENT DYNAMIC IMPORT
// ============================================

const HeroCarouselComponent: ComponentType<HeroCarouselProps> = dynamic(
  () => import("@/components/Hero/HeroCarousel"),
  { loading: () => null, ssr: false }
);

// ============================================
// GETTER FUNCTIONS
// ============================================

/**
 * Get the Hero component for a given layout hero type
 * Falls back to HeroCentered if the specified component is not found
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getHeroComponent(name: HeroComponent): ComponentType<any> {
  return heroComponents[name] || heroComponents.HeroCentered;
}

/**
 * Get the Services component for a given layout services type
 * Falls back to ServicesGrid if the specified component is not found
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getServicesComponent(name: ServicesComponent): ComponentType<any> {
  return servicesComponents[name] || servicesComponents.ServicesGrid;
}

/**
 * Get the Gallery component for a given layout gallery type
 * Falls back to GalleryGrid if the specified component is not found
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getGalleryComponent(name: GalleryComponent): ComponentType<any> {
  return galleryComponents[name] || galleryComponents.GalleryGrid;
}

/**
 * Check if a hero component exists
 */
export function hasHeroComponent(name: string): name is HeroComponent {
  return name in heroComponents;
}

/**
 * Check if a services component exists
 */
export function hasServicesComponent(name: string): name is ServicesComponent {
  return name in servicesComponents;
}

/**
 * Check if a gallery component exists
 */
export function hasGalleryComponent(name: string): name is GalleryComponent {
  return name in galleryComponents;
}

/**
 * Get all available hero component names
 */
export function getAvailableHeroComponents(): HeroComponent[] {
  return Object.keys(heroComponents) as HeroComponent[];
}

/**
 * Get all available services component names
 */
export function getAvailableServicesComponents(): ServicesComponent[] {
  return Object.keys(servicesComponents) as ServicesComponent[];
}

/**
 * Get all available gallery component names
 */
export function getAvailableGalleryComponents(): GalleryComponent[] {
  return Object.keys(galleryComponents) as GalleryComponent[];
}

// ============================================
// COMPARISON COMPONENT GETTERS
// ============================================

/**
 * Get the Comparison component for a given comparison type
 * Falls back to BeforeAfterGallery if the specified component is not found
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getComparisonComponent(name: ComparisonComponent): ComponentType<any> {
  return comparisonComponents[name] || comparisonComponents.BeforeAfterGallery;
}

/**
 * Check if a comparison component exists
 */
export function hasComparisonComponent(name: string): name is ComparisonComponent {
  return name in comparisonComponents;
}

/**
 * Get all available comparison component names
 */
export function getAvailableComparisonComponents(): ComparisonComponent[] {
  return Object.keys(comparisonComponents) as ComparisonComponent[];
}

// ============================================
// TEAM COMPONENT GETTERS
// ============================================

/**
 * Get the Team component for a given team type
 * Falls back to TeamShowcase if the specified component is not found
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getTeamComponent(name: TeamComponent): ComponentType<any> {
  return teamComponents[name] || teamComponents.TeamShowcase;
}

/**
 * Check if a team component exists
 */
export function hasTeamComponent(name: string): name is TeamComponent {
  return name in teamComponents;
}

/**
 * Get all available team component names
 */
export function getAvailableTeamComponents(): TeamComponent[] {
  return Object.keys(teamComponents) as TeamComponent[];
}

// ============================================
// HERO CAROUSEL GETTER
// ============================================

/**
 * Get the HeroCarousel component
 */
export function getHeroCarouselComponent(): ComponentType<HeroCarouselProps> {
  return HeroCarouselComponent;
}

export default {
  getHeroComponent,
  getServicesComponent,
  getGalleryComponent,
  getComparisonComponent,
  getTeamComponent,
  getHeroCarouselComponent,
};
