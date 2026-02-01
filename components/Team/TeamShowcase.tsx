"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useLayoutConfig } from "@/components/LayoutContext";
import { useScrollAnimation, useStaggeredAnimation } from "@/components/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

interface TeamShowcaseProps {
  title: string;
  subtitle?: string;
  members: TeamMember[];
  variant?: "grid" | "carousel" | "featured";
}

/**
 * TeamShowcase - Staff/expertise display
 * Grid, carousel, or featured variants
 * High-value for: service businesses (65%+ competitor usage)
 */
export default function TeamShowcase({
  title,
  subtitle,
  members,
  variant = "grid",
}: TeamShowcaseProps) {
  const config = useLayoutConfig();
  const { ref: headerRef, isInView: headerInView } = useScrollAnimation();
  const { containerRef, getItemProps } = useStaggeredAnimation(members.length);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [expandedMember, setExpandedMember] = useState<number | null>(null);

  // Social icons mapping
  const getSocialIcon = (platform: string) => {
    const icons: Record<string, string> = {
      linkedin: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
      instagram: "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z",
      twitter: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
      facebook: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
    };
    return icons[platform.toLowerCase()] || null;
  };

  // Scroll handlers for carousel
  const scrollBy = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.8;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section id="team" className="py-20 md:py-28 bg-muted">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div
          ref={headerRef as React.RefObject<HTMLDivElement>}
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

        {/* Grid Variant */}
        {variant === "grid" && (
          <div
            ref={containerRef as React.RefObject<HTMLDivElement>}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
          >
            {members.map((member, index) => {
              const { isInView, style } = getItemProps(index);

              return (
                <div
                  key={member.name}
                  style={style}
                  className={cn(
                    "group layout-entry",
                    isInView && "in-view"
                  )}
                >
                  <div
                    className={cn(
                      "bg-card rounded-xl overflow-hidden card-layout-interactive shadow-soft",
                      config.cardStyle === "glass" && "glass-card",
                      config.cardStyle === "bordered" && "border-2 border-border"
                    )}
                  >
                    {/* Image */}
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className={cn(
                          "object-cover transition-transform duration-500",
                          "group-hover:scale-105",
                          config.imageInteraction
                        )}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        unoptimized
                      />
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                      {/* Social links on hover */}
                      {member.social && member.social.length > 0 && (
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          {member.social.map((link) => {
                            const iconPath = getSocialIcon(link.platform);
                            if (!iconPath) return null;

                            return (
                              <a
                                key={link.platform}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors"
                              >
                                <svg
                                  className="w-5 h-5 text-foreground"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                >
                                  <path d={iconPath} />
                                </svg>
                              </a>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-5">
                      <h3 className="font-heading font-semibold text-lg text-foreground">
                        {member.name}
                      </h3>
                      <p className="text-primary text-sm font-medium mb-2">
                        {member.role}
                      </p>

                      {/* Specialties */}
                      {member.specialties && member.specialties.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {member.specialties.slice(0, 3).map((specialty) => (
                            <span
                              key={specialty}
                              className="px-2 py-0.5 rounded-full text-xs bg-muted text-muted-foreground"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Bio (expandable) */}
                      {member.bio && (
                        <div className="mt-3">
                          <p
                            className={cn(
                              "text-muted-foreground text-sm",
                              expandedMember !== index && "line-clamp-2"
                            )}
                          >
                            {member.bio}
                          </p>
                          {member.bio.length > 100 && (
                            <button
                              onClick={() =>
                                setExpandedMember(
                                  expandedMember === index ? null : index
                                )
                              }
                              className="text-primary text-sm mt-1 hover:underline"
                            >
                              {expandedMember === index ? "Show less" : "Read more"}
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Carousel Variant */}
        {variant === "carousel" && (
          <div className="relative">
            {/* Navigation */}
            <div className="hidden md:flex absolute -top-16 right-0 gap-2">
              <button
                onClick={() => scrollBy("left")}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => scrollBy("right")}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
            >
              {members.map((member, index) => (
                <div
                  key={member.name}
                  className="flex-shrink-0 w-[280px] md:w-[320px] snap-start"
                >
                  <div
                    className={cn(
                      "bg-card rounded-xl overflow-hidden card-layout-interactive shadow-soft h-full",
                      config.cardStyle === "glass" && "glass-card",
                      config.cardStyle === "bordered" && "border-2 border-border"
                    )}
                  >
                    <div className="relative aspect-[3/4]">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                        sizes="320px"
                        unoptimized
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-heading font-semibold text-lg text-foreground">
                        {member.name}
                      </h3>
                      <p className="text-primary text-sm font-medium">
                        {member.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Featured Variant */}
        {variant === "featured" && members.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Featured Member (Large) */}
            <div className="lg:col-span-5">
              <div
                className={cn(
                  "bg-card rounded-xl overflow-hidden shadow-soft h-full",
                  config.cardStyle === "glass" && "glass-card",
                  config.cardStyle === "bordered" && "border-2 border-border"
                )}
              >
                <div className="relative aspect-[3/4]">
                  <Image
                    src={members[0].image}
                    alt={members[0].name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    unoptimized
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-heading font-bold text-2xl text-foreground">
                    {members[0].name}
                  </h3>
                  <p className="text-primary font-medium mb-3">
                    {members[0].role}
                  </p>
                  {members[0].bio && (
                    <p className="text-muted-foreground">{members[0].bio}</p>
                  )}
                  {members[0].specialties && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {members[0].specialties.map((specialty) => (
                        <span
                          key={specialty}
                          className="px-3 py-1 rounded-full text-sm bg-primary/10 text-primary"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Other Members (Grid) */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {members.slice(1).map((member) => (
                  <div
                    key={member.name}
                    className={cn(
                      "bg-card rounded-xl overflow-hidden card-layout-interactive shadow-soft",
                      config.cardStyle === "glass" && "glass-card",
                      config.cardStyle === "bordered" && "border-2 border-border"
                    )}
                  >
                    <div className="relative aspect-square">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 20vw"
                        unoptimized
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-heading font-semibold text-foreground">
                        {member.name}
                      </h3>
                      <p className="text-primary text-sm">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
