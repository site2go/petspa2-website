"use client";

import Link from "next/link";
import { useLayoutConfig } from "@/components/LayoutContext";
import { cn } from "@/lib/utils";
import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";

interface SocialLink {
  platform: "facebook" | "instagram" | "twitter" | "linkedin";
  url: string;
}

interface FooterSimpleProps {
  logo: string;
  tagline?: string;
  copyright?: string;
  links?: Array<{ label: string; href: string }>;
  contactInfo?: {
    phone?: string;
    email?: string;
    address?: string;
  };
  socialLinks?: SocialLink[];
}

/**
 * FooterSimple - Clean, minimal footer
 * Logo, links, contact info, and social links
 * Used by: Minimal, Glass, Classic layouts
 */
export default function FooterSimple({
  logo,
  tagline,
  copyright,
  links = [],
  contactInfo,
  socialLinks = [],
}: FooterSimpleProps) {
  const config = useLayoutConfig();
  const currentYear = new Date().getFullYear();

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case "facebook":
        return Facebook;
      case "instagram":
        return Instagram;
      default:
        return null;
    }
  };

  return (
    <footer className="bg-foreground text-background py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo & Tagline */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="font-heading font-bold text-2xl text-background inline-block mb-4"
            >
              {logo}
            </Link>
            {tagline && (
              <p className="text-background/70 text-lg max-w-md">
                {tagline}
              </p>
            )}

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="flex gap-4 mt-6">
                {socialLinks.map((social) => {
                  const Icon = getSocialIcon(social.platform);
                  if (!Icon) return null;

                  return (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "w-10 h-10 rounded-full bg-background/10 flex items-center justify-center",
                        "hover:bg-background/20 transition-colors",
                        config.buttonInteraction
                      )}
                      aria-label={`Follow us on ${social.platform}`}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick Links */}
          {links.length > 0 && (
            <div>
              <h3 className="font-heading font-semibold text-lg mb-4">
                Navigare
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "text-background/70 hover:text-background transition-colors",
                        config.linkInteraction
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Contact Info */}
          {contactInfo && (
            <div>
              <h3 className="font-heading font-semibold text-lg mb-4">
                Contact
              </h3>
              <ul className="space-y-3">
                {contactInfo.phone && (
                  <li>
                    <a
                      href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                      className={cn(
                        "flex items-center gap-3 text-background/70 hover:text-background transition-colors",
                        config.linkInteraction
                      )}
                    >
                      <Phone className="w-4 h-4" />
                      <span>{contactInfo.phone}</span>
                    </a>
                  </li>
                )}
                {contactInfo.email && (
                  <li>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className={cn(
                        "flex items-center gap-3 text-background/70 hover:text-background transition-colors",
                        config.linkInteraction
                      )}
                    >
                      <Mail className="w-4 h-4" />
                      <span>{contactInfo.email}</span>
                    </a>
                  </li>
                )}
                {contactInfo.address && (
                  <li className="flex items-start gap-3 text-background/70">
                    <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                    <span>{contactInfo.address}</span>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-background/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-background/50 text-sm">
              {currentYear} {copyright || `${logo}. Toate drepturile rezervate.`}
            </p>
            <p className="text-background/30 text-xs">
              Website creat cu grija pentru animalele tale
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
