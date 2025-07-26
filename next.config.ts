import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // Disable all type checking
  typescript: {
    ignoreBuildErrors: true,
  },
  // Disable all linting
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable React strict mode
  reactStrictMode: false,
  // Disable image optimization
  images: {
    unoptimized: true,
  },
  // Webpack config to ignore all warnings and errors
  webpack: (config, { isServer }) => {
    config.ignoreWarnings = [
      { module: /./, message: /./ },
    ];
    return config;
  },
  // Disable source maps
  productionBrowserSourceMaps: false,
  // Experimental flags
  experimental: {
    forceSwcTransforms: true,
    esmExternals: false
  },
  // Disable all logging
  logging: {
    fetches: {
      fullUrl: false,
    },
  },
  // Disable static optimization
  staticPageGenerationTimeout: 1000,
  // Disable swc minification
  swcMinify: false,
};

export default nextConfig;
