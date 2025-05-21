// next.config.js  (in project root)
const path = require("path");
const { IgnorePlugin } = require("webpack");

module.exports = {
  webpack(config) {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@magic-ext/oauth": path.resolve(__dirname, "mocks/empty-module.js"),
      "@magic-ext/oauth/dist/es/core": path.resolve(
        __dirname,
        "mocks/empty-module.js"
      ),
    };
    config.plugins.push(
      new IgnorePlugin({
        resourceRegExp: /^\.\/core$/,
        contextRegExp: /@magic-ext\/oauth\/dist\/es/,
      })
    );
    return config;
  },
};