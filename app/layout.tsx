import type { Metadata } from "next";
import { Nunito, Open_Sans } from "next/font/google";
import "./globals.css";
import { LayoutProvider } from "@/components/LayoutContext";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import LayoutSwitcher from "@/components/LayoutSwitcher";
import { SkipLink } from "@/components/accessibility/SkipLink";
import { JsonLd, generateOrganizationSchema, generateWebSiteSchema, generateLocalBusinessSchema } from "@/app/seo/JsonLd";

// Configure fonts from brand.json - Nunito (heading) + Open Sans (body)
const fontSans = Open_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
});

const fontHeading = Nunito({
  subsets: ["latin", "latin-ext"],
  variable: "--font-heading",
});

// PetSPA2 metadata from content.json
export const metadata: Metadata = {
  title: "PetSPA2 - Salon Profesional de Grooming pentru Caini si Pisici",
  description: "Servicii profesionale de grooming pentru animalele tale de companie. Toaletaj complet, baie, tuns, tratamente SPA. Programari si preturi accesibile.",
  keywords: ["salon grooming", "frizerie canina", "cosmetica canina", "toaletaj canin", "tuns caini", "grooming pisici", "pet spa"],
  authors: [{ name: "PetSPA2" }],
  openGraph: {
    title: "PetSPA2 - Salon Profesional de Grooming pentru Caini si Pisici",
    description: "Servicii profesionale de grooming pentru animalele tale de companie. Toaletaj complet, baie, tuns, tratamente SPA. Programari si preturi accesibile.",
    type: "website",
    locale: "ro_RO",
  },
  twitter: {
    card: "summary_large_image",
    title: "PetSPA2 - Salon Profesional de Grooming pentru Caini si Pisici",
    description: "Servicii profesionale de grooming pentru animalele tale de companie.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Structured data for SEO
const structuredData = [
  generateOrganizationSchema({
    name: "PetSPA2",
    url: "https://petspa2.ro",
  }),
  generateWebSiteSchema({
    name: "PetSPA2",
    url: "https://petspa2.ro",
  }),
  generateLocalBusinessSchema({
    type: "LocalBusiness",
    name: "PetSPA2",
    description: "Salon profesional de grooming pentru caini si pisici. Toaletaj complet, baie, tuns, tratamente SPA.",
    url: "https://petspa2.ro",
    telephone: "+40700000000",
    address: {
      streetAddress: "Str. Exemplu nr. 123",
      addressLocality: "Bucuresti",
      addressRegion: "Bucuresti",
      postalCode: "010101",
      addressCountry: "RO",
    },
  }),
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" suppressHydrationWarning>
      <head>
        {/* Structured Data for SEO */}
        <JsonLd data={structuredData} />
      </head>
      <body
        className={`${fontSans.variable} ${fontHeading.variable} font-sans antialiased`}
      >
        {/* Skip Link for Accessibility - First focusable element */}
        <SkipLink />

        <LayoutProvider>
          {children}
          {/* Switchers for previewing different styles */}
          <ThemeSwitcher />
          <LayoutSwitcher />
        </LayoutProvider>
      </body>
    </html>
  );
}
