import { MetadataRoute } from "next";

/**
 * Dynamic Sitemap Generator
 *
 * Generates a sitemap.xml file for SEO purposes.
 * Modify the pages array based on your site structure.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */

export default function sitemap(): MetadataRoute.Sitemap {
  // Base URL - should be set in environment variable for production
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

  // Current date for lastModified
  const currentDate = new Date();

  // Define your site pages
  // For single-page sites, we include anchor sections as separate entries
  // to help search engines understand content structure
  const pages: MetadataRoute.Sitemap = [
    // Homepage - highest priority
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1,
    },
    // Main sections (for single-page sites with anchor navigation)
    // These help search engines understand the content structure
    {
      url: `${baseUrl}/#services`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/#testimonials`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/#contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  // PLACEHOLDER: Add additional pages for multi-page sites
  // const additionalPages = [
  //   {
  //     url: `${baseUrl}/services`,
  //     lastModified: currentDate,
  //     changeFrequency: 'monthly' as const,
  //     priority: 0.8,
  //   },
  //   {
  //     url: `${baseUrl}/about`,
  //     lastModified: currentDate,
  //     changeFrequency: 'monthly' as const,
  //     priority: 0.7,
  //   },
  //   {
  //     url: `${baseUrl}/contact`,
  //     lastModified: currentDate,
  //     changeFrequency: 'yearly' as const,
  //     priority: 0.9,
  //   },
  // ];

  return pages;
}

/**
 * Helper function to generate sitemap entries from dynamic data
 *
 * @example
 * // For a blog
 * const blogPosts = await fetchBlogPosts();
 * const blogEntries = generateSitemapEntries(
 *   blogPosts,
 *   (post) => `${baseUrl}/blog/${post.slug}`,
 *   (post) => new Date(post.updatedAt),
 *   0.6,
 *   'weekly'
 * );
 */
export function generateSitemapEntries<T>(
  items: T[],
  urlGenerator: (item: T) => string,
  dateGenerator: (item: T) => Date,
  priority: number = 0.5,
  changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"] = "monthly"
): MetadataRoute.Sitemap {
  return items.map((item) => ({
    url: urlGenerator(item),
    lastModified: dateGenerator(item),
    changeFrequency,
    priority,
  }));
}
