/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Image optimization configuration
  images: {
    // Add remote image domains if needed
    remotePatterns: [
      // {
      //   protocol: 'https',
      //   hostname: 'example.com',
      // },
    ],
    // Optimize images
    formats: ["image/avif", "image/webp"],
  },

  // Uncomment for static export (no server required)
  // output: 'export',

  // Trailing slashes (uncomment if needed for static hosting)
  // trailingSlash: true,

  // Experimental features
  experimental: {
    // Enable if using server actions
    // serverActions: true,
  },
};

module.exports = nextConfig;
