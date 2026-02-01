"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface HeroChapterProps {
  headline: string;
  subheadline: string;
  primaryCTA: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  backgroundImage?: string;
  backgroundImageAlt?: string;
  chapterNumber?: string;
  chapterTitle?: string;
}

/**
 * HeroChapter - Chapter 1 opening for storytelling layouts
 * Story-driven design with chapter indicator
 * Used by: Storytelling layout
 */
export default function HeroChapter({
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
  backgroundImage = "https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=1920",
  backgroundImageAlt = "Chapter opening",
  chapterNumber = "01",
  chapterTitle = "Introduction",
}: HeroChapterProps) {
  return (
    <section
      id="hero"
      className="chapter-section relative min-h-screen flex items-center"
    >
      {/* Chapter Number Watermark */}
      <div className="chapter-number">
        {chapterNumber}
      </div>

      {/* Background Image (right side) */}
      <div className="absolute top-0 right-0 w-full md:w-1/2 h-full">
        {backgroundImage && (
          <>
            <Image
              src={backgroundImage}
              alt={backgroundImageAlt}
              fill
              className="object-cover"
              priority
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />
          </>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-8">
        <div className="max-w-2xl">
          {/* Chapter Indicator */}
          <div
            className={cn(
              "flex items-center gap-4 mb-8",
              "layout-entry animate-fade-in"
            )}
          >
            <span className="text-sm font-medium text-primary tracking-widest uppercase">
              Chapter {chapterNumber}
            </span>
            <div className="h-px flex-1 max-w-20 bg-primary/50" />
            <span className="text-sm text-muted-foreground">
              {chapterTitle}
            </span>
          </div>

          {/* Headline */}
          <h1
            className={cn(
              "chapter-title",
              "text-foreground leading-tight",
              "layout-entry animate-fade-in animation-delay-100"
            )}
          >
            {headline}
          </h1>

          {/* Subheadline */}
          <p
            className={cn(
              "text-lg md:text-xl text-muted-foreground mb-10 max-w-lg leading-relaxed",
              "layout-entry animate-fade-in animation-delay-200"
            )}
          >
            {subheadline}
          </p>

          {/* Decorative Line */}
          <div
            className={cn(
              "w-16 h-1 bg-primary mb-10",
              "layout-entry animate-fade-in animation-delay-300"
            )}
          />

          {/* CTAs */}
          <div
            className={cn(
              "flex flex-col sm:flex-row gap-4",
              "layout-entry animate-fade-in animation-delay-400"
            )}
          >
            <Link
              href={primaryCTA.href}
              className={cn(
                "px-8 py-4 rounded-lg text-lg font-semibold",
                "bg-primary text-primary-foreground",
                "hover:bg-primary/90 transition-colors duration-300"
              )}
            >
              {primaryCTA.label}
            </Link>
            {secondaryCTA && (
              <Link
                href={secondaryCTA.href}
                className={cn(
                  "px-8 py-4 rounded-lg text-lg font-semibold",
                  "border border-border",
                  "hover:bg-muted transition-colors duration-300"
                )}
              >
                {secondaryCTA.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
