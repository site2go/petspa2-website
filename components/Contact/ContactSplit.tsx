"use client";

import { useState } from "react";
import { useLayoutConfig } from "@/components/LayoutContext";
import { useScrollAnimation } from "@/components/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";

interface ContactInfo {
  phone?: string;
  email?: string;
  address?: string;
  hours?: string;
}

interface ContactSplitProps {
  title: string;
  description?: string;
  contactInfo?: ContactInfo;
  formLabels?: {
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
    submit?: string;
    success?: string;
  };
}

/**
 * ContactSplit - Split layout with form and contact info
 * Clean, organized display of contact information
 * Used by: Glass, Classic, Minimal layouts
 */
export default function ContactSplit({
  title,
  description,
  contactInfo,
  formLabels = {},
}: ContactSplitProps) {
  const config = useLayoutConfig();
  const { ref: sectionRef, isInView } = useScrollAnimation<HTMLDivElement>();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const labels = {
    name: formLabels.name || "Nume",
    email: formLabels.email || "Email",
    phone: formLabels.phone || "Telefon",
    message: formLabels.message || "Mesaj",
    submit: formLabels.submit || "Trimite Mesajul",
    success: formLabels.success || "Mesajul a fost trimis cu succes! Va vom contacta in curand.",
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormState({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div
          ref={sectionRef}
          className={cn(
            "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 layout-entry",
            isInView && "in-view"
          )}
        >
          {/* Contact Info */}
          <div>
            {config.showDecorativeLines && (
              <div className="decorative-line mb-6" />
            )}

            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">
              {title}
            </h2>

            {description && (
              <p className="text-muted-foreground text-lg mb-8">
                {description}
              </p>
            )}

            {/* Contact Details */}
            {contactInfo && (
              <div className="space-y-6">
                {contactInfo.phone && (
                  <a
                    href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                    className={cn(
                      "flex items-center gap-4 group",
                      config.linkInteraction
                    )}
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Telefon</div>
                      <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {contactInfo.phone}
                      </div>
                    </div>
                  </a>
                )}

                {contactInfo.email && (
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className={cn(
                      "flex items-center gap-4 group",
                      config.linkInteraction
                    )}
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Email</div>
                      <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {contactInfo.email}
                      </div>
                    </div>
                  </a>
                )}

                {contactInfo.address && (
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Adresa</div>
                      <div className="font-medium text-foreground">
                        {contactInfo.address}
                      </div>
                    </div>
                  </div>
                )}

                {contactInfo.hours && (
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Program</div>
                      <div className="font-medium text-foreground">
                        {contactInfo.hours}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Contact Form */}
          <div
            className={cn(
              "bg-card rounded-2xl p-6 md:p-8 shadow-soft",
              config.cardStyle === "glass" && "glass-card",
              config.cardStyle === "bordered" && "border-2 border-border"
            )}
          >
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
                  Multumim!
                </h3>
                <p className="text-muted-foreground">
                  {labels.success}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    {labels.name} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className={cn(
                      "w-full px-4 py-3 rounded-lg border border-input bg-background",
                      "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
                      "transition-all"
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      {labels.email} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className={cn(
                        "w-full px-4 py-3 rounded-lg border border-input bg-background",
                        "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
                        "transition-all"
                      )}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      {labels.phone}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formState.phone}
                      onChange={handleChange}
                      className={cn(
                        "w-full px-4 py-3 rounded-lg border border-input bg-background",
                        "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
                        "transition-all"
                      )}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    {labels.message} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className={cn(
                      "w-full px-4 py-3 rounded-lg border border-input bg-background resize-none",
                      "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
                      "transition-all"
                    )}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "w-full flex items-center justify-center gap-2 px-6 py-4 rounded-lg",
                    "bg-primary text-primary-foreground font-semibold",
                    "hover:bg-primary/90 transition-all",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    config.buttonInteraction
                  )}
                >
                  {isSubmitting ? (
                    <span>Se trimite...</span>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>{labels.submit}</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
