// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: this lets you deploy even if you have ESLint errors
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
