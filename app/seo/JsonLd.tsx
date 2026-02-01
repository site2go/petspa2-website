/**
 * JsonLd Component
 *
 * Injects structured data (JSON-LD) into the page head for SEO.
 * Supports multiple schema types and automatically handles serialization.
 *
 * @example
 * // Single schema
 * <JsonLd data={organizationSchema} />
 *
 * // Multiple schemas
 * <JsonLd data={[organizationSchema, localBusinessSchema]} />
 */

export interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

export function JsonLd({ data }: JsonLdProps) {
  // Handle both single objects and arrays of schemas
  const schemas = Array.isArray(data) ? data : [data];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema, null, 0),
          }}
        />
      ))}
    </>
  );
}

/**
 * Pre-built schema generators
 */

export interface OrganizationSchemaProps {
  name: string;
  url: string;
  logo?: string;
  description?: string;
  sameAs?: string[];
}

export function generateOrganizationSchema({
  name,
  url,
  logo,
  description,
  sameAs = [],
}: OrganizationSchemaProps) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    ...(logo && { logo }),
    ...(description && { description }),
    ...(sameAs.length > 0 && { sameAs }),
  };
}

export interface LocalBusinessSchemaProps {
  type:
    | "LocalBusiness"
    | "Dentist"
    | "BeautySalon"
    | "Restaurant"
    | "Bakery"
    | "LegalService"
    | "SportsActivityLocation"
    | "LodgingBusiness";
  name: string;
  url: string;
  image?: string;
  telephone?: string;
  email?: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo?: {
    latitude: number;
    longitude: number;
  };
  openingHours?: {
    dayOfWeek: string[];
    opens: string;
    closes: string;
  }[];
  priceRange?: string;
  description?: string;
  // Industry-specific
  servesCuisine?: string; // Restaurant
  menu?: string; // Restaurant
  medicalSpecialty?: string; // Dentist
}

export function generateLocalBusinessSchema({
  type,
  name,
  url,
  image,
  telephone,
  email,
  address,
  geo,
  openingHours,
  priceRange,
  description,
  servesCuisine,
  menu,
  medicalSpecialty,
}: LocalBusinessSchemaProps) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": type,
    name,
    url,
  };

  if (image) schema.image = image;
  if (telephone) schema.telephone = telephone;
  if (email) schema.email = email;
  if (description) schema.description = description;
  if (priceRange) schema.priceRange = priceRange;

  if (address) {
    schema.address = {
      "@type": "PostalAddress",
      ...address,
    };
  }

  if (geo) {
    schema.geo = {
      "@type": "GeoCoordinates",
      latitude: geo.latitude,
      longitude: geo.longitude,
    };
  }

  if (openingHours && openingHours.length > 0) {
    schema.openingHoursSpecification = openingHours.map((hours) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: hours.dayOfWeek,
      opens: hours.opens,
      closes: hours.closes,
    }));
  }

  // Industry-specific fields
  if (servesCuisine) schema.servesCuisine = servesCuisine;
  if (menu) schema.menu = menu;
  if (medicalSpecialty) schema.medicalSpecialty = medicalSpecialty;

  return schema;
}

export interface WebSiteSchemaProps {
  name: string;
  url: string;
  searchUrl?: string;
}

export function generateWebSiteSchema({
  name,
  url,
  searchUrl,
}: WebSiteSchemaProps) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url,
  };

  if (searchUrl) {
    schema.potentialAction = {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: searchUrl,
      },
      "query-input": "required name=search_term_string",
    };
  }

  return schema;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export interface FAQItem {
  question: string;
  answer: string;
}

export function generateFAQSchema(items: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export interface ServiceSchemaProps {
  name: string;
  description: string;
  providerName: string;
  areaServed?: string;
  serviceType?: string;
}

export function generateServiceSchema({
  name,
  description,
  providerName,
  areaServed,
  serviceType,
}: ServiceSchemaProps) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "LocalBusiness",
      name: providerName,
    },
    ...(areaServed && { areaServed }),
    ...(serviceType && { serviceType }),
  };
}

export default JsonLd;
