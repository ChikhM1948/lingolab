// next.config.js (REPLACE WITH THIS)
const createNextIntlPlugin = require('next-intl/plugin');

// Point to the request configuration file
const withNextIntl = createNextIntlPlugin('./i18n/request.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add any other Next.js config options here
};

module.exports = withNextIntl(nextConfig);