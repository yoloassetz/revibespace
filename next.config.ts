// next.config.js
const { IgnorePlugin } = require('webpack');

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config: import('webpack').Configuration) {
    // 1) Completely ignore any require("./core") inside @magic-ext/oauth
    config.plugins.push(
      new IgnorePlugin({
        resourceRegExp: /^\.\/core$/,
        contextRegExp: /@magic-ext\/oauth\/dist\/es/,
      })
    );
    // 2) Stub out the entire magic packages so imports resolve to nothing
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@magic-ext/oauth': false,
      'magic-sdk': false,
    };
    return config;
  },
};

module.exports = nextConfig;