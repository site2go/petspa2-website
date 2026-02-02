/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Image optimization configuration
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
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
