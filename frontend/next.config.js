/** @type {import('next').NextConfig} */
const nextConfig = {
  // Webpack config para Docker development
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000, // Check for changes every second
      aggregateTimeout: 300,
    };
    return config;
  },
}

module.exports = nextConfig

