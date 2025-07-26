import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static exports
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
  
  // Configure images for static export
  images: {
    unoptimized: true,
    domains: [],
  },
  
  // Disable source maps
  productionBrowserSourceMaps: false,
  
  // Disable telemetry
  telemetry: false,
  
  // Disable static optimization
  staticPageGenerationTimeout: 1000,
  
  // Disable swc minification
  swcMinify: false,
  
  // Webpack config to ignore all warnings and errors
  webpack: (config) => {
    config.ignoreWarnings = [
      { module: /./, message: /./ },
    ];
    return config;
  },
};

export default nextConfig;
