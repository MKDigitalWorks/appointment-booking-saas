// Enable next-intl (internationalization)
const withNextIntl = require('next-intl/plugin')('./next-intl.config.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  experimental: {
    // Allow Prisma client bundling for server components
    serverComponentsExternalPackages: ['@prisma/client', 'prisma'],
  },

  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },

  // Optional: runtime env passthrough (only include if needed on client)
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY || '',
  },

  typescript: {
    // Continue build even if type errors exist (optional)
    // remove if you prefer strict TS enforcement in production
    ignoreBuildErrors: false,
  },

  eslint: {
    // Allow build to proceed even if ESLint errors exist (optional)
    ignoreDuringBuilds: false,
  },
};

// Export wrapped config
module.exports = withNextIntl(nextConfig);

